import{s as ae,n as Tt}from"./scheduler.63274e7e.js";import{S as re,i as ue,g as n,s as a,h as o,x as s,c as r,a as l,f as i}from"./index.9f372ec1.js";function pe(se){let u,Ht='Slow builds <a href="https://steven-lemon182.medium.com/a-guide-to-reducing-development-wait-time-part-1-why-9dcbbfdc1224" rel="nofollow">stop developers’ productivity cold</a>. If code takes even two minutes to compile, it’s easy to get distracted. You lose your train of thought or, god forbid, open social media.',$,p,Lt='<img src="/static/img/compiling.png" alt="An XKCD comic of two programmers fighting with toy swords. Their boss yells at them to work, but they say their code is compiling."/>',D,d,Mt='Slow builds are also expensive. Imagine you have one developer paid $100,000 a year, approximately <a href="https://www.ziprecruiter.com/Salaries/Software-Engineer-Salary" rel="nofollow">the average salary of a software engineer in the United States</a>. That’s $50 an hour, assuming they get two weeks off and work 40 hours a week. If they rebuild the app ten times a day and each rebuild takes two minutes, that person is paid $3,320 per year to watch a progress bar. And that’s not even factoring in the cost of running builds on cloud infrastructure.',Y,h,kt='No wonder a Reddit engineer <a href="https://twitter.com/softwarejameson/status/1455971162060697613?s=20&amp;t=nG4msUNBfLolUl_TEndsYQ" rel="nofollow">announced</a> last year that they were buying new Apple Silicon MacBook Pros for their Android developers. According to this engineer, the improved build times paid for the laptops in just three months.',F,f,At="So if you are running into slow Angular builds, try these steps to reduce build time. They are listed in order of increasing complexity.",G,m,Pt="Step 1: Update your local environment",K,c,St="First, increase Node’s memory limit. This consumes more RAM, but it helps.",Q,v,jt="Second, keep ahead-of-time (AOT) compilation turned on. Builds will take slightly longer than just-in-time (JIT) compilation, but the page will refresh so quickly that it may be worth it.",X,w,It="Step 2: Check your build process",Z,b,zt='<img src="/static/img/angular-build-flags.png" alt="A chart of Angular build flags and their effect on compile times"/>',V,g,qt="I tested every command-line option for ng build for its performance while enabled and disabled. These are the flags I’d recommend using, depending on the context.",tt,y,Ut="<thead><tr><th>Dev only</th> <th>Prod only</th></tr></thead> <tbody><tr><td>—named-chunks</td> <td>—build-optimizer</td></tr> <tr><td>—vendor-chunk</td> <td>—optimization</td></tr> <tr><td></td> <td>—output-hashing</td></tr> <tr><td></td> <td>—extract-licenses</td></tr> <tr><td></td> <td>—subresource-integrity</td></tr></tbody>",et,x,Nt="<code>--named-chunks</code> and <code>--vendor-chunk</code> help cache JavaScript bundles across builds. The flags in the prod column tend to optimize the build for smaller bundle sizes at the expense of compile time.",lt,C,Rt="Try hot module reloading.",it,_,Wt='<a href="https://blog.angular.io/version-11-of-angular-now-available-74721b7952f7" title="https://blog.angular.io/version-11-of-angular-now-available-74721b7952f7" rel="nofollow">Hot module reloading (HMR) is much easier</a> in Angular 11. When Angular rebuilds a module, it updates the app without reloading the page. It just swaps in new code.',nt,T,Bt='However, use caution as it has strange behaviour with RxJS subscriptions and WebSockets. If you don’t <a href="https://levelup.gitconnected.com/unsubscribing-in-angular-the-right-way-6ed82be43ccc" title="https://levelup.gitconnected.com/unsubscribing-in-angular-the-right-way-6ed82be43ccc" rel="nofollow">correctly unsubscribe</a> from either, it could create duplicate connections and confusing errors.',ot,H,Jt="Step 3: Minimize the work required",st,L,Et="Builds are faster if there’s less code. Consolidate components, delete old code and get rid of what you can.",at,M,Ot="Avoid custom build processes",rt,k,$t='Our <a href="https://www.bitovi.com/frontend-javascript-consulting/angular-consulting" title="https://www.bitovi.com/frontend-javascript-consulting/angular-consulting" rel="nofollow">team of Angular experts</a> worked with one client whose builds were being slowed by localization files. They had eschewed Angular’s localization system for a custom process that combined over a thousand JSON files at build time.',ut,A,Dt="Avoid adding extra steps to the build process where possible. If Angular includes some functionality, use it instead of rolling your own. Using built-in features, whether localization or scripting or bundling, will give you the benefit of work done by the Angular team to optimize build times.",pt,P,Yt="If you have some pressing product needs and need to do a custom process during the build, consider whether that step can be done asynchronously.",dt,S,Ft="Use small modules",ht,j,Gt="Lastly, use small Angular modules. When an Angular application is being served, and a file changes, only the module containing that file is rebuilt.",ft,I,Kt="Step 4: Upgrade Angular",mt,z,Qt='Angular, unlike other frameworks, <a href="https://dev.to/dubyabrian/comment/37cp" title="https://dev.to/dubyabrian/comment/37cp" rel="nofollow">includes batteries</a>. With React or Svelte, you can use a completely different and faster compiler. <a href="https://create-react-app.dev/" title="https://create-react-app.dev" rel="nofollow">Create-React-App</a> might start you with <a href="https://webpack.js.org/" title="https://webpack.js.org" rel="nofollow">webpack</a>, but you can speed up <a href="https://esbuild.github.io/" title="https://esbuild.github.io" rel="nofollow">esbuild</a>.',ct,q,Xt='With Angular, the compiler the framework ships is the one you get. Updating to new major versions of Angular will get you faster, with fewer buggy compilers with better build times. Angular 9 and Ivy are <a href="https://www.piotrl.net/angular-ivy-build-performance/" title="https://www.piotrl.net/angular-ivy-build-performance/" rel="nofollow">especially fast</a>.',vt,U,Zt='<img src="/static/img/ivy-build-comparison.png" alt="A bar chart showing how Ivy has made dev and prod builds faster"/>',wt,N,Vt='Performance for a production build, <a href="https://indepth.dev/posts/1221/angular-with-ivy-build-performance-review" title="https://indepth.dev/posts/1221/angular-with-ivy-build-performance-review" rel="nofollow">as tested by Piotr Lewandowski</a>.',bt,R,te='When you do the upgrade, be sure to use <code>ng update</code>. The Angular CLI will apply migrations to your build config to <a href="https://github.com/angular/angular/issues/42100#issuecomment-847331725" title="https://github.com/angular/angular/issues/42100#issuecomment-847331725" rel="nofollow">automatically use the fastest settings</a>. After the upgrade, you can also run these migrations (<code>ng update @angular/cli --migrate-only</code>).',gt,W,ee="Now, upgrading major Angular versions is easier said than done. Sometimes you’re working on a massive old enterprise app, and there’s just no time or budget to upgrade. ",yt,B,le='If you need help upgrading your Angular app <a href="https://www.bitovi.com/frontend-javascript-consulting/angular-consulting" title="https://www.bitovi.com/frontend-javascript-consulting/angular-consulting" rel="nofollow">fill out our form</a> to get a free consultation! See also our guide to <a href="https://www.bitovi.com/blog/angular-upgrades-painless-migration-from-tslint-to-eslint" title="https://www.bitovi.com/blog/angular-upgrades-painless-migration-from-tslint-to-eslint" rel="nofollow">migrating tslint to eslint</a>.',xt,J,ie="Step 5: Use caching",Ct,E,ne="Tools like Nx also cache build data in the cloud and share it among developers. They can be compelling if you don’t mind introducing another dependency to the build process.",_t,O,oe='If your builds are bottlenecked specifically during continuous integration, try caching your node_modules folder. People have reported up to <a href="https://medium.com/vendasta/how-to-speed-up-angular-build-times-with-caching-5856d369de88" title="https://medium.com/vendasta/how-to-speed-up-angular-build-times-with-caching-5856d369de88" rel="nofollow">75% faster builds</a> from preserving node_modules between CI runs.';return{c(){u=n("p"),u.innerHTML=Ht,$=a(),p=n("p"),p.innerHTML=Lt,D=a(),d=n("p"),d.innerHTML=Mt,Y=a(),h=n("p"),h.innerHTML=kt,F=a(),f=n("p"),f.textContent=At,G=a(),m=n("h2"),m.textContent=Pt,K=a(),c=n("p"),c.textContent=St,Q=a(),v=n("p"),v.textContent=jt,X=a(),w=n("h2"),w.textContent=It,Z=a(),b=n("p"),b.innerHTML=zt,V=a(),g=n("p"),g.textContent=qt,tt=a(),y=n("table"),y.innerHTML=Ut,et=a(),x=n("p"),x.innerHTML=Nt,lt=a(),C=n("h3"),C.textContent=Rt,it=a(),_=n("p"),_.innerHTML=Wt,nt=a(),T=n("p"),T.innerHTML=Bt,ot=a(),H=n("h2"),H.textContent=Jt,st=a(),L=n("p"),L.textContent=Et,at=a(),M=n("h3"),M.textContent=Ot,rt=a(),k=n("p"),k.innerHTML=$t,ut=a(),A=n("p"),A.textContent=Dt,pt=a(),P=n("p"),P.textContent=Yt,dt=a(),S=n("h3"),S.textContent=Ft,ht=a(),j=n("p"),j.textContent=Gt,ft=a(),I=n("h3"),I.textContent=Kt,mt=a(),z=n("p"),z.innerHTML=Qt,ct=a(),q=n("p"),q.innerHTML=Xt,vt=a(),U=n("p"),U.innerHTML=Zt,wt=a(),N=n("p"),N.innerHTML=Vt,bt=a(),R=n("p"),R.innerHTML=te,gt=a(),W=n("p"),W.textContent=ee,yt=a(),B=n("p"),B.innerHTML=le,xt=a(),J=n("h3"),J.textContent=ie,Ct=a(),E=n("p"),E.textContent=ne,_t=a(),O=n("p"),O.innerHTML=oe},l(t){u=o(t,"P",{"data-svelte-h":!0}),s(u)!=="svelte-1psk79q"&&(u.innerHTML=Ht),$=r(t),p=o(t,"P",{"data-svelte-h":!0}),s(p)!=="svelte-177yt0l"&&(p.innerHTML=Lt),D=r(t),d=o(t,"P",{"data-svelte-h":!0}),s(d)!=="svelte-3krl8"&&(d.innerHTML=Mt),Y=r(t),h=o(t,"P",{"data-svelte-h":!0}),s(h)!=="svelte-jlqtvx"&&(h.innerHTML=kt),F=r(t),f=o(t,"P",{"data-svelte-h":!0}),s(f)!=="svelte-3je846"&&(f.textContent=At),G=r(t),m=o(t,"H2",{"data-svelte-h":!0}),s(m)!=="svelte-16i54v3"&&(m.textContent=Pt),K=r(t),c=o(t,"P",{"data-svelte-h":!0}),s(c)!=="svelte-1xqnupa"&&(c.textContent=St),Q=r(t),v=o(t,"P",{"data-svelte-h":!0}),s(v)!=="svelte-1m0lhz"&&(v.textContent=jt),X=r(t),w=o(t,"H2",{"data-svelte-h":!0}),s(w)!=="svelte-1ws0kxy"&&(w.textContent=It),Z=r(t),b=o(t,"P",{"data-svelte-h":!0}),s(b)!=="svelte-1cd0hbd"&&(b.innerHTML=zt),V=r(t),g=o(t,"P",{"data-svelte-h":!0}),s(g)!=="svelte-1a5cp1y"&&(g.textContent=qt),tt=r(t),y=o(t,"TABLE",{"data-svelte-h":!0}),s(y)!=="svelte-12eatwf"&&(y.innerHTML=Ut),et=r(t),x=o(t,"P",{"data-svelte-h":!0}),s(x)!=="svelte-1e424sz"&&(x.innerHTML=Nt),lt=r(t),C=o(t,"H3",{"data-svelte-h":!0}),s(C)!=="svelte-lmrcgh"&&(C.textContent=Rt),it=r(t),_=o(t,"P",{"data-svelte-h":!0}),s(_)!=="svelte-1dtrphx"&&(_.innerHTML=Wt),nt=r(t),T=o(t,"P",{"data-svelte-h":!0}),s(T)!=="svelte-1k0s387"&&(T.innerHTML=Bt),ot=r(t),H=o(t,"H2",{"data-svelte-h":!0}),s(H)!=="svelte-6ayt46"&&(H.textContent=Jt),st=r(t),L=o(t,"P",{"data-svelte-h":!0}),s(L)!=="svelte-qosjzt"&&(L.textContent=Et),at=r(t),M=o(t,"H3",{"data-svelte-h":!0}),s(M)!=="svelte-z3ng9p"&&(M.textContent=Ot),rt=r(t),k=o(t,"P",{"data-svelte-h":!0}),s(k)!=="svelte-1ihayob"&&(k.innerHTML=$t),ut=r(t),A=o(t,"P",{"data-svelte-h":!0}),s(A)!=="svelte-19f6qvy"&&(A.textContent=Dt),pt=r(t),P=o(t,"P",{"data-svelte-h":!0}),s(P)!=="svelte-1r1oifg"&&(P.textContent=Yt),dt=r(t),S=o(t,"H3",{"data-svelte-h":!0}),s(S)!=="svelte-1lvqcvl"&&(S.textContent=Ft),ht=r(t),j=o(t,"P",{"data-svelte-h":!0}),s(j)!=="svelte-m8r4a7"&&(j.textContent=Gt),ft=r(t),I=o(t,"H3",{"data-svelte-h":!0}),s(I)!=="svelte-1kvptoo"&&(I.textContent=Kt),mt=r(t),z=o(t,"P",{"data-svelte-h":!0}),s(z)!=="svelte-1d1wvx3"&&(z.innerHTML=Qt),ct=r(t),q=o(t,"P",{"data-svelte-h":!0}),s(q)!=="svelte-6tyg1o"&&(q.innerHTML=Xt),vt=r(t),U=o(t,"P",{"data-svelte-h":!0}),s(U)!=="svelte-j7sdl9"&&(U.innerHTML=Zt),wt=r(t),N=o(t,"P",{"data-svelte-h":!0}),s(N)!=="svelte-10x6b0r"&&(N.innerHTML=Vt),bt=r(t),R=o(t,"P",{"data-svelte-h":!0}),s(R)!=="svelte-1nk0qta"&&(R.innerHTML=te),gt=r(t),W=o(t,"P",{"data-svelte-h":!0}),s(W)!=="svelte-1x4vqvh"&&(W.textContent=ee),yt=r(t),B=o(t,"P",{"data-svelte-h":!0}),s(B)!=="svelte-1o6uk24"&&(B.innerHTML=le),xt=r(t),J=o(t,"H3",{"data-svelte-h":!0}),s(J)!=="svelte-fu4xxv"&&(J.textContent=ie),Ct=r(t),E=o(t,"P",{"data-svelte-h":!0}),s(E)!=="svelte-haszsa"&&(E.textContent=ne),_t=r(t),O=o(t,"P",{"data-svelte-h":!0}),s(O)!=="svelte-wto03y"&&(O.innerHTML=oe)},m(t,e){l(t,u,e),l(t,$,e),l(t,p,e),l(t,D,e),l(t,d,e),l(t,Y,e),l(t,h,e),l(t,F,e),l(t,f,e),l(t,G,e),l(t,m,e),l(t,K,e),l(t,c,e),l(t,Q,e),l(t,v,e),l(t,X,e),l(t,w,e),l(t,Z,e),l(t,b,e),l(t,V,e),l(t,g,e),l(t,tt,e),l(t,y,e),l(t,et,e),l(t,x,e),l(t,lt,e),l(t,C,e),l(t,it,e),l(t,_,e),l(t,nt,e),l(t,T,e),l(t,ot,e),l(t,H,e),l(t,st,e),l(t,L,e),l(t,at,e),l(t,M,e),l(t,rt,e),l(t,k,e),l(t,ut,e),l(t,A,e),l(t,pt,e),l(t,P,e),l(t,dt,e),l(t,S,e),l(t,ht,e),l(t,j,e),l(t,ft,e),l(t,I,e),l(t,mt,e),l(t,z,e),l(t,ct,e),l(t,q,e),l(t,vt,e),l(t,U,e),l(t,wt,e),l(t,N,e),l(t,bt,e),l(t,R,e),l(t,gt,e),l(t,W,e),l(t,yt,e),l(t,B,e),l(t,xt,e),l(t,J,e),l(t,Ct,e),l(t,E,e),l(t,_t,e),l(t,O,e)},p:Tt,i:Tt,o:Tt,d(t){t&&(i(u),i($),i(p),i(D),i(d),i(Y),i(h),i(F),i(f),i(G),i(m),i(K),i(c),i(Q),i(v),i(X),i(w),i(Z),i(b),i(V),i(g),i(tt),i(y),i(et),i(x),i(lt),i(C),i(it),i(_),i(nt),i(T),i(ot),i(H),i(st),i(L),i(at),i(M),i(rt),i(k),i(ut),i(A),i(pt),i(P),i(dt),i(S),i(ht),i(j),i(ft),i(I),i(mt),i(z),i(ct),i(q),i(vt),i(U),i(wt),i(N),i(bt),i(R),i(gt),i(W),i(yt),i(B),i(xt),i(J),i(Ct),i(E),i(_t),i(O))}}}const fe={layout:"post",title:"How to speed up your Angular builds",date:"2022-04-19T00:00:00.000Z",keywords:"javascript, typescript, angular, frontend",image:"fast_pc.jpg",caption:"Image via Mohamed Hassan on Pixabay"};class me extends re{constructor(u){super(),ue(this,u,null,pe,ae,{})}}export{me as default,fe as metadata};
