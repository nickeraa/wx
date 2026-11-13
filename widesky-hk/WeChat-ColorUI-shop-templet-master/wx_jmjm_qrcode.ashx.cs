using System;
using System.IO;
using System.Net;
using System.Text;
using System.Web;

namespace FineUIPro.EmptyProjectNet40
{
    /// <summary>
    /// 金银币寄卖：按单号生成带参小程序码（员工开单成功后调用）
    /// 调用：wx_jmjm_qrcode.ashx?order_no=JM261109000001
    /// 流程：access_token → wxacode.getUnlimited(scene=单号) → 图片落盘 → 返回图片 URL
    /// 返回：{"errcode":0,"qrcode":"https://widesky.work/HKback/upload/jmjm/qrcode/JMxxx.png"}
    /// 客户扫码进入 pages/jmjm/confirm/index，onLoad 从 options.scene 解析单号
    /// </summary>
    public class wx_jmjm_qrcode : IHttpHandler
    {
        // ==================== 配置区（与 wx_cj_qrcode 一致） ====================
        private const string _wxAppid = "wx83ab069b06696bf2";
        private const string _wxSecret = "c54c1dfb65a5de5c4755b34eb2a3e900";
        // 小程序码指向页面（客户确认页，需与 app.json 注册路径一致）
        private const string _page = "pages/jmjm/confirm/index";
        // 二维码指向的小程序版本：
        //   "trial"   = 体验版（调试期用：需先把当前代码上传并设为体验版，扫码微信须是体验成员）
        //   "release" = 线上正式版（小程序发布含 pages/jmjm/confirm/index 的新版本后改回）
        // 缓存文件名自动带版本前缀，切换版本不会复用旧版本的码
        private const string _envVersion = "trial";
        // 图片外网访问前缀
        private const string _urlPrefix = "https://widesky.work/HKback/upload/";
        // ======================================================================

        static wx_jmjm_qrcode()
        {
            try { ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072; }
            catch { }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json; charset=utf-8";

            string orderNo = (context.Request["order_no"] ?? "").Trim();
            if (string.IsNullOrEmpty(orderNo))
            {
                context.Response.Write("{\"errcode\":-1,\"errmsg\":\"缺少单号\"}");
                return;
            }

            try
            {
                // 已生成过直接复用（同一单号+同一版本二维码不变）
                string subDir = "jmjm/qrcode";
                string dir = context.Server.MapPath("~/upload/" + subDir);
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                string fileName = _envVersion + "_" + orderNo + ".png";
                string filePath = Path.Combine(dir, fileName);
                string imgUrl = _urlPrefix + subDir + "/" + fileName;
                if (File.Exists(filePath))
                {
                    context.Response.Write("{\"errcode\":0,\"qrcode\":\"" + imgUrl + "\"}");
                    return;
                }

                // 1) access_token
                string token = GetAccessToken();
                if (string.IsNullOrEmpty(token))
                {
                    context.Response.Write("{\"errcode\":-8,\"errmsg\":\"获取access_token失败\"}");
                    return;
                }

                // 2) wxacode.getUnlimited（scene=单号；check_path=false 兼容未发布版本）
                string postUrl = "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + token;
                string body = "{\"scene\":\"" + orderNo + "\",\"page\":\"" + _page + "\""
                    + ",\"width\":430,\"check_path\":false,\"env_version\":\"" + _envVersion + "\"}";
                byte[] img = HttpPostBinary(postUrl, body);
                if (img == null || img.Length == 0)
                {
                    context.Response.Write("{\"errcode\":-8,\"errmsg\":\"生成小程序码失败\"}");
                    return;
                }

                // 失败时微信返回 JSON（errcode/msg）而非图片：检测并透出
                if (img[0] == (byte)'{')
                {
                    string err = Encoding.UTF8.GetString(img);
                    Log("getwxacodeunlimit fail:" + err);
                    context.Response.Write("{\"errcode\":-8,\"errmsg\":\"生成小程序码失败：" + JsonEscape(err) + "\"}");
                    return;
                }

                File.WriteAllBytes(filePath, img);
                Log("二维码生成成功 order_no=" + orderNo + " env=" + _envVersion);
                context.Response.Write("{\"errcode\":0,\"qrcode\":\"" + imgUrl + "\"}");
            }
            catch (Exception ex)
            {
                Log("异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"系统繁忙，请稍后重试\"}");
            }
        }

        // 获取 access_token
        private static string GetAccessToken()
        {
            string url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential"
                + "&appid=" + _wxAppid + "&secret=" + _wxSecret;
            string json = HttpUtil.Get(url, null);
            int idx = json.IndexOf("\"access_token\":\"");
            if (idx < 0)
            {
                Log("token fail:" + json);
                return "";
            }
            idx += "\"access_token\":\"".Length;
            int end = json.IndexOf("\"", idx);
            return json.Substring(idx, end - idx);
        }

        // POST JSON 并返回二进制响应
        private static byte[] HttpPostBinary(string url, string body)
        {
            ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072;
            byte[] data = Encoding.UTF8.GetBytes(body);
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            req.Method = "POST";
            req.ContentType = "application/json; charset=utf-8";
            req.ContentLength = data.Length;
            req.Timeout = 15000;
            using (Stream s = req.GetRequestStream()) s.Write(data, 0, data.Length);
            using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse())
            using (MemoryStream ms = new MemoryStream())
            using (Stream rs = resp.GetResponseStream())
            {
                byte[] buf = new byte[8192];
                int n;
                while ((n = rs.Read(buf, 0, buf.Length)) > 0) ms.Write(buf, 0, n);
                return ms.ToArray();
            }
        }

        private static string JsonEscape(string s)
        {
            if (string.IsNullOrEmpty(s)) return "";
            return s.Replace("\\", "\\\\").Replace("\"", "\\\"");
        }

        private static void Log(string msg)
        {
            try
            {
                string dir = HttpContext.Current.Server.MapPath("~/App_Data");
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.AppendAllText(Path.Combine(dir, "wx_jmjm_qrcode_log.txt"),
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
