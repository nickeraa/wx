var a = getApp(),
  t = require("../../../utils/util.js");
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    vipcode: "",
    vipname: "",
    grade: "",
    date: "",
    date2: "",
    rejob: {},
    oldamtsold: 0,
    newamtsold: 0,
    amtsold: 0,
    rv: "true",
    replu: {},
    picker2: [],
    index2: null,
    xf_plu: "",
    sexf_plu: "",
    xf_desci: "",
  },
  onLoad: function (a) {
    var e = t.formatDate(new Date());
    this.setData({ date: e, date2: e }), this.setData({ vipcode: a.vipcode });
  },
  getsnumber: function (a) {
    this.setData({ sexf_plu: a.detail.value }),
      console.log("picker发送选择改变，携带值为", a.detail.value);
  },
  bindPickerChange2: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index2: a.detail.value,
        xf_desci: this.data.picker2[a.detail.value].XF_DESCI,
      }),
      console.log("picker发送选择改变，携带值为", this.data.xf_desci);
  },
  copyBtn: function () {
    wx.setClipboardData({
      data: this.data.vipcode,
      success: function (a) {
        wx.showToast({ title: "复制成功", icon: "none", mask: "true" });
      },
    });
  },
  onShow: function () {
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "gt_checkvip.ashx",
        data: { vipcode: t.data.vipcode },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            t.setData({
              vipname: a.data[0].XF_SURNAME,
              grade: a.data[0].GRADE,
            }),
            wx.hideLoading(),
            t.sesort();
        },
        complete: function () {},
      });
  },
  sesort: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_group.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), t.setData({ picker2: a.data });
        t.data.picker2.push({ XF_CODE: "999", XF_DESCI: "全部类别" }),
          console.log(t.data.picker2),
          t.setData({ picker2: t.data.picker2 });
      },
    });
  },
  bindDateChange: function (a) {
    console.log(a.detail.value), this.setData({ date: a.detail.value });
  },
  bindDateChange2: function (a) {
    this.setData({ date2: a.detail.value });
  },
  newvip: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "qw_vipsales.ashx",
      data: {
        vipcode: t.data.vipcode,
        xf_desci: t.data.xf_desci,
        begindate: t.data.date,
        enddate: t.data.date2,
        sexf_plu: t.data.sexf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0
            ? (t.setData({
                rejob: a.data,
                newamtsold: a.data[0].AMTSOLD,
                rv: "",
                amtsold:
                  parseFloat(t.data.oldamtsold.toFixed(2)) +
                  parseFloat(a.data[0].AMTSOLD.toFixed(2)),
              }),
              console.log(t.data.newamtsold),
              console.log(t.data.oldamtsold),
              console.log(t.data.amtsold))
            : (t.setData({ rejob: null }),
              t.data.replu ||
                (t.setData({ rv: !0 }),
                wx.showModal({
                  title: "提示",
                  content: "没有记录！",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                }))),
          wx.hideLoading();
      },
      complete: function () {},
    });
  },
  bijiao: function (a) {
    a.currentTarget.dataset.id
      ? (console.log(a.currentTarget.dataset.id),
        wx.navigateTo({
          url: "/pages/listprice/index/index?id=" + a.currentTarget.dataset.id,
        }))
      : (console.log(a.currentTarget.dataset.xf_storecode),
        console.log(a.currentTarget.dataset.xf_qtysold),
        console.log(a.currentTarget.dataset.xf_docno),
        console.log(a.currentTarget.dataset.xf_plu),
        wx.navigateTo({
          url:
            "/pages/listprice/index/index?xf_plu=" +
            a.currentTarget.dataset.xf_plu +
            "&xf_amtsold=" +
            a.currentTarget.dataset.xf_amtsold,
        }));
  },
  selectvip: function () {
    var t = this;
    wx.showLoading({ title: "正在查询数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_oldvip.ashx",
        data: {
          vipcode: t.data.vipcode,
          xf_desci: t.data.xf_desci,
          begindate: t.data.date,
          enddate: t.data.date2,
          sexf_plu: t.data.sexf_plu,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? (t.setData({
                  replu: a.data,
                  oldamtsold: a.data[0].amtsold,
                  rv: "",
                  amtsold: a.data[0].amtsold.toFixed(2),
                }),
                console.log(t.data.oldamtsold),
                console.log(t.data.amtsold))
              : t.setData({ replu: null }),
            wx.hideLoading(),
            t.newvip();
        },
        complete: function () {},
      });
  },
});
