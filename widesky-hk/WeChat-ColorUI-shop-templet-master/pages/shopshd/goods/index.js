var t,
  a = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page({
  data:
    ((t = {
      StatusBar: e.globalData.StatusBar + 6,
      swiperlist: [""],
      pict: e.globalData.hkimgUrl,
      xf_plu: "",
      ontime: "",
      timer: "",
      countDownNum: "",
      pnumber: "",
      index2: null,
      picker2: [],
      store: "",
      storename: "",
      qty: "",
      item: "",
      username: "",
      userid: "",
      openid: "",
      phone: "",
      images: "",
      stock: "",
      amount: "",
      flags:true,
    }),
    a(
      a(
        a(
          a(
            a(
              a(
                a(
                  a(a(a(t, "userid", ""), "xf_desci", ""), "status", "0"),
                  "startX",
                  0
                ),
                "endX",
                0
              ),
              "moveFlag",
              !0
            ),
            "ani",
            ""
          ),
          "cid",
          0
        ),
        "maxid",
        0
      ),
      "minid",
      0
    ),
    a(a(a(a(t, "id", 0), "itemname", ""), "nextid", 0), "leftid", 0)),
  bindPickerChange2: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({
        index2: t.detail.value,
        store: this.data.picker2[t.detail.value].XF_STORECODE,
        storename: this.data.picker2[t.detail.value].XF_NAME,
      });
  },
  onLoad: function (t) {
    (e.globalData.tt = "1"),
      t.id && this.setData({ xf_plu: t.id }),
      console.log(this.data.xf_plu);
  },
  getqty: function (t) {
    this.setData({ qty: t.detail.value }), console.log(this.data.qty);
  },
  previewImage: function (t) {
    var a = t.target.dataset.src;
    wx.previewImage({ current: a, urls: this.data.swiperlist });
  },
  computeImgHeight: function (t) {
    var a =
      (wx.getSystemInfoSync().windowWidth * t.detail.height) / t.detail.width +
      "px";
    this.setData({ swiperHeight: a });
  },
  onShow: function (t) {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_searchs.ashx",
      data: { name: a.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t.data),
          a.setData({
            replu: t.data,
            images: t.data[0].IMAGES,
            stock: t.data[0].STOCK,
            amount: t.data[0].AMOUNT,
            ontime: t.data[0].ONTIME,
            xf_plu: t.data[0].XF_PLU,
            itemname: t.data[0].ITEMNAME,
            xf_desci: t.data[0].XF_LONGDESC,
            qty: "",
            cid: t.data[0].ID,
          }),
          console.log(a.data.cid),
          a.setData({ "swiperlist[0]": a.data.pict + a.data.images }),
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
  },
  back: function () {
    wx.navigateBack({ delta: 1 });
  },
  shuaxin: function (t) {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_searchs.ashx",
      data: { name: a.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), a.setData({ stock: t.data[0].STOCK }), a.additem();
      },
    });
  },
  additem: function (t) {
    var a = this;
    new Date();
    a.data.stock <= "0"
      ? wx.showModal({
          title: "提示",
          content: "无法预订，剩余配额为0",
          showCancel: !1,
          success: function (t) {
            t.confirm && a.onShow();
          },
        })
      : a.data.stock < a.data.qty
      ? wx.showModal({
          title: "提示",
          content: "无法预订，配额少于抢订数量",
          showCancel: !1,
          success: function (t) {
            t.confirm && a.onShow();
          },
        })
      : "" == a.data.store
      ? wx.showModal({
          title: "提示",
          content: "店铺编号不能为空",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        })
      : "" == a.data.qty
      ? wx.showModal({
          title: "提示",
          content: "抢订数量不能为空",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        })
      : wx.request({
          url: e.globalData.api + "wx_checkitem.ashx",
          data: { uid: wx.getStorageSync("userid") },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (t) {
            0 == t.data.length
              ? a.setData({ zqty: 0 })
              : a.setData({ zqty: t.data[0].ZQTY }),
              console.log(t.data),
              console.log(a.data.qty),
              console.log(a.data.zqty),
              console.log(a.data.zqty + parseInt(a.data.qty)),
              a.data.zqty + parseInt(a.data.qty) > 2
                ? wx.showModal({
                    title: "提示",
                    content:
                      "错误，同一个用户抢订不能超过2套等待验证的配额，请稍后再试",
                    showCancel: !1,
                    success: function (t) {
                      t.confirm;
                    },
                  })
                : a.add();
          },
        });
  },
  add: function () {

    if (this.data.flags==false) {

      wx.showLoading({
        title: '太频繁了',
      })

      return false;

    }

    this.setData({

      flags: false

    })


    var t = this;
    clearInterval(t.data.timer),
      wx.request({
        url: e.globalData.api + "wx_additem.ashx",
        data: {
          pnumber: "",
          xf_plu: t.data.xf_plu,
          store: t.data.store,
          userid: wx.getStorageSync("userid"),
          qty: t.data.qty,
          ontimes: t.data.ontime,
          agree: "",
          remark: "",
          agreeid: "",
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (a) {
          console.log(a),
            "ok" == a.data
              ? (t.setData({ countDownNum: 60 * t.data.ontime }),
                t.countDown(),
                wx.showModal({
                  title: "提示",
                  content: "抢订成功!",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm && t.tzbody();
                  },
                }))
              : wx.showModal({
                  title: "提示",
                  content: "数据错误，抢订失败",
                  showCancel: !1,
                  success: function (t) {
                    t.confirm;
                  },
                });

                t.setData({

                  flags: false
            
                })

        },
      });
  },
  tzbody: function () {
    var t = this;
    wx.request({
      url: e.globalData.api + "tzbody.aspx",
      data: {
        xf_plu: t.data.xf_plu,
        xf_desci: t.data.xf_desci,
        userid: wx.getStorageSync("userid"),
        qty: t.data.qty,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), t.onShow();
      },
    });
  },
  countDown: function () {
    var t = this,
      a = t.data.countDownNum;
    t.setData({
      timer: setInterval(function () {
        a--,
          t.setData({ countDownNum: a }),
          0 == a && (clearInterval(t.data.timer), console.log(t.data.pnumber));
      }, 1e3),
    });
  },
});
