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
import FarfetchLogo from './logos/farfetch.svg';
import HiLogo from './logos/hi.svg';
import HostelworldLogo from './logos/hostelworld.svg';
import MediawebLogo from './logos/mediaweb.png';
import PixelmattersLogo from './logos/pixelmatters.svg';
import PWITLogo from './logos/pwit.svg';
import ProzisLogo from './logos/prozis.svg';
import SeegnoLogo from './logos/seegno.svg';
import XingLogo from './logos/xing.svg';

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
                <a href="http://www.farfetch.com/">
                  <img alt="FarfetchLogo" className="Sponsors-logo" src={FarfetchLogo} />
                </a>
                <a href="https://www.hostelworld.com/">
                  <img alt="Hostelworld" className="Sponsors-logo" src={HostelworldLogo} />
                </a>
                <a href="https://www.xing.com/en">
                  <img alt="XingLogo" className="Sponsors-logo" src={XingLogo} />
                </a>
                <a href="https://www.hi-interactive.pt/en/">
                  <img alt="HiLogo" className="Sponsors-logo" src={HiLogo} />
                </a>
                <a href="https://www.hi-interactive.pt/en/">
                  <img alt="SeegnoLogo" className="Sponsors-logo" src={SeegnoLogo} />
                </a>
              </div>
            </div>
          </div>
          <div className="Sponsors-group">
            <img alt="Stone sponsors" src={stoneLabel} />
            <div className="Sponsors-groupContent">
              <a href="https://balsamiq.com/">
                <img alt="Balsamiq" className="Sponsors-logo" src={BalsamiqLogo} />
              </a>
              <a href="http://pixelmatters.com/">
                <img alt="Pixelmatters" className="Sponsors-logo" src={PixelmattersLogo} />
              </a>
              <a href="https://mediaweb.pt/">
                <img alt="Mediaweb" className="Sponsors-logo" src={MediawebLogo} />
              </a>
              <a href="https://www.burocratik.com/">
                <img alt="Burocratik" className="Sponsors-logo" src={BurocratikLogo} />
              </a>
              <a href="https://www.prozis.com/pt/en">
                <img alt="Prozis" className="Sponsors-logo" src={ProzisLogo} />
              </a>
            </div>
          </div>
          <div className="Sponsors-group">
            <img alt="Partnerships" src={partnershipsLabel} />
            <div className="Sponsors-groupContent">
              <a href="http://www.portuguesewomenintech.com/">
                <img alt="Portuguese Women In Tech" className="Sponsors-pwit" src={PWITLogo} />
              </a>
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
