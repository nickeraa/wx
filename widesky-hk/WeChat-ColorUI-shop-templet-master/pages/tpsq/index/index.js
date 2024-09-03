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
    gqimg: a.globalData.api + "bgimg/gq.png",
    tzimg: a.globalData.api + "bgimg/tz.jpg",
  },
  onLoad: function (a) {},
  sq: function () {
    wx.redirectTo({ url: "/pages/hkhometp/index/index" });
  },
  list: function () {
    wx.redirectTo({ url: "/pages/tpstate/index/index" });
  },
  onShow: function (a) {},
});
