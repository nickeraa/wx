var app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userid: '',
    shops: [],
    shopsLoaded: false,
    currentLoaded: false,
    loading: true,
    selected: '',
    selectedName: '',
    currentNo: '',
    currentName: '',
    saving: false
  },

  onLoad: function () {
    var e = this;
    e.setData({
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar
    });
    var userid = (wx.getStorageSync('userid') || '').trim();
    if (!userid) {
      wx.showModal({
        title: '提示',
        content: '请先在店铺登录页完成登录',
        showCancel: false,
        success: function () { wx.navigateBack(); }
      });
      return;
    }
    e.setData({ userid: userid });
    e.loadShops();
    e.loadCurrent();
  },

  goBack: function () { wx.navigateBack(); },

  // 两个请求都结束后关闭加载条
  checkLoading: function () {
    var e = this;
    e.setData({ loading: !(e.data.shopsLoaded && e.data.currentLoaded) });
  },

  // 店铺列表
  loadShops: function () {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_jmjm_shop.ashx',
      method: 'POST',
      data: { userid: e.data.userid, action: 'list' },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        e.setData({ shops: d.list || [], shopsLoaded: true });
      },
      fail: function () { e.setData({ shopsLoaded: true }); },
      complete: function () { e.checkLoading(); }
    });
  },

  // 当前归属（员工自选优先，否则员工主数据默认店铺）
  loadCurrent: function () {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_jmjm_shop.ashx',
      method: 'POST',
      data: { userid: e.data.userid, action: 'current' },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          e.setData({
            currentNo: d.shop_no || '',
            currentName: d.shop_name || '',
            // 默认选中当前归属，方便直接确认
            selected: d.shop_no || '',
            selectedName: d.shop_name || ''
          });
        }
        e.setData({ currentLoaded: true });
      },
      fail: function () { e.setData({ currentLoaded: true }); },
      complete: function () { e.checkLoading(); }
    });
  },

  selectShop: function (ev) {
    var e = this;
    var no = ev.currentTarget.dataset.no;
    var name = ev.currentTarget.dataset.name;
    e.setData({ selected: no, selectedName: name });
  },

  // 确认设定
  saveShop: function () {
    var e = this;
    if (e.data.saving) return;
    if (!e.data.selected) {
      wx.showToast({ title: '请先选择店铺', icon: 'none' });
      return;
    }
    e.setData({ saving: true });
    wx.request({
      url: app.globalData.api + 'wx_jmjm_shop.ashx',
      method: 'POST',
      data: {
        userid: e.data.userid,
        action: 'save',
        shop_no: e.data.selected,
        shop_name: e.data.selectedName
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          wx.showToast({ title: '设定成功', icon: 'success' });
          setTimeout(function () { wx.navigateBack(); }, 800);
        } else {
          wx.showToast({ title: d.errmsg || '设定失败，请重试', icon: 'none', duration: 2500 });
        }
      },
      fail: function () {
        wx.showToast({ title: '网络异常，请重试', icon: 'none' });
      },
      complete: function () {
        e.setData({ saving: false });
      }
    });
  }
});
