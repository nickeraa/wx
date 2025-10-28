var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: e(
    e(
      e(
        e({
            StatusBar: t.globalData.StatusBar,
            CustomBar: t.globalData.CustomBar,
            rets: {},
            userid: "",
            xf_name: "",
            qty: "",
            vipcode: "",
            vipname: "",
            whnumber: "",
            snumber: "",
            enumber: "",
            result: {},
            index2: null,
            picker2: [],
            store: "",
            storename: "",
            f1: true,
            f2: true,
            f3: true,
            f4: true,
            f5: true,
            setype: ''

          },
          "userid",
          ""
        )

      )
    )

  ),
  bindPickerChange2: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value),
      this.setData({
        index2: e.detail.value,
        store: this.data.picker2[e.detail.value].XF_STORECODE,
        storename: this.data.picker2[e.detail.value].XF_NAME,
      });
  },
  getvipcode: function (a) {
    this.setData({
      vipcode: a.detail.value
    });
  },


  listvipcode: function () {
    if (this.data.store == '') {

      wx.showModal({
        title: "提示",
        content: "请选择登记店铺",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })
      return false


    }


    if (this.data.vipcode == '') {


      wx.showModal({
        title: "提示",
        content: "卡号输入不能为空",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })
      return false


    }
    var that = this;
    wx.request({
      url: t.globalData.api + "wx_checkvip.ashx",
      data: {
        vipcode: that.data.vipcode
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0 ?
          that.setData({
            vipname: a.data[0].XF_SURNAME,
            grade: a.data[0].GRADE,
            store: a.data[0].XF_STORES,
            xf_name: a.data[0].XF_USERNAME,
            xf_users: a.data[0].XF_USERS,
            vipcode: a.data[0].XF_VIPCODE,
            f1: false,
            f2:true,
            f3:true,
            f4:true
          }) :
          (that.setData({
              vipname: '',
              grade: '',
              store: '',
              xf_name: '',
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
  listvip: function () {
    wx.navigateTo({
      url: "/pages/vipss/index/index"
    });
  },

  delvipnumber: function (e) {
  
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_delvipnumber.ashx",
      data: {
        xf_vipcode: this.data.vipcode,
        xf_storecode:this.data.store.substring(0, 4),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e)
        if (e.data != 'ok') {

          wx.showModal({
            title: "提示",
            content: "删除失败！数据错误",
            showCancel: !1,
            success: function (a) {
              a.confirm;
            },
          })

        }
        else{

          wx.showModal({
            title: "提示",
            content: "已删除此会员登记的尾号！",
            showCancel: !1,
            success: function (a) {
              a.confirm;
            },
          })


        }
       
      },
    });

  },


  onLoad: function (e) {},
  onShow: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_sestore.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e), a.setData({
          picker2: e.data
        });
      },
    });
  },
});