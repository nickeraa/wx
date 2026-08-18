var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        rejob: [],
        rv: !0,
        picker3: [],
        index3: null,
        zbname: '',
        sumbody: 0
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
    // 点击员工行跳转明细页，直接拼接参数（小程序框架不解码，故不做encodeURIComponent）
    listzb: function (e) {
        var ds = e.currentTarget.dataset;
        wx.navigateTo({
            url: "/pages/listselive/index/index?yguserid=" + ds.yguserid + "&zbname=" + this.data.zbname + "&counts=" + ds.counts
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
        if (!zbname) {
            wx.showToast({
                title: "请选择直播活动",
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
            url: a.globalData.api + "wx_listzbhz.ashx",
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
                        sumbody: 0
                    });
                    wx.showToast({
                        title: "没有记录",
                        icon: "none",
                        duration: 2e3
                    });
                    return;
                }
                t.setData({
                    rejob: list,
                    rv: !1,
                    sumbody: list[0].SUMBODY || 0
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
    }

});
