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
    index2: null,
    picker2: [],
    store: "",
    i: "",
  },
  bindPickerChange2: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({
        index2: t.detail.value,
        store: this.data.picker2[t.detail.value].XF_STORECODE,
        storename: this.data.picker2[t.detail.value].XF_NAME,
      });
  },
  onLoad: function (t) {
    t.i && this.setData({ i: t.i, store: t.store }),
      console.log(this.data.i),
      console.log(this.data.store);
  },
  onShow: function (e) {
    if ("" == (a = this).data.i)
      wx.request({
        url: t.globalData.api + "wx_sestore.ashx",
        data: {},
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t), a.setData({ picker2: t.data });
        },
      });
    else {
      var a = this;
      wx.showLoading({ title: "正在加载数据", mask: !0 }),
        wx.request({
          url: t.globalData.api + "wx_customer_liststorestock.ashx",
          data: { store: a.data.store },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (t) {
            console.log(t),
              t.data.length > 0
                ? a.setData({ rejob: t.data })
                : (a.setData({ rejob: null }),
                  wx.showModal({
                    title: "提示",
                    content: "没有数据！",
                    showCancel: !1,
                    success: function (t) {
                      t.confirm;
                    },
                  })),
              wx.hideLoading();
          },
          complete: function () {},
        });
    }
  },
  checkinput: function (e) {
    if (null == this.data.index2)
      return (
        wx.showToast({ title: "请输入登记店铺", icon: "none", duration: 1e3 }),
        !1
      );
    var a = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_liststorestock.ashx",
        data: { store: a.data.store },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            t.data.length > 0
              ? a.setData({ rejob: t.data })
              : (a.setData({ rejob: null }),
                wx.showModal({
                  title: "提示",
                  content: "没有数据！",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                })),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  getznumber: function (t) {
    wx.navigateTo({
      url:
        "/pages/listjzb/index/index?znumber=" + t.currentTarget.dataset.znumber,
    });
  },
  zcznumber: function (t) {
    wx.navigateTo({
      url:
        "/pages/zcjzb/index/index?znumber=" + t.currentTarget.dataset.znumber,
    });
  },
});
