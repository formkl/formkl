@{%
	const lexer = require("./formkl.tokenizer.js");
%}

# Pass your lexer with @lexer:
@lexer lexer

Field -> FieldDefault
		| FieldValidated
		| SupportConstraint _ FieldDefault
		| SupportConstraint _ FieldValidated

FieldDefault -> %FIELDDEFAULT
				| FieldCustom %FIELDDEFAULT

FieldValidated -> %FIELDVALIDATED
				| %FIELDVALIDATEDPHONE
				| FieldCustom %FIELDVALIDATED
				| FieldCustom %FIELDVALIDATEDPHONE

FieldCustom -> null | CustomLabel _

SupportConstraint -> %SUPPORTCONSTRAINT

CustomLabel -> STRING

__ -> %WHITESPACE:+
_ -> %WHITESPACE:*

STRING -> %LITERALSTRING

NUMBER -> %LITERALNUMBER
