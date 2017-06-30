# rollup-plugin-paths

Let you use the same variables at different directory, like this:

```
|-- entry.js
|-- main.js
|-- pages/
    |-- about.js
|-- src/
    |-- lib/
        |-- foo/
            |-- one.js
            |-- two.js
|-- vendors/
    |-- jquery.js
```

main.js

```js
// from src/lib/foo/one.js
import { One } from 'foo@one.js'

// from src/lib/foo/two.js
import { Two } from 'two'

// from vendors/jquery.js
import 'jquery'
```
pages/about.js

```js
// from src/lib/foo/one.js
import { One } from 'foo@one.js';

// from vendors/jquery.js
import 'jquery'
```

## Installation

```bash
$ npm install --save-dev rollup-plugin-paths
```

## Usage

```js
// rollup.config.js
import resolve from 'rollup-plugin-paths'

export default {
  entry: 'entry.js',
  dest: 'bundle.js',
  plugins: [
    resolve({
      // Define a directory width suffix `@`
      "foo@": "./src/lib/foo/",
      // Define a path
      "jquery": "./vendors/jquery.js",
      // Define a path width a defined directory
      "two": "foo@two.js"
    })
  ]
}
```

- The path is relative to entry.
- You must use suffix to define the path. `./vendors/jquery` is wrong, please do it like this `./vendors/jquery.js`
- Only use one directory variable in path. `foo@goo@one.js` is wrong

## License

MIT

## Log

### v0.0.3 (2017-06-30)

- 修复v0.0.2的问题

### v0.0.2 (2017-06-30)

- 修复windows下路径错误的bug

### v0.0.1 (2017-03-24)

- 完成
