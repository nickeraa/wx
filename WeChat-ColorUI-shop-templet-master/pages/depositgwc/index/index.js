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
      t(t(t(t(a, "sumwlprice", 0), "sorts", ""), "strarrs", "","replu",{},), "xiaoshu", !1),
      "userid",
      ""
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
  shows: function () {
    console.log(this.data.xf_plu),
      console.log(this.data.id),
      this.setData({ sumwlprice: 0, sumprice: 0, sumrealprice: 0 });
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_listscgwc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: a.data.xf_plu,
        id: a.data.id,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        if ((console.log(t.data), t.data.length > 0)) {
          a.setData({
            replu: t.data,
            sumqty: t.data[0].SUMQTY,
            sumrealprice: parseFloat(t.data[0].SUMREALPRICE).toFixed(2),
            sorts: t.data[0].SORTS,
          });
          for (var e = 0; e < t.data.length; e++)
            a.setData({ sumwlprice: a.data.sumwlprice + t.data[e].WLPRICE });
          console.log(a.data.xf_plu),
            console.log(a.data.sumwlprice),
            a.setData({
              sumprice: parseFloat(
                a.data.sumrealprice + a.data.sumwlprice
              ).toFixed(2),
            });
        } else a.setData({ replu: null });
        console.log(a.data.sumprice),
          a.data.sumprice.toString().indexOf(".") >= 0 &&
            a.setData({ xiaoshu: !0 });
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
    var t = this;
    wx.request({
      url: e.globalData.api + "get_ordernumber.ashx",
      data: { title: "SSC" },
      header: { "content-type": "application/json" },
      success: function (s) {
        console.log(s.data),
          t.setData({ xf_docno: s.data }),
          wx.request({
            url: e.globalData.api + "wxzfconfig.aspx",
            data: {
              openid: a,
              amount: t.data.sumprice,
              xf_docno: t.data.xf_docno,
              salestypes: "线上销售," + t.data.userid,
            },
            header: { "content-type": "application/json" },
            success: function (a) {
              console.log(a.data), t.zf(a.data);
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
        console.log("success"), console.log(a), t.yfk(a.errMsg);
      },
      fail: function (a) {
        console.log("fail"), console.log(a), t.dfk(a.errMsg);
      },
    });
  },
  yfk: function (k) {
    "1" == this.data.setype && this.setData({ id: this.data.dpid }),
      wx.getStorageSync("vipcode") ||
        this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
      wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" });
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_yfksc.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: a.data.xf_plu,
        xf_amtsold: a.data.sumrealprice,
        sumwlprice: a.data.sumwlprice,
        remark: a.data.remark,
        salestypes: a.data.salestypes,
        shtype: a.data.setype,
        shid: a.data.id,
        tag: "1",
        xf_storecode: a.data.xf_storecode,
        salesman: a.data.salesman,
        pay_amtsold: a.data.sumprice,
        xf_docno: a.data.xf_docno,
        pass:k
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (t) {
        console.log(t.data),
          "error" != t.data
            ? wx.navigateTo({
                url:
                  "/pages/fkcg/index/index?sorts=" +
                  a.data.sorts +
                  "&tag=1&xf_docno=" +
                  t.data,
              })
            : wx.showModal({
              title: "提示",
              content: "数据错误，IP已被记录",
              showCancel: !1,
              success: function (a) {
                a.confirm;
              },
            })
      },
    });
  },
  getremark: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({ remark: a.detail.value });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/shopcg/goods/index?xf_plu=" + a.currentTarget.dataset.xf_plu,
    });
  },
  dfk: function (k) {
    "1" == this.data.setype && this.setData({ id: this.data.dpid }),
      wx.getStorageSync("vipcode") ||
        this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
      wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" }),
      console.log(this.data.sumprice),
      console.log(this.data.sumwlprice);
    wx.request({
      url: e.globalData.api + "wx_dfksc.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: this.data.xf_plu,
        xf_amtsold: this.data.sumrealprice,
        sumwlprice: this.data.sumwlprice,
        remark: this.data.remark,
        salestypes: this.data.salestypes,
        shtype: this.data.setype,
        shid: this.data.id,
        tag: "0",
        xf_storecode: this.data.xf_storecode,
        salesman: this.data.salesman,
        pay_amtsold: 0,
        xf_docno: this.data.xf_docno,
        pass:k
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          "error" != a.data
            ? wx.redirectTo({
                url: "/pages/dfdeposit/index/index?xf_docno=" + a.data,
              })
            :wx.showModal({
              title: "提示",
              content: "数据错误，IP已被记录",
              showCancel: !1,
              success: function (a) {
                a.confirm;
              },
            })
      },
    });
  },
});
