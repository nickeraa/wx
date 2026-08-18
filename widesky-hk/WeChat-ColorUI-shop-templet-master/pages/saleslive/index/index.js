var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        rejob: [],
        rv: !0,
        p: 0,
        pageSize: 20,
        hasmore: !1,
        scimgurl: "https://widesky.work/scimg/",
        picker3: [],
        index3: null,
        zbname: '',
        amtsold: '0.00',
        view: 'doc',
        plus: [],
        stores: []
    },

    onLoad: function () {
        var t = this;
        // 校验服务地址配置
        if (!a.globalData.api) return;
        // 加载直播场次下拉数据
        wx.request({
            url: a.globalData.api + "wx_livezb.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function (res) {
                var list = res && res.data;
                if (Array.isArray(list)) {
                    t.setData({
                        picker3: list
                    });
                }
            }
        });
    },
    back: function () {
        wx.navigateBack({
            delta: 1
        });
    },

    bindPickerChange3: function (e) {
        this.setData({
            index3: e.detail.value,
            zbname: this.data.picker3[e.detail.value].TITLE
        });
    },
    // 切换分类视图：doc=单据(默认)，plu=按货品分类，store=按店铺分类；再点一次回到单据视图
    setView: function (e) {
        var v = e.currentTarget.dataset.v;
        var nv = this.data.view == v ? 'doc' : v;
        console.log('切换视图：' + this.data.view + ' -> ' + nv);
        this.setData({
            view: nv
        });
    },

    // 点击货品行跳转货品销售明细页
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
            url: "/pages/pludetail/index/index?plu=" + encodeURIComponent(it.plu) + "&desci=" + encodeURIComponent(it.desci || '') + "&zbname=" + encodeURIComponent(this.data.zbname)
        });
    },

    // 点击店铺行跳转店铺货品销售明细页
    goStoreDetail: function (e) {
        var it = e.currentTarget.dataset;
        if (!this.data.zbname) {
            wx.showToast({
                title: "缺少参数",
                icon: "none"
            });
            return;
        }
        wx.navigateTo({
            url: "/pages/storedetail/index/index?store=" + encodeURIComponent(it.storecode || '') + "&storename=" + encodeURIComponent(it.store || '') + "&zbname=" + encodeURIComponent(this.data.zbname)
        });
    },

    checkinput: function () {
        var t = this;
        // 校验服务地址配置
        if (!a.globalData.api) {
            wx.showToast({
                title: "服务地址未配置",
                icon: "none"
            });
            return;
        }
        var zbname = String(t.data.zbname || '').trim();
        if (!zbname) {
            wx.showToast({
                title: "请选择直播活动",
                icon: "error",
                duration: 2e3
            });
            return;
        }
        // 重新查询时：重置为单据视图并隐藏旧数据（含货品/店铺分类视图）
        t.setData({
            view: 'doc',
            rv: !0
        });
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
                // 校验返回格式，避免非数组数据被误判为“没有记录”
                if (!Array.isArray(list)) {
                    wx.showToast({
                        title: "数据格式异常",
                        icon: "none",
                        duration: 2e3
                    });
                    return;
                }
                if (list.length === 0) {
                    t.setData({
                        rejob: [],
                        rv: !0,
                        amtsold: '0.00',
                        hasmore: !1,
                        p: 0,
                        view: 'doc',
                        plus: [],
                        stores: []
                    });
                    wx.showToast({
                        title: "没有记录",
                        icon: "none",
                        duration: 2e3
                    });
                    return;
                }
                // 按单据(xf_docno)聚合为单据级卡片：同一单据多条商品明细合并为 items 子列表
                var map = {}, docs = [];
                list.forEach(function (it, i) {
                    var key = it.XF_DOCNO;
                    if (key == null) key = '_row' + i;
                    var doc = map[key];
                    if (!doc) {
                        doc = {
                            _key: key,
                            XF_DOCNO: it.XF_DOCNO,
                            XF_NAME: it.XF_NAME,
                            SALESMAN: it.SALESMAN,
                            SALESTYPES: it.SALESTYPES,
                            BODY: it.BODY,
                            TXDATE_F: t.formatTime(it.XF_TXDATE),
                            SUMQTY: it.SUMQTY,
                            SUMPRICE_F: t.formatAmt(it.SUMPRICE),
                            PAY_AMTSOLDS: it.PAY_AMTSOLDS,
                            PAY_AMTSOLDS_F: t.formatAmt(it.PAY_AMTSOLDS),
                            SUMSQPRICE_F: t.formatAmt(it.SUMSQPRICE),
                            items: []
                        };
                        map[key] = doc;
                        docs.push(doc);
                    }
                    // 商品图完整地址：scimg/商品编码/文件名（与depositfh页拼法一致）
                    var img = it.IMAGESSL || it.imagessl;
                    doc.items.push({
                        XF_PLU: it.XF_PLU,
                        XF_DESCI: it.XF_DESCI,
                        XF_QTY: it.XF_QTY,
                        XF_PRICE_F: t.formatAmt(it.XF_PRICE),
                        XF_AMTSOLD_F: t.formatAmt(it.XF_AMTSOLD),
                        IMG_FULL: img ? (t.data.scimgurl + it.XF_PLU + '/' + img) : ''
                    });
                });
                // 总销售额：按单据级收款汇总（后端AMTSOLD按明细行重复累加会偏大，前端按单据去重后计算）
                var total = 0;
                docs.forEach(function (d) {
                    total += Number(d.PAY_AMTSOLDS) || 0;
                });
                // 按货品分类汇总：同货品编码合并，数量/金额累加
                var pluMap = {}, plus = [];
                list.forEach(function (it, i) {
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
                plus.forEach(function (g) {
                    g.AMT_F = t.formatAmt(g.AMT);
                });
                // 按店铺分类汇总：数据无店铺字段时归为“总笔数”（需后端返回店铺字段）
                var storeMap = {}, stores = [];
                list.forEach(function (it) {
                    var k = it.XF_STORECODE || it.STORECODE || it.STORE || it.SHOP || '';
                    var s = storeMap[k];
                    if (!s) {
                        s = {
                            _key: 'st_' + (k || 'all'),
                            STORE: k || '总笔数',
                            STORECODE: k,
                            DOCS: {},
                            CNT: 0,
                            QTY: 0,
                            AMT: 0
                        };
                        storeMap[k] = s;
                        stores.push(s);
                    }
                    // 统计单据笔数（按单号去重）
                    if (it.XF_DOCNO && !s.DOCS[it.XF_DOCNO]) {
                        s.DOCS[it.XF_DOCNO] = 1;
                        s.CNT++;
                    }
                    s.QTY += Number(it.XF_QTY) || 0;
                    s.AMT += Number(it.XF_AMTSOLD) || 0;
                });
                stores.forEach(function (s) {
                    s.AMT_F = t.formatAmt(s.AMT);
                });
                // 保存全量数据，前端分页渲染，避免一次性渲染大量节点
                t._allList = docs;
                var pageSize = t.data.pageSize;
                var slice = docs.slice(0, pageSize);
                t.setData({
                    rejob: slice,
                    rv: !1,
                    amtsold: t.formatAmtComma(total),
                    hasmore: docs.length > pageSize,
                    p: slice.length,
                    view: 'doc',
                    plus: plus,
                    stores: stores
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
    },
    // 金额格式化：两位小数 + 千分位逗号（用于总销售额）
    formatAmtComma: function (v) {
        var n = Number(v);
        if (isNaN(n)) return v == null ? '0.00' : v;
        var parts = n.toFixed(2).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    },
    // 格式化日期时间："2026-08-14T10:30:45" -> { date: "2026-08-14", time: "10:30:45" }
    formatTime: function (s) {
        if (!s) return { date: '', time: '' };
        var str = String(s).replace(/[T\s]/g, ' ').trim();
        var parts = str.split(/\s+/);
        var time = (parts[1] || '').replace(/Z$/i, '').replace(/\.\d+$/, '');
        return { date: parts[0] || '', time: time };
    },
    // 分页加载更多
    loadmore: function () {
        var t = this;
        var all = t._allList || [];
        var start = t.data.p;
        var end = start + t.data.pageSize;
        if (start >= all.length) return;
        var more = all.slice(start, end);
        t.setData({
            rejob: t.data.rejob.concat(more),
            p: end,
            hasmore: end < all.length
        });
    }

});
