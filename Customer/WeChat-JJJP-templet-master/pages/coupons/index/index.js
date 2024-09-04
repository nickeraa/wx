var t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        staffname: "",
        xf_name: "",
        id: "",
        yg_target: ""
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    getzb: function(t) {
        this.setData({
            yg_target: t.detail.value
        });
    },
    upyg: function(a) {
        if ("" == this.data.yg_target) return wx.showToast({
            title: "请输入员工指标",
            icon: "none",
            duration: 1e3
        }), !1;
        wx.request({
            url: t.globalData.api + "wx_upyg.ashx",
            data: {
                id: this.data.id,
                yg_target: this.data.yg_target
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), "ok" == t.data ? wx.showModal({
                    title: "提示",
                    content: "修改员工指标成功！",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                }) : wx.showModal({
                    title: "错误",
                    content: "修改失败",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm;
                    }
                });
            }
        });
    },
    onLoad: function(t) {
        t && this.setData({
            id: t.id
        });
    },
    onShow: function() {
        var a = this;
        wx.request({
            url: t.globalData.api + "wx_edityg.ashx",
            data: {
                id: a.data.id
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(t) {
                console.log(t), a.setData({
                    xf_name: t.data[0].XF_NAME,
                    staffname: t.data[0].STAFFNAME,
                    yg_target: t.data[0].YG_TARGET
                });
            }
        });
    },
    xzyg: function() {
        wx.request({
            url: t.globalData.api + "wx_addyg.ashx",
            data: {
                xf_storecode: this.data.store,
                xf_staffcode: this.data.staffcode,
                yg_target: this.data.zb
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
                        t.confirm;
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