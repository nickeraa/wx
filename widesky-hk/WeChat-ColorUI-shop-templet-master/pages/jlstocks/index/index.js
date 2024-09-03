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
  shfh: function () {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_customer_endznumbers.ashx",
      data: {
        wlnumber: e.data.wlnumber,
        shqguserid: wx.getStorageSync("qguserid"),
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
                  a.confirm && e.fhjl();
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
  fhjl: function () {
    wx.request({
      url: a.globalData.api + "fhjl.aspx",
      data: { wlnumber: this.data.wlnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), wx.redirectTo({ url: "/pages/shqstocks/index/index" });
      },
    });
  },
  onShow: function (e) {
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_customer_listsqs.ashx",
        data: { wlnumber: t.data.wlnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0
              ? t.setData({
                  rejob: e.data,
                  shname: e.data[0].SHNAME,
                  shaddr: e.data[0].SHADDR,
                  shphone: e.data[0].SHPHONE,
                  reguserid: e.data[0].USERID,
                  gjuserid: e.data[0].GJUSERID,
                  qguserid: e.data[0].QGUSERID,
                  pzstate: e.data[0].PZSTATE,
                  pwuliu: e.data[0].PWULIU,
                  pyoufei: e.data[0].PYOUFEI,
                  paddress: e.data[0].PADDRESS,
                  bprice: e.data[0].BPRICE,
                  store: e.data[0].STORE,
                  imgurls: a.globalData.api + e.data[0].IMGURL,
                })
              : t.setData({ rejob: null }),
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
