import { hashProperty, sharedStyles } from "@darksoil-studio/holochain-elements";
import { SignalWatcher } from "@darksoil-studio/holochain-signals";
import { EntryRecord } from "@darksoil-studio/holochain-utils";
import { ActionHash, EntryHash, Record } from "@holochain/client";
import { consume } from "@lit/context";
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { localized, msg } from "@lit/localize";

import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";

import "@darksoil-studio/holochain-elements/dist/elements/display-error.js";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import { CommentsStore } from "../comments-store.js";
import { commentsStoreContext } from "../context.js";
import { Comment } from "../types.js";

/**
 * @element comment-summary
 * @fires comment-selected: detail will contain { commentHash }
 */
@localized()
@customElement("comment-summary")
export class CommentSummary extends SignalWatcher(LitElement) {
  /**
   * REQUIRED. The hash of the Comment to show
   */
  @property(hashProperty("comment-hash"))
  commentHash!: ActionHash;

  /**
   * @internal
   */
  @consume({ context: commentsStoreContext, subscribe: true })
  commentsStore!: CommentsStore;

  renderSummary(entryRecord: EntryRecord<Comment>) {
    return html`
      <div class="column" style="gap: 16px; flex: 1;">

          <div class="column" style="gap: 8px">
	        <span><strong>${msg("Content")}</strong></span>
 	        <span style="white-space: pre-line">${entryRecord.entry.content}</span>
	  </div>

      </div>
    `;
  }

  renderComment() {
    const comment = this.commentsStore.comments.get(this.commentHash).latestVersion.get();

    switch (comment.status) {
      case "pending":
        return html`<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;"
        >
          <sl-spinner style="font-size: 2rem;"></sl-spinner>
        </div>`;
      case "error":
        return html`<display-error
          .headline=${msg("Error fetching the comment")}
          .error=${comment.error}
        ></display-error>`;
      case "completed":
        return this.renderSummary(comment.value);
    }
  }

  render() {
    return html`<sl-card style="flex: 1; cursor: grab;" @click=${() =>
      this.dispatchEvent(
        new CustomEvent("comment-selected", {
          composed: true,
          bubbles: true,
          detail: {
            commentHash: this.commentHash,
          },
        }),
      )}>
      ${this.renderComment()}
    </sl-card>`;
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
