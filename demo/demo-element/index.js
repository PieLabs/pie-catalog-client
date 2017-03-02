import _ from 'lodash';

export default class DemoElement extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <span id="prompt"></span> 
    <input type="text"></input>
    <span id="feedback"></span>
    `;

    this._$prompt = this.querySelector('#prompt');
    this._$input = this.querySelector('input');

    this._$input.addEventListener('input', (e) => {
      this._session.answer = e.target.value;
    });

    this._$feedback = this.querySelector('#feedback');
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('pie.register', { bubbles: true }));
  }

  set model(m) {
    console.log('model: ', m);
    this._$prompt.textContent = m.prompt;
    this._$input.setAttribute('placeholder', m.placeholder);
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
    let sr = this.attachShadow({ mode: 'open' });
    sr.innerHTML = ` 
    <style>
      textarea{
        width: 98%;
        padding-right: 4px;
      }
    </style>
    <textarea></textarea>
    `;

    this._$area = sr.querySelector('textarea');
    console.log('this area', this._$area)
    this._$area.addEventListener('input', (e) => {
      try {
        let update = JSON.parse(e.target.value);
        this._model = update;
        console.log(update);

        if (!this._id || !this._element) {
          return;
        }

        this.dispatchEvent(new CustomEvent('model.updated', {
          bubbles: true,
          composed: true,
          detail: {
            id: this._id,
            element: this._element,
            update
          }
        }));
      } catch (e) {
        //...
      }
    });
  }

  set model(m) {
    console.log('demo-element-config: model: ', m);
    this._model = m;
    this._id = m.id;
    this._element = m.element;
    this._$area.value = JSON.stringify(m, null, '  ');
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
    correctResponse: evaluateMode && question.correctResponse
  });
  return Promise.resolve(out);
}

export function outcome(question, session, env) {
  return Promise.resolve({ score: { scaled: {} } });
}