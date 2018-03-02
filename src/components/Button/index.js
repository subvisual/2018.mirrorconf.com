import React, { Component } from 'react';

import './index.css';

export default class Button extends Component {
  onClick = event => {
    if (!this.props.onClick) return;

    this.props.onClick(event);
  };

  render() {
    return (
      <a className="Button" href={this.props.href} onClick={this.onClick}>
        {this.props.children}
      </a>
    );
  }
}
