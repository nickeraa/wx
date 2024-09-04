var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    rejob: {},
    scimgurl: a.globalData.scimgurl,
  },
  onLoad: function (a) {
    console.log(wx.getStorageSync("yguserid")),
      console.log(wx.getStorageSync("vipcode"));
  },
  fx: function () {
    wx.navigateTo({ url: "/pages/cardcode/index/index" });
  },
  tc: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  onShow: function () {
    wx.getStorageSync("wxuserid") && wx.removeStorageSync("wxuserid");
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_checkvip.ashx",
        data: { vipcode: wx.getStorageSync("vipcode") },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? e.setData({
                  vipname: a.data[0].XF_SURNAME,
                  grade: a.data[0].GRADE,
                  store: a.data[0].XF_STORES,
                  xf_name: a.data[0].XF_USERNAME,
                  vipcode: a.data[0].XF_VIPCODE,
                })
              : (e.setData({ rejob: null }),
                wx.showModal({
                  title: "提示",
                  content: "卡号不存在或输入错误",
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
