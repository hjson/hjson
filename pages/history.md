
# <div class="hicon" style="font-size: 80px;"></div> History

Hjson was born out of frustration while editing JSON config files (e.g. `package.json`).

- 2014-03-19: First draft
- 2014-05-09: Added multiline strings.
- 2014-12-02: Added mime type and file extension.
- 2015-01-02: Added // and /**/ comment support
- 2015-01-06: Simplified the syntax for quoteless strings. Previously unquoted strings starting with a *number*, `true`, `false` or `null` were not allowed.
- 2015-01-11: Fixed multiline strings: OS/file independent (EOL is always `\n`). Also the last LF is removed to allow for better formatting.
- 2015-01-11: Simplified the syntax for quoteless keys. Previously only alphanumeric keys were allowed without quotes.
- 2015-05-06: Allow root braces to be omitted.
- 2016-09-27: Deprecate optional root braces.
- 2017-07-13: Added support for single quoted strings.
