var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    resultdt: {},
    replu: {},
    replus: {},
    index2: null,
    picker2: [],
    itemname: "",
    current: 0,
    lines: 0,
    banner: a.globalData.imgUrl,
    sku: "",
    stock: "",
    hkimgurl: a.globalData.hkimgUrl,
    select_all: !1,
    choseNames: "",
    flag: !0,
    vipcode: "",
    vipname: "",
    grade: "",
    store: "",
    xf_name: "",
    xf_users: "",
  },
  onLoad: function (a) {},
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
                  xf_users: a.data[0].XF_USERS,
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
  searchs: function () {
    var e = this;
    wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_cgindex.ashx",
        data: {},
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          e.setData({ resultdt: t.data, picker2: t.data }),
            wx.request({
              url: a.globalData.api + "wx_cgsearchitem.ashx",
              data: { itemname: e.data.itemname },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (a) {
                console.log(a.data),
                  e.setData({ replu: a.data, flag: !1 }),
                  wx.hideLoading();
              },
            });
        },
      });
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
  sebanner: function () {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_secgbanner.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), e.setData({ resultdt: a.data });
      },
    });
  },
  delsku: function (e) {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_cg_delsku.ashx",
      data: {
        xf_plu: e.currentTarget.dataset.xf_plu,
        userid: wx.getStorageSync("userid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        "error" != a.data ? t.sesku() : wx.showToast({ title: "数据错误" });
      },
    });
  },
  sesku: function () {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_cglist.ashx",
      data: { userid: wx.getStorageSync("userid") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        e.setData({ replus: a.data });
      },
    });
  },
  insku: function () {
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
      url: a.globalData.api + "wx_cg_insku.ashx",
      data: { xf_plu: e.data.choseNames, userid: wx.getStorageSync("userid") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        "error" != t.data
          ? wx.request({
              url: a.globalData.api + "wx_cglist.ashx",
              data: { userid: wx.getStorageSync("userid") },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (a) {
                e.setData({ replus: a.data });
              },
            })
          : wx.showToast({ title: "数据错误" });
      },
    });
  },
  search: function (e) {
    console.log(this.data.itemname);
    var t = this;
    if (null == t.data.index2)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择查询系列",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    t.setData({ choseNames: [], select_all: !1 }),
      wx.request({
        url: a.globalData.api + "wx_cgsearchitem.ashx",
        data: { itemname: t.data.itemname },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a.data),
            a.data.length > 0
              ? (t.setData({ replu: a.data, flag: !1 }), t.sesku())
              : wx.showModal({
                  title: "提示",
                  content: "该系列暂没有货品",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm && t.setData({ replu: null, flag: !0 });
                  },
                });
        },
      });
  },
  onShow: function () {
    if ("1" == a.globalData.tt) return !1;
    this.setData({ choseNames: [] }), console.log(this.data.choseNames);
    var e = this;
    "" == e.data.itemname
      ? wx.request({
          url: a.globalData.api + "wx_cgindex.ashx",
          data: {},
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (a) {
            console.log(a), e.setData({ picker2: a.data }), e.sebanner();
          },
        })
      : e.searchs();
  },
  listpe: function (a) {
    var e = a.currentTarget.dataset.xf_plu;
    console.log(e), wx.navigateTo({ url: "/pages/shopcg/goods/index?id=" + e });
  },
  fx: function () {
    if (0 == this.data.replus.length)
      return (
        wx.showModal({
          title: "提示",
          content: "没有选择货品加入到分享包",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.vipname)
      return (
        wx.showModal({
          title: "提示",
          content: "没有填写分享的会员卡号",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    if (this.data.xf_users != wx.getStorageSync("userid"))
      return (
        wx.showModal({
          title: "提示",
          content: "此客户跟进员工和登录账号不一致，不能分享",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    console.log(wx.getStorageSync("userid"));
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_fxitem.ashx",
      data: { userid: wx.getStorageSync("userid"), vipcode: e.data.vipcode },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        "error" != a.data
          ? wx.navigateToMiniProgram({
              appId: "wx187fe5b10e271c63",
              path: "/pages/home/index/index",
              extraData: {
                yguserid: wx.getStorageSync("userid"),
                vipcode: e.data.vipcode,
                d: "1",
              },
              envVersion: "release",
              success: function (a) {
                console.info(a);
              },
            })
          : wx.showToast({ title: "数据错误" });
      },
    });
  },
  getsku: function (a) {
    this.setData({ sku: a.detail.value }), console.log(this.data.sku);
  },
  searchsku: function (e) {
    var t = this;
    if ((t.setData({ choseNames: [], select_all: !1 }), "" == t.data.sku))
      return (
        wx.showModal({
          title: "提示",
          content: "请输入货品编码或货品名称",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    wx.request({
      url: a.globalData.api + "wx_cg_likesku.ashx",
      data: { sku: t.data.sku },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0
            ? (t.setData({ replu: a.data, flag: !1 }), t.sesku())
            : (t.setData({ flag: !0 }),
              wx.showModal({
                title: "提示",
                content: "商城系统不存在此货品",
                showCancel: !1,
                success: function (a) {
                  a.confirm;
                },
              }));
      },
    });
  },
});
