var e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page(
  e(
    e(
      {
        data: {
          StatusBar: t.globalData.StatusBar,
          CustomBar: t.globalData.CustomBar,
          TabbarBot: t.globalData.tabbar_bottom,
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
        onLoad: function (e) {},
        checkname: function (e) {
          var a = this;
          wx.request({
            url: t.globalData.api + "wx_customer_checkuser.ashx",
            data: { gjuserid: a.data.gjuserid },
            header: { "content-type": "application/x-www-form-urlencoded" },
            dataType: "json",
            success: function (e) {
              console.log(e),
                0 == e.data.length
                  ? wx.showModal({
                      title: "提示",
                      content: "员工不存在！",
                      showCancel: !1,
                      success: function (e) {
                        e.confirm;
                      },
                    })
                  : a.setData({ susername: e.data[0].XF_NAME });
            },
          });
        },
        getuserid: function (e) {
          this.setData({ gjuserid: e.detail.value });
        },
        radioChange: function (e) {
          console.log("radior发送选择改变，携带值为", e.detail.value),
            this.setData({ setype: e.detail.value }),
            "0" == this.data.setype
              ? (this.setData({ check: "", check1: "true" }), this.onShow())
              : (this.setData({ check1: "", check: "true" }), this.onShow());
        },
        bindPickerChange2: function (e) {
          console.log("picker发送选择改变，携带值为", e.detail.value),
            this.setData({
              index2: e.detail.value,
              store: this.data.picker2[e.detail.value].XF_STORECODE,
              storename: this.data.picker2[e.detail.value].XF_NAME,
            });
        },
        onShow: function (e) {
          var a = this;
          "" == a.data.check &&
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
        getznumber: function (e) {
          wx.navigateTo({
            url:
              "/pages/sejzb/index/index?znumber=" +
              e.currentTarget.dataset.znumber,
          });
        },
        checkinput: function () {
          "" == this.data.setype
            ? wx.showModal({
                title: "提示",
                content: "请选择查询方式！",
                showCancel: !1,
                success: function (e) {
                  e.confirm;
                },
              })
            : "0" == this.data.setype
            ? this.liststore()
            : this.listuser();
        },
        liststore: function () {
          var e = this;
          wx.showLoading({ title: "正在加载数据", mask: !0 }),
            wx.request({
              url: t.globalData.api + "wx_customer_stockstate.ashx",
              data: { store: e.data.store },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (t) {
                console.log(t),
                  t.data.length > 0
                    ? e.setData({ rejob: t.data })
                    : (e.setData({ rejob: null }),
                      wx.showModal({
                        title: "提示",
                        content: "没有数据！",
                        showCancel: !1,
                        success: function (e) {
                          e.confirm;
                        },
                      })),
                  wx.hideLoading();
              },
              complete: function () {},
            });
        },
        listuser: function () {
          var e = this;
          wx.showLoading({ title: "正在加载数据", mask: !0 }),
            wx.request({
              url: t.globalData.api + "wx_customer_stockuser.ashx",
              data: { gjuserid: e.data.gjuserid },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (t) {
                console.log(t),
                  t.data.length > 0
                    ? e.setData({ rejob: t.data })
                    : (e.setData({ rejob: null }),
                      wx.showModal({
                        title: "提示",
                        content: "没有数据！",
                        showCancel: !1,
                        success: function (e) {
                          e.confirm;
                        },
                      })),
                  wx.hideLoading();
              },
              complete: function () {},
            });
        },
      },
      "onShow",
      function (e) {
        var a = this;
        "" == a.data.check &&
          wx.request({
            url: t.globalData.api + "wx_sestore.ashx",
            data: {},
            header: { "content-type": "application/x-www-form-urlencoded" },
            dataType: "json",
            success: function (e) {
              console.log(e), a.setData({ picker2: e.data });
            },
          });
      }
    ),
    "getznumber",
    function (e) {
      wx.navigateTo({
        url:
          "/pages/listall/index/index?znumber=" +
          e.currentTarget.dataset.znumber,
      });
    }
  )
);
