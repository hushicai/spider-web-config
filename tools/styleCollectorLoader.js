

module.exports = function () {};

module.exports.pitch = function (req) {
  this.cacheable();

  return "require(" + JSON.stringify(require.resolve("./styleCollector")) + ")" +
    ".add(require(" + JSON.stringify("!!" + req) + "));\n" +
    "console.log(module.id);\n" +
    "delete require.cache[module.id];";
};
