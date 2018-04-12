import React, { Component } from 'react';

import './index.module.css';

export default class AddressFieldsContainer extends Component {
  render() {
    return (
      <div styleName="root" aria-hidden="true">
        <div styleName="field">
          <span styleName="legend">Document Title:</span>
          <span styleName="input">About Mirror Conf</span>
        </div>
        <div styleName="field">
          <span styleName="legend">Document URL:</span>
          <span styleName="input">http://www.mirrorconf.com/#about</span>
        </div>
      </div>
    );
  }
}
