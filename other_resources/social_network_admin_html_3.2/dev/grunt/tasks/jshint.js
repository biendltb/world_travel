module.exports = function (grunt) {
    grunt.config('jshint', {
        all: ['Gruntfile.js', 'app/js/**/*.js']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};