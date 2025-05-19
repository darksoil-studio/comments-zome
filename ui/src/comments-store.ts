import { Comment } from "./types.js";

import {
  allRevisionsOfEntrySignal,
  AsyncComputed,
  collectionSignal,
  deletedLinksSignal,
  deletesForEntrySignal,
  immutableEntrySignal,
  latestVersionOfEntrySignal,
  liveLinksSignal,
  pipe,
} from "@darksoil-studio/holochain-signals";
import { EntryRecord, HashType, MemoHoloHashMap, retype, slice } from "@darksoil-studio/holochain-utils";
import { ActionHash, AgentPubKey, EntryHash, NewEntryAction, Record } from "@holochain/client";

import { CommentsClient } from "./comments-client.js";

export class CommentsStore {
  constructor(public client: CommentsClient) {}

  /** Comment */

  comments = new MemoHoloHashMap((commentHash: ActionHash) => ({
    latestVersion: latestVersionOfEntrySignal(this.client, () => this.client.getLatestComment(commentHash)),
    original: immutableEntrySignal(() => this.client.getOriginalComment(commentHash)),
    allRevisions: allRevisionsOfEntrySignal(this.client, () => this.client.getAllRevisionsForComment(commentHash)),
    deletes: deletesForEntrySignal(this.client, commentHash, () => this.client.getAllDeletesForComment(commentHash)),
    comments: {
      live: pipe(
        liveLinksSignal(
          this.client,
          commentHash,
          () => this.client.getCommentsForComment(commentHash),
          "CommentToComments",
        ),
        links => links.map(l => l.target),
      ),
      deleted: pipe(
        deletedLinksSignal(
          this.client,
          commentHash,
          () => this.client.getDeletedCommentsForComment(commentHash),
          "CommentToComments",
        ),
        links => links.map(l => l[0].hashed.content.target_address),
      ),
    },
  }));
}
