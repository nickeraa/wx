var t = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page({
  data: t(
    t(
      t(
        t(
          t(
            t(
              t(
                t(
                  t(
                    t(
                      {
                        StatusBar: e.globalData.StatusBar,
                        CustomBar: e.globalData.CustomBar,
                        phone: "",
                        username: "",
                        openid: "",
                        userid: "",
                        xf_plu: "",
                        xf_name: "",
                        warning: "",
                        qty: "",
                        vipcode: "",
                        vipname: "",
                        dnumber: "",
                        susername: "",
                        result: {},
                        wlresult: {},
                        acount: "",
                        xf_price: "",
                        index2: null,
                        picker2: [],
                        store: "",
                        storename: "",
                      },
                      "userid",
                      ""
                    ),
                    "imglist",
                    e.globalData.api + "images/timg.jpg"
                  ),
                  "imgurl",
                  ""
                ),
                "view",
                "true"
              ),
              "views",
              "true"
            ),
            "znumber",
            ""
          ),
          "str",
          ""
        ),
        "price",
        ""
      ),
      "gjuserid",
      ""
    ),
    "temp",
    ""
  ),
  bindPickerChange2: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({
        index2: t.detail.value,
        store: this.data.picker2[t.detail.value].XF_STORECODE,
        storename: this.data.picker2[t.detail.value].XF_NAME,
      });
  },
  getdnumber: function (t) {
    this.setData({ dnumber: t.detail.value }), console.log(this.data.dnumber);
  },
  addsq: function (t) {
    if ((console.log(this.data.znumber), !this.data.price)) return !1;
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_customer_inwlstock.ashx",
      data: {
        znumber: a.data.znumber,
        store: a.data.store,
        xf_plu: a.data.xf_plu,
        snumber: a.data.dnumber,
        userid: wx.getStorageSync("userid"),
        price: a.data.price,
        qty: a.data.qty,
        gjuserid: a.data.gjuserid,
        vipcode: a.data.vipcode,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          "ok" == t.data
            ? wx.showModal({
                title: "提示",
                content: "添加成功",
                showCancel: !1,
                success: function (t) {
                  t.confirm && a.listsq();
                },
              })
            : wx.showModal({
                title: "提示",
                content: "添加数据错误",
                showCancel: !1,
                success: function (t) {
                  t.confirm;
                },
              });
      },
    });
  },
  listsq: function () {
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_customer_listqd.ashx",
      data: { userid: wx.getStorageSync("userid") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e), t.setData({ wlresult: e.data, views: "" });
      },
    });
  },
  delnumber: function (t) {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_customer_delnumber.ashx",
      data: {
        userid: wx.getStorageSync("userid"),
        znumber: t.currentTarget.dataset.znumber,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          wx.showModal({
            title: "提示",
            content: "删除成功",
            showCancel: !1,
            success: function (t) {
              t.confirm && a.listsq();
            },
          });
      },
    });
  },
  checkinput: function (t) {
    "" == this.data.snumber
      ? wx.showToast({ title: "请输入定金单号", icon: "none", duration: 1e3 })
      : null == this.data.index2
      ? wx.showToast({ title: "请输入发货店铺", icon: "none", duration: 1e3 })
      : this.senumber();
  },
  senumber: function (t) {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_customer_sednumber.ashx",
      data: { dnumber: a.data.dnumber, store: a.data.store },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          0 == t.data.length
            ? wx.showModal({
                title: "提示",
                content: "定金单号不存在！",
                showCancel: !1,
                success: function (t) {
                  t.confirm && a.setData({ view: "true" });
                },
              })
            : a.setData({ result: t.data, view: "" });
      },
    });
  },
  sewlnumber: function (t) {
    var a = this;
    a.setData({ temp: t.currentTarget.dataset.temp }),
      console.log(a.data.temp),
      a.setData({
        store: a.data.temp.split(",")[0],
        dnumber: a.data.temp.split(",")[1],
        xf_plu: a.data.temp.split(",")[2],
        qty: a.data.temp.split(",")[3],
        price: a.data.temp.split(",")[4],
        gjuserid: a.data.temp.split(",")[5],
        vipcode: a.data.temp.split(",")[6],
      }),
      a.setData({ znumber: a.data.store + a.data.dnumber + a.data.xf_plu }),
      console.log(a.data.znumber),
      console.log(a.data.store),
      console.log(a.data.dnumber),
      console.log(a.data.xf_plu),
      console.log(a.data.price),
      console.log(a.data.qty),
      console.log(a.data.gjuserid),
      console.log(a.data.vipcode),
      wx.request({
        url: e.globalData.api + "wx_customer_sewlqnumber.ashx",
        data: { znumber: a.data.znumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t),
            t.data.length > 0 && "0" != t.data.zstate
              ? wx.showModal({
                  title: "提示",
                  content: "此销售单的此货品已经提交了发货申请，不要重复申请",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                })
              : t.data.length > 0 && "0" == t.data.zstate
              ? a.listsq()
              : a.addsq();
        },
      });
  },
  insq: function (t) {
    this.data.wlresult == []
      ? wx.showModal({
          title: "提示",
          content: "没有数据！",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        })
      : wx.navigateTo({ url: "/pages/wlsqd/index?store=" + this.data.store });
  },
  onLoad: function (t) {},
  onShow: function (t) {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_sestore.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), a.setData({ picker2: t.data });
      },
    });
  },
});
