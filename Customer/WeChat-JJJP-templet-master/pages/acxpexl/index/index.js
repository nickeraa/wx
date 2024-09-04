var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        resultdt: {},
        replu: {},
        replus: {},
        itemname: "",
        check: !1,
        select_all: !1,
        choseNames: "",
        flag: !0,
        flags: !0,
        xf_vipcode: "",
        vipname: "",
        grade: "",
        xf_name: "",
        xf_staffcode: "",
        storecode: "",
        store: "",
        qguserid: "",
        array: [ "银卡会员", "金卡会员", "钻卡会员" ],
        index: 0,
        index3: null,
        picker3: [],
        index4: null,
        picker4: [],
        storename: "",
        setype: "0",
        staffcode: "",
        xf_newname: ""
    },
    bindPickerChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index: a.detail.value
        });
    },
    getstaff: function(a) {
        this.setData({
            staffcode: a.detail.value
        });
    },
    getvipcode: function(a) {
        this.setData({
            xf_vipcode: a.detail.value
        });
    },
    radioChange: function(a) {
        console.log("radior发送选择改变，携带值为", a.detail.value), this.setData({
            setype: a.detail.value
        }), "0" == a.detail.value ? this.setData({
            check: !1
        }) : this.setData({
            check: !0
        });
    },
    check: function() {
        var e = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: a.globalData.api + "wx_checkyg.ashx",
            data: {
                userid: e.data.staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), a.data.length > 0 ? e.setData({
                    xf_newname: a.data[0].XF_NAME
                }) : (wx.showToast({
                    title: "员工科传ID不存在！",
                    icon: "none",
                    duration: 2e3
                }), e.setData({
                    xf_name: ""
                })), wx.hideLoading();
            }
        });
    },
    upvipyg: function() {
        if (0 == this.data.choseNames.length) return wx.showModal({
            title: "提示",
            content: "没有勾选会员",
            showCancel: !1,
            success: function(a) {
                a.confirm;
            }
        }), !1;
        if ("" == this.data.staffcode || "" == this.data.xf_newname) return wx.showModal({
            title: "提示",
            content: "没有填写新跟进员工",
            showCancel: !1,
            success: function(a) {
                a.confirm;
            }
        }), !1;
        wx.request({
            url: a.globalData.api + "wx_upvipyg.ashx",
            data: {
                arrs: this.data.choseNames,
                newyguserid: this.data.staffcode,
                upuserid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), "error" != a.data ? wx.showModal({
                    title: "提示",
                    content: "更新成功！",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "更新错误！",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                });
            }
        });
    },
    searchvip: function() {
        if ("" == this.data.store) return wx.showToast({
            title: "请选择店铺",
            icon: "none",
            duration: 2e3
        }), !1;
        var e = this;
        wx.request({
            url: a.globalData.api + "web_searchvip.ashx",
            data: {
                xf_vipcode: e.data.xf_vipcode,
                storecode: e.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), 0 == a.data.length ? (e.setData({
                    replu: null,
                    flag: !0,
                    flags: !0
                }), wx.showToast({
                    title: "本店没有记录",
                    icon: "none",
                    duration: 2e3
                })) : e.setData({
                    replu: a.data,
                    flag: !1,
                    flags: !1,
                    itemname: e.data.storename
                });
            }
        });
    },
    onLoad: function(e) {
        var t = this;
        wx.request({
            url: a.globalData.api + "wx_qgstore.ashx",
            data: {
                qguserid: wx.getStorageSync("qguserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), 0 == a.data.length ? (wx.showToast({
                    title: "权限不足",
                    icon: "error",
                    duration: 2e3
                }), wx.navigateTo({
                    url: "/pages/home/index/index"
                })) : t.setData({
                    picker3: a.data
                });
            }
        });
    },
    bindPickerChange3: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index3: a.detail.value,
            store: this.data.picker3[a.detail.value].XF_STORECODE,
            storename: this.data.picker3[a.detail.value].XF_NAME
        }), this.sestaff();
    },
    bindPickerChange4: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            index4: a.detail.value,
            xf_staffcode: this.data.picker4[a.detail.value].XF_DEFSALESMAN,
            xf_name: this.data.picker4[a.detail.value].XF_NAME
        }), console.log(this.data.xf_staffcode);
    },
    sestaff: function() {
        var e = this;
        wx.request({
            url: a.globalData.api + "wx_sevipstaff.ashx",
            data: {
                xf_storecode: e.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                console.log(a), e.setData({
                    picker4: a.data
                });
            }
        });
    },
    checkboxChange: function(a) {
        this.setData({
            choseNames: a.detail.value
        }), console.log(this.data.choseNames);
    },
    selectall: function(a) {
        for (var e = [], t = 0; t < this.data.replu.length; t++) this.data.replu[t].checked = !this.data.select_all, 
        1 == this.data.replu[t].checked && (e = e.concat(this.data.replu[t].XF_VIPCODE.split(",")));
        this.setData({
            replu: this.data.replu,
            select_all: !this.data.select_all,
            choseNames: e
        }), console.log(this.data.choseNames);
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    search: function(e) {
        if ("" == this.data.store) return wx.showToast({
            title: "请选择查询店铺",
            icon: "none",
            duration: 2e3
        }), !1;
        if ("" == this.data.xf_staffcode && "0" == this.data.setype) return wx.showToast({
            title: "请选择查询员工",
            icon: "none",
            duration: 2e3
        }), !1;
        var t = this;
        t.setData({
            choseNames: [],
            select_all: !1
        }), wx.showLoading({
            title: "正在加载"
        }), wx.request({
            url: a.globalData.api + "wx_listupvip.ashx",
            data: {
                storecode: t.data.store,
                setype: t.data.setype,
                xf_staffcode: t.data.xf_staffcode,
                index: t.data.index
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(a) {
                if (console.log(a.data), t.setData({
                    itemname: t.data.storename + "&&" + t.data.xf_name + "&&" + t.data.array[t.data.index]
                }), a.data.length > 800) return wx.showModal({
                    title: "提示",
                    content: "数据量太大，请移步网站查询",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm;
                    }
                }), t.onLoad(), t.setData({
                    replu: null
                }), wx.hideLoading(), !1;
                a.data.length > 0 ? t.setData({
                    replu: a.data,
                    flag: !1,
                    flags: !1
                }) : (wx.showToast({
                    title: "没有记录！",
                    icon: "none",
                    duration: 2e3
                }), t.setData({
                    replu: null,
                    flag: !0,
                    flags: !0
                })), wx.hideLoading();
            }
        });
    },
    onShow: function() {}
});