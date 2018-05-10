import { listen } from 'popmotion';
import scroll from 'stylefire/scroll';
import React, { Component } from 'react';

import CommandBar from './CommandBar';
import ScrollBar from './ScrollBar';
import SystemBar from './SystemBar';
import Viewport from './Viewport';

import './index.module.css';

export default class About extends Component {
  constructor() {
    super();
    this.state = { viewportScrollProgress: 0, viewportHeight: 0 };
  }

  onScroll = scrollableHeight => scrollHeight => {
    if (!this.viewport) return;

    const progress = scrollHeight / scrollableHeight;
    this.viewportScroll.set('top', this.scrollableArea() * progress);

    return scrollHeight;
  };

  scrollableArea = () => this.viewport.scrollHeight - this.state.viewportHeight;

  scrollProgress = () => this.viewportScroll.get('top') / this.scrollableArea();

  onViewport = viewport => {
    this.viewport = viewport;
    this.viewportScroll = scroll(viewport);
  };

  startAnimation() {
    this.animation = listen(this.viewport, 'scroll').start(() =>
      this.setState({ viewportScrollProgress: this.scrollProgress() }),
    );
  }

  onResize() {
    if (!this.viewport) return;
    if (this.animation) this.animation.stop();

    const { height } = this.viewport.getBoundingClientRect();
    console.log(height);
    if (!height) setTimeout(() => this.onResize(), 100);

    this.setState({ viewportHeight: height });

    requestAnimationFrame(() => this.startAnimation());
  }

  componentDidMount() {
    if (!this.viewport) return;

    const { height } = this.viewport.getBoundingClientRect();

    if (!height) setTimeout(() => this.onResize(), 100);

    this.setState({ viewportHeight: height });

    listen(window, 'resize').start(() => this.onResize());

    requestAnimationFrame(() => this.startAnimation());
  }

  render() {
    return (
      <section styleName="root" id="about" tabIndex="0">
        <div styleName="window">
          <SystemBar />
          <CommandBar />
          <div styleName="viewport">
            <Viewport onViewport={this.onViewport} />
            <ScrollBar
              onScroll={this.onScroll}
              viewportScrollProgress={this.state.viewportScrollProgress}
            />
          </div>
        </div>
      </section>
    );
  }
}
