(this.webpackJsonpwebsite=this.webpackJsonpwebsite||[]).push([[0],{183:function(e,t,n){e.exports=n(558)},188:function(e,t,n){},189:function(e,t,n){},190:function(e,t,n){},558:function(e,t,n){"use strict";n.r(t);var r=n(3),l=n.n(r),a=n(181),c=n.n(a),o=(n(188),n(61)),s=(n(189),n(190),["scrollTop","scrollHeight","offsetTop"]);function u(e){var t=e.dark,n=e.children,l=Object(r.useState)(0),a=l[0],c=l[1],o=Object(r.useRef)(null),u=Object(r.useRef)(null),i=Object(r.useRef)(null),m=Object(r.useRef)(null),d=Object(r.useRef)(!1),f=Object(r.useRef)(0),v=Object(r.useRef)(0),b=Object(r.useRef)(1);return Object(r.useEffect)((function(){var e={},t=function(e){e.preventDefault();var t=i.current;null!=t&&(d.current=!0,v.current=e.clientY,f.current=t.scrollTop);var n=o.current;null!=n&&(n.dataset.moving=!0)},n=function(){if(d.current){d.current=!1;var e=o.current;null!=e&&delete e.dataset.moving}},r=function(e){if(d.current){var t=i.current;null!=t&&(t.scrollTop=f.current+(e.clientY-v.current)/b.current)}},l=m.current;return function t(){var n=o.current,r=i.current,l=m.current;if(null!=r){var a={};a.scrollTop=r.scrollTop,a.scrollHeight=r.scrollHeight,a.offsetHeight=r.offsetHeight,s.some((function(t){return a[t]!==e[t]}))&&(null!=u.current&&clearTimeout(u.current),null!=n&&(n.dataset.scrolling=!0),u.current=setTimeout((function(){var e=o.current;null!=e&&delete e.dataset.scrolling}),100),e=a);var c=a.scrollHeight,d=100*a.scrollTop/c,f=a.offsetHeight/c;b.current=f,null!=l&&(l.style.transform="translateY("+d+"%) scaleY("+f+")",Array.from(l.children).forEach((function(e){return e.style.transform="scaleY("+1/f+")"}))),null!=n&&(f<1?delete n.dataset.hidden:n.dataset.hidden=!0)}requestAnimationFrame(t)}(),window.addEventListener("mouseup",n),window.addEventListener("mousemove",r),l.addEventListener("mousedown",t),function(){window.cancelAnimationFrame(null),window.removeEventListener("mouseup",n),window.removeEventListener("mousemove",r),l.removeEventListener("mousedown",t)}}),[]),Object(r.useLayoutEffect)((function(){var e=i.current;if(null!=e){var t=e.offsetWidth-e.clientWidth;c((function(e){return t}))}}),[]),Object(r.createElement)("div",{className:"scroll-y "+(t?"dark":""),ref:o},Object(r.createElement)("div",{ref:i,className:"scroll-y__scrollbar-hider",style:{right:-40,paddingRight:40-a}},n),Object(r.createElement)("div",{className:"scroll-y__scrollbar-container"},Object(r.createElement)("div",{ref:m,className:"scroll-y__scrollbar"},Object(r.createElement)("div",{className:"scroll-y__scrollbar__top"}),Object(r.createElement)("div",{className:"scroll-y__scrollbar__bottom"}))))}var i=n(182);function m(e){var t=e.count;return l.a.createElement(l.a.Fragment,null,new Array(t).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.").map((function(e,t){return l.a.createElement("p",{key:t},e)})))}function d(e){var t=e.children;return l.a.createElement("div",{className:"nativeScroll"},t)}var f=function(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=Object(r.useState)(e),n=Object(o.a)(t,2),l=n[0],a=n[1];return Object(r.useLayoutEffect)((function(){l?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}),[l]),[l,function(){return a((function(e){return!e}))}]}(!0),t=Object(o.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(!0),s=Object(o.a)(c,2),f=s[0],v=s[1],b=Object(r.useState)(!1),E=Object(o.a)(b,2),h=E[0],p=E[1],g=Object(r.useState)(5),O=Object(o.a)(g,2),j=O[0],w=O[1],y=f?d:u;return l.a.createElement("div",{className:"App"},l.a.createElement("h1",null,"@clustree/scroll"),l.a.createElement("div",{className:"main"},l.a.createElement("div",null,l.a.createElement("p",null,l.a.createElement("code",null,"<ScrollY />")," is a custom scrollbar with a transparent track."),l.a.createElement("p",null,"It takes one boolean prop: ",l.a.createElement("code",null,"dark")," that determines if the scrollbar thumb is dark or light."),l.a.createElement("p",null,"This allows one to have consistent scrollbar styling across many browsers and OSes, including Internet Explorer 11."),l.a.createElement("button",{type:"button",onClick:a},"Toggle Dark mode")),l.a.createElement("div",null,l.a.createElement("h3",null,"Demo:"),l.a.createElement("h4",null,f?"Using native scrollbars":"Using <ScrollY />"," ",l.a.createElement("button",{type:"button",onClick:function(){return v((function(e){return!e}))}},f?"Use <ScrollY />":"Use native scrollbars"," ")),l.a.createElement("label",null,"Number of paragraphs:"," ",l.a.createElement("input",{type:"range",min:"1",max:"10",value:j,onChange:function(e){return w(i.Number.parseInt(e.target.value,10))}})," ".concat(j)),l.a.createElement("div",{className:"demo"},l.a.createElement(y,{dark:!n},l.a.createElement("div",{className:"inner"},l.a.createElement(m,{count:j}),l.a.createElement("div",{className:"relative"},l.a.createElement("button",{onClick:function(){return p((function(e){return!e}))}},"Toggle absolutely positionned content"),h?l.a.createElement("div",{className:"absolute"},"Absolute content that overflows affects total height for the scrollbar"):null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[183,1,2]]]);
//# sourceMappingURL=main.6020491c.chunk.js.map