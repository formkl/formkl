const moo = require("moo");

const DEFAULT_FIELDS = ["text", "paragraph", "number", "checkbox", "radio", "dropdown"];

const VALIDATED_FIELDS = ["email", "zip", "age"];

const DATETIME_FIELDS = [
  "date",
  "future date",
  "past date",
  "birthday",
  "time",
  "datetime",
  "date range",
  "datetime range",
  "time range",
];

const SUPPORT_COUNTRIES = ["US", "VN"];

module.exports = moo.compile({
  TkDeclareForm: ["formkl", "Formkl"],
  TkDeclareSection: ["includes"],
  TkComment: {
    match: /#[^\n]*/,
    value: (s) => s.substring(1),
  },
  TkWhitespace: {
    match: /[\s\t]+/,
    lineBreaks: true,
  },
  TkLineBreak: {
    match: /\n/,
    lineBreaks: true,
  },
  TkGt: ">",
  TkGte: ">=",
  TkLt: "<",
  TkLte: "<=",
  TkEq: "==",
  TkSemi: ";",
  TkParenOpen: "(",
  TkParenClose: ")",
  TkBlockOpen: "{",
  TkBlockClose: "}",
  TkLitteralString: {
    match: /"(?:[^\n\\"]|\\["\\ntbfr])*"/,
    value: (s) => JSON.parse(s),
  },
  TkLitteralNumber: {
    match: /[0-9]+(?:\.[0-9]+)?/,
    value: (s) => Number(s),
  },
  TkRequire: "require",
  TkValidate: "valid",
  TkRegex: "regex",
  TkConditionAnd: "and",
  TkConditionOr: "or",
  TkField: [
    ...DEFAULT_FIELDS,
    ...VALIDATED_FIELDS,
    ...DATETIME_FIELDS,
    ...SUPPORT_COUNTRIES.map((c) => c + " phone"),
  ],
});
