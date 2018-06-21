import { pointer, styler, listen, tween } from 'popmotion';
import React, { Component } from 'react';
import { clientWidth } from '../../utils/dom';

import './index.css';
import lightSrc from './light.svg';

const fadeOutTween = elementStyler =>
  tween({
    duration: 1000,
    from: { scale: 1, opacity: 1 },
    to: { scale: 0, opacity: 0 },
  }).start(elementStyler.set);

const fadeInTween = elementStyler =>
  tween({
    duration: 300,
    from: { scale: 0.2, opacity: 0 },
    to: { scale: 1, opacity: 1 },
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

    if (this.fadeIn) {
      this.fadeIn.stop();
      this.fadeIn = null;
      fadeOutTween(this.styler).seek(1);
    } else {
      fadeOutTween(this.styler);
    }
  };

  startAnimation = lightGrowProgress => {
    if (lightGrowProgress >= 1) fadeInTween(this.styler);
    else this.fadeIn = fadeInTween(this.styler).pause();

    this.animation = pointer(this.styler.get)
      .while(() => clientWidth() >= 760)
      .start(this.styler.set);
  };

  controlAnimation = () => {
    const progress = this.props.progress();
    const lightGrowProgress = this.props.lightGrowProgress();

    if (this.fadeIn) this.fadeIn.seek(lightGrowProgress);

    if ((progress < 0 || progress > 1) && this.animation)
      return this.pauseAnimation();

    if (progress >= 0 && progress <= 1 && !this.animation)
      return this.startAnimation(lightGrowProgress);
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
