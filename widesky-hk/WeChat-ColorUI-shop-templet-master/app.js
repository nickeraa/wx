App({
  onLaunch: function () {
    var t = this;
    // wx.getSystemInfo 已废弃，改用 wx.getWindowInfo
    var win = wx.getWindowInfo();
    t.globalData.StatusBar = win.statusBarHeight;
    var o = wx.getMenuButtonBoundingClientRect();
    t.globalData.Custom = o;
    var n = o.bottom + o.top - win.statusBarHeight;
    (t.globalData.CustomBar = n),
      n > 75 && (t.globalData.tabbar_bottom = "y");
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
      // wx.getSystemInfoSync 已废弃，改用 wx.getDeviceInfo / wx.getAppBaseInfo 组合出兼容的 sysinfo
      var dev = wx.getDeviceInfo(), base = wx.getAppBaseInfo();
      this.globalData.sysinfo = {
        model: dev.model,
        system: dev.system,
        platform: dev.platform,
        version: base.version,
        SDKVersion: base.SDKVersion
      }
  },

  BLEInformation:{
    platform: "",
    deviceId:"",
    writeCharaterId: "",    
    writeServiceId: "",
    notifyCharaterId: "",
    notifyServiceId: "",
    readCharaterId: "",
    readServiceId: "",
  },

  getModel: function () { //获取手机型号
    return this.globalData.sysinfo["model"]
  },
  getVersion: function () { //获取微信版本号
    return this.globalData.sysinfo["version"]
  },
  getSystem: function () { //获取操作系统版本
    return this.globalData.sysinfo["system"]
  },
  getPlatform: function () { //获取客户端平台
    return this.globalData.sysinfo["platform"]
  },
  getSDKVersion: function () { //获取客户端基础库版本
    return this.globalData.sysinfo["SDKVersion"]
  },

  globalData: {
    userInfo: null,
    platform:"",
    screenWidth:wx.getWindowInfo().screenWidth,
    screenHeight:wx.getWindowInfo().screenHeight,
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
