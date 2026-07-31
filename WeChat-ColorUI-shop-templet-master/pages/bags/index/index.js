var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    replu: [],
    scimgurl: a.globalData.scimgurl,
    edit: "完成",
    is: !0,
    do: "删除",
    select_all: !1,
    choseNames: [],
    arrdata: [],
    id: "",
    xf_plu: "",
    issum: !0,
    sumprice: 0,
    flag: !0,
    miaosu: "会员实价",
    p: "",
    arrs: "",
  },
  onLoad: function () {},
  gm: function (a) {
    this.setData({ issum: !0, choseNames: [], is: !0, sumprice: 0 });
    var t = this.data.replu;
    for (var e = 0; e < t.length; e++) t[e].checked = !1;
    this.setData({ replu: t, select_all: !1 }),
      "完成" == this.data.edit
        ? this.setData({ edit: "编辑", do: "去结算" })
        : this.setData({ edit: "完成", do: "删除" });
  },
  checkboxChange: function (a) {
    var t = this;
    var replu = t.data.replu;
    var choseNames = a.detail.value;
    var isAll = replu && replu.length > 0 && choseNames.length === replu.length;
    this.setData({
      choseNames: choseNames,
      sumprice: "",
      select_all: isAll,
    }),
      "编辑" == this.data.edit && this.setData({ issum: !1 }),
      0 == this.data.choseNames.length
        ? this.setData({ is: !0, issum: !0 })
        : this.setData({ is: !1 });
    if ("编辑" == this.data.edit) {
      var s = 0;
      for (var e = 0; e < this.data.choseNames.length; e++) {
        var d = this.data.choseNames[e].replace("[", "").replace("]", "").split(","),
          n = parseFloat(d[1]).toFixed(3),
          h = parseInt(d[2]);
        s += n * h;
      }
      this.setData({ sumprice: parseFloat(s).toFixed(2) });
    }
  },
  selectall: function (a) {
    this.setData({ sumprice: 0, issum: !0 });
    var t = [],
      s = 0,
      e = this.data.replu;
    if (!e || !e.length)
      return void this.setData({ choseNames: t, select_all: !0, is: !0 });
    for (var d = 0; d < e.length; d++) {
      e[d].checked = !this.data.select_all;
      if (1 == e[d].checked) {
        t.push(e[d].XF_PLU + "," + e[d].REALPRICE + "," + e[d].QTY);
        if ("编辑" == this.data.edit) {
          var n = parseFloat(e[d].REALPRICE).toFixed(3),
            h = parseInt(e[d].QTY);
          s += parseFloat(n * h);
        }
      }
    }
    s > 0 && this.setData({ issum: !1 });
    this.setData({
      replu: e,
      select_all: !this.data.select_all,
      choseNames: t,
      sumprice: parseFloat(s).toFixed(2),
    }),
      0 == this.data.choseNames.length
        ? this.setData({ is: !0, sumprice: 0 })
        : this.setData({ is: !1 });
  },
  onShow: function () {
    this.setData({ select_all: !1, issum: !0, choseNames: [], sumprice: 0 }),
      wx.removeTabBarBadge({ index: 2 }),
      wx.setStorageSync("n", "0"),
      wx.setStorageSync("p", "");
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: "",
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        a.data.length > 0
          ? t.setData({ replu: a.data, flag: !0 })
          : t.setData({ replu: [], flag: !1 });
      },
      fail: function () {
        wx.showToast({ title: "加载失败，请下拉刷新", icon: "none", duration: 2000 });
      },
    });
  },
  shuaxin: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: "",
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        a.data.length > 0
          ? t.setData({ replu: a.data, flag: !0, sumprice: 0, is: !0 })
          : t.setData({
              replu: [],
              select_all: !1,
              is: !0,
              flag: !1,
              sumprice: 0,
            });
      },
      fail: function () {
        wx.showToast({ title: "刷新失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  go: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  jian: function (t) {
    this.setData({ id: t.currentTarget.dataset.index });
    var e = this.data.replu[this.data.id].XF_PLU;
    if (
      ("编辑" == this.data.edit &&
        ((this.data.replu[this.data.id].checked = !1),
        this.setData({ is: !0, issum: !0 })),
      "1" == this.data.replu[this.data.id].QTY)
    )
      return void wx.showToast({ title: "该商品1件起售哦" });
    var s = this;
    wx.request({
      url: a.globalData.api + "wx_jiansku.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: s.data.replu[s.data.id].XF_PLU,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        "error" != a.data
          ? "编辑" == s.data.edit
            ? (s.setData({
                sumprice:
                  s.data.sumprice -
                  1 * parseInt(s.data.replu[s.data.id].REALPRICE),
              }),
              (s.data.replu[s.data.id].QTY =
                parseInt(s.data.replu[s.data.id].QTY) - 1),
              s.setData({ replu: s.data.replu }))
            : s.shuaxin()
          : wx.showToast({ title: "数据出错" });
      },
      fail: function () {
        wx.showToast({ title: "操作失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/shopcg/goods/index?xf_plu=" + a.currentTarget.dataset.xf_plu,
    });
  },
  jia: function (t) {
    this.setData({ id: t.currentTarget.dataset.index });
    var e = this.data.replu[this.data.id].XF_PLU;
    "编辑" == this.data.edit &&
      ((this.data.replu[this.data.id].checked = !1),
      this.setData({ is: !0, issum: !0 }));
    var s = this;
    wx.request({
      url: a.globalData.api + "wx_insertsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: s.data.replu[s.data.id].XF_PLU,
        qty: "1",
        fxuserid: wx.getStorageSync("fxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        "ok" == a.data
          ? (s.setData({
              sumprice:
                s.data.sumprice +
                1 * parseInt(s.data.replu[s.data.id].REALPRICE),
            }),
            (s.data.replu[s.data.id].QTY =
              parseInt(s.data.replu[s.data.id].QTY) + 1),
            s.setData({ replu: s.data.replu }))
          : wx.showToast({ title: "数据出错" });
      },
      fail: function () {
        wx.showToast({ title: "操作失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  seid: function (a) {
    this.setData({
      id: a.currentTarget.dataset.index,
      xf_plu: a.currentTarget.dataset.title,
    });
  },
  del: function (a) {
    if ("去结算" == this.data.do) {
      if (!this.data.choseNames || 0 == this.data.choseNames.length)
        return void wx.showToast({ title: "请先选择商品", icon: "none" });
      wx.navigateTo({
        url: "/pages/depositgwc/index/index?xf_plu=" + this.data.choseNames,
      });
    } else {
      this.delsku();
    }
  },
  delsku: function (t) {
    var e = this;
    wx.showLoading({ title: "正在加载" });
    wx.request({
      url: a.globalData.api + "wx_delsku.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        xf_plu: e.data.choseNames,
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        wx.hideLoading(),
          "error" != a.data
            ? e.shuaxin()
            : wx.showToast({ title: "数据错误" });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "删除失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
});
