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
          vipcode: "",
          vipname: "",
          xf_vicode: "",
          xf_surname: "",
          check: "true",
          check1: "true",
          check2: "true",
          whnumnber: "",
          setype: "",
          index2: null,
          picker2: [],
          store: "",
          storename: "",
          f1:true
        },
        onLoad: function (t) {},
        back: function () {
          wx.navigateBack({ delta: 1 });
        },
        bindPickerChange2: function (e) {
          console.log("picker发送选择改变，携带值为", e.detail.value),
            this.setData({
              index2: e.detail.value,
              store: this.data.picker2[e.detail.value].XF_STORECODE,
              storename: this.data.picker2[e.detail.value].XF_NAME,
            });
        },
        getvipcode: function (t) {
          this.setData({ vipcode: t.detail.value });
        },
 
        getwh: function (t) {
          this.setData({ whnumber: t.detail.value });
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
        onShow: function () {
          var a = this;
          wx.request({
            url: e.globalData.api + "wx_sestore.ashx",
            data: {},
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function (e) {
              console.log(e), a.setData({
                picker2: e.data
              });
            },
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
            ? this.liststore()
            : this.listwh();
        },
        listwh: function () {
          if ("" == this.data.whnumber)
            return (
              wx.showToast({
                title: "请输入3位数尾号查询",
                icon: "none",
                duration: 2e3,
              }),
              this.setData({
                rejob:null,
                f1:true
              }),
              !1
            );
    ;
          var t = this;
          wx.showLoading({ title: "正在加载数据", mask: !0 }),
            wx.request({
              url: e.globalData.api + "wx_selectwh.ashx",
              data: { whnumber: t.data.whnumber },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (e) {
                console.log(e),
                  e.data.length > 0
                    ? t.setData({ rejob: e.data,f1:false })
                    : (t.setData({ rejob: null,f1:true }),
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
              this.setData({
                rejob:null,
                f1:true
              }),
              !1
            );
          var t = this;
          wx.showLoading({ title: "正在加载数据", mask: !0 }),
            wx.request({
              url: e.globalData.api + "wx_sewh.ashx",
              data: {
                vipcode: t.data.vipcode
            
              },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (e) {
                console.log(e),
                  e.data.length > 0
                    ? t.setData({ rejob: e.data,f1:false })
                    : (t.setData({ rejob: null,f1:true }),
                      wx.showModal({
                        title: "提示",
                        content: "没有登记信息或卡号输入错误",
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
        liststore: function () {
          if ("" == this.data.store)
            return (
              wx.showToast({
                title: "请选择登记店铺",
                icon: "none",
                duration: 2e3,
              }),
              this.setData({
                rejob:null,
                f1:true
              }),
              !1
            );
          var t = this;
          wx.showLoading({ title: "正在加载数据", mask: !0 }),
            wx.request({
              url: e.globalData.api + "wx_storewh.ashx",
              data: {
                xf_storecode: this.data.store.substring(0, 4)
              },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (e) {
                console.log(e),
                  e.data.length > 0
                    ? t.setData({ rejob: e.data,f1:false })
                    : (t.setData({ rejob: null,f1:true }),
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
    
    ),

  )
);
