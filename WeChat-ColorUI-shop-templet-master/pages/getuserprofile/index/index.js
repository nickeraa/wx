var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    avatarUrl: '',
    nickName: '',
    isDevtools: false
  },

  onLoad: function (options) {
    var that = this;
    var sys = wx.getSystemInfoSync();
    this.setData({ isDevtools: sys.platform === 'devtools' });

    // 1. 优先从本地存储读取（之前保存过的）
    var savedImg = wx.getStorageSync('wximg');
    var savedName = wx.getStorageSync('wxuser');
    if (savedImg && savedName) {
      this.setData({ avatarUrl: savedImg, nickName: savedName });
    }

    // 2. 尝试 wx.getUserInfo（旧授权用户仍可拿到真实数据）
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              var info = res.userInfo;
              // 未手动选过头像时，用 getUserInfo 的结果覆盖
              if (!that.data.avatarUrl) {
                that.setData({ avatarUrl: info.avatarUrl });
              }
              // 未手动选过昵称 且 不是默认"微信用户"时覆盖
              if (!that.data.nickName && info.nickName !== '微信用户') {
                that.setData({ nickName: info.nickName });
              }
            }
          });
        }
      }
    });
  },

  // 选择微信头像
  onChooseAvatar(e) {
    var url = e.detail.avatarUrl;
    console.log('chooseAvatar 返回路径:', url);

    // 开发工具中：拍照/相册返回 wxfile:// 开头，微信头像返回 http://tmp/
    // 真机新版微信：chooseAvatar 本身只弹出微信头像选择器，无需额外校验
    if (this.data.isDevtools && url && url.startsWith('wxfile://')) {
      wx.showToast({ title: '请选择微信头像，不要拍照或从相册选择', icon: 'none', duration: 2000 });
      return;
    }

    this.setData({ avatarUrl: url });
  },

  // 选择微信昵称（type=nickname 仅弹出微信昵称列表，不支持手动输入）
  onNickSelect(e) {
    this.setData({ nickName: e.detail.value });
  },

  // 提交保存
  submit() {
    var that = this;

    if (!this.data.avatarUrl) {
      wx.showToast({ title: '请选择头像', icon: 'error', duration: 1500 });
      return;
    }
    if (!this.data.nickName) {
      wx.showToast({ title: '请选择微信昵称', icon: 'error', duration: 1500 });
      return;
    }

    wx.showLoading({ title: '保存中...', mask: true });

    wx.uploadFile({
      url: a.globalData.api + 'wx_postwximg.ashx',
      filePath: that.data.avatarUrl,
      name: 'imgfile',
      formData: { method: 'POST' },
      success: function (res) {
        var imgurl = 'wximg/' + res.data;
        wx.setStorageSync('wximg', imgurl);
        wx.setStorageSync('wxuser', that.data.nickName);
        wx.hideLoading();
        wx.showToast({ title: '保存成功', icon: 'success', duration: 1500 });
        setTimeout(function () { wx.navigateBack({ delta: 1 }); }, 1500);
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: '上传失败，请重试', icon: 'error', duration: 1500 });
      }
    });
  },

  back() {
    wx.navigateBack({ delta: 1 });
  }
});
