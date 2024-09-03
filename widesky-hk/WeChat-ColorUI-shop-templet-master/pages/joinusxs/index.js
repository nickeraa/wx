var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    TabbarBot: t.globalData.tabbar_bottom,
    pict: t.globalData.hkimgUrl,
    pnumber: "",
    show: !1,
    imglist: t.globalData.api + "images/timg.jpg",
    imgurl: "",
    dnumber: "",
    warning: "",
    qty: "",
    xf_desci: "",
    xf_pluimg: "",
    xf_plu: "",
    tag: "",
  },
  onLoad: function (t) {
    this.setData({ pnumber: t.id }), console.log(this.data.pnumber);
  },
  computeImgHeight: function (t) {
    var a =
      (wx.getSystemInfoSync().windowWidth * t.detail.height) / t.detail.width +
      "px";
    this.setData({ swiperHeight: a });
  },
  getdnumber: function (t) {
    this.setData({ dnumber: t.detail.value }), console.log(this.data.dnumber);
  },
  goback: function () {
    wx.redirectTo({ url: "/pages/scarxs/index/index" });
  },
  ChooseImage: function () {
    var a = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (e) {
        var o = e.tempFiles[0].size;
        e.tempFilePaths;
        if ((console.log("size:", o), !(o <= 2e6)))
          return (
            wx.showToast({ title: "上传图片不能大于2M", icon: "none" }), !1
          );
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
            fail: function (t) {
              wx.showModal({
                title: "提示",
                content: "上传失败",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              });
            },
          });
      },
    });
  },
  onShow: function (a) {
    if (!wx.getStorageSync("userid"))
      return wx.navigateTo({ url: "/pages/coupon/index/index" }), !1;
    var e = this;
    wx.request({
      url: t.globalData.api + "wx_search_prove.ashx",
      data: { pnumber: e.data.pnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          e.setData({
            resultdt: t.data,
            xf_desci: t.data[0].XF_DESCI,
            qty: t.data[0].QTY,
            xf_plu: t.data[0].XF_PLU,
          });
      },
    });
  },
  shuaxin: function (a) {
    var e = this;
    wx.request({
      url: t.globalData.api + "wx_search_prove.ashx",
      data: { pnumber: e.data.pnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (o) {
        console.log(o),
          e.setData({ resultdt: o.data, tag: o.data[0].TAG }),
          "0" != e.data.tag && "9" != e.data.tag
            ? wx.showModal({
                title: "提示",
                content:
                  "配额状态超时或发生改变，无法验证销售单,请刷新后再操作",
                showCancel: !1,
                success: function (t) {
                  t.confirm &&
                    wx.redirectTo({ url: "/pages/scarxs/index/index" });
                },
              })
            : wx.request({
                url: t.globalData.api + "wx_checknumberxs.ashx",
                data: {
                  pnumber: e.data.pnumber,
                  dnumber: a.detail.value.dnumber,
                  store: a.currentTarget.dataset.store,
                  qty: a.currentTarget.dataset.qty,
                  plu: a.currentTarget.dataset.plu,
                  phone: wx.getStorageSync("phone"),
                  xf_pluimg: e.data.imgurl,
                },
                header: { "content-type": "application/x-www-form-urlencoded" },
                dataType: "json",
                success: function (t) {
                  console.log(t),
                    e.setData({ warning: t.data }),
                    "销售单号验证成功，配额成功！" == e.data.warning
                      ? (e.setData({ show: "true" }),
                        wx.showModal({
                          title: "提示",
                          content: "销售单号验证成功，配额成功！",
                          showCancel: !1,
                          success: function (t) {
                            t.confirm && e.tzbody();
                          },
                        }))
                      : wx.showModal({
                          title: "提示",
                          content: e.data.warning,
                          showCancel: !1,
                          success: function (t) {
                            t.confirm;
                          },
                        });
                },
                fail: function () {
                  console.log("submit fail");
                },
                complete: function () {},
              });
      },
    });
  },
  checkitem: function (t) {
    return "" == this.data.dnumber
      ? (wx.showModal({
          title: "提示",
          content: "请输入销售单号进行验证",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1)
      : "" == this.data.imgurl
      ? (wx.showModal({
          title: "提示",
          content: "请上传销售单照片验证",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1)
      : void this.shuaxin(t);
  },
  tzbody: function () {
    wx.request({
      url: t.globalData.api + "tzbodyok.aspx",
      data: {
        xf_plu: this.data.xf_plu,
        xf_desci: this.data.xf_desci,
        userid: wx.getStorageSync("userid"),
        qty: this.data.qty,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), wx.redirectTo({ url: "/pages/scar/index/index" });
      },
    });
  },
});
