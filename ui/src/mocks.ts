import {
	AgentPubKeyMap,
	HashType,
	HoloHashMap,
	ZomeMock,
	decodeEntry,
	fakeCreateAction,
	fakeDeleteEntry,
	fakeEntry,
	fakeRecord,
	fakeUpdateEntry,
	hash,
	pickBy,
} from '@darksoil-studio/holochain-utils';
import {
	ActionHash,
	AgentPubKey,
	AnyDhtHash,
	AppClient,
	Delete,
	EntryHash,
	Link,
	NewEntryAction,
	Record,
	SignedActionHashed,
	decodeHashFromBase64,
	fakeActionHash,
	fakeAgentPubKey,
	fakeDnaHash,
	fakeEntryHash,
} from '@holochain/client';

import { CommentsClient } from './comments-client.js';
import { Comment } from './types.js';

export class CommentsZomeMock extends ZomeMock implements AppClient {
	constructor(myPubKey?: AgentPubKey) {
		super('comments_test', 'comments', 'comments_test_app', myPubKey);
	}
	/** Comment */
	comments = new HoloHashMap<
		ActionHash,
		{
			deletes: Array<SignedActionHashed<Delete>>;
			revisions: Array<Record>;
		}
	>();
	commentsForComment = new HoloHashMap<ActionHash, Link[]>();

	async create_comment(comment: Comment): Promise<Record> {
		const entryHash = hash(comment, HashType.ENTRY);
		const record = await fakeRecord(
			await fakeCreateAction(entryHash),
			fakeEntry(comment),
		);

		this.comments.set(record.signed_action.hashed.hash, {
			deletes: [],
			revisions: [record],
		});

		if (comment.reply_to) {
			const existingReplyTo =
				this.commentsForComment.get(comment.reply_to) || [];
			this.commentsForComment.set(comment.reply_to, [
				...existingReplyTo,
				{
					base: comment.reply_to,
					target: record.signed_action.hashed.hash,
					author: this.myPubKey,
					timestamp: Date.now() * 1000,
					zome_index: 0,
					link_type: 0,
					tag: new Uint8Array(),
					create_link_hash: await fakeActionHash(),
				},
			]);
		}

		return record;
	}

	async get_latest_comment(
		commentHash: ActionHash,
	): Promise<Record | undefined> {
		const comment = this.comments.get(commentHash);
		return comment
			? comment.revisions[comment.revisions.length - 1]
			: undefined;
	}

	async get_all_revisions_for_comment(
		commentHash: ActionHash,
	): Promise<Record[] | undefined> {
		const comment = this.comments.get(commentHash);
		return comment ? comment.revisions : undefined;
	}

	async get_original_comment(
		commentHash: ActionHash,
	): Promise<Record | undefined> {
		const comment = this.comments.get(commentHash);
		return comment ? comment.revisions[0] : undefined;
	}

	async get_all_deletes_for_comment(
		commentHash: ActionHash,
	): Promise<Array<SignedActionHashed<Delete>> | undefined> {
		const comment = this.comments.get(commentHash);
		return comment ? comment.deletes : undefined;
	}

	async get_oldest_delete_for_comment(
		commentHash: ActionHash,
	): Promise<SignedActionHashed<Delete> | undefined> {
		const comment = this.comments.get(commentHash);
		return comment ? comment.deletes[0] : undefined;
	}
	async delete_comment(original_comment_hash: ActionHash): Promise<ActionHash> {
		const record = await fakeRecord(
			await fakeDeleteEntry(original_comment_hash),
		);

		this.comments
			.get(original_comment_hash)
			.deletes.push(record.signed_action as SignedActionHashed<Delete>);

		return record.signed_action.hashed.hash;
	}

	async update_comment(input: {
		original_comment_hash: ActionHash;
		previous_comment_hash: ActionHash;
		updated_comment: Comment;
	}): Promise<Record> {
		const record = await fakeRecord(
			await fakeUpdateEntry(
				input.previous_comment_hash,
				undefined,
				undefined,
				fakeEntry(input.updated_comment),
			),
			fakeEntry(input.updated_comment),
		);

		this.comments.get(input.original_comment_hash).revisions.push(record);

		const comment = input.updated_comment;

		if (comment.reply_to) {
			const existingReplyTo =
				this.commentsForComment.get(comment.reply_to) || [];
			this.commentsForComment.set(comment.reply_to, [
				...existingReplyTo,
				{
					base: comment.reply_to,
					target: record.signed_action.hashed.hash,
					author: record.signed_action.hashed.content.author,
					timestamp: record.signed_action.hashed.content.timestamp,
					zome_index: 0,
					link_type: 0,
					tag: new Uint8Array(),
					create_link_hash: await fakeActionHash(),
				},
			]);
		}

		return record;
	}

	async get_comments_for_comment(
		commentHash: ActionHash,
	): Promise<Array<Link>> {
		return this.commentsForComment.get(commentHash) || [];
	}

	/** Comments for Commented */
	commentedToComment = new HoloHashMap<AnyDhtHash, Link[]>();

	async get_comments_for_commented(
		commented: AnyDhtHash,
	): Promise<Array<Link>> {
		return this.commentedToComment.get(commented) || [];
	}

	async add_comment_for_commented(input: {
		commented: AnyDhtHash;
		comment_hash: ActionHash;
	}): Promise<void> {
		const existing = this.commentedToComment.get(input.commented) || [];
		this.commentedToComment.set(input.commented, [
			...existing,
			{
				base: input.commented,
				target: input.comment_hash,
				author: this.myPubKey,
				timestamp: Date.now() * 1000,
				zome_index: 0,
				link_type: 0,
				tag: new Uint8Array(),
				create_link_hash: await fakeActionHash(),
			},
		]);
	}
}

export async function sampleComment(
	client: CommentsClient,
	partialComment: Partial<Comment> = {},
): Promise<Comment> {
	return {
		...{
			commented_hash: await fakeActionHash(),
			content: 'Lorem ipsum 2',
			reply_to: undefined,
		},
		...partialComment,
	};
}
