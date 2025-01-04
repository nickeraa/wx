
var a = getApp(),
  t = require("../../../utils/util.js");
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    date: "",
    susername: "",
    entime: "",
    userid: "",
    imglist: a.globalData.api + "images/timg.jpg",
    imgurl: "",
    note: "",
    qcode: "",
    zjusername: '',
    zjuserid: '',
    todate: '',
    store: "",
    storename: "",
    tsbody: ''
  },
  onLoad: function (a) {
    var s = t.formatDate(new Date());
    this.setData({
      date: "2025-01-01",
      date2: s
    });

  },
  bindDateChange: function (a) {
    console.log(a.detail.value), this.setData({
      date: a.detail.value
    });
  },

  gettsbody: function (a) {
    console.log(a.detail.value), this.setData({
      tsbody: a.detail.value
    });
  },
  bindTextAreaBlur: function (a) {
    console.log(a.detail.value), this.setData({
      note: a.detail.value
    });
  },



  scan: function () {
    var a = this;
    wx.scanCode({
      onlyFromCamera: !0,
      success: function (t) {
        console.log("扫码成功：" + JSON.stringify(t)),
          a.setData({
            qcode: t.result
          });
        a.setData({
          zjuserid: t.result.slice(0, t.result.length - 11)
        });
        a.setData({
          todate: t.result.slice(-10)
        });
        console.log('pppppp' + a.data.zjuserid);
        a.checkuserid();
      },
      fail: function (a) {
        console.log(a),
          wx.showToast({
            title: "扫描失败",
            icon: "none",
            duration: 1e3
          });
      },
    });
  },
  ChooseImage: function () {
    var t = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (e) {
        t.setData({
            imglist: e.tempFilePaths
          }),
          console.log(t.data.imglist[0]),
          wx.showLoading({
            title: "正在上传",
            mask: !0
          }),
          wx.uploadFile({
            url: a.globalData.api + "wx_postimg.ashx",
            filePath: t.data.imglist[0],
            name: "imgfile",
            formData: {
              method: "POST"
            },
            success: function (a) {
              console.log(a),
                t.setData({
                  imgurl: "djimg/" + a.data
                }),
                console.log(t.data.imgurl),
                wx.hideLoading();
            },
            fail: function (a) {
              wx.showModal({
                title: "提示",
                content: "上传失败",
                showCancel: !1,
                success: function (a) {
                  a.confirm;
                },
              });
            },
          });
      },
    });
  },
  onShow: function (t) {


    var p = this;
    wx.request({
      url: a.globalData.api + "wx_sestore.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (e) {
        console.log(e), p.setData({
          picker2: e.data
        });
      },
    });


  },

  bindPickerChange2: function (e) {
    console.log("picker发送选择改变，携带值为", e.detail.value),
      this.setData({
        index2: e.detail.value,
        store: this.data.picker2[e.detail.value].XF_STORECODE,
        storename: this.data.picker2[e.detail.value].XF_NAME,
      });
  },


  djcq: function () {

    if ("" == this.data.zjusername) return wx.showToast({
      title: "没有质检员信息"
    }), !1;
    if ("" == this.data.todate) return wx.showToast({
      title: "没有二维码打印日期"
    }), !1;
    if ("2025-01-01" == this.data.date) return wx.showToast({
      title: "请选择投诉日期"
    }), !1;
    if ("" == this.data.tsbody) return wx.showToast({
      title: "请输入投诉人"
    }), !1;
    if ("" == this.data.note) return wx.showToast({
      title: "请输入投诉详情"
    }), !1;
    if ("" == this.data.imgurl) return wx.showToast({
      title: "请上传照片"
    }), !1;

    var p = this;
    wx.request({
      url: a.globalData.api + "wx_cqitem.ashx",
      data: {
        qcode: p.data.qcode,
        cqbody: p.data.zjusername,
        dytime: p.data.todate,
        tsbody: p.data.tsbody,
        tstime: p.data.date,
        storecode: p.data.storename,
        note: p.data.note,
        imgurl: p.data.imgurl,
        userid: wx.getStorageSync("ckuserid"),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (t) {
        "ok" == t.data ?
          wx.showModal({
            title: "提示",
            content: "登记成功！",
            showCancel: !1,
            success: function (t) {
              t.confirm;
              p.setData({
                qcode: '',
                zjusername: '',
                todate: '',
                date: '',
                store: '',
                tsbody: '',
                note: '',
                storename:'',
                imgurl:'',
                imglist: a.globalData.api + "images/timg.jpg",


              });
            },
          }) :
          wx.showToast({
            title: "数据错误"
          });
      },
    });
  },




  checkuserid() {

    var e = this;
    wx.request({
      url: a.globalData.api + "wx_customer_checkuserid.ashx",
      data: {
        userid: e.data.zjuserid
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a),
          e.setData({
            zjusername: a.data[0].XF_NAME,
          });
      },
    });


  }


});