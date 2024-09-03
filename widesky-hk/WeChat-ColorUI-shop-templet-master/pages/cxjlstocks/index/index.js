var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    rejob: {},
    xf_store: "",
    store: "",
    xf_plu: "",
    xf_qty: "",
    vipcode: "",
    snumber: "",
    susername: "",
    entime: "",
    userid: "",
    wlnumber: "",
    imglist: a.globalData.api + "images/timg.jpg",
    imgurls: "",
    shname: "",
    shaddr: "",
    shphone: "",
    reguserid: "",
    qguserid: "",
    gjuserid: "",
    cxuserid: "",
    pzstate: "",
    pyoufei: "",
    pwuliu: "",
    paddress: "",
    bprice: "",
    gopenid: "",
  },
  onLoad: function (a) {
    console.log(a.wlnumber), this.setData({ wlnumber: a.wlnumber });
  },
  cxtz: function () {
    wx.request({
      url: a.globalData.api + "cxtz.aspx",
      data: { wlnumber: this.data.wlnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), wx.redirectTo({ url: "/pages/cxqstock/index/index" });
      },
    });
  },
  cxfh: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_customer_cxznumber.ashx",
      data: { wlnumber: t.data.wlnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" == a.data
            ? wx.showModal({
                title: "提示",
                content: "已撤销发货申请！",
                showCancel: !1,
                success: function (a) {
                  a.confirm && t.cxtz();
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
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_customer_listsqs.ashx",
        data: { wlnumber: e.data.wlnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            t.data.length > 0
              ? e.setData({
                  rejob: t.data,
                  shname: t.data[0].SHNAME,
                  shaddr: t.data[0].SHADDR,
                  shphone: t.data[0].SHPHONE,
                  reguserid: t.data[0].USERID,
                  gjuserid: t.data[0].GJUSERID,
                  qguserid: t.data[0].QGUSERID,
                  pzstate: t.data[0].PZSTATE,
                  pwuliu: t.data[0].PWULIU,
                  pyoufei: t.data[0].PYOUFEI,
                  paddress: t.data[0].PADDRESS,
                  bprice: t.data[0].BPRICE,
                  store: t.data[0].STORE,
                  imgurls: a.globalData.api + t.data[0].IMGURL,
                })
              : e.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  bhfh: function () {
    wx.request({
      url: a.globalData.api + "wx_customer_endznumberss.ashx",
      data: { wlnumber: this.data.wlnumber, i: "1" },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" == a.data
            ? wx.showModal({
                title: "提示",
                content: "已驳回",
                showCancel: !1,
                success: function (a) {
                  a.confirm;
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
});
