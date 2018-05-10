import scroll from 'stylefire/scroll';
import React, { Component } from 'react';
import { linear } from 'popmotion/easing';
import { getProgressFromValue } from 'popmotion/calc';
import { listen, styler, value, tween, transform } from 'popmotion';

import Hero from '../components/Hero';
import About from '../components/About';
import Speakers from '../components/Speakers';
// import Workshops from '../components/Workshops';

import { scrollTop, clientHeight, scrollRemaining } from '../utils/dom';

export default class IndexPage extends Component {
  constructor() {
    super();
    this.listeners = [];
  }

  startAnimation() {
    this.animation = listen(document, 'scroll').start(() =>
      this.listeners.forEach(l => l()),
    );
  }

  componentDidMount() {
    listen(window, 'load').start(() => this.startAnimation());
  }

  onScroll = listener => {
    const index = this.listeners.push(listener) - 1;
    return () => this.listeners.splice(index, 1);
  };

  render() {
    return (
      <div className="Layout">
        <div className="Layout-contentWrapper">
          <div className="Layout-content">
            <Hero onScroll={this.onScroll} />
            <About />
            <Speakers onScroll={this.onScroll} />
          </div>
        </div>
      </div>
    );
  }
}
