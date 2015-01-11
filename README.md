
# Hjson, the Human JSON

A configuration file format that caters to humans and helps reduce the errors they make.

## Intro

See the full intro and explanation at [laktak.github.io/hjson](http://laktak.github.io/hjson/).

```
{
  # comments are useful
  // maybe you prefer js style comments
  /* or if you feel old fashioned */

  "rate": 1000 # specify in requests/second

  # key names do not need to be placed in quotes
  key: "value"

  # you don't need quotes for strings (see intro)
  text: look ma, no quotes!

  # commas are optional
  commas:
  {
    one: 1
    two: 2
  }

  # trailing commas are allowed
  trailing:
  {
    one: 1,
    two: 2,
  }

  # multiline string
  haiku:
    '''
    JSON I love you.
    But you strangle my expression.
    This is so much better.
    '''

  # or go with standard JSON
  favNumbers: [ 1, 2, 3, 6, 42 ]
}
```

## Syntax

The Hjson syntax is a superset of JSON ([see json.org](http://json.org/)) but allows you to

- add `#`, `//` or `/**/` comments,
- omit `""` for keys,
- omit `""` for strings,
- omit `,` at the end of a line and
- use multiline strings with proper whitespace handling.

#### Details

- Keys

  You only need to add quotes if the key name includes whitespace or any of these characters: `{}[],:`.

- Strings

  When you omit quotes the string ends at the newline. Preceding and trailing whitespace is ignored as are escapes.

  A value that is a *number*, `true`, `false` or `null` in JSON is not considered a string. E.g. `3` is a number but `3 times` is a string. `true` is the value *true* but `true or false` is a string.

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

- Mime Type

  `text/hjson`

- File extension

  `.hjson`

- Header

  Hjson does not hava a header but if you want to indicate the file type (in an rc file or in a database) you can use `#hjson` in the first line.

## Platforms

Platform | Source | Download
-------- | ------ | --------
JavaScript, Node.js & Browser | [GitHub](https://github.com/laktak/hjson-js) | [![NPM version](https://img.shields.io/npm/v/hjson.svg?style=flat-square)](http://www.npmjs.com/package/hjson)
Python   | [GitHub](https://github.com/laktak/hjson-py) | [![PyPI version](https://img.shields.io/pypi/v/hjson.svg?style=flat-square)](https://pypi.python.org/pypi/hjson)
C#, .Net | [GitHub](https://github.com/laktak/hjson-cs) | [![nuget version](https://img.shields.io/nuget/v/Hjson.svg?style=flat-square)](https://www.nuget.org/packages/Hjson/)

Please [open an issue](https://github.com/laktak/hjson/issues) if you port Hjson to another platform/language.

#### Use with

- [config (npm)](https://www.npmjs.com/package/config)

## Tools

Name     | Source | Download
-------- | ------ | --------
Conversion Tool/CLI (multi-platform) | [GitHub](https://github.com/laktak/hjson-js) | [![NPM version](https://img.shields.io/npm/v/hjson.svg?style=flat-square)](http://www.npmjs.com/package/hjson)
Gulp Task  | [GitHub](https://github.com/laktak/gulp-hjson)  | [![NPM version](https://img.shields.io/npm/v/gulp-hjson.svg?style=flat-square)](http://www.npmjs.com/package/gulp-hjson)
Grunt Task | [GitHub](https://github.com/laktak/grunt-hjson) | [![NPM version](https://img.shields.io/npm/v/grunt-hjson.svg?style=flat-square)](http://www.npmjs.com/package/grunt-hjson)

## Editor Syntax

Name     | Source | Download
-------- | ------ | --------
Sublime Text | [GitHub](https://github.com/laktak/sublime-hjson) | [packagecontrol.io](https://packagecontrol.io/packages/Hjson)
Notepad++    | [GitHub](https://github.com/laktak/npp-hjson) | see source

## History

- 2015-01-11: Simplified the syntax for quoteless keys. Previously only alphanumeric keys were allowed without quotes.
- 2015-01-11: Fixed multiline strings: OS/file independent (EOL is always `\n`). Also the last LF is removed to allow for better formatting.
- 2015-01-06: Simplified the syntax for quoteless strings. Previously unquoted strings starting with a *number*, `true`, `false` or `null` were not allowed.
- 2015-01-02: Added // and /**/ comment support
- 2014-12-02: Added mime type and file extension.
- 2014-05-09: Added multiline strings.
- 2014-03-19: First draft
