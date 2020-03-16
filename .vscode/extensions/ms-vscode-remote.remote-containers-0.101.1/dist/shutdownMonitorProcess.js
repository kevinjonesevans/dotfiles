!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=467)}({1:function(e,t){e.exports=require("path")},10:function(e,t){e.exports=require("http")},14:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(17),o=n(7),s=n(3),i=n(1);var c;!function(e){e[e.Trace=1]="Trace",e[e.Debug=2]="Debug",e[e.Info=3]="Info",e[e.Warning=4]="Warning",e[e.Error=5]="Error",e[e.Critical=6]="Critical",e[e.Off=7]="Off"}(c=t.LogLevel||(t.LogLevel={})),t.terminalEscapeSequences=/(\x9B|\x1B\[)[0-?]*[ -\/]*[@-~]/g,t.createLog=function(e,n,r){const f=Date.now(),l=[];let p=!1;function g(c){!function e(t){if(t&&l.push(t),!p&&l.length){p=!0;const t=l.join("");l.length=0,s.appendFile(r,t,n=>{n&&("ENOENT"===n.code?s.mkdir(i.dirname(r),n=>{n?(p=!1,console.error(n)):s.appendFile(r,t,t=>{p=!1,t&&console.error(t),e()})}):(p=!1,console.error(n))),p=!1,e()})}}(`[${(new Date).toISOString()}] [PID ${process.pid}] ${c.replace(t.terminalEscapeSequences,"").replace(/(\r?\n)?$/,o.EOL)}`),e(n?c.replace(/\r?\n/g,"\r\n").replace(/(\r?\n)?$/,"\r\n"):c.replace(/(\r?\n)?$/,""))}let m=c.Info;return{write(e){c.Critical>=m&&g(`[${Date.now()-f} ms] ${e}`)},start(e){const t=Date.now();return c.Debug>=m?g(`${d(u,`[${t-f} ms] Start`)}: ${e}`):c.Critical>=m&&g(`[${t-f} ms] Start: ${e}`),t},stop(e,t){if(c.Debug>=m){const n=Date.now();g(`${d(a,`[${n-f} ms] Stop`)} (${n-t} ms): ${e}`)}},setLogLevel(e){m=e},logFilePath:r}};const a="31",u="32";function d(e,t){return t.split("\n").map(t=>`[1m[${e}m${t}[39m[22m`).join("\n")}async function f(e){const{stdout:t}=await e.exec("for pid in `cd /proc && ls -d [0-9]*`; do { echo $pid ; readlink -f /proc/$pid/cwd ; xargs -0 < /proc/$pid/environ ; xargs -0 < /proc/$pid/cmdline ; } ; echo ; done 2>/dev/null",{logOutput:!1});return t.split("\n\n").map(e=>e.split("\n")).filter(e=>e.length>=4).map(e=>({pid:e[0],cwd:e[1],cmd:e[3],env:e[2].split(" ").reduce((e,t)=>{const n=t.indexOf("=");return-1!==n&&(e[t.substr(0,n)]=t.substr(n+1)),e},{})}))}async function l(e,t,n){if("win32"!==process.platform)return e;if(i.isAbsolute(e))return e;if("."!==i.dirname(e))return i.join(t,e);let r=void 0;if(n)for(let e of Object.keys(n))if("path"===e.toLowerCase()){const t=n[e];"string"==typeof t&&(r=t.split(i.delimiter));break}if(void 0===r||0===r.length)return i.join(t,e);for(let n of r){let r;if(r=i.isAbsolute(n)?i.join(n,e):i.join(t,n,e),await p(r))return r;let o=r+".com";if(await p(o))return o;if(o=r+".exe",await p(o))return o}return i.join(t,e)}function p(e){return new Promise(t=>s.exists(e,t))}function g(e){return e.split("\n").map(e=>`[1m[31m${e}[39m[22m\r`).join("\n")+"\r\n"}t.findSessions=async function(e){return(await f(e)).filter(e=>"VSCODE_REMOTE_CONTAINERS_SESSION"in e.env).map(e=>({...e,sessionId:e.env.VSCODE_REMOTE_CONTAINERS_SESSION}))},t.findProcesses=f,t.runCommandNoPty=async function(e,t,n,o,i={}){const c=`Run: ${t} ${n.join(" ").replace(/\n.*/g,"")}`;let a;i.silent||(a=o.start(c));const u={...process.env,...i.env||{}};return t=await l(t,e,u),new Promise((d,f)=>{const l=[],p=[],m=r.spawn(t,n,{cwd:e,env:u});m.stdout.on("data",e=>{l.push(e)}),m.stderr.on("data",e=>{p.push(e)}),m.on("exit",e=>{try{const r=Buffer.concat(l),s=Buffer.concat(p);i.print&&(o.write(r.toString().replace(/\r?\n/g,"\r\n")),o.write(g(s.toString()))),i.silent||o.stop(c,a),e?f({message:`Command failed: ${t} ${n.join(" ")}`,stdout:r,stderr:s,code:e}):d({stdout:r,stderr:s})}catch(e){f(e)}}),i.stdin instanceof Buffer?m.stdin.write(i.stdin,e=>{e?f(e):m.stdin.end()}):i.stdin instanceof s.ReadStream&&i.stdin.pipe(m.stdin)})},t.findWindowsExecutable=l,t.tsnode=i.join(__dirname,"..","..","node_modules",".bin","ts-node"),t.isTsnode="ts-node"===i.basename(process.argv[0])||-1!==process.argv.indexOf("ts-node/register"),t.fork=t.isTsnode?(e,n,o)=>r.spawn(t.tsnode,[e,...n||[]],o):r.fork,t.toErrorText=g,t.delay=async function(e){return new Promise(t=>setTimeout(t,e))}},15:function(e,t){e.exports=require("crypto")},156:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1),o=n(10),s=n(7),i=n(15);t.createServer=async function(e,t){const n=function(e){if("win32"===process.platform)return`\\\\.\\pipe\\${e}-sock`;if(process.env.XDG_RUNTIME_DIR)return r.join(process.env.XDG_RUNTIME_DIR,`${e}.sock`);return r.join(s.tmpdir(),`${e}.sock`)}(`${e}-${(await async function(e){return new Promise((t,n)=>{i.randomBytes(e,(e,r)=>{e?n(e):t(r)})})}(20)).toString("hex")}`),o=new c(n,t);return o.listen(),o};class c{constructor(e,t){this.ipcHandlePath=e,this.server=o.createServer((e,n)=>{Promise.resolve(t(e,n)).catch(e=>console.error(e&&e.message||e))}),this.server.on("error",e=>console.error(e))}listen(){this.server.listen(this.ipcHandlePath)}dispose(){this.server.close()}}t.Server=c,t.readJSON=async function(e){return new Promise((t,n)=>{const r=[];e.setEncoding("utf8"),e.on("data",e=>r.push(e)),e.on("error",e=>n(e)),e.on("end",()=>{const e=JSON.parse(r.join(""));t(e)})})},t.sendData=async function(e,t){return new Promise((n,r)=>{const s={socketPath:e,path:"/",method:"POST"},i=o.request(s,e=>n(e));i.on("error",e=>r(e)),i.write(t),i.end()})};t.Queue=class{constructor(){this.messages=[]}push(e){this.messages.push(e),this.dequeueRequest&&(this.dequeueRequest.resolve(this.messages),this.dequeueRequest=void 0,this.messages=[])}async dequeue(e){if(this.messages.length){const e=this.messages;return this.messages=[],e}return this.dequeueRequest&&this.dequeueRequest.resolve([]),new Promise((t,n)=>{this.dequeueRequest={resolve:t,reject:n},"number"==typeof e&&setTimeout(n,e)})}}},17:function(e,t){e.exports=require("child_process")},3:function(e,t){e.exports=require("fs")},467:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(156),o=n(1),s=n(468),i=n(469),c=n(14),a=process.argv[2],u=process.argv[3];let d=c.LogLevel[process.argv[4]]||c.LogLevel.Info;const f=o.join(process.argv[5],"shutdownMonitor.log");const l=c.createLog((function(e){c.LogLevel.Trace>=d&&r.sendData(a,JSON.stringify({type:"trace",message:e})).catch(e=>{console.error(e)})}),!1,f);l.setLogLevel(d),l.write("Starting monitor process...");const p=Date.now();let g;async function m(e){if(l.write(`Cleaning up after ${Date.now()-p} ms...`),g)switch(g.delay&&(l.write(`Delaying for ${g.delay} ms.`),await c.delay(g.delay)),u){case"dockerCompose":await s.dockerComposeShutdown(g,l);break;case"singleContainer":await i.singleContainerShutdown(g,l);break;case"test":const{stdout:e,stderr:t}=await c.runCommandNoPty(process.cwd(),g.cmd,g.args,l,{env:g.env});l.write("Command output: "+JSON.stringify({stdout:e.toString(),stderr:t.toString()}));break;default:l.write(`Type does not exist: ${u}`)}else l.write("Not configured!");if(l.write("Done."),e)try{const e=await r.sendData(a,JSON.stringify({type:"done"})),t=await r.readJSON(e);l.write("Received reply: "+JSON.stringify(t))}catch(e){l.write("Error confirming to extension: "+(e&&(e.stack||e.message)||String(e)))}}(async()=>{let e=0;for(;;)try{const t=await r.sendData(a,JSON.stringify({type:"poll"})),n=await r.readJSON(t);l.write("Received message: "+JSON.stringify(n));for(const e of n){if("cleanup"===e.type){try{await m(!0)}catch(e){l.write("Unexpected error: "+(e&&(e.stack||e.message)||String(e)))}return}"configure"===e.type&&((g=e.options).logLevel&&(d=g.logLevel,l.setLogLevel(d)),r.sendData(a,JSON.stringify({type:"reply",sequence:e.sequence})).catch(e=>{l.write("Error confirming configuration: "+(e&&(e.stack||e.message)||String(e)))}))}e=0}catch(t){if(l.write("Error polling extension: "+(t&&(t.stack||t.message)||String(t))),t&&("ECONNREFUSED"===t.code||"ENOENT"===t.code))return void await m(!1);++e>=5&&await c.delay(1e3)}})().catch(e=>{l.write("Unexpected error: "+(e&&(e.stack||e.message)||String(e)))})},468:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(14),o=n(55);t.dockerComposeShutdown=async function(e,t){if(e.rebuild){const n=["rm","-f",e.containerId],{stdout:o,stderr:s}=await r.runCommandNoPty(process.cwd(),"docker",n,t,{env:e.env});t.write("Command output: "+JSON.stringify({stdout:o.toString(),stderr:s.toString()}))}else if(!e.shutdownAction||"stopCompose"===e.shutdownAction){const n=await o.launch(e.cwd,e.containerId,t,e.env,e.user);if(0===(await r.findSessions(n)).filter(t=>t.sessionId!==e.sessionId).length){const n=["--project-name",e.projectName];e.composeFiles.forEach(e=>n.push("-f",e)),n.push("stop","-t","0"),e.runServices&&e.runServices.length&&n.push(...e.runServices);const{stdout:o,stderr:s}=await r.runCommandNoPty(process.cwd(),"docker-compose",n,t,{env:e.env});t.write("Command output: "+JSON.stringify({stdout:o.toString(),stderr:s.toString()}))}}}},469:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(14),o=n(55);t.singleContainerShutdown=async function(e,t){if(e.rebuild){const n=["rm","-f",e.containerId],{stdout:o,stderr:s}=await r.runCommandNoPty(process.cwd(),"docker",n,t,{env:e.env});t.write("Command output: "+JSON.stringify({stdout:o.toString(),stderr:s.toString()}))}else if(!e.shutdownAction||"stopContainer"===e.shutdownAction){const n=await o.launch(e.cwd,e.containerId,t,e.env,e.user);if(0===(await r.findSessions(n)).filter(t=>t.sessionId!==e.sessionId).length){const n=["stop","-t","0",e.containerId],{stdout:o,stderr:s}=await r.runCommandNoPty(process.cwd(),"docker",n,t,{env:e.env});t.write("Command output: "+JSON.stringify({stdout:o.toString(),stderr:s.toString()}))}}}},55:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(17),o=n(14),s=n(80),i="␄";async function c(e,t=1){return new Promise(n=>{const r=new s.StringDecoder("utf8"),o=[],c=[];function a(s){!function r(s){const u=s.indexOf(i);-1!==u?(o.push(s.substr(0,u)),c.push(o.join("")),o.length=0,c.length===t?(n(c),e.off("data",a)):r(s.substr(u+1))):o.push(s)}(r.write(s))}e.on("data",a)})}t.launch=async function(e,t,n,s,a,u){s={...process.env,...s};const d=await o.findWindowsExecutable("docker",e,s),f=["exec","-i"];a&&f.push("-u",a),u&&f.push("-e",`VSCODE_REMOTE_CONTAINERS_SESSION=${u}`),f.push(t,"/bin/sh");const l=r.spawn(d,f,{cwd:e,env:s}),p=function(e){let t;const n=new Promise((e,n)=>t=n),r=[],o=[],s=e=>r.push(e),i=e=>o.push(e);return e.stdout.on("data",s),e.stderr.on("data",i),e.on("error",e=>{t(`Shell server failed: ${e&&(e.stack||e.message)}`)}),e.on("exit",(e,n)=>{t(`Shell server terminated (code: ${e}, signal: ${n})\n${Buffer.concat(r).toString()}\n${Buffer.concat(o).toString()}`)}),{unexpectedExit:n,disposeStdioListeners:()=>{e.stdout.off("data",s),e.stderr.off("data",i),r.length=0,o.length=0}}}(l);let g;return{exec:async function(e,t){const r=g=(async()=>{try{await g}catch(e){}return async function(e,t){var r;const o=`Run in container: ${e.replace(/\n.*/g,"")}`,s=n.start(o);l.stdin.write(`( ${e} ); echo -n ${i}$?${i}; echo -n ${i} >&2\n`);const a=c(l.stdout,2),u=c(l.stderr),[d,f]=await a,[p]=await u,g=parseInt(f,10)||0;!1!==(null===(r=t)||void 0===r?void 0:r.logOutput)&&(n.write(d),n.write(p),g&&n.write(`Exit code ${g}`));if(n.stop(o,s),g)throw{message:`Command in container failed: ${e}`,code:g,stdout:d,stderr:p};return{stdout:d,stderr:p}}(e,t)})();try{return await Promise.race([r,p.unexpectedExit])}finally{p.disposeStdioListeners(),g===r&&(g=void 0)}}}}},7:function(e,t){e.exports=require("os")},80:function(e,t){e.exports=require("string_decoder")}}));
//# sourceMappingURL=shutdownMonitorProcess.js.map