var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    xf_txdate: "",
    replu: {},
    sumprice: 0,
    sumydprice: 0,
    xf_docno: "",
    remark: "",
    xf_desci: "",
    salestypes: "",
    sorts: "",
    xiaoshu: !1,
    userid: "",
  },
  back: function () {
    wx.navigateBack({ delta: 0 });
  },
  onLoad: function (a) {
    a.xf_docno && this.setData({ xf_docno: a.xf_docno }),
      wx.getStorageSync("vipcode")
        ? this.setData({ userid: wx.getStorageSync("vipcode") })
        : this.setData({ userid: wx.getStorageSync("wxuserid") }),
      console.log(this.data.xf_docno);
  },
  onShow: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listdfk.ashx",
      data: { xf_docno: t.data.xf_docno },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0
            ? (t.setData({
                replu: a.data,
                sumydprice: a.data[0].XF_AMTSOLD,
                xf_docno: a.data[0].XF_DOCNO,
                xf_txdate: a.data[0].XF_TXDATE.replace(/T/g,' '),
                xf_desci: a.data[0].XF_DESCI,
                remark: a.data[0].REMARK,
                salestypes: a.data[0].SALESTYPES,
                sorts: a.data[0].SORTS,
              }),
              a.data[0].SUMXF_PRICE.toString().indexOf(".") >= 0 &&
                t.setData({ xiaoshu: !0 }))
            : t.setData({ replu: null });
      },
    });
  },
  payment: function () {
    console.log(this.data.sumprice);
    var t = this;
    wx.login({
      success: function (o) {
        var e = o.code;
        e
          ? wx.request({
              url: a.globalData.api + "wxzf.aspx",
              data: { code: e },
              header: { "content-type": "application/json" },
              success: function (a) {
                console.log(a.data);
                var o = a.data.split(",");
                t.setData({ openid: o[0] }),
                  console.log(t.data.openid),
                  t.generateOrder(t.data.openid);
              },
            })
          : console.log("获取用户登陆状态失败！");
      },
    });
  },
  generateOrder: function (t) {
    var o = this;
    wx.request({
      url: a.globalData.api + "wxzfconfig.aspx",
      data: {
        openid: t,
        amount: o.data.sumydprice,
        xf_docno: o.data.xf_docno,
        salestypes: "线上预定," + o.data.userid,
      },
      header: { "content-type": "application/json" },
      success: function (a) {
        console.log(a.data), o.zf(a.data);
      },
      fail: function (a) {
        console.info(a);
      },
    });
  },
  zf: function (a) {
    var t = this;
    console.log("发起支付"), console.log(a);
    var o = a.split(",");
    wx.requestPayment({
      timeStamp: o[0],
      nonceStr: o[1],
      package: o[2],
      signType: o[4],
      paySign: o[3],
      success: function (a) {
        console.log("success"), console.log(a), t.yfk();
      },
      fail: function (a) {
        console.log("fail"),
          console.log(a),
          wx.showToast({ title: "支付失败", icon: "error", duration: 2e3 });
      },
    });
  },
  yfk: function () {
    wx.getStorageSync("vipcode") ||
      this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
      wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" }),
      console.log(this.data.sumydprice);
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_qefkyd.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_docno: t.data.xf_docno,
        xf_amtsold: t.data.sumydprice,
        sumwlprice: 0,
        shtype: "",
        shid: "",
        tag: "1",
        pay_amtsold: t.data.sumydprice,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          "error" != a.data
            ? wx.redirectTo({
                url:
                  "/pages/fkcg/index/index?sorts=" +
                  t.data.sorts +
                  "&tag=3&xf_docno=" +
                  t.data.xf_docno,
              })
            : wx.showToast({ title: "数据错误" });
      },
    });
  },
});
