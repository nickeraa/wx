var a = getApp(),
  t = require("../../../utils/util.js");
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    replu: {},
    index2: null,
    picker2: [],
    flag: !0,
    cqbody: "",

    date: "2024-01-01",
    date2: "",
  },
  onLoad: function (a) {
    var e = t.formatDate(new Date());
    this.setData({ date2: e }),
      a.itemname &&
        (this.setData({ itemname: a.itemname }),
        console.log(this.data.itemname));
  },
  bindDateChange: function (a) {
    console.log(a.detail.value), this.setData({ date: a.detail.value });
  },
  bindDateChange2: function (a) {
    this.setData({ date2: a.detail.value });
  },

  back: function () {
    wx.redirectTo({
   url: "/pages/store/index/index" });
  },



  onShow: function () {

  },
  search: function (t) {
 
    
    var e = this;
  
    wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_secqsum.ashx",
        data: {
        
          begindate: e.data.date,
          enddate: e.data.date2,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? e.setData({ replu: a.data, flag: false,cqbody:a.data[0].CQBODY})
              : wx.showModal({
                  title: "提示",
                  content: "没有数据",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm && e.setData({ flag: !0 });
                  },
                }),
            wx.hideLoading();
        },
      });
  },


  tslist: function (t) {
 
    wx.navigateTo({
      url: '/pages/cqlist/index/index?begindate='+this.data.date+'&enddate='+this.data.date2+'&cqbody='+this.data.cqbody
    })
  
  },




});
