import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './index.css';
import './reset.css';
import './normalize.css';

const TITLE =
  'Mirror Conf 2018 - a design and front-end development conference';
const SITE_NAME = 'Mirror Conf 2018';
const SITE_IMAGE = '/banner.png';
const SITE_URL = 'http://mirrorconf.com/?edition=2018';
const TWITTER_HANDLER = '@mirrorconf';
const DESCRIPTION =
  'A conference that aims to blur the differences and point towards a collaborative future between designers and front-end developers. Get your ticket!';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title={TITLE}
      meta={[
        {
          name: 'description',
          content: DESCRIPTION,
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: TWITTER_HANDLER },
        { name: 'twitter:title', content: SITE_NAME },
        { name: 'twitter:description', content: DESCRIPTION },
        { name: 'twitter:creator', content: TWITTER_HANDLER },
        { name: 'twitter:image', content: SITE_IMAGE },
        { name: 'og:type', content: 'website' },
        { name: 'og:title', content: SITE_NAME },
        { name: 'og:url', content: SITE_URL },
        { name: 'og:image', content: SITE_IMAGE },
        { name: 'og:description', content: DESCRIPTION },
        { name: 'og:site_name', content: SITE_NAME },
        {
          name: 'fb:admins',
          content: '100000633932565,1448175923,707387762,1187622729',
        },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#ffffff' },
      ]}
    >
      <meta itemProp="name" content={SITE_NAME} />
      <meta itemProp="description" content={DESCRIPTION} />
      <meta itemProp="image" content={SITE_IMAGE} />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="stylesheet" href="https://use.typekit.net/wfl2jor.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.7.3/pixi.min.js" />
    </Helmet>
    {children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
