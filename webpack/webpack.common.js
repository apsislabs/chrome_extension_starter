const webpack = require("webpack");
const path = require("path");
const env = require("../utils/env");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const alias = {
  "execute-async-function": path.resolve(
    __dirname,
    "..",
    "node_modules",
    "chrome-extension-async",
    "execute-async-function.js"
  )
};

const fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2"
];

const options = {
  entry: {
    popup: path.resolve(__dirname, "..", "src", "view", "popup", "popup.js"),
    options: path.resolve(
      __dirname,
      "..",
      "src",
      "view",
      "options",
      "options.js"
    ),
    background: [
      path.resolve(__dirname, "..", "src", "background", "index.js")
    ],
    "content-script": [
      path.resolve(__dirname, "..", "src", "content-script", "index.js")
    ]
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["content-script"]
  },
  output: {
    path: path.resolve(__dirname, "..", "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /node_modules/
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"), // eslint-disable-line no-useless-escape
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {
              precision: 10
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map(extension => "." + extension)
      .concat([".jsx", ".js", ".css", "scss"])
  },
  plugins: [
    // clean the build folder
    new CleanWebpackPlugin(["build"], {
      root: path.resolve(__dirname, "..")
    }),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
    }),
    new CopyWebpackPlugin([
      {
        from: "src/manifest.json",
        transform: function(content, path) {
          // generates the manifest file using the package.json informations
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString())
            })
          );
        }
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "..",
        "src",
        "view",
        "popup",
        "popup.html"
      ),
      filename: "popup.html",
      chunks: ["popup"]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "..",
        "src",
        "view",
        "options",
        "options.html"
      ),
      filename: "options.html",
      chunks: ["options"]
    }),
    new ManifestPlugin({
      fileName: "asset.manifest.json"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:6].css",
      chunkFilename: "[name].[chunkhash:6].css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new WriteFilePlugin()
  ]
};

module.exports = options;
