const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = (mode = 'development') => ({
    mode,
    entry: 'src/index.js',
    devtool: false,
    plugins: [
        new ModuleFederationPlugin({
            name: 'the_jqueryapp',
            filename: 'remote-jqueryapp.js',
            exposes: {
                './app': './src/app.js'
            },
            shared: ['jquery'],
        }),
    ],
});
