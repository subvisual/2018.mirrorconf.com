import { listen } from 'popmotion';
import scroll from 'stylefire/scroll';
import React, { Component } from 'react';

import CommandBar from './CommandBar';
import ScrollBar from './ScrollBar';
import SystemBar from './SystemBar';
import Viewport from './Viewport';

import './index.module.css';

const scrollableArea = element => {
  return element.scrollHeight - element.getBoundingClientRect().height;
};

export default class About extends Component {
  constructor() {
    super();
    this.state = { viewportScrollProgress: 0 };
  }

  onScroll = scrollableHeight => scrollHeight => {
    if (!this.viewport) return;

    const progress = scrollHeight / scrollableHeight;
    this.viewportScroll.set('top', scrollableArea(this.viewport) * progress);

    return scrollHeight;
  };

  onViewport = viewport => {
    this.viewport = viewport;
    this.viewportScroll = scroll(viewport);
  };

  componentDidMount() {
    if (!this.viewport) return;

    listen(this.viewport, 'scroll').start(() =>
      this.setState({
        viewportScrollProgress:
          this.viewportScroll.get('top') / scrollableArea(this.viewport),
      }),
    );
  }

  render() {
    return (
      <section styleName="root">
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
