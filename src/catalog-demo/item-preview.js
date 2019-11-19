import { applyStyle, boxShadow, prepareTemplate } from '../styles';
import debug from 'debug';

const log = debug('pie-catalog-client:item-preview');

const templateHTML = `
    <style>
      :host{
        display: block;
        flex: 1;
      }

      control-panel{
        display: flex;
        padding-bottom: 10px;
      }
      
        /*${boxShadow}*/
      .pie-panel{
        border-radius: 0px;
        border: solid 1px white; 
        padding: 10px;
        margin-top: 20px;
      }

    </style>
    <control-panel></control-panel>
    <div class="pie-panel">
      <slot></slot> 
    </div>
    <outcome-info></outcome-info>
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
    this._session = [];
    this._env = {
      mode: 'gather'
    };
  }

  connectedCallback() {
    this.$controlPanel = this.shadowRoot.querySelector('control-panel');
    customElements.whenDefined('control-panel').then(() => {
      this.$controlPanel.env = this._env;
    });

    this.$controlPanel.addEventListener('env-changed', e => {
      this._updatePies();
    });
    this.$outcomeInfo = this.shadowRoot.querySelector('outcome-info');
  }

  /**
   * @param {*} c  the config
   * @param {*} resetSession  reset the session also
   */
  setConfig(c, resetSession) {
    this._config = c;

    customElements.whenDefined('control-panel').then(() => {
      this.$controlPanel.langs = this._config.langs;
    });

    return this._updatePies(resetSession);
  }

  setSession(s) {
    this._session = s;
    return this._updatePies(false);
  }

  set controllers(c) {
    this._controllers = c;
    this._updatePies();
  }

  _getSessionById(id) {
    let session = this._session.find(v => v.id === id);
    if (!session) {
      session = { id: id };
      this._session.push(session);
    }
    return session;
  }

  _registerPiesIfNeeded() {
    //TODO: could be a bit more thorough here..
    if (
      this._config.models.length === Object.keys(this._registeredPies).length
    ) {
      return Promise.resolve();
    } else {
      return new Promise((resolve, reject) => {
        this._config.models.forEach(m => {
          const assignedNodes = this.shadowRoot
            .querySelector('slot')
            .assignedNodes({ flatten: true });
          const el = assignedNodes.reduce((acc, node) => {
            if (acc) {
              return acc;
            } else {
              if (
                node.tagName.toLowerCase() === m.element &&
                node.getAttribute('pie-id') === m.id
              ) {
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
          });
        });
        resolve();
      });
    }
  }

  clearOutcomes() {
    this.$outcomeInfo.clear();
  }
  clearOutcomes() {
    this.$outcomeInfo.show(outcomes);
  }

  _updatePies(resetSession) {
    log('[_updatePies] reset: ', resetSession);

    this.$outcomeInfo.outcomes = [];

    if (!this._config || !this._controllers) {
      return;
    }

    if (resetSession === true) {
      this._session = [];
    }

    const elements = this._config.models.map(m => m.element);

    const callControllerFn = (fn, handler) => {
      return Object.keys(this._registeredPies).map(id => {
        let node = this._registeredPies[id];
        let model = this._config.models.find(v => v.id === id);
        let session = this._getSessionById(id);
        let controller = this._controllers[node.nodeName.toLowerCase()];
        if (controller && controller[fn]) {
          return controller[fn](model, session, this._env).then(m =>
            handler(id, m, session)
          );
        } else {
          return Promise.resolve(
            handler(
              id,
              { empty: true, info: 'no outcomes method found' },
              session
            )
          );
        }
      });
    };

    const callControllerModel = () =>
      callControllerFn('model', (id, model, session) => ({
        id,
        model,
        session
      }));

    const callOutcomes = () => {
      if (this._env.mode !== 'evaluate') {
        return [];
      } else {
        log('[callOutcomes] => get outcome!');

        return callControllerFn('outcome', (id, outcome, session) => {
          return { id, outcome, session };
        });
      }
    };

    return Promise.all(elements.map(e => customElements.whenDefined(e)))
      .then(() => this._registerPiesIfNeeded())
      .then(async () => {
        const results = await Promise.all(callControllerModel());
        const outcomes = await Promise.all(callOutcomes());
        return { results, outcomes };
      })
      .then(({ results, outcomes }) => {
        log('outcomes:', outcomes);
        this.$outcomeInfo.outcomes = outcomes;
        results.forEach(({ id, model, session }) => {
          const node = this._registeredPies[id];
          node.model = model;
          node.session = session;
        });
      });
  }
}
