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
    replu: [],
    ck: 0,
    setype: "0",
    flags: !1,
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
    xiaoshu: !1,
    xf_docno: "",
    userid: "",
    yk: false,
    xf_plu: "",
    xf_desci: "",
    replu: [],
    flags: !1,
    ret: [],
    tag: "",
    tags: !1,
    fg: 0,
    amount: 0,
    remark: "",
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
    this.setData({
        qty: this.data.qty + 1
      }),
      this.setData({
        sumprice: this.data.realprice * this.data.qty,
        sumrealprice: this.data.realprice * this.data.qty,
        sumydprice: this.data.yd_amtsold * this.data.qty,
      });
  },
  jian: function () {
    1 == this.data.qty ?
      wx.showToast({
        title: "不能少于1",
        icon: "error",
        duration: 1e3
      }) :
      (this.setData({
          qty: this.data.qty - 1
        }),
        this.setData({
          sumprice: this.data.realprice * this.data.qty,
          sumrealprice: this.data.realprice * this.data.qty,
          sumydprice: this.data.yd_amtsold * this.data.qty,
        }));
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
      timeout: 10000,
      success: function (a) {
        a.data && a.data.length > 0 ?
          e.setData({
            ret: a.data
          }) :
          e.setData({
            ret: []
          });
      },
      fail: function () {
        e.setData({ ret: [] });
      },
    });
  },
  hideModal: function (a) {
    this.setData({
      modalName: null,
      flags: !1
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
      "1" == a.currentTarget.dataset.tag ?
      this.setData({
        tags: !1
      }) :
      this.setData({
        tags: !0
      }),
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
      timeout: 10000,
      success: function (a) {
        a.data && a.data.length > 0 && a.data[0] ?
          t.setData({
            wlprice: a.data[0].WLPRICE * t.data.xishu
          }) :
          t.setData({
            wlprice: 0
          });
      },
      fail: function () {
        t.setData({ wlprice: 0 });
      },
    });
  },
  onLoad: function (a) {
    a.xf_plu && this.setData({
        xf_plu: a.xf_plu
      }),
      a.address1 && this.setData({
        address1: a.address1
      }),
      a.address2 && this.setData({
        address2: a.address2
      }),
      a.telphone && this.setData({
        telphone: a.telphone
      }),
      a.id && this.setData({
        id: a.id
      }),
      wx.getStorageSync("vipcode") ?
      this.setData({
        userid: wx.getStorageSync("vipcode")
      }) :
      this.setData({
        userid: wx.getStorageSync("wxuserid")
      });
  },
  radioChange1: function (a) {
    this.setData({
      yk: false
    });
    this.setData({
      setype: a.detail.value
    }),
      "0" == this.data.setype ?
      this.address() :
      "1" == this.data.setype && this.store();

    if (this.data.setype == '1') {
      this.setData({
        yk: true
      });
    }
  },
  sestore: function () {
    wx.navigateTo({
      url: "/pages/store/index/index?dpid=" + this.data.dpid
    });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/shopcg/goods/index?xf_plu=" + a.currentTarget.dataset.xf_plu,
    });
  },
  store: function () {
    if (!wx.getStorageSync("vipcode") && this.data.setype == '1') {
      this.setData({
        yk: true
      });
    }
    if (
      (this.setData({
          wlprice: 0,
          sumprice: this.data.sumrealprice
        }),
        !wx.getStorageSync("vipcode"))
    )
      return this.destore(), !1;

    var t = this;
    wx.request({
      url: a.globalData.api + "wx_sestoreaddr.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        a.data && a.data.length > 0 && a.data[0] ?
          t.setData({
            address1: a.data[0].ADDRESS1,
            address2: a.data[0].ADDRESS2,
            telphone: a.data[0].TELPHONE,
            dpid: a.data[0].ID,
            fg: 1,
          }) :
          t.destore();
      },
      fail: function () {
        t.destore();
      },
    });
  },
  destore: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_deaddr.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        if (a.data && a.data.length > 0 && a.data[0]) {
          t.setData({
            address1: a.data[0].ADDRESS1,
            address2: a.data[0].ADDRESS2,
            telphone: a.data[0].TELPHONE,
            dpid: a.data[0].ID,
            fg: 1,
          });

          if (a.data[0].ADDRESS1 == '广天藏品深圳办公室') {
            t.setData({
              yk: true
            });
          }
        }
      },
      fail: function () {},
    });
  },
  address: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_address.ashx",
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
      success: function (a) {
        a.data && a.data.length > 0 && a.data[0] ?
          (t.setData({
              address1: a.data[0].ADDRESS1,
              address2: a.data[0].ADDRESS2,
              phone: a.data[0].PHONE,
              body: a.data[0].BODY,
              tag: a.data[0].TAG,
              ck: a.data[0].ID,
              wlprice: a.data[0].WLPRICE * t.data.xishu,
              sumprice: parseFloat(
                t.data.sumprice + a.data[0].WLPRICE
              ).toFixed(2),
              flag: !0,
              salestypes: a.data[0].SALESTYPES,
              xf_storecode: a.data[0].XF_STORECODE,
              salesman: a.data[0].SALESMAN,
              grade: a.data[0].GRADE,
            }),
            "1" == a.data[0].TAG ?
            t.setData({
              tags: !1
            }) :
            t.setData({
              tags: !0
            })) :
          t.setData({
            flag: !1
          });
      },
      fail: function () {},
    });
  },
  onShow: function () {
    this.setData({
      stop: false
    });
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listyd.ashx",
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
      success: function (a) {
        if (a.data && a.data.length > 0 && a.data[0]) {
          t.setData({
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
          });
          t.data.sumprice.toString().indexOf(".") >= 0 &&
            t.setData({
              xiaoshu: !0
            });
        } else {
          t.setData({
            replu: []
          });
          wx.showModal({
            title: "提示",
            content: "商品信息加载失败",
            showCancel: false
          });
        }
        "0" == t.data.setype && t.address();
      },
      fail: function () {
        t.setData({ replu: [] });
        wx.showModal({
          title: "提示",
          content: "商品信息加载失败",
          showCancel: false
        });
      },
    });
  },
  payment: function () {
    wx.showLoading({
      title: '连接中...',
    });
    this.setData({
      stop: true
    });
    var that = this;
    wx.request({
      url: a.globalData.api + "wx_checkxstock.ashx",
      data: {
        xf_plu: this.data.xf_plu
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        if (t.data && t.data.length > 0 && t.data[0]) {
          that.setData({
            xstock: t.data[0].XSTOCK,
          });
        } else {
          that.setData({ xstock: 0 });
        }

        wx.hideLoading();

        if (that.data.xstock <= 0) {
          wx.showModal({
            title: "提示",
            content: "已订完，数量为零",
            showCancel: !1,
          });
        } else {
          if (!that.data.flag && that.data.setype == '0')
            return (
              that.add(),
              !1
            );
          if (!that.data.sumprice || that.data.sumprice <= 0)
            return wx.showToast({
              title: "数据异常"
            }), !1;

          wx.login({
            success: function (e) {
              var s = e.code;
              if (s) {
                wx.request({
                  url: a.globalData.api + "wxzf.aspx",
                  data: {
                    code: s
                  },
                  header: {
                    "content-type": "application/json"
                  },
                  timeout: 10000,
                  success: function (a) {
                    var e = a.data.split(",");
                    that.setData({
                      openid: e[0]
                    });
                    that.generateOrder(that.data.openid);
                  },
                  fail: function () {
                    wx.hideLoading();
                    wx.showToast({ title: "支付初始化失败", icon: "error" });
                  },
                });
              } else {
                wx.hideLoading();
                wx.showToast({ title: "获取用户登陆状态失败！", icon: "error" });
              }
            },
            fail: function () {
              wx.hideLoading();
              wx.showToast({ title: "登录失败", icon: "error" });
            },
          });
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "库存查询失败", icon: "error" });
      },
    });
  },
  generateOrder: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "get_ordernumber.ashx",
      data: {
        title: "DSC"
      },
      header: {
        "content-type": "application/json"
      },
      timeout: 10000,
      success: function (s) {
        e.setData({
          xf_docno: s.data
        });
        wx.request({
          url: a.globalData.api + "wxzfconfig.aspx",
          data: {
            openid: t,
            amount: e.data.sumydprice,
            xf_docno: e.data.xf_docno,
            salestypes: "线上预定," + e.data.userid,
          },
          header: {
            "content-type": "application/json"
          },
          timeout: 10000,
          success: function (a) {
            e.zf(a.data);
          },
          fail: function () {
            wx.hideLoading();
            wx.showToast({
              title: "数据异常",
              icon: "error",
              duration: 2e3,
            });
          },
        });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: "生成订单失败",
          icon: "error",
          duration: 2e3,
        });
      },
    });
  },
  zf: function (a) {
    var t = this;
    var e = a.split(",");
    wx.requestPayment({
      timeStamp: e[0],
      nonceStr: e[1],
      package: e[2],
      signType: e[4],
      paySign: e[3],
      success: function (a) {
        t.yfk(a.errMsg);
      },
      fail: function (a) {
        t.dfk(a.errMsg);
      },
    });
  },
  getremark: function (a) {
    this.setData({
      remark: a.detail.value
    });
  },
  yfk: function (k) {
    "0" == this.data.setype ?
      this.setData({
        id: this.data.ck
      }) :
      this.setData({
        id: this.data.dpid
      });
    wx.getStorageSync("vipcode") ||
      this.setData({
        xf_vipcode: "",
        xf_storecode: "",
        salesman: ""
      }),
      wx.getStorageSync("wxuserid") || this.setData({
        wxuserid: ""
      });
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
        shtype: t.data.setype,
        shid: t.data.id,
        tag: "1",
        xf_storecode: t.data.xf_storecode,
        salesman: wx.getStorageSync('yguserid'),
        pay_amtsold: t.data.sumydprice,
        xf_docno: t.data.xf_docno,
        pass: k
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        "error" != a.data ?
          wx.redirectTo({
            url: "/pages/fkcg/index/index?sorts=" +
              t.data.sorts +
              "&xf_docno=" +
              a.data,
          }) :
          wx.showModal({
            title: "提示",
            content: "数据错误，IP已被记录",
            showCancel: !1,
          });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "提交失败", icon: "error" });
      },
    });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/ydshop/index?xf_plu=" + a.currentTarget.dataset.xf_plu,
    });
  },
  dfk: function (k) {
    "0" == this.data.setype ?
      this.setData({
        id: this.data.ck
      }) :
      this.setData({
        id: this.data.dpid
      });
    wx.getStorageSync("vipcode") ||
      this.setData({
        xf_vipcode: "",
        xf_storecode: "",
        salesman: ""
      }),
      wx.getStorageSync("wxuserid") || this.setData({
        wxuserid: ""
      });
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
        shtype: t.data.setype,
        shid: t.data.id,
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
      timeout: 10000,
      success: function (a) {
        "error" != a.data ?
          wx.redirectTo({
            url: "/pages/dfdeposityd/index/index?xf_docno=" + a.data,
          }) :
          wx.showModal({
            title: "提示",
            content: "数据错误，IP已被记录",
            showCancel: !1,
          });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "提交失败", icon: "error" });
      },
    });
  },
});