import{s as ee,c as te}from"./context.fuYjI_tx.js";import{G as se,j as P,I as ie,_ as a,e as g,o as S,x as w,p as E,H as j,L as O,A as b,B as v,z as k,J as oe,C as L,q as F,s as I,i as ne,f as ae,t as re,d as le,S as de,k as ue,K as he,r as H,m as f,w as ce,n as pe,M as me,h as fe,l as ge}from"./chunk.EZCUSG7Q.W0X_B2zs.js";import{n as d,c as X,t as be}from"./property.CharCVmj.js";import{S as Y}from"./display-error.CXXUIYRx.js";import{g as $,x as u,E as U,f as q,i as ve}from"./comments-client.OH33Uicx.js";import{S as ye}from"./signal-watcher.BnQzQUCv.js";import{p as we}from"./agent-avatar.DDOu5T1C.js";import"./chunk.EA437WHD.Bmu-oHsB.js";import"./edit-comment.BSA_6coS.js";import"./static.DqwAlrPG.js";import"./range.Bk9X9Gv-.js";import"./baseClone.BoWs54YW.js";import"./getTag.DT3HxZ-h.js";import"./toFinite.Br319kFa.js";import"./tslib.es6.kHcLnhpD.js";import"./chunk.XA43ZQPC.Cb1mbs-A.js";function xe(e,s){{const i=e.find(o=>o&&o.status==="error");if(i)return i}{const i=e.find(o=>o&&o.status==="pending");if(i)return i}return{status:"completed",value:e.filter(i=>i.status==="completed").map(i=>i.value)}}function*W(e=document.activeElement){e!=null&&(yield e,"shadowRoot"in e&&e.shadowRoot&&e.shadowRoot.mode!=="closed"&&(yield*se(W(e.shadowRoot.activeElement))))}function J(){return[...W()].pop()}var B=new WeakMap;function Q(e){let s=B.get(e);return s||(s=window.getComputedStyle(e,null),B.set(e,s)),s}function ke(e){if(typeof e.checkVisibility=="function")return e.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const s=Q(e);return s.visibility!=="hidden"&&s.display!=="none"}function _e(e){const s=Q(e),{overflowY:t,overflowX:i}=s;return t==="scroll"||i==="scroll"?!0:t!=="auto"||i!=="auto"?!1:e.scrollHeight>e.clientHeight&&t==="auto"||e.scrollWidth>e.clientWidth&&i==="auto"}function Ce(e){const s=e.tagName.toLowerCase(),t=Number(e.getAttribute("tabindex"));if(e.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||e.hasAttribute("disabled")||e.closest("[inert]"))return!1;if(s==="input"&&e.getAttribute("type")==="radio"){const n=e.getRootNode(),r=`input[type='radio'][name="${e.getAttribute("name")}"]`,l=n.querySelector(`${r}:checked`);return l?l===e:n.querySelector(r)===e}return ke(e)?(s==="audio"||s==="video")&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&e.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(s)?!0:_e(e):!1}function Se(e){var s,t;const i=R(e),o=(s=i[0])!=null?s:null,n=(t=i[i.length-1])!=null?t:null;return{start:o,end:n}}function Ee(e,s){var t;return((t=e.getRootNode({composed:!0}))==null?void 0:t.host)!==s}function R(e){const s=new WeakMap,t=[];function i(o){if(o instanceof Element){if(o.hasAttribute("inert")||o.closest("[inert]")||s.has(o))return;s.set(o,!0),!t.includes(o)&&Ce(o)&&t.push(o),o instanceof HTMLSlotElement&&Ee(o,e)&&o.assignedElements({flatten:!0}).forEach(n=>{i(n)}),o.shadowRoot!==null&&o.shadowRoot.mode==="open"&&i(o.shadowRoot)}for(const n of o.children)i(n)}return i(e),t.sort((o,n)=>{const r=Number(o.getAttribute("tabindex"))||0;return(Number(n.getAttribute("tabindex"))||0)-r})}var _=[],$e=class{constructor(e){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=s=>{var t;if(s.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const i=J();if(this.previousFocus=i,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;s.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const o=R(this.element);let n=o.findIndex(l=>l===i);this.previousFocus=this.currentFocus;const r=this.tabDirection==="forward"?1:-1;for(;;){n+r>=o.length?n=0:n+r<0?n=o.length-1:n+=r,this.previousFocus=this.currentFocus;const l=o[n];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||l&&this.possiblyHasTabbableChildren(l))return;s.preventDefault(),this.currentFocus=l,(t=this.currentFocus)==null||t.focus({preventScroll:!1});const p=[...W()];if(p.includes(this.currentFocus)||!p.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){_.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){_=_.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return _[_.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=R(this.element);if(!this.element.matches(":focus-within")){const s=e[0],t=e[e.length-1],i=this.tabDirection==="forward"?s:t;typeof(i==null?void 0:i.focus)=="function"&&(this.currentFocus=i,i.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}},N=new Set;function Ae(){const e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}function Te(){const e=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(e)||!e?0:e}function G(e){if(N.add(e),!document.documentElement.classList.contains("sl-scroll-lock")){const s=Ae()+Te();let t=getComputedStyle(document.documentElement).scrollbarGutter;(!t||t==="auto")&&(t="stable"),s<2&&(t=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",t),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${s}px`)}}function V(e){N.delete(e),N.size===0&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}var Le=$`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,m=class extends E{constructor(){super(...arguments),this.hasSlotController=new j(this,"footer"),this.localize=new O(this),this.modal=new $e(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.modal.isActive()&&this.open&&(e.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),G(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),V(this),this.removeOpenListeners()}requestClose(e){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:e}}).defaultPrevented){const t=b(this,"dialog.denyClose",{dir:this.localize.dir()});v(this.panel,t.keyframes,t.options);return}this.hide()}addOpenListeners(){var e;"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var e;(e=this.closeWatcher)==null||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),G(this);const e=this.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([k(this.dialog),k(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")});const s=b(this,"dialog.show",{dir:this.localize.dir()}),t=b(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([v(this.panel,s.keyframes,s.options),v(this.overlay,t.keyframes,t.options)]),this.emit("sl-after-show")}else{oe(this),this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([k(this.dialog),k(this.overlay)]);const e=b(this,"dialog.hide",{dir:this.localize.dir()}),s=b(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([v(this.overlay,s.keyframes,s.options).then(()=>{this.overlay.hidden=!0}),v(this.panel,e.keyframes,e.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,V(this);const t=this.originalTrigger;typeof(t==null?void 0:t.focus)=="function"&&setTimeout(()=>t.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,L(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,L(this,"sl-after-hide")}render(){return u`
      <div
        part="base"
        class=${F({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${I(this.noHeader?this.label:void 0)}
          aria-labelledby=${I(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":u`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:"\uFEFF"} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};m.styles=[P,Le];m.dependencies={"sl-icon-button":ie};a([g(".dialog")],m.prototype,"dialog",2);a([g(".dialog__panel")],m.prototype,"panel",2);a([g(".dialog__overlay")],m.prototype,"overlay",2);a([d({type:Boolean,reflect:!0})],m.prototype,"open",2);a([d({reflect:!0})],m.prototype,"label",2);a([d({attribute:"no-header",type:Boolean,reflect:!0})],m.prototype,"noHeader",2);a([S("open",{waitUntilFirstUpdate:!0})],m.prototype,"handleOpenChange",1);w("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});w("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});w("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});w("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});w("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});m.define("sl-dialog");var De=$`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,h=class extends E{constructor(){super(...arguments),this.localize=new O(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=e=>{this.open&&e.key==="Escape"&&(e.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=e=>{var s;if(e.key==="Escape"&&this.open&&!this.closeWatcher){e.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(e.key==="Tab"){if(this.open&&((s=document.activeElement)==null?void 0:s.tagName.toLowerCase())==="sl-menu-item"){e.preventDefault(),this.hide(),this.focusOnTrigger();return}const t=(i,o)=>{if(!i)return null;const n=i.closest(o);if(n)return n;const r=i.getRootNode();return r instanceof ShadowRoot?t(r.host,o):null};setTimeout(()=>{var i;const o=((i=this.containingElement)==null?void 0:i.getRootNode())instanceof ShadowRoot?J():document.activeElement;(!this.containingElement||t(o,this.containingElement.tagName.toLowerCase())!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=e=>{const s=e.composedPath();this.containingElement&&!s.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=e=>{const s=e.target;!this.stayOpenOnSelect&&s.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const e=this.trigger.assignedElements({flatten:!0})[0];typeof(e==null?void 0:e.focus)=="function"&&e.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(e=>e.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(e){if([" ","Enter"].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}const s=this.getMenu();if(s){const t=s.getAllItems(),i=t[0],o=t[t.length-1];["ArrowDown","ArrowUp","Home","End"].includes(e.key)&&(e.preventDefault(),this.open||(this.show(),await this.updateComplete),t.length>0&&this.updateComplete.then(()=>{(e.key==="ArrowDown"||e.key==="Home")&&(s.setCurrentItem(i),i.focus()),(e.key==="ArrowUp"||e.key==="End")&&(s.setCurrentItem(o),o.focus())}))}}handleTriggerKeyUp(e){e.key===" "&&e.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const s=this.trigger.assignedElements({flatten:!0}).find(i=>Se(i).start);let t;if(s){switch(s.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":t=s.button;break;default:t=s}t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,L(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,L(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var e;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var e;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(e=this.closeWatcher)==null||e.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await k(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:e,options:s}=b(this,"dropdown.show",{dir:this.localize.dir()});await v(this.popup.popup,e,s),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await k(this);const{keyframes:e,options:s}=b(this,"dropdown.hide",{dir:this.localize.dir()});await v(this.popup.popup,e,s),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return u`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${I(this.sync?this.sync:void 0)}
        class=${F({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};h.styles=[P,De];h.dependencies={"sl-popup":Y};a([g(".dropdown")],h.prototype,"popup",2);a([g(".dropdown__trigger")],h.prototype,"trigger",2);a([g(".dropdown__panel")],h.prototype,"panel",2);a([d({type:Boolean,reflect:!0})],h.prototype,"open",2);a([d({reflect:!0})],h.prototype,"placement",2);a([d({type:Boolean,reflect:!0})],h.prototype,"disabled",2);a([d({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],h.prototype,"stayOpenOnSelect",2);a([d({attribute:!1})],h.prototype,"containingElement",2);a([d({type:Number})],h.prototype,"distance",2);a([d({type:Number})],h.prototype,"skidding",2);a([d({type:Boolean})],h.prototype,"hoist",2);a([d({reflect:!0})],h.prototype,"sync",2);a([S("open",{waitUntilFirstUpdate:!0})],h.prototype,"handleOpenChange",1);w("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});w("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});h.define("sl-dropdown");var Pe=$`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=(e,s)=>{var i;const t=e._$AN;if(t===void 0)return!1;for(const o of t)(i=o._$AO)==null||i.call(o,s,!1),C(o,s);return!0},D=e=>{let s,t;do{if((s=e._$AM)===void 0)break;t=s._$AN,t.delete(e),e=s}while((t==null?void 0:t.size)===0)},Z=e=>{for(let s;s=e._$AM;e=s){let t=s._$AN;if(t===void 0)s._$AN=t=new Set;else if(t.has(e))break;t.add(e),ze(s)}};function Oe(e){this._$AN!==void 0?(D(this),this._$AM=e,Z(this)):this._$AM=e}function Me(e,s=!1,t=0){const i=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(s)if(Array.isArray(i))for(let n=t;n<i.length;n++)C(i[n],!1),D(i[n]);else i!=null&&(C(i,!1),D(i));else C(this,e)}const ze=e=>{e.type==re.CHILD&&(e._$AP??(e._$AP=Me),e._$AQ??(e._$AQ=Oe))};class Ie extends ne{constructor(){super(...arguments),this._$AN=void 0}_$AT(s,t,i){super._$AT(s,t,i),Z(this),this.isConnected=s._$AU}_$AO(s,t=!0){var i,o;s!==this.isConnected&&(this.isConnected=s,s?(i=this.reconnected)==null||i.call(this):(o=this.disconnected)==null||o.call(this)),t&&(C(this,s),D(this))}setValue(s){if(ae(this._$Ct))this._$Ct._$AI(s,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=s,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Re=()=>new Ne;class Ne{}const z=new WeakMap,Fe=le(class extends Ie{render(e){return U}update(e,[s]){var i;const t=s!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=s,this.ht=(i=e.options)==null?void 0:i.host,this.rt(this.ct=e.element)),U}rt(e){if(this.isConnected||(e=void 0),typeof this.G=="function"){const s=this.ht??globalThis;let t=z.get(s);t===void 0&&(t=new WeakMap,z.set(s,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){var e,s;return typeof this.G=="function"?(e=z.get(this.ht??globalThis))==null?void 0:e.get(this.G):(s=this.G)==null?void 0:s.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var He=class{constructor(e,s){this.popupRef=Re(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=t=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${t.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${t.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=t=>{switch(t.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":t.target!==this.host&&(t.preventDefault(),t.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(t);break}},this.handleClick=t=>{var i;t.target===this.host?(t.preventDefault(),t.stopPropagation()):t.target instanceof Element&&(t.target.tagName==="sl-menu-item"||(i=t.target.role)!=null&&i.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=t=>{t.relatedTarget&&t.relatedTarget instanceof Element&&this.host.contains(t.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=t=>{t.stopPropagation()},this.handlePopupReposition=()=>{const t=this.host.renderRoot.querySelector("slot[name='submenu']"),i=t==null?void 0:t.assignedElements({flatten:!0}).filter(M=>M.localName==="sl-menu")[0],o=getComputedStyle(this.host).direction==="rtl";if(!i)return;const{left:n,top:r,width:l,height:p}=i.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${o?n+l:n}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${r}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${o?n+l:n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${r+p}px`)},(this.host=e).addController(this),this.hasSlotController=s}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(e){const s=this.host.renderRoot.querySelector("slot[name='submenu']");if(!s){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let t=null;for(const i of s.assignedElements())if(t=i.querySelectorAll("sl-menu-item, [role^='menuitem']"),t.length!==0)break;if(!(!t||t.length===0)){t[0].setAttribute("tabindex","0");for(let i=1;i!==t.length;++i)t[i].setAttribute("tabindex","-1");this.popupRef.value&&(e.preventDefault(),e.stopPropagation(),this.popupRef.value.active?t[0]instanceof HTMLElement&&t[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{t[0]instanceof HTMLElement&&t[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(e){this.popupRef.value&&this.popupRef.value.active!==e&&(this.popupRef.value.active=e,this.host.requestUpdate())}enableSubmenu(e=!0){e?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var e;if(!((e=this.host.parentElement)!=null&&e.computedStyleMap))return;const s=this.host.parentElement.computedStyleMap(),i=["padding-top","border-top-width","margin-top"].reduce((o,n)=>{var r;const l=(r=s.get(n))!=null?r:new CSSUnitValue(0,"px"),M=(l instanceof CSSUnitValue?l:new CSSUnitValue(0,"px")).to("px");return o-M.value},0);this.skidding=i}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){const e=getComputedStyle(this.host).direction==="rtl";return this.isConnected?u`
      <sl-popup
        ${Fe(this.popupRef)}
        placement=${e?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:u` <slot name="submenu" hidden></slot> `}},c=class extends E{constructor(){super(...arguments),this.localize=new O(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new j(this,"submenu"),this.submenuController=new He(this,this.hasSlotController),this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleMouseOver=e=>{this.focus(),e.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const e=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=e;return}e!==this.cachedTextLabel&&(this.cachedTextLabel=e,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return he(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const e=this.localize.dir()==="rtl",s=this.submenuController.isExpanded();return u`
      <div
        id="anchor"
        part="base"
        class=${F({"menu-item":!0,"menu-item--rtl":e,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":s})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!s}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${e?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?u` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};c.styles=[P,Pe];c.dependencies={"sl-icon":ue,"sl-popup":Y,"sl-spinner":de};a([g("slot:not([name])")],c.prototype,"defaultSlot",2);a([g(".menu-item")],c.prototype,"menuItem",2);a([d()],c.prototype,"type",2);a([d({type:Boolean,reflect:!0})],c.prototype,"checked",2);a([d()],c.prototype,"value",2);a([d({type:Boolean,reflect:!0})],c.prototype,"loading",2);a([d({type:Boolean,reflect:!0})],c.prototype,"disabled",2);a([S("checked")],c.prototype,"handleCheckedChange",1);a([S("disabled")],c.prototype,"handleDisabledChange",1);a([S("type")],c.prototype,"handleTypeChange",1);c.define("sl-menu-item");var We=$`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,K=class extends E{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(e){const s=["menuitem","menuitemcheckbox"],t=e.composedPath(),i=t.find(l=>{var p;return s.includes(((p=l==null?void 0:l.getAttribute)==null?void 0:p.call(l,"role"))||"")});if(!i||t.find(l=>{var p;return((p=l==null?void 0:l.getAttribute)==null?void 0:p.call(l,"role"))==="menu"})!==this)return;const r=i;r.type==="checkbox"&&(r.checked=!r.checked),this.emit("sl-select",{detail:{item:r}})}handleKeyDown(e){if(e.key==="Enter"||e.key===" "){const s=this.getCurrentItem();e.preventDefault(),e.stopPropagation(),s==null||s.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){const s=this.getAllItems(),t=this.getCurrentItem();let i=t?s.indexOf(t):0;s.length>0&&(e.preventDefault(),e.stopPropagation(),e.key==="ArrowDown"?i++:e.key==="ArrowUp"?i--:e.key==="Home"?i=0:e.key==="End"&&(i=s.length-1),i<0&&(i=s.length-1),i>s.length-1&&(i=0),this.setCurrentItem(s[i]),s[i].focus())}}handleMouseDown(e){const s=e.target;this.isMenuItem(s)&&this.setCurrentItem(s)}handleSlotChange(){const e=this.getAllItems();e.length>0&&this.setCurrentItem(e[0])}isMenuItem(e){var s;return e.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((s=e.getAttribute("role"))!=null?s:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>!(e.inert||!this.isMenuItem(e)))}getCurrentItem(){return this.getAllItems().find(e=>e.getAttribute("tabindex")==="0")}setCurrentItem(e){this.getAllItems().forEach(t=>{t.setAttribute("tabindex",t===e?"0":"-1")})}render(){return u`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};K.styles=[P,We];a([g("slot")],K.prototype,"defaultSlot",2);K.define("sl-menu");var Ke=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],x=class extends E{constructor(){super(...arguments),this.localize=new O(this),this.isoTime="",this.relativeTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=!1}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const e=new Date,s=new Date(this.date);if(isNaN(s.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const t=s.getTime()-e.getTime(),{unit:i,value:o}=Ke.find(n=>Math.abs(t)<n.max);if(this.isoTime=s.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(t/o),i,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let n;i==="minute"?n=T("second"):i==="hour"?n=T("minute"):i==="day"?n=T("hour"):n=T("day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),n)}return u` <time datetime=${this.isoTime}>${this.relativeTime}</time> `}};a([H()],x.prototype,"isoTime",2);a([H()],x.prototype,"relativeTime",2);a([d()],x.prototype,"date",2);a([d()],x.prototype,"format",2);a([d()],x.prototype,"numeric",2);a([d({type:Boolean})],x.prototype,"sync",2);function T(e){const t={second:1e3,minute:6e4,hour:36e5,day:864e5}[e];return t-Date.now()%t}x.define("sl-relative-time");var Ue=Object.defineProperty,qe=Object.getOwnPropertyDescriptor,A=(e,s,t,i)=>{for(var o=i>1?void 0:i?qe(s,t):s,n=e.length-1,r;n>=0;n--)(r=e[n])&&(o=(i?r(s,t,o):r(o))||o);return i&&o&&Ue(s,t,o),o};let y=class extends ye(ve){constructor(){super(...arguments),this.editing=!1}renderUsername(e){var t;const s=this.profilesProvider.currentProfileForAgent.get(e).get();switch(s.status){case"pending":return u`<sl-skeleton effect="pulse"></sl-skeleton>`;case"error":return u`<display-error
					.headline=${f("Failed to get the user's name.")}
					tooltip
					.error=${s.error}
				></display-error>`;case"completed":return u`<strong><span>${(t=s.value)==null?void 0:t.name}</span></strong>`}}renderSummary(e,s){return u`
			<div class="row" style="gap: 8px; flex: 1;">
				<agent-avatar .agentPubKey=${s.action.author}> </agent-avatar>

				<div class="column" style="gap: 4px; flex: 1">
					<div class="row" style="gap: 8px; flex: 1;">
						${this.renderUsername(s.action.author)}
						<sl-relative-time
							.date=${e.action.timestamp}
							class="placeholder"
						>
						</sl-relative-time>
					</div>
					<span style="white-space: pre-line"
						>${s.entry.content}</span
					>
				</div>
				${q(s.action.author)===q(this.commentsStore.client.client.myPubKey)?u`
							<sl-dropdown>
								<sl-icon-button
									slot="trigger"
									.src=${ce(me)}
								>
								</sl-icon-button>
								<sl-menu>
									<sl-menu-item
										@click=${()=>{this.editing=!0}}
										>${f("Edit")}</sl-menu-item
									>
									<sl-menu-item
										@click=${()=>this.shadowRoot.querySelector("sl-dialog").show()}
										>${f("Delete")}</sl-menu-item
									>
								</sl-menu>
							</sl-dropdown>
						`:u``}
			</div>
			<sl-dialog .label=${f("Delete Comment")}>
				<span>${f("Are you sure you want to delete this comment?")}</span>
				<sl-button
					slot="footer"
					@click=${()=>{var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("sl-dialog").hide()}}
					>${f("Cancel")}</sl-button
				>
				<sl-button
					variant="danger"
					slot="footer"
					@click=${async t=>{const i=t.target;i.loading=!0;try{await this.commentsStore.client.deleteComment(this.commentHash)}catch(o){console.error(o),pe(f("Failed to delete comment."))}i.loading=!1}}
					>${f("Delete")}
				</sl-button>
			</sl-dialog>
		`}render(){const e=xe([this.commentsStore.comments.get(this.commentHash).original.get(),this.commentsStore.comments.get(this.commentHash).latestVersion.get()]);switch(e.status){case"pending":return u`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return u`<display-error
					.headline=${f("Error fetching the comment")}
					.error=${e.error}
				></display-error>`;case"completed":return this.editing?u`<edit-comment
						style="flex: 1"
						.commentHash=${this.commentHash}
						@comment-updated=${()=>{this.editing=!1}}
					></edit-comment>`:this.renderSummary(e.value[0],e.value[1])}}};y.styles=[ee,$`
			:host {
				display: flex;
			}
		`];A([d(fe("comment-hash"))],y.prototype,"commentHash",2);A([X({context:te,subscribe:!0})],y.prototype,"commentsStore",2);A([X({context:we,subscribe:!0})],y.prototype,"profilesProvider",2);A([H()],y.prototype,"editing",2);y=A([ge(),be("comment-summary")],y);export{y as CommentSummary};
