const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = (mode = 'development') => ({
    mode,
    entry: 'src/index.js',
    devtool: false,
    output: {
        path: resolve(__dirname, 'serve')
    },
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
            name: 'zeparentapp',
            // the values of remotes are very specific.
            // keys == what I can reference in `import` statements in my own code.
            // values == <bundlename>@<location-on-a-server>.
            // * bundlename == how to "get in to" the remote bundle's shared modules.
            //      most likely the "name" parameter passed to ModuleFederationPlugin in the remote bundle.
            //      likley to be a variable in global namespace, unless `library.type` was changed in the remote.
            // * location-on-a-server == an address resolvable by whatever executes this bundle.
            //      if running in a browser, this should be a valid URL.
            //      if running in Node / SSR, this should be a filepath.
            remotes: {
                'remote-jqueryapp': 'zejqueryapp@path-on-server/jqueryapp/jqueryapp-container.js',
                'remote-reactapp-one': 'zereactapp_one@path-on-server/reactapp-one/reactapp_one-container.js',
                'remote-reactapp-two': 'zereactapp_two@path-on-server/reactapp-two/reactapp_two-container.js',
            },
            shared: [
                {
                    'react': { singleton: true },
                    'react-dom': { singleton: true }
                },
            ]
        }),
    ],
});
