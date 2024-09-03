var t = require("../../../@babel/runtime/helpers/defineProperty"),
  a = getApp();
Page({
  data: t(
    t(
      t(
        t(
          t(
            {
              StatusBar: a.globalData.StatusBar + 6,
              TabbarBot: a.globalData.tabbar_bottom,
              swiperlist: [""],
              pict: a.globalData.hkimgUrl,
              xf_plu: "",
              xf_desci: "",
              ontime: "",
              time: "",
              timer: "",
              countDownNum: "",
              pnumber: "",
              index2: null,
              picker2: [],
              index1: null,
              picker1: [],
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
            },
            "userid",
            ""
          ),
          "remark",
          ""
        ),
        "focus",
        ""
      ),
      "shuserid",
      ""
    ),
    "xf_name",
    ""
  ),
  bindPickerChange2: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({
        index2: t.detail.value,
        shuserid: this.data.picker2[t.detail.value].USERID,
        xf_name: this.data.picker2[t.detail.value].XF_NAME,
      });
  },
  computeImgHeight: function (t) {
    var a =
      (wx.getSystemInfoSync().windowWidth * t.detail.height) / t.detail.width +
      "px";
    this.setData({ swiperHeight: a });
  },
  bindPickerChange1: function (t) {
    console.log("picker发送选择改变，携带值为", t.detail.value),
      this.setData({
        index1: t.detail.value,
        store: this.data.picker1[t.detail.value].XF_STORECODE,
        storename: this.data.picker1[t.detail.value].XF_NAME,
      });
  },
  onLoad: function (t) {
    this.setData({ xf_plu: t.id }), console.log(this.data.xf_plu);
  },
  getqty: function (t) {
    this.setData({ qty: t.detail.value }), console.log(this.data.qty);
  },
  gettime: function (t) {
    this.setData({ time: t.detail.value }), console.log(this.data.time);
  },
  bindTextAreaBlur: function (t) {
    this.setData({ remark: t.detail.value }), console.log(this.data.remark);
  },
  previewImage: function (t) {
    var a = t.target.dataset.src;
    wx.previewImage({ current: a, urls: this.data.swiperlist });
  },
  onShow: function (t) {
    var e = this;
    if (
      (console.log(wx.getStorageSync("userid")), !wx.getStorageSync("userid"))
    )
      return (
        wx.showModal({
          title: "提示",
          content: "请先验证是否公司员工，再抢配额",
          showCancel: !1,
          success: function (t) {
            t.confirm && wx.navigateTo({ url: "/pages/coupon/index/index" });
          },
        }),
        !1
      );
    wx.request({
      url: a.globalData.api + "wx_searchs.ashx",
      data: { name: e.data.xf_plu },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t),
          e.setData({
            replu: t.data,
            images: t.data[0].IMAGES,
            stock: t.data[0].STOCK,
            amount: t.data[0].AMOUNT,
            ontime: t.data[0].ONTIME,
            xf_plu: t.data[0].XF_PLU,
            xf_desci: t.data[0].XF_LONGDESC,
          }),
          e.setData({ "swiperlist[0]": e.data.pict + e.data.images }),
          wx.request({
            url: a.globalData.api + "wx_sestore.ashx",
            data: {},
            header: { "content-type": "application/x-www-form-urlencoded" },
            dataType: "json",
            success: function (t) {
              console.log(t),
                e.setData({ picker1: t.data }),
                wx.request({
                  url: a.globalData.api + "wx_setpbody.ashx",
                  data: {},
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  dataType: "json",
                  success: function (t) {
                    console.log(t), e.setData({ picker2: t.data });
                  },
                });
            },
          });
      },
    });
  },
  input: function () {
    this.setData({ focus: !0 });
  },
  back: function () {
    wx.navigateBack({ delta: 0 });
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
            t.confirm;
          },
        })
      : e.data.stock < e.data.qty
      ? wx.showModal({
          title: "提示",
          content: "无法预订，配额少于抢订数量",
          showCancel: !1,
          success: function (t) {
            t.confirm;
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
      : "" == e.data.time
      ? wx.showModal({
          title: "提示",
          content: "特批小时不能为空",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        })
      : "" == e.data.remark
      ? wx.showModal({
          title: "提示",
          content: "申请原因不能为空",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        })
      : "" == e.data.shuserid
      ? wx.showModal({
          title: "提示",
          content: "请选择审核主管",
          showCancel: !1,
          success: function (t) {
            t.confirm;
          },
        })
      : (clearInterval(e.data.timer),
        wx.request({
          url: a.globalData.api + "wx_additem.ashx",
          data: {
            pnumber: e.data.pnumber,
            xf_plu: e.data.xf_plu,
            store: e.data.store,
            userid: wx.getStorageSync("userid"),
            qty: e.data.qty,
            ontimes: 60 * e.data.time,
            agree: "0",
            remark: e.data.remark,
            agreeid: e.data.shuserid,
          },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (t) {
            console.log(t),
              "ok" == t.data
                ? (e.setData({ countDownNum: 60 * e.data.time * 60 }),
                  e.countDown(),
                  wx.showModal({
                    title: "提示",
                    content: "已申请，请等待特批",
                    showCancel: !1,
                    success: function (t) {
                      t.confirm &&
                        (e.setData({ qty: "", time: "", remark: "" }),
                        e.shtp());
                    },
                  }))
                : "error" == t.data &&
                  wx.showModal({
                    title: "提示",
                    content: "数据错误，抢订失败",
                    showCancel: !1,
                    success: function (t) {
                      t.confirm;
                    },
                  });
          },
        }));
  },
  shtp: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "shbody.aspx",
      data: {
        xf_plu: t.data.xf_plu,
        xf_desci: t.data.xf_desci,
        username: wx.getStorageSync("username"),
        agreeid: t.data.shuserid,
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
