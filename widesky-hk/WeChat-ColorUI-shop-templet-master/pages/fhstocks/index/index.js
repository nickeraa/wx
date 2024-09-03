var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    rejob: {},
    xf_store: "",
    xf_plu: "",
    xf_qty: "",
    vipcode: "",
    snumber: "",
    susername: "",
    entime: "",
    userid: "",
    wlnumber: "",
    imglist: a.globalData.api + "images/timg.jpg",
    imgurls: "",
    imgurl: "",
    shname: "",
    shaddr: "",
    shphone: "",
    reguserid: "",
    qguserid: "",
    gjuserid: "",
    pzstate: "",
    pyoufei: "",
    pwuliu: "",
    paddress: "",
    bprice: "",
    note: "",
    kdnumber: "",
  },
  onLoad: function (a) {
    console.log(a.wlnumber), this.setData({ wlnumber: a.wlnumber });
  },
  getkdnumber: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({ kdnumber: a.detail.value });
  },
  checkinput: function () {
    if ("" == this.data.kdnumber)
      return (
        wx.showToast({ title: "请输入快递单号", icon: "none", duration: 1e3 }),
        !1
      );
    if ("" == this.data.imgurl)
      return (
        wx.showToast({ title: "请上传发货照", icon: "none", duration: 1e3 }), !1
      );
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_customer_kdfh.ashx",
        data: {
          wlnumber: this.data.wlnumber,
          kdnumber: this.data.kdnumber,
          fhimgurl: this.data.imgurl,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            "ok" == a.data
              ? wx.showModal({
                  title: "提示",
                  content: "发货成功",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm &&
                      wx.redirectTo({ url: "/pages/fhjzb/index/index" });
                  },
                })
              : wx.showModal({
                  title: "提示",
                  content: "数据错误",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
  scan: function () {
    var a = this;
    wx.scanCode({
      onlyFromCamera: !0,
      success: function (t) {
        console.log("扫码成功：" + JSON.stringify(t)),
          a.setData({ kdnumber: t.result });
      },
      fail: function (a) {
        console.log(a),
          wx.showToast({ title: "扫描失败", icon: "none", duration: 1e3 });
      },
    });
  },
  ChooseImage: function () {
    var t = this;
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
    console.log(wx.getStorageSync("juserid"));
    var e = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: a.globalData.api + "wx_customer_listsqs.ashx",
        data: { wlnumber: e.data.wlnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            t.data.length > 0
              ? (e.setData({
                  rejob: t.data,
                  shname: t.data[0].SHNAME,
                  shaddr: t.data[0].SHADDR,
                  shphone: t.data[0].SHPHONE,
                  reguserid: t.data[0].USERID,
                  gjuserid: t.data[0].GJUSERID,
                  qguserid: t.data[0].QGUSERID,
                  pzstate: t.data[0].PZSTATE,
                  pwuliu: t.data[0].PWULIU,
                  pyoufei: t.data[0].PYOUFEI,
                  paddress: t.data[0].PADDRESS,
                  bprice: t.data[0].BPRICE,
                  note: t.data[0].NOTE,
                  imgurls: a.globalData.api + t.data[0].IMGURL,
                }),
                e.data.note || e.setData({ note: "" }))
              : e.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
