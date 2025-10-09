var e = getApp();
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    bgimages: e.globalData.imgUrl,
    phone: "",
    username: "",
    openid: "",
    userid: "",
    warning: "",
    index2: null,
    picker2: [],
    store: "",
    result: {},
    acount: "",
    sfimg: e.globalData.api + "bgimg/sf.png",
    zyimg: e.globalData.api + "bgimg/zy.png",
    ljimg: e.globalData.api + "bgimg/lj.png",
    rgimg: e.globalData.api + "bgimg/rg.png",
    dyimg: e.globalData.api + "bgimg/dy.png",
    gqimg: e.globalData.api + "bgimg/gq.png",
    tzimg: e.globalData.api + "bgimg/tz.jpg",
  },
  onLoad: function (e) {},
  xsth: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/pets/index/index"
      });
  },
  scxs: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/scarxs/index/index"
      });
  },
  gz: function () {
    console.log(wx.getStorageSync("userid"));
    wx.request({
      url: e.globalData.api + "wx_segzuser.ashx",
      data: {
        userid: wx.getStorageSync("userid")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        return (
          console.log(e),
          !e.data[0].GOPENID && e.data[0].OPENID ?
          (wx.showModal({
              title: "提示",
              content: "您需要关注公众号才可以收到微信提示的通知信息，请不要关闭窗口",
              showCancel: !1,
              success: function (e) {
                e.confirm &&
                  wx.navigateTo({
                    url: "/pages/wxgz/index/index"
                  });
              },
            }),
            !1) :
          e.data[0].GOPENID || e.data[0].OPENID ?
          void 0 :
          (wx.showModal({
              title: "提示",
              content: "请您验证用户，必须是公司员工才能操作",
              showCancel: !1,
              success: function (e) {
                e.confirm &&
                  wx.navigateTo({
                    url: "/pages/coupon/index/index"
                  });
              },
            }),
            !1)
        );
      },
      complete: function () {},
    });
  },
  khdj: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/hkhome/index/index"
      });
  },
  tp: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/tpsq/index/index"
      });
  },
  zc: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      ((e.globalData.tt = ""),
        wx.navigateTo({
          url: "/pages/acxpe/index/index"
        }));
  },
  center: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/scar/index/index"
      });
  },
  cxpe: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/cxpe/index/index"
      });
  },
  qxtp: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/qxtp/index/index"
      });
  },
  td: function () {
    wx.getStorageSync("job") ?
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是在职状态才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/petd/index/index"
          });
        },
      }) :
      wx.navigateTo({
        url: "/pages/petd/index/index"
      });
  },
  onShow: function (n) {
    if (
      (console.log(wx.getStorageSync("userid")), wx.getStorageSync("userid"))
    ) {
   
      var o = this;
      wx.request({
        url: e.globalData.api + "wx_checkuser.ashx",
        data: {
          userid: wx.getStorageSync("userid"),
          password: "",
          i: "1"
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0 ?
            (o.setData({
                openid: wx.getStorageSync("openid"),
                username: wx.getStorageSync("username"),
                //   phone: wx.getStorageSync("phone"),
              }),
              console.log(wx.getStorageSync("openid")),
              o.gz()) :
            wx.showModal({
              title: "提示",
              content: "请您验证用户，必须是在职状态才能操作",
              showCancel: !1,
              success: function (e) {
                e.confirm &&
                  (wx.setStorageSync("job", "out"),
                    wx.navigateTo({
                      url: "/pages/coupon/index/index"
                    }));
              },
            });
        },
      });
    } else
      wx.showModal({
        title: "提示",
        content: "请您验证用户，必须是公司员工才能操作",
        showCancel: !1,
        success: function (e) {
          e.confirm && wx.navigateTo({
            url: "/pages/coupon/index/index"
          });
        },
      });
  },
});