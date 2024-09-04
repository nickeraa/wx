var e, t = require("../../../@babel/runtime/helpers/defineProperty"), a = getApp();

require("../../../utils/util.js");

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
        rv: !0,
        countboy: "",
        xf_store: "",
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
    }, t(t(t(t(t(t(t(t(t(t(e, "xf_plu", ""), "xf_desci", ""), "userid", ""), "snumber", ""), "store", ""), "storename", ""), "picker4", []), "index4", null), "picker3", []), "index3", null), 
    t(e, "xf_staffcode", "")),
    onLoad: function(e) {
        var t = this;
        wx.getStorageSync("grade") ? wx.request({
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
        });
    },
    onShow: function(e) {},
    newsaleslist: function(e) {
        wx.showModal({
            title: "提示",
            content: "超过1千条数据将无法显示",
            showCancel: !0,
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "/pages/vipwxlist/index/index?xf_staffcode=" + e.currentTarget.dataset.xf_staffcode
                });
            }
        });
    },
    checkinput: function() {
        if (this.setData({
            rejob: null
        }), "" == this.data.store) return wx.showToast({
            title: "请选择查询店铺",
            icon: "none",
            duration: 2e3
        }), !1;
        this.vip_sort();
    },
    vip_sort: function() {
        var e = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_dpwx.ashx",
            data: {
                xf_storecode: e.data.store
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