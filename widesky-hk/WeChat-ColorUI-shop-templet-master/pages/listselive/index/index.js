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
        weburl: "https://widesky.work/",
        zbname: '',
        yguserid: '',
        counts: 0
    },

    onLoad: function (e) {
        var t = this;
        // 接收汇总页传入的员工ID、直播场次及汇总人数
        // counts 经 dataset 传递为字符串，需过滤 "undefined"/空值并转为数值
        var counts = (e && e.counts && e.counts !== 'undefined') ? parseInt(e.counts, 10) : 0;
        var zbname = (e && e.zbname) ? String(e.zbname).trim() : '';
        // 兜底：若场次名被URL编码过，自动解码（兼容两种传参方式）
        if (/%[0-9A-Fa-f]{2}/.test(zbname)) zbname = decodeURIComponent(zbname);
        t.setData({
            yguserid: (e && e.yguserid) ? String(e.yguserid).trim() : '',
            zbname: zbname,
            counts: isNaN(counts) ? 0 : counts
        });
        // 参数齐全时自动查询该员工分享的客户明细；无参数时静默等待
        if (t.data.yguserid && t.data.zbname) {
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
        // 校验服务地址配置
        if (!a.globalData.api) {
            wx.showToast({
                title: "服务地址未配置",
                icon: "none"
            });
            return;
        }
        // 去除首尾空格后校验，避免带空参数请求
        var zbname = String(t.data.zbname || '').trim();
        var yguserid = String(t.data.yguserid || '').trim();
        if (!zbname || !yguserid) {
            wx.showToast({
                title: "缺少直播场次或员工ID",
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
                // 保存去重后的全量数据，前端分页渲染，避免一次性渲染大量节点
                t._allList = list;
                var pageSize = t.data.pageSize;
                var slice = list.slice(0, pageSize);
                // 优先使用汇总页传来的 counts，保证与汇总页显示一致；未传值时回退到本地去重结果
                var total = t.data.counts > 0 ? t.data.counts : list.length;
                t.setData({
                    rejob: slice,
                    rv: !1,
                    counts: total,
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
    },

});