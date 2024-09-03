var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    rejob: {},
    xf_store: "",
    xf_plu: "",
    xf_qty: "",
    vipcode: "",
    snumber: "",
    susername: "",
    entime: "",
    userid: "",
  },
  onLoad: function (t) {},
  onShow: function (e) {
    console.log(wx.getStorageSync("qguserid"));
    var a = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_listppstocks.ashx",
        data: { qguserid: wx.getStorageSync("qguserid") },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            t.data.length > 0
              ? a.setData({ rejob: t.data })
              : a.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  qznumber: function (t) {
    wx.navigateTo({
      url:
        "/pages/jlstocks/index/index?wlnumber=" +
        t.currentTarget.dataset.wlnumber,
    });
  },
});
