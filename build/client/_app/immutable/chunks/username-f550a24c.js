import{w as a}from"./index-9ff150c3.js";const e=localStorage.getItem("username"),s=a(e&&JSON.parse(e)||"");s.subscribe(r=>localStorage.username=JSON.stringify(r));export{s as u};
