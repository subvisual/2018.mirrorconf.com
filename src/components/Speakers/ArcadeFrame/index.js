import _ from 'lodash';
import React, { Component } from 'react';
import { linear, cubicBezier } from 'popmotion/easing';
import { listen, styler, keyframes, transform, composite } from 'popmotion';

import { clientWidth } from '../../../utils/dom';

import './index.css';
import arcadeFrame from './arcade-frame.png';
import reflection from './reflection.png';

const quicklyEnter = cubicBezier(0.16, 1.43, 0.83, 0.85);

export default class ArcadeFrame extends Component {
  componentDidMount() {
    if (!this.frame) return;

    if (clientWidth() > 700) return this.startAnimation();

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

  startAnimation() {
    const times = [0, 0.5, 0.75, 1];

    this.frameAnimation = composite({
      y: keyframes({ ease: linear, values: [-28, 0, 0, -28], times }),
      scale: keyframes({ ease: linear, values: [1.33, 1, 1, 1.33], times }),
      opacity: keyframes({
        ease: linear,
        values: [0, 1, 1],
        times: [0, 0.1, 1],
      }),
    })
      .pipe(transform.transformMap({ y: y => `${y}%` }))
      .start(this.frameStyler.set)
      .pause();

    const unsubscribe = this.props.addTickListener(() => {
      const progress = this.props.scrollProgress();

      _.each(this.frameAnimation, animation => animation.seek(progress));
    });

    this.unsubscribe = () => {
      unsubscribe();
      _.each(this.frameAnimation, animation => animation.stop());
    };
  }

  render() {
    return (
      <div className="ArcadeFrame">
        <div className="ArcadeFrame-wrapper" ref={this.onFrame}>
          <img
            className="ArcadeFrame-image"
            src={arcadeFrame}
            role="presentation"
          />
        </div>
      </div>
    );
  }
}
