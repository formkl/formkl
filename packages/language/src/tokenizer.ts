import { Token, Spec } from "./types";
import { createKeywordRegex } from "./utils/createKeywordRegex";

/**
 * Tokenizer spec.
 */
const Specs: Array<Spec> = [
  // --------------------------------------
  // Whitespace:
  [/^\s+/, null],

  // --------------------------------------
  // Comments:

  // Skip single-line comments:
  [/^\/\/.*/, null],

  // Skip multi-line comments:
  [/^\/\*[\s\S]*?\*\//, null],

  // --------------------------------------
  // Symbols and delimiters:
  [/^;/, ";"], // Semicolon
  [/^{/, "{"], // LeftBrace
  [/^}/, "}"], // RightBrace
  [/^\(/, "("], // LeftParen
  [/^\)/, ")"], // RightParen
  [/^\[/, "["], // LeftBracket
  [/^\]/, "]"], // RightBracket
  [/^,/, ","], // Comma
  [/^\./, "."], // Dot

  // --------------------------------------
  // Validation Operators:
  // <, >, <=, >=
  [/^[<>]=?/, "OPERATOR_RELATIONAL"],
  [/^[=!]=/, "OPERATOR_EQUALITY"],

  // Logical Operators
  // ||, &&, !
  [/^&&/, "LOGICAL_AND"],
  [/^\|\|/, "LOGICAL_OR"],
  [/^!/, "LOGICAL_NOT"],

  [createKeywordRegex("VALID"), "VALID"],
  [createKeywordRegex("REGEX"), "REGEX"],
  [createKeywordRegex("URL"), "URL"],

  [createKeywordRegex("REQUIRE"), "REQUIRE"],
  [createKeywordRegex("AS"), "AS"],
  [createKeywordRegex("OR"), "OR"],
  [createKeywordRegex("AND"), "AND"],
  [createKeywordRegex("HAS"), "HAS"],

  // --------------------------------------
  // Keywords
  [createKeywordRegex("FORMKL"), "FORMKL"],
  [createKeywordRegex("MULTIPLE"), "MULTIPLE"],
  [createKeywordRegex("BASE"), "BASE"],
  [createKeywordRegex("FLAT"), "FLAT"],

  // --------------------------------------
  // Http Methods
  [createKeywordRegex("GET"), "HTTPMETHOD"],
  [createKeywordRegex("POST"), "HTTPMETHOD"],
  [createKeywordRegex("PUT"), "HTTPMETHOD"],
  [createKeywordRegex("PATCH"), "HTTPMETHOD"],
  [createKeywordRegex("DELETE"), "HTTPMETHOD"],

  // --------------------------------------
  // Fields
  ...["text", "paragraph", "number", "switch"].map(
    (field) => [createKeywordRegex(field), "FIELD"] as Spec,
  ),
  ...["checkbox", "radio", "select"].map(
    (field) => [createKeywordRegex(field), "FIELDSELECTION"] as Spec,
  ),
  ...["email", "zip", "age"].map((field) => [createKeywordRegex(field), "FIELDVALIDATED"] as Spec),
  ...["datetimerange", "datetime", "daterange", "timerange", "time", "date"].map(
    (field) => [createKeywordRegex(field), "FIELDDATETIME"] as Spec,
  ),
  // --------------------------------------
  // Identifier
  [/^\$\w+/, "FIELDCUSTOM"],

  // --------------------------------------
  // Numbers:
  [/^\d+/, "NUMBER"],

  // --------------------------------------
  // Double quoted String:
  [/^"[^"]*"/, "STRING"],

  // --------------------------------------
  // Single quoted String:
  [/^'[^']*'/, "STRING"],

  // --------------------------------------
  // Values by Keyword:
  [createKeywordRegex("NaN"), "NAN"],
  [createKeywordRegex("FALSE"), "FALSE"],
  [createKeywordRegex("TRUE"), "TRUE"],
  [createKeywordRegex("NULL"), "NULL"],
  [createKeywordRegex("UNDEFINED"), "UNDEFINED"],
];

/**
 * Tokenizer class
 * Lazily pulls a token from a stream.
 */
export class Tokenizer {
  private _string: string;
  private _cursor: number;

  /**
   * Initializes the string.
   */
  constructor(string: string) {
    this._string = string;
    this._cursor = 0; // track the position of each character
  }
  /**
   * Whether the tokenizer reached EOF.
   */
  isEOF() {
    return this._cursor === this._string.length;
  }
  /**
   * Whether we still have more tokens.
   */
  hasMoreTokens() {
    return this._cursor < this._string.length;
  }
  /**
   * Obtains next token.
   */
  getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }
    const string = this._string.slice(this._cursor);

    for (const [regexp, tokenType] of Specs) {
      const tokenValue = this._match(regexp, string);

      // Couldn't match this rule, continue.
      if (tokenValue === null) {
        continue;
      }

      // Should skip this null token because could be a whitespace or something else
      if (tokenType === null) {
        return this.getNextToken();
      }

      // We return the token
      return {
        type: tokenType,
        value: tokenValue,
      };
    }

    throw new SyntaxError(`Unexpected token: "${string[0]}"`);
  }

  /**
   * Matches a token for a regular expression.
   */
  _match(regexp: RegExp, string: string) {
    const matched = regexp.exec(string);
    if (matched === null) {
      return null;
    }
    this._cursor += matched[0].length;
    return matched[0];
  }
}
