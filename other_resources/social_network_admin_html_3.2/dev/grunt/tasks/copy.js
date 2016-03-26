var config = require('../config');

module.exports = function (grunt) {
    grunt.config('copy', {
        fontawesome: {
            expand: true,
            cwd: 'bower_components/font-awesome/fonts/',
            src: '*',
            dest: '../' + config.dist + '/' + config.theme + '/fonts/'
        },
        pictoicons_font: {
            expand: true,
            cwd: 'app/icons/pictoicons/fonts',
            src: '**/*',
            dest: '../' + config.dist + '/' + config.theme + '/fonts/'
        },
        glyphicons: {
            expand: true,
            cwd: 'bower_components/bootstrap/fonts/',
            src: '*',
            dest: '../' + config.dist + '/' + config.theme + '/fonts/'
        },
        images: {
            expand: true,
            cwd: 'app/images/',
            src: '**/*',
            dest: '../' + config.dist + '/' + config.theme + '/images'
        },
        // copy all content of _site to dist
        dist: {
            expand: true,
            cwd: 'app/_site/pages/themes/' + config.theme,
            src: '**/*',
            dest: '../' + config.dist + '/' + config.theme + '/'
        },
        sass: {
            expand: true,
            cwd: 'tmp/converter-sass/app',
            src: '**/*',
            dest: 'app/'
        },
        demo: {
            expand: true,
            cwd: 'app/_site/',
            src: '*.html',
            dest: '../' + config.dist
        },
        // Used for DOCS
        docs: {
            expand: true,
            cwd: 'app/_site/docs',
            src: '**/*',
            dest: '../docs/'
        }
    });

    grunt.registerTask('copy-build', [ 'copy:fontawesome', 'copy:pictoicons_font', 'copy:glyphicons', 'copy:images', 'copy:dist', 'copy:demo' ]);

    grunt.loadNpmTasks('grunt-contrib-copy');
};