var e, a = require("../../../@babel/runtime/helpers/defineProperty"), t = getApp();

require("../../../utils/util.js");

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
    }, a(a(a(a(a(a(a(a(a(a(e, "xf_plu", ""), "xf_desci", ""), "ygamt", ""), "userid", ""), "snumber", ""), "store", ""), "storename", ""), "xf_name", ""), "xf_staffcode", ""), "begindate", ""), 
    a(e, "enddate", "")),
    onLoad: function(e) {
        e && this.setData({
            xf_staffcode: e.xf_staffcode,
            xf_storecode: e.xf_storecode,
            begindate: e.begindate,
            enddate: e.enddate,
            ygamt: e.ygamt,
            xf_name: e.xf_name
        });
    },
    onShow: function(e) {
        var a = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: t.globalData.api + "wx_ygamt.ashx",
            data: {
                begindate: a.data.begindate,
                enddate: a.data.enddate,
                staffcode: a.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), e.data.length > 0 ? a.setData({
                    rejob: e.data
                }) : (a.setData({
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