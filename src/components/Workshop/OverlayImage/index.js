import React, { Component } from 'react';

import './index.css';

export default class OverlayImage extends Component {
  render() {
    return (
      <div className="OverlayImage">
        <img
          alt={this.props.alt}
          src={this.props.src}
          className="OverlayImage-image"
        />
        <img src={this.props.overlay} className="OverlayImage-overlay" />
      </div>
    );
  }
}
