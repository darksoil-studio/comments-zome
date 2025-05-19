import { toPromise } from '@darksoil-studio/holochain-signals';
import { EntryRecord } from '@darksoil-studio/holochain-utils';
import { ActionHash, Record, fakeActionHash } from '@holochain/client';
import { dhtSync, runScenario } from '@holochain/tryorama';
import { decode } from '@msgpack/msgpack';
import { assert, test } from 'vitest';

import { sampleComment } from '../../ui/src/mocks.js';
import { Comment } from '../../ui/src/types.js';
import { setup } from './setup.js';

test('link a Commented to a Comment', async () => {
	await runScenario(async scenario => {
		const [alice, bob] = await setup(scenario);

		const baseAddress = await fakeActionHash();
		const targetRecord: EntryRecord<Comment> =
			await alice.store.client.createComment(
				await sampleComment(alice.store.client, {
					commented_hash: baseAddress,
				}),
			);
		const targetAddress = targetRecord.actionHash;

		// Bob gets the links, should be empty
		let linksOutput = await toPromise(
			bob.store.commentsForCommented.get(baseAddress).live,
		);
		assert.equal(linksOutput.size, 0);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		// Bob gets the links again
		linksOutput = await toPromise(
			bob.store.commentsForCommented.get(baseAddress).live,
		);
		assert.equal(linksOutput.size, 1);
		assert.deepEqual(targetAddress, Array.from(linksOutput.keys())[0]);

		await alice.store.client.deleteComment(targetAddress);

		// Wait for the created entry to be propagated to the other node.
		await dhtSync([alice.player, bob.player], alice.player.cells[0].cell_id[0]);

		// Bob gets the links again
		linksOutput = await toPromise(
			bob.store.commentsForCommented.get(baseAddress).live,
		);
		assert.equal(linksOutput.size, 0);

		// Bob gets the deleted links
		let deletedLinksOutput = await toPromise(
			bob.store.commentsForCommented.get(baseAddress).deleted,
		);
		assert.equal(deletedLinksOutput.size, 1);
	});
});
