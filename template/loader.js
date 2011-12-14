/*jshint white: false, strict: false, plusplus: false, evil: true,
  onevar: false, nomen: false */
/*global require: false, document: false, console: false, window: false,
  setTimeout: false */

/**
 * In the source case, use document.write to write out the require tag,
 * and load all moduels as distinct scripts for debugging. After a build,
 * all the modules are inlined, so will not use the document.write path.
 * Use has() testing module, since the requirejs optimizer will convert
 * the has test to false, and minification will strip the false code
 * branch. http://requirejs.org/docs/optimization.html#hasjs
 */
(function () {
    // Stub for has function.
    function has() {
        return true;
    }

    var {loader} = function() {
      if ( !{loader}.__waiting ) {
        {loader}.__waiting = [];
      } //if
      {loader}.__waiting.push( arguments );
    };

    if ( !window.{loader} ) {
      window.{loader} = {loader};
    } //if

    if ( has( 'source-config' ) ) {
        // Get the location of the {project} source.
        // The last script tag should be the {project} source
        // tag since in dev, it will be a blocking script tag,
        // so latest tag is the one for this script.
        var scripts = document.getElementsByTagName( 'script' ),
        path = scripts[scripts.length - 1].src;
        path = path.split( '/' );
        path.pop();
        path = path.join( '/' ) + '/';

        if ( !window.require ) {
          document.write( '<script src="' + path + '../lib/require.js"></' + 'script>' );
        } //if

        // Set up paths to find scripts.
        document.write('<script>' + 
          '(function(){' + 
          'var ctx = require.config({ ' + 
            'baseUrl: "' + path + '",' +
            'context: "{project}",' +
            'paths: {' +
              '{project}: "' + path + '"' +
              // Paths are relative to baseUrl; Notice the commas!
            '}' +
          '});' +
          'ctx(["main"])' + 
          '})()' +
        '</script>');
    }

}());
