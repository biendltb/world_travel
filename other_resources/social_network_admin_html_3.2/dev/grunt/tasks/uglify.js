var config = require('../config');

module.exports = function (grunt) {
    grunt.config('uglify', {
        app: {
            src: '../' + config.dist + '/' + config.theme + '/js/scripts.js',
            dest: '../' + config.dist + '/' + config.theme + '/js/scripts.min.js'
        },
        docs: {
            src: '../docs/js/docs.js',
            dest: '../docs/js/docs.min.js'
        },
        vendor: {
            src: '../' + config.dist + '/' + config.theme + '/js/vendor.js',
            dest: '../' + config.dist + '/' + config.theme + '/js/vendor.min.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};