var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: e(
    e(
      e(
        {
          StatusBar: t.globalData.StatusBar,
          CustomBar: t.globalData.CustomBar,
          phone: "",
          username: "",
          openid: "",
          userid: "",
          xf_plu: "",
          xf_name: "",
          warning: "",
          qty: "",
          vipcode: "",
          vipname: "",
          snumber: "",
          susername: "",
          rejob: {},
          acount: "",
          xf_price: "",
          index2: null,
          picker2: [],
          store: "",
          storename: "",
        },
        "userid",
        ""
      ),
      "view",
      "true"
    ),
    "wlnumber",
    ""
  ),
  onLoad: function (e) {},
  getsnumber: function (e) {
    this.setData({ wlnumber: e.detail.value }), console.log(this.data.wlnumber);
  },
  bindPickerChange2: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value),
      this.setData({
        index2: e.detail.value,
        store: this.data.picker2[e.detail.value].XF_STORECODE,
        storename: this.data.picker2[e.detail.value].XF_NAME,
      });
  },
  checkinput: function (e) {
    null == this.data.index2
      ? wx.showToast({ title: "请输入发货店铺", icon: "none", duration: 1e3 })
      : this.senumber();
  },
  onShow: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_sestore.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e), a.setData({ picker2: e.data });
      },
    });
  },
  senumber: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_customer_listfhs.ashx",
      data: { store: a.data.store },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          0 == e.data.length
            ? wx.showModal({
                title: "提示",
                content: "没有数据",
                showCancel: !1,
                success: function (e) {
                  e.confirm && a.setData({ rejob: null, view: "true" });
                },
              })
            : a.setData({ rejob: e.data, view: !1 });
      },
    });
  },
  qznumber: function (e) {
    wx.navigateTo({
      url:
        "/pages/fhstocksss/index/index?wlnumber=" +
        e.currentTarget.dataset.wlnumber,
    });
  },
});
