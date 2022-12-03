const path = require("path");

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: {
                    loader: "html-loader",
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|ttf|woff|eot|woff2|otf|webp)$/i,
                type: 'asset/resource'
            },
        ],
    },
}