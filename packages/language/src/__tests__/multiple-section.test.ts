import parser, { defineForm } from "../";

describe("Multiple section in one form", () => {
  it("should parse the form syntax correctly", () => {
    const result = parser.parse(`formkl {
      "Personal information" has {
        text;
      }
      has {
        switch;
      }
    }`);

    expect(result).toStrictEqual(
      defineForm({
        model: "base",
        sections: [
          {
            title: "Personal information",
            key: "personal-information",
            fields: [
              {
                type: "text",
                label: "Text",
                key: "text",
              },
            ],
          },
          {
            fields: [
              {
                type: "switch",
                label: "Switch",
                key: "switch",
              },
            ],
          },
        ],
      }),
    );
  });

  it("should stringify the form syntax correctly", () => {
    const result = parser.stringify(
      defineForm({
        model: "base",
        sections: [
          {
            title: "Personal information",
            key: "personal-information",
            fields: [
              {
                type: "text",
                label: "Text",
                key: "text",
              },
            ],
          },
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
      }),
    );

    expect(result).toBe(`formkl {
	"Personal information" has {
		text;
	}
	has {
		text;
	}
}`);
  });

  it("should emit syntax error for duplicated section key", () => {
    expect(() =>
      parser.parse(`formkl {
        has {
          text;
        }
        has {
          text;
        }
      }`),
    ).toThrowError(/Duplicate section key "undefined"/);
  });
});
