App({
  data: { yguserid: "" },
  onLaunch: function (t) {
    var a = this;
    wx.getSystemInfo({
      success: function (t) {
        a.globalData.StatusBar = t.statusBarHeight;
        var e = wx.getMenuButtonBoundingClientRect();
        a.globalData.Custom = e;
        var o = e.bottom + e.top - t.statusBarHeight;
        (a.globalData.CustomBar = o),
          o > 75 && (a.globalData.tabbar_bottom = "y");
      },
    }),
      console.log(this.data),
      t.referrerInfo.extraData &&
        (console.log(t.referrerInfo.extraData),
        wx.removeStorageSync("yguserid"),
        wx.setStorageSync("yguserid", t.referrerInfo.extraData.yguserid),
    //    wx.removeStorageSync("vipcode"),
      //  wx.setStorageSync("vipcode", t.referrerInfo.extraData.vipcode),
     //   wx.removeStorageSync("fnumber"),
      //  wx.setStorageSync("fnumber", t.referrerInfo.extraData.fnumber),
        console.log(wx.getStorageSync("yguserid")));
        
    var e = wx.getUpdateManager();
    e.onCheckForUpdate(function (t) {}),
      e.onUpdateReady(function () {
        wx.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success: function (t) {
            t.confirm && e.applyUpdate();
          },
        });
      }),
      e.onUpdateFailed(function () {});
  },
  globalData: {
    p: "",
    n: 0,
    m: "",
    k: "",
    q: "",
    z: "",
    d: !1,
    bq: "",
    bd: !1,
    cq: "",
    cd: !1,
    imgUrls: "https://widesky.work/HKback/upload/",
    imgUrl: "https://widesky.work/scimg/widesky/",
    hkimgUrl: "https://widesky.work/hkimg/",
    scimgurl: "https://widesky.work/scimg/",
    wximgurl: "https://widesky.work/",
    api: "https://widesky.work/hkback/",
  },
});
