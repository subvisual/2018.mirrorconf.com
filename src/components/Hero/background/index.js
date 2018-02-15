import _ from 'lodash';
import React, { Component } from 'react';

import './index.css';
import machine from './machine.svg';

export default class Background extends Component {
  render() {
    return (
      <div className="Background">
        <div className="Background-content">
          <img
            className="Background-machine"
            src={machine}
          />
          <h1 className="visuallyHidden">Mirror Conf 2018</h1>
          <h2 className="visuallyHidden">The future of the web</h2>
          <div className="Background-visibleTitle">
            <p className="Background-text">The future of the web</p>
          </div>
          <div className="Background-date">
            <p className="Background-text">October 15-19</p>
          </div>
          <div className="Background-location">
            <p className="Background-text">Braga, Portugal</p>
          </div>
          <a
            className="Background-cta"
            href="https://ti.to/subvisual/mirror-conf-2018/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="Background-ctaGlow" />
            <div className="Background-ctaTextBackground" />
            <p className="Background-ctaText">Buy your tickets</p>
          </a>
          <a
            className="Background-cta secondary"
            href="/sponsorship_prospectus_2018.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sponsor us
          </a>
        </div>
      </div>
    );
  }
}
