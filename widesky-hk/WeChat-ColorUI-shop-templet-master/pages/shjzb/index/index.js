var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    phone: "",
    username: "",
    openid: "",
    userid: "",
    xf_plu: "",
    xf_name: "",
    store: "",
    qty: "",
    vipcode: "",
    vipname: "",
    snumber: "",
    susername: "",
    xf_price: "",
    storename: "",
    znumber: "",
    imglist: a.globalData.api + "images/timg.jpg",
    imgurls: "",
    imgurl: "",
    pp: "",
    rcimg: "",
    zdnumber: "",
    qguser: "",
  },
  onLoad: function (a) {
    this.setData({ znumber: a.znumber });
  },
  checkinput: function (t) {
    this.data.imglist == a.globalData.api + "images/timg.jpg"
      ? wx.showToast({ title: "请上传收货照片", icon: "none", duration: 1e3 })
      : this.addnumber();
  },
  addnumber: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_customer_lcznumber.ashx",
      data: {
        znumber: e.data.znumber,
        shuserid: wx.getStorageSync("userid"),
        shimg: e.data.imgurl,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" == a.data
            ? wx.showModal({
                title: "提示",
                content: "收货成功！",
                showCancel: !1,
                success: function (a) {
                  a.confirm &&
                    wx.redirectTo({
                      url:
                        "/pages/lcstock/index/index?i=1&store=" + e.data.store,
                    });
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
      complete: function () {},
    });
  },
  ChooseImage: function () {
    var t = this;
    t.setData({ pp: "1" }),
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: function (e) {
          t.setData({ imglist: e.tempFilePaths }),
            wx.showLoading({ title: "正在上传", mask: !0 }),
            wx.uploadFile({
              url: a.globalData.api + "wx_postimg.ashx",
              filePath: t.data.imglist[0],
              name: "imgfile",
              formData: { method: "POST" },
              success: function (a) {
                console.log(a),
                  t.setData({ imgurl: "djimg/" + a.data }),
                  console.log(t.data.imgurl),
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
  onShow: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "seznumber.ashx",
      data: { znumber: e.data.znumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          e.setData({
            vipcode: t.data[0].VIPCODE,
            vipname: t.data[0].XF_SURNAME,
            store: t.data[0].XF_STORE,
            storename: t.data[0].XF_NAME,
            xf_plu: t.data[0].XF_PLU,
            xf_name: t.data[0].XF_DESCI,
            xf_price: t.data[0].PRICE,
            qty: t.data[0].XF_QTY,
            snumber: t.data[0].SNUMBER,
            susername: t.data[0].SUSERNAME,
            rcimg: a.globalData.api + t.data[0].RCIMG,
            zdnumber: t.data[0].ZDNUMBER,
            qguser: t.data[0].QGUSERNAME,
          }),
          t.data[0].SHIMG &&
            "" == e.data.pp &&
            e.setData({ imglist: a.globalData.api + t.data[0].SHIMG });
      },
    });
  },
});
