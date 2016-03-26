var config = require('../config');

module.exports = function (grunt) {
    grunt.config('watch', {
        less_theme_default: {
            files: [ 'app/less/themes/' + config.theme + '/**/*.less', 'app/less/common/**/*.less', 'app/less/vendor/**/*.less', 'app/less/demo/**/*.less' ],
            tasks: [ 'less:theme_default', 'concat:app_css_default_theme', 'cssmin', 'browserSyncReload' ]
        },
        less_skins: {
            files: 'app/less/skins/' + config.theme + '/**/*.less',
            tasks: [ 'less:skins', 'concat_css_skins', 'cssmin', 'browserSyncReload' ]
        },
        sass_theme_default: {
            files: [ 'app/scss/themes/' + config.theme + '/**/*.scss', 'app/scss/common/**/*.scss', 'app/less/vendor/**/*.less', 'app/less/demo/**/*.less' ],
            tasks: [ 'sass:theme_default', 'concat:app_css_default_theme', 'cssmin', 'browserSyncReload' ]
        },
        sass_skins: {
            files: 'app/scss/skins/' + config.theme + '/**/*.scss',
            tasks: [ 'sass:skins', 'concat_css_skins', 'cssmin', 'browserSyncReload' ]
        },
        js: {
            files: 'app/js/**/*',
            tasks: [ 'discover', 'jshint', 'browserify', 'uglify' ]
        },
        app: {
            files: [ 'app/html/**/*.html', '!app/html/docs/**/*.html' ],
            tasks: [ 'clean:dist', 'swig:dist', 'swig:index', 'copy:dist', 'copy:demo', 'clean:devsite', 'browserSyncReload' ],
            options: {
                spawn: false
            }
        },
        docs: {
            files: 'app/html/docs/**/*.html',
            tasks: [ 'clean:docs', 'swig:docs', 'copy:docs', 'clean:devsite', 'browserSyncReload' ],
            options: {
                spawn: false
            }
        },

        // This watcher can achieve much faster syncs than vagrant rsync-auto when using vagrant with rsync synced folders,
        // By using shell:vagrant_rsync task, However it's not recommended unless you know what you're doing.
        vagrant_rsync: {
            files: [ "app/html/**/*.html", "app/less/**/*.less", "app/js/**/*.js" ],
            tasks: [ 'shell:vagrant_rsync' ],
            options: {
                spawn: false
            }
        }
    });

    grunt.registerTask('setWatch', function () {
        global.isWatching = true;
    });

    grunt.registerTask('watch-less', [ 'setWatch', 'browserSyncInit:dist', 'switchwatch:less_theme_default:less_skins:js:app:docs' ]);

    grunt.registerTask('watch-sass', [ 'setWatch', 'browserSyncInit:dist', 'switchwatch:sass_theme_default:sass_skins:js:app:docs' ]);

    // Run with: grunt switchwatch:target1:target2 to only watch those targets
    grunt.registerTask('switchwatch', function () {
        var targets = Array.prototype.slice.call(arguments, 0);
        Object.keys(grunt.config('watch')).filter(function (target) {
            return ! (grunt.util._.indexOf(targets, target) !== - 1);
        }).forEach(function (target) {
            grunt.log.writeln('Ignoring ' + target + '...');
            grunt.config([ 'watch', target ], {files: []});
        });
        grunt.task.run('watch');
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};