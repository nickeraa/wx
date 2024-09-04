var e = require("../../../@babel/runtime/helpers/defineProperty"), t = function(e, t) {
    if (!t && e && e.__esModule) return e;
    if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
    };
    var o = a(t);
    if (o && o.has(e)) return o.get(e);
    var n = {}, s = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var i in e) if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
        var r = s ? Object.getOwnPropertyDescriptor(e, i) : null;
        r && (r.get || r.set) ? Object.defineProperty(n, i, r) : n[i] = e[i];
    }
    n.default = e, o && o.set(e, n);
    return n;
}(require("../../ec-canvas/echarts"));

function a(e) {
    if ("function" != typeof WeakMap) return null;
    var t = new WeakMap(), o = new WeakMap();
    return (a = function(e) {
        return e ? o : t;
    })(e);
}

var o = getApp(), n = require("../../../utils/util.js"), s = [], i = [], r = [];

function l(e, a, o, n) {
    var l = t.init(e, null, {
        width: a,
        height: o,
        devicePixelRatio: n
    });
    e.setChart(l);
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
            data: s,
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
            data: i,
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
    onLoad: function(e) {
        var t = n.formatDate(new Date());
        this.setData({
            date: t.substring(0, 8) + "01",
            date2: t
        }), console.log(this.data.date);
    },
    onShow: function() {
        var e = this;
        wx.request({
            url: o.globalData.api + "wx_sestore.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), e.setData({
                    picker2: t.data
                });
            }
        });
    },
    bindPickerChange2: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index2: e.detail.value,
            store: this.data.picker2[e.detail.value].XF_STORECODE,
            storename: this.data.picker2[e.detail.value].XF_NAME
        });
    },
    ygxs: function(e) {
        s = [], i = [], r = [];
        var t = this;
        wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: o.globalData.api + "wx_csalesyg.ashx",
            data: {
                begindate: t.data.date,
                enddate: t.data.date2,
                xf_storecode: t.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                if (console.log(e), wx.hideLoading(), console.log(e.data.length), e.data.length > 0) {
                    for (var a = 0; a < e.data.length; a++) {
                        var o = {
                            storename: e.data[a].XF_YGNAME,
                            storeamtsold: e.data[a].YGAMTSOLD,
                            zb: e.data[a].ZBAMTSOLD
                        };
                        s = s.concat(o.storename), i = i.concat(o.storeamtsold), r = r.concat(o.zb);
                    }
                    console.log(s), console.log(i), console.log(r), t.ygxspm();
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
        if (null == this.data.index2) return wx.showToast({
            title: "请选择店铺！",
            icon: "none",
            duration: 2e3
        }), !1;
        this.setData({
            isChecked1: !1,
            shows: !1
        });
        var e = this;
        wx.request({
            url: o.globalData.api + "wx_csalesstore.ashx",
            data: {
                begindate: e.data.date,
                enddate: e.data.date2,
                xf_storecode: e.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), t.data.length > 0 ? e.setData({
                    zamtsold: t.data[0].AMTSOLD,
                    flag: !1
                }) : e.setData({
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
        this.setData(e({}, "ec2.onInit", l));
    }
});