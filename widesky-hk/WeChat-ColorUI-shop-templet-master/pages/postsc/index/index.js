var a,
  e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp(),
  s = require("../../../utils/util.js");
Page({
  data:
    ((a = {
      StatusBar: t.globalData.StatusBar,
      CustomBar: t.globalData.CustomBar,
      TabbarBot: t.globalData.tabbar_bottom,
      scimgurl: t.globalData.scimgUrl,
      TabCur: 0,
      scrollLeft: 0,
      replu: {},
      rv: !0,
      countboy: "",
      xf_store: "",
      xf_plu: "",
      xf_qty: "",
      vipcode: "",
      vipname: "",
      i: "",
      xf_vipcode: "",
      xf_surname: "",
      grade: "",
      xf_stores: "",
      xf_issuedate: "",
      xf_users: "",
      xf_username: "",
      xf_bonus: "",
    }),
    e(
      e(
        e(
          e(
            e(
              e(
                e(
                  e(e(e(a, "xf_plu", ""), "xf_desci", ""), "date", ""),
                  "date2",
                  ""
                ),
                "userid",
                ""
              ),
              "snumber",
              ""
            ),
            "store",
            ""
          ),
          "storename",
          ""
        ),
        "picker4",
        []
      ),
      "index4",
      null
    ),
    e(e(e(a, "picker3", []), "index3", null), "xf_staffcode", "")),
  bindDateChange: function (a) {
    console.log(a.detail.value), this.setData({ date: a.detail.value });
  },
  bindDateChange2: function (a) {
    this.setData({ date2: a.detail.value });
  },
  onLoad: function (a) {
    console.log(this.data.scimgurl);
    var e = s.formatDate(new Date());
    this.setData({ date: "2024-01-01", date2: e });
    var o = this;
    wx.getStorageSync("masterid")
      ? wx.request({
          url: t.globalData.api + "wx_sestore.ashx",
          data: {},
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (a) {
            console.log(a);
            a.data.push({
              XF_STORECODE: "all",
              XF_NAME: "所有店铺",
              LCCODE: "所有店铺",
            });
            o.setData({ picker3: a.data });
          },
        })
      : wx.request({
          url: t.globalData.api + "checkstore.ashx",
          data: { userid: wx.getStorageSync("userid") },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (a) {
            console.log(a), o.setData({ picker3: a.data });
          },
        });
  },
  bindPickerChange4: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index4: a.detail.value,
        xf_staffcode: this.data.picker4[a.detail.value].XF_STAFFCODE,
      }),
      console.log(this.data.xf_staffcode);
  },
  sestaff: function () {
    (wx.getStorageSync("qguserid") || wx.getStorageSync("masterid")) &&
      this.setData({ i: "0" });
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_sestaff.ashx",
      data: {
        xf_storecode: a.data.store,
        userid: wx.getStorageSync("userid"),
        i: a.data.i,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e);
        a.setData({ picker4: e.data }),
          (wx.getStorageSync("qguserid") || wx.getStorageSync("masterid")) &&
            (a.data.picker4.push({ XF_STAFFCODE: "all", XF_NAME: "所有员工" }),
            a.setData({ picker4: a.data.picker4 })),
          console.log(a.data.picker4);
      },
    });
  },
  back: function () {
    wx.navigateBack({ delta: 1 });
  },
  bindPickerChange3: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index3: a.detail.value,
        store: this.data.picker3[a.detail.value].XF_STORECODE,
        storename: this.data.picker3[a.detail.value].XF_NAME,
      }),
      this.sestaff();
  },
  onShow: function (a) {},
  yfk: function () {
    var a = this;
    wx.showLoading({ title: "正在加载数据", mask: !0 }),
      wx.request({
        url: t.globalData.api + "wx_yg_ydfk.ashx",
        data: {
          xf_storecode: a.data.store,
          xf_staffcode: a.data.xf_staffcode,
          begindate: a.data.date,
          enddate: a.data.date2,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (e) {
          console.log(e.data.items),
            e.data.items.length > 0
              ? a.setData({ replu: e.data.items })
              : (wx.showModal({
                  title: "提示",
                  content: "没有符合条件的数据",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                }),
                a.setData({ replu: null })),
            wx.hideLoading();
        },
      });
  },
  selectsku: function (a) {
    var e = a.currentTarget.dataset.xf_plu;
    console.log(e), wx.navigateTo({ url: "/pages/shopcg/goods/index?id=" + e });
  },
  checkinput: function () {
    return (
      this.setData({ replu: null }),
      "" == this.data.store
        ? (wx.showToast({
            title: "请选择查询店铺",
            icon: "none",
            duration: 2e3,
          }),
          !1)
        : "" == this.data.xf_staffcode
        ? (wx.showToast({
            title: "请选择查询员工",
            icon: "none",
            duration: 2e3,
          }),
          !1)
        : void this.yfk()
    );
  },
});
