var e = require("../../@babel/runtime/helpers/classCallCheck"),
  t = require("../../@babel/runtime/helpers/createClass"),
  o = 310,
  i = "请求参数信息有误",
  s = 600,
  n = "系统错误",
  l = 1e3,
  a = 200,
  r = "https://apis.map.qq.com/ws/",
  c = r + "place/v1/suggestion",
  u = {
    location2query: function (e) {
      if ("string" == typeof e) return e;
      for (var t = "", o = 0; o < e.length; o++) {
        var i = e[o];
        t && (t += ";"),
          i.location && (t = t + i.location.lat + "," + i.location.lng),
          i.latitude && i.longitude && (t = t + i.latitude + "," + i.longitude);
      }
      return t;
    },
    rad: function (e) {
      return (e * Math.PI) / 180;
    },
    getEndLocation: function (e) {
      for (var t = e.split(";"), o = [], i = 0; i < t.length; i++)
        o.push({
          lat: parseFloat(t[i].split(",")[0]),
          lng: parseFloat(t[i].split(",")[1]),
        });
      return o;
    },
    getDistance: function (e, t, o, i) {
      var s = this.rad(e),
        n = this.rad(o),
        l = s - n,
        a = this.rad(t) - this.rad(i),
        r =
          2 *
          Math.asin(
            Math.sqrt(
              Math.pow(Math.sin(l / 2), 2) +
                Math.cos(s) * Math.cos(n) * Math.pow(Math.sin(a / 2), 2)
            )
          );
      return (
        (r *= 6378136.49),
        (r = Math.round(1e4 * r) / 1e4),
        parseFloat(r.toFixed(0))
      );
    },
    getWXLocation: function (e, t, o) {
      wx.getLocation({ type: "gcj02", success: e, fail: t, complete: o });
    },
    getLocationParam: function (e) {
      if ("string" == typeof e) {
        var t = e.split(",");
        e =
          2 === t.length
            ? { latitude: e.split(",")[0], longitude: e.split(",")[1] }
            : {};
      }
      return e;
    },
    polyfillParam: function (e) {
      (e.success = e.success || function () {}),
        (e.fail = e.fail || function () {}),
        (e.complete = e.complete || function () {});
    },
    checkParamKeyEmpty: function (e, t) {
      if (!e[t]) {
        var s = this.buildErrorConfig(o, i + t + "参数格式有误");
        return e.fail(s), e.complete(s), !0;
      }
      return !1;
    },
    checkKeyword: function (e) {
      return !this.checkParamKeyEmpty(e, "keyword");
    },
    checkLocation: function (e) {
      var t = this.getLocationParam(e.location);
      if (!t || !t.latitude || !t.longitude) {
        var s = this.buildErrorConfig(o, i + " location参数格式有误");
        return e.fail(s), e.complete(s), !1;
      }
      return !0;
    },
    buildErrorConfig: function (e, t) {
      return { status: e, message: t };
    },
    handleData: function (e, t, o) {
      if ("search" === o) {
        for (var i = t.data, s = [], n = 0; n < i.length; n++)
          s.push({
            id: i[n].id || null,
            title: i[n].title || null,
            latitude: (i[n].location && i[n].location.lat) || null,
            longitude: (i[n].location && i[n].location.lng) || null,
            address: i[n].address || null,
            category: i[n].category || null,
            tel: i[n].tel || null,
            adcode: (i[n].ad_info && i[n].ad_info.adcode) || null,
            city: (i[n].ad_info && i[n].ad_info.city) || null,
            district: (i[n].ad_info && i[n].ad_info.district) || null,
            province: (i[n].ad_info && i[n].ad_info.province) || null,
          });
        e.success(t, { searchResult: i, searchSimplify: s });
      } else if ("suggest" === o) {
        var l = t.data,
          a = [];
        for (n = 0; n < l.length; n++)
          a.push({
            adcode: l[n].adcode || null,
            address: l[n].address || null,
            category: l[n].category || null,
            city: l[n].city || null,
            district: l[n].district || null,
            id: l[n].id || null,
            latitude: (l[n].location && l[n].location.lat) || null,
            longitude: (l[n].location && l[n].location.lng) || null,
            province: l[n].province || null,
            title: l[n].title || null,
            type: l[n].type || null,
          });
        e.success(t, { suggestResult: l, suggestSimplify: a });
      } else if ("reverseGeocoder" === o) {
        var r = t.result,
          c = {
            address: r.address || null,
            latitude: (r.location && r.location.lat) || null,
            longitude: (r.location && r.location.lng) || null,
            adcode: (r.ad_info && r.ad_info.adcode) || null,
            city: (r.address_component && r.address_component.city) || null,
            district:
              (r.address_component && r.address_component.district) || null,
            nation: (r.address_component && r.address_component.nation) || null,
            province:
              (r.address_component && r.address_component.province) || null,
            street: (r.address_component && r.address_component.street) || null,
            street_number:
              (r.address_component && r.address_component.street_number) ||
              null,
            recommend:
              (r.formatted_addresses && r.formatted_addresses.recommend) ||
              null,
            rough:
              (r.formatted_addresses && r.formatted_addresses.rough) || null,
          };
        if (r.pois) {
          var u = r.pois,
            d = [];
          for (n = 0; n < u.length; n++)
            d.push({
              id: u[n].id || null,
              title: u[n].title || null,
              latitude: (u[n].location && u[n].location.lat) || null,
              longitude: (u[n].location && u[n].location.lng) || null,
              address: u[n].address || null,
              category: u[n].category || null,
              adcode: (u[n].ad_info && u[n].ad_info.adcode) || null,
              city: (u[n].ad_info && u[n].ad_info.city) || null,
              district: (u[n].ad_info && u[n].ad_info.district) || null,
              province: (u[n].ad_info && u[n].ad_info.province) || null,
            });
          e.success(t, {
            reverseGeocoderResult: r,
            reverseGeocoderSimplify: c,
            pois: u,
            poisSimplify: d,
          });
        } else
          e.success(t, {
            reverseGeocoderResult: r,
            reverseGeocoderSimplify: c,
          });
      } else if ("geocoder" === o) {
        var f = t.result,
          p = {
            title: f.title || null,
            latitude: (f.location && f.location.lat) || null,
            longitude: (f.location && f.location.lng) || null,
            adcode: (f.ad_info && f.ad_info.adcode) || null,
            province:
              (f.address_components && f.address_components.province) || null,
            city: (f.address_components && f.address_components.city) || null,
            district:
              (f.address_components && f.address_components.district) || null,
            street:
              (f.address_components && f.address_components.street) || null,
            street_number:
              (f.address_components && f.address_components.street_number) ||
              null,
            level: f.level || null,
          };
        e.success(t, { geocoderResult: f, geocoderSimplify: p });
      } else if ("getCityList" === o) {
        var g = t.result[0],
          m = t.result[1],
          y = t.result[2];
        e.success(t, { provinceResult: g, cityResult: m, districtResult: y });
      } else if ("getDistrictByCityId" === o) {
        var h = t.result[0];
        e.success(t, h);
      } else if ("calculateDistance" === o) {
        var _ = t.result.elements,
          v = [];
        for (n = 0; n < _.length; n++) v.push(_[n].distance);
        e.success(t, { calculateDistanceResult: _, distance: v });
      } else e.success(t);
    },
    buildWxRequestConfig: function (e, t, o) {
      var i = this;
      return (
        (t.header = { "content-type": "application/json" }),
        (t.method = "GET"),
        (t.success = function (t) {
          var s = t.data;
          0 === s.status ? i.handleData(e, s, o) : e.fail(s);
        }),
        (t.fail = function (t) {
          (t.statusCode = l), e.fail(i.buildErrorConfig(l, t.errMsg));
        }),
        (t.complete = function (t) {
          switch (+t.statusCode) {
            case l:
              e.complete(i.buildErrorConfig(l, t.errMsg));
              break;
            case a:
              var o = t.data;
              0 === o.status
                ? e.complete(o)
                : e.complete(i.buildErrorConfig(o.status, o.message));
              break;
            default:
              e.complete(i.buildErrorConfig(s, n));
          }
        }),
        t
      );
    },
    locationProcess: function (e, t, o, i) {
      var s = this;
      if (
        ((o =
          o ||
          function (t) {
            (t.statusCode = l), e.fail(s.buildErrorConfig(l, t.errMsg));
          }),
        (i =
          i ||
          function (t) {
            t.statusCode == l && e.complete(s.buildErrorConfig(l, t.errMsg));
          }),
        e.location)
      ) {
        if (s.checkLocation(e)) {
          t(u.getLocationParam(e.location));
        }
      } else s.getWXLocation(t, o, i);
    },
  },
  d = (function () {
    return t(
      function t(o) {
        if ((e(this, t), !o.key)) throw Error("key值不能为空");
        this.key = o.key;
      },
      [
        {
          key: "search",
          value: function (e) {
            if (((e = e || {}), u.polyfillParam(e), u.checkKeyword(e))) {
              var t = {
                keyword: e.keyword,
                orderby: e.orderby || "_distance",
                page_size: e.page_size || 10,
                page_index: e.page_index || 1,
                output: "json",
                key: this.key,
              };
              e.address_format && (t.address_format = e.address_format),
                e.filter && (t.filter = e.filter);
              var o = e.distance || "1000",
                i = e.auto_extend || 1,
                s = null,
                n = null;
              e.region && (s = e.region), e.rectangle && (n = e.rectangle);
              u.locationProcess(e, function (l) {
                (t.boundary =
                  s && !n
                    ? "region(" +
                      s +
                      "," +
                      i +
                      "," +
                      l.latitude +
                      "," +
                      l.longitude +
                      ")"
                    : n && !s
                    ? "rectangle(" + n + ")"
                    : "nearby(" +
                      l.latitude +
                      "," +
                      l.longitude +
                      "," +
                      o +
                      "," +
                      i +
                      ")"),
                  wx.request(
                    u.buildWxRequestConfig(
                      e,
                      {
                        url: "https://apis.map.qq.com/ws/place/v1/search",
                        data: t,
                      },
                      "search"
                    )
                  );
              });
            }
          },
        },
        {
          key: "getSuggestion",
          value: function (e) {
            if (((e = e || {}), u.polyfillParam(e), u.checkKeyword(e))) {
              var t = {
                keyword: e.keyword,
                region: e.region || "全国",
                region_fix: e.region_fix || 0,
                policy: e.policy || 0,
                page_size: e.page_size || 10,
                page_index: e.page_index || 1,
                get_subpois: e.get_subpois || 0,
                output: "json",
                key: this.key,
              };
              if (
                (e.address_format && (t.address_format = e.address_format),
                e.filter && (t.filter = e.filter),
                e.location)
              ) {
                u.locationProcess(e, function (o) {
                  (t.location = o.latitude + "," + o.longitude),
                    wx.request(
                      u.buildWxRequestConfig(e, { url: c, data: t }, "suggest")
                    );
                });
              } else
                wx.request(
                  u.buildWxRequestConfig(e, { url: c, data: t }, "suggest")
                );
            }
          },
        },
        {
          key: "reverseGeocoder",
          value: function (e) {
            (e = e || {}), u.polyfillParam(e);
            var t = {
              coord_type: e.coord_type || 5,
              get_poi: e.get_poi || 0,
              output: "json",
              key: this.key,
            };
            e.poi_options && (t.poi_options = e.poi_options);
            u.locationProcess(e, function (o) {
              (t.location = o.latitude + "," + o.longitude),
                wx.request(
                  u.buildWxRequestConfig(
                    e,
                    { url: "https://apis.map.qq.com/ws/geocoder/v1/", data: t },
                    "reverseGeocoder"
                  )
                );
            });
          },
        },
        {
          key: "geocoder",
          value: function (e) {
            if (
              ((e = e || {}),
              u.polyfillParam(e),
              !u.checkParamKeyEmpty(e, "address"))
            ) {
              var t = { address: e.address, output: "json", key: this.key };
              e.region && (t.region = e.region),
                wx.request(
                  u.buildWxRequestConfig(
                    e,
                    { url: "https://apis.map.qq.com/ws/geocoder/v1/", data: t },
                    "geocoder"
                  )
                );
            }
          },
        },
        {
          key: "getCityList",
          value: function (e) {
            (e = e || {}), u.polyfillParam(e);
            var t = { output: "json", key: this.key };
            wx.request(
              u.buildWxRequestConfig(
                e,
                { url: "https://apis.map.qq.com/ws/district/v1/list", data: t },
                "getCityList"
              )
            );
          },
        },
        {
          key: "getDistrictByCityId",
          value: function (e) {
            if (
              ((e = e || {}),
              u.polyfillParam(e),
              !u.checkParamKeyEmpty(e, "id"))
            ) {
              var t = { id: e.id || "", output: "json", key: this.key };
              wx.request(
                u.buildWxRequestConfig(
                  e,
                  {
                    url: "https://apis.map.qq.com/ws/district/v1/getchildren",
                    data: t,
                  },
                  "getDistrictByCityId"
                )
              );
            }
          },
        },
        {
          key: "calculateDistance",
          value: function (e) {
            if (
              ((e = e || {}),
              u.polyfillParam(e),
              !u.checkParamKeyEmpty(e, "to"))
            ) {
              var t = {
                mode: e.mode || "walking",
                to: u.location2query(e.to),
                output: "json",
                key: this.key,
              };
              if ((e.from && (e.location = e.from), "straight" == t.mode)) {
                var o = function (o) {
                  for (
                    var i = u.getEndLocation(t.to),
                      s = {
                        message: "query ok",
                        result: { elements: [] },
                        status: 0,
                      },
                      n = 0;
                    n < i.length;
                    n++
                  )
                    s.result.elements.push({
                      distance: u.getDistance(
                        o.latitude,
                        o.longitude,
                        i[n].lat,
                        i[n].lng
                      ),
                      duration: 0,
                      from: { lat: o.latitude, lng: o.longitude },
                      to: { lat: i[n].lat, lng: i[n].lng },
                    });
                  var l = s.result.elements,
                    a = [];
                  for (n = 0; n < l.length; n++) a.push(l[n].distance);
                  return e.success(s, {
                    calculateResult: l,
                    distanceResult: a,
                  });
                };
                u.locationProcess(e, o);
              } else {
                o = function (o) {
                  (t.from = o.latitude + "," + o.longitude),
                    wx.request(
                      u.buildWxRequestConfig(
                        e,
                        {
                          url: "https://apis.map.qq.com/ws/distance/v1/",
                          data: t,
                        },
                        "calculateDistance"
                      )
                    );
                };
                u.locationProcess(e, o);
              }
            }
          },
        },
      ]
    );
  })();
module.exports = d;
