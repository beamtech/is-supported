"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.supportedBrowsers = void 0;

require("core-js/modules/es6.regexp.match.js");

require("core-js/modules/es6.regexp.constructor.js");

require("core-js/modules/es6.object.keys.js");

var userAgent = function userAgent() {
  return (navigator && navigator.userAgent || "").toLowerCase();
};

var vendor = function vendor() {
  return (navigator && navigator.vendor || "").toLowerCase();
};

var comparator = {
  "<": function _(a, b) {
    return a < b;
  },
  "<=": function _(a, b) {
    return a <= b;
  },
  ">": function _(a, b) {
    return a > b;
  },
  ">=": function _(a, b) {
    return a >= b;
  }
};

function compareVersion(version, range) {
  var string = range + "";
  var n = +(string.match(/\d+/) || NaN);
  var op = string.match(/^[<>]=?|/)[0];
  return comparator[op] ? comparator[op](version, n) : version == n || n !== n;
}

var supportedBrowsers = {
  msie: "none",
  //ie / internet explorer
  trident: "none",
  //ie / internet explorer
  edge: ">1",
  // example version range for now
  chrome: "any",
  firefox: "any",
  opera: "none"
};
exports.supportedBrowsers = supportedBrowsers;

function isSupported() {
  var browsers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : supportedBrowsers;
  var browser = getBrowser();
  var version = browsers[browser];
  if (!version || version == "none") return false;
  if (version == "any") return true;

  switch (browser) {
    case "msie":
    case "trident":
      return isIe(version);

    case "edge":
      return isEdge(version);

    case "firefox":
      return isFirefox(version);

    case "chrome":
      return isChrome(version);
  }
}

var browsersRegex = new RegExp(Object.keys(supportedBrowsers).join("|"));

function getBrowser() {
  var match = userAgent().match(browsersRegex);
  if (!match) return null;
  return match[0];
} // can take a number or a string. Can also take a string prefixed with a comparable like, > or >=
// example, chrome('>=90')


function isChrome(range) {
  var match = /google inc/.test(vendor()) ? userAgent().match(/(?:chrome|crios)\/(\d+)/) : null;
  return match !== null && compareVersion(match[1], range);
}

function isIe(range) {
  var match = userAgent().match(/(?:msie |trident.+?; rv:)(\d+)/);
  return match !== null && compareVersion(match[1], range);
}

function isEdge(range) {
  var match = userAgent().match(/edge\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
}

function isFirefox(range) {
  var match = userAgent().match(/(?:firefox|fxios)\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
}

var _default = {
  supportedBrowsers: supportedBrowsers,
  compareVersion: compareVersion,
  isSupported: isSupported,
  isChrome: isChrome,
  isIe: isIe,
  isEdge: isEdge,
  isFirefox: isFirefox
};
exports.default = _default;
