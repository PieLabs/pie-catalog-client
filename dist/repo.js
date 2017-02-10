/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length)
/******/ 			resolves.shift()();

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return Promise.resolve();

/******/ 		// an Promise means "currently loading".
/******/ 		if(installedChunks[chunkId]) {
/******/ 			return installedChunks[chunkId][2];
/******/ 		}
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;

/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + {"0":"6c52ae8f3000de622f17"}[chunkId] + "." + chunkId + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};

/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunks[chunkId][2] = promise;

/******/ 		head.appendChild(script);
/******/ 		return promise;
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = viewRepo;
/* harmony export (immutable) */ __webpack_exports__["c"] = viewOrg;

const VIEW_ORG = 'view-org';
/* harmony export (immutable) */ __webpack_exports__["d"] = VIEW_ORG;

const VIEW_REPO = 'view-repo';
/* harmony export (immutable) */ __webpack_exports__["a"] = VIEW_REPO;


function viewRepo(element) {
  return new CustomEvent(VIEW_REPO, {
    bubbles: true,
    composed: true,
    detail: {
      element: element
    }
  });
}

function viewOrg(element) {
  return new CustomEvent(VIEW_ORG, {
    bubbles: true,
    composed: true,
    detail: {
      element: element
    }
  });
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LoadAvatar extends CustomEvent {
  constructor(user, el) {
    super('load-avatar', { bubbles: true, composed: true });
    this.user = user;
    this.element = el;
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = LoadAvatar;


LoadAvatar.TYPE = 'load-avatar';

class AvatarService extends HTMLElement {

  connectedCallback() {

    this.template = this.getAttribute('url-template');

    if (!this.template) {
      console.error('service is missing url-template attribute');
    }

    console.log('avatar-service connected', LoadAvatar.TYPE);
    document.addEventListener(LoadAvatar.TYPE, e => {
      console.log('load avatar: ', e.element);
      let url = this.template.replace(':user', e.user);
      e.element.setAttribute('url', url);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AvatarService;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listings__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listing__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__footer__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__org__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__github_avatar__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pie_brand__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__progress_bar__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__catalog_container__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__client__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__avatar_service__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_9__client__["a"]; });
__webpack_require__(1);


customElements.define('catalog-listings', __WEBPACK_IMPORTED_MODULE_0__listings__["a" /* default */]);


customElements.define('catalog-listing', __WEBPACK_IMPORTED_MODULE_1__listing__["a" /* default */]);


customElements.define('catalog-header', __WEBPACK_IMPORTED_MODULE_2__header__["a" /* default */]);


customElements.define('catalog-footer', __WEBPACK_IMPORTED_MODULE_3__footer__["a" /* default */]);


customElements.define('catalog-org', __WEBPACK_IMPORTED_MODULE_4__org__["a" /* default */]);


customElements.define('github-avatar', __WEBPACK_IMPORTED_MODULE_5__github_avatar__["a" /* default */]);


customElements.define('pie-brand', __WEBPACK_IMPORTED_MODULE_6__pie_brand__["a" /* default */]);


customElements.define('progress-bar', __WEBPACK_IMPORTED_MODULE_7__progress_bar__["a" /* default */]);


customElements.define('catalog-container', __WEBPACK_IMPORTED_MODULE_8__catalog_container__["a" /* default */]);




customElements.define('avatar-service', __WEBPACK_IMPORTED_MODULE_10__avatar_service__["a" /* default */]);





/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return boxShadow; });
let boxShadow = `box-shadow: 0 1px 4px 0 var(--shadow-color, hsla(0, 0%, 0%, 0.1)), 0 0px 4px 0 var(--shadow-color, hsla(0, 0%, 0%, 0.1));`


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ":root {\n  --main-bg-color: white;\n  --catalog-header-bg: rgba(0, 50, 49, 0.1);\n  --progress-bar-color: #64B362;\n  --pie-brand-color: #404042;\n  --pie-brand-hover-color: #3b7639;\n  font-family: 'Roboto', sans-serif;\n}\nbody {\n  background-color: var(--main-bg-color, white);\n}\npie-catalog-app[hidden] {\n  opacity: 0;\n}\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CatalogContainer extends HTMLElement {

  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });
    sr.innerHTML = `

      <style>
        :host {
          display: flex;
          flex-direction: column;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;

        }

        progress-bar{
          height: 2px;
        }

        [loading] {
          opacity: 0;
        }
                
        #content { 
          position: relative;
          flex-grow: 1;
          transition: opacity 300ms linear;
          padding: 10px;
        } 
      </style>
      <catalog-header></catalog-header>
      <progress-bar disabled></progress-bar>
      <div id="content">
        <slot></slot>
      </div>
      <catalog-footer></catalog-footer>
    `;
  }

  get _progressBar() {
    return this.shadowRoot.querySelector('progress-bar');
  }

  get _content() {
    return this.shadowRoot.querySelector('#content');
  }

  set version(v) {
    this.shadowRoot.querySelector('catalog-footer').version = v;
  }


  isLoading(loading) {
    if (!this._progressBar) {
      return;
    }

    if (loading) {
      this._progressBar.removeAttribute('disabled');
      this._content.setAttribute('loading', '');
    } else {
      this._progressBar.setAttribute('disabled', '');
      this._content.removeAttribute('loading');
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CatalogContainer;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return elements; });
const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const json = (response) => response.json();

class Elements {

  version() {
    return fetch('/version')
      .then(status)
      .then(json)
      .catch(e => {
        console.log('/version error: ', e);
        Promise.resolve();
      });
  }

  list() {
    return fetch('/api/element')
      .then(json)
      .catch(e => {
        console.error(e);
      });
  }

  load(org, repo) {
    return fetch(`/api/element/${org}/${repo}`)
      .then(status)
      .then(json)
      .catch(e => {
        console.error(e);
      });
  }

  listByOrg(org) {
    return fetch(`/api/org/${org}`)
      .then(status)
      .then(json)
      .catch(e => {
        console.error(e);
      });
  }

}

let elements = new Elements();

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CatalogFooter extends HTMLElement {
  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });
    sr.innerHTML = `
    <style>
    :host{
      padding: 7px;
      display: block;
      background-color: var(--catalog-header-bg, green);
      border-top: solid 1px var(--shadow-color, #cccccc);
    }

    #version{
      font-size: 11px;
    }

    </style>
    <label id="version"></label> 
    `;

    this._$version = this.shadowRoot.querySelector('#version');
  }

  set version(v) {
    console.log('version: ', v);
    if (v) {
      this._$version.textContent = v.version;
      if (v.sha && v.sha !== `v${v.version}`) {
        this._$version.textContent += ` : ${v.sha}`;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CatalogFooter;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__avatar_service__ = __webpack_require__(2);


class GithubAvatar extends HTMLElement {

  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `
    <style>
    :host{
      display: inline-block;
    }
    </style>
    <img></img>`;
  }

  static get observedAttributes() {
    return ['user', 'url'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attr changed:', arguments);
    if (name === 'user' && newValue) {
      //remove the old url
      this.removeAttribute('url');
      this.loadAvatar();
    } else if (name === 'url' && newValue) {
      this.shadowRoot
        .querySelector('img')
        .setAttribute('src', this.getAttribute('url'));
    }
  }

  loadAvatar() {
    let user = this.getAttribute('user');
    if (user) {
      console.log('dispatch event ..')
      this.dispatchEvent(new __WEBPACK_IMPORTED_MODULE_0__avatar_service__["b" /* LoadAvatar */](user, this));
    }
  }

  connectedCallback() {
    let img = this.shadowRoot.querySelector('img');
    img.setAttribute('width', this.getAttribute('size'));
    img.setAttribute('height', this.getAttribute('size'));
    this.loadAvatar();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GithubAvatar;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CatalogHeader extends HTMLElement {

  constructor() {
    super();

    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `
    <style>
      :host {
        display: block;
        height: 60px;
        min-height: 60px;
        padding-top: 5px;
        padding-left: 5px;
        background-color: var(--catalog-header-bg, green);
        border-bottom: solid 1px var(--shadow-color, #cccccc);
      }
      
      h1 {
        margin: 0;
        padding: 0;
      }

      a{
        font-size: 14px;
        text-transform: uppercase;
        text-decoration: none;
        color: var(--pie-brand-color, #333333);
        transition: color 100ms linear;
        margin-right: 10px;
      }
      
      a:hover{
        color: var(--pie-brand-hover-color, #300333);
      }

      pie-brand{
        margin-right: 10px;
      }


    </style>
    <pie-brand></pie-brand>
    <a href="//pielabs.github.io/pie-docs/" target="_blank">Documentation</a>
    `;
  }

  connectedCallback() {
    console.log('connected header');

    this.shadowRoot.querySelector('pie-brand').addEventListener('click', e => {
      document.location.pathname = '/';
      // this.dispatchEvent(new CustomEvent('home-click', { bubbles: true }));
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CatalogHeader;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles__ = __webpack_require__(4);



class CatalogListing extends HTMLElement {

  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `

    <style>
     :host{
        width: 300px;
        height: 120px;
        max-height: 120px;
        display: block;
        cursor: pointer;
        padding: 10px;
        background-color: white;
        box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.2);
        transition: box-shadow 200ms ease-in;
      }

      :host(:hover){
        cursor: pointer;
        box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.4);
      } 

      h4 {
        padding: 0;
        margin: 0;
      }

      hr {
        border: none;
        border-bottom: solid 1px var(--shadow-color, hsla(0, 0%, 0%, 0.1));
      }

      #description {
        display: block;
        font-size: 14px;
        height: 20px;
      }

      .footer{
        display: flex;
        align-items: center;
        padding: 2px;
      }
      
      #org{
        padding: 6px;
      }

      #repo{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      #tag{
        font-size: 12px;
        margin-top: 4px;
        margin-bottom: 4px;
      }

    </style>

    <h4 id="repo"></h4>
    <div id="tag"></div>
    <span id="description"></span>
    <hr/>
    <div class="footer">
      <github-avatar size="40"></github-avatar>
      <label id="org"></label>
    </div>
    `;

    this._$org = this.shadowRoot.querySelector('#org');
    this._$repo = this.shadowRoot.querySelector('#repo');
    this._$tag = this.shadowRoot.querySelector('#tag');
    this._$description = this.shadowRoot.querySelector('#description');
    this._$avatar = this.shadowRoot.querySelector('github-avatar');
  }

  set element(e) {
    this._element = e;
    let qs = this.shadowRoot.querySelector;
    this._$org.textContent = e.org;
    this._$repo.textContent = e.repo;
    this._$tag.textContent = e.tag;
    this._$description.textContent = e.description;
    this._$avatar.setAttribute('user', e.org);
  }

  get element() {
    return this._element;
  }

  connectedCallback() {
    let onRepoClick = (e) => {
      e.preventDefault();
      this.dispatchEvent(__WEBPACK_IMPORTED_MODULE_0__events__["b" /* viewRepo */](this._element));
    };

    let onOrgClick = (e) => {
      e.preventDefault();
      this.dispatchEvent(__WEBPACK_IMPORTED_MODULE_0__events__["c" /* viewOrg */](this._element));
    };

    this.shadowRoot.querySelector('#repo').addEventListener('click', onRepoClick);
    this.shadowRoot.querySelector('#description').addEventListener('click', onRepoClick);
    this.shadowRoot.querySelector('#org').addEventListener('click', onOrgClick);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CatalogListing;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CatalogListings extends HTMLElement {

  constructor() {
    super();

    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `
    <style>
        :host {
          display: block;
        }

        .elements > catalog-listing {
          display: inline-block;
          margin: 4px;
        }
    </style>
    <div class="elements">
    </div>
    `;
  }

  set elements(e) {
    this._elements = e;
    if (!this._elements) {
      return;
    }

    let markup = this._elements.map((n, index) => {
      return `<catalog-listing data-index="${index}"></catalog-listing>`;
    });

    this.shadowRoot.querySelector('.elements').innerHTML = markup.join('\n');

    customElements.whenDefined('catalog-listing').then(() => {
      this.shadowRoot.querySelectorAll('catalog-listing').forEach((n, i) => {
        let index = parseInt(n.getAttribute('data-index'));
        n.element = this._elements[index];
      });
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CatalogListings;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CatalogOrg extends HTMLElement {

  constructor() {
    super();

    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `

    <style>

      :host{
        display: block;
      }
      .elements > catalog-listing {
        display: inline-block;
        margin: 4px;
      }

      hr{
        border: none;
        border-bottom: solid 1px var(--shadow-color, hsla(0, 0%, 0%, 0.1));
      } 

    </style>
    <div id="org"></div>
    <hr/>
    <div class="elements">
    </div>
    `;
  }


  set org(o) {
    this._org = o;

    this.shadowRoot.querySelector('#org').textContent = o.org;

    let markup = o.elements.map((e, i) => {
      return `<catalog-listing data-index="${i}"></catalog-listing>`;
    });

    this.shadowRoot.querySelector('.elements').innerHTML = markup.join('\n');

    this.shadowRoot.querySelectorAll('catalog-listing').forEach((n, i) => {
      let index = parseInt(n.getAttribute('data-index'));
      n.element = o.elements[index];
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CatalogOrg;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PieBrand extends HTMLElement {
  constructor() {
    super();

    let sr = this.attachShadow({ mode: 'open' });

    sr.innerHTML = `
    <style>
    
    :host{
       cursor: pointer;
       font-family: 'Patua One', serif;
    }

    * {
       font-size: 39px;
    }

    .pie {
      color: var(--pie-brand-color, #404042);
      transition:color 100ms linear;
      cursor: pointer;
    }
    
    .pie:hover{
      color: var(--pie-brand-hover-color,#64B362);
    }

    .other {
      color: #1095D4;
    }
    
    </style>
    <span class="pie">pie</span>
    `;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PieBrand;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ProgresBar extends HTMLElement {

  constructor() {
    super();
    let sr = this.attachShadow({ mode: 'open' });
    sr.innerHTML = `
      <style>
        :host{
          display: block;
          overflow: hidden;
        }
        
        :host([disabled]) #progress{
          opacity: 0;
        }

        #progress {
          opacity: 1;
          width: 100%;
          height: 1px;
          background-color: var(--progress-bar-color, rgba(0,0,0,0.2));
          transition: opacity 100ms ease-in;
          -webkit-transform-origin: right center;
          transform-origin: right center;
          -webkit-animation: indeterminate-bar 2s linear infinite;
          animation: indeterminate-bar 2s linear infinite;
        }
        
        @-webkit-keyframes indeterminate-bar {
          0% {
            -webkit-transform: scaleX(1) translateX(-100%);
          }
          50% {
            -webkit-transform: scaleX(1) translateX(0%);
          }
          75% {
            -webkit-transform: scaleX(1) translateX(0%);
            -webkit-animation-timing-function: cubic-bezier(.28,.62,.37,.91);
          }
          100% {
            -webkit-transform: scaleX(0) translateX(0%);
          }
        }


      </style>
      <div id="progress" hidden></div>
    `
  }

  enable() {
    this.removeAttribute('disabled');
  }

  disable() {
    this.setAttribute('disabled', '');
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#progress').removeAttribute('hidden');
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProgresBar;


/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(0);
__webpack_require__(1);





let logic = __webpack_require__.e/* require.ensure */(0).then((() => {

  const {define} = __webpack_require__(18);
  define();

  //load up the select field
  __webpack_require__(19);

  const MarkdownElement = __webpack_require__(28).default;
  customElements.define('markdown-element', MarkdownElement);

  const CatalogSchemas = __webpack_require__(29).default;
  customElements.define('catalog-schemas', CatalogSchemas);

  const { default: IframeHolder } = __webpack_require__(26);
  customElements.define('iframe-holder', IframeHolder);

  const CatalogEntry = __webpack_require__(23).default;
  customElements.define('catalog-entry', CatalogEntry);

  const { default: DependenciesPanel, DependencyEl } = __webpack_require__(24);
  customElements.define('dependencies-panel', DependenciesPanel);
  customElements.define('dependency-el', DependencyEl);

  const { default: InfoPanel, GithubInfoCount } = __webpack_require__(27);
  customElements.define('info-panel', InfoPanel);
  customElements.define('github-info-count', GithubInfoCount);

  //Note: these elements auto register themselves
  __webpack_require__(20);

  const FancyTabs = __webpack_require__(25).default;
  customElements.define('fancy-tabs', FancyTabs);

  const { default: CatalogDemo } = __webpack_require__(22);
  customElements.define('catalog-demo', CatalogDemo);
  const {default: ControlPanel} = __webpack_require__(21);
  customElements.define('control-panel', ControlPanel);
}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);


document.addEventListener('DOMContentLoaded', () => {

  let info = __WEBPACK_IMPORTED_MODULE_0__common__["a" /* elements */].load(window.pie.org, window.pie.repo);

  /** init loader */

  let container = document.querySelector('catalog-container');

  customElements.whenDefined('catalog-container')
    .then(() => {
      container.isLoading(true);
    });

  let elementNames = ['catalog-demo'].concat(Object.keys(window.demo.config.elements));
  let demoElements = elementNames.map(el => customElements.whenDefined(el));
  let allPromises = [logic, info].concat(demoElements);

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
      }, 180)
    })
});


document.addEventListener(__WEBPACK_IMPORTED_MODULE_1__events__["d" /* VIEW_ORG */], (e) => {
  let org = event.detail.element.org;
  window.location.href = `/org/${org}/`;
});


/***/ })
/******/ ]);