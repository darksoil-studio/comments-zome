import{c as l}from"./context.fuYjI_tx.js";import{i as a,e as x,c as h,x as C,g as f}from"./comments-client.OH33Uicx.js";import{a as u,c as y,n as m,t as v}from"./property.CharCVmj.js";import{e as w}from"./provide.Cu18GzwK.js";import"./range.Bk9X9Gv-.js";import"./baseClone.BoWs54YW.js";import"./getTag.DT3HxZ-h.js";import"./toFinite.Br319kFa.js";const _=u("tnesh/appClientContext");var b=Object.defineProperty,O=Object.getOwnPropertyDescriptor,o=(i,r,s,n)=>{for(var t=n>1?void 0:n?O(r,s):r,c=i.length-1,p;c>=0;c--)(p=i[c])&&(t=(n?p(r,s,t):p(t))||t);return n&&t&&b(r,s,t),t};let e=class extends a{constructor(){super(...arguments),this.zome="comments"}connectedCallback(){if(super.connectedCallback(),!this.store){if(!this.role)throw new Error('<comments-context> must have a role="YOUR_DNA_ROLE" property, eg: <comments-context role="role1">');if(!this.client)throw new Error(`<comments-context> must either:
        a) be placed inside <app-client-context>
          or 
        b) receive an AppClient property (eg. <comments-context .client=\${client}>) 
          or 
        c) receive a store property (eg. <comments-context .store=\${store}>)
      `);this.store=new x(new h(this.client,this.role,this.zome))}}render(){return C`<slot></slot>`}};e.styles=f`
		:host {
			display: contents;
		}
	`;o([y({context:_})],e.prototype,"client",2);o([w({context:l}),m({type:Object})],e.prototype,"store",2);o([m()],e.prototype,"role",2);o([m()],e.prototype,"zome",2);e=o([v("comments-context")],e);export{e as CommentsContext};
