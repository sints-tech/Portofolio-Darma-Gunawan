var m;(o=>(o.isTouch="ontouchstart"in window||navigator.maxTouchPoints>0,o.isChrome=navigator.userAgent.toLowerCase().includes("chrome/"),o.isWebKit=navigator.userAgent.toLowerCase().includes("applewebkit/"),o.isSafari=o.isWebKit&&!o.isChrome,o.isSafariDesktop=o.isSafari&&!o.isTouch,o.isWindows=/Win/u.test(navigator.platform),o.isMacOS=/Mac/u.test(navigator.platform),o.isAndroidWebView=o.isChrome&&navigator.userAgent.toLowerCase().includes("; wv)"),o.isIosWebView=o.isWebKit&&!navigator.userAgent.toLowerCase().includes("safari/"),o.isWebView=o.isAndroidWebView||o.isIosWebView))(m||={});var y="__framer_hide_editorbar_until";function W(){let a=localStorage.getItem(y);if(!a)return!1;let u=Date.now(),c=Number(a);return u>=c||Number.isNaN(c)?(localStorage.removeItem(y),!1):!0}function T(){return window.self!==window.top}var V=`
#__framer-editorbar {
    overflow: hidden;
    position: fixed;
    bottom: 10px;
    height: 34px;
    border: none;
    z-index: 2147483647;

    &.status_hidden {
        display: none;
    }

    &.status_measuring {
        left: 0;
        width: 100%;
    }

    &[width] {
        box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.2), 0px 10px 20px 0px rgba(0, 0, 0, 0.2);
        left: 50%;
        transform: translateX(-50%);
    }
}
`,S=document.createElement("style");S.type="text/css";S.innerHTML=V;document.head.appendChild(S);var D=new URL(import.meta.url),f=D.origin,A=/^\/(.+)\/.+$/u.exec(D.pathname)?.[1]??"";function $({dependencies:a}){if(a.__version!==1)throw new Error("Unsupported dependencies version");if(W()||T()||m.isWebView)return function(){return null};let{createElement:u,memo:c,useCallback:g,useEffect:l,useRef:I,useState:p}=a.react,{createPortal:h}=a["react-dom"],{useCurrentRoute:b,useLocaleInfo:w,useRouter:o}=a.framer;function L(){let[n,t]=p(!1),r=g(()=>{"requestIdleCallback"in window?requestIdleCallback(()=>{t(!0)}):setTimeout(()=>{t(!0)},300)},[]);return l(()=>{let e;return document.readyState==="complete"?r():(e=()=>{document.readyState==="complete"&&r()},document.addEventListener("readystatechange",e,{once:!0})),()=>{e&&document.removeEventListener("readystatechange",e)}},[r]),n}function N(){let[n,t]=p({className:"status_hidden"});return l(()=>{let r=e=>{e.origin===f&&typeof e.data=="object"&&e.data?.apiVersion===1&&(e.data.type==="beginSizeMeasuring"&&t({className:"status_measuring"}),e.data.type==="updateStyle"&&t({height:e.data.height,width:e.data.width,style:{background:e.data.background,borderRadius:e.data.borderRadius}}))};return window.addEventListener("message",r),()=>{window.removeEventListener("message",r)}},[]),n}function _({iframeRef:n}){let[t,r]=p(void 0),e=v();return l(()=>{r(i=>i??e),e&&n.current&&n.current.contentWindow.postMessage({apiVersion:1,type:"updateNodeId",nodeId:e},f)},[n,e]),t}function v(){let n=b(),t=w()?.activeLocale??void 0,{collectionUtils:r}=o(),[e,i]=p(void 0),d=n?.id,s=n?.collectionId,E=n?.pathVariables;return l(()=>{let x=!1;return C({activeLocale:t,collectionId:s,collectionUtils:r,pathVariables:E}).then(U=>{x||i(U??d)}).catch(()=>{x||i(d)}),()=>{x=!0}},[t,s,r,E,d]),e}async function C({activeLocale:n,collectionId:t,collectionUtils:r,pathVariables:e}){if(t){let i=Object.values(e);if(i.length!==1)return;let d=r?.[t];return await(await d?.())?.getRecordIdBySlug(i[0],n)}}function R(){l(()=>{let n=t=>{if(t.origin===f&&typeof t.data=="object"&&t.data?.apiVersion===1&&t.data.type==="initializeController"){let r=document.createElement("link");r.rel="stylesheet",r.href=t.data.cssUrl,document.head.appendChild(r),import(t.data.jsUrl).then(e=>{e.initializeController({editorBarOrigin:f,trackingUrl:t.data.trackingUrl})})}};return window.addEventListener("message",n),()=>{window.removeEventListener("message",n)}},[])}function k({framerSiteId:n,features:t}){let r=I(null),e=L(),i=N(),d=_({iframeRef:r});if(R(),!e||!d)return null;let s=new URLSearchParams;return s.set("framerSiteId",n),s.set("nodeId",d),s.set("source",window.location.hostname),s.set("features",JSON.stringify(t||{})),h(u("iframe",{id:"__framer-editorbar",ref:r,src:`${f}/${A}?${s.toString()}`,...i}),document.body)}return c(k)}export{$ as createEditorBar};
