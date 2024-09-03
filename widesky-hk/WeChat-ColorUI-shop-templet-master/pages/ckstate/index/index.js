var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    TabbarBot: t.globalData.tabbar_bottom,
    TabCur: 0,
    scrollLeft: 0,
    rejob: {},
    xf_store: "",
    xf_plu: "",
    xf_qty: "",
    vipcode: "",
    snumber: "",
    susername: "",
    entime: "",
    userid: "",
  },
  onLoad: function (t) {},
  onShow: function (a) {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_ckstate.ashx",
        data: {},
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            t.data.length > 0
              ? e.setData({ rejob: t.data })
              : e.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  getznumber: function (t) {
    wx.navigateTo({
      url:
        "/pages/listall/index/index?znumber=" + t.currentTarget.dataset.znumber,
    });
  },
  ccznumber: function (a) {
    var e = this;
    wx.request({
      url: t.globalData.api + "wx_customer_cznumber.ashx",
      data: { znumber: a.currentTarget.dataset.znumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" == t.data
            ? e.onShow()
            : wx.showModal({
                title: "提示",
                content: "数据错误！",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              });
      },
      complete: function () {},
    });
  },
});
