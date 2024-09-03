var e = getApp();
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    bgimages: e.globalData.hkimgUrl,
    bgimage: e.globalData.imgUrl,
    flag: !0,
    phone: "",
    username: "",
    openid: "",
    userid: "",
    warning: "",
  },
  onLoad: function (e) {},
  onShow: function () {
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
      userid: wx.getStorageSync("userid"),
      openid: wx.getStorageSync("openid"),
      username: wx.getStorageSync("username"),
      phone: wx.getStorageSync("phone"),
    });
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_checkuser.ashx",
      data: { userid: wx.getStorageSync("userid"), password: "", i: "1" },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          0 == a.data.length
            ? wx.showModal({
                title: "提示",
                content: "请您验证用户，必须是公司员工才能操作",
                showCancel: !1,
                success: function (e) {
                  e.confirm &&
                    wx.navigateTo({ url: "/pages/coupon/index/index" });
                },
              })
            : a.seprov();
      },
    });
  },
  seprov: function (a) {
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_qxtp.ashx",
      data: { uid: wx.getStorageSync("userid") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          e.data.length > 0
            ? t.setData({ resultdt: e.data, flag: !0 })
            : t.setData({ flag: !1 });
      },
    });
  },
  onplu: function (e) {
    var a = e.currentTarget.dataset.pnumber;
    wx.redirectTo({ url: "/pages/joinusstp/index?id=" + a });
  },
});
