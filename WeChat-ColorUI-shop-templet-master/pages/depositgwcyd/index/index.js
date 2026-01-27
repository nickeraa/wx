var a,
  t = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
require("../../../utils/util.js");
Page({
  data:
    ((a = {
      StatusBar: e.globalData.StatusBar,
      CustomBar: e.globalData.CustomBar,
      banner: e.globalData.imgUrl,
      scimgurl: e.globalData.scimgurl,
    }),
    t(
      t(
        t(
          t(
            t(
              t(
                t(
                  t(
                    t(t(a, "scimgurl", e.globalData.scimgurl), "flag", !0),
                    "xf_plu",
                    ""
                  ),
                  "xf_desci",
                  ""
                ),
                "replu",
                {}
              ),
              "ck",
              0
            ),
            "setype",
            "0"
          ),
          "flags",
          !1
        ),
        "ret",
        {}
      ),
      "address1",
      ""
    ),
    t(
      t(
        t(
          t(
            t(
              t(
                t(
                  t(t(t(a, "address2", ""), "phone", ""), "body", ""),
                  "tag",
                  ""
                ),
                "tags",
                !1
              ),
              "qty",
              1
            ),
            "sumprice",
            0
          ),
          "realprice",
          0
        ),
        "src",
        ""
      ),
      "sumrealprice",
      0
    ),
    t(
      t(
        t(
          t(
            t(
              t(
                t(t(t(t(a, "dpid", ""), "id", ""), "fg", 0), "amount", 0),
                "remark",
                ""
              ),
              "xf_storecode",
              ""
            ),
            "salesman",
            ""
          ),
          "types",
          ""
        ),
        "grade",
        ""
      ),
      "salestypes",
      "0"
    ),
    t(
      t(t(t(t(a, "sumwlprice", 0), "sorts", ""), "strarrs", ""), "xiaoshu", !1),
      "userid",
      "",
      "replu",{},
      "xf_docno",""
    )),
    back: function () {
      wx.navigateBack({ delta: 0 });
    },
    showModal: function () {
      this.setData({ modalName: "bottomModal", flags: !0 });
      var a = this;
      wx.request({
        url: e.globalData.api + "wx_alladdress.ashx",
        data: {
          vipcode: wx.getStorageSync("vipcode"),
          wxuserid: wx.getStorageSync("wxuserid"),
        },
        header: { "content-type": "application/x-www-form-urlencoded" },
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
      wx.navigateTo({ url: "/pages/addsh/index/index?src=1" });
    },
    edit: function (a) {
      wx.navigateTo({
        url: "/pages/editadd/index/index?id=" + a.currentTarget.dataset.id,
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
      }),
        console.log(a.currentTarget.dataset.tag),
        "1" == a.currentTarget.dataset.tag
          ? this.setData({ tags: !1 })
          : this.setData({ tags: !0 }),
        console.log(this.data.tags),
        this.hideModal(a),
        this.shows();
    },
  onLoad: function (a) {
    a.xf_plu && this.setData({ xf_plu: a.xf_plu }),
      wx.getStorageSync("vipcode")
        ? this.setData({ userid: wx.getStorageSync("vipcode") })
        : this.setData({ userid: wx.getStorageSync("wxuserid") }),
      console.log(this.data.xf_plu),

      this.address();
  },
  radioChange1: function (a) {
    console.log("radior发送选择改变，携带值为", a.detail.value),
      this.setData({ setype: a.detail.value }),
      "0" == this.data.setype
        ? this.address()
        : "1" == this.data.setype && this.store();
  },
  sestore: function () {
    wx.navigateTo({ url: "/pages/store/index/index?dpid=" + this.data.dpid });
  },
  store: function () {
    if (
      (this.setData({ sumwlprice: 0, sumprice: this.data.sumrealprice }),
      console.log(wx.getStorageSync("vipcode")),
      !wx.getStorageSync("vipcode"))
    )
      return this.destore(), !1;
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_sestoreaddr.ashx",
      data: { vipcode: wx.getStorageSync("vipcode") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t.data),
          t.data.length > 0
            ? a.setData({
                address1: t.data[0].ADDRESS1,
                address2: t.data[0].ADDRESS2,
                telphone: t.data[0].TELPHONE,
                dpid: t.data[0].ID,
                fg: 1,
              })
            : a.destore();
      },
    });
  },
  address: function () {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_addressgwc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
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
              }),
              "1" == t.data[0].TAG
                ? a.setData({ tags: !1 })
                : a.setData({ tags: !0 }))
            : a.setData({ flag: !1 }),
          a.shows();
      },
    });
  },
  destore: function () {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_deaddr.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
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
  shows: function () {
    console.log(this.data.xf_plu),
      this.setData({ sumprice: 0, sumrealprice: 0, sumydprice: 0, ydprice: 0 });
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_listscgwcyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: a.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e.data),
          e.data.length > 0
            ? (a.setData({
                replu: e.data,
                sumqty: e.data[0].SUMQTY,
                sumrealprice: parseFloat(e.data[0].SUMREALPRICE).toFixed(2),
                sumydprice: parseFloat(e.data[0].SUMYDPRICE).toFixed(2),
                sumprice: parseFloat(e.data[0].SUMREALPRICE).toFixed(2),
                xf_storecode: e.data[0].XF_STORECODE,
                salesman: e.data[0].SALESMAN,
                grade: e.data[0].GRADE,
                sorts: e.data[0].SORTS,
              }),
              a.data.sumprice.toString().indexOf(".") >= 0 &&
                a.setData({ xiaoshu: !0 }))
            : a.setData({ replu: null });
      },
    });
  },
  onShow: function () {},
  payment: function () {
    if (!this.data.sumprice || this.data.sumprice <= 0)
      return wx.showToast({ title: "数据异常" }), !1;
    console.log(this.data.sumprice);
    var a = this;
    wx.login({
      success: function (t) {
        var s = t.code;
        s
          ? wx.request({
              url: e.globalData.api + "wxzf.aspx",
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
  },
  generateOrder: function (a) {
    var p = this;
    wx.request({
      url: e.globalData.api + "get_ordernumber.ashx",
      data: { title: "DSC" },
      header: { "content-type": "application/json" },
      success: function (s) {
        console.log(s.data),
          p.setData({ xf_docno: s.data }),
          wx.request({
            url: e.globalData.api + "wxzfconfig.aspx",
            data: {
              openid: a,
              amount: p.data.sumydprice,
              xf_docno: p.data.xf_docno,
              salestypes: "线上预定," + p.data.userid,
            },
            header: { "content-type": "application/json" },
            success: function (a) {
              console.log(a.data), p.zf(a.data);
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
      },
    });
  },
  zf: function (a) {
    var e = this;
    console.log("发起支付"), console.log(a);
    var t = a.split(",");
    wx.requestPayment({
      timeStamp: t[0],
      nonceStr: t[1],
      package: t[2],
      signType: t[4],
      paySign: t[3],
      success: function (a) {
        console.log("success"), console.log(a), e.yfk();
      },
      fail: function (a) {
        console.log("fail"), console.log(a), e.dfk();
      },
    });
  },
  getremark: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({ remark: a.detail.value });
  },
  dfk: function () {
    wx.getStorageSync("vipcode") ||
      this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
      wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" }),
      console.log(this.data.sumydprice);
    wx.request({
      url: e.globalData.api + "wx_dfkyd.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: this.data.xf_plu,
        xf_amtsold: this.data.sumydprice,
        sumwlprice: 0,
        remark: this.data.remark,
        salestypes: "1",
        shtype: "",
        shid: "",
        tag: "0",
        xf_storecode: this.data.xf_storecode,
        salesman: this.data.salesman,
        pay_amtsold: 0,
        xf_docno: this.data.xf_docno,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          "error" != a.data
            ? wx.redirectTo({
                url: "/pages/dfdepositydgwc/index/index?xf_docno=" + a.data,
              })
            : wx.showToast({ title: "数据错误" });
      },
    });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/ydshop/index?xf_plu=" + a.currentTarget.dataset.xf_plu,
    });
  },
  yfk: function () {
    wx.getStorageSync("vipcode") ||
      this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
      wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" }),
      console.log(this.data.sumydprice);
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_dfkyd.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: a.data.xf_plu,
        xf_amtsold: a.data.sumydprice,
        sumwlprice: 0,
        remark: a.data.remark,
        salestypes: "1",
        shtype: "",
        shid: "",
        tag: "1",
        xf_storecode: a.data.xf_storecode,
        salesman: a.data.salesman,
        pay_amtsold: a.data.sumydprice,
        xf_docno: a.data.xf_docno,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e.data),
          "error" != e.data
            ? wx.redirectTo({
                url:
                  "/pages/fkcg/index/index?xf_docno=" +
                  e.data +
                  "&tag=3&sorts=" +
                  a.data.sorts,
              })
            : wx.showToast({ title: "数据错误" });
      },
    });
  },
});
