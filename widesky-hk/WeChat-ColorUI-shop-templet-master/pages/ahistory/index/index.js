var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    replu: {},
    vipcode: "",
  },
  onLoad: function (a) {},
  search: function () {
    var t = this;
    wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_sehistory.ashx",
        data: {
          vipcode: this.data.vipcode,
          userid: wx.getStorageSync("userid"),
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            wx.hideLoading(),
            t.setData({ replu: a.data }),
            0 == a.data.length &&
              wx.showModal({
                title: "提示",
                content: "卡号不存在或输入错误",
                showCancel: !1,
                success: function (a) {
                  a.confirm;
                },
              });
        },
      });
  },
  getvipcode: function (a) {
    this.setData({ vipcode: a.detail.value }), console.log(this.data.vipcode);
  },
  onShow: function () {
    var t = this;
    wx.showLoading({ title: "数据加载中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_sehistory.ashx",
        data: { vipcode: "", userid: wx.getStorageSync("userid") },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a), wx.hideLoading(), t.setData({ replu: a.data });
        },
        complete: function () {},
      });
  },
});
