var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require("path");
//devtool: debug ? "inline-sourcemap" : null,
//context: path.join(__dirname, "/src"),
//
module.exports = {
  entry: path.join(__dirname, "/src/index.js"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            "@babel/plugin-proposal-class-properties"
          ]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    path: path.join(__dirname, "/public"),
    filename: "bundle.js"
  },
  plugins: debug ? [] : [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "/public"),
    compress: true,
    hot: true,
    host: "localhost",
    port: 9000
  }
};
