import { ActionCommittedSignal } from "@darksoil-studio/holochain-utils";
import {
  ActionHash,
  AgentPubKey,
  Create,
  CreateLink,
  Delete,
  DeleteLink,
  DnaHash,
  EntryHash,
  Record,
  SignedActionHashed,
  Update,
} from "@holochain/client";

export type CommentsSignal = ActionCommittedSignal<EntryTypes, LinkTypes>;

export type EntryTypes = { type: "Comment" } & Comment;

export type LinkTypes = string;

export interface Comment {
  content: string;

  reply_to: ActionHash | undefined;
}
