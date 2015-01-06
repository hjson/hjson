
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

- omit `,` at the end of a line
- omit `""` for *alphanumeric* keys
- omit `""` for strings values (unless they start with `{` or `[`)
- add `#`, `//` or `/**/` comments (the parser treats comments like whitespace)
- use multiline strings with proper whitespace handling:
  - starts with triple quotes `'''`, whitespace on the first line is ignored
  - `'''` defines the head, on the following lines all whitespace up to this column is ignored
  - all other whitespace is assumed to be part of the string.
  - ends with triple quotes `'''`.

For quoteless strings, be aware that if a string contains a single *number*, `true`, `false` or `null`, it will be converted.

## Mime Type & File Extension

- mime type: `text/hjson`
- file extension: `.hjson`

## Download

- [JavaScript](https://github.com/laktak/hjson-js) (Node.js & Browser)
- [Python](https://github.com/laktak/hjson-py)
- [C#, .Net](https://github.com/laktak/hjson-cs)

Please [open an issue](https://github.com/laktak/hjson/issues) if you port Hjson to another platform/language.

## Tools

- [Conversion Tool/CLI](https://www.npmjs.org/package/hjson) (multi-platform)
- [Gulp Task](https://github.com/laktak/gulp-hjson)
- [Grunt Task](https://github.com/laktak/grunt-hjson)

## Editor Syntax

- [Sublime Text](https://github.com/laktak/sublime-hjson) (`Hjson` in Package Control)
- [Notepad++](https://github.com/laktak/npp-hjson)

## History

- 2015-01-06

  Simplified the syntax for quoteless strings. Previously strings starting with a *number*, `true`, `false` or `null` would throw an error.
