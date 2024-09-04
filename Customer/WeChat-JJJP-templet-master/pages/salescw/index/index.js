var a = getApp(), t = require("../../../utils/util.js");

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabCur: 0,
        scrollLeft: 0,
        flag: !0,
        date: "",
        date2: "",
        today_amt: 0,
        today_cost: 0,
        months_amt: 0,
        months_cost: 0,
        today_avgamt: 0,
        years_amt: 0,
        years_cost: 0,
        today_ml: 0,
        months_ml: 0,
        today_amts: 0,
        message: ""
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
    getDateStr: function(a, t) {
        var e;
        (e = a ? new Date(a) : new Date()).setDate(e.getDate() + t);
        var o = e.getFullYear(), s = e.getMonth() + 1, d = e.getDate();
        return s < 10 && (s = "0" + s), d < 10 && (d = "0" + d), console.log(o + "-" + s + "-" + d), 
        o + "-" + s + "-" + d;
    },
    onLoad: function(a) {
        t.formatDate(new Date());
        this.setData({
            date: this.getDateStr(null, -1),
            date2: this.getDateStr(null, -1)
        }), console.log(this.data.date);
    },
    onShow: function() {},
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    copyBtn: function() {
        wx.setClipboardData({
            data: this.data.message,
            success: function(a) {
                wx.showToast({
                    title: "复制成功",
                    icon: "none",
                    mask: "true"
                });
            }
        });
    },
    secw: function() {
        this.setData({
            flag: !0
        });
        var t = this;
        wx.request({
            url: a.globalData.api + "wx_secw.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? (t.setData({
                    flag: !1,
                    today_amt: a.data[0].TODAY_AMT,
                    today_cost: a.data[0].TODAY_COST,
                    months_amt: a.data[0].MONTHS_AMT,
                    months_cost: a.data[0].MONTHS_COST,
                    today_avgamt: (parseFloat(parseFloat(a.data[0].TODAY_AVGAMT.replace(/,/g, ""))) / 1e4).toFixed(2) + "万",
                    years_amt: a.data[0].YEARS_AMT,
                    years_cost: a.data[0].YEARS_COST,
                    today_ml: (parseFloat(parseFloat(a.data[0].TODAY_ML)) / 1e4).toFixed(2) + "万",
                    months_ml: (parseFloat(parseFloat(a.data[0].MONTHS_ML)) / 1e4).toFixed(2) + "万",
                    years_ml: a.data[0].YEARS_ML,
                    today_amts: (parseFloat(parseFloat(a.data[0].TODAY_AMT.replace(/,/g, ""))) / 1e4).toFixed(2) + "万",
                    months_amts: (parseFloat(parseFloat(a.data[0].MONTHS_AMT.replace(/,/g, ""))) / 1e4).toFixed(2) + "万"
                }), console.log("ddddddd"), console.log(t.data.months_amt), console.log(a.data[0].MONTHS_AMT.replace(",", "")), 
                a.data[0].TODAY_AMT || t.setData({
                    today_amt: 0,
                    today_cost: 0
                }), t.setData({
                    message: "林总早晨！ " + t.data.date + " 日预计数据如下：毛利率" + t.data.today_cost + "（收入" + t.data.today_amts + "、毛利额" + t.data.today_ml + "），本月累计毛利率" + t.data.months_cost + "（收入" + t.data.months_amts + "、毛利额" + t.data.months_ml + "，日均收入" + t.data.today_avgamt + "），本年累计毛利率" + t.data.years_cost + "。谢谢！"
                }), console.log(t.data.message)) : t.setData({
                    flag: !0
                });
            }
        });
    }
});