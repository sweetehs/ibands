module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json")
    });
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-usemin");
    grunt.registerTask("config","concat by module",function(){
    })
    grunt.registerTask("", []);
};