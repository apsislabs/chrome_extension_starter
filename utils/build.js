const webpack = require("webpack");
const config = require("../webpack/webpack.prod");

delete config.chromeExtensionBoilerplate;

webpack(config, function(err) {
  if (err) throw err;
});
