var a = getApp(),
  t = require("../../../utils/util.js");
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    scimgurl: a.globalData.scimgUrl,
    weburl:"https://widesky.work/",
    replu: {},
    i: "",
    array: ["已付款没发货", "已付款已发货"],
    array1: ["京东快递", "顺丰快递", "中通快递", "圆通快递"],
    p: "",
    date: "",
    date2: "",
    index: 0,
    index1: null,
    qindex: 0,
    sendtype: 'kd',
    store: "",
    storename: "",
    picker4: [],
    index4: null,
    picker3: [],
    index3: null,
    xf_staffcode: "",
    kdnumber: ''
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
  // 发货方式单选：kd=快递发货，zt=自提
  bindSendtypeChange: function (e) {
    this.setData({
      sendtype: e.detail.value
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
        date: s,
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
          // a.data.push({
          //   XF_STORECODE: "all",
          //   XF_NAME: "所有店铺",
          //   LCCODE: "所有店铺",
          // });
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
          (
            // t.data.picker4.push({
            //   XF_STAFFCODE: "all",
            //   XF_NAME: "所有员工"
            // }),
            t.setData({
              picker4: t.data.picker4
            })),
          console.log(t.data.picker4);
      },
    });
  },
  back: function () {
    wx.navigateBack({
      delta: 1
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
    if ("" == this.data.store) {
      wx.showToast({
        title: "请选择查询店铺",
        icon: "none",
        duration: 2e3,
      });
      return;
    }
    if ("" == this.data.xf_staffcode) {
      wx.showToast({
        title: "请选择查询员工",
        icon: "none",
        duration: 2e3,
      });
      return;
    }
    this.vip_sort();
  },
  vip_sort: function (t) {

    var tags = '0'
    if (this.data.index == 0) {
      tags = '1'

    } else {
      tags = '2'

    }

    var e = this;
    wx.showLoading({
        title: "正在加载数据",
        mask: !0
      }),
      wx.request({
        url: a.globalData.api + "wx_sclistRZ.ashx",
        data: {
          userid: e.data.xf_staffcode,
          //  xf_storecode: e.data.store,
          begindate: e.data.date,
          enddate: e.data.date2,
          tags: tags,
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (a) {
          var items = a && a.data && a.data.items;
          // 校验返回格式，避免接口异常时报错
          if (!Array.isArray(items)) {
            wx.showToast({
              title: "数据格式异常",
              icon: "none",
              duration: 2e3,
            });
            return;
          }
          if (items.length > 0) {
            // 补全微信头像完整地址，空头像前端显示占位
            items.forEach(function (it) {
              it.WXIMG_FULL = e.formatImg(it.WXIMG);
            });
            // 记录本次查询的分类，列表按查询分类渲染（不依赖后端TAGS字段）
            e.setData({
              replu: items,
              qindex: e.data.index
            });
          } else {
            e.setData({
              replu: null
            });
            wx.showToast({
              title: "没有符合条件的记录",
              icon: "none",
              duration: 2e3,
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: "网络请求失败",
            icon: "none",
            duration: 2e3,
          });
        },
        complete: function () {
          wx.hideLoading();
        },
      });
  },
  // 拼接图片完整地址：已带协议或//前缀的按原样返回，其余拼接站点域名
  formatImg: function (u) {
    if (!u) return '';
    return /^(https?:)?\/\//i.test(u) ? u : this.data.weburl + u;
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

    // 自提无需快递公司与单号，快递发货才校验
    if (this.data.sendtype != 'zt') {
      if (this.data.index1 == null) {

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
          wlnumber: this.data.sendtype == 'zt' ? '自提' : this.data.array[this.data.index1],
          kdnumber: this.data.sendtype == 'zt' ? '' : this.data.kdnumber,
          xf_docno: t.currentTarget.dataset.xf_docno,
          kcxf_docno: t.currentTarget.dataset.kcnumber,


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