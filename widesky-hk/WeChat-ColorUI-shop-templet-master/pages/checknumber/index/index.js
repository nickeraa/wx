var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: e(
    e(
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
            result: {},
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
        "imglist",
        t.globalData.api + "images/timg.jpg"
      ),
      "imgurl",
      ""
    ),
    "view",
    "true"
  ),
  bindPickerChange2: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value),
      this.setData({
        index2: e.detail.value,
        store: this.data.picker2[e.detail.value].XF_STORECODE,
        storename: this.data.picker2[e.detail.value].XF_NAME,
      });
  },
  getsnumber: function (e) {
    this.setData({ snumber: e.detail.value }), console.log(this.data.snumber);
  },
  checkinput: function (e) {
    "" == this.data.snumber
      ? wx.showToast({ title: "请输入销售单号", icon: "none", duration: 1e3 })
      : null == this.data.index2
      ? wx.showToast({ title: "请输入登记店铺", icon: "none", duration: 1e3 })
      : this.senumber();
  },
  senumber: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_listnumber.ashx",
      data: { number: a.data.snumber, store: a.data.store },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          0 == e.data.length
            ? wx.showModal({
                title: "提示",
                content: "电脑单号不存在",
                showCancel: !1,
                success: function (e) {
                  e.confirm && a.setData({ view: "true" });
                },
              })
            : a.setData({ result: e.data, view: "" });
      },
    });
  },
  sesnumber: function (e) {
    console.log(e.currentTarget.dataset.xf_plu),
      "S" == this.data.snumber.substring(0, 1).toUpperCase()
        ? wx.navigateTo({
            url:
              "/pages/upnumber/index/index?snumber=" +
              this.data.snumber.toUpperCase() +
              "&xf_plu=" +
              e.currentTarget.dataset.xf_plu +
              "&store=" +
              this.data.store +
              "&storename=" +
              this.data.storename,
          })
        : wx.navigateTo({
            url:
              "/pages/updnumber/index/index?snumber=" +
              this.data.snumber.toUpperCase() +
              "&xf_plu=" +
              e.currentTarget.dataset.xf_plu +
              "&store=" +
              this.data.store +
              "&storename=" +
              this.data.storename,
          });
  },
  onLoad: function (e) {},
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
});
