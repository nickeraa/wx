var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    vipcode: "",
    vipname: "",
    grade: "",
    xf_name: "",
  },
  onLoad: function () {},
  getvipcode: function (a) {
    this.setData({ vipcode: a.detail.value });
  },
  cx: function () {
    if ("" == this.data.vipcode)
      return (
        wx.showModal({
          title: "提示",
          content: "请输入会员卡号",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    var t = this;
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
                xf_name: a.data[0].XF_USERNAME,
                vipcode: a.data[0].XF_VIPCODE,
              })
            : wx.showModal({
                title: "提示",
                content: "卡号不存在或输入错误",
                showCancel: !1,
                success: function (a) {
                  a.confirm;
                },
              });
      },
    });
  },
  back: function () {
    wx.switchTab({ url: "/pages/user/index/index" });
  },
  jh: function () {
    "" != this.data.vipname
      ? (wx.setStorageSync("vipcode", this.data.vipcode),
        console.log(wx.getStorageSync("vipcode")),
        wx.showModal({
          title: "提示",
          content: "激活成功，已登录",
          showCancel: !1,
          success: function (a) {
            a.confirm && wx.switchTab({ url: "/pages/user/index/index" });
          },
        }))
      : wx.showToast({ title: "会员卡号不存在" });
  },
  onShow: function () {
    "2" == wx.getStorageSync("p")
      ? wx.setTabBarBadge({ index: 1, text: wx.getStorageSync("n") })
      : "3" == wx.getStorageSync("p") && wx.removeTabBarBadge({ index: 1 });
  },
});
