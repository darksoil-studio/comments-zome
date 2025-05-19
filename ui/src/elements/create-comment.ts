import {
	hashProperty,
	hashState,
	notifyError,
	onSubmit,
	sharedStyles,
	wrapPathInSvg,
} from '@darksoil-studio/holochain-elements';
import '@darksoil-studio/holochain-elements/dist/elements/display-error.js';
import { SignalWatcher } from '@darksoil-studio/holochain-signals';
import { EntryRecord } from '@darksoil-studio/holochain-utils';
import '@darksoil-studio/profiles-provider/dist/elements/agent-avatar.js';
import {
	ActionHash,
	AgentPubKey,
	AnyDhtHash,
	DnaHash,
	EntryHash,
	Record,
} from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiAlertCircleOutline, mdiDelete } from '@mdi/js';
import SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { CommentsStore } from '../comments-store.js';
import { commentsStoreContext } from '../context.js';
import { Comment } from '../types.js';

/**
 * @element create-comment
 * @fires comment-created: detail will contain { commentHash }
 */
@localized()
@customElement('create-comment')
export class CreateComment extends SignalWatcher(LitElement) {
	/**
	 * OPTIONAl. The reply to for this Comment
	 */
	@property(hashProperty('commented-hash'))
	commentedHash!: AnyDhtHash;

	/**
	 * OPTIONAl. The reply to for this Comment
	 */
	@property(hashProperty('reply-to'))
	replyTo: ActionHash | undefined;

	/**
	 * @internal
	 */
	@consume({ context: commentsStoreContext, subscribe: true })
	commentsStore!: CommentsStore;

	/**
	 * @internal
	 */
	@state()
	committing = false;

	/**
	 * @internal
	 */
	@query('#create-form')
	form!: HTMLFormElement;

	async createComment(fields: Partial<Comment>) {
		const comment: Comment = {
			commented_hash: this.commentedHash,
			content: fields.content!,
			reply_to: this.replyTo!,
		};

		try {
			this.committing = true;
			const record: EntryRecord<Comment> =
				await this.commentsStore.client.createComment(comment);

			this.dispatchEvent(
				new CustomEvent('comment-created', {
					composed: true,
					bubbles: true,
					detail: {
						commentHash: record.actionHash,
					},
				}),
			);

			this.form.reset();
		} catch (e: unknown) {
			console.error(e);
			notifyError(msg('Error creating the comment'));
		}
		this.committing = false;
	}

	render() {
		return html`
			<form
				id="create-form"
				class="row"
				style="flex: 1; gap: 8px;"
				${onSubmit(fields => this.createComment(fields))}
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
							>${msg('Comment')}</sl-button
						>
					</div>
				</div>
			</form>
		`;
	}

	static styles = [sharedStyles];
}
