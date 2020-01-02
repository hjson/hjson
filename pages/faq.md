
## <a id="faq"></a><div class="hicon"></div> Hjson FAQ

### What are good uses for Hjson?

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

### What are bad uses for Hjson?

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

JSON is not JavaScript, it's a data interchange format that can be used in many languages (50+, see [hjson.github.io](https://hjson.github.io)).

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

A lot of projects use JSON for config. Why don't they use YAML or another config format?

IMHO it's because

- JSON is easier to explain (compare the JSON and YAML specs)
- JSON does not suffer from significant whitespace
- JSON is not bloated (it does not have anchors, substitutions or concatenation).
- JSON is easier to implement

So there is obviously a need for a better config format.

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

### What does the H in Hjson stand for?

It's H for Human, Human JSON.

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

You should pronounce it H-json ("aitch-jason").

As for how to pronounce JSON, [watch this](https://www.youtube.com/watch?v=zhVdWQWKRqM).

```
/*
 * h-jason
 */
```


