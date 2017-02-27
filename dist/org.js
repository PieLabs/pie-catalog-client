/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

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

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = prepareTemplate;
/* harmony export (immutable) */ __webpack_exports__["b"] = applyStyle;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return noSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return boxShadow; });
//init shadycss polyfill
__webpack_require__(12);

function prepareTemplate(templateHTML, elementName) {
  const template = document.createElement('template');
  template.innerHTML = templateHTML;
  ShadyCSS.prepareTemplate(template, elementName);
  return template;
}

function applyStyle(el, template, isShadow) {
  isShadow = isShadow !== false;

  ShadyCSS.styleElement(el);
  let templateCopy = document.importNode(template.content, true);
  if (isShadow) {
    let shadowRoot = el.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(templateCopy);
    return shadowRoot;
  } else {
    el.appendChild(templateCopy);
  }
}

let noSelect = `
 -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */ `;

let boxShadow = `box-shadow: 0 1px 4px 0 var(--shadow-color, hsla(0, 0%, 0%, 0.1)), 0 0px 4px 0 var(--shadow-color, hsla(0, 0%, 0%, 0.1));`


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return nativeShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nativeCssVariables; });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



let nativeShadow = !(window['ShadyDOM'] && window['ShadyDOM']['inUse']);
// chrome 49 has semi-working css vars, check if box-shadow works
// safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
let nativeCssVariables = (!navigator.userAgent.match('AppleWebKit/601') &&
window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)'));

/**
 * @param {ShadyCSSOptions | ShadyCSSInterface | undefined} settings
 */
function parseSettings(settings) {
  if (settings) {
    nativeCssVariables = nativeCssVariables && !settings['nativeCss'] && !settings['shimcssproperties'];
  nativeShadow = nativeShadow && !settings['nativeShadow'] && !settings['shimshadow'];
  }
}

if (window.ShadyCSS) {
  parseSettings(window.ShadyCSS);
} else if (window['WebComponents']) {
  parseSettings(window['WebComponents']['flags']);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StyleNode; });
/* harmony export (immutable) */ __webpack_exports__["b"] = parse;
/* harmony export (immutable) */ __webpack_exports__["c"] = stringify;
/* harmony export (immutable) */ __webpack_exports__["e"] = removeCustomPropAssignment;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/*
Extremely simple css parser. Intended to be not more than what we need
and definitely not necessarily correct =).
*/



/** @unrestricted */
class StyleNode {
  constructor() {
    /** @type {number} */
    this['start'] = 0;
    /** @type {number} */
    this['end'] = 0;
    /** @type {StyleNode} */
    this['previous'] = null;
    /** @type {StyleNode} */
    this['parent'] = null;
    /** @type {Array<StyleNode>} */
    this['rules'] = null;
    /** @type {string} */
    this['parsedCssText'] = '';
    /** @type {string} */
    this['cssText'] = '';
    /** @type {boolean} */
    this['atRule'] = false;
    /** @type {number} */
    this['type'] = 0;
    /** @type {string} */
    this['keyframesName'] = '';
    /** @type {string} */
    this['selector'] = '';
    /** @type {string} */
    this['parsedSelector'] = '';
  }
}



// given a string of css, return a simple rule tree
/**
 * @param {string} text
 * @return {StyleNode}
 */
function parse(text) {
  text = clean(text);
  return parseCss(lex(text), text);
}

// remove stuff we don't care about that may hinder parsing
/**
 * @param {string} cssText
 * @return {string}
 */
function clean(cssText) {
  return cssText.replace(RX.comments, '').replace(RX.port, '');
}

// super simple {...} lexer that returns a node tree
/**
 * @param {string} text
 * @return {StyleNode}
 */
function lex(text) {
  let root = new StyleNode();
  root['start'] = 0;
  root['end'] = text.length
  let n = root;
  for (let i = 0, l = text.length; i < l; i++) {
    if (text[i] === OPEN_BRACE) {
      if (!n['rules']) {
        n['rules'] = [];
      }
      let p = n;
      let previous = p['rules'][p['rules'].length - 1] || null;
      n = new StyleNode();
      n['start'] = i + 1;
      n['parent'] = p;
      n['previous'] = previous;
      p['rules'].push(n);
    } else if (text[i] === CLOSE_BRACE) {
      n['end'] = i + 1;
      n = n['parent'] || root;
    }
  }
  return root;
}

// add selectors/cssText to node tree
/**
 * @param {StyleNode} node
 * @param {string} text
 * @return {StyleNode}
 */
function parseCss(node, text) {
  let t = text.substring(node['start'], node['end'] - 1);
  node['parsedCssText'] = node['cssText'] = t.trim();
  if (node['parent']) {
    let ss = node['previous'] ? node['previous']['end'] : node['parent']['start'];
    t = text.substring(ss, node['start'] - 1);
    t = _expandUnicodeEscapes(t);
    t = t.replace(RX.multipleSpaces, ' ');
    // TODO(sorvell): ad hoc; make selector include only after last ;
    // helps with mixin syntax
    t = t.substring(t.lastIndexOf(';') + 1);
    let s = node['parsedSelector'] = node['selector'] = t.trim();
    node['atRule'] = (s.indexOf(AT_START) === 0);
    // note, support a subset of rule types...
    if (node['atRule']) {
      if (s.indexOf(MEDIA_START) === 0) {
        node['type'] = types.MEDIA_RULE;
      } else if (s.match(RX.keyframesRule)) {
        node['type'] = types.KEYFRAMES_RULE;
        node['keyframesName'] =
          node['selector'].split(RX.multipleSpaces).pop();
      }
    } else {
      if (s.indexOf(VAR_START) === 0) {
        node['type'] = types.MIXIN_RULE;
      } else {
        node['type'] = types.STYLE_RULE;
      }
    }
  }
  let r$ = node['rules'];
  if (r$) {
    for (let i = 0, l = r$.length, r;
      (i < l) && (r = r$[i]); i++) {
      parseCss(r, text);
    }
  }
  return node;
}

/**
 * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
 * expanded form that doesn't require trailing space `\000033`
 * @param {string} s
 * @return {string}
 */
function _expandUnicodeEscapes(s) {
  return s.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
    let code = arguments[1],
      repeat = 6 - code.length;
    while (repeat--) {
      code = '0' + code;
    }
    return '\\' + code;
  });
}

/**
 * stringify parsed css.
 * @param {StyleNode} node
 * @param {boolean=} preserveProperties
 * @param {string=} text
 * @return {string}
 */
function stringify(node, preserveProperties, text = '') {
  // calc rule cssText
  let cssText = '';
  if (node['cssText'] || node['rules']) {
    let r$ = node['rules'];
    if (r$ && !_hasMixinRules(r$)) {
      for (let i = 0, l = r$.length, r;
        (i < l) && (r = r$[i]); i++) {
        cssText = stringify(r, preserveProperties, cssText);
      }
    } else {
      cssText = preserveProperties ? node['cssText'] :
        removeCustomProps(node['cssText']);
      cssText = cssText.trim();
      if (cssText) {
        cssText = '  ' + cssText + '\n';
      }
    }
  }
  // emit rule if there is cssText
  if (cssText) {
    if (node['selector']) {
      text += node['selector'] + ' ' + OPEN_BRACE + '\n';
    }
    text += cssText;
    if (node['selector']) {
      text += CLOSE_BRACE + '\n\n';
    }
  }
  return text;
}

/**
 * @param {Array<StyleNode>} rules
 * @return {boolean}
 */
function _hasMixinRules(rules) {
  let r = rules[0];
  return Boolean(r) && Boolean(r['selector']) && r['selector'].indexOf(VAR_START) === 0;
}

/**
 * @param {string} cssText
 * @return {string}
 */
function removeCustomProps(cssText) {
  cssText = removeCustomPropAssignment(cssText);
  return removeCustomPropApply(cssText);
}

/**
 * @param {string} cssText
 * @return {string}
 */
function removeCustomPropAssignment(cssText) {
  return cssText
    .replace(RX.customProp, '')
    .replace(RX.mixinProp, '');
}

/**
 * @param {string} cssText
 * @return {string}
 */
function removeCustomPropApply(cssText) {
  return cssText
    .replace(RX.mixinApply, '')
    .replace(RX.varApply, '');
}

/** @enum {number} */
const types = {
  STYLE_RULE: 1,
  KEYFRAMES_RULE: 7,
  MEDIA_RULE: 4,
  MIXIN_RULE: 1000
}
/* harmony export (immutable) */ __webpack_exports__["d"] = types;


const OPEN_BRACE = '{';
const CLOSE_BRACE = '}';

// helper regexp's
const RX = {
  comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
  port: /@import[^;]*;/gim,
  customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
  mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
  mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
  varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
  keyframesRule: /^@[^\s]*keyframes/,
  multipleSpaces: /\s+/g
}

const VAR_START = '--';
const MEDIA_START = '@media';
const AT_START = '@';


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_settings__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_parse__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_regex__ = __webpack_require__(6);
/* harmony export (immutable) */ __webpack_exports__["b"] = toCssText;
/* harmony export (immutable) */ __webpack_exports__["a"] = rulesForStyle;
/* harmony export (immutable) */ __webpack_exports__["i"] = isKeyframesSelector;
/* harmony export (immutable) */ __webpack_exports__["e"] = forEachRule;
/* harmony export (immutable) */ __webpack_exports__["c"] = applyCss;
/* unused harmony export createScopeStyle */
/* harmony export (immutable) */ __webpack_exports__["g"] = applyStylePlaceHolder;
/* harmony export (immutable) */ __webpack_exports__["j"] = applyStyle;
/* unused harmony export isTargetedBuild */
/* unused harmony export getCssBuildType */
/* harmony export (immutable) */ __webpack_exports__["h"] = processVariableAndFallback;
/* harmony export (immutable) */ __webpack_exports__["f"] = setElementClassRaw;
/* harmony export (immutable) */ __webpack_exports__["d"] = getIsExtends;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/




 // eslint-disable-line no-unused-vars


/**
 * @param {string|StyleNode} rules
 * @param {function(StyleNode)=} callback
 * @return {string}
 */
function toCssText (rules, callback) {
  if (!rules) {
    return '';
  }
  if (typeof rules === 'string') {
    rules = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__css_parse__["b" /* parse */])(rules);
  }
  if (callback) {
    forEachRule(rules, callback);
  }
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__css_parse__["c" /* stringify */])(rules, __WEBPACK_IMPORTED_MODULE_0__style_settings__["a" /* nativeCssVariables */]);
}

/**
 * @param {HTMLStyleElement} style
 * @return {StyleNode}
 */
function rulesForStyle(style) {
  if (!style['__cssRules'] && style.textContent) {
    style['__cssRules'] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__css_parse__["b" /* parse */])(style.textContent);
  }
  return style['__cssRules'] || null;
}

// Tests if a rule is a keyframes selector, which looks almost exactly
// like a normal selector but is not (it has nothing to do with scoping
// for example).
/**
 * @param {StyleNode} rule
 * @return {boolean}
 */
function isKeyframesSelector(rule) {
  return Boolean(rule['parent']) &&
  rule['parent']['type'] === __WEBPACK_IMPORTED_MODULE_1__css_parse__["d" /* types */].KEYFRAMES_RULE;
}

/**
 * @param {StyleNode} node
 * @param {Function=} styleRuleCallback
 * @param {Function=} keyframesRuleCallback
 * @param {boolean=} onlyActiveRules
 */
function forEachRule(node, styleRuleCallback, keyframesRuleCallback, onlyActiveRules) {
  if (!node) {
    return;
  }
  let skipRules = false;
  let type = node['type'];
  if (onlyActiveRules) {
    if (type === __WEBPACK_IMPORTED_MODULE_1__css_parse__["d" /* types */].MEDIA_RULE) {
      let matchMedia = node['selector'].match(__WEBPACK_IMPORTED_MODULE_2__common_regex__["a" /* MEDIA_MATCH */]);
      if (matchMedia) {
        // if rule is a non matching @media rule, skip subrules
        if (!window.matchMedia(matchMedia[1]).matches) {
          skipRules = true;
        }
      }
    }
  }
  if (type === __WEBPACK_IMPORTED_MODULE_1__css_parse__["d" /* types */].STYLE_RULE) {
    styleRuleCallback(node);
  } else if (keyframesRuleCallback &&
    type === __WEBPACK_IMPORTED_MODULE_1__css_parse__["d" /* types */].KEYFRAMES_RULE) {
    keyframesRuleCallback(node);
  } else if (type === __WEBPACK_IMPORTED_MODULE_1__css_parse__["d" /* types */].MIXIN_RULE) {
    skipRules = true;
  }
  let r$ = node['rules'];
  if (r$ && !skipRules) {
    for (let i=0, l=r$.length, r; (i<l) && (r=r$[i]); i++) {
      forEachRule(r, styleRuleCallback, keyframesRuleCallback, onlyActiveRules);
    }
  }
}

// add a string of cssText to the document.
/**
 * @param {string} cssText
 * @param {string} moniker
 * @param {Node} target
 * @param {Node} contextNode
 * @return {HTMLStyleElement}
 */
function applyCss(cssText, moniker, target, contextNode) {
  let style = createScopeStyle(cssText, moniker);
  applyStyle(style, target, contextNode);
  return style;
}

/**
 * @param {string} cssText
 * @param {string} moniker
 * @return {HTMLStyleElement}
 */
function createScopeStyle(cssText, moniker) {
  let style = /** @type {HTMLStyleElement} */(document.createElement('style'));
  if (moniker) {
    style.setAttribute('scope', moniker);
  }
  style.textContent = cssText;
  return style;
}

/**
 * Track the position of the last added style for placing placeholders
 * @type {Node}
 */
let lastHeadApplyNode = null;

// insert a comment node as a styling position placeholder.
/**
 * @param {string} moniker
 * @return {!Comment}
 */
function applyStylePlaceHolder(moniker) {
  let placeHolder = document.createComment(' Shady DOM styles for ' +
    moniker + ' ');
  let after = lastHeadApplyNode ?
    lastHeadApplyNode['nextSibling'] : null;
  let scope = document.head;
  scope.insertBefore(placeHolder, after || scope.firstChild);
  lastHeadApplyNode = placeHolder;
  return placeHolder;
}

/**
 * @param {HTMLStyleElement} style
 * @param {?Node} target
 * @param {?Node} contextNode
 */
function applyStyle(style, target, contextNode) {
  target = target || document.head;
  let after = (contextNode && contextNode.nextSibling) ||
    target.firstChild;
  target.insertBefore(style, after);
  if (!lastHeadApplyNode) {
    lastHeadApplyNode = style;
  } else {
    // only update lastHeadApplyNode if the new style is inserted after the old lastHeadApplyNode
    let position = style.compareDocumentPosition(lastHeadApplyNode);
    if (position === Node.DOCUMENT_POSITION_PRECEDING) {
      lastHeadApplyNode = style;
    }
  }
}

/**
 * @param {string} buildType
 * @return {boolean}
 */
function isTargetedBuild(buildType) {
  return __WEBPACK_IMPORTED_MODULE_0__style_settings__["b" /* nativeShadow */] ? buildType === 'shadow' : buildType === 'shady';
}

/**
 * @param {Element} element
 * @return {?string}
 */
function getCssBuildType(element) {
  return element.getAttribute('css-build');
}

/**
 * Walk from text[start] matching parens and
 * returns position of the outer end paren
 * @param {string} text
 * @param {number} start
 * @return {number}
 */
function findMatchingParen(text, start) {
  let level = 0;
  for (let i=start, l=text.length; i < l; i++) {
    if (text[i] === '(') {
      level++;
    } else if (text[i] === ')') {
      if (--level === 0) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * @param {string} str
 * @param {function(string, string, string, string)} callback
 */
function processVariableAndFallback(str, callback) {
  // find 'var('
  let start = str.indexOf('var(');
  if (start === -1) {
    // no var?, everything is prefix
    return callback(str, '', '', '');
  }
  //${prefix}var(${inner})${suffix}
  let end = findMatchingParen(str, start + 3);
  let inner = str.substring(start + 4, end);
  let prefix = str.substring(0, start);
  // suffix may have other variables
  let suffix = processVariableAndFallback(str.substring(end + 1), callback);
  let comma = inner.indexOf(',');
  // value and fallback args should be trimmed to match in property lookup
  if (comma === -1) {
    // variable, no fallback
    return callback(prefix, inner.trim(), '', suffix);
  }
  // var(${value},${fallback})
  let value = inner.substring(0, comma).trim();
  let fallback = inner.substring(comma + 1).trim();
  return callback(prefix, value, fallback, suffix);
}

/**
 * @param {Element} element
 * @param {string} value
 */
function setElementClassRaw(element, value) {
  // use native setAttribute provided by ShadyDOM when setAttribute is patched
  if (__WEBPACK_IMPORTED_MODULE_0__style_settings__["b" /* nativeShadow */]) {
    element.setAttribute('class', value);
  } else {
    window['ShadyDOM']['nativeMethods']['setAttribute'].call(element, 'class', value);
  }
}

/**
 * @param {Element | {is: string, extends: string}} element
 * @return {{is: string, typeExtension: string}}
 */
function getIsExtends(element) {
  let localName = element['localName'];
  let is = '', typeExtension = '';
  /*
  NOTE: technically, this can be wrong for certain svg elements
  with `-` in the name like `<font-face>`
  */
  if (localName) {
    if (localName.indexOf('-') > -1) {
      is = localName;
    } else {
      typeExtension = localName;
      is = (element.getAttribute && element.getAttribute('is')) || '';
    }
  } else {
    is = /** @type {?} */(element).is;
    typeExtension = /** @type {?} */(element).extends;
  }
  return {is, typeExtension};
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_parse__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_settings__ = __webpack_require__(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



 // eslint-disable-line no-unused-vars



/* Transforms ShadowDOM styling into ShadyDOM styling

* scoping:

  * elements in scope get scoping selector class="x-foo-scope"
  * selectors re-written as follows:

    div button -> div.x-foo-scope button.x-foo-scope

* :host -> scopeName

* :host(...) -> scopeName...

* ::slotted(...) -> scopeName > ...

* ...:dir(ltr|rtl) -> [dir="ltr|rtl"] ..., ...[dir="ltr|rtl"]

* :host(:dir[rtl]) -> scopeName:dir(rtl) -> [dir="rtl"] scopeName, scopeName[dir="rtl"]

*/
const SCOPE_NAME = 'style-scope';

class StyleTransformer {
  get SCOPE_NAME() {
    return SCOPE_NAME;
  }
  // Given a node and scope name, add a scoping class to each node
  // in the tree. This facilitates transforming css into scoped rules.
  dom(node, scope, shouldRemoveScope) {
    // one time optimization to skip scoping...
    if (node['__styleScoped']) {
      node['__styleScoped'] = null;
    } else {
      this._transformDom(node, scope || '', shouldRemoveScope);
    }
  }

  _transformDom(node, selector, shouldRemoveScope) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      this.element(node, selector, shouldRemoveScope);
    }
    let c$ = (node.localName === 'template') ?
      (node.content || node._content).childNodes :
      node.children || node.childNodes;
    if (c$) {
      for (let i=0; i<c$.length; i++) {
        this._transformDom(c$[i], selector, shouldRemoveScope);
      }
    }
  }

  element(element, scope, shouldRemoveScope) {
    // note: if using classes, we add both the general 'style-scope' class
    // as well as the specific scope. This enables easy filtering of all
    // `style-scope` elements
    if (scope) {
      // note: svg on IE does not have classList so fallback to class
      if (element.classList) {
        if (shouldRemoveScope) {
          element.classList.remove(SCOPE_NAME);
          element.classList.remove(scope);
        } else {
          element.classList.add(SCOPE_NAME);
          element.classList.add(scope);
        }
      } else if (element.getAttribute) {
        let c = element.getAttribute(CLASS);
        if (shouldRemoveScope) {
          if (c) {
            let newValue = c.replace(SCOPE_NAME, '').replace(scope, '');
            __WEBPACK_IMPORTED_MODULE_1__style_util__["f" /* setElementClassRaw */](element, newValue);
          }
        } else {
          let newValue = (c ? c + ' ' : '') + SCOPE_NAME + ' ' + scope;
          __WEBPACK_IMPORTED_MODULE_1__style_util__["f" /* setElementClassRaw */](element, newValue);
        }
      }
    }
  }

  elementStyles(element, styleRules, callback) {
    let cssBuildType = element['__cssBuild'];
    // no need to shim selectors if settings.useNativeShadow, also
    // a shady css build will already have transformed selectors
    // NOTE: This method may be called as part of static or property shimming.
    // When there is a targeted build it will not be called for static shimming,
    // but when the property shim is used it is called and should opt out of
    // static shimming work when a proper build exists.
    let cssText = '';
    if (__WEBPACK_IMPORTED_MODULE_2__style_settings__["b" /* nativeShadow */] || cssBuildType === 'shady') {
      cssText = __WEBPACK_IMPORTED_MODULE_1__style_util__["b" /* toCssText */](styleRules, callback);
    } else {
      let {is, typeExtension} = __WEBPACK_IMPORTED_MODULE_1__style_util__["d" /* getIsExtends */](element);
      cssText = this.css(styleRules, is, typeExtension, callback) + '\n\n';
    }
    return cssText.trim();
  }

  // Given a string of cssText and a scoping string (scope), returns
  // a string of scoped css where each selector is transformed to include
  // a class created from the scope. ShadowDOM selectors are also transformed
  // (e.g. :host) to use the scoping selector.
  css(rules, scope, ext, callback) {
    let hostScope = this._calcHostScope(scope, ext);
    scope = this._calcElementScope(scope);
    let self = this;
    return __WEBPACK_IMPORTED_MODULE_1__style_util__["b" /* toCssText */](rules, function(/** StyleNode */rule) {
      if (!rule.isScoped) {
        self.rule(rule, scope, hostScope);
        rule.isScoped = true;
      }
      if (callback) {
        callback(rule, scope, hostScope);
      }
    });
  }

  _calcElementScope(scope) {
    if (scope) {
      return CSS_CLASS_PREFIX + scope;
    } else {
      return '';
    }
  }

  _calcHostScope(scope, ext) {
    return ext ? `[is=${scope}]` : scope;
  }

  rule(rule, scope, hostScope) {
    this._transformRule(rule, this._transformComplexSelector,
      scope, hostScope);
  }

  /**
   * transforms a css rule to a scoped rule.
   *
   * @param {StyleNode} rule
   * @param {Function} transformer
   * @param {string=} scope
   * @param {string=} hostScope
   */
  _transformRule(rule, transformer, scope, hostScope) {
    // NOTE: save transformedSelector for subsequent matching of elements
    // against selectors (e.g. when calculating style properties)
    rule['selector'] = rule.transformedSelector =
      this._transformRuleCss(rule, transformer, scope, hostScope);
  }

  /**
   * @param {StyleNode} rule
   * @param {Function} transformer
   * @param {string=} scope
   * @param {string=} hostScope
   */
  _transformRuleCss(rule, transformer, scope, hostScope) {
    let p$ = rule['selector'].split(COMPLEX_SELECTOR_SEP);
    // we want to skip transformation of rules that appear in keyframes,
    // because they are keyframe selectors, not element selectors.
    if (!__WEBPACK_IMPORTED_MODULE_1__style_util__["i" /* isKeyframesSelector */](rule)) {
      for (let i=0, l=p$.length, p; (i<l) && (p=p$[i]); i++) {
        p$[i] = transformer.call(this, p, scope, hostScope);
      }
    }
    return p$.join(COMPLEX_SELECTOR_SEP);
  }

/**
 * @param {string} selector
 * @param {string} scope
 * @param {string=} hostScope
 */
  _transformComplexSelector(selector, scope, hostScope) {
    let stop = false;
    selector = selector.trim();
    // Remove spaces inside of selectors like `:nth-of-type` because it confuses SIMPLE_SELECTOR_SEP
    selector = selector.replace(NTH, (m, type, inner) => `:${type}(${inner.replace(/\s/g, '')})`);
    selector = selector.replace(SLOTTED_START, `${HOST} $1`);
    selector = selector.replace(SIMPLE_SELECTOR_SEP, (m, c, s) => {
      if (!stop) {
        let info = this._transformCompoundSelector(s, c, scope, hostScope);
        stop = stop || info.stop;
        c = info.combinator;
        s = info.value;
      }
      return c + s;
    });
    return selector;
  }

  _transformCompoundSelector(selector, combinator, scope, hostScope) {
    // replace :host with host scoping class
    let slottedIndex = selector.indexOf(SLOTTED);
    if (selector.indexOf(HOST) >= 0) {
      selector = this._transformHostSelector(selector, hostScope);
    // replace other selectors with scoping class
    } else if (slottedIndex !== 0) {
      selector = scope ? this._transformSimpleSelector(selector, scope) :
        selector;
    }
    // mark ::slotted() scope jump to replace with descendant selector + arg
    // also ignore left-side combinator
    let slotted = false;
    if (slottedIndex >= 0) {
      combinator = '';
      slotted = true;
    }
    // process scope jumping selectors up to the scope jump and then stop
    let stop;
    if (slotted) {
      stop = true;
      if (slotted) {
        // .zonk ::slotted(.foo) -> .zonk.scope > .foo
        selector = selector.replace(SLOTTED_PAREN, (m, paren) => ` > ${paren}`);
      }
    }
    selector = selector.replace(DIR_PAREN, (m, before, dir) =>
      `[dir="${dir}"] ${before}, ${before}[dir="${dir}"]`);
    return {value: selector, combinator, stop};
  }

  _transformSimpleSelector(selector, scope) {
    let p$ = selector.split(PSEUDO_PREFIX);
    p$[0] += scope;
    return p$.join(PSEUDO_PREFIX);
  }

  // :host(...) -> scopeName...
  _transformHostSelector(selector, hostScope) {
    let m = selector.match(HOST_PAREN);
    let paren = m && m[2].trim() || '';
    if (paren) {
      if (!paren[0].match(SIMPLE_SELECTOR_PREFIX)) {
        // paren starts with a type selector
        let typeSelector = paren.split(SIMPLE_SELECTOR_PREFIX)[0];
        // if the type selector is our hostScope then avoid pre-pending it
        if (typeSelector === hostScope) {
          return paren;
        // otherwise, this selector should not match in this scope so
        // output a bogus selector.
        } else {
          return SELECTOR_NO_MATCH;
        }
      } else {
        // make sure to do a replace here to catch selectors like:
        // `:host(.foo)::before`
        return selector.replace(HOST_PAREN, function(m, host, paren) {
          return hostScope + paren;
        });
      }
    // if no paren, do a straight :host replacement.
    // TODO(sorvell): this should not strictly be necessary but
    // it's needed to maintain support for `:host[foo]` type selectors
    // which have been improperly used under Shady DOM. This should be
    // deprecated.
    } else {
      return selector.replace(HOST, hostScope);
    }
  }

  /**
   * @param {StyleNode} rule
   */
  documentRule(rule) {
    // reset selector in case this is redone.
    rule['selector'] = rule['parsedSelector'];
    this.normalizeRootSelector(rule);
    this._transformRule(rule, this._transformDocumentSelector);
  }

  /**
   * @param {StyleNode} rule
   */
  normalizeRootSelector(rule) {
    if (rule['selector'] === ROOT) {
      rule['selector'] = 'html';
    }
  }

/**
 * @param {string} selector
 */
  _transformDocumentSelector(selector) {
    return selector.match(SLOTTED) ?
      this._transformComplexSelector(selector, SCOPE_DOC_SELECTOR) :
      this._transformSimpleSelector(selector.trim(), SCOPE_DOC_SELECTOR);
  }
}

let NTH = /:(nth[-\w]+)\(([^)]+)\)/;
let SCOPE_DOC_SELECTOR = `:not(.${SCOPE_NAME})`;
let COMPLEX_SELECTOR_SEP = ',';
let SIMPLE_SELECTOR_SEP = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g;
let SIMPLE_SELECTOR_PREFIX = /[[.:#*]/;
let HOST = ':host';
let ROOT = ':root';
let SLOTTED = '::slotted';
let SLOTTED_START = new RegExp(`^(${SLOTTED})`);
// NOTE: this supports 1 nested () pair for things like
// :host(:not([selected]), more general support requires
// parsing which seems like overkill
let HOST_PAREN = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/;
// similar to HOST_PAREN
let SLOTTED_PAREN = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/;
let DIR_PAREN = /(.*):dir\((?:(ltr|rtl))\)/;
let CSS_CLASS_PREFIX = '.';
let PSEUDO_PREFIX = ':';
let CLASS = 'class';
let SELECTOR_NO_MATCH = 'should_not_match';

/* harmony default export */ __webpack_exports__["a"] = new StyleTransformer();

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

const VAR_ASSIGN = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:([^;{]*)|{([^}]*)})(?:(?=[;\s}])|$)/gi;
/* harmony export (immutable) */ __webpack_exports__["b"] = VAR_ASSIGN;

const MIXIN_MATCH = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi;
/* harmony export (immutable) */ __webpack_exports__["e"] = MIXIN_MATCH;

const VAR_CONSUMED = /(--[\w-]+)\s*([:,;)]|$)/gi;
/* harmony export (immutable) */ __webpack_exports__["d"] = VAR_CONSUMED;

const ANIMATION_MATCH = /(animation\s*:)|(animation-name\s*:)/;
/* harmony export (immutable) */ __webpack_exports__["f"] = ANIMATION_MATCH;

const MEDIA_MATCH = /@media[^(]*(\([^)]*\))/;
/* harmony export (immutable) */ __webpack_exports__["a"] = MEDIA_MATCH;

const IS_VAR = /^--/;
/* unused harmony export IS_VAR */

const BRACKETED = /\{[^}]*\}/g;
/* harmony export (immutable) */ __webpack_exports__["c"] = BRACKETED;

const HOST_PREFIX = '(?:^|[^.#[:])';
/* harmony export (immutable) */ __webpack_exports__["g"] = HOST_PREFIX;

const HOST_SUFFIX = '($|[.:[\\s>+~])';
/* harmony export (immutable) */ __webpack_exports__["h"] = HOST_SUFFIX;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = documentWait;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/** @type {Promise<void>} */
let readyPromise = null;

/** @type {?function(?function())} */
let whenReady = window['HTMLImports'] && window['HTMLImports']['whenReady'] || null;

/** @type {function()} */
let resolveFn;

/**
 * @param {?function()} callback
 */
function documentWait(callback) {
  if (whenReady) {
    whenReady(callback)
  } else {
    if (!readyPromise) {
      readyPromise = new Promise((resolve) => {resolveFn = resolve});
      if (document.readyState === 'complete') {
        resolveFn();
      } else {
        document.addEventListener('readystatechange', () => {
          if (document.readyState === 'complete') {
            resolveFn();
          }
        });
      }
    }
    readyPromise.then(function(){ callback && callback(); });
  }
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_parse__ = __webpack_require__(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



 // eslint-disable-line no-unused-vars

/** @const {string} */
const infoKey = '__styleInfo';

class StyleInfo {
  /**
   * @param {Element} node
   * @return {StyleInfo}
   */
  static get(node) {
    if (node) {
      return node[infoKey];
    } else {
      return null;
    }
  }
  /**
   * @param {!Element} node
   * @param {StyleInfo} styleInfo
   * @return {StyleInfo}
   */
  static set(node, styleInfo) {
    node[infoKey] = styleInfo;
    return styleInfo;
  }
  /**
   * @param {StyleNode} ast
   * @param {Node=} placeholder
   * @param {Array<string>=} ownStylePropertyNames
   * @param {string=} elementName
   * @param {string=} typeExtension
   * @param {string=} cssBuild
   */
  constructor(ast, placeholder, ownStylePropertyNames, elementName, typeExtension, cssBuild) {
    /** @type {StyleNode} */
    this.styleRules = ast || null;
    /** @type {Node} */
    this.placeholder = placeholder || null;
    /** @type {!Array<string>} */
    this.ownStylePropertyNames = ownStylePropertyNames || [];
    /** @type {Array<Object>} */
    this.overrideStyleProperties = null;
    /** @type {string} */
    this.elementName = elementName || '';
    /** @type {string} */
    this.cssBuild = cssBuild || '';
    /** @type {string} */
    this.typeExtension = typeExtension || '';
    /** @type {Object<string, string>} */
    this.styleProperties = null;
    /** @type {?string} */
    this.scopeSelector = null;
    /** @type {HTMLStyleElement} */
    this.customStyle = null;
  }
  _getStyleRules() {
    return this.styleRules;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StyleInfo;


StyleInfo.prototype['_getStyleRules'] = StyleInfo.prototype._getStyleRules;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/**
 * @const {!Object<string, !HTMLTemplateElement>}
 */
const templateMap = {};
/* harmony default export */ __webpack_exports__["a"] = templateMap;


/***/ }),
/* 10 */
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

    document.addEventListener(LoadAvatar.TYPE, e => {
      let url = this.template.replace(':user', e.user);
      e.element.setAttribute('url', url);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AvatarService;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listings__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__listing__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__footer__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__org__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__github_avatar__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pie_brand__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__progress_bar__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__catalog_container__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__client__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__avatar_service__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_9__client__["a"]; });
__webpack_require__(24);

let define = (name, prototype) => {
  if (!('customElements' in window)) {
    throw new Error('customElements isnt defined');
  }

  if (typeof customElements.define !== 'function') {
    throw new Error('customElements.define is not defined');
  }
  return customElements.define(name, prototype)
}


define('catalog-listings', __WEBPACK_IMPORTED_MODULE_0__listings__["a" /* default */]);


define('catalog-listing', __WEBPACK_IMPORTED_MODULE_1__listing__["a" /* default */]);


define('catalog-header', __WEBPACK_IMPORTED_MODULE_2__header__["a" /* default */]);


define('catalog-footer', __WEBPACK_IMPORTED_MODULE_3__footer__["a" /* default */]);


define('catalog-org', __WEBPACK_IMPORTED_MODULE_4__org__["a" /* default */]);


define('github-avatar', __WEBPACK_IMPORTED_MODULE_5__github_avatar__["a" /* default */]);


define('pie-brand', __WEBPACK_IMPORTED_MODULE_6__pie_brand__["a" /* default */]);


define('progress-bar', __WEBPACK_IMPORTED_MODULE_7__progress_bar__["a" /* default */]);


define('catalog-container', __WEBPACK_IMPORTED_MODULE_8__catalog_container__["a" /* default */]);




define('avatar-service', __WEBPACK_IMPORTED_MODULE_10__avatar_service__["a" /* default */]);





/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_scoping_shim__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_style_settings__ = __webpack_require__(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/






/** @const {ScopingShim} */
const scopingShim = new __WEBPACK_IMPORTED_MODULE_0__src_scoping_shim__["a" /* default */]();

let ApplyShim, CustomStyleInterface;

if (window['ShadyCSS']) {
  ApplyShim = window['ShadyCSS']['ApplyShim'];
  CustomStyleInterface = window['ShadyCSS']['CustomStyleInterface'];
}

window.ShadyCSS = {
  ScopingShim: scopingShim,
  /**
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   * @param {string=} elementExtends
   */
  prepareTemplate(template, elementName, elementExtends) {
    scopingShim.flushCustomStyles();
    scopingShim.prepareTemplate(template, elementName, elementExtends)
  },

  /**
   * @param {!HTMLElement} element
   * @param {Object=} properties
   */
  styleSubtree(element, properties) {
    scopingShim.flushCustomStyles();
    scopingShim.styleSubtree(element, properties);
  },

  /**
   * @param {!HTMLElement} element
   */
  styleElement(element) {
    scopingShim.flushCustomStyles();
    scopingShim.styleElement(element);
  },

  /**
   * @param {Object=} properties
   */
  styleDocument(properties) {
    scopingShim.flushCustomStyles();
    scopingShim.styleDocument(properties);
  },

  /**
   * @param {Element} element
   * @param {string} property
   * @return {string}
   */
  getComputedStyleValue(element, property) {
    return scopingShim.getComputedStyleValue(element, property);
  },

  nativeCss: __WEBPACK_IMPORTED_MODULE_1__src_style_settings__["a" /* nativeCssVariables */],

  nativeShadow: __WEBPACK_IMPORTED_MODULE_1__src_style_settings__["b" /* nativeShadow */]
};

if (ApplyShim) {
  window.ShadyCSS.ApplyShim = ApplyShim;
}

if (CustomStyleInterface) {
  window.ShadyCSS.CustomStyleInterface = CustomStyleInterface;
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_parse__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = invalidate;
/* unused harmony export invalidateTemplate */
/* unused harmony export isValid */
/* harmony export (immutable) */ __webpack_exports__["b"] = templateIsValid;
/* unused harmony export isValidating */
/* harmony export (immutable) */ __webpack_exports__["c"] = templateIsValidating;
/* unused harmony export startValidating */
/* harmony export (immutable) */ __webpack_exports__["d"] = startValidatingTemplate;
/* unused harmony export elementsAreInvalid */
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



 // eslint-disable-line no-unused-vars

/**
 * @const {Promise<void>}
 */
const promise = Promise.resolve();

/**
 * @param {string} elementName
 */
function invalidate(elementName){
  let template = __WEBPACK_IMPORTED_MODULE_0__template_map__["a" /* default */][elementName];
  if (template) {
    invalidateTemplate(template);
  }
}

/**
 * @param {HTMLTemplateElement} template
 */
function invalidateTemplate(template) {
  template['_applyShimInvalid'] = true;
}

/**
 * @param {string} elementName
 * @return {boolean}
 */
function isValid(elementName) {
  let template = __WEBPACK_IMPORTED_MODULE_0__template_map__["a" /* default */][elementName];
  if (template) {
    return templateIsValid(template);
  }
  return true;
}

/**
 * @param {HTMLTemplateElement} template
 * @return {boolean}
 */
function templateIsValid(template) {
  return !template['_applyShimInvalid'];
}

/**
 * @param {string} elementName
 * @return {boolean}
 */
function isValidating(elementName) {
  let template = __WEBPACK_IMPORTED_MODULE_0__template_map__["a" /* default */][elementName];
  if (template) {
    return templateIsValidating(template);
  }
  return false;
}

/**
 * @param {HTMLTemplateElement} template
 * @return {boolean}
 */
function templateIsValidating(template) {
  return template._validating;
}

/**
 * the template is marked as `validating` for one microtask so that all instances
 * found in the tree crawl of `applyStyle` will update themselves,
 * but the template will only be updated once.
 * @param {string} elementName
*/
function startValidating(elementName) {
  let template = __WEBPACK_IMPORTED_MODULE_0__template_map__["a" /* default */][elementName];
  startValidatingTemplate(template);
}

/**
 * @param {HTMLTemplateElement} template
 */
function startValidatingTemplate(template) {
  if (!template._validating) {
    template._validating = true;
    promise.then(function() {
      template['_applyShimInvalid'] = false;
      template._validating = false;
    });
  }
}

/**
 * @return {boolean}
 */
function elementsAreInvalid() {
  for (let elementName in __WEBPACK_IMPORTED_MODULE_0__template_map__["a" /* default */]) {
    let template = __WEBPACK_IMPORTED_MODULE_0__template_map__["a" /* default */][elementName];
    if (!templateIsValid(template)) {
      return true;
    }
  }
  return false;
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = updateNativeProperties;
/* unused harmony export getComputedStyleValue */
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/**
 * @param {Element} element
 * @param {Object=} properties
 */
function updateNativeProperties(element, properties) {
  // remove previous properties
  for (let p in properties) {
    // NOTE: for bc with shim, don't apply null values.
    if (p === null) {
      element.style.removeProperty(p);
    } else {
      element.style.setProperty(p, properties[p]);
    }
  }
}

/**
 * @param {Element} element
 * @param {string} property
 * @return {string}
 */
function getComputedStyleValue(element, property) {
  /**
   * @const {string}
   */
  const value = window.getComputedStyle(element).getPropertyValue(property);
  if (!value) {
    return '';
  } else {
    return value.trim();
  }
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__document_wait__ = __webpack_require__(7);
/* unused harmony export CustomStyleProvider */
/* unused harmony export CustomStyleInterfaceInterface */
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





/**
 * @typedef {HTMLStyleElement | {getStyle: function():HTMLStyleElement}}
 */
let CustomStyleProvider;

const SEEN_MARKER = '__seenByShadyCSS';
const CACHED_STYLE = '__shadyCSSCachedStyle';

/** @type {?function(!HTMLStyleElement)} */
let transformFn = null;

/** @type {?function()} */
let validateFn = null;

/**
This interface is provided to add document-level <style> elements to ShadyCSS for processing.
These styles must be processed by ShadyCSS to simulate ShadowRoot upper-bound encapsulation from outside styles
In addition, these styles may also need to be processed for @apply rules and CSS Custom Properties

To add document-level styles to ShadyCSS, one can call `ShadyCSS.addDocumentStyle(styleElement)` or `ShadyCSS.addDocumentStyle({getStyle: () => styleElement})`

In addition, if the process used to discover document-level styles can be synchronously flushed, one should set `ShadyCSS.documentStyleFlush`.
This function will be called when calculating styles.

An example usage of the document-level styling api can be found in `examples/document-style-lib.js`

@unrestricted
*/
class CustomStyleInterface {
  constructor() {
    /** @type {!Array<!CustomStyleProvider>} */
    this['customStyles'] = [];
    this['enqueued'] = false;
  }
  /**
   * Queue a validation for new custom styles to batch style recalculations
   */
  enqueueDocumentValidation() {
    if (this['enqueued'] || !validateFn) {
      return;
    }
    this['enqueued'] = true;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__document_wait__["a" /* default */])(validateFn);
  }
  /**
   * @param {!HTMLStyleElement} style
   */
  addCustomStyle(style) {
    if (!style[SEEN_MARKER]) {
      style[SEEN_MARKER] = true;
      this['customStyles'].push(style);
      this.enqueueDocumentValidation();
    }
  }
  /**
   * @param {!CustomStyleProvider} customStyle
   * @return {HTMLStyleElement}
   */
  getStyleForCustomStyle(customStyle) {
    if (customStyle[CACHED_STYLE]) {
      return customStyle[CACHED_STYLE];
    }
    let style;
    if (customStyle['getStyle']) {
      style = customStyle['getStyle']();
    } else {
      style = customStyle;
    }
    return style;
  }
  /**
   * @return {!Array<!CustomStyleProvider>}
   */
  processStyles() {
    let cs = this['customStyles'];
    for (let i = 0; i < cs.length; i++) {
      let customStyle = cs[i];
      if (customStyle[CACHED_STYLE]) {
        continue;
      }
      let style = this.getStyleForCustomStyle(customStyle);
      if (style) {
        // HTMLImports polyfill may have cloned the style into the main document,
        // which is referenced with __appliedElement.
        // Also, we must copy over the attributes.
        let appliedStyle = /** @type {HTMLStyleElement} */(style['__appliedElement']);
        if (appliedStyle) {
          for (let i = 0; i < style.attributes.length; i++) {
            let attr = style.attributes[i];
            appliedStyle.setAttribute(attr.name, attr.value);
          }
        }
        let styleToTransform = appliedStyle || style;
        if (transformFn) {
          transformFn(styleToTransform);
        }
        customStyle[CACHED_STYLE] = styleToTransform;
      }
    }
    return cs;
  }
}
/* unused harmony export default */


CustomStyleInterface.prototype['addCustomStyle'] = CustomStyleInterface.prototype.addCustomStyle;
CustomStyleInterface.prototype['getStyleForCustomStyle'] = CustomStyleInterface.prototype.getStyleForCustomStyle;
CustomStyleInterface.prototype['processStyles'] = CustomStyleInterface.prototype.processStyles;

Object.defineProperties(CustomStyleInterface.prototype, {
  'transformCallback': {
    /** @return {?function(!HTMLStyleElement)} */
    get() {
      return transformFn;
    },
    /** @param {?function(!HTMLStyleElement)} fn */
    set(fn) {
      transformFn = fn;
    }
  },
  'validateCallback': {
    /** @return {?function()} */
    get() {
      return validateFn;
    },
    /**
     * @param {?function()} fn
     * @this {CustomStyleInterface}
     */
    set(fn) {
      let needsEnqueue = false;
      if (!validateFn) {
        needsEnqueue = true;
      }
      validateFn = fn;
      if (needsEnqueue) {
        this.enqueueDocumentValidation();
      }
    },
  }
})

/** @typedef {{
 * customStyles: !Array<!CustomStyleProvider>,
 * addCustomStyle: function(!CustomStyleProvider),
 * getStyleForCustomStyle: function(!CustomStyleProvider): HTMLStyleElement,
 * findStyles: function(),
 * transformCallback: ?function(!HTMLStyleElement),
 * validateCallback: ?function()
 * }}
 */
let CustomStyleInterfaceInterface;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_settings__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_transformer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_util__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return flush; });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/







let flush = function() {};

if (!__WEBPACK_IMPORTED_MODULE_0__style_settings__["b" /* nativeShadow */]) {
  let elementNeedsScoping = (element) => {
    return (element.classList &&
      !element.classList.contains(__WEBPACK_IMPORTED_MODULE_1__style_transformer__["a" /* default */].SCOPE_NAME) ||
      // note: necessary for IE11
      (element instanceof window['SVGElement'] && (!element.hasAttribute('class') ||
      element.getAttribute('class').indexOf(__WEBPACK_IMPORTED_MODULE_1__style_transformer__["a" /* default */].SCOPE_NAME) < 0)));
  }

/**
 * @param {Array<MutationRecord|null>|null} mxns
 */
  let handler = (mxns) => {
    for (let x=0; x < mxns.length; x++) {
      let mxn = mxns[x];
      if (mxn.target === document.documentElement ||
        mxn.target === document.head) {
        continue;
      }
      for (let i=0; i < mxn.addedNodes.length; i++) {
        let n = mxn.addedNodes[i];
        if (elementNeedsScoping(n)) {
          let root = n.getRootNode();
          if (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            // may no longer be in a shadowroot
            let host = /** @type {ShadowRoot} */(root).host;
            if (host) {
              let {is: scope} = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__style_util__["d" /* getIsExtends */])(host);
              __WEBPACK_IMPORTED_MODULE_1__style_transformer__["a" /* default */].dom(n, scope);
            }
          }
        }
      }
      for (let i=0; i < mxn.removedNodes.length; i++) {
        let n = /** @type {HTMLElement} */(mxn.removedNodes[i]);
        if (n.nodeType === Node.ELEMENT_NODE) {
          let classes = undefined;
          if (n.classList) {
            classes = Array.from(n.classList);
          } else if (n.hasAttribute('class')) {
            classes = n.getAttribute('class').split(/\s+/);
          }
          if (classes !== undefined) {
            // NOTE: relies on the scoping class always being adjacent to the
            // SCOPE_NAME class.
            let classIdx = classes.indexOf(__WEBPACK_IMPORTED_MODULE_1__style_transformer__["a" /* default */].SCOPE_NAME);
            if (classIdx >= 0) {
              let scope = classes[classIdx + 1];
              if (scope) {
                __WEBPACK_IMPORTED_MODULE_1__style_transformer__["a" /* default */].dom(n, scope, true);
              }
            }
          }
        }
      }
    }
  };

  let observer = new MutationObserver(handler);
  let start = (node) => {
    observer.observe(node, {childList: true, subtree: true});
  }
  let nativeCustomElements = (window.customElements &&
    !window['customElements']['flush']);
  // need to start immediately with native custom elements
  // TODO(dfreedm): with polyfilled HTMLImports and native custom elements
  // excessive mutations may be observed; this can be optimized via cooperation
  // with the HTMLImports polyfill.
  if (nativeCustomElements) {
    start(document);
  } else {
    let delayedStart = () => {
      start(document.body);
    }
    // use polyfill timing if it's available
    if (window['HTMLImports']) {
      window['HTMLImports']['whenReady'](delayedStart);
    // otherwise push beyond native imports being ready
    // which requires RAF + readystate interactive.
    } else {
      requestAnimationFrame(function() {
        if (document.readyState === 'loading') {
          let listener = function() {
            delayedStart();
            document.removeEventListener('readystatechange', listener);
          }
          document.addEventListener('readystatechange', listener);
        } else {
          delayedStart();
        }
      });
    }
  }

  flush = function() {
    handler(observer.takeRecords());
  }
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_parse__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_settings__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_transformer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_properties__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__style_placeholder__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_info__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__style_cache__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__document_watcher__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__template_map__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__apply_shim_utils__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__document_wait__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__common_utils__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__custom_style_interface__ = __webpack_require__(15);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
















 //eslint-disable-line no-unused-vars

/**
 * @const {StyleCache}
 */
const styleCache = new __WEBPACK_IMPORTED_MODULE_7__style_cache__["a" /* default */]();

class ScopingShim {
  constructor() {
    this._scopeCounter = {};
    this._documentOwner = document.documentElement;
    let ast = new __WEBPACK_IMPORTED_MODULE_0__css_parse__["a" /* StyleNode */]();
    ast['rules'] = [];
    this._documentOwnerStyleInfo = __WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */].set(this._documentOwner, new __WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */](ast));
    this._elementsHaveApplied = false;
    this._applyShim = null;
    /** @type {?CustomStyleInterfaceInterface} */
    this._customStyleInterface = null;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__document_wait__["a" /* default */])(() => {
      this._ensure();
    });
  }
  flush() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__document_watcher__["a" /* flush */])();
  }
  _generateScopeSelector(name) {
    let id = this._scopeCounter[name] = (this._scopeCounter[name] || 0) + 1;
    return `${name}-${id}`;
  }
  getStyleAst(style) {
    return __WEBPACK_IMPORTED_MODULE_3__style_util__["a" /* rulesForStyle */](style);
  }
  styleAstToString(ast) {
    return __WEBPACK_IMPORTED_MODULE_3__style_util__["b" /* toCssText */](ast);
  }
  _gatherStyles(template) {
    let styles = template.content.querySelectorAll('style');
    let cssText = [];
    for (let i = 0; i < styles.length; i++) {
      let s = styles[i];
      cssText.push(s.textContent);
      s.parentNode.removeChild(s);
    }
    return cssText.join('').trim();
  }
  _getCssBuild(template) {
    let style = template.content.querySelector('style');
    if (!style) {
      return '';
    }
    return style.getAttribute('css-build') || '';
  }
  /**
   * Prepare the styling and template for the given element type
   *
   * @param {HTMLTemplateElement} template
   * @param {string} elementName
   * @param {string=} typeExtension
   */
  prepareTemplate(template, elementName, typeExtension) {
    if (template._prepared) {
      return;
    }
    template._prepared = true;
    template.name = elementName;
    template.extends = typeExtension;
    __WEBPACK_IMPORTED_MODULE_9__template_map__["a" /* default */][elementName] = template;
    let cssBuild = this._getCssBuild(template);
    let cssText = this._gatherStyles(template);
    let info = {
      is: elementName,
      extends: typeExtension,
      __cssBuild: cssBuild,
    };
    if (!__WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */]) {
      __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */].dom(template.content, elementName);
    }
    // check if the styling has mixin definitions or uses
    this._ensure();
    let hasMixins = this._applyShim['detectMixin'](cssText);
    let ast = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__css_parse__["b" /* parse */])(cssText);
    // only run the applyshim transforms if there is a mixin involved
    if (hasMixins && __WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
      this._applyShim['transformRules'](ast, elementName);
    }
    template['_styleAst'] = ast;
    template._cssBuild = cssBuild;

    let ownPropertyNames = [];
    if (!__WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
      ownPropertyNames = __WEBPACK_IMPORTED_MODULE_4__style_properties__["a" /* default */].decorateStyles(template['_styleAst'], info);
    }
    if (!ownPropertyNames.length || __WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
      let root = __WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */] ? template.content : null;
      let placeholder = __WEBPACK_IMPORTED_MODULE_5__style_placeholder__["a" /* default */][elementName];
      let style = this._generateStaticStyle(info, template['_styleAst'], root, placeholder);
      template._style = style;
    }
    template._ownPropertyNames = ownPropertyNames;
  }
  _generateStaticStyle(info, rules, shadowroot, placeholder) {
    let cssText = __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */].elementStyles(info, rules);
    if (cssText.length) {
      return __WEBPACK_IMPORTED_MODULE_3__style_util__["c" /* applyCss */](cssText, info.is, shadowroot, placeholder);
    }
  }
  _prepareHost(host) {
    let {is, typeExtension} = __WEBPACK_IMPORTED_MODULE_3__style_util__["d" /* getIsExtends */](host);
    let placeholder = __WEBPACK_IMPORTED_MODULE_5__style_placeholder__["a" /* default */][is];
    let template = __WEBPACK_IMPORTED_MODULE_9__template_map__["a" /* default */][is];
    let ast;
    let ownStylePropertyNames;
    let cssBuild;
    if (template) {
      ast = template['_styleAst'];
      ownStylePropertyNames = template._ownPropertyNames;
      cssBuild = template._cssBuild;
    }
    return __WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */].set(host,
      new __WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */](
        ast,
        placeholder,
        ownStylePropertyNames,
        is,
        typeExtension,
        cssBuild
      )
    );
  }
  _ensureApplyShim() {
    if (this._applyShim) {
      return;
    } else if (window.ShadyCSS.ApplyShim) {
      this._applyShim = window.ShadyCSS.ApplyShim;
      this._applyShim['invalidCallback'] = __WEBPACK_IMPORTED_MODULE_10__apply_shim_utils__["a" /* invalidate */];
    } else {
      this._applyShim = {
        /* eslint-disable no-unused-vars */
        ['detectMixin'](str){return false},
        ['transformRule'](ast){},
        ['transformRules'](ast, name){},
        /* eslint-enable no-unused-vars */
      }
    }
  }
  _ensureCustomStyleInterface() {
    if (this._customStyleInterface) {
      return;
    } else if (window.ShadyCSS.CustomStyleInterface) {
      this._customStyleInterface = /** @type {!CustomStyleInterfaceInterface} */(window.ShadyCSS.CustomStyleInterface);
      /** @type {function(!HTMLStyleElement)} */
      this._customStyleInterface['transformCallback'] = (style) => {this.transformCustomStyleForDocument(style)};
      this._customStyleInterface['validateCallback'] = () => {
        requestAnimationFrame(() => {
          if (this._customStyleInterface['enqueued'] || this._elementsHaveApplied) {
            this.flushCustomStyles();
          }
        })
      };
    } else {
      this._customStyleInterface = /** @type {!CustomStyleInterfaceInterface} */({
        ['processStyles']() {},
        ['enqueued']: false,
        ['getStyleForCustomStyle'](s) { return null } // eslint-disable-line no-unused-vars
      })
    }
  }
  _ensure() {
    this._ensureApplyShim();
    this._ensureCustomStyleInterface();
  }
  /**
   * Flush and apply custom styles to document
   */
  flushCustomStyles() {
    this._ensure();
    let customStyles = this._customStyleInterface['processStyles']();
    // early return if custom-styles don't need validation
    if (!this._customStyleInterface['enqueued']) {
      return;
    }
    if (!__WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
      this._updateProperties(this._documentOwner, this._documentOwnerStyleInfo);
      this._applyCustomStyles(customStyles);
    } else {
      this._revalidateCustomStyleApplyShim(customStyles);
    }
    this._customStyleInterface['enqueued'] = false;
    // if custom elements have upgraded and there are no native css variables, we must recalculate the whole tree
    if (this._elementsHaveApplied && !__WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
      this.styleDocument();
    }
  }
  /**
   * Apply styles for the given element
   *
   * @param {!HTMLElement} host
   * @param {Object=} overrideProps
   */
  styleElement(host, overrideProps) {
    let {is} = __WEBPACK_IMPORTED_MODULE_3__style_util__["d" /* getIsExtends */](host);
    let styleInfo = __WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */].get(host);
    if (!styleInfo) {
      styleInfo = this._prepareHost(host);
    }
    // Only trip the `elementsHaveApplied` flag if a node other that the root document has `applyStyle` called
    if (!this._isRootOwner(host)) {
      this._elementsHaveApplied = true;
    }
    if (overrideProps) {
      styleInfo.overrideStyleProperties =
        styleInfo.overrideStyleProperties || {};
      Object.assign(styleInfo.overrideStyleProperties, overrideProps);
    }
    if (!__WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
     this._updateProperties(host, styleInfo);
      if (styleInfo.ownStylePropertyNames && styleInfo.ownStylePropertyNames.length) {
        this._applyStyleProperties(host, styleInfo);
      }
    } else {
      if (styleInfo.overrideStyleProperties) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__common_utils__["a" /* updateNativeProperties */])(host, styleInfo.overrideStyleProperties);
      }
      let template = __WEBPACK_IMPORTED_MODULE_9__template_map__["a" /* default */][is];
      // bail early if there is no shadowroot for this element
      if (!template && !this._isRootOwner(host)) {
        return;
      }
      if (template && template._style && !__WEBPACK_IMPORTED_MODULE_10__apply_shim_utils__["b" /* templateIsValid */](template)) {
        // update template
        if (!__WEBPACK_IMPORTED_MODULE_10__apply_shim_utils__["c" /* templateIsValidating */](template)) {
          this._ensure();
          this._applyShim['transformRules'](template['_styleAst'], is);
          template._style.textContent = __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */].elementStyles(host, styleInfo.styleRules);
          __WEBPACK_IMPORTED_MODULE_10__apply_shim_utils__["d" /* startValidatingTemplate */](template);
        }
        // update instance if native shadowdom
        if (__WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */]) {
          let root = host.shadowRoot;
          if (root) {
            let style = root.querySelector('style');
            style.textContent = __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */].elementStyles(host, styleInfo.styleRules);
          }
        }
        styleInfo.styleRules = template['_styleAst'];
      }
    }
  }
  _styleOwnerForNode(node) {
    let root = node.getRootNode();
    let host = root.host;
    if (host) {
      if (__WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */].get(host)) {
        return host;
      } else {
        return this._styleOwnerForNode(host);
      }
    }
    return this._documentOwner;
  }
  _isRootOwner(node) {
    return (node === this._documentOwner);
  }
  _applyStyleProperties(host, styleInfo) {
    let is = __WEBPACK_IMPORTED_MODULE_3__style_util__["d" /* getIsExtends */](host).is;
    let cacheEntry = styleCache.fetch(is, styleInfo.styleProperties, styleInfo.ownStylePropertyNames);
    let cachedScopeSelector = cacheEntry && cacheEntry.scopeSelector;
    let cachedStyle = cacheEntry ? cacheEntry.styleElement : null;
    let oldScopeSelector = styleInfo.scopeSelector;
    // only generate new scope if cached style is not found
    styleInfo.scopeSelector = cachedScopeSelector || this._generateScopeSelector(is);
    let style = __WEBPACK_IMPORTED_MODULE_4__style_properties__["a" /* default */].applyElementStyle(host, styleInfo.styleProperties, styleInfo.scopeSelector, cachedStyle);
    if (!__WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */]) {
      __WEBPACK_IMPORTED_MODULE_4__style_properties__["a" /* default */].applyElementScopeSelector(host, styleInfo.scopeSelector, oldScopeSelector);
    }
    if (!cacheEntry) {
      styleCache.store(is, styleInfo.styleProperties, style, styleInfo.scopeSelector);
    }
    return style;
  }
  _updateProperties(host, styleInfo) {
    let owner = this._styleOwnerForNode(host);
    let ownerStyleInfo = __WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */].get(owner);
    let ownerProperties = ownerStyleInfo.styleProperties;
    let props = Object.create(ownerProperties || null);
    let hostAndRootProps = __WEBPACK_IMPORTED_MODULE_4__style_properties__["a" /* default */].hostAndRootPropertiesForScope(host, styleInfo.styleRules);
    let propertyData = __WEBPACK_IMPORTED_MODULE_4__style_properties__["a" /* default */].propertyDataFromStyles(ownerStyleInfo.styleRules, host);
    let propertiesMatchingHost = propertyData.properties
    Object.assign(
      props,
      hostAndRootProps.hostProps,
      propertiesMatchingHost,
      hostAndRootProps.rootProps
    );
    this._mixinOverrideStyles(props, styleInfo.overrideStyleProperties);
    __WEBPACK_IMPORTED_MODULE_4__style_properties__["a" /* default */].reify(props);
    styleInfo.styleProperties = props;
  }
  _mixinOverrideStyles(props, overrides) {
    for (let p in overrides) {
      let v = overrides[p];
      // skip override props if they are not truthy or 0
      // in order to fall back to inherited values
      if (v || v === 0) {
        props[p] = v;
      }
    }
  }
  /**
   * Update styles of the whole document
   *
   * @param {Object=} properties
   */
  styleDocument(properties) {
    this.styleSubtree(this._documentOwner, properties);
  }
  /**
   * Update styles of a subtree
   *
   * @param {!HTMLElement} host
   * @param {Object=} properties
   */
  styleSubtree(host, properties) {
    let root = host.shadowRoot;
    if (root || this._isRootOwner(host)) {
      this.styleElement(host, properties);
    }
    // process the shadowdom children of `host`
    let shadowChildren = root && (root.children || root.childNodes);
    if (shadowChildren) {
      for (let i = 0; i < shadowChildren.length; i++) {
        let c = /** @type {!HTMLElement} */(shadowChildren[i]);
        this.styleSubtree(c);
      }
    } else {
      // process the lightdom children of `host`
      let children = host.children || host.childNodes;
      if (children) {
        for (let i = 0; i < children.length; i++) {
          let c = /** @type {!HTMLElement} */(children[i]);
          this.styleSubtree(c);
        }
      }
    }
  }
  /* Custom Style operations */
  _revalidateCustomStyleApplyShim(customStyles) {
    for (let i = 0; i < customStyles.length; i++) {
      let c = customStyles[i];
      let s = this._customStyleInterface['getStyleForCustomStyle'](c);
      if (s) {
        this._revalidateApplyShim(s);
      }
    }
  }
  _applyCustomStyles(customStyles) {
    for (let i = 0; i < customStyles.length; i++) {
      let c = customStyles[i];
      let s = this._customStyleInterface['getStyleForCustomStyle'](c);
      if (s) {
        __WEBPACK_IMPORTED_MODULE_4__style_properties__["a" /* default */].applyCustomStyle(s, this._documentOwnerStyleInfo.styleProperties);
      }
    }
  }
  transformCustomStyleForDocument(style) {
    let ast = __WEBPACK_IMPORTED_MODULE_3__style_util__["a" /* rulesForStyle */](style);
    __WEBPACK_IMPORTED_MODULE_3__style_util__["e" /* forEachRule */](ast, (rule) => {
      if (__WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */]) {
        __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */].normalizeRootSelector(rule);
      } else {
        __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */].documentRule(rule);
      }
      if (__WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
        this._ensure();
        this._applyShim['transformRule'](rule);
      }
    });
    if (__WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
      style.textContent = __WEBPACK_IMPORTED_MODULE_3__style_util__["b" /* toCssText */](ast);
    } else {
      this._documentOwnerStyleInfo.styleRules.rules.push(ast);
    }
  }
  _revalidateApplyShim(style) {
    if (__WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
      let ast = __WEBPACK_IMPORTED_MODULE_3__style_util__["a" /* rulesForStyle */](style);
      this._ensure();
      this._applyShim['transformRules'](ast);
      style.textContent = __WEBPACK_IMPORTED_MODULE_3__style_util__["b" /* toCssText */](ast);
    }
  }
  getComputedStyleValue(element, property) {
    let value;
    if (!__WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
      // element is either a style host, or an ancestor of a style host
      let styleInfo = __WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */].get(element) || __WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */].get(this._styleOwnerForNode(element));
      value = styleInfo.styleProperties[property];
    }
    // fall back to the property value from the computed styling
    value = value || window.getComputedStyle(element).getPropertyValue(property);
    // trim whitespace that can come after the `:` in css
    // example: padding: 2px -> " 2px"
    return value ? value.trim() : '';
  }
  // given an element and a classString, replaces
  // the element's class with the provided classString and adds
  // any necessary ShadyCSS static and property based scoping selectors
  setElementClass(element, classString) {
    let root = element.getRootNode();
    let classes = classString ? classString.split(/\s/) : [];
    let scopeName = root.host && root.host.localName;
    // If no scope, try to discover scope name from existing class.
    // This can occur if, for example, a template stamped element that
    // has been scoped is manipulated when not in a root.
    if (!scopeName) {
      var classAttr = element.getAttribute('class');
      if (classAttr) {
        let k$ = classAttr.split(/\s/);
        for (let i=0; i < k$.length; i++) {
          if (k$[i] === __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */].SCOPE_NAME) {
            scopeName = k$[i+1];
            break;
          }
        }
      }
    }
    if (scopeName) {
      classes.push(__WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */].SCOPE_NAME, scopeName);
    }
    if (!__WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */]) {
      let styleInfo = __WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */].get(element);
      if (styleInfo && styleInfo.scopeSelector) {
        classes.push(__WEBPACK_IMPORTED_MODULE_4__style_properties__["a" /* default */].XSCOPE_NAME, styleInfo.scopeSelector);
      }
    }
    __WEBPACK_IMPORTED_MODULE_3__style_util__["f" /* setElementClassRaw */](element, classes.join(' '));
  }
  _styleInfoForNode(node) {
    return __WEBPACK_IMPORTED_MODULE_6__style_info__["a" /* default */].get(node);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ScopingShim;


/* exports */
ScopingShim.prototype['flush'] = ScopingShim.prototype.flush;
ScopingShim.prototype['prepareTemplate'] = ScopingShim.prototype.prepareTemplate;
ScopingShim.prototype['styleElement'] = ScopingShim.prototype.styleElement;
ScopingShim.prototype['styleDocument'] = ScopingShim.prototype.styleDocument;
ScopingShim.prototype['styleSubtree'] = ScopingShim.prototype.styleSubtree;
ScopingShim.prototype['getComputedStyleValue'] = ScopingShim.prototype.getComputedStyleValue;
ScopingShim.prototype['setElementClass'] = ScopingShim.prototype.setElementClass;
ScopingShim.prototype['_styleInfoForNode'] = ScopingShim.prototype._styleInfoForNode;
ScopingShim.prototype['transformCustomStyleForDocument'] = ScopingShim.prototype.transformCustomStyleForDocument;
ScopingShim.prototype['getStyleAst'] = ScopingShim.prototype.getStyleAst;
ScopingShim.prototype['styleAstToString'] = ScopingShim.prototype.styleAstToString;
ScopingShim.prototype['flushCustomStyles'] = ScopingShim.prototype.flushCustomStyles;
Object.defineProperties(ScopingShim.prototype, {
  'nativeShadow': {
    get() {
      return __WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */];
    }
  },
  'nativeCss': {
    get() {
      return __WEBPACK_IMPORTED_MODULE_1__style_settings__["a" /* nativeCssVariables */];
    }
  }
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


class StyleCache {
  constructor(typeMax = 100) {
    // map element name -> [{properties, styleElement, scopeSelector}]
    this.cache = {};
    this.typeMax = typeMax;
  }

  _validate(cacheEntry, properties, ownPropertyNames) {
    for (let idx = 0; idx < ownPropertyNames.length; idx++) {
      let pn = ownPropertyNames[idx];
      if (cacheEntry.properties[pn] !== properties[pn]) {
        return false;
      }
    }
    return true;
  }

  store(tagname, properties, styleElement, scopeSelector) {
    let list = this.cache[tagname] || [];
    list.push({properties, styleElement, scopeSelector});
    if (list.length > this.typeMax) {
      list.shift();
    }
    this.cache[tagname] = list;
  }

  fetch(tagname, properties, ownPropertyNames) {
    let list = this.cache[tagname];
    if (!list) {
      return;
    }
    // reverse list for most-recent lookups
    for (let idx = list.length - 1; idx >= 0; idx--) {
      let entry = list[idx];
      if (this._validate(entry, properties, ownPropertyNames)) {
        return entry;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StyleCache;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_settings__ = __webpack_require__(1);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/






/** @type {Object<string, !Node>} */
let placeholderMap = {};

/**
 * @const {CustomElementRegistry}
 */
const ce = window['customElements'];
if (ce && !__WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */]) {
  /**
   * @const {function(this:CustomElementRegistry, string,function(new:HTMLElement),{extends: string}=)}
   */
  const origDefine = ce['define'];
  /**
   * @param {string} name
   * @param {function(new:HTMLElement)} clazz
   * @param {{extends: string}=} options
   * @return {function(new:HTMLElement)}
   */
  const wrappedDefine = (name, clazz, options) => {
    placeholderMap[name] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__style_util__["g" /* applyStylePlaceHolder */])(name);
    return origDefine.call(/** @type {!CustomElementRegistry} */(ce), name, clazz, options);
  }
  ce['define'] = wrappedDefine;
}

/* harmony default export */ __webpack_exports__["a"] = placeholderMap;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_parse__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_settings__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_transformer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_regex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__style_info__ = __webpack_require__(8);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



 // eslint-disable-line no-unused-vars






// TODO: dedupe with shady
/**
 * @const {function(string):boolean}
 */
const matchesSelector = ((p) => p.matches || p.matchesSelector ||
  p.mozMatchesSelector || p.msMatchesSelector ||
p.oMatchesSelector || p.webkitMatchesSelector)(window.Element.prototype);

const IS_IE = navigator.userAgent.match('Trident');

const XSCOPE_NAME = 'x-scope';

class StyleProperties {
  get XSCOPE_NAME() {
    return XSCOPE_NAME;
  }
/**
 * decorates styles with rule info and returns an array of used style property names
 *
 * @param {StyleNode} rules
 * @return {Array<string>}
 */
  decorateStyles(rules) {
    let self = this, props = {}, keyframes = [], ruleIndex = 0;
    __WEBPACK_IMPORTED_MODULE_3__style_util__["e" /* forEachRule */](rules, function(rule) {
      self.decorateRule(rule);
      // mark in-order position of ast rule in styles block, used for cache key
      rule.index = ruleIndex++;
      self.collectPropertiesInCssText(rule.propertyInfo.cssText, props);
    }, function onKeyframesRule(rule) {
      keyframes.push(rule);
    });
    // Cache all found keyframes rules for later reference:
    rules._keyframes = keyframes;
    // return this list of property names *consumes* in these styles.
    let names = [];
    for (let i in props) {
      names.push(i);
    }
    return names;
  }

  // decorate a single rule with property info
  decorateRule(rule) {
    if (rule.propertyInfo) {
      return rule.propertyInfo;
    }
    let info = {}, properties = {};
    let hasProperties = this.collectProperties(rule, properties);
    if (hasProperties) {
      info.properties = properties;
      // TODO(sorvell): workaround parser seeing mixins as additional rules
      rule['rules'] = null;
    }
    info.cssText = this.collectCssText(rule);
    rule.propertyInfo = info;
    return info;
  }

  // collects the custom properties from a rule's cssText
  collectProperties(rule, properties) {
    let info = rule.propertyInfo;
    if (info) {
      if (info.properties) {
        Object.assign(properties, info.properties);
        return true;
      }
    } else {
      let m, rx = __WEBPACK_IMPORTED_MODULE_4__common_regex__["b" /* VAR_ASSIGN */];
      let cssText = rule['parsedCssText'];
      let value;
      let any;
      while ((m = rx.exec(cssText))) {
        // note: group 2 is var, 3 is mixin
        value = (m[2] || m[3]).trim();
        // value of 'inherit' or 'unset' is equivalent to not setting the property here
        if (value !== 'inherit' || value !== 'unset') {
          properties[m[1].trim()] = value;
        }
        any = true;
      }
      return any;
    }

  }

  // returns cssText of properties that consume variables/mixins
  collectCssText(rule) {
    return this.collectConsumingCssText(rule['parsedCssText']);
  }

  // NOTE: we support consumption inside mixin assignment
  // but not production, so strip out {...}
  collectConsumingCssText(cssText) {
    return cssText.replace(__WEBPACK_IMPORTED_MODULE_4__common_regex__["c" /* BRACKETED */], '')
      .replace(__WEBPACK_IMPORTED_MODULE_4__common_regex__["b" /* VAR_ASSIGN */], '');
  }

  collectPropertiesInCssText(cssText, props) {
    let m;
    while ((m = __WEBPACK_IMPORTED_MODULE_4__common_regex__["d" /* VAR_CONSUMED */].exec(cssText))) {
      let name = m[1];
      // This regex catches all variable names, and following non-whitespace char
      // If next char is not ':', then variable is a consumer
      if (m[2] !== ':') {
        props[name] = true;
      }
    }
  }

  // turns custom properties into realized values.
  reify(props) {
    // big perf optimization here: reify only *own* properties
    // since this object has __proto__ of the element's scope properties
    let names = Object.getOwnPropertyNames(props);
    for (let i=0, n; i < names.length; i++) {
      n = names[i];
      props[n] = this.valueForProperty(props[n], props);
    }
  }

  // given a property value, returns the reified value
  // a property value may be:
  // (1) a literal value like: red or 5px;
  // (2) a variable value like: var(--a), var(--a, red), or var(--a, --b) or
  // var(--a, var(--b));
  // (3) a literal mixin value like { properties }. Each of these properties
  // can have values that are: (a) literal, (b) variables, (c) @apply mixins.
  valueForProperty(property, props) {
    // case (1) default
    // case (3) defines a mixin and we have to reify the internals
    if (property) {
      if (property.indexOf(';') >=0) {
        property = this.valueForProperties(property, props);
      } else {
        // case (2) variable
        let self = this;
        let fn = function(prefix, value, fallback, suffix) {
          if (!value) {
            return prefix + suffix;
          }
          let propertyValue = self.valueForProperty(props[value], props);
          // if value is "initial", then the variable should be treated as unset
          if (!propertyValue || propertyValue === 'initial') {
            // fallback may be --a or var(--a) or literal
            propertyValue = self.valueForProperty(props[fallback] || fallback, props) ||
            fallback;
          } else if (propertyValue === 'apply-shim-inherit') {
            // CSS build will replace `inherit` with `apply-shim-inherit`
            // for use with native css variables.
            // Since we have full control, we can use `inherit` directly.
            propertyValue = 'inherit';
          }
          return prefix + (propertyValue || '') + suffix;
        };
        property = __WEBPACK_IMPORTED_MODULE_3__style_util__["h" /* processVariableAndFallback */](property, fn);
      }
    }
    return property && property.trim() || '';
  }

  // note: we do not yet support mixin within mixin
  valueForProperties(property, props) {
    let parts = property.split(';');
    for (let i=0, p, m; i<parts.length; i++) {
      if ((p = parts[i])) {
        __WEBPACK_IMPORTED_MODULE_4__common_regex__["e" /* MIXIN_MATCH */].lastIndex = 0;
        m = __WEBPACK_IMPORTED_MODULE_4__common_regex__["e" /* MIXIN_MATCH */].exec(p);
        if (m) {
          p = this.valueForProperty(props[m[1]], props);
        } else {
          let colon = p.indexOf(':');
          if (colon !== -1) {
            let pp = p.substring(colon);
            pp = pp.trim();
            pp = this.valueForProperty(pp, props) || pp;
            p = p.substring(0, colon) + pp;
          }
        }
        parts[i] = (p && p.lastIndexOf(';') === p.length - 1) ?
          // strip trailing ;
          p.slice(0, -1) :
          p || '';
      }
    }
    return parts.join(';');
  }

  applyProperties(rule, props) {
    let output = '';
    // dynamically added sheets may not be decorated so ensure they are.
    if (!rule.propertyInfo) {
      this.decorateRule(rule);
    }
    if (rule.propertyInfo.cssText) {
      output = this.valueForProperties(rule.propertyInfo.cssText, props);
    }
    rule['cssText'] = output;
  }

  // Apply keyframe transformations to the cssText of a given rule. The
  // keyframeTransforms object is a map of keyframe names to transformer
  // functions which take in cssText and spit out transformed cssText.
  applyKeyframeTransforms(rule, keyframeTransforms) {
    let input = rule['cssText'];
    let output = rule['cssText'];
    if (rule.hasAnimations == null) {
      // Cache whether or not the rule has any animations to begin with:
      rule.hasAnimations = __WEBPACK_IMPORTED_MODULE_4__common_regex__["f" /* ANIMATION_MATCH */].test(input);
    }
    // If there are no animations referenced, we can skip transforms:
    if (rule.hasAnimations) {
      let transform;
      // If we haven't transformed this rule before, we iterate over all
      // transforms:
      if (rule.keyframeNamesToTransform == null) {
        rule.keyframeNamesToTransform = [];
        for (let keyframe in keyframeTransforms) {
          transform = keyframeTransforms[keyframe];
          output = transform(input);
          // If the transform actually changed the CSS text, we cache the
          // transform name for future use:
          if (input !== output) {
            input = output;
            rule.keyframeNamesToTransform.push(keyframe);
          }
        }
      } else {
        // If we already have a list of keyframe names that apply to this
        // rule, we apply only those keyframe name transforms:
        for (let i = 0; i < rule.keyframeNamesToTransform.length; ++i) {
          transform = keyframeTransforms[rule.keyframeNamesToTransform[i]];
          input = transform(input);
        }
        output = input;
      }
    }
    rule['cssText'] = output;
  }

  // Test if the rules in these styles matches the given `element` and if so,
  // collect any custom properties into `props`.
  /**
   * @param {StyleNode} rules
   * @param {Element} element
   */
  propertyDataFromStyles(rules, element) {
    let props = {}, self = this;
    // generates a unique key for these matches
    let o = [];
    // note: active rules excludes non-matching @media rules
    __WEBPACK_IMPORTED_MODULE_3__style_util__["e" /* forEachRule */](rules, function(rule) {
      // TODO(sorvell): we could trim the set of rules at declaration
      // time to only include ones that have properties
      if (!rule.propertyInfo) {
        self.decorateRule(rule);
      }
      // match element against transformedSelector: selector may contain
      // unwanted uniquification and parsedSelector does not directly match
      // for :host selectors.
      let selectorToMatch = rule.transformedSelector || rule['parsedSelector'];
      if (element && rule.propertyInfo.properties && selectorToMatch) {
        if (matchesSelector.call(element, selectorToMatch)) {
          self.collectProperties(rule, props);
          // produce numeric key for these matches for lookup
          addToBitMask(rule.index, o);
        }
      }
    }, null, true);
    return {properties: props, key: o};
  }

  /**
   * @param {Element} scope
   * @param {StyleNode} rule
   * @param {string|undefined} cssBuild
   * @param {function(Object)} callback
   */
  whenHostOrRootRule(scope, rule, cssBuild, callback) {
    if (!rule.propertyInfo) {
      this.decorateRule(rule);
    }
    if (!rule.propertyInfo.properties) {
      return;
    }
    let {is, typeExtension} = __WEBPACK_IMPORTED_MODULE_3__style_util__["d" /* getIsExtends */](scope);
    let hostScope = scope.is ?
      __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */]._calcHostScope(is, typeExtension) :
      'html';
    let parsedSelector = rule['parsedSelector'];
    let isRoot = (parsedSelector === ':host > *' || parsedSelector === 'html');
    let isHost = parsedSelector.indexOf(':host') === 0 && !isRoot;
    // build info is either in scope (when scope is an element) or in the style
    // when scope is the default scope; note: this allows default scope to have
    // mixed mode built and unbuilt styles.
    if (cssBuild === 'shady') {
      // :root -> x-foo > *.x-foo for elements and html for custom-style
      isRoot = parsedSelector === (hostScope + ' > *.' + hostScope) || parsedSelector.indexOf('html') !== -1;
      // :host -> x-foo for elements, but sub-rules have .x-foo in them
      isHost = !isRoot && parsedSelector.indexOf(hostScope) === 0;
    }
    if (cssBuild === 'shadow') {
      isRoot = parsedSelector === ':host > *' || parsedSelector === 'html';
      isHost = isHost && !isRoot;
    }
    if (!isRoot && !isHost) {
      return;
    }
    let selectorToMatch = hostScope;
    if (isHost) {
      // need to transform :host under ShadowDOM because `:host` does not work with `matches`
      if (__WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */] && !rule.transformedSelector) {
        // transform :host into a matchable selector
        rule.transformedSelector =
        __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */]._transformRuleCss(
          rule,
          __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */]._transformComplexSelector,
          __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */]._calcElementScope(is),
          hostScope
        );
      }
      selectorToMatch = rule.transformedSelector || hostScope;
    }
    callback({
      selector: selectorToMatch,
      isHost: isHost,
      isRoot: isRoot
    });
  }
/**
 * @param {Element} scope
 * @param {StyleNode} rules
 * @return {Object}
 */
  hostAndRootPropertiesForScope(scope, rules) {
    let hostProps = {}, rootProps = {}, self = this;
    // note: active rules excludes non-matching @media rules
    let cssBuild = rules && rules['__cssBuild'];
    __WEBPACK_IMPORTED_MODULE_3__style_util__["e" /* forEachRule */](rules, function(rule) {
      // if scope is StyleDefaults, use _element for matchesSelector
      self.whenHostOrRootRule(scope, rule, cssBuild, function(info) {
        let element = scope._element || scope;
        if (matchesSelector.call(element, info.selector)) {
          if (info.isHost) {
            self.collectProperties(rule, hostProps);
          } else {
            self.collectProperties(rule, rootProps);
          }
        }
      });
    }, null, true);
    return {rootProps: rootProps, hostProps: hostProps};
  }

  /**
   * @param {Element} element
   * @param {Object} properties
   * @param {string} scopeSelector
   */
  transformStyles(element, properties, scopeSelector) {
    let self = this;
    let {is, typeExtension} = __WEBPACK_IMPORTED_MODULE_3__style_util__["d" /* getIsExtends */](element);
    let hostSelector = __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */]
      ._calcHostScope(is, typeExtension);
    let rxHostSelector = element.extends ?
      '\\' + hostSelector.slice(0, -1) + '\\]' :
      hostSelector;
    let hostRx = new RegExp(__WEBPACK_IMPORTED_MODULE_4__common_regex__["g" /* HOST_PREFIX */] + rxHostSelector +
      __WEBPACK_IMPORTED_MODULE_4__common_regex__["h" /* HOST_SUFFIX */]);
    let rules = __WEBPACK_IMPORTED_MODULE_5__style_info__["a" /* default */].get(element).styleRules;
    let keyframeTransforms =
      this._elementKeyframeTransforms(element, rules, scopeSelector);
    return __WEBPACK_IMPORTED_MODULE_2__style_transformer__["a" /* default */].elementStyles(element, rules, function(rule) {
      self.applyProperties(rule, properties);
      if (!__WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */] &&
          !__WEBPACK_IMPORTED_MODULE_3__style_util__["i" /* isKeyframesSelector */](rule) &&
          rule['cssText']) {
        // NOTE: keyframe transforms only scope munge animation names, so it
        // is not necessary to apply them in ShadowDOM.
        self.applyKeyframeTransforms(rule, keyframeTransforms);
        self._scopeSelector(rule, hostRx, hostSelector, scopeSelector);
      }
    });
  }

  /**
   * @param {Element} element
   * @param {StyleNode} rules
   * @param {string} scopeSelector
   * @return {Object}
   */
  _elementKeyframeTransforms(element, rules, scopeSelector) {
    let keyframesRules = rules._keyframes;
    let keyframeTransforms = {};
    if (!__WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */] && keyframesRules) {
      // For non-ShadowDOM, we transform all known keyframes rules in
      // advance for the current scope. This allows us to catch keyframes
      // rules that appear anywhere in the stylesheet:
      for (let i = 0, keyframesRule = keyframesRules[i];
           i < keyframesRules.length;
           keyframesRule = keyframesRules[++i]) {
        this._scopeKeyframes(keyframesRule, scopeSelector);
        keyframeTransforms[keyframesRule['keyframesName']] =
            this._keyframesRuleTransformer(keyframesRule);
      }
    }
    return keyframeTransforms;
  }

  // Generate a factory for transforming a chunk of CSS text to handle a
  // particular scoped keyframes rule.
  /**
   * @param {StyleNode} keyframesRule
   * @return {function(string):string}
   */
  _keyframesRuleTransformer(keyframesRule) {
    return function(cssText) {
      return cssText.replace(
          keyframesRule.keyframesNameRx,
          keyframesRule.transformedKeyframesName);
    };
  }

/**
 * Transforms `@keyframes` names to be unique for the current host.
 * Example: @keyframes foo-anim -> @keyframes foo-anim-x-foo-0
 *
 * @param {StyleNode} rule
 * @param {string} scopeId
 */
  _scopeKeyframes(rule, scopeId) {
    rule.keyframesNameRx = new RegExp(rule['keyframesName'], 'g');
    rule.transformedKeyframesName = rule['keyframesName'] + '-' + scopeId;
    rule.transformedSelector = rule.transformedSelector || rule['selector'];
    rule['selector'] = rule.transformedSelector.replace(
        rule['keyframesName'], rule.transformedKeyframesName);
  }

  // Strategy: x scope shim a selector e.g. to scope `.x-foo-42` (via classes):
  // non-host selector: .a.x-foo -> .x-foo-42 .a.x-foo
  // host selector: x-foo.wide -> .x-foo-42.wide
  // note: we use only the scope class (.x-foo-42) and not the hostSelector
  // (x-foo) to scope :host rules; this helps make property host rules
  // have low specificity. They are overrideable by class selectors but,
  // unfortunately, not by type selectors (e.g. overriding via
  // `.special` is ok, but not by `x-foo`).
  /**
   * @param {StyleNode} rule
   * @param {RegExp} hostRx
   * @param {string} hostSelector
   * @param {string} scopeId
   */
  _scopeSelector(rule, hostRx, hostSelector, scopeId) {
    rule.transformedSelector = rule.transformedSelector || rule['selector'];
    let selector = rule.transformedSelector;
    let scope = '.' + scopeId;
    let parts = selector.split(',');
    for (let i=0, l=parts.length, p; (i<l) && (p=parts[i]); i++) {
      parts[i] = p.match(hostRx) ?
        p.replace(hostSelector, scope) :
        scope + ' ' + p;
    }
    rule['selector'] = parts.join(',');
  }

  /**
   * @param {Element} element
   * @param {string} selector
   * @param {string} old
   */
  applyElementScopeSelector(element, selector, old) {
    let c = element.getAttribute('class') || '';
    let v = c;
    if (old) {
      v = c.replace(
        new RegExp('\\s*' + XSCOPE_NAME + '\\s*' + old + '\\s*', 'g'), ' ');
    }
    v += (v ? ' ' : '') + XSCOPE_NAME + ' ' + selector;
    if (c !== v) {
      __WEBPACK_IMPORTED_MODULE_3__style_util__["f" /* setElementClassRaw */](element, v);
    }
  }

  /**
   * @param {HTMLElement} element
   * @param {Object} properties
   * @param {string} selector
   * @param {HTMLStyleElement} style
   * @return {HTMLStyleElement}
   */
  applyElementStyle(element, properties, selector, style) {
    // calculate cssText to apply
    let cssText = style ? style.textContent || '' :
      this.transformStyles(element, properties, selector);
    // if shady and we have a cached style that is not style, decrement
    let styleInfo = __WEBPACK_IMPORTED_MODULE_5__style_info__["a" /* default */].get(element);
    let s = styleInfo.customStyle;
    if (s && !__WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */] && (s !== style)) {
      s['_useCount']--;
      if (s['_useCount'] <= 0 && s.parentNode) {
        s.parentNode.removeChild(s);
      }
    }
    // apply styling always under native or if we generated style
    // or the cached style is not in document(!)
    if (__WEBPACK_IMPORTED_MODULE_1__style_settings__["b" /* nativeShadow */]) {
      // update existing style only under native
      if (styleInfo.customStyle) {
        styleInfo.customStyle.textContent = cssText;
        style = styleInfo.customStyle;
      // otherwise, if we have css to apply, do so
      } else if (cssText) {
        // apply css after the scope style of the element to help with
        // style precedence rules.
        style = __WEBPACK_IMPORTED_MODULE_3__style_util__["c" /* applyCss */](cssText, selector, element.shadowRoot,
          styleInfo.placeholder);
      }
    } else {
      // shady and no cache hit
      if (!style) {
        // apply css after the scope style of the element to help with
        // style precedence rules.
        if (cssText) {
          style = __WEBPACK_IMPORTED_MODULE_3__style_util__["c" /* applyCss */](cssText, selector, null,
            styleInfo.placeholder);
        }
      // shady and cache hit but not in document
      } else if (!style.parentNode) {
        __WEBPACK_IMPORTED_MODULE_3__style_util__["j" /* applyStyle */](style, null, styleInfo.placeholder);
      }

    }
    // ensure this style is our custom style and increment its use count.
    if (style) {
      style['_useCount'] = style['_useCount'] || 0;
      // increment use count if we changed styles
      if (styleInfo.customStyle != style) {
        style['_useCount']++;
      }
      styleInfo.customStyle = style;
    }
    // @media rules may be stale in IE 10 and 11
    if (IS_IE) {
      style.textContent = style.textContent;
    }
    return style;
  }

  /**
   * @param {Element} style
   * @param {Object} properties
   */
  applyCustomStyle(style, properties) {
    let rules = __WEBPACK_IMPORTED_MODULE_3__style_util__["a" /* rulesForStyle */](/** @type {HTMLStyleElement} */(style));
    let self = this;
    style.textContent = __WEBPACK_IMPORTED_MODULE_3__style_util__["b" /* toCssText */](rules, function(/** StyleNode */rule) {
      let css = rule['cssText'] = rule['parsedCssText'];
      if (rule.propertyInfo && rule.propertyInfo.cssText) {
        // remove property assignments
        // so next function isn't confused
        // NOTE: we have 3 categories of css:
        // (1) normal properties,
        // (2) custom property assignments (--foo: red;),
        // (3) custom property usage: border: var(--foo); @apply(--foo);
        // In elements, 1 and 3 are separated for efficiency; here they
        // are not and this makes this case unique.
        css = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__css_parse__["e" /* removeCustomPropAssignment */])(/** @type {string} */(css));
        // replace with reified properties, scenario is same as mixin
        rule['cssText'] = self.valueForProperties(css, properties);
      }
    });
  }
}

/**
 * @param {number} n
 * @param {Array<number>} bits
 */
function addToBitMask(n, bits) {
  let o = parseInt(n / 32, 10);
  let v = 1 << (n % 32);
  bits[o] = (bits[o] || 0) | v;
}

/* harmony default export */ __webpack_exports__["a"] = new StyleProperties();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(22)();
// imports


// module
exports.push([module.i, ":root {\n  --main-bg-color: white;\n  --catalog-header-bg: rgba(0, 50, 49, 0.1);\n  --tab-bottom-line: rgba(0, 50, 49, 0.5);\n  --progress-bar-color: #64B362;\n  --pie-brand-color: #404042;\n  --pie-brand-hover-color: #3b7639;\n  font-family: 'Roboto', sans-serif;\n}\nbody {\n  background-color: var(--main-bg-color, white);\n}\npie-catalog-app[hidden] {\n  opacity: 0;\n}\n", ""]);

// exports


/***/ }),
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(23)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./common.less", function() {
			var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./common.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles__ = __webpack_require__(0);


const template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["a" /* prepareTemplate */])(`
  <style>
    :host{
      display: flex;
      flex-direction: column; 
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }

    catalog-header{
      flex: 0 0 auto;
      height: 40px;
    }
    
    progress-bar{
      flex: 0;
      min-height: 1px;
    } 
    
    catalog-footer{
      min-height: 20px;
      flex: 0;
    }

    #slot-holder[loading]{
      opacity: 0.0;
    }
    
    #slot-holder{
      transition: opacity 200ms linear;
      opacity: 1;
      padding: 10px;
      flex: 1;
    }

  </style>
  <catalog-header></catalog-header> 
  <progress-bar></progress-bar>
  <div id="slot-holder" loading>
    <slot></slot> 
  </div>
  <catalog-footer></catalog-footer>
`, 'catalog-container');


class CatalogContainer extends HTMLElement {

  constructor() {
    super();
    let sr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["b" /* applyStyle */])(this, template)
    this._$slotHolder = sr.querySelector('#slot-holder');
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

    loading ?
      this._progressBar.enable() :
      this._progressBar.disable();

    loading ? this._$slotHolder.setAttribute('loading', '') :
      this._$slotHolder.removeAttribute('loading');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CatalogContainer;


/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles__ = __webpack_require__(0);



const templateHTML = `
    <style>
    :host{
      height: 50px;
      padding: 7px;
      display: block;
      background-color: var(--catalog-header-bg, rgba(0,50, 49,0.1));
      border-top: solid 1px var(--shadow-color, #cccccc);
    }

    #version{
      font-size: 11px;
    }

    </style>
    <label id="version"></label> 
`;

const template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["a" /* prepareTemplate */])(templateHTML, 'catalog-footer');

class CatalogFooter extends HTMLElement {
  constructor() {
    super();
    let sr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["b" /* applyStyle */])(this, template);
    this._$version = sr.querySelector('#version');
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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__avatar_service__ = __webpack_require__(10);


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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles__ = __webpack_require__(0);


const templateHTML = `
    <style>
      :host {
        display: block;
        height: 60px;
        min-height: 60px;
        padding-top: 5px;
        padding-left: 5px;
        background-color: var(--catalog-header-bg, rgba(0,50, 49,0.1));
        border-bottom: solid 1px var(--shadow-color, #cccccc);
      }
      
      h1 {
        margin: 0;
        padding: 0;
      }

      a{
        font-size: 12px;
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
    <a href="//pielabs.github.io/pie-docs/" target="_blank">PIE FRAMEWORK</a>
    `;


const template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["a" /* prepareTemplate */])(templateHTML, 'catalog-header');

class CatalogHeader extends HTMLElement {

  constructor() {
    super();
    let sr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["b" /* applyStyle */])(this, template);
    this._$brand = this.shadowRoot.querySelector('pie-brand');
  }

  connectedCallback() {
    this._$brand.addEventListener('click', e => {
      document.location.pathname = '/';
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CatalogHeader;


CatalogHeader.TAG_NAME = 'catalog-header';

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles__ = __webpack_require__(0);



const templateHTML = `
    <style>
     :host{
       background-color: red;
        width: 300px;
        height: 120px;
        max-height: 120px;
        display: block;
        cursor: pointer;
        padding: 10px;
        background-color: white;
        box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.2);
        --moz-box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.2);
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
        margin: 0;
        padding: 0;
        padding-top: 4px;
        padding-bottom: 4px;
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
        font-size: 16px;
      }

      #repo{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
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

const template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__styles__["a" /* prepareTemplate */])(templateHTML, 'catalog-listing');

class CatalogListing extends HTMLElement {

  constructor() {
    super();

    let sr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__styles__["b" /* applyStyle */])(this, template);

    this._$org = sr.querySelector('#org');
    this._$repo = sr.querySelector('#repo');
    this._$tag = sr.querySelector('#tag');
    this._$description = sr.querySelector('#description');
    this._$avatar = sr.querySelector('github-avatar');
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles__ = __webpack_require__(0);


const templateHTML = `
    <style>
        :host {
          display: block;
        }

        .elements > catalog-listing {
          display: inline-block;
          margin: 4px;
          float:left;
        }
    </style>
    <div class="elements">
    </div>
    <div style="clear: both;"></div>
`;

const template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["a" /* prepareTemplate */])(templateHTML, 'catalog-listings');

class CatalogListings extends HTMLElement {

  constructor() {
    super();
    let sr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["b" /* applyStyle */])(this, template);
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles__ = __webpack_require__(0);


const template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["a" /* prepareTemplate */])(`
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
`, 'catalog-org');

class CatalogOrg extends HTMLElement {

  constructor() {
    super();
    let sr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["b" /* applyStyle */])(this, template);
  }

  set org(o) {
    console.log('set org: ', o);
    this._org = o;

    this.shadowRoot.querySelector('#org').textContent = o.org;

    let markup = o.elements.map((e, i) => {
      return `<catalog-listing data-index="${i}"></catalog-listing>`;
    });

    this.shadowRoot.querySelector('.elements').innerHTML = markup.join('\n');

    customElements.whenDefined('catalog-listing')
      .then(() => {
        this.shadowRoot.querySelectorAll('catalog-listing').forEach((n, i) => {
          let index = parseInt(n.getAttribute('data-index'));
          n.element = o.elements[index];
        });
      });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CatalogOrg;


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles__ = __webpack_require__(0);


const templateHTML = `
    <style>
    
    :host{
       cursor: pointer;
       font-family: 'Patua One', serif;
    }

    .pie {
      font-size: 39px;
      font-family: 'Patua One', serif;
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
    <span class="pie">pie catalog</span>
`;

class PieBrand extends HTMLElement {
  constructor() {
    super();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["b" /* applyStyle */])(this, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["a" /* prepareTemplate */])(templateHTML, 'pie-brand'));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PieBrand;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__styles__ = __webpack_require__(0);


const templateHTML = `
      <style>
        :host{
          display: block;
          overflow: hidden;
        }

        #progress{
          opacity: 0;
          width: 100%;
          height: 1px;
          background-color: var(--progress-bar-color, rgba(0,0,0,0.2));
          transition: opacity 100ms ease-in;
          -webkit-transform-origin: right center;
          transform-origin: right center;
          -webkit-animation: indeterminate-bar 2s linear infinite;
          animation: indeterminate-bar 2s linear infinite;
        }

        #progress[loading] {
          opacity: 1;
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
    `;


const template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["a" /* prepareTemplate */])(templateHTML, 'progress-bar');
class ProgressBar extends HTMLElement {

  constructor() {
    super();
    let sr = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__styles__["b" /* applyStyle */])(this, template, true);
    this._$progress = sr.querySelector('#progress');
  }

  enable() {
    this._$progress.setAttribute('loading', '');
  }

  disable() {
    this._$progress.removeAttribute('loading');
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#progress').removeAttribute('hidden');
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ProgressBar;


/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events__ = __webpack_require__(5);




let init = () => {
  customElements.whenDefined('catalog-container')
    .then(() => {
      document.querySelector('catalog-container').isLoading(true);
      return __WEBPACK_IMPORTED_MODULE_0__common__["a" /* elements */].listByOrg(window.pie.org);
    })
    .then((list) => {
      customElements.whenDefined('catalog-org')
        .then(() => {
          document.querySelector('catalog-org').org = list;
        });
      document.querySelector('catalog-container').isLoading(false);
    });
};

//For now be cautios and dont init on interactive...
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.onreadystatechange = (e) => {
    if (document.readyState === 'complete') {
      init();
    }
  }
}

document.addEventListener(__WEBPACK_IMPORTED_MODULE_1__events__["a" /* VIEW_REPO */], (e) => {
  let { org, repo } = e.detail.element;
  window.location.href = `/element/${org}/${repo}/`;
});



/***/ })
/******/ ]);