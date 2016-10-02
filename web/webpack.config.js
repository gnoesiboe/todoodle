var path = require('path');

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
                loaders: ["style", "css", "sass"]
            }
        ]
    }
};
