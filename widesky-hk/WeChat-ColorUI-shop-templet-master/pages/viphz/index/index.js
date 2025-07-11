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
        date: "",
        date2: "",
        picker3: [],
        index3: null,
        xf_staffcode: "",
        zhname: '',
        date: '2018-10-01',
        time: '12:00',
        dateTimeArray: null,
        dateTime: null,
        dateTimeArray1: null,
        dateTime1: null,
        dateTime2: null,
        dateTimeArray2: null,
        startYear: 2000,
        endYear: 2050,
        getdate1: '',
        getdate2: ''
    },

    changeDateTime1(e) {
        this.setData({
            dateTime1: e.detail.value
        });
    },
    changeDateTime2(e) {
        this.setData({
            dateTime2: e.detail.value
        });
    },
    changeDateTimeColumn1(e) {
        var arr = this.data.dateTime1,
            dateArr = this.data.dateTimeArray1;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray1: dateArr,
            dateTime1: arr
        });

        var getdate1 = this.data.dateTimeArray1[0][this.data.dateTime1[0]] + '-' + this.data.dateTimeArray1[1][this.data.dateTime1[1]] + '-' + this.data.dateTimeArray1[2][this.data.dateTime1[2]] + " " + this.data.dateTimeArray1[3][this.data.dateTime1[3]] + ':' + this.data.dateTimeArray1[4][this.data.dateTime1[4]];

        console.log(this.data.dateTimeArray1)
        console.log(getdate1)

        this.setData({

            getdate1: getdate1

        })

    },

    changeDateTimeColumn2(e) {
        var arr = this.data.dateTime2,
            dateArr = this.data.dateTimeArray2;

        arr[e.detail.column] = e.detail.value;
        dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray2: dateArr,
            dateTime2: arr
        });

        var getdate2 = this.data.dateTimeArray2[0][this.data.dateTime2[0]] + '-' + this.data.dateTimeArray2[1][this.data.dateTime2[1]] + '-' + this.data.dateTimeArray2[2][this.data.dateTime2[2]] + " " + this.data.dateTimeArray2[3][this.data.dateTime2[3]] + ':' + this.data.dateTimeArray2[4][this.data.dateTime2[4]];


        console.log(getdate2)

        this.setData({

            getdate2: getdate2

        })





    },


    onLoad: function (e) {



        // 获取完整的年月日 时分秒，以及默认显示的数组
        var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj1.dateTimeArray.pop();
        var lastTime = obj1.dateTime.pop();

        this.setData({
            dateTime: obj.dateTime,
            dateTimeArray: obj.dateTimeArray,
            dateTimeArray1: obj1.dateTimeArray,
            dateTime1: obj1.dateTime,
            dateTimeArray2: obj1.dateTimeArray,
            dateTime2: obj1.dateTime
        
        });

        var getdate1 = this.data.dateTimeArray1[0][this.data.dateTime1[0]] + '-' + this.data.dateTimeArray1[1][this.data.dateTime1[1]] + '-' + this.data.dateTimeArray1[2][this.data.dateTime1[2]] + " " + this.data.dateTimeArray1[3][this.data.dateTime1[3]] + ':' + this.data.dateTimeArray1[4][this.data.dateTime1[4]];


        var getdate2 = this.data.dateTimeArray2[0][this.data.dateTime2[0]] + '-' + this.data.dateTimeArray2[1][this.data.dateTime2[1]] + '-' + this.data.dateTimeArray2[2][this.data.dateTime2[2]] + " " + this.data.dateTimeArray2[3][this.data.dateTime2[3]] + ':' + this.data.dateTimeArray2[4][this.data.dateTime2[4]];

        console.log(getdate1)
        console.log(getdate2)

        this.setData({
            getdate1: getdate1,
            getdate2: getdate2

        })




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
    newsaleslist: function (a) {

        wx.navigateTo({
            url: "/pages/viphzlist/index/index?xf_storecode=" + a.currentTarget.dataset.xf_issuestore + "&zhname=" + this.data.zhname + "&begindate=" + this.data.getdate1 + "&enddate=" + this.data.getdate2
        })
    },
    checkinput: function () {
        console.log(this.data.getdate1)
        console.log(this.data.getdate2)

        if (this.data.zhname == '') {
            wx.showToast({
                title: "请选择展会活动",
                icon: "error",
                duration: 2e3
            })


        } else if (this.data.getdate1 == '') {
            wx.showToast({
                title: "请选择开始日期",
                icon: "error",
                duration: 2e3
            })


        } else if (this.data.getdate2 == '') {
            wx.showToast({
                title: "请选择截至日期",
                icon: "error",
                duration: 2e3
            })


        } else {

            var t = this;
            wx.request({
                url: a.globalData.api + "wx_listqd.ashx",
                data: {
                    zhname: t.data.zhname,
                    begindate: t.data.getdate1,
                    enddate: t.data.getdate2

                },
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                dataType: "json",
                success: function (a) {
                    console.log(a), a.data.length > 0 ? t.setData({
                        rejob: a.data,
                        gssum: a.data[0].GSSUM,
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