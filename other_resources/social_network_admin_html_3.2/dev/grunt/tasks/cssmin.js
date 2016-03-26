var config = require('../config');

module.exports = function (grunt) {
    grunt.config('cssmin', {
        minify: {
            expand: true,
            cwd: '../' + config.dist + '/' + config.theme + '/css/',
            src: [ '*.css', '!*.min.css' ],
            dest: '../' + config.dist + '/' + config.theme + '/css/',
            ext: '.min.css'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
};