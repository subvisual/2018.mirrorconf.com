import { pointer, styler, listen, tween } from 'popmotion';
import React, { Component } from 'react';
import { clientWidth } from '../../utils/dom';

import './index.css';
import lightSrc from './light.svg';

const fadeOutTween = elementStyler =>
  tween({
    duration: 1000,
    from: { scale: 1, opacity: 1 },
    to: { scale: 1, opacity: 0 },
  }).start(elementStyler.set);

const fadeInTween = elementStyler =>
  tween({
    duration: 1000,
    to: { scale: 1, opacity: 1 },
    from: { scale: 1, opacity: 0 },
  }).start(elementStyler.set);

export default class Light extends Component {
  componentDidMount() {
    if (!this.light || !this.styler) return;

    this.startAnimation();
    listen(document, 'scroll').start(this.controlAnimation);
  }

  componentWillUnmount() {
    if (this.animation) return this.animation.stop();
  }

  onLight = light => {
    this.light = light;
    this.styler = styler(light);
  };

  pauseAnimation = () => {
    this.animation.stop();
    this.animation = null;
    fadeOutTween(this.styler);
  };

  startAnimation = () => {
    fadeInTween(this.styler);
    this.animation = pointer(this.styler.get)
      .while(() => clientWidth() >= 760)
      .start(this.styler.set);
  };

  controlAnimation = () => {
    const progress = this.props.progress();

    if ((progress < 0 || progress > 1) && this.animation)
      return this.pauseAnimation();

    if (progress >= 0 && progress <= 1 && !this.animation)
      return this.startAnimation();
  };

  render() {
    return (
      <div className="Light">
        <div className="Light-wrapper">
          <div className="Light-imageWrapper" ref={this.onLight}>
            <img className="Light-image" src={lightSrc} />
          </div>
        </div>
      </div>
    );
  }
}
