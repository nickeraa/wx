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
    flag: !0,
  },
  onLoad: function (t) {},
  onShow: function (a) {
    console.log(wx.getStorageSync("tpuserid"));
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_tpsh.ashx",
        data: { userid: wx.getStorageSync("tpuserid") },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            t.data.length > 0
              ? e.setData({ rejob: t.data, flag: !0 })
              : e.setData({ rejob: null, flag: !1 }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  sh: function (t) {
    wx.redirectTo({
      url:
        "/pages/tpshlist/index/index?pnumber=" +
        t.currentTarget.dataset.pnumber,
    });
  },
});
