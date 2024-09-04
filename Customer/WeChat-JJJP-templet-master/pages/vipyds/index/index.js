var e = require("../../../@babel/runtime/helpers/defineProperty"), a = getApp();

require("../../../utils/util.js");

Page({
    data: e(e(e(e(e(e(e(e(e(e({
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabbarBot: a.globalData.tabbar_bottom,
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
    }, "xf_plu", ""), "xf_desci", ""), "userid", ""), "snumber", ""), "store", ""), "storename", ""), "xf_name", ""), "xf_staffcode", ""), "begindate", ""), "enddate", ""),
    onLoad: function(e) {
        e && this.setData({
            xf_staffcode: e.xf_staffcode,
            xf_storecode: e.xf_storecode,
            begindate: e.begindate,
            enddate: e.enddate,
            ygsum: e.ygsum,
            xf_name: e.xf_name
        });
    },
    onShow: function(e) {
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_vipyd.ashx",
            data: {
                begindate: t.data.begindate,
                enddate: t.data.enddate,
                storecode: t.data.xf_storecode,
                xf_staffcode: t.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), e.data.length > 0 ? t.setData({
                    rejob: e.data
                }) : (t.setData({
                    rejob: null
                }), wx.showToast({
                    title: "没有记录",
                    icon: "none",
                    duration: 2e3
                })), wx.hideLoading();
            }
        });
    },
    newsaleslist: function(e) {
        wx.navigateTo({
            url: "/pages/vipnewlist/index/index?vipcode=" + e.currentTarget.dataset.xf_vipcode + "&xf_surname=" + e.currentTarget.dataset.xf_surname + "&begindate=" + this.data.begindate + "&enddate=" + this.data.enddate
        });
    }
});