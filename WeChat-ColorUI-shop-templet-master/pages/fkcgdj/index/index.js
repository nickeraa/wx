var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    replu: {},
    sorts: "",
    tag: "",
    xf_docno: "",
    i: "",
  },
  back: function () {
    wx.switchTab({ url: "/pages/user/index/index" });
  },
  onLoad: function (a) {
    a.sorts && this.setData({ sorts: a.sorts }),
      a.xf_docno && this.setData({ xf_docno: a.xf_docno }),
      a.i && this.setData({ i: a.i });
  },
  tzyg: function () {
    wx.request({
      url: a.globalData.api + "wx_zxygscjdj.ashx",
      data: { xf_docno: this.data.xf_docno },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data);
      },
    });
  },
  onShow: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_likesorts.ashx",
      data: { sorts: t.data.sorts },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          a.data.length > 0 && t.setData({ replu: a.data }),
          "" == t.data.i && t.tzyg();
      },
      complete: function () {},
    });
  },
});
