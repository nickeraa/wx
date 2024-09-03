var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    replu: {},
    tag: "",
  },
  back: function () {
    wx.redirectTo({ url: "/pages/user/index/index" });
  },
  onLoad: function (a) {},
  shows: function () {
    console.log("fffffff");
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_qhmydj.ashx",
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
  onShow: function () {
    this.shows();
  },
  pay: function (a) {
    0 == a.currentTarget.dataset.sumsqprice
      ? wx.navigateTo({
          url:
            "/pages/fkaddr/index/index?xf_docno=" +
            a.currentTarget.dataset.xf_docno,
        })
      : wx.navigateTo({
          url:
            "/pages/fkdeposit/index/index?xf_docno=" +
            a.currentTarget.dataset.xf_docno,
        });
  },
});
