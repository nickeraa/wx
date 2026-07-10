var e = getApp(),
  t = require("../../../utils/qutil");
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    vip: "",
    qdvipcode: "",
    flagdj: false,
    flagcard: true,
    flagvip: true,
    flagqd:true,
    phone: "",
    banner: e.globalData.imgUrls,
    images: '',
    vipname: '',
    grade: '',
    storecode: '',
    zhname: '',
    checkflag: '',
    xf_address1:'',
    yqd:false,
    qddate:''



  },
  onLoad: function (a) {

    this.setData({

      checkflag: wx.getStorageSync('qdvipcode')

    })


    /*
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
    */
  },


  onShow: function (t) {

    var a = this;
    wx.request({
      url: e.globalData.api + "wx_listzh.ashx",
      data: {
        qdvipcode: wx.getStorageSync("qdvipcode")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e),

          a.setData({
            images: e.data[0].BANNER,
            zhname: e.data[0].ZHNAME,

          })
        console.log(a.data.banner + a.data.images),

          e.data[0].XF_VIPCODE != null ?
          (a.setData({
           qdvipcode:e.data[0].XF_VIPCODE,
            flagdj: true,
            flagcard: true,
            flagvip: false,
            flagqd:true,
            yqd:true,
            qddate:e.data[0].ENTIME1,
          }),a.search()) :
          a.setData({
            vip: "您还没有签到哦 ~",
            flagdj: false,
            flagcard: true,
            flagvip: true,
            checkflag:false

          });
      },
    })


  },

  qd() {
if(wx.getStorageSync('qdvipcode'))
{

  this.setData({

qdvipcode:wx.getStorageSync('qdvipcode')
  
  })


this.search();

this.setData({

  flagcard: true,
  flagdj: true,
  falgvip: false

})

}
else{

  this.setData({

    flagcard: false,
    flagdj: true,
    falgvip: true
  })


}
   


  },

  getvipcode: function (a) {
    this.setData({
      qdvipcode: a.detail.value
    });
  },
  search() {


    var t = this;
    wx.request({
      url: e.globalData.api + "wx_checkvip.ashx",
      data: {
        vipcode: t.data.qdvipcode

      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a)
        
       if(a.data.length > 0)
       {
        t.setData({
          qdvipcode: a.data[0].XF_VIPCODE,
          vipname: a.data[0].XF_SURNAME,
          grade: a.data[0].GRADE,
          xf_address1:a.data[0].XF_ADDRESS1,
          storecode: a.data[0].XF_STORES,
          flagvip: false,
          flagqd: false,
        })
        if(t.data.yqd){

          t.setData({
            flagqd: true,

          })
        }  

       }
          else{
            wx.showModal({
              title: "提示",
              content: "您输入的会员卡号不存在",
              showCancel: !1,
              success: function (a) {
                a.confirm && t.setData({
  
                  flagvip: true,
                  flagqd: true
                });
              }
            })

          }
        
      }
    });





  },

  qds() {


    var t = this;
    wx.request({
      url: e.globalData.api + "wx_inqd.ashx",
      data: {
        zhname: t.data.zhname,
        qdvipcode: t.data.qdvipcode

      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a), a.data == 'ok' ?

          (
            wx.setStorageSync('qdvipcode', t.data.qdvipcode),
            t.setData({
              flagvip: true,
              flagqd: true,
              flagcard: true,
              checkflag: t.data.qdvipcode,
              vip: ''
            }),t.onShow()) :
          wx.showModal({
            title: "提示",
            content: "签到数据错误",
            showCancel: !1,
            success: function (a) {
              a.confirm && t.setData({

              });
            }
          })
      }
    });


  },



  /*
    onGetPhoneNumber: function (e) {
     
      var t = this,
        a = e.detail.errMsg,
        o = e.detail.encryptedData;
      console.log(wx.getStorageSync("sessionID")), console.log(o);
      var n = e.detail.iv;
      "getPhoneNumber:ok" == a
        ?
        wx.checkSession({
          success: function () {
            t.deciyption(wx.getStorageSync("sessionID"), o, n);
          },
          fail: function () {},
        }) :
        wx.showModal({
          title: "提示",
          content: "签到失败！请重试，选择手机号~",
          showCancel: !1,
          success: function (e) {
            e.confirm;
          },
        });
    },

    deciyption: function (t, a, o) {
      var n = this;
      console.log("步骤4根据秘钥解密手机号码sessionID：", t),
        wx.request({
          url: e.globalData.api + "wx_getvipphone.ashx",
          data: {
            sessionID: t,
            encryptedData: a,
            iv: o
          },
          header: {
            "content-type": "application/json"
          },
          success: function (t) {
          
              (console.log(t.data),
                n.setData({
                  phone: t.data.phoneNumber,
                  flagcard:false,
                  flagdj:true,
                  falgvip:false

                }),
                wx.setStorageSync('phone', t.data.phoneNumber)


            )
     
            
          },

        });
    },

    

    inphone: function () {

      if (!wx.getStorageSync("vip_id")) {

        console.log('ggggggggggg')
        wx.navigateTo({
          url: "/pages/wxlogin/index"
        });


      } else {

        var t = this;
        wx.showLoading({
            title: "正在加载"
          }),
          wx.request({
            url: e.globalData.api + "wx_sqlphones.ashx",
            data: {
              vip_id: wx.getStorageSync("vip_id"),
              phone: t.data.phone
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function (a) {
              wx.hideLoading(),
                console.log(a.data),
                "ok" != a.data ?
                wx.showToast({
                  title: "数据异常"
                }) :
                wx.request({
                  url: e.globalData.api + "wx_vipid.ashx",
                  data: {
                    vip_id: wx.getStorageSync("vip_id")
                  },
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  dataType: "json",
                  success: function (e) {
                    console.log(e),
                      e.data.length > 0 ?
                      (t.setData({
                          vip: e.data[0].GRADE,
                          flag: !0,
                          flags: !1,
                          tximg: "/img/vip.png",
                          vipcode: e.data[0].XF_VIPCODE,
                        }),
                        wx.setStorageSync("vipcode", e.data[0].XF_VIPCODE),
                        t.setData({
                          vipcode: e.data[0].XF_VIPCODE,
                          flag: !0,
                          flags: !1,
                          tximg: "/img/vip.png",
                        }),
                        wx.redirectTo({
                          url: '/pages/wxlogin/index',
                        })
                        // wx.showToast({ title: "会员卡领取成功！" })
                      ) :
                      (t.setData({
                          vip: "您还没有登录哦 ~",
                          flag: !1,
                          flags: !0,
                          tximg: "/img/yk.jpg",
                        }),
                        wx.showToast({
                          title: "没有会员卡信息"
                        }));
                  },
                });
            },
          });

      }
    },
  */
});