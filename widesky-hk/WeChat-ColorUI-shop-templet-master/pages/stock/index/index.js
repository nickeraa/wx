var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    rest: {},
    xf_plu: "",
    xf_longdesc: "",
    amount: "",
    stock: "",
    vipprice: "",
  },
  onLoad: function (a) {
    this.setData({ xf_plu: a.id });
  },
  onShow: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_stocklist.ashx",
      data: { xf_plu: e.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0
            ? e.setData({
                rest: a.data,
                xf_longdesc: a.data[0].XF_LONGDESC,
                amount: a.data[0].AMOUNT,
                stock: a.data[0].STOCK,
                vipprice: a.data[0].VIPPRICE,
              })
            : wx.showModal({
                title: "提示",
                content: "该产品暂时没有店铺抢配额",
                showCancel: !1,
                success: function (a) {
                  a.confirm && wx.navigateBack({ delta: 0 });
                },
              });
      },
      complete: function () {},
    });
  },
  sesku: function () {
    wx.navigateTo({
      url:
        "/pages/seprices/index/index?xf_plu=" +
        this.data.xf_plu +
        "&xf_desci=" +
        this.data.xf_longdesc,
    });
  },
});
