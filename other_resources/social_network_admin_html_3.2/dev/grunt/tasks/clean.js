var config = require('../config');

module.exports = function (grunt) {
    grunt.config('clean', {
        options: {
            // allow to delete files outside project folder
            force: true
        },
        // Delete only html files from dist
        dist: {
            src: [ '../' + config.dist + '/' + config.theme + '/**/*.html', '../' + config.dist + '/' + config.theme + '/.htaccess' ]
        },
        docs: {
            src: [ '../docs/**/*.html', '../docs/.htaccess' ]
        },
        // Delete entire html folder from jekyll build
        devsite: {
            src: [ '../dev/app/_site' ]
        },
        sass: {
            src: 'app/scss/**/*'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};