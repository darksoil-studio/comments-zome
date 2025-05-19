import { hashProperty, notifyError, sharedStyles, wrapPathInSvg } from "@darksoil-studio/holochain-elements";
import { SignalWatcher } from "@darksoil-studio/holochain-signals";
import { EntryRecord } from "@darksoil-studio/holochain-utils";
import { ActionHash, EntryHash, Record } from "@holochain/client";
import { consume } from "@lit/context";
import { localized, msg } from "@lit/localize";
import { mdiAlertCircleOutline, mdiDelete, mdiPencil } from "@mdi/js";
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import "@shoelace-style/shoelace/dist/components/alert/alert.js";

import "@darksoil-studio/holochain-elements/dist/elements/display-error.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import SlAlert from "@shoelace-style/shoelace/dist/components/alert/alert.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import { CommentsStore } from "../comments-store.js";
import { commentsStoreContext } from "../context.js";
import { Comment } from "../types.js";

/**
 * @element comment-detail
 * @fires edit-clicked: fired when the user clicks the edit icon button
 * @fires comment-deleted: detail will contain { commentHash }
 */
@localized()
@customElement("comment-detail")
export class CommentDetail extends SignalWatcher(LitElement) {
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

  async deleteComment() {
    try {
      await this.commentsStore.client.deleteComment(this.commentHash);

      this.dispatchEvent(
        new CustomEvent("comment-deleted", {
          bubbles: true,
          composed: true,
          detail: {
            commentHash: this.commentHash,
          },
        }),
      );
    } catch (e: unknown) {
      console.error(e);
      notifyError(msg("Error deleting the comment"));
    }
  }

  renderDetail(entryRecord: EntryRecord<Comment>) {
    return html`
      <sl-card style="flex: 1">
        <div class="column" style="gap: 16px; flex: 1;">
          <div class="row" style="gap: 8px">
            <span style="font-size: 18px; flex: 1;">${msg("Comment")}</span>

            <sl-icon-button .src=${wrapPathInSvg(mdiPencil)} @click=${() =>
      this.dispatchEvent(
        new CustomEvent("edit-clicked", {
          bubbles: true,
          composed: true,
        }),
      )}></sl-icon-button>
            <sl-icon-button .src=${wrapPathInSvg(mdiDelete)} @click=${() => this.deleteComment()}></sl-icon-button>
          </div>

          <div class="column" style="gap: 8px;">
	        <span><strong>${msg("Content")}</strong></span>
 	        <span style="white-space: pre-line">${entryRecord.entry.content}</span>
	  </div>

      </div>
      </sl-card>
    `;
  }

  render() {
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
        return this.renderDetail(comment.value);
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
