module.exports = {
    entry: "./src/index",
    output: {
        filename: "index.js",
    },

    resolve: {
        extensions: [".js"],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
            },
        ],
    },
};
