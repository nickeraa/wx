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
        index: 2,
        text: wx.getStorageSync("n")
      }),
      "4" == wx.getStorageSync("p") &&
      wx.setTabBarBadge({
        index: 3,
        text: wx.getStorageSync("n")
      }),
      "3" == wx.getStorageSync("p") && wx.removeTabBarBadge({
        index: 2
      })

      this.ykdata();
   
  },


  onShareAppMessage: function (e) {
    return {
      title: "广天藏品在线商城",
      path: "/pages/home/index/index",
      imageUrl: "/img/fx.jpg",
    };
  },
  onLoad: function (e) {

    console.log(wx.getStorageSync("yguserid")),
      console.log(wx.getStorageSync("vipcode")),
      console.log(wx.getStorageSync("fxuserid"))

   
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
    
          });
      },
    });
  },
});