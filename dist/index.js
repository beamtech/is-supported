"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IsSupported = /*#__PURE__*/function () {
  function IsSupported() {
    var supportedBrowsers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, IsSupported);

    _defineProperty(this, "userAgent", function () {
      return (navigator && navigator.userAgent || "").toLowerCase();
    });

    _defineProperty(this, "vendor", function () {
      return (navigator && navigator.vendor || "").toLowerCase();
    });

    this.supportedBrowsers = supportedBrowsers;
    this.browsersRegex = new RegExp(Object.keys(supportedBrowsers).join("|"));
  }

  _createClass(IsSupported, [{
    key: "isSupported",
    value: function isSupported() {
      var browser = this.getBrowser();
      var version = this.supportedBrowsers[browser];
      if (!version || version == "none") return false;
      if (version == "any") return true;

      switch (browser) {
        case "msie":
        case "trident":
          return this.isIe(version);

        case "edge":
          return this.isEdge(version);

        case "firefox":
          return this.isFirefox(version);

        case "chrome":
          return this.isChrome(version);
      }
    }
  }, {
    key: "compareVersion",
    value: function compareVersion(version, range) {
      var string = range + "";
      var n = +(string.match(/\d+/) || NaN);
      var op = string.match(/^[<>]=?|/)[0];
      return comparator[op] ? comparator[op](version, n) : version == n || n !== n;
    }
  }, {
    key: "getBrowser",
    value: function getBrowser() {
      var match = this.userAgent().match(this.browsersRegex);
      if (!match) return null;
      return match[0];
    }
  }, {
    key: "isChrome",
    value: function isChrome(range) {
      var match = /google inc/.test(this.vendor()) ? this.userAgent().match(/(?:chrome|crios)\/(\d+)/) : null;
      return match !== null && this.compareVersion(match[1], range);
    }
  }, {
    key: "isIe",
    value: function isIe(range) {
      var match = this.userAgent().match(/(?:msie |trident.+?; rv:)(\d+)/);
      return match !== null && this.compareVersion(match[1], range);
    }
  }, {
    key: "isEdge",
    value: function isEdge(range) {
      var match = this.userAgent().match(/edge\/(\d+)/);
      return match !== null && this.compareVersion(match[1], range);
    }
  }, {
    key: "isFirefox",
    value: function isFirefox(range) {
      var match = this.userAgent().match(/(?:firefox|fxios)\/(\d+)/);
      return match !== null && this.compareVersion(match[1], range);
    }
  }]);

  return IsSupported;
}();

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
