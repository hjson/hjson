
# Hjson, the Human JSON

<span class="big">A data format that caters to humans and helps reduce the errors they make.</span>

## Intro

### Comments, yay!

**"What exactly is this value? A comment would help!"**

Sure, comments allow you to document your data.

```
{
  # specify rate in requests/second
  "rate": 1000
}
```

### Quotes

**"Why do I have to place key names in quotes?"**

Glad you asked. Actually you don't need to do that.

```
{
  key: "value"
}
```

### More Quotes

**"Come to think of it, why do I have to place strings in quotes?"**

You don't. Quotes for strings are optional as well.

```
{
  text: look ma, no quotes!
}
```

### Escapes

**"When there are no quotes, do I need escapes?"**

No, escapes are gone from unquoted strings.

```
{
  path: c:\windows
  inject: <div class="important"></div>

  # escapes work inside quotes
  escape: "c:\\windows"
}
```


### Commas

**"Now I forgot the comma at the end."**

So you did. But lucky for you, in Hjson they are optional.

```
{
  one: 1
  two: 2
}
```

### More Commas

**"So what if I added a trailing comma?"**

Can't make up or mind or was that copy & paste?

Hjson totally respects your choice of trailing commas. Actually, it ignores them.

```
{
  one: 1,
  two: 2,
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

### Round trip

**"Can Hjson keep my comments when updating a config file?"**

Yes, Hjson allows you to round-trip your data, including your comments.

```
var data = Hjson.parse(text, { keepWsc: true });

// use data like a normal object
data.foo = "text";

// stringify with comments
text = Hjson.stringify(data, { keepWsc: true });
```

### JSON

**"But maybe I want to use JSON here."**

Feel free to use JSON anywhere you like.

```
{
  # Arrays are sometimes easier to read
  # when written on a single line.
  favNumbers: [ 1, 2, 3, 6, 42 ]
}
```

### Finally

**"So where can I use it?"**

You should use it whenever data will be edited or looked at by an actual person.

The best example are configuration files. It also makes debug data dumps easier to read.

```
{
  # npm config
  name: hjson
  description: JSON like data format
  main: ./lib/hjson.js
  version: 1.0.1
  tags:
  [
    json
    hjson
  ]
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
