import { pointer, styler } from 'popmotion';
import React, { Component } from 'react';

import './index.css';
import LightImage from './light.svg';

export default class Light extends Component {
  constructor(props) {
    super(props);

    this.state = { animationPaused: false };
  }

  onLight = light => (this.light = light);

  pauseAnimation = () => {
    if (!this.animation || !this.styler) return;

    this.animation.stop();
    this.styler.set({ x: '-100%' });
    this.setState({ animationPaused: true });
  };

  resumeAnimation = () => {
    this.startAnimation();
    this.setState({ animationPaused: false });
  };

  startAnimation = () => {
    if (!this.styler) return;

    this.animation = pointer(this.styler.get).start(this.styler.set);
  };

  controlAnimation = pauseAnimation => {
    if (pauseAnimation && !this.state.animationPaused) {
      return this.pauseAnimation();
    } else if (!pauseAnimation && this.state.animationPaused) {
      return this.resumeAnimation();
    }
  };

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

  render() {
    return (
      <div className="Light" ref={this.onLight}>
        <img className="Light-image" src={LightImage} />
      </div>
    );
  }
}
