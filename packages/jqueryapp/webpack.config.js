const { resolve, basename } = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

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
    plugins: [
        new ModuleFederationPlugin({
            name: 'zejqueryapp',
            library: { type: 'var', name: 'global_jqueryapp' },
            filename: 'jqueryapp-container.js',
            exposes: {
                './app': './src/app.js'
            },
            shared: ['jquery'],
        }),
    ],
});
