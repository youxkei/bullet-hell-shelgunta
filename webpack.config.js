// @flow
const path = require("path")

module.exports = {
  entry: "./src/index",
  output: {
    filename: "index.js",
  },

  resolve: {
    alias: {
      src: path.join(__dirname, "src"),
    },
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
}
