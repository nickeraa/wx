var e = getApp();
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    iconurlan: e.globalData.iconurl + 'an.png',
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
    xstock: 0,
    stop: false,
    xf_qoh: "",
    rb: [],
    userid: "",
    xf_desci: "",
    tbimages1: "",
    tbimages2: "",
    tbimages3: "",
    zwimages1: "",
    zwimages2: "",
    zwimages3: "",
    zwimages4: "",
    current: 0,
    fxuserid: "",
    fx: "",
    vipcode: "",
    wxuserid: "",
    arr: [],
    kzm: "",
    t: "",
    isShow: !0,
    videoCoverImg: "",
    videoPlayIcon: e.globalData.iconurl + 'an.png',
    videohight: "",
    iconList: [
      { icon: "shop", color: "gray", badge: 50, name: "店铺" },
      { icon: "favor", color: "gray", badge: 1, name: "收藏" },
      { icon: "cart", color: "gray", badge: 0, name: "预定单" },
    ],
    gridCol: 3,
    n: 0,
  },
  onReady: function () {
    this.videoContext = wx.createVideoContext("myVideo");
  },
  bindplay: function () {
    this.setData({ isShow: !1 }), this.videoContext.play();
  },
  bindended: function () {
    this.setData({ isShow: !0 }), this.videoContext.ended();
  },
  bindpause: function () {},
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
        a.setData({ videohight: parseInt(0.75 * t.windowWidth) });
      },
      fail: function () {}
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
      timeout: 10000,
      success: function (t) {
        "ok" != t.data &&
          wx.showToast({ title: "数据出错", icon: "error", duration: 1e3 });
      },
      fail: function () {
        wx.showToast({ title: "网络请求失败", icon: "error", duration: 1500 });
      }
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
      timeout: 10000,
      success: function (r) {
        r.data && Array.isArray(r.data) && r.data.length > 0 &&
          t.setData({
            "iconList[1].name": "已收藏",
            "iconList[1].color": "red",
            "iconList[1].icon": "favorfill"
          });
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
      timeout: 10000,
      success: function (a) {
        if (a.data && Array.isArray(a.data) && a.data.length > 0) {
          t.setData({
            rb: a.data,
            sumprice: parseFloat(a.data[0].REALPRICE).toFixed(2),
            realprice: parseFloat(a.data[0].REALPRICE).toFixed(2),
            xishu: a.data[0].XISHU,
            sumrealprice: parseFloat(a.data[0].REALPRICE).toFixed(2),
            xf_desci: a.data[0].XF_DESCI,
            sorts: a.data[0].SORTS,
            xiaoshu: true,
          });
        } else {
          t.setData({ replu: [] });
        }
      },
      fail: function () {
        t.setData({ replu: [] });
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
      timeout: 10000,
      success: function (t) {
        "ok" != t.data &&
          wx.showToast({ title: "数据出错", icon: "error", duration: 1e3 });
      },
      fail: function () {
        wx.showToast({ title: "网络请求失败", icon: "error", duration: 1500 });
      }
    });
  },
  setype: function (t) {
    var i = t.currentTarget.dataset.name;
    "店铺" == i
      ? ((e.globalData.m = "1"),
        wx.switchTab({ url: "/pages/home/index/index" }))
      : "收藏" == i
      ? (this.setData({
          "iconList[1].name": "已收藏",
          "iconList[1].color": "red",
          "iconList[1].icon": "favorfill"
        }),
        this.insc())
      : "已收藏" == i
      ? (this.setData({
          "iconList[1].name": "收藏",
          "iconList[1].color": "gray",
          "iconList[1].icon": "favor"
        }),
        this.delsc())
      : wx.switchTab({
        url: "/pages/bagsyd/index/index"
      });
  },
  _handlePhoneLogin: function (e, callback) {
    var that = this;
    wx.login({
      success: function (i) {
        i.code
          ? wx.request({
              url: getApp().globalData.api + "wx_getphone.ashx",
              data: { code: i.code },
              header: { "content-type": "application/json" },
              timeout: 10000,
              success: function (r) {
                if (!r.data || typeof r.data !== "string") {
                  wx.hideLoading();
                  wx.showToast({ title: "数据格式错误", icon: "error", duration: 1500 });
                  return;
                }
                var arr = r.data.split(",");
                that.setData({ arr: [arr] });
                var errMsg = e.detail.errMsg;
                var sessionID = arr[1];
                var encryptedData = e.detail.encryptedData;
                var iv = e.detail.iv;
                "getPhoneNumber:ok" == errMsg
                  ? wx.checkSession({
                      success: function () {
                        callback.call(that, sessionID, encryptedData, iv);
                      },
                      fail: function () {},
                    })
                  : (wx.hideLoading(), wx.showModal({
                      title: "提示",
                      content: "请选择手机号，注册登录喔",
                      showCancel: !1
                    }));
              },
              fail: function () {
                wx.hideLoading();
                wx.showToast({ title: "网络请求失败", icon: "error", duration: 1500 });
              },
            })
          : (wx.hideLoading(), wx.showToast({ title: "登录失败", icon: "error", duration: 1500 }));
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "登录失败", icon: "error", duration: 1500 });
      }
    });
  },
  onGetPhoneNumbergm: function (t) {
    this._handlePhoneLogin(t, this.deciyptiongm);
  },
  onGetPhoneNumbergwc: function (t) {
    wx.showLoading({ title: '连接中...' });
    this.setData({ stop: true });
    this._handlePhoneLogin(t, this.deciyptiongwc);
  },
  deciyptiongm: function (t, a, i) {
    var s = this;
    wx.request({
      url: e.globalData.api + "wx_getvipphone.ashx",
      data: { sessionID: t, encryptedData: a, iv: i },
      header: { "content-type": "application/json" },
      timeout: 10000,
      success: function (t) {
        if (t.data && t.data.phoneNumber) {
          wx.setStorageSync("wxuserid", t.data.phoneNumber);
          s.setData({ wxuserid: t.data.phoneNumber });
          s.gwjs();
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "解密失败", icon: "error", duration: 1500 });
      },
    });
  },
  onGetPhoneNumbergwc: function (t) {
    wx.showLoading({
      title: '连接中...',
    })
    this.setData({ stop: true })
    var a = this;
    wx.login({
      success: function (i) {
        i.code
          ? wx.request({
              url: e.globalData.api + "wx_getphone.ashx",
              data: { code: i.code },
              header: { "content-type": "application/json" },
              timeout: 10000,
              success: function (e) {
                if (!e.data || typeof e.data !== "string") {
                  wx.hideLoading();
                  wx.showToast({ title: "数据格式错误", icon: "error", duration: 1500 });
                  return;
                }
                var i = e.data.split(",");
                a.setData({ arr: [i] });
                var s = t.detail.errMsg,
                  o = i[1];
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
                      showCancel: !1
                    });
              },
              fail: function () {
                wx.hideLoading();
                wx.showToast({ title: "网络请求失败", icon: "error", duration: 1500 });
              },
            })
          : wx.showToast({ title: "登录失败", icon: "error", duration: 1500 });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "登录失败", icon: "error", duration: 1500 });
      }
    });
  },
  deciyptiongwc: function (t, a, i) {
    var s = this;
    wx.request({
      url: e.globalData.api + "wx_getvipphone.ashx",
      data: { sessionID: t, encryptedData: a, iv: i },
      header: { "content-type": "application/json" },
      timeout: 10000,
      success: function (t) {
        if (t.data && t.data.phoneNumber) {
          wx.setStorageSync("wxuserid", t.data.phoneNumber);
          s.setData({ wxuserid: t.data.phoneNumber });
          s.gw();
        }
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "解密失败", icon: "error", duration: 1500 });
      },
    });
  },
  gwjs: function () {


    wx.showLoading({
      title: '连接中...',
    })
    this.setData({ stop: true })
    var that = this;
    wx.request({
      url: e.globalData.api + "wx_checkxstock.ashx",
      data: { xf_plu: this.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        var stock = 0;
        if (a.data && Array.isArray(a.data) && a.data.length > 0 && a.data[0]) {
          stock = parseInt(a.data[0].XSTOCK) || 0;
        }
        if (stock > 0) {
          wx.navigateTo({
            url: "/pages/deposityd/index/index?xf_plu=" + that.data.xf_plu,
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "已订完，数量为零",
            showCancel: !1,
            confirmText: "知道了",
          })
        }
        wx.hideLoading()
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: "提示",
          content: "网络请求失败，请稍后重试",
          showCancel: false,
          confirmText: "知道了",
        });
      },
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
      timeout: 10000,
      success: function (a) {
        a.data && "ok" == a.data
          ? (wx.setStorageSync("p", "2"),
            wx.setStorageSync("p", "4"),
            wx.getStorageSync("n") || wx.setStorageSync("n", "0"),
            wx.setStorageSync(
              "n",
              (parseInt(wx.getStorageSync("n")) + 1).toString()
            ),
            t.setData({ n: wx.getStorageSync("n") }))
          : wx.showToast({ title: "数据出错", icon: "error", duration: 1e3 });
      },
      fail: function () {
        wx.showToast({ title: "网络请求失败", icon: "error", duration: 1500 });
      },
    });
  },
  _isValidImage: function (val) {
    return typeof val === "string" && val.length > 0 && val.indexOf("null") < 0;
  },
  _buildPreviewUrls: function () {
    var a = [];
    if (this._isValidImage(this.data.zwimages1))
      a.push(this.data.pict + this.data.xf_plu + "//" + this.data.zwimages1);
    if (this._isValidImage(this.data.zwimages2))
      a.push(this.data.pict + this.data.xf_plu + "//" + this.data.zwimages2);
    if (this._isValidImage(this.data.zwimages3))
      a.push(this.data.pict + this.data.xf_plu + "//" + this.data.zwimages3);
    if (this._isValidImage(this.data.zwimages4))
      a.push(this.data.pict + this.data.xf_plu + "//" + this.data.zwimages4);
    return a;
  },
  previewImageByIndex: function (t) {
    var idx = parseInt(t.currentTarget.dataset.idx) || 0;
    var urls = this._buildPreviewUrls();
    if (urls.length > idx)
      wx.previewImage({ current: urls[idx], urls: urls });
    else if (urls.length > 0)
      wx.previewImage({ current: urls[0], urls: urls });
  },
  onShow: function () {
    this.setData({ stop: false });
    this.setData({
      vipcode: wx.getStorageSync("vipcode"),
      wxuserid: wx.getStorageSync("wxuserid"),
    });
    wx.setStorageSync("xf_plu", this.data.xf_plu);
    wx.setStorageSync("starttime", new Date().valueOf());
    var a = this;
    wx.showLoading({ title: "正在加载" }),
      wx.request({
        url: e.globalData.api + "wx_cgsearchs.ashx",
        data: { name: a.data.xf_plu },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        timeout: 10000,
        success: function (t) {
          if (!t.data || !Array.isArray(t.data) || t.data.length === 0 || !t.data[0]) {
            wx.hideLoading();
            wx.showModal({
              title: "提示",
              content: "商品信息加载失败",
              showCancel: false,
              confirmText: "知道了",
            });
            return;
          }
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
              kzm: (t.data[0].ZWIMAGES1 || "").slice(-3),
              xstock: t.data[0].XSTOCK
            }),
            a.checkplu(),
            t.data[0].TBIMAGES1 &&
              a.setData({
                "swiperlist[0]":
                  a.data.pict + t.data[0].XF_PLU + "//" + t.data[0].TBIMAGES1,
              }),
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
            a.checkprice();
            wx.hideLoading();
        },
        fail: function () {
          wx.hideLoading();
          wx.showModal({
            title: "提示",
            content: "网络请求失败，请稍后重试",
            showCancel: false,
            confirmText: "知道了",
          });
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
      timeout: 10000,
      success: function () {},
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
      timeout: 10000,
      success: function () {},
    });
  },
  onUnload: function () {
    wx.setStorageSync("endtime", new Date().valueOf()),
    wx.getStorageSync("vipcode")
      ? this.sevip()
      : wx.getStorageSync("wxuserid") && this.sewx();
  },
  onShareAppMessage: function (t) {
    var fxuserid =
      wx.getStorageSync("d") ? wx.getStorageSync("yguserid") :
      wx.getStorageSync("vipcode") ? wx.getStorageSync("vipcode") :
      wx.getStorageSync("wxuserid") || "";
    return {
      title: "广天藏品 " + this.data.xf_desci,
      path: "/pages/shopcg/goods/index?xf_plu=" + this.data.xf_plu +
        (fxuserid ? "&fxuserid=" + fxuserid : "") +
        "&vipcode=" + (wx.getStorageSync("vipcode") || "") +
        "&fx=1",
      imageUrl: this.data.pict + this.data.xf_plu + "//" + this.data.tbimages1,
    };
  },
  back: function () {
    (e.globalData.m = "1"),
      "1" == this.data.fx
        ? ((e.globalData.m = "2"),
          wx.switchTab({ url: "/pages/home/index/index" }))
        : wx.navigateBack({ delta: 1 });
  },
});
