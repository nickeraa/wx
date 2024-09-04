var e, t, a = require("../../../@babel/runtime/helpers/defineProperty"), s = getApp();

require("../../../utils/util.js");

Page((t = {
    data: (e = {
        StatusBar: s.globalData.StatusBar,
        CustomBar: s.globalData.CustomBar,
        TabbarBot: s.globalData.tabbar_bottom,
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
        xf_vicode: "",
        xf_surname: "",
        grade: "",
        xf_stores: "",
        xf_issuedate: "",
        xf_users: "",
        i: "",
        xf_username: "",
        xf_bonus: "",
        setype: "1",
        picker2: [],
        index2: null,
        picker3: [],
        index3: null
    }, a(a(a(a(a(a(a(a(a(a(e, "xf_plu", ""), "xf_desci", ""), "userid", ""), "view", !0), "snumber", ""), "store", ""), "storename", ""), "picker4", []), "index4", null), "xf_staffcode", ""), 
    a(e, "flag", !0)),
    onLoad: function(e) {
        var t = this;
        wx.getStorageSync("grade") ? wx.request({
            url: s.globalData.api + "wx_sestore.ashx",
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(e) {
                console.log(e), t.setData({
                    picker3: e.data
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
            success: function(e) {
                console.log(e), t.setData({
                    picker3: e.data
                });
            }
        });
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
            url: s.globalData.api + "wx_sestaff.ashx",
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
                }));
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
    }
}, a(a(a(a(a(a(a(a(a(a(t, "bindPickerChange3", function(e) {
    console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
        index3: e.detail.value,
        store: this.data.picker3[e.detail.value].XF_STORECODE,
        storename: this.data.picker3[e.detail.value].XF_NAME
    }), this.sestaff();
}), "sesnumber", function(e) {
    this.setData({
        xf_plu: e.currentTarget.dataset.xf_plu
    }), console.log(this.data.xf_plu), this.checkinput();
}), "onShow", function(e) {}), "saleslist", function(e) {
    console.log(e.currentTarget.dataset.xf_vipcode), console.log(e.currentTarget.dataset.xf_surname), 
    console.log(this.data.xf_plu), wx.navigateTo({
        url: "/pages/vipskussp/index/index?vipcode=" + e.currentTarget.dataset.xf_vipcode + "&xf_plu=" + this.data.xf_plu + "&xf_surname=" + e.currentTarget.dataset.xf_surname
    });
}), "newsaleslist", function(e) {
    console.log(e.currentTarget.dataset.xf_vipcode), console.log(e.currentTarget.dataset.xf_surname), 
    console.log(this.data.xf_plu), wx.navigateTo({
        url: "/pages/vipskussp/index/index?vipcode=" + e.currentTarget.dataset.xf_vipcode + "&xf_plu=" + this.data.xf_plu + "&xf_surname=" + e.currentTarget.dataset.xf_surname
    });
}), "checkinput", function() {
    this.setData({
        ret: null,
        rejob: null
    }), this.vip_sku();
}), "search", function() {
    "" == this.data.snumber ? wx.showToast({
        title: "请输入货品名称或货号查询",
        icon: "none",
        duration: 1e3
    }) : this.senumber();
}), "senumber", function(e) {
    var t = this;
    wx.showLoading({
        title: "正在查询",
        mask: !0
    }), wx.request({
        url: s.globalData.api + "wx_hksystem_seprice.ashx",
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
                        view: "true",
                        flag: !0
                    });
                }
            }) : t.setData({
                result: e.data,
                view: "",
                flag: !0
            }), wx.hideLoading();
        }
    });
}), "se_oldvip", function() {
    var e = this;
    wx.request({
        url: s.globalData.api + "wx_seoldvip.ashx",
        data: {
            xf_desci: e.data.xf_desci,
            userid: wx.getStorageSync("vipuserid"),
            store: e.data.store
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
}), "vip_sku", function() {
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
    if ("" == this.data.xf_plu) return wx.showModal({
        title: "提示",
        content: "请输入货号",
        showCancel: !1,
        success: function(e) {
            e.confirm;
        }
    }), !1;
    console.log(this.data.xf_plu);
    var e = this;
    wx.showLoading({
        title: "正在加载数据",
        mask: !0
    }), wx.request({
        url: s.globalData.api + "wx_sevipsku.ashx",
        data: {
            xf_plu: e.data.xf_plu,
            store: e.data.store,
            xf_staffcode: e.data.xf_staffcode
        },
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function(t) {
            console.log(t), t.data.length > 0 ? e.setData({
                rejob: t.data,
                view: !0,
                flag: !1
            }) : e.setData({
                rejob: null
            }), wx.hideLoading(), e.oldsku();
        }
    });
}), a(t, "oldsku", function() {
    var e = this;
    wx.request({
        url: s.globalData.api + "wx_checkoldsku.ashx",
        data: {
            xf_plu: e.data.xf_plu,
            store: e.data.store,
            xf_staffcode: e.data.xf_staffcode
        },
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function(t) {
            console.log(t), t.data.length > 0 ? e.setData({
                ret: t.data,
                view: !0,
                flag: !1
            }) : (e.setData({
                ret: null
            }), e.data.rejob || e.data.ret || wx.showModal({
                title: "提示",
                content: "没有购买客户",
                showCancel: !1,
                success: function(e) {
                    e.confirm;
                }
            }));
        }
    });
})));