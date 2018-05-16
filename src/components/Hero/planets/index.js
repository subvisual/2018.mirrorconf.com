import React, { Component } from 'react';
import { linear } from 'popmotion/easing';
import { getProgressFromValue } from 'popmotion/calc';
import {
  listen,
  everyFrame,
  schedule,
  styler,
  tween,
  transform,
} from 'popmotion';

import { scrollTop, clientHeight } from '../../../utils/dom';

import './index.css';

import planet1 from './planet1.svg';
import planet2 from './planet2.svg';
import planet3 from './planet3.svg';

const scrollProgress = () => {
  return getProgressFromValue(0, clientHeight(), scrollTop());
};

const appendPercentSymbol = input => `${input}%`;

const toPercent = transform.transformMap({
  x: appendPercentSymbol,
  y: appendPercentSymbol,
});

export default class Planets extends Component {
  onRoot = root => {
    this.root = root;
    this.rootStyler = styler(root);
  };

  onPlanet1 = planet => {
    this.planet1 = planet;
    this.planet1Styler = styler(planet);
  };

  onPlanet2 = planet => {
    this.planet2 = planet;
    this.planet2Styler = styler(planet);
  };

  onPlanet3 = planet => {
    this.planet3 = planet;
    this.planet3Styler = styler(planet);
  };

  startAnimation() {
    const paralax = tween({
      from: { x: 0, y: 0, scale: 1 },
      to: { x: 10, y: -100, scale: 0.9 },
    })
      .pipe(toPercent)
      .start(this.planet1Styler.set)
      .pause();

    const paralax2 = tween({
      from: { x: 0, y: 0, scale: 1 },
      to: { x: 0, y: 50, scale: 0.7 },
    })
      .pipe(toPercent)
      .start(this.planet2Styler.set)
      .pause();

    const paralax3 = tween({
      from: { x: 0, y: 0, scale: 1 },
      to: { x: -100, y: -100, scale: 1.5 },
    })
      .pipe(toPercent)
      .start(this.planet3Styler.set)
      .pause();

    schedule(everyFrame(), listen(document, 'scroll'))
      .pipe(scrollProgress)
      .start(progress => {
        paralax.seek(progress);
        paralax2.seek(progress);
        paralax3.seek(progress);
      });
  }

  componentDidMount() {
    if (!this.root) return;

    this.startAnimation();
  }

  render() {
    return (
      <div className="Planets" ref={this.onRoot}>
        <img
          className="Planets-planet first"
          ref={this.onPlanet1}
          src={planet1}
        />
        <img
          className="Planets-planet second"
          ref={this.onPlanet2}
          src={planet2}
        />
        <img
          className="Planets-planet third"
          ref={this.onPlanet3}
          src={planet3}
        />
      </div>
    );
  }
}
