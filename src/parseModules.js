const getModuleInfo = require("./getModuleInfo.js");
module.exports = function (file) {
    const info = getModuleInfo(file);
    const temp = [info];
    getDeps(temp, info.deps);
    const depsGraph = {};
    for (const moduleInfo of temp) {
        depsGraph[moduleInfo.file] = {
            deps: moduleInfo.deps,
            code: moduleInfo.code,
        };
    }
    return depsGraph;
}

function getDeps(temp, deps) {
    Object.keys(deps).forEach(key => {
        const depInfo = getModuleInfo(deps[key]);
        temp.push(depInfo);
        getDeps(temp, depInfo.deps);
    })
}