const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = (mode = 'development') => ({
    mode,
    entry: 'src/index.js',
    plugins: [
        new ModuleFederationPlugin({
            name: 'the_jqueryapp',
            exposes: {
                './app': './src/app.js'
            },
            shared: ['jquery'],
        }),
    ],
});
