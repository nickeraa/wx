var e, t = require("../../../@babel/runtime/helpers/defineProperty"), a = getApp(), o = require("../../../utils/util.js");

Page({
    data: (e = {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabbarBot: a.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        ret: {},
        restt: {},
        xf_store: "",
        rv: !0,
        countboy: "",
        xf_plu: "",
        xf_qty: "",
        vipcode: "",
        vipname: "",
        xf_vipcode: "",
        xf_surname: "",
        grade: "",
        xf_stores: "",
        xf_issuedate: "",
        xf_users: "",
        xf_username: "",
        xf_bonus: ""
    }, t(t(t(t(t(t(t(t(t(t(e, "xf_plu", ""), "xf_desci", ""), "date", ""), "date2", ""), "userid", ""), "snumber", ""), "store", ""), "storename", ""), "picker4", []), "index4", null), 
    t(t(t(t(e, "picker3", []), "index3", null), "xf_staffcode", ""), "i", "")),
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
        var t = o.formatDate(new Date());
        this.setData({
            date: t,
            date2: t
        });
        var s = this;
        wx.getStorageSync("grade") ? wx.request({
            url: a.globalData.api + "wx_sestore.ashx",
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
            url: a.globalData.api + "checkstore.ashx",
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
            url: a.globalData.api + "wx_sestaff.ashx",
            data: {
                xf_storecode: e.data.store,
                userid: wx.getStorageSync("vipuserid"),
                i: e.data.i
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), e.setData({
                    picker4: t.data
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
            title: "请选择查询店铺",
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
            url: a.globalData.api + "wx_listsj.ashx",
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
            success: function(t) {
                console.log(t), t.data.length > 0 ? e.setData({
                    rejob: t.data,
                    countboy: t.data.length,
                    rv: !1
                }) : (e.setData([ e.setData({
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