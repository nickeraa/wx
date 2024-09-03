var t = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page(
  t(
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
          vipname: "",
          xf_vicode: "",
          xf_surname: "",
          grade: "",
          xf_stores: "",
          xf_issuedate: "",
          xf_users: "",
          xf_username: "",
          xf_bonus: "",
          check: "true",
          check1: "true",
          check2: "true",
          vipphone: "",
          setype: "",
        },
        onLoad: function (t) {},
        back: function () {
          wx.navigateBack({ delta: 1 });
        },
        getvipcode: function (t) {
          this.setData({ vipcode: t.detail.value });
        },
        getvipname: function (t) {
          this.setData({ vipname: t.detail.value });
        },
        getvipphone: function (t) {
          this.setData({ vipphone: t.detail.value });
        },
        radioChange: function (t) {
          console.log("radior发送选择改变，携带值为", t.detail.value),
            this.setData({ setype: t.detail.value }),
            "0" == this.data.setype
              ? this.setData({ check: "", check1: "true", check2: "true" })
              : "1" == this.data.setype
              ? this.setData({ check1: "", check: "true", check2: "true" })
              : this.setData({ check1: "true", check: "true", check2: "" }),
            console.log(this.data.check2);
        },
        onShow: function (t) {},
        saleslist: function (t) {
          wx.navigateTo({
            url:
              "/pages/vipsaless/index/index?vipcode=" +
              t.currentTarget.dataset.xf_vipcode,
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
            ? this.listvipcode()
            : "1" == this.data.setype
            ? this.listuser()
            : this.listphone();
        },
        listphone: function () {
          if ("" == this.data.vipphone)
            return (
              wx.showToast({
                title: "请输入客户手机号查询",
                icon: "none",
                duration: 2e3,
              }),
              !1
            );
          if (
            !/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|16[0-9]|12[0-9]|11[0-9]|10[0-9])\d{8}$$/.test(
              this.data.vipphone
            )
          )
            return (
              wx.showToast({
                title: "请输入正确的手机号",
                icon: "none",
                duration: 1e3,
              }),
              !1
            );
          var t = this;
          wx.showLoading({ title: "正在加载数据", mask: !0 }),
            wx.request({
              url: e.globalData.api + "wx_checkphone.ashx",
              data: { vipphone: t.data.vipphone },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (e) {
                console.log(e),
                  e.data.length > 0
                    ? t.setData({ rejob: e.data })
                    : (t.setData({ rejob: null }),
                      wx.showModal({
                        title: "提示",
                        content: "没有记录",
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
        listvipcode: function () {
          if ("" == this.data.vipcode)
            return (
              wx.showToast({
                title: "请输入客户卡号查询",
                icon: "none",
                duration: 2e3,
              }),
              !1
            );
          var t = this;
          wx.showLoading({ title: "正在加载数据", mask: !0 }),
            wx.request({
              url: e.globalData.api + "wx_checkvips.ashx",
              data: {
                vipcode: t.data.vipcode,
                userid: wx.getStorageSync("userid"),
              },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (e) {
                console.log(e),
                  e.data.length > 0
                    ? t.setData({ rejob: e.data })
                    : (t.setData({ rejob: null }),
                      wx.showModal({
                        title: "提示",
                        content: "卡号不存在或输入错误",
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
          if ("" == this.data.vipname)
            return (
              wx.showToast({
                title: "请输入客户姓名查询",
                icon: "none",
                duration: 2e3,
              }),
              !1
            );
          var t = this;
          wx.showLoading({ title: "正在加载数据", mask: !0 }),
            wx.request({
              url: e.globalData.api + "gt_vipname.ashx",
              data: {
                vipname: t.data.vipname,
                userid: wx.getStorageSync("userid"),
              },
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
      function (t) {}
    ),
    "getznumber",
    function (t) {
      wx.navigateTo({
        url:
          "/pages/listall/index/index?znumber=" +
          t.currentTarget.dataset.znumber,
      });
    }
  )
);
