import {
	hashProperty,
	hashState,
	notifyError,
	onSubmit,
	sharedStyles,
	wrapPathInSvg,
} from '@darksoil-studio/holochain-elements';
import { SignalWatcher, toPromise } from '@darksoil-studio/holochain-signals';
import { EntryRecord } from '@darksoil-studio/holochain-utils';
import { ActionHash, AgentPubKey, EntryHash, Record } from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiAlertCircleOutline, mdiDelete } from '@mdi/js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { CommentsStore } from '../comments-store.js';
import { commentsStoreContext } from '../context.js';
import { Comment } from '../types.js';

/**
 * @element edit-comment
 * @fires comment-updated: detail will contain { originalCommentHash, previousCommentHash, updatedCommentHash }
 */
@localized()
@customElement('edit-comment')
export class EditComment extends SignalWatcher(LitElement) {
	/**
	 * REQUIRED. The hash of the original `Create` action for this Comment
	 */
	@property(hashProperty('comment-hash'))
	commentHash!: ActionHash;

	/**
	 * @internal
	 */
	@consume({ context: commentsStoreContext })
	commentsStore!: CommentsStore;

	/**
	 * @internal
	 */
	@state()
	committing = false;

	async firstUpdated() {
		const currentRecord = await toPromise(
			this.commentsStore.comments.get(this.commentHash).latestVersion,
		);
		setTimeout(() => {
			(this.shadowRoot?.getElementById('form') as HTMLFormElement).reset();
		});
	}

	async updateComment(
		currentRecord: EntryRecord<Comment>,
		fields: Partial<Comment>,
	) {
		const comment: Comment = {
			commented_hash: currentRecord.entry.commented_hash,
			content: fields.content!,
			reply_to: currentRecord.entry.reply_to!,
		};

		try {
			this.committing = true;
			const updateRecord = await this.commentsStore.client.updateComment(
				this.commentHash,
				currentRecord.actionHash,
				comment,
			);

			this.dispatchEvent(
				new CustomEvent('comment-updated', {
					composed: true,
					bubbles: true,
					detail: {
						originalCommentHash: this.commentHash,
						previousCommentHash: currentRecord.actionHash,
						updatedCommentHash: updateRecord.actionHash,
					},
				}),
			);
		} catch (e: unknown) {
			console.error(e);
			notifyError(msg('Error updating the comment'));
		}

		this.committing = false;
	}

	renderEditForm(currentRecord: EntryRecord<Comment>) {
		return html`
			<form
				id="form"
				class="row"
				style="flex: 1; gap: 8px;"
				${onSubmit(fields => this.updateComment(currentRecord, fields))}
			>
				<agent-avatar
					.agentPubKey=${this.commentsStore.client.client.myPubKey}
					size="40"
				>
				</agent-avatar>

				<div class="column" style="gap: 4px; flex: 1">
					<sl-input
						name="content"
						.placeholder=${msg('Add a comment...')}
						required
						.defaultValue=${currentRecord.entry.content}
					></sl-input>

					<div class="row" style="gap: 4px; justify-content: end">
						<sl-button
							@click=${() =>
								this.dispatchEvent(
									new CustomEvent('cancel-clicked', {
										bubbles: true,
										composed: true,
									}),
								)}
							>${msg('Cancel')}</sl-button
						>
						<sl-button
							variant="primary"
							type="submit"
							.loading=${this.committing}
							>${msg('Save')}</sl-button
						>
					</div>
				</div>
			</form>
		`;
	}

	render() {
		const comment = this.commentsStore.comments
			.get(this.commentHash)
			.latestVersion.get();

		switch (comment.status) {
			case 'pending':
				return html`<div
					style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
				>
					<sl-spinner style="font-size: 2rem;"></sl-spinner>
				</div>`;
			case 'error':
				return html`<display-error
					.headline=${msg('Error fetching the comment')}
					.error=${comment.error}
				></display-error>`;
			case 'completed':
				return this.renderEditForm(comment.value);
		}
	}

	static styles = [sharedStyles];
}
