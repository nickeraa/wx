var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    vipcode: "",
    vipname: "",
    grade: "",
    date: "2022-01-01",
    date2: "2022-01-01",
    rejob: {},
    amtsold: "",
    rv: "true",
  },
  onLoad: function (a) {
    console.log(a.vipcode),
      this.setData({ vipcode: a.vipcode, vipname: a.vipname, grade: a.grade });
  },
  bindDateChange: function (a) {
    console.log(a.detail.value), this.setData({ date: a.detail.value });
  },
  bindDateChange2: function (a) {
    this.setData({ date2: a.detail.value });
  },
  selectvip: function () {
    this.setData({ rv: "true" });
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "qw_vipsales.ashx",
        data: {
          vipcode: t.data.vipcode,
          begindate: t.data.date,
          enddate: t.data.date2,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? t.setData({ rejob: a.data, amtsold: a.data[0].AMTSOLD, rv: "" })
              : (t.setData({ rejob: null, rv: "true" }),
                wx.showModal({
                  title: "提示",
                  content: "没有数据,请检查查询日期",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                })),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
