var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
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
    imglist: t.globalData.api + "images/timg.jpg",
    imgurls: "",
    imgurlss: "",
    imgurlsss: "",
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
    note: "",
    view: !0,
    view1: !0,
    kdnumber: "",
    sphone: "",
    kdgs: "",
    logo: "",
    views: !0,
    states: "查看物流详情",
    css: "icon-unfold",
    expName: "",
    updateTime: "",
    deliverystatus: "",
    number: "",
    flag: !0,
    listwl: {},
    newstatus: "",
  },
  onLoad: function (t) {
    console.log(t.wlnumber), this.setData({ wlnumber: t.wlnumber });
  },
  cx: function (t) {
    console.log(t.target.id),
      this.setData({
        xf_store: t.target.id.split(",")[0],
        snumber: t.target.id.split(",")[1],
        xf_plu: t.target.id.split(",")[2],
        xf_qty: t.target.id.split(",")[3],
      }),
      console.log(this.data.snumber);
    var a = this;
    wx.showModal({
      title: "提示",
      content:
        "将与寄存货品数据库中的 " +
        this.data.xf_store +
        " 销售单号 " +
        this.data.snumber +
        " 货品 " +
        this.data.xf_plu +
        " 数量 " +
        this.data.xf_qty +
        "套,进行冲销",
      showCancel: !1,
      success: function (t) {
        t.confirm && a.secxjc();
      },
    });
  },
  secxjc: function () {
    var a = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_secxjc.ashx",
        data: {
          xf_store: a.data.xf_store,
          snumber: a.data.snumber,
          xf_plu: a.data.xf_plu,
          xf_qty: a.data.xf_qty,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            0 == t.data.length
              ? wx.showModal({
                  title: "提示",
                  content: "寄存货品中没有与之对应的货品数据",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                })
              : "1" == t.data[0].CXTAG
              ? wx.showModal({
                  title: "提示",
                  content: "此货品已经冲销过了，不能重复冲销",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                })
              : a.cxjc(),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  cxjc: function () {
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_cxjc.ashx",
        data: {
          xf_store: this.data.xf_store,
          snumber: this.data.snumber,
          xf_plu: this.data.xf_plu,
          xf_qty: this.data.xf_qty,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            "ok" == t.data
              ? wx.showModal({
                  title: "提示",
                  content: "冲销成功!",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                })
              : wx.showModal({
                  title: "提示",
                  content: "数据错误，冲销失败!",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  cs: function () {
    this.data.views
      ? this.setData({ views: !1, states: "收起物流详情", css: "icon-fold" })
      : this.setData({ views: !0, states: "查看物流详情", css: "icon-unfold" });
  },
  checkinput: function () {
    var a = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "select_kd.aspx",
        data: { sphone: a.data.sphone, kdnumber: a.data.kdnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t);
          var e = t.data.replace(" ", "");
          e = e.replace(/\ufeff/g, "");
          var s = JSON.parse(e);
          console.log(s),
            console.log(s.result.expName),
            "0" == s.status
              ? (a.setData({
                  flag: !1,
                  expName: s.result.expName,
                  updateTime: s.result.updateTime,
                  number: s.result.number,
                  logo: s.result.logo,
                  newstatus: s.result.list[0].status,
                  listwl: s.result.list.splice(0, 1),
                }),
                a.setData({ listwl: s.result.list }),
                console.log(s.result.list),
                console.log(s.result.list.splice(0, 1)),
                console.log(a.data.listwl),
                "3" == s.result.deliverystatus
                  ? a.setData({ deliverystatus: "已签收" })
                  : "0" == s.result.deliverystatus
                  ? a.setData({ deliverystatus: "已揽件" })
                  : "1" == s.result.deliverystatus
                  ? a.setData({ deliverystatus: "在途中" })
                  : "2" == s.result.deliverystatus
                  ? a.setData({ deliverystatus: "正在派件" })
                  : "4" == s.result.deliverystatus
                  ? a.setData({ deliverystatus: "派送失败" })
                  : "5" == s.result.deliverystatus
                  ? a.setData({ deliverystatus: "疑难件" })
                  : "6" == s.result.deliverystatus
                  ? a.setData({ deliverystatus: "退件签收" })
                  : a.setData({ deliverystatus: "" }))
              : wx.showModal({
                  title: "提示",
                  content: "无法查询有效的信息，请核对后查询",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  onShow: function (a) {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_listsqs.ashx",
        data: { wlnumber: e.data.wlnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? (e.setData({
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
                  note: a.data[0].NOTE,
                  imgurls: t.globalData.api + a.data[0].IMGURL,
                  imgurlss: t.globalData.api + a.data[0].FHIMGURL,
                  imgurlsss: t.globalData.api + a.data[0].QSIMGURL,
                  kdnumber: a.data[0].KDNUMBER,
                  sphone: a.data[0].SHPHONE.substring(7, 11),
                }),
                e.data.note || e.setData({ note: "" }),
                e.data.kdnumber
                  ? e.setData({ view: !1, view1: !0 })
                  : e.setData({ view: !0, view1: !1, kdnumber: "" }))
              : e.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
