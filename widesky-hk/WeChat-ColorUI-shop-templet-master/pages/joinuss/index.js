var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    TabbarBot: a.globalData.tabbar_bottom,
    pict: a.globalData.hkimgUrl,
    pnumber: "",
    qty: "",
    tag: "",
    xf_desci: "",
    xf_plu: "",
    resultdt: {},
    flags: true
  },
  onLoad: function (a) {
    this.setData({
      pnumber: a.id
    }), console.log(this.data.pnumber);
  },
  goback: function () {
    wx.redirectTo({
      url: "/pages/cxpe/index/index"
    });
  },
  onShow: function (t) {
    if (!wx.getStorageSync("userid"))
      return wx.navigateTo({
        url: "/pages/coupon/index/index"
      }), !1;
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_search_prove.ashx",
      data: {
        pnumber: e.data.pnumber
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a),
          e.setData({
            resultdt: a.data,
            xf_desci: a.data[0].XF_DESCI,
            qty: a.data[0].QTY,
            xf_plu: a.data[0].XF_PLU,
          });
      },
    });
  },
  shuaxin: function () {

    if (this.data.flags==false) {

      wx.showLoading({
        title: '太频繁了',
      })

      return false;

    }

    this.setData({

      flags: false

    })
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_search_prove.ashx",
      data: {
        pnumber: t.data.pnumber
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a),
          t.setData({
            resultdt: a.data,
            tag: a.data[0].TAG,
            qty: a.data[0].QTY,
          }),
          "0" != t.data.tag ?
          wx.showModal({
            title: "提示",
            content: "配额状态超时或发生改变，无法取消配额，请刷新后再操作",
            showCancel: !1,
            success: function (a) {
              a.confirm &&
                wx.redirectTo({
                  url: "/pages/qxtp/index/index"
                });
            },
          }) :
          t.checkitem();
      },
    });
  },
  checkitem: function () {


    var that = this;

    wx.request({
      url: a.globalData.api + "qxpe.ashx",
      data: {
        pnumber: that.data.pnumber,
        userid: wx.getStorageSync("userid"),
        xf_plu: that.data.xf_plu,
        qty: that.data.qty,
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
            content: "已取消配额",
            showCancel: !1,
            success: function (a) {
              a.confirm && wx.redirectTo({
                url: "/pages/cxpe/index/index"
              });
            },
          });

        that.setData({

          flags: true

        })
      },
      fail: function () {
        console.log("submit fail");
      },
      complete: function () {},
    });
  },
});