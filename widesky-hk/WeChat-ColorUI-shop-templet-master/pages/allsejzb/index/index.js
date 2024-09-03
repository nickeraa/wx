var a = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
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
    shimg: "",
    shimgs: "",
    salestime: "",
    zcimg: "",
    rcimg: "",
    zdimg: "",
    qhimg: "",
  },
  onLoad: function (a) {
    this.setData({ znumber: a.znumber }), console.log(this.data.znumber);
  },
  qznumber: function () {
    wx.request({
      url: e.globalData.api + "wx_customer_endznumber.ashx",
      data: {
        znumber: this.data.znumber,
        exqguserid: wx.getStorageSync("qguserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" == a.data
            ? wx.showModal({
                title: "提示",
                content: "审核成功！",
                showCancel: !1,
                success: function (a) {
                  a.confirm &&
                    wx.redirectTo({ url: "/pages/shqstock/index/index" });
                },
              })
            : wx.showModal({
                title: "提示",
                content: "数据错误！",
                showCancel: !1,
                success: function (a) {
                  a.confirm;
                },
              });
      },
    });
  },
  onShow: function (t) {
    var s = this;
    wx.request({
      url: e.globalData.api + "seznumber.ashx",
      data: { znumber: s.data.znumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          s.setData(
            a(
              a(
                {
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
                  salestime: t.data[0].SALESTIME,
                  imglist: e.globalData.api + t.data[0].IMGURL,
                  shimg: e.globalData.api + t.data[0].SHIMG,
                  shimgs: t.data[0].SHIMG,
                  qguser: t.data[0].QGUSERNAME,
                  zcimg: e.globalData.api + t.data[0].ZCIMG,
                  rcimg: e.globalData.api + t.data[0].RCIMG,
                  zdimg: e.globalData.api + t.data[0].ZDIMG,
                },
                "shimg",
                e.globalData.api + t.data[0].SHIMG
              ),
              "qhimg",
              e.globalData.api + t.data[0].QHIMG
            )
          );
      },
    });
  },
});
