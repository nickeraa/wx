var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    rejob: {},
    scimgurl: a.globalData.scimgurl,
    yguser: "",
    store: "",
    vipname: "",
    years: "",
  },
  onLoad: function (a) {
    console.log(wx.getStorageSync("yguserid")),
      console.log(wx.getStorageSync("vipcode")),
      console.log(wx.getStorageSync("vip_id"));
  },
  back: function () {
    wx.redirectTo({ url: "/pages/newcards/index/index" });
  },
  fx: function () {
    wx.navigateTo({ url: "/pages/cardcodes/index/index" });
  },
  tc: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  onShow: function () {
    wx.getStorageSync("wxuserid") && wx.removeStorageSync("wxuserid");
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_checkvipid.ashx",
        data: { vip_id: wx.getStorageSync("vip_id") },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? (e.setData({
                  vipname: a.data[0].VIPNAME,
                  store: a.data[0].XF_STORE,
                  yguser: a.data[0].YG_USER,
                  years: a.data[0].YEARS,
                }),
                wx.setStorageSync("vipname", a.data[0].VIPNAME))
              : (e.setData({ rejob: null }),
                wx.showModal({
                  title: "提示",
                  content: "没有获取数据信息",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                })),
            wx.hideLoading();
        },
      });
  },
});
