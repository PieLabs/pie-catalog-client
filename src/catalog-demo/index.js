import { DeleteImageEvent, InsertImageEvent } from '@pie-libs/pie-configure-events';
import { applyStyle, boxShadow, prepareTemplate } from '../styles';

import { ConfigurationPaneUpdateEvent } from './configuration-panes';
import ElementModels from './element-models';
import debug from 'debug';
import merge from 'lodash/merge';
import range from 'lodash/range';

const log = debug('pie-catalog-client:catalog-demo');

const templateHTML = `
    <style>
      :host{
        display: flex;
        width: 100%;
        flex-direction: row;
      }

      ::slotted(*) {
        padding-right: 10px;
      }

      demo-pane{
        flex: 1;
        margin-left: 2px;
        margin-right: 2px;
      }
      
    </style>
    <input type="file" hidden></input>
    <!-- 
    Note: This is added programmatically... 
    <demo-pane title="configuration">
      <slot name="configure"></slot>
    </demo-pane> -->
    <demo-pane title="preview">
      <item-preview><slot name="preview"></slot></item-preview>
    </demo-pane>
`;

export default class CatalogDemo extends HTMLElement {
  constructor() {
    super();

    const template = prepareTemplate(templateHTML, 'catalog-demo');

    let sr = applyStyle(this, template);

    this._$itemPreview = sr.querySelector('item-preview');

    this._registeredPies = {};
    this._env = {
      mode: 'gather'
    }

    this.handleFileSelect = this.handleFileSelect.bind(this);

    this._$fileInput = sr.querySelector('input[type="file"]');
  }

  connectedCallback() {
    this._$fileInput.addEventListener('change', this.handleFileSelect);
  }

  disconnectedCallback() {
    this._$fileInput.removeEventListener('change', this.handleFileSelect);
  }

  handleFileSelect(e) {
    const file = event.target.files[0];
    this._insertImageHandler.fileChosen(file);
    this._$fileInput.value = '';
    var reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      /** simulate a delay in uploading */
      setTimeout(() => {
        this._insertImageHandler.done(null, dataURL);
        this._insertImageHandler = null;
      }, 2000);
    };

    let progress = 0;
    this._insertImageHandler.progress(progress);

    range(1, 100).forEach(n => {
      setTimeout(() => {
        this._insertImageHandler.progress(n);
      }, n * 20);
    });

    log('[handleFileSelect] reader.readAsDataUrl, file:', file);
    reader.readAsDataURL(file);
  }

  /**
   * Set the controllers map.
   * 
   * eg: 
   * ```
   * { 'my-pie': { model, outcome } }
   * ```
   */
  set controllers(c) {
    this._$itemPreview.controllers = c;
  }

  /**
   * Set the pie item markup.
   * eg: 
   * ```html
   *   <catalog-demo>
   *     <div slot="preview">
   *       <my-pie pie-id="1"></my-pie> 
   *     </div>
   *   </catalog-demo>
   * ```
   * 
   * > Note: the markup must remain in the light dom to allow styling to take effect
   */
  set markup(m) {
    this._markup = m;
    this.render();
  }

  render() {
    let existing = this.querySelector('[slot="preview"]');
    if (existing) {
      this.removeChild(existing);
    }

    const div = document.createElement('div');
    div.setAttribute('slot', 'preview');
    div.innerHTML = this._markup;
    this.appendChild(div);
  }

  /**
   * Set a map that defines a mapping between a pie's custom element to its configuration element.
   * 
   * eg: 
   * ```
   * { 'my-pie' : 'my-pie-configuration' }
   * ```
   * 
   * If this is not set the demo will only render the pies and the control panel.
   * If this is set it'll render the configuration elements as well.
   * @param m the configure map.
   */
  set configureMap(m) {
    this._configureMap = m;
    this._addConfigurationPanes();
  }

  /**
   * Set the pie item config: 
   * ```javascript
   * { elements, models: [{id, element, ...}, ...] }
   * ```
   */
  set config(c) {
    this._config = c;
    this._$itemPreview.setConfig(this._config);

    this._addConfigurationPanes();

    if (this._config.elementModels) {
      this._elementModels = new ElementModels(this, this._config.elementModels);
    }
  }


  /**
   * Set the pie item session: 
   * ```javascript
   * [   { id:string, ...}, ...  ]
   * ```
   */
  set session(s) {
    this._session = s;
    this._$itemPreview.setSession(this._session);
  }

  _addConfigurationPanes() {

    if (!this._configureMap || !this._config || !this._config.models) {
      return;
    }

    let panes = this._config.models.map(cfg => {
      let configElement = this._configureMap[cfg.element] || 'json-configuration';

      return `<configuration-pane 
        element-id="${cfg.id}"
        element-name="${cfg.element}">
        <${configElement}></${configElement}>
      </configuration-pane>`
    });

    //create demo pane for config panes and add to the shadow dom...
    let demoPane = document.createElement('demo-pane');
    demoPane.setAttribute('title', 'configuration');
    let slot = document.createElement('slot');
    slot.setAttribute('name', 'configure');
    demoPane.appendChild(slot);
    this.shadowRoot.insertBefore(demoPane, this.shadowRoot.firstChild);

    //add the configure panes to the light dom inside a div pointing to the configure slot...
    let div = document.createElement('div');
    div.setAttribute('slot', 'configure');
    div.innerHTML = panes.join('\n');
    this.appendChild(div);

    customElements.whenDefined('configuration-pane')
      .then(() => {
        let paneList = this.querySelectorAll('configuration-pane');

        for (var i = 0; i < paneList.length; i++) {
          let p = paneList[i];
          let m = this._config.models.find(m => m.id === p.getAttribute('element-id'));
          p.model = m;
        }

      });

    //Add insert.image event handler, that'll just use a data ure

    this.addEventListener(InsertImageEvent.TYPE, e => {
      log('insert.image event received..');
      this._insertImageHandler = e.detail;
      this._$fileInput.click();
    });

    this.addEventListener(DeleteImageEvent.TYPE, e => {
      const { done, src } = e.detail;
      log('delete.image event received..', src);
      log('simulate delete async task');
      setTimeout(() => {
        done(null);
      }, 2000)
    });

    this.addEventListener(ConfigurationPaneUpdateEvent.TYPE, (e) => {
      let { id, element, update, reset } = e.detail;
      let index = this._config.models.findIndex(m => m.id === id);
      update = merge(update, { id, element });
      this._config.models.splice(index, 1, update);
      this._$itemPreview.setConfig(this._config, reset);
    });
  }
}