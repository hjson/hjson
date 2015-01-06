
# Hjson, the Human JSON

<span class="big">A configuration file format that caters to humans and helps reduce the errors they make.</span>

## Intro

### Comments, yay!

**"What exactly is this value? A comment would help!"**

Sure, comments allow you to document your data.

```
{
  # specify rate in requests/second
  "rate": 1000
  // maybe you prefer js style comments
  /* or if you feel old fashioned */
}
```

### Quotes

**"Why do I have to place key names in quotes?"**

Glad you asked. Actually you don't need to do that for alphanumeric keys.

```
{
  key: "value"
}
```

### More Quotes

**"Come to think of it, why do I have to place strings in quotes?"**

You don't. Quotes for strings are optional as well!

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
  # write a regex without escaping the escape
  regex: ^\d*\.{0,1}\d+$

  # quotes in the content need no escapes
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

Can't make up your mind or was that copy & paste?

Like JavaScript, Hjson totally respects your choice of trailing commas.

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

### JavaScript

**"OMG, you broke JavaScript!"**

JavaScript Object Notation (JSON) is a lightweight, text-based, language-independent data interchange format. It shares some of JavaScripts syntax but it's not JavaScript.

```
JSON is not JavaScript.
```

### JSON

**"OK but OMG, now you broke JSON!"**

JSON is a great tool that does its job very well. Maybe too well. JSON is a great *hammer* but not everything is a nail.

Configuration files are edited by end-users, not developers. Users should not have to worry about putting commas in the correct place. Software should empower the user not hinder him.

```
JSON is a great hammer but
not everything is a nail.

Hjson does not replace JSON.
Use it for configuration files
and things like debug dumps.

For anything else use JSON.
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
