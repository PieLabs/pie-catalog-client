import DemoElement, { Config, model, outcome } from './demo-element';

import { elementsDefined } from '../src/bootstrap/repo';

customElements.define('demo-element', DemoElement);
customElements.define('demo-element-configuration', Config);

let init = () => {
  elementsDefined
    .then(() => {
      let entry = document.querySelector('catalog-entry');
      if (entry) {
        entry.element = {
          repo: 'my-repo',
          tag: '0.0.1',
          org: 'my-org',
          package: {
            description: 'description',
            dependencies: {
              a: '1.0.0',
              b: '2.0.0'
            }
          },
          readme: '# hi \n\n Here is some text',
          github: {
            pushed_at: new Date().toISOString(),
            stargazers_count: 1,
            watchers_count: 1,
            forks_count: 1,
            open_issues_count: 1
          }
        }

      }

      let demo = document.querySelector('catalog-demo');
      demo.markup = `<demo-element pie-id="1"></demo-element>`;

      demo.configureMap = {
        'demo-element': 'demo-element-configuration'
      }

      demo.config = {
        models: [
          {
            id: '1',
            element: 'demo-element',
            prompt: 'What is the 1st letter of the alphabet?',
            placeholder: 'a,b,c...',
            correctResponse: 'a'
          }
        ]
      }

      demo.controllers = {
        'demo-element': { model, outcome }
      }

      let container = document.querySelector('catalog-container');
      container.isLoading(false);
    })
    .catch(e => {
      console.error(e);
    });
}

document.addEventListener('DOMContentLoaded', init);