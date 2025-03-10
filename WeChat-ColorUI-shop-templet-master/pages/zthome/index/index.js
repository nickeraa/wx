var e = getApp();
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    current: 0,
    lines: 0,
    banner: e.globalData.imgUrl,
    scimgurl: e.globalData.scimgurl,
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
  this.onIndex();
  },

  onIndex: function () {

    var a = this;
    wx.request({
      url: e.globalData.api + "wx_tjsorts.ashx",
      data: {

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



  shuaxin: function () {

    var a = this;
    wx.request({
      url: e.globalData.api + "wx_tjsorts.ashx",
      data: {
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
          })
          
        
      },
    });
  },

  onShareAppMessage: function (e) {
    return {
      title: "广天藏品在线商城",
      path: "/pages/zthome/index/index",
      imageUrl: "/img/fx.jpg",
    };
  },
  onLoad: function (e) {

  },

});