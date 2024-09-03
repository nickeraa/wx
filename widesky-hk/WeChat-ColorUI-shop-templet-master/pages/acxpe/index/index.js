var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    resultdt: {},
    replu: {},
    index2: null,
    picker2: [],
    itemname: "",
    current: 0,
    lines: 0,
    banner: a.globalData.imgUrl,
    sku: "",
    hkimgurl: a.globalData.hkimgUrl,
    flag: !0,
    tag: "",
    isChecked1: "",
    isChecked2: "",
  },
  onLoad: function (a) {
    a.itemname &&
      (this.setData({ itemname: a.itemname }), console.log(this.data.itemname));
  },
  seitemname: function (t) {
    console.log(t.currentTarget.dataset.title),
      this.setData({ tag: t.currentTarget.dataset.title }),
      "0" == this.data.tag
        ? this.setData({ isChecked1: !0, isChecked2: !1 })
        : "1" == this.data.tag &&
          this.setData({ isChecked2: !0, isChecked1: !1 });
    var e = this;
    wx.showLoading({ title: "正在加载" }),
      wx.request({
        url: a.globalData.api + "wx_searchsort.ashx",
        data: { itemname: e.data.itemname, tag: e.data.tag },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            wx.hideLoading({}),
            console.log(a.data.length),
            0 == a.data.length
              ? e.setData({ replu: null })
              : e.setData({ replu: a.data });
        },
      });
  },
  back: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  searchs: function () {
    var t = this;
    wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_index.ashx",
        data: {},
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            t.setData({ resultdt: e.data, picker2: e.data }),
            wx.request({
              url: a.globalData.api + "wx_searchitem.ashx",
              data: { itemname: t.data.itemname },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (a) {
                console.log(a), t.setData({ replu: a.data }), wx.hideLoading();
              },
            });
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
  sebanner: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_sebanner.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), t.setData({ resultdt: a.data });
      },
    });
  },
  onShow: function () {
    if ("1" == a.globalData.tt) return !1;
    var t = this;
    "" == t.data.itemname
      ? wx.request({
          url: a.globalData.api + "wx_index.ashx",
          data: {},
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (a) {
            console.log(a),
              console.log("ddddddddd"),
              t.setData({ picker2: a.data }),
              t.sebanner();
          },
        })
      : t.searchs();
  },
  listpe: function (a) {
    var t = a.currentTarget.dataset.xf_plu;
    wx.navigateTo({ url: "/pages/shopshd/goods/index?id=" + t });
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
    e.setData({ tag: "", isChecked1: !0, isChecked2: "" }),
      wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_searchitem.ashx",
        data: { itemname: e.data.itemname },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            wx.hideLoading(),
            a.data.length > 0
              ? e.setData({ replu: a.data, flag: !1 })
              : wx.showModal({
                  title: "提示",
                  content: "该项目没有提供配额的货品",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm && e.setData({ flag: !0 });
                  },
                });
        },
      });
  },
});
