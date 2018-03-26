import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

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
    </Helmet>
    <div id="Body">{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
