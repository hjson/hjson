
# Hjson, the Human JSON

<span class="big">A configuration file format for humans. Relaxed syntax, fewer mistakes, more comments.</span>

## Intro

### Comments, yay!

**"What exactly is this value? A comment would help!"**

Sure, comments allow you to document your data.

```
{
  # specify rate in requests/second
  "rate": 1000

  // prefer c-style comments?
  /* feeling old fashioned? */
}
```

### Quotes

**"Why do I have to place key names in quotes?"**

Glad you asked. Actually you don't need to do that!

```
{
  key: "value"
}
```

### Commas

**"Now I forgot the comma at the end."**

So you did. But Hjson does not mind as long as you put each value on a new line.

```
{
  one: 1
  two: 2
  three: 4 # oops
}
```

### Quoteless

**"Come to think of it, why do I have to place strings in quotes?"**

You are right. Let's make quotes for strings optional as well.

```
{
  text: look ma, no quotes!

  # To make your life easy, put the next
  # value or comment on a new line.
  # It's also easier to read!
}
```

### Escapes

**"When there are no quotes, do I need escapes?"**

No, escapes are gone from unquoted strings.

```
{
  # write a regex without escaping the escape
  regex: ^\d*\.{0,1}\d+$

  # quotes in the content need no escapes
  inject: <div class="important"></div>

  # inside quotes, escapes work
  # just like in JSON
  escape: "\\ \n \t \""
}
```

### Multiline

**"Multiline strings are kind of hard to read."**

`"I wonder\nwhy you\nsay that."` Hjson will let you write them with proper whitespace handling.

```
{
  haiku:
    '''
    JSON I love you.
    But strangled is my data.
    This, so much better.
    '''
}
```

### JavaScript

**"OMG, you broke JavaScript!"**

JSON is not JavaScript, it's a data interchange format that can be used in many languages.

```
/*
 * Hjson, like JSON, is not limited
 * to JavaScript.
 */
```

### JSON

**"OK but OMG, now you broke JSON!"**

JSON is a great data format that can be edited by hand but it has a very strict syntax.

A more forgiving format makes it easier for Humans to write, it reduces unnecessary mistakes and is also nicer to read.

```
/*
 * Hjson does not replace JSON.
 * Use it for configuration files
 * and things like debug dumps.
 *
 * For protocols and anything
 * else use JSON.
 */
```

### YAML

**"OK but still, do we need another YAML/HOCON/etc.?"**

YAML expresses structure through whitespace. Significant whitespace is a common source of mistakes that we shouldn't have to deal with.

Both HOCON and YAML make the mistake of implementing too many features (like anchors, sustitutions or concatenation).


```
/*
 * A data format for Humans
 * should be lean and simple.
 */
```

### Round trip

**"Can Hjson keep my comments when updating a config file?"**

Yes, Hjson allows you to round-trip your data, including your comments.

\* But not yet with all implementations, PRs welcome :)

```
var data = Hjson.rt.parse(text);

// use data like a normal object
data.foo = "text";

// stringify with comments
text = Hjson.rt.stringify(data);
```


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

  You only need to add quotes if the key name includes whitespace or any of these characters: `{}[],:`.

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

- Mime Type

  `text/hjson` (pending)

- File extension

  `.hjson`

- Header

  Hjson does not have a header but if you want to indicate the file type (in an rc file or in a database) you can use `#hjson` in the first line.

## Get Hjson

Platform | Source | Package
-------- | ------ | -------
JavaScript, Node.js & Browser | [hjson-js](https://github.com/laktak/hjson-js) | [![NPM version](https://img.shields.io/npm/v/hjson.svg?style=flat-square)](http://www.npmjs.com/package/hjson)
Java     | [hjson-java](https://github.com/laktak/hjson-java) | [![Maven Central](https://img.shields.io/maven-central/v/org.hjson/hjson.svg?style=flat-square)](http://search.maven.org/#search&#124;ga&#124;1&#124;g%3A%22org.hjson%22%20a%3A%22hjson%22)
Python   | [hjson-py](https://github.com/laktak/hjson-py) | [![PyPI version](https://img.shields.io/pypi/v/hjson.svg?style=flat-square)](https://pypi.python.org/pypi/hjson)
C#, .Net | [hjson-cs](https://github.com/laktak/hjson-cs) | [![nuget version](https://img.shields.io/nuget/v/Hjson.svg?style=flat-square)](https://www.nuget.org/packages/Hjson/)
PHP      | [hjson-php](https://github.com/laktak/hjson-php) | [![Packagist](https://img.shields.io/packagist/v/laktak/hjson.svg?style=flat-square)](https://packagist.org/packages/laktak/hjson)

#### Partial implementations

Platform | Description | Source |
-------- | ------ | -------
Go       | Parser and unmarshaller using a [slightly different syntax](https://github.com/client9/xson/tree/master/hjson#differences-andor-bugs) | [xson](https://github.com/client9/xson)
C        | jzon variant, based on Hjson | [jzon-c](https://github.com/KarlZylinski/jzon-c)

Please [open an issue](https://github.com/laktak/hjson/issues) if you port Hjson to another platform/language.

#### Editor Syntax

Name     | Source | Package
-------- | ------ | -------
Atom | [language-hjson](https://github.com/dannyfritz/language-hjson) | [package](https://atom.io/packages/language-hjson)
Sublime Text / TextMate | [sublime-hjson](https://github.com/laktak/sublime-hjson) | [packagecontrol.io](https://packagecontrol.io/packages/Hjson)
Notepad++    | [npp-hjson](https://github.com/laktak/npp-hjson) | see source

#### Integrated with

Name     | Link | Details
-------- | ---- | -------
**any-json**: convert (almost) anything to JSON | [![NPM version](https://img.shields.io/npm/v/any-json.svg?style=flat-square)](http://www.npmjs.com/package/any-json) | [see readme](https://github.com/laktak/any-json#usage)
**gulp**: the streaming build system | [![NPM version](https://img.shields.io/npm/v/gulp-hjson.svg?style=flat-square)](http://www.npmjs.com/package/gulp-hjson) | [see readme](https://github.com/laktak/gulp-hjson#usage)
**grunt**: the JavaScript task runner | [![NPM version](https://img.shields.io/npm/v/grunt-hjson.svg?style=flat-square)](http://www.npmjs.com/package/grunt-hjson) | [see readme](https://github.com/laktak/grunt-hjson#usage)
**hjsonify**: a browserify transform to require Hjson files | [![NPM version](https://img.shields.io/npm/v/hjsonify.svg?style=flat-square)](http://www.npmjs.com/package/hjsonify) | [see readme](https://github.com/dannyfritz/hjsonify#usage)
**node-config**: node.js application configuration | [![NPM version](https://img.shields.io/npm/v/config.svg?style=flat-square)](http://www.npmjs.com/package/config) | [see wiki](https://github.com/lorenwest/node-config/wiki/Configuration-Files#human-json---hjson)
**nconf**: hierarchical node.js configuration | [![NPM version](https://img.shields.io/npm/v/nconf.svg?style=flat-square)](http://www.npmjs.com/package/nconf) | `nconf.file({ file: 'file.hjson',`<br>`   format: require('hjson').rt });`<br>`// round trips your comments`
**rc**: non-configurable configuration loader for lazy people. | [![NPM version](https://img.shields.io/npm/v/rc.svg?style=flat-square)](http://www.npmjs.com/package/rc) | `var conf=require('rc')('appname', {/*defaults*/},`<br>`  null, require('hjson').parse);`

## Tools

All versions work on Linux, OS X & Windows and allow you to convert Hjson from/to JSON.

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

- 2015-05-06: Allow root braces to be omitted.
- 2015-01-11: Simplified the syntax for quoteless keys. Previously only alphanumeric keys were allowed without quotes.
- 2015-01-11: Fixed multiline strings: OS/file independent (EOL is always `\n`). Also the last LF is removed to allow for better formatting.
- 2015-01-06: Simplified the syntax for quoteless strings. Previously unquoted strings starting with a *number*, `true`, `false` or `null` were not allowed.
- 2015-01-02: Added // and /**/ comment support
- 2014-12-02: Added mime type and file extension.
- 2014-05-09: Added multiline strings.
- 2014-03-19: First draft
