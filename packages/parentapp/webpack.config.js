const { ModuleFederationPlugin } = require('webpack').container;

module.exports = (mode = 'development') => ({
    mode,
    entry: 'src/index.js',
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
            name: 'the_parentapp',
            remotes: {
                'remote-jqueryapp': 'the_jqueryapp',
                'remote-reactapp-one': 'the_reactapp_one',
                'remote-reactapp-two': 'the_reactapp_two',
            },
        }),
    ],
});
