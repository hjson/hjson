
# Hjson, the Human JSON

A data format that caters to humans and helps reduce the errors they make.

## Intro

See the full intro at [laktak.github.io/hjson](http://laktak.github.io/hjson/).

```
{
  # comments are useful
  "rate": 1000 # specify in requests/second

  # key names do not need to be placed in quotes
  key: "value"

  # most of the time you don't need quotes for strings
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

  # Arrays are sometimes easier to read
  # when written on a single line.
  favNumbers: [ 1, 2, 3, 6, 42 ]
}
```

## Syntax

The Hjson syntax is a superset of JSON ([see json.org](http://json.org/)) but allows you to

- omit `,` at the end of a line,
- omit `""` for keys that contain only `letters` and `digits`,
- omit `""` for strings values that
  - do not start with a `digit`, `-`, `{`, `[` or `#`,
  - do not start with the keywords `true`, `false` or `null` and
  - do not use escapes
  (The string terminates at the newline.)
- add `# comments`  (the parser treats comments like whitespace),
- use multiline strings with proper whitespace handling:
  - starts with triple quotes `'''`, whitespace on the first line is ignored
  - `'''` defines the head, on the following lines all whitespace up to this column is ignored
  - all other whitespace is assumed to be part of the string.
  - ends with triple quotes `'''`.

## Download

- [Hjson for JavaScript](https://github.com/laktak/hjson-js) (Node.js/Browser)
- [Conversion Tool/CLI](https://www.npmjs.org/package/hjson) (Node.js)
- [Hjson Gulp Task](https://github.com/laktak/gulp-hjson)
- [Hjson for .Net/C#](https://github.com/laktak/hjson-cs)
