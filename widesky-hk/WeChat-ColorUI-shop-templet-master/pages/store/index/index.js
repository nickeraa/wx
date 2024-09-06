var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    bgimages: a.globalData.imgUrl,
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
    sfimg: a.globalData.api + "bgimg/sf.png",
    zyimg: a.globalData.api + "bgimg/zy.png",
    ljimg: a.globalData.api + "bgimg/lj.png",
    rgimg: a.globalData.api + "bgimg/rg.png",
    dyimg: a.globalData.api + "bgimg/dy.png",
    tzimg: a.globalData.api + "bgimg/tz.jpg",
    gqimg: a.globalData.api + "bgimg/gq.png",
  },
  onLoad: function (a) {},
  cxhp: function () {
    wx.navigateTo({
      url: "/pages/cxjzb/index/index"
    });
  },
  khdj: function () {
    wx.navigateTo({
      url: "/pages/ckjzb/index/index"
    });
  },
  fhs: function () {
    wx.navigateTo({
      url: "/pages/fhjzbs/index/index"
    });
  },
  fhqs: function () {
    wx.navigateTo({
      url: "/pages/fhqs/index/index"
    });
  },
  khcx: function () {
    wx.navigateTo({
      url: "/pages/dpjzb/index/index"
    });
  },
  fh: function () {
    wx.navigateTo({
      url: "/pages/fhjzb/index/index"
    });
  },
  fstate: function () {
    wx.navigateTo({
      url: "/pages/stockstates/index/index"
    });
  },
  fstates: function () {
    wx.navigateTo({
      url: "/pages/fckstate/index/index"
    });
  },
  state: function () {
    wx.navigateTo({
      url: "/pages/ckstate/index/index"
    });
  },
  wstate: function () {
    wx.navigateTo({
      url: "/pages/wckstate/index/index"
    });
  },
  goback: function () {
    wx.switchTab({
      url: "/pages/home/index/index"
    });
  },


  dq: function () {


    wx.navigateTo({
      url: "/pages/dqcode/index/index"
    });


  },

  dy: function () {

 

    
    if (wx.getStorageSync('zjuserid')) {

      wx.navigateTo({
        url: "/pages/bleConnect/bleConnect"
      });

      return false;
    }

    var that = this;
    wx.showLoading({
        title: '数据加载中',
        mask: true,
      }),


      wx.request({
        url: a.globalData.api + 'wx_customer_zjlogin.ashx', //服务器地址

        data: {
          //请求参数
          userid: wx.getStorageSync('ckuserid')
        },
        header: { // 设置请求的 header
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',

        success: function (res) {

          console.log(res)


          if (res.data.length > 0) {

            wx.setStorageSync('zjuserid', res.data[0].USERID)
            wx.setStorageSync('zjusername', res.data[0].XF_NAME)

            wx.navigateTo({
              url: "/pages/bleConnect/bleConnect"
            });

          } else {

            wx.showModal({
              title: "提示",
              content: "没有权限",
              showCancel: !1,
              success: function (t) {
                t.confirm;
              },
            })


          }

          wx.hideLoading()


        }
      })



  },




  onShow: function (a) {},
});