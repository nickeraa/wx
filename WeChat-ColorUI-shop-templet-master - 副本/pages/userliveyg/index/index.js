var e = getApp()

Page({
  data: {
    liveTitle: "",
    fximg: "", // 分享图
    isLiving: true,
    loading: false,
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    iconurlfx: e.globalData.iconurl + 'fx.jpg',
    iconurl: e.globalData.iconurl,
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
    sku: "",
    stock: "",
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
    yguserid: '',
    xf_name: '',
    fxtag1: false,
    fxtag2: false,
 

  },
  getvipcode: function (a) {
    this.setData({
      vipcode: a.detail.value
    });
  },

  listvipcode: function () {
    if (this.data.vipcode == "") {
      wx.showModal({
        title: "提示",
        content: "没有填写分享的会员卡号",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })

      return false;
    }
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_checkvip.ashx",
      data: {
        vipcode: t.data.vipcode
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a)
        if (a.data.length > 0) {

          t.setData({
            vipname: a.data[0].XF_SURNAME,
            grade: a.data[0].GRADE,
            store: a.data[0].XF_STORES,
            xf_name: a.data[0].XF_USERNAME,
            xf_users: a.data[0].XF_USERS,
            vipcode: a.data[0].XF_VIPCODE,
            fxtag1: true
          })


          // 匹配末尾中文/字符
          let reg = /\S+$/;
          let name = t.data.xf_name.match(reg)[0];
          console.log(name); // 
          t.setData({
            xf_name: name

          })

        } else {

          t.setData({
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
            })

        }


      },
    });
  },


  onLoad: function (a) {
    // console.log(a.yguserid)
    // if (a.yguserid) {
    //   wx.setStorageSync("yguserid", a.yguserid)
    // }
    wx.navigateTo({
      url: '/pages/relogin/index',
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
          liveTitle: a.data[0].TITLE,
          fximg: a.data[0].FXIMG
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

  checkzf: function () {

    if (this.data.vipcode == "") {

      wx.showModal({
        title: "提示",
        content: "没有填写分享的会员卡号",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })


    } else if (this.data.xf_users != wx.getStorageSync("yguserid")) {
      var that = this
      wx.showModal({
        title: "提示",
        content: "此客户跟进员工和登录员工不一致，不能分享",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })

    } else {

      var that = this
      wx.showModal({
        title: "提示",
        content: "ok！核验无问题",
        showCancel: !1,
        success: function (a) {
          that.setData({
            fxtag2: true,

          })
        },
      })

    }


  },



  onShareAppMessage: function (e) {



    return {
      title: "广天藏品 " + this.data.xf_name + " 向您最新分享了直播",
      path: "/pages/userlive/index/index?vipcode=" +
        this.data.vipcode + "&yguserid=" + wx.getStorageSync("yguserid"),
      imageUrl: this.data.banner + this.data.fximg,
      success: function (e) {
        console.log("转发成功:" + JSON.stringify(e));
      },
      fail: function (e) {
        console.log("转发失败:" + JSON.stringify(e));
      },
    };




  },
});