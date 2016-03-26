var config = require('../config');

module.exports = function (grunt) {
    grunt.config('concat', {
        options: {
            banner: '<%= banner %>\n<%= jqueryCheck %>',
            stripBanners: false
        },
        vendor_css: {
            src: [ config.vendor_css ],
            dest: '../' + config.dist + '/' + config.theme + '/css/_vendor.bundle.css'
        },
        app_css_default_theme: {
            src: [ '../' + config.dist + '/' + config.theme + '/css/_vendor.bundle.css', '../' + config.dist + '/' + config.theme + '/css/default.css' ],
            dest: '../' + config.dist + '/' + config.theme + '/css/default.css'
        }
    });

    grunt.registerTask('concat_css_skins', function () {
        var concat = grunt.config.get('concat') || {};

        for (var skin in config.skins[ config.theme ]) {
            if (skin == 'default') break;
            concat[ 'app_css_skin_' + skin ] = {
                src: [ '../' + config.dist + '/' + config.theme + '/css/_vendor.bundle.css', '../' + config.dist + '/' + config.theme + '/css/' + skin + '.css' ],
                dest: '../' + config.dist + '/' + config.theme + '/css/' + skin + '.css'
            };
            grunt.config.set('concat', concat);
            grunt.task.run('concat:app_css_skin_' + skin);
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
};