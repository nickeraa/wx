var a = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page({
  data: a(
    a(
      a(
        a(
          {
            StatusBar: e.globalData.StatusBar,
            CustomBar: e.globalData.CustomBar,
            phone: "",
            username: "",
            openid: "",
            userid: "",
            xf_plu: "",
            xf_name: "",
            warning: "",
            qty: "",
            vipcode: "",
            vipname: "",
            snumber: "",
            susername: "",
            result: {},
            results: {},
            acount: "",
            xf_price: "",
            xf_desci: "",
            store: "",
            storename: "",
          },
          "userid",
          ""
        ),
        "imglist",
        e.globalData.api + "images/timg.jpg"
      ),
      "imgurl",
      ""
    ),
    "view",
    "true"
  ),
  senumber: function (a) {
    wx.showLoading({ title: "正在查询", mask: !0 });
    var t = this;
    wx.request({
      url: e.globalData.api + "gt_stock_saleslist.ashx",
      data: { xf_plu: t.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          t.setData({ results: a.data, view: "" }),
          wx.hideLoading();
      },
    });
  },
  onLoad: function (a) {
    this.setData({ xf_plu: a.xf_plu, xf_desci: a.xf_desci }),
      console.log(this.data.xf_plu);
  },
  onShow: function (a) {
    wx.showLoading({ title: "正在查询", mask: !0 });
    var t = this;
    wx.request({
      url: e.globalData.api + "gt_stock_sales.ashx",
      data: { xf_plu: t.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), t.setData({ result: a.data }), wx.hideLoading();
      },
    });
  },
});
