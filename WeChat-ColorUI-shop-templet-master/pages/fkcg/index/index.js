var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    iconurlok: a.globalData.iconurl + 'ok.jpg',
    replu: {},
    sorts: "",
    tag: "",
    xf_docno: "",
    flag: false
  },
  back: function () {
    wx.switchTab({
      url: "/pages/home/index/index"
    });
  },
  onLoad: function (a) {
    a.sorts && this.setData({
        sorts: a.sorts
      }),
      a.xf_docno && this.setData({
        xf_docno: a.xf_docno
      }),
      a.tag && this.setData({
        tag: a.tag
      });
  },
  delgwc: function () {
    if ((this.tzyg(), "1" == this.data.tag)) {
      var t = this;
      wx.request({
        url: a.globalData.api + "wx_delgwc.ashx",
        data: {
          xf_vipcode: wx.getStorageSync("vipcode"),
          wxuserid: wx.getStorageSync("wxuserid"),
          xf_docno: t.data.xf_docno,
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        timeout: 10000,
        success: function (a) {},
        fail: function () {},
        complete: function () {},
      });
    } else if ("3" == this.data.tag) {
      t = this;
      wx.request({
        url: a.globalData.api + "wx_delgwcyd.ashx",
        data: {
          xf_vipcode: wx.getStorageSync("vipcode"),
          wxuserid: wx.getStorageSync("wxuserid"),
          xf_docno: t.data.xf_docno,
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        timeout: 10000,
        success: function (a) {},
        fail: function () {},
        complete: function () {},
      });
    }
  },
  tzyg: function () {
    wx.request({
      url: a.globalData.api + "wx_zxygscj.ashx",
      data: {
        xf_docno: this.data.xf_docno
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (a) {},
      fail: function () {},
    });
  },
  onShow: function () {
    var t = this;
    if (!wx.getStorageSync('zb')) {
      wx.request({
        url: a.globalData.api + "wx_likesorts.ashx",
        data: {
          sorts: t.data.sorts
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        timeout: 10000,
        success: function (a) {
          a.data.length > 0 && t.setData({
              replu: a.data,
              flag: true
            }),
            t.delgwc();
        },
        fail: function () {},
        complete: function () {},
      });

    } else {

      t.setData({
        flag: false

      })

    }

  },

  enterLive() {

    wx.showLoading({
      title: "正在进入直播间",
      mask: !0
    })
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
          avatarUrl: wx.getStorageSync('wximg'),
          yguserid: wx.getStorageSync("yguserid"),
          vipcode: wx.getStorageSync("vipcode"),
          liveTitle: wx.getStorageSync("title"),
        },
        header: {
          "content-type": "application/json"
        },
        timeout: 10000,
        success: (res) => {
          var liveUrl = res.data;
          // 2. 跳转到web-view打开直播间
          wx.navigateTo({
            url: `/pages/webview/index?url=${encodeURIComponent(liveUrl)}`
          });

        },
        fail: function () {},
        complete: () => {
          wx.hideLoading()
        }
      })

    }



  },






});