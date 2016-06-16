
## <a id="faq"></a><div class="hicon"></div> Hjson Syntax

The Hjson syntax is similar to [JSON](http://json.org/) but allows you to

- add `#`, `//` or `/**/` comments,
- omit `""` for keys,
- omit `""` for strings (terminated by LF, no escapes),
- omit `{}` for the root object,
- omit `,` at the end of a line,
- add trailing commas and
- use multiline strings with proper whitespace handling.

Because the punctuator characters `{}[],:` are used to define the structure of the Hjson text, you need to use quotes

- if your key includes a punctuator or space
- if your string starts with a punctuator

<a href="rfc.html" target="_blank">View the RFC draft</a>

%%%

### Details

#### Keys

You only need to add quotes if the key name includes whitespace or any of the punctuators (`{}[],:`).

For example:

- `foo`
- `"test case"`
- `"{option}"`

#### Quoteless Strings

A quoteless string cannot start with any of the punctuators (`{}[],:`).

It is taken exactly as is up to the linefeed/newline, preceding and trailing whitespace is ignored. As there are no escapes, you do not need to escape the backslash. If you wish to add comments place them on the previous or next line.

The Hjson parser will still detect values (*number*, `true`, `false` or `null`) and parse them correctly. For example

- `3` is the *number* `3`
- `5 times` is the *string* `"5 times"`
- `true` is the *boolean* `true`
- `7 # minutes` is the *number* `7` followed by a comment
- `\s#([0-9a-fA-F]{3})` is the *string* `"\\s#([0-9a-fA-F]{3})"`

#### Multiline Strings

- Start with triple quotes `'''`, whitespace on the first line is ignored
- `'''` defines the head, on the following lines all whitespace up to this column is ignored
- all other whitespace is assumed to be part of the string.
- ends with triple quotes `'''`. The last newline is ignored to allow for better formatting.

A multiline string is OS and file independent. The line feed is always `\n`.

For example

```
haiku:
  '''
  My half empty glass,
  I will fill your empty half.
  Now you are half full.
  '''
```

Is the *string* `"My half empty glass,\nI will fill your empty half.\nNow you are half full."`

#### Commas

You can separate your values/members either with a comma or a new line.

Unlike JSON, trailing commas are ignored and do not produce a syntax error.

For example:

```
{
  one: 1
  two: 2,
  more: [3,4,5]
  trailing: 6,
}
```

#### Comments

`#` or `//` starts a single line comment.

`/*` starts a multiline comment that ends with `*/`.

#### Root Object

Braces for the root object (meaning it is not included in another object) are optional.

For example:

```
# this is the root object
top: blue
side: { # a child object, requires braces
  border: black
}
bottom: red
```

#### File extension

`.hjson`

#### Encoding

`.hjson` files must be encoded in UTF-8 (without a BOM).

#### Header

Hjson does not have a header but if you want to indicate the file type you can use `#hjson` on the first line.

