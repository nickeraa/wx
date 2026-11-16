// 金银币寄卖 - 员工开单页（一单多货品，每货品至少3张照片）
// 流程：店铺登录(jzb)菜单进入 → 逐个货品填写+拍照 → 生成寄卖单 → 出示小程序码给客户扫码
var app = getApp();

function newItem() {
  return { imgs: [], goodsName: '', price: '', qty: 1 };
}

Page({
  data: {
    StatusBar: 20,
    CustomBar: 45,
    userid: '',
    // 货品列表（可增删）
    goodsList: [newItem()],
    maxGoods: 10,
    minPhotos: 3,
    maxPhotos: 3,
    totalPrice: 0,
    totalQty: 0,
    validCount: 0,
    uploading: false,     // 任一项图片上传中
    submitting: false,
    // 二维码弹窗
    showQrcode: false,
    qrcodeImg: '',
    qrcodeOrderNo: '',
    // 我的寄卖单列表
    orders: [],
    ordersLoaded: false,
    // 整单备注（员工选填）
    remark: '',
    // 员工店铺信息（页面顶部显示）
    shopNo: '',
    shopName: '',
    // 仅显示列表视图（从"我的寄卖单"入口进入时隐藏开单表单）
    onlyList: false
  },

  onLoad: function (options) {
    var e = this;
    e.setData({
      StatusBar: app.globalData.StatusBar,
      CustomBar: app.globalData.CustomBar
    });
    // 从"我的寄卖单"入口进入（?view=list）：只显示寄卖单列表
    if (options && options.view === 'list') {
      e.setData({ onlyList: true });
    }
    // 登录态：必须先在店铺登录(jzb)完成登录
    var userid = (wx.getStorageSync('userid') || '').trim();
    if (!userid) {
      wx.showModal({
        title: '提示',
        content: '请先在店铺登录页完成登录',
        showCancel: false,
        success: function () { wx.navigateBack(); }
      });
      return;
    }
    e.setData({ userid: userid });
    e.loadShopInfo();
    // 开单视图不拉寄卖单列表（列表在 ?view=list 入口才显示）
    if (e.data.onlyList) e.loadOrders();
  },

  // 员工店铺信息（顶部显示店铺编号/名称）：员工自选归属优先，否则默认店铺
  loadShopInfo: function () {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_jmjm_shop.ashx',
      method: 'POST',
      data: { userid: e.data.userid, action: 'current' },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          e.setData({ shopNo: d.shop_no || '', shopName: d.shop_name || '' });
        }
      }
    });
  },

  onShow: function () {
    if (this.data.userid && this.data.onlyList) this.loadOrders();
  },

  // 整单备注
  onRemark: function (ev) {
    this.setData({ remark: ev.detail.value });
  },

  // ==================== 货品增删 ====================
  addGoods: function () {
    var e = this;
    if (e.data.goodsList.length >= e.data.maxGoods) {
      wx.showToast({ title: '最多添加' + e.data.maxGoods + '件货品', icon: 'none' });
      return;
    }
    var list = e.data.goodsList.concat([newItem()]);
    e.setData({ goodsList: list });
    e.calcTotal();
  },

  removeGoods: function (ev) {
    var e = this;
    var idx = ev.currentTarget.dataset.index;
    if (e.data.goodsList.length <= 1) {
      wx.showToast({ title: '至少保留一件货品', icon: 'none' });
      return;
    }
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除货品 ' + (idx + 1) + '？',
      success: function (res) {
        if (!res.confirm) return;
        var list = that.data.goodsList.slice();
        list.splice(idx, 1);
        that.setData({ goodsList: list });
        that.calcTotal();
      }
    });
  },

  // ==================== 拍照上传（每货品多图） ====================
  choosePhoto: function (ev) {
    var e = this;
    var idx = ev.currentTarget.dataset.index;
    if (e.data.uploading) {
      wx.showToast({ title: '图片上传中，请稍候', icon: 'none' });
      return;
    }
    var item = e.data.goodsList[idx];
    if (!item) return;
    if (item.imgs.length >= e.data.maxPhotos) {
      wx.showToast({ title: '最多上传' + e.data.maxPhotos + '张照片', icon: 'none' });
      return;
    }
    var remain = e.data.maxPhotos - item.imgs.length;
    wx.chooseMedia({
      count: remain,
      mediaType: ['image'],
      sourceType: ['camera', 'album'],
      success: function (res) {
        // 先把本地图占位显示出来，再逐张上传
        var files = res.tempFiles || [];
        var key = 'goodsList[' + idx + '].imgs';
        var list = (e.data.goodsList[idx].imgs || []).slice();
        var startPos = list.length;
        for (var i = 0; i < files.length && list.length < e.data.maxPhotos; i++) {
          list.push({ temp: files[i].tempFilePath, url: '', path: '' });
        }
        var upd = {};
        upd[key] = list;
        e.setData(upd);
        e.uploadAll(idx, startPos);
      }
    });
  },

  // 顺序上传该货品从 startPos 起所有未上传的图
  uploadAll: function (idx, startPos) {
    var e = this;
    var item = e.data.goodsList[idx];
    if (!item) return;
    var pos = startPos;
    var step = function () {
      var cur = e.data.goodsList[idx];
      if (!cur) return;
      while (pos < cur.imgs.length && cur.imgs[pos].url) pos++;
      if (pos >= cur.imgs.length) {
        e.setData({ uploading: false });
        return;
      }
      var tmp = cur.imgs[pos].temp;
      e.setData({ uploading: true });
      e.uploadOne(idx, pos, tmp, function () {
        pos++;
        step();
      });
    };
    step();
  },

  // 上传单张：寄卖照片专用 wx_jmjm_img.ashx（存服务器 jmimgs 目录），返回完整 URL
  // 上传前压缩，规避服务器 4MB 请求体限制；其他模块的拍照上传仍走 wx_postimg.ashx 不变
  uploadOne: function (idx, pindex, tmp, done) {
    var e = this;

    var doUpload = function (path) {
      wx.uploadFile({
        url: app.globalData.api + 'wx_jmjm_img.ashx',
        filePath: path,
        name: 'imgfile',
        formData: { method: 'POST' },
        success: function (up) {
          var raw = (up.data || '').trim();
          var rel = '';
          var url = '';
          if (raw.indexOf('{') === 0) {
            try {
              var d = JSON.parse(raw);
              rel = d.url || '';
            } catch (err) { rel = ''; }
          } else if (raw && raw.indexOf('<') !== 0) {
            rel = raw;
          }
          if (/^https?:\/\//i.test(rel)) {
            // 兼容返回完整 URL：反解出 /jmimgs/ 相对路径用于入库（服务器本地直读）
            url = rel;
            rel = rel.replace(/^[^\/]+:\/\/[^\/]+/, '').replace(/^\/+/, '');
            if (rel.indexOf('jmimgs/') !== 0) rel = '/jmimgs/' + rel;
          } else if (rel) {
            rel = rel.replace(/^\/+/, '').replace(/^jmimgs\//i, '');
            url = app.globalData.api + 'jmimgs/' + rel;
          }

          var upd = {};
          if (url) {
            upd['goodsList[' + idx + '].imgs[' + pindex + '].url'] = url;
            upd['goodsList[' + idx + '].imgs[' + pindex + '].path'] = '/jmimgs/' + rel.replace(/^\/+/, '').replace(/^jmimgs\//, '');
          } else {
            // 上传失败：移除这张占位图
            var list = (e.data.goodsList[idx].imgs || []).slice();
            list.splice(pindex, 1);
            upd['goodsList[' + idx + '].imgs'] = list;
            wx.showToast({
              title: '上传失败(' + up.statusCode + ')，请重试',
              icon: 'none',
              duration: 3000
            });
          }
          e.setData(upd);
          if (done) done();
        },
        fail: function (err) {
          var list = (e.data.goodsList[idx].imgs || []).slice();
          list.splice(pindex, 1);
          var u3 = {};
          u3['goodsList[' + idx + '].imgs'] = list;
          e.setData(u3);
          wx.showToast({
            title: '上传失败：' + ((err && err.errMsg) || '网络异常'),
            icon: 'none',
            duration: 3000
          });
          if (done) done();
        }
      });
    };

    wx.compressImage({
      src: tmp,
      quality: 70,
      success: function (c) { doUpload(c.tempFilePath); },
      fail: function () { doUpload(tmp); }
    });
  },

  removePhoto: function (ev) {
    var e = this;
    var idx = ev.currentTarget.dataset.index;
    var pindex = ev.currentTarget.dataset.pindex;
    var list = (e.data.goodsList[idx].imgs || []).slice();
    list.splice(pindex, 1);
    var upd = {};
    upd['goodsList[' + idx + '].imgs'] = list;
    e.setData(upd);
  },

  previewPhoto: function (ev) {
    var idx = ev.currentTarget.dataset.index;
    var pindex = ev.currentTarget.dataset.pindex || 0;
    var item = this.data.goodsList[idx];
    if (!item || !item.imgs.length) return;
    var urls = [];
    for (var i = 0; i < item.imgs.length; i++) {
      urls.push(item.imgs[i].url || item.imgs[i].temp);
    }
    wx.previewImage({ current: urls[pindex], urls: urls });
  },

  // ==================== 表单输入 ====================
  onGoodsName: function (ev) {
    var idx = ev.currentTarget.dataset.index;
    var upd = {};
    upd['goodsList[' + idx + '].goodsName'] = ev.detail.value;
    this.setData(upd, this.calcTotal);
  },
  onPrice: function (ev) {
    var idx = ev.currentTarget.dataset.index;
    // 只允许数字和一个小数点，其余字符直接过滤
    var v = String(ev.detail.value || '').replace(/[^\d.]/g, '');
    var first = v.indexOf('.');
    if (first > -1) {
      v = v.slice(0, first + 1) + v.slice(first + 1).replace(/\./g, '');
    }
    var upd = {};
    upd['goodsList[' + idx + '].price'] = v;
    this.setData(upd, this.calcTotal);
  },
  onQty: function (ev) {
    var idx = ev.currentTarget.dataset.index;
    var n = parseInt(ev.detail.value) || 1;
    var upd = {};
    upd['goodsList[' + idx + '].qty'] = n < 1 ? 1 : n;
    this.setData(upd, this.calcTotal);
  },
  qtyMinus: function (ev) {
    var idx = ev.currentTarget.dataset.index;
    var it = this.data.goodsList[idx];
    if (!it) return;
    var upd = {};
    upd['goodsList[' + idx + '].qty'] = it.qty > 1 ? it.qty - 1 : 1;
    this.setData(upd, this.calcTotal);
  },
  qtyPlus: function (ev) {
    var idx = ev.currentTarget.dataset.index;
    var it = this.data.goodsList[idx];
    if (!it) return;
    var upd = {};
    upd['goodsList[' + idx + '].qty'] = (it.qty || 0) + 1;
    this.setData(upd, this.calcTotal);
  },

  // 已添加货品数 / 合计金额 / 合计数量（只统计"名称+价格+数量"都填好的项）
  calcTotal: function () {
    var list = this.data.goodsList || [];
    var tp = 0, tq = 0, vc = 0;
    for (var i = 0; i < list.length; i++) {
      var p = parseFloat(list[i].price);
      var q = parseInt(list[i].qty) || 0;
      var ok = !!(list[i].goodsName && !isNaN(p) && p > 0 && q > 0);
      if (ok) {
        vc++;
        tp += p * q;
        tq += q;
      }
    }
    this.setData({ validCount: vc, totalPrice: tp.toFixed(2), totalQty: tq });
  },

  // ==================== 提交开单 ====================
  submitOrder: function () {
    var e = this;
    if (e.data.submitting) return;
    if (e.data.uploading) {
      wx.showToast({ title: '图片上传中，请稍候', icon: 'none' });
      return;
    }
    var list = e.data.goodsList || [];
    var items = [];
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      var no = i + 1;
      if (!it.goodsName) {
        wx.showToast({ title: '请填写第' + no + '件货品名称', icon: 'none' });
        return;
      }
      var price = parseFloat(it.price);
      if (isNaN(price) || price <= 0) {
        wx.showToast({ title: '第' + no + '件寄售价格不正确', icon: 'none' });
        return;
      }
      if (!it.qty || it.qty < 1) {
        wx.showToast({ title: '第' + no + '件寄售数量不正确', icon: 'none' });
        return;
      }
      // 照片：至少 3 张且全部上传完成；入库传相对路径 /jmimgs/...（服务器本地直读）
      var urls = [];
      var pending = false;
      for (var k = 0; k < it.imgs.length; k++) {
        if (it.imgs[k].path) urls.push(it.imgs[k].path);
        else if (it.imgs[k].url) urls.push(it.imgs[k].url);
        else pending = true;
      }
      if (pending) {
        wx.showToast({ title: '第' + no + '件照片还在上传，请稍候', icon: 'none' });
        return;
      }
      if (urls.length < e.data.minPhotos) {
        wx.showToast({ title: '第' + no + '件货品至少上传' + e.data.minPhotos + '张照片', icon: 'none' });
        return;
      }
      items.push({
        name: it.goodsName,
        price: price,
        qty: it.qty,
        imgs: urls
      });
    }

    e.setData({ submitting: true });
    wx.request({
      url: app.globalData.api + 'wx_jmjm_create.ashx',
      method: 'POST',
      data: {
        userid: e.data.userid,
        items: JSON.stringify(items),
        remark: (e.data.remark || '').trim(),
        shop_no: e.data.shopNo || ''
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0 && d.order_no) {
          e.genQrcode(d.order_no);
          // 重置表单
          e.setData({ goodsList: [newItem()], totalPrice: 0, totalQty: 0, validCount: 0, remark: '' });
          e.loadOrders();
        } else {
          wx.showToast({ title: d.errmsg || '开单失败，请重试', icon: 'none', duration: 2500 });
        }
      },
      fail: function () {
        wx.showToast({ title: '网络异常，请重试', icon: 'none' });
      },
      complete: function () {
        e.setData({ submitting: false });
      }
    });
  },

  // 生成带参小程序码（客户扫码进入确认页）
  genQrcode: function (orderNo) {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_jmjm_qrcode.ashx',
      data: { order_no: orderNo },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0 && d.qrcode) {
          e.setData({ showQrcode: true, qrcodeImg: d.qrcode, qrcodeOrderNo: orderNo });
        } else {
          wx.showModal({
            title: '寄卖单已创建',
            content: '单号 ' + orderNo + '\n二维码生成失败：' + (d.errmsg || ('HTTP ' + (res.statusCode || ''))),
            showCancel: false
          });
        }
      },
      fail: function (err) {
        wx.showModal({
          title: '寄卖单已创建',
          content: '单号 ' + orderNo + '\n二维码生成失败：' + ((err && err.errMsg) || '网络异常'),
          showCancel: false
        });
      }
    });
  },

  // 阻止弹窗内部点击冒泡关闭
  noop: function () {},

  // 预览二维码（长按可保存）
  previewQrcode: function () {
    var e = this;
    if (e.data.qrcodeImg) {
      wx.previewImage({ urls: [e.data.qrcodeImg] });
    }
  },
  closeQrcode: function () {
    this.setData({ showQrcode: false });
  },

  // ==================== 签署详情 ====================
  // 点击状态标签：已签署单跳转签署详情页（货号/名称/数量/价格/客户/电话/图片）
  showOrderDetail: function (ev) {
    var e = this;
    var no = ev.currentTarget.dataset.no;
    var order = null;
    for (var i = 0; i < e.data.orders.length; i++) {
      if (e.data.orders[i].order_no === no) { order = e.data.orders[i]; break; }
    }
    if (!order) return;
    if (order.status !== 2) {
      wx.showToast({ title: '待客户签署完成后可查看', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/pages/jmjm/detail/index?no=' + no
    });
  },

  // ==================== 我的寄卖单 ====================
  loadOrders: function () {
    var e = this;
    wx.request({
      url: app.globalData.api + 'wx_jmjm_create.ashx',
      method: 'POST',
      data: { userid: e.data.userid, action: 'list' },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      success: function (res) {
        var d = res.data || {};
        if (d.errcode === 0) {
          var list = d.list || [];
          for (var i = 0; i < list.length; i++) {
            var st = list[i].status;
            list[i].statusText = st === 0 ? '生成寄卖单二维码' : st === 1 ? '待签署' : st === 2 ? '已签署' : '重新签署';
            list[i].statusClass = st === 0 ? 'st-wait' : st === 1 ? 'st-signing' : st === 2 ? 'st-done' : 'st-retry';
          }
          e.setData({ orders: list, ordersLoaded: true });
          // 待签署单静默回查电子签真实状态（短信签署的客户不会回到小程序，
          // 回调也可能未配置/丢失；员工每次进列表都会触发回查兜底落库）
          e.recheckPending(list);
        } else {
          e.setData({ ordersLoaded: true });
        }
      },
      fail: function () {
        e.setData({ ordersLoaded: true });
      }
    });
  },

  // 待签署单逐个静默回查（wx_jmjm_status.ashx 内部按 FlowId 调 DescribeFlowInfo，
  // 完成即落库 STATUS=2），全部查完后重拉列表刷新标签
  recheckPending: function (list) {
    var e = this;
    var pending = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].status === 1 && list[i].order_no) pending.push(list[i].order_no);
    }
    if (!pending.length) return;
    var done = 0;
    var next = function () {
      if (done < pending.length) {
        var no = pending[done++];
        wx.request({
          url: app.globalData.api + 'wx_jmjm_status.ashx',
          method: 'GET',
          data: { order_no: no },
          dataType: 'json',
          complete: next
        });
      } else {
        // 有回查过才刷新列表（否则避免死循环）
        e.loadOrders();
      }
    };
    next();
  },

  // 点击列表项：未填写/待签署的单据重新弹出二维码（客户扫码进确认页填写或继续签署）
  showOrderQrcode: function (ev) {
    var e = this;
    var idx = ev.currentTarget.dataset.index;
    var o = e.data.orders[idx];
    if (!o) return;
    if (o.status === 0 || o.status === 1) {
      e.genQrcode(o.order_no);
    } else if (o.status === 9) {
      wx.navigateTo({ url: '/pages/jmjm/confirm/index?no=' + o.order_no });
    } else {
      wx.showToast({ title: o.statusText, icon: 'none' });
    }
  },

  goBack: function () {
    wx.navigateBack();
  }
});
