var a,
  t = require("../../../@babel/runtime/helpers/defineProperty"),
  i = getApp();
Page({
  data:
    ((a = {
      StatusBar: i.globalData.StatusBar,
      CustomBar: i.globalData.CustomBar,
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
      rb:{}
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
              "/img/an.png"
            ),
            "videohight",
            ""
          ),
          "iconList",
          [
            { icon: "shop", color: "gray", badge: 50, name: "店铺" },
            { icon: "favor", color: "gray", badge: 1, name: "收藏" },
            { icon: "cart", color: "gray", badge: 0, name: "购物车" },
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
    this.setData({ isShow: !1 }), this.videoContext.play(), console.log("play");
  },
  bindended: function () {
    console.log("bindended"),
      this.setData({ isShow: !0 }),
      this.videoContext.ended();
  },
  bindpause: function () {
    console.log("pause");
  },
  swiperChange: function (a) {
    this.setData({ current: a.detail.current });
  },
  computeImgHeight: function (a) {
    var t =
      (wx.getSystemInfoSync().windowWidth * a.detail.height) / a.detail.width +
      "px";
    this.setData({ swiperHeight: t });
  },
  onLoad: function (a) {
    console.log(a.xf_plu),
      console.log(a.fxuserid),
      console.log(a.fx),
      a.xf_plu && this.setData({ xf_plu: a.xf_plu }),
      a.vipcode && wx.setStorageSync("vipcode", a.vipcode),
      a.fxuserid && wx.setStorageSync("fxuserid", a.fxuserid),
      a.wxuserid && wx.setStorageSync("wxuserid", a.wxuserid),
      a.d && wx.setStorageSync("d", a.d),
      a.fx &&
        (wx.setStorageSync("fx", a.fx),
        this.setData({ fx: wx.getStorageSync("fx") }));
    var t = this;
    wx.getSystemInfo({
      success: function (a) {
        t.setData({ videohight: parseInt(0.75 * a.windowWidth) }),
          console.log(t.data.videohight);
      },
    });
  },
  previewImage: function (a) {
    var t = a.target.dataset.src;
    wx.previewImage({ current: t, urls: this.data.swiperlist });
  },
  insc: function () {
    wx.request({
      url: i.globalData.api + "wx_insc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: this.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" != a.data &&
            wx.showToast({ title: "数据出错", icon: "error", duration: 1e3 });
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
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (i) {
        console.log(i),
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
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" != a.data &&
            wx.showToast({ title: "数据出错", icon: "error", duration: 1e3 });
      },
    });
  },
  setype: function (a) {
    console.log("gggggggg");
    var s = a.currentTarget.dataset.name;
    console.log(s),
      "店铺" == s
        ? ((i.globalData.m = "1"),
          wx.redirectTo({ url: "/pages/zthome/index/index" }))
        : "收藏" == s
        ? (this.setData(
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
          this.insc())
        : "已收藏" == s
        ? (this.setData(
            t(
              t(t({}, "iconList[1].name", "收藏"), "iconList[1].color", "gray"),
              "iconList[1].icon",
              "favor"
            )
          ),
          this.delsc())
        : wx.switchTab({ url: "/pages/bags/index/index" });
  },
  onGetPhoneNumbergm: function (a) {
    console.log("ggggggggg");
    var t = this;
    wx.login({
      success: function (s) {
        s.code
          ? (console.log("步骤2获检查用户登录状态，获取用户电话号码！", s),
            wx.request({
              url: i.globalData.api + "wx_getphone.ashx",
              data: { code: s.code },
              header: { "content-type": "application/json" },
              success: function (i) {
                console.log("步骤三获取授权码，获取授权openid，session_key", i),
                  console.log(i.data);
                var s = i.data.split(",");
                t.setData({ arr: [s] });
                var e = a.detail.errMsg,
                  d = s[1];
                console.log(d);
                var n = a.detail.encryptedData,
                  h = a.detail.iv;
                "getPhoneNumber:ok" == e
                  ? wx.checkSession({
                      success: function () {
                        t.deciyptiongm(d, n, h);
                      },
                      fail: function () {},
                    })
                  : wx.showModal({
                      title: "提示",
                      content: "请选择手机号，注册登录喔",
                      showCancel: !1,
                      success: function (a) {
                        a.confirm;
                      },
                    });
              },
              fail: function (a) {
                console.log("fail", a);
              },
            }))
          : console.log("登录失败！" + s.errMsg);
      },
    });
  },
  deciyptiongm: function (a, t, s) {
    var e = this;
    console.log("步骤4根据秘钥解密手机号码sessionID：", a),
      wx.request({
        url: i.globalData.api + "wx_getvipphone.ashx",
        data: { sessionID: a, encryptedData: t, iv: s },
        header: { "content-type": "application/json" },
        success: function (a) {
          console.log(a.data),
            a.data.phoneNumber &&
              (wx.setStorageSync("wxuserid", a.data.phoneNumber),
              e.setData({ wxuserid: a.data.phoneNumber }),
              e.gwjs());
        },
      });
  },
  onGetPhoneNumbergwc: function (a) {
    var t = this;
    wx.login({
      success: function (s) {
        s.code
          ? (console.log("步骤2获检查用户登录状态，获取用户电话号码！", s),
            wx.request({
              url: i.globalData.api + "wx_getphone.ashx",
              data: { code: s.code },
              header: { "content-type": "application/json" },
              success: function (i) {
                console.log("步骤三获取授权码，获取授权openid，session_key", i),
                  console.log(i.data);
                var s = i.data.split(",");
                t.setData({ arr: [s] });
                var e = a.detail.errMsg,
                  d = s[1];
                console.log(d);
                var n = a.detail.encryptedData,
                  h = a.detail.iv;
                "getPhoneNumber:ok" == e
                  ? wx.checkSession({
                      success: function () {
                        t.deciyptiongwc(d, n, h);
                      },
                      fail: function () {},
                    })
                  : wx.showModal({
                      title: "提示",
                      content: "请选择手机号，注册登录喔",
                      showCancel: !1,
                      success: function (a) {
                        a.confirm;
                      },
                    });
              },
              fail: function (a) {
                console.log("fail", a);
              },
            }))
          : console.log("登录失败！" + s.errMsg);
      },
    });
  },
  deciyptiongwc: function (a, t, s) {
    var e = this;
    console.log("步骤4根据秘钥解密手机号码sessionID：", a),
      wx.request({
        url: i.globalData.api + "wx_getvipphone.ashx",
        data: { sessionID: a, encryptedData: t, iv: s },
        header: { "content-type": "application/json" },
        success: function (a) {
          console.log(a.data),
            a.data.phoneNumber &&
              (wx.setStorageSync("wxuserid", a.data.phoneNumber),
              e.setData({ wxuserid: a.data.phoneNumber }),
              e.gw());
        },
      });
  },
  gwjs: function () {
    wx.navigateTo({
      url: "/pages/deposit/index/index?xf_plu=" + this.data.xf_plu,
    });
  },
  gw: function () {
    var a = this;
    wx.request({
      url: i.globalData.api + "wx_insertsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: a.data.xf_plu,
        qty: "1",
        fxuserid: wx.getStorageSync("fxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" == t.data
            ? (wx.setStorageSync("p", "2"),
              wx.getStorageSync("n") || wx.setStorageSync("n", "0"),
              console.log(wx.getStorageSync("n")),
              wx.setStorageSync(
                "n",
                (parseInt(wx.getStorageSync("n")) + 1).toString()
              ),
              console.log(wx.getStorageSync("n")),
              a.setData({ n: wx.getStorageSync("n") }))
            : wx.showToast({ title: "数据出错", icon: "error", duration: 1e3 });
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
    console.log(t), wx.previewImage({ current: i, urls: t });
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
    console.log(t), wx.previewImage({ current: s, urls: t });
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
    console.log(t), wx.previewImage({ current: e, urls: t });
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
    console.log(t), wx.previewImage({ current: d, urls: t });
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
    console.log(t), wx.previewImage({ current: n, urls: t });
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
    console.log(t), wx.previewImage({ current: h, urls: t });
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
    console.log(t), wx.previewImage({ current: l, urls: t });
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
    console.log(t), wx.previewImage({ current: o, urls: t });
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
    console.log(t), wx.previewImage({ current: u, urls: t });
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
    console.log(t), wx.previewImage({ current: p, urls: t });
  },

checkprice()
{

  var t = this;
  wx.request({
    url: i.globalData.api + "wx_listsc.ashx",
    data: {
      vipcode: wx.getStorageSync("vipcode"),
      wxuserid: wx.getStorageSync("wxuserid"),
      xf_plu: t.data.xf_plu,
    },
    header: { "content-type": "application/x-www-form-urlencoded" },
    dataType: "json",
    success: function (a) {
      console.log(a.data),
        a.data.length > 0
          ? (t.setData({
              rb: a.data,
              sumprice: parseFloat(a.data[0].REALPRICE).toFixed(2),
              realprice: parseFloat(a.data[0].REALPRICE).toFixed(2),
              xishu: a.data[0].XISHU,
              sumrealprice: parseFloat(a.data[0].REALPRICE).toFixed(2),
              xf_desci: a.data[0].XF_DESCI,
              sorts: a.data[0].SORTS,
            }),
            t.data.sumprice.toString().indexOf(".") >= 0 &&
              t.setData({ xiaoshu: !0 }))
          : t.setData({ replu: null })
       
     
    },
  });


},


  onShow: function (a) {
    this.setData({
      vipcode: wx.getStorageSync("vipcode"),
      wxuserid: wx.getStorageSync("wxuserid"),
    }),
      console.log(this.data.vipcode),
      console.log(this.data.wxuserid),
      console.log(wx.getStorageSync("vipcode")),
      console.log(wx.getStorageSync("wxuserid")),
      wx.setStorageSync("xf_plu", this.data.xf_plu),
      wx.setStorageSync("starttime", new Date().valueOf()),
      console.log(wx.getStorageSync("starttime"));
    var t = this;
    wx.showLoading({ title: "正在加载" }),
      wx.request({
        url: i.globalData.api + "wx_cgsearchs.ashx",
        data: { name: t.data.xf_plu },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a);
          var i = Date.parse(new Date());
          (i /= 1e3),
            t.setData({
              replu: a.data,
              tbimages1: a.data[0].TBIMAGES1 + "?temp=" + i,
              tbimages2: a.data[0].TBIMAGES2 + "?temp=" + i,
              tbimages3: a.data[0].TBIMAGES3 + "?temp=" + i,
              zwimages1: a.data[0].ZWIMAGES1 + "?temp=" + i,
              zwimages2: a.data[0].ZWIMAGES2 + "?temp=" + i,
              zwimages3: a.data[0].ZWIMAGES3 + "?temp=" + i,
              zwimages4: a.data[0].ZWIMAGES4 + "?temp=" + i,
              zwimages5: a.data[0].ZWIMAGES5 + "?temp=" + i,
              zwimages6: a.data[0].ZWIMAGES6 + "?temp=" + i,
              zwimages7: a.data[0].ZWIMAGES7 + "?temp=" + i,
              zwimages8: a.data[0].ZWIMAGES8 + "?temp=" + i,
              zwimages9: a.data[0].ZWIMAGES9 + "?temp=" + i,
              zwimages10: a.data[0].ZWIMAGES10 + "?temp=" + i,
              xf_plu: a.data[0].XF_PLU,
              itemname: a.data[0].ITEMNAME,
              xf_desci: a.data[0].XF_DESCI,
              kzm: a.data[0].ZWIMAGES1.substr(-3, 3),
            }),
            console.log(t.data.kzm),
            console.log(t.data.xf_desci),
            t.checkplu(),
            a.data[0].TBIMAGES1 &&
              (t.setData({
                "swiperlist[0]":
                  t.data.pict + a.data[0].XF_PLU + "//" + a.data[0].TBIMAGES1,
              }),
              console.log(t.data.swiperlist[0])),
            a.data[0].TBIMAGES2 &&
              t.setData({
                "swiperlist[1]":
                  t.data.pict + a.data[0].XF_PLU + "//" + a.data[0].TBIMAGES2,
              }),
            a.data[0].TBIMAGES3 &&
              t.setData({
                "swiperlist[2]":
                  t.data.pict + a.data[0].XF_PLU + "//" + a.data[0].TBIMAGES3,
              }),
            console.log(t.data.swiperlist),
            t.checkprice();
            wx.hideLoading();
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
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a);
      },
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
      success: function (a) {
        console.log(a);
      },
    });
  },
  onUnload: function () {
    wx.setStorageSync("endtime", new Date().valueOf()),
      console.log(wx.getStorageSync("starttime", new Date().valueOf())),
      console.log(wx.getStorageSync("endtime", new Date().valueOf())),
      wx.getStorageSync("vipcode")
        ? this.sevip()
        : wx.getStorageSync("wxuserid") && this.sewx();
  },
  onShareAppMessage: function (a) {
    return wx.getStorageSync("d")
      ? {
          title: "广天藏品 " + this.data.xf_desci,
          path:
            "/pages/shopcg/goods/index?xf_plu=" +
            this.data.xf_plu +
            "&fxuserid=" +
            wx.getStorageSync("yguserid") +
            "&vipcode=" +
            wx.getStorageSync("vipcode") +
            "&fx=1",
          imageUrl:
            this.data.pict + this.data.xf_plu + "//" + this.data.tbimages1,
          success: function (a) {
            console.log("转发成功:" + JSON.stringify(a));
          },
          fail: function (a) {
            console.log("转发失败:" + JSON.stringify(a));
          },
        }
      : wx.getStorageSync("vipcode")
      ? {
          title: "广天藏品 " + this.data.xf_desci,
          path:
            "/pages/shopcg/goods/index?xf_plu=" +
            this.data.xf_plu +
            "&fxuserid=" +
            wx.getStorageSync("vipcode") +
            "&fx=1",
          imageUrl:
            this.data.pict + this.data.xf_plu + "//" + this.data.tbimages1,
          success: function (a) {
            console.log("转发成功:" + JSON.stringify(a));
          },
          fail: function (a) {
            console.log("转发失败:" + JSON.stringify(a));
          },
        }
      : wx.getStorageSync("wxuserid")
      ? {
          title: "广天藏品 " + this.data.xf_desci,
          path:
            "/pages/shopcg/goods/index?xf_plu=" +
            this.data.xf_plu +
            "&fxuserid=" +
            wx.getStorageSync("wxuserid") +
            "&fx=1",
          imageUrl:
            this.data.pict + this.data.xf_plu + "//" + this.data.tbimages1,
          success: function (a) {
            console.log("转发成功:" + JSON.stringify(a));
          },
          fail: function (a) {
            console.log("转发失败:" + JSON.stringify(a));
          },
        }
      : {
          title: "广天藏品 " + this.data.xf_desci,
          path:
            "/pages/shopcg/goods/index?xf_plu=" + this.data.xf_plu + "&fx=1",
          imageUrl:
            this.data.pict + this.data.xf_plu + "//" + this.data.tbimages1,
          success: function (a) {
            console.log("转发成功:" + JSON.stringify(a));
          },
          fail: function (a) {
            console.log("转发失败:" + JSON.stringify(a));
          },
        };
  },
  back: function () {
    (i.globalData.m = "1"),
      "1" == this.data.fx
        ? ((i.globalData.m = "2"),
          console.log("jjjjjjjjjjjjjjj"),
          wx.switchTab({ url: "/pages/home/index/index" }))
        : wx.navigateBack({ delta: 0 });
  },
});
