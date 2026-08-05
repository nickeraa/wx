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
        }
      },
      fail: () => {
        wx.showToast({ title: "网络异常，请重试", icon: "none" });
      }
    })
    let That = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
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
  },
  bindKeyInput(e) {
    this.setData({
      nickName: e.detail.value
    })
  },

  lq(e) {
    // 未选择头像（空值）或使用了微信默认头像（https 网络 URL，uploadFile 无法上传）都拦截
    if (!this.data.avatarUrl || this.data.avatarUrl.indexOf("https") >= 0) {

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
        title: "正在预约",
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
          t.setData({
            imgurl: "wximg/" + a.data
          });

          wx.setStorageSync('wximg', t.data.imgurl);
          wx.setStorageSync('wxuser', t.data.nickName);
          wx.hideLoading();

          wx.showModal({
            title: "提示",
            content: "预约成功！",
            showCancel: !1,
            success: function (a) {
              a.confirm;
              wx.navigateBack({ delta: 1 })
            },
          })

        },
        fail: function (a) {
          wx.hideLoading();
          wx.showToast({
            title: '上传失败，请重试', // 提示的内容
            icon: 'error', // 提示图标
            duration: 1000, // 提示的延迟时间
            mask: true // 是否显示透明蒙层，防止触摸穿透
          })
        },
      });

  },

  back()
  {

    wx.navigateBack({ delta: 1 })


  },

});