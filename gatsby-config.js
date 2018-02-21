const postCSSCustomProperties = require('postcss-custom-properties');

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  pathPrefix: '/2018.mirrorconf.com',
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-css-modules',
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [postCSSCustomProperties()],
      },
    },
  ],
};
