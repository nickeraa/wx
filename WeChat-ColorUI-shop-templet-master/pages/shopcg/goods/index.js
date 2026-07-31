var a,
  t = require("../../../@babel/runtime/helpers/defineProperty"),
  i = getApp();
Page({
  data: ((a = {
      StatusBar: i.globalData.StatusBar,
      CustomBar: i.globalData.CustomBar,
      iconurlan: i.globalData.iconurl + 'an.png',
      swiperlist: [""],
      autoplay: !1,
      indicatorDots: !1,
      interval: 4e3,
      duration: 500,
      circular: !1,
      pict: i.globalData.scimgurl,
      xf_plu: "",
      pnumber: "",
      index2: null,
      picker2: [],
      store: "",
      storename: "",
      userid: "",
      images: "",
      stock: "",
      xf_qoh: "",
      rb: {},
      xstock: 0,
      stop: false

    }),
    t(
      t(
        t(
          t(
            t(
              t(
                t(
                  t(t(t(a, "userid", ""), "xf_desci", ""), "tbimages1", ""),
                  "tbimages2",
                  ""
                ),
                "tbimages3",
                ""
              ),
              "zwimages1",
              ""
            ),
            "zwimages2",
            ""
          ),
          "zwimages3",
          ""
        ),
        "zwimages4",
        ""
      ),
      "zwimages5",
      ""
    ),
    t(
      t(
        t(
          t(
            t(
              t(
                t(
                  t(t(t(a, "zwimages6", ""), "zwimages7", ""), "zwimages8", ""),
                  "zwimages9",
                  ""
                ),
                "zwimages10",
                ""
              ),
              "current",
              0
            ),
            "fxuserid",
            ""
          ),
          "fx",
          ""
        ),
        "vipcode",
        ""
      ),
      "wxuserid",
      ""
    ),
    t(
      t(
        t(
          t(
            t(
              t(
                t(t(t(t(a, "arr", []), "kzm", ""), "t", ""), "isShow", !0),
                "videoCoverImg",
                ""
              ),
              "videoPlayIcon",
              i.globalData.iconurl + 'an.png',
            ),
            "videohight",
            ""
          ),
          "iconList",
          [{
              icon: "shop",
              color: "gray",
              badge: 50,
              name: "店铺"
            },
            {
              icon: "favor",
              color: "gray",
              badge: 1,
              name: "收藏"
            },
            {
              icon: "cart",
              color: "gray",
              badge: 0,
              name: "购物车"
            },
          ]
        ),
        "gridCol",
        3
      ),
      "n",
      0
    ),
    t(t(a, "vipcode", ""), "wxuserid", "")),
  onReady: function () {
    this.videoContext = wx.createVideoContext("myVideo");
  },
  bindplay: function () {
    this.setData({ isShow: !1 }),
      this.videoContext.play();
  },
  bindended: function () {
    this.setData({ isShow: !0 }),
      this.videoContext.ended();
  },
  bindpause: function () {
  },
  swiperChange: function (a) {
    this.setData({
      current: a.detail.current
    });
  },
  computeImgHeight: function (a) {
    var t =
      (wx.getSystemInfoSync().windowWidth * a.detail.height) / a.detail.width +
      "px";
    this.setData({
      swiperHeight: t
    });
  },
  onLoad: function (a) {
    a.xf_plu && this.setData({ xf_plu: a.xf_plu }),
      a.vipcode && wx.setStorageSync("vipcode", a.vipcode),
      a.fxuserid && wx.setStorageSync("fxuserid", a.fxuserid),
      a.wxuserid && wx.setStorageSync("wxuserid", a.wxuserid),
      a.d && wx.setStorageSync("d", a.d),
      a.zb && wx.setStorageSync("zb", a.zb),
      a.fx &&
      (wx.setStorageSync("fx", a.fx),
        this.setData({ fx: wx.getStorageSync("fx") }));
    var t = this;
    wx.getSystemInfo({
      success: function (a) {
        t.setData({ videohight: parseInt(0.75 * a.windowWidth) });
      },
    });
  },
  previewImage: function (a) {
    var t = a.target.dataset.src;
    wx.previewImage({
      current: t,
      urls: this.data.swiperlist
    });
  },
  insc: function () {
    wx.request({
      url: i.globalData.api + "wx_insc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: this.data.xf_plu,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        "ok" != a.data &&
          wx.showToast({
            title: "数据出错",
            icon: "error",
            duration: 1e3
          });
      },
      fail: function () {
        wx.showToast({ title: "收藏失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  checkplu: function () {
    var a = this;
    wx.request({
      url: i.globalData.api + "wx_checksc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: a.data.xf_plu,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (i) {
        i.data.length > 0 &&
          a.setData(
            t(
              t(
                t({}, "iconList[1].name", "已收藏"),
                "iconList[1].color",
                "red"
              ),
              "iconList[1].icon",
              "favorfill"
            )
          );
      },
    });
  },
  delsc: function () {
    wx.request({
      url: i.globalData.api + "wx_delsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: this.data.xf_plu,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        "ok" != a.data &&
          wx.showToast({
            title: "数据出错",
            icon: "error",
            duration: 1e3
          });
      },
      fail: function () {
        wx.showToast({ title: "操作失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  setype: function (a) {
    var s = a.currentTarget.dataset.name;
    "店铺" == s ?
      ((i.globalData.m = "1"),
        wx.switchTab({
          url: "/pages/home/index/index"
        })) :
      "收藏" == s ?
      (this.setData(
          t(
            t(
              t({}, "iconList[1].name", "已收藏"),
              "iconList[1].color",
              "red"
            ),
            "iconList[1].icon",
            "favorfill"
          )
        ),
        this.insc()) :
      "已收藏" == s ?
      (this.setData(
          t(
            t(t({}, "iconList[1].name", "收藏"), "iconList[1].color", "gray"),
            "iconList[1].icon",
            "favor"
          )
        ),
        this.delsc()) :

      //  wx.showToast({ title: "暂未开放", icon: "error", duration: 1e3 });
       wx.switchTab({
         url: "/pages/bags/index/index"
       });
  },
  onGetPhoneNumbergm: function (a) {
    wx.showLoading({ title: '连接中...' });
    this.setData({ stop: true });
    var t = this;
    wx.login({
      success: function (s) {
        s.code ?
          wx.request({
              url: i.globalData.api + "wx_getphone.ashx",
              data: { code: s.code },
              header: { "content-type": "application/json" },
              timeout: 10000,
              success: function (i) {
                var s = i.data.split(",");
                t.setData({ arr: [s] });
                var e = a.detail.errMsg,
                  d = s[1];
                var n = a.detail.encryptedData,
                  h = a.detail.iv;
                "getPhoneNumber:ok" == e
                  ?
                  (wx.hideLoading(),
                  wx.checkSession({
                    success: function () {
                      t.deciyptiongm(d, n, h);
                    },
                    fail: function () {},
                  })) :
                  (wx.hideLoading(),
                  wx.showModal({
                    title: "提示",
                    content: "请选择手机号，注册登录喔",
                    showCancel: !1,
                    success: function () {
                      t.setData({ stop: false });
                    },
                  }));
              },
              fail: function (a) {
                console.error("getphone fail:", a);
                wx.hideLoading();
              },
            }) :
          wx.hideLoading();
      },
      fail: function () {
        wx.hideLoading();
      },
    });
  },
  deciyptiongm: function (a, t, s) {
    var e = this;
    wx.request({
        url: i.globalData.api + "wx_getvipphone.ashx",
        data: {
          sessionID: a,
          encryptedData: t,
          iv: s
        },
        header: {
          "content-type": "application/json"
        },
        timeout: 10000,
        success: function (a) {
          a.data.phoneNumber &&
            (wx.setStorageSync("wxuserid", a.data.phoneNumber),
              e.setData({ wxuserid: a.data.phoneNumber }),
              e.gwjs());
        },
        fail: function () {
          wx.showToast({ title: "解密失败，请重试", icon: "none", duration: 2000 });
        },
      });
  },
  onGetPhoneNumbergwc: function (a) {
    var t = this;
    wx.login({
      success: function (s) {
        s.code ?
          wx.request({
              url: i.globalData.api + "wx_getphone.ashx",
              data: {
                code: s.code
              },
              header: {
                "content-type": "application/json"
              },
              success: function (i) {
                var s = i.data.split(",");
                t.setData({
                  arr: [s]
                });
                var e = a.detail.errMsg,
                  d = s[1];
                var n = a.detail.encryptedData,
                  h = a.detail.iv;
                "getPhoneNumber:ok" == e
                  ?
                  wx.checkSession({
                    success: function () {
                      t.deciyptiongwc(d, n, h);
                    },
                    fail: function () {},
                  }) :
                  wx.showModal({
                    title: "提示",
                    content: "请选择手机号，注册登录喔",
                    showCancel: !1,
                    success: function (a) {
                      a.confirm;
                    },
                  });
              },
              fail: function (a) {
                console.error("getphonegwc fail:", a);
              },
            }) :
          "";
      },
    });
  },
  deciyptiongwc: function (a, t, s) {
    var e = this;
    wx.request({
        url: i.globalData.api + "wx_getvipphone.ashx",
        data: {
          sessionID: a,
          encryptedData: t,
          iv: s
        },
        header: {
          "content-type": "application/json"
        },
        timeout: 10000,
        success: function (a) {
          a.data.phoneNumber &&
            (wx.setStorageSync("wxuserid", a.data.phoneNumber),
              e.setData({
                wxuserid: a.data.phoneNumber
              }),
              e.gw());
        },
      });
  },
  gwjs: function () {


    wx.showLoading({
      title: '连接中...',
    })

    this.setData({

      stop: true

    })
    var that = this;
    wx.request({
      url: i.globalData.api + "wx_checkxstock.ashx",
      data: {

        xf_plu: this.data.xf_plu

      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        if (a.data.length > 0) {
          wx.navigateTo({
            url: "/pages/deposit/index/index?xf_plu=" + that.data.xf_plu,
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "已售罄，数量为零",
            showCancel: false,
          });
        }
        wx.hideLoading();
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "网络异常，请重试", icon: "none", duration: 2000 });
      },
    });

  
  },
  gw: function () {
    var a = this;
    var vipcode = wx.getStorageSync("vipcode") || "";
    var wxuserid = wx.getStorageSync("wxuserid") || "";
    var fxuserid = wx.getStorageSync("fxuserid") || "";
    wx.request({
      url: i.globalData.api + "wx_insertsc.ashx",
      data: {
        vipcode: vipcode,
        wxuserid: wxuserid,
        xf_plu: a.data.xf_plu,
        qty: "1",
        fxuserid: fxuserid,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        if ("ok" == t.data) {
          wx.setStorageSync("p", "2");
          var n = parseInt(wx.getStorageSync("n") || "0") + 1;
          wx.setStorageSync("n", n.toString());
          a.setData({ n: wx.getStorageSync("n") });
        } else {
          wx.showToast({ title: "数据出错", icon: "error", duration: 1000 });
        }
      },
      fail: function () {
        wx.showToast({ title: "添加失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  previewImage1: function (a) {
    var t = [];
    if (this.data.zwimages1.indexOf("null") < 0 && "jpg" == this.data.kzm) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      t.push(i);
    }
    if (this.data.zwimages2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      t.push(s);
    }
    if (this.data.zwimages3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      t.push(e);
    }
    if (this.data.zwimages4.indexOf("null") < 0) {
      var d = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      t.push(d);
    }
    if (this.data.zwimages5.indexOf("null") < 0) {
      var n = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages5;
      t.push(n);
    }
    if (this.data.zwimages6.indexOf("null") < 0) {
      var h = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages6;
      t.push(h);
    }
    if (this.data.zwimages7.indexOf("null") < 0) {
      var l = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages7;
      t.push(l);
    }
    if (this.data.zwimages8.indexOf("null") < 0) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages8;
      t.push(o);
    }
    if (this.data.zwimages9.indexOf("null") < 0) {
      var u = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages9;
      t.push(u);
    }
    if (this.data.zwimages10.indexOf("null") < 0) {
      var p = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages10;
      t.push(p);
    }
    wx.previewImage({
      current: i,
      urls: t
    });
  },
  previewImage2: function (a) {
    var t = [];
    if (this.data.zwimages1.indexOf("null") < 0 && "jpg" == this.data.kzm) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      t.push(i);
    }
    if (this.data.zwimages2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      t.push(s);
    }
    if (this.data.zwimages3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      t.push(e);
    }
    if (this.data.zwimages4.indexOf("null") < 0) {
      var d = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      t.push(d);
    }
    if (this.data.zwimages5.indexOf("null") < 0) {
      var n = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages5;
      t.push(n);
    }
    if (this.data.zwimages6.indexOf("null") < 0) {
      var h = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages6;
      t.push(h);
    }
    if (this.data.zwimages7.indexOf("null") < 0) {
      var l = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages7;
      t.push(l);
    }
    if (this.data.zwimages8.indexOf("null") < 0) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages8;
      t.push(o);
    }
    if (this.data.zwimages9.indexOf("null") < 0) {
      var u = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages9;
      t.push(u);
    }
    if (this.data.zwimages10.indexOf("null") < 0) {
      var p = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages10;
      t.push(p);
    }
    wx.previewImage({
      current: s,
      urls: t
    });
  },
  previewImage3: function (a) {
    var t = [];
    if (this.data.zwimages1.indexOf("null") < 0 && "jpg" == this.data.kzm) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      t.push(i);
    }
    if (this.data.zwimages2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      t.push(s);
    }
    if (this.data.zwimages3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      t.push(e);
    }
    if (this.data.zwimages4.indexOf("null") < 0) {
      var d = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      t.push(d);
    }
    if (this.data.zwimages5.indexOf("null") < 0) {
      var n = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages5;
      t.push(n);
    }
    if (this.data.zwimages6.indexOf("null") < 0) {
      var h = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages6;
      t.push(h);
    }
    if (this.data.zwimages7.indexOf("null") < 0) {
      var l = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages7;
      t.push(l);
    }
    if (this.data.zwimages8.indexOf("null") < 0) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages8;
      t.push(o);
    }
    if (this.data.zwimages9.indexOf("null") < 0) {
      var u = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages9;
      t.push(u);
    }
    if (this.data.zwimages10.indexOf("null") < 0) {
      var p = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages10;
      t.push(p);
    }
    wx.previewImage({
      current: e,
      urls: t
    });
  },
  previewImage4: function (a) {
    var t = [];
    if (this.data.zwimages1.indexOf("null") < 0 && "jpg" == this.data.kzm) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      t.push(i);
    }
    if (this.data.zwimages2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      t.push(s);
    }
    if (this.data.zwimages3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      t.push(e);
    }
    if (this.data.zwimages4.indexOf("null") < 0) {
      var d = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      t.push(d);
    }
    if (this.data.zwimages5.indexOf("null") < 0) {
      var n = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages5;
      t.push(n);
    }
    if (this.data.zwimages6.indexOf("null") < 0) {
      var h = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages6;
      t.push(h);
    }
    if (this.data.zwimages7.indexOf("null") < 0) {
      var l = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages7;
      t.push(l);
    }
    if (this.data.zwimages8.indexOf("null") < 0) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages8;
      t.push(o);
    }
    if (this.data.zwimages9.indexOf("null") < 0) {
      var u = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages9;
      t.push(u);
    }
    if (this.data.zwimages10.indexOf("null") < 0) {
      var p = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages10;
      t.push(p);
    }
    wx.previewImage({
      current: d,
      urls: t
    });
  },
  previewImage5: function (a) {
    var t = [];
    if (this.data.zwimages1.indexOf("null") < 0 && "jpg" == this.data.kzm) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      t.push(i);
    }
    if (this.data.zwimages2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      t.push(s);
    }
    if (this.data.zwimages3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      t.push(e);
    }
    if (this.data.zwimages4.indexOf("null") < 0) {
      var d = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      t.push(d);
    }
    if (this.data.zwimages5.indexOf("null") < 0) {
      var n = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages5;
      t.push(n);
    }
    if (this.data.zwimages6.indexOf("null") < 0) {
      var h = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages6;
      t.push(h);
    }
    if (this.data.zwimages7.indexOf("null") < 0) {
      var l = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages7;
      t.push(l);
    }
    if (this.data.zwimages8.indexOf("null") < 0) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages8;
      t.push(o);
    }
    if (this.data.zwimages9.indexOf("null") < 0) {
      var u = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages9;
      t.push(u);
    }
    if (this.data.zwimages10.indexOf("null") < 0) {
      var p = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages10;
      t.push(p);
    }
    wx.previewImage({
      current: n,
      urls: t
    });
  },
  previewImage6: function (a) {
    var t = [];
    if (this.data.zwimages1.indexOf("null") < 0 && "jpg" == this.data.kzm) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      t.push(i);
    }
    if (this.data.zwimages2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      t.push(s);
    }
    if (this.data.zwimages3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      t.push(e);
    }
    if (this.data.zwimages4.indexOf("null") < 0) {
      var d = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      t.push(d);
    }
    if (this.data.zwimages5.indexOf("null") < 0) {
      var n = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages5;
      t.push(n);
    }
    if (this.data.zwimages6.indexOf("null") < 0) {
      var h = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages6;
      t.push(h);
    }
    if (this.data.zwimages7.indexOf("null") < 0) {
      var l = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages7;
      t.push(l);
    }
    if (this.data.zwimages8.indexOf("null") < 0) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages8;
      t.push(o);
    }
    if (this.data.zwimages9.indexOf("null") < 0) {
      var u = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages9;
      t.push(u);
    }
    if (this.data.zwimages10.indexOf("null") < 0) {
      var p = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages10;
      t.push(p);
    }
    wx.previewImage({
      current: h,
      urls: t
    });
  },
  previewImage7: function (a) {
    var t = [];
    if (this.data.zwimages1.indexOf("null") < 0 && "jpg" == this.data.kzm) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      t.push(i);
    }
    if (this.data.zwimages2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      t.push(s);
    }
    if (this.data.zwimages3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      t.push(e);
    }
    if (this.data.zwimages4.indexOf("null") < 0) {
      var d = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      t.push(d);
    }
    if (this.data.zwimages5.indexOf("null") < 0) {
      var n = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages5;
      t.push(n);
    }
    if (this.data.zwimages6.indexOf("null") < 0) {
      var h = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages6;
      t.push(h);
    }
    if (this.data.zwimages7.indexOf("null") < 0) {
      var l = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages7;
      t.push(l);
    }
    if (this.data.zwimages8.indexOf("null") < 0) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages8;
      t.push(o);
    }
    if (this.data.zwimages9.indexOf("null") < 0) {
      var u = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages9;
      t.push(u);
    }
    if (this.data.zwimages10.indexOf("null") < 0) {
      var p = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages10;
      t.push(p);
    }
    wx.previewImage({
      current: l,
      urls: t
    });
  },
  previewImage8: function (a) {
    var t = [];
    if (this.data.zwimages1.indexOf("null") < 0 && "jpg" == this.data.kzm) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      t.push(i);
    }
    if (this.data.zwimages2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      t.push(s);
    }
    if (this.data.zwimages3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      t.push(e);
    }
    if (this.data.zwimages4.indexOf("null") < 0) {
      var d = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      t.push(d);
    }
    if (this.data.zwimages5.indexOf("null") < 0) {
      var n = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages5;
      t.push(n);
    }
    if (this.data.zwimages6.indexOf("null") < 0) {
      var h = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages6;
      t.push(h);
    }
    if (this.data.zwimages7.indexOf("null") < 0) {
      var l = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages7;
      t.push(l);
    }
    if (this.data.zwimages8.indexOf("null") < 0) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages8;
      t.push(o);
    }
    if (this.data.zwimages9.indexOf("null") < 0) {
      var u = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages9;
      t.push(u);
    }
    if (this.data.zwimages10.indexOf("null") < 0) {
      var p = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages10;
      t.push(p);
    }
    wx.previewImage({
      current: o,
      urls: t
    });
  },
  previewImage9: function (a) {
    var t = [];
    if (this.data.zwimages1.indexOf("null") < 0 && "jpg" == this.data.kzm) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      t.push(i);
    }
    if (this.data.zwimages2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      t.push(s);
    }
    if (this.data.zwimages3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      t.push(e);
    }
    if (this.data.zwimages4.indexOf("null") < 0) {
      var d = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      t.push(d);
    }
    if (this.data.zwimages5.indexOf("null") < 0) {
      var n = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages5;
      t.push(n);
    }
    if (this.data.zwimages6.indexOf("null") < 0) {
      var h = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages6;
      t.push(h);
    }
    if (this.data.zwimages7.indexOf("null") < 0) {
      var l = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages7;
      t.push(l);
    }
    if (this.data.zwimages8.indexOf("null") < 0) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages8;
      t.push(o);
    }
    if (this.data.zwimages9.indexOf("null") < 0) {
      var u = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages9;
      t.push(u);
    }
    if (this.data.zwimages10.indexOf("null") < 0) {
      var p = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages10;
      t.push(p);
    }
    wx.previewImage({
      current: u,
      urls: t
    });
  },
  previewImage10: function (a) {
    var t = [];
    if (this.data.zwimages1.indexOf("null") < 0 && "jpg" == this.data.kzm) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      t.push(i);
    }
    if (this.data.zwimages2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      t.push(s);
    }
    if (this.data.zwimages3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      t.push(e);
    }
    if (this.data.zwimages4.indexOf("null") < 0) {
      var d = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      t.push(d);
    }
    if (this.data.zwimages5.indexOf("null") < 0) {
      var n = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages5;
      t.push(n);
    }
    if (this.data.zwimages6.indexOf("null") < 0) {
      var h = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages6;
      t.push(h);
    }
    if (this.data.zwimages7.indexOf("null") < 0) {
      var l = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages7;
      t.push(l);
    }
    if (this.data.zwimages8.indexOf("null") < 0) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages8;
      t.push(o);
    }
    if (this.data.zwimages9.indexOf("null") < 0) {
      var u = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages9;
      t.push(u);
    }
    if (this.data.zwimages10.indexOf("null") < 0) {
      var p = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages10;
      t.push(p);
    }
    wx.previewImage({
      current: p,
      urls: t
    });
  },

  checkprice() {

    var t = this;
    wx.request({
      url: i.globalData.api + "wx_listsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: t.data.xf_plu,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        a.data.length > 0 ?
          (t.setData({
              rb: a.data,
              sumprice: parseFloat(a.data[0].REALPRICE).toFixed(2),
              realprice: parseFloat(a.data[0].REALPRICE).toFixed(2),
              xishu: a.data[0].XISHU,
              sumrealprice: parseFloat(a.data[0].REALPRICE).toFixed(2),
              xf_desci: a.data[0].XF_DESCI,
              sorts: a.data[0].SORTS,
            }),
            t.data.sumprice.toString().indexOf(".") >= 0 &&
            t.setData({
              xiaoshu: !0
            })) :
          t.setData({
            replu: null
          })


      },
    });


  },


  onShow: function (a) {
    this.setData({
      stop: false,
      vipcode: wx.getStorageSync("vipcode") || "",
      wxuserid: wx.getStorageSync("wxuserid") || "",
    });
    wx.setStorageSync("xf_plu", this.data.xf_plu);
    wx.setStorageSync("starttime", new Date().valueOf());
    var t = this;
    wx.showLoading({ title: "正在加载" });
    wx.request({
        url: i.globalData.api + "wx_cgsearchs.ashx",
        data: { name: t.data.xf_plu },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        timeout: 10000,
        success: function (a) {
          var ts = parseInt(Date.parse(new Date()) / 1000);
          var item = a.data[0];
          t.setData({
            replu: a.data,
            tbimages1: item.TBIMAGES1 + "?temp=" + ts,
            tbimages2: item.TBIMAGES2 + "?temp=" + ts,
            tbimages3: item.TBIMAGES3 + "?temp=" + ts,
            zwimages1: item.ZWIMAGES1 + "?temp=" + ts,
            zwimages2: item.ZWIMAGES2 + "?temp=" + ts,
            zwimages3: item.ZWIMAGES3 + "?temp=" + ts,
            zwimages4: item.ZWIMAGES4 + "?temp=" + ts,
            zwimages5: item.ZWIMAGES5 + "?temp=" + ts,
            zwimages6: item.ZWIMAGES6 + "?temp=" + ts,
            zwimages7: item.ZWIMAGES7 + "?temp=" + ts,
            zwimages8: item.ZWIMAGES8 + "?temp=" + ts,
            zwimages9: item.ZWIMAGES9 + "?temp=" + ts,
            zwimages10: item.ZWIMAGES10 + "?temp=" + ts,
            xf_plu: item.XF_PLU,
            itemname: item.ITEMNAME,
            xf_desci: item.XF_DESCI,
            kzm: item.ZWIMAGES1.substr(-3, 3),
            xstock: item.XSTOCK,
          });
          t.checkplu();
          var pict = t.data.pict;
          var plu = item.XF_PLU;
          if (item.TBIMAGES1) {
            t.setData({ "swiperlist[0]": pict + plu + "//" + item.TBIMAGES1 });
          }
          if (item.TBIMAGES2) {
            t.setData({ "swiperlist[1]": pict + plu + "//" + item.TBIMAGES2 });
          }
          if (item.TBIMAGES3) {
            t.setData({ "swiperlist[2]": pict + plu + "//" + item.TBIMAGES3 });
          }
          t.checkprice();
          wx.hideLoading();
        },
        fail: function () {
          wx.hideLoading();
          wx.showToast({ title: "加载失败，请重试", icon: "none", duration: 2000 });
        },
      });
  },
  sevip: function () {
    wx.request({
      url: i.globalData.api + "wx_history.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        xf_plu: wx.getStorageSync("xf_plu"),
        starttime: wx.getStorageSync("starttime"),
        endtime: wx.getStorageSync("endtime"),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      dataType: "json",
      timeout: 10000,
      success: function () {},
      fail: function () {},
    });
  },
  sewx: function () {
    wx.request({
      url: i.globalData.api + "wx_historywx.ashx",
      data: {
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: wx.getStorageSync("xf_plu"),
        starttime: wx.getStorageSync("starttime"),
        endtime: wx.getStorageSync("endtime"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function () {},
      fail: function () {},
    });
  },
  onUnload: function () {
    wx.setStorageSync("endtime", new Date().valueOf());
    wx.getStorageSync("vipcode") ?
      this.sevip() :
      wx.getStorageSync("wxuserid") && this.sewx();
  },
  onShareAppMessage: function (a) {
    return wx.getStorageSync("d") ? {
        title: "广天藏品 " + this.data.xf_desci,
        path: "/pages/shopcg/goods/index?xf_plu=" +
          this.data.xf_plu +
          "&fxuserid=" +
          wx.getStorageSync("yguserid") +
          "&vipcode=" +
          wx.getStorageSync("vipcode") +
          "&fx=1",
        imageUrl: this.data.pict + this.data.xf_plu + "//" + this.data.tbimages1,
      } :
      wx.getStorageSync("vipcode") ? {
        title: "广天藏品 " + this.data.xf_desci,
        path: "/pages/shopcg/goods/index?xf_plu=" +
          this.data.xf_plu +
          "&fxuserid=" +
          wx.getStorageSync("vipcode") +
          "&fx=1",
        imageUrl: this.data.pict + this.data.xf_plu + "//" + this.data.tbimages1,
      } :
      wx.getStorageSync("wxuserid") ? {
        title: "广天藏品 " + this.data.xf_desci,
        path: "/pages/shopcg/goods/index?xf_plu=" +
          this.data.xf_plu +
          "&fxuserid=" +
          wx.getStorageSync("wxuserid") +
          "&fx=1",
        imageUrl: this.data.pict + this.data.xf_plu + "//" + this.data.tbimages1,
      } : {
        title: "广天藏品 " + this.data.xf_desci,
        path: "/pages/shopcg/goods/index?xf_plu=" + this.data.xf_plu + "&fx=1",
        imageUrl: this.data.pict + this.data.xf_plu + "//" + this.data.tbimages1,
      };
  },
  back: function () {
    (i.globalData.m = "1"),
    "1" == this.data.fx ?
      ((i.globalData.m = "2"),
        wx.switchTab({
          url: "/pages/home/index/index"
        })) :
      wx.navigateBack({
        delta: 0
      });
  },
});