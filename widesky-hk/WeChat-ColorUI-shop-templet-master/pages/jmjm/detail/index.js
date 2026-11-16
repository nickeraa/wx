var app = getApp();

Page({
  data: {
    userid: '',
    orderNo: '',
    info: null,
    loaded: false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },

  onLoad: function (options) {
    var e = this;
    var orderNo = (options && options.no ? options.no : '').trim();
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
    if (!orderNo) {
      wx.showToast({ title: '缺少单号参数', icon: 'none' });
      return;
    }
    e.setData({ userid: userid, orderNo: orderNo });
    e.loadInfo();
  },

  // 查询签署详情（货号/名称/数量/价格/客户/电话/图片）
  loadInfo: function () {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_jmjm_info.ashx',
      method: 'POST',
      data: { order_no: e.data.orderNo },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          var items = d.goods_items || [];
          e.setData({
            loaded: true,
            info: {
              order_no: d.order_no || e.data.orderNo,
              cust_name: d.cust_name || '',
              cust_phone: d.cust_phone || '',
              sign_time: d.sign_time || '',
              status: d.status,
              shopNo: d.shop_no || '',
              shopName: d.shop_name || '',
              staffId: d.staff_id || '',
              items: items
            }
          });
        } else {
          e.setData({ loaded: true });
          wx.showToast({ title: d.errmsg || '查询失败', icon: 'none' });
        }
      },
      fail: function () {
        e.setData({ loaded: true });
        wx.showToast({ title: '网络异常，请重试', icon: 'none' });
      }
    });
  },

  // 点击图片放大（预览该货品全部照片，从点击那张开始）
  previewImg: function (ev) {
    var e = this;
    var p = ev.currentTarget.dataset.p;
    var i = ev.currentTarget.dataset.i;
    var item = e.data.info && e.data.info.items ? e.data.info.items[p] : null;
    if (!item || !item.imgs || item.imgs.length === 0) return;
    wx.previewImage({ current: item.imgs[i], urls: item.imgs });
  },

  // 拨打客户电话
  callPhone: function () {
    var phone = this.data.info && this.data.info.cust_phone;
    if (phone) wx.makePhoneCall({ phoneNumber: phone });
  },

  // 返回
  goBack: function () {
    wx.navigateBack();
  },

  // 重试
  retry: function () {
    this.loadInfo();
  }
});
