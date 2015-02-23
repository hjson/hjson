
# Hjson, the Human JSON

A configuration file format that caters to humans and helps reduce the errors they make.

## Intro

```
{
  # This is Hjson

  /*

  Why?

  JSON is a great tool that does its job very well. Maybe too well. JSON is a
  great hammer but not everything is a nail.

  Configuration files are edited by end-users, not developers. Users should not
  have to worry about putting commas in the correct place. Software should
  empower the user not hinder him.

  */

  "JSON": "is Hjson",

  but: commas and quotes are optional!
  and: those are allowed: // /**/ #
  so:  less mistakes, more comments ;-)
}
```

For details see [hjson.org](http://hjson.org).


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

  `text/hjson` (pending)

- File extension

  `.hjson`

- Header

  Hjson does not have a header but if you want to indicate the file type (in an rc file or in a database) you can use `#hjson` in the first line.

## Platforms

Platform | Source | Download
-------- | ------ | --------
JavaScript, Node.js & Browser | [GitHub](https://github.com/laktak/hjson-js) | [![NPM version](https://img.shields.io/npm/v/hjson.svg?style=flat-square)](http://www.npmjs.com/package/hjson)
Python   | [GitHub](https://github.com/laktak/hjson-py) | [![PyPI version](https://img.shields.io/pypi/v/hjson.svg?style=flat-square)](https://pypi.python.org/pypi/hjson)
C#, .Net | [GitHub](https://github.com/laktak/hjson-cs) | [![nuget version](https://img.shields.io/nuget/v/Hjson.svg?style=flat-square)](https://www.nuget.org/packages/Hjson/)

Please [open an issue](https://github.com/laktak/hjson/issues) if you port Hjson to another platform/language.

#### Editor Syntax

Name     | Source | Download
-------- | ------ | --------
Atom | [GitHub](https://github.com/dannyfritz/language-hjson) | [package](https://atom.io/packages/language-hjson)
Sublime Text / TextMate | [GitHub](https://github.com/laktak/sublime-hjson) | [packagecontrol.io](https://packagecontrol.io/packages/Hjson)
Notepad++    | [GitHub](https://github.com/laktak/npp-hjson) | see source

#### Integrated with

Name     | Link | Details
-------- | ---- | -------
**gulp**: the streaming build system | [![NPM version](https://img.shields.io/npm/v/gulp-hjson.svg?style=flat-square)](http://www.npmjs.com/package/gulp-hjson) | [see readme](https://github.com/laktak/gulp-hjson#usage)
**Grunt**: the JavaScript task runner | [![NPM version](https://img.shields.io/npm/v/grunt-hjson.svg?style=flat-square)](http://www.npmjs.com/package/grunt-hjson) | [see readme](https://github.com/laktak/grunt-hjson#usage)
**hjsonify**: a browserify transform to require Hjson files | [![NPM version](https://img.shields.io/npm/v/hjsonify.svg?style=flat-square)](http://www.npmjs.com/package/hjsonify) | [see readme](https://github.com/dannyfritz/hjsonify#usage)
**node-config**: node.js application configuration | [![NPM version](https://img.shields.io/npm/v/config.svg?style=flat-square)](http://www.npmjs.com/package/config) | [see wiki](https://github.com/lorenwest/node-config/wiki/Configuration-Files#human-json---hjson)
**nconf**: hierarchical node.js configuration | [![NPM version](https://img.shields.io/npm/v/nconf.svg?style=flat-square)](http://www.npmjs.com/package/nconf) | `nconf.file({ file: 'file.hjson',`<br>`   format: require('hjson').rt });`<br>`// round trips your comments`
**rc**: non-configurable configuration loader for lazy people. | [![NPM version](https://img.shields.io/npm/v/rc.svg?style=flat-square)](http://www.npmjs.com/package/rc) | `var conf=require('rc')('appname', {/*defaults*/},`<br>`  null, require('hjson').parse);`

## Conversion

All versions work on Linux, OS X & Windows.

[**node.js**](http://nodejs.org/)

Install with `npm i hjson -g`

`hjson file.json` will convert to Hjson.
`hjson -j file.hjson` will convert to JSON.

[**Python**](https://www.python.org/)

Install with `pip install hjson`

`python -m hjson.tool file.json` will convert to Hjson.
`python -m hjson.tool -j file.hjson` will convert to JSON.

[**C# .Net**](http://www.visualstudio.com/en-US/products/visual-studio-express-vs) & [**Mono**](http://www.mono-project.com/)

As Nuget does not install commandline tools

- please build [from source](https://github.com/laktak/hjson-cs)
- and add `cli\bin\Release` to your path.

`hjsonc file.json` will convert to Hjson.
`hjsonc -j file.hjson` will convert to JSON.


## History

- 2015-01-11: Simplified the syntax for quoteless keys. Previously only alphanumeric keys were allowed without quotes.
- 2015-01-11: Fixed multiline strings: OS/file independent (EOL is always `\n`). Also the last LF is removed to allow for better formatting.
- 2015-01-06: Simplified the syntax for quoteless strings. Previously unquoted strings starting with a *number*, `true`, `false` or `null` were not allowed.
- 2015-01-02: Added // and /**/ comment support
- 2014-12-02: Added mime type and file extension.
- 2014-05-09: Added multiline strings.
- 2014-03-19: First draft
