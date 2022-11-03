import{v as ie}from"./variables-26eb9a07.js";import{S as ae,i as fe,s as ue,e as G,b as z,A as H,h as D,F as ce,N as le,k as C,q as de,l as I,m as M,r as he,n as U,D as F,u as pe}from"./index-5031b6ad.js";import{w as $}from"./index-9ff150c3.js";var q=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ye(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}function xe(o){var c=o.default;if(typeof c=="function"){var r=function(){return c.apply(this,arguments)};r.prototype=c.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(o).forEach(function(i){var u=Object.getOwnPropertyDescriptor(o,i);Object.defineProperty(r,i,u.get?u:{enumerable:!0,get:function(){return o[i]}})}),r}var L={exports:{}};(function(o,c){(function(r){function i(u){var n=u&&u.Promise||r.Promise,y=u&&u.XMLHttpRequest||r.XMLHttpRequest;return function(){var h=Object.create(r,{fetch:{value:void 0,writable:!0}});return function(f,a){a(c)}(this,function(f){var a=typeof h<"u"&&h||typeof self<"u"&&self||typeof a<"u"&&a,l={searchParams:"URLSearchParams"in a,iterable:"Symbol"in a&&"iterator"in Symbol,blob:"FileReader"in a&&"Blob"in a&&function(){try{return new Blob,!0}catch{return!1}}(),formData:"FormData"in a,arrayBuffer:"ArrayBuffer"in a};function v(e){return e&&DataView.prototype.isPrototypeOf(e)}if(l.arrayBuffer)var B=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],A=ArrayBuffer.isView||function(e){return e&&B.indexOf(Object.prototype.toString.call(e))>-1};function g(e){if(typeof e!="string"&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e)||e==="")throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function w(e){return typeof e!="string"&&(e=String(e)),e}function O(e){var t={next:function(){var s=e.shift();return{done:s===void 0,value:s}}};return l.iterable&&(t[Symbol.iterator]=function(){return t}),t}function b(e){this.map={},e instanceof b?e.forEach(function(t,s){this.append(s,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}b.prototype.append=function(e,t){e=g(e),t=w(t);var s=this.map[e];this.map[e]=s?s+", "+t:t},b.prototype.delete=function(e){delete this.map[g(e)]},b.prototype.get=function(e){return e=g(e),this.has(e)?this.map[e]:null},b.prototype.has=function(e){return this.map.hasOwnProperty(g(e))},b.prototype.set=function(e,t){this.map[g(e)]=w(t)},b.prototype.forEach=function(e,t){for(var s in this.map)this.map.hasOwnProperty(s)&&e.call(t,this.map[s],s,this)},b.prototype.keys=function(){var e=[];return this.forEach(function(t,s){e.push(s)}),O(e)},b.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),O(e)},b.prototype.entries=function(){var e=[];return this.forEach(function(t,s){e.push([s,t])}),O(e)},l.iterable&&(b.prototype[Symbol.iterator]=b.prototype.entries);function j(e){if(e.bodyUsed)return n.reject(new TypeError("Already read"));e.bodyUsed=!0}function N(e){return new n(function(t,s){e.onload=function(){t(e.result)},e.onerror=function(){s(e.error)}})}function Q(e){var t=new FileReader,s=N(t);return t.readAsArrayBuffer(e),s}function W(e){var t=new FileReader,s=N(t);return t.readAsText(e),s}function Y(e){for(var t=new Uint8Array(e),s=new Array(t.length),p=0;p<t.length;p++)s[p]=String.fromCharCode(t[p]);return s.join("")}function k(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function V(){return this.bodyUsed=!1,this._initBody=function(e){this.bodyUsed=this.bodyUsed,this._bodyInit=e,e?typeof e=="string"?this._bodyText=e:l.blob&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:l.formData&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:l.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():l.arrayBuffer&&l.blob&&v(e)?(this._bodyArrayBuffer=k(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):l.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(e)||A(e))?this._bodyArrayBuffer=k(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||(typeof e=="string"?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):l.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},l.blob&&(this.blob=function(){var e=j(this);if(e)return e;if(this._bodyBlob)return n.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return n.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return n.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){if(this._bodyArrayBuffer){var e=j(this);return e||(ArrayBuffer.isView(this._bodyArrayBuffer)?n.resolve(this._bodyArrayBuffer.buffer.slice(this._bodyArrayBuffer.byteOffset,this._bodyArrayBuffer.byteOffset+this._bodyArrayBuffer.byteLength)):n.resolve(this._bodyArrayBuffer))}else return this.blob().then(Q)}),this.text=function(){var e=j(this);if(e)return e;if(this._bodyBlob)return W(this._bodyBlob);if(this._bodyArrayBuffer)return n.resolve(Y(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return n.resolve(this._bodyText)},l.formData&&(this.formData=function(){return this.text().then(re)}),this.json=function(){return this.text().then(JSON.parse)},this}var ee=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function te(e){var t=e.toUpperCase();return ee.indexOf(t)>-1?t:e}function T(e,t){if(!(this instanceof T))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');t=t||{};var s=t.body;if(e instanceof T){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new b(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,!s&&e._bodyInit!=null&&(s=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",(t.headers||!this.headers)&&(this.headers=new b(t.headers)),this.method=te(t.method||this.method||"GET"),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,(this.method==="GET"||this.method==="HEAD")&&s)throw new TypeError("Body not allowed for GET or HEAD requests");if(this._initBody(s),(this.method==="GET"||this.method==="HEAD")&&(t.cache==="no-store"||t.cache==="no-cache")){var p=/([?&])_=[^&]*/;if(p.test(this.url))this.url=this.url.replace(p,"$1_="+new Date().getTime());else{var m=/\?/;this.url+=(m.test(this.url)?"&":"?")+"_="+new Date().getTime()}}}T.prototype.clone=function(){return new T(this,{body:this._bodyInit})};function re(e){var t=new FormData;return e.trim().split("&").forEach(function(s){if(s){var p=s.split("="),m=p.shift().replace(/\+/g," "),d=p.join("=").replace(/\+/g," ");t.append(decodeURIComponent(m),decodeURIComponent(d))}}),t}function ne(e){var t=new b,s=e.replace(/\r?\n[\t ]+/g," ");return s.split("\r").map(function(p){return p.indexOf(`
`)===0?p.substr(1,p.length):p}).forEach(function(p){var m=p.split(":"),d=m.shift().trim();if(d){var R=m.join(":").trim();t.append(d,R)}}),t}V.call(T.prototype);function E(e,t){if(!(this instanceof E))throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');t||(t={}),this.type="default",this.status=t.status===void 0?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"",this.headers=new b(t.headers),this.url=t.url||"",this._initBody(e)}V.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new b(this.headers),url:this.url})},E.error=function(){var e=new E(null,{status:0,statusText:""});return e.type="error",e};var oe=[301,302,303,307,308];E.redirect=function(e,t){if(oe.indexOf(t)===-1)throw new RangeError("Invalid status code");return new E(null,{status:t,headers:{location:e}})},f.DOMException=a.DOMException;try{new f.DOMException}catch{f.DOMException=function(t,s){this.message=t,this.name=s;var p=Error(t);this.stack=p.stack},f.DOMException.prototype=Object.create(Error.prototype),f.DOMException.prototype.constructor=f.DOMException}function S(e,t){return new n(function(s,p){var m=new T(e,t);if(m.signal&&m.signal.aborted)return p(new f.DOMException("Aborted","AbortError"));var d=new y;function R(){d.abort()}d.onload=function(){var _={status:d.status,statusText:d.statusText,headers:ne(d.getAllResponseHeaders()||"")};_.url="responseURL"in d?d.responseURL:_.headers.get("X-Request-URL");var P="response"in d?d.response:d.responseText;setTimeout(function(){s(new E(P,_))},0)},d.onerror=function(){setTimeout(function(){p(new TypeError("Network request failed"))},0)},d.ontimeout=function(){setTimeout(function(){p(new TypeError("Network request failed"))},0)},d.onabort=function(){setTimeout(function(){p(new f.DOMException("Aborted","AbortError"))},0)};function se(_){try{return _===""&&a.location.href?a.location.href:_}catch{return _}}d.open(m.method,se(m.url),!0),m.credentials==="include"?d.withCredentials=!0:m.credentials==="omit"&&(d.withCredentials=!1),"responseType"in d&&(l.blob?d.responseType="blob":l.arrayBuffer&&m.headers.get("Content-Type")&&m.headers.get("Content-Type").indexOf("application/octet-stream")!==-1&&(d.responseType="arraybuffer")),t&&typeof t.headers=="object"&&!(t.headers instanceof b)?Object.getOwnPropertyNames(t.headers).forEach(function(_){d.setRequestHeader(_,w(t.headers[_]))}):m.headers.forEach(function(_,P){d.setRequestHeader(P,_)}),m.signal&&(m.signal.addEventListener("abort",R),d.onreadystatechange=function(){d.readyState===4&&m.signal.removeEventListener("abort",R)}),d.send(typeof m._bodyInit>"u"?null:m._bodyInit)})}S.polyfill=!0,a.fetch||(a.fetch=S,a.Headers=b,a.Request=T,a.Response=E),f.Headers=b,f.Request=T,f.Response=E,f.fetch=S,Object.defineProperty(f,"__esModule",{value:!0})}),{fetch:h.fetch,Headers:h.Headers,Request:h.Request,Response:h.Response,DOMException:h.DOMException}}()}o.exports=i})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:q)})(L,L.exports);const be=ye(L.exports);var Z={exports:{}};/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */(function(o,c){(function(r){var i;if(o.exports=r(),i=!0,!i){var u=window.Cookies,n=window.Cookies=r();n.noConflict=function(){return window.Cookies=u,n}}})(function(){function r(){for(var n=0,y={};n<arguments.length;n++){var h=arguments[n];for(var f in h)y[f]=h[f]}return y}function i(n){return n.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}function u(n){function y(){}function h(a,l,v){if(!(typeof document>"u")){v=r({path:"/"},y.defaults,v),typeof v.expires=="number"&&(v.expires=new Date(new Date*1+v.expires*864e5)),v.expires=v.expires?v.expires.toUTCString():"";try{var B=JSON.stringify(l);/^[\{\[]/.test(B)&&(l=B)}catch{}l=n.write?n.write(l,a):encodeURIComponent(String(l)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),a=encodeURIComponent(String(a)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var A="";for(var g in v)!v[g]||(A+="; "+g,v[g]!==!0&&(A+="="+v[g].split(";")[0]));return document.cookie=a+"="+l+A}}function f(a,l){if(!(typeof document>"u")){for(var v={},B=document.cookie?document.cookie.split("; "):[],A=0;A<B.length;A++){var g=B[A].split("="),w=g.slice(1).join("=");!l&&w.charAt(0)==='"'&&(w=w.slice(1,-1));try{var O=i(g[0]);if(w=(n.read||n)(w,O)||i(w),l)try{w=JSON.parse(w)}catch{}if(v[O]=w,a===O)break}catch{}}return a?v[a]:v}}return y.set=h,y.get=function(a){return f(a,!1)},y.getJSON=function(a){return f(a,!0)},y.remove=function(a,l){h(a,"",r(l,{expires:-1}))},y.defaults={},y.withConverter=u,y}return u(function(){})})})(Z);const K=Z.exports,me=async o=>{o.status===440&&await ve()},ve=async()=>{typeof window<"u"&&(await ge("user"),localStorage.removeItem("username"),window.location.replace("/"))},we=async(o,c)=>{await K.set(o,c)},ge=async o=>{await K.remove(o)},Re=async o=>{await we("user",o.user)};function J(o){let c,r,i,u=o[0][0].message+"",n,y;return{c(){c=C("div"),r=C("div"),i=C("span"),n=de(u),this.h()},l(h){c=I(h,"DIV",{class:!0});var f=M(c);r=I(f,"DIV",{class:!0,role:!0});var a=M(r);i=I(a,"SPAN",{});var l=M(i);n=he(l,u),l.forEach(D),a.forEach(D),f.forEach(D),this.h()},h(){U(r,"class",y="alert alert-"+o[0][0].messageType+" svelte-1n94sv8"),U(r,"role","alert"),U(c,"class","notification svelte-1n94sv8")},m(h,f){z(h,c,f),F(c,r),F(r,i),F(i,n)},p(h,f){f&1&&u!==(u=h[0][0].message+"")&&pe(n,u),f&1&&y!==(y="alert alert-"+h[0][0].messageType+" svelte-1n94sv8")&&U(r,"class",y)},d(h){h&&D(c)}}}function _e(o){let c,r=o[0][0]&&J(o);return{c(){r&&r.c(),c=G()},l(i){r&&r.l(i),c=G()},m(i,u){r&&r.m(i,u),z(i,c,u)},p(i,[u]){i[0][0]?r?r.p(i,u):(r=J(i),r.c(),r.m(c.parentNode,c)):r&&(r.d(1),r=null)},i:H,o:H,d(i){r&&r.d(i),i&&D(c)}}}const x=(()=>{const{update:o,subscribe:c}=$([]);return{pop:()=>o(u=>(u.shift(),u)),push:(u,n)=>{n=n||"danger",o(y=>[...y,{message:u,messageType:n}])},subscribe:c}})();function Ee(o,c,r){let i,u=H;ce(o,x,f=>r(0,i=f)),o.$$.on_destroy.push(()=>u());let{duration:n=3e3}=c;const y=le();let h;return x.subscribe(({length:f})=>{h||!f||(y("notify",i[0]),h=setTimeout(()=>{h=!1,x.pop()},n))}),o.$$set=f=>{"duration"in f&&r(1,n=f.duration)},[i,n]}class Pe extends ae{constructor(c){super(),fe(this,c,Ee,_e,ue,{duration:1})}}const X=$(0),{fetch:Ae}=be(),Te=ie.apiDevPath,Ue=(o,c,r)=>{const i=o==="GET"||o==="DELETE";return Ae(`${Te}/${c}`,{method:o,credentials:"include",headers:{Accept:"application/json","Content-Type":"application/json"},...i?null:{body:JSON.stringify(r)}}).then(async u=>{const n=await u.json();if(n)return X.update(()=>200),n.status>=400?(x.push(n.message),await me(n),!0):await n}).catch(()=>(X.update(()=>502),x.push("Oops! Something is wrong. Please try later.")))};export{Pe as N,Ue as a,X as b,ye as c,q as d,xe as g,ve as l,x as n,Re as s};
