import{_ as m}from"./tslib.es6.kHcLnhpD.js";import{a as N,n as r,t as I,c as D}from"./property.CharCVmj.js";import{j as M,k as G,_ as y,r as E,o as Z,p as H,q as P,h as j,e as S,l as A,m as B,d as J,i as Q,t as X,w as Y,E as V}from"./chunk.EZCUSG7Q.W0X_B2zs.js";import{g as k,x as l,M as ee,j as te,i as q,f as se,T as ie}from"./comments-client.OH33Uicx.js";import"./display-error.CXXUIYRx.js";import{s as oe}from"./context.fuYjI_tx.js";import{S as ae}from"./signal-watcher.BnQzQUCv.js";const re=N("ProfilesProvider");var ne=k`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,p=class extends H{constructor(){super(...arguments),this.hasError=!1,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=!1}handleImageLoadError(){this.hasError=!0,this.emit("sl-error")}render(){const t=l`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;let e=l``;return this.initials?e=l`<div part="initials" class="avatar__initials">${this.initials}</div>`:e=l`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,l`
      <div
        part="base"
        class=${P({avatar:!0,"avatar--circle":this.shape==="circle","avatar--rounded":this.shape==="rounded","avatar--square":this.shape==="square"})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?t:e}
      </div>
    `}};p.styles=[M,ne];p.dependencies={"sl-icon":G};y([E()],p.prototype,"hasError",2);y([r()],p.prototype,"image",2);y([r()],p.prototype,"label",2);y([r()],p.prototype,"initials",2);y([r()],p.prototype,"loading",2);y([r({reflect:!0})],p.prototype,"shape",2);y([Z("image")],p.prototype,"handleImageChange",1);p.define("sl-avatar");var le=k`
  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,T=class extends H{constructor(){super(...arguments),this.effect="none"}render(){return l`
      <div
        part="base"
        class=${P({skeleton:!0,"skeleton--pulse":this.effect==="pulse","skeleton--sheen":this.effect==="sheen"})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};T.styles=[M,le];y([r()],T.prototype,"effect",2);T.define("sl-skeleton");let w=[0],x=0;function he(t){t[0]===132&&t[1]===32&&t[2]===36?w=t.slice(3):w=t||[],x=0}function n(){return(()=>{const e=w[x];return x=(x+1)%w.length,e})()/256}function K(t){const e=Math.floor(n()*360),s=n()*60+40,i=t||(n()*100+(n()+n()+n()+n())*25)/2;return{h:e,s,l:i}}function O({h:t,s:e,l:s}){return`hsl(${t}, ${e}%, ${s}%)`}function de(t,e,s){const i=n()*2*Math.PI,o=e*Math.cos(i),a=e*Math.sin(i),v=s.x+o,h=s.x+a,d=i+2*Math.PI*.3,g=e*Math.cos(d),$=e*Math.sin(d),b=s.x+g,C=s.x+$,_=d+2*Math.PI*.3,W=e*Math.cos(_),L=e*Math.sin(_),U=s.x+W,F=s.x+L;t.beginPath(),t.moveTo(v,h),t.lineTo(b,C),t.lineTo(U,F),t.fill()}function ce(t){const e=t.hash||[0];return he(e),{backgroundColor:t.backgroundColor||O(K()),hash:e,size:t.size||32}}function pe(t,e){if(t.hash&&!(t.hash instanceof Uint8Array))throw new Error("invalid type for opts.hash, expecting Uint8Array or null");t=ce(t||{});const{size:s,backgroundColor:i}=t;e.width=e.height=s;const o=e.getContext("2d");if(!o)return;o.fillStyle=i,o.fillRect(0,0,e.width,e.height);const a=n()<.5?3:4,v=Array.apply(null,Array(a)).map((h,d)=>{const g=d===0?5+n()*25:d===1?70+n()*25:null;return{x:n()*s,y:n()*s,radius:5+n()*s*.25,type:Math.floor(n()*3),color:O(K(g))}}).sort((h,d)=>h.radius>d.radius?-1:1);for(let h=0;h<a;h++){const d=v[h],{x:g,y:$,radius:b,type:C,color:_}=d;switch(o.fillStyle=_,C){case 0:o.beginPath(),o.arc(g,$,b,0,2*Math.PI),o.fill();break;case 1:o.fillRect(g,$,b*2,b*2);break;case 2:de(o,b*2,{x:g});break;default:throw new Error("shape is greater than 2, this should never happen")}}return e}var u=function(t,e,s,i){var o=arguments.length,a=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,v;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(t,e,s,i);else for(var h=t.length-1;h>=0;h--)(v=t[h])&&(a=(o<3?v(a):o>3?v(e,s,a):v(e,s))||a);return o>3&&a&&Object.defineProperty(e,s,a),a};const ue=new ee(t=>new te(e=>{const s=document.createElement("canvas");return pe({hash:t,size:e},s),s}));let c=class extends q{constructor(){super(...arguments),this.size=32,this.shape="circle",this.disableTooltip=!1,this.disableCopy=!1,this.justCopiedHash=!1}async copyHash(){this.disableCopy||(await navigator.clipboard.writeText(this.strHash),this.timeout&&clearTimeout(this.timeout),this.justCopiedHash=!0,this._tooltip.show(),this.timeout=setTimeout(()=>{this._tooltip.hide(),setTimeout(()=>{this.justCopiedHash=!1},100)},2e3))}get strHash(){return se(this.hash)}updated(e){var s,i;if(super.updated(e),e.has("hash")&&e.get("hash")!==void 0&&((s=e.get("hash"))==null?void 0:s.toString())!==((i=this.hash)==null?void 0:i.toString())||e.has("size")){const o=e.get("hash")!==void 0?e.get("hash"):this.hash,a=ue.get(o).get(this.size);this._canvas.width=a.width,this._canvas.height=a.height,this._canvas.getContext("2d").drawImage(a,0,0)}}renderCanvas(){return l` <canvas
      id="canvas"
      width="1"
      height="1"
      class=${P({square:this.shape==="square",circle:this.shape==="circle"})}
    ></canvas>`}render(){return l`<div
      @click=${()=>this.copyHash()}
      style="${this.disableCopy?"":"cursor: pointer;"} flex-grow: 0"
    >
      <sl-tooltip
        id="tooltip"
        placement="top"
        .content=${this.justCopiedHash?B("Copied!"):`${this.strHash.substring(0,6)}...`}
        .trigger=${this.disableTooltip||this.justCopiedHash?"manual":"hover focus"}
        hoist
      >
        ${this.renderCanvas()}
      </sl-tooltip>
    </div>`}static get styles(){return k`
      :host {
        display: flex;
      }

      .square {
        border-radius: 0%;
      }
      .circle {
        border-radius: 50%;
      }
    `}};u([r(j("hash"))],c.prototype,"hash",void 0);u([r({type:Number})],c.prototype,"size",void 0);u([r({type:String})],c.prototype,"shape",void 0);u([r({type:Boolean,attribute:"disable-tooltip"})],c.prototype,"disableTooltip",void 0);u([r({type:Boolean,attribute:"disable-copy"})],c.prototype,"disableCopy",void 0);u([S("#canvas")],c.prototype,"_canvas",void 0);u([S("#tooltip")],c.prototype,"_tooltip",void 0);u([E()],c.prototype,"justCopiedHash",void 0);c=u([A(),I("holo-identicon")],c);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R="important",ve=" !"+R,z=J(class extends Q{constructor(t){var e;if(super(t),t.type!==X.ATTRIBUTE||t.name!=="style"||((e=t.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,s)=>{const i=t[s];return i==null?e:e+`${s=s.includes("-")?s:s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:s}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?s.removeProperty(i):s[i]=null);for(const i in e){const o=e[i];if(o!=null){this.ft.add(i);const a=typeof o=="string"&&o.endsWith(ve);i.includes("-")||a?s.setProperty(i,a?o.slice(0,-11):o,a?R:""):s[i]=o}}return ie}});let f=class extends ae(q){constructor(){super(...arguments),this.size=32,this.disableTooltip=!1,this.disableCopy=!1}renderIdenticon(){return this.agentPubKey?l` <div
			style=${z({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
		>
			<holo-identicon
				.disableCopy=${this.disableCopy}
				.disableTooltip=${this.disableTooltip}
				.hash=${this.agentPubKey}
				.size=${this.size}
			>
			</holo-identicon>
			<div class="badge"><slot name="badge"></slot></div>
		</div>`:l`
				<sl-icon
					style=${z({position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
					.src=${Y(V)}
				>
				</sl-icon>
			`}renderProfile(e){if(!e||!e.avatar)return this.renderIdenticon();const s=l`
			<div
				style=${z({cursor:this.disableCopy?"":"pointer",position:"relative",height:`${this.size}px`,width:`${this.size}px`})}
			>
				<sl-avatar
					.image=${e.avatar}
					style="--size: ${this.size}px; display: flex;"
					@click=${()=>this.dispatchEvent(new CustomEvent("profile-clicked",{composed:!0,bubbles:!0,detail:{agentPubKey:this.agentPubKey}}))}
				>
				</sl-avatar>
				<div class="badge"><slot name="badge"></slot></div>
			</div>
		`;return l`
			<sl-tooltip
				id="tooltip"
				placement="top"
				.trigger=${this.disableTooltip?"manual":"hover focus"}
				hoist
				.content=${e.name}
			>
				${s}
			</sl-tooltip>
		`}render(){const e=this.profilesProvider.currentProfileForAgent.get(this.agentPubKey).get();switch(e.status){case"pending":return l`<sl-skeleton
					effect="pulse"
					style="height: ${this.size}px; width: ${this.size}px"
				></sl-skeleton>`;case"error":return l`
					<display-error
						tooltip
						.headline=${B("Error fetching the user's profile.")}
						.error=${e.error}
					></display-error>
				`;case"completed":return this.renderProfile(e.value)}}};f.styles=[oe,k`
			.badge {
				position: absolute;
				right: 0;
				bottom: 0;
			}
			:host {
				height: 32px;
			}
		`];m([r(j("agent-pub-key"))],f.prototype,"agentPubKey",void 0);m([r({type:Number})],f.prototype,"size",void 0);m([r({type:Boolean,attribute:"disable-tooltip"})],f.prototype,"disableTooltip",void 0);m([r({type:Boolean,attribute:"disable-copy"})],f.prototype,"disableCopy",void 0);m([D({context:re,subscribe:!0}),r()],f.prototype,"profilesProvider",void 0);f=m([A(),I("agent-avatar")],f);export{re as p};
