var a = getApp()

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabbarBot: a.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        zhname: '',
        begindate: '',
        enddate: '',
        xf_storecode: ''
    },

    onLoad: function (e) {

        this.setData({
            xf_storecode: e.xf_storecode,
            begindate: e.begindate,
            enddate: e.enddate,
            zhname: e.zhname
      
        })

console.log(this.data.xf_storecode+this.data.begindate+this.data.enddate+this.data.zhname)


    },
    back: function () {
        wx.navigateBack({
            delta: 1
        });
    },

    onShow() {

        var d = this;
        wx.request({
            url: a.globalData.api + "wx_listvipqd.ashx",
            data: {
                zhname: d.data.zhname,
                xf_storecode: d.data.xf_storecode,
                begindate: d.data.begindate,
                enddate: d.data.enddate

            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function (a) {
                console.log(a.data), d.setData({
                    rejob: a.data
                });
            }
        })


    },



});