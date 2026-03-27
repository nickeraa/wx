var e = getApp()

Page({
  data: {
    liveTitle: "",
    coverUrl: "https://widesky.work/HKback/upload/banner.jpg", // 封面图
    isLiving: true,
    loading: false,
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    iconurlfx:e.globalData.iconurl+'fx.jpg',
    iconurl:e.globalData.iconurl,
    vipcode: "",
    openid: "",
    avatarUrl: '',
    nickName: '',
    resultdt: {},
    current: 0,
    lines: 0,
    banner: e.globalData.zbimgurl,
    swiperList: []

  },

  // 进入直播间
  enterLive() {
    this.setData({
      loading: true
    })
    console.log('dfsdfsdfsdfsdf')

    if (!wx.getStorageSync('wximg') || !wx.getStorageSync('wxuser')) {
      wx.navigateTo({
        url: "/pages/wxloginzb/index"
      });
    } else {

      // 1. 请求你自己的后端接口获取 保利威免登链接
      wx.request({
        url: "https://widesky.work/HKback/live_cn.aspx",
        data: {
          openid: wx.getStorageSync('openid'),
          nickName: wx.getStorageSync('wxuser'),
          avatarUrl: wx.getStorageSync('wximg')
        },
        header: {
          "content-type": "application/json"
        },
        success: (res) => {
          let liveUrl = res.data
          console.log(liveUrl)
          // 2. 跳转到web-view打开直播间
          wx.navigateTo({
            url: `/pages/webview/index?url=${encodeURIComponent(liveUrl)}`
          })

        },
        complete: () => {
          this.setData({
            loading: false
          })
        }
      })

    }



  },


  onLoad: function (a) {
    console.log(a.user)
    if (a.user=='1') {

      this.loginzb();

    } else {

      var i = this;
      wx.login({
        success: function (t) {
          t.code ?
            (console.log("获检查用户登录状态 存储session_key", t),
              wx.request({
                url: e.globalData.api + "wx_getphone.ashx",
                data: {
                  code: t.code
                },
                header: {
                  "content-type": "application/json"
                },
                success: function (e) {
                  console.log("获取授权openid，session_key", e),
                    console.log(e.data);
                  var t = e.data.split(",");
                  i.setData({
                    arr: [t]
                  });
                  var a = t[0],
                    o = t[1];
                  wx.setStorageSync("openid", a),
                    wx.setStorageSync("sessionID", o),
                    console.log(o),
                    console.log(a);
                },
              })) :
            console.log("登录失败！" + t.errMsg);
        },
        fail: function (e) {
          console.log("获取登录凭证code失败！", e);
        },

      });

    }

  },

  loginzb() {

    wx.request({
      url: "https://widesky.work/HKback/live_cn.aspx",
      data: {
        openid: wx.getStorageSync('openid'),
        nickName: wx.getStorageSync('wxuser'),
        avatarUrl: wx.getStorageSync('wximg')
      },
      header: {
        "content-type": "application/json"
      },
      success: (res) => {
        let liveUrl = res.data
        console.log(liveUrl)
        // 2. 跳转到web-view打开直播间
        wx.navigateTo({
          url: `/pages/webview/index?url=${encodeURIComponent(liveUrl)}`
        })

      },
      complete: () => {

      }
    })

  },



  onShow: function (t) {

    var that = this
    wx.request({
      url: e.globalData.api + "wx_zbindex.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a), that.setData({
          resultdt: a.data,
          liveTitle: a.data[0].TITLE
        });

        // ============= 你的 3 个原始字段 =============
        let img1 = a.data[0].IMAGE1;
        let img2 = a.data[0].IMAGE2;
        let img3 = a.data[0].IMAGE3;

        // ============= 1. 收集非空的图片路径 =============
        let imgArr = [];

        if (img1 && img1.trim() !== '') {
          imgArr.push(img1);
        }
        if (img2 && img2.trim() !== '') {
          imgArr.push(img2);
        }
        if (img3 && img3.trim() !== '') {
          imgArr.push(img3);
        }

        // ============= 2. 转成 轮播图需要的【对象数组】 =============
        let swiperData = imgArr.map(item => {
          return {
            img: item
          };
        });

        // ============= 3. 赋值给轮播 =============
        that.setData({
          swiperList: swiperData
        });

        console.log("最终轮播数据：", swiperData);

      },
      complete: function () {},
    })



  },

  onShareAppMessage: function (e) {
    return {
      title: "广天藏品始创于1997年",
      path: "/pages/userlive/index/index",
      imageUrl: this.data.iconurlfx,
      success: function (e) {
        console.log("转发成功:" + JSON.stringify(e));
      },
      fail: function (e) {
        console.log("转发失败:" + JSON.stringify(e));
      },
    };
  },
});