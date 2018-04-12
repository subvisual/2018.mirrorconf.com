import React, { Component } from 'react';

import Backwards from './backwards.svg';
import Connection from './connection.png';
import Forward from './forward.svg';
import Refresh from './refresh.svg';

import AddressFieldsContainer from './AddressFieldsContainer';

import './index.module.css';

export default class CommandBar extends Component {
  render() {
    return (
      <div styleName="root">
        <div styleName="navigation">
          <img aria-hidden="true" src={Backwards} styleName="button" />
          <img aria-hidden="true" src={Forward} styleName="button" />
          <img aria-hidden="true" src={Refresh} styleName="button" />
        </div>
        <div styleName="addressBar">
          <AddressFieldsContainer />
          <div styleName="connectContainer">
            <img aria-hidden="true" src={Connection} styleName="connect" />
          </div>
        </div>
      </div>
    );
  }
}
