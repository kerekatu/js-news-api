// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/utils/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elements = exports.api = void 0;
const api = {
  key: '3906838ce9414218905b76614679c217'
};
exports.api = api;
const elements = {
  searchbar: document.querySelector('#form-search'),
  searchbarInput: document.querySelector('#input-searchbar'),
  searchbarIcon: document.querySelector('#icon-searchbar'),
  searchbarBtn: document.querySelector('#btn-searchbar'),
  searchbarResults: document.querySelector('#results-searchbar'),
  searchbarContent: document.querySelector('#content-searchbar'),
  searchbarBtnPagination: document.querySelector('#btn-pagination'),
  searchbarBtnSortTop: document.querySelector('#btn-sort-top'),
  searchbarBtnSortNew: document.querySelector('#btn-sort-new'),
  searchbarBtnSortRel: document.querySelector('#btn-sort-rel')
};
exports.elements = elements;
},{}],"src/js/utils/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let timer;

const debounce = (func, delay) => {
  clearTimeout(timer);
  timer = setTimeout(func, delay);
};

var _default = debounce;
exports.default = _default;
},{}],"node_modules/unfetch/dist/unfetch.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(e, n) {
  return n = n || {}, new Promise(function (t, r) {
    var s = new XMLHttpRequest(),
        o = [],
        u = [],
        i = {},
        a = function () {
      return {
        ok: 2 == (s.status / 100 | 0),
        statusText: s.statusText,
        status: s.status,
        url: s.responseURL,
        text: function () {
          return Promise.resolve(s.responseText);
        },
        json: function () {
          return Promise.resolve(JSON.parse(s.responseText));
        },
        blob: function () {
          return Promise.resolve(new Blob([s.response]));
        },
        clone: a,
        headers: {
          keys: function () {
            return o;
          },
          entries: function () {
            return u;
          },
          get: function (e) {
            return i[e.toLowerCase()];
          },
          has: function (e) {
            return e.toLowerCase() in i;
          }
        }
      };
    };

    for (var l in s.open(n.method || "get", e, !0), s.onload = function () {
      s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (e, n, t) {
        o.push(n = n.toLowerCase()), u.push([n, t]), i[n] = i[n] ? i[n] + "," + t : t;
      }), t(a());
    }, s.onerror = r, s.withCredentials = "include" == n.credentials, n.headers) s.setRequestHeader(l, n.headers[l]);

    s.send(n.body || null);
  });
}
},{}],"src/js/utils/loadMore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unfetch = _interopRequireDefault(require("unfetch"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loadMore = async (url, pageNumber, sorting) => {
  const r = await (0, _unfetch.default)(url + '&pageSize=5&page= ' + pageNumber + '&sortBy=' + sorting + '&apiKey=' + _utils.api.key);
  const d = await r.json();
  document.querySelector('.searchbar__list').innerHTML += d.articles.map(article => `<li class="searchbar__item">
              <a href="${article.url}" title="${article.title.substr(0, 34)}..." class="searchbar__link">
              ${article.title}
              </a>
              <span class="searchbar__details">
              <strong>Source:</strong> ${article.source.name} ${article.author ? '– ' + article.author : ''}
              </span>
              </li>`).join('');
};

var _default = loadMore;
exports.default = _default;
},{"unfetch":"node_modules/unfetch/dist/unfetch.mjs","./utils":"src/js/utils/utils.js"}],"src/js/utils/handleSort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unfetch = _interopRequireDefault(require("unfetch"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleSort = async (url, pageNumber, sorting) => {
  const response = await (0, _unfetch.default)(url + '&pageSize=5&page= ' + pageNumber + '&sortBy=' + sorting + '&apiKey=' + _utils.api.key);
  const data = response.json();
  return data;
};

var _default = handleSort;
exports.default = _default;
},{"unfetch":"node_modules/unfetch/dist/unfetch.mjs","./utils":"src/js/utils/utils.js"}],"src/js/utils/getNews.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var _unfetch = _interopRequireDefault(require("unfetch"));

var _loadMore = _interopRequireDefault(require("./loadMore"));

var _handleSort = _interopRequireDefault(require("./handleSort"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getNews = async url => {
  let pageNumber = 1;
  let sorting = 'relevancy';
  const response = await (0, _unfetch.default)(url + '&pageSize=5&page= ' + pageNumber + '&sortBy=' + sorting + '&apiKey=' + _utils.api.key);
  const data = await response.json();

  if (_utils.elements.searchbarInput.value.length > 3 && data) {
    const articleHTML = data.articles.map(article => `<li class="searchbar__item">
          <a href="${article.url}" title="${article.title.substr(0, 34)}..." class="searchbar__link">
          ${article.title}
          </a>
          <span class="searchbar__details">
          <strong>Source:</strong> ${article.source.name} ${article.author ? '– ' + article.author : ''}
          </span>
          </li>`).join('');
    _utils.elements.searchbarInput.style = 'border-top-left-radius: 2.3rem; border-top-right-radius: 2.3rem; border-bottom-left-radius: 0; border-bottom-right-radius: 0; box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12); transform: scale(1.1);';

    _utils.elements.searchbarBtnSortTop.addEventListener('click', () => {
      sorting = 'popularity';
      (0, _handleSort.default)(url, pageNumber, sorting).then(data => _utils.elements.searchbarResults.innerHTML = `
      <ul class="searchbar__list" id="list-searchbar">${data.articles.map(article => `<li class="searchbar__item">
            <a href="${article.url}" title="${article.title.substr(0, 34)}..." class="searchbar__link">
            ${article.title}
            </a>
            <span class="searchbar__details">
            <strong>Source:</strong> ${article.source.name} ${article.author ? '– ' + article.author : ''}
            </span>
            </li>`).join('')}</ul>
      `);

      _utils.elements.searchbarBtnSortTop.classList.add('searchbar__btn--sort--active');

      _utils.elements.searchbarBtnSortNew.classList.remove('searchbar__btn--sort--active');

      _utils.elements.searchbarBtnSortRel.classList.remove('searchbar__btn--sort--active');
    });

    _utils.elements.searchbarBtnSortNew.addEventListener('click', () => {
      sorting = 'publishedAt';
      (0, _handleSort.default)(url, pageNumber, sorting).then(data => _utils.elements.searchbarResults.innerHTML = `
      <ul class="searchbar__list" id="list-searchbar">${data.articles.map(article => `<li class="searchbar__item">
            <a href="${article.url}" title="${article.title.substr(0, 34)}..." class="searchbar__link">
            ${article.title}
            </a>
            <span class="searchbar__details">
            <strong>Source:</strong> ${article.source.name} ${article.author ? '– ' + article.author : ''}
            </span>
            </li>`).join('')}</ul>
      `);

      _utils.elements.searchbarBtnSortTop.classList.remove('searchbar__btn--sort--active');

      _utils.elements.searchbarBtnSortNew.classList.add('searchbar__btn--sort--active');

      _utils.elements.searchbarBtnSortRel.classList.remove('searchbar__btn--sort--active');
    });

    _utils.elements.searchbarBtnSortRel.addEventListener('click', () => {
      sorting = 'relevancy';
      (0, _handleSort.default)(url, pageNumber, sorting).then(data => _utils.elements.searchbarResults.innerHTML = `
      <ul class="searchbar__list" id="list-searchbar">${data.articles.map(article => `<li class="searchbar__item">
          <a href="${article.url}" title="${article.title.substr(0, 34)}..." class="searchbar__link">
          ${article.title}
          </a>
          <span class="searchbar__details">
          <strong>Source:</strong> ${article.source.name} ${article.author ? '– ' + article.author : ''}
          </span>
          </li>`).join('')}</ul>
      `);

      _utils.elements.searchbarBtnSortTop.classList.remove('searchbar__btn--sort--active');

      _utils.elements.searchbarBtnSortNew.classList.remove('searchbar__btn--sort--active');

      _utils.elements.searchbarBtnSortRel.classList.add('searchbar__btn--sort--active');
    });

    setTimeout(() => {
      _utils.elements.searchbarContent.style = 'display: block;';
      _utils.elements.searchbarResults.innerHTML = `
      <ul class="searchbar__list" id="list-searchbar">${articleHTML}</ul>
      `;
    }, 200);

    if (Math.ceil(data.totalResults / 5) >= pageNumber) {
      _utils.elements.searchbarBtnPagination.innerHTML = 'Load More...';

      _utils.elements.searchbarBtnPagination.addEventListener('click', () => {
        (0, _loadMore.default)(url, pageNumber++, sorting);
      });
    } else {
      _utils.elements.searchbarBtnPagination.removeEventListener('click', () => (0, _loadMore.default)(url, pageNumber++, sorting));

      _utils.elements.searchbarBtnPagination.innerHTML = 'End Of Results';
    }
  }
};

var _default = getNews;
exports.default = _default;
},{"./utils":"src/js/utils/utils.js","unfetch":"node_modules/unfetch/dist/unfetch.mjs","./loadMore":"src/js/utils/loadMore.js","./handleSort":"src/js/utils/handleSort.js"}],"src/js/app.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils/utils");

var _debounce = _interopRequireDefault(require("./utils/debounce"));

var _getNews = _interopRequireDefault(require("./utils/getNews"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_utils.elements.searchbarInput.addEventListener('input', e => {
  (0, _debounce.default)(() => (0, _getNews.default)('http://newsapi.org/v2/everything?q=' + e.target.value), 400);

  if (e.target.value.length > 3) {
    _utils.elements.searchbarIcon.style = 'display: none;';
    _utils.elements.searchbarBtn.style = 'display: flex; right: -3rem';

    _utils.elements.searchbarBtn.addEventListener('click', () => {
      e.target.style = 'border-radius: 100rem';
      _utils.elements.searchbarContent.style = 'display: none;';
      _utils.elements.searchbarIcon.style = 'display: flex;';
      _utils.elements.searchbarBtn.style = 'display: none;';
      e.target.value = '';
    });
  } else if (e.target.value.length <= 3) {
    _utils.elements.searchbarIcon.style = 'display: flex;';
    _utils.elements.searchbarBtn.style = 'display: none;';
    _utils.elements.searchbarContent.style = 'display: none;';
    e.target.style = 'border-radius: 100rem';

    _utils.elements.searchbarBtn.removeEventListener('click', () => e.targer.value = '');
  }
});
},{"./utils/utils":"src/js/utils/utils.js","./utils/debounce":"src/js/utils/debounce.js","./utils/getNews":"src/js/utils/getNews.js"}],"../../../Users/KR/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58103" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/KR/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/app.js"], null)
//# sourceMappingURL=/app.77c12427.js.map