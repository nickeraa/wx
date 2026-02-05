var a = getApp(),
  t = require("../../../utils/util.js");
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
    scimgurl: a.globalData.scimgUrl,
    TabCur: 0,
    scrollLeft: 0,
    replu: {},
    i: "",
    userid: "",
    array: ["已付款没发货", "已付款已发货", "待付款"],
    array1: ["京东快递", "顺丰快递", "中通快递", "圆通快递"],
    p: "",
    date: "",
    date2: "",
    index: 0,
    index1: null,
    snumber: "",
    store: "",
    storename: "",
    picker4: [],
    index4: null,
    picker3: [],
    index3: null,
    xf_staffcode: "",
    kdnumber: '',
    kcnumber: ''
  },
  bindPickerChange: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index: a.detail.value
      });
  },
  bindPickerChange1: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index1: a.detail.value
      });
  },
  bindDateChange: function (a) {
    console.log(a.detail.value), this.setData({
      date: a.detail.value
    });
  },
  bindDateChange2: function (a) {
    this.setData({
      date2: a.detail.value
    });
  },
  getkdnumber: function (a) {
    console.log(a.detail.value), this.setData({
      kdnumber: a.detail.value
    });
  },

  onLoad: function (e) {
    var s = t.formatDate(new Date());
    this.setData({
        date: "2026-01-01",
        date2: s
      }),
      e.p && this.setData({
        p: e.p
      });
    var i = this;
    wx.getStorageSync("masterid") ?
      wx.request({
        url: a.globalData.api + "wx_sestore.ashx",
        data: {},
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (a) {
          console.log(a);
          a.data.push({
            XF_STORECODE: "all",
            XF_NAME: "所有店铺",
            LCCODE: "所有店铺",
          });
          i.setData({
            picker3: a.data
          });
        },
      }) :
      wx.request({
        url: a.globalData.api + "checkstore.ashx",
        data: {
          userid: wx.getStorageSync("userid")
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (a) {
          console.log(a), i.setData({
            picker3: a.data
          });
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
    this.setData({
      i: "0"
    });
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_sestaff.ashx",
      data: {
        xf_storecode: t.data.store,
        userid: wx.getStorageSync("userid"),
        i: t.data.i,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a);
        t.setData({
            picker4: a.data
          }),
          (wx.getStorageSync("qguserid") || wx.getStorageSync("masterid")) &&
          (t.data.picker4.push({
              XF_STAFFCODE: "all",
              XF_NAME: "所有员工"
            }),
            t.setData({
              picker4: t.data.picker4
            })),
          console.log(t.data.picker4);
      },
    });
  },
  back: function () {
    wx.navigateBack({
      delta: 0
    });
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
  //  newsaleslist: function (a) {
  //    wx.navigateTo({
  //      url:
  //       "/pages/scdeposit/index/index?xf_docno=" +
  //        a.currentTarget.dataset.xf_docno +
  //       "&tags=" +
  //        a.currentTarget.dataset.tags,
  //   });
  // },
  selectsku: function (t) {
    console.log(t.currentTarget.dataset.xf_plu),
      wx.navigateTo({
        url: "/pages/shopcg/goods/index?id=" + t.currentTarget.dataset.xf_plu,
      });
  },
  checkinput: function () {
    return (
      this.setData({
        rejob: null
      }),
      "" == this.data.store ?
      (wx.showToast({
          title: "请选择查询店铺",
          icon: "none",
          duration: 2e3,
        }),
        !1) :
      "" == this.data.xf_staffcode ?
      (wx.showToast({
          title: "请选择查询员工",
          icon: "none",
          duration: 2e3,
        }),
        !1) :
      void this.vip_sort()
    );
  },
  vip_sort: function (t) {
    var e = this;
    wx.showLoading({
        title: "正在加载数据",
        mask: !0
      }),
      wx.request({
        url: a.globalData.api + "wx_sclist.ashx",
        data: {
          userid: e.data.xf_staffcode,
          xf_storecode: e.data.store,
          begindate: e.data.date,
          enddate: e.data.date2,
          tags: e.data.array[e.data.index],
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (a) {
          console.log(a.data.items),
            wx.hideLoading(),
            a.data.items.length > 0 ?
            e.setData({
              replu: a.data.items
            }) :
            (e.setData({
                replu: null
              }),
              wx.showToast({
                title: "没有符合条件的记录",
                icon: "none",
                duration: 2e3,
              }));
        },
      });
  },


  send: function (t) {

    if (!t.currentTarget.dataset.kcnumber) {

      console.log(t.currentTarget.dataset.kcnumber)
      wx.showModal({
        title: "提示",
        content: "没发现科传销售单号，请核实付款方式是否为网上商城~",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })
      return false;

    }

    if (!this.data.index1) {

      wx.showModal({
        title: "提示",
        content: "请选择快递公司",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })
      return false;

    }
    if (this.data.kdnumber == '') {

      wx.showModal({
        title: "提示",
        content: "请输入快递单号",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })
      return false;

    }

    var e = this;
    console.log(this.data.array[this.data.index1]);
    wx.showLoading({
        title: "正在加载数据",
        mask: !0
      }),
      wx.request({
        url: a.globalData.api + "wx_upsclist.ashx",
        data: {
          wlnumber: this.data.array[this.data.index1],
          kdnumber: this.data.kdnumber,
          xf_docno: t.currentTarget.data.xf_docno,
          kcxf_docno:t.currentTarget.data.kcnumber,
     

        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (a) {

          wx.hideLoading()
          if (a.data == 'ok') {

            wx.showModal({
              title: "提示",
              content: "提交成功！",
              showCancel: !1,
              success: function (a) {
                a.confirm;
              },
            })

          } else {

            wx.showModal({
              title: "提示",
              content: "提交失败！数据错误！",
              showCancel: !1,
              success: function (a) {
                a.confirm;
              },
            })


          }


        },
      });
  },
});