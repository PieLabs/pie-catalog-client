import { applyStyle, boxShadow, prepareTemplate } from '../styles';

import { ConfigurationPaneUpdateEvent } from './configuration-panes';
import merge from 'lodash/merge';

const templateHTML = `
    <style>
      :host{
        display: flex;
        width: 100%;
        flex-direction: row;
      }
    </style>
    <!-- <configuration-panes hidden></configuration-panes> -->
    <item-preview></item-preview>
`;

export default class CatalogDemo extends HTMLElement {
  constructor() {
    super();

    const template = prepareTemplate(templateHTML, 'catalog-demo');

    let sr = applyStyle(this, template);

    this._$itemPreview = sr.querySelector('item-preview');

    this._registeredPies = {};
    this._sessions = [];
    this._env = {
      mode: 'gather'
    }

    this.addEventListener('pie.register', (e) => {
      let id = e.target.getAttribute('pie-id');
      this._registeredPies[id] = e.target;
      this._updatePies();
    });
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
    this._controllers = c;
    this._$itemPreview.controllers = c;
    this._updatePies();
  }

  /**
   * Set the pie item markup.
   * eg: 
   * ```html
   *   <div><my-pie pie-id="1"></my-pie></div>
   * ```
   */
  set markup(m) {
    this.innerHTML = m;
    this._$itemPreview.markup = m;
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
    if (this._configureMap !== undefined) {
      this._$panes = document.createElement('configuration-panes');
      this.shadowRoot.insertBefore(this._$panes, this.shadowRoot.firstElementChild);
    }
  }

  /**
   * Set the pie item config: 
   * ```javascript
   * { elements, models: [{id, element, ...}, ...] }
   * ```
   */
  set config(c) {
    this._config = c;
    this._$itemPreview.config = c;

    this._addConfigurationPanes();
  }

  _addConfigurationPanes() {

    if (!this._configureMap) {
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

    this._$panes.innerHTML = panes.join('\n');

    let paneList = this._$panes.querySelectorAll('configuration-pane');
    for (var i = 0; i < paneList.length; i++) {
      let p = paneList[i];
      let m = this._config.models.find(m => m.id === p.getAttribute('element-id'));
      p.model = m;
    }

    this._$panes.addEventListener(ConfigurationPaneUpdateEvent.TYPE, (e) => {
      let { id, element, update } = e.detail;
      let index = this._config.models.findIndex(m => m.id === id);
      update = merge(update, { id, element });
      this._config.models.splice(index, 1, update);
      this._$itemPreview.config = this._config;
    });
  }


  _getSessionById(id) {
    let session = this._sessions.find(v => v.id === id);
    if (!session) {
      session = { id: id };
      this._sessions.push(session);
    }
    return session;
  }

  _updatePies() {
    if (!this._config || !this._controllers) {
      return;
    }

    Object.keys(this._registeredPies).forEach(id => {
      let node = this._registeredPies[id];
      let model = this._config.models.find(v => v.id === id);
      let session = this._getSessionById(id)
      let controller = this._controllers[node.nodeName.toLowerCase()];
      controller.model(model, session, this._env)
        .then(m => {
          node.session = session;
          node.model = m;
        });
    });
  }
}