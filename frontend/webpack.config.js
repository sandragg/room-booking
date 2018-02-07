const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
        new HtmlWebpackPlugin({template: "index.html"}),
        new CopyWebpackPlugin([
            {from: "./src/static/main_Users.json", to: "users.json"},
            {from: "./src/static/main_Rooms.json", to: "rooms.json"},
            {from: "./src/static/main_Events.json", to: "events.json"}
        ])
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
                            "babel-preset-stage-2",
                            "babel-preset-stage-0"
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
                test: /\.(png|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    "svg-url-loader"
                ]
            },
        ]
    },

    devServer: {
        historyApiFallback: true,
        contentBase: __dirname + "/build",
        port: 8080,
        open: true
    }
};