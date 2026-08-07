var app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    replu: [],
    scimgurl: app.globalData.scimgurl,
    edit: "完成",
    is: !0,
    do: "删除",
    select_all: !1,
    choseNames: [],
    arrdata: [],
    id: "",
    issum: !0,
    sumprice: 0,
    flag: !0,
    miaosu: "会员实价",
    p: "",
    arrs: "",
  },
  gm: function () {
    this.setData({ issum: !0, choseNames: [], is: !0, sumprice: 0 });
    var t = this.data.replu;
    for (var e = 0; e < t.length; e++) t[e].checked = !1;
    this.setData({ replu: t, select_all: !1 }),
      "完成" == this.data.edit
        ? this.setData({ edit: "编辑", do: "去结算" })
        : this.setData({ edit: "完成", do: "删除" });
  },
  checkboxChange: function (e) {
    var replu = this.data.replu;
    var choseNames = e.detail.value;
    for (var i = 0; i < replu.length; i++) {
      var itemValue = replu[i].XF_PLU + "," + replu[i].REALPRICE + "," + replu[i].QTY;
      replu[i].checked = choseNames.indexOf(itemValue) !== -1;
    }
    var isAll = replu && replu.length > 0 && choseNames.length === replu.length;
    var isEdit = "编辑" == this.data.edit;
    this.setData({
      replu: replu,
      choseNames: choseNames,
      sumprice: 0,
      select_all: isAll,
    });
    if (isEdit) this.setData({ issum: !1 });
    0 == choseNames.length
      ? this.setData({ is: !0, issum: !0 })
      : this.setData({ is: !1 });
    if (isEdit && choseNames.length > 0) {
      var s = 0;
      for (var d = 0; d < choseNames.length; d++) {
        var p = choseNames[d].split(","),
          n = parseFloat(p[1]) || 0,
          h = parseInt(p[2]) || 0;
        s += n * h;
      }
      this.setData({ sumprice: parseFloat(s).toFixed(2) });
    }
  },
  selectall: function () {
    var e = this.data.replu;
    if (!e || !e.length)
      return void this.setData({ choseNames: [], select_all: !1, is: !0, sumprice: 0 });
    var t = [],
      s = 0,
      isEdit = "编辑" == this.data.edit;
    this.setData({ sumprice: 0, issum: !0 });
    for (var d = 0; d < e.length; d++) {
      e[d].checked = !this.data.select_all;
      if (e[d].checked) {
        t.push(e[d].XF_PLU + "," + e[d].REALPRICE + "," + e[d].QTY);
        if (isEdit) {
          var n = parseFloat(e[d].REALPRICE) || 0,
            h = parseInt(e[d].QTY) || 0;
          s += n * h;
        }
      }
    }
    var newData = {
      replu: e,
      select_all: !this.data.select_all,
      choseNames: t,
      sumprice: 0,
    };
    if (isEdit && t.length > 0) {
      newData.sumprice = parseFloat(s).toFixed(2);
      newData.issum = !1;
    }
    this.setData(newData);
    0 == t.length
      ? this.setData({ is: !0, sumprice: 0 })
      : this.setData({ is: !1 });
  },
  onShow: function () {
    this.setData({ select_all: !1, issum: !0, choseNames: [], sumprice: 0, _stockChecking: !1 }),
      wx.removeTabBarBadge({ index: 2 }),
      wx.setStorageSync("n", "0"),
      wx.setStorageSync("p", "");
    var t = this;
    wx.request({
      url: app.globalData.api + "wx_listsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: "",
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        Array.isArray(res.data) && res.data.length > 0
          ? t.setData({ replu: res.data, flag: !0 })
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
      url: app.globalData.api + "wx_listsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: "",
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        Array.isArray(res.data) && res.data.length > 0
          ? t.setData({
              replu: res.data,
              flag: !0,
              sumprice: 0,
              is: !0,
              select_all: !1,
              choseNames: [],
              issum: !0,
            })
          : t.setData({
              replu: [],
              select_all: !1,
              is: !0,
              flag: !1,
              sumprice: 0,
              choseNames: [],
              issum: !0,
            });
      },
      fail: function () {
        t.setData({
          replu: [],
          flag: !1,
          select_all: !1,
          choseNames: [],
          issum: !0,
          sumprice: 0,
        });
        wx.showToast({ title: "刷新失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  go: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  jian: function (t) {
    var r = this.data.replu;
    if (!r || !r.length) return;
    var idx = t.currentTarget.dataset.index;
    var e = r[idx];
    if (!e) return;
    if ("1" == e.QTY)
      return void wx.showToast({ title: "该商品1件起售哦", icon: "none" });
    var s = this;
    wx.request({
      url: app.globalData.api + "wx_jiansku.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: e.XF_PLU,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (null == res.data) {
          wx.showToast({ title: "数据出错", icon: "none" });
          return;
        }
        if ("error" != res.data) {
          var newQty = parseInt(e.QTY) - 1;
          var updateData = {};
          updateData["replu[" + idx + "].QTY"] = newQty;
          // 同步 choseNames 中的 qty，避免脏数据
          var synced = s.data.choseNames.map(function (cn) {
            var p = cn.split(",");
            if (p[0] === e.XF_PLU) { p[2] = String(newQty); return p.join(","); }
            return cn;
          });
          updateData.choseNames = synced;
          if ("编辑" == s.data.edit && s.data.choseNames.length > 0) {
            var sum = 0;
            s.data.replu.forEach(function (item, i) {
              if (item.checked) {
                var itemQty = i == idx ? newQty : (parseInt(item.QTY) || 0);
                sum += (parseFloat(item.REALPRICE) || 0) * itemQty;
              }
            });
            updateData.sumprice = parseFloat(sum).toFixed(2);
            updateData.is = !1;
          }
          s.setData(updateData);
        } else {
          wx.showToast({ title: "数据出错", icon: "none" });
        }
      },
      fail: function () {
        wx.showToast({ title: "操作失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  selectsku: function (e) {
    wx.navigateTo({
      url: "/pages/shopcg/goods/index?xf_plu=" + encodeURIComponent(e.currentTarget.dataset.xf_plu),
    });
  },
  jia: function (t) {
    var r = this.data.replu;
    if (!r || !r.length) return;
    var idx = t.currentTarget.dataset.index;
    var e = r[idx];
    if (!e) return;
    // 如果接口返回了库存字段，则校验上限
    if (e.XSTOCK !== undefined && e.XSTOCK !== null) {
      var stock = parseInt(e.XSTOCK) || 0;
      if (stock > 0 && parseInt(e.QTY) + 1 > stock) {
        wx.showToast({ title: "超出库存数量", icon: "none" });
        return;
      }
    }
    var s = this;
    wx.request({
      url: app.globalData.api + "wx_insertsc.ashx",
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
      success: function (res) {
        if (null == res.data) {
          wx.showToast({ title: "数据出错", icon: "none" });
          return;
        }
        if ("ok" == res.data) {
          var newQty = parseInt(e.QTY) + 1;
          var updateData = {};
          updateData["replu[" + idx + "].QTY"] = newQty;
          // 同步 choseNames 中的 qty，避免脏数据
          var synced = s.data.choseNames.map(function (cn) {
            var p = cn.split(",");
            if (p[0] === e.XF_PLU) { p[2] = String(newQty); return p.join(","); }
            return cn;
          });
          updateData.choseNames = synced;
          if ("编辑" == s.data.edit && s.data.choseNames.length > 0) {
            var sum = 0;
            s.data.replu.forEach(function (item, i) {
              if (item.checked) {
                var itemQty = i == idx ? newQty : (parseInt(item.QTY) || 0);
                sum += (parseFloat(item.REALPRICE) || 0) * itemQty;
              }
            });
            updateData.sumprice = parseFloat(sum).toFixed(2);
            updateData.is = !1;
          }
          s.setData(updateData);
        } else {
          wx.showToast({ title: "数据出错", icon: "none" });
        }
      },
      fail: function () {
        wx.showToast({ title: "操作失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
  del: function () {
    if (this.data._stockChecking) return;
    if ("去结算" == this.data.do) {
      var t = this;
      var choseNames = t.data.choseNames;
      if (!choseNames || 0 == choseNames.length) {
        wx.showToast({ title: "请先选择商品", icon: "none" });
        return;
      }
      // 从 choseNames 提取 PLU，从 replu 取实时 QTY（choseNames 中 qty 可能已过期）
      var items = [];
      var parseErr = [];
      for (var i = 0; i < choseNames.length; i++) {
        var parts = choseNames[i].split(",");
        var plu = parts[0];
        if (!plu) {
          parseErr.push("商品编号缺失（索引" + i + "）");
          continue;
        }
        // 在 replu 中查找当前商品的实时数量
        var qty = 0;
        for (var j = 0; j < t.data.replu.length; j++) {
          if (t.data.replu[j].XF_PLU === plu) {
            qty = parseInt(t.data.replu[j].QTY) || 0;
            break;
          }
        }
        if (qty <= 0) {
          parseErr.push("货品" + plu + "数量异常，请重新选择");
          continue;
        }
        items.push({ xf_plu: plu, qty: qty });
      }
      if (parseErr.length > 0) {
        wx.showModal({ title: "提示", content: parseErr.join("\n"), showCancel: !1 });
        return;
      }
      if (items.length === 0) {
        wx.showToast({ title: "请先选择有效商品", icon: "none" });
        return;
      }
      // 并发检查库存
      this.setData({ _stockChecking: !0 });
      wx.showLoading({ title: "检查库存中...", mask: !0 });
      var checked = 0,
        allPassed = !0,
        errList = [];
      items.forEach(function (e) {
        wx.request({
          url: app.globalData.api + "wx_checkxstock.ashx",
          data: { xf_plu: e.xf_plu },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          timeout: 10000,
          success: function (r) {
            // 后端对零库存商品返回空数据，统一按库存为 0 处理
            var stock = 0;
            if (r.data && Array.isArray(r.data) && r.data.length > 0 && r.data[0]) {
              stock = parseInt(r.data[0].XSTOCK);
              if (isNaN(stock)) stock = 0;
            }
            if (stock < e.qty) {
              allPassed = !1;
              errList.push(
                stock <= 0
                  ? "货品" + e.xf_plu + "已售完，数量为零"
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
              t.setData({ _stockChecking: !1 });
              if (allPassed) {
                var pluList = items.map(function (it) { return it.xf_plu; }).join(",");
                // 不做 encodeURIComponent：微信 onLoad 不会自动解码，会导致后端收到双重编码值
                wx.navigateTo({
                  url: "/pages/depositgwc/index/index?xf_plu=" + pluList,
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
    var xfPluList = e.data.choseNames.map(function (item) {
      var parts = item.split(",");
      return parts[0];
    }).join(",");
    wx.showLoading({ title: "正在加载" });
    wx.request({
      url: app.globalData.api + "wx_delsku.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        xf_plu: xfPluList,
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        wx.hideLoading();
        if (null == res.data) {
          wx.showToast({ title: "数据错误", icon: "none" });
          return;
        }
        "error" != res.data
          ? e.shuaxin()
          : wx.showToast({ title: "数据错误", icon: "none" });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "删除失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },
});
