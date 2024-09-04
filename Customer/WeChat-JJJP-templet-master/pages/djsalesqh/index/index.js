var a = getApp(), t = require("../../../utils/util.js");

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabCur: 0,
        scrollLeft: 0,
        vipcode: "",
        vipname: "",
        grade: "",
        date: "",
        date2: "",
        rejob: {},
        flag: !0,
        index2: null,
        picker2: [],
        store: "",
        storename: "",
        djamt: "",
        yfamt: "",
        sqamt: ""
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
    bindPickerChange2: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index2: a.detail.value,
            store: this.data.picker2[a.detail.value].XF_STORECODE,
            storename: this.data.picker2[a.detail.value].XF_NAME
        });
    },
    onLoad: function(a) {
        var e = t.formatDate(new Date());
        this.setData({
            date: e.substring(0, 8) + "01",
            date2: e
        }), console.log(this.data.date);
    },
    onShow: function() {
        var t = this;
        wx.getStorageSync("grade") ? wx.request({
            url: a.globalData.api + "wx_sestore.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), t.setData({
                    picker2: a.data
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
                console.log(a), t.setData({
                    picker2: a.data
                });
            }
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    selectvip: function() {
        if (null == this.data.index2) return wx.showToast({
            title: "请选择店铺查询",
            icon: "none",
            duration: 2e3
        }), !1;
        var t = this;
        wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: a.globalData.api + "wx_ygdjqh.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                xf_storecode: t.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), wx.hideLoading(), a.data.length > 0 ? t.setData({
                    djamt: a.data[0].DPDJ,
                    flag: !1,
                    rejob: a.data
                }) : (wx.showToast({
                    title: "没有数据",
                    icon: "none",
                    duration: 2e3
                }), t.setData({
                    zamtsold: "",
                    flag: !0
                }));
            }
        });
    },
    djlist: function(a) {
        wx.navigateTo({
            url: "/pages/ydcxsqh/index/index?xf_staffcode=" + a.currentTarget.dataset.xf_salesman + "&xf_storecode=" + this.data.store + "&begindate=" + this.data.date + "&enddate=" + this.data.date2 + "&ygamt=" + a.currentTarget.dataset.ygamt + "&xf_name=" + a.currentTarget.dataset.xf_name
        });
    }
});