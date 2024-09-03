var t = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page({
  data: t(
    t(
      t(
        {
          StatusBar: e.globalData.StatusBar,
          CustomBar: e.globalData.CustomBar,
          TabbarBot: e.globalData.tabbar_bottom,
          TabCur: 0,
          scrollLeft: 0,
          rejob: {},
          xf_store: "",
          xf_plu: "",
          xf_qty: "",
          vipcode: "",
          vipname: "",
          xf_vicode: "",
          xf_surname: "",
          grade: "",
          xf_stores: "",
          xf_issuedate: "",
          xf_users: "",
          xf_username: "",
          xf_bonus: "",
          check: "true",
          check1: "true",
          setype: "",
          picker2: [],
          index2: null,
        },
        "xf_plu",
        ""
      ),
      "itemname",
      ""
    ),
    "userid",
    ""
  ),
  onLoad: function (t) {},
  back: function () {
    wx.navigateBack({ delta: 1 });
  },
  getxf_plu: function (t) {
    this.setData({ xf_plu: t.detail.value });
  },
  bindPickerChange2: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({
        index2: t.detail.value,
        itemname: this.data.picker2[t.detail.value].ITEMNAME,
      });
  },
  radioChange: function (t) {
    console.log("radior发送选择改变，携带值为", t.detail.value),
      this.setData({ setype: t.detail.value }),
      "0" == this.data.setype
        ? this.setData({ check: "", check1: "true" })
        : this.setData({ check1: "", check: "true" });
  },
  onShow: function (t) {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_cgindex.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          console.log("sdfsdfsdfsdfd"),
          a.setData({ picker2: t.data });
      },
    });
  },
  saleslist: function (t) {
    wx.navigateTo({
      url:
        "/pages/ahistorys/index/index?vipcode=" +
        t.currentTarget.dataset.xf_vipcode,
    });
  },
  checkinput: function () {
    "" == this.data.setype
      ? wx.showModal({
          title: "提示",
          content: "请选择查询方式！",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        })
      : "0" == this.data.setype
      ? this.vip_sort()
      : this.vip_sku();
  },
  vip_sort: function () {
    if (null == this.data.index2)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择查询系列",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: e.globalData.api + "wx_vipsort.ashx",
        data: {
          itemname: t.data.itemname,
          userid: wx.getStorageSync("userid"),
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0
              ? t.setData({ rejob: e.data })
              : (t.setData({ rejob: null }),
                wx.showModal({
                  title: "提示",
                  content: "没有客户浏览",
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
  vip_sku: function () {
    if ("" == this.data.xf_plu)
      return (
        wx.showModal({
          title: "提示",
          content: "请输入货号",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: e.globalData.api + "wx_vipsku.ashx",
        data: { xf_plu: t.data.xf_plu, userid: wx.getStorageSync("userid") },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0
              ? t.setData({ rejob: e.data })
              : (t.setData({ rejob: null }),
                wx.showModal({
                  title: "提示",
                  content: "没有客户浏览",
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
});
