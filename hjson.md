
# Hjson is JSON - commas + comments for Humans

JSON is a data-interchange format for machines. Hjson tries to be close its syntax, so you don't have to learn anything new, but to make it more readable and easier to edit.

Use it

- for configuration files,
- for debug output
- or where it will be primarily read/edited by a human.

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

## Implementations

- JavaScript & CLI Tool
  - https://github.com/laktak/hjson-js
  I took the standard JSON parser/stringifier and modified it for Hjson. Since they often served as a template for porting JSON to other languages it should make it easier to port Hjson.

- C#
  - https://github.com/laktak/hjson-cs

## Why?

- JSON does not allow comments.

  In configuration files, comments make it easier to describe what each setting does. It also allows you to comment out/toggle settings.

```
# LogLevel: Control the number of messages logged to the error_log.
# Possible values include: debug, info, notice, warn, error, crit, alert, emerg.
#
#LogLevel: warn
#LogLevel: debug
LogLevel: notice
```

- JSON requires commas but does not allow trailing commas. We often get them wrong, especially when using copy & paste.

```
{
  "foo": "Hello World!",
  "bar": "Hello Hjson!"
  "bar2": "Hello Again!"
}
```

- JSON requires quotes for keys and all strings. This does not help readability.

## Why not ...

- XML

  It's widely supported but its syntax is too verbose and it's hard to read.

- YAML

  YAML tries to be a *human friendly data serialization standard for all programming languages*.

  While the basic idea is good, its weak points are:

  - it introduces more syntax
  - its structure relies on identation
  - tabs are not allowed

  The last two points are can be fixed by a good editor. However configuration files often have to be changed in environments that may not have your favorite editor installed.

- CSON

  CSONs parser is not secure, it recommends to be used only with configuration you can trust.

## FAQ:

- Why aren't `{` and `}` optional?

  If they were optional you would have to use identation to define the structure of your data. This can cause problems with tabs and when using unfamiliar editors. In Hjson, like JSON, whitespace is ignored. You can, but you don't have to indent your data.

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
