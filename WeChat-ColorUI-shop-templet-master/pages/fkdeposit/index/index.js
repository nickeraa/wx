var a = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page(
  a(
    a(
      a(
        a(
          a(
            {
              data: {
                StatusBar: t.globalData.StatusBar,
                CustomBar: t.globalData.CustomBar,
                banner: t.globalData.imgUrl,
                scimgurl: t.globalData.scimgurl,
                flag: !0,
                xf_plu: "",
                xf_desci: "",
                replu: {},
                flags: !1,
                ret: {},
                ck: 0,
                setype: "0",
                address1: "",
                address2: "",
                phone: "",
                body: "",
                tag: "",
                tags: !1,
                shid: "",
                sumprice: 0,
                sumsqprice: 0,
                xf_amtsold: 0,
                sumqty: 0,
                fg: 0,
                amount: 0,
                remark: "",
                xf_storecode: "",
                salesman: "",
                types: "",
                grade: "",
                salestypes: "1",
                sumyfprice: 0,
                xf_docno: "",
                sumwlprice: 0,
                sorts: "",
                userid: "",
                slt: "",
                ygname: "",
              },
              back: function () {
                wx.switchTab({ url: "/pages/homerm/index/index" });
              },
              onLoad: function (a) {
                a.xf_docno && this.setData({ xf_docno: a.xf_docno }),
                  a.vipcode && wx.setStorageSync("vipcode", a.vipcode),
                  a.yguserid && wx.setStorageSync("yguserid", a.yguserid),
                  wx.getStorageSync("vipcode")
                    ? this.setData({ userid: wx.getStorageSync("vipcode") })
                    : this.setData({ userid: wx.getStorageSync("wxuserid") }),
                  console.log(this.data.xf_docno),
                  console.log(a.vipcode),
                  console.log(a.yguserid),
                  this.address();
              },
              address: function () {
                var a = this;
                wx.request({
                  url: t.globalData.api + "wx_addressgwc.ashx",
                  data: {
                    vipcode: wx.getStorageSync("vipcode"),
                    wxuserid: wx.getStorageSync("wxuserid"),
                  },
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  dataType: "json",
                  success: function (t) {
                    console.log(t.data),
                      t.data.length > 0
                        ? (a.setData({
                            address1: t.data[0].ADDRESS1,
                            address2: t.data[0].ADDRESS2,
                            phone: t.data[0].PHONE,
                            body: t.data[0].BODY,
                            tag: t.data[0].TAG,
                            ck: t.data[0].ID,
                            flag: !0,
                            xf_storecode: t.data[0].XF_STORECODE,
                            salesman: t.data[0].SALESMAN,
                            grade: t.data[0].GRADE,
                            id: t.data[0].ID,
                            shid: t.data[0].ID,
                          }),
                          "1" == t.data[0].TAG
                            ? a.setData({ tags: !1 })
                            : a.setData({ tags: !0 }))
                        : a.setData({ flag: !1 }),
                      a.shows();
                  },
                });
              },
              radioChange1: function (a) {
                console.log("radior发送选择改变，携带值为", a.detail.value),
                  this.setData({ setype: a.detail.value }),
                  "0" == this.data.setype
                    ? this.address()
                    : "1" == this.data.setype && this.store();
              },
              showModal: function () {
                this.setData({ modalName: "bottomModal", flags: !0 });
                var a = this;
                wx.request({
                  url: t.globalData.api + "wx_alladdress.ashx",
                  data: {
                    vipcode: wx.getStorageSync("vipcode"),
                    wxuserid: wx.getStorageSync("wxuserid"),
                  },
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  dataType: "json",
                  success: function (t) {
                    console.log(t.data),
                      t.data.length > 0
                        ? a.setData({ ret: t.data })
                        : a.setData({ ret: null });
                  },
                });
              },
              hideModal: function (a) {
                this.setData({ modalName: null, flags: !1 });
              },
              add: function () {
                wx.navigateTo({ url: "/pages/addsh/index/index" });
              },
              edit: function (a) {
                console.log(a.currentTarget.dataset.id),
                  wx.navigateTo({
                    url:
                      "/pages/editadd/index/index?id=" +
                      a.currentTarget.dataset.id,
                  });
              },
              shows: function () {
                console.log("pppppp"),
                  console.log(this.data.id),
                  this.setData({
                    sumwlprice: 0,
                    sumprice: 0,
                    sumyfprice: 0,
                    sumsqprice: 0,
                    xf_amtsold: 0,
                  });
                var a = this;
                wx.request({
                  url: t.globalData.api + "wx_fkmydjqh.ashx",
                  data: {
                    vipcode: wx.getStorageSync("vipcode"),
                    xf_docno: a.data.xf_docno,
                    id: a.data.id,
                  },
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  dataType: "json",
                  success: function (e) {
                    if ((console.log(e.data), e.data.length > 0)) {
                      a.setData({
                        replu: e.data,
                        sumqty: e.data[0].SUMQTY,
                        sumprice: e.data[0].SUMPRICE,
                        sumsqprice: e.data[0].SUMSQPRICE,
                        xf_amtsold: e.data[0].PAY_AMTSOLDS,
                        sorts: e.data[0].SORTS,
                        slt:
                          t.globalData.scimgurl +
                          e.data[0].XF_PLU +
                          "\\" +
                          e.data[0].IMAGESSL,
                      }),
                        console.log(a.data.slt);
                      for (var s = 0; s < e.data.length; s++)
                        a.setData({
                          sumwlprice: a.data.sumwlprice + e.data[s].WLPRICE,
                        });
                      console.log(a.data.sumwlprice),
                        a.setData({
                          sumyfprice: a.data.sumsqprice + a.data.sumwlprice,
                        });
                    } else a.setData({ replu: null });
                    a.seygname();
                  },
                });
              },
              seygname: function () {
                var a = this;
                wx.request({
                  url: t.globalData.api + "wx_seyguserid.ashx",
                  data: { yguserid: wx.getStorageSync("yguserid") },
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  dataType: "json",
                  success: function (t) {
                    console.log(t.data),
                      a.setData({ ygname: t.data[0].XF_NAME });
                  },
                });
              },
              checkboxChange: function (a) {
                this.setData({
                  address1: a.currentTarget.dataset.address1,
                  address2: a.currentTarget.dataset.address2,
                  phone: a.currentTarget.dataset.phone,
                  body: a.currentTarget.dataset.body,
                  ck: a.currentTarget.dataset.id,
                  id: a.currentTarget.dataset.id,
                  shid: a.currentTarget.dataset.id,
                }),
                  console.log(a.currentTarget.dataset.tag),
                  "1" == a.currentTarget.dataset.tag
                    ? this.setData({ tags: !1 })
                    : this.setData({ tags: !0 }),
                  console.log(this.data.tags),
                  this.hideModal(a),
                  this.shows();
              },
              onShow: function () {},
              store: function () {
                if (
                  (this.setData({
                    sumwlprice: 0,
                    sumyfprice: this.data.sumprice - this.data.xf_amtsold,
                  }),
                  console.log(wx.getStorageSync("vipcode")),
                  !wx.getStorageSync("vipcode"))
                )
                  return this.destore(), !1;
                var a = this;
                wx.request({
                  url: t.globalData.api + "wx_sestoreaddr.ashx",
                  data: { vipcode: wx.getStorageSync("vipcode") },
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  dataType: "json",
                  success: function (t) {
                    console.log(t.data),
                      t.data.length > 0
                        ? a.setData({
                            address1: t.data[0].ADDRESS1,
                            address2: t.data[0].ADDRESS2,
                            telphone: t.data[0].TELPHONE,
                            dpid: t.data[0].ID,
                            shid: t.data[0].ID,
                            fg: 1,
                          })
                        : a.destore();
                  },
                });
              },
              destore: function () {
                var a = this;
                wx.request({
                  url: t.globalData.api + "wx_deaddr.ashx",
                  data: {},
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                  },
                  dataType: "json",
                  success: function (t) {
                    console.log(t.data),
                      a.setData({
                        address1: t.data[0].ADDRESS1,
                        address2: t.data[0].ADDRESS2,
                        telphone: t.data[0].TELPHONE,
                        dpid: t.data[0].ID,
                        fg: 1,
                      });
                  },
                });
              },
            },
            "checkboxChange",
            function (a) {
              this.setData({
                address1: a.currentTarget.dataset.address1,
                address2: a.currentTarget.dataset.address2,
                phone: a.currentTarget.dataset.phone,
                body: a.currentTarget.dataset.body,
                ck: a.currentTarget.dataset.id,
                id: a.currentTarget.dataset.id,
              }),
                console.log(a.currentTarget.dataset.tag),
                "1" == a.currentTarget.dataset.tag
                  ? this.setData({ tags: !1 })
                  : this.setData({ tags: !0 }),
                console.log(this.data.tags),
                this.hideModal(a),
                this.shows();
            }
          ),
          "payment",
          function () {
            var a = this;
            wx.login({
              success: function (e) {
                var s = e.code;
                s
                  ? wx.request({
                      url: t.globalData.api + "wxzf.aspx",
                      data: { code: s },
                      header: { "content-type": "application/json" },
                      success: function (t) {
                        console.log(t.data);
                        var e = t.data.split(",");
                        a.setData({ openid: e[0] }),
                          console.log(a.data.openid),
                          a.generateOrder(a.data.openid);
                      },
                    })
                  : console.log("获取用户登陆状态失败！");
              },
            });
          }
        ),
        "generateOrder",
        function (a) {
          var e = this;
          wx.request({
            url: t.globalData.api + "wxzfconfig.aspx",
            data: {
              openid: a,
              amount: e.data.sumyfprice,
              xf_docno: e.data.xf_docno,
              salestypes: "定单取货," + e.data.userid,
            },
            header: { "content-type": "application/json" },
            success: function (a) {
              console.log(a.data), e.zf(a.data);
            },
            fail: function (a) {
              console.info(a),
                wx.showToast({
                  title: "数据异常",
                  icon: "error",
                  duration: 2e3,
                });
            },
          });
        }
      ),
      "zf",
      function (a) {
        var t = this;
        console.log("发起支付"), console.log(a);
        var e = a.split(",");
        wx.requestPayment({
          timeStamp: e[0],
          nonceStr: e[1],
          package: e[2],
          signType: e[4],
          paySign: e[3],
          success: function (a) {
            console.log("success"), console.log(a), t.dfk();
          },
          fail: function (a) {
            console.log("fail"),
              console.log(a),
              wx.showToast({ title: "付款失败", icon: "error", duration: 2e3 });
          },
        });
      }
    ),
    "dfk",
    function () {
      wx.getStorageSync("vipcode") ||
        this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
        wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" });
      var a = this;
      wx.request({
        url: t.globalData.api + "wx_qefkyd2.ashx",
        data: {
          xf_vipcode: wx.getStorageSync("vipcode"),
          wxuserid: wx.getStorageSync("wxuserid"),
          xf_docno: a.data.xf_docno,
          xf_amtsold: a.data.sumprice,
          sumwlprice: a.data.sumwlprice,
          shtype: a.data.setype,
          shid: a.data.shid,
          tag: "2",
          pay_amtsold2: a.data.sumyfprice,
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        success: function (t) {
          console.log(t.data),
            "error" != t.data
              ? wx.redirectTo({
                  url:
                    "/pages/fkcgdj/index/index?sorts=" +
                    a.data.sorts +
                    "&xf_docno=" +
                    a.data.xf_docno,
                })
              : wx.showToast({
                  title: "数据错误",
                  icon: "error",
                  duration: 2e3,
                });
        },
      });
    }
  )
);
