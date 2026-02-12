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
  },
  back: function () {
    wx.switchTab({ url: "/pages/homerm/index/index" });
  },
  onLoad: function (a) {
    a.sorts && this.setData({ sorts: a.sorts }),
      a.xf_docno && this.setData({ xf_docno: a.xf_docno }),
      a.tag && this.setData({ tag: a.tag }),
      console.log(this.data.tag),
      console.log(this.data.xf_docno),
      console.log("ggggggg");
  },
  delgwc: function () {
    if ((this.tzyg(), "1" == this.data.tag)) {
      var t = this;
      wx.request({
        url: a.globalData.api + "wx_delgwc.ashx",
        data: {
          xf_vipcode: wx.getStorageSync("vipcode"),
          wxuserid: wx.getStorageSync("wxuserid"),
          xf_docno: t.data.xf_docno,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a.data);
        },
        complete: function () {},
      });
    } else if ("3" == this.data.tag) {
      t = this;
      wx.request({
        url: a.globalData.api + "wx_delgwcyd.ashx",
        data: {
          xf_vipcode: wx.getStorageSync("vipcode"),
          wxuserid: wx.getStorageSync("wxuserid"),
          xf_docno: t.data.xf_docno,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a.data);
        },
        complete: function () {},
      });
    }
  },
  tzyg: function () {
    wx.request({
      url: a.globalData.api + "wx_zxygscj.ashx",
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
          t.delgwc();
      },
      complete: function () {},
    });
  },
});
