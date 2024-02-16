
# posthtml-include-whatever

[![package version](https://img.shields.io/npm/v/posthtml-include-whatever.svg?style=flat-square)](https://npmjs.org/package/posthtml-include-whatever)

> Include anything plugin for PostHTML. Based on [posthtml-include](https://github.com/posthtml/posthtml-include)

## Install

```sh
$ npm install posthtml-include-whatever
$ # OR
$ yarn add posthtml-include-whatever
```

## Usage

```js
const { readFileSync } = require('fs')

const posthtml = require('posthtml')
const whatever = require('posthtml-include-whatever')

const renderers = {
  markdown: (filePath, { encoding }) => {
    // process markdown and return string
  },
  handlebars: (filePath, { locals, encoding }) => {
    // process handlebars and return string
  },
  // etc
}

const html = readFileSync('index.html')

posthtml([ whatever({ renderers, encoding: 'utf8', locals: {} }) ])
    .process(html)
    .then((result) => console.log(result.html))
```

In the HTML:

```html
<html>
<head>
    <title>index.html</title>
</head>
<body>
    <include src="posts/hello.md" type="markdown"></include>
    <include src="posts/footer.handlebars" type="handlebars"></include>
</body>
</html>
```

## Configuration

- `root`: Root folder path for include. Default `./`
- `encoding`: Default `utf-8`
- `renderers`: Object mapping include type names to a render function that accepts a filepath argument, and an options argument containing `encoding` and `locals`

## Contribute

1. Fork it and create your feature branch: `git checkout -b my-new-feature`
2. Commit your changes: `git commit -am "Add some feature"`
3. Push to the branch: `git push origin my-new-feature`
4. Submit a pull request

## License

MIT
