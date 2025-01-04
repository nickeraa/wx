var a = getApp(),
  t = require("../../../utils/util.js");
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    replu: {},
    index2: null,
    picker2: [],
    itemname: "",
    flag: !0,
    xf_plu: "",
    xf_desci: "",
    date: "2025-01-01",
    date2: "",
  },
  onLoad: function (a) {
    var e = t.formatDate(new Date());
    this.setData({ date2: e }),
      a.itemname &&
        (this.setData({ itemname: a.itemname }),
        console.log(this.data.itemname));
  },
  bindDateChange: function (a) {
    console.log(a.detail.value), this.setData({ date: a.detail.value });
  },
  bindDateChange2: function (a) {
    this.setData({ date2: a.detail.value });
  },
  back: function () {
    wx.switchTab({ url: "/pages/jzb/index/index" });
  },
  searchs: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_indexs.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), t.setData({ picker2: a.data });
      },
    });
  },
  bindPickerChange2: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index2: a.detail.value,
        itemname: this.data.picker2[a.detail.value].ITEMNAME,
        flag: !0,
      });
  },
  onShow: function () {
    this.searchs();
  },
  search: function (t) {
    console.log(this.data.itemname);
    var e = this;
    if (null == e.data.index2)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择查询项目",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_itemsum.ashx",
        data: {
          itemname: e.data.itemname,
          begindate: e.data.date,
          enddate: e.data.date2,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? e.setData({ replu: a.data, flag: !1 })
              : wx.showModal({
                  title: "提示",
                  content: "该项目暂没有数据",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm && e.setData({ flag: !0 });
                  },
                }),
            wx.hideLoading();
        },
      });
  },
});
