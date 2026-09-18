const app = getApp();
const bg = 'https://widesky.work/HKback/images/cjbg.png';
//计数器
var interval = null;
//值越大旋转时间越长 即旋转速度
var intime = 50;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    bg: bg,
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    images: [app.globalData.cjimg + '0.png', app.globalData.cjimg + '1.png', app.globalData.cjimg + '2.png', app.globalData.cjimg + '3.png', app.globalData.cjimg + '4.png', app.globalData.cjimg + '5.png', app.globalData.cjimg + '6.png', app.globalData.cjimg + '7.png'],
    btnconfirm: '/images/dianjichoujiang.png',
    clickLuck: 'clickLuck',
    luckPosition: 0,
    drawn: false,
    prizeName: '',
    //中奖飞入动画
    showFly: false,
    flyImg: '',
    //温馨提醒卡片（领奖方式提示）
    showNotice: false,
    noticeReady: false,
    //通用提示弹窗
    showTip: false,
    tipTitle: '提示',
    tipContent: '',
    env: '', // wxwork=企业微信环境  wx=微信环境
    token: '', // 一次性抽奖凭证（来自二维码 scene）
    //订阅号原始ID（gh_开头），中奖后打开订阅号资料页
    ghId: 'gh_9e94bc24ff17',
    //烟花粒子（飞散方向/颜色/延迟）
    sparks: [{ x: '-280rpx', y: '-300rpx', c: '#ffd95e', d: '0.75s' }, { x: '280rpx', y: '-300rpx', c: '#ff5a5f', d: '0.8s' }, { x: '-320rpx', y: '-100rpx', c: '#b06cff', d: '0.85s' }, { x: '320rpx', y: '-100rpx', c: '#ffd95e', d: '0.78s' }, { x: '-280rpx', y: '120rpx', c: '#ff5a5f', d: '0.82s' }, { x: '280rpx', y: '120rpx', c: '#b06cff', d: '0.76s' }, { x: '-160rpx', y: '-340rpx', c: '#b06cff', d: '0.88s' }, { x: '160rpx', y: '-340rpx', c: '#ffd95e', d: '0.8s' }, { x: '-160rpx', y: '260rpx', c: '#ffd95e', d: '0.84s' }, { x: '160rpx', y: '260rpx', c: '#ff5a5f', d: '0.79s' }, { x: '0rpx', y: '-360rpx', c: '#ff5a5f', d: '0.83s' }, { x: '0rpx', y: '300rpx', c: '#b06cff', d: '0.77s' }, { x: '-340rpx', y: '-220rpx', c: '#ff5a5f', d: '0.81s' }, { x: '340rpx', y: '-220rpx', c: '#b06cff', d: '0.86s' }, { x: '-340rpx', y: '40rpx', c: '#ffd95e', d: '0.74s' }, { x: '340rpx', y: '40rpx', c: '#ff5a5f', d: '0.87s' }, { x: '-80rpx', y: '-380rpx', c: '#ffd95e', d: '0.9s' }, { x: '80rpx', y: '340rpx', c: '#b06cff', d: '0.73s' }],
    //彩带纸屑
    confettis: [{ l: '3%', c: '#ff5a5f', d: '0.1s', w: '16rpx', h: '30rpx' }, { l: '9%', c: '#ffd95e', d: '0.5s', w: '12rpx', h: '22rpx' }, { l: '15%', c: '#b06cff', d: '0.3s', w: '20rpx', h: '34rpx' }, { l: '21%', c: '#ff5a5f', d: '0.7s', w: '14rpx', h: '26rpx' }, { l: '27%', c: '#ffd95e', d: '0.2s', w: '18rpx', h: '32rpx' }, { l: '33%', c: '#b06cff', d: '0.9s', w: '12rpx', h: '24rpx' }, { l: '39%', c: '#ff5a5f', d: '0.4s', w: '16rpx', h: '28rpx' }, { l: '45%', c: '#ffd95e', d: '1.1s', w: '14rpx', h: '30rpx' }, { l: '51%', c: '#b06cff', d: '0.6s', w: '20rpx', h: '26rpx' }, { l: '57%', c: '#ff5a5f', d: '0.15s', w: '12rpx', h: '22rpx' }, { l: '63%', c: '#ffd95e', d: '0.8s', w: '18rpx', h: '34rpx' }, { l: '69%', c: '#b06cff', d: '0.35s', w: '14rpx', h: '26rpx' }, { l: '75%', c: '#ff5a5f', d: '1.0s', w: '16rpx', h: '30rpx' }, { l: '81%', c: '#ffd95e', d: '0.25s', w: '12rpx', h: '24rpx' }, { l: '87%', c: '#b06cff', d: '0.65s', w: '18rpx', h: '28rpx' }, { l: '93%', c: '#ff5a5f', d: '0.45s', w: '14rpx', h: '32rpx' }, { l: '97%', c: '#ffd95e', d: '0.85s', w: '16rpx', h: '26rpx' }]
  },

  onLoad: function (options) {
    if (wx.hideShareMenu) {
      wx.hideShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      });
    }
    //奖品图加时间戳
    var imgT = Date.now();
    var imgs = [];
    for (var i = 0; i < this.data.images.length; i++) {
      imgs.push(this.data.images[i] + '?t=' + imgT);
    }
    this.setData({ images: imgs });

    // 判断环境
    const isQy = !!(wx.qy && wx.qy.login);
    this.setData({ env: isQy ? 'wxwork' : 'wx' });

    // 从二维码 scene 读取 token（小程序码 scene=token）
    var token = '';
    if (options.scene) {
      token = decodeURIComponent(options.scene);
    } else if (options.token) {
      token = options.token;
    }
    this.setData({ token: token });

    this.loadPrizes();
    this.loadAnimation();
  },

  onHide: function () {
    this._stopped = true;
    clearInterval(interval);
  },

  onUnload: function () {
    this._stopped = true;
    clearInterval(interval);
  },

  onShow: function () {
    this._stopped = false;
  },

  // 重新获取 code（code 一次性）
  getCode(cb) {
    const isQy = !!(wx.qy && wx.qy.login);
    const login = isQy ? wx.qy.login : wx.login;
    login({
      success: (res) => {
        if (!res.code) { cb(null); return; }
        cb(res.code);
      },
      fail: () => cb(null)
    });
  },

  // 点击抽奖：直接执行（无卡号输入，卡号由 token 决定）
  clickLuck: function () {
    if (!this.data.token) {
      this.showTipModal('提示', '抽奖凭证无效，请联系员工重新获取');
      return;
    }
    this.doDraw();
  },

  // 加载九宫格奖品列表
  loadPrizes: function () {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_cj_prizes.ashx',
      dataType: 'json',
      success: function (res) {
        var list = res.data || [];
        if (list.length !== 8) return;
        var t = Date.now();
        var imgs = [];
        for (var i = 0; i < 8; i++) {
          imgs.push(app.globalData.cjimg + list[i].plu_id + '.png?t=' + t);
        }
        e.setData({ images: imgs });
      }
    });
  },

  // 执行抽奖：调 wx_cj_draw_token.ashx（后端校验 token + 卡号 + 查重 + 中奖 + 作废 token）
  doDraw: function () {
    var e = this;
    e.setData({ clickLuck: '' });
    clearInterval(interval);

    e.getCode(function (code) {
      wx.request({
        url: app.globalData.api + 'wx_cj_draw_token.ashx',
        data: {
          code: code || '',
          env: e.data.env,
          token: e.data.token
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        dataType: 'json',
        timeout: 10000,
        success: function (res) {
          var d = res.data || {};

          if (d.errcode === -3) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '此会员卡号已经参与过抽奖');
            return;
          }
          if (d.errcode === -4) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '很遗憾，本次未中奖');
            return;
          }
          if (d.errcode === -5) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '会员卡号不存在或输入错误');
            return;
          }
          if (d.errcode === -13) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '抽奖凭证无效或已被使用');
            return;
          }
          if (d.errcode && d.errcode !== 0) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '系统繁忙，请稍后重试');
            return;
          }

          // 中奖成功
          var luckPosition = parseInt(d.position);
          if (isNaN(luckPosition) || luckPosition < 0 || luckPosition > 7) {
            luckPosition = 5;
          }
          e.setData({
            luckPosition: luckPosition,
            drawn: true,
            prizeName: d.prize_name || ''
          });

          // 启动跑马灯
          var index = 0;
          interval = setInterval(function () {
            if (e._stopped) { clearInterval(interval); return; }
            if (index > 7) {
              index = 0;
              e.data.color[7] = 0.5;
            } else if (index != 0) {
              e.data.color[index - 1] = 0.5;
            }
            e.data.color[index] = 1;
            e.setData({ color: e.data.color });
            index++;
          }, intime);

          setTimeout(function () {
            if (e._stopped) return;
            e.stop(e.data.luckPosition);
          }, 2000);
        },
        fail: function () {
          e.recoverBtn();
          clearInterval(interval);
          wx.showToast({ title: '网络异常，请重试', icon: 'none' });
        }
      });
    });
  },

  stop: function (which) {
    var e = this;
    clearInterval(interval);
    var current = -1;
    var color = e.data.color;
    for (var i = 0; i < color.length; i++) {
      if (color[i] == 1) current = i;
    }
    var index = current + 1;
    e.stopLuck(which, index, intime, 10);
  },

  stopLuck: function (which, index, time, splittime) {
    var e = this;
    var color = e.data.color;
    setTimeout(function () {
      if (e._stopped) return;
      if (index > 7) {
        index = 0;
        color[7] = 0.5;
      } else if (index != 0) {
        color[index - 1] = 0.5;
      }
      color[index] = 1;
      e.setData({ color: color });

      if (time < 400 || index != which) {
        splittime++;
        time += splittime;
        index++;
        e.stopLuck(which, index, time, splittime);
      } else {
        setTimeout(function () {
          if (e._stopped) return;
          e.setData({
            showFly: true,
            flyImg: e.data.images[e.data.luckPosition]
          });
          if (wx.vibrateShort) {
            setTimeout(function () { if (!e._stopped) wx.vibrateShort({ type: 'medium' }); }, 800);
            setTimeout(function () { if (!e._stopped) wx.vibrateShort({ type: 'light' }); }, 1250);
          }
        }, 1000);
      }
    }, time);
  },

  recoverBtn: function () {
    this.setData({ clickLuck: 'clickLuck' });
  },

  closeFly: function () {
    this.setData({ showFly: false });
    this.recoverBtn();
    this.loadAnimation();
  },

  showTipModal: function (title, content) {
    this.setData({ showTip: true, tipTitle: title, tipContent: content });
  },

  closeTip: function () {
    this.setData({ showTip: false });
  },

  //打开订阅号资料页（纯运营引导，失败静默不阻断任何流程）
  openOfficial: function () {
    clearInterval(interval);
    this.setData({
      showNotice: true,
      noticeReady: false
    });
    wx.openOfficialAccountProfile({
      username: this.data.ghId,
      fail: () => {
        this.setData({ noticeReady: true });
      },
      complete: () => {
        this.setData({ noticeReady: true });
      }
    });
  },

  //关闭温馨提醒卡片
  closeNotice: function () {
    this.setData({
      showNotice: false,
      noticeReady: false
    });
  },

  loadAnimation: function () {
    var e = this;
    clearInterval(interval);
    var index = 0;
    interval = setInterval(function () {
      if (e._stopped) { clearInterval(interval); return; }
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5;
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5;
      }
      e.data.color[index] = 1;
      e.setData({ color: e.data.color });
      index++;
    }, 1000);
  }
});
