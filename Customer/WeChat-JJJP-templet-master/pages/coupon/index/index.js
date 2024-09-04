var t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        ygname: "",
        xf_storecode: "",
        xf_name: "",
        lccode: "",
        index3: null,
        picker3: [],
        store: "",
        storename: "",
        staffcode: "",
        zb: ""
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    getstaff: function(t) {
        this.setData({
            staffcode: t.detail.value
        });
    },
    getzb: function(t) {
        this.setData({
            zb: t.detail.value
        });
    },
    check: function() {
        if ("" == this.data.staffcode) return wx.showToast({
            title: "请输入员工科传ID！",
            icon: "none",
            duration: 2e3
        }), !1;
        var a = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: !0
        }), wx.request({
            url: t.globalData.api + "wx_checkyg.ashx",
            data: {
                userid: a.data.staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), t.data.length > 0 ? a.setData({
                    xf_name: t.data[0].XF_NAME
                }) : (wx.showToast({
                    title: "员工科传ID不存在！",
                    icon: "none",
                    duration: 2e3
                }), a.setData({
                    xf_name: ""
                })), wx.hideLoading();
            }
        });
    },
    bindPickerChange3: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            index3: t.detail.value,
            store: this.data.picker3[t.detail.value].XF_STORECODE,
            storename: this.data.picker3[t.detail.value].XF_NAME
        });
    },
    addyg: function(t) {
        return null == this.data.index3 ? (wx.showToast({
            title: "请选择店铺",
            icon: "none",
            duration: 1e3
        }), !1) : "" == this.data.staffcode || "" == this.data.xf_name ? (wx.showToast({
            title: "请输入员工id",
            icon: "none",
            duration: 1e3
        }), !1) : "" == this.data.zb ? (wx.showToast({
            title: "请输入员工指标",
            icon: "none",
            duration: 1e3
        }), !1) : void this.checkyg();
    },
    onLoad: function(a) {
        var e = this;
        wx.request({
            url: t.globalData.api + "wx_qgstore.ashx",
            data: {
                qguserid: wx.getStorageSync("qguserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), 0 == t.data.length ? (wx.showToast({
                    title: "权限不足",
                    icon: "error",
                    duration: 2e3
                }), wx.navigateTo({
                    url: "/pages/home/index/index"
                })) : e.setData({
                    picker3: t.data
                });
            }
        });
    },
    onShow: function() {},
    checkyg: function() {
        var a = this;
        wx.request({
            url: t.globalData.api + "wx_checkygs.ashx",
            data: {
                xf_staffcode: a.data.staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), t.data.length > 0 ? wx.showModal({
                    title: "提示",
                    content: "新增失败！已存在相同的员工ID！",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                }) : a.xzyg();
            }
        });
    },
    xzyg: function() {
        wx.request({
            url: t.globalData.api + "wx_addyg.ashx",
            data: {
                xf_storecode: this.data.store,
                xf_staffcode: this.data.staffcode,
                yg_target: this.data.zb,
                qguserid: wx.getStorageSync("qguserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), "ok" == t.data ? wx.showModal({
                    title: "提示",
                    content: "新增员工和指标成功！",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                }) : wx.showModal({
                    title: "错误",
                    content: "新增员工失败",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                });
            }
        });
    }
});