var a = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page({
  data: 
          {
            StatusBar: e.globalData.StatusBar,
            CustomBar: e.globalData.CustomBar,
            date1:"",
            date2:"",
            itemname:"",
            ret:{}
          },
    
  senumber: function (a) {
    wx.showLoading({ title: "正在查询", mask: !0 });
    var t = this;
    wx.request({
      url: e.globalData.api + "gt_stock_saleslist.ashx",
      data: { xf_plu: t.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          t.setData({ results: a.data, view: "" }),
          wx.hideLoading();
      },
    });
  },
  onLoad: function (a) {
    this.setData({ date1: a.date1,date2: a.date2, itemname: a.itemname }),
    console.log(this.data.date1);
    console.log(this.data.date2);
      console.log(this.data.itemname);
  },
  onShow: function (a) {

    wx.showLoading({ title: "正在查询", mask: !0 });
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_hzlist.ashx",
      data: { itemname: t.data.itemname,begindate:t.data.date1,enddate:t.data.date2 },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), t.setData({ ret: a.data }), wx.hideLoading();
      },
    });
    
  },
});
