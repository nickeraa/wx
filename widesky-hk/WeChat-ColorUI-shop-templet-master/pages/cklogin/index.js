var o = getApp();
Page({
  data: {
    StatusBar: o.globalData.StatusBar,
    CustomBar: o.globalData.CustomBar,
    imgurld: o.globalData.api + "Images/weixin/tpic.png",
    comuserid: "",
    compassword: "",
    openid: "",
    session_key: "",
  },
  getcomuseridValue: function (o) {
    this.setData({ comuserid: o.detail.value });
  },
  getcompasswordValue: function (o) {
    this.setData({ compassword: o.detail.value });
  },
  onLoad: function (o) {},
  goback: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  onShow: function () {},
  cklogins: function () {
    if (0 == this.checklogin()) return !1;
    wx.showLoading({ title: "正在检测登录", mask: !0 });
    wx.request({
      url: o.globalData.api + "wx_customer_cklogin.ashx",
      data: { userid: this.data.comuserid, password: this.data.compassword },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (o) {
        console.log(o),
          1 == o.data.length
            ? (wx.setStorageSync("ckuserid", o.data[0].XF_STAFFCODE),
              wx.showModal({
                title: "提示",
                content: "登录成功！",
                showCancel: !1,
                success: function (o) {
                  o.confirm &&
                    wx.navigateTo({ url: "/pages/store/index/index" });
                },
              }))
            : wx.showModal({
                title: "提示",
                content: "登录ID或密码不正确！",
                showCancel: !1,
                success: function (o) {
                  o.confirm;
                },
              }),
          wx.hideLoading();
      },
      complete: function () {},
    });
  },
  checklogin: function () {
    return "" == this.data.comuserid
      ? (wx.showModal({
          title: "提示",
          content: "登录ID不能为空！",
          showCancel: !1,
          success: function (o) {
            o.confirm;
          },
        }),
        !1)
      : "" == this.data.compassword
      ? (wx.showModal({
          title: "提示",
          content: "登录密码不能为空！",
          showCancel: !1,
          success: function (o) {
            o.confirm;
          },
        }),
        !1)
      : this.data.compassword.indexOf("=") >= 0
      ? (wx.showModal({
          title: "提示",
          content: "IP已记录，存在非法字符！",
          showCancel: !1,
          success: function (o) {
            o.confirm;
          },
        }),
        !1)
      : void 0;
  },
});
