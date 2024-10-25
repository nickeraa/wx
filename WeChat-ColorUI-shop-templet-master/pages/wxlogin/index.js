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
        title: "正在注册",
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
            console.log(t.data.imgurl),

            t.invip();

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

  invip() {

    console.log(wx.getStorageSync('openid'))

    var t = this;

    console.log(t.data.nickName)
    console.log(t.data.imgurl)
    //return false

    if(wx.getStorageSync('vipcode'))
    {

      wx.request({
        url: a.globalData.api + "wx_customer_oldvip.ashx",
        data: {
          vipcode: wx.getStorageSync('vipcode'),
          wxuser: t.data.nickName,
          wximg: t.data.imgurl,
          openid: wx.getStorageSync('openid')
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data == 'ok' ?
            wx.showModal({
              title: "提示",
              content: "领取会员卡成功",
              showCancel: !1,
              success: function (a) {
  
           //     t.checkvip();

           wx.setStorageSync('wximg', t.data.imgurl),
           wx.setStorageSync('wxuser', t.data.nickName)

  
           wx.switchTab({
            url: '/pages/user/index/index',
          }) 
  
              },
            }) :
            wx.showToast({
              title: '数据错误', // 提示的内容
              icon: 'error', // 提示图标
              duration: 1000, // 提示的延迟时间
              mask: true // 是否显示透明蒙层，防止触摸穿透
            })
  
   
  
        },
      });

    }
    else{


      wx.request({
        url: a.globalData.api + "wx_customer_newvip.ashx",
        data: {
          phone: wx.getStorageSync('phone'),
          wxuser: t.data.nickName,
          wximg: t.data.imgurl,
          openid: wx.getStorageSync('openid')
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data == 'ok' ?
            wx.showModal({
              title: "提示",
              content: "领取会员卡成功",
              showCancel: !1,
              success: function (a) {
  
                t.checkvip();
  
  
  
              },
            }) :
            wx.showToast({
              title: '数据错误', // 提示的内容
              icon: 'error', // 提示图标
              duration: 1000, // 提示的延迟时间
              mask: true // 是否显示透明蒙层，防止触摸穿透
            })
  
   
  
        },
      });



    }
   

    wx.hideLoading();

  },

  checkvip() {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_checknewvips.ashx",
      data: {

        openid: wx.getStorageSync('openid')
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0 ?
          (wx.setStorageSync('vipcode', a.data[0].VIPCODE),
          wx.setStorageSync('wximg', a.data[0].WXIMG),
          wx.setStorageSync('wxuser', a.data[0].WXUSER))         
          :
     
          wx.showToast({
            title: '数据错误', // 提示的内容
            icon: 'error', // 提示图标
            duration: 1000, // 提示的延迟时间
            mask: true // 是否显示透明蒙层，防止触摸穿透
          })
        console.log(wx.getStorageSync('vipcode'))
        wx.hideLoading();
        wx.switchTab({
          url: '/pages/user/index/index',
        }) 
       

      },
    });





  }






});