import { applyStyle, boxShadow, prepareTemplate } from '../styles';

import cloneDeep from 'lodash/cloneDeep';

const templateHTML = `
    <style>
      :host{
        display: block;
        flex: 1;
        margin-right: 10px;
      }

    </style>
    <slot></slot>
`;

const template = prepareTemplate(templateHTML, 'configuration-panes');

export default class ConfigurationPanes extends HTMLElement {
  constructor() {
    super();
    let sr = applyStyle(this, template);
  }
}

const paneTemplateHTML = `
 <style>
 .holder{
   border: solid 1px rgba(0, 200, 100, 0.3);
   padding: 5px 
 }
 .header{
   background-color: rgba(0, 200, 100, 0.2);
   padding: 5px;
   text-transform: uppercase;
   font-size: 13px;
   color: rgba(0, 100, 100, 0.8);
 }

 </style>
 <div>
   <div class="header">header</div>
   <div class="holder">  
     <slot></slot>
   </div>
 </div>
`;
const paneTemplate = prepareTemplate(paneTemplateHTML, 'configuration-pane');

export class ConfigurationPane extends HTMLElement {

  static get observedAttributes() {
    return ['element-id', 'element-name'];
  }

  constructor() {
    super();
    let sr = applyStyle(this, paneTemplate);
  }

  connectedCallback() {
    const id = this.getAttribute('element-id');
    const name = this.getAttribute('element-name');
    this.shadowRoot.querySelector('.header').textContent = `${id}: ${name}`;

    this.addEventListener('model.updated', e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      let update = e.detail.update;
      this.dispatchEvent(new ConfigurationPaneUpdateEvent(id, name, update));
    })
  }

  set model(m) {
    this._model = cloneDeep(m);
    delete this._model.id;
    delete this._model.element;
    this.children[0].model = this._model;
  }
}

export class ConfigurationPaneUpdateEvent extends CustomEvent {
  constructor(id, element, update) {
    super(ConfigurationPaneUpdateEvent.TYPE, {
      bubbles: true,
      detail: {
        id, element, update
      }
    });
  }
}

ConfigurationPaneUpdateEvent.TYPE = 'configuration-pane.model.updated';


const jsonConfigTemplateHTML = `
    <style>
      textarea{
        width: 98%;
        padding-right: 4px;
      }
    </style>
    <textarea></textarea>`;

const jsonConfigTemplate = prepareTemplate(jsonConfigTemplateHTML, 'json-configuration');

export class JsonConfiguration extends HTMLElement {
  constructor() {
    super();
    let sr = applyStyle(this, jsonConfigTemplate);

    this._$area = sr.querySelector('textarea');
    console.log('this area', this._$area)
    this._$area.addEventListener('input', (e) => {
      try {
        let update = JSON.parse(e.target.value);
        this._model = update;
        this.dispatchEvent(new CustomEvent('model.updated', {
          bubbles: true,
          composed: true,
          detail: { update }
        }));
      } catch (e) {
        //...
      }
    });
  }

  set model(m) {
    this._model = m;
    this._$area.value = JSON.stringify(m, null, '  ');
  }
}


