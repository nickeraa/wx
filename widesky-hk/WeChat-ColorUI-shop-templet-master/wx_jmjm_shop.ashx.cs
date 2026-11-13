using System;
using System.Data;
using System.Data.OracleClient;
using System.IO;
using System.Web;
using Newtonsoft.Json;

namespace FineUIPro.EmptyProjectNet40
{
    /// <summary>
    /// 金银币寄卖：店铺设定（员工自选归属店铺）
    ///
    /// 店铺列表（GET/POST）：wx_jmjm_shop.ashx?userid=工号&action=list
    ///   → _shopListSql 查店铺表 → {"errcode":0,"list":[{"shop_no":"..","shop_name":".."}]}
    ///
    /// 当前归属（GET/POST）：wx_jmjm_shop.ashx?userid=工号&action=current
    ///   → 优先 jmjm_staff_shop_get（员工自选）；无自选记录时回退 jmjm_staff_check 的默认店铺
    ///   → {"errcode":0,"shop_no":"..","shop_name":"..","from_setting":true|false}
    ///
    /// 保存归属（POST）：wx_jmjm_shop.ashx?userid=工号&action=save&shop_no=..&shop_name=..
    ///   → jmjm_staff_shop_save 覆盖式保存 → {"errcode":0}
    /// </summary>
    public class wx_jmjm_shop : IHttpHandler
    {
        // 店铺列表查询存储过程（见 alter_jmjm_staff_shop.sql 第4段 jmjm_shop_list）
        private const string _shopListProc = "espos.jmjm_shop_list";

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json; charset=utf-8";

            string userid = (context.Request["userid"] ?? "").Trim().ToUpper();
            if (string.IsNullOrEmpty(userid))
            {
                context.Response.Write("{\"errcode\":-1,\"errmsg\":\"缺少员工工号\"}");
                return;
            }
            string action = (context.Request["action"] ?? "").Trim().ToLower();

            try
            {
                if (action == "list") { DoList(context); return; }
                if (action == "current") { DoCurrent(context, userid); return; }
                if (action == "save") { DoSave(context, userid); return; }
                context.Response.Write("{\"errcode\":-2,\"errmsg\":\"未知操作\"}");
            }
            catch (Exception ex)
            {
                Log("异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"系统繁忙，请稍后重试\"}");
            }
        }

        // 店铺列表
        private void DoList(HttpContext context)
        {
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out")
                };
                DataSet ds = Cn.Db.exeSqlForDataSet(_shopListProc, ps);
                string json = "";
                if (ds != null && ds.Tables.Count > 0)
                {
                    DataTable t = ds.Tables[0];
                    foreach (DataRow r in t.Rows)
                    {
                        if (json.Length > 0) json += ",";
                        string no = t.Columns.Contains("SHOP_NO") ? Convert.ToString(r["SHOP_NO"]) : "";
                        string name = t.Columns.Contains("SHOP_NAME") ? Convert.ToString(r["SHOP_NAME"]) : "";
                        json += "{\"shop_no\":\"" + JsonEscape(no) + "\",\"shop_name\":\"" + JsonEscape(name) + "\"}";
                    }
                }
                context.Response.Write("{\"errcode\":0,\"list\":[" + json + "]}");
            }
            finally { Cn.Close(); }
        }

        // 当前归属：员工自选优先，否则回退 jmjm_staff_check 默认店铺
        private void DoCurrent(HttpContext context, string userid)
        {
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                // 1) 自选归属
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_staffid", OracleType.VarChar, 50, userid, "in")
                };
                DataSet ds = Cn.Db.exeSqlForDataSet("espos.jmjm_staff_shop_get", ps);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    DataRow r = ds.Tables[0].Rows[0];
                    context.Response.Write("{\"errcode\":0"
                        + ",\"shop_no\":\"" + JsonEscape(r.Table.Columns.Contains("SHOP_NO") ? Convert.ToString(r["SHOP_NO"]) : "") + "\""
                        + ",\"shop_name\":\"" + JsonEscape(r.Table.Columns.Contains("SHOP_NAME") ? Convert.ToString(r["SHOP_NAME"]) : "") + "\""
                        + ",\"from_setting\":true}");
                    return;
                }

                // 2) 无自选：回退员工主数据的默认店铺
                OracleParameter[] ps2 = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_staffid", OracleType.VarChar, 50, userid, "in")
                };
                DataSet ds2 = Cn.Db.exeSqlForDataSet("espos.jmjm_staff_check", ps2);
                if (ds2 != null && ds2.Tables.Count > 0 && ds2.Tables[0].Rows.Count > 0)
                {
                    DataRow r = ds2.Tables[0].Rows[0];
                    string no = r.Table.Columns.Contains("SHOP_NO") ? Convert.ToString(r["SHOP_NO"]) : "";
                    string name = r.Table.Columns.Contains("SHOP_NAME") ? Convert.ToString(r["SHOP_NAME"])
                        : r.Table.Columns.Contains("SHOPNAME") ? Convert.ToString(r["SHOPNAME"]) : "";
                    context.Response.Write("{\"errcode\":0"
                        + ",\"shop_no\":\"" + JsonEscape(no) + "\""
                        + ",\"shop_name\":\"" + JsonEscape(name) + "\""
                        + ",\"from_setting\":false}");
                    return;
                }
                context.Response.Write("{\"errcode\":-13,\"errmsg\":\"非公司员工\"}");
            }
            finally { Cn.Close(); }
        }

        // 保存归属
        private void DoSave(HttpContext context, string userid)
        {
            string shopNo = (context.Request["shop_no"] ?? "").Trim();
            string shopName = (context.Request["shop_name"] ?? "").Trim();
            if (shopNo.Length == 0)
            {
                context.Response.Write("{\"errcode\":-2,\"errmsg\":\"请选择店铺\"}");
                return;
            }
            if (shopNo.Length > 50) shopNo = shopNo.Substring(0, 50);
            if (shopName.Length > 200) shopName = shopName.Substring(0, 200);

            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("v_staffid", OracleType.VarChar, 50, userid, "in"),
                    Cn.Db.MakeParam("v_shopno", OracleType.VarChar, 50, shopNo, "in"),
                    Cn.Db.MakeParam("v_shopname", OracleType.VarChar, 200, shopName, "in")
                };
                Cn.Db.exeSql("espos.jmjm_staff_shop_save", ps);
                Log("店铺设定成功 staff=" + userid + " shop_no=" + shopNo + " shop_name=" + shopName);
                context.Response.Write("{\"errcode\":0}");
            }
            finally { Cn.Close(); }
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
                File.AppendAllText(Path.Combine(dir, "wx_jmjm_shop_log.txt"),
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
