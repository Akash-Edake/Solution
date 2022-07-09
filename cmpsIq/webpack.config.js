const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require('path');
module.exports = (webpackConfigEnv, argv) => {
  
  const defaultConfig = singleSpaDefaults({
    orgName: "linkLogistics",
    projectName: "compsApp",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    resolve: {
      alias: {
        "@features": path.resolve(__dirname, 'src/features'),
        "@pages": path.resolve(__dirname, 'src/pages')
      },
    },
    // modify the webpack config however you'd like to by adding to this object
  });
};
