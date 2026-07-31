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
    xf_qty: 0,
    xstock:0
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
              xf_txdate: a.data[0].XF_TXDATE,
              xf_desci: a.data[0].XF_DESCI,
              remark: a.data[0].REMARK,
              salestypes: a.data[0].SALESTYPES,
              sorts: a.data[0].SORTS,
              shid: a.data[0].SHID,
              shtype: a.data[0].SHTYPE,
              xf_qty: a.data[0].XF_QTY,
              xf_plu:a.data[0].XF_PLU
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

        xf_plu: this.data.xf_plu

      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (t) {
        console.log(t);

        that.setData({

          xstock: t.data[0].XSTOCK,
     
        })

        wx.hideLoading()

        if (that.data.xstock <= 0) {
          wx.showModal({
            title: "提示",
            content: "已售罄，数量为零",
            showCancel: !1,
            success: function (a) {
              a.confirm;
            },
          })
        } else {

          console.log(that.data.sumprice);
          var t = that;
          wx.login({
            success: function (e) {
              var o = e.code;
              o
                ?
                wx.request({
                  url: a.globalData.api + "wxzf.aspx",
                  data: {
                    code: o
                  },
                  header: {
                    "content-type": "application/json"
                  },
                  success: function (a) {
                    console.log(a.data);
                    var e = a.data.split(",");
                    that.setData({
                        openid: e[0]
                      }),
                      console.log(that.data.openid),

                      that.generateOrder(that.data.openid);
                  },
                }) :
                console.log("获取用户登陆状态失败！");
            },
          });

        }

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
      header: {
        "content-type": "application/json"
      },
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
        console.log("success"), console.log(a), t.yfk(a.errMsg);
      },
      fail: function (a) {
        console.log("fail"),
          console.log(a),
          wx.showToast({
            title: "支付失败",
            icon: "error",
            duration: 2e3
          });
      },
      complete: function (a) {

        t.setData({
          stop: false

        })

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
      }),
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
      success: function (a) {
        console.log(a.data),
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
            showCancel: !1,
            success: function (a) {
              a.confirm;
            },
          })
      },
    });
  },
});