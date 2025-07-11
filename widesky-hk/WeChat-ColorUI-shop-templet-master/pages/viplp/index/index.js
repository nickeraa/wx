var a = getApp(),
    dateTimePicker = require("../../../utils/dateTimePicker.js");

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabbarBot: a.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        rv: !0,
        index3:'',
        sumff: "",
        sumhb: "",
        zhname: ''
    },



    onLoad: function (e) {

        var d = this;
        wx.request({
            url: a.globalData.api + "wx_listzhqd.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function (a) {
                console.log(a.data), d.setData({
                    picker3: a.data
                });
            }
        })
    },
    back: function () {
        wx.navigateBack({
            delta: 1
        });
    },
    bindPickerChange3: function (a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index3: a.detail.value,

            zhname: this.data.picker3[a.detail.value].ZHNAME
        });
    },
    onShow: function (a) {},

    checkinput: function () {


        if (this.data.zhname == '') {
            wx.showToast({
                title: "请选择展会活动",
                icon: "error",
                duration: 2e3
            })


        }  else {

            var t = this;
            wx.request({
                url: a.globalData.api + "wx_zhlp.ashx",
                data: {
                    zhname: t.data.zhname

                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                dataType: "json",
                success: function (a) {
                    console.log(a), a.data.length > 0 ? t.setData({
                        rejob: a.data,
                        sumff: a.data[0].SUMFF,
                        sumhb: a.data[0].SUMHB,
                        rv: !1
                    }) : (t.setData({
                        rv: !0,
                        rejob: null
                    }), wx.showToast({
                        title: "没有记录",
                        icon: "none",
                        duration: 2e3
                    }))
                }
            });
        }
    },

});