var a = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page({
  data: a(
    a(
      a(
        a(
          a(
            a(
              a(
                a(
                  {
                    StatusBar: e.globalData.StatusBar,
                    CustomBar: e.globalData.CustomBar,
                    phone: "",
                    username: "",
                    openid: "",
                    userid: "",
                    xf_plu: "",
                    xf_name: "",
                    warning: "",
                    index2: null,
                    picker2: [],
                    store: "",
                    vipcode: "",
                    vipname: "",
                    snumber: "",
                    susername: "",
                    result: {},
                    acount: "",
                    xf_price: "",
                    storename: "",
                    imglist: e.globalData.api + "images/timg.jpg",
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
    "setype",
    ""
  ),
  radioChange: function (a) {
    console.log("radior发送选择改变，携带值为", a.detail.value),
      this.setData({ setype: a.detail.value });
  },
  bindPickerChange2: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index2: a.detail.value,
        qgid: this.data.picker2[a.detail.value].XF_STAFFCODE,
        qgname: this.data.picker2[a.detail.value].XF_NAME,
      }),
      console.log("picker发送选择改变，携带值为", this.data.qgid);
  },
  checkinput: function (a) {
    var t = this;
    if (null == t.data.index2)
      return "" == t.data.imgurl
        ? (wx.showToast({
            title: "请上传销售单照片",
            icon: "none",
            duration: 1e3,
          }),
          !1)
        : "" == t.data.setype
        ? (wx.showToast({
            title: "请选择货品库存地点",
            icon: "none",
            duration: 1e3,
          }),
          !1)
        : (wx.showToast({
            title: "请选择所属区管",
            icon: "none",
            duration: 1e3,
          }),
          !1);
    wx.showLoading({ title: "正在处理中", mask: !0 }),
      wx.request({
        url: e.globalData.api + "wx_customer_checksnumber.ashx",
        data: {
          store: t.data.store,
          snumber: t.data.snumber,
          xf_plu: t.data.xf_plu,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            wx.hideLoading(),
            a.data.length > 0
              ? wx.showModal({
                  title: "提示",
                  content: "登记失败！数据库中存在重复的记录",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm &&
                      wx.navigateTo({ url: "/pages/pscar/index/index" });
                  },
                })
              : t.addnumber();
        },
      });
  },
  ChooseImage: function () {
    var a = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (t) {
        a.setData({ imglist: t.tempFilePaths }),
          wx.showLoading({ title: "正在上传", mask: !0 }),
          wx.uploadFile({
            url: e.globalData.api + "wx_postimg.ashx",
            filePath: a.data.imglist[0],
            name: "imgfile",
            formData: { method: "POST" },
            success: function (e) {
              console.log(e),
                a.setData({ imgurl: "djimg/" + e.data }),
                console.log(a.data.imgurl),
                wx.hideLoading();
            },
            fail: function (a) {
              wx.showModal({
                title: "提示",
                content: "上传失败",
                showCancel: !1,
                success: function (a) {
                  a.confirm;
                },
              });
            },
          });
      },
    });
  },
  addnumber: function (a) {
    wx.showLoading({ title: "正在处理中", mask: !0 }),
      wx.request({
        url: e.globalData.api + "wx_customer_instock.ashx",
        data: {
          xf_store: this.data.store,
          xf_plu: this.data.xf_plu,
          xf_qty: this.data.xf_qty,
          vipcode: this.data.vipcode,
          snumber: this.data.snumber,
          susername: this.data.susername,
          suserid: this.data.suserid,
          reguserid: this.data.userid,
          price: this.data.xf_price,
          imgurl: this.data.imgurl,
          qguser: this.data.qgid,
          salestime: this.data.salestime,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            wx.hideLoading(),
            "ok" == a.data
              ? wx.showModal({
                  title: "提示",
                  content: "登记成功！",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                })
              : wx.showModal({
                  title: "提示",
                  content: "数据错误！",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                });
        },
      });
  },
  onLoad: function (a) {
    wx.getStorageSync("userid") &&
      this.setData({
        openid: wx.getStorageSync("openid"),
        username: wx.getStorageSync("username"),
        phone: wx.getStorageSync("phone"),
      }),
      this.setData({
        store: a.store,
        storename: a.storename,
        userid: wx.getStorageSync("userid"),
        snumber: a.snumber,
        xf_plu: a.xf_plu,
      });
  },
  se_zcstock: function () {
    wx.navigateTo({ url: "/pages/pscar/index/index" });
  },
  listqg: function (a) {
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_customer_listqg.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), t.setData({ picker2: a.data });
      },
    });
  },
  onShow: function (a) {
    var t = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: e.globalData.api + "wx_customer_selistnumber.ashx",
        data: {
          snumber: t.data.snumber,
          store: t.data.store,
          xf_plu: t.data.xf_plu,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            a.data.length > 0
              ? (t.setData({
                  xf_name: a.data[0].XF_DESCI,
                  xf_price: a.data[0].XF_AMTSOLD,
                  xf_plu: a.data[0].XF_PLU,
                  xf_qty: a.data[0].XF_QTYSOLD,
                  vipcode: a.data[0].XF_VIPCODE,
                  vipname: a.data[0].XF_SURNAME,
                  susername: a.data[0].XF_SALESNAME,
                  suserid: a.data[0].XF_SALESMAN,
                  snumber: a.data[0].XF_DOCNO,
                  salestime: a.data[0].XF_TXDATE,
                }),
                t.listqg())
              : t.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
