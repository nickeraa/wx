module.exports = {
  urlToObj: function (r) {
    for (
      var t = {},
        e = r.slice(r.indexOf("?") + 1).split("&"),
        i = e.length,
        l = 0;
      l < i;
      l++
    ) {
      var s = e[l].split("=");
      t[s[0]] = s[1];
    }
    return t;
  },
};
