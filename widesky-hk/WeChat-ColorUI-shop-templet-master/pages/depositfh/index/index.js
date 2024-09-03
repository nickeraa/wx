var t = getApp(),
  a = require("../../../utils/util.js");
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    scimgurl: "https://widesky.work/scimg/",
    replu: {},
    xf_docno: "",
    tag: "",
    salestypes: "",
    flag: !0,
    index2: "",
    picke2: [],
    store: "",
    storename: "",
    kc_xf_docno: "",
    imglist: t.globalData.api + "images/timg.jpg",
    imgurl: "",
    i: "",
    date: "",
    check0: !0,
    check1: !0,
    check2: !0,
    vipcode: "",
    kdnumber: "",
    sumsqprice: 0,
  },
  bindDateChange: function (t) {
    console.log(t.detail.value), this.setData({ date: t.detail.value });
  },
  radioChange: function (t) {
    console.log("radior发送选择改变，携带值为", t.detail.value),
      "0" == t.detail.value
        ? this.setData({ check0: !1, check1: !0, check2: !0 })
        : "1" == t.detail.value
        ? this.setData({ check1: !1, check0: !0, check2: !0 })
        : "2" == t.detail.value
        ? this.setData({ check2: !1, check0: !0, check1: !0 })
        : "3" == t.detail.value &&
          (this.setData({ check2: !0, check0: !0, check1: !0 }),
          wx.showModal({
            title: "提示",
            content: "取消订单涉及客户退款，请向财务部门申请",
            showCancel: !1,
            success: function (t) {
              t.confirm;
            },
          }));
  },
  getkdnumber: function (t) {
    this.setData({ kdnumber: t.detail.value }), console.log(this.data.kdnumber);
  },
  scan: function () {
    var t = this;
    wx.scanCode({
      onlyFromCamera: !0,
      success: function (a) {
        console.log("扫码成功：" + JSON.stringify(a)),
          t.setData({ kdnumber: a.result });
      },
      fail: function (t) {
        console.log(t),
          wx.showToast({ title: "扫描失败", icon: "none", duration: 1e3 });
      },
    });
  },
  fs: function () {
    wx.navigateToMiniProgram({
      appId: "wx187fe5b10e271c63",
      path: "/pages/fkdeposit/index/index",
      extraData: {
        yguserid: wx.getStorageSync("userid"),
        vipcode: this.data.vipcode,
        xf_docno: this.data.xf_docno,
        d: "1",
      },
    });
  },
  back: function () {
    "" == this.data.i
      ? wx.switchTab({ url: "/pages/jzb/index/index" })
      : wx.navigateBack({ delta: 0 });
  },
  selectsku: function (t) {
    console.log(t.currentTarget.dataset.xf_plu),
      wx.navigateTo({
        url: "/pages/shopcg/goods/index?id=" + t.currentTarget.dataset.xf_plu,
      });
  },
  getnumber: function (t) {
    this.setData({ kc_xf_docno: t.detail.value }),
      console.log(this.data.kc_xf_docno);
  },
  bindPickerChange2: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({
        index2: t.detail.value,
        store: this.data.picker2[t.detail.value].XF_STORECODE,
        storename: this.data.picker2[t.detail.value].XF_NAME,
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
  ddqh: function () {
    if ("" == this.data.store) return wx.showToast({ title: "请选择店铺" }), !1;
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_upddqh.ashx",
      data: {
        xf_docno: a.data.xf_docno,
        xf_storecode: a.data.store,
        date: a.data.date,
        imgurl: a.data.imgurl,
        userid4: wx.getStorageSync("userid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        "ok" == t.data
          ? wx.showModal({
              title: "提示",
              content: "已提交",
              showCancel: !1,
              success: function (t) {
                t.confirm && a.vip_sort1();
              },
            })
          : wx.showToast({ title: "数据错误" });
      },
    });
  },
  vip_sort1: function () {
    wx.request({
      url: t.globalData.api + "listtag1.ashx",
      data: {
        xf_storecode: this.data.xf_storecode,
        userid: this.data.userid,
        begindate: this.data.begindate,
        enddate: this.data.enddate,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t);
        var a = getCurrentPages();
        a[a.length - 2].setData({ rejob: t.data }),
          wx.navigateBack({ delta: 0 });
      },
    });
  },
  upkd: function () {
    if ("" == this.data.store) return wx.showToast({ title: "请选择店铺" }), !1;
    if ("" == this.data.kdnumber)
      return wx.showToast({ title: "请填写快递单号" }), !1;
    if (this.data.sumsqprice > 0)
      return (
        wx.showModal({
          title: "提示",
          content: "客户尚欠金额大于0，不能发快递",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_sckd.ashx",
      data: {
        xf_docno: a.data.xf_docno,
        xf_storecode: a.data.store,
        kdnumber: a.data.kdnumber,
        date: a.data.date,
        imgurl: a.data.imgurl,
        userid3: wx.getStorageSync("userid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        "ok" == t.data
          ? wx.showModal({
              title: "提示",
              content: "已提交",
              showCancel: !1,
              success: function (t) {
                t.confirm && a.vip_sort2();
              },
            })
          : wx.showToast({ title: "数据错误" });
      },
    });
  },
  vip_sort2: function () {
    wx.request({
      url: t.globalData.api + "listtag1.ashx",
      data: {
        xf_storecode: this.data.xf_storecode,
        userid: this.data.userid,
        begindate: this.data.begindate,
        enddate: this.data.enddate,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t);
        var a = getCurrentPages();
        a[a.length - 2].setData({ rejob: t.data }),
          wx.navigateBack({ delta: 0 });
      },
    });
  },
  tj: function () {
    "" == this.data.store
      ? wx.showToast({ title: "请选择店铺" })
      : "" == this.data.kc_xf_docno
      ? wx.showToast({ title: "请填写电脑单号" })
      : "" == this.data.imgurl
      ? wx.showToast({ title: "请上传单据" })
      : this.checkdnumber();
  },
  checkdnumber: function () {
    wx.request({
      url: t.globalData.api + "wx_checkscddqh.ashx",
      data: {
        xf_storecode: this.data.store,
        kc_xf_docno: this.data.kc_xf_docno,
        xf_docno: this.data.xf_docno,
        imgurl: this.data.imgurl,
        date: this.data.date,
        userid2: wx.getStorageSync("userid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" == t.data
            ? wx.showModal({
                title: "提示",
                content: "提交成功！",
                showCancel: !1,
                success: function (t) {
                  t.confirm && wx.navigateBack({ delta: 0 });
                },
              })
            : wx.showModal({
                title: "错误",
                content: "提交失败！电脑打单数据和商城数据不一致",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              });
      },
    });
  },
  onLoad: function (e) {
    var o = a.formatDate(new Date());
    this.setData({ date: o }),
      e.xf_docno && this.setData({ xf_docno: e.xf_docno }),
      e.i && this.setData({ i: e.i });
    var s = this;
    wx.request({
      url: t.globalData.api + "wx_sestore.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), s.setData({ picker2: t.data });
      },
    });
  },
  kd: function () {
    this.setData({ flag: !1 });
  },
  dd: function () {
    this.setData({ replu: null });
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_depositfh.ashx",
      data: { xf_docno: a.data.xf_docno },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t.data.items),
          t.data.items.length > 0
            ? a.setData({
                replu: t.data.items,
                vipcode: t.data.items[0].XF_VIPCODE,
                sumsqprice: t.data.items[0].SUMSQPRICE,
              })
            : a.setData({ replu: null });
      },
    });
  },
  onShow: function () {
    this.dd();
  },
});
