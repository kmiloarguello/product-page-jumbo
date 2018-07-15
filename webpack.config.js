const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["babel-polyfill", path.resolve(__dirname, "src/index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/product-page-jumbo-[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1
              }
            },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000000,
            name: "img/BMW/product-page-jumbo-[name].[ext]"
          }
        }
      },
      {
        test: /\.(mp4)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000000,
            mimetype: "video/mp4",
            name: "video/product-page-jumbo-[name].[hash].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/product-page-jumbo-[name].css"),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "src/html/index.html"),
      title: "Jumbo page"
    })
  ]
};
