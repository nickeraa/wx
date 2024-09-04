var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    replu: {},
    shphone: "",
    shname: "",
    tag: "",
    address1: "",
    address2: "",
    src: "",
    isBeta: !1,
    ret: {},
  },
  back: function () {
    this.shows();
  },
  onLoad: function (a) {},
  SetShadow: function (a) {
    var t = a.detail.value;
    this.setData({ isBeta: t }),
      console.log("标幺化/自定义Beta选择的是", this.data.isBeta),
      this.data.isBeta ? this.setData({ tag: "1" }) : this.setData({ tag: "" });
  },
  getshname: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({ shname: a.detail.value });
  },
  getshphone: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({ shphone: a.detail.value });
  },
  getaddr1: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({ address1: a.detail.value });
  },
  getaddr2: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({ address2: a.detail.value });
  },
  selectmap: function () {
    var a = this;
    wx.chooseLocation({
      success: function (t) {
        var e = t.address.match(/.+?(省|市|自治区|自治州|县|区)/g),
          s = "",
          o = "",
          d = "";
        null != e && null != e && ((s = e[0]), (o = e[1]), (d = e[2])),
          console.log(s, o, d),
          console.log(t),
          a.setData({
            address1: s + "/" + o + "/" + d,
            address2: t.address.replace(s + o + d, "") + t.name,
          });
      },
      fail: function (a) {
        console.log(a);
      },
    });
  },
  shows: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_alladdress.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          a.data.length > 0
            ? t.setData({ ret: a.data })
            : t.setData({ ret: null });
        var e = getCurrentPages();
        e[e.length - 2].setData({ ret: t.data.ret }),
          wx.navigateBack({ delta: 1 });
      },
    });
  },
  add: function () {
    if ((console.log(this.data.tag), "" == this.data.shname))
      wx.showToast({ title: "请填写收货人", icon: "error", duration: 1e3 });
    else if ("" == this.data.shphone)
      wx.showToast({ title: "请填写手机号", icon: "error", duration: 1e3 });
    else if ("" == this.data.address1)
      wx.showToast({ title: "请填写所在地区", icon: "error", duration: 1e3 });
    else if ("" == this.data.address2)
      wx.showToast({ title: "请填写详细地址", icon: "error", duration: 1e3 });
    else {
      var t = this;
      wx.request({
        url: a.globalData.api + "wx_setaddress.ashx",
        data: {
          vipcode: wx.getStorageSync("vipcode"),
          wxuserid: wx.getStorageSync("wxuserid"),
          address1: t.data.address1,
          address2: t.data.address2,
          shname: t.data.shname,
          shphone: t.data.shphone,
          tag: t.data.tag,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          "ok" == a.data
            ? (wx.showToast({
                title: "新增成功",
                icon: "success",
                duration: 2e3,
              }),
              t.back())
            : wx.showToast({ title: "数据错误", icon: "error", duration: 2e3 });
        },
      });
    }
  },
  onShow: function () {},
});
