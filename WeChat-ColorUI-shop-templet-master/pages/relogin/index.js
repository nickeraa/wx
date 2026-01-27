var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabbarBot: a.globalData.tabbar_bottom,
    comuserid: "",
    compassword:'',
    userid:'',
    xf_name:''
  },
  onLoad: function (a) {},
  onShow: function () {},

 
  getcomuseridValue: function (o) {
    this.setData({ comuserid: o.detail.value });
  },
  getcompasswordValue: function (o) {
    this.setData({ compassword: o.detail.value });
  },
  qy: function() {
    if (0 == this.checklogin()) return !1;
    wx.showLoading({
        title: "正在检测登录",
        mask: !0
    });
    var t = this;
    wx.request({
        url: a.globalData.api + "wx_viplogin.ashx",
        data: {
            userid: t.data.comuserid,
            password: t.data.compassword
        },
        header: {
            "content-type": "application/x-www-form-urlencoded"
        },
        dataType: "json",
        success: function(a) {
            console.log(a.data), 1 == a.data.length ? (t.setData({
                userid: a.data[0].XF_STAFFCODE,
                xf_name:a.data[0].XF_NAME
            }), wx.hideLoading(), wx.showModal({
                title: "提示",
                content: "登录成功！",
                showCancel: !1,
                success: function(a) {
                    a.confirm && (wx.setStorageSync("yguserid", t.data.userid), wx.setStorageSync("ygname", t.data.xf_name), 
                    wx.navigateBack({
                      delta: 0
                    }));
                }
            })) : (wx.hideLoading(), wx.showModal({
                title: "提示",
                content: "登录ID密码不正确！",
                showCancel: !1,
                success: function(a) {
                    a.confirm;
                }
            }));
        },
        complete: function() {}
    });
},
checklogin: function() {
    return "" == this.data.comuserid ? (wx.showModal({
        title: "提示",
        content: "登录ID不能为空！",
        showCancel: !1,
        success: function(a) {
            a.confirm;
        }
    }), !1) : "" == this.data.compassword ? (wx.showModal({
        title: "提示",
        content: "登录密码不能为空！",
        showCancel: !1,
        success: function(a) {
            a.confirm;
        }
    }), !1) : this.data.compassword.indexOf("=") >= 0 || this.data.compassword.indexOf("or") >= 0 || this.data.compassword.indexOf("'") >= 0 || this.data.compassword.indexOf(":") >= 0 || this.data.comuserid.indexOf("=") >= 0 || this.data.comuserid.indexOf("or") >= 0 || this.data.comuserid.indexOf("'") >= 0 || this.data.comuserid.indexOf(":") >= 0 || this.data.comuserid.indexOf("union") >= 0 || this.data.comuserid.indexOf("select") >= 0 || this.data.comuserid.indexOf("update") >= 0 || this.data.comuserid.indexOf("delete") >= 0 || this.data.comuserid.indexOf("#") >= 0 ? (wx.showModal({
        title: "提示",
        content: "IP已记录，存在非法字符！",
        showCancel: !1,
        success: function(a) {
            a.confirm;
        }
    }), !1) : void 0;
}

});
