/**
 * TinyMCE version 7.8.0 (TBD)
 */
! function() {
    "use strict";
    var e = tinymce.util.Tools.resolve("tinymce.PluginManager");
// MY CUSTOM HELPER START
const myPluginSearchHelper = { debounceTimer: null, handleSearch: function(dialogApi, query) { clearTimeout(this.debounceTimer); this.debounceTimer = setTimeout(() => { const resultsContainer = document.querySelector('#tinymce-plugin-search-results'); if (!resultsContainer) { console.error("Search results container not found for TinyMCE plugin."); return; } if (query && query.trim().length > 0) { fetch('/assets/plugins/tinymce7/plugins/customlink/search.php?q=' + encodeURIComponent(query.trim())).then(response => { if (!response.ok) { throw new Error('Network response was not ok: ' + response.statusText); } return response.json(); }).then(data => { resultsContainer.innerHTML = ''; if (data && data.length > 0) { data.forEach(item => { const resultItem = document.createElement('div'); resultItem.textContent = item.pagetitle; resultItem.style.padding = '2px 5px'; resultItem.style.cursor = 'pointer'; resultItem.setAttribute('data-id', item.id); resultItem.onmouseover = () => { resultItem.style.backgroundColor = '#eeeeee'; }; resultItem.onmouseout = () => { resultItem.style.backgroundColor = 'transparent'; }; resultItem.onclick = () => { dialogApi.setData({ url: { value: '[~' + item.id + '~]' } }); resultsContainer.innerHTML = ''; }; resultsContainer.appendChild(resultItem); }); } else { resultsContainer.innerHTML = '<div style="padding:2px 5px; color: #777;">No results found.</div>'; } }).catch(error => { console.error('Error fetching search results for TinyMCE plugin:', error); resultsContainer.innerHTML = '<div style="padding:2px 5px; color: red;">Error loading results: ' + error.message + '</div>'; }); } else { resultsContainer.innerHTML = ''; } }, 300); } };
// MY CUSTOM HELPER END
    const t = e => t => (e => {
            const t = typeof e;
            return null === e ? "null" : "object" === t && Array.isArray(e) ? "array" : "object" === t && (n = o = e, (r = String).prototype.isPrototypeOf(n) || (null === (l = o.constructor) || void 0 === l ? void 0 : l.name) === r.name) ? "string" : t;
            var n, o, r, l
        })(t) === e,
        n = e => t => typeof t === e,
        o = t("string"),
        r = t("object"),
        l = t("array"),
        s = e => null === e;
    const i = n("boolean"),
        a = e => !(e => null == e)(e),
        c = n("function"),
        u = (e, t) => {
            if (l(e)) {
                for (let n = 0, o = e.length; n < o; ++n)
                    if (!t(e[n])) return !1;
                return !0
            }
            return !1
        },
        g = () => {},
        d = (e, t) => e === t;
    class m {
        constructor(e, t) {
            this.tag = e, this.value = t
        }
        static some(e) {
            return new m(!0, e)
        }
        static none() {
            return m.singletonNone
        }
        fold(e, t) {
            return this.tag ? t(this.value) : e()
        }
        isSome() {
            return this.tag
        }
        isNone() {
            return !this.tag
        }
        map(e) {
            return this.tag ? m.some(e(this.value)) : m.none()
        }
        bind(e) {
            return this.tag ? e(this.value) : m.none()
        }
        exists(e) {
            return this.tag && e(this.value)
        }
        forall(e) {
            return !this.tag || e(this.value)
        }
        filter(e) {
            return !this.tag || e(this.value) ? this : m.none()
        }
        getOr(e) {
            return this.tag ? this.value : e
        }
        or(e) {
            return this.tag ? this : e
        }
        getOrThunk(e) {
            return this.tag ? this.value : e()
        }
        orThunk(e) {
            return this.tag ? this : e()
        }
        getOrDie(e) {
            if (this.tag) return this.value;
            throw new Error(null != e ? e : "Called getOrDie on None")
        }
        static from(e) {
            return a(e) ? m.some(e) : m.none()
        }
        getOrNull() {
            return this.tag ? this.value : null
        }
        getOrUndefined() {
            return this.value
        }
        each(e) {
            this.tag && e(this.value)
        }
        toArray() {
            return this.tag ? [this.value] : []
        }
        toString() {
            return this.tag ? `some(${this.value})` : "none()"
        }
    }
    m.singletonNone = new m(!1);
    const h = Array.prototype.indexOf,
        p = Array.prototype.push,
        f = e => {
            const t = [];
            for (let n = 0, o = e.length; n < o; ++n) {
                if (!l(e[n])) throw new Error("Arr.flatten item " + n + " was not an array, input: " + e);
                p.apply(t, e[n])
            }
            return t
        },
        k = (e, t) => {
            for (let n = 0; n < e.length; n++) {
                const o = t(e[n], n);
                if (o.isSome()) return o
            }
            return m.none()
        },
        v = (e, t, n = d) => e.exists((e => n(e, t))),
        b = e => {
            const t = [],
                n = e => {
                    t.push(e)
                };
            for (let t = 0; t < e.length; t++) e[t].each(n);
            return t
        },
        x = (e, t) => e ? m.some(t) : m.none(),
        y = e => t => t.options.get(e),
        _ = y("link_assume_external_targets"),
        w = y("link_context_toolbar"),
        C = y("link_list"),
        O = y("link_default_target"),
        S = y("link_default_protocol"),
        A = y("link_target_list"),
        N = y("link_rel_list"),
        E = y("link_class_list"),
        R = y("link_title"),
        T = y("allow_unsafe_link_target"),
        L = y("link_quicklink"),
        P = y("link_attributes_postprocess"),
        M = Object.keys,
        D = Object.hasOwnProperty,
        B = (e, t) => D.call(e, t);
    var I = tinymce.util.Tools.resolve("tinymce.util.URI"),
        K = tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),
        j = tinymce.util.Tools.resolve("tinymce.util.Tools");
    const U = e => a(e) && "a" === e.nodeName.toLowerCase(),
        q = e => U(e) && !!$(e),
        F = (e, t) => {
            if (e.collapsed) return []; {
                const n = e.cloneContents(),
                    o = n.firstChild,
                    r = new K(o, n),
                    l = [];
                let s = o;
                do {
                    t(s) && l.push(s)
                } while (s = r.next());
                return l
            }
        },
        V = e => /^\w+:/i.test(e),
        $ = e => {
            var t, n;
            return null !== (n = null !== (t = e.getAttribute("data-mce-href")) && void 0 !== t ? t : e.getAttribute("href")) && void 0 !== n ? n : ""
        },
        z = (e, t) => {
            const n = ["noopener"],
                o = e ? e.split(/\s+/) : [],
                r = e => e.filter((e => -1 === j.inArray(n, e))),
                l = t ? (e => (e = r(e)).length > 0 ? e.concat(n) : n)(o) : r(o);
            return l.length > 0 ? (e => j.trim(e.sort().join(" ")))(l) : ""
        },
        G = (e, t) => (t = t || W(e.selection.getRng())[0] || e.selection.getNode(), Z(t) ? m.from(e.dom.select("a[href]", t)[0]) : m.from(e.dom.getParent(t, "a[href]"))),
        H = (e, t) => G(e, t).isSome(),
        J = (e, t) => t.fold((() => e.getContent({
            format: "text"
        })), (e => e.innerText || e.textContent || "")).replace(/\uFEFF/g, ""),
        W = e => F(e, q),
        Q = e => j.grep(e, q),
        X = e => Q(e).length > 0,
        Y = e => {
            const t = e.schema.getTextInlineElements();
            if (G(e).exists((e => e.hasAttribute("data-mce-block")))) return !1;
            const n = e.selection.getRng();
            return !!n.collapsed || 0 === F(n, (e => 1 === e.nodeType && !U(e) && !B(t, e.nodeName.toLowerCase()))).length
        },
        Z = e => a(e) && "FIGURE" === e.nodeName && /\bimage\b/i.test(e.className),
        ee = (e, t, n) => {
            const o = e.selection.getNode(),
                r = G(e, o),
                l = ((e, t) => {
                    const n = {
                        ...t
                    };
                    if (0 === N(e).length && !T(e)) {
                        const e = z(n.rel, "_blank" === n.target);
                        n.rel = e || null
                    }
                    return m.from(n.target).isNone() && !1 === A(e) && (n.target = O(e)), n.href = ((e, t) => "http" !== t && "https" !== t || V(e) ? e : t + "://" + e)(n.href, _(e)), n
                })(e, (e => {
                    return t = ["title", "rel", "class", "target"], n = (t, n) => (e[n].each((e => {
                        t[n] = e.length > 0 ? e : null
                    })), t), o = {
                        href: e.href
                    }, ((e, t) => {
                        for (let n = 0, o = e.length; n < o; n++) t(e[n], n)
                    })(t, ((e, t) => {
                        o = n(o, e)
                    })), o;
                    var t, n, o
                })(n)),
                s = P(e);
            a(s) && s(l), e.undoManager.transact((() => {
                n.href === t.href && t.attach(), r.fold((() => {
                    ((e, t, n, o) => {
                        const r = e.dom;
                        Z(t) ? le(r, t, o) : n.fold((() => {
                            e.execCommand("mceInsertLink", !1, o);
                            const t = e.selection.getEnd(),
                                n = r.createRng();
                            n.setStartAfter(t), n.setEndAfter(t), e.selection.setRng(n)
                        }), (t => {
                            e.insertContent(r.createHTML("a", o, r.encode(t)))
                        }))
                    })(e, o, n.text, l)
                }), (t => {
                    e.focus(), ((e, t, n, o) => {
                        n.each((e => {
                            B(t, "innerText") ? t.innerText = e : t.textContent = e
                        })), e.dom.setAttribs(t, o);
                        const r = e.dom.createRng();
                        r.setStartAfter(t), r.setEndAfter(t), e.selection.setRng(r)
                    })(e, t, n.text, l)
                }))
            }))
        },
        te = e => {
            const {
                class: t,
                href: n,
                rel: o,
                target: r,
                text: l,
                title: i
            } = e;
            return (e => {
                const t = {};
                var n;
                return ((e, t, n, o) => {
                    ((e, t) => {
                        const n = M(e);
                        for (let o = 0, r = n.length; o < r; o++) {
                            const r = n[o];
                            t(e[r], r)
                        }
                    })(e, ((e, r) => {
                        (t(e, r) ? n : o)(e, r)
                    }))
                })(e, ((e, t) => !1 === s(e)), (n = t, (e, t) => {
                    n[t] = e
                }), g), t
            })({
                class: t.getOrNull(),
                href: n,
                rel: o.getOrNull(),
                target: r.getOrNull(),
                text: l.getOrNull(),
                title: i.getOrNull()
            })
        },
        ne = (e, t, n) => {
            const o = ((e, t) => {
                const n = e.options.get,
                    o = {
                        allow_html_data_urls: n("allow_html_data_urls"),
                        allow_script_urls: n("allow_script_urls"),
                        allow_svg_data_urls: n("allow_svg_data_urls")
                    },
                    r = t.href;
                return {
                    ...t,
                    href: I.isDomSafe(r, "a", o) ? r : ""
                }
            })(e, n);
            e.hasPlugin("rtc", !0) ? e.execCommand("createlink", !1, te(o)) : ee(e, t, o)
        },
        oe = e => {
            e.hasPlugin("rtc", !0) ? e.execCommand("unlink") : (e => {
                e.undoManager.transact((() => {
                    const t = e.selection.getNode();
                    Z(t) ? re(e, t) : (e => {
                        const t = e.dom,
                            n = e.selection,
                            o = n.getBookmark(),
                            r = n.getRng().cloneRange(),
                            l = t.getParent(r.startContainer, "a[href]", e.getBody()),
                            s = t.getParent(r.endContainer, "a[href]", e.getBody());
                        l && r.setStartBefore(l), s && r.setEndAfter(s), n.setRng(r), e.execCommand("unlink"), n.moveToBookmark(o)
                    })(e), e.focus()
                }))
            })(e)
        },
        re = (e, t) => {
            var n;
            const o = e.dom.select("img", t)[0];
            if (o) {
                const r = e.dom.getParents(o, "a[href]", t)[0];
                r && (null === (n = r.parentNode) || void 0 === n || n.insertBefore(o, r), e.dom.remove(r))
            }
        },
        le = (e, t, n) => {
            var o;
            const r = e.select("img", t)[0];
            if (r) {
                const t = e.create("a", n);
                null === (o = r.parentNode) || void 0 === o || o.insertBefore(t, r), t.appendChild(r)
            }
        },
        se = e => o(e.value) ? e.value : "",
        ie = (e, t) => {
            const n = [];
            return j.each(e, (e => {
                const r = (e => o(e.text) ? e.text : o(e.title) ? e.title : "")(e);
                if (void 0 !== e.menu) {
                    const o = ie(e.menu, t);
                    n.push({
                        text: r,
                        items: o
                    })
                } else {
                    const o = t(e);
                    n.push({
                        text: r,
                        value: o
                    })
                }
            })), n
        },
        ae = (e = se) => t => m.from(t).map((t => ie(t, e))),
        ce = e => ae(se)(e),
        ue = ae,
        ge = (e, t) => n => ({
            name: e,
            type: "listbox",
            label: t,
            items: n
        }),
        de = se,
        me = (e, t) => k(t, (t => (e => {
            return B(t = e, n = "items") && void 0 !== t[n] && null !== t[n];
            var t, n
        })(t) ? me(e, t.items) : x(t.value === e, t))),
        he = (e, t) => {
            const n = {
                    text: e.text,
                    title: e.title
                },
                o = (e, o) => {
                    const r = (l = t, s = o, "link" === s ? l.link : "anchor" === s ? l.anchor : m.none()).getOr([]);
                    var l, s;
                    return ((e, t, n, o) => {
                        const r = o[t],
                            l = e.length > 0;
                        return void 0 !== r ? me(r, n).map((t => ({
                            url: {
                                value: t.value,
                                meta: {
                                    text: l ? e : t.text,
                                    attach: g
                                }
                            },
                            text: l ? e : t.text
                        }))) : m.none()
                    })(n.text, o, r, e)
                };
            return {
                onChange: (e, t) => {
                    const r = t.name;
                    return "url" === r ? (e => {
                        const t = (o = e.url, x(n.text.length <= 0, m.from(null === (r = o.meta) || void 0 === r ? void 0 : r.text).getOr(o.value)));
                        var o, r;
                        const l = (e => {
                            var t;
                            return x(n.title.length <= 0, m.from(null === (t = e.meta) || void 0 === t ? void 0 : t.title).getOr(""))
                        })(e.url);
                        return t.isSome() || l.isSome() ? m.some({
                            ...t.map((e => ({
                                text: e
                            }))).getOr({}),
                            ...l.map((e => ({
                                title: e
                            }))).getOr({})
                        }) : m.none()
                    })(e()) : ((e, t) => h.call(e, t))(["anchor", "link"], r) > -1 ? o(e(), r) : "text" === r || "title" === r ? (n[r] = e()[r], m.none()) : m.none()
                }
            }
        };
    var pe = tinymce.util.Tools.resolve("tinymce.util.Delay");
    const fe = e => {
            const t = e.href;
            return t.indexOf("@") > 0 && -1 === t.indexOf("/") && -1 === t.indexOf("mailto:") ? m.some({
                message: "The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?",
                preprocess: e => ({
                    ...e,
                    href: "mailto:" + t
                })
            }) : m.none()
        },
        ke = (e, t) => n => {
            const o = n.href;
            return 1 === e && !V(o) || 0 === e && /^\s*www(\.|\d\.)/i.test(o) ? m.some({
                message: `The URL you entered seems to be an external link. Do you want to add the required ${t}:// prefix?`,
                preprocess: e => ({
                    ...e,
                    href: t + "://" + o
                })
            }) : m.none()
        },
        ve = e => {
            const t = e.dom.select("a:not([href])"),
                n = f(((e, t) => {
                    const n = e.length,
                        o = new Array(n);
                    for (let r = 0; r < n; r++) {
                        const n = e[r];
                        o[r] = t(n, r)
                    }
                    return o
                })(t, (e => {
                    const t = e.name || e.id;
                    return t ? [{
                        text: t,
                        value: "#" + t
                    }] : []
                })));
            return n.length > 0 ? m.some([{
                text: "None",
                value: ""
            }].concat(n)) : m.none()
        },
        be = e => {
            const t = E(e);
            return t.length > 0 ? ce(t) : m.none()
        },
        xe = e => {
            try {
                return m.some(JSON.parse(e))
            } catch (e) {
                return m.none()
            }
        },
        ye = (e, t) => {
            const n = N(e);
            if (n.length > 0) {
                const o = v(t, "_blank"),
                    r = e => z(de(e), o);
                return (!1 === T(e) ? ue(r) : ce)(n)
            }
            return m.none()
        },
        _e = [{
            text: "Current window",
            value: ""
        }, {
            text: "New window",
            value: "_blank"
        }],
        we = e => {
            const t = A(e);
            return l(t) ? ce(t).orThunk((() => m.some(_e))) : !1 === t ? m.none() : m.some(_e)
        },
        Ce = (e, t, n) => {
            const o = e.getAttrib(t, n);
            return null !== o && o.length > 0 ? m.some(o) : m.none()
        },
        Oe = (e, t) => (e => {
            const t = t => e.convertURL(t.value || t.url || "", "href"),
                n = C(e);
            return new Promise((e => {
                o(n) ? fetch(n).then((e => e.ok ? e.text().then(xe) : Promise.reject())).then(e, (() => e(m.none()))) : c(n) ? n((t => e(m.some(t)))) : e(m.from(n))
            })).then((e => e.bind(ue(t)).map((e => e.length > 0 ? [{
                text: "None",
                value: ""
            }].concat(e) : e))))
        })(e).then((n => {
            const o = ((e, t) => {
                const n = e.dom,
                    o = Y(e) ? m.some(J(e.selection, t)) : m.none(),
                    r = t.bind((e => m.from(n.getAttrib(e, "href")))),
                    l = t.bind((e => m.from(n.getAttrib(e, "target")))),
                    s = t.bind((e => Ce(n, e, "rel"))),
                    i = t.bind((e => Ce(n, e, "class")));
                return {
                    url: r,
                    text: o,
                    title: t.bind((e => Ce(n, e, "title"))),
                    target: l,
                    rel: s,
                    linkClass: i
                }
            })(e, t);
            return {
                anchor: o,
                catalogs: {
                    targets: we(e),
                    rels: ye(e, o.target),
                    classes: be(e),
                    anchor: ve(e),
                    link: n
                },
                optNode: t,
                flags: {
                    titleEnabled: R(e)
                }
            }
        })),
        Se = e => {
            const t = (e => {
                const t = G(e);
                return Oe(e, t)
            })(e);
            t.then((t => {
                const n = ((e, t) => n => {
                    const o = n.getData();
                    if (!o.url.value) return oe(e), void n.close();
                    const r = e => m.from(o[e]).filter((n => !v(t.anchor[e], n))),
                        l = {
                            href: o.url.value,
                            text: r("text"),
                            target: r("target"),
                            rel: r("rel"),
                            class: r("linkClass"),
                            title: r("title")
                        },
                        s = {
                            href: o.url.value,
                            attach: void 0 !== o.url.meta && o.url.meta.attach ? o.url.meta.attach : g
                        };
                    ((e, t) => k([fe, ke(_(e), S(e))], (e => e(t))).fold((() => Promise.resolve(t)), (n => new Promise((o => {
                        ((e, t, n) => {
                            const o = e.selection.getRng();
                            pe.setEditorTimeout(e, (() => {
                                e.windowManager.confirm(t, (t => {
                                    e.selection.setRng(o), n(t)
                                }))
                            }))
                        })(e, n.message, (e => {
                            o(e ? n.preprocess(t) : t)
                        }))
                    })))))(e, l).then((t => {
                        ne(e, s, t)
                    })), n.close()
                })(e, t);
                return ((e, t, n) => {
                    const o = e.anchor.text.map((() => ({
                            name: "text",
                            type: "input",
                            label: "Text to display"
                        }))).toArray(),
                        r = e.flags.titleEnabled ? [{
                            name: "title",
                            type: "input",
                            label: "Title"
                        }] : [],
                        l = ((e, t) => {
                            const n = e.anchor,
                                o = n.url.getOr("");
                            return {
                                url: {
                                    value: o,
                                    meta: {
                                        original: {
                                            value: o
                                        }
                                    }
                                },
                                text: n.text.getOr(""),
                                title: n.title.getOr(""),
                                anchor: o,
                                link: o,
                                rel: n.rel.getOr(""),
                                target: n.target.or(t).getOr(""),
                                linkClass: n.linkClass.getOr("")
                            }
                        })(e, m.from(O(n))),
                        s = e.catalogs,
                        i = he(l, s);
                    return {
                        title: "Insert/Edit Link",
                        size: "normal",
                        body: {
                            type: "panel",
                            items: f([
                                [{
                                    name: "url",
                                    type: "urlinput",
                                    filetype: "file",
                                    label: "URL",
                                    picker_text: "Browse links"
                                }],
                                [{
                                    type: 'input',
                                    name: 'search',
                                    label: 'Поиск в Evo'
                                }],
                                [{
                                    type: 'htmlpanel',
                                    html: '<div id="tinymce-plugin-search-results" style="min-height: 1px; max-height: 100px; overflow-y: auto; margin-top: 5px;"></div>'
                                }],
                                o, r, b([s.anchor.map(ge("anchor", "Anchors")), s.rels.map(ge("rel", "Rel")), s.targets.map(ge("target", "Open link in...")), s.link.map(ge("link", "Link list")), s.classes.map(ge("linkClass", "Class"))])
                            ])
                        },
                        buttons: [{
                            type: "cancel",
                            name: "cancel",
                            text: "Cancel"
                        }, {
                            type: "submit",
                            name: "save",
                            text: "Save",
                            primary: !0
                        }],
                        initialData: l,
                        onChange: (dialogApi, details) => {
                            const changedFieldName = details.name;
                            i.onChange(dialogApi.getData(), { name: changedFieldName }).each(updates => dialogApi.setData(updates));
                            if (changedFieldName === 'search') {
                                myPluginSearchHelper.handleSearch(dialogApi, dialogApi.getData().search);
                            }
                        },
                        onSubmit: t
                    }
                })(t, n, e)
            })).then((t => {
                e.windowManager.open(t)
            }))
        };
    var Ae = tinymce.util.Tools.resolve("tinymce.util.VK");
    const Ne = (e, t) => {
            if (t) {
                const o = $(t);
                if (/^#/.test(o)) {
                    const t = e.dom.select(`${o},[name="${n=o,((e,t)=>((e,t)=>""===t||e.length>=t.length&&e.substr(0,0+t.length)===t)(e,t))(n,"#")?(e=>e.substring(1))(n):n}"]`);
                    t.length && e.selection.scrollIntoView(t[0], !0)
                } else(e => {
                    const t = document.createElement("a");
                    t.target = "_blank", t.href = e, t.rel = "noreferrer noopener";
                    const n = new MouseEvent("click", {
                        bubbles: !0,
                        cancelable: !0,
                        view: window
                    });
                    document.dispatchEvent(n), ((e, t) => {
                        document.body.appendChild(e), e.dispatchEvent(t), document.body.removeChild(e)
                    })(t, n)
                })(t.href)
            }
            var n
        },
        Ee = (e, t) => {
            const n = Q(e.dom.getParents(t));
            return x(1 === n.length, n[0])
        },
        Re = e => e.selection.isCollapsed() || (e => {
            const t = e.selection.getRng(),
                n = t.startContainer;
            return q(n) && t.startContainer === t.endContainer && 1 === e.dom.select("img", n).length
        })(e) ? Ee(e, e.selection.getStart()) : (e => {
            const t = W(e.selection.getRng());
            return x(t.length > 0, t[0]).or(Ee(e, e.selection.getNode()))
        })(e),
        Te = e => () => {
            e.execCommand("mceLink", !1, {
                dialog: !0
            })
        },
        Le = (e, t) => (e.on("NodeChange", t), () => e.off("NodeChange", t)),
        Pe = e => t => {
            const n = () => {
                t.setActive(!e.mode.isReadOnly() && H(e, e.selection.getNode())), t.setEnabled(e.selection.isEditable())
            };
            return n(), Le(e, n)
        },
        Me = e => t => {
            const n = () => {
                t.setEnabled(e.selection.isEditable())
            };
            return n(), Le(e, n)
        },
        De = e => t => {
            const n = e.dom.getParents(e.selection.getStart()),
                o = n => {
                    t.setEnabled((t => {
                        return X(t) || (n = e.selection.getRng(), W(n).length > 0);
                        var n
                    })(n) && e.selection.isEditable())
                };
            return o(n), Le(e, (e => o(e.parents)))
        },
        Be = e => {
            const t = (e => {
                const t = (() => {
                        const e = (e => {
                            const t = (e => {
                                    let t = e;
                                    return {
                                        get: () => t,
                                        set: e => {
                                            t = e
                                        }
                                    }
                                })(m.none()),
                                n = () => t.get().each(e);
                            return {
                                clear: () => {
                                    n(), t.set(m.none())
                                },
                                isSet: () => t.get().isSome(),
                                get: () => t.get(),
                                set: e => {
                                    n(), t.set(m.some(e))
                                }
                            }
                        })(g);
                        return {
                            ...e,
                            on: t => e.get().each(t)
                        }
                    })(),
                    n = () => t.get().or(Re(e));
                return e.on("contextmenu", (n => {
                    Ee(e, n.target).each(t.set)
                })), e.on("SelectionChange", (() => {
                    t.isSet() || Re(e).each(t.set)
                })), e.on("click", (n => {
                    t.clear();
                    const o = Q(e.dom.getParents(n.target));
                    1 === o.length && Ae.metaKeyPressed(n) && (n.preventDefault(), Ne(e, o[0]))
                })), e.on("keydown", (o => {
                    t.clear(), !o.isDefaultPrevented() && 13 === o.keyCode && (e => !0 === e.altKey && !1 === e.shiftKey && !1 === e.ctrlKey && !1 === e.metaKey)(o) && n().each((t => {
                        o.preventDefault(), Ne(e, t)
                    }))
                })), {
                    gotoSelectedLink: () => n().each((t => Ne(e, t)))
                }
            })(e);
            ((e, t) => {
                e.ui.registry.addToggleButton("link", {
                    icon: "link",
                    tooltip: "Insert/edit link",
                    shortcut: "Meta+K",
                    onAction: Te(e),
                    onSetup: Pe(e)
                }), e.ui.registry.addButton("openlink", {
                    icon: "new-tab",
                    tooltip: "Open link",
                    onAction: t.gotoSelectedLink,
                    onSetup: De(e)
                }), e.ui.registry.addButton("unlink", {
                    icon: "unlink",
                    tooltip: "Remove link",
                    onAction: () => oe(e),
                    onSetup: De(e)
                })
            })(e, t), ((e, t) => {
                e.ui.registry.addMenuItem("openlink", {
                    text: "Open link",
                    icon: "new-tab",
                    onAction: t.gotoSelectedLink,
                    onSetup: De(e)
                }), e.ui.registry.addMenuItem("link", {
                    icon: "link",
                    text: "Link...",
                    shortcut: "Meta+K",
                    onAction: Te(e),
                    onSetup: Me(e)
                }), e.ui.registry.addMenuItem("unlink", {
                    icon: "unlink",
                    text: "Remove link",
                    onAction: () => oe(e),
                    onSetup: De(e)
                })
            })(e, t), (e => {
                e.ui.registry.addContextMenu("link", {
                    update: t => e.dom.isEditable(t) ? X(e.dom.getParents(t, "a")) ? "link unlink openlink" : "link" : ""
                })
            })(e), ((e, t) => {
                const n = t => {
                    const n = e.selection.getNode();
                    return t.setEnabled(H(e, n) && e.selection.isEditable()), g
                };
                e.ui.registry.addContextForm("quicklink", {
                    launch: {
                        type: "contextformtogglebutton",
                        icon: "link",
                        tooltip: "Link",
                        onSetup: Pe(e)
                    },
                    label: "Link",
                    predicate: t => w(e) && H(e, t),
                    initValue: () => G(e).fold((() => ""), $),
                    commands: [{
                        type: "contextformtogglebutton",
                        icon: "link",
                        tooltip: "Link",
                        primary: !0,
                        onSetup: t => {
                            const n = e.selection.getNode();
                            return t.setActive(H(e, n)), Pe(e)(t)
                        },
                        onAction: t => {
                            const n = t.getValue(),
                                o = (t => {
                                    const n = G(e),
                                        o = Y(e);
                                    if (n.isNone() && o) {
                                        const o = J(e.selection, n);
                                        return x(0 === o.length, t)
                                    }
                                    return m.none()
                                })(n);
                            ne(e, {
                                href: n,
                                attach: g
                            }, {
                                href: n,
                                text: o,
                                title: m.none(),
                                rel: m.none(),
                                target: m.from(O(e)),
                                class: m.none()
                            }), (e => {
                                e.selection.collapse(!1)
                            })(e), t.hide()
                        }
                    }, {
                        type: "contextformbutton",
                        icon: "unlink",
                        tooltip: "Remove link",
                        onSetup: n,
                        onAction: t => {
                            oe(e), t.hide()
                        }
                    }, {
                        type: "contextformbutton",
                        icon: "new-tab",
                        tooltip: "Open link",
                        onSetup: n,
                        onAction: e => {
                            t.gotoSelectedLink(), e.hide()
                        }
                    }]
                })
            })(e, t)
        };
    e.add("customlink", (e => {
        (e => {
            const t = e.options.register;
            t("link_assume_external_targets", {
                processor: e => {
                    const t = o(e) || i(e);
                    return t ? !0 === e ? {
                        value: 1,
                        valid: t
                    } : "http" === e || "https" === e ? {
                        value: e,
                        valid: t
                    } : {
                        value: 0,
                        valid: t
                    } : {
                        valid: !1,
                        message: "Must be a string or a boolean."
                    }
                },
                default: !1
            }), t("link_context_toolbar", {
                processor: "boolean",
                default: !1
            }), t("link_list", {
                processor: e => o(e) || c(e) || u(e, r)
            }), t("link_default_target", {
                processor: "string"
            }), t("link_default_protocol", {
                processor: "string",
                default: "https"
            }), t("link_target_list", {
                processor: e => i(e) || u(e, r),
                default: !0
            }), t("link_rel_list", {
                processor: "object[]",
                default: []
            }), t("link_class_list", {
                processor: "object[]",
                default: []
            }), t("link_title", {
                processor: "boolean",
                default: !0
            }), t("allow_unsafe_link_target", {
                processor: "boolean",
                default: !1
            }), t("link_quicklink", {
                processor: "boolean",
                default: !1
            }), t("link_attributes_postprocess", {
                processor: "function"
            })
        })(e), (e => {
            e.addCommand("mceLink", ((t, n) => {
                !0 !== (null == n ? void 0 : n.dialog) && L(e) ? e.dispatch("contexttoolbar-show", {
                    toolbarKey: "quicklink"
                }) : Se(e)
            }))
        })(e), Be(e), (e => {
            e.addShortcut("Meta+K", "", (() => {
                e.execCommand("mceLink")
            }))
        })(e)
    }))
}();