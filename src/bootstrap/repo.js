import { VIEW_ORG } from '../events';
import common from '../common';

//Common will resolve first
export { common };

//logic next 
export const logic = require.ensure([], () => {

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
  const { default: ItemPreview } = require('../catalog-demo/item-preview');
  customElements.define('item-preview', ItemPreview);
  const { default: ConfigurationPanes, ConfigurationPane } = require('../catalog-demo/configuration-panes');
  customElements.define('configuration-panes', ConfigurationPanes);
  customElements.define('configuration-pane', ConfigurationPane);

  //not ready yet...
  // const RelativeTime = require('time-elements/src/relative-time');
  // customEements.define('relative-time', RelativeTime);

})
  .then(() => {
    console.log('logic loaded');
  });

let repoElements = [
  'catalog-entry',
  'catalog-demo'
];

//This will happen at the end
export const elementsDefined = Promise.all(repoElements.map(e => customElements.whenDefined(e)));