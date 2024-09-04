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
        replu: {},
        begindate: "",
        enddate: ""
    },
    onLoad: function(a) {
        this.setData({
            vipcode: a.vipcode,
            vipname: a.xf_surname,
            begindate: a.begindate,
            enddate: a.enddate
        });
    },
    onShow: function() {
        this.selectvip();
    },
    selectvip: function() {
        var e = this;
        wx.showLoading({
            title: "正在查询数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_seviplist.ashx",
            data: {
                vipcode: e.data.vipcode,
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
                }), wx.hideLoading();
            }
        });
    }
});