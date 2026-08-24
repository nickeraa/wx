var e = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onGetPhoneNumbergm: function (a) {
    if (this.data.stop) return;
    if (a.detail.errMsg != "getPhoneNumber:ok") {
      console.log("getPhoneNumber fail:", a.detail.errMsg);
      var msg = a.detail.errMsg.indexOf("user deny") >= 0 || a.detail.errMsg.indexOf("cancel") >= 0
        ? "请选择手机号，才能购买喔"
        : "授权太频繁或已受限，请稍后再试";
      wx.showToast({ title: msg, icon: "none", duration: 2000 });
      return;
    }
    wx.showLoading({ title: '连接中...' });
    this.setData({ stop: true });
    var t = this;
    wx.login({
      success: function (s) {
        s.code ?
          wx.request({
              url: i.globalData.api + "wx_getphone.ashx",
              data: { code: s.code },
              header: { "content-type": "application/json" },
              timeout: 10000,
              success: function (i) {
                if (typeof i.data !== "string" || i.data.indexOf(",") < 0) {
                  wx.hideLoading();
                  t.setData({ stop: false });
                  wx.showToast({ title: "授权数据异常，请重试", icon: "none", duration: 2000 });
                  return;
                }
                var s = i.data.split(",");
                // 保存 openid（与点击关注/收藏流程一致），供下单接口使用
                if (!wx.getStorageSync('openid') && s[0]) {
                  wx.setStorageSync('openid', s[0]);
                }
                var d = s[1];
                var n = a.detail.encryptedData,
                  h = a.detail.iv;
                wx.hideLoading();
                wx.checkSession({
                  success: function () {
                    t.deciyptiongm(d, n, h);
                  },
                  fail: function () {
                    wx.showToast({ title: "登录已过期，请重试", icon: "none", duration: 2000 });
                    t.setData({ stop: false });
                  },
                });
              },
              fail: function () {
                wx.hideLoading();
                t.setData({ stop: false });
                wx.showToast({ title: "获取授权失败，请重试", icon: "none", duration: 2000 });
              },
            }) :
          (wx.hideLoading(), t.setData({ stop: false }), wx.showToast({ title: "获取授权失败，请重试", icon: "none", duration: 2000 }));
      },
      fail: function () {
        wx.hideLoading();
        t.setData({ stop: false });
        wx.showToast({ title: "登录失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  deciyptiongm: function (a, t, s) {
    wx.showLoading({ title: '加载中...' });
    var e = this;
    wx.request({
        url: i.globalData.api + "wx_getvipphone.ashx",
        data: {
          sessionID: a,
          encryptedData: t,
          iv: s
        },
        header: {
          "content-type": "application/json"
        },
        timeout: 10000,
        success: function (a) {
          if (a.data && a.data.phoneNumber) {
            console.warn("wxuserid", a.data.phoneNumber);
            wx.setStorageSync("wxuserid", a.data.phoneNumber);
            e.setData({ wxuserid: a.data.phoneNumber, stop: false });
            wx.hideLoading();
            e.gwjs();
          } else {
            wx.hideLoading();
            e.setData({ stop: false });
            wx.showToast({ title: "获取手机号失败，请重试", icon: "none", duration: 2000 });
          }
        },
        fail: function () {
          wx.hideLoading();
          e.setData({ stop: false });
          wx.showToast({ title: "加载失败，请重试", icon: "none", duration: 2000 });
        },
      });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})