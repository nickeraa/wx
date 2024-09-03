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
    djimg: "",
    qguser: "",
    salestime: "",
  },
  onLoad: function (a) {
    this.setData({ znumber: a.znumber }), console.log(this.data.znumber);
  },
  onShow: function (e) {
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "seznumberss.ashx",
        data: { znumber: t.data.znumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            t.setData({
              vipcode: a.data[0].XF_VIPCODE,
              vipname: a.data[0].XF_SURNAME,
              store: a.data[0].XF_STORECODE,
              storename: a.data[0].XF_NAME,
              xf_plu: a.data[0].XF_PLU,
              xf_name: a.data[0].XF_DESCI,
              xf_price: a.data[0].XF_AMTSOLD,
              qty: a.data[0].XF_QTYSOLD,
              snumber: a.data[0].XF_DOCNO,
              susername: a.data[0].XF_SALESNAME,
              salestime: a.data[0].XF_TXDATE,
            }),
            wx.hideLoading();
        },
      });
  },
});
