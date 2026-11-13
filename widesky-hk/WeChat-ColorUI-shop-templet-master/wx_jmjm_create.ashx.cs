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
    /// 金银币寄卖：创建寄卖单（一单多货品）/ 按员工查寄卖单列表（员工开单页调用）
    ///
    /// 创建（POST，推荐，一单多货品）：
    ///   wx_jmjm_create.ashx?userid=工号&items=[{"name":"熊猫金币","price":35000,"qty":2,"img":"https://.."},...]
    ///   → jmjm_staff_check 验证员工在职(-13) → jmjm_order_ins 写主表(汇总) → jmjm_item_ins 逐条写明细
    ///   返回：{"errcode":0,"order_no":"JM261109000001"}
    ///
    /// 创建（POST，旧版单货品，兼容保留）：
    ///   wx_jmjm_create.ashx?userid=工号&goods_name=货品名称&price=35000&qty=5&img_url=https://...
    ///
    /// 列表（POST）：
    ///   wx_jmjm_create.ashx?userid=工号&action=list
    ///   → jmjm_order_list 按员工倒序 → 返回（客户姓名显示全名便于核对，身份证/电话/地址不回传）
    ///   返回：{"errcode":0,"list":[{"order_no":"..","goods_name":"..","price":..,"qty":..,
    ///           "img_url":"..","cust_name":"张三","status":0,"create_time":"..","sign_time":".."}]}
    ///
    /// 主表 JMJM_ORDER 的 IMG_PATH/GOODS_NAME/PRICE/QTY 为汇总字段：
    ///   首图 / "熊猫金币 等3件" / 合计金额 / 合计数量；货品明细在 JMJM_ORDER_ITEM
    /// </summary>
    public class wx_jmjm_create : IHttpHandler
    {
        // 每个货品照片张数限制（业务要求：固定3张）
        private const int _minImgs = 3;
        private const int _maxImgs = 3;

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json; charset=utf-8";

            string userid = (context.Request["userid"] ?? "").Trim().ToUpper();
            if (string.IsNullOrEmpty(userid))
            {
                context.Response.Write("{\"errcode\":-1,\"errmsg\":\"缺少员工工号\"}");
                return;
            }

            try
            {
                // 列表模式
                if ((context.Request["action"] ?? "").Trim().ToLower() == "list")
                {
                    DoList(context, userid);
                    return;
                }

                // 员工店铺信息模式（开单页顶部显示店铺编号/名称）
                if ((context.Request["action"] ?? "").Trim().ToLower() == "staffinfo")
                {
                    DoStaffInfo(context, userid);
                    return;
                }

                // ==================== 创建模式 ====================
                // 1) 解析货品列表：items JSON 数组优先，缺失时用旧的单货品参数兜底
                string itemsJson = (context.Request["items"] ?? "").Trim();
                JArray items = null;
                if (!string.IsNullOrEmpty(itemsJson))
                {
                    try { items = JArray.Parse(itemsJson); }
                    catch (Exception ex)
                    {
                        Log("items 解析失败:" + ex.Message + " raw=" + itemsJson);
                        context.Response.Write("{\"errcode\":-2,\"errmsg\":\"货品数据格式错误\"}");
                        return;
                    }
                }
                if (items == null || items.Count == 0)
                {
                    JObject one = new JObject();
                    one["name"] = context.Request["goods_name"] ?? "";
                    one["price"] = context.Request["price"] ?? "";
                    one["qty"] = context.Request["qty"] ?? "";
                    one["img"] = context.Request["img_url"] ?? "";
                    items = new JArray();
                    items.Add(one);
                }
                if (items.Count > 50)
                {
                    context.Response.Write("{\"errcode\":-2,\"errmsg\":\"单次最多50件货品\"}");
                    return;
                }

                // 2) 逐项校验，同时汇总首图/汇总名称/合计金额/合计数量
                decimal totalPrice = 0;
                int totalQty = 0;
                string firstImg = "", firstName = "";
                decimal[] itemPrices = new decimal[items.Count];
                int[] itemQtys = new int[items.Count];
                string[] itemNames = new string[items.Count];
                string[] itemImgs = new string[items.Count];

                for (int i = 0; i < items.Count; i++)
                {
                    JToken it = items[i];
                    string name = (it["name"] == null ? "" : it["name"].ToString()).Trim();
                    string priceStr = (it["price"] == null ? "" : it["price"].ToString()).Trim();
                    string qtyStr = (it["qty"] == null ? "" : it["qty"].ToString()).Trim();
                    int no = i + 1;

                    // 货品照片：imgs 数组优先（一货品多图），兼容旧的 img 单图字段
                    StringBuilder imgList = new StringBuilder();
                    int imgCount = 0;
                    JArray imgsArr = it["imgs"] as JArray;
                    if (imgsArr != null)
                    {
                        foreach (JToken im in imgsArr)
                        {
                            string u = (im == null ? "" : im.ToString()).Trim();
                            if (string.IsNullOrEmpty(u)) continue;
                            if (imgCount > 0) imgList.Append(",");
                            imgList.Append(u);
                            imgCount++;
                        }
                    }
                    else
                    {
                        string one = (it["img"] == null ? "" : it["img"].ToString()).Trim();
                        if (!string.IsNullOrEmpty(one)) { imgList.Append(one); imgCount = 1; }
                    }

                    if (string.IsNullOrEmpty(name))
                    {
                        context.Response.Write("{\"errcode\":-2,\"errmsg\":\"第" + no + "件货品请填写名称\"}");
                        return;
                    }
                    decimal price;
                    if (!decimal.TryParse(priceStr, out price) || price <= 0)
                    {
                        context.Response.Write("{\"errcode\":-2,\"errmsg\":\"第" + no + "件寄售价格必须为大于0的数字\"}");
                        return;
                    }
                    int qty;
                    if (!int.TryParse(qtyStr, out qty) || qty <= 0)
                    {
                        context.Response.Write("{\"errcode\":-2,\"errmsg\":\"第" + no + "件寄售数量必须为大于0的整数\"}");
                        return;
                    }
                    if (imgCount < _minImgs)
                    {
                        context.Response.Write("{\"errcode\":-2,\"errmsg\":\"第" + no + "件货品至少上传" + _minImgs
                            + "张照片（当前" + imgCount + "张）\"}");
                        return;
                    }
                    if (imgCount > _maxImgs)
                    {
                        context.Response.Write("{\"errcode\":-2,\"errmsg\":\"第" + no + "件货品最多上传" + _maxImgs + "张照片\"}");
                        return;
                    }

                    itemNames[i] = name;
                    itemImgs[i] = imgList.ToString();
                    itemPrices[i] = price;
                    itemQtys[i] = qty;
                    if (i == 0) { firstImg = itemImgs[i].Split(',')[0]; firstName = name; }
                    totalPrice += price * qty;
                    totalQty += qty;
                }

                string summaryName = items.Count > 1
                    ? firstName + " 等" + items.Count + "件"
                    : firstName;

                // 3) 员工校验（jmjm_staff_check：在职员工才可开单）
                // 店铺归属：员工在"店铺设定"页自选的店铺号优先（前端随单提交），
                // 未设定时回退员工主数据的默认店铺（jmjm_staff_check）
                string shopNoParam = (context.Request["shop_no"] ?? "").Trim();
                string shopNo = "";
                oraclelink.Con Cn = new oraclelink.Con();
                try
                {
                    Cn.Open();
                    OracleParameter[] ps1 = {
                        Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                        Cn.Db.MakeParam("v_staffid", OracleType.VarChar, 50, userid, "in")
                    };
                    DataSet dsStaff = Cn.Db.exeSqlForDataSet("espos.jmjm_staff_check", ps1);
                    if (dsStaff == null || dsStaff.Tables.Count == 0 || dsStaff.Tables[0].Rows.Count == 0)
                    {
                        context.Response.Write("{\"errcode\":-13,\"errmsg\":\"非公司员工，不能开单\"}");
                        return;
                    }
                    shopNo = dsStaff.Tables[0].Rows[0].Table.Columns.Contains("SHOP_NO")
                        ? Convert.ToString(dsStaff.Tables[0].Rows[0]["SHOP_NO"]) : "";
                    if (shopNoParam.Length > 0) shopNo = shopNoParam;
                }
                finally
                {
                    Cn.Close();
                }

                // 4) 写主表（汇总字段），返回单号
                string orderNo = "";
                oraclelink.Con Cn2 = new oraclelink.Con();
                try
                {
                    Cn2.Open();
                    OracleParameter[] ps = {
                        Cn2.Db.MakeParam("v_imgpath", OracleType.VarChar, 500, firstImg, "in"),
                        Cn2.Db.MakeParam("v_goodsname", OracleType.VarChar, 200, summaryName, "in"),
                        Cn2.Db.MakeParam("v_price", OracleType.Number, 0, totalPrice, "in"),
                        Cn2.Db.MakeParam("v_qty", OracleType.Int32, 0, totalQty, "in"),
                        Cn2.Db.MakeParam("v_staffid", OracleType.VarChar, 50, userid, "in"),
                        Cn2.Db.MakeParam("v_shopno", OracleType.VarChar, 50, shopNo, "in"),
                        Cn2.Db.MakeParam("v_orderno", OracleType.VarChar, 32, "", "out")
                    };
                    Cn2.Db.exeSql("espos.jmjm_order_ins", ps);
                    orderNo = Convert.ToString(ps[6].Value);

                    // 5.5) 整单备注（员工选填，主表 REMARK 字段）
                    string remark = (context.Request["remark"] ?? "").Trim();
                    if (remark.Length > 0)
                    {
                        if (remark.Length > 500) remark = remark.Substring(0, 500);
                        try
                        {
                            OracleParameter[] pr = {
                                Cn2.Db.MakeParam("v_orderno", OracleType.VarChar, 32, orderNo, "in"),
                                Cn2.Db.MakeParam("v_remark", OracleType.VarChar, 500, remark, "in")
                            };
                            Cn2.Db.exeSql("espos.jmjm_order_updremark", pr);
                        }
                        catch (Exception rex)
                        {
                            // 备注落库失败不阻断开单（需先执行 alter_jmjm_remark.sql）
                            Log("备注写入失败 order_no=" + orderNo + " :" + rex.Message);
                        }
                    }

                    // 5) 逐条写货品明细（jmjm_item_ins）
                    //    若明细表/存储过程尚未创建（未执行 alter_jmjm_order_items.sql），
                    //    此处失败只记日志不阻断开单，客户页会按主表汇总字段降级显示一条。
                    int okItems = 0;
                    try
                    {
                        for (int i = 0; i < items.Count; i++)
                        {
                            string plu = (items[i]["plu"] == null ? "" : items[i]["plu"].ToString()).Trim();
                            if (plu.Length > 50) plu = plu.Substring(0, 50);
                            OracleParameter[] psi = {
                                Cn2.Db.MakeParam("v_orderno", OracleType.VarChar, 32, orderNo, "in"),
                                Cn2.Db.MakeParam("v_seq", OracleType.Int32, 0, i + 1, "in"),
                                Cn2.Db.MakeParam("v_imgpath", OracleType.VarChar, 500, itemImgs[i], "in"),
                                Cn2.Db.MakeParam("v_goodsname", OracleType.VarChar, 200, itemNames[i], "in"),
                                Cn2.Db.MakeParam("v_price", OracleType.Number, 0, itemPrices[i], "in"),
                                Cn2.Db.MakeParam("v_qty", OracleType.Int32, 0, itemQtys[i], "in"),
                                Cn2.Db.MakeParam("v_plu", OracleType.VarChar, 50, plu, "in")
                            };
                            Cn2.Db.exeSql("espos.jmjm_item_ins", psi);
                            okItems++;
                        }
                    }
                    catch (Exception iex)
                    {
                        Log("明细写入失败 order_no=" + orderNo + " 已写" + okItems + "/" + items.Count
                            + " 请确认已执行 alter_jmjm_order_items.sql :" + iex.Message);
                    }

                    Log("开单成功 order_no=" + orderNo + " staff=" + userid
                        + " items=" + items.Count + " detail=" + okItems
                        + " totalPrice=" + totalPrice + " totalQty=" + totalQty);
                }
                finally
                {
                    Cn2.Close();
                }

                context.Response.Write("{\"errcode\":0,\"order_no\":\"" + JsonEscape(orderNo) + "\"}");
            }
            catch (Exception ex)
            {
                Log("异常:" + ex.ToString());
                // 提示中附带异常摘要，便于现场定位（完整堆栈见 App_Data/wx_jmjm_create_log.txt）
                string msg = ex.Message != null ? ex.Message.Replace("\r", " ").Replace("\n", " ") : "";
                if (msg.Length > 120) msg = msg.Substring(0, 120);
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"系统繁忙，请稍后重试[" + JsonEscape(msg) + "]\"}");
            }
        }

        // 查员工店铺信息（jmjm_staff_check：店铺编号/名称，开单页顶部显示）
        private void DoStaffInfo(HttpContext context, string userid)
        {
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_staffid", OracleType.VarChar, 50, userid, "in")
                };
                DataSet ds = Cn.Db.exeSqlForDataSet("espos.jmjm_staff_check", ps);
                if (ds == null || ds.Tables.Count == 0 || ds.Tables[0].Rows.Count == 0)
                {
                    context.Response.Write("{\"errcode\":-13,\"errmsg\":\"非公司员工\"}");
                    return;
                }
                DataRow r = ds.Tables[0].Rows[0];
                string shopNo = r.Table.Columns.Contains("SHOP_NO") ? Convert.ToString(r["SHOP_NO"]) : "";
                // 店铺名称列名容错：SHOP_NAME / SHOPNAME
                string shopName = r.Table.Columns.Contains("SHOP_NAME") ? Convert.ToString(r["SHOP_NAME"])
                    : r.Table.Columns.Contains("SHOPNAME") ? Convert.ToString(r["SHOPNAME"]) : "";
                context.Response.Write("{\"errcode\":0"
                    + ",\"shop_no\":\"" + JsonEscape(shopNo) + "\""
                    + ",\"shop_name\":\"" + JsonEscape(shopName) + "\"}");
            }
            finally
            {
                Cn.Close();
            }
        }

        // 按员工查寄卖单列表（客户姓名显示全名便于核对；身份证/电话/地址不回传）
        private void DoList(HttpContext context, string userid)
        {
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_staffid", OracleType.VarChar, 50, userid, "in")
                };
                DataSet ds = Cn.Db.exeSqlForDataSet("espos.jmjm_order_list", ps);

                string json = "";
                if (ds != null && ds.Tables.Count > 0)
                {
                    DataTable t = ds.Tables[0];
                    foreach (DataRow r in t.Rows)
                    {
                        if (json.Length > 0) json += ",";
                        string orderNo = t.Columns.Contains("ORDER_NO") ? Convert.ToString(r["ORDER_NO"]) : "";
                        string goodsName = t.Columns.Contains("GOODS_NAME") ? Convert.ToString(r["GOODS_NAME"]) : "";
                        string imgPath = t.Columns.Contains("IMG_PATH") ? Convert.ToString(r["IMG_PATH"]) : "";
                        imgPath = ToShowUrl(context, imgPath);
                        decimal price = t.Columns.Contains("PRICE") && r["PRICE"] != DBNull.Value
                            ? Convert.ToDecimal(r["PRICE"]) : 0;
                        int qty = t.Columns.Contains("QTY") && r["QTY"] != DBNull.Value
                            ? Convert.ToInt32(r["QTY"]) : 0;
                        string custName = t.Columns.Contains("CUST_NAME") ? Convert.ToString(r["CUST_NAME"]) : "";
                        string remark = t.Columns.Contains("REMARK") ? Convert.ToString(r["REMARK"]) : "";
                        int status = t.Columns.Contains("STATUS") && r["STATUS"] != DBNull.Value
                            ? Convert.ToInt32(r["STATUS"]) : 0;
                        string createTime = t.Columns.Contains("CREATE_TIME") && r["CREATE_TIME"] != DBNull.Value
                            ? Convert.ToDateTime(r["CREATE_TIME"]).ToString("MM-dd HH:mm") : "";
                        string signTime = t.Columns.Contains("SIGN_TIME") && r["SIGN_TIME"] != DBNull.Value
                            ? Convert.ToDateTime(r["SIGN_TIME"]).ToString("MM-dd HH:mm") : "";

                        json += "{\"order_no\":\"" + JsonEscape(orderNo) + "\""
                            + ",\"goods_name\":\"" + JsonEscape(goodsName) + "\""
                            + ",\"img_url\":\"" + JsonEscape(imgPath) + "\""
                            + ",\"price\":" + price.ToString("0.##")
                            + ",\"qty\":" + qty
                            + ",\"cust_name\":\"" + JsonEscape(custName) + "\""
                            + ",\"remark\":\"" + JsonEscape(remark) + "\""
                            + ",\"status\":" + status
                            + ",\"create_time\":\"" + createTime + "\""
                            + ",\"sign_time\":\"" + signTime + "\"}";
                    }
                }
                context.Response.Write("{\"errcode\":0,\"list\":[" + json + "]}");
            }
            finally
            {
                Cn.Close();
            }
        }

        private static string JsonEscape(string s)
        {
            if (string.IsNullOrEmpty(s)) return "";
            return s.Replace("\\", "\\\\").Replace("\"", "\\\"");
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
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
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

        private static void Log(string msg)
        {
            try
            {
                string dir = HttpContext.Current.Server.MapPath("~/App_Data");
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.AppendAllText(Path.Combine(dir, "wx_jmjm_create_log.txt"),
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
