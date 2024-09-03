var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: e(
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
  onLoad: function (e) {},
  senumber: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_seckstock.ashx",
      data: { zcnumber: a.data.snumber, store: a.data.store },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          0 == e.data.length
            ? wx.showModal({
                title: "提示",
                content: "转仓单号不存在",
                showCancel: !1,
                success: function (e) {
                  e.confirm && a.setData({ view: "true" });
                },
              })
            : a.setData({ rejob: e.data, view: "" });
      },
    });
  },
  getsnumber: function (e) {
    this.setData({ snumber: e.detail.value }), console.log(this.data.snumber);
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
    "" == this.data.snumber
      ? wx.showToast({ title: "请输入转仓单号", icon: "none", duration: 1e3 })
      : null == this.data.index2
      ? wx.showToast({ title: "请输入转仓店铺", icon: "none", duration: 1e3 })
      : this.senumber();
  },
  onShow: function (e) {
    console.log(wx.getStorageSync("ckuserid"));
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
  getznumber: function (e) {
    wx.navigateTo({
      url:
        "/pages/listsejzb/index/index?znumber=" +
        e.currentTarget.dataset.znumber,
    });
  },
  rcznumber: function (e) {
    wx.navigateTo({
      url:
        "/pages/zcjzbss/index/index?znumber=" + e.currentTarget.dataset.znumber,
    });
  },
});
