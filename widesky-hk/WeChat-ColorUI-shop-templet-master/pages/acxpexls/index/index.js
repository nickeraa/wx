var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    resultdt: {},
    replu: {},
    hkimgurl: a.globalData.hkimgUrl,
    vipcode: "",
    vipname: "",
    grade: "",
    store: "",
    xf_name: "",
  },
  onLoad: function (a) {},
  getvipcode: function (a) {
    this.setData({ vipcode: a.detail.value });
  },
  listvipcode: function () {
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_checkvip.ashx",
        data: { vipcode: t.data.vipcode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? t.setData({
                  vipname: a.data[0].XF_SURNAME,
                  grade: a.data[0].GRADE,
                  store: a.data[0].XF_STORES,
                  xf_name: a.data[0].XF_USERNAME,
                })
              : (t.setData({ rejob: null }),
                wx.showModal({
                  title: "提示",
                  content: "卡号不存在或输入错误",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                })),
            wx.hideLoading();
        },
      });
  },
  back: function () {
    wx.switchTab({ url: "/pages/jzb/index/index" });
  },
  listvip: function () {
    wx.navigateTo({ url: "/pages/vipss/index/index" });
  },
  onShow: function () {},
  fx: function () {
    if ("" == this.data.vipname || "" == this.data.vipcode)
      return wx.showToast({ title: "请输入会员卡号" }), !1;
    wx.navigateToMiniProgram({
      appId: "wx187fe5b10e271c63",
      path: "/pages/card/index/index",
      extraData: {
        yguserid: wx.getStorageSync("userid"),
        vipcode: this.data.vipcode,
        d: "",
      },
      envVersion: "release",
      success: function (a) {
        console.info(a);
      },
    });
  },
});
