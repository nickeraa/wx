var n = getApp();
Page({
  data: {
    StatusBar: n.globalData.StatusBar,
    CustomBar: n.globalData.CustomBar,
    bgimages: n.globalData.imgUrl,
    phone: "",
    username: "",
    openid: "",
    userid: "",
    warning: "",
    index2: null,
    picker2: [],
    store: "",
    result: {},
    acount: "",
    sfimg: n.globalData.api + "bgimg/sf.png",
    zyimg: n.globalData.api + "bgimg/zy.png",
    ljimg: n.globalData.api + "bgimg/lj.png",
    rgimg: n.globalData.api + "bgimg/rg.png",
    dyimg: n.globalData.api + "bgimg/dy.png",
    gqimg: n.globalData.api + "bgimg/gq.png",
    tzimg: n.globalData.api + "bgimg/tz.jpg",
  },
  onLoad: function (n) {},
  gz: function () {
    wx.request({
      url: n.globalData.api + "wx_segzuser.ashx",
      data: { userid: wx.getStorageSync("userid") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (n) {
        console.log(n),
          0 == n.data.length &&
            wx.showModal({
              title: "提示",
              content:
                "您需要关注公众号才可以收到微信提示的通知信息，请不要关闭窗口",
              showCancel: !1,
              success: function (n) {
                n.confirm && wx.navigateTo({ url: "/pages/wxgz/index/index" });
              },
            });
      },
      complete: function () {},
    });
  },
  khsq: function (n) {
    wx.navigateTo({ url: "/pages/sqnumber/index/index" });
  },
  sevip: function (n) {
    wx.navigateTo({ url: "/pages/jloginss/index" });
  },
  gzmessage: function () {
    wx.showModal({
      title: "提示",
      content: "您需要关注公众号才可以收到微信提示的通知信息，请不要关闭窗口",
      showCancel: !1,
      success: function (n) {
        n.confirm && wx.navigateTo({ url: "/pages/wxcz/index/index" });
      },
    });
  },
  khdj: function () {
    wx.navigateTo({ url: "/pages/senumber/index/index" });
  },
  zc: function () {
    wx.navigateTo({ url: "/pages/zcznumber/index/index" });
  },
  khcx: function () {
    wx.navigateTo({ url: "/pages/lcstock/index/index" });
  },
  qstock: function () {
    wx.navigateTo({ url: "/pages/qstock/index/index" });
  },
  qgs: function () {
    wx.navigateTo({ url: "/pages/qglogins/index" });
  },
  qg: function () {
    wx.navigateTo({ url: "/pages/qglogin/index" });
  },
  jg: function () {
    wx.navigateTo({ url: "/pages/jlogin/index" });
  },
  state: function () {
    wx.navigateTo({ url: "/pages/stockstate/index/index" });
  },
  bdqw: function () {
    wx.navigateTo({ url: "/pages/jlogins/index" });
  },
  fstate: function () {
    wx.navigateTo({ url: "/pages/stockstatess/index/index" });
  },
  wstate: function () {
    wx.navigateTo({ url: "/pages/wstockstate/index/index" });
  },
  onShow: function (n) {
    if (!wx.getStorageSync("userid"))
      return (
        wx.showModal({
          title: "提示",
          content: "请您验证用户，必须是公司员工才能操作",
          showCancel: !1,
          success: function (n) {
            n.confirm && wx.navigateTo({ url: "/pages/coupon/index/index" });
          },
        }),
        !1
      );
    this.setData({
      openid: wx.getStorageSync("openid"),
      username: wx.getStorageSync("username"),
      phone: wx.getStorageSync("phone"),
    }),
      console.log(wx.getStorageSync("storename")),
      this.gz();
  },
});
