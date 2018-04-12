import React, { Component } from 'react';
import { linear } from 'popmotion/easing';
import { listen, styler, value, tween, transform, everyFrame } from 'popmotion';

import Hero from '../components/Hero';
import About from '../components/About';
import Speakers from '../components/Speakers';
import Workshops from '../components/Workshops';

import { clientHeight, scrollRemaining } from '../utils/dom';

export default class IndexPage extends Component {
  constructor() {
    super();
    this.listeners = [];
  }
  onRoot = root => (this.rootStyler = styler(root));

  onBackground = background => (this.background = background);

  startAnimation() {
    const elapsed = scrollRemaining();

    this.rootStyler.set('height', this.state.height);

    const backgroundY = value(
      this.state.initialValue,
      styler(this.background).set('y'),
    );

    const backgroundTween = tween({
      elapsed,
      from: backgroundY.get(),
      to: 0,
      ease: linear,
    })
      .start(backgroundY)
      .pause();

    this.animation = listen(document, 'scroll')
      .pipe(scrollRemaining)
      .start(progress => {
        this.listeners.forEach(l => l());
        requestAnimationFrame(() => backgroundTween.seek(progress));
      });
  }

  calculatePositions() {
    const { height } = this.background.getBoundingClientRect();
    const initialValue = -height + clientHeight();

    requestAnimationFrame(() => this.rootStyler.set('height', height));
    this.setState({ height, initialValue });
  }

  onResize() {
    if (!this.rootStyler || !this.background) return;

    if (this.animation) this.animation.stop();

    this.requestAnimationStart();
  }

  requestAnimationStart() {
    this.calculatePositions();
    requestAnimationFrame(() => this.startAnimation());
  }

  componentDidMount() {
    if (!this.rootStyler || !this.background) return;

    listen(window, 'resize').start(() => this.onResize());
    listen(window, 'load').start(() => this.requestAnimationStart());
  }

  onScroll = listener => {
    this.listeners.push(listener);
  };

  render() {
    return (
      <div className="Layout" ref={this.onRoot}>
        <div className="Layout-contentWrapper">
          <div className="Layout-content" ref={this.onBackground}>
            <Hero onScroll={this.onScroll} />
            <About />
            <Speakers onScroll={this.onScroll} />
            {/* <Workshops /> */}
          </div>
        </div>
      </div>
    );
  }
}
