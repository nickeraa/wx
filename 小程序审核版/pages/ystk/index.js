var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
  },
  onLoad: function (a) {},
  onShow: function () {
    wx.showLoading({ title: "正在加载" }),
      setTimeout(function () {
        wx.hideLoading();
      }, 1e3);
  },
});
