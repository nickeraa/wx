var a, e = require("../../../@babel/runtime/helpers/defineProperty"), t = getApp();

require("../../../utils/util.js");

Page({
    data: (a = {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        TabbarBot: t.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        ret: {},
        restt: {},
        rv: !0,
        ygsum: "",
        xf_storecode: "",
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
    }, e(e(e(e(e(e(e(e(e(e(a, "xf_plu", ""), "xf_desci", ""), "ygamt", ""), "userid", ""), "snumber", ""), "store", ""), "storename", ""), "xf_name", ""), "xf_staffcode", ""), "begindate", ""), 
    e(a, "enddate", "")),
    onLoad: function(a) {
        a && this.setData({
            xf_staffcode: a.xf_staffcode,
            begindate: a.begindate,
            enddate: a.enddate,
            ygamt: a.ygamt,
            xf_name: a.xf_name
        });
    },
    onShow: function(a) {
        var e = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: t.globalData.api + "wx_ygdjlist.ashx",
            data: {
                begindate: e.data.begindate,
                enddate: e.data.enddate,
                staffcode: e.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? e.setData({
                    rejob: a.data
                }) : (e.setData({
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