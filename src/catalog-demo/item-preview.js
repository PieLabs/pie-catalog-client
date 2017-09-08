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


  /**
   * @param {*} c  the config
   * @param {*} resetSession  reset the session also 
   */
  setConfig(c, resetSession) {

    this._config = c;

    customElements.whenDefined('control-panel')
      .then(() => {
        this.$controlPanel.langs = this._config.langs;
      });

    return this._updatePies(resetSession);
  }

  set controllers(c) {
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

  _registerPiesIfNeeded() {
    //TODO: could be a bit more thorough here..
    if (this._config.models.length === Object.keys(this._registeredPies).length) {
      return Promise.resolve();
    } else {
      return new Promise((resolve, reject) => {
        this._config.models.forEach(m => {
          const assignedNodes = this.shadowRoot.querySelector('slot').assignedNodes({ flatten: true });
          const el = assignedNodes.reduce((acc, node) => {
            if (acc) {
              return acc;
            } else {
              if (node.tagName.toLowerCase() === m.element && node.getAttribute('pie-id') === m.id) {
                return node;
              } else {
                const selector = `${m.element}[pie-id="${m.id}"]`;
                return node.querySelector(selector);
              }
            }
          }, null);

          if (!el) {
            reject(new Error(`can't find element by ${m.element}, ${m.id}`));
          }
          this._registeredPies[m.id] = el;
          el.addEventListener('session-changed', e => {
            //TODO: update the status on session-changed..
            console.log('session-changed: ', e.detail);
          })
        });
        resolve();
      });
    }
  }

  _updatePies(resetSession) {

    if (!this._config || !this._controllers) {
      return;
    }

    if (resetSession === true) {
      this._sessions = [];
    }

    const elements = this._config.models.map(m => m.element);

    const callControllerModel = () => {
      return Object.keys(this._registeredPies).map(id => {
        let node = this._registeredPies[id];
        let model = this._config.models.find(v => v.id === id);
        let session = this._getSessionById(id)
        let controller = this._controllers[node.nodeName.toLowerCase()];
        return controller.model(model, session, this._env)
          .then(m => ({ id: id, model: m, session: session }));
      });
    }

    return Promise.all(elements.map(e => customElements.whenDefined(e)))
      .then(() => this._registerPiesIfNeeded())
      .then(() => Promise.all(callControllerModel()))
      .then(results => {
        results.forEach(({ id, model, session }) => {
          const node = this._registeredPies[id];
          node.model = model;
          node.session = session;
        });
      });
  }

}