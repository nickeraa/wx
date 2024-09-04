var t = require("../../@babel/runtime/helpers/typeof");

!function(e, n) {
    "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define([ "exports" ], n) : n((void 0).echarts = {});
}(0, function(e) {
    function n(t, e) {
        function n() {
            this.constructor = t;
        }
        if ("function" != typeof e && null !== e) throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
        ec(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, 
        new n());
    }
    function i(t) {
        for (var e in uc) t[e] && (uc[e] = t[e]);
    }
    function r() {
        return wc++;
    }
    function o() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        "undefined" != typeof console && console.error.apply(console, t);
    }
    function a(e) {
        if (null == e || "object" != t(e)) return e;
        var n = e, i = pc.call(e);
        if ("[object Array]" === i) {
            if (!V(e)) {
                n = [];
                for (var r = 0, o = e.length; o > r; r++) n[r] = a(e[r]);
            }
        } else if (cc[i]) {
            if (!V(e)) {
                var s = e.constructor;
                if (s.from) n = s.from(e); else {
                    n = new s(e.length);
                    for (r = 0, o = e.length; o > r; r++) n[r] = e[r];
                }
            }
        } else if (!hc[i] && !V(e) && !k(e)) for (var l in n = {}, e) e.hasOwnProperty(l) && l !== xc && (n[l] = a(e[l]));
        return n;
    }
    function s(t, e, n) {
        if (!T(e) || !T(t)) return n ? a(e) : t;
        for (var i in e) if (e.hasOwnProperty(i) && i !== xc) {
            var r = t[i], o = e[i];
            !T(o) || !T(r) || x(o) || x(r) || k(o) || k(r) || C(o) || C(r) || V(o) || V(r) ? !n && i in t || (t[i] = a(e[i])) : s(r, o, n);
        }
        return t;
    }
    function l(t, e) {
        if (Object.assign) Object.assign(t, e); else for (var n in e) e.hasOwnProperty(n) && n !== xc && (t[n] = e[n]);
        return t;
    }
    function u(t, e, n) {
        for (var i = m(e), r = 0; r < i.length; r++) {
            var o = i[r];
            (n ? null != e[o] : null == t[o]) && (t[o] = e[o]);
        }
        return t;
    }
    function h(t, e) {
        if (t) {
            if (t.indexOf) return t.indexOf(e);
            for (var n = 0, i = t.length; i > n; n++) if (t[n] === e) return n;
        }
        return -1;
    }
    function c(t, e) {
        function n() {}
        var i = t.prototype;
        for (var r in n.prototype = e.prototype, t.prototype = new n(), i) i.hasOwnProperty(r) && (t.prototype[r] = i[r]);
        t.prototype.constructor = t, t.superClass = e;
    }
    function p(t, e, n) {
        if (t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, 
        Object.getOwnPropertyNames) for (var i = Object.getOwnPropertyNames(e), r = 0; r < i.length; r++) {
            var o = i[r];
            "constructor" !== o && (n ? null != e[o] : null == t[o]) && (t[o] = e[o]);
        } else u(t, e, n);
    }
    function d(t) {
        return !!t && ("string" != typeof t && "number" == typeof t.length);
    }
    function f(t, e, n) {
        if (t && e) if (t.forEach && t.forEach === fc) t.forEach(e, n); else if (t.length === +t.length) for (var i = 0, r = t.length; r > i; i++) e.call(n, t[i], i, t); else for (var o in t) t.hasOwnProperty(o) && e.call(n, t[o], o, t);
    }
    function g(t, e, n) {
        if (!t) return [];
        if (!e) return B(t);
        if (t.map && t.map === vc) return t.map(e, n);
        for (var i = [], r = 0, o = t.length; o > r; r++) i.push(e.call(n, t[r], r, t));
        return i;
    }
    function y(t, e, n, i) {
        if (t && e) {
            for (var r = 0, o = t.length; o > r; r++) n = e.call(i, n, t[r], r, t);
            return n;
        }
    }
    function v(t, e, n) {
        if (!t) return [];
        if (!e) return B(t);
        if (t.filter && t.filter === gc) return t.filter(e, n);
        for (var i = [], r = 0, o = t.length; o > r; r++) e.call(n, t[r], r, t) && i.push(t[r]);
        return i;
    }
    function m(t) {
        if (!t) return [];
        if (Object.keys) return Object.keys(t);
        var e = [];
        for (var n in t) t.hasOwnProperty(n) && e.push(n);
        return e;
    }
    function _(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        return function() {
            return t.apply(this, e.concat(yc.call(arguments)));
        };
    }
    function x(t) {
        return Array.isArray ? Array.isArray(t) : "[object Array]" === pc.call(t);
    }
    function w(t) {
        return "function" == typeof t;
    }
    function b(t) {
        return "string" == typeof t;
    }
    function S(t) {
        return "[object String]" === pc.call(t);
    }
    function M(t) {
        return "number" == typeof t;
    }
    function T(e) {
        var n = t(e);
        return "function" === n || !!e && "object" === n;
    }
    function C(t) {
        return !!hc[pc.call(t)];
    }
    function I(t) {
        return !!cc[pc.call(t)];
    }
    function k(e) {
        return "object" == t(e) && "number" == typeof e.nodeType && "object" == t(e.ownerDocument);
    }
    function D(t) {
        return null != t.colorStops;
    }
    function A(t) {
        return null != t.image;
    }
    function P(t) {
        return t != t;
    }
    function L() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        for (var n = 0, i = t.length; i > n; n++) if (null != t[n]) return t[n];
    }
    function O(t, e) {
        return null != t ? t : e;
    }
    function R(t, e, n) {
        return null != t ? t : null != e ? e : n;
    }
    function B(t) {
        for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        return yc.apply(t, e);
    }
    function E(t) {
        if ("number" == typeof t) return [ t, t, t, t ];
        var e = t.length;
        return 2 === e ? [ t[0], t[1], t[0], t[1] ] : 3 === e ? [ t[0], t[1], t[2], t[1] ] : t;
    }
    function z(t, e) {
        if (!t) throw new Error(e);
    }
    function N(t) {
        return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
    function F(t) {
        t[Mc] = !0;
    }
    function V(t) {
        return t[Mc];
    }
    function H(t) {
        return new Ic(t);
    }
    function W(t, e) {
        for (var n = new t.constructor(t.length + e.length), i = 0; i < t.length; i++) n[i] = t[i];
        var r = t.length;
        for (i = 0; i < e.length; i++) n[i + r] = e[i];
        return n;
    }
    function G(t, e) {
        var n;
        if (Object.create) n = Object.create(t); else {
            var i = function() {};
            i.prototype = t, n = new i();
        }
        return e && l(n, e), n;
    }
    function U(t) {
        var e = t.style;
        e.webkitUserSelect = "none", e.userSelect = "none", e.webkitTapHighlightColor = "rgba(0,0,0,0)", 
        e["-webkit-touch-callout"] = "none";
    }
    function X(t, e) {
        return t.hasOwnProperty(e);
    }
    function Y() {}
    function q(t, e) {
        return null == t && (t = 0), null == e && (e = 0), [ t, e ];
    }
    function j(t) {
        return [ t[0], t[1] ];
    }
    function Z(t, e, n) {
        return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t;
    }
    function K(t, e, n) {
        return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t;
    }
    function $(t) {
        return Math.sqrt(Q(t));
    }
    function Q(t) {
        return t[0] * t[0] + t[1] * t[1];
    }
    function J(t, e, n) {
        return t[0] = e[0] * n, t[1] = e[1] * n, t;
    }
    function tt(t, e) {
        var n = $(e);
        return 0 === n ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / n, t[1] = e[1] / n), t;
    }
    function et(t, e) {
        return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]));
    }
    function nt(t, e) {
        return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]);
    }
    function it(t, e, n, i) {
        return t[0] = e[0] + i * (n[0] - e[0]), t[1] = e[1] + i * (n[1] - e[1]), t;
    }
    function rt(t, e, n) {
        var i = e[0], r = e[1];
        return t[0] = n[0] * i + n[2] * r + n[4], t[1] = n[1] * i + n[3] * r + n[5], t;
    }
    function ot(t, e, n) {
        return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t;
    }
    function at(t, e, n) {
        return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t;
    }
    function st(t, e, n, i, r, o) {
        var a = i + "-" + r, s = t.length;
        if (o.hasOwnProperty(a)) return o[a];
        if (1 === e) {
            var l = Math.round(Math.log((1 << s) - 1 & ~r) / Nc);
            return t[n][l];
        }
        for (var u = i | 1 << n, h = n + 1; i & 1 << h; ) h++;
        for (var c = 0, p = 0, d = 0; s > p; p++) {
            var f = 1 << p;
            f & r || (c += (d % 2 ? -1 : 1) * t[n][p] * st(t, e - 1, h, u, r | f, o), d++);
        }
        return o[a] = c, c;
    }
    function lt(t, e) {
        var n = [ [ t[0], t[1], 1, 0, 0, 0, -e[0] * t[0], -e[0] * t[1] ], [ 0, 0, 0, t[0], t[1], 1, -e[1] * t[0], -e[1] * t[1] ], [ t[2], t[3], 1, 0, 0, 0, -e[2] * t[2], -e[2] * t[3] ], [ 0, 0, 0, t[2], t[3], 1, -e[3] * t[2], -e[3] * t[3] ], [ t[4], t[5], 1, 0, 0, 0, -e[4] * t[4], -e[4] * t[5] ], [ 0, 0, 0, t[4], t[5], 1, -e[5] * t[4], -e[5] * t[5] ], [ t[6], t[7], 1, 0, 0, 0, -e[6] * t[6], -e[6] * t[7] ], [ 0, 0, 0, t[6], t[7], 1, -e[7] * t[6], -e[7] * t[7] ] ], i = {}, r = st(n, 8, 0, 0, 0, i);
        if (0 !== r) {
            for (var o = [], a = 0; 8 > a; a++) for (var s = 0; 8 > s; s++) null == o[s] && (o[s] = 0), 
            o[s] += ((a + s) % 2 ? -1 : 1) * st(n, 7, 0 === a ? 1 : 0, 1 << a, 1 << s, i) / r * e[a];
            return function(t, e, n) {
                var i = e * o[6] + n * o[7] + 1;
                t[0] = (e * o[0] + n * o[1] + o[2]) / i, t[1] = (e * o[3] + n * o[4] + o[5]) / i;
            };
        }
    }
    function ut(t, e, n, i, r) {
        if (e.getBoundingClientRect && ic.domSupported && !ht(e)) {
            var o = e[Fc] || (e[Fc] = {}), a = function(t, e, n) {
                for (var i = n ? "invTrans" : "trans", r = e[i], o = e.srcCoords, a = [], s = [], l = !0, u = 0; 4 > u; u++) {
                    var h = t[u].getBoundingClientRect(), c = 2 * u, p = h.left, d = h.top;
                    a.push(p, d), l = l && o && p === o[c] && d === o[c + 1], s.push(t[u].offsetLeft, t[u].offsetTop);
                }
                return l && r ? r : (e.srcCoords = a, e[i] = n ? lt(s, a) : lt(a, s));
            }(function(t, e) {
                var n = e.markers;
                if (n) return n;
                n = e.markers = [];
                for (var i = [ "left", "right" ], r = [ "top", "bottom" ], o = 0; 4 > o; o++) {
                    var a = document.createElement("div"), s = a.style, l = o % 2, u = (o >> 1) % 2;
                    s.cssText = [ "position: absolute", "visibility: hidden", "padding: 0", "margin: 0", "border-width: 0", "user-select: none", "width:0", "height:0", i[l] + ":0", r[u] + ":0", i[1 - l] + ":auto", r[1 - u] + ":auto", "" ].join("!important;"), 
                    t.appendChild(a), n.push(a);
                }
                return n;
            }(e, o), o, r);
            if (a) return a(t, n, i), !0;
        }
        return !1;
    }
    function ht(t) {
        return "CANVAS" === t.nodeName.toUpperCase();
    }
    function ct(t) {
        return null == t ? "" : (t + "").replace(Hc, function(t, e) {
            return Wc[e];
        });
    }
    function pt(t, e, n, i) {
        return n = n || {}, i ? dt(t, e, n) : Xc && null != e.layerX && e.layerX !== e.offsetX ? (n.zrX = e.layerX, 
        n.zrY = e.layerY) : null != e.offsetX ? (n.zrX = e.offsetX, n.zrY = e.offsetY) : dt(t, e, n), 
        n;
    }
    function dt(t, e, n) {
        if (ic.domSupported && t.getBoundingClientRect) {
            var i = e.clientX, r = e.clientY;
            if (ht(t)) {
                var o = t.getBoundingClientRect();
                return n.zrX = i - o.left, void (n.zrY = r - o.top);
            }
            if (ut(Uc, t, i, r)) return n.zrX = Uc[0], void (n.zrY = Uc[1]);
        }
        n.zrX = n.zrY = 0;
    }
    function ft(t) {
        return t || window.event;
    }
    function gt(t, e, n) {
        if (null != (e = ft(e)).zrX) return e;
        var i = e.type;
        if (i && i.indexOf("touch") >= 0) {
            var r = "touchend" !== i ? e.targetTouches[0] : e.changedTouches[0];
            r && pt(t, r, e, n);
        } else {
            pt(t, e, e, n);
            var o = function(t) {
                var e = t.wheelDelta;
                if (e) return e;
                var n = t.deltaX, i = t.deltaY;
                return null == n || null == i ? e : 3 * Math.abs(0 !== i ? i : n) * (i > 0 ? -1 : 0 > i ? 1 : n > 0 ? -1 : 1);
            }(e);
            e.zrDelta = o ? o / 120 : -(e.detail || 0) / 3;
        }
        var a = e.button;
        return null == e.which && void 0 !== a && Gc.test(e.type) && (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), 
        e;
    }
    function yt(t, e, n, i) {
        t.removeEventListener(e, n, i);
    }
    function vt(t) {
        var e = t[1][0] - t[0][0], n = t[1][1] - t[0][1];
        return Math.sqrt(e * e + n * n);
    }
    function mt() {
        return [ 1, 0, 0, 1, 0, 0 ];
    }
    function _t(t) {
        return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
    }
    function xt(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], 
        t;
    }
    function wt(t, e, n) {
        var i = e[0] * n[0] + e[2] * n[1], r = e[1] * n[0] + e[3] * n[1], o = e[0] * n[2] + e[2] * n[3], a = e[1] * n[2] + e[3] * n[3], s = e[0] * n[4] + e[2] * n[5] + e[4], l = e[1] * n[4] + e[3] * n[5] + e[5];
        return t[0] = i, t[1] = r, t[2] = o, t[3] = a, t[4] = s, t[5] = l, t;
    }
    function bt(t, e, n) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + n[0], t[5] = e[5] + n[1], 
        t;
    }
    function St(t, e, n) {
        var i = e[0], r = e[2], o = e[4], a = e[1], s = e[3], l = e[5], u = Math.sin(n), h = Math.cos(n);
        return t[0] = i * h + a * u, t[1] = -i * u + a * h, t[2] = r * h + s * u, t[3] = -r * u + h * s, 
        t[4] = h * o + u * l, t[5] = h * l - u * o, t;
    }
    function Mt(t, e, n) {
        var i = n[0], r = n[1];
        return t[0] = e[0] * i, t[1] = e[1] * r, t[2] = e[2] * i, t[3] = e[3] * r, t[4] = e[4] * i, 
        t[5] = e[5] * r, t;
    }
    function Tt(t, e) {
        var n = e[0], i = e[2], r = e[4], o = e[1], a = e[3], s = e[5], l = n * a - o * i;
        return l ? (l = 1 / l, t[0] = a * l, t[1] = -o * l, t[2] = -i * l, t[3] = n * l, 
        t[4] = (i * s - a * r) * l, t[5] = (o * r - n * s) * l, t) : null;
    }
    function Ct() {
        Yc(this.event);
    }
    function It(t, e, n) {
        if (t[t.rectHover ? "rectContain" : "contain"](e, n)) {
            for (var i = t, r = void 0, o = !1; i; ) {
                if (i.ignoreClip && (o = !0), !o) {
                    var a = i.getClipPath();
                    if (a && !a.contain(e, n)) return !1;
                    i.silent && (r = !0);
                }
                var s = i.__hostTarget;
                i = s || i.parent;
            }
            return !r || ap;
        }
        return !1;
    }
    function kt(t, e, n, i, r) {
        for (var o = t.length - 1; o >= 0; o--) {
            var a = t[o], s = void 0;
            if (a !== r && !a.ignore && (s = It(a, n, i)) && (!e.topTarget && (e.topTarget = a), 
            s !== ap)) {
                e.target = a;
                break;
            }
        }
    }
    function Dt(t, e, n) {
        var i = t.painter;
        return 0 > e || e > i.getWidth() || 0 > n || n > i.getHeight();
    }
    function At(t, e, n, i) {
        var r = e + 1;
        if (r === n) return 1;
        if (i(t[r++], t[e]) < 0) {
            for (;n > r && i(t[r], t[r - 1]) < 0; ) r++;
            !function(t, e, n) {
                for (n--; n > e; ) {
                    var i = t[e];
                    t[e++] = t[n], t[n--] = i;
                }
            }(t, e, r);
        } else for (;n > r && i(t[r], t[r - 1]) >= 0; ) r++;
        return r - e;
    }
    function Pt(t, e, n, i, r) {
        for (i === e && i++; n > i; i++) {
            for (var o, a = t[i], s = e, l = i; l > s; ) r(a, t[o = s + l >>> 1]) < 0 ? l = o : s = o + 1;
            var u = i - s;
            switch (u) {
              case 3:
                t[s + 3] = t[s + 2];

              case 2:
                t[s + 2] = t[s + 1];

              case 1:
                t[s + 1] = t[s];
                break;

              default:
                for (;u > 0; ) t[s + u] = t[s + u - 1], u--;
            }
            t[s] = a;
        }
    }
    function Lt(t, e, n, i, r, o) {
        var a = 0, s = 0, l = 1;
        if (o(t, e[n + r]) > 0) {
            for (s = i - r; s > l && o(t, e[n + r + l]) > 0; ) a = l, 0 >= (l = 1 + (l << 1)) && (l = s);
            l > s && (l = s), a += r, l += r;
        } else {
            for (s = r + 1; s > l && o(t, e[n + r - l]) <= 0; ) a = l, 0 >= (l = 1 + (l << 1)) && (l = s);
            l > s && (l = s);
            var u = a;
            a = r - l, l = r - u;
        }
        for (a++; l > a; ) {
            var h = a + (l - a >>> 1);
            o(t, e[n + h]) > 0 ? a = h + 1 : l = h;
        }
        return l;
    }
    function Ot(t, e, n, i, r, o) {
        var a = 0, s = 0, l = 1;
        if (o(t, e[n + r]) < 0) {
            for (s = r + 1; s > l && o(t, e[n + r - l]) < 0; ) a = l, 0 >= (l = 1 + (l << 1)) && (l = s);
            l > s && (l = s);
            var u = a;
            a = r - l, l = r - u;
        } else {
            for (s = i - r; s > l && o(t, e[n + r + l]) >= 0; ) a = l, 0 >= (l = 1 + (l << 1)) && (l = s);
            l > s && (l = s), a += r, l += r;
        }
        for (a++; l > a; ) {
            var h = a + (l - a >>> 1);
            o(t, e[n + h]) < 0 ? l = h : a = h + 1;
        }
        return l;
    }
    function Rt(t, e, n, i) {
        n || (n = 0), i || (i = t.length);
        var r = i - n;
        if (!(2 > r)) {
            var o = 0;
            if (pp > r) return void Pt(t, n, i, n + (o = At(t, n, i, e)), e);
            var a = function(t, e) {
                function n(n) {
                    var s = o[n], u = a[n], h = o[n + 1], c = a[n + 1];
                    a[n] = u + c, n === l - 3 && (o[n + 1] = o[n + 2], a[n + 1] = a[n + 2]), l--;
                    var p = Ot(t[h], t, s, u, 0, e);
                    s += p, 0 !== (u -= p) && (0 !== (c = Lt(t[s + u - 1], t, h, c, c - 1, e)) && (c >= u ? i(s, u, h, c) : r(s, u, h, c)));
                }
                function i(n, i, r, o) {
                    var a = 0;
                    for (a = 0; i > a; a++) u[a] = t[n + a];
                    var l = 0, h = r, c = n;
                    if (t[c++] = t[h++], 0 != --o) {
                        if (1 === i) {
                            for (a = 0; o > a; a++) t[c + a] = t[h + a];
                            return void (t[c + o] = u[l]);
                        }
                        for (var p, d, f, g = s; ;) {
                            p = 0, d = 0, f = !1;
                            do {
                                if (e(t[h], u[l]) < 0) {
                                    if (t[c++] = t[h++], d++, p = 0, 0 == --o) {
                                        f = !0;
                                        break;
                                    }
                                } else if (t[c++] = u[l++], p++, d = 0, 1 == --i) {
                                    f = !0;
                                    break;
                                }
                            } while (g > (p | d));
                            if (f) break;
                            do {
                                if (0 !== (p = Ot(t[h], u, l, i, 0, e))) {
                                    for (a = 0; p > a; a++) t[c + a] = u[l + a];
                                    if (c += p, l += p, 1 >= (i -= p)) {
                                        f = !0;
                                        break;
                                    }
                                }
                                if (t[c++] = t[h++], 0 == --o) {
                                    f = !0;
                                    break;
                                }
                                if (0 !== (d = Lt(u[l], t, h, o, 0, e))) {
                                    for (a = 0; d > a; a++) t[c + a] = t[h + a];
                                    if (c += d, h += d, 0 === (o -= d)) {
                                        f = !0;
                                        break;
                                    }
                                }
                                if (t[c++] = u[l++], 1 == --i) {
                                    f = !0;
                                    break;
                                }
                                g--;
                            } while (p >= dp || d >= dp);
                            if (f) break;
                            0 > g && (g = 0), g += 2;
                        }
                        if (1 > (s = g) && (s = 1), 1 === i) {
                            for (a = 0; o > a; a++) t[c + a] = t[h + a];
                            t[c + o] = u[l];
                        } else {
                            if (0 === i) throw new Error();
                            for (a = 0; i > a; a++) t[c + a] = u[l + a];
                        }
                    } else for (a = 0; i > a; a++) t[c + a] = u[l + a];
                }
                function r(n, i, r, o) {
                    var a = 0;
                    for (a = 0; o > a; a++) u[a] = t[r + a];
                    var l = n + i - 1, h = o - 1, c = r + o - 1, p = 0, d = 0;
                    if (t[c--] = t[l--], 0 != --i) {
                        if (1 === o) {
                            for (d = (c -= i) + 1, p = (l -= i) + 1, a = i - 1; a >= 0; a--) t[d + a] = t[p + a];
                            return void (t[c] = u[h]);
                        }
                        for (var f = s; ;) {
                            var g = 0, y = 0, v = !1;
                            do {
                                if (e(u[h], t[l]) < 0) {
                                    if (t[c--] = t[l--], g++, y = 0, 0 == --i) {
                                        v = !0;
                                        break;
                                    }
                                } else if (t[c--] = u[h--], y++, g = 0, 1 == --o) {
                                    v = !0;
                                    break;
                                }
                            } while (f > (g | y));
                            if (v) break;
                            do {
                                if (0 !== (g = i - Ot(u[h], t, n, i, i - 1, e))) {
                                    for (i -= g, d = (c -= g) + 1, p = (l -= g) + 1, a = g - 1; a >= 0; a--) t[d + a] = t[p + a];
                                    if (0 === i) {
                                        v = !0;
                                        break;
                                    }
                                }
                                if (t[c--] = u[h--], 1 == --o) {
                                    v = !0;
                                    break;
                                }
                                if (0 !== (y = o - Lt(t[l], u, 0, o, o - 1, e))) {
                                    for (o -= y, d = (c -= y) + 1, p = (h -= y) + 1, a = 0; y > a; a++) t[d + a] = u[p + a];
                                    if (1 >= o) {
                                        v = !0;
                                        break;
                                    }
                                }
                                if (t[c--] = t[l--], 0 == --i) {
                                    v = !0;
                                    break;
                                }
                                f--;
                            } while (g >= dp || y >= dp);
                            if (v) break;
                            0 > f && (f = 0), f += 2;
                        }
                        if (1 > (s = f) && (s = 1), 1 === o) {
                            for (d = (c -= i) + 1, p = (l -= i) + 1, a = i - 1; a >= 0; a--) t[d + a] = t[p + a];
                            t[c] = u[h];
                        } else {
                            if (0 === o) throw new Error();
                            for (p = c - (o - 1), a = 0; o > a; a++) t[p + a] = u[a];
                        }
                    } else for (p = c - (o - 1), a = 0; o > a; a++) t[p + a] = u[a];
                }
                var o, a, s = dp, l = 0, u = [];
                return o = [], a = [], {
                    mergeRuns: function() {
                        for (;l > 1; ) {
                            var t = l - 2;
                            if (t >= 1 && a[t - 1] <= a[t] + a[t + 1] || t >= 2 && a[t - 2] <= a[t] + a[t - 1]) a[t - 1] < a[t + 1] && t--; else if (a[t] > a[t + 1]) break;
                            n(t);
                        }
                    },
                    forceMergeRuns: function() {
                        for (;l > 1; ) {
                            var t = l - 2;
                            t > 0 && a[t - 1] < a[t + 1] && t--, n(t);
                        }
                    },
                    pushRun: function(t, e) {
                        o[l] = t, a[l] = e, l += 1;
                    }
                };
            }(t, e), s = function(t) {
                for (var e = 0; t >= pp; ) e |= 1 & t, t >>= 1;
                return t + e;
            }(r);
            do {
                if (s > (o = At(t, n, i, e))) {
                    var l = r;
                    l > s && (l = s), Pt(t, n, n + l, n + o, e), o = l;
                }
                a.pushRun(n, o), a.mergeRuns(), r -= o, n += o;
            } while (0 !== r);
            a.forceMergeRuns();
        }
    }
    function Bt() {
        yp || (yp = !0, console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));
    }
    function Et(t, e) {
        return t.zlevel === e.zlevel ? t.z === e.z ? t.z2 - e.z2 : t.z - e.z : t.zlevel - e.zlevel;
    }
    function zt(t) {
        return t > -bp && bp > t;
    }
    function Nt(t) {
        return t > bp || -bp > t;
    }
    function Ft(t, e, n, i, r) {
        var o = 1 - r;
        return o * o * (o * t + 3 * r * e) + r * r * (r * i + 3 * o * n);
    }
    function Vt(t, e, n, i, r) {
        var o = 1 - r;
        return 3 * (((e - t) * o + 2 * (n - e) * r) * o + (i - n) * r * r);
    }
    function Ht(t, e, n, i, r, o) {
        var a = i + 3 * (e - n) - t, s = 3 * (n - 2 * e + t), l = 3 * (e - t), u = t - r, h = s * s - 3 * a * l, c = s * l - 9 * a * u, p = l * l - 3 * s * u, d = 0;
        if (zt(h) && zt(c)) {
            if (zt(s)) o[0] = 0; else (M = -l / s) >= 0 && 1 >= M && (o[d++] = M);
        } else {
            var f = c * c - 4 * h * p;
            if (zt(f)) {
                var g = c / h, y = -g / 2;
                (M = -s / a + g) >= 0 && 1 >= M && (o[d++] = M), y >= 0 && 1 >= y && (o[d++] = y);
            } else if (f > 0) {
                var v = wp(f), m = h * s + 1.5 * a * (-c + v), _ = h * s + 1.5 * a * (-c - v);
                (M = (-s - ((m = 0 > m ? -xp(-m, Tp) : xp(m, Tp)) + (_ = 0 > _ ? -xp(-_, Tp) : xp(_, Tp)))) / (3 * a)) >= 0 && 1 >= M && (o[d++] = M);
            } else {
                var x = (2 * h * s - 3 * a * c) / (2 * wp(h * h * h)), w = Math.acos(x) / 3, b = wp(h), S = Math.cos(w), M = (-s - 2 * b * S) / (3 * a), T = (y = (-s + b * (S + Mp * Math.sin(w))) / (3 * a), 
                (-s + b * (S - Mp * Math.sin(w))) / (3 * a));
                M >= 0 && 1 >= M && (o[d++] = M), y >= 0 && 1 >= y && (o[d++] = y), T >= 0 && 1 >= T && (o[d++] = T);
            }
        }
        return d;
    }
    function Wt(t, e, n, i, r) {
        var o = 6 * n - 12 * e + 6 * t, a = 9 * e + 3 * i - 3 * t - 9 * n, s = 3 * e - 3 * t, l = 0;
        if (zt(a)) {
            if (Nt(o)) (h = -s / o) >= 0 && 1 >= h && (r[l++] = h);
        } else {
            var u = o * o - 4 * a * s;
            if (zt(u)) r[0] = -o / (2 * a); else if (u > 0) {
                var h, c = wp(u), p = (-o - c) / (2 * a);
                (h = (-o + c) / (2 * a)) >= 0 && 1 >= h && (r[l++] = h), p >= 0 && 1 >= p && (r[l++] = p);
            }
        }
        return l;
    }
    function Gt(t, e, n, i, r, o) {
        var a = (e - t) * r + t, s = (n - e) * r + e, l = (i - n) * r + n, u = (s - a) * r + a, h = (l - s) * r + s, c = (h - u) * r + u;
        o[0] = t, o[1] = a, o[2] = u, o[3] = c, o[4] = c, o[5] = h, o[6] = l, o[7] = i;
    }
    function Ut(t, e, n, i, r, o, a, s, l, u, h) {
        var c, p, d, f, g, y = .005, v = 1 / 0;
        Cp[0] = l, Cp[1] = u;
        for (var m = 0; 1 > m; m += .05) Ip[0] = Ft(t, n, r, a, m), Ip[1] = Ft(e, i, o, s, m), 
        v > (f = Oc(Cp, Ip)) && (c = m, v = f);
        v = 1 / 0;
        for (var _ = 0; 32 > _ && !(Sp > y); _++) p = c - y, d = c + y, Ip[0] = Ft(t, n, r, a, p), 
        Ip[1] = Ft(e, i, o, s, p), f = Oc(Ip, Cp), p >= 0 && v > f ? (c = p, v = f) : (kp[0] = Ft(t, n, r, a, d), 
        kp[1] = Ft(e, i, o, s, d), g = Oc(kp, Cp), 1 >= d && v > g ? (c = d, v = g) : y *= .5);
        return h && (h[0] = Ft(t, n, r, a, c), h[1] = Ft(e, i, o, s, c)), wp(v);
    }
    function Xt(t, e, n, i, r, o, a, s, l) {
        for (var u = t, h = e, c = 0, p = 1 / l, d = 1; l >= d; d++) {
            var f = d * p, g = Ft(t, n, r, a, f), y = Ft(e, i, o, s, f), v = g - u, m = y - h;
            c += Math.sqrt(v * v + m * m), u = g, h = y;
        }
        return c;
    }
    function Yt(t, e, n, i) {
        var r = 1 - i;
        return r * (r * t + 2 * i * e) + i * i * n;
    }
    function qt(t, e, n, i) {
        return 2 * ((1 - i) * (e - t) + i * (n - e));
    }
    function jt(t, e, n) {
        var i = t + n - 2 * e;
        return 0 === i ? .5 : (t - e) / i;
    }
    function Zt(t, e, n, i, r) {
        var o = (e - t) * i + t, a = (n - e) * i + e, s = (a - o) * i + o;
        r[0] = t, r[1] = o, r[2] = s, r[3] = s, r[4] = a, r[5] = n;
    }
    function Kt(t, e, n, i, r, o, a, s, l) {
        var u, h = .005, c = 1 / 0;
        Cp[0] = a, Cp[1] = s;
        for (var p = 0; 1 > p; p += .05) {
            Ip[0] = Yt(t, n, r, p), Ip[1] = Yt(e, i, o, p), c > (y = Oc(Cp, Ip)) && (u = p, 
            c = y);
        }
        c = 1 / 0;
        for (var d = 0; 32 > d && !(Sp > h); d++) {
            var f = u - h, g = u + h;
            Ip[0] = Yt(t, n, r, f), Ip[1] = Yt(e, i, o, f);
            var y = Oc(Ip, Cp);
            if (f >= 0 && c > y) u = f, c = y; else {
                kp[0] = Yt(t, n, r, g), kp[1] = Yt(e, i, o, g);
                var v = Oc(kp, Cp);
                1 >= g && c > v ? (u = g, c = v) : h *= .5;
            }
        }
        return l && (l[0] = Yt(t, n, r, u), l[1] = Yt(e, i, o, u)), wp(c);
    }
    function $t(t, e, n, i, r, o, a) {
        for (var s = t, l = e, u = 0, h = 1 / a, c = 1; a >= c; c++) {
            var p = c * h, d = Yt(t, n, r, p), f = Yt(e, i, o, p), g = d - s, y = f - l;
            u += Math.sqrt(g * g + y * y), s = d, l = f;
        }
        return u;
    }
    function Qt(t) {
        var e = t && Dp.exec(t);
        if (e) {
            var n = e[1].split(","), i = +N(n[0]), r = +N(n[1]), o = +N(n[2]), a = +N(n[3]);
            if (isNaN(i + r + o + a)) return;
            var s = [];
            return function(t) {
                return 0 >= t ? 0 : t >= 1 ? 1 : Ht(0, i, o, 1, t, s) && Ft(0, r, a, 1, s[0]);
            };
        }
    }
    function Jt(t) {
        return 0 > (t = Math.round(t)) ? 0 : t > 255 ? 255 : t;
    }
    function te(t) {
        return 0 > t ? 0 : t > 1 ? 1 : t;
    }
    function ee(t) {
        var e = t;
        return Jt(e.length && "%" === e.charAt(e.length - 1) ? parseFloat(e) / 100 * 255 : parseInt(e, 10));
    }
    function ne(t) {
        var e = t;
        return te(e.length && "%" === e.charAt(e.length - 1) ? parseFloat(e) / 100 : parseFloat(e));
    }
    function ie(t, e, n) {
        return 0 > n ? n += 1 : n > 1 && (n -= 1), 1 > 6 * n ? t + (e - t) * n * 6 : 1 > 2 * n ? e : 2 > 3 * n ? t + (e - t) * (2 / 3 - n) * 6 : t;
    }
    function re(t, e, n) {
        return t + (e - t) * n;
    }
    function oe(t, e, n, i, r) {
        return t[0] = e, t[1] = n, t[2] = i, t[3] = r, t;
    }
    function ae(t, e) {
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
    }
    function se(t, e) {
        Ep && ae(Ep, e), Ep = Bp.put(t, Ep || e.slice());
    }
    function le(t, e) {
        if (t) {
            e = e || [];
            var n = Bp.get(t);
            if (n) return ae(e, n);
            var i = (t += "").replace(/ /g, "").toLowerCase();
            if (i in Rp) return ae(e, Rp[i]), se(t, e), e;
            var r = i.length;
            if ("#" !== i.charAt(0)) {
                var o = i.indexOf("("), a = i.indexOf(")");
                if (-1 !== o && a + 1 === r) {
                    var s = i.substr(0, o), l = i.substr(o + 1, a - (o + 1)).split(","), u = 1;
                    switch (s) {
                      case "rgba":
                        if (4 !== l.length) return 3 === l.length ? oe(e, +l[0], +l[1], +l[2], 1) : oe(e, 0, 0, 0, 1);
                        u = ne(l.pop());

                      case "rgb":
                        return l.length >= 3 ? (oe(e, ee(l[0]), ee(l[1]), ee(l[2]), 3 === l.length ? u : ne(l[3])), 
                        se(t, e), e) : void oe(e, 0, 0, 0, 1);

                      case "hsla":
                        return 4 !== l.length ? void oe(e, 0, 0, 0, 1) : (l[3] = ne(l[3]), ue(l, e), se(t, e), 
                        e);

                      case "hsl":
                        return 3 !== l.length ? void oe(e, 0, 0, 0, 1) : (ue(l, e), se(t, e), e);

                      default:
                        return;
                    }
                }
                oe(e, 0, 0, 0, 1);
            } else {
                var h;
                if (4 === r || 5 === r) return (h = parseInt(i.slice(1, 4), 16)) >= 0 && 4095 >= h ? (oe(e, (3840 & h) >> 4 | (3840 & h) >> 8, 240 & h | (240 & h) >> 4, 15 & h | (15 & h) << 4, 5 === r ? parseInt(i.slice(4), 16) / 15 : 1), 
                se(t, e), e) : void oe(e, 0, 0, 0, 1);
                if (7 === r || 9 === r) return (h = parseInt(i.slice(1, 7), 16)) >= 0 && 16777215 >= h ? (oe(e, (16711680 & h) >> 16, (65280 & h) >> 8, 255 & h, 9 === r ? parseInt(i.slice(7), 16) / 255 : 1), 
                se(t, e), e) : void oe(e, 0, 0, 0, 1);
            }
        }
    }
    function ue(t, e) {
        var n = (parseFloat(t[0]) % 360 + 360) % 360 / 360, i = ne(t[1]), r = ne(t[2]), o = .5 >= r ? r * (i + 1) : r + i - r * i, a = 2 * r - o;
        return oe(e = e || [], Jt(255 * ie(a, o, n + 1 / 3)), Jt(255 * ie(a, o, n)), Jt(255 * ie(a, o, n - 1 / 3)), 1), 
        4 === t.length && (e[3] = t[3]), e;
    }
    function he(t, e) {
        var n = le(t);
        if (n) {
            for (var i = 0; 3 > i; i++) n[i] = 0 > e ? n[i] * (1 - e) | 0 : (255 - n[i]) * e + n[i] | 0, 
            n[i] > 255 ? n[i] = 255 : n[i] < 0 && (n[i] = 0);
            return de(n, 4 === n.length ? "rgba" : "rgb");
        }
    }
    function ce(t, e, n) {
        if (e && e.length && t >= 0 && 1 >= t) {
            n = n || [];
            var i = t * (e.length - 1), r = Math.floor(i), o = Math.ceil(i), a = e[r], s = e[o], l = i - r;
            return n[0] = Jt(re(a[0], s[0], l)), n[1] = Jt(re(a[1], s[1], l)), n[2] = Jt(re(a[2], s[2], l)), 
            n[3] = te(re(a[3], s[3], l)), n;
        }
    }
    function pe(t, e, n) {
        if (e && e.length && t >= 0 && 1 >= t) {
            var i = t * (e.length - 1), r = Math.floor(i), o = Math.ceil(i), a = le(e[r]), s = le(e[o]), l = i - r, u = de([ Jt(re(a[0], s[0], l)), Jt(re(a[1], s[1], l)), Jt(re(a[2], s[2], l)), te(re(a[3], s[3], l)) ], "rgba");
            return n ? {
                color: u,
                leftIndex: r,
                rightIndex: o,
                value: i
            } : u;
        }
    }
    function de(t, e) {
        if (t && t.length) {
            var n = t[0] + "," + t[1] + "," + t[2];
            return ("rgba" === e || "hsva" === e || "hsla" === e) && (n += "," + t[3]), e + "(" + n + ")";
        }
    }
    function fe(t, e) {
        var n = le(t);
        return n ? (.299 * n[0] + .587 * n[1] + .114 * n[2]) * n[3] / 255 + (1 - n[3]) * e : 0;
    }
    function ge(t, e, n) {
        return (e - t) * n + t;
    }
    function ye(t, e, n, i) {
        for (var r = e.length, o = 0; r > o; o++) t[o] = ge(e[o], n[o], i);
        return t;
    }
    function ve(t, e, n, i) {
        for (var r = e.length, o = 0; r > o; o++) t[o] = e[o] + n[o] * i;
        return t;
    }
    function me(t, e, n, i) {
        for (var r = e.length, o = r && e[0].length, a = 0; r > a; a++) {
            t[a] || (t[a] = []);
            for (var s = 0; o > s; s++) t[a][s] = e[a][s] + n[a][s] * i;
        }
        return t;
    }
    function _e(t, e) {
        for (var n = t.length, i = e.length, r = n > i ? e : t, o = Math.min(n, i), a = r[o - 1] || {
            color: [ 0, 0, 0, 0 ],
            offset: 0
        }, s = o; s < Math.max(n, i); s++) r.push({
            offset: a.offset,
            color: a.color.slice()
        });
    }
    function xe(t, e, n) {
        var i = t, r = e;
        if (i.push && r.push) {
            var o = i.length, a = r.length;
            if (o !== a) if (o > a) i.length = a; else for (var s = o; a > s; s++) i.push(1 === n ? r[s] : Vp.call(r[s]));
            var l = i[0] && i[0].length;
            for (s = 0; s < i.length; s++) if (1 === n) isNaN(i[s]) && (i[s] = r[s]); else for (var u = 0; l > u; u++) isNaN(i[s][u]) && (i[s][u] = r[s][u]);
        }
    }
    function we(t) {
        if (d(t)) {
            var e = t.length;
            if (d(t[0])) {
                for (var n = [], i = 0; e > i; i++) n.push(Vp.call(t[i]));
                return n;
            }
            return Vp.call(t);
        }
        return t;
    }
    function be(t) {
        return t[0] = Math.floor(t[0]) || 0, t[1] = Math.floor(t[1]) || 0, t[2] = Math.floor(t[2]) || 0, 
        t[3] = null == t[3] ? 1 : t[3], "rgba(" + t.join(",") + ")";
    }
    function Se(t) {
        return t === Gp || t === Up;
    }
    function Me(t) {
        return t === Hp || t === Wp;
    }
    function Te() {
        return new Date().getTime();
    }
    function Ce(t) {
        var e = t.pointerType;
        return "pen" === e || "touch" === e;
    }
    function Ie(t) {
        t && (t.zrByTouch = !0);
    }
    function ke(t, e) {
        for (var n = e, i = !1; n && 9 !== n.nodeType && !(i = n.domBelongToZr || n !== e && n === t.painterRoot); ) n = n.parentNode;
        return i;
    }
    function De(t, e) {
        var n = e.domHandlers;
        ic.pointerEventsSupported ? f(Kp.pointer, function(i) {
            Pe(e, i, function(e) {
                n[i].call(t, e);
            });
        }) : (ic.touchEventsSupported && f(Kp.touch, function(i) {
            Pe(e, i, function(r) {
                n[i].call(t, r), function(t) {
                    t.touching = !0, null != t.touchTimer && (clearTimeout(t.touchTimer), t.touchTimer = null), 
                    t.touchTimer = setTimeout(function() {
                        t.touching = !1, t.touchTimer = null;
                    }, 700);
                }(e);
            });
        }), f(Kp.mouse, function(i) {
            Pe(e, i, function(r) {
                r = ft(r), e.touching || n[i].call(t, r);
            });
        }));
    }
    function Ae(t, e) {
        function n(n) {
            Pe(e, n, function(i) {
                i = ft(i), ke(t, i.target) || (i = function(t, e) {
                    return gt(t.dom, new Jp(t, e), !0);
                }(t, i), e.domHandlers[n].call(t, i));
            }, {
                capture: !0
            });
        }
        ic.pointerEventsSupported ? f($p.pointer, n) : ic.touchEventsSupported || f($p.mouse, n);
    }
    function Pe(t, e, n, i) {
        t.mounted[e] = n, t.listenerOpts[e] = i, function(t, e, n, i) {
            t.addEventListener(e, n, i);
        }(t.domTarget, e, n, i);
    }
    function Le(t) {
        var e = t.mounted;
        for (var n in e) e.hasOwnProperty(n) && yt(t.domTarget, n, e[n], t.listenerOpts[n]);
        t.mounted = {};
    }
    function Oe(t) {
        return t > hd || -hd > t;
    }
    function Re(t, e) {
        var n = vd[e = e || oc];
        n || (n = vd[e] = new Op(500));
        var i = n.get(t);
        return null == i && (i = uc.measureText(t, e).width, n.put(t, i)), i;
    }
    function Be(t, e, n, i) {
        var r = Re(t, e), o = Fe(e), a = ze(0, r, n), s = Ne(0, o, i);
        return new op(a, s, r, o);
    }
    function Ee(t, e, n, i) {
        var r = ((t || "") + "").split("\n");
        if (1 === r.length) return Be(r[0], e, n, i);
        for (var o = new op(0, 0, 0, 0), a = 0; a < r.length; a++) {
            var s = Be(r[a], e, n, i);
            0 === a ? o.copy(s) : o.union(s);
        }
        return o;
    }
    function ze(t, e, n) {
        return "right" === n ? t -= e : "center" === n && (t -= e / 2), t;
    }
    function Ne(t, e, n) {
        return "middle" === n ? t -= e / 2 : "bottom" === n && (t -= e), t;
    }
    function Fe(t) {
        return Re("国", t);
    }
    function Ve(t, e) {
        return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t;
    }
    function He(t, e, n) {
        var i = e.position || "inside", r = null != e.distance ? e.distance : 5, o = n.height, a = n.width, s = o / 2, l = n.x, u = n.y, h = "left", c = "top";
        if (i instanceof Array) l += Ve(i[0], n.width), u += Ve(i[1], n.height), h = null, 
        c = null; else switch (i) {
          case "left":
            l -= r, u += s, h = "right", c = "middle";
            break;

          case "right":
            l += r + a, u += s, c = "middle";
            break;

          case "top":
            l += a / 2, u -= r, h = "center", c = "bottom";
            break;

          case "bottom":
            l += a / 2, u += o + r, h = "center";
            break;

          case "inside":
            l += a / 2, u += s, h = "center", c = "middle";
            break;

          case "insideLeft":
            l += r, u += s, c = "middle";
            break;

          case "insideRight":
            l += a - r, u += s, h = "right", c = "middle";
            break;

          case "insideTop":
            l += a / 2, u += r, h = "center";
            break;

          case "insideBottom":
            l += a / 2, u += o - r, h = "center", c = "bottom";
            break;

          case "insideTopLeft":
            l += r, u += r;
            break;

          case "insideTopRight":
            l += a - r, u += r, h = "right";
            break;

          case "insideBottomLeft":
            l += r, u += o - r, c = "bottom";
            break;

          case "insideBottomRight":
            l += a - r, u += o - r, h = "right", c = "bottom";
        }
        return (t = t || {}).x = l, t.y = u, t.align = h, t.verticalAlign = c, t;
    }
    function We(t, e, n, i, r) {
        var o = [];
        Xe(t, "", t, e, n = n || {}, i, o, r);
        var a = o.length, s = !1, l = n.done, u = n.aborted, h = function() {
            s = !0, 0 >= --a && (s ? l && l() : u && u());
        }, c = function() {
            0 >= --a && (s ? l && l() : u && u());
        };
        a || l && l(), o.length > 0 && n.during && o[0].during(function(t, e) {
            n.during(e);
        });
        for (var p = 0; p < o.length; p++) {
            var d = o[p];
            h && d.done(h), c && d.aborted(c), n.force && d.duration(n.duration), d.start(n.easing);
        }
        return o;
    }
    function Ge(t, e, n) {
        for (var i = 0; n > i; i++) t[i] = e[i];
    }
    function Ue(t, e, n) {
        if (d(e[n])) if (d(t[n]) || (t[n] = []), I(e[n])) {
            var i = e[n].length;
            t[n].length !== i && (t[n] = new e[n].constructor(i), Ge(t[n], e[n], i));
        } else {
            var r = e[n], o = t[n], a = r.length;
            if (function(t) {
                return d(t[0]);
            }(r)) for (var s = r[0].length, l = 0; a > l; l++) o[l] ? Ge(o[l], r[l], s) : o[l] = Array.prototype.slice.call(r[l]); else Ge(o, r, a);
            o.length = r.length;
        } else t[n] = e[n];
    }
    function Xe(t, e, n, i, r, o, a, s) {
        for (var l = m(i), u = r.duration, c = r.delay, p = r.additive, f = r.setToFinal, g = !T(o), y = t.animators, _ = [], x = 0; x < l.length; x++) {
            var w = l[x], b = i[w];
            if (null != b && null != n[w] && (g || o[w])) if (!T(b) || d(b) || D(b)) _.push(w); else {
                if (e) {
                    s || (n[w] = b, t.updateDuringAnimation(e));
                    continue;
                }
                Xe(t, w, n[w], b, r, o && o[w], a, s);
            } else s || (n[w] = b, t.updateDuringAnimation(e), _.push(w));
        }
        var S = _.length;
        if (!p && S) for (var M = 0; M < y.length; M++) {
            if ((I = y[M]).targetName === e) if (I.stopTracks(_)) {
                var C = h(y, I);
                y.splice(C, 1);
            }
        }
        if (r.force || (S = (_ = v(_, function(t) {
            return !function(t, e) {
                return t === e || d(t) && d(e) && function(t, e) {
                    var n = t.length;
                    if (n !== e.length) return !1;
                    for (var i = 0; n > i; i++) if (t[i] !== e[i]) return !1;
                    return !0;
                }(t, e);
            }(i[t], n[t]);
        })).length), S > 0 || r.force && !a.length) {
            var I, k = void 0, A = void 0, P = void 0;
            if (s) {
                A = {}, f && (k = {});
                for (M = 0; S > M; M++) {
                    A[w = _[M]] = n[w], f ? k[w] = i[w] : n[w] = i[w];
                }
            } else if (f) {
                P = {};
                for (M = 0; S > M; M++) {
                    P[w = _[M]] = we(n[w]), Ue(n, i, w);
                }
            }
            (I = new qp(n, !1, !1, p ? v(y, function(t) {
                return t.targetName === e;
            }) : null)).targetName = e, r.scope && (I.scope = r.scope), f && k && I.whenWithKeys(0, k, _), 
            P && I.whenWithKeys(0, P, _), I.whenWithKeys(null == u ? 500 : u, s ? A : i, _).delay(c || 0), 
            t.addAnimator(I, e), a.push(I);
        }
    }
    function Ye(t, e) {
        var n = new Id(r(), t, e);
        return Cd[n.id] = n, n;
    }
    function qe(t, e) {
        Td[t] = e;
    }
    function je(t, e, n, i) {
        var r = e[0], o = e[1], a = n[0], s = n[1], l = o - r, u = s - a;
        if (0 === l) return 0 === u ? a : (a + s) / 2;
        if (i) if (l > 0) {
            if (r >= t) return a;
            if (t >= o) return s;
        } else {
            if (t >= r) return a;
            if (o >= t) return s;
        } else {
            if (t === r) return a;
            if (t === o) return s;
        }
        return (t - r) / l * u + a;
    }
    function Ze(t, e) {
        switch (t) {
          case "center":
          case "middle":
            t = "50%";
            break;

          case "left":
          case "top":
            t = "0%";
            break;

          case "right":
          case "bottom":
            t = "100%";
        }
        return b(t) ? function(t) {
            return t.replace(/^\s+|\s+$/g, "");
        }(t).match(/%$/) ? parseFloat(t) / 100 * e : parseFloat(t) : null == t ? NaN : +t;
    }
    function Ke(t, e, n) {
        return null == e && (e = 10), e = Math.min(Math.max(0, e), Ad), t = (+t).toFixed(e), 
        n ? t : +t;
    }
    function $e(t) {
        if (t = +t, isNaN(t)) return 0;
        if (t > 1e-14) for (var e = 1, n = 0; 15 > n; n++, e *= 10) if (Math.round(t * e) / e === t) return n;
        return Qe(t);
    }
    function Qe(t) {
        var e = t.toString().toLowerCase(), n = e.indexOf("e"), i = n > 0 ? +e.slice(n + 1) : 0, r = n > 0 ? n : e.length, o = e.indexOf("."), a = 0 > o ? 0 : r - 1 - o;
        return Math.max(0, a - i);
    }
    function Je(t, e) {
        var n = Math.log, i = Math.LN10, r = Math.floor(n(t[1] - t[0]) / i), o = Math.round(n(Math.abs(e[1] - e[0])) / i), a = Math.min(Math.max(-r + o, 0), 20);
        return isFinite(a) ? a : 20;
    }
    function tn(t, e) {
        var n = Math.max($e(t), $e(e)), i = t + e;
        return n > Ad ? i : Ke(i, n);
    }
    function en(t) {
        var e = 2 * Math.PI;
        return (t % e + e) % e;
    }
    function nn(t) {
        return t > -Dd && Dd > t;
    }
    function rn(t) {
        if (t instanceof Date) return t;
        if (b(t)) {
            var e = Pd.exec(t);
            if (!e) return new Date(NaN);
            if (e[8]) {
                var n = +e[4] || 0;
                return "Z" !== e[8].toUpperCase() && (n -= +e[8].slice(0, 3)), new Date(Date.UTC(+e[1], +(e[2] || 1) - 1, +e[3] || 1, n, +(e[5] || 0), +e[6] || 0, e[7] ? +e[7].substring(0, 3) : 0));
            }
            return new Date(+e[1], +(e[2] || 1) - 1, +e[3] || 1, +e[4] || 0, +(e[5] || 0), +e[6] || 0, e[7] ? +e[7].substring(0, 3) : 0);
        }
        return new Date(null == t ? NaN : Math.round(t));
    }
    function on(t) {
        return Math.pow(10, an(t));
    }
    function an(t) {
        if (0 === t) return 0;
        var e = Math.floor(Math.log(t) / Math.LN10);
        return t / Math.pow(10, e) >= 10 && e++, e;
    }
    function sn(t, e) {
        var n = an(t), i = Math.pow(10, n), r = t / i;
        return t = (e ? 1.5 > r ? 1 : 2.5 > r ? 2 : 4 > r ? 3 : 7 > r ? 5 : 10 : 1 > r ? 1 : 2 > r ? 2 : 3 > r ? 3 : 5 > r ? 5 : 10) * i, 
        n >= -20 ? +t.toFixed(0 > n ? -n : 0) : t;
    }
    function ln(t) {
        var e = parseFloat(t);
        return e == t && (0 !== e || !b(t) || t.indexOf("x") <= 0) ? e : NaN;
    }
    function un(t) {
        return !isNaN(ln(t));
    }
    function hn() {
        return Math.round(9 * Math.random());
    }
    function cn(t, e) {
        return null == t ? e : null == e ? t : t * e / function t(e, n) {
            return 0 === n ? e : t(n, e % n);
        }(t, e);
    }
    function pn(t) {
        throw new Error(t);
    }
    function dn(t, e, n) {
        return (e - t) * n + t;
    }
    function fn(t) {
        return t instanceof Array ? t : null == t ? [] : [ t ];
    }
    function gn(t, e, n) {
        if (t) {
            t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
            for (var i = 0, r = n.length; r > i; i++) {
                var o = n[i];
                !t.emphasis[e].hasOwnProperty(o) && t[e].hasOwnProperty(o) && (t.emphasis[e][o] = t[e][o]);
            }
        }
    }
    function yn(t) {
        return !T(t) || x(t) || t instanceof Date ? t : t.value;
    }
    function vn(t) {
        return T(t) && !(t instanceof Array);
    }
    function mn(t, e, n) {
        var i = "normalMerge" === n, r = "replaceMerge" === n, o = "replaceAll" === n;
        t = t || [], e = (e || []).slice();
        var a = H();
        f(e, function(t, n) {
            return T(t) ? void 0 : void (e[n] = null);
        });
        var s = function(t, e, n) {
            var i = [];
            if ("replaceAll" === n) return i;
            for (var r = 0; r < t.length; r++) {
                var o = t[r];
                o && null != o.id && e.set(o.id, r), i.push({
                    existing: "replaceMerge" === n || Sn(o) ? null : o,
                    newOption: null,
                    keyInfo: null,
                    brandNew: null
                });
            }
            return i;
        }(t, a, n);
        return (i || r) && function(t, e, n, i) {
            f(i, function(r, o) {
                if (r && null != r.id) {
                    var a = xn(r.id), s = n.get(a);
                    if (null != s) {
                        var l = t[s];
                        z(!l.newOption, 'Duplicated option on id "' + a + '".'), l.newOption = r, l.existing = e[s], 
                        i[o] = null;
                    }
                }
            });
        }(s, t, a, e), i && function(t, e) {
            f(e, function(n, i) {
                if (n && null != n.name) for (var r = 0; r < t.length; r++) {
                    var o = t[r].existing;
                    if (!t[r].newOption && o && (null == o.id || null == n.id) && !Sn(n) && !Sn(o) && _n("name", o, n)) return t[r].newOption = n, 
                    void (e[i] = null);
                }
            });
        }(s, e), i || r ? function(t, e, n) {
            f(e, function(e) {
                if (e) {
                    for (var i, r = 0; (i = t[r]) && (i.newOption || Sn(i.existing) || i.existing && null != e.id && !_n("id", e, i.existing)); ) r++;
                    i ? (i.newOption = e, i.brandNew = n) : t.push({
                        newOption: e,
                        brandNew: n,
                        existing: null,
                        keyInfo: null
                    }), r++;
                }
            });
        }(s, e, r) : o && function(t, e) {
            f(e, function(e) {
                t.push({
                    newOption: e,
                    brandNew: !0,
                    existing: null,
                    keyInfo: null
                });
            });
        }(s, e), function(t) {
            var e = H();
            f(t, function(t) {
                var n = t.existing;
                n && e.set(n.id, t);
            }), f(t, function(t) {
                var n = t.newOption;
                z(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, "id duplicates: " + (n && n.id)), 
                n && null != n.id && e.set(n.id, t), !t.keyInfo && (t.keyInfo = {});
            }), f(t, function(t, n) {
                var i = t.existing, r = t.newOption, o = t.keyInfo;
                if (T(r)) {
                    if (o.name = null != r.name ? xn(r.name) : i ? i.name : Ld + n, i) o.id = xn(i.id); else if (null != r.id) o.id = xn(r.id); else {
                        var a = 0;
                        do {
                            o.id = "\0" + o.name + "\0" + a++;
                        } while (e.get(o.id));
                    }
                    e.set(o.id, t);
                }
            });
        }(s), s;
    }
    function _n(t, e, n) {
        var i = wn(e[t], null), r = wn(n[t], null);
        return null != i && null != r && i === r;
    }
    function xn(t) {
        return wn(t, "");
    }
    function wn(t, e) {
        return null == t ? e : b(t) ? t : M(t) || S(t) ? t + "" : e;
    }
    function bn(t) {
        var e = t.name;
        return !(!e || !e.indexOf(Ld));
    }
    function Sn(t) {
        return t && null != t.id && 0 === xn(t.id).indexOf(Od);
    }
    function Mn(t, e) {
        return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? x(e.dataIndex) ? g(e.dataIndex, function(e) {
            return t.indexOfRawIndex(e);
        }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? x(e.name) ? g(e.name, function(e) {
            return t.indexOfName(e);
        }) : t.indexOfName(e.name) : void 0;
    }
    function Tn() {
        var t = "__ec_inner_" + Bd++;
        return function(e) {
            return e[t] || (e[t] = {});
        };
    }
    function Cn(t, e, n) {
        var i = In(e, n), r = i.mainTypeSpecified, o = i.queryOptionMap, a = i.others, s = n ? n.defaultMainType : null;
        return !r && s && o.set(s, {}), o.each(function(e, i) {
            var r = kn(t, i, e, {
                useDefault: s === i,
                enableAll: !n || null == n.enableAll || n.enableAll,
                enableNone: !n || null == n.enableNone || n.enableNone
            });
            a[i + "Models"] = r.models, a[i + "Model"] = r.models[0];
        }), a;
    }
    function In(t, e) {
        var n;
        if (b(t)) {
            var i = {};
            i[t + "Index"] = 0, n = i;
        } else n = t;
        var r = H(), o = {}, a = !1;
        return f(n, function(t, n) {
            if ("dataIndex" !== n && "dataIndexInside" !== n) {
                var i = n.match(/^(\w+)(Index|Id|Name)$/) || [], s = i[1], l = (i[2] || "").toLowerCase();
                if (s && l && !(e && e.includeMainTypes && h(e.includeMainTypes, s) < 0)) a = a || !!s, 
                (r.get(s) || r.set(s, {}))[l] = t;
            } else o[n] = t;
        }), {
            mainTypeSpecified: a,
            queryOptionMap: r,
            others: o
        };
    }
    function kn(t, e, n, i) {
        i = i || Ed;
        var r = n.index, o = n.id, a = n.name, s = {
            models: null,
            specified: null != r || null != o || null != a
        };
        if (!s.specified) {
            var l = void 0;
            return s.models = i.useDefault && (l = t.getComponent(e)) ? [ l ] : [], s;
        }
        return "none" === r || !1 === r ? (z(i.enableNone, '`"none"` or `false` is not a valid value on index option.'), 
        s.models = [], s) : ("all" === r && (z(i.enableAll, '`"all"` is not a valid value on index option.'), 
        r = o = a = null), s.models = t.queryComponents({
            mainType: e,
            index: r,
            id: o,
            name: a
        }), s);
    }
    function Dn(t, e, n) {
        t.setAttribute ? t.setAttribute(e, n) : t[e] = n;
    }
    function An(t) {
        var e = {
            main: "",
            sub: ""
        };
        if (t) {
            var n = t.split(zd);
            e.main = n[0] || "", e.sub = n[1] || "";
        }
        return e;
    }
    function Pn(t) {
        t.$constructor = t, t.extend = function(t) {
            var e, i = this;
            return function(t) {
                return w(t) && /^class\s/.test(Function.prototype.toString.call(t));
            }(i) ? e = function(t) {
                function e() {
                    return t.apply(this, arguments) || this;
                }
                return n(e, t), e;
            }(i) : c(e = function() {
                (t.$constructor || i).apply(this, arguments);
            }, this), l(e.prototype, t), e[Fd] = !0, e.extend = this.extend, e.superCall = On, 
            e.superApply = Rn, e.superClass = i, e;
        };
    }
    function Ln(t, e) {
        t.extend = e.extend;
    }
    function On(t, e) {
        for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
        return this.superClass.prototype[e].apply(t, n);
    }
    function Rn(t, e, n) {
        return this.superClass.prototype[e].apply(t, n);
    }
    function Bn(t) {
        var e = {};
        t.registerClass = function(t) {
            var n = t.type || t.prototype.type;
            if (n) {
                (function(t) {
                    z(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal');
                })(n), t.prototype.type = n;
                var i = An(n);
                if (i.sub) {
                    if (i.sub !== Nd) ((function(t) {
                        var n = e[t.main];
                        return n && n[Nd] || ((n = e[t.main] = {})[Nd] = !0), n;
                    })(i))[i.sub] = t;
                } else e[i.main] = t;
            }
            return t;
        }, t.getClass = function(t, n, i) {
            var r = e[t];
            if (r && r[Nd] && (r = n ? r[n] : null), i && !r) throw new Error(n ? "Component " + t + "." + (n || "") + " is used but not imported." : t + ".type should be specified.");
            return r;
        }, t.getClassesByMainType = function(t) {
            var n = An(t), i = [], r = e[n.main];
            return r && r[Nd] ? f(r, function(t, e) {
                e !== Nd && i.push(t);
            }) : i.push(r), i;
        }, t.hasClass = function(t) {
            var n = An(t);
            return !!e[n.main];
        }, t.getAllClassMainTypes = function() {
            var t = [];
            return f(e, function(e, n) {
                t.push(n);
            }), t;
        }, t.hasSubTypes = function(t) {
            var n = An(t), i = e[n.main];
            return i && i[Nd];
        };
    }
    function En(t, e) {
        for (var n = 0; n < t.length; n++) t[n][1] || (t[n][1] = t[n][0]);
        return e = e || !1, function(n, i, r) {
            for (var o = {}, a = 0; a < t.length; a++) {
                var s = t[a][1];
                if (!(i && h(i, s) >= 0 || r && h(r, s) < 0)) {
                    var l = n.getShallow(s, e);
                    null != l && (o[t[a][0]] = l);
                }
            }
            return o;
        };
    }
    function zn(t) {
        if ("string" == typeof t) {
            var e = Gd.get(t);
            return e && e.image;
        }
        return t;
    }
    function Nn(t, e, n, i, r) {
        if (t) {
            if ("string" == typeof t) {
                if (e && e.__zrImageSrc === t || !n) return e;
                var o = Gd.get(t), a = {
                    hostEl: n,
                    cb: i,
                    cbPayload: r
                };
                return o ? !Vn(e = o.image) && o.pending.push(a) : ((e = uc.loadImage(t, Fn, Fn)).__zrImageSrc = t, 
                Gd.put(t, e.__cachedImgObj = {
                    image: e,
                    pending: [ a ]
                })), e;
            }
            return t;
        }
        return e;
    }
    function Fn() {
        var t = this.__cachedImgObj;
        this.onload = this.onerror = this.__cachedImgObj = null;
        for (var e = 0; e < t.pending.length; e++) {
            var n = t.pending[e], i = n.cb;
            i && i(this, n.cbPayload), n.hostEl.dirty();
        }
        t.pending.length = 0;
    }
    function Vn(t) {
        return t && t.width && t.height;
    }
    function Hn(t, e, n, i, r) {
        if (!e) return "";
        var o = (t + "").split("\n");
        r = Wn(e, n, i, r);
        for (var a = 0, s = o.length; s > a; a++) o[a] = Gn(o[a], r);
        return o.join("\n");
    }
    function Wn(t, e, n, i) {
        var r = l({}, i = i || {});
        r.font = e, n = O(n, "..."), r.maxIterations = O(i.maxIterations, 2);
        var o = r.minChar = O(i.minChar, 0);
        r.cnCharWidth = Re("国", e);
        var a = r.ascCharWidth = Re("a", e);
        r.placeholder = O(i.placeholder, "");
        for (var s = t = Math.max(0, t - 1), u = 0; o > u && s >= a; u++) s -= a;
        var h = Re(n, e);
        return h > s && (n = "", h = 0), s = t - h, r.ellipsis = n, r.ellipsisWidth = h, 
        r.contentWidth = s, r.containerWidth = t, r;
    }
    function Gn(t, e) {
        var n = e.containerWidth, i = e.font, r = e.contentWidth;
        if (!n) return "";
        var o = Re(t, i);
        if (n >= o) return t;
        for (var a = 0; ;a++) {
            if (r >= o || a >= e.maxIterations) {
                t += e.ellipsis;
                break;
            }
            var s = 0 === a ? Un(t, r, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * r / o) : 0;
            o = Re(t = t.substr(0, s), i);
        }
        return "" === t && (t = e.placeholder), t;
    }
    function Un(t, e, n, i) {
        for (var r = 0, o = 0, a = t.length; a > o && e > r; o++) {
            var s = t.charCodeAt(o);
            r += s >= 0 && 127 >= s ? n : i;
        }
        return o;
    }
    function Xn(t, e, n, i, r) {
        var o, a, s = "" === e, l = r && n.rich[r] || {}, u = t.lines, h = l.font || n.font, c = !1;
        if (i) {
            var p = l.padding, d = p ? p[1] + p[3] : 0;
            if (null != l.width && "auto" !== l.width) {
                var f = Ve(l.width, i.width) + d;
                u.length > 0 && f + i.accumWidth > i.width && (o = e.split("\n"), c = !0), i.accumWidth = f;
            } else {
                var g = qn(e, h, i.width, i.breakAll, i.accumWidth);
                i.accumWidth = g.accumWidth + d, a = g.linesWidths, o = g.lines;
            }
        } else o = e.split("\n");
        for (var y = 0; y < o.length; y++) {
            var v = o[y], m = new Xd();
            if (m.styleName = r, m.text = v, m.isLineHolder = !v && !s, m.width = "number" == typeof l.width ? l.width : a ? a[y] : Re(v, h), 
            y || c) u.push(new Yd([ m ])); else {
                var _ = (u[u.length - 1] || (u[0] = new Yd())).tokens, x = _.length;
                1 === x && _[0].isLineHolder ? _[0] = m : (v || !x || s) && _.push(m);
            }
        }
    }
    function Yn(t) {
        return !function(t) {
            var e = t.charCodeAt(0);
            return e >= 32 && 591 >= e || e >= 880 && 4351 >= e || e >= 4608 && 5119 >= e || e >= 7680 && 8303 >= e;
        }(t) || !!jd[t];
    }
    function qn(t, e, n, i, r) {
        for (var o = [], a = [], s = "", l = "", u = 0, h = 0, c = 0; c < t.length; c++) {
            var p = t.charAt(c);
            if ("\n" !== p) {
                var d = Re(p, e), f = !i && !Yn(p);
                (o.length ? h + d > n : r + h + d > n) ? h ? (s || l) && (f ? (s || (s = l, l = "", 
                h = u = 0), o.push(s), a.push(h - u), l += p, s = "", h = u += d) : (l && (s += l, 
                l = "", u = 0), o.push(s), a.push(h), s = p, h = d)) : f ? (o.push(l), a.push(u), 
                l = p, u = d) : (o.push(p), a.push(d)) : (h += d, f ? (l += p, u += d) : (l && (s += l, 
                l = "", u = 0), s += p));
            } else l && (s += l, h += u), o.push(s), a.push(h), s = "", l = "", u = 0, h = 0;
        }
        return o.length || s || (s = t, l = "", u = 0), l && (s += l), s && (o.push(s), 
        a.push(h)), 1 === o.length && (h += r), {
            accumWidth: h,
            lines: o,
            linesWidths: a
        };
    }
    function jn(t, e, n, i, r, o) {
        r[0] = rf(t, n), r[1] = rf(e, i), o[0] = of(t, n), o[1] = of(e, i);
    }
    function Zn(t, e, n, i, r, o, a, s, l, u) {
        var h = Wt, c = Ft, p = h(t, n, r, a, pf);
        l[0] = 1 / 0, l[1] = 1 / 0, u[0] = -1 / 0, u[1] = -1 / 0;
        for (var d = 0; p > d; d++) {
            var f = c(t, n, r, a, pf[d]);
            l[0] = rf(f, l[0]), u[0] = of(f, u[0]);
        }
        p = h(e, i, o, s, df);
        for (d = 0; p > d; d++) {
            var g = c(e, i, o, s, df[d]);
            l[1] = rf(g, l[1]), u[1] = of(g, u[1]);
        }
        l[0] = rf(t, l[0]), u[0] = of(t, u[0]), l[0] = rf(a, l[0]), u[0] = of(a, u[0]), 
        l[1] = rf(e, l[1]), u[1] = of(e, u[1]), l[1] = rf(s, l[1]), u[1] = of(s, u[1]);
    }
    function Kn(t, e, n, i, r, o, a, s) {
        var l = jt, u = Yt, h = of(rf(l(t, n, r), 1), 0), c = of(rf(l(e, i, o), 1), 0), p = u(t, n, r, h), d = u(e, i, o, c);
        a[0] = rf(t, r, p), a[1] = rf(e, o, d), s[0] = of(t, r, p), s[1] = of(e, o, d);
    }
    function $n(t, e, n, i, r, o, a, s, l) {
        var u = ot, h = at, c = Math.abs(r - o);
        if (1e-4 > c % lf && c > 1e-4) return s[0] = t - n, s[1] = e - i, l[0] = t + n, 
        void (l[1] = e + i);
        if (uf[0] = sf(r) * n + t, uf[1] = af(r) * i + e, hf[0] = sf(o) * n + t, hf[1] = af(o) * i + e, 
        u(s, uf, hf), h(l, uf, hf), 0 > (r %= lf) && (r += lf), 0 > (o %= lf) && (o += lf), 
        r > o && !a ? o += lf : o > r && a && (r += lf), a) {
            var p = o;
            o = r, r = p;
        }
        for (var d = 0; o > d; d += Math.PI / 2) d > r && (cf[0] = sf(d) * n + t, cf[1] = af(d) * i + e, 
        u(s, cf, s), h(l, cf, l));
    }
    function Qn(t) {
        return Math.round(t / Cf * 1e8) / 1e8 % 2 * Cf;
    }
    function Jn(t, e) {
        var n = Qn(t[0]);
        0 > n && (n += If);
        var i = n - t[0], r = t[1];
        r += i, !e && r - n >= If ? r = n + If : e && n - r >= If ? r = n - If : !e && n > r ? r = n + (If - Qn(n - r)) : e && r > n && (r = n - (If - Qn(r - n))), 
        t[0] = n, t[1] = r;
    }
    function ti(t, e, n, i, r, o, a) {
        if (0 === r) return !1;
        var s, l = r;
        if (a > e + l && a > i + l || e - l > a && i - l > a || o > t + l && o > n + l || t - l > o && n - l > o) return !1;
        if (t === n) return Math.abs(o - t) <= l / 2;
        var u = (s = (e - i) / (t - n)) * o - a + (t * i - n * e) / (t - n);
        return l / 2 * l / 2 >= u * u / (s * s + 1);
    }
    function ei(t, e, n, i, r, o, a, s, l, u, h) {
        if (0 === l) return !1;
        return !(h > e + l && h > i + l && h > o + l && h > s + l || e - l > h && i - l > h && o - l > h && s - l > h || u > t + l && u > n + l && u > r + l && u > a + l || t - l > u && n - l > u && r - l > u && a - l > u) && l / 2 >= Ut(t, e, n, i, r, o, a, s, u, h, null);
    }
    function ni(t, e, n, i, r, o, a, s, l) {
        if (0 === a) return !1;
        return !(l > e + a && l > i + a && l > o + a || e - a > l && i - a > l && o - a > l || s > t + a && s > n + a && s > r + a || t - a > s && n - a > s && r - a > s) && a / 2 >= Kt(t, e, n, i, r, o, s, l, null);
    }
    function ii(t) {
        return 0 > (t %= Pf) && (t += Pf), t;
    }
    function ri(t, e, n, i, r, o, a, s, l) {
        if (0 === a) return !1;
        var u = a;
        s -= t, l -= e;
        var h = Math.sqrt(s * s + l * l);
        if (h - u > n || n > h + u) return !1;
        if (Math.abs(i - r) % Lf < 1e-4) return !0;
        if (o) {
            var c = i;
            i = ii(r), r = ii(c);
        } else i = ii(i), r = ii(r);
        i > r && (r += Lf);
        var p = Math.atan2(l, s);
        return 0 > p && (p += Lf), p >= i && r >= p || p + Lf >= i && r >= p + Lf;
    }
    function oi(t, e, n, i, r, o) {
        if (o > e && o > i || e > o && i > o) return 0;
        if (i === e) return 0;
        var a = (o - e) / (i - e), s = e > i ? 1 : -1;
        (1 === a || 0 === a) && (s = e > i ? .5 : -.5);
        var l = a * (n - t) + t;
        return l === r ? 1 / 0 : l > r ? s : 0;
    }
    function ai() {
        var t = zf[0];
        zf[0] = zf[1], zf[1] = t;
    }
    function si(t, e, n, i, r, o, a, s, l, u) {
        if (u > e && u > i && u > o && u > s || e > u && i > u && o > u && s > u) return 0;
        var h = Ht(e, i, o, s, u, Ef);
        if (0 === h) return 0;
        for (var c = 0, p = -1, d = void 0, f = void 0, g = 0; h > g; g++) {
            var y = Ef[g], v = 0 === y || 1 === y ? .5 : 1;
            l > Ft(t, n, r, a, y) || (0 > p && (p = Wt(e, i, o, s, zf), zf[1] < zf[0] && p > 1 && ai(), 
            d = Ft(e, i, o, s, zf[0]), p > 1 && (f = Ft(e, i, o, s, zf[1]))), c += 2 === p ? y < zf[0] ? e > d ? v : -v : y < zf[1] ? d > f ? v : -v : f > s ? v : -v : y < zf[0] ? e > d ? v : -v : d > s ? v : -v);
        }
        return c;
    }
    function li(t, e, n, i, r, o, a, s) {
        if (s > e && s > i && s > o || e > s && i > s && o > s) return 0;
        var l = function(t, e, n, i, r) {
            var o = t - 2 * e + n, a = 2 * (e - t), s = t - i, l = 0;
            if (zt(o)) {
                if (Nt(a)) (h = -s / a) >= 0 && 1 >= h && (r[l++] = h);
            } else {
                var u = a * a - 4 * o * s;
                if (zt(u)) (h = -a / (2 * o)) >= 0 && 1 >= h && (r[l++] = h); else if (u > 0) {
                    var h, c = wp(u), p = (-a - c) / (2 * o);
                    (h = (-a + c) / (2 * o)) >= 0 && 1 >= h && (r[l++] = h), p >= 0 && 1 >= p && (r[l++] = p);
                }
            }
            return l;
        }(e, i, o, s, Ef);
        if (0 === l) return 0;
        var u = jt(e, i, o);
        if (u >= 0 && 1 >= u) {
            for (var h = 0, c = Yt(e, i, o, u), p = 0; l > p; p++) {
                var d = 0 === Ef[p] || 1 === Ef[p] ? .5 : 1;
                a > Yt(t, n, r, Ef[p]) || (h += Ef[p] < u ? e > c ? d : -d : c > o ? d : -d);
            }
            return h;
        }
        d = 0 === Ef[0] || 1 === Ef[0] ? .5 : 1;
        return a > Yt(t, n, r, Ef[0]) ? 0 : e > o ? d : -d;
    }
    function ui(t, e, n, i, r, o, a, s) {
        if ((s -= e) > n || -n > s) return 0;
        var l = Math.sqrt(n * n - s * s);
        Ef[0] = -l, Ef[1] = l;
        var u = Math.abs(i - r);
        if (1e-4 > u) return 0;
        if (u >= Rf - 1e-4) {
            i = 0, r = Rf;
            var h = o ? 1 : -1;
            return a >= Ef[0] + t && a <= Ef[1] + t ? h : 0;
        }
        if (i > r) {
            var c = i;
            i = r, r = c;
        }
        0 > i && (i += Rf, r += Rf);
        for (var p = 0, d = 0; 2 > d; d++) {
            var f = Ef[d];
            if (f + t > a) {
                var g = Math.atan2(s, f);
                h = o ? 1 : -1;
                0 > g && (g = Rf + g), (g >= i && r >= g || g + Rf >= i && r >= g + Rf) && (g > Math.PI / 2 && g < 1.5 * Math.PI && (h = -h), 
                p += h);
            }
        }
        return p;
    }
    function hi(t, e, n, i, r) {
        for (var o, a, s = t.data, l = t.len(), u = 0, h = 0, c = 0, p = 0, d = 0, f = 0; l > f; ) {
            var g = s[f++], y = 1 === f;
            switch (g === Of.M && f > 1 && (n || (u += oi(h, c, p, d, i, r))), y && (p = h = s[f], 
            d = c = s[f + 1]), g) {
              case Of.M:
                h = p = s[f++], c = d = s[f++];
                break;

              case Of.L:
                if (n) {
                    if (ti(h, c, s[f], s[f + 1], e, i, r)) return !0;
                } else u += oi(h, c, s[f], s[f + 1], i, r) || 0;
                h = s[f++], c = s[f++];
                break;

              case Of.C:
                if (n) {
                    if (ei(h, c, s[f++], s[f++], s[f++], s[f++], s[f], s[f + 1], e, i, r)) return !0;
                } else u += si(h, c, s[f++], s[f++], s[f++], s[f++], s[f], s[f + 1], i, r) || 0;
                h = s[f++], c = s[f++];
                break;

              case Of.Q:
                if (n) {
                    if (ni(h, c, s[f++], s[f++], s[f], s[f + 1], e, i, r)) return !0;
                } else u += li(h, c, s[f++], s[f++], s[f], s[f + 1], i, r) || 0;
                h = s[f++], c = s[f++];
                break;

              case Of.A:
                var v = s[f++], m = s[f++], _ = s[f++], x = s[f++], w = s[f++], b = s[f++];
                f += 1;
                var S = !!(1 - s[f++]);
                o = Math.cos(w) * _ + v, a = Math.sin(w) * x + m, y ? (p = o, d = a) : u += oi(h, c, o, a, i, r);
                var M = (i - v) * x / _ + v;
                if (n) {
                    if (ri(v, m, x, w, w + b, S, e, M, r)) return !0;
                } else u += ui(v, m, x, w, w + b, S, M, r);
                h = Math.cos(w + b) * _ + v, c = Math.sin(w + b) * x + m;
                break;

              case Of.R:
                if (p = h = s[f++], d = c = s[f++], o = p + s[f++], a = d + s[f++], n) {
                    if (ti(p, d, o, d, e, i, r) || ti(o, d, o, a, e, i, r) || ti(o, a, p, a, e, i, r) || ti(p, a, p, d, e, i, r)) return !0;
                } else u += oi(o, d, o, a, i, r), u += oi(p, a, p, d, i, r);
                break;

              case Of.Z:
                if (n) {
                    if (ti(h, c, p, d, e, i, r)) return !0;
                } else u += oi(h, c, p, d, i, r);
                h = p, c = d;
            }
        }
        return n || function(t, e) {
            return Math.abs(t - e) < Bf;
        }(c, d) || (u += oi(h, c, p, d, i, r) || 0), 0 !== u;
    }
    function ci(t, e, n) {
        if (e) {
            var i = e.x1, r = e.x2, o = e.y1, a = e.y2;
            t.x1 = i, t.x2 = r, t.y1 = o, t.y2 = a;
            var s = n && n.lineWidth;
            return s ? (qf(2 * i) === qf(2 * r) && (t.x1 = t.x2 = di(i, s, !0)), qf(2 * o) === qf(2 * a) && (t.y1 = t.y2 = di(o, s, !0)), 
            t) : t;
        }
    }
    function pi(t, e, n) {
        if (e) {
            var i = e.x, r = e.y, o = e.width, a = e.height;
            t.x = i, t.y = r, t.width = o, t.height = a;
            var s = n && n.lineWidth;
            return s ? (t.x = di(i, s, !0), t.y = di(r, s, !0), t.width = Math.max(di(i + o, s, !1) - t.x, 0 === o ? 0 : 1), 
            t.height = Math.max(di(r + a, s, !1) - t.y, 0 === a ? 0 : 1), t) : t;
        }
    }
    function di(t, e, n) {
        if (!e) return t;
        var i = qf(2 * t);
        return (i + qf(e)) % 2 == 0 ? i / 2 : (i + (n ? 1 : -1)) / 2;
    }
    function fi(t) {
        return "string" != typeof t || -1 === t.indexOf("px") && -1 === t.indexOf("rem") && -1 === t.indexOf("em") ? isNaN(+t) ? rc + "px" : t + "px" : t;
    }
    function gi(t, e) {
        for (var n = 0; n < ng.length; n++) {
            var i = ng[n], r = e[i];
            null != r && (t[i] = r);
        }
    }
    function yi(t) {
        if (t) {
            t.font = Jf.makeFont(t);
            var e = t.align;
            "middle" === e && (e = "center"), t.align = null == e || tg[e] ? e : "left";
            var n = t.verticalAlign;
            "center" === n && (n = "middle"), t.verticalAlign = null == n || eg[n] ? n : "top", 
            t.padding && (t.padding = E(t.padding));
        }
    }
    function vi(t, e) {
        return null == t || 0 >= e || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;
    }
    function mi(t) {
        return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t;
    }
    function _i(t, e, n) {
        return "right" === e ? t - n[1] : "center" === e ? t + n[3] / 2 - n[1] / 2 : t + n[3];
    }
    function xi(t) {
        var e = t.text;
        return null != e && (e += ""), e;
    }
    function wi(t) {
        return !!(t.backgroundColor || t.lineHeight || t.borderWidth && t.borderColor);
    }
    function bi(t) {
        return null != t && "none" !== t;
    }
    function Si(t) {
        if (b(t)) {
            var e = wg.get(t);
            return e || (e = he(t, -.1), wg.put(t, e)), e;
        }
        if (D(t)) {
            var n = l({}, t);
            return n.colorStops = g(t.colorStops, function(t) {
                return {
                    offset: t.offset,
                    color: he(t.color, -.1)
                };
            }), n;
        }
        return t;
    }
    function Mi(t, e, n) {
        t.onHoverStateChange && (t.hoverState || 0) !== n && t.onHoverStateChange(e), t.hoverState = n;
    }
    function Ti(t) {
        Mi(t, "emphasis", cg);
    }
    function Ci(t) {
        t.hoverState === cg && Mi(t, "normal", ug);
    }
    function Ii(t) {
        Mi(t, "blur", hg);
    }
    function ki(t) {
        t.hoverState === hg && Mi(t, "normal", ug);
    }
    function Di(t) {
        t.selected = !0;
    }
    function Ai(t) {
        t.selected = !1;
    }
    function Pi(t, e, n) {
        e(t, n);
    }
    function Li(t, e, n) {
        Pi(t, e, n), t.isGroup && t.traverse(function(t) {
            Pi(t, e, n);
        });
    }
    function Oi(t, e) {
        var n = this.states[t];
        if (this.style) {
            if ("emphasis" === t) return function(t, e, n, i) {
                var r = n && h(n, "select") >= 0, o = !1;
                if (t instanceof Hf) {
                    var a = sg(t), s = r && a.selectFill || a.normalFill, u = r && a.selectStroke || a.normalStroke;
                    if (bi(s) || bi(u)) {
                        var c = (i = i || {}).style || {};
                        "inherit" === c.fill ? (o = !0, i = l({}, i), (c = l({}, c)).fill = s) : !bi(c.fill) && bi(s) ? (o = !0, 
                        i = l({}, i), (c = l({}, c)).fill = Si(s)) : !bi(c.stroke) && bi(u) && (o || (i = l({}, i), 
                        c = l({}, c)), c.stroke = Si(u)), i.style = c;
                    }
                }
                if (i && null == i.z2) {
                    o || (i = l({}, i));
                    var p = t.z2EmphasisLift;
                    i.z2 = t.z2 + (null != p ? p : fg);
                }
                return i;
            }(this, 0, e, n);
            if ("blur" === t) return function(t, e, n) {
                var i = h(t.currentStates, e) >= 0, r = t.style.opacity, o = i ? null : function(t, e, n, i) {
                    for (var r = t.style, o = {}, a = 0; a < e.length; a++) {
                        var s = e[a], l = r[s];
                        o[s] = null == l ? i && i[s] : l;
                    }
                    for (a = 0; a < t.animators.length; a++) {
                        var u = t.animators[a];
                        u.__fromStateTransition && u.__fromStateTransition.indexOf(n) < 0 && "style" === u.targetName && u.saveTo(o, e);
                    }
                    return o;
                }(t, [ "opacity" ], e, {
                    opacity: 1
                }), a = (n = n || {}).style || {};
                return null == a.opacity && (n = l({}, n), a = l({
                    opacity: i ? r : .1 * o.opacity
                }, a), n.style = a), n;
            }(this, t, n);
            if ("select" === t) return function(t, e, n) {
                if (n && null == n.z2) {
                    n = l({}, n);
                    var i = t.z2SelectLift;
                    n.z2 = t.z2 + (null != i ? i : gg);
                }
                return n;
            }(this, 0, n);
        }
        return n;
    }
    function Ri(t) {
        t.stateProxy = Oi;
        var e = t.getTextContent(), n = t.getTextGuideLine();
        e && (e.stateProxy = Oi), n && (n.stateProxy = Oi);
    }
    function Bi(t, e) {
        !Wi(t, e) && !t.__highByOuter && Li(t, Ti);
    }
    function Ei(t, e) {
        !Wi(t, e) && !t.__highByOuter && Li(t, Ci);
    }
    function zi(t, e) {
        t.__highByOuter |= 1 << (e || 0), Li(t, Ti);
    }
    function Ni(t, e) {
        !(t.__highByOuter &= ~(1 << (e || 0))) && Li(t, Ci);
    }
    function Fi(t) {
        Li(t, ki);
    }
    function Vi(t) {
        Li(t, Di);
    }
    function Hi(t) {
        Li(t, Ai);
    }
    function Wi(t, e) {
        return t.__highDownSilentOnTouch && e.zrByTouch;
    }
    function Gi(t) {
        var e = t.getModel(), n = [], i = [];
        e.eachComponent(function(e, r) {
            var o = lg(r), a = "series" === e, s = a ? t.getViewOfSeriesModel(r) : t.getViewOfComponentModel(r);
            !a && i.push(s), o.isBlured && (s.group.traverse(function(t) {
                ki(t);
            }), a && n.push(r)), o.isBlured = !1;
        }), f(i, function(t) {
            t && t.toggleBlurSeries && t.toggleBlurSeries(n, !1, e);
        });
    }
    function Ui(t, e, n, i) {
        function r(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = t.getItemGraphicEl(e[n]);
                i && Fi(i);
            }
        }
        var o = i.getModel();
        if (n = n || "coordinateSystem", null != t && e && "none" !== e) {
            var a = o.getSeriesByIndex(t), s = a.coordinateSystem;
            s && s.master && (s = s.master);
            var l = [];
            o.eachSeries(function(t) {
                var o = a === t, u = t.coordinateSystem;
                if (u && u.master && (u = u.master), !("series" === n && !o || "coordinateSystem" === n && !(u && s ? u === s : o) || "series" === e && o)) {
                    if (i.getViewOfSeriesModel(t).group.traverse(function(t) {
                        t.__highByOuter && o && "self" === e || Ii(t);
                    }), d(e)) r(t.getData(), e); else if (T(e)) for (var h = m(e), c = 0; c < h.length; c++) r(t.getData(h[c]), e[h[c]]);
                    l.push(t), lg(t).isBlured = !0;
                }
            }), o.eachComponent(function(t, e) {
                if ("series" !== t) {
                    var n = i.getViewOfComponentModel(e);
                    n && n.toggleBlurSeries && n.toggleBlurSeries(l, !0, o);
                }
            });
        }
    }
    function Xi(t, e, n) {
        if (null != t && null != e) {
            var i = n.getModel().getComponent(t, e);
            if (i) {
                lg(i).isBlured = !0;
                var r = n.getViewOfComponentModel(i);
                r && r.focusBlurEnabled && r.group.traverse(function(t) {
                    Ii(t);
                });
            }
        }
    }
    function Yi(t, e, n, i) {
        var r = {
            focusSelf: !1,
            dispatchers: null
        };
        if (null == t || "series" === t || null == e || null == n) return r;
        var o = i.getModel().getComponent(t, e);
        if (!o) return r;
        var a = i.getViewOfComponentModel(o);
        if (!a || !a.findHighDownDispatchers) return r;
        for (var s, l = a.findHighDownDispatchers(n), u = 0; u < l.length; u++) if ("self" === ig(l[u]).focus) {
            s = !0;
            break;
        }
        return {
            focusSelf: s,
            dispatchers: l
        };
    }
    function qi(t) {
        f(t.getAllData(), function(e) {
            var n = e.data, i = e.type;
            n.eachItemGraphicEl(function(e, n) {
                t.isSelected(n, i) ? Vi(e) : Hi(e);
            });
        });
    }
    function ji(t) {
        var e = [];
        return t.eachSeries(function(t) {
            f(t.getAllData(), function(n) {
                var i = (n.data, n.type), r = t.getSelectedDataIndices();
                if (r.length > 0) {
                    var o = {
                        dataIndex: r,
                        seriesIndex: t.seriesIndex
                    };
                    null != i && (o.dataType = i), e.push(o);
                }
            });
        }), e;
    }
    function Zi(t, e, n) {
        Qi(t, !0), Li(t, Ri), function(t, e, n) {
            var i = ig(t);
            null != e ? (i.focus = e, i.blurScope = n) : i.focus && (i.focus = null);
        }(t, e, n);
    }
    function Ki(t, e, n, i) {
        i ? function(t) {
            Qi(t, !1);
        }(t) : Zi(t, e, n);
    }
    function $i(t, e, n, i) {
        n = n || "itemStyle";
        for (var r = 0; r < bg.length; r++) {
            var o = bg[r], a = e.getModel([ o, n ]);
            t.ensureState(o).style = i ? i(a) : a[Sg[n]]();
        }
    }
    function Qi(t, e) {
        var n = !1 === e, i = t;
        t.highDownSilentOnTouch && (i.__highDownSilentOnTouch = t.highDownSilentOnTouch), 
        (!n || i.__highDownDispatcher) && (i.__highByOuter = i.__highByOuter || 0, i.__highDownDispatcher = !n);
    }
    function Ji(t) {
        return !(!t || !t.__highDownDispatcher);
    }
    function tr(t) {
        var e = t.type;
        return e === mg || e === _g || e === xg;
    }
    function er(t) {
        var e = t.type;
        return e === yg || e === vg;
    }
    function nr(t) {
        return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
    }
    function ir(t, e) {
        return (t[0] * e[0] + t[1] * e[1]) / (nr(t) * nr(e));
    }
    function rr(t, e) {
        return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(ir(t, e));
    }
    function or(t, e, n, i, r, o, a, s, l, u, h) {
        var c = l * (Pg / 180), p = Ag(c) * (t - n) / 2 + Dg(c) * (e - i) / 2, d = -1 * Dg(c) * (t - n) / 2 + Ag(c) * (e - i) / 2, f = p * p / (a * a) + d * d / (s * s);
        f > 1 && (a *= kg(f), s *= kg(f));
        var g = (r === o ? -1 : 1) * kg((a * a * s * s - a * a * d * d - s * s * p * p) / (a * a * d * d + s * s * p * p)) || 0, y = g * a * d / s, v = g * -s * p / a, m = (t + n) / 2 + Ag(c) * y - Dg(c) * v, _ = (e + i) / 2 + Dg(c) * y + Ag(c) * v, x = rr([ 1, 0 ], [ (p - y) / a, (d - v) / s ]), w = [ (p - y) / a, (d - v) / s ], b = [ (-1 * p - y) / a, (-1 * d - v) / s ], S = rr(w, b);
        if (ir(w, b) <= -1 && (S = Pg), ir(w, b) >= 1 && (S = 0), 0 > S) {
            var M = Math.round(S / Pg * 1e6) / 1e6;
            S = 2 * Pg + M % 2 * Pg;
        }
        h.addData(u, m, _, a, s, x, S, c, o);
    }
    function ar(t) {
        return null != t.setData;
    }
    function sr(t, e) {
        var n = function(t) {
            var e = new Af();
            if (!t) return e;
            var n, i = 0, r = 0, o = i, a = r, s = Af.CMD, l = t.match(Lg);
            if (!l) return e;
            for (var u = 0; u < l.length; u++) {
                for (var h = l[u], c = h.charAt(0), p = void 0, d = h.match(Og) || [], f = d.length, g = 0; f > g; g++) d[g] = parseFloat(d[g]);
                for (var y = 0; f > y; ) {
                    var v = void 0, m = void 0, _ = void 0, x = void 0, w = void 0, b = void 0, S = void 0, M = i, T = r, C = void 0, I = void 0;
                    switch (c) {
                      case "l":
                        i += d[y++], r += d[y++], p = s.L, e.addData(p, i, r);
                        break;

                      case "L":
                        i = d[y++], r = d[y++], p = s.L, e.addData(p, i, r);
                        break;

                      case "m":
                        i += d[y++], r += d[y++], p = s.M, e.addData(p, i, r), o = i, a = r, c = "l";
                        break;

                      case "M":
                        i = d[y++], r = d[y++], p = s.M, e.addData(p, i, r), o = i, a = r, c = "L";
                        break;

                      case "h":
                        i += d[y++], p = s.L, e.addData(p, i, r);
                        break;

                      case "H":
                        i = d[y++], p = s.L, e.addData(p, i, r);
                        break;

                      case "v":
                        r += d[y++], p = s.L, e.addData(p, i, r);
                        break;

                      case "V":
                        r = d[y++], p = s.L, e.addData(p, i, r);
                        break;

                      case "C":
                        p = s.C, e.addData(p, d[y++], d[y++], d[y++], d[y++], d[y++], d[y++]), i = d[y - 2], 
                        r = d[y - 1];
                        break;

                      case "c":
                        p = s.C, e.addData(p, d[y++] + i, d[y++] + r, d[y++] + i, d[y++] + r, d[y++] + i, d[y++] + r), 
                        i += d[y - 2], r += d[y - 1];
                        break;

                      case "S":
                        v = i, m = r, C = e.len(), I = e.data, n === s.C && (v += i - I[C - 4], m += r - I[C - 3]), 
                        p = s.C, M = d[y++], T = d[y++], i = d[y++], r = d[y++], e.addData(p, v, m, M, T, i, r);
                        break;

                      case "s":
                        v = i, m = r, C = e.len(), I = e.data, n === s.C && (v += i - I[C - 4], m += r - I[C - 3]), 
                        p = s.C, M = i + d[y++], T = r + d[y++], i += d[y++], r += d[y++], e.addData(p, v, m, M, T, i, r);
                        break;

                      case "Q":
                        M = d[y++], T = d[y++], i = d[y++], r = d[y++], p = s.Q, e.addData(p, M, T, i, r);
                        break;

                      case "q":
                        M = d[y++] + i, T = d[y++] + r, i += d[y++], r += d[y++], p = s.Q, e.addData(p, M, T, i, r);
                        break;

                      case "T":
                        v = i, m = r, C = e.len(), I = e.data, n === s.Q && (v += i - I[C - 4], m += r - I[C - 3]), 
                        i = d[y++], r = d[y++], p = s.Q, e.addData(p, v, m, i, r);
                        break;

                      case "t":
                        v = i, m = r, C = e.len(), I = e.data, n === s.Q && (v += i - I[C - 4], m += r - I[C - 3]), 
                        i += d[y++], r += d[y++], p = s.Q, e.addData(p, v, m, i, r);
                        break;

                      case "A":
                        _ = d[y++], x = d[y++], w = d[y++], b = d[y++], S = d[y++], or(M = i, T = r, i = d[y++], r = d[y++], b, S, _, x, w, p = s.A, e);
                        break;

                      case "a":
                        _ = d[y++], x = d[y++], w = d[y++], b = d[y++], S = d[y++], or(M = i, T = r, i += d[y++], r += d[y++], b, S, _, x, w, p = s.A, e);
                    }
                }
                ("z" === c || "Z" === c) && (p = s.Z, e.addData(p), i = o, r = a), n = p;
            }
            return e.toStatic(), e;
        }(t), i = l({}, e);
        return i.buildPath = function(t) {
            if (ar(t)) {
                t.setData(n.data), (e = t.getContext()) && t.rebuildPath(e, 1);
            } else {
                var e = t;
                n.rebuildPath(e, 1);
            }
        }, i.applyTransform = function(t) {
            (function(t, e) {
                if (e) {
                    var n, i, r, o, a, s, l = t.data, u = t.len(), h = Mg.M, c = Mg.C, p = Mg.L, d = Mg.R, f = Mg.A, g = Mg.Q;
                    for (r = 0, o = 0; u > r; ) {
                        switch (n = l[r++], o = r, i = 0, n) {
                          case h:
                          case p:
                            i = 1;
                            break;

                          case c:
                            i = 3;
                            break;

                          case g:
                            i = 2;
                            break;

                          case f:
                            var y = e[4], v = e[5], m = Cg(e[0] * e[0] + e[1] * e[1]), _ = Cg(e[2] * e[2] + e[3] * e[3]), x = Ig(-e[1] / _, e[0] / m);
                            l[r] *= m, l[r++] += y, l[r] *= _, l[r++] += v, l[r++] *= m, l[r++] *= _, l[r++] += x, 
                            l[r++] += x, o = r += 2;
                            break;

                          case d:
                            s[0] = l[r++], s[1] = l[r++], rt(s, s, e), l[o++] = s[0], l[o++] = s[1], s[0] += l[r++], 
                            s[1] += l[r++], rt(s, s, e), l[o++] = s[0], l[o++] = s[1];
                        }
                        for (a = 0; i > a; a++) {
                            var w = Tg[a];
                            w[0] = l[r++], w[1] = l[r++], rt(w, w, e), l[o++] = w[0], l[o++] = w[1];
                        }
                    }
                    t.increaseVersion();
                }
            })(n, t), this.dirtyShape();
        }, i;
    }
    function lr(t, e, n, i, r, o, a) {
        var s = t - n, l = e - i, u = (a ? o : -o) / Yg(s * s + l * l), h = u * l, c = -u * s, p = t + h, d = e + c, f = n + h, g = i + c, y = (p + f) / 2, v = (d + g) / 2, m = f - p, _ = g - d, x = m * m + _ * _, w = r - o, b = p * g - f * d, S = (0 > _ ? -1 : 1) * Yg(qg(0, w * w * x - b * b)), M = (b * _ - m * S) / x, T = (-b * m - _ * S) / x, C = (b * _ + m * S) / x, I = (-b * m + _ * S) / x, k = M - y, D = T - v, A = C - y, P = I - v;
        return k * k + D * D > A * A + P * P && (M = C, T = I), {
            cx: M,
            cy: T,
            x0: -h,
            y0: -c,
            x1: M * (r / w - 1),
            y1: T * (r / w - 1)
        };
    }
    function ur(t) {
        var e;
        if (x(t)) {
            var n = t.length;
            if (!n) return t;
            e = 1 === n ? [ t[0], t[0], 0, 0 ] : 2 === n ? [ t[0], t[0], t[1], t[1] ] : 3 === n ? t.concat(t[2]) : t;
        } else e = [ t, t, t, t ];
        return e;
    }
    function hr(t, e) {
        var n, i = qg(e.r, 0), r = qg(e.r0 || 0, 0), o = i > 0;
        if (o || r > 0) {
            if (o || (i = r, r = 0), r > i) {
                var a = i;
                i = r, r = a;
            }
            var s = e.startAngle, l = e.endAngle;
            if (!isNaN(s) && !isNaN(l)) {
                var u = e.cx, h = e.cy, c = !!e.clockwise, p = Xg(l - s), d = p > Vg && p % Vg;
                if (d > Zg && (p = d), i > Zg) if (p > Vg - Zg) t.moveTo(u + i * Wg(s), h + i * Hg(s)), 
                t.arc(u, h, i, s, l, !c), r > Zg && (t.moveTo(u + r * Wg(l), h + r * Hg(l)), t.arc(u, h, r, l, s, c)); else {
                    var f = void 0, g = void 0, y = void 0, v = void 0, m = void 0, _ = void 0, x = void 0, w = void 0, b = void 0, S = void 0, M = void 0, T = void 0, C = void 0, I = void 0, k = void 0, D = void 0, A = i * Wg(s), P = i * Hg(s), L = r * Wg(l), O = r * Hg(l), R = p > Zg;
                    if (R) {
                        var B = e.cornerRadius;
                        B && (f = (n = ur(B))[0], g = n[1], y = n[2], v = n[3]);
                        var E = Xg(i - r) / 2;
                        if (m = jg(E, y), _ = jg(E, v), x = jg(E, f), w = jg(E, g), M = b = qg(m, _), T = S = qg(x, w), 
                        (b > Zg || S > Zg) && (C = i * Wg(l), I = i * Hg(l), k = r * Wg(s), D = r * Hg(s), 
                        Fg > p)) {
                            var z = function(t, e, n, i, r, o, a, s) {
                                var l = n - t, u = i - e, h = a - r, c = s - o, p = c * l - h * u;
                                return Zg > p * p ? void 0 : [ t + (p = (h * (e - o) - c * (t - r)) / p) * l, e + p * u ];
                            }(A, P, k, D, C, I, L, O);
                            if (z) {
                                var N = A - z[0], F = P - z[1], V = C - z[0], H = I - z[1], W = 1 / Hg(Gg((N * V + F * H) / (Yg(N * N + F * F) * Yg(V * V + H * H))) / 2), G = Yg(z[0] * z[0] + z[1] * z[1]);
                                M = jg(b, (i - G) / (W + 1)), T = jg(S, (r - G) / (W - 1));
                            }
                        }
                    }
                    if (R) if (M > Zg) {
                        var U = jg(y, M), X = jg(v, M), Y = lr(k, D, A, P, i, U, c), q = lr(C, I, L, O, i, X, c);
                        t.moveTo(u + Y.cx + Y.x0, h + Y.cy + Y.y0), b > M && U === X ? t.arc(u + Y.cx, h + Y.cy, M, Ug(Y.y0, Y.x0), Ug(q.y0, q.x0), !c) : (U > 0 && t.arc(u + Y.cx, h + Y.cy, U, Ug(Y.y0, Y.x0), Ug(Y.y1, Y.x1), !c), 
                        t.arc(u, h, i, Ug(Y.cy + Y.y1, Y.cx + Y.x1), Ug(q.cy + q.y1, q.cx + q.x1), !c), 
                        X > 0 && t.arc(u + q.cx, h + q.cy, X, Ug(q.y1, q.x1), Ug(q.y0, q.x0), !c));
                    } else t.moveTo(u + A, h + P), t.arc(u, h, i, s, l, !c); else t.moveTo(u + A, h + P);
                    if (r > Zg && R) if (T > Zg) {
                        U = jg(f, T), Y = lr(L, O, C, I, r, -(X = jg(g, T)), c), q = lr(A, P, k, D, r, -U, c);
                        t.lineTo(u + Y.cx + Y.x0, h + Y.cy + Y.y0), S > T && U === X ? t.arc(u + Y.cx, h + Y.cy, T, Ug(Y.y0, Y.x0), Ug(q.y0, q.x0), !c) : (X > 0 && t.arc(u + Y.cx, h + Y.cy, X, Ug(Y.y0, Y.x0), Ug(Y.y1, Y.x1), !c), 
                        t.arc(u, h, r, Ug(Y.cy + Y.y1, Y.cx + Y.x1), Ug(q.cy + q.y1, q.cx + q.x1), c), U > 0 && t.arc(u + q.cx, h + q.cy, U, Ug(q.y1, q.x1), Ug(q.y0, q.x0), !c));
                    } else t.lineTo(u + L, h + O), t.arc(u, h, r, l, s, c); else t.lineTo(u + L, h + O);
                } else t.moveTo(u, h);
                t.closePath();
            }
        }
    }
    function cr(t, e, n) {
        var i = e.smooth, r = e.points;
        if (r && r.length >= 2) {
            if (i) {
                var o = function(t, e, n, i) {
                    var r, o, a, s, l = [], u = [], h = [], c = [];
                    if (i) {
                        a = [ 1 / 0, 1 / 0 ], s = [ -1 / 0, -1 / 0 ];
                        for (var p = 0, d = t.length; d > p; p++) ot(a, a, t[p]), at(s, s, t[p]);
                        ot(a, a, i[0]), at(s, s, i[1]);
                    }
                    for (p = 0, d = t.length; d > p; p++) {
                        var f = t[p];
                        if (n) r = t[p ? p - 1 : d - 1], o = t[(p + 1) % d]; else {
                            if (0 === p || p === d - 1) {
                                l.push(j(t[p]));
                                continue;
                            }
                            r = t[p - 1], o = t[p + 1];
                        }
                        K(u, o, r), J(u, u, e);
                        var g = et(f, r), y = et(f, o), v = g + y;
                        0 !== v && (g /= v, y /= v), J(h, u, -g), J(c, u, y);
                        var m = Z([], f, h), _ = Z([], f, c);
                        i && (at(m, m, a), ot(m, m, s), at(_, _, a), ot(_, _, s)), l.push(m), l.push(_);
                    }
                    return n && l.push(l.shift()), l;
                }(r, i, n, e.smoothConstraint);
                t.moveTo(r[0][0], r[0][1]);
                for (var a = r.length, s = 0; (n ? a : a - 1) > s; s++) {
                    var l = o[2 * s], u = o[2 * s + 1], h = r[(s + 1) % a];
                    t.bezierCurveTo(l[0], l[1], u[0], u[1], h[0], h[1]);
                }
            } else {
                t.moveTo(r[0][0], r[0][1]);
                s = 1;
                for (var c = r.length; c > s; s++) t.lineTo(r[s][0], r[s][1]);
            }
            n && t.closePath();
        }
    }
    function pr(t, e, n) {
        var i = t.cpx2, r = t.cpy2;
        return null != i || null != r ? [ (n ? Vt : Ft)(t.x1, t.cpx1, t.cpx2, t.x2, e), (n ? Vt : Ft)(t.y1, t.cpy1, t.cpy2, t.y2, e) ] : [ (n ? qt : Yt)(t.x1, t.cpx1, t.x2, e), (n ? qt : Yt)(t.y1, t.cpy1, t.y2, e) ];
    }
    function dr(t, e, n, i, r, o, a) {
        var s, l = !1;
        w(r) ? (a = o, o = r, r = null) : T(r) && (o = r.cb, a = r.during, l = r.isFrom, 
        s = r.removeOpt, r = r.dataIndex);
        var u = "leave" === t;
        u || e.stopAnimation("leave");
        var h = function(t, e, n, i, r) {
            var o;
            if (e && e.ecModel) {
                var a = e.ecModel.getUpdatePayload();
                o = a && a.animation;
            }
            var s = "update" === t;
            if (e && e.isAnimationEnabled()) {
                var l = void 0, u = void 0, h = void 0;
                return i ? (l = O(i.duration, 200), u = O(i.easing, "cubicOut"), h = 0) : (l = e.getShallow(s ? "animationDurationUpdate" : "animationDuration"), 
                u = e.getShallow(s ? "animationEasingUpdate" : "animationEasing"), h = e.getShallow(s ? "animationDelayUpdate" : "animationDelay")), 
                o && (null != o.duration && (l = o.duration), null != o.easing && (u = o.easing), 
                null != o.delay && (h = o.delay)), w(h) && (h = h(n, r)), w(l) && (l = l(n)), {
                    duration: l || 0,
                    delay: h,
                    easing: u
                };
            }
            return null;
        }(t, i, r, u ? s || {} : null, i && i.getAnimationDelayParams ? i.getAnimationDelayParams(e, r) : null);
        if (h && h.duration > 0) {
            var c = {
                duration: h.duration,
                delay: h.delay || 0,
                easing: h.easing,
                done: o,
                force: !!o || !!a,
                setToFinal: !u,
                scope: t,
                during: a
            };
            l ? e.animateFrom(n, c) : e.animateTo(n, c);
        } else e.stopAnimation(), !l && e.attr(n), a && a(1), o && o();
    }
    function fr(t, e, n, i, r, o) {
        dr("update", t, e, n, i, r, o);
    }
    function gr(t, e, n, i, r, o) {
        dr("enter", t, e, n, i, r, o);
    }
    function yr(t) {
        if (!t.__zr) return !0;
        for (var e = 0; e < t.animators.length; e++) {
            if ("leave" === t.animators[e].scope) return !0;
        }
        return !1;
    }
    function vr(t, e, n, i, r, o) {
        yr(t) || dr("leave", t, e, n, i, r, o);
    }
    function mr(t, e, n, i) {
        t.removeTextContent(), t.removeTextGuideLine(), vr(t, {
            style: {
                opacity: 0
            }
        }, e, n, i);
    }
    function _r(t, e, n) {
        function i() {
            t.parent && t.parent.remove(t);
        }
        t.isGroup ? t.traverse(function(t) {
            t.isGroup || mr(t, e, n, i);
        }) : mr(t, e, n, i);
    }
    function xr(t) {
        return Hf.extend(t);
    }
    function wr(t, e) {
        return Iy(t, e);
    }
    function br(t, e) {
        Cy[t] = e;
    }
    function Sr(t) {
        return Cy.hasOwnProperty(t) ? Cy[t] : void 0;
    }
    function Mr(t, e, n, i) {
        var r = function(t, e) {
            return new Rg(sr(t, e));
        }(t, e);
        return n && ("center" === i && (n = Cr(n, r.getBoundingRect())), Ir(r, n)), r;
    }
    function Tr(t, e, n) {
        var i = new Yf({
            style: {
                image: t,
                x: e.x,
                y: e.y,
                width: e.width,
                height: e.height
            },
            onload: function(t) {
                if ("center" === n) {
                    var r = {
                        width: t.width,
                        height: t.height
                    };
                    i.setStyle(Cr(e, r));
                }
            }
        });
        return i;
    }
    function Cr(t, e) {
        var n, i = e.width / e.height, r = t.height * i;
        return r <= t.width ? n = t.height : n = (r = t.width) / i, {
            x: t.x + t.width / 2 - r / 2,
            y: t.y + t.height / 2 - n / 2,
            width: r,
            height: n
        };
    }
    function Ir(t, e) {
        if (t.applyTransform) {
            var n = t.getBoundingRect().calculateTransform(e);
            t.applyTransform(n);
        }
    }
    function kr(t, e) {
        return ci(t, t, {
            lineWidth: e
        }), t;
    }
    function Dr(t, e) {
        for (var n = _t([]); t && t !== e; ) wt(n, t.getLocalTransform(), n), t = t.parent;
        return n;
    }
    function Ar(t, e, n) {
        return e && !d(e) && (e = gd.getLocalTransform(e)), n && (e = Tt([], e)), rt([], t, e);
    }
    function Pr(t) {
        return !t.isGroup;
    }
    function Lr(t, e, n) {
        function i(t) {
            var e = {
                x: t.x,
                y: t.y,
                rotation: t.rotation
            };
            return function(t) {
                return null != t.shape;
            }(t) && (e.shape = l({}, t.shape)), e;
        }
        if (t && e) {
            var r = function(t) {
                var e = {};
                return t.traverse(function(t) {
                    Pr(t) && t.anid && (e[t.anid] = t);
                }), e;
            }(t);
            e.traverse(function(t) {
                if (Pr(t) && t.anid) {
                    var e = r[t.anid];
                    if (e) {
                        var o = i(t);
                        t.attr(i(e)), fr(t, o, n, ig(t).dataIndex);
                    }
                }
            });
        }
    }
    function Or(t, e) {
        return g(t, function(t) {
            var n = t[0];
            n = My(n, e.x), n = Ty(n, e.x + e.width);
            var i = t[1];
            return i = My(i, e.y), [ n, i = Ty(i, e.y + e.height) ];
        });
    }
    function Rr(t, e) {
        var n = My(t.x, e.x), i = Ty(t.x + t.width, e.x + e.width), r = My(t.y, e.y), o = Ty(t.y + t.height, e.y + e.height);
        return i >= n && o >= r ? {
            x: n,
            y: r,
            width: i - n,
            height: o - r
        } : void 0;
    }
    function Br(t, e, n) {
        var i = l({
            rectHover: !0
        }, e), r = i.style = {
            strokeNoScale: !0
        };
        return n = n || {
            x: -1,
            y: -1,
            width: 2,
            height: 2
        }, t ? 0 === t.indexOf("image://") ? (r.image = t.slice(8), u(r, n), new Yf(i)) : Mr(t.replace("path://", ""), i, n, "center") : void 0;
    }
    function Er(t, e, n, i, r, o, a, s) {
        var l = n - t, u = i - e, h = a - r, c = s - o, p = zr(h, c, l, u);
        if (function(t) {
            return 1e-6 >= t && t >= -1e-6;
        }(p)) return !1;
        var d = t - r, f = e - o, g = zr(d, f, l, u) / p;
        if (0 > g || g > 1) return !1;
        var y = zr(d, f, h, c) / p;
        return !(0 > y || y > 1);
    }
    function zr(t, e, n, i) {
        return t * i - n * e;
    }
    function Nr(t) {
        var e = t.itemTooltipOption, n = t.componentModel, i = t.itemName, r = b(e) ? {
            formatter: e
        } : e, o = n.mainType, a = n.componentIndex, s = {
            componentType: o,
            name: i,
            $vars: [ "name" ]
        };
        s[o + "Index"] = a;
        var l = t.formatterParamsExtra;
        l && f(m(l), function(t) {
            X(s, t) || (s[t] = l[t], s.$vars.push(t));
        });
        var h = ig(t.el);
        h.componentMainType = o, h.componentIndex = a, h.tooltipConfig = {
            name: i,
            option: u({
                content: i,
                formatterParams: s
            }, r)
        };
    }
    function Fr(t, e) {
        var n;
        t.isGroup && (n = e(t)), n || t.traverse(e);
    }
    function Vr(t, e) {
        if (t) if (x(t)) for (var n = 0; n < t.length; n++) Fr(t[n], e); else Fr(t, e);
    }
    function Hr(t, e) {
        for (var n = 0; n < pg.length; n++) {
            var i = pg[n], r = e[i], o = t.ensureState(i);
            o.style = o.style || {}, o.style.text = r;
        }
        var a = t.currentStates.slice();
        t.clearStates(!0), t.setStyle({
            text: e.normal
        }), t.useStates(a, !0);
    }
    function Wr(t, e, n) {
        var i, r = t.labelFetcher, o = t.labelDataIndex, a = t.labelDimIndex, s = e.normal;
        r && (i = r.getFormattedLabel(o, "normal", null, a, s && s.get("formatter"), null != n ? {
            interpolatedValue: n
        } : null)), null == i && (i = w(t.defaultText) ? t.defaultText(o, t, n) : t.defaultText);
        for (var l = {
            normal: i
        }, u = 0; u < pg.length; u++) {
            var h = pg[u], c = e[h];
            l[h] = O(r ? r.getFormattedLabel(o, h, null, a, c && c.get("formatter")) : null, i);
        }
        return l;
    }
    function Gr(t, e, n, i) {
        n = n || Py;
        for (var r = t instanceof Jf, o = !1, a = 0; a < dg.length; a++) {
            if ((p = e[dg[a]]) && p.getShallow("show")) {
                o = !0;
                break;
            }
        }
        var s = r ? t : t.getTextContent();
        if (o) {
            r || (s || (s = new Jf(), t.setTextContent(s)), t.stateProxy && (s.stateProxy = t.stateProxy));
            var l = Wr(n, e), u = e.normal, h = !!u.getShallow("show"), c = Ur(u, i && i.normal, n, !1, !r);
            c.text = l.normal, r || t.setTextConfig(Xr(u, n, !1));
            for (a = 0; a < pg.length; a++) {
                var p, d = pg[a];
                if (p = e[d]) {
                    var f = s.ensureState(d), g = !!O(p.getShallow("show"), h);
                    if (g !== h && (f.ignore = !g), f.style = Ur(p, i && i[d], n, !0, !r), f.style.text = l[d], 
                    !r) t.ensureState(d).textConfig = Xr(p, n, !0);
                }
            }
            s.silent = !!u.getShallow("silent"), null != s.style.x && (c.x = s.style.x), null != s.style.y && (c.y = s.style.y), 
            s.ignore = !h, s.useStyle(c), s.dirty(), n.enableTextSetter && (By(s).setLabelText = function(t) {
                var i = Wr(n, e, t);
                Hr(s, i);
            });
        } else s && (s.ignore = !0);
        t.dirty();
    }
    function Ur(t, e, n, i, r) {
        var o = {};
        return function(t, e, n, i, r) {
            n = n || Py;
            var o, a = e.ecModel, s = a && a.option.textStyle, l = function(t) {
                for (var e; t && t !== t.ecModel; ) {
                    var n = (t.option || Py).rich;
                    if (n) {
                        e = e || {};
                        for (var i = m(n), r = 0; r < i.length; r++) {
                            var o = i[r];
                            e[o] = 1;
                        }
                    }
                    t = t.parentModel;
                }
                return e;
            }(e);
            if (l) for (var u in o = {}, l) if (l.hasOwnProperty(u)) {
                var h = e.getModel([ "rich", u ]);
                Yr(o[u] = {}, h, s, n, i, r, !1, !0);
            }
            o && (t.rich = o);
            var c = e.get("overflow");
            c && (t.overflow = c);
            var p = e.get("minMargin");
            null != p && (t.margin = p), Yr(t, e, s, n, i, r, !0, !1);
        }(o, t, n, i, r), e && l(o, e), o;
    }
    function Xr(t, e, n) {
        e = e || {};
        var i, r = {}, o = t.getShallow("rotate"), a = O(t.getShallow("distance"), n ? null : 5), s = t.getShallow("offset");
        return "outside" === (i = t.getShallow("position") || (n ? null : "inside")) && (i = e.defaultOutsidePosition || "top"), 
        null != i && (r.position = i), null != s && (r.offset = s), null != o && (o *= Math.PI / 180, 
        r.rotation = o), null != a && (r.distance = a), r.outsideFill = "inherit" === t.get("color") ? e.inheritColor || null : "auto", 
        r;
    }
    function Yr(t, e, n, i, r, o, a, s) {
        n = !r && n || Py;
        var l = i && i.inheritColor, u = e.getShallow("color"), h = e.getShallow("textBorderColor"), c = O(e.getShallow("opacity"), n.opacity);
        ("inherit" === u || "auto" === u) && (u = l || null), ("inherit" === h || "auto" === h) && (h = l || null), 
        o || (u = u || n.color, h = h || n.textBorderColor), null != u && (t.fill = u), 
        null != h && (t.stroke = h);
        var p = O(e.getShallow("textBorderWidth"), n.textBorderWidth);
        null != p && (t.lineWidth = p);
        var d = O(e.getShallow("textBorderType"), n.textBorderType);
        null != d && (t.lineDash = d);
        var f = O(e.getShallow("textBorderDashOffset"), n.textBorderDashOffset);
        null != f && (t.lineDashOffset = f), r || null != c || s || (c = i && i.defaultOpacity), 
        null != c && (t.opacity = c), r || o || null == t.fill && i.inheritColor && (t.fill = i.inheritColor);
        for (var g = 0; g < Ly.length; g++) {
            var y = Ly[g];
            null != (m = O(e.getShallow(y), n[y])) && (t[y] = m);
        }
        for (g = 0; g < Oy.length; g++) {
            y = Oy[g];
            null != (m = e.getShallow(y)) && (t[y] = m);
        }
        if (null == t.verticalAlign) {
            var v = e.getShallow("baseline");
            null != v && (t.verticalAlign = v);
        }
        if (!a || !i.disableBox) {
            for (g = 0; g < Ry.length; g++) {
                var m;
                y = Ry[g];
                null != (m = e.getShallow(y)) && (t[y] = m);
            }
            var _ = e.getShallow("borderType");
            null != _ && (t.borderDash = _), "auto" !== t.backgroundColor && "inherit" !== t.backgroundColor || !l || (t.backgroundColor = l), 
            "auto" !== t.borderColor && "inherit" !== t.borderColor || !l || (t.borderColor = l);
        }
    }
    function qr(t, e, n, i) {
        if (t) {
            var r = By(t);
            r.prevValue = r.value, r.value = n;
            var o = e.normal;
            r.valueAnimation = o.get("valueAnimation"), r.valueAnimation && (r.precision = o.get("precision"), 
            r.defaultInterpolatedText = i, r.statesModels = e);
        }
    }
    function jr(t, e, n, i, r) {
        var o = By(t);
        if (o.valueAnimation && o.prevValue !== o.value) {
            var a = o.defaultInterpolatedText, s = O(o.interpolatedValue, o.prevValue), l = o.value;
            t.percent = 0, (null == o.prevValue ? gr : fr)(t, {
                percent: 1
            }, i, e, null, function(i) {
                var u = function(t, e, n, i, r) {
                    var o = null == e || "auto" === e;
                    if (null == i) return i;
                    if (M(i)) return Ke(f = dn(n || 0, i, r), o ? Math.max($e(n || 0), $e(i)) : e);
                    if (b(i)) return 1 > r ? n : i;
                    for (var a = [], s = n, l = i, u = Math.max(s ? s.length : 0, l.length), h = 0; u > h; ++h) {
                        var c = t.getDimensionInfo(h);
                        if (c && "ordinal" === c.type) a[h] = (1 > r && s ? s : l)[h]; else {
                            var p = s && s[h] ? s[h] : 0, d = l[h], f = dn(p, d, r);
                            a[h] = Ke(f, o ? Math.max($e(p), $e(d)) : e);
                        }
                    }
                    return a;
                }(n, o.precision, s, l, i);
                o.interpolatedValue = 1 === i ? null : u;
                var h = Wr({
                    labelDataIndex: e,
                    labelFetcher: r,
                    defaultText: a ? a(u) : u + ""
                }, o.statesModels, u);
                Hr(t, h);
            });
        }
    }
    function Zr(t) {
        return [ t || "", qy++ ].join("_");
    }
    function Kr(t, e) {
        return s(s({}, t, !0), e, !0);
    }
    function $r(t, e) {
        t = t.toUpperCase(), Qy[t] = new Yy(e), $y[t] = e;
    }
    function Qr(t) {
        if (b(t)) {
            var e = $y[t.toUpperCase()] || {};
            return t === jy || t === Zy ? a(e) : s(a(e), a($y[Ky]), !1);
        }
        return s(a(t), a($y[Ky]), !1);
    }
    function Jr(t, e) {
        return "0000".substr(0, e - (t += "").length) + t;
    }
    function to(t) {
        switch (t) {
          case "half-year":
          case "quarter":
            return "month";

          case "week":
          case "half-week":
            return "day";

          case "half-day":
          case "quarter-day":
            return "hour";

          default:
            return t;
        }
    }
    function eo(t) {
        return t === to(t);
    }
    function no(t, e, n, i) {
        var r = rn(t), o = r[oo(n)](), a = r[ao(n)]() + 1, s = Math.floor((a - 1) / 3) + 1, l = r[so(n)](), u = r["get" + (n ? "UTC" : "") + "Day"](), h = r[lo(n)](), c = (h - 1) % 12 + 1, p = r[uo(n)](), d = r[ho(n)](), f = r[co(n)](), g = (i instanceof Yy ? i : function(t) {
            return Qy[t];
        }(i || Jy) || Qy[Ky]).getModel("time"), y = g.get("month"), v = g.get("monthAbbr"), m = g.get("dayOfWeek"), _ = g.get("dayOfWeekAbbr");
        return (e || "").replace(/{yyyy}/g, o + "").replace(/{yy}/g, Jr(o % 100 + "", 2)).replace(/{Q}/g, s + "").replace(/{MMMM}/g, y[a - 1]).replace(/{MMM}/g, v[a - 1]).replace(/{MM}/g, Jr(a, 2)).replace(/{M}/g, a + "").replace(/{dd}/g, Jr(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, m[u]).replace(/{ee}/g, _[u]).replace(/{e}/g, u + "").replace(/{HH}/g, Jr(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, Jr(c + "", 2)).replace(/{h}/g, c + "").replace(/{mm}/g, Jr(p, 2)).replace(/{m}/g, p + "").replace(/{ss}/g, Jr(d, 2)).replace(/{s}/g, d + "").replace(/{SSS}/g, Jr(f, 3)).replace(/{S}/g, f + "");
    }
    function io(t, e) {
        var n = rn(t), i = n[ao(e)]() + 1, r = n[so(e)](), o = n[lo(e)](), a = n[uo(e)](), s = n[ho(e)](), l = 0 === n[co(e)](), u = l && 0 === s, h = u && 0 === a, c = h && 0 === o, p = c && 1 === r;
        return p && 1 === i ? "year" : p ? "month" : c ? "day" : h ? "hour" : u ? "minute" : l ? "second" : "millisecond";
    }
    function ro(t, e, n) {
        var i = M(t) ? rn(t) : t;
        switch (e = e || io(t, n)) {
          case "year":
            return i[oo(n)]();

          case "half-year":
            return i[ao(n)]() >= 6 ? 1 : 0;

          case "quarter":
            return Math.floor((i[ao(n)]() + 1) / 4);

          case "month":
            return i[ao(n)]();

          case "day":
            return i[so(n)]();

          case "half-day":
            return i[lo(n)]() / 24;

          case "hour":
            return i[lo(n)]();

          case "minute":
            return i[uo(n)]();

          case "second":
            return i[ho(n)]();

          case "millisecond":
            return i[co(n)]();
        }
    }
    function oo(t) {
        return t ? "getUTCFullYear" : "getFullYear";
    }
    function ao(t) {
        return t ? "getUTCMonth" : "getMonth";
    }
    function so(t) {
        return t ? "getUTCDate" : "getDate";
    }
    function lo(t) {
        return t ? "getUTCHours" : "getHours";
    }
    function uo(t) {
        return t ? "getUTCMinutes" : "getMinutes";
    }
    function ho(t) {
        return t ? "getUTCSeconds" : "getSeconds";
    }
    function co(t) {
        return t ? "getUTCMilliseconds" : "getMilliseconds";
    }
    function po(t) {
        return t ? "setUTCFullYear" : "setFullYear";
    }
    function fo(t) {
        return t ? "setUTCMonth" : "setMonth";
    }
    function go(t) {
        return t ? "setUTCDate" : "setDate";
    }
    function yo(t) {
        return t ? "setUTCHours" : "setHours";
    }
    function vo(t) {
        return t ? "setUTCMinutes" : "setMinutes";
    }
    function mo(t) {
        return t ? "setUTCSeconds" : "setSeconds";
    }
    function _o(t) {
        return t ? "setUTCMilliseconds" : "setMilliseconds";
    }
    function xo(t) {
        if (!un(t)) return b(t) ? t : "-";
        var e = (t + "").split(".");
        return e[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (e.length > 1 ? "." + e[1] : "");
    }
    function wo(t, e) {
        return t = (t || "").toLowerCase().replace(/-(.)/g, function(t, e) {
            return e.toUpperCase();
        }), e && t && (t = t.charAt(0).toUpperCase() + t.slice(1)), t;
    }
    function bo(t, e, n) {
        function i(t) {
            return t && N(t) ? t : "-";
        }
        function r(t) {
            return !(null == t || isNaN(t) || !isFinite(t));
        }
        var o = "time" === e, a = t instanceof Date;
        if (o || a) {
            var s = o ? rn(t) : t;
            if (!isNaN(+s)) return no(s, "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss}", n);
            if (a) return "-";
        }
        if ("ordinal" === e) return S(t) ? i(t) : M(t) && r(t) ? t + "" : "-";
        var l = ln(t);
        return r(l) ? xo(l) : S(t) ? i(t) : "boolean" == typeof t ? t + "" : "-";
    }
    function So(t, e, n) {
        x(e) || (e = [ e ]);
        var i = e.length;
        if (!i) return "";
        for (var r = e[0].$vars || [], o = 0; o < r.length; o++) {
            var a = cv[o];
            t = t.replace(pv(a), pv(a, 0));
        }
        for (var s = 0; i > s; s++) for (var l = 0; l < r.length; l++) {
            var u = e[s][r[l]];
            t = t.replace(pv(cv[l], s), n ? ct(u) : u);
        }
        return t;
    }
    function Mo(t, e) {
        var n = b(t) ? {
            color: t,
            extraCssText: e
        } : t || {}, i = n.color, r = n.type;
        e = n.extraCssText;
        var o = n.renderMode || "html";
        return i ? "html" === o ? "subItem" === r ? '<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:' + ct(i) + ";" + (e || "") + '"></span>' : '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' + ct(i) + ";" + (e || "") + '"></span>' : {
            renderMode: o,
            content: "{" + (n.markerId || "markerX") + "|}  ",
            style: "subItem" === r ? {
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: i
            } : {
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: i
            }
        } : "";
    }
    function To(t, e) {
        return e = e || "transparent", b(t) ? t : T(t) && t.colorStops && (t.colorStops[0] || {}).color || e;
    }
    function Co(t, e) {
        if ("_blank" === e || "blank" === e) {
            var n = window.open();
            n.opener = null, n.location.href = t;
        } else window.open(t, e);
    }
    function Io(t, e, n, i, r) {
        var o = 0, a = 0;
        null == i && (i = 1 / 0), null == r && (r = 1 / 0);
        var s = 0;
        e.eachChild(function(l, u) {
            var h, c, p = l.getBoundingRect(), d = e.childAt(u + 1), f = d && d.getBoundingRect();
            if ("horizontal" === t) {
                var g = p.width + (f ? -f.x + p.x : 0);
                (h = o + g) > i || l.newline ? (o = 0, h = g, a += s + n, s = p.height) : s = Math.max(s, p.height);
            } else {
                var y = p.height + (f ? -f.y + p.y : 0);
                (c = a + y) > r || l.newline ? (o += s + n, a = 0, c = y, s = p.width) : s = Math.max(s, p.width);
            }
            l.newline || (l.x = o, l.y = a, l.markRedraw(), "horizontal" === t ? o = h + n : a = c + n);
        });
    }
    function ko(t, e, n) {
        n = hv(n || 0);
        var i = e.width, r = e.height, o = Ze(t.left, i), a = Ze(t.top, r), s = Ze(t.right, i), l = Ze(t.bottom, r), u = Ze(t.width, i), h = Ze(t.height, r), c = n[2] + n[0], p = n[1] + n[3], d = t.aspect;
        switch (isNaN(u) && (u = i - s - p - o), isNaN(h) && (h = r - l - c - a), null != d && (isNaN(u) && isNaN(h) && (d > i / r ? u = .8 * i : h = .8 * r), 
        isNaN(u) && (u = d * h), isNaN(h) && (h = u / d)), isNaN(o) && (o = i - s - u - p), 
        isNaN(a) && (a = r - l - h - c), t.left || t.right) {
          case "center":
            o = i / 2 - u / 2 - n[3];
            break;

          case "right":
            o = i - u - p;
        }
        switch (t.top || t.bottom) {
          case "middle":
          case "center":
            a = r / 2 - h / 2 - n[0];
            break;

          case "bottom":
            a = r - h - c;
        }
        o = o || 0, a = a || 0, isNaN(u) && (u = i - p - o - (s || 0)), isNaN(h) && (h = r - c - a - (l || 0));
        var f = new op(o + n[3], a + n[0], u, h);
        return f.margin = n, f;
    }
    function Do(t) {
        var e = t.layoutMode || t.constructor.layoutMode;
        return T(e) ? e : e ? {
            type: e
        } : null;
    }
    function Ao(t, e, n) {
        function i(n, i) {
            var a = {}, l = 0, u = {}, h = 0;
            if (dv(n, function(e) {
                u[e] = t[e];
            }), dv(n, function(t) {
                r(e, t) && (a[t] = u[t] = e[t]), o(a, t) && l++, o(u, t) && h++;
            }), s[i]) return o(e, n[1]) ? u[n[2]] = null : o(e, n[2]) && (u[n[1]] = null), u;
            if (2 !== h && l) {
                if (l >= 2) return a;
                for (var c = 0; c < n.length; c++) {
                    var p = n[c];
                    if (!r(a, p) && r(t, p)) {
                        a[p] = t[p];
                        break;
                    }
                }
                return a;
            }
            return u;
        }
        function r(t, e) {
            return t.hasOwnProperty(e);
        }
        function o(t, e) {
            return null != t[e] && "auto" !== t[e];
        }
        function a(t, e, n) {
            dv(t, function(t) {
                e[t] = n[t];
            });
        }
        var s = n && n.ignoreSize;
        !x(s) && (s = [ s, s ]);
        var l = i(gv[0], 0), u = i(gv[1], 1);
        a(gv[0], t, l), a(gv[1], t, u);
    }
    function Po(t) {
        return function(t, e) {
            return e && t && dv(fv, function(n) {
                e.hasOwnProperty(n) && (t[n] = e[n]);
            }), t;
        }({}, t);
    }
    function Lo(t, e, n) {
        function i(t, e, n) {
            for (var i = 0; n > i; i++) t.push(e + i);
        }
        function r(t) {
            var e = t.dimsDef;
            return e ? e.length : 1;
        }
        var o = {}, a = Oo(e);
        if (!a || !t) return o;
        var s, l, u = [], h = [], c = e.ecModel, p = Rv(c).datasetMap, d = a.uid + "_" + n.seriesLayoutBy;
        f(t = t.slice(), function(e, n) {
            var i = T(e) ? e : t[n] = {
                name: e
            };
            "ordinal" === i.type && null == s && (s = n, l = r(i)), o[i.name] = [];
        });
        var g = p.get(d) || p.set(d, {
            categoryWayDim: l,
            valueWayDim: 0
        });
        return f(t, function(t, e) {
            var n = t.name, a = r(t);
            if (null == s) {
                var l = g.valueWayDim;
                i(o[n], l, a), i(h, l, a), g.valueWayDim += a;
            } else if (s === e) i(o[n], 0, a), i(u, 0, a); else {
                l = g.categoryWayDim;
                i(o[n], l, a), i(h, l, a), g.categoryWayDim += a;
            }
        }), u.length && (o.itemName = u), h.length && (o.seriesName = h), o;
    }
    function Oo(t) {
        return t.get("data", !0) ? void 0 : kn(t.ecModel, "dataset", {
            index: t.get("datasetIndex", !0),
            id: t.get("datasetId", !0)
        }, Ed).models[0];
    }
    function Ro(t, e) {
        return function(t, e, n, i, r, o) {
            function a(t) {
                var e = b(t);
                return null != t && isFinite(t) && "" !== t ? e ? Ov.Might : Ov.Not : e && "-" !== t ? Ov.Must : void 0;
            }
            var s, l, u;
            if (I(t)) return Ov.Not;
            if (i) {
                var h = i[o];
                T(h) ? (l = h.name, u = h.type) : b(h) && (l = h);
            }
            if (null != u) return "ordinal" === u ? Ov.Must : Ov.Not;
            if (e === Cv) {
                var c = t;
                if (n === Lv) {
                    for (var p = c[o], d = 0; d < (p || []).length && 5 > d; d++) if (null != (s = a(p[r + d]))) return s;
                } else for (d = 0; d < c.length && 5 > d; d++) {
                    var f = c[r + d];
                    if (f && null != (s = a(f[o]))) return s;
                }
            } else if (e === Iv) {
                var g = t;
                if (!l) return Ov.Not;
                for (d = 0; d < g.length && 5 > d; d++) {
                    if ((m = g[d]) && null != (s = a(m[l]))) return s;
                }
            } else if (e === kv) {
                var y = t;
                if (!l) return Ov.Not;
                if (!(p = y[l]) || I(p)) return Ov.Not;
                for (d = 0; d < p.length && 5 > d; d++) if (null != (s = a(p[d]))) return s;
            } else if (e === Tv) {
                var v = t;
                for (d = 0; d < v.length && 5 > d; d++) {
                    var m, _ = yn(m = v[d]);
                    if (!x(_)) return Ov.Not;
                    if (null != (s = a(_[o]))) return s;
                }
            }
            return Ov.Not;
        }(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e);
    }
    function Bo(t, e, n) {
        if (x(e)) {
            var i = H();
            return f(e, function(t) {
                null != t && (null != wn(t, null) && i.set(t, !0));
            }), v(n, function(e) {
                return e && i.get(e[t]);
            });
        }
        var r = wn(e, null);
        return v(n, function(e) {
            return e && null != r && e[t] === r;
        });
    }
    function Eo(t, e) {
        return e.hasOwnProperty("subType") ? v(t, function(t) {
            return t && t.subType === e.subType;
        }) : t;
    }
    function zo(t) {
        var e = H();
        return t && f(fn(t.replaceMerge), function(t) {
            e.set(t, !0);
        }), {
            replaceMergeMainTypeMap: e
        };
    }
    function No(t, e, n) {
        var i = {
            width: e,
            height: n,
            aspectratio: e / n
        }, r = !0;
        return f(t, function(t, e) {
            var n = e.match(Kv);
            if (n && n[1] && n[2]) {
                var o = n[1], a = n[2].toLowerCase();
                (function(t, e, n) {
                    return "min" === n ? t >= e : "max" === n ? e >= t : t === e;
                })(i[a], t, o) || (r = !1);
            }
        }), r;
    }
    function Fo(t) {
        var e = t && t.itemStyle;
        if (e) for (var n = 0, i = tm.length; i > n; n++) {
            var r = tm[n], o = e.normal, a = e.emphasis;
            o && o[r] && (t[r] = t[r] || {}, t[r].normal ? s(t[r].normal, o[r]) : t[r].normal = o[r], 
            o[r] = null), a && a[r] && (t[r] = t[r] || {}, t[r].emphasis ? s(t[r].emphasis, a[r]) : t[r].emphasis = a[r], 
            a[r] = null);
        }
    }
    function Vo(t, e, n) {
        if (t && t[e] && (t[e].normal || t[e].emphasis)) {
            var i = t[e].normal, r = t[e].emphasis;
            i && (n ? (t[e].normal = t[e].emphasis = null, u(t[e], i)) : t[e] = i), r && (t.emphasis = t.emphasis || {}, 
            t.emphasis[e] = r, r.focus && (t.emphasis.focus = r.focus), r.blurScope && (t.emphasis.blurScope = r.blurScope));
        }
    }
    function Ho(t) {
        Vo(t, "itemStyle"), Vo(t, "lineStyle"), Vo(t, "areaStyle"), Vo(t, "label"), Vo(t, "labelLine"), 
        Vo(t, "upperLabel"), Vo(t, "edgeLabel");
    }
    function Wo(t, e) {
        var n = Jv(t) && t[e], i = Jv(n) && n.textStyle;
        if (i) for (var r = 0, o = Rd.length; o > r; r++) {
            var a = Rd[r];
            i.hasOwnProperty(a) && (n[a] = i[a]);
        }
    }
    function Go(t) {
        t && (Ho(t), Wo(t, "label"), t.emphasis && Wo(t.emphasis, "label"));
    }
    function Uo(t) {
        return x(t) ? t : t ? [ t ] : [];
    }
    function Xo(t) {
        return (x(t) ? t[0] : t) || {};
    }
    function Yo(t, e) {
        Qv(Uo(t.series), function(t) {
            Jv(t) && function(t) {
                if (Jv(t)) {
                    Fo(t), Ho(t), Wo(t, "label"), Wo(t, "upperLabel"), Wo(t, "edgeLabel"), t.emphasis && (Wo(t.emphasis, "label"), 
                    Wo(t.emphasis, "upperLabel"), Wo(t.emphasis, "edgeLabel"));
                    var e = t.markPoint;
                    e && (Fo(e), Go(e));
                    var n = t.markLine;
                    n && (Fo(n), Go(n));
                    var i = t.markArea;
                    i && Go(i);
                    var r = t.data;
                    if ("graph" === t.type) {
                        r = r || t.nodes;
                        var o = t.links || t.edges;
                        if (o && !I(o)) for (var a = 0; a < o.length; a++) Go(o[a]);
                        f(t.categories, function(t) {
                            Ho(t);
                        });
                    }
                    if (r && !I(r)) for (a = 0; a < r.length; a++) Go(r[a]);
                    if ((e = t.markPoint) && e.data) {
                        var s = e.data;
                        for (a = 0; a < s.length; a++) Go(s[a]);
                    }
                    if ((n = t.markLine) && n.data) {
                        var l = n.data;
                        for (a = 0; a < l.length; a++) x(l[a]) ? (Go(l[a][0]), Go(l[a][1])) : Go(l[a]);
                    }
                    "gauge" === t.type ? (Wo(t, "axisLabel"), Wo(t, "title"), Wo(t, "detail")) : "treemap" === t.type ? (Vo(t.breadcrumb, "itemStyle"), 
                    f(t.levels, function(t) {
                        Ho(t);
                    })) : "tree" === t.type && Ho(t.leaves);
                }
            }(t);
        });
        var n = [ "xAxis", "yAxis", "radiusAxis", "angleAxis", "singleAxis", "parallelAxis", "radar" ];
        e && n.push("valueAxis", "categoryAxis", "logAxis", "timeAxis"), Qv(n, function(e) {
            Qv(Uo(t[e]), function(t) {
                t && (Wo(t, "axisLabel"), Wo(t.axisPointer, "label"));
            });
        }), Qv(Uo(t.parallel), function(t) {
            var e = t && t.parallelAxisDefault;
            Wo(e, "axisLabel"), Wo(e && e.axisPointer, "label");
        }), Qv(Uo(t.calendar), function(t) {
            Vo(t, "itemStyle"), Wo(t, "dayLabel"), Wo(t, "monthLabel"), Wo(t, "yearLabel");
        }), Qv(Uo(t.radar), function(t) {
            Wo(t, "name"), t.name && null == t.axisName && (t.axisName = t.name, delete t.name), 
            null != t.nameGap && null == t.axisNameGap && (t.axisNameGap = t.nameGap, delete t.nameGap);
        }), Qv(Uo(t.geo), function(t) {
            Jv(t) && (Go(t), Qv(Uo(t.regions), function(t) {
                Go(t);
            }));
        }), Qv(Uo(t.timeline), function(t) {
            Go(t), Vo(t, "label"), Vo(t, "itemStyle"), Vo(t, "controlStyle", !0);
            var e = t.data;
            x(e) && f(e, function(t) {
                T(t) && (Vo(t, "label"), Vo(t, "itemStyle"));
            });
        }), Qv(Uo(t.toolbox), function(t) {
            Vo(t, "iconStyle"), Qv(t.feature, function(t) {
                Vo(t, "iconStyle");
            });
        }), Wo(Xo(t.axisPointer), "label"), Wo(Xo(t.tooltip).axisPointer, "label");
    }
    function qo(t) {
        t && f(em, function(e) {
            e[0] in t && !(e[1] in t) && (t[e[1]] = t[e[0]]);
        });
    }
    function jo(t) {
        var e = t && t.itemStyle;
        if (e) for (var n = 0; n < im.length; n++) {
            var i = im[n][1], r = im[n][0];
            null != e[i] && (e[r] = e[i]);
        }
    }
    function Zo(t) {
        t && "edge" === t.alignTo && null != t.margin && null == t.edgeDistance && (t.edgeDistance = t.margin);
    }
    function Ko(t) {
        t && t.downplay && !t.blur && (t.blur = t.downplay);
    }
    function $o(e, n) {
        Yo(e, n), e.series = fn(e.series), f(e.series, function(e) {
            if (T(e)) {
                var n = e.type;
                if ("line" === n) null != e.clipOverflow && (e.clip = e.clipOverflow); else if ("pie" === n || "gauge" === n) {
                    if (null != e.clockWise && (e.clockwise = e.clockWise), Zo(e.label), (o = e.data) && !I(o)) for (var i = 0; i < o.length; i++) Zo(o[i]);
                    null != e.hoverOffset && (e.emphasis = e.emphasis || {}, (e.emphasis.scaleSize = null) && (e.emphasis.scaleSize = e.hoverOffset));
                } else if ("gauge" === n) {
                    var r = function(t, e) {
                        for (var n = e.split(","), i = t, r = 0; r < n.length && null != (i = i && i[n[r]]); r++) ;
                        return i;
                    }(e, "pointer.color");
                    null != r && function(t, e, n, i) {
                        for (var r, o = e.split(","), a = t, s = 0; s < o.length - 1; s++) null == a[r = o[s]] && (a[r] = {}), 
                        a = a[r];
                        (i || null == a[o[s]]) && (a[o[s]] = n);
                    }(e, "itemStyle.color", r);
                } else if ("bar" === n) {
                    var o;
                    if (jo(e), jo(e.backgroundStyle), jo(e.emphasis), (o = e.data) && !I(o)) for (i = 0; i < o.length; i++) "object" == t(o[i]) && (jo(o[i]), 
                    jo(o[i] && o[i].emphasis));
                } else if ("sunburst" === n) {
                    var a = e.highlightPolicy;
                    a && (e.emphasis = e.emphasis || {}, e.emphasis.focus || (e.emphasis.focus = a)), 
                    Ko(e), function t(e, n) {
                        if (e) for (var i = 0; i < e.length; i++) n(e[i]), e[i] && t(e[i].children, n);
                    }(e.data, Ko);
                } else "graph" === n || "sankey" === n ? function(t) {
                    t && null != t.focusNodeAdjacency && (t.emphasis = t.emphasis || {}, null == t.emphasis.focus && (t.emphasis.focus = "adjacency"));
                }(e) : "map" === n && (e.mapType && !e.map && (e.map = e.mapType), e.mapLocation && u(e, e.mapLocation));
                null != e.hoverAnimation && (e.emphasis = e.emphasis || {}, e.emphasis && null == e.emphasis.scale && (e.emphasis.scale = e.hoverAnimation)), 
                qo(e);
            }
        }), e.dataRange && (e.visualMap = e.dataRange), f(nm, function(t) {
            var n = e[t];
            n && (x(n) || (n = [ n ]), f(n, function(t) {
                qo(t);
            }));
        });
    }
    function Qo(t) {
        f(t, function(e, n) {
            var i = [], r = [ NaN, NaN ], o = [ e.stackResultDimension, e.stackedOverDimension ], a = e.data, s = e.isStackedByIndex, l = e.seriesModel.get("stackStrategy") || "samesign";
            a.modify(o, function(o, u, h) {
                var c, p, d = a.get(e.stackedDimension, h);
                if (isNaN(d)) return r;
                s ? p = a.getRawIndex(h) : c = a.get(e.stackedByDimension, h);
                for (var f = NaN, g = n - 1; g >= 0; g--) {
                    var y = t[g];
                    if (s || (p = y.data.rawIndexOf(y.stackedByDimension, c)), p >= 0) {
                        var v = y.data.getByRawIndex(y.stackResultDimension, p);
                        if ("all" === l || "positive" === l && v > 0 || "negative" === l && 0 > v || "samesign" === l && d >= 0 && v > 0 || "samesign" === l && 0 >= d && 0 > v) {
                            d = tn(d, v), f = v;
                            break;
                        }
                    }
                }
                return i[0] = d, i[1] = f, i;
            });
        });
    }
    function Jo(t) {
        return t instanceof rm;
    }
    function ta(t, e, n) {
        n = n || ia(t);
        var i = e.seriesLayoutBy, r = function(t, e, n, i, r) {
            var o, a;
            if (!t) return {
                dimensionsDefine: ra(r),
                startIndex: a,
                dimensionsDetectedCount: o
            };
            if (e === Cv) {
                var s = t;
                "auto" === i || null == i ? oa(function(t) {
                    null != t && "-" !== t && (b(t) ? null == a && (a = 1) : a = 0);
                }, n, s, 10) : a = M(i) ? i : i ? 1 : 0, r || 1 !== a || (r = [], oa(function(t, e) {
                    r[e] = null != t ? t + "" : "";
                }, n, s, 1 / 0)), o = r ? r.length : n === Lv ? s.length : s[0] ? s[0].length : null;
            } else if (e === Iv) r || (r = function(t) {
                for (var e, n = 0; n < t.length && !(e = t[n++]); ) ;
                return e ? m(e) : void 0;
            }(t)); else if (e === kv) r || (r = [], f(t, function(t, e) {
                r.push(e);
            })); else if (e === Tv) {
                var l = yn(t[0]);
                o = x(l) && l.length || 1;
            }
            return {
                startIndex: a,
                dimensionsDefine: ra(r),
                dimensionsDetectedCount: o
            };
        }(t, n, i, e.sourceHeader, e.dimensions);
        return new rm({
            data: t,
            sourceFormat: n,
            seriesLayoutBy: i,
            dimensionsDefine: r.dimensionsDefine,
            startIndex: r.startIndex,
            dimensionsDetectedCount: r.dimensionsDetectedCount,
            metaRawOption: a(e)
        });
    }
    function ea(t) {
        return new rm({
            data: t,
            sourceFormat: I(t) ? Dv : Tv
        });
    }
    function na(t) {
        return new rm({
            data: t.data,
            sourceFormat: t.sourceFormat,
            seriesLayoutBy: t.seriesLayoutBy,
            dimensionsDefine: a(t.dimensionsDefine),
            startIndex: t.startIndex,
            dimensionsDetectedCount: t.dimensionsDetectedCount
        });
    }
    function ia(t) {
        var e = Av;
        if (I(t)) e = Dv; else if (x(t)) {
            0 === t.length && (e = Cv);
            for (var n = 0, i = t.length; i > n; n++) {
                var r = t[n];
                if (null != r) {
                    if (x(r)) {
                        e = Cv;
                        break;
                    }
                    if (T(r)) {
                        e = Iv;
                        break;
                    }
                }
            }
        } else if (T(t)) for (var o in t) if (X(t, o) && d(t[o])) {
            e = kv;
            break;
        }
        return e;
    }
    function ra(t) {
        if (t) {
            var e = H();
            return g(t, function(t) {
                var n = {
                    name: (t = T(t) ? t : {
                        name: t
                    }).name,
                    displayName: t.displayName,
                    type: t.type
                };
                if (null == n.name) return n;
                n.name += "", null == n.displayName && (n.displayName = n.name);
                var i = e.get(n.name);
                return i ? n.name += "-" + i.count++ : e.set(n.name, {
                    count: 1
                }), n;
            });
        }
    }
    function oa(t, e, n, i) {
        if (e === Lv) for (var r = 0; r < n.length && i > r; r++) t(n[r] ? n[r][0] : null, r); else {
            var o = n[0] || [];
            for (r = 0; r < o.length && i > r; r++) t(o[r], r);
        }
    }
    function aa(t) {
        var e = t.sourceFormat;
        return e === Iv || e === kv;
    }
    function sa(t, e) {
        return sm[ha(t, e)];
    }
    function la(t, e) {
        return um[ha(t, e)];
    }
    function ua(t) {
        return cm[t];
    }
    function ha(t, e) {
        return t === Cv ? t + "_" + e : t;
    }
    function ca(t, e, n) {
        if (t) {
            var i = t.getRawDataItem(e);
            if (null != i) {
                var r = t.getStore(), o = r.getSource().sourceFormat;
                if (null != n) {
                    var a = t.getDimensionIndex(n), s = r.getDimensionProperty(a);
                    return ua(o)(i, a, s);
                }
                var l = i;
                return o === Tv && (l = yn(i)), l;
            }
        }
    }
    function pa(t) {
        var e, n;
        return T(t) ? t.type && (n = t) : e = t, {
            text: e,
            frag: n
        };
    }
    function da(t) {
        return new fm(t);
    }
    function fa(t, e) {
        var n = e && e.type;
        return "ordinal" === n ? t : ("time" !== n || M(t) || null == t || "-" === t || (t = +rn(t)), 
        null == t || "" === t ? NaN : +t);
    }
    function ga(t) {
        if (!xa(t.sourceFormat)) {
            pn("");
        }
        return t.data;
    }
    function ya(t) {
        var e = t.sourceFormat, n = t.data;
        if (!xa(e)) {
            pn("");
        }
        if (e === Cv) {
            for (var i = [], r = 0, o = n.length; o > r; r++) i.push(n[r].slice());
            return i;
        }
        if (e === Iv) {
            for (i = [], r = 0, o = n.length; o > r; r++) i.push(l({}, n[r]));
            return i;
        }
    }
    function va(t, e, n) {
        return null != n ? M(n) || !isNaN(n) && !X(e, n) ? t[n] : X(e, n) ? e[n] : void 0 : void 0;
    }
    function ma(t) {
        return a(t);
    }
    function _a(t, e) {
        e.length || pn(""), T(t) || pn("");
        var n = t.type, i = _m.get(n);
        i || pn("");
        var r = g(e, function(t) {
            return function(t, e) {
                var n = new mm(), i = t.data, r = n.sourceFormat = t.sourceFormat, o = t.startIndex;
                t.seriesLayoutBy !== Pv && pn("");
                var a = [], s = {}, l = t.dimensionsDefine;
                if (l) f(l, function(t, e) {
                    var n = t.name, i = {
                        index: e,
                        name: n,
                        displayName: t.displayName
                    };
                    if (a.push(i), null != n) {
                        X(s, n) && pn(""), s[n] = i;
                    }
                }); else for (var u = 0; u < t.dimensionsDetectedCount; u++) a.push({
                    index: u
                });
                var h = sa(r, Pv);
                e.__isBuiltIn && (n.getRawDataItem = function(t) {
                    return h(i, o, a, t);
                }, n.getRawData = Sc(ga, null, t)), n.cloneRawData = Sc(ya, null, t);
                var c = la(r, Pv);
                n.count = Sc(c, null, i, o, a);
                var p = ua(r);
                n.retrieveValue = function(t, e) {
                    var n = h(i, o, a, t);
                    return d(n, e);
                };
                var d = n.retrieveValueFromItem = function(t, e) {
                    if (null != t) {
                        var n = a[e];
                        return n ? p(t, e, n.name) : void 0;
                    }
                };
                return n.getDimensionInfo = Sc(va, null, a, s), n.cloneAllDimensionInfo = Sc(ma, null, a), 
                n;
            }(t, i);
        });
        return g(fn(i.transform({
            upstream: r[0],
            upstreamList: r,
            config: a(t.config)
        })), function(t, n) {
            T(t) || pn(""), t.data || pn(""), xa(ia(t.data)) || pn("");
            var i, r = e[0];
            if (r && 0 === n && !t.dimensions) {
                var o = r.startIndex;
                o && (t.data = r.data.slice(0, o).concat(t.data)), i = {
                    seriesLayoutBy: Pv,
                    sourceHeader: o,
                    dimensions: r.metaRawOption.dimensions
                };
            } else i = {
                seriesLayoutBy: Pv,
                sourceHeader: 0,
                dimensions: t.dimensions
            };
            return ta(t.data, i, null);
        });
    }
    function xa(t) {
        return t === Cv || t === Iv;
    }
    function wa(t) {
        return t > 65535 ? wm : bm;
    }
    function ba(t) {
        var e = t.constructor;
        return e === Array ? t.slice() : new e(t);
    }
    function Sa(t, e, n, i, r) {
        var o = Tm[n || "float"];
        if (r) {
            var a = t[e], s = a && a.length;
            if (s !== i) {
                for (var l = new o(i), u = 0; s > u; u++) l[u] = a[u];
                t[e] = l;
            }
        } else t[e] = new o(i);
    }
    function Ma(t) {
        t.option.transform && F(t.option.transform);
    }
    function Ta(t) {
        return "series" === t.mainType;
    }
    function Ca(t) {
        throw new Error(t);
    }
    function Ia(t, e) {
        var n = t.color || "#6e7079", i = t.fontSize || 12, r = t.fontWeight || "400", o = t.color || "#464646", a = t.fontSize || 14, s = t.fontWeight || "900";
        return "html" === e ? {
            nameStyle: "font-size:" + ct(i + "") + "px;color:" + ct(n) + ";font-weight:" + ct(r + ""),
            valueStyle: "font-size:" + ct(a + "") + "px;color:" + ct(o) + ";font-weight:" + ct(s + "")
        } : {
            nameStyle: {
                fontSize: i,
                fill: n,
                fontWeight: r
            },
            valueStyle: {
                fontSize: a,
                fill: o,
                fontWeight: s
            }
        };
    }
    function ka(t, e) {
        return e.type = t, e;
    }
    function Da(t) {
        return "section" === t.type;
    }
    function Aa(t) {
        return Da(t) ? Pa : La;
    }
    function Pa(t, e, n, i) {
        var r = e.noHeader, o = function(t) {
            return {
                html: Dm[t],
                richText: Am[t]
            };
        }(function t(e) {
            if (Da(e)) {
                var n = 0, i = e.blocks.length, r = i > 1 || i > 0 && !e.noHeader;
                return f(e.blocks, function(e) {
                    var i = t(e);
                    i >= n && (n = i + +(r && (!i || Da(e) && !e.noHeader)));
                }), n;
            }
            return 0;
        }(e)), a = [], s = e.blocks || [];
        z(!s || x(s)), s = s || [];
        var u = t.orderMode;
        if (e.sortBlocks && u) {
            s = s.slice();
            var h = {
                valueAsc: "asc",
                valueDesc: "desc"
            };
            if (X(h, u)) {
                var c = new vm(h[u], null);
                s.sort(function(t, e) {
                    return c.evaluate(t.sortParam, e.sortParam);
                });
            } else "seriesDesc" === u && s.reverse();
        }
        f(s, function(n, r) {
            var s = e.valueFormatter, u = Aa(n)(s ? l(l({}, t), {
                valueFormatter: s
            }) : t, n, r > 0 ? o.html : 0, i);
            null != u && a.push(u);
        });
        var p = "richText" === t.renderMode ? a.join(o.richText) : Ra(a.join(""), r ? n : o.html);
        if (r) return p;
        var d = bo(e.header, "ordinal", t.useUTC), g = Ia(i, t.renderMode).nameStyle;
        return "richText" === t.renderMode ? Ba(t, d, g) + o.richText + p : Ra('<div style="' + g + ";" + km + ';">' + ct(d) + "</div>" + p, n);
    }
    function La(t, e, n, i) {
        var r = t.renderMode, o = e.noName, a = e.noValue, s = !e.markerType, l = e.name, u = t.useUTC, h = e.valueFormatter || t.valueFormatter || function(t) {
            return g(t = x(t) ? t : [ t ], function(t, e) {
                return bo(t, x(d) ? d[e] : d, u);
            });
        };
        if (!o || !a) {
            var c = s ? "" : t.markupStyleCreator.makeTooltipMarker(e.markerType, e.markerColor || "#333", r), p = o ? "" : bo(l, "ordinal", u), d = e.valueType, f = a ? [] : h(e.value), y = !s || !o, v = !s && o, m = Ia(i, r), _ = m.nameStyle, w = m.valueStyle;
            return "richText" === r ? (s ? "" : c) + (o ? "" : Ba(t, p, _)) + (a ? "" : function(t, e, n, i, r) {
                var o = [ r ], a = i ? 10 : 20;
                return n && o.push({
                    padding: [ 0, 0, 0, a ],
                    align: "right"
                }), t.markupStyleCreator.wrapRichTextStyle(x(e) ? e.join("  ") : e, o);
            }(t, f, y, v, w)) : Ra((s ? "" : c) + (o ? "" : function(t, e, n) {
                return '<span style="' + n + ";" + (e ? "margin-left:2px" : "") + '">' + ct(t) + "</span>";
            }(p, !s, _)) + (a ? "" : function(t, e, n, i) {
                var r = n ? "10px" : "20px", o = e ? "float:right;margin-left:" + r : "";
                return t = x(t) ? t : [ t ], '<span style="' + o + ";" + i + '">' + g(t, function(t) {
                    return ct(t);
                }).join("&nbsp;&nbsp;") + "</span>";
            }(f, y, v, w)), n);
        }
    }
    function Oa(t, e, n, i, r, o) {
        if (t) return Aa(t)({
            useUTC: r,
            renderMode: n,
            orderMode: i,
            markupStyleCreator: e,
            valueFormatter: t.valueFormatter
        }, t, 0, o);
    }
    function Ra(t, e) {
        return '<div style="' + ("margin: " + e + "px 0 0") + ";" + km + ';">' + t + '<div style="clear:both"></div></div>';
    }
    function Ba(t, e, n) {
        return t.markupStyleCreator.wrapRichTextStyle(e, n);
    }
    function Ea(t, e) {
        var n = t.get("padding");
        return null != n ? n : "richText" === e ? [ 8, 10 ] : 10;
    }
    function za(t) {
        var e, n, i, r, o = t.series, a = t.dataIndex, s = t.multipleSeries, l = o.getData(), u = l.mapDimensionsAll("defaultedTooltip"), h = u.length, c = o.getRawValue(a), p = x(c), d = function(t, e) {
            return To(t.getData().getItemVisual(e, "style")[t.visualDrawType]);
        }(o, a);
        if (h > 1 || p && !h) {
            var f = Na(c, o, a, u, d);
            e = f.inlineValues, n = f.inlineValueTypes, i = f.blocks, r = f.inlineValues[0];
        } else if (h) {
            var g = l.getDimensionInfo(u[0]);
            r = e = ca(l, a, u[0]), n = g.type;
        } else r = e = p ? c[0] : c;
        var y = bn(o), v = y && o.name || "", m = l.getName(a), _ = s ? v : m;
        return ka("section", {
            header: v,
            noHeader: s || !y,
            sortParam: r,
            blocks: [ ka("nameValue", {
                markerType: "item",
                markerColor: d,
                name: _,
                noName: !N(_),
                value: e,
                valueType: n
            }) ].concat(i || [])
        });
    }
    function Na(t, e, n, i, r) {
        function o(t, e) {
            var n = a.getDimensionInfo(e);
            n && !1 !== n.otherDims.tooltip && (s ? h.push(ka("nameValue", {
                markerType: "subItem",
                markerColor: r,
                name: n.displayName,
                value: t,
                valueType: n.type
            })) : (l.push(t), u.push(n.type)));
        }
        var a = e.getData(), s = y(t, function(t, e, n) {
            var i = a.getDimensionInfo(n);
            return t || i && !1 !== i.tooltip && null != i.displayName;
        }, !1), l = [], u = [], h = [];
        return i.length ? f(i, function(t) {
            o(ca(a, n, t), t);
        }) : f(t, o), {
            inlineValues: l,
            inlineValueTypes: u,
            blocks: h
        };
    }
    function Fa(t, e) {
        return t.getName(e) || t.getId(e);
    }
    function Va(t) {
        var e = t.name;
        bn(t) || (t.name = function(t) {
            var e = t.getRawData(), n = e.mapDimensionsAll("seriesName"), i = [];
            return f(n, function(t) {
                var n = e.getDimensionInfo(t);
                n.displayName && i.push(n.displayName);
            }), i.join(" ");
        }(t) || e);
    }
    function Ha(t) {
        return t.model.getRawData().count();
    }
    function Wa(t) {
        var e = t.model;
        return e.setData(e.getRawData().cloneShallow()), Ga;
    }
    function Ga(t, e) {
        e.outputData && t.end > e.outputData.count() && e.model.getRawData().cloneShallow(e.outputData);
    }
    function Ua(t, e) {
        f(W(t.CHANGABLE_METHODS, t.DOWNSAMPLE_METHODS), function(n) {
            t.wrapMethod(n, _(Xa, e));
        });
    }
    function Xa(t, e) {
        var n = Ya(t);
        return n && n.setOutputEnd((e || this).count()), e;
    }
    function Ya(t) {
        var e = (t.ecModel || {}).scheduler, n = e && e.getPipeline(t.uid);
        if (n) {
            var i = n.currentTask;
            if (i) {
                var r = i.agentStubMap;
                r && (i = r.get(t.uid));
            }
            return i;
        }
    }
    function qa() {
        var t = Tn();
        return function(e) {
            var n = t(e), i = e.pipelineContext, r = !!n.large, o = !!n.progressiveRender, a = n.large = !(!i || !i.large), s = n.progressiveRender = !(!i || !i.progressiveRender);
            return !(r === a && o === s) && "reset";
        };
    }
    function ja(t, e, n) {
        t && Ji(t) && ("emphasis" === e ? zi : Ni)(t, n);
    }
    function Za(t, e, n) {
        var i = Mn(t, e), r = e && null != e.highlightKey ? function(t) {
            var e = ag[t];
            return null == e && 32 >= og && (e = ag[t] = og++), e;
        }(e.highlightKey) : null;
        null != i ? f(fn(i), function(e) {
            ja(t.getItemGraphicEl(e), n, r);
        }) : t.eachItemGraphicEl(function(t) {
            ja(t, n, r);
        });
    }
    function Ka(t) {
        return Em(t.model);
    }
    function $a(t) {
        var e = t.model, n = t.ecModel, i = t.api, r = t.payload, o = e.pipelineContext.progressiveRender, a = t.view, s = r && Bm(r).updateMethod, l = o ? "incrementalPrepareRender" : s && a[s] ? s : "render";
        return "render" !== l && a[l](e, n, i, r), Fm[l];
    }
    function Qa(t, e, n) {
        function i() {
            h = new Date().getTime(), c = null, t.apply(a, s || []);
        }
        var r, o, a, s, l, u = 0, h = 0, c = null;
        e = e || 0;
        var p = function() {
            for (var t = [], p = 0; p < arguments.length; p++) t[p] = arguments[p];
            r = new Date().getTime(), a = this, s = t;
            var d = l || e, f = l || n;
            l = null, o = r - (f ? u : h) - d, clearTimeout(c), f ? c = setTimeout(i, d) : o >= 0 ? i() : c = setTimeout(i, -o), 
            u = r;
        };
        return p.clear = function() {
            c && (clearTimeout(c), c = null);
        }, p.debounceNextCall = function(t) {
            l = t;
        }, p;
    }
    function Ja(t, e, n, i) {
        var r = t[e];
        if (r) {
            var o = r[Vm] || r, a = r[Wm];
            if (r[Hm] !== n || a !== i) {
                if (null == n || !i) return t[e] = o;
                (r = t[e] = Qa(o, n, "debounce" === i))[Vm] = o, r[Wm] = i, r[Hm] = n;
            }
            return r;
        }
    }
    function ts(t, e) {
        var n = t[e];
        n && n[Vm] && (n.clear && n.clear(), t[e] = n[Vm]);
    }
    function es(t, e) {
        var n = t.visualStyleMapper || Um[e];
        return n || (console.warn("Unknown style type '" + e + "'."), Um.itemStyle);
    }
    function ns(t, e) {
        var n = t.visualDrawType || Xm[e];
        return n || (console.warn("Unknown style type '" + e + "'."), "fill");
    }
    function is(t) {
        t.overallReset(t.ecModel, t.api, t.payload);
    }
    function rs(t) {
        return t.overallProgress && os;
    }
    function os() {
        this.agent.dirty(), this.getDownstream().dirty();
    }
    function as() {
        this.agent && this.agent.dirty();
    }
    function ss(t) {
        return t.plan ? t.plan(t.model, t.ecModel, t.api, t.payload) : null;
    }
    function ls(t) {
        t.useClearVisual && t.data.clearAllVisual();
        var e = t.resetDefines = fn(t.reset(t.model, t.ecModel, t.api, t.payload));
        return e.length > 1 ? g(e, function(t, e) {
            return us(e);
        }) : Qm;
    }
    function us(t) {
        return function(e, n) {
            var i = n.data, r = n.resetDefines[t];
            if (r && r.dataEach) for (var o = e.start; o < e.end; o++) r.dataEach(i, o); else r && r.progress && r.progress(e, i);
        };
    }
    function hs(t) {
        return t.data.count();
    }
    function cs(t) {
        Nm = null;
        try {
            t(Jm, t_);
        } catch (t) {}
        return Nm;
    }
    function ps(t, e) {
        for (var n in e.prototype) t[n] = Y;
    }
    function ds(t, e, n, i, r) {
        var o = t + e;
        n.isSilent(o) || i.eachComponent({
            mainType: "series",
            subType: "pie"
        }, function(t) {
            for (var e = t.seriesIndex, i = t.option.selectedMap, a = r.selected, s = 0; s < a.length; s++) if (a[s].seriesIndex === e) {
                var u = t.getData(), h = Mn(u, r.fromActionPayload);
                n.trigger(o, {
                    type: o,
                    seriesId: t.id,
                    name: u.getName(x(h) ? h[0] : h),
                    selected: b(i) ? i : l({}, i)
                });
            }
        });
    }
    function fs(t, e, n) {
        for (var i; t && (!e(t) || (i = t, !n)); ) t = t.__hostTarget || t.parent;
        return i;
    }
    function gs(t, e) {
        if ("image" !== this.type) {
            var n = this.style;
            this.__isEmptyBrush ? (n.stroke = t, n.fill = e || "#fff", n.lineWidth = 2) : "line" === this.shape.symbolType ? n.stroke = t : n.fill = t, 
            this.markRedraw();
        }
    }
    function ys(t, e, n, i, r, o, a) {
        var s, l = 0 === t.indexOf("empty");
        return l && (t = t.substr(5, 1).toLowerCase() + t.substr(6)), (s = 0 === t.indexOf("image://") ? Tr(t.slice(8), new op(e, n, i, r), a ? "center" : "cover") : 0 === t.indexOf("path://") ? Mr(t.slice(7), {}, new op(e, n, i, r), a ? "center" : "cover") : new b_({
            shape: {
                symbolType: t,
                x: e,
                y: n,
                width: i,
                height: r
            }
        })).__isEmptyBrush = l, s.setColor = gs, o && s.setColor(o), s;
    }
    function vs(t) {
        return isFinite(t);
    }
    function ms(t, e, n) {
        for (var i = "radial" === e.type ? function(t, e, n) {
            var i = n.width, r = n.height, o = Math.min(i, r), a = null == e.x ? .5 : e.x, s = null == e.y ? .5 : e.y, l = null == e.r ? .5 : e.r;
            return e.global || (a = a * i + n.x, s = s * r + n.y, l *= o), a = vs(a) ? a : .5, 
            s = vs(s) ? s : .5, l = l >= 0 && vs(l) ? l : .5, t.createRadialGradient(a, s, 0, a, s, l);
        }(t, e, n) : function(t, e, n) {
            var i = null == e.x ? 0 : e.x, r = null == e.x2 ? 1 : e.x2, o = null == e.y ? 0 : e.y, a = null == e.y2 ? 0 : e.y2;
            return e.global || (i = i * n.width + n.x, r = r * n.width + n.x, o = o * n.height + n.y, 
            a = a * n.height + n.y), i = vs(i) ? i : 0, r = vs(r) ? r : 1, o = vs(o) ? o : 0, 
            a = vs(a) ? a : 0, t.createLinearGradient(i, o, r, a);
        }(t, e, n), r = e.colorStops, o = 0; o < r.length; o++) i.addColorStop(r[o].offset, r[o].color);
        return i;
    }
    function _s(t) {
        return parseInt(t, 10);
    }
    function xs(t, e, n) {
        var i = [ "width", "height" ][e], r = [ "clientWidth", "clientHeight" ][e], o = [ "paddingLeft", "paddingTop" ][e], a = [ "paddingRight", "paddingBottom" ][e];
        if (null != n[i] && "auto" !== n[i]) return parseFloat(n[i]);
        var s = document.defaultView.getComputedStyle(t);
        return (t[r] || _s(s[i]) || _s(t.style[i])) - (_s(s[o]) || 0) - (_s(s[a]) || 0) | 0;
    }
    function ws(t) {
        var e = t.style, n = e.lineDash && e.lineWidth > 0 && function(t, e) {
            return t && "solid" !== t && e > 0 ? "dashed" === t ? [ 4 * e, 2 * e ] : "dotted" === t ? [ e ] : M(t) ? [ t ] : x(t) ? t : null : null;
        }(e.lineDash, e.lineWidth), i = e.lineDashOffset;
        if (n) {
            var r = e.strokeNoScale && t.getLineScale ? t.getLineScale() : 1;
            r && 1 !== r && (n = g(n, function(t) {
                return t / r;
            }), i /= r);
        }
        return [ n, i ];
    }
    function bs(t) {
        var e = t.stroke;
        return !(null == e || "none" === e || !(t.lineWidth > 0));
    }
    function Ss(t) {
        return "string" == typeof t && "none" !== t;
    }
    function Ms(t) {
        var e = t.fill;
        return null != e && "none" !== e;
    }
    function Ts(t, e) {
        if (null != e.fillOpacity && 1 !== e.fillOpacity) {
            var n = t.globalAlpha;
            t.globalAlpha = e.fillOpacity * e.opacity, t.fill(), t.globalAlpha = n;
        } else t.fill();
    }
    function Cs(t, e) {
        if (null != e.strokeOpacity && 1 !== e.strokeOpacity) {
            var n = t.globalAlpha;
            t.globalAlpha = e.strokeOpacity * e.opacity, t.stroke(), t.globalAlpha = n;
        } else t.stroke();
    }
    function Is(t, e, n) {
        var i = Nn(e.image, e.__image, n);
        if (Vn(i)) {
            var r = t.createPattern(i, e.repeat || "repeat");
            if ("function" == typeof DOMMatrix && r && r.setTransform) {
                var o = new DOMMatrix();
                o.translateSelf(e.x || 0, e.y || 0), o.rotateSelf(0, 0, (e.rotation || 0) * kc), 
                o.scaleSelf(e.scaleX || 1, e.scaleY || 1), r.setTransform(o);
            }
            return r;
        }
    }
    function ks(t, e, n, i, r) {
        var o = !1;
        if (!i && e === (n = n || {})) return !1;
        if (i || e.opacity !== n.opacity) {
            Ps(t, r), o = !0;
            var a = Math.max(Math.min(e.opacity, 1), 0);
            t.globalAlpha = isNaN(a) ? Kd.opacity : a;
        }
        (i || e.blend !== n.blend) && (o || (Ps(t, r), o = !0), t.globalCompositeOperation = e.blend || Kd.blend);
        for (var s = 0; s < M_.length; s++) {
            var l = M_[s];
            (i || e[l] !== n[l]) && (o || (Ps(t, r), o = !0), t[l] = t.dpr * (e[l] || 0));
        }
        return (i || e.shadowColor !== n.shadowColor) && (o || (Ps(t, r), o = !0), t.shadowColor = e.shadowColor || Kd.shadowColor), 
        o;
    }
    function Ds(t, e, n, i, r) {
        var o = Ls(e, r.inHover), a = i ? null : n && Ls(n, r.inHover) || {};
        if (o === a) return !1;
        var s = ks(t, o, a, i, r);
        if ((i || o.fill !== a.fill) && (s || (Ps(t, r), s = !0), Ss(o.fill) && (t.fillStyle = o.fill)), 
        (i || o.stroke !== a.stroke) && (s || (Ps(t, r), s = !0), Ss(o.stroke) && (t.strokeStyle = o.stroke)), 
        (i || o.opacity !== a.opacity) && (s || (Ps(t, r), s = !0), t.globalAlpha = null == o.opacity ? 1 : o.opacity), 
        e.hasStroke()) {
            var l = o.lineWidth / (o.strokeNoScale && e.getLineScale ? e.getLineScale() : 1);
            t.lineWidth !== l && (s || (Ps(t, r), s = !0), t.lineWidth = l);
        }
        for (var u = 0; u < T_.length; u++) {
            var h = T_[u], c = h[0];
            (i || o[c] !== a[c]) && (s || (Ps(t, r), s = !0), t[c] = o[c] || h[1]);
        }
        return s;
    }
    function As(t, e) {
        var n = e.transform, i = t.dpr || 1;
        n ? t.setTransform(i * n[0], i * n[1], i * n[2], i * n[3], i * n[4], i * n[5]) : t.setTransform(i, 0, 0, i, 0, 0);
    }
    function Ps(t, e) {
        e.batchFill && t.fill(), e.batchStroke && t.stroke(), e.batchFill = "", e.batchStroke = "";
    }
    function Ls(t, e) {
        return e && t.__hoverStyle || t.style;
    }
    function Os(t, e) {
        Rs(t, e, {
            inHover: !1,
            viewWidth: 0,
            viewHeight: 0
        }, !0);
    }
    function Rs(t, e, n, i) {
        var r = e.transform;
        if (!e.shouldBePainted(n.viewWidth, n.viewHeight, !1, !1)) return e.__dirty &= ~fp, 
        void (e.__isRendered = !1);
        var o = e.__clipPaths, a = n.prevElClipPaths, s = !1, l = !1;
        if ((!a || function(t, e) {
            if (t === e || !t && !e) return !1;
            if (!t || !e || t.length !== e.length) return !0;
            for (var n = 0; n < t.length; n++) if (t[n] !== e[n]) return !0;
            return !1;
        }(o, a)) && (a && a.length && (Ps(t, n), t.restore(), l = s = !0, n.prevElClipPaths = null, 
        n.allClipped = !1, n.prevEl = null), o && o.length && (Ps(t, n), t.save(), function(t, e, n) {
            for (var i = !1, r = 0; r < t.length; r++) {
                var o = t[r];
                i = i || o.isZeroArea(), As(e, o), e.beginPath(), o.buildPath(e, o.shape), e.clip();
            }
            n.allClipped = i;
        }(o, t, n), s = !0), n.prevElClipPaths = o), n.allClipped) e.__isRendered = !1; else {
            e.beforeBrush && e.beforeBrush(), e.innerBeforeBrush();
            var u = n.prevEl;
            u || (l = s = !0);
            var h = e instanceof Hf && e.autoBatch && function(t) {
                var e = Ms(t), n = bs(t);
                return !(t.lineDash || !(+e ^ +n) || e && "string" != typeof t.fill || n && "string" != typeof t.stroke || t.strokePercent < 1 || t.strokeOpacity < 1 || t.fillOpacity < 1);
            }(e.style);
            s || function(t, e) {
                return t && e ? t[0] !== e[0] || t[1] !== e[1] || t[2] !== e[2] || t[3] !== e[3] || t[4] !== e[4] || t[5] !== e[5] : !(!t && !e);
            }(r, u.transform) ? (Ps(t, n), As(t, e)) : h || Ps(t, n);
            var c = Ls(e, n.inHover);
            e instanceof Hf ? (n.lastDrawType !== C_ && (l = !0, n.lastDrawType = C_), Ds(t, e, u, l, n), 
            h && (n.batchFill || n.batchStroke) || t.beginPath(), function(t, e, n, i) {
                var r, o = bs(n), a = Ms(n), s = n.strokePercent, l = 1 > s, u = !e.path;
                e.silent && !l || !u || e.createPathProxy();
                var h = e.path || S_, c = e.__dirty;
                if (!i) {
                    var p = n.fill, d = n.stroke, f = a && !!p.colorStops, g = o && !!d.colorStops, y = a && !!p.image, v = o && !!d.image, m = void 0, _ = void 0, x = void 0, w = void 0, b = void 0;
                    (f || g) && (b = e.getBoundingRect()), f && (m = c ? ms(t, p, b) : e.__canvasFillGradient, 
                    e.__canvasFillGradient = m), g && (_ = c ? ms(t, d, b) : e.__canvasStrokeGradient, 
                    e.__canvasStrokeGradient = _), y && (x = c || !e.__canvasFillPattern ? Is(t, p, e) : e.__canvasFillPattern, 
                    e.__canvasFillPattern = x), v && (w = c || !e.__canvasStrokePattern ? Is(t, d, e) : e.__canvasStrokePattern, 
                    e.__canvasStrokePattern = x), f ? t.fillStyle = m : y && (x ? t.fillStyle = x : a = !1), 
                    g ? t.strokeStyle = _ : v && (w ? t.strokeStyle = w : o = !1);
                }
                var S, M, T = e.getGlobalScale();
                h.setScale(T[0], T[1], e.segmentIgnoreThreshold), t.setLineDash && n.lineDash && (S = (r = ws(e))[0], 
                M = r[1]);
                var C = !0;
                (u || c & gp) && (h.setDPR(t.dpr), l ? h.setContext(null) : (h.setContext(t), C = !1), 
                h.reset(), e.buildPath(h, e.shape, i), h.toStatic(), e.pathUpdated()), C && h.rebuildPath(t, l ? s : 1), 
                S && (t.setLineDash(S), t.lineDashOffset = M), i || (n.strokeFirst ? (o && Cs(t, n), 
                a && Ts(t, n)) : (a && Ts(t, n), o && Cs(t, n))), S && t.setLineDash([]);
            }(t, e, c, h), h && (n.batchFill = c.fill || "", n.batchStroke = c.stroke || "")) : e instanceof Gf ? (n.lastDrawType !== k_ && (l = !0, 
            n.lastDrawType = k_), Ds(t, e, u, l, n), function(t, e, n) {
                var i, r = n.text;
                if (null != r && (r += ""), r) {
                    t.font = n.font || oc, t.textAlign = n.textAlign, t.textBaseline = n.textBaseline;
                    var o = void 0, a = void 0;
                    t.setLineDash && n.lineDash && (o = (i = ws(e))[0], a = i[1]), o && (t.setLineDash(o), 
                    t.lineDashOffset = a), n.strokeFirst ? (bs(n) && t.strokeText(r, n.x, n.y), Ms(n) && t.fillText(r, n.x, n.y)) : (Ms(n) && t.fillText(r, n.x, n.y), 
                    bs(n) && t.strokeText(r, n.x, n.y)), o && t.setLineDash([]);
                }
            }(t, e, c)) : e instanceof Yf ? (n.lastDrawType !== I_ && (l = !0, n.lastDrawType = I_), 
            function(t, e, n, i, r) {
                ks(t, Ls(e, r.inHover), n && Ls(n, r.inHover), i, r);
            }(t, e, u, l, n), function(t, e, n) {
                var i = e.__image = Nn(n.image, e.__image, e, e.onload);
                if (i && Vn(i)) {
                    var r = n.x || 0, o = n.y || 0, a = e.getWidth(), s = e.getHeight(), l = i.width / i.height;
                    if (null == a && null != s ? a = s * l : null == s && null != a ? s = a / l : null == a && null == s && (a = i.width, 
                    s = i.height), n.sWidth && n.sHeight) {
                        var u = n.sx || 0, h = n.sy || 0;
                        t.drawImage(i, u, h, n.sWidth, n.sHeight, r, o, a, s);
                    } else if (n.sx && n.sy) {
                        var c = a - (u = n.sx), p = s - (h = n.sy);
                        t.drawImage(i, u, h, c, p, r, o, a, s);
                    } else t.drawImage(i, r, o, a, s);
                }
            }(t, e, c)) : e.getTemporalDisplayables && (n.lastDrawType !== D_ && (l = !0, n.lastDrawType = D_), 
            function(t, e, n) {
                var i = e.getDisplayables(), r = e.getTemporalDisplayables();
                t.save();
                var o, a, s = {
                    prevElClipPaths: null,
                    prevEl: null,
                    allClipped: !1,
                    viewWidth: n.viewWidth,
                    viewHeight: n.viewHeight,
                    inHover: n.inHover
                };
                for (o = e.getCursor(), a = i.length; a > o; o++) {
                    (h = i[o]).beforeBrush && h.beforeBrush(), h.innerBeforeBrush(), Rs(t, h, s, o === a - 1), 
                    h.innerAfterBrush(), h.afterBrush && h.afterBrush(), s.prevEl = h;
                }
                for (var l = 0, u = r.length; u > l; l++) {
                    var h;
                    (h = r[l]).beforeBrush && h.beforeBrush(), h.innerBeforeBrush(), Rs(t, h, s, l === u - 1), 
                    h.innerAfterBrush(), h.afterBrush && h.afterBrush(), s.prevEl = h;
                }
                e.clearTemporalDisplayables(), e.notClear = !0, t.restore();
            }(t, e, n)), h && i && Ps(t, n), e.innerAfterBrush(), e.afterBrush && e.afterBrush(), 
            n.prevEl = e, e.__dirty = 0, e.__isRendered = !0;
        }
    }
    function Bs(t, e) {
        if ("none" === t) return null;
        var n = e.getDevicePixelRatio(), i = e.getZr(), r = "svg" === i.painter.type;
        t.dirty && A_.delete(t);
        var o = A_.get(t);
        if (o) return o;
        var a = u(t, {
            symbol: "rect",
            symbolSize: 1,
            symbolKeepAspect: !0,
            color: "rgba(0, 0, 0, 0.2)",
            backgroundColor: null,
            dashArrayX: 5,
            dashArrayY: 5,
            rotation: 0,
            maxTileWidth: 512,
            maxTileHeight: 512
        });
        "none" === a.backgroundColor && (a.backgroundColor = null);
        var s = {
            repeat: "repeat"
        };
        return function(t) {
            for (var e = [ n ], o = !0, s = 0; s < L_.length; ++s) {
                var l = a[L_[s]];
                if (null != l && !x(l) && !b(l) && !M(l) && "boolean" != typeof l) {
                    o = !1;
                    break;
                }
                e.push(l);
            }
            var u;
            if (o) {
                u = e.join(",") + (r ? "-svg" : "");
                var h = P_.get(u);
                h && (r ? t.svgElement = h : t.image = h);
            }
            var c, p = Es(a.dashArrayX), d = zs(a.dashArrayY), f = function t(e) {
                if (!e || 0 === e.length) return [ [ "rect" ] ];
                if (b(e)) return [ [ e ] ];
                for (var n = !0, i = 0; i < e.length; ++i) if (!b(e[i])) {
                    n = !1;
                    break;
                }
                if (n) return t([ e ]);
                var r = [];
                for (i = 0; i < e.length; ++i) r.push(b(e[i]) ? [ e[i] ] : e[i]);
                return r;
            }(a.symbol), g = Ns(p), y = Fs(d), v = !r && uc.createCanvas(), m = r && {
                tag: "g",
                attrs: {},
                key: "dcl",
                children: []
            }, _ = function() {
                for (var t = 1, e = 0, n = g.length; n > e; ++e) t = cn(t, g[e]);
                var i = 1;
                for (e = 0, n = f.length; n > e; ++e) i = cn(i, f[e].length);
                t *= i;
                var r = y * g.length * f.length;
                return {
                    width: Math.max(1, Math.min(t, a.maxTileWidth)),
                    height: Math.max(1, Math.min(r, a.maxTileHeight))
                };
            }();
            v && (v.width = _.width * n, v.height = _.height * n, c = v.getContext("2d")), function() {
                function t(t, e, o, s, l) {
                    var u = r ? 1 : n, h = ys(l, t * u, e * u, o * u, s * u, a.color, a.symbolKeepAspect);
                    if (r) {
                        var p = i.painter.renderOneToVNode(h);
                        p && m.children.push(p);
                    } else Os(c, h);
                }
                c && (c.clearRect(0, 0, v.width, v.height), a.backgroundColor && (c.fillStyle = a.backgroundColor, 
                c.fillRect(0, 0, v.width, v.height)));
                for (var e = 0, o = 0; o < d.length; ++o) e += d[o];
                if (!(0 >= e)) for (var s = -y, l = 0, u = 0, h = 0; s < _.height; ) {
                    if (l % 2 == 0) {
                        for (var g = u / 2 % f.length, x = 0, w = 0, b = 0; x < 2 * _.width; ) {
                            var S = 0;
                            for (o = 0; o < p[h].length; ++o) S += p[h][o];
                            if (0 >= S) break;
                            if (w % 2 == 0) {
                                var M = .5 * (1 - a.symbolSize), T = x + p[h][w] * M, C = s + d[l] * M, I = p[h][w] * a.symbolSize, k = d[l] * a.symbolSize, D = b / 2 % f[g].length;
                                t(T, C, I, k, f[g][D]);
                            }
                            x += p[h][w], ++b, ++w === p[h].length && (w = 0);
                        }
                        ++h === p.length && (h = 0);
                    }
                    s += d[l], ++u, ++l === d.length && (l = 0);
                }
            }(), o && P_.put(u, v || m), t.image = v, t.svgElement = m, t.svgWidth = _.width, 
            t.svgHeight = _.height;
        }(s), s.rotation = a.rotation, s.scaleX = s.scaleY = r ? 1 : 1 / n, A_.set(t, s), 
        t.dirty = !1, s;
    }
    function Es(t) {
        if (!t || 0 === t.length) return [ [ 0, 0 ] ];
        if (M(t)) return [ [ r = Math.ceil(t), r ] ];
        for (var e = !0, n = 0; n < t.length; ++n) if (!M(t[n])) {
            e = !1;
            break;
        }
        if (e) return Es([ t ]);
        var i = [];
        for (n = 0; n < t.length; ++n) if (M(t[n])) {
            var r = Math.ceil(t[n]);
            i.push([ r, r ]);
        } else {
            r = g(t[n], function(t) {
                return Math.ceil(t);
            });
            i.push(r.length % 2 == 1 ? r.concat(r) : r);
        }
        return i;
    }
    function zs(e) {
        if (!e || "object" == t(e) && 0 === e.length) return [ 0, 0 ];
        if (M(e)) {
            var n = Math.ceil(e);
            return [ n, n ];
        }
        var i = g(e, function(t) {
            return Math.ceil(t);
        });
        return e.length % 2 ? i.concat(i) : i;
    }
    function Ns(t) {
        return g(t, function(t) {
            return Fs(t);
        });
    }
    function Fs(t) {
        for (var e = 0, n = 0; n < t.length; ++n) e += t[n];
        return t.length % 2 == 1 ? 2 * e : e;
    }
    function Vs(t) {
        return R_[t];
    }
    function Hs(t) {
        return function() {
            for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
            return this.isDisposed() ? void 0 : Gs(this, t, e);
        };
    }
    function Ws(t) {
        return function() {
            for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
            return Gs(this, t, e);
        };
    }
    function Gs(t, e, n) {
        return n[0] = n[0] && n[0].toLowerCase(), zc.prototype[e].apply(t, n);
    }
    function Us(t) {
        bx[t] = !1;
    }
    function Xs(t) {
        return xx[function(t, e) {
            return t.getAttribute ? t.getAttribute(e) : t[e];
        }(t, Tx)];
    }
    function Ys(t, e) {
        mx[t] = e;
    }
    function qs(t) {
        h(yx, t) < 0 && yx.push(t);
    }
    function js(t, e) {
        nl(gx, t, e, B_);
    }
    function Zs(t) {
        $s("afterinit", t);
    }
    function Ks(t) {
        $s("afterupdate", t);
    }
    function $s(t, e) {
        O_.on(t, e);
    }
    function Qs(t, e, n) {
        w(e) && (n = e, e = "");
        var i = T(t) ? t.type : [ t, t = {
            event: e
        } ][0];
        t.event = (t.event || i).toLowerCase(), e = t.event, fx[e] || (z(W_.test(i) && W_.test(e)), 
        dx[i] || (dx[i] = {
            action: n,
            actionInfo: t
        }), fx[e] = i);
    }
    function Js(t, e) {
        Zv.register(t, e);
    }
    function tl(t, e) {
        nl(vx, t, e, E_, "layout");
    }
    function el(t, e) {
        nl(vx, t, e, z_, "visual");
    }
    function nl(t, e, n, i, r) {
        if ((w(e) || T(e)) && (n = e, e = i), !(h(Ix, n) >= 0)) {
            Ix.push(n);
            var o = $m.wrapStageHandler(n, r);
            o.__prio = e, o.__raw = n, t.push(o);
        }
    }
    function il(t, e) {
        _x[t] = e;
    }
    function rl(t, e, n) {
        var i = Vs("registerMap");
        i && i(t, e, n);
    }
    function ol(t) {
        return null == t ? 0 : t.length || 1;
    }
    function al(t) {
        return t;
    }
    function sl(t, e) {
        return t.hasOwnProperty(e) || (t[e] = []), t[e];
    }
    function ll(t) {
        return t instanceof Hx;
    }
    function ul(t) {
        for (var e = H(), n = 0; n < (t || []).length; n++) {
            var i = t[n], r = T(i) ? i.name : i;
            null != r && null == e.get(r) && e.set(r, n);
        }
        return e;
    }
    function hl(t) {
        var e = Fx(t);
        return e.dimNameMap || (e.dimNameMap = ul(t.dimensionsDefine));
    }
    function cl(t) {
        return t > 30;
    }
    function pl(t, e) {
        function n(t) {
            var e = m[t];
            if (0 > e) {
                var n = a[t], i = T(n) ? n : {
                    name: n
                }, r = new Nx(), o = i.name;
                null != o && null != g.get(o) && (r.name = r.displayName = o), null != i.type && (r.type = i.type), 
                null != i.displayName && (r.displayName = i.displayName);
                var s = h.length;
                return m[t] = s, r.storeDimIndex = t, h.push(r), r;
            }
            return h[e];
        }
        function i(t, e, n) {
            null != Mv.get(e) ? t.otherDims[e] = n : (t.coordDim = e, t.coordDimIndex = n, s.set(e, !0));
        }
        function r(t) {
            null == t.name && (t.name = t.coordDim);
        }
        Jo(t) || (t = ea(t));
        var o = (e = e || {}).coordDimensions || [], a = e.dimensionsDefine || t.dimensionsDefine || [], s = H(), h = [], c = function(t, e, n, i) {
            var r = Math.max(t.dimensionsDetectedCount || 1, e.length, n.length, i || 0);
            return f(e, function(t) {
                var e;
                T(t) && (e = t.dimsDef) && (r = Math.max(r, e.length));
            }), r;
        }(t, o, a, e.dimensionsCount), p = e.canOmitUnusedDimensions && cl(c), d = a === t.dimensionsDefine, g = d ? hl(t) : ul(a), y = e.encodeDefine;
        !y && e.encodeDefaulter && (y = e.encodeDefaulter(t, c));
        for (var v = H(y), m = new Sm(c), _ = 0; _ < m.length; _++) m[_] = -1;
        if (!p) for (_ = 0; c > _; _++) n(_);
        v.each(function(t, e) {
            var r = fn(t).slice();
            if (1 === r.length && !b(r[0]) && r[0] < 0) v.set(e, !1); else {
                var o = v.set(e, []);
                f(r, function(t, r) {
                    var a = b(t) ? g.get(t) : t;
                    null != a && c > a && (o[r] = a, i(n(a), e, r));
                });
            }
        });
        var x = 0;
        f(o, function(t) {
            var e, r, o, a;
            if (b(t)) e = t, a = {}; else {
                e = (a = t).name;
                var s = a.ordinalMeta;
                a.ordinalMeta = null, (a = l({}, a)).ordinalMeta = s, r = a.dimsDef, o = a.otherDims, 
                a.name = a.coordDim = a.coordDimIndex = a.dimsDef = a.otherDims = null;
            }
            var h = v.get(e);
            if (!1 !== h) {
                if (!(h = fn(h)).length) for (var p = 0; p < (r && r.length || 1); p++) {
                    for (;c > x && null != n(x).coordDim; ) x++;
                    c > x && h.push(x++);
                }
                f(h, function(t, s) {
                    var l = n(t);
                    if (d && null != a.type && (l.type = a.type), i(u(l, a), e, s), null == l.name && r) {
                        var h = r[s];
                        !T(h) && (h = {
                            name: h
                        }), l.name = l.displayName = h.name, l.defaultTooltip = h.defaultTooltip;
                    }
                    o && u(l.otherDims, o);
                });
            }
        });
        var w = e.generateCoord, S = e.generateCoordCount, M = null != S;
        S = w ? S || 1 : 0;
        var C = w || "value";
        if (p) f(h, function(t) {
            r(t);
        }), h.sort(function(t, e) {
            return t.storeDimIndex - e.storeDimIndex;
        }); else for (var I = 0; c > I; I++) {
            var k = n(I);
            null == k.coordDim && (k.coordDim = dl(C, s, M), k.coordDimIndex = 0, (!w || 0 >= S) && (k.isExtraCoord = !0), 
            S--), r(k), null != k.type || Ro(t, I) !== Ov.Must && (!k.isExtraCoord || null == k.otherDims.itemName && null == k.otherDims.seriesName) || (k.type = "ordinal");
        }
        return function(t) {
            for (var e = H(), n = 0; n < t.length; n++) {
                var i = t[n], r = i.name, o = e.get(r) || 0;
                o > 0 && (i.name = r + (o - 1)), o++, e.set(r, o);
            }
        }(h), new Hx({
            source: t,
            dimensions: h,
            fullDimensionCount: c,
            dimensionOmitted: p
        });
    }
    function dl(t, e, n) {
        if (n || e.hasKey(t)) {
            for (var i = 0; e.hasKey(t + i); ) i++;
            t += i;
        }
        return e.set(t, !0), t;
    }
    function fl(t) {
        return "category" === t.get("type");
    }
    function gl(t, e, n) {
        var i, r, o, a = (n = n || {}).byIndex, s = n.stackedCoordDimension;
        !function(t) {
            return !ll(t.schema);
        }(e) ? (r = e.schema, i = r.dimensions, o = e.store) : i = e;
        var l, u, h, c, p = !(!t || !t.get("stack"));
        if (f(i, function(t, e) {
            b(t) && (i[e] = t = {
                name: t
            }), p && !t.isExtraCoord && (a || l || !t.ordinalMeta || (l = t), u || "ordinal" === t.type || "time" === t.type || s && s !== t.coordDim || (u = t));
        }), !u || a || l || (a = !0), u) {
            h = "__\0ecstackresult_" + t.id, c = "__\0ecstackedover_" + t.id, l && (l.createInvertedIndices = !0);
            var d = u.coordDim, g = u.type, y = 0;
            f(i, function(t) {
                t.coordDim === d && y++;
            });
            var v = {
                name: h,
                coordDim: d,
                coordDimIndex: y,
                type: g,
                isExtraCoord: !0,
                isCalculationCoord: !0,
                storeDimIndex: i.length
            }, m = {
                name: c,
                coordDim: c,
                coordDimIndex: y + 1,
                type: g,
                isExtraCoord: !0,
                isCalculationCoord: !0,
                storeDimIndex: i.length + 1
            };
            r ? (o && (v.storeDimIndex = o.ensureCalculationDimension(c, g), m.storeDimIndex = o.ensureCalculationDimension(h, g)), 
            r.appendCalculationDimension(v), r.appendCalculationDimension(m)) : (i.push(v), 
            i.push(m));
        }
        return {
            stackedDimension: u && u.name,
            stackedByDimension: l && l.name,
            isStackedByIndex: a,
            stackedOverDimension: c,
            stackResultDimension: h
        };
    }
    function yl(t, e) {
        return !!e && e === t.getCalculationInfo("stackedDimension");
    }
    function vl(t, e) {
        return yl(t, e) ? t.getCalculationInfo("stackResultDimension") : e;
    }
    function ml(t, e, n) {
        var i, r;
        return n && f(t, function(t, o) {
            var a = t.coordDim, s = n.categoryAxisMap.get(a);
            s && (null == i && (i = o), t.ordinalMeta = s.getOrdinalMeta(), e && (t.createInvertedIndices = !0)), 
            null != t.otherDims.itemName && (r = !0);
        }), r || null == i || (t[i].otherDims.itemName = 0), i;
    }
    function _l(t, e, n) {
        n = n || {};
        var i, r = e.getSourceManager(), o = !1;
        t ? (o = !0, i = ea(t)) : o = (i = r.getSource()).sourceFormat === Tv;
        var a = function(t) {
            var e = t.get("coordinateSystem"), n = new jx(e), i = Zx[e];
            return i ? (i(t, n, n.axisMap, n.categoryAxisMap), n) : void 0;
        }(e), s = function(t, e) {
            var n, i = t.get("coordinateSystem"), r = Zv.get(i);
            return e && e.coordSysDims && (n = g(e.coordSysDims, function(t) {
                var n = {
                    name: t
                }, i = e.axisMap.get(t);
                if (i) {
                    var r = i.get("type");
                    n.type = function(t) {
                        return "category" === t ? "ordinal" : "time" === t ? "time" : "float";
                    }(r);
                }
                return n;
            })), n || (n = r && (r.getDimensionsInfo ? r.getDimensionsInfo() : r.dimensions.slice()) || [ "x", "y" ]), 
            n;
        }(e, a), l = n.useEncodeDefaulter, u = w(l) ? l : l ? _(Lo, s, e) : null, h = pl(i, {
            coordDimensions: s,
            generateCoord: n.generateCoord,
            encodeDefine: e.getEncode(),
            encodeDefaulter: u,
            canOmitUnusedDimensions: !o
        }), c = ml(h.dimensions, n.createInvertedIndices, a), p = o ? null : r.getSharedDataStore(h), d = gl(e, {
            schema: h,
            store: p
        }), f = new qx(h, e);
        f.setCalculationInfo(d);
        var y = null != c && function(t) {
            if (t.sourceFormat === Tv) {
                return !x(yn(function(t) {
                    for (var e = 0; e < t.length && null == t[e]; ) e++;
                    return t[e];
                }(t.data || [])));
            }
        }(i) ? function(t, e, n, i) {
            return i === c ? n : this.defaultDimValueGetter(t, e, n, i);
        } : null;
        return f.hasItemOption = !1, f.initData(o ? i : p, null, y), f;
    }
    function xl(t) {
        return T(t) && null != t.value ? t.value : t + "";
    }
    function wl(t) {
        return "interval" === t.type || "log" === t.type;
    }
    function bl(t, e, n, i) {
        var r = {}, o = t[1] - t[0], a = r.interval = sn(o / e, !0);
        null != n && n > a && (a = r.interval = n), null != i && a > i && (a = r.interval = i);
        var s = r.intervalPrecision = Ml(a);
        return function(t, e) {
            !isFinite(t[0]) && (t[0] = e[0]), !isFinite(t[1]) && (t[1] = e[1]), Tl(t, 0, e), 
            Tl(t, 1, e), t[0] > t[1] && (t[0] = t[1]);
        }(r.niceTickExtent = [ Ke(Math.ceil(t[0] / a) * a, s), Ke(Math.floor(t[1] / a) * a, s) ], t), 
        r;
    }
    function Sl(t) {
        var e = Math.pow(10, an(t)), n = t / e;
        return n ? 2 === n ? n = 3 : 3 === n ? n = 5 : n *= 2 : n = 1, Ke(n * e);
    }
    function Ml(t) {
        return $e(t) + 2;
    }
    function Tl(t, e, n) {
        t[e] = Math.max(Math.min(t[e], n[1]), n[0]);
    }
    function Cl(t, e) {
        return t >= e[0] && t <= e[1];
    }
    function Il(t, e) {
        return e[1] === e[0] ? .5 : (t - e[0]) / (e[1] - e[0]);
    }
    function kl(t, e) {
        return t * (e[1] - e[0]) + e[0];
    }
    function Dl(t) {
        return x(t) ? nw ? new Float32Array(t) : t : new iw(t);
    }
    function Al(t) {
        return t.get("stack") || rw + t.seriesIndex;
    }
    function Pl(t) {
        return t.dim + t.index;
    }
    function Ll(t, e) {
        var n = [];
        return e.eachSeriesByType(t, function(t) {
            Bl(t) && n.push(t);
        }), n;
    }
    function Ol(t) {
        var e = function(t) {
            var e = {};
            f(t, function(t) {
                var n = t.coordinateSystem.getBaseAxis();
                if ("time" === n.type || "value" === n.type) for (var i = t.getData(), r = n.dim + "_" + n.index, o = i.getDimensionIndex(i.mapDimension(n.dim)), a = i.getStore(), s = 0, l = a.count(); l > s; ++s) {
                    var u = a.get(o, s);
                    e[r] ? e[r].push(u) : e[r] = [ u ];
                }
            });
            var n = {};
            for (var i in e) if (e.hasOwnProperty(i)) {
                var r = e[i];
                if (r) {
                    r.sort(function(t, e) {
                        return t - e;
                    });
                    for (var o = null, a = 1; a < r.length; ++a) {
                        var s = r[a] - r[a - 1];
                        s > 0 && (o = null === o ? s : Math.min(o, s));
                    }
                    n[i] = o;
                }
            }
            return n;
        }(t), n = [];
        return f(t, function(t) {
            var i, r = t.coordinateSystem.getBaseAxis(), o = r.getExtent();
            if ("category" === r.type) i = r.getBandWidth(); else if ("value" === r.type || "time" === r.type) {
                var a = r.dim + "_" + r.index, s = e[a], l = Math.abs(o[1] - o[0]), u = r.scale.getExtent(), h = Math.abs(u[1] - u[0]);
                i = s ? l / h * s : l;
            } else {
                var c = t.getData();
                i = Math.abs(o[1] - o[0]) / c.count();
            }
            var p = Ze(t.get("barWidth"), i), d = Ze(t.get("barMaxWidth"), i), f = Ze(t.get("barMinWidth") || (El(t) ? .5 : 1), i), g = t.get("barGap"), y = t.get("barCategoryGap");
            n.push({
                bandWidth: i,
                barWidth: p,
                barMaxWidth: d,
                barMinWidth: f,
                barGap: g,
                barCategoryGap: y,
                axisKey: Pl(r),
                stackId: Al(t)
            });
        }), function(t) {
            var e = {};
            f(t, function(t) {
                var n = t.axisKey, i = t.bandWidth, r = e[n] || {
                    bandWidth: i,
                    remainedWidth: i,
                    autoWidthCount: 0,
                    categoryGap: null,
                    gap: "20%",
                    stacks: {}
                }, o = r.stacks;
                e[n] = r;
                var a = t.stackId;
                o[a] || r.autoWidthCount++, o[a] = o[a] || {
                    width: 0,
                    maxWidth: 0
                };
                var s = t.barWidth;
                s && !o[a].width && (o[a].width = s, s = Math.min(r.remainedWidth, s), r.remainedWidth -= s);
                var l = t.barMaxWidth;
                l && (o[a].maxWidth = l);
                var u = t.barMinWidth;
                u && (o[a].minWidth = u);
                var h = t.barGap;
                null != h && (r.gap = h);
                var c = t.barCategoryGap;
                null != c && (r.categoryGap = c);
            });
            var n = {};
            return f(e, function(t, e) {
                n[e] = {};
                var i = t.stacks, r = t.bandWidth, o = t.categoryGap;
                if (null == o) {
                    var a = m(i).length;
                    o = Math.max(35 - 4 * a, 15) + "%";
                }
                var s = Ze(o, r), l = Ze(t.gap, 1), u = t.remainedWidth, h = t.autoWidthCount, c = (u - s) / (h + (h - 1) * l);
                c = Math.max(c, 0), f(i, function(t) {
                    var e = t.maxWidth, n = t.minWidth;
                    if (t.width) {
                        var i = t.width;
                        e && (i = Math.min(i, e)), n && (i = Math.max(i, n)), t.width = i, u -= i + l * i, 
                        h--;
                    } else {
                        i = c;
                        e && i > e && (i = Math.min(e, u)), n && n > i && (i = n), i !== c && (t.width = i, 
                        u -= i + l * i, h--);
                    }
                }), c = (u - s) / (h + (h - 1) * l), c = Math.max(c, 0);
                var p, d = 0;
                f(i, function(t) {
                    t.width || (t.width = c), p = t, d += t.width * (1 + l);
                }), p && (d -= p.width * l);
                var g = -d / 2;
                f(i, function(t, i) {
                    n[e][i] = n[e][i] || {
                        bandWidth: r,
                        offset: g,
                        width: t.width
                    }, g += t.width * (1 + l);
                });
            }), n;
        }(n);
    }
    function Rl(t, e) {
        var n = Ll(t, e), i = Ol(n);
        f(n, function(t) {
            var e = t.getData(), n = t.coordinateSystem.getBaseAxis(), r = Al(t), o = i[Pl(n)][r], a = o.offset, s = o.width;
            e.setLayout({
                bandWidth: o.bandWidth,
                offset: a,
                size: s
            });
        });
    }
    function Bl(t) {
        return t.coordinateSystem && "cartesian2d" === t.coordinateSystem.type;
    }
    function El(t) {
        return t.pipelineContext && t.pipelineContext.large;
    }
    function zl(t) {
        return (t /= iv) > 16 ? 16 : t > 7.5 ? 7 : t > 3.5 ? 4 : t > 1.5 ? 2 : 1;
    }
    function Nl(t) {
        return (t /= 30 * iv) > 6 ? 6 : t > 3 ? 3 : t > 2 ? 2 : 1;
    }
    function Fl(t) {
        return (t /= nv) > 12 ? 12 : t > 6 ? 6 : t > 3.5 ? 4 : t > 2 ? 2 : 1;
    }
    function Vl(t, e) {
        return (t /= e ? ev : tv) > 30 ? 30 : t > 20 ? 20 : t > 15 ? 15 : t > 10 ? 10 : t > 5 ? 5 : t > 2 ? 2 : 1;
    }
    function Hl(t) {
        return sn(t, !0);
    }
    function Wl(t, e, n) {
        var i = new Date(t);
        switch (to(e)) {
          case "year":
          case "month":
            i[fo(n)](0);

          case "day":
            i[go(n)](1);

          case "hour":
            i[yo(n)](0);

          case "minute":
            i[vo(n)](0);

          case "second":
            i[mo(n)](0), i[_o(n)](0);
        }
        return i.getTime();
    }
    function Gl(t, e, n, i) {
        function r(t, e, n, r, o, a, s) {
            for (var l = new Date(e), u = e, h = l[r](); n > u && u <= i[1]; ) s.push({
                value: u
            }), h += t, l[o](h), u = l.getTime();
            s.push({
                value: u,
                notAdd: !0
            });
        }
        function o(t, o, a) {
            var s = [], l = !o.length;
            if (!function(t, e, n, i) {
                var r = rn(e), o = rn(n), a = function(t) {
                    return ro(r, t, i) === ro(o, t, i);
                }, s = function() {
                    return a("year");
                }, l = function() {
                    return s() && a("month");
                }, u = function() {
                    return l() && a("day");
                }, h = function() {
                    return u() && a("hour");
                }, c = function() {
                    return h() && a("minute");
                }, p = function() {
                    return c() && a("second");
                };
                switch (t) {
                  case "year":
                    return s();

                  case "month":
                    return l();

                  case "day":
                    return u();

                  case "hour":
                    return h();

                  case "minute":
                    return c();

                  case "second":
                    return p();

                  case "millisecond":
                    return p() && a("millisecond");
                }
            }(to(t), i[0], i[1], n)) {
                l && (o = [ {
                    value: Wl(new Date(i[0]), t, n)
                }, {
                    value: i[1]
                } ]);
                for (var u = 0; u < o.length - 1; u++) {
                    var h = o[u].value, c = o[u + 1].value;
                    if (h !== c) {
                        var p = void 0, d = void 0, f = void 0;
                        switch (t) {
                          case "year":
                            p = Math.max(1, Math.round(e / iv / 365)), d = oo(n), f = po(n);
                            break;

                          case "half-year":
                          case "quarter":
                          case "month":
                            p = Nl(e), d = ao(n), f = fo(n);
                            break;

                          case "week":
                          case "half-week":
                          case "day":
                            p = zl(e), d = so(n), f = go(n), !0;
                            break;

                          case "half-day":
                          case "quarter-day":
                          case "hour":
                            p = Fl(e), d = lo(n), f = yo(n);
                            break;

                          case "minute":
                            p = Vl(e, !0), d = uo(n), f = vo(n);
                            break;

                          case "second":
                            p = Vl(e, !1), d = ho(n), f = mo(n);
                            break;

                          case "millisecond":
                            p = Hl(e), d = co(n), f = _o(n);
                        }
                        r(p, h, c, d, f, 0, s), "year" === t && a.length > 1 && 0 === u && a.unshift({
                            value: a[0].value - p
                        });
                    }
                }
                for (u = 0; u < s.length; u++) a.push(s[u]);
                return s;
            }
        }
        for (var a = uv, s = 0, l = [], u = [], h = 0, c = 0, p = 0; p < a.length && s++ < 1e4; ++p) {
            var d = to(a[p]);
            if (eo(a[p])) if (o(a[p], l[l.length - 1] || [], u), d !== (a[p + 1] ? to(a[p + 1]) : null)) {
                if (u.length) {
                    c = h, u.sort(function(t, e) {
                        return t.value - e.value;
                    });
                    for (var f = [], y = 0; y < u.length; ++y) {
                        var m = u[y].value;
                        (0 === y || u[y - 1].value !== m) && (f.push(u[y]), m >= i[0] && m <= i[1] && h++);
                    }
                    var _ = (i[1] - i[0]) / e;
                    if (h > 1.5 * _ && c > _ / 1.5) break;
                    if (l.push(f), h > _ || t === a[p]) break;
                }
                u = [];
            }
        }
        var x = v(g(l, function(t) {
            return v(t, function(t) {
                return t.value >= i[0] && t.value <= i[1] && !t.notAdd;
            });
        }), function(t) {
            return t.length > 0;
        }), w = [], b = x.length - 1;
        for (p = 0; p < x.length; ++p) for (var S = x[p], M = 0; M < S.length; ++M) w.push({
            value: S[M].value,
            level: b - p
        });
        w.sort(function(t, e) {
            return t.value - e.value;
        });
        var T = [];
        for (p = 0; p < w.length; ++p) (0 === p || w[p].value !== w[p - 1].value) && T.push(w[p]);
        return T;
    }
    function Ul(t, e) {
        return uw(t, $e(e));
    }
    function Xl(t, e) {
        return null == e ? null : P(e) ? NaN : t.parse(e);
    }
    function Yl(t, e) {
        var n = t.type, i = function(t, e, n) {
            var i = t.rawExtentInfo;
            return i || (i = new yw(t, e, n), t.rawExtentInfo = i, i);
        }(t, e, t.getExtent()).calculate();
        t.setBlank(i.isBlank);
        var r = i.min, o = i.max, a = e.ecModel;
        if (a && "time" === n) {
            var s = Ll("bar", a), l = !1;
            if (f(s, function(t) {
                l = l || t.getBaseAxis() === e.axis;
            }), l) {
                var u = Ol(s), h = function(t, e, n, i) {
                    var r = n.axis.getExtent(), o = r[1] - r[0], a = function(t, e, n) {
                        if (t && e) {
                            var i = t[Pl(e)];
                            return null != i && null != n ? i[Al(n)] : i;
                        }
                    }(i, n.axis);
                    if (void 0 === a) return {
                        min: t,
                        max: e
                    };
                    var s = 1 / 0;
                    f(a, function(t) {
                        s = Math.min(t.offset, s);
                    });
                    var l = -1 / 0;
                    f(a, function(t) {
                        l = Math.max(t.offset + t.width, l);
                    }), s = Math.abs(s), l = Math.abs(l);
                    var u = s + l, h = e - t, c = h / (1 - (s + l) / o) - h;
                    return {
                        min: t -= c * (s / u),
                        max: e += c * (l / u)
                    };
                }(r, o, e, u);
                r = h.min, o = h.max;
            }
        }
        return {
            extent: [ r, o ],
            fixMin: i.minFixed,
            fixMax: i.maxFixed
        };
    }
    function ql(t, e) {
        var n = e, i = Yl(t, n), r = i.extent, o = n.get("splitNumber");
        t instanceof fw && (t.base = n.get("logBase"));
        var a = t.type, s = n.get("interval"), l = "interval" === a || "time" === a;
        t.setExtent(r[0], r[1]), t.calcNiceExtent({
            splitNumber: o,
            fixMin: i.fixMin,
            fixMax: i.fixMax,
            minInterval: l ? n.get("minInterval") : null,
            maxInterval: l ? n.get("maxInterval") : null
        }), null != s && t.setInterval && t.setInterval(s);
    }
    function jl(t, e) {
        if (e = e || t.get("type")) switch (e) {
          case "category":
            return new Jx({
                ordinalMeta: t.getOrdinalMeta ? t.getOrdinalMeta() : t.getCategories(),
                extent: [ 1 / 0, -1 / 0 ]
            });

          case "time":
            return new ow({
                locale: t.ecModel.getLocaleModel(),
                useUTC: t.ecModel.get("useUTC")
            });

          default:
            return new (Kx.getClass(e) || ew)();
        }
    }
    function Zl(t) {
        var e = t.getLabelModel().get("formatter"), n = "category" === t.type ? t.scale.getExtent()[0] : null;
        return "time" === t.scale.type ? function(e) {
            return function(n, i) {
                return t.scale.getFormattedLabel(n, i, e);
            };
        }(e) : b(e) ? function(e) {
            return function(n) {
                var i = t.scale.getLabel(n);
                return e.replace("{value}", null != i ? i : "");
            };
        }(e) : w(e) ? function(e) {
            return function(i, r) {
                return null != n && (r = i.value - n), e(Kl(t, i), r, null != i.level ? {
                    level: i.level
                } : null);
            };
        }(e) : function(e) {
            return t.scale.getLabel(e);
        };
    }
    function Kl(t, e) {
        return "category" === t.type ? t.scale.getLabel(e) : e.value;
    }
    function $l(t, e) {
        var n = e * Math.PI / 180, i = t.width, r = t.height, o = i * Math.abs(Math.cos(n)) + Math.abs(r * Math.sin(n)), a = i * Math.abs(Math.sin(n)) + Math.abs(r * Math.cos(n));
        return new op(t.x, t.y, o, a);
    }
    function Ql(t) {
        var e = t.get("interval");
        return null == e ? "auto" : e;
    }
    function Jl(t) {
        return "category" === t.type && 0 === Ql(t.getLabelModel());
    }
    function tu(t) {
        return x(t) ? void f(t, function(t) {
            tu(t);
        }) : void (h(bw, t) >= 0 || (bw.push(t), w(t) && (t = {
            install: t
        }), t.install(Sw)));
    }
    function eu(t, e) {
        return Math.abs(t - e) < Mw;
    }
    function nu(t, e, n) {
        var i = 0, r = t[0];
        if (!r) return !1;
        for (var o = 1; o < t.length; o++) {
            var a = t[o];
            i += oi(r[0], r[1], a[0], a[1], e, n), r = a;
        }
        var s = t[0];
        return eu(r[0], s[0]) && eu(r[1], s[1]) || (i += oi(r[0], r[1], s[0], s[1], e, n)), 
        0 !== i;
    }
    function iu(t, e) {
        for (var n = 0; n < t.length; n++) rt(t[n], t[n], e);
    }
    function ru(t, e, n, i) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            i && (o = i.project(o)), o && isFinite(o[0]) && isFinite(o[1]) && (ot(e, e, o), 
            at(n, n, o));
        }
    }
    function ou(t, e, n) {
        for (var i = 0; i < t.length; i++) t[i] = au(t[i], e[i], n);
    }
    function au(t, e, n) {
        for (var i = [], r = e[0], o = e[1], a = 0; a < t.length; a += 2) {
            var s = t.charCodeAt(a) - 64, l = t.charCodeAt(a + 1) - 64;
            s = s >> 1 ^ -(1 & s), l = l >> 1 ^ -(1 & l), r = s += r, o = l += o, i.push([ s / n, l / n ]);
        }
        return i;
    }
    function su(t, e) {
        return g(v((t = function(t) {
            if (!t.UTF8Encoding) return t;
            var e = t, n = e.UTF8Scale;
            return null == n && (n = 1024), f(e.features, function(t) {
                var e = t.geometry, i = e.encodeOffsets, r = e.coordinates;
                if (i) switch (e.type) {
                  case "LineString":
                    e.coordinates = au(r, i, n);
                    break;

                  case "Polygon":
                  case "MultiLineString":
                    ou(r, i, n);
                    break;

                  case "MultiPolygon":
                    f(r, function(t, e) {
                        return ou(t, i[e], n);
                    });
                }
            }), e.UTF8Encoding = !1, e;
        }(t)).features, function(t) {
            return t.geometry && t.properties && t.geometry.coordinates.length > 0;
        }), function(t) {
            var n = t.properties, i = t.geometry, r = [];
            switch (i.type) {
              case "Polygon":
                var o = i.coordinates;
                r.push(new Iw(o[0], o.slice(1)));
                break;

              case "MultiPolygon":
                f(i.coordinates, function(t) {
                    t[0] && r.push(new Iw(t[0], t.slice(1)));
                });
                break;

              case "LineString":
                r.push(new kw([ i.coordinates ]));
                break;

              case "MultiLineString":
                r.push(new kw(i.coordinates));
            }
            var a = new Dw(n[e || "name"], r, n.cp);
            return a.properties = n, a;
        });
    }
    function lu(t) {
        return "category" === t.type ? function(t) {
            var e = t.getLabelModel(), n = hu(t, e);
            return !e.get("show") || t.scale.isBlank() ? {
                labels: [],
                labelCategoryInterval: n.labelCategoryInterval
            } : n;
        }(t) : function(t) {
            var e = t.scale.getTicks(), n = Zl(t);
            return {
                labels: g(e, function(e, i) {
                    return {
                        level: e.level,
                        formattedLabel: n(e, i),
                        rawLabel: t.scale.getLabel(e),
                        tickValue: e.value
                    };
                })
            };
        }(t);
    }
    function uu(t, e) {
        return "category" === t.type ? function(t, e) {
            var n, i, r = cu(t, "ticks"), o = Ql(e), a = pu(r, o);
            if (a) return a;
            if ((!e.get("show") || t.scale.isBlank()) && (n = []), w(o)) n = gu(t, o, !0); else if ("auto" === o) {
                var s = hu(t, t.getLabelModel());
                i = s.labelCategoryInterval, n = g(s.labels, function(t) {
                    return t.tickValue;
                });
            } else n = fu(t, i = o, !0);
            return du(r, o, {
                ticks: n,
                tickCategoryInterval: i
            });
        }(t, e) : {
            ticks: g(t.scale.getTicks(), function(t) {
                return t.value;
            })
        };
    }
    function hu(t, e) {
        var n, i, r = cu(t, "labels"), o = Ql(e), a = pu(r, o);
        return a || (w(o) ? n = gu(t, o) : (i = "auto" === o ? function(t) {
            var e = Bw(t).autoInterval;
            return null != e ? e : Bw(t).autoInterval = t.calculateCategoryInterval();
        }(t) : o, n = fu(t, i)), du(r, o, {
            labels: n,
            labelCategoryInterval: i
        }));
    }
    function cu(t, e) {
        return Bw(t)[e] || (Bw(t)[e] = []);
    }
    function pu(t, e) {
        for (var n = 0; n < t.length; n++) if (t[n].key === e) return t[n].value;
    }
    function du(t, e, n) {
        return t.push({
            key: e,
            value: n
        }), n;
    }
    function fu(t, e, n) {
        function i(t) {
            var e = {
                value: t
            };
            l.push(n ? t : {
                formattedLabel: r(e),
                rawLabel: o.getLabel(e),
                tickValue: t
            });
        }
        var r = Zl(t), o = t.scale, a = o.getExtent(), s = t.getLabelModel(), l = [], u = Math.max((e || 0) + 1, 1), h = a[0], c = o.count();
        0 !== h && u > 1 && c / u > 2 && (h = Math.round(Math.ceil(h / u) * u));
        var p = Jl(t), d = s.get("showMinLabel") || p, f = s.get("showMaxLabel") || p;
        d && h !== a[0] && i(a[0]);
        for (var g = h; g <= a[1]; g += u) i(g);
        return f && g - u !== a[1] && i(a[1]), l;
    }
    function gu(t, e, n) {
        var i = t.scale, r = Zl(t), o = [];
        return f(i.getTicks(), function(t) {
            var a = i.getLabel(t), s = t.value;
            e(t.value, a) && o.push(n ? s : {
                formattedLabel: r(t),
                rawLabel: a,
                tickValue: s
            });
        }), o;
    }
    function yu(t, e) {
        var n = (t[1] - t[0]) / e / 2;
        t[0] += n, t[1] -= n;
    }
    function vu(t, e, n, i, r) {
        var o = n.width, a = n.height;
        switch (t) {
          case "top":
            i.set(n.x + o / 2, n.y - e), r.set(0, -1);
            break;

          case "bottom":
            i.set(n.x + o / 2, n.y + a + e), r.set(0, 1);
            break;

          case "left":
            i.set(n.x - e, n.y + a / 2), r.set(-1, 0);
            break;

          case "right":
            i.set(n.x + o + e, n.y + a / 2), r.set(1, 0);
        }
    }
    function mu(t, e, n, i, r, o, a, s, l) {
        a -= t, s -= e;
        var u = Math.sqrt(a * a + s * s), h = (a /= u) * n + t, c = (s /= u) * n + e;
        if (Math.abs(i - r) % Nw < 1e-4) return l[0] = h, l[1] = c, u - n;
        if (o) {
            var p = i;
            i = ii(r), r = ii(p);
        } else i = ii(i), r = ii(r);
        i > r && (r += Nw);
        var d = Math.atan2(s, a);
        if (0 > d && (d += Nw), d >= i && r >= d || d + Nw >= i && r >= d + Nw) return l[0] = h, 
        l[1] = c, u - n;
        var f = n * Math.cos(i) + t, g = n * Math.sin(i) + e, y = n * Math.cos(r) + t, v = n * Math.sin(r) + e, m = (f - a) * (f - a) + (g - s) * (g - s), _ = (y - a) * (y - a) + (v - s) * (v - s);
        return _ > m ? (l[0] = f, l[1] = g, Math.sqrt(m)) : (l[0] = y, l[1] = v, Math.sqrt(_));
    }
    function _u(t, e, n, i, r, o, a, s) {
        var l = r - t, u = o - e, h = n - t, c = i - e, p = Math.sqrt(h * h + c * c), d = (l * (h /= p) + u * (c /= p)) / p;
        s && (d = Math.min(Math.max(d, 0), 1)), d *= p;
        var f = a[0] = t + d * h, g = a[1] = e + d * c;
        return Math.sqrt((f - r) * (f - r) + (g - o) * (g - o));
    }
    function xu(t, e, n, i, r, o, a) {
        0 > n && (t += n, n = -n), 0 > i && (e += i, i = -i);
        var s = t + n, l = e + i, u = a[0] = Math.min(Math.max(r, t), s), h = a[1] = Math.min(Math.max(o, e), l);
        return Math.sqrt((u - r) * (u - r) + (h - o) * (h - o));
    }
    function wu(t, e, n) {
        var i = xu(e.x, e.y, e.width, e.height, t.x, t.y, Hw);
        return n.set(Hw[0], Hw[1]), i;
    }
    function bu(t, e, n) {
        for (var i, r, o = 0, a = 0, s = 0, l = 0, u = 1 / 0, h = e.data, c = t.x, p = t.y, d = 0; d < h.length; ) {
            var f = h[d++];
            1 === d && (s = o = h[d], l = a = h[d + 1]);
            var g = u;
            switch (f) {
              case Fw.M:
                o = s = h[d++], a = l = h[d++];
                break;

              case Fw.L:
                g = _u(o, a, h[d], h[d + 1], c, p, Hw, !0), o = h[d++], a = h[d++];
                break;

              case Fw.C:
                g = Ut(o, a, h[d++], h[d++], h[d++], h[d++], h[d], h[d + 1], c, p, Hw), o = h[d++], 
                a = h[d++];
                break;

              case Fw.Q:
                g = Kt(o, a, h[d++], h[d++], h[d], h[d + 1], c, p, Hw), o = h[d++], a = h[d++];
                break;

              case Fw.A:
                var y = h[d++], v = h[d++], m = h[d++], _ = h[d++], x = h[d++], w = h[d++];
                d += 1;
                var b = !!(1 - h[d++]);
                i = Math.cos(x) * m + y, r = Math.sin(x) * _ + v, 1 >= d && (s = i, l = r), g = mu(y, v, _, x, x + w, b, (c - y) * _ / m + y, p, Hw), 
                o = Math.cos(x + w) * m + y, a = Math.sin(x + w) * _ + v;
                break;

              case Fw.R:
                g = xu(s = o = h[d++], l = a = h[d++], h[d++], h[d++], c, p, Hw);
                break;

              case Fw.Z:
                g = _u(o, a, s, l, c, p, Hw, !0), o = s, a = l;
            }
            u > g && (u = g, n.set(Hw[0], Hw[1]));
        }
        return u;
    }
    function Su(t, e) {
        if (t) {
            var n = t.getTextGuideLine(), i = t.getTextContent();
            if (i && n) {
                var r = t.textGuideLineConfig || {}, o = [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ], a = r.candidates || Vw, s = i.getBoundingRect().clone();
                s.applyTransform(i.getComputedTransform());
                var l = 1 / 0, u = r.anchor, h = t.getComputedTransform(), c = h && Tt([], h), p = e.get("length2") || 0;
                u && Uw.copy(u);
                for (var d = 0; d < a.length; d++) {
                    vu(a[d], 0, s, Ww, Xw), Kc.scaleAndAdd(Gw, Ww, Xw, p), Gw.transform(c);
                    var f = t.getBoundingRect(), g = u ? u.distance(Gw) : t instanceof Hf ? bu(Gw, t.path, Uw) : wu(Gw, f, Uw);
                    l > g && (l = g, Gw.transform(h), Uw.transform(h), Uw.toArray(o[0]), Gw.toArray(o[1]), 
                    Ww.toArray(o[2]));
                }
                (function(t, e) {
                    if (180 >= e && e > 0) {
                        e = e / 180 * Math.PI, Ww.fromArray(t[0]), Gw.fromArray(t[1]), Uw.fromArray(t[2]), 
                        Kc.sub(Xw, Ww, Gw), Kc.sub(Yw, Uw, Gw);
                        var n = Xw.len(), i = Yw.len();
                        if (!(.001 > n || .001 > i)) {
                            Xw.scale(1 / n), Yw.scale(1 / i);
                            var r = Xw.dot(Yw), o = Math.cos(e);
                            if (r > o) {
                                var a = _u(Gw.x, Gw.y, Uw.x, Uw.y, Ww.x, Ww.y, qw, !1);
                                jw.fromArray(qw), jw.scaleAndAdd(Yw, a / Math.tan(Math.PI - e));
                                var s = Uw.x !== Gw.x ? (jw.x - Gw.x) / (Uw.x - Gw.x) : (jw.y - Gw.y) / (Uw.y - Gw.y);
                                if (isNaN(s)) return;
                                0 > s ? Kc.copy(jw, Gw) : s > 1 && Kc.copy(jw, Uw), jw.toArray(t[1]);
                            }
                        }
                    }
                })(o, e.get("minTurnAngle")), n.setShape({
                    points: o
                });
            }
        }
    }
    function Mu(t, e, n, i) {
        var r = "normal" === n, o = r ? t : t.ensureState(n);
        o.ignore = e;
        var a = i.get("smooth");
        a && !0 === a && (a = .3), o.shape = o.shape || {}, a > 0 && (o.shape.smooth = a);
        var s = i.getModel("lineStyle").getLineStyle();
        r ? t.useStyle(s) : o.style = s;
    }
    function Tu(t, e) {
        var n = e.smooth, i = e.points;
        if (i) if (t.moveTo(i[0][0], i[0][1]), n > 0 && i.length >= 3) {
            var r = Lc(i[0], i[1]), o = Lc(i[1], i[2]);
            if (!r || !o) return t.lineTo(i[1][0], i[1][1]), void t.lineTo(i[2][0], i[2][1]);
            var a = Math.min(r, o) * n, s = it([], i[1], i[0], a / r), l = it([], i[1], i[2], a / o), u = it([], s, l, .5);
            t.bezierCurveTo(s[0], s[1], s[0], s[1], u[0], u[1]), t.bezierCurveTo(l[0], l[1], l[0], l[1], i[2][0], i[2][1]);
        } else for (var h = 1; h < i.length; h++) t.lineTo(i[h][0], i[h][1]);
    }
    function Cu(t) {
        for (var e = [], n = 0; n < t.length; n++) {
            var i = t[n];
            if (!i.defaultAttr.ignore) {
                var r = i.label, o = r.getComputedTransform(), a = r.getBoundingRect(), s = !o || o[1] < 1e-5 && o[2] < 1e-5, l = r.style.margin || 0, u = a.clone();
                u.applyTransform(o), u.x -= l / 2, u.y -= l / 2, u.width += l, u.height += l;
                var h = s ? new xy(a, o) : null;
                e.push({
                    label: r,
                    labelLine: i.labelLine,
                    rect: u,
                    localRect: a,
                    obb: h,
                    priority: i.priority,
                    defaultAttr: i.defaultAttr,
                    layoutOption: i.computedLayoutOption,
                    axisAligned: s,
                    transform: o
                });
            }
        }
        return e;
    }
    function Iu(t, e, n, i, r, o) {
        function a() {
            w = S.rect[e] - i, b = r - M.rect[e] - M.rect[n];
        }
        function s(t, e, n) {
            if (0 > t) {
                var i = Math.min(e, -t);
                if (i > 0) {
                    l(i * n, 0, c);
                    var r = i + t;
                    0 > r && u(-r * n, 1);
                } else u(-t * n, 1);
            }
        }
        function l(n, i, r) {
            0 !== n && (f = !0);
            for (var o = i; r > o; o++) {
                var a = t[o];
                a.rect[e] += n, a.label[e] += n;
            }
        }
        function u(i, r) {
            for (var o = [], a = 0, s = 1; c > s; s++) {
                var u = t[s - 1].rect, h = Math.max(t[s].rect[e] - u[e] - u[n], 0);
                o.push(h), a += h;
            }
            if (a) {
                var p = Math.min(Math.abs(i) / a, r);
                if (i > 0) for (s = 0; c - 1 > s; s++) {
                    l(o[s] * p, 0, s + 1);
                } else for (s = c - 1; s > 0; s--) {
                    l(-(o[s - 1] * p), s, c);
                }
            }
        }
        function h(t) {
            var e = 0 > t ? -1 : 1;
            t = Math.abs(t);
            for (var n = Math.ceil(t / (c - 1)), i = 0; c - 1 > i; i++) if (e > 0 ? l(n, 0, i + 1) : l(-n, c - i - 1, c), 
            0 >= (t -= n)) return;
        }
        var c = t.length;
        if (!(2 > c)) {
            t.sort(function(t, n) {
                return t.rect[e] - n.rect[e];
            });
            for (var p, d = 0, f = !1, g = [], y = 0, v = 0; c > v; v++) {
                var m = t[v], _ = m.rect;
                0 > (p = _[e] - d) && (_[e] -= p, m.label[e] -= p, f = !0);
                var x = Math.max(-p, 0);
                g.push(x), y += x, d = _[e] + _[n];
            }
            y > 0 && o && l(-y / c, 0, c);
            var w, b, S = t[0], M = t[c - 1];
            return a(), 0 > w && u(-w, .8), 0 > b && u(b, .8), a(), s(w, b, 1), s(b, w, -1), 
            a(), 0 > w && h(-w), 0 > b && h(b), f;
        }
    }
    function ku(t) {
        function e(t) {
            if (!t.ignore) {
                var e = t.ensureState("emphasis");
                null == e.ignore && (e.ignore = !1);
            }
            t.ignore = !0;
        }
        var n = [];
        t.sort(function(t, e) {
            return e.priority - t.priority;
        });
        for (var i = new op(0, 0, 0, 0), r = 0; r < t.length; r++) {
            var o = t[r], a = o.axisAligned, s = o.localRect, l = o.transform, u = o.label, h = o.labelLine;
            i.copy(o.rect), i.width -= .1, i.height -= .1, i.x += .05, i.y += .05;
            for (var c = o.obb, p = !1, d = 0; d < n.length; d++) {
                var f = n[d];
                if (i.intersect(f.rect)) {
                    if (a && f.axisAligned) {
                        p = !0;
                        break;
                    }
                    if (f.obb || (f.obb = new xy(f.localRect, f.transform)), c || (c = new xy(s, l)), 
                    c.intersect(f.obb)) {
                        p = !0;
                        break;
                    }
                }
            }
            p ? (e(u), h && e(h)) : (u.attr("ignore", o.defaultAttr.ignore), h && h.attr("ignore", o.defaultAttr.labelGuideIgnore), 
            n.push(o));
        }
    }
    function Du(t) {
        if (t) {
            for (var e = [], n = 0; n < t.length; n++) e.push(t[n].slice());
            return e;
        }
    }
    function Au(t, e) {
        var n = t.label, i = e && e.getTextGuideLine();
        return {
            dataIndex: t.dataIndex,
            dataType: t.dataType,
            seriesIndex: t.seriesModel.seriesIndex,
            text: t.label.style.text,
            rect: t.hostRect,
            labelRect: t.rect,
            align: n.style.align,
            verticalAlign: n.style.verticalAlign,
            labelLinePoints: Du(i && i.shape.points)
        };
    }
    function Pu(t, e, n) {
        for (var i = 0; i < n.length; i++) {
            var r = n[i];
            null != e[r] && (t[r] = e[r]);
        }
    }
    function Lu(t) {
        t.registerUpdateLifecycle("series:beforeupdate", function(t, e) {
            var n = eb(e).labelManager;
            n || (n = eb(e).labelManager = new tb()), n.clearLabels();
        }), t.registerUpdateLifecycle("series:layoutlabels", function(t, e, n) {
            var i = eb(e).labelManager;
            n.updatedSeries.forEach(function(t) {
                i.addLabelsOfSeries(e.getViewOfSeriesModel(t));
            }), i.updateLayoutConfig(e), i.layout(e), i.processLabelsOverall();
        });
    }
    function Ou(t, e, n) {
        var i = uc.createCanvas(), r = e.getWidth(), o = e.getHeight(), a = i.style;
        return a && (a.position = "absolute", a.left = "0", a.top = "0", a.width = r + "px", 
        a.height = o + "px", i.setAttribute("data-zr-dom-id", t)), i.width = r * n, i.height = o * n, 
        i;
    }
    function Ru(t, e, n, i, r) {
        return t ? "polar" === t.type ? function(t, e, n) {
            var i = t.getArea(), r = Ke(i.r0, 1), o = Ke(i.r, 1), a = new $g({
                shape: {
                    cx: Ke(t.cx, 1),
                    cy: Ke(t.cy, 1),
                    r0: r,
                    r: o,
                    startAngle: i.startAngle,
                    endAngle: i.endAngle,
                    clockwise: i.clockwise
                }
            });
            return e && ("angle" === t.getBaseAxis().dim ? a.shape.endAngle = i.startAngle : a.shape.r = r, 
            gr(a, {
                shape: {
                    endAngle: i.endAngle,
                    r: o
                }
            }, n)), a;
        }(t, e, n) : "cartesian2d" === t.type ? function(t, e, n, i, r) {
            var o = t.getArea(), a = o.x, s = o.y, l = o.width, u = o.height, h = n.get([ "lineStyle", "width" ]) || 2;
            a -= h / 2, s -= h / 2, l += h, u += h, a = Math.floor(a), l = Math.round(l);
            var c = new Kf({
                shape: {
                    x: a,
                    y: s,
                    width: l,
                    height: u
                }
            });
            if (e) {
                var p = t.getBaseAxis(), d = p.isHorizontal(), f = p.inverse;
                d ? (f && (c.shape.x += l), c.shape.width = 0) : (f || (c.shape.y += u), c.shape.height = 0);
                var g = w(r) ? function(t) {
                    r(t, c);
                } : null;
                gr(c, {
                    shape: {
                        width: l,
                        height: u,
                        x: a,
                        y: s
                    }
                }, n, null, i, g);
            }
            return c;
        }(t, e, n, i, r) : null : null;
    }
    function Bu(t, e) {
        return t.type === e;
    }
    function Eu(t, e) {
        var n = t.mapDimensionsAll("defaultedLabel"), i = n.length;
        if (1 === i) {
            var r = ca(t, e, n[0]);
            return null != r ? r + "" : null;
        }
        if (i) {
            for (var o = [], a = 0; a < n.length; a++) o.push(ca(t, e, n[a]));
            return o.join(" ");
        }
    }
    function zu(t, e, n) {
        return e * Math.sin(t) * (n ? -1 : 1);
    }
    function Nu(t, e, n) {
        return e * Math.cos(t) * (n ? 1 : -1);
    }
    function Fu(t, e, n) {
        var i = t.get("borderRadius");
        if (null == i) return n ? {
            cornerRadius: 0
        } : null;
        x(i) || (i = [ i, i, i, i ]);
        var r = Math.abs(e.r || 0 - e.r0 || 0);
        return {
            cornerRadius: g(i, function(t) {
                return Ve(t, r);
            })
        };
    }
    function Vu(t, e, n, i, r, o, a, s) {
        var l, u;
        o ? (u = {
            x: i.x,
            width: i.width
        }, l = {
            y: i.y,
            height: i.height
        }) : (u = {
            y: i.y,
            height: i.height
        }, l = {
            x: i.x,
            width: i.width
        }), s || (a ? fr : gr)(n, {
            shape: l
        }, e, r, null), (a ? fr : gr)(n, {
            shape: u
        }, e ? t.baseAxis.model : null, r);
    }
    function Hu(t, e) {
        for (var n = 0; n < e.length; n++) if (!isFinite(t[e[n]])) return !0;
        return !1;
    }
    function Wu(t) {
        return function(t) {
            var e = t ? "Arc" : "Angle";
            return function(t) {
                switch (t) {
                  case "start":
                  case "insideStart":
                  case "end":
                  case "insideEnd":
                    return t + e;

                  default:
                    return t;
                }
            };
        }(t);
    }
    function Gu(t, e, n, i, r, o, a, s) {
        var u = e.getItemVisual(n, "style");
        if (s) {
            if (!o.get("roundCap")) {
                var h = t.shape;
                l(h, Fu(i.getModel("itemStyle"), h, !0)), t.setShape(h);
            }
        } else {
            var c = i.get([ "itemStyle", "borderRadius" ]) || 0;
            t.setShape("r", c);
        }
        t.useStyle(u);
        var p = i.getShallow("cursor");
        p && t.attr("cursor", p);
        var d = s ? a ? r.r >= r.r0 ? "endArc" : "startArc" : r.endAngle >= r.startAngle ? "endAngle" : "startAngle" : a ? r.height >= 0 ? "bottom" : "top" : r.width >= 0 ? "right" : "left", g = function(t, e) {
            e = e || "label";
            for (var n = {
                normal: t.getModel(e)
            }, i = 0; i < pg.length; i++) {
                var r = pg[i];
                n[r] = t.getModel([ r, e ]);
            }
            return n;
        }(i);
        Gr(t, g, {
            labelFetcher: o,
            labelDataIndex: n,
            defaultText: Eu(o.getData(), n),
            inheritColor: u.fill,
            defaultOpacity: u.opacity,
            defaultOutsidePosition: d
        });
        var y = t.getTextContent();
        if (s && y) {
            var v = i.get([ "label", "position" ]);
            t.textConfig.inside = "middle" === v || null, function(t, e, n, i) {
                if (M(i)) t.setTextConfig({
                    rotation: i
                }); else if (x(e)) t.setTextConfig({
                    rotation: 0
                }); else {
                    var r, o = t.shape, a = o.clockwise ? o.startAngle : o.endAngle, s = o.clockwise ? o.endAngle : o.startAngle, l = (a + s) / 2, u = n(e);
                    switch (u) {
                      case "startArc":
                      case "insideStartArc":
                      case "middle":
                      case "insideEndArc":
                      case "endArc":
                        r = l;
                        break;

                      case "startAngle":
                      case "insideStartAngle":
                        r = a;
                        break;

                      case "endAngle":
                      case "insideEndAngle":
                        r = s;
                        break;

                      default:
                        return void t.setTextConfig({
                            rotation: 0
                        });
                    }
                    var h = 1.5 * Math.PI - r;
                    "middle" === u && h > Math.PI / 2 && h < 1.5 * Math.PI && (h -= Math.PI), t.setTextConfig({
                        rotation: h
                    });
                }
            }(t, "outside" === v ? d : v, Wu(a), i.get([ "label", "rotate" ]));
        }
        qr(y, g, o.getRawValue(n), function(t) {
            return function(t, e) {
                var n = t.mapDimensionsAll("defaultedLabel");
                if (!x(e)) return e + "";
                for (var i = [], r = 0; r < n.length; r++) {
                    var o = t.getDimensionIndex(n[r]);
                    o >= 0 && i.push(e[o]);
                }
                return i.join(" ");
            }(e, t);
        });
        var m = i.getModel([ "emphasis" ]);
        Ki(t, m.get("focus"), m.get("blurScope"), m.get("disabled")), $i(t, i), function(t) {
            return null != t.startAngle && null != t.endAngle && t.startAngle === t.endAngle;
        }(r) && (t.style.fill = "none", t.style.stroke = "none", f(t.states, function(t) {
            t.style && (t.style.fill = t.style.stroke = "none");
        }));
    }
    function Uu(t, e, n, i) {
        var r = t.getData(), o = r.getLayout("valueAxisHorizontal") ? 1 : 0, a = r.getLayout("largeDataIndices"), s = r.getLayout("size"), l = t.getModel("backgroundStyle"), u = r.getLayout("largeBackgroundPoints");
        if (u) {
            var h = new Sb({
                shape: {
                    points: u
                },
                incremental: !!i,
                silent: !0,
                z2: 0
            });
            h.baseDimIdx = o, h.largeDataIndices = a, h.barWidth = s, h.useStyle(l.getItemStyle()), 
            e.add(h), n && n.push(h);
        }
        var c = new Sb({
            shape: {
                points: r.getLayout("largePoints")
            },
            incremental: !!i,
            ignoreCoarsePointer: !0,
            z2: 1
        });
        c.baseDimIdx = o, c.largeDataIndices = a, c.barWidth = s, e.add(c), c.useStyle(r.getVisual("style")), 
        ig(c).seriesIndex = t.seriesIndex, t.get("silent") || (c.on("mousedown", Mb), c.on("mousemove", Mb)), 
        n && n.push(c);
    }
    function Xu(t, e, n) {
        if (Bu(n, "cartesian2d")) {
            var i = e, r = n.getArea();
            return {
                x: t ? i.x : r.x,
                y: t ? r.y : i.y,
                width: t ? i.width : r.width,
                height: t ? r.height : i.height
            };
        }
        var o = e;
        return {
            cx: (r = n.getArea()).cx,
            cy: r.cy,
            r0: t ? r.r0 : o.r0,
            r: t ? r.r : o.r,
            startAngle: t ? o.startAngle : 0,
            endAngle: t ? o.endAngle : 2 * Math.PI
        };
    }
    function Yu(t, e) {
        var n = null == t ? "" : t + "";
        return e && (b(e) ? n = e.replace("{value}", n) : w(e) && (n = e(t))), n;
    }
    function qu(t, e, i, r) {
        f(Bb, function(o, a) {
            var l = s(s({}, Rb[a], !0), r, !0), u = function(t) {
                function i() {
                    var n = null !== t && t.apply(this, arguments) || this;
                    return n.type = e + "Axis." + a, n;
                }
                return n(i, t), i.prototype.mergeDefaultAndTheme = function(t, e) {
                    var n = Do(this), i = n ? Po(t) : {};
                    s(t, e.getTheme().get(a + "Axis")), s(t, this.getDefaultOption()), t.type = ju(t), 
                    n && Ao(t, i, n);
                }, i.prototype.optionUpdated = function() {
                    "category" === this.option.type && (this.__ordinalMeta = Qx.createByAxisModel(this));
                }, i.prototype.getCategories = function(t) {
                    var e = this.option;
                    return "category" === e.type ? t ? e.data : this.__ordinalMeta.categories : void 0;
                }, i.prototype.getOrdinalMeta = function() {
                    return this.__ordinalMeta;
                }, i.type = e + "Axis." + a, i.defaultOption = l, i;
            }(i);
            t.registerComponentModel(u);
        }), t.registerSubTypeDefaulter(e + "Axis", ju);
    }
    function ju(t) {
        return t.type || (t.data ? "category" : "value");
    }
    function Zu(t) {
        return "interval" === t.type || "time" === t.type;
    }
    function Ku(t, e, n) {
        n = n || {};
        var i = t.coordinateSystem, r = e.axis, o = {}, a = r.getAxesOnZeroOf()[0], s = r.position, l = a ? "onZero" : s, u = r.dim, h = i.getRect(), c = [ h.x, h.x + h.width, h.y, h.y + h.height ], p = {
            left: 0,
            right: 1,
            top: 0,
            bottom: 1,
            onZero: 2
        }, d = e.get("offset") || 0, f = "x" === u ? [ c[2] - d, c[3] + d ] : [ c[0] - d, c[1] + d ];
        if (a) {
            var g = a.toGlobalCoord(a.dataToCoord(0));
            f[p.onZero] = Math.max(Math.min(g, f[1]), f[0]);
        }
        o.position = [ "y" === u ? f[p[l]] : c[0], "x" === u ? f[p[l]] : c[3] ], o.rotation = Math.PI / 2 * ("x" === u ? 0 : 1);
        o.labelDirection = o.tickDirection = o.nameDirection = {
            top: -1,
            bottom: 1,
            left: -1,
            right: 1
        }[s], o.labelOffset = a ? f[p[s]] - f[p.onZero] : 0, e.get([ "axisTick", "inside" ]) && (o.tickDirection = -o.tickDirection), 
        L(n.labelInside, e.get([ "axisLabel", "inside" ])) && (o.labelDirection = -o.labelDirection);
        var y = e.get([ "axisLabel", "rotate" ]);
        return o.labelRotate = "top" === l ? -y : y, o.z2 = 1, o;
    }
    function $u(t) {
        return "cartesian2d" === t.get("coordinateSystem");
    }
    function Qu(t) {
        var e = {
            xAxisModel: null,
            yAxisModel: null
        };
        return f(e, function(n, i) {
            var r = i.replace(/Model$/, ""), o = t.getReferringComponents(r, Ed).models[0];
            e[i] = o;
        }), e;
    }
    function Ju(t, e) {
        return t.getCoordSysModel() === e;
    }
    function th(t, e, n, i) {
        function r(t) {
            return t.dim + "_" + t.index;
        }
        n.getAxesOnZeroOf = function() {
            return o ? [ o ] : [];
        };
        var o, a = t[e], s = n.model, l = s.get([ "axisLine", "onZero" ]), u = s.get([ "axisLine", "onZeroAxisIndex" ]);
        if (l) {
            if (null != u) eh(a[u]) && (o = a[u]); else for (var h in a) if (a.hasOwnProperty(h) && eh(a[h]) && !i[r(a[h])]) {
                o = a[h];
                break;
            }
            o && (i[r(o)] = !0);
        }
    }
    function eh(t) {
        return t && "category" !== t.type && "time" !== t.type && function(t) {
            var e = t.scale.getExtent(), n = e[0], i = e[1];
            return !(n > 0 && i > 0 || 0 > n && 0 > i);
        }(t);
    }
    function nh(t) {
        t && (t.ignore = !0);
    }
    function ih(t, e) {
        var n = t && t.getBoundingRect().clone(), i = e && e.getBoundingRect().clone();
        if (n && i) {
            var r = _t([]);
            return St(r, r, -t.rotation), n.applyTransform(wt([], r, t.getLocalTransform())), 
            i.applyTransform(wt([], r, e.getLocalTransform())), n.intersect(i);
        }
    }
    function rh(t) {
        return "middle" === t || "center" === t;
    }
    function oh(t, e, n, i, r) {
        for (var o = [], a = [], s = [], l = 0; l < t.length; l++) {
            var u = t[l].coord;
            a[0] = u, a[1] = 0, s[0] = u, s[1] = n, e && (rt(a, a, e), rt(s, s, e));
            var h = new ay({
                shape: {
                    x1: a[0],
                    y1: a[1],
                    x2: s[0],
                    y2: s[1]
                },
                style: i,
                z2: 2,
                autoBatch: !0,
                silent: !0
            });
            kr(h.shape, h.style.lineWidth), h.anid = r + "_" + t[l].tickValue, o.push(h);
        }
        return o;
    }
    function ah(t, e) {
        var n = {
            axesInfo: {},
            seriesInvolved: !1,
            coordSysAxesInfo: {},
            coordSysMap: {}
        };
        return function(t, e, n) {
            var i = e.getComponent("tooltip"), r = e.getComponent("axisPointer"), o = r.get("link", !0) || [], a = [];
            f(n.getCoordinateSystems(), function(n) {
                function s(i, s, l) {
                    var c = l.model.getModel("axisPointer", r), p = c.get("show");
                    if (p && ("auto" !== p || i || ch(c))) {
                        null == s && (s = c.get("triggerTooltip"));
                        var d = (c = i ? sh(l, h, r, e, i, s) : c).get("snap"), f = c.get("triggerEmphasis"), g = ph(l.model), y = s || d || "category" === l.type, v = t.axesInfo[g] = {
                            key: g,
                            axis: l,
                            coordSys: n,
                            axisPointerModel: c,
                            triggerTooltip: s,
                            triggerEmphasis: f,
                            involveSeries: y,
                            snap: d,
                            useHandle: ch(c),
                            seriesModels: [],
                            linkGroup: null
                        };
                        u[g] = v, t.seriesInvolved = t.seriesInvolved || y;
                        var m = function(t, e) {
                            for (var n = e.model, i = e.dim, r = 0; r < t.length; r++) {
                                var o = t[r] || {};
                                if (lh(o[i + "AxisId"], n.id) || lh(o[i + "AxisIndex"], n.componentIndex) || lh(o[i + "AxisName"], n.name)) return r;
                            }
                        }(o, l);
                        if (null != m) {
                            var _ = a[m] || (a[m] = {
                                axesInfo: {}
                            });
                            _.axesInfo[g] = v, _.mapper = o[m].mapper, v.linkGroup = _;
                        }
                    }
                }
                if (n.axisPointerEnabled) {
                    var l = ph(n.model), u = t.coordSysAxesInfo[l] = {};
                    t.coordSysMap[l] = n;
                    var h = n.model.getModel("tooltip", i);
                    if (f(n.getAxes(), _(s, !1, null)), n.getTooltipAxes && i && h.get("show")) {
                        var c = "axis" === h.get("trigger"), p = "cross" === h.get([ "axisPointer", "type" ]), d = n.getTooltipAxes(h.get([ "axisPointer", "axis" ]));
                        (c || p) && f(d.baseAxes, _(s, !p || "cross", c)), p && f(d.otherAxes, _(s, "cross", !1));
                    }
                }
            });
        }(n, t, e), n.seriesInvolved && function(t, e) {
            e.eachSeries(function(e) {
                var n = e.coordinateSystem, i = e.get([ "tooltip", "trigger" ], !0), r = e.get([ "tooltip", "show" ], !0);
                n && "none" !== i && !1 !== i && "item" !== i && !1 !== r && !1 !== e.get([ "axisPointer", "show" ], !0) && f(t.coordSysAxesInfo[ph(n.model)], function(t) {
                    var i = t.axis;
                    n.getAxis(i.dim) === i && (t.seriesModels.push(e), null == t.seriesDataCount && (t.seriesDataCount = 0), 
                    t.seriesDataCount += e.getData().count());
                });
            });
        }(n, t), n;
    }
    function sh(t, e, n, i, r, o) {
        var s = e.getModel("axisPointer"), l = {};
        f([ "type", "snap", "lineStyle", "shadowStyle", "label", "animation", "animationDurationUpdate", "animationEasingUpdate", "z" ], function(t) {
            l[t] = a(s.get(t));
        }), l.snap = "category" !== t.type && !!o, "cross" === s.get("type") && (l.type = "line");
        var h = l.label || (l.label = {});
        if (null == h.show && (h.show = !1), "cross" === r) {
            var c = s.get([ "label", "show" ]);
            if (h.show = null == c || c, !o) {
                var p = l.lineStyle = s.get("crossStyle");
                p && u(h, p.textStyle);
            }
        }
        return t.model.getModel("axisPointer", new Yy(l, n, i));
    }
    function lh(t, e) {
        return "all" === t || x(t) && h(t, e) >= 0 || t === e;
    }
    function uh(t) {
        var e = hh(t);
        if (e) {
            var n = e.axisPointerModel, i = e.axis.scale, r = n.option, o = n.get("status"), a = n.get("value");
            null != a && (a = i.parse(a));
            var s = ch(n);
            null == o && (r.status = s ? "show" : "hide");
            var l = i.getExtent().slice();
            l[0] > l[1] && l.reverse(), (null == a || a > l[1]) && (a = l[1]), a < l[0] && (a = l[0]), 
            r.value = a, s && (r.status = e.axis.scale.isBlank() ? "hide" : "show");
        }
    }
    function hh(t) {
        var e = (t.ecModel.getComponent("axisPointer") || {}).coordSysAxesInfo;
        return e && e.axesInfo[ph(t)];
    }
    function ch(t) {
        return !!t.get([ "handle", "show" ]);
    }
    function ph(t) {
        return t.type + "||" + t.id;
    }
    function dh(t, e, n, i) {
        yh(t, e, n, i), n.dispatchAction({
            type: "legendToggleSelect",
            name: null != t ? t : e
        }), gh(t, e, n, i);
    }
    function fh(t) {
        for (var e, n = t.getZr().storage.getDisplayList(), i = 0, r = n.length; r > i && !(e = n[i].states.emphasis); ) i++;
        return e && e.hoverLayer;
    }
    function gh(t, e, n, i) {
        fh(n) || n.dispatchAction({
            type: "highlight",
            seriesName: t,
            name: e,
            excludeSeriesId: i
        });
    }
    function yh(t, e, n, i) {
        fh(n) || n.dispatchAction({
            type: "downplay",
            seriesName: t,
            name: e,
            excludeSeriesId: i
        });
    }
    function vh(t) {
        var e = t.findComponents({
            mainType: "legend"
        });
        e && e.length && t.filterSeries(function(t) {
            for (var n = 0; n < e.length; n++) if (!e[n].isSelected(t.name)) return !1;
            return !0;
        });
    }
    function mh(t, e, n) {
        var i, r = {}, o = "toggleSelected" === t;
        return n.eachComponent("legend", function(n) {
            o && null != i ? n[i ? "select" : "unSelect"](e.name) : "allSelect" === t || "inverseSelect" === t ? n[t]() : (n[t](e.name), 
            i = n.isSelected(e.name)), f(n.getData(), function(t) {
                var e = t.get("name");
                if ("\n" !== e && "" !== e) {
                    var i = n.isSelected(e);
                    r[e] = r.hasOwnProperty(e) ? r[e] && i : i;
                }
            });
        }), "allSelect" === t || "inverseSelect" === t ? {
            selected: r
        } : {
            name: e.name,
            selected: r
        };
    }
    function _h(t) {
        t.registerComponentModel(rS), t.registerComponentView(lS), t.registerProcessor(t.PRIORITY.PROCESSOR.SERIES_FILTER, vh), 
        t.registerSubTypeDefaulter("legend", function() {
            return "plain";
        }), function(t) {
            t.registerAction("legendToggleSelect", "legendselectchanged", _(mh, "toggleSelected")), 
            t.registerAction("legendAllSelect", "legendselectall", _(mh, "allSelect")), t.registerAction("legendInverseSelect", "legendinverseselect", _(mh, "inverseSelect")), 
            t.registerAction("legendSelect", "legendselected", _(mh, "select")), t.registerAction("legendUnSelect", "legendunselected", _(mh, "unSelect"));
        }(t);
    }
    function xh(t, e, n) {
        var i = [ 1, 1 ];
        i[t.getOrient().index] = 0, Ao(e, n, {
            type: "box",
            ignoreSize: !!i
        });
    }
    function wh(t, e, n, i) {
        (function t(e, n) {
            if (T(e) && T(n)) {
                var i = !0;
                return f(n, function(n, r) {
                    i = i && t(e[r], n);
                }), !!i;
            }
            return e === n;
        })(fS(n).lastProp, i) || (fS(n).lastProp = i, e ? fr(n, i, t) : (n.stopAnimation(), 
        n.attr(i)));
    }
    function bh(t, e) {
        t[e.get([ "label", "show" ]) ? "show" : "hide"]();
    }
    function Sh(t) {
        return {
            x: t.x || 0,
            y: t.y || 0,
            rotation: t.rotation || 0
        };
    }
    function Mh(t, e, n) {
        var i = e.get("z"), r = e.get("zlevel");
        t && t.traverse(function(t) {
            "group" !== t.type && (null != i && (t.z = i), null != r && (t.zlevel = r), t.silent = n);
        });
    }
    function Th(t, e, n, i, r) {
        var o = Ch(n.get("value"), e.axis, e.ecModel, n.get("seriesDataIndices"), {
            precision: n.get([ "label", "precision" ]),
            formatter: n.get([ "label", "formatter" ])
        }), a = n.getModel("label"), s = hv(a.get("padding") || 0), l = a.getFont(), u = Ee(o, l), h = r.position, c = u.width + s[1] + s[3], p = u.height + s[0] + s[2], d = r.align;
        "right" === d && (h[0] -= c), "center" === d && (h[0] -= c / 2);
        var f = r.verticalAlign;
        "bottom" === f && (h[1] -= p), "middle" === f && (h[1] -= p / 2), function(t, e, n, i) {
            var r = i.getWidth(), o = i.getHeight();
            t[0] = Math.min(t[0] + e, r) - e, t[1] = Math.min(t[1] + n, o) - n, t[0] = Math.max(t[0], 0), 
            t[1] = Math.max(t[1], 0);
        }(h, c, p, i);
        var g = a.get("backgroundColor");
        g && "auto" !== g || (g = e.get([ "axisLine", "lineStyle", "color" ])), t.label = {
            x: h[0],
            y: h[1],
            style: Ur(a, {
                text: o,
                font: l,
                fill: a.getTextColor(),
                padding: s,
                backgroundColor: g
            }),
            z2: 10
        };
    }
    function Ch(t, e, n, i, r) {
        t = e.scale.parse(t);
        var o = e.scale.getLabel({
            value: t
        }, {
            precision: r.precision
        }), a = r.formatter;
        if (a) {
            var s = {
                value: Kl(e, {
                    value: t
                }),
                axisDimension: e.dim,
                axisIndex: e.index,
                seriesData: []
            };
            f(i, function(t) {
                var e = n.getSeriesByIndex(t.seriesIndex), i = t.dataIndexInside, r = e && e.getDataParams(i);
                r && s.seriesData.push(r);
            }), b(a) ? o = a.replace("{value}", o) : w(a) && (o = a(s));
        }
        return o;
    }
    function Ih(t, e, n) {
        var i = [ 1, 0, 0, 1, 0, 0 ];
        return St(i, i, n.rotation), bt(i, i, n.position), Ar([ t.dataToCoord(e), (n.labelOffset || 0) + (n.labelDirection || 1) * (n.labelMargin || 0) ], i);
    }
    function kh(t, e, n) {
        return {
            x: t[n = n || 0],
            y: t[1 - n],
            width: e[n],
            height: e[1 - n]
        };
    }
    function Dh(t, e) {
        var n = {};
        return n[e.dim + "AxisIndex"] = e.index, t.getCartesian(n);
    }
    function Ah(t) {
        return "x" === t.dim ? 0 : 1;
    }
    function Ph(t, e, n) {
        if (!ic.node) {
            var i = e.getZr();
            xS(i).records || (xS(i).records = {}), function(t, e) {
                function n(n, i) {
                    t.on(n, function(n) {
                        var r = function(t) {
                            var e = {
                                showTip: [],
                                hideTip: []
                            };
                            return {
                                dispatchAction: function n(i) {
                                    var r = e[i.type];
                                    r ? r.push(i) : (i.dispatchAction = n, t.dispatchAction(i));
                                },
                                pendings: e
                            };
                        }(e);
                        wS(xS(t).records, function(t) {
                            t && i(t, n, r.dispatchAction);
                        }), function(t, e) {
                            var n, i = t.showTip.length, r = t.hideTip.length;
                            i ? n = t.showTip[i - 1] : r && (n = t.hideTip[r - 1]), n && (n.dispatchAction = null, 
                            e.dispatchAction(n));
                        }(r.pendings, e);
                    });
                }
                xS(t).initialized || (xS(t).initialized = !0, n("click", _(Oh, "click")), n("mousemove", _(Oh, "mousemove")), 
                n("globalout", Lh));
            }(i, e), (xS(i).records[t] || (xS(i).records[t] = {})).handler = n;
        }
    }
    function Lh(t, e, n) {
        t.handler("leave", null, n);
    }
    function Oh(t, e, n, i) {
        e.handler(t, n, i);
    }
    function Rh(t, e) {
        if (!ic.node) {
            var n = e.getZr();
            (xS(n).records || {})[t] && (xS(n).records[t] = null);
        }
    }
    function Bh(t, e) {
        var n, i = [], r = t.seriesIndex;
        if (null == r || !(n = e.getSeriesByIndex(r))) return {
            point: []
        };
        var o = n.getData(), a = Mn(o, t);
        if (null == a || 0 > a || x(a)) return {
            point: []
        };
        var s = o.getItemGraphicEl(a), l = n.coordinateSystem;
        if (n.getTooltipPosition) i = n.getTooltipPosition(a) || []; else if (l && l.dataToPoint) if (t.isStacked) {
            var u = l.getBaseAxis(), h = l.getOtherAxis(u).dim, c = u.dim, p = "x" === h || "radius" === h ? 1 : 0, d = o.mapDimension(c), f = [];
            f[p] = o.get(d, a), f[1 - p] = o.get(o.getCalculationInfo("stackResultDimension"), a), 
            i = l.dataToPoint(f) || [];
        } else i = l.dataToPoint(o.getValues(g(l.dimensions, function(t) {
            return o.mapDimension(t);
        }), a)) || []; else if (s) {
            var y = s.getBoundingRect().clone();
            y.applyTransform(s.transform), i = [ y.x + y.width / 2, y.y + y.height / 2 ];
        }
        return {
            point: i,
            el: s
        };
    }
    function Eh(t, e, n) {
        var i = t.currTrigger, r = [ t.x, t.y ], o = t, a = t.dispatchAction || Sc(n.dispatchAction, n), s = e.getComponent("axisPointer").coordSysAxesInfo;
        if (s) {
            Hh(r) && (r = Bh({
                seriesIndex: o.seriesIndex,
                dataIndex: o.dataIndex
            }, e).point);
            var l = Hh(r), u = o.axesInfo, h = s.axesInfo, c = "leave" === i || Hh(r), p = {}, d = {}, g = {
                list: [],
                map: {}
            }, y = {
                showPointer: _(Nh, d),
                showTooltip: _(Fh, g)
            };
            f(s.coordSysMap, function(t, e) {
                var n = l || t.containPoint(r);
                f(s.coordSysAxesInfo[e], function(t) {
                    var e = t.axis, i = function(t, e) {
                        for (var n = 0; n < (t || []).length; n++) {
                            var i = t[n];
                            if (e.axis.dim === i.axisDim && e.axis.model.componentIndex === i.axisIndex) return i;
                        }
                    }(u, t);
                    if (!c && n && (!u || i)) {
                        var o = i && i.value;
                        null != o || l || (o = e.pointToData(r)), null != o && zh(t, o, y, !1, p);
                    }
                });
            });
            var v = {};
            return f(h, function(t, e) {
                var n = t.linkGroup;
                n && !d[e] && f(n.axesInfo, function(e, i) {
                    var r = d[i];
                    if (e !== t && r) {
                        var o = r.value;
                        n.mapper && (o = t.axis.scale.parse(n.mapper(o, Vh(e), Vh(t)))), v[t.key] = o;
                    }
                });
            }), f(v, function(t, e) {
                zh(h[e], t, y, !0, p);
            }), function(t, e, n) {
                var i = n.axesInfo = [];
                f(e, function(e, n) {
                    var r = e.axisPointerModel.option, o = t[n];
                    o ? (!e.useHandle && (r.status = "show"), r.value = o.value, r.seriesDataIndices = (o.payloadBatch || []).slice()) : !e.useHandle && (r.status = "hide"), 
                    "show" === r.status && i.push({
                        axisDim: e.axis.dim,
                        axisIndex: e.axis.model.componentIndex,
                        value: r.value
                    });
                });
            }(d, h, p), function(t, e, n, i) {
                if (Hh(e) || !t.list.length) return void i({
                    type: "hideTip"
                });
                var r = ((t.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
                i({
                    type: "showTip",
                    escapeConnect: !0,
                    x: e[0],
                    y: e[1],
                    tooltipOption: n.tooltipOption,
                    position: n.position,
                    dataIndexInside: r.dataIndexInside,
                    dataIndex: r.dataIndex,
                    seriesIndex: r.seriesIndex,
                    dataByCoordSys: t.list
                });
            }(g, r, t, a), function(t, e, n) {
                var i = n.getZr(), r = "axisPointerLastHighlights", o = SS(i)[r] || {}, a = SS(i)[r] = {};
                f(t, function(t) {
                    var e = t.axisPointerModel.option;
                    "show" === e.status && t.triggerEmphasis && f(e.seriesDataIndices, function(t) {
                        var e = t.seriesIndex + " | " + t.dataIndex;
                        a[e] = t;
                    });
                });
                var s = [], l = [];
                f(o, function(t, e) {
                    !a[e] && l.push(t);
                }), f(a, function(t, e) {
                    !o[e] && s.push(t);
                }), l.length && n.dispatchAction({
                    type: "downplay",
                    escapeConnect: !0,
                    notBlur: !0,
                    batch: l
                }), s.length && n.dispatchAction({
                    type: "highlight",
                    escapeConnect: !0,
                    notBlur: !0,
                    batch: s
                });
            }(h, 0, n), p;
        }
    }
    function zh(t, e, n, i, r) {
        var o = t.axis;
        if (!o.scale.isBlank() && o.containData(e)) {
            if (!t.involveSeries) return void n.showPointer(t, e);
            var a = function(t, e) {
                var n = e.axis, i = n.dim, r = t, o = [], a = Number.MAX_VALUE, s = -1;
                return f(e.seriesModels, function(e) {
                    var l, u, h = e.getData().mapDimensionsAll(i);
                    if (e.getAxisTooltipData) {
                        var c = e.getAxisTooltipData(h, t, n);
                        u = c.dataIndices, l = c.nestestValue;
                    } else {
                        if (!(u = e.getData().indicesOfNearest(h[0], t, "category" === n.type ? .5 : null)).length) return;
                        l = e.getData().get(h[0], u[0]);
                    }
                    if (null != l && isFinite(l)) {
                        var p = t - l, d = Math.abs(p);
                        a >= d && ((a > d || p >= 0 && 0 > s) && (a = d, s = p, r = l, o.length = 0), f(u, function(t) {
                            o.push({
                                seriesIndex: e.seriesIndex,
                                dataIndexInside: t,
                                dataIndex: e.getData().getRawIndex(t)
                            });
                        }));
                    }
                }), {
                    payloadBatch: o,
                    snapToValue: r
                };
            }(e, t), s = a.payloadBatch, u = a.snapToValue;
            s[0] && null == r.seriesIndex && l(r, s[0]), !i && t.snap && o.containData(u) && null != u && (e = u), 
            n.showPointer(t, e, s), n.showTooltip(t, a, u);
        }
    }
    function Nh(t, e, n, i) {
        t[e.key] = {
            value: n,
            payloadBatch: i
        };
    }
    function Fh(t, e, n, i) {
        var r = n.payloadBatch, o = e.axis, a = o.model, s = e.axisPointerModel;
        if (e.triggerTooltip && r.length) {
            var l = e.coordSys.model, u = ph(l), h = t.map[u];
            h || (h = t.map[u] = {
                coordSysId: l.id,
                coordSysIndex: l.componentIndex,
                coordSysType: l.type,
                coordSysMainType: l.mainType,
                dataByAxis: []
            }, t.list.push(h)), h.dataByAxis.push({
                axisDim: o.dim,
                axisIndex: a.componentIndex,
                axisType: a.type,
                axisId: a.id,
                value: i,
                valueLabelOpt: {
                    precision: s.get([ "label", "precision" ]),
                    formatter: s.get([ "label", "formatter" ])
                },
                seriesDataIndices: r.slice()
            });
        }
    }
    function Vh(t) {
        var e = t.axis.model, n = {}, i = n.axisDim = t.axis.dim;
        return n.axisIndex = n[i + "AxisIndex"] = e.componentIndex, n.axisName = n[i + "AxisName"] = e.name, 
        n.axisId = n[i + "AxisId"] = e.id, n;
    }
    function Hh(t) {
        return !t || null == t[0] || isNaN(t[0]) || null == t[1] || isNaN(t[1]);
    }
    function Wh(t) {
        Yb.registerAxisPointerClass("CartesianAxisPointer", vS), t.registerComponentModel(_S), 
        t.registerComponentView(bS), t.registerPreprocessor(function(t) {
            if (t) {
                (!t.axisPointer || 0 === t.axisPointer.length) && (t.axisPointer = {});
                var e = t.axisPointer.link;
                e && !x(e) && (t.axisPointer.link = [ e ]);
            }
        }), t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC, function(t, e) {
            t.getComponent("axisPointer").coordSysAxesInfo = ah(t, e);
        }), t.registerAction({
            type: "updateAxisPointer",
            event: "updateAxisPointer",
            update: ":updateAxisPointer"
        }, Eh);
    }
    function Gh(t) {
        var e = t.get("confine");
        return null != e ? !!e : "richText" === t.get("renderMode");
    }
    function Uh(t) {
        if (ic.domSupported) for (var e = document.documentElement.style, n = 0, i = t.length; i > n; n++) if (t[n] in e) return t[n];
    }
    function Xh(t, e) {
        if (!t) return e;
        e = wo(e, !0);
        var n = t.indexOf(e);
        return (t = -1 === n ? e : "-" + t.slice(0, n) + "-" + e).toLowerCase();
    }
    function Yh(t, e, n) {
        var i = t.toFixed(0) + "px", r = e.toFixed(0) + "px";
        if (!ic.transformSupported) return n ? "top:" + r + ";left:" + i + ";" : [ [ "top", r ], [ "left", i ] ];
        var o = ic.transform3dSupported, a = "translate" + (o ? "3d" : "") + "(" + i + "," + r + (o ? ",0" : "") + ")";
        return n ? "top:0;left:0;" + IS + ":" + a + ";" : [ [ "top", 0 ], [ "left", 0 ], [ TS, a ] ];
    }
    function qh(t, e, n) {
        var i = [], r = t.get("transitionDuration"), o = t.get("backgroundColor"), a = t.get("shadowBlur"), s = t.get("shadowColor"), l = t.get("shadowOffsetX"), u = t.get("shadowOffsetY"), h = t.getModel("textStyle"), c = Ea(t, "html"), p = l + "px " + u + "px " + a + "px " + s;
        return i.push("box-shadow:" + p), e && r && i.push(function(t, e) {
            var n = "cubic-bezier(0.23,1,0.32,1)", i = " " + t / 2 + "s " + n, r = "opacity" + i + ",visibility" + i;
            return e || (i = " " + t + "s " + n, r += ic.transformSupported ? "," + IS + i : ",left" + i + ",top" + i), 
            CS + ":" + r;
        }(r, n)), o && i.push("background-color:" + o), f([ "width", "color", "radius" ], function(e) {
            var n = "border-" + e, r = wo(n), o = t.get(r);
            null != o && i.push(n + ":" + o + ("color" === e ? "" : "px"));
        }), i.push(function(t) {
            var e = [], n = t.get("fontSize"), i = t.getTextColor();
            i && e.push("color:" + i), e.push("font:" + t.getFont()), n && e.push("line-height:" + Math.round(3 * n / 2) + "px");
            var r = t.get("textShadowColor"), o = t.get("textShadowBlur") || 0, a = t.get("textShadowOffsetX") || 0, s = t.get("textShadowOffsetY") || 0;
            return r && o && e.push("text-shadow:" + a + "px " + s + "px " + o + "px " + r), 
            f([ "decoration", "align" ], function(n) {
                var i = t.get(n);
                i && e.push("text-" + n + ":" + i);
            }), e.join(";");
        }(h)), null != c && i.push("padding:" + hv(c).join("px ") + "px"), i.join(";") + ";";
    }
    function jh(t, e, n, i, r) {
        var o = e && e.painter;
        if (n) {
            var a = o && o.getViewportRoot();
            a && function(t, e, n, i, r) {
                ut(Vc, e, i, r, !0) && ut(t, n, Vc[0], Vc[1]);
            }(t, a, document.body, i, r);
        } else {
            t[0] = i, t[1] = r;
            var s = o && o.getViewportRootOffset();
            s && (t[0] += s.offsetLeft, t[1] += s.offsetTop);
        }
        t[2] = t[0] / e.getWidth(), t[3] = t[1] / e.getHeight();
    }
    function Zh(t) {
        return Math.max(0, t);
    }
    function Kh(t) {
        var e = Zh(t.shadowBlur || 0), n = Zh(t.shadowOffsetX || 0), i = Zh(t.shadowOffsetY || 0);
        return {
            left: Zh(e - n),
            right: Zh(e + n),
            top: Zh(e - i),
            bottom: Zh(e + i)
        };
    }
    function $h(t, e, n, i) {
        t[0] = n, t[1] = i, t[2] = t[0] / e.getWidth(), t[3] = t[1] / e.getHeight();
    }
    function Qh(t, e, n) {
        var i, r = e.ecModel;
        n ? (i = new Yy(n, r, r), i = new Yy(e.option, i, r)) : i = e;
        for (var o = t.length - 1; o >= 0; o--) {
            var a = t[o];
            a && (a instanceof Yy && (a = a.get("tooltip", !0)), b(a) && (a = {
                formatter: a
            }), a && (i = new Yy(a, i, r)));
        }
        return i;
    }
    function Jh(t, e) {
        return t.dispatchAction || Sc(e.dispatchAction, e);
    }
    function tc(t) {
        return "center" === t || "middle" === t;
    }
    var ec = function(t, e) {
        return (ec = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(t, e) {
            t.__proto__ = e;
        } || function(t, e) {
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        })(t, e);
    }, nc = function() {
        this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
    }, ic = new function() {
        this.browser = new nc(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, 
        this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, 
        this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = "undefined" != typeof window;
    }();
    "object" == ("undefined" == typeof wx ? "undefined" : t(wx)) && "function" == typeof wx.getSystemInfoSync ? (ic.wxa = !0, 
    ic.touchEventsSupported = !0) : "undefined" == typeof document && "undefined" != typeof self ? ic.worker = !0 : "undefined" == typeof navigator ? (ic.node = !0, 
    ic.svgSupported = !0) : function(t, e) {
        var n = e.browser, i = t.match(/Firefox\/([\d.]+)/), r = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/), o = t.match(/Edge?\/([\d.]+)/), a = /micromessenger/i.test(t);
        i && (n.firefox = !0, n.version = i[1]), r && (n.ie = !0, n.version = r[1]), o && (n.edge = !0, 
        n.version = o[1], n.newEdge = +o[1].split(".")[0] > 18), a && (n.weChat = !0), e.svgSupported = "undefined" != typeof SVGRect, 
        e.touchEventsSupported = "ontouchstart" in window && !n.ie && !n.edge, e.pointerEventsSupported = "onpointerdown" in window && (n.edge || n.ie && +n.version >= 11), 
        e.domSupported = "undefined" != typeof document;
        var s = document.documentElement.style;
        e.transform3dSupported = (n.ie && "transition" in s || n.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in s) && !("OTransition" in s), 
        e.transformSupported = e.transform3dSupported || n.ie && +n.version >= 9;
    }(navigator.userAgent, ic);
    var rc = 12, oc = rc + "px sans-serif", ac = 20, sc = 100, lc = function(t) {
        var e = {};
        if ("undefined" == typeof JSON) return e;
        for (var n = 0; n < t.length; n++) {
            var i = String.fromCharCode(n + 32), r = (t.charCodeAt(n) - ac) / sc;
            e[i] = r;
        }
        return e;
    }("007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N"), uc = {
        createCanvas: function() {
            return "undefined" != typeof document && document.createElement("canvas");
        },
        measureText: function() {
            var t, e;
            return function(n, i) {
                if (!t) {
                    var r = uc.createCanvas();
                    t = r && r.getContext("2d");
                }
                if (t) return e !== i && (e = t.font = i || oc), t.measureText(n);
                n = n || "";
                var o = /(\d+)px/.exec(i = i || oc), a = o && +o[1] || rc, s = 0;
                if (i.indexOf("mono") >= 0) s = a * n.length; else for (var l = 0; l < n.length; l++) {
                    var u = lc[n[l]];
                    s += null == u ? a : u * a;
                }
                return {
                    width: s
                };
            };
        }(),
        loadImage: function(t, e, n) {
            var i = new Image();
            return i.onload = e, i.onerror = n, i.src = t, i;
        }
    }, hc = y([ "Function", "RegExp", "Date", "Error", "CanvasGradient", "CanvasPattern", "Image", "Canvas" ], function(t, e) {
        return t["[object " + e + "]"] = !0, t;
    }, {}), cc = y([ "Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64" ], function(t, e) {
        return t["[object " + e + "Array]"] = !0, t;
    }, {}), pc = Object.prototype.toString, dc = Array.prototype, fc = dc.forEach, gc = dc.filter, yc = dc.slice, vc = dc.map, mc = function() {}.constructor, _c = mc ? mc.prototype : null, xc = "__proto__", wc = 2311, bc = uc.createCanvas, Sc = _c && w(_c.bind) ? _c.call.bind(_c.bind) : function(t, e) {
        for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
        return function() {
            return t.apply(e, n.concat(yc.call(arguments)));
        };
    }, Mc = "__ec_primitive__", Tc = function() {
        function t() {
            this.data = {};
        }
        return t.prototype.delete = function(t) {
            var e = this.has(t);
            return e && delete this.data[t], e;
        }, t.prototype.has = function(t) {
            return this.data.hasOwnProperty(t);
        }, t.prototype.get = function(t) {
            return this.data[t];
        }, t.prototype.set = function(t, e) {
            return this.data[t] = e, this;
        }, t.prototype.keys = function() {
            return m(this.data);
        }, t.prototype.forEach = function(t) {
            var e = this.data;
            for (var n in e) e.hasOwnProperty(n) && t(e[n], n);
        }, t;
    }(), Cc = "function" == typeof Map, Ic = function() {
        function t(e) {
            function n(t, e) {
                i ? r.set(t, e) : r.set(e, t);
            }
            var i = x(e);
            this.data = Cc ? new Map() : new Tc();
            var r = this;
            e instanceof t ? e.each(n) : e && f(e, n);
        }
        return t.prototype.hasKey = function(t) {
            return this.data.has(t);
        }, t.prototype.get = function(t) {
            return this.data.get(t);
        }, t.prototype.set = function(t, e) {
            return this.data.set(t, e), e;
        }, t.prototype.each = function(t, e) {
            this.data.forEach(function(n, i) {
                t.call(e, n, i);
            });
        }, t.prototype.keys = function() {
            var t = this.data.keys();
            return Cc ? Array.from(t) : t;
        }, t.prototype.removeKey = function(t) {
            this.data.delete(t);
        }, t;
    }(), kc = 180 / Math.PI, Dc = (Object.freeze || Object)({
        guid: r,
        logError: o,
        clone: a,
        merge: s,
        mergeAll: function(t, e) {
            for (var n = t[0], i = 1, r = t.length; r > i; i++) n = s(n, t[i], e);
            return n;
        },
        extend: l,
        defaults: u,
        createCanvas: bc,
        indexOf: h,
        inherits: c,
        mixin: p,
        isArrayLike: d,
        each: f,
        map: g,
        reduce: y,
        filter: v,
        find: function(t, e, n) {
            if (t && e) for (var i = 0, r = t.length; r > i; i++) if (e.call(n, t[i], i, t)) return t[i];
        },
        keys: m,
        bind: Sc,
        curry: _,
        isArray: x,
        isFunction: w,
        isString: b,
        isStringSafe: S,
        isNumber: M,
        isObject: T,
        isBuiltInObject: C,
        isTypedArray: I,
        isDom: k,
        isGradientObject: D,
        isImagePatternObject: A,
        isRegExp: function(t) {
            return "[object RegExp]" === pc.call(t);
        },
        eqNaN: P,
        retrieve: L,
        retrieve2: O,
        retrieve3: R,
        slice: B,
        normalizeCssArray: E,
        assert: z,
        trim: N,
        setAsPrimitive: F,
        isPrimitive: V,
        HashMap: Ic,
        createHashMap: H,
        concatArray: W,
        createObject: G,
        disableUserSelect: U,
        hasOwn: X,
        noop: Y,
        RADIAN_TO_DEGREE: kc
    }), Ac = $, Pc = Q, Lc = et, Oc = nt, Rc = (Object.freeze || Object)({
        create: q,
        copy: function(t, e) {
            return t[0] = e[0], t[1] = e[1], t;
        },
        clone: j,
        set: function(t, e, n) {
            return t[0] = e, t[1] = n, t;
        },
        add: Z,
        scaleAndAdd: function(t, e, n, i) {
            return t[0] = e[0] + n[0] * i, t[1] = e[1] + n[1] * i, t;
        },
        sub: K,
        len: $,
        length: Ac,
        lenSquare: Q,
        lengthSquare: Pc,
        mul: function(t, e, n) {
            return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t;
        },
        div: function(t, e, n) {
            return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t;
        },
        dot: function(t, e) {
            return t[0] * e[0] + t[1] * e[1];
        },
        scale: J,
        normalize: tt,
        distance: et,
        dist: Lc,
        distanceSquare: nt,
        distSquare: Oc,
        negate: function(t, e) {
            return t[0] = -e[0], t[1] = -e[1], t;
        },
        lerp: it,
        applyTransform: rt,
        min: ot,
        max: at
    }), Bc = function(t, e) {
        this.target = t, this.topTarget = e && e.topTarget;
    }, Ec = function() {
        function t(t) {
            this.handler = t, t.on("mousedown", this._dragStart, this), t.on("mousemove", this._drag, this), 
            t.on("mouseup", this._dragEnd, this);
        }
        return t.prototype._dragStart = function(t) {
            for (var e = t.target; e && !e.draggable; ) e = e.parent || e.__hostTarget;
            e && (this._draggingTarget = e, e.dragging = !0, this._x = t.offsetX, this._y = t.offsetY, 
            this.handler.dispatchToElement(new Bc(e, t), "dragstart", t.event));
        }, t.prototype._drag = function(t) {
            var e = this._draggingTarget;
            if (e) {
                var n = t.offsetX, i = t.offsetY, r = n - this._x, o = i - this._y;
                this._x = n, this._y = i, e.drift(r, o, t), this.handler.dispatchToElement(new Bc(e, t), "drag", t.event);
                var a = this.handler.findHover(n, i, e).target, s = this._dropTarget;
                this._dropTarget = a, e !== a && (s && a !== s && this.handler.dispatchToElement(new Bc(s, t), "dragleave", t.event), 
                a && a !== s && this.handler.dispatchToElement(new Bc(a, t), "dragenter", t.event));
            }
        }, t.prototype._dragEnd = function(t) {
            var e = this._draggingTarget;
            e && (e.dragging = !1), this.handler.dispatchToElement(new Bc(e, t), "dragend", t.event), 
            this._dropTarget && this.handler.dispatchToElement(new Bc(this._dropTarget, t), "drop", t.event), 
            this._draggingTarget = null, this._dropTarget = null;
        }, t;
    }(), zc = function() {
        function t(t) {
            t && (this._$eventProcessor = t);
        }
        return t.prototype.on = function(t, e, n, i) {
            this._$handlers || (this._$handlers = {});
            var r = this._$handlers;
            if ("function" == typeof e && (i = n, n = e, e = null), !n || !t) return this;
            var o = this._$eventProcessor;
            null != e && o && o.normalizeQuery && (e = o.normalizeQuery(e)), r[t] || (r[t] = []);
            for (var a = 0; a < r[t].length; a++) if (r[t][a].h === n) return this;
            var s = {
                h: n,
                query: e,
                ctx: i || this,
                callAtLast: n.zrEventfulCallAtLast
            }, l = r[t].length - 1, u = r[t][l];
            return u && u.callAtLast ? r[t].splice(l, 0, s) : r[t].push(s), this;
        }, t.prototype.isSilent = function(t) {
            var e = this._$handlers;
            return !e || !e[t] || !e[t].length;
        }, t.prototype.off = function(t, e) {
            var n = this._$handlers;
            if (!n) return this;
            if (!t) return this._$handlers = {}, this;
            if (e) {
                if (n[t]) {
                    for (var i = [], r = 0, o = n[t].length; o > r; r++) n[t][r].h !== e && i.push(n[t][r]);
                    n[t] = i;
                }
                n[t] && 0 === n[t].length && delete n[t];
            } else delete n[t];
            return this;
        }, t.prototype.trigger = function(t) {
            for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            if (!this._$handlers) return this;
            var i = this._$handlers[t], r = this._$eventProcessor;
            if (i) for (var o = e.length, a = i.length, s = 0; a > s; s++) {
                var l = i[s];
                if (!r || !r.filter || null == l.query || r.filter(t, l.query)) switch (o) {
                  case 0:
                    l.h.call(l.ctx);
                    break;

                  case 1:
                    l.h.call(l.ctx, e[0]);
                    break;

                  case 2:
                    l.h.call(l.ctx, e[0], e[1]);
                    break;

                  default:
                    l.h.apply(l.ctx, e);
                }
            }
            return r && r.afterTrigger && r.afterTrigger(t), this;
        }, t.prototype.triggerWithContext = function(t) {
            for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            if (!this._$handlers) return this;
            var i = this._$handlers[t], r = this._$eventProcessor;
            if (i) for (var o = e.length, a = e[o - 1], s = i.length, l = 0; s > l; l++) {
                var u = i[l];
                if (!r || !r.filter || null == u.query || r.filter(t, u.query)) switch (o) {
                  case 0:
                    u.h.call(a);
                    break;

                  case 1:
                    u.h.call(a, e[0]);
                    break;

                  case 2:
                    u.h.call(a, e[0], e[1]);
                    break;

                  default:
                    u.h.apply(a, e.slice(1, o - 1));
                }
            }
            return r && r.afterTrigger && r.afterTrigger(t), this;
        }, t;
    }(), Nc = Math.log(2), Fc = "___zrEVENTSAVED", Vc = [], Hc = /([&<>"'])/g, Wc = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }, Gc = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Uc = [], Xc = ic.browser.firefox && +ic.browser.version.split(".")[0] < 39, Yc = function(t) {
        t.preventDefault(), t.stopPropagation(), t.cancelBubble = !0;
    }, qc = function() {
        function t() {
            this._track = [];
        }
        return t.prototype.recognize = function(t, e, n) {
            return this._doTrack(t, e, n), this._recognize(t);
        }, t.prototype.clear = function() {
            return this._track.length = 0, this;
        }, t.prototype._doTrack = function(t, e, n) {
            var i = t.touches;
            if (i) {
                for (var r = {
                    points: [],
                    touches: [],
                    target: e,
                    event: t
                }, o = 0, a = i.length; a > o; o++) {
                    var s = i[o], l = pt(n, s, {});
                    r.points.push([ l.zrX, l.zrY ]), r.touches.push(s);
                }
                this._track.push(r);
            }
        }, t.prototype._recognize = function(t) {
            for (var e in jc) if (jc.hasOwnProperty(e)) {
                var n = jc[e](this._track, t);
                if (n) return n;
            }
        }, t;
    }(), jc = {
        pinch: function(t, e) {
            var n = t.length;
            if (n) {
                var i = (t[n - 1] || {}).points, r = (t[n - 2] || {}).points || i;
                if (r && r.length > 1 && i && i.length > 1) {
                    var o = vt(i) / vt(r);
                    !isFinite(o) && (o = 1), e.pinchScale = o;
                    var a = function(t) {
                        return [ (t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2 ];
                    }(i);
                    return e.pinchX = a[0], e.pinchY = a[1], {
                        type: "pinch",
                        target: t[0].target,
                        event: e
                    };
                }
            }
        }
    }, Zc = (Object.freeze || Object)({
        create: mt,
        identity: _t,
        copy: xt,
        mul: wt,
        translate: bt,
        rotate: St,
        scale: Mt,
        invert: Tt,
        clone: function(t) {
            var e = [ 1, 0, 0, 1, 0, 0 ];
            return xt(e, t), e;
        }
    }), Kc = function() {
        function t(t, e) {
            this.x = t || 0, this.y = e || 0;
        }
        return t.prototype.copy = function(t) {
            return this.x = t.x, this.y = t.y, this;
        }, t.prototype.clone = function() {
            return new t(this.x, this.y);
        }, t.prototype.set = function(t, e) {
            return this.x = t, this.y = e, this;
        }, t.prototype.equal = function(t) {
            return t.x === this.x && t.y === this.y;
        }, t.prototype.add = function(t) {
            return this.x += t.x, this.y += t.y, this;
        }, t.prototype.scale = function(t) {
            this.x *= t, this.y *= t;
        }, t.prototype.scaleAndAdd = function(t, e) {
            this.x += t.x * e, this.y += t.y * e;
        }, t.prototype.sub = function(t) {
            return this.x -= t.x, this.y -= t.y, this;
        }, t.prototype.dot = function(t) {
            return this.x * t.x + this.y * t.y;
        }, t.prototype.len = function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }, t.prototype.lenSquare = function() {
            return this.x * this.x + this.y * this.y;
        }, t.prototype.normalize = function() {
            var t = this.len();
            return this.x /= t, this.y /= t, this;
        }, t.prototype.distance = function(t) {
            var e = this.x - t.x, n = this.y - t.y;
            return Math.sqrt(e * e + n * n);
        }, t.prototype.distanceSquare = function(t) {
            var e = this.x - t.x, n = this.y - t.y;
            return e * e + n * n;
        }, t.prototype.negate = function() {
            return this.x = -this.x, this.y = -this.y, this;
        }, t.prototype.transform = function(t) {
            if (t) {
                var e = this.x, n = this.y;
                return this.x = t[0] * e + t[2] * n + t[4], this.y = t[1] * e + t[3] * n + t[5], 
                this;
            }
        }, t.prototype.toArray = function(t) {
            return t[0] = this.x, t[1] = this.y, t;
        }, t.prototype.fromArray = function(t) {
            this.x = t[0], this.y = t[1];
        }, t.set = function(t, e, n) {
            t.x = e, t.y = n;
        }, t.copy = function(t, e) {
            t.x = e.x, t.y = e.y;
        }, t.len = function(t) {
            return Math.sqrt(t.x * t.x + t.y * t.y);
        }, t.lenSquare = function(t) {
            return t.x * t.x + t.y * t.y;
        }, t.dot = function(t, e) {
            return t.x * e.x + t.y * e.y;
        }, t.add = function(t, e, n) {
            t.x = e.x + n.x, t.y = e.y + n.y;
        }, t.sub = function(t, e, n) {
            t.x = e.x - n.x, t.y = e.y - n.y;
        }, t.scale = function(t, e, n) {
            t.x = e.x * n, t.y = e.y * n;
        }, t.scaleAndAdd = function(t, e, n, i) {
            t.x = e.x + n.x * i, t.y = e.y + n.y * i;
        }, t.lerp = function(t, e, n, i) {
            var r = 1 - i;
            t.x = r * e.x + i * n.x, t.y = r * e.y + i * n.y;
        }, t;
    }(), $c = Math.min, Qc = Math.max, Jc = new Kc(), tp = new Kc(), ep = new Kc(), np = new Kc(), ip = new Kc(), rp = new Kc(), op = function() {
        function t(t, e, n, i) {
            0 > n && (t += n, n = -n), 0 > i && (e += i, i = -i), this.x = t, this.y = e, this.width = n, 
            this.height = i;
        }
        return t.prototype.union = function(t) {
            var e = $c(t.x, this.x), n = $c(t.y, this.y);
            this.width = isFinite(this.x) && isFinite(this.width) ? Qc(t.x + t.width, this.x + this.width) - e : t.width, 
            this.height = isFinite(this.y) && isFinite(this.height) ? Qc(t.y + t.height, this.y + this.height) - n : t.height, 
            this.x = e, this.y = n;
        }, t.prototype.applyTransform = function(e) {
            t.applyTransform(this, this, e);
        }, t.prototype.calculateTransform = function(t) {
            var e = this, n = t.width / e.width, i = t.height / e.height, r = [ 1, 0, 0, 1, 0, 0 ];
            return bt(r, r, [ -e.x, -e.y ]), Mt(r, r, [ n, i ]), bt(r, r, [ t.x, t.y ]), r;
        }, t.prototype.intersect = function(e, n) {
            if (!e) return !1;
            e instanceof t || (e = t.create(e));
            var i = this, r = i.x, o = i.x + i.width, a = i.y, s = i.y + i.height, l = e.x, u = e.x + e.width, h = e.y, c = e.y + e.height, p = !(l > o || r > u || h > s || a > c);
            if (n) {
                var d = 1 / 0, f = 0, g = Math.abs(o - l), y = Math.abs(u - r), v = Math.abs(s - h), m = Math.abs(c - a), _ = Math.min(g, y), x = Math.min(v, m);
                l > o || r > u ? _ > f && (f = _, y > g ? Kc.set(rp, -g, 0) : Kc.set(rp, y, 0)) : d > _ && (d = _, 
                y > g ? Kc.set(ip, g, 0) : Kc.set(ip, -y, 0)), h > s || a > c ? x > f && (f = x, 
                m > v ? Kc.set(rp, 0, -v) : Kc.set(rp, 0, m)) : d > _ && (d = _, m > v ? Kc.set(ip, 0, v) : Kc.set(ip, 0, -m));
            }
            return n && Kc.copy(n, p ? ip : rp), p;
        }, t.prototype.contain = function(t, e) {
            var n = this;
            return t >= n.x && t <= n.x + n.width && e >= n.y && e <= n.y + n.height;
        }, t.prototype.clone = function() {
            return new t(this.x, this.y, this.width, this.height);
        }, t.prototype.copy = function(e) {
            t.copy(this, e);
        }, t.prototype.plain = function() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            };
        }, t.prototype.isFinite = function() {
            return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
        }, t.prototype.isZero = function() {
            return 0 === this.width || 0 === this.height;
        }, t.create = function(e) {
            return new t(e.x, e.y, e.width, e.height);
        }, t.copy = function(t, e) {
            t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height;
        }, t.applyTransform = function(e, n, i) {
            if (i) {
                if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
                    var r = i[0], o = i[3], a = i[4], s = i[5];
                    return e.x = n.x * r + a, e.y = n.y * o + s, e.width = n.width * r, e.height = n.height * o, 
                    e.width < 0 && (e.x += e.width, e.width = -e.width), void (e.height < 0 && (e.y += e.height, 
                    e.height = -e.height));
                }
                Jc.x = ep.x = n.x, Jc.y = np.y = n.y, tp.x = np.x = n.x + n.width, tp.y = ep.y = n.y + n.height, 
                Jc.transform(i), np.transform(i), tp.transform(i), ep.transform(i), e.x = $c(Jc.x, tp.x, ep.x, np.x), 
                e.y = $c(Jc.y, tp.y, ep.y, np.y);
                var l = Qc(Jc.x, tp.x, ep.x, np.x), u = Qc(Jc.y, tp.y, ep.y, np.y);
                e.width = l - e.x, e.height = u - e.y;
            } else e !== n && t.copy(e, n);
        }, t;
    }(), ap = "silent", sp = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.handler = null, e;
        }
        return n(e, t), e.prototype.dispose = function() {}, e.prototype.setCursor = function() {}, 
        e;
    }(zc), lp = function(t, e) {
        this.x = t, this.y = e;
    }, up = [ "click", "dblclick", "mousewheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu" ], hp = new op(0, 0, 0, 0), cp = function(t) {
        function e(e, n, i, r, o) {
            var a = t.call(this) || this;
            return a._hovered = new lp(0, 0), a.storage = e, a.painter = n, a.painterRoot = r, 
            a._pointerSize = o, i = i || new sp(), a.proxy = null, a.setHandlerProxy(i), a._draggingMgr = new Ec(a), 
            a;
        }
        return n(e, t), e.prototype.setHandlerProxy = function(t) {
            this.proxy && this.proxy.dispose(), t && (f(up, function(e) {
                t.on && t.on(e, this[e], this);
            }, this), t.handler = this), this.proxy = t;
        }, e.prototype.mousemove = function(t) {
            var e = t.zrX, n = t.zrY, i = Dt(this, e, n), r = this._hovered, o = r.target;
            o && !o.__zr && (o = (r = this.findHover(r.x, r.y)).target);
            var a = this._hovered = i ? new lp(e, n) : this.findHover(e, n), s = a.target, l = this.proxy;
            l.setCursor && l.setCursor(s ? s.cursor : "default"), o && s !== o && this.dispatchToElement(r, "mouseout", t), 
            this.dispatchToElement(a, "mousemove", t), s && s !== o && this.dispatchToElement(a, "mouseover", t);
        }, e.prototype.mouseout = function(t) {
            var e = t.zrEventControl;
            "only_globalout" !== e && this.dispatchToElement(this._hovered, "mouseout", t), 
            "no_globalout" !== e && this.trigger("globalout", {
                type: "globalout",
                event: t
            });
        }, e.prototype.resize = function() {
            this._hovered = new lp(0, 0);
        }, e.prototype.dispatch = function(t, e) {
            var n = this[t];
            n && n.call(this, e);
        }, e.prototype.dispose = function() {
            this.proxy.dispose(), this.storage = null, this.proxy = null, this.painter = null;
        }, e.prototype.setCursorStyle = function(t) {
            var e = this.proxy;
            e.setCursor && e.setCursor(t);
        }, e.prototype.dispatchToElement = function(t, e, n) {
            var i = (t = t || {}).target;
            if (!i || !i.silent) {
                for (var r = "on" + e, o = function(t, e, n) {
                    return {
                        type: t,
                        event: n,
                        target: e.target,
                        topTarget: e.topTarget,
                        cancelBubble: !1,
                        offsetX: n.zrX,
                        offsetY: n.zrY,
                        gestureEvent: n.gestureEvent,
                        pinchX: n.pinchX,
                        pinchY: n.pinchY,
                        pinchScale: n.pinchScale,
                        wheelDelta: n.zrDelta,
                        zrByTouch: n.zrByTouch,
                        which: n.which,
                        stop: Ct
                    };
                }(e, t, n); i && (i[r] && (o.cancelBubble = !!i[r].call(i, o)), i.trigger(e, o), 
                i = i.__hostTarget ? i.__hostTarget : i.parent, !o.cancelBubble); ) ;
                o.cancelBubble || (this.trigger(e, o), this.painter && this.painter.eachOtherLayer && this.painter.eachOtherLayer(function(t) {
                    "function" == typeof t[r] && t[r].call(t, o), t.trigger && t.trigger(e, o);
                }));
            }
        }, e.prototype.findHover = function(t, e, n) {
            var i = this.storage.getDisplayList(), r = new lp(t, e);
            if (kt(i, r, t, e, n), this._pointerSize && !r.target) {
                for (var o = [], a = this._pointerSize, s = a / 2, l = new op(t - s, e - s, a, a), u = i.length - 1; u >= 0; u--) {
                    var h = i[u];
                    h === n || h.ignore || h.ignoreCoarsePointer || h.parent && h.parent.ignoreCoarsePointer || (hp.copy(h.getBoundingRect()), 
                    h.transform && hp.applyTransform(h.transform), hp.intersect(l) && o.push(h));
                }
                if (o.length) for (var c = Math.PI / 12, p = 2 * Math.PI, d = 0; s > d; d += 4) for (var f = 0; p > f; f += c) {
                    if (kt(o, r, t + d * Math.cos(f), e + d * Math.sin(f), n), r.target) return r;
                }
            }
            return r;
        }, e.prototype.processGesture = function(t, e) {
            this._gestureMgr || (this._gestureMgr = new qc());
            var n = this._gestureMgr;
            "start" === e && n.clear();
            var i = n.recognize(t, this.findHover(t.zrX, t.zrY, null).target, this.proxy.dom);
            if ("end" === e && n.clear(), i) {
                var r = i.type;
                t.gestureEvent = r;
                var o = new lp();
                o.target = i.target, this.dispatchToElement(o, r, i.event);
            }
        }, e;
    }(zc);
    f([ "click", "mousedown", "mouseup", "mousewheel", "dblclick", "contextmenu" ], function(t) {
        cp.prototype[t] = function(e) {
            var n, i, r = e.zrX, o = e.zrY, a = Dt(this, r, o);
            if ("mouseup" === t && a || (i = (n = this.findHover(r, o)).target), "mousedown" === t) this._downEl = i, 
            this._downPoint = [ e.zrX, e.zrY ], this._upEl = i; else if ("mouseup" === t) this._upEl = i; else if ("click" === t) {
                if (this._downEl !== this._upEl || !this._downPoint || Lc(this._downPoint, [ e.zrX, e.zrY ]) > 4) return;
                this._downPoint = null;
            }
            this.dispatchToElement(n, t, e);
        };
    });
    var pp = 32, dp = 7, fp = 1, gp = 4, yp = !1, vp = function() {
        function t() {
            this._roots = [], this._displayList = [], this._displayListLen = 0, this.displayableSortFunc = Et;
        }
        return t.prototype.traverse = function(t, e) {
            for (var n = 0; n < this._roots.length; n++) this._roots[n].traverse(t, e);
        }, t.prototype.getDisplayList = function(t, e) {
            e = e || !1;
            var n = this._displayList;
            return (t || !n.length) && this.updateDisplayList(e), n;
        }, t.prototype.updateDisplayList = function(t) {
            this._displayListLen = 0;
            for (var e = this._roots, n = this._displayList, i = 0, r = e.length; r > i; i++) this._updateAndAddDisplayable(e[i], null, t);
            n.length = this._displayListLen, Rt(n, Et);
        }, t.prototype._updateAndAddDisplayable = function(t, e, n) {
            if (!t.ignore || n) {
                t.beforeUpdate(), t.update(), t.afterUpdate();
                var i = t.getClipPath();
                if (t.ignoreClip) e = null; else if (i) {
                    e = e ? e.slice() : [];
                    for (var r = i, o = t; r; ) r.parent = o, r.updateTransform(), e.push(r), o = r, 
                    r = r.getClipPath();
                }
                if (t.childrenRef) {
                    for (var a = t.childrenRef(), s = 0; s < a.length; s++) {
                        var l = a[s];
                        t.__dirty && (l.__dirty |= fp), this._updateAndAddDisplayable(l, e, n);
                    }
                    t.__dirty = 0;
                } else {
                    var u = t;
                    e && e.length ? u.__clipPaths = e : u.__clipPaths && u.__clipPaths.length > 0 && (u.__clipPaths = []), 
                    isNaN(u.z) && (Bt(), u.z = 0), isNaN(u.z2) && (Bt(), u.z2 = 0), isNaN(u.zlevel) && (Bt(), 
                    u.zlevel = 0), this._displayList[this._displayListLen++] = u;
                }
                var h = t.getDecalElement && t.getDecalElement();
                h && this._updateAndAddDisplayable(h, e, n);
                var c = t.getTextGuideLine();
                c && this._updateAndAddDisplayable(c, e, n);
                var p = t.getTextContent();
                p && this._updateAndAddDisplayable(p, e, n);
            }
        }, t.prototype.addRoot = function(t) {
            t.__zr && t.__zr.storage === this || this._roots.push(t);
        }, t.prototype.delRoot = function(t) {
            if (t instanceof Array) for (var e = 0, n = t.length; n > e; e++) this.delRoot(t[e]); else {
                var i = h(this._roots, t);
                i >= 0 && this._roots.splice(i, 1);
            }
        }, t.prototype.delAllRoots = function() {
            this._roots = [], this._displayList = [], this._displayListLen = 0;
        }, t.prototype.getRoots = function() {
            return this._roots;
        }, t.prototype.dispose = function() {
            this._displayList = null, this._roots = null;
        }, t;
    }(), mp = ic.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(t) {
        return setTimeout(t, 16);
    }, _p = {
        linear: function(t) {
            return t;
        },
        quadraticIn: function(t) {
            return t * t;
        },
        quadraticOut: function(t) {
            return t * (2 - t);
        },
        quadraticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
        },
        cubicIn: function(t) {
            return t * t * t;
        },
        cubicOut: function(t) {
            return --t * t * t + 1;
        },
        cubicInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
        },
        quarticIn: function(t) {
            return t * t * t * t;
        },
        quarticOut: function(t) {
            return 1 - --t * t * t * t;
        },
        quarticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
        },
        quinticIn: function(t) {
            return t * t * t * t * t;
        },
        quinticOut: function(t) {
            return --t * t * t * t * t + 1;
        },
        quinticInOut: function(t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
        },
        sinusoidalIn: function(t) {
            return 1 - Math.cos(t * Math.PI / 2);
        },
        sinusoidalOut: function(t) {
            return Math.sin(t * Math.PI / 2);
        },
        sinusoidalInOut: function(t) {
            return .5 * (1 - Math.cos(Math.PI * t));
        },
        exponentialIn: function(t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1);
        },
        exponentialOut: function(t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        },
        exponentialInOut: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
        },
        circularIn: function(t) {
            return 1 - Math.sqrt(1 - t * t);
        },
        circularOut: function(t) {
            return Math.sqrt(1 - --t * t);
        },
        circularInOut: function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        elasticIn: function(t) {
            var e, n = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), 
            -n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / .4));
        },
        elasticOut: function(t) {
            var e, n = .1;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = .1) : e = .4 * Math.asin(1 / n) / (2 * Math.PI), 
            n * Math.pow(2, -10 * t) * Math.sin(2 * (t - e) * Math.PI / .4) + 1);
        },
        elasticInOut: function(t) {
            var e, n = .1, i = .4;
            return 0 === t ? 0 : 1 === t ? 1 : (!n || 1 > n ? (n = 1, e = .1) : e = i * Math.asin(1 / n) / (2 * Math.PI), 
            (t *= 2) < 1 ? -.5 * n * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) : n * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t - e) * Math.PI / i) * .5 + 1);
        },
        backIn: function(t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e);
        },
        backOut: function(t) {
            var e = 1.70158;
            return --t * t * ((e + 1) * t + e) + 1;
        },
        backInOut: function(t) {
            var e = 2.5949095;
            return (t *= 2) < 1 ? .5 * t * t * ((e + 1) * t - e) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
        },
        bounceIn: function(t) {
            return 1 - _p.bounceOut(1 - t);
        },
        bounceOut: function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        },
        bounceInOut: function(t) {
            return .5 > t ? .5 * _p.bounceIn(2 * t) : .5 * _p.bounceOut(2 * t - 1) + .5;
        }
    }, xp = Math.pow, wp = Math.sqrt, bp = 1e-8, Sp = 1e-4, Mp = wp(3), Tp = 1 / 3, Cp = q(), Ip = q(), kp = q(), Dp = /cubic-bezier\(([0-9,\.e ]+)\)/, Ap = function() {
        function t(t) {
            this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, 
            this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, 
            this.onframe = t.onframe || Y, this.ondestroy = t.ondestroy || Y, this.onrestart = t.onrestart || Y, 
            t.easing && this.setEasing(t.easing);
        }
        return t.prototype.step = function(t, e) {
            if (this._inited || (this._startTime = t + this._delay, this._inited = !0), !this._paused) {
                var n = this._life, i = t - this._startTime - this._pausedTime, r = i / n;
                0 > r && (r = 0), r = Math.min(r, 1);
                var o = this.easingFunc, a = o ? o(r) : r;
                if (this.onframe(a), 1 === r) {
                    if (!this.loop) return !0;
                    var s = i % n;
                    this._startTime = t - s, this._pausedTime = 0, this.onrestart();
                }
                return !1;
            }
            this._pausedTime += e;
        }, t.prototype.pause = function() {
            this._paused = !0;
        }, t.prototype.resume = function() {
            this._paused = !1;
        }, t.prototype.setEasing = function(t) {
            this.easing = t, this.easingFunc = w(t) ? t : _p[t] || Qt(t);
        }, t;
    }(), Pp = function(t) {
        this.value = t;
    }, Lp = function() {
        function t() {
            this._len = 0;
        }
        return t.prototype.insert = function(t) {
            var e = new Pp(t);
            return this.insertEntry(e), e;
        }, t.prototype.insertEntry = function(t) {
            this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, 
            this._len++;
        }, t.prototype.remove = function(t) {
            var e = t.prev, n = t.next;
            e ? e.next = n : this.head = n, n ? n.prev = e : this.tail = e, t.next = t.prev = null, 
            this._len--;
        }, t.prototype.len = function() {
            return this._len;
        }, t.prototype.clear = function() {
            this.head = this.tail = null, this._len = 0;
        }, t;
    }(), Op = function() {
        function t(t) {
            this._list = new Lp(), this._maxSize = 10, this._map = {}, this._maxSize = t;
        }
        return t.prototype.put = function(t, e) {
            var n = this._list, i = this._map, r = null;
            if (null == i[t]) {
                var o = n.len(), a = this._lastRemovedEntry;
                if (o >= this._maxSize && o > 0) {
                    var s = n.head;
                    n.remove(s), delete i[s.key], r = s.value, this._lastRemovedEntry = s;
                }
                a ? a.value = e : a = new Pp(e), a.key = t, n.insertEntry(a), i[t] = a;
            }
            return r;
        }, t.prototype.get = function(t) {
            var e = this._map[t], n = this._list;
            return null != e ? (e !== n.tail && (n.remove(e), n.insertEntry(e)), e.value) : void 0;
        }, t.prototype.clear = function() {
            this._list.clear(), this._map = {};
        }, t.prototype.len = function() {
            return this._list.len();
        }, t;
    }(), Rp = {
        transparent: [ 0, 0, 0, 0 ],
        aliceblue: [ 240, 248, 255, 1 ],
        antiquewhite: [ 250, 235, 215, 1 ],
        aqua: [ 0, 255, 255, 1 ],
        aquamarine: [ 127, 255, 212, 1 ],
        azure: [ 240, 255, 255, 1 ],
        beige: [ 245, 245, 220, 1 ],
        bisque: [ 255, 228, 196, 1 ],
        black: [ 0, 0, 0, 1 ],
        blanchedalmond: [ 255, 235, 205, 1 ],
        blue: [ 0, 0, 255, 1 ],
        blueviolet: [ 138, 43, 226, 1 ],
        brown: [ 165, 42, 42, 1 ],
        burlywood: [ 222, 184, 135, 1 ],
        cadetblue: [ 95, 158, 160, 1 ],
        chartreuse: [ 127, 255, 0, 1 ],
        chocolate: [ 210, 105, 30, 1 ],
        coral: [ 255, 127, 80, 1 ],
        cornflowerblue: [ 100, 149, 237, 1 ],
        cornsilk: [ 255, 248, 220, 1 ],
        crimson: [ 220, 20, 60, 1 ],
        cyan: [ 0, 255, 255, 1 ],
        darkblue: [ 0, 0, 139, 1 ],
        darkcyan: [ 0, 139, 139, 1 ],
        darkgoldenrod: [ 184, 134, 11, 1 ],
        darkgray: [ 169, 169, 169, 1 ],
        darkgreen: [ 0, 100, 0, 1 ],
        darkgrey: [ 169, 169, 169, 1 ],
        darkkhaki: [ 189, 183, 107, 1 ],
        darkmagenta: [ 139, 0, 139, 1 ],
        darkolivegreen: [ 85, 107, 47, 1 ],
        darkorange: [ 255, 140, 0, 1 ],
        darkorchid: [ 153, 50, 204, 1 ],
        darkred: [ 139, 0, 0, 1 ],
        darksalmon: [ 233, 150, 122, 1 ],
        darkseagreen: [ 143, 188, 143, 1 ],
        darkslateblue: [ 72, 61, 139, 1 ],
        darkslategray: [ 47, 79, 79, 1 ],
        darkslategrey: [ 47, 79, 79, 1 ],
        darkturquoise: [ 0, 206, 209, 1 ],
        darkviolet: [ 148, 0, 211, 1 ],
        deeppink: [ 255, 20, 147, 1 ],
        deepskyblue: [ 0, 191, 255, 1 ],
        dimgray: [ 105, 105, 105, 1 ],
        dimgrey: [ 105, 105, 105, 1 ],
        dodgerblue: [ 30, 144, 255, 1 ],
        firebrick: [ 178, 34, 34, 1 ],
        floralwhite: [ 255, 250, 240, 1 ],
        forestgreen: [ 34, 139, 34, 1 ],
        fuchsia: [ 255, 0, 255, 1 ],
        gainsboro: [ 220, 220, 220, 1 ],
        ghostwhite: [ 248, 248, 255, 1 ],
        gold: [ 255, 215, 0, 1 ],
        goldenrod: [ 218, 165, 32, 1 ],
        gray: [ 128, 128, 128, 1 ],
        green: [ 0, 128, 0, 1 ],
        greenyellow: [ 173, 255, 47, 1 ],
        grey: [ 128, 128, 128, 1 ],
        honeydew: [ 240, 255, 240, 1 ],
        hotpink: [ 255, 105, 180, 1 ],
        indianred: [ 205, 92, 92, 1 ],
        indigo: [ 75, 0, 130, 1 ],
        ivory: [ 255, 255, 240, 1 ],
        khaki: [ 240, 230, 140, 1 ],
        lavender: [ 230, 230, 250, 1 ],
        lavenderblush: [ 255, 240, 245, 1 ],
        lawngreen: [ 124, 252, 0, 1 ],
        lemonchiffon: [ 255, 250, 205, 1 ],
        lightblue: [ 173, 216, 230, 1 ],
        lightcoral: [ 240, 128, 128, 1 ],
        lightcyan: [ 224, 255, 255, 1 ],
        lightgoldenrodyellow: [ 250, 250, 210, 1 ],
        lightgray: [ 211, 211, 211, 1 ],
        lightgreen: [ 144, 238, 144, 1 ],
        lightgrey: [ 211, 211, 211, 1 ],
        lightpink: [ 255, 182, 193, 1 ],
        lightsalmon: [ 255, 160, 122, 1 ],
        lightseagreen: [ 32, 178, 170, 1 ],
        lightskyblue: [ 135, 206, 250, 1 ],
        lightslategray: [ 119, 136, 153, 1 ],
        lightslategrey: [ 119, 136, 153, 1 ],
        lightsteelblue: [ 176, 196, 222, 1 ],
        lightyellow: [ 255, 255, 224, 1 ],
        lime: [ 0, 255, 0, 1 ],
        limegreen: [ 50, 205, 50, 1 ],
        linen: [ 250, 240, 230, 1 ],
        magenta: [ 255, 0, 255, 1 ],
        maroon: [ 128, 0, 0, 1 ],
        mediumaquamarine: [ 102, 205, 170, 1 ],
        mediumblue: [ 0, 0, 205, 1 ],
        mediumorchid: [ 186, 85, 211, 1 ],
        mediumpurple: [ 147, 112, 219, 1 ],
        mediumseagreen: [ 60, 179, 113, 1 ],
        mediumslateblue: [ 123, 104, 238, 1 ],
        mediumspringgreen: [ 0, 250, 154, 1 ],
        mediumturquoise: [ 72, 209, 204, 1 ],
        mediumvioletred: [ 199, 21, 133, 1 ],
        midnightblue: [ 25, 25, 112, 1 ],
        mintcream: [ 245, 255, 250, 1 ],
        mistyrose: [ 255, 228, 225, 1 ],
        moccasin: [ 255, 228, 181, 1 ],
        navajowhite: [ 255, 222, 173, 1 ],
        navy: [ 0, 0, 128, 1 ],
        oldlace: [ 253, 245, 230, 1 ],
        olive: [ 128, 128, 0, 1 ],
        olivedrab: [ 107, 142, 35, 1 ],
        orange: [ 255, 165, 0, 1 ],
        orangered: [ 255, 69, 0, 1 ],
        orchid: [ 218, 112, 214, 1 ],
        palegoldenrod: [ 238, 232, 170, 1 ],
        palegreen: [ 152, 251, 152, 1 ],
        paleturquoise: [ 175, 238, 238, 1 ],
        palevioletred: [ 219, 112, 147, 1 ],
        papayawhip: [ 255, 239, 213, 1 ],
        peachpuff: [ 255, 218, 185, 1 ],
        peru: [ 205, 133, 63, 1 ],
        pink: [ 255, 192, 203, 1 ],
        plum: [ 221, 160, 221, 1 ],
        powderblue: [ 176, 224, 230, 1 ],
        purple: [ 128, 0, 128, 1 ],
        red: [ 255, 0, 0, 1 ],
        rosybrown: [ 188, 143, 143, 1 ],
        royalblue: [ 65, 105, 225, 1 ],
        saddlebrown: [ 139, 69, 19, 1 ],
        salmon: [ 250, 128, 114, 1 ],
        sandybrown: [ 244, 164, 96, 1 ],
        seagreen: [ 46, 139, 87, 1 ],
        seashell: [ 255, 245, 238, 1 ],
        sienna: [ 160, 82, 45, 1 ],
        silver: [ 192, 192, 192, 1 ],
        skyblue: [ 135, 206, 235, 1 ],
        slateblue: [ 106, 90, 205, 1 ],
        slategray: [ 112, 128, 144, 1 ],
        slategrey: [ 112, 128, 144, 1 ],
        snow: [ 255, 250, 250, 1 ],
        springgreen: [ 0, 255, 127, 1 ],
        steelblue: [ 70, 130, 180, 1 ],
        tan: [ 210, 180, 140, 1 ],
        teal: [ 0, 128, 128, 1 ],
        thistle: [ 216, 191, 216, 1 ],
        tomato: [ 255, 99, 71, 1 ],
        turquoise: [ 64, 224, 208, 1 ],
        violet: [ 238, 130, 238, 1 ],
        wheat: [ 245, 222, 179, 1 ],
        white: [ 255, 255, 255, 1 ],
        whitesmoke: [ 245, 245, 245, 1 ],
        yellow: [ 255, 255, 0, 1 ],
        yellowgreen: [ 154, 205, 50, 1 ]
    }, Bp = new Op(20), Ep = null, zp = ce, Np = pe, Fp = (Object.freeze || Object)({
        parse: le,
        lift: he,
        toHex: function(t) {
            var e = le(t);
            return e ? ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1) : void 0;
        },
        fastLerp: ce,
        fastMapToColor: zp,
        lerp: pe,
        mapToColor: Np,
        modifyHSL: function(t, e, n, i) {
            var r = le(t);
            return t ? (r = function(t) {
                if (t) {
                    var e, n, i = t[0] / 255, r = t[1] / 255, o = t[2] / 255, a = Math.min(i, r, o), s = Math.max(i, r, o), l = s - a, u = (s + a) / 2;
                    if (0 === l) e = 0, n = 0; else {
                        n = .5 > u ? l / (s + a) : l / (2 - s - a);
                        var h = ((s - i) / 6 + l / 2) / l, c = ((s - r) / 6 + l / 2) / l, p = ((s - o) / 6 + l / 2) / l;
                        i === s ? e = p - c : r === s ? e = 1 / 3 + h - p : o === s && (e = 2 / 3 + c - h), 
                        0 > e && (e += 1), e > 1 && (e -= 1);
                    }
                    var d = [ 360 * e, n, u ];
                    return null != t[3] && d.push(t[3]), d;
                }
            }(r), null != e && (r[0] = function(t) {
                return 0 > (t = Math.round(t)) ? 0 : t > 360 ? 360 : t;
            }(e)), null != n && (r[1] = ne(n)), null != i && (r[2] = ne(i)), de(ue(r), "rgba")) : void 0;
        },
        modifyAlpha: function(t, e) {
            var n = le(t);
            return n && null != e ? (n[3] = te(e), de(n, "rgba")) : void 0;
        },
        stringify: de,
        lum: fe,
        random: function() {
            return de([ Math.round(255 * Math.random()), Math.round(255 * Math.random()), Math.round(255 * Math.random()) ], "rgb");
        }
    }), Vp = (ic.hasGlobalWindow && w(window.btoa), Array.prototype.slice), Hp = 1, Wp = 2, Gp = 4, Up = 5, Xp = [ 0, 0, 0, 0 ], Yp = function() {
        function t(t) {
            this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, 
            this._lastFr = 0, this._lastFrP = 0, this.propName = t;
        }
        return t.prototype.isFinished = function() {
            return this._finished;
        }, t.prototype.setFinished = function() {
            this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
        }, t.prototype.needsAnimate = function() {
            return this.keyframes.length >= 1;
        }, t.prototype.getAdditiveTrack = function() {
            return this._additiveTrack;
        }, t.prototype.addKeyframe = function(t, e, n) {
            this._needsSort = !0;
            var i = this.keyframes, r = i.length, o = !1, a = 6, s = e;
            if (d(e)) {
                var u = function(t) {
                    return d(t && t[0]) ? 2 : 1;
                }(e);
                a = u, (1 === u && !M(e[0]) || 2 === u && !M(e[0][0])) && (o = !0);
            } else if (M(e) && !P(e)) a = 0; else if (b(e)) if (isNaN(+e)) {
                var h = le(e);
                h && (s = h, a = 3);
            } else a = 0; else if (D(e)) {
                var c = l({}, s);
                c.colorStops = g(e.colorStops, function(t) {
                    return {
                        offset: t.offset,
                        color: le(t.color)
                    };
                }), function(t) {
                    return "linear" === t.type;
                }(e) ? a = Gp : function(t) {
                    return "radial" === t.type;
                }(e) && (a = Up), s = c;
            }
            0 === r ? this.valType = a : (a !== this.valType || 6 === a) && (o = !0), this.discrete = this.discrete || o;
            var p = {
                time: t,
                value: s,
                rawValue: e,
                percent: 0
            };
            return n && (p.easing = n, p.easingFunc = w(n) ? n : _p[n] || Qt(n)), i.push(p), 
            p;
        }, t.prototype.prepare = function(t, e) {
            var n = this.keyframes;
            this._needsSort && n.sort(function(t, e) {
                return t.time - e.time;
            });
            for (var i = this.valType, r = n.length, o = n[r - 1], a = this.discrete, s = Me(i), l = Se(i), u = 0; r > u; u++) {
                var h = n[u], c = h.value, p = o.value;
                h.percent = h.time / t, a || (s && u !== r - 1 ? xe(c, p, i) : l && _e(c.colorStops, p.colorStops));
            }
            if (!a && i !== Up && e && this.needsAnimate() && e.needsAnimate() && i === e.valType && !e._finished) {
                this._additiveTrack = e;
                var d = n[0].value;
                for (u = 0; r > u; u++) 0 === i ? n[u].additiveValue = n[u].value - d : 3 === i ? n[u].additiveValue = ve([], n[u].value, d, -1) : Me(i) && (n[u].additiveValue = i === Hp ? ve([], n[u].value, d, -1) : me([], n[u].value, d, -1));
            }
        }, t.prototype.step = function(t, e) {
            if (!this._finished) {
                this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
                var n, i, r, o = null != this._additiveTrack, a = o ? "additiveValue" : "value", s = this.valType, l = this.keyframes, u = l.length, h = this.propName, c = 3 === s, p = this._lastFr, d = Math.min;
                if (1 === u) i = r = l[0]; else {
                    if (0 > e) n = 0; else if (e < this._lastFrP) {
                        for (n = d(p + 1, u - 1); n >= 0 && !(l[n].percent <= e); n--) ;
                        n = d(n, u - 2);
                    } else {
                        for (n = p; u > n && !(l[n].percent > e); n++) ;
                        n = d(n - 1, u - 2);
                    }
                    r = l[n + 1], i = l[n];
                }
                if (i && r) {
                    this._lastFr = n, this._lastFrP = e;
                    var f = r.percent - i.percent, y = 0 === f ? 1 : d((e - i.percent) / f, 1);
                    r.easingFunc && (y = r.easingFunc(y));
                    var v = o ? this._additiveValue : c ? Xp : t[h];
                    if (!Me(s) && !c || v || (v = this._additiveValue = []), this.discrete) t[h] = 1 > y ? i.rawValue : r.rawValue; else if (Me(s)) s === Hp ? ye(v, i[a], r[a], y) : function(t, e, n, i) {
                        for (var r = e.length, o = r && e[0].length, a = 0; r > a; a++) {
                            t[a] || (t[a] = []);
                            for (var s = 0; o > s; s++) t[a][s] = ge(e[a][s], n[a][s], i);
                        }
                    }(v, i[a], r[a], y); else if (Se(s)) {
                        var m = i[a], _ = r[a], x = s === Gp;
                        t[h] = {
                            type: x ? "linear" : "radial",
                            x: ge(m.x, _.x, y),
                            y: ge(m.y, _.y, y),
                            colorStops: g(m.colorStops, function(t, e) {
                                var n = _.colorStops[e];
                                return {
                                    offset: ge(t.offset, n.offset, y),
                                    color: be(ye([], t.color, n.color, y))
                                };
                            }),
                            global: _.global
                        }, x ? (t[h].x2 = ge(m.x2, _.x2, y), t[h].y2 = ge(m.y2, _.y2, y)) : t[h].r = ge(m.r, _.r, y);
                    } else if (c) ye(v, i[a], r[a], y), o || (t[h] = be(v)); else {
                        var w = ge(i[a], r[a], y);
                        o ? this._additiveValue = w : t[h] = w;
                    }
                    o && this._addToTarget(t);
                }
            }
        }, t.prototype._addToTarget = function(t) {
            var e = this.valType, n = this.propName, i = this._additiveValue;
            0 === e ? t[n] = t[n] + i : 3 === e ? (le(t[n], Xp), ve(Xp, Xp, i, 1), t[n] = be(Xp)) : e === Hp ? ve(t[n], t[n], i, 1) : e === Wp && me(t[n], t[n], i, 1);
        }, t;
    }(), qp = function() {
        function t(t, e, n, i) {
            return this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, 
            this._clip = null, this._target = t, this._loop = e, e && i ? void o("Can' use additive animation on looped animation.") : (this._additiveAnimators = i, 
            void (this._allowDiscrete = n));
        }
        return t.prototype.getMaxTime = function() {
            return this._maxTime;
        }, t.prototype.getDelay = function() {
            return this._delay;
        }, t.prototype.getLoop = function() {
            return this._loop;
        }, t.prototype.getTarget = function() {
            return this._target;
        }, t.prototype.changeTarget = function(t) {
            this._target = t;
        }, t.prototype.when = function(t, e, n) {
            return this.whenWithKeys(t, e, m(e), n);
        }, t.prototype.whenWithKeys = function(t, e, n, i) {
            for (var r = this._tracks, o = 0; o < n.length; o++) {
                var a = n[o], s = r[a];
                if (!s) {
                    s = r[a] = new Yp(a);
                    var l = void 0, u = this._getAdditiveTrack(a);
                    if (u) {
                        var h = u.keyframes, c = h[h.length - 1];
                        l = c && c.value, 3 === u.valType && l && (l = be(l));
                    } else l = this._target[a];
                    if (null == l) continue;
                    t > 0 && s.addKeyframe(0, we(l), i), this._trackKeys.push(a);
                }
                s.addKeyframe(t, we(e[a]), i);
            }
            return this._maxTime = Math.max(this._maxTime, t), this;
        }, t.prototype.pause = function() {
            this._clip.pause(), this._paused = !0;
        }, t.prototype.resume = function() {
            this._clip.resume(), this._paused = !1;
        }, t.prototype.isPaused = function() {
            return !!this._paused;
        }, t.prototype.duration = function(t) {
            return this._maxTime = t, this._force = !0, this;
        }, t.prototype._doneCallback = function() {
            this._setTracksFinished(), this._clip = null;
            var t = this._doneCbs;
            if (t) for (var e = t.length, n = 0; e > n; n++) t[n].call(this);
        }, t.prototype._abortedCallback = function() {
            this._setTracksFinished();
            var t = this.animation, e = this._abortedCbs;
            if (t && t.removeClip(this._clip), this._clip = null, e) for (var n = 0; n < e.length; n++) e[n].call(this);
        }, t.prototype._setTracksFinished = function() {
            for (var t = this._tracks, e = this._trackKeys, n = 0; n < e.length; n++) t[e[n]].setFinished();
        }, t.prototype._getAdditiveTrack = function(t) {
            var e, n = this._additiveAnimators;
            if (n) for (var i = 0; i < n.length; i++) {
                var r = n[i].getTrack(t);
                r && (e = r);
            }
            return e;
        }, t.prototype.start = function(t) {
            if (!(this._started > 0)) {
                this._started = 1;
                for (var e = this, n = [], i = this._maxTime || 0, r = 0; r < this._trackKeys.length; r++) {
                    var o = this._trackKeys[r], a = this._tracks[o], s = this._getAdditiveTrack(o), l = a.keyframes, u = l.length;
                    if (a.prepare(i, s), a.needsAnimate()) if (!this._allowDiscrete && a.discrete) {
                        var h = l[u - 1];
                        h && (e._target[a.propName] = h.rawValue), a.setFinished();
                    } else n.push(a);
                }
                if (n.length || this._force) {
                    var c = new Ap({
                        life: i,
                        loop: this._loop,
                        delay: this._delay || 0,
                        onframe: function(t) {
                            e._started = 2;
                            var i = e._additiveAnimators;
                            if (i) {
                                for (var r = !1, o = 0; o < i.length; o++) if (i[o]._clip) {
                                    r = !0;
                                    break;
                                }
                                r || (e._additiveAnimators = null);
                            }
                            for (o = 0; o < n.length; o++) n[o].step(e._target, t);
                            var a = e._onframeCbs;
                            if (a) for (o = 0; o < a.length; o++) a[o](e._target, t);
                        },
                        ondestroy: function() {
                            e._doneCallback();
                        }
                    });
                    this._clip = c, this.animation && this.animation.addClip(c), t && c.setEasing(t);
                } else this._doneCallback();
                return this;
            }
        }, t.prototype.stop = function(t) {
            if (this._clip) {
                var e = this._clip;
                t && e.onframe(1), this._abortedCallback();
            }
        }, t.prototype.delay = function(t) {
            return this._delay = t, this;
        }, t.prototype.during = function(t) {
            return t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)), 
            this;
        }, t.prototype.done = function(t) {
            return t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this;
        }, t.prototype.aborted = function(t) {
            return t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)), 
            this;
        }, t.prototype.getClip = function() {
            return this._clip;
        }, t.prototype.getTrack = function(t) {
            return this._tracks[t];
        }, t.prototype.getTracks = function() {
            var t = this;
            return g(this._trackKeys, function(e) {
                return t._tracks[e];
            });
        }, t.prototype.stopTracks = function(t, e) {
            if (!t.length || !this._clip) return !0;
            for (var n = this._tracks, i = this._trackKeys, r = 0; r < t.length; r++) {
                var o = n[t[r]];
                o && !o.isFinished() && (e ? o.step(this._target, 1) : 1 === this._started && o.step(this._target, 0), 
                o.setFinished());
            }
            var a = !0;
            for (r = 0; r < i.length; r++) if (!n[i[r]].isFinished()) {
                a = !1;
                break;
            }
            return a && this._abortedCallback(), a;
        }, t.prototype.saveTo = function(t, e, n) {
            if (t) {
                e = e || this._trackKeys;
                for (var i = 0; i < e.length; i++) {
                    var r = e[i], o = this._tracks[r];
                    if (o && !o.isFinished()) {
                        var a = o.keyframes, s = a[n ? 0 : a.length - 1];
                        s && (t[r] = we(s.rawValue));
                    }
                }
            }
        }, t.prototype.__changeFinalValue = function(t, e) {
            e = e || m(t);
            for (var n = 0; n < e.length; n++) {
                var i = e[n], r = this._tracks[i];
                if (r) {
                    var o = r.keyframes;
                    if (o.length > 1) {
                        var a = o.pop();
                        r.addKeyframe(a.time, t[i]), r.prepare(this._maxTime, r.getAdditiveTrack());
                    }
                }
            }
        }, t;
    }(), jp = function(t) {
        function e(e) {
            var n = t.call(this) || this;
            return n._running = !1, n._time = 0, n._pausedTime = 0, n._pauseStart = 0, n._paused = !1, 
            e = e || {}, n.stage = e.stage || {}, n;
        }
        return n(e, t), e.prototype.addClip = function(t) {
            t.animation && this.removeClip(t), this._head ? (this._tail.next = t, t.prev = this._tail, 
            t.next = null, this._tail = t) : this._head = this._tail = t, t.animation = this;
        }, e.prototype.addAnimator = function(t) {
            t.animation = this;
            var e = t.getClip();
            e && this.addClip(e);
        }, e.prototype.removeClip = function(t) {
            if (t.animation) {
                var e = t.prev, n = t.next;
                e ? e.next = n : this._head = n, n ? n.prev = e : this._tail = e, t.next = t.prev = t.animation = null;
            }
        }, e.prototype.removeAnimator = function(t) {
            var e = t.getClip();
            e && this.removeClip(e), t.animation = null;
        }, e.prototype.update = function(t) {
            for (var e = Te() - this._pausedTime, n = e - this._time, i = this._head; i; ) {
                var r = i.next;
                i.step(e, n) ? (i.ondestroy(), this.removeClip(i), i = r) : i = r;
            }
            this._time = e, t || (this.trigger("frame", n), this.stage.update && this.stage.update());
        }, e.prototype._startLoop = function() {
            var t = this;
            this._running = !0, mp(function e() {
                t._running && (mp(e), !t._paused && t.update());
            });
        }, e.prototype.start = function() {
            this._running || (this._time = Te(), this._pausedTime = 0, this._startLoop());
        }, e.prototype.stop = function() {
            this._running = !1;
        }, e.prototype.pause = function() {
            this._paused || (this._pauseStart = Te(), this._paused = !0);
        }, e.prototype.resume = function() {
            this._paused && (this._pausedTime += Te() - this._pauseStart, this._paused = !1);
        }, e.prototype.clear = function() {
            for (var t = this._head; t; ) {
                var e = t.next;
                t.prev = t.next = t.animation = null, t = e;
            }
            this._head = this._tail = null;
        }, e.prototype.isFinished = function() {
            return null == this._head;
        }, e.prototype.animate = function(t, e) {
            e = e || {}, this.start();
            var n = new qp(t, e.loop);
            return this.addAnimator(n), n;
        }, e;
    }(zc), Zp = ic.domSupported, Kp = function() {
        var t = [ "click", "dblclick", "mousewheel", "wheel", "mouseout", "mouseup", "mousedown", "mousemove", "contextmenu" ], e = {
            pointerdown: 1,
            pointerup: 1,
            pointermove: 1,
            pointerout: 1
        }, n = g(t, function(t) {
            var n = t.replace("mouse", "pointer");
            return e.hasOwnProperty(n) ? n : t;
        });
        return {
            mouse: t,
            touch: [ "touchstart", "touchend", "touchmove" ],
            pointer: n
        };
    }(), $p = {
        mouse: [ "mousemove", "mouseup" ],
        pointer: [ "pointermove", "pointerup" ]
    }, Qp = !1, Jp = function(t, e) {
        this.stopPropagation = Y, this.stopImmediatePropagation = Y, this.preventDefault = Y, 
        this.type = e.type, this.target = this.currentTarget = t.dom, this.pointerType = e.pointerType, 
        this.clientX = e.clientX, this.clientY = e.clientY;
    }, td = {
        mousedown: function(t) {
            t = gt(this.dom, t), this.__mayPointerCapture = [ t.zrX, t.zrY ], this.trigger("mousedown", t);
        },
        mousemove: function(t) {
            t = gt(this.dom, t);
            var e = this.__mayPointerCapture;
            !e || t.zrX === e[0] && t.zrY === e[1] || this.__togglePointerCapture(!0), this.trigger("mousemove", t);
        },
        mouseup: function(t) {
            t = gt(this.dom, t), this.__togglePointerCapture(!1), this.trigger("mouseup", t);
        },
        mouseout: function(t) {
            ke(this, (t = gt(this.dom, t)).toElement || t.relatedTarget) || (this.__pointerCapturing && (t.zrEventControl = "no_globalout"), 
            this.trigger("mouseout", t));
        },
        wheel: function(t) {
            Qp = !0, t = gt(this.dom, t), this.trigger("mousewheel", t);
        },
        mousewheel: function(t) {
            Qp || (t = gt(this.dom, t), this.trigger("mousewheel", t));
        },
        touchstart: function(t) {
            Ie(t = gt(this.dom, t)), this.__lastTouchMoment = new Date(), this.handler.processGesture(t, "start"), 
            td.mousemove.call(this, t), td.mousedown.call(this, t);
        },
        touchmove: function(t) {
            Ie(t = gt(this.dom, t)), this.handler.processGesture(t, "change"), td.mousemove.call(this, t);
        },
        touchend: function(t) {
            Ie(t = gt(this.dom, t)), this.handler.processGesture(t, "end"), td.mouseup.call(this, t), 
            +new Date() - +this.__lastTouchMoment < 300 && td.click.call(this, t);
        },
        pointerdown: function(t) {
            td.mousedown.call(this, t);
        },
        pointermove: function(t) {
            Ce(t) || td.mousemove.call(this, t);
        },
        pointerup: function(t) {
            td.mouseup.call(this, t);
        },
        pointerout: function(t) {
            Ce(t) || td.mouseout.call(this, t);
        }
    };
    f([ "click", "dblclick", "contextmenu" ], function(t) {
        td[t] = function(e) {
            e = gt(this.dom, e), this.trigger(t, e);
        };
    });
    var ed = {
        pointermove: function(t) {
            Ce(t) || ed.mousemove.call(this, t);
        },
        pointerup: function(t) {
            ed.mouseup.call(this, t);
        },
        mousemove: function(t) {
            this.trigger("mousemove", t);
        },
        mouseup: function(t) {
            var e = this.__pointerCapturing;
            this.__togglePointerCapture(!1), this.trigger("mouseup", t), e && (t.zrEventControl = "only_globalout", 
            this.trigger("mouseout", t));
        }
    }, nd = function(t, e) {
        this.mounted = {}, this.listenerOpts = {}, this.touching = !1, this.domTarget = t, 
        this.domHandlers = e;
    }, id = function(t) {
        function e(e, n) {
            var i = t.call(this) || this;
            return i.__pointerCapturing = !1, i.dom = e, i.painterRoot = n, i._localHandlerScope = new nd(e, td), 
            Zp && (i._globalHandlerScope = new nd(document, ed)), De(i, i._localHandlerScope), 
            i;
        }
        return n(e, t), e.prototype.dispose = function() {
            Le(this._localHandlerScope), Zp && Le(this._globalHandlerScope);
        }, e.prototype.setCursor = function(t) {
            this.dom.style && (this.dom.style.cursor = t || "default");
        }, e.prototype.__togglePointerCapture = function(t) {
            if (this.__mayPointerCapture = null, Zp && +this.__pointerCapturing ^ +t) {
                this.__pointerCapturing = t;
                var e = this._globalHandlerScope;
                t ? Ae(this, e) : Le(e);
            }
        }, e;
    }(zc), rd = 1;
    ic.hasGlobalWindow && (rd = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
    var od = rd, ad = .4, sd = "#333", ld = "#ccc", ud = _t, hd = 5e-5, cd = [], pd = [], dd = [ 1, 0, 0, 1, 0, 0 ], fd = Math.abs, gd = function() {
        function t() {}
        return t.prototype.getLocalTransform = function(e) {
            return t.getLocalTransform(this, e);
        }, t.prototype.setPosition = function(t) {
            this.x = t[0], this.y = t[1];
        }, t.prototype.setScale = function(t) {
            this.scaleX = t[0], this.scaleY = t[1];
        }, t.prototype.setSkew = function(t) {
            this.skewX = t[0], this.skewY = t[1];
        }, t.prototype.setOrigin = function(t) {
            this.originX = t[0], this.originY = t[1];
        }, t.prototype.needLocalTransform = function() {
            return Oe(this.rotation) || Oe(this.x) || Oe(this.y) || Oe(this.scaleX - 1) || Oe(this.scaleY - 1) || Oe(this.skewX) || Oe(this.skewY);
        }, t.prototype.updateTransform = function() {
            var t = this.parent && this.parent.transform, e = this.needLocalTransform(), n = this.transform;
            return e || t ? (n = n || [ 1, 0, 0, 1, 0, 0 ], e ? this.getLocalTransform(n) : ud(n), 
            t && (e ? wt(n, t, n) : xt(n, t)), this.transform = n, void this._resolveGlobalScaleRatio(n)) : void (n && (ud(n), 
            this.invTransform = null));
        }, t.prototype._resolveGlobalScaleRatio = function(t) {
            var e = this.globalScaleRatio;
            if (null != e && 1 !== e) {
                this.getGlobalScale(cd);
                var n = cd[0] < 0 ? -1 : 1, i = cd[1] < 0 ? -1 : 1, r = ((cd[0] - n) * e + n) / cd[0] || 0, o = ((cd[1] - i) * e + i) / cd[1] || 0;
                t[0] *= r, t[1] *= r, t[2] *= o, t[3] *= o;
            }
            this.invTransform = this.invTransform || [ 1, 0, 0, 1, 0, 0 ], Tt(this.invTransform, t);
        }, t.prototype.getComputedTransform = function() {
            for (var t = this, e = []; t; ) e.push(t), t = t.parent;
            for (;t = e.pop(); ) t.updateTransform();
            return this.transform;
        }, t.prototype.setLocalTransform = function(t) {
            if (t) {
                var e = t[0] * t[0] + t[1] * t[1], n = t[2] * t[2] + t[3] * t[3], i = Math.atan2(t[1], t[0]), r = Math.PI / 2 + i - Math.atan2(t[3], t[2]);
                n = Math.sqrt(n) * Math.cos(r), e = Math.sqrt(e), this.skewX = r, this.skewY = 0, 
                this.rotation = -i, this.x = +t[4], this.y = +t[5], this.scaleX = e, this.scaleY = n, 
                this.originX = 0, this.originY = 0;
            }
        }, t.prototype.decomposeTransform = function() {
            if (this.transform) {
                var t = this.parent, e = this.transform;
                t && t.transform && (wt(pd, t.invTransform, e), e = pd);
                var n = this.originX, i = this.originY;
                (n || i) && (dd[4] = n, dd[5] = i, wt(pd, e, dd), pd[4] -= n, pd[5] -= i, e = pd), 
                this.setLocalTransform(e);
            }
        }, t.prototype.getGlobalScale = function(t) {
            var e = this.transform;
            return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), 
            e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, 
            t);
        }, t.prototype.transformCoordToLocal = function(t, e) {
            var n = [ t, e ], i = this.invTransform;
            return i && rt(n, n, i), n;
        }, t.prototype.transformCoordToGlobal = function(t, e) {
            var n = [ t, e ], i = this.transform;
            return i && rt(n, n, i), n;
        }, t.prototype.getLineScale = function() {
            var t = this.transform;
            return t && fd(t[0] - 1) > 1e-10 && fd(t[3] - 1) > 1e-10 ? Math.sqrt(fd(t[0] * t[3] - t[2] * t[1])) : 1;
        }, t.prototype.copyTransform = function(t) {
            !function(t, e) {
                for (var n = 0; n < yd.length; n++) {
                    var i = yd[n];
                    t[i] = e[i];
                }
            }(this, t);
        }, t.getLocalTransform = function(t, e) {
            e = e || [];
            var n = t.originX || 0, i = t.originY || 0, r = t.scaleX, o = t.scaleY, a = t.anchorX, s = t.anchorY, l = t.rotation || 0, u = t.x, h = t.y, c = t.skewX ? Math.tan(t.skewX) : 0, p = t.skewY ? Math.tan(-t.skewY) : 0;
            if (n || i || a || s) {
                var d = n + a, f = i + s;
                e[4] = -d * r - c * f * o, e[5] = -f * o - p * d * r;
            } else e[4] = e[5] = 0;
            return e[0] = r, e[3] = o, e[1] = p * r, e[2] = c * o, l && St(e, e, l), e[4] += n + u, 
            e[5] += i + h, e;
        }, t.initDefaultProps = function() {
            var e = t.prototype;
            e.scaleX = e.scaleY = e.globalScaleRatio = 1, e.x = e.y = e.originX = e.originY = e.skewX = e.skewY = e.rotation = e.anchorX = e.anchorY = 0;
        }(), t;
    }(), yd = [ "x", "y", "originX", "originY", "anchorX", "anchorY", "rotation", "scaleX", "scaleY", "skewX", "skewY" ], vd = {}, md = "__zr_normal__", _d = yd.concat([ "ignore" ]), xd = y(yd, function(t, e) {
        return t[e] = !0, t;
    }, {
        ignore: !1
    }), wd = {}, bd = new op(0, 0, 0, 0), Sd = function() {
        function t(t) {
            this.id = r(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
        }
        return t.prototype._init = function(t) {
            this.attr(t);
        }, t.prototype.drift = function(t, e) {
            switch (this.draggable) {
              case "horizontal":
                e = 0;
                break;

              case "vertical":
                t = 0;
            }
            var n = this.transform;
            n || (n = this.transform = [ 1, 0, 0, 1, 0, 0 ]), n[4] += t, n[5] += e, this.decomposeTransform(), 
            this.markRedraw();
        }, t.prototype.beforeUpdate = function() {}, t.prototype.afterUpdate = function() {}, 
        t.prototype.update = function() {
            this.updateTransform(), this.__dirty && this.updateInnerText();
        }, t.prototype.updateInnerText = function(t) {
            var e = this._textContent;
            if (e && (!e.ignore || t)) {
                this.textConfig || (this.textConfig = {});
                var n = this.textConfig, i = n.local, r = e.innerTransformable, o = void 0, a = void 0, s = !1;
                r.parent = i ? this : null;
                var l = !1;
                if (r.copyTransform(e), null != n.position) {
                    var u = bd;
                    u.copy(n.layoutRect ? n.layoutRect : this.getBoundingRect()), i || u.applyTransform(this.transform), 
                    this.calculateTextPosition ? this.calculateTextPosition(wd, n, u) : He(wd, n, u), 
                    r.x = wd.x, r.y = wd.y, o = wd.align, a = wd.verticalAlign;
                    var h = n.origin;
                    if (h && null != n.rotation) {
                        var c = void 0, p = void 0;
                        "center" === h ? (c = .5 * u.width, p = .5 * u.height) : (c = Ve(h[0], u.width), 
                        p = Ve(h[1], u.height)), l = !0, r.originX = -r.x + c + (i ? 0 : u.x), r.originY = -r.y + p + (i ? 0 : u.y);
                    }
                }
                null != n.rotation && (r.rotation = n.rotation);
                var d = n.offset;
                d && (r.x += d[0], r.y += d[1], l || (r.originX = -d[0], r.originY = -d[1]));
                var f = null == n.inside ? "string" == typeof n.position && n.position.indexOf("inside") >= 0 : n.inside, g = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), y = void 0, v = void 0, m = void 0;
                f && this.canBeInsideText() ? (y = n.insideFill, v = n.insideStroke, (null == y || "auto" === y) && (y = this.getInsideTextFill()), 
                (null == v || "auto" === v) && (v = this.getInsideTextStroke(y), m = !0)) : (y = n.outsideFill, 
                v = n.outsideStroke, (null == y || "auto" === y) && (y = this.getOutsideFill()), 
                (null == v || "auto" === v) && (v = this.getOutsideStroke(y), m = !0)), ((y = y || "#000") !== g.fill || v !== g.stroke || m !== g.autoStroke || o !== g.align || a !== g.verticalAlign) && (s = !0, 
                g.fill = y, g.stroke = v, g.autoStroke = m, g.align = o, g.verticalAlign = a, e.setDefaultTextStyle(g)), 
                e.__dirty |= fp, s && e.dirtyStyle(!0);
            }
        }, t.prototype.canBeInsideText = function() {
            return !0;
        }, t.prototype.getInsideTextFill = function() {
            return "#fff";
        }, t.prototype.getInsideTextStroke = function() {
            return "#000";
        }, t.prototype.getOutsideFill = function() {
            return this.__zr && this.__zr.isDarkMode() ? ld : sd;
        }, t.prototype.getOutsideStroke = function() {
            var t = this.__zr && this.__zr.getBackgroundColor(), e = "string" == typeof t && le(t);
            e || (e = [ 255, 255, 255, 1 ]);
            for (var n = e[3], i = this.__zr.isDarkMode(), r = 0; 3 > r; r++) e[r] = e[r] * n + (i ? 0 : 255) * (1 - n);
            return e[3] = 1, de(e, "rgba");
        }, t.prototype.traverse = function() {}, t.prototype.attrKV = function(t, e) {
            "textConfig" === t ? this.setTextConfig(e) : "textContent" === t ? this.setTextContent(e) : "clipPath" === t ? this.setClipPath(e) : "extra" === t ? (this.extra = this.extra || {}, 
            l(this.extra, e)) : this[t] = e;
        }, t.prototype.hide = function() {
            this.ignore = !0, this.markRedraw();
        }, t.prototype.show = function() {
            this.ignore = !1, this.markRedraw();
        }, t.prototype.attr = function(t, e) {
            if ("string" == typeof t) this.attrKV(t, e); else if (T(t)) for (var n = m(t), i = 0; i < n.length; i++) {
                var r = n[i];
                this.attrKV(r, t[r]);
            }
            return this.markRedraw(), this;
        }, t.prototype.saveCurrentToNormalState = function(t) {
            this._innerSaveToNormal(t);
            for (var e = this._normalState, n = 0; n < this.animators.length; n++) {
                var i = this.animators[n], r = i.__fromStateTransition;
                if (!(i.getLoop() || r && r !== md)) {
                    var o = i.targetName, a = o ? e[o] : e;
                    i.saveTo(a);
                }
            }
        }, t.prototype._innerSaveToNormal = function(t) {
            var e = this._normalState;
            e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), 
            this._savePrimaryToNormal(t, e, _d);
        }, t.prototype._savePrimaryToNormal = function(t, e, n) {
            for (var i = 0; i < n.length; i++) {
                var r = n[i];
                null == t[r] || r in e || (e[r] = this[r]);
            }
        }, t.prototype.hasState = function() {
            return this.currentStates.length > 0;
        }, t.prototype.getState = function(t) {
            return this.states[t];
        }, t.prototype.ensureState = function(t) {
            var e = this.states;
            return e[t] || (e[t] = {}), e[t];
        }, t.prototype.clearStates = function(t) {
            this.useState(md, !1, t);
        }, t.prototype.useState = function(t, e, n, i) {
            var r = t === md;
            if (this.hasState() || !r) {
                var a = this.currentStates, s = this.stateTransition;
                if (!(h(a, t) >= 0) || !e && 1 !== a.length) {
                    var l;
                    if (this.stateProxy && !r && (l = this.stateProxy(t)), l || (l = this.states && this.states[t]), 
                    !l && !r) return void o("State " + t + " not exists.");
                    r || this.saveCurrentToNormalState(l);
                    var u = !!(l && l.hoverLayer || i);
                    u && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, l, this._normalState, e, !n && !this.__inHover && s && s.duration > 0, s);
                    var c = this._textContent, p = this._textGuide;
                    return c && c.useState(t, e, n, u), p && p.useState(t, e, n, u), r ? (this.currentStates = [], 
                    this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [ t ], 
                    this._updateAnimationTargets(), this.markRedraw(), !u && this.__inHover && (this._toggleHoverLayerFlag(!1), 
                    this.__dirty &= ~fp), l;
                }
            }
        }, t.prototype.useStates = function(t, e, n) {
            if (t.length) {
                var i = [], r = this.currentStates, o = t.length, a = o === r.length;
                if (a) for (var s = 0; o > s; s++) if (t[s] !== r[s]) {
                    a = !1;
                    break;
                }
                if (a) return;
                for (s = 0; o > s; s++) {
                    var l = t[s], u = void 0;
                    this.stateProxy && (u = this.stateProxy(l, t)), u || (u = this.states[l]), u && i.push(u);
                }
                var h = i[o - 1], c = !!(h && h.hoverLayer || n);
                c && this._toggleHoverLayerFlag(!0);
                var p = this._mergeStates(i), d = this.stateTransition;
                this.saveCurrentToNormalState(p), this._applyStateObj(t.join(","), p, this._normalState, !1, !e && !this.__inHover && d && d.duration > 0, d);
                var f = this._textContent, g = this._textGuide;
                f && f.useStates(t, e, c), g && g.useStates(t, e, c), this._updateAnimationTargets(), 
                this.currentStates = t.slice(), this.markRedraw(), !c && this.__inHover && (this._toggleHoverLayerFlag(!1), 
                this.__dirty &= ~fp);
            } else this.clearStates();
        }, t.prototype._updateAnimationTargets = function() {
            for (var t = 0; t < this.animators.length; t++) {
                var e = this.animators[t];
                e.targetName && e.changeTarget(this[e.targetName]);
            }
        }, t.prototype.removeState = function(t) {
            var e = h(this.currentStates, t);
            if (e >= 0) {
                var n = this.currentStates.slice();
                n.splice(e, 1), this.useStates(n);
            }
        }, t.prototype.replaceState = function(t, e, n) {
            var i = this.currentStates.slice(), r = h(i, t), o = h(i, e) >= 0;
            r >= 0 ? o ? i.splice(r, 1) : i[r] = e : n && !o && i.push(e), this.useStates(i);
        }, t.prototype.toggleState = function(t, e) {
            e ? this.useState(t, !0) : this.removeState(t);
        }, t.prototype._mergeStates = function(t) {
            for (var e, n = {}, i = 0; i < t.length; i++) {
                var r = t[i];
                l(n, r), r.textConfig && l(e = e || {}, r.textConfig);
            }
            return e && (n.textConfig = e), n;
        }, t.prototype._applyStateObj = function(t, e, n, i, r, o) {
            var a = !(e && i);
            e && e.textConfig ? (this.textConfig = l({}, i ? this.textConfig : n.textConfig), 
            l(this.textConfig, e.textConfig)) : a && n.textConfig && (this.textConfig = n.textConfig);
            for (var s = {}, u = !1, h = 0; h < _d.length; h++) {
                var c = _d[h], p = r && xd[c];
                e && null != e[c] ? p ? (u = !0, s[c] = e[c]) : this[c] = e[c] : a && null != n[c] && (p ? (u = !0, 
                s[c] = n[c]) : this[c] = n[c]);
            }
            if (!r) for (h = 0; h < this.animators.length; h++) {
                var d = this.animators[h], f = d.targetName;
                d.getLoop() || d.__changeFinalValue(f ? (e || n)[f] : e || n);
            }
            u && this._transitionState(t, s, o);
        }, t.prototype._attachComponent = function(t) {
            if ((!t.__zr || t.__hostTarget) && t !== this) {
                var e = this.__zr;
                e && t.addSelfToZr(e), t.__zr = e, t.__hostTarget = this;
            }
        }, t.prototype._detachComponent = function(t) {
            t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__hostTarget = null;
        }, t.prototype.getClipPath = function() {
            return this._clipPath;
        }, t.prototype.setClipPath = function(t) {
            this._clipPath && this._clipPath !== t && this.removeClipPath(), this._attachComponent(t), 
            this._clipPath = t, this.markRedraw();
        }, t.prototype.removeClipPath = function() {
            var t = this._clipPath;
            t && (this._detachComponent(t), this._clipPath = null, this.markRedraw());
        }, t.prototype.getTextContent = function() {
            return this._textContent;
        }, t.prototype.setTextContent = function(t) {
            var e = this._textContent;
            e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new gd(), 
            this._attachComponent(t), this._textContent = t, this.markRedraw());
        }, t.prototype.setTextConfig = function(t) {
            this.textConfig || (this.textConfig = {}), l(this.textConfig, t), this.markRedraw();
        }, t.prototype.removeTextConfig = function() {
            this.textConfig = null, this.markRedraw();
        }, t.prototype.removeTextContent = function() {
            var t = this._textContent;
            t && (t.innerTransformable = null, this._detachComponent(t), this._textContent = null, 
            this._innerTextDefaultStyle = null, this.markRedraw());
        }, t.prototype.getTextGuideLine = function() {
            return this._textGuide;
        }, t.prototype.setTextGuideLine = function(t) {
            this._textGuide && this._textGuide !== t && this.removeTextGuideLine(), this._attachComponent(t), 
            this._textGuide = t, this.markRedraw();
        }, t.prototype.removeTextGuideLine = function() {
            var t = this._textGuide;
            t && (this._detachComponent(t), this._textGuide = null, this.markRedraw());
        }, t.prototype.markRedraw = function() {
            this.__dirty |= fp;
            var t = this.__zr;
            t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
        }, t.prototype.dirty = function() {
            this.markRedraw();
        }, t.prototype._toggleHoverLayerFlag = function(t) {
            this.__inHover = t;
            var e = this._textContent, n = this._textGuide;
            e && (e.__inHover = t), n && (n.__inHover = t);
        }, t.prototype.addSelfToZr = function(t) {
            if (this.__zr !== t) {
                this.__zr = t;
                var e = this.animators;
                if (e) for (var n = 0; n < e.length; n++) t.animation.addAnimator(e[n]);
                this._clipPath && this._clipPath.addSelfToZr(t), this._textContent && this._textContent.addSelfToZr(t), 
                this._textGuide && this._textGuide.addSelfToZr(t);
            }
        }, t.prototype.removeSelfFromZr = function(t) {
            if (this.__zr) {
                this.__zr = null;
                var e = this.animators;
                if (e) for (var n = 0; n < e.length; n++) t.animation.removeAnimator(e[n]);
                this._clipPath && this._clipPath.removeSelfFromZr(t), this._textContent && this._textContent.removeSelfFromZr(t), 
                this._textGuide && this._textGuide.removeSelfFromZr(t);
            }
        }, t.prototype.animate = function(t, e, n) {
            var i = t ? this[t] : this, r = new qp(i, e, n);
            return t && (r.targetName = t), this.addAnimator(r, t), r;
        }, t.prototype.addAnimator = function(t, e) {
            var n = this.__zr, i = this;
            t.during(function() {
                i.updateDuringAnimation(e);
            }).done(function() {
                var e = i.animators, n = h(e, t);
                n >= 0 && e.splice(n, 1);
            }), this.animators.push(t), n && n.animation.addAnimator(t), n && n.wakeUp();
        }, t.prototype.updateDuringAnimation = function() {
            this.markRedraw();
        }, t.prototype.stopAnimation = function(t, e) {
            for (var n = this.animators, i = n.length, r = [], o = 0; i > o; o++) {
                var a = n[o];
                t && t !== a.scope ? r.push(a) : a.stop(e);
            }
            return this.animators = r, this;
        }, t.prototype.animateTo = function(t, e, n) {
            We(this, t, e, n);
        }, t.prototype.animateFrom = function(t, e, n) {
            We(this, t, e, n, !0);
        }, t.prototype._transitionState = function(t, e, n, i) {
            for (var r = We(this, e, n, i), o = 0; o < r.length; o++) r[o].__fromStateTransition = t;
        }, t.prototype.getBoundingRect = function() {
            return null;
        }, t.prototype.getPaintRect = function() {
            return null;
        }, t.initDefaultProps = function() {
            function e(t, e, i, r) {
                function o(t, e) {
                    Object.defineProperty(e, 0, {
                        get: function() {
                            return t[i];
                        },
                        set: function(e) {
                            t[i] = e;
                        }
                    }), Object.defineProperty(e, 1, {
                        get: function() {
                            return t[r];
                        },
                        set: function(e) {
                            t[r] = e;
                        }
                    });
                }
                Object.defineProperty(n, t, {
                    get: function() {
                        this[e] || o(this, this[e] = []);
                        return this[e];
                    },
                    set: function(t) {
                        this[i] = t[0], this[r] = t[1], this[e] = t, o(this, t);
                    }
                });
            }
            var n = t.prototype;
            n.type = "element", n.name = "", n.ignore = n.silent = n.isGroup = n.draggable = n.dragging = n.ignoreClip = n.__inHover = !1, 
            n.__dirty = fp, Object.defineProperty && (e("position", "_legacyPos", "x", "y"), 
            e("scale", "_legacyScale", "scaleX", "scaleY"), e("origin", "_legacyOrigin", "originX", "originY"));
        }(), t;
    }();
    p(Sd, zc), p(Sd, gd);
    var Md = function(t) {
        function e(e) {
            var n = t.call(this) || this;
            return n.isGroup = !0, n._children = [], n.attr(e), n;
        }
        return n(e, t), e.prototype.childrenRef = function() {
            return this._children;
        }, e.prototype.children = function() {
            return this._children.slice();
        }, e.prototype.childAt = function(t) {
            return this._children[t];
        }, e.prototype.childOfName = function(t) {
            for (var e = this._children, n = 0; n < e.length; n++) if (e[n].name === t) return e[n];
        }, e.prototype.childCount = function() {
            return this._children.length;
        }, e.prototype.add = function(t) {
            return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), 
            this;
        }, e.prototype.addBefore = function(t, e) {
            if (t && t !== this && t.parent !== this && e && e.parent === this) {
                var n = this._children, i = n.indexOf(e);
                i >= 0 && (n.splice(i, 0, t), this._doAdd(t));
            }
            return this;
        }, e.prototype.replace = function(t, e) {
            var n = h(this._children, t);
            return n >= 0 && this.replaceAt(e, n), this;
        }, e.prototype.replaceAt = function(t, e) {
            var n = this._children, i = n[e];
            if (t && t !== this && t.parent !== this && t !== i) {
                n[e] = t, i.parent = null;
                var r = this.__zr;
                r && i.removeSelfFromZr(r), this._doAdd(t);
            }
            return this;
        }, e.prototype._doAdd = function(t) {
            t.parent && t.parent.remove(t), t.parent = this;
            var e = this.__zr;
            e && e !== t.__zr && t.addSelfToZr(e), e && e.refresh();
        }, e.prototype.remove = function(t) {
            var e = this.__zr, n = this._children, i = h(n, t);
            return 0 > i || (n.splice(i, 1), t.parent = null, e && t.removeSelfFromZr(e), e && e.refresh()), 
            this;
        }, e.prototype.removeAll = function() {
            for (var t = this._children, e = this.__zr, n = 0; n < t.length; n++) {
                var i = t[n];
                e && i.removeSelfFromZr(e), i.parent = null;
            }
            return t.length = 0, this;
        }, e.prototype.eachChild = function(t, e) {
            for (var n = this._children, i = 0; i < n.length; i++) {
                var r = n[i];
                t.call(e, r, i);
            }
            return this;
        }, e.prototype.traverse = function(t, e) {
            for (var n = 0; n < this._children.length; n++) {
                var i = this._children[n], r = t.call(e, i);
                i.isGroup && !r && i.traverse(t, e);
            }
            return this;
        }, e.prototype.addSelfToZr = function(e) {
            t.prototype.addSelfToZr.call(this, e);
            for (var n = 0; n < this._children.length; n++) {
                this._children[n].addSelfToZr(e);
            }
        }, e.prototype.removeSelfFromZr = function(e) {
            t.prototype.removeSelfFromZr.call(this, e);
            for (var n = 0; n < this._children.length; n++) {
                this._children[n].removeSelfFromZr(e);
            }
        }, e.prototype.getBoundingRect = function(t) {
            for (var e = new op(0, 0, 0, 0), n = t || this._children, i = [], r = null, o = 0; o < n.length; o++) {
                var a = n[o];
                if (!a.ignore && !a.invisible) {
                    var s = a.getBoundingRect(), l = a.getLocalTransform(i);
                    l ? (op.applyTransform(e, s, l), (r = r || e.clone()).union(e)) : (r = r || s.clone()).union(s);
                }
            }
            return r || e;
        }, e;
    }(Sd);
    Md.prototype.type = "group";
    var Td = {}, Cd = {}, Id = function() {
        function t(t, e, n) {
            var i = this;
            this._sleepAfterStill = 10, this._stillFrameAccum = 0, this._needsRefresh = !0, 
            this._needsRefreshHover = !0, this._darkMode = !1, n = n || {}, this.dom = e, this.id = t;
            var r = new vp(), o = n.renderer || "canvas";
            Td[o] || (o = m(Td)[0]), n.useDirtyRect = null != n.useDirtyRect && n.useDirtyRect;
            var a = new Td[o](e, r, n, t), s = n.ssr || a.ssrOnly;
            this.storage = r, this.painter = a;
            var l, u = ic.node || ic.worker || s ? null : new id(a.getViewportRoot(), a.root), h = n.useCoarsePointer;
            (null == h || "auto" === h ? ic.touchEventsSupported : !!h) && (l = O(n.pointerSize, 44)), 
            this.handler = new cp(r, a, u, a.root, l), this.animation = new jp({
                stage: {
                    update: s ? null : function() {
                        return i._flush(!0);
                    }
                }
            }), s || this.animation.start();
        }
        return t.prototype.add = function(t) {
            t && (this.storage.addRoot(t), t.addSelfToZr(this), this.refresh());
        }, t.prototype.remove = function(t) {
            t && (this.storage.delRoot(t), t.removeSelfFromZr(this), this.refresh());
        }, t.prototype.configLayer = function(t, e) {
            this.painter.configLayer && this.painter.configLayer(t, e), this.refresh();
        }, t.prototype.setBackgroundColor = function(t) {
            this.painter.setBackgroundColor && this.painter.setBackgroundColor(t), this.refresh(), 
            this._backgroundColor = t, this._darkMode = function(t) {
                if (!t) return !1;
                if ("string" == typeof t) return fe(t, 1) < ad;
                if (t.colorStops) {
                    for (var e = t.colorStops, n = 0, i = e.length, r = 0; i > r; r++) n += fe(e[r].color, 1);
                    return ad > (n /= i);
                }
                return !1;
            }(t);
        }, t.prototype.getBackgroundColor = function() {
            return this._backgroundColor;
        }, t.prototype.setDarkMode = function(t) {
            this._darkMode = t;
        }, t.prototype.isDarkMode = function() {
            return this._darkMode;
        }, t.prototype.refreshImmediately = function(t) {
            t || this.animation.update(!0), this._needsRefresh = !1, this.painter.refresh(), 
            this._needsRefresh = !1;
        }, t.prototype.refresh = function() {
            this._needsRefresh = !0, this.animation.start();
        }, t.prototype.flush = function() {
            this._flush(!1);
        }, t.prototype._flush = function(t) {
            var e, n = Te();
            this._needsRefresh && (e = !0, this.refreshImmediately(t)), this._needsRefreshHover && (e = !0, 
            this.refreshHoverImmediately());
            var i = Te();
            e ? (this._stillFrameAccum = 0, this.trigger("rendered", {
                elapsedTime: i - n
            })) : this._sleepAfterStill > 0 && (this._stillFrameAccum++, this._stillFrameAccum > this._sleepAfterStill && this.animation.stop());
        }, t.prototype.setSleepAfterStill = function(t) {
            this._sleepAfterStill = t;
        }, t.prototype.wakeUp = function() {
            this.animation.start(), this._stillFrameAccum = 0;
        }, t.prototype.refreshHover = function() {
            this._needsRefreshHover = !0;
        }, t.prototype.refreshHoverImmediately = function() {
            this._needsRefreshHover = !1, this.painter.refreshHover && "canvas" === this.painter.getType() && this.painter.refreshHover();
        }, t.prototype.resize = function(t) {
            t = t || {}, this.painter.resize(t.width, t.height), this.handler.resize();
        }, t.prototype.clearAnimation = function() {
            this.animation.clear();
        }, t.prototype.getWidth = function() {
            return this.painter.getWidth();
        }, t.prototype.getHeight = function() {
            return this.painter.getHeight();
        }, t.prototype.setCursorStyle = function(t) {
            this.handler.setCursorStyle(t);
        }, t.prototype.findHover = function(t, e) {
            return this.handler.findHover(t, e);
        }, t.prototype.on = function(t, e, n) {
            return this.handler.on(t, e, n), this;
        }, t.prototype.off = function(t, e) {
            this.handler.off(t, e);
        }, t.prototype.trigger = function(t, e) {
            this.handler.trigger(t, e);
        }, t.prototype.clear = function() {
            for (var t = this.storage.getRoots(), e = 0; e < t.length; e++) t[e] instanceof Md && t[e].removeSelfFromZr(this);
            this.storage.delAllRoots(), this.painter.clear();
        }, t.prototype.dispose = function() {
            this.animation.stop(), this.clear(), this.storage.dispose(), this.painter.dispose(), 
            this.handler.dispose(), this.animation = this.storage = this.painter = this.handler = null, 
            function(t) {
                delete Cd[t];
            }(this.id);
        }, t;
    }(), kd = (Object.freeze || Object)({
        init: Ye,
        dispose: function(t) {
            t.dispose();
        },
        disposeAll: function() {
            for (var t in Cd) Cd.hasOwnProperty(t) && Cd[t].dispose();
            Cd = {};
        },
        getInstance: function(t) {
            return Cd[t];
        },
        registerPainter: qe,
        version: "5.4.4"
    }), Dd = 1e-4, Ad = 20, Pd = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/, Ld = ("undefined" != typeof console && console.warn && console.log, 
    "series\0"), Od = "\0_ec_\0", Rd = [ "fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding" ], Bd = hn(), Ed = {
        useDefault: !0,
        enableAll: !1,
        enableNone: !1
    }, zd = ".", Nd = "___EC__COMPONENT__CONTAINER___", Fd = "___EC__EXTENDED_CLASS___", Vd = Math.round(10 * Math.random()), Hd = En([ [ "fill", "color" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "opacity" ], [ "shadowColor" ] ]), Wd = function() {
        function t() {}
        return t.prototype.getAreaStyle = function(t, e) {
            return Hd(this, t, e);
        }, t;
    }(), Gd = new Op(50), Ud = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g, Xd = function() {}, Yd = function(t) {
        this.tokens = [], t && (this.tokens = t);
    }, qd = function() {
        this.width = 0, this.height = 0, this.contentWidth = 0, this.contentHeight = 0, 
        this.outerWidth = 0, this.outerHeight = 0, this.lines = [];
    }, jd = y(",&?/;] ".split(""), function(t, e) {
        return t[e] = !0, t;
    }, {}), Zd = "__zr_style_" + Math.round(10 * Math.random()), Kd = {
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: "#000",
        opacity: 1,
        blend: "source-over"
    }, $d = {
        style: {
            shadowBlur: !0,
            shadowOffsetX: !0,
            shadowOffsetY: !0,
            shadowColor: !0,
            opacity: !0
        }
    };
    Kd[Zd] = !0;
    var Qd = [ "z", "z2", "invisible" ], Jd = [ "invisible" ], tf = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype._init = function(e) {
            for (var n = m(e), i = 0; i < n.length; i++) {
                var r = n[i];
                "style" === r ? this.useStyle(e[r]) : t.prototype.attrKV.call(this, r, e[r]);
            }
            this.style || this.useStyle({});
        }, e.prototype.beforeBrush = function() {}, e.prototype.afterBrush = function() {}, 
        e.prototype.innerBeforeBrush = function() {}, e.prototype.innerAfterBrush = function() {}, 
        e.prototype.shouldBePainted = function(t, e, n, i) {
            var r = this.transform;
            if (this.ignore || this.invisible || 0 === this.style.opacity || this.culling && function(t, e, n) {
                return ef.copy(t.getBoundingRect()), t.transform && ef.applyTransform(t.transform), 
                nf.width = e, nf.height = n, !ef.intersect(nf);
            }(this, t, e) || r && !r[0] && !r[3]) return !1;
            if (n && this.__clipPaths) for (var o = 0; o < this.__clipPaths.length; ++o) if (this.__clipPaths[o].isZeroArea()) return !1;
            if (i && this.parent) for (var a = this.parent; a; ) {
                if (a.ignore) return !1;
                a = a.parent;
            }
            return !0;
        }, e.prototype.contain = function(t, e) {
            return this.rectContain(t, e);
        }, e.prototype.traverse = function(t, e) {
            t.call(e, this);
        }, e.prototype.rectContain = function(t, e) {
            var n = this.transformCoordToLocal(t, e);
            return this.getBoundingRect().contain(n[0], n[1]);
        }, e.prototype.getPaintRect = function() {
            var t = this._paintRect;
            if (!this._paintRect || this.__dirty) {
                var e = this.transform, n = this.getBoundingRect(), i = this.style, r = i.shadowBlur || 0, o = i.shadowOffsetX || 0, a = i.shadowOffsetY || 0;
                t = this._paintRect || (this._paintRect = new op(0, 0, 0, 0)), e ? op.applyTransform(t, n, e) : t.copy(n), 
                (r || o || a) && (t.width += 2 * r + Math.abs(o), t.height += 2 * r + Math.abs(a), 
                t.x = Math.min(t.x, t.x + o - r), t.y = Math.min(t.y, t.y + a - r));
                var s = this.dirtyRectTolerance;
                t.isZero() || (t.x = Math.floor(t.x - s), t.y = Math.floor(t.y - s), t.width = Math.ceil(t.width + 1 + 2 * s), 
                t.height = Math.ceil(t.height + 1 + 2 * s));
            }
            return t;
        }, e.prototype.setPrevPaintRect = function(t) {
            t ? (this._prevPaintRect = this._prevPaintRect || new op(0, 0, 0, 0), this._prevPaintRect.copy(t)) : this._prevPaintRect = null;
        }, e.prototype.getPrevPaintRect = function() {
            return this._prevPaintRect;
        }, e.prototype.animateStyle = function(t) {
            return this.animate("style", t);
        }, e.prototype.updateDuringAnimation = function(t) {
            "style" === t ? this.dirtyStyle() : this.markRedraw();
        }, e.prototype.attrKV = function(e, n) {
            "style" !== e ? t.prototype.attrKV.call(this, e, n) : this.style ? this.setStyle(n) : this.useStyle(n);
        }, e.prototype.setStyle = function(t, e) {
            return "string" == typeof t ? this.style[t] = e : l(this.style, t), this.dirtyStyle(), 
            this;
        }, e.prototype.dirtyStyle = function(t) {
            t || this.markRedraw(), this.__dirty |= 2, this._rect && (this._rect = null);
        }, e.prototype.dirty = function() {
            this.dirtyStyle();
        }, e.prototype.styleChanged = function() {
            return !!(2 & this.__dirty);
        }, e.prototype.styleUpdated = function() {
            this.__dirty &= -3;
        }, e.prototype.createStyle = function(t) {
            return G(Kd, t);
        }, e.prototype.useStyle = function(t) {
            t[Zd] || (t = this.createStyle(t)), this.__inHover ? this.__hoverStyle = t : this.style = t, 
            this.dirtyStyle();
        }, e.prototype.isStyleObject = function(t) {
            return t[Zd];
        }, e.prototype._innerSaveToNormal = function(e) {
            t.prototype._innerSaveToNormal.call(this, e);
            var n = this._normalState;
            e.style && !n.style && (n.style = this._mergeStyle(this.createStyle(), this.style)), 
            this._savePrimaryToNormal(e, n, Qd);
        }, e.prototype._applyStateObj = function(e, n, i, r, o, a) {
            t.prototype._applyStateObj.call(this, e, n, i, r, o, a);
            var s, l = !(n && r);
            if (n && n.style ? o ? r ? s = n.style : (s = this._mergeStyle(this.createStyle(), i.style), 
            this._mergeStyle(s, n.style)) : (s = this._mergeStyle(this.createStyle(), r ? this.style : i.style), 
            this._mergeStyle(s, n.style)) : l && (s = i.style), s) if (o) {
                var u = this.style;
                if (this.style = this.createStyle(l ? {} : u), l) for (var h = m(u), c = 0; c < h.length; c++) {
                    (d = h[c]) in s && (s[d] = s[d], this.style[d] = u[d]);
                }
                var p = m(s);
                for (c = 0; c < p.length; c++) {
                    var d = p[c];
                    this.style[d] = this.style[d];
                }
                this._transitionState(e, {
                    style: s
                }, a, this.getAnimationStyleProps());
            } else this.useStyle(s);
            var f = this.__inHover ? Jd : Qd;
            for (c = 0; c < f.length; c++) {
                d = f[c];
                n && null != n[d] ? this[d] = n[d] : l && null != i[d] && (this[d] = i[d]);
            }
        }, e.prototype._mergeStates = function(e) {
            for (var n, i = t.prototype._mergeStates.call(this, e), r = 0; r < e.length; r++) {
                var o = e[r];
                o.style && (n = n || {}, this._mergeStyle(n, o.style));
            }
            return n && (i.style = n), i;
        }, e.prototype._mergeStyle = function(t, e) {
            return l(t, e), t;
        }, e.prototype.getAnimationStyleProps = function() {
            return $d;
        }, e.initDefaultProps = function() {
            var t = e.prototype;
            t.type = "displayable", t.invisible = !1, t.z = 0, t.z2 = 0, t.zlevel = 0, t.culling = !1, 
            t.cursor = "pointer", t.rectHover = !1, t.incremental = !1, t._rect = null, t.dirtyRectTolerance = 0, 
            t.__dirty = 2 | fp;
        }(), e;
    }(Sd), ef = new op(0, 0, 0, 0), nf = new op(0, 0, 0, 0), rf = Math.min, of = Math.max, af = Math.sin, sf = Math.cos, lf = 2 * Math.PI, uf = q(), hf = q(), cf = q(), pf = [], df = [], ff = {
        M: 1,
        L: 2,
        C: 3,
        Q: 4,
        A: 5,
        Z: 6,
        R: 7
    }, gf = [], yf = [], vf = [], mf = [], _f = [], xf = [], wf = Math.min, bf = Math.max, Sf = Math.cos, Mf = Math.sin, Tf = Math.abs, Cf = Math.PI, If = 2 * Cf, kf = "undefined" != typeof Float32Array, Df = [], Af = function() {
        function t(t) {
            this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, 
            t && (this._saveData = !1), this._saveData && (this.data = []);
        }
        return t.prototype.increaseVersion = function() {
            this._version++;
        }, t.prototype.getVersion = function() {
            return this._version;
        }, t.prototype.setScale = function(t, e, n) {
            (n = n || 0) > 0 && (this._ux = Tf(n / od / t) || 0, this._uy = Tf(n / od / e) || 0);
        }, t.prototype.setDPR = function(t) {
            this.dpr = t;
        }, t.prototype.setContext = function(t) {
            this._ctx = t;
        }, t.prototype.getContext = function() {
            return this._ctx;
        }, t.prototype.beginPath = function() {
            return this._ctx && this._ctx.beginPath(), this.reset(), this;
        }, t.prototype.reset = function() {
            this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, 
            this._pathLen = 0), this._version++;
        }, t.prototype.moveTo = function(t, e) {
            return this._drawPendingPt(), this.addData(ff.M, t, e), this._ctx && this._ctx.moveTo(t, e), 
            this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
        }, t.prototype.lineTo = function(t, e) {
            var n = Tf(t - this._xi), i = Tf(e - this._yi), r = n > this._ux || i > this._uy;
            if (this.addData(ff.L, t, e), this._ctx && r && this._ctx.lineTo(t, e), r) this._xi = t, 
            this._yi = e, this._pendingPtDist = 0; else {
                var o = n * n + i * i;
                o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
            }
            return this;
        }, t.prototype.bezierCurveTo = function(t, e, n, i, r, o) {
            return this._drawPendingPt(), this.addData(ff.C, t, e, n, i, r, o), this._ctx && this._ctx.bezierCurveTo(t, e, n, i, r, o), 
            this._xi = r, this._yi = o, this;
        }, t.prototype.quadraticCurveTo = function(t, e, n, i) {
            return this._drawPendingPt(), this.addData(ff.Q, t, e, n, i), this._ctx && this._ctx.quadraticCurveTo(t, e, n, i), 
            this._xi = n, this._yi = i, this;
        }, t.prototype.arc = function(t, e, n, i, r, o) {
            this._drawPendingPt(), Df[0] = i, Df[1] = r, Jn(Df, o), i = Df[0];
            var a = (r = Df[1]) - i;
            return this.addData(ff.A, t, e, n, n, i, a, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, n, i, r, o), 
            this._xi = Sf(r) * n + t, this._yi = Mf(r) * n + e, this;
        }, t.prototype.arcTo = function(t, e, n, i, r) {
            return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, n, i, r), this;
        }, t.prototype.rect = function(t, e, n, i) {
            return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, n, i), this.addData(ff.R, t, e, n, i), 
            this;
        }, t.prototype.closePath = function() {
            this._drawPendingPt(), this.addData(ff.Z);
            var t = this._ctx, e = this._x0, n = this._y0;
            return t && t.closePath(), this._xi = e, this._yi = n, this;
        }, t.prototype.fill = function(t) {
            t && t.fill(), this.toStatic();
        }, t.prototype.stroke = function(t) {
            t && t.stroke(), this.toStatic();
        }, t.prototype.len = function() {
            return this._len;
        }, t.prototype.setData = function(t) {
            var e = t.length;
            this.data && this.data.length === e || !kf || (this.data = new Float32Array(e));
            for (var n = 0; e > n; n++) this.data[n] = t[n];
            this._len = e;
        }, t.prototype.appendPath = function(t) {
            t instanceof Array || (t = [ t ]);
            for (var e = t.length, n = 0, i = this._len, r = 0; e > r; r++) n += t[r].len();
            kf && this.data instanceof Float32Array && (this.data = new Float32Array(i + n));
            for (r = 0; e > r; r++) for (var o = t[r].data, a = 0; a < o.length; a++) this.data[i++] = o[a];
            this._len = i;
        }, t.prototype.addData = function() {
            if (this._saveData) {
                var t = this.data;
                this._len + arguments.length > t.length && (this._expandData(), t = this.data);
                for (var e = 0; e < arguments.length; e++) t[this._len++] = arguments[e];
            }
        }, t.prototype._drawPendingPt = function() {
            this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), 
            this._pendingPtDist = 0);
        }, t.prototype._expandData = function() {
            if (!(this.data instanceof Array)) {
                for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
                this.data = t;
            }
        }, t.prototype.toStatic = function() {
            if (this._saveData) {
                this._drawPendingPt();
                var t = this.data;
                t instanceof Array && (t.length = this._len, kf && this._len > 11 && (this.data = new Float32Array(t)));
            }
        }, t.prototype.getBoundingRect = function() {
            vf[0] = vf[1] = _f[0] = _f[1] = Number.MAX_VALUE, mf[0] = mf[1] = xf[0] = xf[1] = -Number.MAX_VALUE;
            var t, e = this.data, n = 0, i = 0, r = 0, o = 0;
            for (t = 0; t < this._len; ) {
                var a = e[t++], s = 1 === t;
                switch (s && (r = n = e[t], o = i = e[t + 1]), a) {
                  case ff.M:
                    n = r = e[t++], i = o = e[t++], _f[0] = r, _f[1] = o, xf[0] = r, xf[1] = o;
                    break;

                  case ff.L:
                    jn(n, i, e[t], e[t + 1], _f, xf), n = e[t++], i = e[t++];
                    break;

                  case ff.C:
                    Zn(n, i, e[t++], e[t++], e[t++], e[t++], e[t], e[t + 1], _f, xf), n = e[t++], i = e[t++];
                    break;

                  case ff.Q:
                    Kn(n, i, e[t++], e[t++], e[t], e[t + 1], _f, xf), n = e[t++], i = e[t++];
                    break;

                  case ff.A:
                    var l = e[t++], u = e[t++], h = e[t++], c = e[t++], p = e[t++], d = e[t++] + p;
                    t += 1;
                    var f = !e[t++];
                    s && (r = Sf(p) * h + l, o = Mf(p) * c + u), $n(l, u, h, c, p, d, f, _f, xf), n = Sf(d) * h + l, 
                    i = Mf(d) * c + u;
                    break;

                  case ff.R:
                    jn(r = n = e[t++], o = i = e[t++], r + e[t++], o + e[t++], _f, xf);
                    break;

                  case ff.Z:
                    n = r, i = o;
                }
                ot(vf, vf, _f), at(mf, mf, xf);
            }
            return 0 === t && (vf[0] = vf[1] = mf[0] = mf[1] = 0), new op(vf[0], vf[1], mf[0] - vf[0], mf[1] - vf[1]);
        }, t.prototype._calculateLength = function() {
            var t = this.data, e = this._len, n = this._ux, i = this._uy, r = 0, o = 0, a = 0, s = 0;
            this._pathSegLen || (this._pathSegLen = []);
            for (var l = this._pathSegLen, u = 0, h = 0, c = 0; e > c; ) {
                var p = t[c++], d = 1 === c;
                d && (a = r = t[c], s = o = t[c + 1]);
                var f = -1;
                switch (p) {
                  case ff.M:
                    r = a = t[c++], o = s = t[c++];
                    break;

                  case ff.L:
                    var g = t[c++], y = (_ = t[c++]) - o;
                    (Tf(D = g - r) > n || Tf(y) > i || c === e - 1) && (f = Math.sqrt(D * D + y * y), 
                    r = g, o = _);
                    break;

                  case ff.C:
                    var v = t[c++], m = t[c++], _ = (g = t[c++], t[c++]), x = t[c++], w = t[c++];
                    f = Xt(r, o, v, m, g, _, x, w, 10), r = x, o = w;
                    break;

                  case ff.Q:
                    f = $t(r, o, v = t[c++], m = t[c++], g = t[c++], _ = t[c++], 10), r = g, o = _;
                    break;

                  case ff.A:
                    var b = t[c++], S = t[c++], M = t[c++], T = t[c++], C = t[c++], I = t[c++], k = I + C;
                    c += 1, t[c++], d && (a = Sf(C) * M + b, s = Mf(C) * T + S), f = bf(M, T) * wf(If, Math.abs(I)), 
                    r = Sf(k) * M + b, o = Mf(k) * T + S;
                    break;

                  case ff.R:
                    a = r = t[c++], s = o = t[c++], f = 2 * t[c++] + 2 * t[c++];
                    break;

                  case ff.Z:
                    var D = a - r;
                    y = s - o;
                    f = Math.sqrt(D * D + y * y), r = a, o = s;
                }
                f >= 0 && (l[h++] = f, u += f);
            }
            return this._pathLen = u, u;
        }, t.prototype.rebuildPath = function(t, e) {
            var n, i, r, o, a, s, l, u, h, c, p = this.data, d = this._ux, f = this._uy, g = this._len, y = 1 > e, v = 0, m = 0, _ = 0;
            if (!y || (this._pathSegLen || this._calculateLength(), l = this._pathSegLen, u = e * this._pathLen)) t: for (var x = 0; g > x; ) {
                var w = p[x++], b = 1 === x;
                switch (b && (n = r = p[x], i = o = p[x + 1]), w !== ff.L && _ > 0 && (t.lineTo(h, c), 
                _ = 0), w) {
                  case ff.M:
                    n = r = p[x++], i = o = p[x++], t.moveTo(r, o);
                    break;

                  case ff.L:
                    a = p[x++], s = p[x++];
                    var S = Tf(a - r), M = Tf(s - o);
                    if (S > d || M > f) {
                        if (y) {
                            if (v + (j = l[m++]) > u) {
                                var T = (u - v) / j;
                                t.lineTo(r * (1 - T) + a * T, o * (1 - T) + s * T);
                                break t;
                            }
                            v += j;
                        }
                        t.lineTo(a, s), r = a, o = s, _ = 0;
                    } else {
                        var C = S * S + M * M;
                        C > _ && (h = a, c = s, _ = C);
                    }
                    break;

                  case ff.C:
                    var I = p[x++], k = p[x++], D = p[x++], A = p[x++], P = p[x++], L = p[x++];
                    if (y) {
                        if (v + (j = l[m++]) > u) {
                            Gt(r, I, D, P, T = (u - v) / j, gf), Gt(o, k, A, L, T, yf), t.bezierCurveTo(gf[1], yf[1], gf[2], yf[2], gf[3], yf[3]);
                            break t;
                        }
                        v += j;
                    }
                    t.bezierCurveTo(I, k, D, A, P, L), r = P, o = L;
                    break;

                  case ff.Q:
                    I = p[x++], k = p[x++], D = p[x++], A = p[x++];
                    if (y) {
                        if (v + (j = l[m++]) > u) {
                            Zt(r, I, D, T = (u - v) / j, gf), Zt(o, k, A, T, yf), t.quadraticCurveTo(gf[1], yf[1], gf[2], yf[2]);
                            break t;
                        }
                        v += j;
                    }
                    t.quadraticCurveTo(I, k, D, A), r = D, o = A;
                    break;

                  case ff.A:
                    var O = p[x++], R = p[x++], B = p[x++], E = p[x++], z = p[x++], N = p[x++], F = p[x++], V = !p[x++], H = B > E ? B : E, W = Tf(B - E) > .001, G = z + N, U = !1;
                    if (y) v + (j = l[m++]) > u && (G = z + N * (u - v) / j, U = !0), v += j;
                    if (W && t.ellipse ? t.ellipse(O, R, B, E, F, z, G, V) : t.arc(O, R, H, z, G, V), 
                    U) break t;
                    b && (n = Sf(z) * B + O, i = Mf(z) * E + R), r = Sf(G) * B + O, o = Mf(G) * E + R;
                    break;

                  case ff.R:
                    n = r = p[x], i = o = p[x + 1], a = p[x++], s = p[x++];
                    var X = p[x++], Y = p[x++];
                    if (y) {
                        if (v + (j = l[m++]) > u) {
                            var q = u - v;
                            t.moveTo(a, s), t.lineTo(a + wf(q, X), s), (q -= X) > 0 && t.lineTo(a + X, s + wf(q, Y)), 
                            (q -= Y) > 0 && t.lineTo(a + bf(X - q, 0), s + Y), (q -= X) > 0 && t.lineTo(a, s + bf(Y - q, 0));
                            break t;
                        }
                        v += j;
                    }
                    t.rect(a, s, X, Y);
                    break;

                  case ff.Z:
                    if (y) {
                        var j;
                        if (v + (j = l[m++]) > u) {
                            T = (u - v) / j;
                            t.lineTo(r * (1 - T) + n * T, o * (1 - T) + i * T);
                            break t;
                        }
                        v += j;
                    }
                    t.closePath(), r = n, o = i;
                }
            }
        }, t.prototype.clone = function() {
            var e = new t(), n = this.data;
            return e.data = n.slice ? n.slice() : Array.prototype.slice.call(n), e._len = this._len, 
            e;
        }, t.CMD = ff, t.initDefaultProps = function() {
            var e = t.prototype;
            e._saveData = !0, e._ux = 0, e._uy = 0, e._pendingPtDist = 0, e._version = 0;
        }(), t;
    }(), Pf = 2 * Math.PI, Lf = 2 * Math.PI, Of = Af.CMD, Rf = 2 * Math.PI, Bf = 1e-4, Ef = [ -1, -1, -1 ], zf = [ -1, -1 ], Nf = u({
        fill: "#000",
        stroke: null,
        strokePercent: 1,
        fillOpacity: 1,
        strokeOpacity: 1,
        lineDashOffset: 0,
        lineWidth: 1,
        lineCap: "butt",
        miterLimit: 10,
        strokeNoScale: !1,
        strokeFirst: !1
    }, Kd), Ff = {
        style: u({
            fill: !0,
            stroke: !0,
            strokePercent: !0,
            fillOpacity: !0,
            strokeOpacity: !0,
            lineDashOffset: !0,
            lineWidth: !0,
            miterLimit: !0
        }, $d.style)
    }, Vf = yd.concat([ "invisible", "culling", "z", "z2", "zlevel", "parent" ]), Hf = function(e) {
        function i(t) {
            return e.call(this, t) || this;
        }
        return n(i, e), i.prototype.update = function() {
            var t = this;
            e.prototype.update.call(this);
            var n = this.style;
            if (n.decal) {
                var r = this._decalEl = this._decalEl || new i();
                r.buildPath === i.prototype.buildPath && (r.buildPath = function(e) {
                    t.buildPath(e, t.shape);
                }), r.silent = !0;
                var o = r.style;
                for (var a in n) o[a] !== n[a] && (o[a] = n[a]);
                o.fill = n.fill ? n.decal : null, o.decal = null, o.shadowColor = null, n.strokeFirst && (o.stroke = null);
                for (var s = 0; s < Vf.length; ++s) r[Vf[s]] = this[Vf[s]];
                r.__dirty |= fp;
            } else this._decalEl && (this._decalEl = null);
        }, i.prototype.getDecalElement = function() {
            return this._decalEl;
        }, i.prototype._init = function(t) {
            var n = m(t);
            this.shape = this.getDefaultShape();
            var i = this.getDefaultStyle();
            i && this.useStyle(i);
            for (var r = 0; r < n.length; r++) {
                var o = n[r], a = t[o];
                "style" === o ? this.style ? l(this.style, a) : this.useStyle(a) : "shape" === o ? l(this.shape, a) : e.prototype.attrKV.call(this, o, a);
            }
            this.style || this.useStyle({});
        }, i.prototype.getDefaultStyle = function() {
            return null;
        }, i.prototype.getDefaultShape = function() {
            return {};
        }, i.prototype.canBeInsideText = function() {
            return this.hasFill();
        }, i.prototype.getInsideTextFill = function() {
            var t = this.style.fill;
            if ("none" !== t) {
                if (b(t)) {
                    var e = fe(t, 0);
                    return e > .5 ? sd : e > .2 ? "#eee" : ld;
                }
                if (t) return ld;
            }
            return sd;
        }, i.prototype.getInsideTextStroke = function(t) {
            var e = this.style.fill;
            if (b(e)) {
                var n = this.__zr;
                if (!(!n || !n.isDarkMode()) === fe(t, 0) < ad) return e;
            }
        }, i.prototype.buildPath = function() {}, i.prototype.pathUpdated = function() {
            this.__dirty &= ~gp;
        }, i.prototype.getUpdatedPathProxy = function(t) {
            return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, t), 
            this.path;
        }, i.prototype.createPathProxy = function() {
            this.path = new Af(!1);
        }, i.prototype.hasStroke = function() {
            var t = this.style, e = t.stroke;
            return !(null == e || "none" === e || !(t.lineWidth > 0));
        }, i.prototype.hasFill = function() {
            var t = this.style.fill;
            return null != t && "none" !== t;
        }, i.prototype.getBoundingRect = function() {
            var t = this._rect, e = this.style, n = !t;
            if (n) {
                var i = !1;
                this.path || (i = !0, this.createPathProxy());
                var r = this.path;
                (i || this.__dirty & gp) && (r.beginPath(), this.buildPath(r, this.shape, !1), this.pathUpdated()), 
                t = r.getBoundingRect();
            }
            if (this._rect = t, this.hasStroke() && this.path && this.path.len() > 0) {
                var o = this._rectStroke || (this._rectStroke = t.clone());
                if (this.__dirty || n) {
                    o.copy(t);
                    var a = e.strokeNoScale ? this.getLineScale() : 1, s = e.lineWidth;
                    if (!this.hasFill()) {
                        var l = this.strokeContainThreshold;
                        s = Math.max(s, null == l ? 4 : l);
                    }
                    a > 1e-10 && (o.width += s / a, o.height += s / a, o.x -= s / a / 2, o.y -= s / a / 2);
                }
                return o;
            }
            return t;
        }, i.prototype.contain = function(t, e) {
            var n = this.transformCoordToLocal(t, e), i = this.getBoundingRect(), r = this.style;
            if (t = n[0], e = n[1], i.contain(t, e)) {
                var o = this.path;
                if (this.hasStroke()) {
                    var a = r.lineWidth, s = r.strokeNoScale ? this.getLineScale() : 1;
                    if (s > 1e-10 && (this.hasFill() || (a = Math.max(a, this.strokeContainThreshold)), 
                    function(t, e, n, i) {
                        return hi(t, e, !0, n, i);
                    }(o, a / s, t, e))) return !0;
                }
                if (this.hasFill()) return function(t, e, n) {
                    return hi(t, 0, !1, e, n);
                }(o, t, e);
            }
            return !1;
        }, i.prototype.dirtyShape = function() {
            this.__dirty |= gp, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), 
            this.markRedraw();
        }, i.prototype.dirty = function() {
            this.dirtyStyle(), this.dirtyShape();
        }, i.prototype.animateShape = function(t) {
            return this.animate("shape", t);
        }, i.prototype.updateDuringAnimation = function(t) {
            "style" === t ? this.dirtyStyle() : "shape" === t ? this.dirtyShape() : this.markRedraw();
        }, i.prototype.attrKV = function(t, n) {
            "shape" === t ? this.setShape(n) : e.prototype.attrKV.call(this, t, n);
        }, i.prototype.setShape = function(t, e) {
            var n = this.shape;
            return n || (n = this.shape = {}), "string" == typeof t ? n[t] = e : l(n, t), this.dirtyShape(), 
            this;
        }, i.prototype.shapeChanged = function() {
            return !!(this.__dirty & gp);
        }, i.prototype.createStyle = function(t) {
            return G(Nf, t);
        }, i.prototype._innerSaveToNormal = function(t) {
            e.prototype._innerSaveToNormal.call(this, t);
            var n = this._normalState;
            t.shape && !n.shape && (n.shape = l({}, this.shape));
        }, i.prototype._applyStateObj = function(n, i, r, o, a, s) {
            e.prototype._applyStateObj.call(this, n, i, r, o, a, s);
            var u, h = !(i && o);
            if (i && i.shape ? a ? o ? u = i.shape : (u = l({}, r.shape), l(u, i.shape)) : (u = l({}, o ? this.shape : r.shape), 
            l(u, i.shape)) : h && (u = r.shape), u) if (a) {
                this.shape = l({}, this.shape);
                for (var c = {}, p = m(u), d = 0; d < p.length; d++) {
                    var f = p[d];
                    "object" == t(u[f]) ? this.shape[f] = u[f] : c[f] = u[f];
                }
                this._transitionState(n, {
                    shape: c
                }, s);
            } else this.shape = u, this.dirtyShape();
        }, i.prototype._mergeStates = function(t) {
            for (var n, i = e.prototype._mergeStates.call(this, t), r = 0; r < t.length; r++) {
                var o = t[r];
                o.shape && (n = n || {}, this._mergeStyle(n, o.shape));
            }
            return n && (i.shape = n), i;
        }, i.prototype.getAnimationStyleProps = function() {
            return Ff;
        }, i.prototype.isZeroArea = function() {
            return !1;
        }, i.extend = function(t) {
            var e = function(e) {
                function i(n) {
                    var i = e.call(this, n) || this;
                    return t.init && t.init.call(i, n), i;
                }
                return n(i, e), i.prototype.getDefaultStyle = function() {
                    return a(t.style);
                }, i.prototype.getDefaultShape = function() {
                    return a(t.shape);
                }, i;
            }(i);
            for (var r in t) "function" == typeof t[r] && (e.prototype[r] = t[r]);
            return e;
        }, i.initDefaultProps = function() {
            var t = i.prototype;
            t.type = "path", t.strokeContainThreshold = 5, t.segmentIgnoreThreshold = 0, t.subPixelOptimize = !1, 
            t.autoBatch = !1, t.__dirty = 2 | fp | gp;
        }(), i;
    }(tf), Wf = u({
        strokeFirst: !0,
        font: oc,
        x: 0,
        y: 0,
        textAlign: "left",
        textBaseline: "top",
        miterLimit: 2
    }, Nf), Gf = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this;
        }
        return n(e, t), e.prototype.hasStroke = function() {
            var t = this.style, e = t.stroke;
            return null != e && "none" !== e && t.lineWidth > 0;
        }, e.prototype.hasFill = function() {
            var t = this.style.fill;
            return null != t && "none" !== t;
        }, e.prototype.createStyle = function(t) {
            return G(Wf, t);
        }, e.prototype.setBoundingRect = function(t) {
            this._rect = t;
        }, e.prototype.getBoundingRect = function() {
            var t = this.style;
            if (!this._rect) {
                var e = t.text;
                null != e ? e += "" : e = "";
                var n = Ee(e, t.font, t.textAlign, t.textBaseline);
                if (n.x += t.x || 0, n.y += t.y || 0, this.hasStroke()) {
                    var i = t.lineWidth;
                    n.x -= i / 2, n.y -= i / 2, n.width += i, n.height += i;
                }
                this._rect = n;
            }
            return this._rect;
        }, e.initDefaultProps = void (e.prototype.dirtyRectTolerance = 10), e;
    }(tf);
    Gf.prototype.type = "tspan";
    var Uf = u({
        x: 0,
        y: 0
    }, Kd), Xf = {
        style: u({
            x: !0,
            y: !0,
            width: !0,
            height: !0,
            sx: !0,
            sy: !0,
            sWidth: !0,
            sHeight: !0
        }, $d.style)
    }, Yf = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this;
        }
        return n(e, t), e.prototype.createStyle = function(t) {
            return G(Uf, t);
        }, e.prototype._getSize = function(t) {
            var e = this.style, n = e[t];
            if (null != n) return n;
            var i = function(t) {
                return !!(t && "string" != typeof t && t.width && t.height);
            }(e.image) ? e.image : this.__image;
            if (!i) return 0;
            var r = "width" === t ? "height" : "width", o = e[r];
            return null == o ? i[t] : i[t] / i[r] * o;
        }, e.prototype.getWidth = function() {
            return this._getSize("width");
        }, e.prototype.getHeight = function() {
            return this._getSize("height");
        }, e.prototype.getAnimationStyleProps = function() {
            return Xf;
        }, e.prototype.getBoundingRect = function() {
            var t = this.style;
            return this._rect || (this._rect = new op(t.x || 0, t.y || 0, this.getWidth(), this.getHeight())), 
            this._rect;
        }, e;
    }(tf);
    Yf.prototype.type = "image";
    var qf = Math.round, jf = function() {
        this.x = 0, this.y = 0, this.width = 0, this.height = 0;
    }, Zf = {}, Kf = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype.getDefaultShape = function() {
            return new jf();
        }, e.prototype.buildPath = function(t, e) {
            var n, i, r, o;
            if (this.subPixelOptimize) {
                var a = pi(Zf, e, this.style);
                n = a.x, i = a.y, r = a.width, o = a.height, a.r = e.r, e = a;
            } else n = e.x, i = e.y, r = e.width, o = e.height;
            e.r ? function(t, e) {
                var n, i, r, o, a, s = e.x, l = e.y, u = e.width, h = e.height, c = e.r;
                0 > u && (s += u, u = -u), 0 > h && (l += h, h = -h), "number" == typeof c ? n = i = r = o = c : c instanceof Array ? 1 === c.length ? n = i = r = o = c[0] : 2 === c.length ? (n = r = c[0], 
                i = o = c[1]) : 3 === c.length ? (n = c[0], i = o = c[1], r = c[2]) : (n = c[0], 
                i = c[1], r = c[2], o = c[3]) : n = i = r = o = 0, n + i > u && (n *= u / (a = n + i), 
                i *= u / a), r + o > u && (r *= u / (a = r + o), o *= u / a), i + r > h && (i *= h / (a = i + r), 
                r *= h / a), n + o > h && (n *= h / (a = n + o), o *= h / a), t.moveTo(s + n, l), 
                t.lineTo(s + u - i, l), 0 !== i && t.arc(s + u - i, l + i, i, -Math.PI / 2, 0), 
                t.lineTo(s + u, l + h - r), 0 !== r && t.arc(s + u - r, l + h - r, r, 0, Math.PI / 2), 
                t.lineTo(s + o, l + h), 0 !== o && t.arc(s + o, l + h - o, o, Math.PI / 2, Math.PI), 
                t.lineTo(s, l + n), 0 !== n && t.arc(s + n, l + n, n, Math.PI, 1.5 * Math.PI);
            }(t, e) : t.rect(n, i, r, o);
        }, e.prototype.isZeroArea = function() {
            return !this.shape.width || !this.shape.height;
        }, e;
    }(Hf);
    Kf.prototype.type = "rect";
    var $f = {
        fill: "#000"
    }, Qf = {
        style: u({
            fill: !0,
            stroke: !0,
            fillOpacity: !0,
            strokeOpacity: !0,
            lineWidth: !0,
            fontSize: !0,
            lineHeight: !0,
            width: !0,
            height: !0,
            textShadowColor: !0,
            textShadowBlur: !0,
            textShadowOffsetX: !0,
            textShadowOffsetY: !0,
            backgroundColor: !0,
            padding: !0,
            borderColor: !0,
            borderWidth: !0,
            borderRadius: !0
        }, $d.style)
    }, Jf = function(t) {
        function e(e) {
            var n = t.call(this) || this;
            return n.type = "text", n._children = [], n._defaultStyle = $f, n.attr(e), n;
        }
        return n(e, t), e.prototype.childrenRef = function() {
            return this._children;
        }, e.prototype.update = function() {
            t.prototype.update.call(this), this.styleChanged() && this._updateSubTexts();
            for (var e = 0; e < this._children.length; e++) {
                var n = this._children[e];
                n.zlevel = this.zlevel, n.z = this.z, n.z2 = this.z2, n.culling = this.culling, 
                n.cursor = this.cursor, n.invisible = this.invisible;
            }
        }, e.prototype.updateTransform = function() {
            var e = this.innerTransformable;
            e ? (e.updateTransform(), e.transform && (this.transform = e.transform)) : t.prototype.updateTransform.call(this);
        }, e.prototype.getLocalTransform = function(e) {
            var n = this.innerTransformable;
            return n ? n.getLocalTransform(e) : t.prototype.getLocalTransform.call(this, e);
        }, e.prototype.getComputedTransform = function() {
            return this.__hostTarget && (this.__hostTarget.getComputedTransform(), this.__hostTarget.updateInnerText(!0)), 
            t.prototype.getComputedTransform.call(this);
        }, e.prototype._updateSubTexts = function() {
            this._childCursor = 0, function(t) {
                yi(t), f(t.rich, yi);
            }(this.style), this.style.rich ? this._updateRichTexts() : this._updatePlainTexts(), 
            this._children.length = this._childCursor, this.styleUpdated();
        }, e.prototype.addSelfToZr = function(e) {
            t.prototype.addSelfToZr.call(this, e);
            for (var n = 0; n < this._children.length; n++) this._children[n].__zr = e;
        }, e.prototype.removeSelfFromZr = function(e) {
            t.prototype.removeSelfFromZr.call(this, e);
            for (var n = 0; n < this._children.length; n++) this._children[n].__zr = null;
        }, e.prototype.getBoundingRect = function() {
            if (this.styleChanged() && this._updateSubTexts(), !this._rect) {
                for (var t = new op(0, 0, 0, 0), e = this._children, n = [], i = null, r = 0; r < e.length; r++) {
                    var o = e[r], a = o.getBoundingRect(), s = o.getLocalTransform(n);
                    s ? (t.copy(a), t.applyTransform(s), (i = i || t.clone()).union(t)) : (i = i || a.clone()).union(a);
                }
                this._rect = i || t;
            }
            return this._rect;
        }, e.prototype.setDefaultTextStyle = function(t) {
            this._defaultStyle = t || $f;
        }, e.prototype.setTextContent = function() {}, e.prototype._mergeStyle = function(t, e) {
            if (!e) return t;
            var n = e.rich, i = t.rich || n && {};
            return l(t, e), n && i ? (this._mergeRich(i, n), t.rich = i) : i && (t.rich = i), 
            t;
        }, e.prototype._mergeRich = function(t, e) {
            for (var n = m(e), i = 0; i < n.length; i++) {
                var r = n[i];
                t[r] = t[r] || {}, l(t[r], e[r]);
            }
        }, e.prototype.getAnimationStyleProps = function() {
            return Qf;
        }, e.prototype._getOrCreateChild = function(t) {
            var e = this._children[this._childCursor];
            return e && e instanceof t || (e = new t()), this._children[this._childCursor++] = e, 
            e.__zr = this.__zr, e.parent = this, e;
        }, e.prototype._updatePlainTexts = function() {
            var t = this.style, e = t.font || oc, n = t.padding, i = function(t, e) {
                null != t && (t += "");
                var n, i = e.overflow, r = e.padding, o = e.font, a = "truncate" === i, s = Fe(o), l = O(e.lineHeight, s), u = !!e.backgroundColor, h = "truncate" === e.lineOverflow, c = e.width, p = (n = null == c || "break" !== i && "breakAll" !== i ? t ? t.split("\n") : [] : t ? qn(t, e.font, c, "breakAll" === i, 0).lines : []).length * l, d = O(e.height, p);
                if (p > d && h) {
                    var f = Math.floor(d / l);
                    n = n.slice(0, f);
                }
                if (t && a && null != c) for (var g = Wn(c, o, e.ellipsis, {
                    minChar: e.truncateMinChar,
                    placeholder: e.placeholder
                }), y = 0; y < n.length; y++) n[y] = Gn(n[y], g);
                var v = d, m = 0;
                for (y = 0; y < n.length; y++) m = Math.max(Re(n[y], o), m);
                null == c && (c = m);
                var _ = m;
                return r && (v += r[0] + r[2], _ += r[1] + r[3], c += r[1] + r[3]), u && (_ = c), 
                {
                    lines: n,
                    height: d,
                    outerWidth: _,
                    outerHeight: v,
                    lineHeight: l,
                    calculatedLineHeight: s,
                    contentWidth: m,
                    contentHeight: p,
                    width: c
                };
            }(xi(t), t), r = wi(t), o = !!t.backgroundColor, a = i.outerHeight, s = i.outerWidth, l = i.contentWidth, u = i.lines, h = i.lineHeight, c = this._defaultStyle, p = t.x || 0, d = t.y || 0, f = t.align || c.align || "left", g = t.verticalAlign || c.verticalAlign || "top", y = p, v = Ne(d, i.contentHeight, g);
            if (r || n) {
                var m = ze(p, s, f), _ = Ne(d, a, g);
                r && this._renderBackground(t, t, m, _, s, a);
            }
            v += h / 2, n && (y = _i(p, f, n), "top" === g ? v += n[0] : "bottom" === g && (v -= n[2]));
            for (var x = 0, w = !1, b = (mi("fill" in t ? t.fill : (w = !0, c.fill))), S = (vi("stroke" in t ? t.stroke : o || c.autoStroke && !w ? null : (x = 2, 
            c.stroke))), M = t.textShadowBlur > 0, T = null != t.width && ("truncate" === t.overflow || "break" === t.overflow || "breakAll" === t.overflow), C = i.calculatedLineHeight, I = 0; I < u.length; I++) {
                var k = this._getOrCreateChild(Gf), D = k.createStyle();
                k.useStyle(D), D.text = u[I], D.x = y, D.y = v, f && (D.textAlign = f), D.textBaseline = "middle", 
                D.opacity = t.opacity, D.strokeFirst = !0, M && (D.shadowBlur = t.textShadowBlur || 0, 
                D.shadowColor = t.textShadowColor || "transparent", D.shadowOffsetX = t.textShadowOffsetX || 0, 
                D.shadowOffsetY = t.textShadowOffsetY || 0), D.stroke = S, D.fill = b, S && (D.lineWidth = t.lineWidth || x, 
                D.lineDash = t.lineDash, D.lineDashOffset = t.lineDashOffset || 0), D.font = e, 
                gi(D, t), v += h, T && k.setBoundingRect(new op(ze(D.x, t.width, D.textAlign), Ne(D.y, C, D.textBaseline), l, C));
            }
        }, e.prototype._updateRichTexts = function() {
            var t = this.style, e = function(t, e) {
                function n(t, e, n) {
                    t.width = e, t.lineHeight = n, p += n, d = Math.max(d, e);
                }
                var i = new qd();
                if (null != t && (t += ""), !t) return i;
                for (var r, o = e.width, a = e.height, s = e.overflow, l = "break" !== s && "breakAll" !== s || null == o ? null : {
                    width: o,
                    accumWidth: 0,
                    breakAll: "breakAll" === s
                }, u = Ud.lastIndex = 0; null != (r = Ud.exec(t)); ) {
                    var h = r.index;
                    h > u && Xn(i, t.substring(u, h), e, l), Xn(i, r[2], e, l, r[1]), u = Ud.lastIndex;
                }
                u < t.length && Xn(i, t.substring(u, t.length), e, l);
                var c = [], p = 0, d = 0, f = e.padding, g = "truncate" === s, y = "truncate" === e.lineOverflow;
                t: for (var v = 0; v < i.lines.length; v++) {
                    for (var m = i.lines[v], _ = 0, x = 0, w = 0; w < m.tokens.length; w++) {
                        var b = (L = m.tokens[w]).styleName && e.rich[L.styleName] || {}, S = L.textPadding = b.padding, M = S ? S[1] + S[3] : 0, T = L.font = b.font || e.font;
                        L.contentHeight = Fe(T);
                        var C = O(b.height, L.contentHeight);
                        if (L.innerHeight = C, S && (C += S[0] + S[2]), L.height = C, L.lineHeight = R(b.lineHeight, e.lineHeight, C), 
                        L.align = b && b.align || e.align, L.verticalAlign = b && b.verticalAlign || "middle", 
                        y && null != a && p + L.lineHeight > a) {
                            w > 0 ? (m.tokens = m.tokens.slice(0, w), n(m, x, _), i.lines = i.lines.slice(0, v + 1)) : i.lines = i.lines.slice(0, v);
                            break t;
                        }
                        var I = b.width, k = null == I || "auto" === I;
                        if ("string" == typeof I && "%" === I.charAt(I.length - 1)) L.percentWidth = I, 
                        c.push(L), L.contentWidth = Re(L.text, T); else {
                            if (k) {
                                var D = b.backgroundColor, A = D && D.image;
                                A && (Vn(A = zn(A)) && (L.width = Math.max(L.width, A.width * C / A.height)));
                            }
                            var P = g && null != o ? o - x : null;
                            null != P && P < L.width ? !k || M > P ? (L.text = "", L.width = L.contentWidth = 0) : (L.text = Hn(L.text, P - M, T, e.ellipsis, {
                                minChar: e.truncateMinChar
                            }), L.width = L.contentWidth = Re(L.text, T)) : L.contentWidth = Re(L.text, T);
                        }
                        L.width += M, x += L.width, b && (_ = Math.max(_, L.lineHeight));
                    }
                    n(m, x, _);
                }
                for (i.outerWidth = i.width = O(o, d), i.outerHeight = i.height = O(a, p), i.contentHeight = p, 
                i.contentWidth = d, f && (i.outerWidth += f[1] + f[3], i.outerHeight += f[0] + f[2]), 
                v = 0; v < c.length; v++) {
                    var L, B = (L = c[v]).percentWidth;
                    L.width = parseInt(B, 10) / 100 * i.width;
                }
                return i;
            }(xi(t), t), n = e.width, i = e.outerWidth, r = e.outerHeight, o = t.padding, a = t.x || 0, s = t.y || 0, l = this._defaultStyle, u = t.align || l.align, h = t.verticalAlign || l.verticalAlign, c = ze(a, i, u), p = Ne(s, r, h), d = c, f = p;
            o && (d += o[3], f += o[0]);
            var g = d + n;
            wi(t) && this._renderBackground(t, t, c, p, i, r);
            for (var y = !!t.backgroundColor, v = 0; v < e.lines.length; v++) {
                for (var m = e.lines[v], _ = m.tokens, x = _.length, w = m.lineHeight, b = m.width, S = 0, M = d, T = g, C = x - 1, I = void 0; x > S && (!(I = _[S]).align || "left" === I.align); ) this._placeToken(I, t, w, f, M, "left", y), 
                b -= I.width, M += I.width, S++;
                for (;C >= 0 && "right" === (I = _[C]).align; ) this._placeToken(I, t, w, f, T, "right", y), 
                b -= I.width, T -= I.width, C--;
                for (M += (n - (M - d) - (g - T) - b) / 2; C >= S; ) I = _[S], this._placeToken(I, t, w, f, M + I.width / 2, "center", y), 
                M += I.width, S++;
                f += w;
            }
        }, e.prototype._placeToken = function(t, e, n, i, r, o, a) {
            var s = e.rich[t.styleName] || {};
            s.text = t.text;
            var l = t.verticalAlign, u = i + n / 2;
            "top" === l ? u = i + t.height / 2 : "bottom" === l && (u = i + n - t.height / 2), 
            !t.isLineHolder && wi(s) && this._renderBackground(s, e, "right" === o ? r - t.width : "center" === o ? r - t.width / 2 : r, u - t.height / 2, t.width, t.height);
            var h = !!s.backgroundColor, c = t.textPadding;
            c && (r = _i(r, o, c), u -= t.height / 2 - c[0] - t.innerHeight / 2);
            var p = this._getOrCreateChild(Gf), d = p.createStyle();
            p.useStyle(d);
            var f = this._defaultStyle, g = !1, y = 0, v = mi("fill" in s ? s.fill : "fill" in e ? e.fill : (g = !0, 
            f.fill)), m = vi("stroke" in s ? s.stroke : "stroke" in e ? e.stroke : h || a || f.autoStroke && !g ? null : (y = 2, 
            f.stroke)), _ = s.textShadowBlur > 0 || e.textShadowBlur > 0;
            d.text = t.text, d.x = r, d.y = u, _ && (d.shadowBlur = s.textShadowBlur || e.textShadowBlur || 0, 
            d.shadowColor = s.textShadowColor || e.textShadowColor || "transparent", d.shadowOffsetX = s.textShadowOffsetX || e.textShadowOffsetX || 0, 
            d.shadowOffsetY = s.textShadowOffsetY || e.textShadowOffsetY || 0), d.textAlign = o, 
            d.textBaseline = "middle", d.font = t.font || oc, d.opacity = R(s.opacity, e.opacity, 1), 
            gi(d, s), m && (d.lineWidth = R(s.lineWidth, e.lineWidth, y), d.lineDash = O(s.lineDash, e.lineDash), 
            d.lineDashOffset = e.lineDashOffset || 0, d.stroke = m), v && (d.fill = v);
            var x = t.contentWidth, w = t.contentHeight;
            p.setBoundingRect(new op(ze(d.x, x, d.textAlign), Ne(d.y, w, d.textBaseline), x, w));
        }, e.prototype._renderBackground = function(t, e, n, i, r, o) {
            var a, s, l, u = t.backgroundColor, h = t.borderWidth, c = t.borderColor, p = u && u.image, d = u && !p, f = t.borderRadius, g = this;
            if (d || t.lineHeight || h && c) {
                (a = this._getOrCreateChild(Kf)).useStyle(a.createStyle()), a.style.fill = null;
                var y = a.shape;
                y.x = n, y.y = i, y.width = r, y.height = o, y.r = f, a.dirtyShape();
            }
            if (d) (l = a.style).fill = u || null, l.fillOpacity = O(t.fillOpacity, 1); else if (p) {
                (s = this._getOrCreateChild(Yf)).onload = function() {
                    g.dirtyStyle();
                };
                var v = s.style;
                v.image = u.image, v.x = n, v.y = i, v.width = r, v.height = o;
            }
            h && c && ((l = a.style).lineWidth = h, l.stroke = c, l.strokeOpacity = O(t.strokeOpacity, 1), 
            l.lineDash = t.borderDash, l.lineDashOffset = t.borderDashOffset || 0, a.strokeContainThreshold = 0, 
            a.hasFill() && a.hasStroke() && (l.strokeFirst = !0, l.lineWidth *= 2));
            var m = (a || s).style;
            m.shadowBlur = t.shadowBlur || 0, m.shadowColor = t.shadowColor || "transparent", 
            m.shadowOffsetX = t.shadowOffsetX || 0, m.shadowOffsetY = t.shadowOffsetY || 0, 
            m.opacity = R(t.opacity, e.opacity, 1);
        }, e.makeFont = function(t) {
            var e = "";
            return function(t) {
                return null != t.fontSize || t.fontFamily || t.fontWeight;
            }(t) && (e = [ t.fontStyle, t.fontWeight, fi(t.fontSize), t.fontFamily || "sans-serif" ].join(" ")), 
            e && N(e) || t.textFont || t.font;
        }, e;
    }(tf), tg = {
        left: !0,
        right: 1,
        center: 1
    }, eg = {
        top: 1,
        bottom: 1,
        middle: 1
    }, ng = [ "fontStyle", "fontWeight", "fontSize", "fontFamily" ], ig = Tn(), rg = function(t, e, n, i) {
        if (i) {
            var r = ig(i);
            r.dataIndex = n, r.dataType = e, r.seriesIndex = t, "group" === i.type && i.traverse(function(i) {
                var r = ig(i);
                r.seriesIndex = t, r.dataIndex = n, r.dataType = e;
            });
        }
    }, og = 1, ag = {}, sg = Tn(), lg = Tn(), ug = 0, hg = 1, cg = 2, pg = [ "emphasis", "blur", "select" ], dg = [ "normal", "emphasis", "blur", "select" ], fg = 10, gg = 9, yg = "highlight", vg = "downplay", mg = "select", _g = "unselect", xg = "toggleSelect", wg = new Op(100), bg = [ "emphasis", "blur", "select" ], Sg = {
        itemStyle: "getItemStyle",
        lineStyle: "getLineStyle",
        areaStyle: "getAreaStyle"
    }, Mg = Af.CMD, Tg = [ [], [], [] ], Cg = Math.sqrt, Ig = Math.atan2, kg = Math.sqrt, Dg = Math.sin, Ag = Math.cos, Pg = Math.PI, Lg = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi, Og = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g, Rg = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this;
        }
        return n(e, t), e.prototype.applyTransform = function() {}, e;
    }(Hf), Bg = function() {
        this.cx = 0, this.cy = 0, this.r = 0;
    }, Eg = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype.getDefaultShape = function() {
            return new Bg();
        }, e.prototype.buildPath = function(t, e) {
            t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI);
        }, e;
    }(Hf);
    Eg.prototype.type = "circle";
    var zg = function() {
        this.cx = 0, this.cy = 0, this.rx = 0, this.ry = 0;
    }, Ng = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype.getDefaultShape = function() {
            return new zg();
        }, e.prototype.buildPath = function(t, e) {
            var n = .5522848, i = e.cx, r = e.cy, o = e.rx, a = e.ry, s = o * n, l = a * n;
            t.moveTo(i - o, r), t.bezierCurveTo(i - o, r - l, i - s, r - a, i, r - a), t.bezierCurveTo(i + s, r - a, i + o, r - l, i + o, r), 
            t.bezierCurveTo(i + o, r + l, i + s, r + a, i, r + a), t.bezierCurveTo(i - s, r + a, i - o, r + l, i - o, r), 
            t.closePath();
        }, e;
    }(Hf);
    Ng.prototype.type = "ellipse";
    var Fg = Math.PI, Vg = 2 * Fg, Hg = Math.sin, Wg = Math.cos, Gg = Math.acos, Ug = Math.atan2, Xg = Math.abs, Yg = Math.sqrt, qg = Math.max, jg = Math.min, Zg = 1e-4, Kg = function() {
        this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = 2 * Math.PI, 
        this.clockwise = !0, this.cornerRadius = 0;
    }, $g = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype.getDefaultShape = function() {
            return new Kg();
        }, e.prototype.buildPath = function(t, e) {
            hr(t, e);
        }, e.prototype.isZeroArea = function() {
            return this.shape.startAngle === this.shape.endAngle || this.shape.r === this.shape.r0;
        }, e;
    }(Hf);
    $g.prototype.type = "sector";
    var Qg = function() {
        this.cx = 0, this.cy = 0, this.r = 0, this.r0 = 0;
    }, Jg = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype.getDefaultShape = function() {
            return new Qg();
        }, e.prototype.buildPath = function(t, e) {
            var n = e.cx, i = e.cy, r = 2 * Math.PI;
            t.moveTo(n + e.r, i), t.arc(n, i, e.r, 0, r, !1), t.moveTo(n + e.r0, i), t.arc(n, i, e.r0, 0, r, !0);
        }, e;
    }(Hf);
    Jg.prototype.type = "ring";
    var ty = function() {
        this.points = null, this.smooth = 0, this.smoothConstraint = null;
    }, ey = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype.getDefaultShape = function() {
            return new ty();
        }, e.prototype.buildPath = function(t, e) {
            cr(t, e, !0);
        }, e;
    }(Hf);
    ey.prototype.type = "polygon";
    var ny = function() {
        this.points = null, this.percent = 1, this.smooth = 0, this.smoothConstraint = null;
    }, iy = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype.getDefaultStyle = function() {
            return {
                stroke: "#000",
                fill: null
            };
        }, e.prototype.getDefaultShape = function() {
            return new ny();
        }, e.prototype.buildPath = function(t, e) {
            cr(t, e, !1);
        }, e;
    }(Hf);
    iy.prototype.type = "polyline";
    var ry = {}, oy = function() {
        this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.percent = 1;
    }, ay = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype.getDefaultStyle = function() {
            return {
                stroke: "#000",
                fill: null
            };
        }, e.prototype.getDefaultShape = function() {
            return new oy();
        }, e.prototype.buildPath = function(t, e) {
            var n, i, r, o;
            if (this.subPixelOptimize) {
                var a = ci(ry, e, this.style);
                n = a.x1, i = a.y1, r = a.x2, o = a.y2;
            } else n = e.x1, i = e.y1, r = e.x2, o = e.y2;
            var s = e.percent;
            0 !== s && (t.moveTo(n, i), 1 > s && (r = n * (1 - s) + r * s, o = i * (1 - s) + o * s), 
            t.lineTo(r, o));
        }, e.prototype.pointAt = function(t) {
            var e = this.shape;
            return [ e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t ];
        }, e;
    }(Hf);
    ay.prototype.type = "line";
    var sy = [], ly = function() {
        this.x1 = 0, this.y1 = 0, this.x2 = 0, this.y2 = 0, this.cpx1 = 0, this.cpy1 = 0, 
        this.percent = 1;
    }, uy = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype.getDefaultStyle = function() {
            return {
                stroke: "#000",
                fill: null
            };
        }, e.prototype.getDefaultShape = function() {
            return new ly();
        }, e.prototype.buildPath = function(t, e) {
            var n = e.x1, i = e.y1, r = e.x2, o = e.y2, a = e.cpx1, s = e.cpy1, l = e.cpx2, u = e.cpy2, h = e.percent;
            0 !== h && (t.moveTo(n, i), null == l || null == u ? (1 > h && (Zt(n, a, r, h, sy), 
            a = sy[1], r = sy[2], Zt(i, s, o, h, sy), s = sy[1], o = sy[2]), t.quadraticCurveTo(a, s, r, o)) : (1 > h && (Gt(n, a, l, r, h, sy), 
            a = sy[1], l = sy[2], r = sy[3], Gt(i, s, u, o, h, sy), s = sy[1], u = sy[2], o = sy[3]), 
            t.bezierCurveTo(a, s, l, u, r, o)));
        }, e.prototype.pointAt = function(t) {
            return pr(this.shape, t, !1);
        }, e.prototype.tangentAt = function(t) {
            var e = pr(this.shape, t, !0);
            return tt(e, e);
        }, e;
    }(Hf);
    uy.prototype.type = "bezier-curve";
    var hy = function() {
        this.cx = 0, this.cy = 0, this.r = 0, this.startAngle = 0, this.endAngle = 2 * Math.PI, 
        this.clockwise = !0;
    }, cy = function(t) {
        function e(e) {
            return t.call(this, e) || this;
        }
        return n(e, t), e.prototype.getDefaultStyle = function() {
            return {
                stroke: "#000",
                fill: null
            };
        }, e.prototype.getDefaultShape = function() {
            return new hy();
        }, e.prototype.buildPath = function(t, e) {
            var n = e.cx, i = e.cy, r = Math.max(e.r, 0), o = e.startAngle, a = e.endAngle, s = e.clockwise, l = Math.cos(o), u = Math.sin(o);
            t.moveTo(l * r + n, u * r + i), t.arc(n, i, r, o, a, !s);
        }, e;
    }(Hf);
    cy.prototype.type = "arc";
    var py = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.type = "compound", e;
        }
        return n(e, t), e.prototype._updatePathDirty = function() {
            for (var t = this.shape.paths, e = this.shapeChanged(), n = 0; n < t.length; n++) e = e || t[n].shapeChanged();
            e && this.dirtyShape();
        }, e.prototype.beforeBrush = function() {
            this._updatePathDirty();
            for (var t = this.shape.paths || [], e = this.getGlobalScale(), n = 0; n < t.length; n++) t[n].path || t[n].createPathProxy(), 
            t[n].path.setScale(e[0], e[1], t[n].segmentIgnoreThreshold);
        }, e.prototype.buildPath = function(t, e) {
            for (var n = e.paths || [], i = 0; i < n.length; i++) n[i].buildPath(t, n[i].shape, !0);
        }, e.prototype.afterBrush = function() {
            for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].pathUpdated();
        }, e.prototype.getBoundingRect = function() {
            return this._updatePathDirty.call(this), Hf.prototype.getBoundingRect.call(this);
        }, e;
    }(Hf), dy = function() {
        function t(t) {
            this.colorStops = t || [];
        }
        return t.prototype.addColorStop = function(t, e) {
            this.colorStops.push({
                offset: t,
                color: e
            });
        }, t;
    }(), fy = function(t) {
        function e(e, n, i, r, o, a) {
            var s = t.call(this, o) || this;
            return s.x = null == e ? 0 : e, s.y = null == n ? 0 : n, s.x2 = null == i ? 1 : i, 
            s.y2 = null == r ? 0 : r, s.type = "linear", s.global = a || !1, s;
        }
        return n(e, t), e;
    }(dy), gy = function(t) {
        function e(e, n, i, r, o) {
            var a = t.call(this, r) || this;
            return a.x = null == e ? .5 : e, a.y = null == n ? .5 : n, a.r = null == i ? .5 : i, 
            a.type = "radial", a.global = o || !1, a;
        }
        return n(e, t), e;
    }(dy), yy = [ 0, 0 ], vy = [ 0, 0 ], my = new Kc(), _y = new Kc(), xy = function() {
        function t(t, e) {
            this._corners = [], this._axes = [], this._origin = [ 0, 0 ];
            for (var n = 0; 4 > n; n++) this._corners[n] = new Kc();
            for (n = 0; 2 > n; n++) this._axes[n] = new Kc();
            t && this.fromBoundingRect(t, e);
        }
        return t.prototype.fromBoundingRect = function(t, e) {
            var n = this._corners, i = this._axes, r = t.x, o = t.y, a = r + t.width, s = o + t.height;
            if (n[0].set(r, o), n[1].set(a, o), n[2].set(a, s), n[3].set(r, s), e) for (var l = 0; 4 > l; l++) n[l].transform(e);
            Kc.sub(i[0], n[1], n[0]), Kc.sub(i[1], n[3], n[0]), i[0].normalize(), i[1].normalize();
            for (l = 0; 2 > l; l++) this._origin[l] = i[l].dot(n[0]);
        }, t.prototype.intersect = function(t, e) {
            var n = !0, i = !e;
            return my.set(1 / 0, 1 / 0), _y.set(0, 0), !this._intersectCheckOneSide(this, t, my, _y, i, 1) && (n = !1, 
            i) || !this._intersectCheckOneSide(t, this, my, _y, i, -1) && (n = !1, i) || i || Kc.copy(e, n ? my : _y), 
            n;
        }, t.prototype._intersectCheckOneSide = function(t, e, n, i, r, o) {
            for (var a = !0, s = 0; 2 > s; s++) {
                var l = this._axes[s];
                if (this._getProjMinMaxOnAxis(s, t._corners, yy), this._getProjMinMaxOnAxis(s, e._corners, vy), 
                yy[1] < vy[0] || yy[0] > vy[1]) {
                    if (a = !1, r) return a;
                    var u = Math.abs(vy[0] - yy[1]), h = Math.abs(yy[0] - vy[1]);
                    Math.min(u, h) > i.len() && (h > u ? Kc.scale(i, l, -u * o) : Kc.scale(i, l, h * o));
                } else if (n) {
                    u = Math.abs(vy[0] - yy[1]), h = Math.abs(yy[0] - vy[1]);
                    Math.min(u, h) < n.len() && (h > u ? Kc.scale(n, l, u * o) : Kc.scale(n, l, -h * o));
                }
            }
            return a;
        }, t.prototype._getProjMinMaxOnAxis = function(t, e, n) {
            for (var i = this._axes[t], r = this._origin, o = e[0].dot(i) + r[t], a = o, s = o, l = 1; l < e.length; l++) {
                var u = e[l].dot(i) + r[t];
                a = Math.min(u, a), s = Math.max(u, s);
            }
            n[0] = a, n[1] = s;
        }, t;
    }(), wy = [], by = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.notClear = !0, e.incremental = !0, e._displayables = [], e._temporaryDisplayables = [], 
            e._cursor = 0, e;
        }
        return n(e, t), e.prototype.traverse = function(t, e) {
            t.call(e, this);
        }, e.prototype.useStyle = function() {
            this.style = {};
        }, e.prototype.getCursor = function() {
            return this._cursor;
        }, e.prototype.innerAfterBrush = function() {
            this._cursor = this._displayables.length;
        }, e.prototype.clearDisplaybles = function() {
            this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.markRedraw(), 
            this.notClear = !1;
        }, e.prototype.clearTemporalDisplayables = function() {
            this._temporaryDisplayables = [];
        }, e.prototype.addDisplayable = function(t, e) {
            e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.markRedraw();
        }, e.prototype.addDisplayables = function(t, e) {
            e = e || !1;
            for (var n = 0; n < t.length; n++) this.addDisplayable(t[n], e);
        }, e.prototype.getDisplayables = function() {
            return this._displayables;
        }, e.prototype.getTemporalDisplayables = function() {
            return this._temporaryDisplayables;
        }, e.prototype.eachPendingDisplayable = function(t) {
            for (var e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);
            for (e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e]);
        }, e.prototype.update = function() {
            this.updateTransform();
            for (var t = this._cursor; t < this._displayables.length; t++) {
                (e = this._displayables[t]).parent = this, e.update(), e.parent = null;
            }
            for (t = 0; t < this._temporaryDisplayables.length; t++) {
                var e;
                (e = this._temporaryDisplayables[t]).parent = this, e.update(), e.parent = null;
            }
        }, e.prototype.getBoundingRect = function() {
            if (!this._rect) {
                for (var t = new op(1 / 0, 1 / 0, -1 / 0, -1 / 0), e = 0; e < this._displayables.length; e++) {
                    var n = this._displayables[e], i = n.getBoundingRect().clone();
                    n.needLocalTransform() && i.applyTransform(n.getLocalTransform(wy)), t.union(i);
                }
                this._rect = t;
            }
            return this._rect;
        }, e.prototype.contain = function(t, e) {
            var n = this.transformCoordToLocal(t, e);
            if (this.getBoundingRect().contain(n[0], n[1])) for (var i = 0; i < this._displayables.length; i++) {
                if (this._displayables[i].contain(t, e)) return !0;
            }
            return !1;
        }, e;
    }(tf), Sy = Tn(), My = Math.max, Ty = Math.min, Cy = {}, Iy = function(t, e) {
        var i = sr(t, e);
        return function(t) {
            function e(e) {
                var n = t.call(this, e) || this;
                return n.applyTransform = i.applyTransform, n.buildPath = i.buildPath, n;
            }
            return n(e, t), e;
        }(Rg);
    }, ky = function(t, e) {
        for (var n = [], i = t.length, r = 0; i > r; r++) {
            var o = t[r];
            n.push(o.getUpdatedPathProxy(!0));
        }
        var a = new Hf(e);
        return a.createPathProxy(), a.buildPath = function(t) {
            if (ar(t)) {
                t.appendPath(n);
                var e = t.getContext();
                e && t.rebuildPath(e, 1);
            }
        }, a;
    }, Dy = di;
    br("circle", Eg), br("ellipse", Ng), br("sector", $g), br("ring", Jg), br("polygon", ey), 
    br("polyline", iy), br("rect", Kf), br("line", ay), br("bezierCurve", uy), br("arc", cy);
    var Ay = (Object.freeze || Object)({
        updateProps: fr,
        initProps: gr,
        removeElement: vr,
        removeElementWithFadeOut: _r,
        isElementRemoved: yr,
        extendShape: xr,
        extendPath: wr,
        registerShape: br,
        getShapeClass: Sr,
        makePath: Mr,
        makeImage: Tr,
        mergePath: ky,
        resizePath: Ir,
        subPixelOptimizeLine: kr,
        subPixelOptimizeRect: function(t) {
            return pi(t.shape, t.shape, t.style), t;
        },
        subPixelOptimize: Dy,
        getTransform: Dr,
        applyTransform: Ar,
        transformDirection: function(t, e, n) {
            var i = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]), r = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]), o = [ "left" === t ? -i : "right" === t ? i : 0, "top" === t ? -r : "bottom" === t ? r : 0 ];
            return o = Ar(o, e, n), Math.abs(o[0]) > Math.abs(o[1]) ? o[0] > 0 ? "right" : "left" : o[1] > 0 ? "bottom" : "top";
        },
        groupTransition: Lr,
        clipPointsByRect: Or,
        clipRectByRect: Rr,
        createIcon: Br,
        linePolygonIntersect: function(t, e, n, i, r) {
            for (var o = 0, a = r[r.length - 1]; o < r.length; o++) {
                var s = r[o];
                if (Er(t, e, n, i, s[0], s[1], a[0], a[1])) return !0;
                a = s;
            }
        },
        lineLineIntersect: Er,
        setTooltipConfig: Nr,
        traverseElements: Vr,
        Group: Md,
        Image: Yf,
        Text: Jf,
        Circle: Eg,
        Ellipse: Ng,
        Sector: $g,
        Ring: Jg,
        Polygon: ey,
        Polyline: iy,
        Rect: Kf,
        Line: ay,
        BezierCurve: uy,
        Arc: cy,
        IncrementalDisplayable: by,
        CompoundPath: py,
        LinearGradient: fy,
        RadialGradient: gy,
        BoundingRect: op,
        OrientedBoundingRect: xy,
        Point: Kc,
        Path: Hf
    }), Py = {}, Ly = [ "fontStyle", "fontWeight", "fontSize", "fontFamily", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY" ], Oy = [ "align", "lineHeight", "width", "height", "tag", "verticalAlign", "ellipsis" ], Ry = [ "padding", "borderWidth", "borderRadius", "borderDashOffset", "backgroundColor", "borderColor", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY" ], By = Tn(), Ey = [ "textStyle", "color" ], zy = [ "fontStyle", "fontWeight", "fontSize", "fontFamily", "padding", "lineHeight", "rich", "width", "height", "overflow" ], Ny = new Jf(), Fy = function() {
        function t() {}
        return t.prototype.getTextColor = function(t) {
            var e = this.ecModel;
            return this.getShallow("color") || (!t && e ? e.get(Ey) : null);
        }, t.prototype.getFont = function() {
            return function(t, e) {
                var n = e && e.getModel("textStyle");
                return N([ t.fontStyle || n && n.getShallow("fontStyle") || "", t.fontWeight || n && n.getShallow("fontWeight") || "", (t.fontSize || n && n.getShallow("fontSize") || 12) + "px", t.fontFamily || n && n.getShallow("fontFamily") || "sans-serif" ].join(" "));
            }({
                fontStyle: this.getShallow("fontStyle"),
                fontWeight: this.getShallow("fontWeight"),
                fontSize: this.getShallow("fontSize"),
                fontFamily: this.getShallow("fontFamily")
            }, this.ecModel);
        }, t.prototype.getTextRect = function(t) {
            for (var e = {
                text: t,
                verticalAlign: this.getShallow("verticalAlign") || this.getShallow("baseline")
            }, n = 0; n < zy.length; n++) e[zy[n]] = this.getShallow(zy[n]);
            return Ny.useStyle(e), Ny.update(), Ny.getBoundingRect();
        }, t;
    }(), Vy = [ [ "lineWidth", "width" ], [ "stroke", "color" ], [ "opacity" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "shadowColor" ], [ "lineDash", "type" ], [ "lineDashOffset", "dashOffset" ], [ "lineCap", "cap" ], [ "lineJoin", "join" ], [ "miterLimit" ] ], Hy = En(Vy), Wy = function() {
        function t() {}
        return t.prototype.getLineStyle = function(t) {
            return Hy(this, t);
        }, t;
    }(), Gy = [ [ "fill", "color" ], [ "stroke", "borderColor" ], [ "lineWidth", "borderWidth" ], [ "opacity" ], [ "shadowBlur" ], [ "shadowOffsetX" ], [ "shadowOffsetY" ], [ "shadowColor" ], [ "lineDash", "borderType" ], [ "lineDashOffset", "borderDashOffset" ], [ "lineCap", "borderCap" ], [ "lineJoin", "borderJoin" ], [ "miterLimit", "borderMiterLimit" ] ], Uy = En(Gy), Xy = function() {
        function t() {}
        return t.prototype.getItemStyle = function(t, e) {
            return Uy(this, t, e);
        }, t;
    }(), Yy = function() {
        function e(t, e, n) {
            this.parentModel = e, this.ecModel = n, this.option = t;
        }
        return e.prototype.init = function() {
            for (var t = [], e = 3; e < arguments.length; e++) t[e - 3] = arguments[e];
        }, e.prototype.mergeOption = function(t) {
            s(this.option, t, !0);
        }, e.prototype.get = function(t, e) {
            return null == t ? this.option : this._doGet(this.parsePath(t), !e && this.parentModel);
        }, e.prototype.getShallow = function(t, e) {
            var n = this.option, i = null == n ? n : n[t];
            if (null == i && !e) {
                var r = this.parentModel;
                r && (i = r.getShallow(t));
            }
            return i;
        }, e.prototype.getModel = function(t, n) {
            var i = null != t, r = i ? this.parsePath(t) : null;
            return new e(i ? this._doGet(r) : this.option, n = n || this.parentModel && this.parentModel.getModel(this.resolveParentPath(r)), this.ecModel);
        }, e.prototype.isEmpty = function() {
            return null == this.option;
        }, e.prototype.restoreData = function() {}, e.prototype.clone = function() {
            return new (0, this.constructor)(a(this.option));
        }, e.prototype.parsePath = function(t) {
            return "string" == typeof t ? t.split(".") : t;
        }, e.prototype.resolveParentPath = function(t) {
            return t;
        }, e.prototype.isAnimationEnabled = function() {
            if (!ic.node && this.option) {
                if (null != this.option.animation) return !!this.option.animation;
                if (this.parentModel) return this.parentModel.isAnimationEnabled();
            }
        }, e.prototype._doGet = function(e, n) {
            var i = this.option;
            if (!e) return i;
            for (var r = 0; r < e.length && (!e[r] || null != (i = i && "object" == t(i) ? i[e[r]] : null)); r++) ;
            return null == i && n && (i = n._doGet(this.resolveParentPath(e), n.parentModel)), 
            i;
        }, e;
    }();
    Pn(Yy), function(t) {
        var e = [ "__\0is_clz", Vd++ ].join("_");
        t.prototype[e] = !0, t.isInstance = function(t) {
            return !(!t || !t[e]);
        };
    }(Yy), p(Yy, Wy), p(Yy, Xy), p(Yy, Wd), p(Yy, Fy);
    var qy = Math.round(10 * Math.random()), jy = "ZH", Zy = "EN", Ky = Zy, $y = {}, Qy = {}, Jy = ic.domSupported && (document.documentElement.lang || navigator.language || navigator.browserLanguage).toUpperCase().indexOf(jy) > -1 ? jy : Ky;
    $r(Zy, {
        time: {
            month: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthAbbr: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
            dayOfWeek: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            dayOfWeekAbbr: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
        },
        legend: {
            selector: {
                all: "All",
                inverse: "Inv"
            }
        },
        toolbox: {
            brush: {
                title: {
                    rect: "Box Select",
                    polygon: "Lasso Select",
                    lineX: "Horizontally Select",
                    lineY: "Vertically Select",
                    keep: "Keep Selections",
                    clear: "Clear Selections"
                }
            },
            dataView: {
                title: "Data View",
                lang: [ "Data View", "Close", "Refresh" ]
            },
            dataZoom: {
                title: {
                    zoom: "Zoom",
                    back: "Zoom Reset"
                }
            },
            magicType: {
                title: {
                    line: "Switch to Line Chart",
                    bar: "Switch to Bar Chart",
                    stack: "Stack",
                    tiled: "Tile"
                }
            },
            restore: {
                title: "Restore"
            },
            saveAsImage: {
                title: "Save as Image",
                lang: [ "Right Click to Save Image" ]
            }
        },
        series: {
            typeNames: {
                pie: "Pie chart",
                bar: "Bar chart",
                line: "Line chart",
                scatter: "Scatter plot",
                effectScatter: "Ripple scatter plot",
                radar: "Radar chart",
                tree: "Tree",
                treemap: "Treemap",
                boxplot: "Boxplot",
                candlestick: "Candlestick",
                k: "K line chart",
                heatmap: "Heat map",
                map: "Map",
                parallel: "Parallel coordinate map",
                lines: "Line graph",
                graph: "Relationship graph",
                sankey: "Sankey diagram",
                funnel: "Funnel chart",
                gauge: "Gauge",
                pictorialBar: "Pictorial bar",
                themeRiver: "Theme River Map",
                sunburst: "Sunburst"
            }
        },
        aria: {
            general: {
                withTitle: 'This is a chart about "{title}"',
                withoutTitle: "This is a chart"
            },
            series: {
                single: {
                    prefix: "",
                    withName: " with type {seriesType} named {seriesName}.",
                    withoutName: " with type {seriesType}."
                },
                multiple: {
                    prefix: ". It consists of {seriesCount} series count.",
                    withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
                    withoutName: " The {seriesId} series is a {seriesType}.",
                    separator: {
                        middle: "",
                        end: ""
                    }
                }
            },
            data: {
                allData: "The data is as follows: ",
                partialData: "The first {displayCnt} items are: ",
                withName: "the data for {name} is {value}",
                withoutName: "{value}",
                separator: {
                    middle: ", ",
                    end: ". "
                }
            }
        }
    }), $r(jy, {
        time: {
            month: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ],
            monthAbbr: [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
            dayOfWeek: [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ],
            dayOfWeekAbbr: [ "日", "一", "二", "三", "四", "五", "六" ]
        },
        legend: {
            selector: {
                all: "全选",
                inverse: "反选"
            }
        },
        toolbox: {
            brush: {
                title: {
                    rect: "矩形选择",
                    polygon: "圈选",
                    lineX: "横向选择",
                    lineY: "纵向选择",
                    keep: "保持选择",
                    clear: "清除选择"
                }
            },
            dataView: {
                title: "数据视图",
                lang: [ "数据视图", "关闭", "刷新" ]
            },
            dataZoom: {
                title: {
                    zoom: "区域缩放",
                    back: "区域缩放还原"
                }
            },
            magicType: {
                title: {
                    line: "切换为折线图",
                    bar: "切换为柱状图",
                    stack: "切换为堆叠",
                    tiled: "切换为平铺"
                }
            },
            restore: {
                title: "还原"
            },
            saveAsImage: {
                title: "保存为图片",
                lang: [ "右键另存为图片" ]
            }
        },
        series: {
            typeNames: {
                pie: "饼图",
                bar: "柱状图",
                line: "折线图",
                scatter: "散点图",
                effectScatter: "涟漪散点图",
                radar: "雷达图",
                tree: "树图",
                treemap: "矩形树图",
                boxplot: "箱型图",
                candlestick: "K线图",
                k: "K线图",
                heatmap: "热力图",
                map: "地图",
                parallel: "平行坐标图",
                lines: "线图",
                graph: "关系图",
                sankey: "桑基图",
                funnel: "漏斗图",
                gauge: "仪表盘图",
                pictorialBar: "象形柱图",
                themeRiver: "主题河流图",
                sunburst: "旭日图"
            }
        },
        aria: {
            general: {
                withTitle: "这是一个关于“{title}”的图表。",
                withoutTitle: "这是一个图表，"
            },
            series: {
                single: {
                    prefix: "",
                    withName: "图表类型是{seriesType}，表示{seriesName}。",
                    withoutName: "图表类型是{seriesType}。"
                },
                multiple: {
                    prefix: "它由{seriesCount}个图表系列组成。",
                    withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
                    withoutName: "第{seriesId}个系列是一个{seriesType}，",
                    separator: {
                        middle: "；",
                        end: "。"
                    }
                }
            },
            data: {
                allData: "其数据是——",
                partialData: "其中，前{displayCnt}项是——",
                withName: "{name}的数据是{value}",
                withoutName: "{value}",
                separator: {
                    middle: "，",
                    end: ""
                }
            }
        }
    });
    var tv = 1e3, ev = 60 * tv, nv = 60 * ev, iv = 24 * nv, rv = 365 * iv, ov = {
        year: "{yyyy}",
        month: "{MMM}",
        day: "{d}",
        hour: "{HH}:{mm}",
        minute: "{HH}:{mm}",
        second: "{HH}:{mm}:{ss}",
        millisecond: "{HH}:{mm}:{ss} {SSS}",
        none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
    }, av = "{yyyy}-{MM}-{dd}", sv = {
        year: "{yyyy}",
        month: "{yyyy}-{MM}",
        day: av,
        hour: av + " " + ov.hour,
        minute: av + " " + ov.minute,
        second: av + " " + ov.second,
        millisecond: ov.none
    }, lv = [ "year", "month", "day", "hour", "minute", "second", "millisecond" ], uv = [ "year", "half-year", "quarter", "month", "week", "half-week", "day", "half-day", "quarter-day", "hour", "minute", "second", "millisecond" ], hv = E, cv = [ "a", "b", "c", "d", "e", "f", "g" ], pv = function(t, e) {
        return "{" + t + (null == e ? "" : e) + "}";
    }, dv = f, fv = [ "left", "right", "top", "bottom", "width", "height" ], gv = [ [ "width", "left", "right" ], [ "height", "top", "bottom" ] ], yv = Io, vv = (_(Io, "vertical"), 
    _(Io, "horizontal"), Tn()), mv = function(t) {
        function e(e, n, i) {
            var r = t.call(this, e, n, i) || this;
            return r.uid = Zr("ec_cpt_model"), r;
        }
        return n(e, t), e.prototype.init = function(t, e, n) {
            this.mergeDefaultAndTheme(t, n);
        }, e.prototype.mergeDefaultAndTheme = function(t, e) {
            var n = Do(this), i = n ? Po(t) : {};
            s(t, e.getTheme().get(this.mainType)), s(t, this.getDefaultOption()), n && Ao(t, i, n);
        }, e.prototype.mergeOption = function(t) {
            s(this.option, t, !0);
            var e = Do(this);
            e && Ao(this.option, t, e);
        }, e.prototype.optionUpdated = function() {}, e.prototype.getDefaultOption = function() {
            var t = this.constructor;
            if (!function(t) {
                return !(!t || !t[Fd]);
            }(t)) return t.defaultOption;
            var e = vv(this);
            if (!e.defaultOption) {
                for (var n = [], i = t; i; ) {
                    var r = i.prototype.defaultOption;
                    r && n.push(r), i = i.superClass;
                }
                for (var o = {}, a = n.length - 1; a >= 0; a--) o = s(o, n[a], !0);
                e.defaultOption = o;
            }
            return e.defaultOption;
        }, e.prototype.getReferringComponents = function(t, e) {
            var n = t + "Index", i = t + "Id";
            return kn(this.ecModel, t, {
                index: this.get(n, !0),
                id: this.get(i, !0)
            }, e);
        }, e.prototype.getBoxLayoutParams = function() {
            var t = this;
            return {
                left: t.get("left"),
                top: t.get("top"),
                right: t.get("right"),
                bottom: t.get("bottom"),
                width: t.get("width"),
                height: t.get("height")
            };
        }, e.prototype.getZLevelKey = function() {
            return "";
        }, e.prototype.setZLevel = function(t) {
            this.option.zlevel = t;
        }, e.protoInitialize = function() {
            var t = e.prototype;
            t.type = "component", t.id = "", t.name = "", t.mainType = "", t.subType = "", t.componentIndex = 0;
        }(), e;
    }(Yy);
    Ln(mv, Yy), Bn(mv), function(t) {
        var e = {};
        t.registerSubTypeDefaulter = function(t, n) {
            var i = An(t);
            e[i.main] = n;
        }, t.determineSubType = function(n, i) {
            var r = i.type;
            if (!r) {
                var o = An(n).main;
                t.hasSubTypes(n) && e[o] && (r = e[o](i));
            }
            return r;
        };
    }(mv), function(t, e) {
        function n(t) {
            var n = {}, r = [];
            return f(t, function(o) {
                var a = i(n, o), s = function(t, e) {
                    var n = [];
                    return f(t, function(t) {
                        h(e, t) >= 0 && n.push(t);
                    }), n;
                }(a.originalDeps = e(o), t);
                a.entryCount = s.length, 0 === a.entryCount && r.push(o), f(s, function(t) {
                    h(a.predecessor, t) < 0 && a.predecessor.push(t);
                    var e = i(n, t);
                    h(e.successor, t) < 0 && e.successor.push(o);
                });
            }), {
                graph: n,
                noEntryList: r
            };
        }
        function i(t, e) {
            return t[e] || (t[e] = {
                predecessor: [],
                successor: []
            }), t[e];
        }
        t.topologicalTravel = function(t, e, i, r) {
            function o(t) {
                l[t].entryCount--, 0 === l[t].entryCount && u.push(t);
            }
            function a(t) {
                h[t] = !0, o(t);
            }
            if (t.length) {
                var s = n(e), l = s.graph, u = s.noEntryList, h = {};
                for (f(t, function(t) {
                    h[t] = !0;
                }); u.length; ) {
                    var c = u.pop(), p = l[c], d = !!h[c];
                    d && (i.call(r, c, p.originalDeps.slice()), delete h[c]), f(p.successor, d ? a : o);
                }
                f(h, function() {
                    throw new Error("");
                });
            }
        };
    }(mv, function(t) {
        var e = [];
        return f(mv.getClassesByMainType(t), function(t) {
            e = e.concat(t.dependencies || t.prototype.dependencies || []);
        }), e = g(e, function(t) {
            return An(t).main;
        }), "dataset" !== t && h(e, "dataset") <= 0 && e.unshift("dataset"), e;
    });
    var _v = "";
    "undefined" != typeof navigator && (_v = navigator.platform || "");
    var xv, wv, bv = "rgba(0, 0, 0, 0.2)", Sv = {
        darkMode: "auto",
        colorBy: "series",
        color: [ "#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de", "#3ba272", "#fc8452", "#9a60b4", "#ea7ccc" ],
        gradientColor: [ "#f6efa6", "#d88273", "#bf444c" ],
        aria: {
            decal: {
                decals: [ {
                    color: bv,
                    dashArrayX: [ 1, 0 ],
                    dashArrayY: [ 2, 5 ],
                    symbolSize: 1,
                    rotation: Math.PI / 6
                }, {
                    color: bv,
                    symbol: "circle",
                    dashArrayX: [ [ 8, 8 ], [ 0, 8, 8, 0 ] ],
                    dashArrayY: [ 6, 0 ],
                    symbolSize: .8
                }, {
                    color: bv,
                    dashArrayX: [ 1, 0 ],
                    dashArrayY: [ 4, 3 ],
                    rotation: -Math.PI / 4
                }, {
                    color: bv,
                    dashArrayX: [ [ 6, 6 ], [ 0, 6, 6, 0 ] ],
                    dashArrayY: [ 6, 0 ]
                }, {
                    color: bv,
                    dashArrayX: [ [ 1, 0 ], [ 1, 6 ] ],
                    dashArrayY: [ 1, 0, 6, 0 ],
                    rotation: Math.PI / 4
                }, {
                    color: bv,
                    symbol: "triangle",
                    dashArrayX: [ [ 9, 9 ], [ 0, 9, 9, 0 ] ],
                    dashArrayY: [ 7, 2 ],
                    symbolSize: .75
                } ]
            }
        },
        textStyle: {
            fontFamily: _v.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
            fontSize: 12,
            fontStyle: "normal",
            fontWeight: "normal"
        },
        blendMode: null,
        stateAnimation: {
            duration: 300,
            easing: "cubicOut"
        },
        animation: "auto",
        animationDuration: 1e3,
        animationDurationUpdate: 500,
        animationEasing: "cubicInOut",
        animationEasingUpdate: "cubicInOut",
        animationThreshold: 2e3,
        progressiveThreshold: 3e3,
        progressive: 400,
        hoverLayerThreshold: 3e3,
        useUTC: !1
    }, Mv = H([ "tooltip", "label", "itemName", "itemId", "itemGroupId", "seriesName" ]), Tv = "original", Cv = "arrayRows", Iv = "objectRows", kv = "keyedColumns", Dv = "typedArray", Av = "unknown", Pv = "column", Lv = "row", Ov = {
        Must: 1,
        Might: 2,
        Not: 3
    }, Rv = Tn(), Bv = H(), Ev = Tn(), zv = (Tn(), function() {
        function t() {}
        return t.prototype.getColorFromPalette = function(t, e, n) {
            var i = fn(this.get("color", !0)), r = this.get("colorLayer", !0);
            return function(t, e, n, i, r, o, a) {
                var s = e(o = o || t), l = s.paletteIdx || 0, u = s.paletteNameMap = s.paletteNameMap || {};
                if (u.hasOwnProperty(r)) return u[r];
                var h = null != a && i ? function(t, e) {
                    for (var n = t.length, i = 0; n > i; i++) if (t[i].length > e) return t[i];
                    return t[n - 1];
                }(i, a) : n;
                if ((h = h || n) && h.length) {
                    var c = h[l];
                    return r && (u[r] = c), s.paletteIdx = (l + 1) % h.length, c;
                }
            }(this, Ev, i, r, t, e, n);
        }, t.prototype.clearColorPalette = function() {
            !function(t, e) {
                e(t).paletteIdx = 0, e(t).paletteNameMap = {};
            }(this, Ev);
        }, t;
    }()), Nv = "\0_ec_inner", Fv = function(e) {
        function i() {
            return null !== e && e.apply(this, arguments) || this;
        }
        return n(i, e), i.prototype.init = function(t, e, n, i, r, o) {
            i = i || {}, this.option = null, this._theme = new Yy(i), this._locale = new Yy(r), 
            this._optionManager = o;
        }, i.prototype.setOption = function(t, e, n) {
            var i = zo(e);
            this._optionManager.setOption(t, n, i), this._resetOption(null, i);
        }, i.prototype.resetOption = function(t, e) {
            return this._resetOption(t, zo(e));
        }, i.prototype._resetOption = function(t, e) {
            var n = !1, i = this._optionManager;
            if (!t || "recreate" === t) {
                var r = i.mountOption("recreate" === t);
                this.option && "recreate" !== t ? (this.restoreData(), this._mergeOption(r, e)) : wv(this, r), 
                n = !0;
            }
            if (("timeline" === t || "media" === t) && this.restoreData(), !t || "recreate" === t || "timeline" === t) {
                var o = i.getTimelineOption(this);
                o && (n = !0, this._mergeOption(o, e));
            }
            if (!t || "recreate" === t || "media" === t) {
                var a = i.getMediaOption(this);
                a.length && f(a, function(t) {
                    n = !0, this._mergeOption(t, e);
                }, this);
            }
            return n;
        }, i.prototype.mergeOption = function(t) {
            this._mergeOption(t, null);
        }, i.prototype._mergeOption = function(t, e) {
            var n = this.option, i = this._componentsMap, r = this._componentsCount, o = [], u = H(), h = e && e.replaceMergeMainTypeMap;
            (function(t) {
                Rv(t).datasetMap = H();
            })(this), f(t, function(t, e) {
                null != t && (mv.hasClass(e) ? e && (o.push(e), u.set(e, !0)) : n[e] = null == n[e] ? a(t) : s(n[e], t, !0));
            }), h && h.each(function(t, e) {
                mv.hasClass(e) && !u.get(e) && (o.push(e), u.set(e, !0));
            }), mv.topologicalTravel(o, mv.getAllClassMainTypes(), function(e) {
                var o = function(t, e, n) {
                    var i = Bv.get(e);
                    if (!i) return n;
                    var r = i(t);
                    return r ? n.concat(r) : n;
                }(this, e, fn(t[e])), a = i.get(e), s = mn(a, o, a ? h && h.get(e) ? "replaceMerge" : "normalMerge" : "replaceAll");
                (function(t, e, n) {
                    f(t, function(t) {
                        var i = t.newOption;
                        T(i) && (t.keyInfo.mainType = e, t.keyInfo.subType = function(t, e, n, i) {
                            return e.type ? e.type : n ? n.subType : i.determineSubType(t, e);
                        }(e, i, t.existing, n));
                    });
                })(s, e, mv), n[e] = null, i.set(e, null), r.set(e, 0);
                var u, c = [], p = [], d = 0;
                f(s, function(t, n) {
                    var i = t.existing, r = t.newOption;
                    if (r) {
                        var o = "series" === e, a = mv.getClass(e, t.keyInfo.subType, !o);
                        if (!a) return;
                        if ("tooltip" === e) {
                            if (u) return;
                            u = !0;
                        }
                        if (i && i.constructor === a) i.name = t.keyInfo.name, i.mergeOption(r, this), i.optionUpdated(r, !1); else {
                            var s = l({
                                componentIndex: n
                            }, t.keyInfo);
                            l(i = new a(r, this, this, s), s), t.brandNew && (i.__requireNewView = !0), i.init(r, this, this), 
                            i.optionUpdated(null, !0);
                        }
                    } else i && (i.mergeOption({}, this), i.optionUpdated({}, !1));
                    i ? (c.push(i.option), p.push(i), d++) : (c.push(void 0), p.push(void 0));
                }, this), n[e] = c, i.set(e, p), r.set(e, d), "series" === e && xv(this);
            }, this), this._seriesIndices || xv(this);
        }, i.prototype.getOption = function() {
            var t = a(this.option);
            return f(t, function(e, n) {
                if (mv.hasClass(n)) {
                    for (var i = fn(e), r = i.length, o = !1, a = r - 1; a >= 0; a--) i[a] && !Sn(i[a]) ? o = !0 : (i[a] = null, 
                    !o && r--);
                    i.length = r, t[n] = i;
                }
            }), delete t[Nv], t;
        }, i.prototype.getTheme = function() {
            return this._theme;
        }, i.prototype.getLocaleModel = function() {
            return this._locale;
        }, i.prototype.setUpdatePayload = function(t) {
            this._payload = t;
        }, i.prototype.getUpdatePayload = function() {
            return this._payload;
        }, i.prototype.getComponent = function(t, e) {
            var n = this._componentsMap.get(t);
            if (n) {
                var i = n[e || 0];
                if (i) return i;
                if (null == e) for (var r = 0; r < n.length; r++) if (n[r]) return n[r];
            }
        }, i.prototype.queryComponents = function(t) {
            var e = t.mainType;
            if (!e) return [];
            var n, i = t.index, r = t.id, o = t.name, a = this._componentsMap.get(e);
            return a && a.length ? (null != i ? (n = [], f(fn(i), function(t) {
                a[t] && n.push(a[t]);
            })) : n = null != r ? Bo("id", r, a) : null != o ? Bo("name", o, a) : v(a, function(t) {
                return !!t;
            }), Eo(n, t)) : [];
        }, i.prototype.findComponents = function(t) {
            var e = t.query, n = t.mainType, i = function(t) {
                var e = n + "Index", i = n + "Id", r = n + "Name";
                return !t || null == t[e] && null == t[i] && null == t[r] ? null : {
                    mainType: n,
                    index: t[e],
                    id: t[i],
                    name: t[r]
                };
            }(e);
            return function(e) {
                return t.filter ? v(e, t.filter) : e;
            }(Eo(i ? this.queryComponents(i) : v(this._componentsMap.get(n), function(t) {
                return !!t;
            }), t));
        }, i.prototype.eachComponent = function(t, e, n) {
            var i = this._componentsMap;
            if (w(t)) {
                var r = e, o = t;
                i.each(function(t, e) {
                    for (var n = 0; t && n < t.length; n++) {
                        var i = t[n];
                        i && o.call(r, e, i, i.componentIndex);
                    }
                });
            } else for (var a = b(t) ? i.get(t) : T(t) ? this.findComponents(t) : null, s = 0; a && s < a.length; s++) {
                var l = a[s];
                l && e.call(n, l, l.componentIndex);
            }
        }, i.prototype.getSeriesByName = function(t) {
            var e = wn(t, null);
            return v(this._componentsMap.get("series"), function(t) {
                return !!t && null != e && t.name === e;
            });
        }, i.prototype.getSeriesByIndex = function(t) {
            return this._componentsMap.get("series")[t];
        }, i.prototype.getSeriesByType = function(t) {
            return v(this._componentsMap.get("series"), function(e) {
                return !!e && e.subType === t;
            });
        }, i.prototype.getSeries = function() {
            return v(this._componentsMap.get("series"), function(t) {
                return !!t;
            });
        }, i.prototype.getSeriesCount = function() {
            return this._componentsCount.get("series");
        }, i.prototype.eachSeries = function(t, e) {
            f(this._seriesIndices, function(n) {
                var i = this._componentsMap.get("series")[n];
                t.call(e, i, n);
            }, this);
        }, i.prototype.eachRawSeries = function(t, e) {
            f(this._componentsMap.get("series"), function(n) {
                n && t.call(e, n, n.componentIndex);
            });
        }, i.prototype.eachSeriesByType = function(t, e, n) {
            f(this._seriesIndices, function(i) {
                var r = this._componentsMap.get("series")[i];
                r.subType === t && e.call(n, r, i);
            }, this);
        }, i.prototype.eachRawSeriesByType = function(t, e, n) {
            return f(this.getSeriesByType(t), e, n);
        }, i.prototype.isSeriesFiltered = function(t) {
            return null == this._seriesIndicesMap.get(t.componentIndex);
        }, i.prototype.getCurrentSeriesIndices = function() {
            return (this._seriesIndices || []).slice();
        }, i.prototype.filterSeries = function(t, e) {
            var n = [];
            f(this._seriesIndices, function(i) {
                var r = this._componentsMap.get("series")[i];
                t.call(e, r, i) && n.push(i);
            }, this), this._seriesIndices = n, this._seriesIndicesMap = H(n);
        }, i.prototype.restoreData = function(t) {
            xv(this);
            var e = this._componentsMap, n = [];
            e.each(function(t, e) {
                mv.hasClass(e) && n.push(e);
            }), mv.topologicalTravel(n, mv.getAllClassMainTypes(), function(n) {
                f(e.get(n), function(e) {
                    !e || "series" === n && function(t, e) {
                        if (e) {
                            var n = e.seriesIndex, i = e.seriesId, r = e.seriesName;
                            return null != n && t.componentIndex !== n || null != i && t.id !== i || null != r && t.name !== r;
                        }
                    }(e, t) || e.restoreData();
                });
            });
        }, i.internalField = (xv = function(t) {
            var e = t._seriesIndices = [];
            f(t._componentsMap.get("series"), function(t) {
                t && e.push(t.componentIndex);
            }), t._seriesIndicesMap = H(e);
        }, void (wv = function(e, n) {
            e.option = {}, e.option[Nv] = 1, e._componentsMap = H({
                series: []
            }), e._componentsCount = H();
            var i = n.aria;
            T(i) && null == i.enabled && (i.enabled = !0), function(e, n) {
                var i = e.color && !e.colorLayer;
                f(n, function(n, r) {
                    "colorLayer" === r && i || mv.hasClass(r) || ("object" == t(n) ? e[r] = e[r] ? s(e[r], n, !1) : a(n) : null == e[r] && (e[r] = n));
                });
            }(n, e._theme.option), s(n, Sv, !1), e._mergeOption(n, null);
        })), i;
    }(Yy);
    p(Fv, zv);
    var Vv, Hv, Wv, Gv, Uv, Xv, Yv = [ "getDom", "getZr", "getWidth", "getHeight", "getDevicePixelRatio", "dispatchAction", "isSSR", "isDisposed", "on", "off", "getDataURL", "getConnectedDataURL", "getOption", "getId", "updateLabelLayout" ], qv = function(t) {
        f(Yv, function(e) {
            this[e] = Sc(t[e], t);
        }, this);
    }, jv = {}, Zv = function() {
        function t() {
            this._coordinateSystems = [];
        }
        return t.prototype.create = function(t, e) {
            var n = [];
            f(jv, function(i) {
                var r = i.create(t, e);
                n = n.concat(r || []);
            }), this._coordinateSystems = n;
        }, t.prototype.update = function(t, e) {
            f(this._coordinateSystems, function(n) {
                n.update && n.update(t, e);
            });
        }, t.prototype.getCoordinateSystems = function() {
            return this._coordinateSystems.slice();
        }, t.register = function(t, e) {
            jv[t] = e;
        }, t.get = function(t) {
            return jv[t];
        }, t;
    }(), Kv = /^(min|max)?(.+)$/, $v = function() {
        function t(t) {
            this._timelineOptions = [], this._mediaList = [], this._currentMediaIndices = [], 
            this._api = t;
        }
        return t.prototype.setOption = function(t, e) {
            t && (f(fn(t.series), function(t) {
                t && t.data && I(t.data) && F(t.data);
            }), f(fn(t.dataset), function(t) {
                t && t.source && I(t.source) && F(t.source);
            })), t = a(t);
            var n = this._optionBackup, i = function(t, e, n) {
                function i(t) {
                    f(e, function(e) {
                        e(t, n);
                    });
                }
                var r, o, a = [], s = t.baseOption, l = t.timeline, u = t.options, h = t.media, c = !!t.media, p = !!(u || l || s && s.timeline);
                return s ? (o = s).timeline || (o.timeline = l) : ((p || c) && (t.options = t.media = null), 
                o = t), c && x(h) && f(h, function(t) {
                    t && t.option && (t.query ? a.push(t) : r || (r = t));
                }), i(o), f(u, function(t) {
                    return i(t);
                }), f(a, function(t) {
                    return i(t.option);
                }), {
                    baseOption: o,
                    timelineOptions: u || [],
                    mediaDefault: r,
                    mediaList: a
                };
            }(t, e, !n);
            this._newBaseOption = i.baseOption, n ? (i.timelineOptions.length && (n.timelineOptions = i.timelineOptions), 
            i.mediaList.length && (n.mediaList = i.mediaList), i.mediaDefault && (n.mediaDefault = i.mediaDefault)) : this._optionBackup = i;
        }, t.prototype.mountOption = function(t) {
            var e = this._optionBackup;
            return this._timelineOptions = e.timelineOptions, this._mediaList = e.mediaList, 
            this._mediaDefault = e.mediaDefault, this._currentMediaIndices = [], a(t ? e.baseOption : this._newBaseOption);
        }, t.prototype.getTimelineOption = function(t) {
            var e, n = this._timelineOptions;
            if (n.length) {
                var i = t.getComponent("timeline");
                i && (e = a(n[i.getCurrentIndex()]));
            }
            return e;
        }, t.prototype.getMediaOption = function() {
            var t = this._api.getWidth(), e = this._api.getHeight(), n = this._mediaList, i = this._mediaDefault, r = [], o = [];
            if (!n.length && !i) return o;
            for (var s = 0, l = n.length; l > s; s++) No(n[s].query, t, e) && r.push(s);
            return !r.length && i && (r = [ -1 ]), r.length && !function(t, e) {
                return t.join(",") === e.join(",");
            }(r, this._currentMediaIndices) && (o = g(r, function(t) {
                return a(-1 === t ? i.option : n[t].option);
            })), this._currentMediaIndices = r, o;
        }, t;
    }(), Qv = f, Jv = T, tm = [ "areaStyle", "lineStyle", "nodeStyle", "linkStyle", "chordStyle", "label", "labelLine" ], em = [ [ "x", "left" ], [ "y", "top" ], [ "x2", "right" ], [ "y2", "bottom" ] ], nm = [ "grid", "geo", "parallel", "legend", "toolbox", "title", "visualMap", "dataZoom", "timeline" ], im = [ [ "borderRadius", "barBorderRadius" ], [ "borderColor", "barBorderColor" ], [ "borderWidth", "barBorderWidth" ] ], rm = function(t) {
        this.data = t.data || (t.sourceFormat === kv ? {} : []), this.sourceFormat = t.sourceFormat || Av, 
        this.seriesLayoutBy = t.seriesLayoutBy || Pv, this.startIndex = t.startIndex || 0, 
        this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
        var e = this.dimensionsDefine = t.dimensionsDefine;
        if (e) for (var n = 0; n < e.length; n++) {
            var i = e[n];
            null == i.type && Ro(this, n) === Ov.Must && (i.type = "ordinal");
        }
    }, om = function() {
        function t(t, e) {
            var n = Jo(t) ? t : ea(t);
            this._source = n;
            var i = this._data = n.data;
            n.sourceFormat === Dv && (this._offset = 0, this._dimSize = e, this._data = i), 
            Uv(this, i, n);
        }
        return t.prototype.getSource = function() {
            return this._source;
        }, t.prototype.count = function() {
            return 0;
        }, t.prototype.getItem = function() {}, t.prototype.appendData = function() {}, 
        t.prototype.clean = function() {}, t.protoInitialize = function() {
            var e = t.prototype;
            e.pure = !1, e.persistent = !0;
        }(), t.internalField = function() {
            function t(t) {
                for (var e = 0; e < t.length; e++) this._data.push(t[e]);
            }
            var e;
            Uv = function(t, e, o) {
                var a = o.sourceFormat, s = o.seriesLayoutBy, u = o.startIndex, h = o.dimensionsDefine;
                if (l(t, Gv[ha(a, s)]), a === Dv) t.getItem = n, t.count = r, t.fillStorage = i; else {
                    var c = sa(a, s);
                    t.getItem = Sc(c, null, e, u, h);
                    var p = la(a, s);
                    t.count = Sc(p, null, e, u, h);
                }
            };
            var n = function(t, e) {
                t -= this._offset, e = e || [];
                for (var n = this._data, i = this._dimSize, r = i * t, o = 0; i > o; o++) e[o] = n[r + o];
                return e;
            }, i = function(t, e, n, i) {
                for (var r = this._data, o = this._dimSize, a = 0; o > a; a++) {
                    for (var s = i[a], l = null == s[0] ? 1 / 0 : s[0], u = null == s[1] ? -1 / 0 : s[1], h = e - t, c = n[a], p = 0; h > p; p++) {
                        var d = r[p * o + a];
                        c[t + p] = d, l > d && (l = d), d > u && (u = d);
                    }
                    s[0] = l, s[1] = u;
                }
            }, r = function() {
                return this._data ? this._data.length / this._dimSize : 0;
            };
            (e = {})[Cv + "_" + Pv] = {
                pure: !0,
                appendData: t
            }, e[Cv + "_" + Lv] = {
                pure: !0,
                appendData: function() {
                    throw new Error('Do not support appendData when set seriesLayoutBy: "row".');
                }
            }, e[Iv] = {
                pure: !0,
                appendData: t
            }, e[kv] = {
                pure: !0,
                appendData: function(t) {
                    var e = this._data;
                    f(t, function(t, n) {
                        for (var i = e[n] || (e[n] = []), r = 0; r < (t || []).length; r++) i.push(t[r]);
                    });
                }
            }, e[Tv] = {
                appendData: t
            }, e[Dv] = {
                persistent: !1,
                pure: !0,
                appendData: function(t) {
                    this._data = t;
                },
                clean: function() {
                    this._offset += this.count(), this._data = null;
                }
            }, Gv = e;
        }(), t;
    }(), am = function(t, e, n, i) {
        return t[i];
    }, sm = ((Vv = {})[Cv + "_" + Pv] = function(t, e, n, i) {
        return t[i + e];
    }, Vv[Cv + "_" + Lv] = function(t, e, n, i, r) {
        i += e;
        for (var o = r || [], a = t, s = 0; s < a.length; s++) {
            var l = a[s];
            o[s] = l ? l[i] : null;
        }
        return o;
    }, Vv[Iv] = am, Vv[kv] = function(t, e, n, i, r) {
        for (var o = r || [], a = 0; a < n.length; a++) {
            var s = t[n[a].name];
            o[a] = s ? s[i] : null;
        }
        return o;
    }, Vv[Tv] = am, Vv), lm = function(t) {
        return t.length;
    }, um = ((Hv = {})[Cv + "_" + Pv] = function(t, e) {
        return Math.max(0, t.length - e);
    }, Hv[Cv + "_" + Lv] = function(t, e) {
        var n = t[0];
        return n ? Math.max(0, n.length - e) : 0;
    }, Hv[Iv] = lm, Hv[kv] = function(t, e, n) {
        var i = t[n[0].name];
        return i ? i.length : 0;
    }, Hv[Tv] = lm, Hv), hm = function(t, e) {
        return t[e];
    }, cm = ((Wv = {})[Cv] = hm, Wv[Iv] = function(t, e, n) {
        return t[n];
    }, Wv[kv] = hm, Wv[Tv] = function(t, e) {
        var n = yn(t);
        return n instanceof Array ? n[e] : n;
    }, Wv[Dv] = hm, Wv), pm = /\{@(.+?)\}/g, dm = function() {
        function t() {}
        return t.prototype.getDataParams = function(t, e) {
            var n = this.getData(e), i = this.getRawValue(t, e), r = n.getRawIndex(t), o = n.getName(t), a = n.getRawDataItem(t), s = n.getItemVisual(t, "style"), l = s && s[n.getItemVisual(t, "drawType") || "fill"], u = s && s.stroke, h = this.mainType, c = "series" === h, p = n.userOutput && n.userOutput.get();
            return {
                componentType: h,
                componentSubType: this.subType,
                componentIndex: this.componentIndex,
                seriesType: c ? this.subType : null,
                seriesIndex: this.seriesIndex,
                seriesId: c ? this.id : null,
                seriesName: c ? this.name : null,
                name: o,
                dataIndex: r,
                data: a,
                dataType: e,
                value: i,
                color: l,
                borderColor: u,
                dimensionNames: p ? p.fullDimensions : null,
                encode: p ? p.encode : null,
                $vars: [ "seriesName", "name", "value" ]
            };
        }, t.prototype.getFormattedLabel = function(t, e, n, i, r, o) {
            e = e || "normal";
            var a = this.getData(n), s = this.getDataParams(t, n);
            (o && (s.value = o.interpolatedValue), null != i && x(s.value) && (s.value = s.value[i]), 
            r) || (r = a.getItemModel(t).get("normal" === e ? [ "label", "formatter" ] : [ e, "label", "formatter" ]));
            return w(r) ? (s.status = e, s.dimensionIndex = i, r(s)) : b(r) ? So(r, s).replace(pm, function(e, n) {
                var i = n.length, r = n;
                "[" === r.charAt(0) && "]" === r.charAt(i - 1) && (r = +r.slice(1, i - 1));
                var s = ca(a, t, r);
                if (o && x(o.interpolatedValue)) {
                    var l = a.getDimensionIndex(r);
                    l >= 0 && (s = o.interpolatedValue[l]);
                }
                return null != s ? s + "" : "";
            }) : void 0;
        }, t.prototype.getRawValue = function(t, e) {
            return ca(this.getData(e), t);
        }, t.prototype.formatTooltip = function() {}, t;
    }(), fm = function() {
        function t(t) {
            t = t || {}, this._reset = t.reset, this._plan = t.plan, this._count = t.count, 
            this._onDirty = t.onDirty, this._dirty = !0;
        }
        return t.prototype.perform = function(t) {
            function e(t) {
                return !(t >= 1) && (t = 1), t;
            }
            var n, i = this._upstream, r = t && t.skip;
            if (this._dirty && i) {
                var o = this.context;
                o.data = o.outputData = i.context.outputData;
            }
            this.__pipeline && (this.__pipeline.currentTask = this), this._plan && !r && (n = this._plan(this.context));
            var a, s = e(this._modBy), l = this._modDataCount || 0, u = e(t && t.modBy), h = t && t.modDataCount || 0;
            (s !== u || l !== h) && (n = "reset"), (this._dirty || "reset" === n) && (this._dirty = !1, 
            a = this._doReset(r)), this._modBy = u, this._modDataCount = h;
            var c = t && t.step;
            if (this._dueEnd = i ? i._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, 
            this._progress) {
                var p = this._dueIndex, d = Math.min(null != c ? this._dueIndex + c : 1 / 0, this._dueEnd);
                if (!r && (a || d > p)) {
                    var f = this._progress;
                    if (x(f)) for (var g = 0; g < f.length; g++) this._doProgress(f[g], p, d, u, h); else this._doProgress(f, p, d, u, h);
                }
                this._dueIndex = d;
                var y = null != this._settedOutputEnd ? this._settedOutputEnd : d;
                this._outputDueEnd = y;
            } else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
            return this.unfinished();
        }, t.prototype.dirty = function() {
            this._dirty = !0, this._onDirty && this._onDirty(this.context);
        }, t.prototype._doProgress = function(t, e, n, i, r) {
            gm.reset(e, n, i, r), this._callingProgress = t, this._callingProgress({
                start: e,
                end: n,
                count: n - e,
                next: gm.next
            }, this.context);
        }, t.prototype._doReset = function(t) {
            var e, n;
            this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null, 
            !t && this._reset && ((e = this._reset(this.context)) && e.progress && (n = e.forceFirstProgress, 
            e = e.progress), x(e) && !e.length && (e = null)), this._progress = e, this._modBy = this._modDataCount = null;
            var i = this._downstream;
            return i && i.dirty(), n;
        }, t.prototype.unfinished = function() {
            return this._progress && this._dueIndex < this._dueEnd;
        }, t.prototype.pipe = function(t) {
            (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, 
            t.dirty());
        }, t.prototype.dispose = function() {
            this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), 
            this._dirty = !1, this._disposed = !0);
        }, t.prototype.getUpstream = function() {
            return this._upstream;
        }, t.prototype.getDownstream = function() {
            return this._downstream;
        }, t.prototype.setOutputEnd = function(t) {
            this._outputDueEnd = this._settedOutputEnd = t;
        }, t;
    }(), gm = function() {
        function t() {
            return n > i ? i++ : null;
        }
        function e() {
            var t = i % a * r + Math.ceil(i / a), e = i >= n ? null : o > t ? t : i;
            return i++, e;
        }
        var n, i, r, o, a, s = {
            reset: function(l, u, h, c) {
                i = l, n = u, r = h, o = c, a = Math.ceil(o / r), s.next = r > 1 && o > 0 ? e : t;
            }
        };
        return s;
    }(), ym = (H({
        number: function(t) {
            return parseFloat(t);
        },
        time: function(t) {
            return +rn(t);
        },
        trim: function(t) {
            return b(t) ? N(t) : t;
        }
    }), {
        lt: function(t, e) {
            return e > t;
        },
        lte: function(t, e) {
            return e >= t;
        },
        gt: function(t, e) {
            return t > e;
        },
        gte: function(t, e) {
            return t >= e;
        }
    }), vm = (function() {
        function t(t, e) {
            if (!M(e)) {
                pn("");
            }
            this._opFn = ym[t], this._rvalFloat = ln(e);
        }
        t.prototype.evaluate = function(t) {
            return M(t) ? this._opFn(t, this._rvalFloat) : this._opFn(ln(t), this._rvalFloat);
        };
    }(), function() {
        function t(t, e) {
            var n = "desc" === t;
            this._resultLT = n ? 1 : -1, null == e && (e = n ? "min" : "max"), this._incomparable = "min" === e ? -1 / 0 : 1 / 0;
        }
        return t.prototype.evaluate = function(t, e) {
            var n = M(t) ? t : ln(t), i = M(e) ? e : ln(e), r = isNaN(n), o = isNaN(i);
            if (r && (n = this._incomparable), o && (i = this._incomparable), r && o) {
                var a = b(t), s = b(e);
                a && (n = s ? t : 0), s && (i = a ? e : 0);
            }
            return i > n ? this._resultLT : n > i ? -this._resultLT : 0;
        }, t;
    }()), mm = (function() {
        function e(e, n) {
            this._rval = n, this._isEQ = e, this._rvalTypeof = t(n), this._rvalFloat = ln(n);
        }
        e.prototype.evaluate = function(e) {
            var n = e === this._rval;
            if (!n) {
                var i = t(e);
                i === this._rvalTypeof || "number" !== i && "number" !== this._rvalTypeof || (n = ln(e) === this._rvalFloat);
            }
            return this._isEQ ? n : !n;
        };
    }(), function() {
        function t() {}
        return t.prototype.getRawData = function() {
            throw new Error("not supported");
        }, t.prototype.getRawDataItem = function() {
            throw new Error("not supported");
        }, t.prototype.cloneRawData = function() {}, t.prototype.getDimensionInfo = function() {}, 
        t.prototype.cloneAllDimensionInfo = function() {}, t.prototype.count = function() {}, 
        t.prototype.retrieveValue = function() {}, t.prototype.retrieveValueFromItem = function() {}, 
        t.prototype.convertValue = function(t, e) {
            return fa(t, e);
        }, t;
    }()), _m = H(), xm = "undefined", wm = ("undefined" == typeof Uint32Array ? "undefined" : t(Uint32Array)) === xm ? Array : Uint32Array, bm = ("undefined" == typeof Uint16Array ? "undefined" : t(Uint16Array)) === xm ? Array : Uint16Array, Sm = ("undefined" == typeof Int32Array ? "undefined" : t(Int32Array)) === xm ? Array : Int32Array, Mm = ("undefined" == typeof Float64Array ? "undefined" : t(Float64Array)) === xm ? Array : Float64Array, Tm = {
        float: Mm,
        int: Sm,
        ordinal: Array,
        number: Array,
        time: Mm
    }, Cm = function() {
        function e() {
            this._chunks = [], this._rawExtent = [], this._extent = [], this._count = 0, this._rawCount = 0, 
            this._calcDimNameToIdx = H();
        }
        return e.prototype.initData = function(t, e, n) {
            this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
            var i = t.getSource(), r = this.defaultDimValueGetter = Xv[i.sourceFormat];
            this._dimValueGetter = n || r, this._rawExtent = [], aa(i), this._dimensions = g(e, function(t) {
                return {
                    type: t.type,
                    property: t.property
                };
            }), this._initDataFromProvider(0, t.count());
        }, e.prototype.getProvider = function() {
            return this._provider;
        }, e.prototype.getSource = function() {
            return this._provider.getSource();
        }, e.prototype.ensureCalculationDimension = function(t, e) {
            var n = this._calcDimNameToIdx, i = this._dimensions, r = n.get(t);
            if (null != r) {
                if (i[r].type === e) return r;
            } else r = i.length;
            return i[r] = {
                type: e
            }, n.set(t, r), this._chunks[r] = new Tm[e || "float"](this._rawCount), this._rawExtent[r] = [ 1 / 0, -1 / 0 ], 
            r;
        }, e.prototype.collectOrdinalMeta = function(t, e) {
            var n = this._chunks[t], i = this._dimensions[t], r = this._rawExtent, o = i.ordinalOffset || 0, a = n.length;
            0 === o && (r[t] = [ 1 / 0, -1 / 0 ]);
            for (var s = r[t], l = o; a > l; l++) {
                var u = n[l] = e.parseAndCollect(n[l]);
                isNaN(u) || (s[0] = Math.min(u, s[0]), s[1] = Math.max(u, s[1]));
            }
            i.ordinalMeta = e, i.ordinalOffset = a, i.type = "ordinal";
        }, e.prototype.getOrdinalMeta = function(t) {
            return this._dimensions[t].ordinalMeta;
        }, e.prototype.getDimensionProperty = function(t) {
            var e = this._dimensions[t];
            return e && e.property;
        }, e.prototype.appendData = function(t) {
            var e = this._provider, n = this.count();
            e.appendData(t);
            var i = e.count();
            return e.persistent || (i += n), i > n && this._initDataFromProvider(n, i, !0), 
            [ n, i ];
        }, e.prototype.appendValues = function(t, e) {
            for (var n = this._chunks, i = this._dimensions, r = i.length, o = this._rawExtent, a = this.count(), s = a + Math.max(t.length, e || 0), l = 0; r > l; l++) {
                Sa(n, l, (d = i[l]).type, s, !0);
            }
            for (var u = [], h = a; s > h; h++) for (var c = h - a, p = 0; r > p; p++) {
                var d = i[p], f = Xv.arrayRows.call(this, t[c] || u, d.property, c, p);
                n[p][h] = f;
                var g = o[p];
                f < g[0] && (g[0] = f), f > g[1] && (g[1] = f);
            }
            return this._rawCount = this._count = s, {
                start: a,
                end: s
            };
        }, e.prototype._initDataFromProvider = function(t, e, n) {
            for (var i = this._provider, r = this._chunks, o = this._dimensions, a = o.length, s = this._rawExtent, l = g(o, function(t) {
                return t.property;
            }), u = 0; a > u; u++) {
                var h = o[u];
                s[u] || (s[u] = [ 1 / 0, -1 / 0 ]), Sa(r, u, h.type, e, n);
            }
            if (i.fillStorage) i.fillStorage(t, e, r, s); else for (var c = [], p = t; e > p; p++) {
                c = i.getItem(p, c);
                for (var d = 0; a > d; d++) {
                    var f = r[d], y = this._dimValueGetter(c, l[d], p, d);
                    f[p] = y;
                    var v = s[d];
                    y < v[0] && (v[0] = y), y > v[1] && (v[1] = y);
                }
            }
            !i.persistent && i.clean && i.clean(), this._rawCount = this._count = e, this._extent = [];
        }, e.prototype.count = function() {
            return this._count;
        }, e.prototype.get = function(t, e) {
            if (!(e >= 0 && e < this._count)) return NaN;
            var n = this._chunks[t];
            return n ? n[this.getRawIndex(e)] : NaN;
        }, e.prototype.getValues = function(t, e) {
            var n = [], i = [];
            if (null == e) {
                e = t, t = [];
                for (var r = 0; r < this._dimensions.length; r++) i.push(r);
            } else i = t;
            r = 0;
            for (var o = i.length; o > r; r++) n.push(this.get(i[r], e));
            return n;
        }, e.prototype.getByRawIndex = function(t, e) {
            if (!(e >= 0 && e < this._rawCount)) return NaN;
            var n = this._chunks[t];
            return n ? n[e] : NaN;
        }, e.prototype.getSum = function(t) {
            var e = 0;
            if (this._chunks[t]) for (var n = 0, i = this.count(); i > n; n++) {
                var r = this.get(t, n);
                isNaN(r) || (e += r);
            }
            return e;
        }, e.prototype.getMedian = function(t) {
            var e = [];
            this.each([ t ], function(t) {
                isNaN(t) || e.push(t);
            });
            var n = e.sort(function(t, e) {
                return t - e;
            }), i = this.count();
            return 0 === i ? 0 : i % 2 == 1 ? n[(i - 1) / 2] : (n[i / 2] + n[i / 2 - 1]) / 2;
        }, e.prototype.indexOfRawIndex = function(t) {
            if (t >= this._rawCount || 0 > t) return -1;
            if (!this._indices) return t;
            var e = this._indices, n = e[t];
            if (null != n && n < this._count && n === t) return t;
            for (var i = 0, r = this._count - 1; r >= i; ) {
                var o = (i + r) / 2 | 0;
                if (e[o] < t) i = o + 1; else {
                    if (!(e[o] > t)) return o;
                    r = o - 1;
                }
            }
            return -1;
        }, e.prototype.indicesOfNearest = function(t, e, n) {
            var i = this._chunks[t], r = [];
            if (!i) return r;
            null == n && (n = 1 / 0);
            for (var o = 1 / 0, a = -1, s = 0, l = 0, u = this.count(); u > l; l++) {
                var h = e - i[this.getRawIndex(l)], c = Math.abs(h);
                n >= c && ((o > c || c === o && h >= 0 && 0 > a) && (o = c, a = h, s = 0), h === a && (r[s++] = l));
            }
            return r.length = s, r;
        }, e.prototype.getIndices = function() {
            var t, e = this._indices;
            if (e) {
                var n = e.constructor, i = this._count;
                if (n === Array) {
                    t = new n(i);
                    for (var r = 0; i > r; r++) t[r] = e[r];
                } else t = new n(e.buffer, 0, i);
            } else {
                t = new (n = wa(this._rawCount))(this.count());
                for (r = 0; r < t.length; r++) t[r] = r;
            }
            return t;
        }, e.prototype.filter = function(t, e) {
            if (!this._count) return this;
            for (var n = this.clone(), i = n.count(), r = new (wa(n._rawCount))(i), o = [], a = t.length, s = 0, l = t[0], u = n._chunks, h = 0; i > h; h++) {
                var c = void 0, p = n.getRawIndex(h);
                if (0 === a) c = e(h); else if (1 === a) {
                    c = e(u[l][p], h);
                } else {
                    for (var d = 0; a > d; d++) o[d] = u[t[d]][p];
                    o[d] = h, c = e.apply(null, o);
                }
                c && (r[s++] = p);
            }
            return i > s && (n._indices = r), n._count = s, n._extent = [], n._updateGetRawIdx(), 
            n;
        }, e.prototype.selectRange = function(t) {
            var e = this.clone(), n = e._count;
            if (!n) return this;
            var i = m(t), r = i.length;
            if (!r) return this;
            var o = e.count(), a = new (wa(e._rawCount))(o), s = 0, l = i[0], u = t[l][0], h = t[l][1], c = e._chunks, p = !1;
            if (!e._indices) {
                var d = 0;
                if (1 === r) {
                    for (var f = c[i[0]], g = 0; n > g; g++) {
                        ((x = f[g]) >= u && h >= x || isNaN(x)) && (a[s++] = d), d++;
                    }
                    p = !0;
                } else if (2 === r) {
                    f = c[i[0]];
                    var y = c[i[1]], v = t[i[1]][0], _ = t[i[1]][1];
                    for (g = 0; n > g; g++) {
                        var x = f[g], w = y[g];
                        (x >= u && h >= x || isNaN(x)) && (w >= v && _ >= w || isNaN(w)) && (a[s++] = d), 
                        d++;
                    }
                    p = !0;
                }
            }
            if (!p) if (1 === r) for (g = 0; o > g; g++) {
                var b = e.getRawIndex(g);
                ((x = c[i[0]][b]) >= u && h >= x || isNaN(x)) && (a[s++] = b);
            } else for (g = 0; o > g; g++) {
                for (var S = !0, M = (b = e.getRawIndex(g), 0); r > M; M++) {
                    var T = i[M];
                    ((x = c[T][b]) < t[T][0] || x > t[T][1]) && (S = !1);
                }
                S && (a[s++] = e.getRawIndex(g));
            }
            return o > s && (e._indices = a), e._count = s, e._extent = [], e._updateGetRawIdx(), 
            e;
        }, e.prototype.map = function(t, e) {
            var n = this.clone(t);
            return this._updateDims(n, t, e), n;
        }, e.prototype.modify = function(t, e) {
            this._updateDims(this, t, e);
        }, e.prototype._updateDims = function(e, n, i) {
            for (var r = e._chunks, o = [], a = n.length, s = e.count(), l = [], u = e._rawExtent, h = 0; h < n.length; h++) u[n[h]] = [ 1 / 0, -1 / 0 ];
            for (var c = 0; s > c; c++) {
                for (var p = e.getRawIndex(c), d = 0; a > d; d++) l[d] = r[n[d]][p];
                l[a] = c;
                var f = i && i.apply(null, l);
                if (null != f) {
                    "object" != t(f) && (o[0] = f, f = o);
                    for (h = 0; h < f.length; h++) {
                        var g = n[h], y = f[h], v = u[g], m = r[g];
                        m && (m[p] = y), y < v[0] && (v[0] = y), y > v[1] && (v[1] = y);
                    }
                }
            }
        }, e.prototype.lttbDownSample = function(t, e) {
            var n, i, r, o = this.clone([ t ], !0), a = o._chunks[t], s = this.count(), l = 0, u = Math.floor(1 / e), h = this.getRawIndex(0), c = new (wa(this._rawCount))(Math.min(2 * (Math.ceil(s / u) + 2), s));
            c[l++] = h;
            for (var p = 1; s - 1 > p; p += u) {
                for (var d = Math.min(p + u, s - 1), f = Math.min(p + 2 * u, s), g = (f + d) / 2, y = 0, v = d; f > v; v++) {
                    var m = a[T = this.getRawIndex(v)];
                    isNaN(m) || (y += m);
                }
                y /= f - d;
                var _ = p, x = Math.min(p + u, s), w = p - 1, b = a[h];
                n = -1, r = _;
                var S = -1, M = 0;
                for (v = _; x > v; v++) {
                    var T;
                    m = a[T = this.getRawIndex(v)];
                    isNaN(m) ? (M++, 0 > S && (S = T)) : (i = Math.abs((w - g) * (m - b) - (w - v) * (y - b))) > n && (n = i, 
                    r = T);
                }
                M > 0 && x - _ > M && (c[l++] = Math.min(S, r), r = Math.max(S, r)), c[l++] = r, 
                h = r;
            }
            return c[l++] = this.getRawIndex(s - 1), o._count = l, o._indices = c, o.getRawIndex = this._getRawIdx, 
            o;
        }, e.prototype.downSample = function(t, e, n, i) {
            for (var r = this.clone([ t ], !0), o = r._chunks, a = [], s = Math.floor(1 / e), l = o[t], u = this.count(), h = r._rawExtent[t] = [ 1 / 0, -1 / 0 ], c = new (wa(this._rawCount))(Math.ceil(u / s)), p = 0, d = 0; u > d; d += s) {
                s > u - d && (s = u - d, a.length = s);
                for (var f = 0; s > f; f++) {
                    var g = this.getRawIndex(d + f);
                    a[f] = l[g];
                }
                var y = n(a), v = this.getRawIndex(Math.min(d + i(a, y) || 0, u - 1));
                l[v] = y, y < h[0] && (h[0] = y), y > h[1] && (h[1] = y), c[p++] = v;
            }
            return r._count = p, r._indices = c, r._updateGetRawIdx(), r;
        }, e.prototype.each = function(t, e) {
            if (this._count) for (var n = t.length, i = this._chunks, r = 0, o = this.count(); o > r; r++) {
                var a = this.getRawIndex(r);
                switch (n) {
                  case 0:
                    e(r);
                    break;

                  case 1:
                    e(i[t[0]][a], r);
                    break;

                  case 2:
                    e(i[t[0]][a], i[t[1]][a], r);
                    break;

                  default:
                    for (var s = 0, l = []; n > s; s++) l[s] = i[t[s]][a];
                    l[s] = r, e.apply(null, l);
                }
            }
        }, e.prototype.getDataExtent = function(t) {
            var e = this._chunks[t], n = [ 1 / 0, -1 / 0 ];
            if (!e) return n;
            var i, r = this.count();
            if (!this._indices) return this._rawExtent[t].slice();
            if (i = this._extent[t]) return i.slice();
            for (var o = (i = n)[0], a = i[1], s = 0; r > s; s++) {
                var l = e[this.getRawIndex(s)];
                o > l && (o = l), l > a && (a = l);
            }
            return i = [ o, a ], this._extent[t] = i, i;
        }, e.prototype.getRawDataItem = function(t) {
            var e = this.getRawIndex(t);
            if (this._provider.persistent) return this._provider.getItem(e);
            for (var n = [], i = this._chunks, r = 0; r < i.length; r++) n.push(i[r][e]);
            return n;
        }, e.prototype.clone = function(t, n) {
            var i = new e(), r = this._chunks, o = t && y(t, function(t, e) {
                return t[e] = !0, t;
            }, {});
            if (o) for (var a = 0; a < r.length; a++) i._chunks[a] = o[a] ? ba(r[a]) : r[a]; else i._chunks = r;
            return this._copyCommonProps(i), n || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), 
            i;
        }, e.prototype._copyCommonProps = function(t) {
            t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, 
            t._dimensions = this._dimensions, t._extent = a(this._extent), t._rawExtent = a(this._rawExtent);
        }, e.prototype._cloneIndices = function() {
            if (this._indices) {
                var t = this._indices.constructor, e = void 0;
                if (t === Array) {
                    var n = this._indices.length;
                    e = new t(n);
                    for (var i = 0; n > i; i++) e[i] = this._indices[i];
                } else e = new t(this._indices);
                return e;
            }
            return null;
        }, e.prototype._getRawIdxIdentity = function(t) {
            return t;
        }, e.prototype._getRawIdx = function(t) {
            return t < this._count && t >= 0 ? this._indices[t] : -1;
        }, e.prototype._updateGetRawIdx = function() {
            this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
        }, e.internalField = function() {
            function t(t, e, n, i) {
                return fa(t[i], this._dimensions[i]);
            }
            Xv = {
                arrayRows: t,
                objectRows: function(t, e, n, i) {
                    return fa(t[e], this._dimensions[i]);
                },
                keyedColumns: t,
                original: function(t, e, n, i) {
                    var r = t && (null == t.value ? t : t.value);
                    return fa(r instanceof Array ? r[i] : r, this._dimensions[i]);
                },
                typedArray: function(t, e, n, i) {
                    return t[i];
                }
            };
        }(), e;
    }(), Im = function() {
        function t(t) {
            this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._versionSignBase = 0, 
            this._dirty = !0, this._sourceHost = t;
        }
        return t.prototype.dirty = function() {
            this._setLocalSource([], []), this._storeList = [], this._dirty = !0;
        }, t.prototype._setLocalSource = function(t, e) {
            this._sourceList = t, this._upstreamSignList = e, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
        }, t.prototype._getVersionSign = function() {
            return this._sourceHost.uid + "_" + this._versionSignBase;
        }, t.prototype.prepareSource = function() {
            this._isDirty() && (this._createSource(), this._dirty = !1);
        }, t.prototype._createSource = function() {
            this._setLocalSource([], []);
            var t, e, n = this._sourceHost, i = this._getUpstreamSourceManagers(), r = !!i.length;
            if (Ta(n)) {
                var o = n, a = void 0, s = void 0, l = void 0;
                if (r) {
                    var u = i[0];
                    u.prepareSource(), a = (l = u.getSource()).data, s = l.sourceFormat, e = [ u._getVersionSign() ];
                } else s = I(a = o.get("data", !0)) ? Dv : Tv, e = [];
                var h = this._getSourceMetaRawOption() || {}, c = l && l.metaRawOption || {}, p = O(h.seriesLayoutBy, c.seriesLayoutBy) || null, d = O(h.sourceHeader, c.sourceHeader), f = O(h.dimensions, c.dimensions);
                t = p !== c.seriesLayoutBy || !!d != !!c.sourceHeader || f ? [ ta(a, {
                    seriesLayoutBy: p,
                    sourceHeader: d,
                    dimensions: f
                }, s) ] : [];
            } else {
                var g = n;
                if (r) {
                    var y = this._applyTransform(i);
                    t = y.sourceList, e = y.upstreamSignList;
                } else {
                    t = [ ta(g.get("source", !0), this._getSourceMetaRawOption(), null) ], e = [];
                }
            }
            this._setLocalSource(t, e);
        }, t.prototype._applyTransform = function(t) {
            var e = this._sourceHost, n = e.get("transform", !0), i = e.get("fromTransformResult", !0);
            if (null != i) {
                1 !== t.length && Ca("");
            }
            var r, o = [], a = [];
            return f(t, function(t) {
                t.prepareSource();
                var e = t.getSource(i || 0);
                null == i || e || Ca(""), o.push(e), a.push(t._getVersionSign());
            }), n ? r = function(t, e, n) {
                var i = fn(t), r = i.length;
                r || pn("");
                for (var o = 0, a = r; a > o; o++) {
                    e = _a(i[o], e), o !== a - 1 && (e.length = Math.max(e.length, 1));
                }
                return e;
            }(n, o, e.componentIndex) : null != i && (r = [ na(o[0]) ]), {
                sourceList: r,
                upstreamSignList: a
            };
        }, t.prototype._isDirty = function() {
            if (this._dirty) return !0;
            for (var t = this._getUpstreamSourceManagers(), e = 0; e < t.length; e++) {
                var n = t[e];
                if (n._isDirty() || this._upstreamSignList[e] !== n._getVersionSign()) return !0;
            }
        }, t.prototype.getSource = function(t) {
            t = t || 0;
            var e = this._sourceList[t];
            if (!e) {
                var n = this._getUpstreamSourceManagers();
                return n[0] && n[0].getSource(t);
            }
            return e;
        }, t.prototype.getSharedDataStore = function(t) {
            var e = t.makeStoreSchema();
            return this._innerGetDataStore(e.dimensions, t.source, e.hash);
        }, t.prototype._innerGetDataStore = function(t, e, n) {
            var i = this._storeList, r = i[0];
            r || (r = i[0] = {});
            var o = r[n];
            if (!o) {
                var a = this._getUpstreamSourceManagers()[0];
                Ta(this._sourceHost) && a ? o = a._innerGetDataStore(t, e, n) : (o = new Cm()).initData(new om(e, t.length), t), 
                r[n] = o;
            }
            return o;
        }, t.prototype._getUpstreamSourceManagers = function() {
            var t = this._sourceHost;
            if (Ta(t)) {
                var e = Oo(t);
                return e ? [ e.getSourceManager() ] : [];
            }
            return g(function(t) {
                return t.get("transform", !0) || t.get("fromTransformResult", !0) ? kn(t.ecModel, "dataset", {
                    index: t.get("fromDatasetIndex", !0),
                    id: t.get("fromDatasetId", !0)
                }, Ed).models : [];
            }(t), function(t) {
                return t.getSourceManager();
            });
        }, t.prototype._getSourceMetaRawOption = function() {
            var t, e, n, i = this._sourceHost;
            if (Ta(i)) t = i.get("seriesLayoutBy", !0), e = i.get("sourceHeader", !0), n = i.get("dimensions", !0); else if (!this._getUpstreamSourceManagers().length) {
                var r = i;
                t = r.get("seriesLayoutBy", !0), e = r.get("sourceHeader", !0), n = r.get("dimensions", !0);
            }
            return {
                seriesLayoutBy: t,
                sourceHeader: e,
                dimensions: n
            };
        }, t;
    }(), km = "line-height:1", Dm = [ 0, 10, 20, 30 ], Am = [ "", "\n", "\n\n", "\n\n\n" ], Pm = function() {
        function t() {
            this.richTextStyles = {}, this._nextStyleNameId = hn();
        }
        return t.prototype._generateStyleName = function() {
            return "__EC_aUTo_" + this._nextStyleNameId++;
        }, t.prototype.makeTooltipMarker = function(t, e, n) {
            var i = "richText" === n ? this._generateStyleName() : null, r = Mo({
                color: e,
                type: t,
                renderMode: n,
                markerId: i
            });
            return b(r) ? r : (this.richTextStyles[i] = r.style, r.content);
        }, t.prototype.wrapRichTextStyle = function(t, e) {
            var n = {};
            x(e) ? f(e, function(t) {
                return l(n, t);
            }) : l(n, e);
            var i = this._generateStyleName();
            return this.richTextStyles[i] = n, "{" + i + "|" + t + "}";
        }, t;
    }(), Lm = Tn(), Om = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e._selectedDataIndicesMap = {}, e;
        }
        return n(e, t), e.prototype.init = function(t, e, n) {
            this.seriesIndex = this.componentIndex, this.dataTask = da({
                count: Ha,
                reset: Wa
            }), this.dataTask.context = {
                model: this
            }, this.mergeDefaultAndTheme(t, n), (Lm(this).sourceManager = new Im(this)).prepareSource();
            var i = this.getInitialData(t, n);
            Ua(i, this), this.dataTask.context.data = i, Lm(this).dataBeforeProcessed = i, Va(this), 
            this._initSelectedMapFromData(i);
        }, e.prototype.mergeDefaultAndTheme = function(t, e) {
            var n = Do(this), i = n ? Po(t) : {}, r = this.subType;
            mv.hasClass(r) && (r += "Series"), s(t, e.getTheme().get(this.subType)), s(t, this.getDefaultOption()), 
            gn(t, "label", [ "show" ]), this.fillDataTextStyle(t.data), n && Ao(t, i, n);
        }, e.prototype.mergeOption = function(t, e) {
            t = s(this.option, t, !0), this.fillDataTextStyle(t.data);
            var n = Do(this);
            n && Ao(this.option, t, n);
            var i = Lm(this).sourceManager;
            i.dirty(), i.prepareSource();
            var r = this.getInitialData(t, e);
            Ua(r, this), this.dataTask.dirty(), this.dataTask.context.data = r, Lm(this).dataBeforeProcessed = r, 
            Va(this), this._initSelectedMapFromData(r);
        }, e.prototype.fillDataTextStyle = function(t) {
            if (t && !I(t)) for (var e = [ "show" ], n = 0; n < t.length; n++) t[n] && t[n].label && gn(t[n], "label", e);
        }, e.prototype.getInitialData = function() {}, e.prototype.appendData = function(t) {
            this.getRawData().appendData(t.data);
        }, e.prototype.getData = function(t) {
            var e = Ya(this);
            if (e) {
                var n = e.context.data;
                return null == t ? n : n.getLinkedData(t);
            }
            return Lm(this).data;
        }, e.prototype.getAllData = function() {
            var t = this.getData();
            return t && t.getLinkedDataAll ? t.getLinkedDataAll() : [ {
                data: t
            } ];
        }, e.prototype.setData = function(t) {
            var e = Ya(this);
            if (e) {
                var n = e.context;
                n.outputData = t, e !== this.dataTask && (n.data = t);
            }
            Lm(this).data = t;
        }, e.prototype.getEncode = function() {
            var t = this.get("encode", !0);
            return t ? H(t) : void 0;
        }, e.prototype.getSourceManager = function() {
            return Lm(this).sourceManager;
        }, e.prototype.getSource = function() {
            return this.getSourceManager().getSource();
        }, e.prototype.getRawData = function() {
            return Lm(this).dataBeforeProcessed;
        }, e.prototype.getColorBy = function() {
            return this.get("colorBy") || "series";
        }, e.prototype.isColorBySeries = function() {
            return "series" === this.getColorBy();
        }, e.prototype.getBaseAxis = function() {
            var t = this.coordinateSystem;
            return t && t.getBaseAxis && t.getBaseAxis();
        }, e.prototype.formatTooltip = function(t, e) {
            return za({
                series: this,
                dataIndex: t,
                multipleSeries: e
            });
        }, e.prototype.isAnimationEnabled = function() {
            var t = this.ecModel;
            if (ic.node && (!t || !t.ssr)) return !1;
            var e = this.getShallow("animation");
            return e && this.getData().count() > this.getShallow("animationThreshold") && (e = !1), 
            !!e;
        }, e.prototype.restoreData = function() {
            this.dataTask.dirty();
        }, e.prototype.getColorFromPalette = function(t, e, n) {
            var i = this.ecModel, r = zv.prototype.getColorFromPalette.call(this, t, e, n);
            return r || (r = i.getColorFromPalette(t, e, n)), r;
        }, e.prototype.coordDimToDataDim = function(t) {
            return this.getRawData().mapDimensionsAll(t);
        }, e.prototype.getProgressive = function() {
            return this.get("progressive");
        }, e.prototype.getProgressiveThreshold = function() {
            return this.get("progressiveThreshold");
        }, e.prototype.select = function(t, e) {
            this._innerSelect(this.getData(e), t);
        }, e.prototype.unselect = function(t, e) {
            var n = this.option.selectedMap;
            if (n) {
                var i = this.option.selectedMode, r = this.getData(e);
                if ("series" === i || "all" === n) return this.option.selectedMap = {}, void (this._selectedDataIndicesMap = {});
                for (var o = 0; o < t.length; o++) {
                    var a = Fa(r, t[o]);
                    n[a] = !1, this._selectedDataIndicesMap[a] = -1;
                }
            }
        }, e.prototype.toggleSelect = function(t, e) {
            for (var n = [], i = 0; i < t.length; i++) n[0] = t[i], this.isSelected(t[i], e) ? this.unselect(n, e) : this.select(n, e);
        }, e.prototype.getSelectedDataIndices = function() {
            if ("all" === this.option.selectedMap) return [].slice.call(this.getData().getIndices());
            for (var t = this._selectedDataIndicesMap, e = m(t), n = [], i = 0; i < e.length; i++) {
                var r = t[e[i]];
                r >= 0 && n.push(r);
            }
            return n;
        }, e.prototype.isSelected = function(t, e) {
            var n = this.option.selectedMap;
            if (!n) return !1;
            var i = this.getData(e);
            return ("all" === n || n[Fa(i, t)]) && !i.getItemModel(t).get([ "select", "disabled" ]);
        }, e.prototype.isUniversalTransitionEnabled = function() {
            if (this.__universalTransitionEnabled) return !0;
            var t = this.option.universalTransition;
            return !!t && (!0 === t || t && t.enabled);
        }, e.prototype._innerSelect = function(t, e) {
            var n, i, r = this.option, o = r.selectedMode, a = e.length;
            if (o && a) if ("series" === o) r.selectedMap = "all"; else if ("multiple" === o) {
                T(r.selectedMap) || (r.selectedMap = {});
                for (var s = r.selectedMap, l = 0; a > l; l++) {
                    var u = e[l];
                    s[c = Fa(t, u)] = !0, this._selectedDataIndicesMap[c] = t.getRawIndex(u);
                }
            } else if ("single" === o || !0 === o) {
                var h = e[a - 1], c = Fa(t, h);
                r.selectedMap = ((n = {})[c] = !0, n), this._selectedDataIndicesMap = ((i = {})[c] = t.getRawIndex(h), 
                i);
            }
        }, e.prototype._initSelectedMapFromData = function(t) {
            if (!this.option.selectedMap) {
                var e = [];
                t.hasItemOption && t.each(function(n) {
                    var i = t.getRawDataItem(n);
                    i && i.selected && e.push(n);
                }), e.length > 0 && this._innerSelect(t, e);
            }
        }, e.registerClass = function(t) {
            return mv.registerClass(t);
        }, e.protoInitialize = function() {
            var t = e.prototype;
            t.type = "series.__base__", t.seriesIndex = 0, t.ignoreStyleOnData = !1, t.hasSymbolVisual = !1, 
            t.defaultSymbol = "circle", t.visualStyleAccessPath = "itemStyle", t.visualDrawType = "fill";
        }(), e;
    }(mv);
    p(Om, dm), p(Om, zv), Ln(Om, mv);
    var Rm = function() {
        function t() {
            this.group = new Md(), this.uid = Zr("viewComponent");
        }
        return t.prototype.init = function() {}, t.prototype.render = function() {}, t.prototype.dispose = function() {}, 
        t.prototype.updateView = function() {}, t.prototype.updateLayout = function() {}, 
        t.prototype.updateVisual = function() {}, t.prototype.toggleBlurSeries = function() {}, 
        t.prototype.eachRendered = function(t) {
            var e = this.group;
            e && e.traverse(t);
        }, t;
    }();
    Pn(Rm), Bn(Rm);
    var Bm = Tn(), Em = qa(), zm = function() {
        function t() {
            this.group = new Md(), this.uid = Zr("viewChart"), this.renderTask = da({
                plan: Ka,
                reset: $a
            }), this.renderTask.context = {
                view: this
            };
        }
        return t.prototype.init = function() {}, t.prototype.render = function() {}, t.prototype.highlight = function(t, e, n, i) {
            var r = t.getData(i && i.dataType);
            r && Za(r, i, "emphasis");
        }, t.prototype.downplay = function(t, e, n, i) {
            var r = t.getData(i && i.dataType);
            r && Za(r, i, "normal");
        }, t.prototype.remove = function() {
            this.group.removeAll();
        }, t.prototype.dispose = function() {}, t.prototype.updateView = function(t, e, n, i) {
            this.render(t, e, n, i);
        }, t.prototype.updateLayout = function(t, e, n, i) {
            this.render(t, e, n, i);
        }, t.prototype.updateVisual = function(t, e, n, i) {
            this.render(t, e, n, i);
        }, t.prototype.eachRendered = function(t) {
            Vr(this.group, t);
        }, t.markUpdateMethod = function(t, e) {
            Bm(t).updateMethod = e;
        }, t.protoInitialize = void (t.prototype.type = "chart"), t;
    }();
    Pn(zm), Bn(zm);
    var Nm, Fm = {
        incrementalPrepareRender: {
            progress: function(t, e) {
                e.view.incrementalRender(t, e.model, e.ecModel, e.api, e.payload);
            }
        },
        render: {
            forceFirstProgress: !0,
            progress: function(t, e) {
                e.view.render(e.model, e.ecModel, e.api, e.payload);
            }
        }
    }, Vm = "\0__throttleOriginMethod", Hm = "\0__throttleRate", Wm = "\0__throttleType", Gm = Tn(), Um = {
        itemStyle: En(Gy, !0),
        lineStyle: En(Vy, !0)
    }, Xm = {
        lineStyle: "stroke",
        itemStyle: "fill"
    }, Ym = {
        createOnAllSeries: !0,
        performRawSeries: !0,
        reset: function(t, e) {
            var n = t.getData(), i = t.visualStyleAccessPath || "itemStyle", r = t.getModel(i), o = es(t, i)(r), a = r.getShallow("decal");
            a && (n.setVisual("decal", a), a.dirty = !0);
            var s = ns(t, i), u = o[s], h = w(u) ? u : null, c = "auto" === o.fill || "auto" === o.stroke;
            if (!o[s] || h || c) {
                var p = t.getColorFromPalette(t.name, null, e.getSeriesCount());
                o[s] || (o[s] = p, n.setVisual("colorFromPalette", !0)), o.fill = "auto" === o.fill || w(o.fill) ? p : o.fill, 
                o.stroke = "auto" === o.stroke || w(o.stroke) ? p : o.stroke;
            }
            return n.setVisual("style", o), n.setVisual("drawType", s), !e.isSeriesFiltered(t) && h ? (n.setVisual("colorFromPalette", !1), 
            {
                dataEach: function(e, n) {
                    var i = t.getDataParams(n), r = l({}, o);
                    r[s] = h(i), e.setItemVisual(n, "style", r);
                }
            }) : void 0;
        }
    }, qm = new Yy(), jm = {
        createOnAllSeries: !0,
        performRawSeries: !0,
        reset: function(t, e) {
            if (!t.ignoreStyleOnData && !e.isSeriesFiltered(t)) {
                var n = t.getData(), i = t.visualStyleAccessPath || "itemStyle", r = es(t, i), o = n.getVisual("drawType");
                return {
                    dataEach: n.hasItemOption ? function(t, e) {
                        var n = t.getRawDataItem(e);
                        if (n && n[i]) {
                            qm.option = n[i];
                            var a = r(qm);
                            l(t.ensureUniqueItemVisual(e, "style"), a), qm.option.decal && (t.setItemVisual(e, "decal", qm.option.decal), 
                            qm.option.decal.dirty = !0), o in a && t.setItemVisual(e, "colorFromPalette", !1);
                        }
                    } : null
                };
            }
        }
    }, Zm = {
        performRawSeries: !0,
        overallReset: function(t) {
            var e = H();
            t.eachSeries(function(t) {
                var n = t.getColorBy();
                if (!t.isColorBySeries()) {
                    var i = t.type + "-" + n, r = e.get(i);
                    r || (r = {}, e.set(i, r)), Gm(t).scope = r;
                }
            }), t.eachSeries(function(e) {
                if (!e.isColorBySeries() && !t.isSeriesFiltered(e)) {
                    var n = e.getRawData(), i = {}, r = e.getData(), o = Gm(e).scope, a = e.visualStyleAccessPath || "itemStyle", s = ns(e, a);
                    r.each(function(t) {
                        var e = r.getRawIndex(t);
                        i[e] = t;
                    }), n.each(function(t) {
                        var a = i[t];
                        if (r.getItemVisual(a, "colorFromPalette")) {
                            var l = r.ensureUniqueItemVisual(a, "style"), u = n.getName(t) || t + "", h = n.count();
                            l[s] = e.getColorFromPalette(u, o, h);
                        }
                    });
                }
            });
        }
    }, Km = Math.PI, $m = function() {
        function t(t, e, n, i) {
            this._stageTaskMap = H(), this.ecInstance = t, this.api = e, n = this._dataProcessorHandlers = n.slice(), 
            i = this._visualHandlers = i.slice(), this._allHandlers = n.concat(i);
        }
        return t.prototype.restoreData = function(t, e) {
            t.restoreData(e), this._stageTaskMap.each(function(t) {
                var e = t.overallTask;
                e && e.dirty();
            });
        }, t.prototype.getPerformArgs = function(t, e) {
            if (t.__pipeline) {
                var n = this._pipelineMap.get(t.__pipeline.id), i = n.context, r = !e && n.progressiveEnabled && (!i || i.progressiveRender) && t.__idxInPipeline > n.blockIndex ? n.step : null, o = i && i.modDataCount;
                return {
                    step: r,
                    modBy: null != o ? Math.ceil(o / r) : null,
                    modDataCount: o
                };
            }
        }, t.prototype.getPipeline = function(t) {
            return this._pipelineMap.get(t);
        }, t.prototype.updateStreamModes = function(t, e) {
            var n = this._pipelineMap.get(t.uid), i = t.getData().count(), r = n.progressiveEnabled && e.incrementalPrepareRender && i >= n.threshold, o = t.get("large") && i >= t.get("largeThreshold"), a = "mod" === t.get("progressiveChunkMode") ? i : null;
            t.pipelineContext = n.context = {
                progressiveRender: r,
                modDataCount: a,
                large: o
            };
        }, t.prototype.restorePipelines = function(t) {
            var e = this, n = e._pipelineMap = H();
            t.eachSeries(function(t) {
                var i = t.getProgressive(), r = t.uid;
                n.set(r, {
                    id: r,
                    head: null,
                    tail: null,
                    threshold: t.getProgressiveThreshold(),
                    progressiveEnabled: i && !(t.preventIncremental && t.preventIncremental()),
                    blockIndex: -1,
                    step: Math.round(i || 700),
                    count: 0
                }), e._pipe(t, t.dataTask);
            });
        }, t.prototype.prepareStageTasks = function() {
            var t = this._stageTaskMap, e = this.api.getModel(), n = this.api;
            f(this._allHandlers, function(i) {
                var r = t.get(i.uid) || t.set(i.uid, {});
                z(!(i.reset && i.overallReset), ""), i.reset && this._createSeriesStageTask(i, r, e, n), 
                i.overallReset && this._createOverallStageTask(i, r, e, n);
            }, this);
        }, t.prototype.prepareView = function(t, e, n, i) {
            var r = t.renderTask, o = r.context;
            o.model = e, o.ecModel = n, o.api = i, r.__block = !t.incrementalPrepareRender, 
            this._pipe(e, r);
        }, t.prototype.performDataProcessorTasks = function(t, e) {
            this._performStageTasks(this._dataProcessorHandlers, t, e, {
                block: !0
            });
        }, t.prototype.performVisualTasks = function(t, e, n) {
            this._performStageTasks(this._visualHandlers, t, e, n);
        }, t.prototype._performStageTasks = function(t, e, n, i) {
            function r(t, e) {
                return t.setDirty && (!t.dirtyMap || t.dirtyMap.get(e.__pipeline.id));
            }
            i = i || {};
            var o = !1, a = this;
            f(t, function(t) {
                if (!i.visualType || i.visualType === t.visualType) {
                    var s = a._stageTaskMap.get(t.uid), l = s.seriesTaskMap, u = s.overallTask;
                    if (u) {
                        var h, c = u.agentStubMap;
                        c.each(function(t) {
                            r(i, t) && (t.dirty(), h = !0);
                        }), h && u.dirty(), a.updatePayload(u, n);
                        var p = a.getPerformArgs(u, i.block);
                        c.each(function(t) {
                            t.perform(p);
                        }), u.perform(p) && (o = !0);
                    } else l && l.each(function(s) {
                        r(i, s) && s.dirty();
                        var l = a.getPerformArgs(s, i.block);
                        l.skip = !t.performRawSeries && e.isSeriesFiltered(s.context.model), a.updatePayload(s, n), 
                        s.perform(l) && (o = !0);
                    });
                }
            }), this.unfinished = o || this.unfinished;
        }, t.prototype.performSeriesTasks = function(t) {
            var e;
            t.eachSeries(function(t) {
                e = t.dataTask.perform() || e;
            }), this.unfinished = e || this.unfinished;
        }, t.prototype.plan = function() {
            this._pipelineMap.each(function(t) {
                var e = t.tail;
                do {
                    if (e.__block) {
                        t.blockIndex = e.__idxInPipeline;
                        break;
                    }
                    e = e.getUpstream();
                } while (e);
            });
        }, t.prototype.updatePayload = function(t, e) {
            "remain" !== e && (t.context.payload = e);
        }, t.prototype._createSeriesStageTask = function(t, e, n, i) {
            function r(e) {
                var r = e.uid, l = s.set(r, a && a.get(r) || da({
                    plan: ss,
                    reset: ls,
                    count: hs
                }));
                l.context = {
                    model: e,
                    ecModel: n,
                    api: i,
                    useClearVisual: t.isVisual && !t.isLayout,
                    plan: t.plan,
                    reset: t.reset,
                    scheduler: o
                }, o._pipe(e, l);
            }
            var o = this, a = e.seriesTaskMap, s = e.seriesTaskMap = H(), l = t.seriesType, u = t.getTargetSeries;
            t.createOnAllSeries ? n.eachRawSeries(r) : l ? n.eachRawSeriesByType(l, r) : u && u(n, i).each(r);
        }, t.prototype._createOverallStageTask = function(t, e, n, i) {
            function r(t) {
                var e = t.uid, n = l.set(e, s && s.get(e) || (p = !0, da({
                    reset: rs,
                    onDirty: as
                })));
                n.context = {
                    model: t,
                    overallProgress: c
                }, n.agent = a, n.__block = c, o._pipe(t, n);
            }
            var o = this, a = e.overallTask = e.overallTask || da({
                reset: is
            });
            a.context = {
                ecModel: n,
                api: i,
                overallReset: t.overallReset,
                scheduler: o
            };
            var s = a.agentStubMap, l = a.agentStubMap = H(), u = t.seriesType, h = t.getTargetSeries, c = !0, p = !1;
            z(!t.createOnAllSeries, ""), u ? n.eachRawSeriesByType(u, r) : h ? h(n, i).each(r) : (c = !1, 
            f(n.getSeries(), r)), p && a.dirty();
        }, t.prototype._pipe = function(t, e) {
            var n = t.uid, i = this._pipelineMap.get(n);
            !i.head && (i.head = e), i.tail && i.tail.pipe(e), i.tail = e, e.__idxInPipeline = i.count++, 
            e.__pipeline = i;
        }, t.wrapStageHandler = function(t, e) {
            return w(t) && (t = {
                overallReset: t,
                seriesType: cs(t)
            }), t.uid = Zr("stageHandler"), e && (t.visualType = e), t;
        }, t;
    }(), Qm = us(0), Jm = {}, t_ = {};
    ps(Jm, Fv), ps(t_, qv), Jm.eachSeriesByType = Jm.eachRawSeriesByType = function(t) {
        Nm = t;
    }, Jm.eachComponent = function(t) {
        "series" === t.mainType && t.subType && (Nm = t.subType);
    };
    var e_ = [ "#37A2DA", "#32C5E9", "#67E0E3", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE", "#E690D1", "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF" ], n_ = {
        color: e_,
        colorLayer: [ [ "#37A2DA", "#ffd85c", "#fd7b5f" ], [ "#37A2DA", "#67E0E3", "#FFDB5C", "#ff9f7f", "#E062AE", "#9d96f5" ], [ "#37A2DA", "#32C5E9", "#9FE6B8", "#FFDB5C", "#ff9f7f", "#fb7293", "#e7bcf3", "#8378EA", "#96BFFF" ], e_ ]
    }, i_ = "#B9B8CE", r_ = "#100C2A", o_ = function() {
        return {
            axisLine: {
                lineStyle: {
                    color: i_
                }
            },
            splitLine: {
                lineStyle: {
                    color: "#484753"
                }
            },
            splitArea: {
                areaStyle: {
                    color: [ "rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)" ]
                }
            },
            minorSplitLine: {
                lineStyle: {
                    color: "#20203B"
                }
            }
        };
    }, a_ = [ "#4992ff", "#7cffb2", "#fddd60", "#ff6e76", "#58d9f9", "#05c091", "#ff8a45", "#8d48e3", "#dd79ff" ], s_ = {
        darkMode: !0,
        color: a_,
        backgroundColor: r_,
        axisPointer: {
            lineStyle: {
                color: "#817f91"
            },
            crossStyle: {
                color: "#817f91"
            },
            label: {
                color: "#fff"
            }
        },
        legend: {
            textStyle: {
                color: i_
            }
        },
        textStyle: {
            color: i_
        },
        title: {
            textStyle: {
                color: "#EEF1FA"
            },
            subtextStyle: {
                color: "#B9B8CE"
            }
        },
        toolbox: {
            iconStyle: {
                borderColor: i_
            }
        },
        dataZoom: {
            borderColor: "#71708A",
            textStyle: {
                color: i_
            },
            brushStyle: {
                color: "rgba(135,163,206,0.3)"
            },
            handleStyle: {
                color: "#353450",
                borderColor: "#C5CBE3"
            },
            moveHandleStyle: {
                color: "#B0B6C3",
                opacity: .3
            },
            fillerColor: "rgba(135,163,206,0.2)",
            emphasis: {
                handleStyle: {
                    borderColor: "#91B7F2",
                    color: "#4D587D"
                },
                moveHandleStyle: {
                    color: "#636D9A",
                    opacity: .7
                }
            },
            dataBackground: {
                lineStyle: {
                    color: "#71708A",
                    width: 1
                },
                areaStyle: {
                    color: "#71708A"
                }
            },
            selectedDataBackground: {
                lineStyle: {
                    color: "#87A3CE"
                },
                areaStyle: {
                    color: "#87A3CE"
                }
            }
        },
        visualMap: {
            textStyle: {
                color: i_
            }
        },
        timeline: {
            lineStyle: {
                color: i_
            },
            label: {
                color: i_
            },
            controlStyle: {
                color: i_,
                borderColor: i_
            }
        },
        calendar: {
            itemStyle: {
                color: r_
            },
            dayLabel: {
                color: i_
            },
            monthLabel: {
                color: i_
            },
            yearLabel: {
                color: i_
            }
        },
        timeAxis: o_(),
        logAxis: o_(),
        valueAxis: o_(),
        categoryAxis: o_(),
        line: {
            symbol: "circle"
        },
        graph: {
            color: a_
        },
        gauge: {
            title: {
                color: i_
            },
            axisLine: {
                lineStyle: {
                    color: [ [ 1, "rgba(207,212,219,0.2)" ] ]
                }
            },
            axisLabel: {
                color: i_
            },
            detail: {
                color: "#EEF1FA"
            }
        },
        candlestick: {
            itemStyle: {
                color: "#f64e56",
                color0: "#54ea92",
                borderColor: "#f64e56",
                borderColor0: "#54ea92"
            }
        }
    };
    s_.categoryAxis.splitLine.show = !1;
    var l_ = function() {
        function t() {}
        return t.prototype.normalizeQuery = function(t) {
            var e = {}, n = {}, i = {};
            if (b(t)) {
                var r = An(t);
                e.mainType = r.main || null, e.subType = r.sub || null;
            } else {
                var o = [ "Index", "Name", "Id" ], a = {
                    name: 1,
                    dataIndex: 1,
                    dataType: 1
                };
                f(t, function(t, r) {
                    for (var s = !1, l = 0; l < o.length; l++) {
                        var u = o[l], h = r.lastIndexOf(u);
                        if (h > 0 && h === r.length - u.length) {
                            var c = r.slice(0, h);
                            "data" !== c && (e.mainType = c, e[u.toLowerCase()] = t, s = !0);
                        }
                    }
                    a.hasOwnProperty(r) && (n[r] = t, s = !0), s || (i[r] = t);
                });
            }
            return {
                cptQuery: e,
                dataQuery: n,
                otherQuery: i
            };
        }, t.prototype.filter = function(t, e) {
            function n(t, e, n, i) {
                return null == t[n] || e[i || n] === t[n];
            }
            var i = this.eventInfo;
            if (!i) return !0;
            var r = i.targetEl, o = i.packedEvent, a = i.model, s = i.view;
            if (!a || !s) return !0;
            var l = e.cptQuery, u = e.dataQuery;
            return n(l, a, "mainType") && n(l, a, "subType") && n(l, a, "index", "componentIndex") && n(l, a, "name") && n(l, a, "id") && n(u, o, "name") && n(u, o, "dataIndex") && n(u, o, "dataType") && (!s.filterForExposedEvent || s.filterForExposedEvent(t, e.otherQuery, r, o));
        }, t.prototype.afterTrigger = function() {
            this.eventInfo = null;
        }, t;
    }(), u_ = [ "symbol", "symbolSize", "symbolRotate", "symbolOffset" ], h_ = u_.concat([ "symbolKeepAspect" ]), c_ = {
        createOnAllSeries: !0,
        performRawSeries: !0,
        reset: function(t, e) {
            var n = t.getData();
            if (t.legendIcon && n.setVisual("legendIcon", t.legendIcon), t.hasSymbolVisual) {
                for (var i = {}, r = {}, o = !1, a = 0; a < u_.length; a++) {
                    var s = u_[a], u = t.get(s);
                    w(u) ? (o = !0, r[s] = u) : i[s] = u;
                }
                if (i.symbol = i.symbol || t.defaultSymbol, n.setVisual(l({
                    legendIcon: t.legendIcon || i.symbol,
                    symbolKeepAspect: t.get("symbolKeepAspect")
                }, i)), !e.isSeriesFiltered(t)) {
                    var h = m(r);
                    return {
                        dataEach: o ? function(e, n) {
                            for (var i = t.getRawValue(n), o = t.getDataParams(n), a = 0; a < h.length; a++) {
                                var s = h[a];
                                e.setItemVisual(n, s, r[s](i, o));
                            }
                        } : null
                    };
                }
            }
        }
    }, p_ = {
        createOnAllSeries: !0,
        performRawSeries: !0,
        reset: function(t, e) {
            if (t.hasSymbolVisual && !e.isSeriesFiltered(t)) return {
                dataEach: t.getData().hasItemOption ? function(t, e) {
                    for (var n = t.getItemModel(e), i = 0; i < h_.length; i++) {
                        var r = h_[i], o = n.getShallow(r, !0);
                        null != o && t.setItemVisual(e, r, o);
                    }
                } : null
            };
        }
    }, d_ = Math.round(9 * Math.random()), f_ = "function" == typeof Object.defineProperty, g_ = function() {
        function t() {
            this._id = "__ec_inner_" + d_++;
        }
        return t.prototype.get = function(t) {
            return this._guard(t)[this._id];
        }, t.prototype.set = function(t, e) {
            var n = this._guard(t);
            return f_ ? Object.defineProperty(n, this._id, {
                value: e,
                enumerable: !1,
                configurable: !0
            }) : n[this._id] = e, this;
        }, t.prototype.delete = function(t) {
            return !!this.has(t) && (delete this._guard(t)[this._id], !0);
        }, t.prototype.has = function(t) {
            return !!this._guard(t)[this._id];
        }, t.prototype._guard = function(t) {
            if (t !== Object(t)) throw TypeError("Value of WeakMap is not a non-null object.");
            return t;
        }, t;
    }(), y_ = Hf.extend({
        type: "triangle",
        shape: {
            cx: 0,
            cy: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = e.width / 2, o = e.height / 2;
            t.moveTo(n, i - o), t.lineTo(n + r, i + o), t.lineTo(n - r, i + o), t.closePath();
        }
    }), v_ = Hf.extend({
        type: "diamond",
        shape: {
            cx: 0,
            cy: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.cx, i = e.cy, r = e.width / 2, o = e.height / 2;
            t.moveTo(n, i - o), t.lineTo(n + r, i), t.lineTo(n, i + o), t.lineTo(n - r, i), 
            t.closePath();
        }
    }), m_ = Hf.extend({
        type: "pin",
        shape: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.x, i = e.y, r = e.width / 5 * 3, o = Math.max(r, e.height), a = r / 2, s = a * a / (o - a), l = i - o + a + s, u = Math.asin(s / a), h = Math.cos(u) * a, c = Math.sin(u), p = Math.cos(u), d = .6 * a, f = .7 * a;
            t.moveTo(n - h, l + s), t.arc(n, l, a, Math.PI - u, 2 * Math.PI + u), t.bezierCurveTo(n + h - c * d, l + s + p * d, n, i - f, n, i), 
            t.bezierCurveTo(n, i - f, n - h + c * d, l + s + p * d, n - h, l + s), t.closePath();
        }
    }), __ = Hf.extend({
        type: "arrow",
        shape: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        buildPath: function(t, e) {
            var n = e.height, i = e.width, r = e.x, o = e.y, a = i / 3 * 2;
            t.moveTo(r, o), t.lineTo(r + a, o + n), t.lineTo(r, o + n / 4 * 3), t.lineTo(r - a, o + n), 
            t.lineTo(r, o), t.closePath();
        }
    }), x_ = {
        line: function(t, e, n, i, r) {
            r.x1 = t, r.y1 = e + i / 2, r.x2 = t + n, r.y2 = e + i / 2;
        },
        rect: function(t, e, n, i, r) {
            r.x = t, r.y = e, r.width = n, r.height = i;
        },
        roundRect: function(t, e, n, i, r) {
            r.x = t, r.y = e, r.width = n, r.height = i, r.r = Math.min(n, i) / 4;
        },
        square: function(t, e, n, i, r) {
            var o = Math.min(n, i);
            r.x = t, r.y = e, r.width = o, r.height = o;
        },
        circle: function(t, e, n, i, r) {
            r.cx = t + n / 2, r.cy = e + i / 2, r.r = Math.min(n, i) / 2;
        },
        diamond: function(t, e, n, i, r) {
            r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i;
        },
        pin: function(t, e, n, i, r) {
            r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i;
        },
        arrow: function(t, e, n, i, r) {
            r.x = t + n / 2, r.y = e + i / 2, r.width = n, r.height = i;
        },
        triangle: function(t, e, n, i, r) {
            r.cx = t + n / 2, r.cy = e + i / 2, r.width = n, r.height = i;
        }
    }, w_ = {};
    f({
        line: ay,
        rect: Kf,
        roundRect: Kf,
        square: Kf,
        circle: Eg,
        diamond: v_,
        pin: m_,
        arrow: __,
        triangle: y_
    }, function(t, e) {
        w_[e] = new t();
    });
    var b_ = Hf.extend({
        type: "symbol",
        shape: {
            symbolType: "",
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        calculateTextPosition: function(t, e, n) {
            var i = He(t, e, n), r = this.shape;
            return r && "pin" === r.symbolType && "inside" === e.position && (i.y = n.y + .4 * n.height), 
            i;
        },
        buildPath: function(t, e, n) {
            var i = e.symbolType;
            if ("none" !== i) {
                var r = w_[i];
                r || (r = w_[i = "rect"]), x_[i](e.x, e.y, e.width, e.height, r.shape), r.buildPath(t, r.shape, n);
            }
        }
    }), S_ = new Af(!0), M_ = [ "shadowBlur", "shadowOffsetX", "shadowOffsetY" ], T_ = [ [ "lineCap", "butt" ], [ "lineJoin", "miter" ], [ "miterLimit", 10 ] ], C_ = 1, I_ = 2, k_ = 3, D_ = 4, A_ = new g_(), P_ = new Op(100), L_ = [ "symbol", "symbolSize", "symbolKeepAspect", "color", "backgroundColor", "dashArrayX", "dashArrayY", "maxTileWidth", "maxTileHeight" ], O_ = new zc(), R_ = {}, B_ = 2e3, E_ = 1e3, z_ = 3e3, N_ = {
        PROCESSOR: {
            FILTER: 1e3,
            SERIES_FILTER: 800,
            STATISTIC: 5e3
        },
        VISUAL: {
            LAYOUT: E_,
            PROGRESSIVE_LAYOUT: 1100,
            GLOBAL: 2e3,
            CHART: z_,
            POST_CHART_LAYOUT: 4600,
            COMPONENT: 4e3,
            BRUSH: 5e3,
            CHART_ITEM: 4500,
            ARIA: 6e3,
            DECAL: 7e3
        }
    }, F_ = "__flagInMainProcess", V_ = "__pendingUpdate", H_ = "__needsUpdateStatus", W_ = /^[a-zA-Z0-9_]+$/, G_ = "__connectUpdateStatus", U_ = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this;
        }
        return n(e, t), e;
    }(zc), X_ = U_.prototype;
    X_.on = Ws("on"), X_.off = Ws("off");
    var Y_, q_, j_, Z_, K_, $_, Q_, J_, tx, ex, nx, ix, rx, ox, ax, sx, lx, ux, hx = function(t) {
        function e(e, n, i) {
            function r(t, e) {
                return t.__prio - e.__prio;
            }
            var o = t.call(this, new l_()) || this;
            o._chartsViews = [], o._chartsMap = {}, o._componentsViews = [], o._componentsMap = {}, 
            o._pendingActions = [], i = i || {}, b(n) && (n = mx[n]), o._dom = e;
            var s = o._zr = Ye(e, {
                renderer: i.renderer || "canvas",
                devicePixelRatio: i.devicePixelRatio,
                width: i.width,
                height: i.height,
                ssr: i.ssr,
                useDirtyRect: O(i.useDirtyRect, !1),
                useCoarsePointer: O(i.useCoarsePointer, "auto"),
                pointerSize: i.pointerSize
            });
            o._ssr = i.ssr, o._throttledZrFlush = Qa(Sc(s.flush, s), 17), (n = a(n)) && $o(n, !0), 
            o._theme = n, o._locale = Qr(i.locale || Jy), o._coordSysMgr = new Zv();
            var l = o._api = ax(o);
            return Rt(vx, r), Rt(gx, r), o._scheduler = new $m(o, l, gx, vx), o._messageCenter = new U_(), 
            o._initEvents(), o.resize = Sc(o.resize, o), s.animation.on("frame", o._onframe, o), 
            ex(s, o), nx(s, o), F(o), o;
        }
        return n(e, t), e.prototype._onframe = function() {
            if (!this._disposed) {
                ux(this);
                var t = this._scheduler;
                if (this[V_]) {
                    var e = this[V_].silent;
                    this[F_] = !0;
                    try {
                        Y_(this), Z_.update.call(this, null, this[V_].updateParams);
                    } catch (t) {
                        throw this[F_] = !1, this[V_] = null, t;
                    }
                    this._zr.flush(), this[F_] = !1, this[V_] = null, J_.call(this, e), tx.call(this, e);
                } else if (t.unfinished) {
                    var n = 1, i = this._model, r = this._api;
                    t.unfinished = !1;
                    do {
                        var o = +new Date();
                        t.performSeriesTasks(i), t.performDataProcessorTasks(i), $_(this, i), t.performVisualTasks(i), 
                        ox(this, this._model, r, "remain", {}), n -= +new Date() - o;
                    } while (n > 0 && t.unfinished);
                    t.unfinished || this._zr.flush();
                }
            }
        }, e.prototype.getDom = function() {
            return this._dom;
        }, e.prototype.getId = function() {
            return this.id;
        }, e.prototype.getZr = function() {
            return this._zr;
        }, e.prototype.isSSR = function() {
            return this._ssr;
        }, e.prototype.setOption = function(t, e, n) {
            if (!this[F_] && !this._disposed) {
                var i, r, o;
                if (T(e) && (n = e.lazyUpdate, i = e.silent, r = e.replaceMerge, o = e.transition, 
                e = e.notMerge), this[F_] = !0, !this._model || e) {
                    var a = new $v(this._api), s = this._theme, l = this._model = new Fv();
                    l.scheduler = this._scheduler, l.ssr = this._ssr, l.init(null, null, null, s, this._locale, a);
                }
                this._model.setOption(t, {
                    replaceMerge: r
                }, yx);
                var u = {
                    seriesTransition: o,
                    optionChanged: !0
                };
                if (n) this[V_] = {
                    silent: i,
                    updateParams: u
                }, this[F_] = !1, this.getZr().wakeUp(); else {
                    try {
                        Y_(this), Z_.update.call(this, null, u);
                    } catch (t) {
                        throw this[V_] = null, this[F_] = !1, t;
                    }
                    this._ssr || this._zr.flush(), this[V_] = null, this[F_] = !1, J_.call(this, i), 
                    tx.call(this, i);
                }
            }
        }, e.prototype.setTheme = function() {}, e.prototype.getModel = function() {
            return this._model;
        }, e.prototype.getOption = function() {
            return this._model && this._model.getOption();
        }, e.prototype.getWidth = function() {
            return this._zr.getWidth();
        }, e.prototype.getHeight = function() {
            return this._zr.getHeight();
        }, e.prototype.getDevicePixelRatio = function() {
            return this._zr.painter.dpr || ic.hasGlobalWindow && window.devicePixelRatio || 1;
        }, e.prototype.getRenderedCanvas = function(t) {
            return this.renderToCanvas(t);
        }, e.prototype.renderToCanvas = function(t) {
            return t = t || {}, this._zr.painter.getRenderedCanvas({
                backgroundColor: t.backgroundColor || this._model.get("backgroundColor"),
                pixelRatio: t.pixelRatio || this.getDevicePixelRatio()
            });
        }, e.prototype.renderToSVGString = function(t) {
            return t = t || {}, this._zr.painter.renderToString({
                useViewBox: t.useViewBox
            });
        }, e.prototype.getSvgDataURL = function() {
            if (ic.svgSupported) {
                var t = this._zr;
                return f(t.storage.getDisplayList(), function(t) {
                    t.stopAnimation(null, !0);
                }), t.painter.toDataURL();
            }
        }, e.prototype.getDataURL = function(t) {
            if (!this._disposed) {
                var e = (t = t || {}).excludeComponents, n = this._model, i = [], r = this;
                f(e, function(t) {
                    n.eachComponent({
                        mainType: t
                    }, function(t) {
                        var e = r._componentsMap[t.__viewId];
                        e.group.ignore || (i.push(e), e.group.ignore = !0);
                    });
                });
                var o = "svg" === this._zr.painter.getType() ? this.getSvgDataURL() : this.renderToCanvas(t).toDataURL("image/" + (t && t.type || "png"));
                return f(i, function(t) {
                    t.group.ignore = !1;
                }), o;
            }
        }, e.prototype.getConnectedDataURL = function(t) {
            if (!this._disposed) {
                var e = "svg" === t.type, n = this.group, i = Math.min, r = Math.max, o = 1 / 0;
                if (bx[n]) {
                    var s = o, l = o, u = -o, h = -o, c = [], p = t && t.pixelRatio || this.getDevicePixelRatio();
                    f(xx, function(o) {
                        if (o.group === n) {
                            var p = e ? o.getZr().painter.getSvgDom().innerHTML : o.renderToCanvas(a(t)), d = o.getDom().getBoundingClientRect();
                            s = i(d.left, s), l = i(d.top, l), u = r(d.right, u), h = r(d.bottom, h), c.push({
                                dom: p,
                                left: d.left,
                                top: d.top
                            });
                        }
                    });
                    var d = (u *= p) - (s *= p), g = (h *= p) - (l *= p), y = uc.createCanvas(), v = Ye(y, {
                        renderer: e ? "svg" : "canvas"
                    });
                    if (v.resize({
                        width: d,
                        height: g
                    }), e) {
                        var m = "";
                        return f(c, function(t) {
                            var e = t.left - s, n = t.top - l;
                            m += '<g transform="translate(' + e + "," + n + ')">' + t.dom + "</g>";
                        }), v.painter.getSvgRoot().innerHTML = m, t.connectedBackgroundColor && v.painter.setBackgroundColor(t.connectedBackgroundColor), 
                        v.refreshImmediately(), v.painter.toDataURL();
                    }
                    return t.connectedBackgroundColor && v.add(new Kf({
                        shape: {
                            x: 0,
                            y: 0,
                            width: d,
                            height: g
                        },
                        style: {
                            fill: t.connectedBackgroundColor
                        }
                    })), f(c, function(t) {
                        var e = new Yf({
                            style: {
                                x: t.left * p - s,
                                y: t.top * p - l,
                                image: t.dom
                            }
                        });
                        v.add(e);
                    }), v.refreshImmediately(), y.toDataURL("image/" + (t && t.type || "png"));
                }
                return this.getDataURL(t);
            }
        }, e.prototype.convertToPixel = function(t, e) {
            return K_(this, "convertToPixel", t, e);
        }, e.prototype.convertFromPixel = function(t, e) {
            return K_(this, "convertFromPixel", t, e);
        }, e.prototype.containPixel = function(t, e) {
            var n;
            if (!this._disposed) return f(Cn(this._model, t), function(t, i) {
                i.indexOf("Models") >= 0 && f(t, function(t) {
                    var r = t.coordinateSystem;
                    if (r && r.containPoint) n = n || !!r.containPoint(e); else if ("seriesModels" === i) {
                        var o = this._chartsMap[t.__viewId];
                        o && o.containPoint && (n = n || o.containPoint(e, t));
                    }
                }, this);
            }, this), !!n;
        }, e.prototype.getVisual = function(t, e) {
            var n = Cn(this._model, t, {
                defaultMainType: "series"
            }), i = n.seriesModel.getData(), r = n.hasOwnProperty("dataIndexInside") ? n.dataIndexInside : n.hasOwnProperty("dataIndex") ? i.indexOfRawIndex(n.dataIndex) : null;
            return null != r ? function(t, e, n) {
                switch (n) {
                  case "color":
                    return t.getItemVisual(e, "style")[t.getVisual("drawType")];

                  case "opacity":
                    return t.getItemVisual(e, "style").opacity;

                  case "symbol":
                  case "symbolSize":
                  case "liftZ":
                    return t.getItemVisual(e, n);
                }
            }(i, r, e) : function(t, e) {
                switch (e) {
                  case "color":
                    return t.getVisual("style")[t.getVisual("drawType")];

                  case "opacity":
                    return t.getVisual("style").opacity;

                  case "symbol":
                  case "symbolSize":
                  case "liftZ":
                    return t.getVisual(e);
                }
            }(i, e);
        }, e.prototype.getViewOfComponentModel = function(t) {
            return this._componentsMap[t.__viewId];
        }, e.prototype.getViewOfSeriesModel = function(t) {
            return this._chartsMap[t.__viewId];
        }, e.prototype._initEvents = function() {
            var t = this;
            f(px, function(e) {
                var n = function(n) {
                    var i, r = t.getModel(), o = n.target;
                    if ("globalout" === e ? i = {} : o && fs(o, function(t) {
                        var e = ig(t);
                        if (e && null != e.dataIndex) {
                            var n = e.dataModel || r.getSeriesByIndex(e.seriesIndex);
                            return i = n && n.getDataParams(e.dataIndex, e.dataType, o) || {}, !0;
                        }
                        return e.eventData ? (i = l({}, e.eventData), !0) : void 0;
                    }, !0), i) {
                        var a = i.componentType, s = i.componentIndex;
                        ("markLine" === a || "markPoint" === a || "markArea" === a) && (a = "series", s = i.seriesIndex);
                        var u = a && null != s && r.getComponent(a, s), h = u && t["series" === u.mainType ? "_chartsMap" : "_componentsMap"][u.__viewId];
                        i.event = n, i.type = e, t._$eventProcessor.eventInfo = {
                            targetEl: o,
                            packedEvent: i,
                            model: u,
                            view: h
                        }, t.trigger(e, i);
                    }
                };
                n.zrEventfulCallAtLast = !0, t._zr.on(e, n, t);
            }), f(fx, function(e, n) {
                t._messageCenter.on(n, function(t) {
                    this.trigger(n, t);
                }, t);
            }), f([ "selectchanged" ], function(e) {
                t._messageCenter.on(e, function(t) {
                    this.trigger(e, t);
                }, t);
            }), function(t, e, n) {
                t.on("selectchanged", function(t) {
                    var i = n.getModel();
                    t.isFromClick ? (ds("map", "selectchanged", e, i, t), ds("pie", "selectchanged", e, i, t)) : "select" === t.fromAction ? (ds("map", "selected", e, i, t), 
                    ds("pie", "selected", e, i, t)) : "unselect" === t.fromAction && (ds("map", "unselected", e, i, t), 
                    ds("pie", "unselected", e, i, t));
                });
            }(this._messageCenter, this, this._api);
        }, e.prototype.isDisposed = function() {
            return this._disposed;
        }, e.prototype.clear = function() {
            this._disposed || this.setOption({
                series: []
            }, !0);
        }, e.prototype.dispose = function() {
            if (!this._disposed) {
                this._disposed = !0, this.getDom() && Dn(this.getDom(), Tx, "");
                var t = this, e = t._api, n = t._model;
                f(t._componentsViews, function(t) {
                    t.dispose(n, e);
                }), f(t._chartsViews, function(t) {
                    t.dispose(n, e);
                }), t._zr.dispose(), t._dom = t._model = t._chartsMap = t._componentsMap = t._chartsViews = t._componentsViews = t._scheduler = t._api = t._zr = t._throttledZrFlush = t._theme = t._coordSysMgr = t._messageCenter = null, 
                delete xx[t.id];
            }
        }, e.prototype.resize = function(t) {
            if (!this[F_] && !this._disposed) {
                this._zr.resize(t);
                var e = this._model;
                if (this._loadingFX && this._loadingFX.resize(), e) {
                    var n = e.resetOption("media"), i = t && t.silent;
                    this[V_] && (null == i && (i = this[V_].silent), n = !0, this[V_] = null), this[F_] = !0;
                    try {
                        n && Y_(this), Z_.update.call(this, {
                            type: "resize",
                            animation: l({
                                duration: 0
                            }, t && t.animation)
                        });
                    } catch (t) {
                        throw this[F_] = !1, t;
                    }
                    this[F_] = !1, J_.call(this, i), tx.call(this, i);
                }
            }
        }, e.prototype.showLoading = function(t, e) {
            if (!this._disposed && (T(t) && (e = t, t = ""), t = t || "default", this.hideLoading(), 
            _x[t])) {
                var n = _x[t](this._api, e), i = this._zr;
                this._loadingFX = n, i.add(n);
            }
        }, e.prototype.hideLoading = function() {
            this._disposed || (this._loadingFX && this._zr.remove(this._loadingFX), this._loadingFX = null);
        }, e.prototype.makeActionFromEvent = function(t) {
            var e = l({}, t);
            return e.type = fx[t.type], e;
        }, e.prototype.dispatchAction = function(t, e) {
            if (!this._disposed && (T(e) || (e = {
                silent: !!e
            }), dx[t.type] && this._model)) {
                if (this[F_]) return void this._pendingActions.push(t);
                var n = e.silent;
                Q_.call(this, t, n);
                var i = e.flush;
                i ? this._zr.flush() : !1 !== i && ic.browser.weChat && this._throttledZrFlush(), 
                J_.call(this, n), tx.call(this, n);
            }
        }, e.prototype.updateLabelLayout = function() {
            O_.trigger("series:layoutlabels", this._model, this._api, {
                updatedSeries: []
            });
        }, e.prototype.appendData = function(t) {
            if (!this._disposed) {
                var e = t.seriesIndex;
                this.getModel().getSeriesByIndex(e).appendData(t), this._scheduler.unfinished = !0, 
                this.getZr().wakeUp();
            }
        }, e.internalField = function() {
            function t(t) {
                t.clearColorPalette(), t.eachSeries(function(t) {
                    t.clearColorPalette();
                });
            }
            function e(t) {
                for (var e = [], n = t.currentStates, i = 0; i < n.length; i++) {
                    var r = n[i];
                    "emphasis" !== r && "blur" !== r && "select" !== r && e.push(r);
                }
                t.selected && t.states.select && e.push("select"), t.hoverState === cg && t.states.emphasis ? e.push("emphasis") : t.hoverState === hg && t.states.blur && e.push("blur"), 
                t.useStates(e);
            }
            function i(t, e) {
                if (!t.preventAutoZ) {
                    var n = t.get("z") || 0, i = t.get("zlevel") || 0;
                    e.eachRendered(function(t) {
                        return function t(e, n, i, r) {
                            var o = e.getTextContent(), a = e.getTextGuideLine();
                            if (e.isGroup) for (var s = e.childrenRef(), l = 0; l < s.length; l++) r = Math.max(t(s[l], n, i, r), r); else e.z = n, 
                            e.zlevel = i, r = Math.max(e.z2, r);
                            if (o && (o.z = n, o.zlevel = i, isFinite(r) && (o.z2 = r + 2)), a) {
                                var u = e.textGuideLineConfig;
                                a.z = n, a.zlevel = i, isFinite(r) && (a.z2 = r + (u && u.showAbove ? 1 : -1));
                            }
                            return r;
                        }(t, n, i, -1 / 0), !0;
                    });
                }
            }
            function r(t, e) {
                e.eachRendered(function(t) {
                    if (!yr(t)) {
                        var e = t.getTextContent(), n = t.getTextGuideLine();
                        t.stateTransition && (t.stateTransition = null), e && e.stateTransition && (e.stateTransition = null), 
                        n && n.stateTransition && (n.stateTransition = null), t.hasState() ? (t.prevStates = t.currentStates, 
                        t.clearStates()) : t.prevStates && (t.prevStates = null);
                    }
                });
            }
            function o(t, n) {
                var i = t.getModel("stateAnimation"), r = t.isAnimationEnabled(), o = i.get("duration"), a = o > 0 ? {
                    duration: o,
                    delay: i.get("delay"),
                    easing: i.get("easing")
                } : null;
                n.eachRendered(function(t) {
                    if (t.states && t.states.emphasis) {
                        if (yr(t)) return;
                        if (t instanceof Hf && function(t) {
                            var e = sg(t);
                            e.normalFill = t.style.fill, e.normalStroke = t.style.stroke;
                            var n = t.states.select || {};
                            e.selectFill = n.style && n.style.fill || null, e.selectStroke = n.style && n.style.stroke || null;
                        }(t), t.__dirty) {
                            var n = t.prevStates;
                            n && t.useStates(n);
                        }
                        if (r) {
                            t.stateTransition = a;
                            var i = t.getTextContent(), o = t.getTextGuideLine();
                            i && (i.stateTransition = a), o && (o.stateTransition = a);
                        }
                        t.__dirty && e(t);
                    }
                });
            }
            Y_ = function(t) {
                var e = t._scheduler;
                e.restorePipelines(t._model), e.prepareStageTasks(), q_(t, !0), q_(t, !1), e.plan();
            }, q_ = function(t, e) {
                function n(t) {
                    var n = t.__requireNewView;
                    t.__requireNewView = !1;
                    var u = "_ec_" + t.id + "_" + t.type, h = !n && a[u];
                    if (!h) {
                        var c = An(t.type);
                        (h = new (e ? Rm.getClass(c.main, c.sub) : zm.getClass(c.sub))()).init(i, l), a[u] = h, 
                        o.push(h), s.add(h.group);
                    }
                    t.__viewId = h.__id = u, h.__alive = !0, h.__model = t, h.group.__ecComponentInfo = {
                        mainType: t.mainType,
                        index: t.componentIndex
                    }, !e && r.prepareView(h, t, i, l);
                }
                for (var i = t._model, r = t._scheduler, o = e ? t._componentsViews : t._chartsViews, a = e ? t._componentsMap : t._chartsMap, s = t._zr, l = t._api, u = 0; u < o.length; u++) o[u].__alive = !1;
                e ? i.eachComponent(function(t, e) {
                    "series" !== t && n(e);
                }) : i.eachSeries(n);
                for (u = 0; u < o.length; ) {
                    var h = o[u];
                    h.__alive ? u++ : (!e && h.renderTask.dispose(), s.remove(h.group), h.dispose(i, l), 
                    o.splice(u, 1), a[h.__id] === h && delete a[h.__id], h.__id = h.group.__ecComponentInfo = null);
                }
            }, j_ = function(t, e, n, i, r) {
                function o(i) {
                    i && i.__alive && i[e] && i[e](i.__model, a, t._api, n);
                }
                var a = t._model;
                if (a.setUpdatePayload(n), i) {
                    var s = {};
                    s[i + "Id"] = n[i + "Id"], s[i + "Index"] = n[i + "Index"], s[i + "Name"] = n[i + "Name"];
                    var l = {
                        mainType: i,
                        query: s
                    };
                    r && (l.subType = r);
                    var u, h = n.excludeSeriesId;
                    null != h && (u = H(), f(fn(h), function(t) {
                        var e = wn(t, null);
                        null != e && u.set(e, !0);
                    })), a && a.eachComponent(l, function(e) {
                        if (!(u && null != u.get(e.id))) if (er(n)) if (e instanceof Om) n.type !== yg || n.notBlur || e.get([ "emphasis", "disabled" ]) || function(t, e, n) {
                            var i = t.seriesIndex, r = t.getData(e.dataType);
                            if (r) {
                                var o = Mn(r, e);
                                o = (x(o) ? o[0] : o) || 0;
                                var a = r.getItemGraphicEl(o);
                                if (!a) for (var s = r.count(), l = 0; !a && s > l; ) a = r.getItemGraphicEl(l++);
                                if (a) {
                                    var u = ig(a);
                                    Ui(i, u.focus, u.blurScope, n);
                                } else {
                                    var h = t.get([ "emphasis", "focus" ]), c = t.get([ "emphasis", "blurScope" ]);
                                    null != h && Ui(i, h, c, n);
                                }
                            }
                        }(e, n, t._api); else {
                            var i = Yi(e.mainType, e.componentIndex, n.name, t._api), r = i.focusSelf, o = i.dispatchers;
                            n.type === yg && r && !n.notBlur && Xi(e.mainType, e.componentIndex, t._api), o && f(o, function(t) {
                                n.type === yg ? zi(t) : Ni(t);
                            });
                        } else tr(n) && e instanceof Om && (function(t, e) {
                            if (tr(e)) {
                                var n = e.dataType, i = Mn(t.getData(n), e);
                                x(i) || (i = [ i ]), t[e.type === xg ? "toggleSelect" : e.type === mg ? "select" : "unselect"](i, n);
                            }
                        }(e, n, t._api), qi(e), lx(t));
                    }, t), a && a.eachComponent(l, function(e) {
                        u && null != u.get(e.id) || o(t["series" === i ? "_chartsMap" : "_componentsMap"][e.__viewId]);
                    }, t);
                } else f([].concat(t._componentsViews).concat(t._chartsViews), o);
            }, Z_ = {
                prepareAndUpdate: function(t) {
                    Y_(this), Z_.update.call(this, t, {
                        optionChanged: null != t.newOption
                    });
                },
                update: function(e, n) {
                    var i = this._model, r = this._api, o = this._zr, a = this._coordSysMgr, s = this._scheduler;
                    if (i) {
                        i.setUpdatePayload(e), s.restoreData(i, e), s.performSeriesTasks(i), a.create(i, r), 
                        s.performDataProcessorTasks(i, e), $_(this, i), a.update(i, r), t(i), s.performVisualTasks(i, e), 
                        ix(this, i, r, e, n);
                        var l = i.get("backgroundColor") || "transparent", u = i.get("darkMode");
                        o.setBackgroundColor(l), null != u && "auto" !== u && o.setDarkMode(u), O_.trigger("afterupdate", i, r);
                    }
                },
                updateTransform: function(e) {
                    var n = this, i = this._model, r = this._api;
                    if (i) {
                        i.setUpdatePayload(e);
                        var o = [];
                        i.eachComponent(function(t, a) {
                            if ("series" !== t) {
                                var s = n.getViewOfComponentModel(a);
                                if (s && s.__alive) if (s.updateTransform) {
                                    var l = s.updateTransform(a, i, r, e);
                                    l && l.update && o.push(s);
                                } else o.push(s);
                            }
                        });
                        var a = H();
                        i.eachSeries(function(t) {
                            var o = n._chartsMap[t.__viewId];
                            if (o.updateTransform) {
                                var s = o.updateTransform(t, i, r, e);
                                s && s.update && a.set(t.uid, 1);
                            } else a.set(t.uid, 1);
                        }), t(i), this._scheduler.performVisualTasks(i, e, {
                            setDirty: !0,
                            dirtyMap: a
                        }), ox(this, i, r, e, {}, a), O_.trigger("afterupdate", i, r);
                    }
                },
                updateView: function(e) {
                    var n = this._model;
                    n && (n.setUpdatePayload(e), zm.markUpdateMethod(e, "updateView"), t(n), this._scheduler.performVisualTasks(n, e, {
                        setDirty: !0
                    }), ix(this, n, this._api, e, {}), O_.trigger("afterupdate", n, this._api));
                },
                updateVisual: function(e) {
                    var n = this, i = this._model;
                    i && (i.setUpdatePayload(e), i.eachSeries(function(t) {
                        t.getData().clearAllVisual();
                    }), zm.markUpdateMethod(e, "updateVisual"), t(i), this._scheduler.performVisualTasks(i, e, {
                        visualType: "visual",
                        setDirty: !0
                    }), i.eachComponent(function(t, r) {
                        if ("series" !== t) {
                            var o = n.getViewOfComponentModel(r);
                            o && o.__alive && o.updateVisual(r, i, n._api, e);
                        }
                    }), i.eachSeries(function(t) {
                        n._chartsMap[t.__viewId].updateVisual(t, i, n._api, e);
                    }), O_.trigger("afterupdate", i, this._api));
                },
                updateLayout: function(t) {
                    Z_.update.call(this, t);
                }
            }, K_ = function(t, e, n, i) {
                if (!t._disposed) for (var r, o = t._model, a = t._coordSysMgr.getCoordinateSystems(), s = Cn(o, n), l = 0; l < a.length; l++) {
                    var u = a[l];
                    if (u[e] && null != (r = u[e](o, s, i))) return r;
                }
            }, $_ = function(t, e) {
                var n = t._chartsMap, i = t._scheduler;
                e.eachSeries(function(t) {
                    i.updateStreamModes(t, n[t.__viewId]);
                });
            }, Q_ = function(t, e) {
                var n = this, i = this.getModel(), r = t.type, o = t.escapeConnect, a = dx[r], s = a.actionInfo, h = (s.update || "update").split(":"), c = h.pop(), p = null != h[0] && An(h[0]);
                this[F_] = !0;
                var d = [ t ], y = !1;
                t.batch && (y = !0, d = g(t.batch, function(e) {
                    return (e = u(l({}, e), t)).batch = null, e;
                }));
                var v, m = [], _ = tr(t), x = er(t);
                if (x && Gi(this._api), f(d, function(e) {
                    if ((v = (v = a.action(e, n._model, n._api)) || l({}, e)).type = s.event || v.type, 
                    m.push(v), x) {
                        var i = In(t), r = i.queryOptionMap, o = i.mainTypeSpecified ? r.keys()[0] : "series";
                        j_(n, c, e, o), lx(n);
                    } else _ ? (j_(n, c, e, "series"), lx(n)) : p && j_(n, c, e, p.main, p.sub);
                }), "none" !== c && !x && !_ && !p) try {
                    this[V_] ? (Y_(this), Z_.update.call(this, t), this[V_] = null) : Z_[c].call(this, t);
                } catch (t) {
                    throw this[F_] = !1, t;
                }
                if (v = y ? {
                    type: s.event || r,
                    escapeConnect: o,
                    batch: m
                } : m[0], this[F_] = !1, !e) {
                    var w = this._messageCenter;
                    if (w.trigger(v.type, v), _) {
                        var b = {
                            type: "selectchanged",
                            escapeConnect: o,
                            selected: ji(i),
                            isFromClick: t.isFromClick || !1,
                            fromAction: t.type,
                            fromActionPayload: t
                        };
                        w.trigger(b.type, b);
                    }
                }
            }, J_ = function(t) {
                for (var e = this._pendingActions; e.length; ) {
                    var n = e.shift();
                    Q_.call(this, n, t);
                }
            }, tx = function(t) {
                !t && this.trigger("updated");
            }, ex = function(t, e) {
                t.on("rendered", function(n) {
                    e.trigger("rendered", n), !t.animation.isFinished() || e[V_] || e._scheduler.unfinished || e._pendingActions.length || e.trigger("finished");
                });
            }, nx = function(t, e) {
                t.on("mouseover", function(t) {
                    var n = fs(t.target, Ji);
                    n && (function(t, e, n) {
                        var i = ig(t), r = Yi(i.componentMainType, i.componentIndex, i.componentHighDownName, n), o = r.dispatchers, a = r.focusSelf;
                        o ? (a && Xi(i.componentMainType, i.componentIndex, n), f(o, function(t) {
                            return Bi(t, e);
                        })) : (Ui(i.seriesIndex, i.focus, i.blurScope, n), "self" === i.focus && Xi(i.componentMainType, i.componentIndex, n), 
                        Bi(t, e));
                    }(n, t, e._api), lx(e));
                }).on("mouseout", function(t) {
                    var n = fs(t.target, Ji);
                    n && (function(t, e, n) {
                        Gi(n);
                        var i = ig(t), r = Yi(i.componentMainType, i.componentIndex, i.componentHighDownName, n).dispatchers;
                        r ? f(r, function(t) {
                            return Ei(t, e);
                        }) : Ei(t, e);
                    }(n, t, e._api), lx(e));
                }).on("click", function(t) {
                    var n = fs(t.target, function(t) {
                        return null != ig(t).dataIndex;
                    }, !0);
                    if (n) {
                        var i = n.selected ? "unselect" : "select", r = ig(n);
                        e._api.dispatchAction({
                            type: i,
                            dataType: r.dataType,
                            dataIndexInside: r.dataIndex,
                            seriesIndex: r.seriesIndex,
                            isFromClick: !0
                        });
                    }
                });
            }, ix = function(t, e, n, i, r) {
                (function(t) {
                    var e = [], n = [], i = !1;
                    if (t.eachComponent(function(t, r) {
                        var o = r.get("zlevel") || 0, a = r.get("z") || 0, s = r.getZLevelKey();
                        i = i || !!s, ("series" === t ? n : e).push({
                            zlevel: o,
                            z: a,
                            idx: r.componentIndex,
                            type: t,
                            key: s
                        });
                    }), i) {
                        var r, o, a = e.concat(n);
                        Rt(a, function(t, e) {
                            return t.zlevel === e.zlevel ? t.z - e.z : t.zlevel - e.zlevel;
                        }), f(a, function(e) {
                            var n = t.getComponent(e.type, e.idx), i = e.zlevel, a = e.key;
                            null != r && (i = Math.max(r, i)), a ? (i === r && a !== o && i++, o = a) : o && (i === r && i++, 
                            o = ""), r = i, n.setZLevel(i);
                        });
                    }
                })(e), rx(t, e, n, i, r), f(t._chartsViews, function(t) {
                    t.__alive = !1;
                }), ox(t, e, n, i, r), f(t._chartsViews, function(t) {
                    t.__alive || t.remove(e, n);
                });
            }, rx = function(t, e, n, a, s, l) {
                f(l || t._componentsViews, function(t) {
                    var s = t.__model;
                    r(0, t), t.render(s, e, n, a), i(s, t), o(s, t);
                });
            }, ox = function(t, e, n, a, s, u) {
                var h = t._scheduler;
                s = l(s || {}, {
                    updatedSeries: e.getSeries()
                }), O_.trigger("series:beforeupdate", e, n, s);
                var c = !1;
                e.eachSeries(function(e) {
                    var n = t._chartsMap[e.__viewId];
                    n.__alive = !0;
                    var i = n.renderTask;
                    h.updatePayload(i, a), r(0, n), u && u.get(e.uid) && i.dirty(), i.perform(h.getPerformArgs(i)) && (c = !0), 
                    n.group.silent = !!e.get("silent"), function(t, e) {
                        var n = t.get("blendMode") || null;
                        e.eachRendered(function(t) {
                            t.isGroup || (t.style.blend = n);
                        });
                    }(e, n), qi(e);
                }), h.unfinished = c || h.unfinished, O_.trigger("series:layoutlabels", e, n, s), 
                O_.trigger("series:transition", e, n, s), e.eachSeries(function(e) {
                    var n = t._chartsMap[e.__viewId];
                    i(e, n), o(e, n);
                }), function(t, e) {
                    var n = t._zr.storage, i = 0;
                    n.traverse(function(t) {
                        t.isGroup || i++;
                    }), i > e.get("hoverLayerThreshold") && !ic.node && !ic.worker && e.eachSeries(function(e) {
                        if (!e.preventUsingHoverLayer) {
                            var n = t._chartsMap[e.__viewId];
                            n.__alive && n.eachRendered(function(t) {
                                t.states.emphasis && (t.states.emphasis.hoverLayer = !0);
                            });
                        }
                    });
                }(t, e), O_.trigger("series:afterupdate", e, n, s);
            }, lx = function(t) {
                t[H_] = !0, t.getZr().wakeUp();
            }, ux = function(t) {
                t[H_] && (t.getZr().storage.traverse(function(t) {
                    yr(t) || e(t);
                }), t[H_] = !1);
            }, ax = function(t) {
                return new (function(e) {
                    function i() {
                        return null !== e && e.apply(this, arguments) || this;
                    }
                    return n(i, e), i.prototype.getCoordinateSystems = function() {
                        return t._coordSysMgr.getCoordinateSystems();
                    }, i.prototype.getComponentByElement = function(e) {
                        for (;e; ) {
                            var n = e.__ecComponentInfo;
                            if (null != n) return t._model.getComponent(n.mainType, n.index);
                            e = e.parent;
                        }
                    }, i.prototype.enterEmphasis = function(e, n) {
                        zi(e, n), lx(t);
                    }, i.prototype.leaveEmphasis = function(e, n) {
                        Ni(e, n), lx(t);
                    }, i.prototype.enterBlur = function(e) {
                        (function(t) {
                            Li(t, Ii);
                        })(e), lx(t);
                    }, i.prototype.leaveBlur = function(e) {
                        Fi(e), lx(t);
                    }, i.prototype.enterSelect = function(e) {
                        Vi(e), lx(t);
                    }, i.prototype.leaveSelect = function(e) {
                        Hi(e), lx(t);
                    }, i.prototype.getModel = function() {
                        return t.getModel();
                    }, i.prototype.getViewOfComponentModel = function(e) {
                        return t.getViewOfComponentModel(e);
                    }, i.prototype.getViewOfSeriesModel = function(e) {
                        return t.getViewOfSeriesModel(e);
                    }, i;
                }(qv))(t);
            }, sx = function(t) {
                function e(t, e) {
                    for (var n = 0; n < t.length; n++) {
                        t[n][G_] = e;
                    }
                }
                f(fx, function(n, i) {
                    t._messageCenter.on(i, function(n) {
                        if (bx[t.group] && 0 !== t[G_]) {
                            if (n && n.escapeConnect) return;
                            var i = t.makeActionFromEvent(n), r = [];
                            f(xx, function(e) {
                                e !== t && e.group === t.group && r.push(e);
                            }), e(r, 0), f(r, function(t) {
                                1 !== t[G_] && t.dispatchAction(i);
                            }), e(r, 2);
                        }
                    });
                });
            };
        }(), e;
    }(zc), cx = hx.prototype;
    cx.on = Hs("on"), cx.off = Hs("off"), cx.one = function(t, e, n) {
        var i = this;
        this.on.call(this, t, function n() {
            for (var r = [], o = 0; o < arguments.length; o++) r[o] = arguments[o];
            e && e.apply && e.apply(this, r), i.off(t, n);
        }, n);
    };
    var px = [ "click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "globalout", "contextmenu" ], dx = {}, fx = {}, gx = [], yx = [], vx = [], mx = {}, _x = {}, xx = {}, bx = {}, Sx = +new Date() - 0, Mx = +new Date() - 0, Tx = "_echarts_instance_", Cx = Us, Ix = [], kx = function(t) {
        var e = (t = a(t)).type;
        e || pn("");
        var n = e.split(":");
        2 !== n.length && pn("");
        var i = !1;
        "echarts" === n[0] && (e = n[1], i = !0), t.__isBuiltIn = i, _m.set(e, t);
    };
    el(2e3, Ym), el(4500, jm), el(4500, Zm), el(2e3, c_), el(4500, p_), el(7e3, function(t, e) {
        t.eachRawSeries(function(n) {
            if (!t.isSeriesFiltered(n)) {
                var i = n.getData();
                i.hasItemVisual() && i.each(function(t) {
                    var n = i.getItemVisual(t, "decal");
                    n && (i.ensureUniqueItemVisual(t, "style").decal = Bs(n, e));
                });
                var r = i.getVisual("decal");
                if (r) i.getVisual("style").decal = Bs(r, e);
            }
        });
    }), qs($o), js(900, function(t) {
        var e = H();
        t.eachSeries(function(t) {
            var n = t.get("stack");
            if (n) {
                var i = e.get(n) || e.set(n, []), r = t.getData(), o = {
                    stackResultDimension: r.getCalculationInfo("stackResultDimension"),
                    stackedOverDimension: r.getCalculationInfo("stackedOverDimension"),
                    stackedDimension: r.getCalculationInfo("stackedDimension"),
                    stackedByDimension: r.getCalculationInfo("stackedByDimension"),
                    isStackedByIndex: r.getCalculationInfo("isStackedByIndex"),
                    data: r,
                    seriesModel: t
                };
                if (!o.stackedDimension || !o.isStackedByIndex && !o.stackedByDimension) return;
                i.length && r.setCalculationInfo("stackedOnSeries", i[i.length - 1].seriesModel), 
                i.push(o);
            }
        }), e.each(Qo);
    }), il("default", function(t, e) {
        u(e = e || {}, {
            text: "loading",
            textColor: "#000",
            fontSize: 12,
            fontWeight: "normal",
            fontStyle: "normal",
            fontFamily: "sans-serif",
            maskColor: "rgba(255, 255, 255, 0.8)",
            showSpinner: !0,
            color: "#5470c6",
            spinnerRadius: 10,
            lineWidth: 5,
            zlevel: 0
        });
        var n = new Md(), i = new Kf({
            style: {
                fill: e.maskColor
            },
            zlevel: e.zlevel,
            z: 1e4
        });
        n.add(i);
        var r, o = new Jf({
            style: {
                text: e.text,
                fill: e.textColor,
                fontSize: e.fontSize,
                fontWeight: e.fontWeight,
                fontStyle: e.fontStyle,
                fontFamily: e.fontFamily
            },
            zlevel: e.zlevel,
            z: 10001
        }), a = new Kf({
            style: {
                fill: "none"
            },
            textContent: o,
            textConfig: {
                position: "right",
                distance: 10
            },
            zlevel: e.zlevel,
            z: 10001
        });
        return n.add(a), e.showSpinner && ((r = new cy({
            shape: {
                startAngle: -Km / 2,
                endAngle: -Km / 2 + .1,
                r: e.spinnerRadius
            },
            style: {
                stroke: e.color,
                lineCap: "round",
                lineWidth: e.lineWidth
            },
            zlevel: e.zlevel,
            z: 10001
        })).animateShape(!0).when(1e3, {
            endAngle: 3 * Km / 2
        }).start("circularInOut"), r.animateShape(!0).when(1e3, {
            startAngle: 3 * Km / 2
        }).delay(300).start("circularInOut"), n.add(r)), n.resize = function() {
            var n = o.getBoundingRect().width, s = e.showSpinner ? e.spinnerRadius : 0, l = (t.getWidth() - 2 * s - (e.showSpinner && n ? 10 : 0) - n) / 2 - (e.showSpinner && n ? 0 : 5 + n / 2) + (e.showSpinner ? 0 : n / 2) + (n ? 0 : s), u = t.getHeight() / 2;
            e.showSpinner && r.setShape({
                cx: l,
                cy: u
            }), a.setShape({
                x: l - s,
                y: u - s,
                width: 2 * s,
                height: 2 * s
            }), i.setShape({
                x: 0,
                y: 0,
                width: t.getWidth(),
                height: t.getHeight()
            });
        }, n.resize(), n;
    }), Qs({
        type: yg,
        event: yg,
        update: yg
    }, Y), Qs({
        type: vg,
        event: vg,
        update: vg
    }, Y), Qs({
        type: mg,
        event: mg,
        update: mg
    }, Y), Qs({
        type: _g,
        event: _g,
        update: _g
    }, Y), Qs({
        type: xg,
        event: xg,
        update: xg
    }, Y), Ys("light", n_), Ys("dark", s_);
    var Dx, Ax, Px, Lx, Ox, Rx, Bx, Ex = function() {
        function t(t, e, n, i, r, o) {
            this._old = t, this._new = e, this._oldKeyGetter = n || al, this._newKeyGetter = i || al, 
            this.context = r, this._diffModeMultiple = "multiple" === o;
        }
        return t.prototype.add = function(t) {
            return this._add = t, this;
        }, t.prototype.update = function(t) {
            return this._update = t, this;
        }, t.prototype.updateManyToOne = function(t) {
            return this._updateManyToOne = t, this;
        }, t.prototype.updateOneToMany = function(t) {
            return this._updateOneToMany = t, this;
        }, t.prototype.updateManyToMany = function(t) {
            return this._updateManyToMany = t, this;
        }, t.prototype.remove = function(t) {
            return this._remove = t, this;
        }, t.prototype.execute = function() {
            this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
        }, t.prototype._executeOneToOne = function() {
            var t = this._old, e = this._new, n = {}, i = new Array(t.length), r = new Array(e.length);
            this._initIndexMap(t, null, i, "_oldKeyGetter"), this._initIndexMap(e, n, r, "_newKeyGetter");
            for (var o = 0; o < t.length; o++) {
                var a = i[o], s = n[a], l = ol(s);
                if (l > 1) {
                    var u = s.shift();
                    1 === s.length && (n[a] = s[0]), this._update && this._update(u, o);
                } else 1 === l ? (n[a] = null, this._update && this._update(s, o)) : this._remove && this._remove(o);
            }
            this._performRestAdd(r, n);
        }, t.prototype._executeMultiple = function() {
            var t = this._old, e = this._new, n = {}, i = {}, r = [], o = [];
            this._initIndexMap(t, n, r, "_oldKeyGetter"), this._initIndexMap(e, i, o, "_newKeyGetter");
            for (var a = 0; a < r.length; a++) {
                var s = r[a], l = n[s], u = i[s], h = ol(l), c = ol(u);
                if (h > 1 && 1 === c) this._updateManyToOne && this._updateManyToOne(u, l), i[s] = null; else if (1 === h && c > 1) this._updateOneToMany && this._updateOneToMany(u, l), 
                i[s] = null; else if (1 === h && 1 === c) this._update && this._update(u, l), i[s] = null; else if (h > 1 && c > 1) this._updateManyToMany && this._updateManyToMany(u, l), 
                i[s] = null; else if (h > 1) for (var p = 0; h > p; p++) this._remove && this._remove(l[p]); else this._remove && this._remove(l);
            }
            this._performRestAdd(o, i);
        }, t.prototype._performRestAdd = function(t, e) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n], r = e[i], o = ol(r);
                if (o > 1) for (var a = 0; o > a; a++) this._add && this._add(r[a]); else 1 === o && this._add && this._add(r);
                e[i] = null;
            }
        }, t.prototype._initIndexMap = function(t, e, n, i) {
            for (var r = this._diffModeMultiple, o = 0; o < t.length; o++) {
                var a = "_ec_" + this[i](t[o], o);
                if (r || (n[o] = a), e) {
                    var s = e[a], l = ol(s);
                    0 === l ? (e[a] = o, r && n.push(a)) : 1 === l ? e[a] = [ s, o ] : s.push(o);
                }
            }
        }, t;
    }(), zx = function() {
        function t(t, e) {
            this._encode = t, this._schema = e;
        }
        return t.prototype.get = function() {
            return {
                fullDimensions: this._getFullDimensionNames(),
                encode: this._encode
            };
        }, t.prototype._getFullDimensionNames = function() {
            return this._cachedDimNames || (this._cachedDimNames = this._schema ? this._schema.makeOutputDimensionNames() : []), 
            this._cachedDimNames;
        }, t;
    }(), Nx = function(t) {
        this.otherDims = {}, null != t && l(this, t);
    }, Fx = Tn(), Vx = {
        float: "f",
        int: "i",
        ordinal: "o",
        number: "n",
        time: "t"
    }, Hx = function() {
        function t(t) {
            this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, 
            this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
        }
        return t.prototype.isDimensionOmitted = function() {
            return this._dimOmitted;
        }, t.prototype._updateDimOmitted = function(t) {
            this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = hl(this.source)));
        }, t.prototype.getSourceDimensionIndex = function(t) {
            return O(this._dimNameMap.get(t), -1);
        }, t.prototype.getSourceDimension = function(t) {
            var e = this.source.dimensionsDefine;
            return e ? e[t] : void 0;
        }, t.prototype.makeStoreSchema = function() {
            for (var t = this._fullDimCount, e = aa(this.source), n = !cl(t), i = "", r = [], o = 0, a = 0; t > o; o++) {
                var s = void 0, l = void 0, u = void 0, h = this.dimensions[a];
                if (h && h.storeDimIndex === o) s = e ? h.name : null, l = h.type, u = h.ordinalMeta, 
                a++; else {
                    var c = this.getSourceDimension(o);
                    c && (s = e ? c.name : null, l = c.type);
                }
                r.push({
                    property: s,
                    type: l,
                    ordinalMeta: u
                }), !e || null == s || h && h.isCalculationCoord || (i += n ? s.replace(/\`/g, "`1").replace(/\$/g, "`2") : s), 
                i += "$", i += Vx[l] || "f", u && (i += u.uid), i += "$";
            }
            var p = this.source;
            return {
                dimensions: r,
                hash: [ p.seriesLayoutBy, p.startIndex, i ].join("$$")
            };
        }, t.prototype.makeOutputDimensionNames = function() {
            for (var t = [], e = 0, n = 0; e < this._fullDimCount; e++) {
                var i = void 0, r = this.dimensions[n];
                if (r && r.storeDimIndex === e) r.isCalculationCoord || (i = r.name), n++; else {
                    var o = this.getSourceDimension(e);
                    o && (i = o.name);
                }
                t.push(i);
            }
            return t;
        }, t.prototype.appendCalculationDimension = function(t) {
            this.dimensions.push(t), t.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
        }, t;
    }(), Wx = T, Gx = g, Ux = "undefined" == typeof Int32Array ? Array : Int32Array, Xx = [ "hasItemOption", "_nameList", "_idList", "_invertedIndicesMap", "_dimSummary", "userOutput", "_rawData", "_dimValueGetter", "_nameDimIdx", "_idDimIdx", "_nameRepeatCount" ], Yx = [ "_approximateExtent" ], qx = function() {
        function t(t, e) {
            this.type = "list", this._dimOmitted = !1, this._nameList = [], this._idList = [], 
            this._visual = {}, this._layout = {}, this._itemVisuals = [], this._itemLayouts = [], 
            this._graphicEls = [], this._approximateExtent = {}, this._calculationInfo = {}, 
            this.hasItemOption = !1, this.TRANSFERABLE_METHODS = [ "cloneShallow", "downSample", "lttbDownSample", "map" ], 
            this.CHANGABLE_METHODS = [ "filterSelf", "selectRange" ], this.DOWNSAMPLE_METHODS = [ "downSample", "lttbDownSample" ];
            var n, i = !1;
            ll(t) ? (n = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : (i = !0, 
            n = t), n = n || [ "x", "y" ];
            for (var r = {}, o = [], a = {}, s = !1, l = {}, u = 0; u < n.length; u++) {
                var h = n[u], c = b(h) ? new Nx({
                    name: h
                }) : h instanceof Nx ? h : new Nx(h), p = c.name;
                c.type = c.type || "float", c.coordDim || (c.coordDim = p, c.coordDimIndex = 0);
                var d = c.otherDims = c.otherDims || {};
                o.push(p), r[p] = c, null != l[p] && (s = !0), c.createInvertedIndices && (a[p] = []), 
                0 === d.itemName && (this._nameDimIdx = u), 0 === d.itemId && (this._idDimIdx = u), 
                i && (c.storeDimIndex = u);
            }
            if (this.dimensions = o, this._dimInfos = r, this._initGetDimensionInfo(s), this.hostModel = e, 
            this._invertedIndicesMap = a, this._dimOmitted) {
                var g = this._dimIdxToName = H();
                f(o, function(t) {
                    g.set(r[t].storeDimIndex, t);
                });
            }
        }
        return t.prototype.getDimension = function(t) {
            var e = this._recognizeDimIndex(t);
            if (null == e) return t;
            if (e = t, !this._dimOmitted) return this.dimensions[e];
            var n = this._dimIdxToName.get(e);
            if (null != n) return n;
            var i = this._schema.getSourceDimension(e);
            return i ? i.name : void 0;
        }, t.prototype.getDimensionIndex = function(t) {
            var e = this._recognizeDimIndex(t);
            if (null != e) return e;
            if (null == t) return -1;
            var n = this._getDimInfo(t);
            return n ? n.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(t) : -1;
        }, t.prototype._recognizeDimIndex = function(t) {
            return M(t) || null != t && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0) ? +t : void 0;
        }, t.prototype._getStoreDimIndex = function(t) {
            return this.getDimensionIndex(t);
        }, t.prototype.getDimensionInfo = function(t) {
            return this._getDimInfo(this.getDimension(t));
        }, t.prototype._initGetDimensionInfo = function(t) {
            var e = this._dimInfos;
            this._getDimInfo = t ? function(t) {
                return e.hasOwnProperty(t) ? e[t] : void 0;
            } : function(t) {
                return e[t];
            };
        }, t.prototype.getDimensionsOnCoord = function() {
            return this._dimSummary.dataDimsOnCoord.slice();
        }, t.prototype.mapDimension = function(t, e) {
            var n = this._dimSummary;
            if (null == e) return n.encodeFirstDimNotExtra[t];
            var i = n.encode[t];
            return i ? i[e] : null;
        }, t.prototype.mapDimensionsAll = function(t) {
            return (this._dimSummary.encode[t] || []).slice();
        }, t.prototype.getStore = function() {
            return this._store;
        }, t.prototype.initData = function(t, e, n) {
            var i, r = this;
            if (t instanceof Cm && (i = t), !i) {
                var o = this.dimensions, a = Jo(t) || d(t) ? new om(t, o.length) : t;
                i = new Cm();
                var s = Gx(o, function(t) {
                    return {
                        type: r._dimInfos[t].type,
                        property: t
                    };
                });
                i.initData(a, s, n);
            }
            this._store = i, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, 
            this._doInit(0, i.count()), this._dimSummary = function(t, e) {
                var n = {}, i = n.encode = {}, r = H(), o = [], a = [], s = {};
                f(t.dimensions, function(e) {
                    var n = t.getDimensionInfo(e), l = n.coordDim;
                    if (l) {
                        var u = n.coordDimIndex;
                        sl(i, l)[u] = e, n.isExtraCoord || (r.set(l, 1), function(t) {
                            return !("ordinal" === t || "time" === t);
                        }(n.type) && (o[0] = e), sl(s, l)[u] = t.getDimensionIndex(n.name)), n.defaultTooltip && a.push(e);
                    }
                    Mv.each(function(t, e) {
                        var r = sl(i, e), o = n.otherDims[e];
                        null != o && !1 !== o && (r[o] = n.name);
                    });
                });
                var l = [], u = {};
                r.each(function(t, e) {
                    var n = i[e];
                    u[e] = n[0], l = l.concat(n);
                }), n.dataDimsOnCoord = l, n.dataDimIndicesOnCoord = g(l, function(e) {
                    return t.getDimensionInfo(e).storeDimIndex;
                }), n.encodeFirstDimNotExtra = u;
                var h = i.label;
                h && h.length && (o = h.slice());
                var c = i.tooltip;
                return c && c.length ? a = c.slice() : a.length || (a = o.slice()), i.defaultedLabel = o, 
                i.defaultedTooltip = a, n.userOutput = new zx(s, e), n;
            }(this, this._schema), this.userOutput = this._dimSummary.userOutput;
        }, t.prototype.appendData = function(t) {
            var e = this._store.appendData(t);
            this._doInit(e[0], e[1]);
        }, t.prototype.appendValues = function(t, e) {
            var n = this._store.appendValues(t, e.length), i = n.start, r = n.end, o = this._shouldMakeIdFromName();
            if (this._updateOrdinalMeta(), e) for (var a = i; r > a; a++) {
                var s = a - i;
                this._nameList[a] = e[s], o && Bx(this, a);
            }
        }, t.prototype._updateOrdinalMeta = function() {
            for (var t = this._store, e = this.dimensions, n = 0; n < e.length; n++) {
                var i = this._dimInfos[e[n]];
                i.ordinalMeta && t.collectOrdinalMeta(i.storeDimIndex, i.ordinalMeta);
            }
        }, t.prototype._shouldMakeIdFromName = function() {
            var t = this._store.getProvider();
            return null == this._idDimIdx && t.getSource().sourceFormat !== Dv && !t.fillStorage;
        }, t.prototype._doInit = function(t, e) {
            if (!(t >= e)) {
                var n = this._store.getProvider();
                this._updateOrdinalMeta();
                var i = this._nameList, r = this._idList;
                if (n.getSource().sourceFormat === Tv && !n.pure) for (var o = [], a = t; e > a; a++) {
                    var s = n.getItem(a, o);
                    if (!this.hasItemOption && vn(s) && (this.hasItemOption = !0), s) {
                        var l = s.name;
                        null == i[a] && null != l && (i[a] = wn(l, null));
                        var u = s.id;
                        null == r[a] && null != u && (r[a] = wn(u, null));
                    }
                }
                if (this._shouldMakeIdFromName()) for (a = t; e > a; a++) Bx(this, a);
                Dx(this);
            }
        }, t.prototype.getApproximateExtent = function(t) {
            return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
        }, t.prototype.setApproximateExtent = function(t, e) {
            e = this.getDimension(e), this._approximateExtent[e] = t.slice();
        }, t.prototype.getCalculationInfo = function(t) {
            return this._calculationInfo[t];
        }, t.prototype.setCalculationInfo = function(t, e) {
            Wx(t) ? l(this._calculationInfo, t) : this._calculationInfo[t] = e;
        }, t.prototype.getName = function(t) {
            var e = this.getRawIndex(t), n = this._nameList[e];
            return null == n && null != this._nameDimIdx && (n = Px(this, this._nameDimIdx, e)), 
            null == n && (n = ""), n;
        }, t.prototype._getCategory = function(t, e) {
            var n = this._store.get(t, e), i = this._store.getOrdinalMeta(t);
            return i ? i.categories[n] : n;
        }, t.prototype.getId = function(t) {
            return Ax(this, this.getRawIndex(t));
        }, t.prototype.count = function() {
            return this._store.count();
        }, t.prototype.get = function(t, e) {
            var n = this._store, i = this._dimInfos[t];
            return i ? n.get(i.storeDimIndex, e) : void 0;
        }, t.prototype.getByRawIndex = function(t, e) {
            var n = this._store, i = this._dimInfos[t];
            return i ? n.getByRawIndex(i.storeDimIndex, e) : void 0;
        }, t.prototype.getIndices = function() {
            return this._store.getIndices();
        }, t.prototype.getDataExtent = function(t) {
            return this._store.getDataExtent(this._getStoreDimIndex(t));
        }, t.prototype.getSum = function(t) {
            return this._store.getSum(this._getStoreDimIndex(t));
        }, t.prototype.getMedian = function(t) {
            return this._store.getMedian(this._getStoreDimIndex(t));
        }, t.prototype.getValues = function(t, e) {
            var n = this, i = this._store;
            return x(t) ? i.getValues(Gx(t, function(t) {
                return n._getStoreDimIndex(t);
            }), e) : i.getValues(t);
        }, t.prototype.hasValue = function(t) {
            for (var e = this._dimSummary.dataDimIndicesOnCoord, n = 0, i = e.length; i > n; n++) if (isNaN(this._store.get(e[n], t))) return !1;
            return !0;
        }, t.prototype.indexOfName = function(t) {
            for (var e = 0, n = this._store.count(); n > e; e++) if (this.getName(e) === t) return e;
            return -1;
        }, t.prototype.getRawIndex = function(t) {
            return this._store.getRawIndex(t);
        }, t.prototype.indexOfRawIndex = function(t) {
            return this._store.indexOfRawIndex(t);
        }, t.prototype.rawIndexOf = function(t, e) {
            var n = (t && this._invertedIndicesMap[t])[e];
            return null == n || isNaN(n) ? -1 : n;
        }, t.prototype.indicesOfNearest = function(t, e, n) {
            return this._store.indicesOfNearest(this._getStoreDimIndex(t), e, n);
        }, t.prototype.each = function(t, e, n) {
            w(t) && (n = e, e = t, t = []);
            var i = n || this, r = Gx(Lx(t), this._getStoreDimIndex, this);
            this._store.each(r, i ? Sc(e, i) : e);
        }, t.prototype.filterSelf = function(t, e, n) {
            w(t) && (n = e, e = t, t = []);
            var i = n || this, r = Gx(Lx(t), this._getStoreDimIndex, this);
            return this._store = this._store.filter(r, i ? Sc(e, i) : e), this;
        }, t.prototype.selectRange = function(t) {
            var e = this, n = {}, i = m(t), r = [];
            return f(i, function(i) {
                var o = e._getStoreDimIndex(i);
                n[o] = t[i], r.push(o);
            }), this._store = this._store.selectRange(n), this;
        }, t.prototype.mapArray = function(t, e, n) {
            w(t) && (n = e, e = t, t = []), n = n || this;
            var i = [];
            return this.each(t, function() {
                i.push(e && e.apply(this, arguments));
            }, n), i;
        }, t.prototype.map = function(t, e, n, i) {
            var r = n || i || this, o = Gx(Lx(t), this._getStoreDimIndex, this), a = Rx(this);
            return a._store = this._store.map(o, r ? Sc(e, r) : e), a;
        }, t.prototype.modify = function(t, e, n, i) {
            var r = n || i || this, o = Gx(Lx(t), this._getStoreDimIndex, this);
            this._store.modify(o, r ? Sc(e, r) : e);
        }, t.prototype.downSample = function(t, e, n, i) {
            var r = Rx(this);
            return r._store = this._store.downSample(this._getStoreDimIndex(t), e, n, i), r;
        }, t.prototype.lttbDownSample = function(t, e) {
            var n = Rx(this);
            return n._store = this._store.lttbDownSample(this._getStoreDimIndex(t), e), n;
        }, t.prototype.getRawDataItem = function(t) {
            return this._store.getRawDataItem(t);
        }, t.prototype.getItemModel = function(t) {
            var e = this.hostModel, n = this.getRawDataItem(t);
            return new Yy(n, e, e && e.ecModel);
        }, t.prototype.diff = function(t) {
            var e = this;
            return new Ex(t ? t.getStore().getIndices() : [], this.getStore().getIndices(), function(e) {
                return Ax(t, e);
            }, function(t) {
                return Ax(e, t);
            });
        }, t.prototype.getVisual = function(t) {
            var e = this._visual;
            return e && e[t];
        }, t.prototype.setVisual = function(t, e) {
            this._visual = this._visual || {}, Wx(t) ? l(this._visual, t) : this._visual[t] = e;
        }, t.prototype.getItemVisual = function(t, e) {
            var n = this._itemVisuals[t], i = n && n[e];
            return null == i ? this.getVisual(e) : i;
        }, t.prototype.hasItemVisual = function() {
            return this._itemVisuals.length > 0;
        }, t.prototype.ensureUniqueItemVisual = function(t, e) {
            var n = this._itemVisuals, i = n[t];
            i || (i = n[t] = {});
            var r = i[e];
            return null == r && (x(r = this.getVisual(e)) ? r = r.slice() : Wx(r) && (r = l({}, r)), 
            i[e] = r), r;
        }, t.prototype.setItemVisual = function(t, e, n) {
            var i = this._itemVisuals[t] || {};
            this._itemVisuals[t] = i, Wx(e) ? l(i, e) : i[e] = n;
        }, t.prototype.clearAllVisual = function() {
            this._visual = {}, this._itemVisuals = [];
        }, t.prototype.setLayout = function(t, e) {
            Wx(t) ? l(this._layout, t) : this._layout[t] = e;
        }, t.prototype.getLayout = function(t) {
            return this._layout[t];
        }, t.prototype.getItemLayout = function(t) {
            return this._itemLayouts[t];
        }, t.prototype.setItemLayout = function(t, e, n) {
            this._itemLayouts[t] = n ? l(this._itemLayouts[t] || {}, e) : e;
        }, t.prototype.clearItemLayouts = function() {
            this._itemLayouts.length = 0;
        }, t.prototype.setItemGraphicEl = function(t, e) {
            var n = this.hostModel && this.hostModel.seriesIndex;
            rg(n, this.dataType, t, e), this._graphicEls[t] = e;
        }, t.prototype.getItemGraphicEl = function(t) {
            return this._graphicEls[t];
        }, t.prototype.eachItemGraphicEl = function(t, e) {
            f(this._graphicEls, function(n, i) {
                n && t && t.call(e, n, i);
            });
        }, t.prototype.cloneShallow = function(e) {
            return e || (e = new t(this._schema ? this._schema : Gx(this.dimensions, this._getDimInfo, this), this.hostModel)), 
            Ox(e, this), e._store = this._store, e;
        }, t.prototype.wrapMethod = function(t, e) {
            var n = this[t];
            w(n) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), 
            this[t] = function() {
                var t = n.apply(this, arguments);
                return e.apply(this, [ t ].concat(B(arguments)));
            });
        }, t.internalField = (Dx = function(t) {
            var e = t._invertedIndicesMap;
            f(e, function(n, i) {
                var r = t._dimInfos[i], o = r.ordinalMeta, a = t._store;
                if (o) {
                    n = e[i] = new Ux(o.categories.length);
                    for (var s = 0; s < n.length; s++) n[s] = -1;
                    for (s = 0; s < a.count(); s++) n[a.get(r.storeDimIndex, s)] = s;
                }
            });
        }, Px = function(t, e, n) {
            return wn(t._getCategory(e, n), null);
        }, Ax = function(t, e) {
            var n = t._idList[e];
            return null == n && null != t._idDimIdx && (n = Px(t, t._idDimIdx, e)), null == n && (n = "e\0\0" + e), 
            n;
        }, Lx = function(t) {
            return x(t) || (t = null != t ? [ t ] : []), t;
        }, Rx = function(e) {
            var n = new t(e._schema ? e._schema : Gx(e.dimensions, e._getDimInfo, e), e.hostModel);
            return Ox(n, e), n;
        }, Ox = function(t, e) {
            f(Xx.concat(e.__wrappedMethods || []), function(n) {
                e.hasOwnProperty(n) && (t[n] = e[n]);
            }), t.__wrappedMethods = e.__wrappedMethods, f(Yx, function(n) {
                t[n] = a(e[n]);
            }), t._calculationInfo = l({}, e._calculationInfo);
        }, void (Bx = function(t, e) {
            var n = t._nameList, i = t._idList, r = t._nameDimIdx, o = t._idDimIdx, a = n[e], s = i[e];
            if (null == a && null != r && (n[e] = a = Px(t, r, e)), null == s && null != o && (i[e] = s = Px(t, o, e)), 
            null == s && null != a) {
                var l = t._nameRepeatCount, u = l[a] = (l[a] || 0) + 1;
                s = a, u > 1 && (s += "__ec__" + u), i[e] = s;
            }
        })), t;
    }(), jx = function(t) {
        this.coordSysDims = [], this.axisMap = H(), this.categoryAxisMap = H(), this.coordSysName = t;
    }, Zx = {
        cartesian2d: function(t, e, n, i) {
            var r = t.getReferringComponents("xAxis", Ed).models[0], o = t.getReferringComponents("yAxis", Ed).models[0];
            e.coordSysDims = [ "x", "y" ], n.set("x", r), n.set("y", o), fl(r) && (i.set("x", r), 
            e.firstCategoryDimIndex = 0), fl(o) && (i.set("y", o), null == e.firstCategoryDimIndex && (e.firstCategoryDimIndex = 1));
        },
        singleAxis: function(t, e, n, i) {
            var r = t.getReferringComponents("singleAxis", Ed).models[0];
            e.coordSysDims = [ "single" ], n.set("single", r), fl(r) && (i.set("single", r), 
            e.firstCategoryDimIndex = 0);
        },
        polar: function(t, e, n, i) {
            var r = t.getReferringComponents("polar", Ed).models[0], o = r.findAxisModel("radiusAxis"), a = r.findAxisModel("angleAxis");
            e.coordSysDims = [ "radius", "angle" ], n.set("radius", o), n.set("angle", a), fl(o) && (i.set("radius", o), 
            e.firstCategoryDimIndex = 0), fl(a) && (i.set("angle", a), null == e.firstCategoryDimIndex && (e.firstCategoryDimIndex = 1));
        },
        geo: function(t, e) {
            e.coordSysDims = [ "lng", "lat" ];
        },
        parallel: function(t, e, n, i) {
            var r = t.ecModel, o = r.getComponent("parallel", t.get("parallelIndex")), a = e.coordSysDims = o.dimensions.slice();
            f(o.parallelAxisIndex, function(t, o) {
                var s = r.getComponent("parallelAxis", t), l = a[o];
                n.set(l, s), fl(s) && (i.set(l, s), null == e.firstCategoryDimIndex && (e.firstCategoryDimIndex = o));
            });
        }
    }, Kx = function() {
        function t(t) {
            this._setting = t || {}, this._extent = [ 1 / 0, -1 / 0 ];
        }
        return t.prototype.getSetting = function(t) {
            return this._setting[t];
        }, t.prototype.unionExtent = function(t) {
            var e = this._extent;
            t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);
        }, t.prototype.unionExtentFromData = function(t, e) {
            this.unionExtent(t.getApproximateExtent(e));
        }, t.prototype.getExtent = function() {
            return this._extent.slice();
        }, t.prototype.setExtent = function(t, e) {
            var n = this._extent;
            isNaN(t) || (n[0] = t), isNaN(e) || (n[1] = e);
        }, t.prototype.isInExtentRange = function(t) {
            return this._extent[0] <= t && this._extent[1] >= t;
        }, t.prototype.isBlank = function() {
            return this._isBlank;
        }, t.prototype.setBlank = function(t) {
            this._isBlank = t;
        }, t;
    }();
    Bn(Kx);
    var $x = 0, Qx = function() {
        function t(t) {
            this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, 
            this.uid = ++$x;
        }
        return t.createByAxisModel = function(e) {
            var n = e.option, i = n.data, r = i && g(i, xl);
            return new t({
                categories: r,
                needCollect: !r,
                deduplication: !1 !== n.dedplication
            });
        }, t.prototype.getOrdinal = function(t) {
            return this._getOrCreateMap().get(t);
        }, t.prototype.parseAndCollect = function(t) {
            var e, n = this._needCollect;
            if (!b(t) && !n) return t;
            if (n && !this._deduplication) return e = this.categories.length, this.categories[e] = t, 
            e;
            var i = this._getOrCreateMap();
            return null == (e = i.get(t)) && (n ? (e = this.categories.length, this.categories[e] = t, 
            i.set(t, e)) : e = NaN), e;
        }, t.prototype._getOrCreateMap = function() {
            return this._map || (this._map = H(this.categories));
        }, t;
    }(), Jx = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            n.type = "ordinal";
            var i = n.getSetting("ordinalMeta");
            return i || (i = new Qx({})), x(i) && (i = new Qx({
                categories: g(i, function(t) {
                    return T(t) ? t.value : t;
                })
            })), n._ordinalMeta = i, n._extent = n.getSetting("extent") || [ 0, i.categories.length - 1 ], 
            n;
        }
        return n(e, t), e.prototype.parse = function(t) {
            return null == t ? NaN : b(t) ? this._ordinalMeta.getOrdinal(t) : Math.round(t);
        }, e.prototype.contain = function(t) {
            return Cl(t = this.parse(t), this._extent) && null != this._ordinalMeta.categories[t];
        }, e.prototype.normalize = function(t) {
            return Il(t = this._getTickNumber(this.parse(t)), this._extent);
        }, e.prototype.scale = function(t) {
            return t = Math.round(kl(t, this._extent)), this.getRawOrdinalNumber(t);
        }, e.prototype.getTicks = function() {
            for (var t = [], e = this._extent, n = e[0]; n <= e[1]; ) t.push({
                value: n
            }), n++;
            return t;
        }, e.prototype.getMinorTicks = function() {}, e.prototype.setSortInfo = function(t) {
            if (null != t) {
                for (var e = t.ordinalNumbers, n = this._ordinalNumbersByTick = [], i = this._ticksByOrdinalNumber = [], r = 0, o = this._ordinalMeta.categories.length, a = Math.min(o, e.length); a > r; ++r) {
                    var s = e[r];
                    n[r] = s, i[s] = r;
                }
                for (var l = 0; o > r; ++r) {
                    for (;null != i[l]; ) l++;
                    n.push(l), i[l] = r;
                }
            } else this._ordinalNumbersByTick = this._ticksByOrdinalNumber = null;
        }, e.prototype._getTickNumber = function(t) {
            var e = this._ticksByOrdinalNumber;
            return e && t >= 0 && t < e.length ? e[t] : t;
        }, e.prototype.getRawOrdinalNumber = function(t) {
            var e = this._ordinalNumbersByTick;
            return e && t >= 0 && t < e.length ? e[t] : t;
        }, e.prototype.getLabel = function(t) {
            if (!this.isBlank()) {
                var e = this.getRawOrdinalNumber(t.value), n = this._ordinalMeta.categories[e];
                return null == n ? "" : n + "";
            }
        }, e.prototype.count = function() {
            return this._extent[1] - this._extent[0] + 1;
        }, e.prototype.unionExtentFromData = function(t, e) {
            this.unionExtent(t.getApproximateExtent(e));
        }, e.prototype.isInExtentRange = function(t) {
            return t = this._getTickNumber(t), this._extent[0] <= t && this._extent[1] >= t;
        }, e.prototype.getOrdinalMeta = function() {
            return this._ordinalMeta;
        }, e.prototype.calcNiceTicks = function() {}, e.prototype.calcNiceExtent = function() {}, 
        e.type = "ordinal", e;
    }(Kx);
    Kx.registerClass(Jx);
    var tw = Ke, ew = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.type = "interval", e._interval = 0, e._intervalPrecision = 2, e;
        }
        return n(e, t), e.prototype.parse = function(t) {
            return t;
        }, e.prototype.contain = function(t) {
            return Cl(t, this._extent);
        }, e.prototype.normalize = function(t) {
            return Il(t, this._extent);
        }, e.prototype.scale = function(t) {
            return kl(t, this._extent);
        }, e.prototype.setExtent = function(t, e) {
            var n = this._extent;
            isNaN(t) || (n[0] = parseFloat(t)), isNaN(e) || (n[1] = parseFloat(e));
        }, e.prototype.unionExtent = function(t) {
            var e = this._extent;
            t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]), this.setExtent(e[0], e[1]);
        }, e.prototype.getInterval = function() {
            return this._interval;
        }, e.prototype.setInterval = function(t) {
            this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = Ml(t);
        }, e.prototype.getTicks = function(t) {
            var e = this._interval, n = this._extent, i = this._niceExtent, r = this._intervalPrecision, o = [];
            if (!e) return o;
            n[0] < i[0] && o.push(t ? {
                value: tw(i[0] - e, r)
            } : {
                value: n[0]
            });
            for (var a = i[0]; a <= i[1] && (o.push({
                value: a
            }), (a = tw(a + e, r)) !== o[o.length - 1].value); ) if (o.length > 1e4) return [];
            var s = o.length ? o[o.length - 1].value : i[1];
            return n[1] > s && o.push(t ? {
                value: tw(s + e, r)
            } : {
                value: n[1]
            }), o;
        }, e.prototype.getMinorTicks = function(t) {
            for (var e = this.getTicks(!0), n = [], i = this.getExtent(), r = 1; r < e.length; r++) {
                for (var o = e[r], a = e[r - 1], s = 0, l = [], u = (o.value - a.value) / t; t - 1 > s; ) {
                    var h = tw(a.value + (s + 1) * u);
                    h > i[0] && h < i[1] && l.push(h), s++;
                }
                n.push(l);
            }
            return n;
        }, e.prototype.getLabel = function(t, e) {
            if (null == t) return "";
            var n = e && e.precision;
            return null == n ? n = $e(t.value) || 0 : "auto" === n && (n = this._intervalPrecision), 
            xo(tw(t.value, n, !0));
        }, e.prototype.calcNiceTicks = function(t, e, n) {
            t = t || 5;
            var i = this._extent, r = i[1] - i[0];
            if (isFinite(r)) {
                0 > r && (r = -r, i.reverse());
                var o = bl(i, t, e, n);
                this._intervalPrecision = o.intervalPrecision, this._interval = o.interval, this._niceExtent = o.niceTickExtent;
            }
        }, e.prototype.calcNiceExtent = function(t) {
            var e = this._extent;
            if (e[0] === e[1]) if (0 !== e[0]) {
                var n = Math.abs(e[0]);
                t.fixMax || (e[1] += n / 2), e[0] -= n / 2;
            } else e[1] = 1;
            var i = e[1] - e[0];
            isFinite(i) || (e[0] = 0, e[1] = 1), this.calcNiceTicks(t.splitNumber, t.minInterval, t.maxInterval);
            var r = this._interval;
            t.fixMin || (e[0] = tw(Math.floor(e[0] / r) * r)), t.fixMax || (e[1] = tw(Math.ceil(e[1] / r) * r));
        }, e.prototype.setNiceExtent = function(t, e) {
            this._niceExtent = [ t, e ];
        }, e.type = "interval", e;
    }(Kx);
    Kx.registerClass(ew);
    var nw = "undefined" != typeof Float32Array, iw = nw ? Float32Array : Array, rw = "__ec_stack_", ow = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return n.type = "time", n;
        }
        return n(e, t), e.prototype.getLabel = function(t) {
            var e = this.getSetting("useUTC");
            return no(t.value, sv[function(t) {
                switch (t) {
                  case "year":
                  case "month":
                    return "day";

                  case "millisecond":
                    return "millisecond";

                  default:
                    return "second";
                }
            }(to(this._minLevelUnit))] || sv.second, e, this.getSetting("locale"));
        }, e.prototype.getFormattedLabel = function(t, e, n) {
            var i = this.getSetting("useUTC");
            return function(t, e, n, i, r) {
                var o = null;
                if (b(n)) o = n; else if (w(n)) o = n(t.value, e, {
                    level: t.level
                }); else {
                    var a = l({}, ov);
                    if (t.level > 0) for (var s = 0; s < lv.length; ++s) a[lv[s]] = "{primary|" + a[lv[s]] + "}";
                    var h = n ? !1 === n.inherit ? n : u(n, a) : a, c = io(t.value, r);
                    if (h[c]) o = h[c]; else if (h.inherit) {
                        for (s = uv.indexOf(c) - 1; s >= 0; --s) if (h[c]) {
                            o = h[c];
                            break;
                        }
                        o = o || a.none;
                    }
                    if (x(o)) {
                        var p = null == t.level ? 0 : t.level >= 0 ? t.level : o.length + t.level;
                        o = o[p = Math.min(p, o.length - 1)];
                    }
                }
                return no(new Date(t.value), o, r, i);
            }(t, e, n, this.getSetting("locale"), i);
        }, e.prototype.getTicks = function() {
            var t = this._interval, e = this._extent, n = [];
            if (!t) return n;
            n.push({
                value: e[0],
                level: 0
            });
            var i = this.getSetting("useUTC"), r = Gl(this._minLevelUnit, this._approxInterval, i, e);
            return (n = n.concat(r)).push({
                value: e[1],
                level: 0
            }), n;
        }, e.prototype.calcNiceExtent = function(t) {
            var e = this._extent;
            if (e[0] === e[1] && (e[0] -= iv, e[1] += iv), e[1] === -1 / 0 && 1 / 0 === e[0]) {
                var n = new Date();
                e[1] = +new Date(n.getFullYear(), n.getMonth(), n.getDate()), e[0] = e[1] - iv;
            }
            this.calcNiceTicks(t.splitNumber, t.minInterval, t.maxInterval);
        }, e.prototype.calcNiceTicks = function(t, e, n) {
            t = t || 10;
            var i = this._extent, r = i[1] - i[0];
            this._approxInterval = r / t, null != e && this._approxInterval < e && (this._approxInterval = e), 
            null != n && this._approxInterval > n && (this._approxInterval = n);
            var o = aw.length, a = Math.min(function(t, e, n, i) {
                for (;i > n; ) {
                    var r = n + i >>> 1;
                    t[r][1] < e ? n = r + 1 : i = r;
                }
                return n;
            }(aw, this._approxInterval, 0, o), o - 1);
            this._interval = aw[a][1], this._minLevelUnit = aw[Math.max(a - 1, 0)][0];
        }, e.prototype.parse = function(t) {
            return M(t) ? t : +rn(t);
        }, e.prototype.contain = function(t) {
            return Cl(this.parse(t), this._extent);
        }, e.prototype.normalize = function(t) {
            return Il(this.parse(t), this._extent);
        }, e.prototype.scale = function(t) {
            return kl(t, this._extent);
        }, e.type = "time", e;
    }(ew), aw = [ [ "second", tv ], [ "minute", ev ], [ "hour", nv ], [ "quarter-day", 6 * nv ], [ "half-day", 12 * nv ], [ "day", 1.2 * iv ], [ "half-week", 3.5 * iv ], [ "week", 7 * iv ], [ "month", 31 * iv ], [ "quarter", 95 * iv ], [ "half-year", rv / 2 ], [ "year", rv ] ];
    Kx.registerClass(ow);
    var sw = Kx.prototype, lw = ew.prototype, uw = Ke, hw = Math.floor, cw = Math.ceil, pw = Math.pow, dw = Math.log, fw = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.type = "log", e.base = 10, e._originalScale = new ew(), e._interval = 0, 
            e;
        }
        return n(e, t), e.prototype.getTicks = function(t) {
            var e = this._originalScale, n = this._extent, i = e.getExtent();
            return g(lw.getTicks.call(this, t), function(t) {
                var e = t.value, r = Ke(pw(this.base, e));
                return r = e === n[0] && this._fixMin ? Ul(r, i[0]) : r, {
                    value: r = e === n[1] && this._fixMax ? Ul(r, i[1]) : r
                };
            }, this);
        }, e.prototype.setExtent = function(t, e) {
            var n = dw(this.base);
            t = dw(Math.max(0, t)) / n, e = dw(Math.max(0, e)) / n, lw.setExtent.call(this, t, e);
        }, e.prototype.getExtent = function() {
            var t = this.base, e = sw.getExtent.call(this);
            e[0] = pw(t, e[0]), e[1] = pw(t, e[1]);
            var n = this._originalScale.getExtent();
            return this._fixMin && (e[0] = Ul(e[0], n[0])), this._fixMax && (e[1] = Ul(e[1], n[1])), 
            e;
        }, e.prototype.unionExtent = function(t) {
            this._originalScale.unionExtent(t);
            var e = this.base;
            t[0] = dw(t[0]) / dw(e), t[1] = dw(t[1]) / dw(e), sw.unionExtent.call(this, t);
        }, e.prototype.unionExtentFromData = function(t, e) {
            this.unionExtent(t.getApproximateExtent(e));
        }, e.prototype.calcNiceTicks = function(t) {
            t = t || 10;
            var e = this._extent, n = e[1] - e[0];
            if (!(1 / 0 === n || 0 >= n)) {
                var i = on(n);
                for (.5 >= t / n * i && (i *= 10); !isNaN(i) && Math.abs(i) < 1 && Math.abs(i) > 0; ) i *= 10;
                var r = [ Ke(cw(e[0] / i) * i), Ke(hw(e[1] / i) * i) ];
                this._interval = i, this._niceExtent = r;
            }
        }, e.prototype.calcNiceExtent = function(t) {
            lw.calcNiceExtent.call(this, t), this._fixMin = t.fixMin, this._fixMax = t.fixMax;
        }, e.prototype.parse = function(t) {
            return t;
        }, e.prototype.contain = function(t) {
            return Cl(t = dw(t) / dw(this.base), this._extent);
        }, e.prototype.normalize = function(t) {
            return Il(t = dw(t) / dw(this.base), this._extent);
        }, e.prototype.scale = function(t) {
            return t = kl(t, this._extent), pw(this.base, t);
        }, e.type = "log", e;
    }(Kx), gw = fw.prototype;
    gw.getMinorTicks = lw.getMinorTicks, gw.getLabel = lw.getLabel, Kx.registerClass(fw);
    var yw = function() {
        function t(t, e, n) {
            this._prepareParams(t, e, n);
        }
        return t.prototype._prepareParams = function(t, e, n) {
            n[1] < n[0] && (n = [ NaN, NaN ]), this._dataMin = n[0], this._dataMax = n[1];
            var i = this._isOrdinal = "ordinal" === t.type;
            this._needCrossZero = "interval" === t.type && e.getNeedCrossZero && e.getNeedCrossZero();
            var r = this._modelMinRaw = e.get("min", !0);
            w(r) ? this._modelMinNum = Xl(t, r({
                min: n[0],
                max: n[1]
            })) : "dataMin" !== r && (this._modelMinNum = Xl(t, r));
            var o = this._modelMaxRaw = e.get("max", !0);
            if (w(o) ? this._modelMaxNum = Xl(t, o({
                min: n[0],
                max: n[1]
            })) : "dataMax" !== o && (this._modelMaxNum = Xl(t, o)), i) this._axisDataLen = e.getCategories().length; else {
                var a = e.get("boundaryGap"), s = x(a) ? a : [ a || 0, a || 0 ];
                this._boundaryGapInner = "boolean" == typeof s[0] || "boolean" == typeof s[1] ? [ 0, 0 ] : [ Ve(s[0], 1), Ve(s[1], 1) ];
            }
        }, t.prototype.calculate = function() {
            var t = this._isOrdinal, e = this._dataMin, n = this._dataMax, i = this._axisDataLen, r = this._boundaryGapInner, o = t ? null : n - e || Math.abs(e), a = "dataMin" === this._modelMinRaw ? e : this._modelMinNum, s = "dataMax" === this._modelMaxRaw ? n : this._modelMaxNum, l = null != a, u = null != s;
            null == a && (a = t ? i ? 0 : NaN : e - r[0] * o), null == s && (s = t ? i ? i - 1 : NaN : n + r[1] * o), 
            (null == a || !isFinite(a)) && (a = NaN), (null == s || !isFinite(s)) && (s = NaN);
            var h = P(a) || P(s) || t && !i;
            this._needCrossZero && (a > 0 && s > 0 && !l && (a = 0), 0 > a && 0 > s && !u && (s = 0));
            var c = this._determinedMin, p = this._determinedMax;
            return null != c && (a = c, l = !0), null != p && (s = p, u = !0), {
                min: a,
                max: s,
                minFixed: l,
                maxFixed: u,
                isBlank: h
            };
        }, t.prototype.modifyDataMinMax = function(t, e) {
            this[mw[t]] = e;
        }, t.prototype.setDeterminedMinMax = function(t, e) {
            this[vw[t]] = e;
        }, t.prototype.freeze = function() {
            this.frozen = !0;
        }, t;
    }(), vw = {
        min: "_determinedMin",
        max: "_determinedMax"
    }, mw = {
        min: "_dataMin",
        max: "_dataMax"
    }, _w = function() {
        function t() {}
        return t.prototype.getNeedCrossZero = function() {
            return !this.option.scale;
        }, t.prototype.getCoordSysModel = function() {}, t;
    }(), xw = {
        isDimensionStacked: yl,
        enableDataStack: gl,
        getStackedDimension: vl
    }, ww = (Object.freeze || Object)({
        createList: function(t) {
            return _l(null, t);
        },
        getLayoutRect: ko,
        dataStack: xw,
        createScale: function(t, e) {
            var n = e;
            e instanceof Yy || (n = new Yy(e));
            var i = jl(n);
            return i.setExtent(t[0], t[1]), ql(i, n), i;
        },
        mixinAxisModelCommonMethods: function(t) {
            p(t, _w);
        },
        getECData: ig,
        createTextStyle: function(t, e) {
            return Ur(t, null, null, "normal" !== (e = e || {}).state);
        },
        createDimensions: function(t, e) {
            return pl(t, e).dimensions;
        },
        createSymbol: ys,
        enableHoverEmphasis: Zi
    }), bw = [], Sw = {
        registerPreprocessor: qs,
        registerProcessor: js,
        registerPostInit: Zs,
        registerPostUpdate: Ks,
        registerUpdateLifecycle: $s,
        registerAction: Qs,
        registerCoordinateSystem: Js,
        registerLayout: tl,
        registerVisual: el,
        registerTransform: kx,
        registerLoading: il,
        registerMap: rl,
        registerImpl: function(t, e) {
            R_[t] = e;
        },
        PRIORITY: N_,
        ComponentModel: mv,
        ComponentView: Rm,
        SeriesModel: Om,
        ChartView: zm,
        registerComponentModel: function(t) {
            mv.registerClass(t);
        },
        registerComponentView: function(t) {
            Rm.registerClass(t);
        },
        registerSeriesModel: function(t) {
            Om.registerClass(t);
        },
        registerChartView: function(t) {
            zm.registerClass(t);
        },
        registerSubTypeDefaulter: function(t, e) {
            mv.registerSubTypeDefaulter(t, e);
        },
        registerPainter: function(t, e) {
            qe(t, e);
        }
    }, Mw = 1e-8, Tw = [], Cw = function() {
        function t(t) {
            this.name = t;
        }
        return t.prototype.setCenter = function(t) {
            this._center = t;
        }, t.prototype.getCenter = function() {
            var t = this._center;
            return t || (t = this._center = this.calcCenter()), t;
        }, t;
    }(), Iw = function(t, e) {
        this.type = "polygon", this.exterior = t, this.interiors = e;
    }, kw = function(t) {
        this.type = "linestring", this.points = t;
    }, Dw = function(t) {
        function e(e, n, i) {
            var r = t.call(this, e) || this;
            return r.type = "geoJSON", r.geometries = n, r._center = i && [ i[0], i[1] ], r;
        }
        return n(e, t), e.prototype.calcCenter = function() {
            for (var t, e = this.geometries, n = 0, i = 0; i < e.length; i++) {
                var r = e[i], o = r.exterior, a = o && o.length;
                a > n && (t = r, n = a);
            }
            if (t) return function(t) {
                for (var e = 0, n = 0, i = 0, r = t.length, o = t[r - 1][0], a = t[r - 1][1], s = 0; r > s; s++) {
                    var l = t[s][0], u = t[s][1], h = o * u - l * a;
                    e += h, n += (o + l) * h, i += (a + u) * h, o = l, a = u;
                }
                return e ? [ n / e / 3, i / e / 3, e ] : [ t[0][0] || 0, t[0][1] || 0 ];
            }(t.exterior);
            var s = this.getBoundingRect();
            return [ s.x + s.width / 2, s.y + s.height / 2 ];
        }, e.prototype.getBoundingRect = function(t) {
            var e = this._rect;
            if (e && !t) return e;
            var n = [ 1 / 0, 1 / 0 ], i = [ -1 / 0, -1 / 0 ];
            return f(this.geometries, function(e) {
                "polygon" === e.type ? ru(e.exterior, n, i, t) : f(e.points, function(e) {
                    ru(e, n, i, t);
                });
            }), isFinite(n[0]) && isFinite(n[1]) && isFinite(i[0]) && isFinite(i[1]) || (n[0] = n[1] = i[0] = i[1] = 0), 
            e = new op(n[0], n[1], i[0] - n[0], i[1] - n[1]), t || (this._rect = e), e;
        }, e.prototype.contain = function(t) {
            var e = this.getBoundingRect(), n = this.geometries;
            if (!e.contain(t[0], t[1])) return !1;
            t: for (var i = 0, r = n.length; r > i; i++) {
                var o = n[i];
                if ("polygon" === o.type) {
                    var a = o.exterior, s = o.interiors;
                    if (nu(a, t[0], t[1])) {
                        for (var l = 0; l < (s ? s.length : 0); l++) if (nu(s[l], t[0], t[1])) continue t;
                        return !0;
                    }
                }
            }
            return !1;
        }, e.prototype.transformTo = function(t, e, n, i) {
            var r = this.getBoundingRect(), o = r.width / r.height;
            n ? i || (i = n / o) : n = o * i;
            for (var a = new op(t, e, n, i), s = r.calculateTransform(a), l = this.geometries, u = 0; u < l.length; u++) {
                var h = l[u];
                "polygon" === h.type ? (iu(h.exterior, s), f(h.interiors, function(t) {
                    iu(t, s);
                })) : f(h.points, function(t) {
                    iu(t, s);
                });
            }
            (r = this._rect).copy(a), this._center = [ r.x + r.width / 2, r.y + r.height / 2 ];
        }, e.prototype.cloneShallow = function(t) {
            null == t && (t = this.name);
            var n = new e(t, this.geometries, this._center);
            return n._rect = this._rect, n.transformTo = null, n;
        }, e;
    }(Cw), Aw = (function(t) {
        function e(e, n) {
            var i = t.call(this, e) || this;
            return i.type = "geoSVG", i._elOnlyForCalculate = n, i;
        }
        n(e, t), e.prototype.calcCenter = function() {
            for (var t = this._elOnlyForCalculate, e = t.getBoundingRect(), n = [ e.x + e.width / 2, e.y + e.height / 2 ], i = _t(Tw), r = t; r && !r.isGeoSVGGraphicRoot; ) wt(i, r.getLocalTransform(), i), 
            r = r.parent;
            return Tt(i, i), rt(n, n, i), n;
        };
    }(Cw), (Object.freeze || Object)({
        linearMap: je,
        round: Ke,
        asc: function(t) {
            return t.sort(function(t, e) {
                return t - e;
            }), t;
        },
        getPrecision: $e,
        getPrecisionSafe: Qe,
        getPixelPrecision: Je,
        getPercentWithPrecision: function(t, e, n) {
            return t[e] && function(t, e) {
                var n = y(t, function(t, e) {
                    return t + (isNaN(e) ? 0 : e);
                }, 0);
                if (0 === n) return [];
                for (var i = Math.pow(10, e), r = g(t, function(t) {
                    return (isNaN(t) ? 0 : t) / n * i * 100;
                }), o = 100 * i, a = g(r, function(t) {
                    return Math.floor(t);
                }), s = y(a, function(t, e) {
                    return t + e;
                }, 0), l = g(r, function(t, e) {
                    return t - a[e];
                }); o > s; ) {
                    for (var u = Number.NEGATIVE_INFINITY, h = null, c = 0, p = l.length; p > c; ++c) l[c] > u && (u = l[c], 
                    h = c);
                    ++a[h], l[h] = 0, ++s;
                }
                return g(a, function(t) {
                    return t / i;
                });
            }(t, n)[e] || 0;
        },
        MAX_SAFE_INTEGER: 9007199254740991,
        remRadian: en,
        isRadianAroundZero: nn,
        parseDate: rn,
        quantity: on,
        quantityExponent: an,
        nice: sn,
        quantile: function(t, e) {
            var n = (t.length - 1) * e + 1, i = Math.floor(n), r = +t[i - 1], o = n - i;
            return o ? r + o * (t[i] - r) : r;
        },
        reformIntervals: function(t) {
            t.sort(function(t, e) {
                return function t(e, n, i) {
                    return e.interval[i] < n.interval[i] || e.interval[i] === n.interval[i] && (e.close[i] - n.close[i] == (i ? -1 : 1) || !i && t(e, n, 1));
                }(t, e, 0) ? -1 : 1;
            });
            for (var e = -1 / 0, n = 1, i = 0; i < t.length; ) {
                for (var r = t[i].interval, o = t[i].close, a = 0; 2 > a; a++) r[a] <= e && (r[a] = e, 
                o[a] = a ? 1 : 1 - n), e = r[a], n = o[a];
                r[0] === r[1] && o[0] * o[1] != 1 ? t.splice(i, 1) : i++;
            }
            return t;
        },
        isNumeric: un,
        numericToNumber: ln
    })), Pw = (Object.freeze || Object)({
        parse: rn,
        format: no
    }), Lw = (Object.freeze || Object)({
        extendShape: xr,
        extendPath: wr,
        makePath: Mr,
        makeImage: Tr,
        mergePath: ky,
        resizePath: Ir,
        createIcon: Br,
        updateProps: fr,
        initProps: gr,
        getTransform: Dr,
        clipPointsByRect: Or,
        clipRectByRect: Rr,
        registerShape: br,
        getShapeClass: Sr,
        Group: Md,
        Image: Yf,
        Text: Jf,
        Circle: Eg,
        Ellipse: Ng,
        Sector: $g,
        Ring: Jg,
        Polygon: ey,
        Polyline: iy,
        Rect: Kf,
        Line: ay,
        BezierCurve: uy,
        Arc: cy,
        IncrementalDisplayable: by,
        CompoundPath: py,
        LinearGradient: fy,
        RadialGradient: gy,
        BoundingRect: op
    }), Ow = (Object.freeze || Object)({
        addCommas: xo,
        toCamelCase: wo,
        normalizeCssArray: hv,
        encodeHTML: ct,
        formatTpl: So,
        getTooltipMarker: Mo,
        formatTime: function(t, e, n) {
            ("week" === t || "month" === t || "quarter" === t || "half-year" === t || "year" === t) && (t = "MM-dd\nyyyy");
            var i = rn(e), r = n ? "getUTC" : "get", o = i[r + "FullYear"](), a = i[r + "Month"]() + 1, s = i[r + "Date"](), l = i[r + "Hours"](), u = i[r + "Minutes"](), h = i[r + "Seconds"](), c = i[r + "Milliseconds"]();
            return t.replace("MM", Jr(a, 2)).replace("M", a).replace("yyyy", o).replace("yy", Jr(o % 100 + "", 2)).replace("dd", Jr(s, 2)).replace("d", s).replace("hh", Jr(l, 2)).replace("h", l).replace("mm", Jr(u, 2)).replace("m", u).replace("ss", Jr(h, 2)).replace("s", h).replace("SSS", Jr(c, 3));
        },
        capitalFirst: function(t) {
            return t ? t.charAt(0).toUpperCase() + t.substr(1) : t;
        },
        truncateText: Hn,
        getTextRect: function(t, e, n, i, r, o, a, s) {
            return new Jf({
                style: {
                    text: t,
                    font: e,
                    align: n,
                    verticalAlign: i,
                    padding: r,
                    rich: o,
                    overflow: a ? "truncate" : null,
                    lineHeight: s
                }
            }).getBoundingRect();
        }
    }), Rw = (Object.freeze || Object)({
        map: g,
        each: f,
        indexOf: h,
        inherits: c,
        reduce: y,
        filter: v,
        bind: Sc,
        curry: _,
        isArray: x,
        isString: b,
        isObject: T,
        isFunction: w,
        extend: l,
        defaults: u,
        clone: a,
        merge: s
    }), Bw = Tn(), Ew = [ 0, 1 ], zw = function() {
        function t(t, e, n) {
            this.onBand = !1, this.inverse = !1, this.dim = t, this.scale = e, this._extent = n || [ 0, 0 ];
        }
        return t.prototype.contain = function(t) {
            var e = this._extent, n = Math.min(e[0], e[1]), i = Math.max(e[0], e[1]);
            return t >= n && i >= t;
        }, t.prototype.containData = function(t) {
            return this.scale.contain(t);
        }, t.prototype.getExtent = function() {
            return this._extent.slice();
        }, t.prototype.getPixelPrecision = function(t) {
            return Je(t || this.scale.getExtent(), this._extent);
        }, t.prototype.setExtent = function(t, e) {
            var n = this._extent;
            n[0] = t, n[1] = e;
        }, t.prototype.dataToCoord = function(t, e) {
            var n = this._extent, i = this.scale;
            return t = i.normalize(t), this.onBand && "ordinal" === i.type && yu(n = n.slice(), i.count()), 
            je(t, Ew, n, e);
        }, t.prototype.coordToData = function(t, e) {
            var n = this._extent, i = this.scale;
            this.onBand && "ordinal" === i.type && yu(n = n.slice(), i.count());
            var r = je(t, n, Ew, e);
            return this.scale.scale(r);
        }, t.prototype.pointToData = function() {}, t.prototype.getTicksCoords = function(t) {
            var e = (t = t || {}).tickModel || this.getTickModel(), n = g(uu(this, e).ticks, function(t) {
                return {
                    coord: this.dataToCoord("ordinal" === this.scale.type ? this.scale.getRawOrdinalNumber(t) : t),
                    tickValue: t
                };
            }, this);
            return function(t, e, n, i) {
                function r(t, e) {
                    return t = Ke(t), e = Ke(e), c ? t > e : e > t;
                }
                var o = e.length;
                if (t.onBand && !n && o) {
                    var a, s, l = t.getExtent();
                    if (1 === o) e[0].coord = l[0], a = e[1] = {
                        coord: l[1]
                    }; else {
                        var u = e[o - 1].tickValue - e[0].tickValue, h = (e[o - 1].coord - e[0].coord) / u;
                        f(e, function(t) {
                            t.coord -= h / 2;
                        }), s = 1 + t.scale.getExtent()[1] - e[o - 1].tickValue, a = {
                            coord: e[o - 1].coord + h * s
                        }, e.push(a);
                    }
                    var c = l[0] > l[1];
                    r(e[0].coord, l[0]) && (i ? e[0].coord = l[0] : e.shift()), i && r(l[0], e[0].coord) && e.unshift({
                        coord: l[0]
                    }), r(l[1], a.coord) && (i ? a.coord = l[1] : e.pop()), i && r(a.coord, l[1]) && e.push({
                        coord: l[1]
                    });
                }
            }(this, n, e.get("alignWithLabel"), t.clamp), n;
        }, t.prototype.getMinorTicksCoords = function() {
            if ("ordinal" === this.scale.type) return [];
            var t = this.model.getModel("minorTick").get("splitNumber");
            return t > 0 && 100 > t || (t = 5), g(this.scale.getMinorTicks(t), function(t) {
                return g(t, function(t) {
                    return {
                        coord: this.dataToCoord(t),
                        tickValue: t
                    };
                }, this);
            }, this);
        }, t.prototype.getViewLabels = function() {
            return lu(this).labels;
        }, t.prototype.getLabelModel = function() {
            return this.model.getModel("axisLabel");
        }, t.prototype.getTickModel = function() {
            return this.model.getModel("axisTick");
        }, t.prototype.getBandWidth = function() {
            var t = this._extent, e = this.scale.getExtent(), n = e[1] - e[0] + (this.onBand ? 1 : 0);
            0 === n && (n = 1);
            var i = Math.abs(t[1] - t[0]);
            return Math.abs(i) / n;
        }, t.prototype.calculateCategoryInterval = function() {
            return function(t) {
                var e = function(t) {
                    var e = t.getLabelModel();
                    return {
                        axisRotate: t.getRotate ? t.getRotate() : t.isHorizontal && !t.isHorizontal() ? 90 : 0,
                        labelRotate: e.get("rotate") || 0,
                        font: e.getFont()
                    };
                }(t), n = Zl(t), i = (e.axisRotate - e.labelRotate) / 180 * Math.PI, r = t.scale, o = r.getExtent(), a = r.count();
                if (o[1] - o[0] < 1) return 0;
                var s = 1;
                a > 40 && (s = Math.max(1, Math.floor(a / 40)));
                for (var l = o[0], u = t.dataToCoord(l + 1) - t.dataToCoord(l), h = Math.abs(u * Math.cos(i)), c = Math.abs(u * Math.sin(i)), p = 0, d = 0; l <= o[1]; l += s) {
                    var f, g, y = Ee(n({
                        value: l
                    }), e.font, "center", "top");
                    f = 1.3 * y.width, g = 1.3 * y.height, p = Math.max(p, f, 7), d = Math.max(d, g, 7);
                }
                var v = p / h, m = d / c;
                isNaN(v) && (v = 1 / 0), isNaN(m) && (m = 1 / 0);
                var _ = Math.max(0, Math.floor(Math.min(v, m))), x = Bw(t.model), w = t.getExtent(), b = x.lastAutoInterval, S = x.lastTickCount;
                return null != b && null != S && Math.abs(b - _) <= 1 && Math.abs(S - a) <= 1 && b > _ && x.axisExtent0 === w[0] && x.axisExtent1 === w[1] ? _ = b : (x.lastTickCount = a, 
                x.lastAutoInterval = _, x.axisExtent0 = w[0], x.axisExtent1 = w[1]), _;
            }(this);
        }, t;
    }(), Nw = 2 * Math.PI, Fw = Af.CMD, Vw = [ "top", "right", "bottom", "left" ], Hw = [], Ww = new Kc(), Gw = new Kc(), Uw = new Kc(), Xw = new Kc(), Yw = new Kc(), qw = [], jw = new Kc(), Zw = [ "align", "verticalAlign", "width", "height", "fontSize" ], Kw = new gd(), $w = Tn(), Qw = Tn(), Jw = [ "x", "y", "rotation" ], tb = function() {
        function t() {
            this._labelList = [], this._chartViewList = [];
        }
        return t.prototype.clearLabels = function() {
            this._labelList = [], this._chartViewList = [];
        }, t.prototype._addLabel = function(t, e, n, i, r) {
            var o = i.style, a = i.__hostTarget.textConfig || {}, s = i.getComputedTransform(), l = i.getBoundingRect().plain();
            op.applyTransform(l, l, s), s ? Kw.setLocalTransform(s) : (Kw.x = Kw.y = Kw.rotation = Kw.originX = Kw.originY = 0, 
            Kw.scaleX = Kw.scaleY = 1), Kw.rotation = ii(Kw.rotation);
            var u, h = i.__hostTarget;
            if (h) {
                u = h.getBoundingRect().plain();
                var c = h.getComputedTransform();
                op.applyTransform(u, u, c);
            }
            var p = u && h.getTextGuideLine();
            this._labelList.push({
                label: i,
                labelLine: p,
                seriesModel: n,
                dataIndex: t,
                dataType: e,
                layoutOption: r,
                computedLayoutOption: null,
                rect: l,
                hostRect: u,
                priority: u ? u.width * u.height : 0,
                defaultAttr: {
                    ignore: i.ignore,
                    labelGuideIgnore: p && p.ignore,
                    x: Kw.x,
                    y: Kw.y,
                    scaleX: Kw.scaleX,
                    scaleY: Kw.scaleY,
                    rotation: Kw.rotation,
                    style: {
                        x: o.x,
                        y: o.y,
                        align: o.align,
                        verticalAlign: o.verticalAlign,
                        width: o.width,
                        height: o.height,
                        fontSize: o.fontSize
                    },
                    cursor: i.cursor,
                    attachedPos: a.position,
                    attachedRot: a.rotation
                }
            });
        }, t.prototype.addLabelsOfSeries = function(t) {
            var e = this;
            this._chartViewList.push(t);
            var n = t.__model, i = n.get("labelLayout");
            (w(i) || m(i).length) && t.group.traverse(function(t) {
                if (t.ignore) return !0;
                var r = t.getTextContent(), o = ig(t);
                r && !r.disableLabelLayout && e._addLabel(o.dataIndex, o.dataType, n, r, i);
            });
        }, t.prototype.updateLayoutConfig = function(t) {
            function e(t, e) {
                return function() {
                    Su(t, e);
                };
            }
            for (var n = t.getWidth(), i = t.getHeight(), r = 0; r < this._labelList.length; r++) {
                var o = this._labelList[r], a = o.label, s = a.__hostTarget, l = o.defaultAttr, u = void 0;
                u = (u = w(o.layoutOption) ? o.layoutOption(Au(o, s)) : o.layoutOption) || {}, o.computedLayoutOption = u;
                var h = Math.PI / 180;
                s && s.setTextConfig({
                    local: !1,
                    position: null != u.x || null != u.y ? null : l.attachedPos,
                    rotation: null != u.rotate ? u.rotate * h : l.attachedRot,
                    offset: [ u.dx || 0, u.dy || 0 ]
                });
                var c = !1;
                if (null != u.x ? (a.x = Ze(u.x, n), a.setStyle("x", 0), c = !0) : (a.x = l.x, a.setStyle("x", l.style.x)), 
                null != u.y ? (a.y = Ze(u.y, i), a.setStyle("y", 0), c = !0) : (a.y = l.y, a.setStyle("y", l.style.y)), 
                u.labelLinePoints) {
                    var p = s.getTextGuideLine();
                    p && (p.setShape({
                        points: u.labelLinePoints
                    }), c = !1);
                }
                $w(a).needsUpdateLabelLine = c, a.rotation = null != u.rotate ? u.rotate * h : l.rotation, 
                a.scaleX = l.scaleX, a.scaleY = l.scaleY;
                for (var d = 0; d < Zw.length; d++) {
                    var f = Zw[d];
                    a.setStyle(f, null != u[f] ? u[f] : l.style[f]);
                }
                if (u.draggable) {
                    if (a.draggable = !0, a.cursor = "move", s) {
                        var g = o.seriesModel;
                        if (null != o.dataIndex) g = o.seriesModel.getData(o.dataType).getItemModel(o.dataIndex);
                        a.on("drag", e(s, g.getModel("labelLine")));
                    }
                } else a.off("drag"), a.cursor = l.cursor;
            }
        }, t.prototype.layout = function(t) {
            var e = t.getWidth(), n = t.getHeight(), i = Cu(this._labelList), r = v(i, function(t) {
                return "shiftX" === t.layoutOption.moveOverlap;
            }), o = v(i, function(t) {
                return "shiftY" === t.layoutOption.moveOverlap;
            });
            (function(t, e, n, i) {
                Iu(t, "x", "width", e, n, i);
            })(r, 0, e), function(t, e, n, i) {
                Iu(t, "y", "height", e, n, i);
            }(o, 0, n), ku(v(i, function(t) {
                return t.layoutOption.hideOverlap;
            }));
        }, t.prototype.processLabelsOverall = function() {
            var t = this;
            f(this._chartViewList, function(e) {
                var n = e.__model, i = e.ignoreLabelLineUpdate, r = n.isAnimationEnabled();
                e.group.traverse(function(e) {
                    if (e.ignore && !e.forceLabelAnimation) return !0;
                    var o = !i, a = e.getTextContent();
                    !o && a && (o = $w(a).needsUpdateLabelLine), o && t._updateLabelLine(e, n), r && t._animateLabels(e, n);
                });
            });
        }, t.prototype._updateLabelLine = function(t, e) {
            var n = t.getTextContent(), i = ig(t), r = i.dataIndex;
            if (n && null != r) {
                var o = e.getData(i.dataType), a = o.getItemModel(r), s = {}, l = o.getItemVisual(r, "style");
                if (l) {
                    var h = o.getVisual("drawType");
                    s.stroke = l[h];
                }
                var c = a.getModel("labelLine");
                (function(t, e, n) {
                    var i = t.getTextGuideLine(), r = t.getTextContent();
                    if (r) {
                        for (var o = e.normal, a = o.get("show"), s = r.ignore, l = 0; l < dg.length; l++) {
                            var h = dg[l], c = e[h], p = "normal" === h;
                            if (c) {
                                var d = c.get("show");
                                if ((p ? s : O(r.states[h] && r.states[h].ignore, s)) || !O(d, a)) {
                                    var f = p ? i : i && i.states[h];
                                    f && (f.ignore = !0);
                                    continue;
                                }
                                i || (i = new iy(), t.setTextGuideLine(i), p || !s && a || Mu(i, !0, "normal", e.normal), 
                                t.stateProxy && (i.stateProxy = t.stateProxy)), Mu(i, !1, h, c);
                            }
                        }
                        if (i) {
                            u(i.style, n), i.style.fill = null;
                            var g = o.get("showAbove");
                            (t.textGuideLineConfig = t.textGuideLineConfig || {}).showAbove = g || !1, i.buildPath = Tu;
                        }
                    } else i && t.removeTextGuideLine();
                })(t, function(t, e) {
                    e = e || "labelLine";
                    for (var n = {
                        normal: t.getModel(e)
                    }, i = 0; i < pg.length; i++) {
                        var r = pg[i];
                        n[r] = t.getModel([ r, e ]);
                    }
                    return n;
                }(a), s), Su(t, c);
            }
        }, t.prototype._animateLabels = function(t, e) {
            var n = t.getTextContent(), i = t.getTextGuideLine();
            if (n && (t.forceLabelAnimation || !n.ignore && !n.invisible && !t.disableLabelAnimation && !yr(t))) {
                var r = (f = $w(n)).oldLayout, o = ig(t), a = o.dataIndex, s = {
                    x: n.x,
                    y: n.y,
                    rotation: n.rotation
                }, l = e.getData(o.dataType);
                if (r) {
                    n.attr(r);
                    var u = t.prevStates;
                    u && (h(u, "select") >= 0 && n.attr(f.oldLayoutSelect), h(u, "emphasis") >= 0 && n.attr(f.oldLayoutEmphasis)), 
                    fr(n, s, e, a);
                } else if (n.attr(s), !By(n).valueAnimation) {
                    var c = O(n.style.opacity, 1);
                    n.style.opacity = 0, gr(n, {
                        style: {
                            opacity: c
                        }
                    }, e, a);
                }
                if (f.oldLayout = s, n.states.select) {
                    var p = f.oldLayoutSelect = {};
                    Pu(p, s, Jw), Pu(p, n.states.select, Jw);
                }
                if (n.states.emphasis) {
                    var d = f.oldLayoutEmphasis = {};
                    Pu(d, s, Jw), Pu(d, n.states.emphasis, Jw);
                }
                jr(n, a, l, e, e);
            }
            if (i && !i.ignore && !i.invisible) {
                r = (f = Qw(i)).oldLayout;
                var f, g = {
                    points: i.shape.points
                };
                r ? (i.attr({
                    shape: r
                }), fr(i, {
                    shape: g
                }, e)) : (i.setShape(g), i.style.strokePercent = 0, gr(i, {
                    style: {
                        strokePercent: 1
                    }
                }, e)), f.oldLayout = g;
            }
        }, t;
    }(), eb = Tn();
    tu(Lu);
    var nb = function(t) {
        function e(e, n, i) {
            var r, o = t.call(this) || this;
            o.motionBlur = !1, o.lastFrameAlpha = .7, o.dpr = 1, o.virtual = !1, o.config = {}, 
            o.incremental = !1, o.zlevel = 0, o.maxRepaintRectCount = 5, o.__dirty = !0, o.__firstTimePaint = !0, 
            o.__used = !1, o.__drawIndex = 0, o.__startIndex = 0, o.__endIndex = 0, o.__prevStartIndex = null, 
            o.__prevEndIndex = null, i = i || od, "string" == typeof e ? r = Ou(e, n, i) : T(e) && (e = (r = e).id), 
            o.id = e, o.dom = r;
            var a = r.style;
            return a && (U(r), r.onselectstart = function() {
                return !1;
            }, a.padding = "0", a.margin = "0", a.borderWidth = "0"), o.painter = n, o.dpr = i, 
            o;
        }
        return n(e, t), e.prototype.getElementCount = function() {
            return this.__endIndex - this.__startIndex;
        }, e.prototype.afterBrush = function() {
            this.__prevStartIndex = this.__startIndex, this.__prevEndIndex = this.__endIndex;
        }, e.prototype.initContext = function() {
            this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
        }, e.prototype.setUnpainted = function() {
            this.__firstTimePaint = !0;
        }, e.prototype.createBackBuffer = function() {
            var t = this.dpr;
            this.domBack = Ou("back-" + this.id, this.painter, t), this.ctxBack = this.domBack.getContext("2d"), 
            1 !== t && this.ctxBack.scale(t, t);
        }, e.prototype.createRepaintRects = function(t, e, n, i) {
            function r(t) {
                if (t.isFinite() && !t.isZero()) if (0 === o.length) {
                    (f = new op(0, 0, 0, 0)).copy(t), o.push(f);
                } else {
                    for (var e = !1, n = 1 / 0, i = 0, r = 0; r < o.length; ++r) {
                        var u = o[r];
                        if (u.intersect(t)) {
                            var h = new op(0, 0, 0, 0);
                            h.copy(u), h.union(t), o[r] = h, e = !0;
                            break;
                        }
                        if (s) {
                            l.copy(t), l.union(u);
                            var c = t.width * t.height, p = u.width * u.height, d = l.width * l.height - c - p;
                            n > d && (n = d, i = r);
                        }
                    }
                    var f;
                    if (s && (o[i].union(t), e = !0), !e) (f = new op(0, 0, 0, 0)).copy(t), o.push(f);
                    s || (s = o.length >= a);
                }
            }
            if (this.__firstTimePaint) return this.__firstTimePaint = !1, null;
            for (var o = [], a = this.maxRepaintRectCount, s = !1, l = new op(0, 0, 0, 0), u = this.__startIndex; u < this.__endIndex; ++u) {
                if (p = t[u]) {
                    var h = p.shouldBePainted(n, i, !0, !0);
                    (d = p.__isRendered && (p.__dirty & fp || !h) ? p.getPrevPaintRect() : null) && r(d);
                    var c = h && (p.__dirty & fp || !p.__isRendered) ? p.getPaintRect() : null;
                    c && r(c);
                }
            }
            for (u = this.__prevStartIndex; u < this.__prevEndIndex; ++u) {
                var p, d;
                h = (p = e[u]).shouldBePainted(n, i, !0, !0);
                if (p && (!h || !p.__zr) && p.__isRendered) (d = p.getPrevPaintRect()) && r(d);
            }
            var f;
            do {
                f = !1;
                for (u = 0; u < o.length; ) if (o[u].isZero()) o.splice(u, 1); else {
                    for (var g = u + 1; g < o.length; ) o[u].intersect(o[g]) ? (f = !0, o[u].union(o[g]), 
                    o.splice(g, 1)) : g++;
                    u++;
                }
            } while (f);
            return this._paintRects = o, o;
        }, e.prototype.debugGetPaintRects = function() {
            return (this._paintRects || []).slice();
        }, e.prototype.resize = function(t, e) {
            var n = this.dpr, i = this.dom, r = i.style, o = this.domBack;
            r && (r.width = t + "px", r.height = e + "px"), i.width = t * n, i.height = e * n, 
            o && (o.width = t * n, o.height = e * n, 1 !== n && this.ctxBack.scale(n, n));
        }, e.prototype.clear = function(t, e, n) {
            function i(t, n, i, r) {
                if (o.clearRect(t, n, i, r), e && "transparent" !== e) {
                    var a = void 0;
                    if (D(e)) a = (e.global || e.__width === i && e.__height === r) && e.__canvasGradient || ms(o, e, {
                        x: 0,
                        y: 0,
                        width: i,
                        height: r
                    }), e.__canvasGradient = a, e.__width = i, e.__height = r; else A(e) && (e.scaleX = e.scaleX || h, 
                    e.scaleY = e.scaleY || h, a = Is(o, e, {
                        dirty: function() {
                            c.setUnpainted(), c.__painter.refresh();
                        }
                    }));
                    o.save(), o.fillStyle = a || e, o.fillRect(t, n, i, r), o.restore();
                }
                l && (o.save(), o.globalAlpha = u, o.drawImage(p, t, n, i, r), o.restore());
            }
            var r = this.dom, o = this.ctx, a = r.width, s = r.height;
            e = e || this.clearColor;
            var l = this.motionBlur && !t, u = this.lastFrameAlpha, h = this.dpr, c = this;
            l && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", 
            this.ctxBack.drawImage(r, 0, 0, a / h, s / h));
            var p = this.domBack;
            !n || l ? i(0, 0, a, s) : n.length && f(n, function(t) {
                i(t.x * h, t.y * h, t.width * h, t.height * h);
            });
        }, e;
    }(zc), ib = 314159, rb = function() {
        function t(t, e, n) {
            this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, 
            this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
            var i = !t.nodeName || "CANVAS" === t.nodeName.toUpperCase();
            this._opts = n = l({}, n || {}), this.dpr = n.devicePixelRatio || od, this._singleCanvas = i, 
            this.root = t, t.style && (U(t), t.innerHTML = ""), this.storage = e;
            var r = this._zlevelList;
            this._prevDisplayList = [];
            var o = this._layers;
            if (i) {
                var a = t, s = a.width, u = a.height;
                null != n.width && (s = n.width), null != n.height && (u = n.height), this.dpr = n.devicePixelRatio || 1, 
                a.width = s * this.dpr, a.height = u * this.dpr, this._width = s, this._height = u;
                var h = new nb(a, this, this.dpr);
                h.__builtin__ = !0, h.initContext(), o[ib] = h, h.zlevel = ib, r.push(ib), this._domRoot = t;
            } else {
                this._width = xs(t, 0, n), this._height = xs(t, 1, n);
                var c = this._domRoot = function(t, e) {
                    var n = document.createElement("div");
                    return n.style.cssText = [ "position:relative", "width:" + t + "px", "height:" + e + "px", "padding:0", "margin:0", "border-width:0" ].join(";") + ";", 
                    n;
                }(this._width, this._height);
                t.appendChild(c);
            }
        }
        return t.prototype.getType = function() {
            return "canvas";
        }, t.prototype.isSingleCanvas = function() {
            return this._singleCanvas;
        }, t.prototype.getViewportRoot = function() {
            return this._domRoot;
        }, t.prototype.getViewportRootOffset = function() {
            var t = this.getViewportRoot();
            return t ? {
                offsetLeft: t.offsetLeft || 0,
                offsetTop: t.offsetTop || 0
            } : void 0;
        }, t.prototype.refresh = function(t) {
            var e = this.storage.getDisplayList(!0), n = this._prevDisplayList, i = this._zlevelList;
            this._redrawId = Math.random(), this._paintList(e, n, t, this._redrawId);
            for (var r = 0; r < i.length; r++) {
                var o = i[r], a = this._layers[o];
                if (!a.__builtin__ && a.refresh) {
                    var s = 0 === r ? this._backgroundColor : null;
                    a.refresh(s);
                }
            }
            return this._opts.useDirtyRect && (this._prevDisplayList = e.slice()), this;
        }, t.prototype.refreshHover = function() {
            this._paintHoverList(this.storage.getDisplayList(!1));
        }, t.prototype._paintHoverList = function(t) {
            var e = t.length, n = this._hoverlayer;
            if (n && n.clear(), e) {
                for (var i, r = {
                    inHover: !0,
                    viewWidth: this._width,
                    viewHeight: this._height
                }, o = 0; e > o; o++) {
                    var a = t[o];
                    a.__inHover && (n || (n = this._hoverlayer = this.getLayer(1e5)), i || (i = n.ctx).save(), 
                    Rs(i, a, r, o === e - 1));
                }
                i && i.restore();
            }
        }, t.prototype.getHoverLayer = function() {
            return this.getLayer(1e5);
        }, t.prototype.paintOne = function(t, e) {
            Os(t, e);
        }, t.prototype._paintList = function(t, e, n, i) {
            if (this._redrawId === i) {
                n = n || !1, this._updateLayerStatus(t);
                var r = this._doPaintList(t, e, n), o = r.finished, a = r.needsRefreshHover;
                if (this._needsManuallyCompositing && this._compositeManually(), a && this._paintHoverList(t), 
                o) this.eachLayer(function(t) {
                    t.afterBrush && t.afterBrush();
                }); else {
                    var s = this;
                    mp(function() {
                        s._paintList(t, e, n, i);
                    });
                }
            }
        }, t.prototype._compositeManually = function() {
            var t = this.getLayer(ib).ctx, e = this._domRoot.width, n = this._domRoot.height;
            t.clearRect(0, 0, e, n), this.eachBuiltinLayer(function(i) {
                i.virtual && t.drawImage(i.dom, 0, 0, e, n);
            });
        }, t.prototype._doPaintList = function(t, e, n) {
            for (var i = this, r = [], o = this._opts.useDirtyRect, a = 0; a < this._zlevelList.length; a++) {
                var s = this._zlevelList[a], l = this._layers[s];
                l.__builtin__ && l !== this._hoverlayer && (l.__dirty || n) && r.push(l);
            }
            for (var u = !0, h = !1, c = function(a) {
                var s = r[a], l = s.ctx, c = o && s.createRepaintRects(t, e, p._width, p._height), d = n ? s.__startIndex : s.__drawIndex, f = !n && s.incremental && Date.now, g = f && Date.now(), y = s.zlevel === p._zlevelList[0] ? p._backgroundColor : null;
                if (s.__startIndex === s.__endIndex) s.clear(!1, y, c); else if (d === s.__startIndex) {
                    var v = t[d];
                    v.incremental && v.notClear && !n || s.clear(!1, y, c);
                }
                -1 === d && (console.error("For some unknown reason. drawIndex is -1"), d = s.__startIndex);
                var m, _ = function(e) {
                    var n = {
                        inHover: !1,
                        allClipped: !1,
                        prevEl: null,
                        viewWidth: i._width,
                        viewHeight: i._height
                    };
                    for (m = d; m < s.__endIndex; m++) {
                        var r = t[m];
                        if (r.__inHover && (h = !0), i._doPaintEl(r, s, o, e, n, m === s.__endIndex - 1), 
                        f) if (Date.now() - g > 15) break;
                    }
                    n.prevElClipPaths && l.restore();
                };
                if (c) if (0 === c.length) m = s.__endIndex; else for (var x = p.dpr, w = 0; w < c.length; ++w) {
                    var b = c[w];
                    l.save(), l.beginPath(), l.rect(b.x * x, b.y * x, b.width * x, b.height * x), l.clip(), 
                    _(b), l.restore();
                } else l.save(), _(), l.restore();
                s.__drawIndex = m, s.__drawIndex < s.__endIndex && (u = !1);
            }, p = this, d = 0; d < r.length; d++) c(d);
            return ic.wxa && f(this._layers, function(t) {
                t && t.ctx && t.ctx.draw && t.ctx.draw();
            }), {
                finished: u,
                needsRefreshHover: h
            };
        }, t.prototype._doPaintEl = function(t, e, n, i, r, o) {
            var a = e.ctx;
            if (n) {
                var s = t.getPaintRect();
                (!i || s && s.intersect(i)) && (Rs(a, t, r, o), t.setPrevPaintRect(s));
            } else Rs(a, t, r, o);
        }, t.prototype.getLayer = function(t, e) {
            this._singleCanvas && !this._needsManuallyCompositing && (t = ib);
            var n = this._layers[t];
            return n || ((n = new nb("zr_" + t, this, this.dpr)).zlevel = t, n.__builtin__ = !0, 
            this._layerConfig[t] ? s(n, this._layerConfig[t], !0) : this._layerConfig[t - .01] && s(n, this._layerConfig[t - .01], !0), 
            e && (n.virtual = e), this.insertLayer(t, n), n.initContext()), n;
        }, t.prototype.insertLayer = function(t, e) {
            var n = this._layers, i = this._zlevelList, r = i.length, o = this._domRoot, a = null, s = -1;
            if (!n[t] && function(t) {
                return !!t && (!!t.__builtin__ || "function" == typeof t.resize && "function" == typeof t.refresh);
            }(e)) {
                if (r > 0 && t > i[0]) {
                    for (s = 0; r - 1 > s && !(i[s] < t && i[s + 1] > t); s++) ;
                    a = n[i[s]];
                }
                if (i.splice(s + 1, 0, t), n[t] = e, !e.virtual) if (a) {
                    var l = a.dom;
                    l.nextSibling ? o.insertBefore(e.dom, l.nextSibling) : o.appendChild(e.dom);
                } else o.firstChild ? o.insertBefore(e.dom, o.firstChild) : o.appendChild(e.dom);
                e.__painter = this;
            }
        }, t.prototype.eachLayer = function(t, e) {
            for (var n = this._zlevelList, i = 0; i < n.length; i++) {
                var r = n[i];
                t.call(e, this._layers[r], r);
            }
        }, t.prototype.eachBuiltinLayer = function(t, e) {
            for (var n = this._zlevelList, i = 0; i < n.length; i++) {
                var r = n[i], o = this._layers[r];
                o.__builtin__ && t.call(e, o, r);
            }
        }, t.prototype.eachOtherLayer = function(t, e) {
            for (var n = this._zlevelList, i = 0; i < n.length; i++) {
                var r = n[i], o = this._layers[r];
                o.__builtin__ || t.call(e, o, r);
            }
        }, t.prototype.getLayers = function() {
            return this._layers;
        }, t.prototype._updateLayerStatus = function(t) {
            function e(t) {
                a && (a.__endIndex !== t && (a.__dirty = !0), a.__endIndex = t);
            }
            if (this.eachBuiltinLayer(function(t) {
                t.__dirty = t.__used = !1;
            }), this._singleCanvas) for (var n = 1; n < t.length; n++) {
                if ((l = t[n]).zlevel !== t[n - 1].zlevel || l.incremental) {
                    this._needsManuallyCompositing = !0;
                    break;
                }
            }
            var i, r, a = null, s = 0;
            for (r = 0; r < t.length; r++) {
                var l, u = (l = t[r]).zlevel, h = void 0;
                i !== u && (i = u, s = 0), l.incremental ? ((h = this.getLayer(u + .001, this._needsManuallyCompositing)).incremental = !0, 
                s = 1) : h = this.getLayer(u + (s > 0 ? .01 : 0), this._needsManuallyCompositing), 
                h.__builtin__ || o("ZLevel " + u + " has been used by unkown layer " + h.id), h !== a && (h.__used = !0, 
                h.__startIndex !== r && (h.__dirty = !0), h.__startIndex = r, h.__drawIndex = h.incremental ? -1 : r, 
                e(r), a = h), l.__dirty & fp && !l.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = r));
            }
            e(r), this.eachBuiltinLayer(function(t) {
                !t.__used && t.getElementCount() > 0 && (t.__dirty = !0, t.__startIndex = t.__endIndex = t.__drawIndex = 0), 
                t.__dirty && t.__drawIndex < 0 && (t.__drawIndex = t.__startIndex);
            });
        }, t.prototype.clear = function() {
            return this.eachBuiltinLayer(this._clearLayer), this;
        }, t.prototype._clearLayer = function(t) {
            t.clear();
        }, t.prototype.setBackgroundColor = function(t) {
            this._backgroundColor = t, f(this._layers, function(t) {
                t.setUnpainted();
            });
        }, t.prototype.configLayer = function(t, e) {
            if (e) {
                var n = this._layerConfig;
                n[t] ? s(n[t], e, !0) : n[t] = e;
                for (var i = 0; i < this._zlevelList.length; i++) {
                    var r = this._zlevelList[i];
                    if (r === t || r === t + .01) s(this._layers[r], n[t], !0);
                }
            }
        }, t.prototype.delLayer = function(t) {
            var e = this._layers, n = this._zlevelList, i = e[t];
            i && (i.dom.parentNode.removeChild(i.dom), delete e[t], n.splice(h(n, t), 1));
        }, t.prototype.resize = function(t, e) {
            if (this._domRoot.style) {
                var n = this._domRoot;
                n.style.display = "none";
                var i = this._opts, r = this.root;
                if (null != t && (i.width = t), null != e && (i.height = e), t = xs(r, 0, i), e = xs(r, 1, i), 
                n.style.display = "", this._width !== t || e !== this._height) {
                    for (var o in n.style.width = t + "px", n.style.height = e + "px", this._layers) this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
                    this.refresh(!0);
                }
                this._width = t, this._height = e;
            } else {
                if (null == t || null == e) return;
                this._width = t, this._height = e, this.getLayer(ib).resize(t, e);
            }
            return this;
        }, t.prototype.clearLayer = function(t) {
            var e = this._layers[t];
            e && e.clear();
        }, t.prototype.dispose = function() {
            this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
        }, t.prototype.getRenderedCanvas = function(t) {
            if (t = t || {}, this._singleCanvas && !this._compositeManually) return this._layers[ib].dom;
            var e = new nb("image", this, t.pixelRatio || this.dpr);
            e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor);
            var n = e.ctx;
            if (t.pixelRatio <= this.dpr) {
                this.refresh();
                var i = e.dom.width, r = e.dom.height;
                this.eachLayer(function(t) {
                    t.__builtin__ ? n.drawImage(t.dom, 0, 0, i, r) : t.renderToCanvas && (n.save(), 
                    t.renderToCanvas(n), n.restore());
                });
            } else for (var o = {
                inHover: !1,
                viewWidth: this._width,
                viewHeight: this._height
            }, a = this.storage.getDisplayList(!0), s = 0, l = a.length; l > s; s++) {
                var u = a[s];
                Rs(n, u, o, s === l - 1);
            }
            return e.dom;
        }, t.prototype.getWidth = function() {
            return this._width;
        }, t.prototype.getHeight = function() {
            return this._height;
        }, t;
    }(), ob = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.type = "dataset", e;
        }
        return n(e, t), e.prototype.init = function(e, n, i) {
            t.prototype.init.call(this, e, n, i), this._sourceManager = new Im(this), Ma(this);
        }, e.prototype.mergeOption = function(e, n) {
            t.prototype.mergeOption.call(this, e, n), Ma(this);
        }, e.prototype.optionUpdated = function() {
            this._sourceManager.dirty();
        }, e.prototype.getSourceManager = function() {
            return this._sourceManager;
        }, e.type = "dataset", e.defaultOption = {
            seriesLayoutBy: Pv
        }, e;
    }(mv), ab = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.type = "dataset", e;
        }
        return n(e, t), e.type = "dataset", e;
    }(Rm);
    tu([ function(t) {
        t.registerPainter("canvas", rb);
    }, function(t) {
        t.registerComponentModel(ob), t.registerComponentView(ab);
    } ]), tu(Lu);
    var sb = {
        average: function(t) {
            for (var e = 0, n = 0, i = 0; i < t.length; i++) isNaN(t[i]) || (e += t[i], n++);
            return 0 === n ? NaN : e / n;
        },
        sum: function(t) {
            for (var e = 0, n = 0; n < t.length; n++) e += t[n] || 0;
            return e;
        },
        max: function(t) {
            for (var e = -1 / 0, n = 0; n < t.length; n++) t[n] > e && (e = t[n]);
            return isFinite(e) ? e : NaN;
        },
        min: function(t) {
            for (var e = 1 / 0, n = 0; n < t.length; n++) t[n] < e && (e = t[n]);
            return isFinite(e) ? e : NaN;
        },
        nearest: function(t) {
            return t[0];
        }
    }, lb = function(t) {
        return Math.round(t.length / 2);
    }, ub = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.prototype.getInitialData = function() {
            return _l(null, this, {
                useEncodeDefaulter: !0
            });
        }, e.prototype.getMarkerPosition = function(t, e, n) {
            var i = this.coordinateSystem;
            if (i && i.clampData) {
                var r = i.clampData(t), o = i.dataToPoint(r);
                if (n) f(i.getAxes(), function(t, n) {
                    if ("category" === t.type && null != e) {
                        var i = t.getTicksCoords(), a = r[n], s = "x1" === e[n] || "y1" === e[n];
                        if (s && (a += 1), i.length < 2) return;
                        if (2 === i.length) return void (o[n] = t.toGlobalCoord(t.getExtent()[s ? 1 : 0]));
                        for (var l = void 0, u = void 0, h = 1, c = 0; c < i.length; c++) {
                            var p = i[c].coord, d = c === i.length - 1 ? i[c - 1].tickValue + h : i[c].tickValue;
                            if (d === a) {
                                u = p;
                                break;
                            }
                            if (a > d) l = p; else if (null != l && d > a) {
                                u = (p + l) / 2;
                                break;
                            }
                            1 === c && (h = d - i[0].tickValue);
                        }
                        null == u && (l ? l && (u = i[i.length - 1].coord) : u = i[0].coord), o[n] = t.toGlobalCoord(u);
                    }
                }); else {
                    var a = this.getData(), s = a.getLayout("offset"), l = a.getLayout("size"), u = i.getBaseAxis().isHorizontal() ? 0 : 1;
                    o[u] += s + l / 2;
                }
                return o;
            }
            return [ NaN, NaN ];
        }, e.type = "series.__base_bar__", e.defaultOption = {
            z: 2,
            coordinateSystem: "cartesian2d",
            legendHoverLink: !0,
            barMinHeight: 0,
            barMinAngle: 0,
            large: !1,
            largeThreshold: 400,
            progressive: 3e3,
            progressiveChunkMode: "mod"
        }, e;
    }(Om);
    Om.registerClass(ub);
    var hb = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.prototype.getInitialData = function() {
            return _l(null, this, {
                useEncodeDefaulter: !0,
                createInvertedIndices: !!this.get("realtimeSort", !0) || null
            });
        }, e.prototype.getProgressive = function() {
            return !!this.get("large") && this.get("progressive");
        }, e.prototype.getProgressiveThreshold = function() {
            var t = this.get("progressiveThreshold"), e = this.get("largeThreshold");
            return e > t && (t = e), t;
        }, e.prototype.brushSelector = function(t, e, n) {
            return n.rect(e.getItemLayout(t));
        }, e.type = "series.bar", e.dependencies = [ "grid", "polar" ], e.defaultOption = Kr(ub.defaultOption, {
            clip: !0,
            roundCap: !1,
            showBackground: !1,
            backgroundStyle: {
                color: "rgba(180, 180, 180, 0.2)",
                borderColor: null,
                borderWidth: 0,
                borderType: "solid",
                borderRadius: 0,
                shadowBlur: 0,
                shadowColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1
            },
            select: {
                itemStyle: {
                    borderColor: "#212121"
                }
            },
            realtimeSort: !1
        }), e;
    }(ub), cb = function() {
        this.cx = 0, this.cy = 0, this.r0 = 0, this.r = 0, this.startAngle = 0, this.endAngle = 2 * Math.PI, 
        this.clockwise = !0;
    }, pb = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return n.type = "sausage", n;
        }
        return n(e, t), e.prototype.getDefaultShape = function() {
            return new cb();
        }, e.prototype.buildPath = function(t, e) {
            var n = e.cx, i = e.cy, r = Math.max(e.r0 || 0, 0), o = Math.max(e.r, 0), a = .5 * (o - r), s = r + a, l = e.startAngle, u = e.endAngle, h = e.clockwise, c = 2 * Math.PI, p = h ? c > u - l : c > l - u;
            p || (l = u - (h ? c : -c));
            var d = Math.cos(l), f = Math.sin(l), g = Math.cos(u), y = Math.sin(u);
            p ? (t.moveTo(d * r + n, f * r + i), t.arc(d * s + n, f * s + i, a, -Math.PI + l, l, !h)) : t.moveTo(d * o + n, f * o + i), 
            t.arc(n, i, o, l, u, !h), t.arc(g * s + n, y * s + i, a, u - 2 * Math.PI, u - Math.PI, !h), 
            0 !== r && t.arc(n, i, r, u, l, h);
        }, e;
    }(Hf), db = Math.max, fb = Math.min, gb = function(t) {
        function e() {
            var n = t.call(this) || this;
            return n.type = e.type, n._isFirstFrame = !0, n;
        }
        return n(e, t), e.prototype.render = function(t, e, n, i) {
            this._model = t, this._removeOnRenderedListener(n), this._updateDrawMode(t);
            var r = t.get("coordinateSystem");
            ("cartesian2d" === r || "polar" === r) && (this._progressiveEls = null, this._isLargeDraw ? this._renderLarge(t, e, n) : this._renderNormal(t, e, n, i));
        }, e.prototype.incrementalPrepareRender = function(t) {
            this._clear(), this._updateDrawMode(t), this._updateLargeClip(t);
        }, e.prototype.incrementalRender = function(t, e) {
            this._progressiveEls = [], this._incrementalRenderLarge(t, e);
        }, e.prototype.eachRendered = function(t) {
            Vr(this._progressiveEls || this.group, t);
        }, e.prototype._updateDrawMode = function(t) {
            var e = t.pipelineContext.large;
            (null == this._isLargeDraw || e !== this._isLargeDraw) && (this._isLargeDraw = e, 
            this._clear());
        }, e.prototype._renderNormal = function(t, e, n, i) {
            function r(t) {
                var e = wb[u.type](s, t), n = function(t, e, n) {
                    return new ("polar" === t.type ? $g : Kf)({
                        shape: Xu(e, n, t),
                        silent: !0,
                        z2: 0
                    });
                }(u, o, e);
                return n.useStyle(v.getItemStyle()), "cartesian2d" === u.type ? n.setShape("r", m) : n.setShape("cornerRadius", m), 
                _[t] = n, n;
            }
            var o, a = this.group, s = t.getData(), l = this._data, u = t.coordinateSystem, h = u.getBaseAxis();
            "cartesian2d" === u.type ? o = h.isHorizontal() : "polar" === u.type && (o = "angle" === h.dim);
            var c = t.isAnimationEnabled() ? t : null, p = function(t, e) {
                var n = t.get("realtimeSort", !0), i = e.getBaseAxis();
                return n && "category" === i.type && "cartesian2d" === e.type ? {
                    baseAxis: i,
                    otherAxis: e.getOtherAxis(i)
                } : void 0;
            }(t, u);
            p && this._enableRealtimeSort(p, s, n);
            var d = t.get("clip", !0) || p, f = function(t, e) {
                var n = t.getArea && t.getArea();
                if (Bu(t, "cartesian2d")) {
                    var i = t.getBaseAxis();
                    if ("category" !== i.type || !i.onBand) {
                        var r = e.getLayout("bandWidth");
                        i.isHorizontal() ? (n.x -= r, n.width += 2 * r) : (n.y -= r, n.height += 2 * r);
                    }
                }
                return n;
            }(u, s);
            a.removeClipPath();
            var g = t.get("roundCap", !0), y = t.get("showBackground", !0), v = t.getModel("backgroundStyle"), m = v.get("borderRadius") || 0, _ = [], x = this._backgroundEls, w = i && i.isInitSort, b = i && "changeAxisOrder" === i.type;
            s.diff(l).add(function(e) {
                var n = s.getItemModel(e), i = wb[u.type](s, e, n);
                if (y && r(e), s.hasValue(e) && xb[u.type](i)) {
                    var l = !1;
                    d && (l = yb[u.type](f, i));
                    var v = vb[u.type](t, s, e, i, o, c, h.model, !1, g);
                    p && (v.forceLabelAnimation = !0), Gu(v, s, e, n, i, t, o, "polar" === u.type), 
                    w ? v.attr({
                        shape: i
                    }) : p ? Vu(p, c, v, i, e, o, !1, !1) : gr(v, {
                        shape: i
                    }, t, e), s.setItemGraphicEl(e, v), a.add(v), v.ignore = l;
                }
            }).update(function(e, n) {
                var i = s.getItemModel(e), S = wb[u.type](s, e, i);
                if (y) {
                    var M = void 0;
                    0 === x.length ? M = r(n) : ((M = x[n]).useStyle(v.getItemStyle()), "cartesian2d" === u.type ? M.setShape("r", m) : M.setShape("cornerRadius", m), 
                    _[e] = M);
                    var T = wb[u.type](s, e);
                    fr(M, {
                        shape: Xu(o, T, u)
                    }, c, e);
                }
                var C = l.getItemGraphicEl(n);
                if (s.hasValue(e) && xb[u.type](S)) {
                    var I = !1;
                    if (d && ((I = yb[u.type](f, S)) && a.remove(C)), C ? function(t) {
                        Sy(t).oldStyle = t.style;
                    }(C) : C = vb[u.type](t, s, e, S, o, c, h.model, !!C, g), p && (C.forceLabelAnimation = !0), 
                    b) {
                        var k = C.getTextContent();
                        if (k) {
                            var D = By(k);
                            null != D.prevValue && (D.prevValue = D.value);
                        }
                    } else Gu(C, s, e, i, S, t, o, "polar" === u.type);
                    w ? C.attr({
                        shape: S
                    }) : p ? Vu(p, c, C, S, e, o, !0, b) : fr(C, {
                        shape: S
                    }, t, e, null), s.setItemGraphicEl(e, C), C.ignore = I, a.add(C);
                } else a.remove(C);
            }).remove(function(e) {
                var n = l.getItemGraphicEl(e);
                n && _r(n, t, e);
            }).execute();
            var S = this._backgroundGroup || (this._backgroundGroup = new Md());
            S.removeAll();
            for (var M = 0; M < _.length; ++M) S.add(_[M]);
            a.add(S), this._backgroundEls = _, this._data = s;
        }, e.prototype._renderLarge = function(t) {
            this._clear(), Uu(t, this.group), this._updateLargeClip(t);
        }, e.prototype._incrementalRenderLarge = function(t, e) {
            this._removeBackground(), Uu(e, this.group, this._progressiveEls, !0);
        }, e.prototype._updateLargeClip = function(t) {
            var e = t.get("clip", !0) && Ru(t.coordinateSystem, !1, t), n = this.group;
            e ? n.setClipPath(e) : n.removeClipPath();
        }, e.prototype._enableRealtimeSort = function(t, e, n) {
            var i = this;
            if (e.count()) {
                var r = t.baseAxis;
                if (this._isFirstFrame) this._dispatchInitSort(e, t, n), this._isFirstFrame = !1; else {
                    var o = function(t) {
                        var n = e.getItemGraphicEl(t), i = n && n.shape;
                        return i && Math.abs(r.isHorizontal() ? i.height : i.width) || 0;
                    };
                    this._onRendered = function() {
                        i._updateSortWithinSameData(e, o, r, n);
                    }, n.getZr().on("rendered", this._onRendered);
                }
            }
        }, e.prototype._dataSort = function(t, e, n) {
            var i = [];
            return t.each(t.mapDimension(e.dim), function(t, e) {
                var r = n(e);
                r = null == r ? NaN : r, i.push({
                    dataIndex: e,
                    mappedValue: r,
                    ordinalNumber: t
                });
            }), i.sort(function(t, e) {
                return e.mappedValue - t.mappedValue;
            }), {
                ordinalNumbers: g(i, function(t) {
                    return t.ordinalNumber;
                })
            };
        }, e.prototype._isOrderChangedWithinSameData = function(t, e, n) {
            for (var i = n.scale, r = t.mapDimension(n.dim), o = Number.MAX_VALUE, a = 0, s = i.getOrdinalMeta().categories.length; s > a; ++a) {
                var l = t.rawIndexOf(r, i.getRawOrdinalNumber(a)), u = 0 > l ? Number.MIN_VALUE : e(t.indexOfRawIndex(l));
                if (u > o) return !0;
                o = u;
            }
            return !1;
        }, e.prototype._isOrderDifferentInView = function(t, e) {
            for (var n = e.scale, i = n.getExtent(), r = Math.max(0, i[0]), o = Math.min(i[1], n.getOrdinalMeta().categories.length - 1); o >= r; ++r) if (t.ordinalNumbers[r] !== n.getRawOrdinalNumber(r)) return !0;
        }, e.prototype._updateSortWithinSameData = function(t, e, n, i) {
            if (this._isOrderChangedWithinSameData(t, e, n)) {
                var r = this._dataSort(t, n, e);
                this._isOrderDifferentInView(r, n) && (this._removeOnRenderedListener(i), i.dispatchAction({
                    type: "changeAxisOrder",
                    componentType: n.dim + "Axis",
                    axisId: n.index,
                    sortInfo: r
                }));
            }
        }, e.prototype._dispatchInitSort = function(t, e, n) {
            var i = e.baseAxis, r = this._dataSort(t, i, function(n) {
                return t.get(t.mapDimension(e.otherAxis.dim), n);
            });
            n.dispatchAction({
                type: "changeAxisOrder",
                componentType: i.dim + "Axis",
                isInitSort: !0,
                axisId: i.index,
                sortInfo: r
            });
        }, e.prototype.remove = function(t, e) {
            this._clear(this._model), this._removeOnRenderedListener(e);
        }, e.prototype.dispose = function(t, e) {
            this._removeOnRenderedListener(e);
        }, e.prototype._removeOnRenderedListener = function(t) {
            this._onRendered && (t.getZr().off("rendered", this._onRendered), this._onRendered = null);
        }, e.prototype._clear = function(t) {
            var e = this.group, n = this._data;
            t && t.isAnimationEnabled() && n && !this._isLargeDraw ? (this._removeBackground(), 
            this._backgroundEls = [], n.eachItemGraphicEl(function(e) {
                _r(e, t, ig(e).dataIndex);
            })) : e.removeAll(), this._data = null, this._isFirstFrame = !0;
        }, e.prototype._removeBackground = function() {
            this.group.remove(this._backgroundGroup), this._backgroundGroup = null;
        }, e.type = "bar", e;
    }(zm), yb = {
        cartesian2d: function(t, e) {
            var n = e.width < 0 ? -1 : 1, i = e.height < 0 ? -1 : 1;
            0 > n && (e.x += e.width, e.width = -e.width), 0 > i && (e.y += e.height, e.height = -e.height);
            var r = t.x + t.width, o = t.y + t.height, a = db(e.x, t.x), s = fb(e.x + e.width, r), l = db(e.y, t.y), u = fb(e.y + e.height, o), h = a > s, c = l > u;
            return e.x = h && a > r ? s : a, e.y = c && l > o ? u : l, e.width = h ? 0 : s - a, 
            e.height = c ? 0 : u - l, 0 > n && (e.x += e.width, e.width = -e.width), 0 > i && (e.y += e.height, 
            e.height = -e.height), h || c;
        },
        polar: function(t, e) {
            var n = e.r0 <= e.r ? 1 : -1;
            if (0 > n) {
                var i = e.r;
                e.r = e.r0, e.r0 = i;
            }
            var r = fb(e.r, t.r), o = db(e.r0, t.r0);
            e.r = r, e.r0 = o;
            var a = 0 > r - o;
            if (0 > n) {
                i = e.r;
                e.r = e.r0, e.r0 = i;
            }
            return a;
        }
    }, vb = {
        cartesian2d: function(t, e, n, i, r, o) {
            var a = new Kf({
                shape: l({}, i),
                z2: 1
            });
            (a.__dataIndex = n, a.name = "item", o) && (a.shape[r ? "height" : "width"] = 0);
            return a;
        },
        polar: function(t, e, n, i, r, o, a, s, l) {
            var u = !r && l ? pb : $g, h = new u({
                shape: i,
                z2: 1
            });
            h.name = "item";
            var c = Wu(r);
            if (h.calculateTextPosition = function(t, e) {
                var n = (e = e || {}).isRoundCap;
                return function(e, i, r) {
                    var o = i.position;
                    if (!o || o instanceof Array) return He(e, i, r);
                    var a = t(o), s = null != i.distance ? i.distance : 5, l = this.shape, u = l.cx, h = l.cy, c = l.r, p = l.r0, d = (c + p) / 2, f = l.startAngle, g = l.endAngle, y = (f + g) / 2, v = n ? Math.abs(c - p) / 2 : 0, m = Math.cos, _ = Math.sin, x = u + c * m(f), w = h + c * _(f), b = "left", S = "top";
                    switch (a) {
                      case "startArc":
                        x = u + (p - s) * m(y), w = h + (p - s) * _(y), b = "center", S = "top";
                        break;

                      case "insideStartArc":
                        x = u + (p + s) * m(y), w = h + (p + s) * _(y), b = "center", S = "bottom";
                        break;

                      case "startAngle":
                        x = u + d * m(f) + zu(f, s + v, !1), w = h + d * _(f) + Nu(f, s + v, !1), b = "right", 
                        S = "middle";
                        break;

                      case "insideStartAngle":
                        x = u + d * m(f) + zu(f, -s + v, !1), w = h + d * _(f) + Nu(f, -s + v, !1), b = "left", 
                        S = "middle";
                        break;

                      case "middle":
                        x = u + d * m(y), w = h + d * _(y), b = "center", S = "middle";
                        break;

                      case "endArc":
                        x = u + (c + s) * m(y), w = h + (c + s) * _(y), b = "center", S = "bottom";
                        break;

                      case "insideEndArc":
                        x = u + (c - s) * m(y), w = h + (c - s) * _(y), b = "center", S = "top";
                        break;

                      case "endAngle":
                        x = u + d * m(g) + zu(g, s + v, !0), w = h + d * _(g) + Nu(g, s + v, !0), b = "left", 
                        S = "middle";
                        break;

                      case "insideEndAngle":
                        x = u + d * m(g) + zu(g, -s + v, !0), w = h + d * _(g) + Nu(g, -s + v, !0), b = "right", 
                        S = "middle";
                        break;

                      default:
                        return He(e, i, r);
                    }
                    return (e = e || {}).x = x, e.y = w, e.align = b, e.verticalAlign = S, e;
                };
            }(c, {
                isRoundCap: u === pb
            }), o) {
                var p = r ? "r" : "endAngle", d = {};
                h.shape[p] = r ? i.r0 : i.startAngle, d[p] = i[p], (s ? fr : gr)(h, {
                    shape: d
                }, o);
            }
            return h;
        }
    }, mb = [ "x", "y", "width", "height" ], _b = [ "cx", "cy", "r", "startAngle", "endAngle" ], xb = {
        cartesian2d: function(t) {
            return !Hu(t, mb);
        },
        polar: function(t) {
            return !Hu(t, _b);
        }
    }, wb = {
        cartesian2d: function(t, e, n) {
            var i = t.getItemLayout(e), r = n ? function(t, e) {
                var n = t.get([ "itemStyle", "borderColor" ]);
                if (!n || "none" === n) return 0;
                var i = t.get([ "itemStyle", "borderWidth" ]) || 0, r = isNaN(e.width) ? Number.MAX_VALUE : Math.abs(e.width), o = isNaN(e.height) ? Number.MAX_VALUE : Math.abs(e.height);
                return Math.min(i, r, o);
            }(n, i) : 0, o = i.width > 0 ? 1 : -1, a = i.height > 0 ? 1 : -1;
            return {
                x: i.x + o * r / 2,
                y: i.y + a * r / 2,
                width: i.width - o * r,
                height: i.height - a * r
            };
        },
        polar: function(t, e) {
            var n = t.getItemLayout(e);
            return {
                cx: n.cx,
                cy: n.cy,
                r0: n.r0,
                r: n.r,
                startAngle: n.startAngle,
                endAngle: n.endAngle,
                clockwise: n.clockwise
            };
        }
    }, bb = function() {}, Sb = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return n.type = "largeBar", n;
        }
        return n(e, t), e.prototype.getDefaultShape = function() {
            return new bb();
        }, e.prototype.buildPath = function(t, e) {
            for (var n = e.points, i = this.baseDimIdx, r = 1 - this.baseDimIdx, o = [], a = [], s = this.barWidth, l = 0; l < n.length; l += 3) a[i] = s, 
            a[r] = n[l + 2], o[i] = n[l + i], o[r] = n[l + r], t.rect(o[0], o[1], a[0], a[1]);
        }, e;
    }(Hf), Mb = Qa(function(t) {
        var e = function(t, e, n) {
            for (var i = t.baseDimIdx, r = 1 - i, o = t.shape.points, a = t.largeDataIndices, s = [], l = [], u = t.barWidth, h = 0, c = o.length / 3; c > h; h++) {
                var p = 3 * h;
                if (l[i] = u, l[r] = o[p + 2], s[i] = o[p + i], s[r] = o[p + r], l[r] < 0 && (s[r] += l[r], 
                l[r] = -l[r]), e >= s[0] && e <= s[0] + l[0] && n >= s[1] && n <= s[1] + l[1]) return a[h];
            }
            return -1;
        }(this, t.offsetX, t.offsetY);
        ig(this).dataIndex = e >= 0 ? e : null;
    }, 30, !1);
    tu(function(t) {
        t.registerChartView(gb), t.registerSeriesModel(hb), t.registerLayout(t.PRIORITY.VISUAL.LAYOUT, _(Rl, "bar")), 
        t.registerLayout(t.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT, function(t) {
            return {
                seriesType: t,
                plan: qa(),
                reset: function(t) {
                    if (Bl(t)) {
                        var e = t.getData(), n = t.coordinateSystem, i = n.getBaseAxis(), r = n.getOtherAxis(i), o = e.getDimensionIndex(e.mapDimension(r.dim)), a = e.getDimensionIndex(e.mapDimension(i.dim)), s = t.get("showBackground", !0), l = e.mapDimension(r.dim), u = e.getCalculationInfo("stackResultDimension"), h = yl(e, l) && !!e.getCalculationInfo("stackedOnSeries"), c = r.isHorizontal(), p = function(t, e) {
                            return e.toGlobalCoord(e.dataToCoord("log" === e.type ? 1 : 0));
                        }(0, r), d = El(t), f = t.get("barMinHeight") || 0, g = u && e.getDimensionIndex(u), y = e.getLayout("size"), v = e.getLayout("offset");
                        return {
                            progress: function(t, e) {
                                for (var i, r = t.count, l = d && Dl(3 * r), u = d && s && Dl(3 * r), m = d && Dl(r), _ = n.master.getRect(), x = c ? _.width : _.height, w = e.getStore(), b = 0; null != (i = t.next()); ) {
                                    var S = w.get(h ? g : o, i), M = w.get(a, i), T = p, C = void 0;
                                    h && (C = +S - w.get(o, i));
                                    var I = void 0, k = void 0, D = void 0, A = void 0;
                                    if (c) {
                                        var P = n.dataToPoint([ S, M ]);
                                        if (h) T = n.dataToPoint([ C, M ])[0];
                                        I = T, k = P[1] + v, D = P[0] - T, A = y, Math.abs(D) < f && (D = (0 > D ? -1 : 1) * f);
                                    } else {
                                        P = n.dataToPoint([ M, S ]);
                                        if (h) T = n.dataToPoint([ M, C ])[1];
                                        I = P[0] + v, k = T, D = y, A = P[1] - T, Math.abs(A) < f && (A = (0 >= A ? -1 : 1) * f);
                                    }
                                    d ? (l[b] = I, l[b + 1] = k, l[b + 2] = c ? D : A, u && (u[b] = c ? _.x : I, u[b + 1] = c ? k : _.y, 
                                    u[b + 2] = x), m[i] = i) : e.setItemLayout(i, {
                                        x: I,
                                        y: k,
                                        width: D,
                                        height: A
                                    }), b += 3;
                                }
                                d && e.setLayout({
                                    largePoints: l,
                                    largeDataIndices: m,
                                    largeBackgroundPoints: u,
                                    valueAxisHorizontal: c
                                });
                            }
                        };
                    }
                }
            };
        }("bar")), t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC, function(t) {
            return {
                seriesType: t,
                reset: function(t, e, n) {
                    var i = t.getData(), r = t.get("sampling"), o = t.coordinateSystem, a = i.count();
                    if (a > 10 && "cartesian2d" === o.type && r) {
                        var s = o.getBaseAxis(), l = o.getOtherAxis(s), u = s.getExtent(), h = n.getDevicePixelRatio(), c = Math.abs(u[1] - u[0]) * (h || 1), p = Math.round(a / c);
                        if (isFinite(p) && p > 1) {
                            "lttb" === r && t.setData(i.lttbDownSample(i.mapDimension(l.dim), 1 / p));
                            var d = void 0;
                            b(r) ? d = sb[r] : w(r) && (d = r), d && t.setData(i.downSample(i.mapDimension(l.dim), 1 / p, d, lb));
                        }
                    }
                }
            };
        }("bar")), t.registerAction({
            type: "changeAxisOrder",
            event: "changeAxisOrder",
            update: "update"
        }, function(t, e) {
            var n = t.componentType || "series";
            e.eachComponent({
                mainType: n,
                query: t
            }, function(e) {
                t.sortInfo && e.axis.setCategorySortInfo(t.sortInfo);
            });
        });
    });
    var Tb = function() {
        this.angle = 0, this.width = 10, this.r = 10, this.x = 0, this.y = 0;
    }, Cb = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return n.type = "pointer", n;
        }
        return n(e, t), e.prototype.getDefaultShape = function() {
            return new Tb();
        }, e.prototype.buildPath = function(t, e) {
            var n = Math.cos, i = Math.sin, r = e.r, o = e.width, a = e.angle, s = e.x - n(a) * o * (o >= r / 3 ? 1 : 2), l = e.y - i(a) * o * (o >= r / 3 ? 1 : 2);
            a = e.angle - Math.PI / 2, t.moveTo(s, l), t.lineTo(e.x + n(a) * o, e.y + i(a) * o), 
            t.lineTo(e.x + n(e.angle) * r, e.y + i(e.angle) * r), t.lineTo(e.x - n(a) * o, e.y - i(a) * o), 
            t.lineTo(s, l);
        }, e;
    }(Hf), Ib = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.prototype.render = function(t, e, n) {
            this.group.removeAll();
            var i = t.get([ "axisLine", "lineStyle", "color" ]), r = function(t, e) {
                var n = t.get("center"), i = e.getWidth(), r = e.getHeight(), o = Math.min(i, r);
                return {
                    cx: Ze(n[0], e.getWidth()),
                    cy: Ze(n[1], e.getHeight()),
                    r: Ze(t.get("radius"), o / 2)
                };
            }(t, n);
            this._renderMain(t, e, n, i, r), this._data = t.getData();
        }, e.prototype.dispose = function() {}, e.prototype._renderMain = function(t, e, n, i, r) {
            var o = this.group, a = t.get("clockwise"), s = -t.get("startAngle") / 180 * Math.PI, l = -t.get("endAngle") / 180 * Math.PI, u = t.getModel("axisLine"), h = u.get("roundCap") ? pb : $g, c = u.get("show"), p = u.getModel("lineStyle"), d = p.get("width"), g = [ s, l ];
            Jn(g, !a);
            for (var y = (l = g[1]) - (s = g[0]), v = s, m = [], _ = 0; c && _ < i.length; _++) {
                var x = new h({
                    shape: {
                        startAngle: v,
                        endAngle: l = s + y * Math.min(Math.max(i[_][0], 0), 1),
                        cx: r.cx,
                        cy: r.cy,
                        clockwise: a,
                        r0: r.r - d,
                        r: r.r
                    },
                    silent: !0
                });
                x.setStyle({
                    fill: i[_][1]
                }), x.setStyle(p.getLineStyle([ "color", "width" ])), m.push(x), v = l;
            }
            m.reverse(), f(m, function(t) {
                return o.add(t);
            });
            var w = function(t) {
                if (0 >= t) return i[0][1];
                var e;
                for (e = 0; e < i.length; e++) if (i[e][0] >= t && (0 === e ? 0 : i[e - 1][0]) < t) return i[e][1];
                return i[e - 1][1];
            };
            this._renderTicks(t, e, n, w, r, s, l, a, d), this._renderTitleAndDetail(t, e, n, w, r), 
            this._renderAnchor(t, r), this._renderPointer(t, e, n, w, r, s, l, a, d);
        }, e.prototype._renderTicks = function(t, e, n, i, r, o, a, s, l) {
            for (var u, h, c = this.group, p = r.cx, d = r.cy, f = r.r, g = +t.get("min"), y = +t.get("max"), v = t.getModel("splitLine"), m = t.getModel("axisTick"), _ = t.getModel("axisLabel"), x = t.get("splitNumber"), w = m.get("splitNumber"), b = Ze(v.get("length"), f), S = Ze(m.get("length"), f), T = o, C = (a - o) / x, I = C / w, k = v.getModel("lineStyle").getLineStyle(), D = m.getModel("lineStyle").getLineStyle(), A = v.get("distance"), P = 0; x >= P; P++) {
                if (u = Math.cos(T), h = Math.sin(T), v.get("show")) {
                    var L = new ay({
                        shape: {
                            x1: u * (f - (O = A ? A + l : l)) + p,
                            y1: h * (f - O) + d,
                            x2: u * (f - b - O) + p,
                            y2: h * (f - b - O) + d
                        },
                        style: k,
                        silent: !0
                    });
                    "auto" === k.stroke && L.setStyle({
                        stroke: i(P / x)
                    }), c.add(L);
                }
                if (_.get("show")) {
                    var O = _.get("distance") + A, R = Yu(Ke(P / x * (y - g) + g), _.get("formatter")), B = i(P / x), E = u * (f - b - O) + p, z = h * (f - b - O) + d, N = _.get("rotate"), F = 0;
                    "radial" === N ? (F = -T + 2 * Math.PI) > Math.PI / 2 && (F += Math.PI) : "tangential" === N ? F = -T - Math.PI / 2 : M(N) && (F = N * Math.PI / 180), 
                    c.add(new Jf(0 === F ? {
                        style: Ur(_, {
                            text: R,
                            x: E,
                            y: z,
                            verticalAlign: -.8 > h ? "top" : h > .8 ? "bottom" : "middle",
                            align: -.4 > u ? "left" : u > .4 ? "right" : "center"
                        }, {
                            inheritColor: B
                        }),
                        silent: !0
                    } : {
                        style: Ur(_, {
                            text: R,
                            x: E,
                            y: z,
                            verticalAlign: "middle",
                            align: "center"
                        }, {
                            inheritColor: B
                        }),
                        silent: !0,
                        originX: E,
                        originY: z,
                        rotation: F
                    }));
                }
                if (m.get("show") && P !== x) {
                    O = (O = m.get("distance")) ? O + l : l;
                    for (var V = 0; w >= V; V++) {
                        u = Math.cos(T), h = Math.sin(T);
                        var H = new ay({
                            shape: {
                                x1: u * (f - O) + p,
                                y1: h * (f - O) + d,
                                x2: u * (f - S - O) + p,
                                y2: h * (f - S - O) + d
                            },
                            silent: !0,
                            style: D
                        });
                        "auto" === D.stroke && H.setStyle({
                            stroke: i((P + V / w) / x)
                        }), c.add(H), T += I;
                    }
                    T -= I;
                } else T += C;
            }
        }, e.prototype._renderPointer = function(t, e, n, i, r, o, a, s, u) {
            function h(e, n) {
                var i, o = _.getItemModel(e).getModel("pointer"), a = Ze(o.get("width"), r.r), s = Ze(o.get("length"), r.r), l = t.get([ "pointer", "icon" ]), u = o.get("offsetCenter"), h = Ze(u[0], r.r), c = Ze(u[1], r.r), p = o.get("keepAspect");
                return (i = l ? ys(l, h - a / 2, c - s, a, s, null, p) : new Cb({
                    shape: {
                        angle: -Math.PI / 2,
                        width: a,
                        r: s,
                        x: h,
                        y: c
                    }
                })).rotation = -(n + Math.PI / 2), i.x = r.cx, i.y = r.cy, i;
            }
            function c(t, e) {
                var n = v.get("roundCap") ? pb : $g, i = v.get("overlap"), a = i ? v.get("width") : u / _.count(), l = i ? r.r - a : r.r - (t + 1) * a, h = i ? r.r : r.r - t * a, c = new n({
                    shape: {
                        startAngle: o,
                        endAngle: e,
                        cx: r.cx,
                        cy: r.cy,
                        clockwise: s,
                        r0: l,
                        r: h
                    }
                });
                return i && (c.z2 = b - _.get(x, t) % b), c;
            }
            var p = this.group, d = this._data, f = this._progressEls, g = [], y = t.get([ "pointer", "show" ]), v = t.getModel("progress"), m = v.get("show"), _ = t.getData(), x = _.mapDimension("value"), w = +t.get("min"), b = +t.get("max"), S = [ w, b ], M = [ o, a ];
            (m || y) && (_.diff(d).add(function(e) {
                var n = _.get(x, e);
                if (y) {
                    var i = h(e, o);
                    gr(i, {
                        rotation: -((isNaN(+n) ? M[0] : je(n, S, M, !0)) + Math.PI / 2)
                    }, t), p.add(i), _.setItemGraphicEl(e, i);
                }
                if (m) {
                    var r = c(e, o), a = v.get("clip");
                    gr(r, {
                        shape: {
                            endAngle: je(n, S, M, a)
                        }
                    }, t), p.add(r), rg(t.seriesIndex, _.dataType, e, r), g[e] = r;
                }
            }).update(function(e, n) {
                var i = _.get(x, e);
                if (y) {
                    var r = d.getItemGraphicEl(n), a = r ? r.rotation : o, s = h(e, a);
                    s.rotation = a, fr(s, {
                        rotation: -((isNaN(+i) ? M[0] : je(i, S, M, !0)) + Math.PI / 2)
                    }, t), p.add(s), _.setItemGraphicEl(e, s);
                }
                if (m) {
                    var l = f[n], u = c(e, l ? l.shape.endAngle : o), w = v.get("clip");
                    fr(u, {
                        shape: {
                            endAngle: je(i, S, M, w)
                        }
                    }, t), p.add(u), rg(t.seriesIndex, _.dataType, e, u), g[e] = u;
                }
            }).execute(), _.each(function(t) {
                var e = _.getItemModel(t), n = e.getModel("emphasis"), r = n.get("focus"), o = n.get("blurScope"), a = n.get("disabled");
                if (y) {
                    var s = _.getItemGraphicEl(t), u = _.getItemVisual(t, "style"), h = u.fill;
                    if (s instanceof Yf) {
                        var c = s.style;
                        s.useStyle(l({
                            image: c.image,
                            x: c.x,
                            y: c.y,
                            width: c.width,
                            height: c.height
                        }, u));
                    } else s.useStyle(u), "pointer" !== s.type && s.setColor(h);
                    s.setStyle(e.getModel([ "pointer", "itemStyle" ]).getItemStyle()), "auto" === s.style.fill && s.setStyle("fill", i(je(_.get(x, t), S, [ 0, 1 ], !0))), 
                    s.z2EmphasisLift = 0, $i(s, e), Ki(s, r, o, a);
                }
                if (m) {
                    var p = g[t];
                    p.useStyle(_.getItemVisual(t, "style")), p.setStyle(e.getModel([ "progress", "itemStyle" ]).getItemStyle()), 
                    p.z2EmphasisLift = 0, $i(p, e), Ki(p, r, o, a);
                }
            }), this._progressEls = g);
        }, e.prototype._renderAnchor = function(t, e) {
            var n = t.getModel("anchor");
            if (n.get("show")) {
                var i = n.get("size"), r = n.get("icon"), o = n.get("offsetCenter"), a = n.get("keepAspect"), s = ys(r, e.cx - i / 2 + Ze(o[0], e.r), e.cy - i / 2 + Ze(o[1], e.r), i, i, null, a);
                s.z2 = n.get("showAbove") ? 1 : 0, s.setStyle(n.getModel("itemStyle").getItemStyle()), 
                this.group.add(s);
            }
        }, e.prototype._renderTitleAndDetail = function(t, e, n, i, r) {
            var o = this, a = t.getData(), s = a.mapDimension("value"), l = +t.get("min"), u = +t.get("max"), h = new Md(), c = [], p = [], d = t.isAnimationEnabled(), f = t.get([ "pointer", "showAbove" ]);
            a.diff(this._data).add(function(t) {
                c[t] = new Jf({
                    silent: !0
                }), p[t] = new Jf({
                    silent: !0
                });
            }).update(function(t, e) {
                c[t] = o._titleEls[e], p[t] = o._detailEls[e];
            }).execute(), a.each(function(e) {
                var n = a.getItemModel(e), o = a.get(s, e), g = new Md(), y = i(je(o, [ l, u ], [ 0, 1 ], !0)), v = n.getModel("title");
                if (v.get("show")) {
                    var m = v.get("offsetCenter"), _ = r.cx + Ze(m[0], r.r), x = r.cy + Ze(m[1], r.r);
                    (k = c[e]).attr({
                        z2: f ? 0 : 2,
                        style: Ur(v, {
                            x: _,
                            y: x,
                            text: a.getName(e),
                            align: "center",
                            verticalAlign: "middle"
                        }, {
                            inheritColor: y
                        })
                    }), g.add(k);
                }
                var w = n.getModel("detail");
                if (w.get("show")) {
                    var b = w.get("offsetCenter"), S = r.cx + Ze(b[0], r.r), M = r.cy + Ze(b[1], r.r), T = Ze(w.get("width"), r.r), C = Ze(w.get("height"), r.r), I = t.get([ "progress", "show" ]) ? a.getItemVisual(e, "style").fill : y, k = p[e], D = w.get("formatter");
                    k.attr({
                        z2: f ? 0 : 2,
                        style: Ur(w, {
                            x: S,
                            y: M,
                            text: Yu(o, D),
                            width: isNaN(T) ? null : T,
                            height: isNaN(C) ? null : C,
                            align: "center",
                            verticalAlign: "middle"
                        }, {
                            inheritColor: I
                        })
                    }), qr(k, {
                        normal: w
                    }, o, function(t) {
                        return Yu(t, D);
                    }), d && jr(k, e, a, t, {
                        getFormattedLabel: function(t, e, n, i, r, a) {
                            return Yu(a ? a.interpolatedValue : o, D);
                        }
                    }), g.add(k);
                }
                h.add(g);
            }), this.group.add(h), this._titleEls = c, this._detailEls = p;
        }, e.type = "gauge", e;
    }(zm), kb = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n.visualStyleAccessPath = "itemStyle", n;
        }
        return n(e, t), e.prototype.getInitialData = function() {
            return function(t, e, n) {
                e = x(e) && {
                    coordDimensions: e
                } || l({
                    encodeDefine: t.getEncode()
                }, e);
                var i = t.getSource(), r = pl(i, e).dimensions, o = new qx(r, t);
                return o.initData(i, n), o;
            }(this, [ "value" ]);
        }, e.type = "series.gauge", e.defaultOption = {
            z: 2,
            colorBy: "data",
            center: [ "50%", "50%" ],
            legendHoverLink: !0,
            radius: "75%",
            startAngle: 225,
            endAngle: -45,
            clockwise: !0,
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
                show: !0,
                roundCap: !1,
                lineStyle: {
                    color: [ [ 1, "#E6EBF8" ] ],
                    width: 10
                }
            },
            progress: {
                show: !1,
                overlap: !0,
                width: 10,
                roundCap: !1,
                clip: !0
            },
            splitLine: {
                show: !0,
                length: 10,
                distance: 10,
                lineStyle: {
                    color: "#63677A",
                    width: 3,
                    type: "solid"
                }
            },
            axisTick: {
                show: !0,
                splitNumber: 5,
                length: 6,
                distance: 10,
                lineStyle: {
                    color: "#63677A",
                    width: 1,
                    type: "solid"
                }
            },
            axisLabel: {
                show: !0,
                distance: 15,
                color: "#464646",
                fontSize: 12,
                rotate: 0
            },
            pointer: {
                icon: null,
                offsetCenter: [ 0, 0 ],
                show: !0,
                showAbove: !0,
                length: "60%",
                width: 6,
                keepAspect: !1
            },
            anchor: {
                show: !1,
                showAbove: !1,
                size: 6,
                icon: "circle",
                offsetCenter: [ 0, 0 ],
                keepAspect: !1,
                itemStyle: {
                    color: "#fff",
                    borderWidth: 0,
                    borderColor: "#5470c6"
                }
            },
            title: {
                show: !0,
                offsetCenter: [ 0, "20%" ],
                color: "#464646",
                fontSize: 16,
                valueAnimation: !1
            },
            detail: {
                show: !0,
                backgroundColor: "rgba(0,0,0,0)",
                borderWidth: 0,
                borderColor: "#ccc",
                width: 100,
                height: null,
                padding: [ 5, 10 ],
                offsetCenter: [ 0, "40%" ],
                color: "#464646",
                fontSize: 30,
                fontWeight: "bold",
                lineHeight: 30,
                valueAnimation: !1
            }
        }, e;
    }(Om);
    tu(function(t) {
        t.registerChartView(Ib), t.registerSeriesModel(kb);
    });
    var Db = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this;
        }
        return n(e, t), e.type = "grid", e.dependencies = [ "xAxis", "yAxis" ], e.layoutMode = "box", 
        e.defaultOption = {
            show: !1,
            z: 0,
            left: "10%",
            top: 60,
            right: "10%",
            bottom: 70,
            containLabel: !1,
            backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 1,
            borderColor: "#ccc"
        }, e;
    }(mv), Ab = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this;
        }
        return n(e, t), e.prototype.getCoordSysModel = function() {
            return this.getReferringComponents("grid", Ed).models[0];
        }, e.type = "cartesian2dAxis", e;
    }(mv);
    p(Ab, _w);
    var Pb = {
        show: !0,
        z: 0,
        inverse: !1,
        name: "",
        nameLocation: "end",
        nameRotate: null,
        nameTruncate: {
            maxWidth: null,
            ellipsis: "...",
            placeholder: "."
        },
        nameTextStyle: {},
        nameGap: 15,
        silent: !1,
        triggerEvent: !1,
        tooltip: {
            show: !1
        },
        axisPointer: {},
        axisLine: {
            show: !0,
            onZero: !0,
            onZeroAxisIndex: null,
            lineStyle: {
                color: "#6E7079",
                width: 1,
                type: "solid"
            },
            symbol: [ "none", "none" ],
            symbolSize: [ 10, 15 ]
        },
        axisTick: {
            show: !0,
            inside: !1,
            length: 5,
            lineStyle: {
                width: 1
            }
        },
        axisLabel: {
            show: !0,
            inside: !1,
            rotate: 0,
            showMinLabel: null,
            showMaxLabel: null,
            margin: 8,
            fontSize: 12
        },
        splitLine: {
            show: !0,
            lineStyle: {
                color: [ "#E0E6F1" ],
                width: 1,
                type: "solid"
            }
        },
        splitArea: {
            show: !1,
            areaStyle: {
                color: [ "rgba(250,250,250,0.2)", "rgba(210,219,238,0.2)" ]
            }
        }
    }, Lb = s({
        boundaryGap: !0,
        deduplication: null,
        splitLine: {
            show: !1
        },
        axisTick: {
            alignWithLabel: !1,
            interval: "auto"
        },
        axisLabel: {
            interval: "auto"
        }
    }, Pb), Ob = s({
        boundaryGap: [ 0, 0 ],
        axisLine: {
            show: "auto"
        },
        axisTick: {
            show: "auto"
        },
        splitNumber: 5,
        minorTick: {
            show: !1,
            splitNumber: 5,
            length: 3,
            lineStyle: {}
        },
        minorSplitLine: {
            show: !1,
            lineStyle: {
                color: "#F4F7FD",
                width: 1
            }
        }
    }, Pb), Rb = {
        category: Lb,
        value: Ob,
        time: s({
            splitNumber: 6,
            axisLabel: {
                showMinLabel: !1,
                showMaxLabel: !1,
                rich: {
                    primary: {
                        fontWeight: "bold"
                    }
                }
            },
            splitLine: {
                show: !1
            }
        }, Ob),
        log: u({
            logBase: 10
        }, Ob)
    }, Bb = {
        value: 1,
        category: 1,
        time: 1,
        log: 1
    }, Eb = function() {
        function t(t) {
            this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t || "";
        }
        return t.prototype.getAxis = function(t) {
            return this._axes[t];
        }, t.prototype.getAxes = function() {
            return g(this._dimList, function(t) {
                return this._axes[t];
            }, this);
        }, t.prototype.getAxesByScale = function(t) {
            return t = t.toLowerCase(), v(this.getAxes(), function(e) {
                return e.scale.type === t;
            });
        }, t.prototype.addAxis = function(t) {
            var e = t.dim;
            this._axes[e] = t, this._dimList.push(e);
        }, t;
    }(), zb = [ "x", "y" ], Nb = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.type = "cartesian2d", e.dimensions = zb, e;
        }
        return n(e, t), e.prototype.calcAffineTransform = function() {
            this._transform = this._invTransform = null;
            var t = this.getAxis("x").scale, e = this.getAxis("y").scale;
            if (Zu(t) && Zu(e)) {
                var n = t.getExtent(), i = e.getExtent(), r = this.dataToPoint([ n[0], i[0] ]), o = this.dataToPoint([ n[1], i[1] ]), a = n[1] - n[0], s = i[1] - i[0];
                if (a && s) {
                    var l = (o[0] - r[0]) / a, u = (o[1] - r[1]) / s, h = r[0] - n[0] * l, c = r[1] - i[0] * u, p = this._transform = [ l, 0, 0, u, h, c ];
                    this._invTransform = Tt([], p);
                }
            }
        }, e.prototype.getBaseAxis = function() {
            return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
        }, e.prototype.containPoint = function(t) {
            var e = this.getAxis("x"), n = this.getAxis("y");
            return e.contain(e.toLocalCoord(t[0])) && n.contain(n.toLocalCoord(t[1]));
        }, e.prototype.containData = function(t) {
            return this.getAxis("x").containData(t[0]) && this.getAxis("y").containData(t[1]);
        }, e.prototype.containZone = function(t, e) {
            var n = this.dataToPoint(t), i = this.dataToPoint(e), r = this.getArea(), o = new op(n[0], n[1], i[0] - n[0], i[1] - n[1]);
            return r.intersect(o);
        }, e.prototype.dataToPoint = function(t, e, n) {
            n = n || [];
            var i = t[0], r = t[1];
            if (this._transform && null != i && isFinite(i) && null != r && isFinite(r)) return rt(n, t, this._transform);
            var o = this.getAxis("x"), a = this.getAxis("y");
            return n[0] = o.toGlobalCoord(o.dataToCoord(i, e)), n[1] = a.toGlobalCoord(a.dataToCoord(r, e)), 
            n;
        }, e.prototype.clampData = function(t, e) {
            var n = this.getAxis("x").scale, i = this.getAxis("y").scale, r = n.getExtent(), o = i.getExtent(), a = n.parse(t[0]), s = i.parse(t[1]);
            return (e = e || [])[0] = Math.min(Math.max(Math.min(r[0], r[1]), a), Math.max(r[0], r[1])), 
            e[1] = Math.min(Math.max(Math.min(o[0], o[1]), s), Math.max(o[0], o[1])), e;
        }, e.prototype.pointToData = function(t, e) {
            var n = [];
            if (this._invTransform) return rt(n, t, this._invTransform);
            var i = this.getAxis("x"), r = this.getAxis("y");
            return n[0] = i.coordToData(i.toLocalCoord(t[0]), e), n[1] = r.coordToData(r.toLocalCoord(t[1]), e), 
            n;
        }, e.prototype.getOtherAxis = function(t) {
            return this.getAxis("x" === t.dim ? "y" : "x");
        }, e.prototype.getArea = function() {
            var t = this.getAxis("x").getGlobalExtent(), e = this.getAxis("y").getGlobalExtent(), n = Math.min(t[0], t[1]), i = Math.min(e[0], e[1]), r = Math.max(t[0], t[1]) - n, o = Math.max(e[0], e[1]) - i;
            return new op(n, i, r, o);
        }, e;
    }(Eb), Fb = function(t) {
        function e(e, n, i, r, o) {
            var a = t.call(this, e, n, i) || this;
            return a.index = 0, a.type = r || "value", a.position = o || "bottom", a;
        }
        return n(e, t), e.prototype.isHorizontal = function() {
            var t = this.position;
            return "top" === t || "bottom" === t;
        }, e.prototype.getGlobalExtent = function(t) {
            var e = this.getExtent();
            return e[0] = this.toGlobalCoord(e[0]), e[1] = this.toGlobalCoord(e[1]), t && e[0] > e[1] && e.reverse(), 
            e;
        }, e.prototype.pointToData = function(t, e) {
            return this.coordToData(this.toLocalCoord(t["x" === this.dim ? 0 : 1]), e);
        }, e.prototype.setCategorySortInfo = function(t) {
            return "category" === this.type && (this.model.option.categorySortInfo = t, void this.scale.setSortInfo(t));
        }, e;
    }(zw), Vb = Math.log, Hb = function() {
        function t(t, e, n) {
            this.type = "grid", this._coordsMap = {}, this._coordsList = [], this._axesMap = {}, 
            this._axesList = [], this.axisPointerEnabled = !0, this.dimensions = zb, this._initCartesian(t, e, n), 
            this.model = t;
        }
        return t.prototype.getRect = function() {
            return this._rect;
        }, t.prototype.update = function(t, e) {
            function n(t) {
                var e, n = m(t), i = n.length;
                if (i) {
                    for (var r = [], o = i - 1; o >= 0; o--) {
                        var a = t[+n[o]], s = a.model, l = a.scale;
                        wl(l) && s.get("alignTicks") && null == s.get("interval") ? r.push(a) : (ql(l, s), 
                        wl(l) && (e = a));
                    }
                    r.length && (e || ql((e = r.pop()).scale, e.model), f(r, function(t) {
                        !function(t, e, n) {
                            var i = ew.prototype, r = i.getTicks.call(n), o = i.getTicks.call(n, !0), a = r.length - 1, s = i.getInterval.call(n), l = Yl(t, e), u = l.extent, h = l.fixMin, c = l.fixMax;
                            if ("log" === t.type) {
                                var p = Vb(t.base);
                                u = [ Vb(u[0]) / p, Vb(u[1]) / p ];
                            }
                            t.setExtent(u[0], u[1]), t.calcNiceExtent({
                                splitNumber: a,
                                fixMin: h,
                                fixMax: c
                            });
                            var d = i.getExtent.call(t);
                            h && (u[0] = d[0]), c && (u[1] = d[1]);
                            var f = i.getInterval.call(t), g = u[0], y = u[1];
                            if (h && c) f = (y - g) / a; else if (h) for (y = u[0] + f * a; y < u[1] && isFinite(y) && isFinite(u[1]); ) f = Sl(f), 
                            y = u[0] + f * a; else if (c) for (g = u[1] - f * a; g > u[0] && isFinite(g) && isFinite(u[0]); ) f = Sl(f), 
                            g = u[1] - f * a; else {
                                t.getTicks().length - 1 > a && (f = Sl(f));
                                var v = f * a;
                                0 > (g = Ke((y = Math.ceil(u[1] / f) * f) - v)) && u[0] >= 0 ? (g = 0, y = Ke(v)) : y > 0 && u[1] <= 0 && (y = 0, 
                                g = -Ke(v));
                            }
                            var m = (r[0].value - o[0].value) / s, _ = (r[a].value - o[a].value) / s;
                            i.setExtent.call(t, g + f * m, y + f * _), i.setInterval.call(t, f), (m || _) && i.setNiceExtent.call(t, g + f, y - f);
                        }(t.scale, t.model, e.scale);
                    }));
                }
            }
            var i = this._axesMap;
            this._updateScale(t, this.model), n(i.x), n(i.y);
            var r = {};
            f(i.x, function(t) {
                th(i, "y", t, r);
            }), f(i.y, function(t) {
                th(i, "x", t, r);
            }), this.resize(this.model, e);
        }, t.prototype.resize = function(t, e, n) {
            function i() {
                f(s, function(t) {
                    var e = t.isHorizontal(), n = e ? [ 0, a.width ] : [ 0, a.height ], i = t.inverse ? 1 : 0;
                    t.setExtent(n[i], n[1 - i]), function(t, e) {
                        var n = t.getExtent(), i = n[0] + n[1];
                        t.toGlobalCoord = "x" === t.dim ? function(t) {
                            return t + e;
                        } : function(t) {
                            return i - t + e;
                        }, t.toLocalCoord = "x" === t.dim ? function(t) {
                            return t - e;
                        } : function(t) {
                            return i - t + e;
                        };
                    }(t, e ? a.x : a.y);
                });
            }
            var r = t.getBoxLayoutParams(), o = !n && t.get("containLabel"), a = ko(r, {
                width: e.getWidth(),
                height: e.getHeight()
            });
            this._rect = a;
            var s = this._axesList;
            i(), o && (f(s, function(t) {
                if (!t.model.get([ "axisLabel", "inside" ])) {
                    var e = function(t) {
                        var e = t.model, n = t.scale;
                        if (e.get([ "axisLabel", "show" ]) && !n.isBlank()) {
                            var i, r, o = n.getExtent();
                            n instanceof Jx ? r = n.count() : r = (i = n.getTicks()).length;
                            var a, s = t.getLabelModel(), l = Zl(t), u = 1;
                            r > 40 && (u = Math.ceil(r / 40));
                            for (var h = 0; r > h; h += u) {
                                var c = l(i ? i[h] : {
                                    value: o[0] + h
                                }, h), p = $l(s.getTextRect(c), s.get("rotate") || 0);
                                a ? a.union(p) : a = p;
                            }
                            return a;
                        }
                    }(t);
                    if (e) {
                        var n = t.isHorizontal() ? "height" : "width", i = t.model.get([ "axisLabel", "margin" ]);
                        a[n] -= e[n] + i, "top" === t.position ? a.y += e.height + i : "left" === t.position && (a.x += e.width + i);
                    }
                }
            }), i()), f(this._coordsList, function(t) {
                t.calcAffineTransform();
            });
        }, t.prototype.getAxis = function(t, e) {
            var n = this._axesMap[t];
            return null != n ? n[e || 0] : void 0;
        }, t.prototype.getAxes = function() {
            return this._axesList.slice();
        }, t.prototype.getCartesian = function(t, e) {
            if (null != t && null != e) {
                var n = "x" + t + "y" + e;
                return this._coordsMap[n];
            }
            T(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
            for (var i = 0, r = this._coordsList; i < r.length; i++) if (r[i].getAxis("x").index === t || r[i].getAxis("y").index === e) return r[i];
        }, t.prototype.getCartesians = function() {
            return this._coordsList.slice();
        }, t.prototype.convertToPixel = function(t, e, n) {
            var i = this._findConvertTarget(e);
            return i.cartesian ? i.cartesian.dataToPoint(n) : i.axis ? i.axis.toGlobalCoord(i.axis.dataToCoord(n)) : null;
        }, t.prototype.convertFromPixel = function(t, e, n) {
            var i = this._findConvertTarget(e);
            return i.cartesian ? i.cartesian.pointToData(n) : i.axis ? i.axis.coordToData(i.axis.toLocalCoord(n)) : null;
        }, t.prototype._findConvertTarget = function(t) {
            var e, n, i = t.seriesModel, r = t.xAxisModel || i && i.getReferringComponents("xAxis", Ed).models[0], o = t.yAxisModel || i && i.getReferringComponents("yAxis", Ed).models[0], a = t.gridModel, s = this._coordsList;
            if (i) h(s, e = i.coordinateSystem) < 0 && (e = null); else if (r && o) e = this.getCartesian(r.componentIndex, o.componentIndex); else if (r) n = this.getAxis("x", r.componentIndex); else if (o) n = this.getAxis("y", o.componentIndex); else if (a) {
                a.coordinateSystem === this && (e = this._coordsList[0]);
            }
            return {
                cartesian: e,
                axis: n
            };
        }, t.prototype.containPoint = function(t) {
            var e = this._coordsList[0];
            return e ? e.containPoint(t) : void 0;
        }, t.prototype._initCartesian = function(t, e) {
            function n(e) {
                return function(n, i) {
                    if (Ju(n, t)) {
                        var l = n.get("position");
                        "x" === e ? "top" !== l && "bottom" !== l && (l = o.bottom ? "top" : "bottom") : "left" !== l && "right" !== l && (l = o.left ? "right" : "left"), 
                        o[l] = !0;
                        var u = new Fb(e, jl(n), [ 0, 0 ], n.get("type"), l), h = "category" === u.type;
                        u.onBand = h && n.get("boundaryGap"), u.inverse = n.get("inverse"), n.axis = u, 
                        u.model = n, u.grid = r, u.index = i, r._axesList.push(u), a[e][i] = u, s[e]++;
                    }
                };
            }
            var i = this, r = this, o = {
                left: !1,
                right: !1,
                top: !1,
                bottom: !1
            }, a = {
                x: {},
                y: {}
            }, s = {
                x: 0,
                y: 0
            };
            return e.eachComponent("xAxis", n("x"), this), e.eachComponent("yAxis", n("y"), this), 
            s.x && s.y ? (this._axesMap = a, void f(a.x, function(e, n) {
                f(a.y, function(r, o) {
                    var a = "x" + n + "y" + o, s = new Nb(a);
                    s.master = i, s.model = t, i._coordsMap[a] = s, i._coordsList.push(s), s.addAxis(e), 
                    s.addAxis(r);
                });
            })) : (this._axesMap = {}, void (this._axesList = []));
        }, t.prototype._updateScale = function(t, e) {
            function n(t, e) {
                f(function(t, e) {
                    var n = {};
                    return f(t.mapDimensionsAll(e), function(e) {
                        n[vl(t, e)] = !0;
                    }), m(n);
                }(t, e.dim), function(n) {
                    e.scale.unionExtentFromData(t, n);
                });
            }
            f(this._axesList, function(t) {
                if (t.scale.setExtent(1 / 0, -1 / 0), "category" === t.type) {
                    var e = t.model.get("categorySortInfo");
                    t.scale.setSortInfo(e);
                }
            }), t.eachSeries(function(t) {
                if ($u(t)) {
                    var i = Qu(t), r = i.xAxisModel, o = i.yAxisModel;
                    if (!Ju(r, e) || !Ju(o, e)) return;
                    var a = this.getCartesian(r.componentIndex, o.componentIndex), s = t.getData(), l = a.getAxis("x"), u = a.getAxis("y");
                    n(s, l), n(s, u);
                }
            }, this);
        }, t.prototype.getTooltipAxes = function(t) {
            var e = [], n = [];
            return f(this.getCartesians(), function(i) {
                var r = null != t && "auto" !== t ? i.getAxis(t) : i.getBaseAxis(), o = i.getOtherAxis(r);
                h(e, r) < 0 && e.push(r), h(n, o) < 0 && n.push(o);
            }), {
                baseAxes: e,
                otherAxes: n
            };
        }, t.create = function(e, n) {
            var i = [];
            return e.eachComponent("grid", function(r, o) {
                var a = new t(r, e, n);
                a.name = "grid_" + o, a.resize(r, n, !0), r.coordinateSystem = a, i.push(a);
            }), e.eachSeries(function(t) {
                if ($u(t)) {
                    var e = Qu(t), n = e.xAxisModel, i = e.yAxisModel, r = n.getCoordSysModel().coordinateSystem;
                    t.coordinateSystem = r.getCartesian(n.componentIndex, i.componentIndex);
                }
            }), i;
        }, t.dimensions = zb, t;
    }(), Wb = Math.PI, Gb = function() {
        function t(t, e) {
            this.group = new Md(), this.opt = e, this.axisModel = t, u(e, {
                labelOffset: 0,
                nameDirection: 1,
                tickDirection: 1,
                labelDirection: 1,
                silent: !0,
                handleAutoShown: function() {
                    return !0;
                }
            });
            var n = new Md({
                x: e.position[0],
                y: e.position[1],
                rotation: e.rotation
            });
            n.updateTransform(), this._transformGroup = n;
        }
        return t.prototype.hasBuilder = function(t) {
            return !!Ub[t];
        }, t.prototype.add = function(t) {
            Ub[t](this.opt, this.axisModel, this.group, this._transformGroup);
        }, t.prototype.getGroup = function() {
            return this.group;
        }, t.innerTextLayout = function(t, e, n) {
            var i, r, o = en(e - t);
            return nn(o) ? (r = n > 0 ? "top" : "bottom", i = "center") : nn(o - Wb) ? (r = n > 0 ? "bottom" : "top", 
            i = "center") : (r = "middle", i = o > 0 && Wb > o ? n > 0 ? "right" : "left" : n > 0 ? "left" : "right"), 
            {
                rotation: o,
                textAlign: i,
                textVerticalAlign: r
            };
        }, t.makeAxisEventDataBase = function(t) {
            var e = {
                componentType: t.mainType,
                componentIndex: t.componentIndex
            };
            return e[t.mainType + "Index"] = t.componentIndex, e;
        }, t.isLabelSilent = function(t) {
            var e = t.get("tooltip");
            return t.get("silent") || !(t.get("triggerEvent") || e && e.show);
        }, t;
    }(), Ub = {
        axisLine: function(t, e, n, i) {
            var r = e.get([ "axisLine", "show" ]);
            if ("auto" === r && t.handleAutoShown && (r = t.handleAutoShown("axisLine")), r) {
                var o = e.axis.getExtent(), a = i.transform, s = [ o[0], 0 ], u = [ o[1], 0 ], h = s[0] > u[0];
                a && (rt(s, s, a), rt(u, u, a));
                var c = l({
                    lineCap: "round"
                }, e.getModel([ "axisLine", "lineStyle" ]).getLineStyle()), p = new ay({
                    shape: {
                        x1: s[0],
                        y1: s[1],
                        x2: u[0],
                        y2: u[1]
                    },
                    style: c,
                    strokeContainThreshold: t.strokeContainThreshold || 5,
                    silent: !0,
                    z2: 1
                });
                kr(p.shape, p.style.lineWidth), p.anid = "line", n.add(p);
                var d = e.get([ "axisLine", "symbol" ]);
                if (null != d) {
                    var g = e.get([ "axisLine", "symbolSize" ]);
                    b(d) && (d = [ d, d ]), (b(g) || M(g)) && (g = [ g, g ]);
                    var y = function(t, e) {
                        return null != t ? (x(t) || (t = [ t, t ]), [ Ze(t[0], e[0]) || 0, Ze(O(t[1], t[0]), e[1]) || 0 ]) : void 0;
                    }(e.get([ "axisLine", "symbolOffset" ]) || 0, g), v = g[0], m = g[1];
                    f([ {
                        rotate: t.rotation + Math.PI / 2,
                        offset: y[0],
                        r: 0
                    }, {
                        rotate: t.rotation - Math.PI / 2,
                        offset: y[1],
                        r: Math.sqrt((s[0] - u[0]) * (s[0] - u[0]) + (s[1] - u[1]) * (s[1] - u[1]))
                    } ], function(e, i) {
                        if ("none" !== d[i] && null != d[i]) {
                            var r = ys(d[i], -v / 2, -m / 2, v, m, c.stroke, !0), o = e.r + e.offset, a = h ? u : s;
                            r.attr({
                                rotation: e.rotate,
                                x: a[0] + o * Math.cos(t.rotation),
                                y: a[1] - o * Math.sin(t.rotation),
                                silent: !0,
                                z2: 11
                            }), n.add(r);
                        }
                    });
                }
            }
        },
        axisTickLabel: function(t, e, n, i) {
            var r = function(t, e, n, i) {
                var r = n.axis, o = n.getModel("axisTick"), a = o.get("show");
                if ("auto" === a && i.handleAutoShown && (a = i.handleAutoShown("axisTick")), a && !r.scale.isBlank()) {
                    for (var s = o.getModel("lineStyle"), l = i.tickDirection * o.get("length"), h = oh(r.getTicksCoords(), e.transform, l, u(s.getLineStyle(), {
                        stroke: n.get([ "axisLine", "lineStyle", "color" ])
                    }), "ticks"), c = 0; c < h.length; c++) t.add(h[c]);
                    return h;
                }
            }(n, i, e, t), o = function(t, e, n, i) {
                var r = n.axis;
                if (L(i.axisLabelShow, n.get([ "axisLabel", "show" ])) && !r.scale.isBlank()) {
                    var o = n.getModel("axisLabel"), a = o.get("margin"), s = r.getViewLabels(), l = (L(i.labelRotate, o.get("rotate")) || 0) * Wb / 180, u = Gb.innerTextLayout(i.rotation, l, i.labelDirection), h = n.getCategories && n.getCategories(!0), c = [], p = Gb.isLabelSilent(n), d = n.get("triggerEvent");
                    return f(s, function(s, l) {
                        var f = "ordinal" === r.scale.type ? r.scale.getRawOrdinalNumber(s.tickValue) : s.tickValue, g = s.formattedLabel, y = s.rawLabel, v = o;
                        if (h && h[f]) {
                            var m = h[f];
                            T(m) && m.textStyle && (v = new Yy(m.textStyle, o, n.ecModel));
                        }
                        var _ = v.getTextColor() || n.get([ "axisLine", "lineStyle", "color" ]), x = r.dataToCoord(f), b = new Jf({
                            x: x,
                            y: i.labelOffset + i.labelDirection * a,
                            rotation: u.rotation,
                            silent: p,
                            z2: 10 + (s.level || 0),
                            style: Ur(v, {
                                text: g,
                                align: v.getShallow("align", !0) || u.textAlign,
                                verticalAlign: v.getShallow("verticalAlign", !0) || v.getShallow("baseline", !0) || u.textVerticalAlign,
                                fill: w(_) ? _("category" === r.type ? y : "value" === r.type ? f + "" : f, l) : _
                            })
                        });
                        if (b.anid = "label_" + f, d) {
                            var S = Gb.makeAxisEventDataBase(n);
                            S.targetType = "axisLabel", S.value = y, S.tickIndex = l, "category" === r.type && (S.dataIndex = f), 
                            ig(b).eventData = S;
                        }
                        e.add(b), b.updateTransform(), c.push(b), t.add(b), b.decomposeTransform();
                    }), c;
                }
            }(n, i, e, t);
            ((function(t, e, n) {
                if (!Jl(t.axis)) {
                    var i = t.get([ "axisLabel", "showMinLabel" ]), r = t.get([ "axisLabel", "showMaxLabel" ]);
                    n = n || [];
                    var o = (e = e || [])[0], a = e[1], s = e[e.length - 1], l = e[e.length - 2], u = n[0], h = n[1], c = n[n.length - 1], p = n[n.length - 2];
                    !1 === i ? (nh(o), nh(u)) : ih(o, a) && (i ? (nh(a), nh(h)) : (nh(o), nh(u))), !1 === r ? (nh(s), 
                    nh(c)) : ih(l, s) && (r ? (nh(l), nh(p)) : (nh(s), nh(c)));
                }
            })(e, o, r), function(t, e, n, i) {
                var r = n.axis, o = n.getModel("minorTick");
                if (o.get("show") && !r.scale.isBlank()) {
                    var a = r.getMinorTicksCoords();
                    if (a.length) for (var s = o.getModel("lineStyle"), l = i * o.get("length"), h = u(s.getLineStyle(), u(n.getModel("axisTick").getLineStyle(), {
                        stroke: n.get([ "axisLine", "lineStyle", "color" ])
                    })), c = 0; c < a.length; c++) for (var p = oh(a[c], e.transform, l, h, "minorticks_" + c), d = 0; d < p.length; d++) t.add(p[d]);
                }
            }(n, i, e, t.tickDirection), e.get([ "axisLabel", "hideOverlap" ])) && ku(Cu(g(o, function(t) {
                return {
                    label: t,
                    priority: t.z2,
                    defaultAttr: {
                        ignore: t.ignore
                    }
                };
            })));
        },
        axisName: function(t, e, n, i) {
            var r = L(t.axisName, e.get("name"));
            if (r) {
                var o, a, s = e.get("nameLocation"), l = t.nameDirection, u = e.getModel("nameTextStyle"), h = e.get("nameGap") || 0, c = e.axis.getExtent(), p = c[0] > c[1] ? -1 : 1, d = [ "start" === s ? c[0] - p * h : "end" === s ? c[1] + p * h : (c[0] + c[1]) / 2, rh(s) ? t.labelOffset + l * h : 0 ], f = e.get("nameRotate");
                null != f && (f = f * Wb / 180), rh(s) ? o = Gb.innerTextLayout(t.rotation, null != f ? f : t.rotation, l) : (o = function(t, e, n, i) {
                    var r, o, a = en(n - t), s = i[0] > i[1], l = "start" === e && !s || "start" !== e && s;
                    return nn(a - Wb / 2) ? (o = l ? "bottom" : "top", r = "center") : nn(a - 1.5 * Wb) ? (o = l ? "top" : "bottom", 
                    r = "center") : (o = "middle", r = 1.5 * Wb > a && a > Wb / 2 ? l ? "left" : "right" : l ? "right" : "left"), 
                    {
                        rotation: a,
                        textAlign: r,
                        textVerticalAlign: o
                    };
                }(t.rotation, s, f || 0, c), null != (a = t.axisNameAvailableWidth) && (a = Math.abs(a / Math.sin(o.rotation)), 
                !isFinite(a) && (a = null)));
                var g = u.getFont(), y = e.get("nameTruncate", !0) || {}, v = y.ellipsis, m = L(t.nameTruncateMaxWidth, y.maxWidth, a), _ = new Jf({
                    x: d[0],
                    y: d[1],
                    rotation: o.rotation,
                    silent: Gb.isLabelSilent(e),
                    style: Ur(u, {
                        text: r,
                        font: g,
                        overflow: "truncate",
                        width: m,
                        ellipsis: v,
                        fill: u.getTextColor() || e.get([ "axisLine", "lineStyle", "color" ]),
                        align: u.get("align") || o.textAlign,
                        verticalAlign: u.get("verticalAlign") || o.textVerticalAlign
                    }),
                    z2: 1
                });
                if (Nr({
                    el: _,
                    componentModel: e,
                    itemName: r
                }), _.__fullText = r, _.anid = "name", e.get("triggerEvent")) {
                    var x = Gb.makeAxisEventDataBase(e);
                    x.targetType = "axisName", x.name = r, ig(_).eventData = x;
                }
                i.add(_), _.updateTransform(), n.add(_), _.decomposeTransform();
            }
        }
    }, Xb = {}, Yb = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.prototype.render = function(e, n, i) {
            this.axisPointerClass && uh(e), t.prototype.render.apply(this, arguments), this._doUpdateAxisPointerClass(e, i, !0);
        }, e.prototype.updateAxisPointer = function(t, e, n) {
            this._doUpdateAxisPointerClass(t, n, !1);
        }, e.prototype.remove = function(t, e) {
            var n = this._axisPointer;
            n && n.remove(e);
        }, e.prototype.dispose = function(e, n) {
            this._disposeAxisPointer(n), t.prototype.dispose.apply(this, arguments);
        }, e.prototype._doUpdateAxisPointerClass = function(t, n, i) {
            var r = e.getAxisPointerClass(this.axisPointerClass);
            if (r) {
                var o = function(t) {
                    var e = hh(t);
                    return e && e.axisPointerModel;
                }(t);
                o ? (this._axisPointer || (this._axisPointer = new r())).render(t, o, n, i) : this._disposeAxisPointer(n);
            }
        }, e.prototype._disposeAxisPointer = function(t) {
            this._axisPointer && this._axisPointer.dispose(t), this._axisPointer = null;
        }, e.registerAxisPointerClass = function(t, e) {
            Xb[t] = e;
        }, e.getAxisPointerClass = function(t) {
            return t && Xb[t];
        }, e.type = "axis", e;
    }(Rm), qb = Tn(), jb = [ "axisLine", "axisTickLabel", "axisName" ], Zb = [ "splitArea", "splitLine", "minorSplitLine" ], Kb = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n.axisPointerClass = "CartesianAxisPointer", n;
        }
        return n(e, t), e.prototype.render = function(e, n, i, r) {
            this.group.removeAll();
            var o = this._axisGroup;
            if (this._axisGroup = new Md(), this.group.add(this._axisGroup), e.get("show")) {
                var a = e.getCoordSysModel(), s = Ku(a, e), u = new Gb(e, l({
                    handleAutoShown: function() {
                        for (var t = a.coordinateSystem.getCartesians(), n = 0; n < t.length; n++) if (wl(t[n].getOtherAxis(e.axis).scale)) return !0;
                        return !1;
                    }
                }, s));
                f(jb, u.add, u), this._axisGroup.add(u.getGroup()), f(Zb, function(t) {
                    e.get([ t, "show" ]) && $b[t](this, this._axisGroup, e, a);
                }, this), r && "changeAxisOrder" === r.type && r.isInitSort || Lr(o, this._axisGroup, e), 
                t.prototype.render.call(this, e, n, i, r);
            }
        }, e.prototype.remove = function() {
            !function(t) {
                qb(t).splitAreaColors = null;
            }(this);
        }, e.type = "cartesianAxis", e;
    }(Yb), $b = {
        splitLine: function(t, e, n, i) {
            var r = n.axis;
            if (!r.scale.isBlank()) {
                var o = n.getModel("splitLine"), a = o.getModel("lineStyle"), s = a.get("color");
                s = x(s) ? s : [ s ];
                for (var l = i.coordinateSystem.getRect(), h = r.isHorizontal(), c = 0, p = r.getTicksCoords({
                    tickModel: o
                }), d = [], f = [], g = a.getLineStyle(), y = 0; y < p.length; y++) {
                    var v = r.toGlobalCoord(p[y].coord);
                    h ? (d[0] = v, d[1] = l.y, f[0] = v, f[1] = l.y + l.height) : (d[0] = l.x, d[1] = v, 
                    f[0] = l.x + l.width, f[1] = v);
                    var m = c++ % s.length, _ = p[y].tickValue, w = new ay({
                        anid: null != _ ? "line_" + p[y].tickValue : null,
                        autoBatch: !0,
                        shape: {
                            x1: d[0],
                            y1: d[1],
                            x2: f[0],
                            y2: f[1]
                        },
                        style: u({
                            stroke: s[m]
                        }, g),
                        silent: !0
                    });
                    kr(w.shape, g.lineWidth), e.add(w);
                }
            }
        },
        minorSplitLine: function(t, e, n, i) {
            var r = n.axis, o = n.getModel("minorSplitLine").getModel("lineStyle"), a = i.coordinateSystem.getRect(), s = r.isHorizontal(), l = r.getMinorTicksCoords();
            if (l.length) for (var u = [], h = [], c = o.getLineStyle(), p = 0; p < l.length; p++) for (var d = 0; d < l[p].length; d++) {
                var f = r.toGlobalCoord(l[p][d].coord);
                s ? (u[0] = f, u[1] = a.y, h[0] = f, h[1] = a.y + a.height) : (u[0] = a.x, u[1] = f, 
                h[0] = a.x + a.width, h[1] = f);
                var g = new ay({
                    anid: "minor_line_" + l[p][d].tickValue,
                    autoBatch: !0,
                    shape: {
                        x1: u[0],
                        y1: u[1],
                        x2: h[0],
                        y2: h[1]
                    },
                    style: c,
                    silent: !0
                });
                kr(g.shape, c.lineWidth), e.add(g);
            }
        },
        splitArea: function(t, e, n, i) {
            !function(t, e, n, i) {
                var r = n.axis;
                if (!r.scale.isBlank()) {
                    var o = n.getModel("splitArea"), a = o.getModel("areaStyle"), s = a.get("color"), l = i.coordinateSystem.getRect(), h = r.getTicksCoords({
                        tickModel: o,
                        clamp: !0
                    });
                    if (h.length) {
                        var c = s.length, p = qb(t).splitAreaColors, d = H(), f = 0;
                        if (p) for (var g = 0; g < h.length; g++) {
                            var y = p.get(h[g].tickValue);
                            if (null != y) {
                                f = (y + (c - 1) * g) % c;
                                break;
                            }
                        }
                        var v = r.toGlobalCoord(h[0].coord), m = a.getAreaStyle();
                        s = x(s) ? s : [ s ];
                        for (g = 1; g < h.length; g++) {
                            var _ = r.toGlobalCoord(h[g].coord), w = void 0, b = void 0, S = void 0, M = void 0;
                            r.isHorizontal() ? (w = v, b = l.y, S = _ - w, M = l.height, v = w + S) : (w = l.x, 
                            b = v, S = l.width, v = b + (M = _ - b));
                            var T = h[g - 1].tickValue;
                            null != T && d.set(T, f), e.add(new Kf({
                                anid: null != T ? "area_" + T : null,
                                shape: {
                                    x: w,
                                    y: b,
                                    width: S,
                                    height: M
                                },
                                style: u({
                                    fill: s[f]
                                }, m),
                                autoBatch: !0,
                                silent: !0
                            })), f = (f + 1) % c;
                        }
                        qb(t).splitAreaColors = d;
                    }
                }
            }(t, e, n, i);
        }
    }, Qb = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.type = "xAxis", e;
    }(Kb), Jb = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.type = Qb.type, e;
        }
        return n(e, t), e.type = "yAxis", e;
    }(Kb), tS = function(t) {
        function e() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.type = "grid", e;
        }
        return n(e, t), e.prototype.render = function(t) {
            this.group.removeAll(), t.get("show") && this.group.add(new Kf({
                shape: t.coordinateSystem.getRect(),
                style: u({
                    fill: t.get("backgroundColor")
                }, t.getItemStyle()),
                silent: !0,
                z2: -1
            }));
        }, e.type = "grid", e;
    }(Rm), eS = {
        offset: 0
    };
    tu(function(t) {
        t.registerComponentView(tS), t.registerComponentModel(Db), t.registerCoordinateSystem("cartesian2d", Hb), 
        qu(t, "x", Ab, eS), qu(t, "y", Ab, eS), t.registerComponentView(Qb), t.registerComponentView(Jb), 
        t.registerPreprocessor(function(t) {
            t.xAxis && t.yAxis && !t.grid && (t.grid = {});
        });
    });
    var nS = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n.layoutMode = {
                type: "box",
                ignoreSize: !0
            }, n;
        }
        return n(e, t), e.type = "title", e.defaultOption = {
            z: 6,
            show: !0,
            text: "",
            target: "blank",
            subtext: "",
            subtarget: "blank",
            left: 0,
            top: 0,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            textStyle: {
                fontSize: 18,
                fontWeight: "bold",
                color: "#464646"
            },
            subtextStyle: {
                fontSize: 12,
                color: "#6E7079"
            }
        }, e;
    }(mv), iS = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.prototype.render = function(t, e, n) {
            if (this.group.removeAll(), t.get("show")) {
                var i = this.group, r = t.getModel("textStyle"), o = t.getModel("subtextStyle"), a = t.get("textAlign"), s = O(t.get("textBaseline"), t.get("textVerticalAlign")), l = new Jf({
                    style: Ur(r, {
                        text: t.get("text"),
                        fill: r.getTextColor()
                    }, {
                        disableBox: !0
                    }),
                    z2: 10
                }), u = l.getBoundingRect(), h = t.get("subtext"), c = new Jf({
                    style: Ur(o, {
                        text: h,
                        fill: o.getTextColor(),
                        y: u.height + t.get("itemGap"),
                        verticalAlign: "top"
                    }, {
                        disableBox: !0
                    }),
                    z2: 10
                }), p = t.get("link"), d = t.get("sublink"), f = t.get("triggerEvent", !0);
                l.silent = !p && !f, c.silent = !d && !f, p && l.on("click", function() {
                    Co(p, "_" + t.get("target"));
                }), d && c.on("click", function() {
                    Co(d, "_" + t.get("subtarget"));
                }), ig(l).eventData = ig(c).eventData = f ? {
                    componentType: "title",
                    componentIndex: t.componentIndex
                } : null, i.add(l), h && i.add(c);
                var g = i.getBoundingRect(), y = t.getBoxLayoutParams();
                y.width = g.width, y.height = g.height;
                var v = ko(y, {
                    width: n.getWidth(),
                    height: n.getHeight()
                }, t.get("padding"));
                a || ("middle" === (a = t.get("left") || t.get("right")) && (a = "center"), "right" === a ? v.x += v.width : "center" === a && (v.x += v.width / 2)), 
                s || ("center" === (s = t.get("top") || t.get("bottom")) && (s = "middle"), "bottom" === s ? v.y += v.height : "middle" === s && (v.y += v.height / 2), 
                s = s || "top"), i.x = v.x, i.y = v.y, i.markRedraw();
                var m = {
                    align: a,
                    verticalAlign: s
                };
                l.setStyle(m), c.setStyle(m), g = i.getBoundingRect();
                var _ = v.margin, x = t.getItemStyle([ "color", "opacity" ]);
                x.fill = t.get("backgroundColor");
                var w = new Kf({
                    shape: {
                        x: g.x - _[3],
                        y: g.y - _[0],
                        width: g.width + _[1] + _[3],
                        height: g.height + _[0] + _[2],
                        r: t.get("borderRadius")
                    },
                    style: x,
                    subPixelOptimize: !0,
                    silent: !0
                });
                i.add(w);
            }
        }, e.type = "title", e;
    }(Rm);
    tu(function(t) {
        t.registerComponentModel(nS), t.registerComponentView(iS);
    });
    var rS = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n.layoutMode = {
                type: "box",
                ignoreSize: !0
            }, n;
        }
        return n(e, t), e.prototype.init = function(t, e, n) {
            this.mergeDefaultAndTheme(t, n), t.selected = t.selected || {}, this._updateSelector(t);
        }, e.prototype.mergeOption = function(e, n) {
            t.prototype.mergeOption.call(this, e, n), this._updateSelector(e);
        }, e.prototype._updateSelector = function(t) {
            var e = t.selector, n = this.ecModel;
            !0 === e && (e = t.selector = [ "all", "inverse" ]), x(e) && f(e, function(t, i) {
                b(t) && (t = {
                    type: t
                }), e[i] = s(t, function(t, e) {
                    return "all" === e ? {
                        type: "all",
                        title: t.getLocaleModel().get([ "legend", "selector", "all" ])
                    } : "inverse" === e ? {
                        type: "inverse",
                        title: t.getLocaleModel().get([ "legend", "selector", "inverse" ])
                    } : void 0;
                }(n, t.type));
            });
        }, e.prototype.optionUpdated = function() {
            this._updateData(this.ecModel);
            var t = this._data;
            if (t[0] && "single" === this.get("selectedMode")) {
                for (var e = !1, n = 0; n < t.length; n++) {
                    var i = t[n].get("name");
                    if (this.isSelected(i)) {
                        this.select(i), e = !0;
                        break;
                    }
                }
                !e && this.select(t[0].get("name"));
            }
        }, e.prototype._updateData = function(t) {
            var e = [], n = [];
            t.eachRawSeries(function(i) {
                var r, o = i.name;
                if (n.push(o), i.legendVisualProvider) {
                    var a = i.legendVisualProvider.getAllNames();
                    t.isSeriesFiltered(i) || (n = n.concat(a)), a.length ? e = e.concat(a) : r = !0;
                } else r = !0;
                r && bn(i) && e.push(i.name);
            }), this._availableNames = n;
            var i = this.get("data") || e, r = H(), o = g(i, function(t) {
                return (b(t) || M(t)) && (t = {
                    name: t
                }), r.get(t.name) ? null : (r.set(t.name, !0), new Yy(t, this, this.ecModel));
            }, this);
            this._data = v(o, function(t) {
                return !!t;
            });
        }, e.prototype.getData = function() {
            return this._data;
        }, e.prototype.select = function(t) {
            var e = this.option.selected;
            "single" === this.get("selectedMode") && f(this._data, function(t) {
                e[t.get("name")] = !1;
            });
            e[t] = !0;
        }, e.prototype.unSelect = function(t) {
            "single" !== this.get("selectedMode") && (this.option.selected[t] = !1);
        }, e.prototype.toggleSelected = function(t) {
            var e = this.option.selected;
            e.hasOwnProperty(t) || (e[t] = !0), this[e[t] ? "unSelect" : "select"](t);
        }, e.prototype.allSelect = function() {
            var t = this._data, e = this.option.selected;
            f(t, function(t) {
                e[t.get("name", !0)] = !0;
            });
        }, e.prototype.inverseSelect = function() {
            var t = this._data, e = this.option.selected;
            f(t, function(t) {
                var n = t.get("name", !0);
                e.hasOwnProperty(n) || (e[n] = !0), e[n] = !e[n];
            });
        }, e.prototype.isSelected = function(t) {
            var e = this.option.selected;
            return !(e.hasOwnProperty(t) && !e[t]) && h(this._availableNames, t) >= 0;
        }, e.prototype.getOrient = function() {
            return "vertical" === this.get("orient") ? {
                index: 1,
                name: "vertical"
            } : {
                index: 0,
                name: "horizontal"
            };
        }, e.type = "legend.plain", e.dependencies = [ "series" ], e.defaultOption = {
            z: 4,
            show: !0,
            orient: "horizontal",
            left: "center",
            top: 0,
            align: "auto",
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "#ccc",
            borderRadius: 0,
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            itemWidth: 25,
            itemHeight: 14,
            symbolRotate: "inherit",
            symbolKeepAspect: !0,
            inactiveColor: "#ccc",
            inactiveBorderColor: "#ccc",
            inactiveBorderWidth: "auto",
            itemStyle: {
                color: "inherit",
                opacity: "inherit",
                borderColor: "inherit",
                borderWidth: "auto",
                borderCap: "inherit",
                borderJoin: "inherit",
                borderDashOffset: "inherit",
                borderMiterLimit: "inherit"
            },
            lineStyle: {
                width: "auto",
                color: "inherit",
                inactiveColor: "#ccc",
                inactiveWidth: 2,
                opacity: "inherit",
                type: "inherit",
                cap: "inherit",
                join: "inherit",
                dashOffset: "inherit",
                miterLimit: "inherit"
            },
            textStyle: {
                color: "#333"
            },
            selectedMode: !0,
            selector: !1,
            selectorLabel: {
                show: !0,
                borderRadius: 10,
                padding: [ 3, 5, 3, 5 ],
                fontSize: 12,
                fontFamily: "sans-serif",
                color: "#666",
                borderWidth: 1,
                borderColor: "#666"
            },
            emphasis: {
                selectorLabel: {
                    show: !0,
                    color: "#eee",
                    backgroundColor: "#666"
                }
            },
            selectorPosition: "auto",
            selectorItemGap: 7,
            selectorButtonGap: 10,
            tooltip: {
                show: !1
            }
        }, e;
    }(mv), oS = _, aS = f, sS = Md, lS = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n.newlineDisabled = !1, n;
        }
        return n(e, t), e.prototype.init = function() {
            this.group.add(this._contentGroup = new sS()), this.group.add(this._selectorGroup = new sS()), 
            this._isFirstRender = !0;
        }, e.prototype.getContentGroup = function() {
            return this._contentGroup;
        }, e.prototype.getSelectorGroup = function() {
            return this._selectorGroup;
        }, e.prototype.render = function(t, e, n) {
            var i = this._isFirstRender;
            if (this._isFirstRender = !1, this.resetInner(), t.get("show", !0)) {
                var r = t.get("align"), o = t.get("orient");
                r && "auto" !== r || (r = "right" === t.get("left") && "vertical" === o ? "right" : "left");
                var a = t.get("selector", !0), s = t.get("selectorPosition", !0);
                !a || s && "auto" !== s || (s = "horizontal" === o ? "end" : "start"), this.renderInner(r, t, e, n, a, o, s);
                var l = t.getBoxLayoutParams(), h = {
                    width: n.getWidth(),
                    height: n.getHeight()
                }, c = t.get("padding"), p = ko(l, h, c), d = this.layoutInner(t, r, p, i, a, s), f = ko(u({
                    width: d.width,
                    height: d.height
                }, l), h, c);
                this.group.x = f.x - d.x, this.group.y = f.y - d.y, this.group.markRedraw(), this.group.add(this._backgroundEl = function(t, e) {
                    var n = hv(e.get("padding")), i = e.getItemStyle([ "color", "opacity" ]);
                    return i.fill = e.get("backgroundColor"), new Kf({
                        shape: {
                            x: t.x - n[3],
                            y: t.y - n[0],
                            width: t.width + n[1] + n[3],
                            height: t.height + n[0] + n[2],
                            r: e.get("borderRadius")
                        },
                        style: i,
                        silent: !0,
                        z2: -1
                    });
                }(d, t));
            }
        }, e.prototype.resetInner = function() {
            this.getContentGroup().removeAll(), this._backgroundEl && this.group.remove(this._backgroundEl), 
            this.getSelectorGroup().removeAll();
        }, e.prototype.renderInner = function(t, e, n, i, r, o, a) {
            var s = this.getContentGroup(), u = H(), h = e.get("selectedMode"), c = [];
            n.eachRawSeries(function(t) {
                !t.get("legendHoverLink") && c.push(t.id);
            }), aS(e.getData(), function(r, o) {
                var a = r.get("name");
                if (!this.newlineDisabled && ("" === a || "\n" === a)) {
                    var p = new sS();
                    return p.newline = !0, void s.add(p);
                }
                var d = n.getSeriesByName(a)[0];
                if (!u.get(a)) if (d) {
                    var f = d.getData(), g = f.getVisual("legendLineStyle") || {}, y = f.getVisual("legendIcon"), v = f.getVisual("style");
                    this._createItem(d, a, o, r, e, t, g, v, y, h, i).on("click", oS(dh, a, null, i, c)).on("mouseover", oS(gh, d.name, null, i, c)).on("mouseout", oS(yh, d.name, null, i, c)), 
                    u.set(a, !0);
                } else n.eachRawSeries(function(n) {
                    if (!u.get(a) && n.legendVisualProvider) {
                        var s = n.legendVisualProvider;
                        if (!s.containName(a)) return;
                        var p = s.indexOfName(a), d = s.getItemVisual(p, "style"), f = s.getItemVisual(p, "legendIcon"), g = le(d.fill);
                        g && 0 === g[3] && (g[3] = .2, d = l(l({}, d), {
                            fill: de(g, "rgba")
                        })), this._createItem(n, a, o, r, e, t, {}, d, f, h, i).on("click", oS(dh, null, a, i, c)).on("mouseover", oS(gh, null, a, i, c)).on("mouseout", oS(yh, null, a, i, c)), 
                        u.set(a, !0);
                    }
                }, this);
            }, this), r && this._createSelector(r, e, i, o, a);
        }, e.prototype._createSelector = function(t, e, n) {
            var i = this.getSelectorGroup();
            aS(t, function(t) {
                var r = t.type, o = new Jf({
                    style: {
                        x: 0,
                        y: 0,
                        align: "center",
                        verticalAlign: "middle"
                    },
                    onclick: function() {
                        n.dispatchAction({
                            type: "all" === r ? "legendAllSelect" : "legendInverseSelect"
                        });
                    }
                });
                i.add(o), Gr(o, {
                    normal: e.getModel("selectorLabel"),
                    emphasis: e.getModel([ "emphasis", "selectorLabel" ])
                }, {
                    defaultText: t.title
                }), Zi(o);
            });
        }, e.prototype._createItem = function(t, e, n, i, r, o, a, s, l, u, h) {
            var c = t.visualDrawType, p = r.get("itemWidth"), d = r.get("itemHeight"), f = r.isSelected(e), g = i.get("symbolRotate"), y = i.get("symbolKeepAspect"), v = i.get("icon"), m = function(t, e, n, i, r, o, a) {
                function s(t, e) {
                    "auto" === t.lineWidth && (t.lineWidth = e.lineWidth > 0 ? 2 : 0), aS(t, function(n, i) {
                        "inherit" === t[i] && (t[i] = e[i]);
                    });
                }
                var l = e.getModel("itemStyle"), u = l.getItemStyle(), h = 0 === t.lastIndexOf("empty", 0) ? "fill" : "stroke", c = l.getShallow("decal");
                u.decal = c && "inherit" !== c ? Bs(c, a) : i.decal, "inherit" === u.fill && (u.fill = i[r]), 
                "inherit" === u.stroke && (u.stroke = i[h]), "inherit" === u.opacity && (u.opacity = ("fill" === r ? i : n).opacity), 
                s(u, i);
                var p = e.getModel("lineStyle"), d = p.getLineStyle();
                if (s(d, n), "auto" === u.fill && (u.fill = i.fill), "auto" === u.stroke && (u.stroke = i.fill), 
                "auto" === d.stroke && (d.stroke = i.fill), !o) {
                    var f = e.get("inactiveBorderWidth"), g = u[h];
                    u.lineWidth = "auto" === f ? i.lineWidth > 0 && g ? 2 : 0 : u.lineWidth, u.fill = e.get("inactiveColor"), 
                    u.stroke = e.get("inactiveBorderColor"), d.stroke = p.get("inactiveColor"), d.lineWidth = p.get("inactiveWidth");
                }
                return {
                    itemStyle: u,
                    lineStyle: d
                };
            }(l = v || l || "roundRect", i, a, s, c, f, h), _ = new sS(), x = i.getModel("textStyle");
            if (!w(t.getLegendIcon) || v && "inherit" !== v) {
                var S = "inherit" === v && t.getData().getVisual("symbol") ? "inherit" === g ? t.getData().getVisual("symbolRotate") : g : 0;
                _.add(function(t) {
                    var e = t.icon || "roundRect", n = ys(e, 0, 0, t.itemWidth, t.itemHeight, t.itemStyle.fill, t.symbolKeepAspect);
                    return n.setStyle(t.itemStyle), n.rotation = (t.iconRotate || 0) * Math.PI / 180, 
                    n.setOrigin([ t.itemWidth / 2, t.itemHeight / 2 ]), e.indexOf("empty") > -1 && (n.style.stroke = n.style.fill, 
                    n.style.fill = "#fff", n.style.lineWidth = 2), n;
                }({
                    itemWidth: p,
                    itemHeight: d,
                    icon: l,
                    iconRotate: S,
                    itemStyle: m.itemStyle,
                    lineStyle: m.lineStyle,
                    symbolKeepAspect: y
                }));
            } else _.add(t.getLegendIcon({
                itemWidth: p,
                itemHeight: d,
                icon: l,
                iconRotate: g,
                itemStyle: m.itemStyle,
                lineStyle: m.lineStyle,
                symbolKeepAspect: y
            }));
            var M = "left" === o ? p + 5 : -5, T = o, C = r.get("formatter"), I = e;
            b(C) && C ? I = C.replace("{name}", null != e ? e : "") : w(C) && (I = C(e));
            var k = f ? x.getTextColor() : i.get("inactiveColor");
            _.add(new Jf({
                style: Ur(x, {
                    text: I,
                    x: M,
                    y: d / 2,
                    fill: k,
                    align: T,
                    verticalAlign: "middle"
                }, {
                    inheritColor: k
                })
            }));
            var D = new Kf({
                shape: _.getBoundingRect(),
                invisible: !0
            }), A = i.getModel("tooltip");
            return A.get("show") && Nr({
                el: D,
                componentModel: r,
                itemName: e,
                itemTooltipOption: A.option
            }), _.add(D), _.eachChild(function(t) {
                t.silent = !0;
            }), D.silent = !u, this.getContentGroup().add(_), Zi(_), _.__legendDataIndex = n, 
            _;
        }, e.prototype.layoutInner = function(t, e, n, i, r, o) {
            var a = this.getContentGroup(), s = this.getSelectorGroup();
            yv(t.get("orient"), a, t.get("itemGap"), n.width, n.height);
            var l = a.getBoundingRect(), u = [ -l.x, -l.y ];
            if (s.markRedraw(), a.markRedraw(), r) {
                yv("horizontal", s, t.get("selectorItemGap", !0));
                var h = s.getBoundingRect(), c = [ -h.x, -h.y ], p = t.get("selectorButtonGap", !0), d = t.getOrient().index, f = 0 === d ? "width" : "height", g = 0 === d ? "height" : "width", y = 0 === d ? "y" : "x";
                "end" === o ? c[d] += l[f] + p : u[d] += h[f] + p, c[1 - d] += l[g] / 2 - h[g] / 2, 
                s.x = c[0], s.y = c[1], a.x = u[0], a.y = u[1];
                var v = {
                    x: 0,
                    y: 0
                };
                return v[f] = l[f] + p + h[f], v[g] = Math.max(l[g], h[g]), v[y] = Math.min(0, h[y] + c[1 - d]), 
                v;
            }
            return a.x = u[0], a.y = u[1], this.group.getBoundingRect();
        }, e.prototype.remove = function() {
            this.getContentGroup().removeAll(), this._isFirstRender = !0;
        }, e.type = "legend.plain", e;
    }(Rm), uS = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.prototype.setScrollDataIndex = function(t) {
            this.option.scrollDataIndex = t;
        }, e.prototype.init = function(e, n, i) {
            var r = Po(e);
            t.prototype.init.call(this, e, n, i), xh(this, e, r);
        }, e.prototype.mergeOption = function(e, n) {
            t.prototype.mergeOption.call(this, e, n), xh(this, this.option, e);
        }, e.type = "legend.scroll", e.defaultOption = Kr(rS.defaultOption, {
            scrollDataIndex: 0,
            pageButtonItemGap: 5,
            pageButtonGap: null,
            pageButtonPosition: "end",
            pageFormatter: "{current}/{total}",
            pageIcons: {
                horizontal: [ "M0,0L12,-10L12,10z", "M0,0L-12,-10L-12,10z" ],
                vertical: [ "M0,0L20,0L10,-20z", "M0,0L20,0L10,20z" ]
            },
            pageIconColor: "#2f4554",
            pageIconInactiveColor: "#aaa",
            pageIconSize: 15,
            pageTextStyle: {
                color: "#333"
            },
            animationDurationUpdate: 800
        }), e;
    }(rS), hS = Md, cS = [ "width", "height" ], pS = [ "x", "y" ], dS = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n.newlineDisabled = !0, n._currentIndex = 0, n;
        }
        return n(e, t), e.prototype.init = function() {
            t.prototype.init.call(this), this.group.add(this._containerGroup = new hS()), this._containerGroup.add(this.getContentGroup()), 
            this.group.add(this._controllerGroup = new hS());
        }, e.prototype.resetInner = function() {
            t.prototype.resetInner.call(this), this._controllerGroup.removeAll(), this._containerGroup.removeClipPath(), 
            this._containerGroup.__rectSize = null;
        }, e.prototype.renderInner = function(e, n, i, r, o, a, s) {
            function l(t, e) {
                var i = t + "DataIndex", o = Br(n.get("pageIcons", !0)[n.getOrient().name][e], {
                    onclick: Sc(u._pageGo, u, i, n, r)
                }, {
                    x: -p[0] / 2,
                    y: -p[1] / 2,
                    width: p[0],
                    height: p[1]
                });
                o.name = t, h.add(o);
            }
            var u = this;
            t.prototype.renderInner.call(this, e, n, i, r, o, a, s);
            var h = this._controllerGroup, c = n.get("pageIconSize", !0), p = x(c) ? c : [ c, c ];
            l("pagePrev", 0);
            var d = n.getModel("pageTextStyle");
            h.add(new Jf({
                name: "pageText",
                style: {
                    text: "xx/xx",
                    fill: d.getTextColor(),
                    font: d.getFont(),
                    verticalAlign: "middle",
                    align: "center"
                },
                silent: !0
            })), l("pageNext", 1);
        }, e.prototype.layoutInner = function(t, e, n, i, r, o) {
            var s = this.getSelectorGroup(), l = t.getOrient().index, u = cS[l], h = pS[l], c = cS[1 - l], p = pS[1 - l];
            r && yv("horizontal", s, t.get("selectorItemGap", !0));
            var d = t.get("selectorButtonGap", !0), f = s.getBoundingRect(), g = [ -f.x, -f.y ], y = a(n);
            r && (y[u] = n[u] - f[u] - d);
            var v = this._layoutContentAndController(t, i, y, l, u, c, p, h);
            if (r) {
                if ("end" === o) g[l] += v[u] + d; else {
                    var m = f[u] + d;
                    g[l] -= m, v[h] -= m;
                }
                v[u] += f[u] + d, g[1 - l] += v[p] + v[c] / 2 - f[c] / 2, v[c] = Math.max(v[c], f[c]), 
                v[p] = Math.min(v[p], f[p] + g[1 - l]), s.x = g[0], s.y = g[1], s.markRedraw();
            }
            return v;
        }, e.prototype._layoutContentAndController = function(t, e, n, i, r, o, a, s) {
            var l = this.getContentGroup(), u = this._containerGroup, h = this._controllerGroup;
            yv(t.get("orient"), l, t.get("itemGap"), i ? n.width : null, i ? null : n.height), 
            yv("horizontal", h, t.get("pageButtonItemGap", !0));
            var c = l.getBoundingRect(), p = h.getBoundingRect(), d = this._showController = c[r] > n[r], f = [ -c.x, -c.y ];
            e || (f[i] = l[s]);
            var g = [ 0, 0 ], y = [ -p.x, -p.y ], v = O(t.get("pageButtonGap", !0), t.get("itemGap", !0));
            d && ("end" === t.get("pageButtonPosition", !0) ? y[i] += n[r] - p[r] : g[i] += p[r] + v);
            y[1 - i] += c[o] / 2 - p[o] / 2, l.setPosition(f), u.setPosition(g), h.setPosition(y);
            var m = {
                x: 0,
                y: 0
            };
            if (m[r] = d ? n[r] : c[r], m[o] = Math.max(c[o], p[o]), m[a] = Math.min(0, p[a] + y[1 - i]), 
            u.__rectSize = n[r], d) {
                var _ = {
                    x: 0,
                    y: 0
                };
                _[r] = Math.max(n[r] - p[r] - v, 0), _[o] = m[o], u.setClipPath(new Kf({
                    shape: _
                })), u.__rectSize = _[r];
            } else h.eachChild(function(t) {
                t.attr({
                    invisible: !0,
                    silent: !0
                });
            });
            var x = this._getPageInfo(t);
            return null != x.pageIndex && fr(l, {
                x: x.contentPosition[0],
                y: x.contentPosition[1]
            }, d ? t : null), this._updatePageInfoView(t, x), m;
        }, e.prototype._pageGo = function(t, e, n) {
            var i = this._getPageInfo(e)[t];
            null != i && n.dispatchAction({
                type: "legendScroll",
                scrollDataIndex: i,
                legendId: e.id
            });
        }, e.prototype._updatePageInfoView = function(t, e) {
            var n = this._controllerGroup;
            f([ "pagePrev", "pageNext" ], function(i) {
                var r = null != e[i + "DataIndex"], o = n.childOfName(i);
                o && (o.setStyle("fill", r ? t.get("pageIconColor", !0) : t.get("pageIconInactiveColor", !0)), 
                o.cursor = r ? "pointer" : "default");
            });
            var i = n.childOfName("pageText"), r = t.get("pageFormatter"), o = e.pageIndex, a = null != o ? o + 1 : 0, s = e.pageCount;
            i && r && i.setStyle("text", b(r) ? r.replace("{current}", null == a ? "" : a + "").replace("{total}", null == s ? "" : s + "") : r({
                current: a,
                total: s
            }));
        }, e.prototype._getPageInfo = function(t) {
            function e(t) {
                if (t) {
                    var e = t.getBoundingRect(), n = e[l] + t[l];
                    return {
                        s: n,
                        e: n + e[s],
                        i: t.__legendDataIndex
                    };
                }
            }
            function n(t, e) {
                return t.e >= e && t.s <= e + o;
            }
            var i = t.get("scrollDataIndex", !0), r = this.getContentGroup(), o = this._containerGroup.__rectSize, a = t.getOrient().index, s = cS[a], l = pS[a], u = this._findTargetItemIndex(i), h = r.children(), c = h[u], p = h.length, d = p ? 1 : 0, f = {
                contentPosition: [ r.x, r.y ],
                pageCount: d,
                pageIndex: d - 1,
                pagePrevDataIndex: null,
                pageNextDataIndex: null
            };
            if (!c) return f;
            var g = e(c);
            f.contentPosition[a] = -g.s;
            for (var y = u + 1, v = g, m = g, _ = null; p >= y; ++y) (!(_ = e(h[y])) && m.e > v.s + o || _ && !n(_, v.s)) && ((v = m.i > v.i ? m : _) && (null == f.pageNextDataIndex && (f.pageNextDataIndex = v.i), 
            ++f.pageCount)), m = _;
            for (y = u - 1, v = g, m = g, _ = null; y >= -1; --y) (_ = e(h[y])) && n(m, _.s) || !(v.i < m.i) || (m = v, 
            null == f.pagePrevDataIndex && (f.pagePrevDataIndex = v.i), ++f.pageCount, ++f.pageIndex), 
            v = _;
            return f;
        }, e.prototype._findTargetItemIndex = function(t) {
            return this._showController ? (this.getContentGroup().eachChild(function(i, r) {
                var o = i.__legendDataIndex;
                null == n && null != o && (n = r), o === t && (e = r);
            }), null != e ? e : n) : 0;
            var e, n;
        }, e.type = "legend.scroll", e;
    }(lS);
    tu(function(t) {
        tu(_h), t.registerComponentModel(uS), t.registerComponentView(dS), function(t) {
            t.registerAction("legendScroll", "legendscroll", function(t, e) {
                var n = t.scrollDataIndex;
                null != n && e.eachComponent({
                    mainType: "legend",
                    subType: "scroll",
                    query: t
                }, function(t) {
                    t.setScrollDataIndex(n);
                });
            });
        }(t);
    });
    var fS = Tn(), gS = a, yS = Sc, vS = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this;
        }
        return n(e, t), e.prototype.makeElOption = function(t, e, n, i, r) {
            var o = n.axis, a = o.grid, s = i.get("type"), l = Dh(a, o).getOtherAxis(o).getGlobalExtent(), u = o.toGlobalCoord(o.dataToCoord(e, !0));
            if (s && "none" !== s) {
                var h = function(t) {
                    var e, n = t.get("type"), i = t.getModel(n + "Style");
                    return "line" === n ? (e = i.getLineStyle()).fill = null : "shadow" === n && ((e = i.getAreaStyle()).stroke = null), 
                    e;
                }(i), c = mS[s](o, u, l);
                c.style = h, t.graphicKey = c.type, t.pointer = c;
            }
            !function(t, e, n, i, r, o) {
                var a = Gb.innerTextLayout(n.rotation, 0, n.labelDirection);
                n.labelMargin = r.get([ "label", "margin" ]), Th(e, i, r, o, {
                    position: Ih(i.axis, t, n),
                    align: a.textAlign,
                    verticalAlign: a.textVerticalAlign
                });
            }(e, t, Ku(a.model, n), n, i, r);
        }, e.prototype.getHandleTransform = function(t, e, n) {
            var i = Ku(e.axis.grid.model, e, {
                labelInside: !1
            });
            i.labelMargin = n.get([ "handle", "margin" ]);
            var r = Ih(e.axis, t, i);
            return {
                x: r[0],
                y: r[1],
                rotation: i.rotation + (i.labelDirection < 0 ? Math.PI : 0)
            };
        }, e.prototype.updateHandleTransform = function(t, e, n) {
            var i = n.axis, r = i.grid, o = i.getGlobalExtent(!0), a = Dh(r, i).getOtherAxis(i).getGlobalExtent(), s = "x" === i.dim ? 0 : 1, l = [ t.x, t.y ];
            l[s] += e[s], l[s] = Math.min(o[1], l[s]), l[s] = Math.max(o[0], l[s]);
            var u = (a[1] + a[0]) / 2, h = [ u, u ];
            h[s] = l[s];
            return {
                x: l[0],
                y: l[1],
                rotation: t.rotation,
                cursorPoint: h,
                tooltipOption: [ {
                    verticalAlign: "middle"
                }, {
                    align: "center"
                } ][s]
            };
        }, e;
    }(function() {
        function t() {
            this._dragging = !1, this.animationThreshold = 15;
        }
        return t.prototype.render = function(t, e, n, i) {
            var r = e.get("value"), o = e.get("status");
            if (this._axisModel = t, this._axisPointerModel = e, this._api = n, i || this._lastValue !== r || this._lastStatus !== o) {
                this._lastValue = r, this._lastStatus = o;
                var a = this._group, s = this._handle;
                if (!o || "hide" === o) return a && a.hide(), void (s && s.hide());
                a && a.show(), s && s.show();
                var l = {};
                this.makeElOption(l, r, t, e, n);
                var u = l.graphicKey;
                u !== this._lastGraphicKey && this.clear(n), this._lastGraphicKey = u;
                var h = this._moveAnimation = this.determineAnimation(t, e);
                if (a) {
                    var c = _(wh, e, h);
                    this.updatePointerEl(a, l, c), this.updateLabelEl(a, l, c, e);
                } else a = this._group = new Md(), this.createPointerEl(a, l, t, e), this.createLabelEl(a, l, t, e), 
                n.getZr().add(a);
                Mh(a, e, !0), this._renderHandle(r);
            }
        }, t.prototype.remove = function(t) {
            this.clear(t);
        }, t.prototype.dispose = function(t) {
            this.clear(t);
        }, t.prototype.determineAnimation = function(t, e) {
            var n = e.get("animation"), i = t.axis, r = "category" === i.type, o = e.get("snap");
            if (!o && !r) return !1;
            if ("auto" === n || null == n) {
                var a = this.animationThreshold;
                if (r && i.getBandWidth() > a) return !0;
                if (o) {
                    var s = hh(t).seriesDataCount, l = i.getExtent();
                    return Math.abs(l[0] - l[1]) / s > a;
                }
                return !1;
            }
            return !0 === n;
        }, t.prototype.makeElOption = function() {}, t.prototype.createPointerEl = function(t, e) {
            var n = e.pointer;
            if (n) {
                var i = fS(t).pointerEl = new Ay[n.type](gS(e.pointer));
                t.add(i);
            }
        }, t.prototype.createLabelEl = function(t, e, n, i) {
            if (e.label) {
                var r = fS(t).labelEl = new Jf(gS(e.label));
                t.add(r), bh(r, i);
            }
        }, t.prototype.updatePointerEl = function(t, e, n) {
            var i = fS(t).pointerEl;
            i && e.pointer && (i.setStyle(e.pointer.style), n(i, {
                shape: e.pointer.shape
            }));
        }, t.prototype.updateLabelEl = function(t, e, n, i) {
            var r = fS(t).labelEl;
            r && (r.setStyle(e.label.style), n(r, {
                x: e.label.x,
                y: e.label.y
            }), bh(r, i));
        }, t.prototype._renderHandle = function(t) {
            if (!this._dragging && this.updateHandleTransform) {
                var e, n = this._axisPointerModel, i = this._api.getZr(), r = this._handle, o = n.getModel("handle"), a = n.get("status");
                if (!o.get("show") || !a || "hide" === a) return r && i.remove(r), void (this._handle = null);
                this._handle || (e = !0, r = this._handle = Br(o.get("icon"), {
                    cursor: "move",
                    draggable: !0,
                    onmousemove: function(t) {
                        Yc(t.event);
                    },
                    onmousedown: yS(this._onHandleDragMove, this, 0, 0),
                    drift: yS(this._onHandleDragMove, this),
                    ondragend: yS(this._onHandleDragEnd, this)
                }), i.add(r)), Mh(r, n, !1), r.setStyle(o.getItemStyle(null, [ "color", "borderColor", "borderWidth", "opacity", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY" ]));
                var s = o.get("size");
                x(s) || (s = [ s, s ]), r.scaleX = s[0] / 2, r.scaleY = s[1] / 2, Ja(this, "_doDispatchAxisPointer", o.get("throttle") || 0, "fixRate"), 
                this._moveHandleToValue(t, e);
            }
        }, t.prototype._moveHandleToValue = function(t, e) {
            wh(this._axisPointerModel, !e && this._moveAnimation, this._handle, Sh(this.getHandleTransform(t, this._axisModel, this._axisPointerModel)));
        }, t.prototype._onHandleDragMove = function(t, e) {
            var n = this._handle;
            if (n) {
                this._dragging = !0;
                var i = this.updateHandleTransform(Sh(n), [ t, e ], this._axisModel, this._axisPointerModel);
                this._payloadInfo = i, n.stopAnimation(), n.attr(Sh(i)), fS(n).lastProp = null, 
                this._doDispatchAxisPointer();
            }
        }, t.prototype._doDispatchAxisPointer = function() {
            if (this._handle) {
                var t = this._payloadInfo, e = this._axisModel;
                this._api.dispatchAction({
                    type: "updateAxisPointer",
                    x: t.cursorPoint[0],
                    y: t.cursorPoint[1],
                    tooltipOption: t.tooltipOption,
                    axesInfo: [ {
                        axisDim: e.axis.dim,
                        axisIndex: e.componentIndex
                    } ]
                });
            }
        }, t.prototype._onHandleDragEnd = function() {
            if (this._dragging = !1, this._handle) {
                var t = this._axisPointerModel.get("value");
                this._moveHandleToValue(t), this._api.dispatchAction({
                    type: "hideTip"
                });
            }
        }, t.prototype.clear = function(t) {
            this._lastValue = null, this._lastStatus = null;
            var e = t.getZr(), n = this._group, i = this._handle;
            e && n && (this._lastGraphicKey = null, n && e.remove(n), i && e.remove(i), this._group = null, 
            this._handle = null, this._payloadInfo = null), ts(this, "_doDispatchAxisPointer");
        }, t.prototype.doClear = function() {}, t.prototype.buildLabel = function(t, e, n) {
            return {
                x: t[n = n || 0],
                y: t[1 - n],
                width: e[n],
                height: e[1 - n]
            };
        }, t;
    }()), mS = {
        line: function(t, e, n) {
            return {
                type: "Line",
                subPixelOptimize: !0,
                shape: function(t, e, n) {
                    return {
                        x1: t[n = n || 0],
                        y1: t[1 - n],
                        x2: e[n],
                        y2: e[1 - n]
                    };
                }([ e, n[0] ], [ e, n[1] ], Ah(t))
            };
        },
        shadow: function(t, e, n) {
            var i = Math.max(1, t.getBandWidth()), r = n[1] - n[0];
            return {
                type: "Rect",
                shape: kh([ e - i / 2, n[0] ], [ i, r ], Ah(t))
            };
        }
    }, _S = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.type = "axisPointer", e.defaultOption = {
            show: "auto",
            z: 50,
            type: "line",
            snap: !1,
            triggerTooltip: !0,
            triggerEmphasis: !0,
            value: null,
            status: null,
            link: [],
            animation: null,
            animationDurationUpdate: 200,
            lineStyle: {
                color: "#B9BEC9",
                width: 1,
                type: "dashed"
            },
            shadowStyle: {
                color: "rgba(210,219,238,0.2)"
            },
            label: {
                show: !0,
                formatter: null,
                precision: "auto",
                margin: 3,
                color: "#fff",
                padding: [ 5, 7, 5, 7 ],
                backgroundColor: "auto",
                borderColor: null,
                borderWidth: 0,
                borderRadius: 3
            },
            handle: {
                show: !1,
                icon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
                size: 45,
                margin: 50,
                color: "#333",
                shadowBlur: 3,
                shadowColor: "#aaa",
                shadowOffsetX: 0,
                shadowOffsetY: 2,
                throttle: 40
            }
        }, e;
    }(mv), xS = Tn(), wS = f, bS = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.prototype.render = function(t, e, n) {
            var i = e.getComponent("tooltip"), r = t.get("triggerOn") || i && i.get("triggerOn") || "mousemove|click";
            Ph("axisPointer", n, function(t, e, n) {
                "none" !== r && ("leave" === t || r.indexOf(t) >= 0) && n({
                    type: "updateAxisPointer",
                    currTrigger: t,
                    x: e && e.offsetX,
                    y: e && e.offsetY
                });
            });
        }, e.prototype.remove = function(t, e) {
            Rh("axisPointer", e);
        }, e.prototype.dispose = function(t, e) {
            Rh("axisPointer", e);
        }, e.type = "axisPointer", e;
    }(Rm), SS = Tn(), MS = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.type = "tooltip", e.dependencies = [ "axisPointer" ], e.defaultOption = {
            z: 60,
            show: !0,
            showContent: !0,
            trigger: "item",
            triggerOn: "mousemove|click",
            alwaysShowContent: !1,
            displayMode: "single",
            renderMode: "auto",
            confine: null,
            showDelay: 0,
            hideDelay: 100,
            transitionDuration: .4,
            enterable: !1,
            backgroundColor: "#fff",
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, .2)",
            shadowOffsetX: 1,
            shadowOffsetY: 2,
            borderRadius: 4,
            borderWidth: 1,
            padding: null,
            extraCssText: "",
            axisPointer: {
                type: "line",
                axis: "auto",
                animation: "auto",
                animationDurationUpdate: 200,
                animationEasingUpdate: "exponentialOut",
                crossStyle: {
                    color: "#999",
                    width: 1,
                    type: "dashed",
                    textStyle: {}
                }
            },
            textStyle: {
                color: "#666",
                fontSize: 14
            }
        }, e;
    }(mv), TS = Uh([ "transform", "webkitTransform", "OTransform", "MozTransform", "msTransform" ]), CS = Xh(Uh([ "webkitTransition", "transition", "OTransition", "MozTransition", "msTransition" ]), "transition"), IS = Xh(TS, "transform"), kS = "position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;" + (ic.transform3dSupported ? "will-change:transform;" : ""), DS = function() {
        function t(t, e, n) {
            if (this._show = !1, this._styleCoord = [ 0, 0, 0, 0 ], this._enterable = !0, this._alwaysShowContent = !1, 
            this._firstShow = !0, this._longHide = !0, ic.wxa) return null;
            var i = document.createElement("div");
            i.domBelongToZr = !0, this.el = i;
            var r = this._zr = e.getZr(), o = this._appendToBody = n && n.appendToBody;
            jh(this._styleCoord, r, o, e.getWidth() / 2, e.getHeight() / 2), o ? document.body.appendChild(i) : t.appendChild(i), 
            this._container = t;
            var a = this;
            i.onmouseenter = function() {
                a._enterable && (clearTimeout(a._hideTimeout), a._show = !0), a._inContent = !0;
            }, i.onmousemove = function(t) {
                if (t = t || window.event, !a._enterable) {
                    var e = r.handler;
                    gt(r.painter.getViewportRoot(), t, !0), e.dispatch("mousemove", t);
                }
            }, i.onmouseleave = function() {
                a._inContent = !1, a._enterable && a._show && a.hideLater(a._hideDelay);
            };
        }
        return t.prototype.update = function(t) {
            var e = this._container, n = function(t, e) {
                var n = t.currentStyle || document.defaultView && document.defaultView.getComputedStyle(t);
                return n ? e ? n[e] : n : null;
            }(e, "position"), i = e.style;
            "absolute" !== i.position && "absolute" !== n && (i.position = "relative");
            var r = t.get("alwaysShowContent");
            r && this._moveIfResized(), this._alwaysShowContent = r, this.el.className = t.get("className") || "";
        }, t.prototype.show = function(t, e) {
            clearTimeout(this._hideTimeout), clearTimeout(this._longHideTimeout);
            var n = this.el, i = n.style, r = this._styleCoord;
            n.innerHTML ? i.cssText = kS + qh(t, !this._firstShow, this._longHide) + Yh(r[0], r[1], !0) + "border-color:" + To(e) + ";" + (t.get("extraCssText") || "") + ";pointer-events:" + (this._enterable ? "auto" : "none") : i.display = "none", 
            this._show = !0, this._firstShow = !1, this._longHide = !1;
        }, t.prototype.setContent = function(t, e, n, i, r) {
            var o = this.el;
            if (null != t) {
                var a = "";
                if (b(r) && "item" === n.get("trigger") && !Gh(n) && (a = function(t, e, n) {
                    if (!b(n) || "inside" === n) return "";
                    var i = t.get("backgroundColor"), r = t.get("borderWidth");
                    e = To(e);
                    var o, a = function(t) {
                        return "left" === t ? "right" : "right" === t ? "left" : "top" === t ? "bottom" : "top";
                    }(n), s = Math.max(1.5 * Math.round(r), 6), l = "", u = IS + ":";
                    h([ "left", "right" ], a) > -1 ? (l += "top:50%", u += "translateY(-50%) rotate(" + (o = "left" === a ? -225 : -45) + "deg)") : (l += "left:50%", 
                    u += "translateX(-50%) rotate(" + (o = "top" === a ? 225 : 45) + "deg)");
                    var c = o * Math.PI / 180, p = s + r, d = p * Math.abs(Math.cos(c)) + p * Math.abs(Math.sin(c)), f = e + " solid " + r + "px;";
                    return '<div style="' + [ "position:absolute;width:" + s + "px;height:" + s + "px;z-index:-1;", (l += ";" + a + ":-" + Math.round(100 * ((d - Math.SQRT2 * r) / 2 + Math.SQRT2 * r - (d - p) / 2)) / 100 + "px") + ";" + u + ";", "border-bottom:" + f, "border-right:" + f, "background-color:" + i + ";" ].join("") + '"></div>';
                }(n, i, r)), b(t)) o.innerHTML = t + a; else if (t) {
                    o.innerHTML = "", x(t) || (t = [ t ]);
                    for (var s = 0; s < t.length; s++) k(t[s]) && t[s].parentNode !== o && o.appendChild(t[s]);
                    if (a && o.childNodes.length) {
                        var l = document.createElement("div");
                        l.innerHTML = a, o.appendChild(l);
                    }
                }
            } else o.innerHTML = "";
        }, t.prototype.setEnterable = function(t) {
            this._enterable = t;
        }, t.prototype.getSize = function() {
            var t = this.el;
            return [ t.offsetWidth, t.offsetHeight ];
        }, t.prototype.moveTo = function(t, e) {
            var n = this._styleCoord;
            if (jh(n, this._zr, this._appendToBody, t, e), null != n[0] && null != n[1]) {
                var i = this.el.style;
                f(Yh(n[0], n[1]), function(t) {
                    i[t[0]] = t[1];
                });
            }
        }, t.prototype._moveIfResized = function() {
            var t = this._styleCoord[2], e = this._styleCoord[3];
            this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
        }, t.prototype.hide = function() {
            var t = this, e = this.el.style;
            e.visibility = "hidden", e.opacity = "0", ic.transform3dSupported && (e.willChange = ""), 
            this._show = !1, this._longHideTimeout = setTimeout(function() {
                return t._longHide = !0;
            }, 500);
        }, t.prototype.hideLater = function(t) {
            !this._show || this._inContent && this._enterable || this._alwaysShowContent || (t ? (this._hideDelay = t, 
            this._show = !1, this._hideTimeout = setTimeout(Sc(this.hide, this), t)) : this.hide());
        }, t.prototype.isShow = function() {
            return this._show;
        }, t.prototype.dispose = function() {
            this.el.parentNode.removeChild(this.el);
        }, t;
    }(), AS = function() {
        function t(t) {
            this._show = !1, this._styleCoord = [ 0, 0, 0, 0 ], this._alwaysShowContent = !1, 
            this._enterable = !0, this._zr = t.getZr(), $h(this._styleCoord, this._zr, t.getWidth() / 2, t.getHeight() / 2);
        }
        return t.prototype.update = function(t) {
            var e = t.get("alwaysShowContent");
            e && this._moveIfResized(), this._alwaysShowContent = e;
        }, t.prototype.show = function() {
            this._hideTimeout && clearTimeout(this._hideTimeout), this.el.show(), this._show = !0;
        }, t.prototype.setContent = function(t, e, n, i) {
            var r = this;
            T(t) && pn(""), this.el && this._zr.remove(this.el);
            var o = n.getModel("textStyle");
            this.el = new Jf({
                style: {
                    rich: e.richTextStyles,
                    text: t,
                    lineHeight: 22,
                    borderWidth: 1,
                    borderColor: i,
                    textShadowColor: o.get("textShadowColor"),
                    fill: n.get([ "textStyle", "color" ]),
                    padding: Ea(n, "richText"),
                    verticalAlign: "top",
                    align: "left"
                },
                z: n.get("z")
            }), f([ "backgroundColor", "borderRadius", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY" ], function(t) {
                r.el.style[t] = n.get(t);
            }), f([ "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY" ], function(t) {
                r.el.style[t] = o.get(t) || 0;
            }), this._zr.add(this.el);
            var a = this;
            this.el.on("mouseover", function() {
                a._enterable && (clearTimeout(a._hideTimeout), a._show = !0), a._inContent = !0;
            }), this.el.on("mouseout", function() {
                a._enterable && a._show && a.hideLater(a._hideDelay), a._inContent = !1;
            });
        }, t.prototype.setEnterable = function(t) {
            this._enterable = t;
        }, t.prototype.getSize = function() {
            var t = this.el, e = this.el.getBoundingRect(), n = Kh(t.style);
            return [ e.width + n.left + n.right, e.height + n.top + n.bottom ];
        }, t.prototype.moveTo = function(t, e) {
            var n = this.el;
            if (n) {
                var i = this._styleCoord;
                $h(i, this._zr, t, e), t = i[0], e = i[1];
                var r = n.style, o = Zh(r.borderWidth || 0), a = Kh(r);
                n.x = t + o + a.left, n.y = e + o + a.top, n.markRedraw();
            }
        }, t.prototype._moveIfResized = function() {
            var t = this._styleCoord[2], e = this._styleCoord[3];
            this.moveTo(t * this._zr.getWidth(), e * this._zr.getHeight());
        }, t.prototype.hide = function() {
            this.el && this.el.hide(), this._show = !1;
        }, t.prototype.hideLater = function(t) {
            !this._show || this._inContent && this._enterable || this._alwaysShowContent || (t ? (this._hideDelay = t, 
            this._show = !1, this._hideTimeout = setTimeout(Sc(this.hide, this), t)) : this.hide());
        }, t.prototype.isShow = function() {
            return this._show;
        }, t.prototype.dispose = function() {
            this._zr.remove(this.el);
        }, t;
    }(), PS = new Kf({
        shape: {
            x: -1,
            y: -1,
            width: 2,
            height: 2
        }
    }), LS = function(t) {
        function e() {
            var n = null !== t && t.apply(this, arguments) || this;
            return n.type = e.type, n;
        }
        return n(e, t), e.prototype.init = function(t, e) {
            if (!ic.node && e.getDom()) {
                var n = t.getComponent("tooltip"), i = this._renderMode = function(t) {
                    return "auto" === t ? ic.domSupported ? "html" : "richText" : t || "html";
                }(n.get("renderMode"));
                this._tooltipContent = "richText" === i ? new AS(e) : new DS(e.getDom(), e, {
                    appendToBody: n.get("appendToBody", !0)
                });
            }
        }, e.prototype.render = function(t, e, n) {
            if (!ic.node && n.getDom()) {
                this.group.removeAll(), this._tooltipModel = t, this._ecModel = e, this._api = n;
                var i = this._tooltipContent;
                i.update(t), i.setEnterable(t.get("enterable")), this._initGlobalListener(), this._keepShow(), 
                "richText" !== this._renderMode && t.get("transitionDuration") ? Ja(this, "_updatePosition", 50, "fixRate") : ts(this, "_updatePosition");
            }
        }, e.prototype._initGlobalListener = function() {
            var t = this._tooltipModel.get("triggerOn");
            Ph("itemTooltip", this._api, Sc(function(e, n, i) {
                "none" !== t && (t.indexOf(e) >= 0 ? this._tryShow(n, i) : "leave" === e && this._hide(i));
            }, this));
        }, e.prototype._keepShow = function() {
            var t = this._tooltipModel, e = this._ecModel, n = this._api, i = t.get("triggerOn");
            if (null != this._lastX && null != this._lastY && "none" !== i && "click" !== i) {
                var r = this;
                clearTimeout(this._refreshUpdateTimeout), this._refreshUpdateTimeout = setTimeout(function() {
                    !n.isDisposed() && r.manuallyShowTip(t, e, n, {
                        x: r._lastX,
                        y: r._lastY,
                        dataByCoordSys: r._lastDataByCoordSys
                    });
                });
            }
        }, e.prototype.manuallyShowTip = function(t, e, n, i) {
            if (i.from !== this.uid && !ic.node && n.getDom()) {
                var r = Jh(i, n);
                this._ticket = "";
                var o = i.dataByCoordSys, a = function(t, e, n) {
                    var i = In(t).queryOptionMap, r = i.keys()[0];
                    if (r && "series" !== r) {
                        var o, a = kn(e, r, i.get(r), {
                            useDefault: !1,
                            enableAll: !1,
                            enableNone: !1
                        }).models[0];
                        if (a) return n.getViewOfComponentModel(a).group.traverse(function(e) {
                            var n = ig(e).tooltipConfig;
                            return n && n.name === t.name ? (o = e, !0) : void 0;
                        }), o ? {
                            componentMainType: r,
                            componentIndex: a.componentIndex,
                            el: o
                        } : void 0;
                    }
                }(i, e, n);
                if (a) {
                    var s = a.el.getBoundingRect().clone();
                    s.applyTransform(a.el.transform), this._tryShow({
                        offsetX: s.x + s.width / 2,
                        offsetY: s.y + s.height / 2,
                        target: a.el,
                        position: i.position,
                        positionDefault: "bottom"
                    }, r);
                } else if (i.tooltip && null != i.x && null != i.y) {
                    var l = PS;
                    l.x = i.x, l.y = i.y, l.update(), ig(l).tooltipConfig = {
                        name: null,
                        option: i.tooltip
                    }, this._tryShow({
                        offsetX: i.x,
                        offsetY: i.y,
                        target: l
                    }, r);
                } else if (o) this._tryShow({
                    offsetX: i.x,
                    offsetY: i.y,
                    position: i.position,
                    dataByCoordSys: o,
                    tooltipOption: i.tooltipOption
                }, r); else if (null != i.seriesIndex) {
                    if (this._manuallyAxisShowTip(t, e, n, i)) return;
                    var u = Bh(i, e), h = u.point[0], c = u.point[1];
                    null != h && null != c && this._tryShow({
                        offsetX: h,
                        offsetY: c,
                        target: u.el,
                        position: i.position,
                        positionDefault: "bottom"
                    }, r);
                } else null != i.x && null != i.y && (n.dispatchAction({
                    type: "updateAxisPointer",
                    x: i.x,
                    y: i.y
                }), this._tryShow({
                    offsetX: i.x,
                    offsetY: i.y,
                    position: i.position,
                    target: n.getZr().findHover(i.x, i.y).target
                }, r));
            }
        }, e.prototype.manuallyHideTip = function(t, e, n, i) {
            var r = this._tooltipContent;
            this._tooltipModel && r.hideLater(this._tooltipModel.get("hideDelay")), this._lastX = this._lastY = this._lastDataByCoordSys = null, 
            i.from !== this.uid && this._hide(Jh(i, n));
        }, e.prototype._manuallyAxisShowTip = function(t, e, n, i) {
            var r = i.seriesIndex, o = i.dataIndex, a = e.getComponent("axisPointer").coordSysAxesInfo;
            if (null != r && null != o && null != a) {
                var s = e.getSeriesByIndex(r);
                if (s) if ("axis" === Qh([ s.getData().getItemModel(o), s, (s.coordinateSystem || {}).model ], this._tooltipModel).get("trigger")) return n.dispatchAction({
                    type: "updateAxisPointer",
                    seriesIndex: r,
                    dataIndex: o,
                    position: i.position
                }), !0;
            }
        }, e.prototype._tryShow = function(t, e) {
            var n = t.target;
            if (this._tooltipModel) {
                this._lastX = t.offsetX, this._lastY = t.offsetY;
                var i = t.dataByCoordSys;
                if (i && i.length) this._showAxisTooltip(i, t); else if (n) {
                    var r, o;
                    this._lastDataByCoordSys = null, fs(n, function(t) {
                        return null != ig(t).dataIndex ? (r = t, !0) : null != ig(t).tooltipConfig ? (o = t, 
                        !0) : void 0;
                    }, !0), r ? this._showSeriesItemTooltip(t, r, e) : o ? this._showComponentItemTooltip(t, o, e) : this._hide(e);
                } else this._lastDataByCoordSys = null, this._hide(e);
            }
        }, e.prototype._showOrMove = function(t, e) {
            var n = t.get("showDelay");
            e = Sc(e, this), clearTimeout(this._showTimout), n > 0 ? this._showTimout = setTimeout(e, n) : e();
        }, e.prototype._showAxisTooltip = function(t, e) {
            var n = this._ecModel, i = this._tooltipModel, r = [ e.offsetX, e.offsetY ], o = Qh([ e.tooltipOption ], i), a = this._renderMode, s = [], u = ka("section", {
                blocks: [],
                noHeader: !0
            }), h = [], c = new Pm();
            f(t, function(t) {
                f(t.dataByAxis, function(t) {
                    var e = n.getComponent(t.axisDim + "Axis", t.axisIndex), r = t.value;
                    if (e && null != r) {
                        var o = Ch(r, e.axis, n, t.seriesDataIndices, t.valueLabelOpt), p = ka("section", {
                            header: o,
                            noHeader: !N(o),
                            sortBlocks: !0,
                            blocks: []
                        });
                        u.blocks.push(p), f(t.seriesDataIndices, function(u) {
                            var d = n.getSeriesByIndex(u.seriesIndex), f = u.dataIndexInside, g = d.getDataParams(f);
                            if (!(g.dataIndex < 0)) {
                                g.axisDim = t.axisDim, g.axisIndex = t.axisIndex, g.axisType = t.axisType, g.axisId = t.axisId, 
                                g.axisValue = Kl(e.axis, {
                                    value: r
                                }), g.axisValueLabel = o, g.marker = c.makeTooltipMarker("item", To(g.color), a);
                                var y = pa(d.formatTooltip(f, !0, null)), v = y.frag;
                                if (v) {
                                    var m = Qh([ d ], i).get("valueFormatter");
                                    p.blocks.push(m ? l({
                                        valueFormatter: m
                                    }, v) : v);
                                }
                                y.text && h.push(y.text), s.push(g);
                            }
                        });
                    }
                });
            }), u.blocks.reverse(), h.reverse();
            var p = e.position, d = o.get("order"), g = Oa(u, c, a, d, n.get("useUTC"), o.get("textStyle"));
            g && h.unshift(g);
            var y = "richText" === a ? "\n\n" : "<br/>", v = h.join(y);
            this._showOrMove(o, function() {
                this._updateContentNotChangedOnAxis(t, s) ? this._updatePosition(o, p, r[0], r[1], this._tooltipContent, s) : this._showTooltipContent(o, v, s, Math.random() + "", r[0], r[1], p, null, c);
            });
        }, e.prototype._showSeriesItemTooltip = function(t, e, n) {
            var i = this._ecModel, r = ig(e), o = r.seriesIndex, a = i.getSeriesByIndex(o), s = r.dataModel || a, u = r.dataIndex, h = r.dataType, c = s.getData(h), p = this._renderMode, d = t.positionDefault, f = Qh([ c.getItemModel(u), s, a && (a.coordinateSystem || {}).model ], this._tooltipModel, d ? {
                position: d
            } : null), g = f.get("trigger");
            if (null == g || "item" === g) {
                var y = s.getDataParams(u, h), v = new Pm();
                y.marker = v.makeTooltipMarker("item", To(y.color), p);
                var m = pa(s.formatTooltip(u, !1, h)), _ = f.get("order"), x = f.get("valueFormatter"), w = m.frag, b = w ? Oa(x ? l({
                    valueFormatter: x
                }, w) : w, v, p, _, i.get("useUTC"), f.get("textStyle")) : m.text, S = "item_" + s.name + "_" + u;
                this._showOrMove(f, function() {
                    this._showTooltipContent(f, b, y, S, t.offsetX, t.offsetY, t.position, t.target, v);
                }), n({
                    type: "showTip",
                    dataIndexInside: u,
                    dataIndex: c.getRawIndex(u),
                    seriesIndex: o,
                    from: this.uid
                });
            }
        }, e.prototype._showComponentItemTooltip = function(t, e, n) {
            var i = ig(e), r = i.tooltipConfig.option || {};
            if (b(r)) {
                r = {
                    content: r,
                    formatter: r
                };
            }
            var o = [ r ], s = this._ecModel.getComponent(i.componentMainType, i.componentIndex);
            s && o.push(s), o.push({
                formatter: r.content
            });
            var l = t.positionDefault, u = Qh(o, this._tooltipModel, l ? {
                position: l
            } : null), h = u.get("content"), c = Math.random() + "", p = new Pm();
            this._showOrMove(u, function() {
                var n = a(u.get("formatterParams") || {});
                this._showTooltipContent(u, h, n, c, t.offsetX, t.offsetY, t.position, e, p);
            }), n({
                type: "showTip",
                from: this.uid
            });
        }, e.prototype._showTooltipContent = function(t, e, n, i, r, o, a, s, l) {
            if (this._ticket = "", t.get("showContent") && t.get("show")) {
                var u = this._tooltipContent;
                u.setEnterable(t.get("enterable"));
                var h = t.get("formatter");
                a = a || t.get("position");
                var c = e, p = this._getNearestPoint([ r, o ], n, t.get("trigger"), t.get("borderColor")).color;
                if (h) if (b(h)) {
                    var d = t.ecModel.get("useUTC"), f = x(n) ? n[0] : n;
                    c = h, f && f.axisType && f.axisType.indexOf("time") >= 0 && (c = no(f.axisValue, c, d)), 
                    c = So(c, n, !0);
                } else if (w(h)) {
                    var g = Sc(function(e, i) {
                        e === this._ticket && (u.setContent(i, l, t, p, a), this._updatePosition(t, a, r, o, u, n, s));
                    }, this);
                    this._ticket = i, c = h(n, i, g);
                } else c = h;
                u.setContent(c, l, t, p, a), u.show(t, p), this._updatePosition(t, a, r, o, u, n, s);
            }
        }, e.prototype._getNearestPoint = function(t, e, n, i) {
            return "axis" === n || x(e) ? {
                color: i || ("html" === this._renderMode ? "#fff" : "none")
            } : x(e) ? void 0 : {
                color: i || e.color || e.borderColor
            };
        }, e.prototype._updatePosition = function(t, e, n, i, r, o, a) {
            var s = this._api.getWidth(), l = this._api.getHeight();
            e = e || t.get("position");
            var u = r.getSize(), h = t.get("align"), c = t.get("verticalAlign"), p = a && a.getBoundingRect().clone();
            if (a && p.applyTransform(a.transform), w(e) && (e = e([ n, i ], o, r.el, p, {
                viewSize: [ s, l ],
                contentSize: u.slice()
            })), x(e)) n = Ze(e[0], s), i = Ze(e[1], l); else if (T(e)) {
                var d = e;
                d.width = u[0], d.height = u[1];
                var f = ko(d, {
                    width: s,
                    height: l
                });
                n = f.x, i = f.y, h = null, c = null;
            } else if (b(e) && a) {
                n = (g = function(t, e, n, i) {
                    var r = n[0], o = n[1], a = Math.ceil(Math.SQRT2 * i) + 8, s = 0, l = 0, u = e.width, h = e.height;
                    switch (t) {
                      case "inside":
                        s = e.x + u / 2 - r / 2, l = e.y + h / 2 - o / 2;
                        break;

                      case "top":
                        s = e.x + u / 2 - r / 2, l = e.y - o - a;
                        break;

                      case "bottom":
                        s = e.x + u / 2 - r / 2, l = e.y + h + a;
                        break;

                      case "left":
                        s = e.x - r - a, l = e.y + h / 2 - o / 2;
                        break;

                      case "right":
                        s = e.x + u + a, l = e.y + h / 2 - o / 2;
                    }
                    return [ s, l ];
                }(e, p, u, t.get("borderWidth")))[0], i = g[1];
            } else {
                var g = function(t, e, n, i, r, o, a) {
                    var s = n.getSize(), l = s[0], u = s[1];
                    return null != o && (t + l + o + 2 > i ? t -= l + o : t += o), null != a && (e + u + a > r ? e -= u + a : e += a), 
                    [ t, e ];
                }(n, i, r, s, l, h ? null : 20, c ? null : 20);
                n = g[0], i = g[1];
            }
            if (h && (n -= tc(h) ? u[0] / 2 : "right" === h ? u[0] : 0), c && (i -= tc(c) ? u[1] / 2 : "bottom" === c ? u[1] : 0), 
            Gh(t)) {
                g = function(t, e, n, i, r) {
                    var o = n.getSize(), a = o[0], s = o[1];
                    return t = Math.min(t + a, i) - a, e = Math.min(e + s, r) - s, [ t = Math.max(t, 0), e = Math.max(e, 0) ];
                }(n, i, r, s, l);
                n = g[0], i = g[1];
            }
            r.moveTo(n, i);
        }, e.prototype._updateContentNotChangedOnAxis = function(t, e) {
            var n = this._lastDataByCoordSys, i = this._cbParamsList, r = !!n && n.length === t.length;
            return r && f(n, function(n, o) {
                var a = n.dataByAxis || [], s = (t[o] || {}).dataByAxis || [];
                (r = r && a.length === s.length) && f(a, function(t, n) {
                    var o = s[n] || {}, a = t.seriesDataIndices || [], l = o.seriesDataIndices || [];
                    (r = r && t.value === o.value && t.axisType === o.axisType && t.axisId === o.axisId && a.length === l.length) && f(a, function(t, e) {
                        var n = l[e];
                        r = r && t.seriesIndex === n.seriesIndex && t.dataIndex === n.dataIndex;
                    }), i && f(t.seriesDataIndices, function(t) {
                        var n = t.seriesIndex, o = e[n], a = i[n];
                        o && a && a.data !== o.data && (r = !1);
                    });
                });
            }), this._lastDataByCoordSys = t, this._cbParamsList = e, !!r;
        }, e.prototype._hide = function(t) {
            this._lastDataByCoordSys = null, t({
                type: "hideTip",
                from: this.uid
            });
        }, e.prototype.dispose = function(t, e) {
            !ic.node && e.getDom() && (ts(this, "_updatePosition"), this._tooltipContent.dispose(), 
            Rh("itemTooltip", e));
        }, e.type = "tooltip", e;
    }(Rm);
    tu(function(t) {
        tu(Wh), t.registerComponentModel(MS), t.registerComponentView(LS), t.registerAction({
            type: "showTip",
            event: "showTip",
            update: "tooltip:manuallyShowTip"
        }, Y), t.registerAction({
            type: "hideTip",
            event: "hideTip",
            update: "tooltip:manuallyHideTip"
        }, Y);
    }), e.version = "5.4.3", e.dependencies = {
        zrender: "5.4.4"
    }, e.PRIORITY = N_, e.init = function(t, e, n) {
        var i = !(n && n.ssr);
        if (i) {
            var r = Xs(t);
            if (r) return r;
        }
        var o = new hx(t, e, n);
        return o.id = "ec_" + Sx++, xx[o.id] = o, i && Dn(t, Tx, o.id), sx(o), O_.trigger("afterinit", o), 
        o;
    }, e.connect = function(t) {
        if (x(t)) {
            var e = t;
            t = null, f(e, function(e) {
                null != e.group && (t = e.group);
            }), t = t || "g_" + Mx++, f(e, function(e) {
                e.group = t;
            });
        }
        return bx[t] = !0, t;
    }, e.disconnect = Us, e.disConnect = Cx, e.dispose = function(t) {
        b(t) ? t = xx[t] : t instanceof hx || (t = Xs(t)), t instanceof hx && !t.isDisposed() && t.dispose();
    }, e.getInstanceByDom = Xs, e.getInstanceById = function(t) {
        return xx[t];
    }, e.registerTheme = Ys, e.registerPreprocessor = qs, e.registerProcessor = js, 
    e.registerPostInit = Zs, e.registerPostUpdate = Ks, e.registerUpdateLifecycle = $s, 
    e.registerAction = Qs, e.registerCoordinateSystem = Js, e.getCoordinateSystemDimensions = function(t) {
        var e = Zv.get(t);
        return e ? e.getDimensionsInfo ? e.getDimensionsInfo() : e.dimensions.slice() : void 0;
    }, e.registerLayout = tl, e.registerVisual = el, e.registerLoading = il, e.setCanvasCreator = function(t) {
        i({
            createCanvas: t
        });
    }, e.registerMap = rl, e.getMap = function(t) {
        var e = Vs("getMap");
        return e && e(t);
    }, e.registerTransform = kx, e.dataTool = {}, e.registerLocale = $r, e.zrender = kd, 
    e.matrix = Zc, e.vector = Rc, e.zrUtil = Dc, e.color = Fp, e.helper = ww, e.number = Aw, 
    e.time = Pw, e.graphic = Lw, e.format = Ow, e.util = Rw, e.List = qx, e.ComponentModel = mv, 
    e.ComponentView = Rm, e.SeriesModel = Om, e.ChartView = zm, e.extendComponentModel = function(t) {
        var e = mv.extend(t);
        return mv.registerClass(e), e;
    }, e.extendComponentView = function(t) {
        var e = Rm.extend(t);
        return Rm.registerClass(e), e;
    }, e.extendSeriesModel = function(t) {
        var e = Om.extend(t);
        return Om.registerClass(e), e;
    }, e.extendChartView = function(t) {
        var e = zm.extend(t);
        return zm.registerClass(e), e;
    }, e.throttle = Qa, e.use = tu, e.setPlatformAPI = i, e.parseGeoJSON = su, e.parseGeoJson = su, 
    e.env = ic, e.Model = Yy, e.Axis = zw, e.innerDrawElementOnCanvas = Os;
});