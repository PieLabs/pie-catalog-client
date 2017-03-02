import * as common from '../common';

import { VIEW_ORG } from '../events';

let logic = require.ensure([], () => {

  require('material-elements/src/select-field');

  const MarkdownElement = require('../markdown-element').default;
  customElements.define('markdown-element', MarkdownElement);

  const CatalogEntry = require('../catalog-entry').default;
  customElements.define('catalog-entry', CatalogEntry);

  const { default: DependenciesPanel, DependencyEl } = require('../dependencies-panel');
  customElements.define('dependencies-panel', DependenciesPanel);
  customElements.define('dependency-el', DependencyEl);

  const { default: InfoPanel, GithubInfoCount } = require('../info-panel');
  customElements.define('info-panel', InfoPanel);
  customElements.define('github-info-count', GithubInfoCount);

  const ctabs = require('../c-tabs');
  customElements.define('c-tabs', ctabs.CTabs);
  customElements.define('c-tab', ctabs.CTab);
  customElements.define('c-tab-title', ctabs.CTabTitle);

  const { default: CatalogDemo } = require('../catalog-demo');
  customElements.define('catalog-demo', CatalogDemo);
  const { default: ControlPanel } = require('../catalog-demo/control-panel');
  customElements.define('control-panel', ControlPanel);

  //not ready yet...
  // const RelativeTime = require('time-elements/src/relative-time');
  // customEements.define('relative-time', RelativeTime);

});

let elements = [
  'catalog-entry',
  'catalog-demo'
];

let defined = elements.map(e => customElements.whenDefined(e));

export default Promise.all([logic].concat(defined));