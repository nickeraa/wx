/* ============================================================
 * ydshop/index.js — 商品详情页逻辑
 * 优化项：
 *   1. data 直写，移除 defineProperty 嵌套（减少 ~60 行）
 *   2. previewImage1~4 四合为一 + _buildPreviewUrls 公共工具
 *   3. onGetPhoneNumbergm/gwc 提取 _handlePhoneLogin + _decryptPhone 公共逻辑
 *   4. onShareAppMessage 四分支合并
 *   5. deciyption 添加 fail 回调 + toast
 *   6. setype 简化 setData
 *   7. gw 清理死代码
 *   8. rb 初始值 {} → []
 * ============================================================ */

var e = getApp();

Page({
  /* ==================== data ==================== */
  data: {
    // 状态栏 / 顶栏高度（系统 API 返回，单位 px）
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    iconurlan: e.globalData.iconurl + 'an.png',

    // 轮播配置
    swiperlist: [""],
    autoplay: false,
    indicatorDots: false,
    interval: 4000,
    duration: 500,
    circular: false,
    current: 0, // 当前轮播索引

    // 图片基础路径
    pict: e.globalData.scimgurl,

    // 商品信息
    xf_plu: "",
    pnumber: "",
    index2: null,
    picker2: [],
    store: "",
    storename: "",
    userid: "",
    images: "",
    stock: "",
    xstock: 0,
    stop: false,
    xf_qoh: "",
    xf_desci: "",     // 商品描述
    tbimages1: "",    // 缩略图1
    tbimages2: "",    // 缩略图2
    tbimages3: "",    // 缩略图3
    zwimages1: "",    // 正文图1
    zwimages2: "",    // 正文图2
    zwimages3: "",    // 正文图3
    zwimages4: "",    // 正文图4
    kzm: "",          // 文件扩展名（jpg/mp4）

    // 用户信息
    fxuserid: "",     // 分销用户ID
    fx: "",           // 分销标识
    vipcode: "",      // 会员码
    wxuserid: "",     // 微信用户ID（手机号）
    arr: [],          // 微信授权返回数组

    // 视频播放
    t: "",
    isShow: true,      // 是否显示视频封面
    videoCoverImg: "",
    videoPlayIcon: e.globalData.iconurl + 'an.png',
    videohight: "",    // 视频高度

    // 底部导航栏
    iconList: [
      { icon: "shop", color: "gray", badge: 50, name: "店铺" },
      { icon: "favor", color: "gray", badge: 1, name: "收藏" },
      { icon: "cart", color: "gray", badge: 0, name: "预定单" },
    ],
    gridCol: 3,
    n: 0,              // 预定单角标数字

    // 会员实价/折扣（修复：{} → [], wx:for 遍历数组）
    rb: [],
  },

  /* ==================== 生命周期 ==================== */

  onReady: function () {
    this.videoContext = wx.createVideoContext("myVideo");
  },

  /** 页面加载：接收路由参数并存入 storage */
  onLoad: function (t) {
    if (t.xf_plu) this.setData({ xf_plu: t.xf_plu });
    if (t.vipcode) wx.setStorageSync("vipcode", t.vipcode);
    if (t.fxuserid) wx.setStorageSync("fxuserid", t.fxuserid);
    if (t.wxuserid) wx.setStorageSync("wxuserid", t.wxuserid);
    if (t.d) wx.setStorageSync("d", t.d);
    if (t.fx) {
      wx.setStorageSync("fx", t.fx);
      this.setData({ fx: wx.getStorageSync("fx") });
    }

    // 根据屏幕宽度计算视频容器高度
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ videohight: parseInt(0.75 * res.windowWidth) });
      },
    });
  },

  /** 页面显示：加载商品数据 */
  onShow: function () {
    var that = this;

    // 重置按钮禁用状态
    this.setData({ stop: false });
    this.setData({
      vipcode: wx.getStorageSync("vipcode"),
      wxuserid: wx.getStorageSync("wxuserid"),
    });

    wx.setStorageSync("xf_plu", this.data.xf_plu);
    wx.setStorageSync("starttime", new Date().valueOf());

    // 请求商品详情
    wx.showLoading({ title: "正在加载" });
    wx.request({
      url: e.globalData.api + "wx_cgsearchs.ashx",
      data: { name: that.data.xf_plu},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (res) {
        var timestamp = Date.now() / 1000; // 防止图片缓存
        if (!res.data || !Array.isArray(res.data) || res.data.length === 0 || !res.data[0]) {
          wx.hideLoading();
          wx.showToast({ title: "暂无商品数据", icon: "none", duration: 2000 });
          return;
        }

        var item = res.data[0];
        that.setData({
          replu: res.data,
          tbimages1: res.data[0].TBIMAGES1 ? res.data[0].TBIMAGES1 + "?temp=" + timestamp : "",
          tbimages2: res.data[0].TBIMAGES2 ? res.data[0].TBIMAGES2 + "?temp=" + timestamp : "",
          tbimages3: res.data[0].TBIMAGES3 ? res.data[0].TBIMAGES3 + "?temp=" + timestamp : "",
          zwimages1: res.data[0].ZWIMAGES1 ? res.data[0].ZWIMAGES1 + "?temp=" + timestamp : "",
          zwimages2: res.data[0].ZWIMAGES2 ? res.data[0].ZWIMAGES2 + "?temp=" + timestamp : "",
          zwimages3: res.data[0].ZWIMAGES3 ? res.data[0].ZWIMAGES3 + "?temp=" + timestamp : "",
          zwimages4: res.data[0].ZWIMAGES4 ? res.data[0].ZWIMAGES4 + "?temp=" + timestamp : "",
          xf_plu: res.data[0].XF_PLU,
          itemname: res.data[0].ITEMNAME,
          xf_desci: res.data[0].XF_DESCI,
          kzm: (res.data[0].ZWIMAGES1 || "").substr(-3, 3), // 取后3位判断文件类型
          xstock: res.data[0].XSTOCK || 0
        });

        // 构建轮播图列表
        if (res.data[0].TBIMAGES1) {
          that.setData({ "swiperlist[0]": that.data.pict + res.data[0].XF_PLU + "//" + res.data[0].TBIMAGES1 });
        }
        if (res.data[0].TBIMAGES2) {
          that.setData({ "swiperlist[1]": that.data.pict + res.data[0].XF_PLU + "//" + res.data[0].TBIMAGES2 });
        }
        if (res.data[0].TBIMAGES3) {
          that.setData({ "swiperlist[2]": that.data.pict + res.data[0].XF_PLU + "//" + res.data[0].TBIMAGES3 });
        }

        // 检查收藏状态 & 查询会员价格
        that.checkplu();
        that.checkprice();
        wx.hideLoading();
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({ title: "加载失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },

  /** 页面卸载：记录浏览结束时间 */
  onUnload: function () {
    wx.setStorageSync("endtime", new Date().valueOf());
    if (wx.getStorageSync("vipcode")) {
      this.sevip();
    } else if (wx.getStorageSync("wxuserid")) {
      this.sewx();
    }
  },

  /* ==================== 轮播图 ==================== */

  /** 轮播切换 */
  swiperChange: function (e) {
    this.setData({ current: e.detail.current });
  },

  /** 根据图片宽高计算轮播容器高度 */
  computeImgHeight: function (e) {
    var height = (wx.getSystemInfoSync().windowWidth * e.detail.height) / e.detail.width + "px";
    this.setData({ swiperHeight: height });
  },

  /** 轮播图点击预览 */
  previewImage: function (e) {
    var src = e.target.dataset.src;
    wx.previewImage({ current: src, urls: this.data.swiperlist });
  },

  /* ==================== 正文图片预览（合并原 previewImage1~4） ==================== */

  /**
   * 根据当前商品 zwimages1~4 构建预览 URL 列表
   * @returns {string[]} 所有可预览图片的完整 URL
   */
  _buildPreviewUrls: function () {
    var urls = [];
    var replu = this.data.replu;
    if (!replu || replu.length === 0) return urls;
    var item = replu[0];
    var base = this.data.pict + item.XF_PLU + "//";

    // 服务器可能返回 "null" 字符串，需排除（使用原始图片名，与 WXML src 一致）
    if (item.ZWIMAGES1 && item.ZWIMAGES1.indexOf("null") < 0 && this.data.kzm === "jpg") {
      urls.push(base + item.ZWIMAGES1);
    }
    if (item.ZWIMAGES2 && item.ZWIMAGES2.indexOf("null") < 0) {
      urls.push(base + item.ZWIMAGES2);
    }
    if (item.ZWIMAGES3 && item.ZWIMAGES3.indexOf("null") < 0) {
      urls.push(base + item.ZWIMAGES3);
    }
    if (item.ZWIMAGES4 && item.ZWIMAGES4.indexOf("null") < 0) {
      urls.push(base + item.ZWIMAGES4);
    }
    return urls;
  },

  /** 合并：previewImage1/2/3/4 → previewImageByIndex */
  previewImageByIndex: function (e) {
    var urls = this._buildPreviewUrls();
    if (urls.length === 0) return;
    // 直接从 data-src 取当前图片，避免索引错位
    var current = e.currentTarget.dataset.src || urls[0];
    wx.previewImage({ current: current, urls: urls });
  },

  /* ==================== 视频播放 ==================== */

  bindplay: function () {
    this.setData({ isShow: false });
    this.videoContext.play();
  },

  bindended: function () {
    this.setData({ isShow: true });
  },

  bindpause: function () {
    // 视频暂停回调
  },

  /* ==================== 收藏 / 取消收藏 ==================== */

  /** 添加收藏 */
  insc: function () {
    var that = this;
    wx.request({
      url: e.globalData.api + "wx_insc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (res) {
        if (res.data !== "ok") {
          wx.showToast({ title: "数据出错", icon: "error", duration: 1000 });
        }
      },
    });
  },

  /** 取消收藏 */
  delsc: function () {
    var that = this;
    wx.request({
      url: e.globalData.api + "wx_delsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (res) {
        if (res.data !== "ok") {
          wx.showToast({ title: "数据出错", icon: "error", duration: 1000 });
        }
      },
    });
  },

  /** 检查是否已收藏 */
  checkplu: function () {
    var that = this;
    wx.request({
      url: e.globalData.api + "wx_checksc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (res) {
        if (Array.isArray(res.data) && res.data.length > 0) {
          // 已收藏 → 图标变红实心
          that.setData({
            "iconList[1].name": "已收藏",
            "iconList[1].color": "red",
            "iconList[1].icon": "favorfill"
          });
        }
      },
    });
  },

  /* ==================== 会员价格 ==================== */

  /** 查询会员实价/折扣 */
  checkprice: function () {
    var that = this;
    wx.request({
      url: e.globalData.api + "wx_listsc.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that.data.xf_plu,
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (res) {
        if (Array.isArray(res.data) && res.data.length > 0 && res.data[0]) {
          that.setData({
            rb: res.data,
            sumprice: parseFloat(res.data[0].REALPRICE),
            realprice: parseFloat(res.data[0].REALPRICE),
            xishu: res.data[0].XISHU,
            sumrealprice: parseFloat(res.data[0].REALPRICE),
            xf_desci: res.data[0].XF_DESCI,
            sorts: res.data[0].SORTS,
          });
          // 判断价格是否含小数
          if (that.data.sumprice.toString().indexOf(".") >= 0) {
            that.setData({ xiaoshu: true });
          }
        } else {
          // 无价格数据时清空价格列表
          that.setData({ rb: [] });
        }
      },
    });
  },

  /* ==================== 底部图标操作 ==================== */

  /** 底部导航图标点击（店铺/收藏/预定单） */
  setype: function (ev) {
    var name = ev.currentTarget.dataset.name;
    if (name === "店铺") {
      // 跳转到首页
      e.globalData.m = "1";
      wx.switchTab({ url: "/pages/home/index/index" });
    } else if (name === "收藏") {
      // 收藏操作
      this.setData({
        "iconList[1].name": "已收藏",
        "iconList[1].color": "red",
        "iconList[1].icon": "favorfill"
      });
      this.insc();
    } else if (name === "已收藏") {
      // 取消收藏
      this.setData({
        "iconList[1].name": "收藏",
        "iconList[1].color": "gray",
        "iconList[1].icon": "favor"
      });
      this.delsc();
    } else {
      // 预定单
      wx.switchTab({ url: "/pages/bagsyd/index/index" });
    }
  },

  /* ==================== 手机号授权登录 ==================== */

  /**
   * 公共手机号登录流程
   * @param {object} e       - getPhoneNumber 回调事件对象
   * @param {function} onSuccess - 解密成功后的回调（deciyptiongm 或 deciyptiongwc）
   * @param {boolean} [showLoading=true] - 是否显示 loading
   */
  _handlePhoneLogin: function (e, onSuccess, showLoading) {
    if (this.data.stop) return;
    if (showLoading !== false) showLoading = true;
    if (showLoading) {
      wx.showLoading({ title: '连接中...' });
      this.setData({ stop: true });
    }

    var that = this;
    wx.login({
      success: function (loginRes) {
        if (!loginRes.code) {
          wx.hideLoading();
          that.setData({ stop: false });
          wx.showToast({ title: "登录失败，请重试", icon: "none" });
          return;
        }

        // 调后端接口获取 session_key
        wx.request({
          url: e.globalData.api + "wx_getphone.ashx",
          data: { code: loginRes.code },
          header: { "content-type": "application/json" },
          success: function (res) {
            var arr = (res.data || "").split(",");
            that.setData({ arr: [arr] });

            var sessionKey = arr[1];           // session_key
            var errMsg = e.detail.errMsg;
            var encryptedData = e.detail.encryptedData;
            var iv = e.detail.iv;

            if (errMsg === "getPhoneNumber:ok") {
              // 检查 session 有效性后解密
              wx.checkSession({
                success: function () {
                  onSuccess.call(that, sessionKey, encryptedData, iv);
                },
                fail: function () {
                  wx.hideLoading();
                  that.setData({ stop: false });
                  wx.showToast({ title: "session 过期，请重试", icon: "none" });
                }
              });
            } else {
              wx.hideLoading();
              wx.showModal({
                title: "提示",
                content: "请选择手机号，注册登录喔",
                showCancel: false,
                complete: function () {
                  that.setData({ stop: false });
                },
              });
            }
          },
          fail: function () {
            wx.hideLoading();
            wx.showToast({ title: "获取授权失败", icon: "none" });
          }
        });
      },
    });
  },

  /** 立即预定 → 获取手机号 */
  onGetPhoneNumbergm: function (e) {
    this._handlePhoneLogin(e, this.deciyptiongm);
  },

  /** 加入预定单 → 获取手机号 */
  onGetPhoneNumbergwc: function (e) {
    this._handlePhoneLogin(e, this.deciyptiongwc, true);
  },

  /**
   * 解密手机号（公共逻辑）
   * @param {string} sessionKey
   * @param {string} encryptedData
   * @param {string} iv
   * @param {function} onSuccess - 解密成功后执行的回调（gwjs 或 gw）
   */
  _decryptPhone: function (sessionKey, encryptedData, iv, onSuccess) {
    var that = this;
    wx.request({
      url: e.globalData.api + "wx_getvipphone.ashx",
      data: { sessionID: sessionKey, encryptedData: encryptedData, iv: iv },
      header: { "content-type": "application/json" },
      success: function (res) {
        if (res.data && res.data.phoneNumber) {
          wx.setStorageSync("wxuserid", res.data.phoneNumber);
          that.setData({ wxuserid: res.data.phoneNumber });
          onSuccess.call(that);
        } else {
          wx.hideLoading();
          that.setData({ stop: false });
          wx.showToast({ title: "获取手机号失败", icon: "none" });
        }
      },
      fail: function () {
        wx.hideLoading();
        that.setData({ stop: false });
        wx.showToast({ title: "手机号解密失败，请重试", icon: "none" });
      }
    });
  },

  /** 解密手机号 → 立即预定 */
  deciyptiongm: function (sessionKey, encryptedData, iv) {
    this._decryptPhone(sessionKey, encryptedData, iv, this.gwjs);
  },

  /** 解密手机号 → 加入预定单 */
  deciyptiongwc: function (sessionKey, encryptedData, iv) {
    this._decryptPhone(sessionKey, encryptedData, iv, this.gw);
  },

  /* ==================== 预定操作 ==================== */

  /** 立即预定：先检查库存 → 跳转到下单页 */
  gwjs: function () {
    if (this.data.stop) return;
    wx.showLoading({ title: '连接中...' });
    this.setData({ stop: true });

    var that = this;
    wx.request({
      url: e.globalData.api + "wx_checkxstock.ashx",
      data: { xf_plu: this.data.xf_plu},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (res) {
        var stock = 0;
        if (Array.isArray(res.data) && res.data.length > 0 && res.data[0]) {
          stock = parseInt(res.data[0].XSTOCK);
          if (isNaN(stock)) stock = 0;
        }
        if (stock > 0) {
          // 有库存 → 跳转下单页
          wx.navigateTo({
            url: "/pages/deposityd/index/index?xf_plu=" + that.data.xf_plu,
          });
        } else {
          wx.showModal({
            title: "提示",
            content: "已订完，数量为零",
            showCancel: false,
            complete: function () {
              that.setData({ stop: false });
            },
          });
        }
        wx.hideLoading();
      },
      fail: function () {
        wx.hideLoading();
        that.setData({ stop: false });
        wx.showToast({ title: "网络异常，请重试", icon: "none", duration: 2000 });
      },
    });
  },

  /** 加入预定单 */
  gw: function () {
    var that = this;
    // 售罄预检：详情 API 已加载 xstock 到本地，直接拦截
    var stock = parseInt(that.data.xstock);
    if (!isNaN(stock) && stock <= 0) {
      wx.showModal({
        title: "提示",
        content: "已订完，数量为零",
        showCancel: false,
      });
      return;
    }
    wx.request({
      url: e.globalData.api + "wx_insertyd.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: that.data.xf_plu,
        qty: "1",
        fxuserid: wx.getStorageSync("fxuserid"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (res) {
        if (res.data === "ok") {
          // 更新预定单角标计数
          if (!wx.getStorageSync("n")) wx.setStorageSync("n", "0");
          wx.setStorageSync("n", (parseInt(wx.getStorageSync("n")) + 1).toString());
          that.setData({ n: wx.getStorageSync("n") });
          wx.showToast({ title: "已加入预定单", icon: "success", duration: 1500 });
        } else {
          wx.showToast({ title: "数据出错", icon: "error", duration: 1000 });
        }
      },
      fail: function () {
        wx.showToast({ title: "操作失败，请重试", icon: "none", duration: 2000 });
      },
    });
  },

  /* ==================== 浏览历史记录 ==================== */

  /** VIP 会员浏览记录 */
  sevip: function () {
    wx.request({
      url: e.globalData.api + "wx_history.ashx",
      data: {
        vipcode: wx.getStorageSync("vipcode"),
        xf_plu: wx.getStorageSync("xf_plu"),
        starttime: wx.getStorageSync("starttime"),
        endtime: wx.getStorageSync("endtime"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function () {},
      fail: function () {
        // 浏览记录提交非关键功能，静默降级
      },
    });
  },

  /** 微信用户浏览记录 */
  sewx: function () {
    wx.request({
      url: e.globalData.api + "wx_historywx.ashx",
      data: {
        wxuserid: wx.getStorageSync("wxuserid"),
        xf_plu: wx.getStorageSync("xf_plu"),
        starttime: wx.getStorageSync("starttime"),
        endtime: wx.getStorageSync("endtime"),
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function () {},
      fail: function () {
        // 浏览记录提交非关键功能，静默降级
      },
    });
  },

  /* ==================== 分享 ==================== */

  /**
   * 微信分享配置（合并原 4 分支逻辑）
   * 优先级：d参数 > vipcode > wxuserid > 默认
   */
  onShareAppMessage: function () {
    var that = this;
    var basePath = "/pages/shopcg/goods/index?xf_plu=" + this.data.xf_plu;

    // 根据用户身份确定 fxuserid 和分享路径
    var fxuserid, sharePath;
    if (wx.getStorageSync("d")) {
      // 带 VIP 参数分享
      fxuserid = wx.getStorageSync("yguserid");
      sharePath = basePath + "&fxuserid=" + fxuserid + "&vipcode=" + wx.getStorageSync("vipcode") + "&fx=1";
    } else if (wx.getStorageSync("vipcode")) {
      // VIP 会员分享
      fxuserid = wx.getStorageSync("vipcode");
      sharePath = basePath + "&fxuserid=" + fxuserid + "&fx=1";
    } else if (wx.getStorageSync("wxuserid")) {
      // 微信用户分享
      fxuserid = wx.getStorageSync("wxuserid");
      sharePath = basePath + "&fxuserid=" + fxuserid + "&fx=1";
    } else {
      // 默认分享
      sharePath = basePath + "&fx=1";
    }

    return {
      title: "广天藏品 " + that.data.xf_desci,
      path: sharePath,
      imageUrl: that.data.pict + that.data.xf_plu + "//" + that.data.tbimages1,
    };
  },

  /* ==================== 返回 ==================== */

  /** 返回上一页或跳转首页 */
  back: function () {
    e.globalData.m = "1";
    if (this.data.fx === "1") {
      // 分销入口进来的 → 跳首页
      e.globalData.m = "2";
      wx.switchTab({ url: "/pages/home/index/index" });
    } else {
      wx.navigateBack({ delta: 1 });
    }
  },
});
