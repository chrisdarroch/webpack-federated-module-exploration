const { ModuleFederationPlugin } = require('webpack').container;
const { resolve, basename } = require('path');

module.exports = (mode = 'development') => ({
    mode,
    entry: 'src/index.js',
    devtool: false,
    output: {
        // in a distributed world, it would be up to the consumer of the shared
        // bundle to specify where it is on what server. here, though,
        // I'm compiling in to that known place on behalf of the parentapp,
        // because it's easier than creating a task to sync the dist folders of each app.
        path: resolve(__dirname, '../parentapp/serve/path-on-server/' + basename(__dirname))
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
        new ModuleFederationPlugin({
            name: 'zereactapp_two',
            library: { type: 'var', name: 'global_reactapp_two' },
            filename: 'reactapp_two-container.js',
            shared: ['react', 'react-dom'],
        }),
    ],
});
