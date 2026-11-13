using System;
using System.Data;
using System.Data.OracleClient;
using System.IO;
using System.Web;
using Newtonsoft.Json.Linq;

namespace FineUIPro.EmptyProjectNet40
{
    /// <summary>
    /// 金银币寄卖：电子签签署状态回查（客户确认页轮询调用）
    /// 调用：wx_jmjm_status.ashx?order_no=JM261109000001
    /// 流程：查单据 → STATUS=1 且 FLOW_ID 非空时调电子签 DescribeFlowInfo：
    ///       FlowStatus=ALL/2/4（全部签署完成）→ 落库 STATUS=2 + SIGN_TIME；
    ///       3已撤销/5已过期/6已拒签（或 REJECT/CANCEL/DEADLINE/EXPIRED/VOIDED）→ STATUS=9
    ///       （企业版 FlowStatus 为数字枚举：0待签署 1签署中 2已签署待生效 3已撤销 4已完成 5已过期 6已拒签；渠道版为字符串枚举，兼容两种）
    /// 返回：{"errcode":0,"status":0|1|2|9,"fail_msg":".."}
    /// </summary>
    public class wx_jmjm_status : IHttpHandler
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
                // 1) 查单据当前状态
                int status;
                string flowId;
                string failMsg;
                string essStatus = "";   // 电子签真实流程状态（回查后随返回体输出，便于排查）
                string essRaw = "";      // DescribeFlowInfo 原始返回（未取到状态时输出，便于排查）
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
                        context.Response.Write("{\"errcode\":-12,\"errmsg\":\"寄卖单不存在\"}");
                        return;
                    }
                    DataRow r = ds.Tables[0].Rows[0];
                    status = ds.Tables[0].Columns.Contains("STATUS") && r["STATUS"] != DBNull.Value
                        ? Convert.ToInt32(r["STATUS"]) : 0;
                    flowId = ds.Tables[0].Columns.Contains("FLOW_ID") && r["FLOW_ID"] != DBNull.Value
                        ? Convert.ToString(r["FLOW_ID"]).Trim() : "";
                    failMsg = ds.Tables[0].Columns.Contains("FAIL_MSG") && r["FAIL_MSG"] != DBNull.Value
                        ? Convert.ToString(r["FAIL_MSG"]) : "";
                }
                finally
                {
                    Cn.Close();
                }

                // 2) 待签署（1）且有 FlowId 时向电子签回查最新状态
                if (status == 1 && !string.IsNullOrEmpty(flowId))
                {
                    try
                    {
                        // DescribeFlowInfo：FlowIds 为字符串数组；返回 FlowInfoInfos[0].FlowStatus
                        JObject resp = wx_jmjm_sign.InvokeEssApi("DescribeFlowInfo",
                            "{" + wx_jmjm_sign.OperatorJson() + "\"FlowIds\":[\"" + flowId + "\"]}");
                        // 企业版返回字段为 FlowDetailInfos（部分文档版本写作 FlowInfoInfos，兼容两者）
                        JArray infos = resp["FlowDetailInfos"] as JArray ?? resp["FlowInfoInfos"] as JArray;
                        essStatus = infos != null && infos.Count > 0 && infos[0]["FlowStatus"] != null
                            ? infos[0]["FlowStatus"].ToString() : "";
                        // 没取到状态：记录原始返回，排查 FlowId 是否存在/接口报错
                        if (essStatus.Length == 0)
                        {
                            essRaw = resp.ToString(Newtonsoft.Json.Formatting.None);
                            Log("DescribeFlowInfo 未取到状态 order_no=" + orderNo
                                + " flow_id=" + flowId + " 返回=" + essRaw);
                        }

                        // 签署完成：ALL（字符串枚举）/ 2已签署待生效 / 4已完成（数字枚举）
                        if (essStatus == "ALL" || essStatus == "2" || essStatus == "4")
                        {
                            // 全部签署完成（含企业自动章）
                            UpdateStatus(orderNo, 2, "");
                            status = 2;
                            failMsg = "";
                        }
                        // 终态失败：数字 3撤销/5过期/6拒签，或渠道版字符串枚举
                        else if (essStatus == "3" || essStatus == "5" || essStatus == "6"
                            || essStatus == "REJECT" || essStatus == "REJECTED" || essStatus == "CANCEL"
                            || essStatus == "CANCELED" || essStatus == "DEADLINE" || essStatus == "TIMEOUT"
                            || essStatus == "EXPIRED" || essStatus == "VOIDED")
                        {
                            UpdateStatus(orderNo, 9, "电子签流程状态：" + essStatus);
                            status = 9;
                            failMsg = "电子签流程状态：" + essStatus;
                        }
                    }
                    catch (Exception ex)
                    {
                        // 回查失败不打断轮询（保留 STATUS=1，下次再查）
                        Log("DescribeFlowInfo 回查失败 order_no=" + orderNo + " flow_id=" + flowId + " :" + ex.Message);
                    }
                }

                // 未匹配任何已知状态时记日志，便于排查电子签新增的枚举值
                if (status == 1 && essStatus.Length > 0
                    && essStatus != "ALL" && essStatus != "2" && essStatus != "4"
                    && essStatus != "0" && essStatus != "1" && essStatus != "3"
                    && essStatus != "5" && essStatus != "6"
                    && essStatus != "REJECT" && essStatus != "REJECTED" && essStatus != "CANCEL"
                    && essStatus != "CANCELED" && essStatus != "DEADLINE" && essStatus != "TIMEOUT"
                    && essStatus != "EXPIRED" && essStatus != "VOIDED")
                {
                    Log("未识别的流程状态 order_no=" + orderNo + " flow_id=" + flowId + " essStatus=" + essStatus);
                }
                context.Response.Write("{\"errcode\":0"
                    + ",\"status\":" + status
                    + ",\"ess_status\":\"" + JsonEscape(essStatus) + "\""
                    + ",\"ess_raw\":\"" + JsonEscape(essRaw.Length > 500 ? essRaw.Substring(0, 500) : essRaw) + "\""
                    + ",\"fail_msg\":\"" + JsonEscape(failMsg) + "\"}");
            }
            catch (Exception ex)
            {
                Log("异常:" + ex.ToString());
                context.Response.Write("{\"errcode\":-8,\"errmsg\":\"系统繁忙，请稍后重试\"}");
            }
        }

        private static void UpdateStatus(string orderNo, int status, string failMsg)
        {
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("v_orderno", OracleType.VarChar, 32, orderNo, "in"),
                    Cn.Db.MakeParam("v_status", OracleType.Int32, 0, status, "in"),
                    Cn.Db.MakeParam("v_failmsg", OracleType.VarChar, 500, failMsg, "in")
                };
                Cn.Db.exeSql("espos.jmjm_order_updstatus", ps);
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

        private static void Log(string msg)
        {
            try
            {
                string dir = HttpContext.Current.Server.MapPath("~/App_Data");
                if (!Directory.Exists(dir)) Directory.CreateDirectory(dir);
                File.AppendAllText(Path.Combine(dir, "wx_jmjm_status_log.txt"),
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
