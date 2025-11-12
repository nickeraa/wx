var t = require("../../../@babel/runtime/helpers/defineProperty"), e = getApp();
var s = require("../../../utils/util.js");

Page(t(t({
    data: {
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        TabbarBot: e.globalData.tabbar_bottom,
        jimg:e.globalData.imgUrl+'1.png',
        yimg:e.globalData.imgUrl+'2.png',
        timg:e.globalData.imgUrl+'3.png',
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        date: "",
        flag1: true,
        flag2: true,
        isChecked1: "",
        isChecked2: "",
        flags:true,
        setype:''
    },
    onLoad: function(t) {
console.log(this.data.jimg)
        var e = s.formatDate(new Date());
        this.setData({
            date: e.substring(0, 7)+'月',
       
        }), console.log(this.data.date);


    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    bindDateChange: function(t) {
        console.log(t.detail.value), this.setData({
            date: t.detail.value.substring(0, 7)+'月'
        });
    },

    radioChange: function(t) {
        console.log("radior发送选择改变，携带值为", t.detail.value), 
        this.setData({
            setype: t.detail.value
        })
        if("0" == this.data.setype )
        {
            this.setData({
                flag1: false,
                flag2:true
            })

        }
        else{
              
            this.setData({
            flag1: true,
            flag2:false
        }) 
    }
    },
    onShow: function(t) {},

    ygxs: function(a) {

        var t = this;
        wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: e.globalData.api + "wx_ygzbph.ashx",
            data: {
                begindate: t.data.date.replace('月',''),
                tag: t.data.setype
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), wx.hideLoading({}), console.log(a.data.length), a.data.length > 0 ? t.setData({
                    rejob: a.data,
                    flags: !1
                }) : t.setData({
                    rejob: null,
                    flags: !0
                });
            }
        });
    },




}, ), ));