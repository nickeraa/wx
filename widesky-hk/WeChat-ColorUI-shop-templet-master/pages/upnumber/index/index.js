var e = require("../../../@babel/runtime/helpers/defineProperty"),
  a = getApp();
Page({
  data: e(
    e(
      e(
        e(
          e(
            e(
              e(
                e(
                  {
                    StatusBar: a.globalData.StatusBar,
                    CustomBar: a.globalData.CustomBar,
                    phone: "",
                    username: "",
                    openid: "",
                    userid: "",
                    xf_plu: "",
                    xf_name: "",
                    store: "",
                    vipcode: "",
                    vipname: "",
                    snumber: "",
                    susername: "",
                    result: {},
                    acount: "",
                    xf_price: "",
                    storename: "",
                    imgurl: "",
                  },
                  "snumber",
                  ""
                ),
                "xf_plu",
                ""
              ),
              "xf_qty",
              ""
            ),
            "qgid",
            ""
          ),
          "qgname",
          ""
        ),
        "suserid",
        ""
      ),
      "salestime",
      ""
    ),
    "scnumber",
    ""
  ),
  checkinput: function (e) {
    if ("" == this.data.scnumber)
      return wx.showToast({ title: "请输入商城单号！" }), !1;
    wx.showLoading({ title: "正在处理中", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_upscnumber.ashx",
        data: {
          xf_storecode: this.data.store,
          scnumber: this.data.scnumber,
          xf_docno: this.data.snumber,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            wx.hideLoading(),
            "ok" != e.data
              ? wx.showModal({
                  title: "提示",
                  content: "修改失败！",
                  showCancel: !1,
                  success: function (e) {
                    e.confirm;
                  },
                })
              : wx.showModal({
                  title: "提示",
                  content: "修改成功！",
                  showCancel: !1,
                  success: function (e) {
                    e.confirm;
                  },
                });
        },
      });
  },
  onLoad: function (e) {
    wx.getStorageSync("userid") &&
      this.setData({
        openid: wx.getStorageSync("openid"),
        username: wx.getStorageSync("username"),
        phone: wx.getStorageSync("phone"),
      }),
      this.setData({
        store: e.store,
        storename: e.storename,
        userid: wx.getStorageSync("userid"),
        snumber: e.snumber,
        xf_plu: e.xf_plu,
      });
  },
  getscnumber: function (e) {
    this.setData({ scnumber: e.detail.value }), console.log(this.data.scnumber);
  },
  onShow: function (e) {
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_customer_selistnumber.ashx",
        data: {
          snumber: t.data.snumber,
          store: t.data.store,
          xf_plu: t.data.xf_plu,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0
              ? t.setData({
                  xf_name: e.data[0].XF_DESCI,
                  xf_price: e.data[0].XF_AMTSOLD,
                  xf_plu: e.data[0].XF_PLU,
                  xf_qty: e.data[0].XF_QTYSOLD,
                  vipcode: e.data[0].XF_VIPCODE,
                  vipname: e.data[0].XF_SURNAME,
                  susername: e.data[0].XF_SALESNAME,
                  suserid: e.data[0].XF_SALESMAN,
                  snumber: e.data[0].XF_DOCNO,
                  salestime: e.data[0].XF_TXDATE,
                })
              : t.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
