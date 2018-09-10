import React, { Component } from 'react';

import './index.css';

import wifiLabel from './wifi_label.svg';
import quizLabel from './quiz_label.svg';
import partnershipsLabel from './partnerships_label.svg';
import stoneLabel from './stone_label.svg';
import mediaLabel from './media_label.svg';
import goldLabel from './gold_label.svg';
import platinumLabel from './platinum_label.svg';

import BalsamiqLogo from './logos/balsamiq.png';
import BurocratikLogo from './logos/burocratik.svg';
import HostelworldLogo from './logos/hostelworld.svg';
import MediawebLogo from './logos/mediaweb.png';
import PixelmattersLogo from './logos/pixelmatters.svg';
import PWITLogo from './logos/portuguese_women_in_tech.png';


export default class Sponsors extends Component {
  render() {
    return (
      <section className="Sponsors" id="sponsors">
        <div className="Sponsors-content">
          <div className="Sponsors-topGroup">
            <div className="Sponsors-group">
              <img alt="Platinum sponsors" src={platinumLabel} />
              <div className="Sponsors-groupContent">
              </div>
            </div>
            <div className="Sponsors-group">
              <img alt="Gold sponsors" src={goldLabel} />
              <div className="Sponsors-groupContent">
                <img alt="Hostelworld" className="Sponsors-logo" src={HostelworldLogo} />
              </div>
            </div>
          </div>
          <div className="Sponsors-group">
            <img alt="Stone sponsors" src={stoneLabel} />
            <div className="Sponsors-groupContent">
              <img alt="Balsamiq" className="Sponsors-logo" src={BalsamiqLogo} />
              <img alt="Pixelmatters" className="Sponsors-logo" src={PixelmattersLogo} />
              <img alt="Mediaweb" className="Sponsors-logo" src={MediawebLogo} />
              <img alt="Burocratik" className="Sponsors-logo" src={BurocratikLogo} />
            </div>
          </div>
          <div className="Sponsors-group">
            <img alt="Partnerships" src={partnershipsLabel} />
            <div className="Sponsors-groupContent">
              <img alt="Portuguese Women In Tech" className="Sponsors-logo" src={PWITLogo} />
            </div>
          </div>
          <div className="Sponsors-group">
            <img alt="Media sponsors" src={mediaLabel} />
            <div className="Sponsors-groupContent">
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
