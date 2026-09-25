const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    card: '',           // 员工输入的会员卡号
    querying: false,    // 查询中
    searched: false,    // 是否已发起过查询
    noPrize: false,     // 没有参与抽奖（数据集无记录）
    notReceived: false, // 中奖但尚未领奖
    // 中奖信息
    prizeName: '',
    prizeImg: '',
    memberCard: '',
    vipName: '',
    vipLevel: '',
    staffId: '',
    staffName: '',
    shopNo: '',
    receivedTime: ''
  },

  onCardInput: function (e) {
    this.setData({ card: e.detail.value });
  },

  // 点查询：按会员卡号查询中奖信息
  onQuery: function () {
    var e = this;
    var card = String(e.data.card || '').trim();
    if (!card) {
      wx.showToast({ title: '请输入会员卡号', icon: 'none' });
      return;
    }
    e.setData({ querying: true, searched: false });
    wx.showLoading({ title: '查询中', mask: true });
    wx.request({
      url: app.globalData.api + 'wx_cj_prizeinfo.ashx',
      data: { vipcode: card },
      dataType: 'json',
      success: function (res) {
        wx.hideLoading();
        var d = res.data || {};
        if (d.errcode === 0) {
          // tags === '1' 表示已领取（已核销），展示领奖凭证；否则视为中奖但尚未领奖
          var received = String(d.tags) === '1';
          if (!received) {
            // 中奖但未领奖：展示中奖货品和图片，提示尚未领取
            e.setData({
              querying: false,
              searched: true,
              noPrize: false,
              notReceived: true,
              prizeName: d.prize_name || '',
              prizeImg: app.globalData.cjimg + d.plu_id + '.png?t=' + Date.now(),
              memberCard: d.vip_code || card,
              vipName: d.vip_name || '',
              vipLevel: d.vip_level || ''
            });
            return;
          }
          e.setData({
            querying: false,
            searched: true,
            noPrize: false,
            notReceived: false,
            prizeName: d.prize_name || '',
            prizeImg: app.globalData.cjimg + d.plu_id + '.png?t=' + Date.now(),
            memberCard: d.vip_code || card,
            vipName: d.vip_name || '',
            vipLevel: d.vip_level || '',
            staffId: d.staff_id || '',
            staffName: d.staff_name || '',
            shopNo: d.shop_no || '',
            receivedTime: d.received_time || ''
          });
        } else {
          // 没有参与抽奖（数据集无记录）
          e.setData({ querying: false, searched: true, noPrize: true, notReceived: false });
          wx.showToast({ title: d.errmsg || '没有参与抽奖', icon: 'none', duration: 2500 });
        }
      },
      fail: function () {
        wx.hideLoading();
        e.setData({ querying: false, searched: true, noPrize: true, notReceived: false });
        wx.showToast({ title: '网络异常，请重试', icon: 'none' });
      }
    });
  },

  // 重新查询
  onReset: function () {
    this.setData({ searched: false, noPrize: false, notReceived: false, card: '' });
  },

  back: function () {
    wx.navigateBack({
      fail: function () {
        wx.switchTab({ url: '/pages/jzb/index/index' });
      }
    });
  }
})
