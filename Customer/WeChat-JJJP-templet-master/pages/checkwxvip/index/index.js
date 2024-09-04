var a = getApp();

require("../../../utils/util.js");

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabbarBot: a.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        xf_name: "",
        setype: ""
    },
    onLoad: function(a) {},
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onShow: function(t) {
        var o = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_checkwxvip.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? o.setData({
                    rejob: a.data
                }) : (o.setData({
                    rejob: null
                }), wx.showToast({
                    title: "没有记录！",
                    icon: "none",
                    duration: 2e3
                })), wx.hideLoading();
            }
        });
    }
});