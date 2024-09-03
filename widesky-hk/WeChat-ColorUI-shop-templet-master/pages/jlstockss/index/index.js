var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    rejob: {},
    xf_store: "",
    xf_plu: "",
    xf_qty: "",
    vipcode: "",
    snumber: "",
    susername: "",
    entime: "",
    userid: "",
    wlnumber: "",
    imglist: a.globalData.api + "images/timg.jpg",
    imgurl: "",
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
  },
  onLoad: function (a) {
    console.log(a.wlnumber), this.setData({ wlnumber: a.wlnumber });
  },
  shfh: function () {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_customer_endznumberss.ashx",
      data: { wlnumber: e.data.wlnumber, i: "0" },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" == a.data
            ? wx.showModal({
                title: "提示",
                content: "已同意",
                showCancel: !1,
                success: function (a) {
                  a.confirm && e.fhty();
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
  jjfh: function () {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_customer_endznumberss.ashx",
      data: { wlnumber: e.data.wlnumber, i: "1" },
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
                  a.confirm && e.fhty();
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
  fhty: function () {
    wx.request({
      url: a.globalData.api + "fhty.aspx",
      data: {
        reguserid: this.data.reguserid,
        gjuserid: this.data.gjuserid,
        qguserid: this.data.qguserid,
        wlnumber: this.data.wlnumber,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), wx.redirectTo({ url: "/pages/shqstockss/index/index" });
      },
    });
  },
  onShow: function (e) {
    console.log(wx.getStorageSync("juserid"));
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_customer_listsqs.ashx",
        data: { wlnumber: t.data.wlnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? t.setData({
                  rejob: a.data,
                  shname: a.data[0].SHNAME,
                  shaddr: a.data[0].SHADDR,
                  shphone: a.data[0].SHPHONE,
                  reguserid: a.data[0].USERID,
                  gjuserid: a.data[0].GJUSERID,
                  qguserid: a.data[0].QGUSERID,
                  pzstate: a.data[0].PZSTATE,
                  pwuliu: a.data[0].PWULIU,
                  pyoufei: a.data[0].PYOUFEI,
                  paddress: a.data[0].PADDRESS,
                  bprice: a.data[0].BPRICE,
                })
              : t.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
