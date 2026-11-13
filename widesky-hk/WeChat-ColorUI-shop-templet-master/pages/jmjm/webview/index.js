// 金银币寄卖 - 电子签签署容器页
// 打开腾讯电子签签署链接；客户签署完成后返回上一页（confirm 页 onShow 自动恢复轮询）
Page({
  data: {
    url: ''
  },
  onLoad: function (options) {
    var url = decodeURIComponent(options.url || '');
    this.setData({ url: url });
  }
});
