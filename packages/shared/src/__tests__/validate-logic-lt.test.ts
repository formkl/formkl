import { isValueValidated } from "@formkl/shared";

describe("Test recursive validator", () => {
  it("should return false", () => {
    const result = isValueValidated("test something long", {
      logic: {
        $lt: 5,
      },
    });

    expect(result).toBe(false);
  });

  it("should return false", () => {
    const result = isValueValidated(6, {
      logic: {
        $lt: 5,
      },
    });

    expect(result).toBe(false);
  });

  it("should return true", () => {
    const result = isValueValidated(2, {
      logic: {
        $lt: 5,
      },
    });

    expect(result).toBe(true);
  });
});
