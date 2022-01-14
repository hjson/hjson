
## Hjson, a user interface for JSON

### Status

This project is now entirely community-supported. If you would like to help or want to report an issue, please see our [GitHub](https://github.com/hjson/).

We are also looking for maintainers for our [.NET](https://github.com/hjson/hjson-cs), [Go](https://github.com/hjson/hjson-go) and [Java](https://github.com/hjson/hjson-java) packages. If you think you could help or you just think that Hjson is fantastic, then please consider contributing or becoming a maintainer.

<div class="pkgs col2"> [![npm](https://img.shields.io/npm/v/hjson.svg?style=flat-square)](http://www.npmjs.com/package/hjson)  [![nuget](https://img.shields.io/nuget/v/Hjson.svg?style=flat-square)](https://www.nuget.org/packages/Hjson/)  [![go](https://img.shields.io/github/release/hjson/hjson-go.svg?style=flat-square&label=go-pkg)](https://github.com/hjson/hjson-go/releases)  [![maven](https://img.shields.io/maven-central/v/org.hjson/hjson.svg?style=flat-square&label=maven)](http://search.maven.org/#search&#124;ga&#124;1&#124;g%3A%22org.hjson%22%20a%3A%22hjson%22)  [![packagist](https://img.shields.io/packagist/v/laktak/hjson.svg?style=flat-square)](https://packagist.org/packages/laktak/hjson)  [![PyPI version](https://img.shields.io/pypi/v/hjson.svg?style=flat-square)](https://pypi.python.org/pypi/hjson)  [![C++](https://img.shields.io/github/release/hjson/hjson-cpp.svg?style=flat-square&label=c%2b%2b)](https://github.com/hjson/hjson-cpp/releases)  [![crate](https://img.shields.io/crates/v/serde-hjson.svg?style=flat-square)](https://crates.io/crates/serde-hjson)  [![crate](https://img.shields.io/crates/v/deser-hjson.svg?style=flat-square)](https://crates.io/crates/deser-hjson)  [![gem](https://img.shields.io/gem/v/hjson.svg?style=flat-square)](https://rubygems.org/gems/hjson) [![LuaRocks](https://img.shields.io/luarocks/v/cryi/hjson-lua?style=flat-square)](https://luarocks.org/modules/cryi/hjson-lua) </div>

<div class="pkgs epkgs"> [![Ace](https://img.shields.io/badge/Ace-editor-green.svg?style=flat-square)](https://github.com/ajaxorg/ace-builds) [![Atom](https://img.shields.io/badge/Atom-editor-green.svg?style=flat-square)](https://atom.io/packages/language-hjson) [![IntelliJ](https://img.shields.io/badge/IntelliJ-editor-green.svg?style=flat-square)](https://github.com/hjson/textmate-hjson) [![Notepad++](https://img.shields.io/badge/Notepad%2B%2B-editor-green.svg?style=flat-square)](https://github.com/laktak/npp-hjson) [![Sublime Text](https://img.shields.io/badge/Sublime%20Text-editor-green.svg?style=flat-square)](https://packagecontrol.io/packages/Hjson) [![TextMate & Co](https://img.shields.io/badge/TextMate%20%26%20Co-editor-green.svg?style=flat-square)](https://github.com/hjson/textmate-hjson) [![Vim](https://img.shields.io/badge/Vim-editor-green.svg?style=flat-square)](https://github.com/hjson/vim-hjson) [![VisualStudio](https://img.shields.io/badge/Visual%20Studio-editor-green.svg?style=flat-square)](https://visualstudiogallery.msdn.microsoft.com/7517a276-112b-4772-b6d8-5a1e6b0eb281) [![VS Code](https://img.shields.io/badge/VS%20Code-editor-green.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=laktak.hjson) </div>

### Intro

JSON is easy for humans to read and write... in theory. *In practice* JSON gives us plenty of opportunities to make mistakes without even realizing it.

Hjson is a syntax extension to JSON. It's NOT a proposal to replace JSON or to incorporate it into the JSON spec itself. It's intended to be used like a user interface for humans, to read and edit before passing the JSON data to the machine.

```
{
  # TL;DR
  human:   Hjson
  machine: JSON
}
```



## How does Hjson help?

### Commas!

**Never see a syntax error because of a missing or trailing comma again (unless you try really hard)**.

A good practice is to put each value onto a new line, in this case commas are optional and should be omitted.

```
{
  first: 1
  second: 2
}
```

### Comments

**You are allowed to use comments! *Encouraged, even!***

Comments allow you to document your data inline. You can also use them to comment out values when testing.

```
{
  # hash style comments
  # (because it's just one character)

  // line style comments
  // (because it's like C/JavaScript/...)

  /* block style comments because
     it allows you to comment out a block */

  # Everything you do in comments,
  # stays in comments ;-}
}
```

### Object Names (Keys)

**Object names can be specified without quotes.**

This makes them easier to read.

```
{
  # specify rate in requests/second
  rate: 1000
}
```

### Quoteless Strings

**You can specify strings without quotes.**

In this case only one value per line and no commas are allowed.

```
{
  JSON: "a string"

  Hjson: a string

  # notice, no escape necessary:
  RegEx: \s+
}
```

### Multiline

**Write multiline strings with proper whitespace handling.**

A simple syntax and easy to read.

```
{
  md:
    '''
    First line.
    Second line.
      This line is indented by two spaces.
    '''
}
```

### Punctuators, Spaces and Escapes

JSON and Hjson use the characters `{}[],:` as punctuators to define the structure of the data.

Punctuators and whitespace can't be used in an unquoted key or as the first character of a quoteless string. In this (rather uncommon) case you need to use quotes.

The backslash is only used as an escape character in a quoted string.

```
{
  "key name": "{ sample }"
  "{}": " spaces at the start/end "
  this: is OK though: {}[],:
}
```

### Hjson

**"So this is Hjson."**

If you like it please go ahead and add a star!

<a aria-label="Star hjson on GitHub" data-count-aria-label="# stargazers on GitHub" data-count-api="/repos/hjson/hjson#stargazers_count" data-count-href="/hjson/hjson/stargazers" data-style="mega" data-icon="octicon-star" href="https://github.com/hjson/hjson" class="github-button">Star</a>

Are you a [user](users.html)? Then **ask the [developer](download.html) of your favorite application to add Hjson support**!

Interested in details? [Take a look at the syntax.](syntax.html)

Questions? [See the FAQ.](faq.html)

```
{
  // use #, // or /**/ comments,
  // omit quotes for keys
  key: 1
  // omit quotes for strings
  contains: everything on this line
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
}
```
