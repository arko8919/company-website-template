const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "assets/[name][hash][ext]"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            //favicon: "./src/assets/favicon-256x256.png"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
});