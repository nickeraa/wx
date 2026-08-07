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
    shid: '',
    shtype: '',
    stop: false,
    xstock: 0
  },
  back: function () {
    wx.navigateBack({
      delta: 0
    });
  },
  onLoad: function (a) {
    a.xf_docno && this.setData({
        xf_docno: a.xf_docno
      }),
      wx.getStorageSync("vipcode") ?
      this.setData({
        userid: wx.getStorageSync("vipcode")
      }) :
      this.setData({
        userid: wx.getStorageSync("wxuserid")
      }),
      console.log(this.data.xf_docno);
  },
  onShow: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listdfk.ashx",
      data: {
        xf_docno: t.data.xf_docno
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0 ?
          (t.setData({
              replu: a.data,
              sumydprice: a.data[0].XF_AMTSOLD,
              xf_docno: a.data[0].XF_DOCNO,
              xf_txdate: a.data[0].XF_TXDATE.replace(/T/g, ' '),
              xf_desci: a.data[0].XF_DESCI,
              remark: a.data[0].REMARK,
              salestypes: a.data[0].SALESTYPES,
              sorts: a.data[0].SORTS,
              shid: a.data[0].SHID,
              shtype: a.data[0].SHTYPE
            }),
            a.data[0].SUMXF_PRICE.toString().indexOf(".") >= 0 &&
            t.setData({
              xiaoshu: !0
            })) :
          t.setData({
            replu: null
          });
      },
    });
  },
  _paymentFail: function (msg) {
    wx.hideLoading();
    this.setData({ stop: false });
    wx.showToast({ title: msg, icon: "none", duration: 2000 });
  },
  payment: async function () {
    if (this.data.stop) return;
    wx.showLoading({ title: "连接中..." });
    this.setData({ stop: true });
    var that = this;
    var fail = function (msg) { that._paymentFail(msg); };

    // Step 1: 库存查询（校验所有商品）
    var replu = that.data.replu;
    if (!replu || replu.length === 0) {
      fail("无商品信息");
      return;
    }

    var stockChecks = replu.map(function (item) {
      return new Promise(function (resolve, reject) {
        wx.request({
          url: a.globalData.api + "wx_checkxstock.ashx",
          data: { xf_plu: item.XF_PLU },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          timeout: 10000,
          success: function (r) { resolve({ item: item, res: r }); },
          fail: function () { reject({ item: item }); },
        });
      });
    });

    var stockResults;
    try {
      stockResults = await Promise.all(stockChecks);
    } catch (errInfo) {
      var errName = (errInfo.item.XF_DESCI || errInfo.item.XF_PLU || "商品");
      if (errName.length > 12) errName = errName.slice(0, 12) + "…";
      fail(errName + " 库存查询失败");
      return;
    }

    for (var i = 0; i < stockResults.length; i++) {
      var sr = stockResults[i];
      var item = sr.item;
      var itemName = (item.XF_DESCI || item.XF_PLU || "该商品");
      if (itemName.length > 12) itemName = itemName.slice(0, 12) + "…";
      if (!Array.isArray(sr.res.data) || sr.res.data.length === 0 || !sr.res.data[0]) {
        wx.hideLoading();
        that.setData({ stop: false });
        wx.showModal({
          title: "提示",
          content: itemName + " 未获取到库存信息",
          showCancel: false,
          confirmText: "知道了",
        });
        return;
      }
      var xstock = parseInt(sr.res.data[0].XSTOCK) || 0;
      var qty = parseInt(item.XF_QTY) || 0;
      if (xstock < qty) {
        wx.hideLoading();
        that.setData({ stop: false, xstock: xstock });
        wx.showModal({
          title: "库存不足",
          content: itemName + "\n您订购" + qty + "件，当前库存仅剩" + xstock + "件",
          showCancel: false,
          confirmText: "知道了",
        });
        return;
      }
    }

    // Step 2: 微信登录
    var loginRes;
    try {
      loginRes = await new Promise(function (resolve, reject) {
        wx.login({
          success: function (r) { resolve(r); },
          fail: function () { reject(); },
        });
      });
    } catch (e) {
      fail("微信登录失败");
      return;
    }

    var code = loginRes.code;
    if (!code) {
      fail("获取用户登录状态失败");
      return;
    }

    // Step 3: 获取 openid
    var openidRes;
    try {
      openidRes = await new Promise(function (resolve, reject) {
        wx.request({
          url: a.globalData.api + "wxzf.aspx",
          data: { code: code },
          header: { "content-type": "application/json" },
          timeout: 10000,
          success: function (r) { resolve(r); },
          fail: function () { reject(); },
        });
      });
    } catch (e) {
      fail("支付配置获取失败");
      return;
    }

    if (!openidRes.data || typeof openidRes.data !== "string") {
      fail("支付配置异常");
      return;
    }
    var parts = openidRes.data.split(",");
    if (!parts[0]) {
      fail("支付参数异常");
      return;
    }

    wx.hideLoading();
    that.setData({ openid: parts[0] });
    that.generateOrder(parts[0]);
  },
  generateOrder: function (t) {
    var e = this;
    if (!t) {
      wx.showToast({ title: "下单失败，请重试", icon: "none", duration: 2000 });
      e.setData({ stop: false });
      return;
    }
    var amount = parseFloat(e.data.sumydprice);
    if (isNaN(amount) || amount <= 0) {
      wx.showToast({ title: "下单金额异常", icon: "none", duration: 2000 });
      e.setData({ stop: false });
      return;
    }
    wx.request({
      url: a.globalData.api + "wxzfconfig.aspx",
      data: {
        openid: t,
        amount: amount,
        xf_docno: e.data.xf_docno,
        salestypes: "线上预定," + (e.data.userid || ""),
      },
      header: {
        "content-type": "application/json"
      },
      timeout: 10000,
      success: function (res) {
        if (typeof res.data !== "string" || !res.data) {
          wx.showToast({ title: "支付配置返回为空", icon: "none", duration: 2000 });
          e.setData({ stop: false });
          return;
        }
        e.zf(res.data);
      },
      fail: function () {
        wx.showToast({ title: "下单失败，请重试", icon: "none", duration: 2000 });
        e.setData({ stop: false });
      },
    });
  },
  zf: function (payConfig) {
    var t = this;
    if (!payConfig || typeof payConfig !== "string") {
      wx.showToast({ title: "支付参数异常", icon: "none", duration: 2000 });
      t.setData({ stop: false });
      return;
    }
    var o = payConfig.split(",");
    if (o.length < 5 || !o[0] || !o[1] || !o[2] || !o[3] || !o[4]) {
      wx.showToast({ title: "支付参数不完整", icon: "none", duration: 2000 });
      t.setData({ stop: false });
      return;
    }
    wx.requestPayment({
      timeStamp: o[0],
      nonceStr: o[1],
      package: o[2],
      signType: o[4],
      paySign: o[3],
      success: function (res) {
        t.yfk(res.errMsg);
      },
      fail: function (err) {
        if (err && err.errMsg && err.errMsg.indexOf("cancel") === -1) {
          wx.showToast({
            title: "支付失败",
            icon: "error",
            duration: 2000
          });
        }
        t.setData({ stop: false });
      },
    });
  },
  yfk: function (k) {
    k = k || "requestPayment:ok";
    var vipcode = wx.getStorageSync("vipcode") || "";
    var wxuserid = wx.getStorageSync("wxuserid") || "";
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_qefkyd.ashx",
      data: {
        xf_vipcode: vipcode,
        wxuserid: wxuserid,
        xf_docno: t.data.xf_docno,
        xf_amtsold: t.data.sumydprice,
        sumwlprice: 0,
        shtype: t.data.shtype,
        shid: t.data.shid,
        tag: "1",
        pay_amtsold: t.data.sumydprice,
        pass: k
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (res.data === "error") {
          wx.showModal({
            title: "提示",
            content: "数据错误，IP已被记录",
            showCancel: false,
          });
          return;
        }
        wx.redirectTo({
          url: "/pages/fkcg/index/index?sorts=" +
            t.data.sorts +
            "&tag=3&xf_docno=" +
            t.data.xf_docno,
        });
      },
      fail: function () {
        wx.showModal({
          title: "提示",
          content: "支付确认失败，请检查订单状态或联系客服",
          showCancel: false,
        });
      },
      complete: function () {
        t.setData({ stop: false });
      },
    });
  },
});