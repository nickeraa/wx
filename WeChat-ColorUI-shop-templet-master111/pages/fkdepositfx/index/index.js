var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    flag: !0,
    xf_plu: "",
    xf_desci: "",
    replu: {},
    flags: !1,
    ret: {},
    ck: 0,
    setype: "0",
    address1: "",
    address2: "",
    phone: "",
    body: "",
    tag: "",
    tags: !1,
    shid: "",
    sumprice: 0,
    sumsqprice: 0,
    xf_amtsold: 0,
    sumqty: 0,
    fg: 0,
    amount: 0,
    remark: "",
    xf_storecode: "",
    salesman: "",
    types: "",
    grade: "",
    salestypes: "1",
    sumyfprice: 0,
    xf_docno: "",
    sumwlprice: 0,
    sorts: "",
    userid: "",
    slt: "",
    ygname: "",
    id: "",
    vipcode: "",
    pay_amtsolds: 0,
  },
  back: function () {
    wx.switchTab({ url: "/pages/homerm/index/index" });
  },
  onLoad: function (a) {
    wx.getStorageSync("vipcode")
      ? this.setData({ userid: wx.getStorageSync("vipcode") })
      : this.setData({ userid: wx.getStorageSync("wxuserid") });
  },
  shows: function () {
    console.log("pppppp");
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_fkmydj.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        xf_docno: wx.getStorageSync("xf_docno"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        if ((console.log(e.data), e.data.length > 0)) {
          t.setData({
            replu: e.data,
            sumqty: e.data[0].SUMQTY,
            sumprice: e.data[0].SUMPRICE,
            sumsqprice: e.data[0].SUMSQPRICE,
            pay_amtsolds: e.data[0].PAY_AMTSOLDS,
            sorts: e.data[0].SORTS,
            slt:
              a.globalData.scimgurl +
              e.data[0].XF_PLU +
              "\\" +
              e.data[0].IMAGESSL,
          }),
            console.log(t.data.slt);
          for (var s = 0; s < e.data.length; s++)
            t.setData({ sumwlprice: t.data.sumwlprice + e.data[s].WLPRICE });
          console.log(t.data.sumwlprice),
            t.setData({ sumyfprice: t.data.sumsqprice + t.data.sumwlprice });
        } else t.setData({ replu: null });
        t.seygname();
      },
    });
  },
  seygname: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_seyguserid.ashx",
      data: { yguserid: wx.getStorageSync("yguserid") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data), t.setData({ ygname: a.data[0].XF_NAME });
      },
    });
  },
  onShow: function () {
    this.shows();
  },
  onShareAppMessage: function (a) {
    return {
      title: "广天藏品 " + this.data.ygname + " 向您发送了：定金取货链接 ",
      path:
        "/pages/fkdeposit/index/index?vipcode=" +
        wx.getStorageSync("vipcode") +
        "&yguserid=" +
        wx.getStorageSync("yguserid") +
        "&xf_docno=" +
        wx.getStorageSync("xf_docno"),
      imageUrl: this.data.slt,
      success: function (a) {
        console.log("转发成功:" + JSON.stringify(a));
      },
      fail: function (a) {
        console.log("转发失败:" + JSON.stringify(a));
      },
    };
  },
});
