const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/index.js"
    },

    output: {
        path: __dirname + "/build",
        filename: "[name].js"
    },

    watch: true,

    plugins: [
        new HtmlWebpackPlugin({template: "index.html"})
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "babel-preset-react",
                            "babel-preset-env",
                            "babel-preset-stage-2"
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                include: /node_modules/,
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },

    devServer: {
        contentBase: __dirname + "/build",
        port: 8080,
        open: true
    }
};