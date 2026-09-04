using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OracleClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Caching;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using FineUIPro.EmptyProjectNet40.App_Code;

namespace FineUIPro.EmptyProjectNet40
{
    /// <summary>
    /// wx_draw 的摘要说明（抽奖页接口）
    /// 核验顺序：①身份换取(code→unionid/openid) → ②员工核验(-9) → ③好友核验(-10) → ④卡号校验(-5/-3)
    /// 调用：wx_draw.ashx?code=JSCODE&env=wxwork|wx&vip_code=..
    /// 返回：拦截时 {"errcode":-9/-10/-5/-3,"errmsg":"..."}；通过时返回数组（无记录返回 ""）
    /// </summary>
    public class wx_draw : IHttpHandler
    {
        // ==================== 配置区 ====================
        private const string _corpid = "ww926c4d2c905be158";
        private const string _agentSecret = "3HQQsqnjvSBdMkdl3UVY7ypvcjV1qfFTdRECLDEDfCQ"; // 企微小程序(AgentId 1000018)Secret，企微环境 jscode2session 用
        private const string _wxcontactSecret = "opUWLksOs8kHLx1-TfDAAg_1xTGqkUrM136f9qX9uJg"; // 客户联系应用Secret（externalcontact/get 校验好友关系）
        private const string _wxAppid = "wx83ab069b06696bf2";   // 微信小程序 AppID
        private const string _wxSecret = "c54c1dfb65a5de5c4755b34eb2a3e900"; // 微信小程序 Secret
        private const string TOKEN_CACHE_KEY = "wx_draw_agent_token";
        private const string CONTACT_TOKEN_CACHE_KEY = "wx_draw_contact_token";
        private static readonly object _lock = new object();
        // ================================================

        static wx_draw()
        {
            // .NET 4.0 强制启用 TLS1.2
            try { ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072; }
            catch { }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            // ========== 身份换取：不再信任前端传入的 unionid/openid，统一用 code 后端换取 ==========
            string code = context.Request["code"] ?? "";
            string env = context.Request["env"] ?? "";   // wxwork=企业微信环境  wx=微信环境
            string unionid = "";
            string openid = "";
            bool isStaff = false;

            if (string.IsNullOrEmpty(code))
            {
                context.Response.Write("{\"errcode\":-1,\"errmsg\":\"缺少code\"}");
                return;
            }

            try
            {
                if (env == "wxwork")
                {
                    // 企微环境：userid 非空 = 本企业成员 = 员工
                    string su = "", sun = "", so = "";
                    QyJscode2Session(code, out su, out sun, out so);
                    unionid = sun;
                    openid = so;
                    if (!string.IsNullOrEmpty(su))
                    {
                        SaveStaff(su, sun);   // 自动登记员工名单（供微信环境核验）
                        isStaff = true;
                    }
                }
                else
                {
                    // 微信环境：后端换取 openid + unionid（小程序已绑开放平台才会返回 unionid）
                    WxJscode2Session(code, out openid, out unionid);
                    if (!string.IsNullOrEmpty(unionid) && IsStaffByUnionid(unionid))
                        isStaff = true;
                }
            }
            catch (Exception ex)
            {
                Log("身份换取异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"身份校验异常，请稍后重试\"}");
                return;
            }

            // ========== 第一顺位：openid/unionid 查重（是否已参与过抽奖）==========
            if (unionid != "" || openid != "")
            {
                App_Code.DLL_checkopenid wx_check = new App_Code.DLL_checkopenid();
                DataSet dtC = wx_check.Select(unionid, openid);
                if (dtC.Tables[0].Rows.Count > 0)
                {
                    context.Response.Write("{\"errcode\":-6,\"errmsg\":\"每个会员仅限抽奖1次喔！\"}");
                    return;
                }
            }
            // ================================================================

            // ========== 员工核验 ==========
            if (isStaff)
            {
                Log("员工拦截: unionid=" + unionid + " openid=" + openid);
                context.Response.Write("{\"errcode\":-9,\"errmsg\":\"企业员工不能参与抽奖\"}");
                return;
            }
            // ================================================================

            // ========== 客户核验：没加企微 / 已删除企微 不能参与抽奖 ==========
            // 内部测试期间临时注释（放行非好友），正式上线前恢复
            /*
            string extErr = "";
            if (!CheckExternal(unionid, openid, out extErr))
            {
                context.Response.Write("{\"errcode\":-10,\"errmsg\":\"" + extErr + "\"}");
                return;
            }
            */
            // ========================================================================

            string xf_vipcode = (context.Request["vip_code"] ?? "").Replace(" ", "").Replace("　", "").ToUpper();
            if (xf_vipcode != "")
            {
                // ===== 会员卡号校验 =====
                // 1) 卡号不存在 → 拦截
                App_Code.DLL_checkvip wx_vip = new App_Code.DLL_checkvip();
                DataSet dt2 = wx_vip.Select(xf_vipcode);

                if (dt2.Tables[0].Rows.Count == 0)
                {
                    context.Response.Write("{\"errcode\":-5,\"errmsg\":\"会员卡号不存在或输入错误！\"}");
                    return;
                }

                // 2) 该卡号已参与过抽奖 → 拦截
                App_Code.DLL_checkvipcj wx_banner = new App_Code.DLL_checkvipcj();
                DataSet dt = wx_banner.Select(xf_vipcode);

                if (dt.Tables[0].Rows.Count > 0)
                {
                    context.Response.Write("{\"errcode\":-3,\"errmsg\":\"此会员卡号已经参与过抽奖！\"}");
                    return;
                }

                // 校验通过，返回会员信息
                string resultdt = JsonConvert.SerializeObject(dt2.Tables[0]);
                context.Response.Write(resultdt);
            }
            else
            {
                // 已参与查重已在第一顺位完成，此处直接返回空（无记录）
                context.Response.Write("");
            }
        }

        // ==================== 企业微信接口 ====================

        /// <summary>企微 access_token（缓存 7100 秒）</summary>
        private static string GetQyAccessToken()
        {
            string token = HttpRuntime.Cache[TOKEN_CACHE_KEY] as string;
            if (!string.IsNullOrEmpty(token)) return token;

            lock (_lock)
            {
                token = HttpRuntime.Cache[TOKEN_CACHE_KEY] as string;
                if (!string.IsNullOrEmpty(token)) return token;

                string url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=" + _corpid
                             + "&corpsecret=" + _agentSecret;
                string json = HttpUtil.Get(url, null);
                JObject jo = JObject.Parse(json);
                if (jo["errcode"] != null && jo["errcode"].Value<int>() != 0)
                    throw new Exception("gettoken fail:" + json);
                token = jo["access_token"].Value<string>();
                HttpRuntime.Cache.Insert(TOKEN_CACHE_KEY, token, null,
                    DateTime.Now.AddSeconds(7100), Cache.NoSlidingExpiration);
                return token;
            }
        }

        /// <summary>客户联系应用 access_token（externalcontact/get 校验好友关系用，缓存 7100 秒）</summary>
        private static string GetQyContactToken()
        {
            string token = HttpRuntime.Cache[CONTACT_TOKEN_CACHE_KEY] as string;
            if (!string.IsNullOrEmpty(token)) return token;

            lock (_lock)
            {
                token = HttpRuntime.Cache[CONTACT_TOKEN_CACHE_KEY] as string;
                if (!string.IsNullOrEmpty(token)) return token;

                string url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=" + _corpid
                             + "&corpsecret=" + _wxcontactSecret;
                string json = HttpUtil.Get(url, null);
                JObject jo = JObject.Parse(json);
                if (jo["errcode"] != null && jo["errcode"].Value<int>() != 0)
                    throw new Exception("gettoken(contact) fail:" + json);
                token = jo["access_token"].Value<string>();
                HttpRuntime.Cache.Insert(CONTACT_TOKEN_CACHE_KEY, token, null,
                    DateTime.Now.AddSeconds(7100), Cache.NoSlidingExpiration);
                return token;
            }
        }

        /// <summary>
        /// 客户核验：没加企微 / 已删除企微 → 不能抽奖
        /// 1) unionid 查 qy_customer_bind（qy_bind_query 已过滤 status=0）拿有效 ext_user_id；
        ///    查不到时再用 qy_del_check 区分"从没加过企微"和"绑定已全部删除（status=1）"
        /// 2) externalcontact/get 兜底验证：errcode 非 0（数据失效）或 follow_user 为空 = 已删除企微
        /// 3) unionid 为空时无法判定，放行（避免误伤）
        /// </summary>
        private static bool CheckExternal(string unionid, string openid, out string errmsg)
        {
            errmsg = "";
            if (string.IsNullOrEmpty(unionid))
            {
                Log("CheckExternal 跳过：unionid 为空 openid=" + openid);
                return true; // unionid 为空无法判定，保守放行
            }

            // 1) 查绑定表拿 ext_user_id
            string extUserId = "";
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_ext_user_id", OracleType.VarChar, 100, string.Empty, "in"),
                    Cn.Db.MakeParam("v_staff_id", OracleType.VarChar, 100, string.Empty, "in"),
                    Cn.Db.MakeParam("v_unionid", OracleType.VarChar, 100, unionid, "in")
                };
                DataSet ds = Cn.Db.exeSqlForDataSet("espos.qy_bind_query", ps);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    extUserId = ds.Tables[0].Rows[0]["EXT_USER_ID"].ToString();
            }
            finally
            {
                Cn.Close();
            }

            if (string.IsNullOrEmpty(extUserId))
            {
                // qy_bind_query 已过滤 status=0，查不到说明：从没加过企微，或绑定已全部被删除（status=1）
                // 用 qy_del_check 区分提示，避免把"已删除企微"误报成"尚未添加"
                bool hasDeleted = false;
                try { hasDeleted = HasDeletedBind(unionid); }
                catch (Exception ex) { Log("删除标记查询异常:" + ex.ToString() + " unionid=" + unionid); }

                if (hasDeleted)
                {
                    Log("好友核验拦截(本地删除标记): unionid=" + unionid);
                    errmsg = "您已删除企业微信，无法参与抽奖";
                }
                else
                {
                    errmsg = "您尚未添加为企业微信客户，暂时无法参与抽奖喔";
                }
                return false;
            }

            // 2) 企微验证好友关系（双保险：errcode 失效 + follow_user 为空，均视为已删除）
            try
            {
                string token = GetQyContactToken();
                string url = "https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get?access_token=" + token
                             + "&external_userid=" + HttpUtility.UrlEncode(extUserId);
                string json = HttpUtil.Get(url, null);
                Log("externalcontact/get 返回: " + json);   // 临时调试：排查删除检测用，稳定后可删除此行
                JObject jo = JObject.Parse(json);
                int ec = jo["errcode"] == null ? 0 : jo["errcode"].Value<int>();

                if (ec == 0)
                {
                    // 防错：企微返回的客户 unionid 必须等于当前登录 unionid
                    // （防止本地 qy_customer_bind 里 unionid↔ext_user_id 对应错误，误查到还有好友的客户）
                    string extUnionid = jo["external_contact"] != null
                                        ? (jo["external_contact"]["unionid"] == null ? "" : jo["external_contact"]["unionid"].Value<string>())
                                        : "";
                    if (!string.IsNullOrEmpty(extUnionid) && extUnionid != unionid)
                    {
                        Log("好友核验拦截(unionid不匹配): 登录unionid=" + unionid
                            + " 企微返回unionid=" + extUnionid + " ext=" + extUserId);
                        errmsg = "您已删除企业微信，无法参与抽奖";
                        return false;
                    }
                    // 成功返回：follow_user（与 external_contact 平级）为空 = 客户已删除全部员工好友
                    JArray fu = jo["follow_user"] as JArray;
                    if (fu == null || fu.Count == 0)
                    {
                        Log("好友核验拦截(follow_user空): unionid=" + unionid + " ext=" + extUserId);
                        errmsg = "您已删除企业微信，无法参与抽奖";
                        return false;
                    }
                    return true;
                }

                // errcode 非 0（84061 等）：外部联系人数据失效 = 已删除/解除好友关系
                Log("好友核验拦截(errcode=" + ec + "): unionid=" + unionid + " ext=" + extUserId
                    + " msg=" + (jo["errmsg"] ?? ""));
                errmsg = "您已删除企业微信，无法参与抽奖";
                return false;
            }
            catch (Exception ex)
            {
                Log("externalcontact/get 异常:" + ex.ToString() + " ext=" + extUserId);
                return true; // 仅接口本身故障（网络/token失效）才保守放行
            }
        }

        /// <summary>查 qy_customer_bind 是否有 status=1 的删除记录（qy_del_check，按 unionid 查）：命中 = 客户已删除企微</summary>
        private static bool HasDeletedBind(string unionid)
        {
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_unionid", OracleType.VarChar, 100, unionid, "in")
                };
                DataSet ds = Cn.Db.exeSqlForDataSet("espos.qy_del_check", ps);
                return ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0;
            }
            finally
            {
                Cn.Close();
            }
        }

        /// <summary>企微环境 jscode2session：返回 userid（本企业成员才有）、unionid、openid</summary>
        private static void QyJscode2Session(string code, out string userid, out string unionid, out string openid)
        {
            userid = "";
            unionid = "";
            openid = "";
            string token = GetQyAccessToken();
            string url = "https://qyapi.weixin.qq.com/cgi-bin/miniprogram/jscode2session?access_token="
                         + token + "&js_code=" + HttpUtility.UrlEncode(code)
                         + "&grant_type=authorization_code";
            string json = HttpUtil.Get(url, null);
            JObject jo = JObject.Parse(json);
            if (jo["errcode"] != null && jo["errcode"].Value<int>() != 0)
            {
                Log("QyJscode2Session fail:" + json);
                return;
            }
            userid = jo["userid"] == null ? "" : jo["userid"].Value<string>();
            unionid = jo["unionid"] == null ? "" : jo["unionid"].Value<string>();
            openid = jo["openid"] == null ? "" : jo["openid"].Value<string>();
        }

        /// <summary>微信环境 jscode2session：返回 openid、unionid（小程序已绑开放平台才有 unionid）</summary>
        private static void WxJscode2Session(string code, out string openid, out string unionid)
        {
            openid = "";
            unionid = "";
            string url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + _wxAppid
                         + "&secret=" + _wxSecret + "&js_code=" + HttpUtility.UrlEncode(code)
                         + "&grant_type=authorization_code";
            string json = HttpUtil.Get(url, null);
            JObject jo = JObject.Parse(json);
            if (jo["errcode"] != null && jo["errcode"].Value<int>() != 0)
            {
                Log("WxJscode2Session fail:" + json);
                return;
            }
            openid = jo["openid"] == null ? "" : jo["openid"].Value<string>();
            unionid = jo["unionid"] == null ? "" : jo["unionid"].Value<string>();
        }

        // ==================== 员工名单 ====================

        /// <summary>unionid 是否命中员工名单（调存储过程 qy_staff_check）</summary>
        private static bool IsStaffByUnionid(string unionid)
        {
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_unionid", OracleType.VarChar, 100, unionid, "in")
                };
                DataSet ds = Cn.Db.exeSqlForDataSet("espos.qy_staff_check", ps);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    object cnt = ds.Tables[0].Rows[0][0];
                    if (cnt != null && cnt.ToString() != "" && cnt.ToString() != "0")
                        return true;
                }
                return false;
            }
            finally
            {
                Cn.Close();
            }
        }

        /// <summary>登记员工（qy_staff_save 三参数：企微 jscode2session 不返回姓名，name 传空）</summary>
        private static void SaveStaff(string userid, string unionid)
        {
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("v_userid", OracleType.VarChar, 100, userid, "in"),
                    Cn.Db.MakeParam("v_name", OracleType.VarChar, 100, "", "in"),
                    Cn.Db.MakeParam("v_unionid", OracleType.VarChar, 100, string.IsNullOrEmpty(unionid) ? "" : unionid, "in")
                };
                Cn.Db.exeSql("espos.qy_staff_save", ps);
            }
            finally
            {
                Cn.Close();
            }
        }

        // ==================== 工具方法 ====================

        private static void Log(string msg)
        {
            try
            {
                string dir = HttpContext.Current.Server.MapPath("~/App_Data");
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.AppendAllText(Path.Combine(dir, "wx_draw_log.txt"),
                    DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " " + msg + "\r\n");
            }
            catch { }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
