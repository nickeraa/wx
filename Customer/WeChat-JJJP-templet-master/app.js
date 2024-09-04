App({
    onLaunch: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.globalData.StatusBar = t.statusBarHeight;
                var o = wx.getMenuButtonBoundingClientRect();
                a.globalData.Custom = o;
                var n = o.bottom + o.top - t.statusBarHeight;
                a.globalData.CustomBar = n, n > 75 && (a.globalData.tabbar_bottom = "y");
            }
        });
        var o = wx.getUpdateManager();
        o.onCheckForUpdate(function(t) {}), o.onUpdateReady(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function(t) {
                    t.confirm && o.applyUpdate();
                }
            });
        }), o.onUpdateFailed(function() {});
    },
    alert: function(t) {
        wx.showModal({
            content: t,
            showCancel: !1
        });
    },
    globalData: {
        imgUrl: "https://widesky.work/customer/images/weixin/",
        imgzhurl: "https://widesky.work/zhimg/",
        api: "https://widesky.work/HKback/"
    }
});