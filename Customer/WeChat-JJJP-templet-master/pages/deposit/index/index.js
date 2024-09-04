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
    djdp: function() {
        wx.navigateTo({
            url: "/pages/djsales/index/index"
        });
    },
    djdpqh: function() {
        wx.navigateTo({
            url: "/pages/djsalesqh/index/index"
        });
    },
    ygyd: function() {
        wx.navigateTo({
            url: "/pages/ydcx/index/index"
        });
    },
    djall: function() {
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
                    url: "/pages/djall/index/index"
                }) : wx.showToast({
                    title: "权限不足！",
                    icon: "error",
                    duration: 2e3
                });
            }
        });
    },
    djallqh: function() {
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
                    url: "/pages/djallqh/index/index"
                }) : wx.showToast({
                    title: "权限不足！",
                    icon: "error",
                    duration: 2e3
                });
            }
        });
    }
});