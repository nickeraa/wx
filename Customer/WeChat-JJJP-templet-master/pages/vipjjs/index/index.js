var t = require("../../../@babel/runtime/helpers/defineProperty"), e = getApp(), a = require("../../../utils/util.js");

Page({
    data: t(t(t(t(t(t(t(t(t(t({
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        TabbarBot: e.globalData.tabbar_bottom,
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
    onLoad: function(t) {
        t && this.setData({
            xf_staffcode: t.xf_staffcode,
            xf_storecode: t.xf_issuestore,
            begindate: t.begindate,
            enddate: t.enddate,
            ygsum: t.ygsum,
            xf_name: t.xf_name
        });
    },
    onShow: function(t) {
        var a = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: e.globalData.api + "wx_listsj.ashx",
            data: {
                begindate: a.data.begindate,
                enddate: a.data.enddate,
                storecode: a.data.xf_storecode,
                xf_staffcode: a.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), t.data.length > 0 ? a.setData({
                    rejob: t.data
                }) : (a.setData({
                    rejob: null
                }), wx.showToast({
                    title: "没有记录",
                    icon: "none",
                    duration: 2e3
                })), wx.hideLoading();
            }
        });
    },
    newsaleslist: function(t) {
        wx.navigateTo({
            url: "/pages/vipnewlist/index/index?vipcode=" + t.currentTarget.dataset.xf_vipcode + "&xf_surname=" + t.currentTarget.dataset.xf_surname + "&begindate=" + this.data.begindate + "&enddate=" + this.data.enddate
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
        }), !1) : this.data.date == a.formatDate(new Date()) ? (wx.showToast({
            title: "请选择查询日期",
            icon: "none",
            duration: 2e3
        }), !1) : void this.vip_sort();
    },
    vip_sort: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: e.globalData.api + "wx_newvip.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                storecode: t.data.store,
                xf_staffcode: t.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), e.data.length > 0 ? t.setData({
                    rejob: e.data,
                    countboy: e.data.length,
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