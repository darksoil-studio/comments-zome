import{s as l}from"./property.CharCVmj.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class d{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,s=!1){const o=s||!Object.is(t,this.o);this.o=t,o&&this.updateObservers()}constructor(t){this.subscriptions=new Map,this.updateObservers=()=>{for(const[s,{disposer:o}]of this.subscriptions)s(this.o,o)},t!==void 0&&(this.value=t)}addCallback(t,s,o){if(!o)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:s});const{disposer:i}=this.subscriptions.get(t);t(this.value,i)}clearCallbacks(){this.subscriptions.clear()}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let p=class extends Event{constructor(t,s){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=s}};class u extends d{constructor(t,s,o){var i,n;super(s.context!==void 0?s.initialValue:o),this.onContextRequest=e=>{if(e.context!==this.context)return;const r=e.contextTarget??e.composedPath()[0];r!==this.host&&(e.stopPropagation(),this.addCallback(e.callback,r,e.subscribe))},this.onProviderRequest=e=>{if(e.context!==this.context||(e.contextTarget??e.composedPath()[0])===this.host)return;const r=new Set;for(const[h,{consumerHost:a}]of this.subscriptions)r.has(h)||(r.add(h),a.dispatchEvent(new l(this.context,a,h,!0)));e.stopPropagation()},this.host=t,s.context!==void 0?this.context=s.context:this.context=s,this.attachListeners(),(n=(i=this.host).addController)==null||n.call(i,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new p(this.context,this.host))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function v({context:c}){return(t,s)=>{const o=new WeakMap;if(typeof s=="object")return{get(){return t.get.call(this)},set(i){return o.get(this).setValue(i),t.set.call(this,i)},init(i){return o.set(this,new u(this,{context:c,initialValue:i})),i}};{t.constructor.addInitializer(e=>{o.set(e,new u(e,{context:c}))});const i=Object.getOwnPropertyDescriptor(t,s);let n;if(i===void 0){const e=new WeakMap;n={get(){return e.get(this)},set(r){o.get(this).setValue(r),e.set(this,r)},configurable:!0,enumerable:!0}}else{const e=i.set;n={...i,set(r){o.get(this).setValue(r),e==null||e.call(this,r)}}}return void Object.defineProperty(t,s,n)}}}export{v as e};
