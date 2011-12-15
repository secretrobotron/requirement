var fs = require( "fs" ),
    util = require( "util" )
    whiskers = require( "whiskers" );

var TEMPLATE_DIR = "template",
    PROJECTS_DIR = "projects",
    LICENSES_DIR = TEMPLATE_DIR + "/licenses";

var fileTasks = [],
    projectName = process.env.project,
    projectDir = PROJECTS_DIR + "/" + ( process.env.dir || projectName ),
    loaderName = process.env.loader || projectName,
    licenseFile = LICENSES_DIR + "/" + process.env.license,
    license = "",
    authors = process.env.authors || "AUTHORS";

if( licenseFile ) {
  try {
    fs.lstatSync( licenseFile );
    license = fs.readFileSync( licenseFile );
  }
  catch( e ) {
  } //try
} //if

var templateContext = {
  authors: authors,
  project: projectName,
  loader: loaderName,
  license: license
};

var templatePartials = {
};

function copyFile( oldFile, newFile ) {
  var oldContents = fs.readFileSync( oldFile )
      render = whiskers.render( oldContents, templateContext, templatePartials );
  fs.writeFileSync( newFile, render );
} //copyFile

function createFileTask( oldFile, newFile, depends ) {
  file( newFile, [ PROJECTS_DIR, projectDir ].concat( depends ), function() {
    console.log( "File:", newFile, "from", oldFile, "depends on", depends );
    copyFile( oldFile, newFile );
  });
} //createFileTask

function createRecursive( newDirName, oldDirName ) {
  var dir = fs.readdirSync( oldDirName );
  for( var i in dir ) {
    var oldItemPath = oldDirName + "/" + dir[ i ],
        newItemPath = newDirName + "/" + dir[ i ],
        stat = fs.lstatSync( oldItemPath );
    if( stat.isDirectory() ) {
      directory( newItemPath );
      createRecursive( newItemPath, oldItemPath );
    }
    else {
      createFileTask( oldItemPath, newItemPath, [ newDirName ] );
      fileTasks.push( newItemPath );
    } //if
  } //for
} //createRecursive

desc( "Create a require.js-enabled project" );
task( "default", function() {
  for ( var i in fileTasks ) {
    jake.Task[ fileTasks[ i ] ].invoke();
  } //for
}); //default

directory( PROJECTS_DIR );
directory( projectDir );
createRecursive( projectDir, TEMPLATE_DIR );

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
    fs.lstatSync( PROJECTS_DIR );
    removeFiles( PROJECTS_DIR );
  }
  catch( e ) {
    console.log( "\"" +  PROJECTS_DIR + "\" does not exist" );
  } //try
});
