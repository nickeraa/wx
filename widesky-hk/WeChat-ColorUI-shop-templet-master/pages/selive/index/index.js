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
        counts: 0,
        weburl: "https://widesky.work/",
        picker3: [],
        index3: null,
        zbname: '',
        yguserid: ''
    },

    getyguserid: function (e) {
        this.setData({
            yguserid: e.detail.value
        });
    },

    onLoad: function () {
        var t = this;
        t.setData({
            yguserid: wx.getStorageSync('userid')
        });
        // 加载直播场次下拉数据
        if (!a.globalData.api) return;
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
        var yguserid = String(t.data.yguserid || '').trim();
        if (!zbname) {
            wx.showToast({
                title: "请选择直播活动",
                icon: "error",
                duration: 2e3
            });
            return;
        }
        if (!yguserid) {
            wx.showToast({
                title: "请输入员工ID",
                icon: "error",
                duration: 2e3
            });
            return;
        }
        wx.showLoading({
            title: "数据加载中",
            mask: !0
        });
        wx.request({
            url: a.globalData.api + "wx_listzb.ashx",
            data: {
                zbname: zbname,
                yguserid: yguserid
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
                        counts: 0,
                        hasmore: !1,
                        p: 0
                    });
                    wx.showToast({
                        title: "没有记录",
                        icon: "none",
                        duration: 2e3
                    });
                    return;
                }
                // 按 openid 去重：同一客户只保留一条记录，避免重复登录产生重复行
                var seen = {};
                list = list.filter(function (it) {
                    var key = it.OPENID || it.openid || ((it.WXNAME || '') + '|' + (it.WXIMG || ''));
                    if (!key) return true;
                    if (seen[key]) return false;
                    seen[key] = 1;
                    return true;
                });
                // 补全字段：唯一key(供wx:key做diff优化)、完整头像地址(避免拼接异常)、格式化登录时间
                list.forEach(function (it, i) {
                    it._key = i;
                    it.WXIMG_FULL = t.formatImg(it.WXIMG);
                    var fmt = t.formatTime(it.LOGIN_TIME);
                    it.LOGIN_TIME_DATE = fmt.date;
                    it.LOGIN_TIME_CLOCK = fmt.time;
                });
                // 保存去重后的全量数据，前端分页渲染
                t._allList = list;
                var pageSize = t.data.pageSize;
                var slice = list.slice(0, pageSize);
                t.setData({
                    rejob: slice,
                    rv: !1,
                    counts: list.length,
                    hasmore: list.length > pageSize,
                    p: slice.length
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
    // 拼接头像完整地址：已带协议或//前缀的按原样返回，其余拼接站点域名
    formatImg: function (u) {
        if (!u) return '';
        return /^(https?:)?\/\//i.test(u) ? u : this.data.weburl + u;
    },
    // 格式化登录时间："2026-08-14T10:30:45" -> { date: "2026-08-14", time: "10:30:45" }
    // 兼容 T/空格分隔，并去除毫秒与Z后缀
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
