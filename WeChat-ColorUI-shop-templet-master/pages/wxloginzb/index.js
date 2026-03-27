var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
    select: "",
    avatarUrl: '',
    nickName: '',
    imgurl: ''
  },
  onLoad: function (a) {


    let That = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log('用户信息', res.userInfo)
              if (res.userInfo.nickName == '微信用户') {

                That.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: ''
                })

              } else {

                That.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName
                })

              }




            }
          })
        }
      }
    })



  },

  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail


    this.setData({
      avatarUrl,
    })
    console.log(this.data.avatarUrl)


  },
  bindKeyInput(e) {

    console.log(this.data.nickName)

    this.setData({
      nickName: e.detail.value
    })

    console.log(this.data.nickName)

  },

  lq(e) {


    console.log(this.data.avatarUrl)
    /*
        if(this.data.avatarUrl.indexOf("jpeg") < 0)
        {

          this.setData({
            avatarUrl:this.data.avatarUrl+'jpeg'
          })

        }
    */
    if (this.data.avatarUrl.indexOf("https") >= 0) {

      wx.showToast({
        title: '请选择头像', // 提示的内容
        icon: 'error', // 提示图标
        duration: 1000, // 提示的延迟时间
        mask: true // 是否显示透明蒙层，防止触摸穿透
      })


      return false;
    }

    if (this.data.nickName == '') {

      wx.showToast({
        title: '请填写昵称', // 提示的内容
        icon: 'error', // 提示图标
        duration: 1000, // 提示的延迟时间
        mask: true // 是否显示透明蒙层，防止触摸穿透
      })


      return false;
    }

    this.newvip();



  },
  onShow: function () {},

  newvip() {

    var t = this;
    wx.showLoading({
        title: "正在登录",
        mask: !0
      }),
      wx.uploadFile({
        url: a.globalData.api + "wx_postwximg.ashx",
        filePath: t.data.avatarUrl,
        name: "imgfile",
        formData: {
          method: "POST"
        },
        success: function (a) {
          console.log(a),

            t.setData({
              imgurl: "wximg/" + a.data
            }),
            console.log(t.data.imgurl)

         //   t.invip();

         wx.setStorageSync('wximg', t.data.imgurl),
         wx.setStorageSync('wxuser', t.data.nickName)
        wx.hideLoading();
           // t.loginzb();
           wx.redirectTo({ url: "/pages/userlive/index/index?user=1" });

        },
        fail: function (a) {

          wx.showToast({
            title: 'error', // 提示的内容
            icon: 'error', // 提示图标
            duration: 1000, // 提示的延迟时间
            mask: true // 是否显示透明蒙层，防止触摸穿透
          })
        },
      });

  },

  back()
  {

    wx.redirectTo({ url: "/pages/userlive/index/index" });


  },

loginzb()
{

  wx.request({
    url: "https://widesky.work/HKback/live_cn.aspx",
    data: {
      openid: wx.getStorageSync('openid'),
      nickName:wx.getStorageSync('wxuser'),
      avatarUrl:wx.getStorageSync('wximg')
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

});