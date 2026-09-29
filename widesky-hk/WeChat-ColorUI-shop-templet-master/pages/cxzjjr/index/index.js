const app = getApp();
const cjimgDay = 'https://widesky.work/HKback/cjimages_day/'; // 国庆抽奖奖品图目录
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    card: '',           // 员工输入的会员卡号
    querying: false,    // 查询中
    searched: false,    // 是否已发起过查询
    noPrize: false,     // 没有参与抽奖（该卡无中奖记录）
    // 会员信息
    memberCard: '',
    vipName: '',
    vipLevel: '',
    // 中奖记录列表（国庆活动单人最多3次抽奖，按卡号查全部记录）
    records: [],        // [{rowId, prizeName, prizeImg, received, cjTime, ljTime, staffId, staffName, shopNo}]
    // 核销凭证弹窗
    showCert: false,     // 凭证弹窗显示
    cert: {},            // 当前查看的凭证数据
    saving: false        // 凭证保存中
  },

  onCardInput: function (e) {
    // 会员卡号统一转大写（后端抽奖写库时也做了 ToUpper，保证查询一致）
    this.setData({ card: String(e.detail.value || '').toUpperCase() });
  },

  // 点查询：按会员卡号查询该会员全部中奖记录
  onQuery: function () {
    var e = this;
    var card = String(e.data.card || '').trim().toUpperCase();
    if (!card) {
      wx.showToast({ title: '请输入会员卡号', icon: 'none' });
      return;
    }
    e.setData({ querying: true, searched: false, records: [] });
    wx.showLoading({ title: '查询中', mask: true });
    wx.request({
      url: app.globalData.api + 'wx_cj_prizeinfo_day.ashx',
      data: { vipcode: card },
      dataType: 'json',
      success: function (res) {
        wx.hideLoading();
        var d = res.data || {};
        if (d.errcode === 0) {
          // 后端支持只传卡号：返回 list（全部中奖记录）；只返回单条时兼容处理
          var raw = (d.list && d.list.length) ? d.list : (d.plu_id !== undefined ? [d] : []);
          var records = [];
          for (var i = 0; i < raw.length; i++) {
            var it = raw[i] || {};
            records.push({
              rowId: it.row_id || '',
              prizeName: it.prize_name || '',
              prizeImg: (it.plu_id === undefined || it.plu_id === null || it.plu_id === '') ? '' : (cjimgDay + it.plu_id + '.png?t=' + Date.now()),
              received: String(it.tags) === '1',   // tags=1 已领取，否则待领取
              cjTime: it.cj_time || '',
              ljTime: it.lj_time || '',
              staffId: it.staff_id || '',
              staffName: it.staff_name || '',
              shopNo: it.shop_no || ''
            });
          }
          e.setData({
            querying: false,
            searched: true,
            noPrize: records.length === 0,
            memberCard: d.vip_code || card,
            vipName: d.vip_name || (raw[0] && raw[0].vip_name) || '',
            vipLevel: d.vip_level || (raw[0] && raw[0].vip_level) || '',
            records: records
          });
        } else {
          // 该会员没有中奖记录（errcode:-12/-2 等）
          e.setData({ querying: false, searched: true, noPrize: true, records: [] });
          wx.showToast({ title: d.errmsg || '没有中奖记录', icon: 'none', duration: 2500 });
        }
      },
      fail: function () {
        wx.hideLoading();
        e.setData({ querying: false, searched: true, noPrize: true, records: [] });
        wx.showToast({ title: '网络异常，请重试', icon: 'none' });
      }
    });
  },

  // 重新查询
  onReset: function () {
    this.setData({ searched: false, noPrize: false, records: [], card: '', showCert: false, cert: {} });
  },

  // ===== 核销凭证弹窗 =====

  // 已领取记录：点按钮生成核销凭证弹窗
  onViewCert: function (e) {
    var idx = e.currentTarget.dataset.idx;
    var rec = this.data.records[idx];
    if (!rec || !rec.received) return;
    this.setData({
      showCert: true,
      cert: {
        prizeName: rec.prizeName,
        prizeImg: rec.prizeImg,
        memberCard: this.data.memberCard,
        vipName: this.data.vipName,
        vipLevel: this.data.vipLevel,
        staffId: rec.staffId,
        staffName: rec.staffName,
        shopNo: rec.shopNo,
        receivedTime: rec.ljTime
      }
    });
  },

  // 关闭凭证弹窗
  onCloseCert: function () {
    this.setData({ showCert: false });
  },

  // 保存凭证到相册：先下载奖品图片，再 canvas 绘制凭证图导出保存
  saveCert: function () {
    var e = this;
    if (e.data.saving) return;
    e.setData({ saving: true });
    wx.downloadFile({
      url: e.data.cert.prizeImg,
      success: function (dres) {
        e.drawCert(dres.tempFilePath);
      },
      fail: function () {
        e.setData({ saving: false });
        wx.showToast({ title: '奖品图片下载失败', icon: 'none' });
      }
    });
  },

  drawCert: function (imgPath) {
    var e = this;
    wx.createSelectorQuery().select('#certCanvas').fields({ node: true, size: true }).exec(function (res) {
      if (!res || !res[0] || !res[0].node) {
        e.setData({ saving: false });
        wx.showToast({ title: '生成失败，请重试', icon: 'none' });
        return;
      }
      var canvas = res[0].node;
      var ctx = canvas.getContext('2d');
      var win = wx.getWindowInfo();
      var dpr = win.pixelRatio || 2;
      var W = 600, H = 1000;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      // 白底
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);

      // 标题
      ctx.fillStyle = '#ed1c24';
      ctx.font = 'bold 40px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('国庆抽奖领奖凭证', W / 2, 70);

      // 分隔线
      ctx.strokeStyle = '#eeeeee';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, 100);
      ctx.lineTo(W - 40, 100);
      ctx.stroke();

      // 奖品图片（居中，保持比例）
      var img = canvas.createImage();
      img.onload = function () {
        var bw = 300, bh = 300;
        var scale = Math.min(bw / img.width, bh / img.height);
        var dw = img.width * scale, dh = img.height * scale;
        var dx = (W - dw) / 2, dy = 130 + (bh - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);

        // 奖品名称
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(e.data.cert.prizeName || '', W / 2, 500);

        // 信息区
        ctx.textAlign = 'left';
        var y = 570;
        var rows = [
          ['会员卡号', e.data.cert.memberCard],
          ['会员姓名', e.data.cert.vipName],
          ['会员等级', e.data.cert.vipLevel],
          ['员工工号', e.data.cert.staffId],
          ['员工姓名', e.data.cert.staffName],
          ['店铺号', e.data.cert.shopNo],
          ['核销时间', e.data.cert.receivedTime]
        ];
        for (var i = 0; i < rows.length; i++) {
          if (!rows[i][1]) continue;
          ctx.fillStyle = '#999999';
          ctx.font = '26px sans-serif';
          ctx.fillText(rows[i][0] + '：', 60, y);
          ctx.fillStyle = '#333333';
          ctx.fillText(String(rows[i][1]), 200, y);
          y += 52;
        }

        // 底部提示
        ctx.fillStyle = '#bbbbbb';
        ctx.font = '22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('请将本凭证附在销售单据后作为领奖依据', W / 2, H - 30);

        wx.canvasToTempFilePath({
          canvas: canvas,
          success: function (r) {
            e.saveToAlbum(r.tempFilePath);
          },
          fail: function () {
            e.setData({ saving: false });
            wx.showToast({ title: '生成失败，请重试', icon: 'none' });
          }
        });
      };
      img.onerror = function () {
        e.setData({ saving: false });
        wx.showToast({ title: '奖品图片加载失败', icon: 'none' });
      };
      img.src = imgPath;
    });
  },

  saveToAlbum: function (filePath) {
    var e = this;
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success: function () {
        e.setData({ saving: false });
        wx.showToast({ title: '已保存到相册', icon: 'success' });
      },
      fail: function (err) {
        e.setData({ saving: false });
        var msg = (err && err.errMsg) || '';
        if (msg.indexOf('auth') > -1 || msg.indexOf('denied') > -1) {
          wx.showModal({
            title: '需要相册权限',
            content: '请在设置中开启"保存到相册"权限后重试',
            confirmText: '去设置',
            success: function (m) {
              if (m.confirm) wx.openSetting();
            }
          });
        } else {
          wx.showToast({ title: '保存失败', icon: 'none' });
        }
      }
    });
  },


  back: function () {
    wx.navigateBack({
      fail: function () {
        wx.switchTab({ url: '/pages/jzb/index/index' });
      }
    });
  }
})
