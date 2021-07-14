! function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "undefined" != typeof exports ? t() : (t(), e.FileSaver = {
        exports: {}
    }.exports)
}(this, function() {
    "use strict";

    function e(e, t) {
        return "undefined" == typeof t ? t = {
            autoBom: !1
        } : "object" != typeof t && (console.warn("Deprecated: Expected third argument to be a object"), t = {
            autoBom: !t
        }), t.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\ufeff", e], {
            type: e.type
        }) : e
    }

    function t(e, t, r) {
        var i = new XMLHttpRequest;
        i.open("GET", e), i.responseType = "blob", i.onload = function() {
            o(i.response, t, r)
        }, i.onerror = function() {
            console.error("could not download file")
        }, i.send()
    }

    function r(e) {
        var t = new XMLHttpRequest;
        t.open("HEAD", e, !1);
        try {
            t.send()
        } catch (e) {}
        return 200 <= t.status && 299 >= t.status
    }

    function i(e) {
        try {
            e.dispatchEvent(new MouseEvent("click"))
        } catch (t) {
            var r = document.createEvent("MouseEvents");
            r.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(r)
        }
    }
    var n = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof global && global.global === global ? global : void 0,
        o = n.saveAs || ("object" != typeof window || window !== n ? function() {} : "download" in HTMLAnchorElement.prototype ? function(e, o, s) {
            var a = n.URL || n.webkitURL,
                c = document.createElement("a");
            o = o || e.name || "download", c.download = o, c.rel = "noopener", "string" == typeof e ? (c.href = e, c.origin === location.origin ? i(c) : r(c.href) ? t(e, o, s) : i(c, c.target = "_blank")) : (c.href = a.createObjectURL(e), setTimeout(function() {
                a.revokeObjectURL(c.href)
            }, 4e4), setTimeout(function() {
                i(c)
            }, 0))
        } : "msSaveOrOpenBlob" in navigator ? function(n, o, s) {
            if (o = o || n.name || "download", "string" != typeof n) navigator.msSaveOrOpenBlob(e(n, s), o);
            else if (r(n)) t(n, o, s);
            else {
                var a = document.createElement("a");
                a.href = n, a.target = "_blank", setTimeout(function() {
                    i(a)
                })
            }
        } : function(e, r, i, o) {
            if (o = o || open("", "_blank"), o && (o.document.title = o.document.body.innerText = "downloading..."), "string" == typeof e) return t(e, r, i);
            var s = "application/octet-stream" === e.type,
                a = /constructor/i.test(n.HTMLElement) || n.safari,
                c = /CriOS\/[\d]+/.test(navigator.userAgent);
            if ((c || s && a) && "undefined" != typeof FileReader) {
                var h = new FileReader;
                h.onloadend = function() {
                    var e = h.result;
                    e = c ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;"), o ? o.location.href = e : location = e, o = null
                }, h.readAsDataURL(e)
            } else {
                var l = n.URL || n.webkitURL,
                    f = l.createObjectURL(e);
                o ? o.location = f : location.href = f, o = null, setTimeout(function() {
                    l.revokeObjectURL(f)
                }, 4e4)
            }
        });
    n.saveAs = o.saveAs = o, "undefined" != typeof module && (module.exports = o)
}),
function(e, t) {
    "object" == typeof exports ? module.exports = exports = t() : "function" == typeof define && define.amd ? define([], t) : e.J2TEAM = t()
}(this, function() {
    var e = e || function(e, t) {
        var r = Object.create || function() {
                function e() {}
                return function(t) {
                    var r;
                    return e.prototype = t, r = new e, e.prototype = null, r
                }
            }(),
            i = {},
            n = i.lib = {},
            o = n.Base = function() {
                return {
                    extend: function(e) {
                        var t = r(this);
                        return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function() {
                            t.$super.init.apply(this, arguments)
                        }), t.init.prototype = t, t.$super = this, t
                    },
                    create: function() {
                        var e = this.extend();
                        return e.init.apply(e, arguments), e
                    },
                    init: function() {},
                    mixIn: function(e) {
                        for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                        e.hasOwnProperty("toString") && (this.toString = e.toString)
                    },
                    clone: function() {
                        return this.init.prototype.extend(this)
                    }
                }
            }(),
            s = n.WordArray = o.extend({
                init: function(e, r) {
                    e = this.words = e || [], r != t ? this.sigBytes = r : this.sigBytes = 4 * e.length
                },
                toString: function(e) {
                    return (e || c).stringify(this)
                },
                concat: function(e) {
                    var t = this.words,
                        r = e.words,
                        i = this.sigBytes,
                        n = e.sigBytes;
                    if (this.clamp(), i % 4)
                        for (var o = 0; o < n; o++) {
                            var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                            t[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8
                        } else
                            for (var o = 0; o < n; o += 4) t[i + o >>> 2] = r[o >>> 2];
                    return this.sigBytes += n, this
                },
                clamp: function() {
                    var t = this.words,
                        r = this.sigBytes;
                    t[r >>> 2] &= 4294967295 << 32 - r % 4 * 8, t.length = e.ceil(r / 4)
                },
                clone: function() {
                    var e = o.clone.call(this);
                    return e.words = this.words.slice(0), e
                },
                random: function(t) {
                    for (var r, i = [], n = function(t) {
                            var t = t,
                                r = 987654321,
                                i = 4294967295;
                            return function() {
                                r = 36969 * (65535 & r) + (r >> 16) & i, t = 18e3 * (65535 & t) + (t >> 16) & i;
                                var n = (r << 16) + t & i;
                                return n /= 4294967296, n += .5, n * (e.random() > .5 ? 1 : -1)
                            }
                        }, o = 0; o < t; o += 4) {
                        var a = n(4294967296 * (r || e.random()));
                        r = 987654071 * a(), i.push(4294967296 * a() | 0)
                    }
                    return new s.init(i, t)
                }
            }),
            a = i.enc = {},
            c = a.Hex = {
                stringify: function(e) {
                    for (var t = e.words, r = e.sigBytes, i = [], n = 0; n < r; n++) {
                        var o = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                        i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16))
                    }
                    return i.join("")
                },
                parse: function(e) {
                    for (var t = e.length, r = [], i = 0; i < t; i += 2) r[i >>> 3] |= parseInt(e.substr(i, 2), 16) << 24 - i % 8 * 4;
                    return new s.init(r, t / 2)
                }
            },
            h = a.Latin1 = {
                stringify: function(e) {
                    for (var t = e.words, r = e.sigBytes, i = [], n = 0; n < r; n++) {
                        var o = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                        i.push(String.fromCharCode(o))
                    }
                    return i.join("")
                },
                parse: function(e) {
                    for (var t = e.length, r = [], i = 0; i < t; i++) r[i >>> 2] |= (255 & e.charCodeAt(i)) << 24 - i % 4 * 8;
                    return new s.init(r, t)
                }
            },
            l = a.Utf8 = {
                stringify: function(e) {
                    try {
                        return decodeURIComponent(escape(h.stringify(e)))
                    } catch (t) {
                        throw new Error("Malformed UTF-8 data")
                    }
                },
                parse: function(e) {
                    return h.parse(unescape(encodeURIComponent(e)))
                }
            },
            f = n.BufferedBlockAlgorithm = o.extend({
                reset: function() {
                    this._data = new s.init, this._nDataBytes = 0
                },
                _append: function(e) {
                    "string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                },
                _process: function(t) {
                    var r = this._data,
                        i = r.words,
                        n = r.sigBytes,
                        o = this.blockSize,
                        a = 4 * o,
                        c = n / a;
                    c = t ? e.ceil(c) : e.max((0 | c) - this._minBufferSize, 0);
                    var h = c * o,
                        l = e.min(4 * h, n);
                    if (h) {
                        for (var f = 0; f < h; f += o) this._doProcessBlock(i, f);
                        var u = i.splice(0, h);
                        r.sigBytes -= l
                    }
                    return new s.init(u, l)
                },
                clone: function() {
                    var e = o.clone.call(this);
                    return e._data = this._data.clone(), e
                },
                _minBufferSize: 0
            }),
            u = (n.Hasher = f.extend({
                cfg: o.extend(),
                init: function(e) {
                    this.cfg = this.cfg.extend(e), this.reset()
                },
                reset: function() {
                    f.reset.call(this), this._doReset()
                },
                update: function(e) {
                    return this._append(e), this._process(), this
                },
                finalize: function(e) {
                    e && this._append(e);
                    var t = this._doFinalize();
                    return t
                },
                blockSize: 16,
                _createHelper: function(e) {
                    return function(t, r) {
                        return new e.init(r).finalize(t)
                    }
                },
                _createHmacHelper: function(e) {
                    return function(t, r) {
                        return new u.HMAC.init(e, r).finalize(t)
                    }
                }
            }), i.algo = {});
        return i
    }(Math);
    return function() {
            function t(e, t, r) {
                for (var i = [], o = 0, s = 0; s < t; s++)
                    if (s % 4) {
                        var a = r[e.charCodeAt(s - 1)] << s % 4 * 2,
                            c = r[e.charCodeAt(s)] >>> 6 - s % 4 * 2;
                        i[o >>> 2] |= (a | c) << 24 - o % 4 * 8, o++
                    } return n.create(i, o)
            }
            var r = e,
                i = r.lib,
                n = i.WordArray,
                o = r.enc;
            o.Base64 = {
                stringify: function(e) {
                    var t = e.words,
                        r = e.sigBytes,
                        i = this._map;
                    e.clamp();
                    for (var n = [], o = 0; o < r; o += 3)
                        for (var s = t[o >>> 2] >>> 24 - o % 4 * 8 & 255, a = t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, c = t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, h = s << 16 | a << 8 | c, l = 0; l < 4 && o + .75 * l < r; l++) n.push(i.charAt(h >>> 6 * (3 - l) & 63));
                    var f = i.charAt(64);
                    if (f)
                        for (; n.length % 4;) n.push(f);
                    return n.join("")
                },
                parse: function(e) {
                    var r = e.length,
                        i = this._map,
                        n = this._reverseMap;
                    if (!n) {
                        n = this._reverseMap = [];
                        for (var o = 0; o < i.length; o++) n[i.charCodeAt(o)] = o
                    }
                    var s = i.charAt(64);
                    if (s) {
                        var a = e.indexOf(s);
                        a !== -1 && (r = a)
                    }
                    return t(e, r, n)
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
            }
        }(),
        function(t) {
            function r(e, t, r, i, n, o, s) {
                var a = e + (t & r | ~t & i) + n + s;
                return (a << o | a >>> 32 - o) + t
            }

            function i(e, t, r, i, n, o, s) {
                var a = e + (t & i | r & ~i) + n + s;
                return (a << o | a >>> 32 - o) + t
            }

            function n(e, t, r, i, n, o, s) {
                var a = e + (t ^ r ^ i) + n + s;
                return (a << o | a >>> 32 - o) + t
            }

            function o(e, t, r, i, n, o, s) {
                var a = e + (r ^ (t | ~i)) + n + s;
                return (a << o | a >>> 32 - o) + t
            }
            var s = e,
                a = s.lib,
                c = a.WordArray,
                h = a.Hasher,
                l = s.algo,
                f = [];
            ! function() {
                for (var e = 0; e < 64; e++) f[e] = 4294967296 * t.abs(t.sin(e + 1)) | 0
            }();
            var u = l.MD5 = h.extend({
                _doReset: function() {
                    this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
                },
                _doProcessBlock: function(e, t) {
                    for (var s = 0; s < 16; s++) {
                        var a = t + s,
                            c = e[a];
                        e[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                    }
                    var h = this._hash.words,
                        l = e[t + 0],
                        u = e[t + 1],
                        d = e[t + 2],
                        p = e[t + 3],
                        v = e[t + 4],
                        _ = e[t + 5],
                        y = e[t + 6],
                        g = e[t + 7],
                        w = e[t + 8],
                        B = e[t + 9],
                        k = e[t + 10],
                        m = e[t + 11],
                        b = e[t + 12],
                        S = e[t + 13],
                        x = e[t + 14],
                        A = e[t + 15],
                        H = h[0],
                        z = h[1],
                        C = h[2],
                        E = h[3];
                    H = r(H, z, C, E, l, 7, f[0]), E = r(E, H, z, C, u, 12, f[1]), C = r(C, E, H, z, d, 17, f[2]), z = r(z, C, E, H, p, 22, f[3]), H = r(H, z, C, E, v, 7, f[4]), E = r(E, H, z, C, _, 12, f[5]), C = r(C, E, H, z, y, 17, f[6]), z = r(z, C, E, H, g, 22, f[7]), H = r(H, z, C, E, w, 7, f[8]), E = r(E, H, z, C, B, 12, f[9]), C = r(C, E, H, z, k, 17, f[10]), z = r(z, C, E, H, m, 22, f[11]), H = r(H, z, C, E, b, 7, f[12]), E = r(E, H, z, C, S, 12, f[13]), C = r(C, E, H, z, x, 17, f[14]), z = r(z, C, E, H, A, 22, f[15]), H = i(H, z, C, E, u, 5, f[16]), E = i(E, H, z, C, y, 9, f[17]), C = i(C, E, H, z, m, 14, f[18]), z = i(z, C, E, H, l, 20, f[19]), H = i(H, z, C, E, _, 5, f[20]), E = i(E, H, z, C, k, 9, f[21]), C = i(C, E, H, z, A, 14, f[22]), z = i(z, C, E, H, v, 20, f[23]), H = i(H, z, C, E, B, 5, f[24]), E = i(E, H, z, C, x, 9, f[25]), C = i(C, E, H, z, p, 14, f[26]), z = i(z, C, E, H, w, 20, f[27]), H = i(H, z, C, E, S, 5, f[28]), E = i(E, H, z, C, d, 9, f[29]), C = i(C, E, H, z, g, 14, f[30]), z = i(z, C, E, H, b, 20, f[31]), H = n(H, z, C, E, _, 4, f[32]), E = n(E, H, z, C, w, 11, f[33]), C = n(C, E, H, z, m, 16, f[34]), z = n(z, C, E, H, x, 23, f[35]), H = n(H, z, C, E, u, 4, f[36]), E = n(E, H, z, C, v, 11, f[37]), C = n(C, E, H, z, g, 16, f[38]), z = n(z, C, E, H, k, 23, f[39]), H = n(H, z, C, E, S, 4, f[40]), E = n(E, H, z, C, l, 11, f[41]), C = n(C, E, H, z, p, 16, f[42]), z = n(z, C, E, H, y, 23, f[43]), H = n(H, z, C, E, B, 4, f[44]), E = n(E, H, z, C, b, 11, f[45]), C = n(C, E, H, z, A, 16, f[46]), z = n(z, C, E, H, d, 23, f[47]), H = o(H, z, C, E, l, 6, f[48]), E = o(E, H, z, C, g, 10, f[49]), C = o(C, E, H, z, x, 15, f[50]), z = o(z, C, E, H, _, 21, f[51]), H = o(H, z, C, E, b, 6, f[52]), E = o(E, H, z, C, p, 10, f[53]), C = o(C, E, H, z, k, 15, f[54]), z = o(z, C, E, H, u, 21, f[55]), H = o(H, z, C, E, w, 6, f[56]), E = o(E, H, z, C, A, 10, f[57]), C = o(C, E, H, z, y, 15, f[58]), z = o(z, C, E, H, S, 21, f[59]), H = o(H, z, C, E, v, 6, f[60]), E = o(E, H, z, C, m, 10, f[61]), C = o(C, E, H, z, d, 15, f[62]), z = o(z, C, E, H, B, 21, f[63]), h[0] = h[0] + H | 0, h[1] = h[1] + z | 0, h[2] = h[2] + C | 0, h[3] = h[3] + E | 0
                },
                _doFinalize: function() {
                    var e = this._data,
                        r = e.words,
                        i = 8 * this._nDataBytes,
                        n = 8 * e.sigBytes;
                    r[n >>> 5] |= 128 << 24 - n % 32;
                    var o = t.floor(i / 4294967296),
                        s = i;
                    r[(n + 64 >>> 9 << 4) + 15] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), r[(n + 64 >>> 9 << 4) + 14] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), e.sigBytes = 4 * (r.length + 1), this._process();
                    for (var a = this._hash, c = a.words, h = 0; h < 4; h++) {
                        var l = c[h];
                        c[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                    }
                    return a
                },
                clone: function() {
                    var e = h.clone.call(this);
                    return e._hash = this._hash.clone(), e
                }
            });
            s.MD5 = h._createHelper(u), s.HmacMD5 = h._createHmacHelper(u)
        }(Math),
        function() {
            var t = e,
                r = t.lib,
                i = r.WordArray,
                n = r.Hasher,
                o = t.algo,
                s = [],
                a = o.SHA1 = n.extend({
                    _doReset: function() {
                        this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(e, t) {
                        for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], a = r[3], c = r[4], h = 0; h < 80; h++) {
                            if (h < 16) s[h] = 0 | e[t + h];
                            else {
                                var l = s[h - 3] ^ s[h - 8] ^ s[h - 14] ^ s[h - 16];
                                s[h] = l << 1 | l >>> 31
                            }
                            var f = (i << 5 | i >>> 27) + c + s[h];
                            f += h < 20 ? (n & o | ~n & a) + 1518500249 : h < 40 ? (n ^ o ^ a) + 1859775393 : h < 60 ? (n & o | n & a | o & a) - 1894007588 : (n ^ o ^ a) - 899497514, c = a, a = o, o = n << 30 | n >>> 2, n = i, i = f
                        }
                        r[0] = r[0] + i | 0, r[1] = r[1] + n | 0, r[2] = r[2] + o | 0, r[3] = r[3] + a | 0, r[4] = r[4] + c | 0
                    },
                    _doFinalize: function() {
                        var e = this._data,
                            t = e.words,
                            r = 8 * this._nDataBytes,
                            i = 8 * e.sigBytes;
                        return t[i >>> 5] |= 128 << 24 - i % 32, t[(i + 64 >>> 9 << 4) + 14] = Math.floor(r / 4294967296), t[(i + 64 >>> 9 << 4) + 15] = r, e.sigBytes = 4 * t.length, this._process(), this._hash
                    },
                    clone: function() {
                        var e = n.clone.call(this);
                        return e._hash = this._hash.clone(), e
                    }
                });
            t.SHA1 = n._createHelper(a), t.HmacSHA1 = n._createHmacHelper(a)
        }(),
        function(t) {
            var r = e,
                i = r.lib,
                n = i.WordArray,
                o = i.Hasher,
                s = r.algo,
                a = [],
                c = [];
            ! function() {
                function e(e) {
                    for (var r = t.sqrt(e), i = 2; i <= r; i++)
                        if (!(e % i)) return !1;
                    return !0
                }

                function r(e) {
                    return 4294967296 * (e - (0 | e)) | 0
                }
                for (var i = 2, n = 0; n < 64;) e(i) && (n < 8 && (a[n] = r(t.pow(i, .5))), c[n] = r(t.pow(i, 1 / 3)), n++), i++
            }();
            var h = [],
                l = s.SHA256 = o.extend({
                    _doReset: function() {
                        this._hash = new n.init(a.slice(0))
                    },
                    _doProcessBlock: function(e, t) {
                        for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], a = r[4], l = r[5], f = r[6], u = r[7], d = 0; d < 64; d++) {
                            if (d < 16) h[d] = 0 | e[t + d];
                            else {
                                var p = h[d - 15],
                                    v = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3,
                                    _ = h[d - 2],
                                    y = (_ << 15 | _ >>> 17) ^ (_ << 13 | _ >>> 19) ^ _ >>> 10;
                                h[d] = v + h[d - 7] + y + h[d - 16]
                            }
                            var g = a & l ^ ~a & f,
                                w = i & n ^ i & o ^ n & o,
                                B = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22),
                                k = (a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25),
                                m = u + k + g + c[d] + h[d],
                                b = B + w;
                            u = f, f = l, l = a, a = s + m | 0, s = o, o = n, n = i, i = m + b | 0
                        }
                        r[0] = r[0] + i | 0, r[1] = r[1] + n | 0, r[2] = r[2] + o | 0, r[3] = r[3] + s | 0, r[4] = r[4] + a | 0, r[5] = r[5] + l | 0, r[6] = r[6] + f | 0, r[7] = r[7] + u | 0
                    },
                    _doFinalize: function() {
                        var e = this._data,
                            r = e.words,
                            i = 8 * this._nDataBytes,
                            n = 8 * e.sigBytes;
                        return r[n >>> 5] |= 128 << 24 - n % 32, r[(n + 64 >>> 9 << 4) + 14] = t.floor(i / 4294967296), r[(n + 64 >>> 9 << 4) + 15] = i, e.sigBytes = 4 * r.length, this._process(), this._hash
                    },
                    clone: function() {
                        var e = o.clone.call(this);
                        return e._hash = this._hash.clone(), e
                    }
                });
            r.SHA256 = o._createHelper(l), r.HmacSHA256 = o._createHmacHelper(l)
        }(Math),
        function() {
            function t(e) {
                return e << 8 & 4278255360 | e >>> 8 & 16711935
            }
            var r = e,
                i = r.lib,
                n = i.WordArray,
                o = r.enc;
            o.Utf16 = o.Utf16BE = {
                stringify: function(e) {
                    for (var t = e.words, r = e.sigBytes, i = [], n = 0; n < r; n += 2) {
                        var o = t[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
                        i.push(String.fromCharCode(o))
                    }
                    return i.join("")
                },
                parse: function(e) {
                    for (var t = e.length, r = [], i = 0; i < t; i++) r[i >>> 1] |= e.charCodeAt(i) << 16 - i % 2 * 16;
                    return n.create(r, 2 * t)
                }
            };
            o.Utf16LE = {
                stringify: function(e) {
                    for (var r = e.words, i = e.sigBytes, n = [], o = 0; o < i; o += 2) {
                        var s = t(r[o >>> 2] >>> 16 - o % 4 * 8 & 65535);
                        n.push(String.fromCharCode(s))
                    }
                    return n.join("")
                },
                parse: function(e) {
                    for (var r = e.length, i = [], o = 0; o < r; o++) i[o >>> 1] |= t(e.charCodeAt(o) << 16 - o % 2 * 16);
                    return n.create(i, 2 * r)
                }
            }
        }(),
        function() {
            if ("function" == typeof ArrayBuffer) {
                var t = e,
                    r = t.lib,
                    i = r.WordArray,
                    n = i.init,
                    o = i.init = function(e) {
                        if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), (e instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && e instanceof Uint8ClampedArray || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array) && (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)), e instanceof Uint8Array) {
                            for (var t = e.byteLength, r = [], i = 0; i < t; i++) r[i >>> 2] |= e[i] << 24 - i % 4 * 8;
                            n.call(this, r, t)
                        } else n.apply(this, arguments)
                    };
                o.prototype = i
            }
        }(),
        function(t) {
            function r(e, t, r) {
                return e ^ t ^ r
            }

            function i(e, t, r) {
                return e & t | ~e & r
            }

            function n(e, t, r) {
                return (e | ~t) ^ r
            }

            function o(e, t, r) {
                return e & r | t & ~r
            }

            function s(e, t, r) {
                return e ^ (t | ~r)
            }

            function a(e, t) {
                return e << t | e >>> 32 - t
            }
            var c = e,
                h = c.lib,
                l = h.WordArray,
                f = h.Hasher,
                u = c.algo,
                d = l.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
                p = l.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
                v = l.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
                _ = l.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
                y = l.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
                g = l.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
                w = u.RIPEMD160 = f.extend({
                    _doReset: function() {
                        this._hash = l.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(e, t) {
                        for (var c = 0; c < 16; c++) {
                            var h = t + c,
                                l = e[h];
                            e[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                        }
                        var f, u, w, B, k, m, b, S, x, A, H = this._hash.words,
                            z = y.words,
                            C = g.words,
                            E = d.words,
                            R = p.words,
                            D = v.words,
                            M = _.words;
                        m = f = H[0], b = u = H[1], S = w = H[2], x = B = H[3], A = k = H[4];
                        for (var F, c = 0; c < 80; c += 1) F = f + e[t + E[c]] | 0, F += c < 16 ? r(u, w, B) + z[0] : c < 32 ? i(u, w, B) + z[1] : c < 48 ? n(u, w, B) + z[2] : c < 64 ? o(u, w, B) + z[3] : s(u, w, B) + z[4], F = 0 | F, F = a(F, D[c]), F = F + k | 0, f = k, k = B, B = a(w, 10), w = u, u = F, F = m + e[t + R[c]] | 0, F += c < 16 ? s(b, S, x) + C[0] : c < 32 ? o(b, S, x) + C[1] : c < 48 ? n(b, S, x) + C[2] : c < 64 ? i(b, S, x) + C[3] : r(b, S, x) + C[4], F = 0 | F, F = a(F, M[c]), F = F + A | 0, m = A, A = x, x = a(S, 10), S = b, b = F;
                        F = H[1] + w + x | 0, H[1] = H[2] + B + A | 0, H[2] = H[3] + k + m | 0, H[3] = H[4] + f + b | 0, H[4] = H[0] + u + S | 0, H[0] = F
                    },
                    _doFinalize: function() {
                        var e = this._data,
                            t = e.words,
                            r = 8 * this._nDataBytes,
                            i = 8 * e.sigBytes;
                        t[i >>> 5] |= 128 << 24 - i % 32, t[(i + 64 >>> 9 << 4) + 14] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8), e.sigBytes = 4 * (t.length + 1), this._process();
                        for (var n = this._hash, o = n.words, s = 0; s < 5; s++) {
                            var a = o[s];
                            o[s] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
                        }
                        return n
                    },
                    clone: function() {
                        var e = f.clone.call(this);
                        return e._hash = this._hash.clone(), e
                    }
                });
            c.RIPEMD160 = f._createHelper(w), c.HmacRIPEMD160 = f._createHmacHelper(w)
        }(Math),
        function() {
            var t = e,
                r = t.lib,
                i = r.Base,
                n = t.enc,
                o = n.Utf8,
                s = t.algo;
            s.HMAC = i.extend({
                init: function(e, t) {
                    e = this._hasher = new e.init, "string" == typeof t && (t = o.parse(t));
                    var r = e.blockSize,
                        i = 4 * r;
                    t.sigBytes > i && (t = e.finalize(t)), t.clamp();
                    for (var n = this._oKey = t.clone(), s = this._iKey = t.clone(), a = n.words, c = s.words, h = 0; h < r; h++) a[h] ^= 1549556828, c[h] ^= 909522486;
                    n.sigBytes = s.sigBytes = i, this.reset()
                },
                reset: function() {
                    var e = this._hasher;
                    e.reset(), e.update(this._iKey)
                },
                update: function(e) {
                    return this._hasher.update(e), this
                },
                finalize: function(e) {
                    var t = this._hasher,
                        r = t.finalize(e);
                    t.reset();
                    var i = t.finalize(this._oKey.clone().concat(r));
                    return i
                }
            })
        }(),
        function() {
            var t = e,
                r = t.lib,
                i = r.Base,
                n = r.WordArray,
                o = t.algo,
                s = o.SHA1,
                a = o.HMAC,
                c = o.PBKDF2 = i.extend({
                    cfg: i.extend({
                        keySize: 4,
                        hasher: s,
                        iterations: 1
                    }),
                    init: function(e) {
                        this.cfg = this.cfg.extend(e)
                    },
                    compute: function(e, t) {
                        for (var r = this.cfg, i = a.create(r.hasher, e), o = n.create(), s = n.create([1]), c = o.words, h = s.words, l = r.keySize, f = r.iterations; c.length < l;) {
                            var u = i.update(t).finalize(s);
                            i.reset();
                            for (var d = u.words, p = d.length, v = u, _ = 1; _ < f; _++) {
                                v = i.finalize(v), i.reset();
                                for (var y = v.words, g = 0; g < p; g++) d[g] ^= y[g]
                            }
                            o.concat(u), h[0]++
                        }
                        return o.sigBytes = 4 * l, o
                    }
                });
            t.PBKDF2 = function(e, t, r) {
                return c.create(r).compute(e, t)
            }
        }(),
        function() {
            var t = e,
                r = t.lib,
                i = r.Base,
                n = r.WordArray,
                o = t.algo,
                s = o.MD5,
                a = o.EvpKDF = i.extend({
                    cfg: i.extend({
                        keySize: 4,
                        hasher: s,
                        iterations: 1
                    }),
                    init: function(e) {
                        this.cfg = this.cfg.extend(e)
                    },
                    compute: function(e, t) {
                        for (var r = this.cfg, i = r.hasher.create(), o = n.create(), s = o.words, a = r.keySize, c = r.iterations; s.length < a;) {
                            h && i.update(h);
                            var h = i.update(e).finalize(t);
                            i.reset();
                            for (var l = 1; l < c; l++) h = i.finalize(h), i.reset();
                            o.concat(h)
                        }
                        return o.sigBytes = 4 * a, o
                    }
                });
            t.EvpKDF = function(e, t, r) {
                return a.create(r).compute(e, t)
            }
        }(),
        function() {
            var t = e,
                r = t.lib,
                i = r.WordArray,
                n = t.algo,
                o = n.SHA256,
                s = n.SHA224 = o.extend({
                    _doReset: function() {
                        this._hash = new i.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
                    },
                    _doFinalize: function() {
                        var e = o._doFinalize.call(this);
                        return e.sigBytes -= 4, e
                    }
                });
            t.SHA224 = o._createHelper(s), t.HmacSHA224 = o._createHmacHelper(s)
        }(),
        function(t) {
            var r = e,
                i = r.lib,
                n = i.Base,
                o = i.WordArray,
                s = r.x64 = {};
            s.Word = n.extend({
                init: function(e, t) {
                    this.high = e, this.low = t
                }
            }), s.WordArray = n.extend({
                init: function(e, r) {
                    e = this.words = e || [], r != t ? this.sigBytes = r : this.sigBytes = 8 * e.length
                },
                toX32: function() {
                    for (var e = this.words, t = e.length, r = [], i = 0; i < t; i++) {
                        var n = e[i];
                        r.push(n.high), r.push(n.low)
                    }
                    return o.create(r, this.sigBytes)
                },
                clone: function() {
                    for (var e = n.clone.call(this), t = e.words = this.words.slice(0), r = t.length, i = 0; i < r; i++) t[i] = t[i].clone();
                    return e
                }
            })
        }(),
        function(t) {
            var r = e,
                i = r.lib,
                n = i.WordArray,
                o = i.Hasher,
                s = r.x64,
                a = s.Word,
                c = r.algo,
                h = [],
                l = [],
                f = [];
            ! function() {
                for (var e = 1, t = 0, r = 0; r < 24; r++) {
                    h[e + 5 * t] = (r + 1) * (r + 2) / 2 % 64;
                    var i = t % 5,
                        n = (2 * e + 3 * t) % 5;
                    e = i, t = n
                }
                for (var e = 0; e < 5; e++)
                    for (var t = 0; t < 5; t++) l[e + 5 * t] = t + (2 * e + 3 * t) % 5 * 5;
                for (var o = 1, s = 0; s < 24; s++) {
                    for (var c = 0, u = 0, d = 0; d < 7; d++) {
                        if (1 & o) {
                            var p = (1 << d) - 1;
                            p < 32 ? u ^= 1 << p : c ^= 1 << p - 32
                        }
                        128 & o ? o = o << 1 ^ 113 : o <<= 1
                    }
                    f[s] = a.create(c, u)
                }
            }();
            var u = [];
            ! function() {
                for (var e = 0; e < 25; e++) u[e] = a.create()
            }();
            var d = c.SHA3 = o.extend({
                cfg: o.cfg.extend({
                    outputLength: 512
                }),
                _doReset: function() {
                    for (var e = this._state = [], t = 0; t < 25; t++) e[t] = new a.init;
                    this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                },
                _doProcessBlock: function(e, t) {
                    for (var r = this._state, i = this.blockSize / 2, n = 0; n < i; n++) {
                        var o = e[t + 2 * n],
                            s = e[t + 2 * n + 1];
                        o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8);
                        var a = r[n];
                        a.high ^= s, a.low ^= o
                    }
                    for (var c = 0; c < 24; c++) {
                        for (var d = 0; d < 5; d++) {
                            for (var p = 0, v = 0, _ = 0; _ < 5; _++) {
                                var a = r[d + 5 * _];
                                p ^= a.high, v ^= a.low
                            }
                            var y = u[d];
                            y.high = p, y.low = v
                        }
                        for (var d = 0; d < 5; d++)
                            for (var g = u[(d + 4) % 5], w = u[(d + 1) % 5], B = w.high, k = w.low, p = g.high ^ (B << 1 | k >>> 31), v = g.low ^ (k << 1 | B >>> 31), _ = 0; _ < 5; _++) {
                                var a = r[d + 5 * _];
                                a.high ^= p, a.low ^= v
                            }
                        for (var m = 1; m < 25; m++) {
                            var a = r[m],
                                b = a.high,
                                S = a.low,
                                x = h[m];
                            if (x < 32) var p = b << x | S >>> 32 - x,
                                v = S << x | b >>> 32 - x;
                            else var p = S << x - 32 | b >>> 64 - x,
                                v = b << x - 32 | S >>> 64 - x;
                            var A = u[l[m]];
                            A.high = p, A.low = v
                        }
                        var H = u[0],
                            z = r[0];
                        H.high = z.high, H.low = z.low;
                        for (var d = 0; d < 5; d++)
                            for (var _ = 0; _ < 5; _++) {
                                var m = d + 5 * _,
                                    a = r[m],
                                    C = u[m],
                                    E = u[(d + 1) % 5 + 5 * _],
                                    R = u[(d + 2) % 5 + 5 * _];
                                a.high = C.high ^ ~E.high & R.high, a.low = C.low ^ ~E.low & R.low
                            }
                        var a = r[0],
                            D = f[c];
                        a.high ^= D.high, a.low ^= D.low
                    }
                },
                _doFinalize: function() {
                    var e = this._data,
                        r = e.words,
                        i = (8 * this._nDataBytes, 8 * e.sigBytes),
                        o = 32 * this.blockSize;
                    r[i >>> 5] |= 1 << 24 - i % 32, r[(t.ceil((i + 1) / o) * o >>> 5) - 1] |= 128, e.sigBytes = 4 * r.length, this._process();
                    for (var s = this._state, a = this.cfg.outputLength / 8, c = a / 8, h = [], l = 0; l < c; l++) {
                        var f = s[l],
                            u = f.high,
                            d = f.low;
                        u = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8), d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), h.push(d), h.push(u)
                    }
                    return new n.init(h, a)
                },
                clone: function() {
                    for (var e = o.clone.call(this), t = e._state = this._state.slice(0), r = 0; r < 25; r++) t[r] = t[r].clone();
                    return e
                }
            });
            r.SHA3 = o._createHelper(d), r.HmacSHA3 = o._createHmacHelper(d)
        }(Math),
        function() {
            function t() {
                return s.create.apply(s, arguments)
            }
            var r = e,
                i = r.lib,
                n = i.Hasher,
                o = r.x64,
                s = o.Word,
                a = o.WordArray,
                c = r.algo,
                h = [t(1116352408, 3609767458), t(1899447441, 602891725), t(3049323471, 3964484399), t(3921009573, 2173295548), t(961987163, 4081628472), t(1508970993, 3053834265), t(2453635748, 2937671579), t(2870763221, 3664609560), t(3624381080, 2734883394), t(310598401, 1164996542), t(607225278, 1323610764), t(1426881987, 3590304994), t(1925078388, 4068182383), t(2162078206, 991336113), t(2614888103, 633803317), t(3248222580, 3479774868), t(3835390401, 2666613458), t(4022224774, 944711139), t(264347078, 2341262773), t(604807628, 2007800933), t(770255983, 1495990901), t(1249150122, 1856431235), t(1555081692, 3175218132), t(1996064986, 2198950837), t(2554220882, 3999719339), t(2821834349, 766784016), t(2952996808, 2566594879), t(3210313671, 3203337956), t(3336571891, 1034457026), t(3584528711, 2466948901), t(113926993, 3758326383), t(338241895, 168717936), t(666307205, 1188179964), t(773529912, 1546045734), t(1294757372, 1522805485), t(1396182291, 2643833823), t(1695183700, 2343527390), t(1986661051, 1014477480), t(2177026350, 1206759142), t(2456956037, 344077627), t(2730485921, 1290863460), t(2820302411, 3158454273), t(3259730800, 3505952657), t(3345764771, 106217008), t(3516065817, 3606008344), t(3600352804, 1432725776), t(4094571909, 1467031594), t(275423344, 851169720), t(430227734, 3100823752), t(506948616, 1363258195), t(659060556, 3750685593), t(883997877, 3785050280), t(958139571, 3318307427), t(1322822218, 3812723403), t(1537002063, 2003034995), t(1747873779, 3602036899), t(1955562222, 1575990012), t(2024104815, 1125592928), t(2227730452, 2716904306), t(2361852424, 442776044), t(2428436474, 593698344), t(2756734187, 3733110249), t(3204031479, 2999351573), t(3329325298, 3815920427), t(3391569614, 3928383900), t(3515267271, 566280711), t(3940187606, 3454069534), t(4118630271, 4000239992), t(116418474, 1914138554), t(174292421, 2731055270), t(289380356, 3203993006), t(460393269, 320620315), t(685471733, 587496836), t(852142971, 1086792851), t(1017036298, 365543100), t(1126000580, 2618297676), t(1288033470, 3409855158), t(1501505948, 4234509866), t(1607167915, 987167468), t(1816402316, 1246189591)],
                l = [];
            ! function() {
                for (var e = 0; e < 80; e++) l[e] = t()
            }();
            var f = c.SHA512 = n.extend({
                _doReset: function() {
                    this._hash = new a.init([new s.init(1779033703, 4089235720), new s.init(3144134277, 2227873595), new s.init(1013904242, 4271175723), new s.init(2773480762, 1595750129), new s.init(1359893119, 2917565137), new s.init(2600822924, 725511199), new s.init(528734635, 4215389547), new s.init(1541459225, 327033209)])
                },
                _doProcessBlock: function(e, t) {
                    for (var r = this._hash.words, i = r[0], n = r[1], o = r[2], s = r[3], a = r[4], c = r[5], f = r[6], u = r[7], d = i.high, p = i.low, v = n.high, _ = n.low, y = o.high, g = o.low, w = s.high, B = s.low, k = a.high, m = a.low, b = c.high, S = c.low, x = f.high, A = f.low, H = u.high, z = u.low, C = d, E = p, R = v, D = _, M = y, F = g, P = w, O = B, U = k, L = m, W = b, I = S, T = x, j = A, X = H, K = z, N = 0; N < 80; N++) {
                        var q = l[N];
                        if (N < 16) var V = q.high = 0 | e[t + 2 * N],
                            J = q.low = 0 | e[t + 2 * N + 1];
                        else {
                            var Z = l[N - 15],
                                G = Z.high,
                                Y = Z.low,
                                $ = (G >>> 1 | Y << 31) ^ (G >>> 8 | Y << 24) ^ G >>> 7,
                                Q = (Y >>> 1 | G << 31) ^ (Y >>> 8 | G << 24) ^ (Y >>> 7 | G << 25),
                                ee = l[N - 2],
                                te = ee.high,
                                re = ee.low,
                                ie = (te >>> 19 | re << 13) ^ (te << 3 | re >>> 29) ^ te >>> 6,
                                ne = (re >>> 19 | te << 13) ^ (re << 3 | te >>> 29) ^ (re >>> 6 | te << 26),
                                oe = l[N - 7],
                                se = oe.high,
                                ae = oe.low,
                                ce = l[N - 16],
                                he = ce.high,
                                le = ce.low,
                                J = Q + ae,
                                V = $ + se + (J >>> 0 < Q >>> 0 ? 1 : 0),
                                J = J + ne,
                                V = V + ie + (J >>> 0 < ne >>> 0 ? 1 : 0),
                                J = J + le,
                                V = V + he + (J >>> 0 < le >>> 0 ? 1 : 0);
                            q.high = V, q.low = J
                        }
                        var fe = U & W ^ ~U & T,
                            ue = L & I ^ ~L & j,
                            de = C & R ^ C & M ^ R & M,
                            pe = E & D ^ E & F ^ D & F,
                            ve = (C >>> 28 | E << 4) ^ (C << 30 | E >>> 2) ^ (C << 25 | E >>> 7),
                            _e = (E >>> 28 | C << 4) ^ (E << 30 | C >>> 2) ^ (E << 25 | C >>> 7),
                            ye = (U >>> 14 | L << 18) ^ (U >>> 18 | L << 14) ^ (U << 23 | L >>> 9),
                            ge = (L >>> 14 | U << 18) ^ (L >>> 18 | U << 14) ^ (L << 23 | U >>> 9),
                            we = h[N],
                            Be = we.high,
                            ke = we.low,
                            me = K + ge,
                            be = X + ye + (me >>> 0 < K >>> 0 ? 1 : 0),
                            me = me + ue,
                            be = be + fe + (me >>> 0 < ue >>> 0 ? 1 : 0),
                            me = me + ke,
                            be = be + Be + (me >>> 0 < ke >>> 0 ? 1 : 0),
                            me = me + J,
                            be = be + V + (me >>> 0 < J >>> 0 ? 1 : 0),
                            Se = _e + pe,
                            xe = ve + de + (Se >>> 0 < _e >>> 0 ? 1 : 0);
                        X = T, K = j, T = W, j = I, W = U, I = L, L = O + me | 0, U = P + be + (L >>> 0 < O >>> 0 ? 1 : 0) | 0, P = M, O = F, M = R, F = D, R = C, D = E, E = me + Se | 0, C = be + xe + (E >>> 0 < me >>> 0 ? 1 : 0) | 0
                    }
                    p = i.low = p + E, i.high = d + C + (p >>> 0 < E >>> 0 ? 1 : 0), _ = n.low = _ + D, n.high = v + R + (_ >>> 0 < D >>> 0 ? 1 : 0), g = o.low = g + F, o.high = y + M + (g >>> 0 < F >>> 0 ? 1 : 0), B = s.low = B + O, s.high = w + P + (B >>> 0 < O >>> 0 ? 1 : 0), m = a.low = m + L, a.high = k + U + (m >>> 0 < L >>> 0 ? 1 : 0), S = c.low = S + I, c.high = b + W + (S >>> 0 < I >>> 0 ? 1 : 0), A = f.low = A + j, f.high = x + T + (A >>> 0 < j >>> 0 ? 1 : 0), z = u.low = z + K, u.high = H + X + (z >>> 0 < K >>> 0 ? 1 : 0)
                },
                _doFinalize: function() {
                    var e = this._data,
                        t = e.words,
                        r = 8 * this._nDataBytes,
                        i = 8 * e.sigBytes;
                    t[i >>> 5] |= 128 << 24 - i % 32, t[(i + 128 >>> 10 << 5) + 30] = Math.floor(r / 4294967296), t[(i + 128 >>> 10 << 5) + 31] = r, e.sigBytes = 4 * t.length, this._process();
                    var n = this._hash.toX32();
                    return n
                },
                clone: function() {
                    var e = n.clone.call(this);
                    return e._hash = this._hash.clone(), e
                },
                blockSize: 32
            });
            r.SHA512 = n._createHelper(f), r.HmacSHA512 = n._createHmacHelper(f)
        }(),
        function() {
            var t = e,
                r = t.x64,
                i = r.Word,
                n = r.WordArray,
                o = t.algo,
                s = o.SHA512,
                a = o.SHA384 = s.extend({
                    _doReset: function() {
                        this._hash = new n.init([new i.init(3418070365, 3238371032), new i.init(1654270250, 914150663), new i.init(2438529370, 812702999), new i.init(355462360, 4144912697), new i.init(1731405415, 4290775857), new i.init(2394180231, 1750603025), new i.init(3675008525, 1694076839), new i.init(1203062813, 3204075428)])
                    },
                    _doFinalize: function() {
                        var e = s._doFinalize.call(this);
                        return e.sigBytes -= 16, e
                    }
                });
            t.SHA384 = s._createHelper(a), t.HmacSHA384 = s._createHmacHelper(a)
        }(), e.lib.Cipher || function(t) {
            var r = e,
                i = r.lib,
                n = i.Base,
                o = i.WordArray,
                s = i.BufferedBlockAlgorithm,
                a = r.enc,
                c = (a.Utf8, a.Base64),
                h = r.algo,
                l = h.EvpKDF,
                f = i.Cipher = s.extend({
                    cfg: n.extend(),
                    createEncryptor: function(e, t) {
                        return this.create(this._ENC_XFORM_MODE, e, t)
                    },
                    createDecryptor: function(e, t) {
                        return this.create(this._DEC_XFORM_MODE, e, t)
                    },
                    init: function(e, t, r) {
                        this.cfg = this.cfg.extend(r), this._xformMode = e, this._key = t, this.reset()
                    },
                    reset: function() {
                        s.reset.call(this), this._doReset()
                    },
                    process: function(e) {
                        return this._append(e), this._process()
                    },
                    finalize: function(e) {
                        e && this._append(e);
                        var t = this._doFinalize();
                        return t
                    },
                    keySize: 4,
                    ivSize: 4,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function() {
                        function e(e) {
                            return "string" == typeof e ? b : B
                        }
                        return function(t) {
                            return {
                                encrypt: function(r, i, n) {
                                    return e(i).encrypt(t, r, i, n)
                                },
                                decrypt: function(r, i, n) {
                                    return e(i).decrypt(t, r, i, n)
                                }
                            }
                        }
                    }()
                }),
                u = (i.StreamCipher = f.extend({
                    _doFinalize: function() {
                        var e = this._process(!0);
                        return e
                    },
                    blockSize: 1
                }), r.mode = {}),
                d = i.BlockCipherMode = n.extend({
                    createEncryptor: function(e, t) {
                        return this.Encryptor.create(e, t)
                    },
                    createDecryptor: function(e, t) {
                        return this.Decryptor.create(e, t)
                    },
                    init: function(e, t) {
                        this._cipher = e, this._iv = t
                    }
                }),
                p = u.CBC = function() {
                    function e(e, r, i) {
                        var n = this._iv;
                        if (n) {
                            var o = n;
                            this._iv = t
                        } else var o = this._prevBlock;
                        for (var s = 0; s < i; s++) e[r + s] ^= o[s]
                    }
                    var r = d.extend();
                    return r.Encryptor = r.extend({
                        processBlock: function(t, r) {
                            var i = this._cipher,
                                n = i.blockSize;
                            e.call(this, t, r, n), i.encryptBlock(t, r), this._prevBlock = t.slice(r, r + n)
                        }
                    }), r.Decryptor = r.extend({
                        processBlock: function(t, r) {
                            var i = this._cipher,
                                n = i.blockSize,
                                o = t.slice(r, r + n);
                            i.decryptBlock(t, r), e.call(this, t, r, n), this._prevBlock = o
                        }
                    }), r
                }(),
                v = r.pad = {},
                _ = v.Pkcs7 = {
                    pad: function(e, t) {
                        for (var r = 4 * t, i = r - e.sigBytes % r, n = i << 24 | i << 16 | i << 8 | i, s = [], a = 0; a < i; a += 4) s.push(n);
                        var c = o.create(s, i);
                        e.concat(c)
                    },
                    unpad: function(e) {
                        var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                        e.sigBytes -= t
                    }
                },
                y = (i.BlockCipher = f.extend({
                    cfg: f.cfg.extend({
                        mode: p,
                        padding: _
                    }),
                    reset: function() {
                        f.reset.call(this);
                        var e = this.cfg,
                            t = e.iv,
                            r = e.mode;
                        if (this._xformMode == this._ENC_XFORM_MODE) var i = r.createEncryptor;
                        else {
                            var i = r.createDecryptor;
                            this._minBufferSize = 1
                        }
                        this._mode && this._mode.__creator == i ? this._mode.init(this, t && t.words) : (this._mode = i.call(r, this, t && t.words), this._mode.__creator = i)
                    },
                    _doProcessBlock: function(e, t) {
                        this._mode.processBlock(e, t)
                    },
                    _doFinalize: function() {
                        var e = this.cfg.padding;
                        if (this._xformMode == this._ENC_XFORM_MODE) {
                            e.pad(this._data, this.blockSize);
                            var t = this._process(!0)
                        } else {
                            var t = this._process(!0);
                            e.unpad(t)
                        }
                        return t
                    },
                    blockSize: 4
                }), i.CipherParams = n.extend({
                    init: function(e) {
                        this.mixIn(e)
                    },
                    toString: function(e) {
                        return (e || this.formatter).stringify(this)
                    }
                })),
                g = r.format = {},
                w = g.OpenSSL = {
                    stringify: function(e) {
                        var t = e.ciphertext,
                            r = e.salt;
                        if (r) var i = o.create([1398893684, 1701076831]).concat(r).concat(t);
                        else var i = t;
                        return i.toString(c)
                    },
                    parse: function(e) {
                        var t = c.parse(e),
                            r = t.words;
                        if (1398893684 == r[0] && 1701076831 == r[1]) {
                            var i = o.create(r.slice(2, 4));
                            r.splice(0, 4), t.sigBytes -= 16
                        }
                        return y.create({
                            ciphertext: t,
                            salt: i
                        })
                    }
                },
                B = i.SerializableCipher = n.extend({
                    cfg: n.extend({
                        format: w
                    }),
                    encrypt: function(e, t, r, i) {
                        i = this.cfg.extend(i);
                        var n = e.createEncryptor(r, i),
                            o = n.finalize(t),
                            s = n.cfg;
                        return y.create({
                            ciphertext: o,
                            key: r,
                            iv: s.iv,
                            algorithm: e,
                            mode: s.mode,
                            padding: s.padding,
                            blockSize: e.blockSize,
                            formatter: i.format
                        })
                    },
                    decrypt: function(e, t, r, i) {
                        i = this.cfg.extend(i), t = this._parse(t, i.format);
                        var n = e.createDecryptor(r, i).finalize(t.ciphertext);
                        return n
                    },
                    _parse: function(e, t) {
                        return "string" == typeof e ? t.parse(e, this) : e
                    }
                }),
                k = r.kdf = {},
                m = k.OpenSSL = {
                    execute: function(e, t, r, i) {
                        i || (i = o.random(8));
                        var n = l.create({
                                keySize: t + r
                            }).compute(e, i),
                            s = o.create(n.words.slice(t), 4 * r);
                        return n.sigBytes = 4 * t, y.create({
                            key: n,
                            iv: s,
                            salt: i
                        })
                    }
                },
                b = i.PasswordBasedCipher = B.extend({
                    cfg: B.cfg.extend({
                        kdf: m
                    }),
                    encrypt: function(e, t, r, i) {
                        i = this.cfg.extend(i);
                        var n = i.kdf.execute(r, e.keySize, e.ivSize);
                        i.iv = n.iv;
                        var o = B.encrypt.call(this, e, t, n.key, i);
                        return o.mixIn(n), o
                    },
                    decrypt: function(e, t, r, i) {
                        i = this.cfg.extend(i), t = this._parse(t, i.format);
                        var n = i.kdf.execute(r, e.keySize, e.ivSize, t.salt);
                        i.iv = n.iv;
                        var o = B.decrypt.call(this, e, t, n.key, i);
                        return o
                    }
                })
        }(), e.mode.CFB = function() {
            function t(e, t, r, i) {
                var n = this._iv;
                if (n) {
                    var o = n.slice(0);
                    this._iv = void 0
                } else var o = this._prevBlock;
                i.encryptBlock(o, 0);
                for (var s = 0; s < r; s++) e[t + s] ^= o[s]
            }
            var r = e.lib.BlockCipherMode.extend();
            return r.Encryptor = r.extend({
                processBlock: function(e, r) {
                    var i = this._cipher,
                        n = i.blockSize;
                    t.call(this, e, r, n, i), this._prevBlock = e.slice(r, r + n)
                }
            }), r.Decryptor = r.extend({
                processBlock: function(e, r) {
                    var i = this._cipher,
                        n = i.blockSize,
                        o = e.slice(r, r + n);
                    t.call(this, e, r, n, i), this._prevBlock = o
                }
            }), r
        }(), e.mode.ECB = function() {
            var t = e.lib.BlockCipherMode.extend();
            return t.Encryptor = t.extend({
                processBlock: function(e, t) {
                    this._cipher.encryptBlock(e, t)
                }
            }), t.Decryptor = t.extend({
                processBlock: function(e, t) {
                    this._cipher.decryptBlock(e, t)
                }
            }), t
        }(), e.pad.AnsiX923 = {
            pad: function(e, t) {
                var r = e.sigBytes,
                    i = 4 * t,
                    n = i - r % i,
                    o = r + n - 1;
                e.clamp(), e.words[o >>> 2] |= n << 24 - o % 4 * 8, e.sigBytes += n
            },
            unpad: function(e) {
                var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                e.sigBytes -= t
            }
        }, e.pad.Iso10126 = {
            pad: function(t, r) {
                var i = 4 * r,
                    n = i - t.sigBytes % i;
                t.concat(e.lib.WordArray.random(n - 1)).concat(e.lib.WordArray.create([n << 24], 1))
            },
            unpad: function(e) {
                var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                e.sigBytes -= t
            }
        }, e.pad.Iso97971 = {
            pad: function(t, r) {
                t.concat(e.lib.WordArray.create([2147483648], 1)), e.pad.ZeroPadding.pad(t, r)
            },
            unpad: function(t) {
                e.pad.ZeroPadding.unpad(t), t.sigBytes--
            }
        }, e.mode.OFB = function() {
            var t = e.lib.BlockCipherMode.extend(),
                r = t.Encryptor = t.extend({
                    processBlock: function(e, t) {
                        var r = this._cipher,
                            i = r.blockSize,
                            n = this._iv,
                            o = this._keystream;
                        n && (o = this._keystream = n.slice(0), this._iv = void 0), r.encryptBlock(o, 0);
                        for (var s = 0; s < i; s++) e[t + s] ^= o[s]
                    }
                });
            return t.Decryptor = r, t
        }(), e.pad.NoPadding = {
            pad: function() {},
            unpad: function() {}
        },
        function(t) {
            var r = e,
                i = r.lib,
                n = i.CipherParams,
                o = r.enc,
                s = o.Hex,
                a = r.format;
            a.Hex = {
                stringify: function(e) {
                    return e.ciphertext.toString(s)
                },
                parse: function(e) {
                    var t = s.parse(e);
                    return n.create({
                        ciphertext: t
                    })
                }
            }
        }(),
        function() {
            var t = e,
                r = t.lib,
                i = r.BlockCipher,
                n = t.algo,
                o = [],
                s = [],
                a = [],
                c = [],
                h = [],
                l = [],
                f = [],
                u = [],
                d = [],
                p = [];
            ! function() {
                for (var e = [], t = 0; t < 256; t++) t < 128 ? e[t] = t << 1 : e[t] = t << 1 ^ 283;
                for (var r = 0, i = 0, t = 0; t < 256; t++) {
                    var n = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4;
                    n = n >>> 8 ^ 255 & n ^ 99, o[r] = n, s[n] = r;
                    var v = e[r],
                        _ = e[v],
                        y = e[_],
                        g = 257 * e[n] ^ 16843008 * n;
                    a[r] = g << 24 | g >>> 8, c[r] = g << 16 | g >>> 16, h[r] = g << 8 | g >>> 24, l[r] = g;
                    var g = 16843009 * y ^ 65537 * _ ^ 257 * v ^ 16843008 * r;
                    f[n] = g << 24 | g >>> 8, u[n] = g << 16 | g >>> 16, d[n] = g << 8 | g >>> 24, p[n] = g, r ? (r = v ^ e[e[e[y ^ v]]], i ^= e[e[i]]) : r = i = 1
                }
            }();
            var v = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                _ = n.AES = i.extend({
                    _doReset: function() {
                        if (!this._nRounds || this._keyPriorReset !== this._key) {
                            for (var e = this._keyPriorReset = this._key, t = e.words, r = e.sigBytes / 4, i = this._nRounds = r + 6, n = 4 * (i + 1), s = this._keySchedule = [], a = 0; a < n; a++)
                                if (a < r) s[a] = t[a];
                                else {
                                    var c = s[a - 1];
                                    a % r ? r > 6 && a % r == 4 && (c = o[c >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & c]) : (c = c << 8 | c >>> 24, c = o[c >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & c], c ^= v[a / r | 0] << 24), s[a] = s[a - r] ^ c
                                } for (var h = this._invKeySchedule = [], l = 0; l < n; l++) {
                                var a = n - l;
                                if (l % 4) var c = s[a];
                                else var c = s[a - 4];
                                l < 4 || a <= 4 ? h[l] = c : h[l] = f[o[c >>> 24]] ^ u[o[c >>> 16 & 255]] ^ d[o[c >>> 8 & 255]] ^ p[o[255 & c]]
                            }
                        }
                    },
                    encryptBlock: function(e, t) {
                        this._doCryptBlock(e, t, this._keySchedule, a, c, h, l, o)
                    },
                    decryptBlock: function(e, t) {
                        var r = e[t + 1];
                        e[t + 1] = e[t + 3], e[t + 3] = r, this._doCryptBlock(e, t, this._invKeySchedule, f, u, d, p, s);
                        var r = e[t + 1];
                        e[t + 1] = e[t + 3], e[t + 3] = r
                    },
                    _doCryptBlock: function(e, t, r, i, n, o, s, a) {
                        for (var c = this._nRounds, h = e[t] ^ r[0], l = e[t + 1] ^ r[1], f = e[t + 2] ^ r[2], u = e[t + 3] ^ r[3], d = 4, p = 1; p < c; p++) {
                            var v = i[h >>> 24] ^ n[l >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & u] ^ r[d++],
                                _ = i[l >>> 24] ^ n[f >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & h] ^ r[d++],
                                y = i[f >>> 24] ^ n[u >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & l] ^ r[d++],
                                g = i[u >>> 24] ^ n[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & f] ^ r[d++];
                            h = v, l = _, f = y, u = g
                        }
                        var v = (a[h >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & u]) ^ r[d++],
                            _ = (a[l >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & h]) ^ r[d++],
                            y = (a[f >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & l]) ^ r[d++],
                            g = (a[u >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & f]) ^ r[d++];
                        e[t] = v, e[t + 1] = _, e[t + 2] = y, e[t + 3] = g
                    },
                    keySize: 8
                });
            t.AES = i._createHelper(_)
        }(),
        function() {
            function t(e, t) {
                var r = (this._lBlock >>> e ^ this._rBlock) & t;
                this._rBlock ^= r, this._lBlock ^= r << e
            }

            function r(e, t) {
                var r = (this._rBlock >>> e ^ this._lBlock) & t;
                this._lBlock ^= r, this._rBlock ^= r << e
            }
            var i = e,
                n = i.lib,
                o = n.WordArray,
                s = n.BlockCipher,
                a = i.algo,
                c = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
                h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
                l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
                f = [{
                    0: 8421888,
                    268435456: 32768,
                    536870912: 8421378,
                    805306368: 2,
                    1073741824: 512,
                    1342177280: 8421890,
                    1610612736: 8389122,
                    1879048192: 8388608,
                    2147483648: 514,
                    2415919104: 8389120,
                    2684354560: 33280,
                    2952790016: 8421376,
                    3221225472: 32770,
                    3489660928: 8388610,
                    3758096384: 0,
                    4026531840: 33282,
                    134217728: 0,
                    402653184: 8421890,
                    671088640: 33282,
                    939524096: 32768,
                    1207959552: 8421888,
                    1476395008: 512,
                    1744830464: 8421378,
                    2013265920: 2,
                    2281701376: 8389120,
                    2550136832: 33280,
                    2818572288: 8421376,
                    3087007744: 8389122,
                    3355443200: 8388610,
                    3623878656: 32770,
                    3892314112: 514,
                    4160749568: 8388608,
                    1: 32768,
                    268435457: 2,
                    536870913: 8421888,
                    805306369: 8388608,
                    1073741825: 8421378,
                    1342177281: 33280,
                    1610612737: 512,
                    1879048193: 8389122,
                    2147483649: 8421890,
                    2415919105: 8421376,
                    2684354561: 8388610,
                    2952790017: 33282,
                    3221225473: 514,
                    3489660929: 8389120,
                    3758096385: 32770,
                    4026531841: 0,
                    134217729: 8421890,
                    402653185: 8421376,
                    671088641: 8388608,
                    939524097: 512,
                    1207959553: 32768,
                    1476395009: 8388610,
                    1744830465: 2,
                    2013265921: 33282,
                    2281701377: 32770,
                    2550136833: 8389122,
                    2818572289: 514,
                    3087007745: 8421888,
                    3355443201: 8389120,
                    3623878657: 0,
                    3892314113: 33280,
                    4160749569: 8421378
                }, {
                    0: 1074282512,
                    16777216: 16384,
                    33554432: 524288,
                    50331648: 1074266128,
                    67108864: 1073741840,
                    83886080: 1074282496,
                    100663296: 1073758208,
                    117440512: 16,
                    134217728: 540672,
                    150994944: 1073758224,
                    167772160: 1073741824,
                    184549376: 540688,
                    201326592: 524304,
                    218103808: 0,
                    234881024: 16400,
                    251658240: 1074266112,
                    8388608: 1073758208,
                    25165824: 540688,
                    41943040: 16,
                    58720256: 1073758224,
                    75497472: 1074282512,
                    92274688: 1073741824,
                    109051904: 524288,
                    125829120: 1074266128,
                    142606336: 524304,
                    159383552: 0,
                    176160768: 16384,
                    192937984: 1074266112,
                    209715200: 1073741840,
                    226492416: 540672,
                    243269632: 1074282496,
                    260046848: 16400,
                    268435456: 0,
                    285212672: 1074266128,
                    301989888: 1073758224,
                    318767104: 1074282496,
                    335544320: 1074266112,
                    352321536: 16,
                    369098752: 540688,
                    385875968: 16384,
                    402653184: 16400,
                    419430400: 524288,
                    436207616: 524304,
                    452984832: 1073741840,
                    469762048: 540672,
                    486539264: 1073758208,
                    503316480: 1073741824,
                    520093696: 1074282512,
                    276824064: 540688,
                    293601280: 524288,
                    310378496: 1074266112,
                    327155712: 16384,
                    343932928: 1073758208,
                    360710144: 1074282512,
                    377487360: 16,
                    394264576: 1073741824,
                    411041792: 1074282496,
                    427819008: 1073741840,
                    444596224: 1073758224,
                    461373440: 524304,
                    478150656: 0,
                    494927872: 16400,
                    511705088: 1074266128,
                    528482304: 540672
                }, {
                    0: 260,
                    1048576: 0,
                    2097152: 67109120,
                    3145728: 65796,
                    4194304: 65540,
                    5242880: 67108868,
                    6291456: 67174660,
                    7340032: 67174400,
                    8388608: 67108864,
                    9437184: 67174656,
                    10485760: 65792,
                    11534336: 67174404,
                    12582912: 67109124,
                    13631488: 65536,
                    14680064: 4,
                    15728640: 256,
                    524288: 67174656,
                    1572864: 67174404,
                    2621440: 0,
                    3670016: 67109120,
                    4718592: 67108868,
                    5767168: 65536,
                    6815744: 65540,
                    7864320: 260,
                    8912896: 4,
                    9961472: 256,
                    11010048: 67174400,
                    12058624: 65796,
                    13107200: 65792,
                    14155776: 67109124,
                    15204352: 67174660,
                    16252928: 67108864,
                    16777216: 67174656,
                    17825792: 65540,
                    18874368: 65536,
                    19922944: 67109120,
                    20971520: 256,
                    22020096: 67174660,
                    23068672: 67108868,
                    24117248: 0,
                    25165824: 67109124,
                    26214400: 67108864,
                    27262976: 4,
                    28311552: 65792,
                    29360128: 67174400,
                    30408704: 260,
                    31457280: 65796,
                    32505856: 67174404,
                    17301504: 67108864,
                    18350080: 260,
                    19398656: 67174656,
                    20447232: 0,
                    21495808: 65540,
                    22544384: 67109120,
                    23592960: 256,
                    24641536: 67174404,
                    25690112: 65536,
                    26738688: 67174660,
                    27787264: 65796,
                    28835840: 67108868,
                    29884416: 67109124,
                    30932992: 67174400,
                    31981568: 4,
                    33030144: 65792
                }, {
                    0: 2151682048,
                    65536: 2147487808,
                    131072: 4198464,
                    196608: 2151677952,
                    262144: 0,
                    327680: 4198400,
                    393216: 2147483712,
                    458752: 4194368,
                    524288: 2147483648,
                    589824: 4194304,
                    655360: 64,
                    720896: 2147487744,
                    786432: 2151678016,
                    851968: 4160,
                    917504: 4096,
                    983040: 2151682112,
                    32768: 2147487808,
                    98304: 64,
                    163840: 2151678016,
                    229376: 2147487744,
                    294912: 4198400,
                    360448: 2151682112,
                    425984: 0,
                    491520: 2151677952,
                    557056: 4096,
                    622592: 2151682048,
                    688128: 4194304,
                    753664: 4160,
                    819200: 2147483648,
                    884736: 4194368,
                    950272: 4198464,
                    1015808: 2147483712,
                    1048576: 4194368,
                    1114112: 4198400,
                    1179648: 2147483712,
                    1245184: 0,
                    1310720: 4160,
                    1376256: 2151678016,
                    1441792: 2151682048,
                    1507328: 2147487808,
                    1572864: 2151682112,
                    1638400: 2147483648,
                    1703936: 2151677952,
                    1769472: 4198464,
                    1835008: 2147487744,
                    1900544: 4194304,
                    1966080: 64,
                    2031616: 4096,
                    1081344: 2151677952,
                    1146880: 2151682112,
                    1212416: 0,
                    1277952: 4198400,
                    1343488: 4194368,
                    1409024: 2147483648,
                    1474560: 2147487808,
                    1540096: 64,
                    1605632: 2147483712,
                    1671168: 4096,
                    1736704: 2147487744,
                    1802240: 2151678016,
                    1867776: 4160,
                    1933312: 2151682048,
                    1998848: 4194304,
                    2064384: 4198464
                }, {
                    0: 128,
                    4096: 17039360,
                    8192: 262144,
                    12288: 536870912,
                    16384: 537133184,
                    20480: 16777344,
                    24576: 553648256,
                    28672: 262272,
                    32768: 16777216,
                    36864: 537133056,
                    40960: 536871040,
                    45056: 553910400,
                    49152: 553910272,
                    53248: 0,
                    57344: 17039488,
                    61440: 553648128,
                    2048: 17039488,
                    6144: 553648256,
                    10240: 128,
                    14336: 17039360,
                    18432: 262144,
                    22528: 537133184,
                    26624: 553910272,
                    30720: 536870912,
                    34816: 537133056,
                    38912: 0,
                    43008: 553910400,
                    47104: 16777344,
                    51200: 536871040,
                    55296: 553648128,
                    59392: 16777216,
                    63488: 262272,
                    65536: 262144,
                    69632: 128,
                    73728: 536870912,
                    77824: 553648256,
                    81920: 16777344,
                    86016: 553910272,
                    90112: 537133184,
                    94208: 16777216,
                    98304: 553910400,
                    102400: 553648128,
                    106496: 17039360,
                    110592: 537133056,
                    114688: 262272,
                    118784: 536871040,
                    122880: 0,
                    126976: 17039488,
                    67584: 553648256,
                    71680: 16777216,
                    75776: 17039360,
                    79872: 537133184,
                    83968: 536870912,
                    88064: 17039488,
                    92160: 128,
                    96256: 553910272,
                    100352: 262272,
                    104448: 553910400,
                    108544: 0,
                    112640: 553648128,
                    116736: 16777344,
                    120832: 262144,
                    124928: 537133056,
                    129024: 536871040
                }, {
                    0: 268435464,
                    256: 8192,
                    512: 270532608,
                    768: 270540808,
                    1024: 268443648,
                    1280: 2097152,
                    1536: 2097160,
                    1792: 268435456,
                    2048: 0,
                    2304: 268443656,
                    2560: 2105344,
                    2816: 8,
                    3072: 270532616,
                    3328: 2105352,
                    3584: 8200,
                    3840: 270540800,
                    128: 270532608,
                    384: 270540808,
                    640: 8,
                    896: 2097152,
                    1152: 2105352,
                    1408: 268435464,
                    1664: 268443648,
                    1920: 8200,
                    2176: 2097160,
                    2432: 8192,
                    2688: 268443656,
                    2944: 270532616,
                    3200: 0,
                    3456: 270540800,
                    3712: 2105344,
                    3968: 268435456,
                    4096: 268443648,
                    4352: 270532616,
                    4608: 270540808,
                    4864: 8200,
                    5120: 2097152,
                    5376: 268435456,
                    5632: 268435464,
                    5888: 2105344,
                    6144: 2105352,
                    6400: 0,
                    6656: 8,
                    6912: 270532608,
                    7168: 8192,
                    7424: 268443656,
                    7680: 270540800,
                    7936: 2097160,
                    4224: 8,
                    4480: 2105344,
                    4736: 2097152,
                    4992: 268435464,
                    5248: 268443648,
                    5504: 8200,
                    5760: 270540808,
                    6016: 270532608,
                    6272: 270540800,
                    6528: 270532616,
                    6784: 8192,
                    7040: 2105352,
                    7296: 2097160,
                    7552: 0,
                    7808: 268435456,
                    8064: 268443656
                }, {
                    0: 1048576,
                    16: 33555457,
                    32: 1024,
                    48: 1049601,
                    64: 34604033,
                    80: 0,
                    96: 1,
                    112: 34603009,
                    128: 33555456,
                    144: 1048577,
                    160: 33554433,
                    176: 34604032,
                    192: 34603008,
                    208: 1025,
                    224: 1049600,
                    240: 33554432,
                    8: 34603009,
                    24: 0,
                    40: 33555457,
                    56: 34604032,
                    72: 1048576,
                    88: 33554433,
                    104: 33554432,
                    120: 1025,
                    136: 1049601,
                    152: 33555456,
                    168: 34603008,
                    184: 1048577,
                    200: 1024,
                    216: 34604033,
                    232: 1,
                    248: 1049600,
                    256: 33554432,
                    272: 1048576,
                    288: 33555457,
                    304: 34603009,
                    320: 1048577,
                    336: 33555456,
                    352: 34604032,
                    368: 1049601,
                    384: 1025,
                    400: 34604033,
                    416: 1049600,
                    432: 1,
                    448: 0,
                    464: 34603008,
                    480: 33554433,
                    496: 1024,
                    264: 1049600,
                    280: 33555457,
                    296: 34603009,
                    312: 1,
                    328: 33554432,
                    344: 1048576,
                    360: 1025,
                    376: 34604032,
                    392: 33554433,
                    408: 34603008,
                    424: 0,
                    440: 34604033,
                    456: 1049601,
                    472: 1024,
                    488: 33555456,
                    504: 1048577
                }, {
                    0: 134219808,
                    1: 131072,
                    2: 134217728,
                    3: 32,
                    4: 131104,
                    5: 134350880,
                    6: 134350848,
                    7: 2048,
                    8: 134348800,
                    9: 134219776,
                    10: 133120,
                    11: 134348832,
                    12: 2080,
                    13: 0,
                    14: 134217760,
                    15: 133152,
                    2147483648: 2048,
                    2147483649: 134350880,
                    2147483650: 134219808,
                    2147483651: 134217728,
                    2147483652: 134348800,
                    2147483653: 133120,
                    2147483654: 133152,
                    2147483655: 32,
                    2147483656: 134217760,
                    2147483657: 2080,
                    2147483658: 131104,
                    2147483659: 134350848,
                    2147483660: 0,
                    2147483661: 134348832,
                    2147483662: 134219776,
                    2147483663: 131072,
                    16: 133152,
                    17: 134350848,
                    18: 32,
                    19: 2048,
                    20: 134219776,
                    21: 134217760,
                    22: 134348832,
                    23: 131072,
                    24: 0,
                    25: 131104,
                    26: 134348800,
                    27: 134219808,
                    28: 134350880,
                    29: 133120,
                    30: 2080,
                    31: 134217728,
                    2147483664: 131072,
                    2147483665: 2048,
                    2147483666: 134348832,
                    2147483667: 133152,
                    2147483668: 32,
                    2147483669: 134348800,
                    2147483670: 134217728,
                    2147483671: 134219808,
                    2147483672: 134350880,
                    2147483673: 134217760,
                    2147483674: 134219776,
                    2147483675: 0,
                    2147483676: 133120,
                    2147483677: 2080,
                    2147483678: 131104,
                    2147483679: 134350848
                }],
                u = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
                d = a.DES = s.extend({
                    _doReset: function() {
                        for (var e = this._key, t = e.words, r = [], i = 0; i < 56; i++) {
                            var n = c[i] - 1;
                            r[i] = t[n >>> 5] >>> 31 - n % 32 & 1
                        }
                        for (var o = this._subKeys = [], s = 0; s < 16; s++) {
                            for (var a = o[s] = [], f = l[s], i = 0; i < 24; i++) a[i / 6 | 0] |= r[(h[i] - 1 + f) % 28] << 31 - i % 6, a[4 + (i / 6 | 0)] |= r[28 + (h[i + 24] - 1 + f) % 28] << 31 - i % 6;
                            a[0] = a[0] << 1 | a[0] >>> 31;
                            for (var i = 1; i < 7; i++) a[i] = a[i] >>> 4 * (i - 1) + 3;
                            a[7] = a[7] << 5 | a[7] >>> 27
                        }
                        for (var u = this._invSubKeys = [], i = 0; i < 16; i++) u[i] = o[15 - i]
                    },
                    encryptBlock: function(e, t) {
                        this._doCryptBlock(e, t, this._subKeys)
                    },
                    decryptBlock: function(e, t) {
                        this._doCryptBlock(e, t, this._invSubKeys)
                    },
                    _doCryptBlock: function(e, i, n) {
                        this._lBlock = e[i], this._rBlock = e[i + 1], t.call(this, 4, 252645135), t.call(this, 16, 65535), r.call(this, 2, 858993459), r.call(this, 8, 16711935), t.call(this, 1, 1431655765);
                        for (var o = 0; o < 16; o++) {
                            for (var s = n[o], a = this._lBlock, c = this._rBlock, h = 0, l = 0; l < 8; l++) h |= f[l][((c ^ s[l]) & u[l]) >>> 0];
                            this._lBlock = c, this._rBlock = a ^ h
                        }
                        var d = this._lBlock;
                        this._lBlock = this._rBlock, this._rBlock = d, t.call(this, 1, 1431655765), r.call(this, 8, 16711935), r.call(this, 2, 858993459), t.call(this, 16, 65535), t.call(this, 4, 252645135), e[i] = this._lBlock, e[i + 1] = this._rBlock
                    },
                    keySize: 2,
                    ivSize: 2,
                    blockSize: 2
                });
            i.DES = s._createHelper(d);
            var p = a.TripleDES = s.extend({
                _doReset: function() {
                    var e = this._key,
                        t = e.words;
                    this._des1 = d.createEncryptor(o.create(t.slice(0, 2))), this._des2 = d.createEncryptor(o.create(t.slice(2, 4))), this._des3 = d.createEncryptor(o.create(t.slice(4, 6)))
                },
                encryptBlock: function(e, t) {
                    this._des1.encryptBlock(e, t), this._des2.decryptBlock(e, t), this._des3.encryptBlock(e, t)
                },
                decryptBlock: function(e, t) {
                    this._des3.decryptBlock(e, t), this._des2.encryptBlock(e, t), this._des1.decryptBlock(e, t)
                },
                keySize: 6,
                ivSize: 2,
                blockSize: 2
            });
            i.TripleDES = s._createHelper(p)
        }(),
        function() {
            function t() {
                for (var e = this._S, t = this._i, r = this._j, i = 0, n = 0; n < 4; n++) {
                    t = (t + 1) % 256, r = (r + e[t]) % 256;
                    var o = e[t];
                    e[t] = e[r], e[r] = o, i |= e[(e[t] + e[r]) % 256] << 24 - 8 * n
                }
                return this._i = t, this._j = r, i
            }
            var r = e,
                i = r.lib,
                n = i.StreamCipher,
                o = r.algo,
                s = o.RC4 = n.extend({
                    _doReset: function() {
                        for (var e = this._key, t = e.words, r = e.sigBytes, i = this._S = [], n = 0; n < 256; n++) i[n] = n;
                        for (var n = 0, o = 0; n < 256; n++) {
                            var s = n % r,
                                a = t[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                            o = (o + i[n] + a) % 256;
                            var c = i[n];
                            i[n] = i[o], i[o] = c
                        }
                        this._i = this._j = 0
                    },
                    _doProcessBlock: function(e, r) {
                        e[r] ^= t.call(this)
                    },
                    keySize: 8,
                    ivSize: 0
                });
            r.RC4 = n._createHelper(s);
            var a = o.RC4Drop = s.extend({
                cfg: s.cfg.extend({
                    drop: 192
                }),
                _doReset: function() {
                    s._doReset.call(this);
                    for (var e = this.cfg.drop; e > 0; e--) t.call(this)
                }
            });
            r.RC4Drop = n._createHelper(a)
        }(), e.mode.CTRGladman = function() {
            function t(e) {
                if (255 === (e >> 24 & 255)) {
                    var t = e >> 16 & 255,
                        r = e >> 8 & 255,
                        i = 255 & e;
                    255 === t ? (t = 0, 255 === r ? (r = 0, 255 === i ? i = 0 : ++i) : ++r) : ++t, e = 0, e += t << 16, e += r << 8, e += i
                } else e += 1 << 24;
                return e
            }

            function r(e) {
                return 0 === (e[0] = t(e[0])) && (e[1] = t(e[1])), e
            }
            var i = e.lib.BlockCipherMode.extend(),
                n = i.Encryptor = i.extend({
                    processBlock: function(e, t) {
                        var i = this._cipher,
                            n = i.blockSize,
                            o = this._iv,
                            s = this._counter;
                        o && (s = this._counter = o.slice(0), this._iv = void 0), r(s);
                        var a = s.slice(0);
                        i.encryptBlock(a, 0);
                        for (var c = 0; c < n; c++) e[t + c] ^= a[c]
                    }
                });
            return i.Decryptor = n, i
        }(),
        function() {
            function t() {
                for (var e = this._X, t = this._C, r = 0; r < 8; r++) a[r] = t[r];
                t[0] = t[0] + 1295307597 + this._b | 0, t[1] = t[1] + 3545052371 + (t[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0, t[2] = t[2] + 886263092 + (t[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0, t[3] = t[3] + 1295307597 + (t[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0, t[4] = t[4] + 3545052371 + (t[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0, t[5] = t[5] + 886263092 + (t[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0, t[6] = t[6] + 1295307597 + (t[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0, t[7] = t[7] + 3545052371 + (t[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0, this._b = t[7] >>> 0 < a[7] >>> 0 ? 1 : 0;
                for (var r = 0; r < 8; r++) {
                    var i = e[r] + t[r],
                        n = 65535 & i,
                        o = i >>> 16,
                        s = ((n * n >>> 17) + n * o >>> 15) + o * o,
                        h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
                    c[r] = s ^ h
                }
                e[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0, e[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0, e[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0, e[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0, e[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0, e[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0, e[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0, e[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0
            }
            var r = e,
                i = r.lib,
                n = i.StreamCipher,
                o = r.algo,
                s = [],
                a = [],
                c = [],
                h = o.Rabbit = n.extend({
                    _doReset: function() {
                        for (var e = this._key.words, r = this.cfg.iv, i = 0; i < 4; i++) e[i] = 16711935 & (e[i] << 8 | e[i] >>> 24) | 4278255360 & (e[i] << 24 | e[i] >>> 8);
                        var n = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16],
                            o = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]];
                        this._b = 0;
                        for (var i = 0; i < 4; i++) t.call(this);
                        for (var i = 0; i < 8; i++) o[i] ^= n[i + 4 & 7];
                        if (r) {
                            var s = r.words,
                                a = s[0],
                                c = s[1],
                                h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
                                l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8),
                                f = h >>> 16 | 4294901760 & l,
                                u = l << 16 | 65535 & h;
                            o[0] ^= h, o[1] ^= f, o[2] ^= l, o[3] ^= u, o[4] ^= h, o[5] ^= f, o[6] ^= l, o[7] ^= u;
                            for (var i = 0; i < 4; i++) t.call(this)
                        }
                    },
                    _doProcessBlock: function(e, r) {
                        var i = this._X;
                        t.call(this), s[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, s[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, s[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, s[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
                        for (var n = 0; n < 4; n++) s[n] = 16711935 & (s[n] << 8 | s[n] >>> 24) | 4278255360 & (s[n] << 24 | s[n] >>> 8), e[r + n] ^= s[n]
                    },
                    blockSize: 4,
                    ivSize: 2
                });
            r.Rabbit = n._createHelper(h)
        }(), e.mode.CTR = function() {
            var t = e.lib.BlockCipherMode.extend(),
                r = t.Encryptor = t.extend({
                    processBlock: function(e, t) {
                        var r = this._cipher,
                            i = r.blockSize,
                            n = this._iv,
                            o = this._counter;
                        n && (o = this._counter = n.slice(0), this._iv = void 0);
                        var s = o.slice(0);
                        r.encryptBlock(s, 0), o[i - 1] = o[i - 1] + 1 | 0;
                        for (var a = 0; a < i; a++) e[t + a] ^= s[a]
                    }
                });
            return t.Decryptor = r, t
        }(),
        function() {
            function t() {
                for (var e = this._X, t = this._C, r = 0; r < 8; r++) a[r] = t[r];
                t[0] = t[0] + 1295307597 + this._b | 0, t[1] = t[1] + 3545052371 + (t[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0, t[2] = t[2] + 886263092 + (t[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0, t[3] = t[3] + 1295307597 + (t[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0, t[4] = t[4] + 3545052371 + (t[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0, t[5] = t[5] + 886263092 + (t[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0, t[6] = t[6] + 1295307597 + (t[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0, t[7] = t[7] + 3545052371 + (t[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0, this._b = t[7] >>> 0 < a[7] >>> 0 ? 1 : 0;
                for (var r = 0; r < 8; r++) {
                    var i = e[r] + t[r],
                        n = 65535 & i,
                        o = i >>> 16,
                        s = ((n * n >>> 17) + n * o >>> 15) + o * o,
                        h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
                    c[r] = s ^ h
                }
                e[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0, e[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0, e[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0, e[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0, e[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0, e[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0, e[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0, e[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0
            }
            var r = e,
                i = r.lib,
                n = i.StreamCipher,
                o = r.algo,
                s = [],
                a = [],
                c = [],
                h = o.RabbitLegacy = n.extend({
                    _doReset: function() {
                        var e = this._key.words,
                            r = this.cfg.iv,
                            i = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16],
                            n = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]];
                        this._b = 0;
                        for (var o = 0; o < 4; o++) t.call(this);
                        for (var o = 0; o < 8; o++) n[o] ^= i[o + 4 & 7];
                        if (r) {
                            var s = r.words,
                                a = s[0],
                                c = s[1],
                                h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
                                l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8),
                                f = h >>> 16 | 4294901760 & l,
                                u = l << 16 | 65535 & h;
                            n[0] ^= h, n[1] ^= f, n[2] ^= l, n[3] ^= u, n[4] ^= h, n[5] ^= f, n[6] ^= l, n[7] ^= u;
                            for (var o = 0; o < 4; o++) t.call(this)
                        }
                    },
                    _doProcessBlock: function(e, r) {
                        var i = this._X;
                        t.call(this), s[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, s[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, s[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, s[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
                        for (var n = 0; n < 4; n++) s[n] = 16711935 & (s[n] << 8 | s[n] >>> 24) | 4278255360 & (s[n] << 24 | s[n] >>> 8), e[r + n] ^= s[n]
                    },
                    blockSize: 4,
                    ivSize: 2
                });
            r.RabbitLegacy = n._createHelper(h)
        }(), e.pad.ZeroPadding = {
            pad: function(e, t) {
                var r = 4 * t;
                e.clamp(), e.sigBytes += r - (e.sigBytes % r || r)
            },
            unpad: function(e) {
                for (var t = e.words, r = e.sigBytes - 1; !(t[r >>> 2] >>> 24 - r % 4 * 8 & 255);) r--;
                e.sigBytes = r + 1
            }
        }, e
}),
function(e) {
    e.storage.local.get({
        auto_refresh: !0,
        clear_cookies: !1
    }, function(t) {
        new Vue({
            el: "#juno_okyo",
            data: {
                password: "",
                sitename: "this page",
                isValidProtocol: !1,
                auto_refresh: t.auto_refresh,
                clear_cookies: t.clear_cookies,
                fullpage: !1,
                error: !1
            },
            methods: {
                exportCookies: function() {
                    var t = this;
                    if (!this.isValidProtocol) return !1;
                    if (this.fullpage) try {
                        var r = new URL(window.top.location.href);
                        this.doExport(atob(r.searchParams.get("url")))
                    } catch (i) {
                        console.error(i.message)
                    } else e.tabs.query({
                        active: !0,
                        currentWindow: !0
                    }, function(e) {
                        t.doExport(e[0].url)
                    })
                },
                doExport: function(t) {
                    var r = this;
                    try {
                        var i = new URL(t),
                            n = i.hostname,
                            o = i.origin;
                        e.cookies.getAll({
                            url: o
                        }, function(e) {
                            if (e.length > 0) {
                                var t = {
                                        url: o,
                                        cookies: e
                                    },
                                    i = JSON.stringify(t),
                                    s = "json";
                                "" !== r.password && r.password.length > 0 && (i = J2TEAM.AES.encrypt(i, r.password), s = "txt");
                                var a = new Blob([i], {
                                    type: "text/plain;charset=utf-8"
                                });
                                saveAs(a, n + "_" + r.getTime() + "." + s)
                            } else r.error = !0
                        })
                    } catch (s) {
                        return console.error(s.message), !1
                    }
                },
                importCookies: function() {
                    return !!this.isValidProtocol && void document.getElementById("importCookiesInput").click()
                },
                importCookiesFromFile: function() {
                    var t = this,
                        r = document.getElementById("importCookiesInput"),
                        i = r.files[0];
                    if (i) {
                        var n = new FileReader;
                        n.onload = function(r) {
                            var i = r.target.result;
                            if ("" !== t.password && t.password.length > 0) {
                                var n = J2TEAM.AES.decrypt(i.toString(), t.password);
                                i = n.toString(J2TEAM.enc.Utf8)
                            }
                            try {
                                var o = JSON.parse(i);
                                e.cookies.getAll({
                                    url: o.url
                                }, function(r) {
                                    t.clear_cookies && r.map(function(t) {
                                        e.cookies.remove({
                                            url: o.url,
                                            name: t.name,
                                            storeId: t.storeId
                                        })
                                    }), o.cookies.map(function(t) {
                                        e.cookies.set({
                                            url: o.url,
                                            name: t.name,
                                            value: t.value,
                                            domain: t.domain,
                                            path: t.path,
                                            secure: t.secure,
                                            httpOnly: t.httpOnly,
                                            sameSite: t.sameSite,
                                            expirationDate: t.expirationDate,
                                            storeId: t.storeId
                                        })
                                    }), toastr.success("Done!"), t.auto_refresh && setTimeout(function() {
                                        e.tabs.query({
                                            active: !0,
                                            currentWindow: !0
                                        }, function(t) {
                                            e.tabs.update(t[0].id, {
                                                url: t[0].url
                                            }, function(e) {
                                                window.close()
                                            })
                                        })
                                    }, 1e3)
                                })
                            } catch (r) {
                                return toastr.error("Import failed!"), console.error(r.message), !1
                            }
                        }, n.readAsText(i)
                    }
                },
                saveOptions: function() {
                    e.storage.local.set({
                        auto_refresh: this.auto_refresh
                    })
                },
                getTime: function() {
                    var e = new Date,
                        t = e.getDate(),
                        r = e.getMonth() + 1;
                    return t < 10 && (t = "0" + t), r < 10 && (r = "0" + r), t + "-" + r + "-" + e.getFullYear()
                },
                openInNewTab: function() {
                    e.tabs.query({
                        active: !0,
                        currentWindow: !0
                    }, function(t) {
                        try {
                            e.tabs.create({
                                url: e.extension.getURL("popup.html?url=" + encodeURIComponent(btoa(t[0].url))),
                                active: !0
                            })
                        } catch (r) {
                            return console.error(r.message), !1
                        }
                    })
                }
            },
            mounted: function() {
                var t = this;
                e.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function(e) {
                    try {
                        var r = new URL(e[0].url);
                        if (t.fullpage = "chrome-extension:" === r.protocol, t.fullpage) {
                            try {
                                var i = new URL(window.top.location.href),
                                    n = new URL(atob(i.searchParams.get("url")));
                                t.sitename = n.hostname
                            } catch (o) {
                                console.error(o.message), window.close()
                            }
                            t.isValidProtocol = !0
                        } else t.isValidProtocol = ["http:", "https:"].includes(r.protocol), t.isValidProtocol && (t.sitename = r.hostname)
                    } catch (o) {
                        return console.error(o.message), !1
                    }
                })
            }
        })
    })
}(chrome);