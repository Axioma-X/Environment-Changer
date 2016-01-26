// Dependencies
// ------------
var gulp = require("gulp"),

	// Other
    runSequence = require("run-sequence");


// Gulp tasks files
require("require-dir")("./gulp_tasks");


// Task: Default
// -------------
gulp.task("default", function() {
    // There is no Default task
});


// Tasks: UpdateConfig
// -------------------
gulp.task("UpdateConfig", function(cb) {
    runSequence ( "UpdateConfig-DeleteActualConfig",
                  "UpdateConfig-CopyConfigToTemp",
                  "UpdateConfig-RenameNewConfig",
                  "UpdateConfig-DeleteTemp",
                  "UpdateConfig-DeleteActualConfigEnvironment",
                  "UpdateConfig-UpdateActualEnvironment",
                  cb);
});
