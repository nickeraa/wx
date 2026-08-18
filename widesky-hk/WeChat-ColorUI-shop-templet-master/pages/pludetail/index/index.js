var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        scimgurl: "https://widesky.work/scimg/",
        zbname: '',
        plu: '',
        desci: '',
        hasStore: !1,
        store: '',
        storeName: '',
        imgFull: '',
        rows: [],
        totalQty: 0,
        totalAmt: '0.00',
        rv: !0
    },

    onLoad: function (e) {
        var t = this;
        var zbname = (e && e.zbname) ? String(e.zbname).trim() : '';
        var plu = (e && e.plu) ? String(e.plu).trim() : '';
        var desci = (e && e.desci) ? String(e.desci).trim() : '';
        // 店铺过滤参数：仅从店铺货品页(storedetail)跳入时携带，区分“未传”与“空店铺编码”
        var hasStore = !!(e && typeof e.store !== 'undefined');
        var store = hasStore ? String(e.store || '').trim() : '';
        var storename = (e && e.storename) ? String(e.storename).trim() : '';
        // URL 解码兜底：兼容直接拼接与 encodeURIComponent 两种传参方式
        if (/%[0-9A-Fa-f]{2}/.test(zbname)) zbname = decodeURIComponent(zbname);
        if (/%[0-9A-Fa-f]{2}/.test(plu)) plu = decodeURIComponent(plu);
        if (/%[0-9A-Fa-f]{2}/.test(desci)) desci = decodeURIComponent(desci);
        if (/%[0-9A-Fa-f]{2}/.test(store)) store = decodeURIComponent(store);
        if (/%[0-9A-Fa-f]{2}/.test(storename)) storename = decodeURIComponent(storename);
        t.setData({
            zbname: zbname,
            plu: plu,
            desci: desci,
            hasStore: hasStore,
            store: store,
            storeName: storename || store || '总笔数'
        });
        // 参数齐全时自动查询该货品明细
        if (t.data.zbname && t.data.plu) {
            t.checkinput();
        }
    },
    back: function () {
        wx.navigateBack({
            delta: 1
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
        var plu = String(t.data.plu || '').trim();
        if (!zbname || !plu) {
            wx.showToast({
                title: "缺少直播场次或货品编码",
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
                // 前端过滤出当前货品的所有销售明细行；带店铺参数时叠加店铺过滤（与汇总页取值逻辑一致）
                var hasStore = t.data.hasStore;
                var store = String(t.data.store || '').trim();
                var rows = list.filter(function (it) {
                    if (String(it.XF_PLU || '').trim() !== plu) return false;
                    if (hasStore) {
                        var k = it.XF_STORECODE || it.STORECODE || it.STORE || it.SHOP || '';
                        if (String(k).trim() !== store) return false;
                    }
                    return true;
                });
                if (rows.length === 0) {
                    t.setData({
                        rows: [],
                        rv: !0
                    });
                    wx.showToast({
                        title: "没有记录",
                        icon: "none",
                        duration: 2e3
                    });
                    return;
                }
                // 汇总数量/金额，补全展示字段与唯一key
                var qty = 0,
                    amt = 0;
                rows.forEach(function (it, i) {
                    it._key = i;
                    qty += Number(it.XF_QTY) || 0;
                    amt += Number(it.XF_AMTSOLD) || 0;
                    it.PRICE_F = t.formatAmt(it.XF_PRICE);
                    it.AMT_F = t.formatAmt(it.XF_AMTSOLD);
                    var fmt = t.formatTime(it.XF_TXDATE);
                    it.DATE_F = fmt.date;
                    it.TIME_F = fmt.time;
                });
                // 货品图：取首行图片文件名拼完整地址
                var img = rows[0].IMAGESSL || rows[0].imagessl;
                t.setData({
                    rows: rows,
                    rv: !1,
                    totalQty: qty,
                    totalAmt: t.formatAmt(amt),
                    imgFull: img ? (t.data.scimgurl + plu + '/' + img) : ''
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
    // 格式化日期时间："2026-08-14T10:30:45" -> { date: "2026-08-14", time: "10:30:45" }
    formatTime: function (s) {
        if (!s) return { date: '', time: '' };
        var str = String(s).replace(/[T\s]/g, ' ').trim();
        var parts = str.split(/\s+/);
        var time = (parts[1] || '').replace(/Z$/i, '').replace(/\.\d+$/, '');
        return { date: parts[0] || '', time: time };
    }

});
