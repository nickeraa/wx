var a = getApp(),
    t = require("../../../utils/util.js");

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
        czamtsold: ''
    },
    bindDateChange: function (a) {
        console.log(a.detail.value), this.setData({
            date: a.detail.value
        });
    },
    bindDateChange2: function (a) {
        this.setData({
            date2: a.detail.value
        });
    },
    bindPickerChange2: function (a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index2: a.detail.value,
            store: this.data.picker2[a.detail.value].XF_STORECODE,
            storename: this.data.picker2[a.detail.value].XF_NAME
        });
    },
    onLoad: function (a) {
        var e = t.formatDate(new Date());
        this.setData({
            date: e.substring(0, 8) + "01",
            date2: e
        }), console.log(this.data.date);
    },
    onShow: function () {

    },
    back: function () {
        wx.navigateBack({
            delta: 1
        });
    },
    selectvip: function () {

        var t = this;
        wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: a.globalData.api + "wx_dpwczb.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                xf_storecode: t.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function (res) {
                console.log(res.data), res.data.length > 0 ? (t.setData({

                    flag: !1,
                    rejob: res.data
                })) : (wx.showToast({
                    title: "没有数据",
                    icon: "none",
                    duration: 2e3
                }), t.setData({
                    zamtsold: "",
                    flag: !0
                }));
                wx.hideLoading()

            }
        });
    },


});