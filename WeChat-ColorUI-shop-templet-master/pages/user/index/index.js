var e = getApp(),
  t = require("../../../utils/qutil");
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    iconurlfx:e.globalData.iconurl+'fx.jpg',
    vip: "您还没有登录哦 ~",
    vipcode: "",
    wxuserid: "",
    flag: !1,
    flags: !0,
    tximg: e.globalData.imgUrl+'yk.jpg',
    vipimg:e.globalData.imgUrl+'vip.png',
    iconurl:e.globalData.iconurl,
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
              timeout: 10000,
              success: function (e) {
                console.log("获取授权openid，session_key", e),
                  console.log(e.data);
                if (!e.data || typeof e.data.split !== "function") {
                  return;
                }
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
              fail: function (e) {
                console.log("获取openid失败", e),
                  wx.showToast({
                    title: "获取授权信息失败",
                    icon: "none"
                  });
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
    wx.showLoading({ title: "加载中..." }),
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
      timeout: 10000,
      success: function (e) {
        wx.hideLoading(),
          console.log(e.data),
          e.data && e.data.length > 0 &&
          t.setData({
            sumdfk: e.data[0].SUMDFK,
            sumdfh: e.data[0].SUMDFH
          }),
          console.log(t.data.sumdfk);
      },
      fail: function (e) {
        wx.hideLoading(),
          console.log("订单统计加载失败", e),
          wx.showToast({
            title: "订单统计加载失败",
            icon: "none"
          });
      },
    });
  },
  seall: function () {
    wx.navigateTo({
      url: "/pages/alldfk/index/index?title=0"
    });
  },
  setype: function (e) {
    var idx = e.currentTarget.dataset.index;
    0 === idx &&
      wx.navigateTo({
        url: "/pages/alldfk/index/index?title=0"
      }),
      1 === idx &&
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
          tximg: this.data.vipimg,
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
        timeout: 10000,
        success: function (e) {
          console.log(e),
            console.log("fffffffffff"),
            e.data && e.data.length > 0 ?
            (a.setData({
              vip: e.data[0].GRADE,
              flag: !0,
              flags: !1,
              tximg: a.data.vipimg,

            }),a.tz() ) :
            a.setData({
              vip: "您还没有登录哦 ~",
              flag: !1,
              flags: !0,
              tximg: a.data.tximg,
            });
        },
        fail: function (e) {
          console.log("会员信息加载失败", e),
            wx.showToast({
              title: "会员信息加载失败",
              icon: "none"
            });
        },
      }) :
      this.setData({
        vip: "您还没有登录哦 ~",
        flag: !1,
        flags: !0,
        tximg: this.data.tximg,
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
        fail: function () {
          console.log("session已失效，重新获取登录态"),
            wx.login({
              success: function (res) {
                res.code &&
                  wx.request({
                    url: e.globalData.api + "wx_getphone.ashx",
                    data: { code: res.code },
                    header: { "content-type": "application/json" },
                    timeout: 10000,
                    success: function (resp) {
                      if (!resp.data || typeof resp.data.split !== "function") {
                        wx.showToast({ title: "授权状态异常，请重试", icon: "none" });
                        return;
                      }
                      var arr = resp.data.split(",");
                      wx.setStorageSync("openid", arr[0]),
                      wx.setStorageSync("sessionID", arr[1]),
                      t.deciyption(wx.getStorageSync("sessionID"), o, n);
                    },
                    fail: function () {
                      wx.showToast({ title: "授权状态异常，请重试", icon: "none" });
                    },
                  });
              },
              fail: function () {
                wx.showToast({ title: "授权状态异常，请重试", icon: "none" });
              },
            });
        },
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
      wx.showLoading({ title: "正在加载..." }),
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
        timeout: 10000,
        success: function (t) {
          wx.hideLoading();
          console.log(t.data);
          if ("undefined" == typeof t.data.phoneNumber) {
            return wx.showModal({
              title: "提示",
              content: "手机号获取失败，请重试",
              showCancel: !1,
              success: function (e) {
                e.confirm;
              },
            });
          }
          n.setData({
            phone: t.data.phoneNumber
          }),
          wx.setStorageSync('phone', t.data.phoneNumber);
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
                timeout: 10000,
                success: function (e) {
                  console.log(e),
                    e.data && e.data.length > 0 ?
                    n.setData({
                      vip: e.data[0].GRADE,
                      flag: !0,
                      flags: !1,
                      tximg: n.data.vipimg,
                    }) :
                    (n.setData({
                        vip: "您还没有登录哦 ~",
                        flag: !1,
                        flags: !0,
                        tximg: n.data.tximg,
                      }),
                      wx.showToast({
                        title: "没有会员卡信息"
                      }));
                },
                fail: function (e) {
                  console.log("会员验证失败", e),
                    wx.showToast({
                      title: "会员验证失败",
                      icon: "none"
                    });
                },
              })) :
            n.inphone();
        },
        fail: function (e) {
          wx.hideLoading(),
            console.log("手机号解密失败", e),
            wx.showToast({
              title: "手机号解密失败，请重试",
              icon: "none"
            });
        },
      });
  },
  inphone: function () {

    if (!wx.getStorageSync("vip_id")||!wx.getStorageSync("vipcode")){

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
          timeout: 10000,
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
                timeout: 10000,
                success: function (e) {
                  console.log(e),
                    e.data && e.data.length > 0 ?
                    (t.setData({
                        vip: e.data[0].GRADE,
                        flag: !0,
                        flags: !1,
                        tximg: t.data.vipimg,
                        vipcode: e.data[0].XF_VIPCODE,
                      }),
                      wx.setStorageSync("vipcode", e.data[0].XF_VIPCODE),
                      t.setData({
                        vipcode: e.data[0].XF_VIPCODE,
                        flag: !0,
                        flags: !1,
                        tximg: t.data.vipimg,
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
                        tximg: t.data.tximg,
                      }),
                      wx.showToast({
                        title: "没有会员卡信息"
                      }));
                },
                fail: function (e) {
                  console.log("会员信息请求失败", e),
                    wx.showToast({
                      title: "会员信息获取失败",
                      icon: "none"
                    });
                },
              });
          },
        fail: function (e) {
          wx.hideLoading(),
            console.log("数据请求失败", e),
            wx.showToast({
              title: "数据请求失败",
              icon: "none"
            });
        },
        });

    }
  },
  onShareAppMessage: function (e) {
    return {
      title: "广天藏品始创于1997年",
      path: "/pages/homerm/index/index",
      imageUrl: this.data.iconurlfx,
      success: function (e) {
        console.log("转发成功:" + JSON.stringify(e));
      },
      fail: function (e) {
        console.log("转发失败:" + JSON.stringify(e));
      },
    };
  },
});