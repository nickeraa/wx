var t = getApp();
require("../../../utils/util.js");
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    banner: t.globalData.imgUrl,
    scimgurl: t.globalData.scimgurl,
    isChecked0: "",
    isChecked1: "",
    replu: {},
    ret: {},
    tag: "",
    title: "",
    views: !0,
    states: "查看物流详情",
    css: "icon-unfold",
    expName: "",
    updateTime: "",
    deliverystatus: "",
    number: "",
    flag: !0,
    flags: !0,
    listwl: {},
    newstatus: "",
    view: !0,
    view1: !0,
    kdnumber: "",
    sphone: "",
    kdgs: "",
    logo: "",
  },
  back: function () {
    wx.switchTab({ url: "/pages/user/index/index" });
  },
  onLoad: function (t) {
    this.setData({ title: t.title }), console.log(this.data.title);
  },
  tjsorts: function () {
    var e = this;
    wx.request({
      url: t.globalData.api + "wx_tjsorts.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t.data), e.setData({ ret: t.data });
      },
    });
  },
  setitle: function (t) {
    console.log("ggggggg"),
      console.log(t.currentTarget.dataset.title),
      this.setData({ title: t.currentTarget.dataset.title }),
      "0" == this.data.title
        ? (this.setData({ isChecked0: !0, isChecked1: !1 }), this.dfk())
        : "1" == this.data.title &&
          (this.setData({ isChecked0: !1, isChecked1: !0 }), this.dfh());
  },
  del: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_deldfk.ashx",
      data: { xf_docno: e.currentTarget.dataset.xf_docno },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        "ok" == t.data &&
          (wx.showToast({ title: "已取消", icon: "success", duration: 1e3 }),
          a.dfk());
      },
    });
  },
  dfk: function () {
    this.setData({ replu: null });
    var e = this;
    wx.request({
      url: t.globalData.api + "wx_alldfk.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t.data.items),
          t.data.items.length > 0
            ? e.setData({ replu: t.data.items, flag: !0 })
            : (e.setData({ replu: null, flag: !1 }), e.tjsorts());
      },
    });
  },
  dfh: function () {
    this.setData({ replu: null });
    var e = this;
    wx.request({
      url: t.globalData.api + "wx_alldfh.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t.data.items),
          t.data.items.length > 0
            ? e.setData({ replu: t.data.items, flag: !0 })
            : (e.setData({ replu: null, flag: !1 }), e.tjsorts());
      },
    });
  },
  onShow: function () {
    "0" == this.data.title
      ? (this.setData({ isChecked0: !0, isChecked1: !1 }), this.dfk())
      : "1" == this.data.title &&
        (this.setData({ isChecked0: !1, isChecked1: !0 }), this.dfh());
  },
  pay: function (t) {
    console.log(t.currentTarget.dataset.tags),
      "去付款" == t.currentTarget.dataset.tags
        ? wx.navigateTo({
            url:
              "/pages/dfdeposit/index/index?xf_docno=" +
              t.currentTarget.dataset.xf_docno,
          })
        : wx.navigateTo({
            url:
              "/pages/dfdepositydgwc/index/index?xf_docno=" +
              t.currentTarget.dataset.xf_docno,
          });
  },
  pays: function (t) {
    console.log(t.currentTarget.dataset.salestypes),
      "0" == t.currentTarget.dataset.salestypes
        ? wx.navigateTo({
            url:
              "/pages/dfdeposit/index/index?xf_docno=" +
              t.currentTarget.dataset.xf_docno,
          })
        : wx.navigateTo({
            url:
              "/pages/dfdepositydgwc/index/index?xf_docno=" +
              t.currentTarget.dataset.xf_docno,
          });
  },
});
