var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        TabbarBot: a.globalData.tabbar_bottom,
        rejob: [],
        searched: false,
        picker3: [],
        index3: null,
        store: ""
    },
    onLoad: function() {
        var that = this;
        var hasGrade = !!wx.getStorageSync("grade");
        wx.showLoading({
            title: "加载店铺数据",
            mask: true
        });
        wx.request({
            url: a.globalData.api + (hasGrade ? "wx_sestore.ashx" : "checkstore.ashx"),
            data: hasGrade ? {} : {
                userid: wx.getStorageSync("vipuserid")
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(res) {
                wx.hideLoading();
                console.log("store list:", res);
                var list = res.data || [];
                that.setData({
                    picker3: list
                });
                if (list.length === 0) {
                    wx.showToast({
                        title: "暂无店铺可选",
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
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    bindPickerChange3: function(e) {
        this.setData({
            index3: e.detail.value,
            store: this.data.picker3[e.detail.value].XF_STORECODE
        });
    },
    newsaleslist: function(e) {
        var xf_staffcode = e.currentTarget.dataset.xf_staffcode;
        if (!xf_staffcode) {
            return;
        }
        wx.navigateTo({
            url: "/pages/vipwxlist/index/index?xf_staffcode=" + xf_staffcode
        });
    },
    checkinput: function() {
        var that = this;
        if (!that.data.store) {
            wx.showToast({
                title: "请选择查询店铺",
                icon: "none",
                duration: 2000
            });
            return false;
        }
        that.setData({
            rejob: [],
            searched: true
        });
        that.vip_sort();
    },
    vip_sort: function() {
        var that = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: true
        });
        wx.request({
            url: a.globalData.api + "wx_dpwx.ashx",
            data: {
                xf_storecode: that.data.store
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(res) {
                wx.hideLoading();
                console.log("wx_dpwx:", res);
                var list = res.data && res.data.length > 0 ? res.data : [];
                that.setData({
                    rejob: list,
                    searched: true
                });
                if (list.length === 0) {
                    wx.showToast({
                        title: "没有记录",
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
