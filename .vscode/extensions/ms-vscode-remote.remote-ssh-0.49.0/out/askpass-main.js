!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=1135)}({11:function(e,r){e.exports=require("fs")},1135:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const n=t(16),o=t(11);function s(e){console.error(`Failed to get SSH credentials: ${e}`),console.error(JSON.stringify(process.argv)),process.exit(1)}!function(e){if(!process.env.VSCODE_SSH_ASKPASS_HANDLE)return s("Missing handle");if(!process.env.VSCODE_SSH_ASKPASS_RESULT)return s("Missing output file");const r=process.env.VSCODE_SSH_ASKPASS_RESULT,t=process.env.VSCODE_SSH_ASKPASS_HANDLE,i=e.slice(2).join(" "),u={socketPath:t,path:"/",method:"POST"},c=n.request(u,e=>{if(200!==e.statusCode)return s(`Bad status code: ${e.statusCode}`);const t=[];e.setEncoding("utf8"),e.on("data",e=>t.push(e)),e.on("end",()=>{const e=t.join("");let n;try{n=JSON.parse(e)}catch(e){return s("Error parsing response:"+e.message)}n.canceled?process.exit(1):o.writeFileSync(r,n.response+"\n"),setTimeout(()=>process.exit(0),0)})});c.on("error",e=>s("Error in request: "+e.message)),c.write(JSON.stringify({request:i})),c.end()}(process.argv)},16:function(e,r){e.exports=require("http")}}));
//# sourceMappingURL=askpass-main.js.map