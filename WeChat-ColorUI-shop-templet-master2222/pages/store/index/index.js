var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    dpid: "",
    replu: {},
    address1: "",
    address2: "",
    telphone: "",
    id: "",
    xf_storecode: "",
    checked: "",
  },
  back: function () {
    wx.navigateBack({ delta: 0 });
  },
  checkboxChange: function (t) {
    this.setData({
      address1: t.currentTarget.dataset.address1,
      address2: t.currentTarget.dataset.address2,
      telphone: t.currentTarget.dataset.telphone,
      id: t.currentTarget.dataset.id,
      xf_storecode: t.currentTarget.dataset.xf_storecode,
      checked: t.currentTarget.dataset.checked,
    }),
      console.log(t.currentTarget.dataset.telphone);
    var a = getCurrentPages(),
      e = a[a.length - 2];
    e.setData({
      dpid: this.data.id,
      address1: this.data.address1,
      address2: this.data.address2,
      telphone: this.data.telphone,
    }),
      t.currentTarget.dataset.xf_storecode == t.currentTarget.dataset.checked
        ? e.setData({ fg: 1 })
        : e.setData({ fg: 0 }),
      wx.navigateBack({ delta: 1 });
  },
  onLoad: function (t) {
    t.dpid && this.setData({ dpid: t.dpid }), console.log(this.data.dpid);
  },
  onShow: function () {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_allstore.ashx",
      data: { vipcode: wx.getStorageSync("vipcode") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t.data),
          t.data.length > 0
            ? a.setData({ replu: t.data })
            : a.setData({ replu: null });
      },
    });
  },
});
