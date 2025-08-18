var e = getApp(),
  t = require("../../../utils/qutil");
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    vip: "",
    qdvipcode: "",
    flagcard: true,
    flagvip: true,
    flagqd: true,
    flaghy: false,
    flaglp: true,
    lpphone: "",
    banner: e.globalData.imgUrls,
    images: '',
    vipname: '',
    grade: '',
    storecode: '',
    zhname: '',
    checkflag: false,
    checkqd: true,
    xf_address1: '',
    note: '核验会员资质',
    tx: false,
    ylq: false,
    dlq: false,
    hb: false,
    qddate: '',
    hx: false


  },
  onLoad: function (a) {

    var i = this;
    wx.login({
      success: function (t) {
        t.code ?
          (console.log("获检查用户登录状态 存储session_key", t),
            wx.request({
              url: e.globalData.api + "wx_getphone.ashx",
              data: {
                code: t.code
              },
              header: {
                "content-type": "application/json"
              },
              success: function (e) {
                console.log("获取授权openid，session_key", e),
                  console.log(e.data);
                var t = e.data.split(",");
                i.setData({
                  arr: [t]
                });
                var a = t[0],
                  o = t[1];
                wx.setStorageSync("openid", a),
                  wx.setStorageSync("sessionID", o),
                  console.log(o),
                  console.log(a);
              },
            })) :
          console.log("登录失败！" + t.errMsg);
      },
      fail: function (e) {
        console.log("获取登录凭证code失败！", e);
      },


    });

  },


  onShow: function (t) {


    var a = this;
    wx.request({
      url: e.globalData.api + "wx_listzh.ashx",
      data: {
        qdvipcode: wx.getStorageSync("qdvipcode")
        // qdvipcode: 800810952808
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e),

          a.setData({
            images: e.data[0].BANNER,
            zhname: e.data[0].ZHNAME,
            qddate: e.data[0].ENTIME1

          })


        e.data[0].XF_VIPCODE != null ?
          (a.setData({

            flagdj: true,
            flagcard: true,
            flagvip: true,
            flagqd: true,
            flaglp: true,
            note: '领取礼品'


          }), console.log('ddddddddddddddddddd')) :
          a.setData({

            flaghy: false,
            flaglp: true,
            flagvip: true,
            flagqd: true,
            flaglp: true,
            checkqd: true,
            note: '核验会员资质'


          });

        console.log('ggggggggggggggggg')

        if (wx.getStorageSync('vipmessage')) {

          a.setData({

            flagvip: false,
            //       flaghy: true

          })


        }







      },
    })


  },

  hy() {

    var t = this
    if (t.data.checkqd) {

      wx.showModal({
        title: "提示",
        content: "您还没有签到，请先签到~",
        showCancel: !1,
        success: function (a) {
          a.confirm
        },
      }), t.setData({

        checkqd: true,
        flaghy: true,
        flagcard: false

      });

    }

  },


  getvipcode: function (a) {
    this.setData({
      qdvipcode: a.detail.value
    });
  },
  search() {


    var t = this;
    wx.request({
      url: e.globalData.api + "wx_checkvip.ashx",
      data: {
        vipcode: t.data.qdvipcode

      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a);

        if (a.data.length > 0) {

          t.setData({
            qdvipcode: a.data[0].XF_VIPCODE,
            vipname: a.data[0].XF_SURNAME,
            grade: a.data[0].GRADE,
            xf_address1: a.data[0].XF_ADDRESS1,
            storecode: a.data[0].XF_STORES,
            flagvip: false,
            flagqd: false
          })
          console.log('ppppppppppppppppppppppppppppp')
          console.log(t.data.tx)
          if (t.data.tx) {

            console.log('fffffffffffffffffff')

            t.setData({

              flagqd: true

            })


          }


        } else {

          wx.showModal({
            title: "提示",
            content: "您输入的会员卡号不存在",
            showCancel: !1,
            success: function (a) {
              a.confirm && t.setData({

                flagvip: true,
                flagqd: true
              });
            }
          })

        }



      }
    });


  },


  qd() {



    if (wx.getStorageSync('qdvipcode')) {

      this.setData({

        qdvipcode: wx.getStorageSync('qdvipcode'),


      })


      this.search();

      this.setData({

        flagcard: true,
        checkqd: true,
        falgvip: false,
        flagqd: false

      })

    } else {

      this.setData({

        flagcard: false,
        checkqd: true,
        falgvip: true,
        flagqd: true
      })


    }



  },



  qds() {


    var t = this;
    wx.request({
      url: e.globalData.api + "wx_inqd.ashx",
      data: {
        zhname: t.data.zhname,
        qdvipcode: t.data.qdvipcode

      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a), a.data == 'ok' ?

          (
            wx.setStorageSync('qdvipcode', t.data.qdvipcode),
            t.setData({
              flagvip: true,
              flaghy: false,
              flagqd: true,
              flagcard: true,
              checkflag: t.data.qdvipcode,
              vip: '您已经签到成功了 ~',
              note: '领取礼品'
            })) :
          wx.showModal({
            title: "提示",
            content: "签到数据错误",
            showCancel: !1,
            success: function (a) {
              a.confirm
            }
          })

        if (wx.getStorageSync('vipmessage')) {

          t.setData({

            flagvip: false,
            //       flaghy: true

          })


        }


      }
    });


  },




  onGetPhoneNumber: function (e) {

    var t = this,
      a = e.detail.errMsg,
      o = e.detail.encryptedData;
    console.log(wx.getStorageSync("sessionID")), console.log(o);
    var n = e.detail.iv;
    "getPhoneNumber:ok" == a
      ?
      wx.checkSession({
        success: function () {
          t.deciyption(wx.getStorageSync("sessionID"), o, n);
        },
        fail: function () {},
      }) :
      wx.showModal({
        title: "提示",
        content: "请重试，选择手机号~",
        showCancel: !1,
        success: function (e) {
          e.confirm;
        },
      });
  },

  deciyption: function (t, a, o) {
    var n = this;
    console.log("步骤4根据秘钥解密手机号码sessionID：", t),
      wx.request({
        url: e.globalData.api + "wx_getvipphone.ashx",
        data: {
          sessionID: t,
          encryptedData: a,
          iv: o
        },
        header: {
          "content-type": "application/json"
        },
        success: function (t) {

          (console.log(t.data),
            n.setData({
              lpphone: t.data.phoneNumber,
              flagcard: true,
              checkqd: true,
              falgvip: true

            }),
            wx.setStorageSync('lpphone', t.data.phoneNumber),

            console.log(wx.getStorageSync('lpphone')),

            n.checkphone()


          )


        },

      });
  },

  checkphone() {

    var t = this;
    wx.request({
      url: e.globalData.api + "wx_checklpphone.ashx",
      data: {
        zhname: t.data.zhname,
        phone: wx.getStorageSync('lpphone')

      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a)
        if (a.data.length == 0 || a.data[0].TAGS == '0') {

          t.updatelp()
        } else if (a.data[0].TAGS == '8') {
          wx.showModal({
            title: "提示",
            content: "您已经领取过礼品，不能重复领取喔~",
            showCancel: !1,
            success: function (a) {
              a.confirm
            }
          })

        } else if (a.data[0].TAGS == '4') {

          wx.showModal({
            title: "提示",
            content: "您的礼品暂时登记候补中~",
            showCancel: !1,
            success: function (a) {
              a.confirm
            }
          })

        }
      }

    });


  },

  updatelp: function () {


    var t = this;
    wx.request({
      url: e.globalData.api + "wx_inzhlp.ashx",
      data: {
        zhname: t.data.zhname,
        lpvipcode: wx.getStorageSync('qdvipcode'),
        phone: wx.getStorageSync('lpphone')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        wx.hideLoading(),
          console.log(a.data),
          "ok" != a.data ?
          wx.showToast({
            title: "数据异常"
          }) :
          wx.showModal({
            title: "提示",
            content: "申领礼品成功！请咨询工作人员领取",
            showCancel: !1,
            success: function (a) {
              a.confirm
            }
          }),
          t.setData({
            flaghy: true,
            tx: true,
            dlq: true,
            qdvipcode: wx.getStorageSync('qdvipcode'),
          });

        wx.setStorageSync('vipmessage', 'true');

        t.seqd()
      },
    });


  },

  hx() {

    this.setData({

      hx: true

    })

  },

  ff() {


    var t = this;
    wx.request({
      url: e.globalData.api + "wx_fflw.ashx",
      data: {
        zhname: t.data.zhname,
        lpphone: wx.getStorageSync('lpphone')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        wx.hideLoading(),
          console.log(a.data),
          "ok" != a.data ?
          wx.showToast({
            title: "数据异常"
          }) :

          t.setData({

            dlq: false,
            ylq: true,
            hb: false,
            hx: false


          });
        if (wx.getStorageSync('vipmessage')) {

          t.setData({

            flagvip: false,
            //       flaghy: true

          })


        }

      },
    });
  },
  hb() {
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_hblw.ashx",
      data: {
        zhname: t.data.zhname,
        lpphone: wx.getStorageSync('lpphone')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        wx.hideLoading(),
          console.log(a.data),
          "ok" != a.data ?
          wx.showToast({
            title: "数据异常"
          }) :

          t.setData({

            dlq: false,
            ylq: false,
            hb: true,
            hx: false
          });

        if (wx.getStorageSync('vipmessage')) {

          t.setData({

            flagvip: false,
            //       flaghy: true

          })


        }

      },
    });


  },



  seqd() {

    var a = this;
    wx.request({
      url: e.globalData.api + "wx_listzh.ashx",
      data: {
        qdvipcode: wx.getStorageSync("qdvipcode")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e),

          a.setData({
            images: e.data[0].BANNER,
            zhname: e.data[0].ZHNAME,
            qddate: e.data[0].ENTIME1

          }),

          a.search();


      },
    })




  },



});