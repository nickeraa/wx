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
        setype: "1",
        picker2: [],
        index2: null,
        picker3: [],
        index3: null
    }, t(t(t(t(t(t(t(t(t(t(e, "xf_plu", ""), "xf_desci", ""), "userid", ""), "view", !0), "snumber", ""), "store", ""), "storename", ""), "picker4", []), "index4", null), "xf_staffcode", ""), 
    t(e, "flag", !0)),
    onLoad: function(e) {},
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
    sesnumber: function(e) {
        wx.navigateTo({
            url: "/pages/ygskuyd/index/index?xf_plu=" + e.currentTarget.dataset.xf_plu + "&xf_desci=" + e.currentTarget.dataset.xf_desci
        });
    },
    onShow: function(e) {},
    search: function() {
        "" == this.data.snumber ? wx.showToast({
            title: "请输入货品名称或货号查询",
            icon: "none",
            duration: 1e3
        }) : this.senumber();
    },
    senumber: function(e) {
        var t = this;
        wx.showLoading({
            title: "正在查询",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_hksystem_seprice.ashx",
            data: {
                snumber: t.data.snumber
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), wx.hideLoading(), 0 == e.data.length ? wx.showModal({
                    title: "提示",
                    content: "货品名称或货号不存在",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && t.setData({
                            view: "true",
                            flag: !0
                        });
                    }
                }) : t.setData({
                    result: e.data,
                    view: "",
                    flag: !0
                }), wx.hideLoading();
            }
        });
    }
});