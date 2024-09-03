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
    storename: "",
    sex: "",
    staffcode: "",
    vipaddr: "",
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
  checkvipcode: function () {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_checkvipcode.ashx",
        data: { xf_name: e.data.vipname, xf_storecode: e.data.store },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            0 == a.data.length
              ? e.listvipcode()
              : wx.showModal({
                  title: "错误",
                  content: "同一个店铺当天存在相同姓名的重复会员卡",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                }),
            wx.hideLoading();
        },
      });
  },
  listvipcode: function () {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_checknewvip.ashx",
        data: {},
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? (e.setData({ vipcode: a.data[0].MIN_VIPCODE }), e.upnewvip())
              : wx.showToast({ title: "没有新会员卡" }),
            wx.hideLoading();
        },
      });
  },
  upnewvip: function () {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_upnewvip.ashx",
      data: {
        vipcode: e.data.vipcode,
        vipname: e.data.vipname,
        sex: e.data.sex,
        store: e.data.store,
        yguserid: e.data.staffcode,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        if ((console.log(a), "error" != a.data)) {
          if (!e.data.vipcode)
            return (
              wx.showModal({
                title: "提示",
                content: "会员卡已用完，请联系后台客户组！",
                showCancel: !1,
                success: function (a) {
                  a.confirm;
                },
              }),
              !1
            );
          wx.showModal({
            title: "提示",
            content: "创建成功！新会员卡号：" + e.data.vipcode,
            showCancel: !1,
            success: function (a) {
              a.confirm &&
                wx.navigateToMiniProgram({
                  appId: "wx187fe5b10e271c63",
                  path: "/pages/card/index/index",
                  extraData: {
                    yguserid: wx.getStorageSync("userid"),
                    vipcode: e.data.vipcode,
                    d: "",
                  },
                  envVersion: "release",
                  success: function (a) {
                    console.info(a);
                  },
                });
            },
          });
        } else
          wx.showModal({
            title: "提示",
            content: "创建延时，请点击确认继续",
            showCancel: !1,
            success: function (a) {
              a.confirm && e.upnewvip();
            },
          });
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
      : null == this.data.index2
      ? (wx.showToast({ title: "请选择会员店铺" }), !1)
      : "" == this.data.xf_name
      ? (wx.showToast({ title: "请输入跟进员工科传ID" }), !1)
      : void this.checkvipcode();
  },
});
