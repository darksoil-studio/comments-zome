# `<create-comment>`

## Usage

0. If you haven't already, [go through the setup for the module](/setup).

1. Import the `<create-comment>` element somewhere in the javascript side of your web-app like this:

```js
import '@darksoil-studio/comments/dist/elements/create-comment.js'
```

2. Use it in the html side of your web-app like this:


::: code-group
```html [Lit]
<create-comment 
  .replyTo=${ replyTo }
>
</create-comment>
```

```html [React]
<create-comment
  replyTo={ replyTo }
>
</create-comment>
```

```html [Angular]
<create-comment
  [replyTo]="replyTo"
>
</create-comment>
```

```html [Vue]
<create-comment
  :replyTo="replyTo"
>
</create-comment>
```

```html [Svelte]
<create-comment
  reply-to={encodeHashToBase64(replyTo)}
>
</create-comment>
```
:::

> [!WARNING]
> Like all the elements in this module, `<create-comment>` needs to be placed inside an initialized `<comments-context>`.

## Demo

Here is an interactive demo of the element:

<element-demo>
</element-demo>

<script setup>
import { onMounted } from "vue";
import { ProfilesClient, ProfilesStore } from '@darksoil-studio/profiles-zome';
import { demoProfiles, ProfilesZomeMock } from '@darksoil-studio/profiles-zome/dist/mocks.js';
import { decodeHashFromBase64 } from '@holochain/client';
import { render, html } from "lit";

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
  if (!customElements.get('create-comment')) await import('../../ui/src/elements/create-comment.ts');

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
        <api-demo src="custom-elements.json" only="create-comment" exclude-knobs="store">
        </api-demo>
      </comments-context>
    </profiles-context>
  `, document.querySelector('element-demo'))
  })


</script>

## API Reference

`<create-comment>` is a [custom element](https://web.dev/articles/custom-elements-v1), which means that it can be used in any web app or website. Here is the reference for its API:

<api-docs src="custom-elements.json" only="create-comment">
</api-docs>
