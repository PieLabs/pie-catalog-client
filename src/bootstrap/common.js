require('./common.less');

import AvatarService from '../avatar-service';
import CatalogContainer from '../catalog-container';
import CatalogFooter from '../footer';
import CatalogHeader from '../header';
import CatalogListing from '../listing';
import CatalogListings from '../listings';
import CatalogOrg from '../org';
import GithubAvatar from '../github-avatar';
import PieBrand from '../pie-brand';
import ProgressBar from '../progress-bar';

export const defineCommonElements = () => {
  const elementMap = {
    'catalog-listings': CatalogListings,
    'catalog-listing': CatalogListing,
    'catalog-header': CatalogHeader,
    'catalog-footer': CatalogFooter,
    'catalog-org': CatalogOrg,
    'github-avatar': GithubAvatar,
    'pie-brand': PieBrand,
    'progress-bar': ProgressBar,
    'catalog-container': CatalogContainer,
    'avatar-service': AvatarService
  }

  const keys = Object.keys(elementMap);

  keys.forEach(k => {
    customElements.define(k, elementMap[k]);
  });

  const definedPromises = ['catalog-container'].concat(keys).map(k => customElements.whenDefined(k));

  return Promise.all(definedPromises);
}
