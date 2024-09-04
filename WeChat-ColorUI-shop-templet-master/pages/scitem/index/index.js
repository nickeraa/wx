var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    replu: {},
    avaurl: "",
    flag: !1,
  },
  back: function () {
    wx.navigateBack({ delta: 0 });
  },
  onShow: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_sescitem.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          0 == a.data.length || t.setData({ replu: a.data, flag: !0 });
      },
    });
  },
  onLoad: function (a) {},
});
