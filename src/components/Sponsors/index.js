import React, { Component } from 'react';

import './index.css';

import wifiLabel from './wifi_label.svg';
import quizLabel from './quiz_label.svg';
import stoneLabel from './stone_label.svg';
import mediaLabel from './media_label.svg';
import goldLabel from './gold_label.svg';
import platinumLabel from './platinum_label.svg';

import SeegnoLogo from './seegno.svg';

export default class Sponsors extends Component {
  render() {
    return (
      <section className="Sponsors" id="sponsors">
        <div className="Sponsors-content">
          <div className="Sponsors-group">
            <img alt="Wifi sponsor" src={wifiLabel} />
            <div className="Sponsors-groupContent">
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
            </div>
          </div>
          <div className="Sponsors-group">
            <img alt="Quiz sponsor" src={quizLabel} />
            <div className="Sponsors-groupContent">
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
            </div>
          </div>
          <div className="Sponsors-group">
            <img alt="Stone sponsors" src={stoneLabel} />
            <div className="Sponsors-groupContent">
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
            </div>
          </div>
          <div className="Sponsors-group">
            <img alt="Media sponsors" src={mediaLabel} />
            <div className="Sponsors-groupContent">
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
            </div>
          </div>
          <div className="Sponsors-group">
            <img alt="Gold sponsors" src={goldLabel} />
            <div className="Sponsors-groupContent">
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
            </div>
          </div>
          <div className="Sponsors-group">
            <img alt="Platinum sponsors" src={platinumLabel} />
            <div className="Sponsors-groupContent">
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
              <img alt="Seegno" className="Sponsors-logo" src={SeegnoLogo} />
            </div>
          </div>
          <div className="Sponsors-group">
            <div className="Sponsors-firePlaholder" />
          </div>
        </div>
      </section>
    );
  }
}
