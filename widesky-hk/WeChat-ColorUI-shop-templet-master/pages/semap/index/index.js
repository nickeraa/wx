var e,
  a = getApp(),
  t = require("../../libs/qqmap-wx-jssdk.js");
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
    TabCur: 0,
    scrollLeft: 0,
    location: "",
    address: "",
    name: "",
  },
  onLoad: function (a) {
    (e = new t({ key: "B5QBZ-SYKKN-22JF2-SBYNV-G5L67-F7BYX" })),
      this.setData({ location: a.location }),
      console.log(this.data.location);
    var s = this.data.location.split(",");
    console.log(s[0]), console.log(s[1]);
    var o = this;
    e.reverseGeocoder({
      location: { latitude: Number(s[0]), longitude: Number(s[1]) },
      success: function (e) {
        console.log(e.result.address),
          console.log(e.result),
          console.log(
            e.result.ad_info.district +
              e.result.address_reference.business_area.title +
              e.result.address_reference.landmark_l2.title
          ),
          o.setData({
            address: e.result.address,
            name:
              e.result.ad_info.district +
              e.result.address_reference.business_area.title +
              e.result.address_reference.landmark_l2.title,
          }),
          wx.openLocation({
            latitude: Number(s[0]),
            longitude: Number(s[1]),
            scale: 28,
            name: o.data.name,
            address: o.data.address,
            success: function (e) {
              console.log(e);
            },
            fail: function (e) {
              wx.showToast({ title: "调用地图失败，请返回重试" });
            },
          });
      },
      fail: function (e) {
        console.log("获取当前地址失败");
      },
    });
  },
  back: function () {
    wx.redirectTo({ url: "/pages/shstate/index/index" });
  },
  onShow: function (e) {},
});
