var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabCur: 0,
        scrollLeft: 0,
        vipcode: "",
        vipname: "",
        grade: "",
        xf_plu: "",
        oldamtsold: 0,
        newamtsold: 0,
        replu: {},
        p: "",
        begindate: "",
        enddate: ""
    },
    onLoad: function(a) {
        a.xf_desci ? this.setData({
            p: "0"
        }) : this.setData({
            p: "1"
        }), this.setData({
            vipcode: a.vipcode,
            xf_desci: a.xf_desci,
            begindate: a.begindate,
            enddate: a.enddate,
            vipname: a.xf_surname
        });
    },
    onShow: function() {
        this.selectvip();
    },
    newvip: function() {
        var e = this;
        "0" == e.data.p ? wx.request({
            url: a.globalData.api + "wx_newvipsort.ashx",
            data: {
                vipcode: e.data.vipcode,
                xf_desci: e.data.xf_desci,
                begindate: e.data.begindate,
                enddate: e.data.enddate
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
                }), e.data.replu || wx.showModal({
                    title: "提示",
                    content: "没有记录！",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }));
            }
        }) : wx.request({
            url: a.globalData.api + "wx_newvipsku.ashx",
            data: {
                vipcode: e.data.vipcode,
                xf_plu: e.data.xf_plu
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
                }), e.data.replu || wx.showModal({
                    title: "提示",
                    content: "没有记录！",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }));
            }
        });
    },
    bijiao: function(a) {
        a.currentTarget.dataset.id ? (console.log(a.currentTarget.dataset.id), wx.navigateTo({
            url: "/pages/listprice/index/index?id=" + a.currentTarget.dataset.id
        })) : (console.log(a.currentTarget.dataset.xf_storecode), console.log(a.currentTarget.dataset.xf_qtysold), 
        console.log(a.currentTarget.dataset.xf_docno), console.log(a.currentTarget.dataset.xf_plu), 
        wx.navigateTo({
            url: "/pages/listprice/index/index?xf_plu=" + a.currentTarget.dataset.xf_plu + "&xf_amtsold=" + a.currentTarget.dataset.xf_amtsold
        }));
    },
    selectvip: function() {
        var e = this;
        "0" == e.data.p ? (wx.showLoading({
            title: "正在查询数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_oldvipsort.ashx",
            data: {
                vipcode: e.data.vipcode,
                xf_desci: e.data.xf_desci,
                begindate: e.data.begindate,
                enddate: e.data.enddate
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 && e.setData({
                    replu: a.data
                }), wx.hideLoading(), e.newvip();
            }
        })) : (wx.showLoading({
            title: "正在查询数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_seoldvipsku.ashx",
            data: {
                vipcode: e.data.vipcode,
                xf_plu: e.data.xf_plu
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? e.setData({
                    replu: a.data
                }) : e.setData({
                    replu: null
                }), wx.hideLoading(), e.newvip();
            }
        }));
    }
});