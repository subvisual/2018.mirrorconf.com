import classNames from 'classnames';
import { pointer, styler, listen, tween } from 'popmotion';
import React, { Component } from 'react';
import { clientWidth } from '../../utils/dom';

import './index.css';
import lightSrc from './light.png';

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
    this.onScrollListener = listen(document, 'scroll').start(
      this.controlAnimation
    );
  }

  componentWillUnmount() {
    if (this.animation) this.animation.stop();
    if (this.onScrollListener) this.onScrollListener.stop();
  }

  onLight = light => {
    if (!light) return;

    this.light = light;
    this.styler = styler(light);
  };

  pauseAnimation = (progress, lightGrowProgress) => {
    if (!progress && !lightGrowProgress) return;

    this.animation.stop();
    this.animation = null;

    if (this.fadeIn) {
      this.fadeIn.stop();
      this.fadeIn = null;
      fadeOutTween(this.styler);
    } else {
      fadeOutTween(this.styler);
    }
  };

  startAnimation = (progress, lightGrowProgress) => {
    if (!this.light || !this.styler) return;

    if (!progress && !lightGrowProgress) {
      fadeInTween(this.styler);
    } else if (lightGrowProgress >= 1 && lightGrowProgress >= 0.5) {
      fadeInTween(this.styler);
    } else if (!this.fadeIn) {
      this.fadeIn = fadeInTween(this.styler).pause();
    }

    this.animation = pointer(this.styler.get)
      .while(() => clientWidth() >= 760)
      .start(this.styler.set);
  };

  controlAnimation = () => {
    const progress = this.props.progress();
    const lightGrowProgress = this.props.lightGrowProgress();

    if (!progress && !lightGrowProgress)
      return this.startAnimation(progress, lightGrowProgress);

    if (this.fadeIn) this.fadeIn.seek(lightGrowProgress);

    if ((progress < 0 || progress > 1) && this.animation)
      return this.pauseAnimation(progress, lightGrowProgress);

    if (progress >= 0 && progress <= 1 && !this.animation)
      return this.startAnimation(progress, lightGrowProgress);
  };

  render() {
    const className = classNames({ Light: true, 'is-fixed': this.props.fixed });

    return (
      <div className={className}>
        <div className="Light-wrapper">
          <div className="Light-imageWrapper" ref={this.onLight}>
            <img className="Light-image" src={lightSrc} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
