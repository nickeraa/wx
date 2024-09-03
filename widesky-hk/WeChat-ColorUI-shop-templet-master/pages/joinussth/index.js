var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    TabbarBot: a.globalData.tabbar_bottom,
    pict: a.globalData.hkimgUrl,
    pnumber: "",
    qty: "",
    xf_desci: "",
    xf_plu: "",
    tag: "",
    resultdt: {},
  },
  onLoad: function (a) {
    this.setData({ pnumber: a.id }), console.log(this.data.pnumber);
  },
  goback: function () {
    wx.redirectTo({ url: "/pages/atdxs/index/index" });
  },
  onShow: function (t) {
    if (!wx.getStorageSync("userid"))
      return wx.navigateTo({ url: "/pages/coupon/index/index" }), !1;
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_search_prove.ashx",
      data: { pnumber: e.data.pnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          e.setData({
            resultdt: a.data,
            xf_desci: a.data[0].XF_DESCI,
            qty: a.data[0].QTY,
            xf_plu: a.data[0].XF_PLU,
          });
      },
    });
  },
  shuaxin: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_search_prove.ashx",
      data: { pnumber: t.data.pnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          t.setData({
            resultdt: a.data,
            tag: a.data[0].TAG,
            qty: a.data[0].QTY,
          }),
          "1" != t.data.tag
            ? wx.showModal({
                title: "提示",
                content: "配额状态超时或发生改变，无法退货，请刷新后再操作",
                showCancel: !1,
                success: function (a) {
                  a.confirm &&
                    wx.redirectTo({ url: "/pages/atdxs/index/index" });
                },
              })
            : t.checkitem();
      },
    });
  },
  checkitem: function (t) {
    wx.request({
      url: a.globalData.api + "wx_tdpe.ashx",
      data: {
        pnumber: this.data.pnumber,
        userid: wx.getStorageSync("userid"),
        xf_plu: this.data.xf_plu,
        qty: this.data.qty,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" == a.data &&
            wx.showModal({
              title: "提示",
              content: "已退配额",
              showCancel: !1,
              success: function (a) {
                a.confirm && wx.redirectTo({ url: "/pages/atdxs/index/index" });
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
