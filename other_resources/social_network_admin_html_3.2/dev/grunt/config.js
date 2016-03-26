var grunt = require('grunt');

module.exports = function (grunt) {

    // main _config
    var _skins = grunt.file.readYAML('_skins.yml');

    // Dist Package Options
    var theme = grunt.option('theme') || '1';
    var dist = grunt.option('dist') || 'dist/themes';

    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
        ' * <%= pkg.description %> <%= pkg.version %>\n' +
        ' * Author: <%= pkg.author%>\n' +
        ' * Licence: <%= pkg.license.url %>\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %>\n' +
        ' */\n'
    });

    return {
        theme: theme,
        dist: dist,
        skins: _skins.skins,
        vendor_css: [
            'app/icons/pictoicons/css/picto.css',
            'bower_components/bootstrap3-datepicker/css/datepicker.css',
            'bower_components/jquery-minicolors/jquery.minicolors.css',
            'bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.css',
            'bower_components/highlightjs/styles/railscasts.css'
        ],
        discover: {
            exclude: [ 'animated-climacons', 'bridget', 'bootstrap-sass', 'bootstrap-rtl', 'mocha', 'raphael', 'modernizr' ]
        },
        debug: true
    }

}(grunt);
