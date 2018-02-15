import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './reset.css';
import './normalize.css';
import './fonts.css';
import './index.css';

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
      ]}
    >
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLER} />
      <meta name="twitter:title" content={SITE_NAME} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:creator" content={TWITTER_HANDLER} />
      <meta
        name="twitter:image"
        content={`https://mirrorconf.com${SITE_IMAGE}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={SITE_NAME} />
      <meta property="og:url" content={SITE_URL} />
      <meta
        property="og:image"
        content={`https://mirrorconf.com${SITE_IMAGE}`}
      />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta
        property="fb:admins"
        content="100000633932565,1448175923,707387762,11876227"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
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
      <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
      <link rel="icon" type="image/x-icon" href="favicon.ico" />
      <link rel="manifest" href="/manifest.json" />

      <link rel="stylesheet" href="https://use.typekit.net/wfl2jor.css" />
    </Helmet>

    <div className="Layout">{children()}</div>

    <a href="https://github.com/subvisual/2018.mirrorconf.com" target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: 0, right: 0 }}>
      <img width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149" alt="Fork me on GitHub" />
    </a>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

TemplateWrapper.defaultProps = {
  children: [],
};

export default TemplateWrapper;
