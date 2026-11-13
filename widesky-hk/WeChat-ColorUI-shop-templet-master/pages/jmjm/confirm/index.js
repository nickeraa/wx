// 金银币寄卖 - 客户确认页
// 入口：客户微信扫码（scene=寄卖单号）或直接传 no 参数
// 流程：查单据 → 填写姓名/电话/身份证/地址 → 签署电子合同（跳电子签）→ 轮询签署结果
var app = getApp();

Page({
  data: {
    StatusBar: 20,
    CustomBar: 45,
    orderNo: '',
    loaded: false,
    // 单据信息
    info: null,          // {goods_name,price,qty,img_url,staff_id,create_time,status,...}
    // 客户信息表单
    custName: '',
    custPhone: '',
    custIdcard: '',
    custAddr: '',
    // 收款账户（收取寄卖货款）
    bankUser: '',
    bankName: '',
    bankAcct: '',
    formErr: '',
    signing: false,
    // 轮询
    polling: false,
    pollTimer: null,
    pollCount: 0
  },

  onLoad: function (options) {
    var e = this;
    e.setData({
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar
    });
    // 兼容两种进入方式：直接参数 no / 扫码 scene
    var orderNo = (options.no || '').trim();
    if (!orderNo && options.scene) {
      orderNo = decodeURIComponent(options.scene).trim();
    }
    if (!orderNo) {
      wx.showModal({
        title: '提示',
        content: '缺少寄卖单号，请重新扫码',
        showCancel: false
      });
      return;
    }
    e.setData({ orderNo: orderNo });
    e.loadInfo();
  },

  onShow: function () {
    // 从电子签页返回时恢复轮询
    if (this.data.polling) this.startPoll();
  },

  // 继续签署：跳转腾讯电子签官方小程序（用已生成的签署 path，绑定客户本人）
  continueSign: function () {
    var e = this;
    var path = e.data.info && e.data.info.sign_url;
    if (!path) {
      wx.showToast({ title: '签署链接不存在，请联系店员重新发起', icon: 'none' });
      return;
    }
    e.setData({ polling: true });
    wx.navigateToMiniProgram({
      appId: 'wxa023b292fd19d41d',      // 腾讯电子签（正式版）
      path: path,
      envVersion: 'release',
      fail: function () {
        e.setData({ polling: false });
        wx.showToast({ title: '无法打开电子签小程序，请重试', icon: 'none' });
      }
    });
  },

  onHide: function () {
    this.stopPoll();
  },

  onUnload: function () {
    this.stopPoll();
  },

  // ==================== 查询寄卖单 ====================
  loadInfo: function () {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_jmjm_info.ashx',
      data: { order_no: e.data.orderNo },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          var status = d.status;
          // 兼容：接口未返回明细时用主表汇总字段兜底为一条
          if (!d.goods_items || !d.goods_items.length) {
            d.goods_items = [{
              seq: 1,
              img_url: d.img_url || '',
              imgs: d.img_url ? [d.img_url] : [],
              goods_name: d.goods_name || '',
              price: d.price,
              qty: d.qty
            }];
          }
          // 兼容：明细里没有 imgs 时用 img_url 兜底
          for (var gi = 0; gi < d.goods_items.length; gi++) {
            var g = d.goods_items[gi];
            if (!g.imgs || !g.imgs.length) {
              g.imgs = g.img_url ? [g.img_url] : [];
            }
          }
          e.setData({ info: d, loaded: true,
            bankUser: d.bank_user || '',
            bankName: d.bank_name || '',
            bankAcct: d.bank_account || '' });
          if (status === 1) {
            // 已发起过签署：仍显示填写表单，客户可重新填写提交（提交后重新发起新流程）
            // 不自动进入轮询，避免客户误以为必须等待
          } else if (status === 2) {
            e.stopPoll();
          }
        } else {
          e.setData({ loaded: true, info: null });
          wx.showModal({
            title: '提示',
            content: d.errmsg || '寄卖单查询失败',
            showCancel: false
          });
        }
      },
      fail: function () {
        e.setData({ loaded: true, info: null });
        wx.showModal({
          title: '网络异常',
          content: '请检查网络后重新进入',
          showCancel: false
        });
      }
    });
  },

  // 预览货品多图
  previewImgs: function (ev) {
    var imgs = ev.currentTarget.dataset.imgs || [];
    var cur = ev.currentTarget.dataset.cur || 0;
    if (!imgs.length) return;
    wx.previewImage({ current: imgs[cur], urls: imgs });
  },

  // ==================== 表单输入 ====================
  onName: function (v) { this.setData({ custName: v.detail.value }); },
  onPhone: function (v) { this.setData({ custPhone: v.detail.value }); },
  onIdcard: function (v) { this.setData({ custIdcard: v.detail.value }); },
  onAddr: function (v) { this.setData({ custAddr: v.detail.value }); },
  onBankUser: function (v) { this.setData({ bankUser: v.detail.value }); },
  onBankName: function (v) { this.setData({ bankName: v.detail.value }); },
  onBankAcct: function (v) { this.setData({ bankAcct: v.detail.value.replace(/\D/g, '') }); },

  // ==================== 签署电子合同 ====================

  // 18位身份证号校验：格式 + 出生日期合法（不过去、不早于1900）+ GB11643 校验码
  // 返回空串表示正确，否则返回错误提示文案
  checkIdCard: function (id) {
    id = (id || '').trim().toUpperCase();
    if (!id) return '请填写身份证号';
    if (!/^\d{17}[\dX]$/.test(id)) return '身份证号应为18位（末位可为X）';
    var d = id.substr(6, 8);
    var yy = Number(d.substr(0, 4)), mm = Number(d.substr(4, 2)), dd = Number(d.substr(6, 2));
    if (yy < 1900 || mm < 1 || mm > 12 || dd < 1 || dd > 31) return '身份证号出生日期有误';
    var birth = new Date(yy, mm - 1, dd);
    if (birth.getFullYear() !== yy || birth.getMonth() !== mm - 1 || birth.getDate() !== dd) return '身份证号出生日期有误';
    if (birth.getTime() > Date.now()) return '身份证号出生日期有误';
    var w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var codes = '10X98765432';
    var sum = 0;
    for (var i = 0; i < 17; i++) sum += Number(id.charAt(i)) * w[i];
    if (codes.charAt(sum % 11) !== id.charAt(17)) return '身份证号校验位不符，请核对';
    return '';
  },

  submitSign: function () {
    var e = this;
    if (e.data.signing) return;
    var name = e.data.custName.trim();
    var phone = e.data.custPhone.trim();
    var idcard = e.data.custIdcard.trim();
    var addr = e.data.custAddr.trim();
    var bankUser = e.data.bankUser.trim();
    var bankName = e.data.bankName.trim();
    var bankAcct = e.data.bankAcct.replace(/\s/g, '');

    // 前端校验（失败：提示 + 滚动定位到对应输入栏）
    if (!name) { e.failAt('请填写姓名', '#row-name'); return; }
    if (!/^1\d{10}$/.test(phone)) { e.failAt('请填写正确的11位手机号', '#row-phone'); return; }
    var idErr = e.checkIdCard(idcard);
    if (idErr) { e.failAt(idErr, '#row-idcard'); return; }
    if (!addr) { e.failAt('请填写联系地址', '#row-addr'); return; }
    if (!bankUser) { e.failAt('请填写收款开户人', '#row-bankuser'); return; }
    if (!bankName) { e.failAt('请填写收款开户行', '#row-bankname'); return; }
    if (!/^\d{10,30}$/.test(bankAcct)) { e.failAt('请填写正确的银行卡号', '#row-bankacct'); return; }
    e.setErr('');

    e.setData({ signing: true });
    wx.request({
      url: app.globalData.api + 'wx_jmjm_sign.ashx',
      method: 'POST',
      data: {
        order_no: e.data.orderNo,
        cust_name: name,
        cust_phone: phone,
        cust_idcard: idcard,
        cust_addr: addr,
        bank_user: bankUser,
        bank_name: bankName,
        bank_account: bankAcct
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0 && d.sign_url) {
          // 已保存并生成小程序签署链接：跳转腾讯电子签官方小程序完成签署
          // （电子签 H5 链接不支持小程序 web-view 打开，必须用 navigateToMiniProgram）
          // sign_url 为后端 CreateSchemeUrl 返回的 path（pages/guide?...），有效期 90 天
          e.setData({ polling: true });
          wx.navigateToMiniProgram({
            appId: 'wxa023b292fd19d41d',      // 腾讯电子签（正式版）
            path: d.sign_url,
            envVersion: 'release',
            success: function () {
              wx.showToast({ title: '正在打开电子签…', icon: 'none' });
            },
            fail: function () {
              e.setData({ polling: false });
              e.setErr('无法打开电子签小程序，请重试');
            }
          });
        } else {
          e.setErr(d.errmsg || '签署发起失败，请稍后重试');
        }
      },
      fail: function () {
        e.setErr('网络异常，请重试');
      },
      complete: function () {
        e.setData({ signing: false });
      }
    });
  },

  // ==================== 签署状态轮询（3秒/次，10分钟超时） ====================
  startPoll: function () {
    var e = this;
    e.stopPoll();
    e.setData({ polling: true, pollCount: 0 });
    var timer = setInterval(function () {
      e.setData({ pollCount: e.data.pollCount + 1 });
      if (e.data.pollCount > 200) {
        // 10分钟超时：停止轮询（状态由后端定时任务/下次进入再查）
        e.stopPoll();
        return;
      }
      wx.request({
        url: app.globalData.api + 'wx_jmjm_status.ashx',
        data: { order_no: e.data.orderNo },
        dataType: 'json',
        success: function (res) {
          var d = res.data || {};
          if (d.errcode === 0 && (d.status === 2 || d.status === 9)) {
            e.stopPoll();
            e.setData({ 'info.status': d.status });
            if (d.status === 2) {
              wx.showToast({ title: '签署完成', icon: 'success' });
            }
          }
        }
      });
    }, 3000);
    e.setData({ pollTimer: timer });
  },
  stopPoll: function () {
    var e = this;
    if (e.data.pollTimer) {
      clearInterval(e.data.pollTimer);
      e.setData({ pollTimer: null });
    }
  },

  // ==================== 其他 ====================
  goBack: function () {
    wx.navigateBack();
  },
  reSign: function () {
    // 签署失败后重新填写发起（回到表单态）
    this.setData({ 'info.status': 0 });
  },
  copyUrl: function () {
    // 备用：复制签署链接到剪贴板，客户可在微信里打开
    var e = this;
    if (e.data.info && e.data.info.sign_url) {
      wx.setClipboardData({ data: e.data.info.sign_url });
    }
  },
  setErr: function (msg) {
    this.setData({ formErr: msg });
  },

  // 校验失败：toast 提示 + 底部红字 + 滚动定位到对应输入栏
  failAt: function (msg, selector) {
    var e = this;
    e.setErr(msg);
    wx.showToast({ title: msg, icon: 'none' });
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        selector: selector,
        offsetTop: -60,   // 留出上方间距，避免定位后被导航栏遮挡
        duration: 300
      });
    }
  }
});
