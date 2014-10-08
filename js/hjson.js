/*
  hjson.js

  Public Domain.

  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

  This file creates a hjson_parse and a hjson_stringify function.


    hjson_parse(text, options)

      options
      {
        keepWsc     boolean, keep white space and comments. This is useful
                    if you want to edit an hjson file and save it while
                    preserving comments (default false)
      }

      This method parses Hjson text to produce an object or array.
      It can throw a SyntaxError exception.

      The code is based on the the JSON version by Douglas Crockford:
      https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js


    hjson_stringify(value, options)
    obsolete: hjson_stringify(value, replacer, space)

      value         any JavaScript value, usually an object or array.

      options
      {
        keepWsc     boolean, keep white space. See parse.

        space       an optional parameter that specifies the indentation
                    of nested structures. If it is a number, it will specify
                    the number of spaces to indent at each level. If it is
                    a string (such as '\t' or '&nbsp;'), it contains the
                    characters used to indent at each level.
      }

      replacer    do not use / obsolete.

      This method produces a Hjson text from a JavaScript value.

      Values that do not have JSON representations, such as undefined or
      functions, will not be serialized. Such values in objects will be
      dropped; in arrays they will be replaced with null.
      stringify(undefined) returns undefined.

      The code is based on the the JSON version by Douglas Crockford:
      https://github.com/douglascrockford/JSON-js/blob/master/json2.js


  This is a reference implementation. You are free to copy, modify, or
  redistribute.

  This code should be minified before deployment.
*/

var hjson_EOL = '\n';

var hjson_bracesSameLine = false;

var hjson_parse = (function ()
{
  "use strict";

  // This is a function that can parse a Hjson text, producing a JavaScript
  // data structure. It is a simple, recursive descent parser. It does not use
  // eval or regular expressions, so it can be used as a model for implementing
  // a JSON parser in other languages.

  // We are defining the function inside of another function to avoid creating
  // global variables.

  var text;
  var at;   // The index of the current character
  var ch;   // The current character
  var escapee =
  {
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
  var error = function (m)
  {
    var i, col=0, line=1;
    for (i = at-1; i > 0 && text[i] !== '\n'; i--, col++) {}
    for (; i > 0; i--) if (text[i] === '\n') line++;
    throw new Error(m + " at line " + line + "," + col + " >>>" + text.substr(at-col, 20) + " ...");
  };

  var next = function (c)
  {
    // If a c parameter is provided, verify that it matches the current character.

    if (c && c !== ch)
      error("Expected '" + c + "' instead of '" + ch + "'");

    // Get the next character. When there are no more characters,
    // return the empty string.

    ch = text.charAt(at);
    at++;
    return ch;
  };

  var peek = function (offs)
  {
    // range check is not required
    return text.charAt(at + offs);
  }

  var number = function ()
  {
    // Parse a number value.

    var number, string = '';

    if (ch === '-')
    {
      string = '-';
      next('-');
    }
    while (ch >= '0' && ch <= '9')
    {
      string += ch;
      next();
    }
    if (ch === '.')
    {
      string += '.';
      while (next() && ch >= '0' && ch <= '9')
        string += ch;
    }
    if (ch === 'e' || ch === 'E')
    {
      string += ch;
      next();
      if (ch === '-' || ch === '+')
      {
        string += ch;
        next();
      }
      while (ch >= '0' && ch <= '9')
      {
        string += ch;
        next();
      }
    }
    number = +string;
    if (!isFinite(number)) error("Bad number");
    else return number;
  };

  var string = function ()
  {
    // Parse a string value.
    var hex, i, string = '', uffff;

    // When parsing for string values, we must look for " and \ characters.
    if (ch === '"')
    {
      while (next())
      {
        if (ch === '"')
        {
          next();
          return string;
        }
        if (ch === '\\')
        {
          next();
          if (ch === 'u')
          {
            uffff = 0;
            for (i = 0; i < 4; i++)
            {
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

  var mlString = function ()
  {
    // Parse a multiline string value.
    var string = '', triple = 0;

    // we are at ''' +1 - get indent
    var indent = 0;
    while (true)
    {
      var c=peek(-indent-5);
      if (!c || c=='\n') break;
      indent++;
    }

    var skipIndent = function ()
    {
      var skip = indent;
      while (ch && ch <= ' ' && ch !== '\n' && skip-- > 0) next();
    }

    // skip white/to (newline)
    while (ch && ch <= ' ' && ch !== '\n') next();
    if (ch === '\n') { next(); skipIndent(); }

    // When parsing for string values, we must look for " and \ characters.
    while (true)
    {
      if (!ch) error("Bad multiline string");
      else if (ch === '\'')
      {
        triple++;
        next();
        if (triple === 3) return string;
        else continue;
      }
      else while (triple > 0)
      {
        string += '\'';
        triple--;
      }
      if (ch === '\n')
      {
        string += ch;
        next();
        skipIndent();
      }
      else
      {
        string += ch;
        next();
      }
    }
  };

  var keyname = function ()
  {
    // quotes for keys that consist only of letters and digits are optional in Hjson

    if (ch === '"') return string();

    var name = ch;
    while (next())
    {
      if (ch === ':') return name;
      else if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9')
        name += ch;
      else error("Bad name");
    }
    error("Bad name");
  };

  var white = function ()
  {
    while (ch)
    {
      // Skip whitespace.
      while (ch && ch <= ' ') next();
      // Hjson allows comments
      if (ch === "#")
      {
        while (ch && ch !== '\n') next();
      }
      else break;
    }
  };

  var wordOrString = function ()
  {
    // Hjson strings can be quoteless
    // returns string, true, false, or null.
    var value = ch;
    while (next())
    {
      if (value.length === 3 && value === "'''") return mlString();
      else if (value.length === 4)
      {
        if (value === "true") return true;
        else if (value === "null") return null;
      }
      else if (value.length === 5 && value === "false") return false;

      if (ch === '\r' || ch === '\n') return value;
      value += ch;
    }

    error("Bad value");
  };

  var getComment = function (wat)
  {
    wat--;
    // remove trailing whitespace
    for (var i=at-2; i > wat && text[i] <= ' ' && text[i] !== '\n'; i--);
    // but only up to EOL
    if (text[i] === '\n') i--;
    if (text[i] === '\r') i--;
    var res = text.substr(wat, i-wat+1);
    for (var i=0; i < res.length; i++)
      if (res[i] > ' ') return res;
    return "";
  }

  var array = function ()
  {
    // Parse an array value.

    var array = [];
    var kw, wat;
    if (keepWsc)
    {
      if (Object.defineProperty) Object.defineProperty(array, "__WSC__", { enumerable: false, writable: true });
      array.__WSC__ = kw = [];
    }

    if (ch === '[')
    {
      next('[');
      wat = at;
      white();
      if (kw) kw.push(getComment(wat));
      if (ch === ']')
      {
        next(']');
        return array;  // empty array
      }
      while (ch)
      {
        array.push(value());
        wat = at;
        white();
        // in Hjson the comma is optional and trailing commas are allowed
        if (ch === ',') { next(); wat = at; white(); }
        if (kw) kw.push(getComment(wat));
        if (ch === ']')
        {
          next(']');
          return array;
        }
        white();
      }
    }
    error("Bad array");
  };

  var object = function ()
  {
    // Parse an object value.

    var key, object = {};
    var kw, wat;
    if (keepWsc)
    {
      if (Object.defineProperty) Object.defineProperty(object, "__WSC__", { enumerable: false, writable: true });
      object.__WSC__ = kw = { c: {}, o: []  };
    }

    function pushWhite(key) { kw.c[key]=getComment(wat); if (key) kw.o.push(key); }

    if (ch === '{')
    {
      next('{');
      wat = at;
      white();
      if (kw) pushWhite("");
      if (ch === '}')
      {
        next('}');
        return object;  // empty object
      }
      while (ch)
      {
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
        if (ch === '}')
        {
          next('}');
          return object;
        }
        white();
      }
    }
    error("Bad object");
  };

  var value = function ()
  {
    // Parse a Hjson value. It could be an object, an array, a string, a number or a word.

    white();
    switch (ch)
    {
      case '{': return object();
      case '[': return array();
      case '"': return string();
      case '-': return number();
      default: return ch >= '0' && ch <= '9' ? number() : wordOrString();
    }
  };

  // Return the hjson_parse function. It will have access to all of the above
  // functions and variables.

  return function (source, options)
  {
    var result;

    keepWsc = options && options.keepWsc;
    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) error("Syntax error");

    return result;
  };
}());


var hjson_stringify = (function ()
{
  "use strict";

  var needsEscape = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  var needsEscapeExceptBS = /[\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; // like needsEscape but without \\
  var needsEscapeExceptBSLF = /[\"\x00-\x09\x0b\x0c\x0e-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; // like needsEscape but without \\, \n and \r
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
  var needsEscapeName = /[^a-zA-Z0-9]/;
  var gap = '';
  var indent = '  ';
  var keepWsc;

  function isWhite(c) { return c <= ' '; }
  function isDigit(c) { return c >= '0' && c <= '9'; }
  function isKeyword(value) { return value == 'true' || value == 'false' || value == 'null'; }

  function quoteReplace(string)
  {
    return string.replace(needsEscape, function (a)
    {
      var c = meta[a];
      return typeof c === 'string'
        ? c
        : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    });
  }

  function quote(string, gap, hasComment)
  {
    if (!string) return '""';

    needsEscapeExceptBS.lastIndex = 0;
    var doEscape = hasComment || needsEscapeExceptBS.test(string);

    // Check if we can insert this string without quotes

    var first = string[0], last = string[string.length-1];
    if (doEscape ||
      isWhite(first) ||
      isDigit(first) ||
      first === '#' ||
      first === '-' ||
      first === '{' ||
      first === '[' ||
      isWhite(last) ||
      isKeyword(string))
    {
      // If the string contains no control characters, no quote characters, and no
      // backslash characters, then we can safely slap some quotes around it.
      // Otherwise we must also replace the offending characters with safe escape
      // sequences.

      needsEscape.lastIndex = 0;
      needsEscapeExceptBSLF.lastIndex = 0;
      if (!needsEscape.test(string)) return '"' + string + '"';
      else if (!needsEscapeExceptBSLF.test(string)) return mlString(string, gap);
      else return '"' + quoteReplace(string) + '"';
    }
    else
    {
      // return without quotes
      return string;
    }
  }

  function mlString(string, gap)
  {
    var i, a = string.replace(/\r/g, "").split('\n');
    gap += indent;

    var res = hjson_EOL + gap + "'''";
    for (i = 0; i < a.length; i++)
    {
      res += hjson_EOL + gap + a[i];
    }
    return res + "'''";
  }

  function quoteName(name)
  {
    if (!name) return '""';

    // Check if we can insert this name without quotes

    if (needsEscapeName.test(name))
    {
      needsEscape.lastIndex = 0;
      return '"' + (needsEscape.test(name) ? quoteReplace(name) : name) + '"';
    }
    else
    {
      // return without quotes
      return name;
    }
  }

  function str(key, holder, hasComment)
  {
    // Produce a string from holder[key].

    function startsWithNL(str) { return str && str[str[0] === '\r' ? 1 : 0] === '\n'; }
    function testWsc(str) { return str && !startsWithNL(str); }
    function wsc(str)
    {
      if (!str) return "";
      for (var i = 0; i < str.length; i++)
      {
        var c = str[i];
        if (c === '\n' || c === '#') break;
        if (c > ' ') return ' # ' + str;
      }
      return str;
    }

    var value = holder[key];

    // What happens next depends on the value's type.

    switch (typeof value)
    {
      case 'string':
        return quote(value, gap, hasComment);

      case 'number':
        // JSON numbers must be finite. Encode non-finite numbers as null.
        return isFinite(value) ? String(value) : 'null';

      case 'boolean':
      case 'null':
        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce 'null'. The case is included here in
        // the remote chance that this gets fixed someday.
        return String(value);

      case 'object':
        // If the type is 'object', we might be dealing with an object or an array or
        // null.

        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.

        if (!value) return 'null';

        // Make an array to hold the partial results of stringifying this object value.
        var mind = gap;
        gap += indent;
        var eolMind = hjson_EOL + mind;
        var eolGap = hjson_EOL + gap;
        var prefix = hjson_bracesSameLine ? '' : eolMind;
        var partial = [];

        var i, length; // loop
        var k, v; // key, value
        var kw, kwl; // whitespace & comments

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === '[object Array]')
        {
          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-JSON values.

          if (keepWsc) kw = value.__WSC__;

          for (i = 0, length = value.length; i < length; i++)
          {
            if (kw) partial.push(wsc(kw[i]) + eolGap);
            partial.push(str(i, value, kw ? testWsc(kw[i + 1]) : false) || 'null');
          }
          if (kw) partial.push(wsc(kw[i]) + eolMind);

          // Join all of the elements together, separated with newline, and wrap them in
          // brackets.

          if (kw) v = prefix + '[' + partial.join('') + ']';
          else if (partial.length === 0) v = '[]';
          else v = prefix + '[' + eolGap + partial.join(eolGap) + eolMind + ']';
        }
        else
        {
          // Otherwise, iterate through all of the keys in the object.

          if (keepWsc && value.__WSC__)
          {
            kw = value.__WSC__;
            kwl = wsc(kw.c[""]);
            var keys=kw.o.slice();
            for (k in value)
            {
              if (Object.prototype.hasOwnProperty.call(value, k) && keys.indexOf(k) < 0)
                keys.push(k);
            }

            for (i = 0, length = keys.length; i < length; i++)
            {
              k = keys[i];
              partial.push(kwl + eolGap);
              kwl = wsc(kw.c[k]);
              v = str(k, value, testWsc(kwl));
              if (v) partial.push(quoteName(k) + (startsWithNL(v) ? ':' : ': ') + v);
            }
            partial.push(kwl + eolMind);
          }
          else
          {
            for (k in value)
            {
              if (Object.prototype.hasOwnProperty.call(value, k))
              {
                v = str(k, value);
                if (v) partial.push(quoteName(k) + (startsWithNL(v) ? ':' : ': ') + v);
              }
            }
         }

          // Join all of the member texts together, separated with newlines,
          // and wrap them in braces.

          if (kw) v = prefix + '{' + partial.join('') + '}';
          else if (partial.length === 0) v = '{}';
          else v = prefix + '{' + eolGap + partial.join(eolGap) + eolMind + '}';
        }

        gap = mind;
        return v;
    }
  }

  // Return the hjson_stringify function. It will have access to all of the above
  // functions and variables.

  return function (value, opt, space)
  {
    // The stringify method takes a value and an optional replacer, and an optional
    // space parameter, and returns a Hjson text. The replacer can be a function
    // that can replace values, or an array of strings that will select the keys.
    // A default replacer method can be provided. Use of the space parameter can
    // produce text that is more easily readable.

    var i;

    indent = '  ';
    keepWsc = false;

    if (typeof opt === 'object')
    {
      indent = opt.space || '  ';
      keepWsc = opt.keepWsc;
    }

    // If the space parameter is a number, make an indent string containing that
    // many spaces. If it is a string, it will be used as the indent string.

    if (typeof space === 'number')
    {
      indent = '';
      for (i = 0; i < space; i++) indent += ' ';
    }
    else if (typeof space === 'string')
      indent = space;

    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.

    return str('', { '': value });
  };
}());


// node.js
if (typeof module!=='undefined' && module.exports)
{
  var os=require('os');
  hjson_EOL=os.EOL;
  module.exports=
  {
    parse: hjson_parse,
    stringify: hjson_stringify,
    endOfLine: function() { return hjson_EOL; },
    setEndOfLine: function(eol) { hjson_EOL = eol; },
    setBracesSameLine: function(v) { hjson_bracesSameLine = v; }
  };
}
