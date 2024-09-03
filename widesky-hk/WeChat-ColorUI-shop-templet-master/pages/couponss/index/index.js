var e = require("../../../@babel/runtime/helpers/defineProperty"),
  a = getApp();
Page(
  e(
    e(
      e(
        e(
          {
            data: {
              StatusBar: a.globalData.StatusBar,
              CustomBar: a.globalData.CustomBar,
              TabCur: 0,
              scrollLeft: 0,
              warning: "",
              phonets: "",
              bindts: "",
              userid: "",
              password: "",
              phone: "",
              code: "",
              iscode: null,
              codename: "获取验证码",
              hidden: !0,
              second: 60,
              username: "",
              openid: "",
              session_key: "",
            },
            getuserid: function (e) {
              this.setData({ userid: e.detail.value });
            },
            getpassword: function (e) {
              this.setData({ password: e.detail.value });
            },
            getPhoneValue: function (e) {
              this.setData({ phone: e.detail.value });
            },
            getCodeValue: function (e) {
              this.setData({ code: e.detail.value });
            },
            getVerificationCode: function () {
              if (">>>账号密码验证成功！" != this.data.warning)
                return (
                  wx.showToast({
                    title: "请先验证登陆ID",
                    icon: "none",
                    duration: 1e3,
                  }),
                  !1
                );
              this.getCode();
            },
            getCode: function () {
              var e = this;
              return "" == this.data.phone
                ? (wx.showToast({
                    title: "手机号不能为空",
                    icon: "none",
                    duration: 1e3,
                  }),
                  this.setData({ codename: "获取验证码", disabled: !1 }),
                  !1)
                : /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|16[0-9]|12[0-9]|11[0-9]|10[0-9])\d{8}$$/.test(
                    this.data.phone
                  )
                ? (this.setData({ codename: "获取验证码", disabled: !0 }),
                  void wx.request({
                    url: a.globalData.api + "wx_downcode.ashx",
                    data: { phone: e.data.phone },
                    header: {
                      "content-type": "application/x-www-form-urlencoded",
                    },
                    dataType: "json",
                    success: function (a) {
                      console.log(a), e.setData({ iscode: a.data });
                      var t = 61,
                        o = setInterval(function () {
                          --t <= 0
                            ? (clearInterval(o),
                              e.setData({ codename: "重新发送", disabled: !1 }))
                            : e.setData({ codename: "  " + t + "秒     " });
                        }, 1e3);
                    },
                  }))
                : (this.setData({ codename: "获取验证码", disabled: !1 }),
                  wx.showToast({
                    title: "请输入正确的手机号",
                    icon: "none",
                    duration: 1e3,
                  }),
                  !1);
            },
            onLoad: function (e) {},
            checkuser: function (e) {
              var t = this;
              "" == e.detail.value.userid
                ? t.setData({ warning: ">>>登录ID不能为空！" })
                : "" == e.detail.value.password
                ? t.setData({ warning: ">>>登录密码不能为空！" })
                : (wx.showLoading({ title: "正在连接网络", mask: !0 }),
                  wx.request({
                    url: a.globalData.api + "wx_checkuser.ashx",
                    data: {
                      userid: e.detail.value.userid,
                      password: e.detail.value.password,
                      i: "0",
                    },
                    header: {
                      "content-type": "application/x-www-form-urlencoded",
                    },
                    dataType: "json",
                    success: function (e) {
                      console.log(e),
                        t.setData({ warning: e.data }),
                        wx.hideLoading();
                    },
                  }));
            },
          },
          "onLoad",
          function (e) {}
        ),
        "checkphone",
        function (e) {
          if ("" == this.data.phone)
            return (
              wx.showToast({
                title: "手机号不能为空",
                icon: "none",
                duration: 1e3,
              }),
              !1
            );
          if (
            !/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|16[0-9]|12[0-9]|11[0-9]|10[0-9])\d{8}$$/.test(
              this.data.phone
            )
          )
            return (
              wx.showToast({
                title: "请输入正确的手机号",
                icon: "none",
                duration: 1e3,
              }),
              !1
            );
          if (">>>账号密码验证成功！" != this.data.warning)
            return (
              wx.showToast({
                title: "请先验证登陆ID",
                icon: "none",
                duration: 1e3,
              }),
              !1
            );
          if ("" == this.data.code)
            return (
              wx.showToast({
                title: "验证码不能为空",
                icon: "none",
                duration: 1e3,
              }),
              !1
            );
          if (this.data.code != this.data.iscode)
            return (
              wx.showToast({
                title: "验证码错误",
                icon: "none",
                duration: 1e3,
              }),
              !1
            );
          var t = this;
          wx.showLoading({ title: "正在连接网络", mask: !0 }),
            wx.request({
              url: a.globalData.api + "wx_inphone.ashx",
              data: {
                userid: e.detail.value.userid,
                phone: e.detail.value.phone,
              },
              header: { "content-type": "application/x-www-form-urlencoded" },
              dataType: "json",
              success: function (e) {
                console.log(e),
                  t.setData({ phonets: e.data }),
                  wx.hideLoading();
              },
            });
        }
      ),
      "checkuserph",
      function (e) {
        if (">>>账号密码验证成功！" != this.data.warning)
          return (
            wx.showToast({
              title: "请先验证登陆ID",
              icon: "none",
              duration: 1e3,
            }),
            !1
          );
        if (">>>手机号码提交成功！" != this.data.phonets)
          return (
            wx.showToast({
              title: "请先提交手机号",
              icon: "none",
              duration: 1e3,
            }),
            !1
          );
        var t = this;
        console.log(t.data.userid),
          console.log(t.data.phone),
          wx.showLoading({ title: "正在连接网络", mask: !0 }),
          wx.request({
            url: a.globalData.api + "wx_bindid.ashx",
            data: { userid: t.data.userid, phone: t.data.phone },
            header: { "content-type": "application/x-www-form-urlencoded" },
            dataType: "json",
            success: function (e) {
              console.log(e),
                e.data.length > 0 &&
                  t.setData({
                    bindts: ">>>登录ID与手机绑定成功！",
                    hidden: !1,
                    username: e.data[0].username,
                  }),
                wx.hideLoading();
            },
          });
      }
    ),
    "bingGetUserInfo",
    function (e) {
      if (">>>登录ID与手机绑定成功！" != this.data.bindts)
        return (
          wx.showToast({
            title: "请先绑定登陆ID与手机",
            icon: "none",
            duration: 1e3,
          }),
          !1
        );
      console.log(e.detail.userInfo.nickName);
      var t = this;
      wx.showLoading({ title: "正在连接网络", mask: !0 }),
        wx.login({
          success: function (e) {
            var o = e.code;
            o
              ? wx.request({
                  url: a.globalData.api + "wx_getowerphone.ashx",
                  data: { code: o },
                  header: { "content-type": "application/json" },
                  success: function (e) {
                    console.log(e.data);
                    var o = e.data.split(",");
                    t.setData({ login: !1, openid: o[0], session_key: o[1] }),
                      wx.setStorageSync("openid", t.data.openid),
                      wx.setStorageSync("session_key", t.data.session_key),
                      console.log(wx.getStorageSync("openid")),
                      console.log(wx.getStorageSync("session_key")),
                      wx.request({
                        url: a.globalData.api + "wx_bindwx.ashx",
                        data: {
                          userid: t.data.userid,
                          phone: t.data.phone,
                          openid: wx.getStorageSync("openid"),
                        },
                        header: {
                          "content-type": "application/x-www-form-urlencoded",
                        },
                        dataType: "json",
                        success: function (e) {
                          console.log(e),
                            t.setData({ bindts: e.data }),
                            wx.setStorageSync("phone", t.data.phone),
                            wx.setStorageSync(
                              "userid",
                              t.data.userid.toUpperCase()
                            ),
                            wx.setStorageSync("username", t.data.username),
                            t.setData({
                              warning: "",
                              phonets: "",
                              bindts: "",
                              userid: "",
                              password: "",
                              phone: "",
                              code: "",
                              hidden: !0,
                            }),
                            wx.showModal({
                              title: "提示",
                              content: "成功绑定！",
                              showCancel: !1,
                              success: function (e) {
                                e.confirm && wx.navigateBack({ delta: 1 });
                              },
                            }),
                            wx.hideLoading();
                        },
                      });
                  },
                })
              : console.log("获取用户登陆状态失败！");
          },
        });
    }
  )
);
