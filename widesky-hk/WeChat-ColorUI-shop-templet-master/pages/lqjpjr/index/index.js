const app = getApp();
const cjimgDay = 'https://widesky.work/HKback/cjimages_day/'; // 中秋抽奖奖品图目录
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    bg: 'https://widesky.work/HKback/images/cgbg.jpg',
    // 查询状态
    prizeLoaded: false,   // 奖品查询完成
    emptyMsg: '',         // 无奖品提示文案（后端返回）
    // 中奖列表（每人最多 3 次，各领一次）
    prizeList: [],        // [{row_id, plu_id, prize_name, tags, prizeImg}]
    memberCard: '',       // 会员卡号（展示用）
    // 当前领取中的奖品（用于二维码/轮询）
    curRowId: '',         // 当前待领取记录的自增ID
    curPluId: -1,
    // 二维码
    showQrcode: false,    // 二维码弹窗
    qrcodeImg: '',        // 二维码图片
    qrcodeLoading: false, // 二维码生成中
    pollTimer: null,      // 核销状态轮询定时器
    // 提示弹窗
    showModal: false,
    modalMsg: ''
  },

  onLoad: function () {
    // 禁止转发/分享朋友圈
    if (wx.hideShareMenu) {
      wx.hideShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      });
    }
    this.queryPrize();
  },

  onShow: function () {
    if (wx.hideShareMenu) {
      wx.hideShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      });
    }
  },

  onUnload: function () {
    if (this.data.pollTimer) {
      clearInterval(this.data.pollTimer);
      this.data.pollTimer = null;
    }
  },

  // 查询中奖列表：code 换 openid/unionid → 查本人全部中奖记录
  queryPrize: function () {
    var e = this;
    e.setData({ prizeLoaded: false });
    wx.login({
      success: function (lres) {
        wx.request({
          url: app.globalData.api + 'wx_cj_myprize_day.ashx',
          data: {
            code: lres.code || ''
          },
          dataType: 'json',
          success: function (res) {
            var d = res.data || {};
            if (d.errcode === 0 && d.list && d.list.length > 0) {
              var list = d.list.map(function (it) {
                return {
                  row_id: it.row_id || '',
                  plu_id: it.plu_id,
                  prize_name: it.prize_name || '',
                  tags: it.tags != null ? String(it.tags) : '0',
                  prizeImg: cjimgDay + it.plu_id + '.png?t=' + Date.now()
                };
              });
              e.setData({
                prizeLoaded: true,
                prizeList: list,
                memberCard: d.vip_code || wx.getStorageSync('member_card') || ''
              });
            } else {
              e.setData({
                prizeLoaded: true,
                prizeList: [],
                emptyMsg: d.errmsg || '抱歉，没有查到您的抽奖记录'
              });
            }
          },
          fail: function () {
            e.setData({
              prizeLoaded: true,
              prizeList: [],
              emptyMsg: '网络异常，请重试'
            });
          }
        });
      },
      fail: function () {
        e.setData({
          prizeLoaded: true,
          prizeList: [],
          emptyMsg: '登录失败，请重试'
        });
      }
    });
  },

  // 点某条奖品"立即领取"：生成带 vipcode+记录ID 的核销二维码
  onReceive: function (e) {
    var t = this;
    var rowId = e.currentTarget.dataset.rowid;
    var pluId = e.currentTarget.dataset.pluid;
    if (t.data.qrcodeLoading) return;
    t.setData({ qrcodeLoading: true, curRowId: rowId, curPluId: pluId });
    wx.login({
      success: function (lres) {
        wx.request({
          url: app.globalData.api + 'wx_cj_receive_day.ashx',
          data: {
            code: lres.code || ''
          },
          dataType: 'json',
          success: function (res) {
            var d = res.data || {};
            if (d.errcode === 0 && d.vip_code) {
              // 核验通过，拿到会员卡号，生成带 rowid 的核销二维码
              t.setData({ memberCard: d.vip_code });
              t.genQrcode(d.vip_code, rowId);
            } else if (d.errcode === -10) {
              t.setData({
                showModal: true,
                modalMsg: d.errmsg || '您还没有添加企业微信，暂不能领奖喔',
                qrcodeLoading: false
              });
            } else {
              wx.showToast({
                title: d.errmsg || '领取失败',
                icon: 'none',
                duration: 2500
              });
              t.setData({ qrcodeLoading: false });
            }
          },
          fail: function () {
            wx.showToast({ title: '网络异常，请重试', icon: 'none' });
            t.setData({ qrcodeLoading: false });
          }
        });
      },
      fail: function () {
        wx.showToast({ title: '登录失败，请重试', icon: 'none' });
        t.setData({ qrcodeLoading: false });
      }
    });
  },

  // 生成带「卡号+记录ID」参数的小程序码（员工扫码精确核销某一条奖品）
  genQrcode: function (vipcode, rowId) {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_cj_qrcode_day.ashx',
      data: {
        vipcode: vipcode,
        rowid: rowId
      },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0 && d.qrcode) {
          e.setData({
            qrcodeImg: d.qrcode,
            showQrcode: true,
            qrcodeLoading: false
          });
          e.startPoll();
        } else {
          wx.showToast({
            title: d.errmsg || '二维码生成失败',
            icon: 'none'
          });
          e.setData({ qrcodeLoading: false });
        }
      },
      fail: function () {
        wx.showToast({ title: '网络异常，请重试', icon: 'none' });
        e.setData({ qrcodeLoading: false });
      }
    });
  },

  // 轮询：核销成功后刷新列表（支持逐条领取，核销一条后继续显示其余待领取）
  startPoll: function () {
    var e = this;
    if (e.data.pollTimer) clearInterval(e.data.pollTimer);
    e.data.pollCount = 0;
    e.data.pollTimer = setInterval(function () {
      if (!e.data.curRowId) {
        clearInterval(e.data.pollTimer);
        e.data.pollTimer = null;
        return;
      }
      if (e.data.pollCount >= 200) {
        clearInterval(e.data.pollTimer);
        e.data.pollTimer = null;
        return;
      }
      e.data.pollCount++;
      // 用我的奖品接口轮询，判断当前 rowid 那条是否已核销
      wx.request({
        url: app.globalData.api + 'wx_cj_myprize_day.ashx',
        data: { code: e.data.lastCode || '' },
        dataType: 'json',
        success: function (res) {
          var d = res.data || {};
          if (d.errcode === 0 && d.list) {
            var hit = null;
            for (var i = 0; i < d.list.length; i++) {
              if (d.list[i].row_id === e.data.curRowId) {
                hit = d.list[i];
                break;
              }
            }
            if (hit && String(hit.tags) === '1') {
              // 当前这条已核销
              clearInterval(e.data.pollTimer);
              e.data.pollTimer = null;
              e.setData({ showQrcode: false, curRowId: '' });
              if (wx.vibrateShort) {
                wx.vibrateShort({ type: 'medium' });
              }
              // 刷新列表，展示最新状态（已领取的变绿，其余待领取继续可领）
              e.refreshList();
            }
          }
        }
      });
    }, 3000);
  },

  // 用已缓存的 code 刷新列表（若无 code 则走完整 queryPrize 重新 login）
  refreshList: function () {
    var e = this;
    wx.login({
      success: function (lres) {
        e.data.lastCode = lres.code || '';
        wx.request({
          url: app.globalData.api + 'wx_cj_myprize_day.ashx',
          data: { code: e.data.lastCode },
          dataType: 'json',
          success: function (res) {
            var d = res.data || {};
            if (d.errcode === 0 && d.list && d.list.length > 0) {
              var list = d.list.map(function (it) {
                return {
                  row_id: it.row_id || '',
                  plu_id: it.plu_id,
                  prize_name: it.prize_name || '',
                  tags: it.tags != null ? String(it.tags) : '0',
                  prizeImg: cjimgDay + it.plu_id + '.png?t=' + Date.now()
                };
              });
              e.setData({
                prizeLoaded: true,
                prizeList: list,
                memberCard: d.vip_code || e.data.memberCard
              });
            } else {
              e.setData({ prizeLoaded: true, prizeList: [] });
            }
          },
          fail: function () {}
        });
      },
      fail: function () {}
    });
  },

  // 关闭二维码弹窗（轮询继续，核销成功仍会自动刷新）
  onCloseQrcode: function () {
    this.setData({ showQrcode: false });
  },

  // 关闭提示弹窗
  onCloseModal: function () {
    this.setData({ showModal: false, modalMsg: '' });
  }
})
