
# Hjson is JSON - commas + comments for Humans

JSON is a data-interchange format that can be easily processed by machines.

Hjson tries to be close to JSON, so you don't have to learn anything new, but to make it easier to be parsed and written by humans. It should be used for configuration files, for debug output or where it is likely that JSON data is read or will be edited by a human.

In Hjson, you can

- omit `,` at the end of a line.
- omit `""` for keys that contain only `letters` and `digits`.
- omit `""` for strings values that
  - do not start with a `digit`, `-`, `{`, `[` or `#`,
  - do not start with the keywords `true`, `false` or `null` and
  - do not use escapes.
  (The string terminates at the newline.)
- add `# comments`  (the parser treats comments like whitespace).
- or use JSON (Hjson is a superset).


That means that you can write:
```
{
  # look, no quotes or commas!
  foo: Hello World!
  bar: Hello Hjson!
}
```

instead of:
```
{
  "foo": "Hello World!",
  "bar": "Hello Hjson!"
}
```

## Why?

Plain JSON is not optimal for humans to write because we often forget commas, add trailing commas by mistake or simply wish to add a comment.

Hjson is not intended to replace JSON. Hjson should be used when humans have to view or edit a file. JSON should be used when transferring data between machines.

### Why not use an existing format?

- XML is too verbose.
- YAML introduces [features](http://en.wikipedia.org/wiki/YAML#Advanced_components_of_YAML) that make it more complex than it should be. You can't just not use them since they may be used by someone else so you will have to deal with them.
- "CSON is fantastic for developers writing their own configuration to be executed on their own machines, but bad for configuration you can't trust."
- JSON - see above.

The modifications to the JSON parser/stringifier (below) are minimal so it should be quite easy to port it to other languages.

## Implementations

- JavaScript
  - https://github.com/laktak/hjson-js

- C#
  - https://github.com/laktak/hjson-cs

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
  "text":      "This is a valid string value.",
  "quote":     "You need quotes\nfor escapes",
  "otherwise": "a \\ is just a \\",
  "abc123":    "no quotes for keys that contain only a-z, A-Z and 0-9",
  "a/b.c ":    "a key with any other characters still needs quotes",
  "commas":    "can be omitted at the end of the line",
  "but":       [ 1, 2, 3 ],
  "trailing":  [ 1, 2, 3 ],
  "number":    5,
  "negative":  -4.2,
  "yes":       true,
  "no":        false,
  "null":      null,
  "array":     [ 1, 2 ],
  "array2":    [
    1,
    2
  ]
}
```
