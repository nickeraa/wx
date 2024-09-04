var a = getApp(), t = require("../../../utils/util.js");

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabbarBot: a.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        rv: !0,
        dpsum: "",
        gssum: "",
        p: 0,
        xf_store: "",
        date: "",
        date2: "",
        setype: "",
        store: "",
        storename: "",
        picker3: [],
        index3: null,
        xf_staffcode: ""
    },
    radioChange: function(a) {
        console.log("radior发送选择改变，携带值为", a.detail.value), this.setData({
            setype: a.detail.value
        }), this.setData({
            rv: !0
        });
        var t = this.data.picker3;
        if (wx.getStorageSync("grade")) if ("0" == this.data.setype || "1" == this.data.setype) {
            if (JSON.stringify(t).indexOf('"XF_NAME":"所有店铺"') <= -1) {
                t.push({
                    XF_STORECODE: "all",
                    XF_NAME: "所有店铺",
                    LCCODE: "所有店铺"
                });
                this.setData({
                    picker3: t
                }), console.log(this.data.picker3);
            }
        } else console.log("ddddddd");
    },
    bindDateChange: function(a) {
        console.log(a.detail.value), this.setData({
            date: a.detail.value
        });
    },
    bindDateChange2: function(a) {
        this.setData({
            date2: a.detail.value
        });
    },
    onLoad: function(e) {
        var s = t.formatDate(new Date());
        this.setData({
            date: s,
            date2: s
        });
        var d = this;
        wx.getStorageSync("grade") ? wx.request({
            url: a.globalData.api + "wx_sestore.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a.data), d.setData({
                    picker3: a.data
                });
            }
        }) : wx.request({
            url: a.globalData.api + "checkstore.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), d.setData({
                    picker3: a.data
                });
            }
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    bindPickerChange3: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index3: a.detail.value,
            store: this.data.picker3[a.detail.value].XF_STORECODE,
            storename: this.data.picker3[a.detail.value].XF_NAME
        });
    },
    onShow: function(a) {},
    newsaleslist: function(a) {
        wx.getStorageSync("qguserid") || wx.getStorageSync("grade") || wx.getStorageSync("vipuserid") == a.currentTarget.dataset.xf_defsalesman ? "0" == this.data.setype ? wx.navigateTo({
            url: "/pages/vipnews/index/index?xf_staffcode=" + a.currentTarget.dataset.xf_defsalesman + "&xf_issuestore=" + a.currentTarget.dataset.xf_issuestore + "&begindate=" + this.data.date + "&enddate=" + this.data.date2 + "&ygsum=" + a.currentTarget.dataset.ygsum + "&xf_name=" + a.currentTarget.dataset.xf_name
        }) : "1" == this.data.setype ? wx.navigateTo({
            url: "/pages/vipjjs/index/index?xf_staffcode=" + a.currentTarget.dataset.xf_defsalesman + "&xf_issuestore=" + a.currentTarget.dataset.xf_issuestore + "&begindate=" + this.data.date + "&enddate=" + this.data.date2 + "&ygsum=" + a.currentTarget.dataset.ygsum + "&xf_name=" + a.currentTarget.dataset.xf_name
        }) : "2" == this.data.setype ? wx.navigateTo({
            url: "/pages/vipbds/index/index?xf_staffcode=" + a.currentTarget.dataset.xf_defsalesman + "&xf_storecode=" + this.data.store + "&begindate=" + this.data.date + "&enddate=" + this.data.date2 + "&ygsum=" + a.currentTarget.dataset.ygsum + "&xf_name=" + a.currentTarget.dataset.xf_name
        }) : "3" == this.data.setype && wx.navigateTo({
            url: "/pages/vipyds/index/index?xf_staffcode=" + a.currentTarget.dataset.xf_defsalesman + "&xf_storecode=" + this.data.store + "&begindate=" + this.data.date + "&enddate=" + this.data.date2 + "&ygsum=" + a.currentTarget.dataset.ygsum + "&xf_name=" + a.currentTarget.dataset.xf_name
        }) : wx.showToast({
            title: "没有权限",
            icon: "error",
            duration: 2e3
        });
    },
    checkinput: function() {
        return "" == this.data.setype ? (wx.showToast({
            title: "请选择查询类别",
            icon: "none",
            duration: 2e3
        }), !1) : "" == this.data.store ? (wx.showToast({
            title: "请选择查询店铺",
            icon: "none",
            duration: 2e3
        }), !1) : "2" != this.data.setype && "3" != this.data.setype || "all" != this.data.store ? void ("0" == this.data.setype ? this.vip_newvip() : "1" == this.data.setype ? this.vip_jsvip() : "2" == this.data.setype ? this.vip_xfvip() : "3" == this.data.setype && this.vip_vipyd()) : (wx.showToast({
            title: "此查询类别不能查询所有店铺",
            icon: "none",
            duration: 2e3
        }), !1);
    },
    vip_vipyd: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_ydvip.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                storecode: t.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? t.setData({
                    rejob: a.data,
                    dpsum: a.data[0].DPSUM,
                    gssum: a.data[0].GSSUM,
                    rv: !1
                }) : (t.setData({
                    rv: !0,
                    rejob: null
                }), wx.showToast({
                    title: "没有记录",
                    icon: "none",
                    duration: 2e3
                })), wx.hideLoading();
            }
        });
    },
    vip_newvip: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_hznewvip.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                storecode: t.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? t.setData({
                    rejob: a.data,
                    dpsum: a.data[0].DPSUM,
                    gssum: a.data[0].GSSUM,
                    rv: !1
                }) : (t.setData({
                    rv: !0,
                    rejob: null
                }), wx.showToast({
                    title: "没有记录",
                    icon: "none",
                    duration: 2e3
                })), wx.hideLoading();
            }
        });
    },
    vip_xfvip: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_hzxfvip.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                storecode: t.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? t.setData({
                    rejob: a.data,
                    dpsum: a.data[0].DPSUM,
                    gssum: a.data[0].GSSUM,
                    rv: !1
                }) : (t.setData({
                    rv: !0,
                    rejob: null
                }), wx.showToast({
                    title: "没有记录",
                    icon: "none",
                    duration: 2e3
                })), wx.hideLoading();
            }
        });
    },
    vip_jsvip: function() {
        console.log("fsdfsdfsdfsdf");
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_hzjsvip.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                storecode: t.data.store,
                xf_staffcode: t.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? t.setData({
                    rejob: a.data,
                    dpsum: a.data[0].DPSUM,
                    gssum: a.data[0].GSSUM,
                    rv: !1
                }) : (t.setData([ t.setData({
                    rv: !0,
                    rejob: null
                }) ]), wx.showToast({
                    title: "没有记录",
                    icon: "none",
                    duration: 2e3
                })), wx.hideLoading();
            }
        });
    }
});