var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    replu: {},
    yguserid: "",
  },
  onLoad: function (a) {},
  back: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  onShow: function () {
    var t = this;
    wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_listnewvip.ashx",
        data: { userid: wx.getStorageSync("yguserid") },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0 && t.setData({ replu: a.data }),
            wx.hideLoading();
        },
      });
  },
  newvip: function () {
    wx.navigateTo({ url: "/pages/newcards/index/index" });
  },
});
