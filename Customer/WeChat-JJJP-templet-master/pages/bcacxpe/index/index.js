var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        vipcode: "",
        vipname: "",
        addr: "",
        date: "",
        phone: ""
    },
    onLoad: function(a) {},
    getvipcode: function(a) {
        this.setData({
            vipcode: a.detail.value
        });
    },
    getphone: function(a) {
        this.setData({
            phone: a.detail.value
        });
    },
    getvipname: function(a) {
        this.setData({
            vipname: a.detail.value
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
    sevipcode: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_checkvipsql.ashx",
            data: {
                vipcode: t.data.vipcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? ("NULL" != a.data[0].addr && t.setData({
                    addr: a.data[0].addr
                }), "NULL" == a.data[0].mobile && null == a.data[0].mobile || t.setData({
                    phone: a.data[0].mobile
                }), "NULL" != a.data[0].birthday && "null" != a.data[0].birthday && a.data[0].birthday ? t.setData({
                    date: a.data[0].birthday.slice(0, 10)
                }) : t.setData({
                    date: "1920-01-01"
                }), t.setData({
                    vipname: a.data[0].vipname
                })) : wx.showModal({
                    title: "提示",
                    content: "卡号不存在或输入错误",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }), wx.hideLoading();
            }
        });
    },
    listvipcode: function() {
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
                console.log(a), a.data.length > 0 ? t.sevipcode() : wx.showModal({
                    title: "提示",
                    content: "卡号不存在或不属于本人客户",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && t.setData({
                            vipname: "",
                            addr: "",
                            phone: "",
                            date: ""
                        });
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
    onShow: function() {},
    gx: function() {
        if ("" == this.data.vipname) return wx.showToast({
            title: "请输入会员卡号查询！",
            icon: "none",
            duration: 2e3
        }), !1;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_upvipname.ashx",
            data: {
                vipcode: this.data.vipcode,
                vipname: this.data.vipname,
                addr: this.data.addr,
                birthday: this.data.date,
                phone: this.data.phone
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), "ok" == a.data || "okok" == a.data ? wx.showModal({
                    title: "提示",
                    content: "更新成功！",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "更新延时，请重试",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }), wx.hideLoading();
            }
        });
    }
});