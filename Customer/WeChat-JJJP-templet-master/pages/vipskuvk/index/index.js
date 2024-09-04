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
        index: 0
    },
    onLoad: function(a) {
        this.setData({
            vipcode: a.vipcode,
            vipname: a.xf_surname,
            index: a.index
        });
    },
    onShow: function() {
        this.selectvip();
    },
    newvip: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: a.globalData.api + "wx_newvipvk.ashx",
            data: {
                vipcode: t.data.vipcode,
                index: t.data.index
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
                })), wx.hideLoading();
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
            title: "正在加载"
        }), wx.request({
            url: a.globalData.api + "wx_oldvipvk.ashx",
            data: {
                vipcode: t.data.vipcode,
                index: t.data.index
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