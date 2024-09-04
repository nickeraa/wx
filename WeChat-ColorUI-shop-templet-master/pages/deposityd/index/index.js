var a = getApp();
require("../../../utils/util.js");
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
    tag: "",
    tags: !1,
    qty: 1,
    sumprice: 0,
    realprice: 0,
    sumrealprice: 0,
    fg: 0,
    amount: 0,
    remark: "",
    xf_storecode: "",
    salesman: "",
    salestypes: "",
    sumydprice: 0,
    yd_amtsold: 0,
    grade: "",
    sorts: "",
    xiaoshu: !1,
    userid: "",
  },
  back: function () {
    wx.navigateBack({ delta: 0 });
  },
  onLoad: function (a) {
    a.xf_plu && this.setData({ xf_plu: a.xf_plu }),
      wx.getStorageSync("vipcode")
        ? this.setData({ userid: wx.getStorageSync("vipcode") })
        : this.setData({ userid: wx.getStorageSync("wxuserid") });
  },
  jia: function () {
    this.setData({ qty: this.data.qty + 1 }),
      this.setData({
        sumprice: this.data.realprice * this.data.qty,
        sumrealprice: this.data.realprice * this.data.qty,
        sumydprice: this.data.yd_amtsold * this.data.qty,
      });
  },
  jian: function () {
    1 == this.data.qty
      ? wx.showToast({ title: "不能少于1", icon: "error", duration: 1e3 })
      : (this.setData({ qty: this.data.qty - 1 }),
        this.setData({
          sumprice: this.data.realprice * this.data.qty,
          sumrealprice: this.data.realprice * this.data.qty,
          sumydprice: this.data.yd_amtsold * this.data.qty,
        }));
  },
  onShow: function () {
    console.log(this.data.xf_plu);
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: t.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          a.data.length > 0
            ? (t.setData({
                replu: a.data,
                sumprice: a.data[0].REALPRICE,
                realprice: a.data[0].REALPRICE,
                xishu: a.data[0].XISHU,
                sumrealprice: a.data[0].REALPRICE,
                xf_desci: a.data[0].XF_DESCI,
                yd_amtsold: a.data[0].YD_AMTSOLD,
                sumydprice: a.data[0].YD_AMTSOLD,
                xf_storecode: a.data[0].XF_STORECODE,
                salesman: a.data[0].SALESMAN,
                grade: a.data[0].GRADE,
                sorts: a.data[0].SORTS,
              }),
              t.data.sumprice.toString().indexOf(".") >= 0 &&
                t.setData({ xiaoshu: !0 }))
            : t.setData({ replu: null }),
          console.log(t.data.replu);
      },
    });
  },
  payment: function () {
    if (!this.data.sumydprice || this.data.sumydprice <= 0)
      return wx.showToast({ title: "数据异常" }), !1;
    var t = this;
    wx.login({
      success: function (e) {
        var s = e.code;
        s
          ? wx.request({
              url: a.globalData.api + "wxzf.aspx",
              data: { code: s },
              header: { "content-type": "application/json" },
              success: function (a) {
                console.log(a.data);
                var e = a.data.split(",");
                t.setData({ openid: e[0] }),
                  console.log(t.data.openid),
                  t.generateOrder(t.data.openid);
              },
            })
          : console.log("获取用户登陆状态失败！");
      },
    });
  },
  generateOrder: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "get_ordernumber.ashx",
      data: { title: "DSC" },
      header: { "content-type": "application/json" },
      success: function (s) {
        console.log(s.data),
          e.setData({ xf_docno: s.data }),
          wx.request({
            url: a.globalData.api + "wxzfconfig.aspx",
            data: {
              openid: t,
              amount: e.data.sumydprice,
              xf_docno: e.data.xf_docno,
              salestypes: "线上预定," + e.data.userid,
            },
            header: { "content-type": "application/json" },
            success: function (a) {
              console.log(a.data), e.zf(a.data);
            },
            fail: function (a) {
              console.info(a),
                wx.showToast({
                  title: "数据异常",
                  icon: "error",
                  duration: 2e3,
                });
            },
          });
      },
    });
  },
  zf: function (a) {
    var t = this;
    console.log("发起支付"), console.log(a);
    var e = a.split(",");
    wx.requestPayment({
      timeStamp: e[0],
      nonceStr: e[1],
      package: e[2],
      signType: e[4],
      paySign: e[3],
      success: function (a) {
        console.log("success"), console.log(a), t.yfk();
      },
      fail: function (a) {
        console.log("fail"), console.log(a), t.dfk();
      },
    });
  },
  getremark: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({ remark: a.detail.value });
  },
  yfk: function () {
    wx.getStorageSync("vipcode") ||
      this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
      wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" }),
      console.log(this.data.sumydprice);
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_dfkskuyd.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: t.data.xf_plu,
        xf_price: t.data.realprice,
        xf_qty: t.data.qty,
        xf_amtsold: t.data.sumydprice,
        sumwlprice: 0,
        remark: t.data.remark,
        salestypes: "1",
        shtype: "",
        shid: "",
        tag: "1",
        xf_storecode: t.data.xf_storecode,
        salesman: t.data.salesman,
        pay_amtsold: t.data.sumydprice,
        xf_docno: t.data.xf_docno,
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
                  "&xf_docno=" +
                  a.data,
              })
            : wx.showToast({ title: "数据错误" });
      },
    });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/ydshop/index?xf_plu=" + a.currentTarget.dataset.xf_plu,
    });
  },
  dfk: function () {
    wx.getStorageSync("vipcode") ||
      this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
      wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" }),
      console.log(this.data.sumydprice);
    wx.request({
      url: a.globalData.api + "wx_dfkskuyd.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: this.data.xf_plu,
        xf_price: this.data.realprice,
        xf_qty: this.data.qty,
        xf_amtsold: this.data.sumydprice,
        sumwlprice: 0,
        remark: this.data.remark,
        salestypes: "1",
        shtype: "",
        shid: "",
        tag: "0",
        xf_storecode: this.data.xf_storecode,
        salesman: this.data.salesman,
        pay_amtsold: 0,
        xf_docno: this.data.xf_docno,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          "error" != a.data
            ? wx.redirectTo({
                url: "/pages/dfdeposityd/index/index?xf_docno=" + a.data,
              })
            : wx.showToast({ title: "数据错误" });
      },
    });
  },
});
