const app = getApp();
var t = require("../../../utils/util.js"),
 e = require("../../../utils/butil");

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabbarBot: app.globalData.tabbar_bottom,
tag:true,
    ly_text: "点击搜索打印机",
    connected_ly: false, //蓝牙按钮是否显示
    blue_list_ly: false, //蓝牙连接列表显示
    discoveryStarted: false,
    devices: [], //已发现的蓝牙设备列表
    name: '', //已连接的设备名称
    deviceId: '', //已连接的设备deviceId
    chs: [],
    canWrite: false,
    flag: true,
    colors: '',
    lianjie: '连接',
    susername:'',
    todate:'',
    code: "",
    codeStr: "",
    zjuser:''


  },

  onShow() {

    this.setData({

      colors: 'text-default',
      susername:wx.getStorageSync('zjusername'),
      zjuser:wx.getStorageSync('zjuserid'),


    })



  },

onLoad()
{


  var e = t.formatDate(new Date());
  this.setData({ todate: e });

},


//4合1
convert4to2(res) {
  let arr=[]
  for (let i = 0; i < res.length; i++) {
    if (i % 4 == 0) {
      let rule = 0.29900 * res[i] + 0.58700 * res[i + 1] + 0.11400 * res[i + 2];
        if (rule > 200) {
          res[i] = 0;
        } else {
          res[i] = 1;
        }
        arr.push(res[i]);
    }
  }
  return arr;
},
//8合1
convert8to1(arr) {
  let data = [];
  for (let k = 0; k < arr.length; k += 8) {
    let temp = arr[k] * 128 + arr[k + 1] * 64 + arr[k + 2] * 32 + arr[k + 3] * 16 + arr[k + 4] * 8 + arr[k + 5] * 4 + arr[k + 6] * 2 + arr[k + 7] * 1
    data.push(temp);
  }
  return data;
},


creatcode()
{

  var t =this.data.zjuser+'-'+this.data.todate;
 // var t ="LCJ-2024-09-05";
(0, e.toQrcode)("qrcode", t, 120, 120);
var a = t;
    console.log(a);
    this.setData({ code: t, codeStr: a }),


this.codeing();

    setTimeout(function () {
      wx.hideToast();
    }, 1000);
},


codeing()
{
  wx.showToast({ title: "普通二维码", icon: "loading", duration: 1000 }),
  this.createNewImg(),
  setTimeout(function () {
    wx.hideToast();
  }, 2000);

},

createNewImg: function () {
  var e = this;
  setTimeout(function () {
    wx.canvasToTempFilePath({
      canvasId: "qrcode",
      success: function (t) {
        var a = t.tempFilePath;
        e.setData({ imagePath: a }),
          console.log(e.data.imagePath);
        //  e.eventDraw();
      },
      fail: function (e) {
        console.log(e);
      },
    });
  }, 1000);

e.setData({tag:false})

},

dycode()
{

  let {deviceId}=this.data.inactive[0]
  // wx.showLoading({
  //   mask:true,
  //   title:'打印中请稍等'
  // })
  this.printImgT(deviceId, this.data.parameter);
  // this.writeBLECharacteristicValue(0)
  console.log('执行完毕')


  
},



  /**
   * 第一步 判断初始化蓝牙模块是否可用
   */
  openBluetoothAdapter() {
    if (!wx.openBluetoothAdapter) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
      return
    }
    this.openBluetoothAdapters()
  },
  /**
   * 第二步 初始化蓝牙模块
   */
  openBluetoothAdapters() {
    this.setData({
      flag: !this.data.flag
    })
    if (!this.data.flag) {
      this.setData({
        ly_text: '搜索设备中'
      })
    } else {
      this.setData({
        ly_text: '点击搜索'
      })
      return false;

    }
    wx.openBluetoothAdapter({ //请求打开蓝牙情况
      success: res => {
        //console.log('初始化蓝牙模块->res:', res)
        this.startBluetoothDevicesDiscovery(); //打开蓝牙后 开始搜索
      },
      fail: err => {
        console.log('初始化蓝牙模块->err:', err)
        // 错误码	错误信息	说明
        // 0	ok	正常
        // -1	already connect	已连接
        // 10000	not init	未初始化蓝牙适配器
        // 10001	not available	当前蓝牙适配器不可用
        // 10002	no device	没有找到指定设备
        // 10003	connection fail	连接失败
        // 10004	no service	没有找到指定服务
        // 10005	no characteristic	没有找到指定特征
        // 10006	no connection	当前连接已断开
        // 10007	property not support	当前特征不支持此操作
        // 10008	system error	其余所有系统上报的异常
        // 10009	system not support	Android 系统特有，系统版本低于 4.3 不支持 BLE
        // 10012	operate time out	连接超时
        // 10013	invalid_data	连接 deviceId 为空或者是格式不正确
        // object.fail 回调函数返回的 state 参数（仅 iOS）
        // 状态码	说明
        // 0	未知
        // 1	重置中
        // 2	不支持
        // 3	未授权
        // 4	未开启
        if (err.errCode === 10001) { //10001 当前蓝牙适配器不可用
          wx.showModal({
            title: '错误',
            content: '当前蓝牙适配器不可用，请打开手机蓝牙后重试！',
            showCancel: false
          });
          //监听蓝牙适配器状态变化事件
          wx.onBluetoothAdapterStateChange(res => {
            console.log('蓝牙适配器是否可用->res:', res);
            if (res.available) { //available=true 蓝牙适配器可用
              wx.onBluetoothAdapterStateChange(() => {});
              this.startBluetoothDevicesDiscovery();
            }
          })
        } else {
          wx.showModal({
            title: '错误',
            content: `错误码:[${err.errCode}] 错误信息:[${err.errMsg}]`,
            showCancel: false
          });
        }
      }
    });
  },
  /** 
   * 第三步 开始搜寻附近的蓝牙外围设备
   */
  startBluetoothDevicesDiscovery() {
    this.data.discoveryStarted = true
    wx.startBluetoothDevicesDiscovery({
      success: res => {
        console.log('开始搜寻附近的蓝牙外围设备->res', res)
        this.onBluetoothDeviceFound(); //蓝牙搜索成功后监听搜索
      },
      fail: (err) => {
        console.log('开始搜寻附近的蓝牙外围设备->err', err)
      }
    })
  },

  /**
   * 第四步 监听搜索到新设备的事件
   */
  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound(res => {
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return
        }
        let foundDevices = this.data.devices || []
        let idx = this.inArray(foundDevices, 'deviceId', device.deviceId);
        if (idx === -1) {
          this.data.devices.push(device);
          console.log('发现新设备：', device); //添加新设备
        } else {
          this.data.devices[idx] = device; //更新设备数据
        }
      })
      if (this.data.devices.length >= 1) {
        this.setData({
          blue_list_ly: true,
          ly_text: '发现设备'
        })

      } else {
        this.setData({
          ly_text: '未发现设备'
        })
      }
      this.setData({
        devices: this.data.devices
      })
    })
  },
  /**
   * 第五步 连接蓝牙低功耗设备
   * @param {手动点击连接蓝牙事件}
   * @param {创建连接蓝牙}
   * @param {如果已经连接过可直接连接}
   */
  _createBLEConnection(e) {



    let idx = e.currentTarget.id
    let name = this.data.devices[idx].name
    let deviceId = this.data.devices[idx].deviceId
    this.setData({
      name,
      deviceId
    })
    console.log(name)
    //连接蓝牙低功耗设备。
    // 若小程序在之前已有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需再次进行搜索操作
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        console.log('连接蓝牙低功耗设备->res：', res);
        this.setData({
          blue_list_ly: false,
          connected_ly: true,
          ly_text: '已连接',
          colors: 'text-green'

        })
        //获取蓝牙->保存到缓存
        this.getBLEDeviceServices(deviceId);
        wx.setStorage({
          key: LAST_CONNECTED_DEVICE,
          data: {
            name,
            deviceId
          }
        })
      },
      fail: (err) => {
        console.log('连接蓝牙低功耗设备->err', err.errno);
        this.setData({
          connected_ly: false,
          ly_text: '连接失败',
          colors: 'text-default'
        
        })
      }
    })
    this.stopBluetoothDevicesDiscovery();
  },
  /**
   * 第六步 停止搜寻附近的蓝牙外围设备
   * @param {蓝牙连接成功关闭监听搜索}
   * @param {蓝牙搜索比较消耗资源}
   */
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery({
      complete: () => {
        console.log('停')
        this.data.discoveryStarted = false
      }
    })
  },
  /**
   * 第七步 断开与蓝牙低功耗设备的连接
   * @param {蓝牙连接成功关闭搜索}
   * @param {功能}
   */
  closeBLEConnection(e) {
    wx.closeBLEConnection({
      deviceId: e.deviceId
    })
    this.connected_ly = false;
  },
  /**
   * 第八步  获取蓝牙低功耗设备所有服务
   * @param {蓝牙功能查询}
   * @param {蓝牙连接成功后}
   * @param {找到主要服务功能}
   */
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        for (let i = 0; i < res.services?.length; i++) {
          //该服务是否为主服务
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid);
            return
          }
        }
      }
    })
  },
  /**
   * 第九步 获取蓝牙低功耗设备某个服务中所有特征 
   * @param {蓝牙功能特征查询}
   * @param {主要功能的特性}
   * @param {找到主要服务功能的特征}
   * @param {到此步骤连接结束}
   */
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    //获取蓝牙低功耗设备某个服务中所有特征 (characteristic)
    // read	boolean	该特征是否支持 read 操作
    // write	boolean	该特征是否支持 write 操作
    // notify	boolean	该特征是否支持 notify 操作
    // indicate	boolean	该特征是否支持 indicate 操作
    // writeNoResponse	boolean	该特征是否支持无回复写操作
    // writeDefault	boolean	该特征是否支持有回复写操作
    let name = this.data.name
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: res => {
        console.log('获取蓝牙低功耗设备某个服务中所有特征 (characteristic)->res:', res)
        for (let i = 0; i < res.characteristics?.length; i++) {
          const item = res.characteristics[i]
          if (item.properties.write) {
            this.setData({
              canWrite: true
            })
            console.log('可以连接')
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
            wx.setStorage({
              key: "BlueKey",
              data: {
                _close: true,
                _name: name,
                _deviceId: deviceId,
                _serviceId: serviceId,
                _characteristicId: item.uuid,
              }
            })
            //pring

            this.writeBLECharacteristicValue()
            break;
          }
        }
        setTimeout(() => {
          if (this.data.canWrite) {
            this.setData({
              connected_ly: true,
              ly_text: '已连接',
              colors: 'text-green'
            })

          } else {
            wx.showToast({
              icon: 'error',
              title: '您当前选择的设备不支持打印功能，请重新选择！',
              duration: 3000
            })
          }
        }, 1000)
      },
      fail: (res) => {
        console.error('获取蓝牙特征失败', res)
      }
    })
  },
  /**
   * 第十步 编写蓝牙需要打印的内容
   * @param {编写蓝牙需要打印的内容}
   * @param {打印按钮的事件}
   * @param {打印功能前准备}
   */
  writeBLECharacteristicValue() {
    let pd = {
      client: '测试',
      name: '张三',
      sex: '男',
      iPhone: '18888888888',
      idcard: '888888888888888888',
    }
    var that = this
    setTimeout(() => {
      let printerJobs = new PrinterJobs();
      let dayun1 = '打印机自检' + pd?.contactinfo?.client + '\r\n' +
        '姓名：' + pd?.name + '\r\n' +
        '性别：' + pd?.sex + '\r\n' +
        '联系方式：' + pd?.iPhone + '\r\n' +
        '身份证号码：' + pd?.idcard + '\r\n'

      printerJobs
        .setSize(2, 2)
        .setAlign('CT')
        .print('! 0 100 203 100 1\r\n法决定书\r\nPRINT\r\n')
        .setSize(1, 1).setAlign('LT')
        .print(dayun1)



      let buffer = printerJobs.buffer();
      // console.log('ArrayBuffer', 'length: ' + buffer.byteLength, ' hex: ' + this.ab2hex(
      // 	buffer));
      // 1.并行调用多次会存在写失败的可能性
      // 2.建议每次写入不超过20字节
      // 分包处理，延时调用
      const maxChunk = 20;
      const delay = 20;
      for (let i = 0, j = 0, length = buffer.byteLength; i < length; i += maxChunk, j++) {
        let subPackage = buffer.slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
        setTimeout(this._writeBLECharacteristicValue, j * delay, subPackage);
      }

      // this.lanyardShow = false;
      // this.$refs.uUpload.clear();
      // this.clearFormData();
      wx.showToast({
        title: '打印成功',
        icon: 'success'
      })
    }, 5000)

  },

  /**
   * 第十一步
   * @param {最终的打印}
   * @param {由第十步骤调用}
   * @param {轮询打印}
   * @param {打印机输出}
   * @param {打印结束}
   */
  _writeBLECharacteristicValue(buffer) {
    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._serviceId,
      characteristicId: this._characteristicId,
      value: buffer,
      success(res) {
        console.log('打印成功->res:', res)
      },
      fail(res) {
        console.log('打印失败', res)
      }
    })
  },




  /**
   * 第十二步
   * @param {蓝牙相关事件}
   * @param {和以上打印不衔接}
   * @param {关闭蓝牙}
   */
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter()
    this.data.discoveryStarted = false
  },

  /**
   * 第十三步
   * @param {判断蓝牙是否已经连接}
   * @param {只支持wx. 不支持wx.}
   * @param {只支持安卓, 不支持苹果}
   */
  isBluetoothDevicePaired() {
    var that = this
    wx.isBluetoothDevicePaired({
      deviceId: wx.getStorageSync("BlueKey")?._deviceId,
      success(res) {
        console.log(res, "判断连接成功")
        that.setData({
          connected_ly: true,
          ly_text: '连接成功'
        })

      },
      fail(err) {
        console.log(err, "判断连接失败");
        that.setData({
          ly_text: '点击搜索'
        })

      }
    })

  },
  /**
   * 第十四步
   * @param {蓝牙相关资源事件}
   * @param {搜索 资源 打印}
   * @param {转换}
   */
  inArray(arr, key, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) {
        return i
      }
    }
    return -1
  },
  ab2hex(buffer) { // ArrayBuffer转16进度字符串示例
    const hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
    return hexArr.join(',')
  },
  str2ab(str) {
    let buffer = new ArrayBuffer(str?.length)
    let dataView = new DataView(buffer)
    for (let i = 0; i < str?.length; i++) {
      dataView.setUint8(i, str?.charAt(i).charCodeAt(0))
    }
    return buffer;
  },
  /**
   * 第十五步
   * @param {进入页面就自动连接}
   * @param {该方法存在BUG}
   * @param {目前该方法先不投放使用}
   */
  createBLEConnectionWithDeviceId(e) {
    //创建蓝牙链接
    wx.openBluetoothAdapter({
      success: (res) => {
        let ly_data = {
          name: wx.getStorageSync("BlueKey")?._deviceId,
          deviceId: wx.getStorageSync("BlueKey")?._name
        }
        this._createBLEConnection(ly_data);
      },
      fail: (res) => {
        if (res.errCode === 10001) {
          wx.showModal({
            title: '错误',
            content: '未找到蓝牙设备, 请打开蓝牙后重试。',
            showCancel: false
          });
          this.connected_ly = false
        } else if (res.errCode === -1 || res.errCode === 10010) { //已连接
          this.data.connected_ly = true;
        }
      }
    })
  },

  /**
   * 第十六步
   * @param {获取蓝牙适配状态}
   * @param {在蓝牙连接成功后调用查看}
   * @param {判断连接用}
   */
  getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
      success: (res) => {
        console.log(res)
        if (res.available) {
          this.data.connected_ly = true
          this.data.ly_text = "已连接"
          console.log("蓝牙已经连接", res)
        } else {
          this.connected_ly = false;
          this.data.ly_text = "点击连接"
          console.log("蓝牙已经断开")
        }
      }
    })
  },

})