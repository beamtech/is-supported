import IsSupported from "./index";

let userAgent = jest.spyOn(global.navigator, "userAgent", "get");
let vendor = jest.spyOn(global.navigator, "vendor", "get");

describe("compareVersion", () => {
  const browser = new IsSupported();
  expect(browser.compareVersion("90", "90")).toBe(true);
  expect(browser.compareVersion("90", "91")).toBe(false);

  expect(browser.compareVersion("90", "<91")).toBe(true);
  expect(browser.compareVersion("90", "<89")).toBe(false);
  expect(browser.compareVersion("90", ">91")).toBe(false);
  expect(browser.compareVersion("90", ">89")).toBe(true);

  expect(browser.compareVersion("90", ">=91")).toBe(false);
  expect(browser.compareVersion("90", "<=91")).toBe(true);
});

describe("isChrome", () => {
  const browser = new IsSupported();
  beforeEach(() => {
    userAgent.mockReturnValue("chrome/90.0.4430.212");
    vendor.mockReturnValue("google inc.");
  });

  it("returns a boolean", () => {
    expect(browser.isChrome("90")).toBe(true);
  });

  it("accepts optional version", () => {
    expect(browser.isChrome("90")).toBe(true);
    expect(browser.isChrome("<91")).toBe(true);
    expect(browser.isChrome(">91")).toBe(false);
  });
});

describe("isIe", () => {
  const browser = new IsSupported();
  beforeEach(() => {
    userAgent.mockReturnValue("msie 11");
  });

  it("returns a boolean", () => {
    expect(browser.isIe()).toBe(true);
  });

  it("accepts optional version", () => {
    expect(browser.isIe("11")).toBe(true);
    expect(browser.isIe(">10")).toBe(true);
    expect(browser.isIe("<=10")).toBe(false);
  });
});

describe("isEdge", () => {
  const browser = new IsSupported();
  beforeEach(() => {
    userAgent.mockReturnValue("edge/2");
  });

  it("returns a boolean", () => {
    expect(browser.isEdge()).toBe(true);
  });

  it("accepts optional version", () => {
    expect(browser.isEdge("2")).toBe(true);
    expect(browser.isEdge(">1")).toBe(true);
    expect(browser.isEdge("<=1")).toBe(false);
  });
});

describe("isFirefox", () => {
  const browser = new IsSupported();
  beforeEach(() => {
    userAgent.mockReturnValue("firefox/2");
  });
  it("returns a boolean", () => {
    expect(browser.isFirefox()).toBe(true);
  });

  it("accepts optional version", () => {
    expect(browser.isFirefox("2")).toBe(true);
    expect(browser.isFirefox(">1")).toBe(true);
    expect(browser.isFirefox("<=1")).toBe(false);
  });
});

describe("isSupported", () => {
  const supportedBrowsers = {
    msie: "none", //ie / internet explorer
    edge: ">1", // example version range for now
    chrome: "89", // change this to value to test functionality
    firefox: "any",
    opera: "none",
  };
  let browser = new IsSupported(supportedBrowsers);
  it("returns true for any browser version", () => {
    userAgent.mockReturnValue("firefox/2");
    expect(browser.isSupported()).toBe(true);
  });

  it("returns true for a supported version", () => {
    userAgent.mockReturnValue("edge/2");
    expect(browser.isSupported()).toBe(true);
  });

  it("returns false for an unsupported browser", () => {
    userAgent.mockReturnValue("ie 11");
    expect(browser.isSupported()).toBe(false);
  });
  it("returns false for an unknown browser", () => {
    userAgent.mockReturnValue("asdfasd");
    expect(browser.isSupported()).toBe(false);
  });
});
