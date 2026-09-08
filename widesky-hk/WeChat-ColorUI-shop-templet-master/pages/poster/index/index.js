const app = getApp();

// 本地临时文件路径可能是 http://tmp/... 形式（微信新版返回），作为图片 src 时会被判定为
// "不支持 HTTP 协议"而拦截；统一替换成 wxfile://tmp/ 前缀（本地文件不走网络，不触发 HTTPS 校验）
function fixTmpPath(p) {
  return (p || '').replace(/^http:\/\/tmp\//, 'wxfile://tmp/');
}
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    // 海报底图（服务器固定海报，替换为实际海报图地址）
    posterUrl: 'https://widesky.work/HKback/images/qwhb.png',
    qrImage: '',          // 员工上传的企微码图片（本地临时路径）
    generatedImg: '',     // 拼接生成的新图片
    generating: false,    // 生成中状态
    canvasW: 750,         // canvas 宽（9:16 固定）
    canvasH: 1333         // canvas 高（9:16 固定）
  },

  onLoad: function () {
    // 禁止页面转发 + 禁止分享朋友圈（隐藏胶囊菜单的转发/朋友圈入口）
    if (wx.hideShareMenu) {
      wx.hideShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      });
    }
  },

  onShow: function () {
    // 返回本页时确保仍处于禁分享状态
    if (wx.hideShareMenu) {
      wx.hideShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      });
    }
  },

  // 选择/重新上传企微码图片
  onChooseQr: function () {
    var e = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        e.setData({
          // 本地临时文件可能被返回成 http://tmp/...，会被判定为不支持 HTTP 协议而拦截；
          // 统一换成 wxfile://tmp/ 前缀（本地文件不走网络，不会触发 HTTPS 校验）
          qrImage: fixTmpPath(res.tempFiles[0].tempFilePath),
          generatedImg: ''   // 重新上传后清除旧生成结果
        });
      }
    });
  },

  // 生成宣传海报：9:16 背景底图，海报画上部、企微码圆形白底居中下部（Canvas 2D 稳定版）
  onGenerate: function () {
    var e = this;
    if (!e.data.qrImage) {
      wx.showToast({
        title: '请先上传企微码图片',
        icon: 'none'
      });
      return;
    }
    if (e.data.generating) return;
    e.setData({
      generating: true
    });
    wx.showLoading({
      title: '生成中...',
      mask: true
    });

    // 1) 获取 canvas 节点（Canvas 2D）
    var query = wx.createSelectorQuery().in(e);
    query.select('#posterCanvas').fields({ node: true, size: true }).exec(function (res) {
      if (!res || !res[0] || !res[0].node) {
        e.genFail();
        return;
      }
      var canvas = res[0].node;
      var ctx = canvas.getContext('2d');

      // 逻辑尺寸 750×1333，物理像素按 dpr 放大，保证清晰度
      var W = 750, H = 1333;
      var dpr = 2;
      try {
        dpr = ((wx.getWindowInfo ? wx.getWindowInfo().pixelRatio : (wx.getSystemInfoSync ? wx.getSystemInfoSync().pixelRatio : 2)) || 2);
      } catch (ee) { dpr = 2; }
      if (dpr < 1) dpr = 1;
      if (dpr > 2) dpr = 2; // 限制最大 2 倍，避免低端机导出过大
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      // 2) 用 canvas.createImage 加载两张图，全部 onload 后再绘制（避免企微码缺失/时序错乱）
      var poster = canvas.createImage();
      var qr = canvas.createImage();
      var loaded = 0;

      function after() {
        loaded++;
        if (loaded >= 2) draw();
      }
      function draw() {
        var pw = poster.width || 1, ph = poster.height || 1;
        // 2.1 背景铺满
        ctx.fillStyle = '#f8f5f0';
        ctx.fillRect(0, 0, W, H);
        // 2.2 海报图：上区等比 contain，水平居中、顶部对齐（顶部不留间隔）
        var areaX = 0, areaY = 0, areaW = W, areaH = 800;
        var s = Math.min(areaW / pw, areaH / ph);
        var dpw = pw * s, dph = ph * s;
        var dpx = areaX + (areaW - dpw) / 2;
        var dpy = areaY; // 顶部对齐，顶部不留白
        try {
          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.15)';
          ctx.shadowBlur = 24;
          ctx.shadowOffsetY = 8;
          ctx.drawImage(poster, dpx, dpy, dpw, dph);
          ctx.restore();
        } catch (e2) {}
        // 2.3 企微码：白色底衬 + 码图，固定居中下部（qrY 已上移 50rpx，画布 750px=750rpx）
        var qrSize = 300;
        var qrX = (W - qrSize) / 2;
        var qrY = 850;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
        ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);
        // 2.4 底部提示文字（渐变醒目，文字与二维码图片间距 50rpx，画布 750px=750rpx）
        var grd = ctx.createLinearGradient(W / 2 - 260, 0, W / 2 + 260, 0);
        grd.addColorStop(0, '#7c3aed');
        grd.addColorStop(1, '#d4a017');
        ctx.fillStyle = grd;
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('长按识别二维码，添加我的企业微信', W / 2, qrY + qrSize + 50);

        // 3) 导出整张画布（Canvas 2D 用 node）
        wx.canvasToTempFilePath({
          canvas: canvas,
          x: 0, y: 0,
          width: canvas.width,
          height: canvas.height,
          destWidth: canvas.width,
          destHeight: canvas.height,
          success: function (r) {
            wx.hideLoading();
            e.setData({
              generatedImg: fixTmpPath(r.tempFilePath),
              generating: false
            });
          },
          fail: function () {
            e.genFail();
          }
        });
      }

      poster.onload = after;
      poster.onerror = after; // 某图失败也继续，避免卡在加载中
      qr.onload = after;
      qr.onerror = after;
      poster.src = e.data.posterUrl;
      qr.src = e.data.qrImage;
    });
  },

  genFail: function () {
    wx.hideLoading();
    this.setData({
      generating: false
    });
    wx.showToast({
      title: '生成失败，请重试',
      icon: 'none'
    });
  },

  // 预览生成的新图片（可双指放大查看）
  onPreview: function () {
    if (!this.data.generatedImg) return;
    wx.previewImage({
      urls: [this.data.generatedImg],
      current: this.data.generatedImg
    });
  },

  // 保存到相册（处理相册权限）
  onSave: function () {
    var img = this.data.generatedImg;
    if (!img) return;
    wx.saveImageToPhotosAlbum({
      filePath: img,
      success: function () {
        wx.showToast({
          title: '已保存到相册',
          icon: 'success'
        });
      },
      fail: function (err) {
        console.warn('saveImageToPhotosAlbum fail:', err);
        var msg = err.errMsg || '';
        // 权限类失败（拒绝授权/隐私协议未声明/无权限）→ 引导开启
        if (msg.indexOf('auth') > -1 || msg.indexOf('scope') > -1 ||
          msg.indexOf('permission') > -1 || msg.indexOf('privacy') > -1) {
          wx.showModal({
            title: '提示',
            content: '需要相册权限才能保存图片，是否去开启？',
            confirmText: '去开启',
            success: function (m) {
              if (m.confirm) {
                wx.openSetting();
              }
            }
          });
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          });
        }
      }
    });
  }
})
