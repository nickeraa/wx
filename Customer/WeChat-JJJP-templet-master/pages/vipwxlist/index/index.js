var a = getApp();
var BATCH = 50; // 每批渲染条数

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        rejob: [],
        xf_staffcode: "",
        count: 0,
        hasMore: false,
        loadingMore: false,
        loaded: false
    },
    onLoad: function(options) {
        var that = this;
        var xf_staffcode = options.xf_staffcode || "";
        if (!xf_staffcode) {
            wx.showToast({
                title: "缺少销售员参数",
                icon: "none"
            });
            return;
        }
        that.setData({
            xf_staffcode: xf_staffcode
        });
        that.vip_sort();
    },
    back: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    // 首次加载第一屏
    vip_sort: function() {
        var that = this;
        wx.showLoading({
            title: "正在加载数据",
            mask: true
        });
        wx.request({
            url: a.globalData.api + "wx_dpwxlist.ashx",
            data: {
                xf_staffcode: that.data.xf_staffcode
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            dataType: "json",
            success: function(res) {
                wx.hideLoading();
                console.log("wx_dpwxlist:", res);
                var list = res.data && res.data.length > 0 ? res.data : [];
                // 排序：未加微信排最前
                list.sort(function(x, y) {
                    var xUn = x.TAGS === "未加微信" ? 0 : 1;
                    var yUn = y.TAGS === "未加微信" ? 0 : 1;
                    return xUn - yUn;
                });
                that._allList = list; // 全量仅存内存，避免重复 setData 大数组
                that.setData({
                    rejob: list.slice(0, BATCH),
                    count: list.length,
                    hasMore: list.length > BATCH,
                    loaded: true
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
    },
    // 点击加载更多：从内存全量中追加下一批
    loadMore: function() {
        var that = this;
        if (!that.data.hasMore || that.data.loadingMore) {
            return;
        }
        that.setData({
            loadingMore: true
        });
        var all = that._allList || [];
        var rejob = that.data.rejob.concat(all.slice(that.data.rejob.length, that.data.rejob.length + BATCH));
        that.setData({
            rejob: rejob,
            hasMore: rejob.length < all.length,
            loadingMore: false
        });
    }
});
