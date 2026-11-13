using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Linq;
using System.Data;
using System.Data.OracleClient;
using System.Data.SqlClient;
using System.Web.UI.WebControls;
using System.Text;
using FineUIPro;

namespace FineUIPro.EmptyProjectNet40
{
    /// <summary>
    /// 寄卖合同查询：已签署寄卖单列表（签署时间范围 + 寄卖单号模糊查询 + 导出 Excel）
    /// 数据源：espos.jmjm_sign_list（见 alter_jmjm_sign_list.sql）
    /// </summary>
    public partial class jmht : PageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                // 获得 cookie
                HttpCookie cookie = Request.Cookies["userinfo"];
                if (cookie == null)
                {
                    base.Response.Redirect("Login.aspx");
                    return;
                }
                else if (cookie["grade"].ToString() != "admin" && cookie["grade"].ToString() != "qw" && cookie["grade"].ToString() != "qg")
                {
                    Response.Redirect("checkerror.aspx");
                    return;
                }
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string beginDate = DatePicker1.Text.Trim();
            string endDate = DatePicker2.Text.Trim();
            string orderNo = tbxOrderNo.Text.ToUpper().Trim();

            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_begindate", OracleType.VarChar, 10, beginDate, "in"),
                    Cn.Db.MakeParam("v_enddate", OracleType.VarChar, 10, endDate, "in"),
                    Cn.Db.MakeParam("v_orderno", OracleType.VarChar, 32, orderNo, "in")
                };
                DataSet dt = Cn.Db.exeSqlForDataSet("espos.jmjm_sign_list", ps);

                if (dt != null && dt.Tables.Count > 0 && dt.Tables[0].Rows.Count > 0)
                {
                    Grid1.Hidden = false;
                    Grid1.DataSource = dt.Tables[0];
                    Grid1.DataBind();
                    Button2.Hidden = false;
                }
                else
                {
                    Grid1.Hidden = true;
                    Grid1.DataSource = null;
                    Grid1.DataBind();
                    Button2.Hidden = true;
                    Alert.Show("没有符合条件的已签署合同记录");
                }
            }
            finally
            {
                Cn.Close();
            }
        }

        protected void Button2_Click(object sender, EventArgs e)
        {
            Response.ClearContent();
            Response.AddHeader("content-disposition", "attachment; filename=jmht.xls");
            Response.ContentType = "application/excel";
            Response.Write(GetGridTableHtml(Grid1));
            Response.End();
        }

        private string GetGridTableHtml(Grid grid)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("<table cellspacing=\"0\" rules=\"all\" border=\"1\" style=\"border-collapse:collapse;\">");
            sb.Append("<tr>");
            foreach (GridColumn column in grid.Columns)
            {
                sb.AppendFormat("<td>{0}</td>", column.HeaderText);
            }
            sb.Append("</tr>");
            foreach (GridRow row in grid.Rows)
            {
                sb.Append("<tr>");
                foreach (object value in row.Values)
                {
                    string html = value == null ? "" : value.ToString();
                    // 处理超链接列（取链接文本，避免HTML标签进Excel）
                    if (html.Contains("<a "))
                    {
                        int s = html.IndexOf('>');
                        int t = html.LastIndexOf('<');
                        if (s >= 0 && t > s) html = html.Substring(s + 1, t - s - 1);
                    }
                    // 处理CheckBox
                    if (html.Contains("box-grid-static-checkbox"))
                    {
                        if (html.Contains("box-grid-static-checkbox-uncheck"))
                        {
                            html = "×";
                        }
                        else
                        {
                            html = "√";
                        }
                    }
                    // 处理图片
                    if (html.Contains("<img"))
                    {
                        string prefix = Request.Url.AbsoluteUri.Replace(Request.Url.AbsolutePath, "");
                        html = html.Replace("src=\"", "src=\"" + prefix);
                    }
                    sb.AppendFormat("<td>{0}</td>", html);
                }
                sb.Append("</tr>");
            }
            sb.Append("</table>");
            return sb.ToString();
        }
    }
}
