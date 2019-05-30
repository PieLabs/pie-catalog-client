import _ from 'lodash';

export default class DemoElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<span id="prompt"></span> 
    <input type="text"></input>
    <span id="feedback"></span><div id="role"></div>`;

    this._$prompt = this.querySelector('#prompt');
    this._$input = this.querySelector('input');
    this._$role = this.querySelector('#role');

    this._$input.addEventListener('input', (e) => {
      this._session.answer = e.target.value;
    });

    this._$feedback = this.querySelector('#feedback');
    this.dispatchEvent(new CustomEvent('pie.register', { bubbles: true }));
  }

  set model(m) {
    console.log('model: ', m);
    this._$prompt.textContent = m.prompt;
    this._$input.setAttribute('placeholder', m.placeholder);
    
    this._$role.innerHTML = `(role = ${m.role ? m.role : 'student'})`;
    if (m.disabled) {
      this._$input.setAttribute('disabled', 'disabled');
    } else {
      this._$input.removeAttribute('disabled');
    }

    if (m.correctResponse) {
      this._$feedback.textContent = m.correctResponse;
    } else {

      this._$feedback.textContent = '';
    }

    if (m.correct === true) {
      this._$feedback.setAttribute('style', "color: green;");
    } else if (m.correct === false) {
      this._$feedback.setAttribute('style', "color: red;");
    } else {
      this._$feedback.setAttribute('style', "color: auto");
    }
  }

  set session(s) {
    console.log('session: ', s);
    this._session = s;
  }
}

export class Config extends HTMLElement {
  constructor() {
    super();
    // let sr = this.attachShadow({ mode: 'open' });
  }

  _initInput(name, handler) {
    let input = this.querySelector(`input[name="${name}"]`);
    input.addEventListener('input', e => {
      handler(e.target.value);

      let detail = {
        update: this._model
      }

      this.dispatchEvent(new CustomEvent('model.updated', { bubbles: true, detail }))
    });
    return input;
  }


  connectedCallback() {
    this.innerHTML = ` 
      <div class="config-pane">
      demo element!!
      <label>Prompt: <input type="text" name="prompt"></input></label>
      <br/>
      <label>Placeholder; <input type="text" name="placeholder"></input></label>
      <br/>
      <label>Correct Response: <input type="text" name="correctResponse"></input></label>
    </div>
    `;

    this._$prompt = this._initInput('prompt', (v) => {
      this._model.prompt = v;
    });

    this._$placeholder = this._initInput('placeholder', (v) => {
      this._model.placeholder = v;
    });

    this._$correctResponse = this._initInput('correctResponse', (v) => {
      this._model.correctResponse = v;
    });
  }
  set model(m) {
    this._model = m;
    this._$prompt.value = this._model.prompt;
    this._$placeholder.value = this._model.placeholder;
    this._$correctResponse.value = this._model.correctResponse;
  }
}

export function model(question, session, env) {

  let evaluateMode = env.mode === 'evaluate';
  
  let out = _.extend({}, {
    prompt: question.prompt,
    placeholder: question.placeholder,
    correct: evaluateMode && session.answer === question.correctResponse,
    disabled: env.mode !== 'gather',
    mode: env.mode,
    correctResponse: evaluateMode && question.correctResponse,
    role: env.role
  });
  return Promise.resolve(out);
}

export function outcome(question, session, env) {
  return Promise.resolve({ score: { scaled: {} } });
}