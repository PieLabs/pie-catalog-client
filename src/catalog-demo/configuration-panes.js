import { applyStyle, boxShadow, prepareTemplate } from '../styles';

const templateHTML = `
    <style>
      :host{
        display: block;
        flex: 1;
        margin-right: 10px;
      }

    </style>
    <div>PANES</div>
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
  }

  set model(m) {
    this.children[0].model = m;
  }
}



