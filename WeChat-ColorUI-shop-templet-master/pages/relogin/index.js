var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
    select: "",
  },
  onLoad: function (a) {},
  onShow: function () {},
  checkboxChange: function (a) {
    console.log("checkbox发送选择改变，携带值为", a.detail.value),
      this.setData({ select: a.detail.value });
  },
  qy: function () {
    if ("" == this.data.select)
      return (
        wx.showToast({
          title: "请勾选阅读隐私条款",
          icon: "none",
          duration: 1e3,
        }),
        !1
      );
    wx.navigateTo({ url: "/pages/qyxy/index" });
  },
  listys: function () {
    wx.navigateTo({ url: "/pages/ystk/index" });
  },
});
