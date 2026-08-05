var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    scimgurl: a.globalData.scimgurl,
    flag: false,
    xf_plu: "",
    xf_desci: "",
    replu: [],
    ck: "",
    setype: "0",
    flags: false,
    ret: [],
    address1: "",
    address2: "",
    phone: "",
    body: "",
    tag: "",
    tags: false,
    qty: 1,
    sumprice: 0,
    realprice: 0,
    wlprice: 0,
    sumrealprice: 0,
    dpid: "",
    id: "",
    fg: 0,
    amount: 0,
    remark: "",
    xf_storecode: "",
    salesman: "",
    types: "",
    grade: "",
    salestypes: "",
    salestypeswx: "",
    xishu: 0,
    sorts: "",
    xf_docno: "",
    userid: "",
    yk: false,
    stop: false,
    xstock: 0
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  jia: function () {
    if (!this.data.realprice) {
      wx.showToast({ title: '商品价格加载中', icon: 'none' });
      return;
    }
    var newQty = this.data.qty + 1;
    if (newQty > 999) {
      wx.showToast({ title: '已超过最大数量', icon: 'none' });
      return;
    }
    if (this.data.xstock > 0 && newQty > this.data.xstock) {
      wx.showToast({ title: '超出库存数量', icon: 'none' });
      return;
    }
    var newSumprice = Number((this.data.realprice * newQty + this.data.wlprice).toFixed(2));
    this.setData({
      qty: newQty,
      sumprice: newSumprice,
      sumrealprice: Number((this.data.realprice * newQty).toFixed(2)),
    });
  },
  jian: function () {
    if (this.data.qty === 1) {
      wx.showToast({
        title: "不能少于1",
        icon: "error",
        duration: 1000
      });
      return;
    }
    var newQty = this.data.qty - 1;
    var newSumprice = Number((this.data.realprice * newQty + this.data.wlprice).toFixed(2));
    this.setData({
      qty: newQty,
      sumprice: newSumprice,
      sumrealprice: Number((this.data.realprice * newQty).toFixed(2)),
    });
  },
  showModal: function (t) {
    this.setData({
      modalName: t.currentTarget.dataset.target,
      flags: true
    });
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_alladdress.ashx",
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
        var list = res.data;
        if (Array.isArray(list) && list.length > 0) {
          e.setData({ ret: list });
        } else {
          e.setData({ ret: [] });
        }
      },
      fail: function () {
        wx.showToast({
          title: "获取地址失败",
          icon: "none",
          duration: 1500,
        });
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
  edit: function (a) {
    wx.navigateTo({
      url: "/pages/editadd/index/index?id=" + a.currentTarget.dataset.id,
    });
  },
  checkboxChange: function (a) {
    this.setData({
      address1: a.currentTarget.dataset.address1,
      address2: a.currentTarget.dataset.address2,
      phone: a.currentTarget.dataset.phone,
      body: a.currentTarget.dataset.body,
      ck: a.currentTarget.dataset.id,
      id: a.currentTarget.dataset.id,
    });
    if (a.currentTarget.dataset.tag === "1") {
      this.setData({ tags: false });
    } else {
      this.setData({ tags: true });
    }
    this.hideModal();
    this.sewlprice();
  },
  sewlprice: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_sewlprice.ashx",
      data: {
        id: t.data.id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        if (a.data && Array.isArray(a.data) && a.data.length > 0 && a.data[0].WLPRICE !== undefined) {
          var newWlprice = Number((parseFloat(a.data[0].WLPRICE || 0) * (t.data.xishu || 0)).toFixed(2));
          var newSumprice = Number((t.data.realprice * t.data.qty + newWlprice).toFixed(2));
          t.setData({
            wlprice: newWlprice,
            sumprice: newSumprice,
          });
        }
      },
      fail: function () {
        wx.showToast({ title: "运费查询失败", icon: "none" });
      },
    });
  },
  onLoad: function (options) {
    var updateData = {
      userid: wx.getStorageSync("vipcode") || wx.getStorageSync("wxuserid") || "",
    };
    if (options.xf_plu) updateData.xf_plu = options.xf_plu;
    if (options.address1) updateData.address1 = options.address1;
    if (options.address2) updateData.address2 = options.address2;
    if (options.telphone) updateData.telphone = options.telphone;
    if (options.id) updateData.id = options.id;
    this.setData(updateData);
  },
  radioChange1: function (a) {

    var newSetype = a.detail.value;
    this.setData({
      setype: newSetype,
    });

    if (newSetype === "0") {
      this.address();
    } else if (newSetype === "1") {
      this.store();
    }

  },
  sestore: function () {
    wx.navigateTo({
      url: "/pages/store/index/index?dpid=" + (this.data.dpid || ""),
      fail: function () {
        wx.showToast({
          title: "页面跳转失败",
          icon: "none",
          duration: 1500,
        });
      },
    });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/shopcg/goods/index?xf_plu=" + (a.currentTarget.dataset.XF_PLU || ""),
      fail: function () {
        wx.showToast({
          title: "页面跳转失败",
          icon: "none",
          duration: 1500,
        });
      },
    });
  },
  store: function () {
    var vipcode = wx.getStorageSync("vipcode");

    this.setData({
      wlprice: 0,
      sumprice: this.data.sumrealprice,
    });

    if (!vipcode) {
      if (this.data.setype === "1") {
        this.setData({ yk: true });
      }
      this.destore();
      return;
    }

    var t = this;
    wx.request({
      url: a.globalData.api + "wx_sestoreaddr.ashx",
      method: "POST",
      data: { vipcode: vipcode },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (Array.isArray(res.data) && res.data.length > 0) {
          t.setData({
            flag: true,
            yk: false,
            address1: res.data[0].ADDRESS1,
            address2: res.data[0].ADDRESS2,
            telphone: res.data[0].TELPHONE,
            dpid: res.data[0].ID,
            fg: 1,
          });
        } else {
          t.destore();
        }
      },
      fail: function () {
        wx.showToast({ title: "门店信息加载失败", icon: "none" });
        t.setData({ flag: false, wlprice: 0 });
      },
    });
  },


  destore: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_deaddr.ashx",
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (!Array.isArray(res.data) || res.data.length === 0) {
          t.setData({ flag: false });
          wx.showToast({ title: "默认地址获取失败", icon: "none" });
          return;
        }
        var item = res.data[0];
        t.setData({
          flag: true,
          address1: item.ADDRESS1 || "",
          address2: item.ADDRESS2 || "",
          telphone: item.TELPHONE || "",
          dpid: item.ID || "",
          fg: 1,
        // NOTE: yk（到店可取）依赖地址名称判断，若地址库变更需同步修改
          yk: item.ADDRESS1 === "广天藏品深圳办公室",
        });
      },
      fail: function () {
        wx.showToast({ title: "默认地址加载失败", icon: "none" });
        t.setData({ flag: false, wlprice: 0 });
      },
    });
  },
  
address: function () {
  var t = this;
  wx.request({
    url: a.globalData.api + "wx_address.ashx",
    method: "POST",
    data: {
      vipcode: wx.getStorageSync("vipcode"),
      wxuserid: wx.getStorageSync("wxuserid"),
      xf_plu: t.data.xf_plu,
    },
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    dataType: "json",
    timeout: 10000,
    success: function (res) {
      if (!Array.isArray(res.data) || res.data.length === 0) {
        t.setData({ flag: false });
        return;
      }
      var item = res.data[0];
      var realPrice = t.data.sumrealprice || 0;
      var wlFee = parseFloat(item.WLPRICE || 0) * (t.data.xishu || 0);
      t.setData({
        address1: item.ADDRESS1,
        address2: item.ADDRESS2,
        // phone: 快递地址收件人电话；telphone: 到店取货门店电话，两个字段互不干扰
        phone: item.PHONE,
        body: item.BODY,
        tag: item.TAG,
        ck: item.ID,
        wlprice: Number(wlFee.toFixed(2)),
        sumprice: Number((realPrice + wlFee).toFixed(2)),
        flag: true,
        tags: item.TAG !== "1",
        salestypes: item.SALESTYPES,
        xf_storecode: item.XF_STORECODE,
        salesman: item.SALESMAN,
        grade: item.GRADE,
      });
    },
    fail: function () {
      wx.showToast({ title: "地址加载失败", icon: "none" });
      t.setData({ flag: false });
    },
  });
},
// --------------------------

onShow: function () {
  this.setData({ stop: false });
  var t = this;
  wx.request({
    url: a.globalData.api + "wx_listsc.ashx",
    data: {
      vipcode: wx.getStorageSync("vipcode"),
      wxuserid: wx.getStorageSync("wxuserid"),
      xf_plu: t.data.xf_plu,
    },
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    dataType: "json",
    timeout: 10000,
    success: function (res) {
      if (!Array.isArray(res.data) || res.data.length === 0) {
        t.setData({
          replu: [],
          sumprice: 0,
          realprice: 0,
          sumrealprice: 0,
          wlprice: 0,
        });
        t.data.setype === "0" && t.address();
        return;
      }
      var item = res.data[0];
      var perUnitPrice = parseFloat(item.REALPRICE || 0);
      var total = Number((perUnitPrice * t.data.qty).toFixed(2));
      t.setData({
        replu: res.data,
        sumprice: total,
        realprice: perUnitPrice,
        sumrealprice: total,
        xishu: item.XISHU || 0,
        xf_desci: item.XF_DESCI || "",
        sorts: item.SORTS || "",
        grade: item.GRADE || "",
      });
      t.data.setype === "0" && t.address();
      t._loadStock();
    },
    fail: function () {
      t.setData({ replu: [], sumprice: 0, realprice: 0, sumrealprice: 0, wlprice: 0 });
      wx.showToast({ title: "商品信息加载失败", icon: "none" });
    },
  });
},

// 页面加载时获取库存，使 jia() 的库存上限校验即时生效
_loadStock: function () {
  var t = this;
  if (!t.data.xf_plu) return;
  wx.request({
    url: a.globalData.api + "wx_checkxstock.ashx",
    data: { xf_plu: t.data.xf_plu },
    header: { "content-type": "application/x-www-form-urlencoded" },
    dataType: "json",
    timeout: 10000,
    success: function (res) {
      if (res.data && Array.isArray(res.data) && res.data.length > 0 && res.data[0]) {
        var stock = Number(res.data[0].XSTOCK || 0);
        if (!isNaN(stock)) t.setData({ xstock: stock });
      }
    },
    fail: function () {},
  });
},

  payment: function () {
    var that = this;

    // 1. 防重复提交：提交中则直接返回
    if (that.data.stop) return;

    wx.showLoading({
      title: "连接中…",
      mask: true,
    });
    that.setData({ stop: true });

    wx.request({
      url: a.globalData.api + "wx_checkxstock.ashx",
      data: {
        xf_plu: that.data.xf_plu,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
      },
      timeout: 10000,
      success: function (res) {
        // 2. 校验响应数据结构
        if (!res.data || !Array.isArray(res.data) || res.data.length === 0) {
          wx.hideLoading();
          that.setData({ stop: false });
          wx.showToast({ title: "库存查询异常", icon: "error", duration: 2000 });
          return;
        }

        // 3. 用局部变量存储库存值，避免 setData 异步竞态
        var xstock = Number(res.data[0].XSTOCK || 0);
        that.setData({ xstock: xstock });
        wx.hideLoading();

        // 4. 售罄处理
        if (xstock <= 0) {
          wx.showModal({
            title: "提示",
            content: "已售罄，数量为零",
            showCancel: false,
            success: function () {
              wx.navigateBack({ delta: 1 });
            },
          });
          that.setData({ stop: false });
          return;
        }

        // 5. 下单数量 > 库存数量，拦截并提示
        if (that.data.qty > xstock) {
          that.setData({ stop: false });
          wx.showModal({
            title: "提示",
            content: "下单数量超出库存，当前库存：" + xstock,
            showCancel: false,
          });
          return;
        }

        // 6. 未填收货地址 → 跳转添加
        if ((!that.data.flag || !that.data.address1) && that.data.setype == "0") {
          that.setData({ stop: false });
          that.add();
          return;
        }

        // 7. 金额校验
        if (that.data.sumprice <= 0) {
          that.setData({ stop: false });
          wx.showToast({ title: "订单金额异常", icon: "error", duration: 2000 });
          return;
        }

        // 8. 重新显示 Loading，进入登录 & 支付流程
        wx.showLoading({ title: "正在处理…", mask: true });

        wx.login({
          success: function (loginRes) {
            var code = loginRes.code;
            if (!code) {
              wx.hideLoading();
              that.setData({ stop: false });
              wx.showToast({ title: "登录验证失败", icon: "error", duration: 2000 });
              return;
            }

            wx.request({
              url: a.globalData.api + "wxzf.aspx",
              data: { code: code },
              header: { "content-type": "application/json" },
              timeout: 10000,
              success: function (openidRes) {
                var parts = (openidRes.data || "").split(",");

                // 9. 校验 openid 返回值
                if (!parts[0]) {
                  wx.hideLoading();
                  that.setData({ stop: false });
                  wx.showToast({ title: "用户数据异常", icon: "error", duration: 2000 });
                  return;
                }

                that.setData({ openid: parts[0] });

                // 10. 进入下单支付
                that.generateOrder(parts[0]);
              },
              fail: function () {
                wx.hideLoading();
                that.setData({ stop: false });
                wx.showToast({ title: "网络异常，请重试", icon: "error", duration: 2000 });
              },
            });
          },
          fail: function () {
            wx.hideLoading();
            that.setData({ stop: false });
            wx.showToast({ title: "登录失败，请重试", icon: "error", duration: 2000 });
          },
        });
      },
      fail: function () {
        wx.hideLoading();
        that.setData({ stop: false });
        wx.showToast({ title: "网络异常，请重试", icon: "error", duration: 2000 });
      },
    });
  },

  generateOrder: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "get_ordernumber.ashx",
      data: { title: "SSC" },
      header: { "content-type": "application/json" },
      timeout: 10000,
      success: function (s) {
        // 校验订单号
        var docno = s.data;
        if (!docno || typeof docno !== "string" || docno.trim() === "") {
          wx.hideLoading();
          e.setData({ stop: false });
          wx.showToast({ title: "订单号获取异常", icon: "error", duration: 2000 });
          return;
        }
        e.setData({ xf_docno: docno });

        wx.request({
          url: a.globalData.api + "wxzfconfig.aspx",
          data: {
            openid: t,
            amount: e.data.sumprice,
            xf_docno: docno,
            salestypes: "线上销售," + e.data.userid,
          },
          header: { "content-type": "application/json" },
          timeout: 10000,
          success: function (a) {
            // hideLoading 已在 zf() 中调用，避免重复
            e.zf(a.data);
          },
          fail: function () {
            wx.hideLoading();
            e.setData({ stop: false });
            wx.showToast({ title: "数据异常", icon: "error", duration: 2000 });
          },
        });
      },
      fail: function () {
        wx.hideLoading();
        e.setData({ stop: false });
        wx.showToast({ title: "网络异常", icon: "error", duration: 2000 });
      },
    });
  },
  /**
 * 发起微信支付，解析后端返回的逗号分隔支付参数并调用微信支付接口
 * 后端返回顺序: timeStamp,nonceStr,package,paySign,signType
 * @param {string} a - 后端 wxzfconfig.aspx 返回的逗号分隔支付参数字符串，格式为 "timeStamp,nonceStr,package,paySign,signType"
 * @returns {void} 无返回值，支付结果通过 success/fail 回调处理
 */
zf: function (a) {
    var t = this;

    // 关闭 loading 遮罩，避免阻塞原生支付弹窗
    wx.hideLoading();

    // 参数类型校验
    if (!a || typeof a !== "string") {
      t.setData({ stop: false });
      wx.showToast({ title: "支付参数异常，请重试", icon: "error", duration: 2000 });
      return;
    }

    var e = a.split(",");

    // 参数完整性校验
    if (e.length < 5 || !e[0] || !e[1] || !e[2] || !e[3] || !e[4]) {
      t.setData({ stop: false });
      wx.showToast({ title: "支付参数不完整，请重试", icon: "error", duration: 2000 });
      return;
    }

    wx.requestPayment({
      timeStamp: e[0],
      nonceStr: e[1],
      package: e[2],
      paySign: e[3],
      signType: e[4],

      success: function (res) {
        wx.hideLoading();
        if ("requestPayment:ok" === res.errMsg) {
          t.yfk(res.errMsg);
        } else {
          t.setData({ stop: false });
        }
      },

      fail: function (res) {
        wx.hideLoading();
        if (res.errMsg && res.errMsg.indexOf("cancel") !== -1) {
          // 用户主动取消支付：提示后停留本页，可重新发起
          t.setData({ stop: false });
          wx.showModal({
            title: "提示",
            content: "您已取消支付，订单未提交，可重新发起支付",
            showCancel: false,
            confirmText: "知道了",
          });
        } else {
          // 支付失败：提示确认后保存为待付款订单并跳转
          t.setData({ stop: false });
          wx.showModal({
            title: "支付失败",
            content: "支付未完成，订单将保存为待付款，可稍后继续支付",
            showCancel: false,
            confirmText: "查看订单",
            success: function () {
              t.dfk(res.errMsg);
            },
          });
        }
      },
    });
  },
  _submitOrder: function (tag, payAmtsold, successUrl, pass) {
    var t = this;
    var id = t.data.setype === "0" ? t.data.ck : t.data.dpid;

    var updateData = { id: id };
    if (!wx.getStorageSync("vipcode")) {
      Object.assign(updateData, { xf_vipcode: "", xf_storecode: "", salesman: "" });
    }
    if (!wx.getStorageSync("wxuserid")) {
      updateData.wxuserid = "";
    }
    t.setData(updateData);

    wx.showLoading({ title: "订单处理中...", mask: true });

    wx.request({
      url: a.globalData.api + "wx_dfksku.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode") || "",
        wxuserid: wx.getStorageSync("wxuserid") || "",
        xf_plu: t.data.xf_plu,
        xf_price: t.data.realprice,
        xf_qty: t.data.qty,
        xf_amtsold: t.data.sumrealprice,
        sumwlprice: t.data.wlprice,
        remark: t.data.remark,
        salestypes: "0",
        shtype: t.data.setype,
        shid: id,
        tag: tag,
        xf_storecode: t.data.xf_storecode,
        salesman: wx.getStorageSync("yguserid"),
        pay_amtsold: payAmtsold,
        xf_docno: t.data.xf_docno,
        pass: pass
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        wx.hideLoading();
        if (typeof a.data === "string" && a.data !== "error" && a.data.length > 0) {
          wx.redirectTo({
            url: successUrl + a.data,
            fail: function () { wx.navigateBack({ delta: 1 }); },
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "订单提交异常，请联系客服",
            showCancel: true,
            success: function (res) { if (res.confirm) wx.navigateBack({ delta: 1 }); },
          });
        }
      },
      fail: function () {
        wx.hideLoading();
        if (tag === "0") {
          wx.showToast({ title: "支付失败记录保存异常,请联系客服", icon: "none", duration: 2000 });
          setTimeout(function () { wx.navigateBack({ delta: 1 }); }, 2000);
        } else {
          wx.showModal({
            title: "提示",
            content: "网络异常，订单可能未提交成功，请联系客服",
            showCancel: true,
            success: function (res) { if (res.confirm) wx.navigateBack({ delta: 1 }); },
          });
        }
      },
    });
  },
  yfk: function (k) {
    this._submitOrder("1", this.data.sumprice, "/pages/fkcg/index/index?sorts=" + this.data.sorts + "&tag=0&xf_docno=", k);
  },
  dfk: function (k) {
    this._submitOrder("0", 0, "/pages/dfdeposit/index/index?xf_docno=", k);
  },
  getremark: function (a) {
    this.setData({ remark: a.detail.value });
  },

});