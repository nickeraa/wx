var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
  },
  goback: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
});
