# catalog client

The client side app to render a pie element in a catalog view

## Usage

This package contains a set of custom elements that make up the ui. Below is a of notable elements: 


name     | description  | api
---------|----------  | ---
`catalog-container` | This contains a header/footer and a slot for contents | `isLoading(true|false)`
`catalog-entry` | displays tabs, one with a demo and one with information | `set element` 
`catalog-demo`  | renders a demo of the element | `set controllers, config, markup`


### bootstrapping

For your convenience there are some modules that you can import that will bootstrap related elements for you: 

* `src/bootstrap/repo` - all the elements for a repo view
* `src/bootstrap/index` - all the elements for an index page view
* `src/bootstrap/org` - all the elements for an org view

All these export `common` which is a promise that will resolve once the main elements have been defined.
In `repo` we use webpack's `require.ensure` to load additional logic asynchronously, keeping the initial load small. When this logic is loaded the `elementsDefined` promise will resolve.

See the example for a demo.

## Browser support

* Chrome
* Safari +10.1

### polyfills

These elements provide no additional browser support (with the exception of shadycss, which is baked into the source). You are expected to load the polyfills you need yourself.

## Demo

```shell
npm install 
cd demo
../node_modules/.bin/webpack-dev-server --hot --inline

# then go to localhost:8080

```

## Test 

Until the new web component tester is released - we have to clone and build:

```shell
git clone git@github.com:Polymer/web-component-tester.git
cd web-component-tester
git checkout v6.0.0-prerelease.6
npm link
# wct is now available as an executable
cd pie-catalog-client
npm test
```

Once it's released we can just add it to the `devDependencies`, and update the npm test cmd.