var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    replu: {},
    scimgurl: a.globalData.scimgurl,
    edit: "完成",
    is: !0,
    do: "删除",
    select_all: !1,
    choseNames: "",
    arrdata: [],
    id: "",
    xf_plu: "",
    issum: !0,
    sumprice: 0,
    flag: !0,
    miaosu: "会员实价",
    p: "",
    arrs: "",
  },
  onLoad: function () {},
  gm: function (a) {
    this.setData({ issum: !0 });
    var t = this.data.replu;
    for (var e in (console.log(t), t)) t[e].checked = !1;
    this.setData({ replu: t, select_all: !1 }),
      "完成" == this.data.edit
        ? (this.setData({ edit: "编辑", do: "去结算" }),
          0 == this.data.choseNames.length
            ? this.setData({ is: !0 })
            : this.setData({ is: !1 }))
        : (this.data.edit = "编辑") &&
          (this.setData({ edit: "完成", do: "删除" }),
          0 == this.data.choseNames.length
            ? this.setData({ is: !0 })
            : this.setData({ is: !1 }));
  },
  checkboxChange: function (a) {
    if (
      (console.log("dfsdfsdf"),
      this.setData({
        choseNames: a.detail.value,
        sumprice: "",
        select_all: !1,
      }),
      "编辑" == this.data.edit && this.setData({ issum: !1 }),
      0 == this.data.choseNames.length
        ? this.setData({ is: !0, issum: !0 })
        : this.setData({ is: !1 }),
      console.log(this.data.choseNames),
      "编辑" == this.data.edit)
    ) {
      "" == this.data.sumprice && this.setData({ sumprice: 0 });
      for (var t = 0; t < this.data.choseNames.length; t++) {
        var e = parseFloat(
            this.data.choseNames[t]
              .replace("[", "")
              .replace("]", "")
              .split(",")[1]
          ).toFixed(3),
          s = parseInt(
            this.data.choseNames[t]
              .replace("[", "")
              .replace("]", "")
              .split(",")[2]
          );
        this.setData({ sumprice: this.data.sumprice + e * s }),
          console.log(this.data.sumprice);
      }
      this.setData({ sumprice: parseFloat(this.data.sumprice).toFixed(2) });
    }
  },
  selectall: function (a) {
    this.setData({ sumprice: 0, issum: !0 });
    for (var t = [], e = 0; e < this.data.replu.length; e++)
      if (
        ((this.data.replu[e].checked = !this.data.select_all),
        1 == this.data.replu[e].checked &&
          ((t = t.concat(
            this.data.replu[e].XF_PLU +
              "," +
              this.data.replu[e].REALPRICE +
              "," +
              this.data.replu[e].QTY
          )),
          "编辑" == this.data.edit))
      ) {
        console.log("ppppppp");
        var s = parseFloat(this.data.replu[e].REALPRICE).toFixed(3),
          i = parseInt(this.data.replu[e].QTY);
        this.setData({
          sumprice: parseFloat(
            parseFloat(this.data.sumprice) + parseFloat(s * i)
          ).toFixed(2),
          issum: !1,
        }),
          console.log(this.data.sumprice);
      }
    this.setData({
      replu: this.data.replu,
      select_all: !this.data.select_all,
      choseNames: t,
    }),
      console.log(this.data.replu),
      console.log(this.data.choseNames),
      0 == this.data.choseNames.length
        ? this.setData({ is: !0, sumprice: 0 })
        : this.setData({ is: !1 }),
      console.log("dddddddddddddddddddddd"),
      console.log(this.data.choseNames),
      console.log(this.data.sumprice);
  },
  onShow: function () {
    this.setData({ select_all: !1, issum: !0 }),
      wx.removeTabBarBadge({ index: 3 }),
      wx.setStorageSync("n", "0"),
      wx.setStorageSync("p", "");
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: "",
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data.length),
          a.data.length > 0
            ? t.setData({ replu: a.data, flag: !0 })
            : t.setData({ replu: null, flag: !1 }),
          console.log(t.data.replu);
      },
    });
  },
  shuaxin: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: "",
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        a.data.length > 0
          ? t.setData({ replu: a.data, flag: !0, sumprice: 0, is: !0 })
          : t.setData({
              replu: null,
              select_all: !1,
              is: !0,
              flag: !1,
              sumprice: 0,
            }),
          console.log(t.data.replu);
      },
    });
  },
  go: function () {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  jian: function (t) {
    this.setData({ id: t.currentTarget.dataset.index }),
      console.log(this.data.replu[this.data.id].QTY);
    var e;
    if (
      ((e = this.data.replu[this.data.id].XF_PLU),
      console.log(e),
      console.log(this.data.choseNames),
      this.data.choseNames.toString().indexOf(e) >= 0 && "1",
      "编辑" == this.data.edit &&
        ((this.data.replu[this.data.id].checked = !1),
        this.setData({ is: !0, issum: !0 })),
      "1" == this.data.replu[this.data.id].QTY)
    )
      return wx.showToast({ title: "该商品1件起订哦" }), !1;
    var s = this;
    wx.request({
      url: a.globalData.api + "wx_jianskuyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: s.data.replu[s.data.id].XF_PLU,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "error" != a.data
            ? "编辑" == s.data.edit
              ? (s.setData({
                  sumprice:
                    s.data.sumprice -
                    1 * parseInt(s.data.replu[s.data.id].REALPRICE),
                }),
                (s.data.replu[s.data.id].QTY =
                  parseInt(s.data.replu[s.data.id].QTY) - 1),
                s.setData({ replu: s.data.replu }))
              : s.shuaxin()
            : wx.showToast({ title: "数据出错" });
      },
    });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/ydshop/index?xf_plu=" + a.currentTarget.dataset.xf_plu,
    });
  },
  jia: function (t) {
    this.setData({ id: t.currentTarget.dataset.index }),
      console.log(this.data.replu[this.data.id].QTY),
      console.log(this.data.replu[this.data.id].XF_PLU),
      console.log(this.data.replu[this.data.id].REALPRICE);
    var e;
    (e = this.data.replu[this.data.id].XF_PLU),
      console.log(e),
      console.log(this.data.choseNames),
      console.log(this.data.replu[this.data.id]),
      this.data.choseNames.toString().indexOf(e) >= 0 &&
        ("1", console.log("dddddsdsdsdsdsd")),
      "编辑" == this.data.edit &&
        (console.log(this.data.replu[this.data.id]),
        (this.data.replu[this.data.id].checked = !1),
        this.setData({ is: !0, issum: !0 }));
    var s = this;
    wx.request({
      url: a.globalData.api + "wx_insertyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: s.data.replu[s.data.id].XF_PLU,
        qty: "1",
        fxuserid: wx.getStorageSync("fxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          "ok" == a.data
            ? (console.log(s.data.replu[s.data.id].QTY),
              s.setData({
                sumprice:
                  s.data.sumprice +
                  1 * parseInt(s.data.replu[s.data.id].REALPRICE),
              }),
              (s.data.replu[s.data.id].QTY =
                parseInt(s.data.replu[s.data.id].QTY) + 1),
              s.setData({ replu: s.data.replu }))
            : wx.showToast({ title: "数据出错" });
      },
    });
  },
  seid: function (a) {
    this.setData({
      id: a.currentTarget.dataset.index,
      xf_plu: a.currentTarget.dataset.title,
    });
  },
  del: function (a) {
    "去结算" == this.data.do
      ? wx.navigateTo({
          url: "/pages/depositgwcyd/index/index?xf_plu=" + this.data.choseNames,
        })
      : this.delsku();
  },
  delsku: function (t) {
    var e = this;
    wx.showLoading({ title: "正在加载" }),
      wx.request({
        url: a.globalData.api + "wx_delskuyd.ashx",
        data: {
          vipcode: wx.getStorageSync("vipcode"),
          xf_plu: e.data.choseNames,
          wxuserid: wx.getStorageSync("wxuserid"),
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          wx.hideLoading({}),
            console.log(a.data),
            "error" != a.data
              ? e.shuaxin()
              : wx.showToast({ title: "数据错误" });
        },
      });
  },
});
