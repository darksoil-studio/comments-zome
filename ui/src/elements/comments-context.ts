import { appClientContext } from '@darksoil-studio/holochain-elements';
import { AppClient } from '@holochain/client';
import { consume, provide } from '@lit/context';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { CommentsClient } from '../comments-client.js';
import { CommentsStore } from '../comments-store.js';
import { commentsStoreContext } from '../context.js';

/**
 * @element comments-context
 */
@customElement('comments-context')
export class CommentsContext extends LitElement {
	@consume({ context: appClientContext })
	private client!: AppClient;

	@provide({ context: commentsStoreContext })
	@property({ type: Object })
	store!: CommentsStore;

	@property()
	role!: string;

	@property()
	zome = 'comments';

	connectedCallback() {
		super.connectedCallback();
		if (this.store) return;
		if (!this.role) {
			throw new Error(
				`<comments-context> must have a role="YOUR_DNA_ROLE" property, eg: <comments-context role="role1">`,
			);
		}
		if (!this.client) {
			throw new Error(`<comments-context> must either:
        a) be placed inside <app-client-context>
          or 
        b) receive an AppClient property (eg. <comments-context .client=\${client}>) 
          or 
        c) receive a store property (eg. <comments-context .store=\${store}>)
      `);
		}

		this.store = new CommentsStore(
			new CommentsClient(this.client, this.role, this.zome),
		);
	}

	render() {
		return html`<slot></slot>`;
	}

	static styles = css`
		:host {
			display: contents;
		}
	`;
}
