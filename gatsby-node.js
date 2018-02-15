const createPages = require('./create-pages.js');

exports.modifyWebpackConfig = ({ config }) =>
  config.merge({
    output: {
      chunkFilename: '[name].bundle.js',
    },
  });

exports.createPages = createPages;
