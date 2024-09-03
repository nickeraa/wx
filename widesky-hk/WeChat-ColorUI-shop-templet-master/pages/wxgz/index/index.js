var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    url: "",
  },
  onLoad: function (t) {
    console.log(wx.getStorageSync("phone")),
      this.setData({
        url:
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9efd484d9468b80a&redirect_uri=https://widesky.work/HKback/getopenid.aspx&response_type=code&scope=snsapi_base&state=" +
          wx.getStorageSync("phone") +
          "#wechat_redirect",
      });
  },
});
