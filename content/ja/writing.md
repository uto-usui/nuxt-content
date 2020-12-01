---
title: Writing content
subtitle: 'ドキュメンテーションの書き方 🐈'
menuTitle: Writing
description: 'Learn how to write your content/, supporting Markdown, YAML, CSV and JSON.'
position: 3
category: Getting started
multiselectOptions:
- VuePress
- Gridsome
- Nuxt
---

First of all, create a `content/` directory in your project:

## Markdown

[basic syntax guide](https://www.markdownguide.org/basic-syntax) をチェックして Markdown の書き方を学びます。 

### Headings

自動的にidとlinkを各見出しに追加します。

```md[home.md]
# Lorem ipsum
## dolor—sit—amet
### consectetur &amp; adipisicing
#### elit
##### elit
```

### Links

リンクは、[remark-external-links](https://github.com/remarkjs/remark-external-links) を使って、有効な target 属性と rel 属性を追加するように変換されます。

また、相対リンクは自動的に nuxt-link に変換されます。

### Footnotes

このモジュールは、[remark-footnotes](https://github.com/remarkjs/remark-footnotes) を使った脚注のための拡張 Markdown 構文をサポートしています。

```md
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.
```

> さらに詳しく知りたいなら、 [extended syntax guide](https://www.markdownguide.org/extended-syntax/#footnotes) を参照

### Codeblocks

このモジュールはコードブロックを自動的にラップし、[PrismJS](https://prismjs.com) を適用します。

コードブロックを```でラップします。オプションで、特定のシンタックスハイライトを有効にし、言語を指定できます。

中括弧内のハイライトしたい行番号を書き、角括弧内にファイル名を書きます。

**Example**

<pre class="language-js">
```js{1,3-5}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```
</pre>

**Result**

```js{1,3-5}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body)
  })
}).listen(3000)
```

> 行番号はpreタグのdata-line属性に追加されます。

### Syntax highlighting

[PrismJS](https://prismjs.com) をコードハイライトをサポートし、オプションで定義されたテーマを適用します。



### HTML

Markdown に HTML を書くことができます

コンポーネントの中にMarkdownを配置する場合、その前に空の行を続けて配置しなければならないことに注意してください。そうでない場合は、ブロック全体がカスタムHTMLとして扱われます。

**Bad**

```html
<div class="note">
  *Markdown* and <em>HTML</em>.
</div>
```

**Good**

```html
<div class="note">

  *Markdown* and <em>HTML</em>.

</div>
```

### Vue components

グローバル Vue コンポーネントを使用することも、Markdown を表示しているページに登録されたコンポーネントを使用することもできます。

1. コンポーネントはケバブケースで参照する

```html
Use <my-component> instead of <MyComponent>
```

2. セルフクローズタグは使えません。次の記述は **動作しない**

```html
<my-component/>
```

次の記述は **動作します**

```html
<my-component></my-component>
```

```md[home.md]
Please choose a *framework*:

<example-multiselect :options="['Vue', 'React', 'Angular', 'Svelte']"></example-multiselect>
```

また、front-matter section でコンポーネントのオプションを定義することもできます。

```md[home.md]
---
multiselectOptions:
  - VuePress
  - Gridsome
  - Nuxt
---

<example-multiselect :options="multiselectOptions"></example-multiselect>
```

#### Templates

Vue コンポーネント内のコンテンツ配信には `template` タグを使用することができます。

```html
<my-component>
  <template #named-slot>
    <p>Named slot content.</p>
  </template>
</my-component>
```

ただし、[Scoped-Slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) は利用できません。

**not work**

```html
<my-component>
  <template #named-slot="slotProps">
    <p>{{ slotProps.someProperty }}</p>
  </template>
</my-component>
```
