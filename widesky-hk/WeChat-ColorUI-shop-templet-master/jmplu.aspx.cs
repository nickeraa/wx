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
    /// 寄卖货号录入：按寄卖单号查货品明细，行内输入系统货号后保存
    /// 数据源：espos.jmjm_item_list（查明细）、espos.jmjm_item_updplu（保存，见 alter_jmjm_item_plu.sql）
    /// </summary>
    public partial class jmplu : PageBase
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

                // 支持 jmht.aspx?orderno=xxx 跳转带入
                string orderNo = Request["orderno"];
                if (!string.IsNullOrEmpty(orderNo))
                {
                    tbxOrderNo.Text = orderNo.Trim().ToUpper();
                    LoadItems(tbxOrderNo.Text);
                }
            }
        }

        private void LoadItems(string orderNo)
        {
            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("mycs", OracleType.Cursor, null, null, "out"),
                    Cn.Db.MakeParam("v_orderno", OracleType.VarChar, 32, orderNo, "in")
                };
                DataSet dt = Cn.Db.exeSqlForDataSet("espos.jmjm_item_list", ps);

                if (dt != null && dt.Tables.Count > 0 && dt.Tables[0].Rows.Count > 0)
                {
                    Grid1.Hidden = false;
                    Grid1.DataSource = dt.Tables[0];
                    Grid1.DataBind();
                    Button2.Hidden = false;
                    // 录入行复位（保存后重新查询即刷新）
                    tbxSeq.Text = "1";
                    tbxPluInput.Text = "";
                }
                else
                {
                    Grid1.Hidden = true;
                    Grid1.DataSource = null;
                    Grid1.DataBind();
                    Button2.Hidden = true;
                    Alert.Show("未找到该寄卖单的货品明细，请核对单号");
                }
            }
            finally
            {
                Cn.Close();
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            LoadItems(tbxOrderNo.Text.ToUpper().Trim());
        }

        // 保存货号（按下方录入行：货品序号 + 货号）
        protected void Button2_Click(object sender, EventArgs e)
        {
            string orderNo = tbxOrderNo.Text.ToUpper().Trim();
            // 多件货品：货号逗号分隔（一物一码，一件一个码）
            string plu = string.Join(",", tbxPluInput.Text
                .Replace('，', ',')
                .Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(s => s.Trim())
                .Where(s => s.Length > 0));
            if (plu.Length == 0)
            {
                Alert.Show("请输入货品货号");
                return;
            }
            if (plu.Length > 200) plu = plu.Substring(0, 200);

            int seq;
            if (!int.TryParse(tbxSeq.Text.Trim(), out seq) || seq <= 0)
            {
                Alert.Show("货品序号应为大于0的数字");
                return;
            }

            oraclelink.Con Cn = new oraclelink.Con();
            try
            {
                Cn.Open();
                OracleParameter[] ps = {
                    Cn.Db.MakeParam("v_orderno", OracleType.VarChar, 32, orderNo, "in"),
                    Cn.Db.MakeParam("v_seq", OracleType.Int32, 0, seq, "in"),
                    Cn.Db.MakeParam("v_plu", OracleType.VarChar, 200, plu, "in")
                };
                Cn.Db.exeSql("espos.jmjm_item_updplu", ps);
            }
            finally
            {
                Cn.Close();
            }
            int codeCnt = plu.Split(',').Length;
            string tip = "已保存：第" + seq + "件货品 → 货号 " + plu;
            if (codeCnt > 1) tip += "（" + codeCnt + "个货号）";
            Alert.Show(tip);
            LoadItems(orderNo);   // 重新查询刷新当前货号显示
        }
    }
}
