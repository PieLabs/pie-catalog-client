import { prepareTemplate, applyStyle, boxShadow } from '../styles';

const templateHTML = `
    <style>
    :host{

      border-top: solid 1px rgba(0,0,0,0.14);
      display: none;
      padding-top: 8px;
      padding-bottom: 8px;
      margin-top: 8px;
    }

    #pre {
      border: solid 1px rgba(0,0,0,0.14);

      background-color: white; 
      padding: 8px;
    }
    h5{
      padding: 0;
      margin: 0;
      color:  grey; 
    }

    </style>
    
    <h5>Outcomes</h5>
    <pre id="pre"></pre>

`;

export default class OutcomeInfo extends HTMLElement {
  constructor() {
    super();
    const template = prepareTemplate(templateHTML, 'outcome-info');
    let sr = applyStyle(this, template);
  }

  set outcomes(o) {
    if (Array.isArray(o) && o.length > 0) {
      this.style.display = 'block';
    } else {
      this.style.display = 'none';
    }
    this.$pre.innerHTML = JSON.stringify(o, null, '  ');
  }

  connectedCallback() {
    this.$pre = this.shadowRoot.querySelector('#pre');
  }
}
