var e = require("../../../utils/butil"),
  t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
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
    code: "",
    codeStr: "",
    flagp: !0,
    flagx: !1,
    canvas: "",
    canvasurl: "",
    imgUrls: "",
    base64ImgUrl: "",
  },
  onLoad: function () {},
  onShow: function () {
    wx.showToast({ title: "正在加载...", icon: "loading", duration: 1e3 });
    var t =
      "https://widesky.work/vipcode?id=123&vipid=" +
      wx.getStorageSync("vip_id");
    (0, e.toQrcode)("qrcode", t, 120, 120);
    var a = t;
    console.log(a),
      console.log(wx.getStorageSync("vip_id")),
      this.setData({ code: t, codeStr: a }),
      this.creatcode(),
      setTimeout(function () {
        wx.hideToast();
      }, 1e3);
  },
  eventDraw: function () {
    console.log("gggggg"),
      console.log(this.data.imagePath),
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
              content: "客户： " + wx.getStorageSync("vipname"),
              fontSize: 30,
              color: "red",
              textAlign: "left",
              top: 120,
              left: 50,
            },
            {
              type: "text",
              content: "绑定手机号才能开卡成功喔！",
              fontSize: 17,
              color: "blue",
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
      (this.setData({ image: a }), console.log(this.data.image));
  },
  creatcode: function () {
    wx.showToast({ title: "普通二维码", icon: "loading", duration: 1e3 }),
      this.createNewImg(),
      setTimeout(function () {
        wx.hideToast();
      }, 1e3);
  },
  createNewImg: function () {
    var e = this;
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: "qrcode",
        success: function (t) {
          var a = t.tempFilePath;
          e.setData({ imagePath: a }),
            console.log(e.data.imagePath + "ppppp"),
            e.eventDraw();
        },
        fail: function (e) {
          console.log(e);
        },
      });
    }, 1e3);
  },
  createNewImg1: function () {
    this.setData({ flagp: !1, flagx: !0 });
    var e = this;
    return (
      wx
        .createSelectorQuery()
        .select("#myCanvas")
        .fields({ node: !0, size: !0 })
        .exec(function (t) {
          var a = t[0].node,
            o = t[0].width,
            i = t[0].height;
          console.log(o), console.log(i);
          var n = a.getContext("2d"),
            s = wx.getSystemInfoSync().pixelRatio;
          (a.width = t[0].width * s),
            (a.height = t[0].height * s),
            n.scale(s, s);
          var c = a.createImage();
          (c.src = e.data.erweima),
            console.log(e.data.erweima),
            (c.onload = function () {
              n.drawImage(c, 0, 0, 300, 300);
            }),
            e.setData({ canvas: e.data.canvas }),
            setTimeout(function () {
              e.setData({ canvasurl: a.toDataURL("image/png"), show: !0 });
              var t = wx.getFileSystemManager(),
                o = wx.env.USER_DATA_PATH + "/qrcodeImg.png",
                i = e.data.canvasurl.replace(/^data:image\/\w+;base64,/, "");
              t.writeFile({
                filePath: o,
                data: i,
                encoding: "base64",
                success: function (e) {
                  wx.saveImageToPhotosAlbum({
                    filePath: o,
                    success: function (e) {
                      console.log(e),
                        wx.showToast({ title: "保存成功", icon: "success" });
                    },
                    fail: function (e) {
                      console.log("失败", e);
                    },
                  });
                },
              });
            }, 1e3);
        }),
      !1
    );
  },
  fx: function () {
    console.log("mmmmmmmmm");
    wx.showToast({ title: "小程序二维码", icon: "loading", duration: 1e3 }),
      this.getqcode(),
      setTimeout(function () {
        wx.hideToast();
      }, 1e3);
  },
  getqcode: function () {
    var e = this;
    console.log(wx.getStorageSync("vip_id")),
      wx.request({
        url: t.globalData.api + "getqcodes.ashx",
        data: { vip_id: wx.getStorageSync("vip_id") },
        success: function (t) {
          var a = t.data.replace(" ", "");
          a = a.replace(/\ufeff/g, "");
          var o = JSON.parse(a);
          console.log("fffffff");
          var i = o.buffer;
          e.setData({ erweima: "data:image/png;base64," + i });
          var n = wx.env.USER_DATA_PATH + "/code.png",
            s = e.data.erweima.replace(/^data:image\/\w+;base64,/, "");
          wx.getFileSystemManager().writeFile({
            filePath: n,
            data: s,
            encoding: "base64",
            success: function () {
              console.log(n),
                e.setData({ erweima: n }),
                console.log("1111111111111"),
                console.log(e.data.erweima),
                e.createNewImg1();
            },
            fail: function (e) {
              console.log(e);
            },
          });
        },
      });
  },
  back: function () {
    wx.redirectTo({ url: "/pages/cards/index/index" });
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
