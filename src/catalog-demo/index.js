import { applyStyle, boxShadow, prepareTemplate } from '../styles';
const templateHTML = `
    <style>
      :host{
        display: flex;
        width: 100%;
        flex-direction: row;
      }
    </style>
    <configuration-panes></configuration-panes>
    <item-preview></item-preview>
`;

export default class CatalogDemo extends HTMLElement {
  constructor() {
    super();

    /** Note: can't use shadow root if the inner element is dependentent 
     * on style definitions that uses markup from inside the element.
     */
    const template = prepareTemplate(templateHTML, 'catalog-demo');

    let sr = applyStyle(this, template);

    this._$itemPreview = sr.querySelector('item-preview');
    this._$panes = sr.querySelector('configuration-panes');

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

  connectedCallback() {

  }

  set markup(m) {
    this.innerHTML = m;
    this._$itemPreview.markup = m;
  }

  set config(c) {
    this._config = c;
    this._$itemPreview.config = c;

    let panes = c.models.map(cfg => {
      return `<configuration-pane 
        element-id="${cfg.id}"
        element-name="${cfg.element}">
        <${cfg.element}-configuration></${cfg.element}-configuration>
      </configuration-pane>`
    });

    this._$panes.innerHTML = panes.join('\n');

    let paneList = this._$panes.querySelectorAll('configuration-pane');
    for (var i = 0; i < paneList.length; i++) {
      let p = paneList[i];
      let m = c.models.find(m => m.id === p.getAttribute('element-id'));
      p.model = m;
    }

    this._$panes.addEventListener('model.updated', (e) => {
      let { id, element, update } = e.detail;
      let index = this._config.models.findIndex(m => m.id === id);
      this._config.models.splice(index, 1, update);
      this._$itemPreview.config = this._config;
    });
  }

  set controllers(c) {
    this._controllers = c;
    this._$itemPreview.controllers = c;
    this._updatePies();
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