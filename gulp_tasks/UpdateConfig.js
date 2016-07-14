// Dependencies
// ------------
var gulp = require("gulp"),

    rimraf2     = require("rimraf"),
    rimraf      = require("gulp-rimraf"),
    rename      = require("gulp-rename"),
    argv        = require("yargs").argv,
    source      = require("vinyl-source-stream");


// Assets
// ------
var paths = {
    config: {
        dir:           "_config",
        dirTemp:       "tmp",
        mainFile:      "configuration.js",
        actualFile:    "_ACTIVO----.txt",
        originFile:    "none",
        myEnvironment: "none"
    }
};


// Environment
// -----------
var isEnvironment = (argv.environment !== undefined);
if ( isEnvironment ) {
    paths.config.myEnvironment = argv.environment;
    paths.config.originFile    = paths.config.mainFile.replace ( ".js", paths.config.myEnvironment + ".js" );
}



// Tasks: UpdateConfig
// -------------------
gulp.task("UpdateConfig-DeleteActualConfig", function () {
    if ( isEnvironment )
        return gulp
            .src ( paths.config.dir + "/" + paths.config.mainFile, { read: false } )
            .pipe ( rimraf () )
            ;
    else
        console.log("TASK: UpdateConfig-DeleteActualConfig ¡No se ha seleccionado ambiente!");
});

gulp.task("UpdateConfig-CopyConfigToTemp", function () {
    if ( isEnvironment )
        return gulp
            .src ( paths.config.dir + "/" + paths.config.originFile )
            .pipe ( gulp.dest ( paths.config.dir + "/" + paths.config.dirTemp ) )
            ;
    else
        console.log("TASK: UpdateConfig-CopyConfigToTemp ¡No se ha seleccionado ambiente!");
});

gulp.task("UpdateConfig-RenameNewConfig", function () {
    if ( isEnvironment )
        return gulp
            .src ( paths.config.dir + "/" + paths.config.dirTemp + "/" + paths.config.originFile )
            .pipe ( rename ( paths.config.mainFile ) )
            .pipe ( gulp.dest ( paths.config.dir ) )
            ;
    else
        console.log("TASK: UpdateConfig-RenameNewConfig ¡No se ha seleccionado ambiente!");
});

gulp.task("UpdateConfig-DeleteTemp", function (cb) {
    if ( isEnvironment )
        rimraf2 (paths.config.dir + "/" + paths.config.dirTemp,cb);
    else
        console.log("TASK: UpdateConfig-DeleteTemp ¡No se ha seleccionado ambiente!");
});

gulp.task("UpdateConfig-DeleteActualConfigEnvironment", function () {
    if ( isEnvironment )
        return gulp
            .src ( paths.config.dir
            + "/"
            + paths.config.actualFile.replace (".txt", "*.txt")
            , { read: false } )
            .pipe ( rimraf () )
            ;
    else
        console.log("TASK: UpdateConfig-DeleteActualConfigEnvironment ¡No se ha seleccionado ambiente!");
});

gulp.task("UpdateConfig-UpdateActualEnvironment", function () {
    if ( isEnvironment ) {
        var stream = source ( paths.config.dir
            + "/"
            + paths.config.actualFile.replace ( ".txt", "-" + paths.config.myEnvironment + ".txt" ) );
        stream.end ( paths.config.myEnvironment );
        stream.pipe ( gulp.dest ( "" ) );
    }
    else
        console.log("TASK: UpdateConfig-UpdateActualEnvironment ¡No se ha seleccionado ambiente!");
});


