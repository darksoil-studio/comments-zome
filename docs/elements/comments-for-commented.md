# `<comments-for-commented>`

## Usage

0. If you haven't already, [go through the setup for the module](/setup).

1. Import the `<comments-for-commented>` element somewhere in the javascript side of your web-app like this:

```js
import '@darksoil-studio/comments/dist/elements/comments-for-commented.js'
```

2. Use it in the html side of your web-app like this:

::: code-group
```html [Lit]
<comments-for-commented .commented=${ commented }>
</comments-for-commented>
```

```html [React]
<comments-for-commented commented={ commented }>
</comments-for-commented>
```

```html [Angular]
<comments-for-commented [commented]="commented">
</comments-for-commented>
```

```html [Vue]
<comments-for-commented :commented="commented">
</comments-for-commented>
```

```html [Svelte]
<comments-for-commented commented={encodeHashToBase64(commented)}>
</comments-for-commented>
```
:::

> [!WARNING]
> Like all the elements in this module, `<comments-for-commented>` needs to be placed inside an initialized `<comments-context>`.

## Demo

Here is an interactive demo of the element:

<element-demo>
</element-demo>

<script setup>
import { onMounted } from "vue";
import { ProfilesClient, ProfilesStore } from '@darksoil-studio/profiles-zome';
import { demoProfiles, ProfilesZomeMock } from '@darksoil-studio/profiles-zome/dist/mocks.js';
import { decodeHashFromBase64, encodeHashToBase64, fakeActionHash, fakeAgentPubKey } from '@holochain/client';
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
  if (!customElements.get('comments-for-commented')) await import('../../ui/src/elements/comments-for-commented.ts');

  const profiles = await demoProfiles();
  const myPubKey = Array.from(profiles.keys())[0];

  const profilesMock = new ProfilesZomeMock(profiles, myPubKey);
  const profilesStore = new ProfilesStore(new ProfilesClient(profilesMock, "comments_test"));

  const mock = new CommentsZomeMock();
  const client = new CommentsClient(mock, "comments_test");


  const comment = await sampleComment(client);

  const record = await mock.create_comment(comment);

  await mock.add_comment_for_commented({
    comment_hash: record.signed_action.hashed.hash,
    commented: fromHash
  });

  const store = new CommentsStore(client);

  render(html`
    <profiles-context .store=${profilesStore}>
      <comments-context .store=${store}>
        <api-demo src="custom-elements.json" only="comments-for-commented" exclude-knobs="store">
          <template data-element="comments-for-commented" data-target="host">
            <comments-for-commented commented="${unsafeStatic(encodeHashToBase64(fromHash))}"></comments-for-commented>
          </template>
        </api-demo>
      </comments-context>
    </profiles-context>
  `, document.querySelector('element-demo'))
  })


</script>

## API Reference

`<comments-for-commented>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="comments-for-commented">
</api-docs>
