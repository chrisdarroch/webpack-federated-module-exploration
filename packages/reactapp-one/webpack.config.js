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
            name: 'the_reactapp_one',
            shared: ['react', 'react-dom'],
        }),
    ],
});
