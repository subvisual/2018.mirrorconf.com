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

  scrollProgressToFade = () => {
    const height = scrollHeight();
    const viewportHeight = clientHeight();

    const min = height - viewportHeight * 1.4;
    const max = height - viewportHeight;

    return getProgressFromValue(min, max, scrollTop());
  };

  update() {
    const progress = this.scrollProgressToEnd();

    if (this.progressToEnter() >= 0)
      fixPosition(this.frameStyler, this.rootStyler);
    if (this.progressToEnter() < 0)
      unfixPosition(this.frameStyler, this.rootStyler);

    this.frameTween.seek(this.scrollProgressToEnd());
    this.screenTween.seek(this.scrollProgressToFade());
  }

  startAnimation() {
    this.frameTween = tween({
      from: { y: -19, scale: 1.33 },
      to: { y: 0, scale: 1 },
      ease: linear,
    })
      .pipe(transform.transformMap({ y: y => `${y}%` }))
      .start(this.frameStyler.set)
      .pause();

    this.screenTween = tween({
      ease: linear,
      from: { opacity: 0, y: 5, x: -50, scale: 0.9 },
      to: { opacity: 1, y: 18, x: -50, scale: 0.9 },
    })
      .pipe(transform.transformMap({ y: y => `${y}%`, x: x => `${x}%` }))
      .start(this.rootStyler.set)
      .pause();

    const unsubscribe = this.props.addTickListener(
      _.throttle(this.update.bind(this), 20),
    );

    this.unsubscribe = () => {
      unsubscribe();
      this.frameTween.stop();
      this.screenTween.stop();
    };
  }

  calculateBounds() {
    if (this.unsubscribe) this.unsubscribe();

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

    listen(this.frame, 'load').start(() => this.calculateBounds());
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

            <div className="Footer-links">
              <a className="Footer-link primary" href="/#">
                Buy your ticket
              </a>
              <a className="Footer-link" href="/#">
                Call for Proposals
              </a>
            </div>

            <div className="Footer-social">
              <h2 className="Footer-title">Follow us</h2>
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
            </div>
          </div>
          <img className="Footer-joystick left" src={redJoystick} />
          <img className="Footer-joystick right" src={blueJoystick} />
          <img className="Footer-arcadeReflection" src={arcadeReflection} />
        </div>
        <img
          className="Footer-arcadeFrame"
          src={arcadeFrame}
          ref={this.onFrame}
        />
      </footer>
    );
  }
}
