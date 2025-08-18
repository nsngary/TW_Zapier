var xd = Object.defineProperty;
var Sd = (s, e, t) => e in s ? xd(s, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: t
}) : s[e] = t;
var Pr = (s, e, t) => Sd(s, typeof e != "symbol" ? e + "" : e, t);
(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
        return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]'))
        i(r);
    new MutationObserver(r => {
        for (const n of r)
            if (n.type === "childList")
                for (const o of n.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && i(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function t(r) {
        const n = {};
        return r.integrity && (n.integrity = r.integrity),
        r.referrerPolicy && (n.referrerPolicy = r.referrerPolicy),
        r.crossOrigin === "use-credentials" ? n.credentials = "include" : r.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin",
        n
    }
    function i(r) {
        if (r.ep)
            return;
        r.ep = !0;
        const n = t(r);
        fetch(r.href, n)
    }
}
)();
function Td(s, e) {
    for (var t = 0; t < e.length; t++) {
        var i = e[t];
        i.enumerable = i.enumerable || !1,
        i.configurable = !0,
        "value"in i && (i.writable = !0),
        Object.defineProperty(s, typeof (r = function(n, o) {
            if (typeof n != "object" || n === null)
                return n;
            var l = n[Symbol.toPrimitive];
            if (l !== void 0) {
                var c = l.call(n, "string");
                if (typeof c != "object")
                    return c;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(n)
        }(i.key)) == "symbol" ? r : String(r), i)
    }
    var r
}
function Tl(s, e, t) {
    return e && Td(s.prototype, e),
    Object.defineProperty(s, "prototype", {
        writable: !1
    }),
    s
}
function gr() {
    return gr = Object.assign ? Object.assign.bind() : function(s) {
        for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var i in t)
                Object.prototype.hasOwnProperty.call(t, i) && (s[i] = t[i])
        }
        return s
    }
    ,
    gr.apply(this, arguments)
}
function Za(s, e) {
    s.prototype = Object.create(e.prototype),
    s.prototype.constructor = s,
    Ws(s, e)
}
function Wo(s) {
    return Wo = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e)
    }
    ,
    Wo(s)
}
function Ws(s, e) {
    return Ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, i) {
        return t.__proto__ = i,
        t
    }
    ,
    Ws(s, e)
}
function Ed() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
        return !1;
    if (typeof Proxy == "function")
        return !0;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})),
        !0
    } catch {
        return !1
    }
}
function Go(s, e, t) {
    return Go = Ed() ? Reflect.construct.bind() : function(i, r, n) {
        var o = [null];
        o.push.apply(o, r);
        var l = new (Function.bind.apply(i, o));
        return n && Ws(l, n.prototype),
        l
    }
    ,
    Go.apply(null, arguments)
}
function Vo(s) {
    var e = typeof Map == "function" ? new Map : void 0;
    return Vo = function(t) {
        if (t === null || Function.toString.call(t).indexOf("[native code]") === -1)
            return t;
        if (typeof t != "function")
            throw new TypeError("Super expression must either be null or a function");
        if (e !== void 0) {
            if (e.has(t))
                return e.get(t);
            e.set(t, i)
        }
        function i() {
            return Go(t, arguments, Wo(this).constructor)
        }
        return i.prototype = Object.create(t.prototype, {
            constructor: {
                value: i,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }),
        Ws(i, t)
    }
    ,
    Vo(s)
}
function Cd(s) {
    if (s === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return s
}
var Wr, Md = function() {
    this.before = void 0,
    this.beforeLeave = void 0,
    this.leave = void 0,
    this.afterLeave = void 0,
    this.beforeEnter = void 0,
    this.enter = void 0,
    this.afterEnter = void 0,
    this.after = void 0
};
(function(s) {
    s[s.off = 0] = "off",
    s[s.error = 1] = "error",
    s[s.warning = 2] = "warning",
    s[s.info = 3] = "info",
    s[s.debug = 4] = "debug"
}
)(Wr || (Wr = {}));
var mu = Wr.off
  , wn = function() {
    function s(t) {
        this.t = void 0,
        this.t = t
    }
    s.getLevel = function() {
        return mu
    }
    ,
    s.setLevel = function(t) {
        return mu = Wr[t]
    }
    ;
    var e = s.prototype;
    return e.error = function() {
        this.i(console.error, Wr.error, [].slice.call(arguments))
    }
    ,
    e.warn = function() {
        this.i(console.warn, Wr.warning, [].slice.call(arguments))
    }
    ,
    e.info = function() {
        this.i(console.info, Wr.info, [].slice.call(arguments))
    }
    ,
    e.debug = function() {
        this.i(console.log, Wr.debug, [].slice.call(arguments))
    }
    ,
    e.i = function(t, i, r) {
        i <= s.getLevel() && t.apply(console, ["[" + this.t + "] "].concat(r))
    }
    ,
    s
}();
function Bn(s) {
    return s.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")
}
function gu(s) {
    return s && s.sensitive ? "" : "i"
}
var wr = {
    container: "container",
    history: "history",
    namespace: "namespace",
    prefix: "data-barba",
    prevent: "prevent",
    wrapper: "wrapper"
}
  , _n = new (function() {
    function s() {
        this.o = wr,
        this.u = void 0,
        this.h = {
            after: null,
            before: null,
            parent: null
        }
    }
    var e = s.prototype;
    return e.toString = function(t) {
        return t.outerHTML
    }
    ,
    e.toDocument = function(t) {
        return this.u || (this.u = new DOMParser),
        this.u.parseFromString(t, "text/html")
    }
    ,
    e.toElement = function(t) {
        var i = document.createElement("div");
        return i.innerHTML = t,
        i
    }
    ,
    e.getHtml = function(t) {
        return t === void 0 && (t = document),
        this.toString(t.documentElement)
    }
    ,
    e.getWrapper = function(t) {
        return t === void 0 && (t = document),
        t.querySelector("[" + this.o.prefix + '="' + this.o.wrapper + '"]')
    }
    ,
    e.getContainer = function(t) {
        return t === void 0 && (t = document),
        t.querySelector("[" + this.o.prefix + '="' + this.o.container + '"]')
    }
    ,
    e.removeContainer = function(t) {
        document.body.contains(t) && (this.v(t),
        t.parentNode.removeChild(t))
    }
    ,
    e.addContainer = function(t, i) {
        var r = this.getContainer() || this.h.before;
        r ? this.l(t, r) : this.h.after ? this.h.after.parentNode.insertBefore(t, this.h.after) : this.h.parent ? this.h.parent.appendChild(t) : i.appendChild(t)
    }
    ,
    e.getSibling = function() {
        return this.h
    }
    ,
    e.getNamespace = function(t) {
        t === void 0 && (t = document);
        var i = t.querySelector("[" + this.o.prefix + "-" + this.o.namespace + "]");
        return i ? i.getAttribute(this.o.prefix + "-" + this.o.namespace) : null
    }
    ,
    e.getHref = function(t) {
        if (t.tagName && t.tagName.toLowerCase() === "a") {
            if (typeof t.href == "string")
                return t.href;
            var i = t.getAttribute("href") || t.getAttribute("xlink:href");
            if (i)
                return this.resolveUrl(i.baseVal || i)
        }
        return null
    }
    ,
    e.resolveUrl = function() {
        var t = [].slice.call(arguments).length;
        if (t === 0)
            throw new Error("resolveUrl requires at least one argument; got none.");
        var i = document.createElement("base");
        if (i.href = arguments[0],
        t === 1)
            return i.href;
        var r = document.getElementsByTagName("head")[0];
        r.insertBefore(i, r.firstChild);
        for (var n, o = document.createElement("a"), l = 1; l < t; l++)
            o.href = arguments[l],
            i.href = n = o.href;
        return r.removeChild(i),
        n
    }
    ,
    e.l = function(t, i) {
        i.parentNode.insertBefore(t, i.nextSibling)
    }
    ,
    e.v = function(t) {
        return this.h = {
            after: t.nextElementSibling,
            before: t.previousElementSibling,
            parent: t.parentElement
        },
        this.h
    }
    ,
    s
}())
  , Pd = function() {
    function s() {
        this.p = void 0,
        this.m = [],
        this.P = -1
    }
    var e = s.prototype;
    return e.init = function(t, i) {
        this.p = "barba";
        var r = {
            data: {},
            ns: i,
            scroll: {
                x: window.scrollX,
                y: window.scrollY
            },
            url: t
        };
        this.P = 0,
        this.m.push(r);
        var n = {
            from: this.p,
            index: this.P,
            states: [].concat(this.m)
        };
        window.history && window.history.replaceState(n, "", t)
    }
    ,
    e.change = function(t, i, r) {
        if (r && r.state) {
            var n = r.state
              , o = n.index;
            i = this.g(this.P - o),
            this.replace(n.states),
            this.P = o
        } else
            this.add(t, i);
        return i
    }
    ,
    e.add = function(t, i, r, n) {
        var o = r ?? this.R(i)
          , l = {
            data: n ?? {},
            ns: "tmp",
            scroll: {
                x: window.scrollX,
                y: window.scrollY
            },
            url: t
        };
        switch (o) {
        case "push":
            this.P = this.size,
            this.m.push(l);
            break;
        case "replace":
            this.set(this.P, l)
        }
        var c = {
            from: this.p,
            index: this.P,
            states: [].concat(this.m)
        };
        switch (o) {
        case "push":
            window.history && window.history.pushState(c, "", t);
            break;
        case "replace":
            window.history && window.history.replaceState(c, "", t)
        }
    }
    ,
    e.store = function(t, i) {
        var r = i || this.P
          , n = this.get(r);
        n.data = gr({}, n.data, t),
        this.set(r, n);
        var o = {
            from: this.p,
            index: this.P,
            states: [].concat(this.m)
        };
        window.history.replaceState(o, "")
    }
    ,
    e.update = function(t, i) {
        var r = i || this.P
          , n = gr({}, this.get(r), t);
        this.set(r, n)
    }
    ,
    e.remove = function(t) {
        t ? this.m.splice(t, 1) : this.m.pop(),
        this.P--
    }
    ,
    e.clear = function() {
        this.m = [],
        this.P = -1
    }
    ,
    e.replace = function(t) {
        this.m = t
    }
    ,
    e.get = function(t) {
        return this.m[t]
    }
    ,
    e.set = function(t, i) {
        return this.m[t] = i
    }
    ,
    e.R = function(t) {
        var i = "push"
          , r = t
          , n = wr.prefix + "-" + wr.history;
        return r.hasAttribute && r.hasAttribute(n) && (i = r.getAttribute(n)),
        i
    }
    ,
    e.g = function(t) {
        return Math.abs(t) > 1 ? t > 0 ? "forward" : "back" : t === 0 ? "popstate" : t > 0 ? "back" : "forward"
    }
    ,
    Tl(s, [{
        key: "current",
        get: function() {
            return this.m[this.P]
        }
    }, {
        key: "previous",
        get: function() {
            return this.P < 1 ? null : this.m[this.P - 1]
        }
    }, {
        key: "size",
        get: function() {
            return this.m.length
        }
    }]),
    s
}()
  , ac = new Pd
  , Na = function(s, e) {
    try {
        var t = function() {
            if (!e.next.html)
                return Promise.resolve(s).then(function(i) {
                    var r = e.next;
                    if (i) {
                        var n = _n.toElement(i.html);
                        r.namespace = _n.getNamespace(n),
                        r.container = _n.getContainer(n),
                        r.url = i.url,
                        r.html = i.html,
                        ac.update({
                            ns: r.namespace
                        });
                        var o = _n.toDocument(i.html);
                        document.title = o.title
                    }
                })
        }();
        return Promise.resolve(t && t.then ? t.then(function() {}) : void 0)
    } catch (i) {
        return Promise.reject(i)
    }
}
  , oc = function s(e, t, i) {
    return e instanceof RegExp ? function(r, n) {
        if (!n)
            return r;
        for (var o = /\((?:\?<(.*?)>)?(?!\?)/g, l = 0, c = o.exec(r.source); c; )
            n.push({
                name: c[1] || l++,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: ""
            }),
            c = o.exec(r.source);
        return r
    }(e, t) : Array.isArray(e) ? function(r, n, o) {
        var l = r.map(function(c) {
            return s(c, n, o).source
        });
        return new RegExp("(?:".concat(l.join("|"), ")"),gu(o))
    }(e, t, i) : function(r, n, o) {
        return function(l, c, f) {
            f === void 0 && (f = {});
            for (var h = f.strict, w = h !== void 0 && h, _ = f.start, y = _ === void 0 || _, g = f.end, p = g === void 0 || g, S = f.encode, T = S === void 0 ? function(Q) {
                return Q
            }
            : S, C = f.delimiter, E = C === void 0 ? "/#?" : C, P = f.endsWith, k = "[".concat(Bn(P === void 0 ? "" : P), "]|$"), R = "[".concat(Bn(E), "]"), d = y ? "^" : "", N = 0, L = l; N < L.length; N++) {
                var O = L[N];
                if (typeof O == "string")
                    d += Bn(T(O));
                else {
                    var X = Bn(T(O.prefix))
                      , I = Bn(T(O.suffix));
                    if (O.pattern)
                        if (c && c.push(O),
                        X || I)
                            if (O.modifier === "+" || O.modifier === "*") {
                                var H = O.modifier === "*" ? "?" : "";
                                d += "(?:".concat(X, "((?:").concat(O.pattern, ")(?:").concat(I).concat(X, "(?:").concat(O.pattern, "))*)").concat(I, ")").concat(H)
                            } else
                                d += "(?:".concat(X, "(").concat(O.pattern, ")").concat(I, ")").concat(O.modifier);
                        else
                            d += O.modifier === "+" || O.modifier === "*" ? "((?:".concat(O.pattern, ")").concat(O.modifier, ")") : "(".concat(O.pattern, ")").concat(O.modifier);
                    else
                        d += "(?:".concat(X).concat(I, ")").concat(O.modifier)
                }
            }
            if (p)
                w || (d += "".concat(R, "?")),
                d += f.endsWith ? "(?=".concat(k, ")") : "$";
            else {
                var q = l[l.length - 1]
                  , V = typeof q == "string" ? R.indexOf(q[q.length - 1]) > -1 : q === void 0;
                w || (d += "(?:".concat(R, "(?=").concat(k, "))?")),
                V || (d += "(?=".concat(R, "|").concat(k, ")"))
            }
            return new RegExp(d,gu(f))
        }(function(l, c) {
            c === void 0 && (c = {});
            for (var f = function(I) {
                for (var H = [], q = 0; q < I.length; ) {
                    var V = I[q];
                    if (V !== "*" && V !== "+" && V !== "?")
                        if (V !== "\\")
                            if (V !== "{")
                                if (V !== "}")
                                    if (V !== ":")
                                        if (V !== "(")
                                            H.push({
                                                type: "CHAR",
                                                index: q,
                                                value: I[q++]
                                            });
                                        else {
                                            var Q = 1
                                              , F = "";
                                            if (I[Z = q + 1] === "?")
                                                throw new TypeError('Pattern cannot start with "?" at '.concat(Z));
                                            for (; Z < I.length; )
                                                if (I[Z] !== "\\") {
                                                    if (I[Z] === ")") {
                                                        if (--Q == 0) {
                                                            Z++;
                                                            break
                                                        }
                                                    } else if (I[Z] === "(" && (Q++,
                                                    I[Z + 1] !== "?"))
                                                        throw new TypeError("Capturing groups are not allowed at ".concat(Z));
                                                    F += I[Z++]
                                                } else
                                                    F += I[Z++] + I[Z++];
                                            if (Q)
                                                throw new TypeError("Unbalanced pattern at ".concat(q));
                                            if (!F)
                                                throw new TypeError("Missing pattern at ".concat(q));
                                            H.push({
                                                type: "PATTERN",
                                                index: q,
                                                value: F
                                            }),
                                            q = Z
                                        }
                                    else {
                                        for (var Y = "", Z = q + 1; Z < I.length; ) {
                                            var $ = I.charCodeAt(Z);
                                            if (!($ >= 48 && $ <= 57 || $ >= 65 && $ <= 90 || $ >= 97 && $ <= 122 || $ === 95))
                                                break;
                                            Y += I[Z++]
                                        }
                                        if (!Y)
                                            throw new TypeError("Missing parameter name at ".concat(q));
                                        H.push({
                                            type: "NAME",
                                            index: q,
                                            value: Y
                                        }),
                                        q = Z
                                    }
                                else
                                    H.push({
                                        type: "CLOSE",
                                        index: q,
                                        value: I[q++]
                                    });
                            else
                                H.push({
                                    type: "OPEN",
                                    index: q,
                                    value: I[q++]
                                });
                        else
                            H.push({
                                type: "ESCAPED_CHAR",
                                index: q++,
                                value: I[q++]
                            });
                    else
                        H.push({
                            type: "MODIFIER",
                            index: q,
                            value: I[q++]
                        })
                }
                return H.push({
                    type: "END",
                    index: q,
                    value: ""
                }),
                H
            }(l), h = c.prefixes, w = h === void 0 ? "./" : h, _ = "[^".concat(Bn(c.delimiter || "/#?"), "]+?"), y = [], g = 0, p = 0, S = "", T = function(I) {
                if (p < f.length && f[p].type === I)
                    return f[p++].value
            }, C = function(I) {
                var H = T(I);
                if (H !== void 0)
                    return H;
                var q = f[p]
                  , V = q.index;
                throw new TypeError("Unexpected ".concat(q.type, " at ").concat(V, ", expected ").concat(I))
            }, E = function() {
                for (var I, H = ""; I = T("CHAR") || T("ESCAPED_CHAR"); )
                    H += I;
                return H
            }; p < f.length; ) {
                var P = T("CHAR")
                  , k = T("NAME")
                  , R = T("PATTERN");
                if (k || R)
                    w.indexOf(N = P || "") === -1 && (S += N,
                    N = ""),
                    S && (y.push(S),
                    S = ""),
                    y.push({
                        name: k || g++,
                        prefix: N,
                        suffix: "",
                        pattern: R || _,
                        modifier: T("MODIFIER") || ""
                    });
                else {
                    var d = P || T("ESCAPED_CHAR");
                    if (d)
                        S += d;
                    else if (S && (y.push(S),
                    S = ""),
                    T("OPEN")) {
                        var N = E()
                          , L = T("NAME") || ""
                          , O = T("PATTERN") || ""
                          , X = E();
                        C("CLOSE"),
                        y.push({
                            name: L || (O ? g++ : ""),
                            pattern: L && !O ? _ : O,
                            prefix: N,
                            suffix: X,
                            modifier: T("MODIFIER") || ""
                        })
                    } else
                        C("END")
                }
            }
            return y
        }(r, o), n, o)
    }(e, t, i)
}
  , Ad = {
    __proto__: null,
    update: Na,
    nextTick: function() {
        return new Promise(function(s) {
            window.requestAnimationFrame(s)
        }
        )
    },
    pathToRegexp: oc
}
  , lc = function() {
    return window.location.origin
}
  , Gs = function(s) {
    return s === void 0 && (s = window.location.href),
    Gr(s).port
}
  , Gr = function(s) {
    var e, t = s.match(/:\d+/);
    if (t === null)
        /^http/.test(s) && (e = 80),
        /^https/.test(s) && (e = 443);
    else {
        var i = t[0].substring(1);
        e = parseInt(i, 10)
    }
    var r, n = s.replace(lc(), ""), o = {}, l = n.indexOf("#");
    l >= 0 && (r = n.slice(l + 1),
    n = n.slice(0, l));
    var c = n.indexOf("?");
    return c >= 0 && (o = uc(n.slice(c + 1)),
    n = n.slice(0, c)),
    {
        hash: r,
        path: n,
        port: e,
        query: o
    }
}
  , uc = function(s) {
    return s.split("&").reduce(function(e, t) {
        var i = t.split("=");
        return e[i[0]] = i[1],
        e
    }, {})
}
  , Uo = function(s) {
    return s === void 0 && (s = window.location.href),
    s.replace(/(\/#.*|\/|#.*)$/, "")
}
  , kd = {
    __proto__: null,
    getHref: function() {
        return window.location.href
    },
    getAbsoluteHref: function(s, e) {
        return e === void 0 && (e = document.baseURI),
        new URL(s,e).href
    },
    getOrigin: lc,
    getPort: Gs,
    getPath: function(s) {
        return s === void 0 && (s = window.location.href),
        Gr(s).path
    },
    getQuery: function(s, e) {
        return e === void 0 && (e = !1),
        e ? JSON.stringify(Gr(s).query) : Gr(s).query
    },
    getHash: function(s) {
        return Gr(s).hash
    },
    parse: Gr,
    parseQuery: uc,
    clean: Uo
};
function Ld(s, e, t, i, r) {
    return e === void 0 && (e = 2e3),
    new Promise(function(n, o) {
        var l = new XMLHttpRequest;
        l.onreadystatechange = function() {
            if (l.readyState === XMLHttpRequest.DONE) {
                if (l.status === 200) {
                    var c = l.responseURL !== "" && l.responseURL !== s ? l.responseURL : s;
                    n({
                        html: l.responseText,
                        url: gr({
                            href: c
                        }, Gr(c))
                    }),
                    i.update(s, {
                        status: "fulfilled",
                        target: c
                    })
                } else if (l.status) {
                    var f = {
                        status: l.status,
                        statusText: l.statusText
                    };
                    t(s, f),
                    o(f),
                    i.update(s, {
                        status: "rejected"
                    })
                }
            }
        }
        ,
        l.ontimeout = function() {
            var c = new Error("Timeout error [" + e + "]");
            t(s, c),
            o(c),
            i.update(s, {
                status: "rejected"
            })
        }
        ,
        l.onerror = function() {
            var c = new Error("Fetch error");
            t(s, c),
            o(c),
            i.update(s, {
                status: "rejected"
            })
        }
        ,
        l.open("GET", s),
        l.timeout = e,
        l.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml"),
        l.setRequestHeader("x-barba", "yes"),
        r.all().forEach(function(c, f) {
            l.setRequestHeader(f, c)
        }),
        l.send()
    }
    )
}
function Od(s) {
    return !!s && (typeof s == "object" || typeof s == "function") && typeof s.then == "function"
}
function Un(s, e) {
    return e === void 0 && (e = {}),
    function() {
        var t = arguments
          , i = !1
          , r = new Promise(function(n, o) {
            e.async = function() {
                return i = !0,
                function(c, f) {
                    c ? o(c) : n(f)
                }
            }
            ;
            var l = s.apply(e, [].slice.call(t));
            i || (Od(l) ? l.then(n, o) : n(l))
        }
        );
        return r
    }
}
var Yr = new (function(s) {
    function e() {
        var i;
        return (i = s.call(this) || this).logger = new wn("@barba/core"),
        i.all = ["ready", "page", "reset", "currentAdded", "currentRemoved", "nextAdded", "nextRemoved", "beforeOnce", "once", "afterOnce", "before", "beforeLeave", "leave", "afterLeave", "beforeEnter", "enter", "afterEnter", "after"],
        i.registered = new Map,
        i.init(),
        i
    }
    Za(e, s);
    var t = e.prototype;
    return t.init = function() {
        var i = this;
        this.registered.clear(),
        this.all.forEach(function(r) {
            i[r] || (i[r] = function(n, o) {
                i.registered.has(r) || i.registered.set(r, new Set),
                i.registered.get(r).add({
                    ctx: o || {},
                    fn: n
                })
            }
            )
        })
    }
    ,
    t.do = function(i) {
        var r = arguments
          , n = this;
        if (this.registered.has(i)) {
            var o = Promise.resolve();
            return this.registered.get(i).forEach(function(l) {
                o = o.then(function() {
                    return Un(l.fn, l.ctx).apply(void 0, [].slice.call(r, 1))
                })
            }),
            o.catch(function(l) {
                n.logger.debug("Hook error [" + i + "]"),
                n.logger.error(l)
            })
        }
        return Promise.resolve()
    }
    ,
    t.clear = function() {
        var i = this;
        this.all.forEach(function(r) {
            delete i[r]
        }),
        this.init()
    }
    ,
    t.help = function() {
        this.logger.info("Available hooks: " + this.all.join(","));
        var i = [];
        this.registered.forEach(function(r, n) {
            return i.push(n)
        }),
        this.logger.info("Registered hooks: " + i.join(","))
    }
    ,
    e
}(Md))
  , cc = function() {
    function s(e) {
        if (this.k = void 0,
        this.O = [],
        typeof e == "boolean")
            this.k = e;
        else {
            var t = Array.isArray(e) ? e : [e];
            this.O = t.map(function(i) {
                return oc(i)
            })
        }
    }
    return s.prototype.checkHref = function(e) {
        if (typeof this.k == "boolean")
            return this.k;
        var t = Gr(e).path;
        return this.O.some(function(i) {
            return i.exec(t) !== null
        })
    }
    ,
    s
}()
  , Dd = function(s) {
    function e(i) {
        var r;
        return (r = s.call(this, i) || this).T = new Map,
        r
    }
    Za(e, s);
    var t = e.prototype;
    return t.set = function(i, r, n, o, l) {
        return this.T.set(i, {
            action: n,
            request: r,
            status: o,
            target: l ?? i
        }),
        {
            action: n,
            request: r,
            status: o,
            target: l
        }
    }
    ,
    t.get = function(i) {
        return this.T.get(i)
    }
    ,
    t.getRequest = function(i) {
        return this.T.get(i).request
    }
    ,
    t.getAction = function(i) {
        return this.T.get(i).action
    }
    ,
    t.getStatus = function(i) {
        return this.T.get(i).status
    }
    ,
    t.getTarget = function(i) {
        return this.T.get(i).target
    }
    ,
    t.has = function(i) {
        return !this.checkHref(i) && this.T.has(i)
    }
    ,
    t.delete = function(i) {
        return this.T.delete(i)
    }
    ,
    t.update = function(i, r) {
        var n = gr({}, this.T.get(i), r);
        return this.T.set(i, n),
        n
    }
    ,
    e
}(cc)
  , Id = function() {
    function s() {
        this.A = new Map
    }
    var e = s.prototype;
    return e.set = function(t, i) {
        return this.A.set(t, i),
        {
            name: i
        }
    }
    ,
    e.get = function(t) {
        return this.A.get(t)
    }
    ,
    e.all = function() {
        return this.A
    }
    ,
    e.has = function(t) {
        return this.A.has(t)
    }
    ,
    e.delete = function(t) {
        return this.A.delete(t)
    }
    ,
    e.clear = function() {
        return this.A.clear()
    }
    ,
    s
}()
  , zd = function() {
    return !window.history.pushState
}
  , Rd = function(s) {
    return !s.el || !s.href
}
  , Nd = function(s) {
    var e = s.event;
    return e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
}
  , $d = function(s) {
    var e = s.el;
    return e.hasAttribute("target") && e.target === "_blank"
}
  , Hd = function(s) {
    var e = s.el;
    return e.protocol !== void 0 && window.location.protocol !== e.protocol || e.hostname !== void 0 && window.location.hostname !== e.hostname
}
  , Fd = function(s) {
    var e = s.el;
    return e.port !== void 0 && Gs() !== Gs(e.href)
}
  , qd = function(s) {
    var e = s.el;
    return e.getAttribute && typeof e.getAttribute("download") == "string"
}
  , Bd = function(s) {
    return s.el.hasAttribute(wr.prefix + "-" + wr.prevent)
}
  , jd = function(s) {
    return !!s.el.closest("[" + wr.prefix + "-" + wr.prevent + '="all"]')
}
  , Xd = function(s) {
    var e = s.href;
    return Uo(e) === Uo() && Gs(e) === Gs()
}
  , Yd = function(s) {
    function e(i) {
        var r;
        return (r = s.call(this, i) || this).suite = [],
        r.tests = new Map,
        r.init(),
        r
    }
    Za(e, s);
    var t = e.prototype;
    return t.init = function() {
        this.add("pushState", zd),
        this.add("exists", Rd),
        this.add("newTab", Nd),
        this.add("blank", $d),
        this.add("corsDomain", Hd),
        this.add("corsPort", Fd),
        this.add("download", qd),
        this.add("preventSelf", Bd),
        this.add("preventAll", jd),
        this.add("sameUrl", Xd, !1)
    }
    ,
    t.add = function(i, r, n) {
        n === void 0 && (n = !0),
        this.tests.set(i, r),
        n && this.suite.push(i)
    }
    ,
    t.run = function(i, r, n, o) {
        return this.tests.get(i)({
            el: r,
            event: n,
            href: o
        })
    }
    ,
    t.checkLink = function(i, r, n) {
        var o = this;
        return this.suite.some(function(l) {
            return o.run(l, i, r, n)
        })
    }
    ,
    e
}(cc)
  , xo = function(s) {
    function e(t, i) {
        var r;
        return i === void 0 && (i = "Barba error"),
        (r = s.call.apply(s, [this].concat([].slice.call(arguments, 2))) || this).error = void 0,
        r.label = void 0,
        r.error = t,
        r.label = i,
        Error.captureStackTrace && Error.captureStackTrace(Cd(r), e),
        r.name = "BarbaError",
        r
    }
    return Za(e, s),
    e
}(Vo(Error))
  , Wd = function() {
    function s(t) {
        t === void 0 && (t = []),
        this.logger = new wn("@barba/core"),
        this.all = [],
        this.page = [],
        this.once = [],
        this.j = [{
            name: "namespace",
            type: "strings"
        }, {
            name: "custom",
            type: "function"
        }],
        t && (this.all = this.all.concat(t)),
        this.update()
    }
    var e = s.prototype;
    return e.add = function(t, i) {
        t === "rule" ? this.j.splice(i.position || 0, 0, i.value) : this.all.push(i),
        this.update()
    }
    ,
    e.resolve = function(t, i) {
        var r = this;
        i === void 0 && (i = {});
        var n = i.once ? this.once : this.page;
        n = n.filter(i.self ? function(_) {
            return _.name && _.name === "self"
        }
        : function(_) {
            return !_.name || _.name !== "self"
        }
        );
        var o = new Map
          , l = n.find(function(_) {
            var y = !0
              , g = {};
            return i.self && _.name === "self" ? (o.set(_, g),
            !0) : (r.j.reverse().forEach(function(p) {
                y && (y = r.M(_, p, t, g),
                _.from && _.to && (y = r.M(_, p, t, g, "from") && r.M(_, p, t, g, "to")),
                _.from && !_.to && (y = r.M(_, p, t, g, "from")),
                !_.from && _.to && (y = r.M(_, p, t, g, "to")))
            }),
            o.set(_, g),
            y)
        })
          , c = o.get(l)
          , f = [];
        if (f.push(i.once ? "once" : "page"),
        i.self && f.push("self"),
        c) {
            var h, w = [l];
            Object.keys(c).length > 0 && w.push(c),
            (h = this.logger).info.apply(h, ["Transition found [" + f.join(",") + "]"].concat(w))
        } else
            this.logger.info("No transition found [" + f.join(",") + "]");
        return l
    }
    ,
    e.update = function() {
        var t = this;
        this.all = this.all.map(function(i) {
            return t.N(i)
        }).sort(function(i, r) {
            return i.priority - r.priority
        }).reverse().map(function(i) {
            return delete i.priority,
            i
        }),
        this.page = this.all.filter(function(i) {
            return i.leave !== void 0 || i.enter !== void 0
        }),
        this.once = this.all.filter(function(i) {
            return i.once !== void 0
        })
    }
    ,
    e.M = function(t, i, r, n, o) {
        var l = !0
          , c = !1
          , f = t
          , h = i.name
          , w = h
          , _ = h
          , y = h
          , g = o ? f[o] : f
          , p = o === "to" ? r.next : r.current;
        if (o ? g && g[h] : g[h]) {
            switch (i.type) {
            case "strings":
            default:
                var S = Array.isArray(g[w]) ? g[w] : [g[w]];
                p[w] && S.indexOf(p[w]) !== -1 && (c = !0),
                S.indexOf(p[w]) === -1 && (l = !1);
                break;
            case "object":
                var T = Array.isArray(g[_]) ? g[_] : [g[_]];
                p[_] ? (p[_].name && T.indexOf(p[_].name) !== -1 && (c = !0),
                T.indexOf(p[_].name) === -1 && (l = !1)) : l = !1;
                break;
            case "function":
                g[y](r) ? c = !0 : l = !1
            }
            c && (o ? (n[o] = n[o] || {},
            n[o][h] = f[o][h]) : n[h] = f[h])
        }
        return l
    }
    ,
    e.S = function(t, i, r) {
        var n = 0;
        return (t[i] || t.from && t.from[i] || t.to && t.to[i]) && (n += Math.pow(10, r),
        t.from && t.from[i] && (n += 1),
        t.to && t.to[i] && (n += 2)),
        n
    }
    ,
    e.N = function(t) {
        var i = this;
        t.priority = 0;
        var r = 0;
        return this.j.forEach(function(n, o) {
            r += i.S(t, n.name, o + 1)
        }),
        t.priority = r,
        t
    }
    ,
    s
}();
function _s(s, e) {
    try {
        var t = s()
    } catch (i) {
        return e(i)
    }
    return t && t.then ? t.then(void 0, e) : t
}
var Gd = function() {
    function s(t) {
        t === void 0 && (t = []),
        this.logger = new wn("@barba/core"),
        this.store = void 0,
        this.C = !1,
        this.store = new Wd(t)
    }
    var e = s.prototype;
    return e.get = function(t, i) {
        return this.store.resolve(t, i)
    }
    ,
    e.doOnce = function(t) {
        var i = t.data
          , r = t.transition;
        try {
            var n = function() {
                o.C = !1
            }
              , o = this
              , l = r || {};
            o.C = !0;
            var c = _s(function() {
                return Promise.resolve(o.L("beforeOnce", i, l)).then(function() {
                    return Promise.resolve(o.once(i, l)).then(function() {
                        return Promise.resolve(o.L("afterOnce", i, l)).then(function() {})
                    })
                })
            }, function(f) {
                o.C = !1,
                o.logger.debug("Transition error [before/after/once]"),
                o.logger.error(f)
            });
            return Promise.resolve(c && c.then ? c.then(n) : n())
        } catch (f) {
            return Promise.reject(f)
        }
    }
    ,
    e.doPage = function(t) {
        var i = t.data
          , r = t.transition
          , n = t.page
          , o = t.wrapper;
        try {
            var l = function(_) {
                c.C = !1
            }
              , c = this
              , f = r || {}
              , h = f.sync === !0 || !1;
            c.C = !0;
            var w = _s(function() {
                function _() {
                    return Promise.resolve(c.L("before", i, f)).then(function() {
                        function g(S) {
                            return Promise.resolve(c.remove(i)).then(function() {
                                return Promise.resolve(c.L("after", i, f)).then(function() {})
                            })
                        }
                        var p = function() {
                            if (h)
                                return _s(function() {
                                    return Promise.resolve(c.add(i, o)).then(function() {
                                        return Promise.resolve(c.L("beforeLeave", i, f)).then(function() {
                                            return Promise.resolve(c.L("beforeEnter", i, f)).then(function() {
                                                return Promise.resolve(Promise.all([c.leave(i, f), c.enter(i, f)])).then(function() {
                                                    return Promise.resolve(c.L("afterLeave", i, f)).then(function() {
                                                        return Promise.resolve(c.L("afterEnter", i, f)).then(function() {})
                                                    })
                                                })
                                            })
                                        })
                                    })
                                }, function(E) {
                                    if (c.H(E))
                                        throw new xo(E,"Transition error [sync]")
                                });
                            var S = function(E) {
                                return _s(function() {
                                    var P = function() {
                                        if (T !== !1)
                                            return Promise.resolve(c.add(i, o)).then(function() {
                                                return Promise.resolve(c.L("beforeEnter", i, f)).then(function() {
                                                    return Promise.resolve(c.enter(i, f, T)).then(function() {
                                                        return Promise.resolve(c.L("afterEnter", i, f)).then(function() {})
                                                    })
                                                })
                                            })
                                    }();
                                    if (P && P.then)
                                        return P.then(function() {})
                                }, function(P) {
                                    if (c.H(P))
                                        throw new xo(P,"Transition error [before/after/enter]")
                                })
                            }
                              , T = !1
                              , C = _s(function() {
                                return Promise.resolve(c.L("beforeLeave", i, f)).then(function() {
                                    return Promise.resolve(Promise.all([c.leave(i, f), Na(n, i)]).then(function(E) {
                                        return E[0]
                                    })).then(function(E) {
                                        return T = E,
                                        Promise.resolve(c.L("afterLeave", i, f)).then(function() {})
                                    })
                                })
                            }, function(E) {
                                if (c.H(E))
                                    throw new xo(E,"Transition error [before/after/leave]")
                            });
                            return C && C.then ? C.then(S) : S()
                        }();
                        return p && p.then ? p.then(g) : g()
                    })
                }
                var y = function() {
                    if (h)
                        return Promise.resolve(Na(n, i)).then(function() {})
                }();
                return y && y.then ? y.then(_) : _()
            }, function(_) {
                throw c.C = !1,
                _.name && _.name === "BarbaError" ? (c.logger.debug(_.label),
                c.logger.error(_.error),
                _) : (c.logger.debug("Transition error [page]"),
                c.logger.error(_),
                _)
            });
            return Promise.resolve(w && w.then ? w.then(l) : l())
        } catch (_) {
            return Promise.reject(_)
        }
    }
    ,
    e.once = function(t, i) {
        try {
            return Promise.resolve(Yr.do("once", t, i)).then(function() {
                return i.once ? Un(i.once, i)(t) : Promise.resolve()
            })
        } catch (r) {
            return Promise.reject(r)
        }
    }
    ,
    e.leave = function(t, i) {
        try {
            return Promise.resolve(Yr.do("leave", t, i)).then(function() {
                return i.leave ? Un(i.leave, i)(t) : Promise.resolve()
            })
        } catch (r) {
            return Promise.reject(r)
        }
    }
    ,
    e.enter = function(t, i, r) {
        try {
            return Promise.resolve(Yr.do("enter", t, i)).then(function() {
                return i.enter ? Un(i.enter, i)(t, r) : Promise.resolve()
            })
        } catch (n) {
            return Promise.reject(n)
        }
    }
    ,
    e.add = function(t, i) {
        try {
            return _n.addContainer(t.next.container, i),
            Yr.do("nextAdded", t),
            Promise.resolve()
        } catch (r) {
            return Promise.reject(r)
        }
    }
    ,
    e.remove = function(t) {
        try {
            return _n.removeContainer(t.current.container),
            Yr.do("currentRemoved", t),
            Promise.resolve()
        } catch (i) {
            return Promise.reject(i)
        }
    }
    ,
    e.H = function(t) {
        return t.message ? !/Timeout error|Fetch error/.test(t.message) : !t.status
    }
    ,
    e.L = function(t, i, r) {
        try {
            return Promise.resolve(Yr.do(t, i, r)).then(function() {
                return r[t] ? Un(r[t], r)(i) : Promise.resolve()
            })
        } catch (n) {
            return Promise.reject(n)
        }
    }
    ,
    Tl(s, [{
        key: "isRunning",
        get: function() {
            return this.C
        },
        set: function(t) {
            this.C = t
        }
    }, {
        key: "hasOnce",
        get: function() {
            return this.store.once.length > 0
        }
    }, {
        key: "hasSelf",
        get: function() {
            return this.store.all.some(function(t) {
                return t.name === "self"
            })
        }
    }, {
        key: "shouldWait",
        get: function() {
            return this.store.all.some(function(t) {
                return t.to && !t.to.route || t.sync
            })
        }
    }]),
    s
}()
  , Vd = function() {
    function s(e) {
        var t = this;
        this.names = ["beforeLeave", "afterLeave", "beforeEnter", "afterEnter"],
        this.byNamespace = new Map,
        e.length !== 0 && (e.forEach(function(i) {
            t.byNamespace.set(i.namespace, i)
        }),
        this.names.forEach(function(i) {
            Yr[i](t._(i))
        }))
    }
    return s.prototype._ = function(e) {
        var t = this;
        return function(i) {
            var r = e.match(/enter/i) ? i.next : i.current
              , n = t.byNamespace.get(r.namespace);
            return n && n[e] ? Un(n[e], n)(i) : Promise.resolve()
        }
    }
    ,
    s
}();
Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
Element.prototype.closest || (Element.prototype.closest = function(s) {
    var e = this;
    do {
        if (e.matches(s))
            return e;
        e = e.parentElement || e.parentNode
    } while (e !== null && e.nodeType === 1);
    return null
}
);
var Ud = {
    container: null,
    html: "",
    namespace: "",
    url: {
        hash: "",
        href: "",
        path: "",
        port: null,
        query: {}
    }
}
  , fc = new (function() {
    function s() {
        this.version = "2.10.3",
        this.schemaPage = Ud,
        this.Logger = wn,
        this.logger = new wn("@barba/core"),
        this.plugins = [],
        this.timeout = void 0,
        this.cacheIgnore = void 0,
        this.cacheFirstPage = void 0,
        this.prefetchIgnore = void 0,
        this.preventRunning = void 0,
        this.hooks = Yr,
        this.cache = void 0,
        this.headers = void 0,
        this.prevent = void 0,
        this.transitions = void 0,
        this.views = void 0,
        this.dom = _n,
        this.helpers = Ad,
        this.history = ac,
        this.request = Ld,
        this.url = kd,
        this.D = void 0,
        this.B = void 0,
        this.q = void 0,
        this.F = void 0
    }
    var e = s.prototype;
    return e.use = function(t, i) {
        var r = this.plugins;
        r.indexOf(t) > -1 ? this.logger.warn("Plugin [" + t.name + "] already installed.") : typeof t.install == "function" ? (t.install(this, i),
        r.push(t)) : this.logger.warn("Plugin [" + t.name + '] has no "install" method.')
    }
    ,
    e.init = function(t) {
        var i = t === void 0 ? {} : t
          , r = i.transitions
          , n = r === void 0 ? [] : r
          , o = i.views
          , l = o === void 0 ? [] : o
          , c = i.schema
          , f = c === void 0 ? wr : c
          , h = i.requestError
          , w = i.timeout
          , _ = w === void 0 ? 2e3 : w
          , y = i.cacheIgnore
          , g = y !== void 0 && y
          , p = i.cacheFirstPage
          , S = p !== void 0 && p
          , T = i.prefetchIgnore
          , C = T !== void 0 && T
          , E = i.preventRunning
          , P = E !== void 0 && E
          , k = i.prevent
          , R = k === void 0 ? null : k
          , d = i.debug
          , N = i.logLevel;
        if (wn.setLevel((d !== void 0 && d) === !0 ? "debug" : N === void 0 ? "off" : N),
        this.logger.info(this.version),
        Object.keys(f).forEach(function(X) {
            wr[X] && (wr[X] = f[X])
        }),
        this.B = h,
        this.timeout = _,
        this.cacheIgnore = g,
        this.cacheFirstPage = S,
        this.prefetchIgnore = C,
        this.preventRunning = P,
        this.q = this.dom.getWrapper(),
        !this.q)
            throw new Error("[@barba/core] No Barba wrapper found");
        this.I();
        var L = this.data.current;
        if (!L.container)
            throw new Error("[@barba/core] No Barba container found");
        if (this.cache = new Dd(g),
        this.headers = new Id,
        this.prevent = new Yd(C),
        this.transitions = new Gd(n),
        this.views = new Vd(l),
        R !== null) {
            if (typeof R != "function")
                throw new Error("[@barba/core] Prevent should be a function");
            this.prevent.add("preventCustom", R)
        }
        this.history.init(L.url.href, L.namespace),
        S && this.cache.set(L.url.href, Promise.resolve({
            html: L.html,
            url: L.url
        }), "init", "fulfilled"),
        this.U = this.U.bind(this),
        this.$ = this.$.bind(this),
        this.X = this.X.bind(this),
        this.G(),
        this.plugins.forEach(function(X) {
            return X.init()
        });
        var O = this.data;
        O.trigger = "barba",
        O.next = O.current,
        O.current = gr({}, this.schemaPage),
        this.hooks.do("ready", O),
        this.once(O),
        this.I()
    }
    ,
    e.destroy = function() {
        this.I(),
        this.J(),
        this.history.clear(),
        this.hooks.clear(),
        this.plugins = []
    }
    ,
    e.force = function(t) {
        window.location.assign(t)
    }
    ,
    e.go = function(t, i, r) {
        var n;
        if (i === void 0 && (i = "barba"),
        this.F = null,
        this.transitions.isRunning)
            this.force(t);
        else if (!(n = i === "popstate" ? this.history.current && this.url.getPath(this.history.current.url) === this.url.getPath(t) && this.url.getQuery(this.history.current.url, !0) === this.url.getQuery(t, !0) : this.prevent.run("sameUrl", null, null, t)) || this.transitions.hasSelf)
            return i = this.history.change(this.cache.has(t) ? this.cache.get(t).target : t, i, r),
            r && (r.stopPropagation(),
            r.preventDefault()),
            this.page(t, i, r ?? void 0, n)
    }
    ,
    e.once = function(t) {
        try {
            var i = this;
            return Promise.resolve(i.hooks.do("beforeEnter", t)).then(function() {
                function r() {
                    return Promise.resolve(i.hooks.do("afterEnter", t)).then(function() {})
                }
                var n = function() {
                    if (i.transitions.hasOnce) {
                        var o = i.transitions.get(t, {
                            once: !0
                        });
                        return Promise.resolve(i.transitions.doOnce({
                            transition: o,
                            data: t
                        })).then(function() {})
                    }
                }();
                return n && n.then ? n.then(r) : r()
            })
        } catch (r) {
            return Promise.reject(r)
        }
    }
    ,
    e.page = function(t, i, r, n) {
        try {
            var o, l = function() {
                var w = c.data;
                return Promise.resolve(c.hooks.do("page", w)).then(function() {
                    var _ = function(y, g) {
                        try {
                            var p = (S = c.transitions.get(w, {
                                once: !1,
                                self: n
                            }),
                            Promise.resolve(c.transitions.doPage({
                                data: w,
                                page: o,
                                transition: S,
                                wrapper: c.q
                            })).then(function() {
                                c.I()
                            }))
                        } catch {
                            return g()
                        }
                        var S;
                        return p && p.then ? p.then(void 0, g) : p
                    }(0, function() {
                        wn.getLevel() === 0 && c.force(w.next.url.href)
                    });
                    if (_ && _.then)
                        return _.then(function() {})
                })
            }, c = this;
            if (c.data.next.url = gr({
                href: t
            }, c.url.parse(t)),
            c.data.trigger = i,
            c.data.event = r,
            c.cache.has(t))
                o = c.cache.update(t, {
                    action: "click"
                }).request;
            else {
                var f = c.request(t, c.timeout, c.onRequestError.bind(c, i), c.cache, c.headers);
                f.then(function(w) {
                    w.url.href !== t && c.history.add(w.url.href, i, "replace")
                }),
                o = c.cache.set(t, f, "click", "pending").request
            }
            var h = function() {
                if (c.transitions.shouldWait)
                    return Promise.resolve(Na(o, c.data)).then(function() {})
            }();
            return Promise.resolve(h && h.then ? h.then(l) : l())
        } catch (w) {
            return Promise.reject(w)
        }
    }
    ,
    e.onRequestError = function(t) {
        this.transitions.isRunning = !1;
        var i = [].slice.call(arguments, 1)
          , r = i[0]
          , n = i[1]
          , o = this.cache.getAction(r);
        return this.cache.delete(r),
        this.B && this.B(t, o, r, n) === !1 || o === "click" && this.force(r),
        !1
    }
    ,
    e.prefetch = function(t) {
        var i = this;
        t = this.url.getAbsoluteHref(t),
        this.cache.has(t) || this.cache.set(t, this.request(t, this.timeout, this.onRequestError.bind(this, "barba"), this.cache, this.headers).catch(function(r) {
            i.logger.error(r)
        }), "prefetch", "pending")
    }
    ,
    e.G = function() {
        this.prefetchIgnore !== !0 && (document.addEventListener("mouseover", this.U),
        document.addEventListener("touchstart", this.U)),
        document.addEventListener("click", this.$),
        window.addEventListener("popstate", this.X)
    }
    ,
    e.J = function() {
        this.prefetchIgnore !== !0 && (document.removeEventListener("mouseover", this.U),
        document.removeEventListener("touchstart", this.U)),
        document.removeEventListener("click", this.$),
        window.removeEventListener("popstate", this.X)
    }
    ,
    e.U = function(t) {
        var i = this
          , r = this.W(t);
        if (r) {
            var n = this.url.getAbsoluteHref(this.dom.getHref(r));
            this.prevent.checkHref(n) || this.cache.has(n) || this.cache.set(n, this.request(n, this.timeout, this.onRequestError.bind(this, r), this.cache, this.headers).catch(function(o) {
                i.logger.error(o)
            }), "enter", "pending")
        }
    }
    ,
    e.$ = function(t) {
        var i = this.W(t);
        if (i) {
            if (this.transitions.isRunning && this.preventRunning)
                return t.preventDefault(),
                void t.stopPropagation();
            this.F = t,
            this.go(this.dom.getHref(i), i, t)
        }
    }
    ,
    e.X = function(t) {
        this.go(this.url.getHref(), "popstate", t)
    }
    ,
    e.W = function(t) {
        for (var i = t.target; i && !this.dom.getHref(i); )
            i = i.parentNode;
        if (i && !this.prevent.checkLink(i, t, this.dom.getHref(i)))
            return i
    }
    ,
    e.I = function() {
        var t = this.url.getHref()
          , i = {
            container: this.dom.getContainer(),
            html: this.dom.getHtml(),
            namespace: this.dom.getNamespace(),
            url: gr({
                href: t
            }, this.url.parse(t))
        };
        this.D = {
            current: i,
            event: void 0,
            next: gr({}, this.schemaPage),
            trigger: void 0
        },
        this.hooks.do("reset", this.data)
    }
    ,
    Tl(s, [{
        key: "data",
        get: function() {
            return this.D
        }
    }, {
        key: "wrapper",
        get: function() {
            return this.q
        }
    }]),
    s
}());
function Ar(s) {
    if (s === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return s
}
function dc(s, e) {
    s.prototype = Object.create(e.prototype),
    s.prototype.constructor = s,
    s.__proto__ = e
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Fi = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
        lineHeight: ""
    }
}, ss = {
    duration: .5,
    overwrite: !1,
    delay: 0
}, El, Qt, pt, Qi = 1e8, rt = 1 / Qi, Ko = Math.PI * 2, Kd = Ko / 4, Qd = 0, pc = Math.sqrt, Zd = Math.cos, Jd = Math.sin, Xt = function(e) {
    return typeof e == "string"
}, xt = function(e) {
    return typeof e == "function"
}, zr = function(e) {
    return typeof e == "number"
}, Cl = function(e) {
    return typeof e > "u"
}, br = function(e) {
    return typeof e == "object"
}, xi = function(e) {
    return e !== !1
}, Ml = function() {
    return typeof window < "u"
}, pa = function(e) {
    return xt(e) || Xt(e)
}, hc = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {}
, si = Array.isArray, Qo = /(?:-?\.?\d|\.)+/gi, mc = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Kn = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, So = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, gc = /[+-]=-?[.\d]+/, vc = /[^,'"\[\]\s]+/gi, ep = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, vt, pr, Zo, Pl, qi = {}, $a = {}, yc, wc = function(e) {
    return ($a = as(e, qi)) && Ci
}, Al = function(e, t) {
    return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()")
}, Vs = function(e, t) {
    return !t && console.warn(e)
}, _c = function(e, t) {
    return e && (qi[e] = t) && $a && ($a[e] = t) || qi
}, Us = function() {
    return 0
}, tp = {
    suppressEvents: !0,
    isStart: !0,
    kill: !1
}, Ca = {
    suppressEvents: !0,
    kill: !1
}, ip = {
    suppressEvents: !0
}, kl = {}, en = [], Jo = {}, bc, Di = {}, To = {}, vu = 30, Ma = [], Ll = "", Ol = function(e) {
    var t = e[0], i, r;
    if (br(t) || xt(t) || (e = [e]),
    !(i = (t._gsap || {}).harness)) {
        for (r = Ma.length; r-- && !Ma[r].targetTest(t); )
            ;
        i = Ma[r]
    }
    for (r = e.length; r--; )
        e[r] && (e[r]._gsap || (e[r]._gsap = new Yc(e[r],i))) || e.splice(r, 1);
    return e
}, Sn = function(e) {
    return e._gsap || Ol(Zi(e))[0]._gsap
}, xc = function(e, t, i) {
    return (i = e[t]) && xt(i) ? e[t]() : Cl(i) && e.getAttribute && e.getAttribute(t) || i
}, Si = function(e, t) {
    return (e = e.split(",")).forEach(t) || e
}, Tt = function(e) {
    return Math.round(e * 1e5) / 1e5 || 0
}, kt = function(e) {
    return Math.round(e * 1e7) / 1e7 || 0
}, Jn = function(e, t) {
    var i = t.charAt(0)
      , r = parseFloat(t.substr(2));
    return e = parseFloat(e),
    i === "+" ? e + r : i === "-" ? e - r : i === "*" ? e * r : e / r
}, rp = function(e, t) {
    for (var i = t.length, r = 0; e.indexOf(t[r]) < 0 && ++r < i; )
        ;
    return r < i
}, Ha = function() {
    var e = en.length, t = en.slice(0), i, r;
    for (Jo = {},
    en.length = 0,
    i = 0; i < e; i++)
        r = t[i],
        r && r._lazy && (r.render(r._lazy[0], r._lazy[1], !0)._lazy = 0)
}, Dl = function(e) {
    return !!(e._initted || e._startAt || e.add)
}, Sc = function(e, t, i, r) {
    en.length && !Qt && Ha(),
    e.render(t, i, !!(Qt && t < 0 && Dl(e))),
    en.length && !Qt && Ha()
}, Tc = function(e) {
    var t = parseFloat(e);
    return (t || t === 0) && (e + "").match(vc).length < 2 ? t : Xt(e) ? e.trim() : e
}, Ec = function(e) {
    return e
}, Bi = function(e, t) {
    for (var i in t)
        i in e || (e[i] = t[i]);
    return e
}, np = function(e) {
    return function(t, i) {
        for (var r in i)
            r in t || r === "duration" && e || r === "ease" || (t[r] = i[r])
    }
}, as = function(e, t) {
    for (var i in t)
        e[i] = t[i];
    return e
}, yu = function s(e, t) {
    for (var i in t)
        i !== "__proto__" && i !== "constructor" && i !== "prototype" && (e[i] = br(t[i]) ? s(e[i] || (e[i] = {}), t[i]) : t[i]);
    return e
}, Fa = function(e, t) {
    var i = {}, r;
    for (r in e)
        r in t || (i[r] = e[r]);
    return i
}, Ds = function(e) {
    var t = e.parent || vt
      , i = e.keyframes ? np(si(e.keyframes)) : Bi;
    if (xi(e.inherit))
        for (; t; )
            i(e, t.vars.defaults),
            t = t.parent || t._dp;
    return e
}, sp = function(e, t) {
    for (var i = e.length, r = i === t.length; r && i-- && e[i] === t[i]; )
        ;
    return i < 0
}, Cc = function(e, t, i, r, n) {
    var o = e[r], l;
    if (n)
        for (l = t[n]; o && o[n] > l; )
            o = o._prev;
    return o ? (t._next = o._next,
    o._next = t) : (t._next = e[i],
    e[i] = t),
    t._next ? t._next._prev = t : e[r] = t,
    t._prev = o,
    t.parent = t._dp = e,
    t
}, Ja = function(e, t, i, r) {
    i === void 0 && (i = "_first"),
    r === void 0 && (r = "_last");
    var n = t._prev
      , o = t._next;
    n ? n._next = o : e[i] === t && (e[i] = o),
    o ? o._prev = n : e[r] === t && (e[r] = n),
    t._next = t._prev = t.parent = null
}, nn = function(e, t) {
    e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e),
    e._act = 0
}, Tn = function(e, t) {
    if (e && (!t || t._end > e._dur || t._start < 0))
        for (var i = e; i; )
            i._dirty = 1,
            i = i.parent;
    return e
}, ap = function(e) {
    for (var t = e.parent; t && t.parent; )
        t._dirty = 1,
        t.totalDuration(),
        t = t.parent;
    return e
}, el = function(e, t, i, r) {
    return e._startAt && (Qt ? e._startAt.revert(Ca) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, r))
}, op = function s(e) {
    return !e || e._ts && s(e.parent)
}, wu = function(e) {
    return e._repeat ? os(e._tTime, e = e.duration() + e._rDelay) * e : 0
}, os = function(e, t) {
    var i = Math.floor(e = kt(e / t));
    return e && i === e ? i - 1 : i
}, qa = function(e, t) {
    return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
}, eo = function(e) {
    return e._end = kt(e._start + (e._tDur / Math.abs(e._ts || e._rts || rt) || 0))
}, to = function(e, t) {
    var i = e._dp;
    return i && i.smoothChildTiming && e._ts && (e._start = kt(i._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)),
    eo(e),
    i._dirty || Tn(i, e)),
    e
}, Mc = function(e, t) {
    var i;
    if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (i = qa(e.rawTime(), t),
    (!t._dur || na(0, t.totalDuration(), i) - t._tTime > rt) && t.render(i, !0)),
    Tn(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
        if (e._dur < e.duration())
            for (i = e; i._dp; )
                i.rawTime() >= 0 && i.totalTime(i._tTime),
                i = i._dp;
        e._zTime = -rt
    }
}, mr = function(e, t, i, r) {
    return t.parent && nn(t),
    t._start = kt((zr(i) ? i : i || e !== vt ? Gi(e, i, t) : e._time) + t._delay),
    t._end = kt(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)),
    Cc(e, t, "_first", "_last", e._sort ? "_start" : 0),
    tl(t) || (e._recent = t),
    r || Mc(e, t),
    e._ts < 0 && to(e, e._tTime),
    e
}, Pc = function(e, t) {
    return (qi.ScrollTrigger || Al("scrollTrigger", t)) && qi.ScrollTrigger.create(t, e)
}, Ac = function(e, t, i, r, n) {
    if (zl(e, t, n),
    !e._initted)
        return 1;
    if (!i && e._pt && !Qt && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && bc !== Ri.frame)
        return en.push(e),
        e._lazy = [n, r],
        1
}, lp = function s(e) {
    var t = e.parent;
    return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || s(t))
}, tl = function(e) {
    var t = e.data;
    return t === "isFromStart" || t === "isStart"
}, up = function(e, t, i, r) {
    var n = e.ratio, o = t < 0 || !t && (!e._start && lp(e) && !(!e._initted && tl(e)) || (e._ts < 0 || e._dp._ts < 0) && !tl(e)) ? 0 : 1, l = e._rDelay, c = 0, f, h, w;
    if (l && e._repeat && (c = na(0, e._tDur, t),
    h = os(c, l),
    e._yoyo && h & 1 && (o = 1 - o),
    h !== os(e._tTime, l) && (n = 1 - o,
    e.vars.repeatRefresh && e._initted && e.invalidate())),
    o !== n || Qt || r || e._zTime === rt || !t && e._zTime) {
        if (!e._initted && Ac(e, t, r, i, c))
            return;
        for (w = e._zTime,
        e._zTime = t || (i ? rt : 0),
        i || (i = t && !w),
        e.ratio = o,
        e._from && (o = 1 - o),
        e._time = 0,
        e._tTime = c,
        f = e._pt; f; )
            f.r(o, f.d),
            f = f._next;
        t < 0 && el(e, t, i, !0),
        e._onUpdate && !i && $i(e, "onUpdate"),
        c && e._repeat && !i && e.parent && $i(e, "onRepeat"),
        (t >= e._tDur || t < 0) && e.ratio === o && (o && nn(e, 1),
        !i && !Qt && ($i(e, o ? "onComplete" : "onReverseComplete", !0),
        e._prom && e._prom()))
    } else
        e._zTime || (e._zTime = t)
}, cp = function(e, t, i) {
    var r;
    if (i > t)
        for (r = e._first; r && r._start <= i; ) {
            if (r.data === "isPause" && r._start > t)
                return r;
            r = r._next
        }
    else
        for (r = e._last; r && r._start >= i; ) {
            if (r.data === "isPause" && r._start < t)
                return r;
            r = r._prev
        }
}, ls = function(e, t, i, r) {
    var n = e._repeat
      , o = kt(t) || 0
      , l = e._tTime / e._tDur;
    return l && !r && (e._time *= o / e._dur),
    e._dur = o,
    e._tDur = n ? n < 0 ? 1e10 : kt(o * (n + 1) + e._rDelay * n) : o,
    l > 0 && !r && to(e, e._tTime = e._tDur * l),
    e.parent && eo(e),
    i || Tn(e.parent, e),
    e
}, _u = function(e) {
    return e instanceof pi ? Tn(e) : ls(e, e._dur)
}, fp = {
    _start: 0,
    endTime: Us,
    totalDuration: Us
}, Gi = function s(e, t, i) {
    var r = e.labels, n = e._recent || fp, o = e.duration() >= Qi ? n.endTime(!1) : e._dur, l, c, f;
    return Xt(t) && (isNaN(t) || t in r) ? (c = t.charAt(0),
    f = t.substr(-1) === "%",
    l = t.indexOf("="),
    c === "<" || c === ">" ? (l >= 0 && (t = t.replace(/=/, "")),
    (c === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (f ? (l < 0 ? n : i).totalDuration() / 100 : 1)) : l < 0 ? (t in r || (r[t] = o),
    r[t]) : (c = parseFloat(t.charAt(l - 1) + t.substr(l + 1)),
    f && i && (c = c / 100 * (si(i) ? i[0] : i).totalDuration()),
    l > 1 ? s(e, t.substr(0, l - 1), i) + c : o + c)) : t == null ? o : +t
}, Is = function(e, t, i) {
    var r = zr(t[1]), n = (r ? 2 : 1) + (e < 2 ? 0 : 1), o = t[n], l, c;
    if (r && (o.duration = t[1]),
    o.parent = i,
    e) {
        for (l = o,
        c = i; c && !("immediateRender"in l); )
            l = c.vars.defaults || {},
            c = xi(c.vars.inherit) && c.parent;
        o.immediateRender = xi(l.immediateRender),
        e < 2 ? o.runBackwards = 1 : o.startAt = t[n - 1]
    }
    return new At(t[0],o,t[n + 1])
}, on = function(e, t) {
    return e || e === 0 ? t(e) : t
}, na = function(e, t, i) {
    return i < e ? e : i > t ? t : i
}, ri = function(e, t) {
    return !Xt(e) || !(t = ep.exec(e)) ? "" : t[1]
}, dp = function(e, t, i) {
    return on(i, function(r) {
        return na(e, t, r)
    })
}, il = [].slice, kc = function(e, t) {
    return e && br(e) && "length"in e && (!t && !e.length || e.length - 1 in e && br(e[0])) && !e.nodeType && e !== pr
}, pp = function(e, t, i) {
    return i === void 0 && (i = []),
    e.forEach(function(r) {
        var n;
        return Xt(r) && !t || kc(r, 1) ? (n = i).push.apply(n, Zi(r)) : i.push(r)
    }) || i
}, Zi = function(e, t, i) {
    return pt && !t && pt.selector ? pt.selector(e) : Xt(e) && !i && (Zo || !us()) ? il.call((t || Pl).querySelectorAll(e), 0) : si(e) ? pp(e, i) : kc(e) ? il.call(e, 0) : e ? [e] : []
}, rl = function(e) {
    return e = Zi(e)[0] || Vs("Invalid scope") || {},
    function(t) {
        var i = e.current || e.nativeElement || e;
        return Zi(t, i.querySelectorAll ? i : i === e ? Vs("Invalid scope") || Pl.createElement("div") : e)
    }
}, Lc = function(e) {
    return e.sort(function() {
        return .5 - Math.random()
    })
}, Oc = function(e) {
    if (xt(e))
        return e;
    var t = br(e) ? e : {
        each: e
    }
      , i = En(t.ease)
      , r = t.from || 0
      , n = parseFloat(t.base) || 0
      , o = {}
      , l = r > 0 && r < 1
      , c = isNaN(r) || l
      , f = t.axis
      , h = r
      , w = r;
    return Xt(r) ? h = w = {
        center: .5,
        edges: .5,
        end: 1
    }[r] || 0 : !l && c && (h = r[0],
    w = r[1]),
    function(_, y, g) {
        var p = (g || t).length, S = o[p], T, C, E, P, k, R, d, N, L;
        if (!S) {
            if (L = t.grid === "auto" ? 0 : (t.grid || [1, Qi])[1],
            !L) {
                for (d = -Qi; d < (d = g[L++].getBoundingClientRect().left) && L < p; )
                    ;
                L < p && L--
            }
            for (S = o[p] = [],
            T = c ? Math.min(L, p) * h - .5 : r % L,
            C = L === Qi ? 0 : c ? p * w / L - .5 : r / L | 0,
            d = 0,
            N = Qi,
            R = 0; R < p; R++)
                E = R % L - T,
                P = C - (R / L | 0),
                S[R] = k = f ? Math.abs(f === "y" ? P : E) : pc(E * E + P * P),
                k > d && (d = k),
                k < N && (N = k);
            r === "random" && Lc(S),
            S.max = d - N,
            S.min = N,
            S.v = p = (parseFloat(t.amount) || parseFloat(t.each) * (L > p ? p - 1 : f ? f === "y" ? p / L : L : Math.max(L, p / L)) || 0) * (r === "edges" ? -1 : 1),
            S.b = p < 0 ? n - p : n,
            S.u = ri(t.amount || t.each) || 0,
            i = i && p < 0 ? Bc(i) : i
        }
        return p = (S[_] - S.min) / S.max || 0,
        kt(S.b + (i ? i(p) : p) * S.v) + S.u
    }
}, nl = function(e) {
    var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
    return function(i) {
        var r = kt(Math.round(parseFloat(i) / e) * e * t);
        return (r - r % 1) / t + (zr(i) ? 0 : ri(i))
    }
}, Dc = function(e, t) {
    var i = si(e), r, n;
    return !i && br(e) && (r = i = e.radius || Qi,
    e.values ? (e = Zi(e.values),
    (n = !zr(e[0])) && (r *= r)) : e = nl(e.increment)),
    on(t, i ? xt(e) ? function(o) {
        return n = e(o),
        Math.abs(n - o) <= r ? n : o
    }
    : function(o) {
        for (var l = parseFloat(n ? o.x : o), c = parseFloat(n ? o.y : 0), f = Qi, h = 0, w = e.length, _, y; w--; )
            n ? (_ = e[w].x - l,
            y = e[w].y - c,
            _ = _ * _ + y * y) : _ = Math.abs(e[w] - l),
            _ < f && (f = _,
            h = w);
        return h = !r || f <= r ? e[h] : o,
        n || h === o || zr(o) ? h : h + ri(o)
    }
    : nl(e))
}, Ic = function(e, t, i, r) {
    return on(si(e) ? !t : i === !0 ? !!(i = 0) : !r, function() {
        return si(e) ? e[~~(Math.random() * e.length)] : (i = i || 1e-5) && (r = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((e - i / 2 + Math.random() * (t - e + i * .99)) / i) * i * r) / r
    })
}, hp = function() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
        t[i] = arguments[i];
    return function(r) {
        return t.reduce(function(n, o) {
            return o(n)
        }, r)
    }
}, mp = function(e, t) {
    return function(i) {
        return e(parseFloat(i)) + (t || ri(i))
    }
}, gp = function(e, t, i) {
    return Rc(e, t, 0, 1, i)
}, zc = function(e, t, i) {
    return on(i, function(r) {
        return e[~~t(r)]
    })
}, vp = function s(e, t, i) {
    var r = t - e;
    return si(e) ? zc(e, s(0, e.length), t) : on(i, function(n) {
        return (r + (n - e) % r) % r + e
    })
}, yp = function s(e, t, i) {
    var r = t - e
      , n = r * 2;
    return si(e) ? zc(e, s(0, e.length - 1), t) : on(i, function(o) {
        return o = (n + (o - e) % n) % n || 0,
        e + (o > r ? n - o : o)
    })
}, Ks = function(e) {
    for (var t = 0, i = "", r, n, o, l; ~(r = e.indexOf("random(", t)); )
        o = e.indexOf(")", r),
        l = e.charAt(r + 7) === "[",
        n = e.substr(r + 7, o - r - 7).match(l ? vc : Qo),
        i += e.substr(t, r - t) + Ic(l ? n : +n[0], l ? 0 : +n[1], +n[2] || 1e-5),
        t = o + 1;
    return i + e.substr(t, e.length - t)
}, Rc = function(e, t, i, r, n) {
    var o = t - e
      , l = r - i;
    return on(n, function(c) {
        return i + ((c - e) / o * l || 0)
    })
}, wp = function s(e, t, i, r) {
    var n = isNaN(e + t) ? 0 : function(y) {
        return (1 - y) * e + y * t
    }
    ;
    if (!n) {
        var o = Xt(e), l = {}, c, f, h, w, _;
        if (i === !0 && (r = 1) && (i = null),
        o)
            e = {
                p: e
            },
            t = {
                p: t
            };
        else if (si(e) && !si(t)) {
            for (h = [],
            w = e.length,
            _ = w - 2,
            f = 1; f < w; f++)
                h.push(s(e[f - 1], e[f]));
            w--,
            n = function(g) {
                g *= w;
                var p = Math.min(_, ~~g);
                return h[p](g - p)
            }
            ,
            i = t
        } else
            r || (e = as(si(e) ? [] : {}, e));
        if (!h) {
            for (c in t)
                Il.call(l, e, c, "get", t[c]);
            n = function(g) {
                return $l(g, l) || (o ? e.p : e)
            }
        }
    }
    return on(i, n)
}, bu = function(e, t, i) {
    var r = e.labels, n = Qi, o, l, c;
    for (o in r)
        l = r[o] - t,
        l < 0 == !!i && l && n > (l = Math.abs(l)) && (c = o,
        n = l);
    return c
}, $i = function(e, t, i) {
    var r = e.vars, n = r[t], o = pt, l = e._ctx, c, f, h;
    if (n)
        return c = r[t + "Params"],
        f = r.callbackScope || e,
        i && en.length && Ha(),
        l && (pt = l),
        h = c ? n.apply(f, c) : n.call(f),
        pt = o,
        h
}, Ts = function(e) {
    return nn(e),
    e.scrollTrigger && e.scrollTrigger.kill(!!Qt),
    e.progress() < 1 && $i(e, "onInterrupt"),
    e
}, Qn, Nc = [], $c = function(e) {
    if (e)
        if (e = !e.name && e.default || e,
        Ml() || e.headless) {
            var t = e.name
              , i = xt(e)
              , r = t && !i && e.init ? function() {
                this._props = []
            }
            : e
              , n = {
                init: Us,
                render: $l,
                add: Il,
                kill: zp,
                modifier: Ip,
                rawVars: 0
            }
              , o = {
                targetTest: 0,
                get: 0,
                getSetter: Nl,
                aliases: {},
                register: 0
            };
            if (us(),
            e !== r) {
                if (Di[t])
                    return;
                Bi(r, Bi(Fa(e, n), o)),
                as(r.prototype, as(n, Fa(e, o))),
                Di[r.prop = t] = r,
                e.targetTest && (Ma.push(r),
                kl[t] = 1),
                t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin"
            }
            _c(t, r),
            e.register && e.register(Ci, r, Ti)
        } else
            Nc.push(e)
}, it = 255, Es = {
    aqua: [0, it, it],
    lime: [0, it, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, it],
    navy: [0, 0, 128],
    white: [it, it, it],
    olive: [128, 128, 0],
    yellow: [it, it, 0],
    orange: [it, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [it, 0, 0],
    pink: [it, 192, 203],
    cyan: [0, it, it],
    transparent: [it, it, it, 0]
}, Eo = function(e, t, i) {
    return e += e < 0 ? 1 : e > 1 ? -1 : 0,
    (e * 6 < 1 ? t + (i - t) * e * 6 : e < .5 ? i : e * 3 < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) * it + .5 | 0
}, Hc = function(e, t, i) {
    var r = e ? zr(e) ? [e >> 16, e >> 8 & it, e & it] : 0 : Es.black, n, o, l, c, f, h, w, _, y, g;
    if (!r) {
        if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)),
        Es[e])
            r = Es[e];
        else if (e.charAt(0) === "#") {
            if (e.length < 6 && (n = e.charAt(1),
            o = e.charAt(2),
            l = e.charAt(3),
            e = "#" + n + n + o + o + l + l + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")),
            e.length === 9)
                return r = parseInt(e.substr(1, 6), 16),
                [r >> 16, r >> 8 & it, r & it, parseInt(e.substr(7), 16) / 255];
            e = parseInt(e.substr(1), 16),
            r = [e >> 16, e >> 8 & it, e & it]
        } else if (e.substr(0, 3) === "hsl") {
            if (r = g = e.match(Qo),
            !t)
                c = +r[0] % 360 / 360,
                f = +r[1] / 100,
                h = +r[2] / 100,
                o = h <= .5 ? h * (f + 1) : h + f - h * f,
                n = h * 2 - o,
                r.length > 3 && (r[3] *= 1),
                r[0] = Eo(c + 1 / 3, n, o),
                r[1] = Eo(c, n, o),
                r[2] = Eo(c - 1 / 3, n, o);
            else if (~e.indexOf("="))
                return r = e.match(mc),
                i && r.length < 4 && (r[3] = 1),
                r
        } else
            r = e.match(Qo) || Es.transparent;
        r = r.map(Number)
    }
    return t && !g && (n = r[0] / it,
    o = r[1] / it,
    l = r[2] / it,
    w = Math.max(n, o, l),
    _ = Math.min(n, o, l),
    h = (w + _) / 2,
    w === _ ? c = f = 0 : (y = w - _,
    f = h > .5 ? y / (2 - w - _) : y / (w + _),
    c = w === n ? (o - l) / y + (o < l ? 6 : 0) : w === o ? (l - n) / y + 2 : (n - o) / y + 4,
    c *= 60),
    r[0] = ~~(c + .5),
    r[1] = ~~(f * 100 + .5),
    r[2] = ~~(h * 100 + .5)),
    i && r.length < 4 && (r[3] = 1),
    r
}, Fc = function(e) {
    var t = []
      , i = []
      , r = -1;
    return e.split(tn).forEach(function(n) {
        var o = n.match(Kn) || [];
        t.push.apply(t, o),
        i.push(r += o.length + 1)
    }),
    t.c = i,
    t
}, xu = function(e, t, i) {
    var r = "", n = (e + r).match(tn), o = t ? "hsla(" : "rgba(", l = 0, c, f, h, w;
    if (!n)
        return e;
    if (n = n.map(function(_) {
        return (_ = Hc(_, t, 1)) && o + (t ? _[0] + "," + _[1] + "%," + _[2] + "%," + _[3] : _.join(",")) + ")"
    }),
    i && (h = Fc(e),
    c = i.c,
    c.join(r) !== h.c.join(r)))
        for (f = e.replace(tn, "1").split(Kn),
        w = f.length - 1; l < w; l++)
            r += f[l] + (~c.indexOf(l) ? n.shift() || o + "0,0,0,0)" : (h.length ? h : n.length ? n : i).shift());
    if (!f)
        for (f = e.split(tn),
        w = f.length - 1; l < w; l++)
            r += f[l] + n[l];
    return r + f[w]
}, tn = function() {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
    for (e in Es)
        s += "|" + e + "\\b";
    return new RegExp(s + ")","gi")
}(), _p = /hsl[a]?\(/, qc = function(e) {
    var t = e.join(" "), i;
    if (tn.lastIndex = 0,
    tn.test(t))
        return i = _p.test(t),
        e[1] = xu(e[1], i),
        e[0] = xu(e[0], i, Fc(e[1])),
        !0
}, Qs, Ri = function() {
    var s = Date.now, e = 500, t = 33, i = s(), r = i, n = 1e3 / 240, o = n, l = [], c, f, h, w, _, y, g = function p(S) {
        var T = s() - r, C = S === !0, E, P, k, R;
        if ((T > e || T < 0) && (i += T - t),
        r += T,
        k = r - i,
        E = k - o,
        (E > 0 || C) && (R = ++w.frame,
        _ = k - w.time * 1e3,
        w.time = k = k / 1e3,
        o += E + (E >= n ? 4 : n - E),
        P = 1),
        C || (c = f(p)),
        P)
            for (y = 0; y < l.length; y++)
                l[y](k, _, R, S)
    };
    return w = {
        time: 0,
        frame: 0,
        tick: function() {
            g(!0)
        },
        deltaRatio: function(S) {
            return _ / (1e3 / (S || 60))
        },
        wake: function() {
            yc && (!Zo && Ml() && (pr = Zo = window,
            Pl = pr.document || {},
            qi.gsap = Ci,
            (pr.gsapVersions || (pr.gsapVersions = [])).push(Ci.version),
            wc($a || pr.GreenSockGlobals || !pr.gsap && pr || {}),
            Nc.forEach($c)),
            h = typeof requestAnimationFrame < "u" && requestAnimationFrame,
            c && w.sleep(),
            f = h || function(S) {
                return setTimeout(S, o - w.time * 1e3 + 1 | 0)
            }
            ,
            Qs = 1,
            g(2))
        },
        sleep: function() {
            (h ? cancelAnimationFrame : clearTimeout)(c),
            Qs = 0,
            f = Us
        },
        lagSmoothing: function(S, T) {
            e = S || 1 / 0,
            t = Math.min(T || 33, e)
        },
        fps: function(S) {
            n = 1e3 / (S || 240),
            o = w.time * 1e3 + n
        },
        add: function(S, T, C) {
            var E = T ? function(P, k, R, d) {
                S(P, k, R, d),
                w.remove(E)
            }
            : S;
            return w.remove(S),
            l[C ? "unshift" : "push"](E),
            us(),
            E
        },
        remove: function(S, T) {
            ~(T = l.indexOf(S)) && l.splice(T, 1) && y >= T && y--
        },
        _listeners: l
    },
    w
}(), us = function() {
    return !Qs && Ri.wake()
}, He = {}, bp = /^[\d.\-M][\d.\-,\s]/, xp = /["']/g, Sp = function(e) {
    for (var t = {}, i = e.substr(1, e.length - 3).split(":"), r = i[0], n = 1, o = i.length, l, c, f; n < o; n++)
        c = i[n],
        l = n !== o - 1 ? c.lastIndexOf(",") : c.length,
        f = c.substr(0, l),
        t[r] = isNaN(f) ? f.replace(xp, "").trim() : +f,
        r = c.substr(l + 1).trim();
    return t
}, Tp = function(e) {
    var t = e.indexOf("(") + 1
      , i = e.indexOf(")")
      , r = e.indexOf("(", t);
    return e.substring(t, ~r && r < i ? e.indexOf(")", i + 1) : i)
}, Ep = function(e) {
    var t = (e + "").split("(")
      , i = He[t[0]];
    return i && t.length > 1 && i.config ? i.config.apply(null, ~e.indexOf("{") ? [Sp(t[1])] : Tp(e).split(",").map(Tc)) : He._CE && bp.test(e) ? He._CE("", e) : i
}, Bc = function(e) {
    return function(t) {
        return 1 - e(1 - t)
    }
}, jc = function s(e, t) {
    for (var i = e._first, r; i; )
        i instanceof pi ? s(i, t) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== t && (i.timeline ? s(i.timeline, t) : (r = i._ease,
        i._ease = i._yEase,
        i._yEase = r,
        i._yoyo = t)),
        i = i._next
}, En = function(e, t) {
    return e && (xt(e) ? e : He[e] || Ep(e)) || t
}, Rn = function(e, t, i, r) {
    i === void 0 && (i = function(c) {
        return 1 - t(1 - c)
    }
    ),
    r === void 0 && (r = function(c) {
        return c < .5 ? t(c * 2) / 2 : 1 - t((1 - c) * 2) / 2
    }
    );
    var n = {
        easeIn: t,
        easeOut: i,
        easeInOut: r
    }, o;
    return Si(e, function(l) {
        He[l] = qi[l] = n,
        He[o = l.toLowerCase()] = i;
        for (var c in n)
            He[o + (c === "easeIn" ? ".in" : c === "easeOut" ? ".out" : ".inOut")] = He[l + "." + c] = n[c]
    }),
    n
}, Xc = function(e) {
    return function(t) {
        return t < .5 ? (1 - e(1 - t * 2)) / 2 : .5 + e((t - .5) * 2) / 2
    }
}, Co = function s(e, t, i) {
    var r = t >= 1 ? t : 1
      , n = (i || (e ? .3 : .45)) / (t < 1 ? t : 1)
      , o = n / Ko * (Math.asin(1 / r) || 0)
      , l = function(h) {
        return h === 1 ? 1 : r * Math.pow(2, -10 * h) * Jd((h - o) * n) + 1
    }
      , c = e === "out" ? l : e === "in" ? function(f) {
        return 1 - l(1 - f)
    }
    : Xc(l);
    return n = Ko / n,
    c.config = function(f, h) {
        return s(e, f, h)
    }
    ,
    c
}, Mo = function s(e, t) {
    t === void 0 && (t = 1.70158);
    var i = function(o) {
        return o ? --o * o * ((t + 1) * o + t) + 1 : 0
    }
      , r = e === "out" ? i : e === "in" ? function(n) {
        return 1 - i(1 - n)
    }
    : Xc(i);
    return r.config = function(n) {
        return s(e, n)
    }
    ,
    r
};
Si("Linear,Quad,Cubic,Quart,Quint,Strong", function(s, e) {
    var t = e < 5 ? e + 1 : e;
    Rn(s + ",Power" + (t - 1), e ? function(i) {
        return Math.pow(i, t)
    }
    : function(i) {
        return i
    }
    , function(i) {
        return 1 - Math.pow(1 - i, t)
    }, function(i) {
        return i < .5 ? Math.pow(i * 2, t) / 2 : 1 - Math.pow((1 - i) * 2, t) / 2
    })
});
He.Linear.easeNone = He.none = He.Linear.easeIn;
Rn("Elastic", Co("in"), Co("out"), Co());
(function(s, e) {
    var t = 1 / e
      , i = 2 * t
      , r = 2.5 * t
      , n = function(l) {
        return l < t ? s * l * l : l < i ? s * Math.pow(l - 1.5 / e, 2) + .75 : l < r ? s * (l -= 2.25 / e) * l + .9375 : s * Math.pow(l - 2.625 / e, 2) + .984375
    };
    Rn("Bounce", function(o) {
        return 1 - n(1 - o)
    }, n)
}
)(7.5625, 2.75);
Rn("Expo", function(s) {
    return Math.pow(2, 10 * (s - 1)) * s + s * s * s * s * s * s * (1 - s)
});
Rn("Circ", function(s) {
    return -(pc(1 - s * s) - 1)
});
Rn("Sine", function(s) {
    return s === 1 ? 1 : -Zd(s * Kd) + 1
});
Rn("Back", Mo("in"), Mo("out"), Mo());
He.SteppedEase = He.steps = qi.SteppedEase = {
    config: function(e, t) {
        e === void 0 && (e = 1);
        var i = 1 / e
          , r = e + (t ? 0 : 1)
          , n = t ? 1 : 0
          , o = 1 - rt;
        return function(l) {
            return ((r * na(0, o, l) | 0) + n) * i
        }
    }
};
ss.ease = He["quad.out"];
Si("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(s) {
    return Ll += s + "," + s + "Params,"
});
var Yc = function(e, t) {
    this.id = Qd++,
    e._gsap = this,
    this.target = e,
    this.harness = t,
    this.get = t ? t.get : xc,
    this.set = t ? t.getSetter : Nl
}
  , Zs = function() {
    function s(t) {
        this.vars = t,
        this._delay = +t.delay || 0,
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0,
        this._yoyo = !!t.yoyo || !!t.yoyoEase),
        this._ts = 1,
        ls(this, +t.duration, 1, 1),
        this.data = t.data,
        pt && (this._ctx = pt,
        pt.data.push(this)),
        Qs || Ri.wake()
    }
    var e = s.prototype;
    return e.delay = function(i) {
        return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay),
        this._delay = i,
        this) : this._delay
    }
    ,
    e.duration = function(i) {
        return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur
    }
    ,
    e.totalDuration = function(i) {
        return arguments.length ? (this._dirty = 0,
        ls(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
    }
    ,
    e.totalTime = function(i, r) {
        if (us(),
        !arguments.length)
            return this._tTime;
        var n = this._dp;
        if (n && n.smoothChildTiming && this._ts) {
            for (to(this, i),
            !n._dp || n.parent || Mc(n, this); n && n.parent; )
                n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0),
                n = n.parent;
            !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && mr(this._dp, this, this._start - this._delay)
        }
        return (this._tTime !== i || !this._dur && !r || this._initted && Math.abs(this._zTime) === rt || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i),
        Sc(this, i, r)),
        this
    }
    ,
    e.time = function(i, r) {
        return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + wu(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), r) : this._time
    }
    ,
    e.totalProgress = function(i, r) {
        return arguments.length ? this.totalTime(this.totalDuration() * i, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0
    }
    ,
    e.progress = function(i, r) {
        return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + wu(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0
    }
    ,
    e.iteration = function(i, r) {
        var n = this.duration() + this._rDelay;
        return arguments.length ? this.totalTime(this._time + (i - 1) * n, r) : this._repeat ? os(this._tTime, n) + 1 : 1
    }
    ,
    e.timeScale = function(i, r) {
        if (!arguments.length)
            return this._rts === -rt ? 0 : this._rts;
        if (this._rts === i)
            return this;
        var n = this.parent && this._ts ? qa(this.parent._time, this) : this._tTime;
        return this._rts = +i || 0,
        this._ts = this._ps || i === -rt ? 0 : this._rts,
        this.totalTime(na(-Math.abs(this._delay), this.totalDuration(), n), r !== !1),
        eo(this),
        ap(this)
    }
    ,
    e.paused = function(i) {
        return arguments.length ? (this._ps !== i && (this._ps = i,
        i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()),
        this._ts = this._act = 0) : (us(),
        this._ts = this._rts,
        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== rt && (this._tTime -= rt)))),
        this) : this._ps
    }
    ,
    e.startTime = function(i) {
        if (arguments.length) {
            this._start = i;
            var r = this.parent || this._dp;
            return r && (r._sort || !this.parent) && mr(r, this, i - this._delay),
            this
        }
        return this._start
    }
    ,
    e.endTime = function(i) {
        return this._start + (xi(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
    }
    ,
    e.rawTime = function(i) {
        var r = this.parent || this._dp;
        return r ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? qa(r.rawTime(i), this) : this._tTime : this._tTime
    }
    ,
    e.revert = function(i) {
        i === void 0 && (i = ip);
        var r = Qt;
        return Qt = i,
        Dl(this) && (this.timeline && this.timeline.revert(i),
        this.totalTime(-.01, i.suppressEvents)),
        this.data !== "nested" && i.kill !== !1 && this.kill(),
        Qt = r,
        this
    }
    ,
    e.globalTime = function(i) {
        for (var r = this, n = arguments.length ? i : r.rawTime(); r; )
            n = r._start + n / (Math.abs(r._ts) || 1),
            r = r._dp;
        return !this.parent && this._sat ? this._sat.globalTime(i) : n
    }
    ,
    e.repeat = function(i) {
        return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i,
        _u(this)) : this._repeat === -2 ? 1 / 0 : this._repeat
    }
    ,
    e.repeatDelay = function(i) {
        if (arguments.length) {
            var r = this._time;
            return this._rDelay = i,
            _u(this),
            r ? this.time(r) : this
        }
        return this._rDelay
    }
    ,
    e.yoyo = function(i) {
        return arguments.length ? (this._yoyo = i,
        this) : this._yoyo
    }
    ,
    e.seek = function(i, r) {
        return this.totalTime(Gi(this, i), xi(r))
    }
    ,
    e.restart = function(i, r) {
        return this.play().totalTime(i ? -this._delay : 0, xi(r)),
        this._dur || (this._zTime = -rt),
        this
    }
    ,
    e.play = function(i, r) {
        return i != null && this.seek(i, r),
        this.reversed(!1).paused(!1)
    }
    ,
    e.reverse = function(i, r) {
        return i != null && this.seek(i || this.totalDuration(), r),
        this.reversed(!0).paused(!1)
    }
    ,
    e.pause = function(i, r) {
        return i != null && this.seek(i, r),
        this.paused(!0)
    }
    ,
    e.resume = function() {
        return this.paused(!1)
    }
    ,
    e.reversed = function(i) {
        return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -rt : 0)),
        this) : this._rts < 0
    }
    ,
    e.invalidate = function() {
        return this._initted = this._act = 0,
        this._zTime = -rt,
        this
    }
    ,
    e.isActive = function() {
        var i = this.parent || this._dp, r = this._start, n;
        return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= r && n < this.endTime(!0) - rt)
    }
    ,
    e.eventCallback = function(i, r, n) {
        var o = this.vars;
        return arguments.length > 1 ? (r ? (o[i] = r,
        n && (o[i + "Params"] = n),
        i === "onUpdate" && (this._onUpdate = r)) : delete o[i],
        this) : o[i]
    }
    ,
    e.then = function(i) {
        var r = this;
        return new Promise(function(n) {
            var o = xt(i) ? i : Ec
              , l = function() {
                var f = r.then;
                r.then = null,
                xt(o) && (o = o(r)) && (o.then || o === r) && (r.then = f),
                n(o),
                r.then = f
            };
            r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? l() : r._prom = l
        }
        )
    }
    ,
    e.kill = function() {
        Ts(this)
    }
    ,
    s
}();
Bi(Zs.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -rt,
    _prom: 0,
    _ps: !1,
    _rts: 1
});
var pi = function(s) {
    dc(e, s);
    function e(i, r) {
        var n;
        return i === void 0 && (i = {}),
        n = s.call(this, i) || this,
        n.labels = {},
        n.smoothChildTiming = !!i.smoothChildTiming,
        n.autoRemoveChildren = !!i.autoRemoveChildren,
        n._sort = xi(i.sortChildren),
        vt && mr(i.parent || vt, Ar(n), r),
        i.reversed && n.reverse(),
        i.paused && n.paused(!0),
        i.scrollTrigger && Pc(Ar(n), i.scrollTrigger),
        n
    }
    var t = e.prototype;
    return t.to = function(r, n, o) {
        return Is(0, arguments, this),
        this
    }
    ,
    t.from = function(r, n, o) {
        return Is(1, arguments, this),
        this
    }
    ,
    t.fromTo = function(r, n, o, l) {
        return Is(2, arguments, this),
        this
    }
    ,
    t.set = function(r, n, o) {
        return n.duration = 0,
        n.parent = this,
        Ds(n).repeatDelay || (n.repeat = 0),
        n.immediateRender = !!n.immediateRender,
        new At(r,n,Gi(this, o),1),
        this
    }
    ,
    t.call = function(r, n, o) {
        return mr(this, At.delayedCall(0, r, n), o)
    }
    ,
    t.staggerTo = function(r, n, o, l, c, f, h) {
        return o.duration = n,
        o.stagger = o.stagger || l,
        o.onComplete = f,
        o.onCompleteParams = h,
        o.parent = this,
        new At(r,o,Gi(this, c)),
        this
    }
    ,
    t.staggerFrom = function(r, n, o, l, c, f, h) {
        return o.runBackwards = 1,
        Ds(o).immediateRender = xi(o.immediateRender),
        this.staggerTo(r, n, o, l, c, f, h)
    }
    ,
    t.staggerFromTo = function(r, n, o, l, c, f, h, w) {
        return l.startAt = o,
        Ds(l).immediateRender = xi(l.immediateRender),
        this.staggerTo(r, n, l, c, f, h, w)
    }
    ,
    t.render = function(r, n, o) {
        var l = this._time, c = this._dirty ? this.totalDuration() : this._tDur, f = this._dur, h = r <= 0 ? 0 : kt(r), w = this._zTime < 0 != r < 0 && (this._initted || !f), _, y, g, p, S, T, C, E, P, k, R, d;
        if (this !== vt && h > c && r >= 0 && (h = c),
        h !== this._tTime || o || w) {
            if (l !== this._time && f && (h += this._time - l,
            r += this._time - l),
            _ = h,
            P = this._start,
            E = this._ts,
            T = !E,
            w && (f || (l = this._zTime),
            (r || !n) && (this._zTime = r)),
            this._repeat) {
                if (R = this._yoyo,
                S = f + this._rDelay,
                this._repeat < -1 && r < 0)
                    return this.totalTime(S * 100 + r, n, o);
                if (_ = kt(h % S),
                h === c ? (p = this._repeat,
                _ = f) : (k = kt(h / S),
                p = ~~k,
                p && p === k && (_ = f,
                p--),
                _ > f && (_ = f)),
                k = os(this._tTime, S),
                !l && this._tTime && k !== p && this._tTime - k * S - this._dur <= 0 && (k = p),
                R && p & 1 && (_ = f - _,
                d = 1),
                p !== k && !this._lock) {
                    var N = R && k & 1
                      , L = N === (R && p & 1);
                    if (p < k && (N = !N),
                    l = N ? 0 : h % f ? f : h,
                    this._lock = 1,
                    this.render(l || (d ? 0 : kt(p * S)), n, !f)._lock = 0,
                    this._tTime = h,
                    !n && this.parent && $i(this, "onRepeat"),
                    this.vars.repeatRefresh && !d && (this.invalidate()._lock = 1),
                    l && l !== this._time || T !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
                        return this;
                    if (f = this._dur,
                    c = this._tDur,
                    L && (this._lock = 2,
                    l = N ? f : -1e-4,
                    this.render(l, !0),
                    this.vars.repeatRefresh && !d && this.invalidate()),
                    this._lock = 0,
                    !this._ts && !T)
                        return this;
                    jc(this, d)
                }
            }
            if (this._hasPause && !this._forcing && this._lock < 2 && (C = cp(this, kt(l), kt(_)),
            C && (h -= _ - (_ = C._start))),
            this._tTime = h,
            this._time = _,
            this._act = !E,
            this._initted || (this._onUpdate = this.vars.onUpdate,
            this._initted = 1,
            this._zTime = r,
            l = 0),
            !l && h && !n && !k && ($i(this, "onStart"),
            this._tTime !== h))
                return this;
            if (_ >= l && r >= 0)
                for (y = this._first; y; ) {
                    if (g = y._next,
                    (y._act || _ >= y._start) && y._ts && C !== y) {
                        if (y.parent !== this)
                            return this.render(r, n, o);
                        if (y.render(y._ts > 0 ? (_ - y._start) * y._ts : (y._dirty ? y.totalDuration() : y._tDur) + (_ - y._start) * y._ts, n, o),
                        _ !== this._time || !this._ts && !T) {
                            C = 0,
                            g && (h += this._zTime = -rt);
                            break
                        }
                    }
                    y = g
                }
            else {
                y = this._last;
                for (var O = r < 0 ? r : _; y; ) {
                    if (g = y._prev,
                    (y._act || O <= y._end) && y._ts && C !== y) {
                        if (y.parent !== this)
                            return this.render(r, n, o);
                        if (y.render(y._ts > 0 ? (O - y._start) * y._ts : (y._dirty ? y.totalDuration() : y._tDur) + (O - y._start) * y._ts, n, o || Qt && Dl(y)),
                        _ !== this._time || !this._ts && !T) {
                            C = 0,
                            g && (h += this._zTime = O ? -rt : rt);
                            break
                        }
                    }
                    y = g
                }
            }
            if (C && !n && (this.pause(),
            C.render(_ >= l ? 0 : -rt)._zTime = _ >= l ? 1 : -1,
            this._ts))
                return this._start = P,
                eo(this),
                this.render(r, n, o);
            this._onUpdate && !n && $i(this, "onUpdate", !0),
            (h === c && this._tTime >= this.totalDuration() || !h && l) && (P === this._start || Math.abs(E) !== Math.abs(this._ts)) && (this._lock || ((r || !f) && (h === c && this._ts > 0 || !h && this._ts < 0) && nn(this, 1),
            !n && !(r < 0 && !l) && (h || l || !c) && ($i(this, h === c && r >= 0 ? "onComplete" : "onReverseComplete", !0),
            this._prom && !(h < c && this.timeScale() > 0) && this._prom())))
        }
        return this
    }
    ,
    t.add = function(r, n) {
        var o = this;
        if (zr(n) || (n = Gi(this, n, r)),
        !(r instanceof Zs)) {
            if (si(r))
                return r.forEach(function(l) {
                    return o.add(l, n)
                }),
                this;
            if (Xt(r))
                return this.addLabel(r, n);
            if (xt(r))
                r = At.delayedCall(0, r);
            else
                return this
        }
        return this !== r ? mr(this, r, n) : this
    }
    ,
    t.getChildren = function(r, n, o, l) {
        r === void 0 && (r = !0),
        n === void 0 && (n = !0),
        o === void 0 && (o = !0),
        l === void 0 && (l = -Qi);
        for (var c = [], f = this._first; f; )
            f._start >= l && (f instanceof At ? n && c.push(f) : (o && c.push(f),
            r && c.push.apply(c, f.getChildren(!0, n, o)))),
            f = f._next;
        return c
    }
    ,
    t.getById = function(r) {
        for (var n = this.getChildren(1, 1, 1), o = n.length; o--; )
            if (n[o].vars.id === r)
                return n[o]
    }
    ,
    t.remove = function(r) {
        return Xt(r) ? this.removeLabel(r) : xt(r) ? this.killTweensOf(r) : (r.parent === this && Ja(this, r),
        r === this._recent && (this._recent = this._last),
        Tn(this))
    }
    ,
    t.totalTime = function(r, n) {
        return arguments.length ? (this._forcing = 1,
        !this._dp && this._ts && (this._start = kt(Ri.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))),
        s.prototype.totalTime.call(this, r, n),
        this._forcing = 0,
        this) : this._tTime
    }
    ,
    t.addLabel = function(r, n) {
        return this.labels[r] = Gi(this, n),
        this
    }
    ,
    t.removeLabel = function(r) {
        return delete this.labels[r],
        this
    }
    ,
    t.addPause = function(r, n, o) {
        var l = At.delayedCall(0, n || Us, o);
        return l.data = "isPause",
        this._hasPause = 1,
        mr(this, l, Gi(this, r))
    }
    ,
    t.removePause = function(r) {
        var n = this._first;
        for (r = Gi(this, r); n; )
            n._start === r && n.data === "isPause" && nn(n),
            n = n._next
    }
    ,
    t.killTweensOf = function(r, n, o) {
        for (var l = this.getTweensOf(r, o), c = l.length; c--; )
            Vr !== l[c] && l[c].kill(r, n);
        return this
    }
    ,
    t.getTweensOf = function(r, n) {
        for (var o = [], l = Zi(r), c = this._first, f = zr(n), h; c; )
            c instanceof At ? rp(c._targets, l) && (f ? (!Vr || c._initted && c._ts) && c.globalTime(0) <= n && c.globalTime(c.totalDuration()) > n : !n || c.isActive()) && o.push(c) : (h = c.getTweensOf(l, n)).length && o.push.apply(o, h),
            c = c._next;
        return o
    }
    ,
    t.tweenTo = function(r, n) {
        n = n || {};
        var o = this, l = Gi(o, r), c = n, f = c.startAt, h = c.onStart, w = c.onStartParams, _ = c.immediateRender, y, g = At.to(o, Bi({
            ease: n.ease || "none",
            lazy: !1,
            immediateRender: !1,
            time: l,
            overwrite: "auto",
            duration: n.duration || Math.abs((l - (f && "time"in f ? f.time : o._time)) / o.timeScale()) || rt,
            onStart: function() {
                if (o.pause(),
                !y) {
                    var S = n.duration || Math.abs((l - (f && "time"in f ? f.time : o._time)) / o.timeScale());
                    g._dur !== S && ls(g, S, 0, 1).render(g._time, !0, !0),
                    y = 1
                }
                h && h.apply(g, w || [])
            }
        }, n));
        return _ ? g.render(0) : g
    }
    ,
    t.tweenFromTo = function(r, n, o) {
        return this.tweenTo(n, Bi({
            startAt: {
                time: Gi(this, r)
            }
        }, o))
    }
    ,
    t.recent = function() {
        return this._recent
    }
    ,
    t.nextLabel = function(r) {
        return r === void 0 && (r = this._time),
        bu(this, Gi(this, r))
    }
    ,
    t.previousLabel = function(r) {
        return r === void 0 && (r = this._time),
        bu(this, Gi(this, r), 1)
    }
    ,
    t.currentLabel = function(r) {
        return arguments.length ? this.seek(r, !0) : this.previousLabel(this._time + rt)
    }
    ,
    t.shiftChildren = function(r, n, o) {
        o === void 0 && (o = 0);
        for (var l = this._first, c = this.labels, f; l; )
            l._start >= o && (l._start += r,
            l._end += r),
            l = l._next;
        if (n)
            for (f in c)
                c[f] >= o && (c[f] += r);
        return Tn(this)
    }
    ,
    t.invalidate = function(r) {
        var n = this._first;
        for (this._lock = 0; n; )
            n.invalidate(r),
            n = n._next;
        return s.prototype.invalidate.call(this, r)
    }
    ,
    t.clear = function(r) {
        r === void 0 && (r = !0);
        for (var n = this._first, o; n; )
            o = n._next,
            this.remove(n),
            n = o;
        return this._dp && (this._time = this._tTime = this._pTime = 0),
        r && (this.labels = {}),
        Tn(this)
    }
    ,
    t.totalDuration = function(r) {
        var n = 0, o = this, l = o._last, c = Qi, f, h, w;
        if (arguments.length)
            return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -r : r));
        if (o._dirty) {
            for (w = o.parent; l; )
                f = l._prev,
                l._dirty && l.totalDuration(),
                h = l._start,
                h > c && o._sort && l._ts && !o._lock ? (o._lock = 1,
                mr(o, l, h - l._delay, 1)._lock = 0) : c = h,
                h < 0 && l._ts && (n -= h,
                (!w && !o._dp || w && w.smoothChildTiming) && (o._start += h / o._ts,
                o._time -= h,
                o._tTime -= h),
                o.shiftChildren(-h, !1, -1 / 0),
                c = 0),
                l._end > n && l._ts && (n = l._end),
                l = f;
            ls(o, o === vt && o._time > n ? o._time : n, 1, 1),
            o._dirty = 0
        }
        return o._tDur
    }
    ,
    e.updateRoot = function(r) {
        if (vt._ts && (Sc(vt, qa(r, vt)),
        bc = Ri.frame),
        Ri.frame >= vu) {
            vu += Fi.autoSleep || 120;
            var n = vt._first;
            if ((!n || !n._ts) && Fi.autoSleep && Ri._listeners.length < 2) {
                for (; n && !n._ts; )
                    n = n._next;
                n || Ri.sleep()
            }
        }
    }
    ,
    e
}(Zs);
Bi(pi.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
});
var Cp = function(e, t, i, r, n, o, l) {
    var c = new Ti(this._pt,e,t,0,1,Qc,null,n), f = 0, h = 0, w, _, y, g, p, S, T, C;
    for (c.b = i,
    c.e = r,
    i += "",
    r += "",
    (T = ~r.indexOf("random(")) && (r = Ks(r)),
    o && (C = [i, r],
    o(C, e, t),
    i = C[0],
    r = C[1]),
    _ = i.match(So) || []; w = So.exec(r); )
        g = w[0],
        p = r.substring(f, w.index),
        y ? y = (y + 1) % 5 : p.substr(-5) === "rgba(" && (y = 1),
        g !== _[h++] && (S = parseFloat(_[h - 1]) || 0,
        c._pt = {
            _next: c._pt,
            p: p || h === 1 ? p : ",",
            s: S,
            c: g.charAt(1) === "=" ? Jn(S, g) - S : parseFloat(g) - S,
            m: y && y < 4 ? Math.round : 0
        },
        f = So.lastIndex);
    return c.c = f < r.length ? r.substring(f, r.length) : "",
    c.fp = l,
    (gc.test(r) || T) && (c.e = 0),
    this._pt = c,
    c
}, Il = function(e, t, i, r, n, o, l, c, f, h) {
    xt(r) && (r = r(n || 0, e, o));
    var w = e[t], _ = i !== "get" ? i : xt(w) ? f ? e[t.indexOf("set") || !xt(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](f) : e[t]() : w, y = xt(w) ? f ? Lp : Uc : Rl, g;
    if (Xt(r) && (~r.indexOf("random(") && (r = Ks(r)),
    r.charAt(1) === "=" && (g = Jn(_, r) + (ri(_) || 0),
    (g || g === 0) && (r = g))),
    !h || _ !== r || sl)
        return !isNaN(_ * r) && r !== "" ? (g = new Ti(this._pt,e,t,+_ || 0,r - (_ || 0),typeof w == "boolean" ? Dp : Kc,0,y),
        f && (g.fp = f),
        l && g.modifier(l, this, e),
        this._pt = g) : (!w && !(t in e) && Al(t, r),
        Cp.call(this, e, t, _, r, y, c || Fi.stringFilter, f))
}, Mp = function(e, t, i, r, n) {
    if (xt(e) && (e = zs(e, n, t, i, r)),
    !br(e) || e.style && e.nodeType || si(e) || hc(e))
        return Xt(e) ? zs(e, n, t, i, r) : e;
    var o = {}, l;
    for (l in e)
        o[l] = zs(e[l], n, t, i, r);
    return o
}, Wc = function(e, t, i, r, n, o) {
    var l, c, f, h;
    if (Di[e] && (l = new Di[e]).init(n, l.rawVars ? t[e] : Mp(t[e], r, n, o, i), i, r, o) !== !1 && (i._pt = c = new Ti(i._pt,n,e,0,1,l.render,l,0,l.priority),
    i !== Qn))
        for (f = i._ptLookup[i._targets.indexOf(n)],
        h = l._props.length; h--; )
            f[l._props[h]] = c;
    return l
}, Vr, sl, zl = function s(e, t, i) {
    var r = e.vars, n = r.ease, o = r.startAt, l = r.immediateRender, c = r.lazy, f = r.onUpdate, h = r.runBackwards, w = r.yoyoEase, _ = r.keyframes, y = r.autoRevert, g = e._dur, p = e._startAt, S = e._targets, T = e.parent, C = T && T.data === "nested" ? T.vars.targets : S, E = e._overwrite === "auto" && !El, P = e.timeline, k, R, d, N, L, O, X, I, H, q, V, Q, F;
    if (P && (!_ || !n) && (n = "none"),
    e._ease = En(n, ss.ease),
    e._yEase = w ? Bc(En(w === !0 ? n : w, ss.ease)) : 0,
    w && e._yoyo && !e._repeat && (w = e._yEase,
    e._yEase = e._ease,
    e._ease = w),
    e._from = !P && !!r.runBackwards,
    !P || _ && !r.stagger) {
        if (I = S[0] ? Sn(S[0]).harness : 0,
        Q = I && r[I.prop],
        k = Fa(r, kl),
        p && (p._zTime < 0 && p.progress(1),
        t < 0 && h && l && !y ? p.render(-1, !0) : p.revert(h && g ? Ca : tp),
        p._lazy = 0),
        o) {
            if (nn(e._startAt = At.set(S, Bi({
                data: "isStart",
                overwrite: !1,
                parent: T,
                immediateRender: !0,
                lazy: !p && xi(c),
                startAt: null,
                delay: 0,
                onUpdate: f && function() {
                    return $i(e, "onUpdate")
                }
                ,
                stagger: 0
            }, o))),
            e._startAt._dp = 0,
            e._startAt._sat = e,
            t < 0 && (Qt || !l && !y) && e._startAt.revert(Ca),
            l && g && t <= 0 && i <= 0) {
                t && (e._zTime = t);
                return
            }
        } else if (h && g && !p) {
            if (t && (l = !1),
            d = Bi({
                overwrite: !1,
                data: "isFromStart",
                lazy: l && !p && xi(c),
                immediateRender: l,
                stagger: 0,
                parent: T
            }, k),
            Q && (d[I.prop] = Q),
            nn(e._startAt = At.set(S, d)),
            e._startAt._dp = 0,
            e._startAt._sat = e,
            t < 0 && (Qt ? e._startAt.revert(Ca) : e._startAt.render(-1, !0)),
            e._zTime = t,
            !l)
                s(e._startAt, rt, rt);
            else if (!t)
                return
        }
        for (e._pt = e._ptCache = 0,
        c = g && xi(c) || c && !g,
        R = 0; R < S.length; R++) {
            if (L = S[R],
            X = L._gsap || Ol(S)[R]._gsap,
            e._ptLookup[R] = q = {},
            Jo[X.id] && en.length && Ha(),
            V = C === S ? R : C.indexOf(L),
            I && (H = new I).init(L, Q || k, e, V, C) !== !1 && (e._pt = N = new Ti(e._pt,L,H.name,0,1,H.render,H,0,H.priority),
            H._props.forEach(function(Y) {
                q[Y] = N
            }),
            H.priority && (O = 1)),
            !I || Q)
                for (d in k)
                    Di[d] && (H = Wc(d, k, e, V, L, C)) ? H.priority && (O = 1) : q[d] = N = Il.call(e, L, d, "get", k[d], V, C, 0, r.stringFilter);
            e._op && e._op[R] && e.kill(L, e._op[R]),
            E && e._pt && (Vr = e,
            vt.killTweensOf(L, q, e.globalTime(t)),
            F = !e.parent,
            Vr = 0),
            e._pt && c && (Jo[X.id] = 1)
        }
        O && Zc(e),
        e._onInit && e._onInit(e)
    }
    e._onUpdate = f,
    e._initted = (!e._op || e._pt) && !F,
    _ && t <= 0 && P.render(Qi, !0, !0)
}, Pp = function(e, t, i, r, n, o, l, c) {
    var f = (e._pt && e._ptCache || (e._ptCache = {}))[t], h, w, _, y;
    if (!f)
        for (f = e._ptCache[t] = [],
        _ = e._ptLookup,
        y = e._targets.length; y--; ) {
            if (h = _[y][t],
            h && h.d && h.d._pt)
                for (h = h.d._pt; h && h.p !== t && h.fp !== t; )
                    h = h._next;
            if (!h)
                return sl = 1,
                e.vars[t] = "+=0",
                zl(e, l),
                sl = 0,
                c ? Vs(t + " not eligible for reset") : 1;
            f.push(h)
        }
    for (y = f.length; y--; )
        w = f[y],
        h = w._pt || w,
        h.s = (r || r === 0) && !n ? r : h.s + (r || 0) + o * h.c,
        h.c = i - h.s,
        w.e && (w.e = Tt(i) + ri(w.e)),
        w.b && (w.b = h.s + ri(w.b))
}, Ap = function(e, t) {
    var i = e[0] ? Sn(e[0]).harness : 0, r = i && i.aliases, n, o, l, c;
    if (!r)
        return t;
    n = as({}, t);
    for (o in r)
        if (o in n)
            for (c = r[o].split(","),
            l = c.length; l--; )
                n[c[l]] = n[o];
    return n
}, kp = function(e, t, i, r) {
    var n = t.ease || r || "power1.inOut", o, l;
    if (si(t))
        l = i[e] || (i[e] = []),
        t.forEach(function(c, f) {
            return l.push({
                t: f / (t.length - 1) * 100,
                v: c,
                e: n
            })
        });
    else
        for (o in t)
            l = i[o] || (i[o] = []),
            o === "ease" || l.push({
                t: parseFloat(e),
                v: t[o],
                e: n
            })
}, zs = function(e, t, i, r, n) {
    return xt(e) ? e.call(t, i, r, n) : Xt(e) && ~e.indexOf("random(") ? Ks(e) : e
}, Gc = Ll + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Vc = {};
Si(Gc + ",id,stagger,delay,duration,paused,scrollTrigger", function(s) {
    return Vc[s] = 1
});
var At = function(s) {
    dc(e, s);
    function e(i, r, n, o) {
        var l;
        typeof r == "number" && (n.duration = r,
        r = n,
        n = null),
        l = s.call(this, o ? r : Ds(r)) || this;
        var c = l.vars, f = c.duration, h = c.delay, w = c.immediateRender, _ = c.stagger, y = c.overwrite, g = c.keyframes, p = c.defaults, S = c.scrollTrigger, T = c.yoyoEase, C = r.parent || vt, E = (si(i) || hc(i) ? zr(i[0]) : "length"in r) ? [i] : Zi(i), P, k, R, d, N, L, O, X;
        if (l._targets = E.length ? Ol(E) : Vs("GSAP target " + i + " not found. https://gsap.com", !Fi.nullTargetWarn) || [],
        l._ptLookup = [],
        l._overwrite = y,
        g || _ || pa(f) || pa(h)) {
            if (r = l.vars,
            P = l.timeline = new pi({
                data: "nested",
                defaults: p || {},
                targets: C && C.data === "nested" ? C.vars.targets : E
            }),
            P.kill(),
            P.parent = P._dp = Ar(l),
            P._start = 0,
            _ || pa(f) || pa(h)) {
                if (d = E.length,
                O = _ && Oc(_),
                br(_))
                    for (N in _)
                        ~Gc.indexOf(N) && (X || (X = {}),
                        X[N] = _[N]);
                for (k = 0; k < d; k++)
                    R = Fa(r, Vc),
                    R.stagger = 0,
                    T && (R.yoyoEase = T),
                    X && as(R, X),
                    L = E[k],
                    R.duration = +zs(f, Ar(l), k, L, E),
                    R.delay = (+zs(h, Ar(l), k, L, E) || 0) - l._delay,
                    !_ && d === 1 && R.delay && (l._delay = h = R.delay,
                    l._start += h,
                    R.delay = 0),
                    P.to(L, R, O ? O(k, L, E) : 0),
                    P._ease = He.none;
                P.duration() ? f = h = 0 : l.timeline = 0
            } else if (g) {
                Ds(Bi(P.vars.defaults, {
                    ease: "none"
                })),
                P._ease = En(g.ease || r.ease || "none");
                var I = 0, H, q, V;
                if (si(g))
                    g.forEach(function(Q) {
                        return P.to(E, Q, ">")
                    }),
                    P.duration();
                else {
                    R = {};
                    for (N in g)
                        N === "ease" || N === "easeEach" || kp(N, g[N], R, g.easeEach);
                    for (N in R)
                        for (H = R[N].sort(function(Q, F) {
                            return Q.t - F.t
                        }),
                        I = 0,
                        k = 0; k < H.length; k++)
                            q = H[k],
                            V = {
                                ease: q.e,
                                duration: (q.t - (k ? H[k - 1].t : 0)) / 100 * f
                            },
                            V[N] = q.v,
                            P.to(E, V, I),
                            I += V.duration;
                    P.duration() < f && P.to({}, {
                        duration: f - P.duration()
                    })
                }
            }
            f || l.duration(f = P.duration())
        } else
            l.timeline = 0;
        return y === !0 && !El && (Vr = Ar(l),
        vt.killTweensOf(E),
        Vr = 0),
        mr(C, Ar(l), n),
        r.reversed && l.reverse(),
        r.paused && l.paused(!0),
        (w || !f && !g && l._start === kt(C._time) && xi(w) && op(Ar(l)) && C.data !== "nested") && (l._tTime = -rt,
        l.render(Math.max(0, -h) || 0)),
        S && Pc(Ar(l), S),
        l
    }
    var t = e.prototype;
    return t.render = function(r, n, o) {
        var l = this._time, c = this._tDur, f = this._dur, h = r < 0, w = r > c - rt && !h ? c : r < rt ? 0 : r, _, y, g, p, S, T, C, E, P;
        if (!f)
            up(this, r, n, o);
        else if (w !== this._tTime || !r || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== h || this._lazy) {
            if (_ = w,
            E = this.timeline,
            this._repeat) {
                if (p = f + this._rDelay,
                this._repeat < -1 && h)
                    return this.totalTime(p * 100 + r, n, o);
                if (_ = kt(w % p),
                w === c ? (g = this._repeat,
                _ = f) : (S = kt(w / p),
                g = ~~S,
                g && g === S ? (_ = f,
                g--) : _ > f && (_ = f)),
                T = this._yoyo && g & 1,
                T && (P = this._yEase,
                _ = f - _),
                S = os(this._tTime, p),
                _ === l && !o && this._initted && g === S)
                    return this._tTime = w,
                    this;
                g !== S && (E && this._yEase && jc(E, T),
                this.vars.repeatRefresh && !T && !this._lock && _ !== p && this._initted && (this._lock = o = 1,
                this.render(kt(p * g), !0).invalidate()._lock = 0))
            }
            if (!this._initted) {
                if (Ac(this, h ? r : _, o, n, w))
                    return this._tTime = 0,
                    this;
                if (l !== this._time && !(o && this.vars.repeatRefresh && g !== S))
                    return this;
                if (f !== this._dur)
                    return this.render(r, n, o)
            }
            if (this._tTime = w,
            this._time = _,
            !this._act && this._ts && (this._act = 1,
            this._lazy = 0),
            this.ratio = C = (P || this._ease)(_ / f),
            this._from && (this.ratio = C = 1 - C),
            !l && w && !n && !S && ($i(this, "onStart"),
            this._tTime !== w))
                return this;
            for (y = this._pt; y; )
                y.r(C, y.d),
                y = y._next;
            E && E.render(r < 0 ? r : E._dur * E._ease(_ / this._dur), n, o) || this._startAt && (this._zTime = r),
            this._onUpdate && !n && (h && el(this, r, n, o),
            $i(this, "onUpdate")),
            this._repeat && g !== S && this.vars.onRepeat && !n && this.parent && $i(this, "onRepeat"),
            (w === this._tDur || !w) && this._tTime === w && (h && !this._onUpdate && el(this, r, !0, !0),
            (r || !f) && (w === this._tDur && this._ts > 0 || !w && this._ts < 0) && nn(this, 1),
            !n && !(h && !l) && (w || l || T) && ($i(this, w === c ? "onComplete" : "onReverseComplete", !0),
            this._prom && !(w < c && this.timeScale() > 0) && this._prom()))
        }
        return this
    }
    ,
    t.targets = function() {
        return this._targets
    }
    ,
    t.invalidate = function(r) {
        return (!r || !this.vars.runBackwards) && (this._startAt = 0),
        this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0,
        this._ptLookup = [],
        this.timeline && this.timeline.invalidate(r),
        s.prototype.invalidate.call(this, r)
    }
    ,
    t.resetTo = function(r, n, o, l, c) {
        Qs || Ri.wake(),
        this._ts || this.play();
        var f = Math.min(this._dur, (this._dp._time - this._start) * this._ts), h;
        return this._initted || zl(this, f),
        h = this._ease(f / this._dur),
        Pp(this, r, n, o, l, h, f, c) ? this.resetTo(r, n, o, l, 1) : (to(this, 0),
        this.parent || Cc(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0),
        this.render(0))
    }
    ,
    t.kill = function(r, n) {
        if (n === void 0 && (n = "all"),
        !r && (!n || n === "all"))
            return this._lazy = this._pt = 0,
            this.parent ? Ts(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Qt),
            this;
        if (this.timeline) {
            var o = this.timeline.totalDuration();
            return this.timeline.killTweensOf(r, n, Vr && Vr.vars.overwrite !== !0)._first || Ts(this),
            this.parent && o !== this.timeline.totalDuration() && ls(this, this._dur * this.timeline._tDur / o, 0, 1),
            this
        }
        var l = this._targets, c = r ? Zi(r) : l, f = this._ptLookup, h = this._pt, w, _, y, g, p, S, T;
        if ((!n || n === "all") && sp(l, c))
            return n === "all" && (this._pt = 0),
            Ts(this);
        for (w = this._op = this._op || [],
        n !== "all" && (Xt(n) && (p = {},
        Si(n, function(C) {
            return p[C] = 1
        }),
        n = p),
        n = Ap(l, n)),
        T = l.length; T--; )
            if (~c.indexOf(l[T])) {
                _ = f[T],
                n === "all" ? (w[T] = n,
                g = _,
                y = {}) : (y = w[T] = w[T] || {},
                g = n);
                for (p in g)
                    S = _ && _[p],
                    S && ((!("kill"in S.d) || S.d.kill(p) === !0) && Ja(this, S, "_pt"),
                    delete _[p]),
                    y !== "all" && (y[p] = 1)
            }
        return this._initted && !this._pt && h && Ts(this),
        this
    }
    ,
    e.to = function(r, n) {
        return new e(r,n,arguments[2])
    }
    ,
    e.from = function(r, n) {
        return Is(1, arguments)
    }
    ,
    e.delayedCall = function(r, n, o, l) {
        return new e(n,0,{
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: r,
            onComplete: n,
            onReverseComplete: n,
            onCompleteParams: o,
            onReverseCompleteParams: o,
            callbackScope: l
        })
    }
    ,
    e.fromTo = function(r, n, o) {
        return Is(2, arguments)
    }
    ,
    e.set = function(r, n) {
        return n.duration = 0,
        n.repeatDelay || (n.repeat = 0),
        new e(r,n)
    }
    ,
    e.killTweensOf = function(r, n, o) {
        return vt.killTweensOf(r, n, o)
    }
    ,
    e
}(Zs);
Bi(At.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
});
Si("staggerTo,staggerFrom,staggerFromTo", function(s) {
    At[s] = function() {
        var e = new pi
          , t = il.call(arguments, 0);
        return t.splice(s === "staggerFromTo" ? 5 : 4, 0, 0),
        e[s].apply(e, t)
    }
});
var Rl = function(e, t, i) {
    return e[t] = i
}
  , Uc = function(e, t, i) {
    return e[t](i)
}
  , Lp = function(e, t, i, r) {
    return e[t](r.fp, i)
}
  , Op = function(e, t, i) {
    return e.setAttribute(t, i)
}
  , Nl = function(e, t) {
    return xt(e[t]) ? Uc : Cl(e[t]) && e.setAttribute ? Op : Rl
}
  , Kc = function(e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t)
}
  , Dp = function(e, t) {
    return t.set(t.t, t.p, !!(t.s + t.c * e), t)
}
  , Qc = function(e, t) {
    var i = t._pt
      , r = "";
    if (!e && t.b)
        r = t.b;
    else if (e === 1 && t.e)
        r = t.e;
    else {
        for (; i; )
            r = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round((i.s + i.c * e) * 1e4) / 1e4) + r,
            i = i._next;
        r += t.c
    }
    t.set(t.t, t.p, r, t)
}
  , $l = function(e, t) {
    for (var i = t._pt; i; )
        i.r(e, i.d),
        i = i._next
}
  , Ip = function(e, t, i, r) {
    for (var n = this._pt, o; n; )
        o = n._next,
        n.p === r && n.modifier(e, t, i),
        n = o
}
  , zp = function(e) {
    for (var t = this._pt, i, r; t; )
        r = t._next,
        t.p === e && !t.op || t.op === e ? Ja(this, t, "_pt") : t.dep || (i = 1),
        t = r;
    return !i
}
  , Rp = function(e, t, i, r) {
    r.mSet(e, t, r.m.call(r.tween, i, r.mt), r)
}
  , Zc = function(e) {
    for (var t = e._pt, i, r, n, o; t; ) {
        for (i = t._next,
        r = n; r && r.pr > t.pr; )
            r = r._next;
        (t._prev = r ? r._prev : o) ? t._prev._next = t : n = t,
        (t._next = r) ? r._prev = t : o = t,
        t = i
    }
    e._pt = n
}
  , Ti = function() {
    function s(t, i, r, n, o, l, c, f, h) {
        this.t = i,
        this.s = n,
        this.c = o,
        this.p = r,
        this.r = l || Kc,
        this.d = c || this,
        this.set = f || Rl,
        this.pr = h || 0,
        this._next = t,
        t && (t._prev = this)
    }
    var e = s.prototype;
    return e.modifier = function(i, r, n) {
        this.mSet = this.mSet || this.set,
        this.set = Rp,
        this.m = i,
        this.mt = n,
        this.tween = r
    }
    ,
    s
}();
Si(Ll + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(s) {
    return kl[s] = 1
});
qi.TweenMax = qi.TweenLite = At;
qi.TimelineLite = qi.TimelineMax = pi;
vt = new pi({
    sortChildren: !1,
    defaults: ss,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0
});
Fi.stringFilter = qc;
var Cn = []
  , Pa = {}
  , Np = []
  , Su = 0
  , $p = 0
  , Po = function(e) {
    return (Pa[e] || Np).map(function(t) {
        return t()
    })
}
  , al = function() {
    var e = Date.now()
      , t = [];
    e - Su > 2 && (Po("matchMediaInit"),
    Cn.forEach(function(i) {
        var r = i.queries, n = i.conditions, o, l, c, f;
        for (l in r)
            o = pr.matchMedia(r[l]).matches,
            o && (c = 1),
            o !== n[l] && (n[l] = o,
            f = 1);
        f && (i.revert(),
        c && t.push(i))
    }),
    Po("matchMediaRevert"),
    t.forEach(function(i) {
        return i.onMatch(i, function(r) {
            return i.add(null, r)
        })
    }),
    Su = e,
    Po("matchMedia"))
}
  , Jc = function() {
    function s(t, i) {
        this.selector = i && rl(i),
        this.data = [],
        this._r = [],
        this.isReverted = !1,
        this.id = $p++,
        t && this.add(t)
    }
    var e = s.prototype;
    return e.add = function(i, r, n) {
        xt(i) && (n = r,
        r = i,
        i = xt);
        var o = this
          , l = function() {
            var f = pt, h = o.selector, w;
            return f && f !== o && f.data.push(o),
            n && (o.selector = rl(n)),
            pt = o,
            w = r.apply(o, arguments),
            xt(w) && o._r.push(w),
            pt = f,
            o.selector = h,
            o.isReverted = !1,
            w
        };
        return o.last = l,
        i === xt ? l(o, function(c) {
            return o.add(null, c)
        }) : i ? o[i] = l : l
    }
    ,
    e.ignore = function(i) {
        var r = pt;
        pt = null,
        i(this),
        pt = r
    }
    ,
    e.getTweens = function() {
        var i = [];
        return this.data.forEach(function(r) {
            return r instanceof s ? i.push.apply(i, r.getTweens()) : r instanceof At && !(r.parent && r.parent.data === "nested") && i.push(r)
        }),
        i
    }
    ,
    e.clear = function() {
        this._r.length = this.data.length = 0
    }
    ,
    e.kill = function(i, r) {
        var n = this;
        if (i ? function() {
            for (var l = n.getTweens(), c = n.data.length, f; c--; )
                f = n.data[c],
                f.data === "isFlip" && (f.revert(),
                f.getChildren(!0, !0, !1).forEach(function(h) {
                    return l.splice(l.indexOf(h), 1)
                }));
            for (l.map(function(h) {
                return {
                    g: h._dur || h._delay || h._sat && !h._sat.vars.immediateRender ? h.globalTime(0) : -1 / 0,
                    t: h
                }
            }).sort(function(h, w) {
                return w.g - h.g || -1 / 0
            }).forEach(function(h) {
                return h.t.revert(i)
            }),
            c = n.data.length; c--; )
                f = n.data[c],
                f instanceof pi ? f.data !== "nested" && (f.scrollTrigger && f.scrollTrigger.revert(),
                f.kill()) : !(f instanceof At) && f.revert && f.revert(i);
            n._r.forEach(function(h) {
                return h(i, n)
            }),
            n.isReverted = !0
        }() : this.data.forEach(function(l) {
            return l.kill && l.kill()
        }),
        this.clear(),
        r)
            for (var o = Cn.length; o--; )
                Cn[o].id === this.id && Cn.splice(o, 1)
    }
    ,
    e.revert = function(i) {
        this.kill(i || {})
    }
    ,
    s
}()
  , Hp = function() {
    function s(t) {
        this.contexts = [],
        this.scope = t,
        pt && pt.data.push(this)
    }
    var e = s.prototype;
    return e.add = function(i, r, n) {
        br(i) || (i = {
            matches: i
        });
        var o = new Jc(0,n || this.scope), l = o.conditions = {}, c, f, h;
        pt && !o.selector && (o.selector = pt.selector),
        this.contexts.push(o),
        r = o.add("onMatch", r),
        o.queries = i;
        for (f in i)
            f === "all" ? h = 1 : (c = pr.matchMedia(i[f]),
            c && (Cn.indexOf(o) < 0 && Cn.push(o),
            (l[f] = c.matches) && (h = 1),
            c.addListener ? c.addListener(al) : c.addEventListener("change", al)));
        return h && r(o, function(w) {
            return o.add(null, w)
        }),
        this
    }
    ,
    e.revert = function(i) {
        this.kill(i || {})
    }
    ,
    e.kill = function(i) {
        this.contexts.forEach(function(r) {
            return r.kill(i, !0)
        })
    }
    ,
    s
}()
  , Ba = {
    registerPlugin: function() {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
        t.forEach(function(r) {
            return $c(r)
        })
    },
    timeline: function(e) {
        return new pi(e)
    },
    getTweensOf: function(e, t) {
        return vt.getTweensOf(e, t)
    },
    getProperty: function(e, t, i, r) {
        Xt(e) && (e = Zi(e)[0]);
        var n = Sn(e || {}).get
          , o = i ? Ec : Tc;
        return i === "native" && (i = ""),
        e && (t ? o((Di[t] && Di[t].get || n)(e, t, i, r)) : function(l, c, f) {
            return o((Di[l] && Di[l].get || n)(e, l, c, f))
        }
        )
    },
    quickSetter: function(e, t, i) {
        if (e = Zi(e),
        e.length > 1) {
            var r = e.map(function(h) {
                return Ci.quickSetter(h, t, i)
            })
              , n = r.length;
            return function(h) {
                for (var w = n; w--; )
                    r[w](h)
            }
        }
        e = e[0] || {};
        var o = Di[t]
          , l = Sn(e)
          , c = l.harness && (l.harness.aliases || {})[t] || t
          , f = o ? function(h) {
            var w = new o;
            Qn._pt = 0,
            w.init(e, i ? h + i : h, Qn, 0, [e]),
            w.render(1, w),
            Qn._pt && $l(1, Qn)
        }
        : l.set(e, c);
        return o ? f : function(h) {
            return f(e, c, i ? h + i : h, l, 1)
        }
    },
    quickTo: function(e, t, i) {
        var r, n = Ci.to(e, Bi((r = {},
        r[t] = "+=0.1",
        r.paused = !0,
        r.stagger = 0,
        r), i || {})), o = function(c, f, h) {
            return n.resetTo(t, c, f, h)
        };
        return o.tween = n,
        o
    },
    isTweening: function(e) {
        return vt.getTweensOf(e, !0).length > 0
    },
    defaults: function(e) {
        return e && e.ease && (e.ease = En(e.ease, ss.ease)),
        yu(ss, e || {})
    },
    config: function(e) {
        return yu(Fi, e || {})
    },
    registerEffect: function(e) {
        var t = e.name
          , i = e.effect
          , r = e.plugins
          , n = e.defaults
          , o = e.extendTimeline;
        (r || "").split(",").forEach(function(l) {
            return l && !Di[l] && !qi[l] && Vs(t + " effect requires " + l + " plugin.")
        }),
        To[t] = function(l, c, f) {
            return i(Zi(l), Bi(c || {}, n), f)
        }
        ,
        o && (pi.prototype[t] = function(l, c, f) {
            return this.add(To[t](l, br(c) ? c : (f = c) && {}, this), f)
        }
        )
    },
    registerEase: function(e, t) {
        He[e] = En(t)
    },
    parseEase: function(e, t) {
        return arguments.length ? En(e, t) : He
    },
    getById: function(e) {
        return vt.getById(e)
    },
    exportRoot: function(e, t) {
        e === void 0 && (e = {});
        var i = new pi(e), r, n;
        for (i.smoothChildTiming = xi(e.smoothChildTiming),
        vt.remove(i),
        i._dp = 0,
        i._time = i._tTime = vt._time,
        r = vt._first; r; )
            n = r._next,
            (t || !(!r._dur && r instanceof At && r.vars.onComplete === r._targets[0])) && mr(i, r, r._start - r._delay),
            r = n;
        return mr(vt, i, 0),
        i
    },
    context: function(e, t) {
        return e ? new Jc(e,t) : pt
    },
    matchMedia: function(e) {
        return new Hp(e)
    },
    matchMediaRefresh: function() {
        return Cn.forEach(function(e) {
            var t = e.conditions, i, r;
            for (r in t)
                t[r] && (t[r] = !1,
                i = 1);
            i && e.revert()
        }) || al()
    },
    addEventListener: function(e, t) {
        var i = Pa[e] || (Pa[e] = []);
        ~i.indexOf(t) || i.push(t)
    },
    removeEventListener: function(e, t) {
        var i = Pa[e]
          , r = i && i.indexOf(t);
        r >= 0 && i.splice(r, 1)
    },
    utils: {
        wrap: vp,
        wrapYoyo: yp,
        distribute: Oc,
        random: Ic,
        snap: Dc,
        normalize: gp,
        getUnit: ri,
        clamp: dp,
        splitColor: Hc,
        toArray: Zi,
        selector: rl,
        mapRange: Rc,
        pipe: hp,
        unitize: mp,
        interpolate: wp,
        shuffle: Lc
    },
    install: wc,
    effects: To,
    ticker: Ri,
    updateRoot: pi.updateRoot,
    plugins: Di,
    globalTimeline: vt,
    core: {
        PropTween: Ti,
        globals: _c,
        Tween: At,
        Timeline: pi,
        Animation: Zs,
        getCache: Sn,
        _removeLinkedListItem: Ja,
        reverting: function() {
            return Qt
        },
        context: function(e) {
            return e && pt && (pt.data.push(e),
            e._ctx = pt),
            pt
        },
        suppressOverwrites: function(e) {
            return El = e
        }
    }
};
Si("to,from,fromTo,delayedCall,set,killTweensOf", function(s) {
    return Ba[s] = At[s]
});
Ri.add(pi.updateRoot);
Qn = Ba.to({}, {
    duration: 0
});
var Fp = function(e, t) {
    for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t; )
        i = i._next;
    return i
}
  , qp = function(e, t) {
    var i = e._targets, r, n, o;
    for (r in t)
        for (n = i.length; n--; )
            o = e._ptLookup[n][r],
            o && (o = o.d) && (o._pt && (o = Fp(o, r)),
            o && o.modifier && o.modifier(t[r], e, i[n], r))
}
  , Ao = function(e, t) {
    return {
        name: e,
        headless: 1,
        rawVars: 1,
        init: function(r, n, o) {
            o._onInit = function(l) {
                var c, f;
                if (Xt(n) && (c = {},
                Si(n, function(h) {
                    return c[h] = 1
                }),
                n = c),
                t) {
                    c = {};
                    for (f in n)
                        c[f] = t(n[f]);
                    n = c
                }
                qp(l, n)
            }
        }
    }
}
  , Ci = Ba.registerPlugin({
    name: "attr",
    init: function(e, t, i, r, n) {
        var o, l, c;
        this.tween = i;
        for (o in t)
            c = e.getAttribute(o) || "",
            l = this.add(e, "setAttribute", (c || 0) + "", t[o], r, n, 0, 0, o),
            l.op = o,
            l.b = c,
            this._props.push(o)
    },
    render: function(e, t) {
        for (var i = t._pt; i; )
            Qt ? i.set(i.t, i.p, i.b, i) : i.r(e, i.d),
            i = i._next
    }
}, {
    name: "endArray",
    headless: 1,
    init: function(e, t) {
        for (var i = t.length; i--; )
            this.add(e, i, e[i] || 0, t[i], 0, 0, 0, 0, 0, 1)
    }
}, Ao("roundProps", nl), Ao("modifiers"), Ao("snap", Dc)) || Ba;
At.version = pi.version = Ci.version = "3.13.0";
yc = 1;
Ml() && us();
He.Power0;
He.Power1;
He.Power2;
He.Power3;
He.Power4;
He.Linear;
He.Quad;
He.Cubic;
He.Quart;
He.Quint;
He.Strong;
He.Elastic;
He.Back;
He.SteppedEase;
He.Bounce;
He.Sine;
He.Expo;
He.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Tu, Ur, es, Hl, bn, Eu, Fl, Bp = function() {
    return typeof window < "u"
}, Rr = {}, gn = 180 / Math.PI, ts = Math.PI / 180, jn = Math.atan2, Cu = 1e8, ql = /([A-Z])/g, jp = /(left|right|width|margin|padding|x)/i, Xp = /[\s,\(]\S/, vr = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
}, ol = function(e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
}, Yp = function(e, t) {
    return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
}, Wp = function(e, t) {
    return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t)
}, Gp = function(e, t) {
    var i = t.s + t.c * e;
    t.set(t.t, t.p, ~~(i + (i < 0 ? -.5 : .5)) + t.u, t)
}, ef = function(e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t)
}, tf = function(e, t) {
    return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t)
}, Vp = function(e, t, i) {
    return e.style[t] = i
}, Up = function(e, t, i) {
    return e.style.setProperty(t, i)
}, Kp = function(e, t, i) {
    return e._gsap[t] = i
}, Qp = function(e, t, i) {
    return e._gsap.scaleX = e._gsap.scaleY = i
}, Zp = function(e, t, i, r, n) {
    var o = e._gsap;
    o.scaleX = o.scaleY = i,
    o.renderTransform(n, o)
}, Jp = function(e, t, i, r, n) {
    var o = e._gsap;
    o[t] = i,
    o.renderTransform(n, o)
}, yt = "transform", Ei = yt + "Origin", eh = function s(e, t) {
    var i = this
      , r = this.target
      , n = r.style
      , o = r._gsap;
    if (e in Rr && n) {
        if (this.tfm = this.tfm || {},
        e !== "transform")
            e = vr[e] || e,
            ~e.indexOf(",") ? e.split(",").forEach(function(l) {
                return i.tfm[l] = kr(r, l)
            }) : this.tfm[e] = o.x ? o[e] : kr(r, e),
            e === Ei && (this.tfm.zOrigin = o.zOrigin);
        else
            return vr.transform.split(",").forEach(function(l) {
                return s.call(i, l, t)
            });
        if (this.props.indexOf(yt) >= 0)
            return;
        o.svg && (this.svgo = r.getAttribute("data-svg-origin"),
        this.props.push(Ei, t, "")),
        e = yt
    }
    (n || t) && this.props.push(e, t, n[e])
}, rf = function(e) {
    e.translate && (e.removeProperty("translate"),
    e.removeProperty("scale"),
    e.removeProperty("rotate"))
}, th = function() {
    var e = this.props, t = this.target, i = t.style, r = t._gsap, n, o;
    for (n = 0; n < e.length; n += 3)
        e[n + 1] ? e[n + 1] === 2 ? t[e[n]](e[n + 2]) : t[e[n]] = e[n + 2] : e[n + 2] ? i[e[n]] = e[n + 2] : i.removeProperty(e[n].substr(0, 2) === "--" ? e[n] : e[n].replace(ql, "-$1").toLowerCase());
    if (this.tfm) {
        for (o in this.tfm)
            r[o] = this.tfm[o];
        r.svg && (r.renderTransform(),
        t.setAttribute("data-svg-origin", this.svgo || "")),
        n = Fl(),
        (!n || !n.isStart) && !i[yt] && (rf(i),
        r.zOrigin && i[Ei] && (i[Ei] += " " + r.zOrigin + "px",
        r.zOrigin = 0,
        r.renderTransform()),
        r.uncache = 1)
    }
}, nf = function(e, t) {
    var i = {
        target: e,
        props: [],
        revert: th,
        save: eh
    };
    return e._gsap || Ci.core.getCache(e),
    t && e.style && e.nodeType && t.split(",").forEach(function(r) {
        return i.save(r)
    }),
    i
}, sf, ll = function(e, t) {
    var i = Ur.createElementNS ? Ur.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Ur.createElement(e);
    return i && i.style ? i : Ur.createElement(e)
}, Ji = function s(e, t, i) {
    var r = getComputedStyle(e);
    return r[t] || r.getPropertyValue(t.replace(ql, "-$1").toLowerCase()) || r.getPropertyValue(t) || !i && s(e, cs(t) || t, 1) || ""
}, Mu = "O,Moz,ms,Ms,Webkit".split(","), cs = function(e, t, i) {
    var r = t || bn
      , n = r.style
      , o = 5;
    if (e in n && !i)
        return e;
    for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(Mu[o] + e in n); )
        ;
    return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? Mu[o] : "") + e
}, ul = function() {
    Bp() && window.document && (Tu = window,
    Ur = Tu.document,
    es = Ur.documentElement,
    bn = ll("div") || {
        style: {}
    },
    ll("div"),
    yt = cs(yt),
    Ei = yt + "Origin",
    bn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0",
    sf = !!cs("perspective"),
    Fl = Ci.core.reverting,
    Hl = 1)
}, Pu = function(e) {
    var t = e.ownerSVGElement, i = ll("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = e.cloneNode(!0), n;
    r.style.display = "block",
    i.appendChild(r),
    es.appendChild(i);
    try {
        n = r.getBBox()
    } catch {}
    return i.removeChild(r),
    es.removeChild(i),
    n
}, Au = function(e, t) {
    for (var i = t.length; i--; )
        if (e.hasAttribute(t[i]))
            return e.getAttribute(t[i])
}, af = function(e) {
    var t, i;
    try {
        t = e.getBBox()
    } catch {
        t = Pu(e),
        i = 1
    }
    return t && (t.width || t.height) || i || (t = Pu(e)),
    t && !t.width && !t.x && !t.y ? {
        x: +Au(e, ["x", "cx", "x1"]) || 0,
        y: +Au(e, ["y", "cy", "y1"]) || 0,
        width: 0,
        height: 0
    } : t
}, of = function(e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && af(e))
}, Ln = function(e, t) {
    if (t) {
        var i = e.style, r;
        t in Rr && t !== Ei && (t = yt),
        i.removeProperty ? (r = t.substr(0, 2),
        (r === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t),
        i.removeProperty(r === "--" ? t : t.replace(ql, "-$1").toLowerCase())) : i.removeAttribute(t)
    }
}, Kr = function(e, t, i, r, n, o) {
    var l = new Ti(e._pt,t,i,0,1,o ? tf : ef);
    return e._pt = l,
    l.b = r,
    l.e = n,
    e._props.push(i),
    l
}, ku = {
    deg: 1,
    rad: 1,
    turn: 1
}, ih = {
    grid: 1,
    flex: 1
}, sn = function s(e, t, i, r) {
    var n = parseFloat(i) || 0, o = (i + "").trim().substr((n + "").length) || "px", l = bn.style, c = jp.test(t), f = e.tagName.toLowerCase() === "svg", h = (f ? "client" : "offset") + (c ? "Width" : "Height"), w = 100, _ = r === "px", y = r === "%", g, p, S, T;
    if (r === o || !n || ku[r] || ku[o])
        return n;
    if (o !== "px" && !_ && (n = s(e, t, i, "px")),
    T = e.getCTM && of(e),
    (y || o === "%") && (Rr[t] || ~t.indexOf("adius")))
        return g = T ? e.getBBox()[c ? "width" : "height"] : e[h],
        Tt(y ? n / g * w : n / 100 * g);
    if (l[c ? "width" : "height"] = w + (_ ? o : r),
    p = r !== "rem" && ~t.indexOf("adius") || r === "em" && e.appendChild && !f ? e : e.parentNode,
    T && (p = (e.ownerSVGElement || {}).parentNode),
    (!p || p === Ur || !p.appendChild) && (p = Ur.body),
    S = p._gsap,
    S && y && S.width && c && S.time === Ri.time && !S.uncache)
        return Tt(n / S.width * w);
    if (y && (t === "height" || t === "width")) {
        var C = e.style[t];
        e.style[t] = w + r,
        g = e[h],
        C ? e.style[t] = C : Ln(e, t)
    } else
        (y || o === "%") && !ih[Ji(p, "display")] && (l.position = Ji(e, "position")),
        p === e && (l.position = "static"),
        p.appendChild(bn),
        g = bn[h],
        p.removeChild(bn),
        l.position = "absolute";
    return c && y && (S = Sn(p),
    S.time = Ri.time,
    S.width = p[h]),
    Tt(_ ? g * n / w : g && n ? w / g * n : 0)
}, kr = function(e, t, i, r) {
    var n;
    return Hl || ul(),
    t in vr && t !== "transform" && (t = vr[t],
    ~t.indexOf(",") && (t = t.split(",")[0])),
    Rr[t] && t !== "transform" ? (n = ea(e, r),
    n = t !== "transformOrigin" ? n[t] : n.svg ? n.origin : Xa(Ji(e, Ei)) + " " + n.zOrigin + "px") : (n = e.style[t],
    (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = ja[t] && ja[t](e, t, i) || Ji(e, t) || xc(e, t) || (t === "opacity" ? 1 : 0))),
    i && !~(n + "").trim().indexOf(" ") ? sn(e, t, n, i) + i : n
}, rh = function(e, t, i, r) {
    if (!i || i === "none") {
        var n = cs(t, e, 1)
          , o = n && Ji(e, n, 1);
        o && o !== i ? (t = n,
        i = o) : t === "borderColor" && (i = Ji(e, "borderTopColor"))
    }
    var l = new Ti(this._pt,e.style,t,0,1,Qc), c = 0, f = 0, h, w, _, y, g, p, S, T, C, E, P, k;
    if (l.b = i,
    l.e = r,
    i += "",
    r += "",
    r.substring(0, 6) === "var(--" && (r = Ji(e, r.substring(4, r.indexOf(")")))),
    r === "auto" && (p = e.style[t],
    e.style[t] = r,
    r = Ji(e, t) || r,
    p ? e.style[t] = p : Ln(e, t)),
    h = [i, r],
    qc(h),
    i = h[0],
    r = h[1],
    _ = i.match(Kn) || [],
    k = r.match(Kn) || [],
    k.length) {
        for (; w = Kn.exec(r); )
            S = w[0],
            C = r.substring(c, w.index),
            g ? g = (g + 1) % 5 : (C.substr(-5) === "rgba(" || C.substr(-5) === "hsla(") && (g = 1),
            S !== (p = _[f++] || "") && (y = parseFloat(p) || 0,
            P = p.substr((y + "").length),
            S.charAt(1) === "=" && (S = Jn(y, S) + P),
            T = parseFloat(S),
            E = S.substr((T + "").length),
            c = Kn.lastIndex - E.length,
            E || (E = E || Fi.units[t] || P,
            c === r.length && (r += E,
            l.e += E)),
            P !== E && (y = sn(e, t, p, E) || 0),
            l._pt = {
                _next: l._pt,
                p: C || f === 1 ? C : ",",
                s: y,
                c: T - y,
                m: g && g < 4 || t === "zIndex" ? Math.round : 0
            });
        l.c = c < r.length ? r.substring(c, r.length) : ""
    } else
        l.r = t === "display" && r === "none" ? tf : ef;
    return gc.test(r) && (l.e = 0),
    this._pt = l,
    l
}, Lu = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
}, nh = function(e) {
    var t = e.split(" ")
      , i = t[0]
      , r = t[1] || "50%";
    return (i === "top" || i === "bottom" || r === "left" || r === "right") && (e = i,
    i = r,
    r = e),
    t[0] = Lu[i] || i,
    t[1] = Lu[r] || r,
    t.join(" ")
}, sh = function(e, t) {
    if (t.tween && t.tween._time === t.tween._dur) {
        var i = t.t, r = i.style, n = t.u, o = i._gsap, l, c, f;
        if (n === "all" || n === !0)
            r.cssText = "",
            c = 1;
        else
            for (n = n.split(","),
            f = n.length; --f > -1; )
                l = n[f],
                Rr[l] && (c = 1,
                l = l === "transformOrigin" ? Ei : yt),
                Ln(i, l);
        c && (Ln(i, yt),
        o && (o.svg && i.removeAttribute("transform"),
        r.scale = r.rotate = r.translate = "none",
        ea(i, 1),
        o.uncache = 1,
        rf(r)))
    }
}, ja = {
    clearProps: function(e, t, i, r, n) {
        if (n.data !== "isFromStart") {
            var o = e._pt = new Ti(e._pt,t,i,0,0,sh);
            return o.u = r,
            o.pr = -10,
            o.tween = n,
            e._props.push(i),
            1
        }
    }
}, Js = [1, 0, 0, 1, 0, 0], lf = {}, uf = function(e) {
    return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e
}, Ou = function(e) {
    var t = Ji(e, yt);
    return uf(t) ? Js : t.substr(7).match(mc).map(Tt)
}, Bl = function(e, t) {
    var i = e._gsap || Sn(e), r = e.style, n = Ou(e), o, l, c, f;
    return i.svg && e.getAttribute("transform") ? (c = e.transform.baseVal.consolidate().matrix,
    n = [c.a, c.b, c.c, c.d, c.e, c.f],
    n.join(",") === "1,0,0,1,0,0" ? Js : n) : (n === Js && !e.offsetParent && e !== es && !i.svg && (c = r.display,
    r.display = "block",
    o = e.parentNode,
    (!o || !e.offsetParent && !e.getBoundingClientRect().width) && (f = 1,
    l = e.nextElementSibling,
    es.appendChild(e)),
    n = Ou(e),
    c ? r.display = c : Ln(e, "display"),
    f && (l ? o.insertBefore(e, l) : o ? o.appendChild(e) : es.removeChild(e))),
    t && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n)
}, cl = function(e, t, i, r, n, o) {
    var l = e._gsap, c = n || Bl(e, !0), f = l.xOrigin || 0, h = l.yOrigin || 0, w = l.xOffset || 0, _ = l.yOffset || 0, y = c[0], g = c[1], p = c[2], S = c[3], T = c[4], C = c[5], E = t.split(" "), P = parseFloat(E[0]) || 0, k = parseFloat(E[1]) || 0, R, d, N, L;
    i ? c !== Js && (d = y * S - g * p) && (N = P * (S / d) + k * (-p / d) + (p * C - S * T) / d,
    L = P * (-g / d) + k * (y / d) - (y * C - g * T) / d,
    P = N,
    k = L) : (R = af(e),
    P = R.x + (~E[0].indexOf("%") ? P / 100 * R.width : P),
    k = R.y + (~(E[1] || E[0]).indexOf("%") ? k / 100 * R.height : k)),
    r || r !== !1 && l.smooth ? (T = P - f,
    C = k - h,
    l.xOffset = w + (T * y + C * p) - T,
    l.yOffset = _ + (T * g + C * S) - C) : l.xOffset = l.yOffset = 0,
    l.xOrigin = P,
    l.yOrigin = k,
    l.smooth = !!r,
    l.origin = t,
    l.originIsAbsolute = !!i,
    e.style[Ei] = "0px 0px",
    o && (Kr(o, l, "xOrigin", f, P),
    Kr(o, l, "yOrigin", h, k),
    Kr(o, l, "xOffset", w, l.xOffset),
    Kr(o, l, "yOffset", _, l.yOffset)),
    e.setAttribute("data-svg-origin", P + " " + k)
}, ea = function(e, t) {
    var i = e._gsap || new Yc(e);
    if ("x"in i && !t && !i.uncache)
        return i;
    var r = e.style, n = i.scaleX < 0, o = "px", l = "deg", c = getComputedStyle(e), f = Ji(e, Ei) || "0", h, w, _, y, g, p, S, T, C, E, P, k, R, d, N, L, O, X, I, H, q, V, Q, F, Y, Z, $, he, Oe, nt, je, re;
    return h = w = _ = p = S = T = C = E = P = 0,
    y = g = 1,
    i.svg = !!(e.getCTM && of(e)),
    c.translate && ((c.translate !== "none" || c.scale !== "none" || c.rotate !== "none") && (r[yt] = (c.translate !== "none" ? "translate3d(" + (c.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (c.rotate !== "none" ? "rotate(" + c.rotate + ") " : "") + (c.scale !== "none" ? "scale(" + c.scale.split(" ").join(",") + ") " : "") + (c[yt] !== "none" ? c[yt] : "")),
    r.scale = r.rotate = r.translate = "none"),
    d = Bl(e, i.svg),
    i.svg && (i.uncache ? (Y = e.getBBox(),
    f = i.xOrigin - Y.x + "px " + (i.yOrigin - Y.y) + "px",
    F = "") : F = !t && e.getAttribute("data-svg-origin"),
    cl(e, F || f, !!F || i.originIsAbsolute, i.smooth !== !1, d)),
    k = i.xOrigin || 0,
    R = i.yOrigin || 0,
    d !== Js && (X = d[0],
    I = d[1],
    H = d[2],
    q = d[3],
    h = V = d[4],
    w = Q = d[5],
    d.length === 6 ? (y = Math.sqrt(X * X + I * I),
    g = Math.sqrt(q * q + H * H),
    p = X || I ? jn(I, X) * gn : 0,
    C = H || q ? jn(H, q) * gn + p : 0,
    C && (g *= Math.abs(Math.cos(C * ts))),
    i.svg && (h -= k - (k * X + R * H),
    w -= R - (k * I + R * q))) : (re = d[6],
    nt = d[7],
    $ = d[8],
    he = d[9],
    Oe = d[10],
    je = d[11],
    h = d[12],
    w = d[13],
    _ = d[14],
    N = jn(re, Oe),
    S = N * gn,
    N && (L = Math.cos(-N),
    O = Math.sin(-N),
    F = V * L + $ * O,
    Y = Q * L + he * O,
    Z = re * L + Oe * O,
    $ = V * -O + $ * L,
    he = Q * -O + he * L,
    Oe = re * -O + Oe * L,
    je = nt * -O + je * L,
    V = F,
    Q = Y,
    re = Z),
    N = jn(-H, Oe),
    T = N * gn,
    N && (L = Math.cos(-N),
    O = Math.sin(-N),
    F = X * L - $ * O,
    Y = I * L - he * O,
    Z = H * L - Oe * O,
    je = q * O + je * L,
    X = F,
    I = Y,
    H = Z),
    N = jn(I, X),
    p = N * gn,
    N && (L = Math.cos(N),
    O = Math.sin(N),
    F = X * L + I * O,
    Y = V * L + Q * O,
    I = I * L - X * O,
    Q = Q * L - V * O,
    X = F,
    V = Y),
    S && Math.abs(S) + Math.abs(p) > 359.9 && (S = p = 0,
    T = 180 - T),
    y = Tt(Math.sqrt(X * X + I * I + H * H)),
    g = Tt(Math.sqrt(Q * Q + re * re)),
    N = jn(V, Q),
    C = Math.abs(N) > 2e-4 ? N * gn : 0,
    P = je ? 1 / (je < 0 ? -je : je) : 0),
    i.svg && (F = e.getAttribute("transform"),
    i.forceCSS = e.setAttribute("transform", "") || !uf(Ji(e, yt)),
    F && e.setAttribute("transform", F))),
    Math.abs(C) > 90 && Math.abs(C) < 270 && (n ? (y *= -1,
    C += p <= 0 ? 180 : -180,
    p += p <= 0 ? 180 : -180) : (g *= -1,
    C += C <= 0 ? 180 : -180)),
    t = t || i.uncache,
    i.x = h - ((i.xPercent = h && (!t && i.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-h) ? -50 : 0))) ? e.offsetWidth * i.xPercent / 100 : 0) + o,
    i.y = w - ((i.yPercent = w && (!t && i.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-w) ? -50 : 0))) ? e.offsetHeight * i.yPercent / 100 : 0) + o,
    i.z = _ + o,
    i.scaleX = Tt(y),
    i.scaleY = Tt(g),
    i.rotation = Tt(p) + l,
    i.rotationX = Tt(S) + l,
    i.rotationY = Tt(T) + l,
    i.skewX = C + l,
    i.skewY = E + l,
    i.transformPerspective = P + o,
    (i.zOrigin = parseFloat(f.split(" ")[2]) || !t && i.zOrigin || 0) && (r[Ei] = Xa(f)),
    i.xOffset = i.yOffset = 0,
    i.force3D = Fi.force3D,
    i.renderTransform = i.svg ? oh : sf ? cf : ah,
    i.uncache = 0,
    i
}, Xa = function(e) {
    return (e = e.split(" "))[0] + " " + e[1]
}, ko = function(e, t, i) {
    var r = ri(t);
    return Tt(parseFloat(t) + parseFloat(sn(e, "x", i + "px", r))) + r
}, ah = function(e, t) {
    t.z = "0px",
    t.rotationY = t.rotationX = "0deg",
    t.force3D = 0,
    cf(e, t)
}, hn = "0deg", bs = "0px", mn = ") ", cf = function(e, t) {
    var i = t || this
      , r = i.xPercent
      , n = i.yPercent
      , o = i.x
      , l = i.y
      , c = i.z
      , f = i.rotation
      , h = i.rotationY
      , w = i.rotationX
      , _ = i.skewX
      , y = i.skewY
      , g = i.scaleX
      , p = i.scaleY
      , S = i.transformPerspective
      , T = i.force3D
      , C = i.target
      , E = i.zOrigin
      , P = ""
      , k = T === "auto" && e && e !== 1 || T === !0;
    if (E && (w !== hn || h !== hn)) {
        var R = parseFloat(h) * ts, d = Math.sin(R), N = Math.cos(R), L;
        R = parseFloat(w) * ts,
        L = Math.cos(R),
        o = ko(C, o, d * L * -E),
        l = ko(C, l, -Math.sin(R) * -E),
        c = ko(C, c, N * L * -E + E)
    }
    S !== bs && (P += "perspective(" + S + mn),
    (r || n) && (P += "translate(" + r + "%, " + n + "%) "),
    (k || o !== bs || l !== bs || c !== bs) && (P += c !== bs || k ? "translate3d(" + o + ", " + l + ", " + c + ") " : "translate(" + o + ", " + l + mn),
    f !== hn && (P += "rotate(" + f + mn),
    h !== hn && (P += "rotateY(" + h + mn),
    w !== hn && (P += "rotateX(" + w + mn),
    (_ !== hn || y !== hn) && (P += "skew(" + _ + ", " + y + mn),
    (g !== 1 || p !== 1) && (P += "scale(" + g + ", " + p + mn),
    C.style[yt] = P || "translate(0, 0)"
}, oh = function(e, t) {
    var i = t || this, r = i.xPercent, n = i.yPercent, o = i.x, l = i.y, c = i.rotation, f = i.skewX, h = i.skewY, w = i.scaleX, _ = i.scaleY, y = i.target, g = i.xOrigin, p = i.yOrigin, S = i.xOffset, T = i.yOffset, C = i.forceCSS, E = parseFloat(o), P = parseFloat(l), k, R, d, N, L;
    c = parseFloat(c),
    f = parseFloat(f),
    h = parseFloat(h),
    h && (h = parseFloat(h),
    f += h,
    c += h),
    c || f ? (c *= ts,
    f *= ts,
    k = Math.cos(c) * w,
    R = Math.sin(c) * w,
    d = Math.sin(c - f) * -_,
    N = Math.cos(c - f) * _,
    f && (h *= ts,
    L = Math.tan(f - h),
    L = Math.sqrt(1 + L * L),
    d *= L,
    N *= L,
    h && (L = Math.tan(h),
    L = Math.sqrt(1 + L * L),
    k *= L,
    R *= L)),
    k = Tt(k),
    R = Tt(R),
    d = Tt(d),
    N = Tt(N)) : (k = w,
    N = _,
    R = d = 0),
    (E && !~(o + "").indexOf("px") || P && !~(l + "").indexOf("px")) && (E = sn(y, "x", o, "px"),
    P = sn(y, "y", l, "px")),
    (g || p || S || T) && (E = Tt(E + g - (g * k + p * d) + S),
    P = Tt(P + p - (g * R + p * N) + T)),
    (r || n) && (L = y.getBBox(),
    E = Tt(E + r / 100 * L.width),
    P = Tt(P + n / 100 * L.height)),
    L = "matrix(" + k + "," + R + "," + d + "," + N + "," + E + "," + P + ")",
    y.setAttribute("transform", L),
    C && (y.style[yt] = L)
}, lh = function(e, t, i, r, n) {
    var o = 360, l = Xt(n), c = parseFloat(n) * (l && ~n.indexOf("rad") ? gn : 1), f = c - r, h = r + f + "deg", w, _;
    return l && (w = n.split("_")[1],
    w === "short" && (f %= o,
    f !== f % (o / 2) && (f += f < 0 ? o : -o)),
    w === "cw" && f < 0 ? f = (f + o * Cu) % o - ~~(f / o) * o : w === "ccw" && f > 0 && (f = (f - o * Cu) % o - ~~(f / o) * o)),
    e._pt = _ = new Ti(e._pt,t,i,r,f,Yp),
    _.e = h,
    _.u = "deg",
    e._props.push(i),
    _
}, Du = function(e, t) {
    for (var i in t)
        e[i] = t[i];
    return e
}, uh = function(e, t, i) {
    var r = Du({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, l, c, f, h, w, _, y, g;
    r.svg ? (f = i.getAttribute("transform"),
    i.setAttribute("transform", ""),
    o[yt] = t,
    l = ea(i, 1),
    Ln(i, yt),
    i.setAttribute("transform", f)) : (f = getComputedStyle(i)[yt],
    o[yt] = t,
    l = ea(i, 1),
    o[yt] = f);
    for (c in Rr)
        f = r[c],
        h = l[c],
        f !== h && n.indexOf(c) < 0 && (y = ri(f),
        g = ri(h),
        w = y !== g ? sn(i, c, f, g) : parseFloat(f),
        _ = parseFloat(h),
        e._pt = new Ti(e._pt,l,c,w,_ - w,ol),
        e._pt.u = g || 0,
        e._props.push(c));
    Du(l, r)
};
Si("padding,margin,Width,Radius", function(s, e) {
    var t = "Top"
      , i = "Right"
      , r = "Bottom"
      , n = "Left"
      , o = (e < 3 ? [t, i, r, n] : [t + n, t + i, r + i, r + n]).map(function(l) {
        return e < 2 ? s + l : "border" + l + s
    });
    ja[e > 1 ? "border" + s : s] = function(l, c, f, h, w) {
        var _, y;
        if (arguments.length < 4)
            return _ = o.map(function(g) {
                return kr(l, g, f)
            }),
            y = _.join(" "),
            y.split(_[0]).length === 5 ? _[0] : y;
        _ = (h + "").split(" "),
        y = {},
        o.forEach(function(g, p) {
            return y[g] = _[p] = _[p] || _[(p - 1) / 2 | 0]
        }),
        l.init(c, y, w)
    }
});
var ff = {
    name: "css",
    register: ul,
    targetTest: function(e) {
        return e.style && e.nodeType
    },
    init: function(e, t, i, r, n) {
        var o = this._props, l = e.style, c = i.vars.startAt, f, h, w, _, y, g, p, S, T, C, E, P, k, R, d, N;
        Hl || ul(),
        this.styles = this.styles || nf(e),
        N = this.styles.props,
        this.tween = i;
        for (p in t)
            if (p !== "autoRound" && (h = t[p],
            !(Di[p] && Wc(p, t, i, r, e, n)))) {
                if (y = typeof h,
                g = ja[p],
                y === "function" && (h = h.call(i, r, e, n),
                y = typeof h),
                y === "string" && ~h.indexOf("random(") && (h = Ks(h)),
                g)
                    g(this, e, p, h, i) && (d = 1);
                else if (p.substr(0, 2) === "--")
                    f = (getComputedStyle(e).getPropertyValue(p) + "").trim(),
                    h += "",
                    tn.lastIndex = 0,
                    tn.test(f) || (S = ri(f),
                    T = ri(h)),
                    T ? S !== T && (f = sn(e, p, f, T) + T) : S && (h += S),
                    this.add(l, "setProperty", f, h, r, n, 0, 0, p),
                    o.push(p),
                    N.push(p, 0, l[p]);
                else if (y !== "undefined") {
                    if (c && p in c ? (f = typeof c[p] == "function" ? c[p].call(i, r, e, n) : c[p],
                    Xt(f) && ~f.indexOf("random(") && (f = Ks(f)),
                    ri(f + "") || f === "auto" || (f += Fi.units[p] || ri(kr(e, p)) || ""),
                    (f + "").charAt(1) === "=" && (f = kr(e, p))) : f = kr(e, p),
                    _ = parseFloat(f),
                    C = y === "string" && h.charAt(1) === "=" && h.substr(0, 2),
                    C && (h = h.substr(2)),
                    w = parseFloat(h),
                    p in vr && (p === "autoAlpha" && (_ === 1 && kr(e, "visibility") === "hidden" && w && (_ = 0),
                    N.push("visibility", 0, l.visibility),
                    Kr(this, l, "visibility", _ ? "inherit" : "hidden", w ? "inherit" : "hidden", !w)),
                    p !== "scale" && p !== "transform" && (p = vr[p],
                    ~p.indexOf(",") && (p = p.split(",")[0]))),
                    E = p in Rr,
                    E) {
                        if (this.styles.save(p),
                        y === "string" && h.substring(0, 6) === "var(--" && (h = Ji(e, h.substring(4, h.indexOf(")"))),
                        w = parseFloat(h)),
                        P || (k = e._gsap,
                        k.renderTransform && !t.parseTransform || ea(e, t.parseTransform),
                        R = t.smoothOrigin !== !1 && k.smooth,
                        P = this._pt = new Ti(this._pt,l,yt,0,1,k.renderTransform,k,0,-1),
                        P.dep = 1),
                        p === "scale")
                            this._pt = new Ti(this._pt,k,"scaleY",k.scaleY,(C ? Jn(k.scaleY, C + w) : w) - k.scaleY || 0,ol),
                            this._pt.u = 0,
                            o.push("scaleY", p),
                            p += "X";
                        else if (p === "transformOrigin") {
                            N.push(Ei, 0, l[Ei]),
                            h = nh(h),
                            k.svg ? cl(e, h, 0, R, 0, this) : (T = parseFloat(h.split(" ")[2]) || 0,
                            T !== k.zOrigin && Kr(this, k, "zOrigin", k.zOrigin, T),
                            Kr(this, l, p, Xa(f), Xa(h)));
                            continue
                        } else if (p === "svgOrigin") {
                            cl(e, h, 1, R, 0, this);
                            continue
                        } else if (p in lf) {
                            lh(this, k, p, _, C ? Jn(_, C + h) : h);
                            continue
                        } else if (p === "smoothOrigin") {
                            Kr(this, k, "smooth", k.smooth, h);
                            continue
                        } else if (p === "force3D") {
                            k[p] = h;
                            continue
                        } else if (p === "transform") {
                            uh(this, h, e);
                            continue
                        }
                    } else
                        p in l || (p = cs(p) || p);
                    if (E || (w || w === 0) && (_ || _ === 0) && !Xp.test(h) && p in l)
                        S = (f + "").substr((_ + "").length),
                        w || (w = 0),
                        T = ri(h) || (p in Fi.units ? Fi.units[p] : S),
                        S !== T && (_ = sn(e, p, f, T)),
                        this._pt = new Ti(this._pt,E ? k : l,p,_,(C ? Jn(_, C + w) : w) - _,!E && (T === "px" || p === "zIndex") && t.autoRound !== !1 ? Gp : ol),
                        this._pt.u = T || 0,
                        S !== T && T !== "%" && (this._pt.b = f,
                        this._pt.r = Wp);
                    else if (p in l)
                        rh.call(this, e, p, f, C ? C + h : h);
                    else if (p in e)
                        this.add(e, p, f || e[p], C ? C + h : h, r, n);
                    else if (p !== "parseTransform") {
                        Al(p, h);
                        continue
                    }
                    E || (p in l ? N.push(p, 0, l[p]) : typeof e[p] == "function" ? N.push(p, 2, e[p]()) : N.push(p, 1, f || e[p])),
                    o.push(p)
                }
            }
        d && Zc(this)
    },
    render: function(e, t) {
        if (t.tween._time || !Fl())
            for (var i = t._pt; i; )
                i.r(e, i.d),
                i = i._next;
        else
            t.styles.revert()
    },
    get: kr,
    aliases: vr,
    getSetter: function(e, t, i) {
        var r = vr[t];
        return r && r.indexOf(",") < 0 && (t = r),
        t in Rr && t !== Ei && (e._gsap.x || kr(e, "x")) ? i && Eu === i ? t === "scale" ? Qp : Kp : (Eu = i || {}) && (t === "scale" ? Zp : Jp) : e.style && !Cl(e.style[t]) ? Vp : ~t.indexOf("-") ? Up : Nl(e, t)
    },
    core: {
        _removeProperty: Ln,
        _getMatrix: Bl
    }
};
Ci.utils.checkPrefix = cs;
Ci.core.getStyleSaver = nf;
(function(s, e, t, i) {
    var r = Si(s + "," + e + "," + t, function(n) {
        Rr[n] = 1
    });
    Si(e, function(n) {
        Fi.units[n] = "deg",
        lf[n] = 1
    }),
    vr[r[13]] = s + "," + e,
    Si(i, function(n) {
        var o = n.split(":");
        vr[o[1]] = r[o[0]]
    })
}
)("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Si("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(s) {
    Fi.units[s] = "px"
});
Ci.registerPlugin(ff);
var Ze = Ci.registerPlugin(ff) || Ci;
Ze.core.Tween;
function ch(s=500) {
    return new Promise(e => {
        const t = performance.now()
          , i = .01;
        let r = window.scrollY
          , n = performance.now();
        const o = () => {
            const l = window.scrollY;
            Math.abs(l - r) > i && (n = performance.now()),
            r = l,
            performance.now() - n > 100 || performance.now() - t > s ? e() : requestAnimationFrame(o)
        }
        ;
        requestAnimationFrame(o)
    }
    )
}
const fh = [{
    name: "default-transition",
    async leave(s) {
        return await ch(),
        new Promise(e => {
            Ze.to(s.current.container, {
                opacity: 0,
                duration: .3,
                onComplete: e
            })
        }
        )
    },
    enter(s) {
        Ze.from(s.next.container, {
            opacity: 0,
            duration: 1
        })
    }
}];
function Iu(s) {
    return s !== null && typeof s == "object" && "constructor"in s && s.constructor === Object
}
function jl(s, e) {
    s === void 0 && (s = {}),
    e === void 0 && (e = {});
    const t = ["__proto__", "constructor", "prototype"];
    Object.keys(e).filter(i => t.indexOf(i) < 0).forEach(i => {
        typeof s[i] > "u" ? s[i] = e[i] : Iu(e[i]) && Iu(s[i]) && Object.keys(e[i]).length > 0 && jl(s[i], e[i])
    }
    )
}
const df = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: {
        blur() {},
        nodeName: ""
    },
    querySelector() {
        return null
    },
    querySelectorAll() {
        return []
    },
    getElementById() {
        return null
    },
    createEvent() {
        return {
            initEvent() {}
        }
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName() {
                return []
            }
        }
    },
    createElementNS() {
        return {}
    },
    importNode() {
        return null
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};
function jt() {
    const s = typeof document < "u" ? document : {};
    return jl(s, df),
    s
}
const dh = {
    document: df,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() {},
        pushState() {},
        go() {},
        back() {}
    },
    CustomEvent: function() {
        return this
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle() {
        return {
            getPropertyValue() {
                return ""
            }
        }
    },
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia() {
        return {}
    },
    requestAnimationFrame(s) {
        return typeof setTimeout > "u" ? (s(),
        null) : setTimeout(s, 0)
    },
    cancelAnimationFrame(s) {
        typeof setTimeout > "u" || clearTimeout(s)
    }
};
function ht() {
    const s = typeof window < "u" ? window : {};
    return jl(s, dh),
    s
}
function jr(s) {
    return s === void 0 && (s = ""),
    s.trim().split(" ").filter(e => !!e.trim())
}
function ph(s) {
    const e = s;
    Object.keys(e).forEach(t => {
        try {
            e[t] = null
        } catch {}
        try {
            delete e[t]
        } catch {}
    }
    )
}
function On(s, e) {
    return e === void 0 && (e = 0),
    setTimeout(s, e)
}
function Ki() {
    return Date.now()
}
function hh(s) {
    const e = ht();
    let t;
    return e.getComputedStyle && (t = e.getComputedStyle(s, null)),
    !t && s.currentStyle && (t = s.currentStyle),
    t || (t = s.style),
    t
}
function fl(s, e) {
    e === void 0 && (e = "x");
    const t = ht();
    let i, r, n;
    const o = hh(s);
    return t.WebKitCSSMatrix ? (r = o.transform || o.webkitTransform,
    r.split(",").length > 6 && (r = r.split(", ").map(l => l.replace(",", ".")).join(", ")),
    n = new t.WebKitCSSMatrix(r === "none" ? "" : r)) : (n = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
    i = n.toString().split(",")),
    e === "x" && (t.WebKitCSSMatrix ? r = n.m41 : i.length === 16 ? r = parseFloat(i[12]) : r = parseFloat(i[4])),
    e === "y" && (t.WebKitCSSMatrix ? r = n.m42 : i.length === 16 ? r = parseFloat(i[13]) : r = parseFloat(i[5])),
    r || 0
}
function Cs(s) {
    return typeof s == "object" && s !== null && s.constructor && Object.prototype.toString.call(s).slice(8, -1) === "Object"
}
function mh(s) {
    return typeof window < "u" && typeof window.HTMLElement < "u" ? s instanceof HTMLElement : s && (s.nodeType === 1 || s.nodeType === 11)
}
function Ii() {
    const s = Object(arguments.length <= 0 ? void 0 : arguments[0])
      , e = ["__proto__", "constructor", "prototype"];
    for (let t = 1; t < arguments.length; t += 1) {
        const i = t < 0 || arguments.length <= t ? void 0 : arguments[t];
        if (i != null && !mh(i)) {
            const r = Object.keys(Object(i)).filter(n => e.indexOf(n) < 0);
            for (let n = 0, o = r.length; n < o; n += 1) {
                const l = r[n]
                  , c = Object.getOwnPropertyDescriptor(i, l);
                c !== void 0 && c.enumerable && (Cs(s[l]) && Cs(i[l]) ? i[l].__swiper__ ? s[l] = i[l] : Ii(s[l], i[l]) : !Cs(s[l]) && Cs(i[l]) ? (s[l] = {},
                i[l].__swiper__ ? s[l] = i[l] : Ii(s[l], i[l])) : s[l] = i[l])
            }
        }
    }
    return s
}
function Ms(s, e, t) {
    s.style.setProperty(e, t)
}
function pf(s) {
    let {swiper: e, targetPosition: t, side: i} = s;
    const r = ht()
      , n = -e.translate;
    let o = null, l;
    const c = e.params.speed;
    e.wrapperEl.style.scrollSnapType = "none",
    r.cancelAnimationFrame(e.cssModeFrameID);
    const f = t > n ? "next" : "prev"
      , h = (_, y) => f === "next" && _ >= y || f === "prev" && _ <= y
      , w = () => {
        l = new Date().getTime(),
        o === null && (o = l);
        const _ = Math.max(Math.min((l - o) / c, 1), 0)
          , y = .5 - Math.cos(_ * Math.PI) / 2;
        let g = n + y * (t - n);
        if (h(g, t) && (g = t),
        e.wrapperEl.scrollTo({
            [i]: g
        }),
        h(g, t)) {
            e.wrapperEl.style.overflow = "hidden",
            e.wrapperEl.style.scrollSnapType = "",
            setTimeout( () => {
                e.wrapperEl.style.overflow = "",
                e.wrapperEl.scrollTo({
                    [i]: g
                })
            }
            ),
            r.cancelAnimationFrame(e.cssModeFrameID);
            return
        }
        e.cssModeFrameID = r.requestAnimationFrame(w)
    }
    ;
    w()
}
function Nn(s) {
    return s.querySelector(".swiper-slide-transform") || s.shadowRoot && s.shadowRoot.querySelector(".swiper-slide-transform") || s
}
function Ut(s, e) {
    e === void 0 && (e = "");
    const t = ht()
      , i = [...s.children];
    return t.HTMLSlotElement && s instanceof HTMLSlotElement && i.push(...s.assignedElements()),
    e ? i.filter(r => r.matches(e)) : i
}
function gh(s, e) {
    const t = [e];
    for (; t.length > 0; ) {
        const i = t.shift();
        if (s === i)
            return !0;
        t.push(...i.children, ...i.shadowRoot ? i.shadowRoot.children : [], ...i.assignedElements ? i.assignedElements() : [])
    }
}
function vh(s, e) {
    const t = ht();
    let i = e.contains(s);
    return !i && t.HTMLSlotElement && e instanceof HTMLSlotElement && (i = [...e.assignedElements()].includes(s),
    i || (i = gh(s, e))),
    i
}
function Ya(s) {
    try {
        console.warn(s);
        return
    } catch {}
}
function Hi(s, e) {
    e === void 0 && (e = []);
    const t = document.createElement(s);
    return t.classList.add(...Array.isArray(e) ? e : jr(e)),
    t
}
function Wa(s) {
    const e = ht()
      , t = jt()
      , i = s.getBoundingClientRect()
      , r = t.body
      , n = s.clientTop || r.clientTop || 0
      , o = s.clientLeft || r.clientLeft || 0
      , l = s === e ? e.scrollY : s.scrollTop
      , c = s === e ? e.scrollX : s.scrollLeft;
    return {
        top: i.top + l - n,
        left: i.left + c - o
    }
}
function yh(s, e) {
    const t = [];
    for (; s.previousElementSibling; ) {
        const i = s.previousElementSibling;
        e ? i.matches(e) && t.push(i) : t.push(i),
        s = i
    }
    return t
}
function wh(s, e) {
    const t = [];
    for (; s.nextElementSibling; ) {
        const i = s.nextElementSibling;
        e ? i.matches(e) && t.push(i) : t.push(i),
        s = i
    }
    return t
}
function Qr(s, e) {
    return ht().getComputedStyle(s, null).getPropertyValue(e)
}
function ta(s) {
    let e = s, t;
    if (e) {
        for (t = 0; (e = e.previousSibling) !== null; )
            e.nodeType === 1 && (t += 1);
        return t
    }
}
function Mn(s, e) {
    const t = [];
    let i = s.parentElement;
    for (; i; )
        e ? i.matches(e) && t.push(i) : t.push(i),
        i = i.parentElement;
    return t
}
function Rs(s, e) {
    function t(i) {
        i.target === s && (e.call(s, i),
        s.removeEventListener("transitionend", t))
    }
    e && s.addEventListener("transitionend", t)
}
function dl(s, e, t) {
    const i = ht();
    return s[e === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(s, null).getPropertyValue(e === "width" ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(s, null).getPropertyValue(e === "width" ? "margin-left" : "margin-bottom"))
}
function Re(s) {
    return (Array.isArray(s) ? s : [s]).filter(e => !!e)
}
function io(s) {
    return e => Math.abs(e) > 0 && s.browser && s.browser.need3dFix && Math.abs(e) % 90 === 0 ? e + .001 : e
}
function Nr(s, e) {
    e === void 0 && (e = ""),
    typeof trustedTypes < "u" ? s.innerHTML = trustedTypes.createPolicy("html", {
        createHTML: t => t
    }).createHTML(e) : s.innerHTML = e
}
let Lo;
function _h() {
    const s = ht()
      , e = jt();
    return {
        smoothScroll: e.documentElement && e.documentElement.style && "scrollBehavior"in e.documentElement.style,
        touch: !!("ontouchstart"in s || s.DocumentTouch && e instanceof s.DocumentTouch)
    }
}
function hf() {
    return Lo || (Lo = _h()),
    Lo
}
let Oo;
function bh(s) {
    let {userAgent: e} = s === void 0 ? {} : s;
    const t = hf()
      , i = ht()
      , r = i.navigator.platform
      , n = e || i.navigator.userAgent
      , o = {
        ios: !1,
        android: !1
    }
      , l = i.screen.width
      , c = i.screen.height
      , f = n.match(/(Android);?[\s\/]+([\d.]+)?/);
    let h = n.match(/(iPad).*OS\s([\d_]+)/);
    const w = n.match(/(iPod)(.*OS\s([\d_]+))?/)
      , _ = !h && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
      , y = r === "Win32";
    let g = r === "MacIntel";
    const p = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    return !h && g && t.touch && p.indexOf(`${l}x${c}`) >= 0 && (h = n.match(/(Version)\/([\d.]+)/),
    h || (h = [0, 1, "13_0_0"]),
    g = !1),
    f && !y && (o.os = "android",
    o.android = !0),
    (h || _ || w) && (o.os = "ios",
    o.ios = !0),
    o
}
function mf(s) {
    return s === void 0 && (s = {}),
    Oo || (Oo = bh(s)),
    Oo
}
let Do;
function xh() {
    const s = ht()
      , e = mf();
    let t = !1;
    function i() {
        const l = s.navigator.userAgent.toLowerCase();
        return l.indexOf("safari") >= 0 && l.indexOf("chrome") < 0 && l.indexOf("android") < 0
    }
    if (i()) {
        const l = String(s.navigator.userAgent);
        if (l.includes("Version/")) {
            const [c,f] = l.split("Version/")[1].split(" ")[0].split(".").map(h => Number(h));
            t = c < 16 || c === 16 && f < 2
        }
    }
    const r = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(s.navigator.userAgent)
      , n = i()
      , o = n || r && e.ios;
    return {
        isSafari: t || n,
        needPerspectiveFix: t,
        need3dFix: o,
        isWebView: r
    }
}
function gf() {
    return Do || (Do = xh()),
    Do
}
function Sh(s) {
    let {swiper: e, on: t, emit: i} = s;
    const r = ht();
    let n = null
      , o = null;
    const l = () => {
        !e || e.destroyed || !e.initialized || (i("beforeResize"),
        i("resize"))
    }
      , c = () => {
        !e || e.destroyed || !e.initialized || (n = new ResizeObserver(w => {
            o = r.requestAnimationFrame( () => {
                const {width: _, height: y} = e;
                let g = _
                  , p = y;
                w.forEach(S => {
                    let {contentBoxSize: T, contentRect: C, target: E} = S;
                    E && E !== e.el || (g = C ? C.width : (T[0] || T).inlineSize,
                    p = C ? C.height : (T[0] || T).blockSize)
                }
                ),
                (g !== _ || p !== y) && l()
            }
            )
        }
        ),
        n.observe(e.el))
    }
      , f = () => {
        o && r.cancelAnimationFrame(o),
        n && n.unobserve && e.el && (n.unobserve(e.el),
        n = null)
    }
      , h = () => {
        !e || e.destroyed || !e.initialized || i("orientationchange")
    }
    ;
    t("init", () => {
        if (e.params.resizeObserver && typeof r.ResizeObserver < "u") {
            c();
            return
        }
        r.addEventListener("resize", l),
        r.addEventListener("orientationchange", h)
    }
    ),
    t("destroy", () => {
        f(),
        r.removeEventListener("resize", l),
        r.removeEventListener("orientationchange", h)
    }
    )
}
function Th(s) {
    let {swiper: e, extendParams: t, on: i, emit: r} = s;
    const n = []
      , o = ht()
      , l = function(h, w) {
        w === void 0 && (w = {});
        const _ = o.MutationObserver || o.WebkitMutationObserver
          , y = new _(g => {
            if (e.__preventObserver__)
                return;
            if (g.length === 1) {
                r("observerUpdate", g[0]);
                return
            }
            const p = function() {
                r("observerUpdate", g[0])
            };
            o.requestAnimationFrame ? o.requestAnimationFrame(p) : o.setTimeout(p, 0)
        }
        );
        y.observe(h, {
            attributes: typeof w.attributes > "u" ? !0 : w.attributes,
            childList: e.isElement || (typeof w.childList > "u" ? !0 : w).childList,
            characterData: typeof w.characterData > "u" ? !0 : w.characterData
        }),
        n.push(y)
    }
      , c = () => {
        if (e.params.observer) {
            if (e.params.observeParents) {
                const h = Mn(e.hostEl);
                for (let w = 0; w < h.length; w += 1)
                    l(h[w])
            }
            l(e.hostEl, {
                childList: e.params.observeSlideChildren
            }),
            l(e.wrapperEl, {
                attributes: !1
            })
        }
    }
      , f = () => {
        n.forEach(h => {
            h.disconnect()
        }
        ),
        n.splice(0, n.length)
    }
    ;
    t({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
    }),
    i("init", c),
    i("destroy", f)
}
var Eh = {
    on(s, e, t) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof e != "function")
            return i;
        const r = t ? "unshift" : "push";
        return s.split(" ").forEach(n => {
            i.eventsListeners[n] || (i.eventsListeners[n] = []),
            i.eventsListeners[n][r](e)
        }
        ),
        i
    },
    once(s, e, t) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof e != "function")
            return i;
        function r() {
            i.off(s, r),
            r.__emitterProxy && delete r.__emitterProxy;
            for (var n = arguments.length, o = new Array(n), l = 0; l < n; l++)
                o[l] = arguments[l];
            e.apply(i, o)
        }
        return r.__emitterProxy = e,
        i.on(s, r, t)
    },
    onAny(s, e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed || typeof s != "function")
            return t;
        const i = e ? "unshift" : "push";
        return t.eventsAnyListeners.indexOf(s) < 0 && t.eventsAnyListeners[i](s),
        t
    },
    offAny(s) {
        const e = this;
        if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners)
            return e;
        const t = e.eventsAnyListeners.indexOf(s);
        return t >= 0 && e.eventsAnyListeners.splice(t, 1),
        e
    },
    off(s, e) {
        const t = this;
        return !t.eventsListeners || t.destroyed || !t.eventsListeners || s.split(" ").forEach(i => {
            typeof e > "u" ? t.eventsListeners[i] = [] : t.eventsListeners[i] && t.eventsListeners[i].forEach( (r, n) => {
                (r === e || r.__emitterProxy && r.__emitterProxy === e) && t.eventsListeners[i].splice(n, 1)
            }
            )
        }
        ),
        t
    },
    emit() {
        const s = this;
        if (!s.eventsListeners || s.destroyed || !s.eventsListeners)
            return s;
        let e, t, i;
        for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++)
            n[o] = arguments[o];
        return typeof n[0] == "string" || Array.isArray(n[0]) ? (e = n[0],
        t = n.slice(1, n.length),
        i = s) : (e = n[0].events,
        t = n[0].data,
        i = n[0].context || s),
        t.unshift(i),
        (Array.isArray(e) ? e : e.split(" ")).forEach(c => {
            s.eventsAnyListeners && s.eventsAnyListeners.length && s.eventsAnyListeners.forEach(f => {
                f.apply(i, [c, ...t])
            }
            ),
            s.eventsListeners && s.eventsListeners[c] && s.eventsListeners[c].forEach(f => {
                f.apply(i, t)
            }
            )
        }
        ),
        s
    }
};
function Ch() {
    const s = this;
    let e, t;
    const i = s.el;
    typeof s.params.width < "u" && s.params.width !== null ? e = s.params.width : e = i.clientWidth,
    typeof s.params.height < "u" && s.params.height !== null ? t = s.params.height : t = i.clientHeight,
    !(e === 0 && s.isHorizontal() || t === 0 && s.isVertical()) && (e = e - parseInt(Qr(i, "padding-left") || 0, 10) - parseInt(Qr(i, "padding-right") || 0, 10),
    t = t - parseInt(Qr(i, "padding-top") || 0, 10) - parseInt(Qr(i, "padding-bottom") || 0, 10),
    Number.isNaN(e) && (e = 0),
    Number.isNaN(t) && (t = 0),
    Object.assign(s, {
        width: e,
        height: t,
        size: s.isHorizontal() ? e : t
    }))
}
function Mh() {
    const s = this;
    function e(O, X) {
        return parseFloat(O.getPropertyValue(s.getDirectionLabel(X)) || 0)
    }
    const t = s.params
      , {wrapperEl: i, slidesEl: r, size: n, rtlTranslate: o, wrongRTL: l} = s
      , c = s.virtual && t.virtual.enabled
      , f = c ? s.virtual.slides.length : s.slides.length
      , h = Ut(r, `.${s.params.slideClass}, swiper-slide`)
      , w = c ? s.virtual.slides.length : h.length;
    let _ = [];
    const y = []
      , g = [];
    let p = t.slidesOffsetBefore;
    typeof p == "function" && (p = t.slidesOffsetBefore.call(s));
    let S = t.slidesOffsetAfter;
    typeof S == "function" && (S = t.slidesOffsetAfter.call(s));
    const T = s.snapGrid.length
      , C = s.slidesGrid.length;
    let E = t.spaceBetween
      , P = -p
      , k = 0
      , R = 0;
    if (typeof n > "u")
        return;
    typeof E == "string" && E.indexOf("%") >= 0 ? E = parseFloat(E.replace("%", "")) / 100 * n : typeof E == "string" && (E = parseFloat(E)),
    s.virtualSize = -E,
    h.forEach(O => {
        o ? O.style.marginLeft = "" : O.style.marginRight = "",
        O.style.marginBottom = "",
        O.style.marginTop = ""
    }
    ),
    t.centeredSlides && t.cssMode && (Ms(i, "--swiper-centered-offset-before", ""),
    Ms(i, "--swiper-centered-offset-after", ""));
    const d = t.grid && t.grid.rows > 1 && s.grid;
    d ? s.grid.initSlides(h) : s.grid && s.grid.unsetSlides();
    let N;
    const L = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter(O => typeof t.breakpoints[O].slidesPerView < "u").length > 0;
    for (let O = 0; O < w; O += 1) {
        N = 0;
        let X;
        if (h[O] && (X = h[O]),
        d && s.grid.updateSlide(O, X, h),
        !(h[O] && Qr(X, "display") === "none")) {
            if (t.slidesPerView === "auto") {
                L && (h[O].style[s.getDirectionLabel("width")] = "");
                const I = getComputedStyle(X)
                  , H = X.style.transform
                  , q = X.style.webkitTransform;
                if (H && (X.style.transform = "none"),
                q && (X.style.webkitTransform = "none"),
                t.roundLengths)
                    N = s.isHorizontal() ? dl(X, "width") : dl(X, "height");
                else {
                    const V = e(I, "width")
                      , Q = e(I, "padding-left")
                      , F = e(I, "padding-right")
                      , Y = e(I, "margin-left")
                      , Z = e(I, "margin-right")
                      , $ = I.getPropertyValue("box-sizing");
                    if ($ && $ === "border-box")
                        N = V + Y + Z;
                    else {
                        const {clientWidth: he, offsetWidth: Oe} = X;
                        N = V + Q + F + Y + Z + (Oe - he)
                    }
                }
                H && (X.style.transform = H),
                q && (X.style.webkitTransform = q),
                t.roundLengths && (N = Math.floor(N))
            } else
                N = (n - (t.slidesPerView - 1) * E) / t.slidesPerView,
                t.roundLengths && (N = Math.floor(N)),
                h[O] && (h[O].style[s.getDirectionLabel("width")] = `${N}px`);
            h[O] && (h[O].swiperSlideSize = N),
            g.push(N),
            t.centeredSlides ? (P = P + N / 2 + k / 2 + E,
            k === 0 && O !== 0 && (P = P - n / 2 - E),
            O === 0 && (P = P - n / 2 - E),
            Math.abs(P) < 1 / 1e3 && (P = 0),
            t.roundLengths && (P = Math.floor(P)),
            R % t.slidesPerGroup === 0 && _.push(P),
            y.push(P)) : (t.roundLengths && (P = Math.floor(P)),
            (R - Math.min(s.params.slidesPerGroupSkip, R)) % s.params.slidesPerGroup === 0 && _.push(P),
            y.push(P),
            P = P + N + E),
            s.virtualSize += N + E,
            k = N,
            R += 1
        }
    }
    if (s.virtualSize = Math.max(s.virtualSize, n) + S,
    o && l && (t.effect === "slide" || t.effect === "coverflow") && (i.style.width = `${s.virtualSize + E}px`),
    t.setWrapperSize && (i.style[s.getDirectionLabel("width")] = `${s.virtualSize + E}px`),
    d && s.grid.updateWrapperSize(N, _),
    !t.centeredSlides) {
        const O = [];
        for (let X = 0; X < _.length; X += 1) {
            let I = _[X];
            t.roundLengths && (I = Math.floor(I)),
            _[X] <= s.virtualSize - n && O.push(I)
        }
        _ = O,
        Math.floor(s.virtualSize - n) - Math.floor(_[_.length - 1]) > 1 && _.push(s.virtualSize - n)
    }
    if (c && t.loop) {
        const O = g[0] + E;
        if (t.slidesPerGroup > 1) {
            const X = Math.ceil((s.virtual.slidesBefore + s.virtual.slidesAfter) / t.slidesPerGroup)
              , I = O * t.slidesPerGroup;
            for (let H = 0; H < X; H += 1)
                _.push(_[_.length - 1] + I)
        }
        for (let X = 0; X < s.virtual.slidesBefore + s.virtual.slidesAfter; X += 1)
            t.slidesPerGroup === 1 && _.push(_[_.length - 1] + O),
            y.push(y[y.length - 1] + O),
            s.virtualSize += O
    }
    if (_.length === 0 && (_ = [0]),
    E !== 0) {
        const O = s.isHorizontal() && o ? "marginLeft" : s.getDirectionLabel("marginRight");
        h.filter( (X, I) => !t.cssMode || t.loop ? !0 : I !== h.length - 1).forEach(X => {
            X.style[O] = `${E}px`
        }
        )
    }
    if (t.centeredSlides && t.centeredSlidesBounds) {
        let O = 0;
        g.forEach(I => {
            O += I + (E || 0)
        }
        ),
        O -= E;
        const X = O > n ? O - n : 0;
        _ = _.map(I => I <= 0 ? -p : I > X ? X + S : I)
    }
    if (t.centerInsufficientSlides) {
        let O = 0;
        g.forEach(I => {
            O += I + (E || 0)
        }
        ),
        O -= E;
        const X = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
        if (O + X < n) {
            const I = (n - O - X) / 2;
            _.forEach( (H, q) => {
                _[q] = H - I
            }
            ),
            y.forEach( (H, q) => {
                y[q] = H + I
            }
            )
        }
    }
    if (Object.assign(s, {
        slides: h,
        snapGrid: _,
        slidesGrid: y,
        slidesSizesGrid: g
    }),
    t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
        Ms(i, "--swiper-centered-offset-before", `${-_[0]}px`),
        Ms(i, "--swiper-centered-offset-after", `${s.size / 2 - g[g.length - 1] / 2}px`);
        const O = -s.snapGrid[0]
          , X = -s.slidesGrid[0];
        s.snapGrid = s.snapGrid.map(I => I + O),
        s.slidesGrid = s.slidesGrid.map(I => I + X)
    }
    if (w !== f && s.emit("slidesLengthChange"),
    _.length !== T && (s.params.watchOverflow && s.checkOverflow(),
    s.emit("snapGridLengthChange")),
    y.length !== C && s.emit("slidesGridLengthChange"),
    t.watchSlidesProgress && s.updateSlidesOffset(),
    s.emit("slidesUpdated"),
    !c && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
        const O = `${t.containerModifierClass}backface-hidden`
          , X = s.el.classList.contains(O);
        w <= t.maxBackfaceHiddenSlides ? X || s.el.classList.add(O) : X && s.el.classList.remove(O)
    }
}
function Ph(s) {
    const e = this
      , t = []
      , i = e.virtual && e.params.virtual.enabled;
    let r = 0, n;
    typeof s == "number" ? e.setTransition(s) : s === !0 && e.setTransition(e.params.speed);
    const o = l => i ? e.slides[e.getSlideIndexByData(l)] : e.slides[l];
    if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
        if (e.params.centeredSlides)
            (e.visibleSlides || []).forEach(l => {
                t.push(l)
            }
            );
        else
            for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
                const l = e.activeIndex + n;
                if (l > e.slides.length && !i)
                    break;
                t.push(o(l))
            }
    else
        t.push(o(e.activeIndex));
    for (n = 0; n < t.length; n += 1)
        if (typeof t[n] < "u") {
            const l = t[n].offsetHeight;
            r = l > r ? l : r
        }
    (r || r === 0) && (e.wrapperEl.style.height = `${r}px`)
}
function Ah() {
    const s = this
      , e = s.slides
      , t = s.isElement ? s.isHorizontal() ? s.wrapperEl.offsetLeft : s.wrapperEl.offsetTop : 0;
    for (let i = 0; i < e.length; i += 1)
        e[i].swiperSlideOffset = (s.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) - t - s.cssOverflowAdjustment()
}
const zu = (s, e, t) => {
    e && !s.classList.contains(t) ? s.classList.add(t) : !e && s.classList.contains(t) && s.classList.remove(t)
}
;
function kh(s) {
    s === void 0 && (s = this && this.translate || 0);
    const e = this
      , t = e.params
      , {slides: i, rtlTranslate: r, snapGrid: n} = e;
    if (i.length === 0)
        return;
    typeof i[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
    let o = -s;
    r && (o = s),
    e.visibleSlidesIndexes = [],
    e.visibleSlides = [];
    let l = t.spaceBetween;
    typeof l == "string" && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * e.size : typeof l == "string" && (l = parseFloat(l));
    for (let c = 0; c < i.length; c += 1) {
        const f = i[c];
        let h = f.swiperSlideOffset;
        t.cssMode && t.centeredSlides && (h -= i[0].swiperSlideOffset);
        const w = (o + (t.centeredSlides ? e.minTranslate() : 0) - h) / (f.swiperSlideSize + l)
          , _ = (o - n[0] + (t.centeredSlides ? e.minTranslate() : 0) - h) / (f.swiperSlideSize + l)
          , y = -(o - h)
          , g = y + e.slidesSizesGrid[c]
          , p = y >= 0 && y <= e.size - e.slidesSizesGrid[c]
          , S = y >= 0 && y < e.size - 1 || g > 1 && g <= e.size || y <= 0 && g >= e.size;
        S && (e.visibleSlides.push(f),
        e.visibleSlidesIndexes.push(c)),
        zu(f, S, t.slideVisibleClass),
        zu(f, p, t.slideFullyVisibleClass),
        f.progress = r ? -w : w,
        f.originalProgress = r ? -_ : _
    }
}
function Lh(s) {
    const e = this;
    if (typeof s > "u") {
        const h = e.rtlTranslate ? -1 : 1;
        s = e && e.translate && e.translate * h || 0
    }
    const t = e.params
      , i = e.maxTranslate() - e.minTranslate();
    let {progress: r, isBeginning: n, isEnd: o, progressLoop: l} = e;
    const c = n
      , f = o;
    if (i === 0)
        r = 0,
        n = !0,
        o = !0;
    else {
        r = (s - e.minTranslate()) / i;
        const h = Math.abs(s - e.minTranslate()) < 1
          , w = Math.abs(s - e.maxTranslate()) < 1;
        n = h || r <= 0,
        o = w || r >= 1,
        h && (r = 0),
        w && (r = 1)
    }
    if (t.loop) {
        const h = e.getSlideIndexByData(0)
          , w = e.getSlideIndexByData(e.slides.length - 1)
          , _ = e.slidesGrid[h]
          , y = e.slidesGrid[w]
          , g = e.slidesGrid[e.slidesGrid.length - 1]
          , p = Math.abs(s);
        p >= _ ? l = (p - _) / g : l = (p + g - y) / g,
        l > 1 && (l -= 1)
    }
    Object.assign(e, {
        progress: r,
        progressLoop: l,
        isBeginning: n,
        isEnd: o
    }),
    (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && e.updateSlidesProgress(s),
    n && !c && e.emit("reachBeginning toEdge"),
    o && !f && e.emit("reachEnd toEdge"),
    (c && !n || f && !o) && e.emit("fromEdge"),
    e.emit("progress", r)
}
const Io = (s, e, t) => {
    e && !s.classList.contains(t) ? s.classList.add(t) : !e && s.classList.contains(t) && s.classList.remove(t)
}
;
function Oh() {
    const s = this
      , {slides: e, params: t, slidesEl: i, activeIndex: r} = s
      , n = s.virtual && t.virtual.enabled
      , o = s.grid && t.grid && t.grid.rows > 1
      , l = w => Ut(i, `.${t.slideClass}${w}, swiper-slide${w}`)[0];
    let c, f, h;
    if (n)
        if (t.loop) {
            let w = r - s.virtual.slidesBefore;
            w < 0 && (w = s.virtual.slides.length + w),
            w >= s.virtual.slides.length && (w -= s.virtual.slides.length),
            c = l(`[data-swiper-slide-index="${w}"]`)
        } else
            c = l(`[data-swiper-slide-index="${r}"]`);
    else
        o ? (c = e.find(w => w.column === r),
        h = e.find(w => w.column === r + 1),
        f = e.find(w => w.column === r - 1)) : c = e[r];
    c && (o || (h = wh(c, `.${t.slideClass}, swiper-slide`)[0],
    t.loop && !h && (h = e[0]),
    f = yh(c, `.${t.slideClass}, swiper-slide`)[0],
    t.loop && !f === 0 && (f = e[e.length - 1]))),
    e.forEach(w => {
        Io(w, w === c, t.slideActiveClass),
        Io(w, w === h, t.slideNextClass),
        Io(w, w === f, t.slidePrevClass)
    }
    ),
    s.emitSlidesClasses()
}
const Aa = (s, e) => {
    if (!s || s.destroyed || !s.params)
        return;
    const t = () => s.isElement ? "swiper-slide" : `.${s.params.slideClass}`
      , i = e.closest(t());
    if (i) {
        let r = i.querySelector(`.${s.params.lazyPreloaderClass}`);
        !r && s.isElement && (i.shadowRoot ? r = i.shadowRoot.querySelector(`.${s.params.lazyPreloaderClass}`) : requestAnimationFrame( () => {
            i.shadowRoot && (r = i.shadowRoot.querySelector(`.${s.params.lazyPreloaderClass}`),
            r && r.remove())
        }
        )),
        r && r.remove()
    }
}
  , zo = (s, e) => {
    if (!s.slides[e])
        return;
    const t = s.slides[e].querySelector('[loading="lazy"]');
    t && t.removeAttribute("loading")
}
  , pl = s => {
    if (!s || s.destroyed || !s.params)
        return;
    let e = s.params.lazyPreloadPrevNext;
    const t = s.slides.length;
    if (!t || !e || e < 0)
        return;
    e = Math.min(e, t);
    const i = s.params.slidesPerView === "auto" ? s.slidesPerViewDynamic() : Math.ceil(s.params.slidesPerView)
      , r = s.activeIndex;
    if (s.params.grid && s.params.grid.rows > 1) {
        const o = r
          , l = [o - e];
        l.push(...Array.from({
            length: e
        }).map( (c, f) => o + i + f)),
        s.slides.forEach( (c, f) => {
            l.includes(c.column) && zo(s, f)
        }
        );
        return
    }
    const n = r + i - 1;
    if (s.params.rewind || s.params.loop)
        for (let o = r - e; o <= n + e; o += 1) {
            const l = (o % t + t) % t;
            (l < r || l > n) && zo(s, l)
        }
    else
        for (let o = Math.max(r - e, 0); o <= Math.min(n + e, t - 1); o += 1)
            o !== r && (o > n || o < r) && zo(s, o)
}
;
function Dh(s) {
    const {slidesGrid: e, params: t} = s
      , i = s.rtlTranslate ? s.translate : -s.translate;
    let r;
    for (let n = 0; n < e.length; n += 1)
        typeof e[n + 1] < "u" ? i >= e[n] && i < e[n + 1] - (e[n + 1] - e[n]) / 2 ? r = n : i >= e[n] && i < e[n + 1] && (r = n + 1) : i >= e[n] && (r = n);
    return t.normalizeSlideIndex && (r < 0 || typeof r > "u") && (r = 0),
    r
}
function Ih(s) {
    const e = this
      , t = e.rtlTranslate ? e.translate : -e.translate
      , {snapGrid: i, params: r, activeIndex: n, realIndex: o, snapIndex: l} = e;
    let c = s, f;
    const h = y => {
        let g = y - e.virtual.slidesBefore;
        return g < 0 && (g = e.virtual.slides.length + g),
        g >= e.virtual.slides.length && (g -= e.virtual.slides.length),
        g
    }
    ;
    if (typeof c > "u" && (c = Dh(e)),
    i.indexOf(t) >= 0)
        f = i.indexOf(t);
    else {
        const y = Math.min(r.slidesPerGroupSkip, c);
        f = y + Math.floor((c - y) / r.slidesPerGroup)
    }
    if (f >= i.length && (f = i.length - 1),
    c === n && !e.params.loop) {
        f !== l && (e.snapIndex = f,
        e.emit("snapIndexChange"));
        return
    }
    if (c === n && e.params.loop && e.virtual && e.params.virtual.enabled) {
        e.realIndex = h(c);
        return
    }
    const w = e.grid && r.grid && r.grid.rows > 1;
    let _;
    if (e.virtual && r.virtual.enabled && r.loop)
        _ = h(c);
    else if (w) {
        const y = e.slides.find(p => p.column === c);
        let g = parseInt(y.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(g) && (g = Math.max(e.slides.indexOf(y), 0)),
        _ = Math.floor(g / r.grid.rows)
    } else if (e.slides[c]) {
        const y = e.slides[c].getAttribute("data-swiper-slide-index");
        y ? _ = parseInt(y, 10) : _ = c
    } else
        _ = c;
    Object.assign(e, {
        previousSnapIndex: l,
        snapIndex: f,
        previousRealIndex: o,
        realIndex: _,
        previousIndex: n,
        activeIndex: c
    }),
    e.initialized && pl(e),
    e.emit("activeIndexChange"),
    e.emit("snapIndexChange"),
    (e.initialized || e.params.runCallbacksOnInit) && (o !== _ && e.emit("realIndexChange"),
    e.emit("slideChange"))
}
function zh(s, e) {
    const t = this
      , i = t.params;
    let r = s.closest(`.${i.slideClass}, swiper-slide`);
    !r && t.isElement && e && e.length > 1 && e.includes(s) && [...e.slice(e.indexOf(s) + 1, e.length)].forEach(l => {
        !r && l.matches && l.matches(`.${i.slideClass}, swiper-slide`) && (r = l)
    }
    );
    let n = !1, o;
    if (r) {
        for (let l = 0; l < t.slides.length; l += 1)
            if (t.slides[l] === r) {
                n = !0,
                o = l;
                break
            }
    }
    if (r && n)
        t.clickedSlide = r,
        t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(r.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = o;
    else {
        t.clickedSlide = void 0,
        t.clickedIndex = void 0;
        return
    }
    i.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
}
var Rh = {
    updateSize: Ch,
    updateSlides: Mh,
    updateAutoHeight: Ph,
    updateSlidesOffset: Ah,
    updateSlidesProgress: kh,
    updateProgress: Lh,
    updateSlidesClasses: Oh,
    updateActiveIndex: Ih,
    updateClickedSlide: zh
};
function Nh(s) {
    s === void 0 && (s = this.isHorizontal() ? "x" : "y");
    const e = this
      , {params: t, rtlTranslate: i, translate: r, wrapperEl: n} = e;
    if (t.virtualTranslate)
        return i ? -r : r;
    if (t.cssMode)
        return r;
    let o = fl(n, s);
    return o += e.cssOverflowAdjustment(),
    i && (o = -o),
    o || 0
}
function $h(s, e) {
    const t = this
      , {rtlTranslate: i, params: r, wrapperEl: n, progress: o} = t;
    let l = 0
      , c = 0;
    const f = 0;
    t.isHorizontal() ? l = i ? -s : s : c = s,
    r.roundLengths && (l = Math.floor(l),
    c = Math.floor(c)),
    t.previousTranslate = t.translate,
    t.translate = t.isHorizontal() ? l : c,
    r.cssMode ? n[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -l : -c : r.virtualTranslate || (t.isHorizontal() ? l -= t.cssOverflowAdjustment() : c -= t.cssOverflowAdjustment(),
    n.style.transform = `translate3d(${l}px, ${c}px, ${f}px)`);
    let h;
    const w = t.maxTranslate() - t.minTranslate();
    w === 0 ? h = 0 : h = (s - t.minTranslate()) / w,
    h !== o && t.updateProgress(s),
    t.emit("setTranslate", t.translate, e)
}
function Hh() {
    return -this.snapGrid[0]
}
function Fh() {
    return -this.snapGrid[this.snapGrid.length - 1]
}
function qh(s, e, t, i, r) {
    s === void 0 && (s = 0),
    e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    i === void 0 && (i = !0);
    const n = this
      , {params: o, wrapperEl: l} = n;
    if (n.animating && o.preventInteractionOnTransition)
        return !1;
    const c = n.minTranslate()
      , f = n.maxTranslate();
    let h;
    if (i && s > c ? h = c : i && s < f ? h = f : h = s,
    n.updateProgress(h),
    o.cssMode) {
        const w = n.isHorizontal();
        if (e === 0)
            l[w ? "scrollLeft" : "scrollTop"] = -h;
        else {
            if (!n.support.smoothScroll)
                return pf({
                    swiper: n,
                    targetPosition: -h,
                    side: w ? "left" : "top"
                }),
                !0;
            l.scrollTo({
                [w ? "left" : "top"]: -h,
                behavior: "smooth"
            })
        }
        return !0
    }
    return e === 0 ? (n.setTransition(0),
    n.setTranslate(h),
    t && (n.emit("beforeTransitionStart", e, r),
    n.emit("transitionEnd"))) : (n.setTransition(e),
    n.setTranslate(h),
    t && (n.emit("beforeTransitionStart", e, r),
    n.emit("transitionStart")),
    n.animating || (n.animating = !0,
    n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(_) {
        !n || n.destroyed || _.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd),
        n.onTranslateToWrapperTransitionEnd = null,
        delete n.onTranslateToWrapperTransitionEnd,
        n.animating = !1,
        t && n.emit("transitionEnd"))
    }
    ),
    n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))),
    !0
}
var Bh = {
    getTranslate: Nh,
    setTranslate: $h,
    minTranslate: Hh,
    maxTranslate: Fh,
    translateTo: qh
};
function jh(s, e) {
    const t = this;
    t.params.cssMode || (t.wrapperEl.style.transitionDuration = `${s}ms`,
    t.wrapperEl.style.transitionDelay = s === 0 ? "0ms" : ""),
    t.emit("setTransition", s, e)
}
function vf(s) {
    let {swiper: e, runCallbacks: t, direction: i, step: r} = s;
    const {activeIndex: n, previousIndex: o} = e;
    let l = i;
    l || (n > o ? l = "next" : n < o ? l = "prev" : l = "reset"),
    e.emit(`transition${r}`),
    t && l === "reset" ? e.emit(`slideResetTransition${r}`) : t && n !== o && (e.emit(`slideChangeTransition${r}`),
    l === "next" ? e.emit(`slideNextTransition${r}`) : e.emit(`slidePrevTransition${r}`))
}
function Xh(s, e) {
    s === void 0 && (s = !0);
    const t = this
      , {params: i} = t;
    i.cssMode || (i.autoHeight && t.updateAutoHeight(),
    vf({
        swiper: t,
        runCallbacks: s,
        direction: e,
        step: "Start"
    }))
}
function Yh(s, e) {
    s === void 0 && (s = !0);
    const t = this
      , {params: i} = t;
    t.animating = !1,
    !i.cssMode && (t.setTransition(0),
    vf({
        swiper: t,
        runCallbacks: s,
        direction: e,
        step: "End"
    }))
}
var Wh = {
    setTransition: jh,
    transitionStart: Xh,
    transitionEnd: Yh
};
function Gh(s, e, t, i, r) {
    s === void 0 && (s = 0),
    t === void 0 && (t = !0),
    typeof s == "string" && (s = parseInt(s, 10));
    const n = this;
    let o = s;
    o < 0 && (o = 0);
    const {params: l, snapGrid: c, slidesGrid: f, previousIndex: h, activeIndex: w, rtlTranslate: _, wrapperEl: y, enabled: g} = n;
    if (!g && !i && !r || n.destroyed || n.animating && l.preventInteractionOnTransition)
        return !1;
    typeof e > "u" && (e = n.params.speed);
    const p = Math.min(n.params.slidesPerGroupSkip, o);
    let S = p + Math.floor((o - p) / n.params.slidesPerGroup);
    S >= c.length && (S = c.length - 1);
    const T = -c[S];
    if (l.normalizeSlideIndex)
        for (let d = 0; d < f.length; d += 1) {
            const N = -Math.floor(T * 100)
              , L = Math.floor(f[d] * 100)
              , O = Math.floor(f[d + 1] * 100);
            typeof f[d + 1] < "u" ? N >= L && N < O - (O - L) / 2 ? o = d : N >= L && N < O && (o = d + 1) : N >= L && (o = d)
        }
    if (n.initialized && o !== w && (!n.allowSlideNext && (_ ? T > n.translate && T > n.minTranslate() : T < n.translate && T < n.minTranslate()) || !n.allowSlidePrev && T > n.translate && T > n.maxTranslate() && (w || 0) !== o))
        return !1;
    o !== (h || 0) && t && n.emit("beforeSlideChangeStart"),
    n.updateProgress(T);
    let C;
    o > w ? C = "next" : o < w ? C = "prev" : C = "reset";
    const E = n.virtual && n.params.virtual.enabled;
    if (!(E && r) && (_ && -T === n.translate || !_ && T === n.translate))
        return n.updateActiveIndex(o),
        l.autoHeight && n.updateAutoHeight(),
        n.updateSlidesClasses(),
        l.effect !== "slide" && n.setTranslate(T),
        C !== "reset" && (n.transitionStart(t, C),
        n.transitionEnd(t, C)),
        !1;
    if (l.cssMode) {
        const d = n.isHorizontal()
          , N = _ ? T : -T;
        if (e === 0)
            E && (n.wrapperEl.style.scrollSnapType = "none",
            n._immediateVirtual = !0),
            E && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0,
            requestAnimationFrame( () => {
                y[d ? "scrollLeft" : "scrollTop"] = N
            }
            )) : y[d ? "scrollLeft" : "scrollTop"] = N,
            E && requestAnimationFrame( () => {
                n.wrapperEl.style.scrollSnapType = "",
                n._immediateVirtual = !1
            }
            );
        else {
            if (!n.support.smoothScroll)
                return pf({
                    swiper: n,
                    targetPosition: N,
                    side: d ? "left" : "top"
                }),
                !0;
            y.scrollTo({
                [d ? "left" : "top"]: N,
                behavior: "smooth"
            })
        }
        return !0
    }
    const R = gf().isSafari;
    return E && !r && R && n.isElement && n.virtual.update(!1, !1, o),
    n.setTransition(e),
    n.setTranslate(T),
    n.updateActiveIndex(o),
    n.updateSlidesClasses(),
    n.emit("beforeTransitionStart", e, i),
    n.transitionStart(t, C),
    e === 0 ? n.transitionEnd(t, C) : n.animating || (n.animating = !0,
    n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(N) {
        !n || n.destroyed || N.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd),
        n.onSlideToWrapperTransitionEnd = null,
        delete n.onSlideToWrapperTransitionEnd,
        n.transitionEnd(t, C))
    }
    ),
    n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)),
    !0
}
function Vh(s, e, t, i) {
    s === void 0 && (s = 0),
    t === void 0 && (t = !0),
    typeof s == "string" && (s = parseInt(s, 10));
    const r = this;
    if (r.destroyed)
        return;
    typeof e > "u" && (e = r.params.speed);
    const n = r.grid && r.params.grid && r.params.grid.rows > 1;
    let o = s;
    if (r.params.loop)
        if (r.virtual && r.params.virtual.enabled)
            o = o + r.virtual.slidesBefore;
        else {
            let l;
            if (n) {
                const _ = o * r.params.grid.rows;
                l = r.slides.find(y => y.getAttribute("data-swiper-slide-index") * 1 === _).column
            } else
                l = r.getSlideIndexByData(o);
            const c = n ? Math.ceil(r.slides.length / r.params.grid.rows) : r.slides.length
              , {centeredSlides: f} = r.params;
            let h = r.params.slidesPerView;
            h === "auto" ? h = r.slidesPerViewDynamic() : (h = Math.ceil(parseFloat(r.params.slidesPerView, 10)),
            f && h % 2 === 0 && (h = h + 1));
            let w = c - l < h;
            if (f && (w = w || l < Math.ceil(h / 2)),
            i && f && r.params.slidesPerView !== "auto" && !n && (w = !1),
            w) {
                const _ = f ? l < r.activeIndex ? "prev" : "next" : l - r.activeIndex - 1 < r.params.slidesPerView ? "next" : "prev";
                r.loopFix({
                    direction: _,
                    slideTo: !0,
                    activeSlideIndex: _ === "next" ? l + 1 : l - c + 1,
                    slideRealIndex: _ === "next" ? r.realIndex : void 0
                })
            }
            if (n) {
                const _ = o * r.params.grid.rows;
                o = r.slides.find(y => y.getAttribute("data-swiper-slide-index") * 1 === _).column
            } else
                o = r.getSlideIndexByData(o)
        }
    return requestAnimationFrame( () => {
        r.slideTo(o, e, t, i)
    }
    ),
    r
}
function Uh(s, e, t) {
    e === void 0 && (e = !0);
    const i = this
      , {enabled: r, params: n, animating: o} = i;
    if (!r || i.destroyed)
        return i;
    typeof s > "u" && (s = i.params.speed);
    let l = n.slidesPerGroup;
    n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
    const c = i.activeIndex < n.slidesPerGroupSkip ? 1 : l
      , f = i.virtual && n.virtual.enabled;
    if (n.loop) {
        if (o && !f && n.loopPreventsSliding)
            return !1;
        if (i.loopFix({
            direction: "next"
        }),
        i._clientLeft = i.wrapperEl.clientLeft,
        i.activeIndex === i.slides.length - 1 && n.cssMode)
            return requestAnimationFrame( () => {
                i.slideTo(i.activeIndex + c, s, e, t)
            }
            ),
            !0
    }
    return n.rewind && i.isEnd ? i.slideTo(0, s, e, t) : i.slideTo(i.activeIndex + c, s, e, t)
}
function Kh(s, e, t) {
    e === void 0 && (e = !0);
    const i = this
      , {params: r, snapGrid: n, slidesGrid: o, rtlTranslate: l, enabled: c, animating: f} = i;
    if (!c || i.destroyed)
        return i;
    typeof s > "u" && (s = i.params.speed);
    const h = i.virtual && r.virtual.enabled;
    if (r.loop) {
        if (f && !h && r.loopPreventsSliding)
            return !1;
        i.loopFix({
            direction: "prev"
        }),
        i._clientLeft = i.wrapperEl.clientLeft
    }
    const w = l ? i.translate : -i.translate;
    function _(C) {
        return C < 0 ? -Math.floor(Math.abs(C)) : Math.floor(C)
    }
    const y = _(w)
      , g = n.map(C => _(C))
      , p = r.freeMode && r.freeMode.enabled;
    let S = n[g.indexOf(y) - 1];
    if (typeof S > "u" && (r.cssMode || p)) {
        let C;
        n.forEach( (E, P) => {
            y >= E && (C = P)
        }
        ),
        typeof C < "u" && (S = p ? n[C] : n[C > 0 ? C - 1 : C])
    }
    let T = 0;
    if (typeof S < "u" && (T = o.indexOf(S),
    T < 0 && (T = i.activeIndex - 1),
    r.slidesPerView === "auto" && r.slidesPerGroup === 1 && r.slidesPerGroupAuto && (T = T - i.slidesPerViewDynamic("previous", !0) + 1,
    T = Math.max(T, 0))),
    r.rewind && i.isBeginning) {
        const C = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
        return i.slideTo(C, s, e, t)
    } else if (r.loop && i.activeIndex === 0 && r.cssMode)
        return requestAnimationFrame( () => {
            i.slideTo(T, s, e, t)
        }
        ),
        !0;
    return i.slideTo(T, s, e, t)
}
function Qh(s, e, t) {
    e === void 0 && (e = !0);
    const i = this;
    if (!i.destroyed)
        return typeof s > "u" && (s = i.params.speed),
        i.slideTo(i.activeIndex, s, e, t)
}
function Zh(s, e, t, i) {
    e === void 0 && (e = !0),
    i === void 0 && (i = .5);
    const r = this;
    if (r.destroyed)
        return;
    typeof s > "u" && (s = r.params.speed);
    let n = r.activeIndex;
    const o = Math.min(r.params.slidesPerGroupSkip, n)
      , l = o + Math.floor((n - o) / r.params.slidesPerGroup)
      , c = r.rtlTranslate ? r.translate : -r.translate;
    if (c >= r.snapGrid[l]) {
        const f = r.snapGrid[l]
          , h = r.snapGrid[l + 1];
        c - f > (h - f) * i && (n += r.params.slidesPerGroup)
    } else {
        const f = r.snapGrid[l - 1]
          , h = r.snapGrid[l];
        c - f <= (h - f) * i && (n -= r.params.slidesPerGroup)
    }
    return n = Math.max(n, 0),
    n = Math.min(n, r.slidesGrid.length - 1),
    r.slideTo(n, s, e, t)
}
function Jh() {
    const s = this;
    if (s.destroyed)
        return;
    const {params: e, slidesEl: t} = s
      , i = e.slidesPerView === "auto" ? s.slidesPerViewDynamic() : e.slidesPerView;
    let r = s.clickedIndex, n;
    const o = s.isElement ? "swiper-slide" : `.${e.slideClass}`;
    if (e.loop) {
        if (s.animating)
            return;
        n = parseInt(s.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
        e.centeredSlides ? r < s.loopedSlides - i / 2 || r > s.slides.length - s.loopedSlides + i / 2 ? (s.loopFix(),
        r = s.getSlideIndex(Ut(t, `${o}[data-swiper-slide-index="${n}"]`)[0]),
        On( () => {
            s.slideTo(r)
        }
        )) : s.slideTo(r) : r > s.slides.length - i ? (s.loopFix(),
        r = s.getSlideIndex(Ut(t, `${o}[data-swiper-slide-index="${n}"]`)[0]),
        On( () => {
            s.slideTo(r)
        }
        )) : s.slideTo(r)
    } else
        s.slideTo(r)
}
var em = {
    slideTo: Gh,
    slideToLoop: Vh,
    slideNext: Uh,
    slidePrev: Kh,
    slideReset: Qh,
    slideToClosest: Zh,
    slideToClickedSlide: Jh
};
function tm(s, e) {
    const t = this
      , {params: i, slidesEl: r} = t;
    if (!i.loop || t.virtual && t.params.virtual.enabled)
        return;
    const n = () => {
        Ut(r, `.${i.slideClass}, swiper-slide`).forEach( (_, y) => {
            _.setAttribute("data-swiper-slide-index", y)
        }
        )
    }
      , o = t.grid && i.grid && i.grid.rows > 1
      , l = i.slidesPerGroup * (o ? i.grid.rows : 1)
      , c = t.slides.length % l !== 0
      , f = o && t.slides.length % i.grid.rows !== 0
      , h = w => {
        for (let _ = 0; _ < w; _ += 1) {
            const y = t.isElement ? Hi("swiper-slide", [i.slideBlankClass]) : Hi("div", [i.slideClass, i.slideBlankClass]);
            t.slidesEl.append(y)
        }
    }
    ;
    if (c) {
        if (i.loopAddBlankSlides) {
            const w = l - t.slides.length % l;
            h(w),
            t.recalcSlides(),
            t.updateSlides()
        } else
            Ya("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
        n()
    } else if (f) {
        if (i.loopAddBlankSlides) {
            const w = i.grid.rows - t.slides.length % i.grid.rows;
            h(w),
            t.recalcSlides(),
            t.updateSlides()
        } else
            Ya("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
        n()
    } else
        n();
    t.loopFix({
        slideRealIndex: s,
        direction: i.centeredSlides ? void 0 : "next",
        initial: e
    })
}
function im(s) {
    let {slideRealIndex: e, slideTo: t=!0, direction: i, setTranslate: r, activeSlideIndex: n, initial: o, byController: l, byMousewheel: c} = s === void 0 ? {} : s;
    const f = this;
    if (!f.params.loop)
        return;
    f.emit("beforeLoopFix");
    const {slides: h, allowSlidePrev: w, allowSlideNext: _, slidesEl: y, params: g} = f
      , {centeredSlides: p, initialSlide: S} = g;
    if (f.allowSlidePrev = !0,
    f.allowSlideNext = !0,
    f.virtual && g.virtual.enabled) {
        t && (!g.centeredSlides && f.snapIndex === 0 ? f.slideTo(f.virtual.slides.length, 0, !1, !0) : g.centeredSlides && f.snapIndex < g.slidesPerView ? f.slideTo(f.virtual.slides.length + f.snapIndex, 0, !1, !0) : f.snapIndex === f.snapGrid.length - 1 && f.slideTo(f.virtual.slidesBefore, 0, !1, !0)),
        f.allowSlidePrev = w,
        f.allowSlideNext = _,
        f.emit("loopFix");
        return
    }
    let T = g.slidesPerView;
    T === "auto" ? T = f.slidesPerViewDynamic() : (T = Math.ceil(parseFloat(g.slidesPerView, 10)),
    p && T % 2 === 0 && (T = T + 1));
    const C = g.slidesPerGroupAuto ? T : g.slidesPerGroup;
    let E = C;
    E % C !== 0 && (E += C - E % C),
    E += g.loopAdditionalSlides,
    f.loopedSlides = E;
    const P = f.grid && g.grid && g.grid.rows > 1;
    h.length < T + E || f.params.effect === "cards" && h.length < T + E * 2 ? Ya("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : P && g.grid.fill === "row" && Ya("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
    const k = []
      , R = []
      , d = P ? Math.ceil(h.length / g.grid.rows) : h.length
      , N = o && d - S < T && !p;
    let L = N ? S : f.activeIndex;
    typeof n > "u" ? n = f.getSlideIndex(h.find(Q => Q.classList.contains(g.slideActiveClass))) : L = n;
    const O = i === "next" || !i
      , X = i === "prev" || !i;
    let I = 0
      , H = 0;
    const V = (P ? h[n].column : n) + (p && typeof r > "u" ? -T / 2 + .5 : 0);
    if (V < E) {
        I = Math.max(E - V, C);
        for (let Q = 0; Q < E - V; Q += 1) {
            const F = Q - Math.floor(Q / d) * d;
            if (P) {
                const Y = d - F - 1;
                for (let Z = h.length - 1; Z >= 0; Z -= 1)
                    h[Z].column === Y && k.push(Z)
            } else
                k.push(d - F - 1)
        }
    } else if (V + T > d - E) {
        H = Math.max(V - (d - E * 2), C),
        N && (H = Math.max(H, T - d + S + 1));
        for (let Q = 0; Q < H; Q += 1) {
            const F = Q - Math.floor(Q / d) * d;
            P ? h.forEach( (Y, Z) => {
                Y.column === F && R.push(Z)
            }
            ) : R.push(F)
        }
    }
    if (f.__preventObserver__ = !0,
    requestAnimationFrame( () => {
        f.__preventObserver__ = !1
    }
    ),
    f.params.effect === "cards" && h.length < T + E * 2 && (R.includes(n) && R.splice(R.indexOf(n), 1),
    k.includes(n) && k.splice(k.indexOf(n), 1)),
    X && k.forEach(Q => {
        h[Q].swiperLoopMoveDOM = !0,
        y.prepend(h[Q]),
        h[Q].swiperLoopMoveDOM = !1
    }
    ),
    O && R.forEach(Q => {
        h[Q].swiperLoopMoveDOM = !0,
        y.append(h[Q]),
        h[Q].swiperLoopMoveDOM = !1
    }
    ),
    f.recalcSlides(),
    g.slidesPerView === "auto" ? f.updateSlides() : P && (k.length > 0 && X || R.length > 0 && O) && f.slides.forEach( (Q, F) => {
        f.grid.updateSlide(F, Q, f.slides)
    }
    ),
    g.watchSlidesProgress && f.updateSlidesOffset(),
    t) {
        if (k.length > 0 && X) {
            if (typeof e > "u") {
                const Q = f.slidesGrid[L]
                  , Y = f.slidesGrid[L + I] - Q;
                c ? f.setTranslate(f.translate - Y) : (f.slideTo(L + Math.ceil(I), 0, !1, !0),
                r && (f.touchEventsData.startTranslate = f.touchEventsData.startTranslate - Y,
                f.touchEventsData.currentTranslate = f.touchEventsData.currentTranslate - Y))
            } else if (r) {
                const Q = P ? k.length / g.grid.rows : k.length;
                f.slideTo(f.activeIndex + Q, 0, !1, !0),
                f.touchEventsData.currentTranslate = f.translate
            }
        } else if (R.length > 0 && O)
            if (typeof e > "u") {
                const Q = f.slidesGrid[L]
                  , Y = f.slidesGrid[L - H] - Q;
                c ? f.setTranslate(f.translate - Y) : (f.slideTo(L - H, 0, !1, !0),
                r && (f.touchEventsData.startTranslate = f.touchEventsData.startTranslate - Y,
                f.touchEventsData.currentTranslate = f.touchEventsData.currentTranslate - Y))
            } else {
                const Q = P ? R.length / g.grid.rows : R.length;
                f.slideTo(f.activeIndex - Q, 0, !1, !0)
            }
    }
    if (f.allowSlidePrev = w,
    f.allowSlideNext = _,
    f.controller && f.controller.control && !l) {
        const Q = {
            slideRealIndex: e,
            direction: i,
            setTranslate: r,
            activeSlideIndex: n,
            byController: !0
        };
        Array.isArray(f.controller.control) ? f.controller.control.forEach(F => {
            !F.destroyed && F.params.loop && F.loopFix({
                ...Q,
                slideTo: F.params.slidesPerView === g.slidesPerView ? t : !1
            })
        }
        ) : f.controller.control instanceof f.constructor && f.controller.control.params.loop && f.controller.control.loopFix({
            ...Q,
            slideTo: f.controller.control.params.slidesPerView === g.slidesPerView ? t : !1
        })
    }
    f.emit("loopFix")
}
function rm() {
    const s = this
      , {params: e, slidesEl: t} = s;
    if (!e.loop || !t || s.virtual && s.params.virtual.enabled)
        return;
    s.recalcSlides();
    const i = [];
    s.slides.forEach(r => {
        const n = typeof r.swiperSlideIndex > "u" ? r.getAttribute("data-swiper-slide-index") * 1 : r.swiperSlideIndex;
        i[n] = r
    }
    ),
    s.slides.forEach(r => {
        r.removeAttribute("data-swiper-slide-index")
    }
    ),
    i.forEach(r => {
        t.append(r)
    }
    ),
    s.recalcSlides(),
    s.slideTo(s.realIndex, 0)
}
var nm = {
    loopCreate: tm,
    loopFix: im,
    loopDestroy: rm
};
function sm(s) {
    const e = this;
    if (!e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode)
        return;
    const t = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
    e.isElement && (e.__preventObserver__ = !0),
    t.style.cursor = "move",
    t.style.cursor = s ? "grabbing" : "grab",
    e.isElement && requestAnimationFrame( () => {
        e.__preventObserver__ = !1
    }
    )
}
function am() {
    const s = this;
    s.params.watchOverflow && s.isLocked || s.params.cssMode || (s.isElement && (s.__preventObserver__ = !0),
    s[s.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "",
    s.isElement && requestAnimationFrame( () => {
        s.__preventObserver__ = !1
    }
    ))
}
var om = {
    setGrabCursor: sm,
    unsetGrabCursor: am
};
function lm(s, e) {
    e === void 0 && (e = this);
    function t(i) {
        if (!i || i === jt() || i === ht())
            return null;
        i.assignedSlot && (i = i.assignedSlot);
        const r = i.closest(s);
        return !r && !i.getRootNode ? null : r || t(i.getRootNode().host)
    }
    return t(e)
}
function Ru(s, e, t) {
    const i = ht()
      , {params: r} = s
      , n = r.edgeSwipeDetection
      , o = r.edgeSwipeThreshold;
    return n && (t <= o || t >= i.innerWidth - o) ? n === "prevent" ? (e.preventDefault(),
    !0) : !1 : !0
}
function um(s) {
    const e = this
      , t = jt();
    let i = s;
    i.originalEvent && (i = i.originalEvent);
    const r = e.touchEventsData;
    if (i.type === "pointerdown") {
        if (r.pointerId !== null && r.pointerId !== i.pointerId)
            return;
        r.pointerId = i.pointerId
    } else
        i.type === "touchstart" && i.targetTouches.length === 1 && (r.touchId = i.targetTouches[0].identifier);
    if (i.type === "touchstart") {
        Ru(e, i, i.targetTouches[0].pageX);
        return
    }
    const {params: n, touches: o, enabled: l} = e;
    if (!l || !n.simulateTouch && i.pointerType === "mouse" || e.animating && n.preventInteractionOnTransition)
        return;
    !e.animating && n.cssMode && n.loop && e.loopFix();
    let c = i.target;
    if (n.touchEventsTarget === "wrapper" && !vh(c, e.wrapperEl) || "which"in i && i.which === 3 || "button"in i && i.button > 0 || r.isTouched && r.isMoved)
        return;
    const f = !!n.noSwipingClass && n.noSwipingClass !== ""
      , h = i.composedPath ? i.composedPath() : i.path;
    f && i.target && i.target.shadowRoot && h && (c = h[0]);
    const w = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`
      , _ = !!(i.target && i.target.shadowRoot);
    if (n.noSwiping && (_ ? lm(w, c) : c.closest(w))) {
        e.allowClick = !0;
        return
    }
    if (n.swipeHandler && !c.closest(n.swipeHandler))
        return;
    o.currentX = i.pageX,
    o.currentY = i.pageY;
    const y = o.currentX
      , g = o.currentY;
    if (!Ru(e, i, y))
        return;
    Object.assign(r, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }),
    o.startX = y,
    o.startY = g,
    r.touchStartTime = Ki(),
    e.allowClick = !0,
    e.updateSize(),
    e.swipeDirection = void 0,
    n.threshold > 0 && (r.allowThresholdMove = !1);
    let p = !0;
    c.matches(r.focusableElements) && (p = !1,
    c.nodeName === "SELECT" && (r.isTouched = !1)),
    t.activeElement && t.activeElement.matches(r.focusableElements) && t.activeElement !== c && (i.pointerType === "mouse" || i.pointerType !== "mouse" && !c.matches(r.focusableElements)) && t.activeElement.blur();
    const S = p && e.allowTouchMove && n.touchStartPreventDefault;
    (n.touchStartForcePreventDefault || S) && !c.isContentEditable && i.preventDefault(),
    n.freeMode && n.freeMode.enabled && e.freeMode && e.animating && !n.cssMode && e.freeMode.onTouchStart(),
    e.emit("touchStart", i)
}
function cm(s) {
    const e = jt()
      , t = this
      , i = t.touchEventsData
      , {params: r, touches: n, rtlTranslate: o, enabled: l} = t;
    if (!l || !r.simulateTouch && s.pointerType === "mouse")
        return;
    let c = s;
    if (c.originalEvent && (c = c.originalEvent),
    c.type === "pointermove" && (i.touchId !== null || c.pointerId !== i.pointerId))
        return;
    let f;
    if (c.type === "touchmove") {
        if (f = [...c.changedTouches].find(k => k.identifier === i.touchId),
        !f || f.identifier !== i.touchId)
            return
    } else
        f = c;
    if (!i.isTouched) {
        i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", c);
        return
    }
    const h = f.pageX
      , w = f.pageY;
    if (c.preventedByNestedSwiper) {
        n.startX = h,
        n.startY = w;
        return
    }
    if (!t.allowTouchMove) {
        c.target.matches(i.focusableElements) || (t.allowClick = !1),
        i.isTouched && (Object.assign(n, {
            startX: h,
            startY: w,
            currentX: h,
            currentY: w
        }),
        i.touchStartTime = Ki());
        return
    }
    if (r.touchReleaseOnEdges && !r.loop)
        if (t.isVertical()) {
            if (w < n.startY && t.translate <= t.maxTranslate() || w > n.startY && t.translate >= t.minTranslate()) {
                i.isTouched = !1,
                i.isMoved = !1;
                return
            }
        } else {
            if (o && (h > n.startX && -t.translate <= t.maxTranslate() || h < n.startX && -t.translate >= t.minTranslate()))
                return;
            if (!o && (h < n.startX && t.translate <= t.maxTranslate() || h > n.startX && t.translate >= t.minTranslate()))
                return
        }
    if (e.activeElement && e.activeElement.matches(i.focusableElements) && e.activeElement !== c.target && c.pointerType !== "mouse" && e.activeElement.blur(),
    e.activeElement && c.target === e.activeElement && c.target.matches(i.focusableElements)) {
        i.isMoved = !0,
        t.allowClick = !1;
        return
    }
    i.allowTouchCallbacks && t.emit("touchMove", c),
    n.previousX = n.currentX,
    n.previousY = n.currentY,
    n.currentX = h,
    n.currentY = w;
    const _ = n.currentX - n.startX
      , y = n.currentY - n.startY;
    if (t.params.threshold && Math.sqrt(_ ** 2 + y ** 2) < t.params.threshold)
        return;
    if (typeof i.isScrolling > "u") {
        let k;
        t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : _ * _ + y * y >= 25 && (k = Math.atan2(Math.abs(y), Math.abs(_)) * 180 / Math.PI,
        i.isScrolling = t.isHorizontal() ? k > r.touchAngle : 90 - k > r.touchAngle)
    }
    if (i.isScrolling && t.emit("touchMoveOpposite", c),
    typeof i.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (i.startMoving = !0),
    i.isScrolling || c.type === "touchmove" && i.preventTouchMoveFromPointerMove) {
        i.isTouched = !1;
        return
    }
    if (!i.startMoving)
        return;
    t.allowClick = !1,
    !r.cssMode && c.cancelable && c.preventDefault(),
    r.touchMoveStopPropagation && !r.nested && c.stopPropagation();
    let g = t.isHorizontal() ? _ : y
      , p = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
    r.oneWayMovement && (g = Math.abs(g) * (o ? 1 : -1),
    p = Math.abs(p) * (o ? 1 : -1)),
    n.diff = g,
    g *= r.touchRatio,
    o && (g = -g,
    p = -p);
    const S = t.touchesDirection;
    t.swipeDirection = g > 0 ? "prev" : "next",
    t.touchesDirection = p > 0 ? "prev" : "next";
    const T = t.params.loop && !r.cssMode
      , C = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
    if (!i.isMoved) {
        if (T && C && t.loopFix({
            direction: t.swipeDirection
        }),
        i.startTranslate = t.getTranslate(),
        t.setTransition(0),
        t.animating) {
            const k = new window.CustomEvent("transitionend",{
                bubbles: !0,
                cancelable: !0,
                detail: {
                    bySwiperTouchMove: !0
                }
            });
            t.wrapperEl.dispatchEvent(k)
        }
        i.allowMomentumBounce = !1,
        r.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0),
        t.emit("sliderFirstMove", c)
    }
    if (new Date().getTime(),
    r._loopSwapReset !== !1 && i.isMoved && i.allowThresholdMove && S !== t.touchesDirection && T && C && Math.abs(g) >= 1) {
        Object.assign(n, {
            startX: h,
            startY: w,
            currentX: h,
            currentY: w,
            startTranslate: i.currentTranslate
        }),
        i.loopSwapReset = !0,
        i.startTranslate = i.currentTranslate;
        return
    }
    t.emit("sliderMove", c),
    i.isMoved = !0,
    i.currentTranslate = g + i.startTranslate;
    let E = !0
      , P = r.resistanceRatio;
    if (r.touchReleaseOnEdges && (P = 0),
    g > 0 ? (T && C && i.allowThresholdMove && i.currentTranslate > (r.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (r.slidesPerView !== "auto" && t.slides.length - r.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
        direction: "prev",
        setTranslate: !0,
        activeSlideIndex: 0
    }),
    i.currentTranslate > t.minTranslate() && (E = !1,
    r.resistance && (i.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + i.startTranslate + g) ** P))) : g < 0 && (T && C && i.allowThresholdMove && i.currentTranslate < (r.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (r.slidesPerView !== "auto" && t.slides.length - r.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
        direction: "next",
        setTranslate: !0,
        activeSlideIndex: t.slides.length - (r.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
    }),
    i.currentTranslate < t.maxTranslate() && (E = !1,
    r.resistance && (i.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - i.startTranslate - g) ** P))),
    E && (c.preventedByNestedSwiper = !0),
    !t.allowSlideNext && t.swipeDirection === "next" && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
    !t.allowSlidePrev && t.swipeDirection === "prev" && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
    !t.allowSlidePrev && !t.allowSlideNext && (i.currentTranslate = i.startTranslate),
    r.threshold > 0)
        if (Math.abs(g) > r.threshold || i.allowThresholdMove) {
            if (!i.allowThresholdMove) {
                i.allowThresholdMove = !0,
                n.startX = n.currentX,
                n.startY = n.currentY,
                i.currentTranslate = i.startTranslate,
                n.diff = t.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
                return
            }
        } else {
            i.currentTranslate = i.startTranslate;
            return
        }
    !r.followFinger || r.cssMode || ((r.freeMode && r.freeMode.enabled && t.freeMode || r.watchSlidesProgress) && (t.updateActiveIndex(),
    t.updateSlidesClasses()),
    r.freeMode && r.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
    t.updateProgress(i.currentTranslate),
    t.setTranslate(i.currentTranslate))
}
function fm(s) {
    const e = this
      , t = e.touchEventsData;
    let i = s;
    i.originalEvent && (i = i.originalEvent);
    let r;
    if (i.type === "touchend" || i.type === "touchcancel") {
        if (r = [...i.changedTouches].find(k => k.identifier === t.touchId),
        !r || r.identifier !== t.touchId)
            return
    } else {
        if (t.touchId !== null || i.pointerId !== t.pointerId)
            return;
        r = i
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(i.type) && !(["pointercancel", "contextmenu"].includes(i.type) && (e.browser.isSafari || e.browser.isWebView)))
        return;
    t.pointerId = null,
    t.touchId = null;
    const {params: o, touches: l, rtlTranslate: c, slidesGrid: f, enabled: h} = e;
    if (!h || !o.simulateTouch && i.pointerType === "mouse")
        return;
    if (t.allowTouchCallbacks && e.emit("touchEnd", i),
    t.allowTouchCallbacks = !1,
    !t.isTouched) {
        t.isMoved && o.grabCursor && e.setGrabCursor(!1),
        t.isMoved = !1,
        t.startMoving = !1;
        return
    }
    o.grabCursor && t.isMoved && t.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
    const w = Ki()
      , _ = w - t.touchStartTime;
    if (e.allowClick) {
        const k = i.path || i.composedPath && i.composedPath();
        e.updateClickedSlide(k && k[0] || i.target, k),
        e.emit("tap click", i),
        _ < 300 && w - t.lastClickTime < 300 && e.emit("doubleTap doubleClick", i)
    }
    if (t.lastClickTime = Ki(),
    On( () => {
        e.destroyed || (e.allowClick = !0)
    }
    ),
    !t.isTouched || !t.isMoved || !e.swipeDirection || l.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
        t.isTouched = !1,
        t.isMoved = !1,
        t.startMoving = !1;
        return
    }
    t.isTouched = !1,
    t.isMoved = !1,
    t.startMoving = !1;
    let y;
    if (o.followFinger ? y = c ? e.translate : -e.translate : y = -t.currentTranslate,
    o.cssMode)
        return;
    if (o.freeMode && o.freeMode.enabled) {
        e.freeMode.onTouchEnd({
            currentPos: y
        });
        return
    }
    const g = y >= -e.maxTranslate() && !e.params.loop;
    let p = 0
      , S = e.slidesSizesGrid[0];
    for (let k = 0; k < f.length; k += k < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
        const R = k < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
        typeof f[k + R] < "u" ? (g || y >= f[k] && y < f[k + R]) && (p = k,
        S = f[k + R] - f[k]) : (g || y >= f[k]) && (p = k,
        S = f[f.length - 1] - f[f.length - 2])
    }
    let T = null
      , C = null;
    o.rewind && (e.isBeginning ? C = o.virtual && o.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (T = 0));
    const E = (y - f[p]) / S
      , P = p < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    if (_ > o.longSwipesMs) {
        if (!o.longSwipes) {
            e.slideTo(e.activeIndex);
            return
        }
        e.swipeDirection === "next" && (E >= o.longSwipesRatio ? e.slideTo(o.rewind && e.isEnd ? T : p + P) : e.slideTo(p)),
        e.swipeDirection === "prev" && (E > 1 - o.longSwipesRatio ? e.slideTo(p + P) : C !== null && E < 0 && Math.abs(E) > o.longSwipesRatio ? e.slideTo(C) : e.slideTo(p))
    } else {
        if (!o.shortSwipes) {
            e.slideTo(e.activeIndex);
            return
        }
        e.navigation && (i.target === e.navigation.nextEl || i.target === e.navigation.prevEl) ? i.target === e.navigation.nextEl ? e.slideTo(p + P) : e.slideTo(p) : (e.swipeDirection === "next" && e.slideTo(T !== null ? T : p + P),
        e.swipeDirection === "prev" && e.slideTo(C !== null ? C : p))
    }
}
function Nu() {
    const s = this
      , {params: e, el: t} = s;
    if (t && t.offsetWidth === 0)
        return;
    e.breakpoints && s.setBreakpoint();
    const {allowSlideNext: i, allowSlidePrev: r, snapGrid: n} = s
      , o = s.virtual && s.params.virtual.enabled;
    s.allowSlideNext = !0,
    s.allowSlidePrev = !0,
    s.updateSize(),
    s.updateSlides(),
    s.updateSlidesClasses();
    const l = o && e.loop;
    (e.slidesPerView === "auto" || e.slidesPerView > 1) && s.isEnd && !s.isBeginning && !s.params.centeredSlides && !l ? s.slideTo(s.slides.length - 1, 0, !1, !0) : s.params.loop && !o ? s.slideToLoop(s.realIndex, 0, !1, !0) : s.slideTo(s.activeIndex, 0, !1, !0),
    s.autoplay && s.autoplay.running && s.autoplay.paused && (clearTimeout(s.autoplay.resizeTimeout),
    s.autoplay.resizeTimeout = setTimeout( () => {
        s.autoplay && s.autoplay.running && s.autoplay.paused && s.autoplay.resume()
    }
    , 500)),
    s.allowSlidePrev = r,
    s.allowSlideNext = i,
    s.params.watchOverflow && n !== s.snapGrid && s.checkOverflow()
}
function dm(s) {
    const e = this;
    e.enabled && (e.allowClick || (e.params.preventClicks && s.preventDefault(),
    e.params.preventClicksPropagation && e.animating && (s.stopPropagation(),
    s.stopImmediatePropagation())))
}
function pm() {
    const s = this
      , {wrapperEl: e, rtlTranslate: t, enabled: i} = s;
    if (!i)
        return;
    s.previousTranslate = s.translate,
    s.isHorizontal() ? s.translate = -e.scrollLeft : s.translate = -e.scrollTop,
    s.translate === 0 && (s.translate = 0),
    s.updateActiveIndex(),
    s.updateSlidesClasses();
    let r;
    const n = s.maxTranslate() - s.minTranslate();
    n === 0 ? r = 0 : r = (s.translate - s.minTranslate()) / n,
    r !== s.progress && s.updateProgress(t ? -s.translate : s.translate),
    s.emit("setTranslate", s.translate, !1)
}
function hm(s) {
    const e = this;
    Aa(e, s.target),
    !(e.params.cssMode || e.params.slidesPerView !== "auto" && !e.params.autoHeight) && e.update()
}
function mm() {
    const s = this;
    s.documentTouchHandlerProceeded || (s.documentTouchHandlerProceeded = !0,
    s.params.touchReleaseOnEdges && (s.el.style.touchAction = "auto"))
}
const yf = (s, e) => {
    const t = jt()
      , {params: i, el: r, wrapperEl: n, device: o} = s
      , l = !!i.nested
      , c = e === "on" ? "addEventListener" : "removeEventListener"
      , f = e;
    !r || typeof r == "string" || (t[c]("touchstart", s.onDocumentTouchStart, {
        passive: !1,
        capture: l
    }),
    r[c]("touchstart", s.onTouchStart, {
        passive: !1
    }),
    r[c]("pointerdown", s.onTouchStart, {
        passive: !1
    }),
    t[c]("touchmove", s.onTouchMove, {
        passive: !1,
        capture: l
    }),
    t[c]("pointermove", s.onTouchMove, {
        passive: !1,
        capture: l
    }),
    t[c]("touchend", s.onTouchEnd, {
        passive: !0
    }),
    t[c]("pointerup", s.onTouchEnd, {
        passive: !0
    }),
    t[c]("pointercancel", s.onTouchEnd, {
        passive: !0
    }),
    t[c]("touchcancel", s.onTouchEnd, {
        passive: !0
    }),
    t[c]("pointerout", s.onTouchEnd, {
        passive: !0
    }),
    t[c]("pointerleave", s.onTouchEnd, {
        passive: !0
    }),
    t[c]("contextmenu", s.onTouchEnd, {
        passive: !0
    }),
    (i.preventClicks || i.preventClicksPropagation) && r[c]("click", s.onClick, !0),
    i.cssMode && n[c]("scroll", s.onScroll),
    i.updateOnWindowResize ? s[f](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Nu, !0) : s[f]("observerUpdate", Nu, !0),
    r[c]("load", s.onLoad, {
        capture: !0
    }))
}
;
function gm() {
    const s = this
      , {params: e} = s;
    s.onTouchStart = um.bind(s),
    s.onTouchMove = cm.bind(s),
    s.onTouchEnd = fm.bind(s),
    s.onDocumentTouchStart = mm.bind(s),
    e.cssMode && (s.onScroll = pm.bind(s)),
    s.onClick = dm.bind(s),
    s.onLoad = hm.bind(s),
    yf(s, "on")
}
function vm() {
    yf(this, "off")
}
var ym = {
    attachEvents: gm,
    detachEvents: vm
};
const $u = (s, e) => s.grid && e.grid && e.grid.rows > 1;
function wm() {
    const s = this
      , {realIndex: e, initialized: t, params: i, el: r} = s
      , n = i.breakpoints;
    if (!n || n && Object.keys(n).length === 0)
        return;
    const o = jt()
      , l = i.breakpointsBase === "window" || !i.breakpointsBase ? i.breakpointsBase : "container"
      , c = ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase ? s.el : o.querySelector(i.breakpointsBase)
      , f = s.getBreakpoint(n, l, c);
    if (!f || s.currentBreakpoint === f)
        return;
    const w = (f in n ? n[f] : void 0) || s.originalParams
      , _ = $u(s, i)
      , y = $u(s, w)
      , g = s.params.grabCursor
      , p = w.grabCursor
      , S = i.enabled;
    _ && !y ? (r.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`),
    s.emitContainerClasses()) : !_ && y && (r.classList.add(`${i.containerModifierClass}grid`),
    (w.grid.fill && w.grid.fill === "column" || !w.grid.fill && i.grid.fill === "column") && r.classList.add(`${i.containerModifierClass}grid-column`),
    s.emitContainerClasses()),
    g && !p ? s.unsetGrabCursor() : !g && p && s.setGrabCursor(),
    ["navigation", "pagination", "scrollbar"].forEach(R => {
        if (typeof w[R] > "u")
            return;
        const d = i[R] && i[R].enabled
          , N = w[R] && w[R].enabled;
        d && !N && s[R].disable(),
        !d && N && s[R].enable()
    }
    );
    const T = w.direction && w.direction !== i.direction
      , C = i.loop && (w.slidesPerView !== i.slidesPerView || T)
      , E = i.loop;
    T && t && s.changeDirection(),
    Ii(s.params, w);
    const P = s.params.enabled
      , k = s.params.loop;
    Object.assign(s, {
        allowTouchMove: s.params.allowTouchMove,
        allowSlideNext: s.params.allowSlideNext,
        allowSlidePrev: s.params.allowSlidePrev
    }),
    S && !P ? s.disable() : !S && P && s.enable(),
    s.currentBreakpoint = f,
    s.emit("_beforeBreakpoint", w),
    t && (C ? (s.loopDestroy(),
    s.loopCreate(e),
    s.updateSlides()) : !E && k ? (s.loopCreate(e),
    s.updateSlides()) : E && !k && s.loopDestroy()),
    s.emit("breakpoint", w)
}
function _m(s, e, t) {
    if (e === void 0 && (e = "window"),
    !s || e === "container" && !t)
        return;
    let i = !1;
    const r = ht()
      , n = e === "window" ? r.innerHeight : t.clientHeight
      , o = Object.keys(s).map(l => {
        if (typeof l == "string" && l.indexOf("@") === 0) {
            const c = parseFloat(l.substr(1));
            return {
                value: n * c,
                point: l
            }
        }
        return {
            value: l,
            point: l
        }
    }
    );
    o.sort( (l, c) => parseInt(l.value, 10) - parseInt(c.value, 10));
    for (let l = 0; l < o.length; l += 1) {
        const {point: c, value: f} = o[l];
        e === "window" ? r.matchMedia(`(min-width: ${f}px)`).matches && (i = c) : f <= t.clientWidth && (i = c)
    }
    return i || "max"
}
var bm = {
    setBreakpoint: wm,
    getBreakpoint: _m
};
function xm(s, e) {
    const t = [];
    return s.forEach(i => {
        typeof i == "object" ? Object.keys(i).forEach(r => {
            i[r] && t.push(e + r)
        }
        ) : typeof i == "string" && t.push(e + i)
    }
    ),
    t
}
function Sm() {
    const s = this
      , {classNames: e, params: t, rtl: i, el: r, device: n} = s
      , o = xm(["initialized", t.direction, {
        "free-mode": s.params.freeMode && t.freeMode.enabled
    }, {
        autoheight: t.autoHeight
    }, {
        rtl: i
    }, {
        grid: t.grid && t.grid.rows > 1
    }, {
        "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column"
    }, {
        android: n.android
    }, {
        ios: n.ios
    }, {
        "css-mode": t.cssMode
    }, {
        centered: t.cssMode && t.centeredSlides
    }, {
        "watch-progress": t.watchSlidesProgress
    }], t.containerModifierClass);
    e.push(...o),
    r.classList.add(...e),
    s.emitContainerClasses()
}
function Tm() {
    const s = this
      , {el: e, classNames: t} = s;
    !e || typeof e == "string" || (e.classList.remove(...t),
    s.emitContainerClasses())
}
var Em = {
    addClasses: Sm,
    removeClasses: Tm
};
function Cm() {
    const s = this
      , {isLocked: e, params: t} = s
      , {slidesOffsetBefore: i} = t;
    if (i) {
        const r = s.slides.length - 1
          , n = s.slidesGrid[r] + s.slidesSizesGrid[r] + i * 2;
        s.isLocked = s.size > n
    } else
        s.isLocked = s.snapGrid.length === 1;
    t.allowSlideNext === !0 && (s.allowSlideNext = !s.isLocked),
    t.allowSlidePrev === !0 && (s.allowSlidePrev = !s.isLocked),
    e && e !== s.isLocked && (s.isEnd = !1),
    e !== s.isLocked && s.emit(s.isLocked ? "lock" : "unlock")
}
var Mm = {
    checkOverflow: Cm
}
  , Hu = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: .5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: .85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1
};
function Pm(s, e) {
    return function(i) {
        i === void 0 && (i = {});
        const r = Object.keys(i)[0]
          , n = i[r];
        if (typeof n != "object" || n === null) {
            Ii(e, i);
            return
        }
        if (s[r] === !0 && (s[r] = {
            enabled: !0
        }),
        r === "navigation" && s[r] && s[r].enabled && !s[r].prevEl && !s[r].nextEl && (s[r].auto = !0),
        ["pagination", "scrollbar"].indexOf(r) >= 0 && s[r] && s[r].enabled && !s[r].el && (s[r].auto = !0),
        !(r in s && "enabled"in n)) {
            Ii(e, i);
            return
        }
        typeof s[r] == "object" && !("enabled"in s[r]) && (s[r].enabled = !0),
        s[r] || (s[r] = {
            enabled: !1
        }),
        Ii(e, i)
    }
}
const Ro = {
    eventsEmitter: Eh,
    update: Rh,
    translate: Bh,
    transition: Wh,
    slide: em,
    loop: nm,
    grabCursor: om,
    events: ym,
    breakpoints: bm,
    checkOverflow: Mm,
    classes: Em
}
  , No = {};
class bi {
    constructor() {
        let e, t;
        for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
            r[n] = arguments[n];
        r.length === 1 && r[0].constructor && Object.prototype.toString.call(r[0]).slice(8, -1) === "Object" ? t = r[0] : [e,t] = r,
        t || (t = {}),
        t = Ii({}, t),
        e && !t.el && (t.el = e);
        const o = jt();
        if (t.el && typeof t.el == "string" && o.querySelectorAll(t.el).length > 1) {
            const h = [];
            return o.querySelectorAll(t.el).forEach(w => {
                const _ = Ii({}, t, {
                    el: w
                });
                h.push(new bi(_))
            }
            ),
            h
        }
        const l = this;
        l.__swiper__ = !0,
        l.support = hf(),
        l.device = mf({
            userAgent: t.userAgent
        }),
        l.browser = gf(),
        l.eventsListeners = {},
        l.eventsAnyListeners = [],
        l.modules = [...l.__modules__],
        t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
        const c = {};
        l.modules.forEach(h => {
            h({
                params: t,
                swiper: l,
                extendParams: Pm(t, c),
                on: l.on.bind(l),
                once: l.once.bind(l),
                off: l.off.bind(l),
                emit: l.emit.bind(l)
            })
        }
        );
        const f = Ii({}, Hu, c);
        return l.params = Ii({}, f, No, t),
        l.originalParams = Ii({}, l.params),
        l.passedParams = Ii({}, t),
        l.params && l.params.on && Object.keys(l.params.on).forEach(h => {
            l.on(h, l.params.on[h])
        }
        ),
        l.params && l.params.onAny && l.onAny(l.params.onAny),
        Object.assign(l, {
            enabled: l.params.enabled,
            el: e,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal() {
                return l.params.direction === "horizontal"
            },
            isVertical() {
                return l.params.direction === "vertical"
            },
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            cssOverflowAdjustment() {
                return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
            },
            allowSlideNext: l.params.allowSlideNext,
            allowSlidePrev: l.params.allowSlidePrev,
            touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: l.params.focusableElements,
                lastClickTime: 0,
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                startMoving: void 0,
                pointerId: null,
                touchId: null
            },
            allowClick: !0,
            allowTouchMove: l.params.allowTouchMove,
            touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            },
            imagesToLoad: [],
            imagesLoaded: 0
        }),
        l.emit("_swiper"),
        l.params.init && l.init(),
        l
    }
    getDirectionLabel(e) {
        return this.isHorizontal() ? e : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom"
        }[e]
    }
    getSlideIndex(e) {
        const {slidesEl: t, params: i} = this
          , r = Ut(t, `.${i.slideClass}, swiper-slide`)
          , n = ta(r[0]);
        return ta(e) - n
    }
    getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.find(t => t.getAttribute("data-swiper-slide-index") * 1 === e))
    }
    recalcSlides() {
        const e = this
          , {slidesEl: t, params: i} = e;
        e.slides = Ut(t, `.${i.slideClass}, swiper-slide`)
    }
    enable() {
        const e = this;
        e.enabled || (e.enabled = !0,
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"))
    }
    disable() {
        const e = this;
        e.enabled && (e.enabled = !1,
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"))
    }
    setProgress(e, t) {
        const i = this;
        e = Math.min(Math.max(e, 0), 1);
        const r = i.minTranslate()
          , o = (i.maxTranslate() - r) * e + r;
        i.translateTo(o, typeof t > "u" ? 0 : t),
        i.updateActiveIndex(),
        i.updateSlidesClasses()
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = e.el.className.split(" ").filter(i => i.indexOf("swiper") === 0 || i.indexOf(e.params.containerModifierClass) === 0);
        e.emit("_containerClasses", t.join(" "))
    }
    getSlideClasses(e) {
        const t = this;
        return t.destroyed ? "" : e.className.split(" ").filter(i => i.indexOf("swiper-slide") === 0 || i.indexOf(t.params.slideClass) === 0).join(" ")
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = [];
        e.slides.forEach(i => {
            const r = e.getSlideClasses(i);
            t.push({
                slideEl: i,
                classNames: r
            }),
            e.emit("_slideClass", i, r)
        }
        ),
        e.emit("_slideClasses", t)
    }
    slidesPerViewDynamic(e, t) {
        e === void 0 && (e = "current"),
        t === void 0 && (t = !1);
        const i = this
          , {params: r, slides: n, slidesGrid: o, slidesSizesGrid: l, size: c, activeIndex: f} = i;
        let h = 1;
        if (typeof r.slidesPerView == "number")
            return r.slidesPerView;
        if (r.centeredSlides) {
            let w = n[f] ? Math.ceil(n[f].swiperSlideSize) : 0, _;
            for (let y = f + 1; y < n.length; y += 1)
                n[y] && !_ && (w += Math.ceil(n[y].swiperSlideSize),
                h += 1,
                w > c && (_ = !0));
            for (let y = f - 1; y >= 0; y -= 1)
                n[y] && !_ && (w += n[y].swiperSlideSize,
                h += 1,
                w > c && (_ = !0))
        } else if (e === "current")
            for (let w = f + 1; w < n.length; w += 1)
                (t ? o[w] + l[w] - o[f] < c : o[w] - o[f] < c) && (h += 1);
        else
            for (let w = f - 1; w >= 0; w -= 1)
                o[f] - o[w] < c && (h += 1);
        return h
    }
    update() {
        const e = this;
        if (!e || e.destroyed)
            return;
        const {snapGrid: t, params: i} = e;
        i.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach(o => {
            o.complete && Aa(e, o)
        }
        ),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses();
        function r() {
            const o = e.rtlTranslate ? e.translate * -1 : e.translate
              , l = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
            e.setTranslate(l),
            e.updateActiveIndex(),
            e.updateSlidesClasses()
        }
        let n;
        if (i.freeMode && i.freeMode.enabled && !i.cssMode)
            r(),
            i.autoHeight && e.updateAutoHeight();
        else {
            if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && e.isEnd && !i.centeredSlides) {
                const o = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
                n = e.slideTo(o.length - 1, 0, !1, !0)
            } else
                n = e.slideTo(e.activeIndex, 0, !1, !0);
            n || r()
        }
        i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update")
    }
    changeDirection(e, t) {
        t === void 0 && (t = !0);
        const i = this
          , r = i.params.direction;
        return e || (e = r === "horizontal" ? "vertical" : "horizontal"),
        e === r || e !== "horizontal" && e !== "vertical" || (i.el.classList.remove(`${i.params.containerModifierClass}${r}`),
        i.el.classList.add(`${i.params.containerModifierClass}${e}`),
        i.emitContainerClasses(),
        i.params.direction = e,
        i.slides.forEach(n => {
            e === "vertical" ? n.style.width = "" : n.style.height = ""
        }
        ),
        i.emit("changeDirection"),
        t && i.update()),
        i
    }
    changeLanguageDirection(e) {
        const t = this;
        t.rtl && e === "rtl" || !t.rtl && e === "ltr" || (t.rtl = e === "rtl",
        t.rtlTranslate = t.params.direction === "horizontal" && t.rtl,
        t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
        t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
        t.el.dir = "ltr"),
        t.update())
    }
    mount(e) {
        const t = this;
        if (t.mounted)
            return !0;
        let i = e || t.params.el;
        if (typeof i == "string" && (i = document.querySelector(i)),
        !i)
            return !1;
        i.swiper = t,
        i.parentNode && i.parentNode.host && i.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
        const r = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let o = i && i.shadowRoot && i.shadowRoot.querySelector ? i.shadowRoot.querySelector(r()) : Ut(i, r())[0];
        return !o && t.params.createElements && (o = Hi("div", t.params.wrapperClass),
        i.append(o),
        Ut(i, `.${t.params.slideClass}`).forEach(l => {
            o.append(l)
        }
        )),
        Object.assign(t, {
            el: i,
            wrapperEl: o,
            slidesEl: t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : o,
            hostEl: t.isElement ? i.parentNode.host : i,
            mounted: !0,
            rtl: i.dir.toLowerCase() === "rtl" || Qr(i, "direction") === "rtl",
            rtlTranslate: t.params.direction === "horizontal" && (i.dir.toLowerCase() === "rtl" || Qr(i, "direction") === "rtl"),
            wrongRTL: Qr(o, "display") === "-webkit-box"
        }),
        !0
    }
    init(e) {
        const t = this;
        if (t.initialized || t.mount(e) === !1)
            return t;
        t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
        t.params.loop && t.loopCreate(void 0, !0),
        t.attachEvents();
        const r = [...t.el.querySelectorAll('[loading="lazy"]')];
        return t.isElement && r.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        r.forEach(n => {
            n.complete ? Aa(t, n) : n.addEventListener("load", o => {
                Aa(t, o.target)
            }
            )
        }
        ),
        pl(t),
        t.initialized = !0,
        pl(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
    }
    destroy(e, t) {
        e === void 0 && (e = !0),
        t === void 0 && (t = !0);
        const i = this
          , {params: r, el: n, wrapperEl: o, slides: l} = i;
        return typeof i.params > "u" || i.destroyed || (i.emit("beforeDestroy"),
        i.initialized = !1,
        i.detachEvents(),
        r.loop && i.loopDestroy(),
        t && (i.removeClasses(),
        n && typeof n != "string" && n.removeAttribute("style"),
        o && o.removeAttribute("style"),
        l && l.length && l.forEach(c => {
            c.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass),
            c.removeAttribute("style"),
            c.removeAttribute("data-swiper-slide-index")
        }
        )),
        i.emit("destroy"),
        Object.keys(i.eventsListeners).forEach(c => {
            i.off(c)
        }
        ),
        e !== !1 && (i.el && typeof i.el != "string" && (i.el.swiper = null),
        ph(i)),
        i.destroyed = !0),
        null
    }
    static extendDefaults(e) {
        Ii(No, e)
    }
    static get extendedDefaults() {
        return No
    }
    static get defaults() {
        return Hu
    }
    static installModule(e) {
        bi.prototype.__modules__ || (bi.prototype.__modules__ = []);
        const t = bi.prototype.__modules__;
        typeof e == "function" && t.indexOf(e) < 0 && t.push(e)
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach(t => bi.installModule(t)),
        bi) : (bi.installModule(e),
        bi)
    }
}
Object.keys(Ro).forEach(s => {
    Object.keys(Ro[s]).forEach(e => {
        bi.prototype[e] = Ro[s][e]
    }
    )
}
);
bi.use([Sh, Th]);
function Am(s) {
    let {swiper: e, extendParams: t, on: i, emit: r} = s;
    t({
        virtual: {
            enabled: !1,
            slides: [],
            cache: !0,
            renderSlide: null,
            renderExternal: null,
            renderExternalUpdate: !0,
            addSlidesBefore: 0,
            addSlidesAfter: 0
        }
    });
    let n;
    const o = jt();
    e.virtual = {
        cache: {},
        from: void 0,
        to: void 0,
        slides: [],
        offset: 0,
        slidesGrid: []
    };
    const l = o.createElement("div");
    function c(g, p) {
        const S = e.params.virtual;
        if (S.cache && e.virtual.cache[p])
            return e.virtual.cache[p];
        let T;
        return S.renderSlide ? (T = S.renderSlide.call(e, g, p),
        typeof T == "string" && (Nr(l, T),
        T = l.children[0])) : e.isElement ? T = Hi("swiper-slide") : T = Hi("div", e.params.slideClass),
        T.setAttribute("data-swiper-slide-index", p),
        S.renderSlide || Nr(T, g),
        S.cache && (e.virtual.cache[p] = T),
        T
    }
    function f(g, p, S) {
        const {slidesPerView: T, slidesPerGroup: C, centeredSlides: E, loop: P, initialSlide: k} = e.params;
        if (p && !P && k > 0)
            return;
        const {addSlidesBefore: R, addSlidesAfter: d} = e.params.virtual
          , {from: N, to: L, slides: O, slidesGrid: X, offset: I} = e.virtual;
        e.params.cssMode || e.updateActiveIndex();
        const H = typeof S > "u" ? e.activeIndex || 0 : S;
        let q;
        e.rtlTranslate ? q = "right" : q = e.isHorizontal() ? "left" : "top";
        let V, Q;
        E ? (V = Math.floor(T / 2) + C + d,
        Q = Math.floor(T / 2) + C + R) : (V = T + (C - 1) + d,
        Q = (P ? T : C) + R);
        let F = H - Q
          , Y = H + V;
        P || (F = Math.max(F, 0),
        Y = Math.min(Y, O.length - 1));
        let Z = (e.slidesGrid[F] || 0) - (e.slidesGrid[0] || 0);
        P && H >= Q ? (F -= Q,
        E || (Z += e.slidesGrid[0])) : P && H < Q && (F = -Q,
        E && (Z += e.slidesGrid[0])),
        Object.assign(e.virtual, {
            from: F,
            to: Y,
            offset: Z,
            slidesGrid: e.slidesGrid,
            slidesBefore: Q,
            slidesAfter: V
        });
        function $() {
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            r("virtualUpdate")
        }
        if (N === F && L === Y && !g) {
            e.slidesGrid !== X && Z !== I && e.slides.forEach(ee => {
                ee.style[q] = `${Z - Math.abs(e.cssOverflowAdjustment())}px`
            }
            ),
            e.updateProgress(),
            r("virtualUpdate");
            return
        }
        if (e.params.virtual.renderExternal) {
            e.params.virtual.renderExternal.call(e, {
                offset: Z,
                from: F,
                to: Y,
                slides: function() {
                    const ne = [];
                    for (let me = F; me <= Y; me += 1)
                        ne.push(O[me]);
                    return ne
                }()
            }),
            e.params.virtual.renderExternalUpdate ? $() : r("virtualUpdate");
            return
        }
        const he = []
          , Oe = []
          , nt = ee => {
            let ne = ee;
            return ee < 0 ? ne = O.length + ee : ne >= O.length && (ne = ne - O.length),
            ne
        }
        ;
        if (g)
            e.slides.filter(ee => ee.matches(`.${e.params.slideClass}, swiper-slide`)).forEach(ee => {
                ee.remove()
            }
            );
        else
            for (let ee = N; ee <= L; ee += 1)
                if (ee < F || ee > Y) {
                    const ne = nt(ee);
                    e.slides.filter(me => me.matches(`.${e.params.slideClass}[data-swiper-slide-index="${ne}"], swiper-slide[data-swiper-slide-index="${ne}"]`)).forEach(me => {
                        me.remove()
                    }
                    )
                }
        const je = P ? -O.length : 0
          , re = P ? O.length * 2 : O.length;
        for (let ee = je; ee < re; ee += 1)
            if (ee >= F && ee <= Y) {
                const ne = nt(ee);
                typeof L > "u" || g ? Oe.push(ne) : (ee > L && Oe.push(ne),
                ee < N && he.push(ne))
            }
        if (Oe.forEach(ee => {
            e.slidesEl.append(c(O[ee], ee))
        }
        ),
        P)
            for (let ee = he.length - 1; ee >= 0; ee -= 1) {
                const ne = he[ee];
                e.slidesEl.prepend(c(O[ne], ne))
            }
        else
            he.sort( (ee, ne) => ne - ee),
            he.forEach(ee => {
                e.slidesEl.prepend(c(O[ee], ee))
            }
            );
        Ut(e.slidesEl, ".swiper-slide, swiper-slide").forEach(ee => {
            ee.style[q] = `${Z - Math.abs(e.cssOverflowAdjustment())}px`
        }
        ),
        $()
    }
    function h(g) {
        if (typeof g == "object" && "length"in g)
            for (let p = 0; p < g.length; p += 1)
                g[p] && e.virtual.slides.push(g[p]);
        else
            e.virtual.slides.push(g);
        f(!0)
    }
    function w(g) {
        const p = e.activeIndex;
        let S = p + 1
          , T = 1;
        if (Array.isArray(g)) {
            for (let C = 0; C < g.length; C += 1)
                g[C] && e.virtual.slides.unshift(g[C]);
            S = p + g.length,
            T = g.length
        } else
            e.virtual.slides.unshift(g);
        if (e.params.virtual.cache) {
            const C = e.virtual.cache
              , E = {};
            Object.keys(C).forEach(P => {
                const k = C[P]
                  , R = k.getAttribute("data-swiper-slide-index");
                R && k.setAttribute("data-swiper-slide-index", parseInt(R, 10) + T),
                E[parseInt(P, 10) + T] = k
            }
            ),
            e.virtual.cache = E
        }
        f(!0),
        e.slideTo(S, 0)
    }
    function _(g) {
        if (typeof g > "u" || g === null)
            return;
        let p = e.activeIndex;
        if (Array.isArray(g))
            for (let S = g.length - 1; S >= 0; S -= 1)
                e.params.virtual.cache && (delete e.virtual.cache[g[S]],
                Object.keys(e.virtual.cache).forEach(T => {
                    T > g && (e.virtual.cache[T - 1] = e.virtual.cache[T],
                    e.virtual.cache[T - 1].setAttribute("data-swiper-slide-index", T - 1),
                    delete e.virtual.cache[T])
                }
                )),
                e.virtual.slides.splice(g[S], 1),
                g[S] < p && (p -= 1),
                p = Math.max(p, 0);
        else
            e.params.virtual.cache && (delete e.virtual.cache[g],
            Object.keys(e.virtual.cache).forEach(S => {
                S > g && (e.virtual.cache[S - 1] = e.virtual.cache[S],
                e.virtual.cache[S - 1].setAttribute("data-swiper-slide-index", S - 1),
                delete e.virtual.cache[S])
            }
            )),
            e.virtual.slides.splice(g, 1),
            g < p && (p -= 1),
            p = Math.max(p, 0);
        f(!0),
        e.slideTo(p, 0)
    }
    function y() {
        e.virtual.slides = [],
        e.params.virtual.cache && (e.virtual.cache = {}),
        f(!0),
        e.slideTo(0, 0)
    }
    i("beforeInit", () => {
        if (!e.params.virtual.enabled)
            return;
        let g;
        if (typeof e.passedParams.virtual.slides > "u") {
            const p = [...e.slidesEl.children].filter(S => S.matches(`.${e.params.slideClass}, swiper-slide`));
            p && p.length && (e.virtual.slides = [...p],
            g = !0,
            p.forEach( (S, T) => {
                S.setAttribute("data-swiper-slide-index", T),
                e.virtual.cache[T] = S,
                S.remove()
            }
            ))
        }
        g || (e.virtual.slides = e.params.virtual.slides),
        e.classNames.push(`${e.params.containerModifierClass}virtual`),
        e.params.watchSlidesProgress = !0,
        e.originalParams.watchSlidesProgress = !0,
        f(!1, !0)
    }
    ),
    i("setTranslate", () => {
        e.params.virtual.enabled && (e.params.cssMode && !e._immediateVirtual ? (clearTimeout(n),
        n = setTimeout( () => {
            f()
        }
        , 100)) : f())
    }
    ),
    i("init update resize", () => {
        e.params.virtual.enabled && e.params.cssMode && Ms(e.wrapperEl, "--swiper-virtual-size", `${e.virtualSize}px`)
    }
    ),
    Object.assign(e.virtual, {
        appendSlide: h,
        prependSlide: w,
        removeSlide: _,
        removeAllSlides: y,
        update: f
    })
}
function km(s) {
    let {swiper: e, extendParams: t, on: i, emit: r} = s;
    const n = jt()
      , o = ht();
    e.keyboard = {
        enabled: !1
    },
    t({
        keyboard: {
            enabled: !1,
            onlyInViewport: !0,
            pageUpDown: !0
        }
    });
    function l(h) {
        if (!e.enabled)
            return;
        const {rtlTranslate: w} = e;
        let _ = h;
        _.originalEvent && (_ = _.originalEvent);
        const y = _.keyCode || _.charCode
          , g = e.params.keyboard.pageUpDown
          , p = g && y === 33
          , S = g && y === 34
          , T = y === 37
          , C = y === 39
          , E = y === 38
          , P = y === 40;
        if (!e.allowSlideNext && (e.isHorizontal() && C || e.isVertical() && P || S) || !e.allowSlidePrev && (e.isHorizontal() && T || e.isVertical() && E || p))
            return !1;
        if (!(_.shiftKey || _.altKey || _.ctrlKey || _.metaKey) && !(n.activeElement && n.activeElement.nodeName && (n.activeElement.nodeName.toLowerCase() === "input" || n.activeElement.nodeName.toLowerCase() === "textarea"))) {
            if (e.params.keyboard.onlyInViewport && (p || S || T || C || E || P)) {
                let k = !1;
                if (Mn(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 && Mn(e.el, `.${e.params.slideActiveClass}`).length === 0)
                    return;
                const R = e.el
                  , d = R.clientWidth
                  , N = R.clientHeight
                  , L = o.innerWidth
                  , O = o.innerHeight
                  , X = Wa(R);
                w && (X.left -= R.scrollLeft);
                const I = [[X.left, X.top], [X.left + d, X.top], [X.left, X.top + N], [X.left + d, X.top + N]];
                for (let H = 0; H < I.length; H += 1) {
                    const q = I[H];
                    if (q[0] >= 0 && q[0] <= L && q[1] >= 0 && q[1] <= O) {
                        if (q[0] === 0 && q[1] === 0)
                            continue;
                        k = !0
                    }
                }
                if (!k)
                    return
            }
            e.isHorizontal() ? ((p || S || T || C) && (_.preventDefault ? _.preventDefault() : _.returnValue = !1),
            ((S || C) && !w || (p || T) && w) && e.slideNext(),
            ((p || T) && !w || (S || C) && w) && e.slidePrev()) : ((p || S || E || P) && (_.preventDefault ? _.preventDefault() : _.returnValue = !1),
            (S || P) && e.slideNext(),
            (p || E) && e.slidePrev()),
            r("keyPress", y)
        }
    }
    function c() {
        e.keyboard.enabled || (n.addEventListener("keydown", l),
        e.keyboard.enabled = !0)
    }
    function f() {
        e.keyboard.enabled && (n.removeEventListener("keydown", l),
        e.keyboard.enabled = !1)
    }
    i("init", () => {
        e.params.keyboard.enabled && c()
    }
    ),
    i("destroy", () => {
        e.keyboard.enabled && f()
    }
    ),
    Object.assign(e.keyboard, {
        enable: c,
        disable: f
    })
}
function Lm(s) {
    let {swiper: e, extendParams: t, on: i, emit: r} = s;
    const n = ht();
    t({
        mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarget: "container",
            thresholdDelta: null,
            thresholdTime: null,
            noMousewheelClass: "swiper-no-mousewheel"
        }
    }),
    e.mousewheel = {
        enabled: !1
    };
    let o, l = Ki(), c;
    const f = [];
    function h(E) {
        let d = 0
          , N = 0
          , L = 0
          , O = 0;
        return "detail"in E && (N = E.detail),
        "wheelDelta"in E && (N = -E.wheelDelta / 120),
        "wheelDeltaY"in E && (N = -E.wheelDeltaY / 120),
        "wheelDeltaX"in E && (d = -E.wheelDeltaX / 120),
        "axis"in E && E.axis === E.HORIZONTAL_AXIS && (d = N,
        N = 0),
        L = d * 10,
        O = N * 10,
        "deltaY"in E && (O = E.deltaY),
        "deltaX"in E && (L = E.deltaX),
        E.shiftKey && !L && (L = O,
        O = 0),
        (L || O) && E.deltaMode && (E.deltaMode === 1 ? (L *= 40,
        O *= 40) : (L *= 800,
        O *= 800)),
        L && !d && (d = L < 1 ? -1 : 1),
        O && !N && (N = O < 1 ? -1 : 1),
        {
            spinX: d,
            spinY: N,
            pixelX: L,
            pixelY: O
        }
    }
    function w() {
        e.enabled && (e.mouseEntered = !0)
    }
    function _() {
        e.enabled && (e.mouseEntered = !1)
    }
    function y(E) {
        return e.params.mousewheel.thresholdDelta && E.delta < e.params.mousewheel.thresholdDelta || e.params.mousewheel.thresholdTime && Ki() - l < e.params.mousewheel.thresholdTime ? !1 : E.delta >= 6 && Ki() - l < 60 ? !0 : (E.direction < 0 ? (!e.isEnd || e.params.loop) && !e.animating && (e.slideNext(),
        r("scroll", E.raw)) : (!e.isBeginning || e.params.loop) && !e.animating && (e.slidePrev(),
        r("scroll", E.raw)),
        l = new n.Date().getTime(),
        !1)
    }
    function g(E) {
        const P = e.params.mousewheel;
        if (E.direction < 0) {
            if (e.isEnd && !e.params.loop && P.releaseOnEdges)
                return !0
        } else if (e.isBeginning && !e.params.loop && P.releaseOnEdges)
            return !0;
        return !1
    }
    function p(E) {
        let P = E
          , k = !0;
        if (!e.enabled || E.target.closest(`.${e.params.mousewheel.noMousewheelClass}`))
            return;
        const R = e.params.mousewheel;
        e.params.cssMode && P.preventDefault();
        let d = e.el;
        e.params.mousewheel.eventsTarget !== "container" && (d = document.querySelector(e.params.mousewheel.eventsTarget));
        const N = d && d.contains(P.target);
        if (!e.mouseEntered && !N && !R.releaseOnEdges)
            return !0;
        P.originalEvent && (P = P.originalEvent);
        let L = 0;
        const O = e.rtlTranslate ? -1 : 1
          , X = h(P);
        if (R.forceToAxis)
            if (e.isHorizontal())
                if (Math.abs(X.pixelX) > Math.abs(X.pixelY))
                    L = -X.pixelX * O;
                else
                    return !0;
            else if (Math.abs(X.pixelY) > Math.abs(X.pixelX))
                L = -X.pixelY;
            else
                return !0;
        else
            L = Math.abs(X.pixelX) > Math.abs(X.pixelY) ? -X.pixelX * O : -X.pixelY;
        if (L === 0)
            return !0;
        R.invert && (L = -L);
        let I = e.getTranslate() + L * R.sensitivity;
        if (I >= e.minTranslate() && (I = e.minTranslate()),
        I <= e.maxTranslate() && (I = e.maxTranslate()),
        k = e.params.loop ? !0 : !(I === e.minTranslate() || I === e.maxTranslate()),
        k && e.params.nested && P.stopPropagation(),
        !e.params.freeMode || !e.params.freeMode.enabled) {
            const H = {
                time: Ki(),
                delta: Math.abs(L),
                direction: Math.sign(L),
                raw: E
            };
            f.length >= 2 && f.shift();
            const q = f.length ? f[f.length - 1] : void 0;
            if (f.push(H),
            q ? (H.direction !== q.direction || H.delta > q.delta || H.time > q.time + 150) && y(H) : y(H),
            g(H))
                return !0
        } else {
            const H = {
                time: Ki(),
                delta: Math.abs(L),
                direction: Math.sign(L)
            }
              , q = c && H.time < c.time + 500 && H.delta <= c.delta && H.direction === c.direction;
            if (!q) {
                c = void 0;
                let V = e.getTranslate() + L * R.sensitivity;
                const Q = e.isBeginning
                  , F = e.isEnd;
                if (V >= e.minTranslate() && (V = e.minTranslate()),
                V <= e.maxTranslate() && (V = e.maxTranslate()),
                e.setTransition(0),
                e.setTranslate(V),
                e.updateProgress(),
                e.updateActiveIndex(),
                e.updateSlidesClasses(),
                (!Q && e.isBeginning || !F && e.isEnd) && e.updateSlidesClasses(),
                e.params.loop && e.loopFix({
                    direction: H.direction < 0 ? "next" : "prev",
                    byMousewheel: !0
                }),
                e.params.freeMode.sticky) {
                    clearTimeout(o),
                    o = void 0,
                    f.length >= 15 && f.shift();
                    const Y = f.length ? f[f.length - 1] : void 0
                      , Z = f[0];
                    if (f.push(H),
                    Y && (H.delta > Y.delta || H.direction !== Y.direction))
                        f.splice(0);
                    else if (f.length >= 15 && H.time - Z.time < 500 && Z.delta - H.delta >= 1 && H.delta <= 6) {
                        const $ = L > 0 ? .8 : .2;
                        c = H,
                        f.splice(0),
                        o = On( () => {
                            e.destroyed || !e.params || e.slideToClosest(e.params.speed, !0, void 0, $)
                        }
                        , 0)
                    }
                    o || (o = On( () => {
                        if (e.destroyed || !e.params)
                            return;
                        const $ = .5;
                        c = H,
                        f.splice(0),
                        e.slideToClosest(e.params.speed, !0, void 0, $)
                    }
                    , 500))
                }
                if (q || r("scroll", P),
                e.params.autoplay && e.params.autoplay.disableOnInteraction && e.autoplay.stop(),
                R.releaseOnEdges && (V === e.minTranslate() || V === e.maxTranslate()))
                    return !0
            }
        }
        return P.preventDefault ? P.preventDefault() : P.returnValue = !1,
        !1
    }
    function S(E) {
        let P = e.el;
        e.params.mousewheel.eventsTarget !== "container" && (P = document.querySelector(e.params.mousewheel.eventsTarget)),
        P[E]("mouseenter", w),
        P[E]("mouseleave", _),
        P[E]("wheel", p)
    }
    function T() {
        return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", p),
        !0) : e.mousewheel.enabled ? !1 : (S("addEventListener"),
        e.mousewheel.enabled = !0,
        !0)
    }
    function C() {
        return e.params.cssMode ? (e.wrapperEl.addEventListener(event, p),
        !0) : e.mousewheel.enabled ? (S("removeEventListener"),
        e.mousewheel.enabled = !1,
        !0) : !1
    }
    i("init", () => {
        !e.params.mousewheel.enabled && e.params.cssMode && C(),
        e.params.mousewheel.enabled && T()
    }
    ),
    i("destroy", () => {
        e.params.cssMode && T(),
        e.mousewheel.enabled && C()
    }
    ),
    Object.assign(e.mousewheel, {
        enable: T,
        disable: C
    })
}
function Xl(s, e, t, i) {
    return s.params.createElements && Object.keys(i).forEach(r => {
        if (!t[r] && t.auto === !0) {
            let n = Ut(s.el, `.${i[r]}`)[0];
            n || (n = Hi("div", i[r]),
            n.className = i[r],
            s.el.append(n)),
            t[r] = n,
            e[r] = n
        }
    }
    ),
    t
}
function Om(s) {
    let {swiper: e, extendParams: t, on: i, emit: r} = s;
    t({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
        }
    }),
    e.navigation = {
        nextEl: null,
        prevEl: null
    };
    function n(g) {
        let p;
        return g && typeof g == "string" && e.isElement && (p = e.el.querySelector(g) || e.hostEl.querySelector(g),
        p) ? p : (g && (typeof g == "string" && (p = [...document.querySelectorAll(g)]),
        e.params.uniqueNavElements && typeof g == "string" && p && p.length > 1 && e.el.querySelectorAll(g).length === 1 ? p = e.el.querySelector(g) : p && p.length === 1 && (p = p[0])),
        g && !p ? g : p)
    }
    function o(g, p) {
        const S = e.params.navigation;
        g = Re(g),
        g.forEach(T => {
            T && (T.classList[p ? "add" : "remove"](...S.disabledClass.split(" ")),
            T.tagName === "BUTTON" && (T.disabled = p),
            e.params.watchOverflow && e.enabled && T.classList[e.isLocked ? "add" : "remove"](S.lockClass))
        }
        )
    }
    function l() {
        const {nextEl: g, prevEl: p} = e.navigation;
        if (e.params.loop) {
            o(p, !1),
            o(g, !1);
            return
        }
        o(p, e.isBeginning && !e.params.rewind),
        o(g, e.isEnd && !e.params.rewind)
    }
    function c(g) {
        g.preventDefault(),
        !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(),
        r("navigationPrev"))
    }
    function f(g) {
        g.preventDefault(),
        !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(),
        r("navigationNext"))
    }
    function h() {
        const g = e.params.navigation;
        if (e.params.navigation = Xl(e, e.originalParams.navigation, e.params.navigation, {
            nextEl: "swiper-button-next",
            prevEl: "swiper-button-prev"
        }),
        !(g.nextEl || g.prevEl))
            return;
        let p = n(g.nextEl)
          , S = n(g.prevEl);
        Object.assign(e.navigation, {
            nextEl: p,
            prevEl: S
        }),
        p = Re(p),
        S = Re(S);
        const T = (C, E) => {
            C && C.addEventListener("click", E === "next" ? f : c),
            !e.enabled && C && C.classList.add(...g.lockClass.split(" "))
        }
        ;
        p.forEach(C => T(C, "next")),
        S.forEach(C => T(C, "prev"))
    }
    function w() {
        let {nextEl: g, prevEl: p} = e.navigation;
        g = Re(g),
        p = Re(p);
        const S = (T, C) => {
            T.removeEventListener("click", C === "next" ? f : c),
            T.classList.remove(...e.params.navigation.disabledClass.split(" "))
        }
        ;
        g.forEach(T => S(T, "next")),
        p.forEach(T => S(T, "prev"))
    }
    i("init", () => {
        e.params.navigation.enabled === !1 ? y() : (h(),
        l())
    }
    ),
    i("toEdge fromEdge lock unlock", () => {
        l()
    }
    ),
    i("destroy", () => {
        w()
    }
    ),
    i("enable disable", () => {
        let {nextEl: g, prevEl: p} = e.navigation;
        if (g = Re(g),
        p = Re(p),
        e.enabled) {
            l();
            return
        }
        [...g, ...p].filter(S => !!S).forEach(S => S.classList.add(e.params.navigation.lockClass))
    }
    ),
    i("click", (g, p) => {
        let {nextEl: S, prevEl: T} = e.navigation;
        S = Re(S),
        T = Re(T);
        const C = p.target;
        let E = T.includes(C) || S.includes(C);
        if (e.isElement && !E) {
            const P = p.path || p.composedPath && p.composedPath();
            P && (E = P.find(k => S.includes(k) || T.includes(k)))
        }
        if (e.params.navigation.hideOnClick && !E) {
            if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === C || e.pagination.el.contains(C)))
                return;
            let P;
            S.length ? P = S[0].classList.contains(e.params.navigation.hiddenClass) : T.length && (P = T[0].classList.contains(e.params.navigation.hiddenClass)),
            r(P === !0 ? "navigationShow" : "navigationHide"),
            [...S, ...T].filter(k => !!k).forEach(k => k.classList.toggle(e.params.navigation.hiddenClass))
        }
    }
    );
    const _ = () => {
        e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")),
        h(),
        l()
    }
      , y = () => {
        e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")),
        w()
    }
    ;
    Object.assign(e.navigation, {
        enable: _,
        disable: y,
        update: l,
        init: h,
        destroy: w
    })
}
function Lr(s) {
    return s === void 0 && (s = ""),
    `.${s.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`
}
function Dm(s) {
    let {swiper: e, extendParams: t, on: i, emit: r} = s;
    const n = "swiper-pagination";
    t({
        pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: C => C,
            formatFractionTotal: C => C,
            bulletClass: `${n}-bullet`,
            bulletActiveClass: `${n}-bullet-active`,
            modifierClass: `${n}-`,
            currentClass: `${n}-current`,
            totalClass: `${n}-total`,
            hiddenClass: `${n}-hidden`,
            progressbarFillClass: `${n}-progressbar-fill`,
            progressbarOppositeClass: `${n}-progressbar-opposite`,
            clickableClass: `${n}-clickable`,
            lockClass: `${n}-lock`,
            horizontalClass: `${n}-horizontal`,
            verticalClass: `${n}-vertical`,
            paginationDisabledClass: `${n}-disabled`
        }
    }),
    e.pagination = {
        el: null,
        bullets: []
    };
    let o, l = 0;
    function c() {
        return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0
    }
    function f(C, E) {
        const {bulletActiveClass: P} = e.params.pagination;
        C && (C = C[`${E === "prev" ? "previous" : "next"}ElementSibling`],
        C && (C.classList.add(`${P}-${E}`),
        C = C[`${E === "prev" ? "previous" : "next"}ElementSibling`],
        C && C.classList.add(`${P}-${E}-${E}`)))
    }
    function h(C, E, P) {
        if (C = C % P,
        E = E % P,
        E === C + 1)
            return "next";
        if (E === C - 1)
            return "previous"
    }
    function w(C) {
        const E = C.target.closest(Lr(e.params.pagination.bulletClass));
        if (!E)
            return;
        C.preventDefault();
        const P = ta(E) * e.params.slidesPerGroup;
        if (e.params.loop) {
            if (e.realIndex === P)
                return;
            const k = h(e.realIndex, P, e.slides.length);
            k === "next" ? e.slideNext() : k === "previous" ? e.slidePrev() : e.slideToLoop(P)
        } else
            e.slideTo(P)
    }
    function _() {
        const C = e.rtl
          , E = e.params.pagination;
        if (c())
            return;
        let P = e.pagination.el;
        P = Re(P);
        let k, R;
        const d = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length
          , N = e.params.loop ? Math.ceil(d / e.params.slidesPerGroup) : e.snapGrid.length;
        if (e.params.loop ? (R = e.previousRealIndex || 0,
        k = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : typeof e.snapIndex < "u" ? (k = e.snapIndex,
        R = e.previousSnapIndex) : (R = e.previousIndex || 0,
        k = e.activeIndex || 0),
        E.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
            const L = e.pagination.bullets;
            let O, X, I;
            if (E.dynamicBullets && (o = dl(L[0], e.isHorizontal() ? "width" : "height"),
            P.forEach(H => {
                H.style[e.isHorizontal() ? "width" : "height"] = `${o * (E.dynamicMainBullets + 4)}px`
            }
            ),
            E.dynamicMainBullets > 1 && R !== void 0 && (l += k - (R || 0),
            l > E.dynamicMainBullets - 1 ? l = E.dynamicMainBullets - 1 : l < 0 && (l = 0)),
            O = Math.max(k - l, 0),
            X = O + (Math.min(L.length, E.dynamicMainBullets) - 1),
            I = (X + O) / 2),
            L.forEach(H => {
                const q = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(V => `${E.bulletActiveClass}${V}`)].map(V => typeof V == "string" && V.includes(" ") ? V.split(" ") : V).flat();
                H.classList.remove(...q)
            }
            ),
            P.length > 1)
                L.forEach(H => {
                    const q = ta(H);
                    q === k ? H.classList.add(...E.bulletActiveClass.split(" ")) : e.isElement && H.setAttribute("part", "bullet"),
                    E.dynamicBullets && (q >= O && q <= X && H.classList.add(...`${E.bulletActiveClass}-main`.split(" ")),
                    q === O && f(H, "prev"),
                    q === X && f(H, "next"))
                }
                );
            else {
                const H = L[k];
                if (H && H.classList.add(...E.bulletActiveClass.split(" ")),
                e.isElement && L.forEach( (q, V) => {
                    q.setAttribute("part", V === k ? "bullet-active" : "bullet")
                }
                ),
                E.dynamicBullets) {
                    const q = L[O]
                      , V = L[X];
                    for (let Q = O; Q <= X; Q += 1)
                        L[Q] && L[Q].classList.add(...`${E.bulletActiveClass}-main`.split(" "));
                    f(q, "prev"),
                    f(V, "next")
                }
            }
            if (E.dynamicBullets) {
                const H = Math.min(L.length, E.dynamicMainBullets + 4)
                  , q = (o * H - o) / 2 - I * o
                  , V = C ? "right" : "left";
                L.forEach(Q => {
                    Q.style[e.isHorizontal() ? V : "top"] = `${q}px`
                }
                )
            }
        }
        P.forEach( (L, O) => {
            if (E.type === "fraction" && (L.querySelectorAll(Lr(E.currentClass)).forEach(X => {
                X.textContent = E.formatFractionCurrent(k + 1)
            }
            ),
            L.querySelectorAll(Lr(E.totalClass)).forEach(X => {
                X.textContent = E.formatFractionTotal(N)
            }
            )),
            E.type === "progressbar") {
                let X;
                E.progressbarOpposite ? X = e.isHorizontal() ? "vertical" : "horizontal" : X = e.isHorizontal() ? "horizontal" : "vertical";
                const I = (k + 1) / N;
                let H = 1
                  , q = 1;
                X === "horizontal" ? H = I : q = I,
                L.querySelectorAll(Lr(E.progressbarFillClass)).forEach(V => {
                    V.style.transform = `translate3d(0,0,0) scaleX(${H}) scaleY(${q})`,
                    V.style.transitionDuration = `${e.params.speed}ms`
                }
                )
            }
            E.type === "custom" && E.renderCustom ? (Nr(L, E.renderCustom(e, k + 1, N)),
            O === 0 && r("paginationRender", L)) : (O === 0 && r("paginationRender", L),
            r("paginationUpdate", L)),
            e.params.watchOverflow && e.enabled && L.classList[e.isLocked ? "add" : "remove"](E.lockClass)
        }
        )
    }
    function y() {
        const C = e.params.pagination;
        if (c())
            return;
        const E = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length;
        let P = e.pagination.el;
        P = Re(P);
        let k = "";
        if (C.type === "bullets") {
            let R = e.params.loop ? Math.ceil(E / e.params.slidesPerGroup) : e.snapGrid.length;
            e.params.freeMode && e.params.freeMode.enabled && R > E && (R = E);
            for (let d = 0; d < R; d += 1)
                C.renderBullet ? k += C.renderBullet.call(e, d, C.bulletClass) : k += `<${C.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${C.bulletClass}"></${C.bulletElement}>`
        }
        C.type === "fraction" && (C.renderFraction ? k = C.renderFraction.call(e, C.currentClass, C.totalClass) : k = `<span class="${C.currentClass}"></span> / <span class="${C.totalClass}"></span>`),
        C.type === "progressbar" && (C.renderProgressbar ? k = C.renderProgressbar.call(e, C.progressbarFillClass) : k = `<span class="${C.progressbarFillClass}"></span>`),
        e.pagination.bullets = [],
        P.forEach(R => {
            C.type !== "custom" && Nr(R, k || ""),
            C.type === "bullets" && e.pagination.bullets.push(...R.querySelectorAll(Lr(C.bulletClass)))
        }
        ),
        C.type !== "custom" && r("paginationRender", P[0])
    }
    function g() {
        e.params.pagination = Xl(e, e.originalParams.pagination, e.params.pagination, {
            el: "swiper-pagination"
        });
        const C = e.params.pagination;
        if (!C.el)
            return;
        let E;
        typeof C.el == "string" && e.isElement && (E = e.el.querySelector(C.el)),
        !E && typeof C.el == "string" && (E = [...document.querySelectorAll(C.el)]),
        E || (E = C.el),
        !(!E || E.length === 0) && (e.params.uniqueNavElements && typeof C.el == "string" && Array.isArray(E) && E.length > 1 && (E = [...e.el.querySelectorAll(C.el)],
        E.length > 1 && (E = E.find(P => Mn(P, ".swiper")[0] === e.el))),
        Array.isArray(E) && E.length === 1 && (E = E[0]),
        Object.assign(e.pagination, {
            el: E
        }),
        E = Re(E),
        E.forEach(P => {
            C.type === "bullets" && C.clickable && P.classList.add(...(C.clickableClass || "").split(" ")),
            P.classList.add(C.modifierClass + C.type),
            P.classList.add(e.isHorizontal() ? C.horizontalClass : C.verticalClass),
            C.type === "bullets" && C.dynamicBullets && (P.classList.add(`${C.modifierClass}${C.type}-dynamic`),
            l = 0,
            C.dynamicMainBullets < 1 && (C.dynamicMainBullets = 1)),
            C.type === "progressbar" && C.progressbarOpposite && P.classList.add(C.progressbarOppositeClass),
            C.clickable && P.addEventListener("click", w),
            e.enabled || P.classList.add(C.lockClass)
        }
        ))
    }
    function p() {
        const C = e.params.pagination;
        if (c())
            return;
        let E = e.pagination.el;
        E && (E = Re(E),
        E.forEach(P => {
            P.classList.remove(C.hiddenClass),
            P.classList.remove(C.modifierClass + C.type),
            P.classList.remove(e.isHorizontal() ? C.horizontalClass : C.verticalClass),
            C.clickable && (P.classList.remove(...(C.clickableClass || "").split(" ")),
            P.removeEventListener("click", w))
        }
        )),
        e.pagination.bullets && e.pagination.bullets.forEach(P => P.classList.remove(...C.bulletActiveClass.split(" ")))
    }
    i("changeDirection", () => {
        if (!e.pagination || !e.pagination.el)
            return;
        const C = e.params.pagination;
        let {el: E} = e.pagination;
        E = Re(E),
        E.forEach(P => {
            P.classList.remove(C.horizontalClass, C.verticalClass),
            P.classList.add(e.isHorizontal() ? C.horizontalClass : C.verticalClass)
        }
        )
    }
    ),
    i("init", () => {
        e.params.pagination.enabled === !1 ? T() : (g(),
        y(),
        _())
    }
    ),
    i("activeIndexChange", () => {
        typeof e.snapIndex > "u" && _()
    }
    ),
    i("snapIndexChange", () => {
        _()
    }
    ),
    i("snapGridLengthChange", () => {
        y(),
        _()
    }
    ),
    i("destroy", () => {
        p()
    }
    ),
    i("enable disable", () => {
        let {el: C} = e.pagination;
        C && (C = Re(C),
        C.forEach(E => E.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)))
    }
    ),
    i("lock unlock", () => {
        _()
    }
    ),
    i("click", (C, E) => {
        const P = E.target
          , k = Re(e.pagination.el);
        if (e.params.pagination.el && e.params.pagination.hideOnClick && k && k.length > 0 && !P.classList.contains(e.params.pagination.bulletClass)) {
            if (e.navigation && (e.navigation.nextEl && P === e.navigation.nextEl || e.navigation.prevEl && P === e.navigation.prevEl))
                return;
            const R = k[0].classList.contains(e.params.pagination.hiddenClass);
            r(R === !0 ? "paginationShow" : "paginationHide"),
            k.forEach(d => d.classList.toggle(e.params.pagination.hiddenClass))
        }
    }
    );
    const S = () => {
        e.el.classList.remove(e.params.pagination.paginationDisabledClass);
        let {el: C} = e.pagination;
        C && (C = Re(C),
        C.forEach(E => E.classList.remove(e.params.pagination.paginationDisabledClass))),
        g(),
        y(),
        _()
    }
      , T = () => {
        e.el.classList.add(e.params.pagination.paginationDisabledClass);
        let {el: C} = e.pagination;
        C && (C = Re(C),
        C.forEach(E => E.classList.add(e.params.pagination.paginationDisabledClass))),
        p()
    }
    ;
    Object.assign(e.pagination, {
        enable: S,
        disable: T,
        render: y,
        update: _,
        init: g,
        destroy: p
    })
}
function Im(s) {
    let {swiper: e, extendParams: t, on: i, emit: r} = s;
    const n = jt();
    let o = !1, l = null, c = null, f, h, w, _;
    t({
        scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
            scrollbarDisabledClass: "swiper-scrollbar-disabled",
            horizontalClass: "swiper-scrollbar-horizontal",
            verticalClass: "swiper-scrollbar-vertical"
        }
    }),
    e.scrollbar = {
        el: null,
        dragEl: null
    };
    function y() {
        if (!e.params.scrollbar.el || !e.scrollbar.el)
            return;
        const {scrollbar: I, rtlTranslate: H} = e
          , {dragEl: q, el: V} = I
          , Q = e.params.scrollbar
          , F = e.params.loop ? e.progressLoop : e.progress;
        let Y = h
          , Z = (w - h) * F;
        H ? (Z = -Z,
        Z > 0 ? (Y = h - Z,
        Z = 0) : -Z + h > w && (Y = w + Z)) : Z < 0 ? (Y = h + Z,
        Z = 0) : Z + h > w && (Y = w - Z),
        e.isHorizontal() ? (q.style.transform = `translate3d(${Z}px, 0, 0)`,
        q.style.width = `${Y}px`) : (q.style.transform = `translate3d(0px, ${Z}px, 0)`,
        q.style.height = `${Y}px`),
        Q.hide && (clearTimeout(l),
        V.style.opacity = 1,
        l = setTimeout( () => {
            V.style.opacity = 0,
            V.style.transitionDuration = "400ms"
        }
        , 1e3))
    }
    function g(I) {
        !e.params.scrollbar.el || !e.scrollbar.el || (e.scrollbar.dragEl.style.transitionDuration = `${I}ms`)
    }
    function p() {
        if (!e.params.scrollbar.el || !e.scrollbar.el)
            return;
        const {scrollbar: I} = e
          , {dragEl: H, el: q} = I;
        H.style.width = "",
        H.style.height = "",
        w = e.isHorizontal() ? q.offsetWidth : q.offsetHeight,
        _ = e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0)),
        e.params.scrollbar.dragSize === "auto" ? h = w * _ : h = parseInt(e.params.scrollbar.dragSize, 10),
        e.isHorizontal() ? H.style.width = `${h}px` : H.style.height = `${h}px`,
        _ >= 1 ? q.style.display = "none" : q.style.display = "",
        e.params.scrollbar.hide && (q.style.opacity = 0),
        e.params.watchOverflow && e.enabled && I.el.classList[e.isLocked ? "add" : "remove"](e.params.scrollbar.lockClass)
    }
    function S(I) {
        return e.isHorizontal() ? I.clientX : I.clientY
    }
    function T(I) {
        const {scrollbar: H, rtlTranslate: q} = e
          , {el: V} = H;
        let Q;
        Q = (S(I) - Wa(V)[e.isHorizontal() ? "left" : "top"] - (f !== null ? f : h / 2)) / (w - h),
        Q = Math.max(Math.min(Q, 1), 0),
        q && (Q = 1 - Q);
        const F = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * Q;
        e.updateProgress(F),
        e.setTranslate(F),
        e.updateActiveIndex(),
        e.updateSlidesClasses()
    }
    function C(I) {
        const H = e.params.scrollbar
          , {scrollbar: q, wrapperEl: V} = e
          , {el: Q, dragEl: F} = q;
        o = !0,
        f = I.target === F ? S(I) - I.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null,
        I.preventDefault(),
        I.stopPropagation(),
        V.style.transitionDuration = "100ms",
        F.style.transitionDuration = "100ms",
        T(I),
        clearTimeout(c),
        Q.style.transitionDuration = "0ms",
        H.hide && (Q.style.opacity = 1),
        e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "none"),
        r("scrollbarDragStart", I)
    }
    function E(I) {
        const {scrollbar: H, wrapperEl: q} = e
          , {el: V, dragEl: Q} = H;
        o && (I.preventDefault && I.cancelable ? I.preventDefault() : I.returnValue = !1,
        T(I),
        q.style.transitionDuration = "0ms",
        V.style.transitionDuration = "0ms",
        Q.style.transitionDuration = "0ms",
        r("scrollbarDragMove", I))
    }
    function P(I) {
        const H = e.params.scrollbar
          , {scrollbar: q, wrapperEl: V} = e
          , {el: Q} = q;
        o && (o = !1,
        e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "",
        V.style.transitionDuration = ""),
        H.hide && (clearTimeout(c),
        c = On( () => {
            Q.style.opacity = 0,
            Q.style.transitionDuration = "400ms"
        }
        , 1e3)),
        r("scrollbarDragEnd", I),
        H.snapOnRelease && e.slideToClosest())
    }
    function k(I) {
        const {scrollbar: H, params: q} = e
          , V = H.el;
        if (!V)
            return;
        const Q = V
          , F = q.passiveListeners ? {
            passive: !1,
            capture: !1
        } : !1
          , Y = q.passiveListeners ? {
            passive: !0,
            capture: !1
        } : !1;
        if (!Q)
            return;
        const Z = I === "on" ? "addEventListener" : "removeEventListener";
        Q[Z]("pointerdown", C, F),
        n[Z]("pointermove", E, F),
        n[Z]("pointerup", P, Y)
    }
    function R() {
        !e.params.scrollbar.el || !e.scrollbar.el || k("on")
    }
    function d() {
        !e.params.scrollbar.el || !e.scrollbar.el || k("off")
    }
    function N() {
        const {scrollbar: I, el: H} = e;
        e.params.scrollbar = Xl(e, e.originalParams.scrollbar, e.params.scrollbar, {
            el: "swiper-scrollbar"
        });
        const q = e.params.scrollbar;
        if (!q.el)
            return;
        let V;
        if (typeof q.el == "string" && e.isElement && (V = e.el.querySelector(q.el)),
        !V && typeof q.el == "string") {
            if (V = n.querySelectorAll(q.el),
            !V.length)
                return
        } else
            V || (V = q.el);
        e.params.uniqueNavElements && typeof q.el == "string" && V.length > 1 && H.querySelectorAll(q.el).length === 1 && (V = H.querySelector(q.el)),
        V.length > 0 && (V = V[0]),
        V.classList.add(e.isHorizontal() ? q.horizontalClass : q.verticalClass);
        let Q;
        V && (Q = V.querySelector(Lr(e.params.scrollbar.dragClass)),
        Q || (Q = Hi("div", e.params.scrollbar.dragClass),
        V.append(Q))),
        Object.assign(I, {
            el: V,
            dragEl: Q
        }),
        q.draggable && R(),
        V && V.classList[e.enabled ? "remove" : "add"](...jr(e.params.scrollbar.lockClass))
    }
    function L() {
        const I = e.params.scrollbar
          , H = e.scrollbar.el;
        H && H.classList.remove(...jr(e.isHorizontal() ? I.horizontalClass : I.verticalClass)),
        d()
    }
    i("changeDirection", () => {
        if (!e.scrollbar || !e.scrollbar.el)
            return;
        const I = e.params.scrollbar;
        let {el: H} = e.scrollbar;
        H = Re(H),
        H.forEach(q => {
            q.classList.remove(I.horizontalClass, I.verticalClass),
            q.classList.add(e.isHorizontal() ? I.horizontalClass : I.verticalClass)
        }
        )
    }
    ),
    i("init", () => {
        e.params.scrollbar.enabled === !1 ? X() : (N(),
        p(),
        y())
    }
    ),
    i("update resize observerUpdate lock unlock changeDirection", () => {
        p()
    }
    ),
    i("setTranslate", () => {
        y()
    }
    ),
    i("setTransition", (I, H) => {
        g(H)
    }
    ),
    i("enable disable", () => {
        const {el: I} = e.scrollbar;
        I && I.classList[e.enabled ? "remove" : "add"](...jr(e.params.scrollbar.lockClass))
    }
    ),
    i("destroy", () => {
        L()
    }
    );
    const O = () => {
        e.el.classList.remove(...jr(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el && e.scrollbar.el.classList.remove(...jr(e.params.scrollbar.scrollbarDisabledClass)),
        N(),
        p(),
        y()
    }
      , X = () => {
        e.el.classList.add(...jr(e.params.scrollbar.scrollbarDisabledClass)),
        e.scrollbar.el && e.scrollbar.el.classList.add(...jr(e.params.scrollbar.scrollbarDisabledClass)),
        L()
    }
    ;
    Object.assign(e.scrollbar, {
        enable: O,
        disable: X,
        updateSize: p,
        setTranslate: y,
        init: N,
        destroy: L
    })
}
function zm(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        parallax: {
            enabled: !1
        }
    });
    const r = "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
      , n = (c, f) => {
        const {rtl: h} = e
          , w = h ? -1 : 1
          , _ = c.getAttribute("data-swiper-parallax") || "0";
        let y = c.getAttribute("data-swiper-parallax-x")
          , g = c.getAttribute("data-swiper-parallax-y");
        const p = c.getAttribute("data-swiper-parallax-scale")
          , S = c.getAttribute("data-swiper-parallax-opacity")
          , T = c.getAttribute("data-swiper-parallax-rotate");
        if (y || g ? (y = y || "0",
        g = g || "0") : e.isHorizontal() ? (y = _,
        g = "0") : (g = _,
        y = "0"),
        y.indexOf("%") >= 0 ? y = `${parseInt(y, 10) * f * w}%` : y = `${y * f * w}px`,
        g.indexOf("%") >= 0 ? g = `${parseInt(g, 10) * f}%` : g = `${g * f}px`,
        typeof S < "u" && S !== null) {
            const E = S - (S - 1) * (1 - Math.abs(f));
            c.style.opacity = E
        }
        let C = `translate3d(${y}, ${g}, 0px)`;
        if (typeof p < "u" && p !== null) {
            const E = p - (p - 1) * (1 - Math.abs(f));
            C += ` scale(${E})`
        }
        if (T && typeof T < "u" && T !== null) {
            const E = T * f * -1;
            C += ` rotate(${E}deg)`
        }
        c.style.transform = C
    }
      , o = () => {
        const {el: c, slides: f, progress: h, snapGrid: w, isElement: _} = e
          , y = Ut(c, r);
        e.isElement && y.push(...Ut(e.hostEl, r)),
        y.forEach(g => {
            n(g, h)
        }
        ),
        f.forEach( (g, p) => {
            let S = g.progress;
            e.params.slidesPerGroup > 1 && e.params.slidesPerView !== "auto" && (S += Math.ceil(p / 2) - h * (w.length - 1)),
            S = Math.min(Math.max(S, -1), 1),
            g.querySelectorAll(`${r}, [data-swiper-parallax-rotate]`).forEach(T => {
                n(T, S)
            }
            )
        }
        )
    }
      , l = function(c) {
        c === void 0 && (c = e.params.speed);
        const {el: f, hostEl: h} = e
          , w = [...f.querySelectorAll(r)];
        e.isElement && w.push(...h.querySelectorAll(r)),
        w.forEach(_ => {
            let y = parseInt(_.getAttribute("data-swiper-parallax-duration"), 10) || c;
            c === 0 && (y = 0),
            _.style.transitionDuration = `${y}ms`
        }
        )
    };
    i("beforeInit", () => {
        e.params.parallax.enabled && (e.params.watchSlidesProgress = !0,
        e.originalParams.watchSlidesProgress = !0)
    }
    ),
    i("init", () => {
        e.params.parallax.enabled && o()
    }
    ),
    i("setTranslate", () => {
        e.params.parallax.enabled && o()
    }
    ),
    i("setTransition", (c, f) => {
        e.params.parallax.enabled && l(f)
    }
    )
}
function Rm(s) {
    let {swiper: e, extendParams: t, on: i, emit: r} = s;
    const n = ht();
    t({
        zoom: {
            enabled: !1,
            limitToOriginalSize: !1,
            maxRatio: 3,
            minRatio: 1,
            panOnMouseMove: !1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed"
        }
    }),
    e.zoom = {
        enabled: !1
    };
    let o = 1
      , l = !1
      , c = !1
      , f = {
        x: 0,
        y: 0
    };
    const h = -3;
    let w, _;
    const y = []
      , g = {
        originX: 0,
        originY: 0,
        slideEl: void 0,
        slideWidth: void 0,
        slideHeight: void 0,
        imageEl: void 0,
        imageWrapEl: void 0,
        maxRatio: 3
    }
      , p = {
        isTouched: void 0,
        isMoved: void 0,
        currentX: void 0,
        currentY: void 0,
        minX: void 0,
        minY: void 0,
        maxX: void 0,
        maxY: void 0,
        width: void 0,
        height: void 0,
        startX: void 0,
        startY: void 0,
        touchesStart: {},
        touchesCurrent: {}
    }
      , S = {
        x: void 0,
        y: void 0,
        prevPositionX: void 0,
        prevPositionY: void 0,
        prevTime: void 0
    };
    let T = 1;
    Object.defineProperty(e.zoom, "scale", {
        get() {
            return T
        },
        set(re) {
            if (T !== re) {
                const ee = g.imageEl
                  , ne = g.slideEl;
                r("zoomChange", re, ee, ne)
            }
            T = re
        }
    });
    function C() {
        if (y.length < 2)
            return 1;
        const re = y[0].pageX
          , ee = y[0].pageY
          , ne = y[1].pageX
          , me = y[1].pageY;
        return Math.sqrt((ne - re) ** 2 + (me - ee) ** 2)
    }
    function E() {
        const re = e.params.zoom
          , ee = g.imageWrapEl.getAttribute("data-swiper-zoom") || re.maxRatio;
        if (re.limitToOriginalSize && g.imageEl && g.imageEl.naturalWidth) {
            const ne = g.imageEl.naturalWidth / g.imageEl.offsetWidth;
            return Math.min(ne, ee)
        }
        return ee
    }
    function P() {
        if (y.length < 2)
            return {
                x: null,
                y: null
            };
        const re = g.imageEl.getBoundingClientRect();
        return [(y[0].pageX + (y[1].pageX - y[0].pageX) / 2 - re.x - n.scrollX) / o, (y[0].pageY + (y[1].pageY - y[0].pageY) / 2 - re.y - n.scrollY) / o]
    }
    function k() {
        return e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
    }
    function R(re) {
        const ee = k();
        return !!(re.target.matches(ee) || e.slides.filter(ne => ne.contains(re.target)).length > 0)
    }
    function d(re) {
        const ee = `.${e.params.zoom.containerClass}`;
        return !!(re.target.matches(ee) || [...e.hostEl.querySelectorAll(ee)].filter(ne => ne.contains(re.target)).length > 0)
    }
    function N(re) {
        if (re.pointerType === "mouse" && y.splice(0, y.length),
        !R(re))
            return;
        const ee = e.params.zoom;
        if (w = !1,
        _ = !1,
        y.push(re),
        !(y.length < 2)) {
            if (w = !0,
            g.scaleStart = C(),
            !g.slideEl) {
                g.slideEl = re.target.closest(`.${e.params.slideClass}, swiper-slide`),
                g.slideEl || (g.slideEl = e.slides[e.activeIndex]);
                let ne = g.slideEl.querySelector(`.${ee.containerClass}`);
                if (ne && (ne = ne.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),
                g.imageEl = ne,
                ne ? g.imageWrapEl = Mn(g.imageEl, `.${ee.containerClass}`)[0] : g.imageWrapEl = void 0,
                !g.imageWrapEl) {
                    g.imageEl = void 0;
                    return
                }
                g.maxRatio = E()
            }
            if (g.imageEl) {
                const [ne,me] = P();
                g.originX = ne,
                g.originY = me,
                g.imageEl.style.transitionDuration = "0ms"
            }
            l = !0
        }
    }
    function L(re) {
        if (!R(re))
            return;
        const ee = e.params.zoom
          , ne = e.zoom
          , me = y.findIndex(Ne => Ne.pointerId === re.pointerId);
        me >= 0 && (y[me] = re),
        !(y.length < 2) && (_ = !0,
        g.scaleMove = C(),
        g.imageEl && (ne.scale = g.scaleMove / g.scaleStart * o,
        ne.scale > g.maxRatio && (ne.scale = g.maxRatio - 1 + (ne.scale - g.maxRatio + 1) ** .5),
        ne.scale < ee.minRatio && (ne.scale = ee.minRatio + 1 - (ee.minRatio - ne.scale + 1) ** .5),
        g.imageEl.style.transform = `translate3d(0,0,0) scale(${ne.scale})`))
    }
    function O(re) {
        if (!R(re) || re.pointerType === "mouse" && re.type === "pointerout")
            return;
        const ee = e.params.zoom
          , ne = e.zoom
          , me = y.findIndex(Ne => Ne.pointerId === re.pointerId);
        me >= 0 && y.splice(me, 1),
        !(!w || !_) && (w = !1,
        _ = !1,
        g.imageEl && (ne.scale = Math.max(Math.min(ne.scale, g.maxRatio), ee.minRatio),
        g.imageEl.style.transitionDuration = `${e.params.speed}ms`,
        g.imageEl.style.transform = `translate3d(0,0,0) scale(${ne.scale})`,
        o = ne.scale,
        l = !1,
        ne.scale > 1 && g.slideEl ? g.slideEl.classList.add(`${ee.zoomedSlideClass}`) : ne.scale <= 1 && g.slideEl && g.slideEl.classList.remove(`${ee.zoomedSlideClass}`),
        ne.scale === 1 && (g.originX = 0,
        g.originY = 0,
        g.slideEl = void 0)))
    }
    let X;
    function I() {
        e.touchEventsData.preventTouchMoveFromPointerMove = !1
    }
    function H() {
        clearTimeout(X),
        e.touchEventsData.preventTouchMoveFromPointerMove = !0,
        X = setTimeout( () => {
            e.destroyed || I()
        }
        )
    }
    function q(re) {
        const ee = e.device;
        if (!g.imageEl || p.isTouched)
            return;
        ee.android && re.cancelable && re.preventDefault(),
        p.isTouched = !0;
        const ne = y.length > 0 ? y[0] : re;
        p.touchesStart.x = ne.pageX,
        p.touchesStart.y = ne.pageY
    }
    function V(re) {
        const ne = re.pointerType === "mouse" && e.params.zoom.panOnMouseMove;
        if (!R(re) || !d(re))
            return;
        const me = e.zoom;
        if (!g.imageEl)
            return;
        if (!p.isTouched || !g.slideEl) {
            ne && Y(re);
            return
        }
        if (ne) {
            Y(re);
            return
        }
        p.isMoved || (p.width = g.imageEl.offsetWidth || g.imageEl.clientWidth,
        p.height = g.imageEl.offsetHeight || g.imageEl.clientHeight,
        p.startX = fl(g.imageWrapEl, "x") || 0,
        p.startY = fl(g.imageWrapEl, "y") || 0,
        g.slideWidth = g.slideEl.offsetWidth,
        g.slideHeight = g.slideEl.offsetHeight,
        g.imageWrapEl.style.transitionDuration = "0ms");
        const Ne = p.width * me.scale
          , Je = p.height * me.scale;
        if (p.minX = Math.min(g.slideWidth / 2 - Ne / 2, 0),
        p.maxX = -p.minX,
        p.minY = Math.min(g.slideHeight / 2 - Je / 2, 0),
        p.maxY = -p.minY,
        p.touchesCurrent.x = y.length > 0 ? y[0].pageX : re.pageX,
        p.touchesCurrent.y = y.length > 0 ? y[0].pageY : re.pageY,
        Math.max(Math.abs(p.touchesCurrent.x - p.touchesStart.x), Math.abs(p.touchesCurrent.y - p.touchesStart.y)) > 5 && (e.allowClick = !1),
        !p.isMoved && !l) {
            if (e.isHorizontal() && (Math.floor(p.minX) === Math.floor(p.startX) && p.touchesCurrent.x < p.touchesStart.x || Math.floor(p.maxX) === Math.floor(p.startX) && p.touchesCurrent.x > p.touchesStart.x)) {
                p.isTouched = !1,
                I();
                return
            }
            if (!e.isHorizontal() && (Math.floor(p.minY) === Math.floor(p.startY) && p.touchesCurrent.y < p.touchesStart.y || Math.floor(p.maxY) === Math.floor(p.startY) && p.touchesCurrent.y > p.touchesStart.y)) {
                p.isTouched = !1,
                I();
                return
            }
        }
        re.cancelable && re.preventDefault(),
        re.stopPropagation(),
        H(),
        p.isMoved = !0;
        const Xe = (me.scale - o) / (g.maxRatio - e.params.zoom.minRatio)
          , {originX: be, originY: Ee} = g;
        p.currentX = p.touchesCurrent.x - p.touchesStart.x + p.startX + Xe * (p.width - be * 2),
        p.currentY = p.touchesCurrent.y - p.touchesStart.y + p.startY + Xe * (p.height - Ee * 2),
        p.currentX < p.minX && (p.currentX = p.minX + 1 - (p.minX - p.currentX + 1) ** .8),
        p.currentX > p.maxX && (p.currentX = p.maxX - 1 + (p.currentX - p.maxX + 1) ** .8),
        p.currentY < p.minY && (p.currentY = p.minY + 1 - (p.minY - p.currentY + 1) ** .8),
        p.currentY > p.maxY && (p.currentY = p.maxY - 1 + (p.currentY - p.maxY + 1) ** .8),
        S.prevPositionX || (S.prevPositionX = p.touchesCurrent.x),
        S.prevPositionY || (S.prevPositionY = p.touchesCurrent.y),
        S.prevTime || (S.prevTime = Date.now()),
        S.x = (p.touchesCurrent.x - S.prevPositionX) / (Date.now() - S.prevTime) / 2,
        S.y = (p.touchesCurrent.y - S.prevPositionY) / (Date.now() - S.prevTime) / 2,
        Math.abs(p.touchesCurrent.x - S.prevPositionX) < 2 && (S.x = 0),
        Math.abs(p.touchesCurrent.y - S.prevPositionY) < 2 && (S.y = 0),
        S.prevPositionX = p.touchesCurrent.x,
        S.prevPositionY = p.touchesCurrent.y,
        S.prevTime = Date.now(),
        g.imageWrapEl.style.transform = `translate3d(${p.currentX}px, ${p.currentY}px,0)`
    }
    function Q() {
        const re = e.zoom;
        if (y.length = 0,
        !g.imageEl)
            return;
        if (!p.isTouched || !p.isMoved) {
            p.isTouched = !1,
            p.isMoved = !1;
            return
        }
        p.isTouched = !1,
        p.isMoved = !1;
        let ee = 300
          , ne = 300;
        const me = S.x * ee
          , Ne = p.currentX + me
          , Je = S.y * ne
          , st = p.currentY + Je;
        S.x !== 0 && (ee = Math.abs((Ne - p.currentX) / S.x)),
        S.y !== 0 && (ne = Math.abs((st - p.currentY) / S.y));
        const Xe = Math.max(ee, ne);
        p.currentX = Ne,
        p.currentY = st;
        const be = p.width * re.scale
          , Ee = p.height * re.scale;
        p.minX = Math.min(g.slideWidth / 2 - be / 2, 0),
        p.maxX = -p.minX,
        p.minY = Math.min(g.slideHeight / 2 - Ee / 2, 0),
        p.maxY = -p.minY,
        p.currentX = Math.max(Math.min(p.currentX, p.maxX), p.minX),
        p.currentY = Math.max(Math.min(p.currentY, p.maxY), p.minY),
        g.imageWrapEl.style.transitionDuration = `${Xe}ms`,
        g.imageWrapEl.style.transform = `translate3d(${p.currentX}px, ${p.currentY}px,0)`
    }
    function F() {
        const re = e.zoom;
        g.slideEl && e.activeIndex !== e.slides.indexOf(g.slideEl) && (g.imageEl && (g.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
        g.imageWrapEl && (g.imageWrapEl.style.transform = "translate3d(0,0,0)"),
        g.slideEl.classList.remove(`${e.params.zoom.zoomedSlideClass}`),
        re.scale = 1,
        o = 1,
        g.slideEl = void 0,
        g.imageEl = void 0,
        g.imageWrapEl = void 0,
        g.originX = 0,
        g.originY = 0)
    }
    function Y(re) {
        if (o <= 1 || !g.imageWrapEl || !R(re) || !d(re))
            return;
        const ee = n.getComputedStyle(g.imageWrapEl).transform
          , ne = new n.DOMMatrix(ee);
        if (!c) {
            c = !0,
            f.x = re.clientX,
            f.y = re.clientY,
            p.startX = ne.e,
            p.startY = ne.f,
            p.width = g.imageEl.offsetWidth || g.imageEl.clientWidth,
            p.height = g.imageEl.offsetHeight || g.imageEl.clientHeight,
            g.slideWidth = g.slideEl.offsetWidth,
            g.slideHeight = g.slideEl.offsetHeight;
            return
        }
        const me = (re.clientX - f.x) * h
          , Ne = (re.clientY - f.y) * h
          , Je = p.width * o
          , st = p.height * o
          , Xe = g.slideWidth
          , be = g.slideHeight
          , Ee = Math.min(Xe / 2 - Je / 2, 0)
          , et = -Ee
          , mt = Math.min(be / 2 - st / 2, 0)
          , K = -mt
          , Ye = Math.max(Math.min(p.startX + me, et), Ee)
          , $t = Math.max(Math.min(p.startY + Ne, K), mt);
        g.imageWrapEl.style.transitionDuration = "0ms",
        g.imageWrapEl.style.transform = `translate3d(${Ye}px, ${$t}px, 0)`,
        f.x = re.clientX,
        f.y = re.clientY,
        p.startX = Ye,
        p.startY = $t,
        p.currentX = Ye,
        p.currentY = $t
    }
    function Z(re) {
        const ee = e.zoom
          , ne = e.params.zoom;
        if (!g.slideEl) {
            re && re.target && (g.slideEl = re.target.closest(`.${e.params.slideClass}, swiper-slide`)),
            g.slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? g.slideEl = Ut(e.slidesEl, `.${e.params.slideActiveClass}`)[0] : g.slideEl = e.slides[e.activeIndex]);
            let Ct = g.slideEl.querySelector(`.${ne.containerClass}`);
            Ct && (Ct = Ct.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),
            g.imageEl = Ct,
            Ct ? g.imageWrapEl = Mn(g.imageEl, `.${ne.containerClass}`)[0] : g.imageWrapEl = void 0
        }
        if (!g.imageEl || !g.imageWrapEl)
            return;
        e.params.cssMode && (e.wrapperEl.style.overflow = "hidden",
        e.wrapperEl.style.touchAction = "none"),
        g.slideEl.classList.add(`${ne.zoomedSlideClass}`);
        let me, Ne, Je, st, Xe, be, Ee, et, mt, K, Ye, $t, ai, Ke, ct, Ht, Yt, oe;
        typeof p.touchesStart.x > "u" && re ? (me = re.pageX,
        Ne = re.pageY) : (me = p.touchesStart.x,
        Ne = p.touchesStart.y);
        const tt = o
          , We = typeof re == "number" ? re : null;
        o === 1 && We && (me = void 0,
        Ne = void 0,
        p.touchesStart.x = void 0,
        p.touchesStart.y = void 0);
        const Zt = E();
        ee.scale = We || Zt,
        o = We || Zt,
        re && !(o === 1 && We) ? (Yt = g.slideEl.offsetWidth,
        oe = g.slideEl.offsetHeight,
        Je = Wa(g.slideEl).left + n.scrollX,
        st = Wa(g.slideEl).top + n.scrollY,
        Xe = Je + Yt / 2 - me,
        be = st + oe / 2 - Ne,
        mt = g.imageEl.offsetWidth || g.imageEl.clientWidth,
        K = g.imageEl.offsetHeight || g.imageEl.clientHeight,
        Ye = mt * ee.scale,
        $t = K * ee.scale,
        ai = Math.min(Yt / 2 - Ye / 2, 0),
        Ke = Math.min(oe / 2 - $t / 2, 0),
        ct = -ai,
        Ht = -Ke,
        tt > 0 && We && typeof p.currentX == "number" && typeof p.currentY == "number" ? (Ee = p.currentX * ee.scale / tt,
        et = p.currentY * ee.scale / tt) : (Ee = Xe * ee.scale,
        et = be * ee.scale),
        Ee < ai && (Ee = ai),
        Ee > ct && (Ee = ct),
        et < Ke && (et = Ke),
        et > Ht && (et = Ht)) : (Ee = 0,
        et = 0),
        We && ee.scale === 1 && (g.originX = 0,
        g.originY = 0),
        p.currentX = Ee,
        p.currentY = et,
        g.imageWrapEl.style.transitionDuration = "300ms",
        g.imageWrapEl.style.transform = `translate3d(${Ee}px, ${et}px,0)`,
        g.imageEl.style.transitionDuration = "300ms",
        g.imageEl.style.transform = `translate3d(0,0,0) scale(${ee.scale})`
    }
    function $() {
        const re = e.zoom
          , ee = e.params.zoom;
        if (!g.slideEl) {
            e.params.virtual && e.params.virtual.enabled && e.virtual ? g.slideEl = Ut(e.slidesEl, `.${e.params.slideActiveClass}`)[0] : g.slideEl = e.slides[e.activeIndex];
            let ne = g.slideEl.querySelector(`.${ee.containerClass}`);
            ne && (ne = ne.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),
            g.imageEl = ne,
            ne ? g.imageWrapEl = Mn(g.imageEl, `.${ee.containerClass}`)[0] : g.imageWrapEl = void 0
        }
        !g.imageEl || !g.imageWrapEl || (e.params.cssMode && (e.wrapperEl.style.overflow = "",
        e.wrapperEl.style.touchAction = ""),
        re.scale = 1,
        o = 1,
        p.currentX = void 0,
        p.currentY = void 0,
        p.touchesStart.x = void 0,
        p.touchesStart.y = void 0,
        g.imageWrapEl.style.transitionDuration = "300ms",
        g.imageWrapEl.style.transform = "translate3d(0,0,0)",
        g.imageEl.style.transitionDuration = "300ms",
        g.imageEl.style.transform = "translate3d(0,0,0) scale(1)",
        g.slideEl.classList.remove(`${ee.zoomedSlideClass}`),
        g.slideEl = void 0,
        g.originX = 0,
        g.originY = 0,
        e.params.zoom.panOnMouseMove && (f = {
            x: 0,
            y: 0
        },
        c && (c = !1,
        p.startX = 0,
        p.startY = 0)))
    }
    function he(re) {
        const ee = e.zoom;
        ee.scale && ee.scale !== 1 ? $() : Z(re)
    }
    function Oe() {
        const re = e.params.passiveListeners ? {
            passive: !0,
            capture: !1
        } : !1
          , ee = e.params.passiveListeners ? {
            passive: !1,
            capture: !0
        } : !0;
        return {
            passiveListener: re,
            activeListenerWithCapture: ee
        }
    }
    function nt() {
        const re = e.zoom;
        if (re.enabled)
            return;
        re.enabled = !0;
        const {passiveListener: ee, activeListenerWithCapture: ne} = Oe();
        e.wrapperEl.addEventListener("pointerdown", N, ee),
        e.wrapperEl.addEventListener("pointermove", L, ne),
        ["pointerup", "pointercancel", "pointerout"].forEach(me => {
            e.wrapperEl.addEventListener(me, O, ee)
        }
        ),
        e.wrapperEl.addEventListener("pointermove", V, ne)
    }
    function je() {
        const re = e.zoom;
        if (!re.enabled)
            return;
        re.enabled = !1;
        const {passiveListener: ee, activeListenerWithCapture: ne} = Oe();
        e.wrapperEl.removeEventListener("pointerdown", N, ee),
        e.wrapperEl.removeEventListener("pointermove", L, ne),
        ["pointerup", "pointercancel", "pointerout"].forEach(me => {
            e.wrapperEl.removeEventListener(me, O, ee)
        }
        ),
        e.wrapperEl.removeEventListener("pointermove", V, ne)
    }
    i("init", () => {
        e.params.zoom.enabled && nt()
    }
    ),
    i("destroy", () => {
        je()
    }
    ),
    i("touchStart", (re, ee) => {
        e.zoom.enabled && q(ee)
    }
    ),
    i("touchEnd", (re, ee) => {
        e.zoom.enabled && Q()
    }
    ),
    i("doubleTap", (re, ee) => {
        !e.animating && e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && he(ee)
    }
    ),
    i("transitionEnd", () => {
        e.zoom.enabled && e.params.zoom.enabled && F()
    }
    ),
    i("slideChange", () => {
        e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && F()
    }
    ),
    Object.assign(e.zoom, {
        enable: nt,
        disable: je,
        in: Z,
        out: $,
        toggle: he
    })
}
function Nm(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        controller: {
            control: void 0,
            inverse: !1,
            by: "slide"
        }
    }),
    e.controller = {
        control: void 0
    };
    function r(f, h) {
        const w = function() {
            let p, S, T;
            return (C, E) => {
                for (S = -1,
                p = C.length; p - S > 1; )
                    T = p + S >> 1,
                    C[T] <= E ? S = T : p = T;
                return p
            }
        }();
        this.x = f,
        this.y = h,
        this.lastIndex = f.length - 1;
        let _, y;
        return this.interpolate = function(p) {
            return p ? (y = w(this.x, p),
            _ = y - 1,
            (p - this.x[_]) * (this.y[y] - this.y[_]) / (this.x[y] - this.x[_]) + this.y[_]) : 0
        }
        ,
        this
    }
    function n(f) {
        e.controller.spline = e.params.loop ? new r(e.slidesGrid,f.slidesGrid) : new r(e.snapGrid,f.snapGrid)
    }
    function o(f, h) {
        const w = e.controller.control;
        let _, y;
        const g = e.constructor;
        function p(S) {
            if (S.destroyed)
                return;
            const T = e.rtlTranslate ? -e.translate : e.translate;
            e.params.controller.by === "slide" && (n(S),
            y = -e.controller.spline.interpolate(-T)),
            (!y || e.params.controller.by === "container") && (_ = (S.maxTranslate() - S.minTranslate()) / (e.maxTranslate() - e.minTranslate()),
            (Number.isNaN(_) || !Number.isFinite(_)) && (_ = 1),
            y = (T - e.minTranslate()) * _ + S.minTranslate()),
            e.params.controller.inverse && (y = S.maxTranslate() - y),
            S.updateProgress(y),
            S.setTranslate(y, e),
            S.updateActiveIndex(),
            S.updateSlidesClasses()
        }
        if (Array.isArray(w))
            for (let S = 0; S < w.length; S += 1)
                w[S] !== h && w[S]instanceof g && p(w[S]);
        else
            w instanceof g && h !== w && p(w)
    }
    function l(f, h) {
        const w = e.constructor
          , _ = e.controller.control;
        let y;
        function g(p) {
            p.destroyed || (p.setTransition(f, e),
            f !== 0 && (p.transitionStart(),
            p.params.autoHeight && On( () => {
                p.updateAutoHeight()
            }
            ),
            Rs(p.wrapperEl, () => {
                _ && p.transitionEnd()
            }
            )))
        }
        if (Array.isArray(_))
            for (y = 0; y < _.length; y += 1)
                _[y] !== h && _[y]instanceof w && g(_[y]);
        else
            _ instanceof w && h !== _ && g(_)
    }
    function c() {
        e.controller.control && e.controller.spline && (e.controller.spline = void 0,
        delete e.controller.spline)
    }
    i("beforeInit", () => {
        if (typeof window < "u" && (typeof e.params.controller.control == "string" || e.params.controller.control instanceof HTMLElement)) {
            (typeof e.params.controller.control == "string" ? [...document.querySelectorAll(e.params.controller.control)] : [e.params.controller.control]).forEach(h => {
                if (e.controller.control || (e.controller.control = []),
                h && h.swiper)
                    e.controller.control.push(h.swiper);
                else if (h) {
                    const w = `${e.params.eventsPrefix}init`
                      , _ = y => {
                        e.controller.control.push(y.detail[0]),
                        e.update(),
                        h.removeEventListener(w, _)
                    }
                    ;
                    h.addEventListener(w, _)
                }
            }
            );
            return
        }
        e.controller.control = e.params.controller.control
    }
    ),
    i("update", () => {
        c()
    }
    ),
    i("resize", () => {
        c()
    }
    ),
    i("observerUpdate", () => {
        c()
    }
    ),
    i("setTranslate", (f, h, w) => {
        !e.controller.control || e.controller.control.destroyed || e.controller.setTranslate(h, w)
    }
    ),
    i("setTransition", (f, h, w) => {
        !e.controller.control || e.controller.control.destroyed || e.controller.setTransition(h, w)
    }
    ),
    Object.assign(e.controller, {
        setTranslate: o,
        setTransition: l
    })
}
function $m(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            slideLabelMessage: "{{index}} / {{slidesLength}}",
            containerMessage: null,
            containerRoleDescriptionMessage: null,
            containerRole: null,
            itemRoleDescriptionMessage: null,
            slideRole: "group",
            id: null,
            scrollOnFocus: !0
        }
    }),
    e.a11y = {
        clicked: !1
    };
    let r = null, n, o, l = new Date().getTime();
    function c(F) {
        const Y = r;
        Y.length !== 0 && Nr(Y, F)
    }
    function f(F) {
        const Y = () => Math.round(16 * Math.random()).toString(16);
        return "x".repeat(F).replace(/x/g, Y)
    }
    function h(F) {
        F = Re(F),
        F.forEach(Y => {
            Y.setAttribute("tabIndex", "0")
        }
        )
    }
    function w(F) {
        F = Re(F),
        F.forEach(Y => {
            Y.setAttribute("tabIndex", "-1")
        }
        )
    }
    function _(F, Y) {
        F = Re(F),
        F.forEach(Z => {
            Z.setAttribute("role", Y)
        }
        )
    }
    function y(F, Y) {
        F = Re(F),
        F.forEach(Z => {
            Z.setAttribute("aria-roledescription", Y)
        }
        )
    }
    function g(F, Y) {
        F = Re(F),
        F.forEach(Z => {
            Z.setAttribute("aria-controls", Y)
        }
        )
    }
    function p(F, Y) {
        F = Re(F),
        F.forEach(Z => {
            Z.setAttribute("aria-label", Y)
        }
        )
    }
    function S(F, Y) {
        F = Re(F),
        F.forEach(Z => {
            Z.setAttribute("id", Y)
        }
        )
    }
    function T(F, Y) {
        F = Re(F),
        F.forEach(Z => {
            Z.setAttribute("aria-live", Y)
        }
        )
    }
    function C(F) {
        F = Re(F),
        F.forEach(Y => {
            Y.setAttribute("aria-disabled", !0)
        }
        )
    }
    function E(F) {
        F = Re(F),
        F.forEach(Y => {
            Y.setAttribute("aria-disabled", !1)
        }
        )
    }
    function P(F) {
        if (F.keyCode !== 13 && F.keyCode !== 32)
            return;
        const Y = e.params.a11y
          , Z = F.target;
        if (!(e.pagination && e.pagination.el && (Z === e.pagination.el || e.pagination.el.contains(F.target)) && !F.target.matches(Lr(e.params.pagination.bulletClass)))) {
            if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
                const $ = Re(e.navigation.prevEl);
                Re(e.navigation.nextEl).includes(Z) && (e.isEnd && !e.params.loop || e.slideNext(),
                e.isEnd ? c(Y.lastSlideMessage) : c(Y.nextSlideMessage)),
                $.includes(Z) && (e.isBeginning && !e.params.loop || e.slidePrev(),
                e.isBeginning ? c(Y.firstSlideMessage) : c(Y.prevSlideMessage))
            }
            e.pagination && Z.matches(Lr(e.params.pagination.bulletClass)) && Z.click()
        }
    }
    function k() {
        if (e.params.loop || e.params.rewind || !e.navigation)
            return;
        const {nextEl: F, prevEl: Y} = e.navigation;
        Y && (e.isBeginning ? (C(Y),
        w(Y)) : (E(Y),
        h(Y))),
        F && (e.isEnd ? (C(F),
        w(F)) : (E(F),
        h(F)))
    }
    function R() {
        return e.pagination && e.pagination.bullets && e.pagination.bullets.length
    }
    function d() {
        return R() && e.params.pagination.clickable
    }
    function N() {
        const F = e.params.a11y;
        R() && e.pagination.bullets.forEach(Y => {
            e.params.pagination.clickable && (h(Y),
            e.params.pagination.renderBullet || (_(Y, "button"),
            p(Y, F.paginationBulletMessage.replace(/\{\{index\}\}/, ta(Y) + 1)))),
            Y.matches(Lr(e.params.pagination.bulletActiveClass)) ? Y.setAttribute("aria-current", "true") : Y.removeAttribute("aria-current")
        }
        )
    }
    const L = (F, Y, Z) => {
        h(F),
        F.tagName !== "BUTTON" && (_(F, "button"),
        F.addEventListener("keydown", P)),
        p(F, Z),
        g(F, Y)
    }
      , O = F => {
        o && o !== F.target && !o.contains(F.target) && (n = !0),
        e.a11y.clicked = !0
    }
      , X = () => {
        n = !1,
        requestAnimationFrame( () => {
            requestAnimationFrame( () => {
                e.destroyed || (e.a11y.clicked = !1)
            }
            )
        }
        )
    }
      , I = F => {
        l = new Date().getTime()
    }
      , H = F => {
        if (e.a11y.clicked || !e.params.a11y.scrollOnFocus || new Date().getTime() - l < 100)
            return;
        const Y = F.target.closest(`.${e.params.slideClass}, swiper-slide`);
        if (!Y || !e.slides.includes(Y))
            return;
        o = Y;
        const Z = e.slides.indexOf(Y) === e.activeIndex
          , $ = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(Y);
        Z || $ || F.sourceCapabilities && F.sourceCapabilities.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0,
        requestAnimationFrame( () => {
            n || (e.params.loop ? e.slideToLoop(parseInt(Y.getAttribute("data-swiper-slide-index")), 0) : e.slideTo(e.slides.indexOf(Y), 0),
            n = !1)
        }
        ))
    }
      , q = () => {
        const F = e.params.a11y;
        F.itemRoleDescriptionMessage && y(e.slides, F.itemRoleDescriptionMessage),
        F.slideRole && _(e.slides, F.slideRole);
        const Y = e.slides.length;
        F.slideLabelMessage && e.slides.forEach( (Z, $) => {
            const he = e.params.loop ? parseInt(Z.getAttribute("data-swiper-slide-index"), 10) : $
              , Oe = F.slideLabelMessage.replace(/\{\{index\}\}/, he + 1).replace(/\{\{slidesLength\}\}/, Y);
            p(Z, Oe)
        }
        )
    }
      , V = () => {
        const F = e.params.a11y;
        e.el.append(r);
        const Y = e.el;
        F.containerRoleDescriptionMessage && y(Y, F.containerRoleDescriptionMessage),
        F.containerMessage && p(Y, F.containerMessage),
        F.containerRole && _(Y, F.containerRole);
        const Z = e.wrapperEl
          , $ = F.id || Z.getAttribute("id") || `swiper-wrapper-${f(16)}`
          , he = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
        S(Z, $),
        T(Z, he),
        q();
        let {nextEl: Oe, prevEl: nt} = e.navigation ? e.navigation : {};
        Oe = Re(Oe),
        nt = Re(nt),
        Oe && Oe.forEach(re => L(re, $, F.nextSlideMessage)),
        nt && nt.forEach(re => L(re, $, F.prevSlideMessage)),
        d() && Re(e.pagination.el).forEach(ee => {
            ee.addEventListener("keydown", P)
        }
        ),
        jt().addEventListener("visibilitychange", I),
        e.el.addEventListener("focus", H, !0),
        e.el.addEventListener("focus", H, !0),
        e.el.addEventListener("pointerdown", O, !0),
        e.el.addEventListener("pointerup", X, !0)
    }
    ;
    function Q() {
        r && r.remove();
        let {nextEl: F, prevEl: Y} = e.navigation ? e.navigation : {};
        F = Re(F),
        Y = Re(Y),
        F && F.forEach($ => $.removeEventListener("keydown", P)),
        Y && Y.forEach($ => $.removeEventListener("keydown", P)),
        d() && Re(e.pagination.el).forEach(he => {
            he.removeEventListener("keydown", P)
        }
        ),
        jt().removeEventListener("visibilitychange", I),
        e.el && typeof e.el != "string" && (e.el.removeEventListener("focus", H, !0),
        e.el.removeEventListener("pointerdown", O, !0),
        e.el.removeEventListener("pointerup", X, !0))
    }
    i("beforeInit", () => {
        r = Hi("span", e.params.a11y.notificationClass),
        r.setAttribute("aria-live", "assertive"),
        r.setAttribute("aria-atomic", "true")
    }
    ),
    i("afterInit", () => {
        e.params.a11y.enabled && V()
    }
    ),
    i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
        e.params.a11y.enabled && q()
    }
    ),
    i("fromEdge toEdge afterInit lock unlock", () => {
        e.params.a11y.enabled && k()
    }
    ),
    i("paginationUpdate", () => {
        e.params.a11y.enabled && N()
    }
    ),
    i("destroy", () => {
        e.params.a11y.enabled && Q()
    }
    )
}
function Hm(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        history: {
            enabled: !1,
            root: "",
            replaceState: !1,
            key: "slides",
            keepQuery: !1
        }
    });
    let r = !1
      , n = {};
    const o = y => y.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
      , l = y => {
        const g = ht();
        let p;
        y ? p = new URL(y) : p = g.location;
        const S = p.pathname.slice(1).split("/").filter(P => P !== "")
          , T = S.length
          , C = S[T - 2]
          , E = S[T - 1];
        return {
            key: C,
            value: E
        }
    }
      , c = (y, g) => {
        const p = ht();
        if (!r || !e.params.history.enabled)
            return;
        let S;
        e.params.url ? S = new URL(e.params.url) : S = p.location;
        const T = e.virtual && e.params.virtual.enabled ? e.slidesEl.querySelector(`[data-swiper-slide-index="${g}"]`) : e.slides[g];
        let C = o(T.getAttribute("data-history"));
        if (e.params.history.root.length > 0) {
            let P = e.params.history.root;
            P[P.length - 1] === "/" && (P = P.slice(0, P.length - 1)),
            C = `${P}/${y ? `${y}/` : ""}${C}`
        } else
            S.pathname.includes(y) || (C = `${y ? `${y}/` : ""}${C}`);
        e.params.history.keepQuery && (C += S.search);
        const E = p.history.state;
        E && E.value === C || (e.params.history.replaceState ? p.history.replaceState({
            value: C
        }, null, C) : p.history.pushState({
            value: C
        }, null, C))
    }
      , f = (y, g, p) => {
        if (g)
            for (let S = 0, T = e.slides.length; S < T; S += 1) {
                const C = e.slides[S];
                if (o(C.getAttribute("data-history")) === g) {
                    const P = e.getSlideIndex(C);
                    e.slideTo(P, y, p)
                }
            }
        else
            e.slideTo(0, y, p)
    }
      , h = () => {
        n = l(e.params.url),
        f(e.params.speed, n.value, !1)
    }
      , w = () => {
        const y = ht();
        if (e.params.history) {
            if (!y.history || !y.history.pushState) {
                e.params.history.enabled = !1,
                e.params.hashNavigation.enabled = !0;
                return
            }
            if (r = !0,
            n = l(e.params.url),
            !n.key && !n.value) {
                e.params.history.replaceState || y.addEventListener("popstate", h);
                return
            }
            f(0, n.value, e.params.runCallbacksOnInit),
            e.params.history.replaceState || y.addEventListener("popstate", h)
        }
    }
      , _ = () => {
        const y = ht();
        e.params.history.replaceState || y.removeEventListener("popstate", h)
    }
    ;
    i("init", () => {
        e.params.history.enabled && w()
    }
    ),
    i("destroy", () => {
        e.params.history.enabled && _()
    }
    ),
    i("transitionEnd _freeModeNoMomentumRelease", () => {
        r && c(e.params.history.key, e.activeIndex)
    }
    ),
    i("slideChange", () => {
        r && e.params.cssMode && c(e.params.history.key, e.activeIndex)
    }
    )
}
function Fm(s) {
    let {swiper: e, extendParams: t, emit: i, on: r} = s
      , n = !1;
    const o = jt()
      , l = ht();
    t({
        hashNavigation: {
            enabled: !1,
            replaceState: !1,
            watchState: !1,
            getSlideIndex(_, y) {
                if (e.virtual && e.params.virtual.enabled) {
                    const g = e.slides.find(S => S.getAttribute("data-hash") === y);
                    return g ? parseInt(g.getAttribute("data-swiper-slide-index"), 10) : 0
                }
                return e.getSlideIndex(Ut(e.slidesEl, `.${e.params.slideClass}[data-hash="${y}"], swiper-slide[data-hash="${y}"]`)[0])
            }
        }
    });
    const c = () => {
        i("hashChange");
        const _ = o.location.hash.replace("#", "")
          , y = e.virtual && e.params.virtual.enabled ? e.slidesEl.querySelector(`[data-swiper-slide-index="${e.activeIndex}"]`) : e.slides[e.activeIndex]
          , g = y ? y.getAttribute("data-hash") : "";
        if (_ !== g) {
            const p = e.params.hashNavigation.getSlideIndex(e, _);
            if (typeof p > "u" || Number.isNaN(p))
                return;
            e.slideTo(p)
        }
    }
      , f = () => {
        if (!n || !e.params.hashNavigation.enabled)
            return;
        const _ = e.virtual && e.params.virtual.enabled ? e.slidesEl.querySelector(`[data-swiper-slide-index="${e.activeIndex}"]`) : e.slides[e.activeIndex]
          , y = _ ? _.getAttribute("data-hash") || _.getAttribute("data-history") : "";
        e.params.hashNavigation.replaceState && l.history && l.history.replaceState ? (l.history.replaceState(null, null, `#${y}` || ""),
        i("hashSet")) : (o.location.hash = y || "",
        i("hashSet"))
    }
      , h = () => {
        if (!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)
            return;
        n = !0;
        const _ = o.location.hash.replace("#", "");
        if (_) {
            const g = e.params.hashNavigation.getSlideIndex(e, _);
            e.slideTo(g || 0, 0, e.params.runCallbacksOnInit, !0)
        }
        e.params.hashNavigation.watchState && l.addEventListener("hashchange", c)
    }
      , w = () => {
        e.params.hashNavigation.watchState && l.removeEventListener("hashchange", c)
    }
    ;
    r("init", () => {
        e.params.hashNavigation.enabled && h()
    }
    ),
    r("destroy", () => {
        e.params.hashNavigation.enabled && w()
    }
    ),
    r("transitionEnd _freeModeNoMomentumRelease", () => {
        n && f()
    }
    ),
    r("slideChange", () => {
        n && e.params.cssMode && f()
    }
    )
}
function qm(s) {
    let {swiper: e, extendParams: t, on: i, emit: r, params: n} = s;
    e.autoplay = {
        running: !1,
        paused: !1,
        timeLeft: 0
    },
    t({
        autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !1,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1
        }
    });
    let o, l, c = n && n.autoplay ? n.autoplay.delay : 3e3, f = n && n.autoplay ? n.autoplay.delay : 3e3, h, w = new Date().getTime(), _, y, g, p, S, T, C;
    function E(Y) {
        !e || e.destroyed || !e.wrapperEl || Y.target === e.wrapperEl && (e.wrapperEl.removeEventListener("transitionend", E),
        !(C || Y.detail && Y.detail.bySwiperTouchMove) && O())
    }
    const P = () => {
        if (e.destroyed || !e.autoplay.running)
            return;
        e.autoplay.paused ? _ = !0 : _ && (f = h,
        _ = !1);
        const Y = e.autoplay.paused ? h : w + f - new Date().getTime();
        e.autoplay.timeLeft = Y,
        r("autoplayTimeLeft", Y, Y / c),
        l = requestAnimationFrame( () => {
            P()
        }
        )
    }
      , k = () => {
        let Y;
        return e.virtual && e.params.virtual.enabled ? Y = e.slides.find($ => $.classList.contains("swiper-slide-active")) : Y = e.slides[e.activeIndex],
        Y ? parseInt(Y.getAttribute("data-swiper-autoplay"), 10) : void 0
    }
      , R = Y => {
        if (e.destroyed || !e.autoplay.running)
            return;
        cancelAnimationFrame(l),
        P();
        let Z = typeof Y > "u" ? e.params.autoplay.delay : Y;
        c = e.params.autoplay.delay,
        f = e.params.autoplay.delay;
        const $ = k();
        !Number.isNaN($) && $ > 0 && typeof Y > "u" && (Z = $,
        c = $,
        f = $),
        h = Z;
        const he = e.params.speed
          , Oe = () => {
            !e || e.destroyed || (e.params.autoplay.reverseDirection ? !e.isBeginning || e.params.loop || e.params.rewind ? (e.slidePrev(he, !0, !0),
            r("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(e.slides.length - 1, he, !0, !0),
            r("autoplay")) : !e.isEnd || e.params.loop || e.params.rewind ? (e.slideNext(he, !0, !0),
            r("autoplay")) : e.params.autoplay.stopOnLastSlide || (e.slideTo(0, he, !0, !0),
            r("autoplay")),
            e.params.cssMode && (w = new Date().getTime(),
            requestAnimationFrame( () => {
                R()
            }
            )))
        }
        ;
        return Z > 0 ? (clearTimeout(o),
        o = setTimeout( () => {
            Oe()
        }
        , Z)) : requestAnimationFrame( () => {
            Oe()
        }
        ),
        Z
    }
      , d = () => {
        w = new Date().getTime(),
        e.autoplay.running = !0,
        R(),
        r("autoplayStart")
    }
      , N = () => {
        e.autoplay.running = !1,
        clearTimeout(o),
        cancelAnimationFrame(l),
        r("autoplayStop")
    }
      , L = (Y, Z) => {
        if (e.destroyed || !e.autoplay.running)
            return;
        clearTimeout(o),
        Y || (T = !0);
        const $ = () => {
            r("autoplayPause"),
            e.params.autoplay.waitForTransition ? e.wrapperEl.addEventListener("transitionend", E) : O()
        }
        ;
        if (e.autoplay.paused = !0,
        Z) {
            S && (h = e.params.autoplay.delay),
            S = !1,
            $();
            return
        }
        h = (h || e.params.autoplay.delay) - (new Date().getTime() - w),
        !(e.isEnd && h < 0 && !e.params.loop) && (h < 0 && (h = 0),
        $())
    }
      , O = () => {
        e.isEnd && h < 0 && !e.params.loop || e.destroyed || !e.autoplay.running || (w = new Date().getTime(),
        T ? (T = !1,
        R(h)) : R(),
        e.autoplay.paused = !1,
        r("autoplayResume"))
    }
      , X = () => {
        if (e.destroyed || !e.autoplay.running)
            return;
        const Y = jt();
        Y.visibilityState === "hidden" && (T = !0,
        L(!0)),
        Y.visibilityState === "visible" && O()
    }
      , I = Y => {
        Y.pointerType === "mouse" && (T = !0,
        C = !0,
        !(e.animating || e.autoplay.paused) && L(!0))
    }
      , H = Y => {
        Y.pointerType === "mouse" && (C = !1,
        e.autoplay.paused && O())
    }
      , q = () => {
        e.params.autoplay.pauseOnMouseEnter && (e.el.addEventListener("pointerenter", I),
        e.el.addEventListener("pointerleave", H))
    }
      , V = () => {
        e.el && typeof e.el != "string" && (e.el.removeEventListener("pointerenter", I),
        e.el.removeEventListener("pointerleave", H))
    }
      , Q = () => {
        jt().addEventListener("visibilitychange", X)
    }
      , F = () => {
        jt().removeEventListener("visibilitychange", X)
    }
    ;
    i("init", () => {
        e.params.autoplay.enabled && (q(),
        Q(),
        d())
    }
    ),
    i("destroy", () => {
        V(),
        F(),
        e.autoplay.running && N()
    }
    ),
    i("_freeModeStaticRelease", () => {
        (g || T) && O()
    }
    ),
    i("_freeModeNoMomentumRelease", () => {
        e.params.autoplay.disableOnInteraction ? N() : L(!0, !0)
    }
    ),
    i("beforeTransitionStart", (Y, Z, $) => {
        e.destroyed || !e.autoplay.running || ($ || !e.params.autoplay.disableOnInteraction ? L(!0, !0) : N())
    }
    ),
    i("sliderFirstMove", () => {
        if (!(e.destroyed || !e.autoplay.running)) {
            if (e.params.autoplay.disableOnInteraction) {
                N();
                return
            }
            y = !0,
            g = !1,
            T = !1,
            p = setTimeout( () => {
                T = !0,
                g = !0,
                L(!0)
            }
            , 200)
        }
    }
    ),
    i("touchEnd", () => {
        if (!(e.destroyed || !e.autoplay.running || !y)) {
            if (clearTimeout(p),
            clearTimeout(o),
            e.params.autoplay.disableOnInteraction) {
                g = !1,
                y = !1;
                return
            }
            g && e.params.cssMode && O(),
            g = !1,
            y = !1
        }
    }
    ),
    i("slideChange", () => {
        e.destroyed || !e.autoplay.running || (S = !0)
    }
    ),
    Object.assign(e.autoplay, {
        start: d,
        stop: N,
        pause: L,
        resume: O
    })
}
function Bm(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        thumbs: {
            swiper: null,
            multipleActiveThumbs: !0,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-thumbs"
        }
    });
    let r = !1
      , n = !1;
    e.thumbs = {
        swiper: null
    };
    function o() {
        const f = e.thumbs.swiper;
        if (!f || f.destroyed)
            return;
        const h = f.clickedIndex
          , w = f.clickedSlide;
        if (w && w.classList.contains(e.params.thumbs.slideThumbActiveClass) || typeof h > "u" || h === null)
            return;
        let _;
        f.params.loop ? _ = parseInt(f.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : _ = h,
        e.params.loop ? e.slideToLoop(_) : e.slideTo(_)
    }
    function l() {
        const {thumbs: f} = e.params;
        if (r)
            return !1;
        r = !0;
        const h = e.constructor;
        if (f.swiper instanceof h) {
            if (f.swiper.destroyed)
                return r = !1,
                !1;
            e.thumbs.swiper = f.swiper,
            Object.assign(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            Object.assign(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            e.thumbs.swiper.update()
        } else if (Cs(f.swiper)) {
            const w = Object.assign({}, f.swiper);
            Object.assign(w, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            e.thumbs.swiper = new h(w),
            n = !0
        }
        return e.thumbs.swiper.el.classList.add(e.params.thumbs.thumbsContainerClass),
        e.thumbs.swiper.on("tap", o),
        !0
    }
    function c(f) {
        const h = e.thumbs.swiper;
        if (!h || h.destroyed)
            return;
        const w = h.params.slidesPerView === "auto" ? h.slidesPerViewDynamic() : h.params.slidesPerView;
        let _ = 1;
        const y = e.params.thumbs.slideThumbActiveClass;
        if (e.params.slidesPerView > 1 && !e.params.centeredSlides && (_ = e.params.slidesPerView),
        e.params.thumbs.multipleActiveThumbs || (_ = 1),
        _ = Math.floor(_),
        h.slides.forEach(S => S.classList.remove(y)),
        h.params.loop || h.params.virtual && h.params.virtual.enabled)
            for (let S = 0; S < _; S += 1)
                Ut(h.slidesEl, `[data-swiper-slide-index="${e.realIndex + S}"]`).forEach(T => {
                    T.classList.add(y)
                }
                );
        else
            for (let S = 0; S < _; S += 1)
                h.slides[e.realIndex + S] && h.slides[e.realIndex + S].classList.add(y);
        const g = e.params.thumbs.autoScrollOffset
          , p = g && !h.params.loop;
        if (e.realIndex !== h.realIndex || p) {
            const S = h.activeIndex;
            let T, C;
            if (h.params.loop) {
                const E = h.slides.find(P => P.getAttribute("data-swiper-slide-index") === `${e.realIndex}`);
                T = h.slides.indexOf(E),
                C = e.activeIndex > e.previousIndex ? "next" : "prev"
            } else
                T = e.realIndex,
                C = T > e.previousIndex ? "next" : "prev";
            p && (T += C === "next" ? g : -1 * g),
            h.visibleSlidesIndexes && h.visibleSlidesIndexes.indexOf(T) < 0 && (h.params.centeredSlides ? T > S ? T = T - Math.floor(w / 2) + 1 : T = T + Math.floor(w / 2) - 1 : T > S && h.params.slidesPerGroup,
            h.slideTo(T, f ? 0 : void 0))
        }
    }
    i("beforeInit", () => {
        const {thumbs: f} = e.params;
        if (!(!f || !f.swiper))
            if (typeof f.swiper == "string" || f.swiper instanceof HTMLElement) {
                const h = jt()
                  , w = () => {
                    const y = typeof f.swiper == "string" ? h.querySelector(f.swiper) : f.swiper;
                    if (y && y.swiper)
                        f.swiper = y.swiper,
                        l(),
                        c(!0);
                    else if (y) {
                        const g = `${e.params.eventsPrefix}init`
                          , p = S => {
                            f.swiper = S.detail[0],
                            y.removeEventListener(g, p),
                            l(),
                            c(!0),
                            f.swiper.update(),
                            e.update()
                        }
                        ;
                        y.addEventListener(g, p)
                    }
                    return y
                }
                  , _ = () => {
                    if (e.destroyed)
                        return;
                    w() || requestAnimationFrame(_)
                }
                ;
                requestAnimationFrame(_)
            } else
                l(),
                c(!0)
    }
    ),
    i("slideChange update resize observerUpdate", () => {
        c()
    }
    ),
    i("setTransition", (f, h) => {
        const w = e.thumbs.swiper;
        !w || w.destroyed || w.setTransition(h)
    }
    ),
    i("beforeDestroy", () => {
        const f = e.thumbs.swiper;
        !f || f.destroyed || n && f.destroy()
    }
    ),
    Object.assign(e.thumbs, {
        init: l,
        update: c
    })
}
function jm(s) {
    let {swiper: e, extendParams: t, emit: i, once: r} = s;
    t({
        freeMode: {
            enabled: !1,
            momentum: !0,
            momentumRatio: 1,
            momentumBounce: !0,
            momentumBounceRatio: 1,
            momentumVelocityRatio: 1,
            sticky: !1,
            minimumVelocity: .02
        }
    });
    function n() {
        if (e.params.cssMode)
            return;
        const c = e.getTranslate();
        e.setTranslate(c),
        e.setTransition(0),
        e.touchEventsData.velocities.length = 0,
        e.freeMode.onTouchEnd({
            currentPos: e.rtl ? e.translate : -e.translate
        })
    }
    function o() {
        if (e.params.cssMode)
            return;
        const {touchEventsData: c, touches: f} = e;
        c.velocities.length === 0 && c.velocities.push({
            position: f[e.isHorizontal() ? "startX" : "startY"],
            time: c.touchStartTime
        }),
        c.velocities.push({
            position: f[e.isHorizontal() ? "currentX" : "currentY"],
            time: Ki()
        })
    }
    function l(c) {
        let {currentPos: f} = c;
        if (e.params.cssMode)
            return;
        const {params: h, wrapperEl: w, rtlTranslate: _, snapGrid: y, touchEventsData: g} = e
          , S = Ki() - g.touchStartTime;
        if (f < -e.minTranslate()) {
            e.slideTo(e.activeIndex);
            return
        }
        if (f > -e.maxTranslate()) {
            e.slides.length < y.length ? e.slideTo(y.length - 1) : e.slideTo(e.slides.length - 1);
            return
        }
        if (h.freeMode.momentum) {
            if (g.velocities.length > 1) {
                const N = g.velocities.pop()
                  , L = g.velocities.pop()
                  , O = N.position - L.position
                  , X = N.time - L.time;
                e.velocity = O / X,
                e.velocity /= 2,
                Math.abs(e.velocity) < h.freeMode.minimumVelocity && (e.velocity = 0),
                (X > 150 || Ki() - N.time > 300) && (e.velocity = 0)
            } else
                e.velocity = 0;
            e.velocity *= h.freeMode.momentumVelocityRatio,
            g.velocities.length = 0;
            let T = 1e3 * h.freeMode.momentumRatio;
            const C = e.velocity * T;
            let E = e.translate + C;
            _ && (E = -E);
            let P = !1, k;
            const R = Math.abs(e.velocity) * 20 * h.freeMode.momentumBounceRatio;
            let d;
            if (E < e.maxTranslate())
                h.freeMode.momentumBounce ? (E + e.maxTranslate() < -R && (E = e.maxTranslate() - R),
                k = e.maxTranslate(),
                P = !0,
                g.allowMomentumBounce = !0) : E = e.maxTranslate(),
                h.loop && h.centeredSlides && (d = !0);
            else if (E > e.minTranslate())
                h.freeMode.momentumBounce ? (E - e.minTranslate() > R && (E = e.minTranslate() + R),
                k = e.minTranslate(),
                P = !0,
                g.allowMomentumBounce = !0) : E = e.minTranslate(),
                h.loop && h.centeredSlides && (d = !0);
            else if (h.freeMode.sticky) {
                let N;
                for (let L = 0; L < y.length; L += 1)
                    if (y[L] > -E) {
                        N = L;
                        break
                    }
                Math.abs(y[N] - E) < Math.abs(y[N - 1] - E) || e.swipeDirection === "next" ? E = y[N] : E = y[N - 1],
                E = -E
            }
            if (d && r("transitionEnd", () => {
                e.loopFix()
            }
            ),
            e.velocity !== 0) {
                if (_ ? T = Math.abs((-E - e.translate) / e.velocity) : T = Math.abs((E - e.translate) / e.velocity),
                h.freeMode.sticky) {
                    const N = Math.abs((_ ? -E : E) - e.translate)
                      , L = e.slidesSizesGrid[e.activeIndex];
                    N < L ? T = h.speed : N < 2 * L ? T = h.speed * 1.5 : T = h.speed * 2.5
                }
            } else if (h.freeMode.sticky) {
                e.slideToClosest();
                return
            }
            h.freeMode.momentumBounce && P ? (e.updateProgress(k),
            e.setTransition(T),
            e.setTranslate(E),
            e.transitionStart(!0, e.swipeDirection),
            e.animating = !0,
            Rs(w, () => {
                !e || e.destroyed || !g.allowMomentumBounce || (i("momentumBounce"),
                e.setTransition(h.speed),
                setTimeout( () => {
                    e.setTranslate(k),
                    Rs(w, () => {
                        !e || e.destroyed || e.transitionEnd()
                    }
                    )
                }
                , 0))
            }
            )) : e.velocity ? (i("_freeModeNoMomentumRelease"),
            e.updateProgress(E),
            e.setTransition(T),
            e.setTranslate(E),
            e.transitionStart(!0, e.swipeDirection),
            e.animating || (e.animating = !0,
            Rs(w, () => {
                !e || e.destroyed || e.transitionEnd()
            }
            ))) : e.updateProgress(E),
            e.updateActiveIndex(),
            e.updateSlidesClasses()
        } else if (h.freeMode.sticky) {
            e.slideToClosest();
            return
        } else
            h.freeMode && i("_freeModeNoMomentumRelease");
        (!h.freeMode.momentum || S >= h.longSwipesMs) && (i("_freeModeStaticRelease"),
        e.updateProgress(),
        e.updateActiveIndex(),
        e.updateSlidesClasses())
    }
    Object.assign(e, {
        freeMode: {
            onTouchStart: n,
            onTouchMove: o,
            onTouchEnd: l
        }
    })
}
function Xm(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        grid: {
            rows: 1,
            fill: "column"
        }
    });
    let r, n, o, l;
    const c = () => {
        let p = e.params.spaceBetween;
        return typeof p == "string" && p.indexOf("%") >= 0 ? p = parseFloat(p.replace("%", "")) / 100 * e.size : typeof p == "string" && (p = parseFloat(p)),
        p
    }
      , f = p => {
        const {slidesPerView: S} = e.params
          , {rows: T, fill: C} = e.params.grid
          , E = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : p.length;
        o = Math.floor(E / T),
        Math.floor(E / T) === E / T ? r = E : r = Math.ceil(E / T) * T,
        S !== "auto" && C === "row" && (r = Math.max(r, S * T)),
        n = r / T
    }
      , h = () => {
        e.slides && e.slides.forEach(p => {
            p.swiperSlideGridSet && (p.style.height = "",
            p.style[e.getDirectionLabel("margin-top")] = "")
        }
        )
    }
      , w = (p, S, T) => {
        const {slidesPerGroup: C} = e.params
          , E = c()
          , {rows: P, fill: k} = e.params.grid
          , R = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : T.length;
        let d, N, L;
        if (k === "row" && C > 1) {
            const O = Math.floor(p / (C * P))
              , X = p - P * C * O
              , I = O === 0 ? C : Math.min(Math.ceil((R - O * P * C) / P), C);
            L = Math.floor(X / I),
            N = X - L * I + O * C,
            d = N + L * r / P,
            S.style.order = d
        } else
            k === "column" ? (N = Math.floor(p / P),
            L = p - N * P,
            (N > o || N === o && L === P - 1) && (L += 1,
            L >= P && (L = 0,
            N += 1))) : (L = Math.floor(p / n),
            N = p - L * n);
        S.row = L,
        S.column = N,
        S.style.height = `calc((100% - ${(P - 1) * E}px) / ${P})`,
        S.style[e.getDirectionLabel("margin-top")] = L !== 0 ? E && `${E}px` : "",
        S.swiperSlideGridSet = !0
    }
      , _ = (p, S) => {
        const {centeredSlides: T, roundLengths: C} = e.params
          , E = c()
          , {rows: P} = e.params.grid;
        if (e.virtualSize = (p + E) * r,
        e.virtualSize = Math.ceil(e.virtualSize / P) - E,
        e.params.cssMode || (e.wrapperEl.style[e.getDirectionLabel("width")] = `${e.virtualSize + E}px`),
        T) {
            const k = [];
            for (let R = 0; R < S.length; R += 1) {
                let d = S[R];
                C && (d = Math.floor(d)),
                S[R] < e.virtualSize + S[0] && k.push(d)
            }
            S.splice(0, S.length),
            S.push(...k)
        }
    }
      , y = () => {
        l = e.params.grid && e.params.grid.rows > 1
    }
      , g = () => {
        const {params: p, el: S} = e
          , T = p.grid && p.grid.rows > 1;
        l && !T ? (S.classList.remove(`${p.containerModifierClass}grid`, `${p.containerModifierClass}grid-column`),
        o = 1,
        e.emitContainerClasses()) : !l && T && (S.classList.add(`${p.containerModifierClass}grid`),
        p.grid.fill === "column" && S.classList.add(`${p.containerModifierClass}grid-column`),
        e.emitContainerClasses()),
        l = T
    }
    ;
    i("init", y),
    i("update", g),
    e.grid = {
        initSlides: f,
        unsetSlides: h,
        updateSlide: w,
        updateWrapperSize: _
    }
}
function Ym(s) {
    const e = this
      , {params: t, slidesEl: i} = e;
    t.loop && e.loopDestroy();
    const r = n => {
        if (typeof n == "string") {
            const o = document.createElement("div");
            Nr(o, n),
            i.append(o.children[0]),
            Nr(o, "")
        } else
            i.append(n)
    }
    ;
    if (typeof s == "object" && "length"in s)
        for (let n = 0; n < s.length; n += 1)
            s[n] && r(s[n]);
    else
        r(s);
    e.recalcSlides(),
    t.loop && e.loopCreate(),
    (!t.observer || e.isElement) && e.update()
}
function Wm(s) {
    const e = this
      , {params: t, activeIndex: i, slidesEl: r} = e;
    t.loop && e.loopDestroy();
    let n = i + 1;
    const o = l => {
        if (typeof l == "string") {
            const c = document.createElement("div");
            Nr(c, l),
            r.prepend(c.children[0]),
            Nr(c, "")
        } else
            r.prepend(l)
    }
    ;
    if (typeof s == "object" && "length"in s) {
        for (let l = 0; l < s.length; l += 1)
            s[l] && o(s[l]);
        n = i + s.length
    } else
        o(s);
    e.recalcSlides(),
    t.loop && e.loopCreate(),
    (!t.observer || e.isElement) && e.update(),
    e.slideTo(n, 0, !1)
}
function Gm(s, e) {
    const t = this
      , {params: i, activeIndex: r, slidesEl: n} = t;
    let o = r;
    i.loop && (o -= t.loopedSlides,
    t.loopDestroy(),
    t.recalcSlides());
    const l = t.slides.length;
    if (s <= 0) {
        t.prependSlide(e);
        return
    }
    if (s >= l) {
        t.appendSlide(e);
        return
    }
    let c = o > s ? o + 1 : o;
    const f = [];
    for (let h = l - 1; h >= s; h -= 1) {
        const w = t.slides[h];
        w.remove(),
        f.unshift(w)
    }
    if (typeof e == "object" && "length"in e) {
        for (let h = 0; h < e.length; h += 1)
            e[h] && n.append(e[h]);
        c = o > s ? o + e.length : o
    } else
        n.append(e);
    for (let h = 0; h < f.length; h += 1)
        n.append(f[h]);
    t.recalcSlides(),
    i.loop && t.loopCreate(),
    (!i.observer || t.isElement) && t.update(),
    i.loop ? t.slideTo(c + t.loopedSlides, 0, !1) : t.slideTo(c, 0, !1)
}
function Vm(s) {
    const e = this
      , {params: t, activeIndex: i} = e;
    let r = i;
    t.loop && (r -= e.loopedSlides,
    e.loopDestroy());
    let n = r, o;
    if (typeof s == "object" && "length"in s) {
        for (let l = 0; l < s.length; l += 1)
            o = s[l],
            e.slides[o] && e.slides[o].remove(),
            o < n && (n -= 1);
        n = Math.max(n, 0)
    } else
        o = s,
        e.slides[o] && e.slides[o].remove(),
        o < n && (n -= 1),
        n = Math.max(n, 0);
    e.recalcSlides(),
    t.loop && e.loopCreate(),
    (!t.observer || e.isElement) && e.update(),
    t.loop ? e.slideTo(n + e.loopedSlides, 0, !1) : e.slideTo(n, 0, !1)
}
function Um() {
    const s = this
      , e = [];
    for (let t = 0; t < s.slides.length; t += 1)
        e.push(t);
    s.removeSlide(e)
}
function Km(s) {
    let {swiper: e} = s;
    Object.assign(e, {
        appendSlide: Ym.bind(e),
        prependSlide: Wm.bind(e),
        addSlide: Gm.bind(e),
        removeSlide: Vm.bind(e),
        removeAllSlides: Um.bind(e)
    })
}
function ps(s) {
    const {effect: e, swiper: t, on: i, setTranslate: r, setTransition: n, overwriteParams: o, perspective: l, recreateShadows: c, getEffectParams: f} = s;
    i("beforeInit", () => {
        if (t.params.effect !== e)
            return;
        t.classNames.push(`${t.params.containerModifierClass}${e}`),
        l && l() && t.classNames.push(`${t.params.containerModifierClass}3d`);
        const w = o ? o() : {};
        Object.assign(t.params, w),
        Object.assign(t.originalParams, w)
    }
    ),
    i("setTranslate _virtualUpdated", () => {
        t.params.effect === e && r()
    }
    ),
    i("setTransition", (w, _) => {
        t.params.effect === e && n(_)
    }
    ),
    i("transitionEnd", () => {
        if (t.params.effect === e && c) {
            if (!f || !f().slideShadows)
                return;
            t.slides.forEach(w => {
                w.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(_ => _.remove())
            }
            ),
            c()
        }
    }
    );
    let h;
    i("virtualUpdate", () => {
        t.params.effect === e && (t.slides.length || (h = !0),
        requestAnimationFrame( () => {
            h && t.slides && t.slides.length && (r(),
            h = !1)
        }
        ))
    }
    )
}
function sa(s, e) {
    const t = Nn(e);
    return t !== e && (t.style.backfaceVisibility = "hidden",
    t.style["-webkit-backface-visibility"] = "hidden"),
    t
}
function ro(s) {
    let {swiper: e, duration: t, transformElements: i, allSlides: r} = s;
    const {activeIndex: n} = e
      , o = l => l.parentElement ? l.parentElement : e.slides.find(f => f.shadowRoot && f.shadowRoot === l.parentNode);
    if (e.params.virtualTranslate && t !== 0) {
        let l = !1, c;
        r ? c = i : c = i.filter(f => {
            const h = f.classList.contains("swiper-slide-transform") ? o(f) : f;
            return e.getSlideIndex(h) === n
        }
        ),
        c.forEach(f => {
            Rs(f, () => {
                if (l || !e || e.destroyed)
                    return;
                l = !0,
                e.animating = !1;
                const h = new window.CustomEvent("transitionend",{
                    bubbles: !0,
                    cancelable: !0
                });
                e.wrapperEl.dispatchEvent(h)
            }
            )
        }
        )
    }
}
function Qm(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        fadeEffect: {
            crossFade: !1
        }
    }),
    ps({
        effect: "fade",
        swiper: e,
        on: i,
        setTranslate: () => {
            const {slides: o} = e
              , l = e.params.fadeEffect;
            for (let c = 0; c < o.length; c += 1) {
                const f = e.slides[c];
                let w = -f.swiperSlideOffset;
                e.params.virtualTranslate || (w -= e.translate);
                let _ = 0;
                e.isHorizontal() || (_ = w,
                w = 0);
                const y = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(f.progress), 0) : 1 + Math.min(Math.max(f.progress, -1), 0)
                  , g = sa(l, f);
                g.style.opacity = y,
                g.style.transform = `translate3d(${w}px, ${_}px, 0px)`
            }
        }
        ,
        setTransition: o => {
            const l = e.slides.map(c => Nn(c));
            l.forEach(c => {
                c.style.transitionDuration = `${o}ms`
            }
            ),
            ro({
                swiper: e,
                duration: o,
                transformElements: l,
                allSlides: !0
            })
        }
        ,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode
        })
    })
}
function Zm(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: .94
        }
    });
    const r = (c, f, h) => {
        let w = h ? c.querySelector(".swiper-slide-shadow-left") : c.querySelector(".swiper-slide-shadow-top")
          , _ = h ? c.querySelector(".swiper-slide-shadow-right") : c.querySelector(".swiper-slide-shadow-bottom");
        w || (w = Hi("div", `swiper-slide-shadow-cube swiper-slide-shadow-${h ? "left" : "top"}`.split(" ")),
        c.append(w)),
        _ || (_ = Hi("div", `swiper-slide-shadow-cube swiper-slide-shadow-${h ? "right" : "bottom"}`.split(" ")),
        c.append(_)),
        w && (w.style.opacity = Math.max(-f, 0)),
        _ && (_.style.opacity = Math.max(f, 0))
    }
    ;
    ps({
        effect: "cube",
        swiper: e,
        on: i,
        setTranslate: () => {
            const {el: c, wrapperEl: f, slides: h, width: w, height: _, rtlTranslate: y, size: g, browser: p} = e
              , S = io(e)
              , T = e.params.cubeEffect
              , C = e.isHorizontal()
              , E = e.virtual && e.params.virtual.enabled;
            let P = 0, k;
            T.shadow && (C ? (k = e.wrapperEl.querySelector(".swiper-cube-shadow"),
            k || (k = Hi("div", "swiper-cube-shadow"),
            e.wrapperEl.append(k)),
            k.style.height = `${w}px`) : (k = c.querySelector(".swiper-cube-shadow"),
            k || (k = Hi("div", "swiper-cube-shadow"),
            c.append(k))));
            for (let d = 0; d < h.length; d += 1) {
                const N = h[d];
                let L = d;
                E && (L = parseInt(N.getAttribute("data-swiper-slide-index"), 10));
                let O = L * 90
                  , X = Math.floor(O / 360);
                y && (O = -O,
                X = Math.floor(-O / 360));
                const I = Math.max(Math.min(N.progress, 1), -1);
                let H = 0
                  , q = 0
                  , V = 0;
                L % 4 === 0 ? (H = -X * 4 * g,
                V = 0) : (L - 1) % 4 === 0 ? (H = 0,
                V = -X * 4 * g) : (L - 2) % 4 === 0 ? (H = g + X * 4 * g,
                V = g) : (L - 3) % 4 === 0 && (H = -g,
                V = 3 * g + g * 4 * X),
                y && (H = -H),
                C || (q = H,
                H = 0);
                const Q = `rotateX(${S(C ? 0 : -O)}deg) rotateY(${S(C ? O : 0)}deg) translate3d(${H}px, ${q}px, ${V}px)`;
                I <= 1 && I > -1 && (P = L * 90 + I * 90,
                y && (P = -L * 90 - I * 90)),
                N.style.transform = Q,
                T.slideShadows && r(N, I, C)
            }
            if (f.style.transformOrigin = `50% 50% -${g / 2}px`,
            f.style["-webkit-transform-origin"] = `50% 50% -${g / 2}px`,
            T.shadow)
                if (C)
                    k.style.transform = `translate3d(0px, ${w / 2 + T.shadowOffset}px, ${-w / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${T.shadowScale})`;
                else {
                    const d = Math.abs(P) - Math.floor(Math.abs(P) / 90) * 90
                      , N = 1.5 - (Math.sin(d * 2 * Math.PI / 360) / 2 + Math.cos(d * 2 * Math.PI / 360) / 2)
                      , L = T.shadowScale
                      , O = T.shadowScale / N
                      , X = T.shadowOffset;
                    k.style.transform = `scale3d(${L}, 1, ${O}) translate3d(0px, ${_ / 2 + X}px, ${-_ / 2 / O}px) rotateX(-89.99deg)`
                }
            const R = (p.isSafari || p.isWebView) && p.needPerspectiveFix ? -g / 2 : 0;
            f.style.transform = `translate3d(0px,0,${R}px) rotateX(${S(e.isHorizontal() ? 0 : P)}deg) rotateY(${S(e.isHorizontal() ? -P : 0)}deg)`,
            f.style.setProperty("--swiper-cube-translate-z", `${R}px`)
        }
        ,
        setTransition: c => {
            const {el: f, slides: h} = e;
            if (h.forEach(w => {
                w.style.transitionDuration = `${c}ms`,
                w.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(_ => {
                    _.style.transitionDuration = `${c}ms`
                }
                )
            }
            ),
            e.params.cubeEffect.shadow && !e.isHorizontal()) {
                const w = f.querySelector(".swiper-cube-shadow");
                w && (w.style.transitionDuration = `${c}ms`)
            }
        }
        ,
        recreateShadows: () => {
            const c = e.isHorizontal();
            e.slides.forEach(f => {
                const h = Math.max(Math.min(f.progress, 1), -1);
                r(f, h, c)
            }
            )
        }
        ,
        getEffectParams: () => e.params.cubeEffect,
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: !1,
            virtualTranslate: !0
        })
    })
}
function fs(s, e, t) {
    const i = `swiper-slide-shadow${t ? `-${t}` : ""}${s ? ` swiper-slide-shadow-${s}` : ""}`
      , r = Nn(e);
    let n = r.querySelector(`.${i.split(" ").join(".")}`);
    return n || (n = Hi("div", i.split(" ")),
    r.append(n)),
    n
}
function Jm(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        flipEffect: {
            slideShadows: !0,
            limitRotation: !0
        }
    });
    const r = (c, f) => {
        let h = e.isHorizontal() ? c.querySelector(".swiper-slide-shadow-left") : c.querySelector(".swiper-slide-shadow-top")
          , w = e.isHorizontal() ? c.querySelector(".swiper-slide-shadow-right") : c.querySelector(".swiper-slide-shadow-bottom");
        h || (h = fs("flip", c, e.isHorizontal() ? "left" : "top")),
        w || (w = fs("flip", c, e.isHorizontal() ? "right" : "bottom")),
        h && (h.style.opacity = Math.max(-f, 0)),
        w && (w.style.opacity = Math.max(f, 0))
    }
    ;
    ps({
        effect: "flip",
        swiper: e,
        on: i,
        setTranslate: () => {
            const {slides: c, rtlTranslate: f} = e
              , h = e.params.flipEffect
              , w = io(e);
            for (let _ = 0; _ < c.length; _ += 1) {
                const y = c[_];
                let g = y.progress;
                e.params.flipEffect.limitRotation && (g = Math.max(Math.min(y.progress, 1), -1));
                const p = y.swiperSlideOffset;
                let T = -180 * g
                  , C = 0
                  , E = e.params.cssMode ? -p - e.translate : -p
                  , P = 0;
                e.isHorizontal() ? f && (T = -T) : (P = E,
                E = 0,
                C = -T,
                T = 0),
                y.style.zIndex = -Math.abs(Math.round(g)) + c.length,
                h.slideShadows && r(y, g);
                const k = `translate3d(${E}px, ${P}px, 0px) rotateX(${w(C)}deg) rotateY(${w(T)}deg)`
                  , R = sa(h, y);
                R.style.transform = k
            }
        }
        ,
        setTransition: c => {
            const f = e.slides.map(h => Nn(h));
            f.forEach(h => {
                h.style.transitionDuration = `${c}ms`,
                h.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(w => {
                    w.style.transitionDuration = `${c}ms`
                }
                )
            }
            ),
            ro({
                swiper: e,
                duration: c,
                transformElements: f
            })
        }
        ,
        recreateShadows: () => {
            e.params.flipEffect,
            e.slides.forEach(c => {
                let f = c.progress;
                e.params.flipEffect.limitRotation && (f = Math.max(Math.min(c.progress, 1), -1)),
                r(c, f)
            }
            )
        }
        ,
        getEffectParams: () => e.params.flipEffect,
        perspective: () => !0,
        overwriteParams: () => ({
            slidesPerView: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: !0,
            spaceBetween: 0,
            virtualTranslate: !e.params.cssMode
        })
    })
}
function eg(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            scale: 1,
            modifier: 1,
            slideShadows: !0
        }
    }),
    ps({
        effect: "coverflow",
        swiper: e,
        on: i,
        setTranslate: () => {
            const {width: o, height: l, slides: c, slidesSizesGrid: f} = e
              , h = e.params.coverflowEffect
              , w = e.isHorizontal()
              , _ = e.translate
              , y = w ? -_ + o / 2 : -_ + l / 2
              , g = w ? h.rotate : -h.rotate
              , p = h.depth
              , S = io(e);
            for (let T = 0, C = c.length; T < C; T += 1) {
                const E = c[T]
                  , P = f[T]
                  , k = E.swiperSlideOffset
                  , R = (y - k - P / 2) / P
                  , d = typeof h.modifier == "function" ? h.modifier(R) : R * h.modifier;
                let N = w ? g * d : 0
                  , L = w ? 0 : g * d
                  , O = -p * Math.abs(d)
                  , X = h.stretch;
                typeof X == "string" && X.indexOf("%") !== -1 && (X = parseFloat(h.stretch) / 100 * P);
                let I = w ? 0 : X * d
                  , H = w ? X * d : 0
                  , q = 1 - (1 - h.scale) * Math.abs(d);
                Math.abs(H) < .001 && (H = 0),
                Math.abs(I) < .001 && (I = 0),
                Math.abs(O) < .001 && (O = 0),
                Math.abs(N) < .001 && (N = 0),
                Math.abs(L) < .001 && (L = 0),
                Math.abs(q) < .001 && (q = 0);
                const V = `translate3d(${H}px,${I}px,${O}px)  rotateX(${S(L)}deg) rotateY(${S(N)}deg) scale(${q})`
                  , Q = sa(h, E);
                if (Q.style.transform = V,
                E.style.zIndex = -Math.abs(Math.round(d)) + 1,
                h.slideShadows) {
                    let F = w ? E.querySelector(".swiper-slide-shadow-left") : E.querySelector(".swiper-slide-shadow-top")
                      , Y = w ? E.querySelector(".swiper-slide-shadow-right") : E.querySelector(".swiper-slide-shadow-bottom");
                    F || (F = fs("coverflow", E, w ? "left" : "top")),
                    Y || (Y = fs("coverflow", E, w ? "right" : "bottom")),
                    F && (F.style.opacity = d > 0 ? d : 0),
                    Y && (Y.style.opacity = -d > 0 ? -d : 0)
                }
            }
        }
        ,
        setTransition: o => {
            e.slides.map(c => Nn(c)).forEach(c => {
                c.style.transitionDuration = `${o}ms`,
                c.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(f => {
                    f.style.transitionDuration = `${o}ms`
                }
                )
            }
            )
        }
        ,
        perspective: () => !0,
        overwriteParams: () => ({
            watchSlidesProgress: !0
        })
    })
}
function tg(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        creativeEffect: {
            limitProgress: 1,
            shadowPerProgress: !1,
            progressMultiplier: 1,
            perspective: !0,
            prev: {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                opacity: 1,
                scale: 1
            },
            next: {
                translate: [0, 0, 0],
                rotate: [0, 0, 0],
                opacity: 1,
                scale: 1
            }
        }
    });
    const r = l => typeof l == "string" ? l : `${l}px`;
    ps({
        effect: "creative",
        swiper: e,
        on: i,
        setTranslate: () => {
            const {slides: l, wrapperEl: c, slidesSizesGrid: f} = e
              , h = e.params.creativeEffect
              , {progressMultiplier: w} = h
              , _ = e.params.centeredSlides
              , y = io(e);
            if (_) {
                const g = f[0] / 2 - e.params.slidesOffsetBefore || 0;
                c.style.transform = `translateX(calc(50% - ${g}px))`
            }
            for (let g = 0; g < l.length; g += 1) {
                const p = l[g]
                  , S = p.progress
                  , T = Math.min(Math.max(p.progress, -h.limitProgress), h.limitProgress);
                let C = T;
                _ || (C = Math.min(Math.max(p.originalProgress, -h.limitProgress), h.limitProgress));
                const E = p.swiperSlideOffset
                  , P = [e.params.cssMode ? -E - e.translate : -E, 0, 0]
                  , k = [0, 0, 0];
                let R = !1;
                e.isHorizontal() || (P[1] = P[0],
                P[0] = 0);
                let d = {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    scale: 1,
                    opacity: 1
                };
                T < 0 ? (d = h.next,
                R = !0) : T > 0 && (d = h.prev,
                R = !0),
                P.forEach( (q, V) => {
                    P[V] = `calc(${q}px + (${r(d.translate[V])} * ${Math.abs(T * w)}))`
                }
                ),
                k.forEach( (q, V) => {
                    let Q = d.rotate[V] * Math.abs(T * w);
                    k[V] = Q
                }
                ),
                p.style.zIndex = -Math.abs(Math.round(S)) + l.length;
                const N = P.join(", ")
                  , L = `rotateX(${y(k[0])}deg) rotateY(${y(k[1])}deg) rotateZ(${y(k[2])}deg)`
                  , O = C < 0 ? `scale(${1 + (1 - d.scale) * C * w})` : `scale(${1 - (1 - d.scale) * C * w})`
                  , X = C < 0 ? 1 + (1 - d.opacity) * C * w : 1 - (1 - d.opacity) * C * w
                  , I = `translate3d(${N}) ${L} ${O}`;
                if (R && d.shadow || !R) {
                    let q = p.querySelector(".swiper-slide-shadow");
                    if (!q && d.shadow && (q = fs("creative", p)),
                    q) {
                        const V = h.shadowPerProgress ? T * (1 / h.limitProgress) : T;
                        q.style.opacity = Math.min(Math.max(Math.abs(V), 0), 1)
                    }
                }
                const H = sa(h, p);
                H.style.transform = I,
                H.style.opacity = X,
                d.origin && (H.style.transformOrigin = d.origin)
            }
        }
        ,
        setTransition: l => {
            const c = e.slides.map(f => Nn(f));
            c.forEach(f => {
                f.style.transitionDuration = `${l}ms`,
                f.querySelectorAll(".swiper-slide-shadow").forEach(h => {
                    h.style.transitionDuration = `${l}ms`
                }
                )
            }
            ),
            ro({
                swiper: e,
                duration: l,
                transformElements: c,
                allSlides: !0
            })
        }
        ,
        perspective: () => e.params.creativeEffect.perspective,
        overwriteParams: () => ({
            watchSlidesProgress: !0,
            virtualTranslate: !e.params.cssMode
        })
    })
}
function ig(s) {
    let {swiper: e, extendParams: t, on: i} = s;
    t({
        cardsEffect: {
            slideShadows: !0,
            rotate: !0,
            perSlideRotate: 2,
            perSlideOffset: 8
        }
    }),
    ps({
        effect: "cards",
        swiper: e,
        on: i,
        setTranslate: () => {
            const {slides: o, activeIndex: l, rtlTranslate: c} = e
              , f = e.params.cardsEffect
              , {startTranslate: h, isTouched: w} = e.touchEventsData
              , _ = c ? -e.translate : e.translate;
            for (let y = 0; y < o.length; y += 1) {
                const g = o[y]
                  , p = g.progress
                  , S = Math.min(Math.max(p, -4), 4);
                let T = g.swiperSlideOffset;
                e.params.centeredSlides && !e.params.cssMode && (e.wrapperEl.style.transform = `translateX(${e.minTranslate()}px)`),
                e.params.centeredSlides && e.params.cssMode && (T -= o[0].swiperSlideOffset);
                let C = e.params.cssMode ? -T - e.translate : -T
                  , E = 0;
                const P = -100 * Math.abs(S);
                let k = 1
                  , R = -f.perSlideRotate * S
                  , d = f.perSlideOffset - Math.abs(S) * .75;
                const N = e.virtual && e.params.virtual.enabled ? e.virtual.from + y : y
                  , L = (N === l || N === l - 1) && S > 0 && S < 1 && (w || e.params.cssMode) && _ < h
                  , O = (N === l || N === l + 1) && S < 0 && S > -1 && (w || e.params.cssMode) && _ > h;
                if (L || O) {
                    const q = (1 - Math.abs((Math.abs(S) - .5) / .5)) ** .5;
                    R += -28 * S * q,
                    k += -.5 * q,
                    d += 96 * q,
                    E = `${-25 * q * Math.abs(S)}%`
                }
                if (S < 0 ? C = `calc(${C}px ${c ? "-" : "+"} (${d * Math.abs(S)}%))` : S > 0 ? C = `calc(${C}px ${c ? "-" : "+"} (-${d * Math.abs(S)}%))` : C = `${C}px`,
                !e.isHorizontal()) {
                    const q = E;
                    E = C,
                    C = q
                }
                const X = S < 0 ? `${1 + (1 - k) * S}` : `${1 - (1 - k) * S}`
                  , I = `
        translate3d(${C}, ${E}, ${P}px)
        rotateZ(${f.rotate ? c ? -R : R : 0}deg)
        scale(${X})
      `;
                if (f.slideShadows) {
                    let q = g.querySelector(".swiper-slide-shadow");
                    q || (q = fs("cards", g)),
                    q && (q.style.opacity = Math.min(Math.max((Math.abs(S) - .5) / .5, 0), 1))
                }
                g.style.zIndex = -Math.abs(Math.round(p)) + o.length;
                const H = sa(f, g);
                H.style.transform = I
            }
        }
        ,
        setTransition: o => {
            const l = e.slides.map(c => Nn(c));
            l.forEach(c => {
                c.style.transitionDuration = `${o}ms`,
                c.querySelectorAll(".swiper-slide-shadow").forEach(f => {
                    f.style.transitionDuration = `${o}ms`
                }
                )
            }
            ),
            ro({
                swiper: e,
                duration: o,
                transformElements: l
            })
        }
        ,
        perspective: () => !0,
        overwriteParams: () => ({
            _loopSwapReset: !1,
            watchSlidesProgress: !0,
            loopAdditionalSlides: e.params.cardsEffect.rotate ? 3 : 2,
            centeredSlides: !0,
            virtualTranslate: !e.params.cssMode
        })
    })
}
const rg = [Am, km, Lm, Om, Dm, Im, zm, Rm, Nm, $m, Hm, Fm, qm, Bm, jm, Xm, Km, Qm, Zm, Jm, eg, tg, ig];
bi.use(rg);
function ng(s, e) {
    for (var t = 0; t < e.length; t++) {
        var i = e[t];
        i.enumerable = i.enumerable || !1,
        i.configurable = !0,
        "value"in i && (i.writable = !0),
        Object.defineProperty(s, i.key, i)
    }
}
function sg(s, e, t) {
    return e && ng(s.prototype, e),
    s
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Kt, ka, Ni, Zr, Jr, is, wf, vn, Ns, _f, Dr, nr, bf, xf = function() {
    return Kt || typeof window < "u" && (Kt = window.gsap) && Kt.registerPlugin && Kt
}, Sf = 1, Zn = [], Le = [], _r = [], $s = Date.now, hl = function(e, t) {
    return t
}, ag = function() {
    var e = Ns.core
      , t = e.bridge || {}
      , i = e._scrollers
      , r = e._proxies;
    i.push.apply(i, Le),
    r.push.apply(r, _r),
    Le = i,
    _r = r,
    hl = function(o, l) {
        return t[o](l)
    }
}, rn = function(e, t) {
    return ~_r.indexOf(e) && _r[_r.indexOf(e) + 1][t]
}, Hs = function(e) {
    return !!~_f.indexOf(e)
}, ui = function(e, t, i, r, n) {
    return e.addEventListener(t, i, {
        passive: r !== !1,
        capture: !!n
    })
}, li = function(e, t, i, r) {
    return e.removeEventListener(t, i, !!r)
}, ha = "scrollLeft", ma = "scrollTop", ml = function() {
    return Dr && Dr.isPressed || Le.cache++
}, Ga = function(e, t) {
    var i = function r(n) {
        if (n || n === 0) {
            Sf && (Ni.history.scrollRestoration = "manual");
            var o = Dr && Dr.isPressed;
            n = r.v = Math.round(n) || (Dr && Dr.iOS ? 1 : 0),
            e(n),
            r.cacheID = Le.cache,
            o && hl("ss", n)
        } else
            (t || Le.cache !== r.cacheID || hl("ref")) && (r.cacheID = Le.cache,
            r.v = e());
        return r.v + r.offset
    };
    return i.offset = 0,
    e && i
}, hi = {
    s: ha,
    p: "left",
    p2: "Left",
    os: "right",
    os2: "Right",
    d: "width",
    d2: "Width",
    a: "x",
    sc: Ga(function(s) {
        return arguments.length ? Ni.scrollTo(s, Nt.sc()) : Ni.pageXOffset || Zr[ha] || Jr[ha] || is[ha] || 0
    })
}, Nt = {
    s: ma,
    p: "top",
    p2: "Top",
    os: "bottom",
    os2: "Bottom",
    d: "height",
    d2: "Height",
    a: "y",
    op: hi,
    sc: Ga(function(s) {
        return arguments.length ? Ni.scrollTo(hi.sc(), s) : Ni.pageYOffset || Zr[ma] || Jr[ma] || is[ma] || 0
    })
}, _i = function(e, t) {
    return (t && t._ctx && t._ctx.selector || Kt.utils.toArray)(e)[0] || (typeof e == "string" && Kt.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null)
}, og = function(e, t) {
    for (var i = t.length; i--; )
        if (t[i] === e || t[i].contains(e))
            return !0;
    return !1
}, an = function(e, t) {
    var i = t.s
      , r = t.sc;
    Hs(e) && (e = Zr.scrollingElement || Jr);
    var n = Le.indexOf(e)
      , o = r === Nt.sc ? 1 : 2;
    !~n && (n = Le.push(e) - 1),
    Le[n + o] || ui(e, "scroll", ml);
    var l = Le[n + o]
      , c = l || (Le[n + o] = Ga(rn(e, i), !0) || (Hs(e) ? r : Ga(function(f) {
        return arguments.length ? e[i] = f : e[i]
    })));
    return c.target = e,
    l || (c.smooth = Kt.getProperty(e, "scrollBehavior") === "smooth"),
    c
}, gl = function(e, t, i) {
    var r = e
      , n = e
      , o = $s()
      , l = o
      , c = t || 50
      , f = Math.max(500, c * 3)
      , h = function(g, p) {
        var S = $s();
        p || S - o > c ? (n = r,
        r = g,
        l = o,
        o = S) : i ? r += g : r = n + (g - n) / (S - l) * (o - l)
    }
      , w = function() {
        n = r = i ? 0 : r,
        l = o = 0
    }
      , _ = function(g) {
        var p = l
          , S = n
          , T = $s();
        return (g || g === 0) && g !== r && h(g),
        o === l || T - l > f ? 0 : (r + (i ? S : -S)) / ((i ? T : o) - p) * 1e3
    };
    return {
        update: h,
        reset: w,
        getVelocity: _
    }
}, xs = function(e, t) {
    return t && !e._gsapAllow && e.preventDefault(),
    e.changedTouches ? e.changedTouches[0] : e
}, Fu = function(e) {
    var t = Math.max.apply(Math, e)
      , i = Math.min.apply(Math, e);
    return Math.abs(t) >= Math.abs(i) ? t : i
}, Tf = function() {
    Ns = Kt.core.globals().ScrollTrigger,
    Ns && Ns.core && ag()
}, Ef = function(e) {
    return Kt = e || xf(),
    !ka && Kt && typeof document < "u" && document.body && (Ni = window,
    Zr = document,
    Jr = Zr.documentElement,
    is = Zr.body,
    _f = [Ni, Zr, Jr, is],
    Kt.utils.clamp,
    bf = Kt.core.context || function() {}
    ,
    vn = "onpointerenter"in is ? "pointer" : "mouse",
    wf = Et.isTouch = Ni.matchMedia && Ni.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart"in Ni || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0,
    nr = Et.eventTypes = ("ontouchstart"in Jr ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown"in Jr ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","),
    setTimeout(function() {
        return Sf = 0
    }, 500),
    Tf(),
    ka = 1),
    ka
};
hi.op = Nt;
Le.cache = 0;
var Et = function() {
    function s(t) {
        this.init(t)
    }
    var e = s.prototype;
    return e.init = function(i) {
        ka || Ef(Kt) || console.warn("Please gsap.registerPlugin(Observer)"),
        Ns || Tf();
        var r = i.tolerance
          , n = i.dragMinimum
          , o = i.type
          , l = i.target
          , c = i.lineHeight
          , f = i.debounce
          , h = i.preventDefault
          , w = i.onStop
          , _ = i.onStopDelay
          , y = i.ignore
          , g = i.wheelSpeed
          , p = i.event
          , S = i.onDragStart
          , T = i.onDragEnd
          , C = i.onDrag
          , E = i.onPress
          , P = i.onRelease
          , k = i.onRight
          , R = i.onLeft
          , d = i.onUp
          , N = i.onDown
          , L = i.onChangeX
          , O = i.onChangeY
          , X = i.onChange
          , I = i.onToggleX
          , H = i.onToggleY
          , q = i.onHover
          , V = i.onHoverEnd
          , Q = i.onMove
          , F = i.ignoreCheck
          , Y = i.isNormalizer
          , Z = i.onGestureStart
          , $ = i.onGestureEnd
          , he = i.onWheel
          , Oe = i.onEnable
          , nt = i.onDisable
          , je = i.onClick
          , re = i.scrollSpeed
          , ee = i.capture
          , ne = i.allowClicks
          , me = i.lockAxis
          , Ne = i.onLockAxis;
        this.target = l = _i(l) || Jr,
        this.vars = i,
        y && (y = Kt.utils.toArray(y)),
        r = r || 1e-9,
        n = n || 0,
        g = g || 1,
        re = re || 1,
        o = o || "wheel,touch,pointer",
        f = f !== !1,
        c || (c = parseFloat(Ni.getComputedStyle(is).lineHeight) || 22);
        var Je, st, Xe, be, Ee, et, mt, K = this, Ye = 0, $t = 0, ai = i.passive || !h && i.passive !== !1, Ke = an(l, hi), ct = an(l, Nt), Ht = Ke(), Yt = ct(), oe = ~o.indexOf("touch") && !~o.indexOf("pointer") && nr[0] === "pointerdown", tt = Hs(l), We = l.ownerDocument || Zr, Zt = [0, 0, 0], Ct = [0, 0, 0], ji = 0, $r = function() {
            return ji = $s()
        }, at = function(ge, Fe) {
            return (K.event = ge) && y && og(ge.target, y) || Fe && oe && ge.pointerType !== "touch" || F && F(ge, Fe)
        }, mi = function() {
            K._vx.reset(),
            K._vy.reset(),
            st.pause(),
            w && w(K)
        }, Wt = function() {
            var ge = K.deltaX = Fu(Zt)
              , Fe = K.deltaY = Fu(Ct)
              , le = Math.abs(ge) >= r
              , ye = Math.abs(Fe) >= r;
            X && (le || ye) && X(K, ge, Fe, Zt, Ct),
            le && (k && K.deltaX > 0 && k(K),
            R && K.deltaX < 0 && R(K),
            L && L(K),
            I && K.deltaX < 0 != Ye < 0 && I(K),
            Ye = K.deltaX,
            Zt[0] = Zt[1] = Zt[2] = 0),
            ye && (N && K.deltaY > 0 && N(K),
            d && K.deltaY < 0 && d(K),
            O && O(K),
            H && K.deltaY < 0 != $t < 0 && H(K),
            $t = K.deltaY,
            Ct[0] = Ct[1] = Ct[2] = 0),
            (be || Xe) && (Q && Q(K),
            Xe && (S && Xe === 1 && S(K),
            C && C(K),
            Xe = 0),
            be = !1),
            et && !(et = !1) && Ne && Ne(K),
            Ee && (he(K),
            Ee = !1),
            Je = 0
        }, Mi = function(ge, Fe, le) {
            Zt[le] += ge,
            Ct[le] += Fe,
            K._vx.update(ge),
            K._vy.update(Fe),
            f ? Je || (Je = requestAnimationFrame(Wt)) : Wt()
        }, Hr = function(ge, Fe) {
            me && !mt && (K.axis = mt = Math.abs(ge) > Math.abs(Fe) ? "x" : "y",
            et = !0),
            mt !== "y" && (Zt[2] += ge,
            K._vx.update(ge, !0)),
            mt !== "x" && (Ct[2] += Fe,
            K._vy.update(Fe, !0)),
            f ? Je || (Je = requestAnimationFrame(Wt)) : Wt()
        }, Pi = function(ge) {
            if (!at(ge, 1)) {
                ge = xs(ge, h);
                var Fe = ge.clientX
                  , le = ge.clientY
                  , ye = Fe - K.x
                  , pe = le - K.y
                  , we = K.isDragging;
                K.x = Fe,
                K.y = le,
                (we || (ye || pe) && (Math.abs(K.startX - Fe) >= n || Math.abs(K.startY - le) >= n)) && (Xe = we ? 2 : 1,
                we || (K.isDragging = !0),
                Hr(ye, pe))
            }
        }, sr = K.onPress = function(Te) {
            at(Te, 1) || Te && Te.button || (K.axis = mt = null,
            st.pause(),
            K.isPressed = !0,
            Te = xs(Te),
            Ye = $t = 0,
            K.startX = K.x = Te.clientX,
            K.startY = K.y = Te.clientY,
            K._vx.reset(),
            K._vy.reset(),
            ui(Y ? l : We, nr[1], Pi, ai, !0),
            K.deltaX = K.deltaY = 0,
            E && E(K))
        }
        , Me = K.onRelease = function(Te) {
            if (!at(Te, 1)) {
                li(Y ? l : We, nr[1], Pi, !0);
                var ge = !isNaN(K.y - K.startY)
                  , Fe = K.isDragging
                  , le = Fe && (Math.abs(K.x - K.startX) > 3 || Math.abs(K.y - K.startY) > 3)
                  , ye = xs(Te);
                !le && ge && (K._vx.reset(),
                K._vy.reset(),
                h && ne && Kt.delayedCall(.08, function() {
                    if ($s() - ji > 300 && !Te.defaultPrevented) {
                        if (Te.target.click)
                            Te.target.click();
                        else if (We.createEvent) {
                            var pe = We.createEvent("MouseEvents");
                            pe.initMouseEvent("click", !0, !0, Ni, 1, ye.screenX, ye.screenY, ye.clientX, ye.clientY, !1, !1, !1, !1, 0, null),
                            Te.target.dispatchEvent(pe)
                        }
                    }
                })),
                K.isDragging = K.isGesturing = K.isPressed = !1,
                w && Fe && !Y && st.restart(!0),
                Xe && Wt(),
                T && Fe && T(K),
                P && P(K, le)
            }
        }
        , xr = function(ge) {
            return ge.touches && ge.touches.length > 1 && (K.isGesturing = !0) && Z(ge, K.isDragging)
        }, Ft = function() {
            return (K.isGesturing = !1) || $(K)
        }, Gt = function(ge) {
            if (!at(ge)) {
                var Fe = Ke()
                  , le = ct();
                Mi((Fe - Ht) * re, (le - Yt) * re, 1),
                Ht = Fe,
                Yt = le,
                w && st.restart(!0)
            }
        }, gi = function(ge) {
            if (!at(ge)) {
                ge = xs(ge, h),
                he && (Ee = !0);
                var Fe = (ge.deltaMode === 1 ? c : ge.deltaMode === 2 ? Ni.innerHeight : 1) * g;
                Mi(ge.deltaX * Fe, ge.deltaY * Fe, 0),
                w && !Y && st.restart(!0)
            }
        }, ar = function(ge) {
            if (!at(ge)) {
                var Fe = ge.clientX
                  , le = ge.clientY
                  , ye = Fe - K.x
                  , pe = le - K.y;
                K.x = Fe,
                K.y = le,
                be = !0,
                w && st.restart(!0),
                (ye || pe) && Hr(ye, pe)
            }
        }, Lt = function(ge) {
            K.event = ge,
            q(K)
        }, ft = function(ge) {
            K.event = ge,
            V(K)
        }, Sr = function(ge) {
            return at(ge) || xs(ge, h) && je(K)
        };
        st = K._dc = Kt.delayedCall(_ || .25, mi).pause(),
        K.deltaX = K.deltaY = 0,
        K._vx = gl(0, 50, !0),
        K._vy = gl(0, 50, !0),
        K.scrollX = Ke,
        K.scrollY = ct,
        K.isDragging = K.isGesturing = K.isPressed = !1,
        bf(this),
        K.enable = function(Te) {
            return K.isEnabled || (ui(tt ? We : l, "scroll", ml),
            o.indexOf("scroll") >= 0 && ui(tt ? We : l, "scroll", Gt, ai, ee),
            o.indexOf("wheel") >= 0 && ui(l, "wheel", gi, ai, ee),
            (o.indexOf("touch") >= 0 && wf || o.indexOf("pointer") >= 0) && (ui(l, nr[0], sr, ai, ee),
            ui(We, nr[2], Me),
            ui(We, nr[3], Me),
            ne && ui(l, "click", $r, !0, !0),
            je && ui(l, "click", Sr),
            Z && ui(We, "gesturestart", xr),
            $ && ui(We, "gestureend", Ft),
            q && ui(l, vn + "enter", Lt),
            V && ui(l, vn + "leave", ft),
            Q && ui(l, vn + "move", ar)),
            K.isEnabled = !0,
            K.isDragging = K.isGesturing = K.isPressed = be = Xe = !1,
            K._vx.reset(),
            K._vy.reset(),
            Ht = Ke(),
            Yt = ct(),
            Te && Te.type && sr(Te),
            Oe && Oe(K)),
            K
        }
        ,
        K.disable = function() {
            K.isEnabled && (Zn.filter(function(Te) {
                return Te !== K && Hs(Te.target)
            }).length || li(tt ? We : l, "scroll", ml),
            K.isPressed && (K._vx.reset(),
            K._vy.reset(),
            li(Y ? l : We, nr[1], Pi, !0)),
            li(tt ? We : l, "scroll", Gt, ee),
            li(l, "wheel", gi, ee),
            li(l, nr[0], sr, ee),
            li(We, nr[2], Me),
            li(We, nr[3], Me),
            li(l, "click", $r, !0),
            li(l, "click", Sr),
            li(We, "gesturestart", xr),
            li(We, "gestureend", Ft),
            li(l, vn + "enter", Lt),
            li(l, vn + "leave", ft),
            li(l, vn + "move", ar),
            K.isEnabled = K.isPressed = K.isDragging = !1,
            nt && nt(K))
        }
        ,
        K.kill = K.revert = function() {
            K.disable();
            var Te = Zn.indexOf(K);
            Te >= 0 && Zn.splice(Te, 1),
            Dr === K && (Dr = 0)
        }
        ,
        Zn.push(K),
        Y && Hs(l) && (Dr = K),
        K.enable(p)
    }
    ,
    sg(s, [{
        key: "velocityX",
        get: function() {
            return this._vx.getVelocity()
        }
    }, {
        key: "velocityY",
        get: function() {
            return this._vy.getVelocity()
        }
    }]),
    s
}();
Et.version = "3.13.0";
Et.create = function(s) {
    return new Et(s)
}
;
Et.register = Ef;
Et.getAll = function() {
    return Zn.slice()
}
;
Et.getById = function(s) {
    return Zn.filter(function(e) {
        return e.vars.id === s
    })[0]
}
;
xf() && Kt.registerPlugin(Et);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var fe, Gn, ke, ut, zi, Ue, Yl, Va, ia, Fs, Ps, ga, ti, no, vl, fi, qu, Bu, Vn, Cf, $o, Mf, ci, yl, Pf, Af, Xr, wl, Wl, rs, Gl, Ua, _l, Ho, va = 1, ii = Date.now, Fo = ii(), er = 0, As = 0, ju = function(e, t, i) {
    var r = Oi(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
    return i["_" + t + "Clamp"] = r,
    r ? e.substr(6, e.length - 7) : e
}, Xu = function(e, t) {
    return t && (!Oi(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e
}, lg = function s() {
    return As && requestAnimationFrame(s)
}, Yu = function() {
    return no = 1
}, Wu = function() {
    return no = 0
}, hr = function(e) {
    return e
}, ks = function(e) {
    return Math.round(e * 1e5) / 1e5 || 0
}, kf = function() {
    return typeof window < "u"
}, Lf = function() {
    return fe || kf() && (fe = window.gsap) && fe.registerPlugin && fe
}, Dn = function(e) {
    return !!~Yl.indexOf(e)
}, Of = function(e) {
    return (e === "Height" ? Gl : ke["inner" + e]) || zi["client" + e] || Ue["client" + e]
}, Df = function(e) {
    return rn(e, "getBoundingClientRect") || (Dn(e) ? function() {
        return za.width = ke.innerWidth,
        za.height = Gl,
        za
    }
    : function() {
        return Or(e)
    }
    )
}, ug = function(e, t, i) {
    var r = i.d
      , n = i.d2
      , o = i.a;
    return (o = rn(e, "getBoundingClientRect")) ? function() {
        return o()[r]
    }
    : function() {
        return (t ? Of(n) : e["client" + n]) || 0
    }
}, cg = function(e, t) {
    return !t || ~_r.indexOf(e) ? Df(e) : function() {
        return za
    }
}, yr = function(e, t) {
    var i = t.s
      , r = t.d2
      , n = t.d
      , o = t.a;
    return Math.max(0, (i = "scroll" + r) && (o = rn(e, i)) ? o() - Df(e)()[n] : Dn(e) ? (zi[i] || Ue[i]) - Of(r) : e[i] - e["offset" + r])
}, ya = function(e, t) {
    for (var i = 0; i < Vn.length; i += 3)
        (!t || ~t.indexOf(Vn[i + 1])) && e(Vn[i], Vn[i + 1], Vn[i + 2])
}, Oi = function(e) {
    return typeof e == "string"
}, ni = function(e) {
    return typeof e == "function"
}, Ls = function(e) {
    return typeof e == "number"
}, yn = function(e) {
    return typeof e == "object"
}, Ss = function(e, t, i) {
    return e && e.progress(t ? 0 : 1) && i && e.pause()
}, qo = function(e, t) {
    if (e.enabled) {
        var i = e._ctx ? e._ctx.add(function() {
            return t(e)
        }) : t(e);
        i && i.totalTime && (e.callbackAnimation = i)
    }
}, Xn = Math.abs, If = "left", zf = "top", Vl = "right", Ul = "bottom", Pn = "width", An = "height", qs = "Right", Bs = "Left", js = "Top", Xs = "Bottom", Pt = "padding", Vi = "margin", ds = "Width", Kl = "Height", Rt = "px", Ui = function(e) {
    return ke.getComputedStyle(e)
}, fg = function(e) {
    var t = Ui(e).position;
    e.style.position = t === "absolute" || t === "fixed" ? t : "relative"
}, Gu = function(e, t) {
    for (var i in t)
        i in e || (e[i] = t[i]);
    return e
}, Or = function(e, t) {
    var i = t && Ui(e)[vl] !== "matrix(1, 0, 0, 1, 0, 0)" && fe.to(e, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0
    }).progress(1)
      , r = e.getBoundingClientRect();
    return i && i.progress(0).kill(),
    r
}, Ka = function(e, t) {
    var i = t.d2;
    return e["offset" + i] || e["client" + i] || 0
}, Rf = function(e) {
    var t = [], i = e.labels, r = e.duration(), n;
    for (n in i)
        t.push(i[n] / r);
    return t
}, dg = function(e) {
    return function(t) {
        return fe.utils.snap(Rf(e), t)
    }
}, Ql = function(e) {
    var t = fe.utils.snap(e)
      , i = Array.isArray(e) && e.slice(0).sort(function(r, n) {
        return r - n
    });
    return i ? function(r, n, o) {
        o === void 0 && (o = .001);
        var l;
        if (!n)
            return t(r);
        if (n > 0) {
            for (r -= o,
            l = 0; l < i.length; l++)
                if (i[l] >= r)
                    return i[l];
            return i[l - 1]
        } else
            for (l = i.length,
            r += o; l--; )
                if (i[l] <= r)
                    return i[l];
        return i[0]
    }
    : function(r, n, o) {
        o === void 0 && (o = .001);
        var l = t(r);
        return !n || Math.abs(l - r) < o || l - r < 0 == n < 0 ? l : t(n < 0 ? r - e : r + e)
    }
}, pg = function(e) {
    return function(t, i) {
        return Ql(Rf(e))(t, i.direction)
    }
}, wa = function(e, t, i, r) {
    return i.split(",").forEach(function(n) {
        return e(t, n, r)
    })
}, Bt = function(e, t, i, r, n) {
    return e.addEventListener(t, i, {
        passive: !r,
        capture: !!n
    })
}, qt = function(e, t, i, r) {
    return e.removeEventListener(t, i, !!r)
}, _a = function(e, t, i) {
    i = i && i.wheelHandler,
    i && (e(t, "wheel", i),
    e(t, "touchmove", i))
}, Vu = {
    startColor: "green",
    endColor: "red",
    indent: 0,
    fontSize: "16px",
    fontWeight: "normal"
}, ba = {
    toggleActions: "play",
    anticipatePin: 0
}, Qa = {
    top: 0,
    left: 0,
    center: .5,
    bottom: 1,
    right: 1
}, La = function(e, t) {
    if (Oi(e)) {
        var i = e.indexOf("=")
          , r = ~i ? +(e.charAt(i - 1) + 1) * parseFloat(e.substr(i + 1)) : 0;
        ~i && (e.indexOf("%") > i && (r *= t / 100),
        e = e.substr(0, i - 1)),
        e = r + (e in Qa ? Qa[e] * t : ~e.indexOf("%") ? parseFloat(e) * t / 100 : parseFloat(e) || 0)
    }
    return e
}, xa = function(e, t, i, r, n, o, l, c) {
    var f = n.startColor
      , h = n.endColor
      , w = n.fontSize
      , _ = n.indent
      , y = n.fontWeight
      , g = ut.createElement("div")
      , p = Dn(i) || rn(i, "pinType") === "fixed"
      , S = e.indexOf("scroller") !== -1
      , T = p ? Ue : i
      , C = e.indexOf("start") !== -1
      , E = C ? f : h
      , P = "border-color:" + E + ";font-size:" + w + ";color:" + E + ";font-weight:" + y + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    return P += "position:" + ((S || c) && p ? "fixed;" : "absolute;"),
    (S || c || !p) && (P += (r === Nt ? Vl : Ul) + ":" + (o + parseFloat(_)) + "px;"),
    l && (P += "box-sizing:border-box;text-align:left;width:" + l.offsetWidth + "px;"),
    g._isStart = C,
    g.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")),
    g.style.cssText = P,
    g.innerText = t || t === 0 ? e + "-" + t : e,
    T.children[0] ? T.insertBefore(g, T.children[0]) : T.appendChild(g),
    g._offset = g["offset" + r.op.d2],
    Oa(g, 0, r, C),
    g
}, Oa = function(e, t, i, r) {
    var n = {
        display: "block"
    }
      , o = i[r ? "os2" : "p2"]
      , l = i[r ? "p2" : "os2"];
    e._isFlipped = r,
    n[i.a + "Percent"] = r ? -100 : 0,
    n[i.a] = r ? "1px" : 0,
    n["border" + o + ds] = 1,
    n["border" + l + ds] = 0,
    n[i.p] = t + "px",
    fe.set(e, n)
}, Ae = [], bl = {}, ra, Uu = function() {
    return ii() - er > 34 && (ra || (ra = requestAnimationFrame(Ir)))
}, Yn = function() {
    (!ci || !ci.isPressed || ci.startX > Ue.clientWidth) && (Le.cache++,
    ci ? ra || (ra = requestAnimationFrame(Ir)) : Ir(),
    er || zn("scrollStart"),
    er = ii())
}, Bo = function() {
    Af = ke.innerWidth,
    Pf = ke.innerHeight
}, Os = function(e) {
    Le.cache++,
    (e === !0 || !ti && !Mf && !ut.fullscreenElement && !ut.webkitFullscreenElement && (!yl || Af !== ke.innerWidth || Math.abs(ke.innerHeight - Pf) > ke.innerHeight * .25)) && Va.restart(!0)
}, In = {}, hg = [], Nf = function s() {
    return qt(Ce, "scrollEnd", s) || xn(!0)
}, zn = function(e) {
    return In[e] && In[e].map(function(t) {
        return t()
    }) || hg
}, Li = [], $f = function(e) {
    for (var t = 0; t < Li.length; t += 5)
        (!e || Li[t + 4] && Li[t + 4].query === e) && (Li[t].style.cssText = Li[t + 1],
        Li[t].getBBox && Li[t].setAttribute("transform", Li[t + 2] || ""),
        Li[t + 3].uncache = 1)
}, Zl = function(e, t) {
    var i;
    for (fi = 0; fi < Ae.length; fi++)
        i = Ae[fi],
        i && (!t || i._ctx === t) && (e ? i.kill(1) : i.revert(!0, !0));
    Ua = !0,
    t && $f(t),
    t || zn("revert")
}, Hf = function(e, t) {
    Le.cache++,
    (t || !di) && Le.forEach(function(i) {
        return ni(i) && i.cacheID++ && (i.rec = 0)
    }),
    Oi(e) && (ke.history.scrollRestoration = Wl = e)
}, di, kn = 0, Ku, mg = function() {
    if (Ku !== kn) {
        var e = Ku = kn;
        requestAnimationFrame(function() {
            return e === kn && xn(!0)
        })
    }
}, Ff = function() {
    Ue.appendChild(rs),
    Gl = !ci && rs.offsetHeight || ke.innerHeight,
    Ue.removeChild(rs)
}, Qu = function(e) {
    return ia(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t) {
        return t.style.display = e ? "none" : "block"
    })
}, xn = function(e, t) {
    if (zi = ut.documentElement,
    Ue = ut.body,
    Yl = [ke, ut, zi, Ue],
    er && !e && !Ua) {
        Bt(Ce, "scrollEnd", Nf);
        return
    }
    Ff(),
    di = Ce.isRefreshing = !0,
    Le.forEach(function(r) {
        return ni(r) && ++r.cacheID && (r.rec = r())
    });
    var i = zn("refreshInit");
    Cf && Ce.sort(),
    t || Zl(),
    Le.forEach(function(r) {
        ni(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"),
        r(0))
    }),
    Ae.slice(0).forEach(function(r) {
        return r.refresh()
    }),
    Ua = !1,
    Ae.forEach(function(r) {
        if (r._subPinOffset && r.pin) {
            var n = r.vars.horizontal ? "offsetWidth" : "offsetHeight"
              , o = r.pin[n];
            r.revert(!0, 1),
            r.adjustPinSpacing(r.pin[n] - o),
            r.refresh()
        }
    }),
    _l = 1,
    Qu(!0),
    Ae.forEach(function(r) {
        var n = yr(r.scroller, r._dir)
          , o = r.vars.end === "max" || r._endClamp && r.end > n
          , l = r._startClamp && r.start >= n;
        (o || l) && r.setPositions(l ? n - 1 : r.start, o ? Math.max(l ? n : r.start + 1, n) : r.end, !0)
    }),
    Qu(!1),
    _l = 0,
    i.forEach(function(r) {
        return r && r.render && r.render(-1)
    }),
    Le.forEach(function(r) {
        ni(r) && (r.smooth && requestAnimationFrame(function() {
            return r.target.style.scrollBehavior = "smooth"
        }),
        r.rec && r(r.rec))
    }),
    Hf(Wl, 1),
    Va.pause(),
    kn++,
    di = 2,
    Ir(2),
    Ae.forEach(function(r) {
        return ni(r.vars.onRefresh) && r.vars.onRefresh(r)
    }),
    di = Ce.isRefreshing = !1,
    zn("refresh")
}, xl = 0, Da = 1, Ys, Ir = function(e) {
    if (e === 2 || !di && !Ua) {
        Ce.isUpdating = !0,
        Ys && Ys.update(0);
        var t = Ae.length
          , i = ii()
          , r = i - Fo >= 50
          , n = t && Ae[0].scroll();
        if (Da = xl > n ? -1 : 1,
        di || (xl = n),
        r && (er && !no && i - er > 200 && (er = 0,
        zn("scrollEnd")),
        Ps = Fo,
        Fo = i),
        Da < 0) {
            for (fi = t; fi-- > 0; )
                Ae[fi] && Ae[fi].update(0, r);
            Da = 1
        } else
            for (fi = 0; fi < t; fi++)
                Ae[fi] && Ae[fi].update(0, r);
        Ce.isUpdating = !1
    }
    ra = 0
}, Sl = [If, zf, Ul, Vl, Vi + Xs, Vi + qs, Vi + js, Vi + Bs, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Ia = Sl.concat([Pn, An, "boxSizing", "max" + ds, "max" + Kl, "position", Vi, Pt, Pt + js, Pt + qs, Pt + Xs, Pt + Bs]), gg = function(e, t, i) {
    ns(i);
    var r = e._gsap;
    if (r.spacerIsNative)
        ns(r.spacerState);
    else if (e._gsap.swappedIn) {
        var n = t.parentNode;
        n && (n.insertBefore(e, t),
        n.removeChild(t))
    }
    e._gsap.swappedIn = !1
}, jo = function(e, t, i, r) {
    if (!e._gsap.swappedIn) {
        for (var n = Sl.length, o = t.style, l = e.style, c; n--; )
            c = Sl[n],
            o[c] = i[c];
        o.position = i.position === "absolute" ? "absolute" : "relative",
        i.display === "inline" && (o.display = "inline-block"),
        l[Ul] = l[Vl] = "auto",
        o.flexBasis = i.flexBasis || "auto",
        o.overflow = "visible",
        o.boxSizing = "border-box",
        o[Pn] = Ka(e, hi) + Rt,
        o[An] = Ka(e, Nt) + Rt,
        o[Pt] = l[Vi] = l[zf] = l[If] = "0",
        ns(r),
        l[Pn] = l["max" + ds] = i[Pn],
        l[An] = l["max" + Kl] = i[An],
        l[Pt] = i[Pt],
        e.parentNode !== t && (e.parentNode.insertBefore(t, e),
        t.appendChild(e)),
        e._gsap.swappedIn = !0
    }
}, vg = /([A-Z])/g, ns = function(e) {
    if (e) {
        var t = e.t.style, i = e.length, r = 0, n, o;
        for ((e.t._gsap || fe.core.getCache(e.t)).uncache = 1; r < i; r += 2)
            o = e[r + 1],
            n = e[r],
            o ? t[n] = o : t[n] && t.removeProperty(n.replace(vg, "-$1").toLowerCase())
    }
}, Sa = function(e) {
    for (var t = Ia.length, i = e.style, r = [], n = 0; n < t; n++)
        r.push(Ia[n], i[Ia[n]]);
    return r.t = e,
    r
}, yg = function(e, t, i) {
    for (var r = [], n = e.length, o = i ? 8 : 0, l; o < n; o += 2)
        l = e[o],
        r.push(l, l in t ? t[l] : e[o + 1]);
    return r.t = e.t,
    r
}, za = {
    left: 0,
    top: 0
}, Zu = function(e, t, i, r, n, o, l, c, f, h, w, _, y, g) {
    ni(e) && (e = e(c)),
    Oi(e) && e.substr(0, 3) === "max" && (e = _ + (e.charAt(4) === "=" ? La("0" + e.substr(3), i) : 0));
    var p = y ? y.time() : 0, S, T, C;
    if (y && y.seek(0),
    isNaN(e) || (e = +e),
    Ls(e))
        y && (e = fe.utils.mapRange(y.scrollTrigger.start, y.scrollTrigger.end, 0, _, e)),
        l && Oa(l, i, r, !0);
    else {
        ni(t) && (t = t(c));
        var E = (e || "0").split(" "), P, k, R, d;
        C = _i(t, c) || Ue,
        P = Or(C) || {},
        (!P || !P.left && !P.top) && Ui(C).display === "none" && (d = C.style.display,
        C.style.display = "block",
        P = Or(C),
        d ? C.style.display = d : C.style.removeProperty("display")),
        k = La(E[0], P[r.d]),
        R = La(E[1] || "0", i),
        e = P[r.p] - f[r.p] - h + k + n - R,
        l && Oa(l, R, r, i - R < 20 || l._isStart && R > 20),
        i -= i - R
    }
    if (g && (c[g] = e || -.001,
    e < 0 && (e = 0)),
    o) {
        var N = e + i
          , L = o._isStart;
        S = "scroll" + r.d2,
        Oa(o, N, r, L && N > 20 || !L && (w ? Math.max(Ue[S], zi[S]) : o.parentNode[S]) <= N + 1),
        w && (f = Or(l),
        w && (o.style[r.op.p] = f[r.op.p] - r.op.m - o._offset + Rt))
    }
    return y && C && (S = Or(C),
    y.seek(_),
    T = Or(C),
    y._caScrollDist = S[r.p] - T[r.p],
    e = e / y._caScrollDist * _),
    y && y.seek(p),
    y ? e : Math.round(e)
}, wg = /(webkit|moz|length|cssText|inset)/i, Ju = function(e, t, i, r) {
    if (e.parentNode !== t) {
        var n = e.style, o, l;
        if (t === Ue) {
            e._stOrig = n.cssText,
            l = Ui(e);
            for (o in l)
                !+o && !wg.test(o) && l[o] && typeof n[o] == "string" && o !== "0" && (n[o] = l[o]);
            n.top = i,
            n.left = r
        } else
            n.cssText = e._stOrig;
        fe.core.getCache(e).uncache = 1,
        t.appendChild(e)
    }
}, qf = function(e, t, i) {
    var r = t
      , n = r;
    return function(o) {
        var l = Math.round(e());
        return l !== r && l !== n && Math.abs(l - r) > 3 && Math.abs(l - n) > 3 && (o = l,
        i && i()),
        n = r,
        r = Math.round(o),
        r
    }
}, Ta = function(e, t, i) {
    var r = {};
    r[t.p] = "+=" + i,
    fe.set(e, r)
}, ec = function(e, t) {
    var i = an(e, t)
      , r = "_scroll" + t.p2
      , n = function o(l, c, f, h, w) {
        var _ = o.tween
          , y = c.onComplete
          , g = {};
        f = f || i();
        var p = qf(i, f, function() {
            _.kill(),
            o.tween = 0
        });
        return w = h && w || 0,
        h = h || l - f,
        _ && _.kill(),
        c[r] = l,
        c.inherit = !1,
        c.modifiers = g,
        g[r] = function() {
            return p(f + h * _.ratio + w * _.ratio * _.ratio)
        }
        ,
        c.onUpdate = function() {
            Le.cache++,
            o.tween && Ir()
        }
        ,
        c.onComplete = function() {
            o.tween = 0,
            y && y.call(_)
        }
        ,
        _ = o.tween = fe.to(e, c),
        _
    };
    return e[r] = i,
    i.wheelHandler = function() {
        return n.tween && n.tween.kill() && (n.tween = 0)
    }
    ,
    Bt(e, "wheel", i.wheelHandler),
    Ce.isTouch && Bt(e, "touchmove", i.wheelHandler),
    n
}, Ce = function() {
    function s(t, i) {
        Gn || s.register(fe) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
        wl(this),
        this.init(t, i)
    }
    var e = s.prototype;
    return e.init = function(i, r) {
        if (this.progress = this.start = 0,
        this.vars && this.kill(!0, !0),
        !As) {
            this.update = this.refresh = this.kill = hr;
            return
        }
        i = Gu(Oi(i) || Ls(i) || i.nodeType ? {
            trigger: i
        } : i, ba);
        var n = i, o = n.onUpdate, l = n.toggleClass, c = n.id, f = n.onToggle, h = n.onRefresh, w = n.scrub, _ = n.trigger, y = n.pin, g = n.pinSpacing, p = n.invalidateOnRefresh, S = n.anticipatePin, T = n.onScrubComplete, C = n.onSnapComplete, E = n.once, P = n.snap, k = n.pinReparent, R = n.pinSpacer, d = n.containerAnimation, N = n.fastScrollEnd, L = n.preventOverlaps, O = i.horizontal || i.containerAnimation && i.horizontal !== !1 ? hi : Nt, X = !w && w !== 0, I = _i(i.scroller || ke), H = fe.core.getCache(I), q = Dn(I), V = ("pinType"in i ? i.pinType : rn(I, "pinType") || q && "fixed") === "fixed", Q = [i.onEnter, i.onLeave, i.onEnterBack, i.onLeaveBack], F = X && i.toggleActions.split(" "), Y = "markers"in i ? i.markers : ba.markers, Z = q ? 0 : parseFloat(Ui(I)["border" + O.p2 + ds]) || 0, $ = this, he = i.onRefreshInit && function() {
            return i.onRefreshInit($)
        }
        , Oe = ug(I, q, O), nt = cg(I, q), je = 0, re = 0, ee = 0, ne = an(I, O), me, Ne, Je, st, Xe, be, Ee, et, mt, K, Ye, $t, ai, Ke, ct, Ht, Yt, oe, tt, We, Zt, Ct, ji, $r, at, mi, Wt, Mi, Hr, Pi, sr, Me, xr, Ft, Gt, gi, ar, Lt, ft;
        if ($._startClamp = $._endClamp = !1,
        $._dir = O,
        S *= 45,
        $.scroller = I,
        $.scroll = d ? d.time.bind(d) : ne,
        st = ne(),
        $.vars = i,
        r = r || i.animation,
        "refreshPriority"in i && (Cf = 1,
        i.refreshPriority === -9999 && (Ys = $)),
        H.tweenScroll = H.tweenScroll || {
            top: ec(I, Nt),
            left: ec(I, hi)
        },
        $.tweenTo = me = H.tweenScroll[O.p],
        $.scrubDuration = function(le) {
            xr = Ls(le) && le,
            xr ? Me ? Me.duration(le) : Me = fe.to(r, {
                ease: "expo",
                totalProgress: "+=0",
                inherit: !1,
                duration: xr,
                paused: !0,
                onComplete: function() {
                    return T && T($)
                }
            }) : (Me && Me.progress(1).kill(),
            Me = 0)
        }
        ,
        r && (r.vars.lazy = !1,
        r._initted && !$.isReverted || r.vars.immediateRender !== !1 && i.immediateRender !== !1 && r.duration() && r.render(0, !0, !0),
        $.animation = r.pause(),
        r.scrollTrigger = $,
        $.scrubDuration(w),
        Pi = 0,
        c || (c = r.vars.id)),
        P && ((!yn(P) || P.push) && (P = {
            snapTo: P
        }),
        "scrollBehavior"in Ue.style && fe.set(q ? [Ue, zi] : I, {
            scrollBehavior: "auto"
        }),
        Le.forEach(function(le) {
            return ni(le) && le.target === (q ? ut.scrollingElement || zi : I) && (le.smooth = !1)
        }),
        Je = ni(P.snapTo) ? P.snapTo : P.snapTo === "labels" ? dg(r) : P.snapTo === "labelsDirectional" ? pg(r) : P.directional !== !1 ? function(le, ye) {
            return Ql(P.snapTo)(le, ii() - re < 500 ? 0 : ye.direction)
        }
        : fe.utils.snap(P.snapTo),
        Ft = P.duration || {
            min: .1,
            max: 2
        },
        Ft = yn(Ft) ? Fs(Ft.min, Ft.max) : Fs(Ft, Ft),
        Gt = fe.delayedCall(P.delay || xr / 2 || .1, function() {
            var le = ne()
              , ye = ii() - re < 500
              , pe = me.tween;
            if ((ye || Math.abs($.getVelocity()) < 10) && !pe && !no && je !== le) {
                var we = (le - be) / Ke, Mt = r && !X ? r.totalProgress() : we, De = ye ? 0 : (Mt - sr) / (ii() - Ps) * 1e3 || 0, gt = fe.utils.clamp(-we, 1 - we, Xn(De / 2) * De / .185), Ot = we + (P.inertia === !1 ? 0 : gt), dt, ot, Ge = P, Ai = Ge.onStart, Ve = Ge.onInterrupt, Jt = Ge.onComplete;
                if (dt = Je(Ot, $),
                Ls(dt) || (dt = Ot),
                ot = Math.max(0, Math.round(be + dt * Ke)),
                le <= Ee && le >= be && ot !== le) {
                    if (pe && !pe._initted && pe.data <= Xn(ot - le))
                        return;
                    P.inertia === !1 && (gt = dt - we),
                    me(ot, {
                        duration: Ft(Xn(Math.max(Xn(Ot - Mt), Xn(dt - Mt)) * .185 / De / .05 || 0)),
                        ease: P.ease || "power3",
                        data: Xn(ot - le),
                        onInterrupt: function() {
                            return Gt.restart(!0) && Ve && Ve($)
                        },
                        onComplete: function() {
                            $.update(),
                            je = ne(),
                            r && !X && (Me ? Me.resetTo("totalProgress", dt, r._tTime / r._tDur) : r.progress(dt)),
                            Pi = sr = r && !X ? r.totalProgress() : $.progress,
                            C && C($),
                            Jt && Jt($)
                        }
                    }, le, gt * Ke, ot - le - gt * Ke),
                    Ai && Ai($, me.tween)
                }
            } else
                $.isActive && je !== le && Gt.restart(!0)
        }).pause()),
        c && (bl[c] = $),
        _ = $.trigger = _i(_ || y !== !0 && y),
        ft = _ && _._gsap && _._gsap.stRevert,
        ft && (ft = ft($)),
        y = y === !0 ? _ : _i(y),
        Oi(l) && (l = {
            targets: _,
            className: l
        }),
        y && (g === !1 || g === Vi || (g = !g && y.parentNode && y.parentNode.style && Ui(y.parentNode).display === "flex" ? !1 : Pt),
        $.pin = y,
        Ne = fe.core.getCache(y),
        Ne.spacer ? ct = Ne.pinState : (R && (R = _i(R),
        R && !R.nodeType && (R = R.current || R.nativeElement),
        Ne.spacerIsNative = !!R,
        R && (Ne.spacerState = Sa(R))),
        Ne.spacer = oe = R || ut.createElement("div"),
        oe.classList.add("pin-spacer"),
        c && oe.classList.add("pin-spacer-" + c),
        Ne.pinState = ct = Sa(y)),
        i.force3D !== !1 && fe.set(y, {
            force3D: !0
        }),
        $.spacer = oe = Ne.spacer,
        Hr = Ui(y),
        $r = Hr[g + O.os2],
        We = fe.getProperty(y),
        Zt = fe.quickSetter(y, O.a, Rt),
        jo(y, oe, Hr),
        Yt = Sa(y)),
        Y) {
            $t = yn(Y) ? Gu(Y, Vu) : Vu,
            K = xa("scroller-start", c, I, O, $t, 0),
            Ye = xa("scroller-end", c, I, O, $t, 0, K),
            tt = K["offset" + O.op.d2];
            var Sr = _i(rn(I, "content") || I);
            et = this.markerStart = xa("start", c, Sr, O, $t, tt, 0, d),
            mt = this.markerEnd = xa("end", c, Sr, O, $t, tt, 0, d),
            d && (Lt = fe.quickSetter([et, mt], O.a, Rt)),
            !V && !(_r.length && rn(I, "fixedMarkers") === !0) && (fg(q ? Ue : I),
            fe.set([K, Ye], {
                force3D: !0
            }),
            mi = fe.quickSetter(K, O.a, Rt),
            Mi = fe.quickSetter(Ye, O.a, Rt))
        }
        if (d) {
            var Te = d.vars.onUpdate
              , ge = d.vars.onUpdateParams;
            d.eventCallback("onUpdate", function() {
                $.update(0, 0, 1),
                Te && Te.apply(d, ge || [])
            })
        }
        if ($.previous = function() {
            return Ae[Ae.indexOf($) - 1]
        }
        ,
        $.next = function() {
            return Ae[Ae.indexOf($) + 1]
        }
        ,
        $.revert = function(le, ye) {
            if (!ye)
                return $.kill(!0);
            var pe = le !== !1 || !$.enabled
              , we = ti;
            pe !== $.isReverted && (pe && (gi = Math.max(ne(), $.scroll.rec || 0),
            ee = $.progress,
            ar = r && r.progress()),
            et && [et, mt, K, Ye].forEach(function(Mt) {
                return Mt.style.display = pe ? "none" : "block"
            }),
            pe && (ti = $,
            $.update(pe)),
            y && (!k || !$.isActive) && (pe ? gg(y, oe, ct) : jo(y, oe, Ui(y), at)),
            pe || $.update(pe),
            ti = we,
            $.isReverted = pe)
        }
        ,
        $.refresh = function(le, ye, pe, we) {
            if (!((ti || !$.enabled) && !ye)) {
                if (y && le && er) {
                    Bt(s, "scrollEnd", Nf);
                    return
                }
                !di && he && he($),
                ti = $,
                me.tween && !pe && (me.tween.kill(),
                me.tween = 0),
                Me && Me.pause(),
                p && r && (r.revert({
                    kill: !1
                }).invalidate(),
                r.getChildren && r.getChildren(!0, !0, !1).forEach(function(tr) {
                    return tr.vars.immediateRender && tr.render(0, !0, !0)
                })),
                $.isReverted || $.revert(!0, !0),
                $._subPinOffset = !1;
                var Mt = Oe(), De = nt(), gt = d ? d.duration() : yr(I, O), Ot = Ke <= .01 || !Ke, dt = 0, ot = we || 0, Ge = yn(pe) ? pe.end : i.end, Ai = i.endTrigger || _, Ve = yn(pe) ? pe.start : i.start || (i.start === 0 || !_ ? 0 : y ? "0 0" : "0 100%"), Jt = $.pinnedContainer = i.pinnedContainer && _i(i.pinnedContainer, $), vi = _ && Math.max(0, Ae.indexOf($)) || 0, St = vi, wt, Dt, Tr, or, It, _t, ki, $n, aa, Er, Xi, ln, un;
                for (Y && yn(pe) && (ln = fe.getProperty(K, O.p),
                un = fe.getProperty(Ye, O.p)); St-- > 0; )
                    _t = Ae[St],
                    _t.end || _t.refresh(0, 1) || (ti = $),
                    ki = _t.pin,
                    ki && (ki === _ || ki === y || ki === Jt) && !_t.isReverted && (Er || (Er = []),
                    Er.unshift(_t),
                    _t.revert(!0, !0)),
                    _t !== Ae[St] && (vi--,
                    St--);
                for (ni(Ve) && (Ve = Ve($)),
                Ve = ju(Ve, "start", $),
                be = Zu(Ve, _, Mt, O, ne(), et, K, $, De, Z, V, gt, d, $._startClamp && "_startClamp") || (y ? -.001 : 0),
                ni(Ge) && (Ge = Ge($)),
                Oi(Ge) && !Ge.indexOf("+=") && (~Ge.indexOf(" ") ? Ge = (Oi(Ve) ? Ve.split(" ")[0] : "") + Ge : (dt = La(Ge.substr(2), Mt),
                Ge = Oi(Ve) ? Ve : (d ? fe.utils.mapRange(0, d.duration(), d.scrollTrigger.start, d.scrollTrigger.end, be) : be) + dt,
                Ai = _)),
                Ge = ju(Ge, "end", $),
                Ee = Math.max(be, Zu(Ge || (Ai ? "100% 0" : gt), Ai, Mt, O, ne() + dt, mt, Ye, $, De, Z, V, gt, d, $._endClamp && "_endClamp")) || -.001,
                dt = 0,
                St = vi; St--; )
                    _t = Ae[St],
                    ki = _t.pin,
                    ki && _t.start - _t._pinPush <= be && !d && _t.end > 0 && (wt = _t.end - ($._startClamp ? Math.max(0, _t.start) : _t.start),
                    (ki === _ && _t.start - _t._pinPush < be || ki === Jt) && isNaN(Ve) && (dt += wt * (1 - _t.progress)),
                    ki === y && (ot += wt));
                if (be += dt,
                Ee += dt,
                $._startClamp && ($._startClamp += dt),
                $._endClamp && !di && ($._endClamp = Ee || -.001,
                Ee = Math.min(Ee, yr(I, O))),
                Ke = Ee - be || (be -= .01) && .001,
                Ot && (ee = fe.utils.clamp(0, 1, fe.utils.normalize(be, Ee, gi))),
                $._pinPush = ot,
                et && dt && (wt = {},
                wt[O.a] = "+=" + dt,
                Jt && (wt[O.p] = "-=" + ne()),
                fe.set([et, mt], wt)),
                y && !(_l && $.end >= yr(I, O)))
                    wt = Ui(y),
                    or = O === Nt,
                    Tr = ne(),
                    Ct = parseFloat(We(O.a)) + ot,
                    !gt && Ee > 1 && (Xi = (q ? ut.scrollingElement || zi : I).style,
                    Xi = {
                        style: Xi,
                        value: Xi["overflow" + O.a.toUpperCase()]
                    },
                    q && Ui(Ue)["overflow" + O.a.toUpperCase()] !== "scroll" && (Xi.style["overflow" + O.a.toUpperCase()] = "scroll")),
                    jo(y, oe, wt),
                    Yt = Sa(y),
                    Dt = Or(y, !0),
                    $n = V && an(I, or ? hi : Nt)(),
                    g ? (at = [g + O.os2, Ke + ot + Rt],
                    at.t = oe,
                    St = g === Pt ? Ka(y, O) + Ke + ot : 0,
                    St && (at.push(O.d, St + Rt),
                    oe.style.flexBasis !== "auto" && (oe.style.flexBasis = St + Rt)),
                    ns(at),
                    Jt && Ae.forEach(function(tr) {
                        tr.pin === Jt && tr.vars.pinSpacing !== !1 && (tr._subPinOffset = !0)
                    }),
                    V && ne(gi)) : (St = Ka(y, O),
                    St && oe.style.flexBasis !== "auto" && (oe.style.flexBasis = St + Rt)),
                    V && (It = {
                        top: Dt.top + (or ? Tr - be : $n) + Rt,
                        left: Dt.left + (or ? $n : Tr - be) + Rt,
                        boxSizing: "border-box",
                        position: "fixed"
                    },
                    It[Pn] = It["max" + ds] = Math.ceil(Dt.width) + Rt,
                    It[An] = It["max" + Kl] = Math.ceil(Dt.height) + Rt,
                    It[Vi] = It[Vi + js] = It[Vi + qs] = It[Vi + Xs] = It[Vi + Bs] = "0",
                    It[Pt] = wt[Pt],
                    It[Pt + js] = wt[Pt + js],
                    It[Pt + qs] = wt[Pt + qs],
                    It[Pt + Xs] = wt[Pt + Xs],
                    It[Pt + Bs] = wt[Pt + Bs],
                    Ht = yg(ct, It, k),
                    di && ne(0)),
                    r ? (aa = r._initted,
                    $o(1),
                    r.render(r.duration(), !0, !0),
                    ji = We(O.a) - Ct + Ke + ot,
                    Wt = Math.abs(Ke - ji) > 1,
                    V && Wt && Ht.splice(Ht.length - 2, 2),
                    r.render(0, !0, !0),
                    aa || r.invalidate(!0),
                    r.parent || r.totalTime(r.totalTime()),
                    $o(0)) : ji = Ke,
                    Xi && (Xi.value ? Xi.style["overflow" + O.a.toUpperCase()] = Xi.value : Xi.style.removeProperty("overflow-" + O.a));
                else if (_ && ne() && !d)
                    for (Dt = _.parentNode; Dt && Dt !== Ue; )
                        Dt._pinOffset && (be -= Dt._pinOffset,
                        Ee -= Dt._pinOffset),
                        Dt = Dt.parentNode;
                Er && Er.forEach(function(tr) {
                    return tr.revert(!1, !0)
                }),
                $.start = be,
                $.end = Ee,
                st = Xe = di ? gi : ne(),
                !d && !di && (st < gi && ne(gi),
                $.scroll.rec = 0),
                $.revert(!1, !0),
                re = ii(),
                Gt && (je = -1,
                Gt.restart(!0)),
                ti = 0,
                r && X && (r._initted || ar) && r.progress() !== ar && r.progress(ar || 0, !0).render(r.time(), !0, !0),
                (Ot || ee !== $.progress || d || p || r && !r._initted) && (r && !X && (r._initted || ee || r.vars.immediateRender !== !1) && r.totalProgress(d && be < -.001 && !ee ? fe.utils.normalize(be, Ee, 0) : ee, !0),
                $.progress = Ot || (st - be) / Ke === ee ? 0 : ee),
                y && g && (oe._pinOffset = Math.round($.progress * ji)),
                Me && Me.invalidate(),
                isNaN(ln) || (ln -= fe.getProperty(K, O.p),
                un -= fe.getProperty(Ye, O.p),
                Ta(K, O, ln),
                Ta(et, O, ln - (we || 0)),
                Ta(Ye, O, un),
                Ta(mt, O, un - (we || 0))),
                Ot && !di && $.update(),
                h && !di && !ai && (ai = !0,
                h($),
                ai = !1)
            }
        }
        ,
        $.getVelocity = function() {
            return (ne() - Xe) / (ii() - Ps) * 1e3 || 0
        }
        ,
        $.endAnimation = function() {
            Ss($.callbackAnimation),
            r && (Me ? Me.progress(1) : r.paused() ? X || Ss(r, $.direction < 0, 1) : Ss(r, r.reversed()))
        }
        ,
        $.labelToScroll = function(le) {
            return r && r.labels && (be || $.refresh() || be) + r.labels[le] / r.duration() * Ke || 0
        }
        ,
        $.getTrailing = function(le) {
            var ye = Ae.indexOf($)
              , pe = $.direction > 0 ? Ae.slice(0, ye).reverse() : Ae.slice(ye + 1);
            return (Oi(le) ? pe.filter(function(we) {
                return we.vars.preventOverlaps === le
            }) : pe).filter(function(we) {
                return $.direction > 0 ? we.end <= be : we.start >= Ee
            })
        }
        ,
        $.update = function(le, ye, pe) {
            if (!(d && !pe && !le)) {
                var we = di === !0 ? gi : $.scroll(), Mt = le ? 0 : (we - be) / Ke, De = Mt < 0 ? 0 : Mt > 1 ? 1 : Mt || 0, gt = $.progress, Ot, dt, ot, Ge, Ai, Ve, Jt, vi;
                if (ye && (Xe = st,
                st = d ? ne() : we,
                P && (sr = Pi,
                Pi = r && !X ? r.totalProgress() : De)),
                S && y && !ti && !va && er && (!De && be < we + (we - Xe) / (ii() - Ps) * S ? De = 1e-4 : De === 1 && Ee > we + (we - Xe) / (ii() - Ps) * S && (De = .9999)),
                De !== gt && $.enabled) {
                    if (Ot = $.isActive = !!De && De < 1,
                    dt = !!gt && gt < 1,
                    Ve = Ot !== dt,
                    Ai = Ve || !!De != !!gt,
                    $.direction = De > gt ? 1 : -1,
                    $.progress = De,
                    Ai && !ti && (ot = De && !gt ? 0 : De === 1 ? 1 : gt === 1 ? 2 : 3,
                    X && (Ge = !Ve && F[ot + 1] !== "none" && F[ot + 1] || F[ot],
                    vi = r && (Ge === "complete" || Ge === "reset" || Ge in r))),
                    L && (Ve || vi) && (vi || w || !r) && (ni(L) ? L($) : $.getTrailing(L).forEach(function(Tr) {
                        return Tr.endAnimation()
                    })),
                    X || (Me && !ti && !va ? (Me._dp._time - Me._start !== Me._time && Me.render(Me._dp._time - Me._start),
                    Me.resetTo ? Me.resetTo("totalProgress", De, r._tTime / r._tDur) : (Me.vars.totalProgress = De,
                    Me.invalidate().restart())) : r && r.totalProgress(De, !!(ti && (re || le)))),
                    y) {
                        if (le && g && (oe.style[g + O.os2] = $r),
                        !V)
                            Zt(ks(Ct + ji * De));
                        else if (Ai) {
                            if (Jt = !le && De > gt && Ee + 1 > we && we + 1 >= yr(I, O),
                            k)
                                if (!le && (Ot || Jt)) {
                                    var St = Or(y, !0)
                                      , wt = we - be;
                                    Ju(y, Ue, St.top + (O === Nt ? wt : 0) + Rt, St.left + (O === Nt ? 0 : wt) + Rt)
                                } else
                                    Ju(y, oe);
                            ns(Ot || Jt ? Ht : Yt),
                            Wt && De < 1 && Ot || Zt(Ct + (De === 1 && !Jt ? ji : 0))
                        }
                    }
                    P && !me.tween && !ti && !va && Gt.restart(!0),
                    l && (Ve || E && De && (De < 1 || !Ho)) && ia(l.targets).forEach(function(Tr) {
                        return Tr.classList[Ot || E ? "add" : "remove"](l.className)
                    }),
                    o && !X && !le && o($),
                    Ai && !ti ? (X && (vi && (Ge === "complete" ? r.pause().totalProgress(1) : Ge === "reset" ? r.restart(!0).pause() : Ge === "restart" ? r.restart(!0) : r[Ge]()),
                    o && o($)),
                    (Ve || !Ho) && (f && Ve && qo($, f),
                    Q[ot] && qo($, Q[ot]),
                    E && (De === 1 ? $.kill(!1, 1) : Q[ot] = 0),
                    Ve || (ot = De === 1 ? 1 : 3,
                    Q[ot] && qo($, Q[ot]))),
                    N && !Ot && Math.abs($.getVelocity()) > (Ls(N) ? N : 2500) && (Ss($.callbackAnimation),
                    Me ? Me.progress(1) : Ss(r, Ge === "reverse" ? 1 : !De, 1))) : X && o && !ti && o($)
                }
                if (Mi) {
                    var Dt = d ? we / d.duration() * (d._caScrollDist || 0) : we;
                    mi(Dt + (K._isFlipped ? 1 : 0)),
                    Mi(Dt)
                }
                Lt && Lt(-we / d.duration() * (d._caScrollDist || 0))
            }
        }
        ,
        $.enable = function(le, ye) {
            $.enabled || ($.enabled = !0,
            Bt(I, "resize", Os),
            q || Bt(I, "scroll", Yn),
            he && Bt(s, "refreshInit", he),
            le !== !1 && ($.progress = ee = 0,
            st = Xe = je = ne()),
            ye !== !1 && $.refresh())
        }
        ,
        $.getTween = function(le) {
            return le && me ? me.tween : Me
        }
        ,
        $.setPositions = function(le, ye, pe, we) {
            if (d) {
                var Mt = d.scrollTrigger
                  , De = d.duration()
                  , gt = Mt.end - Mt.start;
                le = Mt.start + gt * le / De,
                ye = Mt.start + gt * ye / De
            }
            $.refresh(!1, !1, {
                start: Xu(le, pe && !!$._startClamp),
                end: Xu(ye, pe && !!$._endClamp)
            }, we),
            $.update()
        }
        ,
        $.adjustPinSpacing = function(le) {
            if (at && le) {
                var ye = at.indexOf(O.d) + 1;
                at[ye] = parseFloat(at[ye]) + le + Rt,
                at[1] = parseFloat(at[1]) + le + Rt,
                ns(at)
            }
        }
        ,
        $.disable = function(le, ye) {
            if ($.enabled && (le !== !1 && $.revert(!0, !0),
            $.enabled = $.isActive = !1,
            ye || Me && Me.pause(),
            gi = 0,
            Ne && (Ne.uncache = 1),
            he && qt(s, "refreshInit", he),
            Gt && (Gt.pause(),
            me.tween && me.tween.kill() && (me.tween = 0)),
            !q)) {
                for (var pe = Ae.length; pe--; )
                    if (Ae[pe].scroller === I && Ae[pe] !== $)
                        return;
                qt(I, "resize", Os),
                q || qt(I, "scroll", Yn)
            }
        }
        ,
        $.kill = function(le, ye) {
            $.disable(le, ye),
            Me && !ye && Me.kill(),
            c && delete bl[c];
            var pe = Ae.indexOf($);
            pe >= 0 && Ae.splice(pe, 1),
            pe === fi && Da > 0 && fi--,
            pe = 0,
            Ae.forEach(function(we) {
                return we.scroller === $.scroller && (pe = 1)
            }),
            pe || di || ($.scroll.rec = 0),
            r && (r.scrollTrigger = null,
            le && r.revert({
                kill: !1
            }),
            ye || r.kill()),
            et && [et, mt, K, Ye].forEach(function(we) {
                return we.parentNode && we.parentNode.removeChild(we)
            }),
            Ys === $ && (Ys = 0),
            y && (Ne && (Ne.uncache = 1),
            pe = 0,
            Ae.forEach(function(we) {
                return we.pin === y && pe++
            }),
            pe || (Ne.spacer = 0)),
            i.onKill && i.onKill($)
        }
        ,
        Ae.push($),
        $.enable(!1, !1),
        ft && ft($),
        r && r.add && !Ke) {
            var Fe = $.update;
            $.update = function() {
                $.update = Fe,
                Le.cache++,
                be || Ee || $.refresh()
            }
            ,
            fe.delayedCall(.01, $.update),
            Ke = .01,
            be = Ee = 0
        } else
            $.refresh();
        y && mg()
    }
    ,
    s.register = function(i) {
        return Gn || (fe = i || Lf(),
        kf() && window.document && s.enable(),
        Gn = As),
        Gn
    }
    ,
    s.defaults = function(i) {
        if (i)
            for (var r in i)
                ba[r] = i[r];
        return ba
    }
    ,
    s.disable = function(i, r) {
        As = 0,
        Ae.forEach(function(o) {
            return o[r ? "kill" : "disable"](i)
        }),
        qt(ke, "wheel", Yn),
        qt(ut, "scroll", Yn),
        clearInterval(ga),
        qt(ut, "touchcancel", hr),
        qt(Ue, "touchstart", hr),
        wa(qt, ut, "pointerdown,touchstart,mousedown", Yu),
        wa(qt, ut, "pointerup,touchend,mouseup", Wu),
        Va.kill(),
        ya(qt);
        for (var n = 0; n < Le.length; n += 3)
            _a(qt, Le[n], Le[n + 1]),
            _a(qt, Le[n], Le[n + 2])
    }
    ,
    s.enable = function() {
        if (ke = window,
        ut = document,
        zi = ut.documentElement,
        Ue = ut.body,
        fe && (ia = fe.utils.toArray,
        Fs = fe.utils.clamp,
        wl = fe.core.context || hr,
        $o = fe.core.suppressOverwrites || hr,
        Wl = ke.history.scrollRestoration || "auto",
        xl = ke.pageYOffset || 0,
        fe.core.globals("ScrollTrigger", s),
        Ue)) {
            As = 1,
            rs = document.createElement("div"),
            rs.style.height = "100vh",
            rs.style.position = "absolute",
            Ff(),
            lg(),
            Et.register(fe),
            s.isTouch = Et.isTouch,
            Xr = Et.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),
            yl = Et.isTouch === 1,
            Bt(ke, "wheel", Yn),
            Yl = [ke, ut, zi, Ue],
            fe.matchMedia ? (s.matchMedia = function(f) {
                var h = fe.matchMedia(), w;
                for (w in f)
                    h.add(w, f[w]);
                return h
            }
            ,
            fe.addEventListener("matchMediaInit", function() {
                return Zl()
            }),
            fe.addEventListener("matchMediaRevert", function() {
                return $f()
            }),
            fe.addEventListener("matchMedia", function() {
                xn(0, 1),
                zn("matchMedia")
            }),
            fe.matchMedia().add("(orientation: portrait)", function() {
                return Bo(),
                Bo
            })) : console.warn("Requires GSAP 3.11.0 or later"),
            Bo(),
            Bt(ut, "scroll", Yn);
            var i = Ue.hasAttribute("style"), r = Ue.style, n = r.borderTopStyle, o = fe.core.Animation.prototype, l, c;
            for (o.revert || Object.defineProperty(o, "revert", {
                value: function() {
                    return this.time(-.01, !0)
                }
            }),
            r.borderTopStyle = "solid",
            l = Or(Ue),
            Nt.m = Math.round(l.top + Nt.sc()) || 0,
            hi.m = Math.round(l.left + hi.sc()) || 0,
            n ? r.borderTopStyle = n : r.removeProperty("border-top-style"),
            i || (Ue.setAttribute("style", ""),
            Ue.removeAttribute("style")),
            ga = setInterval(Uu, 250),
            fe.delayedCall(.5, function() {
                return va = 0
            }),
            Bt(ut, "touchcancel", hr),
            Bt(Ue, "touchstart", hr),
            wa(Bt, ut, "pointerdown,touchstart,mousedown", Yu),
            wa(Bt, ut, "pointerup,touchend,mouseup", Wu),
            vl = fe.utils.checkPrefix("transform"),
            Ia.push(vl),
            Gn = ii(),
            Va = fe.delayedCall(.2, xn).pause(),
            Vn = [ut, "visibilitychange", function() {
                var f = ke.innerWidth
                  , h = ke.innerHeight;
                ut.hidden ? (qu = f,
                Bu = h) : (qu !== f || Bu !== h) && Os()
            }
            , ut, "DOMContentLoaded", xn, ke, "load", xn, ke, "resize", Os],
            ya(Bt),
            Ae.forEach(function(f) {
                return f.enable(0, 1)
            }),
            c = 0; c < Le.length; c += 3)
                _a(qt, Le[c], Le[c + 1]),
                _a(qt, Le[c], Le[c + 2])
        }
    }
    ,
    s.config = function(i) {
        "limitCallbacks"in i && (Ho = !!i.limitCallbacks);
        var r = i.syncInterval;
        r && clearInterval(ga) || (ga = r) && setInterval(Uu, r),
        "ignoreMobileResize"in i && (yl = s.isTouch === 1 && i.ignoreMobileResize),
        "autoRefreshEvents"in i && (ya(qt) || ya(Bt, i.autoRefreshEvents || "none"),
        Mf = (i.autoRefreshEvents + "").indexOf("resize") === -1)
    }
    ,
    s.scrollerProxy = function(i, r) {
        var n = _i(i)
          , o = Le.indexOf(n)
          , l = Dn(n);
        ~o && Le.splice(o, l ? 6 : 2),
        r && (l ? _r.unshift(ke, r, Ue, r, zi, r) : _r.unshift(n, r))
    }
    ,
    s.clearMatchMedia = function(i) {
        Ae.forEach(function(r) {
            return r._ctx && r._ctx.query === i && r._ctx.kill(!0, !0)
        })
    }
    ,
    s.isInViewport = function(i, r, n) {
        var o = (Oi(i) ? _i(i) : i).getBoundingClientRect()
          , l = o[n ? Pn : An] * r || 0;
        return n ? o.right - l > 0 && o.left + l < ke.innerWidth : o.bottom - l > 0 && o.top + l < ke.innerHeight
    }
    ,
    s.positionInViewport = function(i, r, n) {
        Oi(i) && (i = _i(i));
        var o = i.getBoundingClientRect()
          , l = o[n ? Pn : An]
          , c = r == null ? l / 2 : r in Qa ? Qa[r] * l : ~r.indexOf("%") ? parseFloat(r) * l / 100 : parseFloat(r) || 0;
        return n ? (o.left + c) / ke.innerWidth : (o.top + c) / ke.innerHeight
    }
    ,
    s.killAll = function(i) {
        if (Ae.slice(0).forEach(function(n) {
            return n.vars.id !== "ScrollSmoother" && n.kill()
        }),
        i !== !0) {
            var r = In.killAll || [];
            In = {},
            r.forEach(function(n) {
                return n()
            })
        }
    }
    ,
    s
}();
Ce.version = "3.13.0";
Ce.saveStyles = function(s) {
    return s ? ia(s).forEach(function(e) {
        if (e && e.style) {
            var t = Li.indexOf(e);
            t >= 0 && Li.splice(t, 5),
            Li.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), fe.core.getCache(e), wl())
        }
    }) : Li
}
;
Ce.revert = function(s, e) {
    return Zl(!s, e)
}
;
Ce.create = function(s, e) {
    return new Ce(s,e)
}
;
Ce.refresh = function(s) {
    return s ? Os(!0) : (Gn || Ce.register()) && xn(!0)
}
;
Ce.update = function(s) {
    return ++Le.cache && Ir(s === !0 ? 2 : 0)
}
;
Ce.clearScrollMemory = Hf;
Ce.maxScroll = function(s, e) {
    return yr(s, e ? hi : Nt)
}
;
Ce.getScrollFunc = function(s, e) {
    return an(_i(s), e ? hi : Nt)
}
;
Ce.getById = function(s) {
    return bl[s]
}
;
Ce.getAll = function() {
    return Ae.filter(function(s) {
        return s.vars.id !== "ScrollSmoother"
    })
}
;
Ce.isScrolling = function() {
    return !!er
}
;
Ce.snapDirectional = Ql;
Ce.addEventListener = function(s, e) {
    var t = In[s] || (In[s] = []);
    ~t.indexOf(e) || t.push(e)
}
;
Ce.removeEventListener = function(s, e) {
    var t = In[s]
      , i = t && t.indexOf(e);
    i >= 0 && t.splice(i, 1)
}
;
Ce.batch = function(s, e) {
    var t = [], i = {}, r = e.interval || .016, n = e.batchMax || 1e9, o = function(f, h) {
        var w = []
          , _ = []
          , y = fe.delayedCall(r, function() {
            h(w, _),
            w = [],
            _ = []
        }).pause();
        return function(g) {
            w.length || y.restart(!0),
            w.push(g.trigger),
            _.push(g),
            n <= w.length && y.progress(1)
        }
    }, l;
    for (l in e)
        i[l] = l.substr(0, 2) === "on" && ni(e[l]) && l !== "onRefreshInit" ? o(l, e[l]) : e[l];
    return ni(n) && (n = n(),
    Bt(Ce, "refresh", function() {
        return n = e.batchMax()
    })),
    ia(s).forEach(function(c) {
        var f = {};
        for (l in i)
            f[l] = i[l];
        f.trigger = c,
        t.push(Ce.create(f))
    }),
    t
}
;
var tc = function(e, t, i, r) {
    return t > r ? e(r) : t < 0 && e(0),
    i > r ? (r - t) / (i - t) : i < 0 ? t / (t - i) : 1
}, Xo = function s(e, t) {
    t === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = t === !0 ? "auto" : t ? "pan-" + t + (Et.isTouch ? " pinch-zoom" : "") : "none",
    e === zi && s(Ue, t)
}, Ea = {
    auto: 1,
    scroll: 1
}, _g = function(e) {
    var t = e.event, i = e.target, r = e.axis, n = (t.changedTouches ? t.changedTouches[0] : t).target, o = n._gsap || fe.core.getCache(n), l = ii(), c;
    if (!o._isScrollT || l - o._isScrollT > 2e3) {
        for (; n && n !== Ue && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(Ea[(c = Ui(n)).overflowY] || Ea[c.overflowX])); )
            n = n.parentNode;
        o._isScroll = n && n !== i && !Dn(n) && (Ea[(c = Ui(n)).overflowY] || Ea[c.overflowX]),
        o._isScrollT = l
    }
    (o._isScroll || r === "x") && (t.stopPropagation(),
    t._gsapAllow = !0)
}, Bf = function(e, t, i, r) {
    return Et.create({
        target: e,
        capture: !0,
        debounce: !1,
        lockAxis: !0,
        type: t,
        onWheel: r = r && _g,
        onPress: r,
        onDrag: r,
        onScroll: r,
        onEnable: function() {
            return i && Bt(ut, Et.eventTypes[0], rc, !1, !0)
        },
        onDisable: function() {
            return qt(ut, Et.eventTypes[0], rc, !0)
        }
    })
}, bg = /(input|label|select|textarea)/i, ic, rc = function(e) {
    var t = bg.test(e.target.tagName);
    (t || ic) && (e._gsapAllow = !0,
    ic = t)
}, xg = function(e) {
    yn(e) || (e = {}),
    e.preventDefault = e.isNormalizer = e.allowClicks = !0,
    e.type || (e.type = "wheel,touch"),
    e.debounce = !!e.debounce,
    e.id = e.id || "normalizer";
    var t = e, i = t.normalizeScrollX, r = t.momentum, n = t.allowNestedScroll, o = t.onRelease, l, c, f = _i(e.target) || zi, h = fe.core.globals().ScrollSmoother, w = h && h.get(), _ = Xr && (e.content && _i(e.content) || w && e.content !== !1 && !w.smooth() && w.content()), y = an(f, Nt), g = an(f, hi), p = 1, S = (Et.isTouch && ke.visualViewport ? ke.visualViewport.scale * ke.visualViewport.width : ke.outerWidth) / ke.innerWidth, T = 0, C = ni(r) ? function() {
        return r(l)
    }
    : function() {
        return r || 2.8
    }
    , E, P, k = Bf(f, e.type, !0, n), R = function() {
        return P = !1
    }, d = hr, N = hr, L = function() {
        c = yr(f, Nt),
        N = Fs(Xr ? 1 : 0, c),
        i && (d = Fs(0, yr(f, hi))),
        E = kn
    }, O = function() {
        _._gsap.y = ks(parseFloat(_._gsap.y) + y.offset) + "px",
        _.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(_._gsap.y) + ", 0, 1)",
        y.offset = y.cacheID = 0
    }, X = function() {
        if (P) {
            requestAnimationFrame(R);
            var Y = ks(l.deltaY / 2)
              , Z = N(y.v - Y);
            if (_ && Z !== y.v + y.offset) {
                y.offset = Z - y.v;
                var $ = ks((parseFloat(_ && _._gsap.y) || 0) - y.offset);
                _.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + $ + ", 0, 1)",
                _._gsap.y = $ + "px",
                y.cacheID = Le.cache,
                Ir()
            }
            return !0
        }
        y.offset && O(),
        P = !0
    }, I, H, q, V, Q = function() {
        L(),
        I.isActive() && I.vars.scrollY > c && (y() > c ? I.progress(1) && y(c) : I.resetTo("scrollY", c))
    };
    return _ && fe.set(_, {
        y: "+=0"
    }),
    e.ignoreCheck = function(F) {
        return Xr && F.type === "touchmove" && X() || p > 1.05 && F.type !== "touchstart" || l.isGesturing || F.touches && F.touches.length > 1
    }
    ,
    e.onPress = function() {
        P = !1;
        var F = p;
        p = ks((ke.visualViewport && ke.visualViewport.scale || 1) / S),
        I.pause(),
        F !== p && Xo(f, p > 1.01 ? !0 : i ? !1 : "x"),
        H = g(),
        q = y(),
        L(),
        E = kn
    }
    ,
    e.onRelease = e.onGestureStart = function(F, Y) {
        if (y.offset && O(),
        !Y)
            V.restart(!0);
        else {
            Le.cache++;
            var Z = C(), $, he;
            i && ($ = g(),
            he = $ + Z * .05 * -F.velocityX / .227,
            Z *= tc(g, $, he, yr(f, hi)),
            I.vars.scrollX = d(he)),
            $ = y(),
            he = $ + Z * .05 * -F.velocityY / .227,
            Z *= tc(y, $, he, yr(f, Nt)),
            I.vars.scrollY = N(he),
            I.invalidate().duration(Z).play(.01),
            (Xr && I.vars.scrollY >= c || $ >= c - 1) && fe.to({}, {
                onUpdate: Q,
                duration: Z
            })
        }
        o && o(F)
    }
    ,
    e.onWheel = function() {
        I._ts && I.pause(),
        ii() - T > 1e3 && (E = 0,
        T = ii())
    }
    ,
    e.onChange = function(F, Y, Z, $, he) {
        if (kn !== E && L(),
        Y && i && g(d($[2] === Y ? H + (F.startX - F.x) : g() + Y - $[1])),
        Z) {
            y.offset && O();
            var Oe = he[2] === Z
              , nt = Oe ? q + F.startY - F.y : y() + Z - he[1]
              , je = N(nt);
            Oe && nt !== je && (q += je - nt),
            y(je)
        }
        (Z || Y) && Ir()
    }
    ,
    e.onEnable = function() {
        Xo(f, i ? !1 : "x"),
        Ce.addEventListener("refresh", Q),
        Bt(ke, "resize", Q),
        y.smooth && (y.target.style.scrollBehavior = "auto",
        y.smooth = g.smooth = !1),
        k.enable()
    }
    ,
    e.onDisable = function() {
        Xo(f, !0),
        qt(ke, "resize", Q),
        Ce.removeEventListener("refresh", Q),
        k.kill()
    }
    ,
    e.lockAxis = e.lockAxis !== !1,
    l = new Et(e),
    l.iOS = Xr,
    Xr && !y() && y(1),
    Xr && fe.ticker.add(hr),
    V = l._dc,
    I = fe.to(l, {
        ease: "power4",
        paused: !0,
        inherit: !1,
        scrollX: i ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
            scrollY: qf(y, y(), function() {
                return I.pause()
            })
        },
        onUpdate: Ir,
        onComplete: V.vars.onComplete
    }),
    l
};
Ce.sort = function(s) {
    if (ni(s))
        return Ae.sort(s);
    var e = ke.pageYOffset || 0;
    return Ce.getAll().forEach(function(t) {
        return t._sortY = t.trigger ? e + t.trigger.getBoundingClientRect().top : t.start + ke.innerHeight
    }),
    Ae.sort(s || function(t, i) {
        return (t.vars.refreshPriority || 0) * -1e6 + (t.vars.containerAnimation ? 1e6 : t._sortY) - ((i.vars.containerAnimation ? 1e6 : i._sortY) + (i.vars.refreshPriority || 0) * -1e6)
    }
    )
}
;
Ce.observe = function(s) {
    return new Et(s)
}
;
Ce.normalizeScroll = function(s) {
    if (typeof s > "u")
        return ci;
    if (s === !0 && ci)
        return ci.enable();
    if (s === !1) {
        ci && ci.kill(),
        ci = s;
        return
    }
    var e = s instanceof Et ? s : xg(s);
    return ci && ci.target === e.target && ci.kill(),
    Dn(e.target) && (ci = e),
    e
}
;
Ce.core = {
    _getVelocityProp: gl,
    _inputObserver: Bf,
    _scrollers: Le,
    _proxies: _r,
    bridge: {
        ss: function() {
            er || zn("scrollStart"),
            er = ii()
        },
        ref: function() {
            return ti
        }
    }
};
Lf() && fe.registerPlugin(Ce);
function jf(s, e, t) {
    return Math.max(s, Math.min(e, t))
}
class Sg {
    advance(e) {
        var l;
        if (!this.isRunning)
            return;
        let t = !1;
        if (this.lerp)
            this.value = (i = this.value,
            r = this.to,
            n = 60 * this.lerp,
            o = e,
            function(c, f, h) {
                return (1 - h) * c + h * f
            }(i, r, 1 - Math.exp(-n * o))),
            Math.round(this.value) === this.to && (this.value = this.to,
            t = !0);
        else {
            this.currentTime += e;
            const c = jf(0, this.currentTime / this.duration, 1);
            t = c >= 1;
            const f = t ? 1 : this.easing(c);
            this.value = this.from + (this.to - this.from) * f
        }
        var i, r, n, o;
        (l = this.onUpdate) == null || l.call(this, this.value, t),
        t && this.stop()
    }
    stop() {
        this.isRunning = !1
    }
    fromTo(e, t, {lerp: i=.1, duration: r=1, easing: n=c => c, onStart: o, onUpdate: l}) {
        this.from = this.value = e,
        this.to = t,
        this.lerp = i,
        this.duration = r,
        this.easing = n,
        this.currentTime = 0,
        this.isRunning = !0,
        o == null || o(),
        this.onUpdate = l
    }
}
class Tg {
    constructor({wrapper: e, content: t, autoResize: i=!0, debounce: r=250}={}) {
        Pr(this, "resize", () => {
            this.onWrapperResize(),
            this.onContentResize()
        }
        );
        Pr(this, "onWrapperResize", () => {
            this.wrapper === window ? (this.width = window.innerWidth,
            this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth,
            this.height = this.wrapper.clientHeight)
        }
        );
        Pr(this, "onContentResize", () => {
            this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight,
            this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight,
            this.scrollWidth = this.wrapper.scrollWidth)
        }
        );
        this.wrapper = e,
        this.content = t,
        i && (this.debouncedResize = function(n, o) {
            let l;
            return function() {
                let c = arguments
                  , f = this;
                clearTimeout(l),
                l = setTimeout(function() {
                    n.apply(f, c)
                }, o)
            }
        }(this.resize, r),
        this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, !1) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize),
        this.wrapperResizeObserver.observe(this.wrapper)),
        this.contentResizeObserver = new ResizeObserver(this.debouncedResize),
        this.contentResizeObserver.observe(this.content)),
        this.resize()
    }
    destroy() {
        var e, t;
        (e = this.wrapperResizeObserver) == null || e.disconnect(),
        (t = this.contentResizeObserver) == null || t.disconnect(),
        window.removeEventListener("resize", this.debouncedResize, !1)
    }
    get limit() {
        return {
            x: this.scrollWidth - this.width,
            y: this.scrollHeight - this.height
        }
    }
}
class Xf {
    constructor() {
        this.events = {}
    }
    emit(e, ...t) {
        let i = this.events[e] || [];
        for (let r = 0, n = i.length; r < n; r++)
            i[r](...t)
    }
    on(e, t) {
        var i;
        return (i = this.events[e]) != null && i.push(t) || (this.events[e] = [t]),
        () => {
            var r;
            this.events[e] = (r = this.events[e]) == null ? void 0 : r.filter(n => t !== n)
        }
    }
    off(e, t) {
        var i;
        this.events[e] = (i = this.events[e]) == null ? void 0 : i.filter(r => t !== r)
    }
    destroy() {
        this.events = {}
    }
}
const nc = 100 / 6;
class Eg {
    constructor(e, {wheelMultiplier: t=1, touchMultiplier: i=1}) {
        Pr(this, "onTouchStart", e => {
            const {clientX: t, clientY: i} = e.targetTouches ? e.targetTouches[0] : e;
            this.touchStart.x = t,
            this.touchStart.y = i,
            this.lastDelta = {
                x: 0,
                y: 0
            },
            this.emitter.emit("scroll", {
                deltaX: 0,
                deltaY: 0,
                event: e
            })
        }
        );
        Pr(this, "onTouchMove", e => {
            const {clientX: t, clientY: i} = e.targetTouches ? e.targetTouches[0] : e
              , r = -(t - this.touchStart.x) * this.touchMultiplier
              , n = -(i - this.touchStart.y) * this.touchMultiplier;
            this.touchStart.x = t,
            this.touchStart.y = i,
            this.lastDelta = {
                x: r,
                y: n
            },
            this.emitter.emit("scroll", {
                deltaX: r,
                deltaY: n,
                event: e
            })
        }
        );
        Pr(this, "onTouchEnd", e => {
            this.emitter.emit("scroll", {
                deltaX: this.lastDelta.x,
                deltaY: this.lastDelta.y,
                event: e
            })
        }
        );
        Pr(this, "onWheel", e => {
            let {deltaX: t, deltaY: i, deltaMode: r} = e;
            t *= r === 1 ? nc : r === 2 ? this.windowWidth : 1,
            i *= r === 1 ? nc : r === 2 ? this.windowHeight : 1,
            t *= this.wheelMultiplier,
            i *= this.wheelMultiplier,
            this.emitter.emit("scroll", {
                deltaX: t,
                deltaY: i,
                event: e
            })
        }
        );
        Pr(this, "onWindowResize", () => {
            this.windowWidth = window.innerWidth,
            this.windowHeight = window.innerHeight
        }
        );
        this.element = e,
        this.wheelMultiplier = t,
        this.touchMultiplier = i,
        this.touchStart = {
            x: null,
            y: null
        },
        this.emitter = new Xf,
        window.addEventListener("resize", this.onWindowResize, !1),
        this.onWindowResize(),
        this.element.addEventListener("wheel", this.onWheel, {
            passive: !1
        }),
        this.element.addEventListener("touchstart", this.onTouchStart, {
            passive: !1
        }),
        this.element.addEventListener("touchmove", this.onTouchMove, {
            passive: !1
        }),
        this.element.addEventListener("touchend", this.onTouchEnd, {
            passive: !1
        })
    }
    on(e, t) {
        return this.emitter.on(e, t)
    }
    destroy() {
        this.emitter.destroy(),
        window.removeEventListener("resize", this.onWindowResize, !1),
        this.element.removeEventListener("wheel", this.onWheel, {
            passive: !1
        }),
        this.element.removeEventListener("touchstart", this.onTouchStart, {
            passive: !1
        }),
        this.element.removeEventListener("touchmove", this.onTouchMove, {
            passive: !1
        }),
        this.element.removeEventListener("touchend", this.onTouchEnd, {
            passive: !1
        })
    }
}
class Cg {
    constructor({wrapper: e=window, content: t=document.documentElement, wheelEventsTarget: i=e, eventsTarget: r=i, smoothWheel: n=!0, syncTouch: o=!1, syncTouchLerp: l=.075, touchInertiaMultiplier: c=35, duration: f, easing: h=E => Math.min(1, 1.001 - Math.pow(2, -10 * E)), lerp: w=!f && .1, infinite: _=!1, orientation: y="vertical", gestureOrientation: g="vertical", touchMultiplier: p=1, wheelMultiplier: S=1, autoResize: T=!0, __experimental__naiveDimensions: C=!1}={}) {
        this.__isSmooth = !1,
        this.__isScrolling = !1,
        this.__isStopped = !1,
        this.__isLocked = !1,
        this.onVirtualScroll = ({deltaX: E, deltaY: P, event: k}) => {
            if (k.ctrlKey)
                return;
            const R = k.type.includes("touch")
              , d = k.type.includes("wheel");
            if (this.options.syncTouch && R && k.type === "touchstart" && !this.isStopped && !this.isLocked)
                return void this.reset();
            const N = E === 0 && P === 0
              , L = this.options.gestureOrientation === "vertical" && P === 0 || this.options.gestureOrientation === "horizontal" && E === 0;
            if (N || L)
                return;
            let O = k.composedPath();
            if (O = O.slice(0, O.indexOf(this.rootElement)),
            O.find(q => {
                var V, Q, F, Y, Z;
                return ((V = q.hasAttribute) === null || V === void 0 ? void 0 : V.call(q, "data-lenis-prevent")) || R && ((Q = q.hasAttribute) === null || Q === void 0 ? void 0 : Q.call(q, "data-lenis-prevent-touch")) || d && ((F = q.hasAttribute) === null || F === void 0 ? void 0 : F.call(q, "data-lenis-prevent-wheel")) || ((Y = q.classList) === null || Y === void 0 ? void 0 : Y.contains("lenis")) && !(!((Z = q.classList) === null || Z === void 0) && Z.contains("lenis-stopped"))
            }
            ))
                return;
            if (this.isStopped || this.isLocked)
                return void k.preventDefault();
            if (this.isSmooth = this.options.syncTouch && R || this.options.smoothWheel && d,
            !this.isSmooth)
                return this.isScrolling = !1,
                void this.animate.stop();
            k.preventDefault();
            let X = P;
            this.options.gestureOrientation === "both" ? X = Math.abs(P) > Math.abs(E) ? P : E : this.options.gestureOrientation === "horizontal" && (X = E);
            const I = R && this.options.syncTouch
              , H = R && k.type === "touchend" && Math.abs(X) > 5;
            H && (X = this.velocity * this.options.touchInertiaMultiplier),
            this.scrollTo(this.targetScroll + X, Object.assign({
                programmatic: !1
            }, I ? {
                lerp: H ? this.options.syncTouchLerp : 1
            } : {
                lerp: this.options.lerp,
                duration: this.options.duration,
                easing: this.options.easing
            }))
        }
        ,
        this.onNativeScroll = () => {
            if (!this.__preventNextScrollEvent && !this.isScrolling) {
                const E = this.animatedScroll;
                this.animatedScroll = this.targetScroll = this.actualScroll,
                this.velocity = 0,
                this.direction = Math.sign(this.animatedScroll - E),
                this.emit()
            }
        }
        ,
        window.lenisVersion = "1.0.42",
        e !== document.documentElement && e !== document.body || (e = window),
        this.options = {
            wrapper: e,
            content: t,
            wheelEventsTarget: i,
            eventsTarget: r,
            smoothWheel: n,
            syncTouch: o,
            syncTouchLerp: l,
            touchInertiaMultiplier: c,
            duration: f,
            easing: h,
            lerp: w,
            infinite: _,
            gestureOrientation: g,
            orientation: y,
            touchMultiplier: p,
            wheelMultiplier: S,
            autoResize: T,
            __experimental__naiveDimensions: C
        },
        this.animate = new Sg,
        this.emitter = new Xf,
        this.dimensions = new Tg({
            wrapper: e,
            content: t,
            autoResize: T
        }),
        this.toggleClassName("lenis", !0),
        this.velocity = 0,
        this.isLocked = !1,
        this.isStopped = !1,
        this.isSmooth = o || n,
        this.isScrolling = !1,
        this.targetScroll = this.animatedScroll = this.actualScroll,
        this.options.wrapper.addEventListener("scroll", this.onNativeScroll, !1),
        this.virtualScroll = new Eg(r,{
            touchMultiplier: p,
            wheelMultiplier: S
        }),
        this.virtualScroll.on("scroll", this.onVirtualScroll)
    }
    destroy() {
        this.emitter.destroy(),
        this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, !1),
        this.virtualScroll.destroy(),
        this.dimensions.destroy(),
        this.toggleClassName("lenis", !1),
        this.toggleClassName("lenis-smooth", !1),
        this.toggleClassName("lenis-scrolling", !1),
        this.toggleClassName("lenis-stopped", !1),
        this.toggleClassName("lenis-locked", !1)
    }
    on(e, t) {
        return this.emitter.on(e, t)
    }
    off(e, t) {
        return this.emitter.off(e, t)
    }
    setScroll(e) {
        this.isHorizontal ? this.rootElement.scrollLeft = e : this.rootElement.scrollTop = e
    }
    resize() {
        this.dimensions.resize()
    }
    emit() {
        this.emitter.emit("scroll", this)
    }
    reset() {
        this.isLocked = !1,
        this.isScrolling = !1,
        this.animatedScroll = this.targetScroll = this.actualScroll,
        this.velocity = 0,
        this.animate.stop()
    }
    start() {
        this.isStopped && (this.isStopped = !1,
        this.reset())
    }
    stop() {
        this.isStopped || (this.isStopped = !0,
        this.animate.stop(),
        this.reset())
    }
    raf(e) {
        const t = e - (this.time || e);
        this.time = e,
        this.animate.advance(.001 * t)
    }
    scrollTo(e, {offset: t=0, immediate: i=!1, lock: r=!1, duration: n=this.options.duration, easing: o=this.options.easing, lerp: l=!n && this.options.lerp, onComplete: c, force: f=!1, programmatic: h=!0}={}) {
        if (!this.isStopped && !this.isLocked || f) {
            if (["top", "left", "start"].includes(e))
                e = 0;
            else if (["bottom", "right", "end"].includes(e))
                e = this.limit;
            else {
                let w;
                if (typeof e == "string" ? w = document.querySelector(e) : e != null && e.nodeType && (w = e),
                w) {
                    if (this.options.wrapper !== window) {
                        const y = this.options.wrapper.getBoundingClientRect();
                        t -= this.isHorizontal ? y.left : y.top
                    }
                    const _ = w.getBoundingClientRect();
                    e = (this.isHorizontal ? _.left : _.top) + this.animatedScroll
                }
            }
            if (typeof e == "number") {
                if (e += t,
                e = Math.round(e),
                this.options.infinite ? h && (this.targetScroll = this.animatedScroll = this.scroll) : e = jf(0, e, this.limit),
                i)
                    return this.animatedScroll = this.targetScroll = e,
                    this.setScroll(this.scroll),
                    this.reset(),
                    void (c == null || c(this));
                if (!h) {
                    if (e === this.targetScroll)
                        return;
                    this.targetScroll = e
                }
                this.animate.fromTo(this.animatedScroll, e, {
                    duration: n,
                    easing: o,
                    lerp: l,
                    onStart: () => {
                        r && (this.isLocked = !0),
                        this.isScrolling = !0
                    }
                    ,
                    onUpdate: (w, _) => {
                        this.isScrolling = !0,
                        this.velocity = w - this.animatedScroll,
                        this.direction = Math.sign(this.velocity),
                        this.animatedScroll = w,
                        this.setScroll(this.scroll),
                        h && (this.targetScroll = w),
                        _ || this.emit(),
                        _ && (this.reset(),
                        this.emit(),
                        c == null || c(this),
                        this.__preventNextScrollEvent = !0,
                        requestAnimationFrame( () => {
                            delete this.__preventNextScrollEvent
                        }
                        ))
                    }
                })
            }
        }
    }
    get rootElement() {
        return this.options.wrapper === window ? document.documentElement : this.options.wrapper
    }
    get limit() {
        return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"]
    }
    get isHorizontal() {
        return this.options.orientation === "horizontal"
    }
    get actualScroll() {
        return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop
    }
    get scroll() {
        return this.options.infinite ? (e = this.animatedScroll,
        t = this.limit,
        (e % t + t) % t) : this.animatedScroll;
        var e, t
    }
    get progress() {
        return this.limit === 0 ? 1 : this.scroll / this.limit
    }
    get isSmooth() {
        return this.__isSmooth
    }
    set isSmooth(e) {
        this.__isSmooth !== e && (this.__isSmooth = e,
        this.toggleClassName("lenis-smooth", e))
    }
    get isScrolling() {
        return this.__isScrolling
    }
    set isScrolling(e) {
        this.__isScrolling !== e && (this.__isScrolling = e,
        this.toggleClassName("lenis-scrolling", e))
    }
    get isStopped() {
        return this.__isStopped
    }
    set isStopped(e) {
        this.__isStopped !== e && (this.__isStopped = e,
        this.toggleClassName("lenis-stopped", e))
    }
    get isLocked() {
        return this.__isLocked
    }
    set isLocked(e) {
        this.__isLocked !== e && (this.__isLocked = e,
        this.toggleClassName("lenis-locked", e))
    }
    get className() {
        let e = "lenis";
        return this.isStopped && (e += " lenis-stopped"),
        this.isLocked && (e += " lenis-locked"),
        this.isScrolling && (e += " lenis-scrolling"),
        this.isSmooth && (e += " lenis-smooth"),
        e
    }
    toggleClassName(e, t) {
        this.rootElement.classList.toggle(e, t),
        this.emitter.emit("className change", this)
    }
}
function Mg(s) {
    return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s
}
var Ra = {
    exports: {}
};
/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
var Pg = Ra.exports, sc;
function Ag() {
    return sc || (sc = 1,
    function(s) {
        (function(e, t) {
            s.exports = e.document ? t(e, !0) : function(i) {
                if (!i.document)
                    throw new Error("jQuery requires a window with a document");
                return t(i)
            }
        }
        )(typeof window < "u" ? window : Pg, function(e, t) {
            var i = []
              , r = Object.getPrototypeOf
              , n = i.slice
              , o = i.flat ? function(a) {
                return i.flat.call(a)
            }
            : function(a) {
                return i.concat.apply([], a)
            }
              , l = i.push
              , c = i.indexOf
              , f = {}
              , h = f.toString
              , w = f.hasOwnProperty
              , _ = w.toString
              , y = _.call(Object)
              , g = {}
              , p = function(u) {
                return typeof u == "function" && typeof u.nodeType != "number" && typeof u.item != "function"
            }
              , S = function(u) {
                return u != null && u === u.window
            }
              , T = e.document
              , C = {
                type: !0,
                src: !0,
                nonce: !0,
                noModule: !0
            };
            function E(a, u, m) {
                m = m || T;
                var v, b, x = m.createElement("script");
                if (x.text = a,
                u)
                    for (v in C)
                        b = u[v] || u.getAttribute && u.getAttribute(v),
                        b && x.setAttribute(v, b);
                m.head.appendChild(x).parentNode.removeChild(x)
            }
            function P(a) {
                return a == null ? a + "" : typeof a == "object" || typeof a == "function" ? f[h.call(a)] || "object" : typeof a
            }
            var k = "3.7.1"
              , R = /HTML$/i
              , d = function(a, u) {
                return new d.fn.init(a,u)
            };
            d.fn = d.prototype = {
                jquery: k,
                constructor: d,
                length: 0,
                toArray: function() {
                    return n.call(this)
                },
                get: function(a) {
                    return a == null ? n.call(this) : a < 0 ? this[a + this.length] : this[a]
                },
                pushStack: function(a) {
                    var u = d.merge(this.constructor(), a);
                    return u.prevObject = this,
                    u
                },
                each: function(a) {
                    return d.each(this, a)
                },
                map: function(a) {
                    return this.pushStack(d.map(this, function(u, m) {
                        return a.call(u, m, u)
                    }))
                },
                slice: function() {
                    return this.pushStack(n.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                even: function() {
                    return this.pushStack(d.grep(this, function(a, u) {
                        return (u + 1) % 2
                    }))
                },
                odd: function() {
                    return this.pushStack(d.grep(this, function(a, u) {
                        return u % 2
                    }))
                },
                eq: function(a) {
                    var u = this.length
                      , m = +a + (a < 0 ? u : 0);
                    return this.pushStack(m >= 0 && m < u ? [this[m]] : [])
                },
                end: function() {
                    return this.prevObject || this.constructor()
                },
                push: l,
                sort: i.sort,
                splice: i.splice
            },
            d.extend = d.fn.extend = function() {
                var a, u, m, v, b, x, M = arguments[0] || {}, z = 1, D = arguments.length, j = !1;
                for (typeof M == "boolean" && (j = M,
                M = arguments[z] || {},
                z++),
                typeof M != "object" && !p(M) && (M = {}),
                z === D && (M = this,
                z--); z < D; z++)
                    if ((a = arguments[z]) != null)
                        for (u in a)
                            v = a[u],
                            !(u === "__proto__" || M === v) && (j && v && (d.isPlainObject(v) || (b = Array.isArray(v))) ? (m = M[u],
                            b && !Array.isArray(m) ? x = [] : !b && !d.isPlainObject(m) ? x = {} : x = m,
                            b = !1,
                            M[u] = d.extend(j, x, v)) : v !== void 0 && (M[u] = v));
                return M
            }
            ,
            d.extend({
                expando: "jQuery" + (k + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function(a) {
                    throw new Error(a)
                },
                noop: function() {},
                isPlainObject: function(a) {
                    var u, m;
                    return !a || h.call(a) !== "[object Object]" ? !1 : (u = r(a),
                    u ? (m = w.call(u, "constructor") && u.constructor,
                    typeof m == "function" && _.call(m) === y) : !0)
                },
                isEmptyObject: function(a) {
                    var u;
                    for (u in a)
                        return !1;
                    return !0
                },
                globalEval: function(a, u, m) {
                    E(a, {
                        nonce: u && u.nonce
                    }, m)
                },
                each: function(a, u) {
                    var m, v = 0;
                    if (N(a))
                        for (m = a.length; v < m && u.call(a[v], v, a[v]) !== !1; v++)
                            ;
                    else
                        for (v in a)
                            if (u.call(a[v], v, a[v]) === !1)
                                break;
                    return a
                },
                text: function(a) {
                    var u, m = "", v = 0, b = a.nodeType;
                    if (!b)
                        for (; u = a[v++]; )
                            m += d.text(u);
                    return b === 1 || b === 11 ? a.textContent : b === 9 ? a.documentElement.textContent : b === 3 || b === 4 ? a.nodeValue : m
                },
                makeArray: function(a, u) {
                    var m = u || [];
                    return a != null && (N(Object(a)) ? d.merge(m, typeof a == "string" ? [a] : a) : l.call(m, a)),
                    m
                },
                inArray: function(a, u, m) {
                    return u == null ? -1 : c.call(u, a, m)
                },
                isXMLDoc: function(a) {
                    var u = a && a.namespaceURI
                      , m = a && (a.ownerDocument || a).documentElement;
                    return !R.test(u || m && m.nodeName || "HTML")
                },
                merge: function(a, u) {
                    for (var m = +u.length, v = 0, b = a.length; v < m; v++)
                        a[b++] = u[v];
                    return a.length = b,
                    a
                },
                grep: function(a, u, m) {
                    for (var v, b = [], x = 0, M = a.length, z = !m; x < M; x++)
                        v = !u(a[x], x),
                        v !== z && b.push(a[x]);
                    return b
                },
                map: function(a, u, m) {
                    var v, b, x = 0, M = [];
                    if (N(a))
                        for (v = a.length; x < v; x++)
                            b = u(a[x], x, m),
                            b != null && M.push(b);
                    else
                        for (x in a)
                            b = u(a[x], x, m),
                            b != null && M.push(b);
                    return o(M)
                },
                guid: 1,
                support: g
            }),
            typeof Symbol == "function" && (d.fn[Symbol.iterator] = i[Symbol.iterator]),
            d.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, u) {
                f["[object " + u + "]"] = u.toLowerCase()
            });
            function N(a) {
                var u = !!a && "length"in a && a.length
                  , m = P(a);
                return p(a) || S(a) ? !1 : m === "array" || u === 0 || typeof u == "number" && u > 0 && u - 1 in a
            }
            function L(a, u) {
                return a.nodeName && a.nodeName.toLowerCase() === u.toLowerCase()
            }
            var O = i.pop
              , X = i.sort
              , I = i.splice
              , H = "[\\x20\\t\\r\\n\\f]"
              , q = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$","g");
            d.contains = function(a, u) {
                var m = u && u.parentNode;
                return a === m || !!(m && m.nodeType === 1 && (a.contains ? a.contains(m) : a.compareDocumentPosition && a.compareDocumentPosition(m) & 16))
            }
            ;
            var V = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
            function Q(a, u) {
                return u ? a === "\0" ? "�" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a
            }
            d.escapeSelector = function(a) {
                return (a + "").replace(V, Q)
            }
            ;
            var F = T
              , Y = l;
            (function() {
                var a, u, m, v, b, x = Y, M, z, D, j, J, ie = d.expando, G = 0, se = 0, xe = ua(), qe = ua(), Pe = ua(), Vt = ua(), zt = function(A, B) {
                    return A === B && (b = !0),
                    0
                }, lr = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ur = "(?:\\\\[\\da-fA-F]{1,6}" + H + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", $e = "\\[" + H + "*(" + ur + ")(?:" + H + "*([*^$|!~]?=)" + H + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + ur + "))|)" + H + "*\\]", dn = ":(" + ur + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + $e + ")*)|.*)\\)|)", Be = new RegExp(H + "+","g"), bt = new RegExp("^" + H + "*," + H + "*"), vs = new RegExp("^" + H + "*([>+~]|" + H + ")" + H + "*"), mo = new RegExp(H + "|>"), cr = new RegExp(dn), ys = new RegExp("^" + ur + "$"), fr = {
                    ID: new RegExp("^#(" + ur + ")"),
                    CLASS: new RegExp("^\\.(" + ur + ")"),
                    TAG: new RegExp("^(" + ur + "|[*])"),
                    ATTR: new RegExp("^" + $e),
                    PSEUDO: new RegExp("^" + dn),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + H + "*(even|odd|(([+-]|)(\\d*)n|)" + H + "*(?:([+-]|)" + H + "*(\\d+)|))" + H + "*\\)|)","i"),
                    bool: new RegExp("^(?:" + lr + ")$","i"),
                    needsContext: new RegExp("^" + H + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + H + "*((?:-\\d)?\\d*)" + H + "*\\)|)(?=[^-]|$)","i")
                }, Fr = /^(?:input|select|textarea|button)$/i, qr = /^h\d$/i, Yi = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, go = /[+~]/, Cr = new RegExp("\\\\[\\da-fA-F]{1,6}" + H + "?|\\\\([^\\r\\n\\f])","g"), Mr = function(A, B) {
                    var W = "0x" + A.slice(1) - 65536;
                    return B || (W < 0 ? String.fromCharCode(W + 65536) : String.fromCharCode(W >> 10 | 55296, W & 1023 | 56320))
                }, md = function() {
                    Br()
                }, gd = fa(function(A) {
                    return A.disabled === !0 && L(A, "fieldset")
                }, {
                    dir: "parentNode",
                    next: "legend"
                });
                function vd() {
                    try {
                        return M.activeElement
                    } catch {}
                }
                try {
                    x.apply(i = n.call(F.childNodes), F.childNodes),
                    i[F.childNodes.length].nodeType
                } catch {
                    x = {
                        apply: function(B, W) {
                            Y.apply(B, n.call(W))
                        },
                        call: function(B) {
                            Y.apply(B, n.call(arguments, 1))
                        }
                    }
                }
                function Qe(A, B, W, U) {
                    var te, ae, ue, de, ce, Ie, _e, Se = B && B.ownerDocument, ze = B ? B.nodeType : 9;
                    if (W = W || [],
                    typeof A != "string" || !A || ze !== 1 && ze !== 9 && ze !== 11)
                        return W;
                    if (!U && (Br(B),
                    B = B || M,
                    D)) {
                        if (ze !== 11 && (ce = Yi.exec(A)))
                            if (te = ce[1]) {
                                if (ze === 9)
                                    if (ue = B.getElementById(te)) {
                                        if (ue.id === te)
                                            return x.call(W, ue),
                                            W
                                    } else
                                        return W;
                                else if (Se && (ue = Se.getElementById(te)) && Qe.contains(B, ue) && ue.id === te)
                                    return x.call(W, ue),
                                    W
                            } else {
                                if (ce[2])
                                    return x.apply(W, B.getElementsByTagName(A)),
                                    W;
                                if ((te = ce[3]) && B.getElementsByClassName)
                                    return x.apply(W, B.getElementsByClassName(te)),
                                    W
                            }
                        if (!Vt[A + " "] && (!j || !j.test(A))) {
                            if (_e = A,
                            Se = B,
                            ze === 1 && (mo.test(A) || vs.test(A))) {
                                for (Se = go.test(A) && vo(B.parentNode) || B,
                                (Se != B || !g.scope) && ((de = B.getAttribute("id")) ? de = d.escapeSelector(de) : B.setAttribute("id", de = ie)),
                                Ie = ws(A),
                                ae = Ie.length; ae--; )
                                    Ie[ae] = (de ? "#" + de : ":scope") + " " + ca(Ie[ae]);
                                _e = Ie.join(",")
                            }
                            try {
                                return x.apply(W, Se.querySelectorAll(_e)),
                                W
                            } catch {
                                Vt(A, !0)
                            } finally {
                                de === ie && B.removeAttribute("id")
                            }
                        }
                    }
                    return hu(A.replace(q, "$1"), B, W, U)
                }
                function ua() {
                    var A = [];
                    function B(W, U) {
                        return A.push(W + " ") > u.cacheLength && delete B[A.shift()],
                        B[W + " "] = U
                    }
                    return B
                }
                function rr(A) {
                    return A[ie] = !0,
                    A
                }
                function Fn(A) {
                    var B = M.createElement("fieldset");
                    try {
                        return !!A(B)
                    } catch {
                        return !1
                    } finally {
                        B.parentNode && B.parentNode.removeChild(B),
                        B = null
                    }
                }
                function yd(A) {
                    return function(B) {
                        return L(B, "input") && B.type === A
                    }
                }
                function wd(A) {
                    return function(B) {
                        return (L(B, "input") || L(B, "button")) && B.type === A
                    }
                }
                function du(A) {
                    return function(B) {
                        return "form"in B ? B.parentNode && B.disabled === !1 ? "label"in B ? "label"in B.parentNode ? B.parentNode.disabled === A : B.disabled === A : B.isDisabled === A || B.isDisabled !== !A && gd(B) === A : B.disabled === A : "label"in B ? B.disabled === A : !1
                    }
                }
                function pn(A) {
                    return rr(function(B) {
                        return B = +B,
                        rr(function(W, U) {
                            for (var te, ae = A([], W.length, B), ue = ae.length; ue--; )
                                W[te = ae[ue]] && (W[te] = !(U[te] = W[te]))
                        })
                    })
                }
                function vo(A) {
                    return A && typeof A.getElementsByTagName < "u" && A
                }
                function Br(A) {
                    var B, W = A ? A.ownerDocument || A : F;
                    return W == M || W.nodeType !== 9 || !W.documentElement || (M = W,
                    z = M.documentElement,
                    D = !d.isXMLDoc(M),
                    J = z.matches || z.webkitMatchesSelector || z.msMatchesSelector,
                    z.msMatchesSelector && F != M && (B = M.defaultView) && B.top !== B && B.addEventListener("unload", md),
                    g.getById = Fn(function(U) {
                        return z.appendChild(U).id = d.expando,
                        !M.getElementsByName || !M.getElementsByName(d.expando).length
                    }),
                    g.disconnectedMatch = Fn(function(U) {
                        return J.call(U, "*")
                    }),
                    g.scope = Fn(function() {
                        return M.querySelectorAll(":scope")
                    }),
                    g.cssHas = Fn(function() {
                        try {
                            return M.querySelector(":has(*,:jqfake)"),
                            !1
                        } catch {
                            return !0
                        }
                    }),
                    g.getById ? (u.filter.ID = function(U) {
                        var te = U.replace(Cr, Mr);
                        return function(ae) {
                            return ae.getAttribute("id") === te
                        }
                    }
                    ,
                    u.find.ID = function(U, te) {
                        if (typeof te.getElementById < "u" && D) {
                            var ae = te.getElementById(U);
                            return ae ? [ae] : []
                        }
                    }
                    ) : (u.filter.ID = function(U) {
                        var te = U.replace(Cr, Mr);
                        return function(ae) {
                            var ue = typeof ae.getAttributeNode < "u" && ae.getAttributeNode("id");
                            return ue && ue.value === te
                        }
                    }
                    ,
                    u.find.ID = function(U, te) {
                        if (typeof te.getElementById < "u" && D) {
                            var ae, ue, de, ce = te.getElementById(U);
                            if (ce) {
                                if (ae = ce.getAttributeNode("id"),
                                ae && ae.value === U)
                                    return [ce];
                                for (de = te.getElementsByName(U),
                                ue = 0; ce = de[ue++]; )
                                    if (ae = ce.getAttributeNode("id"),
                                    ae && ae.value === U)
                                        return [ce]
                            }
                            return []
                        }
                    }
                    ),
                    u.find.TAG = function(U, te) {
                        return typeof te.getElementsByTagName < "u" ? te.getElementsByTagName(U) : te.querySelectorAll(U)
                    }
                    ,
                    u.find.CLASS = function(U, te) {
                        if (typeof te.getElementsByClassName < "u" && D)
                            return te.getElementsByClassName(U)
                    }
                    ,
                    j = [],
                    Fn(function(U) {
                        var te;
                        z.appendChild(U).innerHTML = "<a id='" + ie + "' href='' disabled='disabled'></a><select id='" + ie + "-\r\\' disabled='disabled'><option selected=''></option></select>",
                        U.querySelectorAll("[selected]").length || j.push("\\[" + H + "*(?:value|" + lr + ")"),
                        U.querySelectorAll("[id~=" + ie + "-]").length || j.push("~="),
                        U.querySelectorAll("a#" + ie + "+*").length || j.push(".#.+[+~]"),
                        U.querySelectorAll(":checked").length || j.push(":checked"),
                        te = M.createElement("input"),
                        te.setAttribute("type", "hidden"),
                        U.appendChild(te).setAttribute("name", "D"),
                        z.appendChild(U).disabled = !0,
                        U.querySelectorAll(":disabled").length !== 2 && j.push(":enabled", ":disabled"),
                        te = M.createElement("input"),
                        te.setAttribute("name", ""),
                        U.appendChild(te),
                        U.querySelectorAll("[name='']").length || j.push("\\[" + H + "*name" + H + "*=" + H + `*(?:''|"")`)
                    }),
                    g.cssHas || j.push(":has"),
                    j = j.length && new RegExp(j.join("|")),
                    zt = function(U, te) {
                        if (U === te)
                            return b = !0,
                            0;
                        var ae = !U.compareDocumentPosition - !te.compareDocumentPosition;
                        return ae || (ae = (U.ownerDocument || U) == (te.ownerDocument || te) ? U.compareDocumentPosition(te) : 1,
                        ae & 1 || !g.sortDetached && te.compareDocumentPosition(U) === ae ? U === M || U.ownerDocument == F && Qe.contains(F, U) ? -1 : te === M || te.ownerDocument == F && Qe.contains(F, te) ? 1 : v ? c.call(v, U) - c.call(v, te) : 0 : ae & 4 ? -1 : 1)
                    }
                    ),
                    M
                }
                Qe.matches = function(A, B) {
                    return Qe(A, null, null, B)
                }
                ,
                Qe.matchesSelector = function(A, B) {
                    if (Br(A),
                    D && !Vt[B + " "] && (!j || !j.test(B)))
                        try {
                            var W = J.call(A, B);
                            if (W || g.disconnectedMatch || A.document && A.document.nodeType !== 11)
                                return W
                        } catch {
                            Vt(B, !0)
                        }
                    return Qe(B, M, null, [A]).length > 0
                }
                ,
                Qe.contains = function(A, B) {
                    return (A.ownerDocument || A) != M && Br(A),
                    d.contains(A, B)
                }
                ,
                Qe.attr = function(A, B) {
                    (A.ownerDocument || A) != M && Br(A);
                    var W = u.attrHandle[B.toLowerCase()]
                      , U = W && w.call(u.attrHandle, B.toLowerCase()) ? W(A, B, !D) : void 0;
                    return U !== void 0 ? U : A.getAttribute(B)
                }
                ,
                Qe.error = function(A) {
                    throw new Error("Syntax error, unrecognized expression: " + A)
                }
                ,
                d.uniqueSort = function(A) {
                    var B, W = [], U = 0, te = 0;
                    if (b = !g.sortStable,
                    v = !g.sortStable && n.call(A, 0),
                    X.call(A, zt),
                    b) {
                        for (; B = A[te++]; )
                            B === A[te] && (U = W.push(te));
                        for (; U--; )
                            I.call(A, W[U], 1)
                    }
                    return v = null,
                    A
                }
                ,
                d.fn.uniqueSort = function() {
                    return this.pushStack(d.uniqueSort(n.apply(this)))
                }
                ,
                u = d.expr = {
                    cacheLength: 50,
                    createPseudo: rr,
                    match: fr,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(A) {
                            return A[1] = A[1].replace(Cr, Mr),
                            A[3] = (A[3] || A[4] || A[5] || "").replace(Cr, Mr),
                            A[2] === "~=" && (A[3] = " " + A[3] + " "),
                            A.slice(0, 4)
                        },
                        CHILD: function(A) {
                            return A[1] = A[1].toLowerCase(),
                            A[1].slice(0, 3) === "nth" ? (A[3] || Qe.error(A[0]),
                            A[4] = +(A[4] ? A[5] + (A[6] || 1) : 2 * (A[3] === "even" || A[3] === "odd")),
                            A[5] = +(A[7] + A[8] || A[3] === "odd")) : A[3] && Qe.error(A[0]),
                            A
                        },
                        PSEUDO: function(A) {
                            var B, W = !A[6] && A[2];
                            return fr.CHILD.test(A[0]) ? null : (A[3] ? A[2] = A[4] || A[5] || "" : W && cr.test(W) && (B = ws(W, !0)) && (B = W.indexOf(")", W.length - B) - W.length) && (A[0] = A[0].slice(0, B),
                            A[2] = W.slice(0, B)),
                            A.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(A) {
                            var B = A.replace(Cr, Mr).toLowerCase();
                            return A === "*" ? function() {
                                return !0
                            }
                            : function(W) {
                                return L(W, B)
                            }
                        },
                        CLASS: function(A) {
                            var B = xe[A + " "];
                            return B || (B = new RegExp("(^|" + H + ")" + A + "(" + H + "|$)")) && xe(A, function(W) {
                                return B.test(typeof W.className == "string" && W.className || typeof W.getAttribute < "u" && W.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(A, B, W) {
                            return function(U) {
                                var te = Qe.attr(U, A);
                                return te == null ? B === "!=" : B ? (te += "",
                                B === "=" ? te === W : B === "!=" ? te !== W : B === "^=" ? W && te.indexOf(W) === 0 : B === "*=" ? W && te.indexOf(W) > -1 : B === "$=" ? W && te.slice(-W.length) === W : B === "~=" ? (" " + te.replace(Be, " ") + " ").indexOf(W) > -1 : B === "|=" ? te === W || te.slice(0, W.length + 1) === W + "-" : !1) : !0
                            }
                        },
                        CHILD: function(A, B, W, U, te) {
                            var ae = A.slice(0, 3) !== "nth"
                              , ue = A.slice(-4) !== "last"
                              , de = B === "of-type";
                            return U === 1 && te === 0 ? function(ce) {
                                return !!ce.parentNode
                            }
                            : function(ce, Ie, _e) {
                                var Se, ze, ve, lt, wi, ei = ae !== ue ? "nextSibling" : "previousSibling", Wi = ce.parentNode, dr = de && ce.nodeName.toLowerCase(), qn = !_e && !de, oi = !1;
                                if (Wi) {
                                    if (ae) {
                                        for (; ei; ) {
                                            for (ve = ce; ve = ve[ei]; )
                                                if (de ? L(ve, dr) : ve.nodeType === 1)
                                                    return !1;
                                            wi = ei = A === "only" && !wi && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (wi = [ue ? Wi.firstChild : Wi.lastChild],
                                    ue && qn) {
                                        for (ze = Wi[ie] || (Wi[ie] = {}),
                                        Se = ze[A] || [],
                                        lt = Se[0] === G && Se[1],
                                        oi = lt && Se[2],
                                        ve = lt && Wi.childNodes[lt]; ve = ++lt && ve && ve[ei] || (oi = lt = 0) || wi.pop(); )
                                            if (ve.nodeType === 1 && ++oi && ve === ce) {
                                                ze[A] = [G, lt, oi];
                                                break
                                            }
                                    } else if (qn && (ze = ce[ie] || (ce[ie] = {}),
                                    Se = ze[A] || [],
                                    lt = Se[0] === G && Se[1],
                                    oi = lt),
                                    oi === !1)
                                        for (; (ve = ++lt && ve && ve[ei] || (oi = lt = 0) || wi.pop()) && !((de ? L(ve, dr) : ve.nodeType === 1) && ++oi && (qn && (ze = ve[ie] || (ve[ie] = {}),
                                        ze[A] = [G, oi]),
                                        ve === ce)); )
                                            ;
                                    return oi -= te,
                                    oi === U || oi % U === 0 && oi / U >= 0
                                }
                            }
                        },
                        PSEUDO: function(A, B) {
                            var W, U = u.pseudos[A] || u.setFilters[A.toLowerCase()] || Qe.error("unsupported pseudo: " + A);
                            return U[ie] ? U(B) : U.length > 1 ? (W = [A, A, "", B],
                            u.setFilters.hasOwnProperty(A.toLowerCase()) ? rr(function(te, ae) {
                                for (var ue, de = U(te, B), ce = de.length; ce--; )
                                    ue = c.call(te, de[ce]),
                                    te[ue] = !(ae[ue] = de[ce])
                            }) : function(te) {
                                return U(te, 0, W)
                            }
                            ) : U
                        }
                    },
                    pseudos: {
                        not: rr(function(A) {
                            var B = []
                              , W = []
                              , U = bo(A.replace(q, "$1"));
                            return U[ie] ? rr(function(te, ae, ue, de) {
                                for (var ce, Ie = U(te, null, de, []), _e = te.length; _e--; )
                                    (ce = Ie[_e]) && (te[_e] = !(ae[_e] = ce))
                            }) : function(te, ae, ue) {
                                return B[0] = te,
                                U(B, null, ue, W),
                                B[0] = null,
                                !W.pop()
                            }
                        }),
                        has: rr(function(A) {
                            return function(B) {
                                return Qe(A, B).length > 0
                            }
                        }),
                        contains: rr(function(A) {
                            return A = A.replace(Cr, Mr),
                            function(B) {
                                return (B.textContent || d.text(B)).indexOf(A) > -1
                            }
                        }),
                        lang: rr(function(A) {
                            return ys.test(A || "") || Qe.error("unsupported lang: " + A),
                            A = A.replace(Cr, Mr).toLowerCase(),
                            function(B) {
                                var W;
                                do
                                    if (W = D ? B.lang : B.getAttribute("xml:lang") || B.getAttribute("lang"))
                                        return W = W.toLowerCase(),
                                        W === A || W.indexOf(A + "-") === 0;
                                while ((B = B.parentNode) && B.nodeType === 1);
                                return !1
                            }
                        }),
                        target: function(A) {
                            var B = e.location && e.location.hash;
                            return B && B.slice(1) === A.id
                        },
                        root: function(A) {
                            return A === z
                        },
                        focus: function(A) {
                            return A === vd() && M.hasFocus() && !!(A.type || A.href || ~A.tabIndex)
                        },
                        enabled: du(!1),
                        disabled: du(!0),
                        checked: function(A) {
                            return L(A, "input") && !!A.checked || L(A, "option") && !!A.selected
                        },
                        selected: function(A) {
                            return A.parentNode && A.parentNode.selectedIndex,
                            A.selected === !0
                        },
                        empty: function(A) {
                            for (A = A.firstChild; A; A = A.nextSibling)
                                if (A.nodeType < 6)
                                    return !1;
                            return !0
                        },
                        parent: function(A) {
                            return !u.pseudos.empty(A)
                        },
                        header: function(A) {
                            return qr.test(A.nodeName)
                        },
                        input: function(A) {
                            return Fr.test(A.nodeName)
                        },
                        button: function(A) {
                            return L(A, "input") && A.type === "button" || L(A, "button")
                        },
                        text: function(A) {
                            var B;
                            return L(A, "input") && A.type === "text" && ((B = A.getAttribute("type")) == null || B.toLowerCase() === "text")
                        },
                        first: pn(function() {
                            return [0]
                        }),
                        last: pn(function(A, B) {
                            return [B - 1]
                        }),
                        eq: pn(function(A, B, W) {
                            return [W < 0 ? W + B : W]
                        }),
                        even: pn(function(A, B) {
                            for (var W = 0; W < B; W += 2)
                                A.push(W);
                            return A
                        }),
                        odd: pn(function(A, B) {
                            for (var W = 1; W < B; W += 2)
                                A.push(W);
                            return A
                        }),
                        lt: pn(function(A, B, W) {
                            var U;
                            for (W < 0 ? U = W + B : W > B ? U = B : U = W; --U >= 0; )
                                A.push(U);
                            return A
                        }),
                        gt: pn(function(A, B, W) {
                            for (var U = W < 0 ? W + B : W; ++U < B; )
                                A.push(U);
                            return A
                        })
                    }
                },
                u.pseudos.nth = u.pseudos.eq;
                for (a in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                })
                    u.pseudos[a] = yd(a);
                for (a in {
                    submit: !0,
                    reset: !0
                })
                    u.pseudos[a] = wd(a);
                function pu() {}
                pu.prototype = u.filters = u.pseudos,
                u.setFilters = new pu;
                function ws(A, B) {
                    var W, U, te, ae, ue, de, ce, Ie = qe[A + " "];
                    if (Ie)
                        return B ? 0 : Ie.slice(0);
                    for (ue = A,
                    de = [],
                    ce = u.preFilter; ue; ) {
                        (!W || (U = bt.exec(ue))) && (U && (ue = ue.slice(U[0].length) || ue),
                        de.push(te = [])),
                        W = !1,
                        (U = vs.exec(ue)) && (W = U.shift(),
                        te.push({
                            value: W,
                            type: U[0].replace(q, " ")
                        }),
                        ue = ue.slice(W.length));
                        for (ae in u.filter)
                            (U = fr[ae].exec(ue)) && (!ce[ae] || (U = ce[ae](U))) && (W = U.shift(),
                            te.push({
                                value: W,
                                type: ae,
                                matches: U
                            }),
                            ue = ue.slice(W.length));
                        if (!W)
                            break
                    }
                    return B ? ue.length : ue ? Qe.error(A) : qe(A, de).slice(0)
                }
                function ca(A) {
                    for (var B = 0, W = A.length, U = ""; B < W; B++)
                        U += A[B].value;
                    return U
                }
                function fa(A, B, W) {
                    var U = B.dir
                      , te = B.next
                      , ae = te || U
                      , ue = W && ae === "parentNode"
                      , de = se++;
                    return B.first ? function(ce, Ie, _e) {
                        for (; ce = ce[U]; )
                            if (ce.nodeType === 1 || ue)
                                return A(ce, Ie, _e);
                        return !1
                    }
                    : function(ce, Ie, _e) {
                        var Se, ze, ve = [G, de];
                        if (_e) {
                            for (; ce = ce[U]; )
                                if ((ce.nodeType === 1 || ue) && A(ce, Ie, _e))
                                    return !0
                        } else
                            for (; ce = ce[U]; )
                                if (ce.nodeType === 1 || ue)
                                    if (ze = ce[ie] || (ce[ie] = {}),
                                    te && L(ce, te))
                                        ce = ce[U] || ce;
                                    else {
                                        if ((Se = ze[ae]) && Se[0] === G && Se[1] === de)
                                            return ve[2] = Se[2];
                                        if (ze[ae] = ve,
                                        ve[2] = A(ce, Ie, _e))
                                            return !0
                                    }
                        return !1
                    }
                }
                function yo(A) {
                    return A.length > 1 ? function(B, W, U) {
                        for (var te = A.length; te--; )
                            if (!A[te](B, W, U))
                                return !1;
                        return !0
                    }
                    : A[0]
                }
                function _d(A, B, W) {
                    for (var U = 0, te = B.length; U < te; U++)
                        Qe(A, B[U], W);
                    return W
                }
                function da(A, B, W, U, te) {
                    for (var ae, ue = [], de = 0, ce = A.length, Ie = B != null; de < ce; de++)
                        (ae = A[de]) && (!W || W(ae, U, te)) && (ue.push(ae),
                        Ie && B.push(de));
                    return ue
                }
                function wo(A, B, W, U, te, ae) {
                    return U && !U[ie] && (U = wo(U)),
                    te && !te[ie] && (te = wo(te, ae)),
                    rr(function(ue, de, ce, Ie) {
                        var _e, Se, ze, ve, lt = [], wi = [], ei = de.length, Wi = ue || _d(B || "*", ce.nodeType ? [ce] : ce, []), dr = A && (ue || !B) ? da(Wi, lt, A, ce, Ie) : Wi;
                        if (W ? (ve = te || (ue ? A : ei || U) ? [] : de,
                        W(dr, ve, ce, Ie)) : ve = dr,
                        U)
                            for (_e = da(ve, wi),
                            U(_e, [], ce, Ie),
                            Se = _e.length; Se--; )
                                (ze = _e[Se]) && (ve[wi[Se]] = !(dr[wi[Se]] = ze));
                        if (ue) {
                            if (te || A) {
                                if (te) {
                                    for (_e = [],
                                    Se = ve.length; Se--; )
                                        (ze = ve[Se]) && _e.push(dr[Se] = ze);
                                    te(null, ve = [], _e, Ie)
                                }
                                for (Se = ve.length; Se--; )
                                    (ze = ve[Se]) && (_e = te ? c.call(ue, ze) : lt[Se]) > -1 && (ue[_e] = !(de[_e] = ze))
                            }
                        } else
                            ve = da(ve === de ? ve.splice(ei, ve.length) : ve),
                            te ? te(null, de, ve, Ie) : x.apply(de, ve)
                    })
                }
                function _o(A) {
                    for (var B, W, U, te = A.length, ae = u.relative[A[0].type], ue = ae || u.relative[" "], de = ae ? 1 : 0, ce = fa(function(Se) {
                        return Se === B
                    }, ue, !0), Ie = fa(function(Se) {
                        return c.call(B, Se) > -1
                    }, ue, !0), _e = [function(Se, ze, ve) {
                        var lt = !ae && (ve || ze != m) || ((B = ze).nodeType ? ce(Se, ze, ve) : Ie(Se, ze, ve));
                        return B = null,
                        lt
                    }
                    ]; de < te; de++)
                        if (W = u.relative[A[de].type])
                            _e = [fa(yo(_e), W)];
                        else {
                            if (W = u.filter[A[de].type].apply(null, A[de].matches),
                            W[ie]) {
                                for (U = ++de; U < te && !u.relative[A[U].type]; U++)
                                    ;
                                return wo(de > 1 && yo(_e), de > 1 && ca(A.slice(0, de - 1).concat({
                                    value: A[de - 2].type === " " ? "*" : ""
                                })).replace(q, "$1"), W, de < U && _o(A.slice(de, U)), U < te && _o(A = A.slice(U)), U < te && ca(A))
                            }
                            _e.push(W)
                        }
                    return yo(_e)
                }
                function bd(A, B) {
                    var W = B.length > 0
                      , U = A.length > 0
                      , te = function(ae, ue, de, ce, Ie) {
                        var _e, Se, ze, ve = 0, lt = "0", wi = ae && [], ei = [], Wi = m, dr = ae || U && u.find.TAG("*", Ie), qn = G += Wi == null ? 1 : Math.random() || .1, oi = dr.length;
                        for (Ie && (m = ue == M || ue || Ie); lt !== oi && (_e = dr[lt]) != null; lt++) {
                            if (U && _e) {
                                for (Se = 0,
                                !ue && _e.ownerDocument != M && (Br(_e),
                                de = !D); ze = A[Se++]; )
                                    if (ze(_e, ue || M, de)) {
                                        x.call(ce, _e);
                                        break
                                    }
                                Ie && (G = qn)
                            }
                            W && ((_e = !ze && _e) && ve--,
                            ae && wi.push(_e))
                        }
                        if (ve += lt,
                        W && lt !== ve) {
                            for (Se = 0; ze = B[Se++]; )
                                ze(wi, ei, ue, de);
                            if (ae) {
                                if (ve > 0)
                                    for (; lt--; )
                                        wi[lt] || ei[lt] || (ei[lt] = O.call(ce));
                                ei = da(ei)
                            }
                            x.apply(ce, ei),
                            Ie && !ae && ei.length > 0 && ve + B.length > 1 && d.uniqueSort(ce)
                        }
                        return Ie && (G = qn,
                        m = Wi),
                        wi
                    };
                    return W ? rr(te) : te
                }
                function bo(A, B) {
                    var W, U = [], te = [], ae = Pe[A + " "];
                    if (!ae) {
                        for (B || (B = ws(A)),
                        W = B.length; W--; )
                            ae = _o(B[W]),
                            ae[ie] ? U.push(ae) : te.push(ae);
                        ae = Pe(A, bd(te, U)),
                        ae.selector = A
                    }
                    return ae
                }
                function hu(A, B, W, U) {
                    var te, ae, ue, de, ce, Ie = typeof A == "function" && A, _e = !U && ws(A = Ie.selector || A);
                    if (W = W || [],
                    _e.length === 1) {
                        if (ae = _e[0] = _e[0].slice(0),
                        ae.length > 2 && (ue = ae[0]).type === "ID" && B.nodeType === 9 && D && u.relative[ae[1].type]) {
                            if (B = (u.find.ID(ue.matches[0].replace(Cr, Mr), B) || [])[0],
                            B)
                                Ie && (B = B.parentNode);
                            else
                                return W;
                            A = A.slice(ae.shift().value.length)
                        }
                        for (te = fr.needsContext.test(A) ? 0 : ae.length; te-- && (ue = ae[te],
                        !u.relative[de = ue.type]); )
                            if ((ce = u.find[de]) && (U = ce(ue.matches[0].replace(Cr, Mr), go.test(ae[0].type) && vo(B.parentNode) || B))) {
                                if (ae.splice(te, 1),
                                A = U.length && ca(ae),
                                !A)
                                    return x.apply(W, U),
                                    W;
                                break
                            }
                    }
                    return (Ie || bo(A, _e))(U, B, !D, W, !B || go.test(A) && vo(B.parentNode) || B),
                    W
                }
                g.sortStable = ie.split("").sort(zt).join("") === ie,
                Br(),
                g.sortDetached = Fn(function(A) {
                    return A.compareDocumentPosition(M.createElement("fieldset")) & 1
                }),
                d.find = Qe,
                d.expr[":"] = d.expr.pseudos,
                d.unique = d.uniqueSort,
                Qe.compile = bo,
                Qe.select = hu,
                Qe.setDocument = Br,
                Qe.tokenize = ws,
                Qe.escape = d.escapeSelector,
                Qe.getText = d.text,
                Qe.isXML = d.isXMLDoc,
                Qe.selectors = d.expr,
                Qe.support = d.support,
                Qe.uniqueSort = d.uniqueSort
            }
            )();
            var Z = function(a, u, m) {
                for (var v = [], b = m !== void 0; (a = a[u]) && a.nodeType !== 9; )
                    if (a.nodeType === 1) {
                        if (b && d(a).is(m))
                            break;
                        v.push(a)
                    }
                return v
            }
              , $ = function(a, u) {
                for (var m = []; a; a = a.nextSibling)
                    a.nodeType === 1 && a !== u && m.push(a);
                return m
            }
              , he = d.expr.match.needsContext
              , Oe = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
            function nt(a, u, m) {
                return p(u) ? d.grep(a, function(v, b) {
                    return !!u.call(v, b, v) !== m
                }) : u.nodeType ? d.grep(a, function(v) {
                    return v === u !== m
                }) : typeof u != "string" ? d.grep(a, function(v) {
                    return c.call(u, v) > -1 !== m
                }) : d.filter(u, a, m)
            }
            d.filter = function(a, u, m) {
                var v = u[0];
                return m && (a = ":not(" + a + ")"),
                u.length === 1 && v.nodeType === 1 ? d.find.matchesSelector(v, a) ? [v] : [] : d.find.matches(a, d.grep(u, function(b) {
                    return b.nodeType === 1
                }))
            }
            ,
            d.fn.extend({
                find: function(a) {
                    var u, m, v = this.length, b = this;
                    if (typeof a != "string")
                        return this.pushStack(d(a).filter(function() {
                            for (u = 0; u < v; u++)
                                if (d.contains(b[u], this))
                                    return !0
                        }));
                    for (m = this.pushStack([]),
                    u = 0; u < v; u++)
                        d.find(a, b[u], m);
                    return v > 1 ? d.uniqueSort(m) : m
                },
                filter: function(a) {
                    return this.pushStack(nt(this, a || [], !1))
                },
                not: function(a) {
                    return this.pushStack(nt(this, a || [], !0))
                },
                is: function(a) {
                    return !!nt(this, typeof a == "string" && he.test(a) ? d(a) : a || [], !1).length
                }
            });
            var je, re = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, ee = d.fn.init = function(a, u, m) {
                var v, b;
                if (!a)
                    return this;
                if (m = m || je,
                typeof a == "string")
                    if (a[0] === "<" && a[a.length - 1] === ">" && a.length >= 3 ? v = [null, a, null] : v = re.exec(a),
                    v && (v[1] || !u))
                        if (v[1]) {
                            if (u = u instanceof d ? u[0] : u,
                            d.merge(this, d.parseHTML(v[1], u && u.nodeType ? u.ownerDocument || u : T, !0)),
                            Oe.test(v[1]) && d.isPlainObject(u))
                                for (v in u)
                                    p(this[v]) ? this[v](u[v]) : this.attr(v, u[v]);
                            return this
                        } else
                            return b = T.getElementById(v[2]),
                            b && (this[0] = b,
                            this.length = 1),
                            this;
                    else
                        return !u || u.jquery ? (u || m).find(a) : this.constructor(u).find(a);
                else {
                    if (a.nodeType)
                        return this[0] = a,
                        this.length = 1,
                        this;
                    if (p(a))
                        return m.ready !== void 0 ? m.ready(a) : a(d)
                }
                return d.makeArray(a, this)
            }
            ;
            ee.prototype = d.fn,
            je = d(T);
            var ne = /^(?:parents|prev(?:Until|All))/
              , me = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
            d.fn.extend({
                has: function(a) {
                    var u = d(a, this)
                      , m = u.length;
                    return this.filter(function() {
                        for (var v = 0; v < m; v++)
                            if (d.contains(this, u[v]))
                                return !0
                    })
                },
                closest: function(a, u) {
                    var m, v = 0, b = this.length, x = [], M = typeof a != "string" && d(a);
                    if (!he.test(a)) {
                        for (; v < b; v++)
                            for (m = this[v]; m && m !== u; m = m.parentNode)
                                if (m.nodeType < 11 && (M ? M.index(m) > -1 : m.nodeType === 1 && d.find.matchesSelector(m, a))) {
                                    x.push(m);
                                    break
                                }
                    }
                    return this.pushStack(x.length > 1 ? d.uniqueSort(x) : x)
                },
                index: function(a) {
                    return a ? typeof a == "string" ? c.call(d(a), this[0]) : c.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function(a, u) {
                    return this.pushStack(d.uniqueSort(d.merge(this.get(), d(a, u))))
                },
                addBack: function(a) {
                    return this.add(a == null ? this.prevObject : this.prevObject.filter(a))
                }
            });
            function Ne(a, u) {
                for (; (a = a[u]) && a.nodeType !== 1; )
                    ;
                return a
            }
            d.each({
                parent: function(a) {
                    var u = a.parentNode;
                    return u && u.nodeType !== 11 ? u : null
                },
                parents: function(a) {
                    return Z(a, "parentNode")
                },
                parentsUntil: function(a, u, m) {
                    return Z(a, "parentNode", m)
                },
                next: function(a) {
                    return Ne(a, "nextSibling")
                },
                prev: function(a) {
                    return Ne(a, "previousSibling")
                },
                nextAll: function(a) {
                    return Z(a, "nextSibling")
                },
                prevAll: function(a) {
                    return Z(a, "previousSibling")
                },
                nextUntil: function(a, u, m) {
                    return Z(a, "nextSibling", m)
                },
                prevUntil: function(a, u, m) {
                    return Z(a, "previousSibling", m)
                },
                siblings: function(a) {
                    return $((a.parentNode || {}).firstChild, a)
                },
                children: function(a) {
                    return $(a.firstChild)
                },
                contents: function(a) {
                    return a.contentDocument != null && r(a.contentDocument) ? a.contentDocument : (L(a, "template") && (a = a.content || a),
                    d.merge([], a.childNodes))
                }
            }, function(a, u) {
                d.fn[a] = function(m, v) {
                    var b = d.map(this, u, m);
                    return a.slice(-5) !== "Until" && (v = m),
                    v && typeof v == "string" && (b = d.filter(v, b)),
                    this.length > 1 && (me[a] || d.uniqueSort(b),
                    ne.test(a) && b.reverse()),
                    this.pushStack(b)
                }
            });
            var Je = /[^\x20\t\r\n\f]+/g;
            function st(a) {
                var u = {};
                return d.each(a.match(Je) || [], function(m, v) {
                    u[v] = !0
                }),
                u
            }
            d.Callbacks = function(a) {
                a = typeof a == "string" ? st(a) : d.extend({}, a);
                var u, m, v, b, x = [], M = [], z = -1, D = function() {
                    for (b = b || a.once,
                    v = u = !0; M.length; z = -1)
                        for (m = M.shift(); ++z < x.length; )
                            x[z].apply(m[0], m[1]) === !1 && a.stopOnFalse && (z = x.length,
                            m = !1);
                    a.memory || (m = !1),
                    u = !1,
                    b && (m ? x = [] : x = "")
                }, j = {
                    add: function() {
                        return x && (m && !u && (z = x.length - 1,
                        M.push(m)),
                        function J(ie) {
                            d.each(ie, function(G, se) {
                                p(se) ? (!a.unique || !j.has(se)) && x.push(se) : se && se.length && P(se) !== "string" && J(se)
                            })
                        }(arguments),
                        m && !u && D()),
                        this
                    },
                    remove: function() {
                        return d.each(arguments, function(J, ie) {
                            for (var G; (G = d.inArray(ie, x, G)) > -1; )
                                x.splice(G, 1),
                                G <= z && z--
                        }),
                        this
                    },
                    has: function(J) {
                        return J ? d.inArray(J, x) > -1 : x.length > 0
                    },
                    empty: function() {
                        return x && (x = []),
                        this
                    },
                    disable: function() {
                        return b = M = [],
                        x = m = "",
                        this
                    },
                    disabled: function() {
                        return !x
                    },
                    lock: function() {
                        return b = M = [],
                        !m && !u && (x = m = ""),
                        this
                    },
                    locked: function() {
                        return !!b
                    },
                    fireWith: function(J, ie) {
                        return b || (ie = ie || [],
                        ie = [J, ie.slice ? ie.slice() : ie],
                        M.push(ie),
                        u || D()),
                        this
                    },
                    fire: function() {
                        return j.fireWith(this, arguments),
                        this
                    },
                    fired: function() {
                        return !!v
                    }
                };
                return j
            }
            ;
            function Xe(a) {
                return a
            }
            function be(a) {
                throw a
            }
            function Ee(a, u, m, v) {
                var b;
                try {
                    a && p(b = a.promise) ? b.call(a).done(u).fail(m) : a && p(b = a.then) ? b.call(a, u, m) : u.apply(void 0, [a].slice(v))
                } catch (x) {
                    m.apply(void 0, [x])
                }
            }
            d.extend({
                Deferred: function(a) {
                    var u = [["notify", "progress", d.Callbacks("memory"), d.Callbacks("memory"), 2], ["resolve", "done", d.Callbacks("once memory"), d.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", d.Callbacks("once memory"), d.Callbacks("once memory"), 1, "rejected"]]
                      , m = "pending"
                      , v = {
                        state: function() {
                            return m
                        },
                        always: function() {
                            return b.done(arguments).fail(arguments),
                            this
                        },
                        catch: function(x) {
                            return v.then(null, x)
                        },
                        pipe: function() {
                            var x = arguments;
                            return d.Deferred(function(M) {
                                d.each(u, function(z, D) {
                                    var j = p(x[D[4]]) && x[D[4]];
                                    b[D[1]](function() {
                                        var J = j && j.apply(this, arguments);
                                        J && p(J.promise) ? J.promise().progress(M.notify).done(M.resolve).fail(M.reject) : M[D[0] + "With"](this, j ? [J] : arguments)
                                    })
                                }),
                                x = null
                            }).promise()
                        },
                        then: function(x, M, z) {
                            var D = 0;
                            function j(J, ie, G, se) {
                                return function() {
                                    var xe = this
                                      , qe = arguments
                                      , Pe = function() {
                                        var zt, lr;
                                        if (!(J < D)) {
                                            if (zt = G.apply(xe, qe),
                                            zt === ie.promise())
                                                throw new TypeError("Thenable self-resolution");
                                            lr = zt && (typeof zt == "object" || typeof zt == "function") && zt.then,
                                            p(lr) ? se ? lr.call(zt, j(D, ie, Xe, se), j(D, ie, be, se)) : (D++,
                                            lr.call(zt, j(D, ie, Xe, se), j(D, ie, be, se), j(D, ie, Xe, ie.notifyWith))) : (G !== Xe && (xe = void 0,
                                            qe = [zt]),
                                            (se || ie.resolveWith)(xe, qe))
                                        }
                                    }
                                      , Vt = se ? Pe : function() {
                                        try {
                                            Pe()
                                        } catch (zt) {
                                            d.Deferred.exceptionHook && d.Deferred.exceptionHook(zt, Vt.error),
                                            J + 1 >= D && (G !== be && (xe = void 0,
                                            qe = [zt]),
                                            ie.rejectWith(xe, qe))
                                        }
                                    }
                                    ;
                                    J ? Vt() : (d.Deferred.getErrorHook ? Vt.error = d.Deferred.getErrorHook() : d.Deferred.getStackHook && (Vt.error = d.Deferred.getStackHook()),
                                    e.setTimeout(Vt))
                                }
                            }
                            return d.Deferred(function(J) {
                                u[0][3].add(j(0, J, p(z) ? z : Xe, J.notifyWith)),
                                u[1][3].add(j(0, J, p(x) ? x : Xe)),
                                u[2][3].add(j(0, J, p(M) ? M : be))
                            }).promise()
                        },
                        promise: function(x) {
                            return x != null ? d.extend(x, v) : v
                        }
                    }
                      , b = {};
                    return d.each(u, function(x, M) {
                        var z = M[2]
                          , D = M[5];
                        v[M[1]] = z.add,
                        D && z.add(function() {
                            m = D
                        }, u[3 - x][2].disable, u[3 - x][3].disable, u[0][2].lock, u[0][3].lock),
                        z.add(M[3].fire),
                        b[M[0]] = function() {
                            return b[M[0] + "With"](this === b ? void 0 : this, arguments),
                            this
                        }
                        ,
                        b[M[0] + "With"] = z.fireWith
                    }),
                    v.promise(b),
                    a && a.call(b, b),
                    b
                },
                when: function(a) {
                    var u = arguments.length
                      , m = u
                      , v = Array(m)
                      , b = n.call(arguments)
                      , x = d.Deferred()
                      , M = function(z) {
                        return function(D) {
                            v[z] = this,
                            b[z] = arguments.length > 1 ? n.call(arguments) : D,
                            --u || x.resolveWith(v, b)
                        }
                    };
                    if (u <= 1 && (Ee(a, x.done(M(m)).resolve, x.reject, !u),
                    x.state() === "pending" || p(b[m] && b[m].then)))
                        return x.then();
                    for (; m--; )
                        Ee(b[m], M(m), x.reject);
                    return x.promise()
                }
            });
            var et = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            d.Deferred.exceptionHook = function(a, u) {
                e.console && e.console.warn && a && et.test(a.name) && e.console.warn("jQuery.Deferred exception: " + a.message, a.stack, u)
            }
            ,
            d.readyException = function(a) {
                e.setTimeout(function() {
                    throw a
                })
            }
            ;
            var mt = d.Deferred();
            d.fn.ready = function(a) {
                return mt.then(a).catch(function(u) {
                    d.readyException(u)
                }),
                this
            }
            ,
            d.extend({
                isReady: !1,
                readyWait: 1,
                ready: function(a) {
                    (a === !0 ? --d.readyWait : d.isReady) || (d.isReady = !0,
                    !(a !== !0 && --d.readyWait > 0) && mt.resolveWith(T, [d]))
                }
            }),
            d.ready.then = mt.then;
            function K() {
                T.removeEventListener("DOMContentLoaded", K),
                e.removeEventListener("load", K),
                d.ready()
            }
            T.readyState === "complete" || T.readyState !== "loading" && !T.documentElement.doScroll ? e.setTimeout(d.ready) : (T.addEventListener("DOMContentLoaded", K),
            e.addEventListener("load", K));
            var Ye = function(a, u, m, v, b, x, M) {
                var z = 0
                  , D = a.length
                  , j = m == null;
                if (P(m) === "object") {
                    b = !0;
                    for (z in m)
                        Ye(a, u, z, m[z], !0, x, M)
                } else if (v !== void 0 && (b = !0,
                p(v) || (M = !0),
                j && (M ? (u.call(a, v),
                u = null) : (j = u,
                u = function(J, ie, G) {
                    return j.call(d(J), G)
                }
                )),
                u))
                    for (; z < D; z++)
                        u(a[z], m, M ? v : v.call(a[z], z, u(a[z], m)));
                return b ? a : j ? u.call(a) : D ? u(a[0], m) : x
            }
              , $t = /^-ms-/
              , ai = /-([a-z])/g;
            function Ke(a, u) {
                return u.toUpperCase()
            }
            function ct(a) {
                return a.replace($t, "ms-").replace(ai, Ke)
            }
            var Ht = function(a) {
                return a.nodeType === 1 || a.nodeType === 9 || !+a.nodeType
            };
            function Yt() {
                this.expando = d.expando + Yt.uid++
            }
            Yt.uid = 1,
            Yt.prototype = {
                cache: function(a) {
                    var u = a[this.expando];
                    return u || (u = {},
                    Ht(a) && (a.nodeType ? a[this.expando] = u : Object.defineProperty(a, this.expando, {
                        value: u,
                        configurable: !0
                    }))),
                    u
                },
                set: function(a, u, m) {
                    var v, b = this.cache(a);
                    if (typeof u == "string")
                        b[ct(u)] = m;
                    else
                        for (v in u)
                            b[ct(v)] = u[v];
                    return b
                },
                get: function(a, u) {
                    return u === void 0 ? this.cache(a) : a[this.expando] && a[this.expando][ct(u)]
                },
                access: function(a, u, m) {
                    return u === void 0 || u && typeof u == "string" && m === void 0 ? this.get(a, u) : (this.set(a, u, m),
                    m !== void 0 ? m : u)
                },
                remove: function(a, u) {
                    var m, v = a[this.expando];
                    if (v !== void 0) {
                        if (u !== void 0)
                            for (Array.isArray(u) ? u = u.map(ct) : (u = ct(u),
                            u = u in v ? [u] : u.match(Je) || []),
                            m = u.length; m--; )
                                delete v[u[m]];
                        (u === void 0 || d.isEmptyObject(v)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
                    }
                },
                hasData: function(a) {
                    var u = a[this.expando];
                    return u !== void 0 && !d.isEmptyObject(u)
                }
            };
            var oe = new Yt
              , tt = new Yt
              , We = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
              , Zt = /[A-Z]/g;
            function Ct(a) {
                return a === "true" ? !0 : a === "false" ? !1 : a === "null" ? null : a === +a + "" ? +a : We.test(a) ? JSON.parse(a) : a
            }
            function ji(a, u, m) {
                var v;
                if (m === void 0 && a.nodeType === 1)
                    if (v = "data-" + u.replace(Zt, "-$&").toLowerCase(),
                    m = a.getAttribute(v),
                    typeof m == "string") {
                        try {
                            m = Ct(m)
                        } catch {}
                        tt.set(a, u, m)
                    } else
                        m = void 0;
                return m
            }
            d.extend({
                hasData: function(a) {
                    return tt.hasData(a) || oe.hasData(a)
                },
                data: function(a, u, m) {
                    return tt.access(a, u, m)
                },
                removeData: function(a, u) {
                    tt.remove(a, u)
                },
                _data: function(a, u, m) {
                    return oe.access(a, u, m)
                },
                _removeData: function(a, u) {
                    oe.remove(a, u)
                }
            }),
            d.fn.extend({
                data: function(a, u) {
                    var m, v, b, x = this[0], M = x && x.attributes;
                    if (a === void 0) {
                        if (this.length && (b = tt.get(x),
                        x.nodeType === 1 && !oe.get(x, "hasDataAttrs"))) {
                            for (m = M.length; m--; )
                                M[m] && (v = M[m].name,
                                v.indexOf("data-") === 0 && (v = ct(v.slice(5)),
                                ji(x, v, b[v])));
                            oe.set(x, "hasDataAttrs", !0)
                        }
                        return b
                    }
                    return typeof a == "object" ? this.each(function() {
                        tt.set(this, a)
                    }) : Ye(this, function(z) {
                        var D;
                        if (x && z === void 0)
                            return D = tt.get(x, a),
                            D !== void 0 || (D = ji(x, a),
                            D !== void 0) ? D : void 0;
                        this.each(function() {
                            tt.set(this, a, z)
                        })
                    }, null, u, arguments.length > 1, null, !0)
                },
                removeData: function(a) {
                    return this.each(function() {
                        tt.remove(this, a)
                    })
                }
            }),
            d.extend({
                queue: function(a, u, m) {
                    var v;
                    if (a)
                        return u = (u || "fx") + "queue",
                        v = oe.get(a, u),
                        m && (!v || Array.isArray(m) ? v = oe.access(a, u, d.makeArray(m)) : v.push(m)),
                        v || []
                },
                dequeue: function(a, u) {
                    u = u || "fx";
                    var m = d.queue(a, u)
                      , v = m.length
                      , b = m.shift()
                      , x = d._queueHooks(a, u)
                      , M = function() {
                        d.dequeue(a, u)
                    };
                    b === "inprogress" && (b = m.shift(),
                    v--),
                    b && (u === "fx" && m.unshift("inprogress"),
                    delete x.stop,
                    b.call(a, M, x)),
                    !v && x && x.empty.fire()
                },
                _queueHooks: function(a, u) {
                    var m = u + "queueHooks";
                    return oe.get(a, m) || oe.access(a, m, {
                        empty: d.Callbacks("once memory").add(function() {
                            oe.remove(a, [u + "queue", m])
                        })
                    })
                }
            }),
            d.fn.extend({
                queue: function(a, u) {
                    var m = 2;
                    return typeof a != "string" && (u = a,
                    a = "fx",
                    m--),
                    arguments.length < m ? d.queue(this[0], a) : u === void 0 ? this : this.each(function() {
                        var v = d.queue(this, a, u);
                        d._queueHooks(this, a),
                        a === "fx" && v[0] !== "inprogress" && d.dequeue(this, a)
                    })
                },
                dequeue: function(a) {
                    return this.each(function() {
                        d.dequeue(this, a)
                    })
                },
                clearQueue: function(a) {
                    return this.queue(a || "fx", [])
                },
                promise: function(a, u) {
                    var m, v = 1, b = d.Deferred(), x = this, M = this.length, z = function() {
                        --v || b.resolveWith(x, [x])
                    };
                    for (typeof a != "string" && (u = a,
                    a = void 0),
                    a = a || "fx"; M--; )
                        m = oe.get(x[M], a + "queueHooks"),
                        m && m.empty && (v++,
                        m.empty.add(z));
                    return z(),
                    b.promise(u)
                }
            });
            var $r = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
              , at = new RegExp("^(?:([+-])=|)(" + $r + ")([a-z%]*)$","i")
              , mi = ["Top", "Right", "Bottom", "Left"]
              , Wt = T.documentElement
              , Mi = function(a) {
                return d.contains(a.ownerDocument, a)
            }
              , Hr = {
                composed: !0
            };
            Wt.getRootNode && (Mi = function(a) {
                return d.contains(a.ownerDocument, a) || a.getRootNode(Hr) === a.ownerDocument
            }
            );
            var Pi = function(a, u) {
                return a = u || a,
                a.style.display === "none" || a.style.display === "" && Mi(a) && d.css(a, "display") === "none"
            };
            function sr(a, u, m, v) {
                var b, x, M = 20, z = v ? function() {
                    return v.cur()
                }
                : function() {
                    return d.css(a, u, "")
                }
                , D = z(), j = m && m[3] || (d.cssNumber[u] ? "" : "px"), J = a.nodeType && (d.cssNumber[u] || j !== "px" && +D) && at.exec(d.css(a, u));
                if (J && J[3] !== j) {
                    for (D = D / 2,
                    j = j || J[3],
                    J = +D || 1; M--; )
                        d.style(a, u, J + j),
                        (1 - x) * (1 - (x = z() / D || .5)) <= 0 && (M = 0),
                        J = J / x;
                    J = J * 2,
                    d.style(a, u, J + j),
                    m = m || []
                }
                return m && (J = +J || +D || 0,
                b = m[1] ? J + (m[1] + 1) * m[2] : +m[2],
                v && (v.unit = j,
                v.start = J,
                v.end = b)),
                b
            }
            var Me = {};
            function xr(a) {
                var u, m = a.ownerDocument, v = a.nodeName, b = Me[v];
                return b || (u = m.body.appendChild(m.createElement(v)),
                b = d.css(u, "display"),
                u.parentNode.removeChild(u),
                b === "none" && (b = "block"),
                Me[v] = b,
                b)
            }
            function Ft(a, u) {
                for (var m, v, b = [], x = 0, M = a.length; x < M; x++)
                    v = a[x],
                    v.style && (m = v.style.display,
                    u ? (m === "none" && (b[x] = oe.get(v, "display") || null,
                    b[x] || (v.style.display = "")),
                    v.style.display === "" && Pi(v) && (b[x] = xr(v))) : m !== "none" && (b[x] = "none",
                    oe.set(v, "display", m)));
                for (x = 0; x < M; x++)
                    b[x] != null && (a[x].style.display = b[x]);
                return a
            }
            d.fn.extend({
                show: function() {
                    return Ft(this, !0)
                },
                hide: function() {
                    return Ft(this)
                },
                toggle: function(a) {
                    return typeof a == "boolean" ? a ? this.show() : this.hide() : this.each(function() {
                        Pi(this) ? d(this).show() : d(this).hide()
                    })
                }
            });
            var Gt = /^(?:checkbox|radio)$/i
              , gi = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
              , ar = /^$|^module$|\/(?:java|ecma)script/i;
            (function() {
                var a = T.createDocumentFragment()
                  , u = a.appendChild(T.createElement("div"))
                  , m = T.createElement("input");
                m.setAttribute("type", "radio"),
                m.setAttribute("checked", "checked"),
                m.setAttribute("name", "t"),
                u.appendChild(m),
                g.checkClone = u.cloneNode(!0).cloneNode(!0).lastChild.checked,
                u.innerHTML = "<textarea>x</textarea>",
                g.noCloneChecked = !!u.cloneNode(!0).lastChild.defaultValue,
                u.innerHTML = "<option></option>",
                g.option = !!u.lastChild
            }
            )();
            var Lt = {
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
            Lt.tbody = Lt.tfoot = Lt.colgroup = Lt.caption = Lt.thead,
            Lt.th = Lt.td,
            g.option || (Lt.optgroup = Lt.option = [1, "<select multiple='multiple'>", "</select>"]);
            function ft(a, u) {
                var m;
                return typeof a.getElementsByTagName < "u" ? m = a.getElementsByTagName(u || "*") : typeof a.querySelectorAll < "u" ? m = a.querySelectorAll(u || "*") : m = [],
                u === void 0 || u && L(a, u) ? d.merge([a], m) : m
            }
            function Sr(a, u) {
                for (var m = 0, v = a.length; m < v; m++)
                    oe.set(a[m], "globalEval", !u || oe.get(u[m], "globalEval"))
            }
            var Te = /<|&#?\w+;/;
            function ge(a, u, m, v, b) {
                for (var x, M, z, D, j, J, ie = u.createDocumentFragment(), G = [], se = 0, xe = a.length; se < xe; se++)
                    if (x = a[se],
                    x || x === 0)
                        if (P(x) === "object")
                            d.merge(G, x.nodeType ? [x] : x);
                        else if (!Te.test(x))
                            G.push(u.createTextNode(x));
                        else {
                            for (M = M || ie.appendChild(u.createElement("div")),
                            z = (gi.exec(x) || ["", ""])[1].toLowerCase(),
                            D = Lt[z] || Lt._default,
                            M.innerHTML = D[1] + d.htmlPrefilter(x) + D[2],
                            J = D[0]; J--; )
                                M = M.lastChild;
                            d.merge(G, M.childNodes),
                            M = ie.firstChild,
                            M.textContent = ""
                        }
                for (ie.textContent = "",
                se = 0; x = G[se++]; ) {
                    if (v && d.inArray(x, v) > -1) {
                        b && b.push(x);
                        continue
                    }
                    if (j = Mi(x),
                    M = ft(ie.appendChild(x), "script"),
                    j && Sr(M),
                    m)
                        for (J = 0; x = M[J++]; )
                            ar.test(x.type || "") && m.push(x)
                }
                return ie
            }
            var Fe = /^([^.]*)(?:\.(.+)|)/;
            function le() {
                return !0
            }
            function ye() {
                return !1
            }
            function pe(a, u, m, v, b, x) {
                var M, z;
                if (typeof u == "object") {
                    typeof m != "string" && (v = v || m,
                    m = void 0);
                    for (z in u)
                        pe(a, z, m, v, u[z], x);
                    return a
                }
                if (v == null && b == null ? (b = m,
                v = m = void 0) : b == null && (typeof m == "string" ? (b = v,
                v = void 0) : (b = v,
                v = m,
                m = void 0)),
                b === !1)
                    b = ye;
                else if (!b)
                    return a;
                return x === 1 && (M = b,
                b = function(D) {
                    return d().off(D),
                    M.apply(this, arguments)
                }
                ,
                b.guid = M.guid || (M.guid = d.guid++)),
                a.each(function() {
                    d.event.add(this, u, b, v, m)
                })
            }
            d.event = {
                global: {},
                add: function(a, u, m, v, b) {
                    var x, M, z, D, j, J, ie, G, se, xe, qe, Pe = oe.get(a);
                    if (Ht(a))
                        for (m.handler && (x = m,
                        m = x.handler,
                        b = x.selector),
                        b && d.find.matchesSelector(Wt, b),
                        m.guid || (m.guid = d.guid++),
                        (D = Pe.events) || (D = Pe.events = Object.create(null)),
                        (M = Pe.handle) || (M = Pe.handle = function(Vt) {
                            return typeof d < "u" && d.event.triggered !== Vt.type ? d.event.dispatch.apply(a, arguments) : void 0
                        }
                        ),
                        u = (u || "").match(Je) || [""],
                        j = u.length; j--; )
                            z = Fe.exec(u[j]) || [],
                            se = qe = z[1],
                            xe = (z[2] || "").split(".").sort(),
                            se && (ie = d.event.special[se] || {},
                            se = (b ? ie.delegateType : ie.bindType) || se,
                            ie = d.event.special[se] || {},
                            J = d.extend({
                                type: se,
                                origType: qe,
                                data: v,
                                handler: m,
                                guid: m.guid,
                                selector: b,
                                needsContext: b && d.expr.match.needsContext.test(b),
                                namespace: xe.join(".")
                            }, x),
                            (G = D[se]) || (G = D[se] = [],
                            G.delegateCount = 0,
                            (!ie.setup || ie.setup.call(a, v, xe, M) === !1) && a.addEventListener && a.addEventListener(se, M)),
                            ie.add && (ie.add.call(a, J),
                            J.handler.guid || (J.handler.guid = m.guid)),
                            b ? G.splice(G.delegateCount++, 0, J) : G.push(J),
                            d.event.global[se] = !0)
                },
                remove: function(a, u, m, v, b) {
                    var x, M, z, D, j, J, ie, G, se, xe, qe, Pe = oe.hasData(a) && oe.get(a);
                    if (!(!Pe || !(D = Pe.events))) {
                        for (u = (u || "").match(Je) || [""],
                        j = u.length; j--; ) {
                            if (z = Fe.exec(u[j]) || [],
                            se = qe = z[1],
                            xe = (z[2] || "").split(".").sort(),
                            !se) {
                                for (se in D)
                                    d.event.remove(a, se + u[j], m, v, !0);
                                continue
                            }
                            for (ie = d.event.special[se] || {},
                            se = (v ? ie.delegateType : ie.bindType) || se,
                            G = D[se] || [],
                            z = z[2] && new RegExp("(^|\\.)" + xe.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                            M = x = G.length; x--; )
                                J = G[x],
                                (b || qe === J.origType) && (!m || m.guid === J.guid) && (!z || z.test(J.namespace)) && (!v || v === J.selector || v === "**" && J.selector) && (G.splice(x, 1),
                                J.selector && G.delegateCount--,
                                ie.remove && ie.remove.call(a, J));
                            M && !G.length && ((!ie.teardown || ie.teardown.call(a, xe, Pe.handle) === !1) && d.removeEvent(a, se, Pe.handle),
                            delete D[se])
                        }
                        d.isEmptyObject(D) && oe.remove(a, "handle events")
                    }
                },
                dispatch: function(a) {
                    var u, m, v, b, x, M, z = new Array(arguments.length), D = d.event.fix(a), j = (oe.get(this, "events") || Object.create(null))[D.type] || [], J = d.event.special[D.type] || {};
                    for (z[0] = D,
                    u = 1; u < arguments.length; u++)
                        z[u] = arguments[u];
                    if (D.delegateTarget = this,
                    !(J.preDispatch && J.preDispatch.call(this, D) === !1)) {
                        for (M = d.event.handlers.call(this, D, j),
                        u = 0; (b = M[u++]) && !D.isPropagationStopped(); )
                            for (D.currentTarget = b.elem,
                            m = 0; (x = b.handlers[m++]) && !D.isImmediatePropagationStopped(); )
                                (!D.rnamespace || x.namespace === !1 || D.rnamespace.test(x.namespace)) && (D.handleObj = x,
                                D.data = x.data,
                                v = ((d.event.special[x.origType] || {}).handle || x.handler).apply(b.elem, z),
                                v !== void 0 && (D.result = v) === !1 && (D.preventDefault(),
                                D.stopPropagation()));
                        return J.postDispatch && J.postDispatch.call(this, D),
                        D.result
                    }
                },
                handlers: function(a, u) {
                    var m, v, b, x, M, z = [], D = u.delegateCount, j = a.target;
                    if (D && j.nodeType && !(a.type === "click" && a.button >= 1)) {
                        for (; j !== this; j = j.parentNode || this)
                            if (j.nodeType === 1 && !(a.type === "click" && j.disabled === !0)) {
                                for (x = [],
                                M = {},
                                m = 0; m < D; m++)
                                    v = u[m],
                                    b = v.selector + " ",
                                    M[b] === void 0 && (M[b] = v.needsContext ? d(b, this).index(j) > -1 : d.find(b, this, null, [j]).length),
                                    M[b] && x.push(v);
                                x.length && z.push({
                                    elem: j,
                                    handlers: x
                                })
                            }
                    }
                    return j = this,
                    D < u.length && z.push({
                        elem: j,
                        handlers: u.slice(D)
                    }),
                    z
                },
                addProp: function(a, u) {
                    Object.defineProperty(d.Event.prototype, a, {
                        enumerable: !0,
                        configurable: !0,
                        get: p(u) ? function() {
                            if (this.originalEvent)
                                return u(this.originalEvent)
                        }
                        : function() {
                            if (this.originalEvent)
                                return this.originalEvent[a]
                        }
                        ,
                        set: function(m) {
                            Object.defineProperty(this, a, {
                                enumerable: !0,
                                configurable: !0,
                                writable: !0,
                                value: m
                            })
                        }
                    })
                },
                fix: function(a) {
                    return a[d.expando] ? a : new d.Event(a)
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    click: {
                        setup: function(a) {
                            var u = this || a;
                            return Gt.test(u.type) && u.click && L(u, "input") && we(u, "click", !0),
                            !1
                        },
                        trigger: function(a) {
                            var u = this || a;
                            return Gt.test(u.type) && u.click && L(u, "input") && we(u, "click"),
                            !0
                        },
                        _default: function(a) {
                            var u = a.target;
                            return Gt.test(u.type) && u.click && L(u, "input") && oe.get(u, "click") || L(u, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(a) {
                            a.result !== void 0 && a.originalEvent && (a.originalEvent.returnValue = a.result)
                        }
                    }
                }
            };
            function we(a, u, m) {
                if (!m) {
                    oe.get(a, u) === void 0 && d.event.add(a, u, le);
                    return
                }
                oe.set(a, u, !1),
                d.event.add(a, u, {
                    namespace: !1,
                    handler: function(v) {
                        var b, x = oe.get(this, u);
                        if (v.isTrigger & 1 && this[u]) {
                            if (x)
                                (d.event.special[u] || {}).delegateType && v.stopPropagation();
                            else if (x = n.call(arguments),
                            oe.set(this, u, x),
                            this[u](),
                            b = oe.get(this, u),
                            oe.set(this, u, !1),
                            x !== b)
                                return v.stopImmediatePropagation(),
                                v.preventDefault(),
                                b
                        } else
                            x && (oe.set(this, u, d.event.trigger(x[0], x.slice(1), this)),
                            v.stopPropagation(),
                            v.isImmediatePropagationStopped = le)
                    }
                })
            }
            d.removeEvent = function(a, u, m) {
                a.removeEventListener && a.removeEventListener(u, m)
            }
            ,
            d.Event = function(a, u) {
                if (!(this instanceof d.Event))
                    return new d.Event(a,u);
                a && a.type ? (this.originalEvent = a,
                this.type = a.type,
                this.isDefaultPrevented = a.defaultPrevented || a.defaultPrevented === void 0 && a.returnValue === !1 ? le : ye,
                this.target = a.target && a.target.nodeType === 3 ? a.target.parentNode : a.target,
                this.currentTarget = a.currentTarget,
                this.relatedTarget = a.relatedTarget) : this.type = a,
                u && d.extend(this, u),
                this.timeStamp = a && a.timeStamp || Date.now(),
                this[d.expando] = !0
            }
            ,
            d.Event.prototype = {
                constructor: d.Event,
                isDefaultPrevented: ye,
                isPropagationStopped: ye,
                isImmediatePropagationStopped: ye,
                isSimulated: !1,
                preventDefault: function() {
                    var a = this.originalEvent;
                    this.isDefaultPrevented = le,
                    a && !this.isSimulated && a.preventDefault()
                },
                stopPropagation: function() {
                    var a = this.originalEvent;
                    this.isPropagationStopped = le,
                    a && !this.isSimulated && a.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    var a = this.originalEvent;
                    this.isImmediatePropagationStopped = le,
                    a && !this.isSimulated && a.stopImmediatePropagation(),
                    this.stopPropagation()
                }
            },
            d.each({
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0
            }, d.event.addProp),
            d.each({
                focus: "focusin",
                blur: "focusout"
            }, function(a, u) {
                function m(v) {
                    if (T.documentMode) {
                        var b = oe.get(this, "handle")
                          , x = d.event.fix(v);
                        x.type = v.type === "focusin" ? "focus" : "blur",
                        x.isSimulated = !0,
                        b(v),
                        x.target === x.currentTarget && b(x)
                    } else
                        d.event.simulate(u, v.target, d.event.fix(v))
                }
                d.event.special[a] = {
                    setup: function() {
                        var v;
                        if (we(this, a, !0),
                        T.documentMode)
                            v = oe.get(this, u),
                            v || this.addEventListener(u, m),
                            oe.set(this, u, (v || 0) + 1);
                        else
                            return !1
                    },
                    trigger: function() {
                        return we(this, a),
                        !0
                    },
                    teardown: function() {
                        var v;
                        if (T.documentMode)
                            v = oe.get(this, u) - 1,
                            v ? oe.set(this, u, v) : (this.removeEventListener(u, m),
                            oe.remove(this, u));
                        else
                            return !1
                    },
                    _default: function(v) {
                        return oe.get(v.target, a)
                    },
                    delegateType: u
                },
                d.event.special[u] = {
                    setup: function() {
                        var v = this.ownerDocument || this.document || this
                          , b = T.documentMode ? this : v
                          , x = oe.get(b, u);
                        x || (T.documentMode ? this.addEventListener(u, m) : v.addEventListener(a, m, !0)),
                        oe.set(b, u, (x || 0) + 1)
                    },
                    teardown: function() {
                        var v = this.ownerDocument || this.document || this
                          , b = T.documentMode ? this : v
                          , x = oe.get(b, u) - 1;
                        x ? oe.set(b, u, x) : (T.documentMode ? this.removeEventListener(u, m) : v.removeEventListener(a, m, !0),
                        oe.remove(b, u))
                    }
                }
            }),
            d.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function(a, u) {
                d.event.special[a] = {
                    delegateType: u,
                    bindType: u,
                    handle: function(m) {
                        var v, b = this, x = m.relatedTarget, M = m.handleObj;
                        return (!x || x !== b && !d.contains(b, x)) && (m.type = M.origType,
                        v = M.handler.apply(this, arguments),
                        m.type = u),
                        v
                    }
                }
            }),
            d.fn.extend({
                on: function(a, u, m, v) {
                    return pe(this, a, u, m, v)
                },
                one: function(a, u, m, v) {
                    return pe(this, a, u, m, v, 1)
                },
                off: function(a, u, m) {
                    var v, b;
                    if (a && a.preventDefault && a.handleObj)
                        return v = a.handleObj,
                        d(a.delegateTarget).off(v.namespace ? v.origType + "." + v.namespace : v.origType, v.selector, v.handler),
                        this;
                    if (typeof a == "object") {
                        for (b in a)
                            this.off(b, u, a[b]);
                        return this
                    }
                    return (u === !1 || typeof u == "function") && (m = u,
                    u = void 0),
                    m === !1 && (m = ye),
                    this.each(function() {
                        d.event.remove(this, a, m, u)
                    })
                }
            });
            var Mt = /<script|<style|<link/i
              , De = /checked\s*(?:[^=]|=\s*.checked.)/i
              , gt = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
            function Ot(a, u) {
                return L(a, "table") && L(u.nodeType !== 11 ? u : u.firstChild, "tr") && d(a).children("tbody")[0] || a
            }
            function dt(a) {
                return a.type = (a.getAttribute("type") !== null) + "/" + a.type,
                a
            }
            function ot(a) {
                return (a.type || "").slice(0, 5) === "true/" ? a.type = a.type.slice(5) : a.removeAttribute("type"),
                a
            }
            function Ge(a, u) {
                var m, v, b, x, M, z, D;
                if (u.nodeType === 1) {
                    if (oe.hasData(a) && (x = oe.get(a),
                    D = x.events,
                    D)) {
                        oe.remove(u, "handle events");
                        for (b in D)
                            for (m = 0,
                            v = D[b].length; m < v; m++)
                                d.event.add(u, b, D[b][m])
                    }
                    tt.hasData(a) && (M = tt.access(a),
                    z = d.extend({}, M),
                    tt.set(u, z))
                }
            }
            function Ai(a, u) {
                var m = u.nodeName.toLowerCase();
                m === "input" && Gt.test(a.type) ? u.checked = a.checked : (m === "input" || m === "textarea") && (u.defaultValue = a.defaultValue)
            }
            function Ve(a, u, m, v) {
                u = o(u);
                var b, x, M, z, D, j, J = 0, ie = a.length, G = ie - 1, se = u[0], xe = p(se);
                if (xe || ie > 1 && typeof se == "string" && !g.checkClone && De.test(se))
                    return a.each(function(qe) {
                        var Pe = a.eq(qe);
                        xe && (u[0] = se.call(this, qe, Pe.html())),
                        Ve(Pe, u, m, v)
                    });
                if (ie && (b = ge(u, a[0].ownerDocument, !1, a, v),
                x = b.firstChild,
                b.childNodes.length === 1 && (b = x),
                x || v)) {
                    for (M = d.map(ft(b, "script"), dt),
                    z = M.length; J < ie; J++)
                        D = b,
                        J !== G && (D = d.clone(D, !0, !0),
                        z && d.merge(M, ft(D, "script"))),
                        m.call(a[J], D, J);
                    if (z)
                        for (j = M[M.length - 1].ownerDocument,
                        d.map(M, ot),
                        J = 0; J < z; J++)
                            D = M[J],
                            ar.test(D.type || "") && !oe.access(D, "globalEval") && d.contains(j, D) && (D.src && (D.type || "").toLowerCase() !== "module" ? d._evalUrl && !D.noModule && d._evalUrl(D.src, {
                                nonce: D.nonce || D.getAttribute("nonce")
                            }, j) : E(D.textContent.replace(gt, ""), D, j))
                }
                return a
            }
            function Jt(a, u, m) {
                for (var v, b = u ? d.filter(u, a) : a, x = 0; (v = b[x]) != null; x++)
                    !m && v.nodeType === 1 && d.cleanData(ft(v)),
                    v.parentNode && (m && Mi(v) && Sr(ft(v, "script")),
                    v.parentNode.removeChild(v));
                return a
            }
            d.extend({
                htmlPrefilter: function(a) {
                    return a
                },
                clone: function(a, u, m) {
                    var v, b, x, M, z = a.cloneNode(!0), D = Mi(a);
                    if (!g.noCloneChecked && (a.nodeType === 1 || a.nodeType === 11) && !d.isXMLDoc(a))
                        for (M = ft(z),
                        x = ft(a),
                        v = 0,
                        b = x.length; v < b; v++)
                            Ai(x[v], M[v]);
                    if (u)
                        if (m)
                            for (x = x || ft(a),
                            M = M || ft(z),
                            v = 0,
                            b = x.length; v < b; v++)
                                Ge(x[v], M[v]);
                        else
                            Ge(a, z);
                    return M = ft(z, "script"),
                    M.length > 0 && Sr(M, !D && ft(a, "script")),
                    z
                },
                cleanData: function(a) {
                    for (var u, m, v, b = d.event.special, x = 0; (m = a[x]) !== void 0; x++)
                        if (Ht(m)) {
                            if (u = m[oe.expando]) {
                                if (u.events)
                                    for (v in u.events)
                                        b[v] ? d.event.remove(m, v) : d.removeEvent(m, v, u.handle);
                                m[oe.expando] = void 0
                            }
                            m[tt.expando] && (m[tt.expando] = void 0)
                        }
                }
            }),
            d.fn.extend({
                detach: function(a) {
                    return Jt(this, a, !0)
                },
                remove: function(a) {
                    return Jt(this, a)
                },
                text: function(a) {
                    return Ye(this, function(u) {
                        return u === void 0 ? d.text(this) : this.empty().each(function() {
                            (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = u)
                        })
                    }, null, a, arguments.length)
                },
                append: function() {
                    return Ve(this, arguments, function(a) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var u = Ot(this, a);
                            u.appendChild(a)
                        }
                    })
                },
                prepend: function() {
                    return Ve(this, arguments, function(a) {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            var u = Ot(this, a);
                            u.insertBefore(a, u.firstChild)
                        }
                    })
                },
                before: function() {
                    return Ve(this, arguments, function(a) {
                        this.parentNode && this.parentNode.insertBefore(a, this)
                    })
                },
                after: function() {
                    return Ve(this, arguments, function(a) {
                        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
                    })
                },
                empty: function() {
                    for (var a, u = 0; (a = this[u]) != null; u++)
                        a.nodeType === 1 && (d.cleanData(ft(a, !1)),
                        a.textContent = "");
                    return this
                },
                clone: function(a, u) {
                    return a = a ?? !1,
                    u = u ?? a,
                    this.map(function() {
                        return d.clone(this, a, u)
                    })
                },
                html: function(a) {
                    return Ye(this, function(u) {
                        var m = this[0] || {}
                          , v = 0
                          , b = this.length;
                        if (u === void 0 && m.nodeType === 1)
                            return m.innerHTML;
                        if (typeof u == "string" && !Mt.test(u) && !Lt[(gi.exec(u) || ["", ""])[1].toLowerCase()]) {
                            u = d.htmlPrefilter(u);
                            try {
                                for (; v < b; v++)
                                    m = this[v] || {},
                                    m.nodeType === 1 && (d.cleanData(ft(m, !1)),
                                    m.innerHTML = u);
                                m = 0
                            } catch {}
                        }
                        m && this.empty().append(u)
                    }, null, a, arguments.length)
                },
                replaceWith: function() {
                    var a = [];
                    return Ve(this, arguments, function(u) {
                        var m = this.parentNode;
                        d.inArray(this, a) < 0 && (d.cleanData(ft(this)),
                        m && m.replaceChild(u, this))
                    }, a)
                }
            }),
            d.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function(a, u) {
                d.fn[a] = function(m) {
                    for (var v, b = [], x = d(m), M = x.length - 1, z = 0; z <= M; z++)
                        v = z === M ? this : this.clone(!0),
                        d(x[z])[u](v),
                        l.apply(b, v.get());
                    return this.pushStack(b)
                }
            });
            var vi = new RegExp("^(" + $r + ")(?!px)[a-z%]+$","i")
              , St = /^--/
              , wt = function(a) {
                var u = a.ownerDocument.defaultView;
                return (!u || !u.opener) && (u = e),
                u.getComputedStyle(a)
            }
              , Dt = function(a, u, m) {
                var v, b, x = {};
                for (b in u)
                    x[b] = a.style[b],
                    a.style[b] = u[b];
                v = m.call(a);
                for (b in u)
                    a.style[b] = x[b];
                return v
            }
              , Tr = new RegExp(mi.join("|"),"i");
            (function() {
                function a() {
                    if (j) {
                        D.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                        j.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                        Wt.appendChild(D).appendChild(j);
                        var J = e.getComputedStyle(j);
                        m = J.top !== "1%",
                        z = u(J.marginLeft) === 12,
                        j.style.right = "60%",
                        x = u(J.right) === 36,
                        v = u(J.width) === 36,
                        j.style.position = "absolute",
                        b = u(j.offsetWidth / 3) === 12,
                        Wt.removeChild(D),
                        j = null
                    }
                }
                function u(J) {
                    return Math.round(parseFloat(J))
                }
                var m, v, b, x, M, z, D = T.createElement("div"), j = T.createElement("div");
                j.style && (j.style.backgroundClip = "content-box",
                j.cloneNode(!0).style.backgroundClip = "",
                g.clearCloneStyle = j.style.backgroundClip === "content-box",
                d.extend(g, {
                    boxSizingReliable: function() {
                        return a(),
                        v
                    },
                    pixelBoxStyles: function() {
                        return a(),
                        x
                    },
                    pixelPosition: function() {
                        return a(),
                        m
                    },
                    reliableMarginLeft: function() {
                        return a(),
                        z
                    },
                    scrollboxSize: function() {
                        return a(),
                        b
                    },
                    reliableTrDimensions: function() {
                        var J, ie, G, se;
                        return M == null && (J = T.createElement("table"),
                        ie = T.createElement("tr"),
                        G = T.createElement("div"),
                        J.style.cssText = "position:absolute;left:-11111px;border-collapse:separate",
                        ie.style.cssText = "box-sizing:content-box;border:1px solid",
                        ie.style.height = "1px",
                        G.style.height = "9px",
                        G.style.display = "block",
                        Wt.appendChild(J).appendChild(ie).appendChild(G),
                        se = e.getComputedStyle(ie),
                        M = parseInt(se.height, 10) + parseInt(se.borderTopWidth, 10) + parseInt(se.borderBottomWidth, 10) === ie.offsetHeight,
                        Wt.removeChild(J)),
                        M
                    }
                }))
            }
            )();
            function or(a, u, m) {
                var v, b, x, M, z = St.test(u), D = a.style;
                return m = m || wt(a),
                m && (M = m.getPropertyValue(u) || m[u],
                z && M && (M = M.replace(q, "$1") || void 0),
                M === "" && !Mi(a) && (M = d.style(a, u)),
                !g.pixelBoxStyles() && vi.test(M) && Tr.test(u) && (v = D.width,
                b = D.minWidth,
                x = D.maxWidth,
                D.minWidth = D.maxWidth = D.width = M,
                M = m.width,
                D.width = v,
                D.minWidth = b,
                D.maxWidth = x)),
                M !== void 0 ? M + "" : M
            }
            function It(a, u) {
                return {
                    get: function() {
                        if (a()) {
                            delete this.get;
                            return
                        }
                        return (this.get = u).apply(this, arguments)
                    }
                }
            }
            var _t = ["Webkit", "Moz", "ms"]
              , ki = T.createElement("div").style
              , $n = {};
            function aa(a) {
                for (var u = a[0].toUpperCase() + a.slice(1), m = _t.length; m--; )
                    if (a = _t[m] + u,
                    a in ki)
                        return a
            }
            function Er(a) {
                var u = d.cssProps[a] || $n[a];
                return u || (a in ki ? a : $n[a] = aa(a) || a)
            }
            var Xi = /^(none|table(?!-c[ea]).+)/
              , ln = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            }
              , un = {
                letterSpacing: "0",
                fontWeight: "400"
            };
            function tr(a, u, m) {
                var v = at.exec(u);
                return v ? Math.max(0, v[2] - (m || 0)) + (v[3] || "px") : u
            }
            function so(a, u, m, v, b, x) {
                var M = u === "width" ? 1 : 0
                  , z = 0
                  , D = 0
                  , j = 0;
                if (m === (v ? "border" : "content"))
                    return 0;
                for (; M < 4; M += 2)
                    m === "margin" && (j += d.css(a, m + mi[M], !0, b)),
                    v ? (m === "content" && (D -= d.css(a, "padding" + mi[M], !0, b)),
                    m !== "margin" && (D -= d.css(a, "border" + mi[M] + "Width", !0, b))) : (D += d.css(a, "padding" + mi[M], !0, b),
                    m !== "padding" ? D += d.css(a, "border" + mi[M] + "Width", !0, b) : z += d.css(a, "border" + mi[M] + "Width", !0, b));
                return !v && x >= 0 && (D += Math.max(0, Math.ceil(a["offset" + u[0].toUpperCase() + u.slice(1)] - x - D - z - .5)) || 0),
                D + j
            }
            function Jl(a, u, m) {
                var v = wt(a)
                  , b = !g.boxSizingReliable() || m
                  , x = b && d.css(a, "boxSizing", !1, v) === "border-box"
                  , M = x
                  , z = or(a, u, v)
                  , D = "offset" + u[0].toUpperCase() + u.slice(1);
                if (vi.test(z)) {
                    if (!m)
                        return z;
                    z = "auto"
                }
                return (!g.boxSizingReliable() && x || !g.reliableTrDimensions() && L(a, "tr") || z === "auto" || !parseFloat(z) && d.css(a, "display", !1, v) === "inline") && a.getClientRects().length && (x = d.css(a, "boxSizing", !1, v) === "border-box",
                M = D in a,
                M && (z = a[D])),
                z = parseFloat(z) || 0,
                z + so(a, u, m || (x ? "border" : "content"), M, v, z) + "px"
            }
            d.extend({
                cssHooks: {
                    opacity: {
                        get: function(a, u) {
                            if (u) {
                                var m = or(a, "opacity");
                                return m === "" ? "1" : m
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: !0,
                    aspectRatio: !0,
                    borderImageSlice: !0,
                    columnCount: !0,
                    flexGrow: !0,
                    flexShrink: !0,
                    fontWeight: !0,
                    gridArea: !0,
                    gridColumn: !0,
                    gridColumnEnd: !0,
                    gridColumnStart: !0,
                    gridRow: !0,
                    gridRowEnd: !0,
                    gridRowStart: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    scale: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0,
                    fillOpacity: !0,
                    floodOpacity: !0,
                    stopOpacity: !0,
                    strokeMiterlimit: !0,
                    strokeOpacity: !0
                },
                cssProps: {},
                style: function(a, u, m, v) {
                    if (!(!a || a.nodeType === 3 || a.nodeType === 8 || !a.style)) {
                        var b, x, M, z = ct(u), D = St.test(u), j = a.style;
                        if (D || (u = Er(z)),
                        M = d.cssHooks[u] || d.cssHooks[z],
                        m !== void 0) {
                            if (x = typeof m,
                            x === "string" && (b = at.exec(m)) && b[1] && (m = sr(a, u, b),
                            x = "number"),
                            m == null || m !== m)
                                return;
                            x === "number" && !D && (m += b && b[3] || (d.cssNumber[z] ? "" : "px")),
                            !g.clearCloneStyle && m === "" && u.indexOf("background") === 0 && (j[u] = "inherit"),
                            (!M || !("set"in M) || (m = M.set(a, m, v)) !== void 0) && (D ? j.setProperty(u, m) : j[u] = m)
                        } else
                            return M && "get"in M && (b = M.get(a, !1, v)) !== void 0 ? b : j[u]
                    }
                },
                css: function(a, u, m, v) {
                    var b, x, M, z = ct(u), D = St.test(u);
                    return D || (u = Er(z)),
                    M = d.cssHooks[u] || d.cssHooks[z],
                    M && "get"in M && (b = M.get(a, !0, m)),
                    b === void 0 && (b = or(a, u, v)),
                    b === "normal" && u in un && (b = un[u]),
                    m === "" || m ? (x = parseFloat(b),
                    m === !0 || isFinite(x) ? x || 0 : b) : b
                }
            }),
            d.each(["height", "width"], function(a, u) {
                d.cssHooks[u] = {
                    get: function(m, v, b) {
                        if (v)
                            return Xi.test(d.css(m, "display")) && (!m.getClientRects().length || !m.getBoundingClientRect().width) ? Dt(m, ln, function() {
                                return Jl(m, u, b)
                            }) : Jl(m, u, b)
                    },
                    set: function(m, v, b) {
                        var x, M = wt(m), z = !g.scrollboxSize() && M.position === "absolute", D = z || b, j = D && d.css(m, "boxSizing", !1, M) === "border-box", J = b ? so(m, u, b, j, M) : 0;
                        return j && z && (J -= Math.ceil(m["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(M[u]) - so(m, u, "border", !1, M) - .5)),
                        J && (x = at.exec(v)) && (x[3] || "px") !== "px" && (m.style[u] = v,
                        v = d.css(m, u)),
                        tr(m, v, J)
                    }
                }
            }),
            d.cssHooks.marginLeft = It(g.reliableMarginLeft, function(a, u) {
                if (u)
                    return (parseFloat(or(a, "marginLeft")) || a.getBoundingClientRect().left - Dt(a, {
                        marginLeft: 0
                    }, function() {
                        return a.getBoundingClientRect().left
                    })) + "px"
            }),
            d.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function(a, u) {
                d.cssHooks[a + u] = {
                    expand: function(m) {
                        for (var v = 0, b = {}, x = typeof m == "string" ? m.split(" ") : [m]; v < 4; v++)
                            b[a + mi[v] + u] = x[v] || x[v - 2] || x[0];
                        return b
                    }
                },
                a !== "margin" && (d.cssHooks[a + u].set = tr)
            }),
            d.fn.extend({
                css: function(a, u) {
                    return Ye(this, function(m, v, b) {
                        var x, M, z = {}, D = 0;
                        if (Array.isArray(v)) {
                            for (x = wt(m),
                            M = v.length; D < M; D++)
                                z[v[D]] = d.css(m, v[D], !1, x);
                            return z
                        }
                        return b !== void 0 ? d.style(m, v, b) : d.css(m, v)
                    }, a, u, arguments.length > 1)
                }
            });
            function yi(a, u, m, v, b) {
                return new yi.prototype.init(a,u,m,v,b)
            }
            d.Tween = yi,
            yi.prototype = {
                constructor: yi,
                init: function(a, u, m, v, b, x) {
                    this.elem = a,
                    this.prop = m,
                    this.easing = b || d.easing._default,
                    this.options = u,
                    this.start = this.now = this.cur(),
                    this.end = v,
                    this.unit = x || (d.cssNumber[m] ? "" : "px")
                },
                cur: function() {
                    var a = yi.propHooks[this.prop];
                    return a && a.get ? a.get(this) : yi.propHooks._default.get(this)
                },
                run: function(a) {
                    var u, m = yi.propHooks[this.prop];
                    return this.options.duration ? this.pos = u = d.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = u = a,
                    this.now = (this.end - this.start) * u + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    m && m.set ? m.set(this) : yi.propHooks._default.set(this),
                    this
                }
            },
            yi.prototype.init.prototype = yi.prototype,
            yi.propHooks = {
                _default: {
                    get: function(a) {
                        var u;
                        return a.elem.nodeType !== 1 || a.elem[a.prop] != null && a.elem.style[a.prop] == null ? a.elem[a.prop] : (u = d.css(a.elem, a.prop, ""),
                        !u || u === "auto" ? 0 : u)
                    },
                    set: function(a) {
                        d.fx.step[a.prop] ? d.fx.step[a.prop](a) : a.elem.nodeType === 1 && (d.cssHooks[a.prop] || a.elem.style[Er(a.prop)] != null) ? d.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
                    }
                }
            },
            yi.propHooks.scrollTop = yi.propHooks.scrollLeft = {
                set: function(a) {
                    a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
                }
            },
            d.easing = {
                linear: function(a) {
                    return a
                },
                swing: function(a) {
                    return .5 - Math.cos(a * Math.PI) / 2
                },
                _default: "swing"
            },
            d.fx = yi.prototype.init,
            d.fx.step = {};
            var Hn, oa, Wf = /^(?:toggle|show|hide)$/, Gf = /queueHooks$/;
            function ao() {
                oa && (T.hidden === !1 && e.requestAnimationFrame ? e.requestAnimationFrame(ao) : e.setTimeout(ao, d.fx.interval),
                d.fx.tick())
            }
            function eu() {
                return e.setTimeout(function() {
                    Hn = void 0
                }),
                Hn = Date.now()
            }
            function la(a, u) {
                var m, v = 0, b = {
                    height: a
                };
                for (u = u ? 1 : 0; v < 4; v += 2 - u)
                    m = mi[v],
                    b["margin" + m] = b["padding" + m] = a;
                return u && (b.opacity = b.width = a),
                b
            }
            function tu(a, u, m) {
                for (var v, b = (ir.tweeners[u] || []).concat(ir.tweeners["*"]), x = 0, M = b.length; x < M; x++)
                    if (v = b[x].call(m, u, a))
                        return v
            }
            function Vf(a, u, m) {
                var v, b, x, M, z, D, j, J, ie = "width"in u || "height"in u, G = this, se = {}, xe = a.style, qe = a.nodeType && Pi(a), Pe = oe.get(a, "fxshow");
                m.queue || (M = d._queueHooks(a, "fx"),
                M.unqueued == null && (M.unqueued = 0,
                z = M.empty.fire,
                M.empty.fire = function() {
                    M.unqueued || z()
                }
                ),
                M.unqueued++,
                G.always(function() {
                    G.always(function() {
                        M.unqueued--,
                        d.queue(a, "fx").length || M.empty.fire()
                    })
                }));
                for (v in u)
                    if (b = u[v],
                    Wf.test(b)) {
                        if (delete u[v],
                        x = x || b === "toggle",
                        b === (qe ? "hide" : "show"))
                            if (b === "show" && Pe && Pe[v] !== void 0)
                                qe = !0;
                            else
                                continue;
                        se[v] = Pe && Pe[v] || d.style(a, v)
                    }
                if (D = !d.isEmptyObject(u),
                !(!D && d.isEmptyObject(se))) {
                    ie && a.nodeType === 1 && (m.overflow = [xe.overflow, xe.overflowX, xe.overflowY],
                    j = Pe && Pe.display,
                    j == null && (j = oe.get(a, "display")),
                    J = d.css(a, "display"),
                    J === "none" && (j ? J = j : (Ft([a], !0),
                    j = a.style.display || j,
                    J = d.css(a, "display"),
                    Ft([a]))),
                    (J === "inline" || J === "inline-block" && j != null) && d.css(a, "float") === "none" && (D || (G.done(function() {
                        xe.display = j
                    }),
                    j == null && (J = xe.display,
                    j = J === "none" ? "" : J)),
                    xe.display = "inline-block")),
                    m.overflow && (xe.overflow = "hidden",
                    G.always(function() {
                        xe.overflow = m.overflow[0],
                        xe.overflowX = m.overflow[1],
                        xe.overflowY = m.overflow[2]
                    })),
                    D = !1;
                    for (v in se)
                        D || (Pe ? "hidden"in Pe && (qe = Pe.hidden) : Pe = oe.access(a, "fxshow", {
                            display: j
                        }),
                        x && (Pe.hidden = !qe),
                        qe && Ft([a], !0),
                        G.done(function() {
                            qe || Ft([a]),
                            oe.remove(a, "fxshow");
                            for (v in se)
                                d.style(a, v, se[v])
                        })),
                        D = tu(qe ? Pe[v] : 0, v, G),
                        v in Pe || (Pe[v] = D.start,
                        qe && (D.end = D.start,
                        D.start = 0))
                }
            }
            function Uf(a, u) {
                var m, v, b, x, M;
                for (m in a)
                    if (v = ct(m),
                    b = u[v],
                    x = a[m],
                    Array.isArray(x) && (b = x[1],
                    x = a[m] = x[0]),
                    m !== v && (a[v] = x,
                    delete a[m]),
                    M = d.cssHooks[v],
                    M && "expand"in M) {
                        x = M.expand(x),
                        delete a[v];
                        for (m in x)
                            m in a || (a[m] = x[m],
                            u[m] = b)
                    } else
                        u[v] = b
            }
            function ir(a, u, m) {
                var v, b, x = 0, M = ir.prefilters.length, z = d.Deferred().always(function() {
                    delete D.elem
                }), D = function() {
                    if (b)
                        return !1;
                    for (var ie = Hn || eu(), G = Math.max(0, j.startTime + j.duration - ie), se = G / j.duration || 0, xe = 1 - se, qe = 0, Pe = j.tweens.length; qe < Pe; qe++)
                        j.tweens[qe].run(xe);
                    return z.notifyWith(a, [j, xe, G]),
                    xe < 1 && Pe ? G : (Pe || z.notifyWith(a, [j, 1, 0]),
                    z.resolveWith(a, [j]),
                    !1)
                }, j = z.promise({
                    elem: a,
                    props: d.extend({}, u),
                    opts: d.extend(!0, {
                        specialEasing: {},
                        easing: d.easing._default
                    }, m),
                    originalProperties: u,
                    originalOptions: m,
                    startTime: Hn || eu(),
                    duration: m.duration,
                    tweens: [],
                    createTween: function(ie, G) {
                        var se = d.Tween(a, j.opts, ie, G, j.opts.specialEasing[ie] || j.opts.easing);
                        return j.tweens.push(se),
                        se
                    },
                    stop: function(ie) {
                        var G = 0
                          , se = ie ? j.tweens.length : 0;
                        if (b)
                            return this;
                        for (b = !0; G < se; G++)
                            j.tweens[G].run(1);
                        return ie ? (z.notifyWith(a, [j, 1, 0]),
                        z.resolveWith(a, [j, ie])) : z.rejectWith(a, [j, ie]),
                        this
                    }
                }), J = j.props;
                for (Uf(J, j.opts.specialEasing); x < M; x++)
                    if (v = ir.prefilters[x].call(j, a, J, j.opts),
                    v)
                        return p(v.stop) && (d._queueHooks(j.elem, j.opts.queue).stop = v.stop.bind(v)),
                        v;
                return d.map(J, tu, j),
                p(j.opts.start) && j.opts.start.call(a, j),
                j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always),
                d.fx.timer(d.extend(D, {
                    elem: a,
                    anim: j,
                    queue: j.opts.queue
                })),
                j
            }
            d.Animation = d.extend(ir, {
                tweeners: {
                    "*": [function(a, u) {
                        var m = this.createTween(a, u);
                        return sr(m.elem, a, at.exec(u), m),
                        m
                    }
                    ]
                },
                tweener: function(a, u) {
                    p(a) ? (u = a,
                    a = ["*"]) : a = a.match(Je);
                    for (var m, v = 0, b = a.length; v < b; v++)
                        m = a[v],
                        ir.tweeners[m] = ir.tweeners[m] || [],
                        ir.tweeners[m].unshift(u)
                },
                prefilters: [Vf],
                prefilter: function(a, u) {
                    u ? ir.prefilters.unshift(a) : ir.prefilters.push(a)
                }
            }),
            d.speed = function(a, u, m) {
                var v = a && typeof a == "object" ? d.extend({}, a) : {
                    complete: m || !m && u || p(a) && a,
                    duration: a,
                    easing: m && u || u && !p(u) && u
                };
                return d.fx.off ? v.duration = 0 : typeof v.duration != "number" && (v.duration in d.fx.speeds ? v.duration = d.fx.speeds[v.duration] : v.duration = d.fx.speeds._default),
                (v.queue == null || v.queue === !0) && (v.queue = "fx"),
                v.old = v.complete,
                v.complete = function() {
                    p(v.old) && v.old.call(this),
                    v.queue && d.dequeue(this, v.queue)
                }
                ,
                v
            }
            ,
            d.fn.extend({
                fadeTo: function(a, u, m, v) {
                    return this.filter(Pi).css("opacity", 0).show().end().animate({
                        opacity: u
                    }, a, m, v)
                },
                animate: function(a, u, m, v) {
                    var b = d.isEmptyObject(a)
                      , x = d.speed(u, m, v)
                      , M = function() {
                        var z = ir(this, d.extend({}, a), x);
                        (b || oe.get(this, "finish")) && z.stop(!0)
                    };
                    return M.finish = M,
                    b || x.queue === !1 ? this.each(M) : this.queue(x.queue, M)
                },
                stop: function(a, u, m) {
                    var v = function(b) {
                        var x = b.stop;
                        delete b.stop,
                        x(m)
                    };
                    return typeof a != "string" && (m = u,
                    u = a,
                    a = void 0),
                    u && this.queue(a || "fx", []),
                    this.each(function() {
                        var b = !0
                          , x = a != null && a + "queueHooks"
                          , M = d.timers
                          , z = oe.get(this);
                        if (x)
                            z[x] && z[x].stop && v(z[x]);
                        else
                            for (x in z)
                                z[x] && z[x].stop && Gf.test(x) && v(z[x]);
                        for (x = M.length; x--; )
                            M[x].elem === this && (a == null || M[x].queue === a) && (M[x].anim.stop(m),
                            b = !1,
                            M.splice(x, 1));
                        (b || !m) && d.dequeue(this, a)
                    })
                },
                finish: function(a) {
                    return a !== !1 && (a = a || "fx"),
                    this.each(function() {
                        var u, m = oe.get(this), v = m[a + "queue"], b = m[a + "queueHooks"], x = d.timers, M = v ? v.length : 0;
                        for (m.finish = !0,
                        d.queue(this, a, []),
                        b && b.stop && b.stop.call(this, !0),
                        u = x.length; u--; )
                            x[u].elem === this && x[u].queue === a && (x[u].anim.stop(!0),
                            x.splice(u, 1));
                        for (u = 0; u < M; u++)
                            v[u] && v[u].finish && v[u].finish.call(this);
                        delete m.finish
                    })
                }
            }),
            d.each(["toggle", "show", "hide"], function(a, u) {
                var m = d.fn[u];
                d.fn[u] = function(v, b, x) {
                    return v == null || typeof v == "boolean" ? m.apply(this, arguments) : this.animate(la(u, !0), v, b, x)
                }
            }),
            d.each({
                slideDown: la("show"),
                slideUp: la("hide"),
                slideToggle: la("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(a, u) {
                d.fn[a] = function(m, v, b) {
                    return this.animate(u, m, v, b)
                }
            }),
            d.timers = [],
            d.fx.tick = function() {
                var a, u = 0, m = d.timers;
                for (Hn = Date.now(); u < m.length; u++)
                    a = m[u],
                    !a() && m[u] === a && m.splice(u--, 1);
                m.length || d.fx.stop(),
                Hn = void 0
            }
            ,
            d.fx.timer = function(a) {
                d.timers.push(a),
                d.fx.start()
            }
            ,
            d.fx.interval = 13,
            d.fx.start = function() {
                oa || (oa = !0,
                ao())
            }
            ,
            d.fx.stop = function() {
                oa = null
            }
            ,
            d.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            d.fn.delay = function(a, u) {
                return a = d.fx && d.fx.speeds[a] || a,
                u = u || "fx",
                this.queue(u, function(m, v) {
                    var b = e.setTimeout(m, a);
                    v.stop = function() {
                        e.clearTimeout(b)
                    }
                })
            }
            ,
            function() {
                var a = T.createElement("input")
                  , u = T.createElement("select")
                  , m = u.appendChild(T.createElement("option"));
                a.type = "checkbox",
                g.checkOn = a.value !== "",
                g.optSelected = m.selected,
                a = T.createElement("input"),
                a.value = "t",
                a.type = "radio",
                g.radioValue = a.value === "t"
            }();
            var iu, hs = d.expr.attrHandle;
            d.fn.extend({
                attr: function(a, u) {
                    return Ye(this, d.attr, a, u, arguments.length > 1)
                },
                removeAttr: function(a) {
                    return this.each(function() {
                        d.removeAttr(this, a)
                    })
                }
            }),
            d.extend({
                attr: function(a, u, m) {
                    var v, b, x = a.nodeType;
                    if (!(x === 3 || x === 8 || x === 2)) {
                        if (typeof a.getAttribute > "u")
                            return d.prop(a, u, m);
                        if ((x !== 1 || !d.isXMLDoc(a)) && (b = d.attrHooks[u.toLowerCase()] || (d.expr.match.bool.test(u) ? iu : void 0)),
                        m !== void 0) {
                            if (m === null) {
                                d.removeAttr(a, u);
                                return
                            }
                            return b && "set"in b && (v = b.set(a, m, u)) !== void 0 ? v : (a.setAttribute(u, m + ""),
                            m)
                        }
                        return b && "get"in b && (v = b.get(a, u)) !== null ? v : (v = d.find.attr(a, u),
                        v ?? void 0)
                    }
                },
                attrHooks: {
                    type: {
                        set: function(a, u) {
                            if (!g.radioValue && u === "radio" && L(a, "input")) {
                                var m = a.value;
                                return a.setAttribute("type", u),
                                m && (a.value = m),
                                u
                            }
                        }
                    }
                },
                removeAttr: function(a, u) {
                    var m, v = 0, b = u && u.match(Je);
                    if (b && a.nodeType === 1)
                        for (; m = b[v++]; )
                            a.removeAttribute(m)
                }
            }),
            iu = {
                set: function(a, u, m) {
                    return u === !1 ? d.removeAttr(a, m) : a.setAttribute(m, m),
                    m
                }
            },
            d.each(d.expr.match.bool.source.match(/\w+/g), function(a, u) {
                var m = hs[u] || d.find.attr;
                hs[u] = function(v, b, x) {
                    var M, z, D = b.toLowerCase();
                    return x || (z = hs[D],
                    hs[D] = M,
                    M = m(v, b, x) != null ? D : null,
                    hs[D] = z),
                    M
                }
            });
            var Kf = /^(?:input|select|textarea|button)$/i
              , Qf = /^(?:a|area)$/i;
            d.fn.extend({
                prop: function(a, u) {
                    return Ye(this, d.prop, a, u, arguments.length > 1)
                },
                removeProp: function(a) {
                    return this.each(function() {
                        delete this[d.propFix[a] || a]
                    })
                }
            }),
            d.extend({
                prop: function(a, u, m) {
                    var v, b, x = a.nodeType;
                    if (!(x === 3 || x === 8 || x === 2))
                        return (x !== 1 || !d.isXMLDoc(a)) && (u = d.propFix[u] || u,
                        b = d.propHooks[u]),
                        m !== void 0 ? b && "set"in b && (v = b.set(a, m, u)) !== void 0 ? v : a[u] = m : b && "get"in b && (v = b.get(a, u)) !== null ? v : a[u]
                },
                propHooks: {
                    tabIndex: {
                        get: function(a) {
                            var u = d.find.attr(a, "tabindex");
                            return u ? parseInt(u, 10) : Kf.test(a.nodeName) || Qf.test(a.nodeName) && a.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }),
            g.optSelected || (d.propHooks.selected = {
                get: function(a) {
                    var u = a.parentNode;
                    return u && u.parentNode && u.parentNode.selectedIndex,
                    null
                },
                set: function(a) {
                    var u = a.parentNode;
                    u && (u.selectedIndex,
                    u.parentNode && u.parentNode.selectedIndex)
                }
            }),
            d.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
                d.propFix[this.toLowerCase()] = this
            });
            function cn(a) {
                var u = a.match(Je) || [];
                return u.join(" ")
            }
            function fn(a) {
                return a.getAttribute && a.getAttribute("class") || ""
            }
            function oo(a) {
                return Array.isArray(a) ? a : typeof a == "string" ? a.match(Je) || [] : []
            }
            d.fn.extend({
                addClass: function(a) {
                    var u, m, v, b, x, M;
                    return p(a) ? this.each(function(z) {
                        d(this).addClass(a.call(this, z, fn(this)))
                    }) : (u = oo(a),
                    u.length ? this.each(function() {
                        if (v = fn(this),
                        m = this.nodeType === 1 && " " + cn(v) + " ",
                        m) {
                            for (x = 0; x < u.length; x++)
                                b = u[x],
                                m.indexOf(" " + b + " ") < 0 && (m += b + " ");
                            M = cn(m),
                            v !== M && this.setAttribute("class", M)
                        }
                    }) : this)
                },
                removeClass: function(a) {
                    var u, m, v, b, x, M;
                    return p(a) ? this.each(function(z) {
                        d(this).removeClass(a.call(this, z, fn(this)))
                    }) : arguments.length ? (u = oo(a),
                    u.length ? this.each(function() {
                        if (v = fn(this),
                        m = this.nodeType === 1 && " " + cn(v) + " ",
                        m) {
                            for (x = 0; x < u.length; x++)
                                for (b = u[x]; m.indexOf(" " + b + " ") > -1; )
                                    m = m.replace(" " + b + " ", " ");
                            M = cn(m),
                            v !== M && this.setAttribute("class", M)
                        }
                    }) : this) : this.attr("class", "")
                },
                toggleClass: function(a, u) {
                    var m, v, b, x, M = typeof a, z = M === "string" || Array.isArray(a);
                    return p(a) ? this.each(function(D) {
                        d(this).toggleClass(a.call(this, D, fn(this), u), u)
                    }) : typeof u == "boolean" && z ? u ? this.addClass(a) : this.removeClass(a) : (m = oo(a),
                    this.each(function() {
                        if (z)
                            for (x = d(this),
                            b = 0; b < m.length; b++)
                                v = m[b],
                                x.hasClass(v) ? x.removeClass(v) : x.addClass(v);
                        else
                            (a === void 0 || M === "boolean") && (v = fn(this),
                            v && oe.set(this, "__className__", v),
                            this.setAttribute && this.setAttribute("class", v || a === !1 ? "" : oe.get(this, "__className__") || ""))
                    }))
                },
                hasClass: function(a) {
                    var u, m, v = 0;
                    for (u = " " + a + " "; m = this[v++]; )
                        if (m.nodeType === 1 && (" " + cn(fn(m)) + " ").indexOf(u) > -1)
                            return !0;
                    return !1
                }
            });
            var Zf = /\r/g;
            d.fn.extend({
                val: function(a) {
                    var u, m, v, b = this[0];
                    return arguments.length ? (v = p(a),
                    this.each(function(x) {
                        var M;
                        this.nodeType === 1 && (v ? M = a.call(this, x, d(this).val()) : M = a,
                        M == null ? M = "" : typeof M == "number" ? M += "" : Array.isArray(M) && (M = d.map(M, function(z) {
                            return z == null ? "" : z + ""
                        })),
                        u = d.valHooks[this.type] || d.valHooks[this.nodeName.toLowerCase()],
                        (!u || !("set"in u) || u.set(this, M, "value") === void 0) && (this.value = M))
                    })) : b ? (u = d.valHooks[b.type] || d.valHooks[b.nodeName.toLowerCase()],
                    u && "get"in u && (m = u.get(b, "value")) !== void 0 ? m : (m = b.value,
                    typeof m == "string" ? m.replace(Zf, "") : m ?? "")) : void 0
                }
            }),
            d.extend({
                valHooks: {
                    option: {
                        get: function(a) {
                            var u = d.find.attr(a, "value");
                            return u ?? cn(d.text(a))
                        }
                    },
                    select: {
                        get: function(a) {
                            var u, m, v, b = a.options, x = a.selectedIndex, M = a.type === "select-one", z = M ? null : [], D = M ? x + 1 : b.length;
                            for (x < 0 ? v = D : v = M ? x : 0; v < D; v++)
                                if (m = b[v],
                                (m.selected || v === x) && !m.disabled && (!m.parentNode.disabled || !L(m.parentNode, "optgroup"))) {
                                    if (u = d(m).val(),
                                    M)
                                        return u;
                                    z.push(u)
                                }
                            return z
                        },
                        set: function(a, u) {
                            for (var m, v, b = a.options, x = d.makeArray(u), M = b.length; M--; )
                                v = b[M],
                                (v.selected = d.inArray(d.valHooks.option.get(v), x) > -1) && (m = !0);
                            return m || (a.selectedIndex = -1),
                            x
                        }
                    }
                }
            }),
            d.each(["radio", "checkbox"], function() {
                d.valHooks[this] = {
                    set: function(a, u) {
                        if (Array.isArray(u))
                            return a.checked = d.inArray(d(a).val(), u) > -1
                    }
                },
                g.checkOn || (d.valHooks[this].get = function(a) {
                    return a.getAttribute("value") === null ? "on" : a.value
                }
                )
            });
            var ms = e.location
              , ru = {
                guid: Date.now()
            }
              , lo = /\?/;
            d.parseXML = function(a) {
                var u, m;
                if (!a || typeof a != "string")
                    return null;
                try {
                    u = new e.DOMParser().parseFromString(a, "text/xml")
                } catch {}
                return m = u && u.getElementsByTagName("parsererror")[0],
                (!u || m) && d.error("Invalid XML: " + (m ? d.map(m.childNodes, function(v) {
                    return v.textContent
                }).join(`
`) : a)),
                u
            }
            ;
            var nu = /^(?:focusinfocus|focusoutblur)$/
              , su = function(a) {
                a.stopPropagation()
            };
            d.extend(d.event, {
                trigger: function(a, u, m, v) {
                    var b, x, M, z, D, j, J, ie, G = [m || T], se = w.call(a, "type") ? a.type : a, xe = w.call(a, "namespace") ? a.namespace.split(".") : [];
                    if (x = ie = M = m = m || T,
                    !(m.nodeType === 3 || m.nodeType === 8) && !nu.test(se + d.event.triggered) && (se.indexOf(".") > -1 && (xe = se.split("."),
                    se = xe.shift(),
                    xe.sort()),
                    D = se.indexOf(":") < 0 && "on" + se,
                    a = a[d.expando] ? a : new d.Event(se,typeof a == "object" && a),
                    a.isTrigger = v ? 2 : 3,
                    a.namespace = xe.join("."),
                    a.rnamespace = a.namespace ? new RegExp("(^|\\.)" + xe.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                    a.result = void 0,
                    a.target || (a.target = m),
                    u = u == null ? [a] : d.makeArray(u, [a]),
                    J = d.event.special[se] || {},
                    !(!v && J.trigger && J.trigger.apply(m, u) === !1))) {
                        if (!v && !J.noBubble && !S(m)) {
                            for (z = J.delegateType || se,
                            nu.test(z + se) || (x = x.parentNode); x; x = x.parentNode)
                                G.push(x),
                                M = x;
                            M === (m.ownerDocument || T) && G.push(M.defaultView || M.parentWindow || e)
                        }
                        for (b = 0; (x = G[b++]) && !a.isPropagationStopped(); )
                            ie = x,
                            a.type = b > 1 ? z : J.bindType || se,
                            j = (oe.get(x, "events") || Object.create(null))[a.type] && oe.get(x, "handle"),
                            j && j.apply(x, u),
                            j = D && x[D],
                            j && j.apply && Ht(x) && (a.result = j.apply(x, u),
                            a.result === !1 && a.preventDefault());
                        return a.type = se,
                        !v && !a.isDefaultPrevented() && (!J._default || J._default.apply(G.pop(), u) === !1) && Ht(m) && D && p(m[se]) && !S(m) && (M = m[D],
                        M && (m[D] = null),
                        d.event.triggered = se,
                        a.isPropagationStopped() && ie.addEventListener(se, su),
                        m[se](),
                        a.isPropagationStopped() && ie.removeEventListener(se, su),
                        d.event.triggered = void 0,
                        M && (m[D] = M)),
                        a.result
                    }
                },
                simulate: function(a, u, m) {
                    var v = d.extend(new d.Event, m, {
                        type: a,
                        isSimulated: !0
                    });
                    d.event.trigger(v, null, u)
                }
            }),
            d.fn.extend({
                trigger: function(a, u) {
                    return this.each(function() {
                        d.event.trigger(a, u, this)
                    })
                },
                triggerHandler: function(a, u) {
                    var m = this[0];
                    if (m)
                        return d.event.trigger(a, u, m, !0)
                }
            });
            var Jf = /\[\]$/
              , au = /\r?\n/g
              , ed = /^(?:submit|button|image|reset|file)$/i
              , td = /^(?:input|select|textarea|keygen)/i;
            function uo(a, u, m, v) {
                var b;
                if (Array.isArray(u))
                    d.each(u, function(x, M) {
                        m || Jf.test(a) ? v(a, M) : uo(a + "[" + (typeof M == "object" && M != null ? x : "") + "]", M, m, v)
                    });
                else if (!m && P(u) === "object")
                    for (b in u)
                        uo(a + "[" + b + "]", u[b], m, v);
                else
                    v(a, u)
            }
            d.param = function(a, u) {
                var m, v = [], b = function(x, M) {
                    var z = p(M) ? M() : M;
                    v[v.length] = encodeURIComponent(x) + "=" + encodeURIComponent(z ?? "")
                };
                if (a == null)
                    return "";
                if (Array.isArray(a) || a.jquery && !d.isPlainObject(a))
                    d.each(a, function() {
                        b(this.name, this.value)
                    });
                else
                    for (m in a)
                        uo(m, a[m], u, b);
                return v.join("&")
            }
            ,
            d.fn.extend({
                serialize: function() {
                    return d.param(this.serializeArray())
                },
                serializeArray: function() {
                    return this.map(function() {
                        var a = d.prop(this, "elements");
                        return a ? d.makeArray(a) : this
                    }).filter(function() {
                        var a = this.type;
                        return this.name && !d(this).is(":disabled") && td.test(this.nodeName) && !ed.test(a) && (this.checked || !Gt.test(a))
                    }).map(function(a, u) {
                        var m = d(this).val();
                        return m == null ? null : Array.isArray(m) ? d.map(m, function(v) {
                            return {
                                name: u.name,
                                value: v.replace(au, `\r
`)
                            }
                        }) : {
                            name: u.name,
                            value: m.replace(au, `\r
`)
                        }
                    }).get()
                }
            });
            var id = /%20/g
              , rd = /#.*$/
              , nd = /([?&])_=[^&]*/
              , sd = /^(.*?):[ \t]*([^\r\n]*)$/mg
              , ad = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
              , od = /^(?:GET|HEAD)$/
              , ld = /^\/\//
              , ou = {}
              , co = {}
              , lu = "*/".concat("*")
              , fo = T.createElement("a");
            fo.href = ms.href;
            function uu(a) {
                return function(u, m) {
                    typeof u != "string" && (m = u,
                    u = "*");
                    var v, b = 0, x = u.toLowerCase().match(Je) || [];
                    if (p(m))
                        for (; v = x[b++]; )
                            v[0] === "+" ? (v = v.slice(1) || "*",
                            (a[v] = a[v] || []).unshift(m)) : (a[v] = a[v] || []).push(m)
                }
            }
            function cu(a, u, m, v) {
                var b = {}
                  , x = a === co;
                function M(z) {
                    var D;
                    return b[z] = !0,
                    d.each(a[z] || [], function(j, J) {
                        var ie = J(u, m, v);
                        if (typeof ie == "string" && !x && !b[ie])
                            return u.dataTypes.unshift(ie),
                            M(ie),
                            !1;
                        if (x)
                            return !(D = ie)
                    }),
                    D
                }
                return M(u.dataTypes[0]) || !b["*"] && M("*")
            }
            function po(a, u) {
                var m, v, b = d.ajaxSettings.flatOptions || {};
                for (m in u)
                    u[m] !== void 0 && ((b[m] ? a : v || (v = {}))[m] = u[m]);
                return v && d.extend(!0, a, v),
                a
            }
            function ud(a, u, m) {
                for (var v, b, x, M, z = a.contents, D = a.dataTypes; D[0] === "*"; )
                    D.shift(),
                    v === void 0 && (v = a.mimeType || u.getResponseHeader("Content-Type"));
                if (v) {
                    for (b in z)
                        if (z[b] && z[b].test(v)) {
                            D.unshift(b);
                            break
                        }
                }
                if (D[0]in m)
                    x = D[0];
                else {
                    for (b in m) {
                        if (!D[0] || a.converters[b + " " + D[0]]) {
                            x = b;
                            break
                        }
                        M || (M = b)
                    }
                    x = x || M
                }
                if (x)
                    return x !== D[0] && D.unshift(x),
                    m[x]
            }
            function cd(a, u, m, v) {
                var b, x, M, z, D, j = {}, J = a.dataTypes.slice();
                if (J[1])
                    for (M in a.converters)
                        j[M.toLowerCase()] = a.converters[M];
                for (x = J.shift(); x; )
                    if (a.responseFields[x] && (m[a.responseFields[x]] = u),
                    !D && v && a.dataFilter && (u = a.dataFilter(u, a.dataType)),
                    D = x,
                    x = J.shift(),
                    x) {
                        if (x === "*")
                            x = D;
                        else if (D !== "*" && D !== x) {
                            if (M = j[D + " " + x] || j["* " + x],
                            !M) {
                                for (b in j)
                                    if (z = b.split(" "),
                                    z[1] === x && (M = j[D + " " + z[0]] || j["* " + z[0]],
                                    M)) {
                                        M === !0 ? M = j[b] : j[b] !== !0 && (x = z[0],
                                        J.unshift(z[1]));
                                        break
                                    }
                            }
                            if (M !== !0)
                                if (M && a.throws)
                                    u = M(u);
                                else
                                    try {
                                        u = M(u)
                                    } catch (ie) {
                                        return {
                                            state: "parsererror",
                                            error: M ? ie : "No conversion from " + D + " to " + x
                                        }
                                    }
                        }
                    }
                return {
                    state: "success",
                    data: u
                }
            }
            d.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: ms.href,
                    type: "GET",
                    isLocal: ad.test(ms.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": lu,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": JSON.parse,
                        "text xml": d.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function(a, u) {
                    return u ? po(po(a, d.ajaxSettings), u) : po(d.ajaxSettings, a)
                },
                ajaxPrefilter: uu(ou),
                ajaxTransport: uu(co),
                ajax: function(a, u) {
                    typeof a == "object" && (u = a,
                    a = void 0),
                    u = u || {};
                    var m, v, b, x, M, z, D, j, J, ie, G = d.ajaxSetup({}, u), se = G.context || G, xe = G.context && (se.nodeType || se.jquery) ? d(se) : d.event, qe = d.Deferred(), Pe = d.Callbacks("once memory"), Vt = G.statusCode || {}, zt = {}, lr = {}, ur = "canceled", $e = {
                        readyState: 0,
                        getResponseHeader: function(Be) {
                            var bt;
                            if (D) {
                                if (!x)
                                    for (x = {}; bt = sd.exec(b); )
                                        x[bt[1].toLowerCase() + " "] = (x[bt[1].toLowerCase() + " "] || []).concat(bt[2]);
                                bt = x[Be.toLowerCase() + " "]
                            }
                            return bt == null ? null : bt.join(", ")
                        },
                        getAllResponseHeaders: function() {
                            return D ? b : null
                        },
                        setRequestHeader: function(Be, bt) {
                            return D == null && (Be = lr[Be.toLowerCase()] = lr[Be.toLowerCase()] || Be,
                            zt[Be] = bt),
                            this
                        },
                        overrideMimeType: function(Be) {
                            return D == null && (G.mimeType = Be),
                            this
                        },
                        statusCode: function(Be) {
                            var bt;
                            if (Be)
                                if (D)
                                    $e.always(Be[$e.status]);
                                else
                                    for (bt in Be)
                                        Vt[bt] = [Vt[bt], Be[bt]];
                            return this
                        },
                        abort: function(Be) {
                            var bt = Be || ur;
                            return m && m.abort(bt),
                            dn(0, bt),
                            this
                        }
                    };
                    if (qe.promise($e),
                    G.url = ((a || G.url || ms.href) + "").replace(ld, ms.protocol + "//"),
                    G.type = u.method || u.type || G.method || G.type,
                    G.dataTypes = (G.dataType || "*").toLowerCase().match(Je) || [""],
                    G.crossDomain == null) {
                        z = T.createElement("a");
                        try {
                            z.href = G.url,
                            z.href = z.href,
                            G.crossDomain = fo.protocol + "//" + fo.host != z.protocol + "//" + z.host
                        } catch {
                            G.crossDomain = !0
                        }
                    }
                    if (G.data && G.processData && typeof G.data != "string" && (G.data = d.param(G.data, G.traditional)),
                    cu(ou, G, u, $e),
                    D)
                        return $e;
                    j = d.event && G.global,
                    j && d.active++ === 0 && d.event.trigger("ajaxStart"),
                    G.type = G.type.toUpperCase(),
                    G.hasContent = !od.test(G.type),
                    v = G.url.replace(rd, ""),
                    G.hasContent ? G.data && G.processData && (G.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (G.data = G.data.replace(id, "+")) : (ie = G.url.slice(v.length),
                    G.data && (G.processData || typeof G.data == "string") && (v += (lo.test(v) ? "&" : "?") + G.data,
                    delete G.data),
                    G.cache === !1 && (v = v.replace(nd, "$1"),
                    ie = (lo.test(v) ? "&" : "?") + "_=" + ru.guid++ + ie),
                    G.url = v + ie),
                    G.ifModified && (d.lastModified[v] && $e.setRequestHeader("If-Modified-Since", d.lastModified[v]),
                    d.etag[v] && $e.setRequestHeader("If-None-Match", d.etag[v])),
                    (G.data && G.hasContent && G.contentType !== !1 || u.contentType) && $e.setRequestHeader("Content-Type", G.contentType),
                    $e.setRequestHeader("Accept", G.dataTypes[0] && G.accepts[G.dataTypes[0]] ? G.accepts[G.dataTypes[0]] + (G.dataTypes[0] !== "*" ? ", " + lu + "; q=0.01" : "") : G.accepts["*"]);
                    for (J in G.headers)
                        $e.setRequestHeader(J, G.headers[J]);
                    if (G.beforeSend && (G.beforeSend.call(se, $e, G) === !1 || D))
                        return $e.abort();
                    if (ur = "abort",
                    Pe.add(G.complete),
                    $e.done(G.success),
                    $e.fail(G.error),
                    m = cu(co, G, u, $e),
                    !m)
                        dn(-1, "No Transport");
                    else {
                        if ($e.readyState = 1,
                        j && xe.trigger("ajaxSend", [$e, G]),
                        D)
                            return $e;
                        G.async && G.timeout > 0 && (M = e.setTimeout(function() {
                            $e.abort("timeout")
                        }, G.timeout));
                        try {
                            D = !1,
                            m.send(zt, dn)
                        } catch (Be) {
                            if (D)
                                throw Be;
                            dn(-1, Be)
                        }
                    }
                    function dn(Be, bt, vs, mo) {
                        var cr, ys, fr, Fr, qr, Yi = bt;
                        D || (D = !0,
                        M && e.clearTimeout(M),
                        m = void 0,
                        b = mo || "",
                        $e.readyState = Be > 0 ? 4 : 0,
                        cr = Be >= 200 && Be < 300 || Be === 304,
                        vs && (Fr = ud(G, $e, vs)),
                        !cr && d.inArray("script", G.dataTypes) > -1 && d.inArray("json", G.dataTypes) < 0 && (G.converters["text script"] = function() {}
                        ),
                        Fr = cd(G, Fr, $e, cr),
                        cr ? (G.ifModified && (qr = $e.getResponseHeader("Last-Modified"),
                        qr && (d.lastModified[v] = qr),
                        qr = $e.getResponseHeader("etag"),
                        qr && (d.etag[v] = qr)),
                        Be === 204 || G.type === "HEAD" ? Yi = "nocontent" : Be === 304 ? Yi = "notmodified" : (Yi = Fr.state,
                        ys = Fr.data,
                        fr = Fr.error,
                        cr = !fr)) : (fr = Yi,
                        (Be || !Yi) && (Yi = "error",
                        Be < 0 && (Be = 0))),
                        $e.status = Be,
                        $e.statusText = (bt || Yi) + "",
                        cr ? qe.resolveWith(se, [ys, Yi, $e]) : qe.rejectWith(se, [$e, Yi, fr]),
                        $e.statusCode(Vt),
                        Vt = void 0,
                        j && xe.trigger(cr ? "ajaxSuccess" : "ajaxError", [$e, G, cr ? ys : fr]),
                        Pe.fireWith(se, [$e, Yi]),
                        j && (xe.trigger("ajaxComplete", [$e, G]),
                        --d.active || d.event.trigger("ajaxStop")))
                    }
                    return $e
                },
                getJSON: function(a, u, m) {
                    return d.get(a, u, m, "json")
                },
                getScript: function(a, u) {
                    return d.get(a, void 0, u, "script")
                }
            }),
            d.each(["get", "post"], function(a, u) {
                d[u] = function(m, v, b, x) {
                    return p(v) && (x = x || b,
                    b = v,
                    v = void 0),
                    d.ajax(d.extend({
                        url: m,
                        type: u,
                        dataType: x,
                        data: v,
                        success: b
                    }, d.isPlainObject(m) && m))
                }
            }),
            d.ajaxPrefilter(function(a) {
                var u;
                for (u in a.headers)
                    u.toLowerCase() === "content-type" && (a.contentType = a.headers[u] || "")
            }),
            d._evalUrl = function(a, u, m) {
                return d.ajax({
                    url: a,
                    type: "GET",
                    dataType: "script",
                    cache: !0,
                    async: !1,
                    global: !1,
                    converters: {
                        "text script": function() {}
                    },
                    dataFilter: function(v) {
                        d.globalEval(v, u, m)
                    }
                })
            }
            ,
            d.fn.extend({
                wrapAll: function(a) {
                    var u;
                    return this[0] && (p(a) && (a = a.call(this[0])),
                    u = d(a, this[0].ownerDocument).eq(0).clone(!0),
                    this[0].parentNode && u.insertBefore(this[0]),
                    u.map(function() {
                        for (var m = this; m.firstElementChild; )
                            m = m.firstElementChild;
                        return m
                    }).append(this)),
                    this
                },
                wrapInner: function(a) {
                    return p(a) ? this.each(function(u) {
                        d(this).wrapInner(a.call(this, u))
                    }) : this.each(function() {
                        var u = d(this)
                          , m = u.contents();
                        m.length ? m.wrapAll(a) : u.append(a)
                    })
                },
                wrap: function(a) {
                    var u = p(a);
                    return this.each(function(m) {
                        d(this).wrapAll(u ? a.call(this, m) : a)
                    })
                },
                unwrap: function(a) {
                    return this.parent(a).not("body").each(function() {
                        d(this).replaceWith(this.childNodes)
                    }),
                    this
                }
            }),
            d.expr.pseudos.hidden = function(a) {
                return !d.expr.pseudos.visible(a)
            }
            ,
            d.expr.pseudos.visible = function(a) {
                return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
            }
            ,
            d.ajaxSettings.xhr = function() {
                try {
                    return new e.XMLHttpRequest
                } catch {}
            }
            ;
            var fd = {
                0: 200,
                1223: 204
            }
              , gs = d.ajaxSettings.xhr();
            g.cors = !!gs && "withCredentials"in gs,
            g.ajax = gs = !!gs,
            d.ajaxTransport(function(a) {
                var u, m;
                if (g.cors || gs && !a.crossDomain)
                    return {
                        send: function(v, b) {
                            var x, M = a.xhr();
                            if (M.open(a.type, a.url, a.async, a.username, a.password),
                            a.xhrFields)
                                for (x in a.xhrFields)
                                    M[x] = a.xhrFields[x];
                            a.mimeType && M.overrideMimeType && M.overrideMimeType(a.mimeType),
                            !a.crossDomain && !v["X-Requested-With"] && (v["X-Requested-With"] = "XMLHttpRequest");
                            for (x in v)
                                M.setRequestHeader(x, v[x]);
                            u = function(z) {
                                return function() {
                                    u && (u = m = M.onload = M.onerror = M.onabort = M.ontimeout = M.onreadystatechange = null,
                                    z === "abort" ? M.abort() : z === "error" ? typeof M.status != "number" ? b(0, "error") : b(M.status, M.statusText) : b(fd[M.status] || M.status, M.statusText, (M.responseType || "text") !== "text" || typeof M.responseText != "string" ? {
                                        binary: M.response
                                    } : {
                                        text: M.responseText
                                    }, M.getAllResponseHeaders()))
                                }
                            }
                            ,
                            M.onload = u(),
                            m = M.onerror = M.ontimeout = u("error"),
                            M.onabort !== void 0 ? M.onabort = m : M.onreadystatechange = function() {
                                M.readyState === 4 && e.setTimeout(function() {
                                    u && m()
                                })
                            }
                            ,
                            u = u("abort");
                            try {
                                M.send(a.hasContent && a.data || null)
                            } catch (z) {
                                if (u)
                                    throw z
                            }
                        },
                        abort: function() {
                            u && u()
                        }
                    }
            }),
            d.ajaxPrefilter(function(a) {
                a.crossDomain && (a.contents.script = !1)
            }),
            d.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function(a) {
                        return d.globalEval(a),
                        a
                    }
                }
            }),
            d.ajaxPrefilter("script", function(a) {
                a.cache === void 0 && (a.cache = !1),
                a.crossDomain && (a.type = "GET")
            }),
            d.ajaxTransport("script", function(a) {
                if (a.crossDomain || a.scriptAttrs) {
                    var u, m;
                    return {
                        send: function(v, b) {
                            u = d("<script>").attr(a.scriptAttrs || {}).prop({
                                charset: a.scriptCharset,
                                src: a.url
                            }).on("load error", m = function(x) {
                                u.remove(),
                                m = null,
                                x && b(x.type === "error" ? 404 : 200, x.type)
                            }
                            ),
                            T.head.appendChild(u[0])
                        },
                        abort: function() {
                            m && m()
                        }
                    }
                }
            });
            var fu = []
              , ho = /(=)\?(?=&|$)|\?\?/;
            d.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function() {
                    var a = fu.pop() || d.expando + "_" + ru.guid++;
                    return this[a] = !0,
                    a
                }
            }),
            d.ajaxPrefilter("json jsonp", function(a, u, m) {
                var v, b, x, M = a.jsonp !== !1 && (ho.test(a.url) ? "url" : typeof a.data == "string" && (a.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && ho.test(a.data) && "data");
                if (M || a.dataTypes[0] === "jsonp")
                    return v = a.jsonpCallback = p(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback,
                    M ? a[M] = a[M].replace(ho, "$1" + v) : a.jsonp !== !1 && (a.url += (lo.test(a.url) ? "&" : "?") + a.jsonp + "=" + v),
                    a.converters["script json"] = function() {
                        return x || d.error(v + " was not called"),
                        x[0]
                    }
                    ,
                    a.dataTypes[0] = "json",
                    b = e[v],
                    e[v] = function() {
                        x = arguments
                    }
                    ,
                    m.always(function() {
                        b === void 0 ? d(e).removeProp(v) : e[v] = b,
                        a[v] && (a.jsonpCallback = u.jsonpCallback,
                        fu.push(v)),
                        x && p(b) && b(x[0]),
                        x = b = void 0
                    }),
                    "script"
            }),
            g.createHTMLDocument = function() {
                var a = T.implementation.createHTMLDocument("").body;
                return a.innerHTML = "<form></form><form></form>",
                a.childNodes.length === 2
            }(),
            d.parseHTML = function(a, u, m) {
                if (typeof a != "string")
                    return [];
                typeof u == "boolean" && (m = u,
                u = !1);
                var v, b, x;
                return u || (g.createHTMLDocument ? (u = T.implementation.createHTMLDocument(""),
                v = u.createElement("base"),
                v.href = T.location.href,
                u.head.appendChild(v)) : u = T),
                b = Oe.exec(a),
                x = !m && [],
                b ? [u.createElement(b[1])] : (b = ge([a], u, x),
                x && x.length && d(x).remove(),
                d.merge([], b.childNodes))
            }
            ,
            d.fn.load = function(a, u, m) {
                var v, b, x, M = this, z = a.indexOf(" ");
                return z > -1 && (v = cn(a.slice(z)),
                a = a.slice(0, z)),
                p(u) ? (m = u,
                u = void 0) : u && typeof u == "object" && (b = "POST"),
                M.length > 0 && d.ajax({
                    url: a,
                    type: b || "GET",
                    dataType: "html",
                    data: u
                }).done(function(D) {
                    x = arguments,
                    M.html(v ? d("<div>").append(d.parseHTML(D)).find(v) : D)
                }).always(m && function(D, j) {
                    M.each(function() {
                        m.apply(this, x || [D.responseText, j, D])
                    })
                }
                ),
                this
            }
            ,
            d.expr.pseudos.animated = function(a) {
                return d.grep(d.timers, function(u) {
                    return a === u.elem
                }).length
            }
            ,
            d.offset = {
                setOffset: function(a, u, m) {
                    var v, b, x, M, z, D, j, J = d.css(a, "position"), ie = d(a), G = {};
                    J === "static" && (a.style.position = "relative"),
                    z = ie.offset(),
                    x = d.css(a, "top"),
                    D = d.css(a, "left"),
                    j = (J === "absolute" || J === "fixed") && (x + D).indexOf("auto") > -1,
                    j ? (v = ie.position(),
                    M = v.top,
                    b = v.left) : (M = parseFloat(x) || 0,
                    b = parseFloat(D) || 0),
                    p(u) && (u = u.call(a, m, d.extend({}, z))),
                    u.top != null && (G.top = u.top - z.top + M),
                    u.left != null && (G.left = u.left - z.left + b),
                    "using"in u ? u.using.call(a, G) : ie.css(G)
                }
            },
            d.fn.extend({
                offset: function(a) {
                    if (arguments.length)
                        return a === void 0 ? this : this.each(function(b) {
                            d.offset.setOffset(this, a, b)
                        });
                    var u, m, v = this[0];
                    if (v)
                        return v.getClientRects().length ? (u = v.getBoundingClientRect(),
                        m = v.ownerDocument.defaultView,
                        {
                            top: u.top + m.pageYOffset,
                            left: u.left + m.pageXOffset
                        }) : {
                            top: 0,
                            left: 0
                        }
                },
                position: function() {
                    if (this[0]) {
                        var a, u, m, v = this[0], b = {
                            top: 0,
                            left: 0
                        };
                        if (d.css(v, "position") === "fixed")
                            u = v.getBoundingClientRect();
                        else {
                            for (u = this.offset(),
                            m = v.ownerDocument,
                            a = v.offsetParent || m.documentElement; a && (a === m.body || a === m.documentElement) && d.css(a, "position") === "static"; )
                                a = a.parentNode;
                            a && a !== v && a.nodeType === 1 && (b = d(a).offset(),
                            b.top += d.css(a, "borderTopWidth", !0),
                            b.left += d.css(a, "borderLeftWidth", !0))
                        }
                        return {
                            top: u.top - b.top - d.css(v, "marginTop", !0),
                            left: u.left - b.left - d.css(v, "marginLeft", !0)
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var a = this.offsetParent; a && d.css(a, "position") === "static"; )
                            a = a.offsetParent;
                        return a || Wt
                    })
                }
            }),
            d.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function(a, u) {
                var m = u === "pageYOffset";
                d.fn[a] = function(v) {
                    return Ye(this, function(b, x, M) {
                        var z;
                        if (S(b) ? z = b : b.nodeType === 9 && (z = b.defaultView),
                        M === void 0)
                            return z ? z[u] : b[x];
                        z ? z.scrollTo(m ? z.pageXOffset : M, m ? M : z.pageYOffset) : b[x] = M
                    }, a, v, arguments.length)
                }
            }),
            d.each(["top", "left"], function(a, u) {
                d.cssHooks[u] = It(g.pixelPosition, function(m, v) {
                    if (v)
                        return v = or(m, u),
                        vi.test(v) ? d(m).position()[u] + "px" : v
                })
            }),
            d.each({
                Height: "height",
                Width: "width"
            }, function(a, u) {
                d.each({
                    padding: "inner" + a,
                    content: u,
                    "": "outer" + a
                }, function(m, v) {
                    d.fn[v] = function(b, x) {
                        var M = arguments.length && (m || typeof b != "boolean")
                          , z = m || (b === !0 || x === !0 ? "margin" : "border");
                        return Ye(this, function(D, j, J) {
                            var ie;
                            return S(D) ? v.indexOf("outer") === 0 ? D["inner" + a] : D.document.documentElement["client" + a] : D.nodeType === 9 ? (ie = D.documentElement,
                            Math.max(D.body["scroll" + a], ie["scroll" + a], D.body["offset" + a], ie["offset" + a], ie["client" + a])) : J === void 0 ? d.css(D, j, z) : d.style(D, j, J, z)
                        }, u, M ? b : void 0, M)
                    }
                })
            }),
            d.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, u) {
                d.fn[u] = function(m) {
                    return this.on(u, m)
                }
            }),
            d.fn.extend({
                bind: function(a, u, m) {
                    return this.on(a, null, u, m)
                },
                unbind: function(a, u) {
                    return this.off(a, null, u)
                },
                delegate: function(a, u, m, v) {
                    return this.on(u, a, m, v)
                },
                undelegate: function(a, u, m) {
                    return arguments.length === 1 ? this.off(a, "**") : this.off(u, a || "**", m)
                },
                hover: function(a, u) {
                    return this.on("mouseenter", a).on("mouseleave", u || a)
                }
            }),
            d.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(a, u) {
                d.fn[u] = function(m, v) {
                    return arguments.length > 0 ? this.on(u, null, m, v) : this.trigger(u)
                }
            });
            var dd = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
            d.proxy = function(a, u) {
                var m, v, b;
                if (typeof u == "string" && (m = a[u],
                u = a,
                a = m),
                !!p(a))
                    return v = n.call(arguments, 2),
                    b = function() {
                        return a.apply(u || this, v.concat(n.call(arguments)))
                    }
                    ,
                    b.guid = a.guid = a.guid || d.guid++,
                    b
            }
            ,
            d.holdReady = function(a) {
                a ? d.readyWait++ : d.ready(!0)
            }
            ,
            d.isArray = Array.isArray,
            d.parseJSON = JSON.parse,
            d.nodeName = L,
            d.isFunction = p,
            d.isWindow = S,
            d.camelCase = ct,
            d.type = P,
            d.now = Date.now,
            d.isNumeric = function(a) {
                var u = d.type(a);
                return (u === "number" || u === "string") && !isNaN(a - parseFloat(a))
            }
            ,
            d.trim = function(a) {
                return a == null ? "" : (a + "").replace(dd, "$1")
            }
            ;
            var pd = e.jQuery
              , hd = e.$;
            return d.noConflict = function(a) {
                return e.$ === d && (e.$ = hd),
                a && e.jQuery === d && (e.jQuery = pd),
                d
            }
            ,
            typeof t > "u" && (e.jQuery = e.$ = d),
            d
        })
    }(Ra)),
    Ra.exports
}
var kg = Ag();
const Wn = Mg(kg);
Ze.registerPlugin(Ce);
let Yo = null;
document.addEventListener("DOMContentLoaded", () => {
    setTimeout( () => {
        var i, r;
        (i = document.querySelector(".l-loading")) == null || i.classList.add("js-loaded"),
        (r = document.querySelector(".l-wrapper")) == null || r.classList.add("js-loaded")
    }
    , 0);
    const s = document.querySelector('[data-barba="container"]')
      , e = (s == null ? void 0 : s.dataset.barbaNamespace) ?? "";
    setTimeout( () => {
        Yf(e)
    }
    , e === "home" ? 400 : 100)
}
);
Lg();
fc.init({
    transitions: fh,
    prevent: ({el: s}) => s == null ? void 0 : s.classList.contains("no-barba")
});
fc.hooks.afterEnter(s => {
    requestAnimationFrame( () => {
        var i;
        const e = s.next.namespace;
        Yf(e);
        const t = (i = s.next.html.match(/<title>(.*?)<\/title>/)) == null ? void 0 : i[1];
        t && (document.title = t)
    }
    )
}
);
function Yf(s) {
    window.scrollTo(0, 0),
    Dg(),
    Ig(),
    $g(),
    Fg(),
    Og(),
    Hg(),
    Vg(),
    Bg(),
    Xg(),
    Yg(),
    Gg(),
    jg(),
    Ug(),
    Kg(),
    s === "home" && zg(),
    s === "about" && Rg(),
    s === "service" && Ng(),
    window.innerWidth > 768 && (Wg(),
    qg())
}
function Lg() {
    if (window.innerWidth <= 768)
        return;
    const s = new Cg({
        lerp: .1,
        duration: 1.1,
        smoothTouch: !1
    });
    function e(t) {
        s.raf(t),
        requestAnimationFrame(e)
    }
    requestAnimationFrame(e)
}
document.body.addEventListener("click", s => {
    if (s.target.closest(".l-header__btn")) {
        s.preventDefault(),
        s.stopPropagation(),
        document.body.classList.toggle("js-open");
        return
    }
    s.target.closest("a") && document.body.classList.remove("js-open")
}
);
function Og() {
    const s = document.querySelectorAll("[data-modal-target]")
      , e = document.querySelectorAll("[data-modal-close]")
      , t = document.querySelector(".p-member__mask");
    s.forEach(n => {
        n.addEventListener("click", function() {
            const o = n.getAttribute("data-modal-target")
              , l = document.getElementById(o);
            l && (l.classList.add("active"),
            document.body.classList.add("body-no-scroll"),
            t && t.classList.add("active"))
        })
    }
    ),
    e.forEach(n => {
        n.addEventListener("click", i)
    }
    ),
    document.querySelectorAll(".js-modal").forEach(n => {
        n.addEventListener("click", function(o) {
            o.target === n && i()
        })
    }
    ),
    t && t.addEventListener("click", i);
    function i() {
        document.querySelectorAll(".js-modal.active").forEach(n => {
            n.classList.remove("active")
        }
        ),
        document.body.classList.remove("body-no-scroll"),
        t && t.classList.remove("active")
    }
    document.querySelectorAll("a[href]").forEach(n => {
        n.addEventListener("click", () => {
            document.body.classList.remove("body-no-scroll")
        }
        )
    }
    ),
    document.querySelectorAll(".p-about__mvv__block__values__list__item").forEach(n => {
        const o = n.querySelector(".p-about__mvv__block__values__list__item__cap");
        o && (n.addEventListener("mouseenter", () => {
            o.classList.add("is-open")
        }
        ),
        n.addEventListener("mouseleave", () => {
            o.classList.remove("is-open")
        }
        ))
    }
    )
}
function Dg() {
    Yo && Yo.destroy(!0, !0),
    Yo = new bi(".swiper-news",{
        loop: !1,
        centeredSlides: !1,
        speed: 600,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: !1,
            draggable: !0
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 18
            },
            769: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 34
            }
        }
    }),
    new bi(".p-about__service__slider",{
        loop: !0,
        effect: "fade",
        autoplay: {
            delay: 1e3,
            disableOnInteraction: !1
        },
        speed: 2e3
    })
}
function Ig() {
    Ce.getAll().forEach(r => r.kill());
    const s = document.querySelector("#trigger-section");
    if (s) {
        const r = window.matchMedia("(max-width: 768px)").matches
          , n = r ? "top -8%" : "top -24%";
        Ze.fromTo(s, {
            opacity: 0,
            scale: 1.05
        }, {
            opacity: 1,
            scale: 1,
            ease: "sine.out",
            scrollTrigger: {
                trigger: s,
                start: n,
                end: r ? "+=200" : "+=500",
                scrub: !0,
                onEnter: () => {
                    var o;
                    (o = document.querySelector(".p-top__service__block__slider__img")) == null || o.classList.add("js-active")
                }
                ,
                onLeaveBack: () => {
                    var o;
                    (o = document.querySelector(".p-top__service__block__slider__img")) == null || o.classList.remove("js-active")
                }
            }
        }),
        Ce.create({
            trigger: s,
            start: "top -50px",
            end: r ? "+=0" : "+=1600",
            pin: !r
        })
    }
    const e = document.querySelector(".c-recruit__box__img__slider__list--01")
      , t = document.querySelector(".c-recruit__box__img__slider__list--02")
      , i = document.querySelector(".c-recruit__box");
    e && i && Ze.fromTo(e, {
        yPercent: -20
    }, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
            trigger: i,
            start: "top bottom",
            end: "bottom top",
            scrub: !0
        }
    }),
    t && i && Ze.fromTo(t, {
        yPercent: 10
    }, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
            trigger: i,
            start: "top bottom",
            end: "bottom top",
            scrub: !0
        }
    }),
    window.innerWidth >= 768 && Ze.fromTo(".l-wrapper__back__block__img__item", {
        xPercent: 0
    }, {
        xPercent: 25,
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
            trigger: ".l-wrapper__back",
            start: "top 0",
            end: "bottom 0%",
            scrub: !0
        }
    })
}
function zg() {
    Ce.create({
        trigger: ".p-top__service",
        start: "top -50px",
        end: "+=1900",
        scrub: !0,
        onUpdate: s => {
            const e = document.getElementById("js-mouse-stalker");
            if (!e)
                return;
            const t = s.progress;
            t >= .2 && t < 1 ? e.classList.add("is-active") : e.classList.remove("is-active")
        }
    }),
    window.innerWidth >= 768 && Ze.fromTo(".p-top__service", {}, {
        yPercent: 100,
        ease: "none",
        scrollTrigger: {
            trigger: ".p-top__news",
            start: "top 100%",
            end: "bottom top",
            scrub: !0
        }
    })
}
function Rg() {
    Ze.fromTo(".p-about__img", {
        opacity: 1
    }, {
        top: 40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".p-about__img",
            start: "top top",
            end: "bottom -100%",
            scrub: !0
        }
    }),
    Ze.fromTo(".p-about__service", {
        yPercent: -60
    }, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".p-about__service",
            start: "top bottom",
            end: "bottom 20%",
            scrub: !0
        }
    })
}
function Ng({containerSelector: s=".p-service__list__item__sm__intro", imageSelector: e=".p-service__list__item__sm__intro__img", videoSelector: t=".p-service__list__item__sm__intro__video", threshold: i=.05, delay: r=.8, fadeDuration: n=1.5}={}) {
    const o = document.querySelectorAll(s);
    o.length && o.forEach(l => {
        const c = l.querySelector(e)
          , f = l.querySelector(t);
        if (!c || !f)
            return;
        Ze.timeline({
            scrollTrigger: {
                trigger: l,
                start: "top 100%",
                toggleActions: "play none none none",
                once: !0,
                threshold: i
            }
        }).set(c, {
            display: "block",
            opacity: 1
        }).set(f, {
            display: "block",
            opacity: 0
        }).to({}, {
            duration: r
        }).call( () => {
            f.play().catch( () => console.warn("Autoplay prevented"))
        }
        ).to(c, {
            opacity: 0,
            duration: n,
            ease: "power2.out"
        }).to(f, {
            opacity: 1,
            duration: n,
            ease: "power2.out"
        }, `-=${n}`)
    }
    )
}
function $g() {
    document.querySelectorAll(".m-effect--copyline").forEach(e => {
        const t = e.textContent.trim();
        e.textContent = "",
        t.split("").forEach(r => {
            const n = document.createElement("span");
            n.textContent = r,
            e.appendChild(n)
        }
        );
        const i = e.querySelectorAll("span");
        Ze.timeline({
            scrollTrigger: {
                trigger: e,
                start: "top 80%",
                end: "top 20%",
                scrub: .5
            }
        }).fromTo(e, {
            opacity: 0,
            y: 10
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }).fromTo(i, {
            opacity: 1,
            color: "rgba(220, 220, 220, 1)"
        }, {
            opacity: 1,
            color: "rgba(145, 166, 180, 1)",
            stagger: .1,
            duration: .2,
            ease: "power1.out"
        }, "-=0.3")
    }
    )
}
function Hg() {
    document.querySelectorAll('a[href^="#"]').forEach(t => {
        t.addEventListener("click", function(i) {
            const r = this.getAttribute("href").slice(1)
              , n = document.getElementById(r);
            if (n) {
                i.preventDefault();
                const o = n.getBoundingClientRect().top + window.pageYOffset - 120;
                window.scrollTo({
                    top: o,
                    behavior: "smooth"
                })
            }
        })
    }
    );
    const e = window.location.hash;
    if (e) {
        const t = document.querySelector(e);
        t && setTimeout( () => {
            const i = t.getBoundingClientRect().top + window.pageYOffset - 120;
            window.scrollTo({
                top: i,
                behavior: "smooth"
            })
        }
        , 120)
    }
}
function Fg() {
    Wn(window).off("scroll").on("scroll", function() {
        const s = Wn(this).scrollTop()
          , e = Wn(this).height()
          , t = Wn(document).height();
        Wn("body").toggleClass("js-scroll-top", s > 500),
        Wn("body").toggleClass("js-scroll-bottom", s + e >= t - 200)
    })
}
function qg() {
    if (window.innerWidth < 768)
        return;
    const s = document.getElementById("js-mouse-stalker");
    if (!s)
        return;
    let e = 0
      , t = 0
      , i = 0
      , r = 0;
    document.addEventListener("mousemove", n => {
        e = n.clientX,
        t = n.clientY
    }
    ),
    Ze.ticker.add( () => {
        i += (e - i) * .05,
        r += (t - r) * .05,
        Ze.set(s, {
            x: i,
            y: r
        })
    }
    ),
    document.querySelectorAll(".js-cursor-area").forEach(n => {
        Ce.create({
            trigger: n,
            start: "top center",
            end: "bottom center",
            onEnter: () => s.classList.add("is-active"),
            onLeave: () => s.classList.remove("is-active"),
            onEnterBack: () => s.classList.add("is-active"),
            onLeaveBack: () => s.classList.remove("is-active")
        })
    }
    )
}
function Bg() {
    Ze.utils.toArray(".m-popup-item").forEach(s => {
        Ze.fromTo(s, {
            opacity: 0,
            scale: .8
        }, {
            opacity: 1,
            scale: 1,
            duration: .8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: s,
                start: "top 70%",
                toggleActions: "play reverse play reverse"
            }
        })
    }
    ),
    Ze.utils.toArray(".m-popup-item-quick").forEach(s => {
        Ze.fromTo(s, {
            opacity: 0,
            scale: .8
        }, {
            opacity: 1,
            scale: 1,
            duration: .8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: s,
                start: "top 100%",
                toggleActions: "play reverse play reverse"
            }
        })
    }
    ),
    Ze.utils.toArray(".m-popup-item-delay").forEach(s => {
        Ze.fromTo(s, {
            opacity: 0,
            scale: .7
        }, {
            opacity: 1,
            scale: 1,
            duration: .8,
            ease: "power2.out",
            delay: .3,
            scrollTrigger: {
                trigger: s,
                start: "top 70%",
                toggleActions: "play reverse play reverse"
            }
        })
    }
    )
}
function jg() {
    Ze.utils.toArray(".m-popup-material").forEach( (s, e) => {
        Ze.fromTo(s, {
            opacity: 0,
            scale: .8
        }, {
            opacity: 1,
            scale: 1,
            duration: .8,
            ease: "expoScale",
            delay: .5 + e * .25,
            scrollTrigger: {
                trigger: s,
                start: "top 135%",
                toggleActions: "play reverse play reverse"
            }
        })
    }
    )
}
function Xg() {
    document.querySelectorAll(".js-video").forEach(e => {
        typeof e.play == "function" && setTimeout( () => {
            e.play().catch(t => {
                console.warn("Autoplay failed:", t, e)
            }
            )
        }
        , 50)
    }
    )
}
function Yg() {
    document.querySelectorAll(".m-text-split").forEach( (e, t) => {
        const i = e.textContent;
        e.textContent = "",
        i.split("").forEach(n => {
            const o = document.createElement("span");
            o.textContent = n,
            e.appendChild(o)
        }
        );
        const r = e.querySelectorAll("span");
        Ze.to(r, {
            opacity: 1,
            y: 0,
            duration: .1,
            scale: 1,
            stagger: .08,
            delay: t * .6,
            scrollTrigger: {
                trigger: e,
                start: "top 100%",
                toggleActions: "play reverse play reverse"
            }
        })
    }
    )
}
function Wg() {
    document.querySelectorAll(".js-cursor-target").forEach(s => {
        let e = !1
          , t = .15
          , i = .5;
        s.classList.contains("js-cursor-target--max") ? (t = 15,
        i = 8) : s.classList.contains("js-cursor-target--large") && (t = 3,
        i = 3),
        s.addEventListener("mouseenter", () => {
            e = !0
        }
        ),
        s.addEventListener("mouseleave", () => {
            e = !1,
            Ze.to(s, {
                x: 0,
                y: 0,
                duration: .8,
                ease: "power2.out"
            })
        }
        ),
        document.addEventListener("mousemove", r => {
            if (!e)
                return;
            const n = s.getBoundingClientRect()
              , o = n.left + n.width / 2
              , l = n.top + n.height / 2
              , c = r.clientX - o
              , f = r.clientY - l
              , h = Math.sqrt(c * c + f * f)
              , w = Math.min(h / 400, 1)
              , _ = c * t * w
              , y = f * i * w;
            Ze.to(s, {
                x: _,
                y,
                duration: .8,
                ease: "power3.out"
            })
        }
        )
    }
    ),
    setTimeout( () => {
        const s = new MouseEvent("mousemove",{
            clientX: window.innerWidth / 2 + 1,
            clientY: window.innerHeight / 2 + 1,
            bubbles: !0
        });
        document.dispatchEvent(s)
    }
    , 50)
}
function Gg() {
    document.querySelectorAll(".m-text-reveal-wrapper").forEach(e => {
        const t = e.querySelector(".m-text-reveal-wrapper__mask")
          , i = e.querySelector(".m-text-reveal-wrapper__text");
        Ze.timeline({
            scrollTrigger: {
                trigger: e,
                start: "top 130%",
                toggleActions: "play reverse play reverse"
            }
        }).to(t, {
            x: "101%",
            duration: .9,
            ease: "power2.out",
            delay: ".5"
        }).to(i, {
            opacity: 1,
            y: 0,
            duration: .6,
            ease: "power2.out"
        }, "-=0.5")
    }
    )
}
function Vg() {
    Ze.utils.toArray(".js-float-item").forEach( (s, e) => {
        Ze.to(s, {
            y: 30,
            scale: 1.05,
            rotation: .5,
            opacity: 1,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: !0,
            ease: "sine.inOut",
            delay: e * .8
        })
    }
    )
}
function Ug() {
    const s = document.querySelectorAll(".js-motion")
      , e = new IntersectionObserver(t => {
        t.forEach(i => {
            i.isIntersecting ? i.target.classList.add("js-active") : i.target.classList.remove("js-active")
        }
        )
    }
    ,{
        threshold: 0
    });
    s.forEach(t => e.observe(t))
}
function Kg() {
    const s = document.querySelector(".l-wrapper__back");
    s && setTimeout( () => {
        s.classList.add("js-loaded")
    }
    , 0)
}
