var a,
  e = getApp(),
  t = require("../../libs/qqmap-wx-jssdk.js");
Page({
  data: {
    StatusBar: e.globalData.StatusBar,
    CustomBar: e.globalData.CustomBar,
    rest: {},
    location: "",
    addr: {},
    tag: "3",
    userid: "",
    id: "",
  },
  onLoad: function (a) {},
  back: function () {
    wx.switchTab({ url: "/pages/jzb/index/index" });
  },
  selectmap: function (e) {
    a = new t({ key: "B5QBZ-SYKKN-22JF2-SBYNV-G5L67-F7BYX" });
    var o = this;
    o.setData({
      location: e.currentTarget.dataset.location,
      userid: e.currentTarget.dataset.userid,
      id: e.currentTarget.dataset.id,
    }),
      console.log(o.data.location),
      console.log(o.data.userid),
      console.log(o.data.id);
    var s = o.data.location.split(",");
    console.log(s[0]),
      console.log(s[1]),
      a.reverseGeocoder({
        location: { latitude: Number(s[0]), longitude: Number(s[1]) },
        success: function (t) {
          console.log(t.result.address), console.log(t.result);
          var d;
          (d = t.result.address_reference.crossroad.title),
            console.log(
              t.result.ad_info.district +
                d +
                t.result.address_reference.landmark_l2.title
            ),
            o.setData({
              address: t.result.address,
              name:
                t.result.ad_info.district +
                d +
                t.result.address_reference.landmark_l2.title,
            });
          for (var r = [], l = 0; l < o.data.addr.length; ++l)
            (r = o.data.addr[l].LOCATION),
              console.log(r),
              a.calculateDistance({
                mode: "straight",
                from: { latitude: Number(s[0]), longitude: Number(s[1]) },
                to: [
                  {
                    latitude: Number(r.split(",")[0]),
                    longitude: Number(r.split(",")[1]),
                  },
                ],
                success: function (a) {
                  var e = a.result.elements[0].distance;
                  console.log("计算距离为:", e + "米"),
                    console.log(o.data.addr[l]),
                    e < 100 &&
                      (o.setData({ name: o.data.addr[l].ADDRES, address: "" }),
                      console.log(o.data.addr[l].ADDRES),
                      o.setData({ tag: "2" }),
                      console.log(o.data.tag + "ppppppppppp"));
                },
                fail: function (a) {
                  console.error("error:", a);
                },
              });
          console.log(o.data.tag + "ddddddddd"),
            o.upstate(
              o.data.tag,
              e.currentTarget.dataset.userid,
              e.currentTarget.dataset.id
            ),
            wx.openLocation({
              latitude: Number(s[0]),
              longitude: Number(s[1]),
              scale: 22,
              name: o.data.name,
              address: o.data.address,
              success: function (a) {
                console.log(a);
              },
              fail: function (a) {
                wx.showToast({ title: "调用地图失败，请返回重试" });
              },
            });
        },
        fail: function (a) {
          console.log("获取当前地址失败");
        },
      });
  },
  upstate: function (a, t, o) {
    console.log(a + t + o);
    var s = this;
    wx.request({
      url: e.globalData.api + "wx_updwstate.ashx",
      data: { tag: a, userid: t, id: o },
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a), s.setData({ tag: "3" });
      },
    });
  },
  onShow: function (a) {
    var t = this;
    wx.request({
      url: e.globalData.api + "wx_sesjbody.ashx",
      data: {},
      header: { "content-type": "application/x-www-form-urlencoded" },
      dataType: "json",
      success: function (a) {
        console.log(a),
          t.setData({ rest: a.data }),
          wx.request({
            url: e.globalData.api + "wx_seaddr.ashx",
            data: {},
            header: { "content-type": "application/x-www-form-urlencoded" },
            dataType: "json",
            success: function (a) {
              console.log(a), t.setData({ addr: a.data });
            },
          });
      },
    });
  },
});
