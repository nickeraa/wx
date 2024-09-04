var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabbarBot: a.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        jnumber: ""
    },
    onLoad: function(a) {},
    onShow: function(t) {
        var o = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_checkqgs.ashx",
            data: {
                qguserid: wx.getStorageSync("qguserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? o.setData({
                    rejob: a.data
                }) : wx.showToast({
                    title: "没有记录",
                    icon: "none",
                    duration: 2e3
                }), wx.hideLoading();
            },
            complete: function() {}
        });
    },
    back: function() {
        wx.navigateBack({
            data: 1
        });
    },
    edityg: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/coupons/index/index?id=" + t
        });
    },
    del: function(t) {
        var o = this;
        wx.request({
            url: a.globalData.api + "wx_delyg.ashx",
            data: {
                id: t
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), "ok" == a.data ? wx.showModal({
                    title: "提示",
                    content: "删除成功！",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && o.onShow();
                    }
                }) : wx.showModal({
                    title: "错误",
                    content: "删除失败",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                });
            }
        });
    },
    delyg: function(a) {
        var t = this;
        wx.showModal({
            title: "提示",
            content: "是否删除该员工？",
            showCancel: !0,
            success: function(o) {
                o.confirm && t.del(a.currentTarget.dataset.id);
            }
        });
    },
    addyg: function() {
        wx.navigateTo({
            url: "/pages/coupon/index/index"
        });
    }
});