'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times.
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    // Settings
    app: {
      src: 'src',
      example: 'examples',
      dist: 'dist'
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= app.src %>/<%= pkg.name %>.js',
        dest: '<%= app.dist %>/<%= pkg.name %>.min.js'
      }
    },

    copy: {
      example: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= app.src %>',
          dest: '<%= app.example %>',
          src: [
            '*.js'
          ]
        }]
      }
    },

    watch: {
      scripts: {
        files: ['<%= app.src %>/angular-opensensemap.js', '<%= app.example %>/main.controller.js'],
        tasks: ['jshint:all', 'copy:example'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729,
        base: 'examples'
      },
      test: {
        options: {
          open: true,
          base: [
            'examples'
          ]
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= app.src %>/<%= pkg.name %>.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*}*.js']
      }
    },

    // Clean up folders for a fresh start
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= app.dist %>/{,*/}*',
            '!<%= app.dist %>/.git*'
          ]
        }]
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('example', [
    'copy:example',
    'connect:test',
    'watch'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'karma'
  ]);

  grunt.registerTask('publish', [
    'clean:dist',
    'jshint',
    'uglify'
  ]);
};
