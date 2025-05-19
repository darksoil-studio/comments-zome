import { Comment } from "./types.js";

import { EntryRecord, ZomeClient } from "@darksoil-studio/holochain-utils";
import {
  ActionHash,
  AgentPubKey,
  AppClient,
  CreateLink,
  Delete,
  DeleteLink,
  EntryHash,
  Link,
  Record,
  SignedActionHashed,
} from "@holochain/client";

import { CommentsSignal } from "./types.js";

export class CommentsClient extends ZomeClient<CommentsSignal> {
  constructor(public client: AppClient, public roleName: string, public zomeName = "comments") {
    super(client, roleName, zomeName);
  }
  /** Comment */

  async createComment(comment: Comment): Promise<EntryRecord<Comment>> {
    const record: Record = await this.callZome("create_comment", comment);
    return new EntryRecord(record);
  }

  async getLatestComment(commentHash: ActionHash): Promise<EntryRecord<Comment> | undefined> {
    const record: Record = await this.callZome("get_latest_comment", commentHash);
    return record ? new EntryRecord(record) : undefined;
  }

  async getOriginalComment(commentHash: ActionHash): Promise<EntryRecord<Comment> | undefined> {
    const record: Record = await this.callZome("get_original_comment", commentHash);
    return record ? new EntryRecord(record) : undefined;
  }

  async getAllRevisionsForComment(commentHash: ActionHash): Promise<Array<EntryRecord<Comment>>> {
    const records: Record[] = await this.callZome("get_all_revisions_for_comment", commentHash);
    return records.map(r => new EntryRecord(r));
  }

  async updateComment(
    originalCommentHash: ActionHash,
    previousCommentHash: ActionHash,
    updatedComment: Comment,
  ): Promise<EntryRecord<Comment>> {
    const record: Record = await this.callZome("update_comment", {
      original_comment_hash: originalCommentHash,
      previous_comment_hash: previousCommentHash,
      updated_comment: updatedComment,
    });
    return new EntryRecord(record);
  }

  deleteComment(originalCommentHash: ActionHash): Promise<ActionHash> {
    return this.callZome("delete_comment", originalCommentHash);
  }

  getAllDeletesForComment(originalCommentHash: ActionHash): Promise<Array<SignedActionHashed<Delete>> | undefined> {
    return this.callZome("get_all_deletes_for_comment", originalCommentHash);
  }

  getOldestDeleteForComment(originalCommentHash: ActionHash): Promise<SignedActionHashed<Delete> | undefined> {
    return this.callZome("get_oldest_delete_for_comment", originalCommentHash);
  }

  async getCommentsForComment(commentHash: ActionHash): Promise<Array<Link>> {
    return this.callZome("get_comments_for_comment", commentHash);
  }

  async getDeletedCommentsForComment(
    commentHash: ActionHash,
  ): Promise<Array<[SignedActionHashed<CreateLink>, SignedActionHashed<DeleteLink>[]]>> {
    return this.callZome("get_deleted_comments_for_comment", commentHash);
  }
}
