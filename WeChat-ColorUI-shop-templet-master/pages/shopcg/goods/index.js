var t = require("../../../@babel/runtime/helpers/defineProperty"),
  i = getApp();
Page({
  data: {
    StatusBar: i.globalData.StatusBar,
    CustomBar: i.globalData.CustomBar,
    swiperlist: [],
    autoplay: !1,
    interval: 4e3,
    duration: 500,
    circular: !1,
    pict: i.globalData.scimgurl,
    xf_plu: "",
    rb: [],
    stop: false,
    xf_desci: "",
    tbimages1: "",
    current: 0,
    fx: "",
    vipcode: "",
    wxuserid: "",
    kzm: "",
    isShow: !0,
    videoPlayIcon: i.globalData.iconurl + 'an.png',
    videohight: "",
    replu: [],
    iconList: [{
      icon: "shop",
      color: "gray",
      name: "店铺"
    }, {
      icon: "favor",
      color: "gray",
      name: "收藏"
    }, {
      icon: "cart",
      color: "gray",
      name: "购物车"
    }],
    gridCol: 3,
    n: 0,
  },
  onReady: function () {
    this.videoContext = wx.createVideoContext("myVideo");
  },
  bindplay: function () {
    this.setData({ isShow: !1 }),
      this.videoContext.play();
  },
  bindended: function () {
    this.setData({ isShow: !0 });
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
      fail: function () {
        t.setData({ videohight: 300 });
      },
    });
  },
  previewImage: function (a) {
    var t = a.target.dataset.src;
    if (!this.data.swiperlist || this.data.swiperlist.length === 0) return;
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
        if (Array.isArray(i.data) && i.data.length > 0) {
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
        }
      },
      fail: function () {
        // 收藏状态查询非关键功能，静默降级
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
    if (this.data.stop) return;
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
                var s = (i.data || "").split(",");
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
                    fail: function () {
                      wx.hideLoading();
                      wx.showToast({ title: "登录已过期，请重试", icon: "none", duration: 2000 });
                      t.setData({ stop: false });
                    },
                  })) :
                  (wx.hideLoading(),
                  wx.showModal({
                    title: "提示",
                    content: "请选择手机号，注册登录喔",
                    showCancel: !1,
                    complete: function () {
                      t.setData({ stop: false });
                    },
                  }));
              },
              fail: function () {
                wx.hideLoading();
                t.setData({ stop: false });
                wx.showToast({ title: "获取授权失败，请重试", icon: "none", duration: 2000 });
              },
            }) :
          (wx.hideLoading(), t.setData({ stop: false }), wx.showToast({ title: "获取授权失败，请重试", icon: "none", duration: 2000 }));
      },
      fail: function () {
        wx.hideLoading();
        t.setData({ stop: false });
        wx.showToast({ title: "登录失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  deciyptiongm: function (a, t, s) {
    wx.showLoading({ title: '解密中...' });
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
          if (a.data.phoneNumber) {
            wx.setStorageSync("wxuserid", a.data.phoneNumber);
            e.setData({ wxuserid: a.data.phoneNumber });
            wx.hideLoading();
            e.gwjs();
          } else {
            wx.hideLoading();
            e.setData({ stop: false });
            wx.showToast({ title: "获取手机号失败，请重试", icon: "none", duration: 2000 });
          }
        },
        fail: function () {
          wx.hideLoading();
          e.setData({ stop: false });
          wx.showToast({ title: "解密失败，请重试", icon: "none", duration: 2000 });
        },
      });
  },
  onGetPhoneNumbergwc: function (a) {
    wx.showLoading({ title: '连接中...' });
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
              timeout: 10000,
              success: function (i) {
                var s = (i.data || "").split(",");
                var e = a.detail.errMsg,
                  d = s[1];
                var n = a.detail.encryptedData,
                  h = a.detail.iv;
                "getPhoneNumber:ok" == e
                  ?
                  (wx.hideLoading(),
                  wx.checkSession({
                    success: function () {
                      t.deciyptiongwc(d, n, h);
                    },
                    fail: function () {
                      wx.hideLoading();
                      wx.showToast({ title: "登录已过期，请重试", icon: "none", duration: 2000 });
                    },
                  })) :
                  (wx.hideLoading(),
                  wx.showModal({
                    title: "提示",
                    content: "请选择手机号，注册登录喔",
                    showCancel: !1,
                  }));
              },
              fail: function () {
                wx.hideLoading();
                t.setData({ stop: false });
                wx.showToast({ title: "获取授权失败，请重试", icon: "none", duration: 2000 });
              },
            }) :
          (wx.hideLoading(), wx.showToast({ title: "获取授权失败，请重试", icon: "none", duration: 2000 }));
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "登录失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  deciyptiongwc: function (a, t, s) {
    wx.showLoading({ title: '解密中...' });
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
          if (a.data.phoneNumber) {
            wx.setStorageSync("wxuserid", a.data.phoneNumber);
            e.setData({ wxuserid: a.data.phoneNumber });
            wx.hideLoading();
            e.gw();
          } else {
            wx.hideLoading();
            wx.showToast({ title: "获取手机号失败，请重试", icon: "none", duration: 2000 });
          }
        },
        fail: function () {
          wx.hideLoading();
          wx.showToast({ title: "解密失败，请重试", icon: "none", duration: 2000 });
        },
      });
  },
  gwjs: function () {
    if (this.data.stop) return;
    wx.showLoading({ title: '连接中...' });
    this.setData({ stop: true });
    var that = this;
    wx.request({
      url: i.globalData.api + "wx_checkxstock.ashx",
      data: { xf_plu: this.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        var stock = 0;
        if (Array.isArray(a.data) && a.data.length > 0 && a.data[0]) {
          stock = parseInt(a.data[0].XSTOCK);
          if (isNaN(stock)) stock = 0;
        }
        if (stock > 0) {
          wx.navigateTo({
            url: "/pages/deposit/index/index?xf_plu=" + that.data.xf_plu,
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "已售罄，数量为零",
            showCancel: false,
            complete: function () {
              that.setData({ stop: false });
            },
          });
        }
        wx.hideLoading();
      },
      fail: function () {
        wx.hideLoading();
        that.setData({ stop: false });
        wx.showToast({ title: "网络异常，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  gw: function () {
    var a = this;
    // 售罄预检：详情 API 已返回 XSTOCK，本地拦截避免误导性的"数据出错"提示
    var replu = a.data.replu;
    if (replu && replu.length > 0 && replu[0]) {
      var stock = parseInt(replu[0].XSTOCK);
      if (!isNaN(stock) && stock <= 0) {
        wx.showModal({
          title: "提示",
          content: "已售罄，数量为零",
          showCancel: false,
        });
        return;
      }
    }
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
          wx.showToast({ title: "已加入购物车", icon: "success", duration: 1500 });
        } else {
          wx.showToast({ title: "数据出错", icon: "error", duration: 1000 });
        }
      },
      fail: function () {
        wx.showToast({ title: "添加失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  previewZwImage: function (a) {
    var t = this, urls = [];
    var replu = t.data.replu;
    if (!replu || replu.length === 0) return;
    var item = replu[0];
    var base = t.data.pict + item.XF_PLU + "//";
    for (var i = 1; i <= 10; i++) {
      var raw = item["ZWIMAGES" + i];
      if (raw && raw.indexOf("null") < 0) {
        if (i === 1 && "jpg" !== t.data.kzm) continue;
        urls.push(base + raw);
      }
    }
    var current = a.currentTarget.dataset.src || urls[0];
    wx.previewImage({
      current: current,
      urls: urls
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
      timeout: 10000,
      success: function (a) {
        Array.isArray(a.data) && a.data.length > 0 ?
          (t.setData({
              rb: a.data,
              xf_desci: a.data[0].XF_DESCI,
            })) :
          t.setData({ rb: [] });

      },
      fail: function () {
        // 价格查询非关键功能，静默降级
      },
    });


  },


  onShow: function (a) {
    this.setData({
      stop: false,
      current: 0,
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
          var ts = parseInt(Date.now() / 1000);
          if (!a.data || a.data.length === 0) {
            wx.hideLoading();
            wx.showToast({ title: "暂无商品数据", icon: "none", duration: 2000 });
            return;
          }
          var item = a.data[0];
          var pict = t.data.pict;
          var plu = item.XF_PLU;
          var swiperlist = [];
          if (item.TBIMAGES1) swiperlist.push(pict + plu + "//" + item.TBIMAGES1);
          if (item.TBIMAGES2) swiperlist.push(pict + plu + "//" + item.TBIMAGES2);
          if (item.TBIMAGES3) swiperlist.push(pict + plu + "//" + item.TBIMAGES3);
          t.setData({
            replu: a.data,
            tbimages1: item.TBIMAGES1 ? item.TBIMAGES1 + "?temp=" + ts : "",
            xf_plu: item.XF_PLU,
            xf_desci: item.XF_DESCI,
            kzm: (item.ZWIMAGES1 || "").substr(-3, 3),
            swiperlist: swiperlist,
          });
          t.checkplu();
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
      timeout: 10000,
      success: function () {},
      fail: function () {
        // 浏览记录提交非关键功能，静默降级
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
      timeout: 10000,
      success: function () {},
      fail: function () {
        // 浏览记录提交非关键功能，静默降级
      },
    });
  },
  onUnload: function () {
    wx.setStorageSync("endtime", new Date().valueOf());
    wx.getStorageSync("vipcode") ?
      this.sevip() :
      wx.getStorageSync("wxuserid") && this.sewx();
  },
  onShareAppMessage: function (a) {
    var tbimg = (this.data.tbimages1 || "").split("?temp=")[0];
    var imageUrl = tbimg ? this.data.pict + this.data.xf_plu + "//" + tbimg : "";
    return wx.getStorageSync("d") ? {
        title: "广天藏品 " + this.data.xf_desci,
        path: "/pages/shopcg/goods/index?xf_plu=" +
          this.data.xf_plu +
          "&fxuserid=" +
          wx.getStorageSync("yguserid") +
          "&vipcode=" +
          wx.getStorageSync("vipcode") +
          "&fx=1",
        imageUrl: imageUrl,
      } :
      wx.getStorageSync("vipcode") ? {
        title: "广天藏品 " + this.data.xf_desci,
        path: "/pages/shopcg/goods/index?xf_plu=" +
          this.data.xf_plu +
          "&fxuserid=" +
          wx.getStorageSync("vipcode") +
          "&fx=1",
        imageUrl: imageUrl,
      } :
      wx.getStorageSync("wxuserid") ? {
        title: "广天藏品 " + this.data.xf_desci,
        path: "/pages/shopcg/goods/index?xf_plu=" +
          this.data.xf_plu +
          "&fxuserid=" +
          wx.getStorageSync("wxuserid") +
          "&fx=1",
        imageUrl: imageUrl,
      } : {
        title: "广天藏品 " + this.data.xf_desci,
        path: "/pages/shopcg/goods/index?xf_plu=" + this.data.xf_plu + "&fx=1",
        imageUrl: imageUrl,
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
        delta: 1
      });
  },
});