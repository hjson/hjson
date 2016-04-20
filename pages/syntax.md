
## Syntax

The Hjson syntax is a superset of JSON ([see json.org](http://json.org/)) but allows you to

- add `#`, `//` or `/**/` comments,
- omit `""` for keys,
- omit `""` for strings,
- omit `,` at the end of a line and
- use multiline strings with proper whitespace handling.

You are also allowed to omit the root `{}` braces for objects.

#### Cheat Sheet

Simple rules to remember:

- if your key includes a JSON control character like `{}[],:` or space, use quotes
- if your string starts with `{` or `[`, use quotes
- remember that quoteless strings include everything up to the end of the line, excluding trailing whitespace.

#### Details

- Keys

  You only need to add quotes if the key name includes whitespace or any of these JSON control characters: `{}[],:`.

- Strings

  When you omit quotes the string ends at the newline. Preceding and trailing whitespace is ignored as are escapes.

  A value that is a *number*, `true`, `false` or `null` in JSON is parsed as a value. E.g. `3` is a valid *number* while `3 times` is a string.

  Naturally a quoteless string cannot start with `{` or `[`.

  Use quotes to have your string handled like in JSON. This also allows you to specify a comment after the string.

- Multiline Strings

  - Start with triple quotes `'''`, whitespace on the first line is ignored
  - `'''` defines the head, on the following lines all whitespace up to this column is ignored
  - all other whitespace is assumed to be part of the string.
  - ends with triple quotes `'''`. The last newline is ignored to allow for better formatting.

  A multiline string is OS and file independent. The line feed is always `\n`.

- Commas

  Commas are optional at the end of a line. You only need commas to specify multiple values on one line (e.g. `[1,2,3]`).

  Trailing commas are ignored.

- Comments

  `#` and `//` start a single line comment.

  `/*` starts a multiline comment that ends with `*/`.

- Root braces

  Can be omitted for objects.

- File extension

  `.hjson`

- Encoding

  `.hjson` files must be encoded in UTF-8 (preferably without a BOM).

- Header

  Hjson does not have a header but if you want to indicate the file type you can use `#hjson` on the first line.

