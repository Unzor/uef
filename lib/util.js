var utilities = {
  forEach: function(cb){
      var i = 0;
      for (var element in this) {
          cb(element, this[element], i);
          i += 1;
      }
  }
}

module.exports = function(env){
  for (var name in utilities) {
      env.Object.prototype[name] = utilities[name];
  }
}
