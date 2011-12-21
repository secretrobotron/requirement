var fs = require( "fs" ),
    child_process = require( "child_process" ),
    exec = child_process.exec;

const BUILD_DIR = "./build",
      DIST_DIR = "./dist",
      PROFILES_DIR = BUILD_DIR + "/profiles",
      DEFAULT_PROFILE = PROFILES_DIR + "/default.js"
      R_JS = BUILD_DIR + "/r.js";

var profile = DEFAULT_PROFILE;
if ( process.env.profile ) {
  profile = PROFILES_DIR + "/" + process.env.profile + ".js";
} //if

directory( DIST_DIR );

desc( "Build {project}" );
task( "default", function() {
  jake.Task[ DIST_DIR ].invoke();
  function nodeExecHandler( error, stdout, stderr ) {
    if( !error ) {
    }
    else {
      console.log( stderr );
    } //if
  } //nodeExecHandler

  try {
    fs.lstatSync( profile );
    exec( "node " + R_JS + " -o " + profile );
  }
  catch( e ) {
    console.log( "ERROR: Profile " + profile + " dost not exist." );
  } //try
});

task( "clean", function() {
  function removeFiles( dirName ) {
    var dir = fs.readdirSync( dirName );
    for ( var item in dir ) {
      var itemPath = dirName + "/" + dir[ item ];
      var stat = fs.lstatSync( itemPath );
      if ( stat.isDirectory() ) {
        removeFiles( itemPath );
        fs.rmdir( itemPath );
      }
      else {
        fs.unlink( itemPath );
      } //if
    } //for
  } //removeFiles
  try {
    fs.lstatSync( DIST_DIR );
    removeFiles( DIST_DIR );
    fs.rmdir( DIST_DIR );
  }
  catch( e ) {
    console.log( "\"" +  DIST_DIR + "\" does not exist" );
  } //try
});
