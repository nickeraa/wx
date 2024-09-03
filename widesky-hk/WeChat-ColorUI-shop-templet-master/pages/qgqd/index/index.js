var o = getApp();
Page({
  data: {
    StatusBar: o.globalData.StatusBar,
    CustomBar: o.globalData.CustomBar,
    bgimages: o.globalData.hkimgUrl,
    bgimage: o.globalData.imgUrl,
    flag: !0,
    phone: "",
    username: "",
    openid: "",
    userid: "",
    warning: "",
  },
  onLoad: function (o) {},
  onShow: function () {
    if (!wx.getStorageSync("userid"))
      return (
        wx.showModal({
          title: "提示",
          content: "请您验证用户，必须是公司员工才能操作",
          showCancel: !1,
          success: function (o) {
            o.confirm && wx.navigateTo({ url: "/pages/coupon/index/index" });
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
    var t = this;
    wx.request({
      url: o.globalData.api + "wx_checkuser.ashx",
      data: { userid: wx.getStorageSync("userid"), password: "", i: "1" },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (o) {
        console.log(o),
          0 == t.data.length
            ? wx.showModal({
                title: "提示",
                content: "请您验证用户，必须是公司员工才能操作",
                showCancel: !1,
                success: function (o) {
                  o.confirm &&
                    wx.navigateTo({ url: "/pages/coupon/index/index" });
                },
              })
            : t.qd();
      },
    });
  },
  qd: function () {
    console.log("aaaaaaaaaa");
    wx.offLocationChange(), console.log("bbbbbbbbbbb"), this.upchange();
  },
  upchange: function () {
    console.log("ttttttttttttt");
    var o = this;
    wx.startLocationUpdateBackground({
      type: "gcj02",
      success: function (t) {
        console.log("ppppppppppppp"),
          wx.onLocationChange(function (t) {
            console.log("mmmmmmmmmmmm");
            var e = new Date().getTime(),
              a =
                (wx.getStorageSync("oldLocation"),
                wx.getStorageSync("oldTime")),
              n =
                Number(t.latitude).toString() +
                "," +
                Number(t.longitude).toString();
            console.log(Number(t.latitude).toString()),
              console.log(Number(t.longitude).toString()),
              e - a > 6e4 &&
                (wx.setStorageSync("oldLocation", n),
                wx.setStorageSync("oldTime", e),
                o.uploadLocation());
          });
      },
      fail: function (o) {
        console.log(o),
          wx.showModal({
            title: "提示",
            content: "定位失败，请重新签到",
            showCancel: !1,
            success: function (o) {
              o.confirm && wx.switchTab({ url: "/pages/jzb/index/index" });
            },
          });
      },
    });
  },
  uploadLocation: function () {
    wx.request({
      url: o.globalData.api + "wx_qg_sc.ashx",
      data: {
        userid: wx.getStorageSync("userid"),
        location: wx.getStorageSync("oldLocation"),
        sctime: wx.getStorageSync("oldTime"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (o) {
        console.log(o),
          "ok" == o.data
            ? wx.getStorageSync("qd") || wx.setStorageSync("qd", "data")
            : wx.showModal({
                title: "提示",
                content: "签到失败，请重试",
                showCancel: !1,
                success: function (o) {
                  o.confirm;
                },
              });
      },
    });
  },
});
