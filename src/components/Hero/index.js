import _ from 'lodash';
import React, { Component } from 'react';
import { physics, tween, styler, listen, value, transform } from 'popmotion';

import './index.css';
import Hall from './hall.svg';
import Logo from './logo.svg';
import Character from './character.svg';

import Noise1 from './noise_1.gif';
import Noise2 from './noise_2.gif';
import Noise3 from './noise_3.gif';

import AboutPreview from './about_preview.jpg';
import SpeakersPreview from './speakers_preview.jpg';
import WorkshopsPreview from './workshops_preview.jpg';

const NOISE = [Noise1, Noise2, Noise3];

import Circle from './circle';
import Bridge from './bridge';
import Planets from './planets';
import Hexagon from './hexagon';
import Timemachine from './timemachine';
import TimemachineLight from './timemachinelight';

const scrollHeight = () =>
  Math.min(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
  );

const toPercent = {
  y: y => `${y}%`,
  x: x => `${x}%`,
};

const getScrollProgress = scrollY => {
  return scrollY / scrollHeight();
};

export default class Hero extends Component {
  onCircle = circle => (this.circle = circle);

  onBackground = background => (this.background = background);

  onNavigation = navigation => (this.navigation = navigation);

  componentDidMount() {
    if (!this.circle || !this.background || !this.navigation) return;

    const circleStyler = styler(this.circle);
    const backgroundStyler = styler(this.background);
    const navigationStyler = styler(this.navigation);

    const circleTween = tween({
      from: { rotateZ: 0, scale: 1.15, x: -50, y: -50 },
      to: { rotateZ: 60, scale: 2.2, x: -50, y: -50 },
    })
      .pipe(transform.transformMap(toPercent))
      .start(circleStyler.set)
      .pause();

    const navigationTween = tween({
      from: { scale: 0, x: -50, y: -50 },
      to: { scale: 1, x: -50, y: -50 },
    })
      .pipe(transform.transformMap(toPercent))
      .start(navigationStyler.set)
      .pause();

    const backroundTween = tween({
      from: { x: -50, y: -50 },
      to: { x: -50, y: 150 },
    })
      .pipe(transform.transformMap(toPercent))
      .start(backgroundStyler.set)
      .pause();

    listen(window, 'scroll')
      .pipe(() => window.scrollY)
      .pipe(getScrollProgress)
      .start(progress => {
        circleTween.seek(progress);
        backroundTween.seek(progress);
        navigationTween.seek(progress);
      });
  }

  render() {
    const noise = _.sampleSize(NOISE, 3);

    return (
      <section className="Hero">
        <div className="Hero-background" ref={this.onBackground}>
          <img className="Hero-logo" src={Logo} />
          <Bridge />
          <Hexagon />
          <img className="Hero-character" src={Character} />
          <Timemachine />
          <TimemachineLight />
        </div>
        <div className="Hero-circleWrapper" ref={this.onCircle}>
          <Circle />
        </div>
        <div className="Hero-content">
          <Planets />
          <div className="Hero-navigation" ref={this.onNavigation}>
            <a className="Hero-link" href="/speakers">
              <p className="Hero-linkLabel">80's - Speakers</p>
              <img className="Hero-linkBackground" src={SpeakersPreview} />
            </a>
            <a className="Hero-link" href="/workshops">
              <p className="Hero-linkLabel">Light - Workshops</p>
              <img className="Hero-linkBackground" src={WorkshopsPreview} />
            </a>
            <a className="Hero-link" href="/schedule">
              <p className="Hero-linkLabel">Press - Schedule</p>

              <img className="Hero-linkBackground" src={noise[0]} />
              <p className="Hero-linkNote">System malfunction</p>
            </a>
            <a className="Hero-link" href="/location">
              <p className="Hero-linkLabel">Rome - location</p>
              <img className="Hero-linkBackground" src={noise[1]} />
              <p className="Hero-linkNote">System malfunction</p>
            </a>
            <a className="Hero-link" href="/about">
              <p className="Hero-linkLabel">90's - About</p>
              <img className="Hero-linkBackground" src={AboutPreview} />
            </a>
            <div className="Hero-hall">
              <img className="Hero-hallEye" src={Hall} />
            </div>
            <a className="Hero-link" href="/sponsors">
              <p className="Hero-linkLabel">Stone - Sponsors</p>
              <img className="Hero-linkBackground" src={noise[2]} />
              <p className="Hero-linkNote">System malfunction</p>
            </a>
          </div>
        </div>
      </section>
    );
  }
}
