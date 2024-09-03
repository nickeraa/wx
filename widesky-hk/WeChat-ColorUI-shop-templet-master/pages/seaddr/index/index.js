var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    snumber: "",
    result: {},
    index2: null,
    picker2: [],
    store: "",
    storename: "",
    body: "",
    phone: "",
    address1: "",
    address2: "",
    view: !0,
  },
  bindPickerChange2: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index2: a.detail.value,
        store: this.data.picker2[a.detail.value].XF_STORECODE,
        storename: this.data.picker2[a.detail.value].XF_NAME,
      });
  },
  getsnumber: function (a) {
    this.setData({ snumber: a.detail.value }), console.log(this.data.snumber);
  },
  checkinput: function (a) {
    null == this.data.index2
      ? wx.showToast({ title: "请输入登记店铺", icon: "none", duration: 1e3 })
      : "" == this.data.snumber
      ? wx.showToast({ title: "请输入销售单号", icon: "none", duration: 1e3 })
      : this.senumber();
  },
  select: function () {
    var a = getCurrentPages();
    a[a.length - 2].setData({
      shname: this.data.body,
      shphone: this.data.phone,
      shaddr: this.data.address1 + " " + this.data.address2,
    }),
      wx.navigateBack({ delta: 1 });
  },
  senumber: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_sescaddr.ashx",
      data: { snumber: e.data.snumber, store: e.data.store },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          0 == a.data.length
            ? wx.showModal({
                title: "提示",
                content: "没有收货地址",
                showCancel: !1,
                success: function (a) {
                  a.confirm && e.setData({ view: !0 });
                },
              })
            : e.setData({
                result: a.data,
                view: !1,
                body: a.data[0].BODY,
                phone: a.data[0].PHONE,
                address1: a.data[0].ADDRESS1,
                address2: a.data[0].ADDRESS2,
              });
      },
    });
  },
  onLoad: function (a) {},
  onShow: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_sestore.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), e.setData({ picker2: a.data });
      },
    });
  },
});
