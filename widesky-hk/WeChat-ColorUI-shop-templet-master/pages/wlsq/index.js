var t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    date: "",
    qgname: "",
    store: "",
    index2: null,
    picker2: [],
    setype: "",
    wlnumber: "",
    qgid: "",
    shname: "",
    shphone: "",
    shaddr: "",
    wuliu: "",
    youfei: "",
    note: "",
    bprice: 0,
    imglist: t.globalData.api + "images/timg.jpg",
    imglisthw: t.globalData.api + "images/timg.jpg",
    imgurl: "",
    imgurlhw: "",
    tag: !0,
    xingtai: "",
    louti: "",
    latitude: 0,
    longitude: 0,
    mapName: "",
    tags: !0,
    dtaddress: "",
  },
  selectmap: function () {
    var t = this;
    wx.chooseLocation({
      success: function (a) {
        console.log(a),
          console.log(a.name),
          t.setData({
            mapName: a.name,
            dtaddress: a.address,
            latitude: a.latitude,
            longitude: a.longitude,
          });
      },
      fail: function () {},
    });
  },
  dr: function () {
    wx.navigateTo({ url: "/pages/seaddr/index/index" });
  },
  radioChange: function (t) {
    console.log("radior发送选择改变，携带值为", t.detail.value),
      this.setData({ setype: t.detail.value });
  },
  bindDateChange: function (t) {
    console.log(t.detail.value), this.setData({ date: t.detail.value });
  },
  radioChange1: function (t) {
    console.log("radior发送选择改变，携带值为", t.detail.value),
      this.setData({ wuliu: t.detail.value }),
      "0" == this.data.wuliu
        ? this.setData({ tag: !0, tags: !1 })
        : this.setData({ tag: !1, tags: !0 });
  },
  radioChange2: function (t) {
    console.log("radior发送选择改变，携带值为", t.detail.value),
      this.setData({ youfei: t.detail.value });
  },
  radioChange3: function (t) {
    console.log("radior发送选择改变，携带值为", t.detail.value),
      this.setData({ xingtai: t.detail.value });
  },
  radioChange4: function (t) {
    console.log("radior发送选择改变，携带值为", t.detail.value),
      this.setData({ louti: t.detail.value });
  },
  bindPickerChange2: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({
        index2: t.detail.value,
        qgid: this.data.picker2[t.detail.value].XF_STAFFCODE,
        qgname: this.data.picker2[t.detail.value].XF_NAME,
      }),
      console.log("picker发送选择改变，携带值为", this.data.qgid);
  },
  getshname: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({ shname: t.detail.value });
  },
  getbprice: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({ bprice: t.detail.value });
  },
  getnote: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({ note: t.detail.value });
  },
  getshphone: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({ shphone: t.detail.value });
  },
  getshaddr: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({ shaddr: t.detail.value });
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
  ChooseImagehw: function () {
    var a = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (e) {
        a.setData({ imglisthw: e.tempFilePaths }),
          wx.showLoading({ title: "正在上传", mask: !0 }),
          wx.uploadFile({
            url: t.globalData.api + "wx_postimg.ashx",
            filePath: a.data.imglisthw[0],
            name: "imgfile",
            formData: { method: "POST" },
            success: function (t) {
              console.log(t),
                a.setData({ imgurlhw: "djimg/" + t.data }),
                console.log(a.data.imgurlhw),
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
  listqg: function (a) {
    var e = this;
    wx.request({
      url: t.globalData.api + "wx_customer_listqg.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), e.setData({ picker2: t.data }), e.listwl();
      },
    });
  },
  onLoad: function (t) {
    this.setData({ store: t.store });
    var a = new Date(),
      e = a.getFullYear(),
      i = a.getMonth() + 1,
      o = a.getDate();
    this.setData({ date: e + "-" + i + "-" + o });
  },
  wlsq: function () {
    if ("" == this.data.setype)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择库存地点",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.wuliu)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择物流方式",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.youfei && "0" == this.data.wuliu)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择是否包邮",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.date && "1" == this.data.wuliu)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择发货日期",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.xingtai && "1" == this.data.wuliu)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择货物形态",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.mapName && "1" == this.data.wuliu)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择地图定位",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.louti && "1" == this.data.wuliu)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择是否电梯",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.shname)
      return (
        wx.showModal({
          title: "提示",
          content: "请输入收货人",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.shphone)
      return (
        wx.showModal({
          title: "提示",
          content: "请输入联系电话",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if (
      !/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|16[0-9]|12[0-9]|11[0-9]|10[0-9])\d{8}$$/.test(
        this.data.shphone
      )
    )
      return (
        wx.showModal({
          title: "提示",
          content: "手机号码输入错误",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.shaddr)
      return (
        wx.showModal({
          title: "提示",
          content: "请输入送货地址",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if ("" == this.data.imgurl)
      return (
        wx.showModal({
          title: "提示",
          content: "请上传销售单照片",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    if (null == this.data.index2)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择审核区管",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        }),
        !1
      );
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_customer_wlsq.ashx",
      data: {
        wlnumber: a.data.wlnumber,
        userid: wx.getStorageSync("userid"),
        setype: a.data.setype,
        qguserid: a.data.qgid,
        shname: a.data.shname,
        shphone: a.data.shphone,
        shaddr: a.data.shaddr,
        wuliu: a.data.wuliu,
        youfei: a.data.youfei,
        note: a.data.note,
        bprice: a.data.bprice,
        imgurl: a.data.imgurl,
        imgurlhw: a.data.imgurlhw,
        date: a.data.date,
        xingtai: a.data.xingtai,
        mapname: a.data.mapName,
        louti: a.data.louti,
        latitude: a.data.latitude,
        longitude: a.data.longitude,
        dtaddress: a.data.dtaddress,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" == t.data
            ? wx.showModal({
                title: "提示",
                content: "申请成功，申请单号" + a.data.wlnumber,
                showCancel: !1,
                success: function (t) {
                  t.confirm && a.fhqg();
                },
              })
            : "dateerror" == t.data
            ? wx.showModal({
                title: "提示",
                content: "申请失败，仓库司机送货只能选择周一、周三、或周五",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              })
            : "numbererror" == t.data
            ? wx.showModal({
                title: "提示",
                content:
                  "申请失败，发货日期" + a.data.date + ",仓库每天只能运送2单",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              })
            : "jherror" == t.data
            ? wx.showModal({
                title: "提示",
                content: "只能每周二或每周四，申请顺丰物流寄货",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              })
            : wx.showModal({
                title: "提示",
                content: "申请失败，数据错误",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              });
      },
    });
  },
  onShow: function () {
    this.listqg();
  },
  listwl: function () {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_customer_listwlsq.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), a.setData({ wlnumber: a.data.store + t.data });
      },
    });
  },
  fhqg: function () {
    wx.request({
      url: t.globalData.api + "fhqg.aspx",
      data: { wlnumber: this.data.wlnumber, qguserid: this.data.qgid },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), wx.switchTab({ url: "/pages/jzb/index/index" });
      },
    });
  },
});
