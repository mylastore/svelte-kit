import{S as N,i as T,s as x,e as h,w as F,k as q,t as w,c as v,a as p,x as G,d as c,m as A,h as S,b as E,g as C,H as o,y as J,j,q as b,o as I,B as K,l as z,p as L,n as M}from"../chunks/index-30349cbd.js";import{A as O}from"../chunks/AlertTriangleIcon-6201c8a0.js";function B(l){let a,s,e,t,r,u,g,y,m,d=l[1].message+"",k,f;return t=new O({props:{size:"5x"}}),{c(){a=h("div"),s=h("div"),e=h("div"),F(t.$$.fragment),r=q(),u=h("h1"),g=w(l[0]),y=q(),m=h("h4"),k=w(d),this.h()},l(n){a=v(n,"DIV",{class:!0});var i=p(a);s=v(i,"DIV",{class:!0});var _=p(s);e=v(_,"DIV",{class:!0});var D=p(e);G(t.$$.fragment,D),D.forEach(c),r=A(_),u=v(_,"H1",{});var H=p(u);g=S(H,l[0]),H.forEach(c),y=A(_),m=v(_,"H4",{});var V=p(m);k=S(V,d),V.forEach(c),_.forEach(c),i.forEach(c),this.h()},h(){E(e,"class","alert-icon svelte-12kctbe"),E(s,"class","alert-container svelte-12kctbe"),E(a,"class","container")},m(n,i){C(n,a,i),o(a,s),o(s,e),J(t,e,null),o(s,r),o(s,u),o(u,g),o(s,y),o(s,m),o(m,k),f=!0},p(n,i){(!f||i&1)&&j(g,n[0]),(!f||i&2)&&d!==(d=n[1].message+"")&&j(k,d)},i(n){f||(b(t.$$.fragment,n),f=!0)},o(n){I(t.$$.fragment,n),f=!1},d(n){n&&c(a),K(t)}}}function P(l){let a,s,e=l[1]&&B(l);return{c(){e&&e.c(),a=z()},l(t){e&&e.l(t),a=z()},m(t,r){e&&e.m(t,r),C(t,a,r),s=!0},p(t,[r]){t[1]?e?(e.p(t,r),r&2&&b(e,1)):(e=B(t),e.c(),b(e,1),e.m(a.parentNode,a)):e&&(M(),I(e,1,1,()=>{e=null}),L())},i(t){s||(b(e),s=!0)},o(t){I(e),s=!1},d(t){e&&e.d(t),t&&c(a)}}}function W({error:l,status:a}){return{props:{status:a,error:l}}}function Q(l,a,s){let{status:e}=a,{error:t}=a;return l.$$set=r=>{"status"in r&&s(0,e=r.status),"error"in r&&s(1,t=r.error)},[e,t]}class X extends N{constructor(a){super(),T(this,a,Q,P,x,{status:0,error:1})}}export{X as default,W as load};