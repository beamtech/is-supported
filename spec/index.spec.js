import Browser from "../index";

let userAgent = jest.spyOn(global.navigator, "userAgent", "get");
let vendor = jest.spyOn(global.navigator, "vendor", "get");

describe("compareVersion", () => {
  expect(Browser.compareVersion("90", "90")).toBe(true);
  expect(Browser.compareVersion("90", "91")).toBe(false);

  expect(Browser.compareVersion("90", "<91")).toBe(true);
  expect(Browser.compareVersion("90", "<89")).toBe(false);
  expect(Browser.compareVersion("90", ">91")).toBe(false);
  expect(Browser.compareVersion("90", ">89")).toBe(true);

  expect(Browser.compareVersion("90", ">=91")).toBe(false);
  expect(Browser.compareVersion("90", "<=91")).toBe(true);
});

describe("isChrome", () => {
  beforeEach(() => {
    userAgent.mockReturnValue("chrome/90.0.4430.212");
    vendor.mockReturnValue("google inc.");
  });

  it("returns a boolean", () => {
    expect(Browser.isChrome("90")).toBe(true);
  });

  it("accepts optional version", () => {
    expect(Browser.isChrome("90")).toBe(true);
    expect(Browser.isChrome("<91")).toBe(true);
    expect(Browser.isChrome(">91")).toBe(false);
  });
});

describe("isIe", () => {
  beforeEach(() => {
    userAgent.mockReturnValue("msie 11");
  });

  it("returns a boolean", () => {
    expect(Browser.isIe()).toBe(true);
  });

  it("accepts optional version", () => {
    expect(Browser.isIe("11")).toBe(true);
    expect(Browser.isIe(">10")).toBe(true);
    expect(Browser.isIe("<=10")).toBe(false);
  });
});

describe("isEdge", () => {
  beforeEach(() => {
    userAgent.mockReturnValue("edge/2");
  });

  it("returns a boolean", () => {
    expect(Browser.isEdge()).toBe(true);
  });

  it("accepts optional version", () => {
    expect(Browser.isEdge("2")).toBe(true);
    expect(Browser.isEdge(">1")).toBe(true);
    expect(Browser.isEdge("<=1")).toBe(false);
  });
});

describe("isFirefox", () => {
  beforeEach(() => {
    userAgent.mockReturnValue("firefox/2");
  });
  it("returns a boolean", () => {
    expect(Browser.isFirefox()).toBe(true);
  });

  it("accepts optional version", () => {
    expect(Browser.isFirefox("2")).toBe(true);
    expect(Browser.isFirefox(">1")).toBe(true);
    expect(Browser.isFirefox("<=1")).toBe(false);
  });
});

describe("isSupported", () => {
  it("returns true for any browser version", () => {
    userAgent.mockReturnValue("firefox/2");
    expect(Browser.isSupported()).toBe(true);
  });

  it("returns true for a supported version", () => {
    userAgent.mockReturnValue("edge/2");
    expect(Browser.isSupported()).toBe(true);
  });

  it("accepts a supported browser object", () => {
    userAgent.mockReturnValue("chrome/89");
    expect(Browser.isSupported({ chrome: "89" })).toBe(true);
    expect(Browser.isSupported({ chrome: "90" })).toBe(false);
  });

  it("can override the global object", () => {
    userAgent.mockReturnValue("msie 11");
    expect(Browser.isSupported()).toBe(false);
    Browser.supportedBrowsers["msie"] = "11";
    expect(Browser.isSupported()).toBe(true);
  });

  it("returns false for an unsupported browser", () => {
    userAgent.mockReturnValue("ie 11");
    expect(Browser.isSupported()).toBe(false);
  });
  it("returns false for an unknown browser", () => {
    userAgent.mockReturnValue("asdfasd");
    expect(Browser.isSupported()).toBe(false);
  });
});
