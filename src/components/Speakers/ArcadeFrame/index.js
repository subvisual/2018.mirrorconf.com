import React, { Component } from 'react';
import { linear, cubicBezier } from 'popmotion/easing';
import { getProgressFromValue } from 'popmotion/calc';
import { listen, styler, tween, transform } from 'popmotion';

import { scrollTop, clientWidth, clientHeight } from '../../../utils/dom';

import './index.css';
import arcadeFrame from './arcade-frame.png';

const quicklyEnter = cubicBezier(0, 1, 0, 1);

export default class ArcadeFrame extends Component {
  componentDidMount() {
    if (!this.frame) return;

    listen(window, 'load').start(() => {
      if (clientWidth() > 700) return this.startAnimation();
    });
    listen(window, 'resize').start(this.onResize);
  }

  onFrame = frame => {
    this.frame = frame;
    this.frameStyler = styler(frame);
  };

  onResize = () => {
    if (this.unsubscribe) this.unsubscribe();

    if (clientWidth() > 700) return this.startAnimation();
  };

  scrollProgress = () => {
    if (!this.props.bounds || !this.props.bounds.max) return 0;
    const viewportHeight = clientHeight();

    const min = this.props.bounds.max - viewportHeight * 2;
    const max = this.props.bounds.max - viewportHeight;

    return getProgressFromValue(min, max, scrollTop());
  };

  startAnimation() {
    this.frameTween = tween({
      from: { x: -50, y: -20, opacity: 0, scale: 1.33 },
      to: { x: -50, y: 0, opacity: 1, scale: 1 },
      ease: { x: linear, y: linear, scale: linear, opacity: quicklyEnter },
    })
      .pipe(transform.transformMap({ y: y => `${y}%`, x: x => `${x}%` }))
      .start(this.frameStyler.set)
      .pause();

    const unsubscribe = this.props.addTickListener(() => {
      this.frameTween.seek(this.scrollProgress());
    });

    this.unsubscribe = () => {
      unsubscribe();
      this.frameTween.stop();
    };
  }

  render() {
    return (
      <div className="ArcadeFrame">
        <img
          className="ArcadeFrame-image"
          src={arcadeFrame}
          role="presentation"
          ref={this.onFrame}
        />
      </div>
    );
  }
}
