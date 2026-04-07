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
    swiperList: [],
    resultdt: {},
    replu: {},
    replus: {},
    index2: null,
    picker2: [],
    itemname: "",
    current: 0,
    lines: 0,
    banner: a.globalData.imgUrls,
    sku: "",
    stock: "",
    hkimgurl: a.globalData.hkimgUrl,
    scimgurl: a.globalData.scimgurl,
    select_all: !1,
    choseNames: "",
    flag: !0,
    vipcode: "",
    vipname: "",
    grade: "",
    store: "",
    ygname: "",
    count: 0,
    slt: "",
    xf_users: "",
    yguserid:'',
    xf_name:''

  },
  getvipcode: function (a) {
    this.setData({
      vipcode: a.detail.value
    });
  },

  listvipcode: function () {

    var t = this;
    wx.request({
      url: a.globalData.api + "wx_checkvip.ashx",
      data: {
        vipcode: t.data.vipcode
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0 ?
          t.setData({
            vipname: a.data[0].XF_SURNAME,
            grade: a.data[0].GRADE,
            store: a.data[0].XF_STORES,
            xf_name: a.data[0].XF_USERNAME,
            xf_users: a.data[0].XF_USERS,
            vipcode: a.data[0].XF_VIPCODE,
          }) :
          (t.setData({
              rejob: null,
              vipcode: '',
              xf_users: '',
            }),
            wx.showModal({
              title: "提示",
              content: "卡号不存在或输入错误",
              showCancel: !1,
              success: function (a) {
                a.confirm;
              },
            }))

      },
    });
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
    console.log(a.yguserid)
    if (a.yguserid) {
      wx.setStorageSync("yguserid", a.yguserid)
    }
    

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
      title: "广天藏品 " +this.data.xfname +" 向您最新分享了直播",
      path: "/pages/userlive/index/index?vipcode=" +
      this.data.vipcode + "&yguserid=" + wx.getStorageSync("yguserid"),
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