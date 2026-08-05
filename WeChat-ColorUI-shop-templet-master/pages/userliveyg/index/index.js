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
    replu: {},
    replus: {},
    index2: null,
    picker2: [],
    itemname: "",
    sku: "",
    stock: "",
    select_all: !1,
    choseNames: "",
    flag: !0,
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
    state:0
 

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
        if (a.data && a.data.length > 0 && a.data[0]) {

          t.setData({
            vipname: a.data[0].XF_SURNAME,
            grade: a.data[0].GRADE,
            store: a.data[0].XF_STORES,
            xf_name: a.data[0].XF_USERNAME,
            xf_users: a.data[0].XF_USERS,
            vipcode: a.data[0].XF_VIPCODE,
            fxtag1: true
          })

          // 匹配末尾中文/字符（match 可能返回 null，需兜底）
          var reg = /\S+$/;
          var matched = (t.data.xf_name || "").match(reg);
          if (matched) {
            t.setData({
              xf_name: matched[0]
            });
          }

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
      fail: function () {
        wx.showToast({ title: "查询失败，请重试", icon: "none" });
      },
    });
  },


  onLoad: function (a) {
    // 朋友圈分享进入：onShareTimeline 只能落地当前页，识别参数后跳转客户版直播页
    if (a.yguserid) {
      wx.redirectTo({
        url: "/pages/userlive/index/index?vipcode=" + (a.vipcode || "") + "&yguserid=" + a.yguserid,
      });
      return;
    }

    // 显式开启「发送给朋友」和「分享到朋友圈」菜单
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    });

    var that = this;
    wx.request({
      url: "https://widesky.work/HKback/wx_state.ashx",
      data: {},
      header: {
        "content-type": "application/json"
      },
      timeout: 10000,
      success: (res) => {
        if (res.data && res.data.length > 0 && res.data[0] && res.data[0].STARTS == "0") {
          wx.switchTab({
            url: '/pages/home/index/index'
          });
        } else {
          that.setData({
            state: 1
          });

          wx.navigateTo({
            url: '/pages/relogin/index',
          });
        }
      },
      fail: () => {
        wx.showToast({ title: "网络异常，请重试", icon: "none" });
      }
    });
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
      timeout: 10000,
      success: function (a) {
        if (!a.data || !a.data.length || !a.data[0]) return;

        that.setData({
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

      },
      fail: function () {
        wx.showToast({ title: "加载失败，请重试", icon: "none" });
      },
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
    // vipcode 有意置空：分享链接不带特定客户卡号，仅标识分享员工
    // 注：小程序分享返回对象不支持 success/fail 回调，请勿添加
    var ygname = wx.getStorageSync('yguserid') != 'GTZB'
      ? wx.getStorageSync("ygname")
      : "";
    return {
      title: "广天藏品 " + ygname + " 向您分享了最新直播",
      path: "/pages/userlive/index/index?vipcode=&yguserid=" + wx.getStorageSync("yguserid"),
      imageUrl: this.data.banner + this.data.fximg,
    };
  },

  // 分享到朋友圈（基础库 2.11.3+）：定义后胶囊菜单自动出现入口
  // 注意：朋友圈分享只能落地当前页，参数用 query 传递（不支持 path），
  // 因此 onLoad 中识别 yguserid 参数后跳转到客户版直播页 userlive
  onShareTimeline: function () {
    var ygname = wx.getStorageSync('yguserid') != 'GTZB'
      ? wx.getStorageSync("ygname")
      : "";
    return {
      title: "广天藏品 " + ygname + " 向您分享了最新直播",
      query: "vipcode=&yguserid=" + wx.getStorageSync("yguserid"),
      imageUrl: this.data.banner + this.data.fximg,
    };
  },

});