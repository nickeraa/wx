var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    flag: !0,
    replu: {},
    tag: "",
  },
  back: function () {
    wx.redirectTo({ url: "/pages/user/index/index" });
  },
  onLoad: function (a) {},
  tjsorts: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_tjsorts.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data), t.setData({ ret: a.data });
      },
    });
  },
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
            ? t.setData({ replu: a.data.items, flag: !0 })
            : (t.setData({ replu: null, flag: !1 }), t.tjsorts());
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