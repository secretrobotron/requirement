/*
  {project}
  Copyright (C) 2011 {authors}

  {license}
*/
(function (root) {

  define( [ "./submodule" ], function( submodule ){

    var {loader} = function( callback ){

      // Add your init code here.

      if( callback ) {
        callback();
      } //if

    }; //{loader}

    // In dev, there may be calls that are waiting for the implementation to
    // show up. Handle them now.
    var waiting;
    if( root.{loader} ){
      waiting = root.{loader}.__waiting;
      delete {loader}.__waiting;
    }
    root.{loader} = {loader};

    if( waiting ){
      for( var i=0, l=waiting.length; i<l; ++i ){
        {loader}.apply( {}, waiting[ i ] );
      }
    } //if

    return {loader};

  }); //define

}( this ));
