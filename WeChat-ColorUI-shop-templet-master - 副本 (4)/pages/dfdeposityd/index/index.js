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
    xf_qty: 0,
    xf_plu: '',
    xstock:0
  },
  back: function () {
    wx.navigateBack({
      delta: 1
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
      });
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
      timeout: 10000,
      success: function (a) {
        a.data && a.data.length > 0 ?
          (t.setData({
              replu: a.data,
              sumydprice: a.data[0].XF_AMTSOLD,
              xf_docno: a.data[0].XF_DOCNO,
              xf_txdate: (a.data[0].XF_TXDATE || "").replace(/T/g, " "),
              xf_desci: a.data[0].XF_DESCI,
              remark: a.data[0].REMARK,
              salestypes: a.data[0].SALESTYPES,
              sorts: a.data[0].SORTS,
              shid: a.data[0].SHID,
              shtype: a.data[0].SHTYPE,
              xf_qty: a.data[0].XF_QTY,
              xf_plu: a.data[0].XF_PLU
            }),
            a.data[0].SUMXF_PRICE.toString().indexOf(".") >= 0 &&
            t.setData({
              xiaoshu: !0
            })) :
          t.setData({
            replu: []
          });
      },
      fail: function () {
        wx.showToast({
          title: "网络异常",
          icon: "none",
          duration: 2000
        });
      }
    });
  },
  payment: function () {

    wx.showLoading({
      title: '连接中...',
    })
    this.setData({

      stop: true

    })

    var that = this;
    wx.request({
      url: a.globalData.api + "wx_checkxstock.ashx",
      data: {
        xf_plu: that.data.xf_plu
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        wx.hideLoading();

        if (!t.data || !t.data[0]) {
          wx.showModal({
            title: "提示",
            content: "获取库存失败",
            showCancel: !1
          });
          return;
        }

        that.setData({
          xstock: t.data[0].XSTOCK
        });

        if (that.data.xstock <= 0) {
          wx.showModal({
            title: "提示",
            content: "已售罄，数量为零",
            showCancel: !1
          });
        } else {
          wx.login({
            success: function (e) {
              var o = e.code;
              if (o) {
                wx.request({
                  url: a.globalData.api + "wxzf.aspx",
                  data: {
                    code: o
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
                    wx.showToast({
                      title: "网络异常",
                      icon: "none",
                      duration: 2000
                    });
                  }
                });
              } else {
                wx.hideLoading();
                wx.showToast({
                  title: "获取用户登陆状态失败！",
                  icon: "none",
                  duration: 2000
                });
              }
            },
            fail: function () {
              wx.hideLoading();
              wx.showToast({
                title: "登录失败",
                icon: "none",
                duration: 2000
              });
            }
          });
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: "网络异常",
          icon: "none",
          duration: 2000
        });
      }
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
      header: {
        "content-type": "application/json"
      },
      timeout: 10000,
      success: function (a) {
        o.zf(a.data);
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: "生成订单失败",
          icon: "none",
          duration: 2000
        });
      },
    });
  },
  zf: function (a) {
    var t = this;
    var o = a.split(",");
    if (!o || o.length < 5) {
      wx.hideLoading();
      wx.showToast({
        title: "支付参数错误",
        icon: "none",
        duration: 2000
      });
      return;
    }
    wx.requestPayment({
      timeStamp: o[0],
      nonceStr: o[1],
      package: o[2],
      signType: o[4],
      paySign: o[3],
      success: function (a) {
        t.yfk(a.errMsg);
      },
      fail: function () {
        wx.showToast({
          title: "支付失败",
          icon: "error",
          duration: 2000
        });
      },
      complete: function () {
        t.setData({
          stop: false
        });
      }
    });
  },
  yfk: function (k) {
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
      url: a.globalData.api + "wx_qefkyd.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
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
      success: function (a) {
        "error" != a.data ?
          wx.redirectTo({
            url: "/pages/fkcg/index/index?sorts=" +
              t.data.sorts +
              "&xf_docno=" +
              t.data.xf_docno,
          }) :
          wx.showModal({
            title: "提示",
            content: "数据错误，IP已被记录",
            showCancel: !1
          });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: "网络异常",
          icon: "none",
          duration: 2000
        });
      }
    });
  },
});