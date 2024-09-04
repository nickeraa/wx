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
        xf_desci: "",
        xf_store: "",
        date: "",
        date2: "",
        xf_plu: "",
        store: "",
        storename: "",
        picker3: [],
        index3: null,
        xf_staffcode: ""
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
            date: s.substring(0, 8) + "01",
            date2: s
        }), e && this.setData({
            xf_plu: e.xf_plu,
            xf_desci: e.xf_desci
        });
        var o = this;
        wx.getStorageSync("grade") ? wx.request({
            url: a.globalData.api + "wx_sestore.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a);
                a.data.push({
                    XF_STORECODE: "all",
                    XF_NAME: "所有店铺",
                    LCCODE: "所有店铺"
                });
                o.setData({
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
                console.log(a), o.setData({
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
        wx.navigateTo({
            url: "/pages/ygskus/index/index?xf_staffcode=" + a.currentTarget.dataset.xf_salesman + "&xf_storecode=" + this.data.store + "&begindate=" + this.data.date + "&enddate=" + this.data.date2 + "&qtysold=" + a.currentTarget.dataset.qtysold + "&xf_name=" + a.currentTarget.dataset.xf_name + "&xf_plu=" + this.data.xf_plu
        });
    },
    checkinput: function() {
        if ("" == this.data.store) return wx.showToast({
            title: "请选择店铺",
            icon: "none",
            duration: 2e3
        }), !1;
        this.vip_newvip();
    },
    vip_newvip: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_hzygvip.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                storecode: t.data.store,
                xf_plu: t.data.xf_plu
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
    }
});