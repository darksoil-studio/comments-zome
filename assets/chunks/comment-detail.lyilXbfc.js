import{s as d,c as h}from"./context.fuYjI_tx.js";import{n as u,m as n,w as p,a as f,b as y,h as v,l as x}from"./chunk.EZCUSG7Q.W0X_B2zs.js";import{n as b,c as g,t as w}from"./property.CharCVmj.js";import"./display-error.CXXUIYRx.js";import{x as c,i as C,g as $}from"./comments-client.OH33Uicx.js";import{S}from"./signal-watcher.BnQzQUCv.js";import"./chunk.EA437WHD.Bmu-oHsB.js";import"./static.DqwAlrPG.js";import"./range.Bk9X9Gv-.js";import"./baseClone.BoWs54YW.js";import"./getTag.DT3HxZ-h.js";import"./toFinite.Br319kFa.js";var E=Object.defineProperty,P=Object.getOwnPropertyDescriptor,a=(e,r,i,o)=>{for(var t=o>1?void 0:o?P(r,i):r,m=e.length-1,l;m>=0;m--)(l=e[m])&&(t=(o?l(r,i,t):l(t))||t);return o&&t&&E(r,i,t),t};let s=class extends S(C){async deleteComment(){try{await this.commentsStore.client.deleteComment(this.commentHash),this.dispatchEvent(new CustomEvent("comment-deleted",{bubbles:!0,composed:!0,detail:{commentHash:this.commentHash}}))}catch(e){console.error(e),u(n("Error deleting the comment"))}}renderDetail(e){return c`
			<sl-card style="flex: 1">
				<div class="column" style="gap: 16px; flex: 1;">
					<div class="row" style="gap: 8px">
						<span style="font-size: 18px; flex: 1;">${n("Comment")}</span>

						<sl-icon-button
							.src=${p(f)}
							@click=${()=>this.dispatchEvent(new CustomEvent("edit-clicked",{bubbles:!0,composed:!0}))}
						></sl-icon-button>
						<sl-icon-button
							.src=${p(y)}
							@click=${()=>this.deleteComment()}
						></sl-icon-button>
					</div>

					<div class="column" style="gap: 8px;">
						<span><strong>${n("Content")}</strong></span>
						<span style="white-space: pre-line"
							>${e.entry.content}</span
						>
					</div>
				</div>
			</sl-card>
		`}render(){const e=this.commentsStore.comments.get(this.commentHash).latestVersion.get();switch(e.status){case"pending":return c`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return c`<display-error
					.headline=${n("Error fetching the comment")}
					.error=${e.error}
				></display-error>`;case"completed":return this.renderDetail(e.value)}}};s.styles=[d,$`
			:host {
				display: flex;
			}
		`];a([b(v("comment-hash"))],s.prototype,"commentHash",2);a([g({context:h,subscribe:!0})],s.prototype,"commentsStore",2);s=a([x(),w("comment-detail")],s);export{s as CommentDetail};
