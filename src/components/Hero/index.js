import React, { Component } from 'react';

import './index.css';

import Planets from './planets';
import Navigation from './navigation';
import Background from './background';

export default class Hero extends Component {
  render() {
    return (
      <section className="Hero" id="hero" tabIndex="0">
        <div className="Hero-background">
          <Background />
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
