var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
    imgurl: a.globalData.bq,
    d: a.globalData.bd,
  },
  onLoad: function (a) {},
  onShow: function () {
    wx.showLoading({ title: "正在加载" }),
      setTimeout(function () {
        wx.hideLoading();
      }, 1e3),
      this.setData({ imgurl: a.globalData.bq, d: a.globalData.bd }),
      console.log("tttttttt");
  },
  qy: function () {
    wx.navigateTo({ url: "/pages/qmjpg/index?id=bq" });
  },
  back: function () {
    wx.navigateTo({ url: "/pages/reloginb/index" });
  },
});
