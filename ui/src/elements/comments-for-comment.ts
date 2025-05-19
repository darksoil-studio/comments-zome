import {
	hashProperty,
	sharedStyles,
	wrapPathInSvg,
} from '@darksoil-studio/holochain-elements';
import '@darksoil-studio/holochain-elements/dist/elements/display-error.js';
import {
	AsyncComputed,
	SignalWatcher,
} from '@darksoil-studio/holochain-signals';
import { EntryRecord, slice } from '@darksoil-studio/holochain-utils';
import { ActionHash, AgentPubKey, EntryHash, Record } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiInformationOutline } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { CommentsStore } from '../comments-store.js';
import { commentsStoreContext } from '../context.js';
import { Comment } from '../types.js';
import './comment-summary.js';

/**
 * @element comments-for-comment
 */
@localized()
@customElement('comments-for-comment')
export class CommentsForComment extends SignalWatcher(LitElement) {
	/**
	 * REQUIRED. The CommentHash for which the Comments should be fetched
	 */
	@property(hashProperty('comment-hash'))
	commentHash!: ActionHash;

	/**
	 * @internal
	 */
	@consume({ context: commentsStoreContext, subscribe: true })
	commentsStore!: CommentsStore;

	renderList(hashes: Array<ActionHash>) {
		if (hashes.length === 0) {
			return html` <div
				class="column placeholder center-content"
				style="gap: 8px; flex: 1"
			>
				<sl-icon
					style="font-size: 64px;"
					.src=${wrapPathInSvg(mdiInformationOutline)}
				></sl-icon>
				<span style="text-align: center"
					>${msg('No comments found for this comment.')}</span
				>
			</div>`;
		}

		return html`
			<div class="column" style="gap: 8px">
				${hashes.map(
					hash =>
						html`<comment-summary .commentHash=${hash}></comment-summary>`,
				)}
			</div>
		`;
	}

	render() {
		const hashes = this.commentsStore.comments
			.get(this.commentHash)
			.comments.live.get();

		switch (hashes.status) {
			case 'pending':
				return html`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the comments')}
					.error=${hashes.error}
				></display-error>`;
			case 'completed':
				return this.renderList(hashes.value);
		}
	}

	static styles = [sharedStyles];
}
