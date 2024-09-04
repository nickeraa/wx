var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: e(
    e(
      e(
        e(
          e(
            e(
              e(
                {
                  StatusBar: t.globalData.StatusBar,
                  hidden: !0,
                  current: 0,
                  lines: 0,
                  banner: t.globalData.imgUrl,
                  scimgurl: t.globalData.scimgurl,
                  resultdt: {},
                  replu: {},
                  xfname: "",
                  listIndex: 0,
                  screenWidth: 0,
                  screenHeight: 0,
                  index: 20,
                  remark: {},
                  openid: "",
                  wxname: "",
                  pnumber: "",
                  avaurl: "",
                  itemname: "",
                  p: "",
                  vipcode: "",
                  fxuserid: "",
                  itemnames: "",
                  yguserid: "",
                  d: "",
                  fx: "",
                  swiperlist: [],
                  autoplay: !1,
                  indicatorDots: !1,
                  interval: 4e3,
                  duration: 500,
                  circular: !1,
                },
                "current",
                0
              ),
              "arr",
              []
            ),
            "video",
            !0
          ),
          "vurl",
          ""
        ),
        "isShow",
        !0
      ),
      "videoCoverImg",
      t.globalData.scimgurl + "cover.jpg"
    ),
    "videoPlayIcon",
    "/img/an.png"
  ),
  onReady: function () {
    this.videoContext = wx.createVideoContext("myVideo");
  },
  bindplay: function () {
    this.setData({ isShow: !1 }), this.videoContext.play(), console.log("play");
  },
  bindended: function () {
    console.log("bindended"),
      this.setData({ isShow: !0 }),
      this.videoContext.ended();
  },
  bindpause: function () {
    console.log("pause");
  },
  swiperChange: function (e) {
    this.setData({ current: e.detail.current });
  },
  previewImage: function (e) {
    var t = e.target.dataset.src;
    wx.previewImage({ current: t, urls: this.data.swiperlist });
  },
  computeImgHeight: function (e) {
    var t =
      (wx.getSystemInfoSync().windowWidth * e.detail.height) / e.detail.width +
      "px";
    this.setData({ swiperHeight: t });
  },
  onShow: function () {
    var e = this;
    wx.request({
      url: t.globalData.api + "wx_cgimg.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          e.setData({ resultdt: a.data }),
          e.setData({ swiperlist: [] }),
          wx.request({
            url: t.globalData.api + "wx_cgitemimg.ashx",
            data: {},
            header: { "content-type": "application/x-www-form-urlencoded" },
            dataType: "json",
            success: function (t) {
              console.log(t),
                t.data.length > 0 &&
                  "1" == t.data[0].VIDEO &&
                  e.setData({ video: !1, vurl: t.data[0].VURL });
              for (var a = e.data.swiperlist, i = 0; i < t.data.length; i++)
                a.push(e.data.scimgurl + t.data[i].IMAGES), console.log(a);
              e.setData({ swiperlist: a });
            },
          });
      },
    });
  },
  onLoad: function (e) {},
});
