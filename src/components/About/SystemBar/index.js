import React, { Component } from 'react';

import './index.module.css';

export default class SystemBar extends Component {
  render() {
    return (
      <div styleName="root" aria-hidden="true">
        <p styleName="title">NCSA Mosaic</p>
      </div>
    );
  }
}
