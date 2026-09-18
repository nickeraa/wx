const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    loaded: false,
    rank: [],
    // 明细弹窗
    showDetail: false,
    detailStaff: '',
    detailList: []
  },

  onLoad: function () {
    this.loadRank();
  },

  loadRank: function () {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_qy_rank.ashx',
      data: { action: 'rank' },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          e.setData({ loaded: true, rank: d.rank || [] });
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

  // 点击员工查看客户明细
  showCustomers: function (e) {
    var staffName = e.currentTarget.dataset.name;
    var that = this;
    wx.request({
      url: app.globalData.api + 'wx_qy_rank.ashx',
      data: { action: 'customers', staffname: staffName },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          that.setData({
            showDetail: true,
            detailStaff: staffName,
            detailList: d.customers || []
          });
        } else {
          wx.showToast({ title: d.errmsg || '查询失败', icon: 'none' });
        }
      },
      fail: function () {
        wx.showToast({ title: '网络异常', icon: 'none' });
      }
    });
  },

  closeDetail: function () {
    this.setData({ showDetail: false, detailList: [], detailStaff: '' });
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
