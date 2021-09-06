
    const depsGraph = {"./demo/index.js":{"deps":{"./add.js":"demo/add.js"},"code":"\"use strict\";\n\nvar _add = require(\"./add.js\");\n\nvar res = (0, _add.add)(\"1\", \"5\");\ndocument.querySelector(\"#app\").innerHTML = \"<h1>hahha\".concat(res, \"</h1>\");"},"demo/add.js":{"deps":{"./toInt.js":"demo/toInt.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.add = void 0;\n\nvar _toInt = require(\"./toInt.js\");\n\nvar add = function add(a, b) {\n  return (0, _toInt.toInt)(a) + (0, _toInt.toInt)(b);\n};\n\nexports.add = add;"},"demo/toInt.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.toInt = void 0;\n\nvar toInt = function toInt(num) {\n  return parseInt(num);\n};\n\nexports.toInt = toInt;"}};
    function outerRequire(entry) {
        var curData = depsGraph[entry];
        function require(file) {
          var relKey = curData.deps[file];
          return outerRequire(relKey);
        }
        var exports = {};
        eval(depsGraph[entry].code);
        return exports;
      }
      outerRequire("./demo/index.js");
    