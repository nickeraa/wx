// pages/sendCommand/sendCommand.js

/**
 * 此Demo仅供参考，可打印数字，英文，符号，中文，
 * 小程序支持的蓝牙为低功耗蓝牙（BLE），数据量大需分包发送
 */

var app = getApp();
var tsc = require("../../utils/tsc.js");
var esc = require("../../utils/esc.js");
var encode = require("../../utils/encoding.js");
var t = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabbarBot: app.globalData.tabbar_bottom,
    sendContent: "",
    looptime: 0,
    currentTime: 1,
    lastData: 0,
    oneTimeData: 0,
    returnResult: "",
    canvasWidth: 180,
    canvasHeight: 180,
    imageSrc: '../../images/abc_ic_star_black_36dp.png',
    buffSize: [],
    buffIndex: 0,
    printerNum: 0,
    currentPrint: 1,
    isReceiptSend: false,
    isLabelSend: false,
    susername:'',
    zjuser:'',
    todate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.notifyBLECharacteristicValueChange({
      deviceId: app.BLEInformation.deviceId,
      serviceId: app.BLEInformation.notifyServiceId,
      characteristicId: app.BLEInformation.notifyCharaterId,
      state: true,
      success: function(res) {
        wx.onBLECharacteristicValueChange(function(r) {
          console.log(`characteristic ${r.characteristicId} has changed, now is ${r}`)
        })
      },
      fail: function(e) {
        console.log(e)
      },
      complete: function(e) {
        console.log(e)
      }
    })

    var e = t.formatDate(new Date());
    that.setData({ todate: e });

  },




  labelTest: function() { //标签测试
    var that = this;
    var canvasWidth = that.data.canvasWidth
    var canvasHeight = that.data.canvasHeight

    var command = tsc.jpPrinter.createNew()

    command.setSize(50, 30)
    command.setGap(0)
    command.setCls()
 
   // command.setQR(40, 120, "L", 5, "A", that.data.susername+'-'+that.data.todate)
   command.setQR(130, 50, "L", 6, "A", wx.getStorageSync('zjuserid')+'-'+that.data.todate)
   //command.setQR(40, 120, "L", 5, "A", "佳博智汇")


    wx.canvasGetImageData({
      canvasId: 'edit_area_canvas',
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      success: function(res) {
        command.setBitmap(60, 0, 1, res)
      },
      complete: function() {
        command.setPagePrint()
        that.setData({
          isLabelSend: true
        })
        that.prepareSend(command.getData())
      }
    })

  },


  prepareSend: function(buff) { //准备发送，根据每次发送字节数来处理分包数量
    console.log(buff)
    var that = this
    var time = that.data.oneTimeData
    var looptime = parseInt(buff.length / time);
    var lastData = parseInt(buff.length % time);
    console.log(looptime + "---" + lastData)
    that.setData({
      looptime: looptime + 1,
      lastData: lastData,
      currentTime: 1,
    })
    that.Send(buff)
  },

  queryStatus: function() { //查询打印机状态
    var command = esc.jpPrinter.Query();
    command.getRealtimeStatusTransmission(1);
  },

  Send: function(buff) { //分包发送
    var that = this
    var currentTime = that.data.currentTime
    var loopTime = that.data.looptime
    var lastData = that.data.lastData
    var onTimeData = that.data.oneTimeData
    var printNum = that.data.printerNum
    var currentPrint = that.data.currentPrint
    var buf
    var dataView
    if (currentTime < loopTime) {
      buf = new ArrayBuffer(onTimeData)
      dataView = new DataView(buf)
      for (var i = 0; i < onTimeData; ++i) {
        dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
      }
    } else {
      buf = new ArrayBuffer(lastData)
      dataView = new DataView(buf)
      for (var i = 0; i < lastData; ++i) {
        dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
      }
    }
    console.log("第" + currentTime + "次发送数据大小为：" + buf.byteLength)
    wx.writeBLECharacteristicValue({
      deviceId: app.BLEInformation.deviceId,
      serviceId: app.BLEInformation.writeServiceId,
      characteristicId: app.BLEInformation.writeCharaterId,
      value: buf,
      success: function(res) {
        console.log(res)
      },
      fail: function(e) {
        console.log(e)
      },
      complete: function() {
        currentTime++
        if (currentTime <= loopTime) {
          that.setData({
            currentTime: currentTime
          })
          that.Send(buff)
        } else {
    
          if (currentPrint == printNum) {
            that.setData({
              looptime: 0,
              lastData: 0,
              currentTime: 1,
              isReceiptSend: false,
              isLabelSend: false,
              currentPrint: 1
            })
          } else {
            currentPrint++
            that.setData({
              currentPrint: currentPrint,
              currentTime: 1,
            })
            that.Send(buff)
          }
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var list = []
    var numList = []
    var j = 0
    for (var i = 20; i < 200; i += 10) {
      list[j] = i;
      j++
    }
    for (var i = 1; i < 10; i++) {
      numList[i - 1] = i
    }
    this.setData({
      buffSize: list,
      oneTimeData: list[0],
      printNum: numList,
      printerNum: numList[0]
    })

    // var that = this
    // wx.getImageInfo({
    //   src: that.data.imageSrc,
    //   success(res) {
    //     console.log(res.width)
    //     console.log(res.height)
    //     that.setData({
    //       canvasWidth: res.width,
    //       canvasHeight: res.height
    //     })
    //   }
    // })
    // that.setData({
    //   canvasWidth: width,
    //   canvasHeight: height
    // })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {



      this.setData({
  
        susername:wx.getStorageSync('zjusername'),
        zjuser:wx.getStorageSync('zjuserid'),
  
  
      })
  

  
    var that = this


/*
    var width
    var height
    wx.getImageInfo({
      src: that.data.imageSrc,
      success(res) {
        console.log(res.width)
        console.log(res.height)
        width = res.width
        height = res.height
        that.setData({
          canvasWidth: res.width,
          canvasHeight: res.height
        })
      }
    })
    */
    const ctx = wx.createCanvasContext("edit_area_canvas", this);
    // if (app.globalData.platform == "android") {
    //   ctx.translate(width, height)
    //   ctx.rotate(180 * Math.PI / 180)
    // }
    ctx.drawImage(this.data.imageSrc, 0, 0, that.data.canvasWidth, that.data.canvasWidth);
    ctx.draw();
  },


  printNumBindChange: function(res) { //更改打印份数
    var index = res.detail.value
  
    this.setData({
      printerNum: index
    })


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.closeBLEConnection({
      deviceId: app.BLEInformation.deviceId,
      success: function(res) {
        console.log("关闭蓝牙成功")
      },
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})