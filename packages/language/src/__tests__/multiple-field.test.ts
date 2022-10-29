import { describe, it, expect } from "vitest";
import parser from "../../dist/index.es";

describe("Multiple fields in a section", () => {
  it("should parse the form syntax correctly", () => {
    const result = parser.parse(`formkl {
      includes {
        text;
        "Another text" text;
      }
    }`);

    expect(result).toStrictEqual({
      model: "base",
      sections: [
        {
          fields: [
            {
              type: "text",
              label: "Text",
              key: "text",
            },
            {
              type: "text",
              label: "Another text",
              key: "another-text",
            },
          ],
        },
      ],
    });
  });

  it("should emit syntax error for duplicated field key", () => {
    expect(() =>
      parser.parse(`formkl {
        includes {
          text;
          text;
        }
      }`),
    ).toThrowError(/Duplicate field key "text"/);
  });
});
