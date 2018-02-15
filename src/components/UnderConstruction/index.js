import React, { Component } from 'react';
import Cloud from "./cloud.png"
import Moon from "./moon.gif"
import Hasselhoff from "./hasselhoff.png"
import Spaceship from "./spaceship.gif"
import ConstructionBanner from "./construction_banner.gif"
import RoadSign from "./road_sign.gif"
import Baby from "./baby.gif"
import Hand from "./hand.gif"
import Sonic from "./sonic.gif"
import BuyNow from "./buy_now.gif"
import GodMode from "./god_mode.gif"
import Pyramid from "./pyramid.gif"
import RunningMan from "./running_man.gif"
import Welcome from "./welcome.gif"
import BlackHole from "./black_hole.gif"
import Boom from "./boom.gif"
import ProspectusPdf from './sponsorship_prospectus.pdf'

import './index.module.css';

export default class UnderConstruction extends Component {
  getRandomWidth() {
    var maxGifWidth = 200;
    var centralTextHalfWidth = 208;
    var min = Math.ceil(0);
    var max = Math.floor(document.documentElement.scrollWidth) - maxGifWidth;
    var randomValue = Math.floor(Math.random() * (max - min + 1)) + min;

    var pageMidpoint = Math.floor(document.documentElement.scrollWidth / 2);
    var initialLimit = pageMidpoint - centralTextHalfWidth - maxGifWidth;
    var finalLimit = pageMidpoint + centralTextHalfWidth;

    if (randomValue > initialLimit && randomValue < pageMidpoint) {
      return randomValue - centralTextHalfWidth - maxGifWidth;
    } else if (randomValue > pageMidpoint && randomValue < finalLimit) {
      return randomValue + centralTextHalfWidth;
    } else {
      return randomValue
    }
  }

  getRandomHeight() {
    var min = Math.ceil(300);
    var max = Math.floor(document.documentElement.scrollHeight) - 255;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getOpacity(offset = 0) {
    return Math.abs(Math.round(Math.random() - offset))
  }

  render() {
    if (typeof(document) === "undefined") return null;

    return (
      <section styleName="root">
        <div styleName="runningManWrapper">
          <img
            src={RunningMan}
            style={
              {
                top: `${this.getRandomHeight()}px`,
              }
            }
            styleName="runningMan"></img>
        </div>
        <img src={Cloud} styleName="cloud"></img>
        <img src={Cloud} styleName="cloud"></img>
        <img src={Cloud} styleName="cloud"></img>
        <img
          style={
            {
              top: `${this.getRandomHeight()}px`,
              left: `${this.getRandomWidth()}px`,
              opacity: `${this.getOpacity()}`
            }
          }
          src={Boom}
          styleName="boom"
        />
        <div
          style={
            {
              top: `${this.getRandomHeight()}px`,
              left: `${this.getRandomWidth()}px`            }
          }
          styleName="buffalo"
        />
        <div
          style={
            {
              top: `${this.getRandomHeight()}px`,
              left: `${this.getRandomWidth()}px`,
              opacity: `${this.getOpacity(0.3)}`
            }
          }
          styleName="worship"
        >
          <img src={Pyramid} styleName="pyramid"/>
          <img src={GodMode} styleName="godMode" />
        </div>
        <div styleName="sun" />
        <div styleName="planet1" />
        <div styleName="planet2" />
        <div styleName="planet3" />
        <div styleName="hero">
          <div styleName="navBar">
            <a styleName="previousEditionWrapper" href="http://2017.mirrorconf.com/">
              <img src={BlackHole} styleName="blackhole" />
              <p styleName="navBarLink">Go to last year’s website</p>
            </a>
            <a href={ProspectusPdf}>
              <p styleName="navBarLink">Sponsor Prospectus</p>
            </a>
          </div>
          <div styleName="hasselmoon">
            <img src={Spaceship} styleName="spaceship1"></img>
            <img src={Moon} styleName="moon"></img>
            <img src={Hasselhoff} styleName="hassel"></img>
          </div>
        </div>
        <div styleName="roadblock">
          <div styleName="warningBannerWrapper">
            <div styleName="warningBanner" />
          </div>
          <img src={Sonic} styleName="sonic" />
          <img src={ConstructionBanner} styleName="constructionBanner"/>
          <img src={Sonic} styleName="sonic" />
          <div styleName="warningBannerWrapper">
            <div styleName="warningBanner" />
          </div>
        </div>
        <div styleName="section">
          <img src={Welcome} styleName=""></img>
          <div styleName="title">MirrorConf 2018 Website</div>
          <img src={Spaceship} styleName="spaceship2"></img>
          <img src={Spaceship} styleName="spaceship3"></img>
          <div styleName="text">15th to 19th October</div>
          <div styleName="text">Braga, Portugal</div>
        </div>
        <div styleName="section">
          <a styleName="buyNowWrapper" href="https://ti.to/subvisual/mirror-conf-2018/with/krxd0s3-khw">
            <p styleName="link">Buy your Early Bird here</p>
            <img src={BuyNow} styleName="buyNow" />
            <p styleName="phantomLink">Buy your Early Bird here</p>
          </a>

          <div styleName="discount">
            <img src={Hand} styleName="hand" />
            <a href="https://ti.to/subvisual/mirror-conf-2018/with/krxd0s3-khw" styleName="note">(save 100€ buying early!)</a>
            <img src={Hand} styleName="hand" />
          </div>
          <img src={Baby} styleName="baby" />
        </div>

      </section>
    );
  }
}
