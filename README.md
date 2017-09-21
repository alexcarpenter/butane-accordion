# butane-accordion

[![butane-accordion on NPM](https://img.shields.io/npm/v/butane-accordion.svg?style=flat-square)](https://www.npmjs.com/package/butane-accordion) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

> A lightweight accessible accordion JS library.

## Install

Install butane-accordion, and add it to your `package.json` dev dependencies.

```
$ npm install butane-accordion --save-dev
```

Then `import` it into the file where you'll use it.

```es6
import ButaneAccordion from 'butane-accordion'
```

## Instantiate

```es6
ButaneAccordion.init()
```

## Options

By default only one accordion panel can be opened at a time. To allow for multiple panels to be open, add `data-butane-accordion-multiple` along side `data-butane-accordion` to allow for that type of functionality.

```html
<dl role="presentation" data-butane-accordion data-butane-accordion-multiple>
  ...
</dl>
```

## Expected DOM structure

Below is the minimum required elements and attributes needed.

```html
<dl role="presentation" data-butane-accordion>
  <dt role="heading" aria-level="2">
    <button aria-expanded="false" aria-controls="sect1" id="button1">Section 1</button>
  </dt>
  <dd id="sect1" aria-labeledby="button1" hidden>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio sunt unde dignissimos fuga voluptatum molestias qui aut, temporibus beatae officia! Voluptate aspernatur dignissimos maxime qui temporibus minus beatae magni autem.</p>
  </dd>
</dl>
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Alex Carpenter
