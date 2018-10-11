const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = merge(common, {
  devtool: "source-map",
  mode: "development",
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false
    })
  ]
});
