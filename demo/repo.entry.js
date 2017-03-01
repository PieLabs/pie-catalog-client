require('../src/common');

import * as tabs from '../src/c-tabs';

import CatalogDemo from '../src/catalog-demo';
import CatalogEntry from '../src/catalog-entry';
import ControlPanel from '../src/catalog-demo/control-panel';

require('material-elements/src/select-field');

customElements.define('catalog-entry', CatalogEntry);
customElements.define('catalog-demo', CatalogDemo);
customElements.define('control-panel', ControlPanel);

customElements.define('c-tabs', tabs.CTabs);
customElements.define('c-tab', tabs.CTab);
customElements.define('c-tab-title', tabs.CTabTitle);

console.log('test');
let init = () => {

  customElements.whenDefined('catalog-entry')
    .then(() => {
      let entry = document.querySelector('catalog-entry');
      entry.element = {
        repo: 'my-repo',
        tag: '0.0.1',
        org: 'my-org',
        package: {
          description: 'description'
        }
      }
      //disable loading
      document.querySelector('catalog-container').isLoading(false);
    });


}

document.addEventListener('DOMContentLoaded', () => {
  init();
});