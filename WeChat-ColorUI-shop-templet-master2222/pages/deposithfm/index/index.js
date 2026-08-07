var a = getApp();
require("../../../utils/util.js");
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    banner: a.globalData.imgUrl,
    scimgurl: a.globalData.scimgurl,
    flag: !0,
    xf_plu: "",
    xf_desci: "",
    replu: {},
    ck: 0,
    setype: "0",
    flags: !1,
    ret: {},
    address1: "",
    address2: "",
    phone: "",
    body: "",
    tag: "",
    tags: !1,
    qty: 1,
    sumprice: 0,
    realprice: 0,
    wlprice: 0,
    sumrealprice: 0,
    dpid: "",
    id: "",
    fg: 0,
    amount: 0,
    remark: "",
    xf_storecode: "",
    salesman: "",
    types: "",
    grade: "",
    salestypes: "",
    salestypeswx: "",
    xishu: 0,
    sorts: "",
    xiaoshu: !1,
    xf_docno: "",
    userid: "",
    yk:false,
  },
  back: function () {
    wx.navigateBack({ delta: 0 });
  },
  jia: function () {
    this.setData({ qty: this.data.qty + 1 }),
      this.setData({
        sumprice: this.data.realprice * this.data.qty + this.data.wlprice,
        sumrealprice: this.data.realprice * this.data.qty,
      });
  },
  jian: function () {
    1 == this.data.qty
      ? wx.showToast({ title: "不能少于1", icon: "error", duration: 1e3 })
      : (this.setData({ qty: this.data.qty - 1 }),
        this.setData({
          sumprice: this.data.realprice * this.data.qty + this.data.wlprice,
          sumrealprice: this.data.realprice * this.data.qty,
        }));
  },
  showModal: function (t) {
    this.setData({ modalName: t.currentTarget.dataset.target, flags: !0 });
    var e = this;
    wx.request({
      url: a.globalData.api + "wx_alladdress.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          a.data.length > 0
            ? e.setData({ ret: a.data })
            : e.setData({ ret: null });
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
      this.hideModal(),
      this.sewlprice();
  },
  sewlprice: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_sewlprice.ashx",
      data: { id: t.data.id },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          t.setData({ wlprice: a.data[0].WLPRICE * t.data.xishu });
      },
    });
  },
  onLoad: function (a) {
    a.xf_plu && this.setData({ xf_plu: a.xf_plu }),
      a.address1 && this.setData({ address1: a.address1 }),
      a.address2 && this.setData({ address2: a.address2 }),
      a.telphone && this.setData({ telphone: a.telphone }),
      a.id && this.setData({ id: a.id }),
      wx.getStorageSync("vipcode")
        ? this.setData({ userid: wx.getStorageSync("vipcode") })
        : this.setData({ userid: wx.getStorageSync("wxuserid") });
  },
  radioChange1: function (a) {

      this.setData({

        yk:false
   
         })




    console.log("radior发送选择改变，携带值为", a.detail.value),
      this.setData({ setype: a.detail.value }),
      "0" == this.data.setype
        ? this.address()
        : "1" == this.data.setype && this.store();

        if(this.data.setype=='1')
        {
        
          this.setData({
        
            yk:true
        
             })
        
        }


  },
  sestore: function () {
    console.log("ddddddddd"),
      console.log(this.data.dpid),
      wx.navigateTo({ url: "/pages/store/index/index?dpid=" + this.data.dpid });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/shopcg/goods/index?xf_plu=" + a.currentTarget.dataset.xf_plu,
    });
  },
  store: function () {
 
    console.log("fsdfsdfsadfsadfdsa")
    console.log(wx.getStorageSync("vipcode"))

    if(!wx.getStorageSync("vipcode")&&this.data.setype=='1')
    {

      console.log("pppppppp")
      this.setData({

     yk:true

      })

      
    }

   


    if (
      (this.setData({ wlprice: 0, sumprice: this.data.sumrealprice }),
      !wx.getStorageSync("vipcode"))
    )
      return this.destore(), !1;

    var t = this;
    wx.request({
      url: a.globalData.api + "wx_sestoreaddr.ashx",
      data: { vipcode: wx.getStorageSync("vipcode") },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          a.data.length > 0
            ? t.setData({
                address1: a.data[0].ADDRESS1,
                address2: a.data[0].ADDRESS2,
                telphone: a.data[0].TELPHONE,
                dpid: a.data[0].ID,
                fg: 1,
              })
            : t.destore();




      },
    });
  },
  destore: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_deaddr.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          t.setData({
            address1: a.data[0].ADDRESS1,
            address2: a.data[0].ADDRESS2,
            telphone: a.data[0].TELPHONE,
            dpid: a.data[0].ID,
            fg: 1,
          });

          if(a.data[0].ADDRESS1=='广天藏品深圳办公室')
          {
          
          console.log('ttttttttttttt')
          
          
          t.setData({
          
          yk:true
          
          })
          
          }

      },
    });
  },
  address: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_address.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: t.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          a.data.length > 0
            ? (t.setData({
                address1: a.data[0].ADDRESS1,
                address2: a.data[0].ADDRESS2,
                phone: a.data[0].PHONE,
                body: a.data[0].BODY,
                tag: a.data[0].TAG,
                ck: a.data[0].ID,
                wlprice: a.data[0].WLPRICE * t.data.xishu,
                sumprice: parseFloat(
                  t.data.sumprice + a.data[0].WLPRICE
                ).toFixed(2),
                flag: !0,
                salestypes: a.data[0].SALESTYPES,
                xf_storecode: a.data[0].XF_STORECODE,
                salesman: a.data[0].SALESMAN,
                grade: a.data[0].GRADE,
              }),
              "1" == a.data[0].TAG
                ? t.setData({ tags: !1 })
                : t.setData({ tags: !0 }))
            : t.setData({ flag: !1 });
      },
    });
  },
  onShow: function () {
    console.log(this.data.xf_plu);
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_listsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: t.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a.data),
          a.data.length > 0
            ? (t.setData({
                replu: a.data,
                sumprice: parseFloat(a.data[0].REALPRICE).toFixed(2)*t.data.qty,
                realprice: parseFloat(a.data[0].REALPRICE).toFixed(2)*t.data.qty,
                xishu: a.data[0].XISHU,
                sumrealprice: parseFloat(a.data[0].REALPRICE).toFixed(2)*t.data.qty,
                xf_desci: a.data[0].XF_DESCI,
                sorts: a.data[0].SORTS,
              }),
              t.data.sumprice.toString().indexOf(".") >= 0 &&
                t.setData({ xiaoshu: !0 }))
            : t.setData({ replu: null }),
          console.log(t.data.replu),
          "0" == t.data.setype && t.address();
      },
    });
  },
  payment: function () {
    if (!this.data.flag&&this.data.setype=='0')
      return (
    
        this.add(),
        !1
      );
    if (
      (console.log(this.data.sumprice),
      !this.data.sumprice || this.data.sumprice <= 0)
    )
      return wx.showToast({ title: "数据异常" }), !1;
    var t = this;
    wx.login({
      success: function (e) {
        var s = e.code;
        s
          ? wx.request({
              url: a.globalData.api + "wxzf.aspx",
              data: { code: s },
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
      url: a.globalData.api + "get_ordernumber.ashx",
      data: { title: "SSC" },
      header: { "content-type": "application/json" },
      success: function (s) {
        console.log(s.data),
          e.setData({ xf_docno: s.data }),
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
        console.log("fail"),
          console.log(a),
          wx.showToast({ title: "付款失败", icon: "error", duration: 2e3 }),
          t.dfk(a.errMsg);
      },
    });
  },
  yfk: function (k) {
    "0" == this.data.setype
      ? this.setData({ id: this.data.ck })
      : this.setData({ id: this.data.dpid }),
      console.log("ddddddddddddddddd"),
      console.log(this.data.id),
      wx.getStorageSync("vipcode") ||
        this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
      wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" });
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_dfksku.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: t.data.xf_plu,
        xf_price: t.data.realprice,
        xf_qty: t.data.qty,
        xf_amtsold: t.data.sumrealprice,
        sumwlprice: t.data.wlprice,
        remark: t.data.remark,
        salestypes: "0",
        shtype: t.data.setype,
        shid: t.data.id,
        tag: "1",
        xf_storecode: t.data.xf_storecode,
        salesman: t.data.salesman,
        pay_amtsold: t.data.sumprice,
        xf_docno: t.data.xf_docno,
        pass:k
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
                  "&tag=0&xf_docno=" +
                  a.data,
              })
            :  wx.showModal({
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
  dfk: function (k) {
    "0" == this.data.setype
      ? this.setData({ id: this.data.ck })
      : this.setData({ id: this.data.dpid }),
      console.log("ddddddddddddddddd"),
      console.log(this.data.id),
      wx.getStorageSync("vipcode") ||
        this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" }),
      wx.getStorageSync("wxuserid") || this.setData({ wxuserid: "" });
    wx.request({
      url: a.globalData.api + "wx_dfksku.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: this.data.xf_plu,
        xf_price: this.data.realprice,
        xf_qty: this.data.qty,
        xf_amtsold: this.data.sumrealprice,
        sumwlprice: this.data.wlprice,
        remark: this.data.remark,
        salestypes: "0",
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
            :  wx.showModal({
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
