var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    rest: {},
  },
  onLoad: function (a) {},
  back: function () {
    wx.switchTab({ url: "/pages/jzb/index/index" });
  },
  selectmap: function (a) {
    wx.navigateTo({
      url:
        "/pages/semap/index/index?location=" + a.currentTarget.dataset.location,
    });
  },
  onShow: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_sesjbody.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), e.setData({ rest: a.data });
      },
    });
  },
});
