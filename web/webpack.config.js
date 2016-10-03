var path = require('path'),
    autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/js/app.js')
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build',
        publicPath: '/build/',
        hash: true
    },
    resolve: {
        extensions: ['', '.scss', '.css', '.js', '.json'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    postcss: [autoprefixer],
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?modules", "sass"]
            }
        ]
    }
};
