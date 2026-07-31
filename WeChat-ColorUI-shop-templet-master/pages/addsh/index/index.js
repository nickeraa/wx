var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    replu: {},
    shphone: "",
    shname: "",
    tag: "",
    address1: "",
    address2: "",
    src: "",
    isBeta: !1,
    ret: {},
    stop: false,
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
        var addr = t.address || "";
        var name = t.name || "";
        var e = addr.match(/.+?(省|市|自治区|自治州|县|区)/g);
        var s = "", o = "", d = "";

        if (e && e.length >= 3) {
          s = e[0]; o = e[1]; d = e[2];
        } else if (e && e.length === 2) {
          s = e[0]; o = e[1]; d = "";
        } else if (e && e.length === 1) {
          s = e[0]; o = ""; d = "";
        }

        // 拼接省市区，过滤空值
        var parts = [s, o, d].filter(function (x) { return x; });
        var address1 = parts.join("/") || addr;

        // 从原地址中去除已匹配到的省市区，拼接详细地点
        var detail = addr;
        if (e && e.length) {
          for (var i = 0; i < e.length; i++) {
            detail = detail.replace(e[i], "");
          }
        }
        var address2 = detail + name;

        a.setData({
          address1: address1,
          address2: address2,
        });
      },
      fail: function (a) {
        console.log(a);
      },
    });
  },
  shows: function () {
    var t = this;
    wx.showLoading({ title: "加载中..." });
    wx.request({
      url: a.globalData.api + "wx_alladdress.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        wx.hideLoading();
        console.log(a.data),
          a.data.length > 0
            ? t.setData({ ret: a.data })
            : t.setData({ ret: null });
        var e = getCurrentPages();
        e[e.length - 2].setData({ ret: t.data.ret }),
          wx.navigateBack({ delta: 1 });
      },
      fail: function () {
        wx.hideLoading();
        var e = getCurrentPages();
        e[e.length - 2].setData({ ret: t.data.ret });
        wx.showToast({ title: "地址列表加载失败", icon: "none", duration: 2000 });
        setTimeout(function () { wx.navigateBack({ delta: 1 }); }, 2000);
      },
    });
  },
  add: function () {
    if (this.data.stop) return;
    if ((console.log(this.data.tag), "" == this.data.shname))
      wx.showToast({ title: "请填写收货人", icon: "error", duration: 1e3 });
    // else if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.shphone))) 
    else if (!/^(1[3-9]\d{9}|[569]\d{7})$/.test(this.data.shphone))
    wx.showToast({ title: "手机号不正确", icon: "error", duration: 1e3 });
    else if ("" == this.data.address1)
      wx.showToast({ title: "请填写所在地区", icon: "error", duration: 1e3 });
    else if ("" == this.data.address2)
      wx.showToast({ title: "请填写详细地址", icon: "error", duration: 1e3 });
    else {
      var t = this;
      t.setData({ stop: true });
      wx.showLoading({ title: "保存中..." });
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
        timeout: 10000,
        success: function (a) {
          wx.hideLoading();
          "ok" == a.data
            ? (wx.showToast({
                title: "新增成功",
                icon: "success",
                duration: 2e3,
              }),
              t.back())
            : (t.setData({ stop: false }),
              wx.showToast({ title: "数据错误", icon: "error", duration: 2e3 }));
        },
        fail: function () {
          wx.hideLoading();
          t.setData({ stop: false });
          wx.showToast({ title: "保存失败，请重试", icon: "error", duration: 2e3 });
        },
      });
    }
  },
  onShow: function () {
    if (!this.data.shphone) {
      this.setData({
        shphone: wx.getStorageSync('wxuserid') || ''
      })
    }
  },
});
