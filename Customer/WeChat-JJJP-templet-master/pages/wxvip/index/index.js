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
    catchTap: function() {},
    radioChange: function(a) {
        console.log("radior发送选择改变，携带值为", a.detail.value), this.setData({
            setype: a.detail.value
        }), console.log(a.target.id), this.dj(this.data.setype, a.target.id);
    },
    shuaxin: function() {
        this.onShow();
    },
    sevip: function(a) {
        wx.navigateTo({
            url: "/pages/vipsaless/index/index?vipcode=" + a.currentTarget.dataset.xf_vipcode
        });
    },
    dj: function(t, e) {
        var o = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_inwxvip.ashx",
            data: {
                setype: t,
                xf_vipcode: e,
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), "ok" == a.data ? o.onShow() : wx.showModal({
                    title: "提示",
                    content: "数据错误！",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }), wx.hideLoading();
            }
        });
    },
    onShow: function(t) {
        this.setData({
            check: ""
        });
        var e = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_wxvip.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? e.setData({
                    rejob: a.data,
                    xf_name: a.data[0].XF_NAME
                }) : (e.setData({
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