var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    hidden: !0,
    resultdt: {},
    replu: {},
    current: 0,
    lines: 0,
    banner: a.globalData.imgUrl,
    sku: "",
    xf_plu: "",
    id: "",
    hkimgurl: a.globalData.hkimgUrl,
    itemname: "",
  },
  bindPickerChange2: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index2: a.detail.value,
        itemname: this.data.picker2[a.detail.value].ITEMNAME,
      });
  },
  onLoad: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_index.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), e.setData({ picker2: a.data });
      },
    });
  },
  select: function () {
    if ("" == this.data.itemname) wx.showToast({ title: "请选择查询项目" });
    else if ("" == this.data.sku)
      wx.showModal({
        title: "提示",
        content: "请输入货号或名称模糊查询",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      });
    else {
      var t = this;
      wx.request({
        url: a.globalData.api + "wx_search.ashx",
        data: { name: t.data.sku, itemname: t.data.itemname },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            0 == a.data.length
              ? wx.showModal({
                  title: "提示",
                  content: "没有数据！",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                })
              : t.setData({ replu: a.data });
        },
      });
    }
  },
  getsku: function (a) {
    this.setData({ sku: a.detail.value }), console.log(this.data.sku);
  },
  onShow: function () {
    var t = this;
    wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_index.ashx",
        data: {},
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a), t.setData({ resultdt: a.data }), wx.hideLoading();
        },
        complete: function () {},
      });
  },
  sesku: function (a) {
    var t = a.currentTarget.dataset.plu;
    wx.navigateTo({ url: "/pages/stock/index/index?id=" + t });
  },
  search: function (t) {
    var e = this;
    if ("" == e.data.sku)
      return (
        wx.showModal({
          title: "提示",
          content: "请输入货品编码",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    wx.request({
      url: a.globalData.api + "wx_search.ashx",
      data: { name: e.data.sku },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0
            ? e.setData({ replu: a.data })
            : wx.showModal({
                title: "提示",
                content: "配额系统不存在此货品",
                showCancel: !1,
                success: function (a) {
                  a.confirm;
                },
              });
      },
    });
  },
  onplu: function (a) {
    var t = a.currentTarget.dataset.plu;
    wx.navigateTo({ url: "/pages/tpys/goods/index?id=" + t });
  },
});
