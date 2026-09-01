const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    bg: 'https://widesky.work/HKback/images/cgbg.jpg',
    // 查询状态
    prizeLoaded: false,   // 奖品查询完成
    hasPrize: false,      // 有待领取奖品
    received: false,      // 领取完成（员工已核销）
    emptyMsg: '',         // 无奖品提示文案（后端返回）
    // 中奖信息
    pluId: -1,
    prizeName: '',
    prizeImg: '',
    // 会员信息
    vipcode: '',          // 会员卡号（二维码接口返回，轮询核销状态用）
    memberCard: '',       // 会员卡号（展示用）
    vipName: '',          // 会员姓名
    vipLevel: '',         // 会员等级
    // 核销成功展示（员工信息）
    staffName: '',
    shopNo: '',
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

  // 查询中奖奖品：code 换 openid/unionid → 查未领取记录
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
                prizeLoaded: true,
                hasPrize: true,
                pluId: d.plu_id,
                prizeName: d.prize_name || '',
                prizeImg: app.globalData.cjimg + d.plu_id + '.png?t=' + Date.now(),
                memberCard: d.vip_code || wx.getStorageSync('member_card') || ''
              });
            } else {
              e.setData({
                prizeLoaded: true,
                hasPrize: false,
                emptyMsg: d.errmsg || '抱歉，没有查到您的抽奖记录'
              });
            }
          },
          fail: function () {
            e.setData({
              prizeLoaded: true,
              hasPrize: false
            });
          }
        });
      },
      fail: function () {
        e.setData({
          prizeLoaded: true,
          hasPrize: false
        });
      }
    });
  },

  // 客户点击立即领取：先做企微好友核验（核销方式不变：客户微信code + 好友验证）→ 核验成功返回卡号 → 生成带卡号参数的核销二维码
  onReceive: function () {
    var e = this;
    if (e.data.qrcodeLoading) return;
    e.setData({ qrcodeLoading: true });
    wx.login({
      success: function (lres) {
        wx.request({
          url: app.globalData.api + 'wx_cj_receive.ashx',
          data: {
            code: lres.code || ''
          },
          dataType: 'json',
          success: function (res) {
            var d = res.data || {};
            if (d.errcode === 0 && d.vip_code) {
              // 核验通过，拿到会员卡号，生成二维码
              e.setData({ memberCard: d.vip_code });
              e.genQrcode(d.vip_code);
            } else if (d.errcode === -10) {
              // 企微好友核验未通过：弹窗提示，不进入兑奖
              e.setData({
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
              e.setData({ qrcodeLoading: false });
            }
          },
          fail: function () {
            wx.showToast({
              title: '网络异常，请重试',
              icon: 'none'
            });
            e.setData({ qrcodeLoading: false });
          }
        });
      },
      fail: function () {
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
        e.setData({ qrcodeLoading: false });
      }
    });
  },

  // 生成带卡号参数的小程序码（员工扫码在自己手机上输入工号密码核销）
  genQrcode: function (vipcode) {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_cj_qrcode.ashx',
      data: {
        vipcode: vipcode
      },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0 && d.qrcode) {
          e.setData({
            qrcodeImg: d.qrcode,
            vipcode: d.vip_code || vipcode,
            showQrcode: true,
            qrcodeLoading: false
          });
          e.startPoll();   // 轮询核销状态
        } else {
          wx.showToast({
            title: d.errmsg || '二维码生成失败',
            icon: 'none'
          });
          e.setData({ qrcodeLoading: false });
        }
      },
      fail: function () {
        wx.showToast({
          title: '网络异常，请重试',
          icon: 'none'
        });
        e.setData({ qrcodeLoading: false });
      }
    });
  },

  // 轮询核销状态：员工核销成功后本页自动进入"领取成功"界面
  // （即使客户手动关闭二维码弹窗，轮询继续，核销成功仍会自动跳转）
  startPoll: function () {
    var e = this;
    if (e.data.pollTimer) clearInterval(e.data.pollTimer);
    e.data.pollCount = 0; // 轮询计数，超时自动停止，避免无限请求
    e.data.pollTimer = setInterval(function () {
      if (!e.data.vipcode) {
        clearInterval(e.data.pollTimer);
        e.data.pollTimer = null;
        return;
      }
      if (e.data.pollCount >= 200) { // 约 10 分钟（3s × 200）自动停止
        clearInterval(e.data.pollTimer);
        e.data.pollTimer = null;
        return;
      }
      e.data.pollCount++;
      wx.request({
        url: app.globalData.api + 'wx_cj_prizeinfo.ashx',
        data: { vipcode: e.data.vipcode },
        dataType: 'json',
        success: function (res) {
          var d = res.data || {};
          if (d.errcode === 0 && String(d.tags) === '1') {
            clearInterval(e.data.pollTimer);
            e.data.pollTimer = null;
            e.setData({
              showQrcode: false,
              received: true,
              hasPrize: false,
              pluId: d.plu_id,
              prizeName: d.prize_name || e.data.prizeName,
              prizeImg: app.globalData.cjimg + d.plu_id + '.png?t=' + Date.now(),
              memberCard: d.vip_code || e.data.memberCard,
              vipName: d.vip_name || '',
              vipLevel: d.vip_level || '',
              staffName: d.staff_name || '',
              shopNo: d.shop_no || ''
            });
            if (wx.vibrateShort) {
              wx.vibrateShort({ type: 'medium' });
            }
          }
        }
      });
    }, 3000);
  },

  // 关闭二维码弹窗（轮询继续，核销成功仍会自动跳转"领取成功"界面）
  onCloseQrcode: function () {
    var e = this;
    e.setData({ showQrcode: false });
  },

  // 关闭提示弹窗
  onCloseModal: function () {
    this.setData({ showModal: false, modalMsg: '' });
  }
})
