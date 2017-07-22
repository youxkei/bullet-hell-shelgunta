module.exports = {
    entry: "./src/index",
    output: {
        filename: "index.js",
    },

    resolve: {
        extensions: [".ts", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
            },
        ],
    },
};
