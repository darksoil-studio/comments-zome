import{s as h,c as u}from"./context.fuYjI_tx.js";import{o as d}from"./chunk.XA43ZQPC.Cb1mbs-A.js";import{n as y,m as c,h as p,r as f,e as b,l as v}from"./chunk.EZCUSG7Q.W0X_B2zs.js";import{n as l,c as g,t as C}from"./property.CharCVmj.js";import"./display-error.CXXUIYRx.js";import{x,i as S}from"./comments-client.OH33Uicx.js";import{S as _}from"./signal-watcher.BnQzQUCv.js";import"./agent-avatar.DDOu5T1C.js";import"./static.DqwAlrPG.js";import"./range.Bk9X9Gv-.js";import"./baseClone.BoWs54YW.js";import"./getTag.DT3HxZ-h.js";import"./toFinite.Br319kFa.js";import"./tslib.es6.kHcLnhpD.js";var w=Object.defineProperty,P=Object.getOwnPropertyDescriptor,s=(r,m,e,n)=>{for(var o=n>1?void 0:n?P(m,e):m,i=r.length-1,a;i>=0;i--)(a=r[i])&&(o=(n?a(m,e,o):a(o))||o);return n&&o&&w(m,e,o),o};let t=class extends _(S){constructor(){super(...arguments),this.committing=!1}async createComment(r){const m={commented_hash:this.commentedHash,content:r.content,reply_to:this.replyTo};try{this.committing=!0;const e=await this.commentsStore.client.createComment(m);this.dispatchEvent(new CustomEvent("comment-created",{composed:!0,bubbles:!0,detail:{commentHash:e.actionHash}})),this.form.reset()}catch(e){console.error(e),y(c("Error creating the comment"))}this.committing=!1}render(){return x`
			<form
				id="create-form"
				class="row"
				style="flex: 1; gap: 8px;"
				${d(r=>this.createComment(r))}
			>
				<agent-avatar
					.agentPubKey=${this.commentsStore.client.client.myPubKey}
					size="40"
				>
				</agent-avatar>

				<div class="column" style="gap: 4px; flex: 1">
					<sl-input
						name="content"
						.placeholder=${c("Add a comment...")}
						required
					></sl-input>

					<div class="row" style="gap: 4px; justify-content: end">
						<sl-button
							@click=${()=>this.dispatchEvent(new CustomEvent("cancel-clicked",{bubbles:!0,composed:!0}))}
							>${c("Cancel")}</sl-button
						>
						<sl-button
							variant="primary"
							type="submit"
							.loading=${this.committing}
							>${c("Comment")}</sl-button
						>
					</div>
				</div>
			</form>
		`}};t.styles=[h];s([l(p("commented-hash"))],t.prototype,"commentedHash",2);s([l(p("reply-to"))],t.prototype,"replyTo",2);s([g({context:u,subscribe:!0})],t.prototype,"commentsStore",2);s([f()],t.prototype,"committing",2);s([b("#create-form")],t.prototype,"form",2);t=s([v(),C("create-comment")],t);export{t as CreateComment};
