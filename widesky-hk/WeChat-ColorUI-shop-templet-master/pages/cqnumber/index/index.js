var a = require("../../../@babel/runtime/helpers/defineProperty"),
  t = getApp();
Page({
  data: {
    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    qcode: '',
    cqbody: '',
    dydate:'',
    tsdate: '',
    storecode: '',
    tsbody: '',
    note: '',
    imgurl:'',
    swiperlist: [""],
    cqnumber:''
  },
  onLoad: function (a) {
    this.setData({ cqnumber: a.cqnumber });
    console.log(this.data.cqnumber)
  },
  previewImage0: function (a) {
    var t = a.target.dataset.src;
    (this.data.swiperlist[0] = this.data.imglist),
      wx.previewImage({ current: t, urls: this.data.swiperlist });
  },


  onShow: function (e) {
    var i = this;
    wx.request({
      url: t.globalData.api + "wx_cqnumber.ashx",
      data: { cqnumber: i.data.cqnumber },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          i.setData(
            a(
              a(
                {
                  qcode: e.data[0].QCODE,
                  cqbody: e.data[0].CQBODY,
                  dydate: e.data[0].DYTIME,
                  tsdate: e.data[0].TSTIME,
                  storecode: e.data[0].STORECODE,
                  tsbody: e.data[0].TSBODY,
                  note: e.data[0].NOTE,
                  imgurl:  t.globalData.api+e.data[0].IMGURL
   
                },
             
              ),
            
            )
          );
      },
    });
  },
});
