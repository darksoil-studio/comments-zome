import {
	AsyncComputed,
	allRevisionsOfEntrySignal,
	collectionSignal,
	deletedLinksSignal,
	deletesForEntrySignal,
	immutableEntrySignal,
	latestVersionOfEntrySignal,
	liveLinksSignal,
	pipe,
} from '@darksoil-studio/holochain-signals';
import {
	EntryRecord,
	HashType,
	MemoHoloHashMap,
	retype,
	slice,
} from '@darksoil-studio/holochain-utils';
import {
	ActionHash,
	AgentPubKey,
	AnyDhtHash,
	EntryHash,
	NewEntryAction,
	Record,
} from '@holochain/client';

import { CommentsClient } from './comments-client.js';
import { Comment } from './types.js';

export class CommentsStore {
	constructor(public client: CommentsClient) {}

	/** Comment */

	comments = new MemoHoloHashMap((commentHash: ActionHash) => ({
		latestVersion: latestVersionOfEntrySignal(this.client, () =>
			this.client.getLatestComment(commentHash),
		),
		original: immutableEntrySignal(() =>
			this.client.getOriginalComment(commentHash),
		),
		allRevisions: allRevisionsOfEntrySignal(this.client, () =>
			this.client.getAllRevisionsForComment(commentHash),
		),
		deletes: deletesForEntrySignal(this.client, commentHash, () =>
			this.client.getAllDeletesForComment(commentHash),
		),
		comments: {
			live: pipe(
				liveLinksSignal(
					this.client,
					commentHash,
					() => this.client.getCommentsForComment(commentHash),
					'CommentToComments',
				),
				links => links.map(l => l.target),
			),
			deleted: pipe(
				deletedLinksSignal(
					this.client,
					commentHash,
					() => this.client.getDeletedCommentsForComment(commentHash),
					'CommentToComments',
				),
				links => links.map(l => l[0].hashed.content.target_address),
			),
		},
	}));

	/** Comments for Commented */

	commentsForCommented = new MemoHoloHashMap((commented: AnyDhtHash) => ({
		live: pipe(
			liveLinksSignal(
				this.client,
				commented,
				() => this.client.getCommentsForCommented(commented),
				'CommentedToComments',
			),
			links =>
				slice(
					this.comments,
					links.map(l => l.target),
				),
		),
		deleted: pipe(
			deletedLinksSignal(
				this.client,
				commented,
				() => this.client.getDeletedCommentsForCommented(commented),
				'CommentedToComments',
			),
			links =>
				slice(
					this.comments,
					links.map(l => l[0].hashed.content.target_address),
				),
		),
	}));
}
