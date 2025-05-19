import { 
  AgentPubKey,
  EntryHash,
  NewEntryAction,
  ActionHash,
  Record,
  AppBundleSource,
  fakeActionHash,
  fakeAgentPubKey,
  fakeEntryHash,
  fakeDnaHash,
  AppWebsocket,
  encodeHashToBase64 
} from '@holochain/client';
import { encode } from '@msgpack/msgpack';
import { pause, dhtSync, Player, Scenario } from '@holochain/tryorama';
import { EntryRecord } from '@darksoil-studio/holochain-utils';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { CommentsClient } from '../../ui/src/comments-client.js';
import { CommentsStore } from '../../ui/src/comments-store.js';

const testHappUrl = dirname(fileURLToPath(import.meta.url)) + '/../../workdir/comments_test.happ';

export async function setup(scenario: Scenario, numPlayers = 2) {
  const players = await promiseAllSequential(
    Array.from(new Array(numPlayers)).map(() => () => addPlayer(scenario)),
  );
  
  // Shortcut peer discovery through gossip and register all agents in every
  // conductor of the scenario.
  await scenario.shareAllAgents();
  
  await dhtSync(
    players.map(p => p.player),
    players[0].player.cells[0].cell_id[0],
  );
  
  console.log('Setup completed!');

  return players;
}

async function addPlayer(scenario: Scenario) {
  const player = await scenario.addPlayerWithApp({ type: 'path', value: testHappUrl });

  await player.conductor
  	.adminWs()
  	.authorizeSigningCredentials(player.cells[0].cell_id);
  const store = new CommentsStore(
  	new CommentsClient(player.appWs as any, 'comments_test'),
  );
  return {
  	store,
  	player,
  	startUp: async () => {
  	  await player.conductor.startUp();
  	  const port = await player.conductor.attachAppInterface();
  	  const issued = await player.conductor
  	    .adminWs()
  	    .issueAppAuthenticationToken({
  	      installed_app_id: player.appId,
  	    });
  	  const appWs = await player.conductor.connectAppWs(issued.token, port);
  	  store.client.client = appWs;
  	},
  };
}

async function promiseAllSequential<T>(
  promises: Array<() => Promise<T>>,
): Promise<Array<T>> {
  const results: Array<T> = [];
  for (const promise of promises) {
    results.push(await promise());
  }
  return results;
}

export async function waitUntil(
  condition: () => Promise<boolean>,
  timeout: number,
) {
  const start = Date.now();
  const isDone = await condition();
  if (isDone) return;
  if (timeout <= 0) throw new Error('timeout');
  await pause(1000);
  return waitUntil(condition, timeout - (Date.now() - start));
}
