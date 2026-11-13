<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jmplu.aspx.cs" Inherits="FineUIPro.EmptyProjectNet40.jmplu" %>

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
            width: 1000px;
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
                        <f:TextBox ID="tbxOrderNo" runat="server" Label="寄卖单号" ShowRedStar="true" Required="true" EmptyText="寄卖单号不能为空（如 JM261113000001）">
                        </f:TextBox>
                        <f:Button ID="Button1" runat="server" Text="查询货品明细" OnClick="Button1_Click"></f:Button>
                    </Items>
                </f:FormRow>

                <f:FormRow>
                    <Items>
                        <f:Grid ID="Grid1" IsFluid="true" CssClass="blockpanel" ShowBorder="true" ShowHeader="true" Title="货品明细" runat="server" EnableCollapse="false" Hidden="true"
                            DataKeyNames="ORDER_NO,SEQ">
                            <Columns>
                                <f:RowNumberField />
                                <f:BoundField DataField="SEQ" HeaderText="序号" Width="60px" />
                                <f:BoundField DataField="GOODS_NAME" HeaderText="货品名称" Width="260px" />
                                <f:BoundField DataField="PRICE" HeaderText="寄售单价(元)" Width="110px" />
                                <f:BoundField DataField="QTY" HeaderText="数量" Width="70px" />
                                <f:BoundField DataField="PLU" HeaderText="当前货号" Width="160px" />
                            </Columns>
                        </f:Grid>
                    </Items>
                </f:FormRow>

                <f:FormRow>
                    <Items>
                        <f:TextBox ID="tbxSeq" runat="server" Label="货品序号" Text="1" EmptyText="明细表中的序号，默认第1件">
                        </f:TextBox>
                        <f:TextBox ID="tbxPluInput" runat="server" Label="货品货号" EmptyText="一件一个货号；数量多件用英文逗号分隔，如 8001,8002">
                        </f:TextBox>
                        <f:Button ID="Button2" runat="server" Text="保存货号" OnClick="Button2_Click" Hidden="true"></f:Button>
                    </Items>
                </f:FormRow>
            </Rows>
        </f:Form>
    </form>
</body>
</html>
