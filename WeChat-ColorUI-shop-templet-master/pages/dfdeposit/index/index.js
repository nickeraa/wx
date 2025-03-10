var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    xf_txdate: "",
    replu: {},
    sumprice: 0,
    address1: "",
    address2: "",
    phone: "",
    body: "",
    salestypes: "",
    xf_docno: "",
    shtype: "",
    shid: "",
    shtypename: "",
    sumwlprice: 0,
    xf_plu: "",
    remark: "",
    xf_desci: "",
    sumrealprice: 0,
    xiaoshu: !1,
    userid: "",
    yk:false
  },
  back: function () {
    wx.navigateBack({ delta: 0 });
  },
  onLoad: function (a) {
    a.xf_docno && this.setData({ xf_docno: a.xf_docno }),
      wx.getStorageSync("vipcode")
        ? this.setData({ userid: wx.getStorageSync("vipcode") })
        : this.setData({ userid: wx.getStorageSync("wxuserid") }),
      console.log(this.data.xf_docno);
  },
  address: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_listaddress.ashx",
      data: { id: t },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          e.setData({
            address1: a.data[0].ADDRESS1,
            address2: a.data[0].ADDRESS2,
            body: a.data[0].BODY,
            phone: a.data[0].PHONE,
          });
      },
    });
  },
  onShow: function () {

if(!wx.getStorageSync('vipcode'))
{
this.setData({

yk:true

})

}


    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listdfk.ashx",
      data: { xf_docno: t.data.xf_docno },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          a.data.length > 0
            ? (t.setData({
                replu: a.data,
                shtype: a.data[0].SHTYPE,
                sumrealprice: a.data[0].XF_AMTSOLD,
                xf_docno: a.data[0].XF_DOCNO,
                xf_txdate: a.data[0].XF_TXDATE,
                sumwlprice: a.data[0].SUMWLPRICE,
                xf_desci: a.data[0].XF_DESCI,
                remark: a.data[0].REMARK,
                salestypes: a.data[0].SALESTYPES,
                sorts: a.data[0].SORTS,
                shid: a.data[0].SHID,
              }),
              t.setData({ sumprice: t.data.sumrealprice + t.data.sumwlprice }),
              t.data.sumprice.toString().indexOf(".") >= 0 &&
                t.setData({ xiaoshu: !0 }),
              "0" == a.data[0].SHTYPE
                ? (t.setData({ shtypename: "快递运输" }),
                  t.address(a.data[0].SHID))
                : (t.setData({ shtypename: "到店取货" }),
                  t.store(a.data[0].SHID)))
            : t.setData({ replu: null });
      },
    });
  },
  store: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_liststore.ashx",
      data: { id: t },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          e.setData({
            address1: a.data[0].ADDRESS1,
            address2: a.data[0].ADDRESS2,
            phone: a.data[0].TELPHONE,
          });
      },
    });
  },
  payment: function () {
    console.log(this.data.sumprice);
    var t = this;
    wx.login({
      success: function (e) {
        var o = e.code;
        o
          ? wx.request({
              url: a.globalData.api + "wxzf.aspx",
              data: { code: o },
              header: { "content-type": "application/json" },
              success: function (a) {
                console.log(a.data);
                var e = a.data.split(",");
                t.setData({ openid: e[0] }),
                  console.log(t.data.openid),
                  t.generateOrder(t.data.openid);
              },
            })
          : console.log("获取用户登陆状态失败！");
      },
    });
  },
  generateOrder: function (t) {
    var e = this;
    wx.request({
      url: a.globalData.api + "wxzfconfig.aspx",
      data: {
        openid: t,
        amount: e.data.sumprice,
        xf_docno: e.data.xf_docno,
        salestypes: "线上销售," + e.data.userid,
      },
      header: { "content-type": "application/json" },
      success: function (a) {
        console.log(a.data), e.zf(a.data);
      },
      fail: function (a) {
        console.info(a);
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
        console.log("success"), console.log(a), t.yfk();
      },
      fail: function (a) {
        console.log("fail"),
          console.log(a),
          wx.showToast({ title: "支付失败", icon: "error", duration: 2e3 });
      },
    });
  },
  yfk: function () {
    wx.getStorageSync("vipcode") ||
      this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
      wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" });
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_qefkyd.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_docno: t.data.xf_docno,
        xf_amtsold: t.data.sumrealprice,
        sumwlprice: t.data.sumwlprice,
        shtype: t.data.shtype,
        shid: t.data.shid,
        tag: "1",
        pay_amtsold: t.data.sumprice,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          "error" != a.data
            ? wx.redirectTo({
                url:
                  "/pages/fkcg/index/index?sorts=" +
                  t.data.sorts +
                  "&tag=1&xf_docno=" +
                  t.data.xf_docno,
              })
            : wx.showToast({ title: "数据错误", icon: "error", duration: 2e3 });
      },
    });
  },
});
