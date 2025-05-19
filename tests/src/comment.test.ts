import { assert, test } from "vitest";

import { toPromise } from "@darksoil-studio/holochain-signals";
import { EntryRecord } from "@darksoil-studio/holochain-utils";
import { cleanNodeDecoding } from "@darksoil-studio/holochain-utils/dist/clean-node-decoding.js";
import { ActionHash, Delete, Record, SignedActionHashed } from "@holochain/client";
import { dhtSync, runScenario } from "@holochain/tryorama";
import { decode } from "@msgpack/msgpack";

import { sampleComment } from "../../ui/src/mocks.js";
import { Comment } from "../../ui/src/types.js";
import { setup } from "./setup.js";

test("create Comment", async () => {
  await runScenario(async scenario => {
    const [alice, bob] = await setup(scenario);

    // Alice creates a Comment
    const comment: EntryRecord<Comment> = await alice.store.client.createComment(
      await sampleComment(alice.store.client),
    );
    assert.ok(comment);
  });
});

test("create and read Comment", async () => {
  await runScenario(async scenario => {
    const [alice, bob] = await setup(scenario);

    const sample = await sampleComment(alice.store.client);

    // Alice creates a Comment
    const comment: EntryRecord<Comment> = await alice.store.client.createComment(sample);
    assert.ok(comment);

    // Wait for the created entry to be propagated to the other node.
    await dhtSync(
      [alice.player, bob.player],
      alice.player.cells[0].cell_id[0],
    );

    // Bob gets the created Comment
    const createReadOutput: EntryRecord<Comment> = await toPromise(bob.store.comments.get(comment.actionHash).original);
    assert.deepEqual(sample, cleanNodeDecoding(createReadOutput.entry));
  });
});

test("create and update Comment", async () => {
  await runScenario(async scenario => {
    const [alice, bob] = await setup(scenario);

    // Alice creates a Comment
    const comment: EntryRecord<Comment> = await alice.store.client.createComment(
      await sampleComment(alice.store.client),
    );
    assert.ok(comment);

    const originalActionHash = comment.actionHash;

    // Alice updates the Comment
    let contentUpdate = await sampleComment(alice.store.client);

    let updatedComment: EntryRecord<Comment> = await alice.store.client.updateComment(
      originalActionHash,
      originalActionHash,
      contentUpdate,
    );
    assert.ok(updatedComment);

    // Wait for the created entry to be propagated to the other node.
    await dhtSync(
      [alice.player, bob.player],
      alice.player.cells[0].cell_id[0],
    );

    // Bob gets the updated Comment
    const readUpdatedOutput0: EntryRecord<Comment> = await toPromise(
      bob.store.comments.get(comment.actionHash).latestVersion,
    );
    assert.deepEqual(contentUpdate, cleanNodeDecoding(readUpdatedOutput0.entry));

    // Alice updates the Comment again
    contentUpdate = await sampleComment(alice.store.client);

    updatedComment = await alice.store.client.updateComment(
      originalActionHash,
      updatedComment.actionHash,
      contentUpdate,
    );
    assert.ok(updatedComment);

    // Wait for the created entry to be propagated to the other node.
    await dhtSync(
      [alice.player, bob.player],
      alice.player.cells[0].cell_id[0],
    );

    // Bob gets the updated Comment
    const readUpdatedOutput1: EntryRecord<Comment> = await toPromise(
      bob.store.comments.get(originalActionHash).latestVersion,
    );
    assert.deepEqual(contentUpdate, cleanNodeDecoding(readUpdatedOutput1.entry));
  });
});

test("create and delete Comment", async () => {
  await runScenario(async scenario => {
    const [alice, bob] = await setup(scenario);

    // Alice creates a Comment
    const comment: EntryRecord<Comment> = await alice.store.client.createComment(
      await sampleComment(alice.store.client),
    );
    assert.ok(comment);

    // Alice deletes the Comment
    const deleteActionHash = await alice.store.client.deleteComment(comment.actionHash);
    assert.ok(deleteActionHash);

    // Wait for the created entry to be propagated to the other node.
    await dhtSync(
      [alice.player, bob.player],
      alice.player.cells[0].cell_id[0],
    );

    // Bob tries to get the deleted Comment
    const deletes: Array<SignedActionHashed<Delete>> = await toPromise(
      bob.store.comments.get(comment.actionHash).deletes,
    );
    assert.equal(deletes.length, 1);
  });
});
