import _ from 'lodash';
import React, { Component } from 'react';
import { linear, circOut } from 'popmotion/easing';
import { getProgressFromValue } from 'popmotion/calc';
import { listen, styler, tween, transform } from 'popmotion';

import {
  scrollTop,
  scrollHeight,
  clientWidth,
  clientHeight,
} from '../../utils/dom';

import './index.css';
import arcadeFrame from './arcade-frame.png';
import arcadeReflection from './reflection.png';
import redJoystick from './red-joystick.svg';
import blueJoystick from './blue-joystick.svg';

const fixPosition = (...stylers) =>
  stylers.forEach(styler => {
    if (styler.get('position') === 'fixed') return;

    styler.set('position', 'fixed');
  });

const unfixPosition = (...stylers) =>
  stylers.forEach(styler => {
    if (styler.get('position') !== 'fixed') return;

    styler.set('position', 'absolute');
  });

export default class Footer extends Component {
  constructor() {
    super();
    this.state = { height: 0, min: 0, max: 0 };
  }

  onRoot = root => {
    this.root = root;
    this.rootStyler = styler(root);
  };

  onFrame = frame => {
    this.frame = frame;
    this.frameStyler = styler(frame);
  };

  onContent = content => {
    this.content = content;
    this.contentStyler = styler(content);
  };

  progressToEnter() {
    if (!this.state.min || !this.state.max) return 0;

    const height = scrollHeight();
    const viewportHeight = clientHeight();
    const min = this.state.min - viewportHeight * 2;
    const max = height - viewportHeight;
    return getProgressFromValue(min, max, scrollTop());
  }

  scrollProgressToEnd = () => {
    const height = scrollHeight();
    const viewportHeight = clientHeight();

    const min = height - viewportHeight * 1.6;
    const max = height - viewportHeight;

    return getProgressFromValue(min, max, scrollTop());
  };

  update() {
    const progress = this.scrollProgressToEnd();

    if (this.progressToEnter() >= 0)
      fixPosition(this.frameStyler, this.rootStyler);
    if (this.progressToEnter() < 0)
      unfixPosition(this.frameStyler, this.rootStyler);

    this.frameTween.seek(progress);
    this.screenTween.seek(progress);
  }

  startAnimation() {
    this.frameTween = tween({
      from: { x: -50, y: -19, scale: 1.33 },
      to: { x: -50, y: 0, scale: 1 },
      ease: linear,
    })
      .pipe(transform.transformMap({ y: y => `${y}%`, x: x => `${x}%` }))
      .start(this.frameStyler.set)
      .pause();

    this.screenTween = tween({
      ease: linear,
      from: { opacity: 0, y: -1, x: -50, scale: 1.33 },
      to: { opacity: 1, y: 18, x: -50, scale: 1 },
    })
      .pipe(
        transform.transformMap({
          y: y => `${y}%`,
          x: x => `${x}%`,
          opacity: transform.interpolate([0, 0.6, 1], [0, 0, 1]),
        }),
      )
      .start(this.rootStyler.set)
      .pause();

    const unsubscribe = this.props.addTickListener(
      _.throttle(this.update.bind(this), 20),
    );
  }

  calculateBounds() {
    const { height, top, bottom } = this.root.getBoundingClientRect();

    const min = top + scrollTop();
    const max = bottom + scrollTop();

    if (!height) setTimeout(() => this.calculateBounds(), 100);
    else this.rootStyler.set('height', clientHeight());

    this.setState({ height, min, max });

    if (clientWidth() > 700)
      return requestAnimationFrame(() => this.startAnimation());
  }

  componentDidMount() {
    if (!this.root || !this.frame) return;

    listen(window, 'load').start(() => this.calculateBounds());
    listen(window, 'resize').start(() => this.calculateBounds());
  }

  render() {
    return (
      <footer id="Footer" className="Footer">
        <div className="Footer-main" ref={this.onRoot}>
          <div className="Footer-contentWrapper">
            <h2 className="Footer-title">
              Thank you Mario! <br />
              But the site isn't over yet!
            </h2>

            <nav className="Footer-links">
              <a
                className="Footer-link primary"
                target="_blank"
                href="https://ti.to/subvisual/mirror-conf-2018/with/krxd0s3-khw"
              >
                Buy your ticket
              </a>
              <a
                className="Footer-link"
                href="https://www.papercall.io/mirrorconf2018"
                target="_blank"
              >
                Call for Proposals
              </a>
            </nav>

            <nav
              className="Footer-social"
              aria-labelledby="footer-social-links"
            >
              <h2 className="Footer-title" id="footer-social-links">
                Follow us
              </h2>
              <div className="Footer-links">
                <a
                  target="_blank"
                  className="Footer-link"
                  href="https://www.facebook.com/mirrorconf/"
                >
                  Facebook
                </a>
                <a
                  target="_blank"
                  className="Footer-link"
                  href="https://twitter.com/MirrorConf"
                >
                  Twitter
                </a>
                <a
                  target="_blank"
                  className="Footer-link"
                  href="https://www.youtube.com/channel/UCDez53TT1_v3jr3lGv-QhKw"
                >
                  Youtube
                </a>
              </div>
            </nav>
          </div>
          <img
            className="Footer-arcadeReflection"
            src={arcadeReflection}
            role="presentation"
          />
        </div>
        <img
          className="Footer-arcadeFrame"
          src={arcadeFrame}
          ref={this.onFrame}
          role="presentation"
        />
      </footer>
    );
  }
}
