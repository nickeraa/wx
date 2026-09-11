var e = getApp(),
  t = require("../../../utils/qutil");
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    iconurlfx: e.globalData.iconurl + 'fx.jpg',
    vip: "您还没有登录哦 ~",
    vipcode: "",
    wxuserid: "",
    flag: !1,
    flags: !0,
    tximg: e.globalData.imgUrl + 'yk.jpg',
    vipimg: e.globalData.imgUrl + 'vip.png',
    iconurl: e.globalData.iconurl,
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
    nickName: '',
    canClaim: !!wx.getStorageSync("vip_id")
  },




  onLoad: function (a) {
    console.log(a), console.log(wx.getStorageSync("vipcode"));
    var vipId = "";
    if (a.q) {
      console.log("index 生命周期 onload" + JSON.stringify(a));
      try {
        var n = t.urlToObj(decodeURIComponent(a.q));
        console.log(n.vipid);
        vipId = n.vipid ? decodeURIComponent(n.vipid) : "";
      } catch (err) {
        console.log("解析 vip_id 失败", err);
      }
    } else if (a.scene) {
      console.log("gggggggggg"),
        console.warn(a.scene),
        console.warn(wx.getStorageSync('vipcode'));
      try {
        vipId = decodeURIComponent(a.scene);
      } catch (err) {
        console.log("解析 scene 失败", err);
      }
    }
    // 校验通过才写入，避免写入 "undefined" 或非法值
    if (vipId) {
      wx.removeStorageSync("vip_id"),
        wx.setStorageSync("vip_id", vipId);
    }


      // wx.setStorageSync("vip_id", '2637');
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
    wx.showLoading({
        title: "加载中..."
      }),
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
            Array.isArray(e.data) && e.data.length > 0 &&
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
  onShow: function () {
    this.setData({
      canClaim: !!wx.getStorageSync("vip_id")
    });
    // 头像/昵称有值时才展示（vip-avatar-row 依赖 nickName）
    var _wximg = wx.getStorageSync('wximg'),
      _wxnick = wx.getStorageSync('wxuser');
    console.log(e.globalData.wximgurl + _wximg),
      wx.getStorageSync("yguserid") &&
      this.setData({
        yguserid: wx.getStorageSync("yguserid")
      }),
      console.warn(wx.getStorageSync("vipcode")),
      wx.getStorageSync("vipcode") ?
      (console.log("hhhhhhh"),
        this.setData({
          vipcode: wx.getStorageSync("vipcode"),
          flag: !0,
          flags: !1,
          tximg: this.data.vipimg,
          avatarUrl: _wximg ? e.globalData.wximgurl + _wximg : '',
          nickName: _wxnick || ''
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
    // 节流：5 秒内不重复请求会员信息与订单统计
    var now = Date.now();
    if (this._lastFetch && now - this._lastFetch < 5000) {
      return;
    }
    this._lastFetch = now;
    console.log(wx.getStorageSync("vipcode")),
      wx.getStorageSync("vipcode") ?

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
            Array.isArray(e.data) && e.data.length > 0 ?
            (a.setData({
              vip: e.data[0].GRADE,
              flag: !0,
              flags: !1,
              tximg: a.data.vipimg,

            })) :
            // vipcode 存在：保持隐藏领取会员卡按钮，显示会员卡信息
            a.setData({
              vip: "暂无会员信息",
              flag: !0,
              flags: !1,
              tximg: a.data.vipimg,
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

  onClaimBlocked: function () {
    wx.showModal({
      title: "提示",
      content: "抱歉，积分为0，暂没有达到开卡条件",
      showCancel: !1,
      success: function (e) {
        e.confirm;
      },
    });
  },
  onGetPhoneNumber: function (e) {

    // 只有 vip_id 存在才可领取会员卡，否则拦截，不进入正常流程
    if (!wx.getStorageSync("vip_id")) {
      wx.showModal({
        title: "提示",
        content: "抱歉，积分为0，暂没有达到开卡条件",
        showCancel: !1,
        success: function (e) {
          e.confirm;
        },
      });
      return;
    }

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
                    data: {
                      code: res.code
                    },
                    header: {
                      "content-type": "application/json"
                    },
                    timeout: 10000,
                    success: function (resp) {
                      if (!resp.data || typeof resp.data.split !== "function") {
                        wx.showToast({
                          title: "授权状态异常，请重试",
                          icon: "none"
                        });
                        return;
                      }
                      var arr = resp.data.split(",");
                      wx.setStorageSync("openid", arr[0]),
                        wx.setStorageSync("sessionID", arr[1]),
                        t.deciyption(wx.getStorageSync("sessionID"), o, n);
                    },
                    fail: function () {
                      wx.showToast({
                        title: "授权状态异常，请重试",
                        icon: "none"
                      });
                    },
                  });
              },
              fail: function () {
                wx.showToast({
                  title: "授权状态异常，请重试",
                  icon: "none"
                });
              },
            });
        },
      }) :
      wx.showModal({
        title: "提示",
        content: "必须授权手机号，才能领取会员卡喔",
        showCancel: !1,
        success: function (e) {
          e.confirm;
        },
      });
  },
  deciyption: function (t, a, o) {
    var n = this;
    console.log("步骤4根据秘钥加载手机号码sessionID：", t),
      wx.showLoading({
        title: "正在加载..."
      }),
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
          if (!t.data || !t.data.phoneNumber) {
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
          console.warn(wx.getStorageSync("vipcode"));

          if (wx.getStorageSync("vipcode")) {
            wx.setStorageSync("wxuserid", t.data.phoneNumber);
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

                  console.warn(e),

                    Array.isArray(e.data) && e.data.length > 0 ?
                    (n.setData({
                      vip: e.data[0].GRADE,
                      flag: !0,
                      flags: !1,
                      tximg: n.data.vipimg,
                    }),
                    n.inphone()) :
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
              });
          } else {
            // 有 vip_id、无 vipcode：进入开卡正常流程
            n.inphone();
          }
        },
        fail: function (e) {
          wx.hideLoading(),
            console.log("手机号加载失败", e),
            wx.showToast({
              title: "手机号加载失败，请重试",
              icon: "none"
            });
        },
      });
  },
  inphone: function () {

      // 只有 vip_id 存在才可开卡，否则拦截，不执行开卡流程
      if (!wx.getStorageSync("vip_id")) {
        wx.showModal({
          title: "提示",
          content: "抱歉，积分为0，暂没有达到开卡条件",
          showCancel: !1,
          success: function (e) {
            e.confirm;
          },
        });
        return;
      }

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
                    Array.isArray(e.data) && e.data.length > 0 ?
                    (t.setData({
                        vip: e.data[0].GRADE,
                        flag: !0,
                        flags: !1,
                        tximg: t.data.vipimg,
                        vipcode: e.data[0].XF_VIPCODE,
                      }),
                      wx.setStorageSync("vipcode", e.data[0].XF_VIPCODE),
                      //  wx.redirectTo({
                      //    url: '/pages/wxlogin/index',
                      //  })
                      wx.showModal({
                        title: "提示",
                        content: "会员卡领取成功！",
                        showCancel: !1
                      })
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

    
  },
  onShareAppMessage: function () {
    return {
      title: "广天藏品始创于1997年",
      path: "/pages/home/index/index",
      imageUrl: this.data.iconurlfx,
    };
  },
});