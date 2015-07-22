# no-input
A useful tool to validate any input.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![node version][node-image]][node-url]
[![Gittip][gittip-image]][gittip-url]

[npm-image]: https://img.shields.io/npm/v/no-input.svg?style=flat-square
[npm-url]: https://npmjs.org/package/no-input
[travis-image]: https://travis-ci.org/Jackong/no-input.svg?branch=master
[travis-url]: https://travis-ci.org/Jackong/no-input
[david-image]: https://img.shields.io/david/Jackong/no-input.svg?style=flat-square
[david-url]: https://david-dm.org/Jackong/no-input
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.11-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[gittip-image]: https://img.shields.io/gratipay/Jackong.svg
[gittip-url]: https://gratipay.com/~Jackong

# Install

[![NPM](https://nodei.co/npm/no-input.png?downloads=true)](https://nodei.co/npm/no-input/)

# Usage

* Options

```js
input(data, nameOrOptions[, pattern, default, error]);
```
> * `data` {Object} *required* input data you want to validate
> * `nameOrOptions` {String|Object} *required* key may be exist in `data` OR options with `name`, `pattern`, `default` and `error` 
> * `pattern` {RegExp|Array|Function|Object|String...} *optional* validator
> * `default` {Mixed} *optional* default value when invalid (Function will get the return value)
> * `error` {Error} *optional* special error to throw
> * `throw` {Error} if the value is invalid without default value 

* Custom error handler

```js
input.error = function(name) {
    return new input.InvalidInputError('Invalid input ' + name);
}
```

* Example
```js
var data = {type: 'cat'};
var value = input(data, 'type', /^(cat|dog)$/, 'pig', new Error('invalid type'));
//OR
var value = input(data, {name: 'type', pattern: ['cat', 'dog'], default: 'pig', error: new Error('invalid type')]};
// The following code will not be executed, if the value is invalid.
// ...

```

# Licences
 [MIT](LICENSE)