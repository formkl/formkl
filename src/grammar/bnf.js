const { Token } = require("./enum/token.enum");

module.exports = {
  JSONText: [["JSONValue", "return $$ = $1;"]],

  JSONValue: [
    ["JSONNullLiteral", "$$ = $1;"],
    ["JSONBooleanLiteral", "$$ = $1;"],
    ["JSONString", "$$ = $1;"],
    ["JSONNumber", "$$ = $1;"],
    ["JSONObject", "$$ = $1;"],
    ["JSONArray", "$$ = $1;"],
  ],

  JSONNullLiteral: [[Token.NULL, "$$ = null;"]],

  JSONBooleanLiteral: [
    [Token.TRUE, "$$ = true;"],
    [Token.FALSE, "$$ = false;"],
  ],

  JSONString: [[Token.STRING, "$$ = yytext;"]],

  JSONNumber: [[Token.NUMBER, "$$ = Number(yytext);"]],

  JSONObject: [
    ["{ }", "$$ = {};"],
    ["{ JSONMemberList }", "$$ = $2;"],
  ],

  JSONArray: [
    ["[ ]", "$$ = [];"],
    ["[ JSONElementList ]", "$$ = $2;"],
  ],

  JSONElementList: [
    ["JSONValue", "$$ = [$1];"],
    ["JSONElementList , JSONValue", "$$ = $1; $1.push($3);"],
  ],

  JSONMemberList: [
    ["JSONMember", "$$ = {}; $$[$1[0]] = $1[1];"],
    ["JSONMemberList , JSONMember", "$$ = $1; $1[$3[0]] = $3[1];"],
  ],

  JSONMember: [["JSONString : JSONValue", "$$ = [$1, $3];"]],
};
