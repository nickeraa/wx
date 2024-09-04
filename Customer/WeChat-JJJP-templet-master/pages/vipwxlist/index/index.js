var a = getApp();

require("../../../utils/util.js");

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        rejob: {},
        xf_staffcode: ""
    },
    onLoad: function(a) {
        console.log(a.xf_staffcode), a.xf_staffcode && this.setData({
            xf_staffcode: a.xf_staffcode
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onShow: function(a) {
        this.vip_sort();
    },
    vip_sort: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_dpwxlist.ashx",
            data: {
                xf_staffcode: t.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? (t.setData({
                    rejob: a.data
                }), console.log(t.data.rejob)) : (t.setData({
                    rejob: null
                }), wx.showToast({
                    title: "没有记录",
                    icon: "none",
                    duration: 2e3
                })), wx.hideLoading();
            }
        });
    }
});