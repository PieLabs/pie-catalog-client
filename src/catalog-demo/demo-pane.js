import { applyStyle, boxShadow, prepareTemplate } from '../styles';

const templateHTML = `
<style>
  :host {
    display: block;
  }
  #title {
    text-transform: uppercase;
    font-size: 12px;
    color: grey;
    padding-top: 3px;
    padding-bottom: 8px;
    border-bottom: solid 1px rgba(0,0,0,0.14);
    margin-bottom: 0px;
  }
</style>
<div id="title"></div>
<slot></slot>`;

const template = prepareTemplate(templateHTML, 'demo-pane');

export default class DemoPane extends HTMLElement {
  constructor() {
    super();
    let sr = applyStyle(this, template);
    this._$title = sr.querySelector('#title');
  }

  connectedCallback() {
    this._$title.textContent = this.getAttribute('title');
  }
}