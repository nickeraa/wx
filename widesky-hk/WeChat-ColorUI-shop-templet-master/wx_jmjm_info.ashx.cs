using System;
using System.Data;
using System.Data.OracleClient;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using FineUIPro.EmptyProjectNet40.App_Code;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace FineUIPro.EmptyProjectNet40
{
    /// <summary>
    /// 金银币寄卖：客户扫码后查寄卖单详情（客户确认页调用，一单多货品）
    /// 调用：wx_jmjm_info.ashx?order_no=JM261109000001
    /// 返回：{"errcode":0,"order_no":"..","goods_name":"..","price":合计,"qty":合计,
    ///        "img_url":"首图","staff_id":"..","create_time":"..","status":0,
    ///        "goods_items":[{"seq":1,"img_url":"..","goods_name":"..","price":35000,"qty":2},...],
    ///        "cust_name":"..","cust_phone":"..","cust_idcard_mask":"44****..X","cust_addr":"..",
    ///        "bank_user":"..","bank_name":"..","bank_account":".."}
    ///       / {"errcode":-12,"errmsg":"寄卖单不存在"}
    /// 身份证仅脱敏回传，完整值只入库用于电子签填充；
    /// 收款账户（开户人/开户行/银行卡号）用于客户信息回显（客户自己填写的）
    /// </summary>
    public class wx_jmjm_info : IHttpHandler
    {
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
                oraclelink.Con Cn = new oraclelink.Con();
                try
                {
                    Cn.Open();
                    OracleParameter[] ps = {
                        Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                        Cn.Db.MakeParam("v_orderno", OracleType.VarChar, 32, orderNo, "in")
                    };
                    DataSet ds = Cn.Db.exeSqlForDataSet("espos.jmjm_order_by_no", ps);
                    if (ds == null || ds.Tables.Count == 0 || ds.Tables[0].Rows.Count == 0)
                    {
                        context.Response.Write("{\"errcode\":-12,\"errmsg\":\"寄卖单不存在，请核对二维码\"}");
                        return;
                    }

                    DataRow r = ds.Tables[0].Rows[0];
                    DataTable t = ds.Tables[0];
                    string goodsName = ColVal(t, r, "GOODS_NAME");
                    string imgPath = ToShowUrl(context, ColVal(t, r, "IMG_PATH"));
                    decimal price = t.Columns.Contains("PRICE") && r["PRICE"] != DBNull.Value
                        ? Convert.ToDecimal(r["PRICE"]) : 0;
                    int qty = t.Columns.Contains("QTY") && r["QTY"] != DBNull.Value
                        ? Convert.ToInt32(r["QTY"]) : 0;
                    string staffId = ColVal(t, r, "STAFF_ID");
                    int status = t.Columns.Contains("STATUS") && r["STATUS"] != DBNull.Value
                        ? Convert.ToInt32(r["STATUS"]) : 0;
                    string custName = ColVal(t, r, "CUST_NAME");
                    string custPhone = ColVal(t, r, "CUST_PHONE");
                    string custIdcard = ColVal(t, r, "CUST_IDCARD");
                    string custAddr = ColVal(t, r, "CUST_ADDR");
                    // 收款账户（回显；未执行 alter_jmjm_bank.sql 时列不存在则返回空）
                    string bankUser = ColVal(t, r, "BANK_USER");
                    string bankName = ColVal(t, r, "BANK_NAME");
                    string bankAcct = ColVal(t, r, "BANK_ACCOUNT");
                    string createTime = t.Columns.Contains("CREATE_TIME") && r["CREATE_TIME"] != DBNull.Value
                        ? Convert.ToDateTime(r["CREATE_TIME"]).ToString("yyyy-MM-dd") : "";
                    // 签署时间（已签署单显示）
                    string signTime = t.Columns.Contains("SIGN_TIME") && r["SIGN_TIME"] != DBNull.Value
                        ? Convert.ToDateTime(r["SIGN_TIME"]).ToString("yyyy-MM-dd HH:mm") : "";

                    // 货品明细（一单多货品）
                    string itemsJson = BuildItemsJson(orderNo, t, r);

                    context.Response.Write("{\"errcode\":0"
                        + ",\"order_no\":\"" + JsonEscape(orderNo) + "\""
                        + ",\"goods_name\":\"" + JsonEscape(goodsName) + "\""
                        + ",\"img_url\":\"" + JsonEscape(imgPath) + "\""
                        + ",\"price\":" + price.ToString("0.##")
                        + ",\"qty\":" + qty
                        + ",\"staff_id\":\"" + JsonEscape(staffId) + "\""
                        + ",\"create_time\":\"" + createTime + "\""
                        + ",\"sign_time\":\"" + JsonEscape(signTime) + "\""
                        + ",\"status\":" + status
                        + ",\"goods_items\":[" + itemsJson + "]"
                        + ",\"cust_name\":\"" + JsonEscape(custName) + "\""
                        + ",\"cust_phone\":\"" + JsonEscape(custPhone) + "\""
                        + ",\"cust_idcard_mask\":\"" + JsonEscape(MaskIdCard(custIdcard)) + "\""
                        + ",\"cust_addr\":\"" + JsonEscape(custAddr) + "\""
                        + ",\"bank_user\":\"" + JsonEscape(bankUser) + "\""
                        + ",\"bank_name\":\"" + JsonEscape(bankName) + "\""
                        + ",\"bank_account\":\"" + JsonEscape(bankAcct) + "\""
                        + ",\"sign_url\":\"" + (status == 1 ? JsonEscape(ColVal(t, r, "SIGN_URL")) : "") + "\"}");
                }
                finally
                {
                    Cn.Close();
                }
            }
            catch (Exception ex)
            {
                Log("查询异常 order_no=" + orderNo + " :" + ex.ToString());
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"系统繁忙，请稍后重试\"}");
            }
        }

        // 查货品明细；无明细行时用主表字段兜底拼一条（兼容旧单）
        private static string BuildItemsJson(string orderNo, DataTable mainTable, DataRow mainRow)
        {
            StringBuilder sb = new StringBuilder();
            try
            {
                oraclelink.Con Cn = new oraclelink.Con();
                try
                {
                    Cn.Open();
                    OracleParameter[] ps = {
                        Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                        Cn.Db.MakeParam("v_orderno", OracleType.VarChar, 32, orderNo, "in")
                    };
                    DataSet ds = Cn.Db.exeSqlForDataSet("espos.jmjm_order_items", ps);
                    if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    {
                        DataTable t = ds.Tables[0];
                        foreach (DataRow r in t.Rows)
                        {
                            if (sb.Length > 0) sb.Append(",");
                            int seq = t.Columns.Contains("SEQ") && r["SEQ"] != DBNull.Value ? Convert.ToInt32(r["SEQ"]) : 0;
                            decimal price = t.Columns.Contains("PRICE") && r["PRICE"] != DBNull.Value ? Convert.ToDecimal(r["PRICE"]) : 0;
                            int qty = t.Columns.Contains("QTY") && r["QTY"] != DBNull.Value ? Convert.ToInt32(r["QTY"]) : 0;
                            string ip = ToShowUrl(HttpContext.Current, ColVal(t, r, "IMG_PATH"));   // 多图：逗号分隔，转完整URL供显示
                            string[] arr = ip.Length > 0 ? ip.Split(',') : new string[0];
                            string firstUrl = arr.Length > 0 ? arr[0].Trim() : "";
                            sb.Append("{\"seq\":").Append(seq)
                              .Append(",\"img_url\":\"").Append(JsonEscape(firstUrl)).Append("\"")
                              .Append(",\"imgs\":[");
                            for (int k = 0; k < arr.Length; k++)
                            {
                                string u = arr[k].Trim();
                                if (u.Length == 0) continue;
                                if (k > 0) sb.Append(",");
                                sb.Append("\"").Append(JsonEscape(u)).Append("\"");
                            }
                            sb.Append("]")
                              .Append(",\"plu\":\"").Append(JsonEscape(ColVal(t, r, "PLU"))).Append("\"")
                              .Append(",\"goods_name\":\"").Append(JsonEscape(ColVal(t, r, "GOODS_NAME"))).Append("\"")
                              .Append(",\"price\":").Append(price.ToString("0.##"))
                              .Append(",\"qty\":").Append(qty).Append("}");
                        }
                        return sb.ToString();
                    }
                }
                finally
                {
                    Cn.Close();
                }
            }
            catch (Exception ex)
            {
                // 明细表未创建（未执行增量脚本）时降级：用主表字段拼一条
                Log("明细查询失败 order_no=" + orderNo + " :" + ex.Message);
            }

            // 兜底：主表汇总字段当作单条明细
            decimal mPrice = mainTable.Columns.Contains("PRICE") && mainRow["PRICE"] != DBNull.Value
                ? Convert.ToDecimal(mainRow["PRICE"]) : 0;
            int mQty = mainTable.Columns.Contains("QTY") && mainRow["QTY"] != DBNull.Value
                ? Convert.ToInt32(mainRow["QTY"]) : 0;
            string mImg = ToShowUrl(HttpContext.Current, ColVal(mainTable, mainRow, "IMG_PATH"));
            return "{\"seq\":1"
                + ",\"img_url\":\"" + JsonEscape(mImg) + "\""
                + ",\"imgs\":[" + (mImg.Length > 0 ? "\"" + JsonEscape(mImg) + "\"" : "") + "]"
                + ",\"goods_name\":\"" + JsonEscape(ColVal(mainTable, mainRow, "GOODS_NAME")) + "\""
                + ",\"price\":" + mPrice.ToString("0.##")
                + ",\"qty\":" + mQty + "}";
        }

        // 身份证脱敏：保留前3后2，中间打星
        private static string MaskIdCard(string idcard)
        {
            if (string.IsNullOrEmpty(idcard) || idcard.Length <= 5) return idcard;
            return idcard.Substring(0, 3) + new string('*', idcard.Length - 5) + idcard.Substring(idcard.Length - 2);
        }

        private static string ColVal(DataTable t, DataRow r, string col)
        {
            if (t.Columns.Contains(col) && r[col] != DBNull.Value) return Convert.ToString(r[col]).Trim();
            return "";
        }

        // 相对路径(/jmimgs/..)转应用绝对URL供页面显示（应用部署于子目录时自动带前缀，如 /HKback）；完整URL原样返回（多图逗号分隔逐段处理）
        private static string ToShowUrl(HttpContext ctx, string path)
        {
            if (string.IsNullOrEmpty(path)) return "";
            string root = "";
            if (ctx != null && ctx.Request != null)
            {
                string appPath = ctx.Request.ApplicationPath;
                if (string.IsNullOrEmpty(appPath) || appPath == "/") appPath = "";
                root = ctx.Request.Url.GetLeftPart(UriPartial.Authority) + appPath;
            }
            string[] arr = path.Split(',');
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < arr.Length; i++)
            {
                string u = arr[i].Trim();
                if (u.Length == 0) continue;
                if (!u.StartsWith("http", StringComparison.OrdinalIgnoreCase))
                {
                    if (!u.StartsWith("/")) u = "/" + u;
                    u = root + u;
                }
                if (sb.Length > 0) sb.Append(",");
                sb.Append(u);
            }
            return sb.ToString();
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
                File.AppendAllText(Path.Combine(dir, "wx_jmjm_info_log.txt"),
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
