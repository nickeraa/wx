var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    imgurld: t.globalData.api + "Images/weixin/tpic.png",
    comuserid: "",
    compassword: "",
    openid: "",
    session_key: "",
    id: "",
    znumber: "",
  },
  getcomuseridValue: function (t) {
    this.setData({ comuserid: t.detail.value });
  },
  getcompasswordValue: function (t) {
    this.setData({ compassword: t.detail.value });
  },
  onLoad: function (t) {
    t.id && this.setData({ id: t.id, znumber: t.znumber });
  },
  onShow: function () {},
  cklogins: function () {
    if (0 == this.checklogin()) return !1;
    wx.showLoading({ title: "正在检测登录", mask: !0 });
    wx.request({
      url: t.globalData.api + "wx_customer_qglogin.ashx",
      data: { userid: this.data.comuserid, password: this.data.compassword },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          1 == t.data.length
            ? (wx.setStorageSync("qguserid", t.data[0].XF_STAFFCODE),
              wx.hideLoading(),
              wx.showModal({
                title: "提示",
                content: "登录成功！",
                showCancel: !1,
                success: function (t) {
                  t.confirm &&
                    wx.redirectTo({ url: "/pages/shqstocks/index/index" });
                },
              }))
            : (wx.hideLoading(),
              wx.showModal({
                title: "提示",
                content: "登录ID或密码不正确！",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              }));
      },
      complete: function () {},
    });
  },
  delznumber: function () {
    wx.request({
      url: t.globalData.api + "wx_customer_delznumber.ashx",
      data: { znumber: this.data.znumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" == t.data
            ? wx.showModal({
                title: "提示",
                content: "删除成功！",
                showCancel: !1,
                success: function (t) {
                  t.confirm &&
                    wx.redirectTo({ url: "/pages/pscar/index/index" });
                },
              })
            : wx.showModal({
                title: "提示",
                content: "数据错误！",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              });
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
          success: function (t) {
            t.confirm;
          },
        }),
        !1)
      : "" == this.data.compassword
      ? (wx.showModal({
          title: "提示",
          content: "登录密码不能为空！",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1)
      : this.data.compassword.indexOf("=") >= 0
      ? (wx.showModal({
          title: "提示",
          content: "IP已记录，存在非法字符！",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1)
      : void 0;
  },
});
