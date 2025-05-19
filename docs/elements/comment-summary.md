# `<comment-summary>`

## Usage

0. If you haven't already, [go through the setup for the module](/setup).

1. Import the `<comment-summary>` element somewhere in the javascript side of your web-app like this:

```js
import '@darksoil-studio/comments/dist/elements/comment-summary.js'
```

2. Use it in the html side of your web-app like this:

::: code-group
```html [Lit]
<comment-summary .commentHash=${ commentHash }>
</comment-summary>
```

```html [React]
<comment-summary commentHash={ commentHash }>
</comment-summary>
```

```html [Angular]
<comment-summary [commentHash]="commentHash">
</comment-summary>
```

```html [Vue]
<comment-summary :commentHash="commentHash">
</comment-summary>
```

```html [Svelte]
<comment-summary comment-hash={encodeHashToBase64(commentHash)}>
</comment-summary>
```
:::

> [!WARNING]
> Like all the elements in this module, `<comment-summary>` needs to be placed inside an initialized `<comments-context>`.

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
  if (!customElements.get('comment-summary')) await import('../../ui/src/elements/comment-summary.ts');

  const profiles = await demoProfiles();

  const profilesMock = new ProfilesZomeMock(
    profiles,
    Array.from(profiles.keys())[0]
  );
  const profilesStore = new ProfilesStore(new ProfilesClient(profilesMock, "comments_test"));

  const mock = new CommentsZomeMock();
  const client = new CommentsClient(mock, "comments_test");

  const comment = await sampleComment(client);

  const record = await mock.create_comment(comment);

  const store = new CommentsStore(client);
  
  render(html`
    <profiles-context .store=${profilesStore}>
      <comments-context .store=${store}>
        <api-demo src="custom-elements.json" only="comment-summary" exclude-knobs="store">
          <template data-element="comment-summary" data-target="host">
            <comment-summary comment-hash="${unsafeStatic(encodeHashToBase64(record.signed_action.hashed.hash))}"></comment-summary>
          </template>
        </api-demo>
      </comments-context>
    </profiles-context>
  `, document.querySelector('element-demo'))
  })


</script>

## API Reference

`<comment-summary>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="comment-summary">
</api-docs>
