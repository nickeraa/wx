var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: e(
    e(
      e(
        e(
          {
            StatusBar: t.globalData.StatusBar,
            CustomBar: t.globalData.CustomBar,
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
            acount: "",
            xf_price: "",
            index2: null,
            picker2: [],
            store: "",
            storename: "",
          },
          "userid",
          ""
        ),
        "imglist",
        t.globalData.api + "images/timg.jpg"
      ),
      "imgurl",
      ""
    ),
    "view",
    "true"
  ),
  getsnumber: function (e) {
    this.setData({ snumber: e.detail.value }), console.log(this.data.snumber);
  },
  checkinput: function (e) {
    "" == this.data.snumber
      ? wx.showToast({
          title: "请输入货品名称或货号查询",
          icon: "none",
          duration: 1e3,
        })
      : this.senumber();
  },
  senumber: function (e) {
    wx.showLoading({ title: "正在查询", mask: !0 });
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_hksystem_seprice.ashx",
      data: { snumber: a.data.snumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          0 == e.data.length
            ? wx.showModal({
                title: "提示",
                content: "货品名称或货号不存在",
                showCancel: !1,
                success: function (e) {
                  e.confirm && a.setData({ view: "true" });
                },
              })
            : a.setData({ result: e.data, view: "" }),
          wx.hideLoading();
      },
    });
  },
  sesnumber: function (e) {
    console.log(e.currentTarget.dataset.xf_plu),
      console.log(e.target.id),
      wx.navigateTo({
        url:
          "/pages/seprices/index/index?xf_plu=" +
          e.currentTarget.dataset.xf_plu +
          "&xf_desci=" +
          e.target.id,
      });
  },
  onLoad: function (e) {},
  onShow: function (e) {},
});
