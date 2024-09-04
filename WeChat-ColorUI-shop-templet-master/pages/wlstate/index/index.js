var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    views: !0,
    states: "查看物流详情",
    css: "icon-unfold",
    expName: "",
    updateTime: "",
    deliverystatus: "",
    flags: !0,
    listwl: {},
    newstatus: "",
    kdnumber: "",
    sphone: "",
    kdgs: "",
    logo: "",
  },
  back: function () {
    wx.navigateBack({ delta: 0 });
  },
  onLoad: function (t) {
    t.sphone && this.setData({ sphone: t.sphone }),
      t.kdnumber && this.setData({ kdnumber: t.kdnumber });
  },
  cs: function () {
    this.data.views
      ? this.setData({ views: !1, states: "收起物流详情", css: "icon-fold" })
      : this.setData({ views: !0, states: "查看物流详情", css: "icon-unfold" });
  },
  onShow: function () {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "select_kd.aspx",
        data: { sphone: e.data.sphone, kdnumber: e.data.kdnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t);
          var s = t.data.replace(" ", "");
          s = s.replace(/\ufeff/g, "");
          var a = JSON.parse(s);
          console.log(a),
            console.log(a.result.expName),
            "0" == a.status
              ? (e.setData({
                  flags: !1,
                  expName: a.result.expName,
                  updateTime: a.result.updateTime,
                  number: a.result.number,
                  logo: a.result.logo,
                  newstatus: a.result.list[0].status,
                  listwl: a.result.list.splice(0, 1),
                }),
                e.setData({ listwl: a.result.list }),
                console.log(a.result.list),
                console.log(a.result.list.splice(0, 1)),
                console.log(e.data.listwl),
                "3" == a.result.deliverystatus
                  ? e.setData({ deliverystatus: "已签收" })
                  : "0" == a.result.deliverystatus
                  ? e.setData({ deliverystatus: "已揽件" })
                  : "1" == a.result.deliverystatus
                  ? e.setData({ deliverystatus: "在途中" })
                  : "2" == a.result.deliverystatus
                  ? e.setData({ deliverystatus: "正在派件" })
                  : "4" == a.result.deliverystatus
                  ? e.setData({ deliverystatus: "派送失败" })
                  : "5" == a.result.deliverystatus
                  ? e.setData({ deliverystatus: "疑难件" })
                  : "6" == a.result.deliverystatus
                  ? e.setData({ deliverystatus: "退件签收" })
                  : e.setData({ deliverystatus: "" }))
              : wx.showModal({
                  title: "提示",
                  content: "无法查询有效的信息，请核对后查询",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm && wx.navigateBack({ delta: 0 });
                  },
                }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
