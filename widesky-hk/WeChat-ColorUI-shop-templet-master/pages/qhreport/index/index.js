var a = getApp(),
  t = require("../../../utils/util.js");
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
    scimgurl: a.globalData.scimgUrl,
    TabCur: 0,
    scrollLeft: 0,
    replu: {},
    i: "",
    userid: "",
phone:'',
    p: "",
    date: "",
    date2: "",
    index: 0,
    snumber: "",


    xf_staffcode: "",
  },

  bindDateChange: function (a) {
    console.log(a.detail.value), this.setData({ date: a.detail.value });
  },
  bindDateChange2: function (a) {
    this.setData({ date2: a.detail.value });
  },

  getphone: function (a) {
    this.setData({ phone: a.detail.value });
  },


  onLoad: function (e) {
    var s = t.formatDate(new Date());
    this.setData({ date: "2025-01-01", date2: s })
   
    
  },


  back: function () {
    wx.navigateBack({ delta: 0 });
  },

  onShow: function (a) {},


  vip_sort: function (t) {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_qhsclist.ashx",
        data: {
          wxuserid: e.data.phone,   
          begindate: e.data.date,
          enddate: e.data.date2,
        
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a.data.items),
            wx.hideLoading(),
            a.data.items.length > 0
              ? e.setData({ replu: a.data.items })
              : (e.setData({ replu: null }),
                wx.showToast({
                  title: "没有符合条件的记录",
                  icon: "none",
                  duration: 2e3,
                }));
        },
      });
  },
});
