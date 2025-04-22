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
    banner: a.globalData.imgUrls,
    sku: "",
    stock: "",
    hkimgurl: a.globalData.hkimgUrl,
    scimgurl: a.globalData.scimgurl,
    select_all: !1,
    choseNames: "",
    flag: !0,
    vipcode: "",
    vipname: "",
    grade: "",
    store: "",
    xf_name: "",
    count: 0,
    slt: "",
    xf_users: "",
    fnumber:''
  },
  onLoad: function (a) {
    a.yguserid && wx.setStorageSync("yguserid", a.yguserid),
      console.log(wx.getStorageSync("yguserid"));
  },
  checkboxChange: function (a) {
    this.setData({ choseNames: a.detail.value }),
      console.log(this.data.choseNames);
  },
  selectall: function (a) {
    for (var t = [], e = 0; e < this.data.replu.length; e++)
      (this.data.replu[e].checked = !this.data.select_all),
        1 == this.data.replu[e].checked &&
          (t = t.concat(this.data.replu[e].XF_PLU.split(",")));
    this.setData({
      replu: this.data.replu,
      select_all: !this.data.select_all,
      choseNames: t,
    }),
      console.log(this.data.choseNames);
  },
  getvipcode: function (a) {
    this.setData({ vipcode: a.detail.value });
  },
  listvipcode: function () {
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_checkvip.ashx",
        data: { vipcode: t.data.vipcode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? t.setData({
                  vipname: a.data[0].XF_SURNAME,
                  grade: a.data[0].GRADE,
                  store: a.data[0].XF_STORES,
                  xf_name: a.data[0].XF_USERNAME,
                  xf_users: a.data[0].XF_USERS,
                })
              : (t.setData({ rejob: null }),
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
    var t = this;
    wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_cgindex.ashx",
        data: {},
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          t.setData({ resultdt: e.data, picker2: e.data }),
            wx.request({
              url: a.globalData.api + "wx_cgsearchitem.ashx",
              data: { itemname: t.data.itemname },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (a) {
                console.log(a.data),
                  t.setData({ replu: a.data, flag: !1 }),
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
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_secgbanner.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), t.setData({ resultdt: a.data });
      },
    });
  },
  delsku: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_cg_delsku.ashx",
      data: {
        xf_plu: t.currentTarget.dataset.xf_plu,
        userid: wx.getStorageSync("yguserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        "error" != a.data ? e.sesku() : wx.showToast({ title: "数据错误" });
      },
    });
  },
  sesku: function () {
    var t = Date.parse(new Date());
    t /= 1e3;
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_cglist.ashx",
      data: { userid: wx.getStorageSync("yguserid") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          e.setData({ replus: a.data }),
          a.data.length > 0 &&
            e.setData({
              xfname: a.data[0].XF_NAME,
              count: a.data.length,
              slt:
                e.data.scimgurl +
                a.data[0].XF_PLU +
                "/" +
                a.data[0].IMAGESSL +
                "?temp=" +
                t,
            });
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
    if (!wx.getStorageSync("yguserid"))
      return (
        wx.showModal({
          title: "提示",
          content: "没有登录账户，不能分享",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    var t = Date.parse(new Date());
    t /= 1e3;
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_cg_insku.ashx",
      data: {
        xf_plu: e.data.choseNames,
        userid: wx.getStorageSync("yguserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (s) {
        "error" != s.data
          ? wx.request({
              url: a.globalData.api + "wx_cglist.ashx",
              data: { userid: wx.getStorageSync("yguserid") },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (a) {
                e.setData({
                  replus: a.data,
                  xfname: a.data[0].XF_NAME,
                  count: a.data.length,
                  slt:
                    e.data.scimgurl +
                    a.data[0].XF_PLU +
                    "/" +
                    a.data[0].IMAGESSL +
                    "?temp=" +
                    t,
                });
              },
            })
          : wx.showToast({ title: "数据错误" });
      },
    });
  },
  search: function (t) {
    console.log(this.data.itemname);
    var e = this;
    if (null == e.data.index2)
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
    e.setData({ choseNames: [], select_all: !1 }),
      wx.request({
        url: a.globalData.api + "wx_cgsearchitem.ashx",
        data: { itemname: e.data.itemname },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a.data),
            a.data.length > 0
              ? (e.setData({ replu: a.data, flag: !1 }), e.sesku())
              : wx.showModal({
                  title: "提示",
                  content: "该系列暂没有货品",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm && e.setData({ replu: null, flag: !0 });
                  },
                });
        },
      });
  },
  onShow: function () {
    if ("1" == a.globalData.tt) return !1;
    this.setData({ choseNames: [] }), console.log(this.data.choseNames);
    var t = this;
    "" == t.data.itemname
      ? wx.request({
          url: a.globalData.api + "wx_cgindex.ashx",
          data: {},
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (a) {
            console.log(a), t.setData({ picker2: a.data }), t.sebanner();
          },
        })
      : t.searchs();
  },
  listpe: function (a) {
    var t = a.currentTarget.dataset.xf_plu;
    console.log(t),
      wx.navigateTo({ url: "/pages/shopcgs/goods/index?id=" + t });
  },
  checkzf: function () {
    return 0 == this.data.count
      ? (wx.showModal({
          title: "提示",
          content: "没有选择货品加入到分享包",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1)
      : "" == this.data.vipname
      ? (wx.showModal({
          title: "提示",
          content: "没有填写分享的会员卡号",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1)
      : this.data.xf_users == wx.getStorageSync("yguserid") ||
        (wx.showModal({
          title: "提示",
          content: "此客户跟进员工和登录员工不一致，不能分享",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1);
  },
  onShareAppMessage: function (a) {
    return (
      console.log(this.data.count),
      console.log(this.data.xf_users),
      console.log(this.data.vipname),
      console.log(this.checkzf()),
      this.checkzf()
        ? (console.log("pppppppp"),
          this.fx(),
          {
            title:
              "广天藏品 " +
              this.data.xfname +
              " 向您最新分享了：" +
              this.data.count +
              "款货品 ...",
            path:
              "/pages/homerm/index/index?vipcode=" +
              this.data.vipcode +"&fnumber="+this.data.fnumber+
              "&tj=1&yguserid=" +
              wx.getStorageSync("yguserid"),
            imageUrl: this.data.slt,
          })
        : (console.log("ddddd"), null)
    );
  },
  fx: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_fxitem.ashx",
      data: { userid: wx.getStorageSync("yguserid"), vipcode: t.data.vipcode },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        "error" != a.data
          ? (console.log("tttttttttt"),t.setData({fnumber:a.data}), t.sesku())
          : wx.showToast({ title: "数据错误" });
      },
    });
  },
  getsku: function (a) {
    this.setData({ sku: a.detail.value }), console.log(this.data.sku);
  },
  searchsku: function (t) {
    var e = this;
    if ((e.setData({ choseNames: [], select_all: !1 }), "" == e.data.sku))
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
      data: { sku: e.data.sku },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0
            ? (e.setData({ replu: a.data, flag: !1 }), e.sesku())
            : (e.setData({ flag: !0 }),
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
