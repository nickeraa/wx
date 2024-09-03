App({
  onLaunch: function () {
    var t = this;
    wx.getSystemInfo({
      success: function (a) {
        t.globalData.StatusBar = a.statusBarHeight;
        var o = wx.getMenuButtonBoundingClientRect();
        t.globalData.Custom = o;
        var n = o.bottom + o.top - a.statusBarHeight;
        (t.globalData.CustomBar = n),
          n > 75 && (t.globalData.tabbar_bottom = "y");
      },
    });
    var a = wx.getUpdateManager();
    a.onCheckForUpdate(function (t) {}),
      a.onUpdateReady(function () {
        wx.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success: function (t) {
            t.confirm && a.applyUpdate();
          },
        });
      }),
      a.onUpdateFailed(function () {});
  },
  globalData: {
    userInfo: null,
    appusername: null,
    appuserid: null,
    appopenid: null,
    phone: null,
    tt: "",
    imgUrl: "https://widesky.work/HKback/upload/",
    hkimgUrl: "https://widesky.work/hkimg/",
    scimgUrl: "https://widesky.work/scimg/",
    api: "https://widesky.work/HKback/",
  },
});
