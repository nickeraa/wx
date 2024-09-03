var a = getApp();
Page({
  data: {
    StatusBar: a.globalData.StatusBar,
    CustomBar: a.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    khimg: "",
    corpid: "",
    mobile: "",
    username: "",
    userid: "",
    ygavatar: "",
    vipavatar: "",
    vipcode: "",
    vipname: "",
    grade: "",
    users: "",
    stores: "",
    points: "",
    kkdate: "",
    kcvipname: "",
    vipuserid: "",
    khuserid: "",
    yguserid: "",
    ygname: "",
    staffcode: "",
    bduser: "",
    hidden: "",
  },
  onLoad: function (a) {
    console.log(a.yguserid),
      console.log(a.khuserid),
      a.yguserid &&
        a.khuserid &&
        this.setData({ khuserid: a.khuserid, yguserid: a.yguserid });
  },
  onShow: function (e) {
    var t = this;
    wx.request({
      url: a.globalData.api + "wx_getqwuser.aspx",
      data: { khuserid: t.data.khuserid, yguserid: t.data.yguserid },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (e) {
        console.log(e),
          t.setData({
            username: e.data[0].name,
            vipname: e.data[0].vipname,
            ygavatar: e.data[0].avatar,
            vipavatar: e.data[0].vipavatar,
          }),
          wx.request({
            url: a.globalData.api + "qw_checkvip.ashx",
            data: { khuserid: t.data.khuserid },
            header: { "content-type": "application/x-www-form-urlencoded" },
            dataType: "json",
            success: function (a) {
              console.log(a),
                a.data.length > 0
                  ? (t.setData({
                      vipcode: a.data[0].XF_VIPCODE,
                      kcvipname: a.data[0].XF_SURNAME,
                      stores: a.data[0].XF_STORES,
                      kkdate: a.data[0].XF_ISSUEDATE,
                      grade: a.data[0].GRADE,
                      ygname: a.data[0].XF_USERNAME,
                      points: a.data[0].XF_BONUS,
                      staffcode: a.data[0].XF_USERS,
                      qw_username: a.data[0].QW_USERNAME,
                    }),
                    wx.showModal({
                      title: "提示",
                      content:
                        "此客户 " +
                        t.data.vipname +
                        " 已被员工 " +
                        t.data.qw_username +
                        "绑定",
                      success: function (a) {
                        a.confirm;
                      },
                    }),
                    t.setData({ hidden: "true" }))
                  : t.setData({ hidden: "" });
            },
          });
      },
    });
  },
  selectvip: function (a) {
    console.log(this.data.vipcode),
      "" == this.data.vipcode
        ? wx.showModal({
            title: "提示",
            content: "请输入会员卡号并验证",
            success: function (a) {
              a.confirm;
            },
          })
        : wx.navigateTo({
            url:
              "/pages/vipsales/index/index?vipcode=" +
              this.data.vipcode +
              "&vipname=" +
              this.data.kcvipname +
              "&grade=" +
              this.data.grade,
          });
  },
  getvipcode: function (a) {
    this.setData({ vipcode: a.detail.value });
  },
  goback: function (a) {
    wx.switchTab({ url: "/pages/home/index/index" });
  },
  checkvip: function (e) {
    var t = this;
    "" == e.detail.value.vipcode
      ? wx.showModal({
          title: "提示",
          content: "请输入会员卡号",
          success: function (a) {
            a.confirm;
          },
        })
      : (wx.showLoading({ title: "正在连接网络", mask: !0 }),
        wx.request({
          url: a.globalData.api + "wx_checkvip.ashx",
          data: { vipcode: e.detail.value.vipcode },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (a) {
            console.log(a),
              "" == a.data
                ? wx.showModal({
                    title: "提示",
                    content: "输入的会员卡号不存在",
                    showCancel: !1,
                    success: function (a) {
                      a.confirm;
                    },
                  })
                : (t.setData({
                    vipcode: a.data[0].XF_VIPCODE,
                    kcvipname: a.data[0].XF_SURNAME,
                    stores: a.data[0].XF_STORES,
                    kkdate: a.data[0].XF_ISSUEDATE,
                    grade: a.data[0].GRADE,
                    ygname: a.data[0].XF_USERNAME,
                    points: a.data[0].XF_BONUS,
                    staffcode: a.data[0].XF_USERS,
                  }),
                  (null != t.data.staffcode && "" != t.data.staffcode) ||
                    t.setData({ users: "没有归属导购" })),
              wx.hideLoading();
          },
        }));
  },
  bdvip: function (e) {
    if ("" == this.data.kcvipname)
      return (
        wx.showModal({
          title: "提示",
          content: "请先验证会员卡号",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    if (null == this.data.khuserid || "" == this.data.khuserid)
      return (
        wx.showModal({
          title: "提示",
          content: "无法绑定，没有获取客户和员工微信！",
          showCancel: !1,
          success: function (a) {
            a.confirm;
          },
        }),
        !1
      );
    if ("" != wx.getStorageSync("userid") && wx.getStorageSync("userid")) {
      var t = this;
      wx.request({
        url: a.globalData.api + "checkqw.ashx",
        data: { vipcode: t.data.vipcode },
        header: { "content-type": "application/json" },
        success: function (e) {
          console.log(e),
            e.data.length > 0
              ? wx.showModal({
                  title: "提示",
                  content:
                    "无法绑定,卡号" +
                    e.data[0].VIPCODE +
                    "已经被 " +
                    e.data[0].XF_NAME +
                    " 绑定！",
                  showCancel: !1,
                  success: function (a) {
                    a.confirm;
                  },
                })
              : wx.request({
                  url: a.globalData.api + "qw_bdvip.ashx",
                  data: {
                    yguserid: t.data.yguserid,
                    khuserid: t.data.khuserid,
                    vipcode: t.data.vipcode,
                    bduser: t.data.staffcode,
                    wxuser: wx.getStorageSync("userid"),
                  },
                  header: { "content-type": "application/json" },
                  success: function (a) {
                    console.log(a),
                      "ok" == a.data &&
                        wx.showModal({
                          title: "提示",
                          content: "成功绑定！",
                          showCancel: !1,
                          success: function (a) {
                            a.confirm;
                          },
                        });
                  },
                });
        },
      });
    } else
      wx.showModal({
        title: "提示",
        content: "无法绑定，请先验证员工科传账号，只有公司员工才可以绑定",
        showCancel: !1,
        success: function (a) {
          a.confirm && wx.navigateTo({ url: "/pages/couponss/index/index" });
        },
      });
  },
});
