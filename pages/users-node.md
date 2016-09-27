
## node.js Setup

- Install [**node.js**](http://nodejs.org/) if it's not already on your system
- Install the Hjson tool by running `npm install hjson -g` on the command line

### Usage

- `hjson FILE`

  Loads a `.json` (or `.hjson`) file and outputs it as Hjson.

  E.g. `hjson config.json > config.hjson`

- `hjson -j FILE`

  Will convert an Hjson file to JSON.

  E.g. `hjson -j config.hjson > config.json`.
