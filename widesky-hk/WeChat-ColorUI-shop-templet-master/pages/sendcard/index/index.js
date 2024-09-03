var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    replu: {},
    vipcode: "",
  },
  onLoad: function (a) {},
  back: function () {
    wx.switchTab({ url: "/pages/jzb/index/index" });
  },
  onShow: function () {
    var e = this;
    wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_listnewvip.ashx",
        data: { userid: wx.getStorageSync("userid") },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0 && e.setData({ replu: a.data }),
            wx.hideLoading();
        },
      });
  },
  newvip: function () {
    wx.navigateTo({ url: "/pages/newcards/index/index" });
  },
  fx: function (a) {
    this.setData({ vipcode: a.currentTarget.dataset.xf_vipcode }),
      console.log(this.data.vipcode),
      wx.navigateToMiniProgram({
        appId: "wx187fe5b10e271c63",
        path: "/pages/card/index/index",
        extraData: {
          yguserid: wx.getStorageSync("userid"),
          vipcode: this.data.vipcode,
          d: "",
        },
        envVersion: "release",
        success: function (a) {
          console.info(a);
        },
      });
  },
});
