class IsSupported {
  constructor(supportedBrowsers = {}) {
    this.supportedBrowsers = supportedBrowsers;
    this.browsersRegex = new RegExp(Object.keys(supportedBrowsers).join("|"));
  }

  isSupported() {
    let browser = this.getBrowser();
    let version = this.supportedBrowsers[browser];
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

  userAgent = () => ((navigator && navigator.userAgent) || "").toLowerCase();
  vendor = () => ((navigator && navigator.vendor) || "").toLowerCase();

  compareVersion(version, range) {
    let string = range + "";
    let n = +(string.match(/\d+/) || NaN);
    let op = string.match(/^[<>]=?|/)[0];
    return comparator[op]
      ? comparator[op](version, n)
      : version == n || n !== n;
  }

  getBrowser() {
    let match = this.userAgent().match(this.browsersRegex);
    if (!match) return null;
    return match[0];
  }

  isChrome(range) {
    let match = /google inc/.test(this.vendor())
      ? this.userAgent().match(/(?:chrome|crios)\/(\d+)/)
      : null;
    return match !== null && this.compareVersion(match[1], range);
  }
  isIe(range) {
    let match = this.userAgent().match(/(?:msie |trident.+?; rv:)(\d+)/);
    return match !== null && this.compareVersion(match[1], range);
  }
  isEdge(range) {
    let match = this.userAgent().match(/edge\/(\d+)/);
    return match !== null && this.compareVersion(match[1], range);
  }

  isFirefox(range) {
    let match = this.userAgent().match(/(?:firefox|fxios)\/(\d+)/);
    return match !== null && this.compareVersion(match[1], range);
  }
}

const comparator = {
  "<": (a, b) => a < b,
  "<=": (a, b) => a <= b,
  ">": (a, b) => a > b,
  ">=": (a, b) => a >= b,
};

export default IsSupported;
