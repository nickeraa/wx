var t,
  a = require("../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page({
  data:
    ((t = {
      StatusBar: e.globalData.StatusBar,
      CustomBar: e.globalData.CustomBar,
      swiperlist: [""],
      autoplay: !1,
      indicatorDots: !1,
      interval: 4e3,
      duration: 500,
      circular: !1,
      pict: e.globalData.scimgurl,
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
    a(
      a(
        a(
          a(
            a(
              a(
                a(
                  a(a(a(t, "userid", ""), "xf_desci", ""), "tbimages1", ""),
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
      "current",
      0
    ),
    a(
      a(
        a(
          a(
            a(
              a(
                a(
                  a(a(a(t, "fxuserid", ""), "fx", ""), "vipcode", ""),
                  "wxuserid",
                  ""
                ),
                "arr",
                []
              ),
              "kzm",
              ""
            ),
            "t",
            ""
          ),
          "isShow",
          !0
        ),
        "videoCoverImg",
        ""
      ),
      "videoPlayIcon",
      "/img/an.png"
    ),
    a(
      a(
        a(a(t, "videohight", ""), "iconList", [
          { icon: "shop", color: "gray", badge: 50, name: "店铺" },
          { icon: "favor", color: "gray", badge: 1, name: "收藏" },
          { icon: "cart", color: "gray", badge: 0, name: "预定单" },
        ]),
        "gridCol",
        3
      ),
      "n",
      0
    )),
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
  swiperChange: function (t) {
    this.setData({ current: t.detail.current });
  },
  computeImgHeight: function (t) {
    var a =
      (wx.getSystemInfoSync().windowWidth * t.detail.height) / t.detail.width +
      "px";
    this.setData({ swiperHeight: a });
  },
  onLoad: function (t) {
    console.log(t.xf_plu),
      t.xf_plu && this.setData({ xf_plu: t.xf_plu }),
      t.vipcode && wx.setStorageSync("vipcode", t.vipcode),
      t.fxuserid && wx.setStorageSync("fxuserid", t.fxuserid),
      t.wxuserid && wx.setStorageSync("wxuserid", t.wxuserid),
      t.d && wx.setStorageSync("d", t.d),
      t.fx &&
        (wx.setStorageSync("fx", t.fx),
        this.setData({ fx: wx.getStorageSync("fx") }));
    var a = this;
    wx.getSystemInfo({
      success: function (t) {
        a.setData({ videohight: parseInt(0.75 * t.windowWidth) }),
          console.log(a.data.videohight);
      },
    });
  },
  previewImage: function (t) {
    var a = t.target.dataset.src;
    wx.previewImage({ current: a, urls: this.data.swiperlist });
  },
  insc: function () {
    wx.request({
      url: e.globalData.api + "wx_insc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: this.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" != t.data &&
            wx.showToast({ title: "数据出错", icon: "error", duration: 1e3 });
      },
    });
  },
  checkplu: function () {
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_checksc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: t.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          e.data.length > 0 &&
            t.setData(
              a(
                a(
                  a({}, "iconList[1].name", "已收藏"),
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


  checkprice()
  {
  
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_listsc.ashx",
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


  delsc: function () {
    wx.request({
      url: e.globalData.api + "wx_delsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: this.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" != t.data &&
            wx.showToast({ title: "数据出错", icon: "error", duration: 1e3 });
      },
    });
  },
  setype: function (t) {
    var i = t.currentTarget.dataset.name;
    console.log(i),
      "店铺" == i
        ? ((e.globalData.m = "1"),
          wx.switchTab({ url: "/pages/home/index/index" }))
        : "收藏" == i
        ? (this.setData(
            a(
              a(
                a({}, "iconList[1].name", "已收藏"),
                "iconList[1].color",
                "red"
              ),
              "iconList[1].icon",
              "favorfill"
            )
          ),
          this.insc())
        : "已收藏" == i
        ? (this.setData(
            a(
              a(a({}, "iconList[1].name", "收藏"), "iconList[1].color", "gray"),
              "iconList[1].icon",
              "favor"
            )
          ),
          this.delsc())
        : wx.switchTab({ url: "/pages/bagsyd/index/index" });
  },
  onGetPhoneNumbergm: function (t) {
    console.log("ggggggggg");
    var a = this;
    wx.login({
      success: function (i) {
        i.code
          ? (console.log("步骤2获检查用户登录状态，获取用户电话号码！", i),
            wx.request({
              url: e.globalData.api + "wx_getphone.ashx",
              data: { code: i.code },
              header: { "content-type": "application/json" },
              success: function (e) {
                console.log("步骤三获取授权码，获取授权openid，session_key", e),
                  console.log(e.data);
                var i = e.data.split(",");
                a.setData({ arr: [i] });
                var s = t.detail.errMsg,
                  o = i[1];
                console.log(o);
                var n = t.detail.encryptedData,
                  c = t.detail.iv;
                "getPhoneNumber:ok" == s
                  ? wx.checkSession({
                      success: function () {
                        a.deciyptiongm(o, n, c);
                      },
                      fail: function () {},
                    })
                  : wx.showModal({
                      title: "提示",
                      content: "请选择手机号，注册登录喔",
                      showCancel: !1,
                      success: function (t) {
                        t.confirm;
                      },
                    });
              },
              fail: function (t) {
                console.log("fail", t);
              },
            }))
          : console.log("登录失败！" + i.errMsg);
      },
    });
  },
  deciyptiongm: function (t, a, i) {
    var s = this;
    console.log("步骤4根据秘钥解密手机号码sessionID：", t),
      wx.request({
        url: e.globalData.api + "wx_getvipphone.ashx",
        data: { sessionID: t, encryptedData: a, iv: i },
        header: { "content-type": "application/json" },
        success: function (t) {
          console.log(t.data),
            t.data.phoneNumber &&
              (wx.setStorageSync("wxuserid", t.data.phoneNumber),
              s.setData({ wxuserid: t.data.phoneNumber }),
              s.gwjs());
        },
      });
  },
  onGetPhoneNumbergwc: function (t) {
    console.log("kkkkkkkkk");
    var a = this;
    wx.login({
      success: function (i) {
        i.code
          ? (console.log("步骤2获检查用户登录状态，获取用户电话号码！", i),
            wx.request({
              url: e.globalData.api + "wx_getphone.ashx",
              data: { code: i.code },
              header: { "content-type": "application/json" },
              success: function (e) {
                console.log("步骤三获取授权码，获取授权openid，session_key", e),
                  console.log(e.data);
                var i = e.data.split(",");
                a.setData({ arr: [i] });
                var s = t.detail.errMsg,
                  o = i[1];
                console.log(o);
                var n = t.detail.encryptedData,
                  c = t.detail.iv;
                "getPhoneNumber:ok" == s
                  ? wx.checkSession({
                      success: function () {
                        a.deciyptiongwc(o, n, c);
                      },
                      fail: function () {},
                    })
                  : wx.showModal({
                      title: "提示",
                      content: "请选择手机号，注册登录喔",
                      showCancel: !1,
                      success: function (t) {
                        t.confirm;
                      },
                    });
              },
              fail: function (t) {
                console.log("fail", t);
              },
            }))
          : console.log("登录失败！" + i.errMsg);
      },
    });
  },
  deciyptiongwc: function (t, a, i) {
    var s = this;
    console.log("步骤4根据秘钥解密手机号码sessionID：", t),
      wx.request({
        url: e.globalData.api + "wx_getvipphone.ashx",
        data: { sessionID: t, encryptedData: a, iv: i },
        header: { "content-type": "application/json" },
        success: function (t) {
          console.log(t.data),
            t.data.phoneNumber &&
              (wx.setStorageSync("wxuserid", t.data.phoneNumber),
              s.setData({ wxuserid: t.data.phoneNumber }),
              s.gw());
        },
      });
  },
  gwjs: function () {
    wx.navigateTo({
      url: "/pages/deposityd/index/index?xf_plu=" + this.data.xf_plu,
    });
  },
  gw: function () {
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_insertyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: t.data.xf_plu,
        qty: "1",
        fxuserid: wx.getStorageSync("fxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" == a.data
            ? (wx.setStorageSync("p", "2"),
              wx.setStorageSync("p", "4"),
              wx.getStorageSync("n") || wx.setStorageSync("n", "0"),
              console.log(wx.getStorageSync("n")),
              wx.setStorageSync(
                "n",
                (parseInt(wx.getStorageSync("n")) + 1).toString()
              ),
              console.log(wx.getStorageSync("n")),
              t.setData({ n: wx.getStorageSync("n") }))
            : wx.showToast({ title: "数据出错", icon: "error", duration: 1e3 });
      },
    });
  },
  previewImage1: function (t) {
    var a = [];
    if (this.data.zwimages1.indexOf("null") && "jpg" == this.data.kzm) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      a.push(e);
    }
    if (this.data.zwimages2.indexOf("null")) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      a.push(i);
    }
    if (this.data.zwimages3.indexOf("null")) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      a.push(s);
    }
    if (this.data.zwimages4.indexOf("null")) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      a.push(o);
    }
    console.log(a), wx.previewImage({ current: e, urls: a });
  },
  previewImage2: function (t) {
    var a = [];
    if (this.data.zwimages1.indexOf("null") && "jpg" == this.data.kzm) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      a.push(e);
    }
    if (this.data.zwimages2.indexOf("null")) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      a.push(i);
    }
    if (this.data.zwimages3.indexOf("null")) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      a.push(s);
    }
    if (this.data.zwimages4.indexOf("null")) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      a.push(o);
    }
    console.log(a), wx.previewImage({ current: i, urls: a });
  },
  previewImage3: function (t) {
    var a = [];
    if (this.data.zwimages1.indexOf("null") && "jpg" == this.data.kzm) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      a.push(e);
    }
    if (this.data.zwimages2.indexOf("null")) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      a.push(i);
    }
    if (this.data.zwimages3.indexOf("null")) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      a.push(s);
    }
    if (this.data.zwimages4.indexOf("null")) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      a.push(o);
    }
    console.log(a), wx.previewImage({ current: s, urls: a });
  },
  previewImage4: function (t) {
    var a = [];
    if (this.data.zwimages1.indexOf("null") && "jpg" == this.data.kzm) {
      var e = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1;
      a.push(e);
    }
    if (this.data.zwimages2.indexOf("null")) {
      var i = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2;
      a.push(i);
    }
    if (this.data.zwimages3.indexOf("null")) {
      var s = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3;
      a.push(s);
    }
    if (this.data.zwimages4.indexOf("null")) {
      var o = this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4;
      a.push(o);
    }
    console.log(a), wx.previewImage({ current: o, urls: a });
  },
  onShow: function (t) {
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
    var a = this;
    wx.showLoading({ title: "正在加载" }),
      wx.request({
        url: e.globalData.api + "wx_cgsearchs.ashx",
        data: { name: a.data.xf_plu },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t);
          var e = Date.parse(new Date());
          (e /= 1e3),
            a.setData({
              replu: t.data,
              tbimages1: t.data[0].TBIMAGES1 + "?temp=" + e,
              tbimages2: t.data[0].TBIMAGES2 + "?temp=" + e,
              tbimages3: t.data[0].TBIMAGES3 + "?temp=" + e,
              zwimages1: t.data[0].ZWIMAGES1 + "?temp=" + e,
              zwimages2: t.data[0].ZWIMAGES2 + "?temp=" + e,
              zwimages3: t.data[0].ZWIMAGES3 + "?temp=" + e,
              zwimages4: t.data[0].ZWIMAGES4 + "?temp=" + e,
              xf_plu: t.data[0].XF_PLU,
              itemname: t.data[0].ITEMNAME,
              xf_desci: t.data[0].XF_DESCI,
              kzm: t.data[0].ZWIMAGES1.substr(-3, 3),
            }),
            console.log(a.data.kzm),
            console.log(a.data.xf_desci),
            a.checkplu(),
            t.data[0].TBIMAGES1 &&
              (a.setData({
                "swiperlist[0]":
                  a.data.pict + t.data[0].XF_PLU + "//" + t.data[0].TBIMAGES1,
              }),
              console.log(a.data.swiperlist[0])),
            t.data[0].TBIMAGES2 &&
              a.setData({
                "swiperlist[1]":
                  a.data.pict + t.data[0].XF_PLU + "//" + t.data[0].TBIMAGES2,
              }),
            t.data[0].TBIMAGES3 &&
              a.setData({
                "swiperlist[2]":
                  a.data.pict + t.data[0].XF_PLU + "//" + t.data[0].TBIMAGES3,
              }),
            console.log(a.data.swiperlist),
            a.checkprice();
            wx.hideLoading();
        },
      });
  },
  sevip: function () {
    wx.request({
      url: e.globalData.api + "wx_history.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        xf_plu: wx.getStorageSync("xf_plu"),
        starttime: wx.getStorageSync("starttime"),
        endtime: wx.getStorageSync("endtime"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t);
      },
    });
  },
  sewx: function () {
    wx.request({
      url: e.globalData.api + "wx_historywx.ashx",
      data: {
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: wx.getStorageSync("xf_plu"),
        starttime: wx.getStorageSync("starttime"),
        endtime: wx.getStorageSync("endtime"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t);
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
  onShareAppMessage: function (t) {
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
          success: function (t) {
            console.log("转发成功:" + JSON.stringify(t));
          },
          fail: function (t) {
            console.log("转发失败:" + JSON.stringify(t));
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
          success: function (t) {
            console.log("转发成功:" + JSON.stringify(t));
          },
          fail: function (t) {
            console.log("转发失败:" + JSON.stringify(t));
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
          success: function (t) {
            console.log("转发成功:" + JSON.stringify(t));
          },
          fail: function (t) {
            console.log("转发失败:" + JSON.stringify(t));
          },
        }
      : {
          title: "广天藏品 " + this.data.xf_desci,
          path:
            "/pages/shopcg/goods/index?xf_plu=" + this.data.xf_plu + "&fx=1",
          imageUrl:
            this.data.pict + this.data.xf_plu + "//" + this.data.tbimages1,
          success: function (t) {
            console.log("转发成功:" + JSON.stringify(t));
          },
          fail: function (t) {
            console.log("转发失败:" + JSON.stringify(t));
          },
        };
  },
  back: function () {
    (e.globalData.m = "1"),
      "1" == this.data.fx
        ? ((e.globalData.m = "2"),
          console.log("jjjjjjjjjjjjjjj"),
          wx.switchTab({ url: "/pages/home/index/index" }))
        : wx.navigateBack({ delta: 0 });
  },
});
