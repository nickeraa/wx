var t = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page(
  t(
    {
      data: {
        StatusBar: e.globalData.StatusBar,
        CustomBar: e.globalData.CustomBar,
        TabbarBot: e.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        xf_store: "",
        xf_plu: "",
        xf_qty: "",
        vipcode: "",
        snumber: "",
        susername: "",
        entime: "",
        gjuserid: "",
        check: "true",
        check1: "true",
        index2: null,
        picker2: [],
        store: "",
        setype: "",
      },
      onLoad: function (t) {},
      checkname: function (t) {
        var a = this;
        wx.request({
          url: e.globalData.api + "wx_customer_checkuser.ashx",
          data: { gjuserid: a.data.gjuserid },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (t) {
            console.log(t),
              0 == t.data.length
                ? wx.showModal({
                    title: "提示",
                    content: "员工不存在！",
                    showCancel: !1,
                    success: function (t) {
                      t.confirm;
                    },
                  })
                : a.setData({ susername: t.data[0].XF_NAME });
          },
        });
      },
      getuserid: function (t) {
        this.setData({ gjuserid: t.detail.value });
      },
      radioChange: function (t) {
        console.log("radior发送选择改变，携带值为", t.detail.value),
          this.setData({ setype: t.detail.value }),
          "0" == this.data.setype
            ? (this.setData({ check: "", check1: "true" }), this.onShow())
            : (this.setData({ check1: "", check: "true" }), this.onShow());
      },
      bindPickerChange2: function (t) {
        console.log("picker发送选择改变，携带值为", t.detail.value),
          this.setData({
            index2: t.detail.value,
            store: this.data.picker2[t.detail.value].XF_STORECODE,
            storename: this.data.picker2[t.detail.value].XF_NAME,
          });
      },
      onShow: function (t) {
        var a = this;
        "" == a.data.check &&
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
      listfh: function (t) {
        wx.navigateTo({
          url:
            "/pages/fhstockssss/index/index?wlnumber=" +
            t.currentTarget.dataset.wlnumber,
        });
      },
      checkinput: function () {
        "" == this.data.setype
          ? wx.showModal({
              title: "提示",
              content: "请选择查询方式！",
              showCancel: !1,
              success: function (t) {
                t.confirm;
              },
            })
          : "0" == this.data.setype
          ? this.liststore()
          : this.listuser();
      },
      liststore: function () {
        var t = this;
        wx.showLoading({ title: "正在加载数据", mask: !0 }),
          wx.request({
            url: e.globalData.api + "wx_customer_stockstates.aspx",
            data: { store: t.data.store },
            header: { "content-type": "application/x-www-form-urlencoded" },
            dataType: "json",
            success: function (e) {
              console.log(e),
                e.data.length > 0
                  ? t.setData({ rejob: e.data })
                  : (t.setData({ rejob: null }),
                    wx.showModal({
                      title: "提示",
                      content: "没有数据！",
                      showCancel: !1,
                      success: function (t) {
                        t.confirm;
                      },
                    })),
                wx.hideLoading();
            },
            complete: function () {},
          });
      },
      listuser: function () {
        var t = this;
        wx.showLoading({ title: "正在加载数据", mask: !0 }),
          wx.request({
            url: e.globalData.api + "wx_customer_stockusers.ashx",
            data: { gjuserid: t.data.gjuserid },
            header: { "content-type": "application/x-www-form-urlencoded" },
            dataType: "json",
            success: function (e) {
              console.log(e),
                e.data.length > 0
                  ? t.setData({ rejob: e.data })
                  : (t.setData({ rejob: null }),
                    wx.showModal({
                      title: "提示",
                      content: "没有数据！",
                      showCancel: !1,
                      success: function (t) {
                        t.confirm;
                      },
                    })),
                wx.hideLoading();
            },
            complete: function () {},
          });
      },
    },
    "onShow",
    function (t) {
      var a = this;
      "" == a.data.check &&
        wx.request({
          url: e.globalData.api + "wx_sestore.ashx",
          data: {},
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (t) {
            console.log(t), a.setData({ picker2: t.data });
          },
        });
    }
  )
);
