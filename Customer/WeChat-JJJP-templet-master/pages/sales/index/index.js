var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        bgimages: a.globalData.imgUrl,
        flag: !0,
        userid: "",
        grade: "",
        sfimg: a.globalData.api + "bgimg/sf.png",
        zyimg: a.globalData.api + "bgimg/zy.png",
        ljimg: a.globalData.api + "bgimg/lj.png",
        rgimg: a.globalData.api + "bgimg/rg.png",
        dyimg: a.globalData.api + "bgimg/dy.png",
        gqimg: a.globalData.api + "bgimg/gq.png",
        tzimg: a.globalData.api + "bgimg/tz.jpg"
    },
    onLoad: function(a) {},
    saleszb: function() {
        wx.navigateTo({
            url: "/pages/saleszb/index/index"
        });
    },
    salesall: function() {
        wx.request({
            url: a.globalData.api + "wx_customer_cxlogin.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? wx.navigateTo({
                    url: "/pages/salesall/index/index"
                }) : wx.showToast({
                    title: "权限不足",
                    icon: "error",
                    duration: 2e3
                });
            }
        });
    },
    secw: function() {
        wx.request({
            url: a.globalData.api + "wx_customer_cwlogin.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? wx.navigateTo({
                    url: "/pages/salescw/index/index"
                }) : wx.showToast({
                    title: "权限不足",
                    icon: "error",
                    duration: 2e3
                });
            }
        });
    },
    onShow: function() {},
    sesku: function() {
        wx.navigateTo({
            url: "/pages/sesku/index/index"
        });
    },
    ygzb: function() {
        wx.navigateTo({
            url: "/pages/ygzb/index/index"
        });
    },
    dpzb: function() {
        wx.navigateTo({
            url: "/pages/dpzb/index/index"
        });
    },
    cgs: function() {
        wx.request({
            url: a.globalData.api + "wx_customer_cxlogin.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? wx.navigateTo({
                    url: "/pages/csalesall/index/index"
                }) : wx.showToast({
                    title: "权限不足",
                    icon: "error",
                    duration: 2e3
                });
            }
        });
    },
    upzb: function() {
        wx.getStorageSync("qguserid") ? wx.navigateTo({
            url: "/pages/ygedit/index/index"
        }) : wx.showToast({
            title: "权限不足",
            icon: "error",
            duration: 2e3
        });
    },
    yjzb: function() {
         wx.navigateTo({
            url: "/pages/yjzb/index/index"
        }) 
    },
    cdp: function() {
        wx.request({
            url: a.globalData.api + "wx_customer_cxlogin.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? wx.navigateTo({
                    url: "/pages/csalesstore/index/index"
                }) : wx.showToast({
                    title: "权限不足",
                    icon: "error",
                    duration: 2e3
                });
            }
        });
    }
});