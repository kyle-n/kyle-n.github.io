import{_ as m}from"../chunks/preload-helper.a4192956.js";import{s as x}from"../chunks/scheduler.63274e7e.js";import{S as y,i as j,g as v,s as D,e as V,h as g,x as $,c as T,a as E,d as P,b as B,t as b,f,z as C,m as F,r as S,j as O,n as k,u as z,k as A,y as h,v as H,o as q,w as J,p as M}from"../chunks/index.9f372ec1.js";import{P as N}from"../chunks/post-date.5bc99a03.js";function w(r){return(r==null?void 0:r.length)!==void 0?r:Array.from(r)}async function G(){const r="./posts/",i=Object.entries(Object.assign({"./posts/ai-browser-extension.md":()=>m(()=>import("../chunks/ai-browser-extension.bbeadaa1.js"),["../chunks/ai-browser-extension.bbeadaa1.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/angular-reactive-forms-rental-rates-servicecore.md":()=>m(()=>import("../chunks/angular-reactive-forms-rental-rates-servicecore.796a43ad.js"),["../chunks/angular-reactive-forms-rental-rates-servicecore.796a43ad.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/code-simplicity.md":()=>m(()=>import("../chunks/code-simplicity.09376901.js"),["../chunks/code-simplicity.09376901.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/componentfactoryresolver-explained.md":()=>m(()=>import("../chunks/componentfactoryresolver-explained.703a1983.js"),["../chunks/componentfactoryresolver-explained.703a1983.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/ebike-daily-routine.md":()=>m(()=>import("../chunks/ebike-daily-routine.f78d673c.js"),["../chunks/ebike-daily-routine.f78d673c.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/how-node-js-fakes-multithreading.md":()=>m(()=>import("../chunks/how-node-js-fakes-multithreading.05e44e61.js"),["../chunks/how-node-js-fakes-multithreading.05e44e61.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/how-to-speed-up-angular-builds.md":()=>m(()=>import("../chunks/how-to-speed-up-angular-builds.468c0c4b.js"),["../chunks/how-to-speed-up-angular-builds.468c0c4b.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/incremental-angular-typescript-adoption.md":()=>m(()=>import("../chunks/incremental-angular-typescript-adoption.8d9117c1.js"),["../chunks/incremental-angular-typescript-adoption.8d9117c1.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/job-hunting-fun.md":()=>m(()=>import("../chunks/job-hunting-fun.93e43abb.js"),["../chunks/job-hunting-fun.93e43abb.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/offline-podcast-watch-apps-ranked.md":()=>m(()=>import("../chunks/offline-podcast-watch-apps-ranked.6f793f5e.js"),["../chunks/offline-podcast-watch-apps-ranked.6f793f5e.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/rxjs-7-changes.md":()=>m(()=>import("../chunks/rxjs-7-changes.3f0f26f2.js"),["../chunks/rxjs-7-changes.3f0f26f2.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/rxjs-land-of-paradoxes.md":()=>m(()=>import("../chunks/rxjs-land-of-paradoxes.31b5a5b4.js"),["../chunks/rxjs-land-of-paradoxes.31b5a5b4.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/unit-test-your-templates.md":()=>m(()=>import("../chunks/unit-test-your-templates.4160a679.js"),["../chunks/unit-test-your-templates.4160a679.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/why-svelte.md":()=>m(()=>import("../chunks/why-svelte.295cbf17.js"),["../chunks/why-svelte.295cbf17.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/why-use-small-components.md":()=>m(()=>import("../chunks/why-use-small-components.c10b8e84.js"),["../chunks/why-use-small-components.c10b8e84.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url),"./posts/wwdc-23-wishlist-free-local-chatgpt.md":()=>m(()=>import("../chunks/wwdc-23-wishlist-free-local-chatgpt.696000c8.js"),["../chunks/wwdc-23-wishlist-free-local-chatgpt.696000c8.js","../chunks/scheduler.63274e7e.js","../chunks/index.9f372ec1.js"],import.meta.url)})).map(async([p,_])=>{const{metadata:t}=await _(),u=p.replace(r,"").replace(".md","");return{metadata:t,postPath:u}}),n=await Promise.all(i);return n.sort((p,_)=>{const t=new Date(p.metadata.date);return new Date(_.metadata.date).getTime()-t.getTime()}),{posts:n}}const Z=Object.freeze(Object.defineProperty({__proto__:null,load:G},Symbol.toStringTag,{value:"Module"}));function L(r,s,l){const i=r.slice();return i[1]=s[l],i}function R(r){let s,l,i,n=r[1].metadata.title+"",p,_,t,u,o,a;return t=new N({props:{date:r[1].metadata.date}}),{c(){s=v("div"),l=v("a"),i=v("h3"),p=F(n),_=D(),S(t.$$.fragment),o=D(),this.h()},l(e){s=g(e,"DIV",{class:!0});var d=O(s);l=g(d,"A",{href:!0});var c=O(l);i=g(c,"H3",{});var I=O(i);p=k(I,n),I.forEach(f),_=T(c),z(t.$$.fragment,c),c.forEach(f),o=T(d),d.forEach(f),this.h()},h(){A(l,"href",u="/blog/"+r[1].postPath),A(s,"class","post-preview")},m(e,d){E(e,s,d),h(s,l),h(l,i),h(i,p),h(l,_),H(t,l,null),h(s,o),a=!0},p(e,d){(!a||d&1)&&n!==(n=e[1].metadata.title+"")&&q(p,n);const c={};d&1&&(c.date=e[1].metadata.date),t.$set(c),(!a||d&1&&u!==(u="/blog/"+e[1].postPath))&&A(l,"href",u)},i(e){a||(P(t.$$.fragment,e),a=!0)},o(e){b(t.$$.fragment,e),a=!1},d(e){e&&f(s),J(t)}}}function K(r){let s,l="Blog",i,n,p,_=w(r[0].posts),t=[];for(let o=0;o<_.length;o+=1)t[o]=R(L(r,_,o));const u=o=>b(t[o],1,1,()=>{t[o]=null});return{c(){s=v("h2"),s.textContent=l,i=D();for(let o=0;o<t.length;o+=1)t[o].c();n=V()},l(o){s=g(o,"H2",{"data-svelte-h":!0}),$(s)!=="svelte-mggmmu"&&(s.textContent=l),i=T(o);for(let a=0;a<t.length;a+=1)t[a].l(o);n=V()},m(o,a){E(o,s,a),E(o,i,a);for(let e=0;e<t.length;e+=1)t[e]&&t[e].m(o,a);E(o,n,a),p=!0},p(o,[a]){if(a&1){_=w(o[0].posts);let e;for(e=0;e<_.length;e+=1){const d=L(o,_,e);t[e]?(t[e].p(d,a),P(t[e],1)):(t[e]=R(d),t[e].c(),P(t[e],1),t[e].m(n.parentNode,n))}for(M(),e=_.length;e<t.length;e+=1)u(e);B()}},i(o){if(!p){for(let a=0;a<_.length;a+=1)P(t[a]);p=!0}},o(o){t=t.filter(Boolean);for(let a=0;a<t.length;a+=1)b(t[a]);p=!1},d(o){o&&(f(s),f(i),f(n)),C(t,o)}}}function Q(r,s,l){let{data:i}=s;return r.$$set=n=>{"data"in n&&l(0,i=n.data)},[i]}class tt extends y{constructor(s){super(),j(this,s,Q,K,x,{data:0})}}export{tt as component,Z as universal};
