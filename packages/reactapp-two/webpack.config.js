const { ModuleFederationPlugin } = require('webpack').container;
const { resolve, basename } = require('path');

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
            exposes: {
              '.': './src/index.js',
              './the-app-contents': './src/contents.js',
            },
            library: { type: 'var', name: 'global_reactapp_two' },
            filename: 'reactapp_two-container.js',
            shared: [
              {
                // I have to re-express what's in peerDependencies.
                'react': { singleton: true, requiredVersion: '^16.8' },
                'react-dom': { singleton: true, requiredVersion: '^16.8' }
              },
            ],
        }),
    ],
});
