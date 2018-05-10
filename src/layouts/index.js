import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './index.css';
import './reset.css';
import './normalize.css';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    >
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
