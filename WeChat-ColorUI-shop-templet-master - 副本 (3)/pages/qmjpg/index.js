var a = getApp(),
  t = null,
  e = [];
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
    drawFinish: !1,
    canvas: null,
    id: "",
  },
  start: function (a) {
    var i = { x: a.changedTouches[0].x, y: a.changedTouches[0].y };
    e.push(i),
      t.beginPath(),
      t.moveTo(a.changedTouches[0].x, a.changedTouches[0].y);
  },
  move: function (a) {
    var i = { x: a.touches[0].x, y: a.touches[0].y };
    t.lineTo(i.x, i.y),
      t.stroke(),
      e.length >= 2 && this.setData({ drawFinish: !0 });
  },
  end: function (a) {
    t.closePath();
  },
  clearClick: function () {
    t.clearRect(0, 0, 730, 750),
      t.beginPath(),
      (e = []),
      this.setData({ drawFinish: !1 });
  },
  saveClick: function () {
    var a = this;
    this.data.drawFinish
      ? wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 730,
          height: 750,
          destWidth: 180,
          destHeight: 185,
          fileType: "png",
          canvas: this.data.canvas,
          success: function (t) {
            a.uploadImg(t.tempFilePath);
          },
        })
      : wx.showToast({
          title: "您还没有签名哦~",
          icon: "none",
          duration: 3e3,
          mask: !0,
        });
  },
  uploadImg: function (t) {
    var e = this;
    wx.getFileSystemManager().readFile({
      filePath: t,
      encoding: "base64",
      success: function (t) {
        console.log(e.data.id),
          "q" == e.data.id
            ? ((a.globalData.q = t.data),
              (a.globalData.d = !0),
              wx.navigateTo({ url: "/pages/qyxy/index" }))
            : "bq" == e.data.id
            ? ((a.globalData.bq = t.data),
              (a.globalData.bd = !0),
              wx.navigateTo({ url: "/pages/qyxyb/index" }))
            : "cq" == e.data.id &&
              ((a.globalData.cq = t.data),
              (a.globalData.cd = !0),
              wx.navigateTo({ url: "/pages/qyxyc/index" }));
      },
    });
  },
  onReady: function () {
    var a = this;
    wx.createSelectorQuery()
      .select("#myCanvas")
      .fields({ node: !0, size: !0 })
      .exec(function (e) {
        var i = e[0].node;
        a.setData({ canvas: i }), (t = i.getContext("2d"));
        var o = wx.getSystemInfoSync().pixelRatio;
        (i.width = e[0].width * o),
          (i.height = e[0].height * o),
          t.scale(o, o),
          (t.strokeStyle = "black"),
          (t.lineGap = "round"),
          (t.lineJoin = "round"),
          (t.lineWidth = 6),
          (t.shadowBlur = 1),
          (t.shadowColor = "#000");
      });
  },
  onLoad: function (a) {
    this.setData({ id: a.id }), console.log(this.data.id);
  },
  onShow: function () {
    wx.showLoading({ title: "正在加载" }),
      setTimeout(function () {
        wx.hideLoading();
      }, 1e3);
  },
});
