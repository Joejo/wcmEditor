const path = require('path');

module.exports = {
    target: "electron-renderer",
    entry: {
        app: './index.tsx'
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, './build/'),
        chunkFilename: "[id].chunk.js",
        publicPath: "/build/"
    },
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.js|.tsx?$/,
                exclude: /node_modules(?!\/webbpack-dev-server)/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },{
                test: /\.css$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader',
                    options: { attrs: { fileName: '[path]' } }
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        port: 7001
    }
}