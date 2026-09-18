const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    // 查询状态
    loaded: false,       // 查询完成
    hasPrize: false,     // 是否中奖
    // 中奖信息
    pluId: -1,
    prizeName: '',
    prizeImg: '',
    tags: ''            // 0=未核销 1=已核销
  },

  onLoad: function () {
    // 禁止转发/分享
    if (wx.hideShareMenu) {
      wx.hideShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      });
    }
    this.queryPrize();
  },

  // 查询中奖信息：code 换 openid/unionid → 查中奖记录（只展示，不做任何操作）
  queryPrize: function () {
    var e = this;
    wx.login({
      success: function (lres) {
        wx.request({
          url: app.globalData.api + 'wx_cj_myprize.ashx',
          data: {
            code: lres.code || ''
          },
          dataType: 'json',
          success: function (res) {
            var d = res.data || {};
            if (d.errcode === 0) {
              e.setData({
                loaded: true,
                hasPrize: true,
                pluId: d.plu_id,
                prizeName: d.prize_name || '',
                prizeImg: app.globalData.cjimg + d.plu_id + '.png?t=' + Date.now(),
                tags: d.tags != null ? String(d.tags) : '0'
              });
            } else {
              e.setData({
                loaded: true,
                hasPrize: false
              });
            }
          },
          fail: function () {
            e.setData({
              loaded: true,
              hasPrize: false
            });
          }
        });
      },
      fail: function () {
        e.setData({
          loaded: true,
          hasPrize: false
        });
      }
    });
  }
});
