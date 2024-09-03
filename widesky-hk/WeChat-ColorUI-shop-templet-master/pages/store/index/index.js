var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    bgimages: a.globalData.imgUrl,
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
    sfimg: a.globalData.api + "bgimg/sf.png",
    zyimg: a.globalData.api + "bgimg/zy.png",
    ljimg: a.globalData.api + "bgimg/lj.png",
    rgimg: a.globalData.api + "bgimg/rg.png",
    dyimg: a.globalData.api + "bgimg/dy.png",
    tzimg: a.globalData.api + "bgimg/tz.jpg",
    gqimg: a.globalData.api + "bgimg/gq.png",
  },
  onLoad: function (a) {},
  cxhp: function () {
    wx.navigateTo({ url: "/pages/cxjzb/index/index" });
  },
  khdj: function () {
    wx.navigateTo({ url: "/pages/ckjzb/index/index" });
  },
  fhs: function () {
    wx.navigateTo({ url: "/pages/fhjzbs/index/index" });
  },
  fhqs: function () {
    wx.navigateTo({ url: "/pages/fhqs/index/index" });
  },
  khcx: function () {
    wx.navigateTo({ url: "/pages/dpjzb/index/index" });
  },
  fh: function () {
    wx.navigateTo({ url: "/pages/fhjzb/index/index" });
  },
  fstate: function () {
    wx.navigateTo({ url: "/pages/stockstates/index/index" });
  },
  fstates: function () {
    wx.navigateTo({ url: "/pages/fckstate/index/index" });
  },
  state: function () {
    wx.navigateTo({ url: "/pages/ckstate/index/index" });
  },
  wstate: function () {
    wx.navigateTo({ url: "/pages/wckstate/index/index" });
  },
  goback: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  onShow: function (a) {},
});
