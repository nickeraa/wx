var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
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
  onLoad: function (a) {},
  listtp: function (a) {
    wx.navigateTo({
      url:
        "/pages/tpshlists/index/index?pnumber=" +
        a.currentTarget.dataset.pnumber,
    });
  },
  onShow: function (t) {
    console.log(wx.getStorageSync("userid"));
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_tpshs.ashx",
        data: { userid: wx.getStorageSync("userid") },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? e.setData({ rejob: a.data, flag: !0 })
              : e.setData({ rejob: null, flag: !1 }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
