import repo from '../bootstrap/repo';

let init = () => {

  let info = common.elements.load(window.pie.org, window.pie.repo);
  let elementNames = Object.keys(window.demo.config.elements);
  let demoElements = elementNames.map(el => customElements.whenDefined(el));
  let allPromises = [repo, logic, info].concat(demoElements);

  Promise.all(allPromises)
    .then(([logic, infoResult]) => {
      let entry = document.querySelector('catalog-entry');
      entry.element = infoResult;
      entry.config = window.pie.config;

      if (!window.demo.config) {
        throw new Error('config is missing');
      }

      if (!window.controllers) {
        throw new Error('controllers is missing');
      }

      let demo = document.querySelector('catalog-demo');
      demo.config = window.demo.config;
      demo.controllers = window.controllers;
      demo.markup = window.demo.markup;

      setTimeout(() => {
        container.isLoading(false);
      }, 180);
    });
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.onreadystatechange = (e) => {
    if (document.readyState === 'complete') {
      init();
    }
  }
}

document.addEventListener(VIEW_ORG, (e) => {
  let org = event.detail.element.org;
  window.location.href = `/org/${org}/`;
});
