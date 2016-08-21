
<img src="hjson1.gif" class="img-responsive center-block">

## Hjson, the Human JSON

<span class="big">A configuration file format for humans. Relaxed syntax, fewer mistakes, more comments.</span> <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://hjson.org/" data-text="Human JSON for configs!" data-hashtags="hjson" data-dnt="true">Tweet</a>

[![NPM](https://img.shields.io/npm/v/hjson.svg?style=flat-square)](http://www.npmjs.com/package/hjson) [![Maven Central](https://img.shields.io/maven-central/v/org.hjson/hjson.svg?style=flat-square)](http://search.maven.org/#search&#124;ga&#124;1&#124;g%3A%22org.hjson%22%20a%3A%22hjson%22) [![PyPI](https://img.shields.io/pypi/v/hjson.svg?style=flat-square)](https://pypi.python.org/pypi/hjson) [![nuget](https://img.shields.io/nuget/v/Hjson.svg?style=flat-square)](https://www.nuget.org/packages/Hjson/) [![Packagist](https://img.shields.io/packagist/v/laktak/hjson.svg?style=flat-square)](https://packagist.org/packages/laktak/hjson) [![crate](https://img.shields.io/crates/v/serde-hjson.svg?style=flat-square)](https://crates.io/crates/serde-hjson) [![Go Pkg](https://img.shields.io/github/release/hjson/hjson-go.svg?style=flat-square&label=go-pkg)](https://github.com/hjson/hjson-go/releases) [![gem](https://img.shields.io/gem/v/hjson.svg?style=flat-square)](https://rubygems.org/gems/hjson)

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

### Braces

**"Are you joking? You can't remove the braces!"**

The most common case is to start the config with an object. In this case you may omit the braces for the root object.

```
// this is a valid config file
joke: My backslash escaped!
```
### Hjson

**"So this is Hjson."**

You like it? Please go ahead [and star it](https://github.com/hjson/hjson), then **ask the developers of your favorite application to add Hjson support**!

<a aria-label="Star hjson on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/hjson/hjson#stargazers_count" data-count-href="/hjson/hjson/stargazers" data-style="mega" data-icon="octicon-star" href="https://github.com/hjson/hjson" class="github-button">Star</a>

[No? Are you a skeptic?](faq.html)

<br>Look at nice [Syntax diagrams](syntax.html), [Download](download.html) or read the [FAQ](faq.html).

```
// for your config
// use #, // or /**/ comments,
// omit quotes for keys
key: 1
// omit quotes for strings
string: contains everything until LF
// omit commas at the end of a line
cool: {
  foo: 1
  bar: 2
}
// allow trailing commas
list: [
  1,
  2,
]
// and use multiline strings
realist:
  '''
  My half empty glass,
  I will fill your empty half.
  Now you are half full.
  '''
```
