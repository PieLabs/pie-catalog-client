import * as events from './events';

import { applyStyle, boxShadow, prepareTemplate } from './styles';

const templateHTML = `
    <style>
     :host{
       background-color: red;
        width: 300px;
        height: 120px;
        max-height: 120px;
        display: block;
        cursor: pointer;
        padding: 10px;
        background-color: white;
        box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.2);
        --moz-box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.2);
        transition: box-shadow 200ms ease-in;
      }

      :host(:hover){
        cursor: pointer;
        box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.4);
      } 


      h4 {
        padding: 0;
        margin: 0;
      }

      hr {
        margin: 0;
        padding: 0;
        padding-top: 4px;
        padding-bottom: 4px;
        border: none;
        border-bottom: solid 1px var(--shadow-color, hsla(0, 0%, 0%, 0.1));
      }

      #description {
        display: block;
        font-size: 14px;
        height: 20px;
      }

      .footer{
        display: flex;
        align-items: center;
        padding: 2px;
      }
      
      #org{
        padding: 6px;
        font-size: 16px;
      }

      #name{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
      }

      #tag{
        font-size: 12px;
        margin-top: 4px;
        margin-bottom: 4px;
      }

    </style>

    <h4 id="name"></h4>
    <div id="tag"></div>
    <span id="description"></span>
    <hr/>
    <div class="footer">
      <github-avatar size="40"></github-avatar>
      <label id="org"></label>
    </div>
`;

const template = prepareTemplate(templateHTML, 'catalog-listing');

export default class CatalogListing extends HTMLElement {

  constructor() {
    super();

    let sr = applyStyle(this, template);

    this._$org = sr.querySelector('#org');
    this._$name = sr.querySelector('#name');
    this._$tag = sr.querySelector('#tag');
    this._$description = sr.querySelector('#description');
    this._$avatar = sr.querySelector('github-avatar');
  }

  set element(e) {
    this._element = e;
    let qs = this.shadowRoot.querySelector;
    this._$org.textContent = e.org;
    this._$name.textContent = e.name;
    this._$tag.textContent = e.tag;
    this._$description.textContent = e.description;
    this._$avatar.setAttribute('user', e.org);
  }

  get element() {
    return this._element;
  }

  connectedCallback() {

    const onElementClick = (e) => {
      e.preventDefault();
      this.dispatchEvent(events.elementClick(this._element));
    };

    this._$name.addEventListener('click', onElementClick);
    this._$description.addEventListener('click', onElementClick);
  }

}
