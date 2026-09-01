const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    vipcode: '',          // 二维码携带的会员卡号
    loaded: false,        // 中奖信息查询完成
    notFound: false,      // 查不到中奖记录
    alreadyReceived: false, // 该奖品已核销
    // 中奖信息
    pluId: -1,
    prizeName: '',
    prizeImg: '',
    memberCard: '',
    vipName: '',
    vipLevel: '',
    // 员工输入
    staffId: '',
    staffPwd: '',
    submitting: false,
    // 核销成功
    success: false,
    staffName: '',
    shopNo: '',
    receivedTime: '',   // 核销时间（后端返回）
    saving: false       // 凭证保存中
  },

  onLoad: function (options) {
    var e = this;
    // 员工扫码进入时场景参数在 options.scene（URL编码）；直链/调试时走 options.vipcode
    var scene = '';
    if (options.scene) {
      scene = decodeURIComponent(options.scene);
    }
    var vipcode = (options.vipcode || scene || '').trim();
    if (!vipcode) {
      e.setData({ loaded: true, notFound: true });
      return;
    }
    e.setData({ vipcode: vipcode, memberCard: vipcode });
    e.queryPrize(vipcode);
  },

  // 按卡号查询中奖记录
  queryPrize: function (vipcode) {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_cj_prizeinfo.ashx',
      data: { vipcode: vipcode },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          e.setData({
            loaded: true,
            notFound: false,
            alreadyReceived: String(d.tags) === '1',
            pluId: d.plu_id,
            prizeName: d.prize_name || '',
            prizeImg: app.globalData.cjimg + d.plu_id + '.png?t=' + Date.now(),
            vipName: d.vip_name || '',
            vipLevel: d.vip_level || ''
          });
        } else {
          e.setData({ loaded: true, notFound: true });
        }
      },
      fail: function () {
        e.setData({ loaded: true, notFound: true });
      }
    });
  },

  onStaffInput: function (e) {
    this.setData({ staffId: e.detail.value });
  },

  onPwdInput: function (e) {
    this.setData({ staffPwd: e.detail.value });
  },

  // 确认核销
  onConfirmStaff: function () {
    var e = this;
    var sid = String(e.data.staffId || '').trim();
    var spwd = String(e.data.staffPwd || '').trim();
    if (!sid) {
      wx.showToast({ title: '请输入员工工号', icon: 'none' });
      return;
    }
    if (!spwd) {
      wx.showToast({ title: '请输入登录密码', icon: 'none' });
      return;
    }
    e.setData({ submitting: true });
    wx.request({
      url: app.globalData.api + 'wx_cj_receive.ashx',
      data: {
        vipcode: e.data.vipcode,
        yguserid: sid,
        ygpassword: spwd
      },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          e.setData({
            success: true,
            submitting: false,
            alreadyReceived: false,
            vipName: d.vip_name || e.data.vipName,
            vipLevel: d.vip_level || e.data.vipLevel,
            staffName: d.staff_name || '',
            staffId: d.staff_id || sid,
            shopNo: d.shop_no || '',
            receivedTime: d.received_time || ''
          });
          if (wx.vibrateShort) {
            wx.vibrateShort({ type: 'medium' });
          }
        } else {
          wx.showToast({ title: d.errmsg || '核销失败', icon: 'none' });
          e.setData({ submitting: false });
        }
      },
      fail: function () {
        wx.showToast({ title: '网络异常，请重试', icon: 'none' });
        e.setData({ submitting: false });
      }
    });
  },

  // 保存凭证到相册：先下载奖品图片，再 canvas 绘制凭证图导出保存
  saveCert: function () {
    var e = this;
    if (e.data.saving) return;
    e.setData({ saving: true });
    wx.downloadFile({
      url: e.data.prizeImg,
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
      var sys = wx.getSystemInfoSync();
      var dpr = sys.pixelRatio || 2;
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
      ctx.fillText('抽奖领奖凭证', W / 2, 70);

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
        ctx.fillText(e.data.prizeName || '', W / 2, 500);

        // 信息区
        ctx.textAlign = 'left';
        var y = 570;
        var rows = [
          ['会员卡号', e.data.memberCard],
          ['会员姓名', e.data.vipName],
          ['会员等级', e.data.vipLevel],
          ['员工工号', e.data.staffId],
          ['员工姓名', e.data.staffName],
          ['店铺号', e.data.shopNo],
          ['核销时间', e.data.receivedTime]
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
            content: '请在设置中开启“保存到相册”权限后重试',
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
  }
})
