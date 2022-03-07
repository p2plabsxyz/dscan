const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

var fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

module.exports = {
  entry: {
    qrcode: ["regenerator-runtime/runtime.js", "./src/js/qrcode.js"],
  },
  output: {
    path: path.resolve(__dirname, "buidl"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup.html"),
      filename: "popup.html",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "folderUpload.html"),
      filename: "folderUpload.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new Dotenv({
			path: './.env'
		}),
  ],
};
