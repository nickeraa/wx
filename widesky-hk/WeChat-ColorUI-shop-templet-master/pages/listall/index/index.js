var a = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    phone: "",
    username: "",
    openid: "",
    userid: "",
    xf_plu: "",
    xf_name: "",
    store: "",
    qty: "",
    vipcode: "",
    vipname: "",
    snumber: "",
    susername: "",
    xf_price: "",
    storename: "",
    znumber: "",
    zcnumber: "",
    imglist: "",
    shimg: "",
    shimgs: "",
    salestime: "",
    zcimg: "",
    rcimg: "",
    zdimg: "",
    qhimg: "",
    swiperlist: [""],
  },
  onLoad: function (a) {
    this.setData({ znumber: a.znumber });
  },
  previewImage0: function (a) {
    var t = a.target.dataset.src;
    (this.data.swiperlist[0] = this.data.imglist),
      wx.previewImage({ current: t, urls: this.data.swiperlist });
  },
  previewImage1: function (a) {
    var t = a.target.dataset.src;
    (this.data.swiperlist[0] = this.data.zcimg),
      wx.previewImage({ current: t, urls: this.data.swiperlist });
  },
  previewImage2: function (a) {
    var t = a.target.dataset.src;
    (this.data.swiperlist[0] = this.data.rcimg),
      wx.previewImage({ current: t, urls: this.data.swiperlist });
  },
  previewImage3: function (a) {
    var t = a.target.dataset.src;
    (this.data.swiperlist[0] = this.data.zdimg),
      wx.previewImage({ current: t, urls: this.data.swiperlist });
  },
  previewImage4: function (a) {
    var t = a.target.dataset.src;
    (this.data.swiperlist[0] = this.data.shimg),
      wx.previewImage({ current: t, urls: this.data.swiperlist });
  },
  previewImage5: function (a) {
    var t = a.target.dataset.src;
    (this.data.swiperlist[0] = this.data.qhimg),
      wx.previewImage({ current: t, urls: this.data.swiperlist });
  },
  onShow: function (e) {
    var i = this;
    wx.request({
      url: t.globalData.api + "seznumber.ashx",
      data: { znumber: i.data.znumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          i.setData(
            a(
              a(
                {
                  vipcode: e.data[0].VIPCODE,
                  vipname: e.data[0].XF_SURNAME,
                  store: e.data[0].XF_STORE,
                  storename: e.data[0].XF_NAME,
                  xf_plu: e.data[0].XF_PLU,
                  xf_name: e.data[0].XF_DESCI,
                  xf_price: e.data[0].PRICE,
                  qty: e.data[0].XF_QTY,
                  snumber: e.data[0].SNUMBER,
                  zcnumber: e.data[0].ZCNUMBER,
                  susername: e.data[0].SUSERNAME,
                  salestime: e.data[0].SALESTIME,
                  imglist: t.globalData.api + e.data[0].IMGURL,
                  shimg: t.globalData.api + e.data[0].SHIMG,
                  shimgs: e.data[0].SHIMG,
                  qguser: e.data[0].QGUSERNAME,
                  zcimg: t.globalData.api + e.data[0].ZCIMG,
                  rcimg: t.globalData.api + e.data[0].RCIMG,
                  zdimg: t.globalData.api + e.data[0].ZDIMG,
                },
                "shimg",
                t.globalData.api + e.data[0].SHIMG
              ),
              "qhimg",
              t.globalData.api + e.data[0].QHIMG
            )
          );
      },
    });
  },
});
