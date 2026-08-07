var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    xf_txdate: "",
    replu: [],
    sumprice: 0,
    address1: "",
    address2: "",
    phone: "",
    body: "",
    salestypes: "",
    sorts: "",
    xf_docno: "",
    shtype: "",
    shid: "",
    shtypename: "",
    sumwlprice: 0,
    xf_plu: "",
    remark: "",
    xf_desci: "",
    sumrealprice: 0,
    xiaoshu: !1,
    userid: "",
    openid: "",
    wxuserid: "",
    yk: false,
    stop: false,
    xf_qty: 0,
    xstock: 0
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  selectsku: function () {},
  onLoad: function (a) {
    var docno = (a.xf_docno || "").trim();
    if (!docno) {
      wx.showToast({ title: "订单号缺失", icon: "none", duration: 2000 });
      setTimeout(function () { wx.navigateBack({ delta: 1 }); }, 1500);
      return;
    }
    this.setData({ xf_docno: docno });

    var vipcode = wx.getStorageSync("vipcode");
    this.setData({
      userid: vipcode || wx.getStorageSync("wxuserid")
    });
  },
  address: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_listaddress.ashx",
      data: {
        id: t
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (!Array.isArray(res.data) || res.data.length === 0) {
          e.setData({ address1: "", address2: "", body: "", phone: "" });
          return;
        }
        var addr = res.data[0];
        e.setData({
          address1: addr.ADDRESS1 || "",
          address2: addr.ADDRESS2 || "",
          body: addr.BODY || "",
          phone: addr.PHONE || "",
        });
      },
      fail: function () {
        wx.showToast({ title: "地址加载失败", icon: "none", duration: 2000 });
      },
    });
  },
  onShow: function () {
    this.setData({ stop: false, yk: false });

    if (!wx.getStorageSync("vipcode")) {
      this.setData({ yk: true });
    }

    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listdfk.ashx",
      data: {
        xf_docno: t.data.xf_docno,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (!Array.isArray(res.data) || res.data.length === 0) {
          t.setData({ replu: [], xiaoshu: false });
          return;
        }
        var item = res.data[0];
        var sumprice = (parseFloat(item.XF_AMTSOLD) || 0) + (parseFloat(item.SUMWLPRICE) || 0);
        var isExpress = String(item.SHTYPE) === "0";
        t.setData({
          replu: res.data,
          shtype: item.SHTYPE,
          sumrealprice: item.XF_AMTSOLD,
          xf_docno: item.XF_DOCNO,
          xf_txdate: (item.XF_TXDATE || "").replace(/T/g, " "),
          sumwlprice: item.SUMWLPRICE || 0,
          xf_desci: item.XF_DESCI || "",
          remark: item.REMARK || "",
          salestypes: item.SALESTYPES || "",
          sorts: item.SORTS || "",
          shid: item.SHID || "",
          xf_qty: item.XF_QTY || 0,
          xf_plu: item.XF_PLU || "",
          sumprice: sumprice,
          xiaoshu: sumprice % 1 !== 0,
          shtypename: isExpress ? "快递运输" : "到店取货",
        });
        if (isExpress) {
          t.address(item.SHID);
        } else {
          t.store(item.SHID);
        }
      },
      fail: function () {
        wx.showToast({ title: "订单信息加载失败", icon: "none", duration: 2000 });
      },
    });
  },
  store: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_liststore.ashx",
      data: {
        id: t
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (!Array.isArray(res.data) || res.data.length === 0) {
          e.setData({ address1: "", address2: "", phone: "" });
          return;
        }
        var addr = res.data[0];
        e.setData({
          address1: addr.ADDRESS1 || "",
          address2: addr.ADDRESS2 || "",
          phone: addr.TELPHONE || "",
        });
      },
      fail: function () {
        wx.showToast({ title: "店铺信息加载失败", icon: "none", duration: 2000 });
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

    that.setData({ xstock: parseInt(stockResults[0].res.data[0].XSTOCK) || 0 });

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

    // 参数校验：openid 和 amount 不能为空
    if (!t) {
      wx.showToast({ title: "下单失败，请重试", icon: "none", duration: 2000 });
      e.setData({ stop: false });
      return;
    }
    var amount = parseFloat(e.data.sumprice);
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
        salestypes: "线上销售," + (e.data.userid || ""),
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
    var parts = payConfig.split(",");
    if (parts.length < 5 || !parts[0] || !parts[1] || !parts[2] || !parts[3] || !parts[4]) {
      wx.showToast({ title: "支付参数不完整", icon: "none", duration: 2000 });
      t.setData({ stop: false });
      return;
    }
    wx.requestPayment({
      timeStamp: parts[0],
      nonceStr: parts[1],
      package: parts[2],
      signType: parts[4],
      paySign: parts[3],
      success: function (res) {
        t.yfk(res.errMsg);
      },
      fail: function (err) {
        // 用户主动取消不弹错误提示
        if (err && err.errMsg && err.errMsg.indexOf("cancel") === -1) {
          wx.showToast({
            title: "支付失败",
            icon: "error",
            duration: 2000
          });
        }
        t.setData({ stop: false });
      }
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
        xf_amtsold: t.data.sumrealprice,
        sumwlprice: t.data.sumwlprice,
        shtype: t.data.shtype,
        shid: t.data.shid,
        tag: "1",
        pay_amtsold: t.data.sumprice,
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
            "&tag=1&xf_docno=" +
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
      }
    });
  },
});