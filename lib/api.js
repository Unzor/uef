// Modules
const {
    spawn
} = require("child_process");
const fs = require('fs');
const YAML = require('yaml')
const unzipper = require("unzipper")
require("./util")(global);

// Functions
function arrayFindIncludes(r, n) {
    var u;
    var a = null;
    n.forEach(function(n) {
        if (n.includes(r)) {
            u = n;
            a = n
        } else {
            u = a
        }
    });
    return u
}


function parseTargets(file) {
    var parsed = YAML.parse(file)
    var new_ = {};
    parsed.forEach(function(res, i) {
        var target = Object.keys(res)[0];
        var commands = parsed[i][Object.keys(res)[0]];
        new_[target] = commands;
    })
    return new_;
};

function get_platform() {
    var os;
    if (process.platform == "win32") {
        os = "windows"
    } else if (process.platform == "darwin") {
        os = "macos"
    } else {
        os = process.platform;
    };
    return os;
}

function builder(path) {
    path = path.endsWith("/") ? path + "universal_executable.yml" : path + "/universal_executable.yml"
    var parsed = YAML.parse(fs.readFileSync(path).toString())[0];
    var targets = parseTargets(fs.readFileSync(path).toString());
    targets.forEach(function(name, value, index) {
        if (name.toLowerCase() == get_platform()) {
            if (parsed.log && parsed.log == true) {
                spawn("cd " + path.split("/").slice(0, -1).join("/") + "&&" + value.join(" && "), {
                    shell: true,
                    stdio: "inherit"
                }, function(err) {
                    if (err) throw err
                });
            } else if (parsed.log == false) {
                spawn("cd " + path.split("/").slice(0, -1).join("/") + "&&" + value.join(" && "), {
                    shell: true
                }, function(err) {
                    if (err) throw err
                });
            } else if (typeof parsed.log == "undefined") {
                spawn("cd " + path.split("/").slice(0, -1).join("/") + "&&" + value.join(" && "), {
                    shell: true,
                    stdio: "inherit"
                }, function(err) {
                    if (err) throw err
                });
            }
            setTimeout(function() {
                fs.rmSync("temp", {
                    recursive: true
                })
            }, 500)
        }
    });
}

function exec(file){
    var stream = fs.createReadStream(file);
    stream.pipe(unzipper.Extract({ path: 'temp' }));
    stream.on('close', () => {
       setTimeout(function(){
           builder("temp");
       }, 500)
    });
}

// Export
module.exports = {
    run: builder,
    execUEF: exec
};
