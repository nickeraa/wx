var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    rejob: {},
    storename: "",
    store: "",
    xf_plu: "",
    qty: "",
    xf_desci: "",
    amount: "",
    stock: "",
    salesprice: "",
    vipprice: "",
    pzstate: "",
    pnumber: "",
    imgurls: "",
    ontimess: "",
    remark: "",
    tags: !0,
    bhtext: "",
  },
  onLoad: function (t) {
    console.log(t.pnumber), this.setData({ pnumber: t.pnumber });
  },
  shtp: function () {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_shtp.ashx",
      data: {
        pnumber: a.data.pnumber,
        tpuserid: wx.getStorageSync("tpuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" == t.data
            ? wx.showModal({
                title: "提示",
                content: "审核成功！",
                showCancel: !1,
                success: function (t) {
                  t.confirm && a.tpjl();
                },
              })
            : wx.showModal({
                title: "提示",
                content: "数据错误！",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              });
      },
    });
  },
  tpjl: function () {
    wx.request({
      url: t.globalData.api + "tpjl.aspx",
      data: { pnumber: this.data.pnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), wx.redirectTo({ url: "/pages/tpsh/index/index" });
      },
    });
  },
  bhjl: function () {
    wx.request({
      url: t.globalData.api + "bhsh.aspx",
      data: { pnumber: this.data.pnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), wx.redirectTo({ url: "/pages/tpsh/index/index" });
      },
    });
  },
  onShow: function (a) {
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_tpshlist.ashx",
        data: { pnumber: e.data.pnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? e.setData({
                  rejob: a.data,
                  store: a.data[0].STORE,
                  storename: a.data[0].STORENAME,
                  salesprice: a.data[0].XF_ORGUPRICE,
                  vipprice: a.data[0].VIPPRICE,
                  amount: a.data[0].AMOUNT,
                  qty: a.data[0].QTY,
                  pzstate: a.data[0].PZSTATE,
                  stock: a.data[0].STOCK,
                  remark: a.data[0].REMARK,
                  xf_name: a.data[0].XF_NAME,
                  xf_plu: a.data[0].XF_PLU,
                  xf_desci: a.data[0].XF_LONGDESC,
                  ontimess: a.data[0].ONTIMESS,
                  imgurls: t.globalData.hkimgUrl + a.data[0].IMAGES,
                })
              : e.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  bindTextAreaBlur: function (t) {
    this.setData({ bhtext: t.detail.value }), console.log(this.data.bhtext);
  },
  bhtp: function () {
    if (1 == this.data.tags) return this.setData({ tags: !1 }), !1;
    if (
      (console.log(this.data.tags),
      console.log(this.data.bhtext),
      0 == this.data.tags && "" == this.data.bhtext)
    )
      return (
        wx.showModal({
          title: "提示",
          content: "请输入驳回原因",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_shbh.ashx",
      data: {
        pnumber: a.data.pnumber,
        tpuserid: wx.getStorageSync("tpuserid"),
        bhtext: a.data.bhtext,
        qty: a.data.qty,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" == t.data
            ? wx.showModal({
                title: "提示",
                content: "已驳回，配额回收",
                showCancel: !1,
                success: function (t) {
                  t.confirm && a.bhjl();
                },
              })
            : wx.showModal({
                title: "提示",
                content: "数据错误！",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              });
      },
    });
  },
});
