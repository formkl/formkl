import { isValueValidated } from "@formkl/shared";

import parser from "../../../../language";

describe("Test recursive validator", () => {
  it("should return false", () => {
    const form = parser.parse(`formkl {
      has {
        text valid(> 10 and < 15);
      }
    }`);

    const result = isValueValidated(
      "test something with and",
      form.sections[0].fields[0].validation,
    );

    expect(result).toBe(false);
  });

  it("should return true", () => {
    const form = parser.parse(`formkl {
      has {
        text valid(> 10 and < 15);
      }
    }`);

    const result = isValueValidated(11, form.sections[0].fields[0].validation);

    expect(result).toBe(true);
  });

  it("should return false", () => {
    const form = parser.parse(`formkl {
      has {
        text valid(> 10 and < 15);
      }
    }`);

    const result = isValueValidated(25, form.sections[0].fields[0].validation);

    expect(result).toBe(false);
  });

  it("should return false", () => {
    const form = parser.parse(`formkl {
      has {
        text valid(> 10 and < 15);
      }
    }`);

    const result = isValueValidated(2, form.sections[0].fields[0].validation);

    expect(result).toBe(false);
  });
});
