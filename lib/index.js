// ***************************************************************************
// Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
// ***************************************************************************
var db = null;
var driver_file = "sqlanywhere"

var v = process.version;
var match = v.match( 'v([0-9]+)\.([0-9]+)\.[0-9]+' );
driver_file += '_v' + match[1];
if( match[1]+0 == 0 ) {
    driver_file += '_' + match[2];
}

try {
    // Try to load precompiled binaries for x64 or ia32
    if( process.arch == "x64" ) {
	db = require( "./../bin64/" + driver_file );

    } else if( process.arch == "ia32" ) {
	db = require( "./../bin32/" + driver_file );

    } else {
	// For other architectures (arm64, etc), skip to build directory
	throw new Error( "No precompiled binary for " + process.arch );
    }
} catch( err ) {
    try {
	// Try finding natively compiled binaries for any architecture
	db = require( "./../build/Release/sqlanywhere.node" );
    } catch( buildErr ) {
	throw new Error( "Could not load modules for Platform: '" +
			 process.platform + "', Process Arch: '" + process.arch +
			 "', and Version: '" + process.version +"'. " +
			 "Original error: " + err.message + ". " +
			 "Build error: " + buildErr.message );
    }
}
module.exports = db;
