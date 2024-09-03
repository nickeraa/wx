var a = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
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
    imglist: t.globalData.api + "images/timg.jpg",
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
    fhdate: "",
    xingtai: "",
    louti: "",
    mapname: "",
    imgurlshw: "",
    swiperlist: [""],
    latitude: 0,
    longitude: 0,
    dtaddress: "",
    znumber: "",
  },
  onLoad: function (a) {
    console.log(a.wlnumber), this.setData({ wlnumber: a.wlnumber });
  },
  selectmap: function () {
    console.log(this.data.latitude), console.log(this.data.longitude);
    var a = this;
    wx.getLocation({
      type: "gcj02",
      success: function (t) {
        console.log(t.latitude),
          console.log(t.longitude),
          wx.openLocation({
            latitude: Number(a.data.latitude),
            longitude: Number(a.data.longitude),
            scale: 28,
            name: a.data.mapname,
            address: a.data.dtaddress,
          });
      },
    });
  },
  previewImage0: function (a) {
    var t = a.target.dataset.src;
    (this.data.swiperlist[0] = this.data.imgurls),
      wx.previewImage({ current: t, urls: this.data.swiperlist });
  },
  previewImage1: function (a) {
    var t = a.target.dataset.src;
    (this.data.swiperlist[0] = this.data.imgurlshw),
      wx.previewImage({ current: t, urls: this.data.swiperlist });
  },
  checkinput: function () {
    if ("" == this.data.imgurl)
      return (
        wx.showToast({ title: "请上传发货照", icon: "none", duration: 1e3 }), !1
      );
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_upwlfh.ashx",
        data: { wlnumber: this.data.wlnumber, fhimgurl: this.data.imgurl },
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
                    a.confirm;
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
  ChooseImage: function () {
    var a = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (e) {
        a.setData({ imglist: e.tempFilePaths }),
          wx.showLoading({ title: "正在上传", mask: !0 }),
          wx.uploadFile({
            url: t.globalData.api + "wx_postimg.ashx",
            filePath: a.data.imglist[0],
            name: "imgfile",
            formData: { method: "POST" },
            success: function (t) {
              console.log(t),
                a.setData({ imgurl: "djimg/" + t.data }),
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
  onShow: function (e) {
    console.log(wx.getStorageSync("juserid"));
    var s = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_customer_listsqs.ashx",
        data: { wlnumber: s.data.wlnumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0
              ? (s.setData(
                  a(
                    a(
                      a(
                        a(
                          {
                            rejob: e.data,
                            shname: e.data[0].SHNAME,
                            znumber: e.data[0].ZNUMBER,
                            shaddr: e.data[0].SHADDR,
                            shphone: e.data[0].SHPHONE,
                            reguserid: e.data[0].USERID,
                            gjuserid: e.data[0].GJUSERID,
                            qguserid: e.data[0].QGUSERID,
                            pzstate: e.data[0].PZSTATE,
                            pwuliu: e.data[0].PWULIU,
                            pyoufei: e.data[0].PYOUFEI,
                            paddress: e.data[0].PADDRESS,
                            bprice: e.data[0].BPRICE,
                            note: e.data[0].NOTE,
                            imgurls: t.globalData.api + e.data[0].IMGURL,
                            xingtai: e.data[0].PXINGTAI,
                            louti: e.data[0].PLOUTI,
                            mapname: e.data[0].MAPNAME,
                            imgurlshw: t.globalData.api + e.data[0].HWIMGURL,
                            fhdate: e.data[0].FHDATE,
                          },
                          "mapname",
                          e.data[0].MAPNAME
                        ),
                        "latitude",
                        e.data[0].LATITUDE
                      ),
                      "longitude",
                      e.data[0].LONGITUDE
                    ),
                    "dtaddress",
                    e.data[0].DTADDRESS
                  )
                ),
                s.data.note || s.setData({ note: "" }))
              : s.setData({ rejob: null }),
            wx.hideLoading();
        },
        complete: function () {},
      });
  },
});
