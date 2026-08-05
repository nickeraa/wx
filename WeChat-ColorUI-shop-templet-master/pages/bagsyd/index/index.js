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
    xf_plu: "",
    issum: !0,
    sumprice: 0,
    flag: !0,
    miaosu: "会员实价",
    p: "",
    arrs: "",
  },
  gm: function () {
    this.setData({ issum: !0, choseNames: [] });
    var t = this.data.replu;
    if (!t || !t.length) return;
    for (var e = 0; e < t.length; e++) t[e].checked = !1;
    var isEdit = "完成" == this.data.edit;
    this.setData({
      replu: t,
      select_all: !1,
      edit: isEdit ? "编辑" : "完成",
      do: isEdit ? "去结算" : "删除",
      is: !0,
    });
  },
  checkboxChange: function (e) {
    var replu = this.data.replu;
    var choseNames = e.detail.value;
    var isAll = replu && replu.length > 0 && choseNames.length === replu.length;
    var isEdit = "编辑" == this.data.edit;
    var updateData = {
      choseNames: choseNames,
      sumprice: 0,
      select_all: isAll,
    };
    if (isEdit) updateData.issum = !1;
    0 == choseNames.length
      ? (updateData.is = !0, updateData.issum = !0)
      : (updateData.is = !1);
    if (isEdit && choseNames.length > 0) {
      var sum = 0;
      for (var t = 0; t < choseNames.length; t++) {
        var parts = choseNames[t].replace("[", "").replace("]", "").split(",");
        sum += (parseFloat(parts[1]) || 0) * (parseInt(parts[2]) || 0);
      }
      updateData.sumprice = parseFloat(sum).toFixed(2);
    }
    this.setData(updateData);
  },
  selectall: function () {
    if (!this.data.replu || !this.data.replu.length) return;
    var sum = 0;
    var isEdit = "编辑" == this.data.edit;
    this.setData({ sumprice: 0, issum: !0 });
    for (var t = [], e = 0; e < this.data.replu.length; e++) {
      this.data.replu[e].checked = !this.data.select_all;
      if (this.data.replu[e].checked) {
        t.push(
          this.data.replu[e].XF_PLU +
            "," +
            this.data.replu[e].REALPRICE +
            "," +
            this.data.replu[e].QTY
        );
        if (isEdit) {
          var unitPrice = parseFloat(this.data.replu[e].REALPRICE) || 0;
          var qty = parseInt(this.data.replu[e].QTY) || 0;
          sum += unitPrice * qty;
        }
      }
    }
    var newData = {
      replu: this.data.replu,
      select_all: !this.data.select_all,
      choseNames: t,
    };
    if (isEdit && t.length > 0) {
      newData.sumprice = parseFloat(sum).toFixed(2);
      newData.issum = !1;
    }
    this.setData(newData);
    0 == t.length
      ? this.setData({ is: !0, sumprice: 0 })
      : this.setData({ is: !1 });
  },
  onShow: function () {
    this.setData({ select_all: !1, issum: !0, choseNames: [], _stockChecking: !1 }),
      wx.removeTabBarBadge({ index: 3 }),
      wx.setStorageSync("n", "0"),
      wx.setStorageSync("p", "");
    var t = this;
    wx.request({
      url: app.globalData.api + "wx_listyd.ashx",
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
      url: app.globalData.api + "wx_listyd.ashx",
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
          ? t.setData({
              replu: a.data,
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
      return wx.showToast({ title: "该商品1件起订哦", icon: "none" }), !1;
    var s = this;
    wx.request({
      url: app.globalData.api + "wx_jianskuyd.ashx",
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
            var p = cn.replace("[", "").replace("]", "").split(",");
            if (p[0] === e.XF_PLU) { p[2] = String(newQty); return p.join(","); }
            return cn;
          });
          updateData.choseNames = synced;
          // 编辑模式下有选中项时，重新计算合计
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
        wx.showToast({ title: "操作失败", icon: "none", duration: 1500 });
      },
    });
  },
  selectsku: function (e) {
    wx.navigateTo({
      url: "/pages/ydshop/index?xf_plu=" + encodeURIComponent(e.currentTarget.dataset.xf_plu),
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
      url: app.globalData.api + "wx_insertyd.ashx",
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
            var p = cn.replace("[", "").replace("]", "").split(",");
            if (p[0] === e.XF_PLU) { p[2] = String(newQty); return p.join(","); }
            return cn;
          });
          updateData.choseNames = synced;
          // 编辑模式下有选中项时，重新计算合计
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
        wx.showToast({ title: "操作失败", icon: "none", duration: 1500 });
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
        var parts = choseNames[i].replace("[", "").replace("]", "").split(",");
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
              t.setData({ _stockChecking: !1 });
              if (allPassed) {
                var pluList = items.map(function (it) { return it.xf_plu; }).join(",");
                // 不做 encodeURIComponent：微信 onLoad 不会自动解码，会导致后端收到双重编码值
                wx.navigateTo({
                  url: "/pages/depositgwcyd/index/index?xf_plu=" + pluList,
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
    // 从 choseNames 中提取 XF_PLU 并拼接为逗号分隔字符串
    var xfPluList = e.data.choseNames.map(function (item) {
      var parts = item.replace("[", "").replace("]", "").split(",");
      return parts[0];
    }).join(",");
    wx.showLoading({ title: "正在加载" });
    wx.request({
      url: app.globalData.api + "wx_delskuyd.ashx",
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
        wx.showToast({ title: "删除失败", icon: "none", duration: 1500 });
      },
    });
  },
});
