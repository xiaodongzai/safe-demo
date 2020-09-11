var webpcak = require('webpack');
var fs = require('fs');
var path = require('path');
var WebpackObfuscator = require('webpack-obfuscator');

// 打包成单文件时，把node_modules排除掉
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

// webpack配置
module.exports = {
    entry: [
        './src/main.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    target: 'node',
    externals: nodeModules,
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            path.resolve(__dirname, "node_modules")
          ],
          enforce: 'post', // loader处理的优先级，post为最后处理
          use: {
            loader: WebpackObfuscator.loader,
              options: {
                  rotateStringArray: true
              }
          }
        }
      ]
  }
}
