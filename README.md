#requirement
__requirement__ is a [require.js](http://requirejs.org) project creation tool.

##Usage
The included Jakefile has two tasks:

* default: Builds a project. Takes these arguments: `project`, `authors`, `loader`, and `license`
* clean: Destroys the contents of the `project` directory

###Example
```
jake clean
jake project=test loader=Test authors="Bobby Richter" license=mit
```
The above code should produce a project named `test` in the `projects` folder, with an object in the global namespace named `Test`, which takes a function as its only argument. This function will be called when the project's modules have loaded successfully and some setup is complete.
