var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
    imgurl: a.globalData.cq,
    d: a.globalData.cd,
  },
  onLoad: function (a) {},
  onShow: function () {
    wx.showLoading({ title: "正在加载" }),
      setTimeout(function () {
        wx.hideLoading();
      }, 1e3),
      this.setData({ imgurl: a.globalData.cq, d: a.globalData.cd }),
      console.log("tttttttt");
  },
  qy: function () {
    wx.navigateTo({ url: "/pages/qmjpg/index?id=cq" });
  },
  back: function () {
    wx.navigateTo({ url: "/pages/reloginc/index" });
  },
});
