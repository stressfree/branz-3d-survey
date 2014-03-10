'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		retire: {
      			files: ['js/vendor/*'],
      			options: {
        			jsOnly: true
      			}
    		},
		jshint: {
			options: {
				bitwise: true,
				camelcase: false,
				curly: true,
				eqeqeq: true,
				forin: true,
				immed: false,
				indent: 4,
				latedef: false,
				newcap: false,
				noarg: true,
				noempty: true,
				nonew: false,
				plusplus: false,
				quotmark: false,
				undef: true,
				unused: true,
				strict: true,
				trailing: false,
				maxparams: false,
				maxdepth: false,
				maxstatements: false,
				maxcomplexity: false,
				maxlen: false,
				browser: true,
				devel: true,
				jquery: true
			},
			dist: [
				'js/survey.js', 'js/init.js'
			]
		},
		concat: {
			dist: {
				src: [
					'js/vendor/jquery-1.11.0.js',
					'js/vendor/jquery.cookie-1.4.0.js',
					'js/survey.js',
					'js/init.js'
				],
				dest: 'js/script.js'
			},
		},
		uglify: {
			dist: {
			    options: {
			        beautify: false,
			        compress: true,
    			    mangle: true
			    },
				files: {
					'js/script.min.js': ['js/script.js']
				}
			},
		},
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},
		clean: ["js/script.js"],
	});
	
    grunt.loadNpmTasks('grunt-retire');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.registerTask('default', ['jshint', 'concat:dist', 'uglify:dist', 'compass', 'clean']);
};
