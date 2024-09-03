var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
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
    console.log(wx.getStorageSync("juserid"));
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_listppstockss.ashx",
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
  qznumber: function (t) {
    wx.navigateTo({
      url:
        "/pages/jlstockss/index/index?wlnumber=" +
        t.currentTarget.dataset.wlnumber,
    });
  },
});
