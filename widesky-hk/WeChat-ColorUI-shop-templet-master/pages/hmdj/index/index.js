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
  getwhnumber: function (a) {
    this.setData({
      whnumber: a.detail.value
    });
  },
  getsnumber: function (a) {
    console.log("携带值为", a.detail.value),
      this.setData({
        snumber: a.detail.value
      });
  },

  getenumber: function (a) {
    console.log("携带值为", a.detail.value),
      this.setData({
        enumber: a.detail.value
      });
  },

  radioChange: function (t) {
    console.log("radior发送选择改变，携带值为", t.detail.value), this.setData({
      setype: t.detail.value
    })
    if (this.data.setype == '0') {

      this.setData({
        f2: false,
        f3: true
      })

    } else {

      this.setData({

        f2: true,
        f3: false


      })

    }
    this.setData({

      whnumber: '',
      snumber: '',
      enumber: ''


    })

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
  add: function () {
    if (this.data.setype == '') {

      wx.showModal({
        title: "提示",
        content: "请选择登记类型",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })

      return false

    }

    if (this.data.setype == '0') {
      if (this.data.whnumber == '' || this.data.whnumber.length != 3) {

        wx.showModal({
          title: "提示",
          content: "请输入3位数尾号",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        })

        return false
      }

    }


    if (this.data.setype == '1' || this.data.setype == '2' || this.data.setype == '3') {
      if (this.data.snumber == '' || this.data.enumber == '') {

        wx.showModal({
          title: "提示",
          content: "请输入起始尾号",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        })

        return false
      }

      if (this.data.snumber.length != 3 || this.data.enumber.length != 3) {

        wx.showModal({
          title: "提示",
          content: "请输入3位数起始尾号",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        })

        return false
      }


      if (this.data.setype == '1') {
        if (this.data.enumber - this.data.snumber != 9) {

          wx.showModal({
            title: "提示",
            content: "起始尾号输入错误",
            showCancel: !1,
            success: function (a) {
              a.confirm;
            },
          })

          return false
        }
      } else {


        if (this.data.enumber - this.data.snumber != 99) {

          wx.showModal({
            title: "提示",
            content: "起始尾号输入错误",
            showCancel: !1,
            success: function (a) {
              a.confirm;
            },
          })

          return false
        }


      }





    }

    var a = this;
    wx.request({
      url: t.globalData.api + "wx_addwh.ashx",
      data: {
        xf_storecode: this.data.store.substring(0, 4),
        xf_vipcode: this.data.vipcode,
        xf_staffcode: wx.getStorageSync('userid'),
        whnumber: this.data.whnumber,
        setype: this.data.setype,
        snumber: this.data.snumber,
        enumber: this.data.enumber

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
            content: "添加尾号失败，数据出错！",
            showCancel: !1,
            success: function (a) {
              a.confirm;
            },
          })

        } else {


          a.se_whnumber();

        }

      },
    });


  },

  se_whnumber() {

    var a = this;
    wx.request({
      url: t.globalData.api + "wx_se_whnumber.ashx",
      data: {
        xf_storecode: this.data.store.substring(0, 4),
        xf_vipcode: this.data.vipcode,
        xf_staffcode: wx.getStorageSync('userid'),

      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e), a.setData({
          rets: e.data,
          f4:false
        });
      },
    });

  },


  delnumber: function (e) {
    console.log(e.currentTarget.dataset.id)
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_delwh.ashx",
      data: {
        id: e.currentTarget.dataset.id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e)
        if (e.data != 'ok') {
          wx.showLoading({
            title: '数据错误',
          })

        }
        a.se_whnumber()
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