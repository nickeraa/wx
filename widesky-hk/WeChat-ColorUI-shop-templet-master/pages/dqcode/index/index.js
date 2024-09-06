var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
  
    susername: "",
    entime: "",
    userid: "",
    wlnumber: "",
    imglist: a.globalData.api + "images/timg.jpg",
    imgurls: "",
    imgurl: "",
    shname: "",
    shaddr: "",
    shphone: "",
    reguserid: "",
    qguserid: "",
    gjuserid: "",
    pzstate: "",
    pyoufei: "",
    pwuliu: "",
    paddress: "",
    bprice: "",
    note: "",
    qcode: "",
    zjusername:'',
    zjuserid:'',
    todate:''
  },
  onLoad: function (a) {
    console.log(a.wlnumber), this.setData({ wlnumber: a.wlnumber });
  },


  scan: function () {
    var a = this;
    wx.scanCode({
      onlyFromCamera: !0,
      success: function (t) {
        console.log("扫码成功：" + JSON.stringify(t)),
          a.setData({ qcode: t.result });
          a.setData({ zjuserid: t.result.slice(0,t.result.length-11) });
          a.setData({ todate: t.result.slice(-10) });
          console.log('pppppp'+a.data.zjuserid);
a.checkuserid();
      },
      fail: function (a) {
        console.log(a),
          wx.showToast({ title: "扫描失败", icon: "none", duration: 1e3 });
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
        t.setData({ imglist: e.tempFilePaths }),
          wx.showLoading({ title: "正在上传", mask: !0 }),
          wx.uploadFile({
            url: a.globalData.api + "wx_postimg.ashx",
            filePath: t.data.imglist[0],
            name: "imgfile",
            formData: { method: "POST" },
            success: function (a) {
              console.log(a),
                t.setData({ imgurl: "djimg/" + a.data }),
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

  },

  checkuserid()
  {

    var e = this;
    wx.request({
      url: a.globalData.api + "wx_customer_checkuserid.ashx",
      data: { userid: e.data.zjuserid },
      header: { "content-type": "application/x-www-form-urlencoded" },
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
