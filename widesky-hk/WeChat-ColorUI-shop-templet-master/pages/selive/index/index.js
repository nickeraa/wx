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
        dpsum: "",
        gssum: "",
        p: 0,
        weburl:"https://widesky.work/",
        picker3: [],
        index3: null,
        xf_staffcode: "",
        zbname: '',
        yguserid: ''

    },

    getyguserid(e)
    {

        this.setData({ yguserid: e.detail.value }), console.log(this.data.yguserid);


    },
    
    onLoad: function (e) {

        this.setData({

            yguserid: wx.getStorageSync('userid')

        })


        var d = this;
        wx.request({
            url: a.globalData.api + "wx_livezb.ashx",
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

            zbname: this.data.picker3[a.detail.value].TITLE
        });
    },
    onShow: function (a) {},

    checkinput: function () {

        if (this.data.zbname == '') {
            wx.showToast({
                title: "请选择直播活动",
                icon: "error",
                duration: 2e3
            })


        } else if (this.data.yguserid == '') {
            wx.showToast({
                title: "请输入员工ID",
                icon: "error",
                duration: 2e3
            })


        } else {

            wx.showLoading({ title: "数据加载中", mask: !0 });
            var t = this;
            wx.request({
                url: a.globalData.api + "wx_listzb.ashx",
                data: {
                    zbname: t.data.zbname,
                    yguserid:t.data.yguserid

                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                dataType: "json",
                success: function (a) {
                    console.log(a), a.data.length > 0 ? t.setData({
                        rejob: a.data,
                    
                        rv: !1
                    }) : (t.setData({
                        rv: !0,
                        rejob: null
                    }), wx.showToast({
                        title: "没有记录",
                        icon: "none",
                        duration: 2e3
                    }))

                    wx.hideLoading();
                }
            });
        }
    },

});