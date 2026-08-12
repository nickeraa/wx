var app = getApp();
require("../../../utils/util.js");
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    banner: app.globalData.imgUrl,
    scimgurl: app.globalData.scimgurl,
    flag: false,
    xf_plu: "",
    xf_desci: "",
    replu: [],
    ck: 0,
    setype: "0",
    flags: false,
    ret: [],
    address1: "",
    address2: "",
    phone: "",
    body: "",
    qty: 1,
    sumprice: 0,
    realprice: 0,
    wlprice: 0,
    sumrealprice: 0,
    dpid: "",
    id: "",
    amount: 0,
    remark: "",
    xf_storecode: "",
    salesman: "",
    types: "",
    grade: "",
    salestypes: "",
    salestypeswx: "",
    xishu: 0,
    xiaoshu: false,
    xf_docno: "",
    userid: "",
    yk: false,
    tag: "",
    tags: false,
    fg: 0,
    sumydprice: 0,
    yd_amtsold: 0,
    sorts: "",
    stop: false,
    xstock: 0

  },
  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  jia: function () {
    var n = this.data.qty + 1;
    if (n > 999) {
      wx.showToast({ title: '已超过最大数量', icon: 'none' });
      return;
    }
    if (this.data.xstock > 0 && n > this.data.xstock) {
      wx.showToast({ title: '超出库存数量', icon: 'none' });
      return;
    }
    this.setData({
      qty: n,
      sumprice: this.data.realprice * n,
      sumrealprice: this.data.realprice * n,
      sumydprice: this.data.yd_amtsold * n,
    });
  },
  jian: function () {
    if (this.data.qty === 1) {
      wx.showToast({ title: "不能少于1", icon: "error", duration: 1000 });
      return;
    }
    var n = this.data.qty - 1;
    this.setData({
      qty: n,
      sumprice: this.data.realprice * n,
      sumrealprice: this.data.realprice * n,
      sumydprice: this.data.yd_amtsold * n,
    });
  },
  showModal: function (e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      flags: true
    });
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_alladdress.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        res.data && res.data.length > 0 ?
          that.setData({
            ret: res.data
          }) :
          that.setData({
            ret: []
          });
      },
      fail: function () {
        that.setData({ ret: [] });
      },
    });
  },
  hideModal: function () {
    this.setData({
      modalName: null,
      flags: false
    });
  },
  add: function () {
    wx.navigateTo({
      url: "/pages/addsh/index/index"
    });
  },
  edit: function (e) {
    wx.navigateTo({
      url: "/pages/editadd/index/index?id=" + encodeURIComponent(e.currentTarget.dataset.id),
    });
  },
  checkboxChange: function (e) {
    this.setData({
      address1: e.currentTarget.dataset.address1,
      address2: e.currentTarget.dataset.address2,
      phone: e.currentTarget.dataset.phone,
      body: e.currentTarget.dataset.body,
      ck: e.currentTarget.dataset.id,
      id: e.currentTarget.dataset.id,
    });
    "1" == e.currentTarget.dataset.tag ?
      this.setData({ tags: false }) :
      this.setData({ tags: true });
    this.hideModal();
    this.sewlprice();
  },
  sewlprice: function () {
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_sewlprice.ashx",
      data: {
        id: that.data.id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (res.data && res.data.length > 0 && res.data[0]) {
          var wl = parseFloat(res.data[0].WLPRICE) || 0;
          that.setData({ wlprice: wl * that.data.xishu });
        } else {
          that.setData({ wlprice: 0 });
        }
      },
      fail: function () {
        that.setData({ wlprice: 0 });
      },
    });
  },
  onLoad: function (options) {
    if (options.xf_plu) this.setData({ xf_plu: options.xf_plu });
    if (options.address1) this.setData({ address1: options.address1 });
    if (options.address2) this.setData({ address2: options.address2 });
    if (options.telphone) this.setData({ telphone: options.telphone });
    if (options.id) this.setData({ id: options.id });
    this.setData({
      userid: wx.getStorageSync("vipcode") || wx.getStorageSync("wxuserid")
    });
  },
  radioChange1: function (e) {
    this.setData({ yk: false, setype: e.detail.value });
    "0" == this.data.setype ? this.address() : "1" == this.data.setype && this.store();
  },
  store: function () {
    if (!wx.getStorageSync("vipcode") && this.data.setype == '1') {
      this.setData({ yk: true });
    }
    this.setData({
      wlprice: 0,
      sumprice: this.data.sumrealprice
    });
    if (!wx.getStorageSync("vipcode"))
      return this.destore(), false;

    var that = this;
    wx.request({
      url: app.globalData.api + "wx_sestoreaddr.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        res.data && res.data.length > 0 && res.data[0] ?
          that.setData({
            address1: res.data[0].ADDRESS1,
            address2: res.data[0].ADDRESS2,
            telphone: res.data[0].TELPHONE,
            dpid: res.data[0].ID,
            fg: 1,
            yk: false,
            flag: true,
          }) :
          that.destore();
      },
      fail: function () {
        that.destore();
      },
    });
  },
  destore: function () {
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_deaddr.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (res.data && res.data.length > 0 && res.data[0]) {
          that.setData({
            address1: res.data[0].ADDRESS1,
            address2: res.data[0].ADDRESS2,
            telphone: res.data[0].TELPHONE,
            dpid: res.data[0].ID,
            fg: 1,
            flag: true,
          });

          if (res.data[0].ADDRESS1 == '广天藏品深圳办公室') {
            that.setData({ yk: true });
          } else {
            that.setData({ yk: false });
          }
        }
      },
      fail: function () {
        that.setData({ flag: false });
      },
    });
  },
  address: function () {
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_address.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that.data.xf_plu,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (res.data && res.data.length > 0 && res.data[0]) {
          that.setData({
            address1: res.data[0].ADDRESS1,
            address2: res.data[0].ADDRESS2,
            phone: res.data[0].PHONE,
            body: res.data[0].BODY,
            tag: res.data[0].TAG,
            ck: res.data[0].ID,
            wlprice: (res.data[0].WLPRICE || 0) * that.data.xishu,
            sumprice: Number((parseFloat(that.data.sumprice || 0) + parseFloat(res.data[0].WLPRICE || 0)).toFixed(2)),
            flag: true,
            salestypes: res.data[0].SALESTYPES,
            xf_storecode: res.data[0].XF_STORECODE,
            salesman: res.data[0].SALESMAN,
            grade: res.data[0].GRADE,
          });
          "1" == res.data[0].TAG ?
            that.setData({ tags: false }) :
            that.setData({ tags: true });
        } else {
          that.setData({ flag: false });
        }
      },
      fail: function () { that.setData({ flag: false }); },
    });
  },
  onShow: function () {
    this.setData({ stop: false });
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_listyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that.data.xf_plu,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (res.data && res.data.length > 0 && res.data[0]) {
          var realprice = parseFloat(res.data[0].REALPRICE) || 0;
          that.setData({
            replu: res.data,
            sumprice: realprice,
            realprice: realprice,
            xishu: res.data[0].XISHU || 0,
            sumrealprice: realprice,
            xf_desci: res.data[0].XF_DESCI || "",
            yd_amtsold: parseFloat(res.data[0].YD_AMTSOLD) || 0,
            sumydprice: parseFloat(res.data[0].YD_AMTSOLD) || 0,
            xf_storecode: res.data[0].XF_STORECODE || "",
            salesman: res.data[0].SALESMAN || "",
            grade: res.data[0].GRADE || "",
            sorts: res.data[0].SORTS || "",
          });
          that.data.sumprice.toString().indexOf(".") >= 0 &&
            that.setData({ xiaoshu: true });
        } else {
          that.setData({ replu: [] });
          wx.showModal({
            title: "提示",
            content: "商品信息加载失败",
            showCancel: false
          });
        }
        "0" == that.data.setype && that.address();
        that._loadStock();
      },
      fail: function () {
        that.setData({ replu: [] });
        wx.showModal({
          title: "提示",
          content: "商品信息加载失败",
          showCancel: false
        });
      },
    });
  },
  // 页面加载时获取库存，使 jia() 的库存上限校验即时生效
  _loadStock: function () {
    var that = this;
    if (!that.data.xf_plu) return;
    wx.request({
      url: app.globalData.api + "wx_checkxstock.ashx",
      data: { xf_plu: that.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (res.data && Array.isArray(res.data) && res.data.length > 0 && res.data[0]) {
          var stock = Number(res.data[0].XSTOCK || 0);
          if (!isNaN(stock)) that.setData({ xstock: stock });
        }
      },
      fail: function () {},
    });
  },
  payment: function () {
    var that = this;
    if (that.data.stop) return;
    wx.showLoading({ title: '连接中...' });
    this.setData({ stop: true });
    wx.request({
      url: app.globalData.api + "wx_checkxstock.ashx",
      data: { xf_plu: this.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        // 校验响应数据结构
        if (!res.data || !Array.isArray(res.data) || res.data.length === 0 || !res.data[0]) {
          wx.hideLoading();
          that.setData({ stop: false });
          wx.showToast({ title: "库存查询异常", icon: "none" });
          return;
        }
        var xstock = Number(res.data[0].XSTOCK || 0);
        that.setData({ xstock: xstock });

        wx.hideLoading();

        // 售罄处理
        if (xstock <= 0) {
          wx.showModal({
            title: "提示",
            content: "已订完，数量为零",
            showCancel: false,
          });
          that.setData({ stop: false });
          return;
        }
        // 下单数量超出库存
        if (that.data.qty > xstock) {
          that.setData({ stop: false });
          wx.showModal({
            title: "提示",
            content: "下单数量超出库存，当前库存：" + xstock,
            showCancel: false,
          });
          return;
        }
        // 未填收货地址 → 跳转添加
        if (!that.data.flag && that.data.setype == '0') {
          that.setData({ stop: false });
          that.add();
          return;
        }
        // 金额校验
        if (!that.data.sumprice || that.data.sumprice <= 0) {
          that.setData({ stop: false });
          wx.showToast({ title: "数据异常", icon: "none" });
          return;
        }

        wx.login({
          success: function (loginRes) {
            var s = loginRes.code;
            if (s) {
              wx.request({
                url: app.globalData.api + "wxzf.aspx",
                data: { code: s },
                header: { "content-type": "application/json" },
                timeout: 10000,
                success: function (zfRes) {
                  if (!zfRes.data || typeof zfRes.data !== "string") {
                    wx.hideLoading();
                    that.setData({ stop: false });
                    wx.showToast({ title: "支付初始化失败", icon: "error" });
                    return;
                  }
                  var parts = zfRes.data.split(",");
                  that.setData({ openid: parts[0] || "" });
                  // 同步写入 storage，供 _submitOrder 提交订单时使用
                  if (parts[0]) {
                    wx.setStorageSync("openid", parts[0]);
                  }
                  that.generateOrder(that.data.openid);
                },
                fail: function () {
                  wx.hideLoading();
                  that.setData({ stop: false });
                  wx.showToast({ title: "支付初始化失败", icon: "error" });
                },
              });
            } else {
              wx.hideLoading();
              that.setData({ stop: false });
              wx.showToast({ title: "获取用户登陆状态失败！", icon: "error" });
            }
          },
          fail: function () {
            wx.hideLoading();
            that.setData({ stop: false });
            wx.showToast({ title: "登录失败", icon: "error" });
          },
        });
      },
      fail: function () {
        wx.hideLoading();
        that.setData({ stop: false });
        wx.showToast({ title: "库存查询失败", icon: "error" });
      },
    });
  },
  generateOrder: function (openid) {
    var that = this;
    wx.request({
      url: app.globalData.api + "get_ordernumber.ashx",
      data: { title: "DSC" },
      header: { "content-type": "application/json" },
      timeout: 10000,
      success: function (res) {
        if (!res.data || typeof res.data !== "string" || res.data.trim() === "") {
          that.setData({ stop: false });
          wx.showToast({ title: "订单号获取异常", icon: "error", duration: 2000 });
          return;
        }
        that.setData({ xf_docno: res.data });
        wx.request({
          url: app.globalData.api + "wxzfconfig.aspx",
          data: {
            openid: openid,
            amount: that.data.sumydprice,
            xf_docno: that.data.xf_docno,
            salestypes: "线上预定," + that.data.userid,
          },
          header: { "content-type": "application/json" },
          timeout: 10000,
          success: function (cfgRes) {
            that.zf(cfgRes.data);
          },
          fail: function () {
            that.setData({ stop: false });
            wx.showToast({ title: "数据异常", icon: "error", duration: 2e3 });
          },
        });
      },
      fail: function () {
        that.setData({ stop: false });
        wx.showToast({ title: "生成订单失败", icon: "error", duration: 2e3 });
      },
    });
  },
  zf: function (cfg) {
    var that = this;

    wx.hideLoading();

    if (!cfg || typeof cfg !== "string") {
      that.setData({ stop: false });
      wx.showToast({ title: "支付参数异常，请重试", icon: "error", duration: 2000 });
      return;
    }

    var parts = cfg.split(",");

    if (parts.length < 5 || !parts[0] || !parts[1] || !parts[2] || !parts[3] || !parts[4]) {
      that.setData({ stop: false });
      wx.showToast({ title: "支付参数不完整，请重试", icon: "error", duration: 2000 });
      return;
    }

    wx.requestPayment({
      timeStamp: parts[0],
      nonceStr: parts[1],
      package: parts[2],
      signType: parts[4],
      paySign: parts[3],
      success: function (res) {
        wx.hideLoading();
        if ("requestPayment:ok" === res.errMsg) {
          that.yfk(res.errMsg);
        } else {
          that.setData({ stop: false });
        }
      },
      fail: function (res) {
        wx.hideLoading();
        if (res.errMsg && res.errMsg.indexOf("cancel") !== -1) {
          // 用户主动取消支付：提示后停留本页，可重新发起
          that.setData({ stop: false });
          wx.showModal({
            title: "提示",
            content: "您已取消支付，订单未提交，可重新发起支付",
            showCancel: false,
            confirmText: "知道了",
          });
        } else {
          // 支付失败：提示确认后保存为待付款订单并跳转
          that.setData({ stop: false });
          wx.showModal({
            title: "支付失败",
            content: "支付未完成，订单将保存为待付款，可稍后继续支付",
            showCancel: false,
            confirmText: "查看订单",
            success: function () {
              that.dfk(res.errMsg);
            },
          });
        }
      },
    });
  },
  getremark: function (e) {
    this.setData({ remark: e.detail.value });
  },
  _submitOrder: function (tag, payAmtsold, successUrl, pass) {
    var that = this;
    var id = that.data.setype === "0" ? that.data.ck : that.data.dpid;

    var updateData = { id: id };
    if (!wx.getStorageSync("vipcode")) {
      Object.assign(updateData, { xf_vipcode: "", xf_storecode: "", salesman: "" });
    }
    if (!wx.getStorageSync("wxuserid")) {
      updateData.wxuserid = "";
    }
    that.setData(updateData);

    wx.request({
      url: app.globalData.api + "wx_dfkskuyd.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that.data.xf_plu,
        xf_price: that.data.realprice,
        xf_qty: that.data.qty,
        xf_amtsold: that.data.sumydprice,
        sumwlprice: 0,
        remark: that.data.remark,
        salestypes: "1",
        shtype: that.data.setype,
        shid: id,
        tag: tag,
        xf_storecode: that.data.xf_storecode,
        salesman: wx.getStorageSync('yguserid'),
        pay_amtsold: payAmtsold,
        xf_docno: that.data.xf_docno,
        pass: pass,
        openid :wx.getStorageSync('openid')
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (res.data && res.data !== "error") {
          wx.redirectTo({
            url: successUrl + encodeURIComponent(res.data),
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "数据错误，IP已被记录",
            showCancel: false,
          });
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "提交失败", icon: "error" });
      },
    });
  },
  yfk: function (k) {
    this._submitOrder("1", this.data.sumydprice, "/pages/fkcg/index/index?tag=3&sorts=" + encodeURIComponent(this.data.sorts) + "&xf_docno=", k);
  },
  dfk: function (k) {
    this._submitOrder("0", 0, "/pages/dfdeposityd/index/index?xf_docno=", k);
  },
  selectsku: function (e) {
    wx.navigateTo({
      url: "/pages/ydshop/index?xf_plu=" + encodeURIComponent(e.currentTarget.dataset.xf_plu),
    });
  },

});