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
    index2: null,
    picker2: [],
    store: "",
    storename: "",
  },
  onLoad: function (e) {},
  bindPickerChange2: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value),
      this.setData({
        index2: e.detail.value,
        store: this.data.picker2[e.detail.value].XF_STORECODE,
        storename: this.data.picker2[e.detail.value].XF_NAME,
      });
  },
  onShow: function (t) {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_sestore.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e), a.setData({ picker2: e.data });
      },
    });
  },
  checkinput: function () {
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: e.globalData.api + "wx_customer_cxstock.ashx",
        data: { store: t.data.store },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0
              ? t.setData({ rejob: e.data })
              : wx.showModal({
                  title: "提示",
                  content: "没有发货申请单！",
                  showCancel: !1,
                  success: function (e) {
                    e.confirm;
                  },
                }),
            wx.hideLoading();
        },
      });
  },
  qznumber: function (e) {
    wx.redirectTo({
      url:
        "/pages/cxjlstocks/index/index?wlnumber=" +
        e.currentTarget.dataset.wlnumber,
    });
  },
});
