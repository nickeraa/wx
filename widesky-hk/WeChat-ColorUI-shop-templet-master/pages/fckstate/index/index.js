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
    check: "true",
    check1: "true",
    index2: null,
    picker2: [],
    store: "",
    setype: "",
  },
  onLoad: function (t) {},
  onShow: function (a) {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "listkds.aspx",
        data: {},
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            console.log("sdfsdfeerw"),
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
        "/pages/fhstockssss/index/index?wlnumber=" +
        t.currentTarget.dataset.wlnumber,
    });
  },
});
