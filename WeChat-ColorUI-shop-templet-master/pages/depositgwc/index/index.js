var a,
  t = require("../../../@babel/runtime/helpers/defineProperty"),
  e = getApp();
Page({
  data: ((a = {
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
                    t(a, "flag", !0),
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
    t(t(t(t(t(t(t(t(a, "sumwlprice", 0), "sorts", ""), "strarrs", ""), "xiaoshu", !1), "telphone", ""), "sumqty", 0), "openid", ""), "wxuserid", ""),
    t(t(t(a, "userid", ""), "stop", !1), "modalName", "")),
  back: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  showModal: function () {
    this.setData({
      modalName: "bottomModal",
      flags: !0
    });
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_alladdress.ashx",
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
          a.setData({
            ret: t.data
          }) :
          a.setData({
            ret: []
          });
      },
      fail: function () {
        wx.showToast({ title: "网络异常", icon: "none" });
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
        tags: "1" == a.currentTarget.dataset.tag ? !1 : !0,
      }),
      this.hideModal(a),
      this.shows();
  },
  onLoad: function (a) {
    a.xf_plu && this.setData({
        xf_plu: a.xf_plu
      }),
      wx.getStorageSync("vipcode") ?
      this.setData({
        userid: wx.getStorageSync("vipcode")
      }) :
      this.setData({
        userid: wx.getStorageSync("wxuserid")
      })
      
  },
  radioChange1: function (a) {
    var v = a.detail.value;
    this.setData({
      setype: v
    }),
      "0" == v ?
      this.address() :
      "1" == v && this.store();
  },
  store: function () {
    if (
      (this.setData({
          sumwlprice: 0,
          sumprice: Number(this.data.sumrealprice)
        }),
        !wx.getStorageSync("vipcode"))
    )
      return this.destore(), !1;
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_sestoreaddr.ashx",
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
          a.setData({
            address1: t.data[0].ADDRESS1,
            address2: t.data[0].ADDRESS2,
            telphone: t.data[0].TELPHONE,
            dpid: t.data[0].ID,
            id: t.data[0].ID,
            fg: 1,
          }) :
          a.destore();
        a.shows();
      },
      fail: function () {
        wx.showToast({ title: "网络异常", icon: "none" });
        a.shows();
      },
    });
  },
  shows: function () {
    this.setData({
      sumwlprice: 0,
      sumprice: 0,
      sumrealprice: 0
    });
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_listscgwc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: a.data.xf_plu,
        id: a.data.id,
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        if (t.data && t.data.length > 0) {
          var s = 0;
          for (var i = 0; i < t.data.length; i++) s += Number(t.data[i].WLPRICE) || 0;
          a.setData({
            replu: t.data,
            sumqty: t.data[0].SUMQTY,
            sumrealprice: (parseFloat(t.data[0].SUMREALPRICE) || 0).toFixed(2),
            sorts: t.data[0].SORTS,
            sumwlprice: s,
            sumprice: Number(((parseFloat(t.data[0].SUMREALPRICE) || 0) + s).toFixed(2)),
          });
        } else a.setData({
          replu: []
        });
        a.setData({ xiaoshu: !0 });
      },
      fail: function () {
        wx.showToast({ title: "网络异常", icon: "none" });
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
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        t.data && t.data.length > 0 ?
          (a.setData({
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
              tags: "1" == t.data[0].TAG ? !1 : !0,
            })) :
          a.setData({
            flag: !1
          }),
          a.shows();
      },
      fail: function () {
        wx.showToast({ title: "获取地址失败", icon: "none" });
        a.shows();
      },
    });
  },
  destore: function () {
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_deaddr.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        if (t.data && t.data.length > 0) {
          a.setData({
            address1: t.data[0].ADDRESS1,
            address2: t.data[0].ADDRESS2,
            telphone: t.data[0].TELPHONE,
            dpid: t.data[0].ID,
            id: t.data[0].ID,
            fg: 1,
          });
        } else {
          wx.showToast({ title: "获取门店地址失败", icon: "none" });
        }
        a.shows();
      },
      fail: function () {
        wx.showToast({ title: "网络异常", icon: "none" });
        a.shows();
      },
    });
  },
  onShow: function () {
    this.setData({
      stop: !1
    });
    this.address();
  },
  payment: function () {
    if (this.data.stop) return;
    wx.showLoading({ title: "连接中..." })
    this.setData({ stop: !0 });

    if (!this.data.flag && "0" == this.data.setype)
      return wx.hideLoading(), this.setData({ stop: !1 }), this.add(), !1;

    if (!this.data.sumprice || this.data.sumprice <= 0)
      return wx.hideLoading(), this.setData({ stop: !1 }),
        wx.showToast({ title: "数据异常", icon: "none" }), !1;

    this.checkStock();
  },
  checkStock: function () {
    var a = this;
    var r = a.data.replu;
    if (!r || 0 === r.length) {
      wx.hideLoading(),
        a.setData({ stop: !1 });
      return;
    }
    var i = 0;
    var n = function () {
      if (i >= r.length) return void a.doPay();
      var s = r[i];
      wx.request({
        url: e.globalData.api + "wx_checkxstock.ashx",
        data: { xf_plu: s.XF_PLU },
        header: { "content-type": "application/x-www-form-urlencoded" },
        dataType: "json",
        timeout: 10000,
        success: function (o) {
          if (o.data && o.data.length > 0) {
            var stock = parseInt(o.data[0].XSTOCK) || 0,
              qty = parseInt(s.XF_QTY) || 0;
            if (stock < qty) {
              var name = (s.XF_DESCI || s.XF_PLU) || "该商品";
              if (name.length > 12) name = name.slice(0, 12) + "…";
              return wx.hideLoading(),
                a.setData({ stop: !1 }),
                void wx.showModal({
                  title: "库存不足",
                  content: name + "\n您订购" + qty + "件，当前库存仅剩" + stock + "件",
                  showCancel: !1,
                  confirmText: "知道了",
                });
            }
          } else {
            var noStockName = (s.XF_DESCI || s.XF_PLU) || "该商品";
            if (noStockName.length > 12) noStockName = noStockName.slice(0, 12) + "…";
            return wx.hideLoading(),
              a.setData({ stop: !1 }),
              void wx.showModal({
                title: "提示",
                content: noStockName + "\n未获取到库存信息，请稍后重试",
                showCancel: !1,
                confirmText: "知道了",
              });
          }
          i++, n();
        },
        fail: function () {
          wx.hideLoading(),
            a.setData({ stop: !1 }),
            wx.showToast({ title: "库存查询失败，请重试", icon: "none" });
        },
      });
    };
    n();
  },
  doPay: function () {
    var a = this;
    wx.login({
      success: function (t) {
        var s = t.code;
        s
          ? wx.request({
            url: e.globalData.api + "wxzf.aspx",
            data: { code: s },
            header: { "content-type": "application/json" },
            timeout: 10000,
            success: function (t) {
              if (!t.data || typeof t.data !== "string") return wx.hideLoading(), a.setData({ stop: !1 }), wx.showToast({ title: "数据异常", icon: "none" });
              var p = t.data.split(",");
              if (!p[0]) return wx.hideLoading(), a.setData({ stop: !1 }), wx.showToast({ title: "数据异常", icon: "none" });
              a.setData({ openid: p[0] }),
                a.generateOrder(a.data.openid);
            },
            fail: function () {
              wx.hideLoading(),
                a.setData({ stop: !1 }),
                wx.showToast({ title: "网络异常", icon: "none" });
            },
          })
          : (wx.hideLoading(),
            a.setData({ stop: !1 }),
            wx.showToast({ title: "登录失败", icon: "none" }));
      },
      fail: function () {
        wx.hideLoading(),
          a.setData({ stop: !1 }),
          wx.showToast({ title: "登录失败", icon: "none" });
      },
    });
  },
  generateOrder: function (o) {
    var t = this;
    wx.request({
      url: e.globalData.api + "get_ordernumber.ashx",
      data: { title: "SSC" },
      header: { "content-type": "application/json" },
      timeout: 10000,
      success: function (s) {
        if (!s.data) return wx.hideLoading(), t.setData({ stop: !1 }), wx.showToast({ title: "数据异常", icon: "none" });
        var docno = s.data,
          stypes = "线上销售," + t.data.userid;
        t.setData({ xf_docno: docno, salestypes: stypes }),
          wx.request({
            url: e.globalData.api + "wxzfconfig.aspx",
            data: {
              openid: o,
              amount: t.data.sumprice,
              xf_docno: docno,
              salestypes: stypes,
            },
            header: { "content-type": "application/json" },
            timeout: 10000,
            success: function (s) {
              t.zf(s.data);
            },
            fail: function () {
              wx.hideLoading(),
                t.setData({ stop: !1 }),
                wx.showToast({ title: "数据异常", icon: "error", duration: 2000 });
            },
          });
      },
      fail: function () {
        wx.hideLoading(),
          t.setData({ stop: !1 }),
          wx.showToast({ title: "数据异常", icon: "error", duration: 2000 });
      },
    });
  },
  zf: function (a) {
    var t = this;
    if (!a || typeof a !== "string") return wx.hideLoading(), t.setData({ stop: !1 }), wx.showToast({ title: "数据异常", icon: "none" });
    var p = a.split(",");
    if (p.length < 5 || !p[0] || !p[1] || !p[2] || !p[3] || !p[4])
      return wx.hideLoading(), t.setData({ stop: !1 }), wx.showToast({ title: "支付参数异常，请重试", icon: "none" });
    wx.requestPayment({
      timeStamp: p[0],
      nonceStr: p[1],
      package: p[2],
      signType: p[4],
      paySign: p[3],
    
  
      success: function (res) {
        wx.hideLoading();
        "requestPayment:ok" === res.errMsg
          ? t.yfk(res.errMsg)
          : t.setData({ stop: !1 });
      },
      fail: function (res) {
        wx.hideLoading();
        if (res.errMsg && res.errMsg.indexOf("cancel") !== -1) {
          // 用户主动取消支付
          t.setData({ stop: !1 });
          wx.showModal({
            title: "提示",
            content: "您已取消支付，订单未提交，可重新发起支付",
            showCancel: !1,
            confirmText: "知道了",
          });
        } else {
          // 支付失败：提示后保存为待付款订单
          wx.showModal({
            title: "支付失败",
            content: "支付未完成，订单将保存为待付款，可稍后继续支付",
            showCancel: !1,
            confirmText: "查看订单",
            success: function () {
              t.dfk(res.errMsg);
            },
          });
        }
      }
    });
  },
  yfk: function (k) {
    "1" == this.data.setype && this.setData({
        id: this.data.dpid
      }),
      wx.getStorageSync("vipcode") ||
      this.setData({
        xf_storecode: ""
      });
    var a = this;
    wx.request({
      url: e.globalData.api + "wx_yfksc.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: a._buildPluDetail() || a.data.xf_plu,
        xf_amtsold: Number(a.data.sumrealprice),
        sumwlprice: a.data.sumwlprice,
        remark: a.data.remark,
        salestypes: '0',
        shtype: a.data.setype,
        shid: a.data.id,
        tag: "1",
        xf_storecode: a.data.xf_storecode,
        salesman: wx.getStorageSync("yguserid"),
        pay_amtsold: a.data.sumprice,
        xf_docno: a.data.xf_docno,
        pass: k,
        openid:wx.getStorageSync("openid")
        
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        wx.hideLoading();
        if (!t.data) return a.setData({ stop: !1 }), wx.showToast({ title: "数据异常", icon: "none" });
        wx.navigateTo({
          url: "/pages/fkcg/index/index?sorts=" +
            encodeURIComponent(a.data.sorts || "") +
            "&tag=1&xf_docno=" +
            encodeURIComponent(t.data),
        });
      },
      fail: function () {
        wx.hideLoading(),
          a.setData({ stop: !1 }),
          wx.showToast({ title: "网络异常", icon: "none" });
      },
    });
  },
  getremark: function (a) {
    this.setData({
      remark: a.detail.value
    });
  },
  // 构建下单接口所需的货品明细串：每件 "货号,成交价,数量"（与历史 choseNames 三元组格式一致）
  // 后端 wx_yfksc.ashx / wx_dfksc.ashx 按此格式解析，纯货号列表会导致数量/价格缺失
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
  scj: function () {
    wx.showToast({ title: "暂无会员卡信息", icon: "none" });
  },
  selectsku: function (a) {
    wx.navigateTo({
      url: "/pages/shopcg/goods/index?xf_plu=" + encodeURIComponent(a.currentTarget.dataset.xf_plu || ""),
    });
  },
  dfk: function (k) {
    var a = this;
    "1" == a.data.setype && a.setData({
        id: a.data.dpid
      }),
      wx.getStorageSync("vipcode") ||
      a.setData({
        xf_storecode: ""
      });
    wx.request({
      url: e.globalData.api + "wx_dfksc.ashx",
      data: {
        xf_vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: a._buildPluDetail() || a.data.xf_plu,
        xf_amtsold: Number(a.data.sumrealprice),
        sumwlprice: a.data.sumwlprice,
        remark: a.data.remark,
        salestypes: '0',
        shtype: a.data.setype,
        shid: a.data.id,
        tag: "0",
        xf_storecode: a.data.xf_storecode,
        salesman: wx.getStorageSync("yguserid"),
        pay_amtsold: 0,
        xf_docno: a.data.xf_docno,
        pass: k,
        openid:wx.getStorageSync("openid")
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (t) {
        wx.hideLoading();
        if (!t.data) return a.setData({ stop: !1 }), wx.showToast({ title: "数据异常", icon: "none" });
        wx.redirectTo({
          url: "/pages/dfdeposit/index/index?xf_docno=" + encodeURIComponent(t.data),
        });
      },
      fail: function () {
        wx.hideLoading(),
          a.setData({ stop: !1 }),
          wx.showToast({ title: "网络异常", icon: "none" });
      },
    });
  },
});