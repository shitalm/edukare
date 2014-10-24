function contentLoaded(e, t) {
    var n = !1,
        r = !0,
        i = e.document,
        s = i.documentElement,
        o = i.addEventListener ? "addEventListener" : "attachEvent",
        u = i.addEventListener ? "removeEventListener" : "detachEvent",
        a = i.addEventListener ? "" : "on",
        f = function(r) {
            if (r.type == "readystatechange" && i.readyState != "complete") return;
            (r.type == "load" ? e : i)[u](a + r.type, f, !1), !n && (n = !0) && t.call(e, r.type || r)
        },
        l = function() {
            try {
                s.doScroll("left")
            } catch (e) {
                setTimeout(l, 50);
                return
            }
            f("poll")
        };
    if (i.readyState == "complete") t.call(e, "lazy");
    else {
        if (i.createEventObject && s.doScroll) {
            try {
                r = !e.frameElement
            } catch (c) {}
            r && l()
        }
        i[o](a + "DOMContentLoaded", f, !1), i[o](a + "readystatechange", f, !1), e[o](a + "load", f, !1)
    }
}
var getElementsByClassName = function(e, t, n) {
        return document.getElementsByClassName ? getElementsByClassName = function(e, t, n) {
            n = n || document;
            var r = n.getElementsByClassName(e),
                i = t ? new RegExp("\\b" + t + "\\b", "i") : null,
                s = [],
                o;
            for (var u = 0, a = r.length; u < a; u += 1) o = r[u], (!i || i.test(o.nodeName)) && s.push(o);
            return s
        } : document.evaluate ? getElementsByClassName = function(e, t, n) {
            t = t || "*", n = n || document;
            var r = e.split(" "),
                i = "",
                s = "http://www.w3.org/1999/xhtml",
                o = document.documentElement.namespaceURI === s ? s : null,
                u = [],
                a, f;
            for (var l = 0, c = r.length; l < c; l += 1) i += "[contains(concat(' ', @class, ' '), ' " + r[l] + " ')]";
            try {
                a = document.evaluate(".//" + t + i, n, o, 0, null)
            } catch (h) {
                a = document.evaluate(".//" + t + i, n, null, 0, null)
            }
            while (f = a.iterateNext()) u.push(f);
            return u
        } : getElementsByClassName = function(e, t, n) {
            t = t || "*", n = n || document;
            var r = e.split(" "),
                i = [],
                s = t === "*" && n.all ? n.all : n.getElementsByTagName(t),
                o, u = [],
                a;
            for (var f = 0, l = r.length; f < l; f += 1) i.push(new RegExp("(^|\\s)" + r[f] + "(\\s|$)"));
            for (var c = 0, h = s.length; c < h; c += 1) {
                o = s[c], a = !1;
                for (var p = 0, d = i.length; p < d; p += 1) {
                    a = i[p].test(o.className);
                    if (!a) break
                }
                a && u.push(o)
            }
            return u
        }, getElementsByClassName(e, t, n)
    },
    JSON;
JSON || (JSON = {}),
    function() {
        "use strict";

        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var n, r, i, s, o = gap,
                u, a = t[e];
            a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
            switch (typeof a) {
                case "string":
                    return quote(a);
                case "number":
                    return isFinite(a) ? String(a) : "null";
                case "boolean":
                case "null":
                    return String(a);
                case "object":
                    if (!a) return "null";
                    gap += indent, u = [];
                    if (Object.prototype.toString.apply(a) === "[object Array]") {
                        s = a.length;
                        for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                        return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                    }
                    if (rep && typeof rep == "object") {
                        s = rep.length;
                        for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                    } else
                        for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                    return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
            }
        }
        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(e) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
            var r;
            gap = "", indent = "";
            if (typeof n == "number")
                for (r = 0; r < n; r += 1) indent += " ";
            else typeof n == "string" && (indent = n);
            rep = t;
            if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                "": e
            });
            throw new Error("JSON.stringify")
        }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i == "object")
                    for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                return reviver.call(e, t, i)
            }
            var j;
            text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(),
    function() {
        var e = [].slice;
        this.Events = {
            on: function(e, t) {
                var n, r, i, s, o;
                r = e.split(" "), n = this.hasOwnProperty("_callbacks") && this._callbacks || (this._callbacks = {});
                for (s = 0, o = r.length; s < o; s++) i = r[s], n[i] || (n[i] = []), n[i].push(t);
                return this
            },
            one: function(e, t) {
                return this.on(e, function() {
                    return this.off(e, arguments.callee), t.apply(this, arguments)
                })
            },
            trigger: function() {
                var t, n, r, i, s, o, u;
                t = 1 <= arguments.length ? e.call(arguments, 0) : [], r = t.shift(), i = this.hasOwnProperty("_callbacks") && ((u = this._callbacks) != null ? u[r] : void 0);
                if (!i) return !0;
                for (s = 0, o = i.length; s < o; s++) {
                    n = i[s];
                    if (n.apply(this, t) === !1) return !1
                }
                return !0
            },
            off: function(e, t) {
                var n, r, i, s, o, u;
                if (!e) return this._callbacks = {}, this;
                i = (u = this._callbacks) != null ? u[e] : void 0;
                if (!i) return this;
                if (!t) return delete this._callbacks[e], this;
                for (r = s = 0, o = i.length; s < o; r = ++s) {
                    n = i[r];
                    if (n !== t) continue;
                    i = i.slice(), i.splice(r, 1), this._callbacks[e] = i;
                    break
                }
                return this
            },
            extend: function(e) {
                var t, n;
                for (n in this) t = this[n], n !== "extend" && (e[n] = t);
                return e
            }
        }
    }.call(this),
    function() {
        var e = function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            },
            t = [].slice;
        this.FrameChannel = function() {
            function n(t, n) {
                this.origin = t != null ? t : "*", this.target = n != null ? n : null, this.receive = e(this.receive, this);
                if (!this.supported) return;
                window.addEventListener("message", this.receive), this.pending = []
            }
            return Events.extend(n.prototype), n.prototype.supported = (window.postMessage && window.addEventListener) != null, n.prototype.receive = function(e) {
                var t;
                if (this.origin !== "*" && this.origin !== e.origin) return;
                return this.target || (this.target = e.source, this.sendPending()), t = JSON.parse(e.data), this.trigger.apply(this, t)
            }, n.prototype.send = function() {
                var e;
                e = 1 <= arguments.length ? t.call(arguments, 0) : [];
                if (!this.supported) return;
                return this.target ? this.target.postMessage(JSON.stringify(e), this.origin) : this.pending.push(e)
            }, n.prototype.sendPending = function() {
                var e, t;
                t = [];
                while (e = this.pending.shift()) t.push(this.send.apply(this, e));
                return t
            }, n.prototype.close = function() {
                if (!this.supported) return;
                return window.removeEventListener("message", this.receive)
            }, n
        }()
    }.call(this),
    function() {
        var e = function(e, t) {
                return function() {
                    return e.apply(t, arguments)
                }
            },
            t = [].slice;
        this.SpeakerDeck || (this.SpeakerDeck = {}), SpeakerDeck.API = function() {
            function n(t) {
                var n = this;
                this.iframe = t, this.preventDefault = e(this.preventDefault, this), this.sendEvent = e(this.sendEvent, this), this.channel = new FrameChannel("" + this.protocol + "://" + this.host, this.iframe.contentWindow);
                if (!this.supported) return;
                document.addEventListener("keydown", this.sendEvent, !1), document.addEventListener("keypress", this.preventDefault), this.on("change", function(e) {
                    return n.currentSlide = e
                }), this.channel.send("ready")
            }
            return n.prototype.host = "speakerdeck.com", n.prototype.protocol = "https", n.prototype.supported = document.addEventListener, n.prototype.on = function() {
                var e, n;
                return e = 1 <= arguments.length ? t.call(arguments, 0) : [], (n = this.channel).on.apply(n, e)
            }, n.prototype.nextSlide = function() {
                return this.channel.send("nextSlide")
            }, n.prototype.previousSlide = function() {
                return this.channel.send("previousSlide")
            }, n.prototype.goToSlide = function(e) {
                return this.channel.send("goToSlide", e)
            }, n.prototype.sendEvent = function(e) {
                var t, n, r, i;
                if (!this.shouldSendKeyboard()) return;
                n = {};
                for (t in e) {
                    r = e[t];
                    if ((i = typeof r) === "string" || i === "number" || i === "boolean") n[t] = r
                }
                return this.channel.send(n.type, n)
            }, n.prototype.preventDefault = function(e) {
                if (this.shouldSendKeyboard() && e.keyCode === 32) return e.preventDefault()
            }, n.prototype.shouldSendKeyboard = function() {
                return document.activeElement === document.body && window.location.host === this.host
            }, n.prototype.release = function() {
                return this.channel.close(), document.removeEventListener("keydown", this.sendEvent, !1)
            }, n
        }()
    }.call(this),
    function() {
        var e, t, n, r = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        };
        e = function() {
            function e(e, t) {
                var n;
                this.element = e, this.params = t, this.ready = r(this.ready, this), this.resize = r(this.resize, this), this.container = this.element.parentNode, this.id = this.element.getAttribute("data-id"), this.ratio = this.element.getAttribute("data-ratio") || 4 / 3, (n = this.params) == null && (this.params = {}), this.params.slide = this.element.getAttribute("data-slide") || this.slideFromHash(), this.params.type = this.element.getAttribute("data-type")
            }
            return e.init = function() {
                var t, n, r, i, s;
                n = getElementsByClassName("speakerdeck-embed"), s = [];
                for (r = 0, i = n.length; r < i; r++) t = n[r], s.push((new e(t)).setup());
                return s
            }, e.prototype.url = function() {
                return "//speakerdeck.com/player/" + this.id + "?" + this.toParam()
            }, e.prototype.toParam = function() {
                var e, t;
                return function() {
                    var n, r;
                    n = this.params, r = [];
                    for (e in n) t = n[e], t && r.push("" + e + "=" + encodeURIComponent(t));
                    return r
                }.call(this).join("&")
            }, e.prototype.setup = function() {
                return this.createFrame(), this.bindEvents(), this.insert(), this.resize()
            }, e.prototype.createFrame = function() {
                return this.iframe = document.createElement("iframe"), this.iframe.className = "speakerdeck-iframe", this.iframe.style.border = "0", this.iframe.style.background = "transparent", this.iframe.style.margin = "0", this.iframe.style.padding = "0", this.iframe.border = 0, this.iframe.frameBorder = 0, this.iframe.allowTransparency = !0, this.iframe.src = this.url(), this.iframe.setAttribute("allowfullscreen", !0), this.iframe.setAttribute("mozallowfullscreen", !0), this.iframe.setAttribute("webkitallowfullscreen", !0), this.iframe.style["-webkit-border-radius"] = "5px", this.iframe.style["-moz-border-radius"] = "5px", this.iframe.style["border-radius"] = "5px", this.wrapper = document.createElement("div"), this.wrapper.appendChild(this.iframe)
            }, e.prototype.insert = function() {
                return this.container.replaceChild(this.wrapper, this.element)
            }, e.prototype.resize = function() {
                return this.iframe.style.width = this.width() + "px", this.iframe.style.height = this.height() + "px"
            }, e.prototype.width = function() {
                return this.wrapper.offsetWidth
            }, e.prototype.height = function() {
                return this.width() / this.ratio + 62
            }, e.prototype.bindEvents = function() {
                return t(window, "resize", n(this.resize, 100)), t(this.iframe, "load", this.ready)
            }, e.prototype.ready = function() {
                return this.api = new SpeakerDeck.API(this.iframe), typeof window.onSpeakerDeckPlayerReady == "function" ? window.onSpeakerDeckPlayerReady(this.api) : void 0
            }, e.prototype.slideFromHash = function() {
                var e;
                if (e = window.location.hash.match(/^#(\d+)$/)) return Number(e[1])
            }, e
        }.call(this), t = function(e, t, n) {
            return e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
        }, n = function(e, t) {
            var n;
            return n = null,
                function() {
                    var r, i;
                    return i = this, r = arguments, clearTimeout(n), n = setTimeout(function() {
                        return e.apply(i, r)
                    }, t)
                }
        }, this.SpeakerDeck && (this.SpeakerDeck.Embed = e), contentLoaded(window, e.init), t(window, "popstate", e.init), t(document, "speakerdeck", e.init)
    }.call(this);