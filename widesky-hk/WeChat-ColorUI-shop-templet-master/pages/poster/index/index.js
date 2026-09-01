const app = getApp();
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
          qrImage: res.tempFiles[0].tempFilePath,
          generatedImg: ''   // 重新上传后清除旧生成结果
        });
      }
    });
  },

  // 生成宣传海报：9:16 背景底图，海报图画上部、企微码圆形白底居中下部（参考分享海报样式）
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

    // 1) 获取海报底图信息（网络图自动下载）
    wx.getImageInfo({
      src: e.data.posterUrl,
      success: function (p) {
        // 2) 获取企微码图信息
        wx.getImageInfo({
          src: e.data.qrImage,
          success: function (q) {
            // 3) 9:16 画布布局（2倍绘制 1500×2666，高清屏不模糊）
            var scale = 2;
            var W = 750 * scale, H = 1333 * scale;
            // 海报图：宽 690 居中，等比高；高度超 800 时按高反算宽度（防超出画布）
            var posterW = 690 * scale;
            var posterH = Math.round(p.height * posterW / p.width);
            var maxPosterH = 800 * scale;
            if (posterH > maxPosterH) {
              posterH = maxPosterH;
              posterW = Math.round(p.width * posterH / p.height);
            }
            var posterX = Math.round((W - posterW) / 2);
            var posterY = 60 * scale;
            // 企微码：300×300 居中，位于海报图下方
            var qrSize = 300 * scale;
            var qrX = Math.round((W - qrSize) / 2);
            var qrY = posterY + posterH + 50 * scale;
            // 提示文字位置
            var tipY = qrY + qrSize + 50 * scale;
            e.setData({
              canvasW: W,
              canvasH: H
            });

            // 4) Canvas 绘制（全部坐标/尺寸 ×2）
            var ctx = wx.createCanvasContext('posterCanvas', e);
            // 4.1 背景底图（米白色铺满）
            ctx.setFillStyle('#f8f5f0');
            ctx.fillRect(0, 0, W, H);
            // 4.2 海报图（带阴影）
            ctx.setShadow(0, 8 * scale, 24 * scale, 'rgba(0,0,0,0.15)');
            ctx.drawImage(p.path, posterX, posterY, posterW, posterH);
            ctx.setShadow(0, 0, 0, 'rgba(0,0,0,0)');
            // 4.3 企微码：白色圆角底衬 + 码图
            ctx.setFillStyle('#ffffff');
            ctx.fillRect(qrX - 20 * scale, qrY - 20 * scale, qrSize + 40 * scale, qrSize + 40 * scale);
            ctx.drawImage(q.path, qrX, qrY, qrSize, qrSize);
            // 4.4 底部提示文字（紫金渐变，醒目）
            var grd = ctx.createLinearGradient(W / 2 - 260 * scale, 0, W / 2 + 260 * scale, 0);
            grd.addColorStop(0, '#7c3aed');
            grd.addColorStop(1, '#d4a017');
            ctx.setFillStyle(grd);
            ctx.setFontSize(32 * scale);
            ctx.setTextAlign('center');
            ctx.fillText('长按识别二维码，添加我的企业微信', W / 2, tipY);

            ctx.draw(false, function () {
              // 5) 导出为图片（750×1333 原尺寸，保证清晰度）
              wx.canvasToTempFilePath({
                canvasId: 'posterCanvas',
                width: W,
                height: H,
                destWidth: W,
                destHeight: H,
                success: function (r) {
                  wx.hideLoading();
                  e.setData({
                    generatedImg: r.tempFilePath,
                    generating: false
                  });
                },
                fail: function () {
                  e.genFail();
                }
              }, e);
            });
          },
          fail: function () {
            e.genFail();
          }
        });
      },
      fail: function () {
        e.genFail();
      }
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
