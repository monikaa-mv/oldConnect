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
})({"../src/components/Table.css":[function(require,module,exports) {

},{}],"../src/components/IssueKey.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IssueKey = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const IssueKey = ({
  issueKey
}) => {
  return /*#__PURE__*/_react.default.createElement("span", null, issueKey);
};
exports.IssueKey = IssueKey;
},{}],"../src/components/IssueSummary.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IssueSummary = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const IssueSummary = ({
  summary
}) => {
  /*#__PURE__*/_react.default.createElement("span", null, summary);
};
exports.IssueSummary = IssueSummary;
},{}],"../src/components/IssueCard.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IssueCard = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Table = _interopRequireDefault(require("./Table"));
var _IssueKey = _interopRequireDefault(require("./IssueKey"));
var _IssueSummary = _interopRequireDefault(require("./IssueSummary"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const IssueCard = () => {
  const [issues, setIssues] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    // Fetch issues using REST API and JQL query
    fetchIssues();
  }, []);
  const fetchIssues = async () => {
    try {
      // Make a REST API request with the JQL query to fetch high priority issues
      const response = await fetch('https://monikavalecha.atlassian.net/rest/api/3/search?jql=project=P2 AND priority=High');
      if (response.ok) {
        const data = await response.json();
        setIssues(data.issues);
      } else {
        console.error('Failed to fetch issues');
      }
    } catch (error) {
      console.error('Error occurred while fetching issues', error);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_Table.default, null, issues.map((issue, index) => /*#__PURE__*/_react.default.createElement("tr", {
    key: issue.key
  }, /*#__PURE__*/_react.default.createElement("td", null, index + 1), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement(_IssueKey.default, {
    issueKey: issue.key
  }), ":", /*#__PURE__*/_react.default.createElement(_IssueSummary.default, {
    summary: issue.fields.summary
  })))));
};
exports.IssueCard = IssueCard;
},{"./Table":"../src/components/Table.css","./IssueKey":"../src/components/IssueKey.jsx","./IssueSummary":"../src/components/IssueSummary.jsx"}],"hello-world.jsx":[function(require,module,exports) {
"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _IssueCard = require("../src/components/IssueCard");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// export default function HelloWorld() {
//   const [excitementLevel, setExcitementLevel] = React.useState(0);
//   return <SectionMessage
//       title={`Hello, world${excitementLevel ? new Array(excitementLevel).fill('!').join('') : '.'}`}
//       actions={[
//         {
//           key: '1',
//           href: 'https://atlassian.design/components/',
//           text: 'Browse more components to add to your app',
//         },
//         {
//           key: '2',
//           onClick: () => setExcitementLevel(excitementLevel + 1),
//           text: 'Get excited!',
//         }
//       ]}
//     >
//       <p>
//         Congratulations! You have successfully created an Atlassian Connect app using the <a href={'https://bitbucket.org/atlassian/atlassian-connect-express'}>atlassian-connect-express</a> client library.
//       </p>
//     </SectionMessage>;
// }

// export default function HelloWorld(){
//   return (
//     <div>
//       <h1>High Priorities Issue</h1>
//       <h2>Table:</h2>
//     </div>

//   )

// }

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_IssueCard.IssueCard, null), document.getElementById('root'));
},{"../src/components/IssueCard":"../src/components/IssueCard.jsx"}]},{},["hello-world.jsx"], null)
//# sourceMappingURL=/hello-world.js.map