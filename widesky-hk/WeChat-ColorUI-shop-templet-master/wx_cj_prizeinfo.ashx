using System;
using System.Data;
using System.Data.OracleClient;
using System.IO;
using System.Web;

namespace FineUIPro.EmptyProjectNet40
{
    //
    /// <summary>
    /// 按会员卡号查最新中奖/核销记录（客户领奖页轮询核销状态 + 员工核销页共用）
    /// 调用：wx_cj_prizeinfo.ashx?vipcode=卡号
    /// 返回：{"errcode":0,"plu_id":..,"prize_name":..,"vip_code":..,"vip_name":..,"vip_level":..,"staff_id":..,"staff_name":..,"shop_no":..,"tags":"0/1"}
    ///       / {"errcode":-1/-8/-12,"errmsg":"..."}
    /// </summary>
    public class wx_cj_prizeinfo : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json; charset=utf-8";

            string vipcode = (context.Request["vipcode"] ?? "").Trim();
            if (string.IsNullOrEmpty(vipcode))
            {
                context.Response.Write("{\"errcode\":-1,\"errmsg\":\"缺少卡号\"}");
                return;
            }

            string pluId = "", tags = "", prizeName = "", vipName = "", vipLevel = "";
            string staffId = "", staffName = "", shopNo = "";

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
                    pluId = ColVal(r, "PLU_ID");
                    tags = ColVal(r, "TAGS");
                    prizeName = ColVal(r, "PRIZE_NAME", "XF_DESCI");
                    vipName = ColVal(r, "VIP_NAME", "XF_SURNAME");
                    vipLevel = ColVal(r, "VIP_LEVEL", "GRADE");
                    staffId = ColVal(r, "STAFF_ID");
                    staffName = ColVal(r, "STAFF_NAME", "XF_STAFFCODE");
                    shopNo = ColVal(r, "SHOP_NO", "XF_STORECODE");
                }
            }
            catch (Exception ex)
            {
                Log("中奖信息查询异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"系统繁忙，请稍后重试\"}");
                return;
            }
            finally
            {
                Cn.Close();
            }

            if (string.IsNullOrEmpty(pluId))
            {
                context.Response.Write("{\"errcode\":-12,\"errmsg\":\"未找到中奖记录\"}");
                return;
            }

            context.Response.Write("{\"errcode\":0"
                + ",\"plu_id\":\"" + JsonEscape(pluId) + "\""
                + ",\"prize_name\":\"" + JsonEscape(prizeName) + "\""
                + ",\"vip_code\":\"" + JsonEscape(vipcode) + "\""
                + ",\"vip_name\":\"" + JsonEscape(vipName) + "\""
                + ",\"vip_level\":\"" + JsonEscape(vipLevel) + "\""
                + ",\"staff_id\":\"" + JsonEscape(staffId) + "\""
                + ",\"staff_name\":\"" + JsonEscape(staffName) + "\""
                + ",\"shop_no\":\"" + JsonEscape(shopNo) + "\""
                + ",\"tags\":\"" + JsonEscape(tags) + "\"}");
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
                File.AppendAllText(Path.Combine(dir, "wx_cj_prizeinfo_log.txt"),
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
