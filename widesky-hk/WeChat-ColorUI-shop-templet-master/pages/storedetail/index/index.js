var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        scimgurl: "https://widesky.work/scimg/",
        zbname: '',
        store: '',
        storeName: '',
        plus: [],
        totalQty: 0,
        totalAmt: '0.00',
        rv: !0
    },

    onLoad: function (e) {
        var t = this;
        var zbname = (e && e.zbname) ? String(e.zbname).trim() : '';
        var store = (e && e.store) ? String(e.store).trim() : '';
        var storename = (e && e.storename) ? String(e.storename).trim() : '';
        // URL 解码兜底：兼容直接拼接与 encodeURIComponent 两种传参方式
        if (/%[0-9A-Fa-f]{2}/.test(zbname)) zbname = decodeURIComponent(zbname);
        if (/%[0-9A-Fa-f]{2}/.test(store)) store = decodeURIComponent(store);
        if (/%[0-9A-Fa-f]{2}/.test(storename)) storename = decodeURIComponent(storename);
        t.setData({
            zbname: zbname,
            store: store,
            storeName: storename || store || '总笔数'
        });
        // 参数齐全时自动查询该店铺货品销售数据
        if (t.data.zbname) {
            t.checkinput();
        }
    },
    back: function () {
        wx.navigateBack({
            delta: 1
        });
    },

    // 点击货品行跳转货品销售明细页（叠加当前店铺过滤）
    goPluDetail: function (e) {
        var it = e.currentTarget.dataset;
        if (!it.plu || !this.data.zbname) {
            wx.showToast({
                title: "缺少参数",
                icon: "none"
            });
            return;
        }
        wx.navigateTo({
            url: "/pages/pludetail/index/index?plu=" + encodeURIComponent(it.plu) + "&desci=" + encodeURIComponent(it.desci || '') + "&zbname=" + encodeURIComponent(this.data.zbname) + "&store=" + encodeURIComponent(this.data.store) + "&storename=" + encodeURIComponent(this.data.storeName)
        });
    },

    checkinput: function () {
        var t = this;
        if (!a.globalData.api) {
            wx.showToast({
                title: "服务地址未配置",
                icon: "none"
            });
            return;
        }
        var zbname = String(t.data.zbname || '').trim();
        var store = String(t.data.store || '').trim();
        if (!zbname) {
            wx.showToast({
                title: "缺少直播场次",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        wx.showLoading({
            title: "数据加载中",
            mask: !0
        });
        wx.request({
            url: a.globalData.api + "wx_saleszb.ashx",
            data: {
                zbname: zbname
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function (res) {
                var list = res && res.data;
                if (!Array.isArray(list)) {
                    wx.showToast({
                        title: "数据格式异常",
                        icon: "none",
                        duration: 2e3
                    });
                    return;
                }
                // 前端过滤出当前店铺的所有销售行（店铺字段取值逻辑与汇总页一致）
                var rows = list.filter(function (it) {
                    var k = it.XF_STORECODE || it.STORECODE || it.STORE || it.SHOP || '';
                    return String(k).trim() === store;
                });
                if (rows.length === 0) {
                    t.setData({
                        plus: [],
                        rv: !0
                    });
                    wx.showToast({
                        title: "没有记录",
                        icon: "none",
                        duration: 2e3
                    });
                    return;
                }
                // 按货品编码聚合：同货品合并，数量/金额累加
                var pluMap = {}, plus = [];
                rows.forEach(function (it, i) {
                    var k = it.XF_PLU;
                    if (k == null) k = '_row' + i;
                    var gimg = it.IMAGESSL || it.imagessl;
                    var g = pluMap[k];
                    if (!g) {
                        g = {
                            _key: 'plu_' + k,
                            XF_PLU: it.XF_PLU,
                            XF_DESCI: it.XF_DESCI,
                            IMG_FULL: gimg ? (t.data.scimgurl + it.XF_PLU + '/' + gimg) : '',
                            QTY: 0,
                            AMT: 0
                        };
                        pluMap[k] = g;
                        plus.push(g);
                    }
                    g.QTY += Number(it.XF_QTY) || 0;
                    g.AMT += Number(it.XF_AMTSOLD) || 0;
                });
                var qty = 0,
                    amt = 0;
                plus.forEach(function (g) {
                    g.AMT_F = t.formatAmt(g.AMT);
                    qty += g.QTY;
                    amt += g.AMT;
                });
                t.setData({
                    plus: plus,
                    rv: !1,
                    totalQty: qty,
                    totalAmt: t.formatAmt(amt)
                });
            },
            fail: function () {
                wx.showToast({
                    title: "网络请求失败",
                    icon: "none",
                    duration: 2e3
                });
            },
            complete: function () {
                wx.hideLoading();
            }
        });
    },
    // 金额格式化：两位小数，非数字时原样返回
    formatAmt: function (v) {
        var n = Number(v);
        return isNaN(n) ? (v == null ? '0.00' : v) : n.toFixed(2);
    }

});
