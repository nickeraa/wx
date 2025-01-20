var e = getApp();
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    flag: !0,
    flags: !0,
    flagss: !1,
    current: 0,
    lines: 0,
    banner: e.globalData.imgUrl,
    scimgurl: e.globalData.scimgurl,
    replus: {},
    replu: {},
    xfname: "",
    skuname: "",
    listIndex: 0,
    screenWidth: 0,
    screenHeight: 0,
    index: 20,
    remark: {},
    openid: "",
    wxname: "",
    pnumber: "",
    avaurl: "",
    p: "",
    vipcode: "",
    fxuserid: "",
    itemnames: "",
    yguserid: "",
    fx: "",
    arr: "",
    slt: "",
    count: 0,
    i: "",
    yk: !1,
    fnumber: ''
  },
  onUnload: function () {
    e.globalData.m = "";
  },
  onShow: function () {
    console.log(e.globalData.m),
      console.log(wx.getStorageSync("vipcode")),
      console.log(wx.getStorageSync("yguserid")),
      "2" == wx.getStorageSync("p") &&
      wx.setTabBarBadge({
        index: 1,
        text: wx.getStorageSync("n")
      }),
      "4" == wx.getStorageSync("p") &&
      wx.setTabBarBadge({
        index: 2,
        text: wx.getStorageSync("n")
      }),
      "3" == wx.getStorageSync("p") && wx.removeTabBarBadge({
        index: 1
      }),
      "1" == e.globalData.m ?
      (console.log("111111"), this.active()) :
      this.data.yk ?
      (console.log("222222"), this.ykdata()) :
      (console.log("33333"), this.onIndex());
  },
  active: function () {
    (wx.getStorageSync("vipcode") || wx.getStorageSync("wxuserid")) &&
    this.inuser();
  },
  onIndex: function () {
    console.log("ghghghghghghghgghgh");
    var a = this;
    console.log(a.data.fnumber);
    wx.request({
      url: e.globalData.api + "wx_fxpage.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        i: "",
        fnumber: a.data.fnumber
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        if ((console.log(e.data), 0 == e.data.length))
          a.setData({
            flag: !1,
            replu: null,
            flagss: !0
          });
        else {
          var t = Date.parse(new Date());
          (t /= 1e3),
          console.log(t),
            a.setData({
              flag: !0,
              replu: e.data,
              xfname: e.data[0].XF_NAME,
              count: e.data.length,
              slt: a.data.scimgurl +
                e.data[0].XF_PLU +
                "/" +
                e.data[0].IMAGESSL +
                "?temp=" +
                t,
            });
        }
        (wx.getStorageSync("vipcode") || wx.getStorageSync("wxuserid")) &&
        a.inuser();
      },
    });
  },
  onPullDownRefresh: function () {
    console.log("下拉刷新"),
      wx.showNavigationBarLoading(),
      this.shuaxin(),
      wx.hideNavigationBarLoading(),
      wx.stopPullDownRefresh();
  },
  sename: function (e) {
    this.setData({
      skuname: e.detail.value
    });
  },
  search: function (a) {
    if ("" == this.data.skuname)
      return (
        wx.showToast({
          title: "请输入关键词",
          icon: "error",
          duration: 1e3
        }),
        !1
      );
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_cgname.ashx",
      data: {
        name: t.data.skuname
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e.data),
          e.data.length > 0 ?
          t.setData({
            replus: e.data
          }) :
          (t.setData({
              replus: null
            }),
            wx.showToast({
              title: "没有记录哦",
              icon: "error",
              duration: 2e3,
            }));
      },
      complete: function () {},
    });
  },
  showall: function () {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_fxall.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e.data),
          0 == e.data.length ?
          (a.setData({
              flags: !0
            }),
            wx.showToast({
              title: "没有记录哦",
              icon: "error",
              duration: 2e3,
            })) :
          a.setData({
            replus: e.data,
            flags: !1
          });
      },
    });
  },
  shuaxin: function () {
    wx.getStorageSync("d") ?
      this.setData({
        i: ""
      }) :
      this.setData({
        i: "vip"
      });
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_fxpage.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        i: a.data.i,
        fnumber: a.data.fnumber
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e.data),
          0 == e.data.length ?
          (a.setData({
              flag: !1
            }),
            wx.showToast({
              title: "没有推荐货品哦",
              icon: "error",
              duration: 2e3,
            })) :
          a.setData({
            replu: e.data,
            flag: !0
          }),
          (wx.getStorageSync("vipcode") || wx.getStorageSync("wxuserid")) &&
          a.inuser();
      },
    });
  },
  inuser: function () {
    console.log(wx.getStorageSync("vipcode")),
      console.log(wx.getStorageSync("wxuserid")),
      console.log(wx.getStorageSync("fxuserid"));
    wx.request({
      url: e.globalData.api + "wx_inuser.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        fxuserid: wx.getStorageSync("fxuserid"),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e),
          "error" == e.data &&
          wx.showToast({
            title: "数据错误",
            icon: "none",
            duration: 2e3
          });
      },
    });
  },
  onShareAppMessage: function (e) {
    return {
      title: "广天藏品在线商城",
      path: "/pages/home/index/index",
      imageUrl: "/img/fx.jpg",
    };
  },
  onLoad: function (e) {

    if (e.fnumber) {

      this.setData({

        fnumber: e.fnumber

      })
    }

    console.log(wx.getStorageSync("yguserid")),
      console.log(wx.getStorageSync("vipcode")),
      console.log(wx.getStorageSync("fxuserid")),
      console.log(e.vipcode), console.log(this.data.fnumber),
  
    e.vipcode && wx.setStorageSync("vipcode", e.vipcode),
      e.tj && wx.setStorageSync("tj", e.tj),
      e.yguserid && wx.setStorageSync("yguserid", e.yguserid),
      e.wxuserid && wx.setStorageSync("wxuserid", e.wxuserid),
      e.fxuserid && wx.setStorageSync("fxuserid", e.fxuserid),
      wx.getStorageSync("yguserid") &&
      wx.setStorageSync("fxuserid", wx.getStorageSync("yguserid")),
      wx.getStorageSync("tj") ?
      this.setData({
        yk: !1
      }) :
      this.setData({
        yk: !0
      });
  },
  ykdata: function () {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_tjsorts.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e.data),
          a.setData({
            replu: e.data,
            flag: !0,
            flags: !0,
            flagss: !0
          });
      },
    });
  },
});