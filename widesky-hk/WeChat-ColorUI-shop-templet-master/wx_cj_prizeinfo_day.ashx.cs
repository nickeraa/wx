using System;
using System.Data;
using System.Data.OracleClient;
using System.IO;
using System.Text;
using System.Web;
using FineUIPro.EmptyProjectNet40.App_Code;

namespace FineUIPro.EmptyProjectNet40
{
    /// <summary>
    /// 国庆抽奖：按卡号查询中奖信息
    /// 1) 员工查中奖情况（只传卡号，cxzjjr 查询页）：
    ///    wx_cj_prizeinfo_day.ashx?vipcode=卡号
    ///    返回：{"errcode":0,"vip_name":"罗连开","vip_level":"金卡","list":[
    ///             {"row_id":"143","tags":"0","plu_id":6,"prize_name":"现金券10元","cj_time":"2026-09-29 12:22:08","lj_time":""},
    ///             {"row_id":"151","tags":"1","plu_id":7,"prize_name":"现金券5元","cj_time":"2026-09-29 14:42:33","lj_time":"2026-09-29 15:02:11"}]}
    /// 2) 核销页扫码进入（卡号+记录ID，hxjr 核销页）：
    ///    wx_cj_prizeinfo_day.ashx?vipcode=卡号&rowid=记录自增ID
    ///    返回：{"errcode":0,"tags":"0","plu_id":7,"prize_name":"现金券5元","vip_name":"...","vip_level":"金卡"}
    ///       / {"errcode":-1/-8/-12,"errmsg":"..."}
    /// 说明：只传卡号时一次返回该卡全部中奖记录（国庆活动单人最多3次抽奖），
    ///       依赖存储过程 wx_cj_prize_info_day 在 v_rowid 为空时不过滤记录ID（见配套说明）。
    /// </summary>
    public class wx_cj_prizeinfo_day : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json; charset=utf-8";

            // 卡号统一大写：抽奖写库时已做 ToUpper，查询保持一致
            string vipcode = (context.Request["vipcode"] ?? "").Trim().ToUpper();
            string rowid = (context.Request["rowid"] ?? "").Trim();
            if (string.IsNullOrEmpty(vipcode))
            {
                context.Response.Write("{\"errcode\":-1,\"errmsg\":\"缺少卡号\"}");
                return;
            }

            try
            {
                DataTable dt = QueryPrizeInfo(vipcode, rowid);
                if (dt == null || dt.Rows.Count == 0)
                {
                    Log("未找到记录 vip=" + vipcode + " id=" + rowid);
                    context.Response.Write("{\"errcode\":-12,\"errmsg\":\"未找到中奖记录\"}");
                    return;
                }

                // ===== 只传卡号：返回该卡全部中奖记录列表 =====
                if (string.IsNullOrEmpty(rowid))
                {
                    Log("查询成功(列表) vip=" + vipcode + " 记录数=" + dt.Rows.Count);
                    context.Response.Write(BuildListJson(dt));
                    return;
                }

                // ===== 卡号+记录ID：返回单条中奖信息（核销页扫码用） =====
                DataRow r = dt.Rows[0];
                Log("查询成功 vip=" + vipcode + " id=" + rowid
                    + " tags=" + SafeStr(r, "TAGS") + " plu=" + SafeStr(r, "PLU_ID"));
                context.Response.Write("{\"errcode\":0"
                    + ",\"tags\":\"" + JsonEscape(SafeStr(r, "TAGS")) + "\""
                    + ",\"plu_id\":" + JsonNum(SafeStr(r, "PLU_ID"))
                    + ",\"prize_name\":\"" + JsonEscape(SafeStr(r, "PRIZE_NAME")) + "\""
                    + ",\"vip_name\":\"" + JsonEscape(SafeStr(r, "VIP_NAME")) + "\""
                    + ",\"vip_level\":\"" + JsonEscape(SafeStr(r, "VIP_LEVEL")) + "\"}");
            }
            catch (Exception ex)
            {
                Log("查询异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"系统繁忙，请稍后重试\"}");
            }
        }

        /// <summary>列表模式：把该卡全部中奖记录拼成 JSON（字段缺列时自动为空，不影响输出）</summary>
        private static string BuildListJson(DataTable dt)
        {
            DataRow first = dt.Rows[0];
            StringBuilder sb = new StringBuilder();
            sb.Append("{\"errcode\":0");
            sb.Append(",\"vip_code\":\"").Append(JsonEscape(SafeStr(first, "VIP_CODE"))).Append("\"");
            sb.Append(",\"vip_name\":\"").Append(JsonEscape(SafeStr(first, "VIP_NAME"))).Append("\"");
            sb.Append(",\"vip_level\":\"").Append(JsonEscape(SafeStr(first, "VIP_LEVEL"))).Append("\"");
            sb.Append(",\"list\":[");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow r = dt.Rows[i];
                if (i > 0) sb.Append(",");
                sb.Append("{\"row_id\":\"").Append(JsonEscape(SafeStr(r, "ID"))).Append("\"");
                sb.Append(",\"tags\":\"").Append(JsonEscape(SafeStr(r, "TAGS"))).Append("\"");
                sb.Append(",\"plu_id\":").Append(JsonNum(SafeStr(r, "PLU_ID")));
                sb.Append(",\"prize_name\":\"").Append(JsonEscape(SafeStr(r, "PRIZE_NAME"))).Append("\"");
                sb.Append(",\"cj_time\":\"").Append(JsonEscape(SafeStr(r, "CJ_TIME"))).Append("\"");
                sb.Append(",\"lj_time\":\"").Append(JsonEscape(SafeStr(r, "LJ_TIME"))).Append("\"");
                sb.Append(",\"staff_id\":\"").Append(JsonEscape(SafeStr(r, "STAFF_ID"))).Append("\"");
                sb.Append("}");
            }
            sb.Append("]}");
            return sb.ToString();
        }

        /// <summary>按卡号（+可选记录自增ID）查中奖信息（存储过程 wx_cj_prize_info_day，OUT 游标在第一位）</summary>
        private static DataTable QueryPrizeInfo(string vipcode, string rowid)
        {
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_vipcode", OracleType.VarChar, 100, vipcode, "in"),
                    Cn.Db.MakeParam("v_rowid", OracleType.VarChar, 50, rowid, "in")
                };
                DataSet ds = Cn.Db.exeSqlForDataSet("wx_cj_prize_info_day", ps);
                if (ds != null && ds.Tables.Count > 0)
                {
                    return ds.Tables[0];
                }
                return null;
            }
            finally
            {
                Cn.Close();
            }
        }

        // ==================== 工具方法 ====================

        private static string SafeStr(DataRow row, string col)
        {
            if (row == null) return "";
            if (!row.Table.Columns.Contains(col)) return "";
            object v = row[col];
            return v == null || v == DBNull.Value ? "" : v.ToString();
        }

        private static string JsonNum(string s)
        {
            long n;
            if (long.TryParse(s, out n)) return n.ToString();
            return "0";
        }

        private static string JsonEscape(string s)
        {
            if (string.IsNullOrEmpty(s)) return "";
            return s.Replace("\\", "\\\\").Replace("\"", "\\\"")
                    .Replace("\r", "").Replace("\n", "").Replace("\t", "");
        }

        private static void Log(string msg)
        {
            try
            {
                string dir = HttpContext.Current.Server.MapPath("~/App_Data");
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.AppendAllText(Path.Combine(dir, "wx_cj_prizeinfo_day_log.txt"),
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
