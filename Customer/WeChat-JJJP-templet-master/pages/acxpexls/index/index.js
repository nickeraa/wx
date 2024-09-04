var t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        resultdt: {},
        replu: {},
        hkimgurl: t.globalData.hkimgUrl,
        vipcode: "",
        vipname: "",
        grade: "",
        store: "",
        xf_name: ""
    },
    onLoad: function(t) {},
    getvipcode: function(t) {
        this.setData({
            vipcode: t.detail.value
        });
    },
    listvipcode: function() {
        var a = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: t.globalData.api + "wx_checkvip.ashx",
            data: {
                vipcode: a.data.vipcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), t.data.length > 0 ? a.setData({
                    vipname: t.data[0].XF_SURNAME,
                    grade: t.data[0].GRADE,
                    store: t.data[0].XF_STORES,
                    xf_name: t.data[0].XF_USERNAME
                }) : (a.setData({
                    rejob: null
                }), wx.showModal({
                    title: "提示",
                    content: "卡号不存在或输入错误",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                })), wx.hideLoading();
            }
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 0
        });
    },
    listvip: function() {
        wx.navigateTo({
            url: "/pages/vipss/index/index"
        });
    },
    onShow: function() {},
    ywx: function() {
        if ("" == this.data.vipname || "" == this.data.vipcode) return wx.showToast({
            title: "请输入会员卡号"
        }), !1;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: t.globalData.api + "wx_inwxvip.ashx",
            data: {
                setype: "0",
                xf_vipcode: this.data.vipcode,
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), "ok" == t.data ? wx.showModal({
                    title: "提示",
                    content: "更新成功！",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "更新错误！",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                }), wx.hideLoading();
            }
        });
    },
    wwx: function() {
        if ("" == this.data.vipname || "" == this.data.vipcode) return wx.showToast({
            title: "请输入会员卡号"
        }), !1;
        wx.showLoading({
            title: "正在更新",
            mask: !0
        }), wx.request({
            url: t.globalData.api + "wx_inwxvip.ashx",
            data: {
                setype: "2",
                xf_vipcode: this.data.vipcode,
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), "ok" == t.data ? wx.showModal({
                    title: "提示",
                    content: "更新成功！",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "更新错误！",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                }), wx.hideLoading();
            }
        });
    }
});