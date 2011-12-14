var fs = require( "fs" ),
    util = require( "util" )
    whiskers = require( "whiskers" );

var TEMPLATE_DIR = "template",
    LICENSES_DIR = TEMPLATE_DIR + "/licenses";

var fileList = [
      "Jakefile",
      "Makefile",
      "build.js",
      "loader.js",
      "main.js",
      "wrap.start",
      "wrap.end",
      "index.html"
    ],
    fileTasks = [],
    projectName = process.env.project,
    projectDir = process.env.dir || projectName,
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
}

function createFileTask( oldFile, newFile ) {
  file( newFile, [ projectDir ], function() {
    copyFile( oldFile, newFile );
  });
}

desc( "Create a require.js-enabled project" );
task( "default", function() {
  for ( var i in fileTasks ) {
    jake.Task[ fileTasks[ i ] ].invoke();
  } //for
}); //default

directory( projectDir );
for( var i in fileList ) {
  var newFileName = projectDir + "/" + fileList[ i ],
      oldFileName = TEMPLATE_DIR + "/" + fileList[ i ];
  createFileTask( oldFileName, newFileName );
  fileTasks.push( newFileName );
} //for

