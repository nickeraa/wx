var e = getApp();
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    index2: null,
    picker2: [],
    store: "",
    storename: "",
  },
  bindPickerChange2: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value),
      this.setData({
        index2: e.detail.value,
        store: this.data.picker2[e.detail.value].XF_STORECODE,
        storename: this.data.picker2[e.detail.value].XF_NAME,
      });
  },
  onLoad: function (e) {
    if (!wx.getStorageSync("userid"))
      return (
        wx.showModal({
          title: "提示",
          content: "请您验证用户，必须是公司员工才能操作",
          showCancel: !1,
          success: function (e) {
            e.confirm && wx.navigateTo({ url: "/pages/coupon/index/index" });
          },
        }),
        !1
      );
    this.setData({
      openid: wx.getStorageSync("openid"),
      username: wx.getStorageSync("username"),
      phone: wx.getStorageSync("phone"),
    });
  },
  goback: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  onShow: function () {
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_sestore.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e), t.setData({ picker2: e.data });
      },
    });
  },
  logins: function (e) {
    null == this.data.index2
      ? wx.showToast({ title: "请选择店铺", icon: "none", duration: 1e3 })
      : (wx.setStorageSync("store", this.data.store),
        wx.setStorageSync("storename", this.data.storename),
        wx.switchTab({ url: "/pages/jzb/index/index" }));
  },
});
