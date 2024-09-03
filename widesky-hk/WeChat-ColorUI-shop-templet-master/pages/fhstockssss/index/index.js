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
    swiperlist: [""],
  },
  previewImage0: function (t) {
    var e = t.target.dataset.src;
    (this.data.swiperlist[0] = this.data.imgurls),
      wx.previewImage({ current: e, urls: this.data.swiperlist });
  },
  previewImage1: function (t) {
    var e = t.target.dataset.src;
    (this.data.swiperlist[0] = this.data.imgurlss),
      wx.previewImage({ current: e, urls: this.data.swiperlist });
  },
  previewImage2: function (t) {
    var e = t.target.dataset.src;
    (this.data.swiperlist[0] = this.data.imgurlsss),
      wx.previewImage({ current: e, urls: this.data.swiperlist });
  },
  onLoad: function (t) {
    console.log(t.wlnumber), this.setData({ wlnumber: t.wlnumber });
  },
  cs: function () {
    this.data.views
      ? this.setData({ views: !1, states: "收起物流详情", css: "icon-fold" })
      : this.setData({ views: !0, states: "查看物流详情", css: "icon-unfold" });
  },
  checkinput: function () {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "select_kd.aspx",
        data: { sphone: e.data.sphone, kdnumber: e.data.kdnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t);
          var a = t.data.replace(" ", "");
          a = a.replace(/\ufeff/g, "");
          var s = JSON.parse(a);
          console.log(s),
            console.log(s.result.expName),
            "0" == s.status
              ? (e.setData({
                  flag: !1,
                  expName: s.result.expName,
                  updateTime: s.result.updateTime,
                  number: s.result.number,
                  logo: s.result.logo,
                  newstatus: s.result.list[0].status,
                  listwl: s.result.list.splice(0, 1),
                }),
                e.setData({ listwl: s.result.list }),
                console.log(s.result.list),
                console.log(s.result.list.splice(0, 1)),
                console.log(e.data.listwl),
                "3" == s.result.deliverystatus
                  ? e.setData({ deliverystatus: "已签收" })
                  : "0" == s.result.deliverystatus
                  ? e.setData({ deliverystatus: "已揽件" })
                  : "1" == s.result.deliverystatus
                  ? e.setData({ deliverystatus: "在途中" })
                  : "2" == s.result.deliverystatus
                  ? e.setData({ deliverystatus: "正在派件" })
                  : "4" == s.result.deliverystatus
                  ? e.setData({ deliverystatus: "派送失败" })
                  : "5" == s.result.deliverystatus
                  ? e.setData({ deliverystatus: "疑难件" })
                  : "6" == s.result.deliverystatus
                  ? e.setData({ deliverystatus: "退件签收" })
                  : e.setData({ deliverystatus: "" }))
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
  onShow: function (e) {
    var a = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_listsqs.ashx",
        data: { wlnumber: a.data.wlnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0
              ? (a.setData({
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
                  note: e.data[0].NOTE,
                  imgurls: t.globalData.api + e.data[0].IMGURL,
                  imgurlss: t.globalData.api + e.data[0].FHIMGURL,
                  imgurlsss: t.globalData.api + e.data[0].QSIMGURL,
                  kdnumber: e.data[0].KDNUMBER,
                  sphone: e.data[0].SHPHONE.substring(7, 11),
                }),
                a.data.note || a.setData({ note: "" }),
                a.data.kdnumber
                  ? a.setData({ view: !1, view1: !0 })
                  : a.setData({ view: !0, view1: !1, kdnumber: "" }))
              : a.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
