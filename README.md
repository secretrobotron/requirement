#requirement
__requirement__ is a [require.js](http://requirejs.org) project creation tool.

It is targeted for building a JS library that uses modules internally, which
each module loaded separately during development for easy debugging, but gets
built to a single file that does not does not need a module loader to run in the
browser.

Since an async loader is used in development, the API for the generated library
is an async library. For instance, if this tool creates a library called `foo`,
then its main API will look like this:

```javascript
    foo(function(result) {
        //result is the result of the API.
    });
```

You can create any API for the `foo` function you want -- it can take multiple
arguments. However, it cannot return a value. At least one of the arguments
to the library should be a function that is called when the library has finished
loading and its work is complete.

##Prerequisites

* [node 0.6.6+](http://nodejs.org)
* [jake](https://github.com/jcoglan/jake) and [wiskers](https://github.com/gsf/whiskers.js):
  `npm install jake whiskers`

If you installed jake locally, then when `jake` is used below, use
`node node_modules/.bin/jake` instead.

##Usage
The included Jakefile has two tasks:

* default: Builds a project. Takes these arguments: `project`, `authors`,
  `loader`, and `license`
* clean: Destroys the contents of the `project` directory

###Example
```
jake clean
jake project=test loader=Test authors="Bobby Richter" license=mit
```
The above code should produce a project named `test` in the `projects` folder,
with an object in the global namespace named `Test`, which takes a function as
its only argument. This function will be called when the project's modules have
loaded successfully and some setup is complete.
