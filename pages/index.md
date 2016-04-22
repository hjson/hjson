
<img src="hjson1.gif" class="img-responsive center-block">

# Hjson, the Human JSON

<span class="big">A configuration file format for humans. Relaxed syntax, fewer mistakes, more comments.</span> <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://hjson.org/" data-text="Human JSON for configs!" data-hashtags="hjson" data-dnt="true">Tweet</a>

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

## <a id="faq"></a><div class="hicon"></div> FAQ

### What are good uses for Human JSON?

**"I'd like to use Hjson everywhere!"**

Use it for

- config files
- resource files (e.g. a language definition)
- inspection/debugging (e.g. the watch output)
- anytime where the primary purpose is for a Human to view or edit

```
/*
 * Hjson is for Humans,
 * not machines!
 *
 * You should convert Hjson to JSON
 * before you send it to one.
 */
```

### What are bad uses for Human JSON?

**"Hjson is a bad idea!"**

Do not use it for

- protocols
- databases

Something like a REST service should never use Hjson. If you are writing a REST debugger you can convert to/from Hjson when the data is viewed by a human.

```
/*
 * Always use the right tool for the job.
 */
```

### But JavaScript!?

**"OMG, you broke JavaScript!"**

JSON is not JavaScript, it's a data interchange format that can be used in many languages (50+, see [hjson.org](http://hjson.org)).

```
/*
 * Hjson, like JSON, is not limited
 * to JavaScript.
 */
```

### But JSON!?

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

### But YAML/HOCON/...!?

**"OK but still, do we need another YAML/HOCON/etc.?"**

YAML expresses structure through whitespace. Significant whitespace is a common source of mistakes that we shouldn't have to deal with.

Both HOCON and YAML make the mistake of implementing too many features (like anchors, sustitutions or concatenation).

JSON5 adds "some minimal syntax features directly from ECMAScript 5". It's focused on developers.

Using JSON for config files is an antipattern. But [apparently](https://docs.npmjs.com/files/package.json) it's still better than YAML. Hjson is trying to change that.

```
/*
 * A data format for Humans
 * should be lean and simple.
 *
 * Human !== Developer
 * Human != Developer
 * Human <> Developer
 * Human .NE. Developer
 * Human ne Developer
 * Human /= Developer
 * Human '= Developer
 * Human ~= Developer
 * Human -ne Developer
 */
```

### Can I minify Hjson?

**"Just because!"**

Hjson is for Humans so minifying it would kind of defeat its purpose.

```
/*
 * Er... no!
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

### [insert name here] does not yet support Hjson, can I still use it?

**"I really need comments in my config!"**

If *[insert name here]* supports at least JSON configs you can.

```
# convert to Hjson (once)
$ hjson config.json > config.hjson

# edit/document the config
$ nano config.hjson

# then convert back to json
# every time you update config.hjson
$ hjson -j config.hjson > config.json
```

### <a id="pronounce"></a> How do I pronounce Hjson?

**What should I call this thing?**

You should/can pronounce it "H-json".

As for how to pronounce JSON, [watch this](https://www.youtube.com/watch?v=zhVdWQWKRqM).

```
/*
 * h-jason
 */
```
