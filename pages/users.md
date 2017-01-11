
## <div class="hicon"></div> Tools for Users

If the application does not support Hjson, the best way would be to ask the developer to include it.

In the meantime, if the application allows JSON configs you can use one of the tools below.

### Installation

You have three choices:

- [Download a binary](users-bin.html) (easy)
- [Use it Online](try.html) (quick)
- [Build from source](users-src.html) (hard*er*)

### Usage

To use Hjson with an application that does not support Hjson (yet) but has JSON configs:

1. Convert your existing config to Hjson (do this only once)

   run: `hjson CONFIG.json > CONFIG.hjson`

   (replace CONFIG with the name of the config file)

2. Edit your config

   Whenever you make changes in CONFIG.hjson you need to update CONFIG.json.

   run: `hjson -j CONFIG.hjson > CONFIG.json`


### Verify Syntax (lint)

You can always check the syntax of an Hjson file by simply running `hjson FILE` or by pasting it into the [online tool](try.html). It will show you the exact location if it contains any errors.

## <a id="ed"></a> Editor Support

These editors support syntax highlighting for Hjson:

Name                | Source                                                    | Package
------------------- | --------------------------------------------------------- | -------
Ace                 | [ace](https://github.com/ajaxorg/ace)                     | [use mode-hjson](https://github.com/ajaxorg/ace-builds)
Atom                | [atom-hjson](https://github.com/hjson/atom-hjson)         | [package](https://atom.io/packages/language-hjson)
IntelliJ            | [textmate-hjson](https://github.com/hjson/textmate-hjson) | [read me](https://github.com/hjson/textmate-hjson)
Notepad++           | [npp-hjson](https://github.com/laktak/npp-hjson)          | [read me](https://github.com/laktak/npp-hjson)
Sublime Text        | [sublime-hjson](https://github.com/hjson/sublime-hjson)   | [packagecontrol.io](https://packagecontrol.io/packages/Hjson)
TextMate compatible | [textmate-hjson](https://github.com/hjson/textmate-hjson) | [read me](https://github.com/hjson/textmate-hjson)
Vim                 | [vim-hjson](https://github.com/hjson/vim-hjson)           | [read me](https://github.com/hjson/vim-hjson)
Visual Studio       | [vs-hjson](https://github.com/hjson/vs-hjson)             | [microsoft.com](https://visualstudiogallery.msdn.microsoft.com/7517a276-112b-4772-b6d8-5a1e6b0eb281)
Visual Studio Code  | [vscode-hjson](https://github.com/hjson/vscode-hjson)     | [visualstudio.com](https://marketplace.visualstudio.com/items?itemName=laktak.hjson)

