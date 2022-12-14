import parser, { defineForm } from "../";

describe("Field with use of validation", () => {
  it("should parse the form syntax correctly", () => {
    const result = parser.parse(`formkl {
      has {
        text valid(> 5);
        "Test with OR" text valid(> 5 or == "Some value" or has "Keyword");
        "Test with AND" paragraph valid(> 5 and == "Some value" and has "Keyword");
        "Test with Both" text valid(> 5 or == "Some value" and has "Keyword");
      }
    }`);

    expect(result).toStrictEqual(
      defineForm({
        model: "base",
        sections: [
          {
            fields: [
              {
                type: "text",
                label: "Text",
                key: "text",
                validation: {
                  logic: {
                    $gt: 5,
                  },
                },
              },
              {
                type: "text",
                label: "Test with OR",
                key: "test-with-or",
                validation: {
                  logic: {
                    $or: [
                      {
                        $gt: 5,
                      },
                      {
                        $eq: "Some value",
                      },
                      {
                        $has: "Keyword",
                      },
                    ],
                  },
                },
              },
              {
                type: "paragraph",
                label: "Test with AND",
                key: "test-with-and",
                validation: {
                  logic: {
                    $and: [
                      {
                        $gt: 5,
                      },
                      {
                        $eq: "Some value",
                      },
                      {
                        $has: "Keyword",
                      },
                    ],
                  },
                },
              },
              {
                type: "text",
                label: "Test with Both",
                key: "test-with-both",
                validation: {
                  logic: {
                    $or: [
                      {
                        $gt: 5,
                      },
                      {
                        $and: [
                          {
                            $eq: "Some value",
                          },
                          {
                            $has: "Keyword",
                          },
                        ],
                      },
                    ],
                  },
                },
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
            fields: [
              {
                type: "text",
                label: "Text",
                key: "text",
                validation: {
                  logic: {
                    $gt: 5,
                  },
                },
              },
              {
                type: "text",
                label: "Test with OR",
                key: "test-with-or",
                validation: {
                  logic: {
                    $or: [
                      {
                        $gt: 5,
                      },
                      {
                        $eq: "Some value",
                      },
                      {
                        $has: "Keyword",
                      },
                    ],
                  },
                },
              },
              {
                type: "text",
                label: "Test with AND",
                key: "test-with-and",
                validation: {
                  logic: {
                    $and: [
                      {
                        $gt: 5,
                      },
                      {
                        $eq: "Some value",
                      },
                      {
                        $has: "Keyword",
                      },
                    ],
                  },
                },
              },
              {
                type: "text",
                label: "Test with Both",
                key: "test-with-both",
                validation: {
                  logic: {
                    $or: [
                      {
                        $gt: 5,
                      },
                      {
                        $and: [
                          {
                            $eq: "Some value",
                          },
                          {
                            $has: "Keyword",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
      }),
    );

    expect(result).toBe(`formkl {
	has {
		text valid(> 5);
		"Test with OR" text valid(> 5 or == "Some value" or has "Keyword");
		"Test with AND" text valid(> 5 and == "Some value" and has "Keyword");
		"Test with Both" text valid(> 5 or == "Some value" and has "Keyword");
	}
}`);
  });
});
