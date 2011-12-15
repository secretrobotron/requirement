/*
  {project}
  Copyright (C) 2011 {authors}

  {license}
*/
(function () {

  define( [], function() {

    var {loader} = function() {
    }; //{loader}

    // if there are entities waiting for this module to load, alert them now
    if ( window.{loader}.__waiting ) {
      for ( var i=0, l=window.{loader}.__waiting.length; i<l; ++i ) {
        {loader}.apply( {}, window.{loader}.__waiting[ i ] );
      }
      delete {loader}._waiting;
    } //if

    window.{loader} = {loader};
    return {loader};

  }); //define

})();

