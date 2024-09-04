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
        rejob: {}
    },
    onLoad: function(a) {
        this.setData({
            vipcode: a.vipcode,
            xf_plu: a.xf_plu,
            vipname: a.xf_surname
        });
    },
    onShow: function() {
        this.selectvip();
    },
    newvip: function() {
        var t = this;
        wx.request({
            url: a.globalData.api + "wx_newvipsku.ashx",
            data: {
                vipcode: t.data.vipcode,
                xf_plu: t.data.xf_plu
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? t.setData({
                    rejob: a.data
                }) : (t.setData({
                    rejob: null
                }), t.data.replu || wx.showModal({
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
        var t = this;
        wx.showLoading({
            title: "正在查询数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_seoldvipsku.ashx",
            data: {
                vipcode: t.data.vipcode,
                xf_plu: t.data.xf_plu
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? t.setData({
                    replu: a.data
                }) : t.setData({
                    replu: null
                }), wx.hideLoading(), t.newvip();
            }
        });
    }
});