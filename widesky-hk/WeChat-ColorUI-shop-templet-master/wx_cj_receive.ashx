using System;
using System.Data;
using System.Data.OracleClient;
using System.IO;
using System.Net;
using System.Web;
using FineUIPro.EmptyProjectNet40.App_Code;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FineUIPro.EmptyProjectNet40
{
    //
    /// <summary>
    /// 领奖核销总入口（最新版：适配"客户亮码 + 员工扫码核销"新流程）
    ///
    /// 模式A（客户领奖页 lqjp 调用，仅核验返回卡号，不核销）：
    ///   wx_cj_receive.ashx?code=客户微信登录code
    ///   → code2Session 换 openid/unionid → 好友核验（测试期间已临时注释放行；上线前恢复：没加企微/已删除企微 → 拦截 -10，不进入兑奖）
    ///   → 返回该客户未领取记录的 xf_vipcode（供生成带参二维码）
    ///   返回：{"errcode":0,"vip_code":"卡号","plu_id":..,"prize_name":..,"vip_name":..,"vip_level":..,"tags":"0"}
    ///         / {"errcode":-8,"errmsg":"身份校验失败"} / {"errcode":-12,"errmsg":"没有可领取的奖品"}
    ///
    /// 模式B（员工核销页 hx 调用，扫码核销领奖）：
    ///   wx_cj_receive.ashx?vipcode=卡号&yguserid=工号&ygpassword=密码
    ///   → DLL_userlogin 员工验证(-2) → espos.wx_cj_receive_byvip 按卡号核销（TAGS'0'→'1'+LJ_TIME+LJ_YGUSERID）
    ///   → espos.wx_cj_prize_info 查核销后记录返回（会员/员工/店铺/奖品）
    ///   返回：{"errcode":0,"plu_id":..,"prize_name":..,"vip_code":..,"vip_name":..,"vip_level":..,
    ///         "staff_id":..,"staff_name":..,"shop_no":..,"tags":"1","received_time":"yyyy-MM-dd HH:mm:ss"}
    ///         / {"errcode":-2,"errmsg":"工号或密码输入错误！"} / {"errcode":-12,"errmsg":"奖品已领取或不存在"}
    ///
    /// 注：好友核验测试期间已临时注释（放行非好友），正式上线前必须恢复——
    ///     客户未添加企微（-10）或已删除企微（-10）时拦截，不进入兑奖环节
    /// </summary>
    public class wx_cj_receive : IHttpHandler
    {
        // ==================== 配置区（与 wx_draw 一致） ====================
        private const string _wxAppid = "wx83ab069b06696bf2";
        private const string _wxSecret = "c54c1dfb65a5de5c4755b34eb2a3e900";
        // 企微配置（好友核验用，与 wx_draw 一致）
        private const string _corpid = "ww926c4d2c905be158";
        private const string _wxcontactSecret = "opUWLksOs8kHLx1-TfDAAg_1xTGqkUrM136f9qX9uJg";
        private const string CONTACT_TOKEN_CACHE_KEY = "wx_draw_contact_token";
        private static readonly object _lock = new object();
        // ==================================================================

        static wx_cj_receive()
        {
            try { ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072; }
            catch { }
        }

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json; charset=utf-8";

            string code = (context.Request["code"] ?? "").Trim();
            string vipcode = (context.Request["vipcode"] ?? "").Trim();
            string yg_userid = (context.Request["yguserid"] ?? "").Replace(" ", "").Replace("　", "").ToUpper();
            string yg_password = context.Request["ygpassword"] ?? "";

            try
            {
                // 模式A：客户核验（lqjp 页亮码前调用，返回卡号生成二维码）
                if (!string.IsNullOrEmpty(code))
                {
                    DoCustomerVerify(context, code);
                    return;
                }
                // 模式B：员工扫码核销（hx 页调用）
                if (!string.IsNullOrEmpty(vipcode))
                {
                    DoStaffReceive(context, vipcode, yg_userid, yg_password);
                    return;
                }
                context.Response.Write("{\"errcode\":-1,\"errmsg\":\"缺少参数\"}");
            }
            catch (Exception ex)
            {
                Log("领取异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"系统繁忙，请稍后重试\"}");
            }
        }

        // ==================== 模式A：客户核验 → 返回 xf_vipcode ====================
        private void DoCustomerVerify(HttpContext context, string code)
        {
            // 1) code 换 openid/unionid
            string openid = "", unionid = "";
            try
            {
                WxJscode2Session(code, out openid, out unionid);
            }
            catch (Exception ex)
            {
                Log("身份换取异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"身份校验失败\"}");
                return;
            }
            if (string.IsNullOrEmpty(openid))
            {
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"身份校验失败\"}");
                return;
            }

                // 2) 好友核验：没加企微 / 已删除企微 → 拦截，不进入兑奖环节
            // 内部测试期间临时注释（放行非好友），正式上线前恢复
            /*
            string msg = "";
            if (!CheckExternal(unionid, openid, out msg))
            {
                Log("好友核验未通过 openid=" + openid + " msg=" + msg);
                context.Response.Write("{\"errcode\":-10,\"errmsg\":\"您还没有添加企业微信，暂不能领奖喔\"}");
                return;
            }
            */

            // 3) 按 openid 查该客户未领取记录的卡号（espos.wx_cj_vip_byopenid）
            string vipcode = GetVipcodeByOpenid(openid);
            if (string.IsNullOrEmpty(vipcode))
            {
                Log("核验通过但无未领取记录 openid=" + openid);
                context.Response.Write("{\"errcode\":-12,\"errmsg\":\"没有可领取的奖品\"}");
                return;
            }

            // 4) 返回卡号 + 中奖信息（供前端生成带参数二维码）
            DataRow r = GetPrizeRow(vipcode);
            string pluId = "", tags = "0", prizeName = "", vipName = "", vipLevel = "";
            if (r != null)
            {
                pluId = ColVal(r, "PLU_ID");
                tags = ColVal(r, "TAGS");
                prizeName = ColVal(r, "PRIZE_NAME", "XF_DESCI");
                vipName = ColVal(r, "VIP_NAME", "XF_SURNAME");
                vipLevel = ColVal(r, "VIP_LEVEL", "GRADE");
            }

            Log("客户核验通过 vipcode=" + vipcode + " openid=" + openid);
            context.Response.Write("{\"errcode\":0,\"errmsg\":\"ok\""
                + ",\"vip_code\":\"" + JsonEscape(vipcode) + "\""
                + ",\"plu_id\":\"" + JsonEscape(pluId) + "\""
                + ",\"prize_name\":\"" + JsonEscape(prizeName) + "\""
                + ",\"vip_name\":\"" + JsonEscape(vipName) + "\""
                + ",\"vip_level\":\"" + JsonEscape(vipLevel) + "\""
                + ",\"tags\":\"" + JsonEscape(tags) + "\"}");
        }

        // ==================== 模式B：员工工号密码核销 ====================
        private void DoStaffReceive(HttpContext context, string vipcode, string yg_userid, string yg_password)
        {
            // 工号密码空值检查（直接调接口绕过前端时兜底）
            if (string.IsNullOrEmpty(yg_userid) || string.IsNullOrEmpty(yg_password))
            {
                context.Response.Write("{\"errcode\":-2,\"errmsg\":\"工号或密码输入错误！\"}");
                return;
            }

            // 1) 员工工号密码验证（项目现有登录验证 DLL）
            string staffName = "", shopNo = "";
            App_Code.DLL_userlogin checkuser = new App_Code.DLL_userlogin();
            DataSet ds = checkuser.Select(yg_userid, yg_password, "0");
            if (ds == null || ds.Tables.Count == 0 || ds.Tables[0].Rows.Count == 0)
            {
                context.Response.Write("{\"errcode\":-2,\"errmsg\":\"工号或密码输入错误！\"}");
                return;
            }
            // 员工姓名/店铺号：先从业员验证 DataSet 提取（防御：列名/值为空时不报错）
            if (ds.Tables[0].Rows.Count > 0)
            {
                DataTable t0 = ds.Tables[0];
                DataRow r0 = t0.Rows[0];
                staffName = t0.Columns.Contains("XF_NAME") ? Convert.ToString(r0["XF_NAME"]) : "";
                if (string.IsNullOrEmpty(staffName) && t0.Columns.Contains("NAME"))
                    staffName = Convert.ToString(r0["NAME"]);
                shopNo = t0.Columns.Contains("SHOP_NO") ? Convert.ToString(r0["SHOP_NO"])
                       : t0.Columns.Contains("DPNO") ? Convert.ToString(r0["DPNO"])
                       : t0.Columns.Contains("DEP_ID") ? Convert.ToString(r0["DEP_ID"])
                       : t0.Columns.Contains("XH") ? Convert.ToString(r0["XH"]) : "";
            }

            // 2) 按卡号核销（espos.wx_cj_receive_byvip：TAGS='0' → '1' + LJ_TIME + LJ_YGUSERID）
            int rows = 0;
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("v_vipcode", OracleType.VarChar, 100, vipcode, "in"),
                    Cn.Db.MakeParam("v_staff_id", OracleType.VarChar, 100, yg_userid, "in"),
                    Cn.Db.MakeParam("v_rows", OracleType.Int32, 0, 0, "out")
                };
                Cn.Db.exeSql("espos.wx_cj_receive_byvip", ps);
                rows = Convert.ToInt32(ps[2].Value);
            }
            finally
            {
                Cn.Close();
            }

            if (rows <= 0)
            {
                context.Response.Write("{\"errcode\":-12,\"errmsg\":\"奖品已领取或不存在\"}");
                return;
            }

            Log("核销成功 vipcode=" + vipcode + " staff=" + yg_userid + " rows=" + rows);

            // 核销时间（服务端时间，即刚执行核销 UPDATE 的时刻）
            string receivedTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            // 3) 查核销后记录信息（会员/员工/店铺/奖品，espos.wx_cj_prize_info）
            //    员工姓名/店铺号以核销记录关联 xf_staff 为准（无则回退上面 DataSet 提取值）
            string pluId = "", tags = "1", prizeName = "", vipName = "", vipLevel = "";
            DataRow r = GetPrizeRow(vipcode);
            if (r != null)
            {
                pluId = ColVal(r, "PLU_ID");
                tags = ColVal(r, "TAGS");
                prizeName = ColVal(r, "PRIZE_NAME", "XF_DESCI");
                vipName = ColVal(r, "VIP_NAME", "XF_SURNAME");
                vipLevel = ColVal(r, "VIP_LEVEL", "GRADE");
                // 员工姓名/店铺号：优先取员工登录验证 DataSet（真姓名），存储过程仅兜底
                if (string.IsNullOrEmpty(staffName) && !string.IsNullOrEmpty(ColVal(r, "STAFF_NAME", "XF_STAFFCODE")))
                    staffName = ColVal(r, "STAFF_NAME", "XF_STAFFCODE");
                if (string.IsNullOrEmpty(shopNo) && !string.IsNullOrEmpty(ColVal(r, "SHOP_NO", "XF_STORECODE")))
                    shopNo = ColVal(r, "SHOP_NO", "XF_STORECODE");
            }

            context.Response.Write("{\"errcode\":0,\"errmsg\":\"ok\""
                + ",\"plu_id\":\"" + JsonEscape(pluId) + "\""
                + ",\"prize_name\":\"" + JsonEscape(prizeName) + "\""
                + ",\"vip_code\":\"" + JsonEscape(vipcode) + "\""
                + ",\"vip_name\":\"" + JsonEscape(vipName) + "\""
                + ",\"vip_level\":\"" + JsonEscape(vipLevel) + "\""
                + ",\"staff_id\":\"" + JsonEscape(yg_userid) + "\""
                + ",\"staff_name\":\"" + JsonEscape(staffName) + "\""
                + ",\"shop_no\":\"" + JsonEscape(shopNo) + "\""
                + ",\"tags\":\"" + JsonEscape(tags) + "\""
                + ",\"received_time\":\"" + receivedTime + "\"}");
        }

        // 按 openid 查未领取记录的卡号（espos.wx_cj_vip_byopenid）
        private static string GetVipcodeByOpenid(string openid)
        {
            string vipcode = "";
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_openid", OracleType.VarChar, 100, openid, "in")
                };
                DataSet ds = Cn.Db.exeSqlForDataSet("espos.wx_cj_vip_byopenid", ps);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    DataRow r = ds.Tables[0].Rows[0];
                    // 服务器实际存储过程无别名，游标列名为 XF_VIPCODE；兼容历史别名 VIP_CODE
                    string vipCol = r.Table.Columns.Contains("XF_VIPCODE") ? "XF_VIPCODE"
                                  : r.Table.Columns.Contains("VIP_CODE") ? "VIP_CODE" : "";
                    if (!string.IsNullOrEmpty(vipCol))
                    {
                        object v = r[vipCol];
                        if (v != null && v != DBNull.Value) vipcode = v.ToString().Trim();
                    }
                }
            }
            finally
            {
                Cn.Close();
            }
            return vipcode;
        }

        // 按卡号查中奖/核销记录（espos.wx_cj_prize_info）
        private static DataRow GetPrizeRow(string vipcode)
        {
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
                    return ds.Tables[0].Rows[0];
            }
            catch (Exception ex)
            {
                Log("中奖信息查询异常 vipcode=" + vipcode + " :" + ex.ToString());
            }
            finally
            {
                Cn.Close();
            }
            return null;
        }

        // ==================== 好友核验 ====================
        /// <summary>
        /// 好友核验：没加企微/已删除企微 → 不能领奖（与 wx_draw 同逻辑，文案改领奖场景）
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

            // 1) 查绑定表拿 ext_user_id（qy_bind_query 已过滤 status=0，只返回有效绑定）
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
                    errmsg = "客户已删除企业微信，不能领奖";
                }
                else
                {
                    errmsg = "客户尚未添加企业微信，不能领奖";
                }
                return false;
            }

            // 2) 企微验证好友关系（双保险：errcode 失效 + unionid 比对 + follow_user 为空，均视为已删除）
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
                        errmsg = "客户已删除企业微信，不能领奖";
                        return false;
                    }
                    // 成功返回：follow_user（与 external_contact 平级）为空 = 客户已删除全部员工好友
                    JArray fu = jo["follow_user"] as JArray;
                    if (fu == null || fu.Count == 0)
                    {
                        Log("好友核验拦截(follow_user空): unionid=" + unionid + " ext=" + extUserId);
                        errmsg = "客户已删除企业微信，不能领奖";
                        return false;
                    }
                    return true;
                }

                // errcode 非 0（84061 等）：外部联系人数据失效 = 已删除/解除好友关系
                Log("好友核验拦截(errcode=" + ec + "): unionid=" + unionid + " ext=" + extUserId
                    + " msg=" + (jo["errmsg"] ?? ""));
                errmsg = "客户已删除企业微信，不能领奖";
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

        /// <summary>客户联系应用 access_token（缓存 7100 秒，注意必须写全 HttpRuntime.Cache）</summary>
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
                    DateTime.Now.AddSeconds(7100), System.Web.Caching.Cache.NoSlidingExpiration);
                return token;
            }
        }

        private static string JsonEscape(string s)
        {
            if (string.IsNullOrEmpty(s)) return "";
            return s.Replace("\\", "\\\\").Replace("\"", "\\\"");
        }

        /// <summary>微信环境 jscode2session：返回 openid、unionid</summary>
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

        /// <summary>取 DataRow 列值（按候选列名逐个尝试，兼容服务器原版无别名存储过程；找不到/为 NULL 返回空串）</summary>
        private static string ColVal(DataRow r, params string[] cols)
        {
            if (r == null || cols == null) return "";
            foreach (string col in cols)
            {
                if (r.Table.Columns.Contains(col))
                {
                    object v = r[col];
                    if (v != null && v != DBNull.Value) return v.ToString().Trim();
                }
            }
            return "";
        }

        private static void Log(string msg)
        {
            try
            {
                string dir = HttpContext.Current.Server.MapPath("~/App_Data");
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.AppendAllText(Path.Combine(dir, "wx_cj_receive_log.txt"),
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
