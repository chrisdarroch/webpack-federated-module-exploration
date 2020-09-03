const { ModuleFederationPlugin } = require('webpack').container;

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
        new ModuleFederationPlugin({
            name: 'the_reactapp_one',
            filename: 'remote-reactapp-one.js',
            shared: ['react', 'react-dom'],
        }),
    ],
});
