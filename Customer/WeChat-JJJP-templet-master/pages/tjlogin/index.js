var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        comuserid: "",
        compassword: "",
        userid: ""
    },
    getcomuseridValue: function(a) {
        console.log(a.detail.value), this.setData({
            comuserid: a.detail.value
        });
    },
    getcompasswordValue: function(a) {
        this.setData({
            compassword: a.detail.value
        });
    },
    onLoad: function(a) {},
    onShow: function() {},
    cklogins: function() {
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
                    userid: a.data[0].XF_STAFFCODE
                }), wx.hideLoading(), wx.showModal({
                    title: "提示",
                    content: "登录成功！",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && (wx.setStorageSync("vipuserid", t.data.userid), wx.setStorageSync("vippassword", t.data.compassword), 
                        wx.switchTab({
                            url: "/pages/home/index/index?userid=" + t.data.userid
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