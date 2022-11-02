import { describe, it, expect } from "vitest";
import parser from "../../dist/index";

describe("Minimal test", () => {
  it("should parse the form syntax correctly", () => {
    const result = parser.parse(`formkl {
      includes {
        text;
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
          ],
        },
      ],
    });
  });
});