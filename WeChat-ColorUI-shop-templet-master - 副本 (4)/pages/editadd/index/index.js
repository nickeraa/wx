var a = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: a(
    a(
      a(
        a(
          a(
            a(
              {
                StatusBar: t.globalData.StatusBar,
                address1: "",
                address2: "",
                shphone: "",
                shname: "",
              },
              "address1",
              ""
            ),
            "address2",
            ""
          ),
          "tag",
          ""
        ),
        "isBeta",
        !1
      ),
      "id",
      ""
    ),
    "ret",
    {}
  ),
  back: function () {
    var a = getCurrentPages();
    a[a.length - 2].setData({ ret: this.data.ret }),
      wx.navigateBack({ delta: 1 });
  },
  onLoad: function (a) {
    a.id && this.setData({ id: a.id });
  },
  onShow: function () {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_seaddress.ashx",
      data: { id: a.data.id },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          t.data.length > 0 &&
            (a.setData({
              address1: t.data[0].ADDRESS1,
              address2: t.data[0].ADDRESS2,
              shphone: t.data[0].PHONE,
              shname: t.data[0].BODY,
              id: t.data[0].ID,
              tag: t.data[0].TAG,
            }),
            "1" == a.data.tag
              ? a.setData({ isBeta: !0 })
              : a.setData({ isBeta: !1 }),
            console.log(a.data.isBeta),
            console.log(a.data.tag));
      },
    });
  },
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
          d = "",
          o = "";
        null != e && null != e && ((s = e[0]), (d = e[1]), (o = e[2])),
          console.log(s, d, o),
          console.log(t),
          a.setData({
            address1: s + "/" + d + "/" + o,
            address2: t.address.replace(s + d + o, "") + t.name,
          });
      },
      fail: function (a) {
        console.log(a);
      },
    });
  },
  edit: function () {
    console.log(this.data.tag);
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_upaddress.ashx",
      data: {
        id: a.data.id,
        address1: a.data.address1,
        address2: a.data.address2,
        shname: a.data.shname,
        shphone: a.data.shphone,
        tag: a.data.tag,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        "ok" == t.data
          ? (wx.showToast({
              title: "更新成功",
              icon: "success",
              duration: 2e3,
            }),
            a.shows())
          : wx.showToast({ title: "数据错误", icon: "error", duration: 2e3 });
      },
    });
  },
  shows: function () {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_alladdress.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t.data),
          t.data.length > 0
            ? a.setData({ ret: t.data })
            : a.setData({ ret: null }),
          a.back();
      },
    });
  },
  del: function () {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_deladdress.ashx",
      data: { id: a.data.id },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        "ok" == t.data
          ? (wx.showToast({
              title: "删除成功",
              icon: "success",
              duration: 2e3,
            }),
            a.shows())
          : wx.showToast({ title: "数据错误", icon: "error", duration: 2e3 });
      },
    });
  },
});
