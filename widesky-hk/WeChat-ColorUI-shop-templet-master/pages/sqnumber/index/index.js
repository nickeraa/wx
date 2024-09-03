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
                e(
                  e(
                    e(
                      {
                        StatusBar: t.globalData.StatusBar,
                        CustomBar: t.globalData.CustomBar,
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
                        snumber: "",
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
                    t.globalData.api + "images/timg.jpg"
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
  bindPickerChange2: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value),
      this.setData({
        index2: e.detail.value,
        store: this.data.picker2[e.detail.value].XF_STORECODE,
        storename: this.data.picker2[e.detail.value].XF_NAME,
      });
  },
  getsnumber: function (e) {
    this.setData({ snumber: e.detail.value }), console.log(this.data.snumber);
  },
  addsq: function (e) {
    if ((console.log(this.data.znumber), !this.data.price)) return !1;
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_customer_inwlstock.ashx",
      data: {
        znumber: a.data.znumber,
        store: a.data.store,
        xf_plu: a.data.xf_plu,
        snumber: a.data.snumber,
        userid: wx.getStorageSync("userid"),
        price: a.data.price,
        qty: a.data.qty,
        gjuserid: a.data.gjuserid,
        vipcode: a.data.vipcode,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          "ok" == e.data
            ? wx.showModal({
                title: "提示",
                content: "添加成功",
                showCancel: !1,
                success: function (e) {
                  e.confirm && a.listsq();
                },
              })
            : wx.showModal({
                title: "提示",
                content: "添加数据错误",
                showCancel: !1,
                success: function (e) {
                  e.confirm;
                },
              });
      },
    });
  },
  listsq: function () {
    var e = this;
    wx.request({
      url: t.globalData.api + "wx_customer_listsq.ashx",
      data: { userid: wx.getStorageSync("userid") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), e.setData({ wlresult: t.data, views: "" });
      },
    });
  },
  delnumber: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_customer_delnumber.ashx",
      data: {
        userid: wx.getStorageSync("userid"),
        znumber: e.currentTarget.dataset.znumber,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          wx.showModal({
            title: "提示",
            content: "删除成功",
            showCancel: !1,
            success: function (e) {
              e.confirm && a.listsq();
            },
          });
      },
    });
  },
  checkinput: function (e) {
    "" == this.data.snumber
      ? wx.showToast({ title: "请输入销售单号", icon: "none", duration: 1e3 })
      : null == this.data.index2
      ? wx.showToast({ title: "请输入发货店铺", icon: "none", duration: 1e3 })
      : this.senumber();
  },
  senumber: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_customer_senumber.ashx",
      data: { snumber: a.data.snumber, store: a.data.store },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          0 == e.data.length
            ? wx.showModal({
                title: "提示",
                content: "销售单号不存在！",
                showCancel: !1,
                success: function (e) {
                  e.confirm && a.setData({ view: "true" });
                },
              })
            : a.setData({ result: e.data, view: "" });
      },
    });
  },
  sewlnumber: function (e) {
    var a = this;
    a.setData({ temp: e.currentTarget.dataset.temp }),
      console.log(a.data.temp),
      a.setData({
        store: a.data.temp.split(",")[0],
        snumber: a.data.temp.split(",")[1],
        xf_plu: a.data.temp.split(",")[2],
        qty: a.data.temp.split(",")[3],
        price: a.data.temp.split(",")[4],
        gjuserid: a.data.temp.split(",")[5],
        vipcode: a.data.temp.split(",")[6],
      }),
      a.setData({ znumber: a.data.store + a.data.snumber + a.data.xf_plu }),
      console.log(a.data.znumber),
      console.log(a.data.store),
      console.log(a.data.snumber),
      console.log(a.data.xf_plu),
      console.log(a.data.price),
      console.log(a.data.qty),
      console.log(a.data.gjuserid),
      console.log(a.data.vipcode),
      wx.request({
        url: t.globalData.api + "wx_customer_sewlqnumber.ashx",
        data: { znumber: a.data.znumber },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e),
            e.data.length > 0 && "0" != e.data.zstate
              ? wx.showModal({
                  title: "提示",
                  content: "此销售单的此货品已经提交了发货申请，不要重复申请",
                  showCancel: !1,
                  success: function (e) {
                    e.confirm;
                  },
                })
              : e.data.length > 0 && "0" == e.data.zstate
              ? a.listsq()
              : a.addsq();
        },
      });
  },
  insq: function (e) {
    this.data.wlresult == []
      ? wx.showModal({
          title: "提示",
          content: "没有数据！",
          showCancel: !1,
          success: function (e) {
            e.confirm;
          },
        })
      : wx.navigateTo({ url: "/pages/wlsq/index?store=" + this.data.store });
  },
  sesnumber: function (e) {
    console.log(e.currentTarget.dataset.znumber),
      wx.navigateTo({
        url:
          "/pages/listjzbss/index/index?znumber=" +
          e.currentTarget.dataset.znumber,
      });
  },
  onLoad: function (e) {},
  onShow: function (e) {
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_sestore.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e), a.setData({ picker2: e.data });
      },
    });
  },
});
