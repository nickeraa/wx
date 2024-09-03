var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    rejob: {},
    storename: "",
    store: "",
    xf_plu: "",
    qty: "",
    xf_desci: "",
    amount: "",
    stock: "",
    salesprice: "",
    vipprice: "",
    pzstate: "",
    pnumber: "",
    imgurls: "",
    ontimess: "",
    remark: "",
    bhtext: "",
    flag: !0,
  },
  onLoad: function (a) {
    console.log(a.pnumber), this.setData({ pnumber: a.pnumber });
  },
  onShow: function (t) {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_tpshlist.ashx",
        data: { pnumber: e.data.pnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            t.data.length > 0
              ? (e.setData({
                  rejob: t.data,
                  store: t.data[0].STORE,
                  storename: t.data[0].STORENAME,
                  salesprice: t.data[0].XF_ORGUPRICE,
                  vipprice: t.data[0].VIPPRICE,
                  amount: t.data[0].AMOUNT,
                  qty: t.data[0].QTY,
                  pzstate: t.data[0].PZSTATE,
                  stock: t.data[0].STOCK,
                  remark: t.data[0].REMARK,
                  xf_name: t.data[0].XF_NAME,
                  xf_plu: t.data[0].XF_PLU,
                  xf_desci: t.data[0].XF_LONGDESC,
                  ontimess: t.data[0].ONTIMESS,
                  bhtext: t.data[0].BHTEXT,
                  imgurls: a.globalData.hkimgUrl + t.data[0].IMAGES,
                }),
                "5" == t.data[0].TAG
                  ? e.setData({ flag: !1 })
                  : e.setData({ flag: !0 }))
              : e.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
