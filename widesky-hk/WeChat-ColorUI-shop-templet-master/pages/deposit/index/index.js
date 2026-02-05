var t = getApp(),
  a = require("../../../utils/util.js");
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    scimgurl: "https://widesky.work/scimg/",
    replu: {},
    xf_docno: "",
    tag: "",
    salestypes: "",
    flag: !0,
    index2: "",
    picke2: [],
    store: "",
    storename: "",
    kc_xf_docno: "",
    imglist: t.globalData.api + "images/timg.jpg",
    imgurl: "",
    i: "",
    date: "",
    vipname:''
  },
  back: function () {
    "" == this.data.i
      ? wx.switchTab({ url: "/pages/jzb/index/index" })
      : wx.navigateBack({ delta: 0 });
  },
  selectsku: function (t) {
    console.log(t.currentTarget.dataset.xf_plu),
      wx.navigateTo({
        url: "/pages/shopcg/goods/index?id=" + t.currentTarget.dataset.xf_plu,
      });
  },
  onLoad: function (t) {
    var e = a.formatDate(new Date());
    this.setData({ date: e }),
      t.xf_docno && this.setData({ xf_docno: t.xf_docno }),
      t.i && this.setData({ i: t.i });
      console.log(this.data.xf_docno)
  },
  dd: function () {
    this.setData({ replu: null });
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_tzdeposit.ashx",
      data: { xf_docno: a.data.xf_docno },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t.data.items),
          t.data.items.length > 0
            ? a.setData({
                replu: t.data.items,
                tag: t.data.items[0].TAG,
                salestypes: t.data.items[0].SALESTYPES,
                vipname:t.data.items[0].VIPNAME,
              })
            : a.setData({ replu: null });
      },
    });
  },
  onShow: function () {
    this.dd();
  },
});
