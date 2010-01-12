
var ENV = {"platform":"classic","mode":"production"};
var SC=SC||{BUNDLE_INFO:{},LAZY_INSTANTIATION:{}};SC.json=JSON;SC.browser=(function(){var c=navigator.userAgent.toLowerCase();
var a=(c.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];var b={version:a,safari:(/webkit/).test(c)?a:0,opera:(/opera/).test(c)?a:0,msie:(/msie/).test(c)&&!(/opera/).test(c)?a:0,mozilla:(/mozilla/).test(c)&&!(/(compatible|webkit)/).test(c)?a:0,mobileSafari:(/apple.*mobile.*safari/).test(c)?a:0,windows:!!(/(windows)/).test(c),mac:!!((/(macintosh)/).test(c)||(/(mac os x)/).test(c)),language:(navigator.language||navigator.browserLanguage).split("-",1)[0]};
b.current=b.msie?"msie":b.mozilla?"mozilla":b.safari?"safari":b.opera?"opera":"unknown";
return b})();SC.bundleDidLoad=function(a){var b=this.BUNDLE_INFO[a];if(!b){b=this.BUNDLE_INFO[a]={}
}b.loaded=true};SC.bundleIsLoaded=function(a){var b=this.BUNDLE_INFO[a];return b?!!b.loaded:false
};SC.loadBundle=function(){throw"SC.loadBundle(): SproutCore is not loaded."};SC.setupBodyClassNames=function(){var e=document.body;
if(!e){return}var c,a,f,b,g,d;c=SC.browser.current;a=SC.browser.windows?"windows":SC.browser.mac?"mac":"other-platform";
d=document.documentElement.style;f=(d.MozBoxShadow!==undefined)||(d.webkitBoxShadow!==undefined)||(d.oBoxShadow!==undefined)||(d.boxShadow!==undefined);
b=(d.MozBorderRadius!==undefined)||(d.webkitBorderRadius!==undefined)||(d.oBorderRadius!==undefined)||(d.borderRadius!==undefined);
g=e.className?e.className.split(" "):[];if(f){g.push("box-shadow")}if(b){g.push("border-rad")
}g.push(c);g.push(a);if(SC.browser.mobileSafari){g.push("mobile-safari")}e.className=g.join(" ")
};
"use modules false";"use loader false";if("undefined"===typeof tiki){var tiki=function(){var b=[];
var f={};var c={};function e(h,g){b.push({m:h,a:g})}var a={_modules:c,_factories:f,isBootstrap:true,queue:b,register:function(){e("register",arguments);
return this},script:function(){e("script",arguments);return this},stylesheet:function(){e("stylesheet",arguments);
return this},module:function(h,g){f[h]=g;e("module",arguments);return this},require:function(l){var k,i,m,g,h,j;
k=c[l];if(!k){k=c[l]={};m={id:l};i=f[l];if(typeof i!=="function"){throw (l+" is not function")
}i.call(k,a.require,k,m)}return k},destroy:function(){if(this.isDestroyed){return this
}this.isDestroyed=true;c=f=b=this.queue=null;return this}};return a}()}tiki.register("tiki",{scripts:[{url:"/static/tiki/en/0bc0db20a15cb1574e0e5deef1b477c14c43c8a3/javascript.js",id:"tiki:en/0bc0db20a15cb1574e0e5deef1b477c14c43c8a3/javascript.js"}]});
tiki.module("tiki:core",function(c,a,e){var b;"export setupDisplayNames";"use factory_format function";
var f=[];b=function b(l,h){var g=f;g[0]=h;var j,i;for(j in l){if(!l.hasOwnProperty(j)){continue
}i=l[j];if("function"===typeof i){g[1]=j;i.displayName=g.join(".")}}g.length=0;return l
};a.setupDisplayNames=b});tiki.module("tiki:lib/loader",function(require,exports,module){var core=require("tiki:core");
var promise=require("tiki:lib/promise");var sandbox=require("tiki:lib/sandbox");var Loader,create,setup;
"import core as core";"import lib/promise as promise";"import lib/sandbox as sandbox";
"export package Loader";"export create setup";"use factory_format function";var SCRIPTS="scripts",CATALOG="catalog",MODULES="modules",STYLESHEETS="stylesheets",LOADS="loads";
var MODULE_WRAPPER=["(function(require, exports, module) {",null,"\n});\n//@ sourceURL=",null,"\n"];
var TIKI_ARY=["tiki/",null];var STRING="string";var globals={};var PROMISE_NAME=[];
function promiseName(type,key){PROMISE_NAME[0]=type;PROMISE_NAME[1]=key;return PROMISE_NAME.join("::")
}var object_keys=Object.keys;if(!object_keys){object_keys=function(obj){var k,ret=[];
for(k in obj){if(obj.hasOwnProperty(k)){ret.push(k)}}return ret}}var inTikiCache={};
function inTiki(key){var ret=inTikiCache[key];if(ret){return ret}return(inTikiCache[key]="tiki/"+key)
}Loader=function Loader(id,queue,env){this.id=id;this.scripts=[];this.packages=[];
this.stylesheets=[];this.modules=[];this.sandbox=sandbox.create(id,this,env);this.register("default",{});
this.register("tiki",{});var len=queue?queue.length:0,idx,action;for(idx=0;idx<len;
idx++){action=queue[idx];this[action.m].apply(this,action.a)}this._queue=queue;return this
};Loader.prototype={scripts:null,stylesheets:null,packages:null,sandbox:null,modules:null,destroy:function(){},resolve:function resolve(moduleId,baseId){var path,len,idx,packageId,part,parts;
if(moduleId.match(/(^\.\.?\/)|(\/\.\.?\/)|(\/\.\.?\/?$)/)){if((idx=moduleId.indexOf(":"))>=0){packageId=moduleId.slice(0,idx);
moduleId=moduleId.slice(idx+1);path=[]}else{if(moduleId.match(/^\.\.?\//)){if(!baseId){throw ("base required to resolve relative: "+moduleId)
}idx=baseId.indexOf(":");packageId=baseId.slice(0,idx);baseId=baseId.slice(idx+1);
path=baseId.split("/");path.pop()}else{path=[]}}parts=moduleId.split("/");len=parts.length;
for(idx=0;idx<len;idx++){part=parts[idx];if(part===".."){if(path.length<1){throw"invalid path: "+moduleId
}path.pop()}else{if(part!=="."){path.push(part)}}}moduleId=path.join("/");if(packageId){moduleId=packageId+":"+moduleId
}}if(moduleId.indexOf(":")<0){if(baseId&&(idx=baseId.indexOf(":"))>0){packageId=baseId.slice(0,idx);
moduleId=packageId+":"+moduleId}}return moduleId},canonical:function canonical(moduleId,baseId){var ret=this.resolve(moduleId,baseId),factories=this._factories,catalog=this._catalog,packageId,idx;
if((idx=moduleId.indexOf(":"))<0){if(!catalog||(factories&&factories[ret])){return ret
}if(catalog[moduleId]){return moduleId+":package"}else{if(catalog[inTiki(moduleId)]){return inTiki(moduleId)+":package"
}}}else{packageId=moduleId.slice(0,idx);if(catalog&&!catalog[packageId]&&catalog[inTiki(packageId)]){ret=inTiki(moduleId)
}}return ret},evaluate:function evaluate(moduleText,moduleId){var ret;MODULE_WRAPPER[1]=moduleText;
MODULE_WRAPPER[3]=moduleId||"(unknown module)";ret=MODULE_WRAPPER.join("");ret=eval(ret);
MODULE_WRAPPER[1]=MODULE_WRAPPER[3]=null;return ret},load:function load(moduleId,baseId){var factories=this._factories,factory,packagePart,idx,info,tmp;
moduleId=this.canonical(moduleId,baseId);if(!this.ready(moduleId)){throw (moduleId+" is not ready")
}factory=factories[moduleId];if(factory&&(STRING===typeof factory)){factory=this.evaluate(factory,moduleId);
factories[moduleId]=factory}return factory},global:function(moduleId){var depends,info,len,idx,factories,moduleId,exports,key,packageId,ARY;
moduleId=this.canonical(moduleId);if((idx=moduleId.indexOf(":"))<0){throw"package not found: "+moduleId
}packageId=moduleId.slice(0,idx);ARY=moduleId.split(":");info=this._catalog[packageId];
if(!info){throw (packageId+" is not registered")}depends=info.depends;len=depends?depends.length:0;
if(len<=0){return this}factories=this._factories;if(!factories){return this}for(idx=0;
idx<len;idx++){packageId=depends[idx];if(globals[packageId]){continue}globals[packageId]=true;
if(!this.ready(packageId)){throw ("cannot make "+packageId+" global because it is not ready")
}moduleId=this.canonical(packageId);if(!factories[moduleId]){continue}exports=this.require(moduleId);
for(key in exports){if(!exports.hasOwnProperty(key)){continue}window[key]=exports[key]
}}},register:function(name,desc){if(name.indexOf(":")>0){return this.module(name,desc)
}var catalog=this._catalog,key;if(!catalog){catalog=this._catalog={}}catalog[name]=desc;
var info=desc?desc.packages:null;if(info){for(key in info){if(!info.hasOwnProperty(key)||catalog[key]){continue
}catalog[key]=info[key]}}if(!this._resolved(CATALOG,name)){this.packages.push(name)
}this._promiseFor(CATALOG,name).resolve(name)},script:function script(id){if(!this._resolved(SCRIPTS,id)){this.scripts.push(id)
}this._promiseFor(SCRIPTS,id).resolve(id);return this},stylesheet:function stylesheet(id){if(!this._resolved(STYLESHEETS,id)){this.stylesheets.push(id)
}this._promiseFor(STYLESHEETS,id).resolve(id);return this},module:function module(moduleId,factory){var factories=this._factories;
if(!factories){factories=this._factories={}}factories[moduleId]=factory;if(!this._resolved(MODULES,moduleId)){this.modules.push(moduleId)
}this._promiseFor(MODULES,moduleId).resolve(moduleId)},async:function(packageId){return this._async(packageId,null)
},_async:function(packageId,seen){var ret=this._promiseFor(LOADS,packageId);if(ret.status===promise.PENDING){if(this.ready(packageId)){ret.resolve()
}else{var loader=this;ret.action(function(pr){loader._promiseFor(CATALOG,packageId).then(pr,function(){loader._loadPackage(packageId,pr,seen||{});
pr.resolve()},function(reason){pr.cancel(reason)});loader._loadPackage(packageId,pr,seen||{})
}).run()}}return ret},require:function require(moduleId,packageId){return this.sandbox.require(moduleId,packageId)
},ready:function ready(moduleId){return this._ready(moduleId,null)},_ready:function(moduleId,seen){if(seen){if(seen[moduleId]){return true
}else{seen[moduleId]=true}}var idx,packageId,info,items,loc,scriptId,styleId;idx=moduleId.indexOf(":");
if(idx>=0){packageId=moduleId.slice(0,idx)}else{packageId=moduleId}if(!this._resolved(CATALOG,packageId)){return false
}info=this._catalog[packageId];items=info.depends;loc=items?items.length:0;while(--loc>=0){if(!seen){seen={}
}if(!this._ready(items[loc],seen)){return false}}items=info.stylesheets;loc=items?items.length:0;
while(--loc>=0){styleId=items[loc];if(STRING!==typeof styleId){styleId=styleId.id
}if(!this._resolved(STYLESHEETS,styleId)){return false}}items=info.scripts;loc=items?items.length:0;
while(--loc>=0){scriptId=items[loc];if(STRING!==typeof scriptId){scriptId=scriptId.id
}if(!this._resolved(SCRIPTS,scriptId)){return false}}if(moduleId!==packageId){if(!this._resolved(MODULES,moduleId)){return false
}}return true},main:function(moduleId,method){var r=this.require("system").ready;
if(!r){throw ("cannot register main because system.ready does not exist")}r.main(this,function(){this.async(moduleId).then(this,function(){this.require(moduleId)[method]()
})});return this},_loadScript:function(scriptId){var id,url,pr;if(STRING!==typeof(scriptId)){id=scriptId.id;
url=scriptId.url}else{id=url=scriptId}pr=this._promiseFor(SCRIPTS,id);if(pr.status===promise.PENDING){var loader=this;
pr.action(function(pr){var body=document.body,el;if(!body){promise.cancel("no document to append script")
}el=document.createElement("script");el.setAttribute("src",url);body.appendChild(el);
body=el=null})}return pr},_loadStylesheet:function(styleId){var id,url,pr;if(STRING!==typeof(styleId)){id=styleId.id;
url=styleId.url}else{id=url=styleId}pr=this._promiseFor(STYLESHEETS,id);if(pr.status===promise.PENDING){var loader=this;
pr.action(function(pr){var body=document.body,el;if(!body){pr.cancel("no document to append stylesheet")
}el=document.createElement("link");el.setAttribute("rel","stylesheet");el.setAttribute("href",url);
body.appendChild(el);body=el=null;loader.stylesheet(id)})}return pr},_loadPackage:function(packageId,pr,seen){if(seen){if(seen[packageId]){console.warn("detected cyclical reference to "+packageId+" seen="+object_keys(seen).join(", "));
return}else{seen[packageId]=true}}var info=this._catalog?this._catalog[packageId]:null,items,loc,item,ordered,next,prDepends;
if(!info){return this}items=info.depends;loc=items?items.length:0;prDepends=promise.create(promiseName("load-package",packageId));
while(--loc>=0){prDepends.depends(this._async(items[loc],seen))}pr.depends(prDepends);
prDepends.resolve();items=info.scripts;loc=items?items.length:0;next=null;ordered=info.ordered!==false;
while(--loc>=0){item=this._loadScript(items[loc]);pr.depends(item);if(ordered){if(next){item.then(next,next.run,next.cancel)
}}else{item.run()}next=item}if(next&&ordered){prDepends.then(next,next.run,next.cancel)
}items=info.stylesheets;loc=items?items.length:0;next=null;while(--loc>=0){item=this._loadStylesheet(items[loc]);
pr.depends(item);if(next){item.then(next,next.run,next.cancel)}next=item}if(next){prDepends.then(next,next.run,next.cancel)
}},_promiseFor:function(promiseType,name1,name2){var promises=this._promises,sub1,sub2,ret,Q;
if(!promises){promises=this._promises={}}sub1=promises[promiseType];if(!sub1){sub1=promises[promiseType]={}
}if(name2===undefined){sub2=sub1;name2=name1}else{sub2=sub1[name1];if(!sub2){sub2=sub1[name1]={}
}}ret=sub2[name2];if(!ret){ret=sub2[name2]=promise.create(promiseName(promiseType,name1))
}return ret},_discoveredStylesheets:false,discoverStylesheets:function(){this._discoveredStylesheets=true;
if("undefined"===typeof document){return this}var links=document.getElementsByTagName("link"),loc=links?links.length:0,link;
while(--loc>=0){link=links[loc];if(!link||(link.rel!=="stylesheet")){continue}link=link.getAttribute("loadid")||link.getAttribute("LOADID");
if(link){this.stylesheet(link.toString())}link=link.href;if(link){this.stylesheet(link.toString())
}}link=link=loc=null;return this},_resolved:function(promiseType,name1,name2){if((promiseType===STYLESHEETS)&&!this._discoveredStylesheets){this.discoverStylesheets()
}var ret=this._promises;if(ret){ret=ret[promiseType]}if(ret){ret=ret[name1]}if(ret&&name2){ret=ret[name2]
}return ret?(ret.status===promise.RESOLVED):false},_inspectLoader:function(){var lines=[],modules=this.modules,key,names,len,idx,emitted=false;
lines.push("Loader<id="+this.id+">:");if(this.packages.length>0){lines.push("  packages: "+this.packages.join(","));
lines.push("")}if(this.scripts.length>0){lines.push("  scripts:");len=this.scripts.length;
for(idx=0;idx<len;idx++){lines.push("    "+this.scripts[idx])}lines.push("")}if(this.stylesheets.length>0){lines.push("  stylesheets:");
len=this.scripts.length;for(idx=0;idx<len;idx++){lines.push("    "+this.scripts[idx])
}lines.push("")}if(this.modules.length>0){lines.push("  modules: ");len=this.modules.length;
for(idx=0;idx<len;idx++){lines.push("    "+this.modules[idx])}lines.push("")}return lines.join("\n")
},_inspectModule:function(moduleId){var lines=[],packageId=moduleId.slice(0,moduleId.indexOf(":")),tmp;
if(this._catalog&&!this._catalog[packageId]){tmp="tiki/"+packageId;if(this._catalog[tmp]){packageId=tmp;
moduleId="tiki/"+moduleId}}lines.push(moduleId+" ("+(this.ready(moduleId)?"READY":"NOT READY")+"):");
lines.push(this._inspectPackage(packageId));return lines.join("\n")},_inspectPackage:function(packageId){if(this._catalog&&!this._catalog[packageId]){var tmp="tiki/"+packageId;
if(this._catalog[tmp]){packageId=tmp}}var lines=[],info=this._catalog?this._catalog[packageId]:null,idx,len,item,parts;
lines.push(packageId+" ("+(this.ready(packageId)?"READY":"NOT READY")+"): "+(info?"":"Not in Catalog!"));
if(!info){return lines.join("\n")}len=info.depends?info.depends.length:0;if(len>0){parts=[];
for(idx=0;idx<len;idx++){item=info.depends[idx];parts.push(item+" ("+(this.ready(item)?"READY":"NOT READY")+")")
}lines.push("  depends: "+parts.join(", "))}len=info.scripts?info.scripts.length:0;
if(len>0){lines.push("\n  scripts:");for(idx=0;idx<len;idx++){item=info.scripts[idx];
if(STRING!==typeof item){item=item.id}lines.push("    "+item+" ("+(this._resolved(SCRIPTS,item)?"READY":"NOT READY")+")")
}}len=info.stylesheets?info.stylesheets.length:0;if(len>0){lines.push("\n  stylesheets:");
for(idx=0;idx<len;idx++){item=info.stylesheets[idx];if(STRING!==typeof item){item=item.id
}lines.push("    "+item+"("+(this._resolved(STYLESHEETS,item)?"READY":"NOT READY")+")")
}}return lines.join("\n")},inspect:function(id){if(arguments.length===0){return this._inspectLoader()
}else{if(id.indexOf(":")<0){return this._inspectPackage(id)}else{return this._inspectModule(id)
}}},toString:function(){return"Loader<id="+this.id+">"}};core.setupDisplayNames(Loader.prototype,"Loader");
setup=function setup(curLoader,env){if(curLoader&&!curLoader.isBootstrap){return curLoader
}if(!env){env={}}if(!env.global&&("undefined"!==typeof window)){env.global=window
}if(!env.document&&("undefined"!==typeof document)){env.document=document}var queue=curLoader?curLoader.queue:null,id=curLoader?curLoader.id:"default",ret=new Loader(id,queue,env);
if(curLoader&&curLoader.destroy){curLoader.destroy()}return ret};create=function create(id){return new Loader(id)
};exports.Loader=Loader;exports.create=create;exports.setup=setup});tiki.module("tiki:lib/promise",function(e,g,b){var f=e("tiki:core");
var j,h,c,l,m,i,a;"import core as core";"export package Promise";"export create RESOLVED PENDING CANCELLED BUSY BLOCKED";
"use factory_format function";var k=false;c="resolved";l="pending";m="cancelled";
i="busy";a="blocked";var j=function(n){this.id=n;return this};j.prototype={status:l,outstandingDependencies:0,hasAction:false,resolve:function(o){if(k){console.log(this.id+".resolve() dep="+this.outstandingDependencies+" status="+this.status)
}var n=this.status;if((n===c)||(n===m)){return this}this._value=o;if(this.outstandingDependencies>0){this.status=a
}else{this.status=c;this.value=o;this._notify(c,o)}return this},cancel:function(o){var n=this.status;
if((n===c)||(n===m)){return this}this.status=m;this.value=o;this._notify(m,o);return this
},then:function(p,n,o){var q;if(arguments.length<3&&("function"===typeof p)){o=n;
n=p;p=this}if(n){this._register(c,p,n)}if(o){this._register(m,p,o)}return this},run:function(){if(this.method&&this.status===l){this.status=i;
this.method.call(this.target||this,this)}return this},reset:function(){var n=this.status;
if((n!==i)||(n!==a)){this.status=l}this.value=null;return this},action:function(n,o){if(arguments.length===1){o=n;
n=this}this.target=n;this.method=o;this.hasAction=true;return this},depends:function(n){this.outstandingDependencies++;
if(k){console.log(this.id+".depends("+n.id+") dep="+this.outstandingDependencies+" status="+this.status)
}n.then(this,this._resolveDepends,this._cancelDepends);return this},_resolveDepends:function(o,n){this.outstandingDependencies--;
if(k){console.log("  "+this.id+"._resolveDepends("+n.id+") dep="+this.outstandingDependencies)
}if(this.outstandingDependencies<=0&&(this.status===a)){this.resolve(this.value)}return this
},_cancelDepends:function(n,o){if(k){console.log("  "+this.id+"._cancelDepends("+o.id+") dep="+this.outstandingDependencies)
}this.cancel(n);return this},_notify:function(q,o){var p=this._actions,n,r;p=p?p[q]:null;
n=p?p.length:0;this._actions=null;for(r=0;r<n;r++){this._invoke(p[r].target,p[r].method,o)
}},_invoke:function(o,p,n){if(("string"===typeof p)&&o){p=o[p]}if(!o){o=this}p.call(o,n,this)
},_register:function(n,p,s){var r=this.status,q,o;if((r===c)||(r===m)){if(r===n){this._invoke(p,s,this.value)
}}else{q=this._actions;if(!q){q=this._actions={}}o=q[n];if(!o){o=q[n]=[]}o.push({target:p,method:s})
}},toString:function(){return"Promise<id="+this.id+" status="+this.status+">"}};f.setupDisplayNames(j.prototype,"Promise");
h=function h(n){return new j(n)};g.Promise=j;g.create=h;g.RESOLVED=c;g.PENDING=l;
g.CANCELLED=m;g.BUSY=i;g.BLOCKED=a});tiki.module("tiki:lib/sandbox",function(b,a,e){var f,c;
"export package Sandbox";"export create";"use factory_format function";f=function f(g,n,l){var i={},j=[],k={},o=this;
this.id=g;this.modules=j;this.loader=n;function m(){var q=arguments.length,p;if(q>0){while(--q>0){p=arguments[q];
if(p&&i[p]){delete i[p];j.splice(j.indexOf(p),1)}}}else{i={};j.length=0}}m.displayName="Sandbox.clear";
function h(p,s,v){var w,t,q,u,x;if(s){x=p.indexOf(":");if(x>=0){p=p.slice(0,x)}p=s+":"+p
}p=n.canonical(p,v);if(exp=i[p]){return exp}j.push(p);i[p]=t={};w=function(y,z){return h(y,z,p)
};w.displayName="Sandbox.require";w.loader=n;w.clear=m;w.env=l||{};w.sandbox=this;
q={id:p};var r=n.load(p);if(!r){throw"could not load function for "+p}r.call(t,w,t,q);
return t}this.require=function(p,q){return h(p,q)};this.require.displayName="Sandbox.require"
};f.prototype={};c=function c(i,g,h){return new f(i,g,h)};a.Sandbox=f;a.create=c});
tiki.module("tiki:package",function(c,b,e){var a;a=c("tiki:lib/loader");b.Loader=a.Loader;
a=c("tiki:lib/promise");b.Promise=a.Promise;a=c("tiki:lib/sandbox");b.Sandbox=a.Sandbox
});"use modules false";"use loader false";tiki=tiki.require("tiki:lib/loader").setup(tiki,("undefined"===typeof ENV)?null:ENV);
tiki.script("tiki:en/0bc0db20a15cb1574e0e5deef1b477c14c43c8a3/javascript.js");tiki.register("tiki/platform/classic",{depends:["tiki"],packages:{tiki:{}},scripts:[{url:"/static/tiki/platform/classic/en/9f6d82903c6accdda661e6d567f7d6f7fd335392/javascript.js",id:"tiki/platform/classic:en/9f6d82903c6accdda661e6d567f7d6f7fd335392/javascript.js"}]});
tiki.module("tiki/platform/classic:lib/console",function(c,b,e){var a;"export package console";
"use factory_format function";var f=c.env;a=(f&&f.global)?f.global.console:null;b.console=a
});tiki.module("tiki/platform/classic:lib/event","var info = require('tiki/platform/classic:lib/info');var add,remove,event,ready,unload,NATIVE_EVENTS;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92006-2009 Sprout Systems, Inc. and contributors.\n//            Portions \u00a92008-2009 Apple Inc. All rights reserved.\n// License:   Licened under MIT license (see license.js)\n// ==========================================================================\n/*globals event exports add remove ready unload info NATIVE_EVENTS */\n\n\"import lib/info as info\";\n\"export add remove\";\n\"export package event ready unload NATIVE_EVENTS\";\n\n/**\n  @file\n  \n  Implements a low-level interface for registering interest in native events\n  delivered by the web browser.  If you are implementing this API for a non-\n  browser environment, add() and remove() may do nothing.\n  \n  ready() and unload() should still invoke the passed callback when the \n  JS environment is ready for the app to run and just before the app exits,\n  respectively.\n\n  ready() and unload() should both expect to be called exactly once (by the\n  system event module).  They may throw an error if called more than once.\n*/\n\n\nvar readyCalled  = false, \n    unloadCalled = false,\n    browser      = info.browser,\n    isReady      = false,\n    isUnloaded   = false,\n    ecache       = {};\n    \n\n// returns a handler function for the onready event depending on the browser.    \nfunction readyHandler(callback) {\n  var ret ;\n  \n  // opera - wait until all the stylesheets are made visible\n  if (browser.opera) {\n    ret = function() {\n      if (isReady) return;\n      \n      for (var i = 0; i < document.styleSheets.length; i++) {\n        if (document.styleSheets[i].disabled) {\n          setTimeout(ret, 0);\n          return;\n        }\n      }\n      \n      // and execute any waiting functions\n      isReady = true;\n      callback();\n    };\n    \n  // msie - wait until the doScroll event stops complaining..\n  } else if (browser.msie) {\n    ret = function() {\n      if (isReady) return;\n      try {\n        // If IE is used, use the trick by Diego Perini\n        // http://javascript.nwbox.com/IEContentLoaded/\n        document.documentElement.doScroll(\"left\");\n      } catch( error ) {\n        setTimeout(ret, 0);\n        return;\n      }\n\n      // and execute any waiting functions\n      isReady = true;\n      callback();\n    };\n    \n  // everyone else - just call\n  } else {\n    ret = function() {\n      console.log('ready!');\n      if (isReady) return ;\n      isReady = true;\n      callback();\n    };\n  }\n  \n  return ret ;\n  \n}\n\n/** \n  Invoke the  callback when the browser is ready to handle app code. \n  Throws an exception if it is called more than once.  Uses a built-in \n  listener.\n  \n  @param {Function} callback\n  @returns {void}\n*/\nready = function(callback) {\n  if (readyCalled) throw(\"Cannot call platform.ready() more than once\");\n  readyCalled = true;\n  \n  var handler = readyHandler(callback);\n  \n  // Mozilla, Opera (see further below for it) and webkit nightlies \n  // currently support this event.  Use the handy event callback\n  if (document.addEventListener) {\n    document.addEventListener( \"DOMContentLoaded\", handler, NO );\n  \n  // If IE is used and is not in a frame\n  // Continually check to see if the document is ready\n  } else if (browser.msie && (window === top)) handler();\n\n  // A fallback to window.onload, that will always work\n  add(window, 'load', handler);\n};\n\n\nfunction unloadHandler(callback) {\n  return function() {\n    if (isUnloaded) return ;\n    isUnloaded = true;\n    callback();\n  }; \n}\n\n/**\n  Invoke the callback just before the browser unloads the page.  Throws an \n  error if called more than once.\n  \n  @param {Function} callback\n  @returns {void}\n*/\nunload = function(callback) {\n  if (unloadCalled) throw(\"Cannot call platform.unload() more than once\");\n  unloadCalled = true;\n  add(window, 'unload', unloadHandler(callback));\n};\n\n// ..........................................................\n// EVENT LISTENERS\n// \n\n/**\n  Names of event types natively supported by this library.  Platforms without\n  native event support can return an empty hash.\n*/\nNATIVE_EVENTS = {};\n\n// TODO: make this correct per-browser\n// TODO: add touch events\nvar names = 'mousedown mouseup click dblclick mouseover mouseout selectstart keypress keydown keyup blur focus deactivate change select submit contextmenu dragstart error hashchange help load losecapture readystatechange resize scroll unload'.split(' '), loc = names.length;\nwhile(--loc>=0) NATIVE_EVENTS[names[loc]] = names[loc];\n\n\n// convert 'foo' => 'onfoo' using cache to avoid malloc\nfunction onStr(str) {\n    var ret = ecache[str];\n    if (!ret) ret = ecache[str] = ('on' + str); // avoid mallocs\n    return ret ;\n}\n\n/**\n  Adds a listener for the event.  No need to do any special buffering; just\n  add the listener in a platform-specific way.\n  \n  @param {Object} elem the target element if any.  otherwise use document\n  @param {String} eventType click, mousedown, etc\n  @param {Function} callback function to invoke\n  @returns {void}\n*/\nadd = function(elem, eventType, callback) {\n  if (!NATIVE_EVENTS[eventType]) return ; // ignore for native events\n  if (!elem) elem = require.env.document;\n  if (elem.addEventListener) elem.addEventListener(eventType, callback, NO);\n  else if (elem.attachEvent) elem.attachEvent(onStr(eventType), callback);      \n  else throw(\"cannot add listener to element: \" + elem);\n};\n\n/**\n  Removes a listener for the event.  No need to do any special buffering; just\n  remove the listener in a platform-specific way\n  \n  @param {Object} elem the target element if any. otherwise use document\n  @param {String} eventType click, mousedown, etc\n  @param {Function} func function to invoke\n  @returns {void}\n*/\nremove = function(elem, eventType, func) {\n  if (!NATIVE_EVENTS[eventType]) return ;\n  if (!elem) elem = require.env.document;\n  if (elem.removeEventListener) elem.removeEventListener(eventType, func, NO);\n  else if (elem.detachEvent) elem.detachEvent(onStr(eventType), func);\n  else throw(\"cannot remove listener from element: \" + elem);\n};\n\n// make this API visible as the events property on package\nevent = exports;\n;exports.add = add;\nexports.remove = remove;\nexports.event = event;\nexports.ready = ready;\nexports.unload = unload;\nexports.NATIVE_EVENTS = NATIVE_EVENTS;\n");
tiki.module("tiki/platform/classic:lib/info","var browser,userAgent,info;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals browser userAgent info exports */\n\n\"export browser userAgent\";\n\"export package info\";\n\n/**\n  @file\n\n  Export constants in this module that describe the capabilities of the target\n  platform.  The most important property you can define here is HTML\n*/\n\n\n// ..........................................................\n// BROWSER DESCRIPTION\n// \n\nuserAgent = navigator.userAgent.toLowerCase();\n\nvar version = (userAgent.match( /.+(?:rv|it|ra|ie)[\\/: ]([\\d.]+)/ ) || [])[1];\n\nbrowser = {\n  \n  /** The current browser version */\n  version: version,\n  \n  /** non-zero if webkit-based browser */\n  safari: (/webkit/).test( userAgent ) ? version : 0,\n  \n  /** non-zero if this is an opera-based browser */\n  opera: (/opera/).test( userAgent ) ? version : 0,\n  \n  /** non-zero if this is IE */\n  msie: (/msie/).test( userAgent ) && !(/opera/).test( userAgent ) ? version : 0,\n  \n  /** non-zero if this is a miozilla based browser */\n  mozilla: (/mozilla/).test( userAgent ) && !(/(compatible|webkit)/).test( userAgent ) ? version : 0,\n  \n  /** non-zero if this is mobile safari */\n  mobileSafari: (/apple.*mobile.*safari/).test(userAgent) ? version : 0,\n  \n  /** non-zero if we are on windows */\n  windows: !!(/(windows)/).test(userAgent),\n  \n  /** non-zero if we are on a mac */\n  mac: !!((/(macintosh)/).test(userAgent) || (/(mac os x)/).test(userAgent)),\n  \n  language: (navigator.language || navigator.browserLanguage).split('-', 1)[0]\n};\n\nbrowser.isOpera = !!browser.opera;\nbrowser.isIe = browser.msie;\nbrowser.isIE = browser.msie;\nbrowser.isSafari = browser.safari;\nbrowser.isMobileSafari = browser.mobileSafari;\nbrowser.isMozilla = browser.mozilla;\nbrowser.isWindows = browser.windows;\nbrowser.isMac = browser.mac;\n\n/**\n  The current browser name.  This is useful for switch statements. \n*/\nbrowser.current = \n  browser.msie ? 'msie' : \n  browser.mozilla ? 'mozilla' : \n  browser.safari ? 'safari' : \n  browser.opera ? 'opera' : 'unknown' ;\n\n\n// make this module visible as \"info\"\ninfo = exports ;\n;exports.browser = browser;\nexports.userAgent = userAgent;\nexports.info = info;\n");
tiki.module("tiki/platform/classic:lib/timer",function(b,a,c){var g,f,e,h;"export schedule repeat cancel";
"export package timer";"use factory_format function";g=function(l,m,k){var i,j;j=k?function(){m.call(k,i)
}:m;i=setTimeout(l,j);m=null;return i};f=function(l,m,k){var i,j;j=k?function(){m.call(k,i)
}:m;i=setInterval(l,j);m=null;return i};e=function(j,i){if(i===undefined){clearTimeout(j);
clearInterval(j)}else{if(i){clearInterval(j)}else{clearTimeout(j)}}};h=a;a.schedule=g;
a.repeat=f;a.cancel=e;a.timer=h});tiki.module("tiki/platform/classic:package",function(c,b,e){var a;
a=c("tiki/platform/classic:lib/console");b.console=a.console;a=c("tiki/platform/classic:lib/event");
b.event=a.event;b.ready=a.ready;b.unload=a.unload;b.NATIVE_EVENTS=a.NATIVE_EVENTS;
a=c("tiki/platform/classic:lib/info");b.info=a.info;a=c("tiki/platform/classic:lib/timer");
b.timer=a.timer});tiki.script("tiki/platform/classic:en/9f6d82903c6accdda661e6d567f7d6f7fd335392/javascript.js");
tiki.register("tiki/system",{depends:["tiki","tiki/platform/classic"],packages:{"tiki/platform/classic":{},tiki:{}},scripts:[{url:"/static/tiki/system/en/2914de37845aac6a9ada3efb6531c59f9735086e/javascript.js",id:"tiki/system:en/2914de37845aac6a9ada3efb6531c59f9735086e/javascript.js"}]});
tiki.module("tiki/system:core","var T_ERROR,T_OBJECT,T_NULL,T_CLASS,T_HASH,T_FUNCTION,T_UNDEFINED,T_NUMBER,T_BOOL,T_ARRAY,T_STRING,T_BOOLEAN,YES,NO,isArray,typeOf,A,generateGuid,guidFor,mixin,setupDisplayNames;// ==========================================================================\n// Project:   SproutCore System Package\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals T_ERROR T_OBJECT T_NULL T_CLASS T_HASH T_FUNCTION T_NUMBER T_BOOL T_ARRAY T_UNDEFINED T_STRING YES NO isArray typeOf A generateGuid guidFor */\n\n\"export T_ERROR T_OBJECT T_NULL T_CLASS T_HASH T_FUNCTION T_UNDEFINED T_NUMBER T_BOOL T_ARRAY T_STRING T_BOOLEAN\";\n\"export YES NO isArray typeOf A generateGuid guidFor mixin setupDisplayNames\";\n\n// define standard type constants\nT_ERROR     = 'error';\nT_OBJECT    = 'object';\nT_NULL      = 'null';\nT_CLASS     = 'class';\nT_HASH      = 'hash';\nT_FUNCTION  = 'function';\nT_UNDEFINED = 'undefined';\nT_NUMBER    = 'number';\nT_BOOL      = 'boolean';\nT_ARRAY     = 'array';\nT_STRING    = 'string';\nT_BOOLEAN   = 'boolean';\n\nYES         = true;\nNO          = false; \n\n/**\n  Returns true if the passed item is an array.  Works regardless of source\n  of array.\n*/\nisArray = function(obj) {\n  if (obj && obj.isArray) return true; // fast path\n  if (!obj) return false;\n  if (T_UNDEFINED !== typeof obj.length) {\n    if ((typeof obj !== T_FUNCTION) && (typeof obj !== T_STRING) && (obj.constructor !== String)) return true;\n  }\n  // TODO: add proper check that works across windows...\n  return false ;  \n};\n\nArray.prototype.isArray = true ;\n  \n/**\n  Returns a consistant type for the passed item.\n\n  Use this instead of the built-in typeOf() to get the type of an item. \n  It will return the same result across all browsers and includes a bit \n  more detail.  Here is what will be returned:\n\n  | Return Value Constant | Meaning |\n  | SC.T_STRING | String primitive |\n  | SC.T_NUMBER | Number primitive |\n  | SC.T_BOOLEAN | Boolean primitive |\n  | SC.T_NULL | Null value |\n  | SC.T_UNDEFINED | Undefined value |\n  | SC.T_FUNCTION | A function |\n  | SC.T_ARRAY | An instance of Array |\n  | SC.T_CLASS | A SproutCore class (created using SC.Object.extend()) |\n  | SC.T_OBJECT | A SproutCore object instance |\n  | SC.T_HASH | A JavaScript object not inheriting from SC.Object |\n\n  @param item {Object} the item to check\n  @returns {String} the type\n*/  \ntypeOf = function typeOf(item) {\n  if (item === undefined) return T_UNDEFINED ;\n  if (item === null) return T_NULL ; \n  \n  var ret = typeof(item) ;\n  if (ret == \"object\") {\n    if (isArray(item)) ret = T_ARRAY ;\n    else if (item instanceof Function) {\n      ret = item.isClass ? T_CLASS : T_FUNCTION ;\n    } else if ((item instanceof Error) || item.isError) ret = T_ERROR;\n    else if (item.isObject) ret = T_OBJECT ;\n    else if (item.isClass) ret = T_CLASS;\n    else if (item.constructor === Object) ret = T_HASH;\n    else if (item.constructor === Number) ret = T_NUMBER;\n    else if (item.constructor === String) ret = T_STRING;\n    else ret = T_OBJECT;\n\n  } else if (ret === T_FUNCTION) ret = item.isClass ? T_CLASS : T_FUNCTION;\n  \n  return ret ;\n};\n  \n/**\n  Converts the passed object to an Array.  If the object appears to be \n  array-like, a new array will be cloned from it.  Otherwise, a new array\n  will be created with the item itself as the only item in the array.\n  \n  @param object {Object} any enumerable or array-like object.\n  @returns {Array} Array of items\n*/\nA = function A(obj) {\n  // null or undefined -- fast path\n  if ((obj === null) || (obj === undefined)) return [] ;\n  \n  // primitive -- fast path\n  if (obj.slice instanceof Function) {\n    // do we have a string?\n    if (typeof(obj) === 'string') return [obj] ;\n    else return obj.slice() ;\n  }\n  \n  // enumerable -- fast path\n  if (obj.toArray) return obj.toArray() ;\n  \n  // if not array-like, then just wrap in array.\n  if (!isArray(obj)) return [obj];\n  \n  // when all else fails, do a manual convert...\n  var ret = [], len = obj.length;\n  while(--len >= 0) ret[len] = obj[len];\n  return ret ;\n};\n  \nvar guidKey = \"_sc_guid_\" + new Date().getTime();\nvar _nextGUID = 0, _numberGuids = [], _stringGuids = [];\n\n/**\n  Generates a new guid, optionally saving the guid to the object that you\n  pass in.  You will rarely need to use this method.  Instead you should\n  call SC.guidFor(obj), which return an existing guid if available.\n\n  @param {Object} obj the object to assign the guid to\n  @returns {String} the guid\n*/\ngenerateGuid = function generateGuid(obj) { \n  var ret = (\"sc\" + (_nextGUID++)); \n  if (obj) obj[guidKey] = ret ;\n  return ret ;\n};\n\n/**\n  Returns a unique GUID for the object.  If the object does not yet have\n  a guid, one will be assigned to it.  You can call this on any object,\n  SC.Object-based or not, but be aware that it will add a _guid property.\n\n  You can also use this method on DOM Element objects.\n\n  @param obj {Object} any object, string, number, Element, or primitive\n  @returns {String} the unique guid for this instance.\n*/\nguidFor = function guidFor(obj) {\n  \n  // special cases where we don't want to add a key to object\n  if (obj === undefined) return \"(undefined)\" ;\n  if (obj === null) return '(null)' ;\n  if (obj === Object) return '(Object)';\n  if (obj === Array) return '(Array)';\n  \n  if (obj[guidKey]) return obj[guidKey] ;\n\n  switch(typeof obj) {\n    case T_NUMBER:\n      return (_numberGuids[obj] = _numberGuids[obj] || (\"nu\" + obj));\n    case T_STRING:\n      return (_stringGuids[obj] = _stringGuids[obj] || (\"st\" + obj));\n    case T_BOOL:\n      return obj ? \"(true)\" : \"(false)\" ;\n    default:\n      return generateGuid(obj);\n  }\n};\n\n/**\n  Mixin the passed properties onto the first parameter.  This is a convenient\n  way to add properties to an object.\n  \n  @param {Hash} t the target object to mixin to\n  @param {Hash..} one or more hashes to mix in\n  @returns {Hash} the first parameter\n*/\nmixin = function mixin(t) {\n  \n  // copy reference to target object\n  var len    = arguments.length,\n      target = arguments[0] || {},\n      idx, options, key, src, copy;\n\n  for (idx=1; idx < len; idx++ ) {\n    if (!(options = arguments[idx])) continue ;\n    for(key in options) {\n      if (!options.hasOwnProperty(key)) continue ;\n\n      src  = target[key];\n      copy = options[key] ;\n      if (target===copy) continue ; // prevent never-ending loop\n      if (copy !== undefined) target[key] = copy ;\n    }\n  }\n  \n  return target;\n};\n\nvar TMP_ARY = [];\n\n/**\n  Iterate over a property, setting display names on functions as needed. \n*/\nsetupDisplayNames = function setupDisplayNames(obj, root) {\n  var a = TMP_ARY;\n  a[0] = root;\n  \n  var k,v;\n  for(k in obj) {\n    if (!obj.hasOwnProperty(k)) continue ;\n    v = obj[k];\n    if ('function' === typeof v) {\n      a[1] = k;\n      v.displayName = a.join('.');\n    }\n  }\n  \n  a.length = 0;\n  return obj;\n};;exports.T_ERROR = T_ERROR;\nexports.T_OBJECT = T_OBJECT;\nexports.T_NULL = T_NULL;\nexports.T_CLASS = T_CLASS;\nexports.T_HASH = T_HASH;\nexports.T_FUNCTION = T_FUNCTION;\nexports.T_UNDEFINED = T_UNDEFINED;\nexports.T_NUMBER = T_NUMBER;\nexports.T_BOOL = T_BOOL;\nexports.T_ARRAY = T_ARRAY;\nexports.T_STRING = T_STRING;\nexports.T_BOOLEAN = T_BOOLEAN;\nexports.YES = YES;\nexports.NO = NO;\nexports.isArray = isArray;\nexports.typeOf = typeOf;\nexports.A = A;\nexports.generateGuid = generateGuid;\nexports.guidFor = guidFor;\nexports.mixin = mixin;\nexports.setupDisplayNames = setupDisplayNames;\n");
tiki.module("tiki/system:lib/event",'var $m__ = require(\'tiki/system:core\'), T_ERROR=$m__.T_ERROR,T_OBJECT=$m__.T_OBJECT,T_NULL=$m__.T_NULL,T_CLASS=$m__.T_CLASS,T_HASH=$m__.T_HASH,T_FUNCTION=$m__.T_FUNCTION,T_UNDEFINED=$m__.T_UNDEFINED,T_NUMBER=$m__.T_NUMBER,T_BOOL=$m__.T_BOOL,T_ARRAY=$m__.T_ARRAY,T_STRING=$m__.T_STRING,T_BOOLEAN=$m__.T_BOOLEAN,YES=$m__.YES,NO=$m__.NO,isArray=$m__.isArray,typeOf=$m__.typeOf,A=$m__.A,generateGuid=$m__.generateGuid,guidFor=$m__.guidFor,mixin=$m__.mixin,setupDisplayNames=$m__.setupDisplayNames;var $m__ = require(\'tiki/system:lib/invocation\'), Invocation=$m__.Invocation;var $m__ = require(\'tiki/system:lib/platform\'), PLATFORM=$m__.PLATFORM,PLATFORM_PACKAGE=$m__.PLATFORM_PACKAGE,info=$m__.info,env=$m__.env;var ready,unload;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals ready unload Invocation */\n\n"import core";\n"import lib/invocation";\n"import lib/platform";\n"export package ready unload";\n\nvar platform = require(PLATFORM_PACKAGE);\n\n// ..........................................................\n// READY HANDLER\n// \n\n// called when the document becomes ready.  work through the queue...\nfunction _ready() {\n  var queue = ready.queue, \n      mainQ = ready.mainQ,\n      len   = queue.length,\n      inv, idx;\n\n  ready.isReady = ready.scheduled = YES ;\n  ready.queue = []; // ok to alloc since it is usually only called once\n  ready.mainQ = [];\n  \n  for(idx=0;idx<len;idx++) {\n    inv = queue[idx];\n    inv.invoke();\n    inv.release(); // return to pool\n  }\n\n  // after calling ready handlers, invoke any main functions to start the app\n  len = mainQ.length;\n  for(idx=0;idx<len;idx++) {\n    inv = mainQ[idx];\n    inv.invoke();\n    inv.release(); // return to pool\n  }\n};\n\n/**\n  Call to register methods you want run when the system is ready for the app\n  to run.\n*/\nready = function(target, method, args) {\n  if (ready.isReady) {\n    Invocation.invoke(target, method, arguments, 2);\n    \n  } else {\n    if (!ready.scheduled && platform) platform.ready(_ready);\n    ready.scheduled = YES ;\n    ready.queue.push(Invocation.create(target, method, arguments, 2));\n  }\n  \n  return this ;\n};\n\nready.isReady = NO ;\nready.queue   = [] ;\nready.scheduled = NO ;\nready.mainQ   = [] ; // invocations for main. called after ready\n\nready.main = function(target, method, args) {\n  if (ready.isReady) {\n    Invocation.invoke(target, method, arguments, 2);\n    \n  } else {\n    if (!ready.scheduled && platform) platform.ready(_ready);\n    ready.scheduled = YES ;\n    ready.mainQ.push(Invocation.create(target, method, arguments, 2));\n  }\n  \n  return this ;\n};\n\n// ..........................................................\n// UNLOAD HANDLER\n// \n\nfunction _unload() {\n  var queue = unload.queue, \n      len   = queue.length,\n      inv, idx;\n\n  unload.isUnloaded = unload.scheduled = YES ;\n  unload.queue = [];\n  \n  for(idx=0;idx<len;idx++) {\n    inv = queue[idx];\n    inv.invoke();\n    inv.release(); // return to pool\n  }\n}\n\n/**\n  Call to register methods you want run when the system is about to unload.\n*/\nunload = function(target, method, args) {\n  if (unload.isUnloaded) {\n    Invocation.invoke(target, method, arguments, 2);\n    \n  } else {\n    if (!unload.scheduled && platform) platform.unload(_unload);\n    unload.scheduled = YES;\n    unload.queue.push(Invocation.create(target, method, arguments, 2));\n  }\n  \n  return this ;\n};\n\nunload.isUnloaded = NO;\nunload.queue      = [];\nunload.scheduled  = NO;\n;exports.ready = ready;\nexports.unload = unload;\n');
tiki.module("tiki/system:lib/global",'var global,reset;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n\n"export package global";\n"export reset";\n\n// exports a global object representing the current global.  you can reset \n// the global by importing this module directly.\n\n// if you have env.global, use that\nreset = function() {\n  global = require.env.global || {} ;\n};\n\nreset();\n;exports.global = global;\nexports.reset = reset;\n');
tiki.module("tiki/system:lib/invocation",'var $m__ = require(\'tiki/system:core\'), T_ERROR=$m__.T_ERROR,T_OBJECT=$m__.T_OBJECT,T_NULL=$m__.T_NULL,T_CLASS=$m__.T_CLASS,T_HASH=$m__.T_HASH,T_FUNCTION=$m__.T_FUNCTION,T_UNDEFINED=$m__.T_UNDEFINED,T_NUMBER=$m__.T_NUMBER,T_BOOL=$m__.T_BOOL,T_ARRAY=$m__.T_ARRAY,T_STRING=$m__.T_STRING,T_BOOLEAN=$m__.T_BOOLEAN,YES=$m__.YES,NO=$m__.NO,isArray=$m__.isArray,typeOf=$m__.typeOf,A=$m__.A,generateGuid=$m__.generateGuid,guidFor=$m__.guidFor,mixin=$m__.mixin,setupDisplayNames=$m__.setupDisplayNames;var $m__ = require(\'tiki/system:mixins/retainable\'), Retainable=$m__.Retainable;var Invocation;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals Invocation */\n\n"import core";\n"import mixins/retainable";\n"export package Invocation";\n\n/**\n  An Invocation captures a target, method and zero or more arguments to be \n  called at a later time.  Invocations are retainable so you can control when\n  they are destroyed.\n  \n  Note that if you pass a string to the method param, this string will not \n  be resolved to a function until you actually invoke it.  This means you can\n  potentially swap out the method between invocations.\n  \n  @since SproutCore 1.1\n*/\nInvocation = function Invocation(target, method, args) {\n  return this.init(target, method, args);\n};\n\nmixin(Invocation.prototype, Retainable, {\n  \n  constructor: Invocation,\n  \n  /**\n    Initializes the invocation.  This is called when you first create the \n    invocation.\n  */\n  init: function(target, method, args, ignore) {\n    if (args && (ignore !== undefined)) {\n      if (args.length>ignore) args = Array.prototype.slice.call(args, ignore);\n      else args = null; // nothing to curry\n    }\n    \n    this.inPool = NO; // for debug\n    this.target = target;\n    this.method = method;\n    this.args   = args;\n    return this ;\n  },\n  \n  /**\n    Destroys the invocation.  Called when the retain count hits zero.  This\n    will return the invocation to the pool.\n  */\n  destroy: function() {\n    // reset retainable\n    this.isDestroyed = NO;\n    this.retainCount = 1;\n    this.inPool      = YES;\n    this.target = this.method = this.args = null;\n    pool.push(this); // add back to pool\n    \n    return this ;\n  },\n  \n  /**\n    Invokes the method.  Any passed arguments will be curried onto existing\n    arguments.\n    \n    @returns {Object} return value of invoked method.\n  */\n  invoke: function() {\n    return Invocation.invoke(this.target, this.method, this.args, undefined, arguments);\n  }\n  \n});\n\nvar pool = [];\n\n/**\n  Creates a new invocation.  This method will use a memory pool if possible to\n  avoid allocing memory.\n  \n  @param {Object} target target to invoke\n  @param {Function|String} method function or name of method to invoke\n  @param {Array} args zero or more arguments.  optional\n  @param {Number} ignore if passed, ignores this many items from the args\n  @returns {Invocation} new instance\n*/\nInvocation.create = function(target, method, args, ignore) {\n  if (pool.length>0) return pool.pop().init(target,method,args,ignore);\n  else return new Invocation(target, method, args, ignore);\n};\n\n/**\n  Invokes the passed target, method, and arguments.  This is an optimized \n  version that may not actually create an invocation.\n*/\n/**\n  Invokes the invocation.  Return value of invocation is returned.  Any \n  additional arguments will be curried onto the end of any existing args.\n*/\nInvocation.invoke = function(target, method, args, ignore, extra) {\n\n  // normalize method\n  if (typeOf(method) === T_STRING) method = target[method];\n  if (!method) throw("Invocation: method " + this.method + " not defined");\n  \n  // normalize arguments - also curry any extra arguments\n  if ((ignore !== undefined) && args) {\n    if (args.length>ignore) args = Array.prototype.slice.call(args, ignore);\n    else args = null;\n  }\n  if (extra && extra.length>0) args = args ? args.concat(extra) : extra;\n  \n  // and finally invoke\n  return args ? method.apply(target, args) : method.call(target);\n};\n\n;exports.Invocation = Invocation;\n');
tiki.module("tiki/system:lib/logger","var core = require('tiki/system:core');var $m__ = require('tiki/system:lib/platform'), PLATFORM=$m__.PLATFORM,PLATFORM_PACKAGE=$m__.PLATFORM_PACKAGE,info=$m__.info,env=$m__.env;var Logger,console;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals Logger console core */\n\n\"import core as core\";\n\"import lib/platform\";\n\"export package Logger console\";\n\n/** \n  @file\n\n  Module defines generic functions that can be used to log output into a \n  string or file.\n  \n  The Logger class defined in this module implements the generic Logger API,\n  which includes warn(), info(), error(), debug() and log().  \n  \n  The console object logs this to a system-provided console (on browsers this\n  is equivalent to the system-provided console).\n\n  @since Tiki 1.0\n*/\n\n// get the platform console\nvar pconsole = require(PLATFORM_PACKAGE).console;\n\n/**\n  Logger class defines a standard logger.  If you attach a console, then the\n  logger will record its own results AND forward any output to the console \n  itself.  \n  \n  A default logger is usually created and exported as \"console\" that will \n  attach to the platform console.  You can create a new logger if you want as \n  well.\n\n  @since Tiki 1.0\n*/\nLogger = function Logger(id, console) {\n  this.id = id ;\n  this.console = console;\n  return this ;\n};\n\nvar COLON = ': ', NEWLINE = \"\\n\", TILDA = ' ~ ';\n\nLogger.prototype = {\n  \n  /**\n    Emits count number of lines (or 100 lines if not specified) as a single\n    string.\n    \n    @property {Number} count number of lines to display. optional\n    @returns {String} logged output\n  */\n  tail: function(count) {\n    var lines = this._lines,\n        len   = lines ? lines.length : 0,\n        idx, ret;\n\n    if (len===0) return '';\n\n    if (count === undefined) count = 100;\n    ret = [];\n    for(idx = Math.max(0, len - count); idx < len; idx++) {\n      \n      if (this.id) {\n        ret.push(this.id);\n        ret.push(TILDA);\n      }\n      if (lines[idx].kind) {\n        ret.push(lines[idx].kind);\n        ret.push(COLON);\n      }\n      ret.push(lines[idx].message);\n      ret.push(NEWLINE);      \n    }\n    \n    return ret.join(\"\");\n  },\n  \n  /**\n    Clears the log contents\n    \n    @returns {Logger} reciever\n  */\n  clear: function() {\n    this._lines = null;\n    return this ;\n  },\n  \n  /**\n    Adds a line to the log.  Pass the log type and message.\n    \n    @param {String} kind kind of log message.  should be WARN, DBEUG, or null\n    @param {String} message message to log\n    @returns {Logger} reciever\n  */\n  push: function(kind, message) {\n    var lines = this._lines;\n    if (!lines) lines = this._lines = [];\n    lines.push({ kind: kind, message: message });\n  },\n  \n  /**\n    Logs a debug statement.\n    \n    @param {String} msg one or more items to log\n    @returns {void} \n  */\n  debug: function(msg) {\n    this.push('DEBUG', core.A(arguments));\n    \n    var console = this.console;\n    if (console && console.debug) console.debug.apply(console, arguments);\n  },\n  \n  /**\n    Logs an info statement.\n    \n    @param {String} msg one or more items to log\n    @returns {void}\n  */\n  info: function(msg) {\n    this.push('INFO', core.A(arguments));\n    \n    var console = this.console;\n    if (console && console.info) console.info.apply(console, arguments);\n  },\n  \n  /**\n    Logs a warning\n    \n    @param {String} msg one or more items to log\n    @returns {void}\n  */\n  warn: function(msg) {\n    this.push('WARN', core.A(arguments));\n    \n    var console = this.console;\n    if (console && console.warn) console.warn.apply(console, arguments);\n  },\n  \n  /**\n    Logs an error.\n    \n    @param {String} msg one or mroe items to log\n    @returns {void}\n  */\n  error: function(msg) {\n    this.push('ERROR', core.A(arguments));\n    \n    var console = this.console;\n    if (console && console.error) console.error.apply(console, arguments);\n  },\n  \n  /**\n    Begins a group stack.\n  */\n  group: function(groupName) {\n    this.push('GROUP', groupName);\n    \n    var console = this.console;\n    if (console && console.group) console.group(groupName);\n  },\n  \n  /**\n    Ends a group stack\n  */\n  groupEnd: function(groupName) {\n    this.push('','');\n    \n    var console = this.console;\n    if (console && console.groupEnd) console.groupEnd(groupName);\n  },\n  \n  toString: function() {\n    var len = this._lines ? this._lines.length : 0;\n    return \"Logger<id=\" + this.id + \" size=\" + len + \">\";\n  }\n    \n};\nLogger.prototype.log = Logger.prototype.info;\n\nconsole = new Logger('console', pconsole);\n;exports.Logger = Logger;\nexports.console = console;\n");
tiki.module("tiki/system:lib/platform",function(b,a,c){var g,h,f,e;"export package PLATFORM PLATFORM_PACKAGE info env";
"use factory_format function";h=null;g=platform="unknown";e=b.env;if(e){platform=g=e.PLATFORM||e.platform;
h=e.PLATFORM_PACKAGE||e.platformPackage;if(!h&&platform){h="platform/"+platform}}f=b(h).info;
a.PLATFORM=g;a.PLATFORM_PACKAGE=h;a.info=f;a.env=e});tiki.module("tiki/system:mixins/retainable",'var Retainable;// ==========================================================================\n// Project:   Tiki\n// Copyright: \u00a92009 Apple Inc.\n// ==========================================================================\n/*globals Retainable */\n\n\n"export package Retainable";\n\n/**\n  Makes an object retainable.  Retainable objects have a retain count you can\n  increment and decrement.  When the retain count reaches zero, the object is\n  destroyed (by calling destroy).  \n  \n  Use this mixin for objects that need to have their memory carefully \n  controlled (such as events).  This also allows you to write objects that\n  are pooled.\n  \n  @since SproutCore 1.1\n*/\nRetainable = {\n  \n  /**\n    Number of objects retaining this object.  When this reaches zero, the\n    object will be destroyed.\n  */\n  retainCount: 1,\n  \n  /**\n    Becomes true when the object is destroyed.\n  */\n  isDestroyed: false,\n  \n  /**\n    Call to retain the object\n    \n    @returns {Object} receiver\n  */\n  retain: function() {\n    this.retainCount++;\n    return this ;\n  },\n  \n  /** \n    Call to release the object.  May cause it to be destroyed.\n    \n    @returns {Object} receiver\n  */\n  release: function() {\n    if (--this.retainCount <= 0) this.__destroy();\n    return this;\n  },\n  \n  __destroy: function() {\n    if (!this.isDestroyed) {\n      this.isDestroyed = true;\n      if (this.destroy) this.destroy();\n    }\n  }\n  \n};\n\n\n;exports.Retainable = Retainable;\n');
tiki.module("tiki/system:package",function(c,b,e){var a;a=c("tiki/system:lib/event");
b.ready=a.ready;b.unload=a.unload;a=c("tiki/system:lib/global");b.global=a.global;
a=c("tiki/system:lib/invocation");b.Invocation=a.Invocation;a=c("tiki/system:lib/logger");
b.Logger=a.Logger;b.console=a.console;a=c("tiki/system:lib/platform");b.PLATFORM=a.PLATFORM;
b.PLATFORM_PACKAGE=a.PLATFORM_PACKAGE;b.info=a.info;b.env=a.env;a=c("tiki/system:mixins/retainable");
b.Retainable=a.Retainable});tiki.script("tiki/system:en/2914de37845aac6a9ada3efb6531c59f9735086e/javascript.js");
tiki.register("core_test",{depends:["tiki","tiki/system"],packages:{"tiki/system":{},tiki:{}},scripts:[{url:"/static/core_test/en/e8c5b9533d139513ec785d2963756d97f3689319/javascript.js",id:"core_test:en/e8c5b9533d139513ec785d2963756d97f3689319/javascript.js"}]});
tiki.module("core_test:package",function(c,b,e){var a});tiki.script("core_test:en/e8c5b9533d139513ec785d2963756d97f3689319/javascript.js");
tiki.register("sproutcore/runtime",{depends:["tiki/system"],packages:{"tiki/system":{}},scripts:[{url:"/static/sproutcore/runtime/en/cca71b2c8ec71645c88d40a948f81436bff9a7f3/javascript.js",id:"sproutcore/runtime:en/cca71b2c8ec71645c88d40a948f81436bff9a7f3/javascript.js"}]});
/* @license
==========================================================================
SproutCore Costello -- Property Observing Library
Copyright ©2006-2009, Sprout Systems, Inc. and contributors.
Portions copyright ©2008-2009 Apple Inc. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

For more information about SproutCore, visit http://www.sproutcore.com

==========================================================================
@license */
"use modules false";
tiki.module("sproutcore/runtime:core",function(e,f,b){var a=e("tiki/system:package");
var c,j,i,g;"require license";"import tiki/system:package as system";"export package SC SproutCore YES NO";
i=true;g=false;var h="undefined";if(h===typeof console){console=a.console}if(h===typeof sc_require){sc_require=function(){}
}if(h===typeof sc_resource){sc_resource=function(){}}c=j={};c.global=function(k,l){a.global[k]=l;
return c};c.global.remove=function(k){delete a.global[k];return c};c.global("SC",c);
c.mixin=function(){var o=arguments[0]||{};var k=1;var n=arguments.length;var l;if(n===1){o=this||{};
k=0}for(;k<n;k++){if(!(l=arguments[k])){continue}for(var m in l){if(!l.hasOwnProperty(m)){continue
}var p=l[m];if(o===p){continue}if(p!==undefined){o[m]=p}}}return o};c.supplement=function(){var o=arguments[0]||{};
var k=1;var n=arguments.length;var l;if(n===1){o=this||{};k=0}for(;k<n;k++){if(!(l=arguments[k])){continue
}for(var m in l){if(!l.hasOwnProperty(m)){continue}var p=o[m];var q=l[m];if(o===q){continue
}if(q!==undefined&&p===undefined){o[m]=q}}}return o};c.extend=c.mixin;c.mixin({T_ERROR:"error",T_OBJECT:"object",T_NULL:"null",T_CLASS:"class",T_HASH:"hash",T_FUNCTION:"function",T_UNDEFINED:"undefined",T_NUMBER:"number",T_BOOL:"boolean",T_ARRAY:"array",T_STRING:"string",typeOf:function(l){if(l===undefined){return c.T_UNDEFINED
}if(l===null){return c.T_NULL}var k=typeof(l);if(k=="object"){if(l instanceof Array){k=c.T_ARRAY
}else{if(l instanceof Function){k=l.isClass?c.T_CLASS:c.T_FUNCTION}else{if(c.Error&&(l instanceof c.Error)){k=c.T_ERROR
}else{if(l.isObject===true){k=c.T_OBJECT}else{k=c.T_HASH}}}}}else{if(k===c.T_FUNCTION){k=(l.isClass)?c.T_CLASS:c.T_FUNCTION
}}return k},none:function(k){return k===null||k===undefined},empty:function(k){return k===null||k===undefined||k===""
},isArray:function(m){if(m&&m.objectAt){return i}var k=(m?m.length:null),l=c.typeOf(m);
return !(c.none(k)||(l===c.T_FUNCTION)||(l===c.T_STRING)||m.setInterval)},makeArray:function(k){return c.isArray(k)?k:c.A(k)
},A:function(m){if(c.none(m)){return[]}if(m.slice instanceof Function){if(typeof(m)==="string"){return[m]
}else{return m.slice()}}if(m.toArray){return m.toArray()}if(!c.isArray(m)){return[m]
}var l=[],k=m.length;while(--k>=0){l[k]=m[k]}return l},guidKey:"_sc_guid_"+new Date().getTime(),_nextGUID:0,_numberGuids:[],_stringGuids:{},_keyCache:{},guidFor:function(l){if(l===undefined){return"(undefined)"
}if(l===null){return"(null)"}if(l===Object){return"(Object)"}if(l===Array){return"(Array)"
}var k=this.guidKey;if(l[k]){return l[k]}switch(typeof l){case c.T_NUMBER:return(this._numberGuids[l]=this._numberGuids[l]||("nu"+l));
case c.T_STRING:return(this._stringGuids[l]=this._stringGuids[l]||("st"+l));case c.T_BOOL:return(l)?"(true)":"(false)";
default:return c.generateGuid(l)}},keyFor:function(n,m){var l,k=this._keyCache[n];
if(!k){k=this._keyCache[n]={}}l=k[m];if(!l){l=k[m]=n+"_"+m}return l},generateGuid:function(l){var k=("sc"+(this._nextGUID++));
if(l){l[this.guidKey]=k}return k},hashFor:function(k){return(k&&k.hash&&(typeof k.hash===c.T_FUNCTION))?k.hash():this.guidFor(k)
},isEqual:function(l,k){if(l===null){return k===null}else{if(l===undefined){return k===undefined
}else{return this.hashFor(l)===this.hashFor(k)}}},compare:function(t,s){var q=c.typeOf(t);
var o=c.typeOf(s);var u=c.ORDER_DEFINITION.indexOf(q);var m=c.ORDER_DEFINITION.indexOf(o);
if(u<m){return -1}if(u>m){return 1}switch(q){case c.T_BOOL:case c.T_NUMBER:if(t<s){return -1
}if(t>s){return 1}return 0;case c.T_STRING:if(t.localeCompare(s)<0){return -1}if(t.localeCompare(s)>0){return 1
}return 0;case c.T_ARRAY:var n=Math.min(t.length,s.length);var k=0;var p=0;while(k===0&&p<n){k=arguments.callee(t[p],s[p]);
if(k!==0){return k}p++}if(t.length<s.length){return -1}if(t.length>s.length){return 1
}return 0;case c.T_OBJECT:if(t.constructor.isComparable===i){return t.constructor.compare(t,s)
}return 0;default:return 0}},K:function(){return this},EMPTY_ARRAY:[],EMPTY_HASH:{},EMPTY_RANGE:{start:0,length:0},beget:function(m){if(c.none(m)){return null
}var k=c.K;k.prototype=m;var l=new k();k.prototype=null;if(c.typeOf(m.didBeget)===c.T_FUNCTION){l=m.didBeget(l)
}return l},copy:function(l){var k=l;if(l&&l.isCopyable){return l.copy()}switch(c.typeOf(l)){case c.T_ARRAY:if(l.clone&&c.typeOf(l.clone)===c.T_FUNCTION){k=l.clone()
}else{k=l.slice()}break;case c.T_HASH:case c.T_OBJECT:if(l.clone&&c.typeOf(l.clone)===c.T_FUNCTION){k=l.clone()
}else{k={};for(var m in l){k[m]=l[m]}}}return k},merge:function(){var m={},l=arguments.length,k;
for(k=0;k<l;k++){c.mixin(m,arguments[k])}return m},keys:function(m){var k=[];for(var l in m){k.push(l)
}return k},inspect:function(n){var k,l=[];for(var m in n){k=n[m];if(k==="toString"){continue
}if(c.typeOf(k)===c.T_FUNCTION){k="function() { ... }"}l.push(m+": "+k)}return"{"+l.join(" , ")+"}"
},tupleForPropertyPath:function(o,k){if(c.typeOf(o)===c.T_ARRAY){return o}var m;var l=o.indexOf("*");
if(l<0){l=o.lastIndexOf(".")}m=(l>=0)?o.slice(l+1):o;var n=this.objectForPropertyPath(o,k,l);
return(n&&m)?[n,m]:null},objectForPropertyPath:function(p,m,n){var q,l,o,k;if(!m){m=a.global
}if(c.typeOf(p)===c.T_STRING){if(n===undefined){n=p.length}q=0;while((m)&&(q<n)){l=p.indexOf(".",q);
if((l<0)||(l>n)){l=n}o=p.slice(q,l);m=m.get?m.get(o):m[o];q=l+1}if(q<n){m=undefined
}}else{q=0;k=p.length;o=null;while((q<k)&&m){o=p[q++];if(o){m=(m.get)?m.get(o):m[o]
}}if(q<k){m=undefined}}return m},STRINGS:{},stringsFor:function(l,k){c.mixin(c.STRINGS,k);
return this}});c.clone=c.copy;c.$A=c.A;c.didLoad=c.K;c.ORDER_DEFINITION=[c.T_ERROR,c.T_UNDEFINED,c.T_NULL,c.T_BOOL,c.T_NUMBER,c.T_STRING,c.T_ARRAY,c.T_HASH,c.T_OBJECT,c.T_FUNCTION,c.T_CLASS];
c.mixin(Function.prototype,{property:function(){this.dependentKeys=c.$A(arguments);
var k=c.guidFor(this);this.cacheKey="__cache__"+k;this.lastSetValueKey="__lastValue__"+k;
this.isProperty=i;return this},cacheable:function(k){this.isProperty=i;if(!this.dependentKeys){this.dependentKeys=[]
}this.isCacheable=(k===undefined)?i:k;return this},idempotent:function(k){this.isProperty=i;
if(!this.dependentKeys){this.dependentKeys=[]}this.isVolatile=(k===undefined)?i:k;
return this},observes:function(k){var o=arguments.length,l=null,n=null;while(--o>=0){var m=arguments[o];
if((m.indexOf(".")<0)&&(m.indexOf("*")<0)){if(!l){l=this.localPropertyPaths=[]}l.push(m)
}else{if(!n){n=this.propertyPaths=[]}n.push(m)}}return this}});String.prototype.fmt=function(){var l=arguments;
var k=0;return this.replace(/%@([0-9]+)?/g,function(m,n){n=(n)?parseInt(n,0)-1:k++;
m=l[n];return((m===null)?"(null)":(m===undefined)?"":m).toString()})};String.prototype.loc=function(){var k=c.STRINGS[this]||this;
return k.fmt.apply(k,arguments)};String.prototype.w=function(){var m=[],n=this.split(" "),l=n.length;
for(var k=0;k<l;++k){var o=n[k];if(o.length!==0){m.push(o)}}return m};f.SC=c;f.SproutCore=j;
f.YES=i;f.NO=g});tiki.module("sproutcore/runtime:mixins/array",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:mixins/observable");c("sproutcore/runtime:mixins/enumerable");
c("sproutcore/runtime:system/range_observer");"import core";"import mixins/observable";
"import mixins/enumerable";"import system/range_observer";"export package";i.OUT_OF_RANGE_EXCEPTION="Index out of range";
i.Array={isSCArray:f,replace:function(j,l,k){throw"replace() must be implemented to support SC.Array"
},objectAt:function(j){if(j<0){return undefined}if(j>=this.get("length")){return undefined
}return this.get(j)},"[]":function(j,k){if(k!==undefined){this.replace(0,this.get("length"),k)
}return this}.property(),insertAt:function(j,k){if(j>this.get("length")){throw i.OUT_OF_RANGE_EXCEPTION
}this.replace(j,0,[k]);return this},removeAt:function(m,j){var l=0,k=[];if(typeof m===i.T_NUMBER){if((m<0)||(m>=this.get("length"))){throw i.OUT_OF_RANGE_EXCEPTION
}if(j===undefined){this.replace(m,1,k);return this}else{m=i.IndexSet.create(m,j)}}this.beginPropertyChanges();
m.forEachRange(function(o,n){o-=l;l+=n;this.replace(o,n,k)},this);this.endPropertyChanges();
return this},removeObject:function(k){var l=this.get("length")||0;while(--l>=0){var j=this.objectAt(l);
if(j==k){this.removeAt(l)}}return this},removeObjects:function(j){this.beginPropertyChanges();
j.forEach(function(k){this.removeObject(k)},this);this.endPropertyChanges();return this
},pushObject:function(j){this.insertAt(this.get("length"),j);return j},pushObjects:function(j){this.beginPropertyChanges();
j.forEach(function(k){this.pushObject(k)},this);this.endPropertyChanges();return this
},popObject:function(){var j=this.get("length");if(j===0){return undefined}var k=this.objectAt(j-1);
this.removeAt(j-1);return k},shiftObject:function(){if(this.get("length")===0){return undefined
}var j=this.objectAt(0);this.removeAt(0);return j},unshiftObject:function(j){this.insertAt(0,j);
return j},unshiftObjects:function(j){this.beginPropertyChanges();j.forEach(function(k){this.unshiftObject(k)
},this);this.endPropertyChanges();return this},isEqual:function(j){if(!j){return false
}if(j==this){return true}var k=j.get("length");if(k!=this.get("length")){return false
}while(--k>=0){if(!i.isEqual(j.objectAt(k),this.objectAt(k))){return false}}return true
},compact:function(){return this.without(null)},without:function(k){if(this.indexOf(k)<0){return this
}var j=[];this.forEach(function(l){if(l!==k){j[j.length]=l}});return j},uniq:function(){var j=[];
this.forEach(function(l){if(j.indexOf(l)<0){j[j.length]=l}});return j},rangeObserverClass:i.RangeObserver,addRangeObserver:function(m,o,q,n){var j=this._array_rangeObservers;
if(!j){j=this._array_rangeObservers=i.CoreSet.create()}if(this._array_oldLength===undefined){this._array_oldLength=this.get("length")
}var p=this.rangeObserverClass;var k=h;var l=p.create(this,m,o,q,n,k);j.add(l);if(!this._array_isNotifyingRangeObservers){this._array_isNotifyingRangeObservers=f;
this.addObserver("[]",this,this._array_notifyRangeObservers)}return l},updateRangeObserver:function(k,j){return k.update(this,j)
},removeRangeObserver:function(l){var k=l.destroy(this);var j=this._array_rangeObservers;
if(j){j.remove(l)}return k},enumerableContentDidChange:function(q,p,o){var j=this._array_rangeObservers,m=this._array_oldLength,n,l,k;
this.beginPropertyChanges();this.notifyPropertyChange("length");if(j&&j.length>0){if(m===undefined){m=0
}this._array_oldLength=n=this.get("length");if(q===undefined){q=0}if(o===undefined){o=n-m
}if(o!==0||p===undefined){l=n-q;if(o<0){l-=o}}else{l=p}k=this._array_rangeChanges;
if(!k){k=this._array_rangeChanges=i.IndexSet.create()}k.add(q,l)}this.notifyPropertyChange("[]");
this.endPropertyChanges();return this},_array_notifyRangeObservers:function(){var l=this._array_rangeObservers,m=this._array_rangeChanges,k=l?l.length:0,j,n;
if(k>0&&m&&m.length>0){for(j=0;j<k;j++){l[j].rangeDidChange(m)}m.clear()}}};i.mixin(Array.prototype,i.Array);
i.Array=i.mixin({},i.Enumerable,i.Array);i.Array.slice=function(k,m){var j=[];var l=this.get("length");
if(i.none(k)){k=0}if(i.none(m)||(m>l)){m=l}while(k<m){j[j.length]=this.objectAt(k++)
}return j};i.Array.indexOf=function(m,l){var k,j=this.get("length");if(l===undefined){l=0
}else{l=(l<0)?Math.ceil(l):Math.floor(l)}if(l<0){l+=j}for(k=l;k<j;k++){if(this.objectAt(k)===m){return k
}}return -1};if(!Array.prototype.indexOf){Array.prototype.indexOf=i.Array.indexOf
}i.Array.lastIndexOf=function(m,l){var k,j=this.get("length");if(l===undefined){l=j-1
}else{l=(l<0)?Math.ceil(l):Math.floor(l)}if(l<0){l+=j}for(k=l;k>=0;k--){if(this.objectAt(k)===m){return k
}}return -1};if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=i.Array.lastIndexOf
}(function(){i.mixin(Array.prototype,{replace:function(m,p,o){if(this.isFrozen){throw i.FROZEN_ERROR
}if(!o||o.length===0){this.splice(m,p)}else{var n=[m,p].concat(o);this.splice.apply(this,n)
}var l=o?(o.get?o.get("length"):o.length):0;this.enumerableContentDidChange(m,p,l-p);
return this},unknownProperty:function(m,n){var l=this.reducedProperty(m,n);if((n!==undefined)&&l===undefined){l=this[m]=n
}return l}});var k=Array.prototype.indexOf;if(!k||(k===i.Array.indexOf)){Array.prototype.indexOf=function(o,n){var m,l=this.length;
if(n===undefined){n=0}else{n=(n<0)?Math.ceil(n):Math.floor(n)}if(n<0){n+=l}for(m=n;
m<l;m++){if(this[m]===o){return m}}return -1}}var j=Array.prototype.lastIndexOf;if(!j||(j===i.Array.lastIndexOf)){Array.prototype.lastIndexOf=function(o,n){var m,l=this.length;
if(n===undefined){n=l-1}else{n=(n<0)?Math.ceil(n):Math.floor(n)}if(n<0){n+=l}for(m=n;
m>=0;m--){if(this[m]===o){return m}}return -1}}})()});tiki.module("sproutcore/runtime:mixins/comparable",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
"import core";"export package";i.Comparable={isComparable:f,compare:function(k,j){throw"%@.compare() is not implemented".fmt(this.toString())
}}});tiki.module("sproutcore/runtime:mixins/copyable",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
"import core";"export package";i.Copyable={isCopyable:f,copy:function(){throw"%@.copy() is not implemented"
},frozenCopy:function(){var j=this.get?this.get("isFrozen"):this.isFrozen;if(j===f){return this
}else{if(j===undefined){throw"%@ does not support freezing".fmt(this)}else{return this.copy().freeze()
}}}};i.mixin(Array.prototype,i.Copyable);Array.prototype.copy=Array.prototype.slice
});tiki.module("sproutcore/runtime:mixins/delegate_support",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
"import core";"export package";i.DelegateSupport={delegateFor:function(l){var k=1,j=arguments.length,m;
while(k<j){m=arguments[k];if(m&&m[l]!==undefined){return m}k++}return(this[l]!==undefined)?this:null
},invokeDelegateMethod:function(l,j,k){k=i.A(arguments);k=k.slice(2,k.length);if(!l||!l[j]){l=this
}var m=l[j];return m?m.apply(l,k):null},getDelegateProperty:function(m,n){var k=1,j=arguments.length,l;
while(k<j){l=arguments[k++];if(l&&l[m]!==undefined){return l.get?l.get(m):l[m]}}return(this[m]!==undefined)?this.get(m):undefined
}}});tiki.module("sproutcore/runtime:mixins/enumerable",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:system/enumerator");"import core";"import system/enumerator";
"export package";i.Enumerable={isEnumerable:f,nextObject:function(j,l,k){return this.objectAt?this.objectAt(j):this[j]
},firstObject:function(){if(this.get("length")===0){return undefined}if(this.objectAt){return this.objectAt(0)
}var k=i.Enumerator._popContext(),j;j=this.nextObject(0,null,k);k=i.Enumerator._pushContext(k);
return j}.property(),enumerator:function(){return i.Enumerator.create(this)},forEach:function(p,o){if(typeof p!=="function"){throw new TypeError()
}var k=this.get?this.get("length"):this.length;if(o===undefined){o=null}var n=null;
var l=i.Enumerator._popContext();for(var j=0;j<k;j++){var m=this.nextObject(j,n,l);
p.call(o,m,j,this);n=m}n=null;l=i.Enumerator._pushContext(l);return this},getEach:function(j){return this.map(function(k){return k?(k.get?k.get(j):k[j]):null
},this)},setEach:function(j,k){this.forEach(function(l){if(l){if(l.set){l.set(j,k)
}else{l[j]=k}}},this);return this},map:function(q,p){if(typeof q!=="function"){throw new TypeError()
}var k=this.get?this.get("length"):this.length;if(p===undefined){p=null}var l=[];
var o=null;var m=i.Enumerator._popContext();for(var j=0;j<k;j++){var n=this.nextObject(j,o,m);
l[j]=q.call(p,n,j,this);o=n}o=null;m=i.Enumerator._pushContext(m);return l},mapProperty:function(j){return this.map(function(k){return k?(k.get?k.get(j):k[j]):null
})},filter:function(q,p){if(typeof q!=="function"){throw new TypeError()}var k=this.get?this.get("length"):this.length;
if(p===undefined){p=null}var l=[];var o=null;var m=i.Enumerator._popContext();for(var j=0;
j<k;j++){var n=this.nextObject(j,o,m);if(q.call(p,n,j,this)){l.push(n)}o=n}o=null;
m=i.Enumerator._pushContext(m);return l},sortProperty:function(k){var l=(typeof k===i.T_STRING)?arguments:k,j=l.length,m;
if(this instanceof Array){m=this}else{m=[];this.forEach(function(n){m.push(n)})}if(!m){return[]
}return m.sort(function(p,o){var n,r,t,s,q=0;for(n=0;q===0&&n<j;n++){r=l[n];t=p?(p.get?p.get(r):p[r]):null;
s=o?(o.get?o.get(r):o[r]):null;q=i.compare(t,s)}return q})},filterProperty:function(s,o){var m=this.get?this.get("length"):this.length;
var n=[];var r=null;var k=i.Enumerator._popContext();for(var p=0;p<m;p++){var l=this.nextObject(p,r,k);
var q=l?(l.get?l.get(s):l[s]):null;var j=(o===undefined)?!!q:i.isEqual(q,o);if(j){n.push(l)
}r=l}r=null;k=i.Enumerator._pushContext(k);return n},find:function(q,m){if(typeof q!=="function"){throw new TypeError()
}var l=this.get?this.get("length"):this.length;if(m===undefined){m=null}var p=null,k,r=h,n=null;
var j=i.Enumerator._popContext();for(var o=0;o<l&&!r;o++){k=this.nextObject(o,p,j);
if(r=q.call(m,k,o,this)){n=k}p=k}k=p=null;j=i.Enumerator._pushContext(j);return n
},findProperty:function(r,o){var l=this.get?this.get("length"):this.length;var s=h,m=null,q=null,k,p;
var j=i.Enumerator._popContext();for(var n=0;n<l&&!s;n++){k=this.nextObject(n,q,j);
p=k?(k.get?k.get(r):k[r]):null;s=(o===undefined)?!!p:i.isEqual(p,o);if(s){m=k}q=k
}q=k=null;j=i.Enumerator._pushContext(j);return m},every:function(q,p){if(typeof q!=="function"){throw new TypeError()
}var k=this.get?this.get("length"):this.length;if(p===undefined){p=null}var l=f;var o=null;
var m=i.Enumerator._popContext();for(var j=0;l&&(j<k);j++){var n=this.nextObject(j,o,m);
if(!q.call(p,n,j,this)){l=h}o=n}o=null;m=i.Enumerator._pushContext(m);return l},everyProperty:function(r,n){var l=this.get?this.get("length"):this.length;
var m=f;var q=null;var j=i.Enumerator._popContext();for(var o=0;m&&(o<l);o++){var k=this.nextObject(o,q,j);
var p=k?(k.get?k.get(r):k[r]):null;m=(n===undefined)?!!p:i.isEqual(p,n);q=k}q=null;
j=i.Enumerator._pushContext(j);return m},some:function(q,p){if(typeof q!=="function"){throw new TypeError()
}var k=this.get?this.get("length"):this.length;if(p===undefined){p=null}var l=h;var o=null;
var m=i.Enumerator._popContext();for(var j=0;(!l)&&(j<k);j++){var n=this.nextObject(j,o,m);
if(q.call(p,n,j,this)){l=f}o=n}o=null;m=i.Enumerator._pushContext(m);return l},someProperty:function(r,n){var l=this.get?this.get("length"):this.length;
var m=h;var q=null;var j=i.Enumerator._popContext();for(var o=0;!m&&(o<l);o++){var k=this.nextObject(o,q,j);
var p=k?(k.get?k.get(r):k[r]):null;m=(n===undefined)?!!p:i.isEqual(p,n);q=k}q=null;
j=i.Enumerator._pushContext(j);return m},reduce:function(p,q,r){if(typeof p!=="function"){throw new TypeError()
}var l=this.get?this.get("length"):this.length;if(l===0&&q===undefined){throw new TypeError()
}var m=q;var o=null;var j=i.Enumerator._popContext();for(var n=0;n<l;n++){var k=this.nextObject(n,o,j);
if(k!==null){if(m===undefined){m=k}else{m=p.call(null,m,k,n,this,r)}}o=k}o=null;j=i.Enumerator._pushContext(j);
if(m===undefined){throw new TypeError()}return m},invoke:function(q){var n=this.get?this.get("length"):this.length;
if(n<=0){return[]}var r;var p=[];var l=arguments.length;if(l>1){for(r=1;r<l;r++){p.push(arguments[r])
}}var o=[];var s=null;var k=i.Enumerator._popContext();for(r=0;r<n;r++){var m=this.nextObject(r,s,k);
var j=m?m[q]:null;if(j){o[r]=j.apply(m,p)}s=m}s=null;k=i.Enumerator._pushContext(k);
return o},invokeWhile:function(m,r){var o=this.get?this.get("length"):this.length;
if(o<=0){return null}var s;var q=[];var l=arguments.length;if(l>2){for(s=2;s<l;s++){q.push(arguments[s])
}}var p=m;var t=null;var k=i.Enumerator._popContext();for(s=0;(p===m)&&(s<o);s++){var n=this.nextObject(s,t,k);
var j=n?n[r]:null;if(j){p=j.apply(n,q)}t=n}t=null;k=i.Enumerator._pushContext(k);
return p},toArray:function(){var j=[];this.forEach(function(k){j.push(k)},this);return j
}};i._buildReducerFor=function(j,k){return function(m,n){var o=this[j];if(i.typeOf(o)!==i.T_FUNCTION){return this.unknownProperty?this.unknownProperty(m,n):null
}else{var l=i.Enumerable.reduce.call(this,o,null,k);return l}}.property("[]")};i.Reducers={"[]":function(j,k){return this
}.property(),enumerableContentDidChange:function(k,j){this.notifyPropertyChange("[]");
return this},reducedProperty:function(s,q,o){if(!s||s.charAt(0)!=="@"){return undefined
}var m=s.match(/^@([^(]*)(\(([^)]*)\))?$/);if(!m||m.length<2){return undefined}var r=m[1];
var t=m[3];r="reduce"+r.slice(0,1).toUpperCase()+r.slice(1);var j=this[r];if(i.typeOf(j)!==i.T_FUNCTION){return undefined
}if(o===h){return i.Enumerable.reduce.call(this,j,null,t)}var l=i._buildReducerFor(r,t);
var k=this.constructor.prototype;if(k){k[s]=l;var n=k._properties||[];n.push(s);k._properties=n;
this.registerDependentKey(s,"[]")}return i.Enumerable.reduce.call(this,j,null,t)},reduceMax:function(j,m,k,n,l){if(l&&m){m=m.get?m.get(l):m[l]
}if(j===null){return m}return(m>j)?m:j},reduceMaxObject:function(k,n,l,o,m){var j=k,p=n;
if(m){if(n){p=n.get?n.get(m):n[m]}if(k){j=k.get?k.get(m):k[m]}}if(j===null){return n
}return(p>j)?n:k},reduceMin:function(j,m,k,n,l){if(l&&m){m=m.get?m.get(l):m[l]}if(j===null){return m
}return(m<j)?m:j},reduceMinObject:function(k,n,l,o,m){var j=k,p=n;if(m){if(n){p=n.get?n.get(m):n[m]
}if(k){j=k.get?k.get(m):k[m]}}if(j===null){return n}return(p<j)?n:k},reduceAverage:function(k,o,m,p,n){if(n&&o){o=o.get?o.get(n):o[n]
}var l=(k||0)+o;var j=p.get?p.get("length"):p.length;if(m>=j-1){l=l/j}return l},reduceSum:function(j,m,k,n,l){if(l&&m){m=m.get?m.get(l):m[l]
}return(j===null)?m:j+m}};i.mixin(i.Enumerable,i.Reducers);i.mixin(Array.prototype,i.Reducers);
Array.prototype.isEnumerable=f;(function(){var j={nextObject:i.Enumerable.nextObject,enumerator:i.Enumerable.enumerator,firstObject:i.Enumerable.firstObject,sortProperty:i.Enumerable.sortProperty,mapProperty:function(p){var n=this.length;
var o=[];for(var m=0;m<n;m++){var q=this[m];o[m]=q?(q.get?q.get(p):q[p]):null}return o
},filterProperty:function(q,s){var o=this.length;var p=[];for(var n=0;n<o;n++){var r=this[n];
var t=r?(r.get?r.get(q):r[q]):null;var m=(s===undefined)?!!t:i.isEqual(t,s);if(m){p.push(r)
}}return p},find:function(s,r){if(typeof s!=="function"){throw new TypeError()}var n=this.length;
if(r===undefined){r=null}var p,o=null,q=h;for(var m=0;m<n&&!q;m++){p=this[m];if(q=s.call(r,p,m,this)){o=p
}}p=null;return o},findProperty:function(p,s){var n=this.length;var q,t,r=h,o=null;
for(var m=0;m<n&&!r;m++){t=(q=this[m])?(q.get?q.get(p):q[p]):null;r=(s===undefined)?!!t:i.isEqual(t,s);
if(r){o=q}}q=null;return o},everyProperty:function(p,r){var n=this.length;var o=f;
for(var m=0;o&&(m<n);m++){var q=this[m];var s=q?(q.get?q.get(p):q[p]):null;o=(r===undefined)?!!s:i.isEqual(s,r)
}return o},someProperty:function(p,r){var n=this.length;var o=h;for(var m=0;!o&&(m<n);
m++){var q=this[m];var s=q?(q.get?q.get(p):q[p]):null;o=(r===undefined)?!!s:i.isEqual(s,r)
}return o},invoke:function(o){var n=this.length;if(n<=0){return[]}var m;var q=[];
var s=arguments.length;if(s>1){for(m=1;m<s;m++){q.push(arguments[m])}}var p=[];for(m=0;
m<n;m++){var r=this[m];var t=r?r[o]:null;if(t){p[m]=t.apply(r,q)}}return p},invokeWhile:function(o,t){var q=this.length;
if(q<=0){return null}var u;var s=[];var n=arguments.length;if(n>2){for(u=2;u<n;u++){s.push(arguments[u])
}}var r=o;for(u=0;(r===o)&&(u<q);u++){var p=this[u];var m=p?p[t]:null;if(m){r=m.apply(p,s)
}}return r},toArray:function(){var n=this.length;if(n<=0){return[]}var o=[];for(var m=0;
m<n;m++){var p=this[m];o.push(p)}return o},getEach:function(p){var o=[];var n=this.length;
for(var m=0;m<n;m++){var q=this[m];o[m]=q?(q.get?q.get(p):q[p]):null}return o},setEach:function(o,p){var n=this.length;
for(var m=0;m<n;m++){var q=this[m];if(q){if(q.set){q.set(o,p)}else{q[o]=p}}}return this
}};var l={forEach:function(q,p){if(typeof q!=="function"){throw new TypeError()}var n=this.length;
if(p===undefined){p=null}for(var m=0;m<n;m++){var o=this[m];q.call(p,o,m,this)}return this
},map:function(r,q){if(typeof r!=="function"){throw new TypeError()}var n=this.length;
if(q===undefined){q=null}var o=[];for(var m=0;m<n;m++){var p=this[m];o[m]=r.call(q,p,m,this)
}return o},filter:function(r,q){if(typeof r!=="function"){throw new TypeError()}var n=this.length;
if(q===undefined){q=null}var o=[];for(var m=0;m<n;m++){var p=this[m];if(r.call(q,p,m,this)){o.push(p)
}}return o},every:function(r,q){if(typeof r!=="function"){throw new TypeError()}var n=this.length;
if(q===undefined){q=null}var o=f;for(var m=0;o&&(m<n);m++){var p=this[m];if(!r.call(q,p,m,this)){o=h
}}return o},some:function(r,q){if(typeof r!=="function"){throw new TypeError()}var n=this.length;
if(q===undefined){q=null}var o=h;for(var m=0;(!o)&&(m<n);m++){var p=this[m];if(r.call(q,p,m,this)){o=f
}}return o},reduce:function(s,o,r){if(typeof s!=="function"){throw new TypeError()
}var n=this.length;if(n===0&&o===undefined){throw new TypeError()}var p=o;for(var m=0;
m<n;m++){var q=this[m];if(q!==null){if(p===undefined){p=q}else{p=s.call(null,p,q,m,this,r)
}}}if(p===undefined){throw new TypeError()}return p}};for(var k in l){if(!l.hasOwnProperty(k)){continue
}if(!Array.prototype[k]||((typeof Prototype==="object")&&Prototype.Version.match(/^1\.6/))){Array.prototype[k]=l[k]
}}i.mixin(Array.prototype,j)})()});tiki.module("sproutcore/runtime:mixins/freezable",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
"import core";"export package";i.FROZEN_ERROR=new Error("Cannot modify a frozen object");
i.Freezable={isFreezable:f,isFrozen:h,freeze:function(){if(this.set){this.set("isFrozen",f)
}else{this.isFrozen=f}return this}};i.mixin(Array.prototype,i.Freezable)});tiki.module("sproutcore/runtime:mixins/observable",function(e,f,b){var a=e("sproutcore/runtime:core"),c=a.SC,k=a.SproutCore,j=a.YES,g=a.NO;
e("sproutcore/runtime:private/observer_set");e("sproutcore/runtime:private/chain_observer");
"import core";"import private/observer_set";"import private/chain_observer";"export package";
var i=false;c.LOG_OBSERVERS=g;c.Observable={isObservable:j,automaticallyNotifiesObserversFor:function(l){return j
},get:function(n){var m=this[n],l;if(m===undefined){return this.unknownProperty(n)
}else{if(m&&m.isProperty){if(m.isCacheable){l=this._kvo_cache;if(!l){l=this._kvo_cache={}
}return(l[m.cacheKey]!==undefined)?l[m.cacheKey]:(l[m.cacheKey]=m.call(this,n))}else{return m.call(this,n)
}}else{return m}}},set:function(s,q){var m=this[s],t=this.automaticallyNotifiesObserversFor(s),p=q,n,l,r,o;
if(this._kvo_cacheable&&(l=this._kvo_cache)){n=this._kvo_cachedep;if(!n||(n=n[s])===undefined){n=this._kvo_computeCachedDependentsFor(s)
}if(n){r=n.length;while(--r>=0){o=n[r];l[o.cacheKey]=l[o.lastSetValueKey]=undefined
}}}if(m&&m.isProperty){l=this._kvo_cache;if(m.isVolatile||!l||(l[m.lastSetValueKey]!==q)){if(!l){l=this._kvo_cache={}
}l[m.lastSetValueKey]=q;if(t){this.propertyWillChange(s)}p=m.call(this,s,q);if(m.isCacheable){l[m.cacheKey]=p
}if(t){this.propertyDidChange(s,p,j)}}}else{if(m===undefined){if(t){this.propertyWillChange(s)
}this.unknownProperty(s,q);if(t){this.propertyDidChange(s,p)}}else{if(this[s]!==q){if(t){this.propertyWillChange(s)
}p=this[s]=q;if(t){this.propertyDidChange(s,p)}}}}return this},unknownProperty:function(l,m){if(!(m===undefined)){this[l]=m
}return m},beginPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;
return this},endPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
var m=this._kvo_changeLevel,l=this._kvo_changes;if((m<=0)&&l&&(l.length>0)&&!c.Observers.isObservingSuspended){this._notifyPropertyObservers()
}return this},propertyWillChange:function(l){return this},propertyDidChange:function(w,u,n){this._kvo_revision=(this._kvo_revision||0)+1;
var m=this._kvo_changeLevel||0,r,v,s,l,o,q=c.LOG_OBSERVERS&&!(this.LOG_OBSERVING===g);
if(this._kvo_cacheable&&(l=this._kvo_cache)){if(!n){o=this[w];if(o&&o.isProperty){l[o.cacheKey]=l[o.lastSetValueKey]=undefined
}}r=this._kvo_cachedep;if(!r||(r=r[w])===undefined){r=this._kvo_computeCachedDependentsFor(w)
}if(r){v=r.length;while(--v>=0){s=r[v];l[s.cacheKey]=l[s.lastSetValueKey]=undefined
}}}var p=c.Observers.isObservingSuspended;if((m>0)||p){var t=this._kvo_changes;if(!t){t=this._kvo_changes=c.CoreSet.create()
}t.add(w);if(p){if(q){console.log("%@%@: will not notify observers because observing is suspended".fmt(c.KVO_SPACES,this))
}c.Observers.objectHasPendingChanges(this)}}else{this._notifyPropertyObservers(w)
}return this},registerDependentKey:function(s,n){var p=this._kvo_dependents,m=this[s],t,r,l,q,o;
if(c.typeOf(n)===c.T_ARRAY){t=n;l=0}else{t=arguments;l=1}r=t.length;if(!p){this._kvo_dependents=p={}
}while(--r>=l){q=t[r];o=p[q];if(!o){o=p[q]=[]}o.push(s)}},_kvo_addCachedDependents:function(m,q,s,n){var l=q.length,p,o,r;
while(--l>=0){o=q[l];n.add(o);p=this[o];if(p&&(p instanceof Function)&&p.isProperty){if(p.isCacheable){m.push(p)
}if((r=s[o])&&r.length>0){this._kvo_addCachedDependents(m,r,s,n)}}}},_kvo_computeCachedDependentsFor:function(n){var o=this._kvo_cachedep,q=this._kvo_dependents,p=q?q[n]:null,l,m;
if(!o){o=this._kvo_cachedep={}}if(!p||p.length===0){return o[n]=null}l=o[n]=[];m=c._TMP_SEEN_SET=(c._TMP_SEEN_SET||c.CoreSet.create());
m.add(n);this._kvo_addCachedDependents(l,p,q,m);m.clear();if(l.length===0){l=o[n]=null
}return l},_kvo_for:function(n,m){var l=this[n];if(!this._kvo_cloned){this._kvo_cloned={}
}if(!l){l=this[n]=(m===undefined)?[]:m.create();this._kvo_cloned[n]=j}else{if(!this._kvo_cloned[n]){l=this[n]=l.copy();
this._kvo_cloned[n]=j}}return l},addObserver:function(n,q,s,m){var o,l,p,r;if(s===undefined){s=q;
q=this}if(!q){q=this}if(c.typeOf(s)===c.T_STRING){s=q[s]}if(!s){throw"You must pass a method to addObserver()"
}n=n.toString();if(n.indexOf(".")>=0){l=c._ChainObserver.createChain(this,n,q,s,m);
l.masterTarget=q;l.masterMethod=s;this._kvo_for(c.keyFor("_kvo_chains",n)).push(l)
}else{if((this[n]===undefined)&&(n.indexOf("@")===0)){this.get(n)}if(q===this){q=null
}o=c.keyFor("_kvo_observers",n);this._kvo_for(o,c.ObserverSet).add(q,s,m);this._kvo_for("_kvo_observed_keys",c.CoreSet).add(n)
}if(this.didAddObserver){this.didAddObserver(n,q,s)}return this},removeObserver:function(n,q,s){var o,p,m,r,l;
if(s===undefined){s=q;q=this}if(!q){q=this}if(c.typeOf(s)===c.T_STRING){s=q[s]}if(!s){throw"You must pass a method to addObserver()"
}n=n.toString();if(n.indexOf(".")>=0){o=c.keyFor("_kvo_chains",n);if(p=this[o]){p=this._kvo_for(o);
l=p.length;while(--l>=0){m=p[l];if(m&&(m.masterTarget===q)&&(m.masterMethod===s)){p[l]=m.destroyChain()
}}}}else{if(q===this){q=null}o=c.keyFor("_kvo_observers",n);if(r=this[o]){r=this._kvo_for(o);
r.remove(q,s);if(r.targets<=0){this._kvo_for("_kvo_observed_keys",c.CoreSet).remove(n)
}}}if(this.didRemoveObserver){this.didRemoveObserver(n,q,s)}return this},hasObserverFor:function(m){c.Observers.flush(this);
var o=this[c.keyFor("_kvo_observers",m)],n=this[c.keyFor("_kvo_local",m)],l;if(n&&n.length>0){return j
}if(o&&o.getMembers().length>0){return j}return g},initObservable:function(){if(this._observableInited){return
}this._observableInited=j;if(!i){i=j;e("sproutcore/runtime:system/binding");e("sproutcore/runtime:private/observer_queue")
}var p,w,u,t,r,o,v;if(w=this._observers){var q=w.length;for(p=0;p<q;p++){u=w[p];r=this[u];
o=r.propertyPaths;v=(o)?o.length:0;for(var m=0;m<v;m++){var x=o[m];var l=x.indexOf(".");
if(l<0){this.addObserver(x,this,r)}else{if(x.indexOf("*")===0){this.addObserver(x.slice(1),this,r)
}else{var s=null;if(l===0){s=this;x=x.slice(1)}else{if(l===4&&x.slice(0,5)==="this."){s=this;
x=x.slice(5)}else{if(l<0&&x.length===4&&x==="this"){s=this;x=""}}}c.Observers.addObserver(x,this,r,s)
}}}}}this.bindings=[];if(w=this._bindings){for(p=0;p<w.length;p++){u=w[p];t=this[u];
var n=u.slice(0,-7);this[u]=this.bind(n,t)}}if(w=this._properties){for(p=0;p<w.length;
p++){u=w[p];if(t=this[u]){if(t.isCacheable){this._kvo_cacheable=j}if(t.dependentKeys&&(t.dependentKeys.length>0)){this.registerDependentKey(u,t.dependentKeys)
}}}}},observersForKey:function(l){var m=this._kvo_for("_kvo_observers",l);return m.getMembers()||[]
},_notifyPropertyObservers:function(E){if(!this._observableInited){this.initObservable()
}c.Observers.flush(this);var r=c.LOG_OBSERVERS&&!(this.LOG_OBSERVING===g);var z,C,x,o,y,w,B;
var A,u,l,q,D,n,t,p;var m,s,v;if(r){s=c.KVO_SPACES=(c.KVO_SPACES||"")+"  ";console.log('%@%@: notifying observers after change to key "%@"'.fmt(s,this,E))
}o=this["_kvo_observers_*"];this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;while(((C=this._kvo_changes)&&(C.length>0))||E){B=++this.propertyRevision;
if(!C){C=c.CoreSet.create()}this._kvo_changes=null;if(E==="*"){C.add("*");C.addEach(this._kvo_for("_kvo_observed_keys",c.CoreSet))
}else{if(E){C.add(E)}}if(x=this._kvo_dependents){for(y=0;y<C.length;y++){E=C[y];w=x[E];
if(w&&(t=w.length)){if(r){console.log("%@...including dependent keys for %@: %@".fmt(s,E,w))
}v=this._kvo_cache;if(!v){v=this._kvo_cache={}}while(--t>=0){C.add(E=w[t]);if(p=this[E]){this[p.cacheKey]=undefined;
v[p.cacheKey]=v[p.lastSetValueKey]=undefined}}}}}while(C.length>0){E=C.pop();z=this[c.keyFor("_kvo_observers",E)];
if(z){A=z.getMembers();u=A.length;for(q=0;q<u;q++){l=A[q];if(l[3]===B){continue}D=l[0]||this;
n=l[1];m=l[2];l[3]=B;if(r){console.log('%@...firing observer on %@ for key "%@"'.fmt(s,D,E))
}if(m!==undefined){n.call(D,this,E,null,m,B)}else{n.call(D,this,E,null,B)}}}A=this[c.keyFor("_kvo_local",E)];
if(A){u=A.length;for(q=0;q<u;q++){l=A[q];n=this[l];if(n){if(r){console.log('%@...firing local observer %@.%@ for key "%@"'.fmt(s,this,l,E))
}n.call(this,this,E,null,B)}}}if(o&&E!=="*"){A=o.getMembers();u=A.length;for(q=0;
q<u;q++){l=A[q];D=l[0]||this;n=l[1];m=l[2];if(r){console.log('%@...firing * observer on %@ for key "%@"'.fmt(s,D,E))
}if(m!==undefined){n.call(D,this,E,null,m,B)}else{n.call(D,this,E,null,B)}}}if(this.propertyObserver){if(r){console.log('%@...firing %@.propertyObserver for key "%@"'.fmt(s,this,E))
}this.propertyObserver(this,E,null,B)}}if(C){C.destroy()}E=null}this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
if(r){c.KVO_SPACES=s.slice(0,-2)}return j},bind:function(l,n,p){var o;if(p!==undefined){n=[n,p]
}var m=c.typeOf(n);if(m===c.T_STRING||m===c.T_ARRAY){o=this[l+"BindingDefault"]||c.Binding;
o=o.beget().from(n)}else{o=n}o=o.to(l,this).connect();this.bindings.push(o);return o
},didChangeFor:function(l){l=c.hashFor(l);var m=this._kvo_didChange_valueCache;if(!m){m=this._kvo_didChange_valueCache={}
}var q=this._kvo_didChange_revisionCache;if(!q){q=this._kvo_didChange_revisionCache={}
}var p=m[l]||{};var u=q[l]||{};var o=false;var n=this._kvo_revision||0;var s=arguments.length;
while(--s>=1){var t=arguments[s];if(u[t]!=n){var r=this.get(t);if(p[t]!==r){o=true;
p[t]=r}}u[t]=n}m[l]=p;q[l]=u;return o},setIfChanged:function(l,m){return(this.get(l)!==m)?this.set(l,m):this
},getPath:function(m){var l=c.tupleForPropertyPath(m,this);if(l===null||l[0]===null){return undefined
}return l[0].get(l[1])},setPath:function(n,m){if(n.indexOf(".")>=0){var l=c.tupleForPropertyPath(n,this);
if(!l||!l[0]){return null}l[0].set(l[1],m)}else{this.set(n,m)}return this},setPathIfChanged:function(n,m){if(n.indexOf(".")>=0){var l=c.tupleForPropertyPath(n,this);
if(!l||!l[0]){return null}if(l[0].get(l[1])!==m){l[0].set(l[1],m)}}else{this.setIfChanged(n,m)
}return this},getEach:function(){var n=c.A(arguments);var m=[];for(var l=0;l<n.length;
l++){m[m.length]=this.getPath(n[l])}return m},incrementProperty:function(l){this.set(l,(this.get(l)||0)+1);
return this.get(l)},decrementProperty:function(l){this.set(l,(this.get(l)||0)-1);
return this.get(l)},toggleProperty:function(l,m,n){if(m===undefined){m=true}if(n===undefined){n=false
}m=(this.get(l)==m)?n:m;this.set(l,m);return this.get(l)},notifyPropertyChange:function(l,m){this.propertyWillChange(l);
this.propertyDidChange(l,m);return this},allPropertiesDidChange:function(){this._kvo_cache=null;
this._notifyPropertyObservers("*");return this},addProbe:function(l){this.addObserver(l,c.logChange)
},removeProbe:function(l){this.removeObserver(l,c.logChange)},logProperty:function(){var m=c.$A(arguments);
for(var l=0;l<m.length;l++){var n=m[l];console.log("%@:%@: ".fmt(c.guidFor(this),n),this.get(n))
}},propertyRevision:1};c.logChange=function h(n,l,m){console.log("CHANGE: %@[%@] => %@".fmt(n,l,n.get(l)))
};c.mixin(Array.prototype,c.Observable)});tiki.module("sproutcore/runtime:private/chain_observer",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
"import core";i._ChainObserver=function(j){this.property=j};i._ChainObserver.createChain=function(m,s,o,j,k){var l=s.split("."),q=new i._ChainObserver(l[0]),p=q,n=l.length;
for(var r=1;r<n;r++){p=p.next=new i._ChainObserver(l[r])}q.objectDidChange(m);p.target=o;
p.method=j;p.context=k;return q};i._ChainObserver.prototype={isChainObserver:true,object:null,property:null,next:null,target:null,method:null,objectDidChange:function(j){if(j===this.object){return
}if(this.object&&this.object.removeObserver){this.object.removeObserver(this.property,this,this.propertyDidChange)
}this.object=j;if(this.object&&this.object.addObserver){this.object.addObserver(this.property,this,this.propertyDidChange)
}this.propertyDidChange()},propertyDidChange:function(){var k=this.object;var n=this.property;
var m=(k&&k.get)?k.get(n):null;if(this.next){this.next.objectDidChange(m)}var o=this.target,p=this.method,l=this.context;
if(o&&p){var j=k?k.propertyRevision:null;if(l){p.call(o,k,n,m,l,j)}else{p.call(o,k,n,m,j)
}}},destroyChain:function(){var j=this.object;if(j&&j.removeObserver){j.removeObserver(this.property,this,this.propertyDidChange)
}if(this.next){this.next.destroyChain()}this.next=this.target=this.method=this.object=this.context=null;
return null}}});tiki.module("sproutcore/runtime:private/observer_queue",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:system/set");"import core";"import system/set";i.Observers={queue:[],addObserver:function(l,m,n,k){var j;
if(i.typeOf(l)===i.T_STRING){j=i.tupleForPropertyPath(l,k)}else{j=l}if(j){j[0].addObserver(j[1],m,n)
}else{this.queue.push([l,m,n,k])}},removeObserver:function(o,p,q,m){var l,k,j,n;j=i.tupleForPropertyPath(o,m);
if(j){j[0].removeObserver(j[1],p,q)}l=this.queue.length;k=this.queue;while(--l>=0){n=k[l];
if((n[0]===o)&&(n[1]===p)&&(n[2]==q)&&(n[3]===m)){k[l]=null}}},addPendingRangeObserver:function(j){var k=this.rangeObservers;
if(!k){k=this.rangeObservers=i.CoreSet.create()}k.add(j);return this},_TMP_OUT:[],flush:function(j){var n=this.queue;
if(n&&n.length>0){var q=(this.queue=[]);var r=n.length;while(--r>=0){var s=n[r];if(!s){continue
}var o=i.tupleForPropertyPath(s[0],s[3]);if(o){o[0].addObserver(o[1],s[1],s[2])}else{q.push(s)
}}}if(j._kvo_needsRangeObserver){var p=this.rangeObservers,m=p?p.get("length"):0,k=this._TMP_OUT,l;
for(r=0;r<m;r++){l=p[r];if(l.setupPending(j)){k.push(l)}}if(k.length>0){p.removeEach(k)
}k.length=0;j._kvo_needsRangeObserver=h}},isObservingSuspended:0,_pending:i.CoreSet.create(),objectHasPendingChanges:function(j){this._pending.add(j)
},suspendPropertyObserving:function(){this.isObservingSuspended++},resumePropertyObserving:function(){var l;
if(--this.isObservingSuspended<=0){l=this._pending;this._pending=i.CoreSet.create();
var k,j=l.length;for(k=0;k<j;k++){l[k]._notifyPropertyObservers()}l.clear();l=null
}}}});tiki.module("sproutcore/runtime:private/observer_set",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
"import core";i.ObserverSet={targets:0,_membersCacheIsValid:h,add:function(m,o,k){var l=(m)?i.guidFor(m):"__this__";
var j=this[l];if(!j){j=this[l]=i.CoreSet.create();j.target=m;j.isTargetSet=f;this.targets++
}j.add(o);if(k!==undefined){var n=j.contexts;if(!k){n={}}n[i.guidFor(o)]=k}this._membersCacheIsValid=h
},remove:function(l,m){var k=(l)?i.guidFor(l):"__this__";var j=this[k];if(!j){return h
}j.remove(m);if(j.length<=0){j.target=null;j.isTargetSet=h;j.contexts=null;delete this[k];
this.targets--}else{if(j.contexts){delete j.contexts[i.guidFor(m)]}}this._membersCacheIsValid=h;
return f},invokeMethods:function(){for(var k in this){if(!this.hasOwnProperty(k)){continue
}var l=this[k];if(l&&l.isTargetSet){var j=l.length;var m=l.target;while(--j>=0){l[j].call(m)
}}}},getMembers:function(){if(this._membersCacheIsValid){return this._members}if(!this._members){this._members=[]
}else{this._members.length=0}var k=this._members;for(var l in this){if(!this.hasOwnProperty(l)){continue
}var m=this[l];if(m&&m.isTargetSet){var j=m.length;var n=m.target;var p=m.contexts;
if(p){while(--j>=0){var o=m[j];k.push([n,o,p[i.guidFor(o)]])}}else{while(--j>=0){k.push([n,m[j]])
}}}}this._membersCacheIsValid=f;return k},clone:function(){var k,m,l,j=i.ObserverSet.create();
for(l in this){if(!this.hasOwnProperty(l)){continue}k=this[l];if(k&&k.isTargetSet){m=k.clone();
m.target=k.target;if(k.contexts){m.contexts=i.clone(k.contexts)}j[l]=m}}j.targets=this.targets;
j._membersCacheIsValid=h;return j},create:function(){return i.beget(this)}};i.ObserverSet.slice=i.ObserverSet.clone
});tiki.module("sproutcore/runtime:system/binding",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:system/set");"import core";"import system/set";"export package";
i.LOG_BINDINGS=h;i.BENCHMARK_BINDING_NOTIFICATIONS=h;i.BENCHMARK_BINDING_SETUP=h;
i.MULTIPLE_PLACEHOLDER="@@MULT@@";i.NULL_PLACEHOLDER="@@NULL@@";i.EMPTY_PLACEHOLDER="@@EMPTY@@";
i.Binding={beget:function(k){var j=i.beget(this);j.parentBinding=this;if(k!==undefined){j=j.from(k)
}return j},builder:function(){var k=this;var j=function(l){return k.beget().from(l)
};j.beget=function(){return k.beget()};return j},from:function(k,j){if(!k){return this
}var l=(this===i.Binding)?this.beget():this;l._fromPropertyPath=k;l._fromRoot=j;l._fromTuple=null;
return l},to:function(k,j){var l=(this===i.Binding)?this.beget():this;l._toPropertyPath=k;
l._toRoot=j;l._toTuple=null;return l},connect:function(){if(this.isConnected){return this
}this.isConnected=f;this._connectionPending=f;this._syncOnConnect=f;i.Binding._connectQueue.add(this);
return this},_connect:function(){if(!this._connectionPending){return}this._connectionPending=h;
var l,j;var k=i.BENCHMARK_BINDING_SETUP;if(k){i.Benchmark.start("SC.Binding.connect()")
}l=this._fromPropertyPath;j=this._fromRoot;if(i.typeOf(l)===i.T_STRING){if(l.indexOf(".")===0){l=l.slice(1);
if(!j){j=this._toRoot}}else{if(l.indexOf("*")===0){l=[this._fromRoot||this._toRoot,l.slice(1)];
j=null}}}i.Observers.addObserver(l,this,this.fromPropertyDidChange,j);if(!this._oneWay){l=this._toPropertyPath;
j=this._toRoot;i.Observers.addObserver(l,this,this.toPropertyDidChange,j)}if(k){i.Benchmark.end("SC.Binding.connect()")
}if(this._syncOnConnect){this._syncOnConnect=h;if(k){i.Benchmark.start("SC.Binding.connect().sync")
}this.sync();if(k){i.Benchmark.end("SC.Binding.connect().sync")}}},disconnect:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._connectionPending=h}else{i.Observers.removeObserver(this._fromPropertyPath,this,this.fromPropertyDidChange,this._fromRoot);
if(!this._oneWay){i.Observers.removeObserver(this._toPropertyPath,this,this.toPropertyDidChange,this._toRoot)
}}this.isConnected=h;return this},fromPropertyDidChange:function(l,k){var j=l?l.get(k):null;
if(j!==this._bindingValue){this._setBindingValue(l,k);this._changePending=f;i.Binding._changeQueue.add(this)
}},toPropertyDidChange:function(l,k){if(this._oneWay){return}var j=l.get(k);if(j!==this._transformedBindingValue){this._setBindingValue(l,k);
this._changePending=f;i.Binding._changeQueue.add(this)}},_setBindingValue:function(k,j){this._bindingSource=k;
this._bindingKey=j},_computeBindingValue:function(){var p=this._bindingSource,n=this._bindingKey,l;
if(!p){return}this._bindingValue=l=p.getPath(n);var o=this._transforms;if(o){var k=o.length;
for(var j=0;j<k;j++){var m=o[j];l=m(l,this)}}if(this._noError&&i.typeOf(l)===i.T_ERROR){l=null
}this._transformedBindingValue=l},_connectQueue:i.CoreSet.create(),_alternateConnectQueue:i.CoreSet.create(),_changeQueue:i.CoreSet.create(),_alternateChangeQueue:i.CoreSet.create(),_changePending:h,flushPendingChanges:function(){if(this._isFlushing){return h
}this._isFlushing=f;i.Observers.suspendPropertyObserving();var k=h;var l=i.LOG_BINDINGS;
var j,m;while((j=this._connectQueue).length>0){this._connectQueue=this._alternateConnectQueue;
this._alternateConnectQueue=j;while(m=j.pop()){m._connect()}}while((j=this._changeQueue).length>0){if(l){console.log("Begin: Trigger changed bindings")
}k=f;this._changeQueue=this._alternateChangeQueue;this._alternateChangeQueue=j;while(m=j.pop()){m.applyBindingValue()
}if(l){console.log("End: Trigger changed bindings")}}this._isFlushing=h;i.Observers.resumePropertyObserving();
return k},applyBindingValue:function(){this._changePending=h;this._computeBindingTargets();
this._computeBindingValue();var j=this._bindingValue;var k=this._transformedBindingValue;
var l=i.BENCHMARK_BINDING_NOTIFICATIONS;var m=i.LOG_BINDINGS;if(!this._oneWay&&this._fromTarget){if(m){console.log("%@: %@ -> %@".fmt(this,j,k))
}if(l){i.Benchmark.start(this.toString()+"->")}this._fromTarget.setPathIfChanged(this._fromPropertyKey,j);
if(l){i.Benchmark.end(this.toString()+"->")}}if(this._toTarget){if(m){console.log("%@: %@ <- %@".fmt(this,j,k))
}if(l){i.Benchmark.start(this.toString()+"<-")}this._toTarget.setPathIfChanged(this._toPropertyKey,k);
if(l){i.Benchmark.start(this.toString()+"<-")}}},sync:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._syncOnConnect=f}else{this._computeBindingTargets();
var l=this._fromTarget;var k=this._fromPropertyKey;if(!l||!k){return this}var j=l.getPath(k);
if(j!==this._bindingValue){this._setBindingValue(l,k);this._changePending=f;i.Binding._changeQueue.add(this)
}}return this},_syncOnConnect:h,_computeBindingTargets:function(){if(!this._fromTarget){var l,k,j;
l=this._fromPropertyPath;k=this._fromRoot;if(i.typeOf(l)===i.T_STRING){if(l.indexOf(".")===0){l=l.slice(1);
if(!k){k=this._toRoot}}else{if(l.indexOf("*")===0){l=[k||this._toRoot,l.slice(1)];
k=null}}}j=i.tupleForPropertyPath(l,k);if(j){this._fromTarget=j[0];this._fromPropertyKey=j[1]
}}if(!this._toTarget){l=this._toPropertyPath;k=this._toRoot;j=i.tupleForPropertyPath(l,k);
if(j){this._toTarget=j[0];this._toPropertyKey=j[1]}}},oneWay:function(l,j){if((j===undefined)&&(i.typeOf(l)===i.T_BOOL)){j=l;
l=null}var k=this.from(l);if(k===i.Binding){k=k.beget()}k._oneWay=(j===undefined)?f:j;
return k},transform:function(k){var l=(this===i.Binding)?this.beget():this;var j=l._transforms;
if(j&&(j===l.parentBinding._transform)){j=l._transforms=j.slice()}if(!j){j=l._transforms=[]
}j.push(k);return l},resetTransforms:function(){var j=(this===i.Binding)?this.beget():this;
j._transforms=null;return j},noError:function(l,j){if((j===undefined)&&(i.typeOf(l)===i.T_BOOL)){j=l;
l=null}var k=this.from(l);if(k===i.Binding){k=k.beget()}k._noError=(j===undefined)?f:j;
return k},single:function(k,j){if(j===undefined){j=i.MULTIPLE_PLACEHOLDER}return this.from(k).transform(function(n,m){if(n&&n.isEnumerable){var l=n.get("length");
n=(l>1)?j:(l<=0)?null:n.firstObject()}return n})},notEmpty:function(k,j){if(j===undefined){j=i.EMPTY_PLACEHOLDER
}return this.from(k).transform(function(m,l){if(i.none(m)||(m==="")||(i.isArray(m)&&m.length===0)){m=j
}return m})},notNull:function(k,j){if(j===undefined){j=i.EMPTY_PLACEHOLDER}return this.from(k).transform(function(m,l){if(i.none(m)){m=j
}return m})},multiple:function(j){return this.from(j).transform(function(k){if(!i.isArray(k)){k=(k==null)?[]:[k]
}return k})},bool:function(j){return this.from(j).transform(function(k){var l=i.typeOf(k);
if(l===i.T_ERROR){return k}return(l==i.T_ARRAY)?(k.length>0):(k==="")?h:!!k})},not:function(j){return this.from(j).transform(function(k){var l=i.typeOf(k);
if(l===i.T_ERROR){return k}return !((l==i.T_ARRAY)?(k.length>0):(k==="")?h:!!k)})
},isNull:function(j){return this.from(j).transform(function(k){var l=i.typeOf(k);
return(l===i.T_ERROR)?k:i.none(k)})},toString:function(){var l=this._fromRoot?"<%@>:%@".fmt(this._fromRoot,this._fromPropertyPath):this._fromPropertyPath;
var k=this._toRoot?"<%@>:%@".fmt(this._toRoot,this._toPropertyPath):this._toPropertyPath;
var j=this._oneWay?"[oneWay]":"";return"SC.Binding%@(%@ -> %@)%@".fmt(i.guidFor(this),l,k,j)
}};i.binding=function(k,j){return i.Binding.from(k,j)}});tiki.module("sproutcore/runtime:system/cookie",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:system/object");"import core";"import system/object";"export package";
i.Cookie=i.Object.extend({name:null,value:"",expires:null,path:null,domain:null,secure:h,isCookie:f,destroy:function(){this.set("expires",-1);
this.write();arguments.callee.base.apply(this,arguments)},write:function(){var k=this.get("name"),r=this.get("value"),l=this.get("expires"),t=this.get("path"),n=this.get("domain"),j=this.get("secure");
var q="";if(l&&(i.typeOf(l)===i.T_NUMBER||(i.DateTime&&l.get&&l.get("milliseconds"))||i.typeOf(l.toUTCString)===i.T_FUNCTION)){var m;
if(i.typeOf(l)===i.T_NUMBER){m=new Date();m.setTime(m.getTime()+(l*24*60*60*1000))
}else{if(i.DateTime&&l.get&&l.get("milliseconds")){m=new Date(l.get("milliseconds"))
}else{if(i.typeOf(l.toUTCString)===i.T_FUNCTION){m=l}}}if(m){q="; expires="+m.toUTCString()
}}var s=t?"; path="+t:"";var p=n?"; domain="+n:"";var o=j?"; secure":"";document.cookie=[k,"=",encodeURIComponent(r),q,s,p,o].join("");
return this}});i.Cookie.mixin({find:function(j){if(document.cookie&&document.cookie!=""){var m=document.cookie.split(";");
for(var l=0;l<m.length;l++){var k=String(m[l]).trim();if(k.substring(0,j.length+1)===(j+"=")){return i.Cookie.create({name:j,value:decodeURIComponent(k.substring(j.length+1))})
}}}return null}})});tiki.module("sproutcore/runtime:system/enumerator",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
"import core";"export package";i.Enumerator=function(j){this.enumerable=j;this.reset();
return this};i.Enumerator.prototype={nextObject:function(){var l=this._index;var j=this._length;
if(l>=j){return undefined}var k=this.enumerable.nextObject(l,this._previousObject,this._context);
this._previousObject=k;this._index=l+1;if(l>=j){this._context=i.Enumerator._pushContext(this._context)
}return k},reset:function(){var k=this.enumerable;if(!k){throw i.$error("Enumerator has been destroyed")
}this._length=k.get?k.get("length"):k.length;var j=this._length;this._index=0;this._previousObject=null;
this._context=(j>0)?i.Enumerator._popContext():null},destroy:function(){this.enumerable=this._length=this._index=this._previousObject=this._context=null
}};i.Enumerator.create=function(j){return new i.Enumerator(j)};i.Enumerator._popContext=function(){var j=this._contextCache?this._contextCache.pop():null;
return j||{}};i.Enumerator._pushContext=function(k){this._contextCache=this._contextCache||[];
var j=this._contextCache;j.push(k);return null}});tiki.module("sproutcore/runtime:system/error",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
"import core";"export package";i.Error=i.Object.extend({code:-1,message:"",errorValue:null,errorObject:function(){return this
}.property().cacheable(),label:null,toString:function(){return"SC.Error:%@:%@ (%@)".fmt(i.guidFor(this),this.get("message"),this.get("code"))
},isError:f});i.Error.desc=function(m,j,n,l){var k={message:m};if(j!==undefined){k.label=j
}if(l!==undefined){k.code=l}if(n!==undefined){k.errorValue=n}return this.create(k)
};i.$error=function(k,j,l,m){return i.Error.desc(k,j,l,m)};i.ok=function(j){return(j!==false)&&!(j&&j.isError)
};i.$ok=i.ok;i.val=function(j){if(j&&j.isError){return j.get?j.get("errorValue"):null
}else{return j}};i.$val=i.val;i.Error.HAS_MULTIPLE_VALUES=-100});tiki.module("sproutcore/runtime:system/index_set",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:mixins/enumerable");c("sproutcore/runtime:mixins/observable");
c("sproutcore/runtime:mixins/freezable");c("sproutcore/runtime:mixins/copyable");
"import core";"import mixins/enumerable";"import mixins/observable";"import mixins/freezable";
"import mixins/copyable";"export package";i.IndexSet=i.mixin({},i.Enumerable,i.Observable,i.Freezable,i.Copyable,{_sc_sliceContent:function(m){if(m.length<1000){return m.slice()
}var l=0,j=[],k=m[0];while(k!==0){j[l]=k;l=(k<0)?(0-k):k;k=m[l]}j[l]=0;this._hint(0,l,j);
return j},create:function(l,k){var j=i.beget(this);j.initObservable();if(l&&l.isIndexSet){j._content=this._sc_sliceContent(l._content);
j.max=l.max;j.length=l.length;j.source=l.source}else{j._content=[0];if(l!==undefined){j.add(l,k)
}}return j},isIndexSet:f,HINT_SIZE:256,length:0,max:0,min:function(){var j=this._content,k=j[0];
return(k===0)?-1:(k>0)?0:Math.abs(k)}.property("[]").cacheable(),firstObject:function(){return(this.get("length")>0)?this.get("min"):undefined
}.property(),rangeStartForIndex:function(l){var o=this._content,j=this.get("max"),k,n,m;
if(l>=j){return j}if(Math.abs(o[l])>l){return l}m=l-(l%i.IndexSet.HINT_SIZE);k=o[m];
if(k<0||k>l){k=m}n=Math.abs(o[k]);while(n<l){k=n;n=Math.abs(o[k])}return k},isEqual:function(l){if(l===this){return f
}if(!l||!l.isIndexSet||(l.max!==this.max)||(l.length!==this.length)){return h}var n=this._content,k=l._content,m=0,j=n[m];
do{if(k[m]!==j){return h}m=Math.abs(j);j=n[m]}while(m!==0);return f},indexBefore:function(k){if(k===0){return -1
}k--;var l=this._content,j=this.get("max"),m=this.rangeStartForIndex(k);if(!l){return null
}while((m===j)||(l[m]<0)){if(m===0){return -1}k=m-1;m=this.rangeStartForIndex(k)}return k
},indexAfter:function(k){var m=this._content,j=this.get("max"),n,l;if(!m||(k>=j)){return -1
}k++;n=this.rangeStartForIndex(k);l=m[n];while(l<0){if(l===0){return -1}k=n=Math.abs(l);
l=m[n]}return k},contains:function(p,l){var k,o,j,n,m;if(l===undefined){if(p===null||p===undefined){return h
}if(typeof p===i.T_NUMBER){l=1}else{if(p&&p.isIndexSet){if(p===this){return f}k=p._content;
o=0;j=k[o];while(j!==0){if((j>0)&&!this.contains(o,j-o)){return h}o=Math.abs(j);j=k[o]
}return f}else{l=p.length;p=p.start}}}n=this.rangeStartForIndex(p);m=this._content[n];
return(m>0)&&(n<=p)&&(m>=(p+l))},intersects:function(o,l){var k,n,j,m;if(l===undefined){if(typeof o===i.T_NUMBER){l=1
}else{if(o&&o.isIndexSet){if(o===this){return f}k=o._content;n=0;j=k[n];while(j!==0){if((j>0)&&this.intersects(n,j-n)){return f
}n=Math.abs(j);j=k[n]}return h}else{l=o.length;o=o.start}}}n=this.rangeStartForIndex(o);
k=this._content;j=k[n];m=o+l;while(n<m){if(j===0){return h}if((j>0)&&(j>o)){return f
}n=Math.abs(j);j=k[n]}return h},without:function(k,j){if(k===this){return i.IndexSet.create()
}return this.clone().remove(k,j)},replace:function(l,j){if(j===undefined){if(typeof l===i.T_NUMBER){j=1
}else{if(l&&l.isIndexSet){this._content=this._sc_sliceContent(l._content);this.beginPropertyChanges().set("max",l.max).set("length",l.length).set("source",l.source).enumerableContentDidChange().endPropertyChanges();
return this}else{j=l.length;l=l.start}}}var k=this.length;this._content.length=1;
this._content[0]=0;this.length=this.max=0;return this.add(l,j)},add:function(j,k){if(this.isFrozen){throw i.FROZEN_ERROR
}var n,r,m;if(j&&j.isIndexSet){n=j._content;if(!n){return this}r=0;m=n[0];while(m!==0){if(m>0){this.add(r,m-r)
}r=m<0?0-m:m;m=n[r]}return this}else{if(k===undefined){if(j===null||j===undefined){return this
}else{if(typeof j===i.T_NUMBER){k=1}else{k=j.length;j=j.start}}}else{if(k===null){k=1
}}}if(k<=0){return this}var o=this.get("max"),l=o,q,p;n=this._content;if(j===o){if(j>0){r=this.rangeStartForIndex(j-1);
m=n[r];if(m>0){delete n[o];n[r]=o=j+k;j=r}else{n[o]=o=j+k}}else{n[j]=o=k}n[o]=0;this.set("max",o);
this.set("length",this.length+k);k=o-j}else{if(j>o){n[o]=0-j;n[j]=j+k;n[j+k]=0;this.set("max",j+k);
this.set("length",this.length+k);k=j+k-o;j=o}else{r=this.rangeStartForIndex(j);m=n[r];
o=j+k;q=0;if((j>0)&&(r===j)&&(m<=0)){r=this.rangeStartForIndex(j-1);m=n[r]}if(m<0){n[r]=0-j;
if(Math.abs(m)>o){n[j]=0-o;n[o]=m}else{n[j]=m}}else{j=r;if(m>o){o=m}}r=j;while(r<o){p=n[r];
if(p===0){n[o]=0;m=o;q+=o-r}else{m=Math.abs(p);if(m>o){n[o]=p;m=o}if(p<0){q+=m-r}}delete n[r];
r=m}if((r=n[o])>0){delete n[o];o=r}n[j]=o;if(o>l){this.set("max",o)}this.set("length",this.get("length")+q);
k=o-j}}this._hint(j,k);if(q!==0){this.enumerableContentDidChange()}return this},remove:function(j,k){if(this.isFrozen){throw i.FROZEN_ERROR
}if(k===undefined){if(j===null||j===undefined){return this}else{if(typeof j===i.T_NUMBER){k=1
}else{if(j.isIndexSet){j.forEachRange(this.remove,this);return this}else{k=j.length;
j=j.start}}}}if(k<=0){return this}var o=this.get("max"),l=o,n=this._content,s,m,r,p,q;
if(j>=o){return this}s=this.rangeStartForIndex(j);m=n[s];q=j+k;r=0;if((j>0)&&(s===j)&&(m>0)){s=this.rangeStartForIndex(j-1);
m=n[s]}if(m>0){n[s]=j;if(m>q){n[j]=q;n[q]=m}else{n[j]=m}}else{j=s;m=Math.abs(m);if(m>q){q=m
}}s=j;while(s<q){p=n[s];if(p===0){n[q]=0;m=q}else{m=Math.abs(p);if(m>q){n[q]=p;m=q
}if(p>0){r+=m-s}}delete n[s];s=m}if((s=n[q])<0){delete n[q];q=Math.abs(s)}if(n[q]===0){delete n[q];
n[j]=0;this.set("max",j)}else{n[j]=0-q}this.set("length",this.get("length")-r);k=q-j;
this._hint(j,k);if(r!==0){this.enumerableContentDidChange()}return this},_hint:function(p,m,l){if(l===undefined){l=this._content
}var k=i.IndexSet.HINT_SIZE,j=Math.abs(l[p]),o=p-(p%k)+k,n=p+m;while(o<n){while((j!==0)&&(j<=o)){p=j;
j=Math.abs(l[p])}if(j===0){delete l[o]}else{if(o!==p){l[o]=p}}o+=k}},clear:function(){if(this.isFrozen){throw i.FROZEN_ERROR
}var j=this.length;this._content.length=1;this._content[0]=0;this.set("length",0).set("max",0);
if(j>0){this.enumerableContentDidChange()}},addEach:function(k){if(this.isFrozen){throw i.FROZEN_ERROR
}this.beginPropertyChanges();var j=k.get("length");if(k.isSCArray){while(--j>=0){this.add(k.objectAt(j))
}}else{if(k.isEnumerable){k.forEach(function(l){this.add(l)},this)}}this.endPropertyChanges();
return this},removeEach:function(k){if(this.isFrozen){throw i.FROZEN_ERROR}this.beginPropertyChanges();
var j=k.get("length");if(k.isSCArray){while(--j>=0){this.remove(k.objectAt(j))}}else{if(k.isEnumerable){k.forEach(function(l){this.remove(l)
},this)}}this.endPropertyChanges();return this},clone:function(){return i.IndexSet.create(this)
},inspect:function(){var n=this._content,k=n.length,j=0,l=[],m;for(j=0;j<k;j++){m=n[j];
if(m!==undefined){l.push("%@:%@".fmt(j,m))}}return"SC.IndexSet<%@>".fmt(l.join(" , "))
},forEachRange:function(o,m){var k=this._content,n=0,j=k[n],l=this.source;if(m===undefined){m=null
}while(j!==0){if(j>0){o.call(m,n,j-n,this,l)}n=Math.abs(j);j=k[n]}return this},forEachIn:function(k,l,s,o){var p=this._content,r=0,q=0,m=k+l,j=this.source,n=p[r];
if(o===undefined){o=null}while(n!==0){if(r<k){r=k}while((r<n)&&(r<m)){s.call(o,r++,q++,this,j)
}if(r>=m){r=n=0}else{r=Math.abs(n);n=p[r]}}return this},lengthIn:function(p,m){var j=0;
if(m===undefined){if(p===null||p===undefined){return 0}else{if(typeof p===i.T_NUMBER){m=1
}else{if(p.isIndexSet){p.forEachRange(function(r,q){j+=this.lengthIn(r,q)},this);
return j}else{m=p.length;p=p.start}}}}if(this.get("length")===0){return 0}var l=this._content,o=0,k=l[o],n=p+m;
while(o<n&&k!==0){if(k>0){j+=(k>n)?n-o:k-o}o=Math.abs(k);k=l[o]}return j},source:null,indexOf:function(m,l){var o=this.source;
if(!o){throw"%@.indexOf() requires source".fmt(this)}var k=o.get("length"),n=this._content,p=n[0]<0?Math.abs(n[0]):0,j;
while(p>=0&&p<k){j=o.indexOf(m,p);if(j<0){return -1}if(this.contains(j)){return j
}p=j+1}return -1},lastIndexOf:function(m,l){var n=this.source;if(!n){throw"%@.lastIndexOf() requires source".fmt(this)
}var k=n.get("length"),o=this.max-1,j;if(o>=k){o=k-1}while(o>=0){j=n.lastIndexOf(m,o);
if(j<0){return -1}if(this.contains(j)){return j}o=j+1}return -1},forEachObject:function(p,n){var m=this.source;
if(!m){throw"%@.forEachObject() requires source".fmt(this)}var l=this._content,o=0,j=0,k=l[o];
if(n===undefined){n=null}while(k!==0){while(o<k){p.call(n,m.objectAt(o),o,m,this);
o++}o=Math.abs(k);k=l[o]}return this},addObject:function(l,m){var n=this.source;if(!n){throw"%@.addObject() requires source".fmt(this)
}var k=n.get("length"),o=0,j;while(o>=0&&o<k){j=n.indexOf(l,o);if(j>=0){this.add(j);
if(m){return this}o=j++}else{return this}}return this},addObjects:function(k,j){k.forEach(function(l){this.addObject(l,j)
},this);return this},removeObject:function(l,m){var n=this.source;if(!n){throw"%@.removeObject() requires source".fmt(this)
}var k=n.get("length"),o=0,j;while(o>=0&&o<k){j=n.indexOf(l,o);if(j>=0){this.remove(j);
if(m){return this}o=j+1}else{return this}}return this},removeObjects:function(k,j){k.forEach(function(l){this.removeObject(l,j)
},this);return this},LOG_OBSERVING:h,forEach:function(p,n){var l=this._content,o=0,j=0,m=this.source,k=l[o];
if(n===undefined){n=null}while(k!==0){while(o<k){p.call(n,o++,j++,this,m)}o=Math.abs(k);
k=l[o]}return this},nextObject:function(o,k,l){var n=this._content,m=l.next,j=this.get("max");
if(k===null){k=m=0}else{if(k>=j){delete l.next;return null}else{k++}}if(k===m){do{k=Math.abs(m);
m=n[k]}while(m<0);l.next=m}return k},toString:function(){var j=[];this.forEachRange(function(l,k){j.push(k===1?l:"%@..%@".fmt(l,l+k-1))
},this);return"SC.IndexSet<%@>".fmt(j.join(","))},max:0});i.IndexSet.slice=i.IndexSet.copy=i.IndexSet.clone;
i.IndexSet.EMPTY=i.IndexSet.create().freeze()});tiki.module("sproutcore/runtime:system/logger",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:system/object");"import core";"import system/object";"export package";
i.LOGGER_LOG_DELIMITER=", ";i.LOGGER_LOG_ERROR="ERROR: ";i.LOGGER_LOG_INFO="INFO: ";
i.LOGGER_LOG_WARN="WARNING: ";i.Logger=i.Object.create({exists:function(){return typeof(this.get("reporter"))!=="undefined"&&this.get("reporter")!=null
}.property("reporter").cacheable(),fallBackOnAlert:h,fallBackOnLog:f,format:f,reporter:console,log:function(){var j=this.get("reporter");
if(this.get("exists")&&typeof(j.log)==="function"){if(this.get("format")){j.log(this._argumentsToString.apply(this,arguments))
}else{j.log.apply(j,arguments)}return true}else{if(this.fallBackOnAlert){var k=this.get("format")?this._argumentsToString.apply(this,arguments):arguments;
if(this.get("exists")&&typeof(j.alert)==="function"){j.alert(k)}else{alert(k)}return true
}}return false},dir:function(){var j=this.get("reporter");if(this.get("exists")&&typeof(j.dir)==="function"){j.dir.apply(j,arguments);
return true}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},dirxml:function(){var j=this.get("reporter");
if(this.get("exists")&&typeof(j.dirxml)==="function"){j.dirxml.apply(j,arguments);
return true}return(this.fallBackOnLog)?this.log.apply(this,arguments):false},error:function(){var k=this.get("reporter");
if(this.get("exists")&&typeof(k.error)==="function"){k.error.apply(k,arguments);return true
}else{if(this.fallBackOnLog){var j=this._argumentsToArray(arguments);if(typeof(j.unshift)==="function"){j.unshift(i.LOGGER_LOG_ERROR)
}return this.log.apply(this,j)}}return false},group:function(k){var j=this.get("reporter");
if(this.get("exists")&&typeof(j.group)==="function"){j.group(k);return true}return false
},groupEnd:function(){var j=this.get("reporter");if(this.get("exists")&&typeof(j.groupEnd)==="function"){j.groupEnd();
return true}return false},info:function(){var k=this.get("reporter");if(this.get("exists")&&typeof(k.info)==="function"){k.info.apply(k,arguments);
return true}else{if(this.fallBackOnLog){var j=this._argumentsToArray(arguments);if(typeof(j.unshift)==="function"){j.unshift(i.LOGGER_LOG_INFO)
}return this.log.apply(this,j)}}return false},profile:function(){var j=this.get("reporter");
if(this.get("exists")&&typeof(j.profile)==="function"){j.profile();return true}return false
},profileEnd:function(){var j=this.get("reporter");if(this.get("exists")&&typeof(j.profileEnd)==="function"){j.profileEnd();
return true}return false},time:function(k){var j=this.get("reporter");if(this.get("exists")&&typeof(j.time)==="function"){j.time(k);
return true}return false},timeEnd:function(k){var j=this.get("reporter");if(this.get("exists")&&typeof(j.timeEnd)==="function"){j.timeEnd(k);
return true}return false},trace:function(){var j=this.get("reporter");if(this.get("exists")&&typeof(j.trace)==="function"){j.trace();
return true}return false},warn:function(){var k=this.get("reporter");if(this.get("exists")&&typeof(k.warn)==="function"){k.warn.apply(k,arguments);
return true}else{if(this.fallBackOnLog){var j=this._argumentsToArray(arguments);if(typeof(j.unshift)==="function"){j.unshift(i.LOGGER_LOG_WARN)
}return this.log.apply(this,j)}}return false},_argumentsToArray:function(l){if(!l){return[]
}var j=[];for(var k=0;k<l.length;k++){j[k]=l[k]}return j},_argumentsToString:function(){var k="";
for(var j=0;j<arguments.length-1;j++){k+=arguments[j]+i.LOGGER_LOG_DELIMITER}k+=arguments[arguments.length-1];
return k}})});tiki.module("sproutcore/runtime:system/object",function(g,h,b){var a=g("sproutcore/runtime:core"),e=a.SC,k=a.SproutCore,j=a.YES,i=a.NO;
g("sproutcore/runtime:mixins/observable");g("sproutcore/runtime:system/set");"import core";
"import mixins/observable";"import system/set";"export package";e.BENCHMARK_OBJECTS=i;
e._object_extend=function c(r,q){if(!q){throw"SC.Object.extend expects a non-null value.  Did you forget to 'sc_require' something?  Or were you passing a Protocol to extend() as if it were a mixin?"
}r._kvo_cloned=null;var H,x,D,p,s=r.concatenatedProperties,v=e.K;var n,m;x=(s)?s.length:0;
var l=(x>0)?{}:null;while(--x>=0){H=s[x];n=r[H];m=q[H];if(n){if(!(n instanceof Array)){n=e.$A(n)
}l[H]=(m)?n.concat(m):m}else{if(!(m instanceof Array)){m=e.$A(m)}l[H]=m}}var G=r._bindings,w=i;
var E=r._observers,F=i;var t=r._properties,o=i;var A,u,y;var C=r.outlets,B=i;if(q.outlets){C=(C||e.EMPTY_ARRAY).concat(q.outlets);
B=j}for(H in q){if(H==="_kvo_cloned"){continue}if(!q.hasOwnProperty(H)){continue}var z=(l.hasOwnProperty(H)?l[H]:null)||q[H];
if(H.slice(-7)==="Binding"){if(!w){G=(G||e.EMPTY_ARRAY).slice();w=j}if(G===null){G=(r._bindings||e.EMPTY_ARRAY).slice()
}G[G.length]=H}else{if(z&&(z instanceof Function)){if(!z.superclass&&(z!==(p=r[H]))){z.superclass=z.base=p||v
}if(z.propertyPaths){if(!F){E=(E||e.EMPTY_ARRAY).slice();F=j}E[E.length]=H}else{if(A=z.localPropertyPaths){u=A.length;
while(--u>=0){y=r._kvo_for(e.keyFor("_kvo_local",A[u]),e.Set);y.add(H);r._kvo_for("_kvo_observed_keys",e.CoreSet).add(A[u])
}}else{if(z.dependentKeys){if(!o){t=(t||e.EMPTY_ARRAY).slice();o=j}t[t.length]=H}else{if(z.autoconfiguredOutlet){if(!B){C=(C||e.EMPTY_ARRAY).slice();
B=j}C[C.length]=H}}}}}}r[H]=z}if(q.hasOwnProperty("toString")){H="toString";z=(l.hasOwnProperty(H)?l[H]:null)||q[H];
if(!z.superclass&&(z!==(p=r[H]))){z.superclass=z.base=p||v}r[H]=z}r._bindings=G||[];
r._observers=E||[];r._properties=t||[];r.outlets=C||[];return r};e.Object=function(l){return this._object_init(l)
};e.mixin(e.Object,{mixin:function(m){var l=arguments.length,n;for(n=0;n<l;n++){e.mixin(this,arguments[n])
}return this},superclass:null,extend:function(p){var o=e.BENCHMARK_OBJECTS;if(o){e.Benchmark.start("SC.Object.extend")
}var r,n=function(s){return this._object_init(s)};for(r in this){if(!this.hasOwnProperty(r)){continue
}n[r]=this[r]}if(this.hasOwnProperty("toString")){n.toString=this.toString}n.superclass=this;
e.generateGuid(n);n.subclasses=e.Set.create();this.subclasses.add(n);var q=(n.prototype=e.beget(this.prototype));
var m,l=arguments.length;for(m=0;m<l;m++){e._object_extend(q,arguments[m])}q.constructor=n;
if(o){e.Benchmark.end("SC.Object.extend")}return n},create:function(l){var m=this;
return new m(arguments)},isClass:j,subclasses:e.Set.create(),toString:function(){return e._object_className(this)
},subclassOf:function(m){if(this===m){return i}var l=this;while(l=l.superclass){if(l===m){return j
}}return i},hasSubclass:function(l){return(l&&l.subclassOf)?l.subclassOf(this):i},kindOf:function(l){return(this===l)||this.subclassOf(l)
}});e.Object.prototype={_kvo_enabled:j,_object_init:function(n){var m,l=(n)?n.length:0;
for(m=0;m<l;m++){e._object_extend(this,n[m])}e.generateGuid(this);this.init();var o=this.initMixin;
l=(o)?o.length:0;for(m=0;m<l;m++){o[m].call(this)}return this},mixin:function(){var m,l=arguments.length;
for(m=0;m<l;m++){e.mixin(this,arguments[m])}for(m=0;m<l;m++){var n=arguments[m].initMixin;
if(n){n.call(this)}}return this},init:function(){this.initObservable();return this
},isDestroyed:i,destroy:function(){if(this.get("isDestroyed")){return this}this.set("isDestroyed",j);
var m,n=this.destroyMixin,l=(n)?n.length:0;for(m=0;m<l;m++){n[m].call(this)}return this
},isObject:true,respondsTo:function(l){return !!(e.typeOf(this[l])===e.T_FUNCTION)
},tryToPerform:function(m,n,l){return this.respondsTo(m)&&(this[m](n,l)!==i)},superclass:function(m){var l=arguments.callee.caller;
if(!l){throw"superclass cannot determine the caller method"}return l.superclass?l.superclass.apply(this,arguments):null
},instanceOf:function(l){return this.constructor===l},kindOf:function(l){return this.constructor.kindOf(l)
},toString:function(){if(!this._object_toString){var l=e._object_className(this.constructor);
var m="%@:%@".fmt(l,e.guidFor(this));if(l){this._object_toString=m}else{return m}}return this._object_toString
},awake:function(l){this.outlets.forEach(function(m){this.get(m)},this);this.bindings.invoke("sync")
},invokeOnce:function(l){e.RunLoop.currentRunLoop.invokeOnce(this,l);return this},invokeLast:function(l){e.RunLoop.currentRunLoop.invokeLast(this,l);
return this},concatenatedProperties:["concatenatedProperties","initMixin","destroyMixin"]};
e.Object.prototype.constructor=e.Object;e.mixin(e.Object.prototype,e.Observable);
function f(){if(e._object_foundObjectClassNames){return}e._object_foundObjectClassNames=true;
var m=[];var l=function(n,o,r){r--;if(m.indexOf(o)>=0){return}m.push(o);for(var p in o){if(p=="__scope__"){continue
}if(p=="superclass"){continue}if(!p.match(/^[A-Z0-9]/)){continue}var s=(n)?[n,p].join("."):p;
var q=o[p];switch(e.typeOf(q)){case e.T_CLASS:if(!q._object_className){q._object_className=s
}if(r>=0){l(s,q,r)}break;case e.T_OBJECT:if(r>=0){l(s,q,r)}break;case e.T_HASH:if(((n)||(s==="SC"))&&(r>=0)){l(s,q,r)
}break;default:break}}};l(null,g("system:package").global,2)}e.instanceOf=function(l,m){return !!(l&&l.constructor===m)
};e.kindOf=function(l,m){if(l&&!l.isClass){l=l.constructor}return !!(l&&l.kindOf&&l.kindOf(m))
};e._object_className=function(m){if(!e.isReady){return""}if(!m._object_className){f()
}if(m._object_className){return m._object_className}var l=m;while(l&&!l._object_className){l=l.superclass
}return(l&&l._object_className)?l._object_className:"Anonymous"}});tiki.module("sproutcore/runtime:system/range_observer",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:private/observer_queue");c("sproutcore/runtime:system/index_set");
"import core";"import private/observer_queue";"import system/index_set";"export package";
i.RangeObserver={isRangeObserver:f,toString:function(){var j=this.indexes?this.indexes.toString():"SC.IndexSet<..>";
return j.replace("IndexSet","RangeObserver(%@)".fmt(i.guidFor(this)))},create:function(m,o,n,p,l,j){var k=i.beget(this);
k.source=m;k.indexes=o?o.frozenCopy():null;k.target=n;k.method=p;k.context=l;k.isDeep=j||h;
k.beginObserving();return k},extend:function(n){var m=i.beget(this),l=arguments,k=l.length,j;
for(j=0;j<k;j++){i.mixin(m,l[j])}return m},destroy:function(j){this.endObserving();
return this},update:function(j,k){if(this.indexes&&this.indexes.isEqual(k)){return this
}this.indexes=k?k.frozenCopy():null;this.endObserving().beginObserving();return this
},beginObserving:function(){if(!this.isDeep){return this}var k=this.observing;if(!k){k=this.observing=i.CoreSet.create()
}var j=this._beginObservingForEach;if(!j){j=this._beginObservingForEach=function(l){var m=this.source.objectAt(l);
if(m&&m.addObserver){k.push(m);m._kvo_needsRangeObserver=f}}}this.indexes.forEach(j,this);
this.isObserving=h;i.Observers.addPendingRangeObserver(this);return this},setupPending:function(j){var m=this.observing;
if(this.isObserving||!m||(m.get("length")===0)){return f}if(m.contains(j)){this.isObserving=f;
var k=this._setupPendingForEach;if(!k){var l=this.source,n=this.objectPropertyDidChange;
k=this._setupPendingForEach=function(o){var r=this.source.objectAt(o),p=i.guidFor(r),q;
if(r&&r.addObserver){m.push(r);r.addObserver("*",this,n);q=this[p];if(q===undefined||q===null){this[p]=o
}else{if(q.isIndexSet){q.add(o)}else{q=this[p]=i.IndexSet.create(q).add(o)}}}}}this.indexes.forEach(k,this);
return f}else{return h}},endObserving:function(){if(!this.isDeep){return this}var n=this.observing;
if(this.isObserving){var k=this.objectPropertyDidChange,l=this.source,j,o,m;if(n){o=n.length;
for(j=0;j<o;j++){m=n[j];m.removeObserver("*",this,k);this[i.guidFor(m)]=null}n.length=0
}this.isObserving=h}if(n){n.clear()}return this},rangeDidChange:function(k){var j=this.indexes;
if(!k||!j||j.intersects(k)){this.endObserving();this.method.call(this.target,this.source,null,"[]",k,this.context);
this.beginObserving()}return this},objectPropertyDidChange:function(m,o,p,j){var n=this.context,q=this.method,l=i.guidFor(m),k=this[l];
if(k&&!k.isIndexSet){k=this[l]=i.IndexSet.create(k).freeze()}if(n){q.call(this.target,this.source,m,o,k,n,j)
}else{q.call(this.target,this.source,m,o,k,j)}}}});tiki.module("sproutcore/runtime:system/run_loop",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:private/observer_set");c("sproutcore/runtime:system/object");
"import core";"import private/observer_set";"import system/object";"export package";
i.RunLoop=i.Object.extend({beginRunLoop:function(){this._start=new Date().getTime();
if(i.LOG_BINDINGS||i.LOG_OBSERVERS){console.log("-- SC.RunLoop.beginRunLoop at %@".fmt(this._start))
}return this},endRunLoop:function(){var j;if(i.LOG_BINDINGS||i.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ flushing application queues")
}do{j=this.flushApplicationQueues();if(!j){j=this._flushinvokeLastQueue()}}while(j);
this._start=null;if(i.LOG_BINDINGS||i.LOG_OBSERVERS){console.log("-- SC.RunLoop.endRunLoop ~ End")
}return this},invokeOnce:function(j,k){if(k===undefined){k=j;j=this}if(i.typeOf(k)===i.T_STRING){k=j[k]
}if(!this._invokeQueue){this._invokeQueue=i.ObserverSet.create()}this._invokeQueue.add(j,k);
return this},invokeLast:function(j,k){if(k===undefined){k=j;j=this}if(i.typeOf(k)===i.T_STRING){k=j[k]
}if(!this._invokeLastQueue){this._invokeLastQueue=i.ObserverSet.create()}this._invokeLastQueue.add(j,k);
return this},flushApplicationQueues:function(){var k=h;var j=this._invokeQueue;if(j&&j.targets>0){this._invokeQueue=null;
k=f;j.invokeMethods()}return i.Binding.flushPendingChanges()||k},_flushinvokeLastQueue:function(){var j=this._invokeLastQueue,k=h;
if(j&&j.targets>0){this._invokeLastQueue=null;k=f;if(k){j.invokeMethods()}}return k
}});i.RunLoop.currentRunLoop=null;i.RunLoop.runLoopClass=i.RunLoop;i.RunLoop.begin=function(){var j=this.currentRunLoop;
if(!j){j=this.currentRunLoop=this.runLoopClass.create()}j.beginRunLoop();return this
};i.RunLoop.end=function(){var j=this.currentRunLoop;if(!j){throw"SC.RunLoop.end() called outside of a runloop!"
}j.endRunLoop();return this};i.run=function(k,j){i.RunLoop.begin();k.call(j);i.RunLoop.end()
}});tiki.module("sproutcore/runtime:system/selection_set",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:system/object");c("sproutcore/runtime:mixins/enumerable");c("sproutcore/runtime:mixins/copyable");
c("sproutcore/runtime:mixins/freezable");c("sproutcore/runtime:system/set");c("sproutcore/runtime:system/index_set");
"import core";"import system/object";"import mixins/enumerable";"import mixins/copyable";
"import mixins/freezable";"import system/set";"import system/index_set";"export package";
i.SelectionSet=i.Object.extend(i.Enumerable,i.Freezable,i.Copyable,{isSelectionSet:f,length:function(){var j=0,k=this._sets,l=this._objects;
if(l){j+=l.get("length")}if(k){k.forEach(function(m){j+=m.get("length")})}return j
}.property().cacheable(),sources:function(){var l=[],m=this._sets,k=m?m.length:0,j,o,n;
for(j=0;j<k;j++){o=m[j];if(o&&o.get("length")>0&&o.source){l.push(o.source)}}return l
}.property().cacheable(),indexSetForSource:function(n){if(!n||!n.isSCArray){return null
}var k=this._indexSetCache,m=this._objects,l,j;if(!k){k=this._indexSetCache={}}l=k[i.guidFor(n)];
if(l&&l._sourceRevision&&(l._sourceRevision!==n.propertyRevision)){l=null}if(!l){l=this._indexSetForSource(n,h);
if(l&&l.get("length")===0){l=null}if(m){if(l){l=l.copy()}m.forEach(function(p){if((j=n.indexOf(p))>=0){if(!l){l=i.IndexSet.create()
}l.add(j)}},this)}if(l){l=k[i.guidFor(n)]=l.frozenCopy();l._sourceRevision=n.propertyRevision
}}return l},_indexSetForSource:function(o,p){if(p===undefined){p=f}var m=i.guidFor(o),l=this[m],n=this._sets,j=n?n.length:0,k=null;
if(l>=j){l=null}if(i.none(l)){if(p&&!this.isFrozen){this.propertyWillChange("sources");
if(!n){n=this._sets=[]}k=n[j]=i.IndexSet.create();k.source=o;this[m]=j;this.propertyDidChange("sources")
}}else{k=n?n[l]:null}return k},add:function(j,k,m){if(this.isFrozen){throw i.FROZEN_ERROR
}var p,o,s,r,l,n,q,t;if(k===undefined&&m===undefined){if(!j){throw"Must pass params to SC.SelectionSet.add()"
}if(j.isIndexSet){return this.add(j.source,j)}if(j.isSelectionSet){p=j._sets;t=j._objects;
o=p?p.length:0;this.beginPropertyChanges();for(s=0;s<o;s++){r=p[s];if(r&&r.get("length")>0){this.add(r.source,r)
}}if(t){this.addObjects(t)}this.endPropertyChanges();return this}}r=this._indexSetForSource(j,f);
l=this.get("length");q=r.get("length");n=l-q;r.add(k,m);this._indexSetCache=null;
n+=r.get("length");if(n!==l){this.propertyDidChange("length");this.enumerableContentDidChange();
if(q===0){this.notifyPropertyChange("sources")}}return this},remove:function(j,k,m){if(this.isFrozen){throw i.FROZEN_ERROR
}var p,o,s,r,l,n,q,t;if(k===undefined&&m===undefined){if(!j){throw"Must pass params to SC.SelectionSet.remove()"
}if(j.isIndexSet){return this.remove(j.source,j)}if(j.isSelectionSet){p=j._sets;t=j._objects;
o=p?p.length:0;this.beginPropertyChanges();for(s=0;s<o;s++){r=p[s];if(r&&r.get("length")>0){this.remove(r.source,r)
}}if(t){this.removeObjects(t)}this.endPropertyChanges();return this}}r=this._indexSetForSource(j,f);
l=this.get("length");n=l-r.get("length");if(r&&(t=this._objects)){if(m!==undefined){k=i.IndexSet.create(k,m);
m=undefined}t.forEach(function(u){s=j.indexOf(u);if(k.contains(s)){t.remove(u);n--
}},this)}r.remove(k,m);q=r.get("length");n+=q;this._indexSetCache=null;if(n!==l){this.propertyDidChange("length");
this.enumerableContentDidChange();if(q===0){this.notifyPropertyChange("sources")}}return this
},contains:function(k,m,j){if(m===undefined&&j===undefined){return this.containsObject(k)
}var l=this.indexSetForSource(k);if(!l){return h}return l.contains(m,j)},intersects:function(k,m,j){var l=this.indexSetForSource(k,h);
if(!l){return h}return l.intersects(m,j)},_TMP_ARY:[],addObject:function(k){var l=this._TMP_ARY,j;
l[0]=k;j=this.addObjects(l);l.length=0;return j},addObjects:function(j){var m=this._objects,k,l;
if(!m){m=this._objects=i.CoreSet.create()}k=m.get("length");m.addEach(j);l=m.get("length");
this._indexSetCache=null;if(l!==k){this.propertyDidChange("length");this.enumerableContentDidChange()
}return this},removeObject:function(k){var l=this._TMP_ARY,j;l[0]=k;j=this.removeObjects(l);
l.length=0;return j},removeObjects:function(k){var n=this._objects,l,m,j;if(!n){return this
}l=n.get("length");n.removeEach(k);m=n.get("length");if(j=this._sets){j.forEach(function(o){l+=o.get("length");
o.removeObjects(k);m+=o.get("length")},this)}this._indexSetCache=null;if(m!==l){this.propertyDidChange("length");
this.enumerableContentDidChange()}return this},containsObject:function(l){var n=this._objects;
if(n&&n.contains(l)){return f}var m=this._sets,k=m?m.length:0,j,o;for(j=0;j<k;j++){o=m[j];
if(o&&o.indexOf(l)>=0){return f}}return h},constrain:function(m){var n,k,j,l;this.beginPropertyChanges();
this.get("sources").forEach(function(o){if(o===m){return}var p=this._indexSetForSource(m,h);
if(p){this.remove(m,p)}},this);n=this._indexSetForSource(m,h);if(n&&((j=n.get("max"))>(k=m.get("length")))){this.remove(m,k,j-k)
}if(l=this._objects){l.forEach(function(o){if(m.indexOf(o)<0){this.removeObject(o)
}},this)}this.endPropertyChanges();return this},isEqual:function(p){var o,m,k,j,l,n;
if(!p||!p.isSelectionSet){return h}if(p===this){return f}if((this._sets===p._sets)&&(this._objects===p._objects)){return f
}if(this.get("length")!==p.get("length")){return h}o=this._objects;m=p._objects;if(o||m){if((o?o.get("length"):0)!==(m?m.get("length"):0)){return h
}if(o&&!o.isEqual(m)){return h}}l=this.get("sources");j=l.get("length");for(k=0;k<j;
k++){n=l.objectAt(k);o=this._indexSetForSource(n,h);m=this._indexSetForSource(n,h);
if(!!m!==!!o){return h}if(o&&!o.isEqual(m)){return h}}return f},clear:function(){if(this.isFrozen){throw i.FROZEN_ERROR
}if(this._sets){this._sets.length=0}if(this._objects){this._objects=null}this._indexSetCache=null;
this.propertyDidChange("length");this.enumerableContentDidChange();this.notifyPropertyChange("sources");
return this},copy:function(){var l=this.constructor.create(),m=this._sets,k=m?m.length:0,j,n;
if(m&&k>0){m=l._sets=m.slice();for(j=0;j<k;j++){if(!(n=m[j])){continue}n=m[j]=n.copy();
l[i.guidFor(n.source)]=j}}if(this._objects){l._objects=this._objects.copy()}return l
},freeze:function(){if(this.isFrozen){return this}var j=this._sets,k=j?j.length:0,l;
while(--k>=0){if(l=j[k]){l.freeze()}}if(this._objects){this._objects.freeze()}return arguments.callee.base.apply(this,arguments)
},toString:function(){var j=this._sets||[];j=j.map(function(k){return k.toString().replace("SC.IndexSet",i.guidFor(k.source))
},this);if(this._objects){j.push(this._objects.toString())}return"SC.SelectionSet:%@<%@>".fmt(i.guidFor(this),j.join(","))
},firstObject:function(){var k=this._sets,l=this._objects;if(k&&k.get("length")>0){var n=k?k[0]:null,m=n?n.source:null,j=n?n.firstObject():-1;
if(m&&j>=0){return m.objectAt(j)}}return l?l.firstObject():undefined}.property(),nextObject:function(l,n,k){var m,j;
if(l===0){m=k.objects=[];this.forEach(function(p){m.push(p)},this);k.max=m.length
}m=k.objects;j=m[l];if(l+1>=k.max){k.objects=k.max=null}return j},forEach:function(p,n){var l=this._sets,m=this._objects,k=l?l.length:0,o,j;
for(j=0;j<k;j++){o=l[j];if(o){o.forEachObject(p,n)}}if(m){m.forEach(p,n)}return this
}});i.SelectionSet.prototype.clone=i.SelectionSet.prototype.copy;i.SelectionSet.EMPTY=i.SelectionSet.create().freeze()
});tiki.module("sproutcore/runtime:system/set",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:mixins/enumerable");c("sproutcore/runtime:mixins/copyable");
c("sproutcore/runtime:mixins/freezable");c("sproutcore/runtime:mixins/observable");
"import core";"import mixins/enumerable";"import mixins/copyable";"import mixins/freezable";
"import mixins/observable";"export package";i.Set=i.mixin({},i.Enumerable,i.Observable,i.Freezable,{create:function(k){var l,j,m=i.Set._pool,n=this.isObservable;
if(!n&&k===undefined&&m.length>0){l=m.pop()}else{l=i.beget(this);if(n){l.initObservable()
}if(k&&k.isEnumerable&&k.get("length")>0){l.isObservable=h;if(k.isSCArray){j=k.get?k.get("length"):k.length;
while(--j>=0){l.add(k.objectAt(j))}}else{if(k.isSet){j=k.length;while(--j>=0){l.add(k[j])
}}else{k.forEach(function(o){l.add(o)},this)}}l.isObservable=n}}return l},isSet:f,length:0,firstObject:function(){return(this.length>0)?this[0]:undefined
}.property(),clear:function(){if(this.isFrozen){throw i.FROZEN_ERROR}this.length=0;
return this},contains:function(k){if(k===null){return h}var j=this[i.hashFor(k)];
return(!i.none(j)&&(j<this.length)&&(this[j]===k))},isEqual:function(j){if(!j||!j.isSet||(j.get("length")!==this.get("length"))){return h
}var k=this.get("length");while(--k>=0){if(!j.contains(this[k])){return h}}return f
},add:function(m){if(this.isFrozen){throw i.FROZEN_ERROR}if(m===null||m===undefined){return this
}var l=i.hashFor(m);var k=this[l];var j=this.length;if((k===null||k===undefined)||(k>=j)||(this[k]!==m)){this[j]=m;
this[l]=j;this.length=j+1}if(this.isObservable){this.enumerableContentDidChange()
}return this},addEach:function(l){if(this.isFrozen){throw i.FROZEN_ERROR}if(!l||!l.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)
}var j,k=this.isObservable;if(k){this.beginPropertyChanges()}if(l.isSCArray){j=l.get("length");
while(--j>=0){this.add(l.objectAt(j))}}else{if(l.isSet){j=l.length;while(--j>=0){this.add(l[j])
}}else{l.forEach(function(m){this.add(m)},this)}}if(k){this.endPropertyChanges()}return this
},remove:function(m){if(this.isFrozen){throw i.FROZEN_ERROR}if(i.none(m)){return this
}var l=i.hashFor(m);var k=this[l];var j=this.length;if(i.none(k)||(k>=j)||(this[k]!==m)){return this
}delete this[l];if(k<(j-1)){m=this[k]=this[j-1];this[i.hashFor(m)]=k}this.length=j-1;
if(this.isObservable){this.enumerableContentDidChange()}return this},pop:function(){if(this.isFrozen){throw i.FROZEN_ERROR
}var j=(this.length>0)?this[this.length-1]:null;if(j){this.remove(j)}return j},removeEach:function(l){if(this.isFrozen){throw i.FROZEN_ERROR
}if(!l||!l.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)}var j,k=this.isObservable;
if(k){this.beginPropertyChanges()}if(l.isSCArray){j=l.get("length");while(--j>=0){this.remove(l.objectAt(j))
}}else{if(l.isSet){j=l.length;while(--j>=0){this.remove(l[j])}}else{l.forEach(function(m){this.remove(m)
},this)}}if(k){this.endPropertyChanges()}return this},copy:function(){return this.constructor.create(this)
},destroy:function(){this.isFrozen=h;if(!this.isObservable){i.Set._pool.push(this.clear())
}return this},forEach:function(l,m){var k=this.length;if(!m){m=this}for(var j=0;j<k;
j++){l.call(m,this[j],j,this)}return this},toString:function(){var k=this.length,j,l=[];
for(j=0;j<k;j++){l[j]=this[j]}return"SC.Set<%@>".fmt(l.join(","))},_pool:[],isObservable:f});
i.Set.constructor=i.Set;i.Set.clone=i.Set.copy;i.Set.push=i.Set.unshift=i.Set.add;
i.Set.shift=i.Set.pop;i.Set.addObject=i.Set.add;i.Set.removeObject=i.Set.remove;i.Set._pool=[];
i.CoreSet=i.beget(i.Set);i.CoreSet.isObservable=h;i.CoreSet.constructor=i.CoreSet
});tiki.module("sproutcore/runtime:system/sparse_array",function(c,b,e){var a=c("sproutcore/runtime:core"),i=a.SC,g=a.SproutCore,f=a.YES,h=a.NO;
c("sproutcore/runtime:system/index_set");c("sproutcore/runtime:system/object");c("sproutcore/runtime:mixins/enumerable");
c("sproutcore/runtime:mixins/array");c("sproutcore/runtime:mixins/delegate_support");
"import core";"import system/index_set";"import system/object";"import mixins/enumerable";
"import mixins/array";"import mixins/delegate_support";"export package";i.SparseArray=i.Object.extend(i.Enumerable,i.Array,i.DelegateSupport,{_requestingLength:0,_requestingIndex:0,length:function(){var j=this.delegate;
if(j&&i.none(this._length)&&j.sparseArrayDidRequestLength){this._requestingLength++;
j.sparseArrayDidRequestLength(this);this._requestingLength--}return this._length||0
}.property().cacheable(),provideLength:function(j){if(i.none(j)){this._sa_content=null
}if(j!==this._length){this._length=j;if(this._requestingLength<=0){this.enumerableContentDidChange()
}}return this},rangeWindowSize:1,requestedRangeIndex:[],objectAt:function(j){var l=this._sa_content,k;
if(!l){l=this._sa_content=[]}if((k=l[j])===undefined){this.requestIndex(j);k=l[j]
}return k},definedIndexes:function(m){var l=i.IndexSet.create(),n=this._sa_content,k,j;
if(!n){return l.freeze()}if(m){m.forEach(function(o){if(n[o]!==undefined){l.add(o)
}})}else{j=n.length;for(k=0;k<j;k++){if(n[k]!==undefined){l.add(k)}}}return l.freeze()
},_TMP_RANGE:{},requestIndex:function(k){var l=this.delegate;if(!l){return this}var j=this.get("rangeWindowSize"),n=k;
if(j>1){n=n-Math.floor(n%j)}if(j<1){j=1}this._requestingIndex++;if(l.sparseArrayDidRequestRange){var m=this._TMP_RANGE;
if(this.wasRangeRequested(n)===-1){m.start=n;m.length=j;l.sparseArrayDidRequestRange(this,m);
this.requestedRangeIndex.push(n)}}else{if(l.sparseArrayDidRequestIndex){while(--j>=0){l.sparseArrayDidRequestIndex(this,n+j)
}}}this._requestingIndex--;return this},wasRangeRequested:function(l){var k,j;for(k=0,j=this.requestedRangeIndex.length;
k<j;k++){if(this.requestedRangeIndex[k]===l){return k}}return -1},rangeRequestCompleted:function(k){var j=this.wasRangeRequested(k);
if(j>=0){this.requestedRangeIndex.removeAt(j,1);return f}return h},provideObjectsInRange:function(k,n){var l=this._sa_content;
if(!l){l=this._sa_content=[]}var m=k.start,j=k.length;while(--j>=0){l[m+j]=n[j]}if(this._requestingIndex<=0){this.enumerableContentDidChange()
}return this},_TMP_PROVIDE_ARRAY:[],_TMP_PROVIDE_RANGE:{length:1},provideObjectAtIndex:function(l,k){var m=this._TMP_PROVIDE_ARRAY,j=this._TMP_PROVIDE_RANGE;
m[0]=k;j.start=l;return this.provideObjectsInRange(j,m)},objectsDidChangeInRange:function(j){var k=this._sa_content;
if(k){if(j.start===0&&i.maxRange(j)>=k.length){this._sa_content=null}else{var m=j.start,l=Math.min(m+j.length,k.length);
while(--l>=m){k[l]=undefined}}}this.enumerableContentDidChange(j);return this},indexOf:function(l){var j=this.delegate;
if(j&&j.sparseArrayDidRequestIndexOf){return j.sparseArrayDidRequestIndexOf(this,l)
}else{var k=this._sa_content;if(!k){k=this._sa_content=[]}return k.indexOf(l)}},replace:function(k,p,n){n=n||[];
var l=this.delegate;if(l){if(!l.sparseArrayShouldReplace||!l.sparseArrayShouldReplace(this,k,p,n)){return this
}}var m=this._sa_content;if(!m){m=this._sa_content=[]}m.replace(k,p,n);var j=n?(n.get?n.get("length"):n.length):0;
var o=j-p;if(!i.none(this._length)){this.propertyWillChange("length");this._length+=o;
this.propertyDidChange("length")}this.enumerableContentDidChange(k,p,o);return this
},reset:function(){this._sa_content=null;this._length=null;this.enumerableContentDidChange();
this.invokeDelegateMethod(this.delegate,"sparseArrayDidReset",this);return this}});
i.SparseArray.array=function(j){return this.create({_length:j||0})}});tiki.module("sproutcore/runtime:package",function(c,b,e){var a;
a=c("sproutcore/runtime:core");b.SC=a.SC;b.SproutCore=a.SproutCore;b.YES=a.YES;b.NO=a.NO;
c("sproutcore/runtime:mixins/array");c("sproutcore/runtime:mixins/comparable");c("sproutcore/runtime:mixins/copyable");
c("sproutcore/runtime:mixins/delegate_support");c("sproutcore/runtime:mixins/enumerable");
c("sproutcore/runtime:mixins/freezable");c("sproutcore/runtime:mixins/observable");
c("sproutcore/runtime:system/binding");c("sproutcore/runtime:system/cookie");c("sproutcore/runtime:system/enumerator");
c("sproutcore/runtime:system/error");c("sproutcore/runtime:system/index_set");c("sproutcore/runtime:system/logger");
c("sproutcore/runtime:system/object");c("sproutcore/runtime:system/range_observer");
c("sproutcore/runtime:system/run_loop");c("sproutcore/runtime:system/selection_set");
c("sproutcore/runtime:system/set");c("sproutcore/runtime:system/sparse_array")});
tiki.script("sproutcore/runtime:en/cca71b2c8ec71645c88d40a948f81436bff9a7f3/javascript.js");
tiki.register("sproutcore/datastore",{depends:["sproutcore/runtime"],packages:{"sproutcore/runtime":{}},scripts:[{url:"/static/sproutcore/datastore/en/b3d882bb66846ea67e40aafb234e0da54bf57b3e/javascript.js",id:"sproutcore/datastore:en/b3d882bb66846ea67e40aafb234e0da54bf57b3e/javascript.js"}]});
tiki.global("sproutcore/datastore");tiki.script("sproutcore/datastore:en/b3d882bb66846ea67e40aafb234e0da54bf57b3e/javascript.js");
tiki.register("sproutcore/foundation",{depends:["sproutcore/runtime"],packages:{"sproutcore/runtime":{}},scripts:[{url:"/static/sproutcore/foundation/en/668e188bd44c10fb9ca18d37e89878e7aac1402d/javascript.js",id:"sproutcore/foundation:en/668e188bd44c10fb9ca18d37e89878e7aac1402d/javascript.js"}]});
tiki.global("sproutcore/foundation");SC.Locale=SC.Object.extend({init:function(){if(!this.language){SC.Locale._assignLocales()
}if(!this.hasStrings){var c=this._deprecatedLanguageCodes||[];c.push(this.language);
var b=c.length;var a=null;while(!a&&--b>=0){a=String[c[b]]}if(a){this.hasStrings=YES;
this.strings=a}}},hasStrings:NO,strings:{},toString:function(){if(!this.language){SC.Locale._assignLocales()
}return"SC.Locale["+this.language+"]"+SC.guidFor(this)},locWithDefault:function(a,b){return this.strings[a]||b||a
}});SC.Locale.mixin({useAutodetectedLanguage:NO,preferredLanguage:null,createCurrentLocale:function(){var c=(String.useAutodetectedLanguage!==undefined)?String.useAutodetectedLanguage:this.useAutodetectedLanguage;
var b=(String.preferredLanguage!==undefined)?String.preferredLanguage:this.preferredLanguage;
var e=((c)?SC.browser.language:null)||b||SC.browser.language||"en";e=SC.Locale.normalizeLanguage(e);
var a=this.localeClassFor(e);if(e!=this.currentLanguage){this.currentLanguage=e;this.currentLocale=a.create()
}return this.currentLocale},localeClassFor:function(c){c=SC.Locale.normalizeLanguage(c);
var b,a=this.locales[c];if(!a&&((b=c.split("-")[0])!==c)&&(a=this.locales[b])){a=this.locales[c]=a.extend()
}if(!a){a=this.locales[c]=this.locales.en.extend()}return a},define:function(b,c){var a;
if(c===undefined&&(SC.typeOf(b)!==SC.T_STRING)){a=this;c=b}else{a=SC.Locale.localeClassFor(b)
}SC.mixin(a.prototype,c);return a},options:function(){return this.prototype},addStrings:function(b){var a=this.prototype.strings;
if(a){if(!this.prototype.hasOwnProperty("strings")){this.prototype.strings=SC.clone(a)
}}else{a=this.prototype.strings={}}if(b){this.prototype.strings=SC.mixin(a,b)}this.prototype.hasStrings=YES;
return this},_map:{english:"en",french:"fr",german:"de",japanese:"ja",jp:"ja",spanish:"es"},normalizeLanguage:function(a){if(!a){return"en"
}return SC.Locale._map[a.toLowerCase()]||a},_assignLocales:function(){for(var a in this.locales){this.locales[a].prototype.language=a
}},toString:function(){if(!this.prototype.language){SC.Locale._assignLocales()}return"SC.Locale["+this.prototype.language+"]"
},extend:function(){var a=SC.Object.extend.apply(this,arguments);a.addStrings=SC.Locale.addStrings;
a.define=SC.Locale.define;a.options=SC.Locale.options;a.toString=SC.Locale.toString;
return a}});SC.Locale.locales={en:SC.Locale.extend({_deprecatedLanguageCodes:["English"]}),fr:SC.Locale.extend({_deprecatedLanguageCodes:["French"]}),de:SC.Locale.extend({_deprecatedLanguageCodes:["German"]}),ja:SC.Locale.extend({_deprecatedLanguageCodes:["Japanese","jp"]}),es:SC.Locale.extend({_deprecatedLanguageCodes:["Spanish"]})};
SC.stringsFor=function(c,b){var a=SC.Locale.localeClassFor(c);a.addStrings(b);return this
};sc_require("system/locale");SC.stringsFor("English",{"_SC.DateTime.dayNames":"Sunday Monday Tuesday Wednesday Thursday Friday Saturday","_SC.DateTime.abbreviatedDayNames":"Sun Mon Tue Wed Thu Fri Sat","_SC.DateTime.monthNames":"January February March April May June July August September October November December","_SC.DateTime.abbreviatedMonthNames":"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"});
SC.DROP_ON=1;SC.DROP_BEFORE=2;SC.DROP_AFTER=4;SC.DROP_ANY=7;SC.mixin({data:function(c,b,e){c=(c===window)?"@window":c;
var f=SC.hashFor(c);var a=SC._data_cache;if(!a){SC._data_cache=a={}}var g=a[f];if(b&&!g){a[f]=g={}
}if(g&&(e!==undefined)){g[b]=e}return(b)?g[b]:g},removeData:function(e,c){e=(e===window)?"@window":e;
var f=SC.hashFor(e);var a=SC._data_cache;if(!a){return undefined}var g=a[f];if(!g){return undefined
}var b=(c)?g[c]:g;if(c){delete g[c]}else{delete a[f]}return b}});SC.mixin(Function.prototype,{invokeLater:function(h,a){if(a===undefined){a=1
}var g=this;if(arguments.length>2){var b=SC.$A(arguments).slice(2,arguments.length);
b.unshift(h);var e=this,c=g;g=function(){return c.apply(e,b.slice(1))}}return SC.Timer.schedule({target:h,action:g,interval:a})
}});SC.Controller=SC.Object.extend({isEditable:YES});SC.mixin(SC.Object.prototype,{invokeLater:function(b,a){if(a===undefined){a=1
}var g=b,c,e;if(arguments.length>2){c=SC.$A(arguments).slice(2);if(SC.typeOf(g)===SC.T_STRING){g=this[b]
}e=g;g=function(){return e.apply(this,c)}}return SC.Timer.schedule({target:this,action:g,interval:a})
},invokeWith:function(b,c,e){if(e===undefined){e=c;c=this}if(!c){c=this}if(SC.typeOf(e)===SC.T_STRING){e=c[e]
}var a=this.getPath(b);e.call(c,a,this);return this}});SC.RunLoop=SC.RunLoop.extend({startTime:function(){if(!this._start){this._start=Date.now()
}return this._start}.property(),endRunLoop:function(){this.fireExpiredTimers();var a=arguments.callee.base.apply(this,arguments);
this.scheduleNextTimeout();return a},scheduleTimer:function(b,a){this._timerQueue=b.removeFromTimerQueue(this._timerQueue);
this._timerQueue=b.scheduleInTimerQueue(this._timerQueue,a);return this},cancelTimer:function(a){this._timerQueue=a.removeFromTimerQueue(this._timerQueue);
return this},TIMER_ARRAY:[],fireExpiredTimers:function(){if(!this._timerQueue||this._firing){return NO
}var e=this.get("startTime");this._firing=YES;var f=this.TIMER_ARRAY;this._timerQueue=this._timerQueue.collectExpiredTimers(f,e);
var c,b=f.length;for(c=0;c<b;c++){f[c].fire()}var a=f.length>0;f.length=0;this._firing=NO;
return a},scheduleNextTimeout:function(){var e=this._timerQueue;var b=NO;if(!e){if(this._timeout){clearTimeout(this._timeout)
}}else{var c=e._timerQueueRunTime;if(this._timeoutAt!==c){if(this._timeout){clearTimeout(this._timeout)
}var a=Math.max(0,c-Date.now());this._timeout=setTimeout(this._timeoutDidFire,a);
this._timeoutAt=c}b=YES}return b},_timeoutDidFire:function(){var a=SC.RunLoop.currentRunLoop;
a._timeout=a._timeoutAt=null;SC.RunLoop.begin().end()}});SC.RunLoop.currentRunLoop=SC.RunLoop.create();
/* @license

Portions of this software are copyright Yahoo, Inc, used under the following license:

Software License Agreement (BSD License)
Copyright (c) 2009, Yahoo! Inc.
All rights reserved.
Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the
following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of Yahoo! Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission of Yahoo! Inc.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Sources of Intellectual Property Included in the YUI Library
Where not otherwise indicated, all YUI content is authored by Yahoo! engineers and consists of Yahoo!-owned intellectual property. YUI is issued by Yahoo! under the BSD license above. In some specific instances, YUI will incorporate work done by developers outside of Yahoo! with their express permission.

*/
SC.BRANCH_OPEN=17;
SC.BRANCH_CLOSED=18;SC.LEAF_NODE=32;SC.CollectionContent={isCollectionContent:YES,contentIndexIsSelected:function(b,c,a){var e=b.get("selection");
return e?e.contains(c,a):NO},contentIndexIsEnabled:function(b,c,a){return b.get("isEnabled")
},contentGroupIndexes:function(a,b){return null},contentIndexIsGroup:function(b,c,a){return NO
},contentIndexOutlineLevel:function(b,c,a){return -1},contentIndexDisclosureState:function(b,c,a){return SC.LEAF_NODE
},contentIndexExpand:function(b,c,a){console.log("contentIndexExpand(%@, %@, %@)".fmt(b,c,a))
},contentIndexCollapse:function(b,c,a){console.log("contentIndexCollapse(%@, %@, %@)".fmt(b,c,a))
}};SC.ContentDisplay={concatenatedProperties:"contentDisplayProperties",displayProperties:["content"],contentDisplayProperties:[],_display_contentDidChange:function(g,a,e){if((e=this.get("content"))!=this._display_content){var c=this._display_contentPropertyDidChange;
var b=this._display_content;if(b){if(SC.isArray(b)){b.invoke("removeObserver","*",this,c)
}else{if(b.removeObserver){b.removeObserver("*",this,c)}}}b=this._display_content=e;
if(b){if(SC.isArray(b)){b.invoke("addObserver","*",this,c)}else{if(b.addObserver){b.addObserver("*",this,c)
}}}this.allPropertiesDidChange();this.endPropertyChanges()}}.observes("content"),_display_contentPropertyDidChange:function(f,c,e,b){if(c==="*"){this.displayDidChange()
}else{var a=this.get("contentDisplayProperties");if(a&&a.indexOf(c)>=0){this.displayDidChange()
}}}};sc_require("system/locale");SC.STRING_TITLEIZE_REGEXP=(/([\s|\-|\_|\n])([^\s|\-|\_|\n]?)/g);
SC.String={loc:function(){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var a=SC.Locale.currentLocale.locWithDefault(this)||this;return a.fmt.apply(a,arguments)
},locWithDefault:function(b){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var c=SC.Locale.currentLocale.locWithDefault(b)||this;var a=SC.$A(arguments);a.shift();
return c.fmt.apply(c,a)},capitalize:function(){return this.charAt(0).toUpperCase()+this.slice(1)
},capitalizeEach:function(){return this.replace(SC.STRING_TITLEIZE_REGEXP,function(c,a,b){return(b)?(a+b.toUpperCase()):a
}).capitalize()},titleize:function(){var a=this.replace(/([a-z])([A-Z])/g,"$1_$2");
return a.replace(SC.STRING_TITLEIZE_REGEXP,function(c,e,b){return(b)?(" "+b.toUpperCase()):" "
}).capitalize()},camelize:function(){var b=this.replace(SC.STRING_TITLEIZE_REGEXP,function(f,g,e){return(e)?e.toUpperCase():""
});var c=b.charAt(0),a=c.toLowerCase();return(c!==a)?(a+b.slice(1)):b},classify:function(){var a=this.replace(SC.STRING_TITLEIZE_REGEXP,function(f,g,e){return(e)?e.toUpperCase():""
});var c=a.charAt(0),b=c.toUpperCase();return(c!==b)?(b+a.slice(1)):a},decamelize:function(){return this.replace(/([a-z])([A-Z])/g,"$1_$2").toLowerCase()
},dasherize:function(){return this.decamelize().replace(/[ _]/g,"-")},humanize:function(){return this.decamelize().replace(/[\-_]/g," ")
},removeDiacritics:function(){var a=SC.diacriticMappingTable;if(!a){SC.diacriticMappingTable={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ā":"A","Ă":"A","Ą":"A","Ǎ":"A","Ǟ":"A","Ǡ":"A","Ǻ":"A","Ȁ":"A","Ȃ":"A","Ȧ":"A","Ḁ":"A","Ạ":"A","Ả":"A","Ấ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ậ":"A","Ắ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Å":"A","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ç":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ḉ":"C","Ď":"D","Ḋ":"D","Ḍ":"D","Ḏ":"D","Ḑ":"D","Ḓ":"D","È":"E","É":"E","Ê":"E","Ë":"E","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ȩ":"E","Ḕ":"E","Ḗ":"E","Ḙ":"E","Ḛ":"E","Ḝ":"E","Ẹ":"E","Ẻ":"E","Ẽ":"E","Ế":"E","Ề":"E","Ể":"E","Ễ":"E","Ệ":"E","Ḟ":"F","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","Ǧ":"G","Ǵ":"G","Ḡ":"G","Ĥ":"H","Ȟ":"H","Ḣ":"H","Ḥ":"H","Ḧ":"H","Ḩ":"H","Ḫ":"H","Ì":"I","Í":"I","Î":"I","Ï":"I","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ḭ":"I","Ḯ":"I","Ỉ":"I","Ị":"I","Ĵ":"J","Ķ":"K","Ǩ":"K","Ḱ":"K","Ḳ":"K","Ḵ":"K","Ĺ":"L","Ļ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ḻ":"L","Ḽ":"L","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ñ":"N","Ń":"N","Ņ":"N","Ň":"N","Ǹ":"N","Ṅ":"N","Ṇ":"N","Ṉ":"N","Ṋ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ō":"O","Ŏ":"O","Ő":"O","Ơ":"O","Ǒ":"O","Ǫ":"O","Ǭ":"O","Ȍ":"O","Ȏ":"O","Ȫ":"O","Ȭ":"O","Ȯ":"O","Ȱ":"O","Ṍ":"O","Ṏ":"O","Ṑ":"O","Ṓ":"O","Ọ":"O","Ỏ":"O","Ố":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ộ":"O","Ớ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ợ":"O","Ṕ":"P","Ṗ":"P","Ŕ":"R","Ŗ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ṟ":"R","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṥ":"S","Ṧ":"S","Ṩ":"S","Ţ":"T","Ť":"T","Ț":"T","Ṫ":"T","Ṭ":"T","Ṯ":"T","Ṱ":"T","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","Ư":"U","Ǔ":"U","Ǖ":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ȕ":"U","Ȗ":"U","Ṳ":"U","Ṵ":"U","Ṷ":"U","Ṹ":"U","Ṻ":"U","Ụ":"U","Ủ":"U","Ứ":"U","Ừ":"U","Ử":"U","Ữ":"U","Ự":"U","Ṽ":"V","Ṿ":"V","Ŵ":"W","Ẁ":"W","Ẃ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẋ":"X","Ẍ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ȳ":"Y","Ẏ":"Y","Ỳ":"Y","Ỵ":"Y","Ỷ":"Y","Ỹ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","Ẑ":"Z","Ẓ":"Z","Ẕ":"Z","`":"`","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ā":"a","ă":"a","ą":"a","ǎ":"a","ǟ":"a","ǡ":"a","ǻ":"a","ȁ":"a","ȃ":"a","ȧ":"a","ḁ":"a","ạ":"a","ả":"a","ấ":"a","ầ":"a","ẩ":"a","ẫ":"a","ậ":"a","ắ":"a","ằ":"a","ẳ":"a","ẵ":"a","ặ":"a","ḃ":"b","ḅ":"b","ḇ":"b","ç":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ḉ":"c","ď":"d","ḋ":"d","ḍ":"d","ḏ":"d","ḑ":"d","ḓ":"d","è":"e","é":"e","ê":"e","ë":"e","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","ȅ":"e","ȇ":"e","ȩ":"e","ḕ":"e","ḗ":"e","ḙ":"e","ḛ":"e","ḝ":"e","ẹ":"e","ẻ":"e","ẽ":"e","ế":"e","ề":"e","ể":"e","ễ":"e","ệ":"e","ḟ":"f","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","ǧ":"g","ǵ":"g","ḡ":"g","ĥ":"h","ȟ":"h","ḣ":"h","ḥ":"h","ḧ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ì":"i","í":"i","î":"i","ï":"i","ĩ":"i","ī":"i","ĭ":"i","į":"i","ǐ":"i","ȉ":"i","ȋ":"i","ḭ":"i","ḯ":"i","ỉ":"i","ị":"i","ĵ":"j","ǰ":"j","ķ":"k","ǩ":"k","ḱ":"k","ḳ":"k","ḵ":"k","ĺ":"l","ļ":"l","ľ":"l","ḷ":"l","ḹ":"l","ḻ":"l","ḽ":"l","ḿ":"m","ṁ":"m","ṃ":"m","ñ":"n","ń":"n","ņ":"n","ň":"n","ǹ":"n","ṅ":"n","ṇ":"n","ṉ":"n","ṋ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ō":"o","ŏ":"o","ő":"o","ơ":"o","ǒ":"o","ǫ":"o","ǭ":"o","ȍ":"o","ȏ":"o","ȫ":"o","ȭ":"o","ȯ":"o","ȱ":"o","ṍ":"o","ṏ":"o","ṑ":"o","ṓ":"o","ọ":"o","ỏ":"o","ố":"o","ồ":"o","ổ":"o","ỗ":"o","ộ":"o","ớ":"o","ờ":"o","ở":"o","ỡ":"o","ợ":"o","ṕ":"p","ṗ":"p","ŕ":"r","ŗ":"r","ř":"r","ȑ":"r","ȓ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ṟ":"r","ś":"s","ŝ":"s","ş":"s","š":"s","ș":"s","ṡ":"s","ṣ":"s","ṥ":"s","ṧ":"s","ṩ":"s","ţ":"t","ť":"t","ț":"t","ṫ":"t","ṭ":"t","ṯ":"t","ṱ":"t","ẗ":"t","ù":"u","ú":"u","û":"u","ü":"u","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","ư":"u","ǔ":"u","ǖ":"u","ǘ":"u","ǚ":"u","ǜ":"u","ȕ":"u","ȗ":"u","ṳ":"u","ṵ":"u","ṷ":"u","ṹ":"u","ṻ":"u","ụ":"u","ủ":"u","ứ":"u","ừ":"u","ử":"u","ữ":"u","ự":"u","ṽ":"v","ṿ":"v","ŵ":"w","ẁ":"w","ẃ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẘ":"w","ẋ":"x","ẍ":"x","ý":"y","ÿ":"y","ŷ":"y","ȳ":"y","ẏ":"y","ẙ":"y","ỳ":"y","ỵ":"y","ỷ":"y","ỹ":"y","ź":"z","ż":"z","ž":"z","ẑ":"z","ẓ":"z","ẕ":"z"};
a=SC.diacriticMappingTable}var e,f;var b="";var g=this.length;for(var c=0;c<=g;++c){e=this.charAt(c);
f=a[e];if(f){b+=f}else{b+=e}}return b},trim:function(){return this.replace(/^\s+|\s+$/g,"")
},trimLeft:function(){return this.replace(/^\s+/g,"")},trimRight:function(){return this.replace(/\s+$/g,"")
}};SC.String.strip=SC.String.trim;SC.supplement(String.prototype,SC.String);String.prototype.loc=SC.String.loc;
SC.String.fmt=String.prototype.fmt;sc_require("mixins/string");SC.MIXED_STATE="__MIXED__";
SC.HUGE_CONTROL_SIZE="sc-huge-size";SC.LARGE_CONTROL_SIZE="sc-large-size";SC.REGULAR_CONTROL_SIZE="sc-regular-size";
SC.SMALL_CONTROL_SIZE="sc-small-size";SC.TINY_CONTROL_SIZE="sc-tiny-size";SC.Control={initMixin:function(){this._control_contentDidChange()
},isSelected:NO,isSelectedBindingDefault:SC.Binding.oneWay().bool(),isActive:NO,isActiveBindingDefault:SC.Binding.oneWay().bool(),value:null,content:null,contentValueKey:null,contentPropertyDidChange:function(b,a){return this.updatePropertyFromContent("value",a,"contentValueKey")
},updatePropertyFromContent:function(g,b,f,e){var c=b==="*";if(f===undefined){f="content%@Key".fmt(g.capitalize())
}if(e===undefined){e=this.get("content")}f=this[f]?this.get(f):this.getDelegateProperty(f,this.displayDelegate);
if(f&&(c||b===f)){var a=(e)?(e.get?e.get(f):e[f]):null;this.set(g,a)}return this},updateContentWithValueObserver:function(){var a=this.contentValueKey?this.get("contentValueKey"):this.getDelegateProperty("contentValueKey",this.displayDelegate);
var b=this.get("content");if(!a||!b){return}var c=this.get("value");if(typeof b.setIfChanged===SC.T_FUNCTION){b.setIfChanged(a,c)
}else{if(b[a]!==c){b[a]=c}}}.observes("value"),fieldKey:null,fieldLabel:null,errorLabel:function(){var a,c,b;
if(a=this.get("fieldLabel")){return a}c=this.get("fieldKey")||this.constructor.toString();
b=(c||"").humanize().capitalize();return"ErrorLabel.%@".fmt(c).locWithDefault("FieldKey.%@".fmt(c).locWithDefault(b))
}.property("fieldLabel","fieldKey").cacheable(),controlSize:SC.REGULAR_CONTROL_SIZE,displayProperties:"isEnabled isSelected isActive controlSize".w(),_CONTROL_TMP_CLASSNAMES:{},renderMixin:function(a,f){var c=this.get("isSelected"),b=!this.get("isEnabled");
var e=this._CONTROL_TMP_CLASSNAMES;e.mixed=c===SC.MIXED_STATE;e.sel=c&&(c!==SC.MIXED_STATE);
e.active=this.get("isActive");a.setClass(e).addClass(this.get("controlSize"));if(!f&&this.$input){this.$input().attr("disabled",b)
}},_control_content:null,_control_contentDidChange:function(){var b=this.get("content");
if(this._control_content===b){return}var c=this.contentPropertyDidChange;var a=this._control_content;
if(a&&a.removeObserver){a.removeObserver("*",this,c)}this._control_content=b;if(b&&b.addObserver){b.addObserver("*",this,c)
}this.contentPropertyDidChange(b,"*")}.observes("content")};SC.Editable={isEditable:NO,isEditing:NO,beginEditing:function(){if(!this.get("isEditable")){return NO
}if(this.get("isEditing")){return YES}this.set("isEditing",YES);this.becomeFirstResponder();
return YES},discardEditing:function(){return !this.get("isEditing")},commitEditing:function(){if(!this.get("isEditing")){return YES
}this.set("isEditing",NO);this.resignFirstResponder();return YES}};SC.SelectionSupport={hasSelectionSupport:YES,allowsSelection:YES,allowsMultipleSelection:YES,allowsEmptySelection:YES,firstSelectableObject:function(){return this.get("firstObject")
}.property(),selection:function(c,g){var b=this._scsel_selection,h=b?b.get("length"):0,e,f,a;
if((g===undefined)||!this.get("allowsSelection")){g=b}a=(g&&g.isEnumerable)?g.get("length"):0;
if((a>1)&&!this.get("allowsMultipleSelection")){if(h>1){g=SC.SelectionSet.create().addObject(b.get("firstObject")).freeze();
a=1}else{g=b;a=h}}if((a===0)&&!this.get("allowsEmptySelection")){if(h===0){g=this.get("firstSelectableObject");
if(g){g=SC.SelectionSet.create().addObject(g).freeze()}else{g=SC.SelectionSet.EMPTY
}a=g.get("length")}else{g=b;a=h}}if(a===0){g=SC.SelectionSet.EMPTY}g=g.frozenCopy();
this._scsel_selection=g;return g}.property("arrangedObjects","allowsEmptySelection","allowsMultipleSelection","allowsSelection").cacheable(),hasSelection:function(){var a=this.get("selection");
return !!a&&(a.get("length")>0)}.property("selection").cacheable(),selectObjects:function(b,c){if(!b||b.get("length")===0){if(!c){this.set("selection",SC.SelectionSet.EMPTY)
}return this}var a=this.get("selection");if(c&&a){a=a.copy()}else{a=SC.SelectionSet.create()
}a.addObjects(b).freeze();this.set("selection",a);return this},selectObject:function(a,b){if(a===null){if(!b){this.set("selection",null)
}return this}else{return this.selectObjects([a],b)}},deselectObjects:function(b){if(!b||b.get("length")===0){return this
}var a=this.get("selection");if(!a||a.get("length")===0){return this}a=a.copy().removeObjects(b).freeze();
this.set("selection",a.freeze());return this},deselectObject:function(a){if(!a){return this
}else{return this.deselectObjects([a])}},updateSelectionAfterContentChange:function(){var f=this.get("arrangedObjects"),g=this.get("selection"),e=g,c,b,a;
if(e&&f&&e.get("sources").indexOf(f)>=0){c=e.indexSetForSource(f);b=f.get("length");
a=c?c.get("max"):0;if(a>b){e=e.copy().remove(f,b,a-b).freeze();this.set("selection",e)
}}if(e===g){b=g?g.get("length"):0;a=f?f.get("length"):0;if((b===0)&&!this.get("allowsEmptySelection")&&a>0){this.notifyPropertyChange("selection")
}}return this}};SC.StaticLayout={hasStaticLayout:YES,useStaticLayout:NO,renderMixin:function(a,b){a.setClass("sc-static-layout",this.get("useStaticLayout"))
},clippingFrame:null,parentViewDidResize:null,beginLiveResize:null,endLiveResize:null,viewDidResize:null};
SC.TreeItemContent={isTreeItemContent:YES,treeItemChildren:null,treeItemIsExpanded:YES,treeItemIsGrouped:NO,treeItemDisclosureState:function(b,a){return this.get("treeItemIsExpanded")?SC.BRANCH_OPEN:SC.BRANCH_CLOSED
},treeItemCollapse:function(b,a){this.setIfChanged("treeItemIsExpanded",NO)},treeItemExpand:function(b,a){this.setIfChanged("treeItemIsExpanded",YES)
},treeItemBranchIndexes:function(f,c){var e=this.get("treeItemChildren"),b,h,a,g;
if(!e){return null}b=SC.IndexSet.create();h=e.get("length");for(a=0;a<h;a++){if(!(g=e.objectAt(a))){continue
}if(!g.get("treeItemChildren")){continue}if(g.treeItemDisclosureState(this,a)!==SC.LEAF_NODE){b.add(a)
}}return b.get("length")>0?b:null}};SC.Validatable={initMixin:function(){this._validatable_validatorDidChange()
},validator:null,errorLabel:null,isValid:function(){return SC.typeOf(this.get("value"))!==SC.T_ERROR
}.property("value"),ownerForm:null,performValidate:function(c){var a=SC.VALIDATE_OK;
if(this._validator){var b=this.get("ownerForm");if(c){a=this._validator.validatePartial(b,this);
if((a==SC.VALIDATE_NO_CHANGE)&&(this._validator.validateChange(b,this)==SC.VALIDATE_OK)){a=SC.VALIDATE_OK
}}else{a=this._validator.validateChange(b,this)}}return a},performValidateSubmit:function(){return this._validator?this._validator.validateSubmit(this.get("ownerForm"),this):SC.VALIDATE_OK
},performValidateKeyDown:function(a){var b=a.getCharString();if(!b){return YES}return this._validator?this._validator.validateKeyDown(this.get("ownerForm"),this,b):YES
},validatorObject:function(){return this._validator}.property(),validateSubmit:function(){return this.performValidateSubmit()
},objectForFieldValue:function(b,a){return this._validator?this._validator.objectForFieldValue(b,this.get("ownerForm"),this):b
},fieldValueForObject:function(a){return this._validator?this._validator.fieldValueForObject(a,this.get("ownerForm"),this):a
},_validatable_displayObserver:function(){this.displayDidChange()}.observes("isValid"),updateLayerMixin:function(a){a.setClass("invalid",!this.get("isValid"))
},_validatable_validatorDidChange:function(){var a=this.get("ownerForm");var b=SC.Validator.findFor(a,this,this.get("validator"));
if(b!=this._validator){this.propertyWillChange("validatorObject");if(this._validator){this._validator.detachFrom(a,this)
}this._validator=b;if(this._validator){this._validator.attachTo(a,this)}this.propertyDidChange("validatorObject")
}}.observes("validator","ownerForm")};SC.browser=(function(){var c=navigator.userAgent.toLowerCase();
var a=(c.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];var b={version:a,safari:(/webkit/).test(c)?a:0,opera:(/opera/).test(c)?a:0,msie:(/msie/).test(c)&&!(/opera/).test(c)?a:0,mozilla:(/mozilla/).test(c)&&!(/(compatible|webkit)/).test(c)?a:0,mobileSafari:(/apple.*mobile.*safari/).test(c)?a:0,windows:!!(/(windows)/).test(c),mac:!!((/(macintosh)/).test(c)||(/(mac os x)/).test(c)),language:(navigator.language||navigator.browserLanguage).split("-",1)[0]};
SC.extend(b,{isOpera:!!b.opera,isIe:!!b.msie,isIE:!!b.msie,isSafari:!!b.safari,isMobileSafari:!!b.mobileSafari,isMozilla:!!b.mozilla,isWindows:!!b.windows,isMac:!!b.mac,current:b.msie?"msie":b.mozilla?"mozilla":b.safari?"safari":b.opera?"opera":"unknown"});
return b})();SC.Builder=function(a){return SC.Builder.create(a)};SC.Builder.create=function create(c){var b=SC.mixin(SC.beget(this.fn),c||{});
if(c.hasOwnProperty("toString")){b.toString=c.toString}var a=function(){var e=SC.beget(b);
e.defaultClass=this;e.constructor=a;return e.init.apply(e,arguments)};a.fn=a.prototype=b;
a.extend=SC.Builder.create;a.mixin=SC.Builder.mixin;return a};SC.Builder.mixin=function(){var b=arguments.length,a;
for(a=0;a<b;a++){SC.mixin(this,arguments[a])}return this};SC.Builder.fn={init:function(a){if(a!==undefined){if(SC.typeOf(a)===SC.T_ARRAY){var b=a.length;
while(--b>=0){this[b]=a.objectAt?a.objectAt(b):a[b]}this.length=a.length}else{this[0]=a;
this.length=1}}return this},size:function(){return this.length},pushStack:function(){var a=this.constructor.apply(this,arguments);
a.prevObject=this;return a},end:function(){return this.prevObject||this.constructor()
},toString:function(){return"%@$(%@)".fmt(this.defaultClass.toString(),SC.A(this).invoke("toString").join(","))
},mixin:SC.Builder.mixin};(function(){var a=SC.Enumerable,c=SC.Builder.fn,b,e;for(b in a){if(!a.hasOwnProperty(b)){continue
}e=Array.prototype[b]||a[b];c[b]=e}})();sc_require("system/builder");SC.CoreQuery=(function(){var v=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.]*$/,g;
var t=SC.browser.msie?"styleFloat":"cssFloat";var n=(SC.browser.safari&&parseInt(SC.browser.version,0)<417)?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)";
var q=new RegExp("^("+n+"+)(#)("+n+"+)");var k=new RegExp("^([#.]?)("+n+"*)");var e=new RegExp("([#.]?)("+n+"*)","g");
var j=["Left","Right"];var c=["Top","Bottom"];var l={position:"absolute",visibility:"hidden",display:"block"};
var s=function s(y,x,D){var C=x=="width"?y.offsetWidth:y.offsetHeight;var A=0,w=0,B=D.length,z;
while(--B>=0){z=D[B];A+=parseFloat(b.curCSS(y,"padding"+z,true))||0;w+=parseFloat(b.curCSS(y,"border"+z+"Width",true))||0
}C-=Math.round(A+w);return C};var h=SC.guidKey,r=0,u={},a=/z-?index|font-?weight|opacity|zoom|line-?height/i,o=document.defaultView||{};
var m=function m(x){if(!SC.browser.safari){return false}var w=o.getComputedStyle(x,null);
return !w||w.getPropertyValue("color")==""};function i(w,x){return w[0]&&parseInt(b.curCSS(w[0],x,true),10)||0
}var p,b;b=p=SC.Builder.create({jquery:"SC.CoreQuery",init:function(w,y){w=w||document;
if(w.nodeType){this[0]=w;this.length=1;return this}else{if(typeof w==="string"){var x=v.exec(w);
if(x&&(x[1]||!y)){if(x[1]){w=b.clean([x[1]],y)}else{var z=document.getElementById(x[3]);
if(z){if(z.id!=x[3]){return b().find(w)}return b(z)}w=[]}}else{return b(y).find(w)
}}else{if(SC.typeOf(w)===SC.T_FUNCTION){return SC.ready(w)}}}return this.setArray(b.makeArray(w))
},size:function(){return this.length},get:function(w){return w===g?b.makeArray(this):this[w]
},find:function(w){var x=b.map(this,function(y){return b.find(w,y)});return this.pushStack(x)
},filter:function(w){return this.pushStack((SC.typeOf(w)===SC.T_FUNCTION)&&b.grep(this,function(y,x){return w.call(y,x)
})||b.multiFilter(w,this))},not:function(w){if(typeof w==="string"){if(f.test(w)){return this.pushStack(b.multiFilter(w,this,true))
}else{w=b.multiFilter(w,this)}}var x=w.length&&w[w.length-1]!==g&&!w.nodeType;return this.filter(function(){return x?b.inArray(this,w)<0:this!=w
})},setArray:function(w){this.length=0;Array.prototype.push.apply(this,w);return this
},map:function(w){return this.pushStack(b.map(this,function(y,x){return w.call(y,x,y)
}))},each:function(x,w){return b.each(this,x,w)},index:function(w){if(w&&w.jquery){w=w[0]
}return Array.prototype.indexOf.call(this,w)},eq:function(w){return this.slice(w,+w+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))
},add:function(w){return this.pushStack(b.merge(this.get(),typeof w==="string"?b(w):b.makeArray(w)).uniq())
},attr:function(x,z,y){var w=x;if(typeof x==="string"){if(z===g){return this[0]&&b[y||"attr"](this[0],x)
}else{w={};w[x]=z}}return this.each(function(A){for(x in w){b.attr((y)?this.style:this,x,b.prop(this,w[x],y,A,x))
}})},html:function(w){return w===g?(this[0]?this[0].innerHTML.replace(/ CQ\d+="(?:\d+|null)"/g,""):null):this.empty().append(w)
},andSelf:function(){return this.add(this.prevObject)},is:function(w){return !!w&&b.multiFilter(w,this).length>0
},hasClass:function(w){return Array.prototype.every.call(this,function(x){return(x.nodeType!=1)||b.className.has(x,w)
})},val:function(C){if(C===g){var w=this[0];if(w){if(b.nodeName(w,"option")){return(w.attributes.value||{}).specified?w.value:w.text
}if(b.nodeName(w,"select")){var A=w.selectedIndex,D=[],E=w.options,z=w.type=="select-one";
if(A<0){return null}var x,B=z?A+1:E.length;for(x=z?A:0;x<B;x++){var y=E[x];if(y.selected){C=b(y).val();
if(z){return C}D.push(C)}}return D}return(w.value||"").replace(/\r/g,"")}return g
}else{if(typeof C==="number"){C+=""}this.each(function(){if(this.nodeType!=1){return
}if(SC.typeOf(C)===SC.T_ARRAY&&(/radio|checkbox/).test(this.type)){this.checked=(b.inArray(this.value,C)>=0||b.inArray(this.name,C)>=0)
}else{if(b.nodeName(this,"select")){var F=b.makeArray(C);b("option",this).each(function(){this.selected=(b.inArray(this.value,F)>=0||b.inArray(this.text,F)>=0)
});if(!F.length){this.selectedIndex=-1}}else{this.value=C}}})}return this},clone:function(){var w=this.map(function(){if(SC.browser.msie&&!b.isXMLDoc(this)){var z=this.cloneNode(true),y=document.createElement("div");
y.appendChild(z);return b.clean([y.innerHTML])[0]}else{return this.cloneNode(true)
}});var x=w.find("*").andSelf().each(function(){if(this[SC.guidKey]!==g){this[SC.guidKey]=null
}});return w},css:function(w,x){if((w=="width"||w=="height")&&parseFloat(x,0)<0){x=g
}return this.attr(w,x,"curCSS")},text:function(x){if(typeof x!=="object"&&x!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(x))
}var w="";b.each(x||this,function(){b.each(this.childNodes,function(){if(this.nodeType!=8){w+=this.nodeType!=1?this.nodeValue:b.fn.text([this])
}})});return w},show:function(){var w=SC.$.isVisible;this.each(function(){if(!w(this)){this.style.display=this.oldblock||"";
if(b.css(this,"display")=="none"){var x=b("<"+this.tagName+"/>");b("body").append(x);
this.style.display=x.css("display");if(this.style.display==="none"){this.style.display="block"
}x.remove();x=null}}});return this},hide:function(){var w=SC.$.isVisible;this.each(function(){if(w(this)){this.oldblock=this.oldblock||b.css(this,"display");
this.style.display="none"}});return this},domManip:function(y,z,x,B){var A=this.length>1,w;
return this.each(function(){if(!w){w=b.clean(y,this.ownerDocument);if(x){w.reverse()
}}var C=this;if(z&&b.nodeName(this,"table")&&b.nodeName(w[0],"tr")){C=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))
}b.each(w,function(){var D=A?b(this).clone(true)[0]:this;B.call(C,D)})})},append:function(){return this.domManip(arguments,true,false,function(w){if(this.nodeType==1){this.appendChild(w)
}})},prepend:function(){return this.domManip(arguments,true,true,function(w){if(this.nodeType==1){this.insertBefore(w,this.firstChild)
}})},before:function(){return this.domManip(arguments,false,false,function(w){this.parentNode.insertBefore(w,this)
})},after:function(){return this.domManip(arguments,false,true,function(w){this.parentNode.insertBefore(w,this.nextSibling)
})},replaceWith:function(w){return this.after(w).remove()},removeData:function(w){return this.each(function(){SC.removeData(this,w)
})}});p.mixin({nodeName:function(x,w){return x.nodeName&&x.nodeName.toUpperCase()==w.toUpperCase()
},map:function(w,B){var x=[];for(var y=0,z=w.length;y<z;y++){var A=B(w[y],y);if(A!=null){x[x.length]=A
}}return x.concat.apply([],x)},each:function(y,C,x){var w,z=0,A=y.length;if(x){if(A===g){for(w in y){if(C.apply(y[w],x)===false){break
}}}else{for(;z<A;){if(C.apply(y[z++],x)===false){break}}}}else{if(A===g){for(w in y){if(C.call(y[w],w,y[w])===false){break
}}}else{for(var B=y[0];z<A&&C.call(B,z,B)!==false;B=y[++z]){}}}return y},isXMLDoc:function(w){return w.documentElement&&!w.body||w.tagName&&w.ownerDocument&&!w.ownerDocument.body
},clean:function(w,y){var x=[];y=y||document;if(typeof y.createElement=="undefined"){y=y.ownerDocument||y[0]&&y[0].ownerDocument||document
}b.each(w,function(C,E){if(typeof E==="number"){E+=""}if(!E){return}if(typeof E==="string"){E=E.replace(/(<(\w+)[^>]*?)\/>/g,function(H,I,G){return G.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?H:I+"></"+G+">"
});var B=E.replace(/^\s+/,"").substring(0,10).toLowerCase(),F=y.createElement("div");
var D=!B.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!B.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||B.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!B.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!B.indexOf("<td")||!B.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!B.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||SC.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];
F.innerHTML=D[1]+E+D[2];while(D[0]--){F=F.lastChild}if(SC.browser.msie){var A=!B.indexOf("<table")&&B.indexOf("<tbody")<0?F.firstChild&&F.firstChild.childNodes:D[1]=="<table>"&&B.indexOf("<tbody")<0?F.childNodes:[];
for(var z=A.length-1;z>=0;--z){if(b.nodeName(A[z],"tbody")&&!A[z].childNodes.length){A[z].parentNode.removeChild(A[z])
}}if(/^\s/.test(E)){F.insertBefore(y.createTextNode(E.match(/^\s*/)[0]),F.firstChild)
}}E=b.makeArray(F.childNodes)}if(E.length===0&&(!b.nodeName(E,"form")&&!b.nodeName(E,"select"))){return
}if(E[0]===g||b.nodeName(E,"form")||E.options){x.push(E)}else{x=b.merge(x,E)}});return x
},find:function(J,x){if(typeof J!="string"){return[J]}if(J.indexOf(",")>=0){var E=J.split(",").map(function(L){return b.find(L,x)
});return E.concat.apply([],E).uniq()}if(x&&x.nodeType!=1&&x.nodeType!=9){return[]
}x=x||document;var E=[x],G,w=YES;var A=J.match(e),D=A.length,z;for(var H=0;H<D;H++){J=A[H];
if(J===" "||J===""){w=YES}else{if(w){z=k.exec(J);if((z[1]==="")&&(H<(D-1))&&(A[H+1].charAt(0)==="#")){J=A[H+1];
A[H+1]=A[H];z=k.exec(J)}var C=[],B=E.length,F,I,y=z[2],K;for(F=0;F<B;F++){I=E[F];
switch(z[1]){case"":if(!y){y="*"}if(y=="*"&&I.nodeName.toLowerCase()=="object"){y="param"
}C=b.merge(C,I.getElementsByTagName(y));break;case"#":if(I===document){K=document.getElementById(y);
if(SC.browser.msie&&K&&K.getAttribute("id")!==y){K=NO}else{if(K){C.push(K)}K=YES}}else{K=NO
}if(!K){K=I.getElementsByTagName("*");K=Array.prototype.find.call(K,function(L){return L.getAttribute&&(L.getAttribute("id")===y)
});if(K){C.push(K)}}break;case".":if(I.getElementsByClassName){C=b.merge(C,I.getElementsByClassName(y))
}else{C=b.merge(C,b.classFilter(I.getElementsByTagName("*"),y))}break;default:}}delete E;
E=C;w=NO}else{E=b.filter(J,E)}}}if(E&&E[0]==x){E.shift()}return E.uniq()},classFilter:function(B,w,A){w=" "+w+" ";
var y=[];for(var x=0;B[x];x++){var z=(" "+B[x].className+" ").indexOf(w)>=0;if(!A&&z||A&&!z){y.push(B[x])
}}return y},filter:function(x,B,A){var w=k.exec(x),C=w[2],z=w[1],y;if(z==="."){return b.classFilter(b.makeArray(B),C,A)
}else{if(z==="#"){y=function(E){var D=E&&E.getAttribute&&(E.getAttribute("id")===C);
return(A)?!D:D}}else{y=function(E){var D=b.nodeName(E,C);return(A)?!D:D}}return Array.prototype.filter.call(b.makeArray(B),y)
}},multiFilter:function(z,w,y){z=(z.indexOf(","))?z.split(","):[z];var B=z.length,A,x=[];
while(--B>=0){A=b.filter(z[B].trim(),w,y);x=y?w=A:b.merge(A,x)}return x},merge:function(z,w){var x=0,y,A=z.length;
if(SC.browser.msie){while(y=w[x++]){if(y.nodeType!=8){z[A++]=y}}}else{while(y=w[x++]){z[A++]=y
}}return z},makeArray:function(y){var w=[];if(y!=null){var x=y.length;if(x==null||typeof y==="string"||y.setInterval){w[0]=y
}else{while(x){w[--x]=y[x]}}}return w},inArray:function(w,x){return(x.indexOf)?x.indexOf(w):Array.prototype.indexOf.call(x,w)
},boxModel:!SC.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":t,cssFloat:t,styleFloat:t,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan"},prop:function(z,A,y,x,w){if(SC.typeOf(A)===SC.T_FUNCTION){A=A.call(z,x)
}return A&&(typeof A==="number")&&y=="curCSS"&&!a.test(w)?A+"px":A},grep:function(x,B,w){var y=[];
for(var z=0,A=x.length;z<A;z++){if(!w!=!B(x[z],z)){y.push(x[z])}}return y},className:{add:function(x,y){var w=b.className.has;
b.each((y||"").split(/\s+/),function(z,A){if(x.nodeType==1&&!w(x.className,A)){x.className+=(x.className?" ":"")+A
}})},remove:function(w,x){if(w.nodeType==1){w.className=x!==g?b.grep(w.className.split(/\s+/),function(y){return !b.className.has(x,y)
}).join(" "):""}},has:function(x,w){return x&&b.inArray(w,(x.className||x).toString().split(/\s+/))>-1
}},swap:function(B,A,D,C,w){var x={};for(var z in A){x[z]=B.style[z];B.style[z]=A[z]
}var y=D(B,C,w);for(var z in A){B.style[z]=x[z]}return y},css:function(y,w,z){if(w=="width"||w=="height"){var B,A=(w=="width")?j:c,x=l;
B=SC.$.isVisible(y)?s(y,w,A):b.swap(y,x,s,w,A);return Math.max(0,B)}return b.curCSS(y,w,z)
},curCSS:function(C,x,y){var H,w=C.style;if(x=="opacity"&&SC.browser.msie){H=b.attr(w,"opacity");
return H==""?"1":H}if(SC.browser.opera&&x==="display"){var I=w.outline;w.outline="0 solid black";
w.outline=I}var z=x.match(/float/i);if(z){x=t}if(!y&&w&&w[x]){H=w[x]}else{if(o.getComputedStyle){if(z){x="float"
}x=x.replace(/([A-Z])/g,"-$1").toLowerCase();var J=o.getComputedStyle(C,null);if(J&&!m(C,o)){H=J.getPropertyValue(x)
}else{var B=[],K=[],L=C,E=0,G,D;for(;L&&m(L);L=L.parentNode){K.unshift(L)}for(D=K.length;
E<D;E++){if(m(K[E])){B[E]=K[E].style.display;K[E].style.display="block"}}H=(x=="display"&&B[K.length-1]!=null)?"none":(J&&J.getPropertyValue(x))||"";
for(E=0,G=B.length;E<G;E++){if(B[E]!=null){K[E].style.display=B[E]}}}if(x=="opacity"&&H==""){H="1"
}}else{if(C.currentStyle){H=C.currentStyle[x]||C.currentStyle[x.camelize()];if(!(/^\d+(px)?$/i).test(H)&&(/^\d/).test(H)){var A=w.left,F=C.runtimeStyle.left;
C.runtimeStyle.left=C.currentStyle.left;w.left=H||0;H=w.pixelLeft+"px";w.left=A;C.runtimeStyle.left=F
}}}}return H},dir:function(y,x){var w=[],z=y[x];while(z&&z!=document){if(z.nodeType==1){w.push(z)
}z=z[x]}return w},nth:function(A,w,y,z){w=w||1;var x=0;for(;A;A=A[y]){if(A.nodeType==1&&++x==w){break
}}return A},sibling:function(y,x){var w=[];for(;y;y=y.nextSibling){if(y.nodeType==1&&y!=x){w.push(y)
}}return w},attr:function(x,w,D){if(!x||x.nodeType==3||x.nodeType==8){return g}var y=!b.isXMLDoc(x),C=D!==g,A=SC.browser.msie;
w=y&&b.props[w]||w;if(x.tagName){var B=/href|src|style/.test(w);if(w=="selected"&&x.parentNode){x.parentNode.selectedIndex
}if(w in x&&y&&!B){if(C){if(w=="type"&&b.nodeName(x,"input")&&x.parentNode){throw"type property can't be changed"
}x[w]=D}if(b.nodeName(x,"form")&&x.getAttributeNode(w)){return x.getAttributeNode(w).nodeValue
}if(w=="tabIndex"){var E=x.getAttributeNode("tabIndex");return E&&E.specified?E.value:x.nodeName.match(/(button|input|object|select|textarea)/i)?0:x.nodeName.match(/^(a|area)$/i)&&x.href?0:g
}return x[w]}if(A&&y&&w==="style"){return b.attr(x.style,"cssText",D)}if(C){x.setAttribute(w,""+D)
}var z=(A&&y&&B)?x.getAttribute(w,2):x.getAttribute(w);return z===null?g:z}if(A&&w=="opacity"){if(C){x.zoom=1;
x.filter=(x.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(D,0)+""=="NaN"?"":"alpha(opacity="+D*100+")")
}return x.filter&&x.filter.indexOf("opacity=")>=0?(parseFloat(x.filter.match(/opacity=([^)]*)/)[1])/100)+"":""
}w=w.camelize();if(C){x[w]=D}return x[w]}});b.fn.init.prototype=b.fn;b.each({parent:function(w){return w.parentNode
},parents:function(w){return b.dir(w,"parentNode")},next:function(w){return b.nth(w,2,"nextSibling")
},prev:function(w){return b.nth(w,2,"previousSibling")},nextAll:function(w){return b.dir(w,"nextSibling")
},prevAll:function(w){return b.dir(w,"previousSibling")},siblings:function(w){return b.sibling(w.parentNode.firstChild,w)
},children:function(w){return b.sibling(w.firstChild)},contents:function(w){return b.nodeName(w,"iframe")?w.contentDocument||w.contentWindow.document:b.makeArray(w.childNodes)
}},function(w,x){b.fn[w]=function(y){var z=b.map(this,x);if(y&&typeof y=="string"){z=b.multiFilter(y,z)
}return this.pushStack(z.uniq())}});b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(w,x){b.fn[w]=function(){var y=arguments;
return this.each(function(){for(var z=0,A=y.length;z<A;z++){b(y[z])[x](this)}})}});
b.each({removeAttr:function(w){b.attr(this,w,"");if(this.nodeType==1){this.removeAttribute(w)
}},addClass:function(w){b.className.add(this,w)},removeClass:function(w){b.className.remove(this,w)
},toggleClass:function(w){b.className[b.className.has(this,w)?"remove":"add"](this,w)
},remove:function(w){if(!w||b.filter(w,[this]).length){if(this.parentNode){this.parentNode.removeChild(this)
}}},empty:function(){while(this.firstChild){this.removeChild(this.firstChild)}}},function(w,x){b.fn[w]=function(){return this.each(x,arguments)
}});b.each(["Height","Width"],function(z,x){var A=x.toLowerCase();b.fn[A]=function(B){if(this[0]===window){if(SC.browser.opera){ret=document.body["client"+x]
}else{if(SC.browser.safari){ret=window["inner"+x]}else{if(document.compatMode){ret=documentElement["client"+x]
}else{ret=document.body["client"+x]}}}}else{if(this[0]===document){ret=Math.max(Math.max(document.body["scroll"+x],document.documentElement["scroll"+x]),Math.max(document.body["offset"+x],document.documentElement["offset"+x]))
}else{if(B==g){return this.length?b.css(this[0],A):null}else{return this.css(A,(typeof B==="string")?B:B+"px")
}}}return ret};var w=z?"Left":"Top",y=z?"Right":"Bottom";b.fn["inner"+x]=function(){return this[x.toLowerCase()]()+i(this,"padding"+w)+i(this,"padding"+y)
};b.fn["outer"+x]=function(B){return this["inner"+x]()+i(this,"border"+w+"Width")+i(this,"border"+y+"Width")+(B?i(this,"margin"+w)+i(this,"margin"+y):0)
}});p.fn.offset=function(){var x=0,F=0,y=this[0],K=SC.browser,B;if(!y){return g}function A(L){J(b.curCSS(L,"borderLeftWidth",true),b.curCSS(L,"borderTopWidth",true))
}function J(L,M){x+=parseInt(L,10)||0;F+=parseInt(M,10)||0}var H=y.parentNode,E=y,w=y.offsetParent,G=y.ownerDocument,I=K.safari&&parseInt(K.version,0)<522&&!(/adobeair/i).test(K.userAgent),D=b.curCSS,z=b.css(y,"position")=="fixed";
if(!(K.mozilla&&y==document.body)&&y.getBoundingClientRect){var C=y.getBoundingClientRect();
J(C.left+Math.max(G.documentElement.scrollLeft,G.body.scrollLeft),C.top+Math.max(G.documentElement.scrollTop,G.body.scrollTop));
J(-G.documentElement.clientLeft,-G.documentElement.clientTop)}else{J(y.offsetLeft,y.offsetTop);
while(w){J(w.offsetLeft,w.offsetTop);if(K.mozilla&&!(/^t(able|d|h)$/i).test(w.tagName)||K.safari&&!I){A(w)
}if(!z&&D(w,"position")=="fixed"){z=true}E=(/^body$/i).test(w.tagName)?E:w;w=w.offsetParent
}while(H&&H.tagName&&!(/^body|html$/i).test(H.tagName)){if(!(/^inline|table.*$/i).test(D(H,"display"))){J(-H.scrollLeft,-H.scrollTop)
}if(K.mozilla&&D(H,"overflow")!="visible"){A(H)}H=H.parentNode}if((I&&(z||D(E,"position")=="absolute"))||(K.mozilla&&D(E,"position")!="absolute")){J(-G.body.offsetLeft,-G.body.offsetTop)
}if(z){J(Math.max(G.documentElement.scrollLeft,G.body.scrollLeft),Math.max(G.documentElement.scrollTop,G.body.scrollTop))
}}B={top:F,left:x};return B};p.fn.mixin({position:function(){var A=0,z=0,x;if(this[0]){var y=this.offsetParent(),B=this.offset(),w=/^body|html$/i.test(y[0].tagName)?{top:0,left:0}:y.offset();
B.top-=i(this,"marginTop");B.left-=i(this,"marginLeft");w.top+=i(y,"borderTopWidth");
w.left+=i(y,"borderLeftWidth");x={top:B.top-w.top,left:B.left-w.left}}return x},offsetParent:function(){var w=this[0].offsetParent||document.body;
while(w&&(!(/^body|html$/i).test(w.tagName)&&b.css(w,"position")=="static")){w=w.offsetParent
}return b(w)}});b.each(["Left","Top"],function(x,w){var y="scroll"+w;b.fn[y]=function(z){if(!this[0]){return
}return z!=g?this.each(function(){this==window||this==document?window.scrollTo(!x?z:b(window).scrollLeft(),x?z:b(window).scrollTop()):this[y]=z
}):this[0]==window||this[0]==document?self[x?"pageYOffset":"pageXOffset"]||b.boxModel&&document.documentElement[y]||document.body[y]:this[0][y]
}});return p}());SC.$=(typeof jQuery=="undefined")?SC.CoreQuery:jQuery;SC.mixin(SC.$.fn,{isCoreQuery:YES,toString:function(){var c=[];
var b=this.length,a=0;for(a=0;a<b;a++){c[a]="%@: %@".fmt(a,(this[a])?this[a].toString():"(null)")
}return"<$:%@>(%@)".fmt(SC.guidFor(this),c.join(" , "))},isVisible:function(){return Array.prototype.every.call(this,function(a){return SC.$.isVisible(a)
})},first:function(){return this.pushStack([this[0]])},last:function(){return this.pushStack([this[this.length-1]])
},view:function(){return this.map(function(){var b=null,a=SC.viewKey,e=this,c;while(!b&&e&&(e!==document)){if(c=e.getAttribute("id")){b=SC.View.views[c]
}e=e.parentNode}e=null;return b})},setClass:function(e,c){if(SC.none(e)){return this
}var f=SC.typeOf(e)!==SC.T_STRING;var a=this._fixupClass,b;this.each(function(){if(this.nodeType!==1){return
}var i=this.className.split(/\s+/),h=NO;if(f){for(var g in e){if(!e.hasOwnProperty(g)){continue
}h=a(i,g,e[g])||h}}else{h=a(i,e,c)}if(h){this.className=i.join(" ")}});return this
},_fixupClass:function(e,a,c){var b=e.indexOf(a);if(c){if(b<0){e.push(a);return YES
}}else{if(b>=0){e[b]=null;return YES}}return NO},within:function(f){f=SC.$(f);var e,c,h,b,a=f.length;
var g=this.length;while(!e&&(--g>=0)){h=this[g];for(b=0;!e&&(b<a);b++){c=f[b];while(c&&(c!==h)){c=c.parentNode
}e=c===h}}h=c=null;return e}});(function(){var c={};var g={find:function(j,i){return(i!==undefined)?SC.Enumerable.find.call(this,j,i):c.find.call(this,j)
},filter:function(j,i){return(i!==undefined)?this.pushStack(SC.Enumerable.filter.call(this,j,i)):c.filter.call(this,j)
},filterProperty:function(i,j){return this.pushStack(SC.Enumerable.filterProperty.call(this,i,j))
},indexOf:SC.$.index,map:function(j,i){return(i!==undefined)?SC.Enumerable.map.call(this,j,i):c.map.call(this,j)
}};var h=SC.$.jquery==="SC.CoreQuery";var e=SC.$.fn,a=h?g:SC.Enumerable;for(var b in a){if(!a.hasOwnProperty(b)){continue
}var f=a[b];if(b in g){c[b]=e[b];f=g[b]}e[b]=f}})();SC.mixin(SC.$,{isVisible:function(a){var b=SC.$;
return("hidden"!=a.type)&&(b.css(a,"display")!="none")&&(b.css(a,"visibility")!="hidden")
}});sc_require("system/core_query");SC.Event=function(e){if(e){this.originalEvent=e;
var h=SC.Event._props,c=h.length,b=c,f;while(--b>=0){f=h[b];this[f]=e[f]}}this.timeStamp=this.timeStamp||Date.now();
if(!this.target){this.target=this.srcElement||document}if(this.target.nodeType===3){this.target=this.target.parentNode
}if(!this.relatedTarget&&this.fromElement){this.relatedTarget=(this.fromElement===this.target)?this.toElement:this.fromElement
}if(SC.none(this.pageX)&&!SC.none(this.clientX)){var i=document.documentElement,a=document.body;
this.pageX=this.clientX+(i&&i.scrollLeft||a&&a.scrollLeft||0)-(i.clientLeft||0);this.pageY=this.clientY+(i&&i.scrollTop||a&&a.scrollTop||0)-(i.clientTop||0)
}if(!this.which&&((this.charCode||e.charCode===0)?this.charCode:this.keyCode)){this.which=this.charCode||this.keyCode
}if(!this.metaKey&&this.ctrlKey){this.metaKey=this.ctrlKey}if(!this.which&&this.button){this.which=((this.button&1)?1:((this.button&2)?3:((this.button&4)?2:0)))
}if(SC.browser.safari&&e.wheelDelta!==undefined){this.wheelDelta=this.wheelDeltaY=0-(e.wheelDeltaY||e.wheelDelta);
this.wheelDeltaX=0-(e.wheelDeltaX||0)}else{if(!SC.none(e.detail)){var g=Math.floor(e.detail*2);
if(e.axis&&(e.axis===e.HORIZONTAL_AXIS)){this.wheelDeltaX=g;this.wheelDeltaY=this.wheelDelta=0
}else{this.wheelDeltaY=this.wheelDelta=g;this.wheelDeltaX=0}}else{this.wheelDelta=this.wheelDeltaY=SC.browser.msie?0-e.wheelDelta:e.wheelDelta;
this.wheelDeltaX=0}}return this};SC.mixin(SC.Event,{create:function(a){return new SC.Event(a)
},add:function(f,e,g,h,c){if(f&&f.isCoreQuery){if(f.length>0){f.forEach(function(i){this.add(i,e,g,h,c)
},this);return this}else{f=f.get(0)}}if(!f){return this}if(f.nodeType==3||f.nodeType==8){return SC.Event
}if(SC.browser.msie&&f.setInterval){f=window}if(SC.typeOf(g)===SC.T_FUNCTION){c=h;
h=g;g=null}else{if(g&&SC.typeOf(h)===SC.T_STRING){h=g[h]}}var b=SC.data(f,"events")||SC.data(f,"events",{}),a=b[e];
if(!a){a=b[e]={};this._addEventListener(f,e)}a[SC.guidFor(h)]=[g,h,c];SC.Event._global[e]=YES;
f=b=a=null;return this},remove:function(g,f,h,i){if(g&&g.isCoreQuery){if(g.length>0){g.forEach(function(j){this.remove(j,f,h,i)
},this);return this}else{g=g.get(0)}}if(!g){return this}if(g.nodeType==3||g.nodeType==8){return SC.Event
}if(SC.browser.msie&&g.setInterval){g=window}var a,e,c=SC.data(g,"events");if(!c){return this
}if(f===undefined){for(f in c){this.remove(g,f)}}else{if(a=c[f]){var b=NO;if(h||i){if(SC.typeOf(h)===SC.T_FUNCTION){i=h;
h=null}else{if(SC.typeOf(i)===SC.T_STRING){i=h[i]}}delete a[SC.guidFor(i)];e=null;
for(e in a){break}if(e===null){b=YES}}else{b=YES}if(b){delete c[f];this._removeEventListener(g,f)
}e=null;for(e in c){break}if(!e){SC.removeData(g,"events");delete this._elements[SC.guidFor(g)]
}}}g=c=a=null;return this},NO_BUBBLE:["blur","focus","change"],simulateEvent:function(e,c,b){var a=SC.Event.create({type:c,target:e,preventDefault:function(){this.cancelled=YES
},stopPropagation:function(){this.bubbles=NO},allowDefault:function(){this.hasCustomEventHandling=YES
},timeStamp:Date.now(),bubbles:(this.NO_BUBBLE.indexOf(c)<0),cancelled:NO,normalized:YES});
if(b){SC.mixin(a,b)}return a},trigger:function(c,b,j,k){if(c&&c.isCoreQuery){if(c.length>0){c.forEach(function(m){this.trigger(m,b,j,k)
},this);return this}else{c=c.get(0)}}if(!c){return this}if(c.nodeType==3||c.nodeType==8){return undefined
}j=SC.A(j);var i,l=SC.typeOf(c[b]||null)===SC.T_FUNCTION,a,h,f;a=j[0];if(!a||!a.preventDefault){a=this.simulateEvent(c,b);
j.unshift(a)}a.type=b;h=c;do{i=SC.Event.handle.apply(h,j);h=(h===document)?null:(h.parentNode||document)
}while(!i&&a.bubbles&&h);h=null;f=c["on"+b];isClick=SC.CoreQuery.nodeName(c,"a")&&b==="click";
if((!l||isClick)&&f&&f.apply(c,j)===NO){i=NO}if(l&&k!==NO&&i!==NO&&!isClick){this.triggered=YES;
try{c[b]()}catch(g){}}this.triggered=NO;return i},handle:function(b){if((typeof SC==="undefined")||SC.Event.triggered){return YES
}var c,h,f,j,e,i,k,l,a,g;i=SC.A(arguments);i[0]=b=SC.Event.normalizeEvent(b||window.event);
e=(SC.data(this,"events")||{})[b.type];if(!e){return NO}for(k in e){l=e[k];a=l[1];
b.handler=a;b.data=b.context=l[2];g=l[0]||this;h=a.apply(g,i);if(c!==NO){c=h}if(h===NO){b.preventDefault();
b.stopPropagation()}}return c},unload:function(){var a,b=this._elements;for(a in b){this.remove(b[a])
}for(a in b){delete b[a]}delete this._elements},special:{ready:{setup:function(){SC._bindReady();
return},teardown:function(){return}},mouseenter:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseover",SC.Event.special.mouseover.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseover",SC.Event.special.mouseover.handler);return YES},handler:function(a){if(SC.Event._withinElement(a,this)){return YES
}a.type="mouseenter";return SC.Event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},handler:function(a){if(SC.Event._withinElement(a,this)){return YES
}a.type="mouseleave";return SC.Event.handle.apply(this,arguments)}}},KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,_withinElement:function(e,c){var b=e.relatedTarget;
while(b&&b!=c){try{b=b.parentNode}catch(a){b=c}}return b===c},_addEventListener:function(e,c){var f,b=this.special[c];
if(!b||b.setup.call(e)===NO){var a=SC.guidFor(e);this._elements[a]=e;f=SC.data(e,"listener")||SC.data(e,"listener",function(){return SC.Event.handle.apply(SC.Event._elements[a],arguments)
});if(e.addEventListener){e.addEventListener(c,f,NO)}else{if(e.attachEvent){e.attachEvent("on"+c,f)
}}}e=b=f=null},_removeEventListener:function(c,b){var e,a=SC.Event.special[b];if(!a||(a.teardown.call(c)===NO)){e=SC.data(c,"listener");
if(e){if(c.removeEventListener){c.removeEventListener(b,e,NO)}else{if(c.detachEvent){c.detachEvent("on"+b,e)
}}}}c=a=e=null},_elements:{},normalizeEvent:function(a){if(a==window.event){return SC.Event.create(a)
}else{return a.normalized?a:SC.Event.create(a)}},_global:{},_props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view which touches targetTouches changedTouches".split(" ")});
SC.Event.prototype={hasCustomEventHandling:NO,allowDefault:function(){this.hasCustomEventHandling=YES;
return this},preventDefault:function(){var a=this.originalEvent;if(a){if(a.preventDefault){a.preventDefault()
}a.returnValue=NO}this.hasCustomEventHandling=YES;return this},stopPropagation:function(){var a=this.originalEvent;
if(a){if(a.stopPropagation){a.stopPropagation()}a.cancelBubble=YES}this.hasCustomEventHandling=YES;
return this},stop:function(){return this.preventDefault().stopPropagation()},normalized:YES,getCharString:function(){return(this.charCode>0)?String.fromCharCode(this.which):null
},commandCodes:function(){var f=this.keyCode,b=null,c=null,a="",e;if(f){b=SC.FUNCTION_KEYS[f];
if(!b&&(this.altKey||this.ctrlKey||this.metaKey)){b=SC.PRINTABLE_KEYS[f]}if(b){if(this.altKey){a+="alt_"
}if(this.ctrlKey||this.metaKey){a+="ctrl_"}if(this.shiftKey){a+="shift_"}}}if(!b){f=this.which;
c=b=String.fromCharCode(f);e=b.toLowerCase();if(this.metaKey){a="meta_";b=e}else{b=null
}}if(b){b=a+b}return[b,c]}};SC.Event.observe=SC.Event.add;SC.Event.stopObserving=SC.Event.remove;
SC.Event.fire=SC.Event.trigger;SC.Event.add(window,"unload",SC.Event.prototype,SC.Event.unload);
SC.MODIFIER_KEYS={16:"shift",17:"ctrl",18:"alt"};SC.FUNCTION_KEYS={8:"backspace",9:"tab",13:"return",19:"pause",27:"escape",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"printscreen",45:"insert",46:"delete",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scrolllock"};
SC.PRINTABLE_KEYS={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:'"'};
SC.SYSTEM_CURSOR="default";SC.AUTO_CURSOR=SC.DEFAULT_CURSOR="auto";SC.CROSSHAIR_CURSOR="crosshair";
SC.HAND_CURSOR=SC.POINTER_CURSOR="pointer";SC.MOVE_CURSOR="move";SC.E_RESIZE_CURSOR="e-resize";
SC.NE_RESIZE_CURSOR="ne-resize";SC.NW_RESIZE_CURSOR="nw-resize";SC.N_RESIZE_CURSOR="n-resize";
SC.SE_RESIZE_CURSOR="se-resize";SC.SW_RESIZE_CURSOR="sw-resize";SC.S_RESIZE_CURSOR="s-resize";
SC.W_RESIZE_CURSOR="w-resize";SC.IBEAM_CURSOR=SC.TEXT_CURSOR="text";SC.WAIT_CURSOR="wait";
SC.HELP_CURSOR="help";SC.Cursor=SC.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("cursorStyle")||SC.DEFAULT_CURSOR,b=this.constructor.sharedStyleSheet();
if(b.insertRule){b.insertRule(".%@ {cursor: %@;}".fmt(SC.guidFor(this),a),b.cssRules?b.cssRules.length:0)
}else{if(b.addRule){b.addRule("."+SC.guidFor(this),"cursor: "+a)}}this.cursorStyle=a;
this.className=SC.guidFor(this);return this},className:null,cursorStyle:SC.DEFAULT_CURSOR,cursorStyleDidChange:function(){var e,g,c,f,h,b,a;
e=this.get("cursorStyle")||SC.DEFAULT_CURSOR;g=this._rule;if(g){g.style.cursor=e;
return}c="."+this.get("className");f=this.constructor.sharedStyleSheet();h=(f.cssRules?f.cssRules:f.rules)||[];
for(b=0,a=h.length;b<a;++b){g=h[b];if(g.selectorText===c){this._rule=g;g.style.cursor=e;
break}}}.observes("cursorStyle")});SC.Cursor.sharedStyleSheet=function(){var b,a=this._styleSheet;
if(!a){a=document.createElement("style");a.type="text/css";b=document.getElementsByTagName("head")[0];
if(!b){b=document.documentElement}b.appendChild(a);a=document.styleSheets[document.styleSheets.length-1];
this._styleSheet=a}return a};SC.Responder=SC.Object.extend({isResponder:YES,pane:null,responderContext:null,nextResponder:null,isFirstResponder:NO,hasFirstResponder:NO,acceptsFirstResponder:YES,becomeFirstResponder:function(){var a=this.get("pane")||this.get("responderContext")||this.pane();
if(a&&this.get("acceptsFirstResponder")){if(a.get("firstResponder")!==this){a.makeFirstResponder(this)
}}return this},resignFirstResponder:function(){var a=this.get("pane")||this.get("responderContext");
if(a&&(a.get("firstResponder")===this)){a.makeFirstResponder(null)}return YES},willLoseFirstResponder:function(a){},didBecomeFirstResponder:function(a){}});
sc_require("system/browser");sc_require("system/event");sc_require("system/cursor");
sc_require("system/responder");sc_require("mixins/string");SC.viewKey=SC.guidKey+"_view";
SC.LAYOUT_HORIZONTAL="sc-layout-horizontal";SC.LAYOUT_VERTICAL="sc-layout-vertical";
SC._VIEW_DEFAULT_DIMS="marginTop marginLeft".w();SC.ANCHOR_TOP={top:0};SC.ANCHOR_LEFT={left:0};
SC.ANCHOR_TOP_LEFT={top:0,left:0};SC.ANCHOR_BOTTOM={bottom:0};SC.ANCHOR_RIGHT={right:0};
SC.ANCHOR_BOTTOM_RIGHT={bottom:0,right:0};SC.FULL_WIDTH={left:0,right:0};SC.FULL_HEIGHT={top:0,bottom:0};
SC.ANCHOR_CENTER={centerX:0,centerY:0};SC.LAYOUT_AUTO="auto";SC.EMPTY_CHILD_VIEWS_ARRAY=[];
SC.EMPTY_CHILD_VIEWS_ARRAY.needsClone=YES;SC.View=SC.Responder.extend(SC.DelegateSupport,{concatenatedProperties:"outlets displayProperties layoutProperties classNames renderMixin didCreateLayerMixin willDestroyLayerMixin".w(),pane:function(){var a=this;
while(a&&!a.isPane){a=a.get("parentView")}return a}.property("parentView").cacheable(),page:null,splitView:function(){var a=this;
while(a&&!a.isSplitView){a=a.get("parentView")}return a}.property("parentView").cacheable(),parentView:null,backgroundColor:null,isEnabled:YES,isEnabledBindingDefault:SC.Binding.oneWay().bool(),isEnabledInPane:function(){var a=this.get("isEnabled"),b;
if(a&&(b=this.get("parentView"))){a=b.get("isEnabledInPane")}return a}.property("parentView","isEnabled"),isVisible:YES,isVisibleBindingDefault:SC.Binding.bool(),isVisibleInWindow:NO,recomputeIsVisibleInWindow:function(c){var f=this.get("isVisibleInWindow");
var h=this.get("isVisible"),e;if(h){h=(c===undefined)?((e=this.get("parentView"))?e.get("isVisibleInWindow"):NO):c
}if(f!==h){this.set("isVisibleInWindow",h);this._needsVisibiltyChange=YES;var g=this.get("childViews"),b=g.length,a;
for(a=0;a<b;a++){g[a].recomputeIsVisibleInWindow(h)}if(h){if(this.parentViewDidResize){this.parentViewDidResize()
}if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}this.set("layerNeedsUpdate",YES);if(!h&&this.get("isFirstResponder")){this.resignFirstResponder()
}}return this}.observes("isVisible"),childViews:SC.EMPTY_CHILD_VIEWS_ARRAY,insertBefore:function(b,e){b.beginPropertyChanges();
if(b.get("parentView")){b.removeFromParent()}if(this.willAddChild){this.willAddChild(b,e)
}if(b.willAddToParent){b.willAddToParent(this,e)}b.set("parentView",this);var a,c=this.get("childViews");
if(c.needsClone){this.set(c=[])}a=(e)?c.indexOf(e):c.length;if(a<0){a=c.length}c.insertAt(a,b);
b.parentViewDidChange();b.layoutDidChange();if(this.didAddChild){this.didAddChild(b,e)
}if(b.didAddToParent){b.didAddToParent(this,e)}b.endPropertyChanges();return this
},removeChild:function(b){if(!b){return this}if(b.parentView!==this){throw"%@.removeChild(%@) must belong to parent".fmt(this,b)
}if(b.willRemoveFromParent){b.willRemoveFromParent()}if(this.willRemoveChild){this.willRemoveChild(b)
}b.set("parentView",null);var c=this.get("childViews");var a=c.indexOf(b);if(a>=0){c.removeAt(a)
}b.parentViewDidChange();if(this.didRemoveChild){this.didRemoveChild(b)}if(b.didRemoveFromParent){b.didRemoveFromParent(this)
}return this},removeAllChildren:function(){var b=this.get("childViews"),a;while(a=b.objectAt(b.get("length")-1)){this.removeChild(a)
}return this},removeFromParent:function(){var a=this.get("parentView");if(a){a.removeChild(this)
}return this},replaceChild:function(a,b){a.beginPropertyChanges();b.beginPropertyChanges();
this.beginPropertyChanges();this.insertBefore(a,b).removeChild(b);this.endPropertyChanges();
b.endPropertyChanges();a.endPropertyChanges();return this},replaceAllChildren:function(c){var b=c.get("length"),a;
this.beginPropertyChanges();this.destroyLayer().removeAllChildren();for(a=0;a<b;a++){this.appendChild(c.objectAt(a))
}this.replaceLayer();this.endPropertyChanges();return this},appendChild:function(a){return this.insertBefore(a,null)
},parentViewDidChange:function(){this.recomputeIsVisibleInWindow();this.set("layerLocationNeedsUpdate",YES);
this.invokeOnce(this.updateLayerLocationIfNeeded);this._invalidatePaneCacheForSelfAndAllChildViews();
return this}.observes("isVisible"),_invalidatePaneCacheForSelfAndAllChildViews:function(){this.notifyPropertyChange("pane");
var c=this.get("childViews");var b=c.length;for(var a=0;a<b;++a){var e=c[a];if(e._invalidatePaneCacheForSelfAndAllChildViews){e._invalidatePaneCacheForSelfAndAllChildViews()
}}},layer:function(a,c){if(c!==undefined){this._view_layer=c}else{c=this._view_layer;
if(!c){var b=this.get("parentView");if(b){b=b.get("layer")}if(b){this._view_layer=c=this.findLayerInParentLayer(b)
}b=null}}return c}.property("isVisibleInWindow").cacheable(),$:function(c){var a,b=this.get("layer");
a=!b?SC.$([]):(c===undefined)?SC.$(b):SC.$(c,b);b=null;return a},containerLayer:function(){return this.get("layer")
}.property("layer").cacheable(),layerId:function(){return SC.guidFor(this)}.property().cacheable(),findLayerInParentLayer:function(e){var a=this.get("layerId");
var g,c,b,j,f;if(e.getElementById){f=e.getElementById(a)}else{f=document.getElementById(a)
}if(SC.browser.msie&&f&&f.id!==a){f=null}if(!f&&e.querySelector){}if(!f){f=e.firstChild;
var h=[];h.push(e);while(h.length!==0){g=h[0];h.shift();if(g.id===a){j=true;f=g;break
}for(c=0,b=g.childNodes.length;c<b;c++){h.push(g.childNodes[c])}}if(!j){f=null}}return f
},displayDidChange:function(){this.set("layerNeedsUpdate",YES);return this},layerNeedsUpdate:NO,_view_layerNeedsUpdateDidChange:function(){if(this.get("layerNeedsUpdate")){this.invokeOnce(this.updateLayerIfNeeded)
}}.observes("layerNeedsUpdate"),updateLayerIfNeeded:function(){var a=this.get("isVisibleInWindow");
if((a||this._needsVisibiltyChange)&&this.get("layerNeedsUpdate")){this._needsVisibiltyChange=NO;
if(this.get("layer")){this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);
this.updateLayer();this.endPropertyChanges()}}else{this.set("layerNeedsUpdate",NO)
}return this},updateLayer:function(){var a=this.renderContext(this.get("layer"));
this.prepareContext(a,NO);a.update();if(this.didUpdateLayer){this.didUpdateLayer()
}if(this.designer&&this.designer.viewDidUpdateLayer){this.designer.viewDidUpdateLayer()
}return this},renderContext:function(a){return SC.RenderContext(a)},createLayer:function(){if(this.get("layer")){return this
}var a=this.renderContext(this.get("tagName"));this.prepareContext(a,YES);this.set("layer",a.element());
this._notifyDidCreateLayer();return this},_notifyDidCreateLayer:function(){if(this.didCreateLayer){this.didCreateLayer()
}var c=this.didCreateLayerMixin,b,a;if(c){b=c.length;for(a=0;a<b;++a){c[a].call(this)
}}var e=this.get("childViews");b=e.length;for(a=0;a<b;++a){if(!e[a]){continue}e[a]._notifyDidCreateLayer()
}},destroyLayer:function(){var a=this.get("layer");if(a){this._notifyWillDestroyLayer();
if(a.parentNode){a.parentNode.removeChild(a)}a=null}return this},replaceLayer:function(){this.destroyLayer();
this.set("layerLocationNeedsUpdate",YES);this.invokeOnce(this.updateLayerLocationIfNeeded)
},_notifyWillDestroyLayer:function(){if(this.willDestroyLayer){this.willDestroyLayer()
}var c=this.willDestroyLayerMixin,b,a;if(c){b=c.length;for(a=0;a<b;++a){c[a].call(this)
}}var e=this.get("childViews");b=e.length;for(a=0;a<b;++a){e[a]._notifyWillDestroyLayer()
}this.set("layer",null)},prepareContext:function(g,i){var f,b,a,e,c,h;if(i){e=this.layerId?this.get("layerId"):SC.guidFor(this);
g.id(e).classNames(this.get("classNames"),YES);this.renderLayout(g,i)}else{g.resetClassNames();
g.classNames(this.get("classNames"),YES)}if(this.get("isTextSelectable")){g.addClass("allow-select")
}if(!this.get("isEnabled")){g.addClass("disabled")}if(!this.get("isVisible")){g.addClass("hidden")
}if(this.get("isFirstResponder")){g.addClass("focus")}c=this.get("backgroundColor");
if(c){g.addStyle("backgroundColor",c)}h=this.get("cursor");if(h){g.addClass(h.get("className"))
}this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);this.render(g,i);if(f=this.renderMixin){b=f.length;
for(a=0;a<b;++a){f[a].call(this,g,i)}}this.endPropertyChanges()},renderChildViews:function(f,g){var e=this.get("childViews"),b=e.length,a,c;
for(a=0;a<b;++a){c=e[a];if(!c){continue}f=f.begin(c.get("tagName"));c.prepareContext(f,g);
f=f.end()}return f},render:function(a,b){if(b){this.renderChildViews(a,b)}},tagName:"div",classNames:["sc-view"],toolTip:null,isTextSelectable:NO,displayProperties:["isFirstResponder","isVisible"],cursor:null,layerLocationNeedsUpdate:NO,updateLayerLocationIfNeeded:function(a){if(this.get("layerLocationNeedsUpdate")){this.set("layerLocationNeedsUpdate",NO);
this.updateLayerLocation()}return this},updateLayerLocation:function(){var f=this.get("layer");
var e=this.get("parentView");var b=e?e.get("containerLayer"):null;if(f&&f.parentNode&&f.parentNode!==b){f.parentNode.removeChild(f)
}if(!e){if(f&&f.parentNode){f.parentNode.removeChild(f)}}else{if(!b){if(f){if(f.parentNode){f.parentNode.removeChild(f)
}this.destroyLayer()}}else{if(!f){this.createLayer();f=this.get("layer")}var g=e.get("childViews");
var c=g.objectAt(g.indexOf(this)+1);var a=(c)?c.get("layer"):null;if(c&&(!a||a.parentNode!==b)){c.updateLayerLocationIfNeeded();
a=c.get("layer")}if((f.parentNode!==b)||(f.nextSibling!==a)){b.insertBefore(f,a);
if(this.parentViewDidResize){this.parentViewDidResize()}}}}b=e=f=null;return this
},nextResponder:function(){return this.get("parentView")}.property("parentView").cacheable(),acceptsFirstResponder:NO,isKeyResponder:NO,willLoseKeyResponderTo:function(a){},willBecomeKeyResponderFrom:function(a){},didLoseKeyResponderTo:function(a){},didBecomeKeyResponderFrom:function(a){},interpretKeyEvents:function(b){var a=b.commandCodes(),e=a[0],f=a[1],h;
if(!e&&!f){return null}if(e){var i=SC.MODIFIED_KEY_BINDINGS[e]||SC.BASE_KEY_BINDINGS[e.match(/[^_]+$/)[0]];
if(i){var g=this,c=this.get("pane"),j=null;while(g&&!(j=g.tryToPerform(i,b))){g=(g===c)?null:g.get("nextResponder")
}return j}}if(f&&this.respondsTo("insertText")){h=this.insertText(f,b);return h?(h===YES?this:h):null
}return null},insertText:function(a){return NO},performKeyEquivalent:function(f,c){var e=NO,g=this.get("childViews"),b=g.length,a=-1;
while(!e&&(++a<b)){e=g[a].performKeyEquivalent(f,c)}return e},nextKeyView:null,nextValidKeyView:function(){var a=SC.CoreSet.create(),b=this._computeNextValidKeyView(a);
a.destroy();return b}.property("nextKeyView"),_computeNextValidKeyView:function(c){var e=this.get("nextKeyView"),f,b,a;
c.add(this);if(!e){f=this.get("parentView");b=f?f.get("childViews"):null;a=b?b.indexOf(this):-1;
if(a<0){e=null}else{if(a+1>=b.get("length")){e=b.objectAt(0)}else{e=b.objectAt(a+1)
}}}if(e&&!e.get("acceptsFirstResponder")){if(c.contains(e)){e=null}else{e=e._computeNextValidKeyView(c)
}}return e},previousKeyView:null,previousValidKeyView:function(){var a=SC.CoreSet.create(),b=this._computePreviousValidKeyView(a);
a.destroy();return b}.property("previousKeyView"),_computePreviousValidKeyView:function(c){var e=this.get("previousKeyView"),f,b,a;
c.add(this);if(!e){f=this.get("parentView");b=f?f.get("childViews"):null;a=b?b.indexOf(this):-1;
if(a<0){e=null}else{if(a>0){e=b.objectAt(a-1)}else{e=b.objectAt(b.get("length")-1)
}}}if(e&&!e.get("acceptsFirstResponder")){if(c.contains(e)){e=null}else{e=e._computePreviousValidKeyView(c)
}}return e},init:function(){var f,h,c,b,a,e,i;arguments.callee.base.apply(this,arguments);
if(!this.get("isMaterialized")){SC.View.views[this.get("layerId")]=this}var g=this.get("childViews");
this.childViews=g?g.slice():[];this.createChildViews();i=this.get("displayProperties");
b=i.length;while(--b>=0){this.addObserver(i[b],this,this.displayDidChange)}if(this.get("isDropTarget")){SC.Drag.addDropTarget(this)
}if(this.get("isScrollable")){SC.Drag.addScrollableView(this)}},awake:function(){arguments.callee.base.apply(this,arguments);
var c=this.get("childViews"),b=c.length,a;for(a=0;a<b;++a){if(!c[a]){continue}c[a].awake()
}},destroy:function(){if(this.get("isDestroyed")){return this}arguments.callee.base.apply(this,arguments);
this.removeFromParent();this._destroy();if(this.get("isDropTarget")){SC.Drag.removeDropTarget(this)
}if(this.get("isScrollable")){SC.Drag.removeScrollableView(this)}return this},_destroy:function(){if(this.get("isDestroyed")){return this
}this.destroyLayer();var c=this.get("childViews"),b=c.length,a;if(b){c=c.slice();
for(a=0;a<b;++a){c[a]._destroy()}}delete SC.View.views[this.get("layerId")];delete this._CQ;
delete this.page;this.set("isDestroyed",YES);return this},createChildViews:function(){var g=this.get("childViews"),b=g.length,a,f,e,c;
this.beginPropertyChanges();for(a=0;a<b;++a){if(f=(c=g[a])){if(typeof f===SC.T_STRING){c=this[f]
}else{f=null}if(!c){console.error("No view with name "+f+" has been found in "+this.toString());
continue}if(c.isClass){c=this.createChildView(c);if(f){this[f]=c}}}g[a]=c}this.endPropertyChanges();
return this},createChildView:function(a,b){if(!b){b={}}b.owner=b.parentView=this;
b.isVisibleInWindow=this.get("isVisibleInWindow");if(!b.page){b.page=this.page}a=a.create(b);
return a},adjust:function(a,e){var b=SC.clone(this.get("layout")),c=NO,g;if(a===undefined){return this
}if(SC.typeOf(a)===SC.T_STRING){g=b[a];if(SC.none(e)){if(g!==undefined){c=YES}delete b[a]
}else{if(g!==e){c=YES}b[a]=e}}else{var f=a;for(a in f){if(!f.hasOwnProperty(a)){continue
}e=f[a];g=b[a];if(e===null){if(g!==undefined){c=YES}delete b[a]}else{if(e!==undefined){if(g!==e){c=YES
}b[a]=e}}}}if(c){this.set("layout",b)}return this},layout:{top:0,left:0,bottom:0,right:0},convertFrameToView:function(j,e){var c=0,b=0,h=0,g=0,a=this,i;
if(this.get("useStaticLayout")){throw"convertFrameToView is not available with static layout"
}while(a){i=a.get("frame");c+=i.x;b+=i.y;a=a.get("layoutView")}if(e){a=e;while(a){i=a.get("frame");
h+=i.x;g+=i.y;a=a.get("layoutView")}}c=j.x+c-h;b=j.y+b-g;return{x:c,y:b,width:j.width,height:j.height}
},convertFrameFromView:function(b,a){var k=0,i=0,h=0,g=0,j=this,c,e;if(this.get("useStaticLayout")){throw"convertFrameToView is not available with static layout"
}while(j&&j.get("frame")){e=j.get("frame");k+=e.x;i+=e.y;j=j.get("parentView")}if(a){j=a;
while(j){e=j.get("frame");h+=e.x;g+=e.y;j=j.get("parentView")}}k=b.x-k+h;i=b.y-i+g;
return{x:k,y:i,width:b.width,height:b.height}},scrollToVisible:function(){var a=this.get("parentView");
while(a&&!a.get("isScrollable")){a=a.get("parentView")}if(a){a.scrollToVisible();
return a.scrollToVisible(this)}else{return NO}},frame:function(){return this.computeFrameWithParentFrame(null)
}.property("layout","useStaticLayout").cacheable(),computeFrameWithParentFrame:function(a){var h=this.get("layout");
var i={},c,g,e=SC.LAYOUT_AUTO;var b=this.get("useStaticLayout");if(h.width!==undefined&&h.width===SC.LAYOUT_AUTO&&b!==undefined&&!b){c=SC.Error.desc("%@.layout() you cannot use width:auto if staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(c.toString());throw c}if(h.height!==undefined&&h.height===SC.LAYOUT_AUTO&&b!==undefined&&!b){c=SC.Error.desc("%@.layout() you cannot use height:auto if staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(c.toString());throw c}if(b){return null}if(!SC.none(h.left)){i.x=Math.floor(h.left);
if(h.width!==undefined){if(h.width===e){i.width=e}else{i.width=Math.floor(h.width)
}}else{if(!a){a=this.computeParentDimensions(h)}i.width=Math.floor(a.width-i.x-(h.right||0))
}}else{if(!SC.none(h.right)){if(!a){a=this.computeParentDimensions(h)}if(SC.none(h.width)){i.width=a.width-h.right;
i.x=0}else{if(h.width===e){i.width=e}else{i.width=Math.floor(h.width||0)}i.x=Math.floor(a.width-h.right-i.width)
}}else{if(!SC.none(h.centerX)){if(!a){a=this.computeParentDimensions(h)}if(h.width===e){i.width=e
}else{i.width=Math.floor(h.width||0)}i.x=Math.floor((a.width-i.width)/2+h.centerX)
}else{i.x=0;if(SC.none(h.width)){if(!a){a=this.computeParentDimensions(h)}i.width=Math.floor(a.width)
}else{if(h.width===e){i.width=e}else{i.width=Math.floor(h.width||0)}}}}}if(!SC.none(h.top)){i.y=Math.floor(h.top);
if(h.height!==undefined){if(h.height===e){i.height=e}else{i.height=Math.floor(h.height)
}}else{if(!a){a=this.computeParentDimensions(h)}i.height=Math.floor(a.height-i.y-(h.bottom||0))
}}else{if(!SC.none(h.bottom)){if(!a){a=this.computeParentDimensions(h)}if(SC.none(h.height)){i.height=a.height-h.bottom;
i.y=0}else{if(h.height===e){i.height=e}else{i.height=Math.floor(h.height||0)}i.y=Math.floor(a.height-h.bottom-i.height)
}}else{if(!SC.none(h.centerY)){if(!a){a=this.computeParentDimensions(h)}if(h.height===e){i.height=e
}else{i.height=Math.floor(h.height||0)}i.y=Math.floor((a.height-i.height)/2+h.centerY)
}else{i.y=0;if(SC.none(h.height)){if(!a){a=this.computeParentDimensions(h)}i.height=Math.floor(a.height)
}else{if(h.height===e){i.height=e}else{i.height=Math.floor(h.height||0)}}}}}if(i.height===e||i.width===e){g=this.get("layer");
if(i.height===e){i.height=g?g.clientHeight:0}if(i.width===e){i.width=g?g.clientWidth:0
}}if(!SC.none(h.maxHeight)&&(i.height>h.maxHeight)){i.height=h.maxHeight}if(!SC.none(h.minHeight)&&(i.height<h.minHeight)){i.height=h.minHeight
}if(!SC.none(h.maxWidth)&&(i.width>h.maxWidth)){i.width=h.maxWidth}if(!SC.none(h.minWidth)&&(i.width<h.minWidth)){i.width=h.minWidth
}if(i.height<0){i.height=0}if(i.width<0){i.width=0}return i},computeParentDimensions:function(g){var b,c=this.get("parentView"),a=(c)?c.get("frame"):null;
if(a){b={width:a.width,height:a.height}}else{var e=g;b={width:(e.left||0)+(e.width||0)+(e.right||0),height:(e.top||0)+(e.height||0)+(e.bottom||0)}
}return b},clippingFrame:function(){var b=this.get("parentView"),c=this.get("frame"),a=c;
if(b){b=b.get("clippingFrame");a=SC.intersectRects(b,c)}a.x-=c.x;a.y-=c.y;return a
}.property("parentView","frame").cacheable(),_sc_view_clippingFrameDidChange:function(){var e=this.get("childViews"),b=e.length,a,c;
for(a=0;a<b;++a){c=e[a];if(!c.hasStaticLayout){c.notifyPropertyChange("clippingFrame")
}}}.observes("clippingFrame"),parentViewDidResize:function(){var a=this.get("layout");
var b=((a.left!==undefined)&&(a.top!==undefined)&&(a.width!==undefined)&&(a.height!==undefined));
if(!b){this.notifyPropertyChange("frame");this.viewDidResize()}},viewDidResize:function(){var e=this.childViews,b=e.length,a,c;
for(a=0;a<b;++a){c=e[a];if(c.parentViewDidResize){c.parentViewDidResize()}}}.observes("layout"),beginLiveResize:function(){if(this.willBeginLiveResize){this.willBeginLiveResize()
}var e=this.get("childViews"),b=e.length,a,c;for(a=0;a<b;++a){c=e[a];if(c.beginLiveResize){c.beginLiveResize()
}}return this},endLiveResize:function(){var e=this.get("childViews"),b=e.length,a,c;
for(a=b-1;a>=0;--a){c=e[a];if(c.endLiveResize){c.endLiveResize()}}if(this.didEndLiveResize){this.didEndLiveResize()
}return this},layoutStyle:function(){var b=this.get("layout"),e={},a=null,f,k=SC.LAYOUT_AUTO;
var l=this.get("useStaticLayout");if(b.width!==undefined&&b.width===SC.LAYOUT_AUTO&&!l){f=SC.Error.desc("%@.layout() you cannot use width:auto if  staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(f.toString());throw f}if(b.height!==undefined&&b.height===SC.LAYOUT_AUTO&&!l){f=SC.Error.desc("%@.layout() you cannot use height:auto if  staticLayout is disabled".fmt(this),"%@".fmt(this),-1);
console.error(f.toString());throw f}if(!SC.none(b.left)){e.left=Math.floor(b.left);
if(b.width!==undefined){if(b.width===SC.LAYOUT_AUTO){e.width=SC.LAYOUT_AUTO}else{e.width=Math.floor(b.width)
}e.right=null}else{e.width=null;e.right=Math.floor(b.right||0)}e.marginLeft=0}else{if(!SC.none(b.right)){e.right=Math.floor(b.right);
e.marginLeft=0;if(SC.none(b.width)){e.left=0;e.width=null}else{e.left=null;if(b.width===SC.LAYOUT_AUTO){e.width=SC.LAYOUT_AUTO
}else{e.width=Math.floor(b.width||0)}}}else{if(!SC.none(b.centerX)){e.left="50%";
e.width=Math.floor(b.width||0);e.marginLeft=Math.floor(b.centerX-e.width/2);e.right=null
}else{if(!SC.none(b.width)){e.left=0;e.right=null;if(b.width===SC.LAYOUT_AUTO){e.width=SC.LAYOUT_AUTO
}else{e.width=Math.floor(b.width)}e.marginLeft=0}else{e.left=0;e.right=0;e.width=null;
e.marginLeft=0}}}}e.minWidth=(b.minWidth===undefined)?null:b.minWidth;e.maxWidth=(b.maxWidth===undefined)?null:b.maxWidth;
if(!SC.none(b.top)){e.top=Math.floor(b.top);if(b.height!==undefined){if(b.height===SC.LAYOUT_AUTO){e.height=SC.LAYOUT_AUTO
}else{e.height=Math.floor(b.height)}e.bottom=null}else{e.height=null;e.bottom=Math.floor(b.bottom||0)
}e.marginTop=0}else{if(!SC.none(b.bottom)){e.marginTop=0;e.bottom=Math.floor(b.bottom);
if(SC.none(b.height)){e.top=0;e.height=null}else{e.top=null;if(b.height===SC.LAYOUT_AUTO){e.height=SC.LAYOUT_AUTO
}else{e.height=Math.floor(b.height||0)}}}else{if(!SC.none(b.centerY)){e.top="50%";
e.height=Math.floor(b.height||0);e.marginTop=Math.floor(b.centerY-e.height/2);e.bottom=null
}else{if(!SC.none(b.height)){e.top=0;e.bottom=null;if(b.height===SC.LAYOUT_AUTO){e.height=SC.LAYOUT_AUTO
}else{e.height=Math.floor(b.height||0)}e.marginTop=0}else{e.top=0;e.bottom=0;e.height=null;
e.marginTop=0}}}}e.minHeight=(b.minHeight===undefined)?null:b.minHeight;e.maxHeight=(b.maxHeight===undefined)?null:b.maxHeight;
e.zIndex=SC.none(b.zIndex)?null:b.zIndex.toString();e.backgroundPosition=SC.none(b.backgroundPosition)?null:b.backgroundPosition.toString();
var i=SC._VIEW_DEFAULT_DIMS,c=i.length,g;while(--c>=0){g=i[c];if(e[g]===0){e[g]=null
}}for(var j in e){var h=e[j];if(typeof h===SC.T_NUMBER){e[j]=(h+"px")}}return e}.property().cacheable(),layoutView:function(){return this.get("parentView")
}.property("parentView").cacheable(),layoutDidChange:function(){this.beginPropertyChanges();
if(this.frame){this.notifyPropertyChange("frame")}this.notifyPropertyChange("layoutStyle");
this.endPropertyChanges();var a=this.get("layoutView");if(a){a.set("childViewsNeedLayout",YES);
a.layoutDidChangeFor(this);if(a.get("childViewsNeedLayout")){a.invokeOnce(a.layoutChildViewsIfNeeded)
}}return this}.observes("layout"),childViewsNeedLayout:NO,layoutDidChangeFor:function(b){var a=this._needLayoutViews;
if(!a){a=this._needLayoutViews=SC.CoreSet.create()}a.add(b)},layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){this.set("childViewsNeedLayout",NO);this.layoutChildViews()
}return this},layoutChildViews:function(){var g=this._needLayoutViews,b=g?g.length:0,a;
var c,f,e;for(a=0;a<b;a++){c=g[a];c.updateLayout()}c=f=e=null;g.clear()},updateLayout:function(){var b=this.get("layer"),a;
if(b){a=this.renderContext(b);this.renderLayout(a);a.update()}b=null;return this},renderLayout:function(a,b){a.addStyle(this.get("layoutStyle"))
},isView:YES,selectStart:function(a){return this.get("isTextSelectable")}});SC.View.mixin({isViewClass:YES,design:function(){if(this.isDesign){return this
}var a=this.extend.apply(this,arguments);a.isDesign=YES;if(SC.ViewDesigner){SC.ViewDesigner.didLoadDesign(a,this,SC.A(arguments))
}return a},layout:function(a){this.prototype.layout=a;return this},convertLayoutToAnchoredLayout:function(b,c){var a={top:0,left:0,width:c.width,height:c.height};
if(!SC.none(b.left)){a.left=Math.floor(b.left);if(b.width!==undefined){if(b.width===SC.LAYOUT_AUTO){a.width=SC.LAYOUT_AUTO
}else{a.width=Math.floor(b.width)}}else{a.width=c.width-a.left-Math.floor(b.right||0)
}}else{if(!SC.none(b.right)){if(SC.none(b.width)){a.left=0;a.width=c.width-Math.floor(b.right||0)
}else{if(b.width===SC.LAYOUT_AUTO){a.width=SC.LAYOUT_AUTO}else{a.width=b.width;a.left=c.width-(b.width+b.right)
}}}else{if(!SC.none(b.centerX)){a.width=Math.floor(b.width||0);a.left=Math.floor((c.width-a.width)/2)+b.centerX
}else{if(!SC.none(b.width)){a.left=0;if(b.width===SC.LAYOUT_AUTO){a.width=SC.LAYOUT_AUTO
}else{a.width=Math.floor(b.width)}}else{a.left=0;a.width=0}}}}if(b.minWidth!==undefined){a.minWidth=b.minWidth
}if(b.maxWidth!==undefined){a.maxWidth=b.maxWidth}if(!SC.none(b.top)){a.top=Math.floor(b.top);
if(b.height!==undefined){if(b.height===SC.LAYOUT_AUTO){a.height=SC.LAYOUT_AUTO}else{a.height=Math.floor(b.height)
}}else{a.height=c.height-a.top-Math.floor(b.bottom||0)}}else{if(!SC.none(b.bottom)){if(SC.none(b.height)){a.top=0;
a.height=c.height-Math.floor(b.bottom||0)}else{if(b.height===SC.LAYOUT_AUTO){a.height=SC.LAYOUT_AUTO
}else{a.height=b.height;a.top=c.height-(b.height+b.bottom)}}}else{if(!SC.none(b.centerY)){a.height=Math.floor(b.height||0);
a.top=Math.floor((c.height-a.height)/2)+b.centerY}else{if(!SC.none(b.height)){a.top=0;
if(b.height===SC.LAYOUT_AUTO){a.height=SC.LAYOUT_AUTO}else{a.height=Math.floor(b.height)
}}else{a.top=0;a.height=0}}}}if(b.minHeight!==undefined){a.minHeight=b.minHeight}if(b.maxHeight!==undefined){a.maxHeight=b.maxHeight
}return a},convertLayoutToCustomLayout:function(b,a,c){},classNames:function(a){a=(this.prototype.classNames||[]).concat(a);
this.prototype.classNames=a;return this},tagName:function(a){this.prototype.tagName=a;
return this},childView:function(a){var b=this.prototype.childViews||[];if(b===this.superclass.prototype.childViews){b=b.slice()
}b.push(a);this.prototype.childViews=b;return this},bind:function(b,e){var c=this.prototype,a=this.superclass.prototype;
var f=c._bindings;if(!f||f===a._bindings){f=c._bindings=(f||[]).slice()}b=b+"Binding";
c[b]=e;f.push(b);return this},prop:function(a,b){this.prototype[a]=b;return this},localization:function(b,a){if(a){b.rootElement=SC.$(a).get(0)
}return b},viewFor:function(e,c){var b=SC.$A(arguments);if(SC.none(e)){b.shift()}else{b[0]={rootElement:SC.$(e).get(0)}
}var a=this.create.apply(this,arguments);b=b[0]=null;return a},create:function(){var b=this,a=new b(arguments);
if(SC.ViewDesigner){SC.ViewDesigner.didCreateView(a,SC.$A(arguments))}return a},loc:function(f){var b=f.childViews;
delete f.childViews;this.applyLocalizedAttributes(f);if(SC.ViewDesigner){SC.ViewDesigner.didLoadLocalization(this,SC.$A(arguments))
}var e=this.prototype.childViews,a=e.length;while(--a>=0){var c=e[a];f=b[a];if(f&&c&&c.loc){c.loc(f)
}}return this},applyLocalizedAttributes:function(a){SC.mixin(this.prototype,a)},views:{}});
SC.outlet=function(a){return function(b){return(this[b]=SC.objectForPropertyPath(a,this))
}.property()};SC.View.unload=function(){var a=SC.View.views;if(a){for(var b in a){if(!a.hasOwnProperty(b)){continue
}delete a[b]}}};SC.Event.add(window,"unload",SC.View,SC.View.unload);sc_require("views/view");
SC.Pane=SC.View.extend({isPane:YES,page:null,rootResponder:null,currentWindowSize:null,computeParentDimensions:function(c){var b=this.get("currentWindowSize");
var e={x:0,y:0,width:1000,height:1000};if(b){e.width=b.width;e.height=b.height}else{if(SC.RootResponder.responder){var a=SC.RootResponder.responder.get("currentWindowSize");
if(a){e.width=a.width;e.height=a.height}}else{if(window.innerHeight){e.width=window.innerWidth;
e.height=window.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){e.width=document.documentElement.clientWidth;
e.height=document.documentElement.clientHeight}else{if(document.body){e.width=document.body.clientWidth;
e.height=document.body.clientHeight}}}this.windowSizeDidChange(null,e)}}return e},frame:function(){return this.computeFrameWithParentFrame(null)
}.property(),windowSizeDidChange:function(b,a){this.set("currentWindowSize",a);this.parentViewDidResize();
return this},sendEvent:function(c,a,e){var b;if(!e){e=this.get("firstResponder")}while(e&&!e.tryToPerform(c,a)){e=(e===this)?null:e.get("nextResponder")
}if(!e&&(e=this.get("defaultResponder"))){if(typeof e===SC.T_STRING){e=SC.objectForPropertyPath(e)
}if(!e){e=null}else{if(e.isResponderContext){e=e.sendAction(c,this,a)}else{e=e.tryToPerform(c,a)?e:null
}}}return a.mouseHandler||e},performKeyEquivalent:function(c,a){var b=arguments.callee.base.apply(this,arguments);
if(!b){var e=this.get("defaultResponder");if(e){if(e.performKeyEquivalent){b=e.performKeyEquivalent(c,a)
}if(!b){b=e.tryToPerform(c,a)}}}return b},defaultResponder:null,nextResponder:function(){return null
}.property().cacheable(),firstResponder:null,acceptsKeyPane:YES,isKeyPane:NO,becomeKeyPane:function(){if(this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(this)}return this},resignKeyPane:function(){if(!this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(null)}return this},makeFirstResponder:function(a){var c=this.get("firstResponder"),b=this.get("isKeyPane");
if(c===a){return this}if(c){c.willLoseFirstResponder(c)}if(b){if(c){c.willLoseKeyResponderTo(a)
}if(a){a.willBecomeKeyResponderFrom(c)}}if(c){c.beginPropertyChanges().set("isFirstResponder",NO).set("isKeyResponder",NO).endPropertyChanges()
}this.set("firstResponder",a);if(a){a.beginPropertyChanges().set("isFirstResponder",YES).set("isKeyResponder",b).endPropertyChanges()
}if(b){if(a){a.didBecomeKeyResponderFrom(c)}if(c){c.didLoseKeyResponderTo(a)}}if(a){a.didBecomeFirstResponder(a)
}return this},_forwardKeyChange:function(e,b,h,g){var c,a,f;if(e&&(a=this.get("firstResponder"))){f=(h)?h.get("firstResponder"):null;
c=this.get("firstResponder");if(c){c[b](f)}if((g!==undefined)&&a){a.set("isKeyResponder",g)
}}},willLoseKeyPaneTo:function(a){this._forwardKeyChange(this.get("isKeyPane"),"willLoseKeyResponderTo",a,NO);
return this},willBecomeKeyPaneFrom:function(a){this._forwardKeyChange(!this.get("isKeyPane"),"willBecomeKeyResponderFrom",a,YES);
return this},didLoseKeyPaneTo:function(b){var a=this.get("isKeyPane");this.set("isKeyPane",NO);
this._forwardKeyChange(a,"didLoseKeyResponderTo",b);return this},didBecomeKeyPaneFrom:function(b){var a=this.get("isKeyPane");
this.set("isKeyPane",YES);this._forwardKeyChange(!a,"didBecomeKeyResponderFrom",b,YES);
return this},isMainPane:NO,focusFrom:function(a){},blurTo:function(a){},blurMainTo:function(a){this.set("isMainPane",NO)
},focusMainFrom:function(a){this.set("isMainPane",YES)},append:function(){return this.appendTo(document.body)
},remove:function(){if(!this.get("isVisibleInWindow")){return this}if(!this.get("isPaneAttached")){return this
}var b=this.get("layer");if(b.parentNode){b.parentNode.removeChild(b)}b=null;this.resignKeyPane();
var a=this.rootResponder;if(this.get("isMainPane")){a.makeMainPane(null)}a.panes.remove(this);
this.rootResponder=null;this.set("isPaneAttached",NO);this.parentViewDidChange();
return this},appendTo:function(b){var a=this.get("layer");if(!a){a=this.createLayer().get("layer")
}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,null);
b=a=null;return this.paneDidAttach()},prependTo:function(b){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,b.firstChild);b=a=null;return this.paneDidAttach()},before:function(c){if(this.get("isPaneAttached")){return this
}var a=this.get("layer");if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;
if(this.get("isPaneAttached")&&(a.parentNode===b)){return this}b.insertBefore(a,c);
b=c=a=null;return this.paneDidAttach()},after:function(c){var a=this.get("layer");
if(!a){a=this.createLayer().get("layer")}var b=c.parentNode;if(this.get("isPaneAttached")&&(a.parentNode===b)){return this
}b.insertBefore(a,c.nextSibling);b=c=a=null;return this.paneDidAttach()},removeFromParent:function(){},paneDidAttach:function(){var a=(this.rootResponder=SC.RootResponder.responder);
a.panes.add(this);this.set("currentWindowSize",a.computeWindowSize());this.set("isPaneAttached",YES);
this.parentViewDidChange();return this},isPaneAttached:NO,recomputeIsVisibleInWindow:function(c){var e=this.get("isVisibleInWindow");
var g=this.get("isPaneAttached")&&this.get("isVisible");if(e!==g){this.set("isVisibleInWindow",g);
if(g&&this.get("layerNeedsUpdate")){this.updateLayerIfNeeded()}if(g&&this.get("childViewsNeedLayout")){this.layoutChildViewsIfNeeded()
}var f=this.get("childViews"),b=f.length,a;for(a=0;a<b;a++){f[a].recomputeIsVisibleInWindow(g)
}if(!g&&this.get("isFirstResponder")){this.resignFirstResponder()}}if(g){if(this.parentViewDidResize){this.parentViewDidResize()
}if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}return this},updateLayerLocation:function(){return this},init:function(){var a=!!this.get("layer");
arguments.callee.base.apply(this,arguments);if(a){this.paneDidAttach()}},classNames:"sc-pane".w()});
sc_require("mixins/tree_item_content");sc_require("mixins/collection_content");SC.TreeItemObserver=SC.Object.extend(SC.Array,SC.CollectionContent,{item:null,delegate:null,parentObserver:null,parentItem:function(){var a=this.get("parentObserver");
return a?a.get("item"):null}.property("parentObserver").cacheable(),index:null,outlineLevel:0,children:null,disclosureState:SC.BRANCH_OPEN,branchIndexes:function(){var f=this.get("item"),b,g,a,e,c;
if(!f){return SC.IndexSet.EMPTY}else{if(f.isTreeItemContent){g=this.get("parentItem");
a=this.get("index");return f.treeItemBranchIndexes(g,a)}else{e=this.get("children");
if(!e){return null}c=SC.IndexSet.create();b=e.get("length");g=f;for(a=0;a<b;a++){if(!(f=e.objectAt(a))){continue
}if(!this._computeChildren(f,g,a)){continue}if(this._computeDisclosureState(f,g,a)!==SC.LEAF_NODE){c.add(a)
}}return c.get("length")>0?c:null}}}.property("children").cacheable(),isHeaderVisible:function(){return !!this.get("parentObserver")
}.property("parentObserver").cacheable(),length:0,objectAt:function(e){var a=this.get("length"),g=this.get("item"),b=this._objectAtCache,i=e,h=0,c,f;
if(e>=a){return undefined}if(this.get("isHeaderVisible")){if(e===0){return g}else{i--
}}g=null;if(!b){b=this._objectAtCache=[]}if((g=b[e])!==undefined){return g}f=this.get("children");
if(!f){return undefined}if(c=this.get("branchIndexes")){c.forEach(function(l){if(g||(l>i)){return
}var k=this.branchObserverAt(l),j;if(!k){return}j=k.get("length");if(l+j>i){g=k.objectAt(i-l);
i=-1}else{i-=j-1}},this)}if(i>=0){g=f.objectAt(i)}b[e]=g;return g},replace:function(a,b,k,e){var j=a,h=null,f,g,i;
if(e===undefined){e=SC.DROP_BEFORE}if(this.get("isHeaderVisible")){j--}if(j<0){throw"Tree Item cannot replace itself"
}if(f=this.get("branchIndexes")){f.forEach(function(l){if(h||(l>=j)){return}if(!(h=this.branchObserverAt(l))){return
}g=h.get("length");if((l+g===j)&&e===SC.DROP_AFTER){j-=l}else{if(l+g>j){j-=l}else{j-=g-1;
h=null}}},this)}if(h){h.replace(j,b,k,e);return this}i=j+b;if(b>1&&f){f.forEachIn(j,f.get("max")-j,function(l){if(l>i){return
}if(!(h=this.branchObserverAt(l))){return}g=h.get("length");i-=g-1},this)}b=i-j;var c=this.get("children");
if(!c){throw"cannot replace() tree item with no children"}if((b<0)||(i>c.get("length"))){throw"replace() range must lie within a single tree item"
}c.replace(j,b,k,e);return this},observerContentDidChange:function(h,g,f){this.invalidateBranchObserversAt(h);
this._objectAtCache=this._outlineLevelCache=null;this._disclosureStateCache=null;
this._contentGroupIndexes=NO;this.notifyPropertyChange("branchIndexes");var b=this.get("length"),c=this._computeLength(),a=this.get("parentObserver"),e;
if(b!==c){this.set("length",c)}if(!this._notifyParent){return this}if(a){e=SC.IndexSet.create(this.get("index"));
a._childrenRangeDidChange(a.get("children"),null,"[]",e)}else{if(b===c){g=this.expandChildIndex(h+g);
h=this.expandChildIndex(h);g=g-h;f=0}else{h=this.expandChildIndex(h);g=c-h;f=c-b}this.enumerableContentDidChange(h,g,f)
}},expandChildIndex:function(c){var b=c;if(this.get("isHeaderVisible")){c++}var a=this.get("branchIndexes");
if(!a||a.get("length")===0){return b}a.forEachIn(0,c,function(e){b+=this.branchObserverAt(e).get("length")-1
},this);return b},_contentGroupIndexes:NO,contentGroupIndexes:function(h,f){if(f!==this){return null
}var g=this._contentGroupIndexes;if(g!==NO){return g}if(this.get("parentObserver")){return null
}var k=this.get("item"),j,b,e,i,c,a;if(k&&k.isTreeItemContent){j=k.get("treeItemIsGrouped")
}else{j=!!this.delegate.get("treeItemIsGrouped")}if(j){g=SC.IndexSet.create();b=this.get("branchIndexes");
a=this.get("children");e=a?a.get("length"):0;i=c=0;if(b){b.forEach(function(m){g.add(i,(m+1)-c);
i+=(m+1)-c;c=m+1;var l=this.branchObserverAt(m);if(l){i+=l.get("length")-1}},this)
}if(c<e){g.add(i,e-c)}}else{g=null}this._contentGroupIndexes=g;return g},contentIndexIsGroup:function(b,e,a){var c=this.contentGroupIndexes(b,e);
return c?c.contains(a):NO},contentIndexOutlineLevel:function(k,h,f){if(h!==this){return -1
}var a=this._outlineLevelCache;if(a&&(a[f]!==undefined)){return a[f]}if(!a){a=this._outlineLevelCache=[]
}var g=this.get("length"),l=f,e=0,i=null,c,b,j;if(f>=g){return -1}if(this.get("isHeaderVisible")){if(f===0){return a[0]=this.get("outlineLevel")-1
}else{l--}}if(c=this.get("branchIndexes")){c.forEach(function(o){if((i!==null)||(o>l)){return
}var n=this.branchObserverAt(o),m;if(!n){return}m=n.get("length");if(o+m>l){i=n.contentIndexOutlineLevel(k,n,l-o);
l=-1}else{l-=m-1}},this)}if(l>=0){i=this.get("outlineLevel")}a[f]=i;return i},contentIndexDisclosureState:function(k,h,f){if(h!==this){return -1
}var a=this._disclosureStateCache;if(a&&(a[f]!==undefined)){return a[f]}if(!a){a=this._disclosureStateCache=[]
}var g=this.get("length"),l=f,e=0,i=null,c,b,j;if(f>=g){return SC.LEAF_NODE}if(this.get("isHeaderVisible")){if(f===0){return a[0]=this.get("disclosureState")
}else{l--}}if(c=this.get("branchIndexes")){c.forEach(function(o){if((i!==null)||(o>l)){return
}var n=this.branchObserverAt(o),m;if(!n){return}m=n.get("length");if(o+m>l){i=n.contentIndexDisclosureState(k,n,l-o);
l=-1}else{l-=m-1}},this)}if(l>=0){i=SC.LEAF_NODE}a[f]=i;return i},contentIndexExpand:function(b,g,a){var c,h=a,e,f;
if(g!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._expand(this.get("item"));
return}else{h--}}if(c=this.get("branchIndexes")){c.forEach(function(l){if(l>=h){return
}var k=this.branchObserverAt(l),j;if(!k){return}j=k.get("length");if(l+j>h){k.contentIndexExpand(b,k,h-l);
h=-1}else{h-=j-1}},this)}if(h>=0){e=this.get("children");f=e?e.objectAt(h):null;if(f){this._expand(f,this.get("item"),h)
}}},contentIndexCollapse:function(b,g,a){var c,e,f,h=a;if(g!==this){return}if(this.get("isHeaderVisible")){if(a===0){this._collapse(this.get("item"));
return}else{h--}}if(c=this.get("branchIndexes")){c.forEach(function(l){if(l>=h){return
}var k=this.branchObserverAt(l),j;if(!k){return}j=k.get("length");if(l+j>h){k.contentIndexCollapse(b,k,h-l);
h=-1}else{h-=j-1}},this)}if(h>=0){e=this.get("children");f=e?e.objectAt(h):null;if(f){this._collapse(f,this.get("item"),h)
}}},branchObserverAt:function(e){var h=this._branchObserversByIndex,c=this._branchObserverIndexes,f,i,b,k,a,g,j;
if(!h){h=this._branchObserversByIndex=[]}if(!c){c=this._branchObserverIndexes=SC.IndexSet.create()
}if(f=h[e]){return f}a=this.get("children");k=a?a.objectAt(e):null;if(!k){return null
}h[e]=f=SC.TreeItemObserver.create({item:k,delegate:this.get("delegate"),parentObserver:this,index:e,outlineLevel:this.get("outlineLevel")+1});
c.add(e);return f},invalidateBranchObserversAt:function(c){var b=this._branchObserversByIndex,a=this._branchObserverIndexes;
if(!b||b.length<=c){return this}if(c<0){c=0}a.forEachIn(c,a.get("max")-c,function(f){var e=b[f];
if(e){e.destroy()}},this);b.length=c;return this},init:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("item");if(!a){throw"SC.TreeItemObserver.item cannot be null"}a.addObserver("*",this,this._itemPropertyDidChange);
this._itemPropertyDidChange(a,"*");this._notifyParent=YES},destroy:function(){this.invalidateBranchObserversAt(0);
this._objectAtCache=null;var c=this.get("item");if(c){c.removeObserver("*",this,this._itemPropertyDidChange)
}var a=this._children,b=this._childrenRangeObserver;if(a&&b){a.removeRangeObserver(b)
}arguments.callee.base.apply(this,arguments)},_itemPropertyDidChange:function(g,b){var a=this.get("children"),f=this.get("disclosureState"),e=this.get("item"),c;
this.beginPropertyChanges();c=this._computeDisclosureState(e);if(f!==c){this.set("disclosureState",c)
}c=this._computeChildren(e);if(a!==c){this.set("children",c)}this.endPropertyChanges()
},_childrenDidChange:function(){var c=this.get("disclosureState"),e=c===SC.BRANCH_OPEN?this.get("children"):null,b=this._children,a=this._childrenRangeObserver;
if(b===e){return this}if(a){b.removeRangeObserver(a)}if(e){this._childrenRangeObserver=e.addRangeObserver(null,this,this._childrenRangeDidChange)
}else{this._childrenRangeObserver=null}this._children=e;this._childrenRangeDidChange(e,null,"[]",null)
}.observes("children","disclosureState"),_childrenRangeDidChange:function(g,j,i,e){var a=this.get("children"),f=a?a.get("length"):0,c=e?e.get("min"):0,h=e?e.get("max"):f,b=this._childrenLen||0;
this._childrenLen=f;this.observerContentDidChange(c,h-c,f-b)},_computeDisclosureState:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return SC.LEAF_NODE}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}return e.treeItemDisclosureState(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}return e.get(c)?SC.BRANCH_OPEN:SC.BRANCH_CLOSED}}},_collapse:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return this}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}e.treeItemCollapse(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}e.setIfChanged(c,NO)}}return this},_expand:function(e,f,b){var c,a;
if(!e||!this._computeChildren(e)){return this}else{if(e.isTreeItemContent){if(f===undefined){f=this.get("parentItem")
}if(b===undefined){b=this.get("index")}e.treeItemExpand(f,b)}else{c=this._treeItemIsExpandedKey;
if(!c){a=this.get("delegate");c=a?a.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=c}e.setIfChanged(c,YES)}}return this},_computeChildren:function(c){var a,b;
if(!c){return null}else{if(c.isTreeItemContent){return c.get("treeItemChildren")}else{b=this._treeItemChildrenKey;
if(!b){a=this.get("delegate");b=a?a.get("treeItemChildrenKey"):"treeItemChildren";
this._treeItemChildrenKey=b}return c.get(b)}}},_computeLength:function(){var b=this.get("isHeaderVisible")?1:0,e=this.get("disclosureState"),c=this.get("children"),a;
if((e===SC.BRANCH_OPEN)&&c){b+=c.get("length");if(a=this.get("branchIndexes")){a.forEach(function(f){var g=this.branchObserverAt(f);
b+=g.get("length")-1},this)}}return b}});sc_require("system/responder");SC.ResponderContext=SC.Responder.extend({isResponderContext:YES,trace:NO,defaultResponder:null,nextResponder:function(){return this.get("defaultResponder")
}.property("defaultResponder").cacheable(),firstResponder:null,nextResponderFor:function(a){var b=a.get("nextResponder");
if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b,this)}else{if(!b&&(a!==this)){b=this
}}return b},responderNameFor:function(a){if(!a){return"(No Responder)"}else{if(a._scrc_name){return a._scrc_name
}}var b=this.NAMESPACE;this._findResponderNamesFor(this,3,b?[this.NAMESPACE]:[]);
return a._scrc_name||a.toString()},_findResponderNamesFor:function(a,f,e){var b,c;
for(b in a){if(b==="nextResponder"){continue}c=a[b];if(c&&c.isResponder){if(c._scrc_name){continue
}e.push(b);c._scrc_name=e.join(".");if(f>0){this._findResponderNamesFor(c,f-1,e)}e.pop()
}}},makeFirstResponder:function(a){var f=this.get("firstResponder"),c=this.get("nextResponder"),e=this.get("trace"),b;
if(this._locked){if(e){console.log("%@: AFTER ACTION: makeFirstResponder => %@".fmt(this,this.responderNameFor(a)))
}this._pendingResponder=a;return}if(e){console.log("%@: makeFirstResponder => %@".fmt(this,this.responderNameFor(a)))
}this._locked=YES;this._pendingResponder=null;b=a?this.nextResponderFor(a):null;while(b){if(b.get("hasFirstResponder")){break
}b=(b===c)?null:this.nextResponderFor(b)}if(!b){b=c}this._notifyWillLoseFirstResponder(f,f,b);
if(f){f.set("isFirstResponder",NO)}this.set("firstResponder",a);if(a){a.set("isFirstResponder",YES)
}this._notifyDidBecomeFirstResponder(a,a,b);this._locked=NO;if(this._pendingResponder){this.makeFirstResponder(this._pendingResponder);
this._pendingResponder=null}return this},_notifyWillLoseFirstResponder:function(b,e,a){if(e===a){return
}e.willLoseFirstResponder(b);e.set("hasFirstResponder",NO);var c=this.nextResponderFor(e);
if(c){this._notifyWillLoseFirstResponder(b,c,a)}},_notifyDidBecomeFirstResponder:function(b,e,a){if(e===a){return
}var c=this.nextResponderFor(e);if(c){this._notifyDidBecomeFirstResponder(b,c,a)}e.set("hasFirstResponder",YES);
e.didBecomeFirstResponder(b)},sendAction:function(h,e,c){var a=this.get("firstResponder"),f=this.get("nextResponder"),g=this.get("trace"),i=NO,b;
this._locked=YES;if(g){console.log("%@: begin action '%@' (%@, %@)".fmt(this,h,e,c))
}while(!i&&a){if(a.tryToPerform){i=a.tryToPerform(h,e,c)}if(!i){a=(a===f)?null:this.nextResponderFor(a)
}}if(g){if(!i){console.log("%@:  action '%@' NOT HANDLED".fmt(this,h))}else{console.log("%@: action '%@' handled by %@".fmt(this,h,this.responderNameFor(a)))
}}this._locked=NO;if(b=this._pendingResponder){this._pendingResponder=null;this.makeFirstResponder(b)
}return a}});sc_require("system/responder_context");SC.Application=SC.ResponderContext.extend({});
sc_require("core");SC.Benchmark={verbose:NO,enabled:YES,stats:{},globalStartTime:null,start:function(b,a,f,e){if(!this.enabled){return
}var g=(f||Date.now()),c;if(a){c=this._subStatFor(b,a)}else{c=this._statFor(b)}if(e&&c._starts.length>0){c._starts.push("ignore")
}else{c._starts.push(g)}c._times.push({start:g,_subStats:{}});return b},end:function(c,b,g){var f;
if(!this.enabled){return}if(b){f=this._subStatFor(c,b)}else{f=this._statFor(c)}var h=f._starts.pop();
if(!h){console.log('SC.Benchmark "%@" ended without a matching start.  No information was saved.'.fmt(c));
return}if(h=="ignore"){return}var a=(g||Date.now());var e=a-h;f._times[f._times.length-1].end=a;
f._times[f._times.length-1].dur=e;f.amt+=e;f.runs++;if(this.verbose){this.log(c)}},setGlobalStartTime:function(a){this.globalStartTime=a
},bench:function(f,e,a){if(!e){e="bench%@".fmt(this._benchCount++)}if(!a){a=1}var b;
while(--a>=0){var c=SC.Benchmark.start(e);b=f();SC.Benchmark.end(c)}return b},install:function(a,e,b){a["b__"+e]=a[e];
var c=a["b__"+e];a[e]=function(){var g="%@(%@)".fmt(e,$A(arguments).join(", "));SC.Benchmark.start(g,b);
var f=c.apply(this,arguments);SC.Benchmark.end(g);return f}},restore:function(a,b){a[b]=a["b__"+b]
},report:function(c){if(c){return this._genReport(c)}var b=[];for(var a in this.stats){if(!this.stats.hasOwnProperty(a)){continue
}b.push(this._genReport(a))}return b.join("\n")},timelineReport:function(a){a=(a)?"SproutCore Application":a;
var b=[a,"User-Agent: %@".fmt(navigator.userAgent),"Report Generated: %@ (%@)".fmt(new Date().toString(),Date.now()),""];
var e=this._compileChartData(true);for(var c=0;c<e.length;c++){if(e[c][4]){b.push(this._timelineGenSubReport(e[c]))
}else{b.push(this._timelineGenReport(e[c]))}}return b.join("\n")},timelineChart:function(t){var p=0;
this.hideChart();var n=this._compileChartData(false);var k=n.length;if(k===0){return
}var b=this.globalStartTime?this.globalStartTime:n[0][1];var e=n[k-1][2]-b;var o=50+k*30;
var q=Math.ceil(e/200)+1;var s=q*50;var c=document.createElement("div");c.className="sc-benchmark-graph";
document.body.appendChild(c);var u=document.createElement("div");u.innerHTML=((t)?t:"SproutCore Application")+(" - Total Captured Time: "+e+" ms - Points Captured: "+k)+' [<a href="javascript:SC.Benchmark.hideChart();">Hide Chart</a>]';
u.className="sc-benchmark-title";c.appendChild(u);var g=document.createElement("div");
g.className="sc-benchmark-top";g.style.width=s+"px";c.appendChild(g);for(p=0;p<q;
p++){var r=document.createElement("div");r.className="sc-benchmark-tick";r.style.left=(p*50)+"px";
r.style.height=o+"px";var f=document.createElement("div");f.className="sc-benchmark-tick-label";
f.style.left=(p*50)+"px";f.innerHTML=p*200+" ms";c.appendChild(r);c.appendChild(f)
}for(p=0;p<k;p++){var l=document.createElement("div");l.style.top=(75+(p*30))+"px";
l.style.width=s+"px";l.className=(p%2===0)?"sc-benchmark-row even":"sc-benchmark-row";
c.appendChild(l);var m=document.createElement("div");var j=n[p][1];var h=n[p][2];
var a=n[p][3];m.innerHTML="&nbsp;"+(n[p][0]+" <span class='sc-benchmark-emphasis'>"+a+"ms</span>");
m.className="sc-benchmark-bar";m.style.cssText="left:"+(((j-b)/4))+"px; width: "+((a/4))+"px; top: "+(53+(p*30))+"px;";
m.title="start: "+(j-b)+" ms, end: "+(h-b)+" ms, duration: "+a+" ms";c.appendChild(m)
}this._graph=c},hideChart:function(){if(this._graph){try{document.body.removeChild(this._graph)
}catch(a){}}},log:function(a){console.log(this.report(a))},startProfile:function(a){if(!this.enabled){return
}if(console&&console.profile){console.profile(a)}},endProfile:function(a){if(!this.enabled){return
}if(console&&console.profileEnd){console.profileEnd(a)}},_compileChartData:function(h){var m=[],a;
for(var n in this.stats){var f=this.stats[n];for(var g=0;g<f._times.length;g++){var o=f._times[g];
a=(f._times.length>1)?(g+1)+" - "+n:n;m.push([a,o.start,o.end,o.dur,false]);if(h){var b=o._subStats;
for(var c in b){var l=b[c];for(var e=0;e<l._times.length;e++){var p=l._times[e];a=(l._times.length>1)?(e+1)+" - "+c:c;
m.push([a,p.start,p.end,p.dur,true])}}}}}m.sort(function(j,i){if(j[1]<i[1]){return -1
}else{if(j[1]==i[1]){if(j[3]&&!i[3]){return -1}if(!j[3]&&i[3]){return 1}return 0}}return 1
});return m},_genReport:function(a){var b=this._statFor(a);var c=(b.runs>0)?(Math.floor(b.amt*1000/b.runs)/1000):0;
return"BENCH %@ msec: %@ (%@x)".fmt(c,(b.name||a),b.runs)},_timelineGenReport:function(a){if(this.globalStartTime){return"BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_timelineGenSubReport:function(a){if(this.globalStartTime){return"   CHECKPOINT BENCH start: %@ msec, duration: %@ msec,  %@".fmt((a[1]-this.globalStartTime),a[3],a[0])
}else{return"   CHECKPOINT BENCH duration: %@ msec, %@".fmt(a[3],a[0])}},_subStatFor:function(e,c){var f=this.stats[c]._times.length;
if(f===0){return}var a=this.stats[c]._times[this.stats[c]._times.length-1]._subStats;
var b=a[e];if(!b){a[e]={runs:0,amt:0,name:e,_starts:[],_times:[]};b=a[e]}return b
},_statFor:function(b){var a=this.stats[b];if(!a){a=this.stats[b]={runs:0,amt:0,name:b,_starts:[],_times:[]};
a=this.stats[b]}return a},reset:function(){this.stats={}},_bench:function(b,a){SC.Benchmark.bench(b,a,1)
},_benchCount:1};SC.Benchmark=SC.Benchmark;SC.mixin({logBundleLoading:NO,bundleIsLoaded:function(a){var b=SC.BUNDLE_INFO[a];
return b?!!b.loaded:NO},_scb_bundleDidLoad:function(b,j,a,k){var f=a,o=j;if(SC.typeOf(j)===SC.T_STRING){o=SC.objectForPropertyPath(j)
}if(SC.typeOf(a)===SC.T_STRING){f=SC.objectForPropertyPath(a,o)}if(!f){if(SC.LAZY_INSTANTIATION[b]){var n=SC.LAZY_INSTANTIATION[b];
if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' is marked for lazy instantiation, instantiating it now…".fmt(b))
}for(var g=0,c=n.length;g<c;g++){try{n[g]()}catch(h){console.log("SC.loadBundle(): Failted to lazily instatiate entry for  '%@'".fmt(b))
}}delete SC.LAZY_INSTANTIATION[b];if(SC.typeOf(j)===SC.T_STRING){o=SC.objectForPropertyPath(j)
}if(SC.typeOf(a)===SC.T_STRING){f=SC.objectForPropertyPath(a,o)}if(!a){throw"SC.loadBundle(): could not find callback for lazily instantiated bundle '%@'".fmt(b)
}}else{throw"SC.loadBundle(): could not find callback for '%@'".fmt(b)}}if(!k){k=[]
}k.push(b);var l=!!SC.RunLoop.currentRunLoop;if(l){SC.RunLoop.begin()}f.apply(o,k);
if(l){SC.RunLoop.end()}},tryToLoadBundle:function(e,f,g,b){var a,c;if(SC.typeOf(f)===SC.T_STRING){c=SC.objectForPropertyPath(f)
}if(SC.typeOf(g)===SC.T_STRING){a=SC.objectForPropertyPath(g,c)}if(a||SC.LAZY_INSTANTIATION[e]){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' found through other means, will attempt to load…".fmt(e))
}SC.BUNDLE_INFO[e]={loaded:YES};return SC.BUNDLE_INFO[e]}return NO},loadBundle:function(t,x,e){var r,u;
if(e===undefined&&SC.typeOf(x)===SC.T_FUNCTION){e=x;x=null}var n=SC.BUNDLE_INFO[t],w,v;
var c=SC.A(arguments).slice(3);if(SC.logBundleLoading){console.log("SC.loadBundle(): Attempting to load '%@'".fmt(t))
}if(!n){if(SC.logBundleLoading){console.log("SC.loadBundle(): Attemping to load %@ without SC.BUNDLE_INFO entry… could be loaded through other means.".fmt(t))
}n=this.tryToLoadBundle(t,x,e,c)}if(!n){throw"SC.loadBundle(): could not find bundle '%@'".fmt(t)
}else{if(n.loaded){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' already loaded, skipping.".fmt(t))
}if(e){if(SC.isReady){SC._scb_bundleDidLoad(t,x,e,c)}else{SC.ready(SC,function(){SC._scb_bundleDidLoad(t,x,e,c)
})}}}else{if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' is not loaded, loading now.".fmt(t))
}w=n.callbacks||[];if(e){w.push(function(){SC._scb_bundleDidLoad(t,x,e,c)});n.callbacks=w
}if(!n.loading){var b=n.requires||[];var g=YES;for(r=0,u=b.length;r<u;++r){var o=b[r];
var k=SC.BUNDLE_INFO[o];if(!k){throw"SC.loadBundle(): could not find required bundle '%@' for bundle '%@'".fmt(o,t)
}else{if(k.loading){g=NO;break}else{if(k.loaded){continue}else{g=NO;var p=k.dependents;
if(!p){k.dependents=p=[]}p.push(t);if(SC.logBundleLoading){console.log("SC.loadBundle(): '%@' depends on '%@', loading dependency…".fmt(t,o))
}SC.loadBundle(o);break}}}}if(g){var l,f,h,a,i,m;i=document.getElementsByTagName("head")[0];
if(!i){i=document.documentElement}l=n.styles||[];for(r=0,u=l.length;r<u;++r){h=l[r];
if(h.length>0){a=document.createElement("link");a.setAttribute("href",h);a.setAttribute("rel","stylesheet");
a.setAttribute("type","text/css");i.appendChild(a)}}var j=this._jsBundleLoadQueue;
if(!j){this._jsBundleLoadQueue=j={}}j[t]=[];var s=j[t];f=n.scripts||[];for(r=0,u=f.length;
r<u;++r){h=f[r];if(h.length>0){s.push(h)}}n.loading=YES;this.scriptDidLoad(t)}}}}},scriptDidLoad:function(c){var a=this._jsBundleLoadQueue;
if(a){var f=a[c];if(f){var b=f.shift();if(SC.logBundleLoading){console.log("SC.scriptDidLoad(): Loading next file in '%@' -> '%@'".fmt(c,b))
}var e=document.createElement("script");e.setAttribute("type","text/javascript");
e.setAttribute("src",b);document.body.appendChild(e)}}},bundleDidLoad:function(e){var g=SC.BUNDLE_INFO[e],f,c;
if(!g){g=SC.BUNDLE_INFO[e]={loaded:YES};return}if(g.loaded&&SC.logBundleLoading){console.log("SC.bundleDidLoad() called more than once for bundle '%@'. Skipping.".fmt(e));
return}delete g.loading;g.loaded=YES;if(SC.isReady){SC._invokeCallbacksForBundle(e)
}else{SC.ready(SC,function(){SC._invokeCallbacksForBundle(e)})}var h=g.dependents||[];
for(var b=0,a=h.length;b<a;++b){if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' has completed loading, loading '%@' that depended on it.".fmt(e,h[b]))
}SC.loadBundle(h[b])}},_invokeCallbacksForBundle:function(c){var f=SC.BUNDLE_INFO[c],e;
if(!f){return}if(SC.logBundleLoading){console.log("SC.loadBundle(): Bundle '%@' has completed loading, invoking callbacks.".fmt(c))
}e=f.callbacks||[];SC.RunLoop.begin();for(var b=0,a=e.length;b<a;++b){e[b]()}SC.RunLoop.end()
}});sc_require("system/locale");SC.IMAGE_ABORTED_ERROR=SC.$error("SC.Image.AbortedError","Image",-100);
SC.IMAGE_FAILED_ERROR=SC.$error("SC.Image.FailedError","Image",-101);SC.imageCache=SC.Object.create({loadLimit:4,activeRequests:0,loadImage:function(a,f,g,e){var b=SC.typeOf(f);
if(SC.none(g)&&SC.typeOf(f)===SC.T_FUNCTION){f=null;g=f}if(SC.typeOf(g)===SC.T_STRING){g=f[g]
}if(SC.none(e)){e=SC.none(f)&&SC.none(g)}var c=this._imageEntryFor(a);if(c.status===this.IMAGE_LOADED){if(g){g.call(f||c.image,c.url,c.image)
}}else{if(f||g){this._addCallback(c,f,g)}c.retainCount++;this._scheduleImageEntry(c,e)
}},releaseImage:function(a,e,f){var c=this._imageEntryFor(a,NO);if(!c){return this
}if(--c.retainCount<=0){this._deleteEntry(c)}else{if(e||f){var b=SC.typeOf(e);if(SC.none(f)&&SC.typeOf(e)===SC.T_FUNCTION){e=null;
f=e}if(SC.typeOf(f)===SC.T_STRING){f=e[f]}this._removeCallback(c,e,f)}}},reloadImage:function(a){var b=this._imageEntryFor(a,NO);
if(b&&b.status===this.IMAGE_LOADED){b.status=this.IMAGE_WAITING}},loadNextImage:function(){var c=null,a;
if(this.get("activeRequests")>=this.get("loadLimit")){return}a=this._foregroundQueue;
while(a.length>0&&!c){c=a.shift()}if(!c){a=this._backgroundQueue;while(a.length>0&&!c){c=a.shift()
}}this.set("isLoading",!!c);if(c){var b=c.image;b.onabort=this._imageDidAbort;b.onerror=this._imageDidError;
b.onload=this._imageDidLoad;b.src=c.url;this._loading.push(c);this.incrementProperty("activeRequests");
this.loadNextImage()}},_imageEntryFor:function(c,a){if(a===undefined){a=YES}var e=this._images[c];
if(!e&&a){var b=new Image();e=this._images[c]={url:c,status:this.IMAGE_WAITING,callbacks:[],retainCount:0,image:b};
b.entry=e}return e},_deleteEntry:function(a){this._unscheduleEntry(a);delete this._images[a.url]
},_addCallback:function(c,e,f){var b=c.callbacks;var a=b.find(function(g){return g[0]===e&&g[1]===f
},this);if(!a){b.push([e,f])}b=null;return this},_removeCallback:function(b,c,e){var a=b.callbacks;
a.forEach(function(g,f){if(g[0]===c&&g[1]===e){a[f]=null}},this);a=null;return this
},_scheduleImageEntry:function(e,c){var b=this._backgroundQueue;var f=this._foregroundQueue;
if(e.status===this.IMAGE_LOADED){return this}if((e.status===this.IMAGE_QUEUE)&&!c&&e.isBackground){b[b.indexOf(e)]=null;
e.status=this.IMAGE_WAITING}if(e.status!==this.IMAGE_QUEUE){var a=(c)?b:f;a.push(e);
e.status=this.IMAGE_QUEUE;e.isBackground=c}if(!this.isLoading){this.invokeLater(this.loadNextImage,100)
}this.set("isLoading",YES);return this},_unscheduleImageEntry:function(b){if(b.status!==this.IMAGE_QUEUE){return this
}var a=b.isBackground?this._backgroundQueue:this._foregroundQueue;a[a.indexOf(b)]=null;
if(this._loading.indexOf(b)>=0){a.image.abort();this.imageStatusDidChange(b,this.ABORTED)
}return this},_imageDidAbort:function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ABORTED)
},_imageDidError:function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.ERROR)
},_imageDidLoad:function(){SC.imageCache.imageStatusDidChange(this.entry,SC.imageCache.LOADED)
},imageStatusDidChange:function(c,a){if(!c){return}var b=c.url;var e;switch(a){case this.LOADED:e=c.image;
break;case this.ABORTED:e=SC.IMAGE_ABORTED_ERROR;break;case this.ERROR:e=SC.IMAGE_FAILED_ERROR;
break;default:e=SC.IMAGE_FAILED_ERROR;break}c.callbacks.forEach(function(g){var h=g[0],i=g[1];
i.call(h,b,e)},this);c.callbacks=[];c.status=(a===this.LOADED)?this.IMAGE_LOADED:this.IMAGE_WAITING;
var f=c.image;if(f){f.onload=f.onerror=f.onabort=null;if(a!==this.LOADED){c.image=null
}}this._loading[this._loading.indexOf(c)]=null;if(this._loading.length>this.loadLimit*2){this._loading=this._loading.compact()
}this.decrementProperty("activeRequests");this.loadNextImage()},init:function(){arguments.callee.base.apply(this,arguments);
this._images={};this._loading=[];this._foregroundQueue=[];this._backgroundQueue=[]
},IMAGE_LOADED:"loaded",IMAGE_QUEUED:"queued",IMAGE_WAITING:"waiting",ABORTED:"aborted",ERROR:"error",LOADED:"loaded"});
SC.Page=SC.Object.extend({owner:null,get:function(a){var b=this[a];if(b&&b.isClass){this[a]=b=b.create({page:this});
if(!this.get("inDesignMode")){b.awake()}return b}else{return arguments.callee.base.apply(this,arguments)
}},awake:function(){for(var a in this){if(!this.hasOwnProperty(a)){continue}var b=this[a];
if(b&&b.isViewClass){this[a]=b=b.create({page:this})}}return this},getIfConfigured:function(b){var a=this[b];
return(a&&a.isViewClass)?null:this.get(b)},loc:function(c){for(var b in c){if(!c.hasOwnProperty(b)){continue
}var a=this[b];if(!a||!a.isViewClass){continue}a.loc(c[b])}return this}});SC.Page.design=SC.Page.create;
SC.Page.localization=function(a){return a};sc_require("system/event");SC.mixin({_isReadyBound:NO,_bindReady:function(){if(this._isReadyBound){return
}this._isReadyBound=YES;tiki.require("system").ready(this,this._didBecomeReady)},_readyQueue:[],_afterReadyQueue:[],isReady:NO,_didBecomeReady:function(){if(SC.isReady){return
}if(typeof SC.mapDisplayNames===SC.T_FUNCTION){SC.mapDisplayNames()}SC.Locale.createCurrentLocale();
if(document&&document.getElementsByTagName){var e=document.getElementsByTagName("body")[0];
if(e){var h=e.className;var c=SC.Locale.currentLanguage.toLowerCase();e.className=(h&&h.length>0)?[h,c].join(" "):c
}}SC.Benchmark.start("ready");SC.RunLoop.begin();var j,b,i,f;do{b=SC._readyQueue;
SC._readyQueue=[];for(i=0,f=b.length;i<f;i++){j=b[i];var g=j[0]||document;var a=j[1];
if(a){a.call(g)}}}while(SC._readyQueue.length>0);SC.isReady=YES;SC._readyQueue=null;
SC.Event.trigger("ready",null,document,NO);if(SC.removeLoading){SC.$("#loading").remove()
}if((SC.mode===SC.APP_MODE)&&(typeof main!="undefined")&&(main instanceof Function)&&!SC.suppressMain){main()
}if(SC.routes&&SC.routes.ping){SC.routes.ping()}SC.RunLoop.end();SC.Benchmark.end("ready");
SC.Benchmark.log()},ready:function(b,c){var a=this._readyQueue;if(c===undefined){c=b;
b=null}else{if(SC.typeOf(c)===SC.T_STRING){c=b[c]}}if(!c){return this}if(this.isReady){return c.call(b||document)
}a.push([b,c]);return this}});SC._bindReady();SC.removeLoading=YES;SC.APP_MODE="APP_MODE";
SC.TEST_MODE="TEST_MODE";SC.mode=SC.APP_MODE;sc_require("system/builder");SC.MODE_REPLACE="replace";
SC.MODE_APPEND="append";SC.MODE_PREPEND="prepend";SC.RenderContext=SC.Builder.create({SELF_CLOSING:SC.CoreSet.create().addEach("area base basefront br hr input img link meta".w()),init:function(b,a){if(b===undefined){b="div"
}if(a){this.prevObject=a;this.strings=a.strings;this.offset=a.length+a.offset}if(!this.strings){this.strings=[]
}this.needsContent=YES;if(SC.typeOf(b)===SC.T_STRING){this._tagName=b.toLowerCase();
this._needsTag=YES;var e=this;while(e){e.length++;e=e.prevObject}this.strings.push(null);
this._selfClosing=this.SELF_CLOSING.contains(this._tagName)}else{this._elem=b;this._needsTag=NO;
this.length=0;this.needsContent=NO}return this},strings:null,offset:0,length:0,updateMode:SC.MODE_REPLACE,needsContent:NO,get:function(b){var a=this.strings||[];
return(b===undefined)?a.slice(this.offset,this.length):a[b+this.offset]},push:function(e){var b=this.strings,a=arguments.length;
if(!b){this.strings=b=[]}if(a>1){b.push.apply(b,arguments)}else{b.push(e)}var f=this;
while(f){f.length+=a;f=f.prevObject}this.needsContent=YES;return this},text:function(c){var b=arguments.length,a=0;
for(a=0;a<b;a++){this.push(SC.RenderContext.escapeHTML(arguments[a]))}return this
},join:function(b){if(this._needsTag){this.end()}var a=this.strings;return a?a.join(b||""):""
},begin:function(a){return SC.RenderContext(a,this)},element:function(){if(this._elem){return this._elem
}var a,b;if(!SC.RenderContext.factory){SC.RenderContext.factory=document.createElement("div")
}SC.RenderContext.factory.innerHTML=this.join();if(SC.RenderContext.factory.innerHTML.length>0){b=SC.RenderContext.factory.firstChild.cloneNode(true);
SC.RenderContext.factory.innerHTML=""}else{b=null}return b},remove:function(a){if(!a){return
}var b,c=this._elem;if(!c||!c.removeChild){return}b=document.getElementById(a);if(b){b=c.removeChild(b);
b=null}},update:function(){var a=this._elem,f=this.updateMode,j,h,l,c,i,e,g;if(!a){return
}if(this.length>0){if(f===SC.MODE_REPLACE){a.innerHTML=this.join()}else{c=a.cloneNode(false);
c.innerHTML=this.join();g=(f===SC.MODE_APPEND)?null:a.firstChild;i=c.firstChild;while(i){e=i.nextSibling;
a.insertBefore(i,e);i=e}i=e=c=g=null}}if(this._attrsDidChange&&(h=this._attrs)){for(j in h){if(!h.hasOwnProperty(j)){continue
}if(h[j]===null){a.removeAttribute(j)}else{SC.$(a).attr(j,h[j])}}}if(this._classNamesDidChange&&(h=this._classNames)){SC.$(a).attr("class",h.join(" "))
}if(this._idDidChange&&(h=this._id)){SC.$(a).attr("id",h)}if(this._stylesDidChange&&(l=this._styles)){var b=this._STYLE_PAIR_ARRAY,k=this._JOIN_ARRAY;
for(j in l){if(!l.hasOwnProperty(j)){continue}h=l[j];if(h===null){continue}if(typeof h===SC.T_NUMBER){h=h.toString()+"px"
}b[0]=j.dasherize();b[1]=h;k.push(b.join(": "))}SC.$(a).attr("style",k.join("; "));
k.length=0}a=this._elem=null;return this.prevObject||this},_DEFAULT_ATTRS:{},_TAG_ARRAY:[],_JOIN_ARRAY:[],_STYLE_PAIR_ARRAY:[],end:function(){var m=this._TAG_ARRAY,b,k,i;
var j=this._attrs,e=this._classNames;var a=this._id,l=this._styles;m[0]="<";m[1]=this._tagName;
if(j||e||l||a){if(!j){j=this._DEFAULT_ATTRS}if(a){j.id=a}if(e){j["class"]=e.join(" ")
}if(l){k=this._JOIN_ARRAY;b=this._STYLE_PAIR_ARRAY;for(i in l){if(!l.hasOwnProperty(i)){continue
}b[0]=i.dasherize();b[1]=l[i];if(b[1]===null){continue}if(typeof b[1]===SC.T_NUMBER){b[1]="%@px".fmt(b[1])
}k.push(b.join(": "))}j.style=k.join("; ");k.length=0}m.push(" ");for(i in j){if(!j.hasOwnProperty(i)){continue
}if(j[i]===null){continue}m.push(i);m.push('="');m.push(j[i]);m.push('" ')}if(j===this._DEFAULT_ATTRS){delete j.style;
delete j["class"];delete j.id}}var h=this.strings;var g=(this._selfClosing===NO)?NO:(this.length===1);
m.push(g?" />":">");h[this.offset]=m.join("");m.length=0;if(!g){m[0]="</";m[1]=this._tagName;
m[2]=">";h.push(m.join(""));var f=this;while(f){f.length++;f=f.prevObject}m.length=0
}this._elem=null;return this.prevObject||this},tag:function(a,b){return this.begin(a,b).end()
},tagName:function(a){if(a===undefined){if(!this._tagName&&this._elem){this._tagName=this._elem.tagName
}return this._tagName}else{this._tagName=a;this._tagNameDidChange=YES;return this
}},id:function(a){if(a===undefined){if(!this._id&&this._elem){this._id=this._elem.id
}return this._id}else{this._id=a;this._idDidChange=YES;return this}},classNames:function(b,a){if(b===undefined){if(!this._classNames&&this._elem){this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(this._cloneClassNames){this._classNames=(this._classNames||[]).slice();this._cloneClassNames=NO
}if(!this._classNames){this._classNames=[]}return this._classNames}else{this._classNames=b;
this._cloneClassNames=a||NO;this._classNamesDidChange=YES;return this}},hasClass:function(a){return this.classNames().indexOf(a)>=0
},addClass:function(a){var b=this.classNames();if(b.indexOf(a)<0){b.push(a);this._classNamesDidChange=YES
}return this},removeClass:function(b){var c=this._classNames,a;if(!c&&this._elem){c=this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(c&&(a=c.indexOf(b))>=0){if(this._cloneClassNames){c=this._classNames=c.slice();
this._cloneClassNames=NO}c[a]=null;this._classNamesDidChange=YES}return this},resetClassNames:function(){this._classNames=[];
this._classNamesDidChange=YES;return this},setClass:function(e,c){var g,a,b,f;if(c!==undefined){return c?this.addClass(e):this.removeClass(e)
}else{g=this._classNames;if(!g&&this._elem){g=this._classNames=(SC.$(this._elem).attr("class")||"").split(" ")
}if(!g){g=this._classNames=[]}if(this._cloneClassNames){g=this._classNames=g.slice();
this._cloneClassNames=NO}f=NO;for(b in e){if(!e.hasOwnProperty(b)){continue}a=g.indexOf(b);
if(e[b]){if(a<0){g.push(b);f=YES}}else{if(a>=0){g[a]=null;f=YES}}}if(f){this._classNamesDidChange=YES
}}return this},_STYLE_REGEX:/\s*([^:\s]+)\s*:\s*([^;]+)\s*;?/g,styles:function(e,f){var a,c,b;
if(e===undefined){if(!this._styles&&this._elem){a=SC.$(this._elem).attr("style");
if(a&&(a=a.toString()).length>0){if(SC.browser.msie){a=a.toLowerCase()}e={};c=this._STYLE_REGEX;
c.lastIndex=0;while(b=c.exec(a)){e[b[1].camelize()]=b[2]}this._styles=e;this._cloneStyles=NO
}else{this._styles={}}}else{if(!this._styles){this._styles={}}else{if(this._cloneStyles){this._styles=SC.beget(this._styles);
this._cloneStyles=NO}}}return this._styles}else{this._styles=e;this._cloneStyles=f||NO;
this._stylesDidChange=YES;return this}},addStyle:function(a,f){var b,e=NO,c=this.styles();
if(typeof a===SC.T_STRING){if(f===undefined){return c[a]}else{if(c[a]!==f){c[a]=f;
this._stylesDidChange=YES}}}else{for(b in a){if(!a.hasOwnProperty(b)){continue}f=a[b];
if(c[b]!==f){c[b]=f;e=YES}}if(e){this._stylesDidChange=YES}}return this},removeStyle:function(a){if(!this._styles&&!this._elem){return this
}var b=this.styles();if(b[a]){b[a]=null;this._stylesDidChange=YES}},attr:function(a,f){var c,b=this._attrs,e=NO;
if(!b){this._attrs=b={}}if(typeof a===SC.T_STRING){if(f===undefined){return b[a]}else{if(b[a]!==f){b[a]=f;
this._attrsDidChange=YES}}}else{for(c in a){if(!a.hasOwnProperty(c)){continue}f=a[c];
if(b[c]!==f){b[c]=f;e=YES}}if(e){this._attrsDidChange=YES}}return this}});SC.RenderContext.fn.html=SC.RenderContext.fn.push;
SC.RenderContext.fn.css=SC.RenderContext.fn.addStyle;if(!SC.browser.isSafari||parseInt(SC.browser.version,10)<526){SC.RenderContext._safari3=YES
}SC.RenderContext.escapeHTML=function(e){var c,b,a;if(SC.none(e)){return e}c=this.escapeHTMLElement;
if(!c){c=this.escapeHTMLElement=document.createElement("div")}b=this.escapeTextNode;
if(!b){b=this.escapeTextNode=document.createTextNode("");c.appendChild(b)}b.data=e;
a=c.innerHTML;if(SC.RenderContext._safari3){a=a.replace(/>/g,"&gt;")}b=c=null;return a
};SC.Response=SC.Object.extend({isError:NO,errorValue:function(){return this}.property().cacheable(),errorObject:null,request:null,originalRequest:function(){var a=this.get("request");
while(a.get("source")){a=a.get("source")}return a}.property("request").cacheable(),type:function(){return this.getPath("request.type")
}.property("request").cacheable(),address:function(){return this.getPath("request.address")
}.property("request").cacheable(),isJSON:function(){return this.getPath("request.isJSON")||NO
}.property("request").cacheable(),isXML:function(){return this.getPath("request.isXML")||NO
}.property("request").cacheable(),listeners:function(){return this.getPath("request.listeners")
}.property("request").cacheable(),status:-100,headers:null,encodedBody:null,body:function(){var a=this.get("encodedBody");
if(a&&this.get("isJSON")){try{a=SC.json.decode(a)}catch(b){return SC.Error.create({message:b.name+": "+b.message,label:"Response",errorValue:this})
}}return a}.property("encodedBody").cacheable(),response:function(){return this.get("body")
}.property("body").cacheable(),isCancelled:NO,fire:function(){var a=this.get("request"),b=a?a.get("source"):null;
if(b&&b.willSend){b.willSend(a,this)}a.freeze();if(!this.get("isCancelled")){this.invokeTransport()
}if(!this.get("isCancelled")&&b&&b.didSend){b.didSend(a,this)}},invokeTransport:function(){this.receive(function(a){this.set("status",200)
},this)},receive:function(e,a){var b=this.get("request");var c=b?b.get("source"):null;
if(c&&c.willReceive){c.willReceive(b,this)}e.call(a,!this.get("isCancelled"));if(!this.get("isCancelled")&&c&&c.didReceive){c.didReceive(b,this)
}if(!this.get("isCancelled")){this.notify()}SC.Request.manager.transportDidClose(this);
return this},cancel:function(){if(!this.get("isCancelled")){this.set("isCancelled",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this)}},cancelTransport:function(){},_notifyListener:function(b,a){var f=b[a],g,e,c;
if(!f){return NO}g=(f.params||[]).copy();g.unshift(this);e=f.target;c=f.action;if(SC.typeOf(c)===SC.T_STRING){c=e[c]
}return c.apply(e,g)},notify:function(){var b=this.get("listeners"),a=this.get("status"),c=Math.floor(a/100)*100,e=NO;
if(!b){return this}SC.RunLoop.begin();e=this._notifyListener(b,a);if(!e){e=this._notifyListener(b,c)
}if(!e){e=this._notifyListener(b,0)}SC.RunLoop.end();return this},toString:function(){var a=arguments.callee.base.apply(this,arguments);
return"%@<%@ %@, status=%@".fmt(a,this.get("type"),this.get("address"),this.get("status"))
}});SC.XHRResponse=SC.Response.extend({headers:function(){var c=this.get("rawRequest"),b=c?c.getAllResponseHeaders():null,a={};
if(!b){return a}b.split("\n").forEach(function(h){var e=h.indexOf(":"),f,g;if(e>=0){f=h.slice(0,e);
g=h.slice(e+1).trim();a[f]=g}},this);return a}.property("status").cacheable(),header:function(a){var b=this.get("rawRequest");
return b?b.getResponseHeader(a):null},encodedBody:function(){var b=this.get("rawRequest"),a;
if(!b){a=null}else{if(this.get("isXML")){a=b.responseXML}else{a=b.responseText}}return a
}.property("status").cacheable(),cancelTransport:function(){var a=this.get("rawRequest");
if(a){a.abort()}this.set("rawRequest",null)},invokeTransport:function(){var e,h,b,c,g;
function f(){for(var j=0;j<arguments.length;j++){try{var k=arguments[j]();return k
}catch(l){}}return NO}e=f(function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")});this.set("rawRequest",e);
c=!!this.getPath("request.isAsynchronous");if(c){if(!SC.browser.msie){SC.Event.add(e,"readystatechange",this,this.finishRequest,e)
}else{h=this;b=function(){if(!h){return null}var i=h.finishRequest();if(i){h=null
}return i};e.onreadystatechange=b}}e.open(this.get("type"),this.get("address"),c);
g=this.getPath("request.headers");for(var a in g){e.setRequestHeader(a,g[a])}e.send(this.getPath("request.encodedBody"));
if(!c){this.finishRequest()}return e},finishRequest:function(c){var f=this.get("rawRequest"),a=f.readyState,e,b,g;
if(a===4){this.receive(function(h){if(!h){return}b=-1;try{b=f.status||0}catch(i){}if((b<200)||(b>=300)){g=f.statusText;
e=SC.$error(g||"HTTP Request failed","Request",b);e.set("errorValue",this);this.set("isError",YES);
this.set("errorObject",e)}this.set("status",b)},this);f.onreadystatechange=function(){};
return YES}return NO}});sc_require("system/response");SC.Request=SC.Object.extend(SC.Copyable,SC.Freezable,{isAsynchronous:YES,isJSON:NO,isXML:NO,headers:function(){var a=this._headers;
if(!a){a=this._headers={}}return a}.property().cacheable(),responseClass:SC.XHRResponse,source:null,address:null,type:"GET",body:null,encodedBody:function(){var a=this.get("body");
if(a&&this.get("isJSON")){a=SC.json.encode(a)}return a}.property("isJSON","isXML","body").cacheable(),willSend:function(b,a){},didSend:function(b,a){},willReceive:function(b,a){},didReceive:function(b,a){},COPY_KEYS:"isAsynchronous isJSON isXML address type body responseClass willSend didSend willReceive didReceive".w(),copy:function(){var a={},e=this.COPY_KEYS,g=e.length,b,c,f;
while(--g>=0){b=e[g];if(this.hasOwnProperty(b)){a[b]=this.get(b)}}if(this.hasOwnProperty("listeners")){a.listeners=SC.copy(this.get("listeners"))
}if(this.hasOwnProperty("_headers")){a._headers=SC.copy(this._headers)}a.source=this.get("source")||this;
return this.constructor.create(a)},header:function(a,b){var c;if(SC.typeOf(a)===SC.T_STRING){c=this._headers;
if(arguments.length===1){return c?c[a]:null}else{this.propertyWillChange("headers");
if(!c){c=this._headers={}}c[a]=b;this.propertyDidChange("headers");return this}}else{if(b===undefined){c=a;
this.beginPropertyChanges();for(a in c){if(!c.hasOwnProperty(a)){continue}this.header(a,c[a])
}this.endPropertyChanges();return this}}return this},json:function(a){if(a===undefined){a=YES
}if(a){this.set("isXML",NO)}return this.set("isJSON",a)},xml:function(a){if(a===undefined){a=YES
}if(a){this.set("isJSON",NO)}return this.set("isXML",a)},_prep:function(){var a=!!this.header("Content-Type");
if(this.get("isJSON")&&!a){this.header("Content-Type","application/json")}else{if(this.get("isXML")&&!a){this.header("Content-Type","text/xml")
}}return this},send:function(a){if(a){this.set("body",a)}return SC.Request.manager.sendRequest(this.copy()._prep())
},resend:function(){var a=this.get("source")?this:this.copy()._prep();return SC.Request.manager.sendRequest(a)
},notify:function(a,f,e,g){var c=YES,g;if(SC.typeOf(a)!==SC.T_NUMBER){g=SC.A(arguments).slice(2);
e=f;f=a;a=0;c=NO}else{g=SC.A(arguments).slice(3)}var b=this.get("listeners");if(!b){this.set("listeners",b={})
}b[a]={target:f,action:e,params:g};return this}});SC.Request.mixin({getUrl:function(a){return this.create().set("address",a).set("type","GET")
},postUrl:function(b,a){var c=this.create().set("address",b).set("type","POST");if(a){c.set("body",a)
}return c},deleteUrl:function(a){return this.create().set("address",a).set("type","DELETE")
},putUrl:function(b,a){var c=this.create().set("address",b).set("type","PUT");if(a){c.set("body",a)
}return c}});SC.Request.manager=SC.Object.create(SC.DelegateSupport,{maxRequests:6,inflight:[],pending:[],sendRequest:function(b){if(!b){return null
}var a=b.get("responseClass").create({request:b});this.get("pending").pushObject(a);
this.fireRequestIfNeeded();return a},cancel:function(b){var e=this.get("pending"),c=this.get("inflight"),a;
if(e.indexOf(b)>=0){this.propertyWillChange("pending");e.removeObject(b);this.propertyDidChange("pending");
return YES}else{if(c.indexOf(b)>=0){b.cancel();c.removeObject(b);this.fireRequestIfNeeded();
return YES}else{return NO}}},cancelAll:function(){if(this.get("pending").length||this.get("inflight").length){this.set("pending",[]);
this.get("inflight").forEach(function(a){a.cancel()});this.set("inflight",[]);return YES
}else{return NO}},fireRequestIfNeeded:function(){var e=this.get("pending"),c=this.get("inflight"),a=this.get("maxRequests"),b;
if((e.length>0)&&(c.length<a)){b=e.shiftObject();c.pushObject(b);b.fire()}},transportDidClose:function(a){this.get("inflight").removeObject(a);
this.fireRequestIfNeeded()}});sc_require("system/ready");SC.RootResponder=SC.Object.extend({panes:null,init:function(){arguments.callee.base.apply(this,arguments);
this.panes=SC.Set.create()},mainPane:null,makeMainPane:function(b){var a=this.get("mainPane");
if(a===b){return this}this.beginPropertyChanges();if(this.get("keyPane")===a){this.makeKeyPane(b)
}this.set("mainPane",b);if(a){a.blurMainTo(b)}if(b){b.focusMainFrom(a)}this.endPropertyChanges();
return this},keyPane:null,previousKeyPanes:[],makeKeyPane:function(g){var f,a,e;if(g){if(!g.get("acceptsKeyPane")){return this
}else{a=this.get("keyPane");if(a===g){return this}else{if(a){e=this.get("previousKeyPanes");
e.push(a)}f=g}}}else{a=this.get("keyPane");e=this.get("previousKeyPanes");f=null;
while(e.length>0){var c=e.pop();if(c.get("isPaneAttached")&&c.get("acceptsKeyPane")){f=c;
break}}}if(!f){var b=this.get("mainPane");if(b&&b.get("acceptsKeyPane")){f=b}}if(a){a.willLoseKeyPaneTo(f)
}if(f){f.willBecomeKeyPaneFrom(a)}this.set("keyPane",f);if(f){f.didBecomeKeyPaneFrom(a)
}if(a){a.didLoseKeyPaneTo(f)}return this},computeWindowSize:function(){return{width:640,height:480}
},defaultResponder:null,sendAction:function(c,e,b,f,a){e=this.targetForAction(c,e,b,f);
if(e&&e.isResponderContext){return !!e.sendAction(c,b,a)}else{return e&&e.tryToPerform(c,b)
}},_responderFor:function(c,a){var b=c?c.get("defaultResponder"):null;if(c){c=c.get("firstResponder")||c;
do{if(c.respondsTo(a)){return c}}while(c=c.get("nextResponder"))}if(typeof b===SC.T_STRING){b=SC.objectForPropertyPath(b)
}if(!b){return null}else{if(b.isResponderContext){return b}else{if(b.respondsTo(a)){return b
}else{return null}}}},targetForAction:function(b,f,e,g){if(!b||(SC.typeOf(b)!==SC.T_STRING)){return null
}if(f){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f)}if(f){if(f.respondsTo&&!f.respondsTo(b)){f=null
}else{if(SC.typeOf(f[b])!==SC.T_FUNCTION){f=null}}}return f}if(g){return this._responderFor(g,b)
}var a=this.get("keyPane"),c=this.get("mainPane");if(a&&(a!==g)){f=this._responderFor(a,b)
}if(!f&&c&&(c!==a)){f=this._responderFor(c,b)}if(!f&&(f=this.get("defaultResponder"))){if(SC.typeOf(f)===SC.T_STRING){f=SC.objectForPropertyPath(f);
if(f){this.set("defaultResponder",f)}}if(f){if(f.respondsTo&&!f.respondsTo(b)){f=null
}else{if(SC.typeOf(f[b])!==SC.T_FUNCTION){f=null}}}}return f},targetViewForEvent:function(a){return a.target?SC.$(a.target).view()[0]:null
},sendEvent:function(c,a,e){var f,b;SC.RunLoop.begin();if(e){f=e.get("pane")}else{f=this.get("keyPane")||this.get("mainPane")
}b=(f)?f.sendEvent(c,a,e):null;SC.RunLoop.end();return b},listenFor:function(b,a){b.forEach(function(c){var e=this[c];
if(e){SC.Event.add(a,c,this,e)}},this);a=null;return this},setup:function(){}});SC.ready(SC.RootResponder,SC.RootResponder.ready=function(){var a;
a=SC.RootResponder.responder=SC.RootResponder.create();a.setup()});SC.routes=SC.Object.create({location:function(b,c){if(c!==undefined){if(c===null){c=""
}if(typeof(c)=="object"){var e=c.route?c.route.split("&"):[""];var a=e.shift();var f={};
e.forEach(function(h){var g=h.split("=");f[g[0]]=g[1]});for(b in c){if(!c.hasOwnProperty(b)){continue
}if(b!="route"){f[b]=encodeURIComponent(""+c[b])}}e=[a];for(b in f){if(!f.hasOwnProperty(b)){continue
}e.push([b,f[b]].join("="))}c=e.join("&")}if(this._location!=c){this._location=c;
this._setWindowLocation(c)}}return this._location}.property(),ping:function(){if(!this._didSetupHistory){this._didSetupHistory=true;
this._setupHistory()}this._checkWindowLocation()},add:function(a,c,e){if(e===undefined&&SC.typeOf(c)===SC.T_FUNCTION){e=c;
c=null}else{if(SC.typeOf(e)===SC.T_STRING){e=c[e]}}var b=a.split("/");if(!this._routes){this._routes=SC.routes._Route.create()
}this._routes.addRoute(b,c,e);return this},gotoRoute:function(a){var f={},e,b,c,g;
this._lastRoute=a;e=a.split("&");if(e&&e.length>0){a=e.shift();e.forEach(function(h){var i=h.split("=");
if(i&&i.length>1){f[i[0]]=decodeURIComponent(i[1])}})}else{a=""}e=a.split("/");if(!this._routes){this._routes=SC.routes._Route.create()
}b=this._routes.functionForRoute(e,f);if(b){c=b._target;g=b._method;if(g){g.call(c,f)
}}},init:function(){arguments.callee.base.call(this);if(SC.browser.isSafari&&parseInt(SC.browser.version,0)<417){SC.mixin(this,this.browserFuncs.safari)
}else{if(SC.browser.isIE){SC.mixin(this,this.browserFuncs.ie)}else{if(SC.browser.isMozilla){SC.mixin(this,this.browserFuncs.firefox)
}}}this._didSetupHistory=false},invokeCheckWindowLocation:function(c){var b=this.__checkWindowLocation,a=this;
if(!b){b=this.__checkWindowLocation=function(){a._checkWindowLocation()}}setTimeout(b,c)
},browserFuncs:{safari:{_setupHistory:function(){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
this._cloc=a;this._backStack=[];this._backStack.length=history.length;this._backStack.push(a);
this._forwardStack=[];this.invokeCheckWindowLocation(1000)},_checkWindowLocation:function(){var b=(history.length-this._lastLength)!==0;
var f=(b)?(history.length-this._backStack.length):0;this._lastLength=history.length;
if(b){console.log("historyDidChange")}if(f){if(f<0){this._forwardStack.push(this._cloc);
for(var a=0;a<Math.abs(f+1);a++){this._forwardStack.push(this._backStack.pop())}this._cloc=this._backStack.pop()
}else{this._backStack.push(this._cloc);for(a=0;a<(f-1);a++){this._backStack.push(this._forwardStack.pop())
}this._cloc=this._forwardStack.pop()}}else{if(b&&this._locationDidChange){this.gotoRoute(this._cloc);
this._locationDidChange=false}}var e=this._cloc;var c=this.get("location");if(e!=c){this.set("location",(e)?e:"");
this.gotoRoute(e)}this.invokeCheckWindowLocation(50)},_setWindowLocation:function(b){var a=this._cloc;
if(a!=b){this._backStack.push(this._cloc);this._forwardStack.length=0;this._cloc=b;
location.hash=(b&&b.length>0)?b:"";this._locationDidChange=true}}},ie:{_setupHistory:function(){this.invokeCheckWindowLocation(1000)
},_checkWindowLocation:function(){var b=this.get("location");var a=location.hash;
a=(a&&a.length>0)?a.slice(1,a.length):"";if(a!=b){this.set("location",(a)?a:"")}this.invokeCheckWindowLocation(100)
},_setWindowLocation:function(b){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
if(a!=b){location.hash=(b&&b.length>0)?b:"#"}this.gotoRoute(b)}},firefox:{_checkWindowLocation:function(){var b=this.get("location");
var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";if(a!=b){SC.RunLoop.begin();
this.set("location",(a)?a:"");SC.RunLoop.end()}this.invokeCheckWindowLocation(150)
},_setWindowLocation:function(b){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
if(a!=b){location.hash=(b&&b.length>0)?b:"#"}this.gotoRoute(b)}}},_setupHistory:function(){var a=this;
this.invokeCheckWindowLocation(1000)},_checkWindowLocation:function(){var b=this.get("location");
var a=decodeURI(location.hash);a=(a&&a.length>0)?a.slice(1,a.length):"";if(a!==b){SC.RunLoop.begin();
this.set("location",(a)?a:"");SC.RunLoop.end()}this.invokeCheckWindowLocation(150)
},_setWindowLocation:function(b){var a=location.hash;a=(a&&a.length>0)?a.slice(1,a.length):"";
if(a!=b){location.hash=(b&&b.length>0)?encodeURI(b):"#"}this.gotoRoute(b)},_routes:null,_Route:SC.Object.extend({_target:null,_method:null,_static:null,_dynamic:null,_wildcard:null,addRoute:function(e,c,g){if(!e||e.length===0){this._target=c;
this._method=g}else{var b=e.shift();var f=null;switch(b.slice(0,1)){case":":b=b.slice(1,b.length);
var a=this._dynamic[b]||[];f=SC.routes._Route.create();a.push(f);this._dynamic[b]=a;
break;case"*":b=b.slice(1,b.length);this._wildcard=b;this._target=c;this._method=g;
break;default:a=this._static[b]||[];f=SC.routes._Route.create();a.push(f);this._static[b]=a
}if(f){f.addRoute(e,c,g)}}},functionForRoute:function(c,b){if(!c||c.length===0){return this
}else{var a=c.shift(),g=null,k,i,f,e;k=this._static[a];if(k){for(f=0,e=k.length;(f<e)&&(g===null);
f++){var h=c.slice();g=k[f].functionForRoute(h,b)}}if(g===null){for(var j in this._dynamic){k=this._dynamic[j];
if(k){for(f=0,e=k.length;(f<e)&&(g===null);f++){h=c.slice();g=k[f].functionForRoute(h,b);
if(g&&b){b[j]=a}}}if(g){break}}}if((g===null)&&this._wildcard){c.unshift(a);if(b){b[this._wildcard]=c.join("/")
}g=this}return g}},init:function(){arguments.callee.base.call(this);this._static={};
this._dynamic={}}})});SC.TextSelection=SC.Object.extend(SC.Copyable,SC.Freezable,{start:-1,end:-1,length:function(){var b=this.get("start");
var a=this.get("end");if((b)===-1||(a===-1)){return -1}else{return a-b}}.property("start","end").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.freeze()},copy:function(){return SC.TextSelection.create({start:this.get("start"),end:this.get("end")})
},toString:function(){var a=this.get("length");if(a&&a>0){if(a===1){return"[%@ character selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}else{return"[%@ characters selected: {%@, %@}]".fmt(a,this.get("start"),this.get("end"))
}}else{return"[no text selected; caret at %@]".fmt(this.get("start"))}}});SC.time=function(a){var b=SC.beget(fn);
b.value=timeOffset;return b};(function(){var a=new Date();SC.mixin(SC.time,{month:function(c,b){a.setTime(c);
if(b===undefined){return a.getMonth()}a.setMonth(b);return a.getTime()},utc:function(b){a.setTime(b);
return b+(a.getTimezoneOffset()*60*1000)},local:function(b){a.setTime(b);return b-(a.getTimezoneOffset()*60*1000)
},parse:function(b){},format:function(b){}})})();SC.time.fmt=SC.time.format;SC.time.fn={done:function(){return this.value
}};"month day year".split(" ").forEach(function(a){SC.time.fn[a]=function(b){if(b===undefined){return SC.time[a](this.value)
}else{this.value=SC.time[a](this.value,b);return this}}});var MONTH_NAMES=new Array("January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var DAY_NAMES=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat");
function LZ(a){return(a<0||a>9?"":"0")+a}SC.Locale.define("en",{longMonthNames:"January February March April May".split(" "),shortMonthNames:[],shortDateFormat:"dd/mm/yy",longDateFormat:""});
SC.mixin(Date,{now:function(){return new Date().getTime()},isDate:function(c,b){var a=Date.getDateFromFormat(c,b);
if(a==0){return false}return true},compareDates:function(f,g,c,e){var b=Date.getDateFromFormat(f,g);
var a=Date.getDateFromFormat(c,e);if(b==0||a==0){return -1}else{if(b>a){return 1}}return 0
},getDateFromFormat:function(A,r){A=A+"";r=r+"";var z=0;var m=0;var t="";var g="";
var w="";var j,h;var b=new Date();var k=b.getFullYear();var v=b.getMonth()+1;var u=1;
var e=b.getHours();var s=b.getMinutes();var o=b.getSeconds();var l="";var p=SC.Locale.currentLocale;
while(m<r.length){t=r.charAt(m);g="";while((r.charAt(m)==t)&&(m<r.length)){g+=r.charAt(m++)
}if(g=="yyyy"||g=="yy"||g=="y"){if(g=="yyyy"){j=4;h=4}if(g=="yy"){j=2;h=2}if(g=="y"){j=2;
h=4}k=Date._getInt(A,z,j,h);if(k==null){return 0}z+=k.length;if(k.length==2){if(k>70){k=1900+(k-0)
}else{k=2000+(k-0)}}}else{if(g=="MMM"||g=="NNN"){v=0;for(var q=0;q<MONTH_NAMES.length;
q++){var f=MONTH_NAMES[q];if(A.substring(z,z+f.length).toLowerCase()==f.toLowerCase()){if(g=="MMM"||(g=="NNN"&&q>11)){v=q+1;
if(v>12){v-=12}z+=f.length;break}}}if((v<1)||(v>12)){return 0}}else{if(g=="EE"||g=="E"){for(var q=0;
q<DAY_NAMES.length;q++){var n=DAY_NAMES[q];if(A.substring(z,z+n.length).toLowerCase()==n.toLowerCase()){z+=n.length;
break}}}else{if(g=="MM"||g=="M"){v=Date._getInt(A,z,g.length,2);if(v==null||(v<1)||(v>12)){return 0
}z+=v.length}else{if(g=="dd"||g=="d"){u=Date._getInt(A,z,g.length,2);if(u==null||(u<1)||(u>31)){return 0
}z+=u.length}else{if(g=="hh"||g=="h"){e=Date._getInt(A,z,g.length,2);if(e==null||(e<1)||(e>12)){return 0
}z+=e.length}else{if(g=="HH"||g=="H"){e=Date._getInt(A,z,g.length,2);if(e==null||(e<0)||(e>23)){return 0
}z+=e.length}else{if(g=="KK"||g=="K"){e=Date._getInt(A,z,g.length,2);if(e==null||(e<0)||(e>11)){return 0
}z+=e.length}else{if(g=="kk"||g=="k"){e=Date._getInt(A,z,g.length,2);if(e==null||(e<1)||(e>24)){return 0
}z+=e.length;e--}else{if(g=="mm"||g=="m"){s=Date._getInt(A,z,g.length,2);if(s==null||(s<0)||(s>59)){return 0
}z+=s.length}else{if(g=="ss"||g=="s"){o=Date._getInt(A,z,g.length,2);if(o==null||(o<0)||(o>59)){return 0
}z+=o.length}else{if(g=="a"){if(A.substring(z,z+2).toLowerCase()=="am"){l="AM"}else{if(A.substring(z,z+2).toLowerCase()=="pm"){l="PM"
}else{return 0}}z+=2}else{if(A.substring(z,z+g.length)!=g){return 0}else{z+=g.length
}}}}}}}}}}}}}}if(z!=A.length){return 0}if(v==2){if(((k%4==0)&&(k%100!=0))||(k%400==0)){if(u>29){return 0
}}else{if(u>28){return 0}}}if((v==4)||(v==6)||(v==9)||(v==11)){if(u>30){return 0}}if(e<12&&l=="PM"){e=e-0+12
}else{if(e>11&&l=="AM"){e-=12}}var a=new Date(k,v-1,u,e,s,o);return a.getTime()},parseDate:function(k){var g=(arguments.length==2)?arguments[1]:false;
generalFormats=new Array("E NNN dd HH:mm:ss UTC yyyy","y-M-d","y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d","d MMM y","d.MMM.y","y MMM d","y.MMM.d");
monthFirst=new Array("M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d");dateFirst=new Array("d/M/y","d-M-y","d.M.y","d-MMM","d/M","d-M");
var b=new Array("generalFormats",g?"dateFirst":"monthFirst",g?"monthFirst":"dateFirst");
var h=null;h=0;var e=new Date().getTime();switch(k.toLowerCase()){case"yesterday".loc():h=e-(24*60*60*1000);
break;case"today".loc():case"now".loc():h=e;break;case"tomorrow".loc():h=e+(24*60*60*1000);
break}if(h>0){return new Date(h)}for(var f=0;f<b.length;f++){var a=window[b[f]];for(var c=0;
c<a.length;c++){h=Date.getDateFromFormat(k,a[c]);if(h==0){h=Date.getDateFromFormat(k,a[c]+" H:m:s")
}if(h==0){h=Date.getDateFromFormat(k,a[c]+" h:m:s a")}if(h!=0){return new Date(h)
}}}return null},_isInteger:function(c){var b="1234567890";for(var a=0;a<c.length;
a++){if(b.indexOf(c.charAt(a))==-1){return false}}return true},_getInt:function(g,e,f,c){for(var a=c;
a>=f;a--){var b=g.substring(e,e+a);if(b.length<f){return null}if(Date._isInteger(b)){return b
}}return null}});SC.mixin(Date.prototype,{format:function(D){D=D+"";var I=this;var l="";
var v=0;var G="";var f="";var j=I.getFullYear()+"";var g=I.getMonth()+1;var F=I.getDate();
var o=I.getDay();var n=I.getHours();var x=I.getMinutes();var q=I.getSeconds();var t,u,b,r,J,e,C,B,z,p,N,n,L,i,a,A;
var w=new Object();if(j.length<4){j=""+(j-0+1900)}w.y=""+j;w.yyyy=j;w.yy=j.substring(2,4);
w.M=g;w.MM=LZ(g);w.MMM=MONTH_NAMES[g-1];w.NNN=MONTH_NAMES[g+11];w.d=F;w.dd=LZ(F);
w.E=DAY_NAMES[o+7];w.EE=DAY_NAMES[o];w.H=n;w.HH=LZ(n);if(n==0){w.h=12}else{if(n>12){w.h=n-12
}else{w.h=n}}w.hh=LZ(w.h);if(n>11){w.K=n-12}else{w.K=n}w.k=n+1;w.KK=LZ(w.K);w.kk=LZ(w.k);
if(n>11){w.a="PM"}else{w.a="AM"}w.m=x;w.mm=LZ(x);w.s=q;w.ss=LZ(q);while(v<D.length){G=D.charAt(v);
f="";while((D.charAt(v)==G)&&(v<D.length)){f+=D.charAt(v++)}if(w[f]!=null){l=l+w[f]
}else{l=l+f}}return l},utcFormat:function(){return(new Date(this.getTime()+(this.getTimezoneOffset()*60*1000))).format("E NNN dd HH:mm:ss UTC yyyy")
}});SC.Timer=SC.Object.extend({target:null,action:null,isPooled:NO,interval:0,startTime:null,repeats:NO,until:null,isPaused:NO,isScheduled:NO,isValid:YES,lastFireTime:0,fireTime:function(){if(!this.get("isValid")){return -1
}var f=this.get("startTime");if(!f||f===0){return -1}var a=this.get("interval"),c=this.get("lastFireTime");
if(c<f){c=f}var b;if(this.get("repeats")){if(a===0){b=c}else{b=f+(Math.floor((c-f)/a)+1)*a
}}else{b=f+a}var e=this.get("until");if(e&&e>0&&b>e){b=e}return b}.property("interval","startTime","repeats","until","isValid","lastFireTime").cacheable(),schedule:function(){if(!this.get("isValid")){return this
}this.beginPropertyChanges();if(!this.startTime){this.set("startTime",SC.RunLoop.currentRunLoop.get("startTime"))
}var a=this.get("fireTime"),b=this.get("lastFireTime");if(a>=b){this.set("isScheduled",YES);
SC.RunLoop.currentRunLoop.scheduleTimer(this,a)}this.endPropertyChanges();return this
},invalidate:function(){this.beginPropertyChanges();this.set("isValid",NO);SC.RunLoop.currentRunLoop.cancelTimer(this);
this.action=this.target=null;this.endPropertyChanges();if(this.get("isPooled")){SC.Timer.returnTimerToPool(this)
}return this},fire:function(){var b=Date.now();this.set("lastFireTime",b);var a=this.get("fireTime");
if(!this.get("isPaused")){this.performAction()}if(a>b){this.schedule()}else{this.invalidate()
}},performAction:function(){var a=SC.typeOf(this.action);if(a==SC.T_FUNCTION){this.action.call((this.target||this),this)
}else{if(a===SC.T_STRING){if(this.action.indexOf(".")>=0){var f=this.action.split(".");
var c=f.pop();var e=SC.objectForPropertyPath(f,window);var b=e.get?e.get(c):e[c];
if(b&&SC.typeOf(b)==SC.T_FUNCTION){b.call(e,this)}else{throw"%@: Timer could not find a function at %@".fmt(this,this.action)
}}else{SC.RootResponder.responder.sendAction(this.action,this.target,this)}}}},init:function(){arguments.callee.base.apply(this,arguments);
if(this.startTime instanceof Date){this.startTime=this.startTime.getTime()}if(this.until instanceof Date){this.until=this.until.getTime()
}},RESET_DEFAULTS:{target:null,action:null,isPooled:NO,isPaused:NO,isScheduled:NO,isValid:YES,interval:0,repeats:NO,until:null,startTime:null,lastFireTime:0},reset:function(b){if(!b){b=SC.EMPTY_HASH
}this.propertyWillChange("fireTime");var c=this.RESET_DEFAULTS;for(var a in c){if(!c.hasOwnProperty(a)){continue
}this[a]=SC.none(b[a])?c[a]:b[a]}this.propertyDidChange("fireTime");return this},removeFromTimerQueue:function(c){var b=this._timerQueuePrevious,a=this._timerQueueNext;
if(!b&&!a&&c!==this){return c}if(b){b._timerQueueNext=a}if(a){a._timerQueuePrevious=b
}this._timerQueuePrevious=this._timerQueueNext=null;return(c===this)?a:c},scheduleInTimerQueue:function(c,b){this._timerQueueRunTime=b;
var a=c;var e=null;while(a&&a._timerQueueRunTime<b){e=a;a=a._timerQueueNext}if(e){e._timerQueueNext=this;
this._timerQueuePrevious=e}if(a){a._timerQueuePrevious=this;this._timerQueueNext=a
}return(a===c)?this:c},collectExpiredTimers:function(c,a){if(this._timerQueueRunTime>a){return this
}c.push(this);var b=this._timerQueueNext;this._timerQueueNext=null;if(b){b._timerQueuePrevious=null
}return b?b.collectExpiredTimers(c,a):null}});SC.Timer.schedule=function(a){var b;
if(!a||SC.none(a.isPooled)||a.isPooled){b=this.timerFromPool(a)}else{b=this.create(a)
}return b.schedule()};SC.Timer.timerFromPool=function(a){var b=this._timerPool;if(!b){b=this._timerPool=[]
}var c=b.pop();if(!c){c=this.create()}return c.reset(a)};SC.Timer.returnTimerToPool=function(a){if(!this._timerPool){this._timerPool=[]
}this._timerPool.push(a);return this};SC.UserDefaults=SC.Object.extend({userDomain:null,appDomain:null,_defaults:null,defaults:function(a){this._defaults=a;
this.allPropertiesDidChange()},readDefault:function(g){var f=undefined;g=this._normalizeKeyName(g);
var a=this._userKeyName(g);if(this._written){f=this._written[a]}var c=window.localStorage;
if(!c&&window.globalStorage){c=window.globalStorage[window.location.hostname]}if(c){f=c[["SC.UserDefaults",a].join("@")];
if(!SC.none(f)){try{f=SC.json.decode(f)}catch(h){f=undefined}}else{f=undefined}}var b=this.delegate;
if(b&&b.userDefaultsNeedsDefault){f=b.userDefaultsNeedsDefault(this,g,a)}if((f===undefined)&&this._defaults){f=this._defaults[a]||this._defaults[g]
}return f},writeDefault:function(f,g){f=this._normalizeKeyName(f);var a=this._userKeyName(f);
var c=this._written;if(!c){c=this._written={}}c[a]=g;var e=window.localStorage;if(!e&&window.globalStorage){e=window.globalStorage[window.location.hostname]
}if(e){e[["SC.UserDefaults",a].join("@")]=SC.json.encode(g)}var b=this.delegate;if(b&&b.userDefaultsDidChange){b.userDefaultsDidChange(this,f,g,a)
}return this},resetDefault:function(f){var e=this._normalizeKeyName(f);var a=this._userKeyName(e);
this.propertyWillChange(f);this.propertyWillChange(e);var b=this._written;if(b){delete b[a]
}var c=window.localStorage;if(!c&&window.globalStorage){c=window.globalStorage[window.location.hostname]
}if(c){delete c[["SC.UserDefaults",a].join("@")]}this.propertyDidChange(f);this.propertyDidChange(e);
return this},unknownProperty:function(a,b){if(b===undefined){return this.readDefault(a)
}else{this.writeDefault(a,b);return b}},_normalizeKeyName:function(a){if(a.indexOf(":")<0){var b=this.get("appDomain")||"app";
a=[b,a].join(":")}return a},_userKeyName:function(b){var a=this.get("userDomain")||"(anonymous)";
return[a,b].join("@")},_domainDidChange:function(){var a=NO;if(this.get("userDomain")!==this._scud_userDomain){this._scud_userDomain=this.get("userDomain");
a=YES}if(this.get("appDomain")!==this._scud_appDomain){this._scud_appDomain=this.get("appDomain");
a=YES}if(a){this.allPropertiesDidChange()}}.observes("userDomain","appDomain"),init:function(){arguments.callee.base.apply(this,arguments);
this._scud_userDomain=this.get("userDomain");this._scud_appDomain=this.get("appDomain")
}});SC.userDefaults=SC.UserDefaults.create();sc_require("system/browser");SC.mixin({_downloadFrames:0,_copy_computed_props:["maxWidth","maxHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","fontFamily","fontSize","fontStyle","fontWeight","fontVariant","lineHeight","whiteSpace"],download:function(f){var a=document.createElement("iframe");
var e="DownloadFrame_"+this._downloadFrames;SC.$(a).attr("id",e);a.style.border="10px";
a.style.width="0px";a.style.height="0px";a.style.position="absolute";a.style.top="-10000px";
a.style.left="-10000px";if(!SC.browser.isSafari){SC.$(a).attr("src",f)}document.getElementsByTagName("body")[0].appendChild(a);
if(SC.browser.isSafari){SC.$(a).attr("src",f)}this._downloadFrames=this._downloadFrames+1;
if(!SC.browser.isSafari){var c=function(){document.body.removeChild(document.getElementById(e));
e=null};var b=c.invokeLater(null,2000)}a=null},normalizeURL:function(a){if(a.slice(0,1)=="/"){a=window.location.protocol+"//"+window.location.host+a
}else{if((a.slice(0,5)=="http:")||(a.slice(0,6)=="https:")){}else{a=window.location.href+"/"+a
}}return a},minX:function(a){return a.x||0},maxX:function(a){return(a.x||0)+(a.width||0)
},midX:function(a){return(a.x||0)+((a.width||0)/2)},minY:function(a){return a.y||0
},maxY:function(a){return(a.y||0)+(a.height||0)},midY:function(a){return(a.y||0)+((a.height||0)/2)
},centerX:function(b,a){return(a.width-b.width)/2},centerY:function(b,a){return(a.height-b.height)/2
},pointInRect:function(a,b){return(a.x>=SC.minX(b))&&(a.y>=SC.minY(b))&&(a.x<=SC.maxX(b))&&(a.y<=SC.maxY(b))
},rectsEqual:function(b,a,c){if(!b||!a){return(b==a)}if(!c&&c!==0){c=0.1}if((b.y!=a.y)&&(Math.abs(b.y-a.y)>c)){return NO
}if((b.x!=a.x)&&(Math.abs(b.x-a.x)>c)){return NO}if((b.width!=a.width)&&(Math.abs(b.width-a.width)>c)){return NO
}if((b.height!=a.height)&&(Math.abs(b.height-a.height)>c)){return NO}return YES},intersectRects:function(b,a){var c={x:Math.max(SC.minX(b),SC.minX(a)),y:Math.max(SC.minY(b),SC.minY(a)),width:Math.min(SC.maxX(b),SC.maxX(a)),height:Math.min(SC.maxY(b),SC.maxY(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},unionRects:function(b,a){var c={x:Math.min(SC.minX(b),SC.minX(a)),y:Math.min(SC.minY(b),SC.minY(a)),width:Math.max(SC.maxX(b),SC.maxX(a)),height:Math.max(SC.maxY(b),SC.maxX(a))};
c.width=Math.max(0,c.width-c.x);c.height=Math.max(0,c.height-c.y);return c},cloneRect:function(a){return{x:a.x,y:a.y,width:a.width,height:a.height}
},stringFromRect:function(a){return"{%@, %@, %@, %@}".fmt(a.x,a.y,a.width,a.height)
},stringFromLayout:function(f){var e=["maxHeight","maxWidth","minHeight","minWidth","centerY","centerX","width","height","bottom","right","top","left"];
var a=[];var c=e.length;while(--c>=0){var b=e[c];if(f.hasOwnProperty(b)){a.push(b+":"+f[b])
}}return"{"+a.join(", ")+"}"},heightForString:function(h,e,c,g){var f=this._heightCalcElement,b,a;
b=(g&&SC.typeOf(g)===SC.T_ARRAY)?g.join(" "):"";if(!e){e=100}if(!f){f=this._heightCalcElement=document.createElement("div");
document.body.insertBefore(f,null)}c="%@; width: %@px; left: %@px; position: absolute".fmt(c,e,(-1*e));
SC.$(f).attr("style",c);if(b!==""){SC.$(f).attr("class",b)}f.innerHTML=h;a=f.clientHeight;
f=null;return a},metricsForString:function(m,q,a){var l=this._metricsCalculationElement,e,p,j,r,c;
j=SC.A(a).join(" ");if(!l){l=this._metricsCalculationElement=document.createElement("div");
document.body.insertBefore(l,null)}if(SC.typeOf(q)!=SC.T_STRING){var h=null;if(document.defaultView&&document.defaultView.getComputedStyle){h=document.defaultView.getComputedStyle(q,null)
}else{h=q.currentStyle}c=h.cssText;if(!c||c.trim()===""){var o=this._copy_computed_props;
for(var k=0;k<o.length;k++){var b=o[k],g=h[b];l.style[b]=g}var n=l.style;if(n.font===""){var f="";
if(n.fontStyle){f+=n.fontStyle+" "}if(n.fontVariant){f+=n.fontVariant+" "}if(n.fontWeight){f+=n.fontWeight+" "
}if(n.fontSize){f+=n.fontSize}else{f+="10px"}if(n.lineHeight){f+="/"+n.lineHeight
}f+=" ";if(n.fontFamily){f+=n.fontFamily}else{n+="sans-serif"}l.style.font=f}SC.mixin(l.style,{left:"0px",top:"0px",position:"absolute",bottom:"auto",right:"auto",width:"auto",height:"auto"})
}else{l.setAttribute("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}h=null}else{c=q;l.setAttribute("style",c+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}if(typeof l.innerText!="undefined"){l.innerText=m}else{l.textContent=m}l.className=j;
var s={width:l.clientWidth,height:l.clientHeight};l.innerHTML="";l.className="";l.setAttribute("style","");
l=null;return s},viewportOffset:function(c){if(c.getBoundingClientRect){var e=c.getBoundingClientRect();
return{x:e.left,y:e.top}}var j=0;var f=0;var i=c;var b=SC.browser.mozilla>=3;while(i){f+=(i.offsetTop||0);
if(!b||(i!==c)){f+=(i.clientTop||0)}j+=(i.offsetLeft||0);if(!b||(i!==c)){j+=(i.clientLeft||0)
}if(SC.browser.mozilla){var h=SC.$(i).attr("overflow");if(h!=="visible"){var g=parseInt(SC.$(i).attr("borderLeftWidth"),0)||0;
var k=parseInt(SC.$(i).attr("borderTopWidth"),0)||0;if(c!==i){g*=2;k*=2}j+=g;f+=k
}var a=i.offsetParent;if((SC.browser.mozilla>=3)&&a){f-=a.clientTop;j-=a.clientLeft
}}if(i.offsetParent==document.body&&SC.$(i).attr("position")=="absolute"){break}i=i.offsetParent
}i=c;while(i){if(!SC.browser.isOpera||i.tagName=="BODY"){f-=i.scrollTop||0;j-=i.scrollLeft||0
}i=i.parentNode}return{x:j,y:f}},ZERO_POINT:{x:0,y:0},ZERO_RANGE:{start:0,length:0},RANGE_NOT_FOUND:{start:0,length:-1},valueInRange:function(b,a){return(b>=0)&&(b>=a.start)&&(b<(a.start+a.length))
},minRange:function(a){return a.start},maxRange:function(a){return(a.length<0)?-1:(a.start+a.length)
},unionRanges:function(c,b){if((c==null)||(c.length<0)){return b}if((b==null)||(b.length<0)){return c
}var e=Math.min(c.start,b.start);var a=Math.max(SC.maxRange(c),SC.maxRange(b));return{start:e,length:a-e}
},intersectRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var e=Math.max(SC.minRange(c),SC.minRange(b));
var a=Math.min(SC.maxRange(c),SC.maxRange(b));if(a<e){return SC.RANGE_NOT_FOUND}return{start:e,length:a-e}
},subtractRanges:function(c,b){if((c==null)||(b==null)){return SC.RANGE_NOT_FOUND
}if((c.length<0)||(b.length<0)){return SC.RANGE_NOT_FOUND}var a=Math.max(SC.minRange(c),SC.minRange(b));
var e=Math.min(SC.maxRange(c),SC.maxRange(b));if(a<e){return SC.RANGE_NOT_FOUND}return{start:e,length:a-e}
},cloneRange:function(a){return{start:a.start,length:a.length}},rangesEqual:function(b,a){if(b===a){return true
}if(b==null){return a.length<0}if(a==null){return b.length<0}return(b.start==a.start)&&(b.length==a.length)
},convertHsvToHex:function(k,x,u){var a=0;var l=0;var o=0;if(u>0){var j=(k==1)?0:Math.floor(k*6);
var m=(k==1)?0:(k*6)-j;var e=u*(1-x);var c=u*(1-(x*m));var w=u*(1-(x*(1-m)));var n=[[u,w,e],[c,u,e],[e,u,w],[e,c,u],[w,e,u],[u,e,c]];
a=Math.round(255*n[j][0]);l=Math.round(255*n[j][1]);o=Math.round(255*n[j][2])}return this.parseColor("rgb("+a+","+l+","+o+")")
},convertHexToHsv:function(i){var c=this.expandColor(i);var a=Math.max(Math.max(c[0],c[1]),c[2]);
var e=Math.min(Math.min(c[0],c[1]),c[2]);var g=(a==e)?0:((a==c[0])?((c[1]-c[2])/(a-e)/6):((a==c[1])?((c[2]-c[0])/(a-e)/6+1/3):((c[0]-c[1])/(a-e)/6+2/3)));
g=(g<0)?(g+1):((g>1)?(g-1):g);var f=(a==0)?0:(1-e/a);var b=a/255;return[g,f,b]},PARSE_COLOR_RGBRE:/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i,PARSE_COLOR_HEXRE:/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,expandColor:function(b){var c,f,e,a;
c=this.parseColor(b);if(c){f=parseInt(c.slice(1,3),16);e=parseInt(c.slice(3,5),16);
a=parseInt(c.slice(5,7),16);return[f,e,a]}},parseColor:function(e){var f=0,a="#",c;
if(c=this.PARSE_COLOR_RGBRE.exec(e)){var b;for(f=1;f<=3;f++){b=Math.max(0,Math.min(255,parseInt(c[f],0)));
a+=this.toColorPart(b)}return a}if(c=this.PARSE_COLOR_HEXRE.exec(e)){if(c[1].length==3){for(f=0;
f<3;f++){a+=c[1].charAt(f)+c[1].charAt(f)}return a}return"#"+c[1]}return false},toColorPart:function(a){if(a>255){a=255
}var b=a.toString(16);if(a<16){return"0"+b}return b},getStyle:function(a,b){var c="";
if(document.defaultView&&document.defaultView.getComputedStyle){c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)
}else{if(a.currentStyle){b=b.replace(/\-(\w)/g,function(e,f){return f.toUpperCase()
});c=a.currentStyle[b]}}return c}});sc_require("views/view");SC.ContainerView=SC.View.extend({classNames:["sc-container-view"],nowShowing:null,contentView:null,contentViewBindingDefault:SC.Binding.single(),replaceContent:function(a){this.removeAllChildren();
if(a){this.appendChild(a)}},createChildViews:function(){var a=this.get("contentView");
if(a){a=this.contentView=this.createChildView(a);this.childViews=[a]}},awake:function(){arguments.callee.base.apply(this,arguments);
var a=this.get("nowShowing");if(a&&a.length>0){this.nowShowingDidChange()}},nowShowingDidChange:function(){var b=this.get("nowShowing");
var a=null;if(SC.typeOf(b)===SC.T_STRING){if(b===SC.CONTENT_SET_DIRECTLY){return}if(b&&b.length>0){if(b.indexOf(".")>0){a=SC.objectForPropertyPath(b,null)
}else{a=SC.objectForPropertyPath(b,this.get("page"))}}}else{a=b}if(a&&!(a instanceof SC.View)){a=null
}this.set("contentView",a)}.observes("nowShowing"),contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView")});sc_require("views/view");sc_require("mixins/control");
sc_require("mixins/validatable");SC.FieldView=SC.View.extend(SC.Control,SC.Validatable,{isTextArea:NO,followSafariTabFocusBehavior:NO,_field_isMouseDown:NO,fieldValue:function(){var a=this.get("value");
if(SC.typeOf(a)===SC.T_ERROR){a=a.get("value")}return this.fieldValueForObject(a)
}.property("value","validator").cacheable(),$input:function(){if(this.get("isTextArea")){return this.$("textarea").andSelf().filter("textarea")
}else{return this.$("input").andSelf().filter("input")}},setFieldValue:function(b){if(SC.none(b)){b=""
}var a=this.$input();if(a.val()!==b){a.val(b)}return this},getFieldValue:function(){return this.$input().val()
},_field_fieldValueDidChange:function(a){SC.RunLoop.begin();this.fieldValueDidChange(NO);
SC.RunLoop.end()},fieldValueDidChange:function(a){var c=this.getFieldValue();var b=this.objectForFieldValue(c,a);
this.setIfChanged("value",b)},_field_valueDidChange:function(){this.setFieldValue(this.get("fieldValue"))
}.observes("value"),didCreateLayer:function(){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)},willDestroyLayer:function(){SC.Event.remove(this.$input(),"change",this,this._field_fieldValueDidChange)
},updateLayer:function(){arguments.callee.base.apply(this,arguments)},mouseDown:function(a){this._field_isMouseDown=YES;
a.allowDefault();return YES},mouseOut:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}a.allowDefault();return YES},mouseOver:function(a){this.set("isActive",this._field_isMouseDown);
a.allowDefault();return YES},mouseUp:function(a){if(this._field_isMouseDown){this.set("isActive",NO)
}this._field_isMouseDown=NO;a.allowDefault();return YES},keyDown:function(b){if(b.which===9){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
a.becomeFirstResponder();return YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}return YES},acceptsFirstResponder:function(){if(!this.get("followSafariTabFocusBehavior")){return this.get("isEnabled")
}return NO}.property("isEnabled"),willBecomeKeyResponderFrom:function(a){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$input().get(0).focus()
}}},willLoseKeyResponderTo:function(a){if(this._isFocused){this._isFocused=NO}},_field_setFieldValue:function(b){this.propertyWillChange("fieldValue");
if(this.fieldValueForObject){b=this.fieldValueForObject(b)}var a=this.setFieldValue(b);
this.propertyDidChange("fieldValue");return a},_field_getFieldValue:function(){var a=this.getFieldValue();
if(this.objectForFieldValue){a=this.objectForFieldValue(a)}return a}});sc_require("views/view");
sc_require("mixins/control");SC.IMAGE_STATE_NONE="none";SC.IMAGE_STATE_LOADING="loading";
SC.IMAGE_STATE_LOADED="loaded";SC.IMAGE_STATE_FAILED="failed";SC.IMAGE_STATE_SPRITE="sprite";
SC.BLANK_IMAGE_DATAURL="data:image/gif;base64,R0lGODlhAQABAJAAAP///wAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==";
SC.BLANK_IMAGE_URL=SC.browser.msie&&SC.browser.msie<8?"/static/sproutcore/foundation/en/668e188bd44c10fb9ca18d37e89878e7aac1402d/blank.gif":SC.BLANK_IMAGE_DATAURL;
SC.ImageView=SC.View.extend(SC.Control,{classNames:"sc-image-view",tagName:"img",status:SC.IMAGE_STATE_NONE,value:null,useImageCache:YES,canLoadInBackground:NO,localize:YES,displayProperties:"status toolTip".w(),render:function(c,g){var a=this.get("status"),e=this.get("value");
if(a===SC.IMAGE_STATE_NONE&&e){this._image_valueDidChange()}a=this.get("status");
var f=(a===SC.IMAGE_STATE_LOADED)?e:SC.BLANK_IMAGE_URL;if(a===SC.IMAGE_STATE_SPRITE){c.addClass(e)
}c.attr("src",f);var b=this.get("toolTip");if(SC.typeOf(b)===SC.T_STRING){if(this.get("localize")){b=b.loc()
}c.attr("title",b);c.attr("alt",b)}},_image_valueDidChange:function(){var b=this.get("value"),c;
if(b&&b.isEnumerable){b=b.firstObject()}c=SC.ImageView.valueIsUrl(b);if(c&&this.get("useImageCache")){var a=this.get("isVisibleInWindow")||this.get("canLoadInBackground");
this._loadingUrl=b;SC.imageCache.loadImage(b,this,this.imageDidLoad,a);if(this._loadingUrl){this.set("status",SC.IMAGE_STATE_LOADING)
}}else{this._loadingUrl=null;this.set("status",(c)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_SPRITE);
this.displayDidChange()}}.observes("value"),imageDidLoad:function(a,b){if(a===this._loadingUrl){this._loadingUrl=null
}if(this.get("value")===a){this.set("status",SC.$ok(b)?SC.IMAGE_STATE_LOADED:SC.IMAGE_STATE_FAILED);
this.displayDidChange()}}});SC.ImageView.valueIsUrl=function(a){return a?a.indexOf("/")>=0:NO
};sc_require("views/view");sc_require("mixins/control");SC.ALIGN_LEFT="left";SC.ALIGN_RIGHT="right";
SC.ALIGN_CENTER="center";SC.REGULAR_WEIGHT="normal";SC.BOLD_WEIGHT="bold";SC.LabelView=SC.View.extend(SC.Control,{classNames:["sc-label-view"],fontWeight:SC.REGULAR_WEIGHT,escapeHTML:true,escapeHTMLBindingDefault:SC.Binding.oneWay().bool(),localize:false,localizeBindingDefault:SC.Binding.oneWay().bool(),formatter:null,value:"",hint:null,exampleInlineTextFieldView:SC.InlineTextFieldView,icon:null,textAlign:SC.ALIGN_LEFT,isInlineEditorMultiline:NO,displayValue:function(){var g=this.get("value");
var e=this.getDelegateProperty("formatter",this.displayDelegate);if(e){var f=(SC.typeOf(e)===SC.T_FUNCTION)?e(g,this):e.fieldValueForObject(g,this);
if(!SC.none(f)){g=f}}if(SC.typeOf(g)===SC.T_ARRAY){var c=[];for(var b=0;b<g.get("length");
b++){var a=g.objectAt(b);if(!SC.none(a)&&a.toString){a=a.toString()}c.push(a)}g=c.join(",")
}if(!SC.none(g)&&g.toString){g=g.toString()}if(g&&this.getDelegateProperty("localize",this.displayDelegate)){g=g.loc()
}if(this.get("escapeHTML")){g=SC.RenderContext.escapeHTML(g)}return g}.property("value","localize","formatter","escapeHTML").cacheable(),isEditable:NO,isEditableBindingDefault:SC.Binding.bool(),isEditing:NO,validator:null,doubleClick:function(a){return this.beginEditing()
},beginEditing:function(){if(this.get("isEditing")){return YES}if(!this.get("isEditable")){return NO
}var b=this.$();var e=this.get("value")||"";var c=SC.viewportOffset(b[0]);var a=this.convertFrameFromView(this.get("frame"),null);
c.width=a.width;c.height=a.height;SC.InlineTextFieldView.beginEditing({frame:c,delegate:this,exampleElement:b,value:e,multiline:this.get("isInlineEditorMultiline"),isCollection:NO,validator:this.get("validator"),exampleInlineTextFieldView:this.get("exampleInlineTextFieldView")})
},discardEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.discardEditing()
},commitEditing:function(){if(!this.get("isEditing")){return YES}return SC.InlineTextFieldView.commitEditing()
},inlineEditorWillBeginEditing:function(a){this.set("isEditing",YES)},inlineEditorDidBeginEditing:function(a){this._oldOpacity=this.$().css("opacity");
this.$().css("opacity",0)},inlineEditorShouldEndEditing:function(a,b){return YES},inlineEditorDidEndEditing:function(a,b){this.setIfChanged("value",b);
this.$().css("opacity",this._oldOpacity);this._oldOpacity=null;this.set("isEditing",NO)
},displayProperties:"displayValue textAlign fontWeight icon".w(),_TEMPORARY_CLASS_HASH:{},render:function(c,i){var g=this.get("displayValue"),f=this.get("icon"),h=this.get("hint");
if(f){var a=(f.indexOf("/")>=0)?f:SC.BLANK_IMAGE_URL;var e=(a===f)?"":f;f='<img src="%@" alt="" class="icon %@" />'.fmt(a,e);
c.push(f)}if(h&&(!g||g==="")){c.push('<span class="sc-hint">',h,"</span>")}else{c.push(g)
}c.addStyle("text-align",this.get("textAlign")).addStyle("font-weight",this.get("fontWeight"));
var b=this._TEMPORARY_CLASS_HASH;b.icon=!!this.get("icon");c.setClass(b);if(this.get("isEditing")){c.addStyle("opacity",0)
}}});sc_require("views/field");sc_require("system/text_selection");sc_require("mixins/static_layout");
SC.TextFieldView=SC.FieldView.extend(SC.StaticLayout,SC.Editable,{tagName:"label",classNames:["sc-text-field-view"],isPassword:NO,isTextArea:NO,hint:null,isEditing:NO,leftAccessoryView:null,rightAccessoryView:null,_isFocused:NO,isEditable:function(){return this.get("isEnabled")
}.property("isEnabled").cacheable(),selection:function(m,k){var e=this.$input().get(0);
var f,a,c;if(k===undefined){if(e){a=null;c=null;if(!e.value){a=c=0}else{if("selectionStart" in e){a=e.selectionStart
}if("selectionEnd" in e){c=e.selectionEnd}if(a===null||c===null){var l=document.selection;
if(l){var j=l.type;if(j&&(j==="None"||j==="Text")){f=l.createRange();if(!this.get("isTextArea")){var b=f.text.length;
a=Math.abs(f.moveStart("character",0-(e.value.length+1)));c=a+b}else{var i=f.duplicate();
i.moveToElementText(e);i.setEndPoint("EndToStart",f);a=i.text.length;c=a+f.text.length
}}}}}return SC.TextSelection.create({start:a,end:c})}else{return null}}else{if(!k||!k.kindOf||!k.kindOf(SC.TextSelection)){throw"When setting the selection, you must specify an SC.TextSelection instance."
}if(e){var h,g;if("selectionStart" in e){e.selectionStart=k.get("start");h=YES}if("selectionEnd" in e){e.selectionEnd=k.get("end");
g=YES}if(!h||!g){f=e.createTextRange();a=k.get("start");f.move("character",a);f.moveEnd("character",k.get("end")-a);
f.select()}}}}.property("fieldValue").cacheable(),displayProperties:"hint fieldValue isEditing leftAccessoryView rightAccessoryView isTextArea".w(),createChildViews:function(){this.accessoryViewObserver()
},accessoryViewObserver:function(){var g;var j=["leftAccessoryView","rightAccessoryView"];
var a=j.length;for(var b=0;b<a;b++){var f=j[b];var e=this["_"+f];var h=this.get(f);
if(!(e&&h&&(e===h))){if(e){g=e.get("classNames");g=g.without("sc-text-field-accessory-view");
e.set("classNames",g);this.removeChild(e);e=null;this["_"+f]=null}if(h){if(h.isClass){h=h.create({layoutView:this})
}g=h.get("classNames");var c="sc-text-field-accessory-view";if(g.indexOf(c)<0){g.push(c)
}this.appendChild(h);this["_"+f]=h}}}}.observes("leftAccessoryView","rightAccessoryView"),layoutChildViewsIfNeeded:function(a){if(!a){a=this.get("isVisibleInWindow")
}if(a&&this.get("childViewsNeedLayout")){var b=this.get("rightAccessoryView");if(b&&b.get){var c=b.get("layout");
if(c){c.left=null;if(!c.right){c.right=0}b.adjust({layout:c})}}}arguments.callee.base.apply(this,arguments)
},render:function(c,a){arguments.callee.base.apply(this,arguments);var f=this.get("isEnabled")?"":'disabled="disabled"';
var b=SC.guidFor(this);var i=this.get("isPassword")?"password":"text";if(this.get("isTextArea")){c.addClass("text-area")
}var j=this.get("fieldValue");if(SC.none(j)){j=""}c.setClass("not-empty",j.length>0);
var h=this._getAccessoryViewWidths();var e=h.left;var g=h.right;if(e){e+="px"}if(g){g+="px"
}this._renderField(c,a,j,e,g);if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}},_forceRenderFirstTime:NO,_renderFieldLikeFirstTime:function(){this.set("_forceRenderFirstTime",YES)
}.observes("isTextArea"),_renderField:function(c,a,m,e,j){var g=this.get("hint");
if(a||this._forceRenderFirstTime){this._forceRenderFirstTime=NO;var h=this.get("isEnabled")?"":'disabled="disabled"';
var b=this.get("layerId");c.push('<span class="border"></span>');var n="";if(e||j){n='style="';
if(e){n+="left: "+e+"; "}if(j){n+="right: "+j+";"}n+='"'}c.push('<span class="padding" %@>'.fmt(n));
c.push('<span class="sc-hint">',g,"</span>");if(this.get("isTextArea")){c.push('<textarea name="%@" %@>%@</textarea></span>'.fmt(b,h,m))
}else{var k=this.get("isPassword")?"password":"text";c.push('<input type="%@" name="%@" %@ value="%@"/></span>'.fmt(k,b,h,m))
}}else{var l=this.$(".sc-hint");if(g!==this._textField_currentHint){this._textField_currentHint=g;
l.text(g)}var i=this.$input()[0];if(i){if(!this.get("isEnabled")){i.disabled="true"
}else{i.disabled=null}var f=i.parentNode;if(e){if(f.style.left!==e){f.style.left=e
}}else{f.style.left=null}if(j){if(f.style.right!==j){f.style.right=j}}else{f.style.right=null
}}}},_getAccessoryViewWidths:function(){var c={};var k=["left","right"];var e=k.length;
for(var g=0;g<e;g++){var h=k[g];var l=this.get(h+"AccessoryView");if(l&&l.get){var b=l.get("frame");
if(b){var a=b.width;if(a){var j=l.get("layout");if(j){var f=j[h];a+=f}c[h]=a}}}}return c
},didCreateLayer:function(){arguments.callee.base.apply(this,arguments);var a=this.$input();
SC.Event.add(a,"focus",this,this._textField_fieldDidFocus);SC.Event.add(a,"blur",this,this._textField_fieldDidBlur);
SC.Event.add(a,"select",this,this._textField_selectionDidChange);if(SC.browser.mozilla){this._cacheInputElement=this.$input();
this._cachePaddingElement=this.$(".padding")}},willDestroyLayer:function(){arguments.callee.base.apply(this,arguments);
var a=this.$input();SC.Event.remove(a,"focus",this,this._textField_fieldDidFocus);
SC.Event.remove(a,"blur",this,this._textField_fieldDidBlur);SC.Event.remove(a,"select",this,this._textField_selectionDidChange)
},_textField_fieldDidFocus:function(a){SC.RunLoop.begin();this.fieldDidFocus();SC.RunLoop.end()
},_textField_fieldDidBlur:function(a){SC.RunLoop.begin();this.fieldDidBlur();SC.RunLoop.end()
},fieldDidFocus:function(a){this.beginEditing()},fieldDidBlur:function(){this.commitEditing()
},_topOffsetForFirefoxCursorFix:3,_applyFirefoxCursorFix:function(){if(SC.browser.mozilla){var i,e,c,j,b,h,f,g;
f=this._cacheInputElement;g=this._cachePaddingElement;if(g&&g[0]){h=g[0];b=SC.$(h).offset();
if(f[0].tagName.toLowerCase()==="input"){i=b.top+this._topOffsetForFirefoxCursorFix
}else{i=b.top}e=b.left;c=h.offsetWidth;j=h.offsetHeight;var a="position: fixed; top: %@px; left: %@px; width: %@px; height: %@px;".fmt(i,e,c,j);
if(!this._prevStyle||this._prevStyle!=a){f.attr("style",a)}this._prevStyle=a}}return this
},_textField_selectionDidChange:function(){this.notifyPropertyChange("selection")
},willBecomeKeyResponderFrom:function(a){if(this.get("isVisibleInWindow")){this.$input()[0].focus();
if(!this._txtFieldMouseDown){if(SC.browser.mozilla){this.invokeOnce(this._selectRootElement)
}else{if(SC.browser.safari){this.invokeLater(this._selectRootElement,1)}else{this._selectRootElement()
}}}}},willLoseKeyResponderTo:function(a){},_selectRootElement:function(){this.$input()[0].select()
},didLoseKeyResponderTo:function(a){this.$input()[0].blur()},parentViewDidResize:function(){if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}arguments.callee.base.apply(this,arguments)},keyDown:function(b){if((b.which===13)&&!this.get("isTextArea")){return NO
}if(b.which===27){return NO}if(b.which===9&&!this.get("isTextArea")){var a=b.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
a.becomeFirstResponder();return YES}if(b.which===8){b.dontForceDeleteKey=YES}if(this.performValidateKeyDown(b)){this._isKeyDown=YES;
b.allowDefault()}else{b.stop()}return YES},keyUp:function(a){this.notifyPropertyChange("selection");
if(this._isKeyDown){this.invokeLater(this.fieldValueDidChange,1,YES)}this._isKeyDown=NO;
a.allowDefault();return YES},mouseDown:function(a){this._txtFieldMouseDown=YES;if(!this.get("isEnabled")){a.stop();
return YES}else{if((this.value&&this.value.length===0)||!this.value){return YES}else{if(SC.browser.mozilla){this.$input()[0].focus()
}return arguments.callee.base.apply(this,arguments)}}},mouseUp:function(a){this._txtFieldMouseDown=NO;
this.notifyPropertyChange("selection");if(!this.get("isEnabled")){a.stop();return YES
}else{if((this.value&&this.value.length===0)||!this.value){this.$input()[0].focus();
return YES}else{return arguments.callee.base.apply(this,arguments)}}},selectStart:function(a){return YES
}});sc_require("panes/pane");SC.MainPane=SC.Pane.extend({layout:{left:0,right:0,top:0,bottom:0},paneDidAttach:function(){var b=arguments.callee.base.apply(this,arguments);
var a=this.rootResponder;a.makeMainPane(this);if(!a.get("keyRootView")){a.makeKeyPane(this)
}return b},acceptsKeyPane:YES,classNames:["sc-main"]});tiki.script("sproutcore/foundation:en/668e188bd44c10fb9ca18d37e89878e7aac1402d/javascript.js");
tiki.register("sproutcore/desktop",{depends:["sproutcore/runtime","sproutcore/datastore","sproutcore/foundation"],packages:{"sproutcore/runtime":{},"sproutcore/foundation":{},"sproutcore/datastore":{}},scripts:[{url:"/static/sproutcore/desktop/en/0a67032b44fccf8f11160e96135230830ba8b945/javascript.js",id:"sproutcore/desktop:en/0a67032b44fccf8f11160e96135230830ba8b945/javascript.js"}]});
tiki.global("sproutcore/desktop");SC.stringsFor("English",{"Invalid.CreditCard(%@)":"%@ is not a valid credit card number","Invalid.Email(%@)":"%@ is not a valid email address","Invalid.NotEmpty(%@)":"%@ must not be empty","Invalid.Password":"Your passwords do not match.  Please try typing them again.","Invalid.General(%@)":"%@ is invalid.  Please try again.","Invalid.Number(%@)":"%@ is not a number."});
SC.allowsBackspaceToPreviousPage=NO;SC.BORDER_BEZEL="sc-bezel-border";SC.BORDER_BLACK="sc-black-border";
SC.BORDER_GRAY="sc-gray-border";SC.BORDER_TOP="sc-top-border";SC.BORDER_BOTTOM="sc-bottom-border";
SC.BORDER_NONE=null;SC.Border={borderStyle:SC.BORDER_GRAY,_BORDER_REGEXP:(/-border$/),renderMixin:function(a,c){var b=this.get("borderStyle");
if(b){if(this._BORDER_REGEXP.exec(b)){a.addClass(b)}else{content.addStyle("border","1px %@ solid".fmt(b))
}}}};SC.Scrollable={isScrollable:true,verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("innerFrame").height
}.property("innerFrame"),horizontalPageScroll:function(){return this.get("innerFrame").width
}.property("innerFrame"),hasVerticalScroller:function(){return this.get("scrollFrame").height>this.get("innerFrame").height
}.property("scrollFrame"),hasHorizontalScroller:function(){return this.get("scrollFrame").width>this.get("innerFrame").width
}.property("scrollFrame"),scrollBy:function(a){var b=this.get("scrollFrame");var c=this.get("innerFrame");
if(!this.get("hasVerticalScroller")){a.y=0}if(b.height<=c.height){a.y=0}if(!this.get("hasHorizontalScroller")){a.x=0
}if(b.width<=c.width){a.x=0}var e={x:b.x-(a.x||0),y:b.y-(a.y||0)};this.set("scrollFrame",e);
e=this.get("scrollFrame");return{x:e.x-b.x,y:e.y-b.y}},scrollTo:function(a,b){this.set("scrollFrame",{x:0-a,y:0-b})
},scrollToVisible:function(b){var g=this.get("innerFrame");var e=this.get("scrollFrame");
var a=this.convertFrameFromView(b.get("frame"),b);a.x-=(g.x+e.x);a.y-=(g.y+e.y);var c={x:0-e.x,y:0-e.y,width:g.width,height:g.height};
c.y-=Math.max(0,SC.minY(c)-SC.minY(a));c.x-=Math.max(0,SC.minX(c)-SC.minX(a));c.y+=Math.max(0,SC.maxY(a)-SC.maxY(c));
c.x+=Math.max(0,SC.maxX(a)-SC.maxX(c));this.scrollTo(c.x,c.y)},scrollDownLine:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalLineScroll")*a}).y},scrollUpLine:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalLineScroll")*a}).y},scrollRightLine:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalLineScroll")*a}).x},scrollLeftLine:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalLineScroll")*a}).x},scrollDownPage:function(a){if(a===undefined){a=1
}return this.scrollBy({y:this.get("verticalPageScroll")*a}).y},scrollUpPage:function(a){if(a===undefined){a=1
}return 0-this.scrollBy({y:0-this.get("verticalPageScroll")*a}).y},scrollRightPage:function(a){if(a===undefined){a=1
}return this.scrollTo({y:this.get("horizontalPageScroll")*a}).x},scrollLeftPage:function(a){if(a===undefined){a=1
}return 0-this.scrollTo({y:0-this.get("horizontalPageScroll")*a}).x}};SC.DRAG_LINK=4;
SC.DRAG_COPY=1;SC.DRAG_MOVE=2;SC.DRAG_NONE=0;SC.DRAG_ANY=7;SC.DRAG_AUTOSCROLL_ZONE_THICKNESS=20;
SC.Drag=SC.Object.extend({source:null,ghostView:null,ghostActsLikeCursor:NO,dragView:null,ghost:YES,slideBack:YES,mouseDownEvent:null,ghostOffset:{x:0,y:0},location:{},dataTypes:function(){if(this.dataSource){return this.dataSource.get("dragDataTypes")||[]
}var e=this.data;if(e){var a=[];for(var b in e){if(e.hasOwnProperty(b)){a.push(b)
}}return a}var c=this.get("source");if(c&&c.dragDataTypes){return c.get("dragDataTypes")||[]
}return[]}.property().cacheable(),hasDataType:function(a){return(this.get("dataTypes").indexOf(a)>=0)
},dataForType:function(a){if(this.dataSource){return this.dataSource.dragDataForType(this,a)
}else{if(this.data){return this.data[a]}else{var b=this.get("source");if(b&&SC.typeOf(b.dragDataForType)==SC.T_FUNCTION){return b.dragDataForType(this,a)
}else{return null}}}},dataSource:null,data:null,allowedDragOperations:SC.DRAG_ANY,_dragInProgress:YES,startDrag:function(){this._createGhostView();
var o=this.event;var i={x:o.pageX,y:o.pageY};this.set("location",i);var b=this.dragView;
var e=b.get("pane");var p=b.get("parentView");var l=b.get("clippingFrame");var j=p?p.convertFrameToView(b.get("frame"),null):b.get("frame");
var k=e?e.get("frame"):{x:0,y:0};b.adjust({top:j.y+k.y,left:j.x+k.x,width:j.width,height:j.height});
var g=b.get("frame");var n=j;if(this.ghostActsLikeCursor){this.ghostOffset={x:14,y:14}
}else{this.ghostOffset={x:(i.x-n.x),y:(i.y-n.y)}}if(!this._ghostViewHidden){this._positionGhostView(o)
}this.ghostView.rootResponder.dragDidStart(this);var a=this.source;if(a&&a.dragDidBegin){a.dragDidBegin(this,i)
}var c=this._dropTargets();for(var m=0,h=c.length;m<h;m++){c[m].tryToPerform("dragStarted",this,o)
}},mouseDragged:function(a){var b=this._autoscroll(a);var g=this.get("location");
if(!b&&(a.pageX==g.x)&&(a.pageY==g.y)){return}g={x:a.pageX,y:a.pageY};this.set("location",g);
var e=this.source;var c=this._lastTarget;var f=this._findDropTarget(a);var h=SC.DRAG_NONE;
while(f&&(f!=c)&&(h==SC.DRAG_NONE)){if(f&&e&&e.dragSourceOperationMaskFor){h=e.dragSourceOperationMaskFor(this,f)
}else{h=SC.DRAG_ANY}if((h!=SC.DRAG_NONE)&&f&&f.computeDragOperations){h=h&f.computeDragOperations(this,a,h)
}else{h=SC.DRAG_NONE}this.allowedDragOperations=h;if(h==SC.DRAG_NONE){f=this._findNextDropTarget(f)
}}if(f!=c){if(c&&c.dragExited){c.dragExited(this,a)}if(f){if(f.dragEntered){f.dragEntered(this,a)
}if(f.dragUpdated){f.dragUpdated(this,a)}}this._lastTarget=f}else{if(f&&f.dragUpdated){f.dragUpdated(this,a)
}}if(e&&e.dragDidMove){e.dragDidMove(this,g)}if(!this._ghostViewHidden){this._positionGhostView(a)
}},mouseUp:function(m){var h={x:m.pageX,y:m.pageY},i=this._lastTarget,f=this.allowedDragOperations;
this.set("location",h);try{if(i&&i.acceptDragOperation&&i.acceptDragOperation(this,f)){f=i.performDragOperation?i.performDragOperation(this,f):SC.DRAG_NONE
}else{f=SC.DRAG_NONE}}catch(j){console.error("Exception in SC.Drag.mouseUp(acceptDragOperation|performDragOperation): %@".fmt(j))
}try{if(i&&i.dragExited){i.dragExited(this,m)}}catch(k){console.error("Exception in SC.Drag.mouseUp(target.dragExited): %@".fmt(k))
}var c=this._dropTargets();for(var l=0,g=c.length;l<g;l++){try{c[l].tryToPerform("dragEnded",this,m)
}catch(b){console.error("Exception in SC.Drag.mouseUp(dragEnded on %@): %@".fmt(c[l],b))
}}this._destroyGhostView();var a=this.source;if(a&&a.dragDidEnd){a.dragDidEnd(this,h,f)
}this._lastTarget=null;this._dragInProgress=NO},_createGhostView:function(){var b=this,c=this.dragView.get("frame"),a;
a=this.ghostView=SC.Pane.create({classNames:["sc-ghost-view"],layout:{top:c.y,left:c.x,width:c.width,height:c.height},owner:this,didCreateLayer:function(){if(b.dragView){var e=b.dragView.get("layer");
if(e){this.get("layer").appendChild(e.cloneNode(true))}}}});a.append()},_positionGhostView:function(a){var c=this.get("location");
c.x-=this.ghostOffset.x;c.y-=this.ghostOffset.y;var b=this.ghostView;if(b){b.adjust({top:c.y,left:c.x});
b.invokeOnce("updateLayout")}},_ghostViewHidden:NO,hideGhostView:function(){if(this.ghostView&&!this._ghostViewHidden){this.ghostView.remove();
this._ghostViewHidden=YES}},unhideGhostView:function(){if(this._ghostViewHidden){this._ghostViewHidden=NO;
this._createGhostView()}},_destroyGhostView:function(){if(this.ghostView){this.ghostView.remove();
this.ghostView=null;this._ghostViewHidden=NO}},_dropTargets:function(){if(this._cachedDropTargets){return this._cachedDropTargets
}var b=[];var e=SC.Drag._dropTargets;for(var c in e){if(e.hasOwnProperty(c)){b.push(e[c])
}}var g={};var f=SC.Drag._dropTargets;var a=function(h){if(!h){return 0}var j=SC.guidFor(h);
var i=g[j];if(!i){i=1;while(h=h.get("parentView")){if(f[SC.guidFor(h)]!==undefined){i++
}}g[j]=i}return i};b.sort(function(i,h){if(i===h){return 0}i=a(i);h=a(h);return(i>h)?-1:1
});this._cachedDropTargets=b;return b},_findDropTarget:function(c){var h={x:c.pageX,y:c.pageY};
var f,g;var e=this._dropTargets();for(var b=0,a=e.length;b<a;b++){f=e[b];if(!f.get("isVisibleInWindow")){continue
}g=f.convertFrameToView(f.get("clippingFrame"),null);if(SC.pointInRect(h,g)){return f
}}return null},_findNextDropTarget:function(a){var b=SC.Drag._dropTargets;while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a
}}return null},_autoscroll:function(m){if(!m){m=this._lastAutoscrollEvent}if(!this._dragInProgress){return NO
}var h=m?{x:m.pageX,y:m.pageY}:this.get("location"),i=this._findScrollableView(h),n=null,l,c,e,j,b,a,g;
while(i&&!n){l=i.get("canScrollVertical")?1:0;c=i.get("canScrollHorizontal")?1:0;
if(l||c){a=i.get("containerView");if(a){g=i.convertFrameToView(a.get("frame"),null)
}else{l=c=0}}if(l){j=SC.maxY(g);e=j-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.y>=e&&h.y<=j){l=1
}else{e=SC.minY(g);j=e+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.y>=e&&h.y<=j){l=-1}else{l=0
}}}if(c){j=SC.maxX(g);e=j-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.x>=e&&h.x<=j){c=1
}else{e=SC.minX(g);j=e+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(h.x>=e&&h.x<=j){c=-1}else{c=0
}}}if(l||c){n=i}else{i=this._findNextScrollableView(i)}}if(n&&(this._lastScrollableView===n)){if((Date.now()-this._hotzoneStartTime)>100){this._horizontalScrollAmount*=1.05;
this._verticalScrollAmount*=1.05}}else{this._lastScrollableView=n;this._horizontalScrollAmount=15;
this._verticalScrollAmount=15;this._hotzoneStartTime=(n)?Date.now():null;c=l=0}if(n&&(c||l)){var k={x:c*this._horizontalScrollAmount,y:l*this._verticalScrollAmount};
n.scrollBy(k)}if(n){if(m){this._lastAutoscrollEvent={pageX:m.pageX,pageY:m.pageY}
}this.invokeLater(this._autoscroll,100,null);return YES}else{this._lastAutoscrollEvent=null;
return NO}},_scrollableViews:function(){if(this._cachedScrollableView){return this._cachedScrollableView
}var a=[];var c=SC.Drag._scrollableViews;for(var b in c){if(c.hasOwnProperty(b)){a.push(c[b])
}}a=a.sort(function(g,e){var f=g;while(f=f.get("parentView")){if(e==f){return -1}}return 1
});this._cachedScrollableView=a;return a},_findScrollableView:function(g){var c=this._scrollableViews(),b=c?c.length:0,e,f,a;
for(a=0;a<b;a++){e=c[a];if(!e.get("isVisibleInWindow")){continue}f=e.convertFrameToView(e.get("clippingFrame"),null);
if(SC.pointInRect(g,f)){return e}}return null},_findNextScrollableView:function(a){var b=SC.Drag._scrollableViews;
while(a=a.get("parentView")){if(b[SC.guidFor(a)]){return a}}return null}});SC.Drag.mixin({start:function(b){var a=this.create(b);
a.startDrag();return a},_dropTargets:{},_scrollableViews:{},addDropTarget:function(a){this._dropTargets[SC.guidFor(a)]=a
},removeDropTarget:function(a){delete this._dropTargets[SC.guidFor(a)]},addScrollableView:function(a){this._scrollableViews[SC.guidFor(a)]=a
},removeScrollableView:function(a){delete this._scrollableViews[SC.guidFor(a)]}});
SC.MODIFIED_KEY_BINDINGS={"ctrl_.":"cancel",shift_tab:"insertBacktab",shift_left:"moveLeftAndModifySelection",shift_right:"moveRightAndModifySelection",shift_up:"moveUpAndModifySelection",shift_down:"moveDownAndModifySelection",alt_left:"moveLeftAndModifySelection",alt_right:"moveRightAndModifySelection",alt_up:"moveUpAndModifySelection",alt_down:"moveDownAndModifySelection",ctrl_a:"selectAll"};
SC.BASE_KEY_BINDINGS={escape:"cancel",backspace:"deleteBackward","delete":"deleteForward","return":"insertNewline",tab:"insertTab",left:"moveLeft",right:"moveRight",up:"moveUp",down:"moveDown",home:"moveToBeginningOfDocument",end:"moveToEndOfDocument",pagedown:"pageDown",pageup:"pageUp"};
SC.CAPTURE_BACKSPACE_KEY=NO;SC.PANEL_ORDER_LAYER=4096;SC.PALETTE_ORDER_LAYER=8192;
SC.POPUP_ORDER_LAYER=12288;SC.RootResponder=SC.RootResponder.extend({platform:"desktop",focusedPane:function(){var a=this.get("orderedPanes");
return a[a.length-1]}.property("orderedPanes"),orderedPanes:null,orderBefore:function(c,h){var a=this.get("focusedPane"),i=this.get("orderedPanes").without(c),g,j,e,f;
var b=c.get("orderLayer");if(h){g=i.length;j=i.indexOf(h);e=h.get("orderLayer");if(e<b){while((h.get("orderLayer")<b)&&(++j<g)){h=i[j]
}if(j>=g){h=null}}else{if(e>b){while((h.get("orderLayer")>b)&&(--j>=0)){h=i[j]}h=(j<0)?i[0]:i[j+1]
}}}else{j=i.length;while((--j>=0)&&!h){h=i[j];if(h.get("orderLayer")>b){h=null}}if(j<0){h=i[0]
}else{h=i[j+1]}}if(h){j=i.indexOf(h);i.insertAt(j,c)}else{i.push(c)}this.set("orderedPanes",i);
f=this.get("focusedPane");if(f!==a){if(a){a.blurTo(f)}if(f){f.focusFrom(a)}}return this
},orderOut:function(f){var e=this.get("focusedPane"),c=this.get("keyPane");var b=this.get("orderedPanes").without(f);
this.set("orderedPanes",b);if(e===f){var a=this.get("focusedPane");if(e){e.blurTo(a)
}if(a){a.focusFrom(e)}if(c===f){this.makeKeyPane(a)}}else{if(c===f){this.makeKeyPane(null)
}}return this},init:function(){arguments.callee.base.apply(this,arguments);this.orderedPanes=[]
},setup:function(){this.listenFor("keydown keyup mousedown mouseup click dblclick mouseout mouseover mousemove selectstart".w(),document).listenFor("resize focus blur".w(),window);
if(this.keypress){if(SC.CAPTURE_BACKSPACE_KEY&&SC.browser.mozilla){var b=this;document.onkeypress=function(c){c=SC.Event.normalizeEvent(c);
return b.keypress.call(b,c)};SC.Event.add(window,"unload",this,function(){document.onkeypress=null
})}else{SC.Event.add(document,"keypress",this,this.keypress)}}"drag selectstart".w().forEach(function(e){var f=this[e];
if(f){if(SC.browser.msie){var c=this;document.body["on"+e]=function(g){return f.call(c,SC.Event.normalizeEvent(event||window.event))
};SC.Event.add(window,"unload",this,function(){document.body["on"+e]=null})}else{SC.Event.add(document,e,this,f)
}}},this);var a=SC.browser.mozilla?"DOMMouseScroll":"mousewheel";SC.Event.add(document,a,this,this.mousewheel);
this.set("currentWindowSize",this.computeWindowSize());this.focus()},attemptKeyEquivalent:function(b){var f=null;
var e=b.commandCodes()[0];if(!e){return NO}var a=this.get("keyPane"),g=this.get("mainPane"),c=this.get("mainMenu");
if(a){f=a.performKeyEquivalent(e,b)}if(!f&&g&&(g!==a)){f=g.performKeyEquivalent(e,b)
}if(!f&&c){f=c.performKeyEquivalent(e,b)}return f},currentWindowSize:null,computeWindowSize:function(){var a;
if(window.innerHeight){a={width:window.innerWidth,height:window.innerHeight}}else{if(document.documentElement&&document.documentElement.clientHeight){a={width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}
}else{if(document.body){a={width:document.body.clientWidth,height:document.body.clientHeight}
}}}return a},resize:function(){this._resize();return YES},_resize:function(){var a=this.computeWindowSize(),b=this.get("currentWindowSize");
this.set("currentWindowSize",a);if(!SC.rectsEqual(a,b)){if(this.panes){SC.RunLoop.begin();
this.panes.invoke("windowSizeDidChange",b,a);SC.RunLoop.end()}}},hasFocus:NO,focus:function(){if(!this.get("hasFocus")){SC.$("body").addClass("sc-focus").removeClass("sc-blur");
SC.RunLoop.begin();this.set("hasFocus",YES);SC.RunLoop.end()}return YES},blur:function(){if(this.get("hasFocus")){SC.$("body").addClass("sc-blur").removeClass("sc-focus");
SC.RunLoop.begin();this.set("hasFocus",NO);SC.RunLoop.end()}return YES},dragDidStart:function(a){this._mouseDownView=a;
this._drag=a},_lastModifiers:null,_handleModifierChanges:function(b){var a;a=this._lastModifiers=(this._lastModifiers||{alt:false,ctrl:false,shift:false});
var c=false;if(b.altKey!==a.alt){a.alt=b.altKey;c=true}if(b.ctrlKey!==a.ctrl){a.ctrl=b.ctrlKey;
c=true}if(b.shiftKey!==a.shift){a.shift=b.shiftKey;c=true}b.modifiers=a;return(c)?(this.sendEvent("flagsChanged",b)?b.hasCustomEventHandling:YES):YES
},_isFunctionOrNonPrintableKey:function(a){return !!(a.altKey||a.ctrlKey||a.metaKey||((a.charCode!==a.which)&&SC.FUNCTION_KEYS[a.which]))
},_isModifierKey:function(a){return !!SC.MODIFIER_KEYS[a.charCode]},keydown:function(a){if(!a.kindOf){this._ffevt=null
}else{a=this._ffevt}if(SC.none(a)){return YES}if(SC.browser.mozilla&&(a.which===8)){return true
}var b=this._handleModifierChanges(a),e=a.target||a.srcElement,c=(a.which===8)&&!SC.allowsBackspaceToPreviousPage&&(e===document.body);
if(this._isModifierKey(a)){return(c?NO:b)}b=YES;if(this._isFunctionOrNonPrintableKey(a)){if(SC.browser.mozilla&&a.keyCode>=37&&a.keyCode<=40){this._ffevt=a;
SC.RunLoop.begin();this.invokeLater(this.keydown,100);SC.RunLoop.end()}b=this.sendEvent("keyDown",a);
if(!b){b=!this.attemptKeyEquivalent(a)}else{b=a.hasCustomEventHandling;if(b){c=NO
}}}return c?NO:b},keypress:function(a){var b;if(SC.browser.mozilla&&(a.which===8)){b=this.sendEvent("keyDown",a);
return b?(SC.allowsBackspaceToPreviousPage||a.hasCustomEventHandling):YES}else{if(a.charCode!==undefined&&a.charCode===0){return YES
}return this.sendEvent("keyDown",a)?a.hasCustomEventHandling:YES}},keyup:function(a){if(this._ffevt){this._ffevt=null
}var b=this._handleModifierChanges(a);if(this._isModifierKey(a)){return b}return this.sendEvent("keyUp",a)?a.hasCustomEventHandling:YES
},mousedown:function(c){try{this.focus();if(SC.browser.msie){this._lastMouseDownX=c.clientX;
this._lastMouseDownY=c.clientY}this._clickCount+=1;if(!this._lastMouseUpAt||((Date.now()-this._lastMouseUpAt)>200)){this._clickCount=1
}c.clickCount=this._clickCount;var b,a=this.targetViewForEvent(c);if(a){b=a.get("pane").get("firstResponder")
}if(b&&b.kindOf(SC.InlineTextFieldView)&&b!==a){b.resignFirstResponder()}a=this._mouseDownView=this.sendEvent("mouseDown",c,a);
if(a&&a.respondsTo("mouseDragged")){this._mouseCanDrag=YES}}catch(f){console.warn("Exception during mousedown: %@".fmt(f));
this._mouseDownView=null;this._mouseCanDrag=NO;throw f}return a?c.hasCustomEventHandling:YES
},mouseup:function(b){try{if(this._drag){this._drag.tryToPerform("mouseUp",b);this._drag=null
}var c=null,a=this._mouseDownView;this._lastMouseUpAt=Date.now();b.clickCount=this._clickCount;
if(a){c=this.sendEvent("mouseUp",b,a);if(!c&&(this._clickCount===2)){c=this.sendEvent("doubleClick",b,a)
}if(!c){c=this.sendEvent("click",b,a)}}if(!c){a=this.targetViewForEvent(b);if(this._clickCount===2){c=this.sendEvent("doubleClick",b,a)
}if(!c){c=this.sendEvent("click",b,a)}}this._mouseCanDrag=NO;this._mouseDownView=null
}catch(f){this._drag=null;this._mouseCanDrag=NO;this._mouseDownView=null;throw f}return(c)?b.hasCustomEventHandling:YES
},dblclick:function(a){if(SC.browser.isIE){this._clickCount=2;this.mouseup(a)}},mousewheel:function(b){try{var a=this.targetViewForEvent(b),c=this.sendEvent("mouseWheel",b,a)
}catch(f){throw f}return(c)?b.hasCustomEventHandling:YES},_lastHovered:null,mousemove:function(f){if(SC.browser.msie){if(this._lastMoveX===f.clientX&&this._lastMoveY===f.clientY){return
}else{this._lastMoveX=f.clientX;this._lastMoveY=f.clientY}}SC.RunLoop.begin();try{this.focus();
if(this._drag){if(SC.browser.msie){if(this._lastMouseDownX!==f.clientX&&this._lastMouseDownY!==f.clientY){this._drag.tryToPerform("mouseDragged",f)
}}else{this._drag.tryToPerform("mouseDragged",f)}}else{var c=this._lastHovered||[],g=[],j,i,a,b=this.targetViewForEvent(f);
while(b&&(b!==this)){if(c.indexOf(b)!==-1){b.tryToPerform("mouseMoved",f);g.push(b)
}else{b.tryToPerform("mouseEntered",f);g.push(b)}b=b.get("nextResponder")}for(i=0,a=c.length;
i<a;i++){b=c[i];j=b.respondsTo("mouseExited");if(j&&!(g.indexOf(b)!==-1)){b.tryToPerform("mouseExited",f)
}}this._lastHovered=g;if(this._mouseDownView){if(SC.browser.msie){if(this._lastMouseDownX!==f.clientX&&this._lastMouseDownY!==f.clientY){this._mouseDownView.tryToPerform("mouseDragged",f)
}}else{this._mouseDownView.tryToPerform("mouseDragged",f)}}}}catch(h){throw h}SC.RunLoop.end()
},_mouseCanDrag:YES,selectstart:function(b){var a=this.sendEvent("selectStart",b,this.targetViewForEvent(b));
return(a!==null?YES:NO)&&(this._mouseCanDrag?NO:YES)},drag:function(){return false
}});sc_require("core");SC.UndoManager=SC.Object.extend({undoActionName:function(){return this.undoStack?this.undoStack.name:null
}.property("undoStack"),redoActionName:function(){return this.redoStack?this.redoStack.name:null
}.property("redoStack"),canUndo:function(){return this.undoStack!=null}.property("undoStack"),canRedo:function(){return this.redoStack!=null
}.property("redoStack"),undo:function(){this._undoOrRedo("undoStack","isUndoing")
},redo:function(){this._undoOrRedo("redoStack","isRedoing")},isUndoing:false,isRedoing:false,groupingLevel:0,registerUndo:function(b,a){this.beginUndoGroup(a);
this._activeGroup.actions.push(b);this.endUndoGroup(a)},beginUndoGroup:function(b){if(this._activeGroup){this.groupingLevel++
}else{var a=this.isUndoing?"redoStack":"undoStack";this._activeGroup={name:b,actions:[],prev:this.get(a)};
this.set(a,this._activeGroup);this.groupingLevel=1}},endUndoGroup:function(a){if(!this._activeGroup){raise("endUndoGroup() called outside group.")
}if(this.groupingLevel>1){this.groupingLevel--}else{this._activeGroup=null;this.groupingLevel=0
}this.propertyDidChange(this.isUndoing?"redoStack":"undoStack")},setActionName:function(a){if(!this._activeGroup){raise("setActionName() called outside group.")
}this._activeGroup.name=a},_activeGroup:null,undoStack:null,redoStack:null,_undoOrRedo:function(a,c){if(this._activeGroup){return false
}if(this.get(a)==null){return true}this.set(c,true);var f=this.get(a);this.set(a,f.prev);
var b;var e=f.actions.length>1;if(e){this.beginUndoGroup(f.name)}while(b=f.actions.pop()){b()
}if(e){this.endUndoGroup(f.name)}this.set(c,false)}});SC.NATURAL_SCROLLER_THICKNESS=16;
SC.ScrollerView=SC.View.extend({classNames:["sc-scroller-view"],scrollerThickness:SC.NATURAL_SCROLLER_THICKNESS,value:function(a,c){if(c!==undefined){if(c>=0){this._value=c
}}else{var b=this._value||0;return Math.min(b,this.get("maximum"))}}.property("maximum").cacheable(),maximum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,ownerScrollValueKey:function(){var a=null;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a="verticalScrollOffset";
break;case SC.LAYOUT_HORIZONTAL:a="horizontalScrollOffset";break;default:a=null}return a
}.property("layoutDirection").cacheable(),displayProperties:"maximum isEnabled layoutDirection".w(),render:function(b,c){var a=this.get("maximum");
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.addClass("sc-vertical");
if(c){b.push('<div class="sc-inner" style="height: %@px;">&nbsp;</div>'.fmt(a))}else{this.$("div")[0].style.height=a+"px"
}break;case SC.LAYOUT_HORIZONTAL:b.addClass("sc-horizontal");if(c){b.push('<div class="sc-inner" style="width: %@px;">&nbsp;</div>'.fmt(a))
}else{this.$("div")[0].style.width=a+"px"}break;default:throw"You must set a layoutDirection for your scroller class."
}b.setClass("disabled",!this.get("isEnabled"))},didCreateLayer:function(){var c=this._sc_scroller_scrollDidChange;
SC.Event.add(this.$(),"scroll",this,c);var b=this.get("value");var a=this.get("layer");
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:a.scrollTop=b;break;case SC.LAYOUT_HORIZONTAL:a.scrollLeft=b;
break}},willDestroyLayer:function(){var a=this._sc_scroller_scrollDidChange;SC.Event.remove(this.$(),"scroll",this,a)
},_sc_scroller_armScrollTimer:function(){if(!this._sc_scrollTimer){SC.RunLoop.begin();
var a=this._sc_scroller_scrollDidChange;this._sc_scrollTimer=this.invokeLater(a,50);
SC.RunLoop.end()}},_sc_scroller_scrollDidChange:function(){var b=Date.now(),e=this._sc_lastScroll;
if(e&&(b-e)<50){return this._sc_scroller_armScrollTimer()}this._sc_scrollTimer=null;
this._sc_lastScroll=b;SC.RunLoop.begin();if(!this.get("isEnabled")){return}var c=this.get("layer"),a=0;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:this._sc_scrollValue=a=c.scrollTop;
break;case SC.LAYOUT_HORIZONTAL:this._sc_scrollValue=a=c.scrollLeft;break}this.set("value",a);
SC.RunLoop.end()},_sc_scroller_valueDidChange:function(){var a=this.get("value");
if(a!==this._sc_scrollValue){var b=this.get("layer");if(b){switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:b.scrollTop=a;
break;case SC.LAYOUT_HORIZONTAL:b.scrollLeft=a;break}}}}.observes("value")});sc_require("views/scroller");
sc_require("mixins/border");SC.ScrollView=SC.View.extend(SC.Border,{classNames:["sc-scroll-view"],isScrollable:YES,contentView:null,horizontalScrollOffset:0,verticalScrollOffset:0,maximumHorizontalScrollOffset:function(){if(!this.get("canScrollHorizontal")){return 0
}var b=this.get("contentView");var a=b?b.get("frame").width:0;if(b.calculatedWidth&&b.calculatedWidth!==0){a=b.calculatedWidth
}var c=this.get("containerView").get("frame").width;return Math.max(0,a-c)}.property(),maximumVerticalScrollOffset:function(){if(!this.get("canScrollVertical")){return 0
}var a=this.get("contentView");var b=(a&&a.get("frame"))?a.get("frame").height:0;
if(a.calculatedHeight&&a.calculatedHeight!==0){b=a.calculatedHeight}var c=this.get("containerView").get("frame").height;
return Math.max(0,b-c)}.property(),verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("frame").height
}.property("frame"),horizontalPageScroll:function(){return this.get("frame").width
}.property("frame"),hasHorizontalScroller:YES,horizontalScrollerView:SC.ScrollerView,isHorizontalScrollerVisible:YES,canScrollHorizontal:function(){return !!(this.get("hasHorizontalScroller")&&this.get("horizontalScrollerView")&&this.get("isHorizontalScrollerVisible"))
}.property("isHorizontalScrollerVisible").cacheable(),autohidesHorizontalScroller:YES,hasVerticalScroller:YES,verticalScrollerView:SC.ScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:function(){return !!(this.get("hasVerticalScroller")&&this.get("verticalScrollerView")&&this.get("isVerticalScrollerVisible"))
}.property("isVerticalScrollerVisible").cacheable(),autohidesVerticalScroller:YES,verticalScrollerBottom:0,containerView:SC.ContainerView,scrollTo:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}if(!SC.none(a)){a=Math.max(0,Math.min(this.get("maximumHorizontalScrollOffset"),a));
this.set("horizontalScrollOffset",a)}if(!SC.none(b)){b=Math.max(0,Math.min(this.get("maximumVerticalScrollOffset"),b));
this.set("verticalScrollOffset",b)}return this},scrollBy:function(a,b){if(b===undefined&&SC.typeOf(a)===SC.T_HASH){b=a.y;
a=a.x}a=(a)?this.get("horizontalScrollOffset")+a:null;b=(b)?this.get("verticalScrollOffset")+b:null;
return this.scrollTo(a,b)},scrollToVisible:function(b){if(arguments.length===0){return arguments.callee.base.apply(this,arguments)
}var e=this.get("contentView");if(!e){return NO}var a=b.get("frame");if(!a){return NO
}a=e.convertFrameFromView(a,b.get("parentView"));var c=SC.cloneRect(this.get("containerView").get("frame"));
c.x=this.get("horizontalScrollOffset");c.y=this.get("verticalScrollOffset");var g=c.x,f=c.y;
c.y-=Math.max(0,SC.minY(c)-SC.minY(a));c.x-=Math.max(0,SC.minX(c)-SC.minX(a));c.y+=Math.max(0,SC.maxY(a)-SC.maxY(c));
c.x+=Math.max(0,SC.maxX(a)-SC.maxX(c));if((g!==c.x)||(f!==c.y)){this.scrollTo(c.x,c.y);
return YES}else{return NO}},scrollDownLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalLineScroll")*a)
},scrollUpLine:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-this.get("verticalLineScroll")*a)
},scrollRightLine:function(a){if(a===undefined){a=1}return this.scrollTo(this.get("horizontalLineScroll")*a,null)
},scrollLeftLine:function(a){if(a===undefined){a=1}return this.scrollTo(0-this.get("horizontalLineScroll")*a,null)
},scrollDownPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,this.get("verticalPageScroll")*a)
},scrollUpPage:function(a){if(a===undefined){a=1}return this.scrollBy(null,0-(this.get("verticalPageScroll")*a))
},scrollRightPage:function(a){if(a===undefined){a=1}return this.scrollBy(this.get("horizontalPageScroll")*a,null)
},scrollLeftPage:function(a){if(a===undefined){a=1}return this.scrollBy(0-(this.get("horizontalPageScroll")*a),null)
},tile:function(){var a=this.get("hasHorizontalScroller")?this.get("horizontalScrollerView"):null;
var e=a&&this.get("isHorizontalScrollerVisible");var g=this.get("hasVerticalScroller")?this.get("verticalScrollerView"):null;
var c=g&&this.get("isVerticalScrollerVisible");var b=this.get("containerView");var j={left:0,top:0};
var i;var f=((e)?a.get("scrollerThickness"):0);var h=(c)?g.get("scrollerThickness"):0;
if(e){a.set("layout",{left:0,bottom:0,right:h-1,height:f});j.bottom=f-1}else{j.bottom=0
}if(a){a.set("isVisible",e)}if(c){f=f+this.get("verticalScrollerBottom");g.set("layout",{top:0,bottom:f,right:0,width:h});
j.right=h-1}else{j.right=0}if(g){g.set("isVisible",c)}b.set("layout",j)},scrollerVisibilityDidChange:function(){this.tile()
}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible"),_scroll_wheelDeltaX:0,_scroll_wheelDeltaY:0,mouseWheel:function(a){this._scroll_wheelDeltaX+=a.wheelDeltaX;
this._scroll_wheelDeltaY+=a.wheelDeltaY;this.invokeLater(this._scroll_mouseWheel,10);
return this.get("canScrollHorizontal")||this.get("canScrollVertical")},_scroll_mouseWheel:function(){this.scrollBy(this._scroll_wheelDeltaX,this._scroll_wheelDeltaY);
this._scroll_wheelDeltaX=this._scroll_wheelDeltaY=0},createChildViews:function(){var b=[],a;
if(SC.none(a=this.containerView)){a=SC.ContainerView}b.push(this.containerView=this.createChildView(a,{contentView:this.contentView}));
this.contentView=this.containerView.get("contentView");if(a=this.horizontalScrollerView){if(this.get("hasHorizontalScroller")){a=this.horizontalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_HORIZONTAL,valueBinding:"*owner.horizontalScrollOffset"});
b.push(a)}else{this.horizontalScrollerView=null}}if(a=this.verticalScrollerView){if(this.get("hasVerticalScroller")){a=this.verticalScrollerView=this.createChildView(a,{layoutDirection:SC.LAYOUT_VERTICAL,valueBinding:"*owner.verticalScrollOffset"});
b.push(a)}else{this.verticalScrollerView=null}}this.childViews=b;this.contentViewDidChange();
this.tile()},init:function(){arguments.callee.base.apply(this,arguments);this._scroll_contentView=this.get("contentView");
var a=this._scroll_contentView;if(a){a.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewDidChange:function(){var c=this.get("contentView"),a=this._scroll_contentView;
var b=this.contentViewFrameDidChange;if(c!==a){if(a){a.removeObserver("frame",this,b)
}this._scroll_contentView=c;if(c){c.addObserver("frame",this,b)}this.containerView.set("contentView",c);
this.contentViewFrameDidChange()}}.observes("contentView"),oldMaxHOffset:0,oldMaxVOffset:0,contentViewFrameDidChange:function(){var k=this.get("contentView"),j=(k)?k.get("frame"):null,b=(j)?j.width:0,m=(j)?j.height:0,h=this.get("frame");
this._scroll_contentWidth=b;this._scroll_contentHeight=m;if(this.get("hasHorizontalScroller")&&(k=this.get("horizontalScrollerView"))){b-=1;
if(this.get("autohidesHorizontalScroller")){this.set("isHorizontalScrollerVisible",b>h.width)
}k.setIfChanged("maximum",b)}if(this.get("hasVerticalScroller")&&(k=this.get("verticalScrollerView"))){m-=1;
if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",m>h.height)
}m-=this.get("verticalScrollerBottom");k.setIfChanged("maximum",m)}if(!this.get("isVerticalScrollerVisible")&&(this.get("verticalScrollOffset")!==0)&&this.get("autohidesVerticalScroller")){this.set("verticalScrollOffset",0)
}if(!this.get("isHorizontalScrollerVisible")&&(this.get("horizontalScrollOffset")!==0)&&this.get("autohidesHorizontalScroller")){this.set("horizontalScrollOffset",0)
}var l=this.get("maximumVerticalScrollOffset"),i=this.get("verticalScrollOffset"),g=this.get("maximumHorizontalScrollOffset"),a=this.get("horizontalScrollOffset");
var e=l<i;var c=g<a;if(e||c){this.forceDimensionsRecalculation(c,e,i,a)}},_scroll_horizontalScrollOffsetDidChange:function(){var b=this.get("horizontalScrollOffset");
b=Math.max(0,Math.min(this.get("maximumHorizontalScrollOffset"),b));var a=this.get("contentView");
if(a){a.adjust("left",0-b)}}.observes("horizontalScrollOffset"),_scroll_verticalScrollOffsetDidChange:function(){var c=this.get("verticalScrollOffset");
c=Math.max(0,Math.min(this.get("maximumVerticalScrollOffset"),c));var b=this.get("contentView");
var a=this.get("containerView");if(b){b.adjust("top",0-c)}}.observes("verticalScrollOffset"),forceDimensionsRecalculation:function(b,c,f,a){var g=a;
var e=f;this.scrollTo(0,0);if(b&&c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),this.get("maximumVerticalScrollOffset"))
}if(b&&!c){this.scrollTo(this.get("maximumHorizontalScrollOffset"),e)}if(!b&&c){this.scrollTo(g,this.get("maximumVerticalScrollOffset"))
}}});tiki.script("sproutcore/desktop:en/0a67032b44fccf8f11160e96135230830ba8b945/javascript.js");
tiki.register("sproutcore",{depends:["sproutcore/desktop"],packages:{"sproutcore/desktop":{}},scripts:[{url:"/static/sproutcore/en/95f7b4c6a721469760d266a255fa6c3b793250e6/javascript.js",id:"sproutcore:en/95f7b4c6a721469760d266a255fa6c3b793250e6/javascript.js"}]});
tiki.global("sproutcore");
/* @license
==========================================================================
SproutCore -- JavaScript Application Framework
copyright 2006-2008, Sprout Systems, Inc. and contributors.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

For more information about SproutCore, visit http://www.sproutcore.com


==========================================================================
@license */
tiki.script("sproutcore:en/95f7b4c6a721469760d266a255fa6c3b793250e6/javascript.js");
tiki.register("sproutcore/empty_theme",{scripts:[{url:"/static/sproutcore/empty_theme/en/21c3b7b16d7ef39d60d2651975590828812f3ad9/javascript.js",id:"sproutcore/empty_theme:en/21c3b7b16d7ef39d60d2651975590828812f3ad9/javascript.js"}]});
tiki.global("sproutcore/empty_theme");tiki.script("sproutcore/empty_theme:en/21c3b7b16d7ef39d60d2651975590828812f3ad9/javascript.js");
tiki.register("sproutcore/standard_theme",{depends:["sproutcore/empty_theme"],packages:{"sproutcore/empty_theme":{}},scripts:[{url:"/static/sproutcore/standard_theme/en/4448cf3c8117a1e50376695dc8ea12138b0f9099/javascript.js",id:"sproutcore/standard_theme:en/4448cf3c8117a1e50376695dc8ea12138b0f9099/javascript.js"}]});
tiki.global("sproutcore/standard_theme");tiki.script("sproutcore/standard_theme:en/4448cf3c8117a1e50376695dc8ea12138b0f9099/javascript.js");
tiki.register("bespin",{depends:["tiki","tiki/system","core_test","sproutcore","sproutcore/empty_theme","sproutcore/standard_theme"],packages:{"sproutcore/empty_theme":{},core_test:{},"sproutcore/standard_theme":{},"tiki/system":{},sproutcore:{},tiki:{}},scripts:[{url:"/static/bespin/en/1f2b8ea0a57cc4090df8ca4c1c2c1cbaedc34b89/javascript.js",id:"bespin:en/1f2b8ea0a57cc4090df8ca4c1c2c1cbaedc34b89/javascript.js"}]});
tiki.module("bespin:actions",function(c,a,e){var b=c("package");var h=c("sproutcore/runtime:package").SC;
var g=c("cursor");var f=c("util/clipboard");b.get("settings").addSetting({name:"tabmode",type:"boolean",defaultValue:false});
b.get("settings").addSetting({name:"closepairs",type:"boolean",defaultValue:false});
a.Actions=h.Object.extend({editor:null,ignoreRepaints:false,currentEditItem:undefined,editDepth:0,beginEdit:function(i){if(this.editDepth==0){this.currentEditItem=a.ActionHistoryItem.create({name:i,editor:this.editor});
this.currentEditItem.begin()}this.editDepth++},endEdit:function(){if(this.editDepth<=0){return
}this.editDepth--;if(this.editDepth==0){this.currentEditItem.end();this.editor.historyManager.add(this.currentEditItem);
this.currentEditItem=undefined}},handleCursorSelection:function(i){if(i.event.shiftKey){if(!this.editor.selection){this.editor.setSelection({startPos:g.copyPos(i.pos)})
}this.editor.setSelection({startPos:this.editor.selection.startPos,endPos:g.copyPos(this.editor.cursorManager.getCursorPosition())})
}else{this.editor.setSelection(undefined)}},moveCursor:function(j,i){var k=this.editor.cursorManager[j](i);
this.handleCursorSelection(i);this.repaint();i.pos=k.newPos;return i},moveCursorLeft:function(i){return this.moveCursor("moveLeft",i)
},moveCursorRight:function(i){return this.moveCursor("moveRight",i)},moveCursorUp:function(i){return this.moveCursor("moveUp",i)
},moveCursorDown:function(i){return this.moveCursor("moveDown",i)},moveToLineStart:function(i){return this.moveCursor("moveToLineStart",i)
},moveToLineEnd:function(i){return this.moveCursor("moveToLineEnd",i)},moveToFileTop:function(i){return this.moveCursor("moveToTop",i)
},moveToFileBottom:function(i){return this.moveCursor("moveToBottom",i)},movePageUp:function(i){return this.moveCursor("movePageUp",i)
},movePageDown:function(i){return this.moveCursor("movePageDown",i)},moveWordLeft:function(i){return this.moveCursor("smartMoveLeft",i)
},moveWordRight:function(i){return this.moveCursor("smartMoveRight",i)},deleteWordLeft:function(i){this.beginEdit("deleteWordLeft");
this.deleteChunk({endPos:i.pos,pos:this.moveCursor("smartMoveLeft",i).pos});this.endEdit();
return i},deleteWordRight:function(i){this.beginEdit("deleteWordRight");this.deleteChunk({pos:i.pos,endPos:this.moveCursor("smartMoveRight",i).pos});
this.endEdit();return i},applyState:function(l){if(this.testHistory.length==0){return
}else{if(l<0){l=-1}else{if(l>=this.testHistory.length){return}}}this.testHistoryPosition=l;
var k=this.testHistory[Math.max(0,this.testHistoryPosition)];var j=k.after;var i=k.uiAfter;
if(l<0){j=k.before;i=k.uiBefore}this.editor.model.applyState(j);this.editor.setState(i)
},undo:function(){this.editor.historyManager.undo()},redo:function(){this.editor.historyManager.redo()
},selectAll:function(i){if(this.editor.model.isEmpty()){return}i.startPos={row:0,col:0};
i.endPos={row:this.editor.model.getRowCount()-1,col:this.editor.editorView.getRowScreenLength(this.editor.model.getRowCount()-1)};
this.select(i)},select:function(i){if(i.startPos){this.editor.setSelection({startPos:i.startPos,endPos:i.endPos});
this.editor.cursorManager.moveCursor(i.endPos)}else{this.editor.setSelection(undefined)
}},insertTab:function(j){if(this.editor.readonly){return}var l=b.get("settings");
if(this.editor.getSelection()&&!j.undoInsertTab){this.indent(j);return}var k=j.tab;
var i=this.editor.cursorManager.getCharacterLength("\t");if(!k||!i){if(l.values.tabmode){k="\t"
}else{k="";var m=i;while(m-->0){k+=" "}i=k.length}}this.beginEdit("insertTab");delete this.editor.selection;
this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition({row:j.pos.row,col:j.pos.col}),k);
this.editor.cursorManager.moveCursor({row:j.pos.row,col:j.pos.col+i});this.repaint();
this.endEdit()},indent:function(s){this.beginEdit("indent");var p=b.get("settings");
var u=this.editor.getSelection();var i=false;if(u===undefined){i=true;var q=this.editor.getCursorPos();
var j=this.editor.getModelPos();u={startPos:{row:q.row,col:0},endPos:{row:q.row,col:this.editor.model.getRowMetadata(q.row).lineLength},startModelPos:{row:j.row,col:0},endModelPos:{row:j.row,col:this.editor.model.getRowMetadata(j.row).lineLengthWithoutTabExpansion}};
this.editor.setSelection(u)}var w=u.startPos.row;var r=u.endPos.row;var m=this.editor.cursorManager.getStringLength(this.editor.model.getRowArray(r).join(""));
var n=this.editor.cursorManager.getStringLength(this.editor.model.getRowArray(s.pos.row).join(""));
var o;var l="";if(p.values.tabmode){l="\t"}else{var k=this.editor.getTabSize();while(k-->0){l+=" "
}}for(var t=w;t<=r;t++){if(l!="\t"){o=this.editor.cursorManager.getLeadingWhitespace(t);
o=this.editor.cursorManager.getNextTablevelRight(o)-o;o=l.substring(0,o)}else{o="\t"
}this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition({row:t,col:0}),o)
}var v=this.editor.cursorManager.getStringLength(this.editor.model.getRowArray(s.pos.row).join(""))-n;
u.endPos.col+=this.editor.cursorManager.getStringLength(this.editor.model.getRowArray(r).join(""))-m;
this.editor.setSelection(u);this.editor.cursorManager.moveCursor({col:s.pos.col+v});
if(i){this.editor.setSelection(undefined)}this.repaint();this.endEdit()},unindent:function(q){this.beginEdit("unindent");
var s=this.editor.getSelection();var i=false;if(s===undefined){i=true;var o=this.editor.getCursorPos();
var j=this.editor.getModelPos();s={startPos:{row:o.row,col:0},endPos:{row:o.row,col:this.editor.model.getRowMetadata(o.row).lineLength},startModelPos:{row:j.row,col:0},endModelPos:{row:j.row,col:this.editor.model.getRowMetadata(j.row).lineLengthWithoutTabExpansion}};
this.editor.setSelection(s)}var u=s.startPos.row;var p=s.endPos.row;var m=this.editor.cursorManager.getStringLength(this.editor.model.getRowArray(p).join(""));
var v=false;var n;var l;for(var r=u;r<=p;r++){v=this.editor.model.getRowArray(r);
if(v.length>0&&v[0]=="\t"){n=1;l=this.editor.getTabSize()}else{var k=this.editor.cursorManager.getLeadingWhitespace(r);
n=this.editor.cursorManager.getContinuousSpaceCount(0,this.editor.getTabSize(),r);
l=n}if(n){this.editor.model.deleteCharacters(this.editor.cursorManager.getModelPosition({row:r,col:0}),n)
}if(r==u){s.startPos.col=Math.max(0,s.startPos.col-l)}if(r==p){if(!v){v=this.editor.model.getRowArray(r)
}var t=m-this.editor.cursorManager.getStringLength(v.join(""));s.endPos.col=Math.max(0,s.endPos.col-t);
q.pos.col=Math.max(0,q.pos.col-t)}}this.editor.setSelection(s);this.editor.cursorManager.moveCursor({col:q.pos.col});
if(i){this.editor.setSelection(undefined)}this.repaint();this.endEdit()},cutSelection:function(i){if(this.editor.readonly){return
}this.beginEdit("cut");this.copySelection(i);this.deleteSelection(i);this.endEdit()
},copySelection:function(i){var j=this.editor.getSelection();if(j){var k=this.editor.model.getChunk(j);
if(k){f.manual.copy(k)}}},pasteFromClipboard:function(i){if(this.editor.readonly){return
}var j=(i.clipboard)?i.clipboard:f.manual.data();if(j===undefined){return}i.chunk=j;
this.beginEdit("paste");this.insertChunk(i);this.endEdit()},insertChunk:function(i){if(this.editor.readonly){return
}this.beginEdit("insertChunk");if(this.editor.selection){this.deleteSelection()}var j=g.copyPos(this.editor.cursorManager.getCursorPosition());
j=this.editor.model.insertChunk(this.editor.cursorManager.getModelPosition(j),i.chunk);
j=this.editor.cursorManager.getCursorPosition(j);this.editor.cursorManager.moveCursor(j);
this.repaint();this.endEdit();return j},deleteChunk:function(k){if(this.editor.readonly){return
}this.beginEdit("deleteChunk");var j=(k.startPos!=undefined)?k.startPos:g.copyPos(k.pos);
var l=this.editor.getSelection({startPos:j,endPos:k.endPos});var i=this.editor.model.deleteChunk(l);
this.editor.cursorManager.moveCursor(l.startPos);this.editor.setSelection(undefined);
this.repaint();this.endEdit();return l.startPos},joinLine:function(j){if(this.editor.readonly){return
}this.beginEdit("joinLine");if(j.joinDirection=="up"){if(j.pos.row==0){return}var i=this.editor.editorView.getRowScreenLength(j.pos.row-1);
this.editor.model.joinRow(j.pos.row-1);this.editor.cursorManager.moveCursor({row:j.pos.row-1,col:i})
}else{if(j.pos.row>=this.editor.model.getRowCount()-1){return}this.editor.model.joinRow(j.pos.row)
}this.endEdit();this.repaint()},killLine:function(i){if(this.editor.readonly){return
}this.beginEdit("killLine");this.editor.setSelection({startPos:{row:i.pos.row,col:0},endPos:{row:i.pos.row+1,col:0}});
this.cutSelection(i);this.endEdit()},deleteSelection:function(i){if(this.editor.readonly){return
}var j=this.editor.getSelection();return this.deleteChunk({startPos:j.startPos,endPos:j.endPos,clearSelection:true})
},backspace:function(k){if(this.editor.readonly){return}this.beginEdit("backspace");
if(this.editor.selection){this.deleteSelection(k)}else{if(k.pos.col>0){var l=b.get("settings");
if(l.values.smartmove){var j=this.editor.getTabSize();var i=this.editor.cursorManager.getContinuousSpaceCount(k.pos.col,this.editor.cursorManager.getNextTablevelLeft(k.pos.col));
if(i==j){var m=k.pos;this.editor.selection={startPos:{row:m.row,col:m.col-j},endPos:{row:m.row,col:m.col}};
this.deleteSelection(k);this.endEdit();return}}this.editor.cursorManager.moveCursor({col:Math.max(0,k.pos.col-1)});
k.pos.col-=1;this.deleteCharacter(k)}else{k.joinDirection="up";this.joinLine(k)}}this.endEdit()
},deleteKey:function(k){if(this.editor.readonly){return}this.beginEdit("deleteKey");
if(this.editor.selection){this.deleteSelection(k)}else{if(k.pos.col<this.editor.editorView.getRowScreenLength(k.pos.row)){var l=b.get("settings");
if(l.values.smartmove){var j=this.editor.getTabSize();var i=this.editor.cursorManager.getContinuousSpaceCount(k.pos.col,this.editor.cursorManager.getNextTablevelRight(k.pos.col));
if(i==j){var m=k.pos;this.editor.selection={startPos:{row:m.row,col:m.col},endPos:{row:m.row,col:m.col+j}};
this.deleteSelection(k);this.endEdit();return}}this.deleteCharacter(k)}else{k.joinDirection="down";
this.joinLine(k)}}this.endEdit()},deleteCharacter:function(k){if(this.editor.readonly){return
}if(k.pos.col<this.editor.editorView.getRowScreenLength(k.pos.row)){this.beginEdit("deleteCharacter");
var j=this.editor.cursorManager.getModelPosition(k.pos);var l=1;var i=this.editor.model.deleteCharacters(j,l);
this.repaint();this.endEdit()}},newline:function(i){if(this.editor.readonly){return
}var j=b.get("settings");var k;if(j.values.autoindent){k=b.util.leadingWhitespace(this.editor.model.getRowArray(i.pos.row))
}else{k=[]}i.chunk="\n"+k.join("");this.insertChunk(i)},newlineBelow:function(i){this.newline(this.moveToLineEnd(i))
},insertCharacter:function(i){if(this.editor.readonly){return}this.beginEdit("insertCharacter");
var k=i.pos;if(this.editor.selection){k=this.deleteSelection(i)}this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition(k),i.newchar);
this.editor.cursorManager.moveRight(true);var j=b.get("settings");if(j.values.closepairs){switch(i.newchar){case"(":this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition(),")");
break;case"[":this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition(),"]");
break;case"{":this.editor.model.insertCharacters(this.editor.cursorManager.getModelPosition(),"}");
break;case"<":break;case'"':break;case"'":break}}this.repaint();this.endEdit()},moveCursorRowToCenter:function(i){var k=this.editor.getCursorPos().row;
var j=Math.floor(this.editor.ui.visibleRows/2);if(k>(this.editor.ui.firstVisibleRow+j)){this.editor.cursorManager.moveCursor({row:this.editor.getCursorPos().row+j})
}else{this.editor.cursorManager.moveCursor({row:this.editor.getCursorPos().row-j})
}this.editor.editorView.ensureCursorVisible();this.editor.cursorManager.moveCursor({row:k})
},getOppositeCase:function(i){if(!i){return undefined}switch(i){case"u":return"l";
case"l":return"u"}},selectionChangeCase:function(k){if(this.editor.readonly){return
}if(this.editor.selection){this.beginEdit("selectionChangeCase");if(!k.selectionObject){k.selectionObject=this.editor.getSelection()
}var m=this.editor.model.getChunk(k.selectionObject);var j=m.split("\n");for(var l in j){switch(k.stringCase){case"l":j[l]=j[l].toLowerCase();
break;case"u":j[l]=j[l].toUpperCase();break}}var n=j.join("\n");this.editor.model.deleteChunk(k.selectionObject);
this.editor.model.insertChunk(k.selectionObject.startModelPos,n);this.select(k.selectionObject);
this.endEdit()}},startSearch:function(n,i,j){if(n==""){this.editor.ui.setSearchString(false);
this.editor.paint(true);document.getElementById("searchresult").style.display="none";
return false}if(n==this.editor.ui.searchString&&i=="toolbar"){if(!j){this.findNext()
}else{this.findPrev()}document.getElementById("searchresult").style.display="block";
return}this.editor.ui.setSearchString(n);var k=this.editor.model.getCountOfString(n);
if(k!=0){var o=g.copyPos(this.editor.cursorManager.getCursorPosition());if(!this.editor.ui.actions.findNext(null,true)){this.editor.cursorManager.moveCursor({col:0,row:0});
this.editor.ui.actions.findNext()}}var m;switch(i){case"commandLine":m="Found "+k+" match";
if(k>1){m+="es"}m+=" for your search for <em>"+n+"</em>";b.get("commandLine").showHint(m);
break;case"searchwindow":var l=b.get("filesearch");if(l){l.setMatchesCount(k)}break;
case"toolbar":m=+k+" Match";if(k>1){m+="es"}document.getElementById("searchfeedback").innerHTML=m;
document.getElementById("searchresult").style.display="block";break}this.editor.paint(true)
},findNext:function(i,l){if(!this.editor.ui.searchString){return}var m=g.copyPos(this.editor.cursorManager.getModelPosition());
var k=this.editor.getSelection();if(l&&k!==undefined){m.col-=k.endModelPos.col-k.startModelPos.col+1
}var j=this.editor.model.findNext(m.row,m.col,this.editor.ui.searchString);if(!j){j=this.editor.model.findNext(0,0,this.editor.ui.searchString)
}if(j){this.editor.setSelection({startPos:this.editor.cursorManager.getCursorPosition(j.startPos),endPos:this.editor.cursorManager.getCursorPosition(j.endPos)});
this.editor.cursorManager.moveCursor(this.editor.cursorManager.getCursorPosition(j.endPos));
this.editor.editorView.ensureCursorVisible(true);this.repaint();return true}else{return false
}},findPrev:function(){if(!this.editor.ui.searchString){return}var k=this.editor.cursorManager.getModelPosition();
var j=this.editor.model.findPrev(k.row,k.col,this.editor.ui.searchString);if(!j){var i=this.editor.model.getRowCount()-1;
j=this.editor.model.findPrev(i,this.editor.model.getRowArray(i).length-1,this.editor.ui.searchString)
}if(j){this.editor.setSelection({startPos:this.editor.cursorManager.getCursorPosition(j.startPos),endPos:this.editor.cursorManager.getCursorPosition(j.endPos)});
this.editor.cursorManager.moveCursor(this.editor.cursorManager.getCursorPosition(j.endPos));
this.editor.editorView.ensureCursorVisible(true);this.repaint();return true}else{return false
}},escape:function(){b.publish("ui:escape");if(this.editor.ui.searchString){this.editor.ui.setSearchString(false)
}},toggleQuickopen:function(){var i=b.get("quickopen");if(i){i.toggle()}},togglePieMenu:function(){b.getComponent("piemenu",function(i){i.toggle()
})},focusCommandline:function(){b.getComponent("popup",function(i){i.show("output","Command Line")
})},focusFileBrowser:function(){b.getComponent("popup",function(i){i.show("files","File Explorer")
})},repaint:function(){if(!this.ignoreRepaints){this.editor.editorView.ensureCursorVisible();
this.editor.paint()}},replace:function(i){this.beginEdit("replace");this.editor.model.replace(i.search,i.replace);
this.repaint();this.endEdit()},gotoLine:function(){b.getComponent("commandLine",function(i){i.setCommandText("goto ");
b.getComponent("popup",function(j){j.show("output")})})},cmdFilesearch:function(){b.getComponent("commandLine",function(i){i.setCommandText("search ");
b.getComponent("popup",function(j){j.show("output")})})},previousFile:function(){b.get("editSession").goToPreviousFile()
},nextFile:function(){b.get("editSession").goToNextFile()}});a.ActionHistoryItem=h.Object.extend({begin:function(j,i){this.startIndex=this.editor.historyManager.getCurrent();
if(j){this.editorBefore=j}else{this.editorBefore=this.editor.getState()}if(i){this.modelBefore=i
}else{this.modelBefore=this.editor.model.getState()}},end:function(j,i){this.editor.historyManager.truncate(this.startIndex);
if(j){this.editorAfter=j}else{this.editorAfter=this.editor.getState()}if(i){this.modelAfter=i
}else{this.modelAfter=this.editor.model.getState()}},undo:function(){this.editor.model.applyState(this.modelBefore);
this.editor.setState(this.editorBefore);this.editor.editorView.ensureCursorVisible();
this.editor.paint()},redo:function(){this.editor.model.applyState(this.modelAfter);
this.editor.setState(this.editorAfter);this.editor.editorView.ensureCursorVisible();
this.editor.paint()}})});tiki.module("bespin:boot",function(b,a,c){var f=b("sproutcore/runtime:package").SC;
var e=tiki.require("bespin:embed");f.ready(function(){var g=document.querySelectorAll(".bespin");
for(var k=0;k<g.length;k++){var l=g[k];var j=l.getAttribute("data-bespinoptions");
var h=e.useBespin(l,JSON.parse(j));l.bespin=h}if(window.onBespinLoad){window.onBespinLoad()
}});window.onload=f.didLoad});tiki.module("bespin:builtins",function(b,a,c){a.metadata={"Base Syntax":{provides:[{ep:"extensionpoint",name:"syntax.engine",description:"Syntax highlighting engines"},{ep:"syntax.engine",name:"simple",pointer:"bespin/syntax/simple:Model"},{ep:"extensionpoint",name:"syntax.simple.highlighter",description:"Highlighter code for the simple syntax highlighter."},{ep:"syntax.simple.highlighter",name:"JavaScript",extensions:["js","json","javascript","ecmascript","jsm","java"],pointer:"bespin/syntax/simple/javascript:JavaScript"},{ep:"syntax.simple.highlighter",name:"C",extensions:["c","h"],pointer:"bespin/syntax/simple/c:C"},{ep:"syntax.simple.highlighter",name:"CSharp",extensions:["cs"],pointer:"bespin/syntax/simple/csharp:CSharp"},{ep:"syntax.simple.highlighter",name:"CSS",extensions:["css"],pointer:"bespin/syntax/simple/css:CSS"},{ep:"syntax.simple.highlighter",name:"HTML",extensions:["html","htm","xml","xhtml","shtml"],pointer:"bespin/syntax/simple/html:HTML"},{ep:"syntax.simple.highlighter",name:"PHP",extensions:["php","php3","php4","php5"],pointer:"bespin/syntax/simple/php:PHP"},{ep:"syntax.simple.highlighter",name:"Python",extensions:["py","python"],pointer:"bespin/syntax/simple/python:Python"},{ep:"syntax.simple.highlighter",name:"Ruby",extensions:["rb","ruby"],pointer:"bespin/syntax/simple/ruby:Ruby"}]},bespin:{provides:[{ep:"extensionpoint",name:"startup",description:"A function that should be called at startup. This should be used sparingly, as these plugins will be eagerly loaded at the beginning. All that's needed for this extension point is a pointer to a function that takes no arguments.",activate:"plugins#startupHandler"},{ep:"extensionpoint",name:"factory",description:"Provides a factory for singleton components. Each extension needs to provide a name, a pointer and an action. The action can be 'call' (if the pointer refers to a function), 'create' (if the pointer refers to an SC.Object), 'new' (if the pointer refers to a traditional JS object) or 'value' (if the pointer refers to the object itself that is the component).",indexOn:"name"},{action:"call",pointer:"util/container#dummyFactory",name:"files",ep:"factory"},{action:"create",pointer:"util/hub#Hub",name:"hub",ep:"factory"},{action:"create",pointer:"settings#InMemorySettings",name:"settings",ep:"factory"},{action:"call",pointer:"util/container#dummyFactory",name:"commandLine",ep:"factory"},{action:"call",pointer:"util/container#dummyFactory",name:"parser",ep:"factory"},{action:"create",pointer:"editor/controller#EditorController",name:"editor",ep:"factory"},{action:"call",pointer:"util/container#dummyFactory",name:"editSession",ep:"factory"},{action:"create",pointer:"cursor#CursorManager",name:"cursorManager",ep:"factory"}]}}
});tiki.module("bespin:command",function(e,b,f){var c=e("package");var g=e("sproutcore/runtime:package").SC;
var a=e("util/tokenobject").TokenObject;b.Store=g.Object.extend({commands:{},aliases:{},command:null,parent:null,init:function(){if(this.parent){this.containerCommand=this.command;
this.command.takes=["*"];this.command.subcommands=this;this.parent.addCommand(this.command)
}},addCommand:function(h){if(!h){return}h.parent=this;this.commands[h.name]=h;if(h.takes&&Array.isArray(h.takes)){h=this.normalizeTakes(h)
}if(h.withKey){c.getComponent("editor",function(i){i.bindCommand(h.name,h.withKey)
})}if(h.aliases){h.aliases.forEach(function(i){this.aliases[i]=h.name},this)}h.getFullCommandName=function(){var i=this.name;
if(this.parent){i=this.parent.getFullCommandName()+" "+i}return i.trim()};if(!h.findCompletions){h.findCompletions=function(i,j){i.hint=this.completeText;
j(i)}}},removeCommand:function(h){if(!h){return}delete this.commands[h.name]},getFullCommandName:function(){var h=this.containerCommand?this.containerCommand.name:"";
if(this.parent){h=this.parent.getFullCommandName()+" "+h}return h.trim()},filterOptionsByPrefix:function(h,i){return h.filter(function(j){return j.substr(0,i.length)===i
})},findCommand:function(h){var i=h.trim().split(/\s+/);var k=i.shift();var j=this.commands[k]||this.commands[this.aliases[k]];
if(!j){if(i.length>0){return null}else{return this}}if(j.subcommands){return j.subcommands.findCommand(i.join(" "))
}else{return j}},findCompletions:function(j,n){if(j.action.length>1){j.error="No matches";
n(j);return}var l=j.action[0];if(l.length==0&&this.parent==null){n(j);return}var i=[];
for(var m in this.commands){if(m.indexOf(l)==0){i.push(m)}}for(var h in this.aliases){if(h.indexOf(l)==0){i.push(h)
}}if(i.length==1){var k=i[0];m=this.commands[k]||this.commands[this.aliases[k]];if(this.commandTakesArgs(m)){k=k+" "
}j.autofill=j.prefix+k;j.hint=m.preview}else{if(i.length==0){j.error="No matches"
}else{i.sort(function(p,o){return p.localeCompare(o)});j.options=i}}n(j);return},commandTakesArgs:function(h){return h.takes!=undefined
},getArgs:function(i,k){if(!k.takes){return undefined}var h;var j=i.join(" ");if(k.takes["*"]){h=new a({input:j});
h.rawinput=j;h.varargs=h.pieces}else{if(k.takes&&k.takes.order.length<2){h=j}else{h=new a({input:j,options:{params:k.takes.order.join(" ")}});
h.rawinput=j}}return h},normalizeTakes:function(i){var h=i.takes;i.takes={order:h};
h.forEach(function(j){i.takes[j]={"short":j[0]}});return i},getHelp:function(o,t){var j=[];
var l,h;if(this.commands[o]){l=this.commands[o];j.push(l.description?l.description:l.preview)
}else{var q=false;var r="";if(this.containerCommand){r=" for "+this.containerCommand.name
}if(o){if(o=="hidden"){o="";q=true}j.push("<h2>Commands starting with '"+o+"':</h2>")
}else{j.push("<h2>Available Commands:</h2>")}var n=[];for(h in this.commands){n.push(h)
}var p=n.sort();j.push("<table>");for(var m=0;m<p.length;m++){h=p[m];l=this.commands[h];
if(!q&&l.hidden){continue}if(o&&h.indexOf(o)!=0){continue}var s=(l.takes)?" ["+l.takes.order.join("] [")+"]":"";
j.push("<tr>");j.push("<th>"+h+"</th>");j.push("<td>"+l.preview+"</td>");j.push("<td>"+s+"</td>");
j.push("</tr>")}j.push("</table>")}var k=j.join("");if(t&&t.prefix){k=t.prefix+"<br/>"+k
}if(t&&t.suffix){k=k+"<br/>"+t.suffix}return k}});b.store=new b.Store();b.executeExtensionCommand=function(){var i=arguments;
var h=this;this.load(function(j){j.apply(h,i)})};c.subscribe("extension:loaded:bespin.command",function(h){h.execute=b.command.executeExtensionCommand;
b.store.addCommand(h)});c.subscribe("extension:removed:bespin.command",function(h){b.store.removeCommand(h)
});b.store.addCommand({name:"help",takes:["search"],preview:"show commands",description:"The <u>help</u> gives you access to the various commands in the Bespin system.<br/><br/>You can narrow the search of a command by adding an optional search params.<br/><br/>If you pass in the magic <em>hidden</em> parameter, you will find subtle hidden commands.<br/><br/>Finally, pass in the full name of a command and you can get the full description, which you just did to see this!",completeText:"optionally, narrow down the search",execute:function(i,h){var j=this.parent.getHelp(h,{prefix:"<h2>Welcome to Bespin - Code in the Cloud</h2><ul><li><a href='http://labs.mozilla.com/projects/bespin' target='_blank'>Home Page</a><li><a href='https://wiki.mozilla.org/Labs/Bespin' target='_blank'>Wiki</a><li><a href='https://wiki.mozilla.org/Labs/Bespin/UserGuide' target='_blank'>User Guide</a><li><a href='https://wiki.mozilla.org/Labs/Bespin/Tips' target='_blank'>Tips and Tricks</a><li><a href='https://wiki.mozilla.org/Labs/Bespin/FAQ' target='_blank'>FAQ</a><li><a href='https://wiki.mozilla.org/Labs/Bespin/DeveloperGuide' target='_blank'>Developers Guide</a></ul>",suffix:"For more information, see the <a href='https://wiki.mozilla.org/Labs/Bespin'>Bespin Wiki</a>."});
i.addOutput(j)}})});tiki.module("bespin:cursor",function(c,a,e){var f=c("sproutcore/runtime:package").SC;
var b=c("package");a.CursorManager=f.Object.extend({init:function(){this.position={row:0,col:0};
this.virtualCol=0;arguments.callee.base.apply(this,arguments)},requires:{editor:"editor",settings:"settings",hub:"hub"},afterContainerInit:function(){this.settings.addSetting({name:"strictlines",type:"boolean",defaultValue:false});
this.settings.addSetting({name:"smartmove",type:"boolean",defaultValue:true});this.hub.subscribe("settings:set:strictlines",function(h){if(h.value){var g=a.copyPos(this.position);
this.checkPastEndOfLine(g)}}.bind(this))},getCursorPosition:function(h){if(h==undefined){return this.position
}var n=a.copyPos(h);var j=[];if(this.editor.model.hasRow(n.row)){j=this.editor.model.getRowArray(n.row)
}var g=this.editor.getTabSize();if(j.indexOf("\t")!=-1){var l=0,m=0;for(var k=0;k<h.col;
k++){if(j[k]=="\t"){n.col+=g-1-(m%g);l++;m=0}else{m++;l=0}}}return n},getModelPosition:function(n){n=(n!=undefined)?n:this.position;
var h=a.copyPos(n);var l=[];if(this.editor.model.hasRow(n.row)){l=this.editor.model.getRowArray(n.row)
}var g=this.editor.getTabSize();if(l.indexOf("\t")!=-1){var k=0;for(var m=0;m<h.col;
m++){var j=k;if(l[m]=="\t"){j=Math.floor((k+g)/g)*g}else{j+=1}if(j>h.col){break}k=j
}h.col=m}return h},getCharacterLength:function(i,h){if(i.length>1){return}if(h==undefined){h=this.position.col
}if(i=="\t"){var g=this.editor.getTabSize();return g-(h%g)}else{return 1}},getStringLength:function(i){if(!i||i.length==0){return 0
}var h=0;i=i.split("");for(var g=0;g<i.length;g++){h+=this.getCharacterLength(i[g],h)
}return h},getLeadingWhitespace:function(i){var h=this.editor.model.getRowArray(i).join("");
var g=/^(\s+).*/.exec(h);return(g&&g.length==2?this.getStringLength(g[1]):0)},getContinuousSpaceCount:function(n,m,l){l=l||this.position.row;
var j=this.editor.model.getRowArray(l);var k=(n<m?1:-1);var i=j.length;n=n+(k==1?0:-1);
m=m+(k==1?0:-1);n=this.getModelPosition({col:n,row:l}).col;m=this.getModelPosition({col:m,row:l}).col;
if(this.settings.values.strictlines){n=Math.min(n,i);m=Math.min(m,i)}var h=0;for(var g=n;
g!=m;g+=k){if(g<i){if(j[g]!=" "){break}}h++}return h},getNextTablevelLeft:function(h){var g=this.editor.getTabSize();
h=h||this.position.col;h--;return Math.floor(h/g)*g},getNextTablevelRight:function(h){var g=this.editor.getTabSize();
h=h||this.position.col;h++;return Math.ceil(h/g)*g},moveToLineStart:function(){var h=a.copyPos(this.position);
var g=this.getLeadingWhitespace(h.row);if(this.position.col==0){this.moveCursor({col:g})
}else{if(this.position.col==g){this.moveCursor({col:0})}else{if(g!=this.editor.editorView.getRowScreenLength(this.editor.cursorManager.getCursorPosition().row)){this.moveCursor({col:g})
}else{this.moveCursor({col:0})}}}return{oldPos:h,newPos:a.copyPos(this.position)}
},moveToLineEnd:function(){var g=a.copyPos(this.position);this.moveCursor({col:this.editor.editorView.getRowScreenLength(g.row)});
return{oldPos:g,newPos:a.copyPos(this.position)}},moveToTop:function(){var g=a.copyPos(this.position);
this.editor.cursorManager.moveCursor({row:0,col:0});return{oldPos:g,newPos:a.copyPos(this.position)}
},moveToBottom:function(){var g=a.copyPos(this.position);var h=this.editor.model.getRowCount()-1;
this.editor.cursorManager.moveCursor({row:h,col:this.editor.editorView.getRowScreenLength(h)});
return{oldPos:g,newPos:a.copyPos(this.position)}},moveUp:function(){var g=a.copyPos(this.position);
this.moveCursor({row:g.row-1,col:Math.max(g.col,this.virtualCol)});this.checkPastEndOfLine(g);
return{oldPos:g,newPos:a.copyPos(this.position)}},moveDown:function(){var g=a.copyPos(this.position);
this.moveCursor({row:Math.max(0,g.row+1),col:Math.max(g.col,this.virtualCol)});this.checkPastEndOfLine(g);
return{oldPos:g,newPos:a.copyPos(this.position)}},moveLeft:function(i){var h=a.copyPos(this.position);
var j=(i.event?i.event.shiftKey:false);if(!this.editor.getSelection()||j){if(this.settings.values.smartmove){var g=this.getContinuousSpaceCount(h.col,this.getNextTablevelLeft());
if(g==this.editor.getTabSize()){this.moveCursor({col:h.col-g});return{oldPos:h,newPos:a.copyPos(this.position)}
}}if(this.settings.values.strictlines&&this.position.col==0){this.moveUp();if(h.row>0){this.moveToLineEnd()
}}else{this.moveCursor({row:h.row,col:Math.max(0,h.col-1)})}}else{this.moveCursor(this.editor.getSelection().startPos)
}return{oldPos:h,newPos:a.copyPos(this.position)}},moveRight:function(i){var h=a.copyPos(this.position);
var j=(i.event?i.event.shiftKey:false);if(!this.editor.getSelection()||j){if(this.settings.values.smartmove&&i!=true){var g=this.getContinuousSpaceCount(h.col,this.getNextTablevelRight());
if(g==this.editor.getTabSize()){this.moveCursor({col:h.col+g});return{oldPos:h,newPos:a.copyPos(this.position)}
}}if(this.settings.values.strictlines&&(this.position.col>=this.editor.editorView.getRowScreenLength(this.position.row))){this.moveDown();
if(h.row<this.editor.model.getRowCount()-1){this.moveCursor({col:0})}}else{this.moveCursor({col:this.position.col+1})
}}else{this.moveCursor(this.editor.getSelection().endPos)}return{oldPos:h,newPos:a.copyPos(this.position)}
},movePageUp:function(){var g=a.copyPos(this.position);this.moveCursor({row:Math.max(this.editor.editorView.firstVisibleRow-this.editor.editorView.visibleRows,0)});
this.checkPastEndOfLine(g);return{oldPos:g,newPos:a.copyPos(this.position)}},movePageDown:function(){var g=a.copyPos(this.position);
this.moveCursor({row:Math.min(this.position.row+this.editor.editorView.visibleRows,this.editor.model.getRowCount()-1)});
this.checkPastEndOfLine(g);return{oldPos:g,newPos:a.copyPos(this.position)}},checkPastEndOfLine:function(h){var g=this.settings.values.strictlines;
var i=this.editor.editorView.getRowScreenLength(this.position.row);if(g&&this.position.col>i){this.moveToLineEnd();
this.virtualCol=Math.max(h.col,this.virtualCol)}},smartMoveLeft:function(){var i=a.copyPos(this.position);
var j=this.editor.editorView.getRowString(i.row);var l,h;if(this.position.col==0){this.moveUp();
this.moveToLineEnd()}else{if(j.length<this.position.col){this.moveToLineEnd()}var g=this.position.col;
var k=false;while(g>0){g--;l=j.charAt(g);h=l.charCodeAt(0);if(h==32){k=true}else{g++;
break}}if(!k){while(g>0){g--;l=j.charAt(g);h=l.charCodeAt(0);if((h<65)||(h>122)){if(g!=this.position.col-1){g++
}break}}}this.moveCursor({col:g})}return{oldPos:i,newPos:a.copyPos(this.position)}
},smartMoveRight:function(){var i=a.copyPos(this.position);var j=this.editor.editorView.getRowString(i.row);
if(j.length<=this.position.col){this.moveDown();this.moveToLineStart()}else{var l,h;
var g=this.position.col;var k=false;while(g<j.length){l=j[g];h=l.charCodeAt(0);if(h==32){k=true;
g++}else{break}}if(!k){while(g<j.length){g++;if(j.length==g){this.moveToLineEnd();
g=-1;break}l=j[g];h=l.charCodeAt(0);if((h<65)||(h>122)){break}}}if(g!=-1){this.moveCursor({col:g})
}}return{oldPos:i,newPos:a.copyPos(this.position)}},moveCursor:function(j){if(!j){return
}if(j.col===undefined){j.col=this.position.col}if(j.row===undefined){j.row=this.position.row
}this.virtualCol=0;var i=this.position;var k=Math.min(j.row,this.editor.model.getRowCount()-1);
if(k<0){k=0}var h=this.isInvalidCursorPosition(k,j.col);if(h){if(i.row!=j.row){j.col=h.right
}else{if(i.col<j.col){j.col=h.right}else{if(i.col>j.col){j.col=h.left}else{j.col=h.right
}}}}this.position={row:k,col:j.col};var g=this.editor.editorView;g.showCursor=true;
g.toggleCursorAllowed=false;g.cursorDidMove(this,this.position)},isInvalidCursorPosition:function(m,h){var k=this.editor.model.getRowArray(m);
var l=0;for(var j=0;j<k.length;j++){if(k[j].charCodeAt(0)==9){var g=this.editor.getTabSize()-(l%this.editor.getTabSize());
if((h>l)&&(h<(l+g))){return{left:l,right:l+g,half:g/2}}l+=g-1}l++}return undefined
}});a.buildArgs=function(g){return{pos:a.copyPos(g||b.get("editor").getCursorPos())}
};a.changePos=function(g,h){return{pos:a.copyPos(h||b.get("editor").getCursorPos())}
};a.copyPos=function(g){if(!g){return g}return{row:g.row,col:g.col}};a.posEquals=function(h,g){if(h==g){return true
}if(!h||!g){return false}return(h.col==g.col)&&(h.row==g.row)}});tiki.module("bespin:editor",function(f,j,b){var e=f("sproutcore/runtime:package").SC;
var h=f("bespin:package");var m=f("util/util");var r=f("util/keys");var c=f("util/canvas");
var a=f("util/cookie");var p=f("util/mousewheelevent");var k=f("util/clipboard");
var o=f("events");var g=f("syntax");var q=f("cursor");var i=f("actions");var l=f("model");
var n=f("history")});tiki.module("bespin:editor/controller",function(f,g,b){var e=f("sproutcore/runtime:package").SC;
var i=f("util/util");var c=f("util/canvas");var a=f("util/cookie");var o=f("util/keys");
var k=f("events");var n=f("cursor");var h=f("model");var j=f("history");var l=f("editor/views/editor");
var m=f("editor/views/scroll");g.EditorController=e.Object.extend({containerBinding:".editorView.layer",requires:{ioc:"ioc",settings:"settings",commandLine:"commandLine",session:"editSession",cursorManager:"cursorManager",files:"files",settings:"settings",hub:"hub"},afterContainerSetup:function(){this.settings.addSetting({name:"tabsize",type:"number",defaultValue:4});
this.settings.addSetting({name:"trimonsave",type:"boolean",defaultValue:false});this.settings.addSetting({name:"language",type:"text",defaultValue:"auto"});
this.hub.subscribe("editor:openfile:opensuccess",function(r){var s=r.project||session.project;
var p=i.path.fileType(r.file.name);if(p){this.hub.publish("settings:language",{language:p})
}var q=s+"/"+r.file.name;if(this.specialFileMap[q]){this.hub.publish("settings:language",{language:this.specialFileMap[q]})
}}.bind(this));this.specialFileMap={"BespinSettings/config":"js"};this.hub.subscribe("editor:openfile:opensuccess",function(s){var u=s.project||session.project;
var p=s.file.name;try{var q="viewData_"+u+"_"+p.split("/").join("_");var t=a.get(q);
if(t){this.resetView(JSON.parse(t))}else{this.basicView()}}catch(r){console.log("Error setting in the view: ",r)
}}.bind(this));this.debugMode=false;this.model=h.DocumentModel.create({editor:this});
this.ui=m.BespinScrollView.create({contentView:l.EditorView.extend({editor:this,content:this.model})});
this.editorView=this.ui.contentView;this.theme=f("theme")["default"];this.editorKeyListener=g.DefaultEditorKeyListener.create();
this.ioc.inject(this.editorKeyListener);this.historyManager=j.HistoryManager.create({editor:this});
k.subscribe();this.editorView.installKeyListener(this.editorKeyListener);arguments.callee.base.apply(this,arguments)
},getContent:function(){return this.model.getDocument()},setContent:function(p){return this.model.insertDocument(p)
},setLineNumber:function(p){this.moveAndCenter(p)},setSetting:function(p,q){this.settings.values[p]=q
},onchange:function(p){this.hub.subscribe("editor:document:changed",p)},executeCommand:function(q){try{this.commandLine.executeCommand(q)
}catch(p){}},getSelection:function(r){r=(r!=undefined)?r:this.selection;if(!r){return undefined
}var q=r.startPos;var p=r.endPos;if((p.row<q.row)||((p.row==q.row)&&(p.col<q.col))){var s=q;
q=p;p=s}return{startPos:n.copyPos(q),endPos:n.copyPos(p),startModelPos:this.getModelPos(q),endModelPos:this.getModelPos(p)}
},getCursorPos:function(p){return this.cursorManager.getCursorPosition(p)},getModelPos:function(p){return this.cursorManager.getModelPosition(p)
},computeLayout:function(){var q={left:0,top:0,width:this.ui.clientWidth,height:this.ui.clientHeight};
var p=this.ui;while(p!==null){if(!isNaN(p.offsetLeft)){q.left+=p.offsetLeft}if(!isNaN(p.offsetTop)){q.top+=p.offsetTop
}p=p.parentNode}return q},moveCursor:function(p){this.cursorManager.moveCursor(p)
},resetView:function(p){this.cursorManager.moveCursor(p.cursor);this.setSelection(p.selection);
this.ui.horizontalScrollOffset=0;this.ui.verticalScrollOffset=0},basicView:function(){this.cursorManager.moveCursor({row:0,col:0});
this.setSelection(undefined);this.ui.horizontalScrollOffset=0;this.ui.verticalScrollOffset=0
},getCurrentView:function(){return{cursor:this.getCursorPos(),offset:{x:this.horizontalScrollOffset,y:this.verticalScrollOffset},selection:this.selection}
},getState:function(){return{cursor:this.getCursorPos(),selection:this.getSelection()}
},setState:function(p){this.cursorManager.moveCursor(p.cursor);this.setSelection(p.selection);
this.editorView.ensureCursorVisible();this.paint(false)},defaultTabSize:4,getTabSize:function(){var q=this.defaultTabSize;
var p=this.settings.values.tabsize;if(p>0){q=p}return q},getSelectionAsText:function(){var q="";
var p=this.getSelection();if(p){q=this.model.getChunk(p)}return q},setSelection:function(p){this.selection=p
},paint:function(p){e.RunLoop.begin();this.editorView.set("layerNeedsUpdate",true);
e.RunLoop.end()},changeKeyListener:function(p){this.editorView.installKeyListener(p);
this.editorKeyListener=p},setFocus:function(p){this.editorView.setFocus(p)},setReadOnly:function(p){this.readonly=p
},dispose:function(){this.ui.dispose()},bindKey:function(t,s,q){console.warn("Use of editor.bindKey(",t,s,q,") seems doomed to fail");
var w=o.fillArguments(s);var r=w.key;var p=w.modifiers;if(!r){return}var u=o.toKeyCode(r);
var v="Execute command: '"+t+"'";t=this.editorView.actions[t]||function(){this.commandLine.executeCommand(command,true)
};if(u&&t){if(q){this.editorKeyListener.bindKeyStringSelectable(p,u,t,v)}else{this.editorKeyListener.bindKeyString(p,u,t,v)
}}},bindCommand:function(t,p){var u=o.fillArguments(p);var r=o.toKeyCode(u.key);var q=function(){this.commandLine.executeCommand(t,true)
};var s="Execute command: '"+t+"'";this.editorKeyListener.bindKeyString(u.modifiers,r,q,s)
},moveAndCenter:function(q){if(!q){return}var p=q-1;this.cursorManager.moveCursor({row:p,col:0});
if((p<this.editorView.firstVisibleRow)||(p>=this.editorView.firstVisibleRow+this.editorView.visibleRows)){this.editorView.actions.moveCursorRowToCenter()
}},newFile:function(t,r,q){t=t||this.session.project;r=r||"new.txt";var p=this;var s=function(){if(!this.settings.values.collaborate){p.model.insertDocument(q||"");
p.cursorManager.moveCursor({row:0,col:0});p.setFocus(true)}this.hub.publish("editor:openfile:opensuccess",{project:t,file:{name:r,content:q||"",timestamp:new Date().getTime()}});
this.hub.publish("editor:dirty")};this.files.newFile(t,r,s)},saveFile:function(w,p,v,s){w=w||this.session.project;
p=p||this.session.path;var q="viewData_"+w+"_"+p.split("/").join("_");var x=JSON.stringify(this.getCurrentView());
a.set(q,x,{expires:7});var t={name:p,content:this.model.getDocument(),timestamp:new Date().getTime()};
var u=function(){document.title=p+" - editing with Bespin";this.commandLine.showHint("Saved file: "+t.name);
this.hub.publish("editor:clean");if(i.isFunction(v)){v()}};var r=function(y){this.commandLine.showHint("Save failed: "+y.responseText);
if(i.isFunction(s)){s()}};if(this.settings.values.trimonsave){this.commandLine.executeCommand("trim",true)
}this.file.saveFile(w,t,u,r)},openFile:function(v,q,r){var s,u;var p=this;v=v||this.session.project;
q=q||this.session.path;r=r||{};var t=r.fromFileHistory||false;if(this.session.checkSameFile(v,q)&&!r.reload){if(r.line){this.commandLine.executeCommand("goto "+r.line,true)
}return}if(this.dirty&&!this.session.shouldCollaborate()){s=function(w){this.commandLine.showHint("Trying to save current file. Failed: "+w.responseText)
};u=function(){p.openFile(v,q,r)};this.saveFile(null,null,u,s);return}if(r.force){this.file.whenFileDoesNotExist(v,q,{execute:function(){p.newFile(v,q,r.content||"")
},elseFailed:function(){r.force=false;p.openFile(v,q,r)}});return}s=function(){this.hub.publish("editor:openfile:openfail",{project:v,filename:q})
};u=function(w){if(!w){s();return}if(w.content!==undefined){p.model.insertDocument(w.content);
p.cursorManager.moveCursor({row:0,col:0});p.setFocus(true)}this.session.setProjectPath(v,q);
if(r.line){this.commandLine.executeCommand("goto "+r.line,true)}p._addHistoryItem(v,q,t);
this.hub.publish("editor:openfile:opensuccess",{project:v,file:w});document.title=w+" - editing with Bespin";
this.hub.publish("url:change",{project:v,path:w});this.session.project=v;this.session.path=w
};this.hub.publish("editor:openfile:openbefore",{project:v,filename:q});this.file.editFile(v,q,u,s)
},_addHistoryItem:function(u,p,t){var s=this.settings.values.lastused;if(!s){s=[]
}var q={project:u,filename:p};if(!t){this.session.addFileToHistory(q)}var r=[];s.forEach(function(v){if(v.project!=q.project||v.filename!=q.filename){r.unshift(v)
}});r.unshift(q);s=r;if(s.length>10){s=s.slice(0,10)}this.settings.values.lastused=s
}});g.DefaultEditorKeyListener=e.Object.extend({skipKeypress:false,defaultKeyMap:{},keyMapDescriptions:{},requires:{editor:"editor",hub:"hub"},init:function(){this.keyMap=this.defaultKeyMap
},bindKey:function(u,w,v,t,r,s,p){var q=[u,w,v,t,r].toString();if(typeof s=="string"){this.defaultKeyMap[q]=function(){var x=this._toFire(s);
this.hub.publish(x.name,x.args)}.bind(this)}else{this.defaultKeyMap[q]=s.bind(this.editor.editorView.actions)
}if(p){this.keyMapDescriptions[q]=p}},_toFire:function(p){var r={};if(p.indexOf(";")<0){r.name=p
}else{var q=p.split(";");r.name=q[0];r.args=i.queryToObject(q[1],",")}return r},bindKeyForPlatform:function(r,w,u,q){var p=i.getOS();
var t=r[p]||r.WINDOWS;if(!t){return}var s=o.fillArguments(t);var v=(q)?"bindKeyStringSelectable":"bindKeyString";
this[v](s.modifiers,o.toKeyCode(s.key),w,u)},bindKeyString:function(q,u,t,p){var w=(q.toUpperCase().indexOf("CTRL")!=-1);
var s=(q.toUpperCase().indexOf("ALT")!=-1);var v=(q.toUpperCase().indexOf("META")!=-1)||(q.toUpperCase().indexOf("APPLE")!=-1);
var r=(q.toUpperCase().indexOf("SHIFT")!=-1);if(q.toUpperCase().indexOf("CMD")!=-1){if(i.isMac){v=true
}else{w=true}}return this.bindKey(u,v,w,s,r,t,p)},bindKeyStringSelectable:function(q,s,r,p){this.bindKeyString(q,s,r,p);
this.bindKeyString("SHIFT "+q,s,r)},getPrintableChar:function(p){if(p.charCode>255){return false
}if(p.charCode<32){return false}if((p.altKey||p.metaKey||p.ctrlKey)&&(p.charCode>65&&p.charCode<123)){return false
}return String.fromCharCode(p.charCode)},onkeydown:function(t){if(!this.editor.editorView.hasFocus()){console.log("ignoring keyboard event, we don't have focus",t);
return}var q={event:t,pos:n.copyPos(this.editor.cursorManager.getCursorPosition())};
this.skipKeypress=false;this.returnValue=false;var s=this.keyMap[[t.keyCode,t.metaKey,t.ctrlKey,t.altKey,t.shiftKey]];
var p=false;if(i.isFunction(s)){p=true;try{s(q)}catch(r){console.log("Action caused an error! ",r)
}this.lastAction=s}if(t.metaKey||t.ctrlKey||t.altKey){this.skipKeypress=true;this.returnValue=true
}if(p||!o.passThroughToBrowser(t)){i.stopEvent(t)}},onkeypress:function(s){if(!this.editor.editorView.hasFocus()){console.log("ignoring keyboard event, we don't have focus",s);
return}if((s.metaKey||s.ctrlKey)&&s.charCode>=48&&s.charCode<=57){return}var p=this.getPrintableChar(s);
if(p){this.skipKeypress=false}else{if(this.skipKeypress){if(!o.passThroughToBrowser(s)){i.stopEvent(s)
}return this.returnValue}}var q={event:s,pos:n.copyPos(this.editor.cursorManager.getCursorPosition())};
var t=this.editor.editorView.actions;if(p){q.newchar=String.fromCharCode(s.charCode);
t.insertCharacter(q)}else{var r=this.keyMap[[s.keyCode,s.metaKey,s.ctrlKey,s.altKey,s.shiftKey]];
if(this.lastAction==r){delete this.lastAction}else{if(typeof r=="function"){r(q)}}}i.stopEvent(s)
}})});tiki.module("bespin:editor/mixins/canvas",function(b,a,c){var e=b("sproutcore/runtime:package").SC;
a.Canvas={tagName:"canvas",layerFrame:function(){return this.get("frame")}.property("frame").cacheable(),layoutStyle:function(){var f=this.get("layerFrame");
return{left:"%@px".fmt(f.x),top:"%@px".fmt(f.y)}}.property("layerFrame").cacheable(),renderLayout:function(g,i){arguments.callee.base.apply(this,arguments);
var h=this.get("layerFrame");if(i){g.attr("width",h.width);g.attr("height",h.height);
return}var f=this.$()[0];if(f.width!==h.width){f.width=h.width}if(f.height!==h.height){f.height=h.height
}},drawRect:function(f,g){},render:function(h,l){var k=this.get("layerFrame");if(l){h.attr("width",""+k.width);
h.attr("height",""+k.height);h.push("canvas tag not supported by your browser");return
}var i=e.cloneRect(this.get("clippingFrame"));i.width=k.width;i.height=k.height;var g=this.$()[0];
var f=g.getContext("2d");f.save();var j=this.get("frame");f.translate(j.x-k.x,j.y-k.y);
this.drawRect(f,i);f.restore()},getCharacterWidth:function(f){var g=this.$()[0];if(e.none(g)){return null
}var h=g.getContext("2d");h.save();h.font=f;var i=h.measureText("M").width;h.restore();
return i},guessLineHeight:function(g){var h=this.$()[0];if(e.none(h)){return null
}var i=h.getContext("2d");i.save();i.font=g;var f=Math.floor(i.measureText("m").width*2.8);
i.restore();return f},_bespin_canvas_layerFrameDidChange:function(){this.updateLayout()
}.observes("layerFrame")}});tiki.module("bespin:editor/views/editor",function(require,exports,module){var SC=require("sproutcore/runtime:package").SC;
var bespin=require("package");var syntax=require("syntax");var actions=require("actions");
var keys=require("util/keys");var clipboard=require("util/clipboard");var cursor=require("cursor");
var scroller=require("editor/views/scroller");var canvas=require("editor/mixins/canvas");
var pluginCatalog=require("plugins").catalog;var SelectionHelper=SC.Object.extend({editor:null,getRowSelectionPositions:function(rowIndex){var startCol;
var endCol;var selection=this.editor.getSelection();if(!selection){return undefined
}if((selection.endPos.row<rowIndex)||(selection.startPos.row>rowIndex)){return undefined
}startCol=(selection.startPos.row<rowIndex)?0:selection.startPos.col;endCol=(selection.endPos.row>rowIndex)?-1:selection.endPos.col;
return{startCol:startCol,endCol:endCol}}});bespin.get("settings").addSetting({name:"tabarrow",type:"boolean",defaultValue:true});
exports.EditorView=SC.View.extend(canvas.Canvas,{classNames:"sc-canvas-view",displayProperties:["value","shouldAutoResize"],rowLengthCache:[],searchString:null,toggleCursorFullRepaintCounter:0,toggleCursorFrequency:250,toggleCursorAllowed:true,LINE_HEIGHT:23,BOTTOM_SCROLL_AFFORDANCE:30,LINE_INSETS:{top:0,left:5,right:0,bottom:6},FALLBACK_CHARACTER_WIDTH:10,showCursor:true,hasFocus:false,onInitActions:[],inited:false,lastLineCount:0,lastCursorPos:null,padding:{bottom:0,right:0},hasPadding:true,layerFrame:function(){var parentView=this.get("parentView");
var parentFrame=parentView.get("frame");return{x:0,y:0,width:parentFrame.width,height:parentFrame.height}
}.property(),init:function(){var settings=bespin.get("settings");var ep=pluginCatalog.getExtensionPoint("syntax.engine");
this.syntaxModel=syntax.Model.create();if(ep.extensions.length>0){ep.extensions[0].load(function(model){this.syntaxModel=model.create()
}.bind(this))}this.selectionHelper=SelectionHelper.create({editor:this.editor});this.actions=actions.Actions.create({editor:this.editor});
var wheelEventName=(window.onmousewheel?"onmousewheel":"DOMMouseScroll");setTimeout(function(){this.toggleCursor()
}.bind(this),this.toggleCursorFrequency);arguments.callee.base.apply(this,arguments)
},render:function(context,firstTime){arguments.callee.base.apply(this,arguments);
if(!firstTime){return}context.attr("moz-opaque","true");context.attr("tabindex","1")
},didCreateLayer:function(){var canvas=this.$()[0];SC.Event.add(canvas,"blur",this,function(ev){this.focus=true;
return true});SC.Event.add(canvas,"focus",this,function(ev){this.focus=true;return true
});var editorWrapper=EditorWrapper.create({editor:this.editor,ui:this});clipboard.setup(editorWrapper);
this.onInitActions.forEach(function(action){action()});this.set("rowCount",this.get("content").getRowCount());
this.inited=true},onInit:function(action){if(this.inited){action();return}this.onInitActions.push(action)
},convertClientPointToCursorPoint:function(pos){var settings=bespin.get("settings");
var x,y;var content=this.get("content");var charWidth=this.get("charWidth");var lineHeight=this.get("lineHeight");
if(pos.y<0){y=0}else{if(pos.y>=(lineHeight*content.getRowCount())){y=content.getRowCount()-1
}else{var ty=pos.y;y=Math.floor(ty/lineHeight)}}if(pos.x<=this.LINE_INSETS.left){x=-1
}else{var tx=pos.x-this.LINE_INSETS.left;x=Math.round(tx/charWidth);if(settings.values.strictlines){var maxcol=this.getRowScreenLength(y);
if(x>=maxcol){x=this.getRowScreenLength(y)}}}return{row:y,col:x}},absoluteCoordinatesForEvent:function(ev){return this.convertFrameFromView({x:ev.clientX,y:ev.clientY})
},setSelection:function(e){var content=this.get("content");var absolutePoint=this.absoluteCoordinatesForEvent(e);
var clientY=absolutePoint.y,clientX=absolutePoint.x;if(!this.selectMouseDownPos){return
}var down=cursor.copyPos(this.selectMouseDownPos);var point={x:clientX,y:clientY};
var up=this.convertClientPointToCursorPoint(point);if(down.col==-1){down.col=0;var lineMarker=bespin.get("parser").getLineMarkers()[down.row+1];
if(lineMarker){bespin.get("commandLine").showHint(lineMarker.msg)}}if(up.col==-1){up.col=0
}var modelstart=this.editor.getModelPos(down);var modelend=this.editor.getModelPos(up);
var backwards=false;if(modelend.row<modelstart.row||(modelend.row==modelstart.row&&modelend.col<modelstart.col)){backwards=true;
var temp=modelstart;modelstart=modelend;modelend=temp}if(!content.hasRow(modelstart.row)){modelstart.row=content.getRowCount()-1
}if(!content.hasRow(modelend.row)){modelend.row=content.getRowCount()-1}var detail=this.selectMouseDetail;
var startPos,endPos;if(detail==1){if(cursor.posEquals(modelstart,modelend)){this.editor.setSelection(undefined)
}else{this.editor.setSelection({startPos:this.editor.getCursorPos(backwards?modelend:modelstart),endPos:this.editor.getCursorPos(backwards?modelstart:modelend)})
}this.editor.moveCursor(this.editor.getCursorPos(backwards?modelstart:modelend))}else{if(detail==2){var row=content.rows[modelstart.row];
var cursorAt=row[modelstart.col];var isDelimiter=function(item){var delimiters=["="," ","\t",">","<",".","(",")","{","}",":",'"',"'",";"];
if(delimiters.indexOf(item)>-1){return true}return false};var comparator;if(!cursorAt){this.editor.setSelection({startPos:this.editor.getCursorPos({row:modelstart.row,col:0}),endPos:this.editor.getCursorPos({row:modelstart.row,col:row.length})})
}else{if(isDelimiter(cursorAt.charAt(0))){comparator=function(letter){if(isDelimiter(letter)){return false
}return true};startPos=content.findBefore(modelstart.row,modelstart.col,comparator);
endPos=content.findAfter(modelend.row,modelend.col,comparator);this.editor.setSelection({startPos:this.editor.getCursorPos(backwards?endPos:startPos),endPos:this.editor.getCursorPos(backwards?startPos:endPos)});
this.editor.moveCursor(this.editor.getCursorPos(backwards?startPos:endPos))}else{comparator=function(letter){if(isDelimiter(letter)){return true
}return false};startPos=content.findBefore(modelstart.row,modelstart.col,comparator);
endPos=content.findAfter(modelend.row,modelend.col,comparator);this.editor.setSelection({startPos:this.editor.getCursorPos(backwards?endPos:startPos),endPos:this.editor.getCursorPos(backwards?startPos:endPos)});
this.editor.moveCursor(this.editor.getCursorPos(backwards?startPos:endPos))}}}else{if(detail>2){startPos={row:modelstart.row,col:0};
endPos={row:modelend.row,col:0};if(this.editor.model.hasRow(endPos.row+1)){endPos.row=endPos.row+1
}else{endPos.col=this.editor.model.getRowArray(endPos.row).length}startPos=this.editor.getCursorPos(startPos);
endPos=this.editor.getCursorPos(endPos);this.editor.setSelection({startPos:backwards?endPos:startPos,endPos:backwards?startPos:endPos});
this.editor.moveCursor(backwards?startPos:endPos)}}}this.editor.paint()},toggleCursor:function(){if(this.toggleCursorAllowed){this.showCursor=!this.showCursor
}else{this.toggleCursorAllowed=true}this.toggleCursorFullRepaintCounter++;if(this.toggleCursorFullRepaintCounter>0){this.toggleCursorFullRepaintCounter=0;
this.editor.paint(true)}else{this.editor.paint()}setTimeout(function(){this.toggleCursor()
}.bind(this),this.toggleCursorFrequency)},ensureCursorVisible:function(softEnsure){},handleFocus:function(e){var content=this.get("content");
content.clear();content.insertCharacters({row:0,col:0},e.type);return true},mouseDragged:function(e){if(this.selectMouseDownPos){this.setSelection(e)
}return true},mouseDown:function(e){var absolutePoint=this.absoluteCoordinatesForEvent(e);
var clientY=absolutePoint.y,clientX=absolutePoint.x;this.selectMouseDetail=e.detail;
if(e.shiftKey){this.selectMouseDownPos=(this.editor.selection)?this.editor.selection.startPos:this.editor.getCursorPos();
this.setSelection(e)}else{point={x:clientX,y:clientY};this.selectMouseDownPos=this.convertClientPointToCursorPoint(point)
}var canvas=this.$()[0];canvas.focus();return true},mouseUp:function(e){if(this.selectMouseDownPos){this.setSelection(e);
this.selectMouseDownPos=undefined;this.selectMouseDetail=undefined;return false}return true
},setFocus:function(focus){this.onInit(function(){if(this.focus!=focus){var canvas=this.$()[0];
if(focus){canvas.focus()}else{canvas.blur()}this.focus=focus}}.bind(this))},hasFocus:function(focus){return this.focus
},_getFocusElement:function(){var canvas=this.$()[0];return canvas},installKeyListener:function(listener){this.onInit(function(){this.realInstallKeyListener(listener)
}.bind(this))},realInstallKeyListener:function(listener){var canvas=this.$()[0];var scope=canvas;
if(this.oldkeydown){SC.Event.remove(scope,"keydown",this,this.oldkeydown)}if(this.oldkeypress){SC.Event.remove(scope,"keypress",this,this.oldkeypress)
}this.oldkeydown=function(ev){listener.onkeydown(ev);return true};this.oldkeypress=function(ev){listener.onkeypress(ev);
return true};SC.Event.add(scope,"keydown",this,this.oldkeydown);SC.Event.add(scope,"keypress",this,this.oldkeypress);
var Key=keys.Key;listener.bindKeyStringSelectable("",keys.Key.LEFT_ARROW,this.actions.moveCursorLeft,"Move Cursor Left");
listener.bindKeyStringSelectable("",keys.Key.RIGHT_ARROW,this.actions.moveCursorRight,"Move Cursor Right");
listener.bindKeyStringSelectable("",keys.Key.UP_ARROW,this.actions.moveCursorUp,"Move Cursor Up");
listener.bindKeyStringSelectable("",keys.Key.DOWN_ARROW,this.actions.moveCursorDown,"Move Cursor Down");
listener.bindKeyForPlatform({MAC:"ALT LEFT_ARROW",WINDOWS:"CTRL LEFT_ARROW"},this.actions.moveWordLeft,"Move Word Left",true);
listener.bindKeyForPlatform({MAC:"ALT RIGHT_ARROW",WINDOWS:"CTRL RIGHT_ARROW"},this.actions.moveWordRight,"Move Word Right",true);
listener.bindKeyStringSelectable("",keys.Key.HOME,this.actions.moveToLineStart,"Move to start of line");
listener.bindKeyForPlatform({MAC:"APPLE LEFT_ARROW",WINDOWS:"ALT LEFT_ARROW"},this.actions.moveToLineStart,"Move to start of line",true);
listener.bindKeyStringSelectable("",keys.Key.END,this.actions.moveToLineEnd,"Move to end of line");
listener.bindKeyForPlatform({MAC:"APPLE RIGHT_ARROW",WINDOWS:"ALT RIGHT_ARROW"},this.actions.moveToLineEnd,"Move to end of line",true);
listener.bindKeyString("CTRL",keys.Key.K,this.actions.killLine,"Kill entire line");
listener.bindKeyString("CMD",keys.Key.L,this.actions.gotoLine,"Goto Line");listener.bindKeyString("CTRL",keys.Key.L,this.actions.moveCursorRowToCenter,"Move cursor to center of page");
listener.bindKeyStringSelectable("",keys.Key.BACKSPACE,this.actions.backspace,"Backspace");
listener.bindKeyStringSelectable("CTRL",keys.Key.BACKSPACE,this.actions.deleteWordLeft,"Delete a word to the left");
listener.bindKeyString("",keys.Key.DELETE,this.actions.deleteKey,"Delete");listener.bindKeyString("CTRL",keys.Key.DELETE,this.actions.deleteWordRight,"Delete a word to the right");
listener.bindKeyString("",keys.Key.ENTER,this.actions.newline,"Insert newline");listener.bindKeyString("CMD",keys.Key.ENTER,this.actions.newlineBelow,"Insert newline at end of current line");
listener.bindKeyString("",keys.Key.TAB,this.actions.insertTab,"Indent / insert tab");
listener.bindKeyString("SHIFT",keys.Key.TAB,this.actions.unindent,"Unindent");listener.bindKeyString("CMD",keys.Key.SQUARE_BRACKET_CLOSE,this.actions.indent,"Indent");
listener.bindKeyString("CMD",keys.Key.SQUARE_BRACKET_OPEN,this.actions.unindent,"Unindent");
listener.bindKeyString("",keys.Key.ESCAPE,this.actions.escape,"Clear fields and dialogs");
listener.bindKeyString("CMD",keys.Key.A,this.actions.selectAll,"Select All");listener.bindKeyString("CMD",keys.Key.I,this.actions.toggleQuickopen,"Toggle Quickopen");
listener.bindKeyString("CMD",keys.Key.J,this.actions.focusCommandline,"Open Command line");
listener.bindKeyString("CMD",keys.Key.O,this.actions.focusFileBrowser,"Open File Browser");
listener.bindKeyString("CMD",keys.Key.F,this.actions.cmdFilesearch,"Search in this file");
listener.bindKeyString("CMD",keys.Key.G,this.actions.findNext,"Find Next");listener.bindKeyString("SHIFT CMD",keys.Key.G,this.actions.findPrev,"Find Previous");
listener.bindKeyString("CTRL",keys.Key.M,this.actions.togglePieMenu,"Open Pie Menu");
listener.bindKeyString("CMD",keys.Key.Z,this.actions.undo,"Undo");listener.bindKeyString("SHIFT CMD",keys.Key.Z,this.actions.redo,"Redo");
listener.bindKeyString("CMD",keys.Key.Y,this.actions.redo,"Redo");listener.bindKeyStringSelectable("CMD",keys.Key.UP_ARROW,this.actions.moveToFileTop,"Move to top of file");
listener.bindKeyStringSelectable("CMD",keys.Key.DOWN_ARROW,this.actions.moveToFileBottom,"Move to bottom of file");
listener.bindKeyStringSelectable("CMD",keys.Key.HOME,this.actions.moveToFileTop,"Move to top of file");
listener.bindKeyStringSelectable("CMD",keys.Key.END,this.actions.moveToFileBottom,"Move to bottom of file");
listener.bindKeyStringSelectable("",keys.Key.PAGE_UP,this.actions.movePageUp,"Move a page up");
listener.bindKeyStringSelectable("",keys.Key.PAGE_DOWN,this.actions.movePageDown,"Move a page down");
listener.bindKeyStringSelectable("ALT",keys.Key.UP_ARROW,this.actions.movePageUp,"Move up a block");
listener.bindKeyStringSelectable("ALT",keys.Key.DOWN_ARROW,this.actions.movePageDown,"Move down a block");
listener.bindKeyString("CMD ALT",keys.Key.LEFT_ARROW,this.actions.previousFile);listener.bindKeyString("CMD ALT",keys.Key.RIGHT_ARROW,this.actions.nextFile)
},getHeight:function(){return this.get("lineHeight")*this.get("content").getRowCount()+this.get("padding").bottom
},charWidth:function(){return this.getCharacterWidth(this.editor.theme.editorTextFont)
}.property(),lineHeight:function(key,value){var theme=this.editor.theme;var userLineHeight=theme.lineHeight;
return !SC.none(userLineHeight)?userLineHeight:this.guessLineHeight(theme.editorTextFont)
}.property().cacheable(),textWidth:function(key,value){return this.get("charWidth")*(this.getMaxCols(0,this.get("content").getRowCount()-1)+1)
}.property("content","charWidth"),layout:function(key,value){var origin=this._origin;
if(!SC.none(value)){origin.left=value.left;origin.top=value.top}var canvas=this.$()[0];
if(SC.none(canvas)){return{left:origin.left,top:origin.top,width:32,height:32}}return{left:origin.left,top:origin.top,width:this.LINE_INSETS.left+this.get("textWidth")+this.get("padding").right,height:this.get("lineHeight")*this.get("content").getRowCount()+this.get("padding").bottom}
}.property("canvas","content","lineHeight","padding","textWidth"),_origin:{top:0,left:0},resetCanvas:function(){},fillText:function(ctx,text,x,y){ctx.fillText(text,x,y)
},fillTextWithTransparency:function(ctx,text,x,y){ctx.globalAlpha=0.3;ctx.fillText(text,x,y);
ctx.globalAlpha=1},_firstPaint:false,drawRect:function(ctx,visibleFrame){var content=this.get("content");
if(!this._firstPaint){this.propertyWillChange("layout");this.propertyDidChange("layout",this.get("layout"))
}fullRefresh=true;var ed=this.editor;var c=this.$()[0];var theme=ed.theme;var x,y;
var cy;var currentLine;var Rect=scroller.Rect;var refreshCanvas=fullRefresh;if(!refreshCanvas){refreshCanvas=(this.selectMouseDownPos)
}if(!refreshCanvas){refreshCanvas=(this.lastLineCount!=content.getRowCount())}this.lastLineCount=content.getRowCount();
var cwidth=c.width;var cheight=c.height;var lineHeight=this.get("lineHeight");var firstVisibleRow=Math.floor(visibleFrame.y/lineHeight);
var visibleRows=Math.ceil(visibleFrame.height/lineHeight);var lastLineToRender=Math.min(firstVisibleRow+visibleRows,content.getRowCount()-1);
var virtualheight=this.getHeight();var virtualwidth=this.LINE_INSETS.left+this.get("textWidth");
if(this.editor.debugMode&&bespin.get("editSession")){bespin.getComponent("breakpoints",function(bpmanager){var points=bpmanager.getBreakpoints(bespin.get("editSession").project,bespin.get("editSession").path);
points.forEach(function(point){breakpoints[point.lineNumber]=point})})}if(!refreshCanvas){var dirty=content.getDirtyRows();
if((this.lastCursorPos)&&(this.lastCursorPos.row!=ed.cursorManager.getCursorPosition().row)){dirty[this.lastCursorPos.row]=true
}dirty[ed.cursorManager.getCursorPosition().row]=true}this.lastCursorPos=cursor.copyPos(ed.cursorManager.getCursorPosition());
ctx.save();if(refreshCanvas){ctx.fillStyle=theme.backgroundStyle;ctx.fillRect(visibleFrame.x,visibleFrame.y,visibleFrame.width,visibleFrame.height)
}ctx.save();var charWidth=this.get("charWidth");var firstColumn=0;var lastColumn=firstColumn+Math.ceil(cwidth/charWidth);
y=lineHeight*firstVisibleRow;var cc;var ce;var ri;var regionlen;var tx,tw,tsel;var settings=bespin.get("settings");
var searchStringLength=(this.searchString?this.searchString.length:-1);for(currentLine=firstVisibleRow;
currentLine<=lastLineToRender;currentLine++){x=0;if(!refreshCanvas){if(!dirty[currentLine]){y+=lineHeight;
continue}ctx.save();ctx.beginPath();ctx.rect(x,y,cwidth,lineHeight);ctx.closePath();
ctx.clip();if((currentLine%2)==1){ctx.fillStyle=theme.backgroundStyle;ctx.fillRect(x,y,cwidth,lineHeight)
}}if(settings.values.highlightline&&currentLine==ed.cursorManager.getCursorPosition().row){ctx.fillStyle=theme.highlightCurrentLineColor;
ctx.fillRect(x,y,cwidth,lineHeight)}else{if((currentLine%2)===0){ctx.fillStyle=theme.zebraStripeColor;
ctx.fillRect(x,y,cwidth,lineHeight)}}x+=this.LINE_INSETS.left;cy=y+(lineHeight-this.LINE_INSETS.bottom);
var selections=this.selectionHelper.getRowSelectionPositions(currentLine);if(selections){tx=x+(selections.startCol*charWidth);
tw=(selections.endCol==-1)?(lastColumn-firstColumn)*charWidth:(selections.endCol-selections.startCol)*charWidth;
ctx.fillStyle=theme.editorSelectedTextBackground;ctx.fillRect(tx,y,tw,lineHeight)
}var lineMetadata=content.getRowMetadata(currentLine);var lineText=lineMetadata.lineText;
var searchIndices=lineMetadata.searchIndices;var lineInfo=this.syntaxModel.getSyntaxStylesPerLine(lineText,currentLine,this.editor.language);
var readOnlyAwareFill=ed.readonly?this.fillTextWithTransparency:this.fillText;for(ri=0;
ri<lineInfo.regions.length;ri++){var styleInfo=lineInfo.regions[ri];for(var style in styleInfo){if(!styleInfo.hasOwnProperty(style)){continue
}var thisLine="";var styleArray=styleInfo[style];var currentColumn=0;for(var si=0;
si<styleArray.length;si++){var range=styleArray[si];for(;currentColumn<range.start;
currentColumn++){thisLine+=" "}thisLine+=lineInfo.text.substring(range.start,range.stop);
currentColumn=range.stop}ctx.fillStyle=this.editor.theme[style]||"white";ctx.font=this.editor.theme.editorTextFont;
readOnlyAwareFill(ctx,thisLine,x,cy)}}if(searchIndices){if(selections){tsel={startCol:0,endCol:lineText.length};
if(selections.startCol!=-1){tsel.startCol=selections.startCol}if(selections.endCol!=-1){tsel.endCol=selections.endCol
}}else{tsel=false}for(var i=0;i<searchIndices.length;i++){var index=ed.cursorManager.getCursorPosition({col:searchIndices[i],row:currentLine}).col;
tx=x+index*charWidth;ctx.fillStyle=this.editor.theme.searchHighlight;ctx.fillRect(tx,y,searchStringLength*charWidth,lineHeight);
if(tsel){var indexStart=index;var indexEnd=index+searchStringLength;if(tsel.startCol<indexEnd&&tsel.endCol>indexStart){indexStart=Math.max(indexStart,tsel.startCol);
indexEnd=Math.min(indexEnd,tsel.endCol);ctx.fillStyle=this.editor.theme.searchHighlightSelected;
ctx.fillRect(x+indexStart*charWidth,y,(indexEnd-indexStart)*charWidth,lineHeight)
}}ctx.fillStyle=this.editor.theme.editorTextColor||"white";ctx.fillText(lineText.substring(index,index+searchStringLength),tx,cy)
}}if(settings.values.tabarrow||settings.values.tabshowspace){if(lineMetadata.tabExpansions.length>0){for(i=0;
i<lineMetadata.tabExpansions.length;i++){var expansion=lineMetadata.tabExpansions[i];
var lx=x+(expansion.start*charWidth);var showTabSpace=settings.values.tabshowspace;
if(showTabSpace){var sw=(expansion.end-expansion.start)*charWidth;ctx.fillStyle=this.editor.theme.tabSpace||"white";
ctx.fillRect(lx,y,sw,lineHeight)}var showTabNib=settings.values.tabarrow;if(showTabNib){cy=y+(lineHeight/2);
var cx=lx+(charWidth/2);tw=4;var th=6;tx=parseInt(cx-(tw/2),10);var ty=parseInt(cy-(th/2),10);
ctx.globalAlpha=0.3;ctx.beginPath();ctx.fillStyle=this.editor.theme.plain||"white";
ctx.moveTo(tx,ty);ctx.lineTo(tx,ty+th);ctx.lineTo(tx+tw,ty+parseInt(th/2,10));ctx.closePath();
ctx.fill();ctx.globalAlpha=1}}}}y+=lineHeight}if(this.focus){if(this.showCursor){if(ed.theme.cursorType=="underline"){x=this.LINE_INSETS.left+ed.cursorManager.getCursorPosition().col*charWidth;
y=(ed.getCursorPos().row*lineHeight)+(lineHeight-5);ctx.fillStyle=ed.theme.cursorStyle;
ctx.fillRect(x,y,charWidth,3)}else{x=this.LINE_INSETS.left+ed.cursorManager.getCursorPosition().col*charWidth;
y=(ed.cursorManager.getCursorPosition().row*lineHeight);ctx.fillStyle=ed.theme.cursorStyle;
ctx.fillRect(x,y,1,lineHeight)}}}else{x=this.LINE_INSETS.left+ed.cursorManager.getCursorPosition().col*charWidth;
y=(ed.cursorManager.getCursorPosition().row*lineHeight);ctx.fillStyle=ed.theme.unfocusedCursorFillStyle;
ctx.strokeStyle=ed.theme.unfocusedCursorStrokeStyle;ctx.fillRect(x,y,charWidth,lineHeight);
ctx.strokeRect(x,y,charWidth,lineHeight)}var session=bespin.get("editSession");if(session){var userEntries=session.getUserEntries();
if(userEntries){userEntries.forEach(function(userEntry){if(!userEntry.clientData.isMe){x=this.LINE_INSETS.left+userEntry.clientData.cursor.start.col*charWidth;
y=userEntry.clientData.cursor.start.row*lineHeight;ctx.fillStyle="#ee8c00";ctx.fillRect(x,y,1,lineHeight);
var prevFont=ctx.font;ctx.font="6pt Monaco, Lucida Console, monospace";ctx.fillText(userEntry.handle,x+3,y+lineHeight+4);
ctx.font=prevFont}}.bind(this))}}if(this.changes){this.changes.forEach(function(change){ctx.strokeStyle="#211A16";
ctx.beginPath();x=this.LINE_INSETS.left+180*charWidth;y=change.start.row*lineHeight;
ctx.moveTo(x,y);x=this.LINE_INSETS.left+change.start.col*charWidth;ctx.lineTo(x,y);
y+=lineHeight;ctx.lineTo(x,y);x=this.LINE_INSETS.left;ctx.lineTo(x,y);y=(change.end.row+1)*lineHeight;
ctx.lineTo(x,y);x=this.LINE_INSETS.left+change.end.col*charWidth;ctx.lineTo(x,y);
y=change.end.row*lineHeight;ctx.lineTo(x,y);x=this.LINE_INSETS.left+180*charWidth;
ctx.lineTo(x,y);y=change.start.row*lineHeight;ctx.lineTo(x,y);ctx.stroke()}.bind(this))
}ctx.restore();ctx.restore()},getRowString:function(row){var content=this.get("content");
return content.getRowMetadata(row).lineText},getRowScreenLength:function(row){return this.getRowString(row).length
},getMaxCols:function(firstRow,lastRow){var cols=0;for(var i=firstRow;i<=lastRow;
i++){cols=Math.max(cols,this.getRowScreenLength(i))}return cols},setSearchString:function(str){var content=this.get("content");
if(str&&str!==""){this.searchString=str}else{delete this.searchString}content.searchStringChanged(this.searchString);
this.editor.paint(true)},setChanges:function(changes){this.changes=changes;console.log("changes=",this.changes)
},rowCount:0,_scrollToFrameVisible:function(frame){var clippingFrame=this.get("clippingFrame");
var padding=this.get("padding");var preferredFrame={x:clippingFrame.x,y:clippingFrame.y,width:clippingFrame.width-padding.right,height:clippingFrame.height-padding.bottom};
var targetX;var frameRight=frame.x+frame.width;if(frame.x<preferredFrame.x){targetX=frame.x
}else{if(frameRight>=preferredFrame.x+preferredFrame.width){targetX=frameRight-preferredFrame.width
}else{targetX=preferredFrame.x}}var targetY;var frameBottom=frame.y+frame.height;
if(frame.y<preferredFrame.y){targetY=frame.y}else{if(frameBottom>=preferredFrame.y+preferredFrame.height){targetY=frameBottom-preferredFrame.height
}else{targetY=preferredFrame.y}}if(targetX===preferredFrame.x&&targetY===preferredFrame.y){return false
}var scrollable=this;do{scrollable=scrollable.get("parentView");if(scrollable===null){return false
}}while(scrollable.get("isScrollable")!==true);scrollable.scrollToVisible();return scrollable.scrollTo(targetX,targetY)
},_scrollToCharVisible:function(pos){var charWidth=this.get("charWidth");var lineHeight=this.get("lineHeight");
return this._scrollToFrameVisible({x:pos.col===0?0:this.LINE_INSETS.left+pos.col*charWidth,y:pos.row*lineHeight,width:charWidth,height:lineHeight})
},_scrollToCursorVisible:function(){var cursorPos=this.editor.cursorManager.getCursorPosition();
return this._scrollToCharVisible(cursorPos)},_updateRowCount:function(){this.set("rowCount",this.get("content").getRowCount())
},cursorDidMove:function(sender,newPosition){SC.RunLoop.begin();this.propertyWillChange("layout");
this.propertyDidChange("layout",this.get("layout"));this._scrollToCursorVisible();
this._updateRowCount();SC.RunLoop.end()},textStorageEdited:function(sender){SC.RunLoop.begin();
this.notifyPropertyChange("layout",this.get("layout"));this._updateRowCount();SC.RunLoop.end()
},dispose:function(){},_bespin_editorView_parentViewFrameDidChange:function(){this.propertyWillChange("layerFrame");
this.propertyDidChange("layerFrame",this.get("layerFrame"))}.observes("*parentView.frame")});
bespin.subscribe("settings:set:cursorblink",function(event){var ms=parseInt(event.value,10);
if(ms){var editor=bespin.get("editor");editor.ui.toggleCursorFrequency=ms}});bespin.subscribe("settings:set:fontsize",function(event){var editor=bespin.get("editor");
var fontsize=parseInt(event.value,10);editor.theme.editorTextFont=editor.theme.editorTextFont.replace(/[0-9]{1,}pt/,fontsize+"pt");
editor.theme.lineNumberFont=editor.theme.lineNumberFont.replace(/[0-9]{1,}pt/,fontsize+"pt")
});bespin.get("settings").addSetting({name:"fontsize",type:"number",defaultValue:10});
bespin.subscribe("settings:set:theme",function(event){var editor=bespin.get("editor");
var settings=bespin.get("settings");var files=bespin.get("files");var theme=event.value;
var checkSetAndExit=function(){var themeSettings=themes[theme];if(themeSettings){if(themeSettings!=editor.theme){editor.theme=themeSettings
}return true}return false};if(theme){if(checkSetAndExit()){return true}try{var req=require;
req.call(window,"themes."+theme);if(checkSetAndExit()){return true}}catch(e){console.log("Unable to load theme: "+theme,e)
}var onSuccess=function(file){try{eval(file.content)}catch(e){console.log("Error with theme loading: ",e)
}if(!checkSetAndExit()){bespin.get("commandLine").addErrorOutput("Sorry old chap. No theme called '"+theme+"'. Fancy making it?")
}};var onFailure=function(){bespin.get("commandLine").addErrorOutput("Sorry old chap. No theme called '"+theme+"'. Fancy making it?")
};files.loadContents(files.userSettingsProject,"/themes/"+theme+".js",onSuccess,onFailure)
}return false});var EditorWrapper=SC.Object.extend({editor:null,ui:null,focus:function(){this.ui.setFocus(true)
},hasFocus:function(){return this.ui.hasFocus()},getFocusElement:function(){return this.ui._getFocusElement()
},removeSelection:function(){var selectionObject=this.editor.getSelection();var text=null;
if(selectionObject){text=this.editor.model.getChunk(selectionObject);if(text&&text!==""){this.ui.actions.beginEdit("cut");
this.ui.actions.deleteSelection(selectionObject);this.ui.actions.endEdit()}}return text
},getSelection:function(){return this.editor.getSelectionAsText()},replaceSelection:function(text){var args=cursor.buildArgs();
args.chunk=text;if(args.chunk){this.ui.actions.beginEdit("paste");this.ui.actions.insertChunk(args);
this.ui.actions.endEdit()}},installEditorOnly:function(){this.editor.bindKey("copySelection","CMD C");
this.editor.bindKey("pasteFromClipboard","CMD V");this.editor.bindKey("cutSelection","CMD X")
}})});tiki.module("bespin:editor/views/gutter",function(e,b,f){var h=e("sproutcore/runtime:package").SC;
var c=e("editor/mixins/canvas");var a={left:5,right:10,bottom:6};var g={bottom:6};
b.GutterView=h.View.extend(c.Canvas,{classNames:"sc-gutter-view",tagName:"canvas",editorView:null,rowCount:0,theme:{gutterStyle:"#4c4a41",lineNumberColor:"#e5c138",lineNumberFont:"10pt Monaco, Lucida Console, monospace",editorTextFont:"10pt Monaco, Lucida Console, monospace"},layout:function(l,m){var j=this._origin;
if(!h.none(m)){j.left=m.left;j.top=m.top}var k=this.$()[0];if(h.none(k)){return{left:j.left,top:j.top,width:0,height:0}
}var i=this.get("rowCount");return{left:j.left,top:j.top,width:a.left+i.toString().length*this.get("_charWidth")+a.right,height:i*this.get("_lineHeight")}
}.property("_charWidth","_lineHeight","rowCount"),_origin:{left:0,top:0},layerFrame:function(){return{x:0,y:0,width:this.get("layout").width,height:this.get("parentView").get("frame").height}
}.property("layout","parentView"),_charWidth:function(){return this.getCharacterWidth(this.get("theme").editorTextFont)
}.property("theme").cacheable(),_lineHeight:function(){var i=this.get("theme");var j=i.lineHeight;
return !h.none(j)?j:this.guessLineHeight(i.editorTextFont)}.property("theme").cacheable(),drawRect:function(i,k){var l=this.get("theme");
i.fillStyle=l.gutterStyle;i.fillRect(0,k.y,k.width,k.height);var j=this.get("_lineHeight");
var o=Math.floor(k.y/j);var n=Math.min(this.get("rowCount")-1,Math.ceil((k.y+k.height)/j));
for(var m=o;m<=n;m++){i.fillStyle=l.lineNumberColor;i.font=l.lineNumberFont;i.fillText(""+(m+1),a.left,(m+1)*j-g.bottom)
}},_bespin_gutterView_parentViewFrameDidChange:function(){this.propertyWillChange("layerFrame");
this.propertyDidChange("layerFrame",this.get("layerFrame"))}.observes("*parentView.frame"),_bespin_gutterView_rowCountDidChange:function(){this.updateLayout();
this.set("layerNeedsUpdate",true)}.observes("rowCount"),_bespin_gutterView_frameDidChange:function(){this.set("layerNeedsUpdate",true)
}.observes("frame")})});tiki.module("bespin:editor/views/scroll",function(c,b,e){var g=c("sproutcore/runtime:package").SC;
var f=c("editor/views/gutter");var a=c("editor/views/scroller");b.BespinScrollView=g.ScrollView.extend({_gutterViewInstantiated:false,gutterView:f.GutterView,hasHorizontalScroller:true,autohidesHorizontalScroller:false,horizontalScrollerView:a.BespinScrollerView,hasVerticalScroller:true,autohidesVerticalScroller:false,verticalScrollerView:a.BespinScrollerView,horizontalScrollerThickness:24,verticalScrollerThickness:24,tile:function(){var k=this.get("gutterView");
if(this._gutterViewInstantiated===false){this._gutterViewInstantiated=true;var n=this;
k=this.createChildView(k,{rowCountBinding:"*parentView.contentView.rowCount",didCreateLayer:function(){n.tile();
this.set("layerNeedsUpdate",true)}});this.childViews.push(k);this.set("gutterView",k);
k.addObserver("frame",this,this.tile);return}var i=k.get("frame");this.get("containerView").set("layout",{left:i.width,bottom:0,top:0,right:0});
var m=this.get("horizontalScrollerView");var l=this.get("verticalScrollerView");var q=this.get("isHorizontalScrollerVisible");
var h=this.get("isVerticalScrollerVisible");var j=this.get("horizontalScrollerThickness");
var o=this.get("verticalScrollerThickness");if(q){m=this.get("horizontalScrollerView");
m.set("scrollerThickness",j);m.set("padding",{top:0,bottom:6,left:6,right:6+o});m.set("layout",{left:i.width,bottom:0,right:0,height:j})
}if(h){l=this.get("verticalScrollerView");l.set("scrollerThickness",o);l.set("padding",{left:0,right:6,top:6,bottom:6+j});
l.set("layout",{top:0,right:0,bottom:0,width:o})}var p=this.get("contentView");if(p.get("hasPadding")===true){this.get("contentView").set("padding",{bottom:j+6,right:o+6})
}},_bespin_BespinScrollView_verticalScrollOffsetDidChange:function(){this.get("gutterView").adjust({left:0,top:-Math.min(this.get("verticalScrollOffset"),this.get("maximumVerticalScrollOffset"))})
}.observes("verticalScrollOffset")})});tiki.module("bespin:editor/views/scroller",function(e,h,a){var c=e("sproutcore/runtime:package").SC;
var b=e("editor/mixins/canvas");var i=3;var j=5;var g=15;var f=8;h.BespinScrollerView=c.View.extend(b.Canvas,{classNames:["bespin-scroller-view"],_mouseDownScreenPoint:null,_mouseDownValue:null,_isMouseOver:false,_value:0,_bespinScrollerView_valueDidChange:function(){this.set("layerNeedsUpdate",true)
}.observes("value"),_bespinScrollerView_maximumDidChange:function(){this.set("layerNeedsUpdate",true)
}.observes("maximum"),theme:{backgroundStyle:"#2A211C",partialNibStyle:"rgba(100, 100, 100, 0.3)",partialNibArrowStyle:"rgba(255, 255, 255, 0.3)",partialNibStrokeStyle:"rgba(150, 150, 150, 0.3)",fullNibStyle:"rgb(100, 100, 100)",fullNibArrowStyle:"rgb(255, 255, 255)",fullNibStrokeStyle:"rgb(150, 150, 150)",scrollTrackFillStyle:"rgba(50, 50, 50, 0.8)",scrollTrackStrokeStyle:"rgb(150, 150, 150)",scrollBarFillStyle:"rgba(0, 0, 0, %a)",scrollBarFillGradientTopStart:"rgba(90, 90, 90, %a)",scrollBarFillGradientTopStop:"rgba(40, 40, 40, %a)",scrollBarFillGradientBottomStart:"rgba(22, 22, 22, %a)",scrollBarFillGradientBottomStop:"rgba(44, 44, 44, %a)"},scrollerThickness:c.NATURAL_SCROLLER_THICKNESS,minimumHandleSize:20,lineHeight:15,layoutDirection:c.LAYOUT_VERTICAL,isEnabled:true,ownerScrollValueKey:function(){switch(this.get("layoutDirection")){case c.LAYOUT_VERTICAL:return"verticalScrollOffset";
case c.LAYOUT_HORIZONTAL:return"horizontalScrollOffset";default:return null}}.property("layoutDirection").cacheable(),padding:{left:0,bottom:0,top:0,right:0},_clientFrame:function(){var l=this.get("frame"),k=this.get("padding");
return{x:k.left,y:k.top,width:l.width-(k.left+k.right),height:l.height-(k.top+k.bottom)}
}.property("frame","padding").cacheable(),_clientThickness:function(){var l=this.get("padding");
var k=this.get("scrollerThickness");switch(this.get("layoutDirection")){case c.LAYOUT_VERTICAL:return k-(l.left+l.right);
case c.LAYOUT_HORIZONTAL:return k-(l.top+l.bottom);default:console.assert(false,"unknown layout direction");
return null}}.property("layoutDirection","padding","scrollerThickness").cacheable(),_gutterFrame:function(){var k=this.get("_clientFrame");
var l=this.get("_clientThickness");switch(this.get("layoutDirection")){case c.LAYOUT_VERTICAL:return{x:k.x,y:k.y+g,width:l,height:Math.max(0,k.height-2*g)};
case c.LAYOUT_HORIZONTAL:return{x:k.x+g,y:k.y,width:Math.max(0,k.width-2*g),height:l};
default:console.assert(false,"unknown layout direction");return null}}.property("_clientFrame","_clientThickness","layoutDirection").cacheable(),_gutterLength:function(){var l=this.get("_gutterFrame");
var k;switch(this.get("layoutDirection")){case c.LAYOUT_HORIZONTAL:k=l.width;break;
case c.LAYOUT_VERTICAL:k=l.height;break;default:console.assert(false,"unknown layout direction");
break}return k}.property("_gutterFrame","layoutDirection").cacheable(),_frameLength:function(){var k=this.get("frame");
switch(this.get("layoutDirection")){case c.LAYOUT_HORIZONTAL:return k.width;case c.LAYOUT_VERTICAL:return k.height;
default:console.assert(false,"unknown layout direction");return null}}.property("frame","layoutDirection").cacheable(),_clientLength:function(){var k=this.get("_clientFrame");
switch(this.get("layoutDirection")){case c.LAYOUT_HORIZONTAL:return k.width;case c.LAYOUT_VERTICAL:return k.height;
default:console.assert(false,"unknown layout direction");return null}}.property("_clientFrame","layoutDirection").cacheable(),_handleFrame:function(){var m=this.get("value");
var p=this.get("maximum");var o=this.get("frame");var k=this.get("_clientFrame");
var n=this.get("_gutterFrame");var l=this.get("_clientThickness");switch(this.get("layoutDirection")){case c.LAYOUT_VERTICAL:return{x:k.x,y:k.y+g+m*n.height/p,width:l,height:Math.min(o.height,p)*n.height/p};
case c.LAYOUT_HORIZONTAL:return{x:k.x+g+m*n.width/p,y:k.y,width:Math.min(o.width,p)*n.width/p,height:l};
default:console.assert(false,"unknown layout direction");return null}}.property("_clientFrame","_clientThickness","_gutterFrame","maximum","value").cacheable(),maximumValue:function(){return Math.max(this.get("maximum")-this.get("_frameLength"),0)
}.property("_frameLength","maximum").cacheable(),value:function(l,m){var k=this.get("maximumValue");
if(m!==undefined){if(m<0){m=0}else{if(m>k){m=k}}this._value=m;return m}return Math.min(this._value||0,k)
}.property("maximumValue").cacheable(),maximum:0,_segmentForMouseEvent:function(l){var k=this.convertFrameFromView({x:l.pageX,y:l.pageY});
var m=this.get("_clientFrame");if(!c.pointInRect(k,m)){return null}var o=this.get("layoutDirection");
switch(o){case c.LAYOUT_HORIZONTAL:if(k.x<g){return"nib-start"}else{if(k.x>=m.width-g){return"nib-end"
}}break;case c.LAYOUT_VERTICAL:if(k.y<g){return"nib-start"}else{if(k.y>=m.height-g){return"nib-end"
}}break;default:console.assert(false,"unknown layout direction");break}var n=this.get("_handleFrame");
if(c.pointInRect(k,n)){return"handle"}switch(o){case c.LAYOUT_HORIZONTAL:if(k.x<n.x){return"gutter-before"
}else{if(k.x>=n.x+n.width){return"gutter-after"}}break;case c.LAYOUT_VERTICAL:if(k.y<n.y){return"gutter-before"
}else{if(k.y>=n.y+n.height){return"gutter-after"}}break;default:console.assert(false,"unknown layout direction");
break}console.assert(false,"_segmentForMouseEvent: point ",k," outside view with handle frame ",n," and client frame ",m);
return null},mouseEntered:function(k){c.RunLoop.begin();this._isMouseOver=true;this.set("layerNeedsUpdate",true);
c.RunLoop.end()},mouseExited:function(k){c.RunLoop.begin();this._isMouseOver=false;
this._mouseDownScreenPoint=null;this.set("layerNeedsUpdate",true);c.RunLoop.end()
},mouseWheel:function(k){c.RunLoop.begin();var l;switch(this.get("layoutDirection")){case c.LAYOUT_HORIZONTAL:l=k.wheelDeltaX;
break;case c.LAYOUT_VERTICAL:l=k.wheelDeltaY;break;default:console.assert(false,"unknown layout direction");
return}this.set("value",this.get("value")+2*l);c.RunLoop.end()},mouseDown:function(k){c.RunLoop.begin();
var m=this.get("value");var l=this.get("_gutterLength");switch(this._segmentForMouseEvent(k)){case"nib-start":this.set("value",m-this.get("lineHeight"));
break;case"nib-end":this.set("value",m+this.get("lineHeight"));break;case"gutter-before":this.set("value",m-l);
break;case"gutter-after":this.set("value",m+l);break;case"handle":switch(this.get("layoutDirection")){case c.LAYOUT_HORIZONTAL:this._mouseDownScreenPoint=k.clientX;
break;case c.LAYOUT_VERTICAL:this._mouseDownScreenPoint=k.clientY;break;default:console.assert(false,"unknown layout direction");
break}default:console.assert("_segmentForMouseEvent returned an unknown value");break
}c.RunLoop.end()},mouseUp:function(k){this._mouseDownScreenPoint=null;this._mouseDownValue=null
},mouseMoved:function(l){c.RunLoop.begin();if(this._mouseDownScreenPoint!==null){var m;
switch(this.get("layoutDirection")){case c.LAYOUT_HORIZONTAL:m=l.clientX;break;case c.LAYOUT_VERTICAL:m=l.clientY;
break;default:console.assert(false,"unknown layout direction");break}var k=m-this._mouseDownScreenPoint;
var o=this.get("maximum");var n=this.get("_gutterLength");this.set("value",this.get("value")+k*o/n);
this._mouseDownScreenPoint=m}c.RunLoop.end()},_drawNib:function(k){var o=this.get("theme");
var m,l,p;if(this._isMouseOver){m=o.fullNibStyle;l=o.fullNibArrowStyle;p=o.fullNibStrokeStyle
}else{m=o.partialNibStyle;l=o.partialNibArrowStyle;p=o.partialNibStrokeStyle}var n=Math.floor(g/2);
k.fillStyle=m;k.beginPath();k.arc(0,0,Math.floor(g/2),0,Math.PI*2,true);k.closePath();
k.fill();k.strokeStyle=p;k.stroke();k.fillStyle=l;k.beginPath();k.moveTo(0,-n+i);
k.lineTo(-n+i,n-j);k.lineTo(n-i,n-j);k.closePath();k.fill()},_drawNibs:function(l){var k=this._isMouseOver;
var m=this.get("_clientThickness");var n=this.get("value");if(k||n!==0){l.save();
l.translate(f,m/2);l.rotate(Math.PI*1.5);l.moveTo(0,0);this._drawNib(l);l.restore()
}if(k||n!==this.get("maximumValue")){l.save();l.translate(this.get("_clientLength")-f,m/2);
l.rotate(Math.PI*0.5);l.moveTo(0,0);this._drawNib(l);l.restore()}},drawRect:function(y,o){var l=(y.globalAlpha)?y.globalAlpha:1;
var n=this.get("theme");var k=this.get("frame");y.clearRect(0,0,k.width,k.height);
y.save();var v=this.get("padding");y.translate(v.left,v.top);var r=this.get("_handleFrame");
var q=this.get("_gutterLength");var u=this.get("_clientThickness");var p=u/2;var m=this.get("layoutDirection");
var x,w;switch(m){case c.LAYOUT_VERTICAL:x=r.y-v.top;w=r.height;y.translate(u+1,0);
y.rotate(Math.PI*0.5);break;case c.LAYOUT_HORIZONTAL:x=r.x-v.left;w=r.width;break;
default:console.assert(false,"unknown layout direction");break}if(this.get("isEnabled")===false||q<=w){return
}if(this._isMouseOver===false){y.globalAlpha=0.3}else{var t=this.get("_clientLength");
y.fillStyle=n.scrollTrackFillStyle;y.fillRect(f+0.5,0.5,t-2*f,u-1);y.strokeStyle=n.scrollTrackStrokeStyle;
y.strokeRect(f+0.5,0.5,t-2*f,u-1)}var z=function(){y.beginPath();y.arc(x+p+0.5,p,p-0.5,Math.PI/2,3*Math.PI/2,false);
y.arc(x+w-p-0.5,p,p-0.5,3*Math.PI/2,Math.PI/2,false);y.lineTo(x+p+0.5,u-0.5);y.closePath()
};z();var s=y.createLinearGradient(x,0,x,u);s.addColorStop(0,n.scrollBarFillGradientTopStart.replace(/%a/,l));
s.addColorStop(0.4,n.scrollBarFillGradientTopStop.replace(/%a/,l));s.addColorStop(0.41,n.scrollBarFillStyle.replace(/%a/,l));
s.addColorStop(0.8,n.scrollBarFillGradientBottomStart.replace(/%a/,l));s.addColorStop(1,n.scrollBarFillGradientBottomStop.replace(/%a/,l));
y.fillStyle=s;y.fill();y.save();y.clip();y.fillStyle=n.scrollBarFillStyle.replace(/%a/,l);
y.beginPath();y.moveTo(x+p*0.4,p*0.6);y.lineTo(x+p*0.9,u*0.4);y.lineTo(x,u*0.4);y.closePath();
y.fill();y.beginPath();y.moveTo(x+w-(p*0.4),0+(p*0.6));y.lineTo(x+w-(p*0.9),0+(u*0.4));
y.lineTo(x+w,0+(u*0.4));y.closePath();y.fill();y.restore();y.save();z();y.strokeStyle=n.scrollTrackStrokeStyle;
y.stroke();y.restore();if(this._isMouseOver===false){y.globalAlpha=1}this._drawNibs(y);
y.restore()}})});tiki.module("bespin:embed",function(e,b,g){e("util/globals");var i=e("sproutcore/runtime:package").SC;
var c=e("package");var f=e("util/container");var a=e("util/util");var h=function(j){var k={top:0,left:0,width:j.clientWidth,height:j.clientHeight};
while(!i.none(j)){k.top+=j.offsetTop+j.clientTop;k.left+=j.offsetLeft+j.clientLeft;
j=j.offsetParent}return k};b.useBespin=function(l,k){k=k||{};if(a.isString(l)){l=document.getElementById(l)
}if(!l){throw new Error("useBespin requires a element parameter to attach to")}var n=l.innerHTML;
var m;var j=f.Container.create();c.container=j;i.run(function(){j.register("container",l);
m=j.get("editor");var q=i.Pane.create({layout:h(l),layoutStyle:function(){var s=this.get("layout");
var r={width:""+s.width+"px",height:""+s.height+"px"};return r}.property("layout")});
q.appendChild(m.ui,null);i.$(l).css("position","relative");l.innerHTML="";q.appendTo(l);
m.element=l;m.pane=q;if(k.initialContent){n=k.initialContent}m.model.insertDocument(n);
if(k.settings){for(var o in k.settings){if(k.settings.hasOwnProperty(o)){m.setSetting(o,k.settings[o])
}}}if(k.stealFocus){m.setFocus(true)}if(k.lineNumber){m.setLineNumber(k.lineNumber)
}if(i.none(k.dontHookWindowResizeEvent)||!k.dontHookWindowResizeEvent){var p=function(){b.dimensionsChanged(m)
};if(!i.none(window.addEventListener)){window.addEventListener("resize",p,false)}else{if(!i.none(window.attachEvent)){window.addEventListener("onresize",p)
}}}});return m};b.dimensionsChanged=function(k){i.RunLoop.begin();var m=k.pane;var j=m.get("layout");
var l=h(k.element);if(!i.rectsEqual(j,l)){m.adjust(l);m.updateLayout()}i.RunLoop.end()
}});tiki.module("bespin:events",function(e,b,f){var c=e("package");var a=e("util/util");
b.subscribe=function(){c.subscribe("url:change",function(h){var k=a.queryToObject(location.hash.substring(1));
k.project=h.project;k.path=h.path;var j=[];for(var g in k){var i=k[g];j.push(g+"="+i)
}window.location.hash=j.join("&")});c.subscribe("url:changed",function(g){c.get("editor").openFile(null,g.now.get("path"))
});c.subscribe("cmdline:focus",function(g){c.get("editor").setFocus(false)});c.subscribe("cmdline:blur",function(g){c.get("editor").setFocus(true)
});c.subscribe("editor:document:changed",function(g){c.publish("editor:dirty")});
c.subscribe("editor:dirty",function(g){c.get("editor").dirty=true});c.subscribe("editor:clean",function(g){c.get("editor").dirty=false
})}});tiki.module("bespin:history",function(c,a,e){var b=c("package");var f=c("sproutcore/runtime:package").SC;
a.HistoryManager=f.Object.extend({history:[],historyPosition:-1,disableAdding:false,clear:function(){this.history=[];
this.historyPosition=-1;this.disableAdding=false},getRange:function(h,g){},replaceRange:function(i,g,h){this.history.splice(i,g-i+1,h)
},truncate:function(g){this.history.length=g+1;this.historyPosition=Math.min(this.historyPosition,this.history.length-1)
},getCurrent:function(){return this.historyPosition},undo:function(){if(this.historyPosition<0){return
}var h=this.history[this.historyPosition];this.disableAdding=true;try{h.undo()}catch(g){console.error("There was an error in an undo action: ");
console.error(g)}this.disableAdding=false;this.historyPosition--},redo:function(){if(this.historyPosition>=this.history.length-1){return
}var g=this.history[this.historyPosition+1];this.disableAdding=true;try{g.redo()}catch(h){console.error("There was an error in an undo action: ");
console.error(h)}this.disableAdding=false;this.historyPosition++},add:function(g){if(this.disableAdding){return
}this.history.length=this.historyPosition+1;this.history.push(g);this.historyPosition++
},canUndo:function(){return this.historyPosition>-1},canRedo:function(){return this.historyPosition<this.history.length-1
}});b.subscribe("editor:openfile:opensuccess",function(){b.get("editor").historyManager.clear()
})});tiki.module("bespin:model",function(e,b,f){var h=e("sproutcore/runtime:package").SC;
var c=e("package");var a=e("util/util");var g=e("cursor");b.DocumentModel=h.Object.extend({editor:null,layoutManager:function(){return this.editor.editorView
}.property(),init:function(){this.clear()},addHistoryItem:function(i,j){this.history.length=this.historyIndex+1;
this.history.push({func:i,data:j});this.historyIndex++},performHistoryItem:function(j){var i=j.func;
var k=j.data;switch(i){case"deleteCharacters":this.deleteCharacters(k.pos,k.characters.length,true);
break;case"insertCharacters":this.insertCharacters(k.pos,k.characters,true);break;
case"deleteChunk":this.deleteChunk(k.selection,k.chunk,true);break;case"insertChunk":this.insertChunk(k.selection.startModelPos,k.chunk,true);
break;case"joinRow":this.joinRow(k.selection.startModelPos.row,true);break;case"replaceRow":this.replaceRow(k.row,j.undo?k.oldline:k.newline,true);
break}},unperformHistoryItem:function(j){var i=j.func;var k=j.data;switch(i){case"deleteCharacters":i="insertCharacters";
break;case"insertCharacters":i="deleteCharacters";break;case"deleteChunk":i="insertChunk";
break;case"insertChunk":i="deleteChunk";break;case"joinRow":i="insertChunk";break
}this.performHistoryItem({func:i,data:k,undo:true})},applyState:function(k){if(k>=this.history.length||k<-1){return
}else{if(k==this.historyIndex){return}}var j,l;if(k>this.historyIndex){for(j=this.historyIndex+1;
j<=k;j++){l=this.history[j];this.performHistoryItem(l)}}else{for(j=this.historyIndex;
j>k;j--){l=this.history[j];this.unperformHistoryItem(l)}}this.historyIndex=k},getState:function(){return this.historyIndex
},isEmpty:function(){if(this.rows.length>1){return false}if(this.rows.length==1&&this.rows[0].length>0){return false
}return true},getDirtyRows:function(){var i=(this.dirtyRows)?this.dirtyRows:[];this.dirtyRows=null;
return i},setRowDirty:function(i){if(!this.dirtyRows){this.dirtyRows=new Array(this.rows.length)
}this.dirtyRows[i]=true},isRowDirty:function(i){if(!this.dirtyRows){return true}return this.dirtyRows[i]
},setRowArray:function(j,i){if(!Array.isArray(i)){i=i.split("")}this.rows[j]=i},getRowArray:function(i){while(this.rows.length<=i){this.rows.push([])
}return this.rows[i]},hasRow:function(i){return(this.rows[i])},insertCharacters:function(i,j,m){var l=this.getRowArray(i.row);
while(l.length<i.col){l.push(" ")}var k=(i.col>0)?l.splice(0,i.col):[];k=k.concat(j.split(""));
this.rows[i.row]=k.concat(l);this.setRowDirty(i.row);if(!m){this.addHistoryItem("insertCharacters",{pos:g.copyPos(i),characters:j})
}this._sendTextEditedNotification()},getDocument:function(){var j=[];for(var i=0;
i<this.getRowCount();i++){j[i]=this.getRowArray(i).join("")}return j.join("\n")},insertDocument:function(j){this.clear();
var k=j.split("\n");for(var i=0;i<k.length;i++){this.insertCharacters({row:i,col:0},k[i],true)
}},changeEachRow:function(j){for(var i=0;i<this.getRowCount();i++){var k=this.getRowArray(i);
k=j(k);this.setRowArray(i,k)}},replace:function(m,l){var n=new RegExp(m,"g");for(var i=0;
i<this.getRowCount();i++){var j=this.getRowArray(i).join("");var k=j.replace(n,l);
if(k!=j){this.replaceRow(i,k)}}},replaceRow:function(l,i,k){var j=this.getRowArray(l).join("");
this.rows[l]=i.split("");if(!k){this.addHistoryItem("replaceRow",{row:l,oldline:j,newline:i})
}},deleteCharacters:function(j,k,n){var m=this.getRowArray(j.row);var l=(j.col+k-1)-m.length;
if(l>0){k-=l}if(k>0){this.setRowDirty(j.row);this.editor.editorView.syntaxModel.invalidateCache(j.row);
var i=m.splice(j.col,k).join("");if(!n){this.addHistoryItem("deleteCharacters",{pos:g.copyPos(j),characters:i})
}return i}return""},clear:function(){this.rows=[];this.cacheRowMetadata=[];this.history=[];
this.historyIndex=-1},deleteRows:function(k,i){var j=(k+i-1)-this.rows.length;if(j>0){i-=j
}if(i>0){this.rows.splice(k,i);this.cacheRowMetadata.splice(k,i)}},splitRow:function(i){this.editor.editorView.syntaxModel.invalidateCache(i.row);
this.setRowDirty(i.row);var m=this.getRowArray(i.row);var j=[];if(i.col<m.length){j=j.concat(m.splice(i.col))
}if(i.row==(this.rows.length-1)){this.rows.push(j)}else{var k=this.rows.splice(0,i.row+1);
k.push(j);k=k.concat(this.rows);this.rows=k;var l=this.cacheRowMetadata.splice(0,i.row+1);
l.push(undefined);this.cacheRowMetadata=l.concat(this.cacheRowMetadata)}},joinRow:function(n,l){this.editor.editorView.syntaxModel.invalidateCache(n);
this.setRowDirty(n);if(n>=this.rows.length-1){return}var k=this.getRowArray(n);var j=this.rows[n+1];
var i=k.length;this.rows[n]=k.concat(j);this.rows.splice(n+1,1);this.cacheRowMetadata.splice(n+1,1);
if(!l){var m={row:n,col:i};this.addHistoryItem("joinRow",{selection:{startModelPos:m,endModelPos:m},chunk:"\n"})
}},getRowCount:function(){return this.rows.length},getChunk:function(m){var l=m.startModelPos;
var n=m.endModelPos;var p,q;var j="";p=l.col;var o=this.getRowArray(l.row);q=(n.row==l.row)?n.col:o.length;
if(q>o.length){q=o.length}j+=o.join("").substring(p,q);for(var k=l.row+1;k<n.row;
k++){j+="\n";j+=this.getRowArray(k).join("")}if(l.row!=n.row){p=0;q=n.col;o=this.getRowArray(n.row);
if(q>o.length){q=o.length}j+="\n"+o.join("").substring(p,q)}return j},deleteChunk:function(p,o){var n=this.getChunk(p);
var i=p.startModelPos;var m=p.endModelPos;this.editor.editorView.syntaxModel.invalidateCache(i.row);
var k,j;k=i.col;var q=this.getRowArray(i.row);j=(m.row==i.row)?m.col:q.length;if(j>q.length){j=q.length
}var l={row:i.row,col:k};this.deleteCharacters(l,j-k,true);if(i.row!=m.row){k=0;j=m.col;
q=this.getRowArray(m.row);if(j>q.length){j=q.length}l={row:m.row,col:k};this.deleteCharacters(l,j-k,true)
}if((m.row-i.row)>1){this.deleteRows(i.row+1,m.row-i.row-1)}if(m.row!=i.row){this.joinRow(i.row,true)
}if(!o){this.addHistoryItem("deleteChunk",{selection:{startModelPos:g.copyPos(p.startModelPos),endModelPos:g.copyPos(p.endModelPos)},chunk:n})
}return n},insertChunk:function(k,m,o){this.editor.editorView.syntaxModel.invalidateCache(k.row);
var l=m.split("\n");var j=g.copyPos(k);for(var n=0;n<l.length;n++){this.insertCharacters(j,l[n],true);
j.col=j.col+l[n].length;if(n<l.length-1){this.splitRow(j);j.col=0;j.row=j.row+1}}if(!o){this.addHistoryItem("insertChunk",{selection:{startModelPos:g.copyPos(k),endModelPos:g.copyPos(j)},chunk:m})
}return j},getStringIndicesInRow:function(l,k){k=k.toLowerCase();l=this.getRowArray(l).join("").toLowerCase();
if(l.indexOf(k)==-1){return false}var i=[];var m=0;var j=l.indexOf(k);do{i.push(j);
j=l.indexOf(k,j+1)}while(j!=-1);return i},getCountOfString:function(m){var l=0;var j;
var k;for(var i=0;i<this.getRowCount();i++){k=this.getStringIndicesInRow(i,m);if(k){l+=k.length
}}return l},searchStringChanged:function(j){for(var i=0;i<this.cacheRowMetadata.length;
i++){if(this.cacheRowMetadata[i]){if(j){this.cacheRowMetadata[i].searchIndices=this.getStringIndicesInRow(i,j)
}else{this.cacheRowMetadata[i].searchIndices=false}}}},findPrev:function(n,j,m){var l;
var k=m.length;for(var i=n;i>-1;i--){l=this.getStringIndicesInRow(i,m);if(!l){continue
}for(var o=l.length-1;o>-1;o--){if(l[o]<(j-k)||n!=i){return{startPos:{col:l[o],row:i},endPos:{col:l[o]+k,row:i}}
}}}return false},findNext:function(m,j,l){var k;for(var i=m;i<this.getRowCount();
i++){k=this.getStringIndicesInRow(i,l);if(!k){continue}for(var n=0;n<k.length;n++){if(k[n]>j||m!=i){return{startPos:{col:k[n],row:i},endPos:{col:k[n]+l.length,row:i}}
}}}return false},findBefore:function(m,k,j){var i=this.getRowArray(m);if(!a.isFunction(j)){j=function(o){if(o.charAt(0)==" "){return true
}var n=o.charCodeAt(0);return(n<48)||(n>122)}}if(k>=i.length){k=Math.max(i.length-1,0)
}while(k>0){var l=i[k];if(!l){continue}if(j(l)){k++;break}k--}return{row:m,col:k}
},findAfter:function(m,k,j){var i=this.getRowArray(m);if(!a.isFunction(j)){j=function(o){if(o.charAt(0)==" "){return true
}var n=o.charCodeAt(0);return(n<48)||(n>122)}}while(k<i.length){k++;var l=i[k];if(!l){continue
}if(j(l)){break}}return{row:m,col:k}},getRowMetadata:function(s){if(!this.isRowDirty(s)&&this.cacheRowMetadata[s]){return this.cacheRowMetadata[s]
}var r={tabExpansions:[]};var o=this.editor.model.getRowArray(s);var p=o.join("");
var j=this.editor.getTabSize();r.lineTextWithoutTabExpansion=p;r.lineLengthWithoutTabExpansion=o.length;
for(var i=0;i<p.length;i++){if(p.charCodeAt(i)==9){var m=j-(i%j);var n="";for(var l=1;
l<m;l++){n+=" "}var k=(i==0)?"":p.substring(0,i);var q=(i<p.length-1)?p.substring(i+1):"";
p=k+" "+n+q;r.tabExpansions.push({start:k.length,end:k.length+n.length+1});i+=m-1
}}r.lineText=p;r.lineLength=r.lineText.length;if(this.editor.editorView.searchString){r.searchIndices=this.getStringIndicesInRow(s,this.editor.editorView.searchString)
}else{r.searchIndices=false}this.cacheRowMetadata[s]=r;return r},_sendTextEditedNotification:function(){var i=this.get("layoutManager");
if(!h.none(i)){i.textStorageEdited(this)}}})});tiki.module("bespin:package",function(b,a,e){var g=b("sproutcore/runtime:package").SC;
b("util/globals");g.mixin(a,{versionNumber:"tip",versionCodename:"DEVELOPMENT MODE",apiVersion:"dev"});
a.displayVersion=function(h){h=document.getElementById(h)||document.getElementById("version");
if(!h){return}h.innerHTML='<a href="https://wiki.mozilla.org/Labs/Bespin/ReleaseNotes" title="Read the release notes">Version <span class="versionnumber">'+this.versionNumber+'</span> "'+this.versionCodename+'"</a>'
};var c=b("util/container");a._container=c.Container.create();a.register=a._container.register.bind(a._container);
a.unregister=a._container.unregister.bind(a._container);a.get=a._container.get.bind(a._container);
a.getComponent=a._container.getComponent.bind(a._container);var f=a._container.get("hub");
a.publish=f.publish.bind(f);a.subscribe=f.subscribe.bind(f);a.unsubscribe=f.unsubscribe.bind(f);
a.fireAfter=f.fireAfter.bind(f);a.BaseController=g.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
a._container.inject(this)}})});tiki.module("bespin:plugins",function(b,a,c){var g=b("sproutcore/runtime:package").SC;
var f=b("builtins");var e=b;a.Extension=g.Object.extend({load:function(k,i){i=i||"pointer";
var j=this.get(i).split("#");var h=this;tiki.async(this._pluginName).then(function(){var l;
if(j[0]){l=h._pluginName+":"+j[0]}else{l=h._pluginName}g.run(function(){var m=e(l);
if(k){if(j[1]){k(m[j[1]])}else{k(m)}}})})}});a.ExtensionPoint=g.Object.extend({init:function(){this.extensions=[];
this.handlers=[]},addExtension:function(h){this.extensions.push(h)},getByKey:function(j){var k=this.get("indexOn");
if(!k){return undefined}for(var h=0;h<this.extensions.length;h++){if(this.extensions[h][k]==j){return this.extensions[h]
}}return undefined},active:function(h){this.handlers.forEach(function(i){if(i.activate){i.load(function(j){j(h)
},"activate")}})}});a.Plugin=g.Object.extend({activate:function(){var h=this.provides;
self=this;this.provides.forEach(function(j){var i=self.get("catalog").getExtensionPoint(j.ep);
i.active(j)})}});a.Catalog=g.Object.extend({init:function(){this.points={};this.plugins={};
var h=this.getExtensionPoint("extensionpoint");h.set("indexOn","name");this.load(f.metadata)
},getExtensionPoint:function(h){if(this.points[h]===undefined){this.points[h]=a.ExtensionPoint.create({name:h,catalog:this})
}return this.points[h]},getExtensions:function(i){var h=this.points[i];if(h===undefined){return[]
}return h.extensions},getExtensionByKey:function(i,j){var h=this.points[i];if(h===undefined){return undefined
}return h.getByKey(j)},registerExtensionPoint:function(i){var h=this.getExtensionPoint(i.name);
h.handlers.push(i);if(i.indexOn){h.set("indexOn",i.indexOn)}},load:function(o){for(var h in o){var n=o[h];
if(n.active===undefined){n.active=true}n.catalog=this;if(n.provides){var m=n.provides;
for(var k=0;k<m.length;k++){var p=a.Extension.create(m[k]);p._pluginName=h;m[k]=p;
var j=p.ep;if(j=="extensionpoint"){this.registerExtensionPoint(p)}var q=this.getExtensionPoint(p.ep);
q.addExtension(p)}}else{n.provides=[]}var l=a.Plugin.create(n);if(l.active){l.activate()
}this.plugins[h]=l}}});a.catalog=a.Catalog.create();a.startupHandler=function(h){h.load(function(i){i()
})}});tiki.module("bespin:settings",function(c,b,e){var f=c("sproutcore/runtime:package").SC;
var a=c("util/util");b.InMemorySettings=f.Object.extend({values:{},_settings:{},requires:{hub:"hub"},init:function(){setTimeout(function(){this._loadInitialValues()
}.bind(this),10)},resetValue:function(g){var h=this._settings[g];if(h){this.values[g]=h.defaultValue
}else{delete this.values[g]}},list:function(){var g=[];for(var h in this.values){if(this.values.hasOwnProperty(h)){g.push({key:h,value:this.values[h]})
}}return g},addSetting:function(g){if(!g.name){throw"Settings need 'name' members"
}if(!this._types[g.type]){throw"setting.type should be one of [number|boolean|string]"
}if(!g.defaultValue===undefined){throw"Settings need 'defaultValue' members"}if(!this._types[g.type].validator(g.defaultValue)){throw"Default value "+g.defaultValue+" is not a valid "+g.type
}this._settings[g.name]=g;this.values["_"+g.name]=g.defaultValue;this.values.__defineSetter__(g.name,function(h){this.values["_"+g.name]=h;
this._changeValue(g.name,h);hub.publish("settings:set:"+g.name,{value:h})}.bind(this));
this.values.__defineGetter__(g.name,function(h){this.values["_"+g.name]=h}.bind(this))
},_types:{number:{validator:function(g){return typeof g=="number"},toString:function(g){return""+g
},fromString:function(g){return 0+g}},"boolean":{validator:function(g){return typeof g=="boolean"
},toString:function(g){return""+g},fromString:function(g){return !!g}},text:{validator:function(g){return typeof g=="string"
},toString:function(g){return g},fromString:function(g){return g}},object:{validator:function(g){return typeof g=="object"
},toString:function(g){return JSON.stringify(g)},fromString:function(g){return JSON.parse(g)
}}},_changeValue:function(g,h){},_loadInitialValues:function(){this._loadDefaultValues()
},_loadDefaultValues:function(){this._loadFromObject(this._defaultValues())},_loadFromObject:function(j){for(var g in j){if(j.hasOwnProperty(g)){var i=j[g];
var h=this._settings[g];if(h){i=this._types[h.type].fromString(i)}this.values[g]=i
}}},_saveToObject:function(){var i={};for(var g in this.values){if(this.values.hasOwnProperty(g)){var j=this.values[g];
var h=this._settings[g];if(h){i[g]=this._types[h.type].toString(j)}else{i[g]=""+j
}}}return i},_defaultValues:function(){var i={};for(var g in this._settings){if(this._settings.hasOwnProperty(g)){var h=this._settings[g];
i[h.name]=h.defaultValue}}return i}});b.CookieSettings=b.InMemorySettings.extend({_loadInitialValues:function(){this._loadDefaultValues();
var g=cookie.get("settings");this._loadFromObject(JSON.parse(g))},_changeValue:function(g,i){var h=JSON.stringify(this._saveToObject());
cookie.set("settings",h)}});b.ServerSettings=b.InMemorySettings.extend({requires:{files:"files"},_loadInitialValues:function(){this._loadDefaultValues();
var g=function(h){h.content.split(/\n/).forEach(function(i){if(i.match(/^\s*#/)){return
}if(i.match(/\S+\s+\S+/)){var j=i.split(/\s+/);this.values[j[0].trim()]=j[1].trim()
}})};this.files.loadContents(this.files.userSettingsProject,"settings",g)},_changeValue:function(g,i){var h="";
for(var g in this.values){if(this.values.hasOwnProperty(g)){h+=g+" "+this.values[g]+"\n"
}}this.files.saveFile(this.files.userSettingsProject,{name:"settings",content:h,timestamp:new Date().getTime()})
}})});tiki.module("bespin:syntax",function(e,a,f){var i=e("sproutcore/runtime:package").SC;
var c=e("package");c.get("settings").addSetting({name:"syntaxengine",type:"text",defaultValue:"simple"});
a.Model=i.Object.extend({language:"",lineCache:[],invalidateCache:function(j){delete this.lineCache[j]
},invalidateEntireCache:function(){this.lineCache=[]},addToCache:function(j,k){this.lineCache[j]=k
},getFromCache:function(j){return this.lineCache[j]},mergeSyntaxResults:function(m){var k=0;
for(var j=0;j<m.length;j++){var l=l[j]}},getSyntaxStylesPerLine:function(k,j,l){return{text:k,regions:[{plain:[{start:0,stop:k.length}]}]}
},getSyntaxStyles:function(m,l,o,n){var k={};for(var j=l;j<=o;j++){k[j]=this.getSyntaxStylesPerLine(m[j],j,n)
}return k}});var h,b;var g={};a.Resolver={setEngine:function(j){var k=g[j];if(j==h){return this
}if(k){h=j;if(b){delete b}if(k.worker){}else{b=new g[j].Model();b.workerEnabled=false
}}else{console.log("no such engine: ",j)}return this},getModel:function(){return b
}}});tiki.module("bespin:theme",function(b,a,c){var e=b("sproutcore/runtime:package").SC;
a.coffee={backgroundStyle:"#2A211C",gutterStyle:"#4c4a41",lineNumberColor:"#e5c138",lineNumberFont:"10pt Monaco, Lucida Console, monospace",lineMarkerErrorColor:"#CC4444",lineMarkerWarningColor:"#B8860B",lineMarkerMessageColor:"green",zebraStripeColor:"#2A211C",highlightCurrentLineColor:"#3a312b",editorTextFont:"10pt Monaco, Lucida Console, monospace",editorTextColor:"rgb(230, 230, 230)",editorSelectedTextColor:"rgb(240, 240, 240)",editorSelectedTextBackground:"#526DA5",cursorStyle:"#879aff",cursorType:"ibeam",unfocusedCursorStrokeStyle:"#FF0033",unfocusedCursorFillStyle:"#73171E",partialNibStyle:"rgba(100, 100, 100, 0.3)",partialNibArrowStyle:"rgba(255, 255, 255, 0.3)",partialNibStrokeStyle:"rgba(150, 150, 150, 0.3)",fullNibStyle:"rgb(100, 100, 100)",fullNibArrowStyle:"rgb(255, 255, 255)",fullNibStrokeStyle:"rgb(150, 150, 150)",scrollTrackFillStyle:"rgba(50, 50, 50, 0.8)",scrollTrackStrokeStyle:"rgb(150, 150, 150)",scrollBarFillStyle:"rgba(0, 0, 0, %a)",scrollBarFillGradientTopStart:"rgba(90, 90, 90, %a)",scrollBarFillGradientTopStop:"rgba(40, 40, 40, %a)",scrollBarFillGradientBottomStart:"rgba(22, 22, 22, %a)",scrollBarFillGradientBottomStop:"rgba(44, 44, 44, %a)",tabSpace:"#392A25",searchHighlight:"#B55C00",searchHighlightSelected:"#FF9A00",plain:"#bdae9d",keyword:"#42a8ed",string:"#039a0a",comment:"#666666","c-comment":"#666666",punctuation:"#888888",attribute:"#BF9464",test:"rgb(255,0,0)",cdata:"#bdae9d","attribute-value":"#039a0a",tag:"#46a8ed",color:"#c4646b","tag-name":"#46a8ed",value:"#039a0a",important:"#990000",sizes:"#990000",cssclass:"#BF9464",cssid:"#46a8ed",atom:"#aa4444",variable:"#00cccc",variabledef:"#4422cc",localvariable:"#cc2277",property:"#66bb33",operator:"#88bbff",error:"#FF0000",processing:"#999999",entity:"#AA2222",text:"#00BB00","compile-time-constant":"#776088","predefined-constant":"#33CC33","reserved-language-construct":"#00FF00","predefined-function":"#22FF22","predefined-class":"#22FF22",literal:"#DD4411",identifier:"#22FF22",func:"#2200FF",type:"#8822FF",decorator:"#2222FF"};
a.coffeezebra={};e.mixin(a.coffeezebra,a.coffee);a.coffeezebra.zebraStripeColor="#FFFFFF";
a["default"]=a.coffee});tiki.module("bespin:util/bootstrap_worker",function(require,exports,module){var NATIVE_JSON=this.JSON?true:false;
var __GLOBAL__=this;if(!__GLOBAL__.console){__GLOBAL__.console={log:function(msg){postMessage("log="+msg)
}}}var loadDone=function(){if(theObject.initialize){theObject.initialize()}};var internalMessageIdentifier="__IMPORT_SCRIPT__";
var SCRIPT_COUNT=0;var LOADED_SCRIPTS=0;var EMULATE_LOAD=false;if(typeof google!="undefined"&&google.gears&&google.gears.workerPool){var wp=google.gears.workerPool;
wp.onmessage=function(a,b,message){var sender=message.sender;postMessage=function(data){wp.sendMessage(data,sender)
};onmessage({data:message.body})};__GLOBAL__.importScripts=function(){var global=this;
var src="";var i=0;var load=function(url,callback){var request=google.gears.factory.create("beta.httprequest");
request.open("GET",url);request.onreadystatechange=function(){if(request.readyState==4){if(request.status>=200&&request.status<400){var res=request.responseText;
src+=res+"\n";callback()}else{throw new Error("Error fetching script "+url+". Response code: "+request.status+" Response text: "+request.responseText)
}}};request.send()};var urls=Array.prototype.splice.call(arguments,0);var loader=function(){var url=urls.shift();
if(url){load(url,loader)}else{try{global.eval(src)}catch(e){console.log("Error evaluating source ",e)
}loadDone()}};loader()}}if(typeof importScripts=="undefined"){EMULATE_LOAD=true;var loadCounter=0;
__GLOBAL__.importScripts=function(){for(var i=0;i<arguments.length;++i){var script=arguments[i];
postMessage(internalMessageIdentifier+"["+(SCRIPT_COUNT++)+", '"+script+"']");++loadCounter
}};var loaded=[];var nextLoad=0;__GLOBAL__.__evalScriptFromImport=function(index,source){loaded[index]=source;
for(var i=nextLoad;i<loaded.length;++i){if(loaded[i]){nextLoad=i+1;try{__GLOBAL__.eval(loaded[i])
}catch(e){console.log("Error evaluating script from import: ",e)}if(loadCounter==i){loadDone()
}}else{break}}}}if(!NATIVE_JSON){origPostMessage=postMessage;postMessage=function(data){if(typeof data!="string"){data=JSON.stringify(data)
}origPostMessage(data)}}onmessage=function(event){var body=event.data;var dataIsString=false;
if(typeof body=="string"){if(body.indexOf("// YOUcannotGuessMe")==0){if(EMULATE_LOAD){__GLOBAL__.__evalScriptFromImport(SCRIPT_COUNT++,body)
}else{try{__GLOBAL__.eval(body)}catch(e){console.log("Unable to evaluate onmessage() "+e)
}loadDone()}return}else{if(body.indexOf("__IMPORT_SCRIPT__")==0){var source=body.substr("__IMPORT_SCRIPT__".length);
var match=source.match(/^\/\/(\d+)/);if(match){var index=parseInt(match[1],10);__evalScriptFromImport(index,source)
}return}else{dataIsString=true;try{body=JSON.parse(body)}catch(e){throw e+""+body
}}}}if(body.event){bespin.receive(body);return}var method=body.method;var o=theObject;
var ret=o[body.method].apply(o,body.paras);var data={method:body.method,returnValue:ret,callIndex:body.callIndex};
postMessage(data)};var eventIndex=0;var eventCallbacks=[];bespin={subscribe:function(name,callback){postMessage({type:"subscribe",name:name,index:eventIndex});
eventCallbacks[eventIndex]=function(){callback.apply(this,arguments)};eventIndex++
},publish:function(name,event){postMessage({type:"publish",name:name,event:event})
},receive:function(info){eventCallbacks[info.index](info.event)}};if(!this.JSON){JSON=function(){function f(n){return n<10?"0"+n:n
}Date.prototype.toJSON=function(){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"
};var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
function stringify(value,whitelist){var a,i,k,l,r=/["\\\x00-\x1f\x7f-\x9f]/g,v;switch(typeof value){case"string":return r.test(value)?'"'+value.replace(r,function(a){var c=m[a];
if(c){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"':'"'+value+'"';case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}if(typeof value.toJSON==="function"){return stringify(value.toJSON())
}a=[];if(typeof value.length==="number"&&!(value.propertyIsEnumerable("length"))){l=value.length;
for(i=0;i<l;i+=1){a.push(stringify(value[i],whitelist)||"null")}return"["+a.join(",")+"]"
}if(whitelist){l=whitelist.length;for(i=0;i<l;i+=1){k=whitelist[i];if(typeof k==="string"){v=stringify(value[k],whitelist);
if(v){a.push(stringify(k)+":"+v)}}}}else{for(k in value){if(typeof k==="string"){v=stringify(value[k],whitelist);
if(v){a.push(stringify(k)+":"+v)}}}}return"{"+a.join(",")+"}"}}return{stringify:stringify,parse:function(text,filter){var j;
function walk(k,v){var i,n;if(v&&typeof v==="object"){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);
if(n!==undefined){v[i]=n}else{delete v[i]}}}}return filter(k,v)}if(/^[\],:{}\s]*$/.test(text.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof filter==="function"?walk("",j):j}throw new SyntaxError("parseJSON")
}}}()}});tiki.module("bespin:util/canvas",function(b,a,c){a.fix=function(e){if(!e.fillText&&e.mozDrawText){e.fillText=function(h,f,i,g){e.translate(f,i);
e.mozTextStyle=e.font;e.mozDrawText(h);e.translate(-f,-i)}}if(!e.measureText&&e.mozMeasureText){e.measureText=function(g){if(e.font){e.mozTextStyle=e.font
}var f=e.mozMeasureText(g);return{width:f}}}if(e.measureText&&!e.html5MeasureText){e.html5MeasureText=e.measureText;
e.measureText=function(g){var f=e.html5MeasureText(g);f.ascent=e.html5MeasureText("m").width;
return f}}if(!e.fillText){e.fillText=function(){}}if(!e.measureText){e.measureText=function(){return 10
}}return e}});tiki.module("bespin:util/clipboard",function(e,g,b){var c=e("sproutcore/runtime:package").SC;
var i=e("util/util");var k=e("util/keys");var f=null;g.setup=function(l){if(f){f.uninstall()
}if(false&&i.isWebKit){f=a.create({editorWrapper:l});f.install()}else{f=j.create({editorWrapper:l});
f.install()}};var h=c.Object.extend({_hasFocus:false,init:function(){this.textarea=document.createElement("textarea");
this.textarea.className="bespin-clipboardproxy";this.textarea.tabIndex=-1;this.textarea.style.position="absolute";
this.textarea.style.zIndex="999";this.textarea.style.top="-10000px";this.textarea.style.width=0;
this.textarea.style.height=0;document.body.appendChild(this.textarea)},takeFocus:function(l){l=l||"Hello";
this.textarea.value=l;this.textarea.focus();this.textarea.select();this._hasFocus=true
},hasFocus:function(l){return this._hasFocus},focusLost:function(){this._hasFocus=false
},getValue:function(){return this.textarea.value},dispose:function(){document.body.removeChild(this.textarea)
}});var a=c.Object.extend({editorWrapper:null,install:function(){var n=h.create();
var m=document;var l=function(r){if(!this.editorWrapper.hasFocus()){return}r.preventDefault();
n.takeFocus()}.bind(this);m.addEventListener("beforecopy",l,false);m.addEventListener("beforecut",l,false);
var o=function(r){if(!n.hasFocus()){return}var s=this.editorWrapper.getSelection();
if(s&&s!=""){r.clipboardData.setData("text/plain",s)}console.log("onCopy",r,s);this.editorWrapper.focus();
n.focusLost();i.stopEvent(r)}.bind(this);m.addEventListener("copy",o);var p=function(r){if(!n.hasFocus()){return
}var s=this.editorWrapper.removeSelection();if(s){r.clipboardData.setData("text/plain",s)
}console.log("onCut",r,s);this.editorWrapper.focus();n.focusLost();i.stopEvent(r)
}.bind(this);m.addEventListener("cut",p);var q=function(r){if(!this.editorWrapper.hasFocus()){return
}var s=r.clipboardData.getData("text/plain");this.editorWrapper.replaceSelection(s);
console.log("onPaste",r,s);this.editorWrapper.focus();n.focusLost();i.stopEvent(r)
}.bind(this);m.addEventListener("paste",q);this.uninstall=function(){m.removeEventListener("beforecopy",l,false);
m.removeEventListener("beforecut",l,false);m.removeEventListener("beforepaste",l,false);
m.removeEventListener("copy",o,false);m.removeEventListener("cut",p,false);m.removeEventListener("paste",q,false);
n.dispose()}},uninstall:function(){}});var j=c.Object.extend({editorWrapper:null,install:function(){this.proxy=h.create();
var l=function(n){var o;if((i.isMac&&n.metaKey)||n.ctrlKey){if(n.keyCode==k.Key.C){o=this.editorWrapper.getSelection();
if(o&&o!=""){this.copyToClipboard(o)}}else{if(n.keyCode==k.Key.X){o=this.editorWrapper.removeSelection();
this.copyToClipboard(o)}else{if(n.keyCode==k.Key.V){this.pasteFromClipboard()}}}}}.bind(this);
var m=this.editorWrapper.getFocusElement();m.addEventListener("keydown",l,false);
this.uninstall=function(){m.removeEventListener("keydown",l,false);this.proxy.dispose()
}},copyToClipboard:function(l){this.proxy.takeFocus(l);setTimeout(function(){this.editorWrapper.focus()
}.bind(this),10)},pasteFromClipboard:function(){this.proxy.takeFocus();setTimeout(function(){var l=this.proxy.getValue();
this.editorWrapper.replaceSelection(l);this.editorWrapper.focus()}.bind(this),0)},uninstall:function(){}});
g.manual=function(){var m;var l=window.netscape?netscape.security.PrivilegeManager:null;
return{copy:function(s){try{if(l.enablePrivilege){l.enablePrivilege("UniversalXPConnect")
}else{m=s;return}}catch(o){m=s;return}var r=Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
r.data=s;var n=Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
if(!n){return false}n.addDataFlavor("text/unicode");n.setTransferData("text/unicode",r,s.length*2);
var q=Components.interfaces.nsIClipboard;var p=Components.classes["@mozilla.org/widget/clipboard;1"].getService(q);
if(!p){return false}p.setData(n,null,q.kGlobalClipboard)},data:function(){try{if(privilegeManager.enablePrivilege){privilegeManager.enablePrivilege("UniversalXPConnect")
}else{return m}}catch(o){return m}var q=Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard);
if(!q){return false}var n=Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
if(!n){return false}n.addDataFlavor("text/unicode");q.getData(n,q.kGlobalClipboard);
var s={};var p={};var r="";n.getTransferData("text/unicode",s,p);if(s){s=s.value.QueryInterface(Components.interfaces.nsISupportsString)
}if(s){r=s.data.substring(0,p.value/2)}return r}}}()});tiki.module("bespin:util/container",function(c,b,e){var a=c("util/util");
var i=c("builtins");var f=c("plugins").catalog;var h=c("sproutcore/runtime").SC;var g=c("system");
b.Container=h.Object.extend({init:function(){this.register("ioc",this);this._beingCreated={}
},register:function(k,j){h.global(k,j);this.inject(j);console.log("container.register",k,j);
return j},unregister:function(j){h.global.remove(j)},inject:function(l){var p,k;if(l&&l.requires){var n={};
for(p in l.requires){if(l.requires.hasOwnProperty(p)){k=l.requires[p];n[p]=k}}var m=function(){var s=0;
for(var r in n){if(l.requires.hasOwnProperty(p)){s++}}if(s==0){if(l.afterContainerSetup){l.afterContainerSetup()
}}};m();for(p in n){if(l.requires.hasOwnProperty(p)){k=n[p];var q=function(r){l[p]=r;
delete n[p];m()}.bind(this);var o=l.requires[p];var j=g.global[o];if(j!==undefined){q(j)
}else{this._createFromFactory(k,function(r){this.register(k,r);q(r)}.bind(this))}}}}},get:function(l){var j=g.global[l];
if(j===undefined){var k=function(m){this.register(l,m);j=m}.bind(this);this._createFromFactory(l,k)
}return j},getComponent:function(n,m,k){k=k||window;var j=g.global[n];if(j!==undefined){m.call(k,j)
}else{var l=function(o){this.register(n,o);m.call(k,o)}.bind(this);this._createFromFactory(n,l)
}},_createFromFactory:function(m,k){if(this._beingCreated[m]!==undefined){console.trace();
throw"Already creating "+m}this._beingCreated[m]=k;try{var l=f.getExtensionByKey("factory",m);
if(l===undefined){console.trace();throw"No component factory '"+m+"'"}else{var j=l.action;
l.load(function(n){if(j=="call"){n(k)}else{if(j=="create"){k(n.create())}else{if(j=="new"){k(new n())
}else{if(j=="value"){k(n)}else{throw"Create action must be call|create|new|value. Found"+j
}}}}})}}finally{delete this._beingCreated[m]}}});b.dummyFactory=function(j){j(null)
}});tiki.module("bespin:util/cookie",function(c,b,e){var a=function(g,f){return g.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(h){if(f&&f.indexOf(h)!=-1){return h
}return"\\"+h})};b.get=function(f){var h=new RegExp("(?:^|; )"+a(f)+"=([^;]*)");var g=document.cookie.match(h);
return g?decodeURIComponent(g[1]):undefined};b.set=function(h,k,i){i=i||{};if(typeof i.expires=="number"){var g=new Date();
g.setTime(g.getTime()+i.expires*24*60*60*1000);i.expires=g}if(i.expires&&i.expires.toUTCString){i.expires=i.expires.toUTCString()
}k=encodeURIComponent(k);var f=h+"="+k,j;for(j in i){f+="; "+j;var l=i[j];if(l!==true){f+="="+l
}}document.cookie=f};b.remove=function(f){b.set(f,"",{expires:-1})};b.isSupported=function(){if(!("cookieEnabled" in navigator)){b.set("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=b.get("__djCookieTest__")=="CookiesAllowed";if(navigator.cookieEnabled){b.remove("__djCookieTest__")
}}return navigator.cookieEnabled}});tiki.module("bespin:util/globals",function(b,a,e){var f=b("sproutcore/runtime:package").SC;
if(!Array.isArray){Array.isArray=function(g){return(g&&Object.prototype.toString.call(g)=="[object Array]")
}}if(!Function.prototype.bind){Function.prototype.bind=function(){var h=Array.prototype.slice.call(arguments);
var g=this;var i=function(){return g.call.apply(g,h.concat(Array.prototype.slice.call(arguments)))
};i.name=this.name;i.displayName=this.displayName;i.length=this.length;i.unbound=g;
return i}}f.Object.prototype.sc_super=function c(){c.caller.base.apply(this,c.caller.arguments)
};f.objectForPropertyPathOriginal=f.objectForPropertyPath;f.objectForPropertyPath=function(k,g,h){h=(h==undefined)?k.length:h;
var j=k.split("#");if(j.length==1){return f.objectForPropertyPathOriginal(k,g,h)}var i=b(j[0]);
if(i===undefined){return undefined}h=h-j[0].length;return f.objectForPropertyPathOriginal(j[1],i,h)
}});tiki.module("bespin:util/hub",function(b,a,c){a.Hub=SC.Object.extend({_topics:{},_eventLog:{},publish:function(f,e){if(window.globalStorage&&window.globalStorage[location.hostname]&&window.globalStorage[location.hostname].debug){console.log("Publish",f,e)
}this._eventLog[f]=true;var f="bespin:"+f;e=Array.isArray(e)?e:[e||{}];var g=this._topics[f];
if(g){g.apply(null,e)}},subscribe:function(f,l,h){var f="bespin:"+f;var g=l.bind(h);
var j=this._topics[f];if(!j||!j._listeners){var i=j;var e=this;var j=function(){var n=arguments.callee._listeners;
var p=arguments.callee.target;var o=p&&p.apply(e,arguments);var n=[].concat(n);for(var m in n){if(!(m in Array.prototype)){n[m].apply(e,arguments)
}}return o};j.target=i;j._listeners=[];this._topics[f]=j}var k=j._listeners.push(g);
return[f,k]},unsubscribe:function(h){if(h){var e=h[0];var g=h[1];var f=this._topics[e];
if(f&&f._listeners&&g--){delete f._listeners[g]}}},fireAfter:function(j,k){if(!Array.isArray(j)){throw new Error("fireAfter() takes an array of topics. '"+j+"' is not an array.")
}var h=j.length;var e=function(){if(h==0){k()}};for(var g=0;g<j.length;++g){var f=j[g];
if(this._eventLog[f]){--h}else{this.subscribe(f,function(){--h;e()})}e()}}})});tiki.module("bespin:util/keys",function(e,c,g){var a=e("util/util");
c.Key={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:a.isSafari?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,copyKey:a.isMac&&!a.isAIR?(a.isSafari?91:224):17,FORWARD_SLASH:191,TILDE:192,SQUARE_BRACKET_OPEN:219,BACK_SLASH:220,SQUARE_BRACKET_CLOSE:221,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};
c.KeyCodeToName={};for(var f in c.Key){var h=c.Key[f];if(typeof h=="number"){c.KeyCodeToName[h]=f
}}c.toKeyCode=function(i){return c.Key[i.toUpperCase()]};c.fillArguments=function(j,i){var k=j.split(" ");
i=i||{};i.key=k.pop();if(k.length==0){i.modifiers="none"}else{i.modifiers=k.join(",")
}return i};var b=["k","l","n","o","t","w","+","-","~","0","1","2","3","4","5","6","7","8","9"];
c.PassThroughCharCodes=b.map(function(i){return i.charCodeAt(0)});c.PassThroughKeyCodes=(function(){return[c.Key.C,c.Key.X,c.Key.V,c.Key.K,c.Key.L,c.Key.N,c.Key.O,c.Key.T,c.Key.W,c.Key.NUMPAD_PLUS,c.Key.NUMPAD_MINUS,c.Key.TILDE,c.Key.ZERO,c.Key.ONE,c.Key.TWO,c.Key.THREE,c.Key.FOUR,c.Key.FIVE,c.Key.SIX,c.Key.SEVEN,c.Key.EIGHT,c.Key.NINE]
})();c.passThroughToBrowser=function(j){if(!j.ctrlKey){return true}else{if(j.metaKey||j.altKey||j.ctrlKey){if(j.type=="keypress"){var i=c.PassThroughCharCodes.some(function(k){return(k==j.charCode)
});if(i){return true}}else{var i=c.PassThroughKeyCodes.some(function(k){return(k==j.keyCode)
});if(i){return true}}}}return false}});tiki.module("bespin:util/mousewheelevent",function(b,a,c){var e=b("sproutcore/runtime:package").SC;
e.mixin(a,{wheel:function(f){var g=0;if(!f){f=window.event}if(f.wheelDelta){g=-f.wheelDelta/40;
if(window.opera&&window.opera.version()<9.2){g=-g}}else{if(f.detail){g=f.detail}}return g
},axis:function(g){var f="vertical";if(g.axis){if(g.axis==g.HORIZONTAL_AXIS){f="horizontal"
}}else{if(g.wheelDeltaY||g.wheelDeltaX){if(g.wheelDeltaX==g.wheelDelta){f="horizontal"
}}else{if(g.shiftKey){f="horizontal"}}}return f}})});tiki.module("bespin:util/path",function(b,a,c){a.combine=function(){var e=Array.prototype.slice.call(arguments);
var f=e.join("/");f=f.replace(/\/\/+/g,"/");f=f.replace(/^\s+|\s+$/g,"");return f
};a.directory=function(f){var e=f.split("/");if(e.length==1){return""}else{if((e.length==2)&&e[e.length-1]==""){return f
}else{return e.slice(0,e.length-1).join("/")}}};a.makeDirectory=function(e){if(!/\/$/.test(e)){e+="/"
}return e};a.combineAsDirectory=function(){return this.makeDirectory(this.combine.apply(this,arguments))
};a.escape=function(){return escape(this.combine.apply(this,arguments))};a.trimLeadingSlash=function(e){if(e.indexOf("/")==0){e=e.substring(1,e.length)
}return e},a.fileType=function(f){if(f.indexOf(".")>=0){var e=f.split(".");if(e.length>1){return e[e.length-1]
}}}});tiki.module("bespin:util/tokenobject",function(c,a,e){var b=c("package");a.TokenObject=SC.Object.extend({input:null,options:{},init:function(){this._splitterRegex=new RegExp(this.options.splitBy||"\\s+");
this.pieces=this.tokenize(this.input.split(this._splitterRegex));if(this.options.params){this._nametoindex={};
var g=this.options.params.split(" ");for(var f=0;f<g.length;f++){this._nametoindex[g[f]]=f;
if(!this.options.noshortcutvalues){this[g[f]]=this.pieces[f]}}}arguments.callee.base.apply(this,arguments)
},tokenize:function(g){var j=[];var f;while(f=g.shift()){if(f[0]=='"'||f[0]=="'"){var i=[f.substring(1,f.length)];
var h;while(h=g.shift()){if(h[h.length-1]=='"'||h[h.length-1]=="'"){i.push(h.substring(0,h.length-1));
break}else{i.push(h)}}j.push(i.join(" "))}else{j.push(f)}}return j},param:function(f){return(typeof f=="number")?this.pieces[f]:this.pieces[this._nametoindex[f]]
},length:function(){return this.pieces.length}})});tiki.module("bespin:util/util",function(e,b,g){b.queryToObject=function(m,l){var k={};
var j=m.split(l||"&");var n=decodeURIComponent;j.forEach(function(p){if(p.length){var q=p.split("=");
var o=n(q.shift());var r=n(q.join("="));if(b.isString(k[o])){k[o]=[k[o]]}if(Array.isArray(k[o])){k[o].push(r)
}else{k[o]=r}}});return k};b.objectToQuery=function(q){var k=encodeURIComponent;var p=[];
var n={};for(var l in q){var o=q[l];if(o!=n[l]){var j=k(l)+"=";if(_d.isArray(o)){for(var m=0;
m<o.length;m++){p.push(j+k(o[m]))}}else{p.push(j+k(o))}}}return p.join("&")};var h=0;
var a={};b.rateLimit=function(j,k,l){if(j){var m=h++;return function(){if(a[m]){clearTimeout(a[m])
}a[m]=setTimeout(function(){l.apply(k,arguments);delete a[m]},j)}}};b.isString=function(j){return(typeof j=="string"||j instanceof String)
};b.isObject=function(j){return j!==undefined&&(j===null||typeof j=="object"||d.isArray(j)||d.isFunction(j))
};b.isFunction=(function(){var j=function(l){var k=typeof l;return l&&(k=="function"||l instanceof Function)&&!l.nodeType
};return b.isSafari?function(k){if(typeof k=="function"&&k=="[object NodeList]"){return false
}return j(k)}:j})();b.endsWith=function(k,j){return k.match(new RegExp(j+"$"))};b.include=function(k,j){return k.indexOf(j)>-1
};b.indexOfProperty=function(m,j,l){for(var k=0;k<m.length;k++){if(m[k][j]==l){return k
}}return null};b.last=function(j){if(Array.isArray(j)){return j[j.length-1]}};b.shrinkArray=function(l){var j=[];
var k=true;l.reverse().forEach(function(m){if(k&&m===undefined){return}k=false;j.push(m)
});return j.reverse()};b.makeArray=function(l,m){if(l<1){return[]}if(!m){m=" "}var j=[];
for(var k=0;k<l;k++){j.push(m)}return j};b.repeatString=function(j,m){var l="";for(var k=0;
k<m;k++){l+=j}return l};b.leadingSpaces=function(l){var j=0;for(var k=0;k<l.length;
k++){if(l[k]==" "||l[k]==""||l[k]===undefined){j++}else{return j}}return j};b.leadingTabs=function(l){var k=0;
for(var j=0;j<l.length;j++){if(l[j]=="\t"||l[j]==""||l[j]===undefined){k++}else{return k
}}return k};b.leadingWhitespace=function(l){var k=[];for(var j=0;j<l.length;j++){if(l[j]==" "||l[j]=="\t"||l[j]==""||l[j]===undefined){k.push(l[j])
}else{return k}}return k};b.englishFromCamel=function(j){j.replace(/([A-Z])/g,function(k){return" "+k.toLowerCase()
}).trim()};b.OS={LINUX:"LINUX",MAC:"MAC",WINDOWS:"WINDOWS"};var f=navigator.userAgent;
var i=navigator.appVersion;b.isLinux=i.indexOf("Linux")>=0;b.isWindows=i.indexOf("Win")>=0;
b.isWebKit=parseFloat(f.split("WebKit/")[1])||undefined;b.isChrome=parseFloat(f.split("Chrome/")[1])||undefined;
b.isMac=i.indexOf("Macintosh")>=0;if(f.indexOf("AdobeAIR")>=0){b.isAIR=1}var c=Math.max(i.indexOf("WebKit"),i.indexOf("Safari"),0);
if(c&&!b.isChrome){b.isSafari=parseFloat(i.split("Version/")[1]);if(!b.isSafari||parseFloat(i.substr(c+7))<=419.3){b.isSafari=2
}}if(f.indexOf("Gecko")>=0&&!b.isWebKit){b.isMozilla=parseFloat(i)}b.getOS=function(){if(b.isMac){return b.OS.MAC
}else{if(b.isLinux){return b.OS.LINUX}else{return b.OS.WINDOWS}}};b.contains=document.compareDocumentPosition?function(k,j){return k.compareDocumentPosition(j)&16
}:function(k,j){return k!==j&&(k.contains?k.contains(j):true)};b.stopEvent=function(j){j.preventDefault();
j.stopPropagation()};b.randomPassword=function(m){m=m||16;var l="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
var k="";for(var j=0;j<m;j++){var n=Math.floor(Math.random()*l.length);k+=l.charAt(n)
}return k};b.isEmpty=function(k){for(var j in k){if(k.hasOwnProperty(j)){return false
}}return true};b.isMyProject=function(j){return j.indexOf("+")==-1};b.formatDate=function(j){if(!j){return"Unknown"
}return j.getDate()+" "+b.formatDate.shortMonths[j.getMonth()]+" "+j.getFullYear()
};b.formatDate.shortMonths=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
});tiki.script("bespin:en/1f2b8ea0a57cc4090df8ca4c1c2c1cbaedc34b89/javascript.js");tiki.require("bespin:boot");