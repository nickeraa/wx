var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    replu: {},
  },
  back: function () {
    wx.navigateBack({ delta: 0 });
  },
  onLoad: function (a) {
    this.shows();
  },
  shows: function () {
    this.setData({
      sumprice: 0,
      sumrealprice: 0,
      arrs: "",
      sumydprice: 0,
      ydprice: 0,
    });
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listmydj.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data.items),
          a.data.items.length > 0
            ? t.setData({ replu: a.data.items })
            : t.setData({ replu: null });
      },
    });
  },
  onShow: function () {},
});
