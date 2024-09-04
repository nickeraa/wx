var t = require("../../../@babel/runtime/helpers/defineProperty"), e = function(t, e) {
    if (!e && t && t.__esModule) return t;
    if (null === t || "object" != typeof t && "function" != typeof t) return {
        default: t
    };
    var o = a(e);
    if (o && o.has(t)) return o.get(t);
    var s = {}, n = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var i in t) if ("default" !== i && Object.prototype.hasOwnProperty.call(t, i)) {
        var r = n ? Object.getOwnPropertyDescriptor(t, i) : null;
        r && (r.get || r.set) ? Object.defineProperty(s, i, r) : s[i] = t[i];
    }
    s.default = t, o && o.set(t, s);
    return s;
}(require("../../ec-canvas/echarts"));

function a(t) {
    if ("function" != typeof WeakMap) return null;
    var e = new WeakMap(), o = new WeakMap();
    return (a = function(t) {
        return t ? o : e;
    })(t);
}

var o = getApp(), s = require("../../../utils/util.js"), n = [], i = [], r = 0, l = "", d = [], c = "{c}元";

function u(t, a, o, s) {
    var n = e.init(t, null, {
        width: a,
        height: o,
        devicePixelRatio: s
    });
    t.setChart(n), n.showLoading();
    var i = {
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
                value: r,
                name: "指标完成率"
            } ]
        } ]
    };
    return n.setOption(i, !0), n.hideLoading(), n;
}

function h(t, a, o, s) {
    var r = e.init(t, null, {
        width: a,
        height: o,
        devicePixelRatio: s
    });
    t.setChart(r);
    var u = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            },
            confine: !0
        },
        legend: {
            data: d
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
            data: n,
            axisLine: {
                lineStyle: {
                    color: "#999"
                }
            },
            axisLabel: {
                color: "#666",
                margin: 30
            }
        } ],
        series: [ {
            name: l,
            type: "bar",
            label: {
                normal: {
                    show: !0,
                    position: "inside",
                    formatter: c,
                    color: "#FF0000",
                    fontWeight: 1e3
                }
            },
            data: i,
            itemStyle: {
                color: "#FFFF00"
            }
        } ]
    };
    return r.setOption(u, !0), r;
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
        isChecked2: "",
        xf_desci: "",
        index: 0,
        tag: "",
        ec: {
            onInit: u
        },
        canvasIsShow: !1,
        zamtsold: "",
        sales_rank: "",
        zb_rank: "",
        store_target: "",
        ec2: {
            onInit: h
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
        var e = s.formatDate(new Date());
        this.setData({
            date: e.substring(0, 8) + "01",
            date2: e
        }), console.log(this.data.date);
    },
    onShow: function() {},
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    ygxs: function(t) {
        console.log(t.currentTarget.dataset.title), n = [], i = [], this.setData({
            tag: t.currentTarget.dataset.title
        }), "0" == this.data.tag ? (this.setData({
            isChecked1: !0,
            isChecked2: !1
        }), l = "销售金额", d = [ "销售金额" ], c = "{c}元") : "1" == this.data.tag && (this.setData({
            isChecked1: !1,
            isChecked2: !0
        }), l = "销售指标", d = [ "销售指标" ], c = "{c}%");
        var e = this;
        wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: o.globalData.api + "wx_dpzb.ashx",
            data: {
                begindate: e.data.date,
                enddate: e.data.date2,
                tag: e.data.tag
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                if (console.log(t), wx.hideLoading({}), console.log(t.data.length), t.data.length > 0) {
                    for (var a = 0; a < t.data.length; a++) {
                        var o = {
                            storename: t.data[a].XF_NAME,
                            storeamtsold: t.data[a].ZAMTSOLD,
                            storezb: t.data[a].ZB
                        };
                        n = n.concat(o.storename), i = "0" == e.data.tag ? i.concat(o.storeamtsold) : i.concat(o.storezb);
                    }
                    console.log(n), console.log(i), e.ygxspm();
                }
            }
        });
    },
    selectvip: function() {
        this.setData({
            isChecked1: !1,
            isChecked2: !1,
            shows: !1
        });
        var t = this;
        wx.request({
            url: o.globalData.api + "wx_allzb.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), e.data.length > 0 ? (r = e.data[0].ALLZB, t.setData({
                    zamtsold: e.data[0].ALLAMTSOLD,
                    store_target: e.data[0].ALLTARGET,
                    flag: !1
                })) : (r = 0, t.setData({
                    zamtsold: "",
                    store_target: "",
                    flag: !0
                })), t.showzb();
            }
        });
    },
    showzb: function() {
        console.log(r), this.setData({
            canvasIsShow: !1
        }), this.setData({
            canvasIsShow: !0
        }), console.log("sdfsdfsdfsdsdf");
        this.setData(t({}, "ec.onInit", u));
    },
    ygxspm: function() {
        this.setData({
            shows: !1
        }), this.setData({
            shows: !0
        }), console.log("ppppppp");
        this.setData(t({}, "ec2.onInit", h));
    }
});