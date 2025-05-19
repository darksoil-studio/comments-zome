import{s as l,c as f}from"./context.fuYjI_tx.js";import{w as h,m as a,c as d,h as u,l as y}from"./chunk.EZCUSG7Q.W0X_B2zs.js";import{n as v,c as x,t as g}from"./property.CharCVmj.js";import"./display-error.CXXUIYRx.js";import{x as o,i as S}from"./comments-client.OH33Uicx.js";import{S as P}from"./signal-watcher.BnQzQUCv.js";import"./chunk.EA437WHD.Bmu-oHsB.js";import"./comment-summary.El92FlnW.js";import"./static.DqwAlrPG.js";import"./range.Bk9X9Gv-.js";import"./baseClone.BoWs54YW.js";import"./getTag.DT3HxZ-h.js";import"./toFinite.Br319kFa.js";import"./agent-avatar.DDOu5T1C.js";import"./tslib.es6.kHcLnhpD.js";import"./edit-comment.BSA_6coS.js";import"./chunk.XA43ZQPC.Cb1mbs-A.js";var _=Object.defineProperty,$=Object.getOwnPropertyDescriptor,p=(e,r,n,m)=>{for(var t=m>1?void 0:m?$(r,n):r,i=e.length-1,c;i>=0;i--)(c=e[i])&&(t=(m?c(r,n,t):c(t))||t);return m&&t&&_(r,n,t),t};let s=class extends P(S){renderList(e){return e.length===0?o` <div
				class="column placeholder center-content"
				style="gap: 8px; flex: 1"
			>
				<sl-icon
					style="font-size: 64px;"
					.src=${h(d)}
				></sl-icon>
				<span style="text-align: center"
					>${a("No comments found for this comment.")}</span
				>
			</div>`:o`
			<div class="column" style="gap: 8px">
				${e.map(r=>o`<comment-summary .commentHash=${r}></comment-summary>`)}
			</div>
		`}render(){const e=this.commentsStore.comments.get(this.commentHash).comments.live.get();switch(e.status){case"pending":return o`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return o`<display-error
					.headline=${a("Error fetching the comments")}
					.error=${e.error}
				></display-error>`;case"completed":return this.renderList(e.value)}}};s.styles=[l];p([v(u("comment-hash"))],s.prototype,"commentHash",2);p([x({context:f,subscribe:!0})],s.prototype,"commentsStore",2);s=p([y(),g("comments-for-comment")],s);export{s as CommentsForComment};
