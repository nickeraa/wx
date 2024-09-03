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
    select_all: !1,
    choseNames: "",
    flag: !0,
    vipcode: "",
    vipname: "",
    grade: "",
    store: "",
    xf_name: "",
  },
  onLoad: function (a) {
    a.itemname &&
      (this.setData({ itemname: a.itemname }), console.log(this.data.itemname));
  },
  checkboxChange: function (a) {
    this.setData({ choseNames: a.detail.value }),
      console.log(this.data.choseNames);
  },
  selectall: function (a) {
    for (var e = [], t = 0; t < this.data.replu.length; t++)
      (this.data.replu[t].checked = !this.data.select_all),
        1 == this.data.replu[t].checked &&
          (e = e.concat(this.data.replu[t].XF_PLU.split(",")));
    this.setData({
      replu: this.data.replu,
      select_all: !this.data.select_all,
      choseNames: e,
    }),
      console.log(this.data.choseNames);
  },
  getvipcode: function (a) {
    this.setData({ vipcode: a.detail.value });
  },
  listvipcode: function () {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_checkvip.ashx",
        data: { vipcode: e.data.vipcode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? e.setData({
                  vipname: a.data[0].XF_SURNAME,
                  grade: a.data[0].GRADE,
                  store: a.data[0].XF_STORES,
                  xf_name: a.data[0].XF_USERNAME,
                })
              : (e.setData({ rejob: null }),
                wx.showModal({
                  title: "提示",
                  content: "卡号不存在或输入错误",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                })),
            wx.hideLoading();
        },
      });
  },
  back: function () {
    wx.switchTab({ url: "/pages/jzb/index/index" });
  },
  listvip: function () {
    wx.navigateTo({ url: "/pages/vipss/index/index" });
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
    if ("1" == a.globalData.tt) return !1;
    this.setData({ choseNames: [] }), console.log(this.data.choseNames);
  },
  listpe: function (a) {
    var e = a.currentTarget.dataset.xf_plu;
    console.log(e), wx.navigateTo({ url: "/pages/shopcg/goods/index?id=" + e });
  },
  fx: function () {
    if ("" == this.data.vipname)
      return (
        wx.showModal({
          title: "提示",
          content: "没有输入会员卡号",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    this.setData({ flag: !1, choseNames: [], select_all: !1 });
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_fxpage.ashx",
      data: { userid: wx.getStorageSync("userid"), vipcode: e.data.vipcode },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data), e.setData({ replu: a.data });
      },
    });
  },
  del: function () {
    if (0 == this.data.choseNames.length)
      return (
        wx.showModal({
          title: "提示",
          content: "没有勾选货品",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_delfx.ashx",
      data: {
        xf_plu: e.data.choseNames,
        userid: wx.getStorageSync("userid"),
        vipcode: e.data.vipcode,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          "error" == a.data
            ? wx.showModal({
                title: "提示",
                content: "数据错误",
                showCancel: !1,
                success: function (a) {
                  a.confirm;
                },
              })
            : e.fx();
      },
    });
  },
});
