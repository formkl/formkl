import { isValueValidated } from "@formkl/shared";

import parser from "../../../../language";

describe("Test recursive validator", () => {
  it("should return false", () => {
    const form = parser.parse(`formkl {
      has {
        text valid(< 5);
      }
    }`);

    const result = isValueValidated("test something long", form.sections[0].fields[0].validation);

    expect(result).toBe(false);
  });

  it("should return false", () => {
    const form = parser.parse(`formkl {
      has {
        text valid(< 5);
      }
    }`);

    const result = isValueValidated(33, form.sections[0].fields[0].validation);

    expect(result).toBe(false);
  });

  it("should return true", () => {
    const form = parser.parse(`formkl {
      has {
        text valid(< 5);
      }
    }`);

    const result = isValueValidated(2, form.sections[0].fields[0].validation);

    expect(result).toBe(true);
  });
});
