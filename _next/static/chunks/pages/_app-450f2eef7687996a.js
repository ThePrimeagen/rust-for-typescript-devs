(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{1118:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(9603)}])},1210:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1};("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8418:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;n(5753).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(2648).Z,i=n(7273).Z,a=o(n(7294)),s=n(6273),c=n(2725),l=n(3462),u=n(1018),f=n(7190),d=n(1210),p=n(8684),h={};function v(e,t,n,r){if(e&&s.isLocalURL(t)){Promise.resolve(e.prefetch(t,n,r)).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;h[t+"%"+n+(o?"%"+o:"")]=!0}}var x=a.default.forwardRef((function(e,t){var n,o=e.href,x=e.as,m=e.children,g=e.prefetch,j=e.passHref,y=e.replace,b=e.shallow,w=e.scroll,_=e.locale,C=e.onClick,k=e.onMouseEnter,M=e.onTouchStart,P=e.legacyBehavior,O=void 0===P?!0!==Boolean(!1):P,N=i(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter","onTouchStart","legacyBehavior"]);n=m,!O||"string"!==typeof n&&"number"!==typeof n||(n=a.default.createElement("a",null,n));var L=!1!==g,R=a.default.useContext(l.RouterContext),E=a.default.useContext(u.AppRouterContext);E&&(R=E);var T,S=a.default.useMemo((function(){var e=r(s.resolveHref(R,o,!0),2),t=e[0],n=e[1];return{href:t,as:x?s.resolveHref(R,x):n||t}}),[R,o,x]),A=S.href,z=S.as,B=a.default.useRef(A),U=a.default.useRef(z);O&&(T=a.default.Children.only(n));var Z=O?T&&"object"===typeof T&&T.ref:t,D=r(f.useIntersection({rootMargin:"200px"}),3),I=D[0],G=D[1],H=D[2],K=a.default.useCallback((function(e){U.current===z&&B.current===A||(H(),U.current=z,B.current=A),I(e),Z&&("function"===typeof Z?Z(e):"object"===typeof Z&&(Z.current=e))}),[z,Z,A,H,I]);a.default.useEffect((function(){var e=G&&L&&s.isLocalURL(A),t="undefined"!==typeof _?_:R&&R.locale,n=h[A+"%"+z+(t?"%"+t:"")];e&&!n&&v(R,A,z,{locale:t})}),[z,A,G,_,L,R]);var X={ref:K,onClick:function(e){O||"function"!==typeof C||C(e),O&&T.props&&"function"===typeof T.props.onClick&&T.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,i,c,l,u,f){if("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&s.isLocalURL(n)){e.preventDefault();var d=function(){"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:i,locale:l,scroll:c}):t[o?"replace":"push"](n,{forceOptimisticNavigation:!f})};u?a.default.startTransition(d):d()}}(e,R,A,z,y,b,w,_,Boolean(E),L)},onMouseEnter:function(e){O||"function"!==typeof k||k(e),O&&T.props&&"function"===typeof T.props.onMouseEnter&&T.props.onMouseEnter(e),!L&&E||s.isLocalURL(A)&&v(R,A,z,{priority:!0})},onTouchStart:function(e){O||"function"!==typeof M||M(e),O&&T.props&&"function"===typeof T.props.onTouchStart&&T.props.onTouchStart(e),!L&&E||s.isLocalURL(A)&&v(R,A,z,{priority:!0})}};if(!O||j||"a"===T.type&&!("href"in T.props)){var F="undefined"!==typeof _?_:R&&R.locale,q=R&&R.isLocaleDomain&&d.getDomainLocale(z,F,R.locales,R.domainLocales);X.href=q||p.addBasePath(c.addLocale(z,F,R&&R.defaultLocale))}return O?a.default.cloneElement(T,X):a.default.createElement("a",Object.assign({},N,X),n)}));t.default=x,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7190:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,l=e.disabled||!a,u=r(o.useState(!1),2),f=u[0],d=u[1],p=r(o.useState(null),2),h=p[0],v=p[1];o.useEffect((function(){if(a){if(l||f)return;if(h&&h.tagName){var e=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=c.find((function(e){return e.root===n.root&&e.margin===n.margin}));if(r&&(t=s.get(r)))return t;var o=new Map,i=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return t={id:n,observer:i,elements:o},c.push(n),s.set(n,t),t}(n),o=r.id,i=r.observer,a=r.elements;return a.set(e,t),i.observe(e),function(){if(a.delete(e),i.unobserve(e),0===a.size){i.disconnect(),s.delete(o);var t=c.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));t>-1&&c.splice(t,1)}}}(h,(function(e){return e&&d(e)}),{root:null==t?void 0:t.current,rootMargin:n});return e}}else if(!f){var r=i.requestIdleCallback((function(){return d(!0)}));return function(){return i.cancelIdleCallback(r)}}}),[h,l,n,t,f]);var x=o.useCallback((function(){d(!1)}),[]);return[v,f,x]};var o=n(7294),i=n(9311),a="function"===typeof IntersectionObserver,s=new Map,c=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1018:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TemplateContext=t.GlobalLayoutRouterContext=t.LayoutRouterContext=t.AppRouterContext=void 0;var r=(0,n(2648).Z)(n(7294)),o=r.default.createContext(null);t.AppRouterContext=o;var i=r.default.createContext(null);t.LayoutRouterContext=i;var a=r.default.createContext(null);t.GlobalLayoutRouterContext=a;var s=r.default.createContext(null);t.TemplateContext=s},7995:function(){},5093:function(){},5619:function(){},6653:function(){},1160:function(){},9008:function(e,t,n){e.exports=n(5443)},1664:function(e,t,n){e.exports=n(8418)},3406:function(e,t,n){"use strict";n.d(t,{_y:function(){return i},zt:function(){return o}});var r=(0,n(7294).createContext)([{},function(){}]),o=r.Provider,i=(r.Consumer,r)},2599:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=JSON.parse('{"author":{"name":"ThePrimeagen","company":"ThePrimeagen"},"title":"Rust For Typescript Devs","subtitle":"for Frontend Masters","frontendMastersLink":"https://frontendmasters.com/courses/rust-ts-devs/","social":{"twitch":"theprimeagen","github":"theprimeagen","twitter":"theprimeagen"},"description":"The greatest course you will ever take on Rust for a TypeScript Developer.","keywords":["Rust","Rustlang","Typescript","JavaScript"],"productionBaseUrl":"/rust-for-typescript-devs","csvPath":"./out/lessons.csv"}'),o={author:{name:"An Author",company:"An Author's Company"},title:"A Superb Course",subtitle:"That Teaches Nice Things",frontendMastersLink:"",description:"A nice course for nice people.",keywords:["a nice course","for people","to learn","nice things"],social:{twitch:"theprimeagen",github:"theprimeagen",twitter:"theprimeagen"},productionBaseUrl:"/"};function i(){return Object.assign({},o,r)}},9603:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),o.forEach((function(t){r(e,t,n[t])}))}return e}n.r(t),n.d(t,{default:function(){return b}});var i=n(5893),a=n(9008),s=(n(7995),n(5093),n(1160),n(6653),n(5619),n(7294));function c(){return(0,i.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"32",height:"32",viewBox:"0 0 32 32",children:[(0,i.jsx)("defs",{children:(0,i.jsx)("clipPath",{id:"clip-github-social",children:(0,i.jsx)("rect",{width:"32",height:"32"})})}),(0,i.jsx)("g",{id:"github-social",clipPath:"url(#clip-github-social)",children:(0,i.jsxs)("g",{id:"Group_272","data-name":"Group 272",transform:"translate(13522.5 -6994)",children:[(0,i.jsx)("path",{id:"Subtraction_33","data-name":"Subtraction 33",d:"M-24967.5,8041a15.9,15.9,0,0,1-11.312-4.688A15.893,15.893,0,0,1-24983.5,8025a15.893,15.893,0,0,1,4.689-11.315A15.894,15.894,0,0,1-24967.5,8009a15.894,15.894,0,0,1,11.313,4.686A15.893,15.893,0,0,1-24951.5,8025a15.893,15.893,0,0,1-4.689,11.313A15.9,15.9,0,0,1-24967.5,8041Zm-3.781-4.571h0v3.918h7.895v-6.665a1.836,1.836,0,0,0-1.2-1.718c5.1-.617,7.467-2.975,7.467-7.424a7.176,7.176,0,0,0-1.637-4.728,6.74,6.74,0,0,0,.275-1.812,4.34,4.34,0,0,0-.52-2.452.574.574,0,0,0-.359-.1c-1.061,0-3.465,1.411-3.936,1.694a16.644,16.644,0,0,0-4.2-.489,16.379,16.379,0,0,0-3.969.445c-.846-.5-2.91-1.649-3.859-1.649a.566.566,0,0,0-.354.095,4.3,4.3,0,0,0-.521,2.452,6.7,6.7,0,0,0,.244,1.718,7.346,7.346,0,0,0-1.6,4.822,7.263,7.263,0,0,0,1.533,4.985c1.193,1.359,3.115,2.165,5.871,2.464a1.826,1.826,0,0,0-1.129,1.693v.5h0l-.006,0a7.121,7.121,0,0,1-2.033.363,2.608,2.608,0,0,1-.965-.158,4.438,4.438,0,0,1-1.836-1.881,2.361,2.361,0,0,0-1.248-1.091,3.472,3.472,0,0,0-1.217-.3.584.584,0,0,0-.545.224.282.282,0,0,0,.027.367,1.875,1.875,0,0,0,.447.307,4.732,4.732,0,0,1,.561.355,10.726,10.726,0,0,1,1.682,2.755c.043.092.078.163.105.217a3.876,3.876,0,0,0,2.42,1.185,6.036,6.036,0,0,0,.607.025c.875,0,1.988-.124,2-.125Z",transform:"translate(11461 -1015)",fill:"var(--footer-icons)"}),(0,i.jsxs)("g",{id:"Ellipse_670","data-name":"Ellipse 670",transform:"translate(-13522.5 6994)",fill:"none",stroke:"var(--footer-icons)",strokeWidth:"1",children:[(0,i.jsx)("circle",{cx:"16",cy:"16",r:"16",stroke:"none"}),(0,i.jsx)("circle",{cx:"16",cy:"16",r:"15.5",fill:"none"})]})]})})]})}function l(){return(0,i.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"40",height:"32",viewBox:"0 0 40 32",children:[(0,i.jsx)("defs",{children:(0,i.jsx)("clipPath",{id:"clip-twitter-social",children:(0,i.jsx)("rect",{width:"40",height:"32"})})}),(0,i.jsx)("g",{id:"twitter-social",clipPath:"url(#clip-twitter-social)",children:(0,i.jsx)("g",{id:"Group_269","data-name":"Group 269",transform:"translate(-230.23 -1140.849)",children:(0,i.jsx)("path",{id:"Path_419","data-name":"Path 419",d:"M266.12,1148.861v1.035a23.092,23.092,0,0,1-1.507,8.1,24.08,24.08,0,0,1-4.475,7.381,22.175,22.175,0,0,1-7.306,5.4,24.129,24.129,0,0,1-10,2.07,23.7,23.7,0,0,1-6.667-.945,22.83,22.83,0,0,1-5.936-2.655q.959.091,1.963.09a16.518,16.518,0,0,0,5.434-.9,17.111,17.111,0,0,0,4.749-2.52,8.275,8.275,0,0,1-4.749-1.643,7.8,7.8,0,0,1-2.877-3.983,8.268,8.268,0,0,0,1.507.135,8.58,8.58,0,0,0,2.146-.27,8.16,8.16,0,0,1-5.685-4.344,8.326,8.326,0,0,1-.89-3.578v-.135a7.775,7.775,0,0,0,3.744,1.035,8.183,8.183,0,0,1-2.671-2.9,7.817,7.817,0,0,1-.982-3.848,7.948,7.948,0,0,1,1.1-4.05,23.53,23.53,0,0,0,16.895,8.46,9.221,9.221,0,0,1-.183-1.845,7.787,7.787,0,0,1,1.1-4.05,8.216,8.216,0,0,1,2.991-2.948,7.991,7.991,0,0,1,4.087-1.1,8.184,8.184,0,0,1,5.982,2.566,16.087,16.087,0,0,0,5.205-1.98,7.784,7.784,0,0,1-1.393,2.588,8.4,8.4,0,0,1-2.215,1.913,16.856,16.856,0,0,0,4.749-1.305A17.032,17.032,0,0,1,266.12,1148.861Z",fill:"var(--footer-icons)"})})})]})}function u(){return(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"45",height:"45",viewBox:"0 0 45 45",children:(0,i.jsx)("path",{d:"M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.245l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z",fillRule:"evenodd",clipRule:"evenodd"})})}function f(e){var t=e.twitter,n=e.twitch,r=e.github;return(0,i.jsx)("footer",{className:"footer",children:(0,i.jsxs)("ul",{className:"socials",children:[t?(0,i.jsx)("li",{className:"social",children:(0,i.jsx)("a",{href:"https://twitter.com/".concat(t),children:(0,i.jsx)(l,{})})}):null,r?(0,i.jsx)("li",{className:"social",children:(0,i.jsx)("a",{href:"https://github.com/".concat(r),children:(0,i.jsx)(c,{})})}):null,n?(0,i.jsx)("li",{className:"social",children:(0,i.jsx)("a",{href:"https://twitch.tv/".concat(n),children:(0,i.jsx)(u,{})})}):null,(0,i.jsx)("li",{className:"social",children:(0,i.jsxs)("div",{className:"terms",children:[(0,i.jsx)("p",{children:"Content Licensed Under CC-BY-NC-4.0"}),(0,i.jsx)("p",{children:"Code Samples and Excercises Licensed Under Apache 2.0"}),(0,i.jsxs)("p",{children:["Site Designed by"," ",(0,i.jsx)("a",{href:"https://www.alexdanielson.com/",children:"Alex Danielson"})]})]})})]})})}var d=n(1664),p=n(3406),h=(0,s.createContext)([{},function(){}]),v=h.Provider,x=(h.Consumer,h);function m(e){var t=(0,s.useContext)(p._y)[0],n=t.section,r=t.title,o=t.icon,a=(0,s.useContext)(x).frontendMastersLink;return(0,i.jsxs)("header",{className:"navbar",children:[(0,i.jsx)("h1",{className:"navbar-brand",children:(0,i.jsx)(d,{href:"/",children:e.title})}),(0,i.jsxs)("div",{className:"navbar-info",children:[a?(0,i.jsx)("a",{href:a,className:"cta-btn",children:"Watch on Frontend Masters"}):null,n?(0,i.jsxs)("h2",{children:[n," ",(0,i.jsx)("i",{className:"fas fa-".concat(o)})," ",r]}):null]})]})}var g=n(2599);function j(e){var t=e.children,n=(0,g.Z)(),r=(0,s.useState)({});return(0,i.jsx)(v,{value:n,children:(0,i.jsx)(p.zt,{value:r,children:(0,i.jsxs)("div",{className:"remix-app",children:[(0,i.jsx)(m,{title:n.title}),(0,i.jsx)("div",{className:"content-container",children:(0,i.jsx)("div",{className:"main",children:t})}),(0,i.jsx)(f,{twitter:n.social.twitter,github:n.social.github,twitch:n.social.twitch})]})})})}function y(e){var t=e.children;return(0,i.jsx)(j,{children:t})}function b(e){var t=e.Component,n=e.pageProps;return(0,i.jsxs)(y,{children:[(0,i.jsxs)(a,{children:[(0,i.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"".concat("/rust-for-typescript-devs","/images/apple-touch-icon.png")}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"".concat("/rust-for-typescript-devs","/images/favicon-32x32.png")}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"".concat("/rust-for-typescript-devs","/images/favicon-16x16.png")}),(0,i.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"".concat("/rust-for-typescript-devs","/images/favicon-16x16.png")}),(0,i.jsx)("link",{rel:"icon",type:"image/x-icon",href:"".concat("/rust-for-typescript-devs","/images/favicon.ico")})]}),(0,i.jsx)(t,o({},n))]})}}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[774,179],(function(){return t(1118),t(387)}));var n=e.O();_N_E=n}]);