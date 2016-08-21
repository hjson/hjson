[![NPM](https://img.shields.io/npm/v/hjson.svg?style=flat-square)](http://www.npmjs.com/package/hjson) [![Maven Central](https://img.shields.io/maven-central/v/org.hjson/hjson.svg?style=flat-square)](http://search.maven.org/#search&#124;ga&#124;1&#124;g%3A%22org.hjson%22%20a%3A%22hjson%22) [![PyPI](https://img.shields.io/pypi/v/hjson.svg?style=flat-square)](https://pypi.python.org/pypi/hjson) [![nuget](https://img.shields.io/nuget/v/Hjson.svg?style=flat-square)](https://www.nuget.org/packages/Hjson/) [![Packagist](https://img.shields.io/packagist/v/laktak/hjson.svg?style=flat-square)](https://packagist.org/packages/laktak/hjson) [![crate](https://img.shields.io/crates/v/serde-hjson.svg?style=flat-square)](https://crates.io/crates/serde-hjson) [![Go Pkg](https://img.shields.io/github/release/hjson/hjson-go.svg?style=flat-square&label=go-pkg)](https://github.com/hjson/hjson-go/releases) [![gem](https://img.shields.io/gem/v/hjson.svg?style=flat-square)](https://rubygems.org/gems/hjson)

## Downloads

- [Tools for Users](#users)
- [Packages for Developers](#dev)
- [Editor Support](#ed)
- [Tools with native support](#native)

## <a id="users"></a> Tools for Users

You can always check the syntax of an Hjson file by simply running `hjson FILE`. It will show you the exact location if it contains any errors.

If an application does not yet use native Hjson configs you use it to convert your config to JSON.

The preferred tool works on all operating systems and only requires node.js.

### Setup (with node.js)

- Install [**node.js**](http://nodejs.org/) if it's not already on your system
- Install the Hjson tool by running `npm install hjson -g` on the command line
- Also see [alternative tools.](#alternative-tools)

### Usage

- `hjson FILE`

  Loads a `.json` or `.hjson` file and outputs it as Hjson.

  You can also use it to checks the specified file for syntax errors (it will print the exact location).

  E.g. `hjson config.json`

- `hjson -j FILE`

  Will convert an Hjson file to JSON.

  E.g. `hjson -j config.hjson > config.json`.

### Alternative tools

If you don't want to install node.js you can also use one of the following tools.

#### Java Setup

- Install [**Java**](https://java.com/)
- Install Hjson by downloading and unpacking the latest latest [*hjson.zip*](https://github.com/hjson/hjson-java/releases).
- run `hjson -h` for help
- `hjson file.json` will convert to Hjson.
- `hjson -j file.hjson` will convert to JSON.

#### Python Setup

- Install [**Python**](https://www.python.org/)
- Install [Hjson](https://pypi.python.org/pypi/hjson) with `pip install hjson`
- run `hjson -h` for help
- `hjson file.json` will convert to Hjson.
- `hjson -j file.hjson` will convert to JSON.

#### Rust / Cargo Setup

- Install [**Rust**](http://rust-lang.org/)
- Install [Hjson](https://crates.io/crates/hjson) with `cargo install hjson`
- run `hjson -h` for help
- `hjson file.json` will convert to Hjson.
- `hjson -j file.hjson` will convert to JSON.

#### Go Setup

- Install [**Go**](http://golang.org/doc/install.html)
- Install [Hjson](https://github.com/hjson/hjson-go) with `go get -u github.com/hjson/hjson-go/hjson-cli`
- run `hjson-cli -h` for help
- `hjson-cli file.json` will convert to Hjson.
- `hjson-cli -j file.hjson` will convert to JSON.

#### chocolatey (Windows only)

- Install [chocolatey](https://chocolatey.org)
- Install [Hjson](https://chocolatey.org/packages/hjson) with `choco install hjson`
- `hjsonc file.json` will convert to Hjson.
- `hjsonc -j file.hjson` will convert to JSON.

## <a id="dev"></a> Packages for Developers

Platform | Source | Package
-------- | ------ | -------
JavaScript, Node.js & Browser | [hjson-js](https://github.com/hjson/hjson-js) | [![NPM version](https://img.shields.io/npm/v/hjson.svg?style=flat-square)](http://www.npmjs.com/package/hjson)
C#, .Net | [hjson-cs](https://github.com/hjson/hjson-cs) | [![nuget version](https://img.shields.io/nuget/v/Hjson.svg?style=flat-square)](https://www.nuget.org/packages/Hjson/)
Go       | [hjson-go](https://github.com/hjson/hjson-go) | [![Go Pkg](https://img.shields.io/github/release/hjson/hjson-go.svg?style=flat-square&label=go-pkg)](https://github.com/hjson/hjson-go/releases)
Java     | [hjson-java](https://github.com/hjson/hjson-java) | [![Maven Central](https://img.shields.io/maven-central/v/org.hjson/hjson.svg?style=flat-square)](http://search.maven.org/#search&#124;ga&#124;1&#124;g%3A%22org.hjson%22%20a%3A%22hjson%22)
PHP      | [hjson-php](https://github.com/hjson/hjson-php) | [![Packagist](https://img.shields.io/packagist/v/laktak/hjson.svg?style=flat-square)](https://packagist.org/packages/laktak/hjson)
Python   | [hjson-py](https://github.com/hjson/hjson-py) | [![PyPI version](https://img.shields.io/pypi/v/hjson.svg?style=flat-square)](https://pypi.python.org/pypi/hjson)
Rust     | [hjson-rust](https://github.com/hjson/hjson-rust) | [![crate](https://img.shields.io/crates/v/serde-hjson.svg?style=flat-square)](https://crates.io/crates/serde-hjson)

#### Partial implementations

Platform | Description | Source/Package
-------- | ----------- | --------------
Ruby     | Hjson Ruby parser | [hjson-rb](https://github.com/hjson/hjson-rb) [![gem](https://img.shields.io/gem/v/hjson.svg?style=flat-square)](https://rubygems.org/gems/hjson)
C        | jzon variant, based on Hjson | [jzon-c](https://github.com/KarlZylinski/jzon-c)

Please [open an issue](https://github.com/hjson/hjson/issues) if you port Hjson to another platform/language.

## <a id="ed"></a> Editor Support

Name     | Source | Package
-------- | ------ | -------
Atom | [language-hjson](https://github.com/dannyfritz/language-hjson) | [package](https://atom.io/packages/language-hjson)
Sublime Text / TextMate | [sublime-hjson](https://github.com/laktak/sublime-hjson) | [packagecontrol.io](https://packagecontrol.io/packages/Hjson)
Notepad++    | [npp-hjson](https://github.com/laktak/npp-hjson) | see source

## <a id="native"></a> Tools with native support

Name     | Link | Details
-------- | ---- | -------
**any-json**: convert (almost) anything to JSON | [![NPM version](https://img.shields.io/npm/v/any-json.svg?style=flat-square)](http://www.npmjs.com/package/any-json) | [see readme](https://github.com/laktak/any-json#usage)
**gulp**: the streaming build system | [![NPM version](https://img.shields.io/npm/v/gulp-hjson.svg?style=flat-square)](http://www.npmjs.com/package/gulp-hjson) | [see readme](https://github.com/hjson/gulp-hjson#usage)
**grunt**: the JavaScript task runner | [![NPM version](https://img.shields.io/npm/v/grunt-hjson.svg?style=flat-square)](http://www.npmjs.com/package/grunt-hjson) | [see readme](https://github.com/hjson/grunt-hjson#usage)
**hjsonify**: a browserify transform to require Hjson files | [![NPM version](https://img.shields.io/npm/v/hjsonify.svg?style=flat-square)](http://www.npmjs.com/package/hjsonify) | [see readme](https://github.com/dannyfritz/hjsonify#usage)
**node-config**: node.js application configuration | [![NPM version](https://img.shields.io/npm/v/config.svg?style=flat-square)](http://www.npmjs.com/package/config) | [see wiki](https://github.com/lorenwest/node-config/wiki/Configuration-Files#human-json---hjson)
**nconf**: hierarchical node.js configuration | [![NPM version](https://img.shields.io/npm/v/nconf.svg?style=flat-square)](http://www.npmjs.com/package/nconf) | `nconf.file({ file: 'file.hjson',`<br>`   format: require('hjson').rt });`<br>`// round trips your comments`
**rc**: non-configurable configuration loader for lazy people. | [![NPM version](https://img.shields.io/npm/v/rc.svg?style=flat-square)](http://www.npmjs.com/package/rc) | `var conf=require('rc')('appname', {/*defaults*/},`<br>`  null, require('hjson').parse);`
