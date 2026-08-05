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
  gm: function () {
    this.setData({ issum: !0, choseNames: [] });
    var t = this.data.replu;
    if (!t || !t.length) return;
    for (var e = 0; e < t.length; e++) t[e].checked = !1;
    this.setData({ replu: t, select_all: !1 }),
      "完成" == this.data.edit
        ? (this.setData({ edit: "编辑", do: "去结算" }),
          0 == this.data.choseNames.length
            ? this.setData({ is: !0 })
            : this.setData({ is: !1 }))
        : (this.setData({ edit: "完成", do: "删除" }),
          0 == this.data.choseNames.length
            ? this.setData({ is: !0 })
            : this.setData({ is: !1 }));
  },
  checkboxChange: function (a) {
    var replu = this.data.replu;
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
      "" == this.data.sumprice && this.setData({ sumprice: 0 });
      for (var t = 0; t < this.data.choseNames.length; t++) {
        var e = parseFloat(
            this.data.choseNames[t]
              .replace("[", "")
              .replace("]", "")
              .split(",")[1]
          ).toFixed(3),
          s = parseInt(
            this.data.choseNames[t]
              .replace("[", "")
              .replace("]", "")
              .split(",")[2]
          );
        this.setData({ sumprice: this.data.sumprice + e * s });
      }
      this.setData({ sumprice: parseFloat(this.data.sumprice).toFixed(2) });
    }
  },
  selectall: function () {
    if (!this.data.replu || !this.data.replu.length) return;
    this.setData({ sumprice: 0, issum: !0 });
    for (var t = [], e = 0; e < this.data.replu.length; e++) {
      this.data.replu[e].checked = !this.data.select_all;
      if (1 == this.data.replu[e].checked) {
        t = t.concat(
          this.data.replu[e].XF_PLU +
            "," +
            this.data.replu[e].REALPRICE +
            "," +
            this.data.replu[e].QTY
        );
        if ("编辑" == this.data.edit) {
          var s = parseFloat(this.data.replu[e].REALPRICE).toFixed(3),
            i = parseInt(this.data.replu[e].QTY);
          this.setData({
            sumprice: parseFloat(
              parseFloat(this.data.sumprice) + parseFloat(s * i)
            ).toFixed(2),
            issum: !1,
          });
        }
      }
    }
    this.setData({
      replu: this.data.replu,
      select_all: !this.data.select_all,
      choseNames: t,
    }),
      0 == this.data.choseNames.length
        ? this.setData({ is: !0, sumprice: 0 })
        : this.setData({ is: !1 });
  },
  onShow: function () {
    this.setData({ select_all: !1, issum: !0, choseNames: [] }),
      wx.removeTabBarBadge({ index: 3 }),
      wx.setStorageSync("n", "0"),
      wx.setStorageSync("p", "");
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: "",
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        a.data && a.data.length > 0
          ? t.setData({ replu: a.data, flag: !0 })
          : t.setData({ replu: [], flag: !1 });
      },
      fail: function () {
        t.setData({ replu: [], flag: !1 });
      },
    });
  },
  shuaxin: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: "",
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        a.data && a.data.length > 0
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
        t.setData({ replu: [], flag: !1 });
      },
    });
  },
  go: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  jian: function (t) {
    var r = this.data.replu;
    if (!r || !r.length) return;
    this.setData({ id: t.currentTarget.dataset.index });
    var e = r[this.data.id];
    if (!e) return;
    if (
      ("编辑" == this.data.edit &&
        ((e.checked = !1),
        this.setData({ is: !0, issum: !0 })),
      "1" == e.QTY)
    )
      return wx.showToast({ title: "该商品1件起订哦", icon: "none" }), !1;
    var s = this;
    wx.request({
      url: a.globalData.api + "wx_jianskuyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: e.XF_PLU,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        "error" != a.data
          ? "编辑" == s.data.edit
            ? (s.setData({
                sumprice:
                  s.data.sumprice - 1 * parseInt(e.REALPRICE),
              }),
              (e.QTY = parseInt(e.QTY) - 1),
              s.setData({ replu: s.data.replu }))
            : s.shuaxin()
          : wx.showToast({ title: "数据出错", icon: "none" });
      },
      fail: function () {
        wx.showToast({ title: "操作失败", icon: "none", duration: 1500 });
      },
    });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/ydshop/index?xf_plu=" + a.currentTarget.dataset.xf_plu,
    });
  },
  jia: function (t) {
    var r = this.data.replu;
    if (!r || !r.length) return;
    this.setData({ id: t.currentTarget.dataset.index });
    var e = r[this.data.id];
    if (!e) return;
    "编辑" == this.data.edit &&
      ((e.checked = !1),
      this.setData({ is: !0, issum: !0 }));
    var s = this;
    wx.request({
      url: a.globalData.api + "wx_insertyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: e.XF_PLU,
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
                s.data.sumprice + 1 * parseInt(e.REALPRICE),
            }),
            (e.QTY = parseInt(e.QTY) + 1),
            s.setData({ replu: s.data.replu }))
          : wx.showToast({ title: "数据出错", icon: "none" });
      },
      fail: function () {
        wx.showToast({ title: "操作失败", icon: "none", duration: 1500 });
      },
    });
  },
  seid: function (a) {
    this.setData({
      id: a.currentTarget.dataset.index,
      xf_plu: a.currentTarget.dataset.title,
    });
  },
  del: function () {
    if ("去结算" == this.data.do) {
      var t = this;
      var choseNames = t.data.choseNames;
      if (!choseNames || 0 == choseNames.length) {
        wx.showToast({ title: "请先选择商品", icon: "none" });
        return;
      }
      // 解析选中商品，提取 XF_PLU 和下单 QTY
      var items = [];
      for (var i = 0; i < choseNames.length; i++) {
        var parts = choseNames[i].replace("[", "").replace("]", "").split(",");
        items.push({ xf_plu: parts[0], qty: parseInt(parts[2]) || 0 });
      }
      // 并发检查库存
      wx.showLoading({ title: "检查库存中...", mask: !0 });
      var checked = 0,
        allPassed = !0,
        errList = [];
      items.forEach(function (e) {
        wx.request({
          url: a.globalData.api + "wx_checkxstock.ashx",
          data: { xf_plu: e.xf_plu },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          timeout: 10000,
          success: function (r) {
            var stock = 0;
            if (r.data && Array.isArray(r.data) && r.data.length > 0 && r.data[0])
              stock = parseInt(r.data[0].XSTOCK) || 0;
            if (stock < e.qty) {
              allPassed = !1;
              errList.push(
                stock <= 0
                  ? "货品" + e.xf_plu + "已订完，数量为零"
                  : "货品" + e.xf_plu + "库存不足，仅剩" + stock + "件"
              );
            }
          },
          fail: function () {
            allPassed = !1;
            errList.push("货品" + e.xf_plu + "查询失败");
          },
          complete: function () {
            checked++;
            if (checked >= items.length) {
              wx.hideLoading();
              if (allPassed) {
                wx.navigateTo({
                  url: "/pages/depositgwcyd/index/index?xf_plu=" + t.data.choseNames,
                });
              } else {
                wx.showModal({
                  title: "提示",
                  content: errList.join("\n"),
                  showCancel: !1,
                });
              }
            }
          },
        });
      });
    } else {
      this.delsku();
    }
  },
  delsku: function () {
    if (!this.data.choseNames || 0 == this.data.choseNames.length) {
      wx.showToast({ title: "请先选择商品", icon: "none" });
      return;
    }
    var e = this;
    wx.showLoading({ title: "正在加载" });
    wx.request({
      url: a.globalData.api + "wx_delskuyd.ashx",
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
            : wx.showToast({ title: "数据错误", icon: "none" });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "删除失败", icon: "none", duration: 1500 });
      },
    });
  },
});
