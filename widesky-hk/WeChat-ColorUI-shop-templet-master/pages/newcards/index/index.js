var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    resultdt: {},
    replu: {},
    hkimgurl: a.globalData.hkimgUrl,
    vipcode: "",
    vipname: "",
    grade: "",
    store: "",
    xf_name: "",
    picker2: [],
    index2: null,
    vip_id: 0,
    storename: "",
    sex: "",
    staffcode: "",
    vipaddr: "",
    picker1: [
      { id: 1, name: "18岁以下" },
      { id: 2, name: "18岁-30岁" },
      { id: 3, name: "31岁-40岁" },
      { id: 4, name: "41岁-50岁" },
      { id: 5, name: "51岁-60岁" },
      { id: 6, name: "61岁-70岁" },
      { id: 7, name: "70岁以上" },
    ],
    index1: null,
    id: "",
    years: "",
  },
  bindPickerChange_hx: function (a) {
    console.log("picker发送选择改变，索引为", a.detail.value),
      this.setData({
        index1: a.detail.value,
        id: this.data.picker1[a.detail.value].id,
        years: this.data.picker1[a.detail.value].name,
      }),
      console.log("years为:", this.data.years);
  },
  getvipname: function (a) {
    this.setData({ vipname: a.detail.value });
  },
  getvipaddr: function (a) {
    this.setData({ vipaddr: a.detail.value });
  },
  getstaff: function (a) {
    this.setData({ staffcode: a.detail.value });
  },
  onLoad: function (e) {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_sestore.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), t.setData({ picker2: a.data });
      },
    });
  },
  radioChange: function (a) {
    console.log("radior发送选择改变，携带值为", a.detail.value),
      this.setData({ sex: a.detail.value });
  },
  bindPickerChange2: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index2: a.detail.value,
        store: this.data.picker2[a.detail.value].XF_STORECODE,
        storename: this.data.picker2[a.detail.value].XF_NAME,
      });
  },
  check: function () {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_checkyg.ashx",
        data: { userid: e.data.staffcode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? e.setData({ xf_name: a.data[0].XF_NAME })
              : (wx.showToast({ title: "员工科传ID不存在" }),
                e.setData({ xf_name: "" })),
            wx.hideLoading();
        },
      });
  },
  upnewvip: function () {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_upnewvips.ashx",
      data: {
        vipname: e.data.vipname,
        sex: e.data.sex,
        years: e.data.years,
        store: e.data.store,
        yguserid: e.data.staffcode,
        vipaddress: e.data.vipaddr,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "error" != a.data &&
            (e.setData({ vip_id: a.data }),
            console.log(e.data.vip_id),
            wx.navigateToMiniProgram({
              appId: "wx187fe5b10e271c63",
              path: "/pages/cards/index/index",
              extraData: { vip_id: e.data.vip_id, d: "" },
              envVersion: "release",
              success: function (a) {
                console.info(a);
              },
            }));
      },
    });
  },
  back: function () {
    wx.navigateTo({ url: "/pages/sendcard/index/index" });
  },
  onShow: function () {},
  fx: function () {
    return "" == this.data.vipname
      ? (wx.showToast({ title: "请输入会员姓名" }), !1)
      : "" == this.data.sex
      ? (wx.showToast({ title: "请选择会员性别" }), !1)
      : null == this.data.index1
      ? (wx.showToast({ title: "请选择客户年龄" }), !1)
      : null == this.data.index2
      ? (wx.showToast({ title: "请选择会员店铺" }), !1)
      : "" == this.data.xf_name
      ? (wx.showToast({ title: "请输入跟进员工科传ID" }), !1)
      : void this.upnewvip();
  },
});
