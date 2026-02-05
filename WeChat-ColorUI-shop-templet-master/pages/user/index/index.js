var e = getApp(),
  t = require("../../../utils/qutil");
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    vip: "您还没有登录哦 ~",
    vipcode: "",
    wxuserid: "",
    flag: !1,
    flags: !0,
    tximg: e.globalData.imgUrl+'yk.jpg',
    arr: [],
    phone: "",
    yguserid: "",
    iconList: [{
        icon: "pay",
        color: "black",
        badge: 50,
        name: "待付款"
      },
      {
        icon: "send",
        color: "black",
        badge: 1,
        name: "已付款"
      },
    ],
    gridCol: 2,
    sumdfk: 0,
    sumdfh: 0,
    vip_id: 0,
    avatarUrl: '',
    nickName: ''
  },




  onLoad: function (a) {
    if ((console.log(a), console.log(wx.getStorageSync("vipcode")), a.q)) {
      console.log("dfsdfsdfsadf"),
        console.log("index 生命周期 onload" + JSON.stringify(a));
      var o = decodeURIComponent(a.q),
        n = t.urlToObj(o);
      console.log(n.vipid),
        wx.removeStorageSync("vip_id"),
        wx.setStorageSync("vip_id", decodeURIComponent(n.vipid));

    } else
      a.scene &&
      (console.log("gggggggggg"),
        console.log(a.scene),
        wx.removeStorageSync("vip_id"),
        wx.setStorageSync("vip_id", decodeURIComponent(a.scene)));


     //   wx.setStorageSync("vip_id", '2637');
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
  tjtypes: function () {
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_tjtags.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e.data),
          e.data.length > 0 &&
          t.setData({
            sumdfk: e.data[0].SUMDFK,
            sumdfh: e.data[0].SUMDFH
          }),
          console.log(t.data.sumdfk);
      },
    });
  },
  seall: function () {
    wx.navigateTo({
      url: "/pages/alldfk/index/index?title=0"
    });
  },
  setype: function (e) {
    "待付款" == e.currentTarget.dataset.name &&
      wx.navigateTo({
        url: "/pages/alldfk/index/index?title=0"
      }),
      "已付款" == e.currentTarget.dataset.name &&
      wx.navigateTo({
        url: "/pages/alldfk/index/index?title=1"
      });
  },
  mydj: function () {
    wx.switchTab({
      url: "/pages/bagsyd/index/index"
    });
  },
  qh: function () {
    wx.switchTab({
      url: "/pages/bags/index/index"
    });
  },
  address: function () {
    wx.navigateTo({
      url: "/pages/address/index/index"
    });
  },
  scj: function () {
    wx.navigateTo({
      url: "/pages/scitem/index/index"
    });
  },
  onShow: function (t) {
    console.log(e.globalData.wximgurl+wx.getStorageSync("wximg")),
      wx.getStorageSync("yguserid") &&
      this.setData({
        yguserid: wx.getStorageSync("yguserid")
      }),
      console.log(wx.getStorageSync("vipcode")),
      wx.getStorageSync("vipcode") ?
      (console.log("hhhhhhh"),
        this.setData({
          vipcode: wx.getStorageSync("vipcode"),
          flag: !0,
          flags: !1,
          tximg: e.globalData.imgUrl+'vip.png',
          avatarUrl: e.globalData.wximgurl+wx.getStorageSync('wximg'),
          nickName: wx.getStorageSync('wxuser')
        })) :
      this.setData({
        wxuserid: wx.getStorageSync("wxuserid")
      }),
      "2" == wx.getStorageSync("p") ?
      wx.setTabBarBadge({
        index: 1,
        text: wx.getStorageSync("n")
      }) :
      "3" == wx.getStorageSync("p") && wx.removeTabBarBadge({
        index: 1
      });
    var a = this;
    console.log(wx.getStorageSync("vipcode")),
      wx.getStorageSync("vipcode")?
   
      wx.request({
        url: e.globalData.api + "wx_checkvip.ashx",
        data: {
          vipcode: wx.getStorageSync("vipcode")
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (e) {
          console.log(e),
            console.log("fffffffffff"),
            e.data.length > 0 ?
            (a.setData({
              vip: e.data[0].GRADE,
              flag: !0,
              flags: !1,
              tximg: e.globalData.imgUrl+'vip.png',

            }),a.tz() ) :
            a.setData({
              vip: "您还没有登录哦 ~",
              flag: !1,
              flags: !0,
              tximg: e.globalData.imgUrl+'yk.jpg',
            });
        },
      }) :
      this.setData({
        vip: "您还没有登录哦 ~",
        flag: !1,
        flags: !0,
        tximg: e.globalData.imgUrl+'yk.jpg',
      }),
      this.tjtypes();
  },

tz()
{

  if(this.data.nickName=='')
  {

    wx.navigateTo({
      url: "/pages/wxlogin/index"
    });
  }

},

  onGetPhoneNumber: function (e) {
    /*
    if (!wx.getStorageSync("vipcode") && !wx.getStorageSync("vip_id"))
      return (
        wx.showModal({
          title: "提示",
          content: "您还没有会员卡，请联系收藏顾问~",
          showCancel: !1,
          success: function (e) {
            e.confirm;
          },
        }),
        !1
      ); */
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
        content: "会员卡领取失败！请重试，选择手机号，会员卡需要绑定您的手机号，才能领取喔~",
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
          if (
            (console.log(t.data),
              n.setData({
                phone: t.data.phoneNumber
              }),
              wx.setStorageSync('phone', t.data.phoneNumber),

              "undefined" == t.data.phoneNumber)
          )
            return (
              wx.showModal({
                title: "提示",
                content: "手机号获取失败，请重试",
                showCancel: !1,
                success: function (e) {
                  e.confirm;
                },
              }),
              !1
            );
          t.data.phoneNumber && wx.getStorageSync("vipcode") ?
            (wx.setStorageSync("wxuserid", t.data.phoneNumber),
              wx.request({
                url: e.globalData.api + "wx_checkvip.ashx",
                data: {
                  vipcode: wx.getStorageSync("vipcode")
                },
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                dataType: "json",
                success: function (e) {
                  console.log(e),
                    e.data.length > 0 ?
                    n.setData({
                      vip: e.data[0].GRADE,
                      flag: !0,
                      flags: !1,
                      tximg: e.globalData.imgUrl+'vip.png',
                    }) :
                    (n.setData({
                        vip: "您还没有登录哦 ~",
                        flag: !1,
                        flags: !0,
                        tximg: e.globalData.imgUrl+'yk.jpg',
                      }),
                      wx.showToast({
                        title: "没有会员卡信息"
                      }));
                },
              })) :
            n.inphone();
        },

      });
  },
  inphone: function () {

    if (!wx.getStorageSync("vip_id")) {

      console.log('ggggggggggg')
      wx.navigateTo({
        url: "/pages/wxlogin/index"
      });


    } else {

      var t = this;
      wx.showLoading({
          title: "正在加载"
        }),
        wx.request({
          url: e.globalData.api + "wx_sqlphones.ashx",
          data: {
            vip_id: wx.getStorageSync("vip_id"),
            phone: t.data.phone
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
              wx.request({
                url: e.globalData.api + "wx_vipid.ashx",
                data: {
                  vip_id: wx.getStorageSync("vip_id")
                },
                header: {
                  "content-type": "application/x-www-form-urlencoded",
                },
                dataType: "json",
                success: function (e) {
                  console.log(e),
                    e.data.length > 0 ?
                    (t.setData({
                        vip: e.data[0].GRADE,
                        flag: !0,
                        flags: !1,
                        tximg: e.globalData.imgUrl+'vip.png',
                        vipcode: e.data[0].XF_VIPCODE,
                      }),
                      wx.setStorageSync("vipcode", e.data[0].XF_VIPCODE),
                      t.setData({
                        vipcode: e.data[0].XF_VIPCODE,
                        flag: !0,
                        flags: !1,
                        tximg: e.globalData.imgUrl+'vip.png',
                      }),
                      wx.redirectTo({
                        url: '/pages/wxlogin/index',
                      })
                      // wx.showToast({ title: "会员卡领取成功！" })
                    ) :
                    (t.setData({
                        vip: "您还没有登录哦 ~",
                        flag: !1,
                        flags: !0,
                        tximg: e.globalData.imgUrl+'yk.jpg',
                      }),
                      wx.showToast({
                        title: "没有会员卡信息"
                      }));
                },
              });
          },
        });

    }
  },
  onShareAppMessage: function (e) {
    return {
      title: "广天藏品始创于1997年",
      path: "/pages/homerm/index/index",
      imageUrl: "/img/fx.jpg",
      success: function (e) {
        console.log("转发成功:" + JSON.stringify(e));
      },
      fail: function (e) {
        console.log("转发失败:" + JSON.stringify(e));
      },
    };
  },
});