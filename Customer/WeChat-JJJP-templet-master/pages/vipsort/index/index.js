var e, t = require("../../../@babel/runtime/helpers/defineProperty"), a = getApp(), s = require("../../../utils/util.js");

Page({
    data: (e = {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabbarBot: a.globalData.tabbar_bottom,
        TabCur: 0,
        scrollLeft: 0,
        rejob: {},
        ret: {},
        restt: {},
        xf_store: "",
        xf_plu: "",
        xf_qty: "",
        vipcode: "",
        vipname: "",
        xf_vipcode: "",
        xf_surname: "",
        grade: "",
        xf_stores: "",
        xf_issuedate: "",
        xf_users: "",
        xf_username: "",
        xf_bonus: "",
        check: "true",
        check1: "true",
        setype: "0",
        picker2: [],
        index2: null,
        picker3: [],
        index3: null
    }, t(t(t(t(t(t(t(t(t(t(e, "xf_plu", ""), "xf_desci", ""), "date", ""), "date2", ""), "userid", ""), "view", !0), "snumber", ""), "flag", !0), "store", ""), "storename", ""), 
    t(t(t(t(e, "i", ""), "picker4", []), "index4", null), "xf_staffcode", "")),
    bindDateChange: function(e) {
        console.log(e.detail.value), this.setData({
            date: e.detail.value
        });
    },
    bindDateChange2: function(e) {
        this.setData({
            date2: e.detail.value
        });
    },
    onLoad: function(e) {
        var t = s.formatDate(new Date());
        this.setData({
            date: t,
            date2: t
        }), console.log(wx.getStorageSync("qguserid")), this.setData({
            check: "",
            check1: "true",
            view: !0,
            flag: !0
        });
        var o = this;
        wx.request({
            url: a.globalData.api + "wx_group.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), o.setData({
                    picker2: e.data
                }), wx.getStorageSync("grade") ? wx.request({
                    url: a.globalData.api + "wx_sestore.ashx",
                    data: {},
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    dataType: "json",
                    success: function(e) {
                        console.log(e), o.setData({
                            picker3: e.data
                        });
                    }
                }) : wx.request({
                    url: a.globalData.api + "checkstore.ashx",
                    data: {
                        userid: wx.getStorageSync("vipuserid")
                    },
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    dataType: "json",
                    success: function(e) {
                        console.log(e), o.setData({
                            picker3: e.data
                        });
                    }
                });
            }
        });
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    getsnumber: function(e) {
        this.setData({
            snumber: e.detail.value
        });
    },
    bindPickerChange2: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index2: e.detail.value,
            xf_desci: this.data.picker2[e.detail.value].XF_DESCI
        }), console.log("picker发送选择改变，携带值为", this.data.xf_desci);
    },
    bindPickerChange3: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index3: e.detail.value,
            store: this.data.picker3[e.detail.value].XF_STORECODE
        }), this.sestaff();
    },
    bindPickerChange4: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index4: e.detail.value,
            xf_staffcode: this.data.picker4[e.detail.value].XF_STAFFCODE
        }), console.log(this.data.xf_staffcode);
    },
    sestaff: function() {
        (wx.getStorageSync("qguserid") || wx.getStorageSync("grade")) && this.setData({
            i: "0"
        });
        var e = this;
        wx.request({
            url: a.globalData.api + "wx_sestaff.ashx",
            data: {
                xf_storecode: e.data.store,
                userid: wx.getStorageSync("vipuserid"),
                i: e.data.i
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t);
                e.setData({
                    picker4: t.data
                }), (wx.getStorageSync("qguserid") || wx.getStorageSync("grade")) && (e.data.picker4.push({
                    XF_STAFFCODE: "all",
                    XF_NAME: "所有员工"
                }), e.setData({
                    picker4: e.data.picker4
                })), console.log(e.data.picker4);
            }
        });
    },
    sesnumber: function(e) {
        this.setData({
            xf_plu: e.currentTarget.dataset.xf_plu
        }), console.log(this.data.xf_plu), this.setData({
            view: !0,
            flag: ""
        }), this.checkinput();
    },
    onShow: function(e) {},
    saleslist: function(e) {
        console.log(e.currentTarget.dataset.xf_vipcode), console.log(this.data.date), console.log(this.data.date2), 
        wx.navigateTo({
            url: "/pages/vipskuss/index/index?vipcode=" + e.currentTarget.dataset.xf_vipcode + "&xf_desci=" + this.data.xf_desci + "&xf_surname=" + e.currentTarget.dataset.xf_surname + "&begindate=" + this.data.date + "&enddate=" + this.data.date2
        });
    },
    newsaleslist: function(e) {
        console.log(e.currentTarget.dataset.xf_vipcode), console.log(e.currentTarget.dataset.xf_surname), 
        wx.navigateTo({
            url: "/pages/vipskuss/index/index?vipcode=" + e.currentTarget.dataset.xf_vipcode + "&xf_desci=" + this.data.xf_desci + "&xf_surname=" + e.currentTarget.dataset.xf_surname + "&begindate=" + this.data.date + "&enddate=" + this.data.date2
        });
    },
    checkinput: function() {
        if (this.setData({
            rejob: null,
            ret: null
        }), null == this.data.index2) return wx.showToast({
            title: "请选择查询类目",
            icon: "none",
            duration: 2e3
        }), !1;
        if (this.data.date == s.formatDate(new Date())) return wx.showToast({
            title: "请选择消费日期",
            icon: "none",
            duration: 2e3
        }), !1;
        if (wx.getStorageSync("qguserid")) {
            if ("" == this.data.store) return wx.showToast({
                title: "请选择查询店铺",
                icon: "none",
                duration: 2e3
            }), !1;
            if ("" == this.data.xf_staffcode) return wx.showToast({
                title: "请选择查询员工",
                icon: "none",
                duration: 2e3
            }), !1;
        }
        this.vip_sort();
    },
    old_sort: function() {
        wx.request({
            url: a.globalData.api + "wx_oldsevip.ashx",
            data: {
                xf_desci: this.data.xf_desci,
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e);
            }
        });
    },
    vip_sort: function() {
        var e = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_sevipsort.ashx",
            data: {
                xf_desci: e.data.xf_desci,
                store: e.data.store,
                begindate: e.data.date,
                enddate: e.data.date2,
                xf_staffcode: e.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), t.data.length > 0 && e.setData({
                    rejob: t.data
                }), wx.hideLoading(), e.se_oldvip();
            }
        });
    },
    search: function() {
        "" == this.data.snumber ? wx.showToast({
            title: "请输入货品名称或货号查询",
            icon: "none",
            duration: 1e3
        }) : this.senumber();
    },
    senumber: function(e) {
        var t = this;
        wx.showLoading({
            title: "正在查询",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_hksystem_seprice.ashx",
            data: {
                snumber: t.data.snumber
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), wx.hideLoading(), 0 == e.data.length ? wx.showModal({
                    title: "提示",
                    content: "货品名称或货号不存在",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && t.setData({
                            view: "true"
                        });
                    }
                }) : t.setData({
                    result: e.data,
                    view: "",
                    flag: !0
                }), wx.hideLoading();
            }
        });
    },
    se_oldvip: function() {
        var e = this;
        wx.request({
            url: a.globalData.api + "wx_seoldvip.ashx",
            data: {
                xf_desci: e.data.xf_desci,
                store: e.data.store,
                xf_staffcode: e.data.xf_staffcode,
                begindate: e.data.date,
                enddate: e.data.date2
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), t.data.length > 0 ? e.setData({
                    ret: t.data
                }) : e.setData({
                    ret: null
                }), console.log(e.data.rejob), console.log(e.data.ret), e.data.rejob || e.data.ret || wx.showModal({
                    title: "提示",
                    content: "没有购买客户",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm;
                    }
                });
            }
        });
    }
});