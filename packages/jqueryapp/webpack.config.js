const { resolve, basename } = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const publicPathOnServer = `path-on-server/${basename(__dirname)}/`;

module.exports = (mode = 'development') => ({
    mode,
    entry: 'src/index.js',
    devtool: false,
    output: {
        // in a distributed world, it would be up to the consumer of the shared
        // bundle to specify where it is on what server. here, though,
        // I'm compiling in to that known place on behalf of the parentapp,
        // because it's easier than creating a task to sync the dist folders of each app.
        path: resolve(__dirname, '../parentapp/serve/' + publicPathOnServer),
        // this seems really bad... at once, we're saying "yep it's totes cool if someone else
        // re-uses us", but at the same time, we're saying "oh btw, you will need exactly this
        // directory structure", which does not seem very re-usable at all.
        publicPath: publicPathOnServer,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'zejqueryapp',
            library: { type: 'var', name: 'global_jqueryapp' },
            filename: 'jqueryapp-container.js',
            exposes: {
                './app-fn': './src/app.js'
            },
            shared: ['jquery'],
        }),
    ],
});
