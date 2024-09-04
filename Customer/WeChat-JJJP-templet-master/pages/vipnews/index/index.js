var e = require("../../../@babel/runtime/helpers/defineProperty"), t = getApp(), a = require("../../../utils/util.js");

Page({
    data: e(e(e(e(e(e(e(e(e(e({
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
    }, "xf_plu", ""), "xf_desci", ""), "userid", ""), "snumber", ""), "store", ""), "storename", ""), "xf_name", ""), "xf_staffcode", ""), "begindate", ""), "enddate", ""),
    onLoad: function(e) {
        e && this.setData({
            xf_staffcode: e.xf_staffcode,
            xf_storecode: e.xf_issuestore,
            begindate: e.begindate,
            enddate: e.enddate,
            ygsum: e.ygsum,
            xf_name: e.xf_name
        }), console.log("cccccccccccccc"), console.log(this.data.xf_storecode);
    },
    onShow: function(e) {
        var a = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: t.globalData.api + "wx_newvip.ashx",
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
    },
    newsaleslist: function(e) {
        wx.navigateTo({
            url: "/pages/vipnewlist/index/index?vipcode=" + e.currentTarget.dataset.xf_vipcode + "&xf_surname=" + e.currentTarget.dataset.xf_surname + "&begindate=" + this.data.begindate + "&enddate=" + this.data.enddate
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