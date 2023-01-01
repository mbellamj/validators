import { contains, exists, hasElements } from "./validators";

describe("hasElements", () => {
  it("Should return false", () => {
    const array: any[] = [];
    expect(hasElements(array)).toEqual(false);
  });

  it("Should return true", () => {
    const array = [1];
    expect(hasElements(array)).toEqual(true);
  });
});

describe("exists", () => {
  it("Should return true", () => {
    const value = {};
    expect(exists(value)).toEqual(true);
  });

  it("Should return false", () => {
    let value;
    expect(exists(value)).toEqual(false);
  });
});

describe("contains", () => {
  it("Method contains should return false", () => {
    const array: any[] = [];
    expect(contains(array)).toEqual(false);
  });

  it("Method contains should return true", () => {
    const array = [1];
    expect(contains(array)).toEqual(true);
  });

  it("Method contains should return false", () => {
    const map = new Map();
    expect(contains(map)).toEqual(false);
  });

  it("Method contains should return true", () => {
    const map = new Map();
    map.set(1, "test");
    expect(contains(map)).toEqual(true);
  });

  it("Method contains should return false", () => {
    const value = {};
    expect(contains(value)).toEqual(false);
  });

  it("Method contains should return true", () => {
    const value = {
      name: "test",
    };
    expect(contains(value)).toEqual(true);
  });
});
