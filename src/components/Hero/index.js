import _ from 'lodash';
import React, { Component } from 'react';

import Planets from './planets';
import Navigation from './navigation';
import BackgroundScene from './background';

import './index.css';

const toPercent = { x: x => `${x}%`, y: y => `${y}%` };

export default class Hero extends Component {
  render() {
    return (
      <section className="Hero" id="hero" tabIndex="0">
        <div className="Hero-background">
          <BackgroundScene addTickListener={this.props.addTickListener} />
          <div className="Hero-planets">
            <Planets />
          </div>
        </div>
        <div className="Hero-content">
          <div className="Hero-navigation">
            <Navigation />
          </div>
        </div>
      </section>
    );
  }
}
