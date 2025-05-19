import{s as l,c as d}from"./context.fuYjI_tx.js";import{w as f,m as a,c as h,h as u,l as y}from"./chunk.EZCUSG7Q.W0X_B2zs.js";import{n as v,c as x,t as g}from"./property.CharCVmj.js";import"./display-error.CXXUIYRx.js";import{x as o,i as w}from"./comments-client.OH33Uicx.js";import{S}from"./signal-watcher.BnQzQUCv.js";import"./chunk.EA437WHD.Bmu-oHsB.js";import"./comment-summary.El92FlnW.js";import"./static.DqwAlrPG.js";import"./range.Bk9X9Gv-.js";import"./baseClone.BoWs54YW.js";import"./getTag.DT3HxZ-h.js";import"./toFinite.Br319kFa.js";import"./agent-avatar.DDOu5T1C.js";import"./tslib.es6.kHcLnhpD.js";import"./edit-comment.BSA_6coS.js";import"./chunk.XA43ZQPC.Cb1mbs-A.js";var P=Object.defineProperty,_=Object.getOwnPropertyDescriptor,p=(e,r,n,s)=>{for(var t=s>1?void 0:s?_(r,n):r,i=e.length-1,c;i>=0;i--)(c=e[i])&&(t=(s?c(r,n,t):c(t))||t);return s&&t&&P(r,n,t),t};let m=class extends S(w){firstUpdated(){if(this.commentedHash===void 0)throw new Error("The commented property is required for the comments-for-commented element")}renderList(e){return e.length===0?o` <div
				class="column placeholder center-content"
				style="gap: 8px; flex: 1;"
			>
				<sl-icon
					style="font-size: 64px;"
					.src=${f(h)}
				></sl-icon>
				<span style="text-align: center"
					>${a("No comments found for this commented.")}</span
				>
			</div>`:o`
			<div class="column" style="gap: 16px;">
				${e.map(r=>o`<comment-summary .commentHash=${r}></comment-summary>`)}
			</div>
		`}render(){const e=this.commentsStore.commentsForCommented.get(this.commentedHash).live.get();switch(e.status){case"pending":return o`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return o`<display-error
					.headline=${a("Error fetching the comments")}
					.error=${e.error}
				></display-error>`;case"completed":return this.renderList(Array.from(e.value.keys()))}}};m.styles=[l];p([v(u("commented"))],m.prototype,"commentedHash",2);p([x({context:d,subscribe:!0})],m.prototype,"commentsStore",2);m=p([y(),g("comments-for-commented")],m);export{m as CommentsForCommented};
