var e = getApp();

Page({
    data: {
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        bgimages: e.globalData.imgUrl,
        flag: !0,
        userid: "",
        grade: "",
        sfimg: e.globalData.api + "bgimg/sf.png",
        zyimg: e.globalData.api + "bgimg/zy.png",
        ljimg: e.globalData.api + "bgimg/lj.png",
        rgimg: e.globalData.api + "bgimg/rg.png",
        dyimg: e.globalData.api + "bgimg/dy.png",
        gqimg: e.globalData.api + "bgimg/gq.png",
        tzimg: e.globalData.api + "bgimg/tz.jpg"
    },
    onLoad: function(e) {},
    cxwx: function() {
        wx.navigateTo({
            url: "/pages/vipwx/index/index"
        });
    },
    cxnew: function() {
        wx.navigateTo({
            url: "/pages/vipnew/index/index"
        });
    },
    vipjj: function() {
        wx.navigateTo({
            url: "/pages/vipjj/index/index"
        });
    },
    wxvip: function() {
        wx.navigateTo({
            url: "/pages/wxvip/index/index"
        });
    },
    gxwx: function() {
        wx.navigateTo({
            url: "/pages/acxpexls/index/index"
        });
    },
    checkqx: function() {
        wx.request({
            url: e.globalData.api + "wx_customer_cxlogin.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), e.data.length > 0 ? wx.setStorageSync("grade", "all") : wx.removeStorageSync("grade");
            }
        });
    },
    checkwx: function() {
        wx.request({
            url: e.globalData.api + "wx_customer_cxlogin.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), e.data.length > 0 ? wx.navigateTo({
                    url: "/pages/checkwxvip/index/index"
                }) : wx.showToast({
                    title: "权限不足",
                    icon: "error",
                    duration: 2e3
                });
            }
        });
    },
    yd: function() {
        wx.navigateTo({
            url: "/pages/vipyd/index/index"
        });
    },
    bd: function() {
        wx.navigateTo({
            url: "/pages/vipbd/index/index"
        });
    },
    xgvip: function() {
        wx.getStorageSync("qguserid") ? wx.navigateTo({
            url: "/pages/acxpexl/index/index"
        }) : wx.showToast({
            title: "权限不足",
            icon: "error",
            duration: 2e3
        });
    },
    hzvip: function() {
        wx.navigateTo({
            url: "/pages/viphz/index/index"
        });
    },
    cxls: function() {
        wx.navigateTo({
            url: "/pages/vipss/index/index"
        });
    },
    cxlb: function() {
        wx.navigateTo({
            url: "/pages/vipsort/index/index"
        });
    },
    cxhp: function() {
        wx.navigateTo({
            url: "/pages/vipsku/index/index"
        });
    },
    cxje: function() {
        wx.navigateTo({
            url: "/pages/vipskuamt/index/index"
        });
    },
    delvip: function() {
        wx.showLoading({
            title: "正在删除数据",
            mask: !0
        }), wx.request({
            url: e.globalData.api + "wx_delvip.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e.data), wx.hideLoading(), "ok" == e.data && wx.showModal({
                    title: "提示",
                    content: "已删除！",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm;
                    }
                });
            }
        });
    },
    bcvip: function() {
        wx.navigateTo({
            url: "/pages/bcacxpe/index/index"
        });
    },
    phone: function() {
        wx.navigateTo({
            url: "/pages/cxphone/index/index"
        });
    },
    sezh: function() {
        wx.navigateTo({
            url: "/pages/bags/index/index"
        });
    },
    checkqg: function() {
        var a = this;
        wx.request({
            url: e.globalData.api + "wx_customer_qglogin.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid"),
                password: wx.getStorageSync("vippassword")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), 1 == e.data.length ? wx.setStorageSync("qguserid", e.data[0].XF_STAFFCODE) : wx.removeStorageSync("qguserid"), 
                a.checkqx();
            }
        });
    },
    checkuserid: function() {
        var a = this;
        wx.request({
            url: e.globalData.api + "wx_check.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e.data), 1 == e.data.length ? a.setData({
                    flag: !1
                }) : a.setData({
                    flag: !0
                }),console.log(a.data.flag); a.checkqg();
            }
        });
    },
    onShow: function() {
        if (wx.getStorageSync("vipuserid")) {
            var a = this;
            wx.request({
                url: e.globalData.api + "wx_checkuser.ashx",
                data: {
                    userid: wx.getStorageSync("vipuserid"),
                    password: "",
                    i: "1"
                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                dataType: "json",
                success: function(e) {
                    console.log(e), 0 == e.data.length ? wx.showModal({
                        title: "提示",
                        content: "请您验证用户，必须是员工且在职状态才能操作",
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateTo({
                                url: "/pages/tjlogin/index"
                            });
                        }
                    }) : a.checkuserid();
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请您验证用户，必须是员工且在职状态才能操作",
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.navigateTo({
                    url: "/pages/tjlogin/index"
                });
            }
        });
    }
});