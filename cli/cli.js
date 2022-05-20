var tools = require("./api");
var parser = require("cli2json");

function cli(){
  var args = parser.parse(process.argv.slice(2).join(" "), {
    readCommandAfter: ["-r", "--run"]
  });

  if (args.flags[0]) {
    if (args.flags[0].split(" ")[0] == "-r" || args.flags[0].split(" ")[0] == "--run") {
      tools.execUEF(args.flags[0].split(" ")[1])
    } else {
      console.log("ERROR! Flag not found!");
    }
  } else {
    console.log(`UEF v1.0
    Usage
    uef:
    - uef -r <file>.uef or uef --run <file>.uef: Runs a .uef file.`) ;
  }
}

module.exports = cli;
