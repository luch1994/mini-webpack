const parseModules = require("./parseModules.js");
const fs = require("fs");
const path = require("path");
module.exports = function (file) {
    const res = bundle(file);
    const dirExist = fs.existsSync("./dist");
    if (!dirExist) {
        fs.mkdirSync("./dist");
    }
    fs.writeFileSync("./dist/bundle.js", res, {
        encoding: "utf-8"
    })
}

function bundle(file) {
    const depsGraph = parseModules(file);
    return `
    var depsGraph = ${JSON.stringify(depsGraph)};
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
    outerRequire("${file}");
    `;
//     return `
// (function (graph) {
//     function require(file) {
//         function absRequire(relPath) {
//             return require(graph[file].deps[relPath])
//         }
//         var exports = {};
//         (function (require,exports,code) {
//             eval(code)
//         })(absRequire,exports,graph[file].code)
//         return exports
//     }
//     require('${file}')
// })(${JSON.stringify(depsGraph)})`;
}