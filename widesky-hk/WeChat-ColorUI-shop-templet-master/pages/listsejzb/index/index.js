var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
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
    imglist: "",
    zcimg: "",
    qguser: "",
  },
  onLoad: function (a) {
    this.setData({ znumber: a.znumber });
  },
  onShow: function (t) {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "seznumber.ashx",
        data: { znumber: e.data.znumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            e.setData({
              vipcode: t.data[0].VIPCODE,
              vipname: t.data[0].XF_SURNAME,
              store: t.data[0].XF_STORE,
              storename: t.data[0].XF_NAME,
              xf_plu: t.data[0].XF_PLU,
              xf_name: t.data[0].XF_DESCI,
              xf_price: t.data[0].PRICE,
              qty: t.data[0].XF_QTY,
              snumber: t.data[0].SNUMBER,
              susername: t.data[0].SUSERNAME,
              imglist: a.globalData.api + t.data[0].IMGURL,
              zcimg: a.globalData.api + t.data[0].ZCIMG,
              qguser: t.data[0].QGUSERNAME,
            }),
            t.data[0].QHIMGURL &&
              e.setData({ qhimgurl: a.globalData.api + t.data[0].QHIMGURL }),
            wx.hideLoading();
        },
      });
  },
});
