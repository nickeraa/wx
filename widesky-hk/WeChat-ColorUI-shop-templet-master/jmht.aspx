<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jmht.aspx.cs" Inherits="FineUIPro.EmptyProjectNet40.jmht" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title></title>
    <style>
        .customlabel span {
            color: red;
            font-weight: bold;
        }
        #form1 {
            height: 424px;
            width: 1225px;
        }
        /* 单元格行高调高 */
        .tall-grid .x-grid-cell-inner {
            padding-top: 10px;
            padding-bottom: 10px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <f:PageManager ID="PageManager1" runat="server" />

        <f:Form ID="Form3" runat="server" BodyPadding="10px" ShowBorder="true" ShowHeader="false" Title="">
            <Rows>
                <f:FormRow>
                    <Items>
                        <f:DatePicker ID="DatePicker1" runat="server" Label="签署时间">
                        </f:DatePicker>
                        <f:DatePicker ID="DatePicker2" runat="server" Label="至">
                        </f:DatePicker>
                    </Items>
                </f:FormRow>

                <f:FormRow>
                    <Items>
                        <f:TextBox ID="tbxOrderNo" runat="server" Label="寄卖单号" EmptyText="选填，支持模糊查询" EnableBlurEvent="true" OnBlur="Button1_Click">
                        </f:TextBox>
                        <f:Button ID="Button1" runat="server" Text="读取报表" OnClick="Button1_Click"></f:Button>
                    </Items>
                </f:FormRow>

                <f:FormRow>
                    <Items>
                        <f:Grid ID="Grid1" IsFluid="true" CssClass="blockpanel tall-grid" ShowBorder="true" ShowHeader="true" Title="已签署寄卖合同列表" runat="server" EnableCollapse="false" Hidden="true"
                            DataKeyNames="ORDER_NO">
                            <Columns>
                                <f:RowNumberField />
                                <f:HyperLinkField DataTextField="ORDER_NO" DataNavigateUrlFields="SIGN_URL" DataNavigateUrlFormatString="{0}" HeaderText="寄卖单号(点击查看合同)" Width="180px" Target="_blank" />
                                <f:BoundField DataField="SHOP_NO" HeaderText="店铺编号" Width="80px" />
                                <f:BoundField DataField="STAFF_ID" HeaderText="开单员工" Width="100px" />
                                <f:BoundField DataField="CUST_NAME" HeaderText="客户姓名" Width="100px" />
                                <f:BoundField DataField="GOODS_NAME" HeaderText="货品名称" Width="220px" />
                                <f:BoundField DataField="PLU" HeaderText="货品货号" Width="160px" />
                                <f:BoundField DataField="PRICE" HeaderText="寄售单价(元)" Width="110px" />
                                <f:BoundField DataField="QTY" HeaderText="数量" Width="70px" />
                                <f:BoundField DataField="CREATE_TIME" DataFormatString="{0}" HeaderText="开单时间" Width="140px" />
                                <f:BoundField DataField="SIGN_TIME" DataFormatString="{0}" HeaderText="签署时间" Width="140px" />
                            </Columns>
                        </f:Grid>
                    </Items>
                </f:FormRow>

                <f:FormRow>
                    <Items>
                        <f:Button ID="Button2" runat="server" Text="导出EXCEL表" EnableAjax="false" DisableControlBeforePostBack="false" OnClick="Button2_Click" Hidden="true"></f:Button>
                    </Items>
                </f:FormRow>
            </Rows>
        </f:Form>
    </form>
</body>
</html>
