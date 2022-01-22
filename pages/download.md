
## <div class="hicon"></div> Implementation

To use Hjson in your application you have two options

- Convert Hjson to JSON using any of the available [tools](users.html) or libraries. This can even be done by an external process.
- Use one of the Hjson libraries directly. They are easy to use and try to be language idiomatic.

Your users do not need to convert their existing JSON configs and can upgrade (or not) as they like.

## <a id="dev"></a> Packages for Developers

Platform | Source | Package
-------- | ------ | -------
JavaScript, Node.js & Browser | [hjson-js](https://github.com/hjson/hjson-js) | [![NPM version](https://img.shields.io/npm/v/hjson.svg?style=flat-square)](http://www.npmjs.com/package/hjson)
C#, .Net | [hjson-cs](https://github.com/hjson/hjson-cs)                      | [![nuget version](https://img.shields.io/nuget/v/Hjson.svg?style=flat-square)](https://www.nuget.org/packages/Hjson/)
C++      | [hjson-cpp](https://github.com/hjson/hjson-cpp)                    | [![C++](https://img.shields.io/github/release/hjson/hjson-cpp.svg?style=flat-square&label=c%2b%2b)](https://github.com/hjson/hjson-cpp/releases)
Go       | [hjson-go](https://github.com/hjson/hjson-go)                      | [![Go Pkg](https://img.shields.io/github/release/hjson/hjson-go.svg?style=flat-square&label=go-pkg)](https://github.com/hjson/hjson-go/releases)
Java     | [hjson-java](https://github.com/hjson/hjson-java)                  | [![Maven Central](https://img.shields.io/maven-central/v/org.hjson/hjson.svg?style=flat-square)](http://search.maven.org/#search&#124;ga&#124;1&#124;g%3A%22org.hjson%22%20a%3A%22hjson%22)
Lua      | [hjson-lua](https://github.com/hjson/hjson-lua)                    | [![LuaRocks](https://img.shields.io/luarocks/v/cryi/hjson-lua?style=flat-square)](https://luarocks.org/modules/cryi/hjson-lua)
PHP      | [hjson-php](https://github.com/hjson/hjson-php)                    | [![Packagist](https://img.shields.io/packagist/v/laktak/hjson.svg?style=flat-square)](https://packagist.org/packages/laktak/hjson)
Python   | [hjson-py](https://github.com/hjson/hjson-py)                      | [![PyPI version](https://img.shields.io/pypi/v/hjson.svg?style=flat-square)](https://pypi.python.org/pypi/hjson)
Rust     | [hjson-rust](https://github.com/hjson/hjson-rust)                  | [![crate](https://img.shields.io/crates/v/serde-hjson.svg?style=flat-square)](https://crates.io/crates/serde-hjson)

Also see [tools](users.html) and [editor support](users.html#ed).

#### Partial implementations

Platform | Description | Source/Package
-------- | ----------- | --------------
C        | jzon variant, based on Hjson | [jzon-c](https://github.com/KarlZylinski/jzon-c)
Kotlin   | does not pass all tests | [kotlin.hjson](https://github.com/dhakehurst/net.akehurst.kotlin.hjson)
Ruby     | Hjson Ruby parser | [hjson-rb](https://github.com/hjson/hjson-rb) [![gem](https://img.shields.io/gem/v/hjson.svg?style=flat-square)](https://rubygems.org/gems/hjson)
Rust     | Deserialization only | [deser-hjson](https://github.com/Canop/deser-hjson) [![crate](https://img.shields.io/crates/v/deser-hjson.svg?style=flat-square)](https://crates.io/crates/deser-hjson)

Please [open an issue](https://github.com/hjson/hjson/issues) if you port Hjson to another platform/language.

## Tools with native support

Name     | Link | Details
-------- | ---- | -------
**any-json**: convert (almost) anything to JSON | [![NPM version](https://img.shields.io/npm/v/any-json.svg?style=flat-square)](http://www.npmjs.com/package/any-json) | [see readme](https://github.com/laktak/any-json#usage)
**gulp**: the streaming build system | [![NPM version](https://img.shields.io/npm/v/gulp-hjson.svg?style=flat-square)](http://www.npmjs.com/package/gulp-hjson) | [see readme](https://github.com/hjson/gulp-hjson#usage)
**grunt**: the JavaScript task runner | [![NPM version](https://img.shields.io/npm/v/grunt-hjson.svg?style=flat-square)](http://www.npmjs.com/package/grunt-hjson) | [see readme](https://github.com/hjson/grunt-hjson#usage)
**hjsonify**: a browserify transform to require Hjson files | [![NPM version](https://img.shields.io/npm/v/hjsonify.svg?style=flat-square)](http://www.npmjs.com/package/hjsonify) | [see readme](https://github.com/dannyfritz/hjsonify#usage)
**node-config**: node.js application configuration | [![NPM version](https://img.shields.io/npm/v/config.svg?style=flat-square)](http://www.npmjs.com/package/config) | [see wiki](https://github.com/lorenwest/node-config/wiki/Configuration-Files#human-json---hjson)
**nconf**: hierarchical node.js configuration | [![NPM version](https://img.shields.io/npm/v/nconf.svg?style=flat-square)](http://www.npmjs.com/package/nconf) | `nconf.file({ file: 'file.hjson',`<br>`   format: require('hjson').rt });`<br>`// round trips your comments`
**rc**: non-configurable configuration loader for lazy people. | [![NPM version](https://img.shields.io/npm/v/rc.svg?style=flat-square)](http://www.npmjs.com/package/rc) | `var conf=require('rc')('appname', {/*defaults*/},`<br>`  null, require('hjson').parse);`
