const userAgent = () =>
  ((navigator && navigator.userAgent) || "").toLowerCase();
const vendor = () => ((navigator && navigator.vendor) || "").toLowerCase();

const comparator = {
  "<": (a, b) => a < b,
  "<=": (a, b) => a <= b,
  ">": (a, b) => a > b,
  ">=": (a, b) => a >= b,
};

function compareVersion(version, range) {
  let string = range + "";
  let n = +(string.match(/\d+/) || NaN);
  let op = string.match(/^[<>]=?|/)[0];
  return comparator[op] ? comparator[op](version, n) : version == n || n !== n;
}

export let supportedBrowsers = {
  msie: "none", //ie / internet explorer
  edge: ">1", // example version range for now
  chrome: "any",
  firefox: "any",
  opera: "none",
};

function isSupported(browsers = supportedBrowsers) {
  let browser = getBrowser();
  let version = browsers[browser];
  if (!version || version == "none") return false;
  if (version == "any") return true;
  switch (browser) {
    case "msie":
      return isIe(version);
    case "edge":
      return isEdge(version);
    case "firefox":
      return isFirefox(version);
    case "chrome":
      return isChrome(version);
  }
}

const browsersRegex = new RegExp(Object.keys(supportedBrowsers).join("|"));

function getBrowser() {
  let match = userAgent().match(browsersRegex);
  if (!match) return null;
  return match[0];
}
// can take a number or a string. Can also take a string prefixed with a comparable like, > or >=
// example, chrome('>=90')
function isChrome(range) {
  let match = /google inc/.test(vendor())
    ? userAgent().match(/(?:chrome|crios)\/(\d+)/)
    : null;
  return match !== null && compareVersion(match[1], range);
}

function isIe(range) {
  let match = userAgent().match(/(?:msie |trident.+?; rv:)(\d+)/);
  return match !== null && compareVersion(match[1], range);
}

function isEdge(range) {
  let match = userAgent().match(/edge\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
}

function isFirefox(range) {
  let match = userAgent().match(/(?:firefox|fxios)\/(\d+)/);
  return match !== null && compareVersion(match[1], range);
}

export default {
  supportedBrowsers,
  compareVersion,
  isSupported,
  isChrome,
  isIe,
  isEdge,
  isFirefox,
};
