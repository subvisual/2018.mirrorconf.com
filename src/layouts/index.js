import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './reset.css';
import './normalize.css';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Mirror Conf 2018: a design and front-end development conference"
      meta={[
        { name: 'description', content: 'A conference that aims to blur the differences and point towards a collaborative future between designers and front-end developers. Get your early bird ticket!' },
      ]}
    >
      <link rel="stylesheet" href="https://use.typekit.net/wfl2jor.css" />
    </Helmet>
    {children()}
    <a href="https://github.com/subvisual/2018.mirrorconf.com/tree/under-construction" target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: 0, right: 0 }}>
      <img width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_red_aa0000.png?resize=149%2C149" alt="Fork me on GitHub" />
    </a>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
