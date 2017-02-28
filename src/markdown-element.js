import * as marked from 'marked';
//Note: be selective about what highlighting we import.
import * as highlight from 'highlight.js/lib/highlight';
import * as bash from 'highlight.js/lib/languages/bash';
import * as js from 'highlight.js/lib/languages/javascript';
import * as json from 'highlight.js/lib/languages/json';
import * as css from 'highlight.js/styles/default.css';

import { applyStyle, prepareTemplate } from './styles';

highlight.registerLanguage('bash', bash);
highlight.registerLanguage('javascript', js);
highlight.registerLanguage('json', json);

const templateHTML = `
    <style>
    ${css}
    </style>
    <div></div>
`;

export default class MarkdownElement extends HTMLElement {

  constructor() {
    super();
    const template = prepareTemplate(templateHTML, 'markdown-element');

    let sr = applyStyle(this, template);
  }

  set markdown(m) {
    this._markdown = m;

    var opts = {
      sanitize: false,
      pedantic: false,
      smartypants: false
    };

    marked.setOptions({
      highlight: function (code) {
        return highlight.highlightAuto(code).value;
      }
    });

    let rendered = marked(m, opts);
    this.shadowRoot.querySelector('div').innerHTML = rendered;
  }
}