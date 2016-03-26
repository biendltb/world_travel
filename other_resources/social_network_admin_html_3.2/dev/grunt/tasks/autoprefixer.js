var config = require('../config');

module.exports = function (grunt) {
    grunt.config('autoprefixer', {
        options: {
            browsers: [ 'last 4 version' ]
        },
        core: {
            options: {
                map: true
            },
            src: '../' + config.dist + '/' + config.theme + '/css/default.css'
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');
};