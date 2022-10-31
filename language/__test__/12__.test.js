import fs from "fs";
import path from "path";
import parser from "../dist/index.js";

const testCase = `formkl {
  "Re-Index User" includes {
    require "User email" email;
  }
}
`;

describe("test", () => {
  it("should parse the form syntax correctly", () => {
    const result = parser.parse(testCase);

    fs.writeFileSync(
      path.resolve(__dirname, "../logs/12__.result.json"),
      JSON.stringify(result, null, 2),
    );

    expect(result).toStrictEqual({
      model: "base",
      method: "",
      endpoint: "",
      title: "",
      description: "",
      sections: [
        {
          title: "Re-Index User",
          key: "re-index-user",
          multiple: false,
          fields: [
            {
              type: "email",
              label: "User email",
              require: true,
              key: "user-email",
              multiple: false,
            },
          ],
        },
      ],
    });
  });
});