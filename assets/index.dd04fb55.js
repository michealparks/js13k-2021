function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let s,a;function l(t,e){return s||(s=document.createElement("a")),s.href=e,t===s.href}function c(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function p(){return document.createTextNode(" ")}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function m(t,e,n){e in t?t[e]="boolean"==typeof t[e]&&""===n?1:n:h(t,e,n)}function g(t){a=t}function $(t){(()=>{if(!a)throw Error("Function called outside component initialization");return a})().$$.on_mount.push(t)}(()=>{const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const n of t)if("childList"===n.type)for(const t of n.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:1,subtree:1})}function e(t){if(t.ep)return;t.ep=1;const e=(t=>{const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),"use-credentials"===t.crossorigin?e.credentials="include":"anonymous"===t.crossorigin?e.credentials="omit":e.credentials="same-origin",e})(t);fetch(t.href,e)}})();const y=[],b=[],w=[],E=[],x=Promise.resolve();let v=0;function k(t){w.push(t)}let M=0;const T=new Set;function A(){if(!M){M=1;do{for(let t=0;t<y.length;t+=1){const e=y[t];g(e),R(e.$$)}for(g(null),y.length=0;b.length;)b.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];T.has(e)||(T.add(e),e())}w.length=0}while(y.length);for(;E.length;)E.pop()();v=0,M=0,T.clear()}}function R(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(k)}}const S=new Set;function _(t,e){t&&t.i&&(S.delete(t),t.i(e))}function L(t,e,n,r){if(t&&t.o){if(S.has(t))return;S.add(t),(void 0).c.push((()=>{S.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}}function H(t,e){t.d(1),e.delete(t.key)}function I(t){t&&t.c()}function O(t,n,i,s){const{fragment:a,on_mount:l,on_destroy:c,after_update:u}=t.$$;a&&a.m(n,i),s||k((()=>{const n=l.map(e).filter(o);c?c.push(...n):r(n),t.$$.on_mount=[]})),u.forEach(k)}function j(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function C(e,o,i,s,l,c,u,d=[-1]){const p=a;g(e);const h=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:o.context||[]),callbacks:n(),dirty:d,skip_bound:0,root:o.target||p.$$.root};u&&u(h.root);let m=0;if(h.ctx=i?i(e,o.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return h.ctx&&l(h.ctx[t],h.ctx[t]=o)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](o),m&&((t,e)=>{-1===t.$$.dirty[0]&&(y.push(t),v||(v=1,x.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31})(e,t)),n})):[],h.update(),m=1,r(h.before_update),h.fragment=s?s(h.ctx):0,o.target){if(o.hydrate){const t=($=o.target,Array.from($.childNodes));h.fragment&&h.fragment.l(t),t.forEach(f)}else h.fragment&&h.fragment.c();o.intro&&_(e.$$.fragment),O(e,o.target,o.anchor,o.customElement),A()}var $;g(p)}class P{$destroy(){j(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){this.$$set&&0!==Object.keys(t).length&&(this.$$.skip_bound=1,this.$$set(t),this.$$.skip_bound=0)}}let B=["vive","oculus-touch","daydream","gearvr","windows-motion"];function F(t,e,n){const r=t.slice();return r[1]=e[n][0],r[2]=e[n][1],r}function N(t,e){let n,r;return{key:t,first:null,c(){n=d("a-asset-item"),m(n,"id",e[1]),l(n.src,r=e[2])||m(n,"src",r),this.first=n},m(t,e){u(t,n,e)},p(t,n){e=t},d(t){t&&f(n)}}}function D(e){let n,r=[],o=new Map,i=e[0];const s=t=>t[1];for(let t=0;t<i.length;t+=1){let n=F(e,i,t),a=s(n);o.set(a,r[t]=N(a,n))}return{c(){n=d("a-assets");for(let t=0;t<r.length;t+=1)r[t].c()},m(t,e){u(t,n,e);for(let o=0;o<r.length;o+=1)r[o].m(n,null)},p(t,[e]){1&e&&(i=t[0],r=((t,e,n,r,o,i,s,a,l,c,u,f)=>{let d=t.length,p=i.length,h=d;const m={};for(;h--;)m[t[h].key]=h;const g=[],$=new Map,y=new Map;for(h=p;h--;){const t=f(o,i,h),r=n(t);let a=s.get(r);a?a.p(t,e):(a=c(r,t),a.c()),$.set(r,g[h]=a),r in m&&y.set(r,Math.abs(h-m[r]))}const b=new Set,w=new Set;function E(t){_(t,1),t.m(a,u),s.set(t.key,t),u=t.first,p--}for(;d&&p;){const e=g[p-1],n=t[d-1],r=e.key,o=n.key;e===n?(u=e.first,d--,p--):$.has(o)?!s.has(r)||b.has(r)?E(e):w.has(o)?d--:y.get(r)>y.get(o)?(w.add(r),E(e)):(b.add(o),d--):(l(n,s),d--)}for(;d--;){const e=t[d];$.has(e.key)||l(e,s)}for(;p;)E(g[p-1]);return g})(r,e,s,0,t,i,o,n,H,N,null,F))},i:t,o:t,d(t){t&&f(n);for(let e=0;e<r.length;e+=1)r[e].d()}}}function q(){return[[["x","./ship.obj"],["y","./ship.mtl"]]]}class z extends P{constructor(t){super(),C(this,t,q,D,i,{})}}let U=new THREE.TextureLoader,G=(t,e)=>V()*(e-t)+t,V=(t=1)=>Math.random()*t,Y=t=>Math.abs(t),Z=t=>{let e=V(2*Math.PI),n=t*Math.sqrt(V());return[n*Math.cos(e),n*Math.sin(e)]},K=(t,e,n,r,o=new Float32Array(3*t))=>{let i=new THREE.BufferGeometry,s=new THREE.PointsMaterial({size:e,color:r,map:U.load(n+".png"),transparent:1,depthWrite:0,blending:THREE.AdditiveBlending}),a=new THREE.BufferAttribute(o,3);i.setAttribute("position",a);let l=new THREE.Points(i,s);return l.frustumCulled=0,[l,a]};const W=(t,e)=>{AFRAME.registerComponent(t,e)},X=({el:t},e,n)=>t.emit(e,n),Q=t=>document.querySelector(`[${t}]`),J=(t,e,n="scene")=>Q(n).addEventListener(t,e),tt=t=>t.getObject3D("mesh"),et=(t,e)=>{var n,r;return void 0!==e?tt(null!=(n=t.el)?n:t).children[e]:tt(null!=(r=t.el)?r:t)},nt=(t,e)=>t.el.setObject3D("mesh",e),rt=(t,e,n,r,o)=>{t.setXYZ(e,n,r,o)},ot=t=>{t.needsUpdate=1},it=t=>new Float32Array(t),st=(t,e,n)=>new THREE.Vector3(t,e,n);function at(){let e,n;return{c(){e=d("a-obj-model"),m(e,"ship",""),l(e.src,n="#x")||m(e,"src","#x"),m(e,"mtl","#y")},m(t,n){u(t,e,n)},p:t,i:t,o:t,d(t){t&&f(e)}}}function lt(t,e,n){let r,{position:o}=e,i=st(0,0,-1),s=st(),a=st(),l=10,c=0;return W("ship",{events:{"model-loaded"(){r=et(this,0)}},damage(t=1){return l-=t,l>0||(c=1,s.set(-V(.005),-V(.005),-.01)),X(this,"d",l),l},tick(){r&&(c?(r.position.add(s),r.rotation.z+=.1):(a.copy(o).sub(r.position),r.quaternion.setFromUnitVectors(i,a),r.position.lerp(o,.05)))}}),t.$$set=t=>{"position"in t&&n(0,o=t.position)},[o]}class ct extends P{constructor(t){super(),C(this,t,lt,at,i,{position:0})}}function ut(t){let e,n,r,o,i,s,a,l,h,g,$,y,b,w,E,x;return E=new ct({props:{position:t[3]}}),{c(){e=d("a-entity"),n=p(),r=d("a-entity"),o=d("a-box"),s=p(),a=d("a-box"),l=p(),h=d("a-entity"),$=p(),y=d("a-entity"),w=p(),I(E.$$.fragment),m(e,"controls","hand:left"),m(e,"ship-controls",""),m(o,"color","tomato"),m(o,"depth",ft),m(o,"height",ft),m(o,"width",i=2*t[0]),m(a,"wireframe","true"),m(a,"depth",ft),m(a,"height",ft),m(a,"width",2*ft),m(h,"position","0 -.2 0"),m(h,"text",g=t[4](t[1])),m(y,"position","0 -.3 0"),m(y,"text",b=t[4](t[2])),m(r,"controls","hand:right")},m(t,i){u(t,e,i),u(t,n,i),u(t,r,i),c(r,o),c(r,s),c(r,a),c(r,l),c(r,h),c(r,$),c(r,y),u(t,w,i),O(E,t,i),x=1},p(t,[e]){(!x||1&e&&i!==(i=2*t[0]))&&m(o,"width",i),(!x||2&e&&g!==(g=t[4](t[1])))&&m(h,"text",g),(!x||4&e&&b!==(b=t[4](t[2])))&&m(y,"text",b)},i(t){x||(_(E.$$.fragment,t),x=1)},o(t){L(E.$$.fragment,t),x=0},d(t){t&&f(e),t&&f(n),t&&f(r),t&&f(w),j(E,t)}}}let ft=.1;function dt(t,e,n){let r,o=st(),i=1*ft,s="Health",a="Score 0";return W("controls",{update(){for(let t of B)this.el.setAttribute(t+"-controls",{hand:this.data.hand,model:0})}}),W("ship-controls",{events:{triggerdown(){X(this,"a",r)},triggerup(){X(this,"b")}},tick(){o.copy(this.el.getAttribute("position"))}}),$((()=>{J("model-loaded",(t=>{r=et(t.target.components.ship,0)})),J("d",(({detail:t})=>{n(0,i=t/10*ft),i>0||n(1,s="Game over")})),J("c",(({detail:t})=>{n(2,a="Score "+t)}))})),[i,s,a,o,t=>`value:${t};align:center`]}class pt extends P{constructor(t){super(),C(this,t,dt,ut,i,{})}}function ht(){let e;return{c(){e=d("div"),e.innerHTML='<h1 class="a">THE GALACTIC ASTEROID CLEANUP 1 WAY TICKET LAST RESORT TOP SECRET MISSION</h1><p class="a">It&#39;s that time of the year again.<br/><br/>The annual journey of interstellar killer asteroids from an unknown origin has begun its way toward Earth, and only you, Dave Spacehero, can clean up this mess.<br/><br/>Godspeed. You better come home in one piece. As long as you blow up all the asteroids.</p><button id="c" type="button" class="a">Enter VR</button>',h(e,"id","b"),h(e,"class","a")},m(t,n){u(t,e,n)},p:t,i:t,o:t,d(t){t&&f(e)}}}class mt extends P{constructor(t){super(),C(this,t,null,ht,i,{})}}function gt(){let e;return{c(){e=d("a-entity"),m(e,"stars","")},m(t,n){u(t,e,n)},p:t,i:t,o:t,d(t){t&&f(e)}}}let $t=it(3e3),yt=0,bt=0;for(;3e3>yt;){let[t,e]=Z(40);$t[yt+0]=t,$t[yt+1]=e,$t[yt+2]=V(300)-150,yt+=3}let[wt,Et]=K(1e3,.3,"circle","#fff",$t);W("stars",{init(){nt(this,wt)},tick(){for(yt=0;1e3>yt;)bt=Et.getZ(yt)+yt%200/1e3,bt>150&&(bt=-bt),Et.setZ(yt,bt),yt+=1;ot(Et)}});class xt extends P{constructor(t){super(),C(this,t,null,gt,i,{})}}function vt(){let e;return{c(){e=d("a-entity"),m(e,"debris","")},m(t,n){u(t,e,n)},p:t,i:t,o:t,d(t){t&&f(e)}}}function kt(){let t,e,n,r=0;$((()=>{n=Q("bullets").components.bullets,J("enter-vr",(()=>R(0))),J("model-loaded",(n=>{t=n.target.components.ship,e=et(t,0)}))}));let o,i,s,a=new THREE.Sphere,l=new THREE.Box3,c=st(),u=new THREE.Object3D,f=it(1800),d=it(1800),p=it(1800),h=it(1800),m=it(600),g=new THREE.IcosahedronGeometry(.4),y=new THREE.MeshStandardMaterial({color:"#FF926B"}),b=new THREE.InstancedMesh(g,y,600),w=150,E=0,x=(t,e=0,n=-150,r=-150,o=-150)=>{let i=3*t;m[t]=e,u.scale.setScalar(e),u.position.set(n,r,o),u.updateMatrix(),f[i]=n,f[i+1]=r,f[i+2]=o},v=(t,e,n,r)=>{let o=3*t;d[o+0]=e,d[o+1]=n,d[o+2]=r,h[o+0]=V(.01),h[o+1]=V(.01),h[o+2]=V(.01)},k=t=>{if(150>t){let[e,n]=Z(2);x(t,.4+V(1),e,n+1,-155)}else x(t)},M=(t,e,n,o,s)=>{if(e>=150)return r+=3,X(t,"c",r),void x(e);for(r+=1,X(t,"c",r),k(e),v(e,0,0,.05+V(.1)),i=0;10>i;)x(w,.4/1.5,n,o,s),v(w,G(-.02,.02),G(-.02,.02),G(.05,.1)),w+=1,599===w&&(w=150),i++},T=(t,e)=>[t[e],t[e+1],t[e+2]],A=(t,e,n)=>{e[t+0]+=n[t+0],e[t+1]+=n[t+1],e[t+2]+=n[t+2]},R=t=>{150>t&&(v(t,0,0,.05+V(.1)),setTimeout(R,300,t+1))};return W("debris",{init(){for(nt(this,b),o=0;600>o;)k(o),o++},tick(){if(e&&n){for(l.setFromObject(e),o=0;600>o;){s=3*o,A(s,f,d),A(s,p,h);let e=m[o],[r,i,g]=T(f,s);if(g>150)k(o),o++;else{if(u.scale.set(e,e,e),u.position.set(r,i,g),u.rotation.set(p[s],p[s+1],p[s+2]),u.updateMatrix(),b.setMatrixAt(o,u.matrix),!E){a.set(u.position,.4),l.intersectsSphere(a)&&(M(this,o,r,i,g),E=0>=t.damage(o>150?.1:1));let e=n.positions();for(let t of n.awake()){let[r,i,s]=T(e,3*t);c.set(r,i,s),a.containsPoint(c)&&(M(this,o,r,i,s),n.sleep(t));let l=25;(Y(r)>l||Y(i)>l||Y(s)>l)&&n.sleep(t)}}o++}}ot(b.instanceMatrix)}}}),[]}class Mt extends P{constructor(t){super(),C(this,t,kt,vt,i,{})}}function Tt(){let e;return{c(){e=d("a-entity"),m(e,"bullets","")},m(t,n){u(t,e,n)},p:t,i:t,o:t,d(t){t&&f(e)}}}let At,Rt=st(),[St,_t]=K(500,.1,"circle","#ba68c8"),Lt=it(1500),Ht=new Set,It=0,Ot=0,jt=0,Ct=0,Pt=0,Bt=0,Ft=0,Nt=0;W("bullets",{init(){for(nt(this,St),J("a",(t=>{At=t.detail})),J("b",(()=>{At=null}));500>Ct;)rt(_t,Ct,150,150,150),Ct+=1},tick(t){if(At&&t-jt>300){Rt.set(0,0,-1).applyQuaternion(At.quaternion).normalize(),Ct=3*It,Ot=It%2==0?-.1:.1,Lt[Ct]=.1*Rt.x,Lt[Ct+1]=.1*Rt.y,Lt[Ct+2]=.1*Rt.z;let{x:e,y:n,z:r}=At.position;rt(_t,It,e+Ot,n,r),499===It&&(It=0),Ht.add(It),jt=t,It+=1}for(Ct of Ht)Pt=3*Ct,Bt=Lt[Pt],Ft=Lt[Pt+1],Nt=Lt[Pt+2],0===Bt&&0===Ft&&0===Nt||(Bt+=_t.getX(Ct),Ft+=_t.getY(Ct),Nt+=_t.getZ(Ct),rt(_t,Ct,Bt,Ft,Nt));ot(_t)},positions:()=>_t.array,awake:()=>Ht,sleep(t){Ht.delete(t),rt(_t,t,150,150,150)}});class Dt extends P{constructor(t){super(),C(this,t,null,Tt,i,{})}}let qt,zt,Ut,Gt,Vt,Yt={songData:[{i:[0,255,116,79,0,255,116,0,83,255,4,6,69,52,0,0,0,0,0,0,2,14,0,0,32,0,0,0,0],p:[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],c:[{n:[135,,,,135,,,,135,,,,135,,,,135,,,,135,,,,135,,,,135],f:[]},{n:[123,,,,123,,,,123,,,,123,,,,123,,,,123,,,,123,,,,123],f:[]}]},{i:[0,0,140,0,0,0,140,0,0,81,4,10,47,55,0,0,0,187,5,0,1,239,135,0,32,108,5,0,0],p:[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],c:[{n:[,,,,135,,,,,,,,135,,,,,,,,135,,,,,,,,135],f:[]},{n:[,,123,,,,123,,,,123,,,,123,,,,123,,,,123,,,,123,,,,123],f:[]}]},{i:[2,100,128,0,1,0,128,10,0,31,5,6,58,0,0,7,2,195,6,1,2,135,0,0,32,147,6,0,6],p:[2,2,2,2,3,4,2,2,2,2,3,4,2,2,2,2,3,4,2,2,2,2,3,4],c:[{n:[111,111,111,,111,,,111,,,111,,111,111,111,,113,113,113,,113,,,113,,,113,,113,113,113],f:[]},{n:[111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],f:[]},{n:[118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118,118],f:[]},{n:[116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116,116],f:[]}]},{i:[3,146,140,0,1,204,128,3,0,0,92,0,95,0,0,0,3,179,5,1,2,30,135,11,32,150,3,157,6],p:[2,3,4,5,6,7,2,3,4,5,6,7,2,3,4,5,6,7,2,3,4,5,6,7],c:[{n:[],f:[]},{n:[135,,,,,,,,135,,,,,,,,135,,,,,,,,142,,,,,,,,139,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,142],f:[]},{n:[139,,,,139,,,,,,,,,,,,139,,,,,,,,139],f:[]},{n:[140,,,,140,,,,140,,,,,,,,140,,,,,,,,140],f:[]},{n:[142,,,,142,,,,142],f:[]},{n:[146,,,,,,,,,,,,,,,,147],f:[]},{n:[144],f:[]}]},{i:[3,255,128,0,0,0,92,0,0,127,2,2,47,61,0,0,0,96,3,1,3,62,181,0,32,84,2,12,4],p:[2,2,4,4,3,5,2,2,4,4,3,5,2,2,4,4,3,5,2,2,4,4],c:[{n:[],f:[]},{n:[151,149,151,152,151,149,151,152,151,149,151,152,151,149,151,152,151,149,151,152,151,149,151,152,151,149,151,152,151,149,151,152],f:[]},{n:[154,152,154,158,154,152,154,158,154,152,154,158,154,152,154,158,154,152,154,158,154,152,154,158,154,152,154,158,154,152,154,158],f:[]},{n:[147,146,147,149,147,146,147,149,147,146,147,149,147,146,147,149,147,146,147,149,147,146,147,149,147,146,147,149,147,146,147,149],f:[]},{n:[152,151,152,154,152,151,152,154,152,151,152,154,152,151,152,154,152,151,152,154,152,151,152,154,152,151,152,154,152,151,152,154],f:[]}]}],rowLen:5513,patternLen:32,endPattern:23,numChannels:5},Zt=t=>Math.sin(6.283184*t),Kt=t=>.003959503758*2**((t-128)/12),Wt=(t,e,n)=>{let r,o,i,s,a,l,c=Xt[t.i[0]],u=t.i[1],f=t.i[3]/32,d=Xt[t.i[4]],p=t.i[5],h=t.i[8]/32,m=t.i[9],g=t.i[10]*t.i[10]*4,$=t.i[11]*t.i[11]*4,y=t.i[12]*t.i[12]*4,b=1/y,w=-t.i[13]/16,E=t.i[14],x=n*2**(2-t.i[15]),v=new Int32Array(g+$+y),k=0,M=0;for(r=0,o=0;g+$+y>r;r++,o++)0>o||(E=E>>8|(255&E)<<4,o-=x,a=Kt(e+(15&E)+t.i[2]-128),l=Kt(e+(15&E)+t.i[6]-128)*(1+8e-4*t.i[7])),i=1,g>r?i=r/g:g+$>r||(i=(r-g-$)*b,i=(1-i)*3**(w*i)),k+=a*i**f,s=c(k)*u,M+=l*i**h,s+=d(M)*p,m&&(s+=(2*Math.random()-1)*m),v[r]=80*s*i|0;return v},Xt=[Zt,t=>.5>t%1?1:-1,t=>t%1*2-1,t=>{let e=t%1*4;return 2>e?e-1:3-e}],Qt=()=>{let t,e,n=0,r=44+2*Gt-8,o=r-36,i=new Uint8Array(44+2*Gt);for(i.set([82,73,70,70,255&r,r>>8&255,r>>16&255,r>>24&255,87,65,86,69,102,109,116,32,16,0,0,0,1,0,2,0,68,172,0,0,16,177,2,0,4,0,16,0,100,97,116,97,255&o,o>>8&255,o>>16&255,o>>24&255]),t=44;Gt>n;++n)e=Vt[n],e=-32767>e?-32767:e>32767?32767:e,i[t++]=255&e,i[t++]=e>>8&255;return i};function Jt(e){let n,r,o,i,s,a,l,h,g,$,y,b,w,E,x;return r=new z({}),i=new pt({}),a=new Dt({}),h=new xt({}),$=new Mt({}),b=new mt({}),{c(){n=d("a-scene"),I(r.$$.fragment),o=p(),I(i.$$.fragment),s=p(),I(a.$$.fragment),l=p(),I(h.$$.fragment),g=p(),I($.$$.fragment),y=p(),I(b.$$.fragment),w=p(),E=d("audio"),m(n,"id","a"),m(n,"scene",""),m(n,"fog",e[1]),m(n,"renderer",te),m(n,"vr-mode-ui","enterVRButton:#c;"),m(n,"class","a"),E.loop=1},m(t,f){u(t,n,f),O(r,n,null),c(n,o),O(i,n,null),c(n,s),O(a,n,null),c(n,l),O(h,n,null),c(n,g),O($,n,null),u(t,y,f),O(b,t,f),u(t,w,f),u(t,E,f),e[2](E),x=1},p:t,i(t){x||(_(r.$$.fragment,t),_(i.$$.fragment,t),_(a.$$.fragment,t),_(h.$$.fragment,t),_($.$$.fragment,t),_(b.$$.fragment,t),x=1)},o(t){L(r.$$.fragment,t),L(i.$$.fragment,t),L(a.$$.fragment,t),L(h.$$.fragment,t),L($.$$.fragment,t),L(b.$$.fragment,t),x=0},d(t){t&&f(n),j(r),j(i),j(a),j(h),j($),t&&f(y),j(b,t),t&&f(w),t&&f(E),e[2](null)}}}let te="antialias:true;highRefreshRate:true;foveationLevel:3;alpha:false;";function ee(t,e,n){var r;let o;qt=r=Yt,zt=r.endPattern,Ut=0,Gt=r.rowLen*r.patternLen*(zt+1)*2,Vt=new Int32Array(Gt);let i=setInterval((()=>{1>(()=>{let t,e,n,r,o,i,s,a,l,c,u,f,d,p,h=new Int32Array(Gt),m=qt.songData[Ut],g=qt.rowLen,$=qt.patternLen,y=0,b=0,w=0,E=[];for(n=0;zt>=n;++n)for(s=m.p[n],r=0;$>r;++r){let x=s?m.c[s-1].f[r]:0;x&&(m.i[x-1]=m.c[s-1].f[r+$]||0,17>x&&(E=[]));let v=Xt[m.i[16]],k=m.i[17]/512,M=2**(m.i[18]-9)/g,T=m.i[19],A=m.i[20],R=135.82764118168*m.i[21]/44100,S=1-m.i[22]/255,_=1e-5*m.i[23],L=m.i[24]/32,H=m.i[25]/512,I=6.283184*2**(m.i[26]-9)/g,O=m.i[27]/255,j=m.i[28]*g&-2;for(u=(n*$+r)*g,o=0;4>o;++o)if(i=s?m.c[s-1].n[r+o*$]:0,i){E[i]||(E[i]=Wt(m,i,g));let n=E[i];for(e=0,t=2*u;e<n.length;e++,t+=2)h[t]+=n[e]}for(e=0;g>e;e++)a=2*(u+e),c=h[a],c||w?(f=R,T&&(f*=v(M*a)*k+.5),f=1.5*Math.sin(f),y+=f*b,d=S*(c-b)-y,b+=f*d,c=3==A?b:1==A?d:y,_&&(c*=_,c=1>c?c>-1?Zt(.25*c):-1:1,c/=_),c*=L,w=c*c>1e-5,l=Math.sin(I*a)*H+.5,p=c*(1-l),c*=l):p=0,j>a||(p+=h[a-j+1]*O,c+=h[a-j]*O),h[a]=0|p,h[a+1]=0|c,Vt[a]+=0|p,Vt[a+1]+=0|c}return Ut++,Ut/qt.numChannels})()||(n(0,o.src=URL.createObjectURL(new Blob([Qt()],{type:"audio/wav"})),o),clearInterval(i))}));return onclick=()=>o.play(),[o,"type:linear;color:#000;far:150;near:0",t=>{b[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}new class extends P{constructor(t){super(),C(this,t,ee,Jt,i,{})}}({target:document.body});