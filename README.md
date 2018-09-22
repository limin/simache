# simache [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[travis-image]: https://travis-ci.org/limin/simache.svg?branch=master
[travis-url]: https://travis-ci.org/limin/simache
[npm-image]: https://img.shields.io/npm/v/simache.svg
[npm-url]: https://npmjs.org/package/simache
[downloads-image]: https://img.shields.io/npm/dm/simache.svg
[downloads-url]: https://npmjs.org/package/simache
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

A simple in-memory cache.

## install

To use this module directly , install it:

```bash
npm install simache
```

## usage

```js
const Simache=require('simache')
const user={
    "uid":"69fbfdb1-a84d-4903-aa7e-f5268578e5be",
    "name":"Bill",
    "avatar":"https://www.gravatar.com/avatar/0",
    ...
}        
const simache=new Simcache()
simache.set('69fbfdb1-a84d-4903-aa7e-f5268578e5be',user)
...
const retrieved=simache.get('69fbfdb1-a84d-4903-aa7e-f5268578e5be')

```

### contributing

* Fork it!
* Create your feature branch: `git checkout -b my-new-feature`
* Commit your changes: `git commit -am 'Add some feature'`
* Push to the branch: `git push origin my-new-feature`
* Submit a pull request


### license

Copyright (c) 2018 Min Li

This program is free software: you can redistribute it and/or modify it under the terms of the Apache License Version 2.0 as published by Apache Software Foundation.