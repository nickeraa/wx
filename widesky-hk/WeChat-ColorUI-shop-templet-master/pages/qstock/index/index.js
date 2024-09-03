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
    i: "",
  },
  bindPickerChange2: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value),
      this.setData({
        index2: e.detail.value,
        store: this.data.picker2[e.detail.value].XF_STORECODE,
        storename: this.data.picker2[e.detail.value].XF_NAME,
      });
  },
  onLoad: function (e) {
    e.i && this.setData({ i: e.i, store: e.store });
  },
  checkinput: function (t) {
    if (null == this.data.index2)
      return (
        wx.showToast({ title: "请输入登记店铺", icon: "none", duration: 1e3 }),
        !1
      );
    var a = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: e.globalData.api + "wx_seddstock.ashx",
        data: { store: a.data.store },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0
              ? a.setData({ rejob: e.data })
              : (a.setData({ rejob: null }),
                wx.showModal({
                  title: "提示",
                  content: "没有登记信息！",
                  showCancel: !1,
                  success: function (e) {
                    e.confirm;
                  },
                })),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  onShow: function (t) {
    var a = this;
    "" == a.data.i
      ? wx.request({
          url: e.globalData.api + "wx_sestore.ashx",
          data: {},
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (e) {
            console.log(e), a.setData({ picker2: e.data });
          },
        })
      : wx.request({
          url: e.globalData.api + "wx_seddstock.ashx",
          data: { store: a.data.store },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (e) {
            console.log(e),
              e.data.length > 0
                ? a.setData({ rejob: e.data })
                : (a.setData({ rejob: null }),
                  wx.showModal({
                    title: "提示",
                    content: "没有登记信息！",
                    showCancel: !1,
                    success: function (e) {
                      e.confirm;
                    },
                  })),
              wx.hideLoading();
          },
          complete: function () {},
        });
  },
  getznumber: function (e) {
    wx.navigateTo({
      url:
        "/pages/sejzb/index/index?znumber=" + e.currentTarget.dataset.znumber,
    });
  },
  qznumber: function (e) {
    wx.navigateTo({
      url:
        "/pages/qhjzb/index/index?znumber=" + e.currentTarget.dataset.znumber,
    });
  },
});
