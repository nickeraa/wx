const app = getApp()
//计数器
var interval = null;
//值越大旋转时间越长 即旋转速度
var intime = 50;
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    color: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    //8张奖品图片（位置0-7），后端返回的position需与此对应
    images: ['/images/iphone.png', '/images/x1000.png', '/images/cat.png', '/images/x500.png', '/images/bjt.png', '/images/x50.png', '/images/ma.png', '/images/x200.png'],
    btnconfirm: '/images/dianjichoujiang.png',
    clickLuck: 'clickLuck',
    luckPosition: 0,
    counts: 0,
    drawn: false,
    //中奖结果弹窗
    showWin: false,
    prizeName: '',
    prizeCode: '',
    //订阅号原始ID（gh_开头），用于中奖后打开订阅号资料页，上线前替换
    ghId: 'gh_xxxxxxxxxxxx'
  },

  onLoad: function () {
    this.loadAnimation();
  },

  onShow: function () {
    var that = this;
    if (!wx.getStorageSync('member_card')) {
      wx.redirectTo({
        url: '/pages/scoupon/index/index'
      });
      return;
    }
    that.checkStatus();
  },

  onHide: function () {
    clearInterval(interval);
  },

  onUnload: function () {
    clearInterval(interval);
  },

  //查询抽奖状态（次数/是否已抽过）
  checkStatus: function () {
    var that = this;
    wx.request({
      url: app.globalData.api + 'wx/wx_draw.ashx',
      data: {
        unionid: wx.getStorageSync('unionid'),
        member_card: wx.getStorageSync('member_card'),
        i: '0'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.code == 'no_bind') {
          wx.removeStorageSync('member_card');
          wx.redirectTo({
            url: '/pages/scoupon/index/index'
          });
          return;
        }
        if (d.code == 'ok') {
          that.setData({
            counts: d.counts || 0,
            drawn: d.drawn == 1
          })
        }
      }
    })
  },

  //点击抽奖按钮：结果由后端决定，前端只播动画
  clickLuck: function () {
    var e = this;

    if (e.data.counts == 0) {
      wx.showModal({
        title: '提示',
        content: e.data.drawn ? '您已参与过抽奖，可在"我的奖品"中查看' : '暂无抽奖次数',
        showCancel: false
      })
      return false;
    }

    //设置按钮不可点击
    e.setData({
      btnconfirm: '/images/dianjichoujiangd.png',
      clickLuck: ''
    })
    clearInterval(interval);

    //请求后端执行抽奖（专属大奖名单优先，其次按会员等级奖品池）
    wx.request({
      url: app.globalData.api + 'wx/wx_draw.ashx',
      data: {
        unionid: wx.getStorageSync('unionid'),
        member_card: wx.getStorageSync('member_card'),
        i: '1'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.code != 'ok') {
          e.recoverBtn();
          if (d.code == 'no_bind') {
            wx.removeStorageSync('member_card');
            wx.redirectTo({
              url: '/pages/scoupon/index/index'
            });
          } else {
            wx.showModal({
              title: '提示',
              content: d.msg || '抽奖失败，请重试',
              showCancel: false
            })
          }
          return;
        }

        var luckPosition = parseInt(d.position);
        if (isNaN(luckPosition) || luckPosition < 0 || luckPosition > 7) {
          luckPosition = 0;
        }
        e.setData({
          luckPosition: luckPosition,
          counts: 0,
          drawn: true,
          prizeName: d.prize_name || '',
          prizeCode: d.prize_code || '',
          isWin: d.is_win == 1
        })

        //启动跑马灯
        var index = 0;
        interval = setInterval(function () {
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
          e.stop(e.data.luckPosition);
        }, 2000)
      },
      fail: function () {
        e.recoverBtn();
        wx.showToast({
          title: '网络异常，请重试',
          icon: 'none'
        });
      }
    })
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
        //1秒后展示结果
        setTimeout(function () {
          if (e.data.isWin) {
            //中奖：展示奖品 + 订阅号关注引导（纯引导，不校验、不拦截领奖）
            e.setData({
              showWin: true
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '谢谢您的参与',
              showCancel: false,
              success: function () {
                e.recoverBtn();
                e.loadAnimation();
              }
            })
          }
        }, 1000);
      }
    }, time);
  },

  //恢复按钮状态
  recoverBtn: function () {
    this.setData({
      btnconfirm: '/images/dianjichoujiang.png',
      clickLuck: 'clickLuck'
    })
  },

  //打开订阅号资料页（纯运营引导，失败不阻断任何流程）
  openOfficial: function () {
    wx.openOfficialAccountProfile({
      username: this.data.ghId,
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '可在微信搜索订阅号名称关注，是否关注不影响领奖',
          showCancel: false
        })
      }
    })
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