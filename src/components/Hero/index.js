import _ from 'lodash';
import * as PIXI from 'pixi.js';
import React, { Component } from 'react';
import { getProgressFromValue } from 'popmotion/calc';
import { linear } from 'popmotion/easing';
import { tween, styler, transform, listen } from 'popmotion';

import BackgroundScene from './background';

import { scrollTop, clientHeight } from '../../utils/dom';
import Planets from './planets';
import Navigation from './navigation';

import './index.css';

const toPercent = { x: x => `${x}%`, y: y => `${y}%` };

export default class Hero extends Component {
  constructor() {
    super();
    this.state = { height: 0 };
  }

  onRoot = root => (this.root = root);

  onNavigation = navigation => (this.navigationStyler = styler(navigation));

  scrollProgress = () =>
    getProgressFromValue(0, this.state.height - clientHeight(), scrollTop());

  startAnimation = () => {
    const elapsed = this.scrollProgress();

    const navigationTween = tween({
      elapsed,
      duration: 1,
      ease: linear,
      from: { opacity: 0, scale: 0.5, x: -50, y: -50 },
      to: { opacity: 1, scale: 1, x: -50, y: -50 },
    })
      .pipe(transform.transformMap(toPercent))
      .start(this.navigationStyler.set)
      .pause();

    this.props.onScroll(() => navigationTween.seek(this.scrollProgress()));
  };

  onResize() {
    if (this.animation) this.animation.stop();

    const { width, height } = this.root.getBoundingClientRect();

    this.setState({ width, height });
    requestAnimationFrame(() => this.startAnimation());
  }

  componentDidMount() {
    if (!this.root || !this.navigationStyler) return;

    listen(window, 'load').start(() => {
      const { width, height } = this.root.getBoundingClientRect();

      this.setState({ width, height });

      requestAnimationFrame(() => this.startAnimation());
    });

    listen(window, 'resize').start(() => this.onResize());
  }

  render() {
    return (
      <section className="Hero" id="hero" ref={this.onRoot} tabIndex="0">
        <div className="Hero-background" ref={this.onBackground}>
          <BackgroundScene onScroll={this.props.onScroll} />
          <div className="Hero-planets">
            <Planets />
          </div>
        </div>
        <div className="Hero-content">
          <div className="Hero-navigationWrapper">
            <div className="Hero-navigation" ref={this.onNavigation}>
              <Navigation />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
