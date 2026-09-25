const app = getApp();
const API_BIND = 'https://widesky.work/HKback/qywxbind.ashx'; // 新绑定接口（微信/企微双通道）
const bg = 'https://widesky.work/HKback/images/cjbg_day.jpg';
const cjimgDay = 'https://widesky.work/HKback/cjimages_day/'; // 中秋抽奖奖品图目录（区别于原版 cjimages）
//计数器
var interval = null;
//值越大旋转时间越长 即旋转速度
var intime = 50;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    bg: bg,   // 背景图（注入 data，wxml {{bg}} 绑定，换图只改顶部 const）
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    //8张奖品图片（位置0-7），图片文件名与礼物表 acj_plu 的 PLU_ID 相同（0.png=PLU0苹果 ... 7.png=PLU7二百券）
    images: [cjimgDay + '0.png?v=2', cjimgDay + '1.png?v=2', cjimgDay + '2.png?v=2', cjimgDay + '3.png?v=2', cjimgDay + '4.png?v=2', cjimgDay + '5.png?v=2', cjimgDay + '6.png?v=2', cjimgDay + '7.png?v=2'],

    btnconfirm: '/images/dianjichoujiang.png',
    clickLuck: 'clickLuck',
    luckPosition: 0,
    counts: 0,
    drawn: false,
    //中奖结果弹窗
    showWin: false,
    prizeName: '',
    //中奖飞入动画
    showFly: false,
    flyImg: '',
    //温馨提醒卡片（领奖方式提示）
    showNotice: false,
    noticeReady: false,
    //通用美化提示弹窗
    showTip: false,
    tipTitle: '提示',
    tipContent: '',
    //核验抽奖资格加载弹窗
    showChecking: false,
    //烟花粒子（飞散方向/颜色/延迟）
    sparks: [{
        x: '-280rpx',
        y: '-300rpx',
        c: '#ffd95e',
        d: '0.75s'
      },
      {
        x: '280rpx',
        y: '-300rpx',
        c: '#ff5a5f',
        d: '0.8s'
      },
      {
        x: '-320rpx',
        y: '-100rpx',
        c: '#b06cff',
        d: '0.85s'
      },
      {
        x: '320rpx',
        y: '-100rpx',
        c: '#ffd95e',
        d: '0.78s'
      },
      {
        x: '-280rpx',
        y: '120rpx',
        c: '#ff5a5f',
        d: '0.82s'
      },
      {
        x: '280rpx',
        y: '120rpx',
        c: '#b06cff',
        d: '0.76s'
      },
      {
        x: '-160rpx',
        y: '-340rpx',
        c: '#b06cff',
        d: '0.88s'
      },
      {
        x: '160rpx',
        y: '-340rpx',
        c: '#ffd95e',
        d: '0.8s'
      },
      {
        x: '-160rpx',
        y: '260rpx',
        c: '#ffd95e',
        d: '0.84s'
      },
      {
        x: '160rpx',
        y: '260rpx',
        c: '#ff5a5f',
        d: '0.79s'
      },
      {
        x: '0rpx',
        y: '-360rpx',
        c: '#ff5a5f',
        d: '0.83s'
      },
      {
        x: '0rpx',
        y: '300rpx',
        c: '#b06cff',
        d: '0.77s'
      },
      {
        x: '-340rpx',
        y: '-220rpx',
        c: '#ff5a5f',
        d: '0.81s'
      },
      {
        x: '340rpx',
        y: '-220rpx',
        c: '#b06cff',
        d: '0.86s'
      },
      {
        x: '-340rpx',
        y: '40rpx',
        c: '#ffd95e',
        d: '0.74s'
      },
      {
        x: '340rpx',
        y: '40rpx',
        c: '#ff5a5f',
        d: '0.87s'
      },
      {
        x: '-80rpx',
        y: '-380rpx',
        c: '#ffd95e',
        d: '0.9s'
      },
      {
        x: '80rpx',
        y: '340rpx',
        c: '#b06cff',
        d: '0.73s'
      }
    ],
    //彩带纸屑：从屏幕顶部纷纷落下（左偏移/颜色/延迟/宽高错落）
    confettis: [{
        l: '3%',
        c: '#ff5a5f',
        d: '0.1s',
        w: '16rpx',
        h: '30rpx'
      },
      {
        l: '9%',
        c: '#ffd95e',
        d: '0.5s',
        w: '12rpx',
        h: '22rpx'
      },
      {
        l: '15%',
        c: '#b06cff',
        d: '0.3s',
        w: '20rpx',
        h: '34rpx'
      },
      {
        l: '21%',
        c: '#ff5a5f',
        d: '0.7s',
        w: '14rpx',
        h: '26rpx'
      },
      {
        l: '27%',
        c: '#ffd95e',
        d: '0.2s',
        w: '18rpx',
        h: '32rpx'
      },
      {
        l: '33%',
        c: '#b06cff',
        d: '0.9s',
        w: '12rpx',
        h: '24rpx'
      },
      {
        l: '39%',
        c: '#ff5a5f',
        d: '0.4s',
        w: '16rpx',
        h: '28rpx'
      },
      {
        l: '45%',
        c: '#ffd95e',
        d: '1.1s',
        w: '14rpx',
        h: '30rpx'
      },
      {
        l: '51%',
        c: '#b06cff',
        d: '0.6s',
        w: '20rpx',
        h: '26rpx'
      },
      {
        l: '57%',
        c: '#ff5a5f',
        d: '0.15s',
        w: '12rpx',
        h: '22rpx'
      },
      {
        l: '63%',
        c: '#ffd95e',
        d: '0.8s',
        w: '18rpx',
        h: '34rpx'
      },
      {
        l: '69%',
        c: '#b06cff',
        d: '0.35s',
        w: '14rpx',
        h: '26rpx'
      },
      {
        l: '75%',
        c: '#ff5a5f',
        d: '1.0s',
        w: '16rpx',
        h: '30rpx'
      },
      {
        l: '81%',
        c: '#ffd95e',
        d: '0.25s',
        w: '12rpx',
        h: '24rpx'
      },
      {
        l: '87%',
        c: '#b06cff',
        d: '0.65s',
        w: '18rpx',
        h: '28rpx'
      },
      {
        l: '93%',
        c: '#ff5a5f',
        d: '0.45s',
        w: '14rpx',
        h: '32rpx'
      },
      {
        l: '97%',
        c: '#ffd95e',
        d: '0.85s',
        w: '16rpx',
        h: '26rpx'
      },
      {
        l: '12%',
        c: '#ffd95e',
        d: '1.2s',
        w: '14rpx',
        h: '28rpx'
      },
      {
        l: '52%',
        c: '#ffd95e',
        d: '0.95s',
        w: '16rpx',
        h: '24rpx'
      },
      {
        l: '78%',
        c: '#ff5a5f',
        d: '1.3s',
        w: '12rpx',
        h: '30rpx'
      }
    ],
    //会员卡号输入弹窗
    showCardInput: false,
    member_card: '',
    //订阅号原始ID（gh_开头），用于中奖后打开订阅号资料页，上线前替换
    ghId: 'gh_9e94bc24ff17',
    staff: '',
    ext: '',
    openid: '',
    unionid: '',
    userid: '',
    env: '', // wxwork=企业微信环境  wx=微信环境
    bindState: 'pending', // pending | success | fail
    //中秋抽奖：消费次数（单笔满额获抽奖机会，最多3次）
    totalChances: 0,    // 该会员可抽总次数（后端 wx_cj_lottery_times 计算）
    remainChances: 0    // 剩余可抽次数（总次数 - 已抽次数）
  },

  onLoad: function (options) {
    // 禁止分享/转发（隐藏右上角"发送给朋友"和"分享到朋友圈"）
    if (wx.hideShareMenu) {
      wx.hideShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      });
    }
    //奖品图链接加时间戳：防 CDN/微信缓存，服务器换图即时生效
    var imgT = Date.now();
    var imgs = [];
    for (var i = 0; i < this.data.images.length; i++) {
      imgs.push(this.data.images[i] + '?t=' + imgT);
    }
    this.setData({
      images: imgs
    });
    //加载九宫格有效奖品：超量奖品自动显示备选图
    this.loadPrizes();
    this.loadAnimation();
    // 欢迎语小程序卡片跳转进入，staff=员工ID，ext=客户ID
    const staff = this.safeDecode(options.staff);
    const ext = this.safeDecode(options.ext);
    console.warn(staff, ext)
    this.setData({
      staff,
      ext
    });

    // 无论是否带 staff/ext 都执行登录：
    // 带参数（企微欢迎语卡片）：换取身份并回填绑定关系
    // 无参数（扫码/直接打开）：也换取 openid/unionid 用于资格核验与防重，后端空 ext 不写库
    this.bindUser();

  },

  // 页面显示时重置停止标志（返回页面恢复动画）
  onShow: function () {
    this._stopped = false;
  },

  // 页面隐藏时清理定时器，避免跳转公众号/其他页时定时器仍在跑导致闪退
  onHide: function () {
    this._stopped = true;
    clearInterval(interval);
  },

  // 页面卸载时清理定时器
  onUnload: function () {
    this._stopped = true;
    clearInterval(interval);
  },

  // 参数可能已被企微自动解码，二次 decode 需防重复解码报错
  safeDecode(val) {
    if (!val) return '';
    try {
      return decodeURIComponent(val);
    } catch (e) {
      return val;
    }
  },

  bindUser() {
    const {
      staff,
      ext
    } = this.data;

    // 企微环境用 wx.qy.login 拿企微 code；普通微信环境才用 wx.login
    const isQy = !!(wx.qy && wx.qy.login);
    const login = isQy ? wx.qy.login : wx.login;
    // 记录环境，供后续核验传参
    this.setData({ env: isQy ? 'wxwork' : 'wx' });

    login({
      success: (res) => {
        if (!res.code) {
          this.setData({
            bindState: 'fail'
          });
          return;
        }
        wx.request({
          url: API_BIND,
          data: {
            code: res.code,
            staff,
            ext,
            loginType: isQy ? 'qy' : 'wx'
          },
          success: (resp) => {
            const d = resp.data || {};
            if (d.errcode === 0) {
              // 企微环境拿到 userid = 本企业员工，直接拦截
              if (isQy && d.userid) {
                this.setData({
                  bindState: 'fail',
                  userid: d.userid || ''
                });
                this.showTipModal('提示', '企业员工不能参与抽奖喔');
                return;
              }
              this.setData({
                bindState: 'success',
                openid: d.openid || '',
                unionid: d.unionid || '',
                userid: d.userid || ''
              });
              console.warn(d);
            } else {
              this.setData({
                bindState: 'fail'
              });
              console.warn(d);
            }
          },
          fail: () => this.setData({
            bindState: 'fail'
          })
        });
      },
      fail: () => this.setData({
        bindState: 'fail'
      })
    });
  },

  // ===== 新增：重新获取 code（code 一次性，用完作废，需重新 login）=====
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

  // ===== 新增：统一核验请求（员工/客户核验 + 会员查询，一次完成）=====
  // cb(d)：d 为后端返回；errcode=-9 员工 / -10 客户校验失败
  reqCheck(extraData, cb) {
    const e = this;
    this.getCode((code) => {
      const data = {
        code: code || '',
        env: e.data.env,
        unionid: e.data.unionid,
        cj_openid: e.data.openid
      };
      // 合并额外参数（如 vip_code）
      for (let k in (extraData || {})) data[k] = extraData[k];
      wx.request({
        url: app.globalData.api + 'wx_draw_day.ashx',
        data: data,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: (res) => cb(res.data),
        fail: () => cb(null)
      });
    });
  },

  //点击抽奖按钮：先显示核验进度条，再核验（员工/客户）+预检是否已参与，通过后弹卡号输入
  clickLuck: function () {
    var e = this;
    // 员工拦截前置：企微环境已确认 userid（员工）直接拒绝，不再请求
    if (e.data.userid) {
      e.showTipModal('提示', '企业员工不能参与抽奖');
      return;
    }
    //显示核验进度条（至少500ms，保证客户感知核验过程）
    e.setData({
      showChecking: true
    });
    var checkStart = Date.now();
    e.reqCheck({}, function (d) {
      var delay = Math.max(0, 500 - (Date.now() - checkStart));
      setTimeout(function () {
        e.setData({
          showChecking: false
        });
        // 身份换取异常（-8）
        if (d && d.errcode === -8) {
          e.showTipModal('提示', d.errmsg || '身份校验异常，请稍后重试');
          return;
        }
        // 员工拦截
        if (d && d.errcode === -9) {
          e.showTipModal('提示', d.errmsg || '企业员工不能参与抽奖');
          return;
        }
        // 客户核验失败（没加企微/已删企微）
        if (d && d.errcode === -10) {
          e.showTipModal('提示', d.errmsg || '无法参与抽奖');
          return;
        }
        // 核验通过，弹卡号输入
        e.openCardInput();
      }, delay);
    });
  },

  //加载九宫格奖品列表：超量奖品自动显示备选图（后端校验限量并替换）
  loadPrizes: function () {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_cj_prizes_day.ashx',
      dataType: 'json',
      success: function (res) {
        var list = res.data || [];
        if (list.length !== 8) return;   // 数据异常保持默认图
        var t = Date.now();
        var imgs = [];
        for (var i = 0; i < 8; i++) {
          imgs.push(cjimgDay + list[i].plu_id + '.png?t=' + t);
        }
        e.setData({
          images: imgs
        });
      }
      // fail 静默：保持默认图（时间戳版）
    });
  },

  //弹出会员卡号输入界面（预填已保存卡号）
  openCardInput: function () {
    this.setData({
      showCardInput: true,
      inputCard: wx.getStorageSync('member_card') || this.data.member_card || ''
    });
  },

  //会员卡号输入
  onCardInput: function (e) {
    // 会员卡号自动转大写（后端也做了 ToUpper，这里同步保证输入显示与提交一致）
    this.setData({
      member_card: String(e.detail.value || '').toUpperCase()
    });
  },
  //关闭卡号弹窗
  closeCardInput: function () {
    this.setData({
      showCardInput: false
    });
  },
  //确认卡号并开始抽奖
  confirmCard: function () {
    var card = String(this.data.member_card || '').trim().toUpperCase();
    if (!card) {
      wx.showToast({
        title: '请输入会员卡号',
        icon: 'none'
      });
      return;
    }
    wx.setStorageSync('member_card', card);
    this.setData({
      showCardInput: false,
      member_card: card
    });

    var e = this;
    //显示核验进度条（至少500ms，卡号核验期间展示）
    e.setData({
      showChecking: true
    });
    var checkStart = Date.now();
    // 带核验 + 卡号校验
    e.reqCheck({ vip_code: card }, function (d) {
      var delay = Math.max(0, 500 - (Date.now() - checkStart));
      setTimeout(function () {
        e.setData({
          showChecking: false
        });
        // 身份换取异常（-8）
        if (d && d.errcode === -8) {
          e.showTipModal('提示', d.errmsg || '身份校验异常，请稍后重试');
          return;
        }
        // 员工拦截
        if (d && d.errcode === -9) {
          e.showTipModal('提示', d.errmsg || '企业员工不能参与抽奖');
          return;
        }
        // 客户核验失败
        if (d && d.errcode === -10) {
          e.showTipModal('提示', d.errmsg || '无法参与抽奖');
          return;
        }
        // 卡号不存在（-5）：清空输入框并保持输入界面
        if (d && d.errcode === -5) {
          wx.removeStorageSync('member_card');
          e.setData({
            showCardInput: true,
            inputCard: '',
            member_card: ''
          });
          e.showTipModal('提示', d.errmsg || '您输入的会员卡号不存在，请您检查后再输入');
          return;
        }
        // 卡号有效：查询会员卡积分，积分为0则拦截
        e.checkBonus(card);
      }, delay);
    });
  },

  // 查询会员卡积分（wx_vipjf.ashx，返回字段 bonus）：积分为0时拦截，禁止参与抽奖
  checkBonus: function (card) {
    var e = this;
    e.setData({
      showChecking: true
    });
    wx.request({
      url: app.globalData.api + 'wx_vipjf.ashx',
      data: {
        vipcode: card
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        e.setData({
          showChecking: false
        });
        // 接口返回数据集（数组），取第一条记录
        var rows = res.data;
        var row = null;
        if (Array.isArray(rows) && rows.length > 0) {
          row = rows[0];
        } else if (rows && typeof rows === 'object' && !Array.isArray(rows)) {
          row = rows;
        }
        // 积分字段为 BONUS（DataTable 序列化列名）
        var bonus = (row && row.BONUS);
        // 数据集不存在 或 行数为0 或 bonus<=0 → 积分不足，拦截抽奖
        if (!row || (Array.isArray(rows) && rows.length === 0) || parseFloat(bonus) <= 0 || isNaN(parseFloat(bonus))) {
          e.showTipModal('提示', '积分为零，暂不能参与抽奖喔');
          return;
        }
        // 积分正常：继续查询中秋抽奖消费次数（新增规则）
        e.queryChances(card);
      },
      fail: function () {
        // 查询失败不阻断抽奖（后端抽奖时仍会兜底校验），但此处按拦截提示更稳妥
        e.setData({
          showChecking: false
        });
        e.queryChances(card);
      }
    });
  },

  // 查询中秋抽奖消费次数（调用后端，后端执行 espos.wx_cj_lottery_times 存储过程）
  // 规则：单笔消费实付满1000/2000/3000元 -> 1/2/3次，多笔累加封顶3次
  // 后端返回：total_chances 总次数 / used_chances 已抽次数 / remain_chances 剩余次数
  queryChances: function (card) {
    var e = this;
    e.setData({
      showChecking: true
    });
    wx.request({
      url: app.globalData.api + 'wx_cj_chances.ashx',
      data: {
        vipcode: card
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        e.setData({
          showChecking: false
        });
        var d = res.data || {};
        // 后端返回 errcode===0 表示查询成功
        if (d.errcode === 0) {
          var total = parseInt(d.total_chances, 10) || 0;
          var remain = parseInt(d.remain_chances, 10);
          if (isNaN(remain)) remain = total;
          e.setData({
            totalChances: total,
            remainChances: remain
          });
          // 剩余次数为0：区分"未达消费门槛"和"次数用完"
          if (remain <= 0) {
            if (total > 0) {
              // 有总次数但已用完
              e.showTipModal('提示', '您的抽奖次数已经用完，谢谢参与！');
            } else {
              // 未达消费门槛（单笔消费满1000元才有次数）
              e.showTipModal('提示', '单笔消费满1000元，才能参与中秋抽奖喔');
            }
            return;
          }
          // 有剩余次数：继续抽奖
          e.doDraw();
        } else {
          // 查询失败：按0次处理并拦截（保守，避免绕过门槛）
          e.setData({
            totalChances: 0,
            remainChances: 0
          });
          e.showTipModal('提示', d.errmsg || '单笔消费满1000元，才能参与中秋抽奖喔');
        }
      },
      fail: function () {
        e.setData({
          showChecking: false,
          totalChances: 0,
          remainChances: 0
        });
        e.showTipModal('提示', '网络异常，请稍后重试');
      }
    });
  },

  //异常响应上报：把抽奖接口异常时的原始响应片段发后端留痕（fire-and-forget，不阻断主流程）
  //用途：定位网关/WAF/IIS错误页等中间层返回的内容，避免再次出现"假中奖"无从查证
  //scene: bad_response=响应非预期JSON / bad_position=中奖位置非法 / request_fail=请求失败(超时/断网)
  reportDrawError: function (scene, res) {
    var raw = '';
    try {
      var rd = (res && res.data !== undefined) ? res.data : res;
      raw = (typeof rd === 'object') ? JSON.stringify(rd) : String(rd);
    } catch (err) {
      raw = 'parse_error';
    }
    if (raw.length > 500) raw = raw.substring(0, 500);   //截断，防超长上传
    wx.request({
      url: app.globalData.api + 'wx_cj_err_report.ashx',
      method: 'POST',
      data: {
        scene: scene || '',
        vip_code: this.data.member_card || '',
        env: this.data.env || '',
        status: (res && res.statusCode) || 0,
        raw: raw
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      fail: function () { }   //上报失败静默
    });
  },

  //执行抽奖：结果由后端决定，前端只播动画
  doDraw: function () {
    var e = this;

    //设置按钮不可点击（不更换图片，仅禁用点击）
    e.setData({
      clickLuck: ''
    })
    clearInterval(interval);

    //重新登录取新 code：openid/unionid 由后端兑换（防伪造），再执行抽奖
    e.getCode(function (code) {
      //请求后端执行抽奖（次数校验 + 百分百中奖逻辑 + 写抽奖记录）
      wx.request({
        url: app.globalData.api + 'wx_cj_draw_day.ashx',
        data: {
          code: code || '',
          env: e.data.env,
          vip_code: e.data.member_card,
          staff: e.data.staff
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        timeout: 10000,   // 10秒超时，避免后端卡住时一直打转
        success: function (res) {
          var d = res.data || {};

          //卡号不存在（-5）
          if (d.errcode === -5) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '会员卡号不存在或输入错误');
            return;
          }

          //操作太频繁（-7）：频率限制拦截
          if (d.errcode === -7) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '操作太频繁，请稍后再试');
            return;
          }

          //抽奖次数已用完（-11）：中秋抽奖新增，活动期间最多3次
          if (d.errcode === -11) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '您的抽奖次数已经用完，谢谢参与！');
            return;
          }

          //企业员工（-9）：后端兜底拦截
          if (d.errcode === -9) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '企业员工不能参与抽奖');
            return;
          }

          //客户核验失败（-10）：没加企微/已删企微，后端兜底拦截
          if (d.errcode === -10) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '无法参与抽奖');
            return;
          }

          //会员积分不足（-12）：后端兜底拦截
          if (d.errcode === -12) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '积分为零，暂不能参与抽奖喔');
            return;
          }

          //其他错误统一拦截（-1缺code/-2缺卡号/-8系统繁忙等）：防止错误响应误入中奖动画
          if (d && d.errcode && d.errcode !== 0) {
            e.recoverBtn();
            e.showTipModal('提示', d.errmsg || '系统繁忙，请稍后重试');
            return;
          }

          //响应异常（非JSON/被网关或WAF拦截/errcode缺失/未返回中奖位置）一律按失败处理
          //严格校验：仅 errcode===0 且返回有效 position 才播中奖动画，防止错误响应被误判为中奖
          if (!d || typeof d !== 'object' || d.errcode !== 0 || d.position === undefined || d.position === null || d.position === '') {
            e.reportDrawError('bad_response', res);   //留痕：记录中间层返回的原始内容
            e.recoverBtn();
            e.showTipModal('提示', '抽奖结果获取异常，请稍后重试');
            return;
          }

        //后端返回中奖结果，前端只播动画
        var luckPosition = parseInt(d.position);
        if (isNaN(luckPosition) || luckPosition < 0 || luckPosition > 7) {
          //中奖位置非法视为响应异常，不兜底播放动画（原兜底位置5会造成"假中奖"）
          e.reportDrawError('bad_position', res);
          e.recoverBtn();
          e.showTipModal('提示', '抽奖结果异常，请稍后重试');
          return;
        }
        console.warn(luckPosition)
        e.setData({
          luckPosition: luckPosition,
          counts: 0,
          drawn: true,
          prizeName: d.prize_name || '',
          // 抽奖成功：扣减一次剩余次数（后端为准，此处仅本地展示递减）
          remainChances: Math.max(0, e.data.remainChances - 1)
        })

        //启动跑马灯
        var index = 0;
        interval = setInterval(function () {
          // 页面已隐藏/卸载，停止跑马灯
          if (e._stopped) {
            clearInterval(interval);
            return;
          }
          if (index > 7) {
            index = 0;
            e.data.color[7] = 0.5
          } else if (index != 0) {
            e.data.color[index - 1] = 0.5
          }
          e.data.color[index] = 1
          e.setData({
            color: e.data.color
          })
          index++;
        }, intime);

        //两秒后减速停在中奖位置
        setTimeout(function () {
          if (e._stopped) return;
          e.stop(e.data.luckPosition);
        }, 2000)
      },
      fail: function (res) {
        e.reportDrawError('request_fail', res);   //留痕：超时/断网等请求失败原因(errMsg)
        e.recoverBtn();
        clearInterval(interval);
        wx.showToast({
          title: '网络异常，请重试',
          icon: 'none'
        });
      }
      })
    });
  },

  stop: function (which) {
    var e = this;
    clearInterval(interval);
    var current = -1;
    var color = e.data.color;
    for (var i = 0; i < color.length; i++) {
      if (color[i] == 1) {
        current = i;
      }
    }
    var index = current + 1;
    e.stopLuck(which, index, intime, 10);
  },

  /**
   * which:中奖位置 index:当前位置 time:时间标记 splittime:每次增加的时间
   */
  stopLuck: function (which, index, time, splittime) {
    var e = this;
    var color = e.data.color;
    setTimeout(function () {
      // 页面已隐藏/卸载，停止递归，避免残留定时器调 setData 导致闪退
      if (e._stopped) return;

      if (index > 7) {
        index = 0;
        color[7] = 0.5
      } else if (index != 0) {
        color[index - 1] = 0.5
      }
      color[index] = 1
      e.setData({
        color: color
      })

      if (time < 400 || index != which) {
        splittime++;
        time += splittime;
        index++;
        e.stopLuck(which, index, time, splittime);
      } else {
        //1秒后展示结果：先播中奖飞入动画，再展示中奖弹窗
        setTimeout(function () {
          // 页面已隐藏/卸载，不再展示动画和震动
          if (e._stopped) return;

          //奖品图从顶部飞入屏幕中央（取中奖格的奖品图）
          e.setData({
            showFly: true,
            flyImg: e.data.images[e.data.luckPosition]
          });
          //手机震动（真机生效，提升中奖体感）
          if (wx.vibrateShort) {
            setTimeout(function () {
              if (!e._stopped) wx.vibrateShort({ type: 'medium' });
            }, 800);
            setTimeout(function () {
              if (!e._stopped) wx.vibrateShort({ type: 'light' });
            }, 1250);
            setTimeout(function () {
              if (!e._stopped) wx.vibrateShort({ type: 'light' });
            }, 2000);
          }
          //动画结束后奖品停留屏幕中央，点击遮罩关闭（不再自动弹中奖窗）
        }, 1000);
      }
    }, time);
  },

  //恢复按钮状态（不更换图片，仅恢复点击）
  recoverBtn: function () {
    this.setData({
      clickLuck: 'clickLuck'
    })
  },

  //关闭中奖动画（奖品停留屏幕中央，点击遮罩关闭）
  closeFly: function () {
    this.setData({
      showFly: false
    });
    this.recoverBtn();
    this.loadAnimation();
  },

  //打开订阅号资料页（纯运营引导，失败静默不阻断任何流程）
  //先弹出领奖方式卡片（无文字），公众号确认弹窗交互完成后再显示文字
  openOfficial: function () {
    // 跳转前先停掉所有动画定时器，避免跳转公众号时定时器仍在跑导致闪退
    clearInterval(interval);
    this.setData({
      showNotice: true,
      noticeReady: false
    });
    wx.openOfficialAccountProfile({
      username: this.data.ghId,
      fail: () => {
        // 跳转失败：直接展示领奖方式，不阻断
        this.setData({ noticeReady: true });
      },
      complete: () => {
        this.setData({
          noticeReady: true
        });
      }
    })
  },

  //关闭温馨提醒卡片
  closeNotice: function () {
    this.setData({
      showNotice: false,
      noticeReady: false
    });
  },

  //通用美化提示弹窗（替代 wx.showModal，样式与领奖方式卡片统一）
  showTipModal: function (title, content) {
    this.setData({
      showTip: true,
      tipTitle: title,
      tipContent: content
    });
  },
  closeTip: function () {
    this.setData({
      showTip: false
    });
  },

  //前往我的奖品页
  goPrize: function () {
    wx.navigateTo({
      url: '/pages/pscar/index/index'
    })
  },

  //关闭中奖弹窗
  closeWin: function () {
    this.setData({
      showWin: false
    });
    this.recoverBtn();
    this.loadAnimation();
  },

  //进入页面时缓慢切换
  loadAnimation: function () {
    var e = this;
    clearInterval(interval);
    var index = 0;
    interval = setInterval(function () {
      // 页面已隐藏/卸载，停止动画
      if (e._stopped) {
        clearInterval(interval);
        return;
      }
      if (index > 7) {
        index = 0;
        e.data.color[7] = 0.5
      } else if (index != 0) {
        e.data.color[index - 1] = 0.5
      }
      e.data.color[index] = 1
      e.setData({
        color: e.data.color
      })
      index++;
    }, 1000);
  }
})
