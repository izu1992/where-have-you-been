const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]_[hash]",
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  entry: ['whatwg-fetch', "./src/index.js"],
  output: {
		path: __dirname + "/docs",
		filename: "bundle.js"
	},
  devServer: {
    contentBase: "./docs"
  }
};
