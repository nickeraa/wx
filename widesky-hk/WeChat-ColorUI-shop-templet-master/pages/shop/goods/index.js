var t = require("../../../@babel/runtime/helpers/defineProperty"),
  a = getApp();
Page({
  data: t(
    t(
      t(
        {
          swiperlist: [""],
          pict: a.globalData.hkimgUrl,
          StatusBar: a.globalData.StatusBar + 26,
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
        },
        "userid",
        ""
      ),
      "xf_desci",
      ""
    ),
    "zqty",
    0
  ),
  bindPickerChange2: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({
        index2: t.detail.value,
        store: this.data.picker2[t.detail.value].XF_STORECODE,
        storename: this.data.picker2[t.detail.value].XF_NAME,
      });
  },
  onLoad: function (t) {
    this.setData({ xf_plu: t.id }), console.log(this.data.xf_plu);
  },
  computeImgHeight: function (t) {
    var a =
      (wx.getSystemInfoSync().windowWidth * t.detail.height) / t.detail.width +
      "px";
    this.setData({ swiperHeight: a });
  },
  getqty: function (t) {
    this.setData({ qty: t.detail.value }), console.log(this.data.qty);
  },
  previewImage: function (t) {
    var a = t.target.dataset.src;
    wx.previewImage({ current: a, urls: this.data.swiperlist });
  },
  onShow: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_searchs.ashx",
      data: { name: e.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t);
        var o = Date.parse(new Date());
        (o /= 1e3),
          e.setData({
            replu: t.data,
            images: t.data[0].IMAGES + "?temp=" + o,
            stock: t.data[0].STOCK,
            amount: t.data[0].AMOUNT,
            ontime: t.data[0].ONTIME,
            xf_plu: t.data[0].XF_PLU,
            xf_desci: t.data[0].XF_LONGDESC,
            qty: "",
          }),
          e.setData({ "swiperlist[0]": e.data.pict + e.data.images }),
          wx.request({
            url: a.globalData.api + "wx_sestore.ashx",
            data: {},
            header: { "content-type": "application/x-www-form-urlencoded" },
            dataType: "json",
            success: function (t) {
              console.log(t), e.setData({ picker2: t.data });
            },
          });
      },
    });
  },
  back: function () {
    wx.navigateBack({ delta: 1 });
  },
  additem: function (t) {
    var e = this;
    new Date();
    e.data.stock <= "0"
      ? wx.showModal({
          title: "提示",
          content: "无法预订，剩余配额为0",
          showCancel: !1,
          success: function (t) {
            t.confirm && e.onShow();
          },
        })
      : e.data.stock < e.data.qty
      ? wx.showModal({
          title: "提示",
          content: "无法预订，配额少于抢订数量",
          showCancel: !1,
          success: function (t) {
            t.confirm && e.onShow();
          },
        })
      : "" == e.data.store
      ? wx.showModal({
          title: "提示",
          content: "店铺编号不能为空",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        })
      : "" == e.data.qty
      ? wx.showModal({
          title: "提示",
          content: "抢订数量不能为空",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        })
      : wx.request({
          url: a.globalData.api + "wx_checkitem.ashx",
          data: { uid: wx.getStorageSync("userid") },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (t) {
            0 == t.data.length
              ? e.setData({ zqty: 0 })
              : e.setData({ zqty: t.data[0].ZQTY }),
              console.log(t.data),
              console.log(e.data.qty),
              console.log(e.data.zqty),
              console.log(e.data.zqty + parseInt(e.data.qty)),
              e.data.zqty + parseInt(e.data.qty) > 2
                ? wx.showModal({
                    title: "提示",
                    content:
                      "错误，同一个用户抢订不能超过2套等待验证的配额，请稍后再试",
                    showCancel: !1,
                    success: function (t) {
                      t.confirm;
                    },
                  })
                : e.add();
          },
        });
  },
  shuaxin: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_searchs.ashx",
      data: { name: e.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t), e.setData({ stock: t.data[0].STOCK }), e.additem();
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
        url: a.globalData.api + "wx_additem.ashx",
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

                  flags: true
            
                })


        },
      });
  },
  tzbody: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "tzbody.aspx",
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
