var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabbarBot: a.globalData.tabbar_bottom,
        rejob: [],
        xf_name: "",
        submitting: false
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    // 仅用于阻止 radio 区域点击冒泡触发整行跳转
    catchTap: function() {},
    shuaxin: function() {
        this.onShow();
    },
    sevip: function(e) {
        wx.navigateTo({
            url: "/pages/vipsaless/index/index?vipcode=" + e.currentTarget.dataset.xf_vipcode
        });
    },
    // radio 选择改变：e.detail.value = '0' 已加微信 / '1' 未加微信
    radioChange: function(e) {
        var vipcode = e.currentTarget.dataset.xf_vipcode;
        if (!vipcode) {
            return;
        }
        this.dj(e.detail.value, vipcode);
    },
    // 提交微信登记状态
    dj: function(setype, vipcode) {
        var that = this;
        if (that.data.submitting) {
            return;
        }
        that.setData({
            submitting: true
        });
        wx.showLoading({
            title: "正在保存",
            mask: true
        });
        wx.request({
            url: a.globalData.api + "wx_inwxvip.ashx",
            data: {
                setype: setype,
                xf_vipcode: vipcode,
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(res) {
                wx.hideLoading();
                if (res.data === "ok") {
                    // 成功后本地更新该项状态，无需整页刷新即可回显
                    var rejob = that.data.rejob.map(function(item) {
                        if (item.XF_VIPCODE === vipcode) {
                            item.wxstate = setype;
                        }
                        return item;
                    });
                    that.setData({
                        rejob: rejob
                    });
                    wx.showModal({
                        title: "提示",
                        content: setype === "0" ? "已登记为：已加微信" : "已登记为：未加微信",
                        showCancel: false
                    });
                } else {
                    wx.showModal({
                        title: "提示",
                        content: "数据错误！",
                        showCancel: false
                    });
                }
            },
            fail: function() {
                wx.hideLoading();
                wx.showToast({
                    title: "保存失败，请重试",
                    icon: "none"
                });
            },
            complete: function() {
                that.setData({
                    submitting: false
                });
            }
        });
    },
    onShow: function() {
        var that = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: true
        });
        wx.request({
            url: a.globalData.api + "wx_wxvip.ashx",
            data: {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(res) {
                wx.hideLoading();
                console.log("wxvip list:", res);
                var data = res.data || [];
                var rejob = [];
                var xf_name = "";
                if (data.length > 0) {
                    xf_name = data[0].XF_NAME || "";
                    rejob = data.map(function(item) {
                        // 回显：根据后端返回的微信状态标签映射 radio 选中值
                        item.wxstate = item.TAGS === "已加微信" ? "0" : item.TAGS === "未加微信" ? "1" : "";
                        return item;
                    });
                }
                that.setData({
                    rejob: rejob,
                    xf_name: xf_name
                });
                if (rejob.length === 0) {
                    wx.showToast({
                        title: "没有需要跟进登记的客户",
                        icon: "none",
                        duration: 2000
                    });
                }
            },
            fail: function() {
                wx.hideLoading();
                wx.showToast({
                    title: "加载失败，请重试",
                    icon: "none"
                });
            }
        });
    }
});
