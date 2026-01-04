var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    resultdt: {},
    replu: {},
    imgdata: {},
    index2: null,
    picker2: [],
    itemname: "",
    current: 0,
    lines: 0,
    banner: a.globalData.imgUrl,
    hkimgurl: a.globalData.hkimgUrl,
    pict: a.globalData.scimgUrl,
    flag: !0,
    swiperlist: [""],
    images1: '',
    images2: '',
    images3: ''

  },
  onLoad: function (a) {

  },

  back: function () {
    wx.switchTab({
      url: "/pages/home/index/index"
    });
  },
  searchs: function () {
    var t = this;
    wx.showLoading({
        title: "数据加载中",
        mask: !0
      }),
      wx.request({
        url: a.globalData.api + "wx_index.ashx",
        data: {},
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (e) {
          console.log(e),
            t.setData({
              resultdt: e.data,
              picker2: e.data
            }),
            wx.request({
              url: a.globalData.api + "wx_searchitem.ashx",
              data: {
                itemname: t.data.itemname
              },
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              dataType: "json",
              success: function (a) {
                console.log(a),
                  console.log('ppppppppppp'),
                  t.setData({
                    replu: a.data
                  }), wx.hideLoading();
              },
            });
        },
      });
  },
  bindPickerChange2: function (a) {
    console.log("picker发送选择改变，携带值为", a.detail.value),
      this.setData({
        index2: a.detail.value,
        itemname: this.data.picker2[a.detail.value].ITEMNAME,
        flag: !0,
      });
  },
  sebanner: function () {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_sebanner.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a), t.setData({
          resultdt: a.data
        });
      },
    });
  },
  onShow: function () {

    var t = this;

    wx.request({
      url: a.globalData.api + "wx_index.ashx",
      data: {},
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: "json",
      success: function (a) {
        console.log(a),
          console.log("ddddddddd"),
          t.setData({
            picker2: a.data
          }),
          t.sebanner();
      },
    })

  },


  previewImage1: function (a) {
    console.log('gggggg')
    console.log(this.data.images1.indexOf("null"))
    var t = [];
    if (this.data.images1.indexOf("null") < 0) {
      var i = this.data.pict + this.data.itemname + "//" + this.data.images1;
      t.push(i);
    }
    if (this.data.images2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.itemname + "//" + this.data.images2;
      t.push(s);
    }
    if (this.data.images3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.itemname + "//" + this.data.images3;
      t.push(e);
    }
    console.log(t), wx.previewImage({
      current: i,
      urls: t
    });

  },

  previewImage2: function (a) {
    console.log('gggggg')
    console.log(this.data.images1.indexOf("null"))
    var t = [];
    if (this.data.images1.indexOf("null") < 0) {
      var i = this.data.pict + this.data.itemname + "//" + this.data.images1;
      t.push(i);
    }
    if (this.data.images2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.itemname + "//" + this.data.images2;
      t.push(s);
    }
    if (this.data.images3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.itemname + "//" + this.data.images3;
      t.push(e);
    }
    console.log(t), wx.previewImage({
      current: s,
      urls: t
    });

  },

  previewImage3: function (a) {
    console.log('gggggg')
    console.log(this.data.images1.indexOf("null"))
    var t = [];
    if (this.data.images1.indexOf("null") < 0) {
      var i = this.data.pict + this.data.itemname + "//" + this.data.images1;
      t.push(i);
    }
    if (this.data.images2.indexOf("null") < 0) {
      var s = this.data.pict + this.data.itemname + "//" + this.data.images2;
      t.push(s);
    }
    if (this.data.images3.indexOf("null") < 0) {
      var e = this.data.pict + this.data.itemname + "//" + this.data.images3;
      t.push(e);
    }
    console.log(t), wx.previewImage({
      current: e,
      urls: t
    });

  },

  search: function (t) {
    console.log(this.data.itemname);
    var t = this;
    if (null == t.data.index2)
      return (
        wx.showModal({
          title: "提示",
          content: "请选择查询项目",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );

    wx.showLoading({
        title: "数据加载中",
        mask: !0
      }),

      wx.request({
        url: a.globalData.api + "wx_showimg.ashx",
        data: {
          itemname: t.data.itemname
        },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function (a) {
          console.log(a);
          if (a.data.length == 0) {
            t.setData({
              flag:true
            })
        
          
            wx.showModal({
              title: "提示",
              content: "没有任何数据！",
              showCancel: !1,
              success: function (a) {
                a.confirm;
              },
            })

          } else {

            t.setData({
              flag:false
            })

            var i = Date.parse(new Date());
            (i /= 1e3),
            t.setData({
                imgdata: a.data,
                images1: a.data[0].IMG1 + "?temp=" + i,
                images2: a.data[0].IMG2 + "?temp=" + i,
                images3: a.data[0].IMG3 + "?temp=" + i,
                itemname: a.data[0].ITEMNAME,
                kzm: a.data[0].IMG1.substr(-3, 3),
                flag: false
              }),

              a.data[0].IMG1 &&
              (t.setData({
                  "swiperlist[0]": t.data.pict + a.data[0].ITEMNAME + "//" + a.data[0].IMG1,
                }),
                console.log(t.data.swiperlist[0])),
              a.data[0].IMG2 &&
              t.setData({
                "swiperlist[1]": t.data.pict + a.data[0].ITEMNAME + "//" + a.data[0].IMG2,
              }),
              a.data[0].IMG3 &&
              t.setData({
                "swiperlist[2]": t.data.pict + a.data[0].ITEMNAME + "//" + a.data[0].IMG3,
              }),
              console.log(t.data.swiperlist)
     
          }

          wx.hideLoading();
        },
      });
  },
});