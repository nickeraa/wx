var a,
  e = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
require("../../../utils/util.js");
Page({
  data:
    ((a = {
      StatusBar: t.globalData.StatusBar,
      CustomBar: t.globalData.CustomBar,
      banner: t.globalData.imgUrl,
      scimgurl: t.globalData.scimgurl,
    }),
    e(
      e(
        e(
          e(
            e(
              e(
                e(
                  e(
                    e(e(a, "scimgurl", t.globalData.scimgurl), "flag", !0),
                    "xf_plu",
                    ""
                  ),
                  "xf_desci",
                  ""
                ),
                "replu",
                {}
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
        "address2",
        ""
      ),
      "phone",
      ""
    ),
    e(
      e(
        e(
          e(
            e(
              e(
                e(e(e(e(a, "body", ""), "tag", ""), "tags", !1), "qty", 1),
                "sumprice",
                0
              ),
              "realprice",
              0
            ),
            "sumrealprice",
            0
          ),
          "fg",
          0
        ),
        "amount",
        0
      ),
      "remark",
      ""
    ),
    e(
      e(
        e(
          e(
            e(
              e(
                e(
                  e(e(e(a, "xf_storecode", ""), "salesman", ""), "types", ""),
                  "grade",
                  ""
                ),
                "salestypes",
                "1"
              ),
              "sumydprice",
              0
            ),
            "ydprice",
            0
          ),
          "sorts",
          ""
        ),
        "xiaoshu",
        !1
      ),
      "userid",
      ""
    )),
  back: function () {
    wx.navigateBack({ delta: 0 });
  },
  onLoad: function (a) {
    a.xf_plu && this.setData({ xf_plu: a.xf_plu }),
      wx.getStorageSync("vipcode")
        ? this.setData({ userid: wx.getStorageSync("vipcode") })
        : this.setData({ userid: wx.getStorageSync("wxuserid") }),
      console.log(this.data.xf_plu),
      this.shows();
  },
  shows: function () {
    console.log(this.data.xf_plu),
      this.setData({ sumprice: 0, sumrealprice: 0, sumydprice: 0, ydprice: 0 });
    var a = this;
    wx.request({
      url: t.globalData.api + "wx_listscgwcyd.ashx",
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
    if (
      (console.log(this.data.sumydprice),
      !this.data.sumydprice || this.data.sumydprice <= 0)
    )
      return wx.showToast({ title: "数据异常" }), !1;
    var a = this;
    wx.login({
      success: function (e) {
        var s = e.code;
        s
          ? wx.request({
              url: t.globalData.api + "wxzf.aspx",
              data: { code: s },
              header: { "content-type": "application/json" },
              success: function (e) {
                console.log(e.data);
                var t = e.data.split(",");
                a.setData({ openid: t[0] }),
                  console.log(a.data.openid),
                  a.generateOrder(a.data.openid);
              },
            })
          : console.log("获取用户登陆状态失败！");
      },
    });
  },
  generateOrder: function (a) {
    var e = this;
    wx.request({
      url: t.globalData.api + "get_ordernumber.ashx",
      data: { title: "DSC" },
      header: { "content-type": "application/json" },
      success: function (s) {
        console.log(s.data),
          e.setData({ xf_docno: s.data }),
          wx.request({
            url: t.globalData.api + "wxzfconfig.aspx",
            data: {
              openid: a,
              amount: e.data.sumydprice,
              xf_docno: e.data.xf_docno,
              salestypes: "线上预定," + e.data.userid,
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
      url: t.globalData.api + "wx_dfkyd.ashx",
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
      url: t.globalData.api + "wx_dfkyd.ashx",
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
