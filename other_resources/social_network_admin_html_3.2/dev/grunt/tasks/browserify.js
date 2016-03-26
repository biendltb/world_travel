var config = require('../config');
var browserify = require('browserify');
var watchify = require('watchify');
var bundleLogger = require('../util/browserifyBundleLogger');
var source = require('vinyl-source-stream');
var fs = require('vinyl-fs');
var path = require('path');

module.exports = function (grunt) {
    grunt.config('browserify', {
        options: {
            bundles: [
                {
                    src: './app/js/themes/' + config.theme + '/main.js',
                    dest: '../' + config.dist + '/' + config.theme + '/js',
                    bundleName: 'scripts.js'
                },
                {
                    src: './app/js/docs/main.js',
                    dest: '../docs/js',
                    bundleName: 'docs.js'
                }
            ]
        }
    });

    grunt.registerTask('browserify', 'Browserify lets you require("modules") in the browser by bundling up all of your dependencies.', function () {

        var options = this.options();

        var bundleQueue = options.bundles.length;

        var async = this.async();

        var browserifyThis = function (bundleConfig) {

            var bundler = browserify({
                // Required watchify args
                cache: {}, packageCache: {}, fullPaths: true,
                // Specify the entry point of your app
                entries: bundleConfig.src,
                // Enable source maps!
                debug: config.debug
            });

            var reportFinished = function () {
                // Log when bundling completes
                bundleLogger.end(path.join(bundleConfig.dest, bundleConfig.bundleName));

                if (bundleQueue) {
                    bundleQueue --;
                    if (bundleQueue === 0) {
                        async();
                    }
                }
                else {
                    async();
                }
            };

            var bundle = function () {
                // Log when bundling starts
                bundleLogger.start(path.join(bundleConfig.dest, bundleConfig.bundleName));

                return bundler
                    .bundle()
                    // Report compile errors
                    // .on('error', handleErrors)
                    .pipe(source(bundleConfig.bundleName))
                    // Specify the output destination
                    .pipe(fs.dest(bundleConfig.dest))
                    //.pipe(complete())
                    .on('end', reportFinished);
            };

            if (global.isWatching) {
                // Wrap with watchify and rebundle on changes
                bundler = watchify(bundler);
                // Rebundle on update
                bundler.on('update', bundle);
            }

            return bundle();
        };

        // Start bundling with Browserify for each bundle specified
        options.bundles.forEach(function (config) {
            if (! grunt.file.exists(config.src)) {
                grunt.log.warn(config.src + ' does not exist (skipping)');
                return true;
            }
            browserifyThis(config);
        });
    });
};