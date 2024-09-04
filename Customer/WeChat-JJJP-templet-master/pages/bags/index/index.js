var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        replu: {},
        zhimgurl: a.globalData.zhimgurl
    },
    onLoad: function() {},
    listjpg: function(a) {
        wx.navigateTo({
            url: "/pages/bagsimg/index/index?img=" + a.currentTarget.dataset.jpg
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 0
        });
    },
    onShow: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_zhimg.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), t.setData({
                    replu: a.data
                });
                for (var e = [], o = 0; o < t.data.replu.length; o++) e = e.concat(t.data.replu[o].FullPath.replace("D:\\zhimg\\", ""));
                t.setData({
                    replu: e
                }), wx.hideLoading();
            }
        });
    }
});