var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    TabbarBot: t.globalData.tabbar_bottom,
    pict: t.globalData.hkimgUrl,
    pnumber: "",
    qty: "",
    xf_desci: "",
    xf_plu: "",
    tag: "",
    resultdt: {},
  },
  onLoad: function (t) {
    this.setData({ pnumber: t.id }), console.log(this.data.pnumber);
  },
  goback: function () {
    wx.redirectTo({ url: "/pages/qxtp/index/index" });
  },
  onShow: function (a) {
    if (!wx.getStorageSync("userid"))
      return wx.navigateTo({ url: "/pages/coupon/index/index" }), !1;
    var e = this;
    wx.request({
      url: t.globalData.api + "wx_search_prove.ashx",
      data: { pnumber: e.data.pnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          e.setData({
            resultdt: t.data,
            xf_desci: t.data[0].XF_DESCI,
            qty: t.data[0].QTY,
            xf_plu: t.data[0].XF_PLU,
          });
      },
    });
  },
  shuaxin: function () {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_search_prove.ashx",
      data: { pnumber: a.data.pnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          a.setData({
            resultdt: t.data,
            tag: t.data[0].TAG,
            qty: t.data[0].QTY,
          }),
          "9" != a.data.tag&&"8" != a.data.tag
            ? wx.showModal({
                title: "提示",
                content: "配额状态超时或发生改变，无法取消特批，请刷新后再操作",
                showCancel: !1,
                success: function (t) {
                  t.confirm &&
                    wx.redirectTo({ url: "/pages/qxtp/index/index" });
                },
              })
            : a.checkitem();
      },
    });
  },
  checkitem: function (a) {
    wx.request({
      url: t.globalData.api + "wx_qxtppe.ashx",
      data: {
        pnumber: this.data.pnumber,
        userid: wx.getStorageSync("userid"),
        xf_plu: this.data.xf_plu,
        qty: this.data.qty,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" == t.data &&
            wx.showModal({
              title: "提示",
              content: "已取消特批配额",
              showCancel: !1,
              success: function (t) {
                t.confirm && wx.redirectTo({ url: "/pages/qxtp/index/index" });
              },
            });
      },
      fail: function () {
        console.log("submit fail");
      },
      complete: function () {},
    });
  },
});
