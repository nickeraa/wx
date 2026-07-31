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
    ck: 0,
    setype: "0",
    flags: !1,
    ret: {},
    address1: "",
    address2: "",
    phone: "",
    body: "",
    tag: "",
    tags: !1,
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
    xiaoshu: !1,
    xf_docno: "",
    userid: "",
    yk: false,
    stop: false,
    xstock:0
  },
  back: function () {
    wx.navigateBack({
      delta: 0
    });
  },
  jia: function () {
    var newQty = this.data.qty + 1;
    if (newQty > 999) {
      wx.showToast({ title: '已超过最大数量', icon: 'none' });
      return;
    }
    this.setData({
      qty: newQty,
      sumprice: this.data.realprice * newQty + this.data.wlprice,
      sumrealprice: this.data.realprice * newQty,
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
    this.setData({
      qty: newQty,
      sumprice: this.data.realprice * newQty + this.data.wlprice,
      sumrealprice: this.data.realprice * newQty,
    });
  },
  showModal: function (t) {
    this.setData({
      modalName: t.currentTarget.dataset.target,
      flags: !0
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
      success: function (a) {
        var data = a.data;
        if (Array.isArray(data) && data.length > 0) {
          e.setData({ ret: data });
        } else {
          e.setData({ ret: null });
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
  hideModal: function (a) {
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
      }),
      console.log(a.currentTarget.dataset.tag),
      "1" == a.currentTarget.dataset.tag ?
      this.setData({
        tags: !1
      }) :
      this.setData({
        tags: !0
      }),
      console.log(this.data.tags),
      this.hideModal(),
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
      success: function (a) {
        console.log(a.data),
          t.setData({
            wlprice: a.data[0].WLPRICE * t.data.xishu
          });
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
      yk: newSetype === "1",
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
      url: "/pages/shopcg/goods/index?xf_plu=" + (a.currentTarget.dataset.xf_plu || ""),
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
      success: function (res) {
        if (Array.isArray(res.data) && res.data.length > 0) {
          t.setData({
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
      success: function (res) {
        if (!Array.isArray(res.data) || res.data.length === 0) {
          wx.showToast({ title: "默认地址获取失败", icon: "none" });
          return;
        }
        var item = res.data[0];
        t.setData({
          address1: item.ADDRESS1 || "",
          address2: item.ADDRESS2 || "",
          telphone: item.TELPHONE || "",
          dpid: item.ID || "",
          fg: 1,
          yk: item.ADDRESS1 === "广天藏品深圳办公室",
        });
      },
      fail: function () {
        wx.showToast({ title: "默认地址加载失败", icon: "none" });
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
    success: function (res) {
      if (!Array.isArray(res.data) || res.data.length === 0) {
        t.setData({ flag: false });
        return;
      }
      var item = res.data[0];
      t.setData({
        address1: item.ADDRESS1,
        address2: item.ADDRESS2,
        phone: item.PHONE,
        body: item.BODY,
        tag: item.TAG,
        ck: item.ID,
        wlprice: (item.WLPRICE || 0) * (t.data.xishu || 0),
        sumprice: Number(((t.data.sumrealprice || 0) + (item.WLPRICE || 0) * (t.data.xishu || 0)).toFixed(2)),
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
    success: function (res) {
      if (!Array.isArray(res.data) || res.data.length === 0) {
        t.setData({
          replu: null,
          sumprice: 0,
          realprice: 0,
          sumrealprice: 0,
          xiaoshu: false,
        });
        t.data.setype === "0" && t.address();
        return;
      }
      var item = res.data[0];
      var total = parseFloat((parseFloat(item.REALPRICE) * t.data.qty).toFixed(2));
      t.setData({
        replu: res.data,
        sumprice: total,
        realprice: total,
        sumrealprice: total,
        xishu: item.XISHU || 0,
        xf_desci: item.XF_DESCI || "",
        sorts: item.SORTS || "",
        grade: item.GRADE || "",
        xiaoshu: total % 1 !== 0,
      });
      t.data.setype === "0" && t.address();
    },
    fail: function () {
      wx.showToast({ title: "商品信息加载失败", icon: "none" });
    },
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
        console.log("库存查询结果:", res);

        // 2. 校验响应数据结构
        if (!res.data || !Array.isArray(res.data) || res.data.length === 0) {
          wx.hideLoading();
          that.setData({ stop: false });
          wx.showToast({ title: "库存查询异常", icon: "error", duration: 2000 });
          return;
        }

        // 3. 用局部变量存储库存值，避免 setData 异步竞态
        var xstock = res.data[0].XSTOCK;
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

        // 5. 未填收货地址 → 跳转添加
        if (!that.data.flag && that.data.setype == "0") {
          that.setData({ stop: false });
          that.add();
          return;
        }

        // 6. 金额校验
        console.log("当前订单金额:", that.data.sumprice);
        if (!that.data.sumprice || that.data.sumprice <= 0) {
          that.setData({ stop: false });
          wx.showToast({ title: "订单金额异常", icon: "error", duration: 2000 });
          return;
        }

        // 7. 重新显示 Loading，进入登录 & 支付流程
        wx.showLoading({ title: "正在处理…", mask: true });

        wx.login({
          success: function (loginRes) {
            var code = loginRes.code;
            if (!code) {
              wx.hideLoading();
              that.setData({ stop: false });
              console.error("获取用户登录 code 失败！");
              wx.showToast({ title: "登录验证失败", icon: "error", duration: 2000 });
              return;
            }

            wx.request({
              url: a.globalData.api + "wxzf.aspx",
              data: { code: code },
              header: { "content-type": "application/json" },
              timeout: 10000,
              success: function (openidRes) {
                console.log("获取openid成功:", openidRes.data);
                var parts = openidRes.data.split(",");

                // 8. 校验 openid 返回值
                if (!parts[0]) {
                  wx.hideLoading();
                  that.setData({ stop: false });
                  wx.showToast({ title: "用户数据异常", icon: "error", duration: 2000 });
                  return;
                }

                that.setData({ openid: parts[0] });
                console.log("当前openid:", that.data.openid);

                // 9. 进入下单支付
                that.generateOrder(parts[0]);
              },
              fail: function (err) {
                wx.hideLoading();
                that.setData({ stop: false });
                console.error("wxzf.aspx 请求失败:", err);
                wx.showToast({ title: "网络异常，请重试", icon: "error", duration: 2000 });
              },
            });
          },
          fail: function (err) {
            wx.hideLoading();
            that.setData({ stop: false });
            console.error("微信登录失败:", err);
            wx.showToast({ title: "登录失败，请重试", icon: "error", duration: 2000 });
          },
        });
      },
      fail: function (err) {
        wx.hideLoading();
        that.setData({ stop: false });
        console.error("库存查询失败:", err);
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
        console.log(docno);
        if (!docno || typeof docno !== "string" || docno.trim() === "") {
          wx.hideLoading();
          e.setData({ stop: false });
          wx.showToast({ title: "订单号获取异常", icon: "error", duration: 2000 });
          return;
        }
        console.log("订单号:", docno);
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
            wx.hideLoading();
            console.log("支付配置:", a.data);
            e.zf(a.data);
          },
          fail: function (err) {
            wx.hideLoading();
            e.setData({ stop: false });
            console.error("支付配置请求失败:", err);
            wx.showToast({ title: "数据异常", icon: "error", duration: 2000 });
          },
        });
      },
      fail: function (err) {
        wx.hideLoading();
        e.setData({ stop: false });
        console.error("获取订单号失败:", err);
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
    console.log("发起支付");
    console.log(a);

    // 关闭 loading 遮罩，避免阻塞原生支付弹窗
    wx.hideLoading();

    // 参数类型校验
    if (!a || typeof a !== "string") {
      t.setData({ stop: false });
      console.error("支付参数类型异常:", a);
      wx.showToast({ title: "支付参数异常，请重试", icon: "error", duration: 2000 });
      return;
    }

    var e = a.split(",");

    // 参数完整性校验
    if (e.length < 5 || !e[0] || !e[1] || !e[2] || !e[3] || !e[4]) {
      t.setData({ stop: false });
      console.error("支付参数不完整:", e);
      wx.showToast({ title: "支付参数不完整，请重试", icon: "error", duration: 2000 });
      return;
    }

    wx.requestPayment({
      timeStamp: e[0],
      nonceStr: e[1],
      package: e[2],
      paySign: e[3],
      signType: e[4],

      /**
 * 微信支付成功回调：隐藏加载遮罩，释放防重复提交锁，记录日志并调用已付款处理
 * @param {Object} a - wx.requestPayment 的成功返回对象
 * @param {string} a.errMsg - 支付成功的错误信息描述（如 "requestPayment:ok"）
 */
success: function (a) {
        wx.hideLoading();
        t.setData({ stop: false });
        console.log("success");
        console.log(a);
        t.yfk(a.errMsg);
      },

      fail: function (a) {
        wx.hideLoading();
        t.setData({ stop: false });
        console.log("fail");
        console.log(a);
        wx.showToast({
          title: "付款失败",
          icon: "error",
          duration: 2000
        });
        t.dfk(a.errMsg);
      },
    });
  },
  yfk: function (k) {
    // 计算 id 时避免 setData 异步竞态，直接用局部变量
    var id = this.data.setype === "0" ? this.data.ck : this.data.dpid;
    this.setData({ id: id });

    if (!wx.getStorageSync("vipcode")) {
      this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" });
    }
    if (!wx.getStorageSync("wxuserid")) {
      this.setData({ wxuserid: "" });
    }

    var t = this;
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
        tag: "1",
        xf_storecode: t.data.xf_storecode,
        salesman: wx.getStorageSync("yguserid"),
        pay_amtsold: t.data.sumprice,
        xf_docno: t.data.xf_docno,
        pass: k
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",

      success: function (a) {
        wx.hideLoading();
        console.log(a.data);

        if (typeof a.data === "string" && a.data !== "error" && a.data.length > 0) {
          wx.redirectTo({
            url: "/pages/fkcg/index/index?sorts=" +
              t.data.sorts +
              "&tag=0&xf_docno=" +
              a.data,
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "订单提交异常，请联系客服",
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({ delta: 1 });
              }
            },
          });
        }
      },

      fail: function (err) {
        wx.hideLoading();
        console.error("订单提交失败:", err);
        wx.showModal({
          title: "提示",
          content: "网络异常，订单可能未提交成功，请联系客服",
          showCancel: true,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({ delta: 1 });
            }
          },
        });
      },
    });
  },

  getremark: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        remark: a.detail.value
      });
  },
  dfk: function (k) {
    // 用局部变量避免 setData 异步竞态
    var id = this.data.setype === "0" ? this.data.ck : this.data.dpid;
    var t = this;

    var updateData = { id: id };
    if (!wx.getStorageSync("vipcode")) {
      Object.assign(updateData, { xf_vipcode: "", xf_storecode: "", salesman: "" });
    }
    if (!wx.getStorageSync("wxuserid")) {
      updateData.wxuserid = "";
    }
    this.setData(updateData);

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
        tag: "0",
        xf_storecode: t.data.xf_storecode,
        salesman: wx.getStorageSync("yguserid"),
        pay_amtsold: 0,
        xf_docno: t.data.xf_docno,
        pass: k
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",

      success: function (a) {
        console.log(a.data);

        if (typeof a.data === "string" && a.data !== "error" && a.data.length > 0) {
          wx.redirectTo({
            url: "/pages/dfdeposit/index/index?xf_docno=" + a.data,
            fail: function () {
              wx.navigateBack({ delta: 1 });
            },
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "订单记录异常，请联系客服",
            showCancel: true,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({ delta: 1 });
              }
            },
          });
        }
      },

      fail: function (err) {
        console.error("支付失败记录提交异常:", err);
        wx.navigateBack({ delta: 1 });
      },
    });
  },

});