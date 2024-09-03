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
    store: "",
  },
  onLoad: function (t) {
    this.setData({ store: t.store });
  },
  onShow: function (a) {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_liststock.ashx",
        data: { store: e.data.store },
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
        "/pages/listjzb/index/index?znumber=" + t.currentTarget.dataset.znumber,
    });
  },
  delznumber: function (t) {
    wx.redirectTo({
      url:
        "/pages/qglogin/index?id=1&znumber=" + t.currentTarget.dataset.znumber,
    });
  },
});
