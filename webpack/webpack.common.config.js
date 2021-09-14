const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const {HotModuleReplacementPlugin, ProvidePlugin} = webpack;

const pathToFolder = (folder) => path.resolve(__dirname, `../${folder}`);
const pathToFile = (folder, file) => `${pathToFolder(folder)}/${file}`;

module.exports = {
    entry: [pathToFile('src', 'index.jsx')],
    output: {
        path: pathToFolder('build'),
        filename: "index.min.js",
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: pathToFile('public', 'index.html'),
            favicon: pathToFile('public', 'favicon.ico'),
        }),
        new ProvidePlugin({React: 'react', Buffer: ["buffer", "Buffer"]}),
        new HotModuleReplacementPlugin(),
        new CopyPlugin( {
            patterns: [
                { from: pathToFile('public', 'manifest.json'), to: '' },
                { from: pathToFile('public', 'icon.png'), to: '' },
                { from: pathToFile('public', 'image-placeholder.png'), to: '' },
                { from: pathToFile('public', 'style.css'), to: '' },
                { from: pathToFile('public', 'sw.js'), to: '' },
            ],
        } ),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        fallback: {stream: require.resolve("stream-browserify")},
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { modules: true } }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-react', '@babel/preset-env']
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [new TerserPlugin({extractComments: false})],
    }
}
