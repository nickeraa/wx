var e, a = require("../../../@babel/runtime/helpers/defineProperty"), t = getApp(), o = require("../../../utils/util.js");

Page({
    data: (e = {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        TabbarBot: t.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        ret: {},
        restt: {},
        rv: !0,
        countboy: "",
        xf_store: "",
        xf_plu: "",
        xf_qty: "",
        vipcode: "",
        vipname: "",
        i: "",
        xf_vipcode: "",
        xf_surname: "",
        grade: "",
        xf_stores: "",
        xf_issuedate: "",
        xf_users: "",
        xf_username: "",
        xf_bonus: ""
    }, a(a(a(a(a(a(a(a(a(a(e, "xf_plu", ""), "xf_desci", ""), "date", ""), "date2", ""), "userid", ""), "snumber", ""), "store", ""), "storename", ""), "picker4", []), "index4", null), 
    a(a(a(e, "picker3", []), "index3", null), "xf_staffcode", "")),
    bindDateChange: function(e) {
        console.log(e.detail.value), this.setData({
            date: e.detail.value
        });
    },
    bindDateChange2: function(e) {
        this.setData({
            date2: e.detail.value
        });
    },
    onLoad: function(e) {
        var a = o.formatDate(new Date());
        this.setData({
            date: a,
            date2: a
        });
        var s = this;
        wx.getStorageSync("grade") ? wx.request({
            url: t.globalData.api + "wx_sestore.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), s.setData({
                    picker3: e.data
                });
            }
        }) : wx.request({
            url: t.globalData.api + "checkstore.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), s.setData({
                    picker3: e.data
                });
            }
        });
    },
    bindPickerChange4: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index4: e.detail.value,
            xf_staffcode: this.data.picker4[e.detail.value].XF_STAFFCODE
        }), console.log(this.data.xf_staffcode);
    },
    sestaff: function() {
        (wx.getStorageSync("qguserid") || wx.getStorageSync("grade")) && this.setData({
            i: "0"
        });
        var e = this;
        wx.request({
            url: t.globalData.api + "wx_sestaff.ashx",
            data: {
                xf_storecode: e.data.store,
                userid: wx.getStorageSync("vipuserid"),
                i: e.data.i
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), e.setData({
                    picker4: a.data
                });
            }
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    bindPickerChange3: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index3: e.detail.value,
            store: this.data.picker3[e.detail.value].XF_STORECODE,
            storename: this.data.picker3[e.detail.value].XF_NAME
        }), this.sestaff();
    },
    onShow: function(e) {},
    newsaleslist: function(e) {
        wx.navigateTo({
            url: "/pages/vipnewlist/index/index?vipcode=" + e.currentTarget.dataset.xf_vipcode + "&xf_surname=" + e.currentTarget.dataset.xf_surname + "&begindate=" + this.data.date + "&enddate=" + this.data.date2
        });
    },
    checkinput: function() {
        return this.setData({
            rejob: null
        }), "" == this.data.store ? (wx.showToast({
            title: "请输入查询店铺",
            icon: "none",
            duration: 2e3
        }), !1) : "" == this.data.xf_staffcode ? (wx.showToast({
            title: "请选择查询员工",
            icon: "none",
            duration: 2e3
        }), !1) : void this.vip_sort();
    },
    vip_sort: function() {
        var e = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: t.globalData.api + "wx_newvip.ashx",
            data: {
                begindate: e.data.date,
                enddate: e.data.date2,
                storecode: e.data.store,
                xf_staffcode: e.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? e.setData({
                    rejob: a.data,
                    countboy: a.data.length,
                    rv: !1
                }) : (e.setData({
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