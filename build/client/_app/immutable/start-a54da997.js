import{S as He,i as Ye,s as We,a as Xe,e as F,c as Ze,b as H,g as pe,t as J,d as de,f as G,h as K,j as Qe,o as ke,k as xe,l as et,m as tt,n as ve,p as q,q as nt,r as rt,u as at,v as X,w as Le,x as Z,y as Q,z as Be}from"./chunks/index-5031b6ad.js";import{g as Ce,f as Fe,s as z,a as Re,b as ot,i as st}from"./chunks/singletons-a8397eab.js";import{_ as V}from"./chunks/preload-helper-b21cceae.js";import{R as Je,H as Ie}from"./chunks/control-03134885.js";function it(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function lt(r){for(const e in r)r[e]=r[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return r}const ct=["href","pathname","search","searchParams","toString","toJSON"];function ft(r,e){const t=new URL(r);for(const i of ct){let o=t[i];Object.defineProperty(t,i,{get(){return e(),o},enumerable:!0,configurable:!0})}return ut(t),t}function ut(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const pt="/__data.json";function dt(r){return r.replace(/\/$/,"")+pt}function ht(r){let e=5381;if(typeof r=="string"){let t=r.length;for(;t;)e=e*33^r.charCodeAt(--t)}else if(ArrayBuffer.isView(r)){const t=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let i=t.length;for(;i;)e=e*33^t[--i]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const he=window.fetch;window.fetch=(r,e)=>{if((r instanceof Request?r.method:(e==null?void 0:e.method)||"GET")!=="GET"){const i=new URL(r instanceof Request?r.url:r.toString(),document.baseURI).href;ue.delete(i)}return he(r,e)};const ue=new Map;function mt(r,e,t){let o=`script[data-sveltekit-fetched][data-url=${JSON.stringify(r instanceof Request?r.url:r)}]`;(t==null?void 0:t.body)&&(typeof t.body=="string"||ArrayBuffer.isView(t.body))&&(o+=`[data-hash="${ht(t.body)}"]`);const m=document.querySelector(o);if(m!=null&&m.textContent){const{body:n,...u}=JSON.parse(m.textContent),_=m.getAttribute("data-ttl");return _&&ue.set(e,{body:n,init:u,ttl:1e3*Number(_)}),Promise.resolve(new Response(n,u))}return he(r,t)}function _t(r,e){const t=ue.get(r);if(t){if(performance.now()<t.ttl)return new Response(t.body,t.init);ue.delete(r)}return he(r,e)}const gt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function wt(r){const e=[],t=[],i=[];let o=!0;return{pattern:r==="/"?/^\/$/:new RegExp(`^${bt(r).map((n,u,_)=>{const p=decodeURIComponent(n),g=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(p);if(g)return e.push(g[1]),t.push(g[2]),i.push(!1),"(?:/(.*))?";const y=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(p);if(y)return e.push(y[1]),t.push(y[2]),i.push(!0),"(?:/([^/]+))?";const I=u===_.length-1;return p?"/"+p.split(/\[(.+?)\](?!\])/).map((D,U)=>{if(U%2){const B=gt.exec(D);if(!B)throw new Error(`Invalid param: ${D}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,M,ae,x,oe]=B;return e.push(x),t.push(oe),i.push(!!M),ae?"(.*?)":M?"([^/]*)?":"([^/]+?)"}return I&&D.includes(".")&&(o=!1),D.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join(""):void 0}).join("")}${o?"/?":""}$`),names:e,types:t,optional:i}}function yt(r){return!/^\([^)]+\)$/.test(r)}function bt(r){return r.slice(1).split("/").filter(yt)}function vt(r,{names:e,types:t,optional:i},o){const m={};for(let n=0;n<e.length;n+=1){const u=e[n],_=t[n];let p=r[n+1];if(p||!i[n]){if(_){const g=o[_];if(!g)throw new Error(`Missing "${_}" param matcher`);if(!g(p))return}m[u]=p!=null?p:""}}return m}function Et(r,e,t,i){const o=new Set(e);return Object.entries(t).map(([u,[_,p,g]])=>{const{pattern:y,names:I,types:T,optional:Y}=wt(u),D={id:u,exec:U=>{const B=y.exec(U);if(B)return vt(B,{names:I,types:T,optional:Y},i)},errors:[1,...g||[]].map(U=>r[U]),layouts:[0,...p||[]].map(n),leaf:m(_)};return D.errors.length=D.layouts.length=Math.max(D.errors.length,D.layouts.length),D});function m(u){const _=u<0;return _&&(u=~u),[_,r[u]]}function n(u){return u===void 0?u:[o.has(u),r[u]]}}function kt(r){let e,t,i;var o=r[0][0];function m(n){return{props:{data:n[2],form:n[1]}}}return o&&(e=new o(m(r))),{c(){e&&X(e.$$.fragment),t=F()},l(n){e&&Le(e.$$.fragment,n),t=F()},m(n,u){e&&Z(e,n,u),H(n,t,u),i=!0},p(n,u){const _={};if(u&4&&(_.data=n[2]),u&2&&(_.form=n[1]),o!==(o=n[0][0])){if(e){pe();const p=e;J(p.$$.fragment,1,0,()=>{Q(p,1)}),de()}o?(e=new o(m(n)),X(e.$$.fragment),G(e.$$.fragment,1),Z(e,t.parentNode,t)):e=null}else o&&e.$set(_)},i(n){i||(e&&G(e.$$.fragment,n),i=!0)},o(n){e&&J(e.$$.fragment,n),i=!1},d(n){n&&K(t),e&&Q(e,n)}}}function Rt(r){let e,t,i;var o=r[0][0];function m(n){return{props:{data:n[2],$$slots:{default:[It]},$$scope:{ctx:n}}}}return o&&(e=new o(m(r))),{c(){e&&X(e.$$.fragment),t=F()},l(n){e&&Le(e.$$.fragment,n),t=F()},m(n,u){e&&Z(e,n,u),H(n,t,u),i=!0},p(n,u){const _={};if(u&4&&(_.data=n[2]),u&523&&(_.$$scope={dirty:u,ctx:n}),o!==(o=n[0][0])){if(e){pe();const p=e;J(p.$$.fragment,1,0,()=>{Q(p,1)}),de()}o?(e=new o(m(n)),X(e.$$.fragment),G(e.$$.fragment,1),Z(e,t.parentNode,t)):e=null}else o&&e.$set(_)},i(n){i||(e&&G(e.$$.fragment,n),i=!0)},o(n){e&&J(e.$$.fragment,n),i=!1},d(n){n&&K(t),e&&Q(e,n)}}}function It(r){let e,t,i;var o=r[0][1];function m(n){return{props:{data:n[3],form:n[1]}}}return o&&(e=new o(m(r))),{c(){e&&X(e.$$.fragment),t=F()},l(n){e&&Le(e.$$.fragment,n),t=F()},m(n,u){e&&Z(e,n,u),H(n,t,u),i=!0},p(n,u){const _={};if(u&8&&(_.data=n[3]),u&2&&(_.form=n[1]),o!==(o=n[0][1])){if(e){pe();const p=e;J(p.$$.fragment,1,0,()=>{Q(p,1)}),de()}o?(e=new o(m(n)),X(e.$$.fragment),G(e.$$.fragment,1),Z(e,t.parentNode,t)):e=null}else o&&e.$set(_)},i(n){i||(e&&G(e.$$.fragment,n),i=!0)},o(n){e&&J(e.$$.fragment,n),i=!1},d(n){n&&K(t),e&&Q(e,n)}}}function Ge(r){let e,t=r[5]&&Ke(r);return{c(){e=xe("div"),t&&t.c(),this.h()},l(i){e=et(i,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var o=tt(e);t&&t.l(o),o.forEach(K),this.h()},h(){ve(e,"id","svelte-announcer"),ve(e,"aria-live","assertive"),ve(e,"aria-atomic","true"),q(e,"position","absolute"),q(e,"left","0"),q(e,"top","0"),q(e,"clip","rect(0 0 0 0)"),q(e,"clip-path","inset(50%)"),q(e,"overflow","hidden"),q(e,"white-space","nowrap"),q(e,"width","1px"),q(e,"height","1px")},m(i,o){H(i,e,o),t&&t.m(e,null)},p(i,o){i[5]?t?t.p(i,o):(t=Ke(i),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(i){i&&K(e),t&&t.d()}}}function Ke(r){let e;return{c(){e=nt(r[6])},l(t){e=rt(t,r[6])},m(t,i){H(t,e,i)},p(t,i){i&64&&at(e,t[6])},d(t){t&&K(e)}}}function Ot(r){let e,t,i,o,m;const n=[Rt,kt],u=[];function _(g,y){return g[0][1]?0:1}e=_(r),t=u[e]=n[e](r);let p=r[4]&&Ge(r);return{c(){t.c(),i=Xe(),p&&p.c(),o=F()},l(g){t.l(g),i=Ze(g),p&&p.l(g),o=F()},m(g,y){u[e].m(g,y),H(g,i,y),p&&p.m(g,y),H(g,o,y),m=!0},p(g,[y]){let I=e;e=_(g),e===I?u[e].p(g,y):(pe(),J(u[I],1,1,()=>{u[I]=null}),de(),t=u[e],t?t.p(g,y):(t=u[e]=n[e](g),t.c()),G(t,1),t.m(i.parentNode,i)),g[4]?p?p.p(g,y):(p=Ge(g),p.c(),p.m(o.parentNode,o)):p&&(p.d(1),p=null)},i(g){m||(G(t),m=!0)},o(g){J(t),m=!1},d(g){u[e].d(g),g&&K(i),p&&p.d(g),g&&K(o)}}}function At(r,e,t){let{stores:i}=e,{page:o}=e,{components:m}=e,{form:n}=e,{data_0:u=null}=e,{data_1:_=null}=e;Qe(i.page.notify);let p=!1,g=!1,y=null;return ke(()=>{const I=i.page.subscribe(()=>{p&&(t(5,g=!0),t(6,y=document.title||"untitled page"))});return t(4,p=!0),I}),r.$$set=I=>{"stores"in I&&t(7,i=I.stores),"page"in I&&t(8,o=I.page),"components"in I&&t(0,m=I.components),"form"in I&&t(1,n=I.form),"data_0"in I&&t(2,u=I.data_0),"data_1"in I&&t(3,_=I.data_1)},r.$$.update=()=>{r.$$.dirty&384&&i.page.set(o)},[m,n,u,_,p,g,y,i,o]}class Lt extends He{constructor(e){super(),Ye(this,e,At,Ot,We,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const St={},me=[()=>V(()=>import("./chunks/0-8ad8d0be.js"),["./chunks/0-8ad8d0be.js","./components/pages/_layout.svelte-a3f1b168.js","./chunks/index-5031b6ad.js","./chunks/preload-helper-b21cceae.js","./chunks/stores-5f0165dd.js","./chunks/singletons-a8397eab.js","./chunks/index-9ff150c3.js","./chunks/api-c0e3e547.js","./chunks/variables-5c3e082a.js","./assets/api-5ca8a06d.css","./chunks/themeStore-adddda37.js","./chunks/username-f550a24c.js","./assets/_layout-d52f4a44.css"],import.meta.url),()=>V(()=>import("./chunks/1-29c5ac83.js"),["./chunks/1-29c5ac83.js","./components/pages/_error.svelte-a5fed75f.js","./chunks/index-5031b6ad.js","./assets/_error-8522d49f.css"],import.meta.url),()=>V(()=>import("./chunks/2-a7131596.js"),["./chunks/2-a7131596.js","./components/pages/_page.svelte-fe5734e4.js","./chunks/index-5031b6ad.js","./chunks/variables-5c3e082a.js","./chunks/themeStore-adddda37.js","./chunks/index-9ff150c3.js","./assets/_page-67add643.css"],import.meta.url),()=>V(()=>import("./chunks/3-23db1033.js"),["./chunks/3-23db1033.js","./chunks/_page-2a07d36d.js","./chunks/index-de586565.js","./chunks/control-03134885.js","./components/pages/admin/_page.svelte-d0da20f7.js","./chunks/index-5031b6ad.js","./chunks/Tabs-691fc758.js","./chunks/stores-5f0165dd.js","./chunks/singletons-a8397eab.js","./chunks/index-9ff150c3.js","./assets/Tabs-4afc9f25.css","./chunks/api-c0e3e547.js","./chunks/variables-5c3e082a.js","./assets/api-5ca8a06d.css","./chunks/Loader-cf2f2cb3.js","./assets/Loader-930fdbc0.css"],import.meta.url),()=>V(()=>import("./chunks/4-a8a3ae78.js"),["./chunks/4-a8a3ae78.js","./chunks/_page-9dcb80cf.js","./chunks/index-de586565.js","./chunks/control-03134885.js","./components/pages/admin/user/_id_/_page.svelte-d2ae00dc.js","./chunks/index-5031b6ad.js","./chunks/api-c0e3e547.js","./chunks/variables-5c3e082a.js","./chunks/index-9ff150c3.js","./assets/api-5ca8a06d.css","./chunks/timeAgo-a92d5063.js","./chunks/stores-5f0165dd.js","./chunks/singletons-a8397eab.js","./chunks/Tabs-691fc758.js","./assets/Tabs-4afc9f25.css","./chunks/Loader-cf2f2cb3.js","./assets/Loader-930fdbc0.css","./assets/_page-0d880b0a.css"],import.meta.url),()=>V(()=>import("./chunks/5-b4e3c089.js"),["./chunks/5-b4e3c089.js","./chunks/_page-3f7723e1.js","./chunks/index-de586565.js","./chunks/control-03134885.js","./components/pages/admin/users/_p_/_page.svelte-70ae6321.js","./chunks/index-5031b6ad.js","./chunks/api-c0e3e547.js","./chunks/variables-5c3e082a.js","./chunks/index-9ff150c3.js","./assets/api-5ca8a06d.css","./chunks/timeAgo-a92d5063.js","./chunks/themeStore-adddda37.js","./chunks/Tabs-691fc758.js","./chunks/stores-5f0165dd.js","./chunks/singletons-a8397eab.js","./assets/Tabs-4afc9f25.css","./chunks/navigation-ca2f2b74.js","./chunks/Loader-cf2f2cb3.js","./assets/Loader-930fdbc0.css","./assets/_page-96200458.css"],import.meta.url),()=>V(()=>import("./chunks/6-cea650a0.js"),["./chunks/6-cea650a0.js","./components/pages/forgot/_page.svelte-c18ae0d6.js","./chunks/index-5031b6ad.js","./chunks/Input-7bc467ae.js","./assets/Input-c0648d51.css","./chunks/api-c0e3e547.js","./chunks/variables-5c3e082a.js","./chunks/index-9ff150c3.js","./assets/api-5ca8a06d.css","./assets/_page-c4d36e2d.css"],import.meta.url),()=>V(()=>import("./chunks/7-1cb5068c.js"),["./chunks/7-1cb5068c.js","./chunks/_page-31de1265.js","./chunks/index-de586565.js","./chunks/control-03134885.js","./components/pages/login/_page.svelte-018d8dc4.js","./chunks/index-5031b6ad.js","./chunks/Input-7bc467ae.js","./assets/Input-c0648d51.css","./chunks/api-c0e3e547.js","./chunks/variables-5c3e082a.js","./chunks/index-9ff150c3.js","./assets/api-5ca8a06d.css","./chunks/username-f550a24c.js","./assets/_page-4c3ae24a.css"],import.meta.url),()=>V(()=>import("./chunks/8-04a9713c.js"),["./chunks/8-04a9713c.js","./chunks/_page-d6535f43.js","./chunks/index-de586565.js","./chunks/control-03134885.js","./components/pages/register/_page.svelte-9a0cd0ee.js","./chunks/index-5031b6ad.js","./chunks/Input-7bc467ae.js","./assets/Input-c0648d51.css","./chunks/api-c0e3e547.js","./chunks/variables-5c3e082a.js","./chunks/index-9ff150c3.js","./assets/api-5ca8a06d.css","./chunks/navigation-ca2f2b74.js","./chunks/singletons-a8397eab.js","./assets/_page-8a10151f.css"],import.meta.url),()=>V(()=>import("./chunks/9-dacf480f.js"),["./chunks/9-dacf480f.js","./components/pages/user/activation/_token_/_page.svelte-851596f1.js","./chunks/index-5031b6ad.js","./chunks/api-c0e3e547.js","./chunks/variables-5c3e082a.js","./chunks/index-9ff150c3.js","./assets/api-5ca8a06d.css","./chunks/stores-5f0165dd.js","./chunks/singletons-a8397eab.js","./chunks/navigation-ca2f2b74.js"],import.meta.url),()=>V(()=>import("./chunks/10-de3ae6df.js"),["./chunks/10-de3ae6df.js","./chunks/_page-92bfcc5a.js","./chunks/index-de586565.js","./chunks/control-03134885.js","./components/pages/user/profile/_page.svelte-7154d35b.js","./chunks/index-5031b6ad.js","./chunks/timeAgo-a92d5063.js","./chunks/Input-7bc467ae.js","./assets/Input-c0648d51.css","./chunks/api-c0e3e547.js","./chunks/variables-5c3e082a.js","./chunks/index-9ff150c3.js","./assets/api-5ca8a06d.css","./chunks/Loader-cf2f2cb3.js","./assets/Loader-930fdbc0.css","./chunks/stores-5f0165dd.js","./chunks/singletons-a8397eab.js","./chunks/username-f550a24c.js","./assets/_page-e5b80638.css"],import.meta.url),()=>V(()=>import("./chunks/11-d50809f9.js"),["./chunks/11-d50809f9.js","./components/pages/user/reset/_token_/_page.svelte-2cbe6514.js","./chunks/index-5031b6ad.js","./chunks/api-c0e3e547.js","./chunks/variables-5c3e082a.js","./chunks/index-9ff150c3.js","./assets/api-5ca8a06d.css","./chunks/Input-7bc467ae.js","./assets/Input-c0648d51.css","./chunks/stores-5f0165dd.js","./chunks/singletons-a8397eab.js","./chunks/navigation-ca2f2b74.js"],import.meta.url)],$t=[0],Pt={"/":[2],"/admin":[3],"/admin/users/[p]":[5],"/admin/user/[id]":[4],"/forgot":[6],"/login":[7],"/register":[8],"/user/activation/[token]":[9],"/user/profile":[10],"/user/reset/[token]":[11]},jt={handleError:({error:r})=>{console.error(r)}};async function Nt(r){var e;for(const t in r)if(typeof((e=r[t])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(r).map(async([i,o])=>[i,await o])));return r}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Tt=-1,Dt=-2,Ut=-3,Vt=-4,qt=-5,Bt=-6;function Ct(r){return Ft(JSON.parse(r))}function Ft(r){if(typeof r=="number")return i(r,!0);if(!Array.isArray(r)||r.length===0)throw new Error("Invalid input");const e=r,t=Array(e.length);function i(o,m=!1){if(o===Tt)return;if(o===Ut)return NaN;if(o===Vt)return 1/0;if(o===qt)return-1/0;if(o===Bt)return-0;if(m)throw new Error("Invalid input");if(o in t)return t[o];const n=e[o];if(!n||typeof n!="object")t[o]=n;else if(Array.isArray(n))if(typeof n[0]=="string")switch(n[0]){case"Date":t[o]=new Date(n[1]);break;case"Set":const _=new Set;t[o]=_;for(let y=1;y<n.length;y+=1)_.add(i(n[y]));break;case"Map":const p=new Map;t[o]=p;for(let y=1;y<n.length;y+=2)p.set(i(n[y]),i(n[y+1]));break;case"RegExp":t[o]=new RegExp(n[1],n[2]);break;case"Object":t[o]=Object(n[1]);break;case"BigInt":t[o]=BigInt(n[1]);break;case"null":const g=Object.create(null);t[o]=g;for(let y=1;y<n.length;y+=2)g[n[y]]=i(n[y+1]);break}else{const u=new Array(n.length);t[o]=u;for(let _=0;_<n.length;_+=1){const p=n[_];p!==Dt&&(u[_]=i(p))}}else{const u={};t[o]=u;for(const _ in n){const p=n[_];u[_]=i(p)}}return t[o]}return i(0)}const ze="sveltekit:scroll",C="sveltekit:index",le=Et(me,$t,Pt,St),Oe=me[0],Ae=me[1];Oe();Ae();let re={};try{re=JSON.parse(sessionStorage[ze])}catch{}function Ee(r){re[r]=Re()}function Jt({target:r,base:e,trailing_slash:t}){var Ue;const i=[];let o=null;const m={before_navigate:[],after_navigate:[]};let n={branch:[],error:null,url:null},u=!1,_=!1,p=!0,g=!1,y=!1,I,T=(Ue=history.state)==null?void 0:Ue[C];T||(T=Date.now(),history.replaceState({...history.state,[C]:T},"",location.href));const Y=re[T];Y&&(history.scrollRestoration="manual",scrollTo(Y.x,Y.y));let D=!1,U,B,M;async function ae(){M=M||Promise.resolve(),await M,M=null;const a=new URL(location.href),c=we(a,!0);o=null,await Se(c,a,[])}async function x(a,{noscroll:c=!1,replaceState:f=!1,keepfocus:s=!1,state:l={},invalidateAll:d=!1},h,E){return typeof a=="string"&&(a=new URL(a,Ce(document))),ye({url:a,scroll:c?Re():null,keepfocus:s,redirect_chain:h,details:{state:l,replaceState:f},nav_token:E,accepted:()=>{d&&(y=!0)},blocked:()=>{},type:"goto"})}async function oe(a){const c=we(a,!1);if(!c)throw new Error(`Attempted to prefetch a URL that does not belong to this app: ${a}`);return o={id:c.id,promise:je(c)},o.promise}async function Se(a,c,f,s,l={},d){var E,k;B=l;let h=a&&await je(a);if(h||(h=await De(c,null,ne(new Error(`Not found: ${c.pathname}`),{url:c,params:{},routeId:null}),404)),c=(a==null?void 0:a.url)||c,B!==l)return!1;if(h.type==="redirect")if(f.length>10||f.includes(c.pathname))h=await se({status:500,error:ne(new Error("Redirect loop"),{url:c,params:{},routeId:null}),url:c,routeId:null});else return x(new URL(h.location,c).href,{},[...f,c.pathname],l),!1;else((k=(E=h.props)==null?void 0:E.page)==null?void 0:k.status)>=400&&await z.updated.check()&&await ie(c);if(i.length=0,y=!1,g=!0,s&&s.details){const{details:b}=s,v=b.replaceState?0:1;b.state[C]=T+=v,history[b.replaceState?"replaceState":"pushState"](b.state,"",c)}if(o=null,_){n=h.state,h.props.page&&(h.props.page.url=c);const b=fe();I.$set(h.props),b()}else $e(h);if(s){const{scroll:b,keepfocus:v}=s;if(!v){const O=document.body,L=O.getAttribute("tabindex");O.tabIndex=-1,O.focus({preventScroll:!0}),setTimeout(()=>{var S;(S=getSelection())==null||S.removeAllRanges()}),L!==null?O.setAttribute("tabindex",L):O.removeAttribute("tabindex")}if(await Be(),p){const O=c.hash&&document.getElementById(c.hash.slice(1));b?scrollTo(b.x,b.y):O?O.scrollIntoView():scrollTo(0,0)}}else await Be();p=!0,h.props.page&&(U=h.props.page),d&&d(),g=!1}function $e(a){var l,d;n=a.state;const c=document.querySelector("style[data-sveltekit]");c&&c.remove(),U=a.props.page;const f=fe();I=new Lt({target:r,props:{...a.props,stores:z},hydrate:!0}),f();const s={from:null,to:ce("to",{params:n.params,routeId:(d=(l=n.route)==null?void 0:l.id)!=null?d:null,url:new URL(location.href)}),type:"load"};m.after_navigate.forEach(h=>h(s)),_=!0}async function ee({url:a,params:c,branch:f,status:s,error:l,route:d,form:h}){var L;const E=f.filter(Boolean),k={type:"loaded",state:{url:a,params:c,branch:f,error:l,route:d},props:{components:E.map(S=>S.node.component)}};h!==void 0&&(k.props.form=h);let b={},v=!U;for(let S=0;S<E.length;S+=1){const j=E[S];b={...b,...j.data},(v||!n.branch.some(N=>N===j))&&(k.props[`data_${S}`]=b,v=v||Object.keys((L=j.data)!=null?L:{}).length>0)}if(v||(v=Object.keys(U.data).length!==Object.keys(b).length),!n.url||a.href!==n.url.href||n.error!==l||h!==void 0||v){k.props.page={error:l,params:c,routeId:d&&d.id,status:s,url:a,form:h,data:v?b:U.data};const S=(j,N)=>{Object.defineProperty(k.props.page,j,{get:()=>{throw new Error(`$page.${j} has been replaced by $page.url.${N}`)}})};S("origin","origin"),S("path","pathname"),S("query","searchParams")}return k}async function _e({loader:a,parent:c,url:f,params:s,routeId:l,server_data_node:d}){var b,v,O,L,S;let h=null;const E={dependencies:new Set,params:new Set,parent:!1,url:!1},k=await a();if((b=k.shared)!=null&&b.load){let j=function(...A){for(const w of A){const{href:R}=new URL(w,f);E.dependencies.add(R)}};const N={routeId:l,params:new Proxy(s,{get:(A,w)=>(E.params.add(w),A[w])}),data:(v=d==null?void 0:d.data)!=null?v:null,url:ft(f,()=>{E.url=!0}),async fetch(A,w){let R;A instanceof Request?(R=A.url,w={body:A.method==="GET"||A.method==="HEAD"?void 0:await A.blob(),cache:A.cache,credentials:A.credentials,headers:A.headers,integrity:A.integrity,keepalive:A.keepalive,method:A.method,mode:A.mode,redirect:A.redirect,referrer:A.referrer,referrerPolicy:A.referrerPolicy,signal:A.signal,...w}):R=A;const P=new URL(R,f).href;return j(P),_?_t(P,w):mt(R,P,w)},setHeaders:()=>{},depends:j,parent(){return E.parent=!0,c()}};Object.defineProperties(N,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),h=(O=await k.shared.load.call(null,N))!=null?O:null,h=h?await Nt(h):null}return{node:k,loader:a,server:d,shared:(L=k.shared)!=null&&L.load?{type:"data",data:h,uses:E}:null,data:(S=h!=null?h:d==null?void 0:d.data)!=null?S:null}}function Pe(a,c,f,s){if(y)return!0;if(!f)return!1;if(f.parent&&c||f.url&&a)return!0;for(const l of f.params)if(s[l]!==n.params[l])return!0;for(const l of f.dependencies)if(i.some(d=>d(new URL(l))))return!0;return!1}function ge(a,c){var f,s;return(a==null?void 0:a.type)==="data"?{type:"data",data:a.data,uses:{dependencies:new Set((f=a.uses.dependencies)!=null?f:[]),params:new Set((s=a.uses.params)!=null?s:[]),parent:!!a.uses.parent,url:!!a.uses.url}}:(a==null?void 0:a.type)==="skip"&&c!=null?c:null}async function je({id:a,invalidating:c,url:f,params:s,route:l}){var A;if((o==null?void 0:o.id)===a)return o.promise;const{errors:d,layouts:h,leaf:E}=l,k=[...h,E];d.forEach(w=>w==null?void 0:w().catch(()=>{})),k.forEach(w=>w==null?void 0:w[1]().catch(()=>{}));let b=null;const v=n.url?a!==n.url.pathname+n.url.search:!1,O=k.reduce((w,R,P)=>{var te;const $=n.branch[P],W=!!(R!=null&&R[0])&&(($==null?void 0:$.loader)!==R[1]||Pe(v,w.some(Boolean),(te=$.server)==null?void 0:te.uses,s));return w.push(W),w},[]);if(O.some(Boolean)){try{b=await Me(f,O)}catch(w){return se({status:500,error:ne(w,{url:f,params:s,routeId:l.id}),url:f,routeId:l.id})}if(b.type==="redirect")return b}const L=b==null?void 0:b.nodes;let S=!1;const j=k.map(async(w,R)=>{var te;if(!w)return;const P=n.branch[R],$=L==null?void 0:L[R];if((!$||$.type==="skip")&&w[1]===(P==null?void 0:P.loader)&&!Pe(v,S,(te=P.shared)==null?void 0:te.uses,s))return P;if(S=!0,($==null?void 0:$.type)==="error")throw $;return _e({loader:w[1],url:f,params:s,routeId:l.id,parent:async()=>{var qe;const Ve={};for(let be=0;be<R;be+=1)Object.assign(Ve,(qe=await j[be])==null?void 0:qe.data);return Ve},server_data_node:ge($===void 0&&w[0]?{type:"skip"}:$!=null?$:null,P==null?void 0:P.server)})});for(const w of j)w.catch(()=>{});const N=[];for(let w=0;w<k.length;w+=1)if(k[w])try{N.push(await j[w])}catch(R){if(R instanceof Je)return{type:"redirect",location:R.location};let P=500,$;L!=null&&L.includes(R)?(P=(A=R.status)!=null?A:P,$=R.error):R instanceof Ie?(P=R.status,$=R.body):$=ne(R,{params:s,url:f,routeId:l.id});const W=await Ne(w,N,d);return W?await ee({url:f,params:s,branch:N.slice(0,W.idx).concat(W.node),status:P,error:$,route:l}):await De(f,l.id,$,P)}else N.push(void 0);return await ee({url:f,params:s,branch:N,status:200,error:null,route:l,form:c?void 0:null})}async function Ne(a,c,f){for(;a--;)if(f[a]){let s=a;for(;!c[s];)s-=1;try{return{idx:s+1,node:{node:await f[a](),loader:f[a],data:{},server:null,shared:null}}}catch{continue}}}async function se({status:a,error:c,url:f,routeId:s}){var b;const l={},d=await Oe();let h=null;if(d.server)try{const v=await Me(f,[!0]);if(v.type!=="data"||v.nodes[0]&&v.nodes[0].type!=="data")throw 0;h=(b=v.nodes[0])!=null?b:null}catch{(f.origin!==location.origin||f.pathname!==location.pathname||u)&&await ie(f)}const E=await _e({loader:Oe,url:f,params:l,routeId:s,parent:()=>Promise.resolve({}),server_data_node:ge(h)}),k={node:await Ae(),loader:Ae,shared:null,server:null,data:null};return await ee({url:f,params:l,branch:[E,k],status:a,error:c,route:null})}function we(a,c){if(Te(a))return;const f=decodeURI(a.pathname.slice(e.length)||"/");for(const s of le){const l=s.exec(f);if(l){const d=new URL(a.origin+it(a.pathname,t)+a.search+a.hash);return{id:d.pathname+d.search,invalidating:c,route:s,params:lt(l),url:d}}}}function Te(a){return a.origin!==location.origin||!a.pathname.startsWith(e)}async function ye({url:a,scroll:c,keepfocus:f,redirect_chain:s,details:l,type:d,delta:h,nav_token:E,accepted:k,blocked:b}){var j,N,A,w;let v=!1;const O=we(a,!1),L={from:ce("from",{params:n.params,routeId:(N=(j=n.route)==null?void 0:j.id)!=null?N:null,url:n.url}),to:ce("to",{params:(A=O==null?void 0:O.params)!=null?A:null,routeId:(w=O==null?void 0:O.route.id)!=null?w:null,url:a}),type:d};h!==void 0&&(L.delta=h);const S={...L,cancel:()=>{v=!0}};if(m.before_navigate.forEach(R=>R(S)),v){b();return}Ee(T),k(),_&&z.navigating.set(L),await Se(O,a,s,{scroll:c,keepfocus:f,details:l},E,()=>{m.after_navigate.forEach(R=>R(L)),z.navigating.set(null)})}async function De(a,c,f,s){return a.origin===location.origin&&a.pathname===location.pathname&&!u?await se({status:s,error:f,url:a,routeId:c}):await ie(a)}function ie(a){return location.href=a.href,new Promise(()=>{})}return{after_navigate:a=>{ke(()=>(m.after_navigate.push(a),()=>{const c=m.after_navigate.indexOf(a);m.after_navigate.splice(c,1)}))},before_navigate:a=>{ke(()=>(m.before_navigate.push(a),()=>{const c=m.before_navigate.indexOf(a);m.before_navigate.splice(c,1)}))},disable_scroll_handling:()=>{(g||!_)&&(p=!1)},goto:(a,c={})=>x(a,c,[]),invalidate:a=>{if(a===void 0)throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");if(typeof a=="function")i.push(a);else{const{href:c}=new URL(a,location.href);i.push(f=>f.href===c)}return ae()},invalidateAll:()=>(y=!0,ae()),prefetch:async a=>{const c=new URL(a,Ce(document));await oe(c)},prefetch_routes:async a=>{const f=(a?le.filter(s=>a.some(l=>s.exec(l))):le).map(s=>Promise.all([...s.layouts,s.leaf].map(l=>l==null?void 0:l[1]())));await Promise.all(f)},apply_action:async a=>{if(a.type==="error"){const c=new URL(location.href),{branch:f,route:s}=n;if(!s)return;const l=await Ne(n.branch.length,f,s.errors);if(l){const d=await ee({url:c,params:n.params,branch:f.slice(0,l.idx).concat(l.node),status:500,error:a.error,route:s});n=d.state;const h=fe();I.$set(d.props),h()}}else if(a.type==="redirect")x(a.location,{invalidateAll:!0},[]);else{const c={form:a.data,page:{...U,form:a.data,status:a.status}},f=fe();I.$set(c),f()}},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",s=>{var h,E;let l=!1;const d={from:ce("from",{params:n.params,routeId:(E=(h=n.route)==null?void 0:h.id)!=null?E:null,url:n.url}),to:null,type:"unload",cancel:()=>l=!0};m.before_navigate.forEach(k=>k(d)),l?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Ee(T);try{sessionStorage[ze]=JSON.stringify(re)}catch{}}});const a=s=>{const{url:l,options:d}=Fe(s);if(l&&d.prefetch){if(Te(l))return;oe(l)}};let c;const f=s=>{clearTimeout(c),c=setTimeout(()=>{var l;(l=s.target)==null||l.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",a),addEventListener("mousemove",f),addEventListener("sveltekit:trigger_prefetch",a),addEventListener("click",s=>{if(s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const{a:l,url:d,options:h}=Fe(s);if(!l||!d)return;const E=l instanceof SVGAElement;if(!E&&d.protocol!==location.protocol&&!(d.protocol==="https:"||d.protocol==="http:"))return;const k=(l.getAttribute("rel")||"").split(/\s+/);if(l.hasAttribute("download")||k.includes("external")||h.reload||(E?l.target.baseVal:l.target))return;const[b,v]=d.href.split("#");if(v!==void 0&&b===location.href.split("#")[0]){D=!0,Ee(T),n.url=d,z.page.set({...U,url:d}),z.page.notify();return}ye({url:d,scroll:h.noscroll?Re():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:d.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault(),type:"link"})}),addEventListener("popstate",s=>{if(s.state){if(s.state[C]===T)return;const l=s.state[C]-T;ye({url:new URL(location.href),scroll:re[s.state[C]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{T=s.state[C]},blocked:()=>{history.go(-l)},type:"popstate",delta:l})}}),addEventListener("hashchange",()=>{D&&(D=!1,history.replaceState({...history.state,[C]:++T},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&z.navigating.set(null)})},_hydrate:async({status:a,error:c,node_ids:f,params:s,routeId:l,data:d,form:h})=>{var b;u=!0;const E=new URL(location.href);let k;try{const v=f.map(async(O,L)=>{const S=d[L];return _e({loader:me[O],url:E,params:s,routeId:l,parent:async()=>{const j={};for(let N=0;N<L;N+=1)Object.assign(j,(await v[N]).data);return j},server_data_node:ge(S)})});k=await ee({url:E,params:s,branch:await Promise.all(v),status:a,error:c,form:h,route:(b=le.find(O=>O.id===l))!=null?b:null})}catch(v){if(v instanceof Je){await ie(new URL(v.location,location.href));return}k=await se({status:v instanceof Ie?v.status:500,error:ne(v,{url:E,params:s,routeId:l}),url:E,routeId:l})}$e(k)}}}async function Me(r,e){const t=new URL(r);t.pathname=dt(r.pathname);const i=await he(t.href,{headers:{"x-sveltekit-invalidated":e.map(m=>m?"1":"").join(",")}}),o=await i.text();if(!i.ok)throw new Error(JSON.parse(o));return Ct(o)}function ne(r,e){var t;return r instanceof Ie?r.body:(t=jt.handleError({error:r,event:e}))!=null?t:{message:e.routeId!=null?"Internal Error":"Not Found"}}const Gt=["hash","href","host","hostname","origin","pathname","port","protocol","search","searchParams","toString","toJSON"];function ce(r,e){for(const t of Gt)Object.defineProperty(e,t,{get(){throw new Error(`The navigation shape changed - ${r}.${t} should now be ${r}.url.${t}`)},enumerable:!1});return e}function fe(){return()=>{}}async function Yt({env:r,hydrate:e,paths:t,target:i,trailing_slash:o}){ot(t);const m=Jt({target:i,base:t.base,trailing_slash:o});st({client:m}),e?await m._hydrate(e):m.goto(location.href,{replaceState:!0}),m._start_router()}export{Yt as start};