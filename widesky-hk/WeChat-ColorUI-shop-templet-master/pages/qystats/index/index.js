const app = getApp();
const PAGE_SIZE = 50;   // 每页条数

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    loaded: false,
    total: 0,
    todayNew: 0,
    yesterdayNew: 0,
    diff: 0,
    detail: [],
    showDetail: false,
    // 分页
    page: 1,
    hasMore: false,
    loadingMore: false
  },

  onLoad: function () {
    this.loadStats();
  },

  loadStats: function () {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_qy_stats.ashx',
      data: { page: 1, size: PAGE_SIZE },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          e.setData({
            loaded: true,
            total: d.total || 0,
            todayNew: d.today_new || 0,
            yesterdayNew: d.yesterday_new || 0,
            diff: (d.today_new || 0) - (d.yesterday_new || 0),
            detail: d.detail || [],
            page: 1,
            hasMore: (d.detail || []).length === PAGE_SIZE,
            loadingMore: false
          });
        } else {
          e.setData({ loaded: true });
          wx.showToast({ title: d.errmsg || '查询失败', icon: 'none' });
        }
      },
      fail: function () {
        e.setData({ loaded: true });
        wx.showToast({ title: '网络异常', icon: 'none' });
      }
    });
  },

  toggleDetail: function () {
    this.setData({ showDetail: !this.data.showDetail });
  },

  // 加载更多
  loadMore: function () {
    var e = this;
    if (e.data.loadingMore || !e.data.hasMore) return;
    e.setData({ loadingMore: true });

    var nextPage = e.data.page + 1;
    wx.request({
      url: app.globalData.api + 'wx_qy_stats.ashx',
      data: { page: nextPage, size: PAGE_SIZE },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          var list = d.detail || [];
          e.setData({
            detail: e.data.detail.concat(list),
            page: nextPage,
            hasMore: list.length === PAGE_SIZE,
            loadingMore: false
          });
        } else {
          e.setData({ loadingMore: false });
          wx.showToast({ title: d.errmsg || '加载失败', icon: 'none' });
        }
      },
      fail: function () {
        e.setData({ loadingMore: false });
        wx.showToast({ title: '网络异常', icon: 'none' });
      }
    });
  },

  onReachBottom: function () {
    if (this.data.showDetail) {
      this.loadMore();
    }
  },

  goBack: function () {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.switchTab({ url: '/pages/home/index/index' });
    }
  }
});
