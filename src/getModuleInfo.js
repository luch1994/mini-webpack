const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

module.exports = function (file) {
    const dirname = path.dirname(file);
    // console.log(dirname);
    const body = fs.readFileSync(file, "utf-8");
    // console.log(body);
    // 解析ast语法树
    const ast = parser.parse(body, {
        sourceType: "module", // 表示要解析esmodule
    });
    // console.log(ast);
    // console.log(ast.program.body); 

    // 使用traverse遍历ast语法树，收集当前文件所有的依赖（import）
    const deps = {};
    traverse(ast, {
        ImportDeclaration({ node }) {
            // 所有的import节点都会进入这里
            // 拿到绝对路径
            const abspath = path.join(dirname, node.source.value);
            deps[node.source.value] = abspath;
        }
    });
    
    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    });
    // console.log(code); // 转换出来的code，import变成了require

    return {
        file,
        deps,
        code,
    }
}