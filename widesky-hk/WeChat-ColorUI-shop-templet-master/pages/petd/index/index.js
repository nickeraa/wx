var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    userid: "",
    xf_plu: "",
    qty: "",
    snumber: "",
    result: {},
    pnumber: ''


  },





  getsnumber: function (e) {
    this.setData({
      snumber: e.detail.value
    }), console.log(this.data.snumber);
  },
  getsku: function (e) {
    this.setData({
      xf_plu: e.detail.value
    }), console.log(this.data.xf_plu);
  },

  getqty: function (e) {
    this.setData({
      qty: e.detail.value
    }), console.log(this.data.qty);
  },


  checkinput: function (e) {
    if (this.data.snumber == '') {

      wx.showToast({
        title: "请输入配额定金单号",
        icon: "none",
        duration: 1000
      })

    } else if (this.data.xf_plu == '') {

      wx.showToast({
        title: "货号不能为空",
        icon: "none",
        duration: 1000
      })

    } else if (this.data.qty == '') {

      wx.showToast({
        title: "数量不能为空",
        icon: "none",
        duration: 1000
      })

    } else {

      this.senumber();

    }

  },
  senumber: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_checktd.ashx",
      data: {
        dnumber: a.data.snumber,
        xf_plu: a.data.xf_plu,
        qty: a.data.qty,
        userid: wx.getStorageSync("userid")
       
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e),
          0 == e.data.length ?
          wx.showModal({
            title: "提示",
            content: "配额数据不存在，请检查输入信息",
            showCancel: !1,
            success: function (e) {

            },
          }) :
          a.setData({
            pnumber: e.data[0].PNUMBER
          }),
          a.td();
      },
    });
  },

  td() {


    console.log(this.data.pnumber)

    wx.request({
      url: t.globalData.api + "wx_tdpe.ashx",
      data: {
        pnumber: this.data.pnumber,
        userid: wx.getStorageSync("userid"),
        xf_plu: this.data.xf_plu,
        qty: this.data.qty,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" == a.data &&
          wx.showModal({
            title: "提示",
            content: "已退配额",
            showCancel: !1,
            success: function (a) {
        
            },
          });
      },
      fail: function () {
        console.log("submit fail");
      },
      complete: function () {},
    });


  },


  onLoad: function (e) {},
  onShow: function (e) {

  },
});