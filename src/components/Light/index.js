import { pointer, styler } from 'popmotion';
import React, { Component } from 'react';
import { clientWidth } from '../../utils/dom';

import './index.css';
import lightSrc from './light.svg';

export default class Light extends Component {
  constructor(props) {
    super(props);

    this.state = { animationPaused: false };
  }

  componentDidMount() {
    if (!this.light) return;

    this.styler = styler(this.light);

    this.startAnimation();
  }

  componentWillReceiveProps(nextProps) {
    this.controllAnimation(nextProps.pauseAnimation);
  }

  componentWillUnmount() {
    if (this.animation) return this.animation.stop();
  }

  onLight = light => (this.light = light);

  pauseAnimation = () => {
    if (!this.animation || !this.styler) return;

    this.animation.stop();
    this.setState({ animationPaused: true });
  };

  resumeAnimation = () => {
    this.startAnimation();
    this.setState({ animationPaused: false });
  };

  startAnimation = () => {
    if (!this.styler) return;

    this.animation = pointer(this.styler.get)
      .while(() => clientWidth() >= 760)
      .start(this.styler.set);
  };

  controlAnimation = pauseAnimation => {
    if (pauseAnimation && !this.state.animationPaused) {
      return this.pauseAnimation();
    } else if (!pauseAnimation && this.state.animationPaused) {
      return this.resumeAnimation();
    }
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
