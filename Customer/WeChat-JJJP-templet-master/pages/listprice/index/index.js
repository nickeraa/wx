var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        rest: {},
        id: "",
        xf_qtysold: "",
        xf_docno: "",
        xf_storecode: "",
        xf_plu: "",
        xf_amtsold: ""
    },
    onLoad: function(a) {
        console.log(a.id), console.log(a.xf_plu), console.log(a.xf_amtsold), a.id ? this.setData({
            id: a.id
        }) : this.setData({
            xf_plu: a.xf_plu,
            xf_amtsold: a.xf_amtsold
        });
    },
    onShow: function() {
        var t = this;
        wx.request({
            url: a.globalData.api + "xf_bjprice.ashx",
            data: {
                id: t.data.id,
                xf_plu: t.data.xf_plu,
                xf_amtsold: t.data.xf_amtsold
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? t.setData({
                    rest: a.data
                }) : wx.showModal({
                    title: "提示",
                    content: "没有记录！",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }), wx.hideLoading();
            },
            complete: function() {}
        });
    }
});