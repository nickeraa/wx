var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        vipcode: "",
        vipname: "",
        phone: ""
    },
    onLoad: function(a) {},
    getvipcode: function(a) {
        this.setData({
            vipcode: a.detail.value
        });
    },
    bindDateChange: function(a) {
        console.log(a.detail.value), this.setData({
            date: a.detail.value
        });
    },
    getvipaddr: function(a) {
        this.setData({
            addr: a.detail.value
        });
    },
    call_phone: function() {
        if ("" == this.data.phone) return wx.showModal({
            title: "提示",
            content: "手机号码不能为空",
            showCancel: !1,
            success: function(a) {
                a.confirm;
            }
        }), !1;
        if (!/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|16[0-9]|12[0-9]|11[0-9]|10[0-9])\d{8}$$/.test(this.data.phone)) return wx.showToast({
            title: "手机号不正确",
            icon: "none",
            duration: 1e3
        }), !1;
        wx.makePhoneCall({
            phoneNumber: this.data.phone,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    listvipcode: function() {
        this.setData({
            vipname: "",
            phone: ""
        });
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_checkygvip.ashx",
            data: {
                vipcode: t.data.vipcode,
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? t.searchphone() : wx.showModal({
                    title: "提示",
                    content: "卡号不存在或不属于本人客户",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }), wx.hideLoading();
            }
        });
    },
    searchphone: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_searchvip.ashx",
            data: {
                vipcode: t.data.vipcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? t.setData({
                    vipname: a.data[0].vipname,
                    phone: a.data[0].mobile
                }) : wx.showModal({
                    title: "提示",
                    content: "没有记录",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }), wx.hideLoading();
            }
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    listvip: function() {
        wx.navigateTo({
            url: "/pages/vipss/index/index"
        });
    },
    onShow: function() {}
});