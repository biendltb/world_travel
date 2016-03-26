module.exports = function (grunt) {
    grunt.config('build', {
        dist: {
            tasks: [ 'swig:dist', 'prettify:theme', 'discover', 'browserify', 'less', 'jshint', 'concat', 'autoprefixer', 'cssmin', 'uglify', 'copy-build' ]
        },
        dist_sass: {
            tasks: [ 'swig:dist', 'prettify:theme', 'discover', 'browserify', 'sass', 'jshint', 'concat', 'autoprefixer', 'cssmin', 'uglify', 'copy-build' ]
        },
        docs: {
            tasks: [ 'clean:docs', 'swig:docs', 'prettify:docs', 'copy:docs', 'clean:devsite' ]
        }
    });

    grunt.registerMultiTask('build', function () {
        var async = this.async();
        grunt.task.run(this.data.tasks);
        async();
    });
};