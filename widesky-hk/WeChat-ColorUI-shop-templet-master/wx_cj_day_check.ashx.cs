using System;
using System.Web;
using FineUIPro.EmptyProjectNet40.App_Code;

namespace FineUIPro.EmptyProjectNet40
{
    /// <summary>
    /// 节日抽奖：公开的截止日期查询接口（无 key，只读，供小程序点击按钮时前置判断）
    /// 调用：wx_cj_day_check.ashx
    /// 返回：{"errcode":0,"is_expired":true,"end_date":"2026-09-01 00:00:00","errmsg":"节日抽奖活动已结束（截止 ...），谢谢参与！"}
    ///       {"errcode":0,"is_expired":false,"end_date":"","errmsg":""}   ← 未配置截止日期（end_date 为空表示永不截止）
    /// 说明：与 wx_cj_day_set.ashx（管理接口，需 key）不同，本接口只读、无参数、无写操作，
    ///       前端 jiangjr 抽奖页点击"点击抽奖"按钮时最先调用，已截止则直接弹提示拦截。
    /// </summary>
    public class wx_cj_day_check : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json; charset=utf-8";
            try
            {
                bool expired = wx_cj_day_ctrl.IsExpired();
                DateTime end = wx_cj_day_ctrl.GetEndDate();
                // 未配置截止日期（GetEndDate 返回 DateTime.MaxValue）时不返回日期，避免前端误展示 9999
                bool hasDate = end != DateTime.MaxValue;
                string endStr = hasDate ? end.ToString("yyyy-MM-dd HH:mm:ss") : "";
                string msg = expired ? wx_cj_day_ctrl.ExpiredJson("抽奖") : "";

                // expired 时把 errmsg 从拦截 JSON 中取出来单独返回，方便前端直接展示
                string errmsg = "";
                if (expired)
                {
                    // ExpiredJson 返回 {"errcode":-20,"errmsg":"..."}，此处复用其文案
                    errmsg = "节日抽奖活动已结束（截止 " + endStr + "），谢谢参与！";
                }

                context.Response.Write("{\"errcode\":0,\"is_expired\":" + (expired ? "true" : "false")
                    + ",\"end_date\":\"" + endStr + "\",\"errmsg\":\"" + (errmsg == "" ? "" : errmsg.Replace("\"", "'")) + "\"}");
            }
            catch (Exception ex)
            {
                context.Response.Write("{\"errcode\":-1,\"is_expired\":false,\"end_date\":\"\",\"errmsg\":\""
                    + (ex.Message ?? "").Replace("\"", "'").Replace("\\", "/") + "\"}");
            }
        }

        public bool IsReusable
        {
            get { return false; }
        }
    }
}
