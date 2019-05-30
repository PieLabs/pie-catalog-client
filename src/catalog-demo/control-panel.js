import { prepareTemplate, applyStyle, boxShadow } from '../styles';

const templateHTML = `
    <style>
    :host{
      padding-bottom: 6px;
      --select-field-font-family: 'Droid Sans', sans-serif;
      --select-option-selected-color: var(--pie-brand-hover-color);
      margin-bottom: 10px;
      ${boxShadow}
      padding: 18px;
      background-color: #f3f3f3;
    }

    #control-panel{
      text-transform: uppercase;
      font-size: 12px;
      color: grey;
    }

    </style>

    <span id="control-panel">control panel</span>

    <select-field id="mode" placeholder="mode">
      <select-option value="gather" selected>gather</select-option>
      <select-option value="view">view</select-option>
      <select-option value="evaluate">evaluate</select-option>
    </select-field>

    <select-field id="role" placeholder="user role">
      <select-option value="student" selected>student</select-option>
      <select-option value="instructor">instructor</select-option>
    </select-field>

    <span id="langs-holder"></span>
`;

export default class ControlPanel extends HTMLElement {
  constructor() {
    super();
    const template = prepareTemplate(templateHTML, 'control-panel');
    let sr = applyStyle(this, template);
  }

  set env(e) {
    this._env = e;
  }

  set langs(l) {
    this._langs = l;
    if (this._langs) {
      this._addLangsSelectField();
    }
  }

  _addLangsSelectField() {
    let options = this._langs.map(l => `<select-option 
      value="${l}" 
      ${l === 'en-US' ? 'selected' : ''}>${l}</select-option>`).join(' ');

    this.shadowRoot.querySelector('#langs-holder').innerHTML = `
    <select-field placeholder="locale" id="langs">${options}</select-field>
    `;

    this.shadowRoot.querySelector('#langs').addEventListener('change', e => {
      this._updateEnv('locale', e.detail.value);
    });
  }

  _updateEnv(path, value) {

    if (!this._env) {
      return;
    }

    if (this._env[path] === value) {
      return;
    }

    this._env[path] = value;
    this._dispatchEnvChanged();
  }

  _dispatchEnvChanged() {
    this.dispatchEvent(new CustomEvent('env-changed', {
      bubbles: true,
      composed: true,
      detail: {
        env: this._env
      }
    }));
  }

  connectedCallback() {

    this.shadowRoot.querySelector('#mode').addEventListener('change', e => {
      this._updateEnv('mode', e.detail.value);
    });

    this.shadowRoot.querySelector('#role').addEventListener('change', e => {
      if (this._env) {
        this._env.role = e.detail.value;
        this._dispatchEnvChanged();
      }
    });
  }
}