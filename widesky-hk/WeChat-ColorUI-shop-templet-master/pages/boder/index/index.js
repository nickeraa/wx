var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    flag: true,
    snumber: "",
    ponumber: "",
    xf_plu: "",
    xf_desci: "",
    xf_qty: "",
    rcqty: "",
    rcdate: "",
    imgurls: {},
    imageList: [],   // 存储ImageNames表数据

  },
  onLoad: function (a) {

  },
  getsnumber(e) {

    this.setData({
      snumber: e.detail.value,

    })

  },
  checkinput: function (t) {
    this.data.snumber == "" ?
      wx.showToast({
        title: "请输入二维码流水号",
        icon: "none",
        duration: 1e3
      }) :
      this.checknumber();
  },
  checknumber: function (t) {
    var that = this;
    wx.request({
      url: "https://sy.widesky.work:8848/wx_checknumber.ashx",
      data: {
        snumber: this.data.snumber
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a)

        if (a.data == "") {

          wx.showModal({
            title: "提示",
            content: "没有查到相关数据",
            showCancel: !1,
            success: function (t) {
           that.setData({

            flag:true

           })
            },
          })


        } 

        else{
          that.setData({
            
            ponumber: a.data[0].ponumber,
            xf_plu: a.data[0].xf_plu,
          })
  
  
          that.checkponumber()

        }



      },
      complete: function () {},
    });
  },

  checkponumber() {

    console.log(this.data.ponumber)
    console.log(this.data.xf_plu)
    var that = this;
    wx.request({
      url: "https://sy.widesky.work:8848/wx_checkponumber.ashx",
      data: {
        ponumber: this.data.ponumber,
        xf_plu: this.data.xf_plu,
        snumber: this.data.snumber
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a)
        console.log(a.data.ImageNames)
        if (a.data == "") {

          wx.showModal({
            title: "提示",
            content: "没有查到相关数据",
            showCancel: !1,
            success: function (t) {
         
            },
          })


        } else {

     // 2. 解析JSON数据（适配两种序列化方案）
     let data = a.data;
     // 方案1：适配后端「直接序列化DataSet」的结构

     that.setData({
            flag: false,
            xf_desci: data.Table[0].XF_DESCI,
            xf_qty: data.Table[0].XF_SUPPQTY,
             rcqty: data.Table[0].XF_ACTINQTY,
             rcdate: data.Table[0].XF_TRFINDATE,
              imageList: data.ImageNames
    });


          
        }
     }


      
      
    });

  }


});