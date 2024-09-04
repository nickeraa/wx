var e = getApp();
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    hidden: !0,
    current: 0,
    lines: 0,
    imgurl: "",
    painting: {},
    shareImage: "",
    image: "",
    erweima: "",
    evalatImage: "",
    bgBanner: "",
    imagePath: "",
    banner: "",
    vipcode: "",
    swiperlist: [""],
  },
  onLoad: function () {},
  onShow: function () {
    wx.showToast({ title: "正在加载...", icon: "loading", duration: 1e3 }),
      this.getqcode(),
      setTimeout(function () {
        wx.hideToast();
      }, 1e3);
  },
  eventDraw: function () {
    this.setData({
      painting: {
        width: 600,
        height: 600,
        clear: !0,
        views: [
          {
            type: "image",
            url: "https://widesky.work/HKback/images/card.png",
            top: 0,
            left: 0,
            width: 600,
            height: 350,
          },
          {
            type: "text",
            content: wx.getStorageSync("vipcode"),
            fontSize: 20,
            color: "#383549",
            textAlign: "left",
            top: 280,
            left: 100,
          },
        ],
      },
    });
  },
  eventGetImage: function (e) {
    console.log(e);
    var t = e.detail,
      a = t.tempFilePath;
    "canvasdrawer:ok" === t.errMsg &&
      (this.setData({ image: a }),
      console.log(this.data.image),
      this.creatcode());
  },
  creatcode: function () {
    wx.showToast({ title: "会员卡生成中...", icon: "loading", duration: 1e3 }),
      this.createNewImg(),
      setTimeout(function () {
        wx.hideToast();
      }, 1e3);
  },
  createNewImg: function () {
    var e = this,
      t = wx.createCanvasContext("mycanvas"),
      a = e.data.erweima;
    t.drawImage(a, 0, 0, 150, 150),
      t.save(),
      t.draw(!0),
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: "mycanvas",
          success: function (t) {
            var a = t.tempFilePath;
            e.setData({ imagePath: a });
          },
          fail: function (e) {
            console.log(e);
          },
        });
      }, 1e3);
  },
  getqcode: function () {
    var t = this;
    wx.request({
      url: e.globalData.api + "getqcode.ashx",
      data: { vipcode: wx.getStorageSync("vipcode") },
      success: function (e) {
        console.log(e);
        var a = e.data.replace(" ", "");
        a = a.replace(/\ufeff/g, "");
        var o = JSON.parse(a);
        console.log("fffffff");
        var i = o.buffer;
        t.setData({ erweima: "data:image/png;base64," + i });
        var s = wx.env.USER_DATA_PATH + "/code.png",
          n = t.data.erweima.replace(/^data:image\/\w+;base64,/, "");
        wx.getFileSystemManager().writeFile({
          filePath: s,
          data: n,
          encoding: "base64",
          success: function () {},
          fail: function (e) {
            console.log(e);
          },
        }),
          t.setData({ erweima: s }),
          console.log(t.data.erweima),
          t.eventDraw();
      },
    });
  },
  previewImage: function (t) {
    this.setData({
      "swiperlist[0]":
        e.globalData.scimgurl +
        "vipcard/" +
        wx.getStorageSync("vipcode") +
        ".jpg",
    }),
      console.log(this.data.swiperlist),
      wx.previewImage({ current: "", urls: this.data.swiperlist });
  },
  back: function () {
    var e = this;
    wx.showModal({
      title: "提示",
      content: "退出将无法打开会员卡二维码，是否保存二维码图片？",
      success: function (t) {
        t.confirm
          ? e.clickSaveImg()
          : t.cancel && wx.navigateBack({ delta: 0 });
      },
    });
  },
  clickSaveImg: function () {
    var e = this;
    wx.getSetting({
      success: function (t) {
        t.authSetting["scope.writePhotosAlbum"]
          ? wx.saveImageToPhotosAlbum({
              filePath: e.data.erweima,
              success: function (e) {
                wx.showToast({ title: "保存成功！" });
              },
              faile: function (e) {
                console.log("失败！");
              },
            })
          : wx.authorize({
              scope: "scope.writePhotosAlbum",
              success: function () {
                wx.saveImageToPhotosAlbum({
                  filePath: e.data.erweima,
                  success: function (e) {
                    wx.showToast({ title: "保存相册成功！" }),
                      wx.navigateBack({ delta: 0 });
                  },
                  faile: function (e) {
                    console.log("失败！");
                  },
                });
              },
              fail: function () {
                wx.openSetting({
                  success: function () {
                    wx.authorize({
                      scope: "scope.writePhotosAlbum",
                      succes: function () {
                        wx.saveImageToPhotosAlbum({
                          filePath: e.data.erweima,
                          success: function (e) {
                            wx.showToast({ title: "保存成功！" });
                          },
                          faile: function (e) {
                            console.log("失败！");
                          },
                        });
                      },
                    });
                  },
                });
              },
            });
      },
    });
  },
});
