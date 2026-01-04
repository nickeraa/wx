var e,
  o = getApp(),
  n = require("../../libs/qqmap-wx-jssdk.js");
Page({
  data: {
    StatusBar: o.globalData.StatusBar,
    CustomBar: o.globalData.CustomBar,
    bgimages: o.globalData.imgUrl,
    phone: "",
    username: "",
    openid: "",
    userid: "",
    warning: "",
    index2: null,
    picker2: [],
    store: "",
    result: {},
    acount: "",
    sfimg: o.globalData.api + "bgimg/sf.png",
    zyimg: o.globalData.api + "bgimg/zy.png",
    ljimg: o.globalData.api + "bgimg/lj.png",
    rgimg: o.globalData.api + "bgimg/rg.png",
    dyimg: o.globalData.api + "bgimg/dy.png",
    gqimg: o.globalData.api + "bgimg/gq.png",
    tzimg: o.globalData.api + "bgimg/tz.jpg",
    location: "",
    address: "",
    name: "",
    addr: {},
    tag: "3",
    tags: "3",
    gg: true
  },
  onLoad: function (e) {},
  szqg: function () {
    wx.navigateTo({
      url: "/pages/szqg/index/index"
    });
  },
  ddqh: function () {
    wx.navigateTo({
      url: "/pages/scqhdeposit/index/index"
    });
  },
  sqtk: function () {
    wx.navigateTo({
      url: "/pages/sqtkdeposit/index/index"
    });
  },
  checknumber: function () {
    wx.navigateTo({
      url: "/pages/checknumber/index/index"
    });
  },
  xgdj: function () {
    wx.navigateTo({
      url: "/pages/xgdj/index/index"
    });
  },
  qd: function () {
    var e = this;
    wx.offLocationChange(),
      wx.showLoading({
        title: "正在连接"
      }),
      wx.request({
        url: o.globalData.api + "wx_checkqg.ashx",
        data: {
          userid: wx.getStorageSync("userid")
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (o) {
          console.log(o),
            o.data.length > 0 ?
            wx.startLocationUpdateBackground({
              type: "gcj02",
              success: function (o) {
                console.log("开启后台定位", o), e.upchange();
              },
              fail: function (o) {
                console.log("开启后台定位失败", o),
                  wx.getSetting({
                    success: function (o) {
                      var n = o.authSetting;
                      console.log(n),
                        n["scope.userLocationBackground"] ||
                        wx.showModal({
                          title: "是否授权",
                          content: "需要获取您的地理位置，请确认授权",
                          success: function (o) {
                            o.confirm ?
                              wx.openSetting({
                                success: function (o) {
                                  !0 ===
                                    o.authSetting[
                                      "scope.userLocationBackground"
                                    ] && e.upchange();
                                },
                              }) :
                              console.log("用户拒绝打开设置界面");
                          },
                        });
                    },
                  });
              },
            }) :
            wx.showModal({
              title: "提示",
              content: "无权限，签到失败，只有区管才能签到",
              showCancel: !1,
              success: function (e) {
                e.confirm;
              },
            }),
            wx.hideLoading();
        },
      });
  },
  upchange: function () {
    var e = this;
    wx.showLoading({
        title: "正在定位"
      }),
      wx.startLocationUpdateBackground({
        type: "gcj02",
        success: function (o) {
          wx.onLocationChange(function (o) {
            var n = new Date().getTime(),
              t =
              (wx.getStorageSync("oldLocation"),
                wx.getStorageSync("oldTime"),
                Number(o.latitude).toString() +
                "," +
                Number(o.longitude).toString());
            console.log(Number(o.latitude).toString()),
              console.log(Number(o.longitude).toString()),
              wx.setStorageSync("oldLocation", t),
              wx.setStorageSync("oldTime", n),
              wx.offLocationChange(),
              e.uploadLocation();
          });
        },
        fail: function (e) {
          console.log(e),
            wx.showModal({
              title: "提示",
              content: "定位失败，请重试",
              showCancel: !1,
              success: function (e) {
                e.confirm;
              },
            });
        },
      }),
      wx.hideLoading();
  },
  uploadLocation: function () {
    var e = this;
    wx.showLoading({
        title: "正在签到"
      }),
      wx.request({
        url: o.globalData.api + "wx_qg_sc.ashx",
        data: {
          userid: wx.getStorageSync("userid"),
          location: wx.getStorageSync("oldLocation"),
          sctime: wx.getStorageSync("oldTime"),
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (o) {
          console.log(o),
            wx.hideLoading(),
            "ok" == o.data ?
            wx.showModal({
              title: "提示",
              content: "签到成功",
              showCancel: !1,
              success: function (o) {
                o.confirm && e.selectmap();
              },
            }) :
            wx.showModal({
              title: "提示",
              content: "签到失败，请重试",
              showCancel: !1,
              success: function (e) {
                e.confirm;
              },
            });
        },
      });
  },
  uploadLocations: function () {
    var e = this;
    wx.request({
      url: o.globalData.api + "wx_qg_sc.ashx",
      data: {
        userid: wx.getStorageSync("userid"),
        location: wx.getStorageSync("oldLocation"),
        sctime: wx.getStorageSync("oldTime"),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (o) {
        console.log(o), e.selectmaps();
      },
    });
  },

  qhlist() {

    wx.navigateTo({
      url: "/pages/qhreport/index/index"
    });


  },



  selectmaps: function (o) {
    e = new n({
      key: "B5QBZ-SYKKN-22JF2-SBYNV-G5L67-F7BYX"
    });
    var t = wx.getStorageSync("oldLocation").split(",");
    console.log(t[0]), console.log(t[1]);
    var a = this;
    e.reverseGeocoder({
      location: {
        latitude: Number(t[0]),
        longitude: Number(t[1])
      },
      success: function (o) {
        console.log(o.result.address), console.log(o.result);
        var n;
        (n = o.result.address_reference.crossroad.title),
        console.log(
            o.result.ad_info.district +
            n +
            o.result.address_reference.landmark_l2.title
          ),
          a.setData({
            address: o.result.address,
            name: o.result.ad_info.district +
              n +
              o.result.address_reference.landmark_l2.title,
          });
        for (var s = [], c = 0; c < a.data.addr.length; ++c)
          (s = a.data.addr[c].LOCATION),
          console.log(s),
          e.calculateDistance({
            mode: "straight",
            from: {
              latitude: Number(t[0]),
              longitude: Number(t[1])
            },
            to: [{
              latitude: Number(s.split(",")[0]),
              longitude: Number(s.split(",")[1]),
            }, ],
            success: function (e) {
              var o = e.result.elements[0].distance;
              console.log("计算距离为:", o + "米"),
                console.log(a.data.addr[c]),
                o < 100 &&
                (a.setData({
                    name: a.data.addr[c].ADDRES,
                    address: ""
                  }),
                  console.log(a.data.addr[c].ADDRES),
                  a.setData({
                    tags: "2"
                  }));
            },
            fail: function (e) {
              console.error("error:", e);
            },
          });
        console.log(a.data.tags + "stopstart"),
          a.upstate(
            a.data.tags,
            wx.getStorageSync("userid"),
            wx.getStorageSync("oldTime")
          );
      },
      fail: function (e) {
        console.log("获取当前地址失败");
      },
    });
  },
  selectmap: function (o) {
    e = new n({
      key: "B5QBZ-SYKKN-22JF2-SBYNV-G5L67-F7BYX"
    });
    var t = wx.getStorageSync("oldLocation").split(",");
    console.log(t[0]), console.log(t[1]);
    var a = this;
    e.reverseGeocoder({
      location: {
        latitude: Number(t[0]),
        longitude: Number(t[1])
      },
      success: function (o) {
        console.log(o.result.address), console.log(o.result);
        var n;
        (n = o.result.address_reference.crossroad.title),
        console.log(
            o.result.ad_info.district +
            n +
            o.result.address_reference.landmark_l2.title
          ),
          a.setData({
            address: o.result.address,
            name: o.result.ad_info.district +
              n +
              o.result.address_reference.landmark_l2.title,
          });
        for (var s = [], c = 0; c < a.data.addr.length; ++c)
          (s = a.data.addr[c].LOCATION),
          console.log(s),
          e.calculateDistance({
            mode: "straight",
            from: {
              latitude: Number(t[0]),
              longitude: Number(t[1])
            },
            to: [{
              latitude: Number(s.split(",")[0]),
              longitude: Number(s.split(",")[1]),
            }, ],
            success: function (e) {
              var o = e.result.elements[0].distance;
              console.log("计算距离为:", o + "米"),
                console.log(a.data.addr[c]),
                o < 100 &&
                (a.setData({
                    name: a.data.addr[c].ADDRES,
                    address: ""
                  }),
                  console.log(a.data.addr[c].ADDRES),
                  a.setData({
                    tag: "2"
                  }));
            },
            fail: function (e) {
              console.error("error:", e);
            },
          });
        console.log(a.data.tag + "qd"),
          a.upstate(
            a.data.tag,
            wx.getStorageSync("userid"),
            wx.getStorageSync("oldTime")
          ),
          wx.openLocation({
            latitude: Number(t[0]),
            longitude: Number(t[1]),
            scale: 22,
            name: a.data.name,
            address: a.data.address,
            success: function (e) {
              console.log(e), a.stopstart();
            },
            fail: function (e) {
              wx.showToast({
                title: "调用地图失败，请返回重试"
              });
            },
          });
      },
      fail: function (e) {
        console.log("获取当前地址失败");
      },
    });
  },
  upstate: function (e, n, t) {
    console.log(e + n + t);
    var a = this;
    wx.request({
      url: o.globalData.api + "wx_updwstateqd.ashx",
      data: {
        tag: e,
        userid: n,
        sctime: t
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e), a.setData({
          tags: "3",
          tag: "3"
        });
      },
    });
  },
  stopstart: function () {
    wx.offLocationChange();
    var e = this;
    wx.startLocationUpdateBackground({
      type: "gcj02",
      success: function (o) {
        wx.onLocationChange(function (o) {
          var n = new Date().getTime(),
            t =
            (wx.getStorageSync("oldLocation"), wx.getStorageSync("oldTime")),
            a =
            Number(o.latitude).toString() +
            "," +
            Number(o.longitude).toString();
          console.log(Number(o.latitude).toString()),
            console.log(Number(o.longitude).toString()),
            n - t > 3e5 &&
            (wx.setStorageSync("oldLocation", a),
              wx.setStorageSync("oldTime", n),
              e.uploadLocations());
        });
      },
      fail: function (e) {
        console.log(e),
          wx.showModal({
            title: "提示",
            content: "定位失败，请重试",
            showCancel: !1,
            success: function (e) {
              e.confirm;
            },
          });
      },
    });
  },
  upchangeqt: function () {
    wx.offLocationChange(),
      wx.stopLocationUpdate({
        success: function (e) {},
        fail: function (e) {
          console.log(e),
            wx.showModal({
              title: "提示",
              content: "停止监听失败",
              showCancel: !1,
              success: function (e) {
                e.confirm;
              },
            });
        },
      });
    var e = this;
    wx.showLoading({
        title: "正在签退"
      }),
      wx.getLocation({
        type: "gcj02",
        success: function (o) {
          console.log(o.latitude), console.log(o.longitude);
          var n = new Date().getTime(),
            t =
            (wx.getStorageSync("oldLocation"),
              wx.getStorageSync("oldTime"),
              Number(o.latitude).toString() +
              "," +
              Number(o.longitude).toString());
          wx.setStorageSync("oldLocation", t),
            wx.setStorageSync("oldTime", n),
            e.uploadLocationqt();
        },
        fail: function (e) {
          console.log(e),
            wx.showModal({
              title: "提示",
              content: "定位失败，请重试",
              showCancel: !1,
              success: function (e) {
                e.confirm;
              },
            });
        },
      }),
      wx.hideLoading();
  },
  qt: function () {
    var e = this;
    wx.showLoading({
        title: "正在连接"
      }),
      wx.request({
        url: o.globalData.api + "wx_checkqg.ashx",
        data: {
          userid: wx.getStorageSync("userid")
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (o) {
          console.log(o),
            o.data.length > 0 ?
            e.upchangeqt() :
            wx.showModal({
              title: "提示",
              content: "无权限，签退失败，只有区管才能签退",
              showCancel: !1,
              success: function (e) {
                e.confirm;
              },
            }),
            wx.hideLoading();
        },
      });
  },
  uploadLocationqt: function () {
    wx.request({
      url: o.globalData.api + "wx_qg_scqt.ashx",
      data: {
        userid: wx.getStorageSync("userid"),
        location: wx.getStorageSync("oldLocation"),
        sctime: wx.getStorageSync("oldTime"),
        tag: "1",
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e),
          "ok" == e.data ?
          (wx.removeStorageSync("qd"),
            wx.showModal({
              title: "提示",
              content: "签退成功!",
              showCancel: !1,
              success: function (e) {
                e.confirm &&
                  wx.navigateTo({
                    url: "/pages/qgqt/index/index"
                  });
              },
            })) :
          wx.showModal({
            title: "提示",
            content: "签退失败，请重试",
            showCancel: !1,
            success: function (e) {
              e.confirm;
            },
          });
      },
    });
  },
  cxqg: function () {
    wx.navigateTo({
      url: "/pages/shstate/index/index"
    });
  },
  postsc: function () {
    wx.navigateTo({
      url: "/pages/postsc/index/index"
    });
  },
  sclist: function () {
    wx.navigateTo({
      url: "/pages/screport/index/index"
    });
  },
  vip: function () {
    wx.navigateTo({
      url: "/pages/vipsku/index/index"
    });
  },
  gz: function () {
    console.log(wx.getStorageSync("userid"));
    wx.request({
      url: o.globalData.api + "wx_segzuser.ashx",
      data: {
        userid: wx.getStorageSync("userid")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        return (
          console.log(e),
          !e.data[0].GOPENID && e.data[0].OPENID ?
          (wx.showModal({
              title: "提示",
              content: "您需要关注公众号才可以收到微信提示的通知信息，请不要关闭窗口",
              showCancel: !1,
              success: function (e) {
                e.confirm &&
                  wx.navigateTo({
                    url: "/pages/wxgz/index/index"
                  });
              },
            }),
            !1) :
          e.data[0].GOPENID || e.data[0].OPENID ?
          void 0 :
          (wx.showModal({
              title: "提示",
              content: "请您验证用户，必须是公司员工才能操作",
              showCancel: !1,
              success: function (e) {
                e.confirm &&
                  wx.navigateTo({
                    url: "/pages/coupon/index/index"
                  });
              },
            }),
            !1)
        );
      },
      complete: function () {},
    });
  },
  khsq: function (e) {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/sqnumber/index/index"
      });
  },
  tjlogin: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/tjlogin/index?id=1"
      });
  },

  tjlogins: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/tjlogin/index?id=2"
      });
  },
  tp: function (e) {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/tplogin/index"
      });
  },
  djsq: function (e) {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/dqnumber/index/index"
      });
  },
  cxsq: function (e) {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/cxqstock/index/index"
      });
  },
  gzmessage: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.showModal({
        title: "提示",
        content: "您需要关注公众号才可以收到微信提示的通知信息，请不要关闭窗口",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/wxgz/index/index"
          });
        },
      });
  },
  khdj: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/senumber/index/index"
      });
  },

  hmdj: function () {

    var e = this;
    wx.request({
      url: o.globalData.api + "wx_date.ashx",
      data: {

      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (t) {
        console.log(t.data)
        if (t.data == 'fail') {

          wx.showModal({
            title: "提示",
            content: "无法登记，登记时间已超时",
            showCancel: !1,
            success: function (e) {

            },
          })

          e.setData({
            gg: false

          })

        }

        else{


          wx.getStorageSync("job") ?
          wx.showModal({
            title: "提示",
            content: "请您验证用户，必须是在职状态才能操作",
            showCancel: !1,
            success: function (e) {
              e.confirm && wx.navigateTo({
                url: "/pages/coupon/index/index"
              });
            },
          }) :
          wx.navigateTo({
            url: "/pages/hmdj/index/index"
          });


        }

      },
    });

    


    
  },
  delwh: function () {
    var e = this;
    wx.request({
      url: o.globalData.api + "wx_date.ashx",
      data: {
  
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (t) {
        console.log(t.data)
        if (t.data == 'fail') {

          wx.showModal({
            title: "提示",
            content: "无法登记，登记时间已超时",
            showCancel: !1,
            success: function (e) {

            },
          })

          e.setData({
            gg: false

          })

        }

        else{


          wx.getStorageSync("job") ?
          wx.showModal({
            title: "提示",
            content: "请您验证用户，必须是在职状态才能操作",
            showCancel: !1,
            success: function (e) {
              e.confirm && wx.navigateTo({
                url: "/pages/coupon/index/index"
              });
            },
          }) :
          wx.navigateTo({
            url: "/pages/delwh/index/index"
          });


        }

      },
    });
  },

cxjpg()
{


  wx.getStorageSync("job") ?
  wx.showModal({
    title: "提示",
    content: "请您验证用户，必须是在职状态才能操作",
    showCancel: !1,
    success: function (e) {
      e.confirm && wx.navigateTo({
        url: "/pages/coupon/index/index"
      });
    },
  }) :
  wx.navigateTo({
    url: "/pages/cxjpg/index/index"
  });


},

  selcwh: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/selcwh/index/index"
      });
  },
  zc: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/zcznumber/index/index"
      });
  },
  khcx: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/lcstock/index/index"
      });
  },
  qstock: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/qstock/index/index"
      });
  },
  qgs: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/qglogins/index"
      });
  },
  xl: function () {

    console.log(wx.getStorageSync("userid"))

    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      ((o.globalData.tt = ""),
        wx.navigateToMiniProgram({
          appId: "wx187fe5b10e271c63",
          path: "/pages/acxpexl/index/index",
          extraData: {
            yguserid: wx.getStorageSync("userid")
          },
          envVersion: "release",
          success: function (e) {
            console.info(e);
          },
        }));
  },
  ch: function () {
    wx.navigateTo({
      url: "/pages/acxpech/index/index"
    });
  },
  newvip: function () {
    wx.navigateToMiniProgram({
      appId: "wx187fe5b10e271c63",
      path: "/pages/sendcard/index/index",
      extraData: {
        yguserid: wx.getStorageSync("userid")
      },
      envVersion: "release",
      success: function (e) {
        console.info(e);
      },
    });
  },
  oldvip: function () {
    wx.navigateTo({
      url: "/pages/acxpexls/index/index"
    });
  },
  history: function () {
    wx.navigateTo({
      url: "/pages/ahistory/index/index"
    });
  },
  qg: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/qglogin/index"
      });
  },


  lphz: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/viplp/index/index"
      });
  },

  qdhz: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/viphz/index/index"
      });
  },


  jg: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/jlogin/index"
      });
  },
  state: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/stockstate/index/index"
      });
  },
  bdqw: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/seprice/index/index"
      });
  },
  fstate: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/stockstatess/index/index"
      });
  },
  wstate: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/wstockstate/index/index"
      });
  },
  onShow: function (e) {
    if (
      (console.log(wx.getStorageSync("userid")), wx.getStorageSync("userid"))
    ) {
      var n = this;
      wx.request({
        url: o.globalData.api + "wx_checkuser.ashx",
        data: {
          userid: wx.getStorageSync("userid"),
          password: "",
          i: "1"
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0 ?
            (n.setData({
                openid: wx.getStorageSync("openid"),
                username: wx.getStorageSync("username"),
                phone: wx.getStorageSync("phone"),
              }),
              wx.request({
                url: o.globalData.api + "wx_seaddr.ashx",
                data: {},
                header: {
                  "content-type": "application/x-www-form-urlencoded",
                },
                dataType: "json",
                success: function (e) {
                  console.log(e), n.setData({
                    addr: e.data
                  });
                },
              })) :
            wx.showModal({
              title: "提示",
              content: "请您验证用户，必须是在职状态才能操作",
              showCancel: !1,
              success: function (e) {
                e.confirm &&
                  (wx.setStorageSync("job", "out"),
                    wx.navigateTo({
                      url: "/pages/coupon/index/index"
                    }));
              },
            });
        },
      });
    } else
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是公司员工才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      });
  },
});