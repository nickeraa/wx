var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    ydprice: "",
    xf_plu: "",
    xf_desci: "",
    snumber: "",
    xf_price: "",
    view: "true",
    newydprice: "",
    yd: "",
  },
  getsnumber: function (t) {
    this.setData({ snumber: t.detail.value }), console.log(this.data.snumber);
  },
  getydprice: function (t) {
    this.setData({ newydprice: t.detail.value }),
      console.log(this.data.newydprice);
  },
  checkinput: function (t) {
    "" == this.data.snumber
      ? wx.showToast({ title: "请输入商品货号", icon: "none", duration: 1e3 })
      : this.senumber();
  },
  senumber: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_seydprice.ashx",
      data: { xf_plu: a.data.snumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          0 == t.data.length
            ? wx.showModal({
                title: "提示",
                content: "商品货号不存在",
                showCancel: !1,
                success: function (t) {
                  t.confirm && a.setData({ view: "true" });
                },
              })
            : a.setData({
                xf_plu: t.data[0].XF_PLU,
                xf_desci: t.data[0].XF_DESCI,
                xf_price: t.data[0].REALPRICE,
                ydprice: t.data[0].YD_AMTSOLD,
                yd: t.data[0].YD,
                view: "",
              });
      },
    });
  },
  onLoad: function (t) {},
  update: function () {
    if ("" == this.data.newydprice)
      wx.showToast({
        title: "请输入新的预定金额",
        icon: "none",
        duration: 1e3,
      });
    else if ("0" != this.data.yd)
      wx.showToast({
        title: "后台设置不允许修改预定金额",
        icon: "none",
        duration: 1e3,
      });
    else if (this.data.newydprice / this.data.xf_price < 0.3)
      wx.showToast({
        title: "新的预定金额不能低于价格的30%",
        icon: "none",
        duration: 1e3,
      });
    else {
      wx.request({
        url: t.globalData.api + "wx_upydprice.ashx",
        data: { xf_plu: this.data.snumber, ydprice: this.data.newydprice },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            "ok" != t.data
              ? wx.showModal({
                  title: "提示",
                  content: "数据错误",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                })
              : wx.showModal({
                  title: "提示",
                  content: "修改成功！",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                });
        },
      });
    }
  },
});
