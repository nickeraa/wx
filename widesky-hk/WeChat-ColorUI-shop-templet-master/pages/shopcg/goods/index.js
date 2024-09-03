var a,
  t = require("../../../@babel/runtime/helpers/defineProperty"),
  i = getApp();
Page(
  t(
    t(
      t(
        t(
          {
            data:
              ((a = {
                StatusBar: i.globalData.StatusBar,
                CustomBar: i.globalData.CustomBar,
                swiperlist: [""],
                pict: i.globalData.scimgUrl,
                xf_plu: "",
                pnumber: "",
                index2: null,
                picker2: [],
                store: "",
                storename: "",
                userid: "",
                images: "",
                stock: "",
                xf_qoh: "",
              }),
              t(
                t(
                  t(
                    t(
                      t(
                        t(
                          t(
                            t(
                              t(t(a, "userid", ""), "xf_desci", ""),
                              "tbimages1",
                              ""
                            ),
                            "tbimages2",
                            ""
                          ),
                          "tbimages3",
                          ""
                        ),
                        "zwimages1",
                        ""
                      ),
                      "zwimages2",
                      ""
                    ),
                    "zwimages3",
                    ""
                  ),
                  "zwimages4",
                  ""
                ),
                "zwimages5",
                ""
              ),
              t(
                t(
                  t(
                    t(
                      t(
                        t(
                          t(
                            t(
                              t(t(a, "zwimages6", ""), "zwimages7", ""),
                              "zwimages8",
                              ""
                            ),
                            "zwimages9",
                            ""
                          ),
                          "zwimages10",
                          ""
                        ),
                        "xf_desci",
                        ""
                      ),
                      "kzm",
                      ""
                    ),
                    "t",
                    ""
                  ),
                  "isShow",
                  !0
                ),
                "videoCoverImg",
                ""
              ),
              t(t(a, "videoPlayIcon", "/img/an.png"), "videohight", "")),
            previewImage1: function (a) {
              var t = [];
              if (
                this.data.zwimages1.indexOf("null") < 0 &&
                "jpg" == this.data.kzm
              ) {
                var i =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages1;
                t.push(i);
              }
              if (this.data.zwimages2.indexOf("null") < 0) {
                var s =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages2;
                t.push(s);
              }
              if (this.data.zwimages3.indexOf("null") < 0) {
                var d =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages3;
                t.push(d);
              }
              if (this.data.zwimages4.indexOf("null") < 0) {
                var e =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages4;
                t.push(e);
              }
              if (this.data.zwimages5.indexOf("null") < 0) {
                var h =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages5;
                t.push(h);
              }
              if (this.data.zwimages6.indexOf("null") < 0) {
                var l =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages6;
                t.push(l);
              }
              if (this.data.zwimages7.indexOf("null") < 0) {
                var p =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages7;
                t.push(p);
              }
              if (this.data.zwimages8.indexOf("null") < 0) {
                var u =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages8;
                t.push(u);
              }
              if (this.data.zwimages9.indexOf("null") < 0) {
                var f =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages9;
                t.push(f);
              }
              if (this.data.zwimages10.indexOf("null") < 0) {
                var n =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages10;
                t.push(n);
              }
              console.log(t), wx.previewImage({ current: i, urls: t });
            },
            previewImage2: function (a) {
              var t = [];
              if (
                this.data.zwimages1.indexOf("null") < 0 &&
                "jpg" == this.data.kzm
              ) {
                var i =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages1;
                t.push(i);
              }
              if (this.data.zwimages2.indexOf("null") < 0) {
                var s =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages2;
                t.push(s);
              }
              if (this.data.zwimages3.indexOf("null") < 0) {
                var d =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages3;
                t.push(d);
              }
              if (this.data.zwimages4.indexOf("null") < 0) {
                var e =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages4;
                t.push(e);
              }
              if (this.data.zwimages5.indexOf("null") < 0) {
                var h =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages5;
                t.push(h);
              }
              if (this.data.zwimages6.indexOf("null") < 0) {
                var l =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages6;
                t.push(l);
              }
              if (this.data.zwimages7.indexOf("null") < 0) {
                var p =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages7;
                t.push(p);
              }
              if (this.data.zwimages8.indexOf("null") < 0) {
                var u =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages8;
                t.push(u);
              }
              if (this.data.zwimages9.indexOf("null") < 0) {
                var f =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages9;
                t.push(f);
              }
              if (this.data.zwimages10.indexOf("null") < 0) {
                var n =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages10;
                t.push(n);
              }
              console.log(t), wx.previewImage({ current: s, urls: t });
            },
            previewImage3: function (a) {
              var t = [];
              if (
                this.data.zwimages1.indexOf("null") < 0 &&
                "jpg" == this.data.kzm
              ) {
                var i =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages1;
                t.push(i);
              }
              if (this.data.zwimages2.indexOf("null") < 0) {
                var s =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages2;
                t.push(s);
              }
              if (this.data.zwimages3.indexOf("null") < 0) {
                var d =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages3;
                t.push(d);
              }
              if (this.data.zwimages4.indexOf("null") < 0) {
                var e =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages4;
                t.push(e);
              }
              if (this.data.zwimages5.indexOf("null") < 0) {
                var h =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages5;
                t.push(h);
              }
              if (this.data.zwimages6.indexOf("null") < 0) {
                var l =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages6;
                t.push(l);
              }
              if (this.data.zwimages7.indexOf("null") < 0) {
                var p =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages7;
                t.push(p);
              }
              if (this.data.zwimages8.indexOf("null") < 0) {
                var u =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages8;
                t.push(u);
              }
              if (this.data.zwimages9.indexOf("null") < 0) {
                var f =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages9;
                t.push(f);
              }
              if (this.data.zwimages10.indexOf("null") < 0) {
                var n =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages10;
                t.push(n);
              }
              console.log(t), wx.previewImage({ current: d, urls: t });
            },
            previewImage4: function (a) {
              var t = [];
              if (
                this.data.zwimages1.indexOf("null") < 0 &&
                "jpg" == this.data.kzm
              ) {
                var i =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages1;
                t.push(i);
              }
              if (this.data.zwimages2.indexOf("null") < 0) {
                var s =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages2;
                t.push(s);
              }
              if (this.data.zwimages3.indexOf("null") < 0) {
                var d =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages3;
                t.push(d);
              }
              if (this.data.zwimages4.indexOf("null") < 0) {
                var e =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages4;
                t.push(e);
              }
              if (this.data.zwimages5.indexOf("null") < 0) {
                var h =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages5;
                t.push(h);
              }
              if (this.data.zwimages6.indexOf("null") < 0) {
                var l =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages6;
                t.push(l);
              }
              if (this.data.zwimages7.indexOf("null") < 0) {
                var p =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages7;
                t.push(p);
              }
              if (this.data.zwimages8.indexOf("null") < 0) {
                var u =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages8;
                t.push(u);
              }
              if (this.data.zwimages9.indexOf("null") < 0) {
                var f =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages9;
                t.push(f);
              }
              if (this.data.zwimages10.indexOf("null") < 0) {
                var n =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages10;
                t.push(n);
              }
              console.log(t), wx.previewImage({ current: e, urls: t });
            },
            previewImage5: function (a) {
              var t = [];
              if (
                this.data.zwimages1.indexOf("null") < 0 &&
                "jpg" == this.data.kzm
              ) {
                var i =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages1;
                t.push(i);
              }
              if (this.data.zwimages2.indexOf("null") < 0) {
                var s =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages2;
                t.push(s);
              }
              if (this.data.zwimages3.indexOf("null") < 0) {
                var d =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages3;
                t.push(d);
              }
              if (this.data.zwimages4.indexOf("null") < 0) {
                var e =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages4;
                t.push(e);
              }
              if (this.data.zwimages5.indexOf("null") < 0) {
                var h =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages5;
                t.push(h);
              }
              if (this.data.zwimages6.indexOf("null") < 0) {
                var l =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages6;
                t.push(l);
              }
              if (this.data.zwimages7.indexOf("null") < 0) {
                var p =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages7;
                t.push(p);
              }
              if (this.data.zwimages8.indexOf("null") < 0) {
                var u =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages8;
                t.push(u);
              }
              if (this.data.zwimages9.indexOf("null") < 0) {
                var f =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages9;
                t.push(f);
              }
              if (this.data.zwimages10.indexOf("null") < 0) {
                var n =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages10;
                t.push(n);
              }
              console.log(t), wx.previewImage({ current: h, urls: t });
            },
            previewImage6: function (a) {
              var t = [];
              if (
                this.data.zwimages1.indexOf("null") < 0 &&
                "jpg" == this.data.kzm
              ) {
                var i =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages1;
                t.push(i);
              }
              if (this.data.zwimages2.indexOf("null") < 0) {
                var s =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages2;
                t.push(s);
              }
              if (this.data.zwimages3.indexOf("null") < 0) {
                var d =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages3;
                t.push(d);
              }
              if (this.data.zwimages4.indexOf("null") < 0) {
                var e =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages4;
                t.push(e);
              }
              if (this.data.zwimages5.indexOf("null") < 0) {
                var h =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages5;
                t.push(h);
              }
              if (this.data.zwimages6.indexOf("null") < 0) {
                var l =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages6;
                t.push(l);
              }
              if (this.data.zwimages7.indexOf("null") < 0) {
                var p =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages7;
                t.push(p);
              }
              if (this.data.zwimages8.indexOf("null") < 0) {
                var u =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages8;
                t.push(u);
              }
              if (this.data.zwimages9.indexOf("null") < 0) {
                var f =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages9;
                t.push(f);
              }
              if (this.data.zwimages10.indexOf("null") < 0) {
                var n =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages10;
                t.push(n);
              }
              console.log(t), wx.previewImage({ current: l, urls: t });
            },
            previewImage7: function (a) {
              var t = [];
              if (
                this.data.zwimages1.indexOf("null") < 0 &&
                "jpg" == this.data.kzm
              ) {
                var i =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages1;
                t.push(i);
              }
              if (this.data.zwimages2.indexOf("null") < 0) {
                var s =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages2;
                t.push(s);
              }
              if (this.data.zwimages3.indexOf("null") < 0) {
                var d =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages3;
                t.push(d);
              }
              if (this.data.zwimages4.indexOf("null") < 0) {
                var e =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages4;
                t.push(e);
              }
              if (this.data.zwimages5.indexOf("null") < 0) {
                var h =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages5;
                t.push(h);
              }
              if (this.data.zwimages6.indexOf("null") < 0) {
                var l =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages6;
                t.push(l);
              }
              if (this.data.zwimages7.indexOf("null") < 0) {
                var p =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages7;
                t.push(p);
              }
              if (this.data.zwimages8.indexOf("null") < 0) {
                var u =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages8;
                t.push(u);
              }
              if (this.data.zwimages9.indexOf("null") < 0) {
                var f =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages9;
                t.push(f);
              }
              if (this.data.zwimages10.indexOf("null") < 0) {
                var n =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages10;
                t.push(n);
              }
              console.log(t), wx.previewImage({ current: p, urls: t });
            },
            previewImage8: function (a) {
              var t = [];
              if (
                this.data.zwimages1.indexOf("null") < 0 &&
                "jpg" == this.data.kzm
              ) {
                var i =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages1;
                t.push(i);
              }
              if (this.data.zwimages2.indexOf("null") < 0) {
                var s =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages2;
                t.push(s);
              }
              if (this.data.zwimages3.indexOf("null") < 0) {
                var d =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages3;
                t.push(d);
              }
              if (this.data.zwimages4.indexOf("null") < 0) {
                var e =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages4;
                t.push(e);
              }
              if (this.data.zwimages5.indexOf("null") < 0) {
                var h =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages5;
                t.push(h);
              }
              if (this.data.zwimages6.indexOf("null") < 0) {
                var l =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages6;
                t.push(l);
              }
              if (this.data.zwimages7.indexOf("null") < 0) {
                var p =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages7;
                t.push(p);
              }
              if (this.data.zwimages8.indexOf("null") < 0) {
                var u =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages8;
                t.push(u);
              }
              if (this.data.zwimages9.indexOf("null") < 0) {
                var f =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages9;
                t.push(f);
              }
              if (this.data.zwimages10.indexOf("null") < 0) {
                var n =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages10;
                t.push(n);
              }
              console.log(t), wx.previewImage({ current: u, urls: t });
            },
            previewImage9: function (a) {
              var t = [];
              if (
                this.data.zwimages1.indexOf("null") < 0 &&
                "jpg" == this.data.kzm
              ) {
                var i =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages1;
                t.push(i);
              }
              if (this.data.zwimages2.indexOf("null") < 0) {
                var s =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages2;
                t.push(s);
              }
              if (this.data.zwimages3.indexOf("null") < 0) {
                var d =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages3;
                t.push(d);
              }
              if (this.data.zwimages4.indexOf("null") < 0) {
                var e =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages4;
                t.push(e);
              }
              if (this.data.zwimages5.indexOf("null") < 0) {
                var h =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages5;
                t.push(h);
              }
              if (this.data.zwimages6.indexOf("null") < 0) {
                var l =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages6;
                t.push(l);
              }
              if (this.data.zwimages7.indexOf("null") < 0) {
                var p =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages7;
                t.push(p);
              }
              if (this.data.zwimages8.indexOf("null") < 0) {
                var u =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages8;
                t.push(u);
              }
              if (this.data.zwimages9.indexOf("null") < 0) {
                var f =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages9;
                t.push(f);
              }
              if (this.data.zwimages10.indexOf("null") < 0) {
                var n =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages10;
                t.push(n);
              }
              console.log(t), wx.previewImage({ current: f, urls: t });
            },
            previewImage10: function (a) {
              var t = [];
              if (
                this.data.zwimages1.indexOf("null") < 0 &&
                "jpg" == this.data.kzm
              ) {
                var i =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages1;
                t.push(i);
              }
              if (this.data.zwimages2.indexOf("null") < 0) {
                var s =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages2;
                t.push(s);
              }
              if (this.data.zwimages3.indexOf("null") < 0) {
                var d =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages3;
                t.push(d);
              }
              if (this.data.zwimages4.indexOf("null") < 0) {
                var e =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages4;
                t.push(e);
              }
              if (this.data.zwimages5.indexOf("null") < 0) {
                var h =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages5;
                t.push(h);
              }
              if (this.data.zwimages6.indexOf("null") < 0) {
                var l =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages6;
                t.push(l);
              }
              if (this.data.zwimages7.indexOf("null") < 0) {
                var p =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages7;
                t.push(p);
              }
              if (this.data.zwimages8.indexOf("null") < 0) {
                var u =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages8;
                t.push(u);
              }
              if (this.data.zwimages9.indexOf("null") < 0) {
                var f =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages9;
                t.push(f);
              }
              if (this.data.zwimages10.indexOf("null") < 0) {
                var n =
                  this.data.pict +
                  this.data.xf_plu +
                  "//" +
                  this.data.zwimages10;
                t.push(n);
              }
              console.log(t), wx.previewImage({ current: n, urls: t });
            },
            onReady: function () {
              this.videoContext = wx.createVideoContext("myVideo");
            },
            bindplay: function () {
              this.setData({ isShow: !1 }),
                this.videoContext.play(),
                console.log("play");
            },
            bindended: function () {
              console.log("bindended"),
                this.setData({ isShow: !0 }),
                this.videoContext.ended();
            },
            bindpause: function () {
              console.log("pause");
            },
            swiperChange: function (a) {
              this.setData({ current: a.detail.current });
            },
            computeImgHeight: function (a) {
              var t =
                (wx.getSystemInfoSync().windowWidth * a.detail.height) /
                  a.detail.width +
                "px";
              this.setData({ swiperHeight: t });
            },
            onLoad: function (a) {
              (i.globalData.tt = "1"),
                a.id && this.setData({ xf_plu: a.id }),
                console.log(this.data.xf_plu);
              var t = this;
              wx.getSystemInfo({
                success: function (a) {
                  t.setData({ videohight: parseInt(0.75 * a.windowWidth) }),
                    console.log(t.data.videohight);
                },
              });
            },
            previewImage: function (a) {
              var t = a.target.dataset.src;
              wx.previewImage({ current: t, urls: this.data.swiperlist });
            },
          },
          "computeImgHeight",
          function (a) {
            var t =
              (wx.getSystemInfoSync().windowWidth * a.detail.height) /
                a.detail.width +
              "px";
            this.setData({ swiperHeight: t });
          }
        ),
        "sesku",
        function () {
          wx.navigateTo({
            url:
              "/pages/seprices/index/index?xf_plu=" +
              this.data.xf_plu +
              "&xf_desci=" +
              this.data.xf_desci,
          });
        }
      ),
      "onShow",
      function (a) {
        var t = this;
        wx.request({
          url: i.globalData.api + "wx_scsku.ashx",
          data: { name: t.data.xf_plu },
          header: { "content-type": "application/x-www-form-urlencoded" },
          dataType: "json",
          success: function (a) {
            console.log(a);
            var i = Date.parse(new Date());
            (i /= 1e3),
              t.setData({
                replu: a.data,
                tbimages1: a.data[0].TBIMAGES1 + "?temp=" + i,
                tbimages2: a.data[0].TBIMAGES2 + "?temp=" + i,
                tbimages3: a.data[0].TBIMAGES3 + "?temp=" + i,
                zwimages1: a.data[0].ZWIMAGES1 + "?temp=" + i,
                zwimages2: a.data[0].ZWIMAGES2 + "?temp=" + i,
                zwimages3: a.data[0].ZWIMAGES3 + "?temp=" + i,
                zwimages4: a.data[0].ZWIMAGES4 + "?temp=" + i,
                zwimages5: a.data[0].ZWIMAGES5 + "?temp=" + i,
                zwimages6: a.data[0].ZWIMAGES6 + "?temp=" + i,
                zwimages7: a.data[0].ZWIMAGES7 + "?temp=" + i,
                zwimages8: a.data[0].ZWIMAGES8 + "?temp=" + i,
                zwimages9: a.data[0].ZWIMAGES9 + "?temp=" + i,
                zwimages10: a.data[0].ZWIMAGES10 + "?temp=" + i,
                xf_plu: a.data[0].XF_PLU,
                itemname: a.data[0].ITEMNAME,
                xf_desci: a.data[0].XF_DESCI,
                kzm: a.data[0].ZWIMAGES1.substr(-3, 3),
              }),
              a.data[0].ZWIMAGES1
                ? t.setData({ kzm: a.data[0].ZWIMAGES1.substr(-3, 3) })
                : t.setData({ kzm: "jpg" }),
              console.log(t.data.kzm),
              a.data[0].TBIMAGES1 &&
                (t.setData({
                  "swiperlist[0]":
                    t.data.pict + a.data[0].XF_PLU + "//" + a.data[0].TBIMAGES1,
                }),
                console.log(t.data.swiperlist[0])),
              a.data[0].TBIMAGES2 &&
                t.setData({
                  "swiperlist[1]":
                    t.data.pict + a.data[0].XF_PLU + "//" + a.data[0].TBIMAGES2,
                }),
              a.data[0].TBIMAGES3 &&
                t.setData({
                  "swiperlist[2]":
                    t.data.pict + a.data[0].XF_PLU + "//" + a.data[0].TBIMAGES3,
                }),
              console.log(t.data.swiperlist);
          },
        });
      }
    ),
    "back",
    function () {
      wx.navigateBack({ delta: 0 });
    }
  )
);
