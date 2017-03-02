export default class DemoElement extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div>
    demo-element
    <hr/>
    model: 
    <code id="model"></code>
    </div>
    <div>
      session: 
      <code id="session"></code>
    </div>
    `;
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('pie.register', { bubbles: true }));
  }

  set model(m) {
    console.log('model: ', m);
    this.querySelector('#model').innerHTML = JSON.stringify(m);
  }

  set session(s) {
    console.log('session: ', s);
    this.querySelector('#session').innerHTML = JSON.stringify(s);
  }
}

export function model(question, session, env) {
  return Promise.resolve({ question, env });
}

export function outcome(question, session, env) {
  return Promise.resolve({ score: { scaled: {} } });
}