# eslint-config-airbnb-relaxed

#### Get started

Install the package.
```
# With yarn
yarn add --dev eslint-config-airbnb-relaxed

# With npm
npm i --save-dev eslint-config-airbnb-relaxed
```

Add `"extends": "airbnb-relaxed"` to your .eslintrc.


#### Rules

Make eslint-config-airbnb less strict.

* **no-param-reassign** - For express / koa.
* **no-plusplus** - `i += 1` is annoying in loops.
* **no-underscore-dangle** - For mongodb.
* **no-use-before-define** - Allow functions declarations at the bottom of the file.
* **react/forbid-prop-types** - Allow `object` and `array`.
* **react/jsx-filename-extension** - Allow .js and .jsx extension.
* **react/jsx-no-bind**
* **react/no-array-index-key**
