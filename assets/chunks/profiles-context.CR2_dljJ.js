import{_ as t}from"./tslib.es6.kHcLnhpD.js";import{a as o,n as r,c as s,t as n}from"./property.CharCVmj.js";import{e as l}from"./provide.Cu18GzwK.js";import{g as i,a,b as p,x as c,i as f}from"./comments-client.OH33Uicx.js";import{S as x}from"./signal-watcher.BnQzQUCv.js";import"./range.Bk9X9Gv-.js";import"./baseClone.BoWs54YW.js";import"./getTag.DT3HxZ-h.js";import"./toFinite.Br319kFa.js";const m=o("hc_zome_profiles/store"),d=o("ProfilesProvider");i`
		.row {
			display: flex;
			flex-direction: row;
		}
		.column {
			display: flex;
			flex-direction: column;
		}
		.small-margin {
			margin-top: 6px;
		}
		.big-margin {
			margin-top: 23px;
		}

		.fill {
			flex: 1;
			height: 100%;
		}

		.title {
			font-size: 20px;
		}

		.center-content {
			align-items: center;
			justify-content: center;
		}

		.placeholder {
			color: var(--sl-color-gray-700);
		}

		.flex-scrollable-parent {
			position: relative;
			display: flex;
			flex: 1;
		}

		.flex-scrollable-container {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}

		.flex-scrollable-x {
			max-width: 100%;
			overflow-x: auto;
		}
		.flex-scrollable-y {
			max-height: 100%;
			overflow-y: auto;
		}
		:host {
			color: var(--sl-color-neutral-1000);
		}

		sl-card {
			display: flex;
		}
		sl-card::part(base) {
			flex: 1;
		}
		sl-card::part(body) {
			display: flex;
			flex: 1;
			height: 100%;
		}
		sl-drawer::part(body) {
			display: flex;
		}
	`;const h=o("tnesh/appClientContext");let e=class extends x(f){constructor(){super(...arguments),this.zome="profiles"}connectedCallback(){if(super.connectedCallback(),!this.store){if(!this.role)throw new Error('<profiles-context> must have a role="YOUR_DNA_ROLE" property, eg: <profiles-context role="role1">');if(!this.client)throw new Error(`<profiles-context> must either:
				a) be placed inside <app-client-context>
					or 
				b) receive an AppClient property (eg. <profiles-context .client=\${client}>) 
					or 
				c) receive a store property (eg. <profiles-context .store=\${store}>)`);this.store=new a(new p(this.client,this.role,this.zome))}}render(){return c`<slot></slot>`}};e.styles=i`
		:host {
			display: contents;
		}
	`;t([l({context:m}),l({context:d}),r({type:Object})],e.prototype,"store",void 0);t([s({context:h,subscribe:!0})],e.prototype,"client",void 0);t([r()],e.prototype,"role",void 0);t([r()],e.prototype,"zome",void 0);e=t([n("profiles-context")],e);export{e as ProfilesContext};
