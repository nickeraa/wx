Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.toBarcode = function (e, r, o, a) {
    t.default.code128(wx.createCanvasContext(e), r, o, a);
  }),
  (exports.toQrcode = function (t, r, o, a) {
    e.default.api.draw(r, {
      ctx: wx.createCanvasContext(t),
      width: o,
      height: a,
    });
  });
var e = r(require("./qrcode")),
  t = r(require("./barcode"));
function r(e) {
  return e && e.__esModule ? e : { default: e };
}
