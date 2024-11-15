var a = getApp(), t = require("../../../utils/util.js");

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabCur: 0,
        scrollLeft: 0,
        vipcode: "",
        vipname: "",
        grade: "",
        date: "",
        date2: "",
        rejob: {},
        flag: !0,
        index2: null,
        picker2: [],
        store: "",
        storename: "",
        djamt: "",
        yfamt: "",
        sqamt: "",
        czamtsold: ""
    },
    bindDateChange: function(a) {
        console.log(a.detail.value), this.setData({
            date: a.detail.value
        });
    },
    bindDateChange2: function(a) {
        this.setData({
            date2: a.detail.value
        });
    },
    onLoad: function(a) {
        var e = t.formatDate(new Date());
        this.setData({
            date: e.substring(0, 8) + "01",
            date2: e
        }), console.log(this.data.date);
    },
    onShow: function() {},
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    selectvip: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: a.globalData.api + "wx_dpdj.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), wx.hideLoading(), a.data.length > 0 ? (t.setData({
                    djamt: a.data[0].AMTSOLD,
                    sqamt: a.data[0].SQJE,
                    flag: !1
                }), t.dpdj()) : (wx.showToast({
                    title: "没有数据！",
                    icon: "none",
                    duration: 2e3
                }), t.setData({
                    flag: !0
                }));
            }
        });
    },
    dpdj: function(t) {
        var e = this;
        wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: a.globalData.api + "wx_listdpdj.ashx",
            data: {
                begindate: e.data.date,
                enddate: e.data.date2
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), wx.hideLoading(), a.data.length > 0 ? (e.setData({
                    rejob: a.data
                }),e.djc()) : (wx.showToast({
                    title: "没有数据！",
                    icon: "none",
                    duration: 2e3
                }), e.setData({
                    flag: !0
                }));
            }
        });
    },

djc()
{


    var t = this;
    wx.showLoading({
        title: "正在汇总"
    }),
    wx.request({
        url: a.globalData.api + "wx_dpdjc.ashx",
        data: {
            begindate: t.data.date,
            enddate: t.data.date2
         
        },
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function(res) {
            console.log(res), res.data.length > 0 ? t.setData({
                czamtsold:res.data[0].AMTSOLD+'('+(res.data[0].AMTSOLD/t.data.djamt*100).toFixed(2)+'%'+')'
            }) : t.setData({
                czamtsold: ""
            });

            wx.hideLoading()
        }
    });



},


    djlist: function(a) {
        wx.navigateTo({
            url: "/pages/yddps/index/index?xf_storecode=" + a.currentTarget.dataset.xf_storecode + "&begindate=" + this.data.date + "&enddate=" + this.data.date2 + "&amtsold=" + a.currentTarget.dataset.amtsold + "&xf_name=" + a.currentTarget.dataset.xf_name
        });
    }
});