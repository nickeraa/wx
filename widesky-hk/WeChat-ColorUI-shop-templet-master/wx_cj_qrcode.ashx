using System;
using System.Data;
using System.Data.OracleClient;
using System.IO;
using System.Net;
using System.Web;
using Newtonsoft.Json.Linq;

namespace FineUIPro.EmptyProjectNet40
{
    //
    /// <summary>
    /// 生成领奖核销小程序码：按会员卡号 vipcode 生成带参数的小程序码（scene=vipcode, page=pages/hx/index/index）
    /// 卡号由 wx_cj_receive.ashx 核验（客户微信code + 好友验证）成功后返回，此处仅负责出码
    /// 员工微信扫一扫该码 → 直接打开员工核销页（携带卡号）
    /// 调用：wx_cj_qrcode.ashx?vipcode=卡号
    /// 返回：{"errcode":0,"qrcode":"data:image/png;base64,...","vip_code":"卡号"}
    ///       / {"errcode":-1/-8/-9/-12,"errmsg":"..."}
    /// </summary>
    public class wx_cj_qrcode : IHttpHandler
    {
        // 小程序 appid/secret（与抽奖 wx_draw 一致）
        private const string _wxAppid = "wx83ab069b06696bf2";
        private const string _wxSecret = "c54c1dfb65a5de5c4755b34eb2a3e900";
        private const string TOKEN_CACHE_KEY = "wx_cj_mini_token";
        private static readonly object _lock = new object();

        static wx_cj_qrcode()
        {
            try { ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072; }
            catch { }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json; charset=utf-8";

            string vipcode = (context.Request["vipcode"] ?? "").Trim();
            if (string.IsNullOrEmpty(vipcode))
            {
                context.Response.Write("{\"errcode\":-1,\"errmsg\":\"缺少卡号\"}");
                return;
            }

            // 1) 校验该卡号存在且未核销（espos.wx_cj_prize_info）
            string tags = "";
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_vipcode", OracleType.VarChar, 100, vipcode, "in")
                };
                DataSet ds = Cn.Db.exeSqlForDataSet("espos.wx_cj_prize_info", ps);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    DataRow r = ds.Tables[0].Rows[0];
                    if (r.Table.Columns.Contains("TAGS"))
                    {
                        object v = r["TAGS"];
                        if (v != null && v != DBNull.Value) tags = v.ToString().Trim();
                    }
                }
            }
            catch (Exception ex)
            {
                Log("中奖信息校验异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"系统繁忙，请稍后重试\"}");
                return;
            }
            finally
            {
                Cn.Close();
            }

            if (string.IsNullOrEmpty(tags))
            {
                context.Response.Write("{\"errcode\":-12,\"errmsg\":\"没有可领取的奖品\"}");
                return;
            }
            if (tags == "1")
            {
                context.Response.Write("{\"errcode\":-12,\"errmsg\":\"奖品已领取\"}");
                return;
            }

            // 2) 生成小程序码（scene=卡号）
            try
            {
                byte[] img = GenMiniQrcode(vipcode);
                if (img == null || img.Length == 0)
                {
                    context.Response.Write("{\"errcode\":-9,\"errmsg\":\"二维码生成失败\"}");
                    return;
                }
                string b64 = Convert.ToBase64String(img);
                context.Response.Write("{\"errcode\":0"
                    + ",\"qrcode\":\"data:image/png;base64," + b64 + "\""
                    + ",\"vip_code\":\"" + vipcode + "\"}");
            }
            catch (Exception ex)
            {
                Log("小程序码生成异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":-9,\"errmsg\":\"二维码生成失败\"}");
            }
        }

        /// <summary>调用 wxacode.getUnlimited 生成小程序码图片（返回 PNG 字节）</summary>
        private static byte[] GenMiniQrcode(string scene)
        {
            string token = GetMiniToken();
            string url = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + token;
            string body = "{\"scene\":\"" + scene + "\",\"page\":\"pages/hx/index/index\",\"width\":430,\"check_path\":false}";

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            req.Method = "POST";
            req.ContentType = "application/json;charset=utf-8";
            req.Timeout = 15000;
            byte[] data = System.Text.Encoding.UTF8.GetBytes(body);
            req.ContentLength = data.Length;
            using (Stream s = req.GetRequestStream())
            {
                s.Write(data, 0, data.Length);
            }

            using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse())
            {
                string ct = (resp.ContentType ?? "").ToLower();
                using (Stream rs = resp.GetResponseStream())
                {
                    using (MemoryStream ms = new MemoryStream())
                    {
                        rs.CopyTo(ms);
                        byte[] bytes = ms.ToArray();
                        if (ct.Contains("image"))
                            return bytes;
                        // 非图片 = 微信返回 JSON 错误
                        throw new Exception("getwxacodeunlimit fail:" + System.Text.Encoding.UTF8.GetString(bytes));
                    }
                }
            }
        }

        /// <summary>小程序 access_token（缓存 7100 秒）</summary>
        private static string GetMiniToken()
        {
            string token = HttpRuntime.Cache[TOKEN_CACHE_KEY] as string;
            if (!string.IsNullOrEmpty(token)) return token;

            lock (_lock)
            {
                token = HttpRuntime.Cache[TOKEN_CACHE_KEY] as string;
                if (!string.IsNullOrEmpty(token)) return token;

                string url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential"
                             + "&appid=" + _wxAppid + "&secret=" + _wxSecret;
                string json = HttpUtil.Get(url, null);
                JObject jo = JObject.Parse(json);
                if (jo["errcode"] != null && jo["errcode"].Value<int>() != 0)
                    throw new Exception("gettoken(mini) fail:" + json);
                token = jo["access_token"].Value<string>();
                HttpRuntime.Cache.Insert(TOKEN_CACHE_KEY, token, null,
                    DateTime.Now.AddSeconds(7100), System.Web.Caching.Cache.NoSlidingExpiration);
                return token;
            }
        }

        private static void Log(string msg)
        {
            try
            {
                string dir = HttpContext.Current.Server.MapPath("~/App_Data");
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.AppendAllText(Path.Combine(dir, "wx_cj_qrcode_log.txt"),
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
