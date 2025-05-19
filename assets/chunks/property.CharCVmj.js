import{h as b,u as l}from"./comments-client.OH33Uicx.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let d=class extends Event{constructor(e,t,r,c){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=r,this.subscribe=c??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function x(s){return s}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class h{constructor(e,t,r,c){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(i,n)=>{this.unsubscribe&&(this.unsubscribe!==n&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=i,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(i,n)),this.unsubscribe=n},this.host=e,t.context!==void 0){const i=t;this.context=i.context,this.callback=i.callback,this.subscribe=i.subscribe??!1}else this.context=t,this.callback=r,this.subscribe=c??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new d(this.context,this.host,this.t,this.subscribe))}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function k({context:s,subscribe:e}){return(t,r)=>{typeof r=="object"?r.addInitializer(function(){new h(this,{context:s,callback:c=>{t.set.call(this,c)},subscribe:e})}):t.constructor.addInitializer(c=>{new h(c,{context:s,callback:i=>{c[r]=i},subscribe:e})})}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class u extends Event{constructor(e){super(u.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=e}}u.eventName="lit-routes-connected";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const g=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const p={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:b},f=(s=p,e,t)=>{const{kind:r,metadata:c}=t;let i=globalThis.litPropertyMetadata.get(c);if(i===void 0&&globalThis.litPropertyMetadata.set(c,i=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),i.set(t.name,s),r==="accessor"){const{name:n}=t;return{set(o){const a=e.get.call(this);e.set.call(this,o),this.requestUpdate(n,a,s)},init(o){return o!==void 0&&this.C(n,void 0,s,o),o}}}if(r==="setter"){const{name:n}=t;return function(o){const a=this[n];e.call(this,o),this.requestUpdate(n,a,s)}}throw Error("Unsupported decorator location: "+r)};function w(s){return(e,t)=>typeof t=="object"?f(s,e,t):((r,c,i)=>{const n=c.hasOwnProperty(i);return c.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(c,i):void 0})(s,e,t)}export{x as a,k as c,w as n,d as s,g as t};
