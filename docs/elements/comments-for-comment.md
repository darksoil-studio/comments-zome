
# `<comments-for-comment>`

## Usage

0. If you haven't already, [go through the setup for the module](/setup).

1. Import the `<comments-for-comment>` element somewhere in the javascript side of your web-app like this:

```js
import '@darksoil-studio/comments/dist/elements/comments-for-comment.js'
```

2. Use it in the html side of your web-app like this:

::: code-group
```html [Lit]
<comments-for-comment .commentHash=${ commentHash }>
</comments-for-comment>
```

```html [React]
<comments-for-comment commentHash={ commentHash }>
</comments-for-comment>
```

```html [Angular]
<comments-for-comment [commentHash]="commentHash">
</comments-for-comment>
```

```html [Vue]
<comments-for-comment :commentHash="commentHash">
</comments-for-comment>
```

```html [Svelte]
<comments-for-comment comment-hash={encodeHashToBase64(commentHash)}>
</comments-for-comment>
```
:::

> [!WARNING]
> Like all the elements in this module, `<comments-for-comment>` needs to be placed inside an initialized `<comments-context>`.

## Demo

Here is an interactive demo of the element:

<element-demo>
</element-demo>

<script setup>
import { onMounted } from "vue";
import { ProfilesClient, ProfilesStore } from '@darksoil-studio/profiles-zome';
import { demoProfiles, ProfilesZomeMock } from '@darksoil-studio/profiles-zome/dist/mocks.js';
import { decodeHashFromBase64, encodeHashToBase64 } from '@holochain/client';
import { render } from "lit";
import { html, unsafeStatic } from "lit/static-html.js";

import { CommentsZomeMock, sampleComment } from "../../ui/src/mocks.ts";
import { CommentsStore } from "../../ui/src/comments-store.ts";
import { CommentsClient } from "../../ui/src/comments-client.ts";

onMounted(async () => {
  // Elements need to be imported on the client side, not the SSR side
  // Reference: https://vitepress.dev/guide/ssr-compat#importing-in-mounted-hook
  await import('@api-viewer/docs/lib/api-docs.js');
  await import('@api-viewer/demo/lib/api-demo.js');
  await import('@darksoil-studio/profiles-zome/dist/elements/profiles-context.js');
  if (!customElements.get('comments-context')) await import('../../ui/src/elements/comments-context.ts');
  if (!customElements.get('comments-for-comment')) await import('../../ui/src/elements/comments-for-comment.ts');

  const profiles = await demoProfiles();
  const myPubKey = Array.from(profiles.keys())[0];

  const profilesMock = new ProfilesZomeMock(profiles, myPubKey);
  const profilesStore = new ProfilesStore(new ProfilesClient(profilesMock, "comments_test"));

  const mock = new CommentsZomeMock();
  const client = new CommentsClient(mock, "comments_test");

  const comment1 = await sampleComment(client);

  const record1 = await mock.create_comment(comment1);

  const comment2 = await sampleComment(client, {
    reply_to: record1.signed_action.hashed.hash
  });

  const record = await mock.create_comment(comment2);

  const store = new CommentsStore(client);
  
  render(html`
    <profiles-context .store=${profilesStore}>
      <comments-context .store=${store}>
        <api-demo src="custom-elements.json" only="comments-for-comment" exclude-knobs="store">
          <template data-element="comments-for-comment" data-target="host">
            <comments-for-comment comment-hash=${unsafeStatic(encodeHashToBase64(comment2.reply_to))}" ></comments-for-comment>
          </template>
        </api-demo>
      </comments-context>
    </profiles-context>
  `, document.querySelector('element-demo'))
  })

</script>

## API Reference

`<comments-for-comment>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="comments-for-comment">
</api-docs>
