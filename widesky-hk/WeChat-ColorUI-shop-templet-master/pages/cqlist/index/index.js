var e = require("../../../@babel/runtime/helpers/defineProperty"), t = getApp(), a = require("../../../utils/util.js");

Page({
    data: e(e(e(e(e(e(e(e(e(e({
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        TabbarBot: t.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
    
        rv: !0,
    
        cqbody:'',
    
        xf_bonus: ""
    }, "xf_plu", ""), "xf_desci", ""), "userid", ""), "snumber", ""), "store", ""), "storename", ""), "xf_name", ""), "xf_staffcode", ""), "begindate", ""), "enddate", ""),
    onLoad: function(e) {
        e && this.setData({
     
            begindate: e.begindate,
            enddate: e.enddate,
            cqbody:e.cqbody
        
        }),  console.log(this.data.begindate),console.log(this.data.enddate),console.log(this.data.cqbody);
    },
    onShow: function(e) {
        var a = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: t.globalData.api + "wx_cqlist.ashx",
            data: {
                begindate: a.data.begindate,
                enddate: a.data.enddate,
                cqbody: a.data.cqbody
               
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), e.data.length > 0 ? a.setData({
                    rejob: e.data
                }) : (a.setData({
                    rejob: null
             
                }), wx.showToast({
                    title: "没有记录",
                    icon: "none",
                    duration: 2e3
                })), wx.hideLoading();
            }
        });
    },
    cqlist: function(e) {
        wx.navigateTo({
            url: "/pages/cqnumber/index/index?cqnumber=" + e.currentTarget.dataset.cqnumber
        });
    },
   
  
});