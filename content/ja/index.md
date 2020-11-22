---
title: nuxt/content Docs Theme
subtitle: 'nuxt/content のドキュメントテーマのさわりかた 🐈'
menuTitle: Docs
description: 'Create your documentation with @nuxt/content docs theme in seconds!'
category: 📚📚📚
position: 1
version: 1.2
badge: 'welcome'
---

## Install

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add nuxt @nuxt/content-theme-docs @nuxtjs/google-gtag
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install nuxt @nuxt/content-theme-docs @nuxtjs/google-gtag
  ```

  </code-block>
</code-group>


## Settings

### `nuxt.config.js`

`'@nuxt/content-theme-docs` を継承しつつ、`nuxt.config.js` に必要な設定を記述します。`nuxt-i18n` で日本語の設定をしたり、`google-gtag` を刺したり、workbox の設定をしたりします。

```js[nuxt.config.js]
import theme from '@nuxt/content-theme-docs'

const config = theme({
  docs: {
    primaryColor: '#FF6473',
  },

  loading: { color: '#00CD81' },

  i18n: {
    locales: () => [{
      code: 'ja',
      iso: 'ja_JP',
      file: 'ja_JP.js',
      name: '日本語'
    }, {
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }],
    defaultLocale: 'ja'
  },

  buildModules: ['@nuxtjs/google-gtag'],

  'google-gtag': {
    id: 'xxx',
    config: {
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
    },
    debug: false, // use dev mode
  },

  workbox: {
    // ios safari video support
    cachingExtensions: '~~/plugins/workbox-range-request.js',
    runtimeCaching: [
      // google fonts
      {
        urlPattern: '^https://fonts.(?:googleapis|gstatic).com/(.*)',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        // cdn
        urlPattern: 'https://cdn.jsdelivr.net/.*',
        handler: 'cacheFirst',
      },
    ],
  },
})

export default config
```

### `tailwind.config.js`

`tailwind.config.js` から [default theme config](https://github.com/nuxt/content/blob/dev/packages/theme-docs/src/tailwind.config.js) で設定されたデフォルトスタイルを上書きします。

Primary Color は nuxt.config.js の `docs.primaryColor` からかんたんに設定できる。

**Example**

```js[tailwind.config.js]
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // ...
        }
      }
    }
  }
}
```

### `content/`

markdown は `content/` に格納しますが、`nuxt-i18n` の設定の関係から、デフォルトで `content/en` がルートディレクトリに相当します。これは先の設定で `ja` に変更するようにしました。

### `static/`

画像など static assets は `static/` に格納します。

<alert type="info">

[nuxt-pwa](https://pwa.nuxtjs.org/) に与える用の `static/icon.png` を用意しましょう。

*小さくても 512x512px*

</alert>

<alert type="info">

ソーシャルシェアのための画像として `static/preview.png` を用意しましょう。

*1280×640px が推奨*

</alert>

**Example**

```bash
content/
  en/
    index.md
  ja/
    index.md
static/
  icon.png
nuxt.config.js
package.json
```

## Content

以上の設定が済めば、ドキュメンテーションを `content/` に書いていきます。

> [writing markdown content](/writing#markdown) の仕様について

### Locales

`nuxt-i18n` の設定で日/英を有効にするには `nuxt.config.js` を次のように設定します。

```js[nuxt.config.js]
import theme from '@nuxt/content-theme-docs'

export default theme({
  i18n: {
    locales: () => [{
      code: 'ja',
      iso: 'ja_JP',
      file: 'ja_JP.js',
      name: '日本語'
    }, {
      code: 'en',
      iso: 'en-US',
      file: 'en-US.js',
      name: 'English'
    }],
    defaultLocale: 'ja'
  },
})
```

### Routing

`content/{xxx}/` ディレクトリ内の各マークダウンページがページになり、左側のナビゲーションに一覧表示されます。

**Example**

```
content/
  ja/
    examples/
      basic-usage.md
    setup.md
```

**Result**

```
/examples/basic-usage
/setup
```

### Front-matter

マークダウンファイルのフロントマターセクションに必要な項目を書きます。

#### 必須

- `title` (`String`)
  - meta に挿入されるページタイトル
- `description` (`String`)
  - meta に挿入される description
- `position` (`Number`)
  - ナビゲーションにおいてドキュメントの順をソートするための数値

#### オプション

- `category` (`String`)
  - ナビゲーションにおいてページをグループ化するためのカテゴリ名
- `version` (`Float`)
  - 各ユーザーにとって version が新しいものであることをバッジを付与して知らせる。バージョンは更新(インクリメント)されるまでローカルストレージに保存される
- `fullscreen` (`Boolean`)
  - ページを拡大して TOC を隠す
- `menuTitle` (`String`)
  - ページタイトルを上書きする、メニュー用のタイトル名
- `subtitle` (`String`) 
  - ページタイトルのしたに表示されるサブタイトル
- `badge` (`String`)
  - ページタイトルにバッジを付与する

### Example

```bash[content/ja/index.md]
---
title: nuxt/content Docs Theme
subtitle: 'nuxt/content のドキュメントテーマのさわりかた 🐈'
menuTitle: Docs
description: 'Create your documentation with @nuxt/content docs theme in seconds!'
category: 📚📚📚
position: 1
version: 1.2
badge: 'welcome'
---
```

## Settings

`content/settings.json` でテーマの設定をします。

### Properties

- `title` (`String`)
  - ドキュメンテーションのタイトル
- `url` (`String`)
  - ドキュメンテーションの公開 URL
- `logo` (`String` | `Object`)
  - プロジェクトロゴのパスを書く。オブジェクトを渡すとダークモードに対応できる
- `github` (`String`)
  - GitHub レポジトリの `owner/name` をかくと、レポジトリへのリンクが生成される
- `twitter` (`String`)
  - `@` を含めた Twitter の username を記述すると、プロフィール絵のリンクが生成される
- `defaultBranch` (`String`)
  - プロジェクトの GitHub リポジトリのデフォルトブランチを指定します。
- `defaultDir` (`String`)
  - 各ページの `Edit this page on GitHub link` で使用する プロジェクトのデフォルトのディレクトリを指定します (デフォルトは `docs`)。
- `layout` (`String`)
  - `single` を指定するとサイドメニューが削れたレイアウトに変更できる
- `algolia` (`Object`) <badge>v0.7.0+</badge>
  - This option allows you to use [Algolia DocSearch](https://docsearch.algolia.com) to replace the simple built-in search. In order to enable it, you need to provide at least the `apiKey` and the `indexName`:
    ```json
    "algolia": {
        "apiKey": "<API_KEY>",
        "indexName": "<INDEX_NAME>",
        "langAttribute": "language"
    }
    ```
  - If you use `i18n`, make sure the `<langAttribute>` is the same as the html lang selector in the config (defaults to `language`).
  - Take a look at the [@nuxt/content](https://github.com/algolia/docsearch-configs/blob/master/configs/nuxtjs_content.json) docsearch config for an example.

### Example

```json[content/settings.json]
{
  "title": "Nuxt Content",
  "url": "https://content.nuxtjs.org",
  "logo": {
    "light": "/logo-light.svg",
    "dark": "/logo-dark.svg"
  },
  "github": "nuxt/content",
  "twitter": "@nuxt_js"
}
```

## Images

You can apply `dark-img` and `light-img` classes to your images when you have two versions to automatically swap dependending on the color mode.

**Example**

```md
<img src="/logo-light.svg" class="light-img" alt="Logo light" />
<img src="/logo-dark.svg" class="dark-img" alt="Logo dark" />
```

**Result**

<img src="/logo-light.svg" class="light-img" alt="Logo light" />
<img src="/logo-dark.svg" class="dark-img" alt="Logo dark" />

<p class="flex items-center">Try switching between light and dark mode:&nbsp;<app-color-switcher class="inline-flex ml-2"></app-color-switcher></p>

## Components

The theme comes with some default Vue.js components you can use directly in your markdown content.

> You can create your own components in the `components/global/` folder, check out [this section](/writing#vue-components). <badge>v0.3.0+</badge>

### `<alert>`

**Props**

- `type`
  - Type: `String`
  - Default: `'info'`
  - Values: `['info', 'success', 'warning', 'danger']`

**Example**

```md
<alert>

Check out an info alert with a `codeblock` and a [link](/themes/docs)!

</alert>
```

**Result**

<alert>

Check out an info alert with a `codeblock` and a [link](/themes/docs)!

</alert>

### `<list>`

**Props**

- `items`
  - Type: `Array`
  - Default: `[]`
- `type` <badge>v0.7.0+</badge>
  - Type: `String`
  - Default: `'primary'`
  - Values: `['primary', 'info', 'success', 'warning', 'danger']`
- `icon` <badge>v0.7.0+</badge>
  - Type: `String`
  - *Can be used to override the default `type` icon, check out the [icons available](https://github.com/nuxt/content/tree/dev/packages/theme-docs/src/components/global/icons)*

**Example**

```md
---
items:
- Item1
- Item2
- Item3
---

<list :items="items"></list>
```

**Result**

<list :items="['Item1', 'Item2', 'Item3']"></list>


### `<badge>`

<badge>v0.5.0+</badge>

**Example**

```md
<badge>v1.2+</badge>
```

**Result**

<badge>v1.2+</badge>

### `<code-group>`

This component uses `slots`, refer to `code-block` below.

### `<code-block>`

**Props**

- `label`
  - Type: `String`
  - `required`
- `active`
  - Type: `Boolean`
  - Default: `false`

**Example**

```html
# Backslashes are for demonstration

<code-group>
  <code-block label="Yarn" active>

    ```bash
    yarn add @nuxt/content-theme-docs
    \```

  </code-block>
  <code-block label="NPM">

    ```bash
    npm install @nuxt/content-theme-docs
    \```

  </code-block>
</code-group>
```

**Result**

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add @nuxt/content-theme-docs
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install @nuxt/content-theme-docs
  ```

  </code-block>
</code-group>

### `<code-sandbox>`

**Props**

- `src`
  - Type: `String`
  - `required`

**Example**

```md
---
link: https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark
---

<code-sandbox :src="link"></code-sandbox>
```

**Result**

<code-sandbox src="https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark"></code-sandbox>
