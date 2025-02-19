! function() {
    const t = "dub_id",
        e = 7776e6,
        o = window.location.hostname;
    let n = !1;
    const i = {
        domain: "localhost" === o ? void 0 : `.${o.replace(/^www\./,"")}`,
        httpOnly: !1,
        path: "/",
        sameSite: "Lax",
        secure: !1,
        maxAge: e,
        expires: new Date(Date.now() + e)
    };

    function a(t) {
        if (!t) return null;
        const e = t.getAttribute("data-api-host"),
            o = t.getAttribute("data-attribution-model"),
            n = t.getAttribute("data-cookie-options"),
            i = t.getAttribute("data-query-param"),
            a = t.getAttribute("data-short-domain") || t.getAttribute("data-domain"),
            r = t.getAttribute("data-outbound-domains");
        return {
            apiHost: e || "https://api.dub.co",
            shortDomain: a || void 0,
            outboundDomains: r ? r.split(",").map((t => t.trim())) : void 0,
            attributionModel: o || "last-click",
            cookieOptions: n ? JSON.parse(n) : null,
            queryParam: i || "via"
        }
    }
    const r = document.currentScript;
    if (!r) return void console.error("[Dub Analytics] Script not found.");

    function s(t) {
        let e = document.cookie.split(";");
        for (let o = 0; o < e.length; o++) {
            let n = e[o].split("=");
            if (t == n[0].trim()) return decodeURIComponent(n[1])
        }
        return null
    }

    function c(e) {
        const {
            cookieOptions: o,
            attributionModel: n
        } = a(r), c = s(t);
        (!c || c !== e && "last-click" === n) && function(t, e, o) {
            const {
                domain: n,
                expires: a,
                httpOnly: r,
                maxAge: s,
                path: c,
                sameSite: u,
                secure: l
            } = { ...i,
                ...o,
                ...o && o.expiresInDays && {
                    expires: new Date(Date.now() + 24 * o.expiresInDays * 60 * 60 * 1e3)
                }
            }, d = Object.entries({
                domain: n,
                expires: new Date(a).toUTCString(),
                httpOnly: r,
                maxAge: s,
                path: c,
                sameSite: u,
                secure: l
            }).filter((([, t]) => t)).map((([t, e]) => `${t}=${e}`)).join("; ");
            document.cookie = `${t}=${e}; ${d}`
        }(t, e, o)
    }

    function u(e) {
        if (n) return;
        let {
            outboundDomains: i
        } = a(r);
        if (!i || 0 === i.length) return;
        const c = e || s(t);
        if (!c) return;
        const u = o.replace(/^www\./, "");
        i = i.filter((t => t !== u));
        const l = i.map((t => `a[href*="${t}"]`)).join(",");
        if (!l || 0 === l.length) return;
        const d = document.querySelectorAll(l);
        d && 0 !== d.length && (d.forEach((e => {
            const o = new URL(e.href);
            o.searchParams.set(t, c), e.href = o.toString()
        })), n = !0)
    }

    function l() {
        const e = new URLSearchParams(window.location.search),
            {
                apiHost: o,
                shortDomain: n,
                queryParam: i
            } = a(r),
            s = e.get(t);
        if (s) return c(s), void u(s);
        const l = e.get(i);
        l && (n ? fetch(`${o}/track/click`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                domain: n,
                key: l,
                url: window.location.href
            })
        }).then((async t => {
            if (!t.ok) {
                const {
                    error: e
                } = await t.json();
                return void console.error(`[Dub Analytics] Failed to track click: ${e.message}`)
            }
            const {
                clickId: e
            } = await t.json();
            c(e), u(e)
        })) : console.warn("[Dub Analytics] Matching `queryParam` identifier detected but `shortDomain` is not specified, which is required for tracking clicks. Please set the `shortDomain` option, or clicks will not be tracked."))
    }
    l(), u(), window.addEventListener("popstate", l);
    const d = history.pushState,
        p = history.replaceState;
    history.pushState = function() {
        d.apply(this, arguments), l()
    }, history.replaceState = function() {
        p.apply(this, arguments), l()
    }
}();