var a = require("../../../@babel/runtime/helpers/defineProperty"), t = function(a, t) {
    if (!t && a && a.__esModule) return a;
    if (null === a || "object" != typeof a && "function" != typeof a) return {
        default: a
    };
    var s = e(t);
    if (s && s.has(a)) return s.get(a);
    var o = {}, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var r in a) if ("default" !== r && Object.prototype.hasOwnProperty.call(a, r)) {
        var d = n ? Object.getOwnPropertyDescriptor(a, r) : null;
        d && (d.get || d.set) ? Object.defineProperty(o, r, d) : o[r] = a[r];
    }
    o.default = a, s && s.set(a, o);
    return o;
}(require("../../ec-canvas/echarts"));

function e(a) {
    if ("function" != typeof WeakMap) return null;
    var t = new WeakMap(), s = new WeakMap();
    return (e = function(a) {
        return a ? s : t;
    })(a);
}

var s = getApp(), o = require("../../../utils/util.js"), n = 0;

function r(a, e, s, o) {
    var r = t.init(a, null, {
        width: e,
        height: s,
        devicePixelRatio: o
    });
    a.setChart(r), r.showLoading();
    var d = {
        backgroundColor: "#ffffff",
        series: [ {
            name: "业务指标",
            type: "gauge",
            detail: {
                formatter: "{value}%"
            },
            axisLine: {
                show: !0
            },
            data: [ {
                value: n,
                name: "指标完成率"
            } ]
        } ]
    };
    return r.setOption(d, !0), r.hideLoading(), r;
}

Page({
    data: {
        StatusBar: s.globalData.StatusBar,
        CustomBar: s.globalData.CustomBar,
        TabCur: 0,
        scrollLeft: 0,
        vipcode: "",
        vipname: "",
        grade: "",
        date: "",
        date2: "",
        rejob: {},
        flag: !0,
        replu: {},
        index2: null,
        picker2: [],
        store: "",
        storename: "",
        isChecked1: "",
        isChecked2: "",
        flags: !0,
        xf_desci: "",
        index: 0,
        tag: "",
        ec: {
            onInit: r
        },
        canvasIsShow: !1,
        zamtsold: "",
        czamtsold: "",
        sales_rank: "",
        zb_rank: "",
        store_target: "",
        shows: !1
    },
    bindDateChange: function(a) {
        console.log(a.detail.value), this.setData({
            date: a.detail.value
        });
    },
    bindDateChange2: function(a) {
        this.setData({
            date2: a.detail.value
        });
    },
    bindPickerChange2: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index2: a.detail.value,
            store: this.data.picker2[a.detail.value].XF_STORECODE,
            storename: this.data.picker2[a.detail.value].XF_NAME
        });
    },
    onLoad: function(a) {
        var t = o.formatDate(new Date());
        this.setData({
            date: t.substring(0, 8) + "01",
            date2: t
        }), console.log(this.data.date);
    },
    onShow: function() {
        var a = this;
        wx.getStorageSync("grade") ? wx.request({
            url: s.globalData.api + "wx_sestore.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), a.setData({
                    picker2: t.data
                });
            }
        }) : wx.request({
            url: s.globalData.api + "checkstore.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), a.setData({
                    picker2: t.data
                });
            }
        });
    },
    ygxs: function(a) {
        console.log(a.currentTarget.dataset.title), [], [], this.setData({
            tag: a.currentTarget.dataset.title
        }), "0" == this.data.tag ? this.setData({
            isChecked1: !0,
            isChecked2: !1
        }) : "1" == this.data.tag && this.setData({
            isChecked1: !1,
            isChecked2: !0
        });
        var t = this;
        wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: s.globalData.api + "wx_ygzb.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                xf_storecode: t.data.store,
                tag: t.data.tag
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), wx.hideLoading({}), console.log(a.data.length), a.data.length > 0 ? t.setData({
                    rejob: a.data,
                    flags: !1
                }) : t.setData({
                    rejob: null,
                    flags: !0
                });
            }
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    selectvip: function() {
        if (null == this.data.index2) return wx.showToast({
            title: "请选择店铺查询",
            icon: "none",
            duration: 2e3
        }), !1;
        this.setData({
            isChecked1: !1,
            isChecked2: !1,
            flags: !0,
            shows: !1
        });
        var a = this;
        wx.request({
            url: s.globalData.api + "wx_storezb.ashx",
            data: {
                begindate: a.data.date,
                enddate: a.data.date2,
                xf_storecode: a.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), t.data.length > 0 ? (n = t.data[0].ZB, a.setData({
                    zamtsold: t.data[0].ZAMTSOLD,
                    zb_rank: t.data[0].ZB_RANK,
                    sales_rank: t.data[0].SALES_RANK,
                    store_target: t.data[0].STORE_TARGET,
                    flag: !1
                }), a.showzb()) : (wx.showToast({
                    title: "没有数据",
                    icon: "none",
                    duration: 2e3
                }), n = 0, a.setData({
                    zamtsold: "",
                    zb_rank: "",
                    sales_rank: "",
                    store_target: "",
                    flag: !0,
                    flags: !0,
                    canvasIsShow: !1
                }));
            }
        });
    },
    newsaleslist: function(a) {
        wx.navigateTo({
            url: "/pages/ygcxs/index/index?xf_staffcode=" + a.currentTarget.dataset.xf_salesman + "&xf_storecode=" + this.data.store + "&begindate=" + this.data.date + "&enddate=" + this.data.date2 + "&ygamt=" + a.currentTarget.dataset.ygamt + "&xf_name=" + a.currentTarget.dataset.xf_name
        });
    },
    showzb: function() {
        console.log(n), this.setData({
            canvasIsShow: !1
        }), this.setData({
            canvasIsShow: !0
        }), console.log("sdfsdfsdfsdsdf");
        (t = this).setData(a({}, "ec.onInit", r));
        var t = this;
        wx.request({
            url: s.globalData.api + "wx_csalesstore.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                xf_storecode: t.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? t.setData({
                    czamtsold: a.data[0].AMTSOLD
                }) : t.setData({
                    czamtsold: ""
                });
            }
        });
    }
});