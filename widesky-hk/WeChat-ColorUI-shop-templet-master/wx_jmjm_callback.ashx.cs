using System;
using System.Data;
using System.Data.OracleClient;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Newtonsoft.Json.Linq;

namespace FineUIPro.EmptyProjectNet40
{
    /// <summary>
    /// 金银币寄卖：腾讯电子签回调接收端（可选，用于替代轮询实时感知签署结果）
    /// 控制台回调地址配置：https://widesky.work/HKback/wx_jmjm_callback.ashx
    /// 官方规范：
    ///   - POST，Content-Type: application/json，5 秒内必须返回 httpcode 200（否则重发，最多36次）
    ///   - 配置验签 TOKEN 后，Header 带 Content-Signature = "sha256=" + HMAC-SHA256(TOKEN, 原始body)
    ///   - 配置加密 KEY 后 body 为 {"encrypt":"base64密文"}：Base64解码 → AES-256-CBC
    ///     （Key=CallbackUrlKey，IV=KEY前16位，PKCS#7填充）解出明文 JSON
    ///   - 明文结构：{ MsgId, MsgType, MsgVersion, MsgData }
    ///   - 合同状态回调 MsgType=FlowStatusChange，MsgData 含 FlowId / FlowStatus：
    ///     ALL签署完成→STATUS=2；REJECT拒签/CANCEL撤回/DEADLINE流签/INVALID失效/EXCEPTION异常→STATUS=9；
    ///     其它(INIT/PART/WILLEXPIRE)不处理
    ///   - 回调可能乱序/重发：仅当单据当前 STATUS=1（待签署）时才更新，状态不允许回退
    /// 注意：轮询（wx_jmjm_status）保留不受影响，两者互为兜底；需先执行 alter_jmjm_callback.sql
    /// </summary>
    public class wx_jmjm_callback : IHttpHandler
    {
        // ==================== 回调配置区（与电子签控制台"企业应用配置-回调"一致） ====================
        // 验签 TOKEN（控制台"签名验证 token"，须与控制台填的完全一致）
        private const string _cbToken = "0BE8D9C41FD94D72B43436130F72D2BC";
        // 回调加密 KEY（控制台"加密 key"，32位；AES-256 解密用，前16位作 IV）
        private const string _cbKey = "BD56600EA7254BBB9C76319788115766";
        // ==========================================================================================

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json; charset=utf-8";

            try
            {
                // 1) 读取原始 body（验签/解密都必须用原始串，不可做任何修改）
                string raw;
                using (var sr = new StreamReader(context.Request.InputStream, Encoding.UTF8))
                {
                    raw = sr.ReadToEnd();
                }
                Log("收到回调 body=" + raw + " signature=" + context.Request.Headers["Content-Signature"]);

                // 2) 验签（配置了 TOKEN 且 Header 携带签名时校验；不匹配直接忽略）
                string sig = context.Request.Headers["Content-Signature"];
                if (!string.IsNullOrEmpty(_cbToken) && !string.IsNullOrEmpty(sig))
                {
                    string expect = "sha256=" + HmacSha256Hex(_cbToken, raw);
                    if (!string.Equals(sig, expect, StringComparison.Ordinal))
                    {
                        Log("验签失败，忽略本次回调");
                        context.Response.Write("{\"errcode\":0,\"errmsg\":\"signature mismatch\"}");
                        return;
                    }
                }

                // 3) 解析消息（有 encrypt 则解密，否则明文）
                JObject root = JObject.Parse(string.IsNullOrEmpty(raw) ? "{}" : raw);
                string plain;
                if (root["encrypt"] != null && !string.IsNullOrEmpty(_cbKey))
                {
                    plain = AesDecrypt(root["encrypt"].ToString(), _cbKey);
                    Log("解密后明文=" + plain);
                }
                else
                {
                    plain = raw;
                }
                JObject msg = JObject.Parse(plain);
                string msgType = msg["MsgType"] == null ? "" : msg["MsgType"].ToString();

                // 4) 只处理合同状态变动回调
                if (msgType != "FlowStatusChange")
                {
                    Log("忽略消息类型 MsgType=" + msgType);
                    context.Response.Write("{\"errcode\":0}");
                    return;
                }
                JObject data = msg["MsgData"] as JObject;
                string flowId = data != null && data["FlowId"] != null ? data["FlowId"].ToString().Trim() : "";
                string essStatus = data != null && data["FlowStatus"] != null ? data["FlowStatus"].ToString().Trim() : "";
                if (string.IsNullOrEmpty(flowId) || string.IsNullOrEmpty(essStatus))
                {
                    Log("FlowStatusChange 缺少 FlowId/FlowStatus，忽略");
                    context.Response.Write("{\"errcode\":0}");
                    return;
                }

                // 5) 按映射落库（仅 STATUS=1 时更新，防止乱序回退/覆盖终态）
                if (essStatus == "ALL")
                {
                    int n = UpdateByFlow(flowId, 2, "");
                    Log("签署完成 flow_id=" + flowId + " 更新行数=" + n);
                }
                else if (essStatus == "REJECT" || essStatus == "REJECTED" || essStatus == "CANCEL"
                    || essStatus == "CANCELED" || essStatus == "DEADLINE" || essStatus == "TIMEOUT"
                    || essStatus == "EXPIRED" || essStatus == "VOIDED" || essStatus == "INVALID"
                    || essStatus == "EXCEPTION")
                {
                    int n = UpdateByFlow(flowId, 9, "电子签回调状态：" + essStatus);
                    Log("签署终态失败 flow_id=" + flowId + " status=" + essStatus + " 更新行数=" + n);
                }
                else
                {
                    Log("中间状态不处理 flow_id=" + flowId + " status=" + essStatus);
                }

                context.Response.Write("{\"errcode\":0}");
            }
            catch (Exception ex)
            {
                // 无论处理是否成功都返回 200（避免平台36次重发轰炸）；错误细节看日志
                Log("异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":0}");
            }
        }

        // 按 FlowId 更新单据状态（仅 STATUS=1 的单据生效，返回受影响行数）
        // 依赖新增存储过程 espos.jmjm_order_updflow_status（见 alter_jmjm_callback.sql）
        private static int UpdateByFlow(string flowId, int status, string failMsg)
        {
            try
            {
                oraclelink.Con Cn = new oraclelink.Con();
                try
                {
                    Cn.Open();
                    OracleParameter[] ps = {
                        Cn.Db.MakeParam("v_flowid", OracleType.VarChar, 100, flowId, "in"),
                        Cn.Db.MakeParam("v_status", OracleType.Int32, 0, status, "in"),
                        Cn.Db.MakeParam("v_failmsg", OracleType.VarChar, 500, failMsg, "in"),
                        Cn.Db.MakeParam("v_cnt", OracleType.Int32, 0, 0, "out")
                    };
                    Cn.Db.exeSql("espos.jmjm_order_updflow_status", ps);
                    object o = ps[3].Value;
                    return o == null || o == DBNull.Value ? 0 : Convert.ToInt32(o);
                }
                finally
                {
                    Cn.Close();
                }
            }
            catch (Exception ex)
            {
                Log("UpdateByFlow 失败 flow_id=" + flowId + " :" + ex.Message);
                return 0;
            }
        }

        // AES-256-CBC 解密（Key=CallbackUrlKey 32字节，IV=KEY前16字节，PKCS#7）
        private static string AesDecrypt(string b64Cipher, string key)
        {
            byte[] cipher = Convert.FromBase64String(b64Cipher);
            byte[] kb = Encoding.UTF8.GetBytes(key);
            byte[] iv = new byte[16];
            Array.Copy(kb, iv, Math.Min(16, kb.Length));
            using (Aes aes = Aes.Create())
            {
                aes.Mode = CipherMode.CBC;
                aes.Padding = PaddingMode.PKCS7;
                aes.Key = kb;
                aes.IV = iv;
                using (ICryptoTransform dec = aes.CreateDecryptor())
                {
                    byte[] plain = dec.TransformFinalBlock(cipher, 0, cipher.Length);
                    return Encoding.UTF8.GetString(plain);
                }
            }
        }

        private static string HmacSha256Hex(string key, string msg)
        {
            using (HMACSHA256 h = new HMACSHA256(Encoding.UTF8.GetBytes(key)))
            {
                byte[] b = h.ComputeHash(Encoding.UTF8.GetBytes(msg));
                StringBuilder sb = new StringBuilder(b.Length * 2);
                foreach (byte x in b) sb.Append(x.ToString("x2"));
                return sb.ToString();
            }
        }

        private static void Log(string msg)
        {
            try
            {
                string dir = HttpContext.Current.Server.MapPath("~/App_Data");
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.AppendAllText(Path.Combine(dir, "wx_jmjm_callback_log.txt"),
                    DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " " + msg + "\r\n");
            }
            catch { }
        }

        public bool IsReusable
        {
            get { return false; }
        }
    }
}
