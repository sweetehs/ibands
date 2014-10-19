// 
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat : {},
        copy : {
            root : {
                expand: true,
                flatten: true,
                src: ['public/dev/js/*.js'],
                dest: 'public/build/js',
                filter: 'isFile'
            },
            lib : {
                files : [{
                    expand: true,
                    flatten: true,
                    cwd: "public/dev/js/lib/",
                    src: ["**"],
                    dest: "public/build/js/lib/",
                    filter: 'isFile'
                }]
            }
        },
        less : {
            build: {
                files: [{
                    expand: true,
                    cwd: 'public/dev/less/',
                    src: ['{,*/}*.less', '!base/*.less'],
                    dest: 'public/build/css/',
                    ext: '.css'
                }]
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-usemin");
    grunt.registerTask("config","js-module",function(){
        var jsModule = "public/dev/js/module/";
        var buildJsMoule = "public/build/js/module/"
        var concat = grunt.config.get("concat") || {};
        var copy = grunt.config.get("copy") || {};
        grunt.file.expand(jsModule + "*").forEach(function(dir){
            var dirArr = dir.split("/");
            var lastDirName = dirArr[dirArr.length-1];
            grunt.file.expand(jsModule + lastDirName + "/*.js").forEach(function(dir){  
                var jsStr = dir.split("/");
                var jsName = jsStr[jsStr.length-1];
                var jsCombineName = jsName.split(".")[0];
                if(!concat[lastDirName+jsCombineName]){
                    concat[lastDirName+jsCombineName] = {};
                    concat[lastDirName+jsCombineName].src = [];
                }
                concat[lastDirName+jsCombineName].src.push(dir);
                concat[lastDirName+jsCombineName].dest = buildJsMoule + lastDirName + "/" +jsCombineName + ".js";
            })
        })
        grunt.config.set("concat",concat);
        grunt.config.set("copy",copy);
    })
    grunt.registerTask("tbuild",["config","concat","copy","less"]);
};module