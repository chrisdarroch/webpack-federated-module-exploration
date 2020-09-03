const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = (mode = 'development') => ({
    mode,
    entry: 'src/index.js',
    devtool: false,
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new ModuleFederationPlugin({
            name: 'the_parentapp',
            remotes: {
                'remote-jqueryapp': resolve(__dirname, '../jqueryapp/dist/remote-jqueryapp.js'),
                'remote-reactapp-one': resolve(__dirname, '../reactapp-one/dist/remote-reactapp-one.js'),
                'remote-reactapp-two': resolve(__dirname, '../reactapp-two/dist/remote-reactapp-two.js'),
            },
        }),
    ],
});
