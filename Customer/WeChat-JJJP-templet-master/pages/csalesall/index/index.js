var t = require("../../../@babel/runtime/helpers/defineProperty"), e = function(t, e) {
    if (!e && t && t.__esModule) return t;
    if (null === t || "object" != typeof t && "function" != typeof t) return {
        default: t
    };
    var o = a(e);
    if (o && o.has(t)) return o.get(t);
    var n = {}, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var s in t) if ("default" !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var r = i ? Object.getOwnPropertyDescriptor(t, s) : null;
        r && (r.get || r.set) ? Object.defineProperty(n, s, r) : n[s] = t[s];
    }
    n.default = t, o && o.set(t, n);
    return n;
}(require("../../ec-canvas/echarts"));

function a(t) {
    if ("function" != typeof WeakMap) return null;
    var e = new WeakMap(), o = new WeakMap();
    return (a = function(t) {
        return t ? o : e;
    })(t);
}

var o = getApp(), n = require("../../../utils/util.js"), i = [], s = [], r = [];

function l(t, a, o, n) {
    var l = e.init(t, null, {
        width: a,
        height: o,
        devicePixelRatio: n
    });
    t.setChart(l);
    var d = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            },
            confine: !0
        },
        legend: {
            data: [ "C类销售金额" ]
        },
        grid: {
            left: 20,
            right: 20,
            bottom: 115,
            top: 40,
            containLabel: !0
        },
        xAxis: [ {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#999"
                }
            },
            axisLabel: {
                color: "#666"
            }
        } ],
        yAxis: [ {
            type: "category",
            axisTick: {
                show: !1
            },
            data: i,
            axisLine: {
                lineStyle: {
                    color: "#999"
                }
            },
            axisLabel: {
                color: "#666"
            }
        } ],
        series: [ {
            name: "C类金额：",
            type: "bar",
            label: {
                normal: {
                    show: !0,
                    position: "inside",
                    formatter: "{c}元",
                    color: "#FF0000",
                    fontWeight: 1e3
                }
            },
            data: s,
            itemStyle: {
                color: "#FFFF00"
            }
        }, {
            name: "C类占比：",
            type: "bar",
            label: {
                normal: {
                    show: !0,
                    position: "inside"
                }
            },
            data: r,
            itemStyle: {}
        } ]
    };
    return l.setOption(d, !0), l;
}

Page({
    data: {
        StatusBar: o.globalData.StatusBar,
        CustomBar: o.globalData.CustomBar,
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
        xf_desci: "",
        index: 0,
        zamtsold: "",
        sales_rank: "",
        zb_rank: "",
        store_target: "",
        ec2: {
            onInit: l
        },
        shows: !1
    },
    bindDateChange: function(t) {
        console.log(t.detail.value), this.setData({
            date: t.detail.value
        });
    },
    bindDateChange2: function(t) {
        this.setData({
            date2: t.detail.value
        });
    },
    onLoad: function(t) {
        var e = n.formatDate(new Date());
        this.setData({
            date: e.substring(0, 8) + "01",
            date2: e
        }), console.log(this.data.date);
    },
    onShow: function() {},
    ygxs: function(t) {
        i = [], s = [], r = [];
        var e = this;
        wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: o.globalData.api + "wx_csalesdp.ashx",
            data: {
                begindate: e.data.date,
                enddate: e.data.date2
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                if (console.log(t), wx.hideLoading(), console.log(t.data.length), t.data.length > 0) {
                    for (var a = 0; a < t.data.length; a++) {
                        var o = {
                            storename: t.data[a].XF_NAME,
                            storeamtsold: t.data[a].AMTSOLD,
                            zb: t.data[a].ZBAMTSOLD
                        };
                        i = i.concat(o.storename), s = s.concat(o.storeamtsold), r = r.concat(o.zb);
                    }
                    console.log(i), console.log(s), console.log(r), e.ygxspm();
                }
            }
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    selectvip: function() {
        this.setData({
            isChecked1: !1,
            shows: !1
        });
        var t = this;
        wx.request({
            url: o.globalData.api + "wx_csalesall.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), e.data.length > 0 ? t.setData({
                    zamtsold: e.data[0].AMTSOLD,
                    flag: !1
                }) : t.setData({
                    zamtsold: "",
                    flag: !0
                });
            }
        });
    },
    ygxspm: function() {
        this.setData({
            shows: !1
        }), this.setData({
            shows: !0
        }), console.log("ppppppp");
        this.setData(t({}, "ec2.onInit", l));
    }
});