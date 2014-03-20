
# HJSON is JSON - commas + comments

JSON is a data-interchange format that can be easily processed by machines.

HJSON's goal is to be a *"JSON" that can be easily parsed and written by humans*. It should be used for configuration files, for debug output or where it is likely that JSON data is read or will be edited by a human.

In HJSON, you can

- omit `,` at the end of a line.
- omit `""` for keys that contain only `letters` and `digits`.
- omit `""` for strings values that
  - do not start with a `digit`, `-`, `{`, `[` or `#`,
  - do not start with the keywords `true`, `false` or `null` and
  - do not use escapes.
  (The string terminates at the newline.)
- add `# comments`  (the parser treats comments like whitespace).
- or use JSON (HJSON is a superset).


That means that you can write:
```
{
  # look, no quotes or commas!
  foo: Hello World!
  bar: Hello HJSON!
}
```

instead of:
```
{
  "foo": "Hello World!",
  "bar": "Hello HJSON!"
}
```

## Why?

Plain JSON is not optimal for humans to write because we often forget commas, add trailing commas by mistake or simply wish to add a comment.

Existing formats like XML or Yaml are completely different from JSON while HJSON tries to be JSON with a little less syntax.

HJSON is not intended to replace JSON. It should be used when transferring data from and to humans but not between machines.

## Implementation

- JavaScript
  - https://github.com/laktak/hjson-js

## Sample:

```
{
  # comments are treated like whitespace - they are not parsed

  # text
  text:        This is a valid string value.
  quote:       "You need quotes\nfor escapes"
  otherwise:   a \ is just a \

  # keys
  abc123:      no quotes for keys that contain only a-z, A-Z and 0-9
  "a/b.c ":    a key with any other characters still needs quotes

  # comma
  commas:      "can be omitted at the end of the line"
  but:         [ 1, 2, 3 ] # not between elements on the same line
  trailing:    [ 1, 2, 3, ] # a trailing comma is OK

  # numbers, keywords and arrays work just like in JSON
  number:      5
  negative:    -4.2
  yes:         true
  no:          false
  null:        null
  array:       [ 1, 2 ]
  array2:      [
    1
    2
  ]
}
```

is equivalent to the following JSON:

```
{
  "text": "This is a valid string value.",
  "quote": "You need quotes\nfor escapes",
  "otherwise": "a \\ is just a \\",
  "abc123": "no quotes for keys that contain only a-z, A-Z and 0-9",
  "a/b.c ": "a key with any other characters still needs quotes",
  "commas": "can be omitted at the end of the line",
  "but": [ 1, 2, 3 ],
  "trailing": [ 1, 2, 3 ],
  "number": 5,
  "negative": -4.2,
  "yes": true,
  "no": false,
  "null": null,
  "array": [ 1, 2 ],
  "array2": [
    1,
    2
  ]
}
```
