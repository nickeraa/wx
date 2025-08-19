var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    replu: {},
    current: 0,
    lines: 0,
    id: "",
    itemname: "",
    choseNames: "",
    flag: true,
    flags: true,
    amount: 0,
    orderqty: 0,
    damt: 0,
    qtysold: 0,
    samt: 0,
    zamt: 0,
    znum: 0,
    camt: 0,
    lastnum: 0

  },
  onLoad: function (a) {

  },
  checkboxChange: function (a) {
    this.setData({
        choseNames: a.detail.value
      }),
      console.log(this.data.choseNames);
  },
  select: function () {
    console.log(this.data.itemname);
    var e = this;
    if ('' == e.data.itemname)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择查询系列",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    e.setData({
        choseNames: []

      }),
      wx.request({
        url: a.globalData.api + "wx_seitemname.ashx",
        data: {
          itemname: e.data.itemname
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (a) {
          console.log(a.data),
            a.data.length > 0 ?
            (e.setData({
              replu: a.data,
              flag: !1
            })) :
            wx.showModal({
              title: "提示",
              content: "没有相关记录",
              showCancel: !1,
              success: function (a) {
                a.confirm && e.setData({
                  replu: null,
                  flag: !0
                });
              },
            });
        },
      });
  },
  getitemname: function (a) {
    this.setData({
      itemname: a.detail.value
    }), console.log(this.data.itemname);
  },
  onShow: function () {

  },

  seall: function () {
    if (0 == this.data.choseNames.length)
      return (
        wx.showModal({
          title: "提示",
          content: "没有勾选货品",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );

    wx.showLoading({
      title: '正在汇总',
    })
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_seallitem.ashx",
      data: {
        itemname: e.data.choseNames,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (s) {
        e.setData({
          flags: false,
          amount: s.data.amount,
          orderqty: s.data.orderqty,
          damt: s.data.damt,
          qtysold: s.data.qtysold,
          samt: s.data.samt,
          zamt: s.data.zamt,
          znum: s.data.znum,
          camt: s.data.camt,
          lastnum: s.data.lastnum

        })

        wx.hideLoading();

      },
    });
  },

});