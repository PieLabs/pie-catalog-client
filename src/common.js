require('./common.less');

import AvatarService from './avatar-service';
import CatalogContainer from './catalog-container';
import CatalogFooter from './footer';
import CatalogHeader from './header';
import CatalogListing from './listing';
import CatalogListings from './listings';
import CatalogOrg from './org';
import GithubAvatar from './github-avatar';
import PieBrand from './pie-brand';
import ProgressBar from './progress-bar';

customElements.define('catalog-listings', CatalogListings);
customElements.define('catalog-listing', CatalogListing);
customElements.define('catalog-header', CatalogHeader);
customElements.define('catalog-footer', CatalogFooter);
customElements.define('catalog-org', CatalogOrg);
customElements.define('github-avatar', GithubAvatar);
customElements.define('pie-brand', PieBrand);
customElements.define('progress-bar', ProgressBar);
customElements.define('catalog-container', CatalogContainer);
customElements.define('avatar-service', AvatarService);


export default customElements.whenDefined('catalog-container');
