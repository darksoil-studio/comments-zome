import{s as p,c as h}from"./context.fuYjI_tx.js";import{o as d}from"./chunk.XA43ZQPC.Cb1mbs-A.js";import{n as u,m,h as y,r as f,l as g}from"./chunk.EZCUSG7Q.W0X_B2zs.js";import{n as v,c as b,t as x}from"./property.CharCVmj.js";import{t as C,x as l,i as E}from"./comments-client.OH33Uicx.js";import{S as H}from"./signal-watcher.BnQzQUCv.js";import"./static.DqwAlrPG.js";import"./range.Bk9X9Gv-.js";import"./baseClone.BoWs54YW.js";import"./getTag.DT3HxZ-h.js";import"./toFinite.Br319kFa.js";var S=Object.defineProperty,w=Object.getOwnPropertyDescriptor,i=(t,e,r,o)=>{for(var s=o>1?void 0:o?w(e,r):e,a=t.length-1,c;a>=0;a--)(c=t[a])&&(s=(o?c(e,r,s):c(s))||s);return o&&s&&S(e,r,s),s};let n=class extends H(E){constructor(){super(...arguments),this.committing=!1}async firstUpdated(){await C(this.commentsStore.comments.get(this.commentHash).latestVersion),setTimeout(()=>{var t;((t=this.shadowRoot)==null?void 0:t.getElementById("form")).reset()})}async updateComment(t,e){const r={commented_hash:t.entry.commented_hash,content:e.content,reply_to:t.entry.reply_to};try{this.committing=!0;const o=await this.commentsStore.client.updateComment(this.commentHash,t.actionHash,r);this.dispatchEvent(new CustomEvent("comment-updated",{composed:!0,bubbles:!0,detail:{originalCommentHash:this.commentHash,previousCommentHash:t.actionHash,updatedCommentHash:o.actionHash}}))}catch(o){console.error(o),u(m("Error updating the comment"))}this.committing=!1}renderEditForm(t){return l`
			<form
				id="form"
				class="row"
				style="flex: 1; gap: 8px;"
				${d(e=>this.updateComment(t,e))}
			>
				<agent-avatar
					.agentPubKey=${this.commentsStore.client.client.myPubKey}
					size="40"
				>
				</agent-avatar>

				<div class="column" style="gap: 4px; flex: 1">
					<sl-input
						name="content"
						.placeholder=${m("Add a comment...")}
						required
						.defaultValue=${t.entry.content}
					></sl-input>

					<div class="row" style="gap: 4px; justify-content: end">
						<sl-button
							@click=${()=>this.dispatchEvent(new CustomEvent("cancel-clicked",{bubbles:!0,composed:!0}))}
							>${m("Cancel")}</sl-button
						>
						<sl-button
							variant="primary"
							type="submit"
							.loading=${this.committing}
							>${m("Save")}</sl-button
						>
					</div>
				</div>
			</form>
		`}render(){const t=this.commentsStore.comments.get(this.commentHash).latestVersion.get();switch(t.status){case"pending":return l`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;case"error":return l`<display-error
					.headline=${m("Error fetching the comment")}
					.error=${t.error}
				></display-error>`;case"completed":return this.renderEditForm(t.value)}}};n.styles=[p];i([v(y("comment-hash"))],n.prototype,"commentHash",2);i([b({context:h})],n.prototype,"commentsStore",2);i([f()],n.prototype,"committing",2);n=i([g(),x("edit-comment")],n);export{n as EditComment};
