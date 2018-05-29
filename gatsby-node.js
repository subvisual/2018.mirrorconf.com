exports.modifyWebpackConfig = ({ config }) =>
  config.merge({
    output: {
      chunkFilename: '[name].bundle.js',
    },
  });
