/*! @preserve
 * Hjson v1.7.6
 * http://hjson.org
 *
 * Copyright 2014, 2015 Christian Zangl, MIT license
 * Details and documentation:
 * https://github.com/laktak/hjson-js
 *
 * This code is based on the the JSON version by Douglas Crockford:
 * https://github.com/douglascrockford/JSON-js (json_parse.js, json2.js)
 */

/*

  This file creates a Hjson object:


    Hjson.parse(text, options)

      options {
        keepWsc     boolean, keep white space and comments. This is useful
                    if you want to edit an hjson file and save it while
                    preserving comments (default false)
      }

      This method parses Hjson text to produce an object or array.
      It can throw a SyntaxError exception.


    Hjson.stringify(value, options)

      value         any JavaScript value, usually an object or array.

      options {     all options are

        keepWsc     boolean, keep white space. See parse.

        bracesSameLine
                    boolean, makes braces appear on the same line as the key
                    name. Default false.

        emitRootBraces
                    boolean, show braces for the root object. Default true.

        quotes      string, controls how strings are displayed.
                    "min"     - no quotes whenever possible (default)
                    "always"  - always use quotes

        space       specifies the indentation of nested structures. If it is
                    a number, it will specify the number of spaces to indent
                    at each level. If it is a string (such as '\t' or '  '),
                    it contains the characters used to indent at each level.

        eol         specifies the EOL sequence (default is set by
                    Hjson.setEndOfLine())
      }

      This method produces Hjson text from a JavaScript value.

      Values that do not have JSON representations, such as undefined or
      functions, will not be serialized. Such values in objects will be
      dropped; in arrays they will be replaced with null.
      stringify(undefined) returns undefined.


    Hjson.endOfLine()
    Hjson.setEndOfLine(eol)

      Gets or sets the stringify EOL sequence ('\n' or '\r\n').
      When running with node.js this defaults to os.EOL.


    Hjson.rt { parse, stringify }

      This is a shortcut to roundtrip your comments when reading and updating
      a config file. It is the same as specifying the keepWsc option for the
      parse and stringify functions.


    OBSOLETE: Hjson.bracesSameLine()
    OBSOLETE: Hjson.setBracesSameLine(b)

      OBSOLETE: use stringify options instead of this global setting.
      Gets or sets if braces should appear on the same line (for stringify).


  This is a reference implementation. You are free to copy, modify, or
  redistribute.


*/

var Hjson = (function () {
  "use strict";

  var EOL = '\n';
  var defaultBracesSameLine = false;

  var tryParseNumber = function (text, stopAtNext) {
    // Parse a number value.

    var number, string = '', leadingZeros = 0, testLeading = true;
    var at = 0;
    var ch;
    function next() {
      ch = text.charAt(at);
      at++;
      return ch;
    }

    next();
    if (ch === '-') {
      string = '-';
      next();
    }
    while (ch >= '0' && ch <= '9') {
      if (testLeading) {
        if (ch == '0') leadingZeros++;
        else testLeading = false;
      }
      string += ch;
      next();
    }
    if (testLeading) leadingZeros--; // single 0 is allowed
    if (ch === '.') {
      string += '.';
      while (next() && ch >= '0' && ch <= '9')
        string += ch;
    }
    if (ch === 'e' || ch === 'E') {
      string += ch;
      next();
      if (ch === '-' || ch === '+') {
        string += ch;
        next();
      }
      while (ch >= '0' && ch <= '9') {
        string += ch;
        next();
      }
    }

    // skip white/to (newline)
    while (ch && ch <= ' ') next();

    if (stopAtNext) {
      // end scan if we find a control character like ,}] or a comment
      if (ch === ',' || ch === '}' || ch === ']' ||
        ch === '#' || ch === '/' && (text[at] === '/' || text[at] === '*')) ch = 0;
    }

    number = +string;
    if (ch || leadingZeros || !isFinite(number)) {
      return undefined;
    }
    else return number;
  };

  var hjson_parse = (function () {

    // This is a function that can parse a Hjson text, producing a JavaScript
    // data structure. It is a simple, recursive descent parser. It does not use
    // eval or regular expressions, so it can be used as a model for implementing
    // a JSON parser in other languages.

    // We are defining the function inside of another function to avoid creating
    // global variables.

    var text;
    var at;   // The index of the current character
    var ch;   // The current character
    var escapee = {
      '"': '"',
      '\\': '\\',
      '/': '/',
      b:  '\b',
      f:  '\f',
      n:  '\n',
      r:  '\r',
      t:  '\t'
    };
    var keepWsc; // keep whitespace

    // Call error when something is wrong.
    var error = function (m) {
      var i, col=0, line=1;
      for (i = at-1; i > 0 && text[i] !== '\n'; i--, col++) {}
      for (; i > 0; i--) if (text[i] === '\n') line++;
      throw new Error(m + " at line " + line + "," + col + " >>>" + text.substr(at-col, 20) + " ...");
    };

    var next = function (c) {
      // If a c parameter is provided, verify that it matches the current character.

      if (c && c !== ch)
        error("Expected '" + c + "' instead of '" + ch + "'");

      // Get the next character. When there are no more characters,
      // return the empty string.

      ch = text.charAt(at);
      at++;
      return ch;
    };

    var peek = function (offs) {
      // range check is not required
      return text.charAt(at + offs);
    };

    var string = function () {
      // Parse a string value.
      var hex, i, string = '', uffff;

      // When parsing for string values, we must look for " and \ characters.
      if (ch === '"') {
        while (next()) {
          if (ch === '"') {
            next();
            return string;
          }
          if (ch === '\\') {
            next();
            if (ch === 'u') {
              uffff = 0;
              for (i = 0; i < 4; i++) {
                hex = parseInt(next(), 16);
                if (!isFinite(hex))
                  break;
                uffff = uffff * 16 + hex;
              }
              string += String.fromCharCode(uffff);
            }
            else if (typeof escapee[ch] === 'string') string += escapee[ch];
            else break;
          }
          else string += ch;
        }
      }
      error("Bad string");
    };

    var mlString = function () {
      // Parse a multiline string value.
      var string = '', triple = 0;

      // we are at ''' +1 - get indent
      var indent = 0;
      while (true) {
        var c=peek(-indent-5);
        if (!c || c === '\n') break;
        indent++;
      }

      var skipIndent = function () {
        var skip = indent;
        while (ch && ch <= ' ' && ch !== '\n' && skip-- > 0) next();
      };

      // skip white/to (newline)
      while (ch && ch <= ' ' && ch !== '\n') next();
      if (ch === '\n') { next(); skipIndent(); }

      // When parsing multiline string values, we must look for ' characters.
      while (true) {
        if (!ch) error("Bad multiline string");
        else if (ch === '\'') {
          triple++;
          next();
          if (triple === 3) {
            if (string.slice(-1) === '\n') string=string.slice(0, -1); // remove last EOL
            return string;
          }
          else continue;
        }
        else while (triple > 0) {
          string += '\'';
          triple--;
        }
        if (ch === '\n') {
          string += '\n';
          next();
          skipIndent();
        }
        else {
          if (ch !== '\r') string += ch;
          next();
        }
      }
    };

    var keyname = function () {
      // quotes for keys are optional in Hjson
      // unless they include {}[],: or whitespace.

      if (ch === '"') return string();

      var name = "", start = at, space = -1;
      while (true) {
        if (ch === ':') {
          if (!name) error("Found ':' but no key name (for an empty key name use quotes)");
          else if (space >=0 && space !== name.length) { at = start + space; error("Found whitespace in your key name (use quotes to include)"); }
          return name;
        }
        else if (ch <= ' ') {
          if (space < 0) space = name.length;
        }
        else if (ch === '{' || ch === '}' || ch === '[' || ch === ']' || ch === ',') {
          error("Found '" + ch + "' where a key name was expected (check your syntax or use quotes if the key name includes {}[],: or whitespace)");
        }
        else name += ch;
        next();
      }
    };

    var white = function () {
      while (ch) {
        // Skip whitespace.
        while (ch && ch <= ' ') next();
        // Hjson allows comments
        if (ch === '#' || ch === '/' && peek(0) === '/') {
          while (ch && ch !== '\n') next();
        }
        else if (ch === '/' && peek(0) === '*')
        {
          next(); next();
          while (ch && !(ch === '*' && peek(0) === '/')) next();
          if (ch) { next(); next(); }
        }
        else break;
      }
    };

    var tfnns = function () {
      // Hjson strings can be quoteless
      // returns string, true, false, or null.
      var value = ch;
      while (next()) {
        if (value.length === 3 && value === "'''") return mlString();
        var isEol = ch === '\r' || ch === '\n';
        if (isEol || ch === ',' ||
          ch === '}' || ch === ']' ||
          ch === '#' ||
          ch === '/' && (peek(0) === '/' || peek(0) === '*')
          ) {
          var chf = value[0];
          switch (chf) {
            case 'f': if (value.trim() === "false") return false; break;
            case 'n': if (value.trim() === "null") return null; break;
            case 't': if (value.trim() === "true") return true; break;
            default:
              if (chf === '-' || chf >= '0' && chf <= '9') {
                var n = tryParseNumber(value);
                if (n !== undefined) return n;
              }
          }
          if (isEol) {
            // remove any whitespace at the end (ignored in quoteless strings)
            return value.trim();
          }
        }
        value += ch;
      }

      error("End of input while parsing a value");
    };

    var getComment = function (wat) {
      var i;
      wat--;
      // remove trailing whitespace
      for (i = at - 2; i > wat && text[i] <= ' ' && text[i] !== '\n'; i--);
      // but only up to EOL
      if (text[i] === '\n') i--;
      if (text[i] === '\r') i--;
      var res = text.substr(wat, i-wat+1);
      for (i = 0; i < res.length; i++)
        if (res[i] > ' ') return res;
      return "";
    };

    var array = function () {
      // Parse an array value.
      // assumeing ch === '['

      var array = [];
      var kw, wat;
      if (keepWsc) {
        if (Object.defineProperty) Object.defineProperty(array, "__WSC__", { enumerable: false, writable: true });
        array.__WSC__ = kw = [];
      }

      next();
      wat = at;
      white();
      if (kw) kw.push(getComment(wat));
      if (ch === ']') {
        next();
        return array;  // empty array
      }

      while (ch) {
        array.push(value());
        wat = at;
        white();
        // in Hjson the comma is optional and trailing commas are allowed
        if (ch === ',') { next(); wat = at; white(); }
        if (kw) kw.push(getComment(wat));
        if (ch === ']') {
          next();
          return array;
        }
        white();
      }

      error("End of input while parsing an array (did you forget a closing ']'?)");
    };

    var object = function (withoutBraces) {
      // Parse an object value.

      var key, object = {};
      var kw, wat;
      if (keepWsc) {
        if (Object.defineProperty) Object.defineProperty(object, "__WSC__", { enumerable: false, writable: true });
        object.__WSC__ = kw = { c: {}, o: []  };
        if (withoutBraces) kw.noRootBraces = true;
      }

      function pushWhite(key) { kw.c[key]=getComment(wat); if (key) kw.o.push(key); }

      if (!withoutBraces) {
        // assuming ch === '{'
        next();
        wat = at;
      }
      else wat = 1;

      white();
      if (kw) pushWhite("");
      if (ch === '}' && !withoutBraces) {
        next();
        return object;  // empty object
      }
      while (ch) {
        key = keyname();
        white();
        next(':');
        // duplicate keys overwrite the previous value
        object[key] = value();
        wat = at;
        white();
        // in Hjson the comma is optional and trailing commas are allowed
        if (ch === ',') { next(); wat = at; white(); }
        if (kw) pushWhite(key);
        if (ch === '}' && !withoutBraces) {
          next();
          return object;
        }
        white();
      }

      if (withoutBraces) return object;
      else error("End of input while parsing an object (did you forget a closing '}'?)");
    };

    var value = function () {
      // Parse a Hjson value. It could be an object, an array, a string, a number or a word.

      white();
      switch (ch) {
        case '{': return object();
        case '[': return array();
        case '"': return string();
        default: return tfnns();
      }
    };

    var rootValue = function () {
      // Braces for the root object are optional

      white();
      switch (ch) {
        case '{': return object();
        case '[': return array();
      }

      // look if we are dealing with a single JSON value (true/false/null/num/"")
      // if it is multiline we assume it's a Hjson object without root braces.
      for (var i = 0; i < text.length; i++)
        if (text[i] === '\n') return object(true);
      return value();
    };

    // Return the hjson_parse function. It will have access to all of the above
    // functions and variables.

    return function (source, options) {
      var result;

      keepWsc = options && options.keepWsc;
      text = source;
      at = 0;
      ch = ' ';
      result = rootValue();
      white();
      if (ch) error("Syntax error, found trailing characters");

      return result;
    };
  }());


  var hjson_stringify = (function () {

    var needsEscape = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var needsQuotes = /[\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; // like needsEscape but without \\ and \"
    var needsEscapeML = /'''|[\x00-\x09\x0b\x0c\x0e-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; // ''' || (needsQuotes but without \n and \r)
    var startsWithKeyword = /^(true|false|null)\s*((,|\]|\}|#|\/\/|\/\*).*)?$/;
    var meta =
    {  // table of character substitutions
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"' : '\\"',
      '\\': '\\\\'
    };
    var needsEscapeName = /[,\{\[\}\]\s]/;
    var gap = '';
    var indent = '  ';
    // options
    var eol, keepWsc, bracesSameLine, quoteAlways, emitRootBraces;

    function isWhite(c) { return c <= ' '; }

    function quoteReplace(string) {
      return string.replace(needsEscape, function (a) {
        var c = meta[a];
        if (typeof c === 'string') return c;
        else return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      });
    }

    function quote(string, gap, hasComment, isRootObject) {
      if (!string) return '""';

      needsQuotes.lastIndex = 0;
      startsWithKeyword.lastIndex = 0;
      var doEscape = quoteAlways || hasComment || needsQuotes.test(string);

      // Check if we can insert this string without quotes
      // see hjson syntax (must not parse as true, false, null or number)

      var first = string[0], last = string[string.length-1];
      if (doEscape ||
        isWhite(first) ||
        first === '"' ||
        first === '#' ||
        first === '/' && (string[1] === '*' || string[1] === '/') ||
        first === '{' ||
        first === '[' ||
        isWhite(last) ||
        tryParseNumber(string, true) !== undefined ||
        startsWithKeyword.test(string)) {

        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we first check if the string can be expressed in multiline
        // format or we must replace the offending characters with safe escape
        // sequences.

        needsEscape.lastIndex = 0;
        needsEscapeML.lastIndex = 0;
        if (!needsEscape.test(string)) return '"' + string + '"';
        else if (!needsEscapeML.test(string) && !isRootObject) return mlString(string, gap);
        else return '"' + quoteReplace(string) + '"';
      }
      else {
        // return without quotes
        return string;
      }
    }

    function mlString(string, gap) {
      // wrap the string into the ''' (multiline) format

      var i, a = string.replace(/\r/g, "").split('\n');
      gap += indent;

      if (a.length === 1) {
        // The string contains only a single line. We still use the multiline
        // format as it avoids escaping the \ character (e.g. when used in a
        // regex).
        return "'''" + a[0] + "'''";
      }
      else {
        var res = eol + gap + "'''";
        for (i = 0; i < a.length; i++) {
          res += eol;
          if (a[i]) res += gap + a[i];
        }
        return res + eol + gap + "'''";
      }
    }

    function quoteName(name) {
      if (!name) return '""';

      // Check if we can insert this name without quotes

      if (needsEscapeName.test(name)) {
        needsEscape.lastIndex = 0;
        return '"' + (needsEscape.test(name) ? quoteReplace(name) : name) + '"';
      }
      else {
        // return without quotes
        return name;
      }
    }

    function str(value, hasComment, noIndent, isRootObject) {
      // Produce a string from value.

      function startsWithNL(str) { return str && str[str[0] === '\r' ? 1 : 0] === '\n'; }
      function testWsc(str) { return str && !startsWithNL(str); }
      function wsc(str) {
        if (!str) return "";
        for (var i = 0; i < str.length; i++) {
          var c = str[i];
          if (c === '\n' ||
            c === '#' ||
            c === '/' && (str[i+1] === '/' || str[i+1] === '*')) break;
          if (c > ' ') return ' # ' + str;
        }
        return str;
      }

      // What happens next depends on the value's type.

      switch (typeof value) {
        case 'string':
          return quote(value, gap, hasComment, isRootObject);

        case 'number':
          // JSON numbers must be finite. Encode non-finite numbers as null.
          return isFinite(value) ? String(value) : 'null';

        case 'boolean':
          return String(value);

        case 'object':
          // If the type is 'object', we might be dealing with an object or an array or
          // null.

          // Due to a specification blunder in ECMAScript, typeof null is 'object',
          // so watch out for that case.

          if (!value) return 'null';

          var kw, kwl; // whitespace & comments
          if (keepWsc) kw = value.__WSC__;

          var isArray = Object.prototype.toString.apply(value) === '[object Array]';
          var showBraces = isArray || !isRootObject || (kw ? !kw.noRootBraces : emitRootBraces);

          // Make an array to hold the partial results of stringifying this object value.
          var mind = gap;
          if (showBraces) gap += indent;
          var eolMind = eol + mind;
          var eolGap = eol + gap;
          var prefix = noIndent || bracesSameLine ? '' : eolMind;
          var partial = [];

          var i, length; // loop
          var k, v; // key, value

          if (isArray) {
            // The value is an array. Stringify every element. Use null as a placeholder
            // for non-JSON values.

            for (i = 0, length = value.length; i < length; i++) {
              if (kw) partial.push(wsc(kw[i]) + eolGap);
              partial.push(str(value[i], kw ? testWsc(kw[i + 1]) : false, true) || 'null');
            }
            if (kw) partial.push(wsc(kw[i]) + eolMind);

            // Join all of the elements together, separated with newline, and wrap them in
            // brackets.

            if (kw) v = prefix + '[' + partial.join('') + ']';
            else if (partial.length === 0) v = '[]';
            else v = prefix + '[' + eolGap + partial.join(eolGap) + eolMind + ']';
          }
          else {
            // Otherwise, iterate through all of the keys in the object.

            if (kw) {
              kwl = wsc(kw.c[""]);
              var keys=kw.o.slice();
              for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k) && keys.indexOf(k) < 0)
                  keys.push(k);
              }

              for (i = 0, length = keys.length; i < length; i++) {
                k = keys[i];
                if (showBraces || i>0 || kwl) partial.push(kwl + eolGap);
                kwl = wsc(kw.c[k]);
                v = str(value[k], testWsc(kwl));
                if (v) partial.push(quoteName(k) + (startsWithNL(v) ? ':' : ': ') + v);
              }
              if (showBraces || kwl) partial.push(kwl + eolMind);
            }
            else {
              for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                  v = str(value[k]);
                  if (v) partial.push(quoteName(k) + (startsWithNL(v) ? ':' : ': ') + v);
                }
              }
            }

            // Join all of the member texts together, separated with newlines
            if (partial.length === 0) v = '{}';
            else if (showBraces) {
              // and wrap them in braces
              if (kw) v = prefix + '{' + partial.join('') + '}';
              else v = prefix + '{' + eolGap + partial.join(eolGap) + eolMind + '}';
            }
            else v = partial.join(kw ? '' : eolGap);
          }

          gap = mind;
          return v;
      }
    }

    // Return the hjson_stringify function. It will have access to all of the above
    // functions and variables.

    return function (value, opt) {
      var i, space;

      eol = EOL;
      indent = '  ';
      keepWsc = false;
      bracesSameLine = defaultBracesSameLine;
      emitRootBraces = true;
      quoteAlways = false;

      if (opt && typeof opt === 'object') {
        if (opt.eol === '\n' || opt.eol === '\r\n') eol = opt.eol;
        space = opt.space;
        keepWsc = opt.keepWsc;
        bracesSameLine = opt.bracesSameLine || defaultBracesSameLine;
        emitRootBraces = opt.emitRootBraces;
        quoteAlways = opt.quotes === 'always';
      }

      // If the space parameter is a number, make an indent string containing that
      // many spaces. If it is a string, it will be used as the indent string.

      if (typeof space === 'number') {
        indent = '';
        for (i = 0; i < space; i++) indent += ' ';
      }
      else if (typeof space === 'string')
        indent = space;

      // Return the result of stringifying the value.
      return str(value, null, true, true);
    };
  }());

  return {
    parse: hjson_parse,
    stringify: hjson_stringify,
    endOfLine: function() { return EOL; },
    setEndOfLine: function(eol) {
      if (eol === '\n' || eol === '\r\n') EOL = eol;
    },
    bracesSameLine: function() { return defaultBracesSameLine; },
    setBracesSameLine: function(v) { defaultBracesSameLine = v; },

    // round trip shortcut
    rt: {
      parse: function(text, options) {
        (options=options||{}).keepWsc=true;
        return hjson_parse(text, options);
      },
      stringify: function(value, options) {
        (options=options||{}).keepWsc=true;
        return hjson_stringify(value, options);
      },
    },
  };

}());

// node.js
if (typeof module === "object") {
  if (typeof require === "function") {
    var os=require('os');
    Hjson.setEndOfLine(os.EOL);
  }
  module.exports=Hjson;
}
