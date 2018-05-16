const postCSSCustomProperties = require('postcss-custom-properties');

module.exports = {
  siteMetadata: {
    title: 'Mirror Conf - The future of web',
  },
  pathPrefix: '/2018.mirrorconf.com',
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-react-css-modules',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        include: /speakers_list/,
      },
    },
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [postCSSCustomProperties()],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'YUA-116337195-1',
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
  ],
};
