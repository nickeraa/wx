var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    scimgurl: t.globalData.scimgUrl,
    replu: {},
    xf_staffcode: "",
    xf_docno: "",
    xf_vipcode: "",
    kcxf_docno: "",
    sumsqprice: 0,
    pay_amtsold: 0,
  },
  getygid: function (t) {
    this.setData({ xf_staffcode: t.detail.value }),
      console.log(this.data.xf_staffcode);
  },
  getdocno: function (t) {
    this.setData({ xf_docno: t.detail.value }), console.log(this.data.xf_docno);
  },
  checkinput: function (t) {
    "" == this.data.xf_staffcode
      ? wx.showToast({ title: "请输入员工ID", icon: "none", duration: 1e3 })
      : "" == this.data.xf_docno
      ? wx.showModal({
          title: "提示",
          content: "请输入微信商城单号",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        })
      : this.yfk();
  },
  yfk: function () {
    var o = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_yg_ydqh.ashx",
        data: { xf_staffcode: o.data.xf_staffcode, xf_docno: o.data.xf_docno },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t.data.items),
            t.data.items.length > 0
              ? (o.setData({
                  replu: t.data.items,
                  xf_docno: t.data.items[0].XF_DOCNO,
                  xf_vipcode: t.data.items[0].XF_VIPCODE,
                  kcxf_docno: t.data.items[0].KCXF_DOCNO,
                  sumsqprice: t.data.items[0].SUMSQPRICE,
                  pay_amtsold: t.data.items[0].PAY_AMTSOLD,
                }),
                console.log(t.data.items[0].XF_DOCNO),
                console.log(t.data.items[0].XF_VIPCODE))
              : (wx.showModal({
                  title: "提示",
                  content: "没有符合条件的数据",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                }),
                o.setData({ replu: null })),
            wx.hideLoading();
        },
      });
  },
  fs: function () {
    return (
      console.log(this.data.xf_vipcode),
      console.log(this.data.xf_docno),
      "" == this.data.kcxf_docno
        ? (wx.showModal({
            title: "提示",
            content: "没有科传单号，请先打印电脑科传定金单",
            showCancel: !1,
            success: function (t) {
              t.confirm;
            },
          }),
          !1)
        : 0 == this.data.sumsqprice
        ? (wx.showModal({
            title: "提示",
            content: "全额预定，不需要发送取货链接",
            showCancel: !1,
            success: function (t) {
              t.confirm;
            },
          }),
          !1)
        : void wx.navigateToMiniProgram({
            appId: "wx187fe5b10e271c63",
            path: "/pages/fkdepositfx/index/index",
            extraData: {
              yguserid: wx.getStorageSync("userid"),
              vipcode: this.data.xf_vipcode,
              xf_docno: this.data.xf_docno,
              d: "1",
            },
          })
    );
  },
  selectsku: function (t) {
    var o = t.currentTarget.dataset.xf_plu;
    console.log(o), wx.navigateTo({ url: "/pages/shopcg/goods/index?id=" + o });
  },
  onLoad: function (t) {},
  onShow: function (t) {},
});
