var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
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
    check: "true",
    check1: "true",
    index2: null,
    picker2: [],
    store: "",
    setype: "",
  },
  onLoad: function (a) {},
  onShow: function (t) {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_customer_wckstate.ashx",
        data: {},
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? e.setData({ rejob: a.data })
              : e.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  getznumber: function (a) {
    wx.navigateTo({
      url:
        "/pages/allsejzbs/index/index?znumber=" +
        a.currentTarget.dataset.znumber,
    });
  },
});
