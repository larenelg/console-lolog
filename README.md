# console-lolog
A `console.log` wrapper to rule them all

## Installation
`npm install console-lolog`

## Usage
test.js
```
let Log = require('console-lolog');
let lolog = new Log();
let someVar = 42, anotherVar = { 'oh no':'not again' };
lolog.log(someVar, anotherVar);
lolog.logvar(someVar, anotherVar);
```
and then, run with `node`
```
$ node test.js
{"0":42,"1":{"oh no":"not again"}}, test.js:4
someVar, anotherVar are {"0":42,"1":{"oh no":"not again"}}
```