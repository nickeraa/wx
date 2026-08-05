var t = require("../../../@babel/runtime/helpers/defineProperty"),
  app = getApp(),
  a;
require("../../../utils/util.js");
Page({
  data: ((a = {
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar,
      banner: app.globalData.imgUrl,
      scimgurl: app.globalData.scimgurl,
    }),
    t(
      t(
        t(
          t(
            t(
              t(
                t(
                  t(
                    t(t(a, "scimgurl", app.globalData.scimgurl), "flag", !0),
                    "xf_plu",
                    ""
                  ),
                  "xf_desci",
                  ""
                ),
                "replu", []
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
        "ret", []
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
      "sumqty", 0,
      "sumydprice", 0,
      "ydprice", 0,
      "xf_docno", "",
      "dpid", "",
      "stop", false
    )),
  back: function () {
    wx.navigateBack({ delta: 1 });
  },
  showModal: function () {
    this.setData({
      modalName: "bottomModal",
      flags: !0
    });
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_alladdress.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        t.data && t.data.length > 0 ?
          that.setData({
            ret: t.data
          }) :
          that.setData({
            ret: []
          });
      },
      fail: function () {
        that.setData({ ret: [] });
      },
    });
  },
  hideModal: function () {
    this.setData({
      modalName: null,
      flags: !1
    });
  },
  add: function () {
    wx.navigateTo({
      url: "/pages/addsh/index/index?src=1"
    });
  },
  edit: function (e) {
    wx.navigateTo({
      url: "/pages/editadd/index/index?id=" + e.currentTarget.dataset.id,
    });
  },
  checkboxChange: function (e) {
    this.setData({
      address1: e.currentTarget.dataset.address1,
      address2: e.currentTarget.dataset.address2,
      phone: e.currentTarget.dataset.phone,
      body: e.currentTarget.dataset.body,
      ck: e.currentTarget.dataset.id,
      id: e.currentTarget.dataset.id,
    });
    "1" == e.currentTarget.dataset.tag ?
      this.setData({ tags: !1 }) :
      this.setData({ tags: !0 });
    this.hideModal();
    this.shows();
  },
  onLoad: function (options) {
    options.xf_plu && this.setData({ xf_plu: options.xf_plu });
    this.setData({
      userid: wx.getStorageSync("vipcode") || wx.getStorageSync("wxuserid")
    });


  },

  onShow: function (options) {

this.shows();
    
  },




  radioChange1: function (e) {
    this.setData({ setype: e.detail.value });
    "0" == this.data.setype ?
      this.address() :
      "1" == this.data.setype && this.store();
  },
  sestore: function () {
    wx.navigateTo({
      url: "/pages/store/index/index?dpid=" + this.data.dpid
    });
  },
  store: function () {
    this.setData({
      sumwlprice: 0,
      sumprice: this.data.sumrealprice
    });
    if (!wx.getStorageSync("vipcode"))
      return this.destore(), !1;
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_sestoreaddr.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        t.data && t.data.length > 0 ?
          that.setData({
            address1: t.data[0].ADDRESS1,
            address2: t.data[0].ADDRESS2,
            telphone: t.data[0].TELPHONE,
            dpid: t.data[0].ID,
            fg: 1,
          }) :
          that.destore();
      },
      fail: function () {
        that.destore();
      },
    });
  },
  address: function () {
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_addressgwc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        if (t.data && t.data.length > 0) {
          that.setData({
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
          });
          "1" == t.data[0].TAG ?
            that.setData({ tags: !1 }) :
            that.setData({ tags: !0 });
        } else {
          that.setData({ flag: !1 });
        }
      //  that.shows();
      },
      fail: function () {
        that.setData({ flag: !1 });
      //  that.shows();
      },
    });
  },
  destore: function () {
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_deaddr.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        if (t.data && t.data.length > 0 && t.data[0]) {
          that.setData({
            address1: t.data[0].ADDRESS1,
            address2: t.data[0].ADDRESS2,
            telphone: t.data[0].TELPHONE,
            dpid: t.data[0].ID,
            fg: 1,
          });
        }
      },
      fail: function () {},
    });
  },
  shows: function () {
    // 不在入口清零价格：成功时新数据直接覆盖，避免已有价格闪烁归 0
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_listscgwcyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that.data.xf_plu,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (res) {
        if (res.data && res.data.length > 0) {
          that.setData({
            replu: res.data,
            sumqty: res.data[0].SUMQTY,
            sumrealprice: parseFloat(res.data[0].SUMREALPRICE).toFixed(2),
            sumydprice: parseFloat(res.data[0].SUMYDPRICE).toFixed(2),
            sumprice: parseFloat(res.data[0].SUMREALPRICE).toFixed(2),
            xf_storecode: res.data[0].XF_STORECODE,
            salesman: res.data[0].SALESMAN,
            grade: res.data[0].GRADE,
            sorts: res.data[0].SORTS,
          });
          that.data.sumprice.toString().indexOf(".") >= 0 &&
            that.setData({ xiaoshu: !0 });
        } else {
          // 无商品数据时才清零
          that.setData({
            replu: null,
            sumprice: 0,
            sumrealprice: 0,
            sumydprice: 0,
            ydprice: 0
          });
        }
        that.address();
      },
      fail: function () {
        // 加载失败时才清零
        that.setData({
          replu: null,
          sumprice: 0,
          sumrealprice: 0,
          sumydprice: 0,
          ydprice: 0
        });
      },
    });
  },
  payment: function () {
    wx.showLoading({ title: "连接中...", mask: !0 });
    this.setData({ stop: !0 });
    if (!this.data.sumprice || this.data.sumprice <= 0) {
      wx.hideLoading();
      this.setData({ stop: !1 });
      return wx.showToast({ title: "数据异常", icon: "none" }), !1;
    }
    var that = this;
    wx.login({
      success: function (t) {
        var s = t.code;
        if (s) {
          wx.request({
            url: app.globalData.api + "wxzf.aspx",
            data: { code: s },
            header: { "content-type": "application/json" },
            timeout: 10000,
            success: function (t) {
              var parts = t.data ? t.data.split(",") : [];
              that.setData({ openid: parts[0] || "" });
              that.generateOrder(that.data.openid);
            },
            fail: function () {
              wx.hideLoading();
              that.setData({ stop: !1 });
              wx.showToast({ title: "获取支付信息失败", icon: "none" });
            },
          });
        } else {
          wx.hideLoading();
          that.setData({ stop: !1 });
          wx.showToast({ title: "获取登录状态失败", icon: "none" });
        }
      },
      fail: function () {
        wx.hideLoading();
        that.setData({ stop: !1 });
        wx.showToast({ title: "登录失败", icon: "none" });
      },
    });
  },
  generateOrder: function (openid) {
    var that = this;
    wx.request({
      url: app.globalData.api + "get_ordernumber.ashx",
      data: { title: "DSC" },
      header: { "content-type": "application/json" },
      timeout: 10000,
      success: function (s) {
        that.setData({ xf_docno: s.data });
        wx.request({
          url: app.globalData.api + "wxzfconfig.aspx",
          data: {
            openid: openid,
            amount: that.data.sumydprice,
            xf_docno: that.data.xf_docno,
            salestypes: "线上预定," + that.data.userid,
          },
          header: { "content-type": "application/json" },
          timeout: 10000,
          success: function (res) {
            that.zf(res.data);
          },
          fail: function () {
            wx.hideLoading();
            that.setData({ stop: !1 });
            wx.showToast({ title: "获取支付配置失败", icon: "none" });
          },
        });
      },
      fail: function () {
        wx.hideLoading();
        that.setData({ stop: !1 });
        wx.showToast({ title: "生成订单失败", icon: "none" });
      },
    });
  },
  zf: function (cfg) {
    var that = this;
    // 发起支付前关闭 Loading，避免取消/失败后「连接中」永久挂屏
    wx.hideLoading();
    if (!cfg || typeof cfg !== "string") {
      that.setData({ stop: !1 });
      wx.showToast({ title: "支付数据异常", icon: "none" });
      return;
    }
    var t = cfg.split(",");
    if (t.length < 5 || !t[0] || !t[1] || !t[2] || !t[3] || !t[4]) {
      that.setData({ stop: !1 });
      wx.showToast({ title: "支付参数不完整，请重试", icon: "none" });
      return;
    }
    wx.requestPayment({
      timeStamp: t[0],
      nonceStr: t[1],
      package: t[2],
      signType: t[4],
      paySign: t[3],
      success: function (res) {
        if ("requestPayment:ok" === res.errMsg) {
          that.yfk(res.errMsg);
        } else {
          that.setData({ stop: !1 });
        }
      },
      fail: function (res) {
        wx.hideLoading();
        if (res.errMsg && res.errMsg.indexOf("cancel") !== -1) {
          // 用户主动取消支付：提示后停留本页，可重新发起
          wx.showModal({
            title: "提示",
            content: "您已取消支付，订单未提交，可重新发起支付",
            showCancel: !1,
            confirmText: "知道了",
          });
        } else {
          // 支付失败：提示确认后保存为待付款订单并跳转
          wx.showModal({
            title: "支付失败",
            content: "支付未完成，订单将保存为待付款，可稍后继续支付",
            showCancel: !1,
            confirmText: "查看订单",
            success: function () {
              that.dfk(res.errMsg);
            },
          });
        }
      },
      complete: function () {
        that.setData({ stop: !1 });
      }
    });
  },
  getremark: function (e) {
    this.setData({ remark: e.detail.value });
  },
  // 构建下单接口所需的货品明细串：每件 "货号,成交价,数量"（与历史 choseNames 三元组格式一致）
  // 后端 wx_dfkyd.ashx 按此格式解析，纯货号列表会导致数量/价格缺失而返回 error
  _buildPluDetail: function () {
    var list = this.data.replu || [];
    var parts = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (!item || !item.XF_PLU) continue;
      var qty = parseInt(item.XF_QTY || item.QTY) || 0;
      var price = parseFloat(item.REALPRICE || item.XF_VIPPRICE || item.XF_ZKPRICE || item.XF_ORGUPRICE) || 0;
      if (qty > 0) parts.push(item.XF_PLU + "," + price + "," + qty);
    }
    return parts.join(",");
  },
  dfk: function (k) {
    "0" == this.data.setype ?
      this.setData({ id: this.data.ck }) :
      this.setData({ id: this.data.dpid });
    if (!wx.getStorageSync("vipcode"))
      this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" });
    if (!wx.getStorageSync("wxuserid"))
      this.setData({ wxuserid: "" });
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_dfkyd.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that._buildPluDetail() || that.data.xf_plu,
        xf_amtsold: that.data.sumydprice,
        sumwlprice: 0,
        remark: that.data.remark,
        salestypes: "1",
        shtype: that.data.setype,
        shid: that.data.id,
        tag: "0",
        xf_storecode: that.data.xf_storecode,
        salesman: wx.getStorageSync("yguserid"),
        pay_amtsold: 0,
        xf_docno: that.data.xf_docno,
        pass: k
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        if (null == t.data || "error" == t.data) {
    
          return;
        }
        wx.redirectTo({
          url: "/pages/dfdepositydgwc/index/index?xf_docno=" + encodeURIComponent(t.data),
        });
      },
      fail: function () {
        wx.showToast({ title: "订单提交失败", icon: "none" });
      },
    });
  },
  selectsku: function (e) {
    wx.navigateTo({
      url: "/pages/ydshop/index?xf_plu=" + encodeURIComponent(e.currentTarget.dataset.xf_plu),
    });
  },
  yfk: function (k) {
    "0" == this.data.setype ?
      this.setData({ id: this.data.ck }) :
      this.setData({ id: this.data.dpid });
    if (!wx.getStorageSync("vipcode"))
      this.setData({ xf_vipcode: "", xf_storecode: "", salesman: "" });
    if (!wx.getStorageSync("wxuserid"))
      this.setData({ wxuserid: "" });
    var that = this;
    wx.request({
      url: app.globalData.api + "wx_dfkyd.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that._buildPluDetail() || that.data.xf_plu,
        xf_amtsold: that.data.sumydprice,
        sumwlprice: 0,
        remark: that.data.remark,
        salestypes: "1",
        shtype: that.data.setype,
        shid: that.data.id,
        tag: "1",
        xf_storecode: that.data.xf_storecode,
        salesman: wx.getStorageSync("yguserid"),
        pay_amtsold: that.data.sumydprice,
        xf_docno: that.data.xf_docno,
        pass: k
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        if (null == t.data || "error" == t.data) {
  
          return;
        }
        wx.redirectTo({
          url: "/pages/fkcg/index/index?xf_docno=" + encodeURIComponent(t.data) + "&tag=3&sorts=" + encodeURIComponent(that.data.sorts),
        });
      },
      fail: function () {
        wx.showToast({ title: "订单提交失败", icon: "none" });
      },
    });
  },
});