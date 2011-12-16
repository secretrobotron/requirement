/*
  {project}
  Copyright (C) 2011 {authors}

  {license}
*/
(function (root) {

  define( [ "./submodule" ], function( submodule ) {

    var {loader} = function( callback ) {

      // Add your init code here.

      if( callback ) {
        callback();
      } //if

    }; //{loader}

    // In dev, there may be calls that are waiting for the implementation to
    // show up. Handle them now.
    if ( root.{loader} && root.{loader}.__waiting ) {
      for ( var i=0, l=root.{loader}.__waiting.length; i<l; ++i ) {
        {loader}.apply( {}, root.{loader}.__waiting[ i ] );
      }
      delete {loader}._waiting;
    } //if

    root.{loader} = {loader};
    return {loader};

  }); //define

}( this ));
