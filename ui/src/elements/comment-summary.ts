import {
	hashProperty,
	notifyError,
	sharedStyles,
	wrapPathInSvg,
} from '@darksoil-studio/holochain-elements';
import '@darksoil-studio/holochain-elements/dist/elements/display-error.js';
import { SignalWatcher, joinAsync } from '@darksoil-studio/holochain-signals';
import { EntryRecord } from '@darksoil-studio/holochain-utils';
import {
	ProfilesProvider,
	profilesProviderContext,
} from '@darksoil-studio/profiles-provider';
import '@darksoil-studio/profiles-provider/dist/elements/agent-avatar.js';
import {
	ActionHash,
	AgentPubKey,
	EntryHash,
	Record,
	encodeHashToBase64,
} from '@holochain/client';
import { consume } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { mdiDotsVertical } from '@mdi/js';
import { SlButton, SlDialog } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { CommentsStore } from '../comments-store.js';
import { commentsStoreContext } from '../context.js';
import { Comment } from '../types.js';
import './edit-comment.js';

/**
 * @element comment-summary
 * @fires comment-selected: detail will contain { commentHash }
 */
@localized()
@customElement('comment-summary')
export class CommentSummary extends SignalWatcher(LitElement) {
	/**
	 * REQUIRED. The hash of the Comment to show
	 */
	@property(hashProperty('comment-hash'))
	commentHash!: ActionHash;

	/**
	 * @internal
	 */
	@consume({ context: commentsStoreContext, subscribe: true })
	commentsStore!: CommentsStore;

	/**
	 * @internal
	 */
	@consume({ context: profilesProviderContext, subscribe: true })
	profilesProvider!: ProfilesProvider;

	@state()
	editing = false;

	renderUsername(agent: AgentPubKey) {
		const profile = this.profilesProvider.currentProfileForAgent
			.get(agent)
			.get();

		switch (profile.status) {
			case 'pending':
				return html`<sl-skeleton effect="pulse"></sl-skeleton>`;
			case 'error':
				return html`<display-error
					.headline=${msg("Failed to get the user's name.")}
					tooltip
					.error=${profile.error}
				></display-error>`;
			case 'completed':
				return html`<strong><span>${profile.value?.name}</span></strong>`;
		}
	}

	renderSummary(
		original: EntryRecord<Comment>,
		entryRecord: EntryRecord<Comment>,
	) {
		return html`
			<div class="row" style="gap: 8px; flex: 1;">
				<agent-avatar .agentPubKey=${entryRecord.action.author}> </agent-avatar>

				<div class="column" style="gap: 4px; flex: 1">
					<div class="row" style="gap: 8px; flex: 1;">
						${this.renderUsername(entryRecord.action.author)}
						<sl-relative-time
							.date=${original.action.timestamp}
							class="placeholder"
						>
						</sl-relative-time>
					</div>
					<span style="white-space: pre-line"
						>${entryRecord.entry.content}</span
					>
				</div>
				${encodeHashToBase64(entryRecord.action.author) ===
				encodeHashToBase64(this.commentsStore.client.client.myPubKey)
					? html`
							<sl-dropdown>
								<sl-icon-button
									slot="trigger"
									.src=${wrapPathInSvg(mdiDotsVertical)}
								>
								</sl-icon-button>
								<sl-menu>
									<sl-menu-item
										@click=${() => {
											this.editing = true;
										}}
										>${msg('Edit')}</sl-menu-item
									>
									<sl-menu-item
										@click=${() =>
											this.shadowRoot!.querySelector('sl-dialog')!.show()}
										>${msg('Delete')}</sl-menu-item
									>
								</sl-menu>
							</sl-dropdown>
						`
					: html``}
			</div>
			<sl-dialog .label=${msg('Delete Comment')}>
				<span>${msg('Are you sure you want to delete this comment?')}</span>
				<sl-button
					slot="footer"
					@click=${() => this.shadowRoot?.querySelector('sl-dialog')!.hide()}
					>${msg('Cancel')}</sl-button
				>
				<sl-button
					variant="danger"
					slot="footer"
					@click=${async (e: CustomEvent) => {
						const button = e.target as SlButton;
						button.loading = true;
						try {
							await this.commentsStore.client.deleteComment(this.commentHash);
						} catch (e) {
							console.error(e);
							notifyError(msg('Failed to delete comment.'));
						}
						button.loading = false;
					}}
					>${msg('Delete')}
				</sl-button>
			</sl-dialog>
		`;
	}

	render() {
		const comment = joinAsync([
			this.commentsStore.comments.get(this.commentHash).original.get(),
			this.commentsStore.comments.get(this.commentHash).latestVersion.get(),
		]);

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
				if (this.editing)
					return html`<edit-comment
						style="flex: 1"
						.commentHash=${this.commentHash}
						@comment-updated=${() => {
							this.editing = false;
						}}
					></edit-comment>`;
				return this.renderSummary(comment.value[0], comment.value[1]);
		}
	}

	static styles = [
		sharedStyles,
		css`
			:host {
				display: flex;
			}
		`,
	];
}
