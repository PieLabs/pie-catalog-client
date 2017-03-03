import { applyStyle, boxShadow, prepareTemplate } from '../styles';

const templateHTML = `
    <style>
      :host{
        display: block;
        flex: 1;
      }

      control-panel{
        display: block;
        padding-bottom: 10px;
      }
      
      .pie-panel{
        border-radius: 10px;
        ${boxShadow}
        padding: 10px;
        margin-top: 20px;
      }

    </style>
    <control-panel></control-panel>
    <div class="pie-panel">
      <slot></slot> 
    </div>
`;


const template = prepareTemplate(templateHTML, 'item-preview');
/**
 * Note: 
 */
export default class ItemPreview extends HTMLElement {
  constructor() {
    super();


    let sr = applyStyle(this, template);
    this._registeredPies = {};
    this._sessions = [];
    this._env = {
      mode: 'gather'
    }

    this.addEventListener('pie.register', (e) => {
      console.log('got a pie.register')
      let id = e.target.getAttribute('pie-id');
      this._registeredPies[id] = e.target;
      this._updatePies();
    });
  }

  connectedCallback() {
    this.$controlPanel = this.shadowRoot.querySelector('control-panel');

    customElements.whenDefined('control-panel')
      .then(() => {
        this.$controlPanel.env = this._env;
      });

    this.$controlPanel.addEventListener('env-changed', e => {
      this._updatePies();
    });
  }

  set markup(m) {
    this.innerHTML = m;
  }

  set config(c) {
    this._config = c;

    customElements.whenDefined('control-panel')
      .then(() => {
        //this.$controlPanel.langs = this._config.langs;
      });

    this._updatePies();
  }

  set controllers(c) {
    console.log('set controllers: ', c);
    this._controllers = c;
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