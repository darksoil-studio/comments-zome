import {
  hashProperty,
  hashState,
  notifyError,
  onSubmit,
  sharedStyles,
  wrapPathInSvg,
} from "@darksoil-studio/holochain-elements";
import { SignalWatcher } from "@darksoil-studio/holochain-signals";
import { EntryRecord } from "@darksoil-studio/holochain-utils";
import { ActionHash, AgentPubKey, DnaHash, EntryHash, Record } from "@holochain/client";
import { consume } from "@lit/context";
import { localized, msg } from "@lit/localize";
import { mdiAlertCircleOutline, mdiDelete } from "@mdi/js";
import { html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import SlAlert from "@shoelace-style/shoelace/dist/components/alert/alert.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import "@darksoil-studio/holochain-elements/dist/elements/display-error.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import { CommentsStore } from "../comments-store.js";
import { commentsStoreContext } from "../context.js";
import { Comment } from "../types.js";

/**
 * @element create-comment
 * @fires comment-created: detail will contain { commentHash }
 */
@localized()
@customElement("create-comment")
export class CreateComment extends SignalWatcher(LitElement) {
  /**
   * OPTIONAl. The reply to for this Comment
   */
  @property(hashProperty("reply-to"))
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
  @query("#create-form")
  form!: HTMLFormElement;

  async createComment(fields: Partial<Comment>) {
    const comment: Comment = {
      content: fields.content!,
      reply_to: this.replyTo!,
    };

    try {
      this.committing = true;
      const record: EntryRecord<Comment> = await this.commentsStore.client.createComment(comment);

      this.dispatchEvent(
        new CustomEvent("comment-created", {
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
      notifyError(msg("Error creating the comment"));
    }
    this.committing = false;
  }

  render() {
    return html`
      <sl-card style="flex: 1;">

        <form 
          id="create-form"
          class="column"
          style="flex: 1; gap: 16px;"
          ${onSubmit(fields => this.createComment(fields))}
        >  
          <span class="title">${msg("Create Comment")}</span>

          <sl-input name="content" .label=${msg("Content")}  required></sl-input>

          <sl-button
            variant="primary"
            type="submit"
            .loading=${this.committing}
          >${msg("Create Comment")}</sl-button>
        </form> 
      </sl-card>`;
  }

  static styles = [sharedStyles];
}
