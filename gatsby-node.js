/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 // You can delete this file if you're not using it

 /* eslint-disable global-require */

exports.modifyWebpackConfig = ({ config }) => {
  config.loader('file-loader', {
    test: /\.pdf$/,
    loader: 'file-loader'
  });

  return config;
};
