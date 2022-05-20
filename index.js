#!/usr/bin/env node
if (!require.main === module) {
  module.exports = {
    UEF: require("./lib/api")
  }
} else {
  require("./cli/cli")();
} 
