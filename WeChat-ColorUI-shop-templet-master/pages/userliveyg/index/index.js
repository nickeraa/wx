var e = getApp()
var butil = require("../../../utils/butil")

Page({
  data: {
    liveTitle: "",
    fximg: "", // 分享图
    isLiving: true,
    loading: false,
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    iconurlfx: e.globalData.iconurl + 'fx.jpg',
    iconurl: e.globalData.iconurl,
    vipcode: "",
    openid: "",
    avatarUrl: '',
    nickName: '',
    resultdt: {},
    current: 0,
    lines: 0,
    banner: e.globalData.zbimgurl,
    swiperList: [],
    swiperHeight: 422, // 16:9 = 750 * 9 / 16
    replu: {},
    replus: {},
    index2: null,
    picker2: [],
    itemname: "",
    sku: "",
    stock: "",
    select_all: !1,
    choseNames: "",
    flag: !0,
    vipname: "",
    grade: "",
    store: "",
    ygname: "",
    count: 0,
    slt: "",
    xf_users: "",
    yguserid: '',
    xf_name: '',
    fxtag1: false,
    fxtag2: false,
    state:0,
    qrcodeImg: "", // 生成的二维码图片
    posterImg: "", // 合成的分享海报图（海报背景+二维码）
    showQrcode: false // 是否显示二维码弹窗


  },
  getvipcode: function (a) {
    this.setData({
      vipcode: a.detail.value
    });
  },

  listvipcode: function () {
    if (this.data.vipcode == "") {
      wx.showModal({
        title: "提示",
        content: "没有填写分享的会员卡号",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })

      return false;
    }
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_checkvip.ashx",
      data: {
        vipcode: t.data.vipcode
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        if (a.data && a.data.length > 0 && a.data[0]) {

          t.setData({
            vipname: a.data[0].XF_SURNAME,
            grade: a.data[0].GRADE,
            store: a.data[0].XF_STORES,
            xf_name: a.data[0].XF_USERNAME,
            xf_users: a.data[0].XF_USERS,
            vipcode: a.data[0].XF_VIPCODE,
            fxtag1: true
          })

          // 匹配末尾中文/字符（match 可能返回 null，需兜底）
          var reg = /\S+$/;
          var matched = (t.data.xf_name || "").match(reg);
          if (matched) {
            t.setData({
              xf_name: matched[0]
            });
          }

        } else {

          t.setData({
              rejob: null,
              vipcode: '',
              xf_users: '',
            }),
            wx.showModal({
              title: "提示",
              content: "卡号不存在或输入错误",
              showCancel: !1,
              success: function (a) {
                a.confirm;
              },
            })

        }

      },
      fail: function () {
        wx.showToast({ title: "查询失败，请重试", icon: "none" });
      },
    });
  },


  onLoad: function (a) {

    wx.removeStorageSync('vipcode')
    // 朋友圈分享进入：onShareTimeline 只能落地当前页，识别参数后跳转客户版直播页
    if (a.yguserid) {
      wx.redirectTo({
        url: "/pages/userlive/index/index?yguserid=" + a.yguserid,
      });
      return;
    }

    // 显式开启「发送给朋友」和「分享到朋友圈」菜单
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    });

    var that = this;
    wx.request({
      url: "https://widesky.work/HKback/wx_state.ashx",
      data: {},
      header: {
        "content-type": "application/json"
      },
      timeout: 10000,
      success: (res) => {
        if (res.data && res.data.length > 0 && res.data[0] && res.data[0].STARTS == "0") {
          wx.switchTab({
            url: '/pages/home/index/index'
          });
        } else {
          that.setData({
            state: 1
          });

          wx.navigateTo({
            url: '/pages/relogin/index',
          });
        }
      },
      fail: () => {
        wx.showToast({ title: "网络异常，请重试", icon: "none" });
      }
    });
  },



  onShow: function (t) {
    wx.removeStorageSync('vipcode')
    var that = this
    wx.request({
      url: e.globalData.api + "wx_zbindex.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      timeout: 10000,
      success: function (a) {
        if (!a.data || !a.data.length || !a.data[0]) return;

        that.setData({
          resultdt: a.data,
          liveTitle: a.data[0].TITLE,
          fximg: a.data[0].FXIMG
        });

        // ============= 你的 3 个原始字段 =============
        let img1 = a.data[0].IMAGE1;
        let img2 = a.data[0].IMAGE2;
        let img3 = a.data[0].IMAGE3;

        // ============= 1. 收集非空的图片路径 =============
        let imgArr = [];

        if (img1 && img1.trim() !== '') {
          imgArr.push(img1);
        }
        if (img2 && img2.trim() !== '') {
          imgArr.push(img2);
        }
        if (img3 && img3.trim() !== '') {
          imgArr.push(img3);
        }

        // ============= 2. 转成 轮播图需要的【对象数组】 =============
        let banner = that.data.banner;
        let swiperData = imgArr.map(item => {
          // 后端可能返回相对路径、完整URL 或 带/开头的路径，统一处理
          let img = item.trim();
          if (!/^https?:\/\//i.test(img) && !img.startsWith('//')) {
            // 去掉前导斜杠，避免和 banner 末尾斜杠重复
            img = img.replace(/^\/+/, '');
            img = banner + img;
          }
          return { img: img };
        });

        // ============= 3. 赋值给轮播 =============
        that.setData({
          swiperList: swiperData
        });

        console.log("banner前缀：", banner);
        console.log("最终轮播数据：", swiperData);

      },
      fail: function () {
        wx.showToast({ title: "加载失败，请重试", icon: "none" });
      },
    })
  },

  imgError(e) {
    console.log("海报图加载失败，索引:", e.currentTarget.dataset.idx, "地址:", this.data.swiperList[e.currentTarget.dataset.idx].img);
  },

  checkzf: function () {

    if (this.data.vipcode == "") {

      wx.showModal({
        title: "提示",
        content: "没有填写分享的会员卡号",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        
        },
      })


    } else if (this.data.xf_users != wx.getStorageSync("yguserid")) {
      var that = this
      wx.showModal({
        title: "提示",
        content: "此客户跟进员工和登录员工不一致，不能分享",
        showCancel: !1,
        success: function (a) {
          a.confirm;
        },
      })

    } else {

      var that = this
      wx.showModal({
        title: "提示",
        content: "ok！核验无问题",
        showCancel: !1,
        success: function (a) {
          that.setData({
            fxtag2: true,

          })
        },
      })

    }


  },

  onShareAppMessage: function (e) {
    // vipcode 有意置空：分享链接不带特定客户卡号，仅标识分享员工
    // 注：小程序分享返回对象不支持 success/fail 回调，请勿添加
    var ygname = wx.getStorageSync('yguserid') != 'GTZB'
      ? wx.getStorageSync("ygname")
      : "";
    // fximg 未加载时用固定分享图兜底，避免 imageUrl 为无效目录地址
    // 文件名含中文必须编码，否则微信客户端下载分享图失败
    var shareImg = this.data.fximg
      ? this.data.banner + encodeURIComponent(this.data.fximg)
      : this.data.iconurlfx;
    console.log("分享图地址:", shareImg);
    return {
      title: "广天藏品 " + ygname + " 向您分享了最新直播",
      path: "/pages/userlive/index/index?yguserid=" + wx.getStorageSync("yguserid"),
      imageUrl: shareImg,
    };
  },

  // 分享到朋友圈（基础库 2.11.3+）：定义后胶囊菜单自动出现入口
  // 注意：朋友圈分享只能落地当前页，参数用 query 传递（不支持 path），
  // 因此 onLoad 中识别 yguserid 参数后跳转到客户版直播页 userlive
  onShareTimeline: function () {
    var ygname = wx.getStorageSync('yguserid') != 'GTZB'
      ? wx.getStorageSync("ygname")
      : "";
    // 文件名含中文必须编码，否则微信客户端下载分享图失败
    var shareImg = this.data.fximg
      ? this.data.banner + encodeURIComponent(this.data.fximg)
      : this.data.iconurlfx;
    console.log("分享图地址:", shareImg);
    return {
      title: "广天藏品 " + ygname + " 向您分享了最新直播",
      query: "yguserid=" + wx.getStorageSync("yguserid"),
      imageUrl: shareImg,
    };
  },

  // 生成带 yguserid 参数的小程序码（走后端 wxacode.ashx，前端无 appid/secret）
  createQrcode: function () {
    var yguserid = wx.getStorageSync("yguserid") || "";
    if (!yguserid) {
      wx.showToast({ title: "员工编号为空，无法生成", icon: "none" });
      return;
    }
    var that = this;
    that.setData({ yguserid: yguserid });
    wx.showLoading({ title: "生成中..." });
    wx.request({
      url: e.globalData.api + "wxacode.ashx",
      data: { yguserid: yguserid },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        var data = res.data;
        // 兼容后端返回字符串 JSON（带 BOM 时先剔除）
        if (typeof data === "string") {
          try {
            data = JSON.parse(data.replace(/\ufeff/g, ""));
          } catch (err) {
            wx.hideLoading();
            wx.showToast({ title: "返回数据异常", icon: "none" });
            return;
          }
        }
        if (!data || data.errcode !== 0) {
          wx.hideLoading();
          wx.showToast({ title: (data && data.errmsg) || "生成失败", icon: "none" });
          return;
        }
        // base64 写文件（保存相册需要本地文件路径，文件名带时间戳避免覆盖）
        var filePath = wx.env.USER_DATA_PATH + "/live_qrcode_" + Date.now() + ".png";
        wx.getFileSystemManager().writeFile({
          filePath: filePath,
          data: data.buffer,
          encoding: "base64",
          success: function () {
            wx.hideLoading();
            that.setData({
              qrcodeImg: filePath,
              showQrcode: true
            });
            // 二维码就绪后合成分享海报
            that.generatePoster();
          },
          fail: function () {
            wx.hideLoading();
            wx.showToast({ title: "图片写入失败", icon: "none" });
          }
        });
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "网络异常，请重试", icon: "none" });
      }
    });
  },

  // 关闭二维码弹窗
  closeQrcode: function () {
    this.setData({ showQrcode: false });
  },

  // 阻止点击冒泡
  noop: function () {},

  // 合成分享海报：背景海报图 + 直播标题 + 员工编号 + 小程序码
  generatePoster: function () {
    var that = this;
    var qrPath = that.data.qrcodeImg;
    if (!qrPath) return;
    // 背景图：与「分享直播」按钮同一张正方形分享图 fximg（文件名含中文必须编码），
    // 取不到时回退到固定分享图 iconurlfx，与 onShareAppMessage 完全一致
    var bgSrc = that.data.fximg
      ? that.data.banner + encodeURIComponent(that.data.fximg)
      : that.data.iconurlfx;
    if (!bgSrc) return;
    wx.getImageInfo({
      src: bgSrc,
      success: function (info) {
        that._drawPoster(info.path, info.width, info.height);
      },
      fail: function () {
        that._drawPoster("", 0, 0);
      },
    });
  },
  // 离屏绘制海报（背景图为正方形，完整显示不裁剪）
  _drawPoster: function (bgPath, bgW, bgH) {
    var that = this;
    var canvasW = 600;
    var canvasH = 1000;
    var cardH = 360;
    var ctx = wx.createCanvasContext("posterCanvas", that);

    // 全画布白色打底
    ctx.setFillStyle("#ffffff");
    ctx.fillRect(0, 0, canvasW, canvasH);

    // 顶部品牌栏：醒目的金色渐变
    var goldGrad = ctx.createLinearGradient(0, 0, canvasW, 0);
    goldGrad.addColorStop(0, "#FFF8DC");   // 淡金
    goldGrad.addColorStop(0.25, "#FFD700"); // 亮金
    goldGrad.addColorStop(0.5, "#FFC125");  // 金黄
    goldGrad.addColorStop(0.75, "#F59E0B"); // 深金
    goldGrad.addColorStop(1, "#B8860B");    // 暗金
    ctx.setFillStyle(goldGrad);
    ctx.fillRect(0, 0, canvasW, 70);
    // 底部细阴影，增强层次
    var shadowGrad = ctx.createLinearGradient(0, 70, 0, 76);
    shadowGrad.addColorStop(0, "rgba(0,0,0,0.25)");
    shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.setFillStyle(shadowGrad);
    ctx.fillRect(0, 70, canvasW, 6);
    ctx.setFillStyle("#4A2800"); // 深棕文字，在金色背景上更清晰
    ctx.setFontSize(30);
    ctx.setTextAlign("left");
    ctx.fillText("广天藏品 · 直播分享", 24, 46);

    // 中间正方形海报图区域：完整显示，不裁剪（contain 居中）
    var imgAreaY = 70;
    var imgAreaH = canvasH - imgAreaY - cardH; // 570
    var imgAreaW = imgAreaH;                     // 570x570 正方形
    var imgAreaX = (canvasW - imgAreaW) / 2;
    // 图片区背景色（若图片非 1:1 时露底）
    ctx.setFillStyle("#f8f8f8");
    ctx.fillRect(imgAreaX, imgAreaY, imgAreaW, imgAreaH);
    if (bgPath && bgW > 0 && bgH > 0) {
      var imgScale = Math.min(imgAreaW / bgW, imgAreaH / bgH);
      var drawW = bgW * imgScale;
      var drawH = bgH * imgScale;
      var drawX = imgAreaX + (imgAreaW - drawW) / 2;
      var drawY = imgAreaY + (imgAreaH - drawH) / 2;
      ctx.drawImage(bgPath, drawX, drawY, drawW, drawH);
    }

    // 底部信息卡：替换为小程序码展示（白底卡片 + 居中二维码 + 提示）
    var cardY = canvasH - cardH;
    ctx.setFillStyle("rgba(255,255,255,0.96)");
    ctx.fillRect(0, cardY, canvasW, cardH);
    // 顶部金色装饰线
    var lineGrad = ctx.createLinearGradient(0, cardY, canvasW, cardY);
    lineGrad.addColorStop(0, "#B8860B");
    lineGrad.addColorStop(0.5, "#FFD700");
    lineGrad.addColorStop(1, "#B8860B");
    ctx.setFillStyle(lineGrad);
    ctx.fillRect(0, cardY, canvasW, 5);

    // 小程序码居中显示，放大以醒目突出
    var qrSize = 220;
    var qrX = (canvasW - qrSize) / 2;
    var qrY = cardY + 40;
    ctx.setFillStyle("#ffffff");
    ctx.fillRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16);
    ctx.drawImage(that.data.qrcodeImg, qrX, qrY, qrSize, qrSize);

    // 提示文字：加大字号、加深颜色，醒目突出
    ctx.setFillStyle("#333333");
    ctx.setFontSize(30);
    ctx.setTextAlign("center");
    ctx.fillText("进入直播间，长按识别小程序码", canvasW / 2, cardY + qrSize + 85);

    ctx.draw(false, function () {
      // 绘制完成后再导出，延迟避免部分基础库导出白图
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: "posterCanvas",
          width: canvasW,
          height: canvasH,
          destWidth: canvasW * 2,
          destHeight: canvasH * 2,
          fileType: "png",
          success: function (res) {
            that.setData({ posterImg: res.tempFilePath });
          },
        }, that);
      }, 300);
    });
  },

  // 保存海报/二维码到相册（优先保存合成海报）
  saveQrcode: function () {
    var that = this;
    var filePath = that.data.posterImg || that.data.qrcodeImg;
    if (!filePath) return;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting["scope.writePhotosAlbum"]) {
          wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success: function () {
              wx.showToast({ title: "保存成功", icon: "success" });
            },
            fail: function () {
              wx.showToast({ title: "保存失败，请重试", icon: "none" });
            },
          });
        } else {
          wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function () {
              wx.saveImageToPhotosAlbum({
                filePath: filePath,
                success: function () {
                  wx.showToast({ title: "保存成功", icon: "success" });
                },
                fail: function () {
                  wx.showToast({ title: "保存失败，请重试", icon: "none" });
                },
              });
            },
            fail: function () {
              wx.showModal({
                title: "提示",
                content: "需要相册权限才能保存海报",
                confirmText: "去设置",
                success: function (r) {
                  if (r.confirm) {
                    wx.openSetting();
                  }
                },
              });
            },
          });
        }
      },
    });
  },

});