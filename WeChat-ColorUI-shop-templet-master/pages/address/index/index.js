var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    flag: !1,
    xf_plu: "",
    replu: {},
    setype: "",
  },
  back: function () {
    wx.navigateBack({ delta: 0 });
  },
  add: function () {
    wx.navigateTo({ url: "/pages/addsh/index/index" });
  },
  onLoad: function (a) {},
  radioChange: function (a) {
    console.log("radior发送选择改变，携带值为", a.detail.value),
      this.setData({ setype: a.detail.value }),
      "0" == this.data.setype
        ? this.address()
        : "1" == this.data.setype && this.store();
  },
  onShow: function () {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_alladdress.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          a.data.length > 0
            ? e.setData({ replu: a.data })
            : e.setData({ replu: null });
      },
    });
  },
  edit: function (a) {
    console.log(a.currentTarget.dataset.id),
      wx.navigateTo({
        url: "/pages/editadd/index/index?id=" + a.currentTarget.dataset.id,
      });
  },
  onGetPhoneNumber: function (e) {
    if (!wx.getStorageSync("vipcode"))
      return wx.showToast({ title: "您没有会员卡，请联系收藏顾问哦 ~" }), !1;
    var t = this;
    wx.login({
      success: function (o) {
        o.code
          ? (console.log("步骤2获检查用户登录状态，获取用户电话号码！", o),
            wx.showLoading({ title: "正在登录" }),
            wx.request({
              url: a.globalData.api + "wx_getphone.ashx",
              data: { code: o.code },
              header: { "content-type": "application/json" },
              success: function (a) {
                console.log("步骤三获取授权码，获取授权openid，session_key", a),
                  console.log(a.data);
                var o = a.data.split(",");
                t.setData({ arr: [o] });
                var n = e.detail.errMsg,
                  i = o[1];
                console.log(i);
                var s = e.detail.encryptedData,
                  l = e.detail.iv;
                "getPhoneNumber:ok" == n &&
                  wx.checkSession({
                    success: function () {
                      t.deciyption(i, s, l), wx.hideLoading();
                    },
                    fail: function () {},
                  });
              },
              fail: function (a) {
                console.log("fail", a);
              },
            }))
          : console.log("登录失败！" + o.errMsg);
      },
    });
  },
  deciyption: function (e, t, o) {
    var n = this;
    console.log("步骤4根据秘钥解密手机号码sessionID：", e),
      wx.request({
        url: a.globalData.api + "wx_getvipphone.ashx",
        data: { sessionID: e, encryptedData: t, iv: o },
        header: { "content-type": "application/json" },
        success: function (e) {
          console.log(e.data),
            n.setData({ phone: e.data.phoneNumber }),
            e.data.phoneNumber
              ? (wx.setStorageSync("wxuserid", e.data.phoneNumber),
                wx.request({
                  url: a.globalData.api + "wx_checkvip.ashx",
                  data: { vipcode: wx.getStorageSync("vipcode") },
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  dataType: "json",
                  success: function (a) {
                    console.log(a),
                      a.data.length > 0
                        ? n.setData({
                            vip: a.data[0].GRADE,
                            flag: !0,
                            flags: !1,
                            tximg: "/img/vip.png",
                          })
                        : (n.setData({
                            vip: "您还没有登录哦 ~",
                            flag: !1,
                            flags: !0,
                            tximg: "/img/yk.jpg",
                          }),
                          wx.showToast({ title: "没有会员卡信息" }));
                  },
                }))
              : (n.setData({
                  vip: "您还没有登录哦 ~",
                  flag: !1,
                  flags: !0,
                  tximg: "/img/yk.jpg",
                }),
                wx.showToast({ title: "没有会员卡信息" })),
            n.inphone();
        },
      });
  },
  inphone: function () {
    wx.showLoading({ title: "正在加载" }),
      wx.request({
        url: a.globalData.api + "wx_sqlphone.ashx",
        data: { vipcode: wx.getStorageSync("vipcode"), phone: this.data.phone },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          wx.hideLoading(),
            console.log(a.data),
            "ok" != a.data && wx.showToast({ title: "数据异常" });
        },
      });
  },
  onShareAppMessage: function (a) {
    return {
      title: "广天藏品始创于1997年",
      path: "/pages/homerm/index/index",
      imageUrl: "/img/fx.jpg",
      success: function (a) {
        console.log("转发成功:" + JSON.stringify(a));
      },
      fail: function (a) {
        console.log("转发失败:" + JSON.stringify(a));
      },
    };
  },
});
