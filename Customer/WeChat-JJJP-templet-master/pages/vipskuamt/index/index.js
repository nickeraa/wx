var e, t = require("../../../@babel/runtime/helpers/defineProperty"), a = getApp();

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
        xf_plu: "",
        xf_qty: "",
        vipcode: "",
        vipname: "",
        xf_vicode: "",
        xf_surname: "",
        grade: "",
        xf_stores: "",
        xf_issuedate: "",
        xf_users: "",
        xf_username: "",
        xf_bonus: "",
        check: "true",
        check1: "true",
        setype: "1",
        picker2: [],
        index2: null,
        picker3: [],
        index3: null
    }, t(t(t(t(t(t(t(t(t(t(e, "xf_plu", ""), "xf_desci", ""), "userid", ""), "view", !0), "snumber", ""), "flag", !0), "store", ""), "storename", ""), "array", [ "单次消费满3千以上（V客）", "当月同一店铺累计消费满1万以上（A客）", "银卡会员", "金卡会员", "钻卡会员" ]), "index", 0), 
    t(t(t(t(t(t(e, "rv", !0), "countboy", 0), "picker4", []), "index4", null), "xf_staffcode", ""), "i", "")),
    onLoad: function(e) {
        var t = this;
        wx.request({
            url: a.globalData.api + "wx_group.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), t.setData({
                    picker2: e.data
                }), wx.getStorageSync("grade") ? wx.request({
                    url: a.globalData.api + "wx_sestore.ashx",
                    data: {},
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    dataType: "json",
                    success: function(e) {
                        console.log(e), t.setData({
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
                        console.log(e), t.setData({
                            picker3: e.data
                        });
                    }
                });
            }
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    getsnumber: function(e) {
        this.setData({
            snumber: e.detail.value
        });
    },
    bindPickerChange3: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index3: e.detail.value,
            store: this.data.picker3[e.detail.value].XF_STORECODE,
            storename: this.data.picker3[e.detail.value].XF_NAME
        }), this.sestaff();
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
    bindPickerChange4: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index4: e.detail.value,
            xf_staffcode: this.data.picker4[e.detail.value].XF_STAFFCODE
        }), console.log(this.data.xf_staffcode);
    },
    onShow: function(e) {},
    saleslist: function(e) {
        console.log(e.currentTarget.dataset.xf_vipcode), wx.navigateTo({
            url: "/pages/vipsaless/index/index?vipcode=" + e.currentTarget.dataset.xf_vipcode
        });
    },
    checkinput: function() {
        this.vip_sku();
    },
    bindPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index: e.detail.value
        });
    },
    vip_sku: function() {
        if (wx.getStorageSync("qguserid")) {
            if ("" == this.data.store) return wx.showToast({
                title: "请选择查询店铺",
                icon: "none",
                duration: 2e3
            }), !1;
            if ("" == this.data.xf_staffcode) return wx.showToast({
                title: "请选择查询员工",
                icon: "none",
                duration: 2e3
            }), !1;
        }
        if (null == this.data.index) return wx.showModal({
            title: "提示",
            content: "请选择消费等级",
            showCancel: !1,
            success: function(e) {
                e.confirm;
            }
        }), !1;
        var e = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_sevipvk.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid"),
                store: e.data.store,
                index: e.data.index,
                xf_staffcode: e.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), t.data.length > 0 ? e.setData({
                    rejob: t.data,
                    flag: !1,
                    rv: !1,
                    countboy: t.data.length
                }) : (e.setData({
                    rejob: null
                }), wx.showModal({
                    title: "提示",
                    content: "没有记录",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm;
                    }
                })), wx.hideLoading();
            }
        });
    }
});