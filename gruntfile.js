module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            basic: {
                src: ['src/scripts/custom.js'],
                dest: 'src/scripts/custom.js',
            },
            extras: {
                src: ['src/scripts/vendor/jquery-1.12.4.js', 'src/scripts/vendor/bootstrap.js'],
                dest: '.tmp/scripts/vendor.js',
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dist/scripts/custom.min.js': ['.tmp/scripts/custom.js'],
                    'dist/scripts/vendor.min.js': ['.tmp/scripts/vendor.js'],
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/styles/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/styles/images/'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed'
                },
                files: {
                    'src/styles/css/custom.css': 'src/styles/scss/custom.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            /*scripts: {
                files: ['scripts/*.js'],
                tasks: [],
                options: {
                    spawn: false,
                },
            },*/
            css: {
                files: ['src/styles/scss/*.scss', 'src/styles/scss/partials/*.scss', 'src/styles/scss/pages/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/styles/vendor.min.css': ['src/styles/css/vendor/*.css'],
                    'dist/styles/custom.min.css': ['src/styles/css/custom.css']
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: ['**', '!**/scripts/vendor/**', '!**/scripts/build/**', '!**/scripts/custom.js', '!**/styles/scss/**', '!**/styles/css/**'],
                dest: 'dist/',
            },
        }

    });
    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass', 'watch']);
    grunt.registerTask('build', ['concat', 'uglify', 'sass', 'cssmin', 'imagemin', 'copy']);


};
