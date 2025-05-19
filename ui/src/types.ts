import { ActionCommittedSignal } from '@darksoil-studio/holochain-utils';
import { ActionHash } from '@holochain/client';

export type CommentsSignal = ActionCommittedSignal<EntryTypes, LinkTypes>;

export type EntryTypes = { type: 'Comment' } & Comment;

export type LinkTypes = string;

export interface Comment {
	commented_hash: ActionHash;

	content: string;

	reply_to: ActionHash | undefined;
}
