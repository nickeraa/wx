var e = getApp();
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
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
  onLoad: function (e) {},
  onShow: function (a) {
    console.log(wx.getStorageSync("qguserid"));
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: e.globalData.api + "wx_customer_listppstock.ashx",
        data: { qguserid: wx.getStorageSync("qguserid") },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0
              ? t.setData({ rejob: e.data })
              : t.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  qznumber: function (e) {
    wx.navigateTo({
      url:
        "/pages/allsejzb/index/index?znumber=" +
        e.currentTarget.dataset.znumber,
    });
  },
});
